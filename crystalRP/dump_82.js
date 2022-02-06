{
let ParkingMenu = null
mp.events.add('open_ParkingMenu', (json, id) => {
    if (ParkingMenu == null) {
        ParkingMenu = mp.browsers.new("package://cef/System/Parking/index.html")
		global.menuOpen();
		ParkingMenu.active = true;
		mp.game.graphics.transitionToBlurred(100);
		ParkingMenu.execute(`ParkingMenu.vehicles=${json}`);
		ParkingMenu.execute(`ParkingMenu.parkname=${id}`);
		ParkingMenu.execute(`ParkingMenu.street='${mp.game.ui.getStreetNameFromHashKey(mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0).streetName)}'`);
    } else if (ParkingMenu.active == false){
		global.menuOpen();
		ParkingMenu.active = true
		mp.game.graphics.transitionToBlurred(100);
		ParkingMenu.execute(`ParkingMenu.vehicles=${json}`);
		ParkingMenu.execute(`ParkingMenu.parkname=${id}`);
		ParkingMenu.execute(`ParkingMenu.street='${mp.game.ui.getStreetNameFromHashKey(mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0).streetName)}'`);
    }
});

mp.events.add('closeparking', () => {
    ParkingMenu.active = false
    mp.gui.cursor.show(false, false)
	ParkingMenu.execute('ParkingMenu.style=0');
	global.menuClose();
	mp.game.graphics.transitionFromBlurred(100);
});

mp.events.add('takerentparking', (name, number) => {
	mp.events.callRemote("takerentparking", name, number);
    ParkingMenu.active = false
    mp.gui.cursor.show(false, false)
	ParkingMenu.execute('ParkingMenu.style=0');
	global.menuClose();
	mp.game.graphics.transitionFromBlurred(100);
});
}