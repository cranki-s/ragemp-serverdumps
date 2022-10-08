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
    const {
        x: a,
        y: b,
        z: c
    } = mp.players.local.position;
    let d = 2,
        e = null;
    var objects = mp.objects.toArray();
    for (const f of objects) {
        if (!mp.objects.exists(f)) {
            // dropObjectList.delete(f);
            continue
        }
        if (0 === f.handle || mp.players.local.dimension !== f.dimension) continue;
        const g = mp.game.system.vdist(f.position.x, f.position.y, f.position.z, a, b, c);
        g < d && (e = f, d = g)
    }
    if (null != e) {
        if (e.hasVariable("objectItem")) {
            const a = e.getVariable("objectItem").split("%");
            let name = checkItemName(a[1]);
            mp.game.graphics.drawText(`${name} ( ${a[2]} )\n~g~E`, [e.position.x, e.position.y, e.position.z], {
                color: [255, 255, 255, 255],
                scale: [.35, .35],
                outline: !0
            });
        }
        nearestObject = e
    } else nearestObject = null
}

function checkItemName(name){
    if(name.includes('Ключи от машины')){
        return global.GetText('Ключи от машины ')+name.split(' ')[3]
    }
    else if(name.includes('Номер')){
        return global.GetText('Номер: [ ')+name.split(' ')[2]+' ]'
    }else{
       return global.GetText(name);
    }
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

mp.events.add('safeZoneMechanic', (inZone, isGov)=> {
    if(isGov){
        isInSafeZone = false;
    }else{
        isInSafeZone = inZone;
    }
});
mp.events.addDataHandler("objectItem", function(a) {
    a.__disableCollision = !0, a.__objectItem = !0, a.notifyStreaming = !0, 0 !== a.handle && (a.setCollision(!1, !0))
}),
mp.keys.bind(Keys.VK_E, false, function () { // F2 key	    
    if (global.menuCheck() || localplayer.getVariable('InDeath') == true || cuffed || localplayer.getVariable('seats') == true) return;
    // player    
    if (!loggedin || chatActive || nearestObject == null || global.FisherManStart == true) return;
    if (nearestObject && nearestObject.type == 'object' && nearestObject.hasVariable("objectItem") && mp.objects.exists(nearestObject)) {
        NexusEvent.callRemote('oSelected', nearestObject);
    }
    lastCheck = new Date().getTime();
});


var truckorderveh = null;
var disableG = false;
mp.events.add('CaroomDisableG',(e)=>{
    disableG = e;
})
setInterval(() => {
    mp.game.controls.disableControlAction(0, 37, !0),
        mp.game.controls.disableControlAction(0, 45, !0),
        mp.game.controls.disableControlAction(0, 140, !0),
        (cuffed || global.isPlayerUseAnim) && (mp.game.controls.disableControlAction(0, 21, !0), mp.game.controls.disableControlAction(0, 22, !0),
        mp.game.controls.disableControlAction(0, 23, !0),
         mp.game.controls.disableControlAction(0, 24, !0), 
         mp.game.controls.disableControlAction(0, 91, !0), 
         mp.game.controls.disableControlAction(0, 92, !0),
         mp.game.controls.disableControlAction(0, 142, !0),
          mp.game.controls.disableControlAction(0, 257, !0)), 
        isInSafeZone && 101631238 !== global.currentWeapons && 911657153 !== global.currentWeapons && (mp.game.controls.disableControlAction(0, 24, !0),
        mp.game.controls.disableControlAction(0, 141, !0),
        mp.game.controls.disableControlAction(0, 257, !0),
        mp.game.controls.disableControlAction(0, 68, !0),
        mp.game.controls.disableControlAction(0, 69, !0),
        mp.game.controls.disableControlAction(0, 70, !0),
        mp.game.controls.disableControlAction(0, 91, !0),
        mp.game.controls.disableControlAction(0, 92, !0))
}, 0);

mp.events.add('render', ()=>{
    let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
    let groupHash = mp.game.weapon.getWeapontypeGroup(weaponHash);
    if(groupHash == 3566412244 || groupHash == 2685387236){
        mp.game.controls.enableControlAction(0, 142, true);
    }else{
        mp.game.controls.disableControlAction(0, 142, true);
    }
});
mp.events.add('SetOrderTruck', (vehicle) => {
    try {
        if(truckorderveh == null) truckorderveh = vehicle;
		else truckorderveh = null;
    } catch (e) {
	}
});
var blockcontrols = false;
mp.events.add('setBlockControl', function (argument) {
    blockcontrols = argument;
});
global.IsFalling = false
mp.game.audio.setUserRadioControlEnabled(false);
mp.events.add('render', () => {
	try {       
        mp.players.local.setStealthMovement(false, '0');
        if (!loggedin) return;	
        if (mp.players.local.vehicle) {
            mp.game.audio.setRadioToStationName("OFF");
        }
        global.IsFalling = mp.players.local.isFalling()	
		if(pressedraw) {
			mp.game.graphics.drawText(`Нажмите 'E' для взаимодействия`, [0.10, 0.75], {
				font: 0,
				color: [255, 255, 255, 185],
				scale: [0.35, 0.35],
				outline: true
			});
		}
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
			NexusEvent.callRemote("cuffUpdate");
	        lastCuffUpdate = new Date().getTime();
		}

		if (!localplayer.isInAnyVehicle(false) && !localplayer.isDead()) {
	        if (!circleOpen) entity = getLookingAtEntity();
	        getNearestObjects();
		    if (entity != null && entity.getVariable('INVISIBLE') == true) entity = null;
		}

	    
        if (entity != null && !localplayer.isInAnyVehicle(false)) {
			if(truckorderveh == null || entity != truckorderveh) {
                if(!disableG && entity.type != "object" && entity.type != "ped"){
                    mp.game.graphics.drawText("[G]", [entity.position.x, entity.position.y, entity.position.z], {
                        font: 0,
                        color: [255, 255, 255, 185],
                        scale: [0.4, 0.4],
                        outline: true
                    });
                }				
			} else if(entity == truckorderveh) {
				mp.game.graphics.drawText("Ваш Заказ", [entity.position.x, entity.position.y, entity.position.z], {
					font: 1,
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