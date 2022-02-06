{
﻿var cam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), false);
var effect = '';
global.loggedin = false;
global.lastCheck = 0;
global.chatLastCheck = 0;
global.pocketEnabled = false;


mp.events.add('outVeh', (flag) => {
	const player = mp.players.local;
	if (player.vehicle != null)
		player.taskLeaveVehicle(player.vehicle.handle, 0);
});

mp.game.gameplay.disableAutomaticRespawn(true);
mp.game.gameplay.ignoreNextRestart(true);
mp.game.gameplay.setFadeInAfterDeathArrest(false);
mp.game.gameplay.setFadeOutAfterDeath(false);
mp.game.gameplay.setFadeInAfterLoad(false);

mp.events.add('freeze', function (toggle) {
    localplayer.freezePosition(toggle);
});

mp.events.add('destroyCamera', function () {
    mp.game.cam.renderScriptCams(false, false, 3000, true, true);
    if (cam != null)
        cam.destroy();
});

mp.events.add('carRoom', function (x, y, z, x2, y2, z2) {
    cam = mp.cameras.new('default', new mp.Vector3(x, y, z), new mp.Vector3(0, 0, 0), 45);
    cam.pointAtCoord(x2, y2, z2);
    cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add('screenFadeOut', function (duration) {
    mp.game.cam.doScreenFadeOut(duration);
});

mp.events.add('screenFadeIn', function (duration) {
    mp.game.cam.doScreenFadeIn(duration);
});

var lastScreenEffect = "";
mp.events.add('startScreenEffect', function (effectName, duration, looped) {
	try {
		lastScreenEffect = effectName;
		mp.game.graphics.startScreenEffect(effectName, duration, looped);
	} catch (e) { }
});

mp.events.add('stopScreenEffect', function (effectName) {
	try {
		var effect = (effectName == undefined) ? lastScreenEffect : effectName;
		mp.game.graphics.stopScreenEffect(effect);
	} catch (e) { }
});

mp.events.add('stopAndStartScreenEffect', function (stopEffect, startEffect, duration, looped) {
	try {
		mp.game.graphics.stopScreenEffect(stopEffect);
		mp.game.graphics.startScreenEffect(startEffect, duration, looped);
	} catch (e) { }
});

mp.events.add('setHUDVisible', function (arg) {
    mp.game.ui.displayHud(arg);
    mp.gui.chat.show(arg);
    mp.game.ui.displayRadar(arg);
});

mp.events.add('setPocketEnabled', function (state) {
    pocketEnabled = state;
    if (state) {
        mp.gui.execute("fx.set('inpocket')");
        mp.game.invoke(getNative("SET_FOLLOW_PED_CAM_VIEW_MODE"), 4);
    }
    else {
        mp.gui.execute("fx.reset()");
    }
});
mp.keys.bind(Keys.VK_ALT, false, function () { // ALT key
    if (global.menuCheck() || localplayer.getVariable('InDeath') == true && !localplayer.isInAnyVehicle(false)) return;
    if (circleOpen) {
        CloseCircle();
        return;
    }
    if (!loggedin || chatActive || entity == null || new Date().getTime() - lastCheck < 1000) return;
    switch (entity.type) {
        case "player":
			if (localplayer.getVariable('familycid') != null )
			{
				mp.gui.cursor.visible = true;
				OpenCircle("Семья", 0);
				return;
			}
            mp.gui.cursor.visible = true;
            OpenFracData("Фракция");
            return;
    }
    lastCheck = new Date().getTime();
});
mp.keys.bind(global.Keys.VK_E, false, function() {
    mp.events.callRemote('takeferma');
});
mp.keys.bind(Keys.VK_K, false, function () {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('cancelPressed');
    lastCheck = new Date().getTime();
});

mp.events.add('connected', function () {
    mp.game.ui.displayHud(false);
    cam = mp.cameras.new('default', startCamPos, startCamRot, 90.0);
    cam.setActive(true);
    mp.game.graphics.startScreenEffect('SwitchSceneMichael', 5000, false);
    var effect = 'SwitchSceneMichael';
});

mp.events.add('ready', function () {
    mp.game.ui.displayHud(true);
});

mp.events.add('loggedIn', function () {
    loggedin = true;
});

mp.events.add('setFollow', function (toggle, entity) {
    if (toggle) {
        if (entity && mp.players.exists(entity))
            localplayer.taskFollowToOffsetOf(entity.handle, 0, 0, 0, 1, -1, 1, true)
    }
    else
        localplayer.clearTasks();
});
setInterval(function () {
    if (localplayer.getArmour() <= 0 && localplayer.getVariable('HASARMOR') == true) {
        mp.events.callRemote('deletearmor');
    }
}, 10);

mp.keys.bind(Keys.VK_E, false, function () { // E key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('interactionPressed');
    lastCheck = new Date().getTime();
    global.acheat.pos();
});

mp.keys.bind(Keys.VK_L, false, function () { // L key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('lockCarPressed');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_LEFT, true, () => {
	if(mp.gui.cursor.visible || !loggedin) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if(localplayer.vehicle.getVariable('leftlight') == true) 
                mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else 
                mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 1, 0);
		}
	}
});

mp.keys.bind(Keys.VK_RIGHT, true, () => {
	if(mp.gui.cursor.visible || !loggedin) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if (localplayer.vehicle.getVariable('rightlight') == true) 
                mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else 
                mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 1);
		}
	}
});

