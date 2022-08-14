{
var res = mp.game.graphics.getScreenActiveResolution(0, 0);

let floors = [];
let walls = [];
let cellings = [];
let doors = [];


let builder = false;

let MOVE_SENSITIVTY = 50;
let ROT_SENSITIVITY = 800;

let selObj = null;
let oldPos;
let oldRot;
let mode = 'Move';
let curBtn;
let oldcursorPos = [0, 0];

let xbox;
let ybox;
let zbox;
let switchbox;
let groundbox;
let cancelbox;
let savebox;

let snapMarker = null;

let oBjectWindow = null;



let snapObject = null;



let wallModels = ["soupdoorwall001", "Soupfloor001", "soupwall002", "soupwindwall002", "Souproof001", "v_ilev_housedoor1"];
let wallHashes = [];

function getHashes() {
    wallModels.forEach((wall) => {
        wallHashes.push(mp.game.joaat(wall));
    });
}

getHashes();

mp.events.add('objecteditor:start', (objid) => {
    mp.gui.cursor.show(true, true);
    selObj = mp.objects.at(objid);
    selObj.setCollision(false, false);
    oldPos = selObj.position;
    oldRot = selObj.rotation;
});

let floorsLoaded = false;
let doorsLoaded = false;
let cellingsLoaded = false;
let wallsLoaded = false;


let builtIndex = 0;
let houseObjects = [];

let doneIndex = 0;



mp.events.add('BuildHouse', (buildList, dimension, type, position = null) => {
    awaitConstruction(buildList, dimension, type, position)

});

function waitEntity(entity, bindex) {
    return new Promise(resolve => {
        let wait = setInterval(() => {
            if (mp.game.entity.isAnEntity(entity.handle)) {
                if (entity.Hash === 1436076651) {


                  let label = mp.labels.new(`${entity.objId}`, entity.getOffsetFromInWorldCoords(0, 1, 0),
                        {
                            los: false,
                            font: 0,
                            drawDistance: 50,
                            dimension: mp.players.local.dimension
                        });
                }

               /*   let label = mp.labels.new(`${entity.objId}`, entity.getOffsetFromInWorldCoords(0, 1, 0),
                    {
                        los: false,
                        font: 0,
                        drawDistance: 50,
                        dimension: mp.players.local.dimension
                    });*/

                if (entity.objType === "PlayerBuildedDoors") {


                    mp.game.object.setStateOfClosestDoorOfType(entity.model, entity.position.x, entity.position.y, entity.position.z, false, 0, false)
                }
                clearInterval(wait);
                resolve(bindex);

            }
        }, 3);
    });
}

var vertexes = new Map();





async function awaitConstruction(buildList, dimension, type, position = null) {
    let objects = JSON.parse(buildList);
    while (mp.players.local.dimension !== dimension) await mp.game.waitAsync(0);
    var promises = [];
    

    objects.forEach((obj, index) => {
        houseObjects[builtIndex] = mp.objects.new(obj.Hash, obj.Position,
            {
                rotation: obj.Rotation,
                alpha: 255,
                dimension: dimension
            });
        if (type === 'MainWalls' || type === 'MainCellings' || type === 'MainDoors' || type === 'MainFloors') {
            if (type === 'MainWalls') {
                let added = false;
                for (var [key, value] of vertexes) {

                    if (Math.abs(key - obj.Position.z) < 0.5) {

                        value.ObjIndex.push(builtIndex);
                        added = true;
                    }
                }
                if (added === false) {
                    vertexes.set(obj.Position.z, { ObjIndex: [] });
                    vertexes.get(obj.Position.z).ObjIndex.push(builtIndex)
                }


            }
            houseObjects[builtIndex].baseBuild = true;
        }

        if (obj.LinkedInv > 0) {
            houseObjects[builtIndex].houseInv = obj.LinkedInv;

        }

        houseObjects[builtIndex].objType = type;
        houseObjects[builtIndex].objId = obj.Id;
        houseObjects[builtIndex].Hash = obj.Hash;
        let promise = waitEntity(houseObjects[builtIndex], builtIndex)
        promises.push(promise);
        builtIndex++;

    })

    Promise.all(promises)
        .then(results => {
            if (position) {
                mp.events.callRemote("EnterHouse", position);
            }
            if (type === "MainWalls") {
                for (var vertex of vertexes.values()) {
                    createNewListByPosition(vertex.ObjIndex);
                }
            }
        })


}

var currentHousePolygons = [];

function createNewListByPosition(list) {
    let positions = [];
    let distance = 0;
    let index = 0;
    let firstside = [];
    let secondside = [];

    const sizeOfObject = mp.game.gameplay.getModelDimensions(houseObjects[list[0]].model);
    let dist = (sizeOfObject.max.y - sizeOfObject.min.y) / 2;
    let height = (sizeOfObject.max.z - sizeOfObject.min.z) / 2;

    for (i = 0; i < list.length; i++) {
        firstside.push(houseObjects[list[i]].getOffsetFromInWorldCoords(0, dist, (0 - height)));
        secondside.push(houseObjects[list[i]].getOffsetFromInWorldCoords(0, (0 - dist), (0 - height)))
    }

    while (list.length > 0) {
        if (list.length > 1) {
            if (positions.length === 0) {

                let newPos = firstside[0];
                let secPos = secondside[0];
                list.splice(0, 1);
                firstside.splice(0, 1);
                secondside.splice(0, 1);
                positions.push(newPos);
                positions.push(secPos);
            }
            else {
                let position = positions[positions.length - 1]
                for (var i = 0; i < list.length; i++) {
                    if (i === 0) {

                        distance = mp.game.system.vdist(position.x, position.y, position.z, firstside[0].x, firstside[0].y, firstside[0].z);
                        let d2 = mp.game.system.vdist(position.x, position.y, position.z, secondside[0].x, secondside[0].y, secondside[0].z);
                        if (distance > d2) {
                            distance = d2;
                        }
                        distance = distance + mp.game.system.vdist(position.x, position.y, position.z, houseObjects[list[0]].position.x, houseObjects[list[0]].position.y, houseObjects[list[0]].position.z)
                        index = 0;
                    }
                    else {
                        let distancev2 = mp.game.system.vdist(position.x, position.y, position.z, firstside[i].x, firstside[i].y, firstside[i].z);
                        let dv2 = mp.game.system.vdist(position.x, position.y, position.z, secondside[i].x, secondside[i].y, secondside[i].z);
                        if (distancev2 > dv2) {
                            distancev2 = dv2;
                        }
                        distancev2 = distancev2 + mp.game.system.vdist(position.x, position.y, position.z, houseObjects[list[i]].position.x, houseObjects[list[i]].position.y, houseObjects[list[i]].position.z)
                        if (distancev2 < distance) {
                            distance = distancev2;
                            index = i;
                        }
                    }
                }


                let newDist = mp.game.system.vdist(position.x, position.y, position.z, firstside[index].x, firstside[index].y, firstside[index].z);
                let newDistV2 = mp.game.system.vdist(position.x, position.y, position.z, secondside[index].x, secondside[index].y, secondside[index].z);
                let newPos = firstside[index];
                let secPos = secondside[index];


                    if (newDist > 2.8 && newDistV2 > 2.8) {
                        let poliheight = (sizeOfObject.max.y - sizeOfObject.min.y);
                        let polId = mp.polygons.add(positions, poliheight + 0.2, { visible: false, dimension: mp.players.local.dimension });
                        currentHousePolygons.push(polId);
                        createNewListByPosition(list);
                        break;
                    }
                    else if (newDist > newDistV2) {
                        newPos = secondside[index];
                        secPos = firstside[index];
                    }
                
            
                list.splice(index, 1);
                firstside.splice(index, 1);
                secondside.splice(index, 1);
                positions.push(newPos);
                positions.push(secPos)

            }
        }
        else {
            let position = positions[positions.length - 1]
            let newDist = mp.game.system.vdist(position.x, position.y, position.z, firstside[0].x, firstside[0].y, firstside[0].z);
            let newDistV2 = mp.game.system.vdist(position.x, position.y, position.z, secondside[0].x, secondside[0].y, secondside[0].z);
            let newPos = firstside[0];
            let secPos = secondside[0];
   
                if (newDist > newDistV2) {
                    newPos = secondside[0];
                    secPos = firstside[0];
                }
            

            list.splice(0, 1);
            firstside.splice(0, 1);
            secondside.splice(0, 1);
            positions.push(newPos);
            positions.push(secPos)
            let poliheight = (sizeOfObject.max.y - sizeOfObject.min.y);
            let polId = mp.polygons.add(positions, poliheight + 0.2, { visible: false, dimension: mp.players.local.dimension });
            currentHousePolygons.push(polId);
        }

    }

}




mp.events.add("CreateHouseItem", (obj, type) => {
    newObj = JSON.parse(obj)
    houseObjects[builtIndex] = mp.objects.new(newObj.Hash, newObj.Position,
        {
            rotation: newObj.Rotation,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    if (newObj.LinkedInv > 0) {
        houseObjects[builtIndex].houseInv = newObj.LinkedInv;

    }
    if (type === "PlayerBuildedDoors") {
        while (!houseObjects[builtIndex].handle && houseObjects[builtIndex].handle === 0) mp.game.wait(0);
        mp.game.object.setStateOfClosestDoorOfType(houseObjects[builtIndex].model, newObj.Position.x, newObj.Position.y, newObj.Position.z, false, 0, false)
    }
    houseObjects[builtIndex].position = newObj.Position;
    houseObjects[builtIndex].rotation = newObj.Rotation;
    houseObjects[builtIndex].objId = newObj.Id;
    houseObjects[builtIndex].objType = type;
    builtIndex++;
});



mp.events.add('destroyTheHouse', (dimension) => {
    for (i = 0; i < builtIndex; i++) {
        if (houseObjects[i]) {
            if (mp.objects.exists(houseObjects[i])) houseObjects[i].destroy();
            houseObjects[i] = null;

        }
    }

    currentHousePolygons.forEach((id) => {
         mp.polygons.remove(id);
    });
    builtIndex = 0;
    vertexes = new Map();

    mp.events.callRemote("ExitHouse");
})



mp.events.add("UpdateHouseItem", (id, model, position, rotation, type) => {
    for (i = 0; i < builtIndex; i++) {
        if (houseObjects[i]) {
            if (mp.objects.exists(houseObjects[i])) {
                if (houseObjects[i].objId === id && houseObjects[i].objType === type) {
                    houseObjects[i].model = model;
                    houseObjects[i].position = position;
                    houseObjects[i].rotation = rotation;
                }
            }

        }
    }
});

mp.events.add("RemoveHouseItem", (id) => {
    for (i = 0; i < builtIndex; i++) {
        if (houseObjects[i]) {
            if (mp.objects.exists(houseObjects[i])) {
                if (houseObjects[i].objId === id) {
                    houseObjects[i].destroy();
                    houseObjects[i] = null;

                }
            }

        }
    }
});






mp.events.add('createBuildObject', (objectName) => {
    if (selObj) selObj.destroy();
    let spawnPos = mp.players.local.getOffsetFromInWorldCoords(0, 0, -5);
    let object = mp.objects.new(mp.game.joaat(objectName), spawnPos,
        {
            rotation: 0,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    waitForObjectAndStart(object)
});


async function waitForObjectAndStart(object) {

    while (!object.handle || object.handle === 0) {
        await mp.game.waitAsync(100);
    }
    mp.events.call('objecteditor:start', object.id)
}



/*mp.keys.bind(220, true, () => {
    if (oBjectWindow) {
        builder = false;
        oBjectWindow.destroy();
        oBjectWindow = null;
    }
    else {
        oBjectWindow = mp.browsers.new("package://cef/Interfaces/Builder/building/index.html");
        builder = true
    }
});*/


mp.keys.bind(46, true, () => {
    if (snapObject) {
        if (mp.objects.exists(snapObject)) {
            floors = floors.filter(function (obj) {
                return JSON.stringify(obj.Position) !== JSON.stringify(snapObject.getCoords(true));
            });

            walls = walls.filter(function (obj) {
                return JSON.stringify(obj.Position) !== JSON.stringify(snapObject.getCoords(true));
            });

            doors = doors.filter(function (obj) {

                return JSON.stringify(obj.Position) !== JSON.stringify(snapObject.getCoords(true));
            });

            cellings = cellings.filter(function (obj) {
                return JSON.stringify(obj.Position) !== JSON.stringify(snapObject.getCoords(true));
            });


            snapObject.destroy();
            snapObject = null;
        }
    }

});

mp.events.add('saveBuilder', () => {
    if (!selObj) {

        if (walls.length > 0) mp.events.callRemote("SaveWalls", JSON.stringify(walls))
        if (doors.length > 0) mp.events.callRemote("SaveDoors", JSON.stringify(doors))
        if (cellings.length > 0) mp.events.callRemote("SaveCellings", JSON.stringify(cellings))
        if (floors.length > 0) mp.events.callRemote("SaveFloors", JSON.stringify(floors))
        walls = [];
        doors = [];
        cellings = [];
        floors = [];
        snapObject = null;
        mp.gui.chat.push(`Your progress has been succesfully saved for house with ID ${mp.players.local.dimension}`)
    }
});



mp.keys.bind(98, true, () => { //2
    if (selObj && snapObject) {
        if ((snapObject.model === wallHashes[1] && selObj.model === wallHashes[1]) || (snapObject.model === wallHashes[4] && selObj.model === wallHashes[4])) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);


            let dist = sizeOfObject.max.x - sizeOfObject.min.x;
            let newPos = snapObject.getOffsetFromInWorldCoords(0, (0 - dist), 0);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }
        if ((snapObject.model === wallHashes[1] || snapObject.model === wallHashes[4]) && selObj.model !== wallHashes[1] && selObj.model !== wallHashes[4] && selObj.model !== wallHashes[5]) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            const sizeOfObject2 = mp.game.gameplay.getModelDimensions(selObj.model);
            let dist2 = (sizeOfObject2.max.z - sizeOfObject2.min.z) / 2;


            let dist = (sizeOfObject.max.x - sizeOfObject.min.x) / 2;
            let newPos = snapObject.getOffsetFromInWorldCoords(0, (0 - dist), dist2 + 0.070135);
            let rotation = snapObject.rotation;
            selObj.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z + 90);
            selObj.position = newPos;
        }
    }

});


mp.keys.bind(100, true, () => { //4
    if (selObj && snapObject) {
        if ((snapObject.model === wallHashes[1] && selObj.model === wallHashes[1]) || (snapObject.model === wallHashes[4] && selObj.model === wallHashes[4])) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);


            let dist = sizeOfObject.max.x - sizeOfObject.min.x;
            let newPos = snapObject.getOffsetFromInWorldCoords((0 - dist), 0, 0);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

        if ((snapObject.model === wallHashes[1] || snapObject.model === wallHashes[4]) && selObj.model !== wallHashes[1] && selObj.model !== wallHashes[4] && selObj.model !== wallHashes[5]) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            const sizeOfObject2 = mp.game.gameplay.getModelDimensions(selObj.model);
            let dist2 = (sizeOfObject2.max.z - sizeOfObject2.min.z) / 2;
            let dist = (sizeOfObject.max.x - sizeOfObject.min.x) / 2;
            let newPos = snapObject.getOffsetFromInWorldCoords((0 - dist), 0, dist2 + 0.070135);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

        if (snapObject.model !== wallHashes[1] && snapObject.model !== wallHashes[4] && snapObject.model !== wallHashes[5] && (selObj.model === wallHashes[4] || selObj.model === wallHashes[1])) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            const sizeOfObject2 = mp.game.gameplay.getModelDimensions(selObj.model);
            let dist = (sizeOfObject.max.z - sizeOfObject.min.z) / 2.1;
            let dist2 = (sizeOfObject2.max.x - sizeOfObject2.min.x) / 2;
            let newPos = snapObject.getOffsetFromInWorldCoords(dist2, 0, dist);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

        if (snapObject.model !== wallHashes[1] && selObj.model !== wallHashes[1] && snapObject.model !== wallHashes[4] && selObj.model !== wallHashes[4] && snapObject.model !== wallHashes[5] && selObj.model !== wallHashes[5]) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(mp.game.joaat("Soupfloor001"));
            let dist = sizeOfObject.max.x - sizeOfObject.min.x;
            let newPos = snapObject.getOffsetFromInWorldCoords(0, (0 - dist), 0);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

    }

});

