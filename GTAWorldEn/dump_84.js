{
let isSnakeCamming = false;
let snakeCamCEF = null;
let currentSnakeCam = null;
let dim = null;

let snakeExep = false;

let camVars = ["", "", ""];

let removeSnakeCam = () => {
    if (!isSnakeCamming) return;

    mp.game.graphics.setTimecycleModifier('none');
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);

    currentSnakeCam.setActive(false);
    mp.game.ui.displayRadar(true);
    currentSnakeCam.destroy();
    snakeCamCEF.destroy();
    isSnakeCamming = false;


    mp.events.callRemote("snakecam_remove", true);
};

let snakecamRefresh = () => {
    if (!isSnakeCamming) return;

    mp.events.callRemote("snakecam_refresh");
};

let snakecamCheck = () => {
    if (!isSnakeCamming) return;

    mp.events.callRemote("snakecam_check", dim)
};

mp.events.add('Snakecam::Create', (doorPos, property, department, character, newDim) => {
    if (isSnakeCamming) return;

    camVars[0] = property;
    camVars[1] = department;
    camVars[2] = character;


    snakeCamCEF = mp.browsers.new("package://gtalife/Snakecam/cef/snakecam.html");
    snakeCamCEF.execute(`init("${camVars[0]}", "${camVars[1]}", "${camVars[2]}")`);

    mp.game.graphics.setTimecycleModifier('heliguncam');
    mp.game.ui.displayRadar(false);
    mp.gui.cursor.show(false, false);

    currentSnakeCam = mp.cameras.new('default', new mp.Vector3(doorPos.x, doorPos.y, doorPos.z - 0.65), new mp.Vector3(0, 0, 0), 60); //65

    currentSnakeCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    mp.gui.chat.show(false);
    isSnakeCamming = true;
    snakeExep = false;
    dim = newDim;
});

mp.events.add('Snakecam::RemoveNoExit', () => {    
    if (!isSnakeCamming) return;

    mp.game.graphics.setTimecycleModifier('none');
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);

    currentSnakeCam.setActive(false);
    mp.game.ui.displayRadar(true);
    currentSnakeCam.destroy();
    snakeCamCEF.destroy();
    isSnakeCamming = false;
    mp.events.callRemote("snakecam_remove", false);

});

mp.events.add('Snakecam::Remove', removeSnakeCam);

mp.keys.bind(0x73, true, removeSnakeCam);

mp.keys.bind(0x59, true, snakecamCheck);

mp.keys.bind(0x75, true, snakecamRefresh);

mp.events.add('render', () => {
    if (!isSnakeCamming) return;
    if (snakeExep) return;
    mp.game.player.disableFiring(true)
    try
    {
        let right = mp.game.controls.getDisabledControlNormal(0, 220);
        let top = mp.game.controls.getDisabledControlNormal(0, 221);
        let rotation = currentSnakeCam.getRot(2);
        if (right == 0 && top == 0) return;
        currentSnakeCam.setRot(rotation.x + top * -10.0, 0.0, rotation.z + right * -10.0, 2);
    }
    catch(exception)
    {
        mp.console.logError(exception.message, true, true);
        mp.gui.chat.push("Contact a Developer if you see this message.");
        snakeExep = true;
        removeSnakeCam();
    }
});

mp.events.add('test1', (effect) => {
    mp.game.graphics.setTimecycleModifier(effect);
});

mp.events.add('test2', (effect1) => {
    mp.game.graphics.startScreenEffect(effect1, 5000, false);
})
}