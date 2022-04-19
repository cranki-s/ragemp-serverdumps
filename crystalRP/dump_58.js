{
const localPlayer = mp.players.local;
var realtorMenu = null;
var CamRealtor = null;
var Checkpoint = null;
var vec = new mp.Vector3(0,0,0);

mp.events.add("openRealtorMenu", (houseclass) => {
	if(!global.loggedin || realtorMenu != null) return;
	global.menuOpen();
	player.freezePosition(true);
	player.position = new mp.Vector3(-1078.2042, -1426.2859, 16.218395)
	CamRealtor = mp.cameras.new('default', new mp.Vector3(-1072.2042, -1423.2859, 16.218395), new mp.Vector3(0, 0, 0), 70);
    CamRealtor.pointAtCoord(-1069.784, -1422.7028, 15.541881);
    CamRealtor.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 500, true, false);
	realtorMenu = mp.browsers.new('package://cef/System/RealtorManager/index.html');	
	global.realtorMenu.active = true;	
	realtorMenu.execute(`realtorMenu.selectClass(${houseclass})`);	
	setTimeout(function () { 
		global.realtorMenu.execute(`realtorMenu.active=true`);
	}, 250);
});
mp.events.add("unfr", () => {
	try 
	{
		mp.players.local.freezePosition(false);
	}
	catch (e) {}
});
mp.events.add("closeRealtorMenu", () => {
	if (realtorMenu == null || realtorMenu == null) return;
	realtorMenu.destroy();
	realtorMenu = null;
	mp.events.callRemote("closeRealtorMenu");
	if (Checkpoint != null)
		Checkpoint.destroy();
	Checkpoint = null;
	player.freezePosition(false);
	CamRealtor.destroy();
	menuClose();
	mp.game.cam.renderScriptCams(false, false, 0, true, true);
	mp.players.local.position = vec;
});

mp.events.add("LoadHouse", (houses, price, vector) => {
	global.realtorMenu.execute(`realtorMenu.houses=${houses}`);
	global.realtorMenu.execute(`realtorMenu.priceInfo=${price}`);
	vec = new mp.Vector3(vector[0],vector[1],vector[2]);
});

mp.events.add("SelectHouseClass", (hclass) => {
	mp.events.callRemote("LoadHouseToMenu", hclass);
});

mp.events.add("buyInfoHome", (hclass, x, y) => {
	mp.events.callRemote("buyRealtorInfoHome", hclass, x, y);
});

mp.events.add("getStreetAndAreaHouse", (x, y, z) => {
	var street = mp.game.pathfind.getStreetNameAtCoord(x, y, z, 0, 0);
    let areahouse  = mp.game.zone.getNameOfZone(x, y, z);
	var Old = CamRealtor;
	
	CamRealtor = mp.cameras.new('default', new mp.Vector3(x, y, z + 100), new mp.Vector3(0, 0, 0), 70);
	CamRealtor.setCoord(x, y, z + 100);
    CamRealtor.pointAtCoord(x, y, 0);
    CamRealtor.setActive(true);
	CamRealtor.setActiveWithInterp(Old.handle, 500, 1, 1);
	mp.game.cam.renderScriptCams(true, true, 500, true, false);
	
	if (Checkpoint != null)
		Checkpoint.destroy();
	
	Checkpoint = mp.checkpoints.new(27, new mp.Vector3(x,y,z + 20), 5,
    {
        direction: 0,
        color: [163, 131, 188, 255],
        visible: true,
        dimension: player.dimension
    });
	player.position = new mp.Vector3(x, y, z + 110)
	global.realtorMenu.execute(`realtorMenu.street='${mp.game.ui.getStreetNameFromHashKey(street.streetName)}'`);
    global.realtorMenu.execute(`realtorMenu.crossingRoad='${mp.game.ui.getLabelText(areahouse)}'`);
});
}