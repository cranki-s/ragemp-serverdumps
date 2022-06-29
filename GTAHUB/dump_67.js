{
require("pools.js");

mp.noClip = {
  enabled: false,
  anyEntitySelected: false, // if selecting an entity
}

var getNormalizedVector = function(vector) {
  var mag = Math.sqrt(
      vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
  );
  vector.x = vector.x / mag;
  vector.y = vector.y / mag;
  vector.z = vector.z / mag;
  return vector;
};

var getCrossProduct = function(v1, v2) {
  var vector = new mp.Vector3(0, 0, 0);
  vector.x = v1.y * v2.z - v1.z * v2.y;
  vector.y = v1.z * v2.x - v1.x * v2.z;
  vector.z = v1.x * v2.y - v1.y * v2.x;
  return vector;
};

const bindASCIIKeys = {
  Q: 81,
  LCtrl: 17,
  Shift: 16
};
let isNoClip = false;
let noClipCamera;
let shiftModifier = false;
let controlModifier = false;
let localPlayer = mp.players.local;
let fastAccumulative = 0;

const velocities = [0.1, 0.25, 0.5, 1, 2, 4, 8, 16]
let currentVelocity = 0; // start at the middle

mp.rpc("player:toggle_noclip", (toggle) => {
  isNoClip = toggle;
  if (isNoClip) {
    startNoClip();
  } else {
    stopNoClip();
  }
  mp.noClip.enabled = toggle;
  mp.noClip.anyEntitySelected = false;
});

mp.events.add("player:set_position_noclip", (x, y, z) => {
  if (isNoClip && noClipCamera) {
    noClipCamera.setCoord(x, y, z);
  }
});

function startNoClip() {
  let camPos = new mp.Vector3(
      localPlayer.position.x,
      localPlayer.position.y,
      localPlayer.position.z
  );
  let camRot = mp.game.cam.getGameplayCamRot(2);
  noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
  noClipCamera.setActive(true);
  localPlayer.activeCamera = noClipCamera;
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
  localPlayer.freezePosition(true);
  localPlayer.setInvincible(true);
  localPlayer.setVisible(false, false);
  localPlayer.setCollision(false, false);
}

function stopNoClip() {
  if (noClipCamera) {
    let noclipCoords = noClipCamera.getCoord();
    localPlayer.setCoords(
        noclipCoords.x, noclipCoords.y, noclipCoords.z,
        true, false, false, false
    );
    localPlayer.setHeading(noClipCamera.getRot(2).z);
    noClipCamera.destroy(true);
    noClipCamera = null;
  }
  mp.game.cam.renderScriptCams(false, false, 0, true, false);
  localPlayer.freezePosition(false);
  localPlayer.activeCamera = null;
  localPlayer.setInvincible(false);
  localPlayer.setVisible(true, false);
  localPlayer.setCollision(true, false);
}

/** Perform logic to select entities */
function doSelectionLogic() {
  let position = noClipCamera.getCoord(); // grab the position of the gameplay camera as Vector3
  let direction = noClipCamera.getDirection(); // get the forwarding vector of the direction you aim with the gameplay camera as Vector3
  const distance = 50 // max distance to select entity

  let crosshairLong = 0.02;
  let crosshairShort = 0.002;

  // Detect target entity.
  // calculate a random point, drawn on a invisible line between camera position and direction (* distance)
  let entity = null;

  let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), ((direction.z * distance) + (position.z)));
  let raycast = mp.raycasting.testPointToPoint(position, farAway, mp.players.local.handle, -1); // vehicles(2)+peds(4)+peds(8)+objects(16) = 30

  // when raycasting actors rage doesn't return the entity, instead returns the handle.
  if (raycast && raycast.entity && typeof raycast.entity === "number") {
    entity = mp.peds.atHandle(raycast.entity)
  } else if (raycast) {
    entity = raycast.entity
  }

  // try to get from label
  if (mp.labels.selectedLabel) {
    if (!entity) {
      entity = mp.labels.selectedLabel; // set label as selected
    } else {
      // entity AND label selected. pick the nearest to the camera
      let label = mp.labels.selectedLabel;
      let distanceToLabel = mp.game.system.vdist2(label.position.x, label.position.y, label.position.z, position.x, position.y, position.z);
      let distanceToObj = mp.game.system.vdist2(entity.position.x, entity.position.y, entity.position.z, position.x, position.y, position.z);

      // pick label only if is nearest to target in distance
      if (distanceToLabel < distanceToObj) {
        entity = label;
      }
    }
  }

  mp.noClip.anyEntitySelected = !!entity;


  if (entity) {

    entity.kind = getEntityKind(entity.type)
    let remoteId = getEntityRemoteId(entity)

    // dispatch event on click
    if (mp.game.controls.isControlJustPressed(28, 237)) {
      mp.events.callRemote("player:on_select_entity", true, entity.kind, remoteId)
    } else if (mp.game.controls.isControlJustPressed(28, 238)) {
      mp.events.callRemote("player:on_select_entity", false, entity.kind, remoteId)
    }

    let color;
    switch(entity.type) {
      case "player": color = [239, 83, 80]; break; // red
      case "vehicle": color = [102, 187, 106]; break; // green
      case "object": color = [63, 81, 181]; break; // blue
      case "marker": color = [10, 255, 80]; break; // ?
      case "label": color = [255, 167, 38]; break; // yellow
      case "ped": color = [239, 83, 80]; break; // red
      default: color = [15, 15, 15]; break;
    }
    mp.game.graphics.drawRect(0.5, 0.5, crosshairShort, crosshairLong*1.2, color[0], color[1], color[2], 255) // semi-transparent
    mp.game.graphics.drawRect(0.5, 0.5, crosshairLong, crosshairShort*1.2, color[0], color[1], color[2], 255) // semi-transparent
  } else {
    // draw a white point
    mp.game.graphics.drawRect(0.5, 0.5, crosshairShort*0.8, crosshairLong, 180, 180, 180, 255) // semi-transparent
    mp.game.graphics.drawRect(0.5, 0.5, crosshairLong*0.8, crosshairShort, 180, 180, 180, 255) // semi-transparent
  }
}

