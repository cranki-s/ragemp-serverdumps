{
//VARIABLES PARA TODO EL CLIENTE
var jugadorEnDuelo;
var playerGang = null;
var kills = 0;
var deaths = 0;
var killstreak = 0;
var hudAlpha = 255;
var colorBlipElectrica = 25;
var crips;
var bloods;
var families;
var cartelSinaloa;
var zetas;
var marabunta;
var arenaRevolver;
var arenaBrawl;
let player = mp.game.player;
var armasBrawl = {
   "1": 2508868239, //bate
   "2": 2297080999, //palo de golf
   "3": 2725352035, //puño
   "4": 3756226112, //navaja
   "5": 693539241, //martillo
   "6": 2484171525, //poolcuee
   "7": 419712736, //wrench
   "8": 3713923289, //machete
};
var audio = mp.browsers.new("package://gorditas/audios.html");


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
//Hace que el jugador no se canse, quita el autoaim, los culatazos y que el conductor pueda disparar.
let playerCanDriveBy = true;

//spectate variables
let spectateOn = false;
let spectateTarget;

mp.events.add('render', () => {
  //Quitamos stamina
  mp.game.player.restoreStamina(100);
  //Establece el estado de discord
  mp.discord.update('Purge Gangwars', `discord.gg/NEBaHT82cP`);
  //Quitamos radio
  if (mp.players.local.vehicle) {
    mp.game.audio.setRadioToStationName("OFF");
    mp.game.audio.setUserRadioControlEnabled(false);
}
  //Quitamos driveby del conductor
  if (!playerCanDriveBy) mp.game.player.setCanDoDriveBy(false);

  //Quitamos mando y culatazos.
    if (mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 6)) {
        mp.game.invoke('0x5C8B2F450EE4328E', mp.players.local.id, 0);
        mp.game.controls.disableControlAction(0, 140, true);
        mp.game.controls.disableControlAction(0, 141, true);
        mp.game.controls.disableControlAction(0, 142, true);
    } else {
        mp.game.invoke('0x5C8B2F450EE4328E', mp.players.local.id, 1);
    }
  //Spectate
  if(spectateOn && spectateTarget) mp.game.invoke('0x8BBACBF51DA047A8', spectateTarget.handle);
});

//Deshabilita el drive-by como conductor
mp.events.add("playerEnterVehicle", (vehicle, seat) => {
  if (seat === -1) {
      playerCanDriveBy = false;
  } else {
      playerCanDriveBy = true;
  }
});



//Cada minuto solicita al servidor que guarde sus datos en la base de datos.
setInterval(() => {
    mp.events.callRemote('guardardatosJugador');
}, 60000);

mp.events.add("playerJoinFix", (player) => {
    mp.game.graphics.notify(`~g~${player.name} ~w~joined the server!`);
});

mp.events.add("playerQuit", (player) => {
    mp.game.graphics.notify(`~g~${player.name} ~w~left server!`);
});

//Audio gorditas
var audioGorditas;
var videoSonando = false;
mp.events.add("playGorditasAudio", () => {
  if(videoSonando) return;
  videoSonando = true;
  audioGorditas = mp.browsers.new("package://gorditas/gorditas.html");
  audioGorditas.execute(`playSound()`)
  setTimeout(function() {
    audioGorditas.destroy();
    videoSonando = false;
  }, 15000)
});


//MARKERS SPAWN DE COCHES.
//CRIP SPAWNCAR
mp.markers.new(36, new mp.Vector3(-187.40721130371094, -1544.18017578125, 34.31242370605469), 2,
{
	visible: true,
});

//BALLAS SPAWNCAR
mp.markers.new(36, new mp.Vector3(-224.22532653808594, -1673.748779296875, 34.463321685791016), 2,
{
	visible: true,
});

//BLOODS SPAWNCAR
mp.markers.new(36, new mp.Vector3(-114.21070098876953, -1461.4205322265625, 33.822669982910156), 2,
{
	visible: true,
});

