{
global.hud_browser = false;
global.chatActive = false;

var afAuthZone = false;

var afTabPanel = Date.now();
var afChat = Date.now();
var afActMenuPanel = Date.now();

var afTPvehAndDestroy = Date.now();
var afFix = Date.now();
var afFlip = Date.now();
var afLight = Date.now();
var afEngine = Date.now();
var afDoors = Date.now();
var afSeatbelt = Date.now();
var afNeon = Date.now();
var afVehPanel = Date.now();
var afToggleHelpButtons = Date.now();
var afTurnLeft = Date.now(), afTurnRight = Date.now();

var afCruise = Date.now(), afAutopilot = Date.now();

var afCamhack = Date.now();
var afCrouch = Date.now();

var vehSeat = false, vehLeaveRecently = false;

var tempAuthData = false;
var failLoginAttempts = 4;
var failSecureAttempts = 4;

var auth_browser = false;
var quit_browser = false;

var camHack = false;

var BLOCK_CONTROLS = true;

var fastUseSlotsTiming = 0;

function refreshMaxStreamed() {
	if(typeof(mp.world.data) !== "undefined") {
		if(typeof(mp.world.data.maxStreamed) !== "undefined") {
			let tempFractions = mp.world.data.maxStreamed;
			for(var k in mp.world.data.maxStreamed) {
				//if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146\"> * mp."+k+".maxStreamed = "+mp.world.data.maxStreamed[k]+"</span>");
				if(k == "players") mp.players.maxStreamed = parseInt(mp.world.data.maxStreamed[k]);
				else if(k == "peds") mp.peds.maxStreamed = parseInt(mp.world.data.maxStreamed[k]);
				else if(k == "vehicles") mp.vehicles.maxStreamed = parseInt(mp.world.data.maxStreamed[k]);
				else if(k == "colshapes") mp.colshapes.maxStreamed = parseInt(mp.world.data.maxStreamed[k]);
				else if(k == "objects") mp.objects.maxStreamed = parseInt(mp.world.data.maxStreamed[k]);
				else if(k == "markers") mp.markers.maxStreamed = parseInt(mp.world.data.maxStreamed[k]);
				else if(k == "labels") mp.labels.maxStreamed = parseInt(mp.world.data.maxStreamed[k]);
				else if(k == "checkpoints") mp.checkpoints.maxStreamed = parseInt(mp.world.data.maxStreamed[k]);
			}
		}
	}
}

mp.events.add("worldDataChanged", (key, oldValue, newValue) => {
	if(key == "maxStreamed") refreshMaxStreamed();
});

/*
function startTest() {
	for (let i = 0; i < 100; i++) {
		mp.checkpoints.new(0, new mp.Vector3(1619.7446+getRandomInt(5,30), 390.832+getRandomInt(5,30), 257.9531+getRandomInt(5,30)), 9,
		{
			color: [255, 255, 255, 255],
			visible: true,
			dimension: 0
		});
	}
}
startTest();

mp.events.add('entityStreamIn', (entity) => {
    if(entity.type == 'checkpoint') {
		if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146\"> * ЧЕКПОИНТ В СТРИМЕ</span>");
	}
});
*/

function playerAuthzone() {
	if (!auth_browser) {
		mp.game.gxt.set("PM_PAUSE_HDR", "Вы играете на сервере ~w~SMOTRA~y~rage ~m~| Обновление 1.5 часть 1");
		
		mp.gui.chat.show(false);
		mp.gui.chat.activate(false);
		mp.gui.chat.safeMode = true;
		
		mp.nametags.enabled = false;
		
		let login = false, pass = false;
		if(mp.storage.data.auth) {
			login = mp.storage.data.auth.login.toString();
			pass = mp.storage.data.auth.pass.toString();
		}
		
		auth_browser = mp.browsers.new("package://CEF/auth/index.html");
		if(login && pass) auth_browser.execute("autoLogin('"+login+"', '"+pass+"');");
		
		localPlayer.freezePosition(true);
		//mp.events.callRemote('playerCustomize');
		
		mp.gui.cursor.visible = true;
	}else{
		auth_browser.destroy();
		mp.gui.cursor.visible = false;
	}
}
mp.events.add("playerAuthzone", playerAuthzone);

function authCursor() {
	mp.gui.cursor.visible = true;
}
mp.events.add("authCursor", authCursor);

function playerTryAuth(login, pass, autologin) {
	if(!login || (login.length < 3 || login.length > 16)) auth_browser.execute("authFailed('Вы не ввели логин, повторите попытку');");
	if(!pass || (pass.length < 3 || pass.length > 16)) auth_browser.execute("authFailed('Вы не ввели пароль, повторите попытку');");
	if(autologin) mp.storage.data.auth = {login, pass};
	else if(mp.storage.data.auth) delete mp.storage.data.auth;
	
	if(afAuthZone) return auth_browser.execute("authFailed('Слишком частые попытки..');");;
	afAuthZone = setTimeout(() => { afAuthZone = false; }, 2500);
	
	mp.events.callRemote('playerTryAuth', login, pass);
}
mp.events.add("playerTryAuth", playerTryAuth);

function playerTryReg(login, pass, sec, promo) {
	if(!login || (login.length < 4 || login.length > 16)) auth_browser.execute("regFailed('Вы не ввели логин, повторите попытку');");
	if(!pass || (pass.length < 6 || pass.length > 16)) auth_browser.execute("regFailed('Вы не ввели пароль, повторите попытку');");
	if(!sec || (sec.length < 4 || sec.length > 16)) auth_browser.execute("regFailed('Вы не ввели секретное слово, повторите попытку');");
	
	if(afAuthZone) return auth_browser.execute("authFailed('Слишком частые попытки..');");;
	afAuthZone = setTimeout(() => { afAuthZone = false; }, 2500);
	
	mp.events.callRemote('playerTryReg', login, pass, sec, promo);
}
mp.events.add("playerTryReg", playerTryReg);

function checkNickName(nickName) {
	mp.events.callRemote('checkNickName', nickName);
}
mp.events.add("checkNickName", checkNickName);

function nickNameChecked(theResult) {
	auth_browser.execute("nickChecked('"+theResult+"');");
}
mp.events.add("nickNameChecked", nickNameChecked);

function playerTryRestore(login, sec) {
	if(!login || (login.length < 4 || login.length > 16)) auth_browser.execute("regFailed('Вы не ввели логин, повторите попытку');");
	if(!sec || (sec.length < 4 || sec.length > 16)) auth_browser.execute("regFailed('Вы не ввели секретное слово, повторите попытку');");
	mp.events.callRemote('playerTryRestore', login, sec);
}
mp.events.add("playerTryRestore", playerTryRestore);

function playerTryCheckSecure(sec) {
	if(!sec || (sec.length < 4 || sec.length > 16)) auth_browser.execute("authFailed('Вы не ввели секретное слово, повторите попытку');");
	if(tempAuthData) {
		let data = JSON.parse(tempAuthData);
		data = data[0];
		if(data.secure == sec) {
			authGoodEnd();
		}else{
			failSecureAttempts = failSecureAttempts - 1;
			if(failSecureAttempts > 1) {
				if (auth_browser) auth_browser.execute("authFailed('Секретное слово введено неверно<br/>Осталось попыток: <b>"+failSecureAttempts+"</b>');");
			}else{
				auth_browser.destroy();
				auth_browser = null;
				mp.events.callRemote('playerSystemKick', false, 'Не верное секретное слово');
			}
		}
	}
}
mp.events.add("playerTryCheckSecure", playerTryCheckSecure);

function playerAuthResult(data, serial) {
	if(IsJsonString(data)) {
		//return auth_browser.execute("authFailed('"+data.toString()+"');");
		tempAuthData = data;
		data = JSON.parse(data);
		data = data[0];
		if(data) {
			if(data.status == "error") {
				if (auth_browser) auth_browser.execute("authFailed('"+data.reason+"');");
			}else if(data.status == "ban") {
				let expTime = millisecToTime(parseInt(data.exp)*1000);
				data.exp = "обратитесь в техподдержку";
				if(expTime.s > 0) data.exp = expTime.s+" сек.";
				if(expTime.m > 0) data.exp = expTime.m+" мин., "+expTime.s+" сек.";
				if(expTime.h > 0) data.exp = expTime.h+" ч., "+expTime.m+" мин., "+expTime.s+" сек.";
				if(expTime.d > 0) data.exp = expTime.d+" дн., "+expTime.h+" ч., "+expTime.m+" мин., "+expTime.s+" сек.";
				if (auth_browser) {
					auth_browser.execute("authFailed('Вам <b>заблокирован</b> доступ к серверу.<br/>Заблокировал доступ: <b>"+data.author+"</b><br/>Причина: <b>"+data.reason+"</b><br/>Разбан через: <b>"+data.exp+"</b>');");
					auth_browser.execute("toggleAuth();");
					setTimeout(() => { if(auth_browser) auth_browser.execute("toggleAuth('true');"); }, 15000);
				}
			}else if(data.status == "ok") {
				mp.players.forEach(
					(player, id) => {
						if(player.remoteId.toString() != localPlayer.remoteId.toString()) {
							if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
								if(player.getVariable("player.id") == localPlayer.getVariable("player.id")) return mp.events.callRemote('playerSystemKick', false, 'Кто-то залогинился под Вашими данными');
							}
						}
					}
				);
				if (auth_browser) {
					if(data.nick != 0) {
						mp.events.call('moveSkyCamera', localPlayer, 'up', 1, false);
						
						if(data.club != serial) {
							auth_browser.execute("goTo('secure');");
							auth_browser.execute("authFailed('Этот компьютер отличается от компьютера с которого зарегистрирован аккаунт');");
						}else{
							mp.events.call("sleepAntiCheat");
							authGoodEnd();
						}
					}else{
						mp.events.call("sleepAntiCheat");
						
						localPlayer.position = new mp.Vector3(916.5676,-3242.8772,-96.9186);
						localPlayer.setHeading(170);
						
						localPlayer.setComponentVariation(3, 15, 0, 0); // Верх (ТОРС)
						localPlayer.setComponentVariation(11, 15, 0, 0); // Верх (Одежда)
						localPlayer.setComponentVariation(8, 15, 0, 0); // Верх (Под одеждой)
						localPlayer.setComponentVariation(4, 55, 1, 1); // Ноги (одежда)
						localPlayer.setComponentVariation(6, 1, 1, 1); // Ноги (обувь)
						
						camFocusOnPlayer();
						auth_browser.execute("goTo('customization');");
					}
				}
			}
		}
	}
}
mp.events.add("playerAuthResult", playerAuthResult);

function playerRegResult(data) {
	if(IsJsonString(data)) {
		//auth_browser.execute("authFailed('"+data.toString()+"');");
		tempAuthData = data;
		data = JSON.parse(data);
		data = data[0];
		if(data) {
			if(data.status == "error") {
				if (auth_browser) auth_browser.execute("regFailed('"+data.reason+"');");
			}else if(data.status == "ban") {
				let expTime = millisecToTime(parseInt(data.exp)*1000);
				data.exp = "обратитесь в техподдержку";
				if(expTime.s > 0) data.exp = expTime.s+" сек.";
				if(expTime.m > 0) data.exp = expTime.m+" мин., "+expTime.s+" сек.";
				if(expTime.h > 0) data.exp = expTime.h+" ч., "+expTime.m+" мин., "+expTime.s+" сек.";
				if(expTime.d > 0) data.exp = expTime.d+" дн., "+expTime.h+" ч., "+expTime.m+" мин., "+expTime.s+" сек.";
				if (auth_browser) {
					auth_browser.execute("authFailed('Вам <b>заблокирован</b> доступ к серверу.<br/>Заблокировал доступ: <b>"+data.author+"</b><br/>Причина: <b>"+data.reason+"</b><br/>Разбан через: <b>"+data.exp+"</b>');");
					auth_browser.execute("toggleAuth();");
				}
			}else if(data.status == "ok") {
				if (auth_browser) {
					mp.events.call("sleepAntiCheat");
					localPlayer.position = new mp.Vector3(916.5676,-3242.8772,-96.9186);
					localPlayer.setHeading(170);
					
					localPlayer.setComponentVariation(3, 15, 0, 0); // Верх (ТОРС)
					localPlayer.setComponentVariation(11, 15, 0, 0); // Верх (Одежда)
					localPlayer.setComponentVariation(8, 15, 0, 0); // Верх (Под одеждой)
					localPlayer.setComponentVariation(4, 55, 1, 1); // Ноги (одежда)
					localPlayer.setComponentVariation(6, 1, 1, 1); // Ноги (обувь)
					
					auth_browser.execute("goTo('customization');");
					localPlayer.freezePosition(true);
					camFocusOnPlayer();
				}
			}
		}
	}
}
mp.events.add("playerRegResult", playerRegResult);

function playerRestoreResult(data) {
	if(IsJsonString(data)) {
		//auth_browser.execute("authFailed('"+data.toString()+"');");
		data = JSON.parse(data);
		data = data[0];
		if(data) {
			if(data.status == "error") {
				if (auth_browser) auth_browser.execute("restoreFailed('"+data.reason+"');");
			}else if(data.status == "ban") {
				let expTime = millisecToTime(parseInt(data.exp)*1000);
				data.exp = "обратитесь в техподдержку";
				if(expTime.s > 0) data.exp = expTime.s+" сек.";
				if(expTime.m > 0) data.exp = expTime.m+" мин., "+expTime.s+" сек.";
				if(expTime.h > 0) data.exp = expTime.h+" ч., "+expTime.m+" мин., "+expTime.s+" сек.";
				if(expTime.d > 0) data.exp = expTime.d+" дн., "+expTime.h+" ч., "+expTime.m+" мин., "+expTime.s+" сек.";
				if (auth_browser) {
					auth_browser.execute("restoreFailed('Вам <b>заблокирован</b> доступ к серверу.<br/>Заблокировал доступ: <b>"+data.author+"</b><br/>Причина: <b>"+data.reason+"</b><br/>Разбан через: <b>"+data.exp+"</b>');");
					auth_browser.execute("toggleAuth();");
				}
			}else if(data.status == "ok") {
				if (auth_browser) {
					auth_browser.execute("passRestored('"+data.pass+"');");
				}
			}
		}
	}
}
mp.events.add("playerRestoreResult", playerRestoreResult);

function setGender(setGender) {
	if(setGender) {
		if(setGender == "male") {
			localPlayer.model = mp.game.joaat("MP_M_Freemode_01");
			
			localPlayer.setComponentVariation(3, 15, 0, 0); // Верх (ТОРС)
			localPlayer.setComponentVariation(11, 15, 0, 0); // Верх (Одежда)
			localPlayer.setComponentVariation(8, 15, 0, 0); // Верх (Под одеждой)
			localPlayer.setComponentVariation(4, 55, 1, 1); // Ноги (одежда)
			localPlayer.setComponentVariation(6, 1, 1, 1); // Ноги (обувь)
		}else{
			localPlayer.model = mp.game.joaat("MP_F_Freemode_01");
			
			localPlayer.setComponentVariation(3, 15, 0, 0); // Верх (ТОРС)
			localPlayer.setComponentVariation(11, 15, 0, 0); // Верх (Одежда)
			localPlayer.setComponentVariation(8, 15, 0, 0); // Верх (Под одеждой)
			localPlayer.setComponentVariation(4, 30, 1, 1); // Ноги (одежда)
			localPlayer.setComponentVariation(6, 1, 1, 1); // Ноги (обувь)
		}
	}
}
mp.events.add("setGender", setGender);

function setHairData(index, color1, color2) {
	if(index && color1 && color2) {
		index = parseInt(index);
		color1 = parseInt(color1);
		color2 = parseInt(color2);
		localPlayer.setComponentVariation(2, index, 0, 0);
		localPlayer.setHairColor(color1, color2);
	}
}
mp.events.add("setHairData", setHairData);

function setParents(male, female, mixShape, mixSkin) {
	male = parseInt(male);
	female = parseInt(female);
	mixShape = parseFloat(mixShape);
	mixSkin = parseFloat(mixSkin);
	localPlayer.setHeadBlendData(female, male, 0, female, male, 0, mixShape, mixSkin, 0, true);
}
mp.events.add("setParents", setParents);

function setFace(index, value) {
	index = parseInt(index);
	value = parseFloat(value);
	localPlayer.setFaceFeature(index, value);
}
mp.events.add("setFace", setFace);

function setHeadOverlayData(index, value, opacity, color) {
	index = parseInt(index);
	value = parseFloat(value);
	opacity = parseFloat(opacity);
	color = parseInt(color);
	localPlayer.setHeadOverlay(index, value, opacity, color, color);
}
mp.events.add("setHeadOverlayData", setHeadOverlayData);

function setEyesColor(value) {
	value = parseFloat(value);
	localPlayer.setEyeColor(value);
}
mp.events.add("setEyeColor", setEyesColor);

function completePersonageEditor(npNick, npGender, npHair, npHairColor1, npHairColor2, npParentMale, npParentFemale, npParentsMixShape, npParentsMixSkin, eyeColor, npFaceFeatures, npHeadOverlay, npHeadOverlayOpacity, npHeadOverlayColor) {	
	if(typeof npNick != 'undefined' && typeof npGender != 'undefined' && typeof npHair != 'undefined' && typeof npHairColor1 != 'undefined' && typeof npHairColor2 != 'undefined' && typeof npParentMale != 'undefined' &&
	typeof npParentFemale != 'undefined' && typeof npParentsMixShape != 'undefined' && typeof npParentsMixSkin != 'undefined' && typeof eyeColor != 'undefined' && typeof npFaceFeatures != 'undefined' &&
	typeof npHeadOverlay != 'undefined' && typeof npHeadOverlayOpacity != 'undefined' && typeof npHeadOverlayColor != 'undefined') {
		npHeadOverlay = JSON.parse(npHeadOverlay);
		npHeadOverlayOpacity = JSON.parse(npHeadOverlayOpacity);
		npHeadOverlayColor = JSON.parse(npHeadOverlayColor);
		
		for(var i in npHeadOverlay) {
			npHeadOverlay[i] = {"v":npHeadOverlay[i].toString(),"o":npHeadOverlayOpacity[i].toString(),"c":npHeadOverlayColor[i].toString()};
		}
		
		let personageData = {
			"npGender":npGender,
			"npHair":npHair,
			"npHairColor1":npHairColor1,
			"npHairColor2":npHairColor2,
			"npParentMale":npParentMale,
			"npParentFemale":npParentFemale,
			"npParentsMixShape":npParentsMixShape,
			"npParentsMixSkin":npParentsMixSkin,
			"eyeColor":eyeColor,
			"npFaceFeatures":JSON.parse(npFaceFeatures),
			"npHeadOverlay":npHeadOverlay
		};
		
		tempAuthData = JSON.parse(tempAuthData);
		tempAuthData[0].nick = npNick;
		tempAuthData[0].pers = JSON.stringify(personageData);
		tempAuthData = JSON.stringify(tempAuthData);
		
		authGoodEnd(true);
	}
}
mp.events.add("completePersonageEditor", completePersonageEditor);

