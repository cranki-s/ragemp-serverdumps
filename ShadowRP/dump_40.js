{
let fishMarketLoaded = false;
needped[1] = mp.peds.new(0xAD9EF1BB, new mp.Vector3(-1231.9276, -1509.184, 4.37360548), -61.9535, 0); 

mp.events.add("loadPage3", (page, json, json2, json3) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	if(!fishMarketLoaded)
	{
		global.menuOpen2();
		global.fishMarket = mp.browsers.new('http://package/browser/modules/Markets/Fish/index.html');
		global.fishMarket.active = true;
		fishMarketLoaded = true;
	}
	mp.game.audio.playAmbientSpeechWithVoice(needped[1].handle, 'GENERIC_HI', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
	global.fishMarket.execute(`fishMarket.active=true`);
	global.fishMarket.execute(`fishMarket.setinfo(${json})`);
	global.fishMarket.execute(`fishMarket.buyitems=${json2}`);
	global.fishMarket.execute(`fishMarket.sellitems=${json3}`);
});
mp.events.add("closeMarketMenu3", () => {
	global.menuClose2();
	global.fishMarket.active = false;
	global.fishMarket.destroy();
	fishMarketLoaded = false;
	mp.game.audio.playAmbientSpeechWithVoice(needped[1].handle, 'GENERIC_BYE', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
});
mp.events.add("changePage3", (page) => {
	mp.events.callRemote("changePage3", page);
});
mp.events.add("farmerBuy3", (item, value) => {
	mp.events.callRemote("buyFarmerItem3", item, value);
});
mp.events.add("farmerSell3", (item, value) => {
	mp.events.callRemote("sellFarmerItem3", item, value);
});
mp.events.add("sellgreat3", () => {
	mp.game.audio.playAmbientSpeechWithVoice(needped[1].handle, 'GENERIC_THANKS', '', 'SPEECH_PARAMS_FORCE_SHOUTED', !1);
});

mp.keys.bind(Keys.VK_ESCAPE, false, function () {
	if (fishMarketLoaded == true) {
	global.menuClose2();
	global.fishMarket.active = false;
	global.fishMarket.destroy();
	fishMarketLoaded = false;
	mp.game.audio.playAmbientSpeechWithVoice(needped[1].handle, 'GENERIC_BYE', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
	}
});
}