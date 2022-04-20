{
var afTogglePhone = Date.now();
var afReport = Date.now();
var mobilePhone = false;
var taxiCallColshape = false;

mp.keys.bind(0x26, true, function() { // стрелка вверх, телефон
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x26)) return false;
	
	if(Date.now() - afTogglePhone < 500) return false;
	afTogglePhone = Date.now();
	
	if(hud_browser) {
		if(!mobilePhone) {
			mobilePhone = true;
			localPlayer.taskUseMobilePhone(0);
			hud_browser.execute('togglePhone(\'{"name":"main"}\');');
			mp.gui.cursor.visible = true;
			allowBinds = [0x26];
		}else{
			if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
			if(cameraPhone) {
				mp.game.invoke("0x3BC861DF703E5097", false); // DESTROY_MOBILE_PHONE
				mp.game.mobile.cellCamActivate(false, false);
				mp.game.mobile.scriptIsMovingMobilePhoneOffscreen(true);
			
				cameraPhone = false;
				mp.game.ui.displayRadar(true);
				hideHud = false;
				hud_browser.execute('togglePhoneCameraMode(false);');
			}
			hud_browser.execute("togglePhone();");
			mp.gui.cursor.visible = false;
			restoreBinds();
			mobilePhone = false;
		}
	}
});

function phoneOff() {
	if(hud_browser) {
		if(mobilePhone) {
			if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
			hud_browser.execute("togglePhone();");
			mp.gui.cursor.visible = false;
			restoreBinds();
			mobilePhone = false;
		}
	}
}

// Camera App

var cameraPhone = false, makingPhotoWithCamera = false;
mp.events.add("toggleCameraPhone", (toggle) => {
	if(hud_browser && typeof(toggle) !== "undefined") {
		if(toggle) {
			if(localPlayer.vehicle) return notyAPI.error("Камера на телефоне в транспорте недоступна", 3000, true);
			if(localPlayer.getVariable("player.train")) return notyAPI.error("Камера на телефоне в поезде недоступна", 3000, true);
			
			mp.game.mobile.createMobilePhone(0);
			mp.game.mobile.cellCamActivate(true, true);
			mp.game.mobile.scriptIsMovingMobilePhoneOffscreen(false);
			hud_browser.execute('togglePhone();');
			mp.game.ui.displayRadar(false);
			hideHud = true;
			allowBinds = [];
			
			setTimeout(() => {
				mp.gui.cursor.visible = false;
				allowBinds = [0x26];
				cameraPhone = true;
				hud_browser.execute('togglePhoneCameraMode(true);');
			}, 1700);
		}else{
			mp.game.invoke("0x3BC861DF703E5097", false); // DESTROY_MOBILE_PHONE
			mp.game.mobile.cellCamActivate(false, false);
			mp.game.mobile.scriptIsMovingMobilePhoneOffscreen(true);
			
			cameraPhone = false;
			mp.game.ui.displayRadar(true);
			hideHud = false;
			hud_browser.execute('togglePhoneCameraMode(false);');
			phoneOff();
		}
	}
});

function makePhotoFromMobileCamera() {
	allowBinds = [];
	hud_browser.execute('togglePhoneCameraMode(false);');
	hud_browser.execute('playSound("mobileCameraTakePhoto", 0.2);');
	setTimeout(() => {
		if(typeof(mp.storage.data.phonegallery) === "undefined") {
			mp.storage.data.phonegallery = {"cur":1};
			mp.gui.takeScreenshot("gallery"+mp.storage.data.phonegallery.cur+".jpg", 0, 25, 100);
		}else{
			if(typeof(mp.storage.data.phonegallery.cur) !== "undefined") {
				if(mp.storage.data.phonegallery.cur < 20) {
					mp.storage.data.phonegallery.cur = mp.storage.data.phonegallery.cur + 1;
					mp.gui.takeScreenshot("gallery"+mp.storage.data.phonegallery.cur+".jpg", 0, 25, 100);
				}else{
					mp.storage.data.phonegallery.cur = 1;
					mp.gui.takeScreenshot("gallery"+mp.storage.data.phonegallery.cur+".jpg", 0, 25, 100);
				}
			}else{
				mp.storage.data.phonegallery.cur = 1;
				mp.gui.takeScreenshot("gallery"+mp.storage.data.phonegallery.cur+".jpg", 0, 25, 100);
			}
		}
		mp.game.graphics.startScreenEffect("MinigameTransitionOut", 1500, false);
		mp.game.graphics.startScreenEffect("HeistLocate", 1500, false);
		setTimeout(() => {
			hud_browser.execute('reloadPhoneGallery();');
		}, 500);
		setTimeout(() => {
			allowBinds = [0x26];
			hud_browser.execute('togglePhoneCameraMode(true);');
			makingPhotoWithCamera = false;
		}, 1000);
	}, 500);
	
}

// Gallery App
var phoneImageGallery = [];

mp.events.add("initPhoneGallery", (data) => {
	if(hud_browser && typeof(data) !== "undefined") {
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+data+"</span>");
		phoneImageGallery = JSON.parse(data);
		if(typeof(mp.storage.data.phonegallery) !== "undefined") {
			phoneImageGallery = phoneImageGallery.sort((b, a) => parseFloat(a.key) - parseFloat(b.key));
			if(typeof(mp.storage.data.phonegallery.cur) === "undefined") {
				if(Object.keys(phoneImageGallery).length > 0) mp.storage.data.phonegallery = {"cur":Object.keys(phoneImageGallery).length};
				else mp.storage.data.phonegallery = {"cur":1};
			}
		}else{
			phoneImageGallery = phoneImageGallery.sort((b, a) => parseFloat(a.key) - parseFloat(b.key));
			if(Object.keys(phoneImageGallery).length > 0) mp.storage.data.phonegallery = {"cur":Object.keys(phoneImageGallery).length};
			else mp.storage.data.phonegallery = {"cur":1};
		}
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(phoneImageGallery)+"</span>");
	}
});

mp.events.add("openGalleryPhone", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(Object.keys(phoneImageGallery).length > 0) hud_browser.execute('togglePhone(\'{"name":"gallery","activity":"phoneGalleryAppMain","photos":'+JSON.stringify(phoneImageGallery)+',"cur":'+mp.storage.data.phonegallery.cur+'}\');');
		else hud_browser.execute('togglePhone(\'{"name":"gallery","activity":"phoneGalleryAppEmpty"}\');');
	}
});

// SMS App

//setTimeout(() => mp.storage.data.dialogs = {}, 7000);

