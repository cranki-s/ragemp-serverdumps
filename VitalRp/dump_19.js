{





/*mp.keys.bind(103, true, () => { //5
    if (mp.players.local.vehicle) {
        GetVehicleDeformation(mp.players.local.vehicle);
    }
});

mp.keys.bind(105, true, () => { //5
    if (mp.players.local.vehicle) {
        SetVehicleDeformation(mp.players.local.vehicle);
    }
    
});*/

var vehicleDeformation = [];
var vehicleDeformationInterval = [];





function GetVehicleDeformation(vehicle) {


    const sizeOfVehicle = mp.game.gameplay.getModelDimensions(vehicle.model);
    let X = (sizeOfVehicle.max.x - sizeOfVehicle.min.x) * 0.5
    let Y = (sizeOfVehicle.max.y - sizeOfVehicle.min.y) * 0.5
    let Z = (sizeOfVehicle.max.z - sizeOfVehicle.min.z) * 0.5
    let halfY = Y * 0.5


    var positions = [
        new mp.Vector3(-X, Y, 0.0),
        new mp.Vector3(-X, Y, Z),

        new mp.Vector3(0.0, Y, 0.0),
        new mp.Vector3(0.0, Y, Z),

        new mp.Vector3(X, Y, 0.0),
        new mp.Vector3(X, Y, Z),


        new mp.Vector3(-X, halfY, 0.0),
        new mp.Vector3(-X, halfY, Z),

        new mp.Vector3(0.0, halfY, 0.0),
        new mp.Vector3(0.0, halfY, Z),

        new mp.Vector3(X, halfY, 0.0),
        new mp.Vector3(X, halfY, Z),


        new mp.Vector3(-X, 0.0, 0.0),
        new mp.Vector3(-X, 0.0, Z),

        new mp.Vector3(0.0, 0.0, 0.0),
        new mp.Vector3(0.0, 0.0, Z),

        new mp.Vector3(X, 0.0, 0.0),
        new mp.Vector3(X, 0.0, Z),


        new mp.Vector3(-X, -halfY, 0.0),
        new mp.Vector3(-X, -halfY, Z),

        new mp.Vector3(0.0, -halfY, 0.0),
        new mp.Vector3(0.0, -halfY, Z),

        new mp.Vector3(X, -halfY, 0.0),
        new mp.Vector3(X, -halfY, Z),


        new mp.Vector3(-X, -Y, 0.0),
        new mp.Vector3(-X, -Y, Z),

        new mp.Vector3(0.0, -Y, 0.0),
        new mp.Vector3(0.0, -Y, Z),

        new mp.Vector3(X, -Y, 0.0),
        new mp.Vector3(X, -Y, Z),
    ]


    var deformations = [];
    positions.forEach((pos) => {

        let deformation = vehicle.getDeformationAtPos(pos.x, pos.y, pos.z)
        let damage = mp.game.system.vdist(deformation.x, deformation.y, deformation.z, pos.x, pos.y, pos.z);

        if (damage > 0.0) {
            deformations.push({ Pos: pos, Dmg: damage })
        }
    });
    deformations.forEach((def) => {
        mp.gui.chat.push(`${def.Dmg}`)
    })
    vehicleDeformation[vehicle.remoteId] = [];
    vehicleDeformation[vehicle.remoteId] = deformations;
}

function SetVehicleDeformation(vehicle) {
    const sizeOfVehicle = mp.game.gameplay.getModelDimensions(vehicle.model);
    let radius = mp.game.system.vdist(sizeOfVehicle.max.x, sizeOfVehicle.max.y, sizeOfVehicle.max.z, sizeOfVehicle.min.x, sizeOfVehicle.min.y, sizeOfVehicle.min.z) * 7
    let damageMult = mp.game.system.vdist(sizeOfVehicle.max.x, sizeOfVehicle.max.y, sizeOfVehicle.max.z, sizeOfVehicle.min.x, sizeOfVehicle.min.y, sizeOfVehicle.min.z) * 5
   
    if (vehicleDeformationInterval[vehicle.remoteId]) return;
    vehicleDeformationInterval[vehicle.remoteId] = setInterval(function () {
        mp.gui.chat.push("pizda in el de damage");
        let synced = true;
        vehicleDeformation[vehicle.remoteId].forEach((def) => {
            let deformation = vehicle.getDeformationAtPos(def.Pos.x, def.Pos.y, def.Pos.z);
            if (mp.game.system.vdist(deformation.x, deformation.y, deformation.z, def.Pos.x, def.Pos.y, def.Pos.z) < def.Dmg) {

                vehicle.setDamage(def.Pos.x * 2, def.Pos.y * 2, def.Pos.z * 2, def.Dmg * damageMult, radius, true) 
                synced = false
            }

        });
        if (synced) {
            clearInterval(vehicleDeformationInterval[vehicle.remoteId]);
            vehicleDeformationInterval[vehicle.remoteId] = null;
        }
    }, 10);
}


}