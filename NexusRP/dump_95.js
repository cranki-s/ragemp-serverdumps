{
var ammosweap = 0;
var givenWeapon = -1569615261;
global.currentWeapons = -1569615261;
mp.keys.bind(Keys.VK_R, false, function () { // R key
	try {
		if (!loggedin || chatActive  || mp.gui.cursor.visible) return;
		var current = currentWeapon();
		if (current == -1569615261 || current == 911657153) return;
		var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, current);
		if (mp.game.weapon.getWeaponClipSize(current) == ammo) return;
		NexusEvent.callRemote("playerReload", current, ammo);
	} catch { }
});


mp.keys.bind(Keys.VK_1, false, function () { // 1 key
    if(global.AltButtonPressed)return;
    if (!loggedin || chatActive || global.menuOpened || mp.gui.cursor.visible) return;
    NexusEvent.callRemote('changeweap', 1);
});

mp.keys.bind(Keys.VK_2, false, function () { // 2 key
    if(global.AltButtonPressed)return;
    if (!loggedin || chatActive  || global.menuOpened || mp.gui.cursor.visible) return;
    NexusEvent.callRemote('changeweap', 2);
});

mp.keys.bind(Keys.VK_3, false, function () { // 3 key
    if(global.AltButtonPressed)return;
    if (!loggedin || chatActive  || global.menuOpened || mp.gui.cursor.visible) return;
    NexusEvent.callRemote('changeweap', 3);
});
mp.keys.bind(Keys.VK_4, false, function () { // 3 key
    if(global.AltButtonPressed)return;
    if (!loggedin || chatActive ||  global.menuOpened || mp.gui.cursor.visible) return;
    NexusEvent.callRemote('changeweap', 4);
});

let backweapon = [
    { 689760839: ["w_sg_pumpshotgun", 24818, new mp.Vector3(-.1, -.15, .11), new mp.Vector3(-180, 0, 0)] },
    { 3194406291: ["w_sg_pumpshotgunmk2", 24818, new mp.Vector3(-.1, -.15, .11), new mp.Vector3(-180, 0, 0)] },
    { 3085098415: ["w_sg_heavyshotgun", 24818, new mp.Vector3(-.1, -.15, .11), new mp.Vector3(-180, 0, 0)] },
    { 1255410010: ["w_sg_assaultshotgun", 24818, new mp.Vector3(-.1, -.15, .11), new mp.Vector3(-180, 0, 0)] },
    { 273925117: ["w_ar_assaultrifle", 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)] },
    { 1931114084: ["w_ar_assaultrifle_smg", 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)] },
    { 1026431720: ["w_ar_carbinerifle", 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)] },
    { 574348740: ["w_sb_gusenberg", 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)] },
    { 2587382322: ["w_ar_advancedrifle", 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)] },
    { 2549323539: ["w_ar_specialcarbine", 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)] }
];

mp.events.add('ChechWeapon',(weaponHash)=>{
    if(backweapon[weaponHash]){
        mp.attachmentMngr.addClient()
    }
})

mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    // if((weapon == 2725352035 || weapon == 2227010557 || weapon == 419712736 || weapon == 1317494643 || weapon == 2343591895 || weapon == 1737195953)&&(damage>=50)){
    //     return true;
    // }  
   // NexusEvent.callRemote('console',damage);  


});
const WEAPON_UNARMED = mp.game.joaat("weapon_unarmed"),
WEAPON_FIREEXTINGUISHER = mp.game.joaat("weapon_fireextinguisher"),
WEAPON_MELEE = [
    mp.game.joaat("weapon_dagger"),
    mp.game.joaat("weapon_bat"),
    mp.game.joaat("weapon_bottle"),
    mp.game.joaat("weapon_crowbar"),
    mp.game.joaat("weapon_flashlight"),
    mp.game.joaat("weapon_golfclub"),
    mp.game.joaat("weapon_hammer"),
    mp.game.joaat("weapon_hatchet"),
    mp.game.joaat("weapon_knuckle"),
    mp.game.joaat("weapon_knife"),
    mp.game.joaat("weapon_machete"),
    mp.game.joaat("weapon_switchblade"),
    mp.game.joaat("weapon_nightstick"),
    mp.game.joaat("weapon_wrench"),
    mp.game.joaat("weapon_battleaxe"),
    mp.game.joaat("weapon_poolcue"),
    mp.game.joaat("weapon_stone_hatchet"),
    WEAPON_FIREEXTINGUISHER,
  ],
  WEAPON_SHOOTGUN = [
    mp.game.joaat("weapon_bullpupshotgun"),
    mp.game.joaat("weapon_dbshotgun"),
    mp.game.joaat("weapon_pumpshotgun"),
    mp.game.joaat("weapon_pumpshotgun_mk2"),
    mp.game.joaat("weapon_assaultshotgun"),
    mp.game.joaat("weapon_heavyshotgun"),
    mp.game.joaat("weapon_musket"),
  ];

