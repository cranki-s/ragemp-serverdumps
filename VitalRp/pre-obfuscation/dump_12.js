{
﻿const localPlayer = mp.players.local;
const Use3d = !0;
const UseAutoVolume = !1;
let MaxRange = 15.0;
let localOn = false;
let RadioOn = false;
let TacOn = false;
let lastUpdateEnabledVoice = Date.now();





const enableMicrophoneForLocalVoiceChat = () => {
    if (mp.keys.isDown(18) === true) {
        if (MaxRange === 15.0) {

            MaxRange = 25.0
            global.uiPlayer_Browsers.execute("app.setVoiceLevel('2')");
        }
        else if (MaxRange === 25.0) {

            MaxRange = 4.0
            global.uiPlayer_Browsers.execute("app.setVoiceLevel('0')");
        }
        else if (MaxRange === 4.0) {

            MaxRange = 15.0
            global.uiPlayer_Browsers.execute("app.setVoiceLevel('1')");
        }
    }
    else {
        enableMicrophone();

    }
}

const enableMicrophoneForRadioChat = () => {
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote("ActivateRadioFreq");
    }
    else {
        enableMicrophoneForRadio();
    }

}


const enableMicrophoneForTacChat = () => {
    enableMicrophoneForTac();

}




const enableMicrophone = () => {
    if (global.chatopened || global.logged === 0) return;
    if (localPlayer.getVariable('voice.muted') == !0) return;
    if (RadioOn || TacOn) return;
    if (mp.voiceChat.muted) {
        localOn = true;
        lastUpdateEnabledVoice = Date.now();
        mp.voiceChat.muted = false;
        localPlayer.playFacialAnim("mic_chatter", "mp_facial");
        mp.events.callRemote("setspeaking", "local");
        g_voiceMgr.listeners.forEach((player) => {
            if (mp.players.exists(player)) {
                mp.events.callRemote("add_voice_listener", player);
            }
        });
    }

}

const enableMicrophoneForRadio = () => {
    if (global.chatopened || global.logged === 0) return;
    if (localOn || TacOn) return;
    if (mp.players.local.getVariable("RadioFreq") === 0) return;
    if (mp.voiceChat.muted) {
        if (mp.players.local.hasVariable("RadioFreq"))
            RadioOn = true;
        lastUpdateEnabledVoice = Date.now();
        mp.voiceChat.muted = false;
        localPlayer.playFacialAnim("mic_chatter", "mp_facial");
        mp.events.callRemote("PlayPhoneAnimationFromClient", 49, 'cellphone@', 'cellphone_call_listen_base')
        mp.events.callRemote("Radio_Play_Animation");
        mp.events.callRemote("setspeaking", "radio");
        g_voiceMgr.radiolisteners.forEach((player) => {
            if (mp.players.exists(player)) {
                mp.events.callRemote("add_voice_listener", player);
            }
        });
    }

}

const enableMicrophoneForTac = () => {
    if (global.chatopened || global.logged === 0) return;
    if (localOn || RadioOn) return;
    if (!mp.players.local.hasVariable("TacFreq") || mp.players.local.getVariable("TacFreq") === 0) return;
    if (mp.voiceChat.muted) {
        
        TacOn = true;
        lastUpdateEnabledVoice = Date.now();
        mp.voiceChat.muted = false;
        localPlayer.playFacialAnim("mic_chatter", "mp_facial");
        mp.events.callRemote("setspeaking", "dispatch");
        g_voiceMgr.dispatchlisterns.forEach((player) => {
            if (mp.players.exists(player)) {
                mp.events.callRemote("add_voice_listener", player);
            }
        });
    }

}


const disableMicrophone = () => {
    if (global.logged === 0) return;
    if (localOn) {
        localOn = false;
        mp.voiceChat.muted = true;
        mp.events.callRemote("setspeaking", "none");
        localPlayer.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
    }

}

const disableMicrophoneForRadioChat = () => {
    if (global.logged === 0) return;
    if (RadioOn) {
        RadioOn = false;
        mp.voiceChat.muted = true;
        localPlayer.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
        mp.events.callRemote("StopPhoneAnimationFromClient")
        mp.events.callRemote("setspeaking", "none");
        g_voiceMgr.radiolisteners.forEach((player) => {
            if (mp.players.exists(player)) {
                mp.events.callRemote("remove_voice_listener", player);
            }
        });
    }


}