function spawnSelected(thePos) {
	if(spawnSelectorDataInterval) clearInterval(spawnSelectorDataInterval);
	if(auth_browser) {
		if(typeof(thePos) !== "undefined") thePos = JSON.parse(thePos);
		else thePos = false;
		
		setDefaultCam();
		mp.events.call('moveSkyCamera', localPlayer, 'up', 1, false);
		
		auth_browser.destroy();
		auth_browser = null;
		mp.gui.cursor.visible = false;
		
		localPlayer.freezePosition(true);
		
		setTimeout(() => {
			mp.events.call("sleepAntiCheat");
			if(thePos) {
				localPlayer.position = thePos;
				mp.events.callRemote('authorizedSpawnSelected', JSON.stringify(thePos));
			}else{
				localPlayer.position = thePos;
				mp.events.callRemote('authorizedSpawnSelected');
			}
		}, 3200);
	}
}
mp.events.add("spawnSelected", spawnSelected);

mp.events.add('authorizedSpawnSelected', () => {
	if(typeof(localPlayer.getVariable("player.nick")) !== "undefined" && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		let nickName = localPlayer.getVariable("player.nick").toString();
		let myID = localPlayer.getVariable("player.id").toString();
		mp.game.ui.messages.showMidsizedShard("~b~SMOTRA~w~rage", "~s~С возвращением на наш сервер!~n~Вы вошли, как ~h~"+nickName+" ("+myID+")", 5, false, true, 5000);
	}else{
		return mp.events.callRemote('playerSystemKick', false, 'Пожалуйста, перезайдите на сервер');
	}
	
	mp.game.invoke('0xD8295AF639FD9CB8', localPlayer.handle);
	
	setTimeout(() => {
		mp.events.call('moveSkyCamera', localPlayer, 'down');
		waitForCamSwitch();
	}, 1500);

	setTimeout(() => {
		if(typeof(localPlayer.getVariable("player.nick")) !== "undefined") {
			initGameSettings();
			if(typeof(mp.storage.data.sms) === "undefined") mp.storage.data.sms = 0;
			
			mp.players.forEach(
				(player, id) => {
					if(player.remoteId.toString() != localPlayer.remoteId.toString()) {
						if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
							if(player.getVariable("player.id") == localPlayer.getVariable("player.id")) return mp.events.callRemote('playerSystemKick', false, 'Кто-то залогинился под Вашими данными');
						}
					}
				}
			);
			
			if(typeof(mp.world.data.zones) !== "undefined") refreshZones(mp.world.data.zones);
		}
	}, 2500);
	
	setTimeout(() => {
		antiCheatLogined = true;
		if (!hud_browser) {
			hud_browser = mp.browsers.new("package://CEF/hud/index.html");
			hud_browser.execute('newcfg(0,0); newcfg(1,0); newcfg(2,0); newcfg(3,1);');
			restoreBinds();
			hideHud = false;
		}
		mp.game.ui.messages.showMidsized("~w~Игровая ~g~помощь", "~w~Не знаешь как играть? ~s~Нажми ~r~F10~w~.");
		mp.game.ui.notifications.showWithPicture("Мото-салон?!", "Новые мотоциклы", "На сервер завезли новые мотики, сгоняй зацени!", "CHAR_DEFAULT", 1, false, 1, 2);
		mp.players.forEach(
			(player, id) => {
				if(player.remoteId.toString() != localPlayer.remoteId.toString()) {
					if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
						if(player.getVariable("player.id") == localPlayer.getVariable("player.id")) return mp.events.callRemote('playerSystemKick', false, 'Кто-то залогинился под Вашими данными');
					}
				}
			}
		);
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined") mp.gui.takeScreenshot("player"+localPlayer.getVariable("player.id")+".jpg", 0, 1, 0);
		
		refreshMaxStreamed();
		
		mp.game.streaming.setPedPopulationBudget(0);
		mp.game.streaming.setVehiclePopulationBudget(0);
		
		localPlayer.setConfigFlag(429, true); // Не пытается завести авто
		localPlayer.setConfigFlag(18, false); // Не пиздить прикладом
		mp.game.invoke("0x476AE72C1D19D1A8", localPlayer.handle, 0); // weapon drop off
		mp.game1.weapon.unequipEmptyWeapons = false;
		mp.game.audio.setRadioToStationName("OFF");
		
		let myBlocks = {};
		if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") myBlocks = localPlayer.getVariable("player.blocks");
		if(typeof(myBlocks.skills) === "undefined") myBlocks["skills"] = {"str":1,"sta":1,"weap":1};
		
		if(typeof(myBlocks) !== "undefined") {
			if(typeof(myBlocks.skills) !== "undefined") {
				if(typeof(myBlocks.skills.sta) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_STAMINA"), myBlocks.skills.sta, false); // Выносливость
				if(typeof(myBlocks.skills.str) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_STRENGTH"), myBlocks.skills.str, false); // Сила
				if(typeof(myBlocks.skills.weap) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_SHOOTING_ABILITY"), myBlocks.skills.weap, false); // Стрельба
			}
		}
		mp.game.stats.statSetInt(mp.game.joaat("SP0_LUNG_CAPACITY"), 1, false); // Объём лёгких
		mp.game.stats.statSetInt(mp.game.joaat("SP0_WHEELIE_ABILITY"), 100, false); // На заднем колесе
		mp.game.stats.statSetInt(mp.game.joaat("SP0_FLYING_ABILITY"), 100, false); // Полёты
		mp.game.stats.statSetInt(mp.game.joaat("SP0_STEALTH_ABILITY"), 1, false); // Скрытность
		
		localPlayer.setMinGroundTimeForStungun(30000); // TAZER TIME
		
		localPlayer.setConfigFlag(149, true); // Что бы кепка не слетала
		
		mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE"); // Отключаем звуки окружения
		
		localPlayer.setHelmet(false); // не надевать шлем автоматически
		localPlayer.setCanBeKnockedOffVehicle(1); // Не падать с мото
		
		mp.game.ped.setPedDensityMultiplierThisFrame(0); // Убираем сток трафик
		mp.game.streaming.setPedPopulationBudget(0); // Убираем сток трафик
		mp.game.streaming.setVehiclePopulationBudget(0); // Убираем сток трафик
	}, 7000);
	
	setTimeout(() => {
		let isPremium = false;
		if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
			let myBlocks = localPlayer.getVariable("player.blocks");
			if(typeof(myBlocks.premium) !== "undefined") isPremium = true;
		}
		mp.game.ui.notifications.showWithPicture("Твой бро", "Тебе помочь?", "Нажми F10 и получи полное описание игры на проекте.", "CHAR_JIMMY", 1, false, 1, 2);
		if(isPremium) mp.game.ui.notifications.showWithPicture("Твой бро", "Премиум-доступ", "У тебя премиум, ты красава!", "CHAR_JIMMY", 1, false, 1, 2);
		if(hud_browser) hud_browser.execute('playSound("help", "0.15");');
	}, 12000);
	
	tempAuthData = null;
	failLoginAttempts = null;
	failSecureAttempts = null;
});

var spawnSelectorDataInterval = false;
function authGoodEnd(isSave) {
	if(tempAuthData) {
		mp.events.call("sleepAntiCheat");
		
		mp.players.forEach(
			(player, id) => {
				if(player.remoteId.toString() != localPlayer.remoteId.toString()) {
					if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
						if(player.getVariable("player.id") == localPlayer.getVariable("player.id")) return mp.events.callRemote('playerSystemKick', false, 'Кто-то залогинился под Вашими данными');
					}
				}
			}
		);
		
		mp.events.callRemote('playerAuthorized', tempAuthData, isSave);
			
		if(!mp.storage.data.age) {
			auth_browser.execute("goTo('18');");
		}else{
			auth_browser.execute("goTo('spawn');");
			
			BLOCK_CONTROLS = false;
			spawnSelectorDataInterval = setInterval(function() {
				if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined" && typeof(localPlayer.getVariable("player.pos")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined" && typeof(mp.world.data.fractions) !== "undefined" && typeof(localPlayer.getVariable("player.houses")) !== "undefined") {
					let myBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(myBlocks.jail) !== "undefined") {
						tempAuthData = null;
						failLoginAttempts = null;
						failSecureAttempts = null;
						
						mp.events.callRemote('goToJail', false, false);
						spawnSelected();
						return clearInterval(spawnSelectorDataInterval);
					}
					
					let myFraction = localPlayer.getVariable("player.fraction");
					let fracSpawn = {};
					if(typeof(myFraction.id) !== "undefined" && typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
						let theFraction = mp.world.data.fractions[myFraction.id];
						if(theFraction.spawn) fracSpawn = theFraction.spawn;
					}
					
					let myHouses = localPlayer.getVariable("player.houses");
					let housesArray = {};
					if(typeof(myHouses.houses) !== "undefined") {
						myHouses = myHouses.houses;
						for (var k in myHouses) {
							let houseData = myHouses[k];
							//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Data: "+JSON.stringify(houseData)+"</span>");
							if(typeof(houseData.id) !== "undefined" && typeof(houseData.pos) !== "undefined") {
								houseData.pos = explode(",", houseData.pos);
								housesArray[houseData.id] = {"x":parseFloat(houseData.pos[0]),"y":parseFloat(houseData.pos[1]),"z":parseFloat(houseData.pos[2])};
							}
						}
					}
					
					mp.players.forEach(
						(player, id) => {
							if(player.remoteId.toString() != localPlayer.remoteId.toString()) {
								if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
									if(player.getVariable("player.id") == localPlayer.getVariable("player.id")) return mp.events.callRemote('playerSystemKick', false, 'Кто-то залогинился под Вашими данными');
								}
							}
						}
					);
					
					auth_browser.execute('spawnsLoaded(\''+JSON.stringify(localPlayer.getVariable("player.pos"))+'\',\''+JSON.stringify(fracSpawn)+'\',\''+JSON.stringify(housesArray)+'\');');
					clearInterval(spawnSelectorDataInterval);
				}
			}, 1000);
		}
	}
}

let onlineMinutesForFractionsRating = 0;

let lootSilentTicker = 0;
var lootMakes = 0;
function updateDateTime(data) {
	if(data) {
		if(lootMakes > 0) {
			lootSilentTicker++;
			if(lootSilentTicker <= 5) {
				if(lootMakes >= 15) {
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * LOOT BLOCK ACTIVATED 10 MINs.</span>");
					mp.events.callRemote("lootSilentBlock", "10");
					lootSilentTicker = 0;
					lootMakes = 0;
					fullRemoveLoots();
				}
			}else if(lootSilentTicker > 5) {
				lootSilentTicker = 0;
				lootMakes = 0;
			}
		}
		
		if(typeof(localPlayer.getVariable("player.afk")) !== "undefined") {
			if(!localPlayer.getVariable("player.afk")) {
				if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
					let myFraction = localPlayer.getVariable("player.fraction");
					if(typeof(myFraction.id) !== "undefined") {
						onlineMinutesForFractionsRating++;
						if(onlineMinutesForFractionsRating >= 10) {
							mp.events.callRemote('addFractionRating', false, 5, 100);
							onlineMinutesForFractionsRating = 0;
						}
					}
				}
			}
		}
		
		if(typeof(fishingMode.time) !== "undefined") fishingProcessor();
		
		curOnline = 0;
		mp.players.forEach(
			(player, id) => {
				//mp.game.ui.notifications.showWithPicture("111", "222", player.remoteId.toString()+" | "+localPlayer.remoteId.toString(), "CHAR_JIMMY", 1, false, 1, 2);
				if(player.remoteId.toString() != localPlayer.remoteId.toString()) {
					if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
						if(player.getVariable("player.id") == localPlayer.getVariable("player.id")) return mp.events.callRemote('playerSystemKick', false, 'Кто-то залогинился под Вашими данными');
					}
				}
				curOnline++;
			}
		);
		
		//waitVehActions = {"fix":false,"flip":false,"lights":false,"engine":false,"doors":false,"neon":false,"flashers":false};
		
		oldWeather = data.oldWeather;
		curWeather = data.curWeather;
		weatherStep = data.weatherStep;
		curDay = data.day;
		curMonth = data.month;
		curYear = data.year;
		curHours = data.hours;
		curMinutes = data.minutes;
		curSeconds = data.seconds;
		
		mp.gui.chat.show(false);
		mp.gui.chat.activate(false);
		mp.gui.chat.safeMode = true;
		
		localPlayer.setConfigFlag(429, true); // Не пытается завести авто
		localPlayer.setConfigFlag(18, false); // Не пиздить прикладом
		mp.game.invoke("0x476AE72C1D19D1A8", localPlayer.handle, 0); // weapon drop off
		mp.game1.weapon.unequipEmptyWeapons = false;
		mp.game.audio.setRadioToStationName("OFF");
		
		let myBlocks = {};
		if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") myBlocks = localPlayer.getVariable("player.blocks");
		if(typeof(myBlocks.skills) === "undefined") myBlocks["skills"] = {"str":1,"sta":1,"weap":1};
		
		if(typeof(myBlocks) !== "undefined") {
			if(typeof(myBlocks.skills) !== "undefined") {
				if(typeof(myBlocks.skills.sta) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_STAMINA"), myBlocks.skills.sta, false); // Выносливость
				if(typeof(myBlocks.skills.str) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_STRENGTH"), myBlocks.skills.str, false); // Сила
				if(typeof(myBlocks.skills.weap) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_SHOOTING_ABILITY"), myBlocks.skills.weap, false); // Стрельба
			}
		}
		mp.game.stats.statSetInt(mp.game.joaat("SP0_LUNG_CAPACITY"), 1, false); // Объём лёгких
		mp.game.stats.statSetInt(mp.game.joaat("SP0_WHEELIE_ABILITY"), 100, false); // На заднем колесе
		mp.game.stats.statSetInt(mp.game.joaat("SP0_FLYING_ABILITY"), 100, false); // Полёты
		mp.game.stats.statSetInt(mp.game.joaat("SP0_STEALTH_ABILITY"), 1, false); // Скрытность
		
		localPlayer.setMinGroundTimeForStungun(30000); // TAZER TIME
		
		localPlayer.setConfigFlag(149, true); // Что бы кепка не слетала
		
		mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE"); // Отключаем звуки окружения
		
		localPlayer.setHelmet(false); // не надевать шлем автоматически
		
		mp.game.ped.setPedDensityMultiplierThisFrame(0); // Убираем сток трафик
		mp.game.streaming.setPedPopulationBudget(0); // Убираем сток трафик
		mp.game.streaming.setVehiclePopulationBudget(0); // Убираем сток трафик
		
		if(typeof(localPlayer.getVariable("player.nick")) !== "undefined") mp.discord.update('SMOTRArage.ru', 'Я '+localPlayer.getVariable("player.nick"));
		
		mp.game.time.setClockTime(curHours, curMinutes, curSeconds);
		
		if(typeof(localPlayer.getVariable("player.vehs")) !== "undefined") myRentVehChecker();
		
		let hp = localPlayer.getHealth();
		
		let warningNotify = false;
		
		if(!warningNotify) {
			let randNotify = getRandomInt(0, 43);
			if(randNotify == 0) {
				if(hp < 50) mp.game.ui.notifications.showWithPicture("Частный доктор", "Проблемы со здоровьем", "Я вижу у Вас проблемы со здоровьем. Посетите больницу.", "CHAR_ANDREAS", 1, false, 1, 2);
			}else if(randNotify == 2) {
				if(typeof(localPlayer.getVariable("player.houses")) !== "undefined") {
					let myHouses = localPlayer.getVariable("player.houses");
					for (var k in myHouses.houses) {
						let houseData = myHouses.houses[k];
						if(houseData.balance < 0) {
							mp.game.ui.notifications.showWithPicture("Судебный пристав", "Налоги на жильё", "Внимание, жильё ID "+houseData.id+" имеет отрицательный баланс.", "CHAR_DR_FRIEDLANDER", 1, false, 1, 2);
						}
					}
				}
			}else if(randNotify == 6) {
				let isPremium = false;
				if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
					let myBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(myBlocks.premium) !== "undefined") isPremium = true;
				}
				if(!isPremium) mp.game.ui.notifications.showWithPicture("Твой бро", "Хочешь премиум?", "Зайди на наш сайт, что бы узнать все тонкости премиума.", "CHAR_JIMMY", 1, false, 1, 2);
			}else if(randNotify == 12) {
				if(typeof(localPlayer.getVariable("player.businesses")) !== "undefined") {
					let myBusinesses = localPlayer.getVariable("player.businesses");
					for (var k in myBusinesses.businesses) {
						let businessData = myBusinesses.businesses[k];
						if(businessData.events != "" || JSON.stringify(businessData.events) != "[]") {
							mp.game.ui.notifications.showWithPicture("Управляющий", "Разберитесь с делами", "Внимание, коммерция ID "+businessData.id+" имеет невыполненные задачи.", "CHAR_CHENG", 1, false, 1, 2);
						}
					}
				}
			}else if(randNotify == 18) {
				if(typeof(mp.storage.data.settings) !== "undefined") {
					if(typeof(mp.storage.data.settings.airMode) !== "undefined") {
						if(mp.storage.data.settings.airMode && typeof(localPlayer.getVariable("player.id")) !== "undefined") mp.game.ui.notifications.showWithPicture("Твой бро", "Подписывайся", "~w~ВКонтакте: ~o~vk.com/smotrarage~n~~w~Сайт: ~o~smotrarage.ru", "CHAR_JIMMY", 1, false, 1, 2);
					}
				}
			}else if(randNotify == 24) {
				if(typeof(mp.storage.data.settings) !== "undefined") {
					if(typeof(mp.storage.data.settings.airMode) !== "undefined") {
						if(mp.storage.data.settings.airMode && typeof(localPlayer.getVariable("player.id")) !== "undefined") mp.game.ui.notifications.showWithPicture("Твой бро", "Ты знал о Discord?", "~w~Наш Discord: ~o~discord.gg/smotra", "CHAR_JIMMY", 1, false, 1, 2);
					}
				}
			}else if(randNotify == 30) {
				if(typeof(localPlayer.getVariable("player.id")) !== "undefined") mp.game.ui.notifications.showWithPicture("Твой бро", "Официальный донат", "~w~Донат: ~o~smotrarage.ru/donate", "CHAR_JIMMY", 1, false, 1, 2);
			}else if(randNotify == 36) {
				if(typeof(mp.storage.data.settings) !== "undefined") {
					if(typeof(mp.storage.data.settings.airMode) !== "undefined") {
						if(mp.storage.data.settings.airMode && typeof(localPlayer.getVariable("player.id")) !== "undefined") mp.game.ui.notifications.showWithPicture("Твой бро", "Надоели СМС?", "~w~Включи ~o~авиарежим ~w~в телефоне", "CHAR_JIMMY", 1, false, 1, 2);
					}
				}
			}else if(randNotify == 42) {
				if(typeof(mp.storage.data.settings) !== "undefined") {
					if(typeof(mp.storage.data.settings.airMode) !== "undefined") {
						if(mp.storage.data.settings.airMode && typeof(localPlayer.getVariable("player.id")) !== "undefined") mp.game.ui.notifications.showWithPicture("Твой бро", "Ищешь что-то?", "~w~Купи через ~o~объявления ~w~в планшете", "CHAR_JIMMY", 1, false, 1, 2);
					}
				}
			}
		}else{
			mp.game.ui.notifications.showWithPicture(warningNotify.who, warningNotify.title, warningNotify.msgtext, warningNotify.img, 1, false, 1, 2);
		}
		
		//mp.game.gameplay.setWeatherTypeTransition(mp.game.gameplay.getHashKey("XMAS"), mp.game.gameplay.getHashKey("XMAS"), 0.5);
		mp.game.gameplay.setWeatherTypeTransition(mp.game.gameplay.getHashKey(oldWeather), mp.game.gameplay.getHashKey(curWeather), weatherStep);
	}
	//chatAPI.notifyPush(curDay+" | "+curMonth+" | "+curYear);
	//chatAPI.notifyPush(curHours+" | "+curMinutes+" | "+curSeconds);
}
mp.events.add("updateDateTime", updateDateTime);