mp.events.add("openSMSPhone", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(typeof(mp.storage.data.dialogs) === "undefined") mp.storage.data.dialogs = {};
		
		for (var i in mp.storage.data.dialogs) {
			if(typeof(mp.storage.data.dialogs[i]) === "undefined") {
				mp.storage.data.dialogs[i] = undefined;
				mp.storage.data.dialogs = JSON.parse(JSON.stringify(mp.storage.data.dialogs));
			}else{
				if(typeof(mp.storage.data.dialogs[i].nick) === "undefined") {
					mp.storage.data.dialogs[i] = undefined;
					mp.storage.data.dialogs = JSON.parse(JSON.stringify(mp.storage.data.dialogs));
				}
			}
		}
		
		let tempDialogs = JSON.parse(JSON.stringify(mp.storage.data.dialogs));
		
		if(Object.keys(tempDialogs).length > 0) {
			mp.players.forEach(
				(player, id) => {
					if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined" && typeof(player.getVariable("player.status")) !== "undefined" && typeof(player.getVariable("player.blocks")) !== "undefined") {
						let tempPlayerID = player.getVariable("player.id").toString();
						if(typeof(tempDialogs[tempPlayerID]) !== "undefined") tempDialogs[tempPlayerID]["online"] = true;
					}
				}
			);
		}
		
		hud_browser.execute('togglePhone(\'{"name":"sms","activity":"phoneSMSAppMain","dialogs":'+JSON.stringify(tempDialogs)+'}\');');
		mp.storage.data.sms = 0;
	}
});

mp.events.add("deleteSMSDialog", (dialogID) => {
	if(typeof(dialogID) !== "undefined") {
		if(typeof(mp.storage.data.dialogs) !== "undefined") {
			if(typeof(mp.storage.data.dialogs[dialogID.toString()]) !== "undefined") {
				mp.storage.data.dialogs[dialogID.toString()] = undefined;
				mp.storage.data.dialogs = JSON.parse(JSON.stringify(mp.storage.data.dialogs));
			}
		}
	}
});

mp.events.add("createSMS", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(typeof(mp.storage.data.dialogs) === "undefined") mp.storage.data.dialogs = {};
		let onlinePlayers = [];
		mp.players.forEach(
			(player, id) => {
				if(player != localPlayer) {
					if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
						onlinePlayers.push({"id":player.getVariable('player.id'),"nick":player.getVariable('player.nick')});
					}
				}
			}
		);
		hud_browser.execute('togglePhone(\'{"name":"sms","activity":"phoneSMSAppCreate","players":'+JSON.stringify(onlinePlayers)+',"dialogs":'+JSON.stringify(mp.storage.data.dialogs)+'}\');');
	}
});

// openSMSDialog

mp.events.add("openSMSDialog", (tempData, isFast) => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && tempData && hud_browser) {
		if(typeof(mp.storage.data.dialogs) !== "undefined") {
			let JSONTempData = JSON.parse(tempData);
			if(typeof(JSONTempData.id) !== "undefined") {
				if(typeof(mp.storage.data.dialogs[JSONTempData.id.toString()]) !== "undefined") mp.storage.data.dialogs[JSONTempData.id.toString()]["readed"] = 1;
			}
		}
		if(!isFast) {
			hud_browser.execute('togglePhone(\'{"name":"sms","activity":"phoneSMSAppDialog","title":'+tempData+',"myID":'+localPlayer.getVariable('player.id')+',"myNICK":"'+localPlayer.getVariable('player.nick')+'"}\');');
		}else{
			hud_browser.execute('togglePhone(\'{"name":"sms","activity":"phoneSMSAppDialog","title":'+tempData+',"myID":'+localPlayer.getVariable('player.id')+',"myNICK":"'+localPlayer.getVariable('player.nick')+'","fast":true}\');');
			/*if(isFast == "tabletAdSMS") {
				mobilePhone = true;
				allowBinds = [0x26, 0x28];
			}*/
		}
	}
});

mp.events.add("sendSMS", (tempData, SMSText) => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && tempData && SMSText) {
		tempData = JSON.parse(tempData);
		
		let isFinded = false;
		
		if(typeof(tempData.nick) !== "undefined") {
			mp.players.forEach(
				(player, id) => {
					if(typeof(player.getVariable("player.nick")) !== "undefined") {
						if(player.getVariable("player.nick") == tempData.nick) isFinded = player;
					}
				}
			);
		}
		
		if(isFinded) mp.events.callRemote("sendSMS", isFinded, JSON.stringify(tempData), SMSText);
		if(hud_browser) hud_browser.execute('enableSMSInput(true);playSound("sendSMS", 0.2);');
		
		if(typeof(mp.storage.data.dialogs) === "undefined") {
			mp.storage.data.dialogs = {};
			mp.storage.data.dialogs[tempData.id.toString()] = tempData.nick;
		}else{
			if(typeof(mp.storage.data.dialogs[tempData.id.toString()]) === "undefined") {
				mp.storage.data.dialogs[tempData.id.toString()] = {"nick":tempData.nick,"readed":1};
			}else{
				if(Object.keys(mp.storage.data.dialogs).length > 50) {
					mp.storage.data.dialogs = Object.keys(mp.storage.data.dialogs).slice(1).reduce((result, key) => {
						result[key] = mp.storage.data.dialogs[key];
						return result;
					}, {});
				}
				if(typeof(mp.storage.data.dialogs[tempData.id.toString()]) !== "undefined") {
					if(typeof(mp.storage.data.dialogs[tempData.id.toString()].readed) !== "undefined") mp.storage.data.dialogs[tempData.id.toString()].readed = 1;
				}
			}
		}
	}
});

var fastOpenSMS = false, fastOpenSMSTimer = false;

mp.events.add("reciveSMS", (senderID, senderNick, nickANDid, SMSText) => {
	if(typeof(senderID) !== "undefined" && typeof(senderNick) !== "undefined" && typeof(nickANDid) !== "undefined" && typeof(SMSText) !== "undefined") {
		let SMSTextShort = SMSText;
		if(SMSTextShort.length >= 80) SMSTextShort = SMSTextShort.slice(0, 80);
		if(!mp.storage.data.settings.airMode) mp.game.ui.notifications.showSMS("Новое СМС [наж. Е]", senderNick+" ("+senderID+")", SMSTextShort, "CHAR_BIKESITE", 1, false, 1, 2);
		if(hud_browser) hud_browser.execute('SMSRecived(\'{"mestext":"'+SMSText+'","sender":{"id":"'+senderID+'","nick":"'+senderNick+'"}}\');');
		if(typeof(mp.storage.data.dialogs) === "undefined") {
			mp.storage.data.dialogs = {};
			mp.storage.data.dialogs[senderID.toString()] = {"nick":senderNick,"readed":0};
		}else{
			if(typeof(mp.storage.data.dialogs[senderID.toString()]) === "undefined") {
				if(Object.keys(mp.storage.data.dialogs).length > 50) {
					mp.storage.data.dialogs = Object.keys(mp.storage.data.dialogs).slice(1).reduce((result, key) => {
						result[key] = mp.storage.data.dialogs[key];
						return result;
					}, {});
				}
				mp.storage.data.dialogs[senderID.toString()] = {"nick":senderNick,"readed":0};
			}else{
				mp.storage.data.dialogs[senderID.toString()].readed = 0;
			}
		}
		if(fastOpenSMSTimer) {
			clearTimeout(fastOpenSMSTimer);
			fastOpenSMSTimer = false;
		}
		fastOpenSMSTimer = setTimeout(() => { if(fastOpenSMS) fastOpenSMS = false; }, 5000);
		
		fastOpenSMS = JSON.stringify({"id":senderID,"nick":senderNick});
		mp.storage.data.sms = mp.storage.data.sms + 1;
	}
});

