{
let houseBrowser = null;

mp.events.add("Client:House:showBuyMenu", (houseId, housePrice) => {
    if (houseBrowser == null) houseBrowser = mp.browsers.new("package://cef/house/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        houseBrowser.execute(`setLanguage('${language}');`);
        houseBrowser.execute(`openHouseBuyMenu(${houseId}, ${housePrice});`);
        mp.gui.chat.activate(false);
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add("Client:House:openEntryInfo", (houseId, ownerName, level, price, vehicles) => {
    if (houseBrowser == null) houseBrowser = mp.browsers.new("package://cef/house/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        houseBrowser.execute(`setLanguage('${language}');`);
        houseBrowser.execute(`showHouseInfoBox(${houseId}, '${ownerName}', ${level}, ${price}, '${vehicles}');`);
        mp.gui.chat.activate(false);
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add("Client:House:takeVehicle", (houseId, name) => {
    if (houseId == undefined || houseId <= 0 || name == undefined || name.length <= 0) return;
    mp.events.callRemote("Server:House:takeVehicle", parseInt(houseId), name);
});

mp.events.add("Client:House:buyHouse", (houseId) => {
    if (houseId == undefined || houseId <= 0) return;
    mp.events.callRemote("Server:House:buyHouse", parseInt(houseId));
});

mp.events.add("Client:House:saleHouse", (houseId) => {
    if (houseId == undefined || houseId <= 0) return;
    mp.events.callRemote("Server:House:saleHouse", parseInt(houseId));
});

mp.events.add("Client:House:enterHouse", (houseId) => {
    if (houseId == undefined || houseId <= 0) return;
    mp.events.callRemote("Server:House:enterHouse", parseInt(houseId));
});

mp.events.add("Client:House:destroyBrowser", () => {
    if (houseBrowser != null) {
        mp.gui.cursor.show(false, false);
        houseBrowser.destroy();
        houseBrowser = null;
    }
    mp.gui.chat.activate(true);
    mp.events.callRemote("Server:Utilities:setCefState", false);
});
}