mp.events.add('ageAccept', function (state) {
	if(state) {
		mp.storage.data.age = true;
		auth_browser.execute("goTo('spawn');");
		
		BLOCK_CONTROLS = false;
		spawnSelectorDataInterval = setInterval(function() {
			if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined" && typeof(localPlayer.getVariable("player.pos")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined" && typeof(mp.world.data.fractions) !== "undefined" && typeof(localPlayer.getVariable("player.houses")) !== "undefined") {
				let myBlocks = localPlayer.getVariable("player.blocks");
				if(typeof(myBlocks.jail) !== "undefined") {
					tempAuthData = null;
					failLoginAttempts = null;
					failSecureAttempts = null;
					
					mp.events.callRemote('goToJail', false, false);
					spawnSelected();
					return clearInterval(spawnSelectorDataInterval);
				}
				
				let myFraction = localPlayer.getVariable("player.fraction");
				let fracSpawn = {};
				if(typeof(myFraction.id) !== "undefined" && typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
					let theFraction = mp.world.data.fractions[myFraction.id];
					if(theFraction.spawn) fracSpawn = theFraction.spawn;
				}
				
				let myHouses = localPlayer.getVariable("player.houses");
				let housesArray = {};
				if(typeof(myHouses.houses) !== "undefined") {
					myHouses = myHouses.houses;
					for (var k in myHouses) {
						let houseData = myHouses[k];
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Data: "+JSON.stringify(houseData)+"</span>");
						if(typeof(houseData.id) !== "undefined" && typeof(houseData.pos) !== "undefined") {
							houseData.pos = explode(",", houseData.pos);
							housesArray[houseData.id] = {"x":parseFloat(houseData.pos[0]),"y":parseFloat(houseData.pos[1]),"z":parseFloat(houseData.pos[2])};
						}
					}
				}
				
				mp.players.forEach(
					(player, id) => {
						if(player.remoteId.toString() != localPlayer.remoteId.toString()) {
							if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
								if(player.getVariable("player.id") == localPlayer.getVariable("player.id")) return mp.events.callRemote('playerSystemKick', false, 'Кто-то залогинился под Вашими данными');
							}
						}
					}
				);
				
				auth_browser.execute('spawnsLoaded(\''+JSON.stringify(localPlayer.getVariable("player.pos"))+'\',\''+JSON.stringify(fracSpawn)+'\',\''+JSON.stringify(housesArray)+'\');');
				clearInterval(spawnSelectorDataInterval);
			}
		}, 1000);
	}else{
		playerSystemKick("Сервер", "Вам нет 18 лет");
		if(auth_browser) auth_browser.destroy();
	}
});

mp.events.add('changeChatState', function (state) {
	//if(Date.now() - afChat < 500) return false;
	afChat = Date.now();
    chatActive = state;
	if(!chatActive) restoreBinds();
});

function sendCasinoJackpot(thePlayer, msg) {
	if(thePlayer && typeof(msg) !== "undefined") {
		if(mp.players.exists(thePlayer)) {
			msg = msg.toString();
			chatAPI.notifyPush(msg);
		}
	}
}
mp.events.add("sendCasinoJackpot", sendCasinoJackpot);

var chatVisualMessages = {};
function sendChatMessage(thePlayer, chatType, data) {
	if(thePlayer && chatType && data) {
		if(mp.players.exists(thePlayer)) {
			let msg = data.msg;
			if(!data.isMute) {
				if(msg) {
					if(chatType == "forall") {
						if(thePlayer != localPlayer) {
							data.lifeTime = parseInt(Date.parse(new Date()))+10000;
							chatVisualMessages["player"+thePlayer.remoteId] = data;
						}
					}
					
					msg = "<span style=\"color:#FFFFFF;\">"+msg+"</span>";
					chatAPI.sysPush(msg);
				}
			}else{
				if(msg == "мут") notyAPI.error("Вы не можете писать в чат, у Вас заглушка.", 3000, true);
				else notyAPI.error(data.clearMsg, 3000, true);
			}
		}
	}
}
mp.events.add("sendChatMessage", sendChatMessage);

function tryChatMessage(chatType, msg) {
	if(chatType && msg) mp.events.callRemote("checkChatMessage", localPlayer, chatType, msg);
}
mp.events.add("tryChatMessage", tryChatMessage);

var chatAPI = {
    push: (text) => {
		if(hud_browser) hud_browser.execute('chatAPI.push(\''+text+'\');');
	},
    sysPush: (text) => {
		if(hud_browser) hud_browser.execute('chatAPI.sysPush(\''+text+'\');');
	},
    notifyPush: (text) => {
		if(hud_browser) hud_browser.execute('chatAPI.notifyPush(\''+text+'\');');
	},
    warningPush: (text) => {
		if(hud_browser) hud_browser.execute('chatAPI.warningPush(\''+text+'\');');
	},
    errorPush: (text) => {
		if(hud_browser) hud_browser.execute('chatAPI.errorPush(\''+text+'\');');
	},
    realSystemPush: (text) => {
		if(hud_browser) hud_browser.execute('chatSysAPI.push(\''+text+'\');');
	}
}

var notyAPI = {
    error: (text, timeout, sound) => {
		if(hud_browser) hud_browser.execute('notyAPI.error(\''+text+'\', '+timeout+', '+sound+');');
	},
	alert: (text, timeout, sound) => {
		if(hud_browser) hud_browser.execute('notyAPI.alert(\''+text+'\', '+timeout+', '+sound+');');
	},
	warning: (text, timeout, sound) => {
		if(hud_browser) hud_browser.execute('notyAPI.warning(\''+text+'\', '+timeout+', '+sound+');');
	},
	info: (text, timeout, sound) => {
		if(hud_browser) hud_browser.execute('notyAPI.info(\''+text+'\', '+timeout+', '+sound+');');
	},
	success: (text, timeout, sound) => {
		if(hud_browser) hud_browser.execute('notyAPI.success(\''+text+'\', '+timeout+', '+sound+');');
	}
}

var isAlreadyDead = false;
function playerDeath(killer, deathReason) {
	let isDriveBy = false;
	if(typeof(deathReason) !== "undefined") {
		if(deathReason == "2741846334") isDriveBy = true;
	}
	
	if(fishingMode) fishingStop(true);
	if(tuningVehicle) tuningVehicle = false;
	
	if(isDriveBy) {
		let oldHP = 200;
		if(typeof(Behaviour) !== "undefined") {
			if(typeof(Behaviour.oldHP) !== "undefined") {
				oldHP = Behaviour.oldHP;
				if(oldHP < 1) oldHP = 1;
			}
		}
		mp.events.callRemote('playerRestored', true, false, JSON.stringify({"reason":"driveBy","oldHP":oldHP}));
	}else{
		let isCapt = false;
		if(typeof(localPlayer.getVariable("player.passive")) !== "undefined") {
			let myFraction = localPlayer.getVariable("player.fraction");
			for (var i in clanZones) {
				let tempZone = clanZones[i];
				if(typeof(tempZone.war.id) !== "undefined") {
					if(tempZone.own.id == myFraction.id || tempZone.war.id == myFraction.id) {
						isCapt = true;
						break;
					}
				}
			}
		}
		
		let killerData = false;
		if(killer) {
			if(mp.players.exists(killer)) {
				if(killer != localPlayer) {
					if(typeof(killer.getVariable("player.id")) !== "undefined" && typeof(killer.getVariable("player.nick")) !== "undefined") {
						killerData = {"id":killer.getVariable("player.id"),"nick":killer.getVariable("player.nick")};
						if(!isAlreadyDead) mp.events.callRemote('killStatMachine', killer, deathReason.toString());
					}
				}
			}
		}
		isAlreadyDead = false;
		
		if(!isCapt) {
			mp.game.graphics.startScreenEffect("HeistCelebPassBW", 3650, false);
			if(!killerData) mp.game.ui.messages.showShard("БЕЗ СОЗНАНИЯ", "Ваш персонаж попал в больницу.", 6, 2, 10500);
			else mp.game.ui.messages.showShard("БЕЗ СОЗНАНИЯ", "Вас убил "+killerData.nick+" ("+killerData.id+")", 6, 2, 10500);
				
			setTimeout(() => {
				localPlayer.freezePosition(true);
				mp.events.call('moveSkyCamera', localPlayer, 'up', 1, false);
				setTimeout(playerRestored, 2500);
			}, 3500);
		}else{
			if(!killerData) mp.game.ui.messages.showMidsized("~w~Ты ~r~погиб", "~w~Дерзай, в этот раз обязательно всё получится!");
			else mp.game.ui.messages.showMidsized("~w~Тебя ~r~убили", "~w~Тебя убил ~r~"+killerData.nick+" ~w~(~r~"+killerData.id+"~w~)");
			setTimeout(playerRestored, 2500);
		}
	}
}
mp.events.add("playerDeathHandler", playerDeath);

function playerSystemKick(author, reason) {
	if(!quit_browser) {
		quit_browser = mp.browsers.new("package://CEF/quit/kick.html");
		if(reason) quit_browser.execute("kickReason('"+author+"', '"+reason+"');");
		localPlayer.freezePosition(true);
		mp.events.call('moveSkyCamera', localPlayer, 'up', 1, false);
		mp.events.callRemote('playerSystemKick', author, reason);
	}
}
mp.events.add("playerSystemKick", playerSystemKick);

let lsMed = ["AIRP", "ELYSIAN", "TERMINA", "EBURO", "MURRI", "TATAMO", "MIRR", "EAST_V", "LMESA", "CYPRE", "RANCHO", "BANNING", "DAVIS", "STAD", "LOSPUER", "DELSOL", "KOREAT", "STRAW", "SKID", "PBOX", "DOWNT", "ROCKF", "VINE", "TEXTI", "ALTA", "HAWICK", "DTVINE", "WVINE", "RICHM", "MORN", "BPLUFF", "DELPE", "DELBE", "BEACH", "VESP", "VCANA", "BURTON", "CHIL", "HORS", "LACT", "LDAM", "RGLEN", "BHAMCA"]; 
let paletoMed = ["MTGORDO", "BRADP", "MTCHIL", "PROCOB", "PALETO", "PALFOR", "CMSW", "PALCOV", "CANNY", "NCHU"];

function playerRestored(deathReason) {
	let myPos = localPlayer.position;
	let zoneName = mp.game.zone.getNameOfZone(myPos.x, myPos.y, myPos.z);
	
	let spawnPos = false;
	if(zoneName == "OCEANA") {
		let probrosDistances = [];
		probrosDistances.push({"pos":new mp.Vector3(298.4762,-584.5555,43.2608),"dist":roundNumber(mp.game.system.vdist2(myPos.x,myPos.y,myPos.z,298.4762,-584.5555,43.2608),0)}); // проброс до Лос-Сантоса
		probrosDistances.push({"pos":new mp.Vector3(-238.5665,6321.9653,32.4261),"dist":roundNumber(mp.game.system.vdist2(myPos.x,myPos.y,myPos.z,-238.5665,6321.9653,32.4261),0)}); // проброс до Палето Бэй
		probrosDistances.push({"pos":new mp.Vector3(1841.684,3668.5991,33.6799),"dist":roundNumber(mp.game.system.vdist2(myPos.x,myPos.y,myPos.z,1841.684,3668.5991,33.6799),0)}); // проброс до Сэнди Шорс
		probrosDistances.sort((b, a) => b.dist - a.dist);
		spawnPos = probrosDistances[0].pos;
	}else if(lsMed.includes(zoneName)) {
		spawnPos = {"x":298.4762,"y":-584.5555,"z":43.2608}; // Больница Лос-Сантоса
	}else if(paletoMed.includes(zoneName)) {
		spawnPos = {"x":-238.5665,"y":6321.9653,"z":32.4261}; // Больница Палето Бэй
	}
	if(!spawnPos) spawnPos = JSON.stringify({"x":1841.684,"y":3668.5991,"z":33.6799}); // Больница Сэнди Шорс
	else spawnPos = JSON.stringify(spawnPos);
	
	if(typeof(deathReason) !== "undefined") mp.events.callRemote('playerRestored', true, false, deathReason, spawnPos);
	else mp.events.callRemote('playerRestored', true, false, undefined, spawnPos);
	
	if(slotInUse != "0") {
		let myInv = localPlayer.getVariable("player.inv");
		if(typeof(myInv[slotInUse.toString()]) !== "undefined") mp.events.call('invUse', slotInUse, JSON.stringify(myInv[slotInUse.toString()]), false, false);
	}
	
	setTimeout(() => {
		mp.events.call('moveSkyCamera', localPlayer, 'down');
		waitForCamSwitch();
	}, 2500);
	
	refreshMaxStreamed();
	
	localPlayer.setConfigFlag(429, true); // Не пытается завести авто
	localPlayer.setConfigFlag(18, false); // Не пиздить прикладом
	mp.game.invoke("0x476AE72C1D19D1A8", localPlayer.handle, 0); // weapon drop off
	mp.game1.weapon.unequipEmptyWeapons = false;
	mp.game.audio.setRadioToStationName("OFF");
	
	let myBlocks = {};
	if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") myBlocks = localPlayer.getVariable("player.blocks");
	if(typeof(myBlocks.skills) === "undefined") myBlocks["skills"] = {"str":1,"sta":1,"weap":1};
	
	if(typeof(myBlocks) !== "undefined") {
		if(typeof(myBlocks.skills) !== "undefined") {
			if(typeof(myBlocks.skills.sta) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_STAMINA"), myBlocks.skills.sta, false); // Выносливость
			if(typeof(myBlocks.skills.str) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_STRENGTH"), myBlocks.skills.str, false); // Сила
			if(typeof(myBlocks.skills.weap) !== "undefined") mp.game.stats.statSetInt(mp.game.joaat("SP0_SHOOTING_ABILITY"), myBlocks.skills.weap, false); // Стрельба
		}
	}
	mp.game.stats.statSetInt(mp.game.joaat("SP0_LUNG_CAPACITY"), 1, false); // Объём лёгких
	mp.game.stats.statSetInt(mp.game.joaat("SP0_WHEELIE_ABILITY"), 100, false); // На заднем колесе
	mp.game.stats.statSetInt(mp.game.joaat("SP0_FLYING_ABILITY"), 100, false); // Полёты
	mp.game.stats.statSetInt(mp.game.joaat("SP0_STEALTH_ABILITY"), 1, false); // Скрытность
	
	localPlayer.setMinGroundTimeForStungun(30000); // TAZER TIME
	
	localPlayer.setConfigFlag(149, true); // Что бы кепка не слетала
	
	mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE"); // Отключаем звуки окружения
	
	localPlayer.setHelmet(false); // не надевать шлем автоматически
	localPlayer.setCanBeKnockedOffVehicle(1); // Не падать с мото
	
	mp.game.ped.setPedDensityMultiplierThisFrame(0); // Убираем сток трафик
	mp.game.streaming.setPedPopulationBudget(0); // Убираем сток трафик
	mp.game.streaming.setVehiclePopulationBudget(0); // Убираем сток трафик
}

mp.keys.bind(0x54, true, function() { // T Key (CHAT)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x54)) return false;
	
	if(hud_browser) {
		if(Date.now() - afChat < 800) return false;
		hud_browser.execute('activateChatInput(\'forall\');');
		allowBinds = [];
	}
});

mp.keys.bind(0x59, true, function() { // Y Key (Clan-CHAT)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x59)) return false;
	
	if(hud_browser) {
		if(Date.now() - afChat < 800) return false;
		hud_browser.execute('activateChatInput(\'fraction\');');
		allowBinds = [];
	}
});

mp.keys.bind(0x48, true, function() { // H Key
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x48)) return false;
	
	if(hideHud) {
		/*if (!hud_browser) {
			hud_browser = mp.browsers.new("package://CEF/hud/index.html");
			hud_browser.execute('newcfg(0,0); newcfg(1,0); newcfg(2,0); newcfg(3,1);');
			restoreBinds();
		}*/
		if(cruiseControl) {
			cruiseControl = false;
			mp.game.ui.notifications.show("~w~Круиз контроль ~r~выключен", false, 18, 2);
		}
		
		if(!camHack) mp.game.ui.displayRadar(true);
		else mp.game.ui.displayRadar(false);
		hideHud = false;
	}else{
		/*if(hud_browser) {
			hud_browser.destroy();
			delete hud_browser;
		}*/
		mp.game.ui.displayRadar(false);
		hideHud = true;
	}
});

mp.keys.bind(0x78, true, function() { // F9 CamHack
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x78)) return false;
	
	if(Date.now() - afCamhack < 1500) return false;
	afCamhack = Date.now();
	
	if(typeof(localPlayer.getVariable("player.status")) === "undefined") return false;
	
	if(!camHack) {
		if(!hud_browser) return false;
		
		if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			let myFraction = localPlayer.getVariable("player.fraction");
			for (var i in clanZones) {
				let tempZone = clanZones[i];
				if(typeof(tempZone.war.id) !== "undefined") {
					if(tempZone.own.id == myFraction.id || tempZone.war.id == myFraction.id) return notyAPI.error("Кам-хак недоступен во время капта.", 3000, true);
				}
			}
		}
		
		if(inCasino) return notyAPI.error("Кам-хак недоступен в казино.", 3000, true);
		
		if(localPlayer.vehicle) {
			let theVeh = localPlayer.vehicle;
			if(theVeh.getSpeed() < 3.0) primarySpeedLimit = 0.1;
		}
		
		camHack = true;
		allowBinds = [0x78,0x48];
	}else{
		if(localPlayer.vehicle) {
			let theVeh = localPlayer.vehicle;
			if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
				let vehHash = theVeh.getVariable("veh.hash");
				
				let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
				decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
				
				let vehMaxSpeed = 400;
				if(typeof(decVehStats[0][vehHash]) !== "undefined") vehMaxSpeed = parseInt(decVehStats[0][vehHash].maxSpeed);
				if(imInZZ) {
					if(imInZZ == "ekxZZ") primarySpeedLimit = 70;
				}else{
					primarySpeedLimit = false;
				}
				if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
				else theVeh.setMaxSpeed(vehMaxSpeed*0.277);
			}
		}
		
		camHack = false;
		restoreBinds();
	}
	
	if(camHack) mp.game.ui.displayRadar(false);
	else mp.game.ui.displayRadar(true);
	if(hud_browser) hud_browser.execute('toggleCamHack('+camHack+');');
	
	//mp.events.call("Event_SetFreecamState", camHack);
	mp.events.callLocal("Event_SetFreecamState", camHack, localPlayer.getVariable("player.status"));
});

mp.events.add("setFreeCamSettings", (params) => {
	if(params !== undefined) {
		if(hud_browser) hud_browser.execute('setFreeCamSettings('+params+');');
	}
});

mp.keys.bind(0x4A, true, function() { // Крыша кабриолета
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x4A)) return false;
	if(localPlayer.vehicle && vehSeat == -1) {
		let theVeh = localPlayer.vehicle;
		let roofState =  theVeh.getConvertibleRoofState();
		if(roofState === 0) {
			theVeh.lowerConvertibleRoof(false);
		}else if (roofState === 2) {
			theVeh.raiseConvertibleRoof(false);
		}
	}
});

