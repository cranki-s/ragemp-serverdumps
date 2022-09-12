{
mp.game.audio.setRadioToStationName("OFF");
mp.game.audio.setUserRadioControlEnabled(false);




mp.keys.bind(81, true, () => { //5
    if (mp.keys.isDown(18) === true) {
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
        let streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        streetName = streetName.replaceAll("'", "&apos;");
        mp.events.callRemote("requestBackup", streetName);
    }
   
    else  if (mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) == mp.players.local.handle) {
        if (mp.players.local.vehicle.isSirenOn()) {
            mp.events.callRemote("changeSirenMode", )
        }
        
    }
});

mp.events.addDataHandler('silentSiren', (entity, value, oldValue) => {

    if (entity.getVariable("silentSiren") === true) {
        if (entity.handle !== 0) entity.setSirenSound(true);
    }
    else {
        if (entity.getVariable("silentSiren") === false) {
            if (entity.handle !== 0) entity.setSirenSound(false);
        }
    }
});




var vehicleToUnfreeze = [];
var vehiclesStreamed = [];


mp.events.add('entityStreamIn', (entity) => {

    if (entity.type === 'vehicle') {
        applyPaint(entity);
    }
});


mp.events.addDataHandler('vehiclePaint', (entity, value, oldValue) => {
    applyPaint(entity);
});

function applyPaint(entity) {

        if (entity.hasVariable("vehiclePaint")) {
            paint = entity.getVariable("vehiclePaint").split("%");
            entity.clearCustomPrimaryColour();
            entity.setModColor1(parseInt(paint[0]), parseInt(paint[1]), 0);
            entity.setModColor2(parseInt(paint[3]), parseInt(paint[4]));
            let primRGB = JSON.parse(paint[2])
            let secondRGB = JSON.parse(paint[5])
            entity.setCustomPrimaryColour(Math.abs(primRGB.Red), Math.abs(primRGB.Green), Math.abs(primRGB.Blue));
            entity.setCustomSecondaryColour(Math.abs(secondRGB.Red), Math.abs(secondRGB.Green), Math.abs(secondRGB.Blue));
            entity.setExtraColours(parseInt(paint[6]), parseInt(paint[7]));
        }


        if (entity.hasVariable("silentSiren") && entity.getVariable("silentSiren") === true) {
            entity.setSirenSound(true);
        }

        else if (entity.hasVariable("silentSiren") && entity.getVariable("silentSiren") === false) {
            entity.setSirenSound(false);
        }

        if (entity.hasVariable("attachedToFlatbed") && entity.getVariable("attachedToFlatbed")) return;
        else if (entity.hasVariable("Occupied") && entity.getVariable("Occupied")) return;
        else if (entity.hasVariable("SyncPosition")) entity.position = entity.getVariable("SyncPosition")
    
}









mp.events.addDataHandler('attachedPed', (entity, value, oldValue) => {

    if (value !== null) {
        if (entity.handle && entity.handle != 0){
            mp.players.forEach(target => {
                if (target.getVariable("remoteID") == entity.getVariable('attachedPed')) {
                    
                    loadTargetAttached(entity, target, function () {
                        mp.game.invoke('0x6B9BBD38AB0796DF', target.handle, entity.handle, -1, 0.27, 0.15, 0.63, 0.5, 0.5, 180.0, false, false, false, false, 2, false)
                    })
                }
            })
        }
    }
    else {
        if (oldValue !== null) {
            mp.players.forEach(target => {
                if (target.getVariable("remoteID") == oldValue) {
                    if (target.handle && target.handle > 0) {
                        target.detach(true, true);
                    }
                }
            });
        }
    }
});


mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'player') {
        if (entity.hasVariable('attachedPed') && entity.getVariable('attachedPed') !== null) {
            mp.players.forEach(target => {
                if (target.getVariable("remoteID") == entity.getVariable('attachedPed')) {
                    if (target.handle && target.handle > 0) {
                        loadTargetAttached(entity, target, function () {
                            mp.game.invoke('0x6B9BBD38AB0796DF', target.handle, entity.handle, -1, 0.27, 0.15, 0.63, 0.5, 0.5, 180.0, false, false, false, false, 2, false)
                        })
                    }
                }
            })
        }
        if (entity.hasVariable('Injured') && entity.getVariable('Injured') === 1) {
            if (entity.handle && entity.handle != 0) {
                //entity.setToRagdoll(10000, 10000, 0, false, false, false);
            }
        }
    }
});







mp.events.addDataHandler('attachedCuffedPed', (entity, value, oldValue) => {

    if (value !== null) {
        if (entity.handle && entity.handle != 0) {
            mp.players.forEach(target => {
                if (target.getVariable("remoteID") == entity.getVariable('attachedCuffedPed')) {
                    if (target.handle && target.handle > 0) {
                        entity.walking = false;
                        entity.walkSync = target;

                        loadTargetAttached(entity, target, function () {
                            mp.game.invoke('0x6B9BBD38AB0796DF', target.handle, entity.handle, -1, 0.18, 0.46, 0.00, 0.5, 0.5, 180.0, false, false, false, false, 2, false)
                        })
                    }
                }
            });
        }
        
    }
    else {
        if (oldValue !== null) {
            if (entity.handle && entity.handle > 0 && entity.walkSync && entity.walkSync.handle) {
                entity.walkSync.detach(true, true);
                entity.walkSync.stopAnimTask("mp_arresting", "walk", 1);
                entity.walkSync.stopAnimTask("mp_arresting", "idle", 1);
                
            }
            entity.walkSync = null;
            
             
        }
    }
});






function loadAnimDict(a, b) {
    if (mp.game.streaming.hasAnimDictLoaded(a)) return void b();
    mp.game.streaming.requestAnimDict(a);
    let c = setInterval(function () {
        if (mp.game.streaming.hasAnimDictLoaded(a)) {
            b();
            clearInterval(c);
        }
    }, 100)
}



mp.events.add('render', () => {

    mp.game.controls.disableControlAction(0, 345, true);
    if (mp.players.local.vehicle) {
        mp.game.audio.setRadioToStationName("OFF");
        mp.game.audio.setUserRadioControlEnabled(false);
    }

    mp.players.forEachInRange(mp.players.local.position, 30,
        (entity) => {
            if (entity.walkSync && entity.walkSync !== null) {
                if (mp.players.exists(entity.walkSync)) {
                    if (entity.isWalking() && !entity.walking) {
                        loadAnimDict("mp_arresting", function () {
                            entity.walkSync.taskPlayAnim("mp_arresting", "walk", 1, 0, -1, 1, 1, !1, !1, !1)
                        })
                         entity.walking = true;
                        }
                        
                    
                    else if (!entity.isWalking() && entity.walking) {
                    loadAnimDict("mp_arresting", function () {
                        entity.walkSync.taskPlayAnim("mp_arresting", "idle", 1, 0, -1, 1, 1, !1, !1, !1)
                    })
                        entity.walking = false;
                    }
                }
                else entity.walkSync = null;
            }
            
        });
})



mp.events.add("CehckFullRepair", () => {
    let interior = mp.game.interior.getInteriorAtCoords(-331.20215, -122.48373, 39.013885);
    if (interior === mp.game.invoke("0x2107BA504071A6BB", mp.players.local.handle)) {
        mp.events.callRemote("FullRepairStart")
    }
});


mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'player') {
        if (entity.hasVariable('attachedCuffedPed') && entity.getVariable('attachedCuffedPed') !== null) {
            mp.players.forEach(target => {
                if (target.handle && target.handle > 0) {
                    if (target.getVariable("remoteID") == entity.getVariable('attachedCuffedPed')) {

                        loadTargetAttached(entity, target, function () {
                            mp.game.invoke('0x6B9BBD38AB0796DF', target.handle, entity.handle, -1, 0.3, 0.3, 0.00, 0.5, 0.5, 180.0, false, false, false, false, 2, false)
                        })
                    }
                }
            })
        }

    }});



