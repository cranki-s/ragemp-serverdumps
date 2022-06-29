{
// helicam script by: https://rage.mp/files/file/397-helicam/

let fov_max = 80.0;
let fov_min = 10.0; // max zoom level (smaller fov is more zoom)
let zoomspeed = 2.0; // camera zoom speed
let speed_lr = 3.0; // speed by which the camera pans left-right
let speed_ud = 3.0; // speed by which the camera pans up-down
let toggle_vision = 34; // control id to toggle vision mode. Default: INPUT_MOVE_LEFT_ONLY (left arrow)
let toggle_lock_on = 22; // control id to lock onto a vehicle with the camera. Default is INPUT_SPRINT (spacebar)

let helicam = false;
let fov = (fov_max + fov_min) * 0.5;
let vision_state = 0; // 0 is normal, 1 is nightmode, 2 is thermal vision

let cam;

let locked_on_vehicle = null;
let scaleform;
let localPlayer = mp.players.local
let heliAllowed = [
    mp.game.joaat("annihilator"),
    mp.game.joaat("valkyrie"),
    mp.game.joaat("valkyrie2"),
    mp.game.joaat("buzzard"),
    mp.game.joaat("polmav"),
]

const ZONES = [
  { position: new mp.Vector3(-3950, -4000, 0), name: 'OCEANA' },
  { position: new mp.Vector3(-1250, -3550, 0), name: 'AIRP' },
  { position: new mp.Vector3(100, -3400, 0), name: 'ELYSIAN' },
  { position: new mp.Vector3(700, -3400, 0), name: 'TERMINA' },
  { position: new mp.Vector3(550, -2700, 0), name: 'CYPRE' },
  { position: new mp.Vector3(1050, -2700, 0), name: 'EBURO' },
  { position: new mp.Vector3(1800, -2700, 0), name: 'PALHIGH' },
  { position: new mp.Vector3(-250, -2350, 0), name: 'BANNING' },
  { position: new mp.Vector3(-250, -2150, 0), name: 'STAD' },
  { position: new mp.Vector3(-150, -2150, 0), name: 'ZP_ORT' },
  { position: new mp.Vector3(150, -2150, 0), name: 'RANCHO' },
  { position: new mp.Vector3(-750, -2100, 0), name: 'LOSPUER' },
  { position: new mp.Vector3(-100, -2000, 0), name: 'DAVIS' },
  { position: new mp.Vector3(-1150, -1950, 0), name: 'SanAnd' },
  { position: new mp.Vector3(1050, -1950, 0), name: 'MURRI' },
  { position: new mp.Vector3(-1150, -1800, 0), name: 'DELSOL' },
  { position: new mp.Vector3(-250, -1750, 0), name: 'CHAMH' },
  { position: new mp.Vector3(650, -1700, 0), name: 'LMESA' },
  { position: new mp.Vector3(-1350, -1650, 0), name: 'BEACH' },
  { position: new mp.Vector3(-50, -1650, 0), name: 'STRAW' },
  { position: new mp.Vector3(-1200, -1400, 0), name: 'VESP' },
  { position: new mp.Vector3(-1150, -1400, 0), name: 'VCANA' },
  { position: new mp.Vector3(-550, -1400, 0), name: 'KOREAT' },
  { position: new mp.Vector3(-1600, -1150, 0), name: 'DELBE' },
  { position: new mp.Vector3(-350, -1150, 0), name: 'PBOX' },
  { position: new mp.Vector3(200, -1150, 0), name: 'SKID' },
  { position: new mp.Vector3(150, -1000, 0), name: 'LEGSQU' },
  { position: new mp.Vector3(1400, -1000, 0), name: 'TATAMO' },
  { position: new mp.Vector3(-1350, -950, 0), name: 'DELPE' },
  { position: new mp.Vector3(300, -850, 0), name: 'TEXTI' },
  { position: new mp.Vector3(900, -800, 0), name: 'MIRR' },
  { position: new mp.Vector3(-400, -700, 0), name: 'DOWNT' },
  { position: new mp.Vector3(-1900, -650, 0), name: 'PBLUFF' },
  { position: new mp.Vector3(-1250, -600, 0), name: 'MOVIE' },
  { position: new mp.Vector3(-1000, -500, 0), name: 'ROCKF' },
  { position: new mp.Vector3(-200, -500, 0), name: 'VINE' },
  { position: new mp.Vector3(650, -500, 0), name: 'EAST_V' },
  { position: new mp.Vector3(-200, -450, 0), name: 'BURTON' },
  { position: new mp.Vector3(0, -450, 0), name: 'ALTA' },
  { position: new mp.Vector3(2500, -450, 0), name: 'NOOSE' },
  { position: new mp.Vector3(-1550, -400, 0), name: 'MORN' },
  { position: new mp.Vector3(0, -200, 0), name: 'HAWICK' },
  { position: new mp.Vector3(-1700, -100, 0), name: 'RICHM' },
  { position: new mp.Vector3(-1100, -50, 0), name: 'golf' },
  { position: new mp.Vector3(1000, -50, 0), name: 'HORS' },
  { position: new mp.Vector3(1650, -50, 0), name: 'LDAM' },
  { position: new mp.Vector3(-200, 0, 0), name: 'WVINE' },
  { position: new mp.Vector3(50, 0, 0), name: 'DTVINE' },
  { position: new mp.Vector3(700, 0, 0), name: 'CHIL' },
  { position: new mp.Vector3(1700, 0, 0), name: 'LACT' },
  { position: new mp.Vector3(-3150, 250, 0), name: 'BHAMCA' },
  { position: new mp.Vector3(-2000, 650, 0), name: 'RGLEN' },
  { position: new mp.Vector3(-3250, 850, 0), name: 'CHU' },
  { position: new mp.Vector3(-3050, 850, 0), name: 'BANHAMC' },
  { position: new mp.Vector3(2150, 1200, 0), name: 'WINDF' },
  { position: new mp.Vector3(-2000, 1300, 0), name: 'TONGVAH' },
  { position: new mp.Vector3(-1550, 1300, 0), name: 'TONGVAV' },
  { position: new mp.Vector3(2600, 1300, 0), name: 'PALMPOW' },
  { position: new mp.Vector3(1400, 1350, 0), name: 'DESRT' },
  { position: new mp.Vector3(-900, 1700, 0), name: 'GREATC' },
  { position: new mp.Vector3(-3000, 2050, 0), name: 'LAGO' },
  { position: new mp.Vector3(800, 2050, 0), name: 'RTRAK' },
  { position: new mp.Vector3(1600, 2400, 0), name: 'JAIL' },
  { position: new mp.Vector3(2600, 2500, 0), name: 'ZQ_UAR' },
  { position: new mp.Vector3(200, 2550, 0), name: 'HARMO' },
  { position: new mp.Vector3(-1300, 2650, 0), name: 'ZANCUDO' },
  { position: new mp.Vector3(-2200, 2700, 0), name: 'ARMYB' },
  { position: new mp.Vector3(3150, 2700, 0), name: 'SANCHIA' },
  { position: new mp.Vector3(-1300, 2800, 0), name: 'MTJOSE' },
  { position: new mp.Vector3(-2600, 3300, 0), name: 'NCHU' },
  { position: new mp.Vector3(2150, 3300, 0), name: 'SANDY' },
  { position: new mp.Vector3(50, 3550, 0), name: 'SLAB' },
  { position: new mp.Vector3(250, 3600, 0), name: 'ALAMO' },
  { position: new mp.Vector3(3400, 3600, 0), name: 'HUMLAB' },
  { position: new mp.Vector3(-2100, 4050, 0), name: 'CANNY' },
  { position: new mp.Vector3(2450, 4050, 0), name: 'GRAPES' },
  { position: new mp.Vector3(-200, 4200, 0), name: 'CALAFB' },
  { position: new mp.Vector3(-1600, 4300, 0), name: 'CCREAK' },
  { position: new mp.Vector3(1300, 4300, 0), name: 'GALFISH' },
  { position: new mp.Vector3(-150, 4350, 0), name: 'MTCHIL' },
  { position: new mp.Vector3(-1800, 4600, 0), name: 'CMSW' },
  { position: new mp.Vector3(2800, 5100, 0), name: 'MTGORDO' },
  { position: new mp.Vector3(-2400, 5150, 0), name: 'PALCOV' },
  { position: new mp.Vector3(3400, 5150, 0), name: 'ELGORL' },
  { position: new mp.Vector3(-1100, 5400, 0), name: 'PALFOR' },
  { position: new mp.Vector3(2350, 5500, 0), name: 'BRADP' },
  { position: new mp.Vector3(-450, 6050, 0), name: 'PALETO' },
  { position: new mp.Vector3(550, 6600, 0), name: 'PROCOB' },
];

/** Toggle helicam with Q */
mp.keys.bind(0x51, true, () => {
  if (localPlayer.vehicle && localPlayer.vehicle.getPedInSeat(0) === localPlayer.handle && localPlayer.vehicle.getClass() === 15) {
    if (heliAllowed.includes(localPlayer.vehicle.model)) {
      toggleHelicam();
    }
  }
});

mp.events.add("render", () => {
  if (helicam) {

    // draw zone information
    let street = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
    let streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName)
    let currentZone = mp.game.gxt.get(mp.game.zone.getNameOfZone(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z));
    mp.game.graphics.drawText(`${currentZone}\n${streetName}`, [0.5, 0.735], {
      font: 4,
      color: [213, 213, 213, 185],
      scale: [0.5, 0.5],
      outline: true
    });

    if (mp.players.local.position.z >= 50) {
      let ppos = mp.players.local.position;
      for (let zone of ZONES) {
        if (mp.game.system.vdist(zone.position.x, zone.position.y, 0, ppos.x, ppos.y, ppos.z) < 1500) {
          let prettyZone = mp.game.gxt.get(zone.name);
          mp.game.graphics.drawText(`${prettyZone}`, [zone.position.x, zone.position.y, 0], {
            font: 4,
            color: [213, 213, 213, 180],
            scale: [0.4, 0.4],
            outline: true
          });
        }
      }
    }

    if (cam !== null && cam.isActive() && cam.isRendering()) {
      mp.game.controls.disableAllControlActions(2);

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

    if (locked_on_vehicle) {
      if (locked_on_vehicle.handle) {
        cam.pointAt(locked_on_vehicle.handle, 0, 0, 0, true);
        RenderVehicleInfo(locked_on_vehicle);
        if (mp.game.controls.isDisabledControlJustPressed(0, toggle_lock_on)) {
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
          var currentFov = cam.getFov();
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
        var currentFov = cam.getFov();
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
        if (mp.game.controls.isDisabledControlJustPressed(0, toggle_lock_on)) {
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

    var currentFov = cam.getFov();
    mp.game.graphics.pushScaleformMovieFunctionParameterFloat(currentFov);
    mp.game.graphics.pushScaleformMovieFunctionParameterFloat(cam.getRot(2).z);

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

function toggleHelicam() {
  toggleHud(!isHudToggled());
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
}

function ChangeVision() {
  if (vision_state === 0) {
    mp.game.graphics.setNightvision(true);
    vision_state = 1;
  } else  {
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
  mp.game.graphics.drawText(
    "Modelo: " + vehname,
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
  let distance = 250;
  let position = camera.getCoord();
  let direction = camera.getDirection();
  let farAway = new mp.Vector3(
    direction.x * distance + position.x,
    direction.y * distance + position.y,
    direction.z * distance + position.z
  );
  let result = mp.raycasting.testPointToPoint(position, farAway, [1, 16]);

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

}