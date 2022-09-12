{
const controlsIds = {
    F5: 327,
    W: 32,
    S: 33,
    A: 34,
    D: 35,
    Space: 321,
    LCtrl: 326,
    E: 44,
    Q: 46
};
global.fly = {
    flying: !1,
    f: 0.3,
    w: 0.3,
    h: 0.3,
    constant: 0.3,
    max: 0.6,
    point_distance: 1000,
};
global.gameplayCam = mp.cameras.new('gameplay');
let direction = null;
let coords = null;

function pointingAt(distance) {
    const farAway = new mp.Vector3((direction.x * distance) + (coords.x), (direction.y * distance) + (coords.y), (direction.z * distance) + (coords.z));
    const result = mp.raycasting.testPointToPoint(coords, farAway, 17);
    if (result) { if (typeof (result.entity) === 'number' && result.entity !== 0 && mp.game.entity.isAnObject(result.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(result.entity); } }
    if (result === undefined) {
        return 'undefined'
    }
    return result
}


const mSP = 30;
var prevP = mp.players.local.position;
let lastPCheck = 0;

let time = null;

let startcheck = false;


mp.events.add('render', () => {
    if (global.logged) {
        if (time === null) {
            time = new Date().getTime();
        }
        if (!startcheck && new Date().getTime() - time > 30000) {
            startcheck = true;
            prevP = mp.players.local.position;
        }
    }
    if (startcheck && !fly.flying && mp.players.local.dimension === 0 && global.logged) {
        if (new Date().getTime() - lastPCheck > 500) {
            lastPCheck = new Date().getTime();
            let temp = mp.players.local.getCoords(true);

            let dist = mp.game.system.vdist(prevP.x, prevP.y, prevP.z, temp.x, temp.y, temp.z);

            prevP = mp.players.local.getCoords(true);

            if (!mp.players.local.isInAnyVehicle(true)) {
                if (dist > mSP) {
                    mp.events.callRemote("announceAdminsFly")
                }
            }

        }
    }

    if (fly.flying) {
        const controls = mp.game.controls;
        const fly = global.fly;
        direction = global.gameplayCam.getDirection();
        coords = global.gameplayCam.getCoord();
        /*mp.game.graphics.drawText(`Coords: ${JSON.stringify(coords)}`, [0.5, 0.005], {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.3, 0.3],
            outline: !0,
        });
        mp.game.graphics.drawText(`pointAtCoord: ${JSON.stringify(pointingAt(fly.point_distance).position)}`, [0.5, 0.025], {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.3, 0.3],
            outline: !0,
        });*/
        let updated = !1;
        const position = mp.players.local.position;
        if (controls.isControlPressed(0, controlsIds.Q)) {
            if (fly.constant < 2) {
                fly.constant += 0.05;
                fly.constant += 0.1;
;            }
            else fly.constant = 2;

        } else if (controls.isControlPressed(0, controlsIds.E)) {
            if (fly.constant > 0.10) {
                fly.constant -= 0.05;
                fly.constant -= 0.1;
            }
            else fly.constant = 0.10;
        }
        if (controls.isControlPressed(0, controlsIds.W)) {
            if (fly.f < fly.max) {
                fly.f += fly.constant
            }
            position.x += direction.x * fly.constant;
            position.y += direction.y * fly.constant;
            position.z += direction.z * fly.constant;
            updated = !0
        } else if (controls.isControlPressed(0, controlsIds.S)) {
            if (fly.f < fly.max) {
                fly.f += fly.constant
            }
            position.x -= direction.x * fly.constant;
            position.y -= direction.y * fly.constant;
            position.z -= direction.z * fly.constant;
            updated = !0
        } else {
            fly.f = fly.constant
        }
        if (controls.isControlPressed(0, controlsIds.A)) {
            if (fly.l < fly.max) {
                fly.l += fly.constant
            }
            position.x += (-direction.y) * fly.constant;
            position.y += direction.x * fly.constant;
            updated = !0
        } else if (controls.isControlPressed(0, controlsIds.D)) {
            if (fly.l < fly.max) {
                fly.l += fly.constant
            }
            position.x -= (-direction.y) * fly.constant;
            position.y -= direction.x * fly.constant;
            updated = !0
        } else {
            fly.l = fly.constant
        }
        if (controls.isControlPressed(0, controlsIds.Space)) {
            if (fly.h < fly.max) {
                fly.h += fly.constant
            }
            position.z += fly.constant;
            updated = !0
        } else if (controls.isControlPressed(0, controlsIds.LCtrl)) {
            if (fly.h < fly.max) {
                fly.h += fly.constant
            }
            position.z -= fly.constant;
            updated = !0
        } else {
            fly.h = fly.constant
        }
        if (updated) {
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, !1, !1, !1)
        }
    }
});
mp.events.add('getCamCoords', (name) => {
    mp.events.callRemote('saveCamCoords', JSON.stringify(coords), JSON.stringify(pointingAt(fly.point_distance)), name)
});
mp.events.add('flyModeStart', () => {
    fly.flying = !fly.flying;
    const player = mp.players.local;
    player.setInvincible(fly.flying);
    player.setCanBeTargetted(!fly.flying);
    if (!fly.flying && player.hasVariable('adminInv') && player.getVariable('adminInv') === true) {
        player.setProofs(true, true, true, true, true, true, true, true);
    }
    else player.setProofs(fly.flying, fly.flying, fly.flying, fly.flying, fly.flying, fly.flying, fly.flying, fly.flying);
    player.setCollision(!fly.flying, !fly.flying)
    player.freezePosition(fly.flying);
    mp.game.graphics.notify(fly.flying ? 'Fly: ~g~Enabled' : 'Fly: ~r~Disabled')
})




var attachedObjects = [];

mp.events.add('attachObject', attachObject);
mp.events.add('detachObject', function (id) {
    try {
        let player = mp.players.atRemoteId(id);
        if (player && mp.players.exists(player)) {
            if (attachedObjects[player.remoteId] != undefined) attachedObjects[player.remoteId].destroy();
            attachedObjects[player.remoteId] = undefined;
        }
    } catch (e) { }
});

function attachObject(id) {
    try {
        let player = mp.players.atRemoteId(id);
        if (player && mp.players.exists(player)) {
            if (attachedObjects[player.remoteId] != undefined) attachedObjects[player.remoteId].destroy();

            if (player.getVariable('attachedObject') == null) return;
            let data = JSON.parse(player.getVariable('attachedObject'));
            let boneID = player.getBoneIndex(data.Bone);
            var object = mp.objects.new(data.Model, player.position,
                {
                    rotation: new mp.Vector3(0, 0, 0),
                    alpha: 255,
                    dimension: player.dimension
                });

            waitEntity(object).then(() => {
                object.attachTo(player.handle, boneID, data.PosOffset.x, data.PosOffset.y, data.PosOffset.z, data.RotOffset.x, data.RotOffset.y, data.RotOffset.z, true, true, false, false, 0, true);
                attachedObjects[player.remoteId] = object;
            });
        }
    } catch (e) { }
}
function waitEntity(entity) {
    return new Promise(resolve => {
        let wait = setInterval(() => {
            if (mp.game.entity.isAnEntity(entity.handle)) {
                clearInterval(wait);
                resolve();
            }
        }, 3);
    });
}

mp.events.add('toggleInvisible', function (player, toggle) {
    try {
        if (mp.players.exists(player)) {
            if (toggle) player.setAlpha(0);
            else player.setAlpha(255);
        }
    } catch (e) { }
});


}