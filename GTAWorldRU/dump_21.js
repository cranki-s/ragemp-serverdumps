{
﻿const ScaleForm = require("gtalife/ScaleForms.js");

/* Camera objects */
var cameraScale = null;
var camObj = null;

/* Camera settings */
const mouseSensitivity = 2.5;
const zoomSpeed = 1.5;
const minZoom = 5.0;
const maxZoom = 60.0;

var camState = false;
var disable = false;

// Bind keys
    // Space - Takes photo
mp.keys.bind(0x20, false, SpacePush);
    // CTRL - Closes camera
mp.keys.bind(0x11, false, CTRLPush);

mp.events.add("toggle_camera", async (toggle) => {
    if (toggle === null || toggle === undefined)
        return;

    if (toggle) {
        // Create the scaleform, and call the functions for it to work
        cameraScale = new ScaleForm("DIGITAL_CAMERA");
        cameraScale.callFunction("SHOW_REMAINING_PHOTOS", true);
        cameraScale.callFunction("SET_REMAINING_PHOTOS", 0, 1);
        cameraScale.callFunction("SHOW_PHOTO_FRAME", true);
        cameraScale.callFunction("SHOW_PHOTO_BORDER", false);
        cameraScale.callFunction("OPEN_SHUTTER");

        // Change the alpha value of the player locally, so he's not able,5
        // to see himself using the new camera.
        mp.players.local.setAlpha(0);

        // Get the proper camera position
        const playerPos = mp.players.local.position;
        var camPos = playerPos;
        camPos.z = mp.players.local.getWorldPositionOfBone(12844).z + 0.65;

        // Create the camera and set it active
        camObj = mp.cameras.new('default', camPos, new mp.Vector3(0, 0, mp.players.local.getHeading()), 60);
        camObj.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        camObj.attachTo(mp.players.local.handle, playerPos.x - camPos.x, playerPos.y - camPos.y, camPos.z, false);

        // Change the state to allow 'Space' & 'CTRL' to work
        camState = true;

        // Disable the HUD
        mp.game.ui.displayRadar(false);
        mp.gui.chat.show(false);

    } else {
        if (mp.game.graphics.hasScaleformMovieLoaded(cameraScale.handle)) {
            mp.game.graphics.setScaleformMovieAsNoLongerNeeded(cameraScale.handle);

             for (let i = 0; !mp.game.graphics.hasScaleformMovieLoaded(cameraScale.handle) && i < 1500; i++)
                await mp.game.waitAsync(0);
        }

        cameraScale = null;
        mp.players.local.setAlpha(255);
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        camObj = null;

        camState = false;

        // Enable the HUD
        mp.game.ui.displayRadar(true);
        mp.gui.chat.show(true);
    }
});

mp.events.add('render', () => {
    if (cameraScale !== null && cameraScale !== undefined) {
        if (!disable) {
            mp.game.invoke("0xC6372ECD45D73BCD", 1); // _0xC6372ECD45D73BCD
            cameraScale.render2D(undefined, undefined, undefined, undefined);
            mp.game.invoke("0xC6372ECD45D73BCD", 0); // _0xC6372ECD45D73BCD
        }
    }

    if (camObj !== null && camObj.isActive() && camObj.isRendering()) {
        mp.game.controls.disableAllControlActions(2);

        var x = (mp.game.controls.getDisabledControlNormal(7, 1) * mouseSensitivity);
        var y = (mp.game.controls.getDisabledControlNormal(7, 2) * mouseSensitivity);
        var zoomIn = (mp.game.controls.getDisabledControlNormal(2, 40) * zoomSpeed);
        var zoomOut = (mp.game.controls.getDisabledControlNormal(2, 41) * zoomSpeed);

        var currentRot = camObj.getRot(2);

        currentRot = new mp.Vector3(currentRot.x - y, 0, currentRot.z - x);

        camObj.setRot(currentRot.x, currentRot.y, currentRot.z, 2);

        if (zoomIn > 0)
        {
            var currentFov = camObj.getFov();
            currentFov -= zoomIn;
            if (currentFov < minZoom)
                currentFov = minZoom;
            camObj.setFov(currentFov);
        } else if (zoomOut > 0)
        {
            var currentFov = camObj.getFov();
            currentFov += zoomOut;
            if (currentFov > maxZoom)
                currentFov = maxZoom;
            camObj.setFov(currentFov);
        }
    }
});

function SpacePush() {
    SnapPhoto();
}

function CTRLPush() {
    CloseCamera();
}

mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    if (leftOrRight === "left" && upOrDown == "down") {
        SnapPhoto();
        return;
    } else if (leftOrRight === "right" && upOrDown === "down") {
        CloseCamera();
        return;
    }
});

function SnapPhoto() {
    if (!camState)
        return;

    if (disable)
        return;

    disable = true;

    setTimeout(() => {
        var time = mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1);
        var screenName = "gta-world-camera-" + time.year + "-" + time.month + "-" + time.day + "-" + time.hour + "-" + time.minute + "-" + time.second + ".png";
        mp.gui.takeScreenshot(screenName, 1, 100, 0);
        mp.game.audio.playSoundFrontend(-1, "Camera_Shoot", "Phone_Soundset_Franklin", true);

        disable = false;
    }, 100);
}

function CloseCamera() {
    if (!camState)
        return;

    mp.events.callRemote('close_camera');
}
}