mp.events.add('checked', async ()=>{
  // const response = await NexusEvent.callRemoteProc('HUI');
  // mp.gui.chat.push(`response: ${JSON.stringify(response)}`);
  NexusEvent.callRemote('heathenEvent');
})
// mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
//     // if((weapon == 2725352035 || weapon == 2227010557 || weapon == 419712736 || weapon == 1317494643 || weapon == 2343591895 || weapon == 1737195953)&&(damage>=50)){
//     //     return true;
//     // }    
//    // NexusEvent.callRemote('console', targetEntity.type);      
//    // if (targetEntity.type === 'player' && weapon != -1569615261 ) {
//       //  NexusEvent.callRemote('console', weapon);        
//       //  let b = targetEntity;                 
//         const weapons = mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), localplayer.handle);
//         if ("player" === targetEntity.type) {
//             if(!targetEntity.isInAnyVehicle(false)){
//                 if (weapon === WEAPON_UNARMED){                  
//                     return void mp.game.weapon.setCurrentDamageEventAmount(10);
//                 } 
//                 // NexusEvent.callRemote('console', "33333 "+ -1 !== WEAPON_MELEE.indexOf(weapon))
//                 if (-1 !== WEAPON_MELEE.indexOf(weapon)){                  
//                     return void mp.game.weapon.setCurrentDamageEventAmount(15);
//                 } 
//             // NexusEvent.callRemote('console', "123 "+mp.game.weapon.setCurrentDamageEventAmount(0), mp.game.weapon.setCurrentDamageEventCritical(!1))
//                 // if ( (mp.game.weapon.setCurrentDamageEventAmount(0), mp.game.weapon.setCurrentDamageEventCritical(!1)) ) {
//                 //if ( -1 !== WEAPON_SHOOTGUN.indexOf(weapon)) return !0;
//                 mp.game.weapon.setCurrentDamageEventAmount(0);
//                 mp.game.weapon.setCurrentDamageEventCritical(!1);
//                 const c = 20 === boneIndex ? 0 : 19 === boneIndex || 10 === boneIndex || 9 === boneIndex || 8 === boneIndex || 7 === boneIndex || 0 === boneIndex || 15 === boneIndex || 11 === boneIndex ? 1 : 2;
//                 mp.events.callRemoteUnreliable("newdamage", targetEntity, weapons, c);                  
//                 // }
//                 return;
//             }
//             else{
//                // mp.game.weapon.setCurrentDamageEventAmount(0);              
//                if(boneIndex == 20) mp.game.weapon.setCurrentDamageEventAmount(10);
//                 mp.game.weapon.setCurrentDamageEventCritical(!1);                
//             }
//         }
//         if (!(150 <= damage && "vehicle" === targetEntity.type && weapon === WEAPON_UNARMED)) return;
//         mp.game.weapon.setCurrentDamageEventAmount(0);
//         const g = targetEntity.getCoords(!0),
//           h = Date.now(),
//           i = setInterval(() => {
//             if (Date.now() > h + 5e3 || 0 >= targetEntity.handle || !mp.vehicles.exists(targetEntity))
//               return void clearInterval(i);
//             const a = mp.dist(
//               g.x,
//               g.y,
//               g.z,
//               targetEntity.position.x,
//               targetEntity.position.y,
//               targetEntity.position.z
//             );
//             2.5 <= a &&
//               (clearInterval(i),
//               targetEntity.setCoords(g.x, g.y, g.z, !1, !1, !1, !1),
//               NexusEvent.callRemote("s_ac_veh_damage"));
//           }, 0);


//     //     if (b && "player" === b.type) {



//     //        // if (!mp.players.local.isShooting()) return;
//     //         // const c=b.getVariable("rsd");
//     //         //if(null==c)return;
//     //             const c =
//     //             20 === boneIndex ? 0 : 19 === boneIndex || 10 === boneIndex ||
//     //                 9 === boneIndex ||
//     //                 8 === boneIndex ||
//     //                 7 === boneIndex ||
//     //                 0 === boneIndex ||
//     //                 15 === boneIndex || 11 === boneIndex ? 1 : 2;     
//     //                 NexusEvent.callRemote("newdamage", b, weapons, c);                 
//     //               return true;
//     //        }
//     //     //return true; // disable outgoing headshot damage
//     // }
// });
mp.events.add("playerReady", () => {
    setTimeout(() => {
      try {
        mp.game.weapon.setEnableLocalOutgoingDamage(!0);
      } catch (a) {}
    }, 1e3);
    try {
      mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_rpg")),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("WEAPON_STINGER")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("WEAPON_PASSENGER_ROCKET")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("WEAPON_AIRSTRIKE_ROCKET")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("WEAPON_VEHICLE_ROCKET")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_grenadelauncher")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_grenadelauncher_smoke")
        ),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_minigun")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_firework")
        ),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_railgun")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_hominglauncher")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_compactlauncher")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_rayminigun")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_raycarbine")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_raypistol")
        ),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_grenade")),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_bzgas")),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_molotov")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_stickybomb")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_proxmine")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_pipebomb")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_smokegrenade")
        ),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_flare")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_stone_hatchet")
        );
    } catch (a) {}
})
mp.events.add('render', ()=>{
    mp.game.invoke("0x4A3DC7ECCC321032", mp.players.local, 0.225);
});

