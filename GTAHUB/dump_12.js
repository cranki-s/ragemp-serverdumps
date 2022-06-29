{
/**
 * Joebill implementation of per-player objects.
 */
require('lerp.js');
require('pools.js');

// floor/wall models preloaded
function threeDigits(num) {
    if (num <= 9) return "00" + num;
    if (num <= 99) return "0" + num;
    return "" + num;
}

function preloadModel(prefix, from, to) {
    for (let i = from; i <= to; i++) {
        mp.game.streaming.requestModel(mp.game.joaat(prefix + threeDigits(i)));
    }
}

preloadModel("soupfloor", 1, 37);
preloadModel("souproof", 1, 3);
preloadModel("soupwall", 1, 41);
preloadModel("souplongwall", 1, 41);
preloadModel("souphalfwall", 1, 41);

let Keys = {
    Up: 0x26,
    Down: 0x28,
    Left: 0x25,
    Right: 0x27,
    Space: 0x20,
    Alt: 0x12,
    Shift: 16,
    G: 0x47, // put in ground
    F7: 0x76, // safe edit mode
    E: 0x45,
    Q: 0x51,
    X: 0x58, // switch position/rotation
    Enter: 0x0D,
    Backspace: 0x08,
    LCtrl: 17,
};

let maxPlayerObjects = 2048;
let playerObjects = new Array(maxPlayerObjects);
let playerMovibleObjects = [];
let editingIndex = -1;
let sensitivityPos = 0.7;
let sensitivityRot = 60;
let editingRot = false;
let lastFrameMs = 0;
let lastSentUpdate = 0;
let advancedEdit = false;
let safeEditMode = false; // if should check collision
let editingObjectOffset = new mp.Vector3(0,0,0); // object center offset, for camera
let editTextProperties = {
    font: 0,
    color: [255, 255, 255, 255],
    scale: [0.5, 0.5],
    outline: false
};
let easeFunctions = [ // For po:move
    function(x) { return x; },
    function(x) { return x * x; }, // ease in (slow begin, fast end)
    function(x) { return 1 - Math.pow(1 - x, 2); }, // ease out
    function(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }, // ease in out
];

let fallbackModel = mp.game.joaat("prop_laptop_01a");
let objectsToLoad = [];
let lastObjectLoaded = 0;

// towers to hide in interiors
const TOWERS = [
    mp.game.joaat("ss1_10_bld"),
    mp.game.joaat("hei_dt1_20_build2"),
    mp.game.joaat("dt1_20_rl_05"),
    mp.game.joaat("dt1_20_rl_06"),
    mp.game.joaat("dt1_20_rl_07"),
    mp.game.joaat("dt1_20_rl_08")
];

mp.objects.atJoebillId = function(id) {
    return playerObjects[id];
};

/**
 * tryToLoadModel tries to set the given model for the object at ID,
 * or sets it to fallbackModel if fails to load.
 */
function tryToLoadModel(objectID, model, tryNumber) {
    let obj = playerObjects[objectID];
    if (!obj || obj.realModel !== model) return;

    if(!mp.game.streaming.hasModelLoaded(model)) {
        if (tryNumber >= 8) {
            obj.model = fallbackModel;
            return;
        }

        mp.game.streaming.requestModel(model);
        setTimeout(() => {
            tryToLoadModel(objectID, model, tryNumber + 1);
        }, 1000);
    } else {
        obj.model = model;
    }
}

let lastInteriorID = 0;


mp.setInterval(() => {
    mp.events.call("objects:fix_lighting");
}, 200);


function reloadModels(list) {
    let defaultModel = mp.game.joaat("prop_paper_box_01");
    for (let o of list) {
        if (mp.objects.exists(o)) {
            let x = o.model;
            o.model = defaultModel;
            o.model = x;
        }
    }
}

mp.events.add("objects:fix_lighting", () => {
    let pos = mp.players.local.position;
    let interiorID = mp.game.interior.getInteriorAtCoords(pos.x, pos.y, pos.z);
    if (interiorID !== lastInteriorID) {
        if (interiorID === 0) {
            lastInteriorID = 0;
        }
        else if (mp.game.interior.isInteriorReady(interiorID)) {
            let list1 = [];
            let list2 = [];
            let list3 = [];
            let counter = 0;
            mp.objects.forEachInStreamRange(o => {
                let op = o.position;
                if (mp.game.system.vdist2(op.x, op.y, op.z, pos.x, pos.y, pos.z) < 60*60 && o.getAttachedTo() === 0) {
                    let reminent = counter % 3;
                    if (reminent === 0) list1.push(o);
                    else if (reminent === 1) list2.push(o);
                    else list3.push(o);
                    counter++;
                }
            });

            // do in 3 chunks to reduce cpu load
            reloadModels(list1);
            setTimeout(() => reloadModels(list2), 200);
            setTimeout(() => reloadModels(list3), 400);

            lastInteriorID = interiorID;
        }
    }
})

mp.rpc("po:create", (id, model, pos, rot, alpha, attachedData) => {
    if (playerObjects[id]) playerObjects[id].destroy();

    playerObjects[id] = mp.objects.new(model, pos, {rotation: rot, dimension: -1, alpha: alpha});
    if (!playerObjects[id]) {
        playerObjects[id] = mp.objects.new(fallbackModel, pos, {rotation: rot, dimension: -1, alpha: alpha});
        playerObjects[id].realModel = model;
        tryToLoadModel(id, model, 0);
        return;
    }

    playerObjects[id].originalPosition = pos;
    playerObjects[id].originalRotation = rot;
    playerObjects[id].remoteID = id;

    if (attachedData !== "{}") {
        // fix 1.1 bug, wait to attach
        setTimeout(() => {
            let attached = JSON.parse(attachedData);
            mp.events.call("po:attach", id, attached.type, attached.id, attached.bone, JSON.stringify(pos), JSON.stringify(rotJson));
        }, 30);
    }
});

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === 'object' && entity.isDoor) {
        let p = entity.position;
        mp.game.object.setStateOfClosestDoorOfType(entity.model, p.x, p.y, p.z, false, 0, false);
    }

    if (entity.type === 'object' && entity.hasCollisionDisabled === true) {
        entity.setCollision(false, false);
    }
});

