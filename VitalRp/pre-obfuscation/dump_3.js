{
require("./files/static-attachments");
require("./files/epic-attachments");
require('./files/main.js');
require('./files/speedometer.js');
require('./files/natives.js');
require('./files/events.js');
require('./files/zones.js');
require('./files/new_voip.js');
require('./files/phone.js');
require('./files/modShop.js');

const localPlayer = mp.players.local;
mp.keys.bind(0x52, true, function () {
    if (logged === 0 || chatopened) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    var current = currentWeapon();
    if (current == -1569615261 || current == 911657153) return;
    var clipsize = (mp.game.weapon.getWeaponClipSize(current))
    var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localPlayer.handle, current);
    if (clipsize == ammo) return;
    var neededAmmo = clipsize - ammo
    mp.events.callRemote("ReloadWeapon", current, neededAmmo);

});

var givenWeapon = -1569615261;
var givenAmmo = 0
const currentWeapon = () => mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), localPlayer.handle);
mp.events.add('wgive', (weaponHash, ammo) => {
    weaponHash = parseInt(weaponHash);
    givenAmmo = parseInt(ammo);
    if (!localplayer.isInAnyVehicle(!0)) {
        mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, givenWeapon, ammo);
    }
    givenWeapon = weaponHash;
    if (!localplayer.isInAnyVehicle(!0)) {
        mp.game.invoke("0x75C55983C2C39DAA", localPlayer.handle, givenWeapon, ammo);
    }
});

mp.events.add("fuckyouweapon", (player, weapon) => {
    //mp.gui.chat.push('test');
    mp.game.invoke("0x75C55983C2C39DAA", player.handle, weapon, 0);
}),

mp.events.add('removeWeapon', (weaponHash) => {
    try {
        weaponHash = parseInt(weaponHash);
        var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localPlayer.handle, weaponHash);
        var clipsize = mp.game.weapon.getWeaponClipSize(weaponHash);
        mp.events.callRemote('PlayerUpdateAmmo', weaponHash, ammo, clipsize);
        mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, weaponHash, 0);
        mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localPlayer.handle, weaponHash);
        givenWeapon = -1569615261;

    } catch (e) { }
});


lastPCheck = 0;


var checkTimer = setInterval(function () {
    var current = currentWeapon();

    if (localplayer.isInAnyVehicle(!0)) {
        var vehicle = localPlayer.vehicle;
        if (vehicle == null) return;
        if (vehicle.getClass() === 15) {
            if (vehicle.getPedInSeat(-1) == localPlayer.handle || vehicle.getPedInSeat(0) == localPlayer.handle) return
        } else {
            if (canUseInCar.indexOf(current) == -1) return
        }
    }
    let secondCheck = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localPlayer.handle, givenWeapon);
    if (secondCheck && givenAmmo < secondCheck) {
        
        mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, givenWeapon, 0);
        if (lastPCheck === 0 || new Date().getTime() - lastPCheck > 5000) {
            lastPCheck = new Date().getTime();
            mp.events.callRemote("announceAdminsBullets", secondCheck, givenAmmo);
        }
    }
    if (currentWeapon() != givenWeapon) {
        if (!localplayer.isSwimming()) {
            let checkAmmo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localPlayer.handle, givenWeapon);
            if (givenAmmo < checkAmmo) {
                mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, givenWeapon, 0);
            }
            else {
                givenAmmo = checkAmmo
                var clipsize = mp.game.weapon.getWeaponClipSize(parseInt(givenWeapon));
                mp.events.callRemote('PlayerUpdateAmmo', givenWeapon, givenAmmo, clipsize);
                mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localPlayer.handle, givenWeapon, 0, !1, !0);
      
                mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, givenWeapon, givenAmmo);
                mp.game.invoke("0x20AE33F3AC9C0033", localPlayer);
                localPlayer.taskSwapWeapon(!1);
            }
        }

    }

}, 100);


