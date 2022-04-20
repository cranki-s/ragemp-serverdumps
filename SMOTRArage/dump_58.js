{
var plastic_browser = null;
var healthsInStream = [];
var plasticInStream = [];
let plasticExitData = [];

mp.events.add('playerEnterColshape', (shape) => {
	if(shape) {
		if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'health_render') {
					let healthData = shape.getVariable('col.data');
					
					let healthMarker = mp.markers.new(1, new mp.Vector3(healthData[0], healthData[1], healthData[2]+1.2), 2.5,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [214, 35, 30, 200],
						visible: true,
						dimension: 0
					});
					
					let healthCheck = mp.checkpoints.new(40, new mp.Vector3(healthData[0], healthData[1], healthData[2]+2.4), 1.0,
					{
						color: [255, 255, 255, 0],
						visible: true,
						dimension: localPlayer.dimension
					});
					healthCheck.healthData = healthData;
					
					let healthArray = {'marker': healthMarker, 'check': healthCheck, 'pos': [healthData[0], healthData[1], healthData[2]], 'alpha': 0};
					healthsInStream.push(healthArray);
				}
				if(colType == 'plastic_render') {
					let plasticData = shape.getVariable('col.data');
					
					let plasticMarker = mp.markers.new(1, new mp.Vector3(plasticData[0], plasticData[1], plasticData[2]+1.2), 2.5,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [240, 203, 88, 200],
						visible: true,
						dimension: 0
					});
					
					let plasticCheck = mp.checkpoints.new(40, new mp.Vector3(plasticData[0], plasticData[1], plasticData[2]+2.4), 1.0,
					{
						color: [255, 255, 255, 0],
						visible: true,
						dimension: localPlayer.dimension
					});
					plasticCheck.plasticData = plasticData;
					
					let plasticArray = {'marker': plasticMarker, 'check': plasticCheck, 'pos': [plasticData[0], plasticData[1], plasticData[2]], 'alpha': 0};
					plasticInStream.push(plasticArray);
				}
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(allowBinds != stockBinds) return false;
		if(typeof(checkpoint.healthData) !== "undefined") {
			if(!localPlayer.vehicle) {
				let hp = localPlayer.getHealth();
				if(hp < 90) {
					mp.game.ui.notifications.showWithPicture("Частный доктор", "Подлатал, как смог", "Вот ты и снова в строю! Удачи на улицах.", "CHAR_ANDREAS", 1, false, 1, 2);
					notyAPI.success("Здоровье Вашего персонажа полностью восстановлено!", 3000, true);
					mp.events.call("sleepAntiCheat");
					mp.events.callRemote('healthRepair');
				}
			}
		}
		if(typeof(checkpoint.plasticData) !== "undefined") {
			if(!localPlayer.vehicle && hud_browser) {
				let plasticData = checkpoint.plasticData;
				plasticExitData = [parseFloat(plasticData[0]), parseFloat(plasticData[1]), parseFloat(plasticData[2])];
				togglePlastic(true);
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.plasticData) !== "undefined") {
			if(noCloseBrowserPlastic) {
				noCloseBrowserPlastic = false;
				plasticExitData = [];
				return togglePlastic(false);
			}
		}
	}
});

function togglePlastic(theState) {
	if(theState) {
		if(!plastic_browser) {
			if(localPlayer.getVariable("player.nick") && localPlayer.getVariable('player.money') && localPlayer.getVariable('player.pers')) {
				plastic_browser = mp.browsers.new("package://CEF/plastic/index.html");
				setTimeout(function() {
					if(plastic_browser) {
						allowBinds = [];
						//plastic_browser.execute("togglePlasticPanel('"+localPlayer.getVariable("player.nick").toString()+"', '"+JSON.stringify(localPlayer.getVariable('player.pers'))+"');");
						plastic_browser.execute("togglePlasticPanel('"+localPlayer.getVariable("player.nick").toString()+"');");
						mp.gui.cursor.visible = true;
					}
				}, 100);
			}else{
				notyAPI.error("Ваш персонаж не инициализирован, придите позднее.", 3000, true);
			}
		}
	}else{
		if(plastic_browser) {
			restoreBinds();
			plastic_browser.destroy();
			plastic_browser = null;
			mp.gui.cursor.visible = false;
		}
	}
}

let noCloseBrowserPlastic = true;
mp.events.add('toPlasticStage', () => {
	let myMoney = parseInt(localPlayer.getVariable('player.money'));
	
	let plasticCost = 400000;
	if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
		let myBlocks = localPlayer.getVariable("player.blocks");
		if(typeof(myBlocks.premium) !== "undefined") plasticCost = 200000;
	}
	
	if(myMoney < plasticCost) {
		togglePlastic(false);
		return notyAPI.error("У Вас недостаточно средств для пластической хирургии.", 3000, true);
	}
	
	let clothesFinded = false;
	if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
		let myInv = localPlayer.getVariable("player.inv");
		for(let slot in myInv) {
			if(slot == "mask" || slot == "head" || slot == "glasses" || slot == "tors" || slot == "shirt" || slot == "watch" || slot == "bracelet" || slot == "pants" || slot == "shoes") clothesFinded = true;
		}
	}
	if(clothesFinded) {
		togglePlastic(false);
		return notyAPI.error("Сначала разденьтесь, что бы приступить к пластике.", 3000, true);
	}
	
	mp.events.call("sleepAntiCheat");
	/*
	localPlayer.position = new mp.Vector3(262.1206,-1340.0208,22.9);
	localPlayer.setHeading(222.2150);
	localPlayer.freezePosition(true);
	localPlayer.taskPlayAnim("anim@mp_bedmid@left_var_02", "f_sleep_l_loop_bighouse", 8.0, 1.0, -1, 1, 1.0, true, true, true);
	*/
	if(hud_browser) {
		hud_browser.destroy();
		hud_browser = null;
	}
	localPlayer.model = mp.game.joaat("MP_M_Freemode_01");
	noCloseBrowserPlastic = false;
	localPlayer.taskPlayAnim("special_ped@impotent_rage@base", "base", 8.0, 1.0, -1, 1, 1.0, true, true, true);
	mp.events.callRemote('makePersonage', true);
	camFocusOnPlayer();
	mp.game.ui.displayRadar(false);
});