mp.keys.bind(104, true, () => { //8
    if (selObj && snapObject) {
        if ((snapObject.model === wallHashes[1] && selObj.model === wallHashes[1]) || (snapObject.model === wallHashes[4] && selObj.model === wallHashes[4])) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            let dist = sizeOfObject.max.x - sizeOfObject.min.x;
            let newPos = snapObject.getOffsetFromInWorldCoords(0, dist, 0);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

        if ((snapObject.model === wallHashes[1] || snapObject.model === wallHashes[4]) && selObj.model !== wallHashes[1] && selObj.model !== wallHashes[4] && selObj.model !== wallHashes[5]) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            const sizeOfObject2 = mp.game.gameplay.getModelDimensions(selObj.model);
            let dist2 = (sizeOfObject2.max.z - sizeOfObject2.min.z) / 2;
            let dist = (sizeOfObject.max.x - sizeOfObject.min.x) / 2;
            let newPos = snapObject.getOffsetFromInWorldCoords(0, dist, dist2 + 0.070135);
            let rotation = snapObject.rotation;
            selObj.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z + 90);
            selObj.position = newPos;
        }
        if (snapObject.model !== wallHashes[1] && selObj.model !== wallHashes[1] && snapObject.model !== wallHashes[4] && selObj.model !== wallHashes[4] && snapObject.model !== wallHashes[5] && selObj.model !== wallHashes[5]) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            let dist = (sizeOfObject.max.z - sizeOfObject.min.z);
            let newPos = snapObject.getOffsetFromInWorldCoords(0, 0, dist);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }
    }
});