// object hit detection interval
mp.setInterval(() => {
    if (mp.players.local.weapon !== mp.game.joaat('weapon_unarmed')) {
        let playerHandle = mp.players.local.handle;
        mp.objects.forEachInStreamRange(o => {
            if (mp.objects.exists(o) && o.hasBeenDamagedBy(playerHandle, true) && o.remoteID) {
                o.clearLastDamage();
                mp.events.callRemote('po:on_shot', o.remoteID);
            }
        });
    }
}, 50);

/**
 * This timer re-applies to objects some properties that seems to get
 * lost when the object doesn't stream properly.
 */
mp.setInterval(() => {
    let pos = mp.players.local.position;
    let ratio = 100*100; // max distance to object to re-set the properties
    for (let id = 0; id < maxPlayerObjects; id++) {
        if (playerObjects[id]) {
            let obj = playerObjects[id];
            let op = obj.position;
            if (mp.game.system.vdist2(op.x, op.y, op.z, pos.x, pos.y, pos.z) < ratio) {
                if (obj.isDoor) {
                    mp.game.object.setStateOfClosestDoorOfType(obj.model, op.x, op.y, op.z, false, 0, false);
                }
                if (obj.hasCollisionDisabled) {
                    obj.setCollision(false, false);
                }
            }
        }
    }
}, 1000);

mp.rpc("po:has_collision_disabled", (id, toggle) => {
    if (playerObjects[id]) {
        playerObjects[id].setCollision(!toggle, false);
        playerObjects[id].hasCollisionDisabled = toggle;
    }
});

