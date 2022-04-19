{
let BackMenu = null;
mp.events.add('CloseBack', () => {
	if(new Date().getTime() - global.lastCheck < 50 || BackMenu == null) return; 
	global.lastCheck = new Date().getTime();
	BackMenu.destroy();
	BackMenu = null;
    global.menuClose();
    bodyCam.destroy();
    mp.game.cam.renderScriptCams(false, false, 500, true, false);
    global.rotator.stop()
    localplayer.setComponentVariation(5, 0, 0, 0);
    mp.events.callRemote('closeBack');
})
mp.events.add('changeBack', (variation, color) => {
    localplayer.setComponentVariation(5, variation, color, 0);
})
mp.events.add('buyBack', (style, color) => {
	if(new Date().getTime() - global.lastCheck < 50) return; 
	global.lastCheck = new Date().getTime();
    mp.events.callRemote('buyBack', style, color);
})
mp.events.add('openBackShop', (data) => {
    if (global.menuCheck() || BackMenu != null) return;
	BackMenu = mp.browsers.new('package://cef/System/BackShop/index.html');
    BackMenu.execute(`BACK.open(${data})`);
    bodyCamStart = mp.players.local.position;
    var camValues = { Angle: localplayer.getRotation(2).z + 90, Dist: 1.5, Height: 0.2 };
    var pos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
    bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
    bodyCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);
	mp.players.local.setHeading(49);
    global.rotator.startveh(mp.players.local);
    menuOpen();
    localplayer.clearProp(0);
    localplayer.clearProp(1);
})


}