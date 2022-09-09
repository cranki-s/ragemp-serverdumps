{
/** Joebill adapter for actors/peds */
require("pools.js");

let playerActors = {};
let lastAimingPedId = -1;

mp.peds.atJoebillId = function(id) {
    return playerActors[id];
}

mp.rpc("pa:create", (id, model, posJson, heading) => {
    if (playerActors[id]) playerActors[id].destroy()
    if (model === 0) model = mp.game.joaat('u_m_y_abner') // fallback
    let actor = mp.peds.new(model, JSON.parse(posJson), heading, -1);

    actor.joebillId = id;
    actor.setCanBeDamaged(true);
    actor.setProofs(false, false, false, false, false, false, false, false);
    actor.setHealth(999999999); // can detect shots but can't die
    playerActors[id] = actor;
});


mp.rpc("pa:set_clothes", (id, index, drawable, texture, palette) => {
    let actor = playerActors[id];
    if (!actor) return;

    if (!actor.handle) {
        // try in 750ms if actor is not streamed
        setTimeout(() => {
            if (!actor.handle) return;
            actor.setComponentVariation(index, drawable, texture, palette);
        }, 750);
        return;
    }
    actor.setComponentVariation(index, drawable, texture, palette);
});

mp.rpc("pa:set_props", (id, index, drawable, texture) => {
    let actor = playerActors[id];
    if (!actor) return;

    if (!actor.handle) {
        setTimeout(() => {
            if (!actor.handle) return;
            actor.setPropIndex(index, drawable, texture, true);
        }, 750);
        return;
    }
    actor.setPropIndex(index, drawable, texture, true);
});

mp.rpc("pa:look_at", (id, entityType, entityId, duration) => {
    let actor = playerActors[id];
    if (!actor) return;

    if (entityType === -1) {
        actor.taskClearLookAt();
    } else {
        let entity = getEntityForKindAndId(entityType, entityId);
        if (entity) {
            actor.taskLookAt(entity.handle, duration, 2048, 3);
        } else {
            actor.taskClearLookAt();
        }
    }
});

// this timer re-runs the taskEnterVehicle for actors that got stuck.
mp.setInterval(() => {
    let now = Date.now();

    mp.peds.forEach(p => {
        // re-run enter vehicle task, give up after 15000ms
        if (p._isInVehicleId && (now - p._isInVehicleBegin) < 15000) {
            let targetVeh = mp.vehicles.atRemoteId(p._isInVehicleId);
            if (targetVeh &&
                targetVeh.handle &&
                !p._isInVehicleImmediate &&
                !p.getVehicleIsIn(false)
            ) {
                p.taskEnterVehicle(targetVeh.handle, 8000, p._isInVehicleSeat - 1, 1, 1, 0);
            } else {
                delete p._isInVehicleBegin;
            }
        }
    });
}, 1500);

mp.rpc("pa:put_in_vehicle", (id, vehicleId, vehicleSeat, immediate) => {
    let actor = playerActors[id];
    let vehicle = mp.vehicles.atRemoteId(vehicleId);
    if (!actor || !vehicle) {
        return;
    }
    if (!vehicle.handle || !actor.handle) {
        // if actor or vehicle are not loaded yet,
        // must sync as soon as they stream.
        actor._isInVehicleId = vehicleId;
        actor._isInVehicleSeat = vehicleSeat;
        return;
    }

    actor._isInVehicleId = vehicleId;
    actor._isInVehicleSeat = vehicleSeat;
    actor._isInVehicleBegin = Date.now();
    actor._isInVehicleImmediate = immediate;
    actor.freezePosition(false); // unfreeze, as rage freezes actors.
    let mode = immediate ? 16 : 1;
    actor.taskEnterVehicle(vehicle.handle, immediate ? 1 : 8000, vehicleSeat - 1, 1, mode, 0);

});

mp.rpc("pa:go_to", (id, position, angle) => {
    let actor = playerActors[id];
    if (!actor || !actor.handle) return;

    actor.taskGoStraightToCoord(
        position.x, position.y, position.z,
        1.0, 15000, angle, 2.0);
});

mp.rpc("pa:remove_from_vehicle", (id, immediate) => {
    let actor = playerActors[id];
    if (!actor || !actor.handle) return;

    actor.taskLeaveAnyVehicle(0, 0);
    actor.shouldLeaveVehicle = true;
    delete actor._isInVehicleSeat;
    delete actor._isInVehicleId;
    delete actor._isInVehicleBegin;
    delete actor._isInVehicleImmediate;

    /*actor.taskGoStraightToCoord(
        destinationPosition.x, destinationPosition.y, destinationPosition.z,
        1.0, timeout, actor.getHeading(), 2.0);*/
});

mp.rpc("pa:destroy", (id) => {
    if (playerActors[id]) playerActors[id].destroy()
    playerActors[id] = null;
});

mp.rpc("pa:set_pos", (id, posJson) => {
    if (playerActors[id]) {
        playerActors[id].position = JSON.parse(posJson);
    }
});

mp.rpc("pa:set_heading", (id, heading) => {
    if (playerActors[id]) {
        playerActors[id].setHeading(heading);
    }
});

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === 'ped') {
        // apply actor anim, if any
        if (entity.anim) {
            let anim = entity.anim;
            mp.events.call("pa:set_anim", entity.joebillId, anim.lib, anim.name, anim.speed, anim.flags, anim.time);
        }

        // check if the actor is inside the vehicle.
        if (entity._isInVehicleId) {
            let v = mp.vehicles.atRemoteId(entity._isInVehicleId);
            if (v && v.handle) {
                entity.taskEnterVehicle(v.handle, 1, entity._isInVehicleSeat - 1, 1, 1, 0);
            }
        }
    } else if (entity.type === 'vehicle') {
        // check if any actor is inside this vehicle, if that's the case put into the vehicle.
        let id = entity.remoteId;
        mp.peds.forEach(ped => {
            if (ped._isInVehicleId === id) {
                ped.taskEnterVehicle(entity.handle, 1, ped._isInVehicleSeat - 1, 1, 1, 0);
            }
        })
    }
});

