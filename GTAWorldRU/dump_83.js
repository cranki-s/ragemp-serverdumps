{
﻿/**
 * Clientside JS file for handling of player-related control functions on the client (e.g. shooting to put out fires).
 */


mp.events.add('player:fire:extinguisher:infinite_ammo', (val) => {
    mp.game.invoke('0x3EDCB0505123623B', mp.players.local.handle, val, 0x60EC506); // SET_PLAYER_INFINITE_AMMO(player, true/false, WEAPON_FIRE_EXTINGUISHER);
});

// Native RAGEMP function.
mp.events.add('playerWeaponShot', (targetPosition, _) => {
    if(mp.players.local.weapon == 101631238) {
        mp.events.callRemote("OnPlayerShoot", parseFloat(targetPosition.x), parseFloat(targetPosition.y), parseFloat(targetPosition.z));
    }
});
}