var waitVehActions = {"fix":false,"flip":false,"lights":false,"engine":false,"doors":false,"neon":false,"flashers":false};
function waitVehActionsRemove(theType) {
	if(typeof(theType) !== "undefined") {
		if(typeof(waitVehActions[theType]) !== "undefined") {
			waitVehActions[theType] = false;
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * waitVehActions["+theType+"] = false</span>");
		}
	}
}
mp.events.add("waitVehActionsRemove", waitVehActionsRemove);

mp.keys.bind(0x31, true, function() { // Починка транспорта
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x31)) return false;
	if(localPlayer.isDead()) return false;
	
	let theVeh = localPlayer.vehicle;
	if(theVeh) {
		if(Date.now() - afFix < 1000) return false;
		
		if(vehSeat != -1) return false;
		if(theVeh.getSpeed() > 60) return mp.game.ui.notifications.showWithPicture("Знакомый механик", "Воу, по-медленее", "Починить транспорт на такой скорости? Ты в своём уме?", "CHAR_MECHANIC", 1, false, 1, 2);
		
		afFix = Date.now();
		
		theVeh.setDirtLevel(0);
		if(theVeh.getHealth() <= 975) {
			//waitVehActions.fix = true;
			mp.events.callRemote('keypress:1');
		}else{
			theVeh.setFixed();
		}
		if(typeof(trailersPool) !== "undefined") {
			if(typeof(trailersPool[theVeh.handle.toString()]) !== "undefined") {
				if(typeof(trailersPool[theVeh.handle.toString()].trailer) !== "undefined") {
					if(mp.vehicles.exists(trailersPool[theVeh.handle.toString()].trailer)) {
						trailersPool[theVeh.handle.toString()].trailer.setFixed();
						mp.game.invoke("0x95CF53B3D687F9FA", trailersPool[theVeh.handle.toString()].trailer.handle); // SET_TRAILER_LEGS_RAISED
					}
				}
			}
		}
	}else{
		if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			let playerInv = localPlayer.getVariable("player.inv");
			if(typeof(playerInv.f1) !== "undefined") {
				if(typeof(playerInv.instrument) === "undefined") {
					if(fastUseSlotsTiming <= 0 && !inventorySaving) invUse("f1", JSON.stringify(playerInv.f1), false, JSON.stringify(playerInv));
				}else{
					notyAPI.error("Уберите инструмент что бы использовать быстрый доступ.", 3000, true);
				}
			}
		}
	}
});

mp.keys.bind(0x32, true, function() { // Флип транспорта
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x32)) return false;
	if(localPlayer.isDead()) return false;
	
	let theVeh = localPlayer.vehicle;
	if(theVeh) {
		if(vehSeat != -1) return false;
		if(Date.now() - afFlip < 1000) return false;
		if(theVeh.getSpeed() > 5) return mp.game.ui.notifications.showWithPicture("Знакомый механик", "Воу, по-медленее", "Флипнуть транспорт на такой скорости? Невозможно.", "CHAR_MECHANIC", 1, false, 1, 2);
		afFlip = Date.now();
		//if(!waitVehActions.flip) {
			//waitVehActions.flip = true;
			mp.events.callRemote('keypress:2');
		//}
	}else{
		if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			let playerInv = localPlayer.getVariable("player.inv");
			if(typeof(playerInv.f2) !== "undefined") {
				if(typeof(playerInv.instrument) === "undefined") {
					if(fastUseSlotsTiming <= 0 && !inventorySaving) invUse("f2", JSON.stringify(playerInv.f2), false, JSON.stringify(playerInv));
				}else{
					notyAPI.error("Уберите инструмент что бы использовать быстрый доступ.", 3000, true);
				}
			}
		}
	}
});

mp.keys.bind(0x33, true, function() { // Оптика транспорта
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x33)) return false;
	if(localPlayer.isDead()) return false;
	
	if(Date.now() - afLight < 1000) return false;
	
	let theVeh = localPlayer.vehicle;
	if(theVeh) {
		if(vehSeat != -1) return false;
		if(theVeh.getVariable("veh.hash")) {
			if(theVeh.getVariable("veh.hash") != "faggio") {
				if(typeof(localPlayer.getVariable('player.lics')) !== "undefined") {
					let myLics = {};
					if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
					let myLicsAsked = false;
					if(theVeh.getClass() == 15) {
						if(myLics["heliCat"] === undefined) return false;
						myLicsAsked = true;
					}else if(theVeh.getClass() == 8 || theVeh.getClass() == 13) {
						if(myLics["aCat"] === undefined) return false;
						myLicsAsked = true;
					}
					if(myLics["bCat"] === undefined && !myLicsAsked) return false;
				}
			}
		}else{
			if(typeof(localPlayer.getVariable('player.lics')) !== "undefined") {
				let myLics = {};
				if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
				let myLicsAsked = false;
				if(theVeh.getClass() == 15) {
					if(myLics["heliCat"] === undefined) return false;
					myLicsAsked = true;
				}else if(theVeh.getClass() == 8 || theVeh.getClass() == 13) {
					if(myLics["aCat"] === undefined) return false;
					myLicsAsked = true;
				}
				if(myLics["bCat"] === undefined && !myLicsAsked) return false;
			}
		}
		
		afLight = Date.now();
		
		if(hud_browser) hud_browser.execute('playSound("lights", "0.05");');
		//if(!waitVehActions.lights) {
			//waitVehActions.lights = true;
			mp.events.callRemote('keypress:3');
		//}
	}else{
		if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			let playerInv = localPlayer.getVariable("player.inv");
			if(typeof(playerInv.f3) !== "undefined") {
				if(typeof(playerInv.instrument) === "undefined") {
					if(fastUseSlotsTiming <= 0 && !inventorySaving) invUse("f3", JSON.stringify(playerInv.f3), false, JSON.stringify(playerInv));
				}else{
					notyAPI.error("Уберите инструмент что бы использовать быстрый доступ.", 3000, true);
				}
			}
		}
	}
});

mp.keys.bind(0x34, true, function() { // Двигатель транспорта
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x34)) return false;
	if(localPlayer.isDead()) return false;
	
	if(Date.now() - afEngine < 1000) return false;
	
	mp.game.audio.setRadioToStationName("OFF");
	mp.game.invoke("0xF7F26C6E9CC9EBB8", false); // SET_FRONTEND_RADIO_ACTIVE
	
	let theVeh = localPlayer.vehicle;
	if(theVeh) {
		if(vehSeat != -1) return false;
		afEngine = Date.now();
		
		if(typeof(theVeh.getVariable("vehicle.engine") !== "undefined")) {
			if(typeof(theVeh.getVariable("veh.grabTruck")) !== "undefined") {
				if(!theVeh.getVariable("veh.grabTruck")) {
					if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
						if(localPlayer.getVariable("player.fraction")) {
							myFraction = localPlayer.getVariable("player.fraction");
							if(typeof(myFraction.name) === "undefined") return notyAPI.error("Угнать этот грузовик можно только находясь в клане.", 3000, true);
						}
					}
				}
			}
			if(typeof(theVeh.getVariable("veh.hash") !== "undefined")) {
				if(theVeh.getVariable("veh.hash") == "faggio") return false;
			}
			
			if(typeof(theVeh.getVariable('veh.school')) === "undefined") {
				if(typeof(localPlayer.getVariable('player.lics')) === "undefined") return notyAPI.error("Технические неполадки системы лицензий.", 3000, true);
				let myLics = {};
				if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
				let myLicsAsked = false;
				if(theVeh.getClass() == 15) {
					if(myLics["heliCat"] === undefined) return notyAPI.error("У Вас отсутствует право управление техникой класса «Вертолёт».", 3000, true);
					myLicsAsked = true;
				}else if(theVeh.getClass() == 8 || theVeh.getClass() == 13) {
					if(myLics["aCat"] === undefined) return notyAPI.error("У Вас отсутствуют водительские права категории «A».", 3000, true);
					myLicsAsked = true;
				}
				if(myLics["bCat"] === undefined && !myLicsAsked) return notyAPI.error("У Вас отсутствуют водительские права категории «B».", 3000, true);
				if(typeof(theVeh.getVariable("veh.fuel")) !== "undefined") {
					if(!theVeh.getVariable("vehicle.engine")) {
						let fuelData = JSON.parse(theVeh.getVariable("veh.fuel"));
						if(parseInt(fuelData.value) <= 0) return notyAPI.error("В баке нет топлива, двигатель не завёлся.", 3000, true);
					}
				}
				//if(!waitVehActions.engine) {
					//waitVehActions.engine = true;
					if(theVeh.getIsEngineRunning()) mp.events.callRemote('keypress:4', false);
					else mp.events.callRemote('keypress:4', true);
				//}
			}else{
				//if(!waitVehActions.engine) {
					//waitVehActions.engine = true;
					if(theVeh.getIsEngineRunning()) mp.events.callRemote('keypress:4', false);
					else mp.events.callRemote('keypress:4', true);
				//}
			}
		}
	}else{
		if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			let playerInv = localPlayer.getVariable("player.inv");
			if(typeof(playerInv.f4) !== "undefined") {
				if(typeof(playerInv.instrument) === "undefined") {
					if(fastUseSlotsTiming <= 0 && !inventorySaving) invUse("f4", JSON.stringify(playerInv.f4), false, JSON.stringify(playerInv));
				}else{
					notyAPI.error("Уберите инструмент что бы использовать быстрый доступ.", 3000, true);
				}
			}
		}
	}
});

mp.keys.bind(0x35, true, function() { // Двери транспорта
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x35)) return false;
	if(localPlayer.isDead()) return false;
	
	if(Date.now() - afDoors < 2000) return false;
	afDoors = Date.now();
	
	if(localPlayer.vehicle) {
		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		let theVeh = localPlayer.vehicle;
		if(vehSeat != -1) return false;
		if(theVeh.getVariable("veh.id") >= 0 && theVeh.getVariable("veh.own")) {
			if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')))) {
				let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
				if(vehOwn.remoteId.toString() == localPlayer.remoteId.toString()) {
					let vehID = theVeh.getVariable("veh.id");
					let vehName = "Транспорта";
					if(theVeh.getVariable("veh.hash")) {
						let vehHash = theVeh.getVariable("veh.hash");
						if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
						else vehName = vehHash;
					}
					if(hud_browser) hud_browser.execute('playSound("lock", "0.1");');
					mp.events.callRemote('doorsVeh', '[{"id":"'+vehID+'","name":"'+vehName+'"}]');
				}
			}
		}
	}else{
		let myPos = localPlayer.position;
		let findedVeh = false;
		
		mp.vehicles.forEachInStreamRange(
			(theVeh, id) => {
				let vehPos = theVeh.position;
				if(mp.game.system.vdist2(vehPos.x, vehPos.y, vehPos.z, myPos.x, myPos.y, myPos.z) < 5) {
					if(typeof(theVeh.getVariable("veh.id")) !== "undefined" && typeof(theVeh.getVariable("veh.own")) !== "undefined") {
						if(theVeh.getVariable("veh.id") >= 0 && theVeh.getVariable("veh.own")) {
							if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')))) {
								let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
								if(vehOwn.remoteId.toString() == localPlayer.remoteId.toString()) findedVeh = theVeh;
							}
						}
					}
				}
			}
		);
		
		if(findedVeh) {
			if(mp.vehicles.exists(findedVeh)) {
				if(typeof(findedVeh.getVariable("veh.id")) !== "undefined") {
					let vehID = findedVeh.getVariable("veh.id");
					let vehName = "Транспорта";
					if(typeof(findedVeh.getVariable("veh.hash")) !== "undefined") {
						let vehHash = findedVeh.getVariable("veh.hash");
						let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
						decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
						if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
						else vehName = vehHash;
					}
					if(hud_browser) hud_browser.execute('playSound("lock", "0.1");');
					//if(!waitVehActions.doors) {
						//waitVehActions.doors = true;
						mp.events.callRemote('doorsVeh', '[{"id":"'+vehID+'","name":"'+vehName+'"}]');
					//}
				}
			}
		}else{
			if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
				let playerInv = localPlayer.getVariable("player.inv");
				if(typeof(playerInv.f5) !== "undefined") {
					if(typeof(playerInv.instrument) === "undefined") {
						if(fastUseSlotsTiming <= 0 && !inventorySaving) invUse("f5", JSON.stringify(playerInv.f5), false, JSON.stringify(playerInv));
					}else{
						notyAPI.error("Уберите инструмент что бы использовать быстрый доступ.", 3000, true);
					}
				}
			}
		}
	}
});

var canBeKnockedOffVehicle = false;
mp.keys.bind(0x36, true, function() { // Ремень безопасности
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x36)) return false;
	if(localPlayer.isDead()) return false;
	
	if(Date.now() - afSeatbelt < 1000) return false;
	afSeatbelt = Date.now();
	
	let theVeh = localPlayer.vehicle;
	if(theVeh) {
		if(theVeh.getClass() == 8 || theVeh.getClass() == 13) {
			if(!canBeKnockedOffVehicle) {
				mp.game.ui.notifications.show("~w~Вы ~h~~g~не будете падать с мото/вело", false, 18, 2);
				localPlayer.setConfigFlag(32, false);
				localPlayer.setCanBeKnockedOffVehicle(1); // Не падать с мото
				canBeKnockedOffVehicle = true;
				if(hud_browser) hud_browser.execute('playSound("seatbelt_on");');
			}else{
				mp.game.ui.notifications.show("~w~Вы ~h~~r~будете падать с мото/вело", false, 18, 2);
				localPlayer.setConfigFlag(32, true);
				localPlayer.setCanBeKnockedOffVehicle(0); // Падать с мото
				canBeKnockedOffVehicle = false;
				if(hud_browser) hud_browser.execute('playSound("seatbelt_off");');
			}
		}else{
			if(localPlayer.getConfigFlag(32, true)) {
				localPlayer.setConfigFlag(32, false);
				mp.game.ui.notifications.show("~w~Вы ~h~~g~пристегнули ремень безопасности", false, 18, 2);
				if(hud_browser) hud_browser.execute('playSound("seatbelt_on");');
			}else{
				localPlayer.setConfigFlag(32, true);
				mp.game.ui.notifications.show("~w~Вы ~h~~r~отстегнули ремень безопасности", false, 18, 2);
				if(hud_browser) hud_browser.execute('playSound("seatbelt_off");');
			}
		}
	}else{
		if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			let playerInv = localPlayer.getVariable("player.inv");
			if(typeof(playerInv.f6) !== "undefined") {
				if(typeof(playerInv.instrument) === "undefined") {
					if(fastUseSlotsTiming <= 0 && !inventorySaving) invUse("f6", JSON.stringify(playerInv.f6), false, JSON.stringify(playerInv));
				}else{
					notyAPI.error("Уберите инструмент что бы использовать быстрый доступ.", 3000, true);
				}
			}
		}
	}
});

mp.keys.bind(0x37, true, function() { // Неоновая подсветка
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x37)) return false;
	if(localPlayer.isDead()) return false;
	
	if(Date.now() - afNeon < 1000) return false;
	afNeon = Date.now();
	
	let theVeh = localPlayer.vehicle;
	if(!theVeh) return false;
	if(vehSeat != -1) return false;
	
	if(typeof(theVeh.getVariable("veh.params")) !== "undefined" && typeof(theVeh.getVariable("veh.id")) !== "undefined" && typeof(theVeh.getVariable("veh.own")) !== "undefined") {
		let vehParams = JSON.parse(theVeh.getVariable("veh.params"));
		if(typeof(vehParams.neon) !== "undefined") {
			if(theVeh && theVeh.getIsEngineRunning()) {
				//if(!waitVehActions.neon) {
					//waitVehActions.neon = true;
					if(theVeh.isNeonLightEnabled(0) || theVeh.isNeonLightEnabled(1) || theVeh.isNeonLightEnabled(2) || theVeh.isNeonLightEnabled(3)) {
						mp.events.callRemote('keypress:7', false);
						mp.game.ui.notifications.show("~w~Вы ~h~~r~выключили неоновую подсветку", false, 18, 2);
						if(hud_browser) hud_browser.execute('playSound("lights", "0.05");');
					}else{
						mp.events.callRemote('keypress:7', true);
						mp.game.ui.notifications.show("~w~Вы ~h~~g~включили неоновую подсветку", false, 18, 2);
						if(hud_browser) hud_browser.execute('playSound("lights", "0.05");');
					}
				//}
			}
		}else{
			notyAPI.error("Неоновая подсветка отсутствует, установите в Los Santos Customs.", 3000, true);
		}
	}
});

mp.keys.bind(0x4B, true, function() { // Круиз-контроль
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x4B)) return false;
	if(localPlayer.isDead() || hideHud) return false;
	
	if(vehSeat != -1) return false;
	if(!localPlayer.vehicle) return false;
	
	if(Date.now() - afCruise < 800) return false;
	afCruise = Date.now();
	
	let theVeh = localPlayer.vehicle;
	let vehClass = theVeh.getClass().toString();
	if(vehClass == "0" || parseInt(vehClass) <= 12 && parseInt(vehClass) != 8 && parseInt(vehClass) != 9 || (parseInt(vehClass) >= 17 && parseInt(vehClass) <= 20)) {
		if(theVeh) {
			if(!cruiseControl) {
				if(theVeh.steeringAngle < -1 || theVeh.steeringAngle > 1) return notyAPI.error("Круиз можно активировать только на прямых колёсах.", 3000, true);
				cruiseControl = theVeh.getSpeed()*0.277;
			}else{
				cruiseControl = false;
			}
		}
	}else{
		notyAPI.error("На данном виде транспорта круиз недоступен.", 3000, true);
	}
});

var autoPilot = {};
var afAnchor = Date.now();

