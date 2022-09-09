{
let otherMarketLoaded = false;
needped[3] = mp.peds.new(0xE3420BDB, new mp.Vector3(-1262.4504, -1465.0596, 4.4074522), -57, 0); 

mp.events.add("loadPage6", (page, json, json2, json3) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	if(!otherMarketLoaded)
	{
		global.menuOpen2();
		global.otherMarket = mp.browsers.new('http://package/browser/modules/Markets/Other/index.html');
		global.otherMarket.active = true;
		otherMarketLoaded = true;
	}
	mp.game.audio.playAmbientSpeechWithVoice(needped[3].handle, 'GENERIC_HI', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
	global.otherMarket.execute(`otherMarket.active=true`);
	global.otherMarket.execute(`otherMarket.setinfo(${json})`);
	global.otherMarket.execute(`otherMarket.buyitems=${json2}`);
	global.otherMarket.execute(`otherMarket.sellitems=${json3}`);
});
mp.events.add("closeMarketMenu6", () => {
	global.menuClose2();
	global.otherMarket.active = false;
	global.otherMarket.destroy();
	otherMarketLoaded = false;
	mp.game.audio.playAmbientSpeechWithVoice(needped[3].handle, 'GENERIC_BYE', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
});
mp.events.add("changePage6", (page) => {
	mp.events.callRemote("changePage6", page);
});
mp.events.add("farmerBuy6", (item, value) => {
	mp.events.callRemote("buyFarmerItem6", item, value);
});
mp.events.add("farmerSell6", (item, value) => {
	mp.events.callRemote("sellFarmerItem6", item, value);
});
mp.events.add("sellgreat6", () => {
	mp.game.audio.playAmbientSpeechWithVoice(needped[3].handle, 'GENERIC_THANKS', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
});

}