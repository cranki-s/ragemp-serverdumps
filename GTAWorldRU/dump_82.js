{
﻿/**
 * Clientside JS file for handling of particle FX on the client.
 */

var currentFires = {};

mp.events.add('fire_manager:preload', async () => {
    __fire_preload("core", "fire_wrecked_plane_cockpit");
    __fire_preload("core", "fire_petroltank_car");
    __fire_preload("core", "fire_wrecked_train");
    __fire_preload("core", "ent_amb_fbi_fire_beam");
    __fire_preload("core", "fire_petroltank_truck");
    __fire_preload("scr_exile3", "scr_ex3_engine_fire");
    __fire_preload("scr_trevor1", "ent_ray_meth_fires");
    __fire_preload("core", "fire_petroltank_heli");
});

async function __fire_preload(particleLib, particleName) {
    for (let i = 0; !mp.game.streaming.hasNamedPtfxAssetLoaded(particleLib) && i < 1500; i++) {

        mp.game.streaming.requestNamedPtfxAsset(particleLib);

        for (let i = 0; !mp.game.streaming.hasNamedPtfxAssetLoaded(particleLib) && i < 1500; i++) 
        {
            await mp.game.waitAsync(1); // Because it's on the client, delay 1ms. Client inherently asynchronous?
        }
    }

    // Set the next call to be to the library.
    mp.game.graphics.setPtfxAssetNextCall(particleLib);
    var preloadedFire = mp.game.graphics.startParticleFxLoopedAtCoord(particleName, 999, 999, 999, 0, 0, 0, 1, false, false, false, false);
    await mp.game.waitAsync(50);
    mp.game.graphics.stopParticleFxLooped(preloadedFire, false);
}

mp.events.add('fire:create', async (particleID, particleLib, particleName, x, y, z) => {
    for (let i = 0;  !mp.game.streaming.hasNamedPtfxAssetLoaded(particleLib) && i < 1500; i++) {

        mp.game.streaming.requestNamedPtfxAsset(particleLib);

        for (let i = 0; !mp.game.streaming.hasNamedPtfxAssetLoaded(particleLib) && i < 1500; i++) 
        {
            await mp.game.waitAsync(1); // Because it's on the client, delay 1ms. Client inherently asynchronous?
        }
    }

    // Set the next call to be to the library.
    mp.game.graphics.setPtfxAssetNextCall(particleLib);

    // Store on the client!
    currentFires[particleID] = mp.game.graphics.startParticleFxLoopedAtCoord(particleName, x, y, z, 0, 0, 0, 1, false, false, false, false);
});

mp.events.add('fire:destroy', (particleID) => {
    if (!Number.isInteger(particleID))
	return;
    try {mp.game.graphics.stopParticleFxLooped(parseInt(currentFires[particleID]), false); } catch (error) {}
    delete currentFires[particleID];
});

mp.events.add('fire_manager:debug:show_current_fires', () => {
    mp.gui.chat.push("Current Fires:");
    for(var fire in currentFires)
    {
        mp.gui.chat.push("Fire ID " + fire + ": " + currentFires[fire]);
    }
});

mp.events.add('fire:extinguish_all_for_player', () => {
    for(var fire in currentFires)
    {
        if(currentFires[fire])
        {
            mp.game.graphics.stopParticleFxLooped(currentFires[fire], false);
            delete currentFires[fire];
        }
    }
});
}