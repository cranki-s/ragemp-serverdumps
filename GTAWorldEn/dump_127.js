{
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
var bindVirtualKeys = {
  F3: 0x72
};
var bindASCIIKeys = {
  Q: 69,
  Space: 32,
  LCtrl: 17,
  Shift: 16
};

var isNoClip = false;
var noClipCamera;
var shiftModifier = false;
var controlModifier = false;
var localPlayer = mp.players.local;

mp.keys.bind(0x74, true, function() {
  mp.events.callRemote('RequestNoClip');
});

var noclip_frozen = false;
mp.keys.bind(0x75, true, function() {
 noclip_frozen = !noclip_frozen;
mp.events.callRemote('noclip_pos_update', noClipCamera.position.x, noClipCamera.position.y, noClipCamera.position.z);
  if (noclip_frozen)
  mp.gui.chat.push("[Mapping mode] You're now frozen, you can now move furnitures, press F6 again to move your camera.");
  else
  mp.gui.chat.push("[Mapping mode] Movements enabled. Furnitures cannot be moved anymore until you press F6 again.");
});

var multModified = 1.0;
mp.events.add("noclipspeed", (value) => {
multModified = value;
});
mp.events.add("ToggleNoClip", () => {
    isNoClip = !isNoClip;
    // mp.game.ui.displayRadar(!isNoClip);
    if (isNoClip) {
      startNoClip();
    } else {
      stopNoClip();
    }
});

mp.events.add("ResetNoClip", (message = true) => {
    localPlayer.freezePosition(false);
    localPlayer.setInvincible(false);
    localPlayer.setVisible(true, false);
    localPlayer.setCollision(true, false);
    mp.events.callRemote('OnNoClipEnd', message);
});

function startNoClip() {
  mp.game.graphics.notify('Mapping mode ~g~activated');
  var camPos = new mp.Vector3(
    localPlayer.position.x,
    localPlayer.position.y,
    localPlayer.position.z
  );
  var camRot = mp.game.cam.getGameplayCamRot(2);
  noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
  noClipCamera.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
  localPlayer.freezePosition(true);
  localPlayer.setInvincible(true);
  localPlayer.setVisible(false, false);
  localPlayer.setCollision(false, false);
  mp.events.callRemote('OnNoClipStart');
}
function stopNoClip() {
  mp.game.graphics.notify('Mapping mode ~r~disabled');
  if (noClipCamera) {
    localPlayer.position = noClipCamera.getCoord();
    localPlayer.setHeading(noClipCamera.getRot(2).z);
    noClipCamera.destroy(true);
    noClipCamera = null;
  }
  if(!spectating) mp.events.call('ResetNoClip');
  mp.game.cam.renderScriptCams(false, false, 0, true, false);

}

var rendered = 0;
mp.events.add('render', function() {
  if (!noClipCamera || mp.gui.cursor.visible) {
    return;
  }
  controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
  shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
  var rot = noClipCamera.getRot(2);
  var fastMult = 0.5 * multModified;
  var slowMult = 0.5 * multModified;
  if (shiftModifier) {
    fastMult = 2 * multModified;
  } else if (controlModifier) {
    slowMult = 0.3 * multModified;
  }
  var rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
  var rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
  var leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
  var leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
  var pos = noClipCamera.getCoord();
  var rr = noClipCamera.getDirection();
  var vector = new mp.Vector3(0, 0, 0);
  vector.x = rr.x * leftAxisY * fastMult * slowMult;
  vector.y = rr.y * leftAxisY * fastMult * slowMult;
  vector.z = rr.z * leftAxisY * fastMult * slowMult;
  var upVector = new mp.Vector3(0, 0, 1);
  var rightVector = getCrossProduct(
    getNormalizedVector(rr),
    getNormalizedVector(upVector)
  );
  rightVector.x *= leftAxisX * 0.5* slowMult* fastMult;
  rightVector.y *= leftAxisX * 0.5* slowMult* fastMult;
  rightVector.z *= leftAxisX * 0.5* slowMult* fastMult;
  var upMovement = 0.0;
  if (mp.keys.isDown(bindASCIIKeys.Q)) {
    upMovement = 0.5 * slowMult* fastMult;
  }
  var downMovement = 0.0;
  if (mp.keys.isDown(bindASCIIKeys.Space)) {
    downMovement = 0.5 * slowMult* fastMult;
  }
  if (!noclip_frozen)
  mp.players.local.position = new mp.Vector3(
    pos.x + vector.x + 1,
    pos.y + vector.y + 1,
    pos.z + vector.z + 1
  );
  mp.players.local.heading = rr.z;
   if (!noclip_frozen)
  noClipCamera.setCoord(
    pos.x - vector.x + rightVector.x,
    pos.y - vector.y + rightVector.y,
    pos.z - vector.z + rightVector.z + upMovement - downMovement
  );
  noClipCamera.setRot(
    rot.x + rightAxisY * -5.0,
    0.0,
    rot.z + rightAxisX * -5.0,
    2
  );
  if (rendered == 0)
	mp.events.callRemote('noclip_pos_update', noClipCamera.position.x, noClipCamera.position.y, noClipCamera.position.z);
   rendered = rendered + 1;
  if (rendered > 100)
  {
    rendered = 0;
    mp.events.callRemote('noclip_pos_update', noClipCamera.position.x, noClipCamera.position.y, noClipCamera.position.z);
   }
});

}