var canUseInCar = [453432689, 1593441988, -1716589765, -1076751822, -771403250, 137902532, -598887786, -1045183535, 584646201, 911657153, 1198879012, 324215364, -619010992, -1121678507,];
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    var current = currentWeapon();
    var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localPlayer.handle, current);
    if (givenAmmo < ammo) {
        mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, givenWeapon, 0);
        
        //600439132
    }
    else {
        givenAmmo = ammo;
        var clipsize = (mp.game.weapon.getWeaponClipSize(current))
        mp.events.callRemote('PlayerUpdateAmmo', current, ammo, clipsize);

        if (ammo <= 0) {
            localPlayer.taskSwapWeapon(!1);
            mp.events.callRemote('PlayerUpdateAmmo', current, 0, clipsize)
        }
    }
});
let lockOn = false;
let aiming = false;
mp.events.add('render', () => {

    if (mp.game.controls.isControlPressed(1, 25)) {
        aiming = true;

    }
    else aiming = false;

    if (currentWeapon() != -1569615261 && !mp.game.invoke("0x475768A975D5AD17", mp.players.local.handle, 1)) {
        mp.game.player.setLockon(false);
        lockOn = false;
    }
    else if (aiming) {
        mp.game.player.setLockon(true);
        lockOn = true;
    }
    else if (!aiming) {

        mp.game.player.setLockon(false);
        lockOn = false;
    }


    mp.players.forEachInStreamRange(otherPlayer => {
        if (otherPlayer !== mp.players.local) {
            otherPlayer.setAsEnemy(lockOn);
            otherPlayer.setCanBeTargetted(lockOn);
        }
    });







    mp.game.player.setTargetingMode(3);

    mp.game.weapon.unequipEmptyWeapons = true;
    mp.game.invoke('0xEBD76F2359F190AC', mp.players.local.handle, false)
    mp.game.controls.disableControlAction(0, 45, true);
    mp.game.controls.disableControlAction(0, 140, true);
    mp.game.controls.disableControlAction(0, 263, true);

    let weaponHash = mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), mp.players.local.handle);
    mp.game.invoke("0x4757F00BC6323CFE", weaponHash, parseFloat(weaponDamage[weaponHash]))
    if (mp.game.invoke("0x475768A975D5AD17", mp.players.local.handle, 6)) {
        mp.game.controls.disableControlAction(1, 140, true);
        mp.game.controls.disableControlAction(1, 141, true);
        mp.game.controls.disableControlAction(1, 142, true);
    }
    if (mp.game.invoke("0x475768A975D5AD17", mp.players.local.handle, 1)) {

        mp.game.invoke("0x2E8AABFA40A84F8C", mp.players.local, true);
    }

    try {



        var player = mp.players.local;
        if (chatopened) {
            player.setVariable('chatopens', true);
        }
        if (!chatopened) {
            player.setVariable('chatopens', true);
        }
        if (player.isAiming) {
            console.log('Your aim target is ' + player.aimTarget);
        }

        mp.game.controls.disableControlAction(2, 12, !0);
        mp.game.controls.disableControlAction(2, 13, !0);
        mp.game.controls.disableControlAction(2, 14, !0);
        mp.game.controls.disableControlAction(2, 15, !0);
        mp.game.controls.disableControlAction(2, 16, !0);
        mp.game.controls.disableControlAction(2, 17, !0);
        mp.game.controls.disableControlAction(2, 37, !0);
        mp.game.controls.disableControlAction(2, 99, !0);
        mp.game.controls.disableControlAction(2, 100, !0);
        mp.game.controls.disableControlAction(2, 157, !0);
        mp.game.controls.disableControlAction(2, 158, !0);
        mp.game.controls.disableControlAction(2, 159, !0);
        mp.game.controls.disableControlAction(2, 160, !0);
        mp.game.controls.disableControlAction(2, 161, !0);
        mp.game.controls.disableControlAction(2, 162, !0);
        mp.game.controls.disableControlAction(2, 163, !0);
        mp.game.controls.disableControlAction(2, 164, !0);
        mp.game.controls.disableControlAction(2, 165, !0);
        mp.game.controls.disableControlAction(2, 261, !0);
        mp.game.controls.disableControlAction(2, 262, !0);
        if (currentWeapon() != -1569615261) {
            mp.game.controls.disableControlAction(2, 140, !0);
            mp.game.controls.disableControlAction(2, 141, !0);
            mp.game.controls.disableControlAction(2, 143, !0);
            mp.game.controls.disableControlAction(2, 263, !0)
        }
    } catch (e) { }
});
mp.events.add("playerDeath", function (player, reason, killer) {
    givenWeapon = -1569615261;
    /*if (player != mp.players.local) return;
    if (!player.isRagdoll()) {
        const playerPos = localPlayer.position;
        const groundZ = mp.game.gameplay.getGroundZFor3dCoord(playerPos.x, playerPos.y, playerPos.z, 0, false);
        setTimeout(() => {
            localPlayer.position = new mp.Vector3(playerPos.x, playerPos.y, (groundZ + 1));
        }, 1500);
    }*/

});
mp.events.add("removeAllWeapons", function () {
    mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localPlayer.handle, givenWeapon);
    givenWeapon = -1569615261
});

