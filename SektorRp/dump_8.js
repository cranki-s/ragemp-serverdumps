{
let fov_max = 80.0;
let fov_min = 10.0; // max zoom level (smaller fov is more zoom)
let zoomspeed = 2.0; // camera zoom speed
let speed_lr = 3.0; // speed by which the camera pans left-right
let speed_ud = 3.0; // speed by which the camera pans up-down
let toggle_vision = 25; // control id to toggle vision mode. Default: INPUT_AIM (Right mouse btn)
let toggle_lock_on = 22; // control id to lock onto a vehicle with the camera. Default is INPUT_SPRINT (spacebar)

let helicam = false;
let fov = (fov_max + fov_min) * 0.5;
let vision_state = 0; // 0 is normal, 1 is nightmode, 2 is thermal vision

let cam;

let locked_on_vehicle = null;
const localPlayer = mp.players.local; // predefine local player otherwise crash the client on cam toggle

mp.keys.bind(0xBC, false, function () { // it is the comma Key / Toggle Cam On - Off
	if (localPlayer.vehicle && localPlayer.vehicle.getClass() === 15){
		mp.events.call('enablehelicam');
	}
});

mp.events.add("enablehelicam", () => {
  if (helicam) {
    mp.game.invoke("0x0F07E7745A236711");
    mp.game.invoke("0x31B73D1EA9F01DA2");
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    if (scaleform != null || scaleform != 0) {
      mp.game.graphics.setScaleformMovieAsNoLongerNeeded(scaleform);
    }

    if (cam != null) {
      cam.destroy(true);
      cam = null;
    }

    helicam = false;
    mp.game.graphics.setSeethrough(false);
    mp.game.graphics.setNightvision(false);
    vision_state = 0;
    locked_on_vehicle = null;
    vehicle_detected = null;
  } else {
    mp.game.graphics.setTimecycleModifier("heliGunCam");
    mp.game.graphics.setTimecycleModifierStrength(0.3);

    scaleform = mp.game.graphics.requestScaleformMovie("HELI_CAM");
    while (!mp.game.graphics.hasScaleformMovieLoaded(scaleform))
      mp.game.wait(0);

    let lPed = mp.players.local;
    let heli = lPed.vehicle;
    cam = mp.cameras.new(
      "DEFAULT_SCRIPTED_FLY_CAMERA",
      lPed.position,
      new mp.Vector3(0, 0, mp.players.local.getHeading()),
      60
    );
    cam.setActive(true);
    cam.setRot(0.0, 0.0, heli.getHeading(), 2);
    cam.setFov(fov);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    cam.attachTo(heli.handle, 0.0, 0.0, -1.5, true);

    mp.game.graphics.pushScaleformMovieFunction(scaleform, "SET_CAM_LOGO");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(1);
    mp.game.graphics.popScaleformMovieFunctionVoid();

    helicam = true;
  }
});

mp.events.add("render", () => {
  if (helicam) {
	  if (!localPlayer.vehicle){
		  mp.events.call('enablehelicam');
		  return;
	  }
    if (cam !== null && cam.isActive() && cam.isRendering()) {
      //mp.game.controls.disableAllControlActions(2);
      mp.game.controls.disableControlAction(0,toggle_vision,true)
      mp.game.controls.disableControlAction(0,toggle_lock_on,true)

      var x = mp.game.controls.getDisabledControlNormal(7, 1) * speed_lr;
      var y = mp.game.controls.getDisabledControlNormal(7, 2) * speed_ud;
      var zoomIn = mp.game.controls.getDisabledControlNormal(2, 40) * zoomspeed;
      var zoomOut =
        mp.game.controls.getDisabledControlNormal(2, 41) * zoomspeed;

      var currentRot = cam.getRot(2);

      currentRot = new mp.Vector3(currentRot.x - y, 0, currentRot.z - x);

      cam.setRot(currentRot.x, currentRot.y, currentRot.z, 2);

      if (zoomIn > 0) {
        var currentFov = cam.getFov();
        currentFov -= zoomIn;
        if (currentFov < fov_min) currentFov = fov_min;
        cam.setFov(currentFov);
      } else if (zoomOut > 0) {
        var currentFov = cam.getFov();
        currentFov += zoomOut;
        if (currentFov > fov_max) currentFov = fov_max;
        cam.setFov(currentFov);
      }
    }

    if (mp.game.controls.isDisabledControlJustPressed(0, toggle_vision)) {
      mp.game.audio.playSoundFrontend(
        -1,
        "SELECT",
        "HUD_FRONTEND_DEFAULT_SOUNDSET",
        false
      );
      ChangeVision();
    }
	var currentFov = cam.getFov();
    if (locked_on_vehicle) {
      if (locked_on_vehicle.handle != 0) {
        cam.pointAt(locked_on_vehicle.handle, 0, 0, 0, true);
        RenderVehicleInfo(locked_on_vehicle);
        if (mp.game.controls.isDisabledControlJustPressed(0, toggle_lock_on) && false) {
          mp.game.audio.playSoundFrontend(
            -1,
            "SELECT",
            "HUD_FRONTEND_DEFAULT_SOUNDSET",
            false
          );
          locked_on_vehicle = null;
          let lPed = mp.players.local;
          let heli = lPed.vehicle;
          var currentRot = cam.getRot(2);
          let oldcam = cam;
          oldcam.destroy();
          cam = mp.cameras.new(
            "DEFAULT_SCRIPTED_FLY_CAMERA",
            lPed.position,
            new mp.Vector3(0, 0, mp.players.local.getHeading()),
            60
          );
          cam.setActive(true);
          cam.setRot(0.0, 0.0, heli.getHeading(), 2);
          cam.setFov(fov);
          mp.game.cam.renderScriptCams(true, false, 0, true, false);
          cam.attachTo(heli.handle, 0.0, 0.0, -1.5, true);
        }
      } else {
        locked_on_vehicle = null;
        let lPed = mp.players.local;
        let heli = lPed.vehicle;
        var currentRot = cam.getRot(2);
        let oldcam = cam;
        oldcam.destroy();
        cam = mp.cameras.new(
          "DEFAULT_SCRIPTED_FLY_CAMERA",
          lPed.position,
          new mp.Vector3(0, 0, mp.players.local.getHeading()),
          60
        );
        cam.setActive(true);
        cam.setRot(0.0, 0.0, heli.getHeading(), 2);
        cam.setFov(fov);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        cam.attachTo(heli.handle, 0.0, 0.0, -1.5, true);
      }
    } else {
      let vehicle_detected = pointingAt(cam);
      if (vehicle_detected != null && vehicle_detected.handle != 0) {
        if (mp.game.controls.isDisabledControlJustPressed(0, toggle_lock_on) && false) {
          mp.game.audio.playSoundFrontend(
            -1,
            "SELECT",
            "HUD_FRONTEND_DEFAULT_SOUNDSET",
            false
          );
          locked_on_vehicle = vehicle_detected;
        }
      }
    }

    mp.game.graphics.pushScaleformMovieFunction(
      scaleform,
      "SET_ALT_FOV_HEADING"
    );
    mp.game.graphics.pushScaleformMovieFunctionParameterFloat(
      mp.players.local.vehicle.position.z
    );
	//Client Crash Debug
	// Fix for crash define currentFov add in line 113
	if (typeof currentFov === 'number'){
		mp.game.graphics.pushScaleformMovieFunctionParameterFloat(currentFov);
	} else {
		mp.gui.chat.push("cFov ist keine nummer " + currentFov);
	}
	if (typeof cam.getRot(2).z === 'number'){
		mp.game.graphics.pushScaleformMovieFunctionParameterFloat(cam.getRot(2).z);
	} else {
		mp.gui.chat.push("camRot ist keine nummer " + cam.getRot(2).z);
	}
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.drawScaleformMovieFullscreen(
      scaleform,
      255,
      255,
      255,
      255,
      true
    );
  }
});

function ChangeVision() {
  if (vision_state == 0) {
    mp.game.graphics.setNightvision(true);
    vision_state = 2;
  } else if (vision_state == 1) {
    mp.game.graphics.setNightvision(true);
    mp.game.graphics.setSeethrough(true);
    vision_state = 2;
  } else {
    mp.game.graphics.setSeethrough(false);
    mp.game.graphics.setNightvision(false);
    vision_state = 0;
  }
}

Math.degrees = function (radians) {
  return (radians * 180) / Math.PI;
};

function RenderVehicleInfo(vehicle) {
  let vehname = mp.game.ui.getLabelText(
    mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model)
  );
  let licenseplate = vehicle.getNumberPlateText();

  mp.game.graphics.drawText(
    "Model: " + vehname + "\n Plate: " + licenseplate + "\n\n\n\n",
    [0.5, 0.9],
    {
      font: 0,
      color: [255, 255, 255, 185],
      scale: [0.0, 0.55],
      outline: true,
    }
  );
}

