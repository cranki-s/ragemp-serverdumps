{
globalThis.hudBrowser = null;

mp.events.add("Client:HUD:create", (kills, deaths, money, currentEXP, maxEXP, level) => {
    if (globalThis.hudBrowser != null) return;
    globalThis.hudBrowser = mp.browsers.new("package://cef/hud/index.html");

    setTimeout(() => {
        globalThis.hudBrowser.execute(`setEXP(${currentEXP}, ${maxEXP});`);
        globalThis.hudBrowser.execute(`setLevel(${level});`);
        globalThis.hudBrowser.execute(`setKills(${kills});`);
        globalThis.hudBrowser.execute(`setDeaths(${deaths});`);
        globalThis.hudBrowser.execute(`setMoney(${money});`);
    }, 50);
});

mp.events.add("Client:HUD:addKillFeed", (killer, target, weapon) => {
    if (globalThis.hudBrowser == null) return;
    globalThis.hudBrowser.execute(`addKillFeed('${killer}', '${target}', ${weapon});`);
});

mp.events.add("Client:HUD:sendNotification", (text, acceptHotkeys, duration) => {
    if (globalThis.browser != null) {
        globalThis.browser.execute(`addNotification('${text}', ${acceptHotkeys}, ${duration});`);
    } else {
        if (globalThis.hudBrowser == null) return;
        globalThis.hudBrowser.execute(`addNotification('${text}', ${acceptHotkeys}, ${duration});`);
    }
});

mp.events.add("Client:HUD:setOpacity", (opacity) => {
    if (globalThis.hudBrowser == null) return;
    globalThis.hudBrowser.execute(`setOpacity(${opacity});`);
});

mp.events.add("Client:HUD:setDeaths", (deaths) => {
    if (globalThis.hudBrowser == null) return;
    globalThis.hudBrowser.execute(`setDeaths(${deaths});`);
});

mp.events.add("Client:HUD:setKills", (kills) => {
    if (globalThis.hudBrowser == null) return;
    globalThis.hudBrowser.execute(`setKills(${kills});`);
});

mp.events.add("Client:HUD:setMoney", (money) => {
    if (globalThis.hudBrowser == null) return;
    globalThis.hudBrowser.execute(`setMoney(${money});`);
});

mp.events.add("Client:HUD:setEXP", (currentEXP, maxEXP) => {
    if (globalThis.hudBrowser == null) return;
    globalThis.hudBrowser.execute(`setEXP(${currentEXP}, ${maxEXP});`);
});

mp.events.add("Client:HUD:setLevel", (level, currentEXP, maxEXP) => {
    if (globalThis.hudBrowser == null) return;
    globalThis.hudBrowser.execute(`setEXP(${currentEXP}, ${maxEXP});`);
    globalThis.hudBrowser.execute(`setLevel(${level});`);
});

mp.events.add("Client:HUD:addAchievement", (title, reward) => {
    if (globalThis.hudBrowser == null) return;
    globalThis.hudBrowser.execute(`addAchievement('${title}', '${reward}');`);
});

mp.events.add("Client:HUD:destroy", () => {
    if (globalThis.hudBrowser != null) {
        globalThis.hudBrowser.destroy();
        globalThis.hudBrowser = null;
    }
});
}