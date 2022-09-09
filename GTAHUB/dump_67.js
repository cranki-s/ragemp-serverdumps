{
/** Implements most per-player functions. */

require('lerp.js');

let playerControllable = true;
let blackScreenOn = false;
let blackScreenBegin = 0;
let blackScreenTime = 0;

let wantedStars = 0;
let wantedTilting = 0;

let firstSpawn = false;
let canUseMelee = true;
let parachute = null;
let landing = false;
let meleeLock = 0; // if time < this, won't be able to use melee
let haveMask = false;
const maskNotHaveToFix = [11, 12, 27, 73, 120, 121, 148] // https://wiki.rage.mp/index.php?title=Masks
let underWaterEffect = false;
let playerWeapon;
let followingPlayer;
let walkingToPlayer = false;
let disableVehiclePlayersCollision = false;
let disableVehiclesCollision = false;
let vehicleCollisions = null;

let performance = {}; // create map with player performance

mp.players.local.setConfigFlag(35, false); //PED_FLAG_CAN_PUT_MOTORCYCLE_HELMET == FALSE
mp.game.audio.startAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE"); // Remove the music from default gta clubs

// disable vehicle damage
mp.game.invoke("0x4757F00BC6323CFE", -1553120962, 0.0); // _SET_WEAPON_DAMAGE_MODIFIER_THIS_FRAME

// Ping
mp.rpc("player:ping", (idx) => {
    mp.events.callRemote("player:on_pong", idx)
})


// position
mp.rpc("player:set_position", (id, pos) => {
    let p = mp.players.atRemoteId(id);
    if (!p || p.handle === 0) return;

    p.setCoords(
        pos.x,
        pos.y,
        pos.z-1,
        true, false, false, false
    );
    mp.events.call("animation:stop", id, false);
    if (p === mp.players.local) {
        mp.events.call("player:set_position_noclip", pos.x, pos.y, pos.z);
    }
});

mp.rpc("player:set_angle", (id, angle) => {
    let p = mp.players.atRemoteId(id);
    if (!p || p.handle === 0) return;
    if (!p.vehicle) p.setHeading(angle);
    else p.setDesiredHeading(angle);
});

mp.rpc("player:spawn", (id, position, angle) => {
    let p = mp.players.atRemoteId(id);
    if (!p || p.handle === 0) return;
    p.clearBloodDamage();
    p.setCoords(
        position.x,
        position.y,
        position.z - 1,
        false, true, true, true,
    );
    p.setPosition(position);
    p.setHeading(angle);
    mp.events.call("animation:stop", id, true);

    toggleRadar(true);

    /** At first spawn, update discord information every 60s */
    if (!firstSpawn && id === mp.players.local.remoteId) {
        setTimeout(() => mp.freezeToLoadWorld(p), 50);
        setInterval(discordUpdate, 60000);

        // load health bar
        mp.events.call("player:set_health", mp.players.local.getHealth());
    }
});

// when spawning, freeze player for a few seconds to load the world clientside.
mp.freezeToLoadWorld = (player, time= 3000) => {
    player.freezePosition(true);
    setTimeout(() => {
        player.freezePosition(false);
        if (!firstSpawn) {
            firstSpawn = true;
            setTimeout(() => checkZGround, 500)
        }
    }, time);
}

mp.events.add("entityStreamIn", (entity) => {
    if (entity.handle !== 0 && entity.type === "player") {
        if (entity.getVariable("haveMask")) {
            fixPlayerFace(entity, true) // fix player face
        }

        if (disableVehiclePlayersCollision && mp.vehicles.exists(vehicleCollisions)) {
            vehicleCollisions.setNoCollision(entity.handle, !disableVehiclePlayersCollision);
        }
    } else if (entity.handle && entity.type === "vehicle" && disableVehiclesCollision) {
        mp.players.local.setNoCollision(entity.handle, !disableVehiclesCollision);
    }
})

mp.events.addDataHandler("haveMask", (entity, value, oldValue) => {
    if (value !== oldValue && entity.handle) {
        fixPlayerFace(entity, value)
    }
})

/** Face features to avoid bug with masks (true -> fix player face || false -> set normal player face) */
function fixPlayerFace(player, toggle) {
    if (mp.players.exists(player) && player.handle) {
        // if fix player face for all
        if (toggle) {
            player.setFaceFeature(0, -1);
            player.setFaceFeature(1, 1);
            player.setFaceFeature(2, 1);
            player.setFaceFeature(3, 0);
            player.setFaceFeature(4, 0);
            player.setFaceFeature(5, 0);
            player.setFaceFeature(8, 0);
            player.setFaceFeature(9, -1);
            player.setFaceFeature(10, 1);
            player.setFaceFeature(13, -1);
            player.setFaceFeature(14, 0);
            player.setFaceFeature(15, 0);
            player.setFaceFeature(16, 0);
            player.setFaceFeature(17, -1);
            player.setFaceFeature(18, -1);
            player.setFaceFeature(19, -1);
        } else {
            // set normal player face server-side one time
            if (player.handle === mp.players.local.handle) {
                mp.events.callRemote("player:update_face_feature")
            }
        }
    }
}

function setMask(toggle) {
    let needToFix, player = mp.players.local;

    if (toggle) {
        let drawableId = player.getDrawableVariation(1); // Get mask
        needToFix = !maskNotHaveToFix.includes(drawableId); // Check if mask need to be fixed
        if (needToFix) {
            mp.events.originalCallRemote("fixFaceFeature", toggle)  // Set antibug face
        }
    } else {
        mp.events.originalCallRemote("fixFaceFeature", toggle) // Set normal player face
    }
}

function checkZGround() {
    let player = mp.players.local;
    let interiorId = mp.game.interior.getInteriorAtCoords(player.position.x, player.position.y, player.position.z);
    if (player.isFalling() && interiorId === 0) {
        player.freezePosition(true);

        // first try to put in helicopter/airplane
        setTimeout( () => {
            mp.vehicles.forEachInStreamRange(v => {
                if (!mp.vehicles.exists(v) || !v.handle || player.vehicle || v.getPedInSeat(-1) !== 0) return;

                if (v.getClass() === 15 || v.getClass() === 16 || v.model === mp.game.joaat("polmav")) {
                    player.setIntoVehicle(v.handle, -1);
                }
            });
        }, 3000)

        // if player is not in vehicle, set in ground properly
        setTimeout( async () => {
            if (!player.vehicle) {
                let newPos = await getGroundZ(player.position);
                player.position = newPos;
                player.freezePosition(false);
            } else player.freezePosition(false);
        }, 4000)
    }
}

function getGroundZ(pos) {
    return new Promise((resolve, reject) => {
        let newZ = 0;
        let interval = setInterval(() => {
            newZ++
            pos.z = mp.game.gameplay.getGroundZFor3dCoord(pos.x, pos.y, newZ * 750, 0, false)
            if (pos.z % 1 !== 0 || newZ >= 5) {
                pos.z += 1
                clearInterval(interval)
                resolve(pos)
            }
        }, 500)
    })
}

function discordUpdate() {
    mp.discord.update('gtahub.gg/fase3', mp.players.local.name)
}

// to lock/unlock world doors. Like removeObject, something that
// mutates the map in an irreversible way
let lockedDoors = [];
mp.setInterval(() => {
    let pos = mp.players.local.position;
    for (let door of lockedDoors) {
        const dist = mp.game.system.vdist(door.position.x, door.position.y, door.position.z, pos.x, pos.y, pos.z);
        if (dist < 25) {
            mp.game.object.setStateOfClosestDoorOfType(door.model, door.position.x, door.position.y, door.position.z, door.locked, 0, false);
        }
    }
}, 1500);

mp.rpc("player:set_world_door_locked", (model, pos, locked) => {
    lockedDoors.push({model: model, position: pos, locked: locked});
});

mp.rpc("player:set_can_use_melee", (toggle) => {

    // add a lock for one sec to prevent accidental melee after using an item
    if (toggle && !canUseMelee) {
        meleeLock = new Date().getTime() + 1500;
    }

    canUseMelee = toggle;
    mp.game.player.setCanDoDriveBy(toggle);
});

mp.rpc("player:set_ragdoll", (id, toggle) => {
    let player = mp.players.atRemoteId(id);
    if (!mp.players.exists(player) || !player.handle) return

    player.ragdoll = toggle;
});

// Controllable/freezed
mp.rpc("player:set_controllable", (id, controllable) => {
    let player = mp.players.atRemoteId(id);
    if (!player || player.handle === 0) return;

    player.freezePosition(!controllable);
    if (id === mp.players.local.remoteId) {
        playerControllable = controllable;
    }
});

mp.rpc("player:set_pos_rot_interpolated", (id, posJson, rot, time) => {
    const player = mp.players.atRemoteId(id);
    if (!player || player.handle === 0) return;
    player.lerp = {
        fromPos: player.position,
        fromRot: player.getHeading(),
        toPos: JSON.parse(posJson),
        toRot: rot,
        begin: new Date().getTime(),
        time: time,
        interiorID: mp.game.invoke("0x2107BA504071A6BB", player.handle),
        roomID: mp.game.invoke("0x47C2A06D4F5F424B", player.handle) // gets the room in which the player is
    };
});

mp.rpc("player:remove_from_vehicle_smooth", (id) => {
    let p = mp.players.atRemoteId(id);
    if (!p || p.handle === 0) return;
    p.taskLeaveAnyVehicle(0, 0);
});

mp.rpc("player:start_screenfx", (effect, time) => {
    mp.game.graphics.startScreenEffect(effect, time, true);
});

mp.rpc("player:fire_screenfx", (effect, time) => {
    mp.game.graphics.startScreenEffect(effect, time, false);
});

mp.rpc("player:stop_screenfx", (effect) => {
    mp.game.graphics.stopScreenEffect(effect);
});

mp.rpc("player:toggle_black_screen", (toggle, time) => {
    /*blackScreenBegin = new Date().getTime();
    blackScreenTime = time + 1; // safe for division by 0
    blackScreenOn = toggle;*/
    browserExecute("blackscreenToggle("+toggle+","+time+")")
});

mp.rpc("player:set_wanted_stars", (level) => {
    wantedStars = level;
    mp.players.local.wantedStars = level;
});

mp.rpc('player:set_secondary_stars', (stars) => {
    browserSet("starsVM", "stars", stars);
});

mp.rpc("player:set_wanted_tilting", (level) => {
    wantedTilting = level;
});

mp.rpc("player:set_waypoint", (enable, position) => {
    if (enable) {
        mp.game.ui.setNewWaypoint(position.x, position.y);
    }
});

mp.rpc("player:set_seatbelt", (toggle) => {
    mp.players.local.seatbelt = toggle;

    mp.players.local.setConfigFlag(32, !toggle); // PED_FLAG_CAN_FLY_THRU_WINDSCREEN
});

mp.rpc("player:set_performance", (performanceName, value) => {
    performanceName = performanceName.toLowerCase(); // always set in lowercase
    performance[performanceName] = value;

    switch (performanceName) {
        case "running_speed": {
            mp.game.player.setRunSprintMultiplierFor(value);
            break;
        }
        case "swimming_speed": {
            mp.game.player.setSwimMultiplierFor(value);
            break;
        }
    }
});

mp.rpc("player:toggle_interior", (interiorDataJson, toggle) => {
    try {
        let interiorData = JSON.parse(interiorDataJson);
        if (toggle) {
            if (interiorData.name !== "") mp.game.streaming.requestIpl(interiorData.name);
            if (interiorData.props.length) {
                for (const prop of interiorData.props) {
                    mp.game.interior.enableInteriorProp(interiorData.id, prop.model);
                    if (prop.color > -1) mp.game.invoke("0xC1F1920BAF281317", interiorData.id, prop.model, prop.color);
                }
                mp.game.interior.refreshInterior(interiorData.id);
            }
        }
        else {
            if (interiorData.name !== "") mp.game.streaming.removeIpl(interiorData.name);
            if (interiorData.props.length) {
                for (const prop of interiorData.props) {
                    mp.game.interior.disableInteriorProp(interiorData.id, prop.model);
                }
                mp.game.interior.refreshInterior(interiorData.id);
            }
        }
    } catch(e) {
        mp.console.logWarning(`cant toggle interior ${interiorDataJson} error ${e}`);
    }
});

mp.rpc("player:clean", (id) => {
    let player = mp.players.atRemoteId(id);
    if (!mp.players.exists(player)) return;
    player.clearBloodDamage();
});

mp.rpc("player:follow_to", (id) => {
    if (id === -1) {
        mp.players.local.clearTasks();
        followingPlayer = null;
        return;
    }
    let playerToFollow = mp.players.atRemoteId(id);
    if (!playerToFollow || !mp.players.exists(playerToFollow)) return;
    mp.players.local.taskTurnToFace(playerToFollow.handle, -1);
    followingPlayer = playerToFollow;
});

mp.events.add("player:toggle_players_vehicle_collisions", (vehicleId, toggle) => {
    let vehicle = mp.vehicles.atRemoteId(vehicleId);

    if (!toggle && mp.vehicles.exists(vehicle)) {
        disableVehiclePlayersCollision = !toggle;
        vehicleCollisions = vehicle;
        mp.players.forEachInStreamRange(p => {
            vehicle.setNoCollision(p.handle, toggle);
        });
    } else if (toggle) {
        disableVehiclePlayersCollision = !toggle;
        mp.players.forEachInStreamRange(p => {
            if (mp.vehicles.exists(vehicleCollisions)) vehicleCollisions.setNoCollision(p.handle, toggle);
        });
        vehicleCollisions = null;
    }
});

mp.events.add("player:toggle_vehicles_collisions", (toggle) => {
    disableVehiclesCollision = !toggle;
    mp.vehicles.forEachInStreamRange(v => {
        mp.players.local.setNoCollision(v.handle, toggle);
    });
});

mp.events.add("playerCreateWaypoint", (position) => {
    mp.events.callRemote("player:on_set_waypoint", true, JSON.stringify(position));
});

let wantedLevelIteration = 0;

mp.setInterval(() => {
    if (wantedStars > 0) {
        if (wantedTilting === 0) {
            // enable/disable fake wanted level, but only blue color.
            if (wantedLevelIteration % 4 === 0) {
                mp.game.invoke('0x1454F2448DE30163', wantedStars);
            } else {
                mp.game.invoke('0x1454F2448DE30163', 0);
            }
        } else {
            // simply set the wanted stars
            mp.game.invoke('0x1454F2448DE30163', wantedStars);
        }
    } else {
        mp.game.invoke('0x1454F2448DE30163', 0);
    }

    wantedLevelIteration += 1;

    // check player mask
    if (mp.players.local.getDrawableVariation(1) !== 0 && !haveMask) {
        haveMask = true
        setMask(haveMask)
    } else if (mp.players.local.getDrawableVariation(1) === 0 && haveMask) {
        haveMask = false
        setMask(haveMask)
    }

    // set player in ragnoll
    mp.players.forEachInStreamRange((p) => {
        if (p.ragdoll) {
            p.setToRagdoll(2000, 2000, 0, false, false, false);
        }
    });

    // underwater effect
    if (mp.players.local.isSwimmingUnderWater()) {
        let oxigen = mp.game.player.getUnderwaterTimeRemaining();

        if (oxigen <= 10) {
            if (underWaterEffect) return;
            mp.game.graphics.startScreenEffect('ArenaEMPOut', 4500, false);
            underWaterEffect = mp.game.graphics.transitionToBlurred(3500);
        }
    } else if (underWaterEffect) {
        underWaterEffect = !mp.game.graphics.transitionFromBlurred(7500);
    }

    // following player
    if (mp.players.exists(followingPlayer) && followingPlayer.handle) {
        let localPosition = mp.players.local.position;
        if (mp.game.system.vdist(localPosition.x, localPosition.y, localPosition.z, followingPlayer.position.x, followingPlayer.position.y, followingPlayer.position.z) > 1) {
            if (!mp.players.local.isFacingPed(followingPlayer.handle, 20)) {
                mp.players.local.taskTurnToFace(followingPlayer.handle, -1);
                walkingToPlayer = false;
            } else {
                if (!walkingToPlayer) {
                    walkingToPlayer = true;
                    mp.players.local.taskPlayAnim("mp_arresting", "walk", 4.0, 4.0, -1, 1, 0, false, false, false);
                }
            }
        } else {
            walkingToPlayer = false;
            mp.players.local.clearTasks();
        }
    }
}, 400);

mp.events.add("render", () => {
    let time = new Date().getTime();

    // disable vehicle damage
    mp.game.invoke("0x4757F00BC6323CFE", -1553120962, 0.0); // _SET_WEAPON_DAMAGE_MODIFIER_THIS_FRAME

    // disable controls while !controllable
    if (!playerControllable) {
        mp.game.controls.disableAllControlActions(0); // INPUTGROUP_MOVE
        mp.game.controls.disableAllControlActions(27); // INPUTGROUP_VEH_MOVE_ALL
        mp.game.controls.disableAllControlActions(31); // INPUTGROUP_VEH_HYDRAULICS_CONTROL
        if (mp.players.local.vehicle) {
            mp.game.controls.setControlNormal(27, 76, 1); // hold HANDBRAKE
        }

        // enable voice, as it's disabled with all those controls
        mp.game.controls.enableControlAction(0, 249, true);
    }

    if (!canUseMelee || meleeLock > time) {
        mp.game.controls.disableControlAction(0, 24, true); // fire
        mp.game.controls.disableControlAction(0, 25, true); // aim
        mp.game.controls.disableControlAction(0, 50, true); // aim zoom
        mp.game.controls.disableControlAction(0, 140, true); // melee light
        mp.game.controls.disableControlAction(0, 141, true); // melee heavy
    }

    // black screen check
    if (blackScreenOn) {
        let t = (time - blackScreenBegin) / blackScreenTime;
        if (t > 1) t = 1;
        mp.game.graphics.drawRect(0, 0, 10, 10, 0, 0, 0, Math.round(t*255));
    } else {
        if (time < blackScreenBegin + blackScreenTime) {
            let t = (time - blackScreenBegin) / blackScreenTime;
            if (t > 1) t = 1;
            mp.game.graphics.drawRect(0, 0, 10, 10, 0, 0, 0, Math.round((1-t)*255));
        }
    }

    // infinite stamina for avoid client bug, running and in cycles.
    if ((mp.players.local.isRunning()) ||
        (mp.players.local.vehicle && mp.players.local.vehicle.handle !== 0 && mp.players.local.vehicle.getClass() === 13)
    ) {
        mp.game.player.restoreStamina(100);
    }

    // process lerp
    mp.players.forEachInStreamRange((p) => {
        if (!mp.players.exists(p) || !p.handle) return;

        if (p.lerp) {
            let playerRoom = mp.game.invoke("0x47C2A06D4F5F424B", mp.players.local.handle); // gets the room in which the player is
            let playerInterior = mp.game.invoke("0x2107BA504071A6BB", mp.players.local.handle); // gets the interior in which the player is
            let l = p.lerp;
            let off = (time - l.begin) / l.time;
            if (off >= 1) {
                p.setCoords(l.toPos.x, l.toPos.y, l.toPos.z - 1, true, true, true, true);
                if (!p.vehicle) p.setHeading(l.toRot);
                else p.setDesiredHeading(l.toRot);

                if (p.lerp.interiorID !== playerInterior && p.lerp.roomID !== playerRoom) {
                    mp.game.invoke("0x52923C4710DD9907", p.handle, p.lerp.interiorID, p.lerp.roomID);
                }
                delete p.lerp;
            } else {
                let newPos = lerpVector(l.fromPos, l.toPos, off);
                p.setCoords(newPos.x, newPos.y, newPos.z - 1, true, true, true, true);
                if (!p.vehicle) p.setHeading(angleLerp(l.fromRot, l.toRot, off));
                else p.setDesiredHeading(angleLerp(l.fromRot, l.toRot, off));

                if (p.lerp.interiorID !== playerInterior && p.lerp.roomID !== playerRoom) {
                    mp.game.invoke("0x52923C4710DD9907", p.handle, p.lerp.interiorID, p.lerp.roomID);
                }
            }
        }

        // flashlight sync
        if (p !== mp.players.local && p.weapon === 2343591895 && p.getConfigFlag(78, true)) {
            let from = p.getBoneCoords(57005, 0.11, 0.0, 0.0);
            if (from) {
                let to = p.getForwardVector();
                if (to) {
                    mp.game.graphics.drawSpotLight(from.x, from.y, from.z, to.x, to.y, to.z, 255, 255, 240, 20, 5, 5, 15, 5);
                }
            }
        }

        // parachute sync
        /*
        if (p !== mp.players.local && p.getParachuteState() === 2) {
            p.taskParachute(true);
            let pos = p.getCoords(true);
            pos.z = pos.z + 2;
            if (!parachute) {
                parachute = mp.objects.new(mp.game.joaat("p_parachute1_mp_s"), pos, {
                    rotation: p.getRotation(5),
                    alpha: 255,
                    dimension: p.dimension
                });
                parachute.setCollision(false, false);
                mp.players.local.setNoCollision(parachute.handle, false);
            } else if (mp.objects.exists(parachute)) {
                parachute.setCoords(pos.x, pos.y, pos.z, true, false, false, false);
            }
        } else if (mp.objects.exists(parachute)) {
            parachute.destroy();
            parachute = null;
        }*/
    });

    if (mp.players.local.getParachuteLandingType() !== -1 && !landing) {
        landing = true;
        mp.events.callRemote("pa:on_remove_parachute")
        setTimeout(() => {
            landing = false;
        }, 10000)
    }

    // sync players in interiors
    let playerRoom = mp.game.invoke("0x47C2A06D4F5F424B", mp.players.local.handle); // gets the room in which the player is
    let playerInterior = mp.game.invoke("0x2107BA504071A6BB", mp.players.local.handle); // gets the interior in which the player is
    if (playerInterior > 0 && playerRoom > 0) {
        mp.players.forEachInRange(mp.players.local.position, 15, (streamedPlayer) => {
            if (streamedPlayer !== mp.players.local) {
                let targetRoom = mp.game.invoke("0x47C2A06D4F5F424B", streamedPlayer.handle);
                let targetInterior = mp.game.invoke("0x2107BA504071A6BB", streamedPlayer.handle);

                if (playerRoom !== targetRoom || playerInterior !== targetInterior) {
                    mp.game.invoke("0x52923C4710DD9907", streamedPlayer.handle, playerInterior, playerRoom); // forces the same room and id on the target
                }
            }
        });
    }

    /* i miss u :c
    if (mp.players.local.dimension > 100000 && mp.players.local.position.z >= 0) {
        if (!npcsEnabled) {
            mp.game.streaming.setPedPopulationBudget(3);
            mp.game.streaming.setVehiclePopulationBudget(3);
        }
        npcsEnabled = true;
    } else if (npcsEnabled) {
        mp.game.streaming.setPedPopulationBudget(0);
        mp.game.streaming.setVehiclePopulationBudget(0);
        let pos = mp.players.local.position;
        mp.game.gameplay.clearAreaOfVehicles(pos.x, pos.y, pos.z, 500, false, false, false, false, false);
        mp.game.gameplay.clearAreaOfPeds(pos.x, pos.y, pos.z, 500, 1);
        npcsEnabled = false;
    }*/

    // check possible weapon hack
    if (mp.players.local.weapon !== playerWeapon) {
        if (!playerWeapon || mp.players.local.weapon === 2725352035) return playerWeapon = mp.players.local.weapon;
        playerWeapon = mp.players.local.weapon;
        mp.events.callRemote("pa:get_weapon", mp.players.local.weapon);
    }
});
}