const disableMicrophoneForTacChat = () => {
    if (global.logged === 0) return;
    if (TacOn) {
        
        TacOn = false;
        mp.voiceChat.muted = true;
        localPlayer.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");

        mp.events.callRemote("setspeaking", "none");
        g_voiceMgr.dispatchlisterns.forEach((player) => {
            if (mp.players.exists(player)) {
                mp.events.callRemote("remove_voice_listener", player);
            }
        });
    }


}


mp.events.addDataHandler("RadioFreq", (entity, value, oldValue) => {
    if (entity.type === "player") {
        if (value !== 0) {
            if (entity !== mp.players.local) {

                if (value === g_voiceMgr.radioFreq) {

                    g_voiceMgr.radiolisteners.push(entity);

                    if (RadioOn) {
                        mp.events.callRemote("add_voice_listener", entity);
                    }
                }
                else if (g_voiceMgr.radiolisteners.indexOf(entity) !== -1) {
                    g_voiceMgr.radiolisteners.splice(g_voiceMgr.radiolisteners.indexOf(entity), 1)
                    if (RadioOn) {
                        mp.events.callRemote("remove_voice_listener", entity);
                    }
                }


            }

            else {
                if (global.uiPlayer_Browsers !== undefined) {
                    global.uiPlayer_Browsers.execute("app.SetRadionOn(1)");
                }
                g_voiceMgr.radiolisteners = [];
                g_voiceMgr.radioFreq = value;
                mp.players.forEach(player => {
                    if (player !== mp.players.local) {
                        if (player.getVariable("RadioFreq") === g_voiceMgr.radioFreq) {
                            g_voiceMgr.radiolisteners.push(player);
                        }

                    }
                })
            }
        } else if (value === 0) {
            if (entity === mp.players.local) {
                if (global.uiPlayer_Browsers !== undefined) {

                    global.uiPlayer_Browsers.execute("app.SetRadionOn(0)");
                }
                g_voiceMgr.radiolisteners = [];
            }
            else if (g_voiceMgr.radiolisteners.indexOf(entity) !== -1) {
                g_voiceMgr.radiolisteners.splice(g_voiceMgr.radiolisteners.indexOf(entity), 1)
                if (RadioOn) {
                    mp.events.callRemote("remove_voice_listener", entity);
                }
            }
        }

    }
});





mp.events.addDataHandler("TacFreq", (entity, value, oldValue) => {
    if (entity.type === "player") {
        if (value !== 0) {
            if (entity !== mp.players.local) {
                if (value === g_voiceMgr.tacFreq) {
                    g_voiceMgr.dispatchlisterns.push(entity);
                    if (TacOn) {
                        mp.events.callRemote("add_voice_listener", entity);
                    }
                }
                else if (g_voiceMgr.dispatchlisterns.indexOf(entity) !== -1) {
                    g_voiceMgr.dispatchlisterns.splice(g_voiceMgr.dispatchlisterns.indexOf(entity), 1)
                    if (TacOn) {
                        mp.events.callRemote("remove_voice_listener", entity);
                    }
                }

            }

            else {

                g_voiceMgr.dispatchlisterns = [];
                g_voiceMgr.tacFreq = value;
                mp.players.forEach(player => {
                    if (player !== mp.players.local) {
                        if (player.getVariable("TacFreq") === g_voiceMgr.tacFreq) {
                            g_voiceMgr.dispatchlisterns.push(player);

                        }
                    }
                })
            }
        } else if (value === 0) {
            if (entity === mp.players.local) {
                g_voiceMgr.dispatchlisterns = [];

            }
            else if (g_voiceMgr.dispatchlisterns.indexOf(entity) !== -1) {
                g_voiceMgr.dispatchlisterns.splice(g_voiceMgr.dispatchlisterns.indexOf(entity), 1)
                if (TacOn) {
                    mp.events.callRemote("remove_voice_listener", entity);
                }
            }

        }
    }
});









mp.keys.bind(78, true, enableMicrophoneForLocalVoiceChat);
mp.keys.bind(77, true, enableMicrophoneForRadioChat);
mp.keys.bind(78, false, disableMicrophone);
mp.keys.bind(77, false, disableMicrophoneForRadioChat);

mp.keys.bind(90, true, enableMicrophoneForTacChat);
mp.keys.bind(90, false, disableMicrophoneForTacChat);

