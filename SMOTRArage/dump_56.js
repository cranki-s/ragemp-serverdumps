{
const cameraRotator = require('./game_assets/cameraRotator.js');
mp.game.streaming.requestAnimDict('misshair_shop@barbers');

var bsAndTattoInStream = []; // Pool
let tempBSAndTattoData = false;

// Барбер-шопы

var BARBER_ID = 0;
var BARBER_ped = null;
var BARBER_cam = null;

function play_anim_(entity, name, name2, pos) {
    entity.taskPlayAnimAdvanced(
        name,name2,
        pos[0],pos[1],pos[2],
        0,0,pos[3],
        1000,-1000,-1,5642,0,2,1
    );
}

function object_attach(entity, data) {
    var object = mp.objects.new(data.name, localPlayer.position, { rotation: new mp.Vector3(0,0,0), alpha: 255, dimension: localPlayer.dimension });
    waitEntity(object).then(() => { object.attachTo(entity.handle, entity.getBoneIndex(data.bone), data.x,data.y,data.z,data.r1,data.r2,data.r3, true, true, false, false, 0, true); entity.object = object; });
    function waitEntity(entity) { return new Promise(resolve => { let wait = setInterval(() => {if(mp.game.entity.isAnEntity(entity.handle)){ clearInterval(wait); resolve(); }},1);}); }
}

let tempHair = {"hair":false,"hairColor1":1,"hairColor2":1,"npHeadOverlay":false};
mp.events.add('tryHairStyle', (hairstyle, haircost) => {
	if(typeof(hairstyle) !== "undefined" && typeof(haircost) !== "undefined") {
		hairstyle = parseInt(hairstyle);
		
		mp.game.cam.doScreenFadeOut(50);
		
		if(hud_browser) hud_browser.execute('toggleBarberShop();');
		mp.events.call("sleepAntiCheat");
		
		cameraRotator.pause(true);
		cameraRotator.reset();
		play_anim_(BARBER_ped,'misshair_shop@barbers','keeper_idle_b',tempBSAndTattoData[5]);
		setTimeout(() => {
			mp.game.cam.doScreenFadeIn(250);
		}, 1200);
		setTimeout(() => {
			tempHair.hair = hairstyle;
			localPlayer.setComponentVariation(2, tempHair.hair, 0, 0);
			let clothesData = localPlayer.getVariable("player.clothes");
			let persData = localPlayer.getVariable("player.pers");
			tempHair.hairColor1 = parseInt(persData.npHairColor1);
			tempHair.hairColor2 = parseInt(persData.npHairColor2);
			localPlayer.setHairColor(tempHair.hairColor1, tempHair.hairColor2);
		}, 6000);
		setTimeout(() => {
			let clothesData = localPlayer.getVariable("player.clothes");
			if(hud_browser) hud_browser.execute('toggleBarberShop(\''+clothesData.npGender+'\',\''+haircost+'\',\''+tempHair.npHeadOverlay+'\');');
			BARBER_ped.taskPlayAnim('misshair_shop@barbers', "keeper_base", 8.0, 1.0, -1, 1, 1.0, false, false, false);
			cameraRotator.pause(false);
		}, 12000);
	}
});

mp.events.add('cancelBarberHair', () => {
	mp.game.cam.doScreenFadeOut(50);
	
	if(hud_browser) hud_browser.execute('toggleBarberShop();');
	mp.events.call("sleepAntiCheat");
	
	cameraRotator.pause(true);
	cameraRotator.reset();
	play_anim_(BARBER_ped,'misshair_shop@barbers','keeper_idle_b',tempBSAndTattoData[5]);
	setTimeout(() => {
		mp.game.cam.doScreenFadeIn(250);
	}, 1200);
	setTimeout(() => {
		tempHair.hair = false;
		let clothesData = localPlayer.getVariable("player.clothes");
		localPlayer.setComponentVariation(2, parseInt(clothesData.npHair), 0, 0);
		let persData = localPlayer.getVariable("player.pers");
		tempHair.hairColor1 = persData.npHairColor1;
		tempHair.hairColor2 = persData.npHairColor2;
		localPlayer.setHairColor(parseInt(tempHair.hairColor1), parseInt(tempHair.hairColor2));
	}, 6000);
	setTimeout(() => {
		let clothesData = localPlayer.getVariable("player.clothes");
		if(hud_browser) hud_browser.execute('toggleBarberShop(\''+clothesData.npGender+'\',false,\''+tempHair.npHeadOverlay+'\');');
		BARBER_ped.taskPlayAnim('misshair_shop@barbers', "keeper_base", 8.0, 1.0, -1, 1, 1.0, false, false, false);
		cameraRotator.pause(false);
	}, 12000);
});

mp.events.add('confirmHair', () => {
	if(hud_browser) hud_browser.execute('toggleBarberShop();');
	mp.events.call("sleepAntiCheat");
	mp.events.callRemote('confirmHair', JSON.stringify(tempHair));
});

mp.events.add('confirmHairResult', (isErrorOrCost, isReasonError) => {
	if(typeof(isErrorOrCost) !== "undefined" && typeof(localPlayer.getVariable("player.clothes")) !== "undefined") {
		let clothesData = localPlayer.getVariable("player.clothes");
		if(isErrorOrCost) {
			mp.game.ui.messages.showMidsizedShard("~w~Вы оплатили ~y~стрижку ~w~в барбер-шопе", "~s~Потрачено"+isErrorOrCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.", 5, false, true, 8000);
		}else if(typeof(isReasonError) !== "undefined") {
			mp.game.ui.messages.showMidsizedShard("~w~Произошла ~r~ошибка", "~s~"+isReasonError.toString(), 5, false, true, 8000);
		}
		if(hud_browser) hud_browser.execute('toggleBarberShop(\''+clothesData.npGender+'\',false,\''+tempHair.npHeadOverlay+'\');');
	}
});

mp.events.add('confirmFaceHair', () => {
	if(hud_browser) hud_browser.execute('toggleBarberShop();');
	mp.events.call("sleepAntiCheat");
	mp.events.callRemote('confirmFaceHair', JSON.stringify(tempHair));
});

mp.events.add('confirmFaceHairResult', (isErrorOrCost, isReasonError) => {
	if(typeof(isErrorOrCost) !== "undefined" && typeof(localPlayer.getVariable("player.clothes")) !== "undefined") {
		let clothesData = localPlayer.getVariable("player.clothes");
		if(isErrorOrCost) {
			mp.game.ui.messages.showMidsizedShard("~w~Вы оплатили ~y~уход за лицом ~w~в барбер-шопе", "~s~Потрачено"+isErrorOrCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.", 5, false, true, 8000);
		}else if(typeof(isReasonError) !== "undefined") {
			mp.game.ui.messages.showMidsizedShard("~w~Произошла ~r~ошибка", "~s~"+isReasonError.toString(), 5, false, true, 8000);
		}
		if(hud_browser) hud_browser.execute('toggleBarberShop(\''+clothesData.npGender+'\',false,\''+tempHair.npHeadOverlay+'\');');
	}
});

mp.events.add('setHairColor', (whoColor, theColor) => {
	if(typeof(whoColor) !== "undefined" && typeof(theColor) !== "undefined") {
		if(whoColor == 1) {
			tempHair.hairColor1 = parseInt(theColor);
			localPlayer.setHairColor(parseInt(tempHair.hairColor1), parseInt(tempHair.hairColor2));
		}else{
			tempHair.hairColor2 = parseInt(theColor);
			localPlayer.setHairColor(parseInt(tempHair.hairColor1), parseInt(tempHair.hairColor2));
		}
	}
});

mp.events.add('setHeadOverlayBarber', (who, index, value) => {
	if(typeof(index) !== "undefined" && typeof(value) !== "undefined") {
		if(typeof(tempHair.npHeadOverlay[index]) !== "undefined") {
			index = parseInt(index);
			if(who == "value") {
				tempHair.npHeadOverlay[index.toString()].v = parseFloat(value);
			}else if(who == "opacity") {
				tempHair.npHeadOverlay[index.toString()].o = parseFloat(value);
			}else if(who == "color") {
				tempHair.npHeadOverlay[index.toString()].c = parseFloat(value);
			}
			if(typeof(tempHair.npHeadOverlay[index.toString()]) !== "undefined") {
				localPlayer.setHeadOverlay(index, parseInt(tempHair.npHeadOverlay[index.toString()].v), parseFloat(tempHair.npHeadOverlay[index.toString()].o), parseInt(tempHair.npHeadOverlay[index.toString()].c), parseInt(tempHair.npHeadOverlay[index.toString()].c));
			}
		}
	}
});

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != 'undefined' && typeof(shape.data) == 'undefined') {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) !== "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'bs_tatto_render') {
					let bsTattoColData = shape.getVariable('col.data');
					
					let bsAndTattoMarker = mp.markers.new(1, new mp.Vector3(parseFloat(bsTattoColData[0]), parseFloat(bsTattoColData[1]), parseFloat(bsTattoColData[2])), 1.5,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [255, 255, 255, 200],
						visible: true,
						dimension: 0
					});
					
					let bsAndTattoCheck = mp.checkpoints.new(40, new mp.Vector3(bsTattoColData[0], bsTattoColData[1], bsTattoColData[2]+2.0), 1.2,
					{
						color: [255, 255, 255, 0],
						visible: true,
						dimension: localPlayer.dimension
					});
					bsAndTattoCheck.bsAndTattoData = bsTattoColData;
					
					let bsAndTattoArray = {'marker': bsAndTattoMarker, 'check': bsAndTattoCheck, 'thisIs': bsTattoColData[3], 'pos': [parseFloat(bsTattoColData[0]), parseFloat(bsTattoColData[1]), parseFloat(bsTattoColData[2])], 'alpha': 0};
					bsAndTattoInStream.push(bsAndTattoArray);
				}
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.bsAndTattoData) !== "undefined") {
			if(!localPlayer.vehicle) {
				if(typeof(localPlayer.getVariable("player.clothes")) === "undefined" || typeof(localPlayer.getVariable("player.pers")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Ваш персонаж не инициализирован</span>");
				//chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * colData: "+JSON.stringify(checkpoint.bsAndTattoData)+"</span>");
				allowBinds = [];
				BLOCK_CONTROLS = true;
				mp.game.cam.doScreenFadeOut(250);
				mp.events.callRemote('barberTryEnter');
				tempBSAndTattoData = checkpoint.bsAndTattoData;
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'bs_tatto_render') {
				let bsAndTatto = shape.getVariable('col.data');
				for(var i in bsAndTattoInStream) {
					let tempData = bsAndTattoInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == bsAndTatto[0] && posData[1] == bsAndTatto[1] && posData[2] == bsAndTatto[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(bsAndTattoInStream[i] || bsAndTattoInStream[i] !== undefined) delete bsAndTattoInStream[i];
					}
				}
				bsAndTattoInStream = bsAndTattoInStream.filter(function (el) { return el != null; });
			}
		}
	}
});