function fastOpenSMSFunc() {
	if(fastOpenSMS) {
		if(hud_browser) {
			if(!mobilePhone) {
				mobilePhone = true;
				localPlayer.taskUseMobilePhone(0);
				let JSONTempData = JSON.parse(fastOpenSMS);
				if(typeof(JSONTempData.id) !== "undefined") {
					if(typeof(mp.storage.data.dialogs[JSONTempData.id.toString()]) !== "undefined") mp.storage.data.dialogs[JSONTempData.id.toString()]["readed"] = 1;
				}
				hud_browser.execute('togglePhone(\'{"name":"sms","activity":"phoneSMSAppDialog","fast":true,"title":'+fastOpenSMS+',"myID":'+localPlayer.getVariable('player.id')+',"myNICK":"'+localPlayer.getVariable('player.nick')+'"}\');');
				mp.gui.cursor.visible = true;
				allowBinds = [0x26];
				mp.storage.data.sms = mp.storage.data.sms - 1;
			}
		}
		if(fastOpenSMSTimer) {
			clearTimeout(fastOpenSMSTimer);
			fastOpenSMSTimer = false;
		}
		fastOpenSMS = false;
	}
}

// Airmode App

mp.events.add("openAirmodePhone", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(typeof(mp.storage.data.settings.airMode) === "undefined") mp.storage.data.settings.airMode = false;
		hud_browser.execute('togglePhone(\'{"name":"airmode","toggled":'+mp.storage.data.settings.airMode+'}\');');
	}
});

mp.events.add("toggleAirMode", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(mp.storage.data.settings.airMode) mp.game.ui.messages.showMidsized("~r~Авиа ~w~режим", "~s~Выключаем режим полёта (телефонную связь)..");
		else mp.game.ui.messages.showMidsized("~g~Авиа ~w~режим", "~s~Включаем режим полёта (телефонную связь)..");
		
		mp.storage.data.settings.airMode = !mp.storage.data.settings.airMode;
		
		hud_browser.execute("togglePhone();");
		mp.gui.cursor.visible = false;
		restoreBinds();
		mobilePhone = false;
	}
});

// PASSIVE App

var afPassive = Date.now();

mp.events.add("openPassivePhone", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.passive")) !== "undefined") {
		hud_browser.execute('togglePhone(\'{"name":"passive","toggled":'+localPlayer.getVariable("player.passive")+'}\');');
	}
});

mp.events.add("togglePassive", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.passive")) !== "undefined") {
		if(typeof(localPlayer.getVariable('player.fraction')) !== "undefined") {
			let myFraction = localPlayer.getVariable('player.fraction');
			if(typeof(myFraction.name) !== "undefined") {
				if(myFraction.name == "ПОЛИЦИЯ") return hud_browser.execute('togglePhone(\'{"name":"passive","toggled":'+localPlayer.getVariable("player.passive")+',"error":"Полицейским недоступно"}\');');
			}
		}
		
		if(slotInUse != "0") return hud_browser.execute('togglePhone(\'{"name":"passive","toggled":'+localPlayer.getVariable("player.passive")+',"error":"Уберите оружее"}\');');
		
		if(localPlayer.vehicle) {
			let theVeh = localPlayer.vehicle;
			if(typeof(theVeh.getVariable("veh.theft")) !== "undefined" || typeof(theVeh.getVariable("veh.grabTruck")) !== "undefined") return hud_browser.execute('togglePhone(\'{"name":"passive","toggled":'+localPlayer.getVariable("player.passive")+',"error":"В этом транспорте нельзя"}\');');
		}
		
		if(Date.now() - afPassive < 30000) return hud_browser.execute('togglePhone(\'{"name":"passive","toggled":'+localPlayer.getVariable("player.passive")+',"error":"Подождите, раз в 30 сек."}\');');;
		if(imInZZ) return hud_browser.execute('togglePhone(\'{"name":"passive","toggled":'+localPlayer.getVariable("player.passive")+',"error":"Вы в зелёной зоне"}\');');
		if(imInZone) return hud_browser.execute('togglePhone(\'{"name":"passive","toggled":'+localPlayer.getVariable("player.passive")+',"error":"Вы в опасной зоне"}\');');
		
		if(typeof(localPlayer.getVariable("player.passive")) !== "undefined") {
			let myFraction = localPlayer.getVariable("player.fraction");
			for (var i in clanZones) {
				let tempZone = clanZones[i];
				if(typeof(tempZone.war.id) !== "undefined") {
					if(tempZone.own.id == myFraction.id || tempZone.war.id == myFraction.id) return hud_browser.execute('togglePhone(\'{"name":"passive","toggled":'+localPlayer.getVariable("player.passive")+',"error":"Не сейчас, капт"}\');');
				}
			}
		}
		
		afPassive = Date.now();
		mp.events.callRemote('togglePassive');
		
		if(localPlayer.getVariable("player.passive")) mp.game.ui.messages.showMidsized("~r~Пассивный ~w~режим", "~s~Выключаем пассивный режим..");
		else mp.game.ui.messages.showMidsized("~g~Пассивный ~w~режим", "~s~Включаем пассивный режим..");
		
		hud_browser.execute("togglePhone();");
		mp.gui.cursor.visible = false;
		restoreBinds();
		mobilePhone = false;
	}
});

// SETTINGS App

