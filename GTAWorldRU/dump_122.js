{
﻿mp.events.add("DisableBloodCollision", (object) => {
    DisableBloodCollision(object);
});

function DisableBloodCollision(object) {
    if (object !== null && mp.objects.exists(object))
    {
        const isBlood = object.getVariable('isBlood');

        if(isBlood === true)
        {
            object.setNoCollision(mp.players.local.handle, true);
        }
    } 
}

var lastObjectsUpdate = 0;
const localPlayer = mp.players.local;
var bloodSplatters = null;

function getDistanceBetweenCoords(first, second){
    return mp.game.gameplay.getDistanceBetweenCoords(
        first.x,
        first.y,
        first.z,
        second.x,
        second.y,
        second.z, true);
}

mp.events.add('render', () =>
{
    var TimeUpdate = new Date().getTime();
    if(TimeUpdate > lastObjectsUpdate+2000)
    {
        if(bloodSplatters !== null)
        {
            bloodSplatters.forEach(element => {
                const dist = getDistanceBetweenCoords(localPlayer.position, new mp.Vector3(element.X, element.Y, element.Z));
                if (dist < 50 && element.Dimension == localPlayer.dimension)
                { 
                    const getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(element.X, element.Y, element.Z, parseFloat(0), false);
		   
                    try {mp.game.graphics.addDecal(element.Type, element.X, element.Y, getGroundZ, 0, 0, -1, 0, 1, 0, element.Size, element.Size, 255, 0.1, 0.1, element.Opacity/100, 1.0, false, false, false);
			} catch (error) {}                
}
            
            });
        }
    }
});

mp.events.add('Blood::GetBloodSplatters', (bloods) =>
{
    try {
        bloodSplatters = JSON.parse(bloods);
    } catch (error) {
        bloodSplatters = [];
        mp.console.logError("Cannot write blood splatters to game, too large", false, true);
    }
});

mp.events.add('Blood::AddBloodSplatter', (blood) =>
{
    if(bloodSplatters === null)
    {
        bloodSplatters = new Array();
    }
    var bloodId = JSON.parse(blood).ID;
    bloodSplatters.push(JSON.parse(blood));
});

mp.events.add('Blood::RemoveBloodSplatter', (bloodId) =>
{
    if(bloodSplatters === null)
    {
        bloodSplatters = new Array();
    }
    for( var i = 0; i < bloodSplatters.length; i++)
    { 
        if ( bloodSplatters[i].ID === bloodId)
        { 
            bloodSplatters.splice(i, 1); 
        }
    }
});

// Debugging function
mp.events.add('SpawnBloodSplatter', (type, x, y, z, width, height, opacity) =>
{
    const getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(x, y, z, parseFloat(0), false);
    mp.game.graphics.addDecal(type, x, y, getGroundZ, 0, 0, -1, 0, 1, 0, width, height, 255, 0.1, 0.1, opacity, 150.0, false, false, false);
});
}