{
let casinoMarketLoaded = false;

mp.events.add("loadPage2", (page, json3, json2) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	if(!casinoMarketLoaded)
	{
		global.menuOpen();
		global.casinoMarket = mp.browsers.new('http://package/browser/modules/Casino/Market/index.html');
		global.casinoMarket.active = true;
		casinoMarketLoaded = true;
	}
	global.casinoMarket.execute(`casinoMarket.active=true`);
	global.casinoMarket.execute(`casinoMarket.buyitems=${json3}`);
	global.casinoMarket.execute(`casinoMarket.sellitems=${json2}`);
});
mp.events.add("closeMarketMenu2", () => {
	global.menuClose();
	global.casinoMarket.active = false;
	global.casinoMarket.destroy();
	casinoMarketLoaded = false;
});
mp.events.add("changePage2", (page) => {
	mp.events.callRemote("changePage2", page);
});
mp.events.add("farmerBuy2", (item, value) => {
	mp.events.callRemote("buyFarmerItem2", item, value);
	global.menuClose();
	global.casinoMarket.active = false;
	global.casinoMarket.destroy();
	casinoMarketLoaded = false;
});
mp.events.add("farmerSell2", (item, value) => {
	mp.events.callRemote("sellFarmerItem2", item, value);
	global.menuClose();
	global.casinoMarket.active = false;
	global.casinoMarket.destroy();
	casinoMarketLoaded = false;
});
mp.keys.bind(Keys.VK_ESCAPE, false, function () {
	if (casinoMarketLoaded == true) {
		global.menuClose();
		global.casinoMarket.active = false;
		global.casinoMarket.destroy();
		casinoMarketLoaded = false;
	}
});
}