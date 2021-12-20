{
let settings = {
    use3dAutio: true,
    useAutoVolumeAudio: false,
    maxRage: 15.0,
    micKey: 81,
    radioKey: 9,
    debugMode: false,
    ismicKeyDown: false,
    isradioKeyDown: false,
    starttalkInRadio: mp.events.callRemote("Radio:StartTalkInRadioChannel"),
    stoptalkInRadio: mp.events.callRemote("Radio:StopTalkInRadioChannel"),
    lastTimeAtVoiceFix: new Date().getTime(),

    _enableMic: function() {
        if (mp.voiceChat.muted) mp.voiceChat.muted = false;
    },
    _disableMic: function() {
        if (!mp.voiceChat.muted) mp.voiceChat.muted = true;
    },
    _enableRadio: function() {
        if (mp.voiceChat.muted) {
            mp.voiceChat.muted = false;
            this.starttalkInRadio;
        }
    },
    _disableRadio: function() {
        if (!mp.voiceChat.muted) {
            mp.voiceChat.muted = true;
            this.stoptalkInRadio;
        }
    },
    _debug: function(input) {
        mp.console.logInfo(`${input}`, true, true);
    }
};

let SmartPhone = {
    target: null,
    statur: false
};

let Radio = {

    Listeners: {},

    _add: function(player) {
        if (this.Listeners[player.remoteId] == null) this.Listeners[player.remoteId] = player;
    },
    _remove: function(player) {
        if (this.Listeners[player.remoteId] != null) delete this.Listeners[player.remoteId];
    },
    _isRadioTarget: function(player) {
        let _radioTargets = Object.values(this.Listeners);
        if (_radioTargets.length) {
            for (let i = 0; i < _radioTargets.length; i++) {
                if (_radioTargets[i] == player) return true;
            }
        }
        return false;
    }
};

let Voice = {

    Listeners: {},

    _add: function(player, _enableServerSide) {
        if (this.Listeners[player.remoteId] == null) {
            if (_enableServerSide) mp.events.callRemote("Voice:Add:Listener", player);
            this.Listeners[player.remoteId] = player;
            player.voice3d = true;
            player.voiceVolume = 0.0;
            player.isListening = true;
        }
    },
    _remove: function(player, _disableServerSide) {
        if (this.Listeners[player.remoteId] != null) {
            if (_disableServerSide) mp.events.callRemote("Voice:Remove:Listener", player);
            delete this.Listeners[player.remoteId];
            player.isListening = false;
        }
    }
};

mp.keys.bind(settings.micKey, true, function() {
    if (settings.isradioKeyDown) return;
    if (!settings.ismicKeyDown) {
        settings.ismicKeyDown = true;
        settings._enableMic();
    }
});

mp.keys.bind(settings.micKey, false, function() {
    if (settings.ismicKeyDown) {
        settings.ismicKeyDown = false;
        settings._disableMic();
    }
});

mp.keys.bind(settings.radioKey, true, function() {
    if (settings.ismicKeyDown) return;
    if (!settings.isradioKeyDown) {
        settings.isradioKeyDown = true;
        settings._enableRadio();
    }
});

mp.keys.bind(settings.radioKey, false, function() {
    if (settings.isradioKeyDown) {
        settings.isradioKeyDown = false;
        settings._disableRadio();
    }
});


/* RADIO EVENTS */
mp.events.add('playerRadioAddListeners', (...players) => {
    try {
        if (players != undefined) {
            for (const player of players) {
                Voice._remove(player, false);
                Radio._add(player);
                player.voiceVolume = 1.0;
                player.voice3d = false;
            }
        }
    } catch (error) {
        settings._debug(error);
    }
});

mp.events.add('playerRadioRemoveListeners', () => {
    try {
        Radio.Listeners = {};
    } catch (error) {
        settings._debug(error);
    }
});

/* PHONE EVENTS */

mp.events.add("playerStartPhoneCall", (target) => {
    try {
        if (SmartPhone.target == null) {
            SmartPhone.target = target;
            SmartPhone.status = true;
            Voice._remove(target, false);
            mp.events.callRemote("Voice:Add:Listener", target);
            target.voiceVolume = 1.0;
            target.voice3d = false;
        }
    } catch (error) {
        settings._debug(error);
    }
});

mp.events.add("playerStopPhoneCall", () => {
    try {
        if (SmartPhone.target) {
            if (mp.players.exists(SmartPhone.target)) {
                const playerPos = SmartPhone.target.position;

                if (mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z) > settings.maxRage) {
                    mp.events.callRemote("Voice:Remove:Listener", SmartPhone.target);
                } else {
                    Voice._add(SmartPhone.target, false);
                }
            } else {
                mp.events.callRemote("Voice:Remove:Listener", SmartPhone.target);
                SmartPhone.target = null;
                SmartPhone.status = false;
            }
        }
    } catch (error) {
        settings._debug(error);
    }
});

