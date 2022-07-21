{
function SetVehicleEngine(veh, status){
    if (veh !== undefined && veh !== null && veh.type == 'vehicle' && typeof(veh.getType) != "undefined" && veh.getType() == 2) {
        if (veh.isSeatFree(0)) //Turns engine on instantly if no driver, otherwise it will not turn on
        {
            veh.setEngineOn(status, true, true);
            veh.setUndriveable(true);
            return;
        }
        else {
            veh.setEngineOn(status, false, true);
            veh.setUndriveable(!status); 
            return;
        }
    }
}

mp.events.add("VehStream_PlayerExitVehicleAttempt", (entity) => {
    return;
});


mp.events.add("VehStream_PlayerExitVehicle", (entity) => {
	return;
});

mp.events.add("VehStream_PlayerEnterVehicleAttempt", (entity, seat) => {
	return;
});

mp.events.add("VehStream_SetVehicleDoorStatus_Single", (veh, door, state) => {
    return;
});

mp.events.add("VehStream_SetVehicleDoorStatus", (...args) => {
    return;
});

var DebugValues = false;

mp.events.add("VehStream_Debug", () => {
    DebugValues = !DebugValues;
    if(DebugValues) mp.gui.chat.push("[DEBUG] Debugging Values ON");
    if(!DebugValues) mp.gui.chat.push("[DEBUG] Debugging Values OFF");

});

let SyncTypes = {
    "Door": 0,
    "Engine": 1,
    "Window": 2,
    "Wheel": 3,
    "Indicator": 4,
    "Siren": 5,
    "Convertable": 6,
    "Bulletproof": 7,
    "Dirt": 8,
    "Landinggear": 9,
    "Livery": 10,
    "LiveryEx": 11,
    "Extras": 12,
    "Boatanchor": 13,
    "ColourHex": 14,
    "TyresPopped": 15,
    "Mods": 16,
    "Horn": 17,
    "SirenNew": 18,
    "EMSLights": 19,
    "Lights": 20,
    "Plate": 21,
    "InteriorLight": 22 
};

mp.events.addDataHandler("VehicleSyncData", (entity, value) => 
{
	if (entity.type === "vehicle"){
        let actualData = entity.getVariable('VehicleSyncData');
        if (actualData === null || actualData === undefined)
			return;
        if(actualData.Update === true){
            //mp.gui.chat.push(`VehicleSyncData - ${actualData.UpdateType}`);
            switch(actualData.UpdateType){
                case SyncTypes["Door"]:
                    { 
                        let x = actualData.UpdatePart;    
                        if (actualData.Door[x] == 1)
                            entity.setDoorOpen(x, false, false);
                        else if (actualData.Door[x] == 0)
                            entity.setDoorShut(x, false);
                        else
                            entity.setDoorBroken(x, true);
                        break;
                    }
                case SyncTypes["Engine"]:
                    { 
                        SetVehicleEngine(entity, actualData.Engine);
                        if(actualData.Lights !== undefined && actualData.Lights !== null){
                            SetVehicleLights(entity, actualData.Lights, actualData.Engine);  
                            SetVehicleInteriorLight(entity, actualData.InteriorLight, actualData.Engine);  
                        }
                        break;
                    }
                case SyncTypes["Window"]:
                    { 
                        for (x = 0; x < 4; x++) {
                            if (actualData.Window[x] === 0) {
                                entity.fixWindow(x);
                                entity.rollUpWindow(x);
                            }
                            else if (actualData.Window[x] === 1) {
                                entity.rollDownWindow(x);
                            }
                        }
                        break;
                    }
                case SyncTypes["Wheel"]:
                    { 
                        break;
                    }
                case SyncTypes["Indicator"]:
                    { 
                        entity.setIndicatorLights(0, actualData.Indicator[0]);
                        entity.setIndicatorLights(1, actualData.Indicator[1]);
                        break;
                    }
                case SyncTypes["Siren"]:
                    { 
                        //entity.setSirenSound(actualData.Siren[1]);
                        //entity.setSiren(actualData.Siren[0]);
                        break;
                    }
                case SyncTypes["Convertable"]:
                    { 
                        //Not needed
                        break;
                    }
                case SyncTypes["Bulletproof"]:
                    { 
                        entity.setTyresCanBurst(!actualData.BulletProofTyres)
                        break;
                    }
                case SyncTypes["Dirt"]:
                    { 
                        entity.setDirtLevel(parseInt(actualData.Dirt));
                        break;
                    }
                case SyncTypes["Landinggear"]:
                    { 
                        //Not needed
                        break;
                    }
                case SyncTypes["Livery"]:
                    { 
                        if(actualData.Livery > -1)
                            entity.setLivery(parseInt(actualData.Livery));
                        break;
                    }
                case SyncTypes["LiveryEx"]:
                    { 
                        if(actualData.LiveryEx > -1)
                        entity.setMod(48, parseInt(actualData.LiveryEx));
                        break;
                    }
                case SyncTypes["Extras"]:
                    { 
                        var obj = JSON.parse(actualData.Extras);
                        if(obj.Id > 0){
                            entity.setExtra(1, parseInt(obj.Extra1) ? 0:1);
                            entity.setExtra(2, parseInt(obj.Extra2) ? 0:1);
                            entity.setExtra(3, parseInt(obj.Extra3) ? 0:1);
                            entity.setExtra(4, parseInt(obj.Extra4) ? 0:1);
                            entity.setExtra(5, parseInt(obj.Extra5) ? 0:1);
                            entity.setExtra(6, parseInt(obj.Extra6) ? 0:1);
                            entity.setExtra(7, parseInt(obj.Extra7) ? 0:1);
                            entity.setExtra(8, parseInt(obj.Extra8) ? 0:1);
                            entity.setExtra(9, parseInt(obj.Extra9) ? 0:1);
                            entity.setExtra(10, parseInt(obj.Extra10) ? 0:1);
                            entity.setExtra(11, parseInt(obj.Extra11) ? 0:1);
                            entity.setExtra(12, parseInt(obj.Extra12) ? 0:1);
                        }
                        break;
                    }
                case SyncTypes["Boatanchor"]:
                    { 
                        //entity.setBoatAnchor(actualData.BoatAnchor);
			if (entity.getSpeed() < 10)
                        entity.freezePosition(actualData.BoatAnchor);
                        break;
                    }
                case SyncTypes["ColourHex"]:
                    { 
                        if(actualData.ColourHex[0] != "none"){
                            var hex = actualData.ColourHex[0];
                            entity.setCustomPrimaryColour(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
                        }
                        if(actualData.ColourHex[1] != "none"){
                            var hex = actualData.ColourHex[1]
                            entity.setCustomSecondaryColour(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
                        }
                        break;
                    }
                case SyncTypes["TyresPopped"]:
                    { 
                        if(actualData.TyresPopped == true){
                            for (var i = 0; i <= 10; i++) {
                                entity.setTyreBurst(i, false, 1000);
                            }
                        }else{
                            for (var i = 0; i <= 10; i++) {
                                entity.setTyreFixed(i);
                            }
                        }
                        break;
                    }
                /*case SyncTypes["Mods"]:
                    { 
                        var obj = JSON.parse(actualData.Mods);
                        if(obj.length > 0){
                            for (let i = 0; i < obj.length; i++) {
                                const mod = obj[i];
                                if(entity.getModel() == 903794909 && mod.ModSlotId == 10) continue;
                                
                                if (mod.ModSlotId == 69 || mod.ModSlotId == 55)
                                    entity.setWindowTint(mod.ModIndex);
                                else if (mod.ModSlotId == 62)
                                    entity.setNumberPlateTextIndex(mod.ModIndex);
                                else{
                                    entity.setMod(mod.ModSlotId, mod.ModIndex);
                                    if(mod.ModSlotId == 23 && entity.getClass() == 8)
                                        entity.setMod(24, mod.ModIndex);
                                }
                                
                            }
                        }
                        break;
                    }*/
                case SyncTypes["Horn"]:
                    { 
                        //mp.gui.chat.push(`[DEBUG] Horn: ${JSON.stringify(actualData.HornData)}`);
                        mp.events.call('Client::syncHorn', entity, actualData.HornData.playing, actualData.HornData.sound, actualData.HornData.id);
                        break;
                    }
                case SyncTypes["SirenNew"]:
                    { 
                        //mp.gui.chat.push(`[DEBUG] SirenNew: ${JSON.stringify(actualData.SirenData)}`);
                        mp.events.call('Client::syncSiren', entity, actualData.SirenData.playing, actualData.SirenData.sound, actualData.SirenData.id);
                        break;
                    }
                case SyncTypes["EMSLights"]:
                    { 
                        //mp.gui.chat.push(`[DEBUG] EMSLights: ${JSON.stringify(actualData.EMSData)}`);             
                        mp.events.call('Client::syncLight', entity, actualData.EMSData.siren, actualData.EMSData.sound, actualData.EMSData.code, actualData.EMSData.sirenCode);
                        break;
                    }
                case SyncTypes["Lights"]:
                    { 
                        if(actualData.Engine !== undefined && actualData.Engine !== null){
                            SetVehicleLights(entity, actualData.Lights, actualData.Engine);  
                        }
                        break;
                    }
                case SyncTypes["InteriorLight"]:
                    { 
                        if(actualData.Engine !== undefined && actualData.Engine !== null){
                            SetVehicleInteriorLight(entity, actualData.InteriorLight, actualData.Engine);  
                        }
                        break;
                    }
                case SyncTypes["Plate"]:
                    { 
                        entity.setNumberPlateText(actualData.Plate);
                        break;
                    }
                default: break;
            }
        }
    }
});

function SetVehicleLights(entity, lights, engine){
    if(engine){
        if(lights[0]) entity.setLights(2);
        else entity.setLights(1);

        if(lights[1]) entity.setFullbeam(true);
        else entity.setFullbeam(false);
    }else{
        entity.setLights(1);
        entity.setFullbeam(false);
    }
}

function SetVehicleInteriorLight(entity, light, engine){
    if(light) entity.setInteriorlight(true);
        else entity.setInteriorlight(false);
    return;
    
    if(engine){
        if(light) entity.setInteriorlight(true);
        else entity.setInteriorlight(false);
    }else{
        entity.setInteriorlight(false);
    }
}

//Sync data on stream in
mp.events.add("entityStreamIn", (entity) => {
    try{
        if (entity == null) return 
        if (typeof entity === "undefined") return 

        if (entity.type === "vehicle") {
            var vehicleModel = entity.getModel();
            if(DebugValues){
                mp.gui.chat.push("[DEBUG] Vehicle streamed in - "+ mp.game.vehicle.getDisplayNameFromVehicleModel(vehicleModel));
            }

            let actualData = entity.getVariable('VehicleSyncData');
            /*if(DebugValues)
                    mp.gui.chat.push(`[DEBUG] VehicleSyncData: ${JSON.stringify(actualData)}`);*/

            if (entity != null && entity !== undefined && actualData != null && actualData !== undefined){
                mp.events.call("SyncVehicleAlarm", entity);

                if(actualData.Engine !== undefined){
                    if (actualData.Engine) {
                        entity.setEngineOn(true, true, true);
                    }
                    else {
                        entity.setEngineOn(false, true, true);
                    }
                }
                
                if(actualData.Indicator !== undefined){
                    entity.setIndicatorLights(0, actualData.Indicator[0]);
                    entity.setIndicatorLights(1, actualData.Indicator[1]);
                }
                if(actualData.Siren !== undefined){
                    //entity.setSirenSound(actualData.Siren[1]);
                    //entity.setSiren(actualData.Siren[0]);
                }
                if(actualData.LandingGear !== undefined) entity.setLandingGear(actualData.LandingGear);
                if(actualData.Convertible !== undefined){
                    if(actualData.Convertible)
                        entity.lowerConvertibleRoof(actualData.Convertible);
                }
                if(actualData.Dirt !== undefined) entity.setDirtLevel(actualData.Dirt);
                if(actualData.BulletProofTyres !== undefined) entity.setTyresCanBurst(!actualData.BulletProofTyres);
                if(actualData.BoatAnchor !== undefined && entity.getSpeed() < 10) entity.freezePosition(actualData.BoatAnchor);

                if(actualData.Livery !== undefined && actualData.LiveryEx !== undefined){
                    if(actualData.Livery > -1){
                        entity.setLivery(actualData.Livery);
                    }
                    if(actualData.LiveryEx > -1){
                        entity.setMod(48, actualData.LiveryEx);
                    }
                }
                if(actualData.ColourHex !== undefined){
                    if(actualData.ColourHex[0] != "none"){
                        var hex = actualData.ColourHex[0];
                        entity.setCustomPrimaryColour(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
                    }
                    if(actualData.ColourHex[1] != "none"){
                        var hex = actualData.ColourHex[1];
                        entity.setCustomSecondaryColour(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
                    }
                }
                /*if(actualData.Mods !== undefined){
                    var obj = JSON.parse(actualData.Mods);
                    if(obj.length > 0){
                        for (let i = 0; i < obj.length; i++) {
                            const mod = obj[i];
                            if(entity.getModel() == 903794909 && mod.ModSlotId == 10) continue;
                            
                            if (mod.ModSlotId == 69 || mod.ModSlotId == 55)
                                entity.setWindowTint(mod.ModIndex);
                            else if (mod.ModSlotId == 62)
                                entity.setNumberPlateTextIndex(mod.ModIndex);
                            else{
                                entity.setMod(mod.ModSlotId, mod.ModIndex);
                                if(mod.ModSlotId == 23 && entity.getClass() == 8)
                                    entity.setMod(24, mod.ModIndex);
                            }
                            
                        }
                    }
                }*/
                if(actualData.Extras !== undefined){
                    var obj = JSON.parse(actualData.Extras);
                    if(obj.Id > 0){
                        entity.setExtra(1, obj.Extra1 ? 0:1);
                        entity.setExtra(2, obj.Extra2 ? 0:1);
                        entity.setExtra(3, obj.Extra3 ? 0:1);
                        entity.setExtra(4, obj.Extra4 ? 0:1);
                        entity.setExtra(5, obj.Extra5 ? 0:1);
                        entity.setExtra(6, obj.Extra6 ? 0:1);
                        entity.setExtra(7, obj.Extra7 ? 0:1);
                        entity.setExtra(8, obj.Extra8 ? 0:1);
                        entity.setExtra(9, obj.Extra9 ? 0:1);
                        entity.setExtra(10, obj.Extra10 ? 0:1);
                        entity.setExtra(11, obj.Extra11 ? 0:1);
                        entity.setExtra(12, obj.Extra12 ? 0:1);
                    }
                }
                if(actualData.TyresPopped !== undefined){
                    if(actualData.TyresPopped == true){
                        for (var i = 0; i <= 10; i++) {
                            entity.setTyreBurst(i, false, 1000);
                        }
                    }else{
                        for (var i = 0; i <= 10; i++) {
                            entity.setTyreFixed(i);
                        }
                    }
                }
                if(actualData.Window !== undefined){
                    for (x = 0; x < 4; x++) {
                        entity.fixWindow(x);
                        if (actualData.Window[x] === 0) {
                            entity.rollUpWindow(x);
                        }
                        else if (actualData.Window[x] === 1) {
                            entity.rollDownWindow(x);
                        }
                        /*else {
                            entity.smashWindow(x);
                        }*/
                    }
                }

                if(actualData.HornData !== undefined && actualData.HornData !== null){
                    mp.events.call('Client::syncHorn', entity, actualData.HornData.playing, actualData.HornData.sound, actualData.HornData.id);
                }
                if(actualData.SirenData !== undefined && actualData.SirenData !== null){
                    mp.events.call('Client::syncSiren', entity, actualData.SirenData.playing, actualData.SirenData.sound, actualData.SirenData.id);
                }
                if(actualData.EMSData !== undefined && actualData.EMSData !== null){
                    mp.events.call('Client::syncLight', entity, actualData.EMSData.siren, actualData.EMSData.sound, actualData.EMSData.code, actualData.EMSData.sirenCode);
                }

                if(actualData.Lights !== undefined && actualData.Lights !== null){
                    if(actualData.Engine !== undefined && actualData.Engine !== null){
                        SetVehicleLights(entity, actualData.Lights, actualData.Engine);  
                    }
                }
                if(actualData.InteriorLight !== undefined && actualData.InteriorLight !== null){
                    if(actualData.Engine !== undefined && actualData.Engine !== null){
                        SetVehicleInteriorLight(entity, actualData.InteriorLight, actualData.Engine);  
                    }
                }
                if(actualData.Plate !== undefined){
                    entity.setNumberPlateText(actualData.Plate);
                }
            }
            if(DebugValues)
                mp.gui.chat.push("[DEBUG] vehiclesync.js - END");
        }
    } catch(e){

    }
});

mp.events.add('entityStreamOut', (vehicle) => {
    try{
            //if(DebugValues) mp.gui.chat.push("[DEBUG] Entity streamed out");
            if (vehicle === undefined || vehicle == null || vehicle.type !== 'vehicle') return;
        try {
            if(DebugValues)
                mp.gui.chat.push("[DEBUG] vehiclesync out.js");
        if(mp.vehicles.atRemoteId(vehicle.remoteId).doesExist())
            DeactivateAlarm(vehicle.remoteId); 
        } catch (e) { }
    } catch(e){

    }
});

mp.events.addDataHandler("VehicleAlarmStatus", (entity, value) => 
{
	if (entity.type === "vehicle"){
        mp.events.call("SyncVehicleAlarm", entity);
    }
});


mp.events.add('SyncVehicleAlarm', (vehicle) => {
    //mp.gui.chat.push("[DEBUG] SyncVehicleAlarm");
    if(vehicle == null || vehicle === undefined || vehicle.type !== 'vehicle') return;

    let status = vehicle.getVariable("VehicleAlarmStatus");
    /*if (mp.vehicles.atRemoteId(vehicle.remoteId) == null || mp.vehicles.atRemoteId(vehicle.remoteId) === undefined)
       return;
    if(!mp.vehicles.atRemoteId(vehicle.remoteId).doesExist()) {
        return;
    }*/
    //mp.gui.chat.push("[DEBUG] SyncVehicleAlarm - "+ status);
    if(status !== undefined && status != null && status) {
        ActivateAlarm(vehicle.remoteId);
    }
    else { // no alarm
        DeactivateAlarm(vehicle.remoteId);
        
        // Re-sync lights properly depending on engine status
        var actualData = vehicle.getVariable("VehicleSyncData");
        if(actualData.Engine !== undefined && actualData.Engine !== null && actualData.Lights !== undefined && actualData.Lights !== null){
            SetVehicleLights(vehicle, actualData.Lights, actualData.Engine);  
            SetVehicleInteriorLight(vehicle, actualData.InteriorLight, actualData.Engine);  
        }
    }

});

//#region ALARM_ROUTINE
let vehiclesWithActiveAlarm = [];

function ActivateAlarm(vehicleid) {

    let vehicle = mp.vehicles.atRemoteId(vehicleid);

    if(vehicle == null || vehicle === undefined || vehicle.type !== 'vehicle') return;
    
    let index = -1;
    for(let i = 0; i < vehiclesWithActiveAlarm.length; i++) {
        if(vehiclesWithActiveAlarm[i][0] === vehicleid) {
          index = i;
          break;
        }
     }

    if(index == -1) {
        let loopID = setInterval(AlarmLoop.bind(null, vehicleid), 400);
        vehiclesWithActiveAlarm.push([vehicleid, loopID, true]);
    }
}

function DeactivateAlarm(vehicleid) {

    let index = -1;
    for(let i = 0; i < vehiclesWithActiveAlarm.length; i++) {
        if(vehiclesWithActiveAlarm[i][0] === vehicleid) {
          index = i;
          break;
        }
     }

    if (index !== -1) {
        clearInterval(vehiclesWithActiveAlarm[index][1]);
        vehiclesWithActiveAlarm.splice(index, 1);
    }
}

function AlarmLoop(vehicleid) {

    let v = mp.vehicles.atRemoteId(vehicleid);
        
    if(v == null || v === undefined || v.type !== 'vehicle') {
        DeactivateAlarm(vehicleid);
        return;
    }

    let index = -1;
    for(let i = 0; i < vehiclesWithActiveAlarm.length; i++) { // we in the loop, this must return an index
        if(vehiclesWithActiveAlarm[i][0] === vehicleid) {
          index = i;
          break;
        }
     }

    if(vehiclesWithActiveAlarm[index][2]) {
        v.setLights(2); // lights on
        v.startHorn(400, mp.game.gameplay.getHashKey("HELDDOWN"), false);
    }
    else {
        v.setLights(1); // lights off
    }
    vehiclesWithActiveAlarm[index][2] = !vehiclesWithActiveAlarm[index][2];
}
//#endregion
function distance( v1, v2 )
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}
var print_hud = true;
mp.events.add('render', () => {
    if(mp.players.local.vehicle){
        if(mp.players.local.vehicle.getClass() != 15)
            mp.game.controls.disableControlAction(27, 74, true); //H lights
    }
    
    if (!print_hud)
        return;
    mp.vehicles.forEach(v => {

        if(!v.doesExist()) return;
        if(distance(mp.players.local.position, v.position) > 20.0) return;
        if (v.hasVariable("CarSign")){
            var Text = v.getVariable("CarSign");
            mp.game.graphics.drawText(Text, [v.position.x, v.position.y, v.position.z + 0.3],
            {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [0.37, 0.37],
                outline: true,
                centre: true
            });
        }
    });
});

}