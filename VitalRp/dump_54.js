{
var allDoors = [];



var mloDoors = new Map();
mloDoors.set('MZ', { pos: new mp.Vector3(-451.56070000, -317.66880000, 35.79000000), doorsIds: [] });

mloDoors.set('CMC', { pos: new mp.Vector3(314.90656, -1406.0941, 32.659286), doorsIds: [] });

mloDoors.set('DFS', { pos: new mp.Vector3(215.79457, -1651.4031, 29.93452), doorsIds: [] });

mloDoors.set('SFS', { pos: new mp.Vector3(1688.62, 3585.3264, 35.730293), doorsIds: [] });

mloDoors.set('MRPD', { pos: new mp.Vector3(476.6157, -1008.8754, 26.480055), doorsIds: [] });

mloDoors.set('SDSS', { pos: new mp.Vector3(1850.3907, 3691.0022, 38.387604), doorsIds: [] });

mloDoors.set('SDPB', { pos: new mp.Vector3(-441.91455, 6006.9507, 31.716509), doorsIds: [] });

mloDoors.set('SDGS', { pos: new mp.Vector3(1653.1396, 4803.4087, 42.264088), doorsIds: [] });


mloDoors.set('Cartel', { pos: new mp.Vector3(344.0325, -2724.106, 1.073013), doorsIds: [] });


mp.events.add({
    "loadDoors": (sdoors) => {
        doors = JSON.parse(sdoors);
        doors.forEach((door) => {
            allDoors[door.Id] = door;
            asignDoorToMlo(door);
        })
    },
    "updateDoorsStatus": (id, status) => {
        if (allDoors[id]) {
            allDoors[id].Locked = status;
            if (allDoors[id].Pair !== -1)
                allDoors[allDoors[id].Pair].Locked = status;
        }
    }
});


function asignDoorToMlo(door) {
    
    if (mloDoors.has(door.Mlo)) {
        mloDoors.get(door.Mlo).doorsIds.push(door.Id)
    }
}

mp.events.add('initdoorlabels', (sdoors) => {
    doors = JSON.parse(sdoors);
    doors.forEach((door) => {
        if(door.Id < 9999)
        mp.labels.new(`${door.Id} ~n~ ${door.Mlo} ~n~ ${door.Description}`, door.Position,
            {
                los: false,
                font: 6,
                drawDistance: 6,
                color: [255, 255, 255]

            });
    })
});


setInterval(function () {
    
    for (var mlo of mloDoors.values()) {
        
        let interior = mp.game.interior.getInteriorAtCoords(mlo.pos.x, mlo.pos.y, mlo.pos.z);
        
           if (mp.game.interior.isInteriorReady(interior)) {
               for (let id of mlo.doorsIds) {
                   //let door = mp.game.object.getClosestObjectOfType(allDoors[id].Position.x, allDoors[id].Position.y, allDoors[id].Position.z, 1.5, Number(allDoors[id].Hash), false, false, false);
                   let door = mp.game.object.doesObjectOfTypeExistAtCoords(allDoors[id].Position.x, allDoors[id].Position.y, allDoors[id].Position.z, 1.5, Number(allDoors[id].Hash), false);

                if (door) {
                    
                    let doorState = mp.game.object.getStateOfClosestDoorOfType(Number(allDoors[id].Hash), allDoors[id].Position.x, allDoors[id].Position.y, allDoors[id].Position.z);
                    if (allDoors[id].Locked !== doorState) {
                        mp.game.object.setStateOfClosestDoorOfType(Number(allDoors[id].Hash), allDoors[id].Position.x, allDoors[id].Position.y, allDoors[id].Position.z, allDoors[id].Locked, 0, !1)
                    }
                }
            }
        }
    }
}, 1000);

mp.keys.bind(76, true, () => {
    if (global.chatopened) return;
    if (global.uiGlobal_Browsers !== undefined) return;
    if (mp.players.local.getVariable("Injured") !== 0) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    let closestDoor = null;
    let minimalDistance = 2;
    for (var mlo of mloDoors.values()) {

        let interior = mp.game.interior.getInteriorAtCoords(mlo.pos.x, mlo.pos.y, mlo.pos.z);

        if (mp.game.interior.isInteriorReady(interior)) {
            for (let id of mlo.doorsIds) {
                let dist = mp.game.system.vdist(allDoors[id].Position.x, allDoors[id].Position.y, allDoors[id].Position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z);

                if (dist < minimalDistance) {
                    closestDoor = allDoors[id];
                    minimalDistance = dist;
                }
            }
        }
    }
    if (closestDoor) mp.events.callRemote("changeDoorStatus", closestDoor.Id, !closestDoor.Locked)
   
});


}