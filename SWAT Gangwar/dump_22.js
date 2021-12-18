{
let WeaponComponentsShopBrowser = null;
const hud = require('./instructional_buttons/hudManager');
const buttonHud = new hud(-1, "#000000");

mp.events.add("Client:WeaponComponentsShop:create", (shopId) => {
    if (WeaponComponentsShopBrowser != null) return;
    WeaponComponentsShopBrowser = mp.browsers.new("package://cef/weaponcomponentsshop/index.html");
    buttonHud.addButton("Cursor deaktiveren => Kamera bewegen  ", 169);
    buttonHud.toggleHud(true); 
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
        WeaponComponentsShopBrowser.execute(`setCount(${shopId});`);
    }, 900);
});

mp.events.add("Client:WeaponComponentsShop:requestWeaponComponentsFromCategory", (components) => {
    mp.events.callRemote("Server:WeaponComponentsShop:requestComponentsShopFromCategory", components);
});

mp.events.add("Client:WeaponComponentsShop:buyWeaponComponent", (componentsid) => {
    mp.events.callRemote("Server:WeaponComponentsShop:buyWeaponComponentsShop", componentsid);
    closeshop();
});

mp.events.add("Client:WeaponComponentsShop:tryWeaponComponent", (componentsid) => {
    mp.events.callRemote("Server:WeaponComponentsShop:tryWeaponComponentsShop", componentsid);
});

mp.events.add("Clientc:WeaponComponentsShop:setWeapopntoShow", (componentsid) => {
    mp.events.callRemote("Server:WeaponComponentsShop:setWeapopntoShow", componentsid);
});

mp.events.add("Client:WeaponComponentsShop:setWeaponComponentsContent", (json) => {
    if (WeaponComponentsShopBrowser == null) return;
    WeaponComponentsShopBrowser.execute(`setWeaponComponentContent('${json}');`);
});

mp.events.add("Client:WeaponComponentsShop:destroy", () => {
    if (WeaponComponentsShopBrowser != null) {
        mp.gui.cursor.show(false, false);
        WeaponComponentsShopBrowser.destroy();
        WeaponComponentsShopBrowser = null;
    }
    buttonHud.removeButtons();
    mp.events.callRemote("Server:WeaponComponentsShop:resetMods");
});

mp.events.add("Client:WeaponComponentsShop:reste", () => {
	mp.events.callRemote("Server:WeaponComponentsShop:resetMods");
	});

function closeshop() {
    if (WeaponComponentsShopBrowser != null) {
        mp.gui.cursor.show(false, false);
        WeaponComponentsShopBrowser.destroy();
        WeaponComponentsShopBrowser = null;
    }
	mp.events.callRemote("Server:WeaponComponentsShop:resetMods");
	buttonHud.removeButtons();
}
}