mp.rpc("pa:set_anim", (id, lib, name, speed, flags, time) => {
    let actor = playerActors[id];
    if (!actor) return;

    let isScenario = lib.toLowerCase() === 'scenario';
    if (!isScenario && !mp.game.streaming.doesAnimDictExist(lib)) {
        return;
    }

    if (!isScenario && !mp.game.streaming.hasAnimDictLoaded(lib)) {
        mp.game.streaming.requestAnimDict(lib);
        setTimeout(() => {
            mp.events.call("pa:set_anim", id, lib, name, speed, flags, time);
        }, 100);
        return;
    }

    // save anim to apply on entity stream
    actor.anim = {lib: lib, name: name, speed: speed, flags: flags, time: time};
    if (isScenario) {
        actor.taskStartScenarioInPlace(name, 0, false);
    } else {
        actor.taskPlayAnim(lib, name, speed*2, speed*2, -1, flags, 0.0, false, false, false);
    }

    if (time !== 0) {
        actor.clearTaskTime = new Date().getTime() + time - 100;
        setTimeout(() => {
            let p2 = playerActors[id];
            if (!p2 || !p2.clearTaskTime) return;
            if (new Date().getTime() >= p2.clearTaskTime) {
               p2.clearTasks();
            }
        }, time);
    }
});

mp.rpc("pa:stop_animation", (id, immediate) => {
    if (playerActors[id]) {
        if (immediate) {
            playerActors[id].clearTasksImmediately();
        } else {
            playerActors[id].clearTasks();
        }

        delete playerActors[id].anim;
    }
});

// block controls when actor is going into/out of the vehicle.

// aiming/shoting detection timer
mp.setInterval(() => {
    // detect aiming
    let ped = null;
    mp.peds.forEachInStreamRange(p => {
        if (mp.peds.exists(p) && p.handle && mp.game.player.isFreeAimingAtEntity(p.handle)) {
            ped = p;
        }
    });

    let pedId = -1;
    if (ped != null) pedId = ped.id;
    if (pedId !== lastAimingPedId) {
        lastAimingPedId = pedId;
        mp.events.callRemote("pa:on_aim", pedId);
    }

    // detect shots
    mp.peds.forEachInStreamRange(p => {
        if (mp.peds.exists(p) && p.handle && p.hasBeenDamagedBy(mp.players.local.handle, true)) {
            let bone = p.getLastDamageBone(0);
            if (bone) {
                p.clearLastDamage();
                p.clearLastDamageBone();
                mp.events.callRemote("pa:on_shot", p.id, bone);
            }
        }
    });

    // detect ped enter/exit vehicle event
    detectPedEnterExitVehicleEvent();
}, 50);

function detectPedEnterExitVehicleEvent() {
    mp.peds.forEach(actor => {
        if (actor.handle) {
            let currentVehicleHandle = actor.getVehicleIsIn(false);
            if (!currentVehicleHandle && actor.lastVehicleHandle) {
                actor.lastVehicleHandle = null;
                if (actor.shouldLeaveVehicle) {
                    mp.events.callRemote("pa:on_exit_vehicle", actor.joebillId);
                    actor.shouldLeaveVehicle = null;
                }
            } else if (currentVehicleHandle && !actor.lastVehicleHandle) {
                actor.lastVehicleHandle = currentVehicleHandle;
                let v = mp.vehicles.atHandle(currentVehicleHandle);
                if (v) {
                    for (let i = -1; i < 20; i++) {
                        if (v.getPedInSeat(i) === actor.handle) {
                            mp.events.callRemote("pa:on_enter_vehicle", actor.joebillId, v.remoteId, i + 1);
                            return;
                        }
                    }
                }
            }
        }
    });
}
}