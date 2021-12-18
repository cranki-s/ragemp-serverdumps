{
let shopBrowser = null;
const hud = require('./instructional_buttons/hudManager');
const buttonHud = new hud(-1, "#000000");

mp.events.add("Client:VehicleShop:create", (items) => {
    if (shopBrowser != null) return;
    shopBrowser = mp.browsers.new("package://cef/vehshop/index.html");
    mp.events.call("Client:HUD:setVisible", false);
    let languageValue = mp.storage.data.language,
        language = "en";
    if (languageValue == undefined)
        language = "en";
    else language = languageValue;
    setTimeout(() => {
        shopBrowser.execute(`setLanguage('${language}');`);
        shopBrowser.execute(`setItems('${items}');`);
        mp.gui.cursor.show(true, true);
        if (language == "de")
            buttonHud.addButton("Cursor deaktiveren => Kamera bewegen", 169);
        else if (language == "en")
            buttonHud.addButton("Deactivate Cursor (F8) => Can move camera", 169);
        buttonHud.toggleHud(true);
    }, 500);
});

mp.events.add("Client:VehicleShop:buyVehicle", (shopId, name) => {
    if (parseInt(shopId) == 100) {
        mp.events.callRemote("Server:VehicleShop:SaleVehicle", parseInt(shopId), name);

    } else {
        mp.events.callRemote("Server:VehicleShop:buyVehicle", parseInt(shopId), name);
    }
});

mp.events.add("Client:VehicleShop:tryVehicle", (shopId, name) => {
    if (shopId == 100) {
        return;
    } else {
        mp.events.callRemote("Server:VehicleShop:tryVehicle", parseInt(shopId), name);
    }
    mp.events.callRemote("Server:VehicleShop:tryVehicle", parseInt(shopId), name);
});

mp.events.add("Client:VehicleShop:destroy", () => {
    if (shopBrowser != null) {
        mp.gui.cursor.show(false, false);
        shopBrowser.destroy();
        shopBrowser = null;
    }
    buttonHud.removeButtons();
    mp.events.call("Client:HUD:setVisible", true);
    mp.events.callRemote("Server:VehicleShop:DestroyShop");
});
}