mp.keys.bind(Keys.VK_DOWN, true, () => {
	if(mp.gui.cursor.visible || !loggedin) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if(localplayer.vehicle.getVariable('leftlight') == true && localplayer.vehicle.getVariable('rightlight') == true) mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 1, 1);
		}
	}
});

mp.keys.bind(Keys.VK_B, false, function () { // B key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 400 || global.menuOpened) return;
    if (localplayer.isInAnyVehicle(false) && localplayer.vehicle.getSpeed() <= 3) {
        lastCheck = new Date().getTime();
        mp.events.callRemote('engineCarPressed');
    }
});

mp.keys.bind(Keys.VK_UP, false, function () { // Телефон
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true) return;
    mp.events.callRemote('openPlayerMenu');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_N, false, function () {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('playerPressCuffBut');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_Z, false, function () { // Z key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
	
    if(localplayer.vehicle) {
        CheckMyWaypoint();
    } else mp.events.callRemote('playerPressFollowBut');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_Z, false, function () { // Z key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    
    if(localplayer.vehicle) {
        CheckMyWaypoint();
    } else mp.events.callRemote('playerPressFollowBut');
    lastCheck = new Date().getTime();
});

function CheckMyWaypoint() {
    try {
        if(mp.game.invoke('0x1DD1F58F493F1DA5')) {
            let foundblip = false;
            let blipIterator = mp.game.invoke('0x186E5D252FA50E7D');
            let totalBlipsFound = mp.game.invoke('0x9A3FF3DE163034E8');
            let FirstInfoId = mp.game.invoke('0x1BEDE233E6CD2A1F', blipIterator);
            let NextInfoId = mp.game.invoke('0x14F96AA50D6FBEA7', blipIterator);
            for (let i = FirstInfoId, blipCount = 0; blipCount != totalBlipsFound; blipCount++, i = NextInfoId) {
                if (mp.game.invoke('0x1FC877464A04FC4F', i) == 8) {
                    var coord = mp.game.ui.getBlipInfoIdCoord(i);
                    foundblip = true;
                    break;
                }
            }
            if(foundblip) mp.events.callRemote('syncWaypoint', coord.x, coord.y, coord.z);
        }
    } catch (e) { }
}

var gproute = null;

mp.events.add('syncWP', function (bX, bY, type) {
    if(!mp.game.invoke('0x1DD1F58F493F1DA5')) {
        gproute = mp.blips.new(38, new mp.Vector3(bX, bY), { alpha: 255, name: "", scale: 1, color: 1 });
        gproute.setRoute(true);
        gproute.setRouteColour(5);
        if(type == 0) mp.events.call('notify', 2, 9, "Пассажир передал Вам информацию о своём маршруте!", 3000);
        else if(type == 1) mp.events.call('notify', 2, 9, "Человек из списка контактов Вашего телефона передал Вам метку его местоположения!", 3000);
    } else {
        if(type == 0) mp.events.call('notify', 4, 9, "Пассажир попытался передать Вам информацию о маршруте, но у Вас уже установлен другой маршрут.", 5000);
        else if(type == 1) mp.events.call('notify', 4, 9, "Человек из списка контактов Вашего телефона попытался передать Вам метку его местоположения, но у Вас уже установлена другая метка.", 5000);
    }
});

mp.events.add('removeGRoute', function(){
	try 
	{
		if (gproute != null)
		{
			gproute.destroy();
			gproute = null;
		}
	}
	catch (e) {}
});

mp.keys.bind(Keys.VK_U, false, function () { // U key
    if (!loggedin || chatActive || editing || global.menuOpened || new Date().getTime() - lastCheck < 1000) return;
    mp.events.callRemote('openCopCarMenu');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_OEM_3, false, function () { // ` key
    if (chatActive || (global.menuOpened && mp.gui.cursor.visible)) return;
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});

var lastPos = new mp.Vector3(0, 0, 0);
mp.game.gameplay.setFadeInAfterDeathArrest(false);
mp.game.gameplay.setFadeInAfterLoad(false);
var deathTimerOn = false;
var deathTimer = 0;

mp.events.add('DeathTimer', (time) => {
    if (time === false) {
        deathTimerOn = false;
		global.dialog.closeMED();
	}
    else {
		global.menu.execute(`death.buttonact=false`);
        deathTimerOn = true;
        deathTimer = new Date().getTime() + time;
    }
});

mp.events.add('render', () => {
    if (localplayer.getVariable('InDeath') == true || intrunk) {
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.enableControlAction(2, 1, true);
        mp.game.controls.enableControlAction(2, 2, true);
        mp.game.controls.enableControlAction(2, 3, true);
        mp.game.controls.enableControlAction(2, 4, true);
        mp.game.controls.enableControlAction(2, 5, true);
        mp.game.controls.enableControlAction(2, 6, true);
    }
	if (intrunk) {
		mp.game.controls.enableControlAction(2, 27, false);
		mp.game.controls.disableAllControlActions(32);
	}
    if (deathTimerOn) {
        var secondsLeft = Math.trunc((deathTimer - new Date().getTime()) / 1000);
        var minutes = Math.trunc(secondsLeft / 60);
        var seconds = secondsLeft % 60;
		var sseconds = seconds;
		if (seconds <= 9 && seconds >= 1)
			sseconds =  "0" + seconds;
		else if (seconds <= 0)
			sseconds = "00";
		global.menu.execute(`death.time="${minutes}:${sseconds}"`);
    }
});

mp.keys.bind(Keys.VK_E, false, function () { // E key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('interactionPressed');
    lastCheck = new Date().getTime();
    global.acheat.pos();
});
}