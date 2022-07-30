{
let browser = null;

mp.events.add("Client:Login:createBrowser", (window, optionalData) => {
    mp.players.local.freezePosition(true);
    mp.gui.chat.activate(false);
    if (browser == null) {
        browser = mp.browsers.new("package://cef/login/index.html");
        mp.gui.cursor.show(true, true);

        if (window == "teamSelectBox")
            browser.execute(`setTeamlist('${optionalData}');`);
        else if (window == "loginBox" && mp.storage.data.loginData != undefined) {
            browser.execute(`openWindow('${window}', '${JSON.stringify(mp.storage.data.loginData)}');`);
            return;
        }

        browser.execute(`openWindow('${window}');`);
    }
});

mp.events.add("Client:Login:switchWindow", (newWindow, optionalData) => {
    if (browser == null) return;
    if (newWindow == "teamSelectBox")
        browser.execute(`setTeamlist('${optionalData}');`);
    else if (newWindow == "outfitSelectBox")
        browser.execute(`setOutfitlist('${optionalData}');`);

    browser.execute(`openWindow('${newWindow}');`);
});

mp.events.add("Client:Team:selectOutfit", outfitId => {
    mp.events.callRemote("Server:Team:selectOutfit", parseInt(outfitId));
});

mp.events.add("Client:Team:selectTeam", (teamId) => {
    mp.events.callRemote("Server:Team:selectTeam", parseInt(teamId));
});

mp.events.add("Client:Login:destroyLogin", () => {
    mp.players.local.freezePosition(false);
    mp.gui.chat.activate(true);
    mp.gui.cursor.show(false, false);

    if (browser != null) {
        browser.destroy();
        browser = null;
    }
});

mp.events.add("Client:Login:showMSG", (msg) => {
    if (browser != null) {
        browser.execute(`showError('${msg}');`);
    }
});

mp.events.add("Client:Login:loginTask", (username, password) => {
    if (!username.length || !password.length) return;
    mp.events.callRemote("Server:Login:loginTask", username, password);
});

mp.events.add("Client:Login:saveData", (username, encryptedPass) => {
    mp.storage.data.loginData = { "name": `${username}`, "password": `${encryptedPass}` };
    mp.storage.flush();
});
}