mp.keys.bind(0x4A, true, function() { // Автопилот
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x4A)) return false;
	if(localPlayer.isDead()) return false;
	
	if(vehSeat != -1) return false;
	if(!localPlayer.vehicle) return false;
	
	let theVeh = localPlayer.vehicle;
	if(theVeh) {
		let vehClass = theVeh.getClass().toString();
		if(vehClass == "0" || parseInt(vehClass) <= 12 && parseInt(vehClass) != 8 && parseInt(vehClass) != 9 || (parseInt(vehClass) >= 17 && parseInt(vehClass) <= 20)) {
			if(Date.now() - afAutopilot < 800) return false;
			afAutopilot = Date.now();
			if(typeof(autoPilot.speed) === "undefined") {
				if(typeof(theVeh.getVariable("veh.fuel")) === "undefined") return notyAPI.error("Автопилот недоступен для данного транспорта.", 3000, true);
				let vehFuel = JSON.parse(theVeh.getVariable("veh.fuel"));
				if(typeof(vehFuel["type"]) === "undefined") return notyAPI.error("Автопилот недоступен для данного транспорта.", 3000, true);
				if(vehFuel["type"] != "electro") return notyAPI.error("Автопилот доступен только для электро-транспорта.", 3000, true);
				
				//cruiseControl = theVeh.getSpeed()*0.277;
				if(theVeh.steeringAngle < -1 || theVeh.steeringAngle > 1) return notyAPI.error("Автопилот можно активировать только на прямых колёсах.", 3000, true);
				if(!theVeh.getIsEngineRunning()) return false; // проверка двигателя
				
				if(mp.game.invoke('0x1DD1F58F493F1DA5')) {
					let blipID 		= mp.game.invoke('0x186E5D252FA50E7D'); 		// _GET_BLIP_INFO_ID_ITERATOR
					let firstBlip 	= mp.game.invoke('0x1BEDE233E6CD2A1F', blipID); // GET_FIRST_BLIP_INFO_ID
					let nextBlip 	= mp.game.invoke('0x14F96AA50D6FBEA7', blipID); // GET_NEXT_BLIP_INFO_ID

					for(let i = firstBlip; mp.game.invoke('0xA6DB27D19ECBB7DA', i) != 0; i = nextBlip) { // DOES_BLIP_EXIST
						if(mp.game.invoke('0xBE9B0959FFD0779B', i) == 4) { // GET_BLIP_INFO_ID_TYPE
							let coord = mp.game.ui.getBlipInfoIdCoord(i);
							if(coord) {
								if(typeof(autoPilot.interval) !== "undefined") clearInterval(autoPilot.interval);
								cruiseControl = false;
								autoPilot["speed"] = 35;
								autoPilot["veh"] = theVeh;
								autoPilot["coord"] = coord;
								localPlayer.taskVehicleDriveToCoordLongrange(autoPilot.veh.handle, autoPilot.coord.x, autoPilot.coord.y, 0.0, autoPilot["speed"], 2883621, 40.0);
								autoPilot["interval"] = setInterval(() => {
									if(mp.vehicles.exists(autoPilot.veh)) {
										if(mp.game.invoke('0x1DD1F58F493F1DA5')) {
											localPlayer.taskVehicleDriveToCoordLongrange(autoPilot.veh.handle, autoPilot.coord.x, autoPilot.coord.y, 0.0, autoPilot["speed"], 2883621, 40.0);
											if(typeof(curCourierTask) !== "undefined") {
												if(typeof(curCourierTask.workTimer) !== "undefined") {
													localPlayer.clearTasks();
													if(typeof(autoPilot.interval) !== "undefined") clearInterval(autoPilot.interval);
													if(autoPilot.veh.handle != 0) localPlayer.taskVehicleTempAction(autoPilot.veh.handle, 27, 1e4);
													autoPilot = {};
												}
											}
										}else{
											if(hud_browser) hud_browser.execute('playSound("autoPilotStop", "0.15");');
											localPlayer.clearTasks();
											if(typeof(autoPilot.interval) !== "undefined") clearInterval(autoPilot.interval);
											if(autoPilot.veh.handle != 0) localPlayer.taskVehicleTempAction(autoPilot.veh.handle, 27, 1e4);
											autoPilot = {};
										}
									}else{
										localPlayer.clearTasks();
										if(typeof(autoPilot.interval) !== "undefined") clearInterval(autoPilot.interval);
										if(autoPilot.veh.handle != 0) localPlayer.taskVehicleTempAction(autoPilot.veh.handle, 27, 1e4);
										autoPilot = {};
									}
								}, 300);
								mp.game.graphics.notify("~g~Автопилот активирован");
								if(hud_browser) hud_browser.execute('playSound("autoPilotStart", "0.15");');
							}
							
							return;
						}
					}
				}else{
					if(hud_browser) hud_browser.execute('playSound("autoPilotWayPoint", "0.15");');
					notyAPI.error("Вы не указали конечную точку для автопилота.", 3000, true);
					return notyAPI.error("Установите Waypoint на глобальной карте через ESC.", 3000, true);
				}
			}else{
				mp.game.graphics.notify("~r~Автопилот деактивирован");
				localPlayer.clearTasks();
				if(typeof(autoPilot.interval) !== "undefined") clearInterval(autoPilot.interval);
				if(theVeh.handle != 0) localPlayer.taskVehicleTempAction(theVeh.handle, 27, 1e4);
				autoPilot = {};
			}
		}else{
			if(parseInt(vehClass) == 14) {
				if(Date.now() - afAutopilot < 2000) return false;
				afAutopilot = Date.now();
				if(!theVeh.getVariable("veh.anchor")) {
					if(!theVeh.isInWater()) return notyAPI.error("Водный транспорт должен быть на воде, что бы <b>бросить якорь</b>.", 3000, true);
					if(theVeh.getSpeed() > 3) return notyAPI.error("Водный транспорт должен быть остановлен, что бы <b>бросить якорь</b>.", 3000, true);
					mp.events.callRemote('toggleVehAnchor', true);
					notyAPI.success("Вы успешно <b>бросили якорь</b> в данном месте, навигация остановлена.", 3000, true);
					if(hud_browser) hud_browser.execute('playSound("anchorDrop", "0.25");');
				}else{
					mp.events.callRemote('toggleVehAnchor', false);
					notyAPI.success("Вы успешно <b>достали якорь</b>, продолжайте навигацию.", 3000, true);
					if(hud_browser) hud_browser.execute('playSound("anchorUp", "0.25");');
				}
			}else{
				notyAPI.error("На данном виде транспорта авто-пилот недоступен.", 3000, true);
			}
		}
	}
});

var tabPanel = false;
mp.keys.bind(0x09, true, function() { // TAB Панель
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x09)) return false;
	if(localPlayer.isDead()) return false;
	
	if(hud_browser) {
		if(tabPanel) {
			closeTabPanel();
		}else{
			if(Date.now() - afTabPanel < 2500) return false;
			afTabPanel = Date.now();
			
			if(localPlayer.getVariable("player.id")) {
				hud_browser.execute('toggleTabPanel(true);');
				
				mp.gui.cursor.visible = true;
				tabPanel = true;
				
				allowBinds = [0x09];
				
				mp.game.graphics.startScreenEffect("TinyRacerIntroCam", 0, true);
				
				let resArray = {};
				
				// Я

				/*let vehsJSON = {};
				vehsJSON["count"] = 0;
				if(localPlayer.getVariable('player.vehs')) vehsJSON = localPlayer.getVariable('player.vehs');
				if(!vehsJSON.count) vehsJSON["count"] = 0;*/
				
				/*let housesJSON = {};
				housesJSON["count"] = 0;
				if(localPlayer.getVariable('player.houses')) housesJSON = localPlayer.getVariable('player.houses');
				if(!housesJSON.count) housesJSON["count"] = 0;*/
				
				/*let businessesJSON = {};
				businessesJSON["count"] = 0;
				if(localPlayer.getVariable('player.businesses')) businessesJSON = localPlayer.getVariable('player.businesses');
				if(!businessesJSON.count) businessesJSON["count"] = 0;*/
				
				// Фраки
				
				let counter = 0;
				let players = [];
				
				resArray["fractions"] = {};
				if(typeof(mp.world.data.fractions) !== "undefined") resArray["fractions"] = mp.world.data.fractions;
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(resArray["fractions"])+"</span>");
				
				let myFractionName = "Не состоит", myFractionRank = "Не состоит";
				if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
					let playerFraction = localPlayer.getVariable("player.fraction");
					if(typeof(playerFraction.id) !== "undefined" && typeof(playerFraction.name) !== "undefined" && typeof(playerFraction.rank) !== "undefined") {
						myFractionName = playerFraction.name;
						let mRank = playerFraction.rank;
						if(typeof(resArray["fractions"][playerFraction.id]) !== "undefined") {
							let fracData = resArray["fractions"][playerFraction.id];
							if(typeof(fracData.settings[mRank.toString()]) !== "undefined") {
								if(typeof(fracData.settings[mRank.toString()].name) !== "undefined") myFractionRank = fracData.settings[mRank.toString()].name;
							}
						}
					}
				}
				
				resArray["myData"] = {
					"id":localPlayer.getVariable("player.id"),
					"nick":localPlayer.getVariable("player.nick"),
					"money":localPlayer.getVariable("player.money"),
					"bank":localPlayer.getVariable("player.bank"),
					"fracName":myFractionName.toLowerCase(),
					"fracRank":myFractionRank.toLowerCase(),
					"lvl":localPlayer.getVariable("player.blocks"),
					"drift":localPlayer.getVariable("player.drift") ? localPlayer.getVariable("player.drift") : "0"
					//"vehs":vehsJSON.count,
					//"houses":housesJSON.count,
					//"businesses":businessesJSON.count
				};
				if(localPlayer.getVariable("player.job")) resArray["myData"]["job"] = localPlayer.getVariable("player.job");
				
				// Игроки
				
				mp.players.forEach(
					(player, id) => {
						if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined" && typeof(player.getVariable("player.status")) !== "undefined" && typeof(player.getVariable("player.blocks")) !== "undefined") {
							let playerFractionName = "Не состоит", playerFractionRank = "Не состоит";
							
							if(typeof(player.getVariable("player.fraction")) !== "undefined") {
								let playerFraction = player.getVariable("player.fraction");
								if(typeof(playerFraction.name) !== "undefined") {
									playerFractionName = playerFraction.name;
									let mRank = playerFraction.rank;
									if(typeof(playerFraction.id) !== "undefined" && typeof(playerFraction.name) !== "undefined" && typeof(playerFraction.rank) !== "undefined") {
										if(typeof(resArray["fractions"][playerFraction.id]) !== "undefined") {
											let fracData = resArray["fractions"][playerFraction.id];
											if(typeof(fracData.settings) !== "undefined") {
												if(typeof(fracData.settings[mRank.toString()]) !== "undefined") {
													if(typeof(fracData.settings[mRank.toString()].name) !== "undefined") playerFractionRank = fracData.settings[mRank.toString()].name;
												}
											}
											if(typeof(fracData.members) !== "undefined") {
												let fractionMembers = fracData.members;
												for (var i in fractionMembers) {
													if(i.toString() == player.getVariable("player.id").toString()) fractionMembers[i.toString()]["online"] = true;
												}
											}
										}
									}
								}
							}
							
							let tempArray = {};
							
							let blocks = player.getVariable("player.blocks");
							tempArray["id"] = parseInt(player.getVariable("player.id"));
							tempArray["nick"] = player.getVariable("player.nick").toString();
							if(player.getVariable("player.job")) tempArray["job"] = player.getVariable("player.job");
							tempArray["money"] = player.getVariable("player.money").toString();
							tempArray["bank"] = player.getVariable("player.bank").toString();
							tempArray["fracName"] = playerFractionName.toLowerCase();
							tempArray["fracRank"] = playerFractionRank.toLowerCase();
							tempArray["lvl"] = blocks;
							tempArray["level"] = blocks.lvl;
							tempArray["hours"] = blocks.mins;
							tempArray["drift"] = player.getVariable("player.drift") ? player.getVariable("player.drift") : "0";
							
							tempArray["status"] = 0;
							if(typeof(player.getVariable("player.status")) !== "undefined") {
								let tempPlayerStatus = player.getVariable("player.status");
								if(tempPlayerStatus == "genadm") tempArray["status"] = 5;
								else if(tempPlayerStatus == "admin") tempArray["status"] = 4;
								else if(tempPlayerStatus == "moder") tempArray["status"] = 3;
								else if(tempPlayerStatus == "helper") tempArray["status"] = 2;
								else if(typeof(blocks.premium) !== "undefined") tempArray["status"] = 1;
							}
							
							/*let vehsJSONsel = {};
							vehsJSONsel["count"] = 0;
							if(player.getVariable('player.vehs')) vehsJSONsel = player.getVariable('player.vehs');
							if(!vehsJSONsel.count) vehsJSONsel["count"] = 0;
							tempArray["vehs"] = vehsJSONsel["count"];*/
							
							/*let housesJSONsel = {};
							housesJSONsel["count"] = 0;
							if(player.getVariable('player.houses')) housesJSONsel = player.getVariable('player.houses');
							if(!housesJSONsel.count) housesJSONsel["count"] = 0;
							tempArray["houses"] = housesJSONsel["count"];*/
							
							/*let businessesJSONsel = {};
							businessesJSONsel["count"] = 0;
							if(player.getVariable('player.businesses')) businessesJSONsel = player.getVariable('player.businesses');
							if(!businessesJSONsel.count) businessesJSONsel["count"] = 0;
							tempArray["businesses"] = businessesJSONsel["count"];*/
							
							tempArray["deaths"] = "0";
							tempArray["kills"] = "0";
							
							players.push(tempArray);
							counter++;
						}
					}
				);
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(players)+"</span>");
				
				let tempFracArray = [];
				for(var k in resArray["fractions"]) {
					resArray["fractions"][k].id = k;
					tempFracArray.push(resArray["fractions"][k]);
					//chatAPI.sysPush(JSON.stringify(resArray["fractions"][k]));
				}
				resArray["fractions"] = tempFracArray;
				//chatAPI.sysPush(JSON.stringify(resArray["fractions"]));
				
				/*
				for (let i = 500; i <= 593; i++) {
					let tempArray = {};
					tempArray["id"] = i;
					
					var abc = "abcdefghijklmnopqrstuvwxyz";
					var rs = "";
					while (rs.length < 6) {
						rs += abc[Math.floor(Math.random() * abc.length)];
					}
					rs = rs[0].toUpperCase() + rs.slice(1);
					tempArray["nick"] = rs;
					tempArray["job"] = {"name":"winery","rank":7};
					tempArray["money"] = getRandomInt(0,2000000).toString();
					tempArray["lvl"] = "0";
					tempArray["drift"] = getRandomInt(0,1000000).toString();;
					
					tempArray["vehs"] = getRandomInt(0,10);
					tempArray["houses"] = getRandomInt(0,3);
					tempArray["businesses"] = getRandomInt(0,3);
					
					tempArray["deaths"] = "0";
					tempArray["kills"] = "0";
					
					players.push(tempArray);
					counter++;
				}
				*/
				
				resArray["count"] = counter.toString();
				resArray["players"] = players;
				
				resArray["mystatus"] = "player";
				if(typeof(localPlayer.getVariable("player.status")) !== "undefined") resArray["mystatus"] = localPlayer.getVariable("player.status").toString();
				
				hud_browser.execute("refreshTabPanel('"+JSON.stringify(resArray)+"');");
			}
		}
	}
});

function closeTabPanel() {
	if(tabPanel && hud_browser) {
		hud_browser.execute('toggleTabPanel();');
		mp.gui.cursor.visible = false;
		tabPanel = false;
		restoreBinds();
		mp.game.graphics.stopScreenEffect("TinyRacerIntroCam");
	}
}
mp.events.add("closeTabPanel", closeTabPanel);

var helpWindow = false;
mp.keys.bind(0x79, true, function() { // F10 Меню (Окно помощи)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x79)) return false;
	if(localPlayer.isDead()) return false;
	
	if(hud_browser) {
		if(helpWindow) {
			helpWindowClose();
		}else{
			hud_browser.execute('toggleHelpWindow(true);');
			mp.gui.cursor.visible = true;
			helpWindow = true;
			
			allowBinds = [0x79];
			
			mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
		}
	}
});

function helpWindowClose() {
	if(helpWindow && hud_browser) {
		hud_browser.execute('toggleHelpWindow();');
		mp.gui.cursor.visible = false;
		helpWindow = false;
		restoreBinds();
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
	}
}
mp.events.add("helpWindowClose", helpWindowClose);

var actMenu = false;
var actEntity = false, nearestObject = false;
var isAnimActive = false;
mp.keys.bind(0x5A, true, function() { // Z Меню (Меню анимаций и взаимодействий)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x5A)) return false;
	if(localPlayer.isDead()) return false;
	
	if(inCasino) return notyAPI.error("В казино панель анимаций недоступна.", 3000, true);
	
	let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
	decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
	
	if(hud_browser) {
		if(actMenu) {
			closeActMenu();
		}else{
			if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
				if(localPlayer.getVariable("active.deal")) return notyAPI.error("У Вас есть активная сделка, анимации и заимодействия недоступны.", 3000, true);
			}
			if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
				let playerBlocks = localPlayer.getVariable("player.blocks");
				if(typeof(playerBlocks.jail) !== "undefined") return notyAPI.error("Панель анимаций и заимодействий в тюрьме не доступна.", 3000, true);
			}
			if(localPlayer.isBeingStunned(0)) return notyAPI.error("Панель анимаций и заимодействий сейчас недоступна.", 3000, true);
			
			if(Date.now() - afActMenuPanel < 500) return false;
			afActMenuPanel = Date.now();
			
			if(imInZone) {
				if(typeof(mp.world.data.zones[imInZone]) !== "undefined") {
					let tempZone = mp.world.data.zones[imInZone];
					if(typeof(tempZone.war.id) !== "undefined") return notyAPI.error("Во время капта анимации не доступны на территории.", 3000, true);
				}
			}
			
			if(localPlayer.vehicle) {
				let vehData = {};
				if(vehSeat == -1) {
					let theVeh = localPlayer.vehicle;
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					vehData.name = "Транспорт";
					if(theVeh.getVariable("veh.hash")) {
						let vehHash = theVeh.getVariable("veh.hash");
						if(typeof(decVehStats[0][vehHash]) != "undefined") vehData.name = decVehStats[0][vehHash].name;
						else vehData.name = vehHash;
					}
					
					vehData.name = vehData.name.slice(0, 14)+".."
					
					if(theVeh.getVariable("veh.num")) {
						let numData = explode("|", theVeh.getVariable("veh.num"));
						let drawNum = true;
						if(numData == "theMoto") {
							vehData.number = "Без номера";
						}else{
							vehData.number = numData[0]+" | "+numData[1];
						}
					}else{
						vehData.number = "Без номера";
					}
					
					vehData.frac = false;
					if(typeof(theVeh.getVariable("veh.frac")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
						vehData.frac = theVeh.getVariable("veh.frac");
						let myFraction = localPlayer.getVariable("player.fraction");
						if(myFraction.name == vehData.frac) vehData.number = vehData.frac;
					}
					
					hud_browser.execute('setMenuTab(\'vehicle\', \''+JSON.stringify(vehData)+'\');');
				}else{
					hud_browser.execute('setMenuTab(\'vehicle\', \''+JSON.stringify(vehData)+'\');');
				}
			}else{
				if(!isAnimActive) {
					hud_browser.execute('setMenuTab(\'main\');');
				}else if(isAnimActive) {
					hud_browser.execute('setMenuTab(\'activeAnim\');');
				}
			}
			
			mp.game.graphics.startScreenEffect("DeathFailMPDark", 0, true);
			mp.gui.cursor.visible = true;
			actMenu = true;
			allowBinds = [0x5A];
		}
	}
});

var afVehFracToGarage = Date.now();
function vehFracToGarage() {
	if(actMenu && hud_browser) {
		closeActMenu();
		
		if(localPlayer.isDead()) return false;
		if(Date.now() - afActMenuPanel < 3500) return false;
		
		let theVeh = localPlayer.vehicle;
		
		if(!theVeh) return notyAPI.error("Вы должны быть в транспорте организации.", 3000, true);
		if(typeof(theVeh.getVariable("veh.frac")) === "undefined" || typeof(theVeh.getVariable("veh.hash")) === "undefined") return notyAPI.error("Вы должны быть в транспорте организации.", 3000, true);
		
		if(typeof(localPlayer.getVariable("player.fraction")) === "undefined") return notyAPI.error("Вы не состоите в данной организации.", 3000, true);
		let myFraction = localPlayer.getVariable("player.fraction");
		if(typeof(myFraction.name) === "undefined") return notyAPI.error("Вы не состоите в данной организации.", 3000, true);
		if(myFraction.name != theVeh.getVariable("veh.frac")) return notyAPI.error("Вы не состоите в данной организации.", 3000, true);
		
		if(inventoryPanel || inventorySaving || invCEFUpdating || dealerPanel || sellingInvSlot) return notyAPI.error("Сейчас есть активные операции с Вашим аккаунтом.", 3000, true);
		
		afVehFracToGarage = Date.now();
		mp.events.callRemote('vehFracToGarage', theVeh.remoteId.toString(), theVeh.getVariable("veh.frac"), theVeh.getVariable("veh.hash"));
		return notyAPI.info("Возвращаем данный транспорт в гараж организации.", 3000, true);
	}
}
mp.events.add("vehFracToGarage", vehFracToGarage);

