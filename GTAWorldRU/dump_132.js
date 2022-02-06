{
﻿var groups = {
    pet: null,
    predator: null,
};
var menu = null;
var pets = {};

/* PED EVENTS START */
mp.events.add("Ped::EnterVehicle", (ped) => {
    if(ped == null || ped == undefined) return;

    var settings = getPlayerSettings();

    var vehicle = mp.players.local.vehicle;
    if (!vehicle.isAnySeatEmpty()) {
        mp.events.callRemote("Pet::Destroy");
        return;
    }

    const seatIds = {"Переднее правое": 0, "Заднее левое": 1, "Заднее правое": 2}
    var seatId = seatIds[settings["seat"]];

    // Find where to sit.
    var freeSeat = null;
    if (vehicle.isSeatFree(seatId)) {
        freeSeat = seatId;
    } else if (settings["sittingElsewhere"]) {
        if (vehicle.isSeatFree(0)) freeSeat = 0;
        else if (vehicle.isSeatFree(1)) freeSeat = 1;
        else if (vehicle.isSeatFree(2)) freeSeat = 2;
    } else {
        mp.events.callRemote("Pet::Destroy");
        return;
    }

    // ped.taskEnterVehicle(vehicleHandle, timeout, seat, speed, flag, 0)
    // Flags: 1 = normal, 3 = teleport to vehicle, 16 = teleport directly into vehicle
    ped.taskEnterVehicle(vehicle.handle, 5000, freeSeat, 2.0, 16, 0);
});

mp.events.add("Ped::ExitVehicle", (ped, vehicle) => {
    if (ped == null || ped == undefined || !mp.vehicles.atRemoteId(vehicle)) return;
    ped.taskLeaveVehicle(mp.vehicles.atRemoteId(vehicle).handle, 16);

    setTimeout(function() {
        ped.clearTasksImmediately();
        mp.game.invoke("0x71BC8E838B9C6035", ped.handle);
    }, 1000);
})

mp.events.add("Ped::Attack", (canine, target) => {
    if (canine == null || canine == undefined || target == null) return;
    pets[canine.remoteId]["animation"] = [null, null]
    mp.events.callRemote("Ped::FindTarget");
});

mp.events.add("Ped::GoToTarget", (canine, position, hit) => {
if (canine == null)
   return;
    canine.setMoveRateOverride(2);

    if (hit) {
        mp.events.callRemote("Ped::TargetHit");
        setTimeout(function() {
            mp.events.call("Ped::PlayAnim", canine, "creatures@retriever@amb@world_dog_barking@idle_a", "idle_a", true);
        }, 3000);
    }

    var secondaryPosition = mp.game.pathfind.getSafeCoordForPed(position.x, position.y, position.z, false, 12);
    if (typeof secondaryPosition === "undefined") {
        goToCoords(canine, position, 20.0, 1.0);
    } else {
        goToCoords(canine, secondaryPosition, 20.0, 1.0);
    }
});
/* PED EVENTS END */

/* PET EVENTS START */
mp.events.add("Pet::UpdatePets", (updatedPets) => { pets = JSON.parse(updatedPets) });

// TODO: Better streaming. Animations etc..
mp.events.add("entityStreamIn", (entity) => {  
        if (entity == null) return
        if (typeof entity === "undefined") return
        if (entity.type !== "player") return;
mp.events.callRemote("Pet::RequestUpdate", entity); });
mp.events.add("entityStreamOut", (entity) => {
        if (entity == null) return
        if (typeof entity === "undefined") return
        if (entity.type !== "player") return;
 mp.events.callRemote("Pet::RequestUpdate", entity); });

mp.events.add("Pet::GetPetInformation", (name) => {
    var petName = "";
    var petDesc = "";
    var distance = Number.MAX_SAFE_INTEGER;

    var player = mp.players.local;
    mp.peds.forEachInStreamRange((ped, id) => {
        var position = ped.getCoords(true);
        var cur_dist = mp.game.system.vdist(
            player.position.x, player.position.y, player.position.z,
            ped.position.x, ped.position.y, ped.position.z
        );

        if (cur_dist < distance && pets[ped.remoteId] && pets[ped.remoteId]["name"].toLowerCase().includes(name.toLowerCase())) {
            petName = pets[ped.remoteId]["name"];
            petDesc = pets[ped.remoteId]["description"];
        }
    });

    mp.events.callRemote(
        "Pet::SendPetInformation",
        JSON.stringify({
            "name": petName,
            "description": petDesc
        })
    );
});

mp.events.add("Pet::OpenMenu", (onDuty) => {
    if (!mp.browsers.exists(menu)) {
        menu = mp.browsers.new("package://gtalife/Animals/CEF/index.html");
        menu.execute("LoadVariables(" + mp.storage.data["Pet::Settings"] + ");");

        if (onDuty) menu.execute(`ShowLEOMenu();`);
    }
});

mp.events.add("Pet::CloseMenu", () => {
    if (menu != null && mp.browsers.exists(menu)) {
        menu.destroy();
        mp.events.callRemote("Pet::GetPetSettings", mp.storage.data["Pet::Settings"]);
        mp.gui.cursor.show(false, false);
    }
});

mp.events.add("Pet::MenuSaveSettings", (settings) => {
    mp.storage.data["Pet::Settings"] = settings;
    mp.storage.flush();
});
/* PET EVENTS END */

/* PLAYER EVENTS START */
mp.events.add("playerEnterVehicle", (vehicle, seat) => {
    /* If the pet isn't allowed to enter a vehicle then destroy it. */
    var settings = getPlayerSettings();
    if (!settings["sittingEnabled"]){
        mp.events.callRemote("Pet::Destroy");
        return;
    }
});
/* PLAYER EVENTS END */

/* GENERAL PED EVENTS START */
mp.events.add("Ped::CreateRelationship", () => {
    groups.pet = mp.game.ped.addRelationshipGroup("PetGroup", mp.game.joaat("PetGroup"));
    mp.game.ped.setRelationshipBetweenGroups(0, groups.pet, mp.players.local.getRelationshipGroupHash());
    mp.game.ped.setRelationshipBetweenGroups(0, mp.players.local.getRelationshipGroupHash(0), groups.pet);

    groups.predator = mp.game.ped.addRelationshipGroup("PredatorGroup", mp.game.joaat("PredatorGroup"));
    mp.game.ped.setRelationshipBetweenGroups(5, groups.predator, mp.players.local.getRelationshipGroupHash());
    mp.game.ped.setRelationshipBetweenGroups(5, mp.players.local.getRelationshipGroupHash(), groups.predator);
});

mp.events.add("Ped::Create", (ped) => {
if (ped == null || ped == undefined)
   return;
    mp.events.callRemote("Pet::GetPetSettings", mp.storage.data["Pet::Settings"]);

    ped.setRelationshipGroupHash(groups.pet);
    ped.setCombatAbility(100);
    ped.setCombatRange(1);
    ped.setCombatMovement(3);
    ped.setCombatAttributes(46, true);
    ped.setCombatAttributes(5, true);
    ped.setFleeAttributes(0.0, false);
    ped.setProofs(false, false, false, false, false, false, false, false);
});

mp.events.add("Ped::UpdateState", (pedHandle, ownerHandle, state, targetHandle, position) => {
    switch (state) {
        case 0: // Idle
            if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                pedHandle.clearTasksImmediately();
            }
            break;
        case 1: // Follow me
            if (ownerHandle !== null && ownerHandle !== undefined && mp.players.exists(ownerHandle)) {
                if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                    pedHandle.clearTasksImmediately();
                    pedHandle.taskFollowToOffsetOf(ownerHandle.handle, 0, 0, 0, 5, -1, 10.0, true);
                }
            }
            break;
        case 2: // Goto me
            if (ownerHandle !== null && ownerHandle !== undefined && mp.players.exists(ownerHandle)) {
                if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                    pedHandle.clearTasksImmediately();
                    var pos = ownerHandle.position;
                    goToCoords(pedHandle, pos, 5.0, 3.0);
                }
            }
            break;
        case 3: // Attack
            if (targetHandle !== null && targetHandle !== undefined && mp.players.exists(targetHandle)) {
                if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                    pedHandle.clearTasksImmediately();
                    pedHandle.taskCombat(targetHandle.handle, 0, 16);
                }
            }
            break;
        case 4: // Tackle
            if (targetHandle !== null && targetHandle !== undefined && mp.players.exists(targetHandle)) {
                if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                    pedHandle.clearTasksImmediately();
                    goToCoords(pedHandle, position, 10.0, 0.0);
                }
            }
            break;
        case 5: // WanderTrack
            if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                pedHandle.clearTasksImmediately();
                pedHandle.taskWanderInArea(position.x, position.y, position.z, 50, 0, 0);
                if (ownerHandle !== null && ownerHandle !== undefined && mp.players.exists(ownerHandle)) {
                    if (ownerHandle === mp.players.local) {
                        setTimeout(() => {
                            mp.events.callRemote('canine_wandertrack_completed');
                        }, 12000);
                    }
                }
            }
            break;
        case 6: // Track
            if (targetHandle !== null && targetHandle !== undefined && mp.players.exists(targetHandle)) {
                if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                    pedHandle.clearTasksImmediately();
                    var pos = targetHandle.position;
                    goToCoords(pedHandle, pos, 3.0, 5.0, true);
                }
            }
            break;
        case 7: // Wander
            if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                pedHandle.clearTasksImmediately();
                var pos = ownerHandle.position;
                pedHandle.taskWanderInArea(pos.x, pos.y, pos.z, 10, 0, 0);
            }
            break;
        case 8: // GotoLocation
            if (pedHandle !== null && pedHandle !== undefined && pedHandle.doesExist()) {
                pedHandle.clearTasksImmediately();
                goToCoords(pedHandle, position, 5.0, 3.0, true);
            }
            break;
        default:
            break;
    }
});

