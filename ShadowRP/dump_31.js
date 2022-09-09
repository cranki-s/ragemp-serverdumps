{
let casinoBarLoaded = false;

mp.events.add("OpenCasunoBarMenu", (page, json3, json2) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	if(!casinoBarLoaded)
	{
		global.menuOpen();
		global.casinoBar = mp.browsers.new('http://package/browser/modules/Casino/Bar/index.html');
		global.casinoBar.active = true;
		casinoBarLoaded = true;
	}
	global.casinoBar.execute(`casinoBar.active=true`);
	global.casinoBar.execute(`casinoBar.buyitems=${json3}`);
	global.casinoBar.execute(`casinoBar.sellitems=${json2}`);
});
mp.events.add("CloseCasinoBarMenu", () => {
	global.menuClose();
	global.casinoBar.active = false;
	global.casinoBar.destroy();
	casinoBarLoaded = false;
});
mp.events.add("changePage7", (page) => {
	mp.events.callRemote("changePage2", page);
});
mp.events.add("CasinoBarBuy", (id, value) => {
	mp.events.callRemote("CasinoBarBuyitem", id, value);
	global.menuClose();
	global.casinoBar.active = false;
	global.casinoBar.destroy();
	casinoBarLoaded = false;
});
mp.keys.bind(Keys.VK_ESCAPE, false, function () {
	if (casinoBarLoaded == true) {
		global.menuClose();
		global.casinoBar.active = false;
		global.casinoBar.destroy();
		casinoBarLoaded = false;
	}
});
}