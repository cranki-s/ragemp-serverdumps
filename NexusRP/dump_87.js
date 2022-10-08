{
﻿let xPos = undefined;
let yPos = undefined;
let zPos = undefined;
let updatetimer = undefined;
let firesAlive = undefined;
var pos = undefined;
let FireLocationBlip = undefined;
var FireEntityIdArray = [];

// Start a fire
mp.events.add('StartFire', (posX, posY, posZ,maxChilderen,gasPowerd) => {

    let fireId = mp.game.fire.startScriptFire(posX, posY, posZ, maxChilderen, gasPowerd);

    FireEntityIdArray.push(JSON.stringify(fireId));
   // mp.gui.chat.push(JSON.stringify(fireId));
});

// Start the timer to check how many fires are still alive
mp.events.add('FiresAliveTimer', (posX, posY, posZ) => {

    xPos = posX;
    yPos = posY;
    zPos = posZ;
    firesAlive = mp.game.fire.getNumberOfFiresInRange(xPos, yPos, zPos, 25);
    updatetimer = setInterval(myTimer, 1000);

});


// Create a blip on the map at position
mp.events.add('BlipFireLocation', (x, y, z) => {
   
        FireLocationBlip = mp.game.ui.addBlipForCoord(x, y, z);
    
});
// Remove the blip 
mp.events.add('RemoveBlipFireLocation', () => {
        mp.game.ui.removeBlip(FireLocationBlip);        
});

// You need to call this even when the fire is gone
// I think even when the fire is visual gone the entity still exist
// If you dont call "mp.game.fire.removeScriptFire". At some point the fire will not be visible anymore, untill you restart the game.
mp.events.add('StopFireById', () => {

    if (FireEntityIdArray.length !== 0) {

        var arrayLength = FireEntityIdArray.length;
        for (var i = 0; i < arrayLength; i++) {
            mp.game.fire.removeScriptFire(Number(FireEntityIdArray[i]));
           // mp.gui.chat.push(FireEntityIdArray[i]);
        }
        // clear the fire entity array
        FireEntityIdArray = [];
        mp.events.call('RemoveBlipFireLocation');

        xPos = undefined;
        yPos = undefined;
        zPos = undefined;
        firesAlive = undefined;
        pos = undefined;
        FireLocationBlip = undefined;
    }
});

// input some coordinates and make them reachable for the player
mp.events.add('CheckIfReachable', (main, posX, posY, posZ, maxChilderen, gasPowerd) => {

    pos = mp.game.pathfind.getSafeCoordForPed(posX, posY, posZ, false, main, 0);

    var myObj, x,y,z;
    myObj = pos;
    x = pos.x;
    y = pos.y;
    z = pos.z;
 
    mp.events.call('StartFire', x, y, z, maxChilderen, gasPowerd);

    //NexusEvent.callRemote('SafeCoords', JSON.stringify(pos));
    // mp.gui.chat.push(JSON.stringify(pos));

});


// Check how many fire are alive
function myTimer() {

    // check how many fires are alive
    firesAlive = mp.game.fire.getNumberOfFiresInRange(xPos, yPos, zPos, 25);

    // Show how many fires are alive
    mp.gui.chat.push("Fires Alive:" + firesAlive);

    // if no more fire alive
    if (firesAlive < 1) {
        // Set the timer off
        updatetimer = clearInterval(0);   
        
        // Tell the server that the fire is out
        NexusEvent.callRemote('FireComplete');   

    } 

} 


}׌v