mp.keys.bind(102, true, () => { //6
    if (selObj && snapObject) {
        if ((snapObject.model === wallHashes[1] && selObj.model === wallHashes[1]) || (snapObject.model === wallHashes[4] && selObj.model === wallHashes[4])) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            let dist = sizeOfObject.max.x - sizeOfObject.min.x;
            let newPos = snapObject.getOffsetFromInWorldCoords(dist, 0, 0);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

        if ((snapObject.model === wallHashes[1] || snapObject.model === wallHashes[4]) && selObj.model !== wallHashes[1] && selObj.model !== wallHashes[4] && selObj.model !== wallHashes[5]) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            const sizeOfObject2 = mp.game.gameplay.getModelDimensions(selObj.model);
            let dist2 = (sizeOfObject2.max.z - sizeOfObject2.min.z) / 2;

            let dist = (sizeOfObject.max.x - sizeOfObject.min.x) / 2;
            let newPos = snapObject.getOffsetFromInWorldCoords(dist, 0, dist2 + 0.070135);

            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

        if (snapObject.model !== wallHashes[1] && snapObject.model !== wallHashes[4] && snapObject.model !== wallHashes[5] && (selObj.model === wallHashes[4] || selObj.model === wallHashes[1])) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            const sizeOfObject2 = mp.game.gameplay.getModelDimensions(selObj.model);
            let dist = (sizeOfObject.max.z - sizeOfObject.min.z) / 2.1;

            let dist2 = (sizeOfObject2.max.x - sizeOfObject2.min.x) / 2;
            let newPos = snapObject.getOffsetFromInWorldCoords((0 - dist2), 0, dist);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

        if (snapObject.model !== wallHashes[1] && selObj.model !== wallHashes[1] && snapObject.model !== wallHashes[4] && selObj.model !== wallHashes[4] && snapObject.model !== wallHashes[5] && selObj.model !== wallHashes[5]) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(mp.game.joaat("Soupfloor001"));
            let dist = sizeOfObject.max.x - sizeOfObject.min.x;
            let newPos = snapObject.getOffsetFromInWorldCoords(0, dist, 0);
            selObj.rotation = snapObject.rotation;
            selObj.position = newPos;
        }

    }

});

