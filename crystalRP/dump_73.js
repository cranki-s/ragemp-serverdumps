{
let Shop = null;
mp.events.add('openShop', (data, info) => {  
    if (global.menuCheck() || ATM != null) return;
    menuOpen();
	Shop = mp.browsers.new('package://cef/System/Shop/index.html');
    Shop.execute(`SHOP.open(${data}, ${info})`);
});
mp.events.add('BuyShop', (listbuys, type) => {
    mp.events.callRemote("buyShop:Server", listbuys, type);
    mp.events.call("CloseShop");
})
mp.events.add('CloseShop', () => {
    if (Shop != null) {
        Shop.destroy();
        Shop = null;
	    menuClose();
    }
});
}