function pointingAt(camera) {
  let distance = 100;
  let position = camera.getCoord();
  let direction = camera.getDirection();
  let farAway = new mp.Vector3(
    direction.x * distance + position.x,
    direction.y * distance + position.y,
    direction.z * distance + position.z
  );

  //mp.game.graphics.drawLine(
  //  position.x,
  //  position.y,
  //  position.z,
  //  farAway.x,
  //  farAway.y,
  //  farAway.z,
  //  255,
  //  0,
  //  0,
  //  255
  //); // Is in line of sight
  let result = mp.raycasting.testPointToPoint(position, farAway, mp.players.local, [1, 16]);

  if (result) {
    if (result.entity.handle === localPlayer.handle) return null;
    if (result.entity.type === "vehicle") {
      return result.entity;
    }
    return null;
  }
  return null;
}

function RotAnglesToVec(rot) {
  let z = Math.degrees(rot.z);
  let x = Math.degrees(rot.x);
  let num = Math.abs(Math.cos(x));
  return new mp.Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
}

let spotlights = [];
let spotlightActivated = false;
let lastSpotlightEventReceivedDate = new Date();
const SPOTLIGHT_EVENT_RATE_THROTTELING = 10; //@BitDEVil2k16: event rate throtteling in ms here. Use e.g. 100 if instant event transfer lets the server start lagging.
const SPOTLIGHT_DISTANCE = 500;
const SPOTLIGHT_RADIUS = 5;