mp.keys.bind(101, true, () => { //5
    if (selObj && snapObject) {
        if ((snapObject.model === wallHashes[0] && selObj.model === wallHashes[5])) {
            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            const sizeOfObject2 = mp.game.gameplay.getModelDimensions(selObj.model);
            let dist = sizeOfObject.max.z - sizeOfObject.min.z;
            let dist2 = sizeOfObject2.max.z - sizeOfObject2.min.z;
            let dist3 = (sizeOfObject2.max.x - sizeOfObject2.min.x) / 2;
            let newPos = snapObject.getOffsetFromInWorldCoords(0, dist3, ((dist2 - dist) / 2));
            let rotation = snapObject.rotation;
            selObj.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z + 90);
            selObj.position = newPos;
        }
    }
});


mp.keys.bind(13, true, () => { //5
    if (selObj) saveChanges()
});


mp.events.add('render', () => {
    if (builder) {
        const [x, y] = mp.gui.cursor.position;
        const result = screen2dToWorld3d(x, y)

        if (result && result.position) {

            //get right hand position
            const pos = mp.players.local.getWorldPositionOfBone(91);

            const { x, y, z } = result.position;
            const dist = mp.game.system.vdist(pos.x, pos.y, pos.z, x, y, z);



        }
    }

    if (selObj) {


        let positionX1 = selObj.getOffsetFromInWorldCoords(1, 0, 0);
        let positionX2 = selObj.getOffsetFromInWorldCoords(-1, 0, 0);

        let positionY1 = selObj.getOffsetFromInWorldCoords(0, 1, 0);
        let positionY2 = selObj.getOffsetFromInWorldCoords(0, -1, 0);

        let positionZ1 = selObj.getOffsetFromInWorldCoords(0, 0, 1);
        let positionZ2 = selObj.getOffsetFromInWorldCoords(0, 0, -1);

        mp.game.graphics.drawLine(positionX1.x, positionX1.y, positionX1.z, positionX2.x, positionX2.y, positionX2.z, 0, 0, 255, 255);
        mp.game.graphics.drawLine(positionY1.x, positionY1.y, positionY1.z, positionY2.x, positionY2.y, positionY2.z, 255, 0, 0, 255);
        mp.game.graphics.drawLine(positionZ1.x, positionZ1.y, positionZ1.z, positionZ2.x, positionZ2.y, positionZ2.z, 0, 255, 0, 255);

        xbox = mp.game.graphics.world3dToScreen2d(positionX1.x, positionX1.y, positionX1.z);
        ybox = mp.game.graphics.world3dToScreen2d(positionY1.x, positionY1.y, positionY1.z);
        zbox = mp.game.graphics.world3dToScreen2d(positionZ1.x, positionZ1.y, positionZ1.z);
        switchbox = mp.game.graphics.world3dToScreen2d(selObj.position.x - 0.8, selObj.position.y - 0.8, selObj.position.z);
        if (switchbox != undefined) {
            groundbox = { x: switchbox.x + 0.065, y: switchbox.y };
            cancelbox = { x: switchbox.x + 0.13, y: switchbox.y };
            savebox = { x: switchbox.x + 0.195, y: switchbox.y };
        } else {
            cancelbox = undefined, savebox = undefined;
        }

        if (xbox != undefined) {
            mp.game.graphics.drawRect(xbox.x, xbox.y, 0.015, 0.026, 0, 0, 255, 255);
            mp.game.graphics.drawText('X', [xbox.x, xbox.y - 0.015], {
                font: 2,
                color: [255, 255, 255, 255],
                scale: [0.5, 0.5],
                outline: false
            });
        }
        if (ybox != undefined) {
            mp.game.graphics.drawRect(ybox.x, ybox.y, 0.015, 0.026, 255, 0, 0, 255);
            mp.game.graphics.drawText('Y', [ybox.x, ybox.y - 0.016], {
                font: 2,
                color: [255, 255, 255, 255],
                scale: [0.5, 0.5],
                outline: false
            });
        }
        if (zbox != undefined) {
            mp.game.graphics.drawRect(zbox.x, zbox.y, 0.015, 0.026, 0, 255, 0, 255);
            mp.game.graphics.drawText('Z', [zbox.x, zbox.y - 0.016], {
                font: 2,
                color: [255, 255, 255, 255],
                scale: [0.5, 0.5],
                outline: false
            });
        }
        if (switchbox != undefined) {
            mp.game.graphics.drawRect(switchbox.x, switchbox.y, 0.06, 0.026, 255, 255, 255, 255);
            mp.game.graphics.drawRect(groundbox.x, groundbox.y, 0.06, 0.026, 255, 255, 255, 255);
            mp.game.graphics.drawRect(cancelbox.x, cancelbox.y, 0.06, 0.026, 255, 255, 255, 255);
            mp.game.graphics.drawRect(savebox.x, savebox.y, 0.06, 0.026, 255, 255, 255, 255);
            mp.game.graphics.drawText(mode == 'Move' ? 'Rotate' : 'Move', [switchbox.x, switchbox.y - 0.016], {
                font: 0,
                color: [0, 0, 0, 255],
                scale: [0.4, 0.4],
                outline: false
            });
            mp.game.graphics.drawText('Ground', [groundbox.x, groundbox.y - 0.016], {
                font: 0,
                color: [0, 0, 0, 255],
                scale: [0.4, 0.4],
                outline: false
            });
            mp.game.graphics.drawText('Cancel', [cancelbox.x, cancelbox.y - 0.016], {
                font: 0,
                color: [0, 0, 0, 255],
                scale: [0.4, 0.4],
                outline: false
            });
            mp.game.graphics.drawText('Save', [savebox.x, savebox.y - 0.016], {
                font: 0,
                color: [0, 0, 0, 255],
                scale: [0.4, 0.4],
                outline: false
            });
        }

        let pos = mp.gui.cursor.position;
        let cursorDir = { x: pos[0] - oldcursorPos[0], y: pos[1] - oldcursorPos[1] };
        cursorDir.x /= res.x;
        cursorDir.y /= res.y;

        if (curBtn == 'x') {
            let mainPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y, selObj.position.z);
            let refPos;
            if (mode == 'Move') {
                refPos = mp.game.graphics.world3dToScreen2d(positionX1.x, positionX1.y, positionX1.z);
            } else {
                refPos = mp.game.graphics.world3dToScreen2d(positionY1.x, positionY1.y, positionY1.z);
            }
            if (mainPos == undefined || refPos == undefined) return;
            var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
            var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
            if (mode == 'Move') {
                let newPositionX = selObj.getOffsetFromInWorldCoords((selObj.position.x + magnitude * MOVE_SENSITIVTY) - (selObj.position.x), 0, 0);
                selObj.position = newPositionX;
            } else {
                selObj.rotation = new mp.Vector3(selObj.rotation.x - magnitude * ROT_SENSITIVITY, selObj.rotation.y, selObj.rotation.z);
            }

        } else if (curBtn == 'y') {
            let mainPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y, selObj.position.z);
            let refPos;
            if (mode == 'Move') {
                refPos = mp.game.graphics.world3dToScreen2d(positionY1.x, positionY1.y, positionY1.z);
            } else {
                refPos = mp.game.graphics.world3dToScreen2d(positionX1.x, positionX1.y, positionX1.z);
            }
            if (mainPos == undefined || refPos == undefined) return;
            var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
            var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
            if (mode == 'Move') {
                let newPositionY = selObj.getOffsetFromInWorldCoords(0, (selObj.position.y + magnitude * MOVE_SENSITIVTY) - (selObj.position.y), 0);
                selObj.position = newPositionY;
            } else {
                selObj.rotation = new mp.Vector3(selObj.rotation.x, selObj.rotation.y + magnitude * ROT_SENSITIVITY, selObj.rotation.z);
            }

        } else if (curBtn == 'z') {
            let mainPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y, selObj.position.z);
            let refPos = mp.game.graphics.world3dToScreen2d(positionZ1.x, positionZ1.y, positionZ1.z);
            if (mainPos == undefined || refPos == undefined) return;
            var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
            var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
            if (mode == 'Move') {
                let newPositionZ = selObj.getOffsetFromInWorldCoords(0, 0, (selObj.position.z + magnitude * MOVE_SENSITIVTY) - (selObj.position.z));
                selObj.position = newPositionZ;
            } else {
                selObj.rotation = new mp.Vector3(selObj.rotation.x, selObj.rotation.y, selObj.rotation.z + cursorDir.x * ROT_SENSITIVITY * 0.2); //Here direction can be determined by just x axis of mouse, hence the *0.2
            }
        }
        oldcursorPos = pos;
    }
});




mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {

    //return;
    const result = screen2dToWorld3d(x, y);
    if (result && result.position) {

        if (result.entity.handle && wallHashes.includes(result.entity.model)) {

            snapObject = result.entity

            const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
            let dist = (sizeOfObject.max.z + 0.2);
            let markerPos = new mp.Vector3(snapObject.position.x, snapObject.position.y, snapObject.position.z + dist);
            if (snapMarker && mp.markers.exists(snapMarker)) snapMarker.destroy();
            snapMarker = mp.markers.new(3, markerPos, 0.2,
                {
                    direction: new mp.Vector3(0, 0, 0),
                    rotation: new mp.Vector3(0, 180, 0),
                    color: [255, 0, 0, 255],
                    visible: true,
                    dimension: mp.players.local.dimension
                });



        }
    }

    if (!selObj) return;

    let mouseRel = { x: x / res.x, y: y / res.y };

    if (upOrDown == 'up') {
        curBtn = '';
    } else if (upOrDown == 'down') {
        if (xbox != undefined && mouseRel.x >= xbox.x - 0.01 && mouseRel.x <= xbox.x + 0.009 && mouseRel.y >= xbox.y - 0.015 && mouseRel.y <= xbox.y + 0.009) {
            curBtn = 'x';
        } else if (ybox != undefined && mouseRel.x >= ybox.x - 0.01 && mouseRel.x <= ybox.x + 0.009 && mouseRel.y >= ybox.y - 0.015 && mouseRel.y <= ybox.y + 0.009) {
            curBtn = 'y';
        } else if (zbox != undefined && mouseRel.x >= zbox.x - 0.01 && mouseRel.x <= zbox.x + 0.009 && mouseRel.y >= zbox.y - 0.015 && mouseRel.y <= zbox.y + 0.009) {
            curBtn = 'z';
        } else if (switchbox != undefined && mouseRel.x >= switchbox.x - 0.03 && mouseRel.x <= switchbox.x + 0.03 && mouseRel.y >= switchbox.y - 0.015 && mouseRel.y <= switchbox.y + 0.009) {
            switchMode();
        } else if (groundbox != undefined && mouseRel.x >= groundbox.x - 0.03 && mouseRel.x <= groundbox.x + 0.03 && mouseRel.y >= groundbox.y - 0.015 && mouseRel.y <= groundbox.y + 0.009) {
            groundObject();
        } else if (cancelbox != undefined && mouseRel.x >= cancelbox.x - 0.03 && mouseRel.x <= cancelbox.x + 0.03 && mouseRel.y >= cancelbox.y - 0.015 && mouseRel.y <= cancelbox.y + 0.009) {
            cancel();
        } else if (savebox != undefined && mouseRel.x >= savebox.x - 0.03 && mouseRel.x <= savebox.x + 0.03 && mouseRel.y >= savebox.y - 0.015 && mouseRel.y <= savebox.y + 0.009) {
            saveChanges();
        }
    }
});

