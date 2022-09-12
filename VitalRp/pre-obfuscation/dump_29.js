{


let vehicle;
let elevator;
let fence;
let parking;



let syncInterval = null;
function startSyncIntervalForVeh(vehicle) {
    syncInterval = setInterval(() => {
        if (elevator != null && vehicle != null) {
            if (mp.vehicles.exists(vehicle) && vehicle.getAttachedTo() == elevator.handle) {
                mp.events.callRemote('fbSyncPosition', vehicle.remoteId, JSON.stringify(vehicle.position), JSON.stringify(vehicle.getRotation(2)))

            } else {
                clearInterval(syncInterval)
                syncInterval = null
            }
        }
     else {
        clearInterval(syncInterval)
                syncInterval = null
    }
    }, 1000)
}




mp.events.add({
    "StartParking": (veh, elev, fen) => {
        //veh.setCollision(false, true);
        veh.attachTo(elev.handle, -1, 0.0, -0.5, 0.5, 0.0, 0, 0, false, false, false, false, 2, true);
        elevator = elev;
        fence = fen;
        vehicle = veh;
        Fence(fence, true);

    },
    "StartUnParking": (elev, fen) => {
        elevator = elev;
        fence = fen;
        Fence(fence, true);
    },
    "StartAttaching": (veh, elev) => {
        let interval = setInterval(() => {
            if (veh.getAttachedTo() == elev.handle) clearInterval(interval);
            veh.attachTo(elev.handle, -1, 0.0, -0.5, 0.5, 0.0, 0, 180, false, false, false, false, 2, true);
           
        }, 10)
        vehicle = veh;
        elevator = elev;

        startSyncIntervalForVeh(vehicle);

    }
});



function Elevator(obj, up) {
    let pos = obj.position;
    if (up) {
        let zOff = 0.0;
        let interval = setInterval(() => {
            if (zOff > -5.0) {
                zOff = zOff - 0.025;
                obj.setCoordsNoOffset(pos.x, pos.y, pos.z + zOff, false, false, false)
            }
            else {
                clearInterval(interval);
                Park(elevator, true);
            }
        }, 10)
    }
    else {
        let zOff = -5.0;
        let interval = setInterval(() => {
            if (zOff < 0.0) {
                zOff = zOff + 0.025;
                obj.setCoordsNoOffset(pos.x, pos.y, pos.z + zOff, false, false, false)
            }
            else {
                clearInterval(interval);
                Fence(fence, false);
            }
        }, 10)
    }
}

function Park(obj, aftercar) {
    let yOff = 0.0;
    if (aftercar) {

        let interval = setInterval(() => {
            if (yOff < 8.0) {
                yOff = yOff + 0.15;
                let pos = obj.getOffsetFromInWorldCoords(0.0, 0.15, 0.0);
                obj.setCoordsNoOffset(pos.x, pos.y, pos.z, false, false, false);
            }
            else {

                clearInterval(interval);
                setTimeout(function () { Park(obj,false); }, 5000);
            }
        }, 30)
    }
    else {
        let interval = setInterval(() => {
            if (yOff > -8.0) {
                yOff = yOff - 0.15
                let pos = obj.getOffsetFromInWorldCoords(0.0, -0.15, 0.0);
                obj.setCoordsNoOffset(pos.x, pos.y, pos.z, false, false, false);
            }
            else {
                clearInterval(interval);
                Elevator(elevator, false);
            }
        }, 30)
    }
}

function Fence(obj, up) {
    let pos = obj.position;
    if (up) {
        zOff = 0.0;
        let interval = setInterval(() => {
            if (zOff < 2.63281) {
                zOff = zOff + 0.025;
                obj.setCoordsNoOffset(pos.x, pos.y, pos.z + zOff, false, false, false);
            }
            else {
                clearInterval(interval);
                Elevator(elevator, true);
            }
        }, 10)
    }
    else {
        zOff = 2.63281;
        let interval = setInterval(() => {
            if (zOff > 0.0) {
                zOff = zOff - 0.025;
                obj.setCoordsNoOffset(pos.x, pos.y, pos.z + zOff, false, false, false);
            }
            else {
                clearInterval(interval);
                if (mp.vehicles.exists(vehicle) && vehicle.getAttachedTo() == elevator.handle) {
                    vehicle.detach(true, true);
                    vehicle = null;
                    elevator = null;
                    fence = null;
                }
            }
        }, 10)
    }
}
}