mp.events.add('render', function() {
  if (!noClipCamera || mp.gui.cursor.visible) {
    return;
  }

  if (mp.players.local.duty) {
    doSelectionLogic();
  }

  controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
  shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);

  let rot = noClipCamera.getRot(2);
  let fastMult = 0.1 + fastAccumulative;
  let slowMult = 1;

  // Shift and Ctrl multiplier
  if (shiftModifier) {
    fastMult *= 3;
  } else if (controlModifier) {
    slowMult = 0.5;
  }

  // Mouse wheel multiplier
  if (mp.game.controls.isControlPressed(2, 15) && currentVelocity !== velocities.length-1) {
    fastAccumulative += velocities[currentVelocity]/2
    if (fastAccumulative >= velocities[currentVelocity+1]) {
      currentVelocity++;
      mp.events.call("hud:short_info", `~progress_${currentVelocity}_${velocities.length-1}_200px_${getColor(currentVelocity)}~`, 2000)
    }
  } else if (mp.game.controls.isControlPressed(2, 14) && currentVelocity !== 0) {
    fastAccumulative -= velocities[currentVelocity]/2
    if (fastAccumulative <= velocities[currentVelocity-1]) {
      currentVelocity--;
      mp.events.call("hud:short_info", `~progress_${currentVelocity}_${velocities.length-1}_200px_${getColor(currentVelocity)}~`, 2000)
    }
  }

  if (mp.keys.isDown(bindASCIIKeys.Q)) {
    fastAccumulative = 0;
    currentVelocity = 0;
  }

  let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
  let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
  let leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
  let leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
  let pos = noClipCamera.getCoord();
  let rr = noClipCamera.getDirection();
  let vector = new mp.Vector3(0, 0, 0);

  vector.x = rr.x * leftAxisY * fastMult * slowMult;
  vector.y = rr.y * leftAxisY * fastMult * slowMult;
  vector.z = rr.z * leftAxisY * fastMult * slowMult;

  let upVector = new mp.Vector3(0, 0, 1);
  let rightVector = getCrossProduct(
      getNormalizedVector(rr),
      getNormalizedVector(upVector)
  );
  rightVector.x *= leftAxisX * fastMult * slowMult;
  rightVector.y *= leftAxisX * fastMult * slowMult;
  rightVector.z *= leftAxisX * fastMult * slowMult;

  if (!mp.players.local.vehicle) mp.players.local.setHeading(noClipCamera.getRot(2).z);
  mp.players.local.setCoords(
      pos.x + vector.x + 1,
      pos.y + vector.y + 1,
      pos.z + vector.z + 1,
      true, false, false, false
  )

  noClipCamera.setCoord(
      pos.x - vector.x + rightVector.x,
      pos.y - vector.y + rightVector.y,
      pos.z - vector.z + rightVector.z
  );
  noClipCamera.setRot(
      rot.x + rightAxisY * -10.0,
      0.0,
      rot.z + rightAxisX * -10.0,
      2
  );
});

function getColor(velocity) {
  if (velocity >= 0 && velocity <= 3) return "primary"
  else return "danger"
}

}