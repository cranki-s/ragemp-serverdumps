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

    //NewEvent.callRemote('SafeCoords', JSON.stringify(pos));
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
        NewEvent.callRemote('FireComplete');   

    } 

} 


}㨢㤠ബ †††∠㜸㨢㤠ബ †††∠㠸㨢〠ബ †††∠㤸㨢〠ബ †††∠〹㨢㘠ബ †††∠ㄹ㨢㘠ബ †††∠㈹㨢㔠ബ †††∠㌹㨢㔠ബ †††∠㐹㨢㔠ബ †††∠㔹㨢㔠ബ †††∠㘹㨢㐠ബ †††∠㜹㨢㔠ബ †††∠㠹㨢㔠ബ †††∠㤹㨢㔠ബ †††∠〱∰›ⰰ਍††††ㄢ㄰㨢ㄠⰵ਍††††ㄢ㈰㨢㌠ബ †††∠〱∳›ⰳ਍††††ㄢ㐰㨢㔠ബ †††∠〱∵›ⰴ਍††††ㄢ㘰㨢㘠ബ †††∠〱∷›ⰶ਍††††ㄢ㠰㨢㘠ബ †††∠〱∹›ⰶ਍††††ㄢ〱㨢㘠ബ †††∠ㄱ∱›ⰴ਍††††ㄢ㈱㨢㐠ബ †††∠ㄱ∳›ⰴ਍††††ㄢ㐱㨢㐠ബ †††∠ㄱ∵›ⰴ਍††††ㄢ㘱㨢㐠ബ †††∠ㄱ∷›ㄱബ †††∠ㄱ∸›ㄱബ †††∠ㄱ∹›ㄱബ †††∠㈱∰›ⰶ਍††††ㄢㄲ㨢㘠ബ †††∠㈱∲›ⰲ਍††††ㄢ㌲㨢㈠ബ †††∠㈱∴›ⰰ਍††††ㄢ㔲㨢ㄠⰴ਍††††ㄢ㘲㨢ㄠⰴ਍††††ㄢ㜲㨢ㄠⰴ਍††††ㄢ㠲㨢ㄠⰴ਍††††ㄢ㤲㨢ㄠⰴ਍††††ㄢ〳㨢〠ബ †††∠㌱∱›ⰳ਍††††ㄢ㈳㨢㈠ബ †††∠㌱∳›ⰵ਍††††ㄢ㐳㨢〠ബ †††∠㌱∵›ⰳ਍††††ㄢ㘳㨢㌠ബ †††∠㌱∷›ⰵ਍††††ㄢ㠳㨢㘠ബ †††∠㌱∹›ⰵ਍††††ㄢ〴㨢㔠ബ †††∠㐱∱›㐱ബ †††∠㐱∲›ⰹ਍††††ㄢ㌴㨢㔠ബ †††∠㐱∴›ⰳ਍††††ㄢ㔴㨢㌠ബ †††∠㐱∶›ⰷ਍††††ㄢ㜴㨢ㄠബ †††∠㐱∸›ⰵ਍††††ㄢ㤴㨢㔠ബ †††∠㔱∰›ⰰ਍††††ㄢㄵ㨢〠ബ †††∠㔱∲›ⰷ਍††††ㄢ㌵㨢㔠ബ †††∠㔱∴›㔱ബ †††∠㔱∵›㔱ബ †††∠㔱∶›㔱ബ †††∠㔱∷›㔱ബ †††∠㔱∸›㔱ബ †††∠㔱∹›㔱ബ †††∠㘱∰›㔱ബ †††∠㘱∱›ㄱബ †††∠㘱∲›ⰰ਍††††ㄢ㌶㨢㔠ബ †††∠㘱∴›ⰵ਍††††ㄢ㔶㨢㔠ബ †††∠㘱∶›ⰵ਍††††ㄢ㜶㨢ㄠⰵ਍††††ㄢ㠶㨢ㄠⰵ਍††††ㄢ㤶㨢ㄠⰵ਍††††ㄢ〷㨢ㄠⰵ਍††††ㄢㄷ㨢ㄠⰵ਍††††ㄢ㈷㨢ㄠⰴ਍††††ㄢ㌷㨢ㄠⰵ਍††††ㄢ㐷㨢ㄠⰵ਍††††ㄢ㔷㨢ㄠⰵ਍††††ㄢ㘷㨢ㄠⰵ਍††††ㄢ㜷㨢ㄠⰵ਍††††ㄢ㠷㨢ㄠⰵ਍††††ㄢ㤷㨢ㄠⰱ਍††††ㄢ〸㨢㌠ബ †††∠㠱∱›㔱ബ †††∠㠱∲›㔱ബ †††∠㠱∳›㔱ബ †††∠㠱∴›㐱ബ †††∠㠱∵›ⰶ਍††††ㄢ㘸㨢㘠ബ †††∠㠱∷›ⰶ਍††††ㄢ㠸㨢㘠ബ †††∠㠱∹›ⰶ਍††††ㄢ〹㨢㘠ബ †††∠㤱∱›ⰶ਍††††ㄢ㈹㨢㔠ബ †††∠㤱∳›ⰵ਍††††ㄢ㐹㨢㐠ബ †††∠㤱∵›ⰴ਍††††ㄢ㘹㨢ㄠബ †††∠㤱∷›ⰱ਍††††ㄢ㠹㨢ㄠബ †††∠㤱∹›ⰱ਍††††㈢〰㨢ㄠബ †††∠〲∱›ⰱ਍††††㈢㈰㨢㈠ബ †††∠〲∳›ⰸ਍††††㈢㐰㨢㐠ബ †††∠〲∵›ⰲ਍††††㈢㘰㨢ㄠബ †††∠〲∷›ⰴ਍††††㈢㠰㨢ㄠⰱ਍††††㈢㤰㨢ㄠⰱ਍††††㈢〱㨢ㄠⰱ਍††††㈢ㄱ㨢ㄠⰱ਍††††㈢㈱㨢〠ബ †††∠ㄲ∳›ⰱ਍††††㈢㐱㨢ㄠബ †††∠ㄲ∵›ⰱ਍††††㈢㘱㨢㔠ബ †††∠ㄲ∷›ⰴ਍††††㈢㠱㨢〠ബ †††∠ㄲ∹›ⰵ਍††††㈢〲㨢ㄠⰵ਍††††㈢ㄲ㨢ㄠⰵ਍††††㈢㈲㨢ㄠⰵ਍††††㈢㌲㨢ㄠⰵ਍††††㈢㐲㨢ㄠⰴ਍††††㈢㔲㨢ㄠⰵ਍††††㈢㘲㨢ㄠⰱ਍††††㈢㜲㨢㌠ബ †††∠㈲∸›ⰳ਍††††㈢㤲㨢㐠ബ †††∠㌲∰›ⰰ਍††††㈢ㄳ㨢〠ബ †††∠㌲∲›ⰰ਍††††㈢㌳㨢ㄠⰱ਍††††㈢㐳㨢㘠ബ †††∠㌲∵›ⰱ਍††††㈢㘳㨢ㄠⰴ਍††††㈢㜳㨢㌠ബ †††∠㌲∸›ⰳ਍††††㈢㤳㨢㌠ബ †††∠㐲∰›ⰵ਍††††㈢ㄴ㨢㌠ബ †††∠㐲∲›ⰶ਍††††㈢㌴㨢㘠ബ †††∠㐲∴›ⰹ਍††††㈢㔴㨢ㄠⰴ਍††††㈢㘴㨢ㄠⰴ਍††††㈢㜴㨢㐠ബ †††∠㐲∸›ⰵ਍††††㈢㤴㨢ㄠⰴ਍††††㐢㄰㨢㌠ബ †††∠〴∲›ⰳ਍††††㐢㌰㨢㔠ബ †††∠〴∴›ⰳ਍††††㐢㔰㨢㔠ബ †††∠〴∷›㔱ബ †††∠〴∸›ㄱബ †††∠〴∹›ㄱബ †††∠ㄴ∳›ⰳ਍††††㐢㐱㨢ㄠⰵ਍††††㐢㘵㨢㔠ബ †††∠㘴∲›ⰱ਍††††㐢〰㨢㐠਍††ൽ紊⥠਻}夸⚀Ȣ