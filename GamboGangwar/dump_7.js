{
let browser;

mp.events.add("Client:Garage:create", (teamVeh, privateVeh) => {
    if (browser != null) return;
    browser = mp.browsers.new("package://cef/garage/index.html");

    mp.players.local.freezePosition(true);
    mp.gui.cursor.show(true, true);

    setTimeout(() => {
        browser.execute(`openGarage('${teamVeh}', '${privateVeh}');`);
    }, 50);
});

mp.events.add("Client:Garage:spawn", (identifier, type) => {
    mp.events.callRemote("Server:Garage:spawn", identifier, type);
});

mp.events.add("Client:Garage:destroy", () => {
    mp.gui.cursor.show(false, false);
    mp.events.callRemote("setBrowserState", false);
    mp.players.local.freezePosition(false);

    if (browser != null) {
        browser.destroy();
        browser = null;
    }
});
}