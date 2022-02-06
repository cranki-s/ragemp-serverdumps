{
var GunShop = null;
mp.events.add('openGunShop', () => {  
    if (global.menuCheck() || GunShop != null) return;
    menuOpen();
	GunShop = mp.browsers.new('package://cef/System/GunShop/index.html');
    GunShop.execute(`GunShop.open()`);
});
mp.events.add('BuyWeapon', (type, price) => {  
    if (GunShop != null) 
        mp.events.callRemote("BuyWeapon:Server", type, price)
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