mp.events.add("Ped::PlayAnim", async(ped, animDict, animName, loop) => {
if (ped == null || ped == undefined)
   return;
if (pets[ped.remoteId] == null || pets[ped.remoteId] == undefined)
   return;
    pets[ped.remoteId]["animation"] = [animDict, animName]
    if (ped !== null && ped !== undefined && ped.doesExist()) {
        mp.game.streaming.requestAnimDict(animDict);
        for (let i = 0; !mp.game.streaming.hasAnimDictLoaded(animDict) && i < 1500; i++) await mp.game.waitAsync(0);

        ped.taskPlayAnim(animDict, animName, 8.0, 0, -1, (loop ? 1 : 0), 0.0, false, false, false);
    }
});
/* GENERAL PED EVENTS STOP */

/* HELPER FUNCTIONS START */
function getPlayerSettings() {
    try {
        return JSON.parse(mp.storage.data["Pet::Settings"]);
    } catch (err) {
        return JSON.parse("{}");
    }
}

function goToCoords(ped, position, speed=5.0, range=5.0, waitForHandler=false) {
if (ped == null || ped == undefined)
   return;
    ped.taskFollowNavMeshToCoord(position.x, position.y, position.z, speed, -1, range, true, 0);
}
/* HELPER FUNCTIONS END */

