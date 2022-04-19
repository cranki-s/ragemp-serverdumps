{
let changeclothes = null
let changeclothescam = null
const player = mp.players.local;
mp.events.add('OpenClothesChange', (data, name, fracid) => {
    if (changeclothes == null) {
        changeclothes = mp.browsers.new("package://cef/System/ChangeClothesFraction/index.html")
        mp.gui.cursor.show(true, true)
		changeclothes.active = true
		changeclothes.execute(`changeclothes.name = ${JSON.stringify(name)}`);
		changeclothes.execute(`changeclothes.items = ${JSON.stringify(data)}`);
		global.menuOpen();
		CameraChangeClothes(fracid);
    } else if (changeclothes.active == false) {
        mp.gui.cursor.show(true, true)
		changeclothes.active = true
		changeclothes.execute(`changeclothes.name = ${JSON.stringify(name)}`);
		changeclothes.execute(`changeclothes.items = ${JSON.stringify(data)}`);
		global.menuOpen();
		CameraChangeClothes(fracid);
    }
});

function CameraChangeClothes(id){
	let playerPosition;
	let CreateCamPosition;
	let camPoint = {X: 123, Y: 123, Z: 1252};
	switch (id) {
		case 6:
			playerPosition = new mp.Vector3(-571.0057, -195.54567, 38.17885);
			CreateCamPosition = new mp.Vector3(-573.7934, -197.00546, 39.4885);
			camPoint.X = -571.0057;  camPoint.Y = -195.54567; camPoint.Z = 38.04884;
			break;
		case 8:
			playerPosition = new mp.Vector3(298.6097, -598.26526, 43.284093);
			CreateCamPosition = new mp.Vector3(300.8047, -598.9901, 44.471152);
			camPoint.X = 298.6097; camPoint.Y = -598.26526; camPoint.Z = 43.254093;
			break;
		case 7: 
			playerPosition = new mp.Vector3(457.2008, -988.79724, 30.869315); 
			CreateCamPosition = new mp.Vector3(459.27808, -992.89155, 30.51249); 
			camPoint.X = 457.37435; camPoint.Y = -987.9438; camPoint.Z = 31.589842;
			break;
		case 9:
			playerPosition = new mp.Vector3(149.86472, -756.3874, 241.83195);
			CreateCamPosition = new mp.Vector3(147.86472, -754.3874, 241.83195);
			camPoint.X = 150.06472; camPoint.Y = -756.4874; camPoint.Z = 242.23195;
			break;
		case 14:
			playerPosition = new mp.Vector3(-2358.2505, 3254.0122, 32.890718);
			CreateCamPosition = new mp.Vector3(-2355.2505, 3251.0122, 34.390718);
			camPoint.X = -2359.692; camPoint.Y = 3255.435; camPoint.Z = 33.053226;
			break;
		case 17:
			playerPosition = new mp.Vector3(5030.75, -5736.999, 17.745586);
			CreateCamPosition = new mp.Vector3(5028.75, -5733.500, 19.705586);
			camPoint.X = 5030.75; camPoint.Y = -5736.776; camPoint.Z = 18.745586;
			break;
	}
	player.position = playerPosition;
	changeclothescam = mp.cameras.new('default', CreateCamPosition, new mp.Vector3(0,0,0), 35);
	changeclothescam.pointAtCoord(camPoint.X, camPoint.Y, camPoint.Z);
	changeclothescam.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 1200, true, false);
	localplayer.freezePosition(true);
}

mp.events.add('SetFracClothes', (index) => {
	mp.events.callRemote("SetFracClothes", index);
});

mp.events.add('CloseFracClothes', () => {
    changeclothes.active = false
    mp.gui.cursor.show(false, false)
	changeclothes.execute('changeclothes.style=0');
	changeclothes.execute(`changeclothes.items=null`);
	changeclothes.execute(`changeclothes.name=null`);
	global.menuClose();
	localplayer.freezePosition(false);
	mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	changeclothescam.destroy(true);
    changeclothescam = null;
});
}