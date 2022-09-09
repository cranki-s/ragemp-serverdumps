{
let MetroMenu = null
mp.events.add('client::openmetromenu', (place) => {
    if (MetroMenu == null) {
        MetroMenu = mp.browsers.new("http://package/browser/modules/Metro/index.html")
		global.menuOpen();
		MetroMenu.active = true;
		MetroMenu.execute(`MetroMenu.station=${place}`);
		MetroMenu.execute(`MetroMenu.active=1`);
    } else if (MetroMenu.active == false){
		global.menuOpen();
		MetroMenu.active = true
		MetroMenu.execute(`MetroMenu.station=${place}`);
		MetroMenu.execute(`MetroMenu.active=1`);
    }
});

mp.events.add('client::closemetromenu', () => {
    MetroMenu.active = false
    mp.gui.cursor.show(false, false)
	MetroMenu.execute('MetroMenu.style=0');
	MetroMenu.execute('MetroMenu.indexs=0');
	MetroMenu.execute(`MetroMenu.active=0`);
	MetroMenu.destroy();
	MetroMenu = null;
	global.menuClose();
});

mp.events.add('client::buymetro', (idplace) => {
	mp.events.callRemote("server::buymetro", idplace);
    MetroMenu.active = false
    mp.gui.cursor.show(false, false)
	MetroMenu.execute('MetroMenu.style=0');
	MetroMenu.execute('MetroMenu.indexs=0');
	MetroMenu.execute(`MetroMenu.active=0`);
	MetroMenu.destroy();
	MetroMenu = null;
	global.menuClose();
});

mp.game.streaming.requestModel(mp.game.joaat("freight"));
mp.game.streaming.requestModel(mp.game.joaat("freightcar"));
mp.game.streaming.requestModel(mp.game.joaat("freightgrain"));
mp.game.streaming.requestModel(mp.game.joaat("freightcont1"));
mp.game.streaming.requestModel(mp.game.joaat("freightcont2"));
mp.game.streaming.requestModel(mp.game.joaat("freighttrailer"));
mp.game.streaming.requestModel(mp.game.joaat("metrotrain"));
mp.game.streaming.requestModel(mp.game.joaat("s_m_m_lsmetro_01"));
mp.game.streaming.requestModel(mp.game.joaat("tankercar"));

var trainseat = false

mp.events.add('createtrain', async (pos) => {
	train = mp.game.vehicle.createMissionTrain(25, pos.x, pos.y, pos.z, true);
	mp.game.invoke("0x16469284DB8C62B5", train, 0) 
	trainseat = true;
	await invehtrain();
	setTimeout( function() {
		mp.game.invoke("0x16469284DB8C62B5", train, 25.5) 
	}, 2000);
});

mp.events.add("playerQuit", (player) => {
  if (player == localplayer && train) {
    mp.game.vehicle.deleteMissionTrain(train);
	train = null;
	mp.players.local.setAlpha(255);
	mp.game.invoke(getNative("SET_FOLLOW_PED_CAM_VIEW_MODE"), 1);
	trainseat = false;
  }
});
async function invehtrain() {
  await mp.game.waitAsync(1000);

  while (localplayer.isInAnyVehicle(false) == false || localplayer.getVehicleIsIn(false) != train) {
    localplayer.setIntoVehicle(train, 0);
    await mp.game.waitAsync(1);
  }
  mp.game.invoke(getNative("SET_FOLLOW_PED_CAM_VIEW_MODE"), 1);
  await mp.game.waitAsync(1000);
  mp.game.cam.doScreenFadeIn(1000);
}
mp.events.add('speedtrain', (count) => {
	mp.game.invoke("0x16469284DB8C62B5", train, count) 
});
let metrostopped = false;
mp.events.add('MetroStateStopChange', (state) => {
	metrostopped = state
});
mp.events.add('destroytrain', () => {
	mp.game.vehicle.deleteMissionTrain(train);
	train = null;
	mp.players.local.setAlpha(255);
	mp.game.invoke(getNative("SET_FOLLOW_PED_CAM_VIEW_MODE"), 1);
	trainseat = false;
});

mp.events.add('render', () => {
	if (trainseat) {
		mp.game.controls.disableControlAction(2, 75, true);
	}
});
let laststation = -1;
let stateshowhelp = false
mp.events.add('ShowMetroHelp', (id) => {
	if (id == -1) {
		stateshowhelp = false;
	}
	else {
		stateshowhelp = true;
	}
	laststation = id;
	mp.gui.execute(`HUD.showhelpmetro=${stateshowhelp}`);
	mp.gui.execute(`HUD.stationmetro=${id}`);
});

mp.keys.bind(Keys.VK_E, false, function () {
	if(metrostopped) {
		mp.events.callRemote("ExitMetroServer", laststation);
	}
});
}