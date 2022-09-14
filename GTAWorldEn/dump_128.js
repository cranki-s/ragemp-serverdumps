{
function getGroundZ(player) {
    return mp.game.gameplay.getGroundZFor3dCoord(player.position.x, player.position.y, player.position.z, parseFloat(0), false);
}

mp.events.add("Fishing::IsPlayerNearWater", (func) => {
    /* Credits to Static for the water detection. */
    var player = mp.players.local;

    const bone = player.getBoneCoords(31086, 0, 0, 0);
    const matrix = player.getMatrix(null, null, null, null);

    const target = new mp.Vector3(
        matrix.forwardVector.x * 0.75 - matrix.upVector.x * 0.25,
        matrix.forwardVector.y * 0.75 - matrix.upVector.y * 0.25,
        matrix.forwardVector.z * 0.75 - matrix.upVector.z * 0.25
    );

    const target_mult = new mp.Vector3(
        bone.x + 25 * target.x,
        bone.y + 25 * target.y,
        bone.z + 25 * target.z
    );

    var result = mp.game.water.testProbeAgainstWater(bone.x, bone.y, bone.z, target_mult.x, target_mult.y, target_mult.z, 255, 0, 255, 255);

    mp.events.callRemote("Fishing::PlayerIsNearWater", (result !== undefined && !player.isSwimming()), getGroundZ(player), func);
});

var minigameCEF = null;
mp.events.add("Fishing::MinigameStart", () => {
    if (!mp.browsers.exists(minigameCEF)) {
        minigameCEF = mp.browsers.new("package://gtalife/Fishing/minigame/fishing.html");
        mp.gui.cursor.show(true, true);
    }
});

mp.events.add("Fishing::MinigameStop", () => {
    if (minigameCEF != null && mp.browsers.exists(minigameCEF)) {
        minigameCEF.destroy();
        mp.gui.cursor.show(false, false);
    }
});

mp.events.add("Fishing::MinigameFinished", (result) => {
    mp.events.call("Fishing::MinigameStop");
    mp.events.callRemote("Fishing::MinigameResult", result);
});
}