function switchMode() {
    mode = (mode == 'Move' ? 'Rotation' : 'Move');
}

function groundObject() {
    selObj.placeOnGroundProperly();
    let pos = selObj.getCoords(true);
    let rot = selObj.getRotation(2);
    selObj.position = new mp.Vector3(pos.x, pos.y, pos.z);
    selObj.rotation = new mp.Vector3(rot.x, rot.y, rot.z); //FIX BUG WHERE POSITION PROPERTY != GAME POSITION
}

function cancel() {
    selObj.position = oldPos;
    selObj.rotation = oldRot;
    selObj.setCollision(true, true);
    selObj.destroy();
    selObj = null;


}

function saveChanges() {
    let pos = selObj.getCoords(true);
    let rot = selObj.getRotation(2);
    if (selObj.model === wallHashes[1]) floors.push({ Hash: selObj.model, Position: pos, Rotation: rot })
    else if (selObj.model === wallHashes[4]) cellings.push({ Hash: selObj.model, Position: pos, Rotation: rot })
    else if (selObj.model === wallHashes[5]) doors.push({ Hash: selObj.model, Position: pos, Rotation: rot })
    else walls.push({ Hash: selObj.model, Position: pos, Rotation: rot })
    selObj.setCollision(true, true);
    snapObject = selObj;
    const sizeOfObject = mp.game.gameplay.getModelDimensions(snapObject.model);
    let dist = (sizeOfObject.max.z + 0.2);
    let markerPos = new mp.Vector3(snapObject.position.x, snapObject.position.y, snapObject.position.z + dist);
    if (snapMarker && mp.markers.exists(snapMarker)) snapMarker.destroy();
    snapMarker = mp.markers.new(3, markerPos, 0.2,
        {
            direction: new mp.Vector3(0, 0, 0),
            rotation: new mp.Vector3(0, 180, 0),
            color: [255, 0, 0, 255],
            visible: true,
            dimension: mp.players.local.dimension
        });
    selObj = null;

}



