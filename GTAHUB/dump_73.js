{
/** Implements health and damage functions and events. */

let cooldown = 5000;
let lastSended = 0;

mp.events.add("outgoingDamage", (srcEntity,dstEntity,targetPlayer,weapon,boneIndex,damage) => {
    if (targetPlayer && targetPlayer.handle !== 0 && targetPlayer.type === 'player' && dstEntity === targetPlayer) {
        mp.events.callRemote("health:on_player_shot_player", targetPlayer.remoteId, boneIndex);
    }
});

let currentHealth = 100;

mp.rpc("player:set_health", (health) => {
    if (health < 0) health = 0;
    currentHealth = Math.round(health);
    mp.players.local.setHealth(100 + Math.round(health));
    browserCall("hudVM", "setHealth", currentHealth);
});

// respawn when dies

// detect damage
mp.events.add("render", () => {
    let p = mp.players.local;
    let h = p.getHealth();
    if (h !== currentHealth) {
        if (h < currentHealth) { // take damage
            mp.events.callRemote("health:on_take_damage", (currentHealth - h), 0);
        }
        p.setHealth(100 + currentHealth);
    }
});

mp.game.gameplay.setFadeOutAfterDeath(false);
mp.game.gameplay.disableAutomaticRespawn(true);
mp.game.gameplay.ignoreNextRestart(true);
mp.game.gameplay.setFadeInAfterDeathArrest(false);
mp.game.gameplay.setFadeInAfterLoad(false);
mp.game.player.setHealthRechargeMultiplier(0);

// set proofs interval
mp.setInterval(() => {
    let localPlayer = mp.players.local;
    localPlayer.setProofs(true, true, true, false, true, true, true, false);

    if (localPlayer.canRagdoll() && !localPlayer.ragdoll && Date.now() - lastSended > cooldown) {
        let pos = mp.players.local.position;
        if (localPlayer.isRagdoll() && !localPlayer.isBeingStunned(0) && mp.game.vehicle.isAnyVehicleNearPoint(pos.x, pos.y, pos.z, 5)) {
            lastSended = Date.now()
            mp.events.callRemote("health:possible_carkill");
        }
    }
}, 200);
}