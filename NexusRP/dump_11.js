{
﻿var effect = '';
global.lastCheck = 0;
global.chatLastCheck = 0;
global.pocketEnabled = false;


const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
let gui;

mp.game.gameplay.disableAutomaticRespawn(true);
mp.game.gameplay.ignoreNextRestart(true);
mp.game.gameplay.setFadeInAfterDeathArrest(false);
mp.game.gameplay.setFadeOutAfterDeath(false);
mp.game.gameplay.setFadeInAfterLoad(false);

mp.events.add('freeze', function (toggle) {
    localplayer.freezePosition(toggle);
});

mp.events.add('destroyCamera', function () {
    if(cam) cam.destroy();
    mp.game.cam.renderScriptCams(false, false, 3000, true, true);
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
mp.events.add("blackday", (check) => {
	for (let i = 0; i <= 16; i++)
	{
		mp.game.graphics.setLightsState(i, check);
	}
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


mp.events.add('ready', function () {
    mp.game.ui.displayHud(true);
    //cam.setActive(false);
    //mp.game.graphics.stopScreenEffect(effect);
});

mp.events.add('kick', function (notify) {
    mp.events.call('notify', 4, 9, notify, 10000);
    NewEvent.callRemote('kickclient');
});

mp.events.add('loggedIn', function () {
    global.loggedin = true;
});

// mp.events.add('setFollow', function (toggle, entity) {
//     if (toggle) {
//         if (entity && mp.players.exists(entity))
//             localplayer.taskFollowToOffsetOf(entity.handle, 0, 0, 0, 1, -1, 1, true)
//     }
//     else
//         localplayer.clearTasks();
// });
let escort = !1,
    escortTo = null,
    escortInterval = null,
    taskEnterVeh = !1;
const escortEvent = () => {
    mp.game.controls.disableAllControlActions(1), mp.game.controls.disableAllControlActions(2)
};
mp.events.add("setFollow", function(toggle,a) {
    escort && (escortInterval && clearInterval(escortInterval), mp.events.remove("render", escortEvent)), 
    escort = !0,
     escortTo = a;
    let b = 0;
    escortInterval = setInterval(() => {
        var a = Math.pow;
        if (escortTo && mp.players.exists(escortTo) && toggle) {
            if (0 === escortTo.handle) return void(10 > ++b ? NewEvent.callRemote("server_playerSync_escortTeleport") : (NewEvent.callRemote("playerPressFollowBut"), mp.events.call("client_playerSync_escortOff")));
            if (20 < Math.sqrt(a(localplayer.position.x - escortTo.position.x, 2) + a(localplayer.position.y - escortTo.position.y, 2))) return NewEvent.callRemote("playerPressFollowBut"), 
            void mp.events.call("client_playerSync_escortOff");
            b = 0, 
            localplayer.taskFollowToOffsetOf(escortTo.handle, 0, 0, 0, 1, -1, 1, !0)
        } 
        else mp.events.call("client_playerSync_escortOff")
    }, 1800),
     mp.events.add("render", escortEvent)
}),
 mp.events.add("client_playerSync_escortOff", function() {
    escort && (escort = !1,
         escortTo = null,
          clearInterval(escortInterval), 
           escortInterval = null,
           localplayer.clearTasks(), 
             mp.events.remove("render", escortEvent))
});
setInterval(function () {
    if (localplayer.getArmour() <= 0 &&( localplayer.getVariable('HASARMOR') === true || localplayer.getVariable('Orangearmor') === true ||localplayer.getVariable('Purplearmor') === true || localplayer.getVariable('Redarmor') === true || localplayer.getVariable('Greenarmor') === true || localplayer.getVariable('Bluearmor') === true)) {
        NewEvent.callRemote('deletearmor');
    }
}, 600);


// mp.keys.bind(Keys.VK_K, false, function () { // E key
//     //if (!loggedin || chatActive || localplayer.getVariable('InDeath') == true || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
//     try{
//         mp.players.local.setToRagdoll(parseInt(2000), parseInt(2000), 0, true, true, true);
//         }catch{}
// });



global.NPCDialogOpened = false;
mp.keys.bind(Keys.VK_E, false, function () { // E key
    if (!loggedin || chatActive || localplayer.getVariable('InDeath') == true || editing || global.menuOpened) return;
    if(global.NPCDialogOpened) return;
    if(mp.players.local.npcInteract != null) {
        NewEvent.callRemote('Quest.NPC.OnInteract', mp.players.local.npcInteract);
       // mp.gui.chat.push(mp.players.local.npcInteract);
    } else if(mp.players.local.drugPoint != null) {
        NewEvent.callRemote('DrugDrop.Dig');
        mp.events.call("PressE", false);
       // mp.gui.chat.push(mp.players.local.npcInteract);
    } else NewEvent.callRemote('interactionPressed');
    global.acheat.pos();
});

mp.keys.bind(Keys.VK_L, false, function () { // L key
    if (!loggedin || chatActive || editing || mp.game.ui.isPauseMenuActive() || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    NewEvent.callRemote('lockCarPressed');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_LEFT, true, () => {
	if(mp.gui.cursor.visible || !loggedin || mp.game.ui.isPauseMenuActive()) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if(localplayer.vehicle.getVariable('leftlight') == true) NewEvent.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else NewEvent.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 1, 0);
		}
	}
});

mp.keys.bind(Keys.VK_RIGHT, true, () => {
	if(mp.gui.cursor.visible || !loggedin || mp.game.ui.isPauseMenuActive()) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if(localplayer.vehicle.getVariable('rightlight') == true) NewEvent.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else NewEvent.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 1);
		}
	}
});

mp.keys.bind(Keys.VK_DOWN, true, () => {
	if(mp.gui.cursor.visible || !loggedin || mp.game.ui.isPauseMenuActive()) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if(localplayer.vehicle.getVariable('leftlight') == true && localplayer.vehicle.getVariable('rightlight') == true) NewEvent.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else NewEvent.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 1, 1);
		}
	}
});
mp.keys.bind(Keys.VK_2, false, function () { // B key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1200 || mp.game.ui.isPauseMenuActive() || global.menuOpened || localplayer.getVariable('seats') == true) return;
    if (localplayer.isInAnyVehicle(false) && localplayer.vehicle.getSpeed() <= 3) {
        lastCheck = new Date().getTime();
        NewEvent.callRemote('engineCarPressed');
    }
});



