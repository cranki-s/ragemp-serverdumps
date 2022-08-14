{
var WallsHashes = []
var WindowHashes = []
var FloorsHashes = []
var FramesHashes = []
var DoorHashes = []
var CellingHashes = []
var GlassWallsHashes = []


var defaultDoors = ["apa_heist_apart2_door", "prop_ret_door", "apa_prop_heist_cutscene_doora", "apa_prop_heist_cutscene_doorb", "apa_v_ilev_fh_bedrmdoor", "apa_p_mp_yacht_door_01", "apa_p_mp_door_apart_door_black", "ex_p_mp_door_office_door01_s", "apa_p_mp_door_mpa2_frnt", "apa_p_mp_yacht_door_02", "ex_p_mp_door_apart_door", "ex_p_mp_door_apart_door_black", "prop_ch1_07_door_02l", "ex_p_mp_door_apart_doorwhite01", "prop_ch1_07_door_01l", "prop_bh1_44_door_01l"]

var inventoryFurniture = [];
let materialsAmount = 0;




let buildUI = null;


mp.events.add("StartBuildingUI", (materials, furniture) => {
    inventoryFurniture = JSON.parse(furniture);
    materialsAmount = materials;
    if (buildUI) {

        buildUI.destroy();
        buildUI = null;
        buildUI = mp.browsers.new("package://cef/Interfaces/Builder/buildingUI/index.html");
        let buttons = [true, true, false, false, false, false, false, false, false, true] // default config
        buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');");
    }
    else {
        buildUI = mp.browsers.new("package://cef/Interfaces/Builder/buildingUI/index.html");
        let buttons = [true, true, false, false, false, false, false, false, false, true] // default config
        buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');");
    }
});





function initiateObjects(name) {
    var objectHashes = [];
    for (var i = 1; i < 17; i++) {
        if (i < 10) objectHashes.push(mp.game.joaat(name + "00" + "" + i + ""));
        if (i > 9) objectHashes.push(mp.game.joaat(name + "0" + "" + i + ""))

    }
    return objectHashes;
}

function initiateDoors() {
    var objectHashes = [];
    defaultDoors.forEach((model) => {
        objectHashes.push(mp.game.joaat(model));
    })
    return objectHashes;
}


WallsHashes = initiateObjects("soupwall")
WindowHashes = initiateObjects("soupwindwall")
FloorsHashes = initiateObjects("Soupfloor")
FramesHashes = initiateObjects("soupdoorwall")
CellingHashes = initiateObjects("Souproof")
GlassWallsHashes = initiateObjects("soupglasswall")
StairsHashes = initiateObjects("Soupstairs")
DoorHashes = initiateDoors();


mp.events.add("ChangeWallModel", (name) => {
    selObj.model = mp.game.joaat(name);
});


mp.events.add("CreateNewHouseobject", (name) => {
    selObj.model = mp.game.joaat(name);
});





function checkIfPostionisValid(position, dimension) {
    let validPosition = false;
    mp.polygons.pool.map((polygon) => {

            if (mp.polygons.isPositionWithinPolygon(position, polygon, dimension)) {
                validPosition = true;
            }
    });
    return validPosition;
}




mp.events.add({
    "openStructure": () => {
        if (editorCef != null) editorCef.destroy();
        editorCef = mp.browsers.new("package://cef/Interfaces/Builder/structureeditor/index.html");

    },
    "openFurniture": () => {
        if (editorCef != null) editorCef.destroy();
        editorCef = mp.browsers.new("package://cef/Interfaces/Builder/inventoryitemseditor/index.html");
        editorCef.execute("app.populateList('" + JSON.stringify(inventoryFurniture) + "')");

    },
    "saveModifcations": () => {
        saveChanges();
    },
    "editObject": () => {
        editObject();
    },
    "cancelEdit": () => {
        cancel();
    },
    "pickUp": () => {
        mp.events.callRemote("PickUpHouseItem", selObj.objId, selObj.objType)
        cancel();
    },
    "destroyWall": () => {
        mp.events.callRemote("DestroyPlayerWall", selObj.objId, selObj.objType)
        cancel();
    },
    "rotateMode": () => {
        if (mode === 'Move') switchMode();
    },
    "moveMode": () => {
        if (mode === 'Rotation') switchMode();
    },
    "quitHouseEditor": () => {
        if (editorCef) {
            editorCef.destroy();
            editorCef = null;
        }
        if (buildUI) {
            buildUI.destroy();
            buildUI = null;
        }
    },
    "placeFurniture": async (index) => {
        if (selObj) selObj.destroy();
        furnitureToPlace = inventoryFurniture[index];
        selObj = mp.objects.new(inventoryFurniture[index].Hash, mp.players.local.position,
            {
                rotation: mp.players.local.rotation,
                alpha: 255,
                dimension: mp.players.local.dimension
            });
        while (!selObj.handle && selObj.handle === 0) mp.game.wait(0);
        selObj.setCollision(false, false);
        let buttons = [false, false, true, false, true, false, false, true, true, false] // editfurniture
        if (buildUI) buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');")
    },
    "placeStructure": async (model) => {
        if (selObj) selObj.destroy();
        selObj = mp.objects.new(model, mp.players.local.position,
            {
                rotation: mp.players.local.rotation,
                alpha: 255,
                dimension: mp.players.local.dimension
            });
        while (!selObj.handle && selObj.handle === 0) mp.game.wait(0);
        selObj.setCollision(false, false);
        let buttons = [false, false, true, false, true, false, false, true, true, false] // editfurniture
        walltype = GetWallType(selObj);
        if (buildUI) buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');")
        
    },
    "cancelFromUi": () => {
        cancel();
    },
    "closeHouseEditor": () => {
        if (selObj) {
            selObj.destroy();
            selObj = null;
        }
        mp.events.call("quitHouseEditor");
    }
});






function GetWallType(selObj) {
    if (WallsHashes.includes(selObj.model)) {
        return "PlayerBuildedWalls";
    }
    if (WindowHashes.includes(selObj.model)) {
        return "PlayerBuildedWalls";
    }
    if (FloorsHashes.includes(selObj.model)) {
        return "PlayerBuildedFloors";
    }
    if (FramesHashes.includes(selObj.model)) {
        return "PlayerBuildedWalls";
    }
    if (CellingHashes.includes(selObj.model)) {
        return "PlayerBuildedCellings";
    }
    if (GlassWallsHashes.includes(selObj.model)) {
        return "PlayerBuildedWalls";
    }
    if (StairsHashes.includes(selObj.model)) {
        return "PlayerBuildedStairs";
    }
    if (DoorHashes.includes(selObj.model)) {
        return "PlayerBuildedDoors";
    }
}



var res = mp.game.graphics.getScreenActiveResolution(0, 0);

let MOVE_SENSITIVTY = 50;
let ROT_SENSITIVITY = 800;

let selObj = null;
let oldPos;
let oldRot;
let oldModel;
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

let editorCef = null;



let furnitureToPlace = null;
let walltype = null;





mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    let mouseRel = { x: x / res.x, y: y / res.y };

    if (upOrDown == 'up') {
        curBtn = '';
    } else if (upOrDown == 'down') {
        const result = screen2dToWorld3d(x, y);
        if (leftOrRight == 'right' && result && !selObj && result.position && !editorCef && buildUI) {

            if (result.entity.handle) {

                selObj = result.entity
                oldModel = result.entity.model
                oldPos = result.entity.position
                oldRot = result.entity.rotation
                if (!selObj.baseBuild) selObj.setCollision(false, false);
                if (selObj.baseBuild) {
                    let buttons = [false, false, true, true, true, false, false, false, false, false] // editwall
                    if (buildUI) buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');");

                }
                if (selObj.objType && selObj.objType.includes("Furniture")) {
                    let buttons = [false, false, true, false, true, true, false, true, true, false] // editfurniture
                    if (buildUI) buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');");
                }
                if (selObj.objType.includes("PlayerBuild")) {
                    let buttons = [false, false, true, false, true, false, true, true, true, false] // editplayerBuild
                    if (buildUI) buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');");
                }
            }

        }
        if (!selObj) return;
        if (!selObj.baseBuild && xbox != undefined && mouseRel.x >= xbox.x - 0.01 && mouseRel.x <= xbox.x + 0.009 && mouseRel.y >= xbox.y - 0.015 && mouseRel.y <= xbox.y + 0.009) {
            curBtn = 'x';
        } else if (!selObj.baseBuild && ybox != undefined && mouseRel.x >= ybox.x - 0.01 && mouseRel.x <= ybox.x + 0.009 && mouseRel.y >= ybox.y - 0.015 && mouseRel.y <= ybox.y + 0.009) {
            curBtn = 'y';
        } else if (!selObj.baseBuild && zbox != undefined && mouseRel.x >= zbox.x - 0.01 && mouseRel.x <= zbox.x + 0.009 && mouseRel.y >= zbox.y - 0.015 && mouseRel.y <= zbox.y + 0.009) {
            curBtn = 'z';
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

function editObject() {

    if (WallsHashes.includes(selObj.model)) {
        CreateEditBrowser("Walls");
        return;

    }
    if (WindowHashes.includes(selObj.model)) {
        CreateEditBrowser("Window walls");
        return;
    }
    if (FloorsHashes.includes(selObj.model)) {
        CreateEditBrowser("Floors");
        return;
    }
    if (FramesHashes.includes(selObj.model)) {
        CreateEditBrowser("Door walls");
        return;
    }
    if (CellingHashes.includes(selObj.model)) {
        CreateEditBrowser("Roofs");
        return;
    }
    if (GlassWallsHashes.includes(selObj.model)) {
        CreateEditBrowser("Glass walls");
        return;
    }
}

function CreateEditBrowser(type) {
    if (editorCef == null) {
        editorCef = mp.browsers.new("package://cef/Interfaces/Builder/wallschanger/index.html");
        editorCef.execute("app.loadCategory('" + type + "')");
    }
}


function cancel() {
    if (selObj && selObj.objId) {
      
        selObj.model = oldModel;
        selObj.position = oldPos;
        selObj.rotation = oldRot;
        selObj.setCollision(true, true);

    }
    else {
        if (selObj) selObj.destroy();
    }
    selObj = null;
    if (editorCef) {
        editorCef.destroy();
        editorCef = null;
    }
    if (furnitureToPlace) furnitureToPlace = null;
    if (walltype) walltype = null;
    let buttons = [true, true, false, false, false, false, false, false, false, true] // default config
    buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');");
}



function saveChanges() {
    let pos = selObj.getCoords(true);
    if (!selObj.baseBuild && !checkIfPostionisValid(pos, mp.players.local.dimension)) return;
    let rot = selObj.getRotation(2);
    selObj.setCollision(true, true);
    if (selObj.objId) {
        mp.events.callRemote("SaveHouseModification", selObj.objId, JSON.stringify(selObj.model), pos, rot, selObj.objType, "")
    }
    else if (furnitureToPlace) {
        mp.events.callRemote("SaveHouseModification", -1, JSON.stringify(selObj.model), pos, rot, "", JSON.stringify(furnitureToPlace))
        selObj.destroy();

    }
    else {
        mp.events.callRemote("SaveHouseModification", -1, JSON.stringify(selObj.model), pos, rot, walltype, "")
        selObj.destroy();
    }
    selObj = null;
    if (editorCef) {
        editorCef.destroy();
        editorCef = null;
    }
    let buttons = [true, true, false, false, false, false, false, false, false, true] // default config
    buildUI.execute("app.changeButtons('" + JSON.stringify(buttons) + "');");


}

const drawTarget3d = (pos, textureDict = "mpmissmarkers256", textureName = "corona_shade", scaleX = 0.025, scaleY = 0.05) => {
    const position = mp.game.graphics.world3dToScreen2d(pos);
    if (!position) return;
    mp.game.graphics.drawSprite(textureDict, textureName, position.x, position.y, scaleX, scaleY, 0, 253, 145, 58, 50);
}


mp.events.add('render', () => {

    const [x, y] = mp.gui.cursor.position;
    const result = screen2dToWorld3d(x, y)

    if (result && result.position) {

        //get right hand position
        const pos = mp.players.local.getWorldPositionOfBone(91);

        const { x, y, z } = result.position;
        const dist = mp.game.system.vdist(pos.x, pos.y, pos.z, x, y, z);
    }

    if (selObj) {




        drawTarget3d(selObj.position);

        mp.game.graphics.drawLine(selObj.position.x - 1.0, selObj.position.y, selObj.position.z, selObj.position.x + 1.0, selObj.position.y, selObj.position.z, 0, 0, 255, 255);
        mp.game.graphics.drawLine(selObj.position.x, selObj.position.y - 1.0, selObj.position.z, selObj.position.x, selObj.position.y + 1.0, selObj.position.z, 255, 0, 0, 255);
        mp.game.graphics.drawLine(selObj.position.x, selObj.position.y, selObj.position.z - 1.0, selObj.position.x, selObj.position.y, selObj.position.z + 1.0, 0, 255, 0, 255);

        xbox = mp.game.graphics.world3dToScreen2d(selObj.position.x + 1.0, selObj.position.y, selObj.position.z);
        ybox = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y + 1.0, selObj.position.z);
        zbox = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y, selObj.position.z + 1.0);
        switchbox = mp.game.graphics.world3dToScreen2d(selObj.position.x - 0.8, selObj.position.y - 0.8, selObj.position.z);
        if (switchbox != undefined) {
            groundbox = { x: switchbox.x + 0.065, y: switchbox.y };
            cancelbox = { x: switchbox.x + 0.13, y: switchbox.y };
            savebox = { x: switchbox.x + 0.195, y: switchbox.y };
        } else {
            cancelbox = undefined, savebox = undefined;
        }

        if (xbox != undefined && !selObj.baseBuild) {
            mp.game.graphics.drawRect(xbox.x, xbox.y, 0.015, 0.026, 0, 0, 255, 255);
            mp.game.graphics.drawText('X', [xbox.x, xbox.y - 0.015], {
                font: 2,
                color: [255, 255, 255, 255],
                scale: [0.5, 0.5],
                outline: false
            });
        }
        if (ybox != undefined && !selObj.baseBuild) {
            mp.game.graphics.drawRect(ybox.x, ybox.y, 0.015, 0.026, 255, 0, 0, 255);
            mp.game.graphics.drawText('Y', [ybox.x, ybox.y - 0.016], {
                font: 2,
                color: [255, 255, 255, 255],
                scale: [0.5, 0.5],
                outline: false
            });
        }
        if (zbox != undefined && !selObj.baseBuild) {
            mp.game.graphics.drawRect(zbox.x, zbox.y, 0.015, 0.026, 0, 255, 0, 255);
            mp.game.graphics.drawText('Z', [zbox.x, zbox.y - 0.016], {
                font: 2,
                color: [255, 255, 255, 255],
                scale: [0.5, 0.5],
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
                refPos = mp.game.graphics.world3dToScreen2d(selObj.position.x + 1, selObj.position.y, selObj.position.z);
            } else {
                refPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y + 1, selObj.position.z);
            }
            if (mainPos == undefined || refPos == undefined) return;
            var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
            var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
            if (mode == 'Move') {
                selObj.position = new mp.Vector3(selObj.position.x + magnitude * MOVE_SENSITIVTY, selObj.position.y, selObj.position.z);
            } else {
                selObj.rotation = new mp.Vector3(selObj.rotation.x - magnitude * ROT_SENSITIVITY, selObj.rotation.y, selObj.rotation.z);
            }

        } else if (curBtn == 'y') {
            let mainPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y, selObj.position.z);
            let refPos;
            if (mode == 'Move') {
                refPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y + 1, selObj.position.z);
            } else {
                refPos = mp.game.graphics.world3dToScreen2d(selObj.position.x + 1, selObj.position.y, selObj.position.z);
            }
            if (mainPos == undefined || refPos == undefined) return;
            var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
            var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
            if (mode == 'Move') {
                selObj.position = new mp.Vector3(selObj.position.x, selObj.position.y + magnitude * MOVE_SENSITIVTY, selObj.position.z);
            } else {
                selObj.rotation = new mp.Vector3(selObj.rotation.x, selObj.rotation.y + magnitude * ROT_SENSITIVITY, selObj.rotation.z);
            }

        } else if (curBtn == 'z') {
            let mainPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y, selObj.position.z);
            let refPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y, selObj.position.z + 1);
            if (mainPos == undefined || refPos == undefined) return;
            var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
            var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
            if (mode == 'Move') {
                selObj.position = new mp.Vector3(selObj.position.x, selObj.position.y, selObj.position.z + magnitude * MOVE_SENSITIVTY);
            } else {
                selObj.rotation = new mp.Vector3(selObj.rotation.x, selObj.rotation.y, selObj.rotation.z + cursorDir.x * ROT_SENSITIVITY * 0.2); //Here direction can be determined by just x axis of mouse, hence the *0.2
            }
        }
        oldcursorPos = pos;
    }


});






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
    const from = add(camPos, mulNumber(dir, 0.1));
    const to = add(camPos, mulNumber(dir, 300));

    const ray = mp.raycasting.testPointToPoint(from, to, mp.players.local.handle, 17);
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