{
globalThis.browser = null;
globalThis.canMainMenuBrowserBeClosed = true;

mp.events.add("Client:Mainmenu:SetCanBrowserBeClosed", (canBeClosed) => {
    globalThis.canMainMenuBrowserBeClosed = canBeClosed;
});

mp.events.add("Client:MainMenu:open", (mainMenuObject) => {
    if (globalThis.browser != null || mainMenuObject == undefined) return;
    mp.events.call("Client:HUD:setOpacity", 0);
    mp.game.graphics.transitionToBlurred(250);
    globalThis.browser = mp.browsers.new("package://cef/mainmenu/index.html");

    setTimeout(() => {
        globalThis.browser.execute(`setMainMenuData('${mainMenuObject}', true);`);
    }, 100);
    mp.gui.cursor.show(true, true);
});

mp.events.add("Client:MainMenu:setRecruitedPlayer", (name) => {
    if (!globalThis.canInteract()) return;
    globalThis.lastInteract = Date.now();
    mp.events.callRemote("Server:MainMenu:setRecruitedPlayer", name);
});

mp.events.add("Client:MainMenu:setBoostData", (json) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setXPBoostData('${json}');`);
});

mp.events.add("Client:MainMenu:activateBoost", (type) => {
    if (!globalThis.canInteract()) return;
    globalThis.lastInteract = Date.now();
    mp.events.callRemote("Server:MainMenu:activateBoost", parseInt(type));
});

mp.events.add("Client:MainMenu:setReferredPlayer", (name) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setReferredPlayer('${name}');`);
});

mp.events.add("Client:MainMenu:setName", (name) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setName('${name}');`);
});

mp.events.add("Client:MainMenu:updateMainMenuObject", (mainMenuObject) => {
    if (globalThis.browser == undefined || mainMenuObject == undefined) return;
    globalThis.browser.execute(`setMainMenuData('${mainMenuObject}', false);`);
});

mp.events.add("Client:MainMenu:changeName", (newName) => {
    if (!globalThis.canInteract()) return;
    globalThis.lastInteract = Date.now();
    mp.events.callRemote("Server:MainMenu:changeName", newName);
});

mp.events.add("Client:FFA:joinArena", (arenaId, password) => {
    mp.events.callRemote("Server:FFA:joinArena", arenaId, password);
    closeMainMenu();
});

mp.events.add("Client:MainMenu:deleteFriend", (ID) => {
    mp.events.callRemote("Server:MainMenu:deleteFriend", parseInt(ID));
});

mp.events.add("Client:MainMenu:createFFA", (mapId, playerCount, cheaterAllowed, password) => {
    if (!globalThis.canInteract()) return;
    globalThis.lastInteract = Date.now();
    mp.events.callRemote("Server:MainMenu:createFFA", mapId, playerCount, cheaterAllowed, password);
    closeMainMenu();
});

mp.events.add("Client:MainMenu:requestHome", () => {
    mp.events.callRemote("Server:MainMenu:open", false);
});

mp.events.add("Client:MainMenu:selectPrivateVehicle", (name, hash) => {
    if (!globalThis.canInteract()) return;
    globalThis.lastInteract = Date.now();
    mp.events.callRemote("Server:MainMenu:selectPrivateVehicle", name, hash);
});

mp.events.add("Client:MainMenu:requestAchievements", () => {
    mp.events.callRemote("Server:MainMenu:requestAchievements");
});

mp.events.add("Client:Versus:sendRequest", (selectedVersusMapId, roundAmount, ownWeaponSet, playerName) => {
    if (!globalThis.canInteract()) return;
    globalThis.lastInteract = Date.now();
    mp.events.callRemote("Server:Versus:sendRequest", parseInt(selectedVersusMapId), parseInt(roundAmount), ownWeaponSet, playerName);
});

mp.events.add("Client:MainMenu:requestSettings", () => {
    if (globalThis.browser != null)
        browser.execute(`setHotKeys('${JSON.stringify(mp.storage.data.hotkeyData)}');`);

    mp.events.callRemote("Server:MainMenu:requestSettings");
});

mp.events.add("Client:MainMenu:addFriend", (targetName) => {
    if (!globalThis.canInteract()) return;
    mp.events.callRemote("Server:MainMenu:addFriend", targetName);
    globalThis.lastInteract = Date.now();
});

mp.events.add("Client:MainMenu:declineFriend", (ID) => {
    mp.events.callRemote("Server:MainMenu:declineFriend", parseInt(ID));
});

mp.events.add("Client:MainMenu:acceptFriend", (ID) => {
    mp.events.callRemote("Server:MainMenu:acceptFriend", parseInt(ID));
});

mp.events.add("Client:MainMenu:setFriendRequests", (requests) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setFriendRequests('${requests}');`);
});