function initGameSettings() {
	if(typeof(mp.storage.data.settings) === "undefined") mp.storage.data.settings = {};
	if(typeof(mp.storage.data.settings.walkStyle) === "undefined") mp.storage.data.settings.walkStyle = "stock";
	if(typeof(mp.storage.data.settings.graphs) === "undefined") mp.storage.data.settings.graphs = {"up":"None"};
	if(typeof(mp.storage.data.settings.deforms) === "undefined") mp.storage.data.settings.deforms = "Stock";
	//if(typeof(mp.storage.data.settings.voice) === "undefined") mp.storage.data.settings.voice = true;
	mp.storage.data.settings.voice = true;
	if(typeof(mp.storage.data.settings.radioInWorld) === "undefined") mp.storage.data.settings.radioInWorld = true;
	if(typeof(mp.storage.data.settings.wheelSmoke) === "undefined") mp.storage.data.settings.wheelSmoke = false;
	if(typeof(mp.storage.data.settings.airMode) === "undefined") mp.storage.data.settings.airMode = false;
	
	//mp.storage.data.dialogs = {};
	
	if(mp.storage.data.settings.walkStyle != "stock") {
		if(!mp.game.streaming.hasClipSetLoaded(mp.storage.data.settings.walkStyle)) {
			mp.game.streaming.requestClipSet(mp.storage.data.settings.walkStyle);
			//while(!mp.game.streaming.hasClipSetLoaded(mp.storage.data.settings.walkStyle)) localPlayer.setMovementClipset(mp.storage.data.settings.walkStyle, 0.25);
			setTimeout(() => { localPlayer.setMovementClipset(mp.storage.data.settings.walkStyle, 0.25); }, 1500);
		}
		localPlayer.setMovementClipset(mp.storage.data.settings.walkStyle, 0.25);
	}else{
		localPlayer.resetMovementClipset(0.25);
	}
	
	let upGraphics = mp.storage.data.settings.graphs.up;
	
	mp.game.graphics.stopScreenEffect("BikerFormation");
	mp.game.graphics.stopScreenEffect("DeadlineNeon");
	mp.game.graphics.stopScreenEffect("InchPickup");
	mp.game.graphics.stopScreenEffect("pennedIn");
	mp.game.graphics.stopScreenEffect("PPGreen");
	mp.game.graphics.stopScreenEffect("PPOrange");
	mp.game.graphics.stopScreenEffect("PPPink");
	mp.game.graphics.stopScreenEffect("PPPurple");
	mp.game.graphics.stopScreenEffect("TinyRacerIntroCam");
	
	if(upGraphics != "None") mp.game.graphics.startScreenEffect(upGraphics, 0, true);
	
	let deforms = mp.storage.data.settings.deforms;
	if(deforms == "Stock") {
		mp.vehicles.forEachInStreamRange(
			(vehicle, id) => {
				vehicle.setHandling("FDEFORMATIONDAMAGEMULT", 0.7);
			}
		);
	}else if(deforms == "Middle") {
		mp.vehicles.forEachInStreamRange(
			(vehicle, id) => {
				vehicle.setHandling("FDEFORMATIONDAMAGEMULT", 3.5);
			}
		);
	}else if(deforms == "Hard") {
		mp.vehicles.forEachInStreamRange(
			(vehicle, id) => {
				vehicle.setHandling("FDEFORMATIONDAMAGEMULT", 6.5);
			}
		);
	}else if(deforms == "BEAMng") {
		mp.vehicles.forEachInStreamRange(
			(vehicle, id) => {
				vehicle.setHandling("FDEFORMATIONDAMAGEMULT", 9.9);
			}
		);
	}
	
	let voiceChatSetting = mp.storage.data.settings.voice;
	toggleVoiceChat(voiceChatSetting);
	
	let radioInWorldSetting = mp.storage.data.settings.radioInWorld;
	toggleRadioInWorld(radioInWorldSetting);
}

mp.events.add("openSettingsPhone", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(mp.storage.data.settings) !== "undefined") {
		hud_browser.execute('togglePhone(\'{"name":"settings","settings":'+JSON.stringify(mp.storage.data.settings)+'}\');');
	}
});

mp.events.add("setPhoneGraphics", (typeChange, newValue) => {
	if(typeof(typeChange) !== "undefined" && typeof(newValue) !== "undefined") {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
			mp.game.ui.messages.showMidsized("~g~Изменения ~w~графики", "~s~Вы изменили графические настройки через телефон");
			if(typeChange == "up") mp.storage.data.settings.graphs.up = newValue;
			initGameSettings();
		}
	}
});

mp.events.add("setDeformations", (newValue) => {
	if(typeof(newValue) !== "undefined") {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
			mp.game.ui.messages.showMidsized("~g~Изменения ~w~разрушаемости", "~s~Вы изменили разрушаемость транспорта через телефон");
			mp.storage.data.settings.deforms = newValue;
			initGameSettings();
		}
	}
});

mp.events.add("restartVoiceChat", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		mp.game.ui.messages.showMidsized("~g~Голосовой ~w~чат", "~s~Вы перезагрузили голосовой чат через телефон");
		restartVoiceChat();
		hud_browser.execute("togglePhone();");
		mp.gui.cursor.visible = false;
		restoreBinds();
		mobilePhone = false;
	}
});

mp.events.add("toggleVoiceChat", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(voiceChatEnabled) {
			mp.game.ui.messages.showMidsized("~r~Голосовой ~w~чат", "~s~Вы отключили голосовой чат через телефон");
			mp.storage.data.settings.voice = false;
			toggleVoiceChat(false);
		}else{
			mp.game.ui.messages.showMidsized("~g~Голосовой ~w~чат", "~s~Вы включили голосовой чат через телефон");
			mp.storage.data.settings.voice = true;
			toggleVoiceChat(true);
		}
		hud_browser.execute("togglePhone();");
		mp.gui.cursor.visible = false;
		restoreBinds();
		mobilePhone = false;
	}
});

mp.events.add("toggleWheelSmoke", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(typeof(mp.storage.data.settings.wheelSmoke) !== "undefined") {
			if(mp.storage.data.settings.wheelSmoke) {
				mp.game.ui.messages.showMidsized("~r~Кастомный ~w~дым покрышек", "~s~Вы отключили улучшенный дым покрышек через телефон");
				mp.storage.data.settings.wheelSmoke = false;
			}else{
				mp.game.ui.messages.showMidsized("~g~Кастомный ~w~дым покрышек", "~s~Вы включили улучшенный дым покрышек через телефон");
				mp.storage.data.settings.wheelSmoke = true;
			}
		}else{
			mp.game.ui.messages.showMidsized("~g~Кастомный ~w~дым покрышек", "~s~Вы включили улучшенный дым покрышек через телефон");
			mp.storage.data.settings.wheelSmoke = true;
		}
		hud_browser.execute("togglePhone();");
		mp.gui.cursor.visible = false;
		restoreBinds();
		mobilePhone = false;
	}
});

mp.events.add("toggleRadioInWorld", () => {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(radioInWorldEnabled) {
			mp.game.ui.messages.showMidsized("~r~Радио ~w~окружающего транспорта", "~s~Вы отключили радио транспорта через телефон");
			mp.storage.data.settings.radioInWorld = false;
			toggleRadioInWorld(false);
		}else{
			mp.game.ui.messages.showMidsized("~g~Радио ~w~окружающего транспорта", "~s~Вы включили радио транспорта через телефон");
			mp.storage.data.settings.radioInWorld = true;
			toggleRadioInWorld(true);
		}
		hud_browser.execute("togglePhone();");
		mp.gui.cursor.visible = false;
		restoreBinds();
		mobilePhone = false;
	}
});

