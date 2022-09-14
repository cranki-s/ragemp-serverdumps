{
/**
 * Clientside JS file for handling of the fire hose used in fire control. This includes the clientside marker used to help gauge hit detection.
 */

var hasHose = false;
var hoseActive = false;

var DefaultForwardAmount = 15;

// Toggle the hose on/off.
mp.keys.bind(0x4E, true, () => {
    if(mp.players.local.chatOpen != null && mp.players.local.chatOpen == true) return;

    if(hasHose) { 
        mp.events.callRemote("fire:hose:try_toggle_flow"); 
        hoseActive = !hoseActive;
        mp.players.local.hoseZAdjust = 0;
        DefaultForwardAmount = 15;

        if(hoseActive)
        {
            mp.events.call('fire:hose:targeting_marker:create');
        }
        else
        {
            mp.players.local.aimMarker.destroy();
        }
        
    }
})

mp.events.add('fire:hose:enable_on_client', () => {
    hasHose = true;
});

mp.events.add('fire:hose:disable_on_client', () => {
    hasHose = false;
});

// Creates the fire hose stream particle FX.
mp.events.add('fire:hose:start', async (hose) => {
    if(hose != null)
    {
        if (!mp.game.streaming.hasNamedPtfxAssetLoaded('core')) {
            mp.game.streaming.requestNamedPtfxAsset('core');
            for (let i = 0;  !mp.game.streaming.hasNamedPtfxAssetLoaded('core') && i < 1500; i++) 
            {
                await mp.game.waitAsync(1); // Because it's on the client, delay 1ms. Client inherently asynchronous?
            }
        }

        mp.game.graphics.setPtfxAssetNextCall('core');
        var hoseFX = mp.game.graphics.startParticleFxLoopedOnEntity('water_cannon_jet', hose.handle, 0, 0, 0, 0.1, 0.0, 0.0, 1.0, false, false, false);
        hose.stream = hoseFX;
    }
});

// Stops the hose stream particle FX.
mp.events.add('fire:hose:stop', (hose) => {
    if(hose != null)
    {
        if(hose.stream != null)
        {
            mp.game.graphics.stopParticleFxLooped(hose.stream, false);
            hose.stream = null;
        }
    }
});

// Creates the targeting marker for the local player to help show where the water is landing.
mp.events.add('fire:hose:targeting_marker:create', () => {
    // Now create marker where player is aiming.
    var playerFVector = mp.players.local.getForwardVector();

    playerFVector = new mp.Vector3(playerFVector.x * DefaultForwardAmount, playerFVector.y * DefaultForwardAmount, playerFVector.z * DefaultForwardAmount);
    var playerCurrentVector = mp.players.local.position;

    var newPosVector = new mp.Vector3(playerCurrentVector.x + playerFVector.x, playerCurrentVector.y + playerFVector.y, playerCurrentVector.z + playerFVector.z + mp.players.local.hoseZAdjust);

    var aimMarker = mp.markers.new(28, newPosVector, 0.5,
    {
        direction: new mp.Vector3(mp.players.local.position.X, mp.players.local.position.Y, mp.players.local.position.Z),
        rotation: new mp.Vector3(0, 0, 0),
        color: [255, 0, 0, 100],
        visible: true,
        dimension: mp.players.local.dimension
    });

    mp.players.local.aimMarker = aimMarker;
    mp.players.local.hoseZAdjust = 0;
});

var HOSE_ADJUSTMENT_AMT = 0.15;

// Allow player to change where the fire hits with PageUp / PageDown.
mp.keys.bind(0x21, true, function() {
    if(!hoseActive) return;

    if(mp.players.local.hoseZAdjust == null)
    {
        mp.players.local.hoseZAdjust = 0;
    }

    mp.players.local.hoseZAdjust += HOSE_ADJUSTMENT_AMT;
});

mp.keys.bind(0x22, true, function() {

    if(!hoseActive) return;

    if(mp.players.local.hoseZAdjust == null)
    {
        mp.players.local.hoseZAdjust = 0;
    }

    mp.players.local.hoseZAdjust -= HOSE_ADJUSTMENT_AMT;
});

// Allow player to change position of hose with - and +
mp.keys.bind(0xBD, true, function() { // Back.
    if(!hoseActive) return;

    if(DefaultForwardAmount < 5)
    {
        DefaultForwardAmount = 5;
        return;
    }

    DefaultForwardAmount -= 1;
});

mp.keys.bind(0xBB, true, function() { // Forwards.
    if(!hoseActive) return;

    if(DefaultForwardAmount > 35)
    {
        DefaultForwardAmount = 35;
        return;
    }

    DefaultForwardAmount += 1;
});


mp.events.add('render', () => {
    if(hoseActive)
    {
        var playerFVector = mp.players.local.getForwardVector();
        playerFVector = new mp.Vector3(playerFVector.x * DefaultForwardAmount, playerFVector.y * DefaultForwardAmount, playerFVector.z * DefaultForwardAmount);
        var playerCurrentVector = mp.players.local.position;

        var newPosVector = new mp.Vector3(playerCurrentVector.x + playerFVector.x, playerCurrentVector.y + playerFVector.y, playerCurrentVector.z + playerFVector.z + mp.players.local.hoseZAdjust);
        mp.players.local.aimMarker.position = newPosVector;
        //mp.game.graphics.drawLine(playerCurrentVector.x, playerCurrentVector.y, playerCurrentVector.z, newPosVector.x, newPosVector.y, newPosVector.z + mp.players.local.hoseZAdjust, 255, 0, 0, 200);
    }
});

setInterval(function() {
    if(hoseActive)
    {
        var playerFVector = mp.players.local.getForwardVector();
        playerFVector = new mp.Vector3(playerFVector.x * DefaultForwardAmount, playerFVector.y * DefaultForwardAmount, playerFVector.z * DefaultForwardAmount);
        var playerCurrentVector = mp.players.local.position;

        var newPosVector = new mp.Vector3(playerCurrentVector.x + playerFVector.x, playerCurrentVector.y + playerFVector.y, playerCurrentVector.z + playerFVector.z);

        mp.events.callRemote("OnPlayerUpdateHosePosition", newPosVector.x, newPosVector.y, newPosVector.z);
    }
}, 2500);


}