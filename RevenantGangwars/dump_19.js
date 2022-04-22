{
const cameraPos = new mp.Vector3(-763.8950, 325.4376, 170.5964);
const playerPos = new mp.Vector3(-759.8087768554688, 325.5442810058594, 170.60716247558594);
const playerAngle = 92.65;

let outfitCamera = undefined;

mp.events.add("setOutfitEditorState", (enable) => {
    if (enable) {
        sharedVariables.localPlayer.setCoordsNoOffset(playerPos.x, playerPos.y, playerPos.z, false, false, false);
        sharedVariables.localPlayer.setHeading(playerAngle);
        sharedVariables.localPlayer.freezePosition(true);
        sharedVariables.drawUI = false;
        sharedVariables.isInOutfitEditor = true;

        outfitCamera = mp.cameras.new('default', new mp.Vector3(-763.1306762695312, 325.4215393066406, 170.69652709960938), new mp.Vector3(0,0,0), 38);

        outfitCamera.pointAtCoord(-759.8087768554688, 325.5442810058594, 170.60716247558594); // Changes the rotation of the camera to point towards a location
        outfitCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        mp.game.ui.displayRadar(false);
        mp.events.call('toggleClothingMenu');
        mp.events.call('setClothingMenuState');
        mp.events.callRemote('setEditorDimension');
    } else {
        sharedVariables.isInOutfitEditor = false;
        sharedVariables.localPlayer.freezePosition(false);

        outfitCamera.setActive(false);
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.game.ui.displayRadar(true);

        outfitCamera.destroy();
        outfitCamera = undefined;
    }
});
}