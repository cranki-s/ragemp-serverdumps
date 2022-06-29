{
/** Support for particles */

let existingParticles = {};

function loadParticleLibIfNecessary(lib) {
    if (!mp.game.streaming.hasNamedPtfxAssetLoaded(lib)) {
        mp.game.streaming.requestNamedPtfxAsset(lib);
        return true;
    }
    return false;
}

mp.rpc("pp:oneshot", (posJson, lib, particle, scale) => {
   if (loadParticleLibIfNecessary(lib)) {
       setTimeout(() => mp.events.call("pp:oneshot", posJson, lib, particle, scale), 250);
       return;
   }

   let pos = JSON.parse(posJson);
   mp.game.graphics.setPtfxAssetNextCall(lib);
   // use function looped because many particles not work with notLoop, will clear after one second by convention
   let pp = mp.game.graphics.startParticleFxLoopedAtCoord(particle,
       pos.x, pos.y, pos.z,
       0.0, 0.0, 0.0, scale,
       false, false, false,
       true);

   setTimeout(() => {
       mp.game.graphics.removeParticleFx(pp, true);
   }, 1000);
});

mp.rpc("pp:create", (id, posJson, lib, particle, scale) => {
   if (existingParticles[id]) {
       mp.game.graphics.removeParticleFx(existingParticles[id], true);
   }

   if (loadParticleLibIfNecessary(lib)) {
       setTimeout(() => mp.events.call("pp:create", id, posJson, lib, particle, scale), 250);
       return;
   }

   let pos = JSON.parse(posJson);
   mp.game.graphics.setPtfxAssetNextCall(lib);

    if (isFire(particle)) {
        pos = getSafeZ(pos)
        createFire(id, particle, pos)
    }

   existingParticles[id] = mp.game.graphics.startParticleFxLoopedAtCoord(particle,
        pos.x, pos.y, pos.z,
        0.0, 0.0, 0.0, scale,
        false, false, false,
        true);
});

mp.rpc("pp:destroy", (id) => {
   if (existingParticles[id]) {
       let fire = getFireById(id);
       if (fire) destroyFire(fire);
       mp.game.graphics.removeParticleFx(existingParticles[id], true);
       delete existingParticles[id];
   }
});
}