mp.keys.bind(Keys.VK_Z, false, function () { // Z key
    if (!loggedin || chatActive || editing || mp.game.ui.isPauseMenuActive() || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) CheckMyWaypoint();
		else {
			if (localplayer.vehicle.getClass() == 18) NewEvent.callRemote('syncSirenSound', localplayer.vehicle);
		}
	} else NewEvent.callRemote('playerPressFollowBut');
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

            var street = mp.game.pathfind.getStreetNameAtCoord(coord.x, coord.y, coord.z, 0, 0);
            let area = mp.game.zone.getNameOfZone(coord.x, coord.y, coord.z);
            area = mp.game.ui.getLabelText(area)
            street = mp.game.ui.getStreetNameFromHashKey(street.streetName)
            let adress = `${area} - ${street}`;
			if(foundblip) NewEvent.callRemote('syncWaypoint', coord.x, coord.y, adress,coord.z);
		}
	} catch (e) { }
}

mp.events.add('syncWP', function (bX, bY, type) {
    if(!mp.game.invoke('0x1DD1F58F493F1DA5')) {
		mp.game.ui.setNewWaypoint(bX, bY);
		if(type == 0) mp.events.call('notify', 2, 9, "Пассажир передал Вам информацию о своём маршруте!", 3000);
		else if(type == 1) mp.events.call('notify', 2, 9, "Человек из списка контактов Вашего телефона передал Вам метку его местоположения!", 3000);
	} else {
		if(type == 0) mp.events.call('notify', 4, 9, "Пассажир попытался передать Вам информацию о маршруте, но у Вас уже установлен другой маршрут.", 5000);
		else if(type == 1) mp.events.call('notify', 4, 9, "Человек из списка контактов Вашего телефона попытался передать Вам метку его местоположения, но у Вас уже установлена другая метка.", 5000);
	}
});

