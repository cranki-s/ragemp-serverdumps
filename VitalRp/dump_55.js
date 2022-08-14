{
let taping = false;
let position = null;
let startTapePosition = null;
let endTapePosition = null;
let tape = [];
let objs = [];
let tapelimit = 0;
let tapecell = -1;

let tapesizes = [];



const GetTapeStartingPoint = (range = 3.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if (!secondPoint) return null;
    startPosition.z -= 0.3;
    const target = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, 17);
    
    if (target)
    {

        return target.position;
    }
    else return null;
}


const drawTarget3d = (pos, textureDict = "mpmissmarkers256", textureName = "corona_shade", scaleX = 0.005, scaleY = 0.01) => {
    dposition = mp.game.graphics.world3dToScreen2d(pos);
    if (!dposition) return;
    mp.game.graphics.drawSprite(textureDict, textureName, dposition.x, dposition.y, scaleX, scaleY, 0, 0, 0, 0, 155);

}
let cuttingPos = null;

mp.events.add({
    'render': () => {
        if (taping) {
            let tapePoint = GetTapeStartingPoint();

            if (tapePoint) {
                //drawTarget3d(tapePoint)
                mp.game.graphics.drawBox(tapePoint.x + 0.05, tapePoint.y + 0.05, tapePoint.z + 0.05, tapePoint.x - 0.05, tapePoint.y - 0.05, tapePoint.z - 0.05, 255, 255, 255, 200);
                position = tapePoint;

                if (startTapePosition != null) {
                    
                    if (GetRopeAmount(startTapePosition, tapePoint) < 15 && GetRopeAmount(startTapePosition, tapePoint) <= tapelimit) {
                        mp.game.graphics.drawLine(startTapePosition.x, startTapePosition.y, startTapePosition.z, tapePoint.x, tapePoint.y, tapePoint.z, 255, 255, 255, 255)
                        drawPassText(`${GetRopeAmount(startTapePosition, tapePoint)}/${tapelimit}`)
                    }
                    else {
                        mp.game.graphics.drawLine(startTapePosition.x, startTapePosition.y, startTapePosition.z, tapePoint.x, tapePoint.y, tapePoint.z, 220, 20, 60, 255)
                        drawFailText(`${GetRopeAmount(startTapePosition, tapePoint)}/${tapelimit}`)
                    }
                }
                else drawFailText(`0/${tapelimit}`)
            }
            else drawFailText(`0/${tapelimit}`)
        }
        if (!taping) {
            tape.forEach((ptape) => {
                pos1 = mp.players.local.position;
                if (ptape.handle && ptape.handle > 0) {
                    pos2 = ptape.position;
                    if (pos2) {
                        if (mp.game.system.vdist(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z) < 3) {
                            cuttingPos = id;
                            drawcutRopte("Press [E] to cut this tape!")
                        }
                        
                    }
                }
        })
        }
    },
    'StartPoliceTape': (cell, amount) => {
        mp.gui.chat.push(`${JSON.stringify(tapesizes)}`)
        taping = true;
        tapelimit = amount;
        tapecell = cell;
    },
    'CreatePoliceTape': (prop, center, angle, dimension, booltape, id) => {
        newObj = mp.objects.new(mp.game.joaat(prop), center,
            {
                rotation: angle,
                alpha: 255,
                dimension: dimension
            });
        newObj.id = id;
        if (booltape && newObj) {
            mp.gui.chat.push('created rope added to list');
            tape.push(newObj);
        }
    },
    'deleteTape': (id) => {
        let index = tape.findIndex(element => element.id === id)
        if (index > -1) {
            tape[index].destroy();
            tape.splice(index, 1); 
        }

    }

});


function drawcutRopte(text) {
    mp.game.graphics.drawText(`${text}`, [(res_X / 2) / res_X, (res_Y / 2) / res_Y], {
        font: 4,
        color: [255, 255, 255, 220 - 20],
        scale: [0.40, 0.40],
        outline: true,
        shadow: true,
        centre: false
    });
}

function drawPassText(text) {
    mp.game.graphics.drawText(`${text}`, [(res_X / 2) / res_X, (res_Y / 2) / res_Y], {
        font: 4,
        color: [0, 255, 0, 220 - 20],
        scale: [0.40, 0.40],
        outline: true,
        shadow: true,
        centre: false
    });
}


function drawFailText(text) {
    mp.game.graphics.drawText(`${text}`, [(res_X / 2) / res_X, (res_Y / 2) / res_Y], {
        font: 4,
        color: [220, 20, 60, 220 - 20],
        scale: [0.40, 0.40],
        outline: true,
        shadow: true,
        centre: false
    });
}

mp.keys.bind(69, true, () => {
    if (taping) {
        if (global.logged === 0) return;
        if (position) {
            if (startTapePosition == null) {
                startTapePosition = position;
                return;
            }
            else if (startTapePosition) {

                endTapePosition = position;
                if (GetRopeAmount(startTapePosition, endTapePosition) < 15 && GetRopeAmount(startTapePosition, endTapePosition) <= tapelimit) {
                    createRope();
                    startTapePosition = null;
                    endTapePosition = null;

                }
            }
        }
    }
    else if (cuttingPos) {
        mp.events.callRemote("deleteRope", cuttingPos);
    }
});


mp.keys.bind(88, true, () => {
    if (taping) {
        taping = false;
        mp.attachmentMngr.removeLocal("policetape");
    }
});