mp.events.add('barberTryEnter', (dim) => {
	if(dim) {
		setTimeout(() => {
			if(tempBSAndTattoData) {
				mp.game.ui.displayRadar(false);
				localPlayer.clearProp(0);
				localPlayer.clearProp(1); // Очки
				localPlayer.setComponentVariation(1, 0, 0, 0);
				
				let clothesData = localPlayer.getVariable("player.clothes");
				localPlayer.setComponentVariation(2, parseInt(clothesData.npHair), 0, 0);
				let persData = localPlayer.getVariable("player.pers");
				tempHair.hairColor1 = parseInt(persData.npHairColor1);
				tempHair.hairColor2 = parseInt(persData.npHairColor2);
				tempHair.npHeadOverlay = persData.npHeadOverlay;
				localPlayer.setHairColor(tempHair.hairColor1, tempHair.hairColor2);
				
				mp.events.call("sleepAntiCheat");
				play_anim_(localPlayer,'misshair_shop@barbers','player_enterchair', tempBSAndTattoData[5]);
				BARBER_ped = mp.peds.new(mp.game.joaat("s_f_m_fembarber"), new mp.Vector3(tempBSAndTattoData[5][0], tempBSAndTattoData[5][1], tempBSAndTattoData[5][2]-5), 0, dim);
				setTimeout(() => {
					BARBER_ped.freezePosition(false);
					BARBER_ped.setInvincible(false);
					BARBER_ped.setProofs(false, false, false, false, false, false, false, false);
					play_anim_(BARBER_ped,'misshair_shop@barbers','keeper_enterchair', tempBSAndTattoData[5]);
					
					setTimeout(() => {
						BARBER_ped.taskPlayAnim('misshair_shop@barbers', "keeper_base", 8.0, 1.0, -1, 1, 1.0, false, false, false);
						cameraRotator.pause(false);
					}, 4000);
					
					object_attach(BARBER_ped,{'name':'v_ret_gc_scissors','bone':6286,'x':0.08,'y':0.1,'z':-0.03,'r1':0,'r2':-25,'r3':-15});
					
					if(hud_browser) {
						hud_browser.execute('toggleBarberShop(\''+clothesData.npGender+'\',false,\''+tempHair.npHeadOverlay+'\');');
						mp.gui.cursor.visible = true;
					}
				}, 1000);
				
				// cam
				BARBER_cam = mp.cameras.new('default');
				BARBER_cam.setFov(47);
				BARBER_cam.setActive(true);
				mp.game.cam.renderScriptCams(true, false, 3000, true, false);
				
				var cam = tempBSAndTattoData[4];
				//chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * cam: "+JSON.stringify(cam)+"</span>");
				cameraRotator.start(BARBER_cam, cam[0], cam[0], cam[1], cam[2]);
				cameraRotator.setXBound(150, 240);
				cameraRotator.pause(true);
				
				BLOCK_CONTROLS = false;
				mp.game.cam.doScreenFadeIn(250);
			}else{
				BLOCK_CONTROLS = false;
				mp.game.cam.doScreenFadeIn(250);
			}
		}, 750);
	}else{
		BLOCK_CONTROLS = false;
		mp.game.cam.doScreenFadeIn(250);
	}
});