mp.events.add("render", () => {
	return; // nametag disabled
    const maxDistance = 20;
    var player = mp.players.local;

    mp.peds.forEachInStreamRange((ped, id) => {
        var name = "";

        try {
            var settings = pets[ped.remoteId];
            if (settings["name"]) name = settings["name"];
        } catch (e) { ; }

        var position = ped.getCoords(true);
        var distance = mp.game.system.vdist(
            player.position.x, player.position.y, player.position.z,
            position.x, position.y, position.z
        );

        if (distance < maxDistance && !ped.isAttachedToAnyVehicle()) {
            mp.game.graphics.drawText(name, [position.x, position.y, position.z + 0.65], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [0.4, 0.4],
                outline: true
            });
        }
    });
});

/* HUNTING EVENTS START */
mp.events.add({
    //Hunting functions
    "animal_update": (ped, health) => {
        if (ped == null || ped == undefined) return;
        UpdateAnimalStats(ped);
        if (health == 0) {
            ped.setHealth(0);
        } else ped.setHealth(100 + health);

    },
    "animal_flee": (ped, fleetarget, distance, time) => {
        if (ped == null || ped == undefined) return;
        UpdateAnimalStats(ped);
        ped.clearTasksImmediately();
        ped.taskSmartFlee(fleetarget.handle, distance, time, false, false);
    },
    "animal_wander": (ped) => {
        if (ped == null || ped == undefined) return;
        UpdateAnimalStats(ped);
        ped.clearTasksImmediately();
        var pos = ped.position;
        ped.taskWanderInArea(pos.x, pos.y, pos.z, 25, 0, 0);
    },
    "animal_scenario": (ped, scenario) => {
        if (ped == null || ped == undefined) return;
        UpdateAnimalStats(ped);
        if (!ped.isActiveInScenario()) {
            //mp.gui.chat.push(`animal_scenario`);
            ped.taskStartScenarioInPlace(scenario, -1, false);
        }
    },
    "animal_check_death": (ped) => {
        if (ped == null || ped == undefined) return;
        if (ped.doesExist()) {
            var health = ped.getHealth();
            mp.events.callRemote('Animal_Update_Death', ped, health, ped.isDead());
        }
    },
    "animal_set_health": (ped, health) => {
        if (ped == null || ped == undefined) return;
        ped.setHealth(100 + health);
    },
    "kill_animal": (ped) => {
        if (ped == null || ped == undefined) return;
        ped.setHealth(0);
    },
    //special predator functions
    "predator_update": (ped, health) => {
        if (ped == null || ped == undefined) return;
        ped.clearTasksImmediately();
        UpdatePredatorStats(ped);
        ped.setHealth(100 + health);
    },
    "predator_attack": (ped, target) => {
        if (ped == null || ped == undefined) return;
        ped.setRelationshipGroupHash(groups.predator);
        ped.taskCombat(target.handle, 0, 16);
    },
    "predator_wander": (ped) => {
        if (ped == null || ped == undefined) return;
        UpdatePredatorStats(ped);
        ped.clearTasksImmediately();
        var pos = ped.position;
        ped.taskWanderInArea(pos.x, pos.y, pos.z, 25, 0, 0);
    },
    "predator_scenario": (ped, scenario) => {
        if (ped == null || ped == undefined) return;
        UpdatePredatorStats(ped);
        if (!ped.isActiveInScenario()) {
            ped.taskStartScenarioInPlace(scenario, -1, false);
        }
    },
});

function UpdateAnimalStats(ped) {
    ped.setRelationshipGroupHash(groups.pet);
    ped.setOnlyDamagedByPlayer(true);
    if (ped.isInWater()) {
        mp.events.callRemote('Animal_InWater', ped);
    }
}

function UpdatePredatorStats(ped) {
    ped.setRelationshipGroupHash(groups.pet);
    ped.setCombatAbility(100);
    ped.setCombatRange(2);
    ped.setCombatMovement(3);
    ped.setCombatAttributes(5, true);
    ped.setCombatAttributes(20, true);
    ped.setCombatAttributes(46, true);
    ped.setFleeAttributes(0, false);
}
/* HUNTING EVENTS END */
}