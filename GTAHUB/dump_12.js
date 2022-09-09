{
/** Extend GTA Vehicles, support some more synced properties */

/** All vehicles with more/lower engine power */
const VEHICLES_ENGINES_MULTIPLIER = [
    {
        model: "dilettante",
        power: -30,
    },
    {
        model: "sheriff",
        power: 18
    },
    {
        model: "sheriff2",
        power: 25
    },
    {
        model: "police",
        power: 18
    },
    {
        model: "police3",
        power: 6
    },
    {
        model: "vstr",
        power: -3
    },
    {
        model: "police2",
        power: 10
    },
    {
        model: "burrito3",
        power: -15,
    },
    {
        model: "rumpo",
        power: -20
    },
    {
        model: "speedo",
        power: -20
    },
    {
        model: "scoutpd",
        power: 14
    },
    {
        model: "fbi",
        power: 14
    },
    {
        model: "fbi2",
        power: 14
    },
    {
        model: "police4",
        power: 18
    },
    {
        model: "gauntletpd",
        power: 10
    },
    {
        model: "policeb",
        power: 20
    },
    {
        model: "predator",
        power: 30
    }
]

// crash detection
let crashDetectPrevHP = 0;
let crashDetectPrevSpeed = 0.0;
let crashDetectPrevVehicle = null;
let crashDetectFadeEnds = 0;
let crashDetectFadeInTime = 30;
let crashDetectFadeOutTime = 2500;
let crashDetectFadeTimeMultiplier = 90.0;

// all vehicle flags
const Flags = {
    HoodOpened: 1,
    TrunkOpened: 2,
    EngineOn: 4,
    LightsOn: 8,
    Window1: 16,
    Window2: 32,
    Window3: 64,
    Window4: 128,
    IndicatorLightRight: 256,
    IndicatorLightLeft: 512,
    Door1: 1024,
    Door2: 2048,
    Door3: 4096,
    Door4: 8192,
    AlarmOn: 16384
};

let lastVehicle = -1;
let lastSeat = -3;
let lastEntering = 0;

// console info
let lastAdviced = 0;

mp.game.vehicle.setExperimentalHornSyncEnabled(false);

mp.rpc("vehicles:set_engine_health", (vehicleId, health) => {
    let v = mp.vehicles.atRemoteId(vehicleId);
    if (!v) return;

    v.serverEngineHealth = health

    if (v.handle !== 0) {
        v.setEngineHealth(health);
    }
});

mp.rpc("vehicles:set_dirt_level", (vehicleId, dirt) => {
    let v = mp.vehicles.atRemoteId(vehicleId);
    if (!v) return;

    v.dirtLevel = dirt

    if (mp.vehicles.exists(v) && v.handle) {
       v.setDirtLevel(dirt);
    }
});

mp.rpc("vehicles:update_body_damage", (vehicleId, vehicleDamage) => {
    let v = mp.vehicles.atRemoteId(vehicleId);
    if (!v) return;

    // don't re-stream if the vehicle was just un-streamed (actual rage bug)
    let timeSinceLastBodyDamage = Date.now() - (v.lastUpdateBodyDamage || 0);
    if (timeSinceLastBodyDamage < 50) {
        return; // quick fix
    }

    v.lastUpdateBodyDamage = Date.now();

    vehicleDamage = JSON.parse(vehicleDamage)

    v.serverBodyDamage = vehicleDamage;

    if (v.handle) {
        setTimeout( () => setVehicleDamage(v), 1000)
    }
});

mp.rpc("vehicles:detach_trailer", (vehicleId) => {
    let v = mp.vehicles.atRemoteId(vehicleId);
    if (!v || !v.handle) return;

    v.detachFromTrailer();
});

mp.rpc("vehicles:set_sync_data", (vehicleId, flags) => { // arbitrary sync data sent by the server
    let v = mp.vehicles.atRemoteId(vehicleId);
    if (!v) return;
    flags = flags >>> 0;
    let oldFlags = v.flags >>> 0 || 0;

    v.flags = flags;
    v.oldFlags = oldFlags;

    if (v.handle !== 0) {
        setVehicleFlags(v)
    }
});

mp.events.addDataHandler("xenonLight", (entity, value, oldValue) => {
    if (mp.vehicles.exists(entity) && entity.handle && value !== oldValue) {
        mp.game.invoke("0xE41033B25D003A07", entity.handle, value);
    }
})

mp.events.add({
    "entityStreamIn": (entity) => {
        if (entity.type === 'vehicle' && entity.handle) {
            entity.setDirtLevel(entity.dirtLevel ? entity.dirtLevel : 0)
            setTimeout(() => setVehicleFlags(entity, true), 2000)

            // sync xenon lights
            if (typeof entity.getVariable('xenonLight') === "number") {
                mp.game.invoke("0xE41033B25D003A07", entity.handle, entity.getVariable('xenonLight'));
            }
            // try to avoid helicopters exploding
            if (entity.getClass() === 15 && entity.isSeatFree(-1) && entity.getNumberOfPassengers() === 0) {
                let pos = entity.getCoords(true);
                mp.game.streaming.requestCollisionAtCoord(pos.x, pos.y, pos.z);

                setTimeout(() => {
                    if (entity && mp.vehicles.exists(entity) && entity.handle) {
                        entity.setOnGroundProperly();
                    }
                }, 2000)
            }
        }
    }
});


/** Disable horn when using boats */
mp.events.add("render", () => {
    let v = mp.players.local.vehicle;
    if (v) {
        if (mp.game.vehicle.isThisModelABoat(v.model)) {
            mp.game.controls.disableControlAction(0, 86, true); // INPUT_VEH_HORN
        }

        // auto-shutdown many times the engine while being in the car because
        // gta starts the engine again sometimes (when you're going on speed mostly)
        if (!checkFlag(v.flags, Flags.EngineOn)) {
            if (Date.now() - lastAdviced > 10000) {
                mp.console.logInfo(`current vehicle ID ${mp.players.local.vehicle.remoteId} shutdown automatically. Flags: ${v.flags} and checkFlags: ${checkFlag(v.flags, Flags.EngineOn)}`)
                lastAdviced = Date.now();
            }
            v.setEngineOn(false, false, true);
        }
        mp.game.controls.disableControlAction(27, 85, true); // disable radio menu (key Q)

        // cant leave vehicle if player has seatbelt
        if (mp.players.local.seatbelt) {
            mp.game.controls.disableControlAction(0, 75, true);
            mp.game.controls.disableControlAction(27, 75, true);

            if (mp.game.controls.isDisabledControlJustPressed(0,75) || mp.game.controls.isDisabledControlJustPressed(27,75)) {
                if (mp.gui.cursor.visible) return;
                mp.events.call("hud:short_info", `~r~Debes quitarte el cinturón de seguridad`, 3500)
            }
        }
    }
});

mp.events.add('playerEnterVehicle', (vehicle, seat) => {
    if (seat === -1) {
        for (let veh in VEHICLES_ENGINES_MULTIPLIER) {
            if (mp.game.joaat(VEHICLES_ENGINES_MULTIPLIER[veh].model) === vehicle.model) {
                mp.players.local.vehicle.setEnginePowerMultiplier(VEHICLES_ENGINES_MULTIPLIER[veh].power)
                break;
            }
        }
    }
});

mp.events.add('playerLeaveVehicle', (vehicle, seat) => {
    if (!mp.vehicles.exists(vehicle) || !vehicle.handle) return;

    if (seat === -1) {
        if (mp.game.vehicle.isThisModelABoat(vehicle.model) || mp.game.vehicle.isThisModelAHeli(vehicle.model) || mp.game.vehicle.isThisModelAPlane(vehicle.model)) {
            vehicle.freezePosition(true);
        }

        // keeps engine running when player leave vehicle (only if engine is on)
        if (checkFlag(vehicle.flags, Flags.EngineOn)) {
            vehicle.setEngineOn(true, true, true);
        }
    }
});

let cancelEnterVehicleTimer = null;

mp.keys.bind(0x47, true, () =>  { // G
    let localPlayer = mp.players.local;

    if(localPlayer.isDead() ||
        mp.gui.cursor.visible ||
        localPlayer.vehicle != null ||
        localPlayer.getIsTaskActive(6) === 0 // CTaskPlayerOnFoot. This filters when doing animations or weird states
    ) return;

    let seatBones = [
        "door_pside_f", // right front
        "door_dside_r", // left back
        "door_pside_r" //  right back
    ]

    let minDistance = 100.0;
    let selectedSeat = -1;
    let selectedVehicle = null;
    let maxRange = 6*6;
    let pos = localPlayer.position;

    mp.vehicles.forEachInStreamRange(v => {
        let vPos = v.position;

        if (mp.game.system.vdist2(pos.x, pos.y, pos.z, vPos.x, vPos.y, vPos.z) < maxRange && // near enough
            v.getSpeed() < 5 && // require the vehicle to be stationary
            v.isAnySeatEmpty()
        ) {

            // find the nearest seat
            for (let seatIdx = 0; seatIdx < seatBones.length; seatIdx++) {
                let seatBoneIndex = v.getBoneIndexByName(seatBones[seatIdx]);

                if (seatBoneIndex !== -1 && v.getPedInSeat(seatIdx) === 0) { // this vehicle contains such seat, and is empty
                    let seatPos = v.getWorldPositionOfBone(seatBoneIndex);
                    let distanceToSeat = mp.game.system.vdist(pos.x, pos.y, pos.z, seatPos.x, seatPos.y, seatPos.z);
                    if (distanceToSeat < minDistance) {
                        selectedSeat = seatIdx;
                        selectedVehicle = v;
                        minDistance = distanceToSeat;
                    }
                }
            }
        }
    });

    // check if we found one seat
    if (selectedSeat !== -1 && selectedVehicle != null) {
        localPlayer.taskEnterVehicle(selectedVehicle.handle, 6000, selectedSeat, 1, 1, 0);

        if(cancelEnterVehicleTimer != null) clearTimeout(cancelEnterVehicleTimer);

        cancelEnterVehicleTimer = setTimeout(function() {
            if(!localPlayer.vehicle) localPlayer.clearTasks();
            cancelEnterVehicleTimer = null;
        }, 5000);
    }
});

function getPedSeat(vehicle, ped) {
    for (let i = -1; i < 16; i++) {
        if (vehicle.getPedInSeat(i) === ped.handle) {
            return i;
        }
    }
    return 255;
}

function getVehicleDamage(vehId) {
    let veh = mp.vehicles.atRemoteId(vehId);
    let newVehDamage = {
        windows: {
            window0: false,
            window1: false,
            window2: false,
            window3: false,
            window4: false,
            window5: false,
            window6: false,
            window7: false,
        },
        wheels: {
            wheel0: false, // wheel_lf / bike, plane or jet front
            wheel1: false, // wheel_rf
            wheel2: false, // wheel_lm / in 6 wheels trailer, plane or jet is first one on left
            wheel3: false, // wheel_rm / in 6 wheels trailer, plane or jet is first one on right
            wheel4: false, // wheel_lr / bike rear / in 6 wheels trailer, plane or jet is last one on left
            wheel5: false, // wheel_rr / in 6 wheels trailer, plane or jet is last one on right
            wheel6: false, // 6 wheels trailer mid wheel left
            wheel7: false, // 6 wheels trailer mid wheel right
        },
        doors: {
            door0: false, // front left
            door1: false, // front right
            door2: false, // back left
            door3: false, // back right
            door4: false, // hood
            door5: false, // trunk
        },
        deformations: {
            inFront: 0.0,
            inBack: 0.0,
            headlightLeft: false,
            headlightRight: false,
        }
    }

    /** Get wheels status */
    // Wheels disabled
    /*let index;
    for (let wheel = 0; wheel < getLength(newVehDamage.wheels); wheel++) {
        index = wheel
        if (wheel === 6) index = 45
        if (wheel === 7) index = 47
        if (veh.isTyreBurst(index, true) || veh.isTyreBurst(index, false)) {
            newVehDamage.wheels["wheel" + wheel] = true
        }
    }*/

    /** Get windows status */
    if (!veh.areAllWindowsIntact()) {
        for (let window = 0; window < getLength(newVehDamage.windows); window++) {
            if (!veh.isWindowIntact(window)) {
                newVehDamage.windows["window" + window] = true
            }
        }
    }

    // auto-fix window 4 and 5 (dont know what windows are)
    newVehDamage.windows.window4 = false;
    newVehDamage.windows.window5 = false;

    /** Get doors status */
    for (let door = 0; door < getLength(newVehDamage.doors); door++) {
        if(isValidDoor(veh, door) === 1) {
            if(veh.isDoorDamaged(door)) newVehDamage.doors["door" + door] = true
        }
    }

    /** Get deformations status */
    let dimension = mp.game.gameplay.getModelDimensions(veh.model);
    let dimensionY = (dimension.max.y - dimension.min.y)/2
    newVehDamage.deformations.inFront = parseFloat(Math.abs(veh.getDeformationAtPos(0, dimensionY, 0).y))
    newVehDamage.deformations.inBack = parseFloat(Math.abs(veh.getDeformationAtPos(0, -dimensionY, 0).y))
    newVehDamage.deformations.headlightLeft = !!veh.getIsLeftHeadlightDamaged()
    newVehDamage.deformations.headlightRight = !!veh.getIsRightHeadlightDamaged()

    return newVehDamage
}

function setVehicleDamage(v) {
    if (mp.vehicles.exists(v) && v.handle) {
        let vehHealth = v.serverEngineHealth || 1000.0
        let vehicleDamage = v.serverBodyDamage
        v.setFixed();
        v.setEngineHealth(vehHealth)

        if (vehicleDamage) {
            /** Set windows */
            for (let window = 0; window < getLength(vehicleDamage.windows); window++) {
                if (vehicleDamage.windows["window" + window]) {
                    mp.game.invoke('0xA711568EEDB43069', v.handle, window); // REMOVE_VEHICLE_WINDOW
                }
            }

            /** Set wheels */
            // DISABLED:
            /*let index;
            for (let i = 0; i < getLength(vehicleDamage.wheels); i++) {
                index = i
                if(i == 6) index = 45
                if(i == 7) index = 47
                let constIndex = index;
                if (vehicleDamage.wheels["wheel" + i]) {
                    v.setTyreBurst(index, true, 1000)
                }
            }*/

            /** Set doors */
            for (let door = 0; door < getLength(vehicleDamage.doors); door++) {
                if (vehicleDamage.doors["door" + door]) {
                    v.setDoorBroken(door, true)
                }
            }

            /** Set deformations (back and front) */
            let frontDeformation = vehicleDamage.deformations.inFront * 5600
            let backDeformation = vehicleDamage.deformations.inBack * 5600
            let dimension = mp.game.gameplay.getModelDimensions(v.model);
            let dimensionY = (dimension.max.y - dimension.min.y)/2
            v.setDamage(0, dimensionY, 0, frontDeformation, 35, true);
            v.setDamage(0, -dimensionY, 0, backDeformation, 35, true);

            let coords_l = v.getWorldPositionOfBone(v.getBoneIndexByName('headlight_l'))
            let coords_r = v.getWorldPositionOfBone(v.getBoneIndexByName('headlight_r'))

            let offset_l = v.getOffsetFromGivenWorldCoords(coords_l.x, coords_l.y, coords_l.z)
            let offset_r = v.getOffsetFromGivenWorldCoords(coords_r.x, coords_r.y, coords_r.z)

            /** Break the headlight */
            if (vehicleDamage.deformations.headlightLeft) {
                v.setDamage(offset_l.x, offset_l.y, offset_l.z, 500, 10, true);
            }
            if (vehicleDamage.deformations.headlightRight) {
                v.setDamage(offset_r.x, offset_r.y, offset_r.z, 500, 10, true);
            }
        }
    }
}

function setVehicleFlags(v, streamIn = false) {
    if (v.handle !== 0) {
        let oldFlags = v.oldFlags;
        let flags = v.flags;

        // check for hood change
        if (checkFlag(oldFlags, Flags.HoodOpened) !== checkFlag(flags, Flags.HoodOpened) || streamIn) {
            if (checkFlag(flags, Flags.HoodOpened)) {
                v.setDoorOpen(4, false, false);
            } else {
                v.setDoorShut(4, false);
            }
        }

        // check for trunk change
        if (checkFlag(oldFlags, Flags.TrunkOpened) !== checkFlag(flags, Flags.TrunkOpened) || streamIn) {
            if (checkFlag(flags, Flags.TrunkOpened)) {
                v.setDoorOpen(5, false, false);
            } else {
                v.setDoorShut(5, false);
            }
        }

        // check alarm change
        if (checkFlag(oldFlags, Flags.AlarmOn) !== checkFlag(flags, Flags.AlarmOn) || streamIn) {
            if (checkFlag(flags, Flags.AlarmOn)) {
                v.setAlarm(true);
                v.startAlarm();
            } else {
                v.setAlarm(false);
            }
        }

        // check for engine change (turn on instantly if is streamIn)
        if ((oldFlags === flags && oldFlags === 0) || checkFlag(oldFlags, Flags.EngineOn) !== checkFlag(flags, Flags.EngineOn) || streamIn) {
            v.setEngineOn(checkFlag(flags, Flags.EngineOn), streamIn, true);
        }

        // check for lights change
        let oldLightsOn = checkFlag(oldFlags, Flags.LightsOn);
        let newLightsOn = checkFlag(flags, Flags.LightsOn);
        if (oldLightsOn !== newLightsOn || streamIn) {
            v.setLights(newLightsOn ? 2 : 1);
        }

        // check for window change
        if (checkFlag(oldFlags, Flags.Window1) !== checkFlag(flags, Flags.Window1) || streamIn) {
            setWindowOpened(v, 0, checkFlag(flags, Flags.Window1));
        }
        if (checkFlag(oldFlags, Flags.Window2) !== checkFlag(flags, Flags.Window2) || streamIn) {
            setWindowOpened(v, 1, checkFlag(flags, Flags.Window2));
        }
        if (checkFlag(oldFlags, Flags.Window3) !== checkFlag(flags, Flags.Window3) || streamIn) {
            setWindowOpened(v, 2, checkFlag(flags, Flags.Window3));
        }
        if (checkFlag(oldFlags, Flags.Window4) !== checkFlag(flags, Flags.Window4) || streamIn) {
            setWindowOpened(v, 3, checkFlag(flags, Flags.Window4));
        }

        // check for indicator lights
        if (checkFlag(oldFlags, Flags.IndicatorLightRight) !== checkFlag(flags, Flags.IndicatorLightRight) || streamIn) {
            v.setIndicatorLights(0, checkFlag(flags, Flags.IndicatorLightRight));
        }
        if (checkFlag(oldFlags, Flags.IndicatorLightLeft) !== checkFlag(flags, Flags.IndicatorLightLeft) || streamIn) {
            v.setIndicatorLights(1, checkFlag(flags, Flags.IndicatorLightLeft));
        }

        // check for door change
        if (checkFlag(oldFlags, Flags.Door1) !== checkFlag(flags, Flags.Door1) || streamIn) {
            setDoorOpened(v, 0, checkFlag(flags, Flags.Door1));
        }
        if (checkFlag(oldFlags, Flags.Door2) !== checkFlag(flags, Flags.Door2) || streamIn) {
            setDoorOpened(v, 1, checkFlag(flags, Flags.Door2));
        }
        if (checkFlag(oldFlags, Flags.Door3) !== checkFlag(flags, Flags.Door3) || streamIn) {
            setDoorOpened(v, 2, checkFlag(flags, Flags.Door3));
        }
        if (checkFlag(oldFlags, Flags.Door4) !== checkFlag(flags, Flags.Door4) || streamIn) {
            setDoorOpened(v, 3, checkFlag(flags, Flags.Door4));
        }
    }
}

function setDoorOpened(vehicle, door, opened) {
    if (opened) {
        vehicle.setDoorOpen(door, false, false);
    } else {
        vehicle.setDoorShut(door, false);
    }
}

function setWindowOpened(vehicle, window, opened) {
    if (opened) {
        vehicle.rollDownWindow(window);
    } else {
        vehicle.rollUpWindow(window);
    }
}

function checkFlag(flags, value) {
    return (flags & value) ? true : false;
}

function isValidDoor(veh, door) {
    return mp.game.invoke("0x645F4B6E8499F632", veh.handle, door) // Native: _GET_IS_DOOR_VALID
}

function getLength(obj) {
    return Object.keys(obj).length
}

function onPlayerCrashVehicle(damageCaused) {
    mp.game.graphics.startScreenEffect("REDMISTOut", 1500, false);
    mp.events.call("camera:shake", "JOLT_SHAKE", damageCaused*0.08);
    mp.events.callRemote("health:on_player_crash_vehicle", mp.players.local.vehicle.remoteId, damageCaused);

    if (damageCaused > 15) {
        if (crashDetectFadeEnds === 0) {
            mp.events.call("player:toggle_black_screen", true, crashDetectFadeInTime);
        }

        let totalTime = crashDetectFadeInTime + Math.round(damageCaused)*crashDetectFadeTimeMultiplier;
        crashDetectFadeEnds = Math.max(crashDetectFadeEnds, new Date().getTime() + totalTime);
        mp.game.graphics.transitionToBlurred(500);
        //mp.events.call("chat:push", "crashed with damage: " + damageCaused + " for time: " + totalTime);
    }
}

// Prevent boats from moving while on sea
// (when they don't have drivers in) and keep
// the sea calm, for easier sync.

mp.setInterval(() => {
    let now = new Date().getTime();
    let playerPos = mp.players.local.position;

    mp.vehicles.forEachInStreamRange((v) => {
        if (!mp.vehicles.exists(v) || !v.handle) return;

        // freeze unoccupied boats to ease sync
        if (mp.game.vehicle.isThisModelABoat(v.model)) {
            setTimeout(() => {
                if (mp.vehicles.exists(v)) v.freezePosition(v.isSeatFree(-1) ? true : false)
            }, 2000)
        }
        // set entity collision to prevent the helicopter/plane from exploding and freeze if not has pilot
        else if (mp.game.vehicle.isThisModelAHeli(v.model) || mp.game.vehicle.isThisModelAPlane(v.model)) {
            v.setLoadCollisionFlag(true);
            setTimeout(() => {
                if (mp.vehicles.exists(v)) v.freezePosition(v.isSeatFree(-1) ? true : false)
            }, 2000)
        }

        // It will crash client-side if you try to getPedInSeat for a trailer model vehicle (https://wiki.rage.mp/index.php?title=Vehicle::getPedInSeat)
        if (v.getClass() === 11) {
            v.setProofs(false/*bullet*/, false/*fire*/, false/*explosion*/, false/*collision*/, true/*melee*/, true, true, false/*drown*/);
            return;
        }

        if (v.getEngineHealth() > 450) {
            v.setInvincible(false);
            if (v.getPedInSeat(-1) === 0) {
                // proof to almost everything except collisions while not occupied.
                v.setProofs(true, true, true, false, true, true, true, false);
            } else {
                v.setProofs(false/*bullet*/, true/*fire*/, true/*explosion*/, false/*collision*/, true/*melee*/, true, true, false/*drown*/);
            }
        } else {
            // disable damage if engine health is minor than 450 to avoid explosion
            v.setInvincible(true);
        }

        // detect dead vehicles: if staying in water for longer than 10 seconds (and near it)
        let vehiclePosition = v.position;
        let near = mp.game.system.vdist2(vehiclePosition.x, vehiclePosition.y, vehiclePosition.z, playerPos.x, playerPos.y, playerPos.z) < 100*100;
        if (v.handle &&
            near &&
            (v.isDead() === 1 || (v.isInWater() && v.getSubmergedLevel() > 0.9)) &&
            v.getClass() !== 14
        ) {
            if (v.enterWaterTime === 0) {
                v.enterWaterTime = now;
            } else if ((now - v.enterWaterTime) > 7500) {
                v.enterWaterTime = 0;
                mp.events.callRemote("vehicles:on_death", v.remoteId);
            }
        } else {
            v.enterWaterTime = 0;
        }
    });
}, 2000);

mp.setInterval(() => {
    let v = mp.players.local.vehicle;
    if (v !== crashDetectPrevVehicle) {
        crashDetectPrevVehicle = v;
        if (v) {
            crashDetectPrevHP = v.getBodyHealth();
        }
    }

    let time = new Date().getTime();
    if (crashDetectFadeEnds !== 0) {
        mp.game.controls.disableAllControlActions(0); // INPUTGROUP_MOVE
        mp.game.controls.disableAllControlActions(27); // INPUTGROUP_VEH_MOVE_ALL
        mp.game.controls.disableAllControlActions(31); // INPUTGROUP_VEH_HYDRAULICS_CONTROL
        // enable voice, as it's disabled with all those controls
        mp.game.controls.enableControlAction(0, 249, true);

        if (time > crashDetectFadeEnds) {
            crashDetectFadeEnds = 0;
            mp.events.call("player:toggle_black_screen", false, crashDetectFadeOutTime);
            mp.game.graphics.startScreenEffect('ArenaEMPOut', 7500, false);
            mp.game.graphics.transitionFromBlurred(7500);
        }
    }

    if (!v) return;

    let hp = v.getBodyHealth();
    let speed = Math.round(v.getSpeed() * 3.6);

    if (hp < crashDetectPrevHP && Math.abs(crashDetectPrevSpeed - speed) > 2.0) {
        onPlayerCrashVehicle(crashDetectPrevHP - hp);
    }

    crashDetectPrevHP = hp;
    crashDetectPrevSpeed = speed;
}, 20);

// set radio off

mp.setInterval(() => {
    if (mp.players.local.vehicle) {
        mp.game.audio.setRadioToStationName("OFF");
    }
}, 150);

// keep sea level low to ease sync
mp.game.water.setWavesIntensity(0.0);

mp.setInterval(() => {
    mp.game.water.setWavesIntensity(0.0);
}, 5000);

// Body health sync loop. Send every 1 sec the vehicle body health

mp.setInterval(() => {
    let v = mp.players.local.vehicle;
    if (v && v.getPedInSeat(-1) === mp.players.local.handle) {
        mp.events.callRemote("vehicles:on_body_damage_change", v.remoteId, JSON.stringify(getVehicleDamage(v.remoteId)));
        mp.events.callRemote("vehicles:on_dirt_level_change", v.remoteId, v.getDirtLevel() ? v.getDirtLevel() : 0);
    }
}, 1000);

// dispatch entering vehicle events
mp.setInterval(() => {
    let p = mp.players.local;
    let entering = p.getVehicleIsTryingToEnter();
    if (entering !== 0 && entering !== lastEntering) {
        let seat = p.getSeatIsTryingToEnter();
        let v = mp.vehicles.atHandle(entering);
        if (v) {
            mp.events.callRemote("vehicles:on_try_enter", v.remoteId, seat+1);
        }
    }
    lastEntering = entering;

    if (p.vehicle) {
        // changed vehicle, now must find seat.
        let mySeat = getPedSeat(p.vehicle, p);
        if (mySeat !== 255) {
            if (lastVehicle !== p.vehicle.id || lastSeat !== mySeat) {
                mp.events.callRemote("vehicles:on_change", p.vehicle.remoteId, mySeat+1);

                lastVehicle = p.vehicle.id;
                lastSeat = mySeat;

                // forcefully "start" engine of bikes, as bikes are 'always' on
                if (mp.game.vehicle.isThisModelABicycle(p.vehicle.model)) {
                    p.vehicle.setEngineOn(true, false, true);
                }
            }
        }
    } else {
        if (lastVehicle !== -1) {
            lastVehicle = -1;
            mp.events.callRemote("vehicles:on_change", -1, -1);
            lastSeat = 255;
        }
    }
}, 50);

}