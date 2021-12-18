{
let browser = null,
    lastInteract = 0,
    $crosshair = true,
    spamsafe = false;

function canInteract() {
    return lastInteract + 5000 < Date.now();
}

mp.keys.bind(0x71, true, function() {
    if (spamsafe) return;
    spamsafe = true;
    if (browser != null) return;
    if (mp.gui.cursor.visible || mp.players.local.getVariable("IsCefOpen") == true) return;
    mp.events.callRemote("Server:MainMenu:openMenuByHotkey");
    setTimeout(() => {
        spamsafe = false;
    }, 2000);
});

mp.events.add("Client:MainMenu:generateDiscordSyncToken", () => {
    mp.events.callRemote("Server:MainMenu:generateDiscordSyncToken");
});

mp.events.add("Client:MainMenu:selectNitroVeh", (vehName) => {
    mp.events.callRemote("Server:MainMenu:selectNitroVeh", vehName);
});

mp.events.add("Client:MainMenu:toggleSetting", (setting) => {
    mp.events.callRemote("Server:MainMenu:toggleSetting", setting);
});

mp.events.add("Client:MainMenu:setSetting", (htmlId, checked) => {
    if (browser == null) return;
    browser.execute(`setSetting('${htmlId}', ${checked});`);
});

mp.events.add("Client:MainMenu:setBackground", (bgId) => {
    if (bgId == undefined) return;
    mp.storage.data.backgroundId = parseInt(bgId);
    mp.storage.flush();
});

mp.events.add("Client:MainMenu:setCrossair", () => {
    let crosshairValue = mp.storage.data.crossair;
    if (crosshairValue == undefined) {
        mp.storage.data.crossair = true;
        mp.storage.flush();
        $crosshair = true;
    } else{
        if (crosshairValue){
            $crosshair = false;
            mp.storage.data.crossair = false;
            mp.storage.flush();
        
        }else if (!crosshairValue){
            $crosshair = true;
            mp.storage.data.crossair = true;
            mp.storage.flush();
        }
    }


    if (crosshairValue == undefined) $crosshair = true;
    else $crosshair = crosshairValue;
    $crosshair = !$crosshair;
    mp.storage.data.crossair = $crosshair;
    mp.storage.flush();
});

mp.events.add("Client:MainMenu:setLanguage", (language) => {
    if (language == undefined) return;
    mp.storage.data.language = language;
    mp.storage.flush();
    mp.events.callRemote("Server:MainMenu:selectLanguage", language);
});

mp.events.add("Client:MainMenu:setNewName", (newName) => {
    mp.events.callRemote("Server:MainMenu:setNewName", newName);
});

mp.events.add("Client:MainMenu:resetKillsDeaths", () => {
    mp.events.callRemote("Server:MainMenu:resetKillsDeaths");
});

mp.events.add("Client:MainMenu:open", (category, name, teamId, teamName, swatcoins, playerCount, maxCount, rankId, rankName, eloPoints, currentEXP, currentLevel, prestige) => {
    let storageValue = mp.storage.data.backgroundId;
    let languageValue = mp.storage.data.language;
    let bgId = 0;
    let language = "en";
    if (storageValue == undefined)
        bgId = 0;
    else bgId = storageValue;
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    if (browser == null) browser = mp.browsers.new("package://cef/mainmenu/index.html");
    mp.game.cam.doScreenFadeOut(500);
    mp.gui.cursor.show(true, true);
    mp.gui.chat.activate(false);
    setTimeout(() => {
        browser.execute(`setLanguage('${language}');`);
        browser.execute(`setBackground(${bgId});`);
        if (category == "login") {
            browser.execute(`openMainMenu('${category}');`);
            mp.gui.cursor.show(true, true);
        } else if (category == "mainMenu") {
            browser.execute(`openMainMenu('${category}');`);
            browser.execute(`setName('${name}');`);
            browser.execute(`setTeamName(${teamId}, '${teamName}');`);
            browser.execute(`setPlayerCount(${playerCount}, ${maxCount});`);
            browser.execute(`setInfobarContent(${rankId}, '${rankName}', ${eloPoints}, ${currentEXP}, ${currentLevel}, ${prestige}, ${swatcoins});`);
            mp.gui.cursor.show(true, true);
        } else if (category == "teamMenu") {
            browser.execute(`openMainMenu('${category}');`);
            mp.gui.cursor.show(true, true);
        }
    }, 50);
});

mp.events.add("Client:MainMenu:updateSyncToken", (token) => {
    if (browser == null) return;
    browser.execute(`setDiscordSyncToken('${token}');`);
});

mp.events.add("Client:MainMenu:Notification", (message, duration) => {
    setTimeout(() => {
        if (browser == null) return;
        browser.execute(`showNotification('${message}', ${duration});`);
    }, 50);
});

mp.events.add("Client:MainMenu:selectStreetfight", () => {
    mp.events.callRemote("Server:MainMenu:selectStreetfight");
    closeMenu(1000, false);
});

mp.events.add("Client:MainMenu:joinFFAArena", (ffaId, pass) => {
    mp.events.callRemote("Server:MainMenu:joinFFAArena", parseInt(ffaId), pass);
    //closeMenu(1000, false);
});

mp.events.add("Client:MainMenu:requestsTeamForTeamMenu", () => {
    mp.events.callRemote("Server:MainMenu:requestsTeamForTeamMenu");
});

mp.events.add("Client:MainMenu:switchFromMainMenuToTeamMenu", (teamJson) => {
    if (browser == null) return;
    browser.execute(`setTeams('${teamJson}');`);
    browser.execute(`switchFromMainMenuToTeamMenu();`);
});

mp.events.add("Client:MainMenu:joinGungame", () => {
    mp.events.callRemote("Server:MainMenu:joinGungame");
    //closeMenu(1000, false);
});

mp.events.add("Client:MainMenu:joinLTS", () => {
    browser.execute(`showNotification("Coming Soon!");`);
    //mp.events.callRemote("Server:MainMenu:joinLTS");
});

mp.events.add("Client:Ranked:joinRanked", () => {
    mp.events.callRemote("Server:Ranked:joinQueue");
});

mp.events.add("Client:Ranked:leaveRankedServer", () => {
    mp.events.callRemote("Server:Ranked:leaveRankedServer");
});

mp.events.add("Client:Ranked:leaveRanked", () => {
    if (browser == null) return;
    browser.execute(`leaveRanked();`);
});

// Login
mp.events.add("Client:Login:tryLogin", username => {
    if (!username.length) return;
    mp.events.callRemote("Server:Login:tryLogin", username);
});

mp.events.add("Client:MainMenu:switchFromLoginToTeamSelect", (name, teamJson) => {
    if (browser == null) return;
    browser.execute(`switchFromLoginToTeamSelect('${name}', '${teamJson}');`);
});

// Battle Royale
mp.events.add("Client:BattleRoyale:setDuoSearching", (isDuo) => {
    if (isDuo == undefined) return;
    mp.events.callRemote("Server:BattleRoyale:setDuoSearching", `${isDuo}`);
});

mp.events.add("Client:BattleRoyale:selectArena", (arenaId) => {
    if (arenaId == undefined) return;
    mp.events.callRemote("Server:BattleRoyale:selectArena", parseInt(arenaId));
});

mp.events.add("Client:MainMenu:updateBRArenas", (brArenaJson) => {
    setTimeout(() => {
        if (browser == null) return;
        browser.execute(`setBattleRoyaleArenas('${brArenaJson}');`);
    }, 50);
});

mp.events.add("Client:MainMenu:createPrivateFFAArena", (arenaName, arenaPass, arenaMaxP, $privateFFASelectedMap) => {
    if (arenaName == undefined || arenaPass == undefined || arenaMaxP == undefined || parseInt(arenaMaxP) <= 0 || $privateFFASelectedMap == undefined || $privateFFASelectedMap <= 0) return;
    mp.events.callRemote("Server:MainMenu:createPrivateFFAArena", arenaName, arenaPass, parseInt(arenaMaxP), parseInt($privateFFASelectedMap));
});

// Team
mp.events.add("Client:MainMenu:setTeams", (teamJson) => {
    setTimeout(() => {
        if (browser == null) return;
        browser.execute(`setTeams('${teamJson}');`);
    }, 50);
});

mp.events.add("Client:MainMenu:selectTeam", (teamId) => {
    if (teamId <= 0 || teamId == undefined) return;
    mp.events.callRemote("Server:MainMenu:selectTeam", parseInt(teamId));
});

// Outfitselect
mp.events.add("Client:MainMenu:switchTeamToOutfitSelect", (outfitJson) => {
    if (browser == null) return;
    browser.execute(`switchTeamToOutfitSelect('${outfitJson}');`);
});

mp.events.add("Client:MainMenu:selectOutfit", (outfitId) => {
    if (outfitId <= 0 || outfitId == undefined) return;
    mp.events.callRemote("Server:MainMenu:selectOutfit", parseInt(outfitId));
});

mp.events.add("Client:MainMenu:requestVorteileSite", () => {
    mp.events.callRemote("Server:MainMenu:requestVorteileSite");
});

mp.events.add("Client:MainMenu:requestSettingsSite", () => {
    mp.events.callRemote("Server:MainMenu:requestSettingsSite");
});

mp.events.add("Client:MainMenu:requestBRLobbies", () => {
    mp.events.callRemote("Server:MainMenu:requestBRLobbies");
});

mp.events.add("Client:MainMenu:requestPrivateFFAMaps", () => {
    mp.events.callRemote("Server:MainMenu:requestPrivateFFAMaps");
});

mp.events.add("Client:MainMenu:requestFFALobbies", () => {
    mp.events.callRemote("Server:MainMenu:requestFFALobbies");
});

mp.events.add("Client:MainMenu:setFFALobbies", (ffaJson) => {
    if (browser == null) return;
    browser.execute(`setFFAArenas('${ffaJson}');`);
});

mp.events.add("Client:MainMenu:setPrivateFFAMaps", (mapJson) => {
    if (browser == null) return;
    browser.execute(`setFFAPrivateMaps('${mapJson}');`);
});

mp.events.add("Client:MainMenu:setVorteileSiteValues", (nitroVehJson, isNitroBooster, dcToken) => {
    if (browser == null) return;
    browser.execute(`setDiscordSyncToken('${dcToken}');`);
    browser.execute(`setNitroVehs(${isNitroBooster}, '${nitroVehJson}');`);
});

mp.events.add("Client:MainMenu:setSettingsSiteValues", (are1vs1RequestsEnabled, isSpawningOnHouse, isCustomClothesActive, playerId) => {
    if (browser == null) return;
    let crosshairValue = mp.storage.data.crossair;

    if (crosshairValue == undefined)
        $crosshair = true;
    else $crosshair = crosshairValue;

    browser.execute(`setSettings(${are1vs1RequestsEnabled}, ${isSpawningOnHouse}, ${isCustomClothesActive},${crosshairValue}, ${playerId});`);
});

mp.events.add("Client:MainMenu:switchFromOutfitToMainMenu", (name, teamId, teamName, swatcoins, playerCount, maxCount, rankId, rankName, eloPoints, currentEXP, currentLevel, prestige) => {
    if (browser == null) return;
    browser.execute(`setName('${name}');`);
    browser.execute(`setTeamName(${teamId}, '${teamName}');`);
    browser.execute(`setPlayerCount(${playerCount}, ${maxCount});`);
    browser.execute(`switchFromOutfitToMainMenu();`);
    browser.execute(`setInfobarContent(${rankId}, '${rankName}', ${eloPoints}, ${currentEXP}, ${currentLevel}, ${prestige}, ${swatcoins});`);
});

function closeMenu(timeout, setMainState) {
    mp.players.local.freezePosition(false);
    mp.gui.cursor.show(false, false);
    mp.events.callRemote("Server:Utilities:setCefState", false);
    if (setMainState)
        mp.events.callRemote("Server:Utilities:setMainMenuState", false);
    mp.gui.chat.activate(true);
    setTimeout(() => {
        if (browser != null) {
            browser.destroy();
            browser = null;
        }

        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(1500);
        }, timeout);
    }, 500);
}

mp.events.add("Client:MainMenu:destroy", (timeout) => {
    closeMenu(timeout, false);
});

mp.events.add("render", () => {
    if (!$crosshair) {
        mp.game.ui.hideHudComponentThisFrame(14);
    }
});
}