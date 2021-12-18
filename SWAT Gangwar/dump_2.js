{
let hudBrowser = null,
    hitmarkerActive = false;

mp.events.add("Client:HUD:createBrowser", (deaths, kills, level, exp, playermoney, prestige, maxexp) => {
    if (hudBrowser == null) hudBrowser = mp.browsers.new("package://cef/hud/index.html");

    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;

    setTimeout(() => {
        hudBrowser.execute(`setLanguage('${language}');`);
        hudBrowser.execute(`updateDeaths(${deaths});`);
        hudBrowser.execute(`updateKills(${kills});`);
        hudBrowser.execute(`updateLevel(${level});`);
        hudBrowser.execute(`updateMoney(${playermoney});`);
        hudBrowser.execute(`updateEXP(${exp}, ${maxexp});`);
        hudBrowser.execute(`updatePrestige(${prestige});`);
    }, 50);
});

mp.events.add("Client:HUD:setLanguage", (lng) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`setLanguage('${lng}');`);
});

mp.events.add("Client:HUD:setAnticheat", () => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`showAC();`);
});

mp.events.add("Client:HUD:destroyBrowser", () => {
    if (hudBrowser != null) {
        mp.gui.cursor.show(false, false);
        hudBrowser.destroy();
        hudBrowser = null;
    }
});

mp.events.add("Client:HUD:ShowGunGame", (wert) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`showGG(${wert});`);
});

mp.events.add("Client:HUD:UpdateGG", (fName, fLvl, sName, sLvl, tName, tLvl, mlvl) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`updateGG('${fName}', ${fLvl}, '${sName}', ${sLvl}, '${tName}', ${tLvl}, ${mlvl});`);
});

mp.events.add("Client:HUD:ShowNotification", (type, msg, time) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`ShowNotification(${type}, '${msg}', ${time});`);
});

mp.events.add("Client:HUD:updateKills", (kills) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`updateKills(${kills});`);
});

mp.events.add("Client:HUD:updateDeaths", (deaths) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`updateDeaths(${deaths});`);
});

mp.events.add("Client:HUD:updateMoney", (playermoney) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`updateMoney(${playermoney});`);
});

mp.events.add("Client:HUD:updateLevel", (level) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`updateLevel(${level});`);
});

mp.events.add("Client:HUD:updateEXP", (exp, maxexp) => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`updateEXP(${exp}, ${maxexp});`);
});

mp.events.add("Client:HUD:showDeathscreen", () => {
    if (hudBrowser == null) return;
    hudBrowser.execute(`playDeathScreen();`);
});

mp.keys.bind(0x73, false, function() {
    if (hudBrowser == null) return;
    hudBrowser.execute(`toggleCrosshair();`);
});

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    if (targetEntity == null || !hitmarkerActive || targetEntity.type != 'player') return;
    hudBrowser.execute(`triggerHitmarker();`);
});

mp.keys.bind(0x74, false, function() {
    if (hitmarkerActive) mp.gui.chat.push("Hitmarker wurde deaktiviert.");
    else mp.gui.chat.push("Hitmarker wurde aktiviert.");
    hitmarkerActive = !hitmarkerActive;
});

mp.events.add("Client:HUD:setVisible", (isVisible) => {
    setTimeout(() => {
        hudBrowser.execute(`setVisible(${isVisible});`);
    }, 50);
});

//HUD toggle
mp.keys.bind(0x22, false, function() {
    if (hudBrowser == null) return;
    hudBrowser.execute(`toggleVisible();`);
});
}