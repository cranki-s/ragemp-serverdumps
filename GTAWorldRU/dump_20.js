{
﻿// An array to keep track of all our individual fires,
// belonging to the primary fire.
var fireEntities = [];

// Each instance of the FireUnit class is a fire with all of its children
// We can have many fires for each primary/main fire started.
class FireUnit {
    constructor(mainID, fireID, fireEntityId, position)
    {
        this.mainID = mainID; // Main ID of the fire belonging to the parent/class
        this.fireID = fireID; // fire ID of this specific fire
        this.fireEntityId = fireEntityId; // Local ID that differs from client to client
        this.position = position; // The position where this specific fire was started
    }
}

// Start a fire and store the instance of the new FireUnit in our Array
mp.events.add("StartFire", (mainID, posX, posY, posZ, maxChilderen, gasPowerd, fireID) => {
    let fireEntityId = mp.game.fire.startScriptFire(posX, posY, posZ, maxChilderen, gasPowerd);

    var fireUnit = new FireUnit(Number(mainID), Number(fireID), fireEntityId, new mp.Vector3(posX, posY, posZ));

    fireEntities.push(fireUnit);
});

// Every second we check if any of the fires have been extinguished
setInterval(() =>
{
    if (fireEntities === null || fireEntities === undefined)
        return;
    
    if (fireEntities.length <= 0)
        return;

    fireEntities.forEach(function (fireUnit)
    {
        if (fireUnit !== null && fireUnit !== undefined)
        {
            // Check if this one fire is extinguished or not, if so tell the server so all players can have it deleted
            if (mp.game.fire.getNumberOfFiresInRange(fireUnit.position.x, fireUnit.position.y, fireUnit.position.z, 2) < 1)
            {
                mp.events.callRemote("fireHasBeenPutOut", Number(fireUnit.mainID), Number(fireUnit.fireID));
                return;
            }
        }
    });
}, 1000);

mp.events.add("Clear_Fire_Data", () => {
    fireEntities = null;
    fireEntities = [];
    mp.events.callRemote("clear_data_done");
});

mp.events.add('StopFireByID', (id) => {
    if (fireEntities === null || fireEntities === undefined)
        return;

    if (fireEntities.length <= 0)
        return;

    for (var i = fireEntities.length - 1; i > -1; i--) {
        if (fireEntities[i] !== null && fireEntities[i] !== undefined) {
            if (fireEntities[i].mainID === id) {
                mp.game.fire.removeScriptFire(fireEntities[i].fireEntityId);

                var index = fireEntities.indexOf(fireEntities[i]);
                if (index > -1) {
                    fireEntities.splice(index, 1);
                }
            }
        }
    }
});

mp.events.add('StopSingleFireByID', async (mainID, fireID) => {
    if (fireEntities === null || fireEntities === undefined)
        return;

    if (fireEntities.length <= 0)
        return;

    for (i = 0; i < fireEntities.length; i++)
    {
        if (fireEntities[i] !== null && fireEntities[i] !== undefined)
        {
            if (fireEntities[i].mainID === mainID && fireEntities[i].fireID === fireID)
            {
                mp.game.fire.removeScriptFire(fireEntities[i].fireEntityId);

                var index = fireEntities.indexOf(fireEntities[i]);
                if (index > -1) {
                    fireEntities.splice(index, 1);
                }
            }
        }
    }
});

/*
 *     if (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_weap_bombs")) {
        mp.game.streaming.requestNamedPtfxAsset("scr_weap_bombs");
       while (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_weap_bombs")) await mp.game.waitAsync(0);
    }

    var fxID = 0;
    if (Math.random() < 0.10) {
        mp.game.graphics.setPtfxAssetNextCall("scr_weap_bombs");
        var fxID = mp.game.graphics.startParticleFxLoopedAtCoord("scr_bomb_gas", posX, posY, posZ + 1, 0, 0, 0, 1, false, false, false, false);
    }
    */
}셖ï