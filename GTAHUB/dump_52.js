{
/** 
 * This file contains the interface to set the speedometer.
 */

require("ui.js");

let shown = false;

mp.rpc("speedometer:show", (dataJson, isElectric) => {
    browserExecute("speedometerVM.show=true");
    browserExecute("speedometerVM.data=" + dataJson);

    let playerVehicle = mp.players.local.vehicle;
    if (playerVehicle) {
        browserSet("speedometerVM", "isElectric", isElectric);
    } else {
        browserSet("speedometerVM", "isElectric", false);
    }

    shown = true;
});

mp.rpc("speedometer:hide", () => {
    if (shown) {
        browserExecute("speedometerVM.show=false");
        shown = false;
    }
});

mp.rpc("speedometer:set_data", (dataJson) => {
    browserExecute("speedometerVM.data=" + dataJson);
});

mp.setInterval(() => {
    let player = mp.players.local;

    // update client-side speedometer properties if im in a car
    if (shown && player.vehicle) {
        let vehicle = player.vehicle;
		let speed = Math.round(vehicle.getSpeed() * 3.6);
        let rpm = vehicle.rpm * 1000;
        let gear = vehicle.gear;
        browserExecute("speedometerVM.rpm=" + rpm);
        browserExecute("speedometerVM.speed=" + speed);
        browserExecute("speedometerVM.gear=" + gear);
	}
}, 150);
}