const currentWeapon = () => mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), localplayer.handle),
removeWeaponFromHand = () => mp.game.invoke("0xADF692B254977C0C", localplayer.handle, -1569615261, !0);
mp.events.add('wgive', (weaponHash, ammo, isReload, equipNow,weaponNames,weaponmaxammo,typeofweapon) => {
    weaponHash = parseInt(weaponHash);
    ammo = parseInt(ammo);
    givenWeapon = weaponHash;
    global.currentWeapons = weaponHash;
    ammo += mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
    mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
	  ammosweap = ammo;
    mp.gui.execute(`HUD.ammo=${ammo}`);
    mp.gui.execute(`HUD.ammoLeft=${weaponmaxammo}`);
    mp.gui.execute(`HUD.weaponId=${typeofweapon}`);
    mp.gui.execute(`HUD.weaponName='${weaponNames}'`);
    // GIVE_WEAPON_TO_PED //
    mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localplayer.handle, weaponHash, ammo, false, equipNow);    
    mp.game.invoke(getNative("MAKE_PED_RELOAD"), localplayer.handle);
});

mp.events.add('Arena:Client:GiveWeapon', (weaponHash, ammo, isReload, equipNow,weaponNames,weaponmaxammo,typeofweapon) => {
  weaponHash = parseInt(weaponHash);
  ammo = parseInt(ammo);
  givenWeapon = weaponHash;
  global.currentWeapons = weaponHash;
  ammo += mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
  ammosweap = ammo;
  mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
  mp.gui.execute(`HUD.ammo=${ammo}`);
  mp.gui.execute(`HUD.ammoLeft=${weaponmaxammo}`);
  mp.gui.execute(`HUD.weaponId=${typeofweapon}`);
  mp.gui.execute(`HUD.weaponName='${weaponNames}'`);
  // GIVE_WEAPON_TO_PED //
  mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localplayer.handle, weaponHash, ammo, false, equipNow);    
  mp.game.invoke(getNative("MAKE_PED_RELOAD"), localplayer.handle);
});

mp.events.add('takeOffWeapon', (weaponHash) => {
    try {
        currentWeapons = -1569615261;
        mp.gui.execute(`HUD.ammo=-1`);
        weaponHash = parseInt(weaponHash);
        var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
		if(ammo == ammosweap) NexusEvent.callRemote('playerTakeoffWeapon', weaponHash, ammo, 0);
		else NexusEvent.callRemote('playerTakeoffWeapon', weaponHash, ammosweap, 0);
		ammosweap = 0;
		mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
		mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, weaponHash);
		givenWeapon = -1569615261;
		currentWeapon = -1569615261;
    } catch (e) { }
});

mp.events.add('Arena:Client:TakeWeapon', (weaponHash) => {
  try {
    mp.gui.execute(`HUD.ammo=-1`);
    weaponHash = parseInt(weaponHash);
    mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
    mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, weaponHash);
    givenWeapon = -1569615261;

  } catch (e) { }
});