mp.rpc("po:set_alpha", (id, alpha) => {
    if (playerObjects[id]) {
        let obj = playerObjects[id];
        let collisionDisabled = obj.hasCollisionDisabled;
        playerObjects[id] = mp.objects.new(obj.model, obj.position, {rotation: obj.rotation, dimension: -1, alpha: alpha});
        if (collisionDisabled === true) {
            mp.events.call("po:has_collision_disabled", id, true);
        }
        obj.destroy();
    }
});

mp.rpc("po:set_pos_rot", (id, pos, rot) => {
    if (playerObjects[id]) {
        playerObjects[id].position = pos;
        playerObjects[id].rotation = rot;
        playerObjects[id].originalPosition = pos;
        playerObjects[id].originalRotation = rot;
    }
});

/** Reports object ground position for this in po:on_ground */
mp.rpc("po:get_ground_position", (id, range) => {
    if (playerObjects[id]) {
        let originalModel = playerObjects[id].model;
        // If applied just before the object is created, sometimes
        // it doesn't report the correct position. So, delay
        // one frame.
        setTimeout(() => {
            let obj = playerObjects[id];
            if (obj && obj.model === originalModel) {
                let obj = playerObjects[id];
                let oldPos = obj.position;
                let oldRot = obj.rotation;

                groundObject(obj, false, false, false, 0.0, 0.0, 0.0, range > 0 ? range : null);
                let pos = obj.getCoords(true);
                let rot = obj.getRotation(2);

                mp.events.callRemote("po:on_ground",
                    id,
                    JSON.stringify(pos),
                    JSON.stringify(rot));

                obj.position = oldPos;
                obj.rotation = oldRot;
            }
        }, 100);
    }
});

mp.rpc("po:set_as_door", (id, toggle) => {
    if (playerObjects[id]) {
        const obj = playerObjects[id];
        const p = obj.position;
        obj.isDoor = toggle;
        mp.game.object.setStateOfClosestDoorOfType(obj.model, p.x, p.y, p.z, !toggle, 0, false);
        setTimeout(() => {
            if (playerObjects[id]) {
                mp.game.object.setStateOfClosestDoorOfType(playerObjects[id].model, p.x, p.y, p.z, !toggle, 0, false);
            }
        }, 4000);
    }
});

mp.rpc("po:attach", (id, entityKind, entityId, bone, offsetJson, rotationJson) => {
    if (playerObjects[id]) {
        let otherEntity = getEntityForKindAndId(entityKind, entityId);
        if (otherEntity) {
            let offset = JSON.parse(offsetJson);
            let rotation = JSON.parse(rotationJson);

            playerObjects[id].attachTo(otherEntity.handle, bone,
                offset.x, offset.y, offset.z,
                rotation.x, rotation.y, rotation.z,
                false, false, false, false, 2, true);
        }
    }
});

mp.rpc("po:detach", (id) => {
    if (playerObjects[id]) {
        playerObjects[id].detach(false, false);
        // move back to its original position after detach
        playerObjects[id].position = playerObjects[id].originalPosition;
        playerObjects[id].rotation = playerObjects[id].originalRotation;
    }
});

mp.rpc("po:move", (id, destinationPos, destinationRot, alsoRotate, unitsPerSecond, easeType) => {
    if (playerObjects[id]) {
        const obj = playerObjects[id];
        const currentPos = obj.position;
        const currentRot = obj.rotation;

        // calculate timing, set ease
        const dist = mp.game.system.vdist(currentPos.x, currentPos.y, currentPos.z, destinationPos.x, destinationPos.y, destinationPos.z);
        obj.transitionDuration = (dist / unitsPerSecond * 1000);
        obj.transitionBegin = new Date().getTime();
        obj.transitionEaseType = Math.min(easeFunctions.length, easeType);

        // set initial/final pos
        obj.initialPosition = obj.position;
        obj.destinationPosition = destinationPos;

        // set initial/final rot
        obj.initialRotation = currentRot;
        if (alsoRotate) {
            obj.rotation = destinationRot;
            obj.destinationRotation = obj.rotation; // fix in range, probably rage intenally gets it from the quaternion
            obj.rotation = currentRot;
        } else {
            obj.destinationRotation = currentRot;
        }
        obj.moving = true;
        playerMovibleObjects.push(obj);
    }
});

