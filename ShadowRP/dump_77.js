{
let rentMenu = null;
mp.events.add({
	"RENT::OPEN_RENT_MENU": (json) => {
		if (!loggedin || chatActive || editing || cuffed) return;
		rentMenu = mp.browsers.new('http://package/browser/modules/RentCars/index.html');
		rentMenu.active = true;
		global.menuOpen();
		mp.gui.cursor.visible = true;
		rentMenu.execute(`rentcars.openMenu(${json})`);
	},
	"RENT::CLOSE_RENT_MENU": () => {
		if(rentMenu)
		{
			global.menuClose();
			rentMenu.active = false;
            rentMenu.destroy();
            rentMenu = null;
		}
	},
	"CLIENT:::RENT::BUY_RENT_CAR": (vehicle, time) => {
        mp.events.callRemote("SERVER:::RENT::BUY_RENT_CAR", vehicle, time);
	},
	"CLIENT:::RENT::GET_VEHICLE_INFORMATION": (vehicle) => {
        var vhash = mp.game.gameplay.getHashKey(vehicle);
		let maxSpeed = (mp.game.vehicle.getVehicleModelMaxSpeed(vhash) * 3.6).toFixed(0);
        let maxPassenger = mp.game.vehicle.getVehicleModelMaxNumberOfPassengers(vhash);
        rentMenu.execute(`rentcars.loadVehicleInfo(${maxSpeed},${maxPassenger})`);
	}
});
mp.keys.bind(Keys.VK_ESCAPE, false, function () {
	if(rentMenu)
		{
			global.menuClose();
			rentMenu.active = false;
            rentMenu.destroy();
            rentMenu = null;
		}
});
}