mp.events.add('serverTakeOffWeapon', (weaponHash) => {
    try {
        currentWeapons = -1569615261;
		mp.gui.execute(`HUD.ammo=-1`);
        weaponHash = parseInt(weaponHash);
        var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
		if(ammo == ammosweap) NexusEvent.callRemote('takeoffWeapon', weaponHash, ammo, 0);
		else NexusEvent.callRemote('takeoffWeapon', weaponHash, ammosweap, 0);
		ammosweap = 0;
		mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
		mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, weaponHash);
		givenWeapon = -1569615261;
    } catch (e) { }
});
var checkTimer = setInterval(function () {
  try {
    var current = currentWeapon();
    if (localplayer.isInAnyVehicle(true)) {
      var vehicle = localplayer.vehicle;
      if (vehicle == null) return;

      if (vehicle.getClass() == 15) {
        if (vehicle.getPedInSeat(-1) == localplayer.handle || vehicle.getPedInSeat(0) == localplayer.handle) return;
      }
      else {
        if (canUseInCar.indexOf(current) == -1) return;
      }
    }

    if (currentWeapon() != givenWeapon) {
      ammosweap = 0;
      mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localplayer.handle, givenWeapon, 1, false, true);
      mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, givenWeapon, 0);
      localplayer.taskReloadWeapon(false);
      if (currentWeapon() != 126349499) localplayer.taskSwapWeapon(false);
      mp.gui.execute(`HUD.ammo=-1;`);
    }
  } catch { }
}, 100);
var canUseInCar = [
    453432689,
    1593441988,
    -1716589765,
    -1076751822,
    -771403250,
    137902532,
    -598887786,
    -1045183535,
    584646201,
    911657153,
    1198879012,
    324215364,
    -619010992,
    -1121678507,
];
let playerInStreamCount = 0;
setInterval(() => {
    if (0 != mp.players.local.handle){
           playerInStreamCount = 0, mp.players.forEachInStreamRange(() => {
                playerInStreamCount++
            })
        }
}, 250);
const gameplayCamera = mp.cameras.new("gameplay");
let sendShootTimeout = null,
    sendShootCount = 0;
mp.events.add("playerWeaponShot", function (a, b) {
    var current = currentWeapon();    
    var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, current);
    mp.gui.execute(`HUD.ammo=${ammo};`);
	
	if (current != -1569615261 && current != 911657153) {
		if(ammosweap > 0) ammosweap--;
		if(ammosweap == 0 && ammo != 0) {
			NexusEvent.callRemote('takeoffWeapon', current, 0, 1);
			ammosweap = 0;
			mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, current, 0);
			mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, current);
			givenWeapon = -1569615261;
			mp.gui.execute(`HUD.ammo=-1;`);
		}
	}
	
	if (ammo <= 0) {
		ammosweap = 0;
        if(givenWeapon != 126349499)localplayer.taskSwapWeapon(false);
        mp.gui.execute(`HUD.ammo=-1;`);
    }    
}),
mp.events.add("render", function() {
    0 == global.currentWeapons && (mp.game.controls.disableControlAction(0, 68, !0), 
    mp.game.controls.disableControlAction(0, 69, !0), mp.game.controls.disableControlAction(0, 70, !0))
});

const resetDamageBlock = () => {
    mp.players.local.setProofs(
      !1,
      !1,
      !1,
      !(mp.players.local.isInAir() || mp.players.local.isFalling()),
      !1,
      !1,
      !1,
      !1
    ),
      mp.game.player.resetStamina(),
      mp.players.local.setConfigFlag(429, !0),
      mp.players.local.setConfigFlag(241, !0),
      mp.game.player.setWeaponDamageModifier(-999999);
  };
  setInterval(resetDamageBlock, 2500),
mp.events.add('render', () => {
    try {
        mp.game.controls.disableControlAction(2, 45, true); // reload control
        //localplayer.setCanSwitchWeapon(false);

        //     weapon switch controls       //
		mp.game.controls.disableControlAction(1, 243, true); // CCPanelDisable
		
        mp.game.controls.disableControlAction(2, 12, true);
        mp.game.controls.disableControlAction(2, 13, true);
        mp.game.controls.disableControlAction(2, 14, true);
        mp.game.controls.disableControlAction(2, 15, true);
        mp.game.controls.disableControlAction(2, 16, true);
        mp.game.controls.disableControlAction(2, 17, true);

        mp.game.controls.disableControlAction(2, 37, true);
        mp.game.controls.disableControlAction(2, 99, true);
        mp.game.controls.disableControlAction(2, 100, true);

        mp.game.controls.disableControlAction(2, 157, true);
        mp.game.controls.disableControlAction(2, 158, true);
        mp.game.controls.disableControlAction(2, 159, true);
        mp.game.controls.disableControlAction(2, 160, true);
        mp.game.controls.disableControlAction(2, 161, true);
        mp.game.controls.disableControlAction(2, 162, true);
        mp.game.controls.disableControlAction(2, 163, true);
        mp.game.controls.disableControlAction(2, 164, true);
        mp.game.controls.disableControlAction(2, 165, true);

        mp.game.controls.disableControlAction(2, 261, true);
        mp.game.controls.disableControlAction(2, 262, true);
        //      weapon switch controls       //

        if (currentWeapon() != -1569615261) { // heavy attack controls
            mp.game.controls.disableControlAction(2, 140, true);
            mp.game.controls.disableControlAction(2, 141, true);
            mp.game.controls.disableControlAction(2, 143, true);
            mp.game.controls.disableControlAction(2, 263, true);
        }
		
		
    } catch (e) { }	
});

}