mp.events.add("Client:MainMenu:setSettings", (settingsObj) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setSettings('${settingsObj}');`);
});

mp.events.add("Client:MainMenu:setAchievements", (json) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setAchievementData('${json}');`);
});

mp.events.add("Client:MainMenu:setFFAArena", (private, public, hvh, maps) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setFFAArenas('${private}', '${public}', '${hvh}', '${maps}');`);
});

mp.events.add("Client:MainMenu:requestFFA", () => {
    mp.events.callRemote("Server:MainMenu:requestFFA");
});

mp.events.add("Client:MainMenu:joinGungame", () => {
    mp.events.callRemote("Server:MainMenu:joinGungame");
    closeMainMenu();
});

mp.events.add("Client:MainMenu:selectStreetfight", () => {
    mp.events.callRemote("Server:MainMenu:selectStreetfight");
    closeMainMenu();
});

mp.events.add("Client:MainMenu:requestTeams", () => {
    mp.events.callRemote("Server:MainMenu:requestTeams");
});

mp.events.add("Client:MainMenu:setTeams", (teamJson) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setTeams('${teamJson}');`);
});

mp.events.add("Client:MainMenu:selectTeam", (teamId) => {
    mp.events.callRemote("Server:MainMenu:selectTeam", teamId);
});

mp.events.add("Client:MainMenu:selectOutfit", (outfitId) => {
    mp.events.callRemote("Server:MainMenu:selectOutfit", outfitId);
    closeMainMenu();
});

mp.events.add("Client:MainMenu:setOutfits", (outfits) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setOutfits('${outfits}');`);
});

mp.events.add("Client:MainMenu:requestWeaponEditorWeapons", () => {
    mp.events.callRemote("Server:MainMenu:requestWeaponEditorWeapons");
});

mp.events.add("Client:WeaponEditor:setAttachmentList", (availableComps, curComps) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`fillAttachmentList('${availableComps}', '${curComps}');`);
});

mp.events.add("Client:WeaponEdtor:changeAttachment", (category, compId, type) => {
    mp.events.callRemote("Server:WeaponEditor:changeAttachment", compId, category, type);
});

mp.events.add("Client:WeaponEditor:requestAttachmentList", (hash) => {
    mp.events.callRemote("Server:WeaponEditor:requestAttachmentList", hash);
});

mp.events.add("Client:MainMenu:setWeaponEditor", (primary, primarySecondary, secondary, melee, currentWeaponSet) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`initWeaponEditorConfigurationData('${primary}', '${primarySecondary}', '${secondary}', '${melee}', '${currentWeaponSet}');`);
});

mp.events.add("Client:WeaponEditor:selectWeapon", (category, hash) => {
    mp.events.callRemote("Server:WeaponEditor:selectWeapon", category, hash);
});

mp.events.add("Client:WeaponEditor:setOnlyCurrentSet", (currentSet) => {
    if (globalThis.browser == null) return;
    globalThis.browser.execute(`setOnlyCurrentWeaponSet('${currentSet}');`);
});


globalThis.closeMainMenu = function() {
    mp.events.callRemote("setBrowserState", false);
    mp.events.call("Client:HUD:setOpacity", 1);
    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);

    if (globalThis.browser != null) {
        mp.game.graphics.transitionFromBlurred(250);
        globalThis.browser.destroy();
        globalThis.browser = null;
    }
}
}