mp.events.add('cancelPlasticChange', () => {
	togglePlastic(false);
});

function checkNickNamePlastic(nickName) {
	if(plastic_browser) mp.events.callRemote('checkNickNamePlastic', nickName);
}
mp.events.add("checkNickNamePlastic", checkNickNamePlastic);

function nickNameCheckedPlastic(theResult) {
	if(plastic_browser) plastic_browser.execute("nickChecked('"+theResult+"');");
}
mp.events.add("nickNameCheckedPlastic", nickNameCheckedPlastic);

function plasticResult(theResult, newNickName) {
	if(!hud_browser) {
		hud_browser = mp.browsers.new("package://CEF/hud/index.html");
		hud_browser.execute('newcfg(0,0); newcfg(1,0); newcfg(2,0); newcfg(3,1);');
		notyAPI.success("Вы успешно сделали <b>пластическую операцию</b>.", 3000, true);
		
		let plasticCost = "400 000";
		if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
			let myBlocks = localPlayer.getVariable("player.blocks");
			if(typeof(myBlocks.premium) !== "undefined") plasticCost = "200 000";
		}
		
		notyAPI.success("Потрачено на пластику <b>"+plasticCost+"</b> руб.", 4500, false);
		if(newNickName) {
			chatAPI.notifyPush(" * Ваше новое имя (ник) <span style=\"color:#FEBC00\"><b>"+newNickName+"</b></span> руб.");
			chatAPI.notifyPush(" * Государство сменит ник владельца Вашего имущества в течении суток.");
			return mp.game.ui.messages.showMidsizedShard("~y~Успешная ~w~пластическая операция", "~s~Вы оплатили чек на ~g~~h~"+plasticCost+" ~s~руб.~n~Ваше новое имя ~g~~h~"+newNickName+"~s~.", 5, false, true, 8000);
		}else{
			return mp.game.ui.messages.showMidsizedShard("~y~Успешная ~w~пластическая операция", "~s~Вы оплатили чек на ~g~~h~"+plasticCost+" ~s~руб.", 5, false, true, 8000);
		}
	}
}
mp.events.add("plasticResult", plasticResult);

function completePersonageEditorPlastic(npNick, npGender, npHair, npHairColor1, npHairColor2, npParentMale, npParentFemale, npParentsMixShape, npParentsMixSkin, eyeColor, npFaceFeatures, npHeadOverlay, npHeadOverlayOpacity, npHeadOverlayColor) {	
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
		personageData = JSON.stringify(personageData);
		
		let nickChanged = false;
		if(localPlayer.getVariable("player.nick")) {
			if(localPlayer.getVariable("player.nick") != npNick) nickChanged = npNick;
		}
		
		mp.events.call("sleepAntiCheat");
		setDefaultCam();
		mp.events.callRemote('newPersonageData', nickChanged, personageData, JSON.stringify(plasticExitData));
		togglePlastic(false);
		mp.game.ui.displayRadar(true);
	}
}
mp.events.add("completePersonageEditorPlastic", completePersonageEditorPlastic);

function cancelPlastic() {	
	mp.events.call("sleepAntiCheat");
	setDefaultCam();
	mp.events.callRemote('cancelPlastic', JSON.stringify(plasticExitData));
	togglePlastic(false);
	mp.game.ui.displayRadar(true);
	if(!hud_browser) {
		hud_browser = mp.browsers.new("package://CEF/hud/index.html");
		hud_browser.execute('newcfg(0,0); newcfg(1,0); newcfg(2,0); newcfg(3,1);');
	}
}
mp.events.add("cancelPlastic", cancelPlastic);

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'health_render') {
				let healthData = shape.getVariable('col.data');
				for(var i in healthsInStream) {
					let tempData = healthsInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == healthData[0] && posData[1] == healthData[1] && posData[2] == healthData[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(healthsInStream[i] || healthsInStream[i] !== undefined) delete healthsInStream[i];
					}
				}
				healthsInStream = healthsInStream.filter(function (el) { return el != null; });
			}
			if(colType == 'plastic_render') {
				let plasticData = shape.getVariable('col.data');
				for(var i in plasticInStream) {
					let tempData = plasticInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == plasticData[0] && posData[1] == plasticData[1] && posData[2] == plasticData[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(plasticInStream[i] || plasticInStream[i] !== undefined) delete plasticInStream[i];
					}
				}
				plasticInStream = plasticInStream.filter(function (el) { return el != null; });
			}
		}
	}
});
}