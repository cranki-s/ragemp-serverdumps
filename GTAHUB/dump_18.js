{
let pickups = {};

mp.markers.atJoebillId = function(id) {
    return pickups[id];
}

let lastCP = null;

// some feedback when enters checkponts
mp.events.add("playerEnterCheckpoint", (checkpoint) => {
    if (lastCP !== checkpoint) {
        setTimeout(() => {
            mp.game.graphics.startScreenEffect('BikerFormationOut', 1000, false);
            mp.game.audio.playSoundFrontend(2, 'Click', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', false);
        }, 200);
    }
});

mp.setInterval(() => {
    let myPos = mp.players.local.position
    for (pickupId in pickups) {
        let pickup = pickups[pickupId]
        let pos = pickup.position
        let isIn = mp.game.system.vdist(pos.x, pos.y, pos.z, myPos.x, myPos.y, myPos.z) < (pickup.radius*1.2);
        if (!pickup.isIn && isIn) {
            mp.events.callRemote("pickup:on_enter", parseInt(pickupId))
            pickup.isIn = true
        } else if (pickup.isIn && !isIn) {
            mp.events.callRemote("pickup:on_leave", parseInt(pickupId))
            delete pickup.isIn
        }
    }
}, 100);

mp.rpc("pickup:create", (id, model, positionJson, ratio, nextPositionJSON, alpha) => {
    if (pickups[id]) {
        pickups[id].destroy();
    }

    let pos = JSON.parse(positionJson);
    let nextPos = JSON.parse(nextPositionJSON);

    if (model === 1 || model === 100) { // special case: this marker is always on ground!
        pos.z -= 1.05;
    }

    if (model === 100) { // special case: model 100 uses checkpoints to create
        let type = (positionJson === nextPositionJSON) ? 4/*finish*/ : 1;
        pickups[id] = mp.checkpoints.new(type, new mp.Vector3(pos.x, pos.y, pos.z), ratio, {
            direction: nextPos,
            color: [244, 67, 54, alpha],
            visible: true,
            dimension: -1
        });
    } else {
        // invalid models crash the game
        if (model < 0 || model > 44) model = 0;

        pickups[id] = mp.markers.new(model, new mp.Vector3(pos.x, pos.y, pos.z), ratio, {
            color: [244, 67, 54, alpha],
            visible: true,
            dimension: -1
        });
    }

    pickups[id].radius = ratio
});

mp.rpc("pickup:destroy", (id) => {
   if (pickups[id]) {
       pickups[id].destroy();
       delete pickups[id];
   }
});
}