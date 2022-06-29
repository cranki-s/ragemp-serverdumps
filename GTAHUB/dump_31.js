{
// Functions for items, for example to disable weapon switch and things like that
let currentWeaponHash;
let currentWeaponUnsigned;
let currentWeaponTimeout;
const UNARMED_HASH = 2725352035;

mp.players.local.setCanSwitchWeapon(false);

mp.events.add('playerWeaponShot', (a, b) => {
    let player = mp.players.local;
    if (player.weapon === currentWeaponUnsigned || player.weapon === UNARMED_HASH) {
        clearTimeout(currentWeaponTimeout);
        let ammoInClip = player.getAmmoInClip(currentWeaponHash);
        mp.events.callRemote("items:on_fire", ammoInClip ? ammoInClip : 0);

        // give the weapon in hand again
        if (!ammoInClip) {
            setTimeout(() => mp.game.invoke('0xBF0FD6E56C964FCB', player.handle, currentWeaponHash, 0, false, true), 1000);
        }
    }
});

mp.rpc("player:give_weapon", (weaponHash, ammo) => {
    currentWeaponHash = weaponHash;
    currentWeaponUnsigned = weaponHash >>> 0;
    mp.game.invoke("0xBF0FD6E56C964FCB", mp.players.local.handle, weaponHash, ammo, false, true);
    clearTimeout(currentWeaponTimeout);

    currentWeaponTimeout = setTimeout(() => {
        if (currentWeaponUnsigned && currentWeaponUnsigned !== mp.players.local.weapon) {
            mp.game.invoke("0xBF0FD6E56C964FCB", mp.players.local.handle, weaponHash, ammo, false, true);
        }
        clearTimeout(currentWeaponTimeout);
    }, 2000);
});


mp.rpc("player:remove_weapons", () => {
    mp.game.invoke("0xF25DF915FA38C5F3", mp.players.local.handle, false);
    currentWeaponHash = null;
    currentWeaponUnsigned = null;
    clearTimeout(currentWeaponTimeout);

    currentWeaponTimeout = setTimeout(() => {
        if (!currentWeaponUnsigned && mp.players.local.weapon !== UNARMED_HASH) {
            mp.game.invoke("0xF25DF915FA38C5F3", mp.players.local.handle, false);
        }
        clearTimeout(currentWeaponTimeout);
    }, 2000);
});

mp.events.add("render", () => {
    mp.game.controls.disableControlAction(24, 157, true); // tab weapon wheel
    mp.game.controls.disableControlAction(24, 37, true); // switch weapon wheel
    mp.game.controls.disableControlAction(1, 45, true); // reload
    mp.game.controls.disableControlAction(1, 140, true); // input melee attack
});

// some recoil on shot
let recoilCounter = 0;

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    mp.game.cam.shakeGameplayCam('JOLT_SHAKE', (recoilCounter +1)*0.2);
    recoilCounter = Math.min(recoilCounter + 1, 4);
});

mp.setInterval(() => {
    if(recoilCounter > 0) recoilCounter --;
}, 200);
}