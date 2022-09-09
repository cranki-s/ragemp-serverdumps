{
let check = false;
let BuyBizMenuBrowser = null;

mp.keys.bind(0xA2, true, function () {
    //if (BuyBizMenuBrowser == null)
        //mp.events.callRemote("BuyBusinessMenu");
});

mp.events.add("OpenBuyBusinessMenu", (name, owner, price, mafia, id) => {
    if (BuyBizMenuBrowser == null)
    BuyBizMenuBrowser = mp.browsers.new('http://package/browser/modules/BusinessInfo/business.html');
    mp.events.call('showHUD', false);
    BuyBizMenuBrowser.execute(`
	app.name = ${JSON.stringify(name)}; 
	app.owner = ${JSON.stringify(owner)}; 
	app.price = ${JSON.stringify(price)}; 
	app.mafia = ${JSON.stringify(mafia)};
	app.id = ${JSON.stringify(id)};
	`);
    mp.gui.cursor.show(true, true);
	mp.game.graphics.transitionToBlurred(100);
});
mp.keys.bind(0x1B, true, function () {
	if (BuyBizMenuBrowser != null) {
        BuyBizMenuBrowser.destroy();
        BuyBizMenuBrowser = null;
		mp.events.call('showHUD', true);
        mp.gui.cursor.show(false, false);
		mp.game.graphics.transitionFromBlurred(100);
    }
});
mp.events.add("CloseBuyBusinessMenu", () => {
    if (BuyBizMenuBrowser != null) {
		mp.events.call('showHUD', true);
        BuyBizMenuBrowser.destroy();
        BuyBizMenuBrowser = null;
        mp.gui.cursor.show(false, false);
		mp.game.graphics.transitionFromBlurred(100);
    }
});
mp.events.add('buybiz', () => {
	mp.events.callRemote("buybiz");
});
}