mp.events.add('playerLeaveVehicle', (vehicle, seat) => {
    if (vehicle !== null) {
       // mp.events.callRemote("SyncDriverVehiclePosition", vehicle.getVariable("uniqueId"), vehicle.getCoords(false));
    }
})





mp.events.addDataHandler('Injured', (entity, value, oldValue) => {
    if (value === 1) {
        if (entity.handle && entity.handle != 0) {
           // entity.setToRagdoll(10000, 10000, 0, false, false, false);
        }
    }
});



let newVehiclestoStream = null;
let vehiclesToRemove = null;

mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'vehicle') {
        entity.setProofs(false, false, false, false, true, false, false, false);
        if (!entity.hasVariable("uniqueId")) return;
        mp.peds.forEach((ped) => {
            if (ped.handle) {
                entity.setNoCollision(ped.handle, false);
                ped.setNoCollision(entity.handle, false);
            }
        });
        for (i = 0; i < 7; i++) {
            entity.setDoorBreakable(i, false);
        }
    }
});








var syncedVehicle = [];
var carSyncInterval = [];
var initialHealth = [];


var inCarDamageController = false;


setInterval(() => {
    if (mp.players.local.vehicle) {
        vehicle = mp.players.local.vehicle
        if (vehicle.getPedInSeat(-1) === mp.players.local.handle) {
            if (inCarDamageController === false) {
                if (vehicle.hasVariable("vehicleHealth") && vehicle.hasVariable("VirginVehicle") && vehicle.getVariable("VirginVehicle") === true) {

                    vehicle.setEngineHealth(vehicle.getVariable("vehicleHealth"))
                    healthEngineLast = vehicle.getVariable("vehicleHealth")

                    healthBodyLast = vehicle.getBodyHealth();

                    healthPetrolTankLast = vehicle.getPetrolTankHealth();
                    mp.events.callRemote("VirgintyDone", vehicle.getVariable("uniqueId"));
                    inCarDamageController = true;
                    
                }
                else {
                    healthEngineLast = vehicle.getEngineHealth()

                    healthBodyLast = vehicle.getBodyHealth()

                    healthPetrolTankLast = vehicle.getPetrolTankHealth();
                    inCarDamageController = true;
                  
                }
            }
            vehPos = vehicle.getCoords(false);
            
            mp.events.callRemote("SyncDriverVehiclePosition", vehicle.getVariable("uniqueId"), vehicle.getCoords(false));
    
     
            controlDamage(vehicle, vehicle.getVariable("uniqueId"))
            
            if (vehicle.getEngineHealth() < 100 && vehicle.getIsEngineRunning()) {
                vehicle.setEngineOn(false, true, true);
            }
        }
        
    }
    else inCarDamageController = false

}, 300)



let skipInterval = true;
let tick = 0;
let syncPosTick = 0;


function loadTargetAttached(a, b, c) {
    if (b.getAttachedTo() == a.handle && b.handle !== 0) return void c();
    let d = setInterval(function () {

        if (b.getAttachedTo() != a.handle && b.handle != 0) {
            c();
            clearInterval(d);
        }

    }, 100)
}

function loadTargetDeAttached(a, b, c) {
    if (b.getAttachedTo() != a.handle && b.handle !== 0) return void c();
    let d = setInterval(function () {

        if (b.getAttachedTo() == a.handle && b.handle != 0) {
            c();
            clearInterval(d);
        }

    }, 100)
}



function drawTestText(text) {
    mp.game.graphics.drawText(`${text}`, [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
        font: 4,
        color: [255, 255, 255, 220 - 20],
        scale: [0.40, 0.40],
        outline: true,
        shadow: true,
        centre: false
    });
}




