{
﻿var startCamera = null;
var endCamera = null;
const cameraHeight = 1000;
var spawnPosX = 0.0;
var spawnPosY = 0.0;
var spawnPosZ = 0.0;
const cameraMoveDuration = 1000;

var cameraPosX = 0.0;
var cameraPosY = 0.0;
var cameraPosZ = 0.0;

mp.events.add('SpawnCameraView', (x, y, z) => {
try {
    mp.game.cam.renderScriptCams(true, true, 2000, true, false);
    if (startCamera == null || !mp.cameras.exists(startCamera)) {
        cameraPosX = x;
        cameraPosY = y;
        cameraPosZ = z + cameraHeight;

        startCamera = mp.cameras.new('default', new mp.Vector3(cameraPosX, cameraPosY, cameraPosZ), new mp.Vector3(270, 0, 0), 40);
        startCamera.setActive(true);
    }
    else {
        if (mp.cameras.exists(endCamera)) {
            startCamera.setCoord(cameraPosX, cameraPosY, cameraPosZ);
            startCamera.setActive(true);
        }

        cameraPosX = x;
        cameraPosY = y;
        cameraPosZ = z + cameraHeight;
        endCamera = mp.cameras.new('default', new mp.Vector3(x, y, z + cameraHeight), new mp.Vector3(270, 0, 0), 40);
        endCamera.setActiveWithInterp(startCamera.handle, cameraMoveDuration, 0, 0);

    }

    spawnPosX = x;
    spawnPosY = y;
    spawnPosZ = z;
}
catch (e)
{}
});

mp.events.add('ConfirmSpawn', () => {
try {
    mp.events.callRemote("SetSpawnPosition", spawnPosX, spawnPosY, spawnPosZ);
    mp.game.cam.renderScriptCams(false, true, 2000, true, false);

    startCamera.destroy();
    if (mp.cameras.exists(endCamera)) {
        endCamera.destroy();
    }
}
catch (e)
{}
});

}