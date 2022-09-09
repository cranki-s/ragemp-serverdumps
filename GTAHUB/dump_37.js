{
const crouchStyle = "MOVE_PED_CROUCHED";

// apply clip sets if streamed player is crouching
mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player") {
        if(entity.getVariable("isCrouched")) {
            setWalkingStyle(entity, crouchStyle, 0);
        }
    }
});

// apply/reset clip sets when isCrouched changes for a streamed player
mp.events.addDataHandler("isCrouched", (entity, value) => {
    if (entity.type === "player" && entity.handle) {
        if (value) {
            setWalkingStyle(entity, crouchStyle, 0);
        } else {
            setWalkingStyle(entity, entity.walkStyle, 0);
        }
    }
});

mp.events.add("render", () => {
    // detect CTRL input, not use key bind because CTRL (0x11) is detect as ALT in some keyboard languages
    if (mp.game.controls.isControlJustPressed(0, 224)) {
        if(mp.players.local.vehicle || !mp.players.local.isVisible() || mp.gui.cursor.visible || mp.players.local.editing) return
        mp.events.originalCallRemote("toggleCrouch");
    }
});
}