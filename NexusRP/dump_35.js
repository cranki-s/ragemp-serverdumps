{
﻿global.menuOpened = true;
global.menu = mp.browsers.new('http://package/systems/OLD_GLOBAL/FRONT/menu.html');
global.menu.name = 'nexusbrowser';
global.menuCheck = function () {
    if (global.menuOpened) {
        //mp.gui.chat.push('menuOpen:yes');
        return true;
    }
    //mp.gui.chat.push('menuOpen:no');
    return false;
};
global.menuClose = function () {
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
    mp.events.call('showHUD', hudWasOpened);
}
global.menuOpen = function () {
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
    hudWasOpened = global.showhud;
    mp.events.call('showHUD', false);
}
var hudWasOpened = true;

mp.events.add("playerQuit", (player, exitType, reason) => {
    if (global.menu !== null) {
        if (player.name === localplayer.name) {
            global.menuClose();
            global.menu.destroy();
            global.menu = null;
        }
    }
});

// // // // //
global.dialog = {
    question: "",
    cBack: "",
    menuWasopened: false,
    lastTime: false,
    open: function () {
        ///////////ТУТ ЕБАНОЕ ГОВНО КОТОРОЕ НЕ ИСПОЛЬЗУЕТСЯ!!!!!!!!!!!!!!!!!!
        global.dialog.lastTime = 0;
            mp.gui.execute(`HUD.modalUniversalTrigger('dialog', "${global.dialog.question}")`);
            //global.menu.execute(`dialog.title='${global.dialog.question}'`);
            //global.menu.execute(`dialog.active=1`);
      //  menuWasopened = global.menuOpened;
        mp.gui.cursor.visible = true;
       // if (!global.menuOpened) global.menuOpen();
        //mp.events.call('startScreenEffect', "MenuMGHeistIn", 1, true);
    }
}
mp.events.add('openDialog', (c, q) => {
    global.dialog.cBack = c;
    global.dialog.question = q;
    mp.gui.execute(`HUD.modalUniversalTrigger('dialog', "${global.dialog.question}")`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
})

mp.events.add('dialogCallback', (state) => {
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
    NexusEvent.callRemote('dialogCallback', global.dialog.cBack, state);
})
// // // // //
global.input = {
    head: "",
    desc: "",
    len: "",
    cBack: "",
    set: function (h, d, l, c) {
        this.head = h, this.desc = d;
        this.len = l, this.cBack = c;
        if (global.menuCheck()) return;
       // global.menu.execute(`input.set("${this.head}","${this.desc}","${this.len}");`)
        mp.gui.execute(`HUD.modalUniversalTrigger('input',"${this.head}","${this.desc}")`);
    },
    open: function () {
        if (global.menuCheck()) return;       
        global.menuOpen();
        //mp.events.call('startScreenEffect', "MenuMGHeistIn", 1, true);
    },
    close: function () {
        global.menuClose();
        mp.events.call('stopScreenEffect', "MenuMGHeistIn");
    }
};
mp.events.add('input', (text) => {
    if (input.cBack == "") return;
    if (input.cBack == "setCruise")
        mp.events.call('setCruiseSpeed', text);
    else 
        NexusEvent.callRemote('inputCallback', input.cBack, text);
    input.cBack = "";
    input.close();
});
mp.events.add('openInput', (h, d, l, c) => {
    if (global.menuCheck()) return;
    input.set(h, d, l, c);
    input.open();
})
mp.events.add('closeInput', () => {
    input.close();
})


// MATS //
/*mp.keys.bind(0x78, false, function () { // F9
    mp.events.call('matsOpen', true);
});*/
mp.events.add('matsOpen', (isArmy, isMed) => {
    if (global.menuCheck()) return;
    global.menuOpen();
    global.menu.execute(`mats.show(${isArmy},${isMed})`);
});
mp.events.add('matsL', (act) => { //load
    global.menuClose();
    switch (act) {
        case 1:
            global.input.set("Загрузить маты", "Введите кол-во матов", 4, "loadmats");
            global.input.open();
            break;
        case 2:
            global.input.set("Загрузить маты", "Введите кол-во матов", 4, "loadmats");
            global.input.open();
            break;
        case 3:
            global.input.set("Загрузить наркоту", "Введите кол-во наркоты", 4, "loaddrugs");
            global.input.open();
            break;
        case 4:
            global.input.set("Загрузить аптечки", "Введите кол-во аптечек", 4, "loadmedkits");
            global.input.open();
            break;
    }
});
mp.events.add('matsU', (act) => { //unload
    global.menuClose();
    switch (act) {
        case 1:
            global.input.set("Выгрузить маты", "Введите кол-во матов", 4, "unloadmats");
            global.input.open();
            break;
        case 2:
            global.input.set("Выгрузить маты", "Введите кол-во матов", 4, "unloadmats");
            global.input.open();
            break;
        case 3:
            global.input.set("Выгрузить наркоту", "Введите кол-во наркоты", 4, "unloaddrugs");
            global.input.open();
            break;
        case 4:
            global.input.set("Выгрузить аптечки", "Введите кол-во аптечек", 4, "unloadmedkits");
            global.input.open();
            break;
    }
});
let autoColors = ["Черный", "Белый", "Красный", "Оранжевый", "Желтый", "Зеленый", "Голубой", "Синий", "Фиолетовый"];
let autoModels = null;

let colors = {};
colors["Черный"] = [0, 0, 0];
colors["Белый"] = [225, 225, 225];
colors["Красный"] = [230, 0, 0];
colors["Оранжевый"] = [255, 115, 0];
colors["Желтый"] = [240, 240, 0];
colors["Зеленый"] = [0, 230, 0];
colors["Голубой"] = [0, 205, 255];
colors["Синий"] = [0, 0, 230];
colors["Фиолетовый"] = [190, 60, 165];

let auto = {
    model: null,
    color: null,
    entity: null,
    extra: null,
}
mp.events.add('carRoom', function () {
    cam = mp.cameras.new('default', new mp.Vector3(-1793.66, -1175.016, 13.31283), new mp.Vector3(0, 0, 105), 50);
    cam.pointAtCoord(-1793.66, -1175.016, 13.31283);
    cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});
const cameraRotator = require("/lib/back/js/vie");
function createCam(x, y, z, rx, ry, rz, viewangle) {
    // camera = mp.cameras.new("Cam", {x, y, z}, {x: rx, y: ry, z: rz}, viewangle);
    camera = mp.cameras.new("default");
    camera.setCoord(x, y, z);
    camera.setRot(rx, ry, rz, 2);
    camera.setFov(viewangle);
    camera.setActive(true);

    var vehPosition = new mp.Vector3(-1798.99, -1176.389, 13.01753); // спавн авто
    cameraRotator.start(camera, vehPosition, vehPosition, new mp.Vector3(-3.0, 3.5, 0.5), 180);
    cameraRotator.setZBound(-0.8, 1.8);
    cameraRotator.setZUpMultipler(5);
    cameraRotator.pause(true);

    mp.game.cam.renderScriptCams(true, false, 3000, true, false);
}
mp.events.add('testdriveAuto', () => {
    if (new Date().getTime() - global.lastCheck < 50) return;
    global.lastCheck = new Date().getTime();    
    global.menuClose();
    global.menu.execute('auto.active=0');

    NexusEvent.callRemote('carroomTestDrive', auto.model, colors[auto.color][0], colors[auto.color][1], colors[auto.color][2],colors[auto.extra][0], colors[auto.extra][1], colors[auto.extra][2]);
})
mp.events.add('auto', (act, value) => {	
    switch (act) {
        case "model":
            if(auto.model==autoModels[value]) return;
            auto.model = autoModels[value];
            NexusEvent.callRemote('createlveh', autoModels[value], colors[auto.color][0], colors[auto.color][1], colors[auto.color][2],colors[auto.extra][0], colors[auto.extra][1], colors[auto.extra][2], -1798.99, -1176.389, 13.01753);
            break;
        case "color":
            auto.color = autoColors[value];
            NexusEvent.callRemote('vehchangecolor','prime', colors[auto.color][0], colors[auto.color][1], colors[auto.color][2],);
            break;
        case "extra":
            auto.extra = autoColors[value];
            NexusEvent.callRemote('vehchangecolor','sec', colors[auto.extra][0], colors[auto.extra][1], colors[auto.extra][2]);
            break;
    }
});
mp.events.add('CarRoom:BuyVehicle', (money, type) => {
    if (global.QuestShop) {
        NexusEvent.callRemote('QuestShop:Buy', "car", auto.model, auto.color, auto.extra);
    } else {
        NexusEvent.callRemote('carroomBuy', auto.model, auto.color, auto.extra, money, type);
    }
    mp.events.call('CarRoom:Close')
})



mp.events.add('CarRoom:Close', () => {
    if (new Date().getTime() - global.lastCheck < 50) return;
    global.lastCheck = new Date().getTime();
    global.menuClose();
    global.menu.execute('auto.active=0');
    if (global.QuestShop) {
        global.QuestShop = false;
    }
    NexusEvent.callRemote('carroomCancel');
    updateGameTime = true;
    cameraRotator.stop();
    if (auto.entity == null) return;
    auto.entity.destroy();
    auto.entity = null;    
})
mp.events.add('getvehspeed',()=>{
    let maxs = mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model); //max speed of vehicle     
})
mp.events.add('openAuto', (models, prices,names,salon,money,moneyb,maxcapacity,vehdata,fuelmax,type) => {
    if (global.menuCheck()) return;
    autoModels = JSON.parse(models);
    updateGameTime = false;
    mp.game.time.setClockTime(10, 0, 0);
    setAuto('models', models);
    setAuto('modelsName', names);
    setAuto('colors', JSON.stringify(autoColors));
    setAuto('prices', prices);   
    
    
    //vehhash= JSON.parse(vehhash);
    vehmaxspeed = [];
    tunpotential = [];
    sofspeed = [];
    JSON.parse(vehdata).forEach(element=>{
        vehmaxspeed.push(element.MaxSpeed);
        tunpotential.push(element.Potential);
        sofspeed.push(element.SofSpeed);
    });
   /* vehhash.forEach(veh=>{
        let maxs = mp.game.vehicle.getVehicleModelMaxSpeed(veh);
        vehmaxspeed.push(+(maxs*3.6+50).toFixed(0));
    }) */       
    if (type) {
        global.QuestShop = true;
        global.menu.execute(`auto.wallettype='${type}'`);
    }
    else global.menu.execute(`auto.wallettype='$'`);	
    global.menu.execute(`auto.locale='${global.Language}'`);
	global.menu.execute(`auto.open()`);
	global.menu.execute(`auto.shipClass='${salon}'`);
	global.menu.execute(`auto.money='${money}'`);
	global.menu.execute(`auto.moneyBank='${moneyb}'`);
	global.menu.execute(`auto.capacity=${maxcapacity}`);
	global.menu.execute(`auto.maxspeed=${JSON.stringify(vehmaxspeed)}`);
    global.menu.execute(`auto.tunpotential=${JSON.stringify(tunpotential)}`);
    global.menu.execute(`auto.sofspeed=${JSON.stringify(sofspeed)}`);
	global.menu.execute(`auto.fuel=${fuelmax}`);
    NexusEvent.callRemote('createlveh', autoModels[0], 0, 0, 0, 0, 0, 0, -1798.99, -1176.389, 13.01753);
    auto.color = "Черный";
    auto.extra = "Черный";
    auto.model = autoModels[0];
	createCam(-1793.66, -1175.016, 13.31283, 0, 0, 1.701622, 50); // координаты камеры и ротация
    cameraRotator.pause(false);
    global.menuOpen();
    global.menu.execute(`auto.active=true`);
})
//types: models, colors, prices
function setAuto(type, jsonstr) {
    if(global.menu == null){ global.menu = mp.browsers.new('http://package/systems/OLD_GLOBAL/FRONT/menu.html');
    global.menu.name = 'nexusbrowser';
}
    global.menu.execute(`auto.${type}=${jsonstr}`);
}
// CAM //
global.camMenu = false;


}