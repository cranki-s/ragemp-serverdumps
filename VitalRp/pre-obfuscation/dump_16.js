{
﻿var moving_speeds = [0.05, 0.1, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0];
var moving_speed_idx = 0;
var editing_types = ["Position X", "Position Y", "Position Z", "Rotation X", "Rotation Y", "Rotation Z"];
var editing_type_idx = 0;
global.editing = !1;
var object = null;
var toggle_rotation = !1;
var modelo = -1;
mp.events.add('startBuy', function (model) {
    modelo = mp.game.joaat(model);
    object = mp.objects.new(mp.game.joaat(model), localplayer.getCoords(!0), {
        rotation: new mp.Vector3(0, 0, 0),
        alpha: 255,
        dimension: localplayer.dimension
    });
    editing = !0;
    toggle_rotation = !1;
    moving_speed_idx = 0;
    mp.gui.chat.show(!0);
    mp.gui.cursor.visible = !1;
    cursor_status = !1
});
mp.events.add('startEditing', function (model, position, rotation) {
    modelo = mp.game.joaat(model);
    object = mp.objects.new(mp.game.joaat(model), position, {
        rotation: rotation,
        alpha: 255,
        dimension: localplayer.dimension
    });
    editing = !0;
    toggle_rotation = !1;
    moving_speed_idx = 0;
    mp.gui.chat.show(!0);
    mp.gui.cursor.visible = !1;
    cursor_status = !1
});

function updateObject() {
    if (object == null) return;
    var model = object.model;
    var position = object.position;
    var rot = object.getRotation(2);
    var pitch = object.getPitch();
    object.destroy();
    object = mp.objects.new(model, position, {
        rotation: new mp.Vector3(0, 0, 0),
        alpha: 255,
        dimension: localplayer.dimension
    });
    object.setRotation(pitch, rot.y, rot.z, 2, !0)
}
mp.events.add('endEditing', function () {
    object.destroy();
    object = null;
    editing = !1
});
mp.keys.bind(0x26, !1, function () {
    if (chatopened || !editing) return;
    if (toggle_rotation === !1) {
        var pos = object.position;
        object.position = new mp.Vector3(pos.x, pos.y + moving_speeds[moving_speed_idx], pos.z)
    } else {
        var rot = object.getRotation(2);
        var pitch = object.getPitch();
        object.setRotation(pitch, rot.y + moving_speeds[moving_speed_idx], rot.z, 2, !0)
    }
    updateObject()
});
mp.keys.bind(0x28, !1, function () {
    if (chatopened || !editing) return;
    if (toggle_rotation === !1) {
        var pos = object.position;
        object.position = new mp.Vector3(pos.x, pos.y - moving_speeds[moving_speed_idx], pos.z)
    } else {
        var rot = object.getRotation(2);
        var pitch = object.getPitch();
        object.setRotation(pitch, rot.y - moving_speeds[moving_speed_idx], rot.z, 2, !0)
    }
    updateObject()
});
mp.keys.bind(0x25, !1, function () {
    if (chatopened || !editing) return;
    if (toggle_rotation === !1) {
        var pos = object.position;
        object.position = new mp.Vector3(pos.x - moving_speeds[moving_speed_idx], pos.y, pos.z)
    } else {
        var rot = object.getRotation(2);
        var pitch = object.getPitch();
        object.setRotation(pitch - moving_speeds[moving_speed_idx], rot.y, rot.z, 2, !0)
    }
    updateObject()
});
mp.keys.bind(0x27, !1, function () {
    if (chatopened || !editing) return;
    if (toggle_rotation === !1) {
        var pos = object.position;
        object.position = new mp.Vector3(pos.x + moving_speeds[moving_speed_idx], pos.y, pos.z)
    } else {
        var rot = object.getRotation(2);
        var pitch = object.getPitch();
        object.setRotation(pitch + moving_speeds[moving_speed_idx], rot.y, rot.z, 2, !0)
    }
    updateObject()
});
mp.keys.bind(0x5A, !1, function () {
    if (chatopened || !editing) return;
    if (toggle_rotation === !1) {
        var pos = object.position;
        object.position = new mp.Vector3(pos.x, pos.y, pos.z + moving_speeds[moving_speed_idx])
    } else {
        var rot = object.getRotation(2);
        var pitch = object.getPitch();
        object.setRotation(pitch, rot.y, rot.z + moving_speeds[moving_speed_idx], 2, !0)
    }
    updateObject()
});
mp.keys.bind(0x58, !1, function () {
    if (chatopened || !editing) return;
    if (toggle_rotation === !1) {
        var pos = object.position;
        object.position = new mp.Vector3(pos.x, pos.y, pos.z - moving_speeds[moving_speed_idx])
    } else {
        var rot = object.getRotation(2);
        var pitch = object.getPitch();
        object.setRotation(pitch, rot.y, rot.z - moving_speeds[moving_speed_idx], 2, !0)
    }
    updateObject()
});
mp.keys.bind(0x59, !1, function () {
    if (chatopened || !editing) return;
    var rot = object.getRotation(2);
    var pitch = object.getPitch();
    var position = new mp.Vector3(object.position.x.toFixed(3), object.position.y.toFixed(3), object.position.z.toFixed(3));
    var rotation = new mp.Vector3(rot.x.toFixed(2), rot.y.toFixed(2), rot.z.toFixed(2));
    mp.events.callRemote('acceptEdit', modelo, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
    object.destroy();
    object = null;
    editing = !1
});
mp.keys.bind(0x4E, !1, function () {
    if (chatopened || !editing) return;
    object.destroy();
    object = null;
    editing = !1;
    mp.events.callRemote('cancelEdit')
});
mp.keys.bind(0x21, !1, function () {
    if (chatopened || !editing) return;
    moving_speed_idx++;
    if (moving_speed_idx >= moving_speeds.length) moving_speed_idx = 0
});
mp.keys.bind(0x22, !1, function () {
    if (chatopened || !editing) return;
    moving_speed_idx--;
    if (moving_speed_idx < 0) moving_speed_idx = moving_speeds.length - 1
});
mp.keys.bind(0x45, !1, function () {
    if (chatopened || !editing) return;
    if (toggle_rotation === !1) {
        toggle_rotation = !0
    } else {
        toggle_rotation = !1
    }
});

function zoomLevel() {
    return mp.game.invoke('0x33E6C8EFD0CD93E9')
}

function pointingAt(distance) {
    const camera = mp.cameras.new("gameplay");
    let position = camera.getCoord();
    let direction = camera.getDirection();
    let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z));
    let result = mp.raycasting.testPointToPoint(position, farAway, 17);
    if (result) { if (typeof (result.entity) === 'number' && result.entity !== 0 && mp.game.entity.isAnObject(result.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(result.entity); } }
    return result
}
mp.events.add('render', () => {
    if (object !== null) {
        mp.game.graphics.drawText(`~y~Controale`, [0.5, 0.05], {
            font: 0,
            color: [255, 255, 255, 255],
            scale: [0.5, 0.5],
            outline: !1
        });
        mp.game.graphics.drawText(`Y: Confirma~n~N: Anuleaza~n~Sageti : Muta obiectul in pozitia dorita`, [0.5, 0.1], {
            font: 0,
            color: [255, 255, 255, 255],
            scale: [0.3, 0.3],
            outline: !1
        });
        mp.game.graphics.drawText(`~n~~n~~n~E: Schimbati intre rotatie si pozitie`, [0.5, 0.1], {
            font: 0,
            color: [255, 255, 255, 255],
            scale: [0.3, 0.3],
            outline: !1
        });
        mp.game.graphics.drawText(`~n~~n~~n~~n~Page up & page down: ajusteaza viteza miscarii (${moving_speeds[moving_speed_idx]})`, [0.5, 0.1], {
            font: 0,
            color: [255, 255, 255, 255],
            scale: [0.3, 0.3],
            outline: !1
        });
        mp.game.graphics.drawText(`~n~~n~~n~~n~~n~Stanga & Dreapta: X~n~Sus & Jos: Y~n~Z & X: Z`, [0.5, 0.1], {
            font: 0,
            color: [255, 255, 255, 255],
            scale: [0.3, 0.3],
            outline: !1
        })
    }
})
}