function getXYInFrontOfCoords(x, y, a, distance) {
    return {
        x: x + (distance * mp.game.system.sin(-a)),
        y: y + (distance * mp.game.system.cos(-a))
    }
}



const camera = mp.cameras.new("gameplay");

function screen2dToWorld3d(absoluteX, absoluteY) {
    const camPos = camera.getCoord();
    const { x: rX, y: rY } = processCoordinates(absoluteX, absoluteY);
    const target = s2w(camPos, rX, rY);

    const dir = sub(target, camPos);
    const from = add(camPos, mulNumber(dir, 0.5));
    const to = add(camPos, mulNumber(dir, 300));

    const ray = mp.raycasting.testPointToPoint(from, to, mp.players.local.handle, 287);
    if (ray) { if (typeof (ray.entity) === 'number' && ray.entity !== 0 && mp.game.entity.isAnObject(ray.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(ray.entity); } }
    return ray;
}

function s2w(camPos, relX, relY) {
    const camRot = camera.getRot(0);
    const camForward = rotationToDirection(camRot);
    const rotUp = add(camRot, new mp.Vector3(10, 0, 0));
    const rotDown = add(camRot, new mp.Vector3(-10, 0, 0));
    const rotLeft = add(camRot, new mp.Vector3(0, 0, -10));
    const rotRight = add(camRot, new mp.Vector3(0, 0, 10));

    const camRight = sub(rotationToDirection(rotRight), rotationToDirection(rotLeft));
    const camUp = sub(rotationToDirection(rotUp), rotationToDirection(rotDown));

    const rollRad = -degToRad(camRot.y);

    const camRightRoll = sub(mulNumber(camRight, Math.cos(rollRad)), mulNumber(camUp, Math.sin(rollRad)));
    const camUpRoll = add(mulNumber(camRight, Math.sin(rollRad)), mulNumber(camUp, Math.cos(rollRad)));

    const point3D = add(
        add(
            add(camPos, mulNumber(camForward, 10.0)),
            camRightRoll
        ),
        camUpRoll);

    const point2D = w2s(point3D);

    if (point2D === undefined) {
        return add(camPos, mulNumber(camForward, 10.0));
    }

    const point3DZero = add(camPos, mulNumber(camForward, 10.0));
    const point2DZero = w2s(point3DZero);

    if (point2DZero === undefined) {
        return add(camPos, mulNumber(camForward, 10.0));
    }

    const eps = 0.001;

    if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
        return add(camPos, mulNumber(camForward, 10.0));
    }

    const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
    const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
    const point3Dret = add(
        add(
            add(camPos, mulNumber(camForward, 10.0)),
            mulNumber(camRightRoll, scaleX)
        ),
        mulNumber(camUpRoll, scaleY));

    return point3Dret;
}