//MARABUNTA SPAWNCAR
mp.markers.new(36, new mp.Vector3(183.1581573486328, -1705.43212890625, 29.291772842407227), 2,
{
	visible: true,
});

//FAMILIES SPAWNCAR
mp.markers.new(36, new mp.Vector3(115.34032440185547, -1956.7435302734375, 20.845849990844727), 2,
{
	visible: true,
});

//CartelSinaloa SPAWNCAR
mp.markers.new(36, new mp.Vector3(5183.0244140625, -5135.1943359375, 3.329794883728027), 2,
{
	visible: true,
});

//Zetas SPAWNCAR
mp.markers.new(36, new mp.Vector3(4999.88232421875, -5173.15380859375, 2.65806198120117), 2,
{
	visible: true,
});

//Paugang SPAWNCAR
mp.markers.new(36, new mp.Vector3(455.88232421875, -1578.15380859375, 29.65806198120117), 2,
{
	visible: true,
});
//Evento SpawnProtect
mp.events.add('spawnprotect', (player) => {
	mp.game.player.setInvincible(true);
	mp.game.graphics.notify(`~r~You have godmode for ~w~3 seconds.`);
	setTimeout(() => {
		mp.game.player.setInvincible(false);
     }, 3000);
});

//NOCLIP
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
var bindASCIIKeys = {
  Q: 69,
  E: 81,
  LCtrl: 17,
  Shift: 16
};
var isNoClip = false;
var noClipCamera;
var shiftModifier = false;
var controlModifier = false;
var localPlayer = mp.players.local;

mp.events.add("noClip", (player) => {
  isNoClip = !isNoClip;
  mp.game.ui.displayRadar(!isNoClip);
  if (isNoClip) {
    startNoClip();
  } else {
    stopNoClip();
  }
});


//Quitar daño amigo
let debugOn = false;

mp.keys.bind(0x78, true, function() {
  mp.game.invoke('0xD966D51AA5B28BB9', mp.players.local.handle, 0xBFE256D4, 0x5ED6C128);
  if(debugOn) {
    mp.gui.chat.push("DEBUG OFF")
    debugOn = false;
  } else {
    mp.gui.chat.push("DEBUG ON")
    debugOn = true;
  }
});

