{
﻿var currentPage = null;

mp.events.add('fire_manager:show', (inactiveFires, activeFires) => {
    currentPage = mp.browsers.new('package://gtalife/fire_management/html/fireManager.html');
    
    mp.events.call('setCefActive', true);
    mp.gui.cursor.show(true, true);
    mp.gui.chat.show(false);
    currentPage.active = true;

    currentPage.execute(`setFireData(` + inactiveFires + `, ` + activeFires + `)`);
});

mp.events.add('fire_manager:clear_demo', () => {
    if(mp.players.local.demoMarker != undefined)
    {
        mp.players.local.demoMarker.destroy();
        mp.players.local.demoMarker = undefined;
    }

    if(mp.players.local.demoParticle != undefined)
    {
        mp.game.graphics.stopParticleFxLooped(mp.players.local.demoParticle, false);
        mp.players.local.demoParticle = undefined;
    }

    if(mp.players.local.demoVehicle != undefined)
    {
        mp.players.local.demoVehicle.destroy();
        mp.players.local.demoVehicle = undefined;
    }
});

mp.events.add('fire_manager:hide', () => {
    if(mp.players.local.demoMarker != undefined)
    {
        mp.players.local.demoMarker.destroy();
        mp.players.local.demoMarker = undefined;
    }

    if(mp.players.local.demoParticle != undefined)
    {
        mp.game.graphics.stopParticleFxLooped(mp.players.local.demoParticle, false);
        mp.players.local.demoParticle = undefined;
    }

    if(mp.players.local.demoVehicle != undefined)
    {
        mp.players.local.demoVehicle.destroy();
        mp.players.local.demoVehicle = undefined;
    }

    if(currentPage != null && mp.browsers.exists(currentPage))
    {
        currentPage.active = false;
        currentPage.destroy();
        
        currentPage = null;
        mp.events.call('setCefActive', false);
        mp.gui.cursor.show(false, false);
        mp.gui.chat.show(true);
        setTimeout(function() { mp.gui.cursor.show(false); }, 100);
    }
});

mp.events.add('fire_manager:request_main_refresh', () => {
    mp.events.callRemote('fire_manager:request_main_refresh');
});

mp.events.add('fire_manager:refresh_main_page', (inactiveFires, activeFires) => {
if (currentPage != null && mp.browsers.exists(currentPage))
    currentPage.execute(`setFireData(` + inactiveFires + `, ` + activeFires + `)`);
});

mp.events.add('fire_manager:refresh', () => {
    if(currentPage != null && mp.browsers.exists(currentPage))
    {
        currentPage.destroy();
        mp.gui.cursor.show(false, false);
        currentPage = null;
        //mp.gui.chat.activate(true);
    }
    mp.events.callRemote("fire_manager:refresh");
});

mp.events.add('fire_manager:view_stored_fires:show', (dataString) => { 
if (currentPage != null && mp.browsers.exists(currentPage))
    currentPage.execute(`passFireData('` + dataString + `');`);
});


mp.events.add('fire_manager:view_stored_fires:request', () => {
    mp.events.callRemote('fire_manager:view_stored_fires:request');
});

mp.events.add('fire_manager:create_new_fire:request', () => {
    mp.events.callRemote('fire_manager:create_new_fire:request');
});

mp.events.add('fire_manager:create_new_fire:show', () => {

    //mp.gui.chat.activate(false);
    mp.gui.cursor.show(true, true);
    
    // Get player forward vector and feed it in.

    var playerFVector = mp.players.local.getForwardVector();
    playerFVector = new mp.Vector3(playerFVector.x * 5, playerFVector.y * 5, playerFVector.z);
    var playerCurrentVector = mp.players.local.position;

    var newPosVector = new mp.Vector3(playerCurrentVector.x + playerFVector.x, playerCurrentVector.y + playerFVector.y, playerCurrentVector.z - 1);

    // Now create a marker at that location!
    var demoMarker = mp.markers.new(1, newPosVector, 5,
    {
        direction: new mp.Vector3(newPosVector.x, newPosVector.y, newPosVector.z),
        rotation: new mp.Vector3(0, 0, 0),
        color: [255, 0, 0, 80],
        visible: true,
        dimension: mp.players.local.dimension
    });
    mp.players.local.demoMarker = demoMarker;

    currentPage.execute(`setFireLocation(` + newPosVector.x + `, ` + newPosVector.y + `, ` + newPosVector.z + `);`);
});

mp.events.add('fire_manager:create_new_fire:refresh', async (posX, posY, posZ, radius, particleInfo, hasVehicle, vehicleHash) => {
    // Step 1. Destroy any existing markers or particles.
    if(mp.players.local.demoMarker != undefined) 
    {
        mp.players.local.demoMarker.destroy();
        mp.players.local.demoMarker = undefined;
    }
    if(mp.players.local.demoParticle != undefined) 
    {
        mp.game.graphics.stopParticleFxLooped(mp.players.local.demoParticle, false);
        mp.players.local.demoParticle = undefined;
    }
    if(mp.players.local.demoVehicle != undefined) 
    {
        mp.players.local.demoVehicle.destroy();
        mp.players.local.demoVehicle = undefined;
    }
    
    // Step 2. Recreate the marker and fire.
    // Now create a marker at that location!
    var newMarkerVector = new mp.Vector3(parseFloat(posX), parseFloat(posY), parseFloat(posZ));
    
    var demoMarker = mp.markers.new(1, newMarkerVector, radius,
    {
        direction: new mp.Vector3(newMarkerVector.x, newMarkerVector.y, newMarkerVector.z),
        rotation: new mp.Vector3(0, 0, 0),
        color: [255, 0, 0, 80],
        visible: true,
        dimension: mp.players.local.dimension
    });
    mp.players.local.demoMarker = demoMarker;

    var particleLib = particleInfo.toString().split("/")[0];
    var particleName = particleInfo.toString().split("/")[1];

    // Now create the fire.
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
    var demoParticle = mp.game.graphics.startParticleFxLoopedAtCoord(particleName, newMarkerVector.x, newMarkerVector.y, newMarkerVector.z, 0, 0, 0, 1, false, false, false, false);
    mp.players.local.demoParticle = demoParticle;

    if(hasVehicle)
    {
        var demoVehicle = mp.vehicles.new(mp.game.joaat(vehicleHash), newMarkerVector,
        {
            heading: mp.players.local.heading,
            numberPlate: "DEMO",
            locked: true,
            engine: 0,
            dimension: mp.players.local.dimension
        });

        mp.players.local.demoVehicle = demoVehicle;
    }
});

mp.events.add('fire_manager:create_new_fire:finalize', (description, vehicleHash, posX, posY, posZ, chanceToGrow, aggressionTime, radius, maxLifespan, maxChildren,
    particleLib, particleName, maxChildLifespan, maxChildHealth, minFD) => {
        mp.events.callRemote('fire_manager:create_new_fire:finalize', description, vehicleHash, posX, posY, posZ, chanceToGrow, aggressionTime, radius, maxLifespan, maxChildren,
        particleLib, particleName, maxChildLifespan, maxChildHealth, minFD);

});

mp.events.add('fire_manager:notif', (msg) => {
    if(currentPage != null && mp.browsers.exists(currentPage))
    {
        currentPage.execute(`notification('` + msg + `');`);
    }
});

mp.events.add('fire_manager:view_fires:request_edit', (fireID) => {
    mp.events.callRemote('fire_manager:view_fires:request_edit', fireID);
});

mp.events.add('fire_manager:edit_fire', (fireData, vehData) => {
    if(currentPage != null && mp.browsers.exists(currentPage))
    {
        currentPage.execute(`setStoredFireData('` + fireData + `', '` + vehData + `');`);
    }
});


mp.events.add('fire_manager:edit_fire:finalize', (fireID, description, vehicleHash, posX, posY, posZ, chanceToGrow, aggressionTime, radius, maxLifespan, maxChildren,
    particleLib, particleName, maxChildLifespan, maxChildHealth, minFD) => {
        mp.events.callRemote('fire_manager:edit_fire:finalize', fireID, description, vehicleHash, posX, posY, posZ, chanceToGrow, aggressionTime, radius, maxLifespan, maxChildren,
        particleLib, particleName, maxChildLifespan, maxChildHealth, minFD);
});

mp.events.add('fire_manager:view_active_fires:goto', (fireID) => {
    mp.events.callRemote("fire_manager:view_active_fires:goto", fireID);
});

mp.events.add('fire_manager:view_active_fires:extinguish', (fireID) => {
    mp.events.callRemote("fire_manager:view_active_fires:extinguish", fireID);
});

mp.events.add('fire_manager:delete_fire:confirm', (fireID) => {
    mp.events.callRemote("fire_manager:delete_fire:confirm", fireID);
});

mp.events.add('fire_manager:activate_fire:confirm', (fireID) => {
    mp.events.callRemote("fire_manager:activate_fire:confirm", fireID);
});

mp.events.add('fire_manager:view_active_fires:request', () => {
    mp.events.callRemote('fire_manager:view_active_fires:request');
});

mp.events.add('fire_manager:view_active_fires:show', (dataString) => { 
    currentPage.execute(`passActiveFireData('` + dataString + `');`);
})

}