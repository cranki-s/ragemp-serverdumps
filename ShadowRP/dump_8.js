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
    isInSafeZone = argument;
	mp.gui.execute(`HUD.greenzone=${argument}`);
});

mp.keys.bind(0x47, false, function () { // G Menu Veh
    if (global.menuCheck() || localplayer.getVariable('InDeath') == true && !localPlayer.isInAnyVehicle(false)) return;
    if (circleOpen) {
        CloseCircle();
		mp.game.graphics.transitionFromBlurred(100);
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
			mp.game.graphics.transitionToBlurred(100);
            break;
        case "vehicle":
			if (localplayer.getVariable("TakeHijackingItem") >= 0) {
                mp.events.callRemote("PutHijackingItemHouseInVehicle", entity);
                return;
            }
            if(entity.getVariable("ACCESS") == "DUMMY") return;
			if (localplayer.getVariable('PLAYERHASITEMHH') == true)
			{
			   mp.events.callRemote("server::addininvhouseheist", entity);
			   return;
			}
            mp.gui.cursor.visible = true;
            OpenCircle('Машина', 0);
			mp.game.graphics.transitionToBlurred(100);
            break;
    }
    lastCheck = new Date().getTime();
});

mp.keys.bind(0x47, false, function () { // G Menu Player
    if (global.menuCheck() || localplayer.getVariable('InDeath') == true) return;
    // player
    if (circleOpen) {
        CloseCircle();
		mp.game.graphics.transitionFromBlurred(100);
        return;
    }
    if (!loggedin || chatActive || nearestObject == null || new Date().getTime() - lastCheck < 1000) return;

    if (nearestObject && mp.players.exists(nearestObject)) {
        entity = nearestObject;
        mp.gui.cursor.visible = true;
        OpenCircle('Игрок', 0);
		mp.game.graphics.transitionToBlurred(100);
    }

    lastCheck = new Date().getTime();
});

mp.keys.bind(0x45, false, function () { // Take Item
    if (global.menuCheck() || localplayer.getVariable('InDeath') == true) return;

    if (!loggedin || chatActive || nearestObject == null || new Date().getTime() - lastCheck < 1000) return;
	
    if (nearestObject && nearestObject.type == 'object' && mp.objects.exists(nearestObject)) {
        mp.events.callRemote('oSelected', nearestObject);
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

mp.events.add('render', () => {
	try {
        if (!loggedin) return;
		if(pedsaying != null) {
			let pos = pedsaying.getBoneCoords(12844, 0.5, 0, 0);
			mp.game.graphics.drawText(pedtext, [pos.x, pos.y, pos.z+0.1], {
				font: 0,
				color: [255, 255, 255, 185],
				scale: [0.35, 0.35],
				outline: true
			});
			if(pedtext2 != null) {
				let pos = pedsaying.getBoneCoords(12844, 0.5, 0, 0);
				mp.game.graphics.drawText(pedtext2, [pos.x, pos.y, pos.z+0.017], {
					font: 0,
					color: [255, 255, 255, 185],
					scale: [0.35, 0.35],
					outline: true
				});
			}
		}
		if (!admingm) localplayer.setInvincible(false);
        if (localplayer.isSprinting() || localplayer.isOnAnyBike()) mp.game.player.restoreStamina(100);
        mp.game.player.setLockonRangeOverride(1.5);
        mp.game.controls.disableControlAction(1, 7, true);
		// thanks to kemperrr
		if (mp.game.invoke(getNative('IS_CUTSCENE_ACTIVE'))) {
	        mp.game.invoke(getNative('STOP_CUTSCENE_IMMEDIATELY'))
		}

	    if (mp.game.invoke(getNative('GET_RANDOM_EVENT_FLAG'))) {
	        mp.game.invoke(getNative('SET_RANDOM_EVENT_FLAG'), false);
		}

		if (mp.game.invoke(getNative('GET_MISSION_FLAG'))) {
			mp.game.invoke(getNative('SET_MISSION_FLAG'), false);
		}


		if (pocketEnabled) {
	        mp.game.controls.disableControlAction(2, 0, true);
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
            mp.game.controls.disableControlAction(2, 25, true);
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

	    if (localplayer.hasVariable('CARROOMID') && !localplayer.getVariable('CARROOMID') && nearestObject && mp.players.exists(nearestObject)) {
		    mp.game.graphics.drawText("Взаимодействие [G]", [nearestObject.position.x, nearestObject.position.y, nearestObject.position.z], {
			    font: 0,
	            color: [255, 255, 255, 185],
				scale: [0.20, 0.20],
			    outline: true
			});
		}         
		else if (nearestObject && nearestObject.type == 'object' && mp.objects.exists(nearestObject)) {
		    mp.game.graphics.drawText("Поднять [E]", [nearestObject.position.x, nearestObject.position.y, nearestObject.position.z], {
			    font: 0,
	            color: [255, 255, 255, 185],
		        scale: [0.20, 0.20],
			    outline: true
			});
			mp.game.graphics.drawMarker(
						27,
						nearestObject.position.x, nearestObject.position.y, nearestObject.position.z,
						0, 0, 0,
						0, 0, 0,
						1.0, 1.0, 1.0,
						255, 160, 0, 120,
						false, false, 1,
						false, null, null, false,
					);
		}
        else if (entity != null && !localplayer.isInAnyVehicle(false)) {
			if(truckorderveh == null || entity != truckorderveh) {
                if(entity.getVariable("ACCESS") != "DUMMY") {
                    mp.game.graphics.drawText("Взаимодействие [G]", [entity.position.x, entity.position.y, entity.position.z], {
                        font: 0,
                        color: [255, 255, 255, 185],
                        scale: [0.20, 0.20],
                        outline: true
                    });
					mp.game.graphics.drawMarker(
						20,
						entity.position.x, entity.position.y, entity.position.z + 1.7,
						0, 0, 0,
						0, 180, 0,
						1.0, 1.0, 1.0,
						255, 160, 0, 120,
						true, false, 2,
						true, null, null, false,
					);
                }
			} else if(entity == truckorderveh) {
				mp.game.graphics.drawText("Ваш трейлер", [entity.position.x, entity.position.y, entity.position.z], {
					font: 4,
					color: [255, 255, 255, 255],
					scale: [1.2, 1.2],
					outline: true
				});
			}
		}
	} catch (e) {
        mp.game.graphics.notify('RE:' + e.toString());
    }
});
}