mp.game.streaming.requestAnimDict("mp_facial");
mp.game.streaming.requestAnimDict("facials@gen_male@variations@normal");
mp.game.streaming.requestAnimDict("random@arrests");
mp.game.streaming.requestAnimDict("oddjobs@assassinate@guard");

let g_voiceMgr =
{

    listeners: [],
    radiolisteners: [],
    dispatchlisterns: [],
    radioFreq: 0,
    tacFreq: 0,

    add: function (player, notify) {
        if (mp.players.exists(player)) {
            if (notify) mp.events.callRemote("add_voice_listener", player);
            this.listeners.push(player);

            player.voice3d = true;
            player.voiceVolume = 0.1;
            player.isListening = true;
        }
    },

    remove: function (player, notify) {
        let idx = this.listeners.indexOf(player);

        if (idx !== -1)
            this.listeners.splice(idx, 1);
        player.voice3d = false;

        player.isListening = false;

        if (notify) {
            mp.events.callRemote("remove_voice_listener", player);
        }
    }
};


let PHONE = {
    target: null,
    status: false
};

mp.events.add("playerQuit", (player) => {
    if (player.isListening) {
        g_voiceMgr.remove(player, false);
    }
});
mp.events.add('voice.mute', () => {
    disableMicrophone();
})
mp.events.add('voice.phoneCall', (target) => {
    if (!PHONE.target) {
        PHONE.target = target;
        PHONE.status = true;
        mp.events.callRemote("add_voice_listener", target);
        target.voiceVolume = 1.0;
        target.voice3d = false;
        g_voiceMgr.remove(target, false);
    }
});
mp.events.add("voice.phoneStop", () => {
    if (PHONE.target) {
        if (mp.players.exists(PHONE.target)) {
            let localPos = localPlayer.position;
            const playerPos = PHONE.target.position;
            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

            if (dist > MaxRange) {
                mp.events.callRemote("remove_voice_listener", PHONE.target);
            } else {
                g_voiceMgr.add(PHONE.target, false);
            }
        } else {
            mp.events.callRemote("remove_voice_listener", PHONE.target);
        }

        PHONE.target = null;
        PHONE.status = false;
    }
});
mp.events.add('v_reload', () => {
    mp.voiceChat.cleanupAndReload(true, true, true);
});
mp.events.add('v_checklisten', (player) => {
    mp.gui.chat.push(`isListening: ${player.isListening} | voiceActivity: ${player.isVoiceActive}`);
});
mp.events.add('playerStartTalking', (player) => {

    if (player.handle !== 0)
        player.playFacialAnim("mic_chatter", "mp_facial");
});
mp.events.add('playerStopTalking', (player) => {
    player.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});

setInterval(() => {
    let localPlayer = mp.players.local;
    let localPos = localPlayer.position;

    mp.players.forEachInStreamRange(player => {
        if (player != localPlayer) {
            
            if (!player.isListening && (!PHONE.target || PHONE.target != player)) {
                const playerPos = player.position;
                let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
                if (dist <= MaxRange) {
                    g_voiceMgr.add(player, true);


                }
            }
        }
    });
    g_voiceMgr.listeners.forEach((player) => {
        if (player.handle !== 0) {
            const playerPos = player.position;
            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
            if (dist > MaxRange) {
                if (g_voiceMgr.dispatchlisterns.indexOf(player) !== -1 && player.getVariable("speakingOn") === "dispatch") {
                    player.voiceVolume = 1.0
                    player.voice3d = false;
                }
                else if (g_voiceMgr.radiolisteners.indexOf(player) !== -1 && player.getVariable("speakingOn") === "radio") {
                    player.voiceVolume = 1.0
                    player.voice3d = false;
                }
                else {
                    g_voiceMgr.remove(player, true);
                    player.voiceVolume = 0.0;
                }

            }

            else if (g_voiceMgr.dispatchlisterns.indexOf(player) !== -1 && player.getVariable("speakingOn") === "dispatch") {
                player.voiceVolume = 1.0
                player.voice3d = false;
            }
            else if (g_voiceMgr.radiolisteners.indexOf(player) !== -1 && player.getVariable("speakingOn") === "radio") {
                player.voiceVolume = 1.0
                player.voice3d = false;
            }
            else {
                player.voice3d = true;
                player.voiceVolume = 1 - (dist / 15);
            }

        }
        //else if (g_voiceMgr.radiolisteners.indexOf(player) !== -1 || g_voiceMgr.dispatchlisterns.indexOf(player) !== -1) g_voiceMgr.remove(player, false);
        else g_voiceMgr.remove(player, true);
    });
}, 1000);