mp.events.add('createObjectByLoading', (obj) => {
    obj = mp.game.joaat(obj);
    if (!mp.game.streaming.isModelValid(obj)) return;
    mp.game.streaming.requestModel(obj);
    mp.game.streaming.requestCollisionForModel(obj);
    loadObjectModel(obj, function () {
        mp.game.invoke("0x0BC3144DEB678666", obj)
        setTimeout(() => {
            mp.objects.new(obj, new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z), {
                rotation: new mp.Vector3(0, 0, 0),
                alpha: 255,
                dimension: 0
            });
        }, 100);
    });

});




function loadObjectModel(a, b) {
    if (mp.game.streaming.hasModelLoaded(a)) return void b();
    let c = setInterval(function () {

        if (mp.game.streaming.hasModelLoaded(a)) {
            b();
            clearInterval(c);
        }

    }, 100)
}


var exceptionVehicles = ["policeb2", "policeb1"];
mp.events.add("GetFuelCapPosition", (vehicle) => {
    if (vehicle !== null) {
        vehicleDisplayName = mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model).toLowerCase();
        if (exceptionVehicles.includes(vehicleDisplayName)) {
            mp.events.callRemote("GetVehicleFuelCapPosition", vehicle.position.x, vehicle.position.y, vehicle.position.z);
            mp.players.local.taskTurnToFaceCoord(vehicle.position.x, vehicle.position.y, vehicle.position.z, 1000);
        }
        else {
            let petrolcap = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("wheel_rr"));
            mp.events.callRemote("GetVehicleFuelCapPosition", petrolcap.x, petrolcap.y, petrolcap.z);
            mp.players.local.taskTurnToFaceCoord(petrolcap.x, petrolcap.y, petrolcap.z, 1000);
        }
    }
});



mp.events.add("GetRightDoorPosition", (vehicle) => {
    if (vehicle !== null) {
        let petrolcap = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("door_pside_f"));
        mp.events.callRemote("GetVehicleFuelCapPosition", petrolcap.x, petrolcap.y, petrolcap.z);
        mp.players.local.taskTurnToFaceCoord(petrolcap.x, petrolcap.y, petrolcap.z, 1000);
    }
});

mp.events.add("TurnFaceToVehicle", (vehicle) => {
    if (vehicle !== null) {
        let vehpos = vehicle.position;
        mp.players.local.taskTurnToFaceCoord(vehpos.x, vehpos.y, vehpos.z, 1000);
    }
});
mp.events.add("GetClosestPumpFromObject", (object) => {
    let playerPos = mp.players.local.position;
    let objhandle = mp.game.object.getClosestObjectOfType(playerPos.x, playerPos.y, playerPos.z, 1.5, object, false, false, false);
    let position = mp.game.invokeVector3("0x3FEF770D40960D5A", objhandle, false);
    mp.game.invoke('0xFAEE099C6F890BB8', objhandle, true, true, true, true, true, true, 1, true);
    mp.game.invoke('0x5CEC1A84620E7D5B', objhandle, true)
    // 
    mp.events.callRemote("GetClosestPump", position.x, position.y, position.z);
});


let damageFactorBody = 6;
let damageFactorPetrolTank = 32.0;
let engineSafeGuard = 100.0;
let cascadingFailureThreshold = 360.0;
let damageFactorEngine = 2;
let degradingFailureThreshold = 800.0;
let degradingHealthSpeedFactor = 10;
let deformationExponent = 0.4;
let collisionDamageExponent = 0.6;
let engineDamageExponent = 0.6;
let deformationMultiplier = -1;
let weaponsDamageMultiplier = 1.0;

let fCollisionDamageMult = 0.0
let fDeformationDamageMult = 0.0
let fEngineDamageMult = 0.0
let fBrakeForce = 1.0
let isBrakingForward = false
let isBrakingReverse = false

