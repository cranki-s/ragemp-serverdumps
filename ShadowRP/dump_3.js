{
class VehicleRotator {
	start() {
		this.vehicle = null;
		this.fixheading = 0;
		this.activate = true;
		this.setveh(global.localplayer)
	}
	
	startveh(veh) {
		this.vehicle = null;
		this.fixheading = 0;
		this.activate = true;
		this.setveh(veh)
	}



	stop() {
		this.activate = false;
	}
	
	setveh(veh) {
		this.vehicle = veh;
		this.heading = this.vehicle.getHeading();
	}

	onMouseMove(dX) {
		this.fixheading = dX;
		var veh = this.vehicle;
		let mf = this.heading + this.fixheading;
		if (mf > 360) mf -= 360;
		veh.setHeading(mf);
	}
	
	pause() {
		this.heading = this.vehicle.getHeading();
	}
}

const vehicleRotator = new VehicleRotator();

let min = null
let currect = null;

mp.events.add("render", () => {
	if (!mp.gui.cursor.visible || !vehicleRotator.activate) {
		return;
	}

	const x = mp.game.controls.getDisabledControlNormal(2, 239) * 150;

	// Comment before commit

	if (mp.game.controls.isDisabledControlPressed(2, 237)) {
		if ( min === null) min = x;
		//drawDebugText(x, min, x - min);
		if (vehicleRotator.heading === x - min) return;
		if (x === min) return;
 		vehicleRotator.onMouseMove(x - min);
	}
	else
	{
		min = null
		vehicleRotator.pause();
	}
});

function drawDebugText(cr, m, sepro) {
	let message = `DEBUG TEXT`;

	message += `\nC: ${cr}`;
	message += `\nM: ${m}`;
	message += `\nS: ${sepro}`;
	message += `\nF: ${vehicleRotator.fixheading}`;
	message += `\nH: ${vehicleRotator.heading}`;

	mp.game.graphics.drawText(message, [0.5, 0.005], { 
		font: 7, 
		color: [255, 255, 255, 185], 
		scale: [0.8, 0.8], 
		outline: true,
		centre: true
	});
}

exports = vehicleRotator;

}