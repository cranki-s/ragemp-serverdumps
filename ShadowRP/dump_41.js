{
let mushMarketLoaded = false;
needped[2] = mp.peds.new(0x94562DD7, new mp.Vector3(-1269.5475, -1483.5403, 4.3436161), -64, 0); 

mp.events.add("loadPage", (page, json, json2, json3) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	if(!mushMarketLoaded)
	{
		global.menuOpen2();
		global.mushMarket = mp.browsers.new('http://package/browser/modules/Markets/Mush/index.html');
		global.mushMarket.active = true;
		mushMarketLoaded = true;
	}
	mp.game.audio.playAmbientSpeechWithVoice(needped[2].handle, 'GENERIC_HI', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
	global.mushMarket.execute(`mushMarket.active=true`);
	global.mushMarket.execute(`mushMarket.setinfo(${json})`);
	global.mushMarket.execute(`mushMarket.buyitems=${json2}`);
	global.mushMarket.execute(`mushMarket.sellitems=${json3}`);
});
mp.events.add("closeMarketMenu", () => {
	global.menuClose2();
	global.mushMarket.active = false;
	global.mushMarket.destroy();
	mushMarketLoaded = false;
	mp.game.audio.playAmbientSpeechWithVoice(needped[2].handle, 'GENERIC_BYE', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
});
mp.events.add("changePage", (page) => {
	mp.events.callRemote("changePage", page);
});
mp.events.add("farmerBuy", (item, value) => {
	mp.events.callRemote("buyFarmerItem", item, value);
});
mp.events.add("farmerSell", (item, value) => {
	mp.events.callRemote("sellFarmerItem", item, value);
});
mp.events.add("sellgreat1", () => {
	mp.game.audio.playAmbientSpeechWithVoice(needped[2].handle, 'GENERIC_THANKS', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
});
mp.keys.bind(Keys.VK_ESCAPE, false, function () {
	if (mushMarketLoaded == true) {
		global.menuClose2();
		global.mushMarket.active = false;
		global.mushMarket.destroy();
		mushMarketLoaded = false;
		mp.game.audio.playAmbientSpeechWithVoice(needped[2].handle, 'GENERIC_BYE', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
	}
});
}