let healthEngineLast = []
let healthEngineCurrent = []
let healthEngineNew = []
let healthEngineDelta = []
let healthEngineDeltaScaled = []

let healthBodyLast = []
let healthBodyCurrent = []
let healthBodyNew = []
let healthBodyDelta = []
let healthBodyDeltaScaled = []

let healthPetrolTankLast = []
let healthPetrolTankCurrent = []
let healthPetrolTankNew = []
let healthPetrolTankDelta = []
let healthPetrolTankDeltaScaled = []

let compatibilityMode = false;

function controlDamage(vehicle, vehId) {
    vehicleClass = vehicle.getClass();
 
    healthEngineCurrent = vehicle.getEngineHealth();
    if (healthEngineCurrent === 1000) {
        healthEngineLast = 1000.0
    }
    healthEngineNew = healthEngineCurrent
    healthEngineDelta = healthEngineLast - healthEngineCurrent
    healthEngineDeltaScaled = healthEngineDelta * damageFactorEngine * classDamageMultiplier[vehicleClass]

    healthBodyCurrent = vehicle.getBodyHealth();
    if (healthBodyCurrent === 1000) {
        healthBodyLast = 1000.0
    }
    healthBodyNew = healthBodyCurrent
    healthBodyDelta = healthBodyLast - healthBodyCurrent
    healthBodyDeltaScaled = healthBodyDelta * damageFactorBody * classDamageMultiplier[vehicleClass]







    healthPetrolTankCurrent = vehicle.getPetrolTankHealth()


    if (healthPetrolTankCurrent === 1000) {
        healthPetrolTankLast = 1000.0
    }
    healthPetrolTankNew = healthPetrolTankCurrent
    healthPetrolTankDelta = healthPetrolTankLast - healthPetrolTankCurrent
    healthPetrolTankDeltaScaled = healthPetrolTankDelta * damageFactorPetrolTank * classDamageMultiplier[vehicleClass]

    if (healthEngineCurrent < 0) return;


    if (healthEngineDelta !== 0 || healthBodyDelta !== 0 || healthPetrolTankDelta !== 0) {


    
     
        let healthEngineCombinedDelta = Math.max(healthEngineDeltaScaled, healthBodyDeltaScaled, healthPetrolTankDeltaScaled)

        

        

        healthEngineNew = healthEngineLast - (healthEngineCombinedDelta/2.5)

        
        
 
        
        if (healthEngineNew != healthEngineCurrent) {
            vehicle.setEngineHealth(healthEngineNew)

        }
        if (healthBodyNew != healthBodyCurrent) vehicle.setBodyHealth(healthBodyNew)

        if (healthPetrolTankNew != healthPetrolTankCurrent) vehicle.setPetrolTankHealth(healthPetrolTankNew)


        healthEngineLast = healthEngineNew

        healthBodyLast = healthBodyNew

        healthPetrolTankLast = healthPetrolTankNew
    
        

    }

    fDeformationDamageMult = vehicle.getHandling('CHandlingData', 'fDeformationDamageMult');
    fBrakeForce = vehicle.getHandling('CHandlingData', 'fBrakeForce');
    newFDeformationDamageMult = fDeformationDamageMult ^ deformationExponent
    vehicle.setHandling('CHandlingData', 'fDeformationDamageMult', newFDeformationDamageMult * deformationMultiplier) 
    vehicle.setHandling('CHandlingData', 'fWeaponDamageMult', weaponsDamageMultiplier / damageFactorBody)



    fCollisionDamageMult = vehicle.getHandling('CHandlingData', 'fCollisionDamageMult')

    newFCollisionDamageMultiplier = fCollisionDamageMult ^ collisionDamageExponent
    vehicle.setHandling('CHandlingData', 'fCollisionDamageMult', newFCollisionDamageMultiplier);

    
    fEngineDamageMult = vehicle.getHandling('CHandlingData', 'fEngineDamageMult')
    let newFEngineDamageMult = fEngineDamageMult ^ engineDamageExponent
    vehicle.setHandling('CHandlingData', 'fEngineDamageMult', newFEngineDamageMult)




}