// thanks to kemperrr
const scalable = (dist, maxDist) => Math.max(0.1, 1 - (dist / maxDist));
const clamp = (min, max, value) => Math.min(Math.max(min, value), max);

let nextFrameActive = false;



mp.events.add("playerJoin", (player) => {
    player.voice3d = false;
});

function init3dOff() {
    mp.players.forEach((player) => {
        player.voice3d = false;
    })
}




mp.events.add('render', () => {

    if (!mp.system.isFocused) {
        if (global.uiPlayer_Browsers !== undefined) {
            global.uiPlayer_Browsers.execute("app.setMicStatus('0')");
        }
        disableMicrophone();
        disableMicrophoneForTacChat();
        disableMicrophoneForRadioChat();
        mp.voiceChat.muted = true;

    }
    if (global.uiPlayer_Browsers !== undefined) {
        if (mp.voiceChat.muted) {
            global.uiPlayer_Browsers.execute("app.setMicStatus('0')");
            global.uiPlayer_Browsers.execute("app.SetRadionStatus('0')");
        }
        else if (!mp.keys.isDown(78) && !mp.keys.isDown(77) && !mp.keys.isDown(90)) {
            global.uiPlayer_Browsers.execute("app.setMicStatus('0')");
            global.uiPlayer_Browsers.execute("app.SetRadionStatus('0')");
            mp.voiceChat.muted = true;
        }
        else if (!mp.voiceChat.muted) {
            global.uiPlayer_Browsers.execute("app.setMicStatus('1')");
            if (RadioOn || TacOn) {
                global.uiPlayer_Browsers.execute("app.SetRadionStatus('1')");
            }

        }
    }
    mp.players.forEachInStreamRange(player => {
        if (player !== localPlayer) {
            const __playerPosition__ = player.position;
            const __localPlayerPosition__ = localPlayer.position;
     
            const distance = mp.game.system.vdist(__localPlayerPosition__.x, __localPlayerPosition__.y, __localPlayerPosition__.z, __playerPosition__.x, __playerPosition__.y, __playerPosition__.z);
            if (distance <= 25 && !player.isDead() && !player.isOccluded()) {

                const headPosition = player.getBoneCoords(12844, 0, 0, 0);
                const headPosition2d = mp.game.graphics.world3dToScreen2d(headPosition.x, headPosition.y, headPosition.z + 0.4);

                if (!headPosition2d) {
                    return false;
                }

                const scale = scalable(distance, 25);
                const scaleSprite = 0.7 * scale;

                const isMuted = false;
                const sprite = (!isMuted) ? 'leaderboard_audio_3' : 'leaderboard_audio_mute';

                const spriteColor = [255, 255, 255, 255];

                if (player.isVoiceActive) {

                    drawSprite("mpleaderboard", sprite, [scaleSprite, scaleSprite], 0, spriteColor, headPosition2d.x, headPosition2d.y + 0.038 * scale);
                }
            }
        }
    });
});

const drawSprite = (dist, name, scale, heading, colour, x, y, layer) => {
    const graphics = mp.game.graphics
        , resolution = graphics.getScreenActiveResolution(0, 0)
        , textureResolution = graphics.getTextureResolution(dist, name)
        , SCALE = [(scale[0] * textureResolution.x) / resolution.x, (scale[1] * textureResolution.y) / resolution.y]

    if (graphics.hasStreamedTextureDictLoaded(dist)) {
        if (typeof layer === 'number') {
            graphics.set2dLayer(layer);
        }

        graphics.drawSprite(dist, name, x, y, SCALE[0], SCALE[1], heading, colour[0], colour[1], colour[2], colour[3]);
    } else {
        graphics.requestStreamedTextureDict(dist, true);
    }
};

let lastVoiceFixTime = new Date().getTime();
let voiceFixTimer = setInterval(function () {
    if ((new Date().getTime() - lastVoiceFixTime) > 3 * 60 * 1000) {
        if (mp.voiceChat.muted) {
            mp.voiceChat.cleanupAndReload(true, true, true);
            lastVoiceFixTime = new Date().getTime();
        }
    }
}, 30 * 1000);
}