// REPORT App

mp.events.add("sendReport", (reportObj, reportText) => {
	if(hud_browser) {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
			if(Date.now() - afReport < 60000) return hud_browser.execute('togglePhone(\'{"name":"report","error":"Доступно раз в минуту"}\');');
			afReport = Date.now();
			
			mp.events.callRemote('sendReport', reportObj.toString(), reportText.toString());
		}else{
			if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
			hud_browser.execute("togglePhone();");
			mp.gui.cursor.visible = false;
			restoreBinds();
			mobilePhone = false;
		}
	}
});

mp.events.add("reportSended", () => {
	if(hud_browser && mobilePhone) {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined") return hud_browser.execute('togglePhone(\'{"name":"report","activity":"phoneReportAppSuccess"}\');');
	}
});

// KILL App

mp.events.add("killMe", () => {
	if(hud_browser) {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
			if(localPlayer.isDead()) return false;
			if(localPlayer.vehicle || localPlayer.getVariable("player.train")) return hud_browser.execute('togglePhone(\'{"name":"kill","error":"Вы в транспорте"}\');');
			
			mp.events.call("sleepAntiCheat");
			let hp = localPlayer.getHealth();
			
			if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
				let myFraction = localPlayer.getVariable("player.fraction");
				for (var i in clanZones) {
					let tempZone = clanZones[i];
					if(typeof(tempZone.war.id) !== "undefined") {
						if(tempZone.own.id == myFraction.id || tempZone.war.id == myFraction.id) return hud_browser.execute('togglePhone(\'{"name":"kill","error":"Не сейчас, капт"}\');');
					}
				}
			}
			
			if(hp > 1) mp.events.callRemote('killMe');
			
			if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
			hud_browser.execute("togglePhone();");
			mp.gui.cursor.visible = false;
			restoreBinds();
			mobilePhone = false;
		}else{
			if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
			hud_browser.execute("togglePhone();");
			mp.gui.cursor.visible = false;
			restoreBinds();
			mobilePhone = false;
		}
	}
});

// SECURE App

var afSecureApp = Date.now();
mp.events.add("changePassword", (oldPass, newPass) => {
	if(hud_browser) {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
			if(Date.now() - afSecureApp < 2000) return hud_browser.execute('togglePhone(\'{"name":"secure","error":"Слишком частые попытки"}\');');
			
			if(typeof(oldPass) === "undefined" || typeof(newPass) === "undefined") return hud_browser.execute('togglePhone(\'{"name":"secure","error":"Вы не ввели пароли"}\');');
			
			var regex = new RegExp("^[a-zA-Z0-9]+$");
		
			if(!oldPass || oldPass.length < 6 || oldPass.length > 16) return hud_browser.execute('togglePhone(\'{"name":"secure","error":"Старый пароль может быть от 6ти до 16ти симв."}\');');
			if(!newPass || newPass.length < 6 || newPass.length > 16) return hud_browser.execute('togglePhone(\'{"name":"secure","error":"Новый пароль может быть от 6ти до 16ти симв."}\');');
			
			if(!regex.test(oldPass)) return hud_browser.execute('togglePhone(\'{"name":"secure","error":"Старый пароль может содерж. только лат. буквы и цифры"}\');');
			if(!regex.test(newPass)) return hud_browser.execute('togglePhone(\'{"name":"secure","error":"Новый пароль может содерж. только лат. буквы и цифры"}\');');
			
			allowBinds = [];
			
			afSecureApp = Date.now();
			
			mp.events.callRemote('changePassword', oldPass, newPass);
		}else{
			return hud_browser.execute('togglePhone(\'{"name":"secure","error":"Аккаунт не инициализирован"}\');');
		}
	}
});

mp.events.add("changePassResult", (result, reasonOrPass) => {
	if(hud_browser) {
		if(typeof(result) !== "undefined" && typeof(reasonOrPass) !== "undefined") {
			if(result) {
				chatAPI.notifyPush(" * ОБРАТИТЕ ВНИМАНИЕ! Вы успешно <span style=\"color:#FEBC00\"><b>изменили свой пароль</b></span>!");
				chatAPI.notifyPush(" * Новый пароль для входа в аккаунт: <span style=\"color:#FEBC00\"><b>"+reasonOrPass+"</b></span>");
				chatAPI.notifyPush(" * Очень важно! Запишите его, <span style=\"color:#FEBC00\"><b>что бы не забыть</b></span>!");
				mp.game.ui.messages.showMidsizedShard("~w~Вы изменили ~y~пароль ~w~для входа", "~s~Ваш новый пароль "+reasonOrPass+" , запишите его!", 5, false, true, 8000);
				
				if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
				hud_browser.execute("togglePhone();");
				mp.gui.cursor.visible = false;
				restoreBinds();
				mobilePhone = false;
			}else{
				allowBinds = [0x26];
				hud_browser.execute('togglePhone(\'{"name":"secure","error":"'+reasonOrPass+'"}\');');
			}
		}else{
			chatAPI.errorPush(" * При смене пароля произошла ошибка: <b>"+reasonOrPass+"</b>");
			notyAPI.error("Произошла ошибка: <b>"+reasonOrPass+"</b>.", 3000, true);
			
			if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
			hud_browser.execute("togglePhone();");
			mp.gui.cursor.visible = false;
			restoreBinds();
			mobilePhone = false;
		}
	}
});

// Premium App

mp.events.add("openPremiumPhone", () => {
	if(hud_browser) {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
			let myBlocks = localPlayer.getVariable("player.blocks");
			let premiumStatus = false, premiumExp = false;
			if(typeof(myBlocks.premium) !== "undefined") {
				if(typeof(myBlocks.premium) !== "undefined") {
					premiumStatus = true;
					let dateFormater = moment.duration(moment(myBlocks.premium).diff(moment(new Date(curYear+"-"+curMonth+"-"+curDay+" "+curHours+":"+curMinutes+":"+curSeconds),"DD-MM-YYYY HH:mm:ss")));
					if(dateFormater.days() > 0) premiumExp = dateFormater.days() + ' дн. ' + dateFormater.hours() + ' ч. ' + dateFormater.minutes() + ' мин.';
					else if(dateFormater.hours() > 0) premiumExp = dateFormater.hours() + ' ч. ' + dateFormater.minutes() + ' мин.';
					else if(dateFormater.minutes() > 0) premiumExp = dateFormater.minutes() + ' мин.';
				}
			}
			hud_browser.execute('togglePhone(\'{"name":"premium","premiumStatus":'+premiumStatus+',"premiumExp":"'+premiumExp+'"}\');');
		}
	}
});