function vehFracToGarageResult(result, reason) {
	if(hud_browser && typeof(result) !== "undefined" && typeof(reason) !== "undefined") {
		if(!result) notyAPI.error(reason, 3000, true);
		else notyAPI.success("Вы успешно убрали этот транспорт организации в гараж.", 3000, true);
	}
}
mp.events.add("vehFracToGarageResult", vehFracToGarageResult);

function delFracGars() {
	if(hud_browser) {
		if(fracgarPanel) closeFracgar();
		
		if(typeof(localPlayer.getVariable("player.fraction")) === "undefined") return notyAPI.error("Вы не состоите в организации.", 3000, true);
		let myFraction = localPlayer.getVariable("player.fraction");
		if(typeof(myFraction.name) === "undefined") return notyAPI.error("Вы не состоите в организации.", 3000, true);
		
		mp.events.callRemote('delFracGars');
		return notyAPI.info("Возвращаем все транспортные средства в гараж организации.", 3000, true);
	}
}
mp.events.add("delFracGars", delFracGars);

function delFracGarsResult(result, reason) {
	if(hud_browser && typeof(result) !== "undefined" && typeof(reason) !== "undefined") {
		if(!result) notyAPI.error(reason, 3000, true);
		else notyAPI.success("Вы успешно убрали весь транспорт организации в гараж.", 3000, true);
	}
}
mp.events.add("delFracGarsResult", delFracGarsResult);

/*
mp.game.streaming.requestAnimDict("random@robbery");
mp.game.streaming.requestAnimDict("amb@medic@standing@kneel@base");
mp.game.streaming.requestAnimDict("switch@michael@tv_w_kids");
mp.game.streaming.requestAnimDict("amb@world_human_picnic@male@base");
mp.game.streaming.requestAnimDict("missheistdockssetup1ig_10@base");
mp.game.streaming.requestAnimDict("rcmcollect_paperleadinout@");
mp.game.streaming.requestAnimDict("amb@world_human_push_ups@male@base");
mp.game.streaming.requestAnimDict("amb@world_human_sit_ups@male@base");
mp.game.streaming.requestAnimDict("rcmfanatic1maryann_stretchidle_b");
mp.game.streaming.requestAnimDict("rcmfanatic1");
mp.game.streaming.requestAnimDict("anim@mp_player_intupperknuckle_crunch");
mp.game.streaming.requestAnimDict("anim@arena@celeb@flat@solo@no_props@");
mp.game.streaming.requestAnimDict("timetable@denice@ig_1");
mp.game.streaming.requestAnimDict("amb@lo_res_idles@");
mp.game.streaming.requestAnimDict("misstrevor3_beatup");
mp.game.streaming.requestAnimDict("special_ped@mountain_dancer@monologue_3@monologue_3a");
mp.game.streaming.requestAnimDict("anim@amb@casino@mini@dance@dance_solo@female@var_a@");
mp.game.streaming.requestAnimDict("anim@amb@nightclub@lazlow@hi_podium@");
mp.game.streaming.requestAnimDict("anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_low_intensity");
mp.game.streaming.requestAnimDict("mini@strip_club@private_dance@part2");
mp.game.streaming.requestAnimDict("mini@strip_club@idles@dj@idle_04");
mp.game.streaming.requestAnimDict("anim@amb@nightclub@dancers@crowddance_groups@");
mp.game.streaming.requestAnimDict("anim@amb@nightclub@lazlow@hi_podium@");
mp.game.streaming.requestAnimDict("random@arrests@busted");
mp.game.streaming.requestAnimDict("anim@mp_player_intselfieblow_kiss");
mp.game.streaming.requestAnimDict("veh@driveby@first_person@driver@unarmed");
mp.game.streaming.requestAnimDict("anim@mp_player_intcelebrationfemale@face_palm");
mp.game.streaming.requestAnimDict("random@robbery");
mp.game.streaming.requestAnimDict("amb@code_human_in_car_mp_actions@rock@bodhi@rps@base");
mp.game.streaming.requestAnimDict("missfam5_yoga");
mp.game.streaming.requestAnimDict("timetable@amanda@ig_2");
mp.game.streaming.requestAnimDict("amb@world_human_stand_guard@male@base");
mp.game.streaming.requestAnimDict("amb@world_human_leaning@male@wall@back@legs_crossed@base");
mp.game.streaming.requestAnimDict("amb@world_human_hang_out_street@female_arms_crossed@base");
*/

let afVehEjectAll = false;
function vehEjectAll() {
	if(actMenu && hud_browser) {
		closeActMenu();
		
		if(localPlayer.isDead()) return false;
		if(afVehEjectAll) return false;
		if(!localPlayer.vehicle) return notyAPI.error("Вы должны быть в транспорте.", 3000, true);
		if(vehSeat != -1) return notyAPI.error("Вы должны быть за рулём.", 3000, true);
		
		let theVeh = localPlayer.vehicle;
		
		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		let vehName = "транспорта";
		if(theVeh.getVariable("veh.hash")) {
			let vehHash = theVeh.getVariable("veh.hash");
			if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
			else vehName = vehHash;
		}
		
		afVehEjectAll = true;
		setTimeout(() => { afVehEjectAll = false; }, 1000);
		
		notyAPI.success("Вы высадили всех из <b>"+vehName+"</b>.", 3000, true);
		mp.events.callRemote('vehEjectAll');
	}
}
mp.events.add("vehEjectAll", vehEjectAll);

function activateAnim(animData, isStop) {
	if(actMenu && hud_browser) {
		closeActMenu();
		if(typeof(animData) !== "undefined" && typeof(isStop) !== "undefined") {
			if(localPlayer.vehicle) return notyAPI.error("Анимации в транспорте недоступны.", 3000, true);
			if(isStop) {
				//localPlayer.clearTasksImmediately();
				mp.events.callRemote('playTheAnim', false, false, false, false, true);
				isAnimActive = false;
			}else if(animData) {
				animData = JSON.parse(animData);
				//localPlayer.clearTasksImmediately();
				//localPlayer.taskPlayAnim(animData.dict, animData.name, animData.blendInSpeed, animData.blendOutSpeed, animData.duration, animData.flag, animData.startOffset, animData.lockX, animData.lockY, animData.lockZ);
				mp.events.callRemote('playTheAnim', animData.dict, animData.name, 1.0, animData.flag, false);
				isAnimActive = {};
			}
		}
	}
}
mp.events.add("activateAnim", activateAnim);

function activateWalkStyle(walkStyle, walkName) {
	if(actMenu && hud_browser) {
		closeActMenu();
		if(typeof(walkStyle) !== "undefined" && typeof(walkName) !== "undefined") {
			if(walkStyle != "stock") {
				if(!mp.game.streaming.hasClipSetLoaded(walkStyle)) {
					mp.game.streaming.requestClipSet(walkStyle);
					setTimeout(() => { localPlayer.setMovementClipset(walkStyle, 0.25); }, 1500);
					//while(!mp.game.streaming.hasClipSetLoaded(walkStyle)) localPlayer.setMovementClipset(walkStyle, 0.25);
				}
				localPlayer.setMovementClipset(walkStyle, 0.25);
				notyAPI.success("Вы сменили стиль походки на <b>"+walkName+"</b>.", 3000, true);
			}else{
				localPlayer.resetMovementClipset(0.25);
				notyAPI.success("Вы сменили стиль походки на <b>стандартный для Вашего персонажа</b>.", 3000, true);
			}
			mp.storage.data.settings.walkStyle = walkStyle;
		}
	}
}
mp.events.add("activateWalkStyle", activateWalkStyle);

mp.events.add('playAnimResult', (dict, name, speed, flag) => {
	if(typeof(dict) !== "undefined" && typeof(name) !== "undefined" && typeof(speed) !== "undefined" && typeof(flag) !== "undefined") {
		speed = parseFloat(speed);
		flag = parseInt(flag);
		setTimeout(() => {
			if(isAnimActive) {
				if(typeof(isAnimActive.dict) !== "undefined") {
					if(localPlayer.isPlayingAnim(isAnimActive.dict, isAnimActive.name, 3) == 0) isAnimActive = false;
				}
			}
		}, 1000);
		
	}
});

function playerDeathAnimOffer(player, reason, killer) {
	if(player == localPlayer) {
		//localPlayer.clearTasksImmediately();
		if(isAnimActive) isAnimActive = false;
		if(actMenu) closeActMenu();
		if(theftVeh) theftVeh = false;
	}else{
		//chatAPI.notifyPush("DEATH"+player.name);
		if(typeof(playerBlipsInStream) !== "undefined") {
			if(typeof(playerBlipsInStream[player.id.toString()]) !== "undefined") {
				if(typeof(playerBlipsInStream[player.id.toString()].blip) !== "undefined") {
					let theBlip = playerBlipsInStream[player.id.toString()].blip;
					//chatAPI.notifyPush("SMERT: "+JSON.stringify(theBlip));
					if(theBlip) {
						if(mp.blips.exists(theBlip)) theBlip.destroy();
					}
					playerBlipsInStream[player.id.toString()] = undefined;
					playerBlipsInStream = JSON.parse(JSON.stringify(playerBlipsInStream));
				}
			}
		}
	}
}
mp.events.add("playerDeath", playerDeathAnimOffer);

function closeActMenu() {
	if(actMenu && hud_browser) {
		hud_browser.execute('setMenuTab();');
		mp.gui.cursor.visible = false;
		actMenu = false;
		restoreBinds();
		mp.game.graphics.stopScreenEffect("DeathFailMPDark");
	}
}
mp.events.add("closeActMenu", closeActMenu);

var vehPanel = false, myVehSaving = false;
mp.keys.bind(0x72, true, function() { // F3 Меню (Личный транспорт)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x72)) return false;
	if(localPlayer.isDead()) return false;
	if(inCasino) return notyAPI.error("В казино панель [ <b>F3</b> ] недоступна.", 3000, true);
	if(inventorySaving || invCEFUpdating) return notyAPI.error("Ваш персонаж сохраняется, [ <b>F3</b> ] временно недоступен, подождите.", 3000, true);
	if(invCEFUpdatingVeh) return notyAPI.error("Ваш транспорт сохраняется, [ <b>F3</b> ] временно недоступен, подождите.", 3000, true);
	if(tuningVehicle) return notyAPI.error("Вы в тюнинге, [ <b>F3</b> ] недоступен.", 3000, true);
	
	let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
	decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
	
	if(hud_browser) {
		if(vehPanel) {
			closeVehMenu();
		}else{
			if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
				if(localPlayer.getVariable("active.deal")) return notyAPI.error("У Вас есть активная сделка, [ <b>F3</b> ] недоступен.", 3000, true);
			}
			if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
				let playerBlocks = localPlayer.getVariable("player.blocks");
				if(typeof(playerBlocks.jail) !== "undefined") return notyAPI.error("Панель транспорта [ <b>F3</b> ] в тюрьме не доступна.", 3000, true);
			}
			if(invCEFUpdatingVeh) return notyAPI.error("Автомобиль сохраняется, временно недоступно.", 3000, true);
			
			if(Date.now() - afVehPanel < 500) return false;
			afVehPanel = Date.now();
			
			if((!curDay && curDay.toString() != "0") || (!curMonth && curMonth.toString() != "0") || (!curYear && curYear.toString() != "0") || (!curHours && curHours.toString() != "0") || (!curMinutes && curMinutes.toString() != "0") || (!curSeconds && curSeconds.toString() != "0")) return notyAPI.error("Дождитесь полной инициализации аккаунта.", 3000, true);
			
			let curDateTime = JSON.stringify({"day":curDay,"month":curMonth,"year":curYear,"hours":curHours,"minutes":curMinutes,"seconds":curSeconds});
			
			if(imInZone) {
				if(typeof(mp.world.data.zones[imInZone]) !== "undefined") {
					let tempZone = mp.world.data.zones[imInZone];
					if(typeof(tempZone.war.id) !== "undefined") return notyAPI.error("Во время капта личный транспорт не доступен на территории.", 3000, true);
				}
			}
			
			if(typeof(localPlayer.getVariable('player.vehs')) !== "undefined") {
				var tempJSon = localPlayer.getVariable('player.vehs');
				if(!tempJSon) return notyAPI.error("Ваш транспорт сохраняется, пожалуйста подождите.", 3000, true);
				
				for(var k in tempJSon.vehicles) {
					let vehHash = tempJSon.vehicles[k].hash;
					let vehName = vehHash;
					let vehType = "vehicle";
					if(typeof(decVehStats[0][vehHash]) != "undefined") {
						vehName = decVehStats[0][vehHash].name;
						vehType = decVehStats[0][vehHash].type;
					}
					tempJSon.vehicles[k].name = vehName;
					tempJSon.vehicles[k].type = vehType;
					
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+vehType+": "+tempJSon.vehicles[k].number+"</span>");
				}
				if(typeof(localPlayer.getVariable('player.houses')) !== "undefined" && typeof(localPlayer.getVariable('player.nums')) !== "undefined") {
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(tempJSon)+"</span>");
					hud_browser.execute("refreshVehPanel('"+JSON.stringify(tempJSon)+"', '"+JSON.stringify(localPlayer.getVariable('player.houses'))+"', '"+JSON.stringify(localPlayer.getVariable('player.nums'))+"', '"+curDateTime+"');");
					hud_browser.execute('toggleVehiclesPanel(true);');
					mp.gui.cursor.visible = true;
					vehPanel = true;
					
					allowBinds = [0x72];
					
					mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
				}else{
					notyAPI.error("Часть данных не инициализированы, повторите ещё раз.", 3000, true);
				}
			}else{
				notyAPI.error("Ваш транспорт не инициализирован, повторите ещё раз.", 3000, true);
			}
		}
	}
});

mp.keys.bind(0xC0, true, function() { // Режим рэгдолл (Ragdoll)
	if(localPlayer.isDead()) return false;
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0xC0)) return false;
	if(!localPlayer.isDead() && !isAnimActive && !localPlayer.isGoingIntoCover()) localPlayer.setToRagdoll(1500, 1500, 0, true, true, true);
});

mp.events.addDataHandler("player.vehs", function (entity, value, oldValue) {
	if(entity.type == 'player') {
		if(entity == localPlayer) {
			if(value) {
				if(typeof(oldValue) !== "undefined") {
					if(value != oldValue && myVehSaving) myVehSaving = false;
				}
			}
		}
	}
});

function playerVehsSaved() {
	if(myVehSaving) myVehSaving = false;
}
mp.events.add("playerVehsSaved", playerVehsSaved);

function closeVehMenu() {
	if(vehPanel && hud_browser) {
		hud_browser.execute('toggleVehiclesPanel(false);');
		mp.gui.cursor.visible = false;
		vehPanel = false;
		restoreBinds();
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
	}
}
mp.events.add("closeVehMenu", closeVehMenu);

let tempCursorBool = false;
let f11panel = false;
mp.keys.bind(0x7A, true, function() { // CONSOLE HOOK
	if(!f11panel) {
		tempCursorBool = mp.gui.cursor.visible.toString();
		f11panel = true;
	}
});
mp.keys.bind(0x7A, false, function() { // CONSOLE HOOK
	if(f11panel) {
		mp.gui.cursor.visible = stringToBoolean(tempCursorBool);
		tempCursorBool = false;
		f11panel = false;
	}
});

function installNumFromBag(numType, numVal) {
	if(vehPanel && hud_browser) {
		if(typeof(numType) !== "undefined" && typeof(numVal) !== "undefined") {
			if(localPlayer.vehicle) {
				let theVeh = localPlayer.vehicle;
				if(typeof(theVeh.getVariable("veh.own")) === "undefined" || typeof(theVeh.getVariable("veh.num")) === "undefined") return hud_browser.execute('errorNumBag(\'Вы должны находится в личном транспорте #1\');');
				
				if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')))) {
					let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
					if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) return hud_browser.execute('errorNumBag(\'Вы должны находится в личном транспорте #2\');');
				}else{
					return hud_browser.execute('errorNumBag(\'Вы должны находится в личном транспорте #2\');');
				}
				
				if(!theVeh.getVariable("veh.num")) return hud_browser.execute('errorNumBag(\'Вы не можете установить номер на этот транспорт\');');
				let vehNumData = JSON.parse(theVeh.getVariable("veh.num"));
				if(typeof(vehNumData.type) === "undefined") return hud_browser.execute('errorNumBag(\'Вы не можете установить этот номер на этот транспорт\');');
				if(numType != vehNumData.type) return hud_browser.execute('errorNumBag(\'Вы не можете установить этот номер на этот транспорт\');');
				
				afVehPanel = Date.now();
				
				closeVehMenu();
				mp.events.callRemote('installNumFromBag', numType, numVal);
			}else{
				return hud_browser.execute('errorNumBag(\'Вы должны находится в транспорте\');');
			}
		}else{
			return hud_browser.execute('errorNumBag(\'Вы не выбрали номер\');');
		}
	}
}
mp.events.add("installNumFromBag", installNumFromBag);

function numFromBagInstalled(installResult, vehHash, theNum) {
	if(hud_browser) {
		if(typeof(installResult) !== "undefined" && typeof(vehHash) !== "undefined" && typeof(theNum) !== "undefined") {
			if(installResult) {
				let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
				decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
				let vehName = vehHash;
				if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
				mp.game.ui.messages.showMidsizedShard("~y~Номер ~w~"+theNum, "~s~Установлен из хранилища~n~На "+vehName+"", 5, false, true, 8000);
			}else{
				return notyAPI.error("Во время установки номера, что-то пошло не так.", 3000, true);
			}
		}else{
			return notyAPI.error("Во время установки номера, что-то пошло не так.", 3000, true);
		}
	}
}
mp.events.add("numFromBagInstalled", numFromBagInstalled);

/*
function tpVeh(data) {
	//chatAPI.warningPush("vInfo: "+data);
	if(localPlayer.vehicle) return false;
	if(inCasino) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * В казино телепорт транспорта запрещён..</span>");
	
	if(afTPvehAndDestroy) return false;
	afTPvehAndDestroy = true;
	setTimeout(() => { afTPvehAndDestroy = false; }, 1500);
	
	closeVehMenu();
	let dataJSON = JSON.parse(data);
	dataJSON = dataJSON[0];
	if(dataJSON) {
		if(typeof(dataJSON.name) !== "undefined") {
			mp.game.ui.messages.showMidsized(dataJSON.name.toString(), "~s~Транспорт ~g~успешно ~s~доставлен к Вам.");
			mp.events.callRemote('tpVeh', dataJSON.id.toString());
		}
	}
}
mp.events.add("tpVeh", tpVeh);
*/

