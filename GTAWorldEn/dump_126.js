{
let localPlayer = mp.players.local;
let towedVehicle = [];

function CreateClientTowedVehicle(entity, data){
    try {
        if (towedVehicle[entity.remoteId] != null || towedVehicle[entity.remoteId] != undefined){
            towedVehicle[entity.remoteId].destroy();
            towedVehicle[entity.remoteId] = null;
        }

        let VehicleData = JSON.parse(data);
        towedVehicle[entity.remoteId] = mp.vehicles.new(VehicleData.Model, new mp.Vector3(entity.position.x, entity.position.y, entity.position.z),
        {
            numberPlate: VehicleData.Plate,
            
        });
        
        if(VehicleData.Color1RGB != null || VehicleData.Color2RGB != null ){
            towedVehicle[entity.remoteId].setCustomPrimaryColour(hexToRgb(VehicleData.Color1RGB).r, hexToRgb(VehicleData.Color1RGB).g, hexToRgb(VehicleData.Color1RGB).b);
            towedVehicle[entity.remoteId].setCustomSecondaryColour(hexToRgb(VehicleData.Color2RGB).r, hexToRgb(VehicleData.Color2RGB).g, hexToRgb(VehicleData.Color2RGB).b);
        }else{
            towedVehicle[entity.remoteId].setColours(VehicleData.Color1, VehicleData.Color2);
        }
        if(VehicleData.Livery > 0)
            towedVehicle[entity.remoteId].setLivery(VehicleData.Livery);
        if(VehicleData.WheelColor <= 159)
            towedVehicle[entity.remoteId].wheelColor = VehicleData.WheelColor;
        //towedVehicle[entity.remoteId].setWheelType(VehicleData.WheelType);

        for (const mod in VehicleData.Mods) {
            /*if(VehicleData.Mods[mod].ModSlotId == 23){
                towedVehicle[entity.remoteId].setMod(24, VehicleData.Mods[mod].ModIndex);
            }*/
            if(VehicleData.Mods[mod].ModSlotId != 23)
                towedVehicle[entity.remoteId].setMod(VehicleData.Mods[mod].ModSlotId, VehicleData.Mods[mod].ModIndex);
        }
        if(VehicleData.Extras != null){
            towedVehicle[entity.remoteId].setExtra(1, VehicleData.Extras.Extra1 ? 0:1);
            towedVehicle[entity.remoteId].setExtra(2, VehicleData.Extras.Extra2 ? 0:1);
            towedVehicle[entity.remoteId].setExtra(3, VehicleData.Extras.Extra3 ? 0:1);
            towedVehicle[entity.remoteId].setExtra(4, VehicleData.Extras.Extra4 ? 0:1);
            towedVehicle[entity.remoteId].setExtra(5, VehicleData.Extras.Extra5 ? 0:1);
            towedVehicle[entity.remoteId].setExtra(6, VehicleData.Extras.Extra6 ? 0:1);
            towedVehicle[entity.remoteId].setExtra(7, VehicleData.Extras.Extra7 ? 0:1);
            towedVehicle[entity.remoteId].setExtra(8, VehicleData.Extras.Extra8 ? 0:1);
            towedVehicle[entity.remoteId].setExtra(9, VehicleData.Extras.Extra9 ? 0:1);
        }

        var ZOffset = 0;
        var min = 0;
        var dimensions = mp.game.gameplay.getModelDimensions(VehicleData.Model);
        if (dimensions !== null)  var min = dimensions.min;

        if(min.z <= -1) ZOffset = 1.4;
        else if(min.z <= -0.95) ZOffset = 1.35;
        else if(min.z <= -0.9)  ZOffset = 1.3;
        else if(min.z <= -0.85) ZOffset = 1.25;
        else if(min.z <= -0.8)  ZOffset = 1.2;
        else if(min.z <= -0.75) ZOffset = 1.15;
        else if(min.z <= -0.7)  ZOffset = 1.1;
        else if(min.z <= -0.65) ZOffset = 1.05;
        else if(min.z <= -0.6)  ZOffset = 1;
        else if(min.z <= -0.55) ZOffset = 0.95;
        else if(min.z <= -0.5)  ZOffset = 0.9;
        else if(min.z <= -0.4)  ZOffset = 0.85;
        else if(min.z <= -0.35) ZOffset = 0.8;
        else if(min.z <= -0.3)  ZOffset = 0.7;
        else if(min.z <= -0.2)  ZOffset = 0.6;
        else if(min.z <= -0.1)  ZOffset = 0.5;
        
        if(entity.getModel() == 2037834373){
            towedVehicle[entity.remoteId].attachTo(entity.handle, 42, 0, -3.4,(ZOffset-2.2), 0, 0, 0, true, true, false, false, 0, true);
        }else if(entity.getModel() == 4285564673){
            towedVehicle[entity.remoteId].attachTo(entity.handle, 0, 0, -3.4, (ZOffset-0.25), 5, 0, 0, true, true, false, false, 0, true);
        }else{
            towedVehicle[entity.remoteId].attachTo(entity.handle, 0, 0, -2, ZOffset, 0, 0, 0, true, true, false, false, 0, true);
        }
    } catch {}
}

mp.events.addDataHandler("TOWED_VEHICLE", (entity, JSON) => {
    if (entity.type == "vehicle"){
        if (JSON != null || JSON != undefined){
            if(entity.doesExist()){
                CreateClientTowedVehicle(entity, JSON);   
            }
        }
    }
});

mp.events.addDataHandler("DETACH_VEHICLE", (entity, value) => {
    if (entity.type == "vehicle"){
        if (value != null || value != undefined){
            if (value == true){
                let JSON = entity.getVariable("TOWED_VEHICLE");
                if (JSON == null || JSON == undefined) return;
                if (towedVehicle[entity.remoteId] != null || towedVehicle[entity.remoteId] != undefined){
                    towedVehicle[entity.remoteId].destroy();
                    towedVehicle[entity.remoteId] = null;
                }
            }
        }
    }
});

mp.events.add('entityStreamIn', (entity) => {
    try{
        if (entity === undefined || entity == null || entity.type !== 'vehicle') return;
        if(DebugValues)
                mp.gui.chat.push("[DEBUG] flatbedclient.js");
        if (entity.hasVariable("TOWED_VEHICLE")){
            let data = entity.getVariable("TOWED_VEHICLE");

            if (data == null || data == undefined) return;
            CreateClientTowedVehicle(entity, data);
        }
        if(DebugValues)
                mp.gui.chat.push("[DEBUG] flatbedclient.js - END");
    } catch(e){

    }
});

mp.events.add('entityStreamOut', (entity) => {
    try{
        if (entity === undefined || entity == null || entity.type !== 'vehicle') return;
        if(DebugValues)
                mp.gui.chat.push("[DEBUG] flatbedclient out.js");
        if (entity.hasVariable("TOWED_VEHICLE") && entity != localPlayer.vehicle){

            if (towedVehicle[entity.remoteId] != null || towedVehicle[entity.remoteId] != undefined){
                towedVehicle[entity.remoteId].destroy();
                towedVehicle[entity.remoteId] = null;
            }
        }
    } catch(e){

    }
});

}