{
let changeclothes = null
let changeclothescam = null
player = mp.players.local;
mp.events.add('OpenClothesChange', (data, name, fracid) => {
    if (changeclothes == null) {
        changeclothes = mp.browsers.new("http://package/browser/modules/Fractions/ChangeClothes/index.html")
        mp.gui.cursor.show(true, true)
		changeclothes.active = true
		changeclothes.execute(`changeclothes.name = ${JSON.stringify(name)}`);
		changeclothes.execute(`changeclothes.items = ${JSON.stringify(data)}`);
		global.menuOpen();
		CameraChangeClothes(fracid);
		playerheading.startveh(mp.players.local);
    } else if (changeclothes.active == false){
        mp.gui.cursor.show(true, true)
		changeclothes.active = true
		changeclothes.execute(`changeclothes.name = ${JSON.stringify(name)}`);
		changeclothes.execute(`changeclothes.items = ${JSON.stringify(data)}`);
		global.menuOpen();
		CameraChangeClothes(fracid);
		playerheading.startveh(mp.players.local);
    }
});

function CameraChangeClothes(id)
{
	if (id == 6) {
		player.position = new mp.Vector3(-555.032, -202.79744, 41.391964);
		changeclothescam = mp.cameras.new('default', new mp.Vector3(-555.032, -202.79744, 41.391964), new mp.Vector3(0,0,0), 35);
		changeclothescam.pointAtCoord(-555.032, -202.79744, 41.391964);
		changeclothescam.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 1200, true, false);
		localplayer.freezePosition(true);
	}
	if (id == 8) {
		player.position = new mp.Vector3(298.6097, -598.96526, 43.284093);
		changeclothescam = mp.cameras.new('default', new mp.Vector3(300.8047, -599.9901, 44.471152), new mp.Vector3(0,0,0), 45);
		changeclothescam.pointAtCoord(298.6097, -598.96526, 43.254093);	
		changeclothescam.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 1200, true, false);
		localplayer.freezePosition(true);
	}
	if (id == 7) {
		player.position = new mp.Vector3(463.5568, -999.0581, 30.699565);
		changeclothescam = mp.cameras.new('default', new mp.Vector3(461.12445, -998.9995, 31.569565), new mp.Vector3(0,0,0), 45);
		changeclothescam.pointAtCoord(463.5568, -999.0581, 30.799565);
		changeclothescam.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 1200, true, false);
		localplayer.freezePosition(true);
	}
	if (id == 9) {
		player.position = new mp.Vector3(124.25418, -767.5392, 242.03214);
		changeclothescam = mp.cameras.new('default', new mp.Vector3(124.25418, -768.5392, 243.03214), new mp.Vector3(0,0,0), 45);
		changeclothescam.pointAtCoord(124.25418, -767.7392, 242.43214);
		changeclothescam.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 1200, true, false);
		localplayer.freezePosition(true);
	}
}

mp.events.add('SetFracClothes', (index) => {
	mp.events.callRemote("SetFracClothes", index);
});

mp.events.add('CloseFracClothes', () => {
    changeclothes.active = false
	player.dimension = 0;
	mp.events.callRemote("server::WorkDayFrac", true);
    mp.gui.cursor.show(false, false)
	changeclothes.execute('changeclothes.style=0');
	mp.events.callRemote("SetEntityDimensionOnClient", 0);
	changeclothes.execute(`changeclothes.items=null`);
	changeclothes.execute(`changeclothes.name=null`);
	global.menuClose();
	localplayer.freezePosition(false);
	mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	changeclothescam.destroy(true);
    changeclothescam = null;
	playerheading.stop();
});
mp.events.add('CloseFracClothes2', () => {
    changeclothes.active = false
	player.dimension = 0;
	mp.events.callRemote("server::WorkDayFrac", false);
    mp.gui.cursor.show(false, false)
	changeclothes.execute('changeclothes.style=0');
	mp.events.callRemote("SetEntityDimensionOnClient", 0);
	changeclothes.execute(`changeclothes.items=null`);
	changeclothes.execute(`changeclothes.name=null`);
	global.menuClose();
	localplayer.freezePosition(false);
	mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	changeclothescam.destroy(true);
    changeclothescam = null;
	playerheading.stop();
});

let camerabunker = null
mp.events.add('ExitBunkerScenario', () => {
	let vehiclebunk = mp.players.local.vehicle;
	camerabunker = mp.cameras.new('default', new mp.Vector3(890.7814, -3243.798, -96.04867), new mp.Vector3(0,0,0), 45);
	camerabunker.pointAtCoord(916.3268, -3248.1023, -97.36505);
	camerabunker.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 0, true, false);
	localplayer.taskVehicleDriveToCoord(vehiclebunk.handle, 928.0663, -3244.8765, -97.24042, 30, 1, vehiclebunk.getLayoutHash(), 16777216, 1, true)
});

mp.events.add('ExitBunkerScenarioDestroy', () => {
	mp.game.cam.renderScriptCams(false, true, 0, true, false);
	camerabunker.destroy(true);
    camerabunker = null;
});
}