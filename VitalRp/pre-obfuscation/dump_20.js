{
const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.25;

const loadClipSet = async (clipSetName) => {
    mp.game.streaming.requestClipSet(clipSetName);
    while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) mp.game.wait(0);
};


let player = mp.players.local;

let IdleDate = new Date();
mp.events.add('render', () => {
    mp.game.vehicle.setExperimentalAttachmentSyncEnabled(true);
    const dif = new Date().getTime() - IdleDate.getTime();
    const seconds = dif / 1000;
    if (player.hasVariable("isCrouched") && player.getVariable("isCrouched")) {
        if (Math.abs(seconds) > 10) {
            IdleDate = new Date();

            player.forceMotionState(247561816, true, true, false);
        }
        if (!mp.system.isFocused) {
            mp.events.callRemote("toggleCrouch", false);
        }
        if (player.vehicle) {
            mp.events.callRemote("toggleCrouch", false);
        }
        if (!player.getVariable("Injured") === 0) {
            mp.events.callRemote("toggleCrouch", false);
        }
        if (mp.keys.isDown(17) === false) { // 113 is the key code for F2
            mp.events.callRemote("toggleCrouch", false);
        } 

    }
    mp.players.forEachInRange(player.position, 100,
        (entity) => {
            if (entity.hasVariable("isCrouched") && entity.getVariable("isCrouched")) {
                if (entity.getSpeed() === 0) {
                    if (Math.abs(seconds) > 10) {
                        IdleDate = new Date();

                        entity.forceMotionState(247561816, true, true, false);
                    }
                }
            }
        }
    );
});


// load clip sets
loadClipSet(movementClipSet);
loadClipSet(strafeClipSet);

// apply clip sets if streamed player is crouching
mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player" && entity.hasVariable("isCrouched") && entity.getVariable("isCrouched")) {
        entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
        entity.setStrafeClipset(strafeClipSet);
    }
});

// apply/reset clip sets when isCrouched changes for a streamed player
mp.events.addDataHandler("isCrouched", (entity, value) => {
    if (entity.type === "player") {
        if (entity.handle > 0) {
            if (value) {
                entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
                entity.setStrafeClipset(strafeClipSet);
            } else {
                entity.resetMovementClipset(clipSetSwitchTime);
                entity.resetStrafeClipset();
            }
        }
    }
});


}