mp.events.add('barberShopExit', (shape) => {
	if(tempBSAndTattoData) {
		mp.events.call("sleepAntiCheat");
		cameraRotator.pause(true);
		cameraRotator.reset();
		play_anim_(localPlayer,'misshair_shop@barbers','player_exitchair',tempBSAndTattoData[5]);
		setTimeout(() => {
			restoreBinds();
			mp.gui.cursor.visible = false;
			BLOCK_CONTROLS = false;
			mp.events.callRemote('barberShopExit');
			
			localPlayer.clearTasks();
			if(BARBER_ped.object) {
				if(mp.objects.exists(BARBER_ped.object)) BARBER_ped.object.destroy();
			}
			if(mp.peds.exists(BARBER_ped)) BARBER_ped.destroy();
			BARBER_ped = false;
			
			makePersonage(localPlayer, true, true);
			if(typeof(localPlayer.getVariable("player.pers")) !== "undefined") {
				let persData = localPlayer.getVariable("player.pers");
				if(typeof(persData.npHeadOverlay["1"]) !== "undefined") localPlayer.setHeadOverlay(1, parseInt(persData.npHeadOverlay["1"].v), parseFloat(persData.npHeadOverlay["1"].o), parseInt(persData.npHeadOverlay["1"].c), parseInt(persData.npHeadOverlay["1"].c));
				if(typeof(persData.npHeadOverlay["2"]) !== "undefined") localPlayer.setHeadOverlay(2, parseInt(persData.npHeadOverlay["2"].v), parseFloat(persData.npHeadOverlay["2"].o), parseInt(persData.npHeadOverlay["2"].c), parseInt(persData.npHeadOverlay["2"].c));
			}
			
			mp.game.cam.renderScriptCams(false, false, 3000, true, false);
			BARBER_cam.destroy();
			cameraRotator.stop();
			cameraRotator.pause(false);
			
			mp.game.ui.displayRadar(true);
		}, 4000);
	}
});
}활飪쇠㿐ᗉླྀȡ