mp._events.add('incomingDamage', function (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) {
    if (sourceEntity && sourceEntity.type === "player" && weapon && targetEntity.type === "player") {
        let distance = mp.game.system.vdist(sourceEntity.position.x, sourceEntity.position.y, sourceEntity.position.z, targetEntity.position.x, targetEntity.position.y, targetEntity.position.z);
        if (weaponForcedDamage[weapon] && distanceDrop[weapon] && distanceWeaponDamage[weapon]) {
            if (distance > distanceDrop[weapon]) {
                damage = distanceWeaponDamage[weapon];
            }
            else damage = weaponForcedDamage[weapon];
            if (weapon === 2578377531 && distance < 15) {
                damage = 25;
            }
            if (weapon === 487013001 && distance > 7.5) {
                damage = 9;
            }
            if (weapon === 487013001 && distance > 12.5) {
                damage = 7;
            }
            if (weapon === 487013001 && distance > 17.5) {
                damage = 5;
            }
            if (weapon === 487013001 && distance > 20.0) {
                damage = 3;
            }
            

            let pedWeapon = mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), sourceEntity.handle);
            if (pedWeapon < 0) pedWeapon = pedWeapon + 4294967296;
                
            if (weapon === getNative("GET_SELECTED_PED_WEAPON"), sourceEntity.handle) {
                
                if (mp.players.local.getHealth() <= damage) {
                    mp.events.callRemote("AnnounceAdminPlayerKIlled", sourceEntity.getVariable("remoteID"), weapon)
                }
                targetEntity.applyDamageTo(parseInt(damage), true);
            }
            return true;
        }
        else if (weapon === 2725352035 || weapon === 3638508604 || weapon === 2578778090 || weapon === 2508868239 || weapon === 3713923289 || weapon === 911657153 || weapon === 911657153 || weapon === 1737195953)
        {
            if (mp.players.local.getHealth() <= damage) {
                mp.events.callRemote("AnnounceAdminPlayerKIlled", sourceEntity.getVariable("remoteID"), weapon)
            }
            return false;
        }
        else return true;
    }
    else if (weapon === 2725352035 || weapon === 3638508604 || weapon === 2578778090 || weapon === 2508868239 || weapon === 3713923289 || weapon === 911657153 || weapon === 911657153 || weapon === 1737195953)
    {
        if (mp.players.local.getHealth() <= damage) {
            mp.events.callRemote("AnnounceAdminPlayerKIlled", sourceEntity.getVariable("remoteID"), weapon)
        }
        return false;
    }
    else return true;

});





var resistStages = {
    0: 0.0,
    1: 0.05,
    2: 0.07,
    3: 0.1,
};
mp.events.add("setResistStage", function (stage) {
    mp.game.player.setMeleeWeaponDefenseModifier(0.25 + resistStages[stage]);
    mp.game.player.setWeaponDefenseModifier(1.3 + resistStages[stage])
});

