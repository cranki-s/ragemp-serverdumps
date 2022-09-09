{

let fov_max = 70.0;
let fov_min = 5.0; // max zoom level (smaller fov is more zoom)
let zoomspeed = 10.0; // camera zoom speed
let speed_lr = 8.0; // speed by which the camera pans left-right
let speed_ud = 8.0; // speed by which the camera pans up-down

var camaras = false;
let fov = (fov_max + fov_min) * 0.5;

let cam = null;

const ScaleFormCam = require('/LURP/sistemas/scaleform/Scaleform.js'); //
const myScaleFormCam = new ScaleFormCam('DIGITAL_CAMERA');
myScaleFormCam.callFunction("SHOW_REMAINING_PHOTOS", true);
myScaleFormCam.callFunction("SET_REMAINING_PHOTOS", 0, 1);
myScaleFormCam.callFunction("SHOW_PHOTO_FRAME", true);
myScaleFormCam.callFunction("SHOW_PHOTO_BORDER", false);
myScaleFormCam.callFunction("OPEN_SHUTTER");

mp.events.add({
	"mostrar_camaraFotos": () => {
		if (camaras == true) {
			cerrarCamaraFotos();
		} else {
			mp.gui.chat.show(false);
			mp.game.ui.displayRadar(false);
			camaras = true;
			mostrarAviso("info", 5000, "Pulsa Click Izquierdo para tomar una foto");
			mostrarAviso("info", 5000, "Pulsa Enter para cerrar la cámara");
			mp.events.add('render', runcamara);
			crearTimeout(() => {
				mp.events.call("hud:estado_hud");
			},5000)
		}
	}
});

function cerrarCamaraFotos() {
	mp.gui.chat.show(true);
	if(tipoMapa != 2) mp.game.ui.displayRadar(true);

	camaras = false;
	mp.events.remove('render', runcamara);
	mp.game.cam.renderScriptCams(false, false, 0, true, false);
	cam.destroy();
	cam = null;
	mp.players.local.setAlpha(255);
	if(tipoMapa != 2) mp.game.ui.displayRadar(true);

	mp.events.call("hud:estado_hud");
}

function runcamara() {
	mp.game.graphics.transitionFromBlurred(1000);
	let lPed = mp.players.local;

	let playerPos = mp.players.local.position;
	let camPos = playerPos;
	camPos.z = mp.players.local.getWorldPositionOfBone(12844).z + 0.65;

	if (camaras) {
		if (!lPed.isSittingInAnyVehicle(false)) {
			if (!cam) {
				cam = mp.cameras.new('default', camPos, new mp.Vector3(0, 0, mp.players.local.getHeading()), 60);
				cam.attachTo(mp.players.local.handle, playerPos.x - camPos.x, playerPos.y - camPos.y, camPos.z, false)
				mp.players.local.setAlpha(0);
				mp.game.cam.renderScriptCams(true, false, 0, true, false);
			}
			if (cam) {
				mp.game.controls.disableControlAction(2, 14, true);
				mp.game.controls.disableControlAction(2, 15, true);
				mp.game.controls.disableControlAction(2, 16, true);
				mp.game.controls.disableControlAction(2, 17, true);
				mp.game.controls.disableControlAction(2, 24, true);
				mp.game.controls.disableControlAction(2, 140, true);
				mp.game.controls.disableControlAction(2, 141, true);
				mp.game.controls.disableControlAction(2, 142, true);
			}
			let zoomvalue = (1.0/(fov_max-fov_min))*(fov-fov_min)
			checkInputRotationCam(cam, zoomvalue)

			handleZoomCam(cam)
			hideHUDThisFrameCam()
			mp.game.ui.displayRadar(false);
			myScaleFormCam.render2D();
		} else {
			mp.gui.chat.push("No puedes sacar una fotografía desde el interior del vehículo");
			camaras = false;
			mp.events.remove('render', runcamara);
		}
	}
}


var hideHUDThisFrameCam = function () {
	for (let i = 1; i <= 22; i++) {
		mp.game.ui.hideHudComponentThisFrame(i);
	}
}


var checkInputRotationCam = function(cam, zoomvalue) {
	let rightAxisX = mp.game.controls.getControlNormal(0, 220)
	let rightAxisY = mp.game.controls.getControlNormal(0, 221)
	let rotation = cam.getRot(2);
	if (rightAxisX != 0.0 || rightAxisY != 0.0) {
		new_z = rotation.z + rightAxisX*-1.0*(speed_ud)*(zoomvalue+0.1)
		new_x = Math.max(Math.min(20.0, rotation.x + rightAxisY*-1.0*(speed_lr)*(zoomvalue+0.1)), -89.5)
		cam.setRot(new_x, 0.0, new_z, 2);
	}
}

var handleZoomCam = function(cam) {
	let lPed = mp.players.local;

	if (!lPed.isSittingInAnyVehicle()) {

		if (mp.game.controls.isControlPressed(32, 241)) {
			mp.game.graphics.transitionToBlurred(100);
			fov = Math.max(fov - zoomspeed, fov_min)
			mp.game.audio.playSoundFrontend(-1, "Faster_Click", "RESPAWN_ONLINE_SOUNDSET", true);
		}
		
		if (mp.game.controls.isControlPressed(32, 237)) {
			myScaleFormCam.callFunction("SHOW_PHOTO_FRAME", false);
			mp.game.wait(0);
			var time = mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1);
			var screenName = "lurp-camara-" + time.year + "-" + time.month + "-" + time.day + "-" + time.hour + "-" + time.minute + "-" + time.second + ".png";
			mp.gui.takeScreenshot(screenName, 1, 100, 0);
			mp.game.audio.playSoundFrontend(-1, "Camera_Shoot", "Phone_Soundset_Franklin", true);
			mp.game.wait(0);
			myScaleFormCam.callFunction("SHOW_PHOTO_FRAME", true);

		}

		if (mp.game.controls.isControlPressed(32, 242)) {
			mp.game.graphics.transitionToBlurred(100);
			fov = Math.min(fov + zoomspeed, fov_max)
			mp.game.audio.playSoundFrontend(-1, "Faster_Click", "RESPAWN_ONLINE_SOUNDSET", true);
		}

		let current_fov = cam.getFov();
		if (Math.abs(fov-current_fov) < 0.1) {
			fov = current_fov
		}
		cam.setFov(current_fov + (fov - current_fov)*0.05);
	}
}
}