// Level App

mp.events.add("openLevelPhone", () => {
	if(hud_browser) {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
			let myBlocks = localPlayer.getVariable("player.blocks");
			let nextLevelCost = 99999999, nextLevelExp = 9999;
			if(typeof(myBlocks.lvl) !== "undefined") {
				nextLevelCost = 40000 * (myBlocks.lvl + 1);
				nextLevelExp = 120 * (myBlocks.lvl + 1);
			}else{
				return false;
			}
			hud_browser.execute('togglePhone(\'{"name":"level","activity":"phoneLevelAppMain","blocks":'+JSON.stringify(localPlayer.getVariable("player.blocks"))+',"nextLVLcost":'+nextLevelCost+',"nextLVLexp":'+nextLevelExp+'}\');');
		}
	}
});

var afMakeLevelUp = Date.now();
mp.events.add("makeLevelUp", () => {
	if(hud_browser) {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.blocks")) !== "undefined" && typeof(localPlayer.getVariable("player.money")) !== "undefined") {
			if(Date.now() - afMakeLevelUp < 3000) return hud_browser.execute('togglePhone(\'{"name":"level","activity":"phoneLevelAppMain","error":"Подождите 3 сек."}\');');
			
			let myBlocks = localPlayer.getVariable("player.blocks");
			let nextLevelCost = 99999999, nextLevelExp = 9999;
			if(typeof(myBlocks.lvl) !== "undefined") {
				nextLevelCost = 40000 * (myBlocks.lvl + 1);
				nextLevelExp = 120 * (myBlocks.lvl + 1);
				
				if(parseInt(myBlocks.lvlexp) < nextLevelExp) return hud_browser.execute('togglePhone(\'{"name":"level","activity":"phoneLevelAppMain","error":"Недостаточно опыта"}\');');
				if(parseInt(localPlayer.getVariable("player.money")) < nextLevelCost) return hud_browser.execute('togglePhone(\'{"name":"level","activity":"phoneLevelAppMain","error":"Недостаточно средств"}\');');
				
				afMakeLevelUp = Date.now();
				
				mp.events.callRemote('makeLevelUp');
			}else{
				return hud_browser.execute('togglePhone(\'{"name":"level","activity":"phoneLevelAppMain","error":"Аккаунт не инициализирован"}\');');
			}
		}
	}
});

function updateRankBar(limit, nextLimit, previousXP, currentXP, currentLvl) {
	if (!mp.game.graphics.hasHudScaleformLoaded(19)) {
		mp.game.graphics.requestHudScaleform(19);
		while(!mp.game.graphics.hasHudScaleformLoaded(19)) mp.game.wait(0);

		mp.game.graphics.pushScaleformMovieFunctionFromHudComponent(19, "SET_COLOUR");
		mp.game.graphics.pushScaleformMovieFunctionParameterInt(116);
		mp.game.graphics.popScaleformMovieFunctionVoid();
	}

	mp.game.graphics.pushScaleformMovieFunctionFromHudComponent(19, "SET_RANK_SCORES");
	mp.game.graphics.pushScaleformMovieFunctionParameterInt(limit);
	mp.game.graphics.pushScaleformMovieFunctionParameterInt(nextLimit);
	mp.game.graphics.pushScaleformMovieFunctionParameterInt(previousXP);
	mp.game.graphics.pushScaleformMovieFunctionParameterInt(currentXP);
	mp.game.graphics.pushScaleformMovieFunctionParameterInt(currentLvl);
	mp.game.graphics.popScaleformMovieFunctionVoid();
}

mp.events.add("makeLevelUpped", (result, newLevelOrReason, nextLevelExp, nextLevelCost) => {
	if(hud_browser) {
		if(typeof(result) !== "undefined" && typeof(newLevelOrReason) !== "undefined") {
			if(result) {
				if(typeof(nextLevelExp) !== "undefined" && typeof(nextLevelCost) !== "undefined") {
					updateRankBar(0,nextLevelExp,0,nextLevelExp,newLevelOrReason-1);
					return hud_browser.execute('togglePhone(\'{"name":"level","activity":"phoneLevelAppUpped","phoneNewLvl":'+newLevelOrReason+',"newLVLcost":'+nextLevelCost+',"newLVLexp":'+nextLevelExp+'}\');');
				}else{
					return hud_browser.execute('togglePhone(\'{"name":"level","activity":"phoneLevelAppMain","error":"Неизвестная ошибка"}\');');
				}
			}else{
				return hud_browser.execute('togglePhone(\'{"name":"level","activity":"phoneLevelAppMain","error":"'+newLevelOrReason+'"}\');');
			}
		}
	}
});

// TAXI App
var taxiCall = false;
var taxiStartPos = {"x":0, "y":0, "z":0};
var taxiFinishPos = {"x":0, "y":0, "z":0};