mp.keys.bind(0xBD, true, function () { // VK_MINUS - @BitDEVil2k16: please choose suitable keybind
    spotlightActivated = !spotlightActivated && helicam;
});

mp.events.add('clientReceiveSpotlightCoords', (vehId, o, d) => {
    if (spotlights[vehId] !== undefined)
        clearTimeout(spotlights[vehId].removeTimer);

    spotlights[vehId] = {
        "origin": o,
        "destination": d,
        "removeTimer": setTimeout(() => {
            delete spotlights[vehId];
        }, (SPOTLIGHT_EVENT_RATE_THROTTELING < 200 ? 200 : SPOTLIGHT_EVENT_RATE_THROTTELING * 1.5))
    };
});


mp.events.add('render', () => {
    spotlights.forEach((spotlight) => {
        mp.game.graphics.drawSpotLightWithShadow(spotlight.origin.x, spotlight.origin.y, spotlight.origin.z, spotlight.destination.x, spotlight.destination.y, spotlight.destination.z, 255, 255, 255, SPOTLIGHT_DISTANCE, 5, 1, SPOTLIGHT_RADIUS, 1, 10);
    });

    let veh = mp.players.local.vehicle;
    let curDate = new Date();
    if (veh !== null && cam !== null && spotlightActivated) {
        let target = pointingAtWithDist(9999, veh);
        let forward = veh.getForwardVector();
        let origin = new mp.Vector3(veh.position.x + forward.x * 3.4, veh.position.y + forward.y * 3.4, (veh.position.z + forward.z * 3.4) - 1);
        let dest = new mp.Vector3();

        if (target) {
            dest = new mp.Vector3((target.position.x - veh.position.x - forward.x * 3.4), (target.position.y - veh.position.y - forward.y * 3.4), (target.position.z - veh.position.z - forward.z * 3.4));
        } else {
            dest = cam.getDirection();
        }

        mp.game.graphics.drawSpotLightWithShadow(origin.x, origin.y, origin.z, dest.x, dest.y, dest.z, 255, 255, 255, SPOTLIGHT_DISTANCE, 5, 1, SPOTLIGHT_RADIUS, 1, 10);

        if (curDate - lastSpotlightEventReceivedDate > SPOTLIGHT_EVENT_RATE_THROTTELING) {
            mp.events.callRemote('serverReceiveSpotlightCoords', veh, origin, dest);
            lastSpotlightEventReceivedDate = curDate;
        }
    }
});

function pointingAtWithDist(distance, entity) {
    let position = cam.getCoord();
    let direction = cam.getDirection();
    let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z));
    return mp.raycasting.testPointToPoint(position, farAway, [entity, mp.players.local], 1);
}
}