{
let screenshotBrowser = null;
let screenResolution = null;

mp.events.add("playerReady", () => {
    screenshotBrowser = mp.browsers.new("package://cef/cefscreenshoots/index.html");
});

mp.events.add("capturePlayerScreen", (auth) => {
    if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.destroyPhotoFrameForPhoto();");
    else mp.events.call("exitMDTPictureMode")

});

mp.events.add("captureScreenGo", () => {
    mp.game.audio.playSoundFrontend(-1, "Camera_Shoot", "Phone_SoundSet_Michael", true);
    const playerScreen = "player_screen.jpg";
    mp.gui.takeScreenshot(`${playerScreen}`, 0, 100, 0);
    setTimeout(() => {
        screenshotBrowser.call("recieveScreenShot", "http://screenshots/player_screen.jpg", 'fccef5356165caa');
        mp.events.call("exitMDTPictureMode")

        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.awaitPicture();");
        mp.gui.cursor.visible = true;

    }, 1000);
});




mp.events.add("uploadScreenShot", (imagelink) => {

    if (global.mdt === true)
    global.uiGlobal_Browsers.execute("app.pictureReceive('" + imagelink + "'," + profilePic + ");");

});


var mdtCamera = false;
var MovableCamera = null;
var profilePic = false;

mp.events.add("startMDTPictureMode", (profpic) => {
    profilePic = profpic
    mdtCamera = true;
    const Player = mp.players.local;
    mp.events.call("show_player_hud", false);
    mp.events.call("hide_radar");
    mp.events.call("hideChat");
    mp.events.call("destroyPhone");
    mp.events.call("HideCarHUD");
    mp.gui.cursor.visible = false;
    MovableCamera = mp.cameras.new('DEFAULT_SCRIPTED_FLY_CAMERA', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
    MovableCamera.attachToPedBone(mp.players.local.handle, 58869, 0, 0.2, 0, true);
    const CameraPositon = new mp.Vector3(Player.position.x + 1, Player.position.y + 1, Player.position.z);

    MovableCamera.setCoord(CameraPositon.x, CameraPositon.y, CameraPositon.z);
    MovableCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false, 0);
    loadAnimDict("amb@code_human_in_bus_passenger_idles@female@tablet@base", function () {
        Player.taskPlayAnim("amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 3.0, 3.0, -1, 50, 1, false, false, false);
        Player.setDynamic(true);
    });
    
    mp.events.add('render', MoveCamera);

});


mp.events.add("exitMDTPictureMode", () => {
    mp.events.remove('render', MoveCamera);
    MovableCamera.detach();
    if (MovableCamera) {
        MovableCamera.destroy();
        MovableCamera = null;
    }
    mp.game.cam.renderScriptCams(false, false, 0, false, false, 0);
    mp.events.call("show_radar");
    mp.events.call("showChat");
    mp.events.call("HideCarHUD");
    mp.events.call("initPhone");
    mp.events.call("show_player_hud", true);
    mdtCamera = false;
});




mp.keys.bind(0x08, !1, function () {
    if (mdtCamera) {
        mp.events.call("exitMDTPictureMode")
        if (global.mdt === true)
        global.uiGlobal_Browsers.execute("app.destroyPhotoFrame();");
        global.uiGlobal_Browsers.execute("app.backFromPicture();");
        mp.gui.cursor.visible = true;
    }
});


mp.keys.bind(0x0D, !1, function () {
    if (mdtCamera) {
        
        mp.events.call("capturePlayerScreen", "");
        
    }
});





function loadAnimDict(a, b) {
    if (mp.game.streaming.hasAnimDictLoaded(a)) return void b();
    mp.game.streaming.requestAnimDict(a);
    let c = setInterval(function () {
        if (mp.game.streaming.hasAnimDictLoaded(a)) {
            b();
            clearInterval(c);
        }
    }, 100)
}





var fov_max = 70.0
var fov_min = 5.0
var zoomspeed = 10.0
var speed_lr = 8.0
var speed_ud = 8.0
var new_z = 0;
var new_x = 0;


var fov = (fov_max + fov_min) * 0.5




function CheckInputRotation(zoomvalue) {
    var rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220)
    var rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221)
    var rotation = MovableCamera.getRot(2)
    if (rightAxisX != 0.0 || rightAxisY != 0.0) {
        new_z = rotation.z + rightAxisX * -1.0 * (speed_ud) * (zoomvalue + 0.1)
        new_x = Math.max(Math.min(20.0, rotation.x + rightAxisY * -1.0 * (speed_lr) * (zoomvalue + 0.1)), -89.5)
        MovableCamera.setRot(new_x, 0.0, new_z, 2)
    }
}

function HandleZoom() {
    if (mp.players.local.vehicle) {
        if (mp.game.controls.isControlJustPressed(0, 241)) {
            fov = Math.max(fov - zoomspeed, fov_min)
        }

        if (mp.game.controls.isControlJustPressed(0, 242)) {
            fov = Math.min(fov + zoomspeed, fov_max)
        }
        var current_fov = MovableCamera.getFov();
        if (Math.abs(fov - current_fov) < 0.1) {
            fov = current_fov
        }
        MovableCamera.setFov(current_fov + (fov - current_fov) * 0.05)
    }
    else {

        if (mp.game.controls.isDisabledControlJustPressed(0, 17)) {
            fov = Math.max(fov - zoomspeed, fov_min)
        }
        if (mp.game.controls.isDisabledControlJustPressed(0, 16)) {
            fov = Math.min(fov + zoomspeed, fov_max)
        }
        var current_fov = MovableCamera.getFov();
        if (Math.abs(fov - current_fov) < 0.1) {
            fov = current_fov
        }
        MovableCamera.setFov(current_fov + (fov - current_fov) * 0.05)
        
    }
}

function MoveCamera() {
    const Player = mp.players.local;


    Player.setRotation(0, 0, new_z, 2, true);
    var zoomvalue = (1.0 / (fov_max - fov_min)) * (fov - fov_min)
    CheckInputRotation(zoomvalue);
    HandleZoom();

    var camHeading = mp.game.cam.getGameplayCamRelativeHeading();
    var camPitch = mp.game.invokeFloat('0x3A6867B4845BEDA2');
    if (camPitch < -70.0) {
        camPitch = -70.0
    }
    else if (camPitch > 42.0) {
        camPitch = 42.0
    }

    camPitch = (camPitch + 70.0) / 112.0

    if (camHeading < -180.0) {
        camHeading = -180.0
    }
    else if (camHeading > 180.0) {
        camHeading = 180.0
    }

    camHeading = (camHeading + 180.0) / 360.0

    mp.game.invoke("0xD5BB4025AE449A4E", mp.players.local, "Pitch", camPitch)
    mp.game.invoke("0xD5BB4025AE449A4E", mp.players.lcoal, "Heading", camHeading * -1.0 + 1.0)


}




}