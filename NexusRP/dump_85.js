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
    NewEvent.callRemote('grafcoord',GrafName,objModel, objPos.x.toFixed(3), objPos.y.toFixed(3), objPos.z.toFixed(3), objRot.x.toFixed(3), objRot.y.toFixed(3), objRot.z.toFixed(3));

    mp.events.call('endEditing', true);
});
mp.keys.bind(0x4E, false, function () { // N key
    if (chatActive || !editing) return;

    mp.events.call('endEditing', true);
    NewEvent.callRemote('cancelEdit');
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
}32000,"id":32,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска бизона","Variation":22,"color":[0,1],"price":32000,"id":33,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска быка","Variation":23,"color":[0,1],"price":32000,"id":34,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска орла","Variation":24,"color":[0,1],"price":23000,"id":35,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска падальщика","Variation":25,"color":[0,1],"price":9100,"id":36,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска волка","Variation":26,"color":[0,1],"price":32000,"id":37,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Хоккейная Please Stop","Variation":30,"color":[0],"price":9300,"id":38,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Балаклава потертая","Variation":37,"color":[0],"price":9500,"id":39,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Impotent Rage","Variation":43,"color":[0],"price":10600,"id":40,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Обмотка из скотча","Variation":48,"color":[0,1,2,3],"price":8800,"id":41,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска-футболка","Variation":54,"color":[0,1,2,3,4,5,6,7,8,9,10],"price":11500,"id":42,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Сшитая балаклава","Variation":57,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"price":12500,"id":43,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Сшитая балаклава №2","Variation":58,"color":[0,1,2,3,4,5,6,7,8,9],"price":12500,"id":44,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска йети","Variation":79,"color":[0,1,2],"price":15700,"id":45,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Йети с бейсболкой","Variation":80,"color":[0,1,2],"price":17200,"id":46,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Йети с кепкой","Variation":81,"color":[0,1,2],"price":17200,"id":47,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Йети с повязкой","Variation":82,"color":[0,1,2],"price":17200,"id":48,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Намордник с заклёпкой","Variation":90,"color":[0,1,2,3,4,5,6,7],"price":20100,"id":49,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска динозавра","Variation":93,"color":[0,1,2,3,4,5],"price":22500,"id":50,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска Они","Variation":94,"color":[0,1,2,3,4,5],"price":36000,"id":51,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска клоуна","Variation":95,"color":[0,1,2,3,4,5,6,7],"price":19000,"id":52,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска гориллы","Variation":96,"color":[0,1,2,3],"price":18500,"id":53,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска лошади","Variation":97,"color":[0,1,2,3,4,5],"price":23100,"id":54,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска единорога","Variation":98,"color":[0],"price":23100,"id":55,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Череп с узором","Variation":99,"color":[0,1,2,3,4,5],"price":17900,"id":56,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска мопса","Variation":100,"color":[0,1,2,3,4,5],"price":24400,"id":58,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска черепа тактическая","Variation":106,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":45500,"id":59,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Полумаска","Variation":112,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":27900,"id":60,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Шарф-труба","Variation":116,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":33700,"id":61,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Балаклава разноцветная","Variation":117,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],"price":12500,"id":62,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Балаклава потертая №2","Variation":119,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"price":14500,"id":63,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска клубника","Variation":149,"color":[0],"price":47000,"id":64,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска лимона","Variation":150,"color":[0],"price":47000,"id":65,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Ухмылка","Variation":164,"color":[0],"price":8500,"id":66,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска кролика","Variation":165,"color":[0],"price":13700,"id":67,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Снайпер","Variation":167,"color":[0],"price":7900,"id":68,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Гетра","Variation":169,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":14700,"id":69,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Разноцветная полумаска","Variation":178,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"price":54200,"id":70,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска черепахи","Variation":181,"color":[0,1,2,3],"price":25100,"id":71,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска мышки","Variation":182,"color":[0,1,2,3],"price":25300,"id":72,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска с сотами","Variation":183,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"price":23200,"id":73,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска гиены","Variation":184,"color":[0,1,2,3],"price":25500,"id":74,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска Trickster","Variation":186,"color":[0,1,2,3,4,5,6,7,8],"price":19800,"id":75,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Гетра с узором","Variation":187,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":14700,"id":76,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска чайки","Variation":197,"color":[0,1,2,3],"price":21700,"id":77,"modifications":[{"id":0,"name":"0"}]},



