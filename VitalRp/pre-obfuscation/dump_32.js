{
const bones = ['door_dside_f', 'door_pside_f', 'door_dside_r', 'door_pside_r', 'bonnet', 'boot'];
const names = ['door', 'door', 'door', 'door', 'hood', 'trunk', 'trunk'];


var fronttrunk = ["polvacca", "bifta", "comet2", "ninef", "ninef2", "jester", "bullet", "penetrator", "ruston", "infernus", "italigtb2", "viseris", "adder", "deveste", "osiris", "locust", "autarch", "cheetah", "furia", "krieger", "pfister811", "reaper", "turismor", "tyrant", "vagner", "xa21", "zorrusso", "nero2", "visione", "zentorno", "entityxf", "comet5", "tempesta", "nero", "sc1", "fmj", "t20", "entity2", "emerus", "prototipo", "tezeract", "thrax", "vacca", "cyclone"];
var polvehs = ["buffalo5pol", "pbuffalo4", "unkamacho", "pdkamacho", "truscout", "nscoutpol", "poltaxi", "centurionlspd", "policeb2", "policeb1", "polmav", "polvacca", "nscoutbcso", "nscoutlspd", "sheriff2", "sheriff2", "fibp3", "buzzard2"];



let target = null;

let raycastMenuOn = false;
let raycastMenuItems = [];
let raycastMenuIndex = 0;


const addRaycastMenuOption = (text) => {
    raycastMenuItems.push(text);
}


const displayRaycastMenu = () => {
    var menuOption = "";
    raycastMenuItems.forEach((text, index) => {
        if (raycastMenuIndex === index) {
            menuOption += (`~n~ ~w~ ${text} [E]`)
        }
        else menuOption += `~n~ ~c~ ${text}`

    })
    return menuOption;
}


const resetRayCastMenu = () => {
    if (raycastMenuOn) return;
    raycastMenuIndex = 0;
    raycastMenuItems = [];

}



const getClosestBone = (raycast) => {
    let data = [];
    bones.forEach((bone, index) => {
        const boneIndex = raycast.entity.getBoneIndexByName(bone);
        const bonePos = raycast.entity.getWorldPositionOfBone(boneIndex);
        if (bonePos) {
            data.push({
                id: index,
                boneIndex: boneIndex,
                name: bone,
                bonePos: bonePos,
                locked: !raycast.entity.doors[index] || !raycast.entity.doors[index] && !raycast.entity.isDoorFullyOpen(index) ? false : true,
                raycast: raycast,
                veh: raycast.entity,
                distance: mp.game.gameplay.getDistanceBetweenCoords(bonePos.x, bonePos.y, bonePos.z, raycast.position.x, raycast.position.y, raycast.position.z, false),
                pushTime: Date.now() / 1000
            });
        }
    })

    return data.sort((a, b) => a.distance - b.distance)[0];
}

const getLocalTargetVehicle = (range = 5.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if (!secondPoint) return null;

    startPosition.z -= 0.3;
    const target = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, (2 | 4 | 8 | 16));
    if (target) { if (typeof (target.entity) === 'number' && target.entity !== 0 && mp.game.entity.isAnObject(target.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(target.entity); } }
    if (target && target.entity.type === 'vehicle' && mp.game.gameplay.getDistanceBetweenCoords(target.entity.position.x, target.entity.position.y, target.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < range) return target;
    return null;
}




let canOpenVehInv = false;

const drawTarget3d = (pos, textureDict = "mpmissmarkers256", textureName = "corona_shade", scaleX = 0.005, scaleY = 0.01) => {
    const position = mp.game.graphics.world3dToScreen2d(pos);
    if (!position) return;
    mp.game.graphics.drawSprite(textureDict, textureName, position.x, position.y, scaleX, scaleY, 0, 0, 0, 0, 200);
}

mp.events.add({
    'render': () => {
        if (!mp.players.local.vehicle && !mp.gui.cursor.visible) {
            const raycast = getLocalTargetVehicle();
            if (raycast && raycast.entity.isDead()) return;



            if (raycast && raycast.entity.getDoorLockStatus() == 1 && raycast.entity.doors && raycast.entity.getClass() !== 13 && raycast.entity.getClass() !== 8 && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 5) {
                raycastMenuItems = [];
                target = getClosestBone(raycast);
                if (!target) return;

                if (target && mp.game.gameplay.getDistanceBetweenCoords(target.bonePos.x, target.bonePos.y, target.bonePos.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 2) {
                    addRaycastMenuOption(`${target.locked ? 'Lock' : 'Open'} ${names[target.id]}`)



                    if (target.id === 4 && fronttrunk.includes(mp.game.vehicle.getDisplayNameFromVehicleModel(raycast.entity.model).toLowerCase())) {
                        addRaycastMenuOption("Open Inventory");
                        if (mp.players.local.getVariable("character_group") === 10 || mp.players.local.getVariable("character_group") === 13) {
                            if (polvehs.includes(mp.game.vehicle.getDisplayNameFromVehicleModel(raycast.entity.model).toLowerCase())) {
                                addRaycastMenuOption("Open Armory");
                            }
                        }
                        canOpenVehInv = true;
                    }

                    else if (target.id > 4 && !fronttrunk.includes(mp.game.vehicle.getDisplayNameFromVehicleModel(raycast.entity.model).toLowerCase())) {
                        addRaycastMenuOption("Open Inventory");
                        if (polvehs.includes(mp.game.vehicle.getDisplayNameFromVehicleModel(raycast.entity.model).toLowerCase())) {
                            addRaycastMenuOption("Open Armory");
                        }
                        canOpenVehInv = true;
                    }
                    else canOpenVehInv = false;


                    if (mp.players.local.hasVariable("AttachedDeadBody") && mp.players.local.getVariable("AttachedDeadBody") != "none") {
                        if (target.id > 0 && names[target.id] != "hood" && names[target.id] != "trunk") {
                            addRaycastMenuOption("Put in vehicle");
                        }
                    }



                    if (mp.players.local.hasVariable("attachedPed") && mp.players.local.getVariable("attachedPed") != null) {
                        if (target.id > 0 && names[target.id] != "hood" && names[target.id] != "trunk") {
                            addRaycastMenuOption("Put player in vehicle");
                        }
                    }

                    if (mp.players.local.hasVariable("attachedCuffedPed") && mp.players.local.getVariable("attachedCuffedPed") != null) {
                        if (target.id > 0 && names[target.id] != "hood" && names[target.id] != "trunk") {
                            addRaycastMenuOption("Put player in vehicle");
                        }
                    }



                    if (raycast.entity.hasVariable(`CarDeadBody${target.id}`) && raycast.entity.getVariable(`CarDeadBody${target.id}`) !== "none") {
                        addRaycastMenuOption("Carry Body");
                    }

                    if (raycast.entity.hasVariable(`CarPlayerBody${target.id}`) && raycast.entity.getVariable(`CarPlayerBody${target.id}`) !== -1) {
                        addRaycastMenuOption("Get Player Out");
                    }

                    drawTarget3d(target.raycast.position);
                    mp.game.graphics.drawText(displayRaycastMenu(), [target.raycast.position.x, target.raycast.position.y, target.raycast.position.z], {
                        font: 0,
                        color: [255, 255, 255, 255],
                        scale: [0.2, 0.2],
                        centre: true
                    });
                    raycastMenuOn = true;
                }
            }

            else if (raycast && raycast.entity.getDoorLockStatus() == 1 && raycast.entity.getClass() === 8 && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 5) {
                raycastMenuItems = [];

                target = raycast;
                target.veh = raycast.entity
                if (polvehs.includes(mp.game.vehicle.getDisplayNameFromVehicleModel(raycast.entity.model).toLowerCase())) {
                    addRaycastMenuOption("Open Armory");
                }
                else {
                    addRaycastMenuOption("Open Inventory");
                }

                drawTarget3d(raycast.entity.position);
                mp.game.graphics.drawText(displayRaycastMenu(), [raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.2, 0.2],
                    centre: true
                });
                raycastMenuOn = true;
                canOpenVehInv = true;

            }

            else {
                canOpenVehInv = false;
                raycastMenuOn = false;
                resetRayCastMenu();
            }

            if (raycast && raycast.entity.getDoorLockStatus() == 1 && raycast.entity.doors && raycast.entity.getClass() !== 13 && raycast.entity.getClass() !== 8 && raycastMenuOn && raycastMenuOn && mp.game.controls.isDisabledControlJustPressed(0, 241)) {

                let max = raycastMenuItems.length;
                raycastMenuIndex--;
                if (raycastMenuIndex < 0) raycastMenuIndex = max - 1;
            }

            if (raycast && raycast.entity.getDoorLockStatus() == 1 && raycast.entity.doors && raycast.entity.getClass() !== 13 && raycast.entity.getClass() !== 8 && raycastMenuOn && mp.game.controls.isDisabledControlJustPressed(0, 242)) {

                let max = raycastMenuItems.length;
                raycastMenuIndex++;
                if (raycastMenuIndex == max) raycastMenuIndex = 0;
            }
        }

    },
    'client.vehicles.sync.doors': (entity, doors) => {
        if (!entity) return;
        if (entity.type !== 'vehicle') return;




        entity.doors = JSON.parse(doors);
        entity.doors.forEach((state, index) => {
            if (state) mp.game.invoke("0x7C65DAC73C35C862", entity.handle, index, false, false);
            else mp.game.invoke("0x93D9BD300D7789E5", entity.handle, index, false);
        })
    },
    'entityStreamIn': (entity) => {
        if (!entity) return;
        if (entity.type !== 'vehicle') return;

        entity.doors = [0, 0, 0, 0, 0, 0, 0];
        //mp.events.callRemote('server.vehicles.get.sync.doors', entity);
    },
});









mp.keys.bind(69, true, () => {
    if (global.phone === true || mp.gui.cursor.visible === true || global.chatopened) return;
    if (target && target.veh.doesExist()) {
        let veh = getLocalTargetVehicle();
        switch (raycastMenuItems[raycastMenuIndex]) {
            case 0:
                if (!mp.gui.cursor.visible && target && target.pushTime + 1 >= Date.now() / 1000 && target.veh.doesExist()) {
                    target.veh.doors[target.id] = !target.veh.doors[target.id];
                    mp.events.callRemote('server.vehicles.sync.doors', target.veh, JSON.stringify(target.veh.doors));
                }
                break;
            case "Open Inventory":

                if (!canOpenVehInv) return;


                if (veh && veh.entity.hasVariable('vehicle_sql_id')) {
                    mp.events.callRemote('OpenCarTrunk', parseInt(veh.entity.getVariable('vehicle_sql_id')));
                    lastCheck = new Date().getTime()
                }


                break;
            case "Open Armory":

                if (!canOpenVehInv) return;

                if (veh && veh.entity.hasVariable('vehicle_sql_id')) {
                    mp.events.callRemote('showarmory', parseInt(veh.entity.getVariable('vehicle_sql_id')));
                    lastCheck = new Date().getTime()
                }


                break;
            case "Put in vehicle":
                let id = mp.players.local.getVariable("AttachedDeadBody");
                mp.events.callRemote('PutDeadBodyInVeh', id, target.id, target.veh.remoteId);
                break;
            case "Put player in vehicle":
                mp.events.callRemote('storebodyevent', target.id, veh.entity.getVariable('uniqueId'));
                break;
            case "Get Player Out":
                let playerid = target.veh.getVariable(`CarPlayerBody${target.id}`);
                mp.events.callRemote('carryinjured', playerid);
                break;
            case "Carry Body":
                let bodyid = target.veh.getVariable(`CarDeadBody${target.id}`);
                mp.events.callRemote('ResetVehicleBody', target.id, target.veh.remoteId);
                mp.events.callRemote('AttachDeadBody', bodyid);

                break;
            default:
                if (!mp.gui.cursor.visible && target && target.pushTime + 1 >= Date.now() / 1000 && target.veh.doesExist()) {
                    target.veh.doors[target.id] = !target.veh.doors[target.id];
                    mp.events.callRemote('server.vehicles.sync.doors', target.veh, JSON.stringify(target.veh.doors));
                };
        }
    }
});


}