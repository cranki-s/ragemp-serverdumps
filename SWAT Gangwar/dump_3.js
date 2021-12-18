{
let garageBrowser = null,
    privateCars = [],
    prestigeCars = [],
    vehicles = [];

mp.events.add("Client:Garage:createBrowser", (garageId, vehicles, privateCars, prestigeCars) => {
    if (garageBrowser != null) return;
    garageBrowser = mp.browsers.new("package://cef/garage/index.html");
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        garageBrowser.execute(`setLanguage('${language}');`);
        garageBrowser.execute(`setFactionCars(${garageId},'${vehicles}');`);
        garageBrowser.execute(`setPrivateCars(${garageId},'${privateCars}');`);
        garageBrowser.execute(`setPrestigeCars(${garageId}, '${prestigeCars}');`);
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add("Client:Garage:takeVehicle", (garageId, vehName, typ) => {
    mp.events.callRemote("Server:Garage:takeVehicle", parseInt(garageId), vehName, parseInt(typ));
});

mp.events.add("Client:Garage:destroyBrowser", () => {
    if (garageBrowser != null) {
        mp.gui.cursor.show(false, false);
        garageBrowser.destroy();
        garageBrowser = null;
    }
});
}