/* RAGE EVENTS */
mp.events.add('playerStartTalking', (player) => {
    if (SmartPhone.target != player) {
        player.voice3d = true;
        player.playFacialAnim("mic_chatter", "mp_facial");
    }
});

mp.events.add('playerStopTalking', (player) => {
    player.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});

mp.events.add("playerQuit", (player) => {
    if (player.isListening) {
        Voice._remove(player, false);
    }
});

mp.events.add('render', () => {

    if (settings.debugMode) {

        mp.game.graphics.drawText(`VoiceChat: ${settings.ismicKeyDown ? '~g~An' : '~r~Aus'}`, [0.50, 0.59], {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [0.4, 0.4],
            outline: true,
            centre: 0
        });

        mp.game.graphics.drawText(`RadioChat: ${settings.isradioKeyDown ? '~g~An' : '~r~Aus'}`, [0.50, 0.62], {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [0.4, 0.4],
            outline: true,
            centre: 0
        });

        mp.game.graphics.drawText(`In Range: ${Object.keys(Voice.Listeners).length}`, [0.50, 0.65], {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [0.4, 0.4],
            outline: true,
            centre: 0
        });
    }
});

/* HANDLE */

let _storage_local_pos = new mp.Vector3(0, 0, 0);
let _storage_player_pos = new mp.Vector3(0, 0, 0);

setInterval(() => {
    try {
        _storage_local_pos = mp.players.local.position;

        mp.players.forEachInStreamRange(x => {
            if (x != mp.players.local) {
                if (!x.isListening && SmartPhone.target != x && !Radio._isRadioTarget(x)) {
                    _storage_player_pos = x.position;
                    if (mp.game.system.vdist(_storage_player_pos.x, _storage_player_pos.y, _storage_player_pos.z, _storage_local_pos.x, _storage_local_pos.y, _storage_local_pos.z) <= settings.maxRage) {
                        Voice._add(x, true);
                    }
                }
            }
        });

        let voicePlayers = Object.values(Voice.Listeners);

        if (voicePlayers.length) {
            for (let i = 0; i < voicePlayers.length; i++) {
                if (voicePlayers[i].handle !== 0) {
                    _storage_player_pos = voicePlayers[i].position;
                    let Distance = mp.game.system.vdist(_storage_player_pos.x, _storage_player_pos.y, _storage_player_pos.z, _storage_local_pos.x, _storage_local_pos.y, _storage_local_pos.z);

                    if (Distance > settings.maxRage) {
                        Voice._remove(voicePlayers[i], true);
                    } else if (!settings.useAutoVolumeAudio) {
                        voicePlayers[i].voiceVolume = 1 - (Distance / settings.maxRage);
                    }
                } else {
                    Voice._remove(voicePlayers[i], true);
                }
            }
        }
    } catch (error) {
        settings._debug(error);
    }
}, 350);

setInterval(function() {
    if ((new Date().getTime() - settings.lastTimeAtVoiceFix) > (5 * 60 * 1000)) {
        if (mp.voiceChat.muted) {
            mp.voiceChat.cleanupAndReload(false, false, true);
            settings.lastTimeAtVoiceFix = new Date().getTime();
        }
    }
}, 30 * 1000);
}