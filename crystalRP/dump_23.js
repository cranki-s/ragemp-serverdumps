{
﻿global.entity = null;
global.nearestObject = null;

var lastEntCheck = 0;
var checkInterval = 200;

var backlightColor = [196, 17, 21];

var blockcontrols = false;
global.cuffed = false;
var hasmoney = false;
var isInSafeZone = false;

var lastCuffUpdate = new Date().getTime();

function getLookingAtEntity() {
    let startPosition = localplayer.getBoneCoords(12844, 0.5, 0, 0);
    var resolution = mp.game.graphics.getScreenActiveResolution(1, 1);
    let secondPoint = mp.game.graphics.screen2dToWorld3d([resolution.x / 2, resolution.y / 2, (2 | 4 | 8)]);
    if (secondPoint == undefined) return null;

    startPosition.z -= 0.3;
    const result = mp.raycasting.testPointToPoint(startPosition, secondPoint, localplayer, (2 | 4 | 8 | 16));

    if (typeof result !== 'undefined') {
        if (typeof result.entity.type === 'undefined') return null;
        if (result.entity.type == 'object' && result.entity.getVariable('TYPE') == undefined) return null;

        let entPos = result.entity.position;
        let lPos = localplayer.position;
        if (mp.game.gameplay.getDistanceBetweenCoords(entPos.x, entPos.y, entPos.z, lPos.x, lPos.y, lPos.z, true) > 8) return null;
        return result.entity;
    }
    return null;
}

function getNearestObjects() {

    var tempO = null;
    if (localplayer.isInAnyVehicle(false)) {
        var players = mp.players.toArray();
        players.forEach(
            (player) => {
                var posL = localplayer.position;
                var posO = player.position;
                var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
                if (localplayer != player && localplayer.dimension === player.dimension && distance < 2) {
                    if (tempO === null) tempO = player;
                    else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                        mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                        tempO = player;
                }
            });
    }
    else {
        var objects = mp.objects.toArray();
        objects.forEach(
            (object) => {
                var posL = localplayer.position;
                var posO = object.position;
                var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
                if (object.getVariable('TYPE') != undefined && localplayer.dimension === object.dimension && distance < 3) {
                    if (tempO === null) tempO = object;
                    else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                        mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                        tempO = object;
                }
            });
    }
    nearestObject = tempO;
}

let state = 0;
let enter = false;

mp.events.add("playerEnterVehicle", (vehicle) => {
    try {
        if (vehicle.getClass() == 8) return;
		mp.events.call('notify', 3, 9, "Нажмите K чтобы надеть ремень безопасности", 3000);
		enter = true;
    } catch (e) { }
});

mp.events.add("playerLeaveVehicle", (vehicle) => {
    try {
        if (state == 0) return;
		mp.players.local.setConfigFlag(32, true);
		state = 0;
		enter = false;
		mp.events.call('notify', 3, 9, "Вы сняли ремень безопасности", 3000);
		mp.events.call("updremen", false);
    } catch (e) { }
});
mp.events.add("VehicleBelt", () => {
    if (!enter) return;
	if (!localplayer.isInAnyVehicle(false)) return;
    if (state == 0) {
		mp.events.call("updremen", true);
        mp.players.local.setConfigFlag(32, false);
		mp.events.call('notify', 3, 9, "Вы надели ремень безопасности", 3000);
        state = 1;
    } else {
		mp.events.call("updremen", false);
        mp.players.local.setConfigFlag(32, true);
		mp.events.call('notify', 3, 9, "Вы сняли ремень безопасности", 3000);
        state = 0;
    }
});

mp.events.add('blockMove', function (argument) {
    blockcontrols = argument;
});

mp.events.add('CUFFED', function (argument) {
    cuffed = argument;
});

mp.events.add('hasMoney', function (argument) {
    hasmoney = argument;
    if (!argument) localplayer.setEnableHandcuffs(false);
});

mp.events.add('safeZone', function (argument) {
	if (!argument) argument = false;
	isInSafeZone = argument;
	mp.gui.execute(`HUD.inGreenZone=${argument}`);
});

mp.keys.bind(Keys.VK_G, false, function () { // G key
    if (global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true && !localplayer.isInAnyVehicle(false)) return;
	if (global.localplayer.getVariable("attachToVehicleTrunk")) return;
    if (circleOpen) {
        CloseCircle();
        return;
    }
    if (!loggedin || chatActive || entity == null || new Date().getTime() - lastCheck < 1000) return;
    switch (entity.type) {
        case "object":
            if (entity && mp.objects.exists(entity)) {
                mp.events.callRemote('oSelected', entity);
            }
            entity = null;
            return;
        case "player":
            mp.gui.cursor.visible = true;
            OpenCircle('Игрок', 0);
            return;
        case "vehicle":
            if (localplayer.getVariable("TakeHijackingItem") >= 0) {
                mp.events.callRemote("PutHijackingItemHouseInVehicle", entity);
                return;
            }
            if (localplayer.getVariable('ON_WORKSS') == true) {
               mp.events.callRemote("bins", entity);
               return;
            }
            mp.gui.cursor.visible = true;
            OpenCircle('Машина', 0);
            return;
    }
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_F2, false, function () { // F2 key
    if (global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true) return;
	if (global.localplayer.getVariable("attachToVehicleTrunk")) return;
    // player
    if (circleOpen) {
        CloseCircle();
        return;
    }
    if (!loggedin || chatActive || nearestObject == null || new Date().getTime() - lastCheck < 1000) return;

    if (nearestObject && nearestObject.type == 'object' && mp.objects.exists(nearestObject)) {
        mp.events.callRemote('oSelected', nearestObject);
    }
    else if (nearestObject && mp.players.exists(nearestObject)) {
        entity = nearestObject;
        mp.gui.cursor.visible = true;
        OpenCircle('Игрок', 0);
    }

    lastCheck = new Date().getTime();
});


var truckorderveh = null;

mp.events.add('SetOrderTruck', (vehicle) => {
    try {
        if(truckorderveh == null) truckorderveh = vehicle;
		else truckorderveh = null;
    } catch (e) {
	}
});

global.playerMovingDisabled = false;

mp.events.add('render', () => {
	try {
		if (!loggedin) return;
		mp.game.player.restoreStamina(100);
		mp.game.player.setLockonRangeOverride(1.5);
        mp.game.controls.disableControlAction(1, 7, true);
		mp.game.controls.disableControlAction(1, 199, true); //Pause Menu (P)
		
		if (pocketEnabled) {
	        mp.game.controls.disableControlAction(2, 0, true);
	    }
		
		if (playerMovingDisabled) {
			mp.game.controls.disableControlAction(0, 21, true); /// бег
			mp.game.controls.disableControlAction(0, 22, true); /// прыжок
			mp.game.controls.disableControlAction(0, 31, true); /// вперед назад
			mp.game.controls.disableControlAction(0, 30, true); /// влево вправо
			mp.game.controls.disableControlAction(0, 24, true); /// удары
			mp.game.controls.disableControlAction(0, 25, true); /// INPUT_AIM
			mp.game.controls.disableControlAction(0, 257, true); /// стрельба
			mp.game.controls.disableControlAction(1, 200, true); // esc
			mp.game.controls.disableControlAction(0, 140, true); /// удары R
			mp.game.controls.disableControlAction(24, 37, true); /// Tab
			mp.game.controls.disableControlAction(0, 257, true); // INPUT_ATTACK2
		}

	    if (blockcontrols) {
		    mp.game.controls.disableAllControlActions(2);
			mp.game.controls.enableControlAction(2, 30, true);
	        mp.game.controls.enableControlAction(2, 31, true);
		    mp.game.controls.enableControlAction(2, 32, true);
			mp.game.controls.enableControlAction(2, 1, true);
	        mp.game.controls.enableControlAction(2, 2, true);
		}
		if (hasmoney) {
	        localplayer.setEnableHandcuffs(true);
        }
        if (isInSafeZone) {
            mp.game.controls.disableControlAction(2, 24, true);
            mp.game.controls.disableControlAction(2, 69, true);
            mp.game.controls.disableControlAction(2, 70, true);
            mp.game.controls.disableControlAction(2, 92, true);
            mp.game.controls.disableControlAction(2, 114, true);
            mp.game.controls.disableControlAction(2, 121, true);
            mp.game.controls.disableControlAction(2, 140, true);
            mp.game.controls.disableControlAction(2, 141, true);
            mp.game.controls.disableControlAction(2, 142, true);
            mp.game.controls.disableControlAction(2, 257, true);
            mp.game.controls.disableControlAction(2, 263, true);
            mp.game.controls.disableControlAction(2, 264, true);
            mp.game.controls.disableControlAction(2, 331, true);
        }
		
		if (mp.keys.isDown(32) && cuffed && new Date().getTime() - lastCuffUpdate >= 3000) {
			mp.events.callRemote("cuffUpdate");
	        lastCuffUpdate = new Date().getTime();
		}
		
		if (!localplayer.isInAnyVehicle(false) && !localplayer.isDead()) {
	        if (!circleOpen)
		        entity = getLookingAtEntity();
	        getNearestObjects();
		    if (entity != null && entity.getVariable('INVISIBLE') == true) entity = null;
		}
        else {
            getNearestObjects();
            if (entity != nearestObject) entity = null;
		}
        if (nearestObject != null && (entity == null || entity.type != "object")) {
		    mp.game.graphics.drawText("~h~~w~F2", [nearestObject.position.x, nearestObject.position.y, nearestObject.position.z], {
                font: 0,
                color: [255, 255, 255, 255],
                scale: [0.25, 0.25],
                outline: true
            });
		}
        if (entity != null && !localplayer.isInAnyVehicle(false)) {
			if (!entity.getVariable("INVISIBLE") && (entity.type == "player" || entity.type =="vehicle")) {
				mp.game.graphics.drawText("~h~~w~G [Взаимодействие]", [entity.position.x, entity.position.y, entity.position.z], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.3, 0.3],
                    outline: true
                });
            }
        }
	} catch (e) {
        mp.game.graphics.notify('RE:' + e.toString());
    }
});
}���ɩ