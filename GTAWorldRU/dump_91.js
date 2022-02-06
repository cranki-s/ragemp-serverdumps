{
﻿const localPlayer = mp.players.local;
let flag = false;
let isInVehicle = false;
let dirtLevel = 0.0; //will be loaded from dB
let refTime = 10;
let carwash = false;
let onGoingCarWash = false;
var waterEffects = [];
var x_offset = 1;
let isDriver = false;
let dirtDisabled = false;
var RenderTimeNowCarWash = null;

var CountyZones = ["Mount Chiliad", "Mount Gordo","Grapeseed",
                    "Chiliad Mountain State Wilderness", "Raton Canyon",
                    "Cassidy Creek","San Chianski Mountain Range", 
                    "Sandy Shores", "Grand Senora Desert",
                    "Harmony", "Redwood Lights Track",
                    "Bolingbroke Penitentiary", "RON Alternates Wind Farm",
                    "Tongva Hills", "Tongva Valley",
                    "Great Chaparral", "Tataviam Mountains",
                    "Banham Canyon", "Richman Glen",
                    "Palomino Highlands", "El Burro Heights",
                    "Davis Quartz", "Stab City",
                    "Paleto Forest"
                ];

mp.events.add('render', () => {
    if(Date.now() >= RenderTimeNowCarWash+2500){
        if(localPlayer.vehicle != null && isDriver && !dirtDisabled)
        {
            //Uncomment this if we need to slow down the dirt generating.
            if (!mp.players.local.vehicle.isStatic()){
                let actualData = mp.players.local.vehicle.getVariable('VehicleSyncData');
                if (actualData === null || actualData === undefined)
                    return;
                let lvl = actualData.Dirt;
                const position = mp.players.local.position;
                let zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
                if(CountyZones.includes(zoneName)){
                    mp.players.local.vehicle.setDirtLevel(lvl + 0.002);
                }else{
                    mp.players.local.vehicle.setDirtLevel(lvl + 0.001);
                }
            }
            //mp.gui.chat.push("[DEBUG] Updating Dirt within Render");
            mp.events.callRemote("UpdateDirt", localPlayer.vehicle.getDirtLevel());
        }
        RenderTimeNowCarWash = Date.now();
        isDriver = IsPlayerDriver();
    }else{
        //Uncomment this if we need to slow down the dirt generating.
        if(localPlayer.vehicle != null && !dirtDisabled)
        {
            if (!mp.players.local.vehicle.isStatic()){
                let actualData = mp.players.local.vehicle.getVariable('VehicleSyncData');
                if (actualData === null || actualData === undefined)
                    return;
                let lvl = actualData.Dirt;
                mp.players.local.vehicle.setDirtLevel(lvl);
            }
        }
    }
});

mp.events.add('washCar', () => {
	if (dirtDisabled){ return; }
    if (localPlayer.vehicle && isDriver){
        mp.events.callRemote("UpdateDirt", 0);
        stopWaterParticles();
    }
});

mp.events.add('updateDirtLevel', (vehicle = null) => {
    if (dirtDisabled){ return; }
    var player = mp.players.local;
    var veh;
    if(vehicle == null){
        veh = player.vehicle;
    }
    else{
        veh = vehicle;
    }

	if (veh != null){
        mp.events.callRemote("UpdateDirt", veh.getDirtLevel());
    }
});

function IsPlayerDriver() {
    if(mp.players.local.vehicle) return mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle;
}

function InitializeWaterParticles() {
	if (dirtDisabled){ return; }
    for (let i = 0; i < 3; i++){
        mp.game.graphics.setPtfxAssetNextCall('core');
        waterEffects.push(mp.game.graphics.startParticleFxLoopedOnEntity('water_cannon_jet', localPlayer.vehicle.handle, x_offset, 0, 4.5, -90, 0.0, 0.0, 1.0, false, false, false));
        x_offset = x_offset - 1;
    }
    x_offset = 1; //reset the value - to avoid any future errors. 
}

function stopWaterParticles(){
	if (dirtDisabled){ return; }
    for (let i = 0; i < waterEffects.length; i++){
        mp.game.graphics.stopParticleFxLooped(waterEffects[i], false);
        waterEffects.splice[i];
    }
}

mp.events.add('washProcess', () => {
	if (dirtDisabled){ return; }
    localPlayer.vehicle.freezePosition(true);
    mp.gui.chat.push("Клерк говорит: Пожалуйста оставайтесь внутри транспорта, пока мы не помоем его...");
    InitializeWaterParticles();
    setTimeout(() => {
        mp.gui.chat.push("!{#C2A2DA}* Чистящие щётки очищают ваш автомобиль *");
    }, 5000);
    setTimeout(() => {
        mp.gui.chat.push("Клерк говорит: Наслаждайтесь вашим чистым автомобилем!");
        mp.events.call('washCar');
        localPlayer.vehicle.freezePosition(false);
    }, 10000);
});
/*
mp.events.addDataHandler("DIRT_LEVEL", (entity, value) => {
    if (dirtDisabled){ return; }
    if (entity.type === "vehicle") {
        entity.setDirtLevel(value);
    }
});*/

mp.events.add("EnableDirt", () => {
    dirtDisabled = false;
});

}