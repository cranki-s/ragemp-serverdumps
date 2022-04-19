{
var Garage = null;
mp.events.add('openGarage', (data) => {  
    if (global.menuCheck() || Garage != null) return;
    menuOpen();
	Garage = mp.browsers.new('package://cef/System/garage/index.html');
    Garage.execute(`GARAGE.open(${data})`);
});
mp.events.add('evacVeh', (key) => {
    if (Garage != null)
        mp.events.callRemote("garageauto", key);
})
mp.keys.bind(Keys.VK_ESCAPE, false, function() {
    if (Garage != null) {
        mp.game.ui.setPauseMenuActive(false);
        mp.events.call('CloseGarage');
    }
});
mp.events.add('CloseGarage', () => {
    if (Garage != null) {
        Garage.destroy();
        Garage = null;
	    menuClose();
    }
});
}