{
﻿global.editing = false;
let object = null;
let posShift = new mp.Vector3(0, 0, 0);
let rotShift = new mp.Vector3(0, 0, 0);

let objPos = new mp.Vector3(0, 0, 0);
let objRot = new mp.Vector3(0, 0, 0);
let objModel = '';
let GrafName;
const localPlayer = mp.players.local;

mp.events.add('startEditing', (name,model) => {
    objModel = model;
    GrafName = name;
    object = mp.objects.new(mp.game.joaat(model), localPlayer.position, {
        rotation: localPlayer.rotation,
        dimension: localPlayer.dimension
    });
    object.setCollision(false, false);
    object.setAlpha(155);
    editing = true;

    mp.events.call('showHUD', false);
    mp.game.invoke(getNative("SET_FOLLOW_PED_CAM_VIEW_MODE"), 4);
});

let sc = mp.game.graphics.requestScaleformMovie("instructional_buttons");
let scInst = 0;

var furnitureObjects = { };
mp.events.add('loadHouseFurniture', function (data) {
    mp.events.call('unloadHouseFurniture');
    data = JSON.parse(data);

    for (let furnid in data) {
        let obj = mp.objects.new(mp.game.joaat(data[furnid][0]), data[furnid][1],
            {
                rotation: data[furnid][2],
                dimension: localPlayer.dimension
            });
        obj.setAlpha(255);

        obj.isFurniture = true;
        obj._furnid = furnid;

        furnitureObjects[furnid] = obj;
    }
});

mp.events.add('loadFurniture', function (id, data) {
    data = JSON.parse(data);

    let obj = mp.objects.new(mp.game.joaat(data[0]), data[1],
        {
            rotation: data[2],
            dimension: localPlayer.dimension
        });
    obj.setAlpha(255);

    obj.isFurniture = true;
    obj._furnid = id;

    furnitureObjects[id] = obj;
});

mp.events.add('unloadHouseFurniture', function () {
    for (let id in furnitureObjects) {
        if (furnitureObjects[id])
            furnitureObjects[id].destroy();
    }
    furnitureObjects = {};
});

mp.events.add('unloadFurniture', function (id) {
    if (furnitureObjects[id] && furnitureObjects[id].isFurniture && furnitureObjects[id]) {
        furnitureObjects[id].destroy();
        delete furnitureObjects[id];
    }
});

function AddInstructionalStart() {
    scInst = 0;
    mp.game.graphics.drawScaleformMovieFullscreen(sc, 255, 255, 255, 0, false);
    mp.game.graphics.pushScaleformMovieFunction(sc, "CLEAR_ALL");
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_CLEAR_SPACE");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(200);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}
function AddInstructionalButton(text, button) //this shit brazy
{
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scInst++;
}
function AddInstructionalButtonCustom(text, button) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scInst++;
}
function AddInstructionalEnd(type) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "DRAW_INSTRUCTIONAL_BUTTONS");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(type);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_BACKGROUND_COLOUR");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(192);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(57);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(43);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(65);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}

mp.events.add('endEditing', function () {
    object.destroy();
    object = null;
    editing = false;
    mp.events.call('showHUD', true);
});

mp.keys.bind(0x25, false, function () { // LEFT Arrow
    if (chatActive || !editing) return;
    rotShift.z += 5;
});
mp.keys.bind(0x27, false, function () { // RIGHT Arrow
    if (chatActive || !editing) return;
    rotShift.z -= 5;
});
mp.keys.bind(0x59, false, function () { // Y key
    if (chatActive || !editing) return;
    NexusEvent.callRemote('grafcoord',GrafName,objModel, objPos.x.toFixed(3), objPos.y.toFixed(3), objPos.z.toFixed(3), objRot.x.toFixed(3), objRot.y.toFixed(3), objRot.z.toFixed(3));

    mp.events.call('endEditing', true);
});
mp.keys.bind(0x4E, false, function () { // N key
    if (chatActive || !editing) return;

    mp.events.call('endEditing', true);
    NexusEvent.callRemote('cancelEdit');
});

mp.events.add('render', () => {
    for (let id in furnitureObjects) {
        if (furnitureObjects[id]) {
            mp.game.graphics.drawText(`${id}`, [furnitureObjects[id].position.x, furnitureObjects[id].position.y, furnitureObjects[id].position.z + 0.2], {
                font: 0,
                color: [255, 255, 255, 185],
                scale: [0.4, 0.4],
                outline: true
            });
        }
    }

    if (object === null) {
        return;
    }

    AddInstructionalStart();
    AddInstructionalButton("Повернуть объект", 197);
    AddInstructionalButton("Повернуть объект", 196);
    AddInstructionalButtonCustom("Установить", "t_Y");
    AddInstructionalButtonCustom("Отмена", "t_N");
    AddInstructionalEnd(1);

    const camera = mp.cameras.new("gameplay");
    let distance = 5;
    let position = camera.getCoord();
    let direction = camera.getDirection();
    let endPoint = new mp.Vector3(position.x + direction.x * distance, position.y + direction.y * distance, position.z + direction.z * distance);

    let raycast = mp.raycasting.testPointToPoint(position, endPoint, [1, 16]);

    if (typeof raycast === 'undefined') {
        raycast = {};
        raycast.position = endPoint;
    } else if (typeof object === 'undefined') {
        return;
    }

    let rotation = camera.getRot(2);

    object.slide(raycast.position.x, raycast.position.y, raycast.position.z, 100, 100, 100, false);
    object.setRotation(rotShift.x, rotShift.y, rotation.z + rotShift.z, 1, true);
   // object.placeOnGroundProperly();

    objPos = object.getCoords(true);
    objRot = new mp.Vector3(rotShift.x, rotShift.y, rotation.z + rotShift.z);
}, 'furniture');
}