function moveObjects() {
    let time = new Date().getTime();
    for (let objIdx in playerMovibleObjects) {
        const obj = playerMovibleObjects[objIdx];
        if (mp.objects.exists(obj) && obj.moving) {
            let lerpOffset = (time - obj.transitionBegin) / obj.transitionDuration;
            if (lerpOffset >= 1) {
                obj.position = obj.destinationPosition;
                obj.rotation = obj.destinationRotation;
                obj.moving = false;
                playerMovibleObjects.splice(objIdx, 1);
            } else {
                lerpOffset = easeFunctions[obj.transitionEaseType](lerpOffset); // apply ease
                obj.position = lerpVector(obj.initialPosition, obj.destinationPosition, lerpOffset);
                obj.rotation = lerpEuler(obj.initialRotation, obj.destinationRotation, lerpOffset);
            }
        } else {
            playerMovibleObjects.splice(objIdx, 1);
        }
    }
}

mp.rpc("po:set_model", (id, model) => {
    if (playerObjects[id]) {
        if (!mp.game.streaming.isModelValid(model)) model = fallbackModel;
        playerObjects[id].model = model >>> 0;
    }
});

mp.rpc("po:destroy", (id) => {
    if (playerObjects[id]) {
        playerObjects[id].destroy()
        // TODO: if im editing this object, should probably cancel.
        if (id === editingIndex) {
            mp.events.callRemote("on_finish_edit_object", editingIndex, "CANCEL", JSON.stringify(new mp.Vector3()), JSON.stringify(new mp.Vector3()));
        }
    }
    playerObjects[id] = null;
});

// Object edition

mp.rpc("po:edit", (id, offset, advancedMode) => {
    if (playerObjects[id]) {

        // if already editing an object, reset its state
        if (editingIndex !== -1 &&
            playerObjects[editingIndex] &&
            playerObjects[editingIndex].handle !== 0
        ) {
            if (!advancedMode) {
                let obj = playerObjects[editingIndex];
                obj.resetAlpha();
                hideEditControls();
                mp.players.local.setNoCollision(obj.handle, true);
            }
        }

        editingIndex = id;
        mp.objects.isEditingObject = true;
        editingRot = false;
        lastFrameMs = 0;
        lastSentUpdate = 0;
        advancedEdit = advancedMode;
        safeEditMode = !advancedMode;
        editingObjectOffset = offset;
        wasTouchingAnything = false;

        if (!advancedMode) {
            showEditControls();
        }
    }
});

function showEditControls() {
    mp.players.local.editing = true;
    let controls = [
        {input: "~input_PUZZLE_UP~ ~input_PUZZLE_DOWN~ ~input_PUZZLE_LEFT~ ~input_PUZZLE_RIGHT~", name: "Mover"},
        {input: "~input_EDITION_ROTATE_RIGHT~ ~input_EDITION_ROTATE_LEFT~", name: "Rotar"},
        {input: "~input_EDITION_HEIGHT~ + ~input_PUZZLE_UP~ ~input_PUZZLE_DOWN~", name: "Cambiar altura"},
        {input: "~input_EDITION_GROUND~", name: "Corregir altura"},
        {input: "~input_EDITION_ACCELERATE~", name: "Mover rápido"},
        {input: "~input_EDITION_SAVE~", name: "Guardar"},
        {input: "~input_EDITION_CANCEL~", name: "Cancelar"},
    ];

    let notif = makeControlsNotification(controls);
    mp.events.call("notification:show", "editControls", JSON.stringify(notif));
}

function makeControlsNotification(controls) {
    let result = [];
    for (c of controls) {
        result.push({t: "stack",
            e1: {t: "big_txt", msg: c.input, "color": "#cccccc", "align": 2},
            e2: {t: "big_txt", msg: c.name,  "color": "#cccccc", "align": 0}
        });
    }
    return result;
}

