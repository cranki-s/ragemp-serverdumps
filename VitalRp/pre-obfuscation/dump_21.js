{
const maxRange = 60.0;
const localPlayer = mp.players.local;
let musicPlayer = mp.browsers.new('package://files/3dsounds/musicPlayer/index.html');
let id = 0;
let activeSounds = {}, hostSounds = {},
    soundInterval;
var adjustpanInterval = null;



const soundManager = {
    add: function (player, id) {
        
        if (player && hostSounds[id]) {
            hostSounds[id].listeners.push(player.remoteId);
            if (localPlayer.handle !== player.handle) {
                return mp.events.callRemote('addListener', player.remoteId, JSON.stringify(hostSounds[id]));
            }
            if (musicPlayer) musicPlayer.execute(`playAudio("${id}", "${decodeURI(hostSounds[id].url)}", "${hostSounds[id].volume}")`);
        }
    },
    remove: function (player, id) {
        if (player) {
            if (hostSounds[id]) {
                let idx = hostSounds[id].listeners.indexOf(player.remoteId);
                if (idx !== -1) {
                    hostSounds[id].listeners.splice(idx, 1);
                    if (localPlayer.handle !== player.handle) return mp.events.callRemote('removeListener', player.remoteId, id);   
                }
            }
            if (musicPlayer) {
                if (activeSounds[id]) activeSounds[id] = null;
                musicPlayer.execute(`stopAudio("${id}")`);
            }
        }
    },
    setVolume: function (player, id, volume) {
        if (player) {
            if (hostSounds[id] && localPlayer.handle !== player.handle) return mp.events.callRemote('changeSoundVolume', player.remoteId, id, volume);
            if (musicPlayer) musicPlayer.execute(`setVolume("${id}", "${volume}")`);
        }
    },
    pauseToggle: function (player, id, pause) {
        if (player) {
            if (hostSounds[id]) {
                hostSounds[id].paused = pause;
                if (localPlayer.handle !== player.handle) return mp.events.callRemote('pauseToggleSound', player.remoteId, id, pause);    
            }
            if (musicPlayer) {
                if (activeSounds[id]) activeSounds[id].paused = pause;
                musicPlayer.execute(`setPaused("${id}", "${pause}")`);
            }
        }
    }
}

mp.events.add({
    'createSound': (soundObj) => {
        soundObj = JSON.parse(soundObj);
        id = soundObj.id;

        if (!activeSounds[soundObj.id] && !hostSounds[soundObj.id]) {

            activeSounds[soundObj.id] = {
                id: soundObj.id,
                url: soundObj.url,
                pos: soundObj.pos,
                volume: soundObj.volume,
                range: soundObj.range,
                dimension: soundObj.dimension,
                listeners: soundObj.listeners,
                host: soundObj.host, // Possibility of host change in future maybe
                paused: soundObj.paused
            }
            if (musicPlayer) musicPlayer.execute(`playAudio("${soundObj.id}", "${decodeURI(activeSounds[soundObj.id].url)}", "${activeSounds[soundObj.id].volume}")`);
        }
    },
    'ceplm': () => {

    },

    'soundPosition': (id, pos) => { // Could be used in future for host changing sync.
        pos = JSON.parse(pos);
        if (activeSounds[id]) {
            activeSounds[id].pos = pos;
        }
    },
    'soundRange': (id, range) => { // Could be used in future for host changing sync.
        if (activeSounds[id]) {
            activeSounds[id].range = range;
        }
    },
    'setSoundVolume': (id, volume) => {
        soundManager.setVolume(localPlayer, id, volume);
    },
    'destroySound': (soundID) => {
        if (activeSounds[soundID]) {
            soundManager.remove(localPlayer, soundID);
            activeSounds[soundID] = null;
        } else if (hostSounds[soundID]) {
            hostSounds[soundID].listeners.forEach(listener => {
                soundManager.remove(listener, soundID);
            });
            hostSounds[soundID] = null;
        }
        if (Object.keys(hostSounds).length < 1) {
            if (soundInterval) clearInterval(soundInterval);
        }
    },
    'destroySoundHost': (hostID) => {
        Object.keys(activeSounds).forEach(soundID => {
            if (activeSounds) {
                if (activeSounds[soundID] != null) {
                    if (hostID == activeSounds[soundID].host) {
                        soundManager.remove(localPlayer, soundID);
                    }
                }
            }
        });
    },
    'pauseSound': (soundID) => {
        soundManager.pauseToggle(localPlayer, id, true);
    },
    'resumeSound': (soundID) => {
        soundManager.pauseToggle(localPlayer, id, false);
    },
    'audioFinish': (soundID) => {
        mp.events.call('destroySound', soundID);
        mp.events.callRemote('soundFinish', soundID);
    },
    'audioError': (soundID, err) => {
        mp.events.call('destroySound', soundID);
        mp.events.callRemote('soundError', soundID, err);
    },
    'playerQuit': (player) => {
        mp.events.call('destroySoundHost', player.remoteId)
    }
});

mp.game.audio.playSound3D = function (id, url, pos, range = maxRange, volume = 1, dimension = 0) {

    hostSounds[id] = {
        id: id,
        url: encodeURI(url),
        pos: pos,
        volume: volume,
        range: range,
        dimension: mp.players.local.dimension,
        listeners: [],
        host: localPlayer.remoteId,
        paused: false,
    };
    hostSounds[id].destroy = function () {

        return mp.events.callRemote('soundState', 'destroySound', this.id);
       
    };
    hostSounds[id].pause = function () {
        return mp.events.callRemote('soundState', 'pauseSound', this.id);
    };
    hostSounds[id].resume = function () {
        return mp.events.callRemote('soundState', 'resumeSound', this.id)
    };
    if (!soundInterval) initSoundInterval();

    return hostSounds[id];
};

mp.game.audio.setSoundVolume = function (id, volume = 1) {
    if (hostSounds[id]) {
        hostSounds[id].volume = volume;
    }
};

mp.game.audio.setSoundPosition = function (id, pos) {
    if (hostSounds[id]) {
        hostSounds[id].pos = pos;
        mp.events.callRemote('soundPosition', id, JSON.stringify(pos)); // Could be used in future for host changing sync.
    }
}

mp.game.audio.setSoundRange = function (id, range) {
    if (range < 0 || range > maxRange) range = maxRange;
    hostSounds[id].range = range;
    // mp.events.callRemote('soundRange', id, range); // Could be used in future for host changing sync.
}

function initSoundInterval() {
    soundInterval = setInterval(() => {
        Object.keys(hostSounds).forEach(sound => {
            if (hostSounds[sound] && !hostSounds[sound].paused) {
                const soundPosition = hostSounds[sound].pos;
                const maxRange = hostSounds[sound].range;
                mp.players.forEachInRange(mp.players.local.position, maxRange,
                    (player) => {
                       
                    if (player.dimension === hostSounds[sound].dimension && !hostSounds[sound].listeners.includes(player.remoteId)) {
                        
                            soundManager.add(player, sound);
                    }
                });

                if (hostSounds[sound].listeners && hostSounds[sound].listeners.length > 0)
                    hostSounds[sound].listeners.forEach(remoteId => {
                        let player = mp.players.atRemoteId(remoteId)
                        if (player) {
                            const playerPos = player.position;
                            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, soundPosition.x, soundPosition.y, soundPosition.z);
                            if (dist > maxRange || hostSounds[sound].dimension !== player.dimension) {
                                soundManager.remove(player, sound);
                            } else {
                                let volume = (hostSounds[sound].volume - (dist / hostSounds[sound].range)).toFixed(3); // Credits to George....
                                soundManager.setVolume(player, sound, volume);
                                let x = hostSounds[sound].pos.x - player.position.x
                                let y = hostSounds[sound].pos.y - player.position.y
                                let rightH = mp.game.gameplay.getHeadingFromVector2d(x, y);
                                let heading = player.getHeading();
                                let dif = rightH - heading;

                            }
                        }
                    });
            }
        });
    }, 200);
};






}