mp.keys.bind(Keys.VK_F2, false, function () { // U key
    if (!loggedin || chatActive || editing || global.menuOpened || mp.game.ui.isPauseMenuActive() || localplayer.getVariable('seats') === true || new Date().getTime() - lastCheck < 1000) return;
    NewEvent.callRemote('openCopCarMenu');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_OEM_3, false, function () { // ` key
    if ((chatActive || (global.menuOpened && mp.gui.cursor.visible) || mp.game.ui.isPauseMenuActive()) && (!mp.players.local.phoneOpened) ) return;
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});

mp.keys.bind(Keys.VK_F6, false, function () { // F6 key
    if (global.menuCheck()) return;
    if (!mp.game.recorder.isRecording()) {
        mp.game.recorder.start(1);
    } else {
        mp.game.recorder.stop();
    }
});

var lastPos = new mp.Vector3(0, 0, 0);

mp.game.gameplay.setFadeInAfterDeathArrest(false);
mp.game.gameplay.setFadeInAfterLoad(false);

var deathTimerOn = false;
var deathTimer = 0;

mp.events.add('DeathTimer', (time) => {
    if (time === false){
        deathTimerOn = false;
        deathTimer = 0;
    }        
    else {
        
        deathTimerOn = true;
        deathTimer = time;
    }
});
mp.events.add('EMS:AddTime',(time)=>{
    deathTimer = deathTimer + time
});
let DeathTimer;
let DeathConfirm = false;
mp.events.add('EMS:DeathScreen', (data, bool) => {
    if (bool) {
        mp.gui.execute(`deathscreen.deathScreenActive(true)`);
        mp.gui.cursor.visible = true;
        mp.gui.execute(`deathscreen.killer='${data.killer}'`);
        mp.gui.execute(`deathscreen.killerId=${data.killerId}`);
        mp.gui.execute(`deathscreen.deathTimeLeft='${data.deathTimeLeft}'`);
        DeathConfirm = false;
        mp.game.graphics.startScreenEffect("DeathFailMichaelIn", 30000, true);
        DeathTimer = setInterval(() => {                        
            var minutes = Math.floor(deathTimer/60);
            var seconds = deathTimer%60;
            if(seconds < 10) seconds = "0"+seconds;
            mp.gui.execute(`deathscreen.deathTimeLeft='${minutes}:${seconds}'`);
            deathTimer--;
        }, 1000);

    } else {
        clearInterval(DeathTimer)
        mp.gui.execute(`deathscreen.deathScreenActive(false)`);
        mp.game.graphics.stopScreenEffect("DeathFailMichaelIn");
    }
});

mp.events.add('EMS:DeathConfirm', (data) => {	 
    DeathConfirm = true;
	NewEvent.callRemote("EMS:DeathConfirm", data, deathTimer);
	mp.gui.cursor.visible = false;
});

mp.events.add('render', () => {
    if (localplayer.getVariable('InDeath') == true) {
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.enableControlAction(2, 1, true);
        mp.game.controls.enableControlAction(2, 2, true);
        mp.game.controls.enableControlAction(2, 3, true);
        mp.game.controls.enableControlAction(2, 4, true);
        mp.game.controls.enableControlAction(2, 5, true);
        mp.game.controls.enableControlAction(2, 6, true);
    }
    

    if (mp.game.controls.isControlPressed(0, 32) || 
        mp.game.controls.isControlPressed(0, 33) || 
        mp.game.controls.isControlPressed(0, 321) ||
        mp.game.controls.isControlPressed(0, 34) || 
        mp.game.controls.isControlPressed(0, 35) || 
        mp.game.controls.isControlPressed(0, 24)) 
    {
        afkSecondsCount = 0;
    }
    else if (localplayer.isInAnyVehicle(false) && localplayer.vehicle.getSpeed() != 0) 
    {
        afkSecondsCount = 0;
    } 
    else if(spectating) 
    { // Чтобы не кикало администратора в режиме слежки
		afkSecondsCount = 0;
	}
});

mp.events.add("playerRuleTriggered", (rule, counter) => {
    if (rule === 'ping' && counter > 5) {
        mp.events.call('notify', 4, 2, "Ваш ping слишком большой. Зайдите позже", 5000);
    }
});
}