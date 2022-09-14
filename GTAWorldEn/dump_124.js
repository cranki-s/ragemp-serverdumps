{
const cameraHeight = 1000;
const cameraMoveDuration = 1000;

var startCamera = null;
var endCamera = null;
var cameraPosX = 0.0;
var cameraPosY = 0.0;
var cameraPosZ = 0.0;

mp.events.add({
    'SpawnCameraView': (x, y, z) => {
        try {
            mp.game.cam.renderScriptCams(true, true, 2000, true, false);
            if(startCamera != null) {
                if (endCamera != null) {
                    startCamera.setCoord(cameraPosX, cameraPosY, cameraPosZ);
                    startCamera.setActive(true);
                }
                cameraPosX = x;
                cameraPosY = y;
                cameraPosZ = z + cameraHeight;
                endCamera = mp.cameras.new('default', new mp.Vector3(x, y, z + cameraHeight), new mp.Vector3(270, 0, 0), 40);
                endCamera.setActiveWithInterp(startCamera.handle, cameraMoveDuration, 0, 0);
            } else {
                cameraPosX = x;
                cameraPosY = y;
                cameraPosZ = z + cameraHeight;
    
                startCamera = mp.cameras.new('default', new mp.Vector3(cameraPosX, cameraPosY, cameraPosZ), new mp.Vector3(270, 0, 0), 40);
                startCamera.setActive(true);
            }
        }
        catch (e) {
    
        }
    },
    'ConfirmSpawn': () => {
        try {
            mp.game.cam.renderScriptCams(false, true, 2000, true, false);
            if(startCamera != null) {
                startCamera.setActive(false);
                startCamera.destroy();
                startCamera = null;
            }
            if (endCamera != null) {
                endCamera.setActive(false);
                endCamera.destroy();
                endCamera = null;
            }
        }
        catch (e) {

        }
    }
});
}