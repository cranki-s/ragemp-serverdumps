{
﻿global.circleEntity = null;
global.circleOpen = false;
var circleTitle = "";

function OpenCircle(title, data) {
    if (menuCheck() || circleOpen) return;
    board.execute(`circle.show("${title}",${data})`);
    circleTitle = title;
    circleOpen = true;
    menuOpen2();
}
function CloseCircle(hide) {
    if(hide) board.execute("circle.hide()");
    circleOpen = false;
    menuClose2();
}

// // //
mp.events.add('circleCallback', (index) => {
    if (index == -1) {
        CloseCircle(false);
		mp.game.graphics.transitionFromBlurred(100);
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
                        mp.game.graphics.transitionFromBlurred(100);
						let localPlayer = mp.players.local;
                        if (entity == null) return;
                        if(entity.getVariable("ACCESS") == "DUMMY") return;
                        if (index == 1 || index == 3) {
                            const boneID = entity.getBoneIndexByName("boot"); 
                            var trunkpos = entity.getWorldPositionOfBone(boneID);
                            if(boneID <= 0) trunkpos = localPlayer.position;
                            mp.events.callRemote('vehicleSelected', entity, index, trunkpos.x, trunkpos.y, trunkpos.z);
                            return;
                        }
						else if (index == 5) {
                            bonnetpos = localPlayer.position;
                            mp.events.callRemote('vehicleSelected', entity, index, bonnetpos.x, bonnetpos.y, bonnetpos.z);
                        }
                        else if (index == 0) {
                            const boneID = entity.getBoneIndexByName("bonnet");
                            var bonnetpos = entity.getWorldPositionOfBone(boneID);
                            if(boneID <= 0) bonnetpos = localPlayer.position;
                            mp.events.callRemote('vehicleSelected', entity, index, bonnetpos.x, bonnetpos.y, bonnetpos.z);
                            return;
                        }
                        else {
                            const boneID = entity.getBoneIndexByName("bodyshell");
                            var bodyshell = entity.getWorldPositionOfBone(boneID);
                            if(boneID <= 0) bodyshell = localPlayer.position;
                            mp.events.callRemote('vehicleSelected', entity, index, bodyshell.x, bodyshell.y, bodyshell.z);
                            return;
                        }
                }
                return;
            case "Игрок":
                if (entity == null) return;
                switch (index) {
                    case 0:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Передать деньги");
                        return;
                    case 1:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Предложить обмен");
                        return;
                    case 2:
                        if (pFraction === 0 || pFraction === 15) return;
                        OpenCircle("Фракция", pFraction);
                        return;
                    case 3:
                        //mp.gui.chat.push(">>" + entity);
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('passport', entity);
                        return;
                    case 4:
                        //mp.gui.chat.push(">>" + entity);
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('licenses', entity);
                        return;
                    case 5:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Вылечить");
                        return;
                    case 6:
                        OpenCircle("Дом", 0);
                        return;
                    case 7:
                        OpenCircle("Социальное", 0);
                        return;
                }
                return;
			case "Социальное":
                switch (index) {
                    case 0:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Пожать руку");
                        return;
                    case 1:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Поцеловать");
                        return;
					case 2:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Взять на руки");
                        return;
                }
                return;
            case "Дом":
                switch (index) {
                    case 0:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Продать машину");
                        return;
                    case 1:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Продать дом");
                        return;
                    case 2:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Заселить в дом");
                        return;
                    case 3:
						mp.game.graphics.transitionFromBlurred(100);
                        mp.events.callRemote('pSelected', entity, "Пригласить в дом");
                        return;
                }
                return;
            case "Фракция":
                if (entity == null) return;
                circleEntity = entity;
                if (fractionActions[pFraction] == undefined) return;
                mp.events.callRemote('pSelected', entity, fractionActions[pFraction][index]);
				mp.game.graphics.transitionFromBlurred(100);
                return;
        }
    }
});

var aCategory = -1;

// // //
var pFraction = 0;
var fractionActions = [];
fractionActions[1] = ["Ограбить", "Украсть оружие", "Мешок"];
fractionActions[2] = ["Ограбить", "Украсть оружие", "Мешок"];
fractionActions[3] = ["Ограбить", "Украсть оружие", "Мешок"];
fractionActions[4] = ["Ограбить", "Украсть оружие", "Мешок"];
fractionActions[5] = ["Ограбить", "Украсть оружие", "Мешок"];
fractionActions[6] = ["Вести за собой"];
fractionActions[7] = ["Вести за собой", "Обыскать", "Изъять оружие", "Изъять нелегал", "Сорвать маску", "Выписать штраф", "Выдать лицензию на оружие", "Посадить в КПЗ"];
fractionActions[8] = ["Продать аптечку", "Предложить лечение", "Выдать медицинскую карту"];
fractionActions[9] = ["Вести за собой", "Обыскать", "Изъять оружие", "Изъять нелегал", "Сорвать маску"];
fractionActions[10] = ["Вести за собой", "Мешок", "Ограбить", "Украсть оружие"];
fractionActions[11] = ["Вести за собой", "Мешок", "Ограбить", "Украсть оружие"];
fractionActions[12] = ["Вести за собой", "Мешок", "Ограбить", "Украсть оружие"];
fractionActions[13] = ["Вести за собой", "Мешок", "Ограбить", "Украсть оружие"];
fractionActions[14] = ["Вести за собой", "Обыскать", "Изъять оружие", "Изъять нелегал", "Сорвать маску"];
fractionActions[15] = ["Вести за собой"];
fractionActions[16] = ["Вести за собой"];
fractionActions[17] = ["Вести за собой", "Мешок", "Обыскать", "Изъять нелегал", "Сорвать маску"];
fractionActions[18] = ["Вести за собой", "Обыскать", "Изъять оружие", "Изъять нелегал", "Сорвать маску", "Выписать штраф"];
mp.events.add('fractionChange', (fraction) => {
    pFraction = fraction;
});
}