mp.events.add("openTaxiApp", () => {
	if(!taxiCall && parseFloat(taxiFinishPos.x) == 0 && parseFloat(taxiFinishPos.y) == 0 && parseFloat(taxiFinishPos.z) == 0) {
		if(hud_browser) {
			if(typeof(localPlayer.getVariable("player.job")) !== "undefined") {
				let jobData = localPlayer.getVariable("player.job");
				if(jobData.name == "taxi" && parseInt(jobData.work) == 1) hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppDisabled"}\');');
				else hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppMain"}\');');
			}else{
				hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppDisabled"}\');');
			}
		}
	}else{
		if(mp.game.invoke('0x1DD1F58F493F1DA5')) {
			if(!taxiCall && parseFloat(taxiFinishPos.x) != 0 && parseFloat(taxiFinishPos.y) != 0 && parseFloat(taxiFinishPos.z) != 0) {
				let realZoneName = "San Andreas";
				
				let zoneName = mp.game.zone.getNameOfZone(taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z);
				if(zoneNamesShort.includes(zoneName)) {
					let zoneID = zoneNamesShort.indexOf(zoneName);
					realZoneName = zoneNames[zoneID];
				}
				
				let getStreet = mp.game.pathfind.getStreetNameAtCoord(taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, 0, 0);
				let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
				
				let cost = 0;
				let distToPoint = mp.game.gameplay.getDistanceBetweenCoords(taxiStartPos.x, taxiStartPos.y, taxiStartPos.z, taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, true);
				distToPoint = roundNumber(distToPoint/1000, 1);
				cost = roundNumber(6550 * distToPoint, 0) + (roundNumber(6550 * distToPoint, 0) * 0.05);
				
				if(hud_browser) hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppConfirm", "address":"'+realZoneName+', '+street+'", "cost":"'+cost+'"}\');');
			}else if(taxiCall) {
				let realZoneName = "San Andreas";
				
				let zoneName = mp.game.zone.getNameOfZone(taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z);
				if(zoneNamesShort.includes(zoneName)) {
					let zoneID = zoneNamesShort.indexOf(zoneName);
					realZoneName = zoneNames[zoneID];
				}
				
				let getStreet = mp.game.pathfind.getStreetNameAtCoord(taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, 0, 0);
				let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
				
				let cost = 0;
				let distToPoint = mp.game.gameplay.getDistanceBetweenCoords(taxiStartPos.x, taxiStartPos.y, taxiStartPos.z, taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, true);
				distToPoint = roundNumber(distToPoint/1000, 1);
				cost = roundNumber(6550 * distToPoint, 0) + (roundNumber(6550 * distToPoint, 0) * 0.05);
				
				if(hud_browser) hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppWait", "address":"'+realZoneName+', '+street+'", "cost":"'+cost+'"}\');');
			}
		}else{
			let realZoneName = "San Andreas";
			
			let zoneName = mp.game.zone.getNameOfZone(taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z);
			if(zoneNamesShort.includes(zoneName)) {
				let zoneID = zoneNamesShort.indexOf(zoneName);
				realZoneName = zoneNames[zoneID];
			}
			
			let getStreet = mp.game.pathfind.getStreetNameAtCoord(taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, 0, 0);
			let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
			
			let cost = 0;
			let distToPoint = mp.game.gameplay.getDistanceBetweenCoords(taxiStartPos.x, taxiStartPos.y, taxiStartPos.z, taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, true);
			distToPoint = roundNumber(distToPoint/1000, 1);
			cost = roundNumber(6550 * distToPoint, 0) + (roundNumber(6550 * distToPoint, 0) * 0.05);
				
			if(hud_browser) hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppMain", "address":"'+realZoneName+', '+street+'", "cost":"'+cost+'"}\');');
			taxiStartPos = {"x":0, "y":0, "z":0};
			taxiFinishPos = {"x":0, "y":0, "z":0};
		}
	}
});

mp.events.add("taxiCalled", (result) => {
	if(result) {
		if(result == "ok" && parseFloat(taxiStartPos.x) != 0 && parseFloat(taxiStartPos.y) != 0 && parseFloat(taxiStartPos.z) != 0 && parseFloat(taxiFinishPos.x) != 0 && parseFloat(taxiFinishPos.y) != 0 && parseFloat(taxiFinishPos.z) != 0) {
			taxiCall = true;
			
			let realZoneName = "San Andreas";
			
			let zoneName = mp.game.zone.getNameOfZone(taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z);
			if(zoneNamesShort.includes(zoneName)) {
				let zoneID = zoneNamesShort.indexOf(zoneName);
				realZoneName = zoneNames[zoneID];
			}
			
			let getStreet = mp.game.pathfind.getStreetNameAtCoord(taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, 0, 0);
			let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
			
			let cost = 0;
			let distToPoint = mp.game.gameplay.getDistanceBetweenCoords(taxiStartPos.x, taxiStartPos.y, taxiStartPos.z, taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, true);
			distToPoint = roundNumber(distToPoint/1000, 1);
			cost = roundNumber(6550 * distToPoint, 0) + (roundNumber(6550 * distToPoint, 0) * 0.05);
			
			mp.game.ui.messages.showMidsized("~g~Вы вызвали ~s~такси", "~s~благодарим за использование сервиса");
			mp.game.ui.notifications.showWithPicture("Такси SMOTRArage", "Вы вызвали такси", "Не покидайте это место, иначе заказ отменится.", "CHAR_TAXI", 1, false, 1, 2);
			
			let myPos = localPlayer.position;
			taxiCallCheckpoint = mp.checkpoints.new(0, new mp.Vector3(myPos.x, myPos.y, myPos.z-5), 30,
			{
				color: [255, 255, 255, 0],
				visible: true,
				dimension: 0
			});
			
			if(hud_browser) hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppWait", "address":"'+realZoneName+', '+street+'", "cost":"'+cost+'"}\');');
		}else{
			if(hud_browser) hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppMain"}\');');
		}
	}else{
		if(hud_browser) hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppMain"}\');');
	}
});

mp.events.add("youTaxiCallAccepted", (driverID) => {
	if(driverID) taxiCall = driverID;
	mp.game.ui.messages.showMidsized("~g~Ваш вызов такси ~s~принят", "~s~Пожалуйста, не покидайте позицию вызова\nТаксист уже в пути, ожидайте!");
	mp.game.ui.notifications.showWithPicture("Такси SMOTRArage", "Вызов принят", "Таксист неподалёку принял Ваш вызов.", "CHAR_TAXI", 1, false, 1, 2);
});

mp.events.add("youTaxiCallCanceled", () => {
	mp.game.ui.messages.showMidsized("~r~Ваш вызов такси ~s~отменён таксистом", "~s~Таксист не смог Вас найти\nОжидайте, пока другой таксист примит Ваш заказ.");
	mp.game.ui.notifications.showWithPicture("Такси SMOTRArage", "Вызов отменён", "Таксист отменил поездку к Вам.", "CHAR_TAXI", 1, false, 1, 2);
});

mp.events.add("youTaxiCallFullCanceled", () => {
	mp.game.ui.messages.showMidsized("~r~Ваш вызов такси ~s~отменён таксистом", "~s~Таксист вышел из игры или погиб\nВызовите такси заново.");
	mp.game.ui.notifications.showWithPicture("Такси SMOTRArage", "Вызов отменён", "Таксист отменил поездку к Вам.", "CHAR_TAXI", 1, false, 1, 2);
	
	taxiCall = false;
	taxiStartPos = {"x":0, "y":0, "z":0};
	taxiFinishPos = {"x":0, "y":0, "z":0};
	
	mp.game.invoke('0xA7E4E2D361C2627F');
	
	if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
	hud_browser.execute("togglePhone();");
	mp.gui.cursor.visible = false;
	restoreBinds();
	mobilePhone = false;
	
	if(taxiCallCheckpoint) taxiCallCheckpoint.destroy();
	taxiCallCheckpoint = false;
});