classDamageMultiplier = {
    '0' : '1.0' ,
    '1': '1.0',
    '2': '1.0',
    '3': '1.0',
    '4': '1.0',
    '5': '1.0',
    '6': '1.0',
    '7': '1.0',
    '8': '0.25',
    '9': '0.7',
    '10': '0.25',
    '11': '1.0',
    '12': '1.0',
    '13': '1.0',
    '14': '0.5',
    '15': '1.0',
    '16': '1.0',
    '17': '1.0',
    '18': '0.75',
    '19': '0.75',
    '20': '1.0',
    '21': '1.0',
    }





/*mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === 'object') {
        mp.console.logInfo("aici pompa")
        if (entity.model == mp.game.joaat("prop_gas_pump_1d")) {

            mp.game.invoke('0xFAEE099C6F890BB8', entity.handle, true, true, true, true, true, true, 1, true);
            mp.game.invoke('0x5CEC1A84620E7D5B', entity.handle, true)
        }



    }
    if (entity.type === 'vehicle') {
        mp.gui.chat.push(`${JSON.stringify(damage3)}`)
        mp.gui.chat.push(`${JSON.stringify(damage1)}`)
        mp.gui.chat.push(`${JSON.stringify(damage2)}`)
        mp.gui.chat.push(`${JSON.stringify(damage4)}`)

        const sizeofVehicle = mp.game.gameplay.getModelDimensions(entity.model);

        setTimeout(() => {
            if (damage1 && damage1.x != 0) damage1 = entity.setDamage(sizeofVehicle.max.x, sizeofVehicle.min.x, sizeofVehicle.max.z, 200, 200, true)
        }, 10)

        setTimeout(() => {
            if (damage2 && damage2.x != 0) damage2 = entity.setDamage(sizeofVehicle.max.x, sizeofVehicle.max.y, sizeofVehicle.max.z, 200, 200, true)
        }, 30)
        setTimeout(() => {
            if (damage3 && damage3.x != 0) damage3 = entity.setDamage(sizeofVehicle.min.x, sizeofVehicle.max.y, sizeofVehicle.max.z , 200, 200, true)
        }, 50)
        setTimeout(() => {
            if (damage4 && damage4.x != 0) damage4 = entity.setDamage(sizeofVehicle.min.x, sizeofVehicle.min.y, sizeofVehicle.max.z, 200, 200, true)
        }, 70)
    }
});*/





let damage1 = null;
let damage2 = null;
let damage3 = null;
let damage4 = null;

/*mp.events.add("entityStreamOut", (entity) => {
    if (entity.type === 'vehicle') {

        const sizeofVehicle = mp.game.gameplay.getModelDimensions(entity.model);



        damage1 = entity.getDeformationAtPos(sizeofVehicle.max.x, sizeofVehicle.min.x, sizeofVehicle.max.z/2)
        damage2 = entity.getDeformationAtPos(sizeofVehicle.max.x, sizeofVehicle.max.y, sizeofVehicle.max.z/2)
        damage3 = entity.getDeformationAtPos(sizeofVehicle.min.x, sizeofVehicle.max.y, sizeofVehicle.max.z/2)
        damage4 = entity.getDeformationAtPos(sizeofVehicle.min.x, sizeofVehicle.min.y, sizeofVehicle.max.z/2)

    }
});*/

