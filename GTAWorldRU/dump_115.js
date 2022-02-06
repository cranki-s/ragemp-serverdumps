{
﻿var DEBUG = false;
if(DEBUG){
	var mp = {};
	mp.events = {};
	mp.events.add = function(n) { 
		console.log(n); 
	}
}

mp.keys.bind( 0x73, true, (player) => { // F4
	if (mp.browsers.exists(moddingCEF))
    {
        moddingCEF.execute(`ToggleLeftMenu()`);
    }
});

let vehClass = 0;
if(DEBUG){
    jQuery( document ).ready( function()
    {
        InitializeMods();
        InitializePrices(prices);
        var data = JSON.stringify(modificationsJSON);
        var data2 = JSON.stringify(paintJSON);
        var data3 = JSON.stringify(extrasJSON);
        var Vehclass = 10;
        Initialize(data, data2, data3, Vehclass, false, 1000);
    });
}else{
    //CEF//
    var moddingCEF = null;
    var adminModding = false;
    mp.events.add('CARMODDING::SHOW', (price, installed, bool, money) => {
        if (!mp.browsers.exists(moddingCEF))
        {
            moddingCEF = mp.browsers.new("package://gtalife/Mechanic/index.html");
            adminModding = bool;
            InitializeMods(installed);
            InitializePrices(price);
            var data = JSON.stringify(modificationsJSON);
            var data2 = JSON.stringify(paintJSON);
            var data3 = JSON.stringify(extrasJSON);
            vehClass = mp.players.local.vehicle.getClass();
            moddingCEF.execute(`Initialize('${data}', '${data2}', '${data3}', ${vehClass}, ${bool},${money});`);
            mp.gui.cursor.show(true, true);
            mp.events.call('toggleHUDForPlayer', false);
        }
    });

    mp.events.add('CARMODDING::CLOSE', (purchase = false) => {
        if (mp.browsers.exists(moddingCEF))
        {
            moddingCEF.destroy();
            mp.gui.cursor.show(false, false);
            mp.events.call('toggleHUDForPlayer', true);
            mp.events.callRemote('modMenuClosed', purchase);
        }
    });

    mp.events.add('changeVehicleMod', (id, int) => {
        mp.events.callRemote('ChangeVehicleMod', id, int);
    });

    mp.events.add('changeVehicleColor', (colorslot, id) => {
        mp.events.callRemote('ChangeVehicleColor', colorslot, id);
    });

    mp.events.add('changeVehicleColorRGB', (type, color) => {
        mp.events.callRemote('ChangeVehicleColorRGB', type, color);
    });

    mp.events.add('changeVehicleWheelColor', (color) => {
        mp.events.callRemote('ChangeVehicleWheelColor', color);
    });

    mp.events.add('changeVehicleNeonColor', (neonRed, neonGreen, neonBlue) => {
        mp.events.callRemote('ChangeVehicleNeonColor', neonRed, neonGreen, neonBlue);
    });
    
    mp.events.add('changeVehicleLivery', (livery) => {
        mp.events.callRemote('ChangeVehicleLivery', livery);
    });
    
    mp.events.add('changeVehicleExtra', (extra, checked) => {
        mp.events.callRemote('ChangeVehicleExtra', extra, checked);
    });

    mp.events.add('resetCarColors', () => {
        mp.events.callRemote('restoreCustomColors');
    });

    mp.events.add('RGBPicker::change', (type, hex) => {
        let player = mp.players.local;
        if(player.vehicle != null){
            if(type == 0)
                player.vehicle.setCustomPrimaryColour(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
            else
                player.vehicle.setCustomSecondaryColour(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
        }
    });

    mp.events.add('CARMODDING::getWheelColor', () => {
        mp.events.callRemote('CARMODDING::GetWheelColor');
    });

    mp.events.add('CARMODDING::SetWheelColor', (color, type) => {
        OrgWheelColor = color;
        mp.events.call("CARMODDING::GetWheelsTypeClient", type);
    });

    mp.events.add('CARMODDING::GetWheelsClient', (index) => {
        if (mp.browsers.exists(moddingCEF))
        {
            let localPlayer = mp.players.local;
            if(localPlayer.vehicle == null){
                return;
            }
            if(vehClass == 8)
                index = 6;

            localPlayer.vehicle.setWheelType(index);
            
            let vehicleModLimit = localPlayer.vehicle.getNumMods(23);
            let currentMod = localPlayer.vehicle.getMod(23);
            if(currentMod < 0) currentMod = 0;
            moddingCEF.execute(`InitializeWheelsMenu(${index},${vehicleModLimit}, ${currentMod}, ${OrgWheelColor});`);
            mp.events.callRemote('ChangeVehicleWheelType', index);
        }
    });

    mp.events.add('CARMODDING::GetWheelsTypeClient', (index) => {
        if (mp.browsers.exists(moddingCEF))
        {
            let localPlayer = mp.players.local;
            if(localPlayer.vehicle == null){
                return;
            }

            if(vehClass == 8)
                index = 6;

            localPlayer.vehicle.setWheelType(index);
            let vehicleModLimit = localPlayer.vehicle.getNumMods(23);
            let currentMod = localPlayer.vehicle.getMod(23);
            if(currentMod < 0) currentMod = 0;
            moddingCEF.execute(`InitializeWheelsMenuType(${index},${vehicleModLimit}, ${currentMod}, ${OrgWheelColor});`);
            mp.events.callRemote('ChangeVehicleWheelType', index);
        }
    });

    mp.events.add('CARMODDING::ChangeMoney', (money) => {
        if (mp.browsers.exists(moddingCEF))
        {
            moddingCEF.execute(`ChangeMoney(${money});`);
        }
    });

    mp.events.add('CARMODDING::purchaseCustomisation', (json, paint, extras) => {
        if (mp.browsers.exists(moddingCEF))
        {
            mp.events.callRemote('CARMODDING::PurchaseCustomisation', json, paint, extras);
        }
    });

    mp.events.add('CARMODDING::purchaseModifications', (json) => {
        if (mp.browsers.exists(moddingCEF))
        {
            mp.events.callRemote('CARMODDING::PurchaseModifications', json);
        }
    });

    mp.events.add('CARMODDING::purchasePaint', (type) => {
        if (mp.browsers.exists(moddingCEF))
        {
            mp.events.callRemote('CARMODDING::PurchasePaint', type);
        }
    });

    mp.events.add('CARMODDING::purchaseExtras', (bool) => {
        if (mp.browsers.exists(moddingCEF))
        {
            mp.events.callRemote('CARMODDING::PurchaseExtras', bool);
        }
    });

    mp.events.add('CARMODDING::purchaseConfirmed', (item) => {
        mp.game.graphics.notify("~b~"+item+" ~g~установлено");
    });

    mp.events.add('CARMODDING::purchaseError', (item) => {
        mp.game.graphics.notify("~b~"+item+" ~r~не установлено");
    });
}

let OrgWheelColor = -1;
let mapModToIndex = {
    "Спойлеры": 0,
    "Передний бампер": 1,
    "Задний бампер": 2,
    "Боковая юбка": 3,
    "Выхлопная труба": 4,
    "Рама": 5,
    "Решетка радиатора": 6,
    "Капот": 7,
    "Крыло": 8,
    "Правое крыло": 9,
    "Крыша": 10,
    "Двигатель": 11, 
    "Тормоза": 12, 
    "Коробка передач": 13, 
    "Гудки": 14, 
    "Подвеска": 15, 
    "Броня": 16,
    "Турбо": 18, 
    "Ксенон": 22, 
    "Колеса": 23, //Font wheels for bikes
    "Задние колеса": 24, //Bugged
    "Рамка номеров": 25,
    "Именная табличка": 26,
    "Дизайн салона": 27,
    "Украшения": 28,
    "Приборная панель": 29,
    "Дизайн приборной панели": 30,
    "Динамик на двери": 31,
    "Сиденья": 32,
    "Руль": 33,
    "Рычаг переключения передач": 34,
    "Номера": 35,
    "Колонки": 36,
    "Багажник": 37,
    "Гидравлика": 38,
    "Блок цилиндров": 39,
    //"Воздушний фильтр": 40,
    "Распорки": 41,
    "Крыло на колесо": 42,
    "Антенны": 43,
    "Отделка": 44,
    "Бензобак": 45,
    "Ливерия": 48,
    "Ливерия2": 49,//FakeType for bugged livery functions
    "Номер": 62,
    //"Тонировка": 69,
    "Тонировка": 55,
    "Цвет транспорта": 999, //
    "Цвет транспорта (ex)": 9999, //
    "Цвет колес": 9998, //
    "Установка Неона": 1000,
    "Неон": 1001, // Not really listed as mod index in GTA.
    "Экстра": 1002 // Not really listed as mod index in GTA.
};

var ExcludedMods = [14,16,24,25,38,9999,9998,1000];
let modificationsJSON = [];
let paintJSON = [];
let extrasJSON = [];
let installedJSON = [];
let prices = null;
if(DEBUG){
    prices = '[{"modSlot":0,"veh_classID":3,"price":2300},{"modSlot":1,"veh_classID":3,"price":1900},{"modSlot":2,"veh_classID":3,"price":1900},{"modSlot":3,"veh_classID":3,"price":1500},{"modSlot":4,"veh_classID":3,"price":1800},{"modSlot":5,"veh_classID":3,"price":2300},{"modSlot":6,"veh_classID":3,"price":1750},{"modSlot":7,"veh_classID":3,"price":2300},{"modSlot":8,"veh_classID":3,"price":1800},{"modSlot":9,"veh_classID":3,"price":1800},{"modSlot":10,"veh_classID":3,"price":2200},{"modSlot":11,"veh_classID":3,"price":5000},{"modSlot":12,"veh_classID":3,"price":5000},{"modSlot":13,"veh_classID":3,"price":5000},{"modSlot":15,"veh_classID":3,"price":5000},{"modSlot":18,"veh_classID":3,"price":10500},{"modSlot":22,"veh_classID":3,"price":400},{"modSlot":23,"veh_classID":3,"price":900},{"modSlot":25,"veh_classID":3,"price":100},{"modSlot":27,"veh_classID":3,"price":700},{"modSlot":28,"veh_classID":3,"price":100},{"modSlot":30,"veh_classID":3,"price":400},{"modSlot":33,"veh_classID":3,"price":500},{"modSlot":34,"veh_classID":3,"price":400},{"modSlot":35,"veh_classID":3,"price":4000},{"modSlot":38,"veh_classID":3,"price":5000},{"modSlot":48,"veh_classID":3,"price":3500},{"modSlot":62,"veh_classID":3,"price":5000},{"modSlot":69,"veh_classID":3,"price":200},{"modSlot":999,"veh_classID":3,"price":1250},{"modSlot":1001,"veh_classID":3,"price":7000},{"modSlot":1002,"veh_classID":3,"price":500}]';
}


function InitializeMods(installed){
    modificationsJSON = [];
    paintJSON = [];
    extrasJSON = [];
    installedJSON = [];
    if(!DEBUG){
        installedJSON = JSON.parse(installed);
    }
    for (const mod in mapModToIndex) {
        var amount = 0;
        var currentMod = 0;
        var modid = mapModToIndex[mod];
        if(DEBUG) amount = 1;
        else amount = mp.players.local.vehicle.getNumMods(modid);

        if(modid == 18) amount = 1;
        else if(modid == 22) amount = 1;
        else if(modid == 49){
            if(!DEBUG){
                amount = mp.players.local.vehicle.getLiveryCount();
                if(mp.players.local.vehicle.getModel() == 2037834373 && !adminModding){
                    amount -= 3;
                }
                if(mp.players.local.vehicle.getModel() == 1453670138 && !adminModding){
                    amount = 0;
                }
            }
        }
        else if(modid == 69) amount = 5;
        else if(modid == 62) {
            if(adminModding) 
                amount = 5;
            else 
                amount = 4;
        }
        if(DEBUG){
            currentMod = 1;
        }else{
            index = installedJSON.findIndex((installed => installed.ModSlotId == modid));
            if(index != -1){
                currentMod = installedJSON[index].ModIndex;
                if(modid == 62 || modid == 55 || modid == 69) currentMod--;
            }else{
                currentMod = mp.players.local.vehicle.getMod(parseInt(modid));
                if(modid == 49) currentMod =  mp.players.local.vehicle.getLivery();
            }
        }
        if(currentMod < 0) currentMod = -1;
        //if(currentMod > amount) currentMod = -1;
        
        if(amount > 0 || modid == 999 || modid == 1001 || modid == 48 || modid == 1002){
            if(!ExcludedMods.includes(modid))
                addModificationData(mod, modid, 0, amount, getModCategory(modid), currentMod+1);
        }
    }
        
    modificationsJSON.sort(abcSorting("modification"));

    let primaryColor = 10;
    let secondaryColor = 50;
    let hex_primary = "#FF0000";
    let hex_secondary = "#229a5d";
    if(!DEBUG){
        let colors = mp.players.local.vehicle.getColours(0, 1);
        primaryColor = colors.colorPrimary;
        secondaryColor =  colors.colorSecondary;
        let rgb_primary = mp.players.local.vehicle.getCustomPrimaryColour(0, 0, 0);
        hex_primary = rgbToHex(rgb_primary.r, rgb_primary.g, rgb_primary.b);
        let rgb_secondary = mp.players.local.vehicle.getCustomSecondaryColour(0, 0, 0);
        hex_secondary = rgbToHex(rgb_secondary.r, rgb_secondary.g, rgb_secondary.b);
    }
    
    addPaintData(primaryColor, secondaryColor, hex_primary, hex_secondary);
    InitializeExtras();
}

function getModCategory(mod){
    var string = ""
    switch(mod){
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 22: case 25: case 27: case 35: case 62: case 69: case 55: case 26: case 27:
        case 26: case 37: case 42: case 43: case 44:
        {
            string = "exterior";
            break;
        }
        case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 36:
        {
            string = "interior";
            break;
        }
        case 11: case 12: case 13: case 15: case 18:
        {
            string = "performance";
            break;
        }
        case 999:
        {
            string = "color";
            break;
        }
        case 23:
        {
            string = "wheels";
            break;
        }
        case 1001:
        {
            string = "neon";
            break;
        }
        case 48:
        {
            string = "livery";
            break;
        }
        case 49:
        {
            string = "liveryEx";
            break;
        }
        case 1002:
        {
            string = "extras";
            break;
        }
        default: {
            string = "other"; 
            break;
        }
    }
    return string;
}

function addModificationData(name, id, price, amount, cat, installed){
    var newMod = {"modification":""+name+"", "modification_id":id,"price": price, "amount": amount, "category":""+cat+"", "current_installed": installed};
    modificationsJSON.push(newMod);
}

function addPaintData(color1, color2, color1rgb, color2rgb){
    var paint = {"color1":color1, "color2":color2, "color1rgb": color1rgb, "color2rgb": color2rgb};
    paintJSON.push(paint);
}

function addExtraData(id, active){
    var extra = {"id":id, "active":active};
    extrasJSON.push(extra);
}

function InitializeExtras(){
    if(mp.players.local.vehicle.getModel() == 4285564673) return; //Block extra's for Yosemite Flatbed

    for (i = 1; i <= 12; i++) {
        if(DEBUG){
            addExtraData(i, true);
        }else{
            if(mp.players.local.vehicle.doesExtraExist(i)){
                if(mp.players.local.vehicle.isExtraTurnedOn(i)){
                    addExtraData(i, true);
                }else{
                    addExtraData(i, false);
                }
            }
        }
    }
}


function InitializePrices(serveArg) {
    let partIndex;
    let jsonPartPrice = JSON.parse(serveArg);
    for (let i = 0; i < jsonPartPrice.length; i++) {
        partIndex = jsonPartPrice[i].modSlot;
        modIndex = modificationsJSON.findIndex((mod => mod.modification_id == partIndex));
        if(modIndex != -1)
            modificationsJSON[modIndex].price = jsonPartPrice[i].price;
    }
}

function abcSorting(firstKey) {
    return function(a, b) {  
        if (a[firstKey] > b[firstKey]) {  
            return 1;  
        } else if (a[firstKey] < b[firstKey]) {  
            return -1;  
        }  
    }  
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

}