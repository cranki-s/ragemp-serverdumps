{
﻿var moving_speeds = [0.01, 0.1, 1.0, 5.0, 10.0];
var moving_speed_idx = 0;

var editing_types = ["Позиция по X", "Позиция по Y", "Высота", "Наклон по X", "Наклон по Y", "Поворот"];
var editing_type_idx = 0;

global.editing = false;
var object = null;

mp.events.add('startEditing', function (model) {
    object = mp.objects.new(mp.game.joaat(model), new mp.Vector3(localplayer.position.x+1, localplayer.position.y+1, localplayer.position.z-0.5), //localplayer.getCoords(true),
        {
            rotation: new mp.Vector3(0, 0, 0),
            alpha: 255,
            dimension: localplayer.dimension
        });
    editing = true;
});

function updateObject() {
    if (object == null) return;
    var model = object.model;
    var position = object.position;
    var rot = object.getRotation(2);
    var pitch = object.getPitch();
    object.destroy();
    object = mp.objects.new(model, position,
        {
            rotation: new mp.Vector3(pitch, rot.y, rot.z),
            alpha: 255,
            dimension: localplayer.dimension
        });

}

let sc = mp.game.graphics.requestScaleformMovie("instructional_buttons");
let scInst = 0;

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
});

mp.keys.bind(0x26, false, function () { // UP Arrow
    //mp.gui.chat.push("Old rot: " + new mp.Vector3(object.getRotation(2).x, object.getRotation(2).y, object.getRotation(2).z));
    if (chatActive || !editing) return;
    switch (editing_type_idx) {
        // pos x
        case 0:
            var pos = object.position;
            object.position = new mp.Vector3(pos.x + moving_speeds[moving_speed_idx], pos.y, pos.z);
            break;
        // pos y
        case 1:
            var pos = object.position;
            object.position = new mp.Vector3(pos.x, pos.y + moving_speeds[moving_speed_idx], pos.z);
            break;
        // pos z
        case 2:
            var pos = object.position;
            object.position = new mp.Vector3(pos.x, pos.y, pos.z + moving_speeds[moving_speed_idx]);
            break;
        // rot x
        case 3:
            var rot = object.getRotation(2);
            var pitch = object.getPitch();

			object.rotation = new mp.Vector3(pitch + moving_speeds[moving_speed_idx], rot.y, rot.z);
            //object.setRotation(pitch + moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
            break;
        // rot y
        case 4:
            var rot = object.getRotation(2);
            var pitch = object.getPitch();

			object.rotation = new mp.Vector3(pitch, rot.y + moving_speeds[moving_speed_idx], rot.z);
            //object.setRotation(pitch, rot.y + moving_speeds[moving_speed_idx], rot.z, 2, true);
            break;
        // rot z
        case 5:
            var rot = object.getRotation(2);
            var pitch = object.getPitch();

			object.rotation = new mp.Vector3(pitch, rot.y, rot.z + moving_speeds[moving_speed_idx]);
            //object.setRotation(pitch, rot.y, rot.z + moving_speeds[moving_speed_idx], 2, true);
            break;
    }
    //mp.gui.chat.push("New rot Fixes: " + new mp.Vector3(object.getRotation(2).x.toFixed(2), object.getRotation(2).y.toFixed(2), object.getRotation(2).z.toFixed(2)));
    updateObject();
});

mp.keys.bind(0x28, false, function () { // DOWN Arrow
    if (chatActive || !editing) return;
    switch (editing_type_idx) {
        // pos x
        case 0:
            var pos = object.position;
            object.position = new mp.Vector3(pos.x - moving_speeds[moving_speed_idx], pos.y, pos.z);
            break;
        // pos y
        case 1:
            var pos = object.position;
            object.position = new mp.Vector3(pos.x, pos.y - moving_speeds[moving_speed_idx], pos.z);
            break;
        // pos z
        case 2:
            var pos = object.position;
            object.position = new mp.Vector3(pos.x, pos.y, pos.z - moving_speeds[moving_speed_idx]);
            break;
        // rot x
        case 3:
            var rot = object.getRotation(2);
            var pitch = object.getPitch();
            object.setRotation(pitch - moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
            break;
        // rot y
        case 4:
            var rot = object.getRotation(2);
            var pitch = object.getPitch();
            object.setRotation(pitch, rot.y - moving_speeds[moving_speed_idx], rot.z, 2, true);
            break;
        // rot z
        case 5:
            var rot = object.getRotation(2);
            var pitch = object.getPitch();
            object.setRotation(pitch, rot.y, rot.z - moving_speeds[moving_speed_idx], 2, true);
            break;
    }
    updateObject();
});

mp.keys.bind(0x25, false, function () { // LEFT Arrow
    if (chatActive || !editing) return;
    editing_type_idx--;
    if (editing_type_idx < 0) editing_type_idx = editing_types.length - 1;
});

mp.keys.bind(0x27, false, function () { // RIGHT Arrow
    if (chatActive || !editing) return;
    editing_type_idx++;
    if (editing_type_idx >= editing_types.length) editing_type_idx = 0;
});

mp.keys.bind(0x59, false, function () { // Y key
    if (chatActive || !editing) return;
    var rot = object.getRotation(2);
    var pitch = object.getPitch();
    var position = new mp.Vector3(object.position.x.toFixed(3), object.position.y.toFixed(3), object.position.z.toFixed(3));
    var rotation = new mp.Vector3(rot.x.toFixed(2), rot.y.toFixed(2), rot.z.toFixed(2));
    mp.events.callRemote('acceptEdit', position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
    object.destroy();
    object = null;
    editing = false;
});

mp.keys.bind(0x4E, false, function () { // N key
    if (chatActive || !editing) return;
    object.destroy();
    object = null;
    editing = false;
    mp.events.callRemote('cancelEdit');
});

mp.keys.bind(0x6B, false, function () { // Add key
    if (chatActive || !editing) return;
    moving_speed_idx++;
    if (moving_speed_idx >= moving_speeds.length) moving_speed_idx = 0;
});

mp.keys.bind(0x6D, false, function () { // Subtract key
    if (chatActive || !editing) return;
    moving_speed_idx--;
    if (moving_speed_idx < 0) moving_speed_idx = moving_speeds.length - 1;
});

mp.events.add('render', () => {
    if (object === null) return;

    AddInstructionalStart();
    AddInstructionalButton("Следующий режим", 197);
    AddInstructionalButton("Предыдущий режим", 196);
    AddInstructionalButton("Управление объектом", 194);
    AddInstructionalButton("Управление объектом", 195);
    AddInstructionalButtonCustom("Увеличить скорость", "t_+");
    AddInstructionalButtonCustom("Уменьшить скорость", "t_-");
    AddInstructionalButtonCustom("Установить", "t_Y");
    AddInstructionalButtonCustom("Отмена", "t_N");
    AddInstructionalEnd(1);

    mp.game.graphics.drawText(`Режим редактирования: ${editing_types[editing_type_idx]}\nСкорость: ${moving_speeds[moving_speed_idx]}`, [0.5, 0.9], {
        font: 0,
        color: [255, 255, 255, 255],
        scale: [0.5, 0.5],
        outline: false
    });
});
}￿