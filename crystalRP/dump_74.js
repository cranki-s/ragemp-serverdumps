{
var GunShop = null;
mp.events.add('openGunShop', (data) => {  
    if (global.menuCheck() || GunShop != null) return;
    menuOpen();
	GunShop = mp.browsers.new('package://cef/System/GunShop/index.html');
    GunShop.execute(`GUNSHOP.open(${data})`);
});
mp.events.add('BuyWeapon', (itemName) => {  
    if (GunShop != null) 
        mp.events.callRemote("BuyWeapon:Server", itemName)
});
mp.keys.bind(0x1B, false, function () { 
    mp.events.call("CloseGunShop")
});
mp.events.add('CloseGunShop', () => {
    if (GunShop != null) {
        GunShop.destroy();
        GunShop = null;
	    menuClose();
    }
});
}