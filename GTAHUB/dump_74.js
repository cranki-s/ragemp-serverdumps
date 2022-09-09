{
/**
 * Joebill camera functions wrapper.
 * Also reports every few seconds camera front vector and camera.
 */

// TODO: probably files should be like:

let staticCam = null;
let staticCam2 = null;
let camFov = 42.4;
let drunkLevelSmooth = 0;
let drunkLevel = 0;

let screenshotsTaked = 0;

mp.playerCamera = {
    gameplayCamera: mp.cameras.new("gameplay"),
    getActiveCamera: function() {
        return mp.players.local.activeCamera ? mp.players.local.activeCamera : this.gameplayCamera;
    }
};

let lastCameraPos = new mp.Vector3();
let lastCameraFront = new mp.Vector3();

mp.setInterval(() => {
    const camera = mp.playerCamera.getActiveCamera();
    const coords = camera.getCoord();
    const front = camera.getDirection();

    if (mp.game.system.vdist(coords.x, coords.y, coords.z, lastCameraPos.x, lastCameraPos.y, lastCameraPos.z) > 0.3 ||
        mp.game.system.vdist(front.x, front.y, front.z, lastCameraFront.x, lastCameraFront.y, lastCameraFront.z) > 0.05) {

        lastCameraPos = coords;
        lastCameraFront = front;

        mp.events.callRemote("camera:on_update", JSON.stringify(coords), JSON.stringify(front));
    }
}, 750);

function destroyExistingCameras() {
    if (staticCam != null) {
        staticCam.setActive(false);
        staticCam.destroy();
        staticCam = null;
    }
    if(staticCam2 != null) {
        staticCam2.setActive(false);
        staticCam2.destroy();
        staticCam2 = null;
    }
}

mp.rpc("camera:set", (posJson, lookAtJson, time) => {
    destroyExistingCameras();

    let pos = JSON.parse(posJson);
    let lookAt = JSON.parse(lookAtJson);
    staticCam = mp.cameras.new("camara", pos, new mp.Vector3(0, 0, 0), camFov);
    staticCam.pointAtCoord(lookAt.x, lookAt.y, lookAt.z);
    staticCam.setActive(true);
    staticCam.shake('HAND_SHAKE', 0.5);
    mp.game.cam.renderScriptCams(true, time !== 0, time, false, false);
    mp.players.local.activeCamera = staticCam;
});

mp.rpc("camera:setBehind", (time) => {
    destroyExistingCameras();
    mp.players.local.activeCamera = null;
    mp.game.cam.renderScriptCams(false, time !== 0, time, true, true);
});

mp.rpc("camera:shake", (type, amplitude) => {
    if (drunkLevel === 0) {
        mp.game.cam.shakeGameplayCam(type, amplitude);
    }
});

mp.rpc("camera:set_drunk_level", (value) => {
    if (drunkLevel === 0 && value > 0) {
        setTimeout(() => {
            if (drunkLevel > 0) {
                mp.game.cam.shakeGameplayCam('DRUNK_SHAKE', 0.01);
            }
        }, 500);
    }
    drunkLevel = value*3;
});

setInterval(() => {
    if (drunkLevel > drunkLevelSmooth) {
        drunkLevelSmooth += 2;
        if (drunkLevelSmooth > drunkLevel) drunkLevelSmooth = drunkLevel;
    } else if (drunkLevel < drunkLevelSmooth) {
        drunkLevelSmooth -= 2;
        if (drunkLevelSmooth < drunkLevel) drunkLevelSmooth = drunkLevel;
    }

    if (drunkLevel > 0) {
        drunkLevel--;
    }

    if (drunkLevel === 0 && drunkLevelSmooth > 0) {
        mp.game.cam.stopGameplayCamShaking(true);
        drunkLevelSmooth = 0;
    }

    if (drunkLevelSmooth > 0) {
        mp.game.cam.setGameplayCamShakeAmplitude(Math.min(drunkLevelSmooth / 100.0, 2.5));
    }
}, 333);

mp.rpc("camera:interpolate", (startPosJson, startLookAtJson, endPosJson, endLookAtJson, time) => {
    destroyExistingCameras();

    let startPos = JSON.parse(startPosJson);
    let startLookAt = JSON.parse(startLookAtJson);
    let endPos = JSON.parse(endPosJson);
    let endLookAt = JSON.parse(endLookAtJson);

    staticCam = mp.cameras.new("camara", startPos, new mp.Vector3(0, 0, 0), camFov);
    staticCam2 = mp.cameras.new("camara", endPos, new mp.Vector3(0, 0, 0), camFov);

    staticCam.pointAtCoord(startLookAt.x, startLookAt.y, startLookAt.z);
    staticCam2.pointAtCoord(endLookAt.x, endLookAt.y, endLookAt.z);
    staticCam2.setActiveWithInterp(staticCam.handle, time, 0, 0);

    mp.players.local.activeCamera = staticCam2;

    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.keys.bind(0x74, true, () => {
    let date = new Date(Date.now())
    mp.gui.takeScreenshot(`ghub-${screenshotsTaked} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}.png`, 1, 100, 0);
    mp.game.audio.playSoundFrontend(-1, "Camera_Shoot", "Phone_Soundset_Franklin", true);
    screenshotsTaked += 1
});
}