mp.events.add("StartReload", function (ammo) {
    newAmmo = ammo + mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localPlayer.handle, givenWeapon);
    var clipsize = mp.game.weapon.getWeaponClipSize(parseInt(givenWeapon));
    if (newAmmo > clipsize) {
        mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, givenWeapon, 0);
    }
    givenAmmo = newAmmo;
    mp.events.callRemote('PlayerUpdateAmmo', givenWeapon, newAmmo, clipsize);
    mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, givenWeapon, newAmmo);
    mp.game.invoke(getNative("MAKE_PED_RELOAD"), localplayer.handle);
});

mp.events.add("EmptyGun", function () {
    mp.game.invoke(getNative("SET_PED_AMMO"), localPlayer.handle, givenWeapon, 0);
});


mp._events.add('outgoingDamage', function (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) {
    if (sourceEntity && sourceEntity.type === "player" && targetEntity.type === "player") {
        if (targetEntity.hasVariable('remoteID') && targetEntity.hasVariable('character_sqlid')) {
            mp.events.callRemote("LogDamage", damage, targetEntity.getVariable('remoteID'), targetEntity.getVariable('character_sqlid'), weapon);
        }
    }

    if (sourceEntity && sourceEntity.type === "player" && weapon && targetEntity.type === "player") {
        let distance = mp.game.system.vdist(sourceEntity.position.x, sourceEntity.position.y, sourceEntity.position.z, targetEntity.position.x, targetEntity.position.y, targetEntity.position.z);
        if (weaponForcedDamage[weapon] && distanceDrop[weapon] && distanceWeaponDamage[weapon]) {
            if (distance > distanceDrop[weapon]) {
                damage = distanceWeaponDamage[weapon];
            }
            else damage = weaponForcedDamage[weapon];
            if (weapon === 2578377531 && distance < 15) {
                damage = 25;
            }
            if (weapon === 487013001 && distance > 7.5) {
                damage = 9;
            }
            if (weapon === 487013001 && distance > 12.5) {
                damage = 7;
            }
            if (weapon === 487013001 && distance > 17.5) {
                damage = 5;
            }
            if (weapon === 487013001 && distance > 20.0) {
                damage = 3;
            }
            //mp.gui.chat.push(`Modified: Yes | Damage is: ${damage} , Distance is: ${distance}, Weapon is: ${JSON.stringify(weapon)}`)
            return false;
        }
        if (weapon === 2725352035 || weapon === 3638508604 || weapon === 2578778090 || weapon === 2508868239 || weapon === 3713923289 || weapon === 911657153 || weapon === 911657153 || weapon === 1737195953) return false;
        else return true;
    }
   
});


var weaponForcedDamage = {
    '453432689': '12',
    '1593441988': '13',
    '2578377531': '23',
    '487013001': '34',
    '324215364': '10',
    '736523883': '12',
    '3220176749': '17',
    '2210333304': '10'
}


var distanceWeaponDamage = {
    '453432689': '10',
    '1593441988': '11',
    '2578377531': '23',
    '487013001': '13',
    '324215364': '8',
    '736523883': '9',
    '3220176749': '15',
    '2210333304': '10'
}

var distanceDrop = {
    '453432689': '50',
    '1593441988': '50',
    '2578377531': '50',
    '487013001': '5',
    '324215364': '20',
    '736523883': '55',
    '3220176749': '20',
    '2210333304': '50'
}




var weaponDamage = {
    '-1569615261': '0.5',
    '-581044007': '0.7',
    '1737195953': '0.35',
    '-1786099057': '0.30',
    '-1716189206': '0.7',
    '-656458692': '0.62',
    '-1076751822': '0.4',
    '453432689': '0.58',
    '1593441988': '0.6',
    '-1716589765': '0.5',
    '324215364': '0.7',
    '736523883': '0.67', // smg
    '171789620': '0.565',
    '-1074790547': '0.62',
    '-2084633992': '0.68', // carbine
    '-1063057011': '0.74',
    '487013001': '0.28',

}
}