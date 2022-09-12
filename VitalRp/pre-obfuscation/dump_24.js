{
const bones = [];
const names = ['door', 'door', 'door', 'door', 'hood', 'trunk', 'trunk'];
let target = null;

const getClosestBone = (raycast) => {
    let data = [];
    bones.forEach((bone, index) => {
        const boneIndex = raycast.entity.getBoneIndexByName(bone);
        const bonePos = raycast.entity.getWorldPositionOfBone(boneIndex);
        if(bonePos) {
            data.push({
                    id: index, 
                    boneIndex: boneIndex, 
                    name: bone, 
                    bonePos: bonePos, 
                    //locked: !raycast.entity.doors[index] || !raycast.entity.doors[index] && !raycast.entity.isDoorFullyOpen(index) ? false : true, 
                    raycast: raycast,
                    veh: raycast.entity, 
                    distance: mp.game.gameplay.getDistanceBetweenCoords(bonePos.x, bonePos.y, bonePos.z, raycast.position.x, raycast.position.y, raycast.position.z, false),
                    pushTime: Date.now()/1000
            });
        }
    })

    return data.sort((a,b) => a.distance-b.distance)[0];
}

const getLocalTargetVehicle = (range = 5.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if(!secondPoint) return null;

    startPosition.z -= 0.3;
    const target = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, (2 | 4 | 8 | 16));
    if (target) { if (typeof (target.entity) === 'number' && target.entity !== 0 && mp.game.entity.isAnObject(target.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(target.entity); } }
    if(target && target.entity.type === 'vehicle' && mp.game.gameplay.getDistanceBetweenCoords(target.entity.position.x, target.entity.position.y, target.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < range) return target;
    return null;
}

const drawTarget3d = (pos, textureDict = "mpmissmarkers256", textureName = "corona_shade", scaleX = 0.005, scaleY = 0.01) => {
    const position = mp.game.graphics.world3dToScreen2d(pos);
    if(!position) return;
    mp.game.graphics.drawSprite(textureDict, textureName, position.x, position.y, scaleX, scaleY, 0, 0, 0, 0, 200);
}

mp.events.add({
    'render' : () => {
        if(!mp.players.local.vehicle && !mp.gui.cursor.visible) {
            const raycast = getLocalTargetVehicle();

            if(raycast && /*raycast.entity.getDoorLockStatus() == 1 && raycast.entity.doors && raycast.entity.getClass() !== 13 && raycast.entity.getClass() !== 8 && !mp.game.player.isFreeAiming() &&*/ mp.game.gameplay.getDistanceBetweenCoords(raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 7.5) {
    
             target = getClosestBone(raycast);
                if(!target) return;

                drawTarget3d(target.raycast.position);
                mp.game.graphics.drawText(`${target.id}.  ${target.name} - ${target.distance.toFixed(2)}`, [target.raycast.position.x, target.raycast.position.y, target.raycast.position.z], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.2, 0.2],
                    centre: true
                });
            }
        }
    },
    /*'client.vehicles.sync.doors' : (entity, doors, id) => {
        if(entity.type !== 'vehicle') return;

        mp.gui.chat.push('[VehDoors] ' + doors);
        entity.doors = JSON.parse(doors);
        entity.doors.forEach((state, index) => {
            if (index == id) {
                if (state) entity.setDoorOpen(index, false, false);
                else entity.setDoorShut(index, false);
            }
        })
    },*/

});


}