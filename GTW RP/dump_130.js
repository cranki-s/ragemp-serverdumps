{
//CEF//
var advertisementsCEF = null;
var NewAdsSystem = true;
var AdvertisementSettingName = "adsettings_v1"
var Settings = {"seen":true, "chat":false, "style":3, "amount":255, "speed":5000, "event_time":true, "event_end":false, "event_reminder":true};

if (!mp.browsers.exists(advertisementsCEF))
{
	advertisementsCEF = mp.browsers.new("package://gtalife/Advertisements/index.html");
	if(typeof mp.storage.data !== 'undefined' && typeof mp.storage.data[AdvertisementSettingName] !== 'undefined' && mp.storage.data[AdvertisementSettingName] !== 0)
		Settings = mp.storage.data[AdvertisementSettingName];

	/*if(typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.newads !== 'undefined' && mp.storage.data.newads)
		NewAdsSystem =  mp.storage.data.newads;*/

	mp.events.callRemote('ToggleAdvertisements', Settings.chat);
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`AdvertisementSettings(${JSON.stringify(Settings)});`);
	}
}

mp.events.add('showAdvertisements', (admin, charid, worldpoints) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`ShowAdvertisements(${admin}, ${charid}, ${worldpoints});`);
		mp.gui.cursor.show(true, true);
	}
});
mp.events.add('hideAdvertisements', () => {
	CloseAdvertisements();
});

mp.events.add('destroyAdvertisements', () => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('setAdNotificationToggle', () => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`AdNotifyToggle();`);
	}
});

mp.events.add('Advertisement::DebugClear', () => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`ClearAllAdsDebug();`);
	}
});

function CloseAdvertisements(){
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`HideAdvertisements();`);
		mp.gui.cursor.show(false, false);
		mp.gui.chat.activate(true);
		mp.events.call('setCefActive', false);
		AdsMoveDisabled = false;
	}
}

mp.keys.bind(0x73, false, function () { // F4 Key
	CloseAdvertisements();
});
mp.keys.bind(0x1B, false, function () { // ESC Key
	CloseAdvertisements();
});

/*
mp.events.add('ToggleHUD', (toggle) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		if(!toggle){
			advertisementsCEF.execute(`ShowFullAdvertisements();`);
		}else{
			advertisementsCEF.execute(`HideFullAdvertisements();`);
		}
	}
});*/

mp.events.add('saveAdvertisementSettings', (settings) => {
	var str = JSON.stringify(settings);
	Settings = JSON.parse(JSON.parse(str));
    mp.storage.data[AdvertisementSettingName] = Settings;
    mp.storage.flush();
});

mp.events.add('advertisements::NewEvent', (title, date, cost, duration, location, text) => {
	mp.events.callRemote('Advertisements::NewEvent', title, date, cost, duration, location, text);
});

mp.events.add('advertisements::EditEvent', (id, title, location, text) => {
	mp.events.callRemote('Advertisements::EditEvent', id, title, location, text);
});

mp.events.add('callAddOwner', (number) => {
	mp.events.callRemote('Advertisements::CallAddOwner', number);
	CloseAdvertisements();
});

mp.events.add('advertisements::DeleteEvent', (id) => {
	mp.events.callRemote('Advertisements::DeleteEvent', id);
});
mp.events.add('advertisements::DeleteAd', (id) => {
	mp.events.callRemote('Advertisements::DeleteAd', id);
});

mp.events.add('toggleChatAdvertisements', (toggle) => {
	mp.events.callRemote('ToggleAdvertisements', toggle);
});

mp.events.add('toggleChatAdvertisements::Server', (toggle) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`ToggleChatAdvertisements(${toggle});`);
	}
	Settings.chat = toggle;
    mp.storage.data.adsettings = Settings;
    mp.storage.flush();
});

mp.events.add('addNewAd', (Array) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`AddNewAd(${Array});`);
	}
});

mp.events.add('addNewEvent', (Array) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`AddNewEvent(${Array});`);
	}
});

mp.events.add('removeEvent', (ID) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`RemoveEvent(${ID});`);
	}
});

mp.events.add('editEvent', (id, Array) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`EditEvent(${id}, ${Array});`);
	}
});

mp.events.add('addEvents', (EventArray, piece, maxpiece) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`LoadArrayEventPieces(${EventArray}, ${piece} , ${maxpiece});`);
	}
});
mp.events.add('loadEvents', () => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		mp.events.callRemote('LoadEvents');
	}
});

mp.events.add('removeAd', (ID) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`RemoveAdvertisement(${ID});`);
	}
});

mp.events.add('triggerChatBlock_Ads', () => {
	mp.gui.chat.activate(false);
	mp.events.call('setCefActive', true);
	mp.gui.cursor.show(true, true);
	AdsMoveDisabled = true;
});

mp.events.add('revokeChatBlock_Ads', () => {
	mp.gui.chat.activate(true);
	mp.events.call('setCefActive', false);
	AdsMoveDisabled = false;
});

var AdsMoveDisabled = false;
mp.events.add('render', () => { 

    if(AdsMoveDisabled === undefined || AdsMoveDisabled == null) return;

    if(AdsMoveDisabled) {
		mp.game.controls.disableAllControlActions(0);
		mp.gui.cursor.show(true, true);
    }
});

mp.events.add('markAdvertisement', (x, y) => {
	mp.events.call('markonmap', x, y);
});

mp.events.add('advertisements::chooseBlip', (blip) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		mp.events.callRemote('Advertisements::ChooseBlip', blip);
	}
});

mp.events.add('advertisements::getBusinessData', () => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		mp.events.callRemote('Advertisements::GetBusinessData');
	}
});

mp.events.add('Advertisements::SetBusinessData', (name, blip) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`SetBusinessData('${name}', ${blip});`);
	}
});

mp.events.add('advertisements::placeNewAd', (type, text, name, showLocation) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		mp.events.callRemote('Advertisements::PlaceNewAd', type, text, name, showLocation);
	}
});

mp.events.add('Advertisements::PlacedAd', (placed, text, type) => {
	if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`PlaceAdServerside(${placed}, "${text}", ${type});`);
	}
});

mp.events.add("setDarkMode", (value) => {
    if (advertisementsCEF != null && mp.browsers.exists(advertisementsCEF))
	{
		advertisementsCEF.execute(`SetDarkMode(${value});`);
	}
});
}