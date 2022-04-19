{
var CasinoFish = null;
mp.events.add('OpenCasinoFishMenu', (casArr) => {
	if (global.menuCheck() || CasinoFish != null) return;
    menuOpen();
	CasinoFish = mp.browsers.new('package://cef/casino/roulettee/index.html');
	CasinoFish.execute(`Roulbuy.open(${casArr});`);
});
mp.events.add('Chips', (count, type) => {
	mp.events.call("CloseRoulMenu");
    mp.events.callRemote("Chips:Server", count, type);
});
mp.events.add('CloseRoulMenu', () => {
	if (CasinoFish == null) return;
	CasinoFish.destroy();
	CasinoFish = null;
	menuClose();
});
}