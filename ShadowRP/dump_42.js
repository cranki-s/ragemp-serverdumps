{
let blackMarketLoaded = false;
needped[4] = mp.peds.new(0xC54E878A, new mp.Vector3(-1265.9005, -1469.4127, 4.3275348), -146, 0); 

mp.events.add("loadPage5", (page, json, json2, json3) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	if(!blackMarketLoaded)
	{
		global.menuOpen2();
		global.blackMarket = mp.browsers.new('http://package/browser/modules/Markets/Black/index.html');
		global.blackMarket.active = true;
		blackMarketLoaded = true;
	}
	mp.game.audio.playAmbientSpeechWithVoice(needped[4].handle, 'GENERIC_HI', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
	global.blackMarket.execute(`blackMarket.active=true`);
	global.blackMarket.execute(`blackMarket.setinfo(${json})`);
	global.blackMarket.execute(`blackMarket.buyitems=${json2}`);
	global.blackMarket.execute(`blackMarket.sellitems=${json3}`);
});
mp.events.add("closeMarketMenu5", () => {
	global.menuClose2();
	global.blackMarket.active = false;
	global.blackMarket.destroy();
	blackMarketLoaded = false;
	mp.game.audio.playAmbientSpeechWithVoice(needped[4].handle, 'GENERIC_BYE', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
});
mp.events.add("changePage5", (page) => {
	mp.events.callRemote("changePage5", page);
});
mp.events.add("farmerBuy5", (item, value) => {
	mp.events.callRemote("buyFarmerItem5", item, value);
});
mp.events.add("farmerSell5", (item, value) => {
	mp.events.callRemote("sellFarmerItem5", item, value);
});
mp.events.add("sellgreat5", () => {
	mp.game.audio.playAmbientSpeechWithVoice(needped[4].handle, 'GENERIC_THANKS', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
});
}