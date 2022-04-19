{
﻿global.circleEntity = null;
global.circleOpen = false;
var circleTitle = "";

function OpenCircle(title, data) {
    if (menuCheck() || circleOpen) return;
	if (global.localplayer.getVariable("attachToVehicleTrunk")) return;
    board.execute(`circle.show("${title}",${data})`);
    circleTitle = title;
    circleOpen = true;
    menuOpen();
}
function CloseCircle(hide) {
    if(hide) board.execute("circle.hide()");
    circleOpen = false;
    menuClose();
}

function OpenFracData(title){
if (menuCheck() || circleOpen) return;
    board.execute(`circle.show("${title}",${pFraction})`);
    circleTitle = title;
    circleOpen = true;
    menuOpen();
}

// // //
mp.events.add('circleCallback', (index) => {
    if (index == -1) {
        CloseCircle(false);
    } else {
        CloseCircle(false);
        switch (circleTitle) {
            case "Машина":
                switch (index) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
		                    case 4:
		                    case 5:
                            case 6:    
                            case 7:
                                if (entity != null) 
                                    mp.events.callRemote('vehicleSelected', entity, index);
                            return;
        }
    return;
            case "Игрок":
                if (entity == null) return;
                switch (index) {
                    case 0:
                        mp.events.callRemote('pSelected', entity, "Передать деньги");
                        return;
                    case 1:
                        mp.events.callRemote('pSelected', entity, "Предложить обмен");
                        return;
                    case 2:
                        if (pFraction === 0 || pFraction === 15) return;
                        OpenCircle("Фракция", pFraction);
                        return;
                    case 3:
                        mp.events.callRemote('passport', entity);
                        return;
                    case 4:
                        mp.events.callRemote('licenses', entity);
                        return;
					case 5:
                        mp.events.callRemote('pSelected', entity, "Показать пластик");
                        return;		
                    case 6:
                        mp.events.callRemote('pSelected', entity, "Вылечить");
                        return;
                    case 7:
                        OpenCircle("Дом", 0);
                        return;
					case 8:
                        OpenCircle("Квартира", 0);
                        return;
                    case 9:
                        mp.events.callRemote('pSelected', entity, "Пожать руку");
                        return;
					case 11:
                        mp.events.callRemote('pSelected', entity, "Поцеловать");
                        return;
					
					
                }
                return;
            case "Дом":
                switch (index) {
                    case 0:
                        mp.events.callRemote('pSelected', entity, "Продать машину");
                        return;
                    case 1:
                        mp.events.callRemote('pSelected', entity, "Продать дом");
                        return;
                    case 2:
                        mp.events.callRemote('pSelected', entity, "Заселить в дом");
                        return;
                    case 3:
                        mp.events.callRemote('pSelected', entity, "Пригласить в дом");
                        return;
                }
                return;
			case "Квартира":
                switch (index) {
                    case 0:
                        mp.events.callRemote('pSelected', entity, "Продать машину");
                        return;
                    case 1:
                        mp.events.callRemote('pSelected', entity, "Продать квартиру");
                        return;
                    case 2:
                        mp.events.callRemote('pSelected', entity, "Заселить в квартиру");
                        return;
                    case 3:
                        mp.events.callRemote('pSelected', entity, "Пригласить в квартиру");
                        return;
                }
                return;
            case "Фракция":
                if (entity == null) return;
                circleEntity = entity;
                if (fractionActions[pFraction] == undefined) return;
                mp.events.callRemote('pSelected', entity, fractionActions[pFraction][index]);
                return;
			case "Семья":
                if (entity == null) return;
                circleEntity = entity;
                mp.events.callRemote('pSelected', entity, fractionActions[1][index]);
                return;
        }
    }
});
var aCategory = -1;

var pFraction = 0;
var fractionActions = [];
fractionActions[1] = ["Вести за собой", "Мешок", "Ограбить"];
fractionActions[2] = ["Вести за собой", "Мешок", "Ограбить"];
fractionActions[3] = ["Вести за собой", "Мешок", "Ограбить"];
fractionActions[4] = ["Вести за собой", "Мешок", "Ограбить"];
fractionActions[5] = ["Вести за собой", "Мешок", "Ограбить"];
fractionActions[6] = ["Вести за собой", "Показать удостоверение", "Сорвать маску", "Обыскать"];
fractionActions[7] = ["Вести за собой", "Обыскать", "Изъять оружие", "Изъять нелегал", "Сорвать маску", "Выписать штраф", "Показать удостоверение", "Выдать пластик", "Посадить в КПЗ"];
fractionActions[8] = ["Продать аптечку", "Предложить лечение", "Показать удостоверение"];
fractionActions[9] = ["Вести за собой", "Обыскать", "Изъять оружие", "Изъять нелегал", "Сорвать маску", "Показать удостоверение", "Посадить в КПЗ"];
fractionActions[10] = ["Вести за собой", "Мешок", "Ограбить"];
fractionActions[11] = ["Вести за собой", "Мешок", "Ограбить"];
fractionActions[12] = ["Вести за собой", "Мешок", "Ограбить"];
fractionActions[13] = ["Вести за собой", "Мешок", "Ограбить","Выдать сертификат"];
fractionActions[14] = ["Вести за собой", "Мешок", "Сорвать маску", "Показать удостоверение", "Обыскать"];
fractionActions[15] = ["Вести за собой", "Показать удостоверение"];
fractionActions[16] = ["Вести за собой"];
fractionActions[17] = ["Вести за собой", "Мешок", "Обыскать", "Изъять нелегал", "Сорвать маску", "Показать удостоверение", "Изъять оружие"];
fractionActions[18] = ["Вести за собой", "Мешок", "Обыскать", "Изъять нелегал", "Сорвать маску", "Показать удостоверение", "Изъять оружие"];
mp.events.add('fractionChange', (fraction) => {
    pFraction = fraction;
});
}Ɂ