{
// Fire extinguisher
const blacklistedShootingEventWeapons = [0x060EC506, 0x42BF8A85];

mp.events.add('render', () => {
    // IsPedArmed (0x475768A975D5AD17): 4 returns true if you are equipped with any weapon except Explosives weapon group AND melee weapons
    // If the player is armed with anything but a melee weapon or explosive weapon disable the lock-on functionality, otherwise enable it
    mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 4) ? mp.game.invoke('0x5C8B2F450EE4328E', mp.players.local, false) :  mp.game.invoke('0x5C8B2F450EE4328E', mp.players.local, true);
});

mp.events.add('playerWeaponShot', ()  => {
    let weapon = mp.players.local.weapon;
    if (blacklistedShootingEventWeapons.indexOf(weapon) != -1) return;
    mp.events.callRemote('Animal_Shots_Fired');
    mp.events.callRemote('shotsFired', weapon);
});

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, targetPlayer, weapon, boneIndex, damage) => {
    if (targetEntity && targetEntity.type === "player" && sourceEntity && sourceEntity.type === "ped") {
        mp.events.callRemote('pedAttack', targetEntity, sourceEntity, boneIndex, damage);
        return true;
    }
    
    if (targetEntity && targetEntity.type === "player") {
        mp.events.callRemote('opwps', targetEntity, weapon.toString(36), boneIndex);
        return true;
    }

    if (targetEntity && targetEntity.type === "ped") {
        mp.events.callRemote('pedHit', targetEntity, boneIndex, damage);
        return true;
    }
});

mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
});

mp.events.add('hbrb', () => {
    mp.players.local.hitByRubberBullet = Date.now()
    mp.players.local.setToRagdoll(2500, 5000, 1, false, false, false);
});

mp.events.add('fallover', () => {
    mp.players.local.setToRagdoll(1000, 2000, 0, false, false, false);
});

}