{"name":"Маска свиньи","Variation":1,"color":[0,1,2,3],"price":14300,"id":0,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска черепа","Variation":2,"color":[0,1,2,3],"price":14300,"id":1,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска обезьяны","Variation":3,"color":[0],"price":14800,"id":2,"modifications":[{"id":0,"name":"0"}]},
{"name":"Хоккейная","Variation":4,"color":[0,1,2,3],"price":8800,"id":3,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска доброй обезьяны","Variation":5,"color":[0,1,2,3],"price":14300,"id":4,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маскарадная маска","Variation":6,"color":[0,1,2,3],"price":7700,"id":5,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска гоблина","Variation":7,"color":[0,1,2,3],"price":14500,"id":6,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска кота","Variation":17,"color":[0,1],"price":14850,"id":7,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"}]},
{"name":"Маска лисы","Variation":18,"color":[0,1],"price":14300,"id":8,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"}]},
{"name":"Маска совы","Variation":19,"color":[0,1],"price":15400,"id":9,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"}]},
{"name":"Маска енота","Variation":20,"color":[0,1],"price":15400,"id":10,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"}]},
{"name":"Маска Аниме","Variation":44,"color":[0],"price":9900,"id":11,"modifications":[{"id":0,"name":"0"}]},
{"name":"Маска со шляпой","Variation":45,"color":[0],"price":8800,"id":12,"modifications":[{"id":0,"name":"0"}]},
{"name":"Завернутый в ленту","Variation":47,"color":[0,1,2,3],"price":6600,"id":13,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Пакет","Variation":49,"color":[0,1,2,3,4,5,6,7,8,9],"price":5500,"id":14,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Бандана обычная","Variation":51,"color":[0,1,2,3,4,5,6,7,8,9],"price":4950,"id":15,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Балаклава","Variation":52,"color":[0,1,2,3,4,5,6,7,8,9],"price":36630,"id":16,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Маска с капюшоном","Variation":53,"color":[0,1,2,3,4,5,6,7,8],"price":7150,"id":17,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"}]},
{"name":"Маска злой печеньки","Variation":74,"color":[0,1,2],"price":10450,"id":18,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"}]},
{"name":"Намордник","Variation":101,"color":[0,1,2,3,4,5,6,7,8,9],"price":16500,"id":19,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Бандана с узорами","Variation":111,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":7700,"id":20,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"},{"id":10,"name":"10"},{"id":11,"name":"11"},{"id":12,"name":"12"},{"id":13,"name":"13"},{"id":14,"name":"14"},{"id":15,"name":"15"},{"id":16,"name":"16"},{"id":17,"name":"17"},{"id":18,"name":"18"},{"id":19,"name":"19"},{"id":20,"name":"20"},{"id":21,"name":"21"},{"id":22,"name":"22"},{"id":23,"name":"23"},{"id":24,"name":"24"},{"id":25,"name":"25"}]},
{"name":"Маска с узорами","Variation":113,"color":[0,1,2,3,4,5,6,7,8,9],"price":7700,"id":21,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Тканевая с узорами","Variation":118,"color":[0,1,2,3,4,5,6,7,8,9],"price":9900,"id":22,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Маска модника","Variation":133,"color":[0,1,2,3,4,5,6,7,8,9],"price":33000,"id":23,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Маска виноград","Variation":151,"color":[0],"price":45500,"id":24,"modifications":[{"id":0,"name":"0"}]},
{"name":"Маска ананас","Variation":152,"color":[0],"price":45500,"id":25,"modifications":[{"id":0,"name":"0"}]},
{"name":"Маска вишенька","Variation":153,"color":[0],"price":45500,"id":26,"modifications":[{"id":0,"name":"0"}]},
{"name":"Маска эмодзи","Variation":179,"color":[0,1,2,3,4,5,6,7],"price":22000,"id":27,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"}]},
{"name":"Маска король обезьян","Variation":147,"color":[0],"price":300000,"id":28,"modifications":[{"id":0,"name":"0"}]}

]`);
    



}