function tpVeh(data) {
	//chatAPI.warningPush("vInfo: "+data);
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * afTPvehAndDestroy: "+afTPvehAndDestroy.toString()+"</span>");
	
	if(localPlayer.isDead()) return false;
	if(localPlayer.vehicle || localPlayer.getVariable("player.train")) return false;
	if(inCasino) return notyAPI.error("В казино телепорт транспорта запрещён.", 3000, true);
	
	if(Date.now() - afTPvehAndDestroy < 1500) return false;
	afTPvehAndDestroy = Date.now();
	
	let dataJSON = JSON.parse(data);
	dataJSON = dataJSON[0];
	
	closeVehMenu();
	
	if(dataJSON) {
		if(typeof(dataJSON.id) === "undefined") return notyAPI.error("Транспорт не инициализирован, перезайдите.", 3000, true);
		if(typeof(dataJSON.name) !== "undefined") {
			mp.game.ui.messages.showMidsized(dataJSON.name.toString(), "~s~Транспорт ~g~успешно ~s~доставлен к Вам.");
			mp.events.callRemote('tpVeh', dataJSON.id);
		}
	}
}
mp.events.add("tpVeh", tpVeh);

function destroyVeh(data) {
	if(Date.now() - afTPvehAndDestroy < 1500) return false;
	afTPvehAndDestroy = Date.now();
	
	if(localPlayer.isDead()) return false;
	if(invCEFUpdatingVeh) return false;
	
	myVehSaving = true;
	closeVehMenu();
	mp.events.callRemote('destroyVeh', data);
}
mp.events.add("destroyVeh", destroyVeh);

function doorsVeh(data) {
	if(localPlayer.isDead()) return false;
	
	if(Date.now() - afDoors < 2000) return false;
	afDoors = Date.now();
	
	if(hud_browser) hud_browser.execute('playSound("lock", "0.1");');
	mp.events.callRemote('doorsVeh', data);
	//chatAPI.warningPush(data);
}
mp.events.add("doorsVeh", doorsVeh);

/*
function chipVeh(data) {
	mp.events.callRemote('doorsVeh', data);
}
mp.events.add("chipVeh", chipVeh);
*/

function destroyAllVehs() {
	if(localPlayer.isDead()) return false;
	if(Date.now() - afTPvehAndDestroy < 1500) return false;
	afTPvehAndDestroy = Date.now();
	
	if(invCEFUpdatingVeh) return false;
	
	myVehSaving = true;
	closeVehMenu();
	mp.events.callRemote('destroyAllVehs');
	mp.game.ui.notifications.show("~w~Вы успешно убрали ~h~~r~все свои транспортные средства", false, 18, 2);
}
mp.events.add("destroyAllVehs", destroyAllVehs);

mp.keys.bind(0xBC, true, function() { // Лево <
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0xBC)) return false;
	if(localPlayer.isDead()) return false;
	
	if(vehSeat != -1) return false;
	
	if(Date.now() - afTurnLeft < 800) return false;
	afTurnLeft = Date.now();
	
	//if(!waitVehActions.flashers) {
		//waitVehActions.flashers = true;
		mp.events.callRemote("turnIndicator", "left");
	//}
});
 
mp.keys.bind(0xBE, true, function() { // Право >
	//localPlayer.taskAimGunScripted(mp.game.joaat("SCRIPTED_GUN_TASK_PLANE_WING"), true, true);
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0xBE)) return false;
	if(localPlayer.isDead()) return false;
	
	if(vehSeat != -1) return false;
	
	if(Date.now() - afTurnRight < 800) return false;
	afTurnRight = Date.now();
	
	//if(!waitVehActions.flashers) {
		//waitVehActions.flashers = true;
		mp.events.callRemote("turnIndicator", "right");
	//}
});

var helpButtons = false;
mp.keys.bind(0x30, true, function() { // 0 - Скрыть / Показать подсказки
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x30)) return false;
	if(localPlayer.isDead()) return false;
	
	if(Date.now() - afToggleHelpButtons < 500) return false;
	afToggleHelpButtons = Date.now();
	
	if(hud_browser) {
		if(!helpButtons) {
			hud_browser.execute("toggleHelpButtons(true);");
			helpButtons = true;
		}else{
			hud_browser.execute("toggleHelpButtons(false);");
			helpButtons = false;
		}
	}
});

mp.keys.bind(0x4F, true, function() { // O(буква) - Скрыть / Показать подсказки
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x4F)) return false;
	if(localPlayer.isDead()) return false;
	
	if(Date.now() - afToggleHelpButtons < 500) return false;
	afToggleHelpButtons = Date.now();
	
	if(hud_browser) {
		if(!helpButtons) {
			hud_browser.execute("toggleHelpButtons(true);");
			helpButtons = true;
		}else{
			hud_browser.execute("toggleHelpButtons(false);");
			helpButtons = false;
		}
	}
});

var tryingSeatToVehTimer = false, theftVeh = false, activateDBTimer = false;
mp.keys.bind(0x46, true, function() { // F (попытка сесть в авто)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x46)) return false;
	if(localPlayer.isDead()) return false;
	
	if(hud_browser) {
		if(!localPlayer.vehicle) {
			if(typeof(activateDBTimer) === "undefined" || typeof(tryingSeatToVehTimer) === "undefined") return false;
			if(activateDBTimer || tryingSeatToVehTimer) return false;
			activateDBTimer = setTimeout(() => {
				if(mp.game.invoke('0x6F4C85ACD641BCD2', localPlayer.handle) != -1) {
					if(typeof(localPlayer.getVariable("player.fraction") !== "undefined")) {
						let myFraction = localPlayer.getVariable("player.fraction");
						if(myFraction.hasOwnProperty("id") !== null)  mp.game.player.setCanDoDriveBy(true);
						else mp.game.player.setCanDoDriveBy(false);
					}
				}else{
					mp.game.player.setCanDoDriveBy(false);
				}
				activateDBTimer = false;
			}, 250);
			tryingSeatToVehTimer = setTimeout(() => {
				if(mp.game.invoke('0x6F4C85ACD641BCD2', localPlayer.handle) == -1) {
					if(mp.vehicles.atHandle(mp.game.invoke('0x814FA8BE5449445D', localPlayer.handle))) {
						let theVeh = mp.vehicles.atHandle(mp.game.invoke('0x814FA8BE5449445D', localPlayer.handle));
						if(typeof(theVeh.getVariable("veh.theft")) !== "undefined" && typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
							if(!theVeh.getVariable("veh.theft")) {
								let playerFraction = {}
								if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") playerFraction = localPlayer.getVariable("player.fraction");
								if(typeof(playerFraction.id) !== "undefined") {
									if(typeof(mp.world.data.fractions[playerFraction.id]) !== "undefined") {
										let fraction = mp.world.data.fractions[playerFraction.id];
										if(typeof(fraction.type) !== "undefined") {
											if(fraction.type == "crime") {
												let playerInv = localPlayer.getVariable("player.inv");
												if(typeof(playerInv.instrument) !== "undefined") {
													if(playerInv.instrument.hash == "lockpicks") {
														let vehHash = theVeh.getVariable("veh.hash");
														let vehName = vehHash;
														let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
														decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
														if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
														mp.game.ui.notifications.showWithPicture("Тот самый кто-то", "Не плохой экземпляр", "~w~Вскрываем ~o~"+vehName+"~w~?", "CHAR_GANGAPP", 1, false, 1, 2);
														mp.game.ui.notifications.showWithPicture("Тот самый кто-то", "Отмычки в кармане", "~w~Нажми ~o~[ E ] ~w~что бы вскрыть этот транспорт", "CHAR_GANGAPP", 1, false, 1, 2);
														theftVeh = theVeh;
													}else{
														mp.game.ui.notifications.showWithPicture("Тот самый кто-то", "Нужны отмычки", "~w~Нужен инструмент ~o~отмычки ~w~что бы вскрыть ТС", "CHAR_GANGAPP", 1, false, 1, 2);
													}
												}else{
													mp.game.ui.notifications.showWithPicture("Тот самый кто-то", "Нужны отмычки", "~w~Нужен инструмент ~o~отмычки ~w~что бы вскрыть ТС", "CHAR_GANGAPP", 1, false, 1, 2);
												}
											}
										}
									}
								}
							}
						}
					}
				}
				tryingSeatToVehTimer = false;
			}, 1450);
		}
	}
});

mp.events.add({
	"theftedVeh": () => {
		if(theftVeh) {
			if(mp.vehicles.exists(theftVeh)) {
				mp.events.callRemote('theftedVeh', theftVeh.remoteId.toString());
				
				if(typeof(theftVeh.getVariable("veh.hash")) !== "undefined") {
					let vehHash = theftVeh.getVariable("veh.hash");
					let vehName = vehHash;
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
					mp.game.ui.messages.showMidsized(vehName, "~s~Транспорт ~g~успешно ~s~вскрыт!");
				}
			}
		}
		cancelVehTheft();
	}
});

let noWarpAfterChipEnabled = false;
mp.events.add({
	"playerEnterVehicle": (vehicle, seat) => {
		localPlayer.setConfigFlag(429, true); // Не пытается завести авто
		localPlayer.setConfigFlag(18, false); // Не пиздить прикладом
		if(vehicle.getClass() == 13) vehicle.setEngineOn(true, true, true);
		else if(vehicle.getClass() == 15) checkCourierTaskAndStop();
		
		localPlayer.setCanBeKnockedOffVehicle(0); // Падать с мотика, пока не пристегнули
		canBeKnockedOffVehicle = false;
			
		if(typeof(vehicle.d3Veh) !== "undefined") return antiCheatDetected('Читы, сел в D3 авто');
		
		if(typeof(vehicle.getVariable("veh.hash") !== "undefined")) {
			if(vehicle.getVariable("veh.hash") == "faggio") vehicle.setEngineOn(true, true, true);
		}
		
		vehSeat = seat;
		//chatAPI.warningPush("Seat: "+seat);
		mp.game.audio.setRadioToStationName("OFF");
		mp.game.invoke("0x1B9C0099CB942AC6", vehicle, "OFF");
		mp.game.invoke("0xF7F26C6E9CC9EBB8", false); // SET_FRONTEND_RADIO_ACTIVE
		//if(localPlayer.getSeatIsTryingToEnter() !== -1 || vehicle.getVariable("vehicle.engine")) return false;
		//if(seat == -1) vehicle.setEngineOn(false, true, true);

		if(localPlayer.vehicle && seat == -1) {
			if(typeof(vehicle.getVariable("veh.fuel")) !== "undefined") {
				let vehFuel = JSON.parse(vehicle.getVariable("veh.fuel"));
				if(typeof(vehFuel["type"]) !== "undefined") {
					if(vehFuel["type"] == "electro") mp.game.ui.notifications.showWithPicture("Твой бро", "Автопилот", "В этой бричке есть автопилот, нажми J для активации", "CHAR_JIMMY", 1, false, 1, 2);
				}
			}
			
			//chatAPI.warningPush("imInGasStation: "+imInGasStation.toString());
			if(imInGasStation) {
				if(vehPanel) return false;
				if(myVehSaving) return false;
				if(inventorySaving || invCEFUpdating || invCEFUpdatingVeh) return false;
				if(inventoryPanel) return false;
				if(imRefuiling) return false;
				
				if(imInGasStation == "gas") openGasPanel(); // Если на заправке, то открыть окно заправки
				else if(imInGasStation == "electro") openElectroPanel(); // Если на заправке, то открыть окно зарядки
			}
			if(typeof(vehicle.getVariable("veh.fuel")) !== "undefined") {
				processorFuelVeh = vehicle;
				processorFuelVehPos = vehicle.position;
				processorFuelVehData = JSON.parse(vehicle.getVariable("veh.fuel"));
			}
		}
		
		localPlayer.setConfigFlag(32, true); // Отстегнуть ремень
		
		if(typeof(vehicle.getVariable("veh.hash") !== "undefined")) {
			if(vehicle.getVariable("veh.hash") == "faggio") return false;
		}
		if(vehicle.getIsEngineRunning()) {
			if(typeof(localPlayer.getVariable('player.lics')) !== "undefined") {
				let myLics = {};
				if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
				if(vehicle.getClass() == 15) {
					if(myLics["heliCat"] === undefined) return vehicle.setEngineOn(false, false, true);
				}else{
					if(myLics["bCat"] === undefined) return vehicle.setEngineOn(false, false, true);
				}
			}
		}
		
		if(vehSeat == -1) {
			let theVeh = localPlayer.vehicle;
			if(typeof(theVeh.getVariable("veh.theft")) !== "undefined") {
				if(theVeh.getVariable("veh.theft")) {
					if(finishTheftPoint) {
						if(typeof(finishTheftPoint.blip) !== "undefined") {
							if(mp.blips.exists(finishTheftPoint.blip)) {
								finishTheftPoint.blip.destroy();
								delete finishTheftPoint.blip;
							}
						}
						if(typeof(finishTheftPoint.marker) !== "undefined") {
							if(mp.markers.exists(finishTheftPoint.marker)) {
								finishTheftPoint.marker.destroy();
								delete finishTheftPoint.marker;
							}
						}
						if(typeof(finishTheftPoint.checkpoint) !== "undefined") {
							if(mp.checkpoints.exists(finishTheftPoint.checkpoint)) {
								finishTheftPoint.checkpoint.destroy();
								delete finishTheftPoint.checkpoint;
							}
						}
					}
					let theftTempData = theVeh.getVariable("veh.theft");
					
					if(typeof(theftTempData.blip) !== "undefined") {
						if(mp.blips.exists(mp.blips.atRemoteId(theftTempData.blip))) mp.blips.atRemoteId(theftTempData.blip).setAlpha(0);
					}
					
					finishTheftPoint["blip"] = mp.blips.new(626, new mp.Vector3(parseFloat(theftTempData.finish.x), parseFloat(theftTempData.finish.y), parseFloat(theftTempData.finish.z)), {
						name: "Точка доставки угнанного транспорта",
						scale: 0.8,
						color: 1,
						shortRange: false,
						dimension: 0
					});
					finishTheftPoint.blip.setRoute(true);
					finishTheftPoint.blip.setRouteColour(1);
					
					finishTheftPoint["marker"] = mp.markers.new(1, new mp.Vector3(parseFloat(theftTempData.finish.x), parseFloat(theftTempData.finish.y), parseFloat(theftTempData.finish.z)-2.1), 5.1,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [217, 54, 54, 200],
						visible: true,
						dimension: 0
					});
					
					finishTheftPoint["checkpoint"] = mp.checkpoints.new(40, new mp.Vector3(parseFloat(theftTempData.finish.x), parseFloat(theftTempData.finish.y), parseFloat(theftTempData.finish.z)), 2.25,
					{
						color: [255, 255, 255, 0],
						visible: true,
						dimension: localPlayer.dimension
					});
					finishTheftPoint.checkpoint.theftCheckpoint = theVeh.remoteId;
				}
			}else if(typeof(theVeh.getVariable("veh.grabTruck")) !== "undefined") {
				let grabTruckTempData = theVeh.getVariable("veh.grabTruck");
				if(theVeh.getVariable("veh.grabTruck")) {
					if(typeof(grabTruckTempData.blip) !== "undefined") {
						if(mp.blips.exists(mp.blips.atRemoteId(grabTruckTempData.blip))) mp.blips.atRemoteId(grabTruckTempData.blip).setAlpha(0);
					}
					if(typeof(finishGrabTruckPoint.blip) === "undefined") {
						finishGrabTruckPoint["blip"] = mp.blips.new(626, new mp.Vector3(parseFloat(grabTruckTempData.finish.x), parseFloat(grabTruckTempData.finish.y), parseFloat(grabTruckTempData.finish.z)), {
							name: "Точка доставки грузовика со стаффом",
							scale: 0.8,
							color: 1,
							shortRange: false,
							dimension: 0
						});
						finishGrabTruckPoint.blip.setRoute(true);
						finishGrabTruckPoint.blip.setRouteColour(1);
						
						vehParkMarkers = [{"position":new mp.Vector3(parseFloat(grabTruckTempData.finish.x),parseFloat(grabTruckTempData.finish.y),parseFloat(grabTruckTempData.finish.z)-2.3),"heading":parseFloat(grabTruckTempData.finish.heading),"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(parseFloat(grabTruckTempData.finish.heading)),"width":3,"height":14}], parkingVeh = theVeh, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
						if(typeof(trailersPool) !== "undefined") {
							if(typeof(trailersPool[theVeh.handle.toString()]) !== "undefined") {
								if(typeof(trailersPool[theVeh.handle.toString()].trailer) !== "undefined") {
									let tempTrailer = trailersPool[theVeh.handle.toString()].trailer;
									if(mp.vehicles.exists(tempTrailer) && mp.vehicles.exists(theVeh)) parkingVeh = tempTrailer;
								}
							}
						}
					}
				}else{
					mp.events.callRemote('grabTruckedVeh', theVeh.remoteId.toString());
				}
			}
		}
	}
});

function grabTruckDelivered() {
	if(localPlayer.vehicle) {
		let theVeh = localPlayer.vehicle;
		if(typeof(theVeh.getVariable("veh.grabTruck")) !== "undefined") {
			if(theVeh.getVariable("veh.grabTruck")) {
				mp.game.ui.notifications.showWithPicture("Тот самый кто-то", "Стафф на базе!", "~w~Забирай ~o~добычу~w~, ты красавчик!", "CHAR_GANGAPP", 1, false, 1, 2);
				
				notyAPI.success("Вы доставили <b>грузовик с грузом</b> в отстойник.", 3000, true);
				notyAPI.info("Скорее лутайте содержимое, и покиньте место проишествия!", 4500, false);
				
				mp.game.ui.messages.showMidsizedShard("~y~Хороший ~w~улов", "~s~Скорее лутайте содержимое, и покиньте место проишествия!", 5, false, true, 8000);
				
				mp.events.call("sleepAntiCheat");
				mp.events.callRemote('grabTruckDelivered', theVeh.remoteId.toString());
			}
		}
	}
}

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.theftCheckpoint) !== "undefined") {
				if(localPlayer.vehicle) {
					let theVeh = localPlayer.vehicle;
					if(typeof(theVeh.getVariable("veh.theft")) !== "undefined") {
						let theftData = theVeh.getVariable("veh.theft");
						if(typeof(finishTheftPoint.blip) !== "undefined") {
							if(mp.blips.exists(finishTheftPoint.blip)) {
								finishTheftPoint.blip.destroy();
								delete finishTheftPoint.blip;
							}
						}
						if(typeof(finishTheftPoint.marker) !== "undefined") {
							if(mp.markers.exists(finishTheftPoint.marker)) {
								finishTheftPoint.marker.destroy();
								delete finishTheftPoint.marker;
							}
						}
						if(typeof(finishTheftPoint.checkpoint) !== "undefined") {
							if(mp.checkpoints.exists(finishTheftPoint.checkpoint)) {
								finishTheftPoint.checkpoint.destroy();
								delete finishTheftPoint.checkpoint;
							}
						}
						
						if(mp.vehicles.exists(theVeh)) {
							if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
								let vehHash = theVeh.getVariable("veh.hash");
								let vehName = vehHash;
								let vehCost = 300000;
								
								let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
								decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
								if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
								//if(typeof(decVehStats[0][vehHash].cost) != "undefined") vehCost = parseInt(decVehStats[0][vehHash].cost) * 0.01;
								if(typeof(theftData.cost) !== "undefined") vehCost = theftData.cost;
								
								vehCost = Math.round(vehCost);
								let resBankMoney = vehCost;
								vehCost = vehCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
								
								if(typeof(localPlayer.getVariable("player.bank")) !== "undefined") {
									resBankMoney = resBankMoney + parseInt(localPlayer.getVariable("player.bank"));
									resBankMoney = resBankMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
								}
								
								mp.game.ui.notifications.showWithPicture("Тот самый кто-то", "Отличная работа!", "~w~Годная бричка ~o~"+vehName, "CHAR_GANGAPP", 1, false, 1, 2);
								
								notyAPI.success("Вы доставили угнанный автомобиль <b>"+vehName+"</b> в отстойник.", 3000, true);
								notyAPI.info("Картель только что перевел на Ваш банковский счёт<b>"+vehCost+"</b> руб.", 4500, true);
								
								mp.game.ui.messages.showMidsizedShard("~y~Успешный угон ~w~"+vehName, "~s~Получено от картеля"+vehCost+" руб.", 5, false, true, 8000);
								
								mp.events.call("sleepAntiCheat");
								mp.events.callRemote('theftedVehDelivered', theVeh.remoteId.toString());
								
								mp.game.ui.notifications.showWithPicture("Менеджер SMOTRAbank", "Новый баланс", "~w~Состояние:~o~"+resBankMoney+" ~w~руб.", "CHAR_BANK_BOL", 1, false, 1, 2);
							}
						}
					}
				}
			}
		}
	}
});