function processCoordinates(x, y) {
    const { x: screenX, y: screenY } = mp.game.graphics.getScreenActiveResolution(0, 0);

    let relativeX = (1 - ((x / screenX) * 1.0) * 2);
    let relativeY = (1 - ((y / screenY) * 1.0) * 2);

    if (relativeX > 0.0) {
        relativeX = -relativeX;
    } else {
        relativeX = Math.abs(relativeX);
    }

    if (relativeY > 0.0) {
        relativeY = -relativeY;
    } else {
        relativeY = Math.abs(relativeY);
    }

    return { x: relativeX, y: relativeY };
}

function w2s(position) {
    const result = mp.game.graphics.world3dToScreen2d(position.x, position.y, position.z);

    if (result === undefined) {
        return undefined;
    }

    return new mp.Vector3((result.x - 0.5) * 2, (result.y - 0.5) * 2, 0);
}

function rotationToDirection(rotation) {
    const z = degToRad(rotation.z);
    const x = degToRad(rotation.x);
    const num = Math.abs(Math.cos(x));

    return new mp.Vector3((-Math.sin(z) * num), (Math.cos(z) * num), Math.sin(x));
}

function degToRad(deg) {
    return deg * Math.PI / 180.0;
}

function add(vector1, vector2) {
    return new mp.Vector3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
}

function sub(vector1, vector2) {
    return new mp.Vector3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
}

function mulNumber(vector1, value) {
    return new mp.Vector3(vector1.x * value, vector1.y * value, vector1.z * value);
}

}