function hideEditControls() {
    mp.players.local.editing = false;
    mp.events.call("notification:hide", "editControls");
}

mp.keys.bind(Keys.Enter, true, function() {
    if (editingIndex === -1 || mp.gui.cursor.visible || wasTouchingAnything === true) return;
    if (playerObjects[editingIndex]) {
        let obj = playerObjects[editingIndex];
        if (!advancedEdit) {
            mp.events.call("camera:setBehind", 500);
            obj.resetAlpha();
            hideEditControls();
            mp.players.local.setNoCollision(obj.handle, true);
        }

        let editionResult = "FINAL";
        if (obj.position.x === 0.0 && obj.position.y === 0.0 && obj.position.z === 0.0) {
            editionResult = "CANCEL";
        }
        mp.events.callRemote("on_finish_edit_object", editingIndex, editionResult, JSON.stringify(obj.position), JSON.stringify(obj.rotation));
    }
    editingIndex = -1;
    mp.objects.isEditingObject = false;
});

mp.keys.bind(Keys.Backspace, true, function() {
    if (editingIndex === -1 || mp.gui.cursor.visible) return;
    if (playerObjects[editingIndex]) {
        let obj = playerObjects[editingIndex];
        if (!advancedEdit) {
            mp.events.call("camera:setBehind", 500);
            obj.resetAlpha();
            hideEditControls();
            mp.players.local.setNoCollision(obj.handle, true);
        }

        mp.events.callRemote("on_finish_edit_object", editingIndex, "CANCEL", JSON.stringify(obj.position), JSON.stringify(obj.rotation));
    }
    editingIndex = -1;
    mp.objects.isEditingObject = false;
});

mp.keys.bind(Keys.X, true, function() {
    if (editingIndex === -1 || mp.gui.cursor.visible) return;
    if (advancedEdit) {
        editingRot = !editingRot;
    } else {
        if (playerObjects[editingIndex]) {
            let obj = playerObjects[editingIndex];
            let currentRot = obj.rotation;
            obj.rotation = new mp.Vector3(currentRot.x, currentRot.y, currentRot.z + 45.0);
        }
    }
});

mp.keys.bind(Keys.G, true, function() {
    if (editingIndex === -1 || mp.gui.cursor.visible) return;
    if (playerObjects[editingIndex]) {
        groundObject(playerObjects[editingIndex]);
    }
});

let wasTouchingAnything = false;

function isTouchingAnything(obj) {
    let result = false;
    mp.objects.forEach(obj2 => {
        if (obj2.handle && !result && obj2.id !== obj.id && obj.isTouching(obj2.handle)) {
            result = true;
        }
    });
    /*mp.players.forEachInStreamRange(p => {
        if (!result && p.handle !== 0 && obj.isTouching(p.handle)) {
            result = true;
        }
    })*/
    return result;
}

function objectsInInteriorHandler(playerInterior, playerRoom) {

    // hide towers in interiors
    for (let tower of TOWERS) {
        mp.game.interior.hideMapObjectThisFrame(tower);
    }

    // load interior objects
    if (Date.now() - lastObjectLoaded > 500 || objectsToLoad.length === 0) {
        lastObjectLoaded = Date.now();

        if (objectsToLoad.length === 0) {
            mp.objects.forEachInStreamRange((o) => {
                if (o.handle && !o.isAttached() && mp.game.invoke("0x2107BA504071A6BB", o.handle) === 0) { // check if object is streamed, is not attached and interior is 0
                    objectsToLoad.push(o.handle);
                    mp.game.invoke("0x52923C4710DD9907", o.handle, playerInterior, playerRoom); // forces the same room and id on the object
                }
            });
        } else {
            // try to reload objects that are in interior 0
            if (playerInterior !== 0 && playerRoom !== 0) {
                for (let objHandle of objectsToLoad) {
                    if (mp.game.invoke("0x2107BA504071A6BB", objHandle) === 0) {
                        mp.game.invoke("0x52923C4710DD9907", objHandle, playerInterior, playerRoom);
                    }
                }
            }
        }
    }
}