mp.events.add("callTaxi", () => {
	if(parseFloat(taxiStartPos.x) != 0 && parseFloat(taxiStartPos.y) != 0 && parseFloat(taxiStartPos.z) != 0 && parseFloat(taxiFinishPos.x) != 0 && parseFloat(taxiFinishPos.y) != 0 && parseFloat(taxiFinishPos.z) != 0) {
		if(typeof(localPlayer.getVariable("player.money")) === "undefined") {
			mp.game.ui.messages.showMidsized("~r~Недостаточно ~s~средств", "~s~у Вас не хватило денег для вызова такси");
			return phoneOff();
		}
		
		let myMoney = parseInt(localPlayer.getVariable("player.money"));
		let cost = 0;
		let distToPoint = mp.game.gameplay.getDistanceBetweenCoords(taxiStartPos.x, taxiStartPos.y, taxiStartPos.z, taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z, true);
		distToPoint = roundNumber(distToPoint/1000, 1);
		cost = roundNumber(6550 * distToPoint, 0) + (roundNumber(6550 * distToPoint, 0) * 0.05);
		
		if(distToPoint < 1.2) {
			mp.game.ui.messages.showMidsized("~r~Слишком ~s~близко", "~s~Вы не можете вызвать такси на такое маленькое расстояние, повторите попытку установив waypoint по-дальше..");
			return phoneOff();
		}
		
		if(myMoney < cost) {
			mp.game.ui.messages.showMidsized("~r~Недостаточно ~s~средств", "~s~у Вас не хватило денег для вызова такси");
			return phoneOff();
		}
		
		mp.events.callRemote('callTaxi', JSON.stringify(taxiStartPos), JSON.stringify(taxiFinishPos));
	}else{
		if(hud_browser) hud_browser.execute('togglePhone(\'{"name":"taxi","activity":"phoneTaxiAppMain"}\');');
	}
});

mp.events.add("cancelTaxi", () => {
	mp.game.ui.messages.showMidsized("~g~Вызов такси ~s~отменён", "~s~пожалуйста, не вызывайте такси без надобности");
	
	mp.events.callRemote('cancelTaxi');
	
	taxiCall = false;
	taxiStartPos = {"x":0, "y":0, "z":0};
	taxiFinishPos = {"x":0, "y":0, "z":0};
	
	mp.game.invoke('0xA7E4E2D361C2627F');
	
	if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
	hud_browser.execute("togglePhone();");
	mp.gui.cursor.visible = false;
	restoreBinds();
	mobilePhone = false;
	
	if(taxiCallCheckpoint) taxiCallCheckpoint.destroy();
	taxiCallCheckpoint = false;
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(taxiCall) {
		if(mp.checkpoints.exists(checkpoint) && mp.checkpoints.exists(taxiCallCheckpoint)) {
			if(checkpoint && taxiCallCheckpoint) {
				if(checkpoint == taxiCallCheckpoint) {
					if(localPlayer.vehicle) {
						let theVeh = localPlayer.vehicle;
						let vehDriver = mp.players.atHandle(theVeh.getPedInSeat(-1));
						if(vehDriver) {
							if(typeof(vehDriver.getVariable("player.id")) != "undefined") {
								if(parseInt(taxiCall) == parseInt(vehDriver.getVariable("player.id")) && taxiFinishPos) {
									mp.events.callRemote('clientPlayerSeatToTaxi', taxiCall, JSON.stringify(taxiFinishPos));
									if(taxiCallCheckpoint) taxiCallCheckpoint.destroy();
									taxiCallCheckpoint = false;
								}else{
									mp.events.call('cancelTaxi');
								}
							}else{
								mp.events.call('cancelTaxi');
							}
						}else{
							mp.events.call('cancelTaxi');
						}
					}else{
						mp.events.call('cancelTaxi');
					}
				}
			}
		}
	}
});

mp.events.add("playerCreateWaypoint", (position) => {
	if(!taxiCall && position) {
		taxiStartPos = localPlayer.position;
		//let groundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
		taxiFinishPos = {"x":position.x, "y":position.y, "z":position.z};
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify({"x":position.x, "y":position.y, "z":position.z})+"</span>");
	}
});

function makeEndTaxi(vehicle, seat) {
	if(vehicle && taxiCall && taxiStartPos && taxiFinishPos) {
		let vehDriver = mp.players.atHandle(vehicle.getPedInSeat(-1));
		if(vehDriver) {
			if(typeof(vehDriver.getVariable("player.id")) != "undefined") {
				if(parseInt(taxiCall) == parseInt(vehDriver.getVariable("player.id"))) {
					let myPos = localPlayer.position;
					let cost = 0;
					let distToPoint = mp.game.gameplay.getDistanceBetweenCoords(taxiStartPos.x, taxiStartPos.y, taxiStartPos.z, myPos.x, myPos.y, myPos.z, true);
					distToPoint = roundNumber(distToPoint/1000, 1);
					cost = roundNumber(6550 * distToPoint, 0) + (roundNumber(6550 * distToPoint, 0) * 0.05);
					
					let resTaxiMoney = 0;
					if(typeof(vehDriver.getVariable("player.job")) != "undefined") {
						let jobData = vehDriver.getVariable("player.job");
						if(jobData.name != "taxi") return mp.events.call('cancelTaxi');
						resTaxiMoney = roundNumber(parseInt(jobData.workActCost) * distToPoint, 0) + (roundNumber(parseInt(jobData.workActCost) * distToPoint, 0) * 0.05);
					}else{
						return mp.events.call('cancelTaxi');
					}
					
					mp.game.ui.messages.showMidsized("~g~Вы завершили ~s~поездку в такси", "~s~Потрачено "+cost+" руб.");
					
					mp.events.callRemote('endTaxi', vehDriver, cost, resTaxiMoney);
					
					taxiCall = false;
					taxiStartPos = {"x":0, "y":0, "z":0};
					taxiFinishPos = {"x":0, "y":0, "z":0};
					
					mp.game.invoke('0xA7E4E2D361C2627F');
					
					if(localPlayer.isRunningMobilePhoneTask()) localPlayer.clearTasks();
					hud_browser.execute("togglePhone();");
					mp.gui.cursor.visible = false;
					restoreBinds();
					mobilePhone = false;
					
					if(taxiCallCheckpoint) taxiCallCheckpoint.destroy();
					taxiCallCheckpoint = false;
				}else{
					return mp.events.call('cancelTaxi');
				}
			}else{
				return mp.events.call('cancelTaxi');
			}
		}else{
			return mp.events.call('cancelTaxi');
		}
	}
}
mp.events.add("playerLeaveVehicle", makeEndTaxi);

mp.events.add("playerDeath", (player, reason, killer) => {
    if(player == localPlayer) {
		if(localPlayer.vehicle && taxiCall && taxiStartPos && taxiFinishPos) makeEndTaxi(localPlayer.vehicle);
	}
});

/*
mp.events.add("playerReachWaypoint", (player) => {
	if(taxiCall && parseFloat(taxiFinishPos.x) != 0 && parseFloat(taxiFinishPos.y) != 0 && parseFloat(taxiFinishPos.z) != 0) {
		taxiFinishPos = {"x":0, "y":0, "z":0};
	}
});
*/
}