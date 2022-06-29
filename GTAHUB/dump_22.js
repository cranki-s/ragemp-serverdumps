{
require('vehicleutil.js');

const player = mp.players.local;
const hookKey = 0x5A; // (Z)


mp.events.add({
    "entityStreamIn": async (entity) => {
        // check if entity is trailer
        if (entity.type === 'vehicle' && entity.getClass() === 11) {
            entity.setInvincible(true);
        }
    },
    "entityStreamOut": async (entity) => {
        if (entity.type === 'vehicle') {
            if (isTruck(entity.model)) entity.detachFromTrailer(); // detach trailers when truck is streamed out
            else if (isTowTruck(entity.model)) {
                let vehAttachedHandle = getVehicleAttached(entity);
                let vehAttached = mp.vehicles.atHandle(vehAttachedHandle);

                if (mp.vehicles.exists(vehAttached)) {
                    vehAttached.detachFromAnyTowTruck();
                }
            }
        }
    }
});

mp.events.addDataHandler("attachedTo", (trailer, value, oldValue) => {
    if (value !== oldValue && trailer.handle) {
        if (value === -1) {
            let veh = mp.vehicles.atRemoteId(oldValue)
            if (mp.vehicles.exists(veh) && veh.handle) {
                veh.detachFromTrailer();
            }
        } else {
            let veh = mp.vehicles.atRemoteId(value)
            if (mp.vehicles.exists(veh) && veh.handle) {
                veh.attachToTrailer(trailer.handle, 0)
            }
        }
    }
});

mp.keys.bind(hookKey, true, function() {
    let veh = player.vehicle
    if (veh && veh.getPedInSeat(-1) === player.handle) {
        let targetVeh = getTargetVehicle(veh)
        if (isTowTruck(veh.model) && getVehicleAttached(veh) === 0) {
            if (targetVeh) mp.events.originalCallRemote("entity:set_control", targetVeh, player)
        } else if (isTruck(veh.model) && !veh.isAttachedToTrailer()) {
            if (targetVeh) {
                mp.events.originalCallRemote("entity:set_control", targetVeh, player)
                veh.attachToTrailer(targetVeh.handle, 10.0)
            }
        }
    }
});

mp.rpc("vehicles:attach_trailer", (vehicleId, trailerId) => {
    let vehicle = mp.vehicles.atRemoteId(vehicleId);
    let attachedTrailer = mp.vehicles.atRemoteId(trailerId);
    if (!mp.vehicles.exists(vehicle)) return;
    let isTowtruck = isTowTruck(vehicle.model);

    // on attach
    if (mp.vehicles.exists(attachedTrailer)) {
        mp.events.callRemote("trailer:on_attach", vehicle.remoteId, attachedTrailer.remoteId);
        mp.events.originalCallRemote("entity:set_control", attachedTrailer, player)
        if (!isTowtruck) {
            mp.events.originalCallRemote("vehicles:attached_to", attachedTrailer.remoteId, vehicle.remoteId);
            if (!vehicle.isAttachedToTrailer()) {
                vehicle.attachToTrailer(attachedTrailer.handle, 10.0);
                attachedTrailer.setFixed();
            }
        } else {
            if (getVehicleAttached(vehicle) === 0) {
                vehicle.attachToTowTruck(attachedTrailer.handle, true, 0, 0, 0);
            }
        }
    } else {
        // on detach
        mp.events.callRemote("trailer:on_detach", vehicle.remoteId);
        let oldTrailerAttached = vehicle.actualTrailerAttached || 0;
        let oldAttached = mp.vehicles.atHandle(oldTrailerAttached);
        if (mp.vehicles.exists(oldAttached)) {

            if (!isTowtruck) {
                mp.events.originalCallRemote("vehicles:attached_to", oldAttached.remoteId, -1);
                vehicle.detachFromTrailer();
            } else {
                oldAttached.detachFromAnyTowTruck();
            }
        }
    }
    vehicle.actualTrailerAttached = attachedTrailer && attachedTrailer.handle ? attachedTrailer.handle : 0;
});

// Trailer events
mp.setInterval(() => {
    let v = player.vehicle
    if (v && v.getPedInSeat(-1) === player.handle) {
        let isTowtruck = isTowTruck(v.model);
        let oldTrailerAttached = v.actualTrailerAttached || 0;
        let actualTrailerAttached = isTowtruck ? getVehicleAttached(v) : getTrailerAttached(v)

        // if trailer attached change
        if (oldTrailerAttached !== actualTrailerAttached) {
            // if new trailer attached is not null
            if (actualTrailerAttached !== 0) {
                let attachedTrailer = mp.vehicles.atHandle(actualTrailerAttached);
                mp.events.call("vehicles:attach_trailer", v.remoteId, attachedTrailer.remoteId);
            } else {
                mp.events.call("vehicles:attach_trailer", v.remoteId, -1);
            }
        }
    }
}, 1000)

mp.events.add("render", () => {
    if (mp.players.local.vehicle && isTruck(mp.players.local.vehicle.model)) {
        let speed = player.vehicle.getSpeed();
        if (speed > 10) {
            // disable remove trailer control
            mp.game.controls.disableControlAction(0, 74, true);
        }
    }
});

/** Returns the vehicle handle attached in the given [vehicle] (only for towtrucks) */
function getVehicleAttached(vehicle) {
    return mp.game.invoke("0xEFEA18DCF10F8F75", vehicle.handle); // GET_ENTITY_ATTACHED_TO_TOW_TRUCK(Vehicle towTruck);
}

/** Returns the trailer handle attached from the [vehicle] */
function getTrailerAttached(vehicle) {
    let attachedVehicle = [0];
    mp.game.invoke("0x1CDD6BADC297830D", vehicle.handle, attachedVehicle); // GET_VEHICLE_TRAILER_VEHICLE(Vehicle vehicle, Vehicle* trailer);
    return attachedVehicle[0];
}

function getTargetVehicle(towTruck) {
    let towTruckDimension = mp.game.gameplay.getModelDimensions(towTruck.model);
    let positionFrom = towTruck.getOffsetFromInWorldCoords(0, towTruckDimension.min.y-0.5, 0);
    let positionTo = towTruck.getOffsetFromInWorldCoords(0, towTruckDimension.min.y-3, 0);

    let raycast = mp.raycasting.testCapsule(positionFrom, positionTo, 0.5, null, 2)
    if (raycast && raycast.entity && raycast.entity.type === 'vehicle') return raycast.entity
    else return null
}
}