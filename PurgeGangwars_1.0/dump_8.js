{
var playerGang = require('/cliente/index.js');
var hudAlpha = require('/cliente/index.js')
var sceneryCamera;
var crips = require('/cliente/index.js');
var bloods = require('/cliente/index.js');
var families = require('/cliente/index.js');
var marabunta = require('/cliente/index.js');
var teamSelectorCef;
//export { crips };
mp.events.add("openTeamSelector", () => {
	sceneryCamera = mp.cameras.new('default', new mp.Vector3(-256.55169677734375, -1285.373046875, 88.04651641845703), new mp.Vector3(0,0,0), 30);
	sceneryCamera.pointAtCoord(-146.06512451171875, -1622.3048095703125, 42.971580505371094); //Changes the rotation of the camera to point towards a location
	sceneryCamera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
	mp.game.invoke('0x428CA6DBD1094446', mp.players.local.handle, true);
	teamSelectorCef = mp.browsers.new("package://teamselector/teamselector.html");
	mp.events.call('hideHudStats');
	mp.events.call('showHudGangs');
		mp.game.ui.displayRadar(false);
  		mp.game.ui.displayHud(false);
  		mp.gui.chat.show(false);
  		hudAlpha = 0;
        setTimeout(() => {
        	mp.gui.cursor.show(true, true);

            }, 300);
});


function showHud() {
	mp.events.call('showHudStats');
	hudAlpha = 255;
	mp.game.ui.displayRadar(true);
  	mp.game.ui.displayHud(true);
  	mp.gui.chat.show(true);
  	teamSelectorCef.destroy();
	mp.gui.cursor.show(false, false);
	mp.game.invoke('0x428CA6DBD1094446', mp.players.local.handle, false);
	mp.game.cam.renderScriptCams(false, false, 0, false, false);
}

mp.events.add("client:familiesSelected", (browser) => {
	mp.events.callRemote('familiesSelected');
	playerGang = 'families';
	showHud();
});

mp.events.add("client:cripsSelected", (browser) => {
	mp.events.callRemote('cripsSelected');
	playerGang = 'crips';
	showHud();

});

mp.events.add("client:bloodsSelected", (browser) => {
	mp.events.callRemote('bloodsSelected');
	playerGang = 'bloods';
	showHud();

});

mp.events.add("client:ballasSelected", (browser) => {
	mp.events.callRemote('ballasSelected');
	playerGang = 'ballas';
	showHud();


});

mp.events.add("client:vagosSelected", (browser) => {
	mp.events.callRemote('vagosSelected');
	playerGang = 'vagos';
	showHud();

});

mp.events.add("client:marabuntaSelected", (browser) => {
	mp.events.callRemote('marabuntaSelected');
	playerGang = 'marabunta';
	showHud();
});

mp.events.add("client:cartelSinaloaSelected", (browser) => {
	mp.events.callRemote('cartelSinaloaSelected');
	playerGang = 'marabunta';
	showHud();
});

mp.events.add("client:zetasSelected", (browser) => {
	mp.events.callRemote('zetasSelected');
	playerGang = 'marabunta';
	showHud();
});

mp.events.add("client:closeBrowser", (browser) => {
	showHud();
});
}