{
/** Implements sounds emitters */
require("ui.js");
require('pools.js');

let playingSounds = {};
let attachedSounds = {}; // sound id -> attached entity
let anySound = false;

function playMp3(id, sound, volume, loop, use3d, pos, ratio, secondsPassed) {
    browserExecute("playSound(" +id+ "," +JSON.stringify(sound)+ "," +volume+ ", " +loop+ "," +use3d+ "," +pos+ "," +ratio+ ", " + secondsPassed + ")");
    anySound = true;
}

function stopMp3(id) {
    browserExecute("stopSound("+id+")");
}

// warm up browser
playMp3(-1, "weapon_drop_1", 0.001, false, false, JSON.stringify(new mp.Vector3(0,0,0)), 1);

mp.rpc("sound:play", (id, sound, set, volume, loop, ratio, secondsPassed, coordsJson, attachedData) => {
   let pos = JSON.parse(coordsJson);
   if (set === "mp3") {
       let use3d = pos.x !== 0 || pos.y !== 0 || pos.z !== 0;
       playMp3(id, sound, volume, loop, use3d, coordsJson, ratio, secondsPassed);
   } else {
       if (playingSounds[id] === "mp3") {
           stopMp3(id);
       }
       mp.game.audio.playSoundFromCoord(id, sound, pos.x, pos.y, pos.z, set, false, 0, false);
   }
   if (id !== -1) {
       playingSounds[id] = set;
       delete attachedSounds[id];
       if (attachedData !== "{}") {
           let attached = JSON.parse(attachedData);
           mp.events.call("sound:attach", id, attached.type, attached.id, attached.bone, pos, JSON.stringify(new mp.Vector3(0,0,0)));
       }
   }
});

mp.rpc("sound:stop", (id) => {
   if (playingSounds[id]) {
       if (playingSounds[id] === "mp3") {
           stopMp3(id);
       } else {
           mp.game.audio.stopSound(id);
           mp.game.audio.releaseSoundId(id);
       }
       delete playingSounds[id];
       delete attachedSounds[id];
   }
});

mp.rpc("sound:attach", (id, entityKind, entityId, bone, offsetJson, rotationJson) => {
   if (playingSounds[id] === "mp3") {
       let otherEntity = getEntityForKindAndId(entityKind, entityId);
       if (otherEntity) {
           attachedSounds[id] = otherEntity;
       }
   }
});

mp.rpc("sound:detach", (id) => {
   if (playingSounds[id] && attachedSounds[id]) {
       delete attachedSounds[id];
   }
});

let oldFocused = true;

mp.setInterval(() => {
    // sound seems to be a little slower to process
    // by the brain, so changes in position every 50ms
    // won't feel laggy.

    if (!anySound) return;

    let focused = (mp.system || {isFocused: true}).isFocused;
    if (focused !== oldFocused) {
        browserExecute("mute(!"+focused+")")
        oldFocused = focused;
    }

    // move the camera slightly on every tick, sounds gets glitchy while camera rot is stationary for a sec or so
    const camera = mp.playerCamera.getActiveCamera();
    const coords = camera.getCoord();
    const front = camera.getDirection();
    front.x += 0.01*Math.random();
    front.y += 0.01*Math.random();
    front.z += 0.01*Math.random();
    browserExecute("updateListener("+JSON.stringify(coords)+","+JSON.stringify(front)+")");

    const playerPos = mp.players.local.position;
    browserExecute("updateStreamingListener("+JSON.stringify(playerPos)+")");

    for (soundId in attachedSounds) {
        let entity = attachedSounds[soundId];

        try {
            browserExecute("updateSound("+soundId+","+JSON.stringify(entity.getCoords(true))+")");
        } catch (e) {
            delete attachedSounds[soundId];
        }
    }
}, 50);

// /ceval mp.events.call('sound:play', 0, 'crawling_male_1', 'mp3', 1, true, JSON.stringify(mp.players.local.position))
// /ceval mp.events.call('sound:attach', 0, 0, 0, 62, JSON.stringify(new mp.Vector3(0,0,0.1)), JSON.stringify(new mp.Vector3(0,0,0)))
}