mp.events.add("render", () => {
    moveObjects();

    let playerRoom = mp.game.invoke("0x47C2A06D4F5F424B", mp.players.local.handle); // gets the room in which the player is
    let playerInterior = mp.game.invoke("0x2107BA504071A6BB", mp.players.local.handle); // gets the interior in which the player is
    if (playerInterior > 0 && playerRoom > 0) {
        if (mp.players.local.dimension > 100000) {
            objectsInInteriorHandler(playerInterior, playerRoom);
        }
    } else if (objectsToLoad.length > 0) {
        if (mp.players.local.dimension > 100000) {
            for (let objHandle of objectsToLoad) {
                let obj = mp.objects.atHandle(objHandle);
                if (mp.objects.exists(obj)) mp.game.invoke("0x85D5422B2039A70D", objHandle); // _CLEAR_INTERIOR_FOR_ENTITY
            }
        }
        objectsToLoad = [];
    }

    if (editingIndex !== -1 && playerObjects[editingIndex] && !mp.gui.cursor.visible) {

        // Determine Delta for frame-independent movement
        let time = new Date().getTime();
        if (lastFrameMs === 0)
            lastFrameMs = time;

        let delta = (time - lastFrameMs) / 1000.0; // delta in seconds.
        lastFrameMs = time;

        const cam = mp.playerCamera.getActiveCamera();
        let front = cam.getDirection();
        let obj = playerObjects[editingIndex];

        let centerPos = mp.game.object.getObjectOffsetFromCoords(
            obj.position.x, obj.position.y, obj.position.z,
            obj.getHeading(),
            editingObjectOffset.x, editingObjectOffset.y, editingObjectOffset.z
        );

        if (!advancedEdit) {
            const playerPos = mp.players.local.position;
            playerPos.z += 1.3;
            mp.events.call("camera:set", JSON.stringify(playerPos), JSON.stringify(centerPos), 0);
        }

        // Read keys
        const currPos = editingRot ? obj.rotation : obj.position;
        let up = mp.keys.isDown(Keys.Up);
        let down = mp.keys.isDown(Keys.Down);
        let left = mp.keys.isDown(Keys.Left);
        let right = mp.keys.isDown(Keys.Right);
        let alt = mp.keys.isDown(Keys.Alt);
        let shift = mp.keys.isDown(Keys.Shift);
        let space = mp.keys.isDown(Keys.Space);
        let ctrl = mp.keys.isDown(Keys.LCtrl);
        let q = mp.keys.isDown(Keys.Q);
        let e = mp.keys.isDown(Keys.E);

        // While holding SPACE round X,Y axes
        if (space) {
            front.x = Math.round(front.x);
            front.y = Math.round(front.y);
        }

        // Determine sensitivity based on controls
        let sensitivity = 0;
        if (editingRot) {
            front.x = 0; // invert movement for easy x,z rotation
            front.y = 1;
            alt = !alt; // invert alt so automatically changes z

            // invert left/right and up/down
            let oldLeft = left;
            let oldRight = right;
            left = down;
            right = up;
            up = oldRight;
            down = oldLeft;
            sensitivity = sensitivityRot * delta;
        } else {
            sensitivity = sensitivityPos * delta;
        }

        if (shift) sensitivity *= 3;
        if (ctrl) sensitivity /= 3;

        if (q || e) {
            let actualRot = obj.rotation;
            actualRot.z = actualRot.z + (sensitivityRot * delta * (q ? -1 : 1));
            obj.rotation = actualRot;
        }

        // Move the editing vector
        if (up || down) {
            let s = down ? -1 : 1;
            if (!alt) {
                currPos.x += front.x * sensitivity * s;
                currPos.y += front.y * sensitivity * s;
            } else {
                currPos.z += sensitivity * s;
            }
        }
        if (left || right) {
            let newAngle = Math.atan2(front.y, front.x) + (left ? Math.PI/2 : -Math.PI/2); // front vector moved 90
            front.x = Math.cos(newAngle);
            front.y = Math.sin(newAngle);
            currPos.x += front.x * sensitivity;
            currPos.y += front.y * sensitivity;
        }

        if (editingRot) {
            obj.rotation = currPos;
        } else {
            obj.position = currPos;
        }

        // Show info about edition
        let graphicText = "";
        if (advancedEdit) {
            let posCoords = `${currPos.x.toFixed(2)} ${currPos.y.toFixed(2)} ${currPos.z.toFixed(2)}`;
            let prefix = editingRot ? "~p~" : "~y~";
            graphicText = `${prefix}~n~${posCoords}`;
        } else {
            if (!wasTouchingAnything) {
                graphicText = "~h~~w~EDITANDO"
            } else {
                graphicText = "~h~~c~EDITANDO"
            }
        }

        let objPos = centerPos;
        mp.game.graphics.drawText(graphicText, [objPos.x, objPos.y, objPos.z], editTextProperties);

        // send UPDATE messages 4 times per second
        if (time - lastSentUpdate > 250) {
            mp.events.callRemote("on_finish_edit_object", editingIndex, "UPDATE", JSON.stringify(obj.position), JSON.stringify(obj.rotation));
            lastSentUpdate = time;
        }

        // fix if isTouchingAnything
        if (safeEditMode) {

            // don't allow any input in this mode, as the player should be static
            mp.game.controls.disableAllControlActions(0); // INPUTGROUP_MOVE
            mp.game.controls.disableAllControlActions(27); // INPUTGROUP_VEH_MOVE_ALL
            mp.game.controls.disableAllControlActions(31); // INPUTGROUP_VEH_HYDRAULICS_CONTROL

            // keep the same position

            let touchingAnything = isTouchingAnything(obj);
            if (touchingAnything !== wasTouchingAnything) {
                if (touchingAnything) {
                    obj = setObjectAlpha(obj, 51);
                    playerObjects[editingIndex] = obj;
                } else {
                    obj = setObjectAlpha(obj, 255);
                    playerObjects[editingIndex] = obj;
                }
            }

            // forcefully disable collision with editing object
            mp.players.local.setNoCollision(obj.handle, false);

            // old version: rollback position on collision
            /*if (!wasTouchingAnything && touchingAnything) {
                // roll back position
                obj.position = originalPos;
                obj.rotation = originalRot;
            }*/

            wasTouchingAnything = isTouchingAnything(obj);
        }
    }
});