mp.events.add("GetCarTrunkPosition", (vehicled, bone_r, bone_l) => {
    let playerPos = mp.players.local.position;
    let vehHandle = vehicled.handle;
    let vehicle = mp.vehicles.atHandle(vehHandle);
    if (vehicle !== null) {
        let boneright = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(`${bone_r}`));
        let boneleft = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(`${bone_l}`));
        let middlepoint = new mp.Vector3((boneright.x + boneleft.x) / 2, (boneright.y + boneleft.y) / 2, (boneright.z + boneleft.z) / 2);
        if (boneright.z === 0 && boneright.y === 0 && boneright.x === 0 || boneleft.z === 0 && boneleft.y === 0 && boneleft.x) {
            boneright = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(`reversinglight_l`));
            boneleft = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(`reversinglight_r`));
            middlepoint = new mp.Vector3((boneright.x + boneleft.x) / 2, (boneright.y + boneleft.y) / 2, (boneright.z + boneleft.z) / 2);
        }
        else if (boneright.z === 0 && boneright.y === 0 && boneright.x === 0 || boneleft.z === 0 && boneleft.y === 0 && boneleft.x) {
            boneright = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(`taillight_l`));
            boneleft = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(`taillight_r`));
            middlepoint = new mp.Vector3((boneright.x + boneleft.x) / 2, (boneright.y + boneleft.y) / 2, (boneright.z + boneleft.z) / 2);
        }
        mp.events.callRemote("GetTrunkPosition", middlepoint.x, middlepoint.y, middlepoint.z);
        if (boneright.z != 0 && boneright.y != 0 && boneright.x != 0 || boneleft.z != 0 && boneleft.y != 0 && boneleft.x) {
            mp.players.local.taskTurnToFaceCoord(middlepoint.x, middlepoint.y, middlepoint.z, 1000);
        }
    }
});

mp.events.add("GetCarTrunkPositionV2", (vehicled, bonename) => {
   
    let vehHandle = vehicled.handle;
    let vehicle = mp.vehicles.atHandle(vehHandle);
    if (vehicle !== null) {
        const boneIndex = vehicle.getBoneIndexByName(bonename);
        const bonePos = vehicle.getWorldPositionOfBone(boneIndex);
        mp.events.callRemote("GetTrunkPosition", bonePos.x, bonePos.y, bonePos.z);
        if (bonePos.z != 0 && bonePos.y != 0 && bonePos.x != 0) {
            mp.players.local.taskTurnToFaceCoord(bonePos.x, bonePos.y, bonePos.z, 1000);
        }
    }
});








mp.events.add("GoToBonePosition", (bone, vehicle) => {
    if (vehicle !== null) {
        let boneposition = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(`${bone}`));
        mp.events.callRemote("TeleportToBone", boneposition.x, boneposition.y, boneposition.z);
    }
});

mp.events.add("GetCarBonePosition", (bone, vehicle) => {
    if (vehicle !== null) {
        let boneposition = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(`${bone}`));
        mp.events.callRemote("UpdateBonePosition", boneposition.x, boneposition.y, boneposition.z);
        mp.players.local.taskTurnToFaceCoord(boneposition.x, boneposition.y, boneposition.z, 1000);
    }
});


/*mp.events.add('render', () => {
    if (mp.players.local.vehicle) {
        drawTestText(`${mp.players.local.vehicle.getTrailer(mp.players.local.vehicle.handle)} - ${mp.players.local.vehicle.isAttachedToTrailer()}`);
    }
});*/


/**mp.keys.bind(69, true, () => {
    if (mp.players.local.vehicle) {
        if (mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle)
            mp.events.callRemote("SetVehicleHorn", true)
        
    }
});

mp.keys.bind(69, false, () => {
    if (mp.players.local.vehicle) {
        if (mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle)
        mp.events.callRemote("SetVehicleHorn", false)
    }
});*/

/*mp.events.add('playerLeaveVehicle', (vehicle, seat) => {
    if (seat === -1) {
        if (mp.players.local.vehicle && mp.players.local.hasVariable("vehicleHorn") && mp.players.local.getVariable("vehicleHorn")) {
            vehicle.startHorn(0, mp.game.joaat("NORMAL"), false);
            mp.events.callRemote("SetVehicleHorn", false)
        }
    }
});*/
}