function playerSuccessEnterVehicle(seat) {
	if(localPlayer.vehicle) {
		//if(seat) vehSeat = seat;
		chatAPI.warningPush("Entered: "+seat);
		
		localPlayer.setConfigFlag(429, true); // Не пытается завести авто
		localPlayer.setConfigFlag(18, false); // Не пиздить прикладом
		
		mp.game.audio.setRadioToStationName("OFF");
		mp.game.invoke("0xF7F26C6E9CC9EBB8", false); // SET_FRONTEND_RADIO_ACTIVE
	}
}
mp.events.add("playerSuccessEnterVehicle", playerSuccessEnterVehicle);

mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
	vehSeat = false;
	if(imInGasStation) {
		if(imInGasStation == "electro") closeGasElectroPanel();
		else if(imInGasStation == "gas") closeGasPanel();
		imInGasStation = false;
	}
	if(mp.vehicles.exists(vehicle)) {
		mp.game.player.setCanDoDriveBy(false);
		if(dragy) dragy = {};
		vehLeaveRecently = true;
		setTimeout(() => {
			vehLeaveRecently = false;
		}, 4000);
		if(vehicle) {
			if(typeof(autoPilot.speed) !== "undefined") {
				localPlayer.clearTasks();
				if(typeof(autoPilot.interval) !== "undefined") clearInterval(autoPilot.interval);
				autoPilot = {};
			}
			if(hud_browser) {
				if(actMenu) closeActMenu();
				/*if(mVehPanel) {
					hud_browser.execute("toggleMVehPanel(false);");
					mVehPanel = false;
				}*/
			}
			if(imInZZ) {
				if(typeof(localPlayer.getVariable("player.passive")) !== "undefined") {
					if(!localPlayer.getVariable("player.passive")) {
						mp.game.ui.messages.showMidsized("~g~Пассивный ~w~режим", "~s~Включаем пассивный режим..");
						mp.events.callRemote('togglePassive');
					}
				}
			}
			if(typeof(vehicle.getVariable("veh.theft")) !== "undefined") {
				if(vehicle.getVariable("veh.theft")) {
					let theftData = vehicle.getVariable("veh.theft");
					if(typeof(theftData.blip) !== "undefined") {
						if(mp.blips.exists(mp.blips.atRemoteId(theftData.blip))) mp.blips.atRemoteId(theftData.blip).setAlpha(255);
					}
				}
			}else if(typeof(vehicle.getVariable("veh.grabTruck")) !== "undefined") {
				if(vehicle.getVariable("veh.grabTruck")) {
					let grabTruckData = vehicle.getVariable("veh.grabTruck");
					if(typeof(grabTruckData.blip) !== "undefined") {
						if(mp.blips.exists(mp.blips.atRemoteId(grabTruckData.blip))) mp.blips.atRemoteId(grabTruckData.blip).setAlpha(255);
					}
				}
			}
			if(finishTheftPoint) {
				if(typeof(finishTheftPoint.blip) !== "undefined") {
					if(mp.blips.exists(finishTheftPoint.blip)) {
						finishTheftPoint.blip.destroy();
						delete finishTheftPoint.blip;
					}
				}
				if(typeof(finishTheftPoint.marker) !== "undefined") {
					if(mp.markers.exists(finishTheftPoint.marker)) {
						finishTheftPoint.marker.destroy();
						delete finishTheftPoint.marker;
					}
				}
				if(typeof(finishTheftPoint.checkpoint) !== "undefined") {
					if(mp.checkpoints.exists(finishTheftPoint.checkpoint)) {
						finishTheftPoint.checkpoint.destroy();
						delete finishTheftPoint.checkpoint;
					}
				}
			}
			if(finishGrabTruckPoint) {
				if(typeof(finishGrabTruckPoint.blip) !== "undefined") {
					if(mp.blips.exists(finishGrabTruckPoint.blip)) {
						finishGrabTruckPoint.blip.destroy();
						delete finishGrabTruckPoint.blip;
					}
					vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
				}
			}
			if(typeof(vehicle.getVariable("vehicle.engine")) !== "undefined") {
				if(vehicle.getVariable("vehicle.engine")) vehicle.setEngineOn(true, true, true);
				else vehicle.setEngineOn(false, true, true);
			}
		}
	}
})

mp.events.addDataHandler('player.blocks', function (entity, value, oldValue) {
	if(entity && entity == localPlayer && value && oldValue) {
		if(typeof(value) != "undefined" && typeof(oldValue) != "undefined") {
			if(typeof(oldValue.jail) == "undefined" && typeof(value.jail) != "undefined") {
				if(hud_browser) hud_browser.execute('playSound("jail", "0.2");');
			}
			if(typeof(oldValue.jail) != "undefined" && typeof(value.jail) == "undefined") {
				jailBreakAttemptions = 0;
				notyAPI.success("Вы были освобождены из <b>Федеральной тюрьмы</b> Лос-Сантоса.", 3000, true);
				mp.game.ui.messages.showMidsizedShard("~y~Вы успешно отсидели ~w~свой срок", "~s~Вы освобождены из Федеральной тюрьмы Лос-Сантоса.", 5, false, true, 8000);
				mp.events.callRemote('freeJail');
			}
			if(typeof(oldValue.mute) != "undefined" && typeof(value.mute) == "undefined") {
				notyAPI.success("Запрет сообщений и голосового чата <b>снят</b>.", 3000, true);
				mp.events.callRemote('freeMute');
			}
			if(typeof(oldValue.dick) != "undefined" && typeof(value.dick) == "undefined") {
				notyAPI.success("Хуй со лба <b>снят</b> по истечению срока годности.", 3000, true);
				mp.events.callRemote('freeDick');
			}
		}
	}
});

mp.events.add('donateUpdated', function (theData) {
	if(theData) {
		exitAtm();
		theData = JSON.parse(theData);
		theData.summa = theData.summa.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
		theData.newdonate = theData.newdonate.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
		mp.game.ui.messages.showMidsizedShard("~y~Донат ~w~получен", "~s~В размере~g~~h~"+theData.summa+" ~s~донат ед.~n~Новый донат баланс~g~~h~"+theData.newdonate+" ~s~донат ед.", 5, false, true, 5000);
		if(hud_browser) hud_browser.execute('playSound("donate", 0.2);');
		mp.game.ui.notifications.showWithPicture("Донат получен", "+"+theData.summa+" донат ед.", "Новый баланс"+theData.newdonate+" донат ед.", "CHAR_DEVIN", 1, false, 1, 2);
	}
});

mp.events.add('premiumUpdated', function (theData) {
	if(theData) {
		theData = JSON.parse(theData);
		theData.summa = theData.summa.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
		
		if(hud_browser) hud_browser.execute('playSound("premium", 0.2);');
		
		setTimeout(() => {
			if(theData.add) {
				mp.game.ui.messages.showMidsizedShard("~p~Премиум ~w~продлён", "~s~Вы оплатили премиум-доступ ещё на ~g~~h~"+theData.interval+" ~s~дней~n~Стоимость:~g~~h~"+theData.summa+" ~s~руб.", 5, false, true, 5000);
				mp.game.ui.notifications.showWithPicture("Премиум продлён", "Продлили на "+theData.interval+" дней", "Стоимость:"+theData.summa+" руб.", "CHAR_DEVIN", 1, false, 1, 2);
			}else{
				mp.game.ui.messages.showMidsizedShard("~p~Премиум ~w~подключен", "~s~Вы оплатили премиум-доступ на ~g~~h~"+theData.interval+" ~s~дней~n~Итоговая стоимость:~g~~h~"+theData.summa+" ~s~руб.", 5, false, true, 5000);
				mp.game.ui.notifications.showWithPicture("Премиум подключен", "Включили на "+theData.interval+" дней", "Стоимость:"+theData.summa+" руб.", "CHAR_DEVIN", 1, false, 1, 2);
			}
		}, 10000);
	}
});

mp.events.add('premiumUpdatedAdm', function (isAdd) {
	if(typeof(isAdd) !== "undefined") {
		if(hud_browser) hud_browser.execute('playSound("premium", 0.2);');
		setTimeout(() => {
			if(isAdd) {
				mp.game.ui.messages.showMidsizedShard("~p~Премиум ~w~продлён", "~s~Вы получили премиум-доступ от администрации ещё на ~g~~h~1 ~s~день~n~Стоимость: ~g~~h~0 ~s~руб.", 5, false, true, 5000);
				mp.game.ui.notifications.showWithPicture("Премиум продлён", "Продлили на 1 день", "Стоимость: 0 руб.", "CHAR_DEVIN", 1, false, 1, 2);
			}else{
				mp.game.ui.messages.showMidsizedShard("~p~Премиум ~w~подключен", "~s~Вы получили премиум-доступ от администрации на ~g~~h~1 ~s~день~n~Итоговая стоимость: ~g~~h~0 ~s~руб.", 5, false, true, 5000);
				mp.game.ui.notifications.showWithPicture("Премиум подключен", "Включили на 1 день", "Стоимость: 0 руб.", "CHAR_DEVIN", 1, false, 1, 2);
			}
		}, 10000);
	}
});

mp.events.add('premiumExpired', function () {
	setTimeout(() => {
		mp.game.ui.messages.showMidsizedShard("~p~Премиум ~w~закончился", "~s~Действие премиум-доступа ~r~~h~закончилось ~n~Купить вновь можно на сайте ~g~~h~SMOTRARage.ru", 5, false, true, 5000);
		mp.game.ui.notifications.showWithPicture("Премиум закончился", "Премиум-доступ всё :(", "К сожалению, премиум-доступ закончился.", "CHAR_DEVIN", 1, false, 1, 2);
	}, 10000);
});


mp.events.add("onServerSendKill", (player, playerColor, reason, killer, killerColor) => {
	if(player && playerColor && reason && killer && killerColor && hud_browser) {
		//chatAPI.notifyPush(" * <span style=\"color:#FEBC00\"><b>"+player+"</b></span> был убит <span style=\"color:#FEBC00\"><b>"+killer+"</b></span> (<span style=\"color:#FEBC00\"><b>"+reason+"</b></span>).");
		
		let imgFileName = "die";
		switch (reason) {
			case "driveByVeh": // машина
				imgFileName = "caricon";
				break;
			case "2725352035": // Кулаки
				imgFileName = "die";
				break;
			case "453432689": // Colt 911
				imgFileName = "w3219281620";
				break;
			case "3249783761": // Револьвер
				imgFileName = "w2548703416";
				break;
			case "2578377531": // Deagle
				imgFileName = "w1593441988";
				break;
			case "487013001": // Pump Shutgun
				imgFileName = "w487013001";
				break;
			case "2017895192": // Sawn Off Shutgun
				imgFileName = "w1432025498";
				break;
			case "4019527611": // DB Shutgun
				imgFileName = "w4019527611";
				break;
			case "324215364": // UZI
				imgFileName = "w324215364";
				break;
			case "3675956304": // Tec 9
				imgFileName = "w3173288789";
				break;
			case "736523883": // SMG 45
				imgFileName = "w736523883";
				break;
			case "3220176749": // Штурм. винтовка
				imgFileName = "w33220176749";
				break;
			case "2210333304": // Afford. Carabine
				imgFileName = "w984333226";
				break;
			case "1649403952": // АК-47 Компакт.
				imgFileName = "w2024373456";
				break;
			case "100416529": // Снайп. винтовка
				imgFileName = "w100416529";
				break;
			default:
				imgFileName = "die"; // череп
				break;
		}
		
		hud_browser.execute('addKillBarElement(\''+localPlayer.name+'\', \''+player+'\', \''+playerColor+'\', \''+killer+'\', \''+killerColor+'\', \''+imgFileName+'\');');
	}
});

mp.game.streaming.requestClipSet("move_ped_crouched");
mp.game.streaming.requestClipSet("move_ped_crouched_strafing");

var imCrouch = false, crawlInterval = false;
mp.keys.bind(0x11, false, () => { // Crouch (приседания)
	if(localPlayer.vehicle) return false;
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x11)) return false;
	if(Date.now() - afCrouch < 200) return false;
	if(inCasino) return false;
	if(localPlayer.getIsTaskActive(287)) return false;
	if(typeof(localPlayer.getVariable("player.nick")) === "undefined") return false;
	if(localPlayer.isDead()) return false;
	
	afCrouch = Date.now();
	
	/*if(!imCrouch) imCrouch = 1;
	else if(imCrouch == 1) imCrouch = 2;
	else if(imCrouch == 2) imCrouch = 3;
	else if(imCrouch == 2) imCrouch = false;*/
	
	if(!imCrouch) imCrouch = true;
	else imCrouch = false;
	
	/*if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
		let myFraction = localPlayer.getVariable("player.fraction");
		for (var i in clanZones) {
			let tempZone = clanZones[i];
			if(typeof(tempZone.war.id) !== "undefined") {
				if(tempZone.own.id == myFraction.id || tempZone.war.id == myFraction.id) imCrouch = false;
			}
		}
	}*/
	
	if(!imCrouch) {
		localPlayer.setMovementClipset("move_ped_crouched", 0.25);
		localPlayer.setStrafeClipset("move_ped_crouched_strafing");
	}else{
		if(typeof(mp.storage.data.settings) !== "undefined") {
			if(typeof(mp.storage.data.settings.walkStyle) !== "undefined") {
				if(mp.storage.data.settings.walkStyle != "stock") {
					if(!mp.game.streaming.hasClipSetLoaded(mp.storage.data.settings.walkStyle)) {
						mp.game.streaming.requestClipSet(mp.storage.data.settings.walkStyle);
						//while(!mp.game.streaming.hasClipSetLoaded(mp.storage.data.settings.walkStyle)) localPlayer.setMovementClipset(mp.storage.data.settings.walkStyle, 0.25);
						setTimeout(() => { localPlayer.setMovementClipset(mp.storage.data.settings.walkStyle, 0.25); }, 1500);
					}
					localPlayer.setMovementClipset(mp.storage.data.settings.walkStyle, 0.25);
				}else{
					localPlayer.resetMovementClipset(0.25);
					localPlayer.resetStrafeClipset();
				}
			}else{
				localPlayer.resetMovementClipset(0.25);
				localPlayer.resetStrafeClipset();
			}
		}else{
			localPlayer.resetMovementClipset(0.25);
			localPlayer.resetStrafeClipset();
		}
	}
	
    /*if(imCrouch) {
		if(imCrouch == 1) {
			if(crawlInterval) {
				clearInterval(crawlInterval);
				crawlInterval = false;
				localPlayer.clearTasks();
			}
			localPlayer.setMovementClipset("move_ped_crouched", 0.25);
			localPlayer.setStrafeClipset("move_ped_crouched_strafing");
		}else if(imCrouch == 2) {
			crawlInterval = setInterval(crawlHandleControls, 0);
				mp.game.streaming.requestAnimDict('move_crawlprone2crawlfront');
				localPlayer.taskPlayAnim(
					'move_crawlprone2crawlfront',
					'front',
					8.0,
					1000,
					-1,
					2,
					0,
					false,
					false,
					false
				);
		}else if(imCrouch == 2) {
			if(crawlInterval) {
				clearInterval(crawlInterval);
				crawlInterval = false;
				localPlayer.clearTasks();
			}
			localPlayer.setMovementClipset("move_ped_crouched", 0.25);
			localPlayer.setStrafeClipset("move_ped_crouched_strafing");
		}
    }else{
		if(crawlInterval) {
			clearInterval(crawlInterval);
			crawlInterval = false;
			localPlayer.clearTasks();
		}
		if(typeof(mp.storage.data.settings.walkStyle) !== "undefined") {
			if(mp.storage.data.settings.walkStyle != "stock") {
				if(!mp.game.streaming.hasClipSetLoaded(mp.storage.data.settings.walkStyle)) {
					mp.game.streaming.requestClipSet(mp.storage.data.settings.walkStyle);
					//while(!mp.game.streaming.hasClipSetLoaded(mp.storage.data.settings.walkStyle)) mp.game.wait(0);
				}
				localPlayer.setMovementClipset(mp.storage.data.settings.walkStyle, 0.25);
			}else{
				localPlayer.resetMovementClipset(0.25);
			}
			localPlayer.resetStrafeClipset();
		}else{
			localPlayer.resetMovementClipset(0.25);
			localPlayer.resetStrafeClipset();
		}
    }*/
});

/*
let animCrawl;
let timeoutAnimCrawl;

function crawlHandleControls() {
    let dict = 'move_crawl';
    let rotation = localPlayer.getRotation(2);
    mp.game.controls.disableControlAction(0, 32, true);
    mp.game.controls.disableControlAction(0, 33, true);
    mp.game.controls.disableControlAction(0, 34, true);
    mp.game.controls.disableControlAction(0, 35, true);
    if(mp.game.controls.isDisabledControlPressed(0, 34)) localPlayer.setRotation(rotation.x, rotation.y, rotation.z + 0.2, 2, true);
    if(mp.game.controls.isDisabledControlPressed(0, 35)) localPlayer.setRotation(rotation.x, rotation.y, rotation.z - 0.2, 2, true);
    if(mp.game.controls.isDisabledControlPressed(0, 32)) {
        if(animCrawl === ('onfront_fwd' || 'onfront_bwd') || timeoutAnimCrawl) return;
        animCrawl = 'onfront_fwd';
        let timer = mp.game.entity.getEntityAnimDuration('move_crawl', animCrawl);
        mp.game.streaming.requestAnimDict(dict);
        localPlayer.taskPlayAnim(dict, animCrawl, 8.0, 1000, -1, 2, 0, false, false, false);
        timeoutAnimCrawl = setTimeout(() => {
            animCrawl = undefined;
            timeoutAnimCrawl = undefined;
        }, (timer - 0.1) * 1000);
    }
    if(mp.game.controls.isDisabledControlPressed(0, 33)) {
        if (animCrawl === ('onfront_fwd' || 'onfront_bwd') || timeoutAnimCrawl) return;
        animCrawl = 'onfront_bwd';
        let timer = mp.game.entity.getEntityAnimDuration('move_crawl', animCrawl);
        mp.game.streaming.requestAnimDict(dict);
        localPlayer.taskPlayAnim(dict, animCrawl, 8.0, 1000, -1, 2, 0, false, false, false);
        timeoutAnimCrawl = setTimeout(() => {
            animCrawl = undefined;
            timeoutAnimCrawl = undefined;
        }, (timer - 0.1) * 1000);
    }
}
*/
}