function setObjectAlpha(obj, alpha) {
    if (obj.getAlpha() !== alpha) {
        let newObj = mp.objects.new(obj.model, obj.position, {
            alpha: alpha,
            rotation: obj.rotation,
            dimension: obj.dimension
        });
        obj.destroy();
        return newObj;
    }
    return obj;
}

// Util

function groundObject(obj, changeRotX, changeRotY, changeRotZ, rx, ry, rz, range) {
    const originalPosition = obj.getCoords(true);

    // try to put in ground
    if (!obj.placeOnGroundProperly()) {
        // if fails, go down its height and try again
        let currPos = obj.position;
        obj.position = new mp.Vector3(currPos.x, currPos.y, currPos.z - obj.getHeightAboveGround());
        obj.placeOnGroundProperly();
    }

    let pos = obj.getCoords(true);
    let rot = obj.getRotation(2);

    if (!range || range && mp.game.system.vdist(originalPosition.x, originalPosition.y, originalPosition.z, pos.x, pos.y, pos.z) <= range) {
        obj.position = new mp.Vector3(pos.x, pos.y, pos.z + 0.01/*little above ground to avoid the collision*/);
        obj.rotation = new mp.Vector3(changeRotX ? rx : rot.x, changeRotY ? ry : rot.y, changeRotZ ? rz : rot.z);
    } else {
        // what happened if I need a ground position but is under the map, this avoids object bug under the ground
        obj.position = originalPosition;
    }
}
}