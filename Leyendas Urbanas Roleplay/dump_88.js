{

let fov_max = 70.0
let fov_min = 5.0 // max zoom level (smaller fov is more zoom)
let zoomspeed = 10.0 // camera zoom speed
let speed_lr = 8.0 // speed by which the camera pans left-right
let speed_ud = 8.0 // speed by which the camera pans up-down

let binoculars = false
let fov = (fov_max+fov_min)*0.5

let cam = null;

const ScaleForm = require('/LURP/sistemas/scaleform/Scaleform.js'); //
const myScaleForm = new ScaleForm('BINOCULARS');
myScaleForm.callFunction("SET_CAM_LOGO", 0);

mp.events.add({
    "toggleBinocular": () => {
		binoculars = !binoculars;
		if(binoculars)
		{
			mp.players.local.setVisible(false, false);
			mp.events.add('render', runBinocular);
		}
		else
		{
			mp.players.local.setVisible(true, false);
		}
   }
});

var runBinocular = async function() {
	let lPed = mp.players.local;

	if (binoculars) {
		if (!lPed.isSittingInAnyVehicle(false)) {
			if (!lPed.isUsingScenario("WORLD_HUMAN_BINOCULARS")) {
				lPed.taskStartScenarioInPlace("WORLD_HUMAN_BINOCULARS", 0, true);
				await mp.game.waitAsync(500);
			}

			if (!cam) {
				cam = mp.cameras.new("DEFAULT_SCRIPTED_FLY_CAMERA", lPed.position, new mp.Vector3(0, 0, 0), fov);
				cam.attachTo(lPed.handle, 0.0,0.0,0.5, true)
				mp.game.cam.renderScriptCams(true, false, 0, true, false);
				mp.events.call("hud:estado_hud"); // Oculta el hud cuando tiras /binoculares para abrirlos
			}
			let zoomvalue = (1.0/(fov_max-fov_min))*(fov-fov_min)
			checkInputRotation(cam, zoomvalue)

			handleZoom(cam)

			myScaleForm.render2D();
			mp.game.controls.disableControlAction(24, 157, true);
			mp.game.controls.disableControlAction(24, 37, true);
		}
	} else {
		if (cam) {
			mp.game.cam.renderScriptCams(false, false, 0, true, false);
			if (mp.cameras.exists(cam))
				cam.destroy();
			cam = null;
			mp.events.call("hud:estado_hud"); // Vuelve a mostrar el HUD cuando tiras /binoculares para cerrarlos
			if (lPed.isActiveInScenario()) {
				lPed.clearTasks();
			}
			mp.game.controls.enableControlAction(24, 157, true);
			mp.game.controls.enableControlAction(24, 37, true);
		}

		mp.events.remove('render', runBinocular);
	}
}

var checkInputRotation = function(cam, zoomvalue) {
	let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220)
	let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221)
	let rotation = cam.getRot(2);
	if (rightAxisX != 0.0 || rightAxisY != 0.0) {
		new_z = rotation.z + rightAxisX*-1.0*(speed_ud)*(zoomvalue+0.1)
		new_x = Math.max(Math.min(20.0, rotation.x + rightAxisY*-1.0*(speed_lr)*(zoomvalue+0.1)), -89.5)
		cam.setRot(new_x, 0.0, new_z, 2);
	}
}

var handleZoom = function(cam) {
	const controls = mp.game.controls;
	let lPed = mp.players.local;
	if (!lPed.isSittingInAnyVehicle()) {

		if (controls.isControlJustPressed(0, 241)) {
			fov = Math.max(fov - zoomspeed, fov_min)
		}

		if (controls.isControlJustPressed(0, 242)) {
			fov = Math.min(fov + zoomspeed, fov_max)
		}

		let current_fov = cam.getFov();
		if (Math.abs(fov-current_fov) < 0.1) {
			fov = current_fov
		}
		cam.setFov(current_fov + (fov - current_fov)*0.05);
	} else {
		if (controls.isControlJustPressed(0, 17)) {
			fov = Math.max(fov - zoomspeed, fov_min)
		}

		if (controls.isControlJustPressed(0, 16)) {
			fov = Math.min(fov + zoomspeed, fov_max)
		}

		let current_fov = cam.getFov(cam);
		if (Math.abs(fov-current_fov) < 0.1) {
			fov = current_fov
		}
		cam.setFov(current_fov + (fov - current_fov)*0.05);
	}
}

}