mp.events.add("incomingDamage", (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {

  let shooterGang = sourcePlayer.getVariable('gangName');
  let targetGang = targetEntity.getVariable('gangName');
  if(debugOn) mp.gui.chat.push(`SOURCENTITY: ${sourceEntity}, SOURCEPLAYER: ${sourcePlayer}, TARGETENTITY: ${targetEntity}, WEAPON: ${weapon}, BONEINDEX: ${boneIndex}, DAMAGE: ${damage}, SHOOTERGANG: ${shooterGang}, TARGETGANG: ${targetGang}`);
  if(shooterGang == "arenaRevolver") return;
  if(shooterGang == "arenaBrawl") return;
  if(shooterGang == "arenaSniper") return;
  if(shooterGang == "arenaHeadshot" && targetGang == "arenaHeadshot") {
    if(boneIndex !== 20){
      return true;
    } else {
      return;
    }
  }
  if(shooterGang === targetGang && targetGang && shooterGang && shooterGang != 'freeroam') {
    return true;
  }
});



function startNoClip() {
  mp.game.graphics.notify('NoClip ~g~activated');
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
}
function stopNoClip() {
  mp.game.graphics.notify('NoClip ~r~disabled');
  if (noClipCamera) {
    localPlayer.position = noClipCamera.getCoord();
    localPlayer.setHeading(noClipCamera.getRot(2).z);
    noClipCamera.destroy(true);
    noClipCamera = null;
  }
  mp.game.cam.renderScriptCams(false, false, 0, true, false);
  localPlayer.freezePosition(false);
  localPlayer.setInvincible(false);
  localPlayer.setVisible(true, false);
  localPlayer.setCollision(true, false);
}
mp.events.add('render', function() {
  if (!noClipCamera || mp.gui.cursor.visible) {
    return;
  }
  controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
  shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
  var rot = noClipCamera.getRot(2);
  var fastMult = 1;
  var slowMult = 1;
  if (shiftModifier) {
    fastMult = 3;
  } else if (controlModifier) {
    slowMult = 0.5;
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
  rightVector.x *= leftAxisX * 0.5;
  rightVector.y *= leftAxisX * 0.5;
  rightVector.z *= leftAxisX * 0.5;
  var upMovement = 0.0;
  if (mp.keys.isDown(bindASCIIKeys.Q)) {
    upMovement = 0.5;
  }
  var downMovement = 0.0;
  if (mp.keys.isDown(bindASCIIKeys.E)) {
    downMovement = 0.5;
  }
  mp.players.local.position = new mp.Vector3(
    pos.x + vector.x + 1,
    pos.y + vector.y + 1,
    pos.z + vector.z + 1
  );
  mp.players.local.heading = rr.z;
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
});


//NAMETAGS

let isTalking = {};
mp.events.add('playerStartTalking', function (player) {
  isTalking[player.remoteId] = true;
});
mp.events.add('playerStopTalking', function (player) {
  isTalking[player.remoteId] = false;
});


const graphics = mp.game.graphics; 
const screenRes = graphics.getScreenResolution(0, 0); 
const maxDistance = 25*25;
const width = 0.03;
const height = 0.0065;
const border = 0.001;
const color = [255,255,255,255];


mp.nametags.enabled = false;
mp.events.add('render', (nametags) => {
     
    nametags.forEach(nametag => { 
        let [player, x, y, distance] = nametag;
        //Si el jugador esta en el noclip no pintamos el nametag.
        if(player.getVariable('InNoclip')) return;
        mp.game.invoke('0x7D7A2E43E74E2EB8', player.handle);
        let isTracked = player.isTrackedVisible();
        if(!isTracked) return;
        let showArmour = false;
         
        if(distance <= maxDistance) {        
            let scale = (distance / maxDistance); 
            if(scale < 0.6) scale = 0.6; 
             
            var health = player.getHealth();
            var armour = player.getArmour();
            if (armour > 0) showArmour = true;
            health = (health <= 100) ? (health / 100) : ((health - 100) / 100);
            armour = (armour <= 100) ? (armour / 100) : ((armour - 100) / 100);
            //Si esta hablando le ponemos la ID en verde.
            if(isTalking[player.remoteId]) {
              graphics.drawText(`${player.name.replace('_', ' ')} (${player.remoteId})`, [x, y], { font: 0, color: [52, 239, 52, 235], scale: [0.3, 0.3], outline: true });
            } else {
              graphics.drawText(`${player.name.replace('_', ' ')} (${player.remoteId})`, [x, y], { font: 0, color: [255, 255, 255, 235], scale: [0.3, 0.3], outline: true });
            }
             
            if(mp.game.player.isFreeAimingAtEntity(player.handle)) {
              //Draw health
                let y2 = y + 0.042;
                let x2;
                if(showArmour) {
                  x2 = x - 0.016   
                } else {
                  x2 = x;
                }
                graphics.drawRect(x2, y2, width + border * 2, height + border * 2, 0, 0, 0, 200); 
                    graphics.drawRect(x2, y2, width, height, 150, 150, 150, 255); 
                    graphics.drawRect(x2 - width / 2 * (1 - health), y2, width * health, height, 255, 255, 255, 200);
              //Draw armour
              let x3 = x + 0.016
              if(showArmour) {
                graphics.drawRect(x3, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
                graphics.drawRect(x3, y2, width, height, 150, 150, 150, 255);
                graphics.drawRect(x3 - width / 2 * (1 - armour), y2, width * armour, height, 255, 255, 255, 100);
              }
                    
            }
        } 
    }) 
});

const islandColShape = mp.colshapes.newSphere(5269.1845703125, -5023.8134765625, 21.58545684814453, 3000, 0);
function setIslandLoaded(bool){
  mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", bool);
  mp.game.invoke("0x5E1460624D194A38", bool);
}
mp.events.add("playerEnterColshape", function(shape) {
  if(shape == islandColShape){
    setIslandLoaded(true);
  }
});

mp.events.add("playerExitColshape", function(shape) {
  if(shape == islandColShape){
    setIslandLoaded(false);
  }
});


//weapon anim
let playerSwitchWep = false;
let playerHowevering = false;

mp.events.add("render", () => {
  if(debugOn) {
    mp.gui.chat.push(`Switchwep: ${playerSwitchWep}`)
    mp.gui.chat.push(`however: ${playerHowevering}`)
  }

  if(playerSwitchWep || playerHowevering){

    mp.game.controls.disableControlAction(32, 24, true);
    mp.game.controls.disableControlAction(32, 257, true);
    mp.game.controls.disableControlAction(32, 263, true);
    mp.game.controls.disableControlAction(32, 264, true);
    mp.game.controls.disableControlAction(32, 69, true);
    mp.game.controls.disableControlAction(32, 70, true);
    mp.game.controls.disableControlAction(32, 92, true);
    mp.game.controls.disableControlAction(32, 114, true);
    mp.game.controls.disableControlAction(32, 121, true);
    mp.game.controls.disableControlAction(32, 140, true);
    mp.game.controls.disableControlAction(32, 141, true);
    mp.game.controls.disableControlAction(32, 142, true);
    mp.game.controls.disableControlAction(32, 331, true);

  }
})

mp.events.add("disableShootControls", () => {
  if(playerSwitchWep) return;
  playerHowevering = true;
  setTimeout(function() {
    playerHowevering = false;
  }, 6500)
})



let allowShootingTimeout;
mp.events.add("client:weaponChange", (oldWeapon, newWeapon) => {
  if(mp.players.local.vehicle) return;
  const oldWeaponGroup = mp.game.weapon.getWeapontypeGroup(oldWeapon);
  const newWeaponGroup = mp.game.weapon.getWeapontypeGroup(newWeapon);
  switch(newWeaponGroup)
  {

    //Handgun enter
    case 416676503:
      playerSwitchWep = true;
      if(allowShootingTimeout) clearTimeout(allowShootingTimeout)
      allowShootingTimeout = setTimeout(() => {playerSwitchWep = false}, 1800)

  	  mp.events.callRemote("playerPulloutWep", false, false)
      playShitAnim(true, true)
    break;

    //Heavy enter
    case 970310034: case 3337201093: case 860033945:
      playerSwitchWep = true;
      if(allowShootingTimeout) clearTimeout(allowShootingTimeout)
      allowShootingTimeout = setTimeout(() => {playerSwitchWep = false}, 1800)

  	  mp.events.callRemote("playerPulloutWep", true, false)
      playShitAnim(true, false)
    break;

    //Player switch to melee again...
    case 2685387236:
      switch(oldWeaponGroup)
      {
        //Handgun exit
        case 416676503:
        playerSwitchWep = true; 
	      if(allowShootingTimeout) clearTimeout(allowShootingTimeout)
	      allowShootingTimeout = setTimeout(() => {playerSwitchWep = false}, 1800)

	  	  mp.events.callRemote("playerPulloutWep", false, true)
        playShitAnim(false, true)
        break;

        //Heavy exit
        case 970310034: case 3337201093: case 860033945:
        playerSwitchWep = true;
	      if(allowShootingTimeout) clearTimeout(allowShootingTimeout)
	      allowShootingTimeout = setTimeout(() => {playerSwitchWep = false}, 1800)

	  	  mp.events.callRemote("playerPulloutWep", true, true)
        playShitAnim(true, true)

        break;
      }
    break;
  }
})



const loadAnimDict = async (dictName) => {
  mp.game.streaming.requestAnimDict(dictName);
  while (!mp.game.streaming.hasAnimDictLoaded(dictName)) await mp.game.waitAsync(0);
};

//loadAnimDict('anim@heists@ornate_bank@grab_cash_heels');
//loadAnimDict('reaction@intimidation@1');
mp.game.streaming.requestAnimDict("anim@heists@ornate_bank@grab_cash_heels");
mp.game.streaming.requestAnimDict("reaction@intimidation@1h");
mp.events.add("playSyncedAnim", async (player, dict, name, p1, p2, p3, p4, p5, p6, p7, p8) => {

  if(!mp.game.streaming.hasAnimDictLoaded(dict)) {
      mp.game.streaming.requestAnimDict(dict)
      while(!mp.game.streaming.hasAnimDictLoaded(dict)) await mp.game.waitAsync(0)
  }

  player.taskPlayAnim(dict, name, p1, p2, p3, p4, p5, p6, p7 ,p8)
})


function playShitAnim(heavy, exit) {
  if(mp.players.local.vehicle) return;
	let animDict, animName;

	if(heavy) {
		animDict = "anim@heists@ornate_bank@grab_cash_heels";
		animName = exit ? "exit": "intro"
	} else {
		animDict = "reaction@intimidation@1h";
		animName = exit ? "outro": "intro"
	}
	
	mp.players.local.taskPlayAnim(animDict, animName, 8.0, 3.0, 1700, 48, 0.0, true, true, true)
}



//crouch
const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.25;

const loadClipSet = async (clipSetName) => {
  mp.game.streaming.requestClipSet(clipSetName);
  while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) await mp.game.waitAsync(0);
};

// load clip sets
loadClipSet(movementClipSet);
loadClipSet(strafeClipSet);

mp.keys.bind(0x58, true, () => {
  if(mp.gui.cursor.visible) return
  mp.players.local.setMovementClipset(movementClipSet, clipSetSwitchTime);
  mp.players.local.setStrafeClipset(strafeClipSet);
});

mp.keys.bind(0x58, false, () => {
  if(mp.gui.cursor.visible) return
  mp.players.local.resetMovementClipset(clipSetSwitchTime);
  mp.players.local.resetStrafeClipset();
});


// SPECTATE

mp.events.add("client:SpectatePlayer", (player) => {
    mp.players.local.freezePosition(true);
    mp.players.local.setInvincible(true);
    mp.players.local.setVisible(false, false);
    mp.players.local.setCollision(false, false);
    spectateTarget = player;
    spectateOn = true;
})

mp.events.add("client:StopSpectate", () => {
    mp.players.local.freezePosition(false);
    mp.players.local.setInvincible(false);
    mp.players.local.setVisible(true, false);
    mp.players.local.setCollision(true, false);
    spectateOn = false;
})

// END OF SPECTATE

//custom damage
mp.events.add("client:weaponChange", (oldWep, newWep) => {
  mp.game.player.setWeaponDamageModifier(0.8);
})

// RECOIL 


var tv = 0;

var rec = 0.01;

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {

    if(mp.players.local.isDoingDriveby())
        return;

    var viewMode = mp.game.invoke("0x8D4D46230B2C353A");

    var p = mp.game.cam.getGameplayCamRot(0).x;

    if(viewMode == 4)  
    {

        mp.game.cam.setGameplayCamRelativePitch(p+0.1, 1.200000);
        tv += 0.1;
    } else {

        mp.game.cam.setGameplayCamRelativePitch(p+rec, 1.200000);
        tv += 0.6;
    }

});

// END RECOIL

// FREEZE 
mp.events.add("client:freeze", (bool) => {
  mp.players.local.freezePosition(bool);
})

// END OF FREEZE 

// START OF GODMODE 

let godmodeStatus = false;
mp.events.add("godmode", () => {
  mp.game.player.setInvincible(!godmodeStatus);
  godmodeStatus = !godmodeStatus;
  if(godmodeStatus) mp.gui.chat.push(`Godmode has been turned ON`)
  else mp.gui.chat.push(`Godmode has been turned OFF`)
})

// END OF GODMODE


}