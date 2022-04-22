{
var accountBrowser = undefined;
var outfitBrowserVar = undefined;
var mainSceneryCamera = mp.cameras.new('default', new mp.Vector3(-2149.36279296875, -506.065673828125, 122.72872924804688), new mp.Vector3(0,0,0), 40);

mainSceneryCamera.pointAtCoord(-1577.41259765625, -571.633544921875, 116.30988311767578); // Changes the rotation of the camera to point towards a location
mainSceneryCamera.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);

mp.events.callRemote('setVariableLoginTime');

let waitingResponse = false;

mp.events.add("guiReady", () => {
    sharedVariables.localPlayer.setCoords(-1904.765625, -573.2905883789062, 19.097213745117188, false, false, false, false);
    sharedVariables.localPlayer.freezePosition(true);
    mainSceneryCamera.setActive(true);

    accountBrowser = mp.browsers.new("package://cef/login/index.html");

    mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    setTimeout(function() {
        mp.game.time.setClockTime(21, 00, 0);
        mp.gui.cursor.show(true, true);
    }, 200);
});

mp.events.add("sendLoginData", (username, password) => {
    if (!waitingResponse) {
        mp.events.callRemote("loginAccount", username, password);
        waitingResponse = true;
    }
});

mp.events.add("sendRegisterData", (username, password, verification) => {
    if (!waitingResponse) {
        mp.events.callRemote("registerAccount", username, password, verification);
        waitingResponse = true;
    }
});

mp.events.add("receiveAuthResult", (isSuccessful, resultBoxName, message) => {
    if (isSuccessful) {
        sharedVariables.localPlayer.freezePosition(false);

        if (accountBrowser) {
            mp.events.callRemote('removeVariableLoginTime');
            accountBrowser.active = false;
            accountBrowser.destroy();

            accountBrowser = undefined;
        }

	mp.events.call("toggleMainMenu", 3);

    } else {
        if (accountBrowser) {
            accountBrowser.execute(`document.getElementById("${resultBoxName}").style.display="${message}";`);
            waitingResponse = false;
        }
    }
});

mp.events.add("closeLogin", () => {
    if (accountBrowser) {
        mp.events.callRemote('removeVariableLoginTime');
        accountBrowser.active = false;
        accountBrowser.destroy();

        accountBrowser = undefined;
    }
});

mp.events.add("passmiss", () => {
    accountBrowser.execute(`document.getElementById("password-mismatch").style.display="flex";`);
});

mp.events.add("setOutfitBrowserVar", (toggle) => {
    if (toggle) {
        outfitBrowserVar = true;
    } else {
        outfitBrowserVar = false;
    }
});
}