function createRope() {

    let amount = GetRopeAmount(startTapePosition, endTapePosition);
    if (amount > tapelimit || amount > 14 || amount === 0) return;
 


    center = new mp.Vector3(0, 0, 0)
    center.x = (startTapePosition.x + endTapePosition.x) / 2
    center.y = (startTapePosition.y + endTapePosition.y) / 2
    center.z = (startTapePosition.z + endTapePosition.z) / 2
    mp.gui.chat.push("1")
    let xy = 90 + calcAngleDegrees(startTapePosition.x - endTapePosition.x, startTapePosition.y - endTapePosition.y);
    mp.gui.chat.push("2")
    if (xy < 0) xy += 360;

    let downcoords = startTapePosition;
    if (startTapePosition.z > endTapePosition.z) downcoords = endTapePosition;

    let a = Math.sqrt(Math.pow((downcoords.x - center.x), 2) + Math.pow((downcoords.y - center.y), 2));
    let c = amount / 2;
    let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));

    let xz = 90 + Math.acos(((b * b) + ((c) * (c)) - (a * a)) / (2 * b * (c))) * 180 / Math.PI;
    if (xz < 0) xz += 360;

    if (startTapePosition.z < endTapePosition.z) {
        xz = 180 - xz;
    }

    let angle = new mp.Vector3(xz, 0, xy);
    mp.gui.chat.push(JSON.stringify(center))
    mp.gui.chat.push(JSON.stringify(angle))

    let prop = `prop_police_tape_0${amount}`
    tapelimit = tapelimit - amount;
    mp.events.callRemote("removeTapeItem", tapecell, amount);
    mp.events.callRemote("createTape", prop, center, angle, mp.players.local.dimension, true);



    
}


function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}


function GetRopeAmount(pos1, pos2) {
    var distance = mp.game.system.vdist(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z);
    var rounded = Math.round(distance, 0);
    if (distance > 6) {
        rounded -= 1
    }
    else if (distance > 7) {
        rounded -= 3
    }
    else if (distance > 8) {
        rounded -= 4
    }
    return rounded;
}




var res = mp.game.graphics.getScreenActiveResolution(0, 0);

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



mp.events.add('createPoliceObject', (objectName) => {
    if (selObj) selObj.destroy();
    let spawnPos = mp.players.local.getOffsetFromInWorldCoords(0, 0, -5);
    let object = mp.objects.new(mp.game.joaat(objectName), spawnPos,
        {
            rotation: 0,
            alpha: 200,
            dimension: mp.players.local.dimension
        });
    waitForObjectAndStart(object)
});

async function waitForObjectAndStart(object) {

    while (!object.handle || object.handle === 0) {
        await mp.game.waitAsync(100);
    }
    mp.events.call('startPolicePosition', object.id)
}


mp.events.add('startPolicePosition', (objid) => {
    mp.gui.cursor.show(true, true);
    selObj = mp.objects.at(objid);
    selObj.setCollision(false, false);
    oldPos = selObj.position;
    oldRot = selObj.rotation;
});

mp.events.add('render', () => {
    if (selObj) {
        mp.game.graphics.drawLine(selObj.position.x - 1.0, selObj.position.y, selObj.position.z, selObj.position.x + 1.0, selObj.position.y, selObj.position.z, 0, 0, 255, 255);
        mp.game.graphics.drawLine(selObj.position.x, selObj.position.y - 1.0, selObj.position.z, selObj.position.x, selObj.position.y + 1.0, selObj.position.z, 255, 0, 0, 255);
        mp.game.graphics.drawLine(selObj.position.x, selObj.position.y, selObj.position.z - 1.0, selObj.position.x, selObj.position.y, selObj.position.z + 1.0, 0, 255, 0, 255);

        xbox = mp.game.graphics.world3dToScreen2d(selObj.position.x + 1.5, selObj.position.y, selObj.position.z);
        ybox = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y + 1.5, selObj.position.z);
        zbox = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y, selObj.position.z + 1.5);
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
               
                refPos = mp.game.graphics.world3dToScreen2d(selObj.position.x + 1, selObj.position.y, selObj.position.z);
            } else {
                refPos = mp.game.graphics.world3dToScreen2d(selObj.position.x, selObj.position.y + 1, selObj.position.z);
            }
            if (mainPos == undefined || refPos == undefined) return;
            var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
            var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
            if (mode == 'Move') {
                if ((mp.game.system.vdist(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, selObj.position.x + magnitude * MOVE_SENSITIVTY, selObj.position.y, selObj.position.z) < 3)) {
                    selObj.position = new mp.Vector3(selObj.position.x + magnitude * MOVE_SENSITIVTY, selObj.position.y, selObj.position.z);
                }
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
                if ((mp.game.system.vdist(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, selObj.position.x, selObj.position.y + magnitude * MOVE_SENSITIVTY, selObj.position.z) < 3)) {
                    selObj.position = new mp.Vector3(selObj.position.x, selObj.position.y + magnitude * MOVE_SENSITIVTY, selObj.position.z);
                }
                
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
                if ((mp.game.system.vdist(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, selObj.position.x, selObj.position.y, selObj.position.z + magnitude * MOVE_SENSITIVTY) < 3)) {
                    selObj.position = new mp.Vector3(selObj.position.x, selObj.position.y, selObj.position.z + magnitude * MOVE_SENSITIVTY);
                }
                
            } else {
                selObj.rotation = new mp.Vector3(selObj.rotation.x, selObj.rotation.y, selObj.rotation.z + cursorDir.x * ROT_SENSITIVITY * 0.2); //Here direction can be determined by just x axis of mouse, hence the *0.2
            }
        }
        oldcursorPos = pos;
    }
});

mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
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
    selObj = null;
    mp.gui.cursor.show(false, false);
}

function saveChanges() {
    let pos = selObj.getCoords(true);
    let rot = selObj.getRotation(2);
    mp.events.call('objecteditor:finish', selObj.id, JSON.stringify(pos), JSON.stringify(rot));
    selObj.setCollision(true, true);
    selObj = null;
    mp.gui.cursor.show(false, false);
}
}