{
var fireWorkZone = mp.colshapes.newSphere(1200.4165,-1466.3885,34.3498,50,0);
var fireImInWorkZone = false;

function startFireJob() {
	if(typeof(localPlayer.getVariable('player.lics')) === "undefined") return hud_browser.execute('jobPanelError("#startCourierJob", "Технические неполадки системы лицензий..")');
	let myLics = {};
	if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
	if(myLics["bCat"] === undefined) return hud_browser.execute('jobPanelError("#startCourierJob", "Отсутствуют водительские права категории «B»")');
	
	closeJobTablet();
	mp.events.callRemote('startFireJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас приняли работать в пожарный департамент", 5, false, true, 6500);
	setTimeout(function() {
		mp.game.ui.notifications.showWithPicture("МЧС", "Здравия желаю", "Получил рабочий планшет? Нажми F5 и начни смену.", "CHAR_CALL911", 1, false, 1, 2);
	}, 2000);
}
mp.events.add("startFireJob", startFireJob);

function fireStartStop() {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		closeJobTablet(true);
		
		if(jobData.work == 0) {
			if(fireImInWorkZone) {
				if(localPlayer.vehicle) {
					mp.game.ui.notifications.showWithPicture("МЧС", "Убери транспорт", "Нельзя начать смену из транспорта.", "CHAR_CALL911", 1, false, 1, 2);
				}else{
					if(!activeJOBoperation) {
						mp.events.call("sleepAntiCheat");
						mp.events.callRemote('startJobWork');
						mp.game.ui.notifications.showWithPicture("МЧС", "Смена началась", "На карте появляются активные пожары, будь внимательнее", "CHAR_CALL911", 1, false, 1, 2);
					}
				}
			}else{
				mp.game.ui.notifications.showWithPicture("МЧС", "Будь на базе", "Смену можно начать только на территории базы.", "CHAR_CALL911", 1, false, 1, 2);
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Явитесь на базу пожарного департамента что бы начать смену.</span>");
			}
		}else{
			if(!activeJOBoperation) {
				activeJOBoperation = true;
		
				for (let blip of actualFires) {
					if(mp.blips.exists(blip)) blip.destroy();
				}
		
				if(jobData.workMoney > 0) {
					//let resWorkMoney = roundNumber((parseInt(jobData.workMoney)-(parseInt(jobData.workMoney)*0.13)), 0);
					let resWorkMoney = roundNumber(parseInt(jobData.workMoney), 0);
					let workMoneyText = resWorkMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы заработали за смену"+workMoneyText+" руб.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("МЧС", "Зарплата", "Отдохни и выходи на смену снова, страна ждёт!", "CHAR_CALL911", 1, false, 1, 2);
				}else{
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы ничего не заработали за смену.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("МЧС", "Это как так?", "Не тушил пожары?! Позорище..", "CHAR_CALL911", 1, false, 1, 2);
				}
				
				mp.events.callRemote('stopJobWork');
			}
		}
	}
}
mp.events.add("fireStartStop", fireStartStop);

function fireJobWarn(reason) {
	if(typeof(reason) !== "undefined") {
		mp.game.ui.notifications.showWithPicture("МЧС", "Выговор!", reason+".", "CHAR_CALL911", 1, false, 1, 2);
		mp.game.ui.messages.showMidsized("~w~Получен ~r~выговор", "~s~"+reason+".");
	}else{
		mp.game.ui.notifications.showWithPicture("МЧС", "Выговор!", "Что то случилось в ответственный момент!", "CHAR_CALL911", 1, false, 1, 2);
		mp.game.ui.messages.showMidsized("~w~Получен ~r~выговор", "~s~Что то случилось в ответственный момент!");
	}
	
	mp.events.call("sleepAntiCheat");
	mp.events.callRemote('cancelFireTask', true);
}

var afGetFireTruck = false;
mp.events.add('fireGetTruck', () => {
	if(afGetFireTruck) return hud_browser.execute('jobPanelError("#fireGetTruck", "Слишком частые попытки")');
	afGetFireTruck = setTimeout(() => { afGetFireTruck = false; }, 3500);
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		if(jobData.work == 0) return hud_browser.execute('jobPanelError("#fireGetTruck", "Сначала начните смену")');
	}
	if(fireImInWorkZone) {
		if(localPlayer.vehicle) return hud_browser.execute('jobPanelError("#fireGetTruck", "Вы должны быть пешком")');
		closeJobTablet(true);
		mp.events.callRemote('fireGetTruck');
	}else{
		return hud_browser.execute('jobPanelError("#fireGetTruck", "Это можно сделать только на базе")');
	}
});

var afGetFireMission = false;
var actualFires = [];
mp.events.add('fireGetMission', () => {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		if(jobData.work == 0) return hud_browser.execute('jobPanelError("#fireGetMission", "Сначала начните смену")');
	}
	if(!localPlayer.vehicle) return hud_browser.execute('jobPanelError("#fireGetMission", "Вы должны быть в своей пожарной машине")');
	let theVeh = localPlayer.vehicle;
	if(typeof(theVeh.getVariable("veh.job")) === "undefined") return hud_browser.execute('jobPanelError("#fireGetMission", "Вы должны быть в своей пожарной машине")');
	if(theVeh.getVariable("veh.job") != localPlayer.remoteId.toString()) return hud_browser.execute('jobPanelError("#fireGetMission", "Вы должны быть в своей пожарной машине")');
	
	if(afGetFireMission) return hud_browser.execute('jobPanelError("#fireGetMission", "Раз в 30 сек.")');
	afGetFireMission = setTimeout(() => { afGetFireMission = false; }, 30000);
	
	for (let blip of actualFires) {
		if(mp.blips.exists(blip)) blip.destroy();
	}
	
	closeJobTablet(true);
	
	mp.game.ui.notifications.showWithPicture("МЧС", "Запрашиваем", "Сейчас узнаем, где пожары..", "CHAR_CALL911", 1, false, 1, 2);
	mp.events.callRemote('fireGetMissions');
});

mp.events.add('fireGetMissionsResult', (resJSON) => {
	if(typeof(resJSON) !== "undefined") {
		resJSON = JSON.parse(resJSON);
		if(resJSON.count > 0) {
			for (let pos of resJSON.fires) {
				let fireBlip = mp.blips.new(436, pos, {
					name: "Активный пожар",
					scale: 1,
					color: 47,
					shortRange: false,
					dimension: 0
				});
				actualFires.push(fireBlip);
			}
			
			mp.game.ui.messages.showMidsized("Получена актуальная информация", "~s~Мы обнаружили ~g~новые очаги ~s~возгараний, отправляйтесь на помощь!");
			mp.game.ui.notifications.showWithPicture("МЧС", "Горим!", "Отправляйтесь на любой активный пожар..", "CHAR_CALL911", 1, false, 1, 2);
		}else{
			mp.game.ui.messages.showMidsized("Получена актуальная информация", "~s~Мы не обнаружили ~r~новые очаги ~s~возгараний!");
			mp.game.ui.notifications.showWithPicture("МЧС", "Всё спокойно", "Нет актуальных пожаров", "CHAR_CALL911", 1, false, 1, 2);
		}
	}
});

function playerDeathFireJob(player, reason, killer) {
	if(player == localPlayer) {
		for (let blip of actualFires) {
			if(mp.blips.exists(blip)) blip.destroy();
		}
	}
}
mp.events.add("playerDeath", playerDeathFireJob);

mp.events.add('fireRefillTruck', () => {
	if(afGetFireTruck) return hud_browser.execute('jobPanelError("#fireGetTruck", "Слишком частые попытки")');
	afGetFireTruck = setTimeout(() => { afGetFireTruck = false; }, 3500);
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		if(jobData.work == 0) return hud_browser.execute('jobPanelError("#fireGetTruck", "Сначала начните смену")');
	}
	if(!localPlayer.vehicle) return hud_browser.execute('jobPanelError("#fireGetTruck", "Вы должны быть в своей пожарной машине")');
	let theVeh = localPlayer.vehicle;
	if(typeof(theVeh.getVariable("veh.job")) === "undefined") return hud_browser.execute('jobPanelError("#fireGetTruck", "Вы должны быть в своей пожарной машине")');
	if(theVeh.getVariable("veh.job") != localPlayer.remoteId.toString()) return hud_browser.execute('jobPanelError("#fireGetTruck", "Вы должны быть в своей пожарной машине")');
	
	closeJobTablet(true);
	
	let myPos = localPlayer.position;
	let myRot = localPlayer.getHeading();
	
	let addictionRot = 0;
	let checkFirePeds = [];
	
	for (var i = 0; i < 18; i++) {
		if(i < 9) {
			addictionRot = addictionRot + 40;
			myPos.x = myPos.x - Math.sin(Math.radians(-myRot-addictionRot))*5;
			myPos.y = myPos.y - Math.cos(Math.radians(-myRot-addictionRot))*5;
			myPos.z = mp.game.gameplay.getGroundZFor3dCoord(myPos.x, myPos.y, myPos.z, parseFloat(0), false)-2.5;
		}else{
			addictionRot = addictionRot + 40;
			myPos.x = myPos.x + Math.sin(Math.radians(-myRot-addictionRot))*5;
			myPos.y = myPos.y + Math.cos(Math.radians(-myRot-addictionRot))*5;
			myPos.z = mp.game.gameplay.getGroundZFor3dCoord(myPos.x, myPos.y, myPos.z, parseFloat(0), false)-2.5;
		}
		
		// waterchecker
		let pedWaterChecker = mp.peds.new(
			mp.game.joaat('a_c_fish'),
			myPos,
			270.0,
			localPlayer.dimension
		);
		if(mp.peds.exists(pedWaterChecker)) pedWaterChecker.freezePosition(true);
		checkFirePeds.push(pedWaterChecker);
	}
	
	setTimeout(function() {
		checkFirePeds.forEach((pedWaterChecker) => {
			if(mp.peds.exists(pedWaterChecker)) pedWaterChecker.freezePosition(false);
		});
	}, 500);
	
	let waterResult = false;
	setTimeout(function() {
		checkFirePeds.forEach((pedWaterChecker) => {
			if(mp.peds.exists(pedWaterChecker)) {
				if(pedWaterChecker.isInWater() && !pedWaterChecker.isDead()) waterResult = true;
				pedWaterChecker.destroy();
			}
		});
		BLOCK_CONTROLS = true;
		if(waterResult) {
			
		}else{
			
		}
		chatAPI.sysPush("<span style=\"color:#FF6146;\"> * waterResult: "+waterResult.toString()+"</span>");
	}, 1250);
	
	//mp.events.callRemote('fireGetTruck');
});

mp.events.add('fireGetTruckError', (reason) => {
	if(typeof(reason) !== "undefined") return hud_browser.execute('jobPanelError("#fireGetTruck", "'+reason+'")');
});

var fireJob = [];
fireJob.marker = false;
fireJob.particleActive = false;
fireJob.particleEntity = [];
fireJob.wateractive = false;

fireJob.firesuit = {"mask":false,"head":false,"tors":false,"pants":false,"shoes":false};

mp.events.add('render', () => {
	renderFireEngine();
});

function loadParticlesFire() {
	mp.game.streaming.requestNamedPtfxAsset("core");
	while(!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) mp.game.wait(0);
}
loadParticlesFire();

let fireResultFiringAF = false;
var updateWaterFireTruckTank = false;
function renderFireEngine() {
	mp.objects.forEachInStreamRange((entity) => { // Рендер огня в зоне видимости
		if(typeof(entity.getVariable("obj.type")) !== "undefined") {
			if(entity.getVariable("obj.type") == "entity_fire") {
				if(mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, entity.position.x, entity.position.y, entity.position.z) <= 50) {
					if(!entity.fireLoaded) {
						entity.fireLoaded = true;
						if(typeof(entity.getVariable("obj.data")) !== "undefined") {
							let objData = entity.getVariable("obj.data");
							let position = new mp.Vector3(objData.particle.position[0],objData.particle.position[1],objData.particle.position[2]);
							let rotation = new mp.Vector3(objData.particle.rotation[0],objData.particle.rotation[1],objData.particle.rotation[2]);
							mp.game.graphics.setPtfxAssetNextCall("core");
							entity.particle = mp.game.graphics.startParticleFxLoopedOnEntity(objData.particle.effectName, entity.handle, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, 1, objData.particle.xAxis, objData.particle.yAxis, objData.particle.zAxis);
						}
					}else{
						if(!localPlayer.isDead() && !localPlayer.vehicle && (!fireJob.firesuit.mask || !fireJob.firesuit.head || !fireJob.firesuit.tors || !fireJob.firesuit.pants || !fireJob.firesuit.shoes)) {
							if(mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, entity.position.x, entity.position.y, entity.position.z) <= 2) { // && !localPlayer.getVariable('fireJob')
								if(!mp.game.invoke('0x28D3FED7190D3A0B',localPlayer.handle)) {
									mp.game.invoke('0x7F0DD2EBBB651AFF',localPlayer.handle);
									mp.game.invoke('0xF6A9D9708F6F23DF',localPlayer.handle);
									setTimeout(() => { mp.game.invoke('0x7F0DD2EBBB651AFF', localPlayer.handle); }, 3000);
								}
							}
						}
					}
				}else{
					if(entity.fireLoaded) {
						if(entity.particle) mp.game.graphics.stopParticleFxLooped(entity.particle, false);
						entity.fireLoaded = false;
					}
				}
			}
		}
	});
	
	if(mp.game.player.isFreeAiming() || mp.game.controls.isControlPressed(0, 24) || mp.game.controls.isControlPressed(0, 25)) {
		fireJob.wateractive = true;
		
		var value = false;
		let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle);
		if(localPlayer.vehicle) {
			let theVeh = localPlayer.vehicle;
			if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
				if(theVeh.getVariable("veh.hash") == "s_p450") value = 2;
			}
		}else if(weaponHash == 101631238) {
			if(typeof(localPlayer.getVariable("player.job")) !== "undefined") {
				let jobData = localPlayer.getVariable("player.job");
				if(typeof(jobData.work) !== "undefined" && typeof(jobData.name) !== "undefined") {
					if(jobData.work == 1 && jobData.name == "fire") value = 1;
				}
			}
		}
		
		if(value) {
			let target = return_FireMarker(value);
			if (!fireJob.marker && typeof(target) !== "undefined") {
				fireJob.marker = mp.markers.new(28, new mp.Vector3(target.position.x, target.position.y, target.position.z), target.radius, { direction: 0, rotation: 0, color: [255, 0, 1, 70], visible: true, dimension: localPlayer.dimension });
			}else{
				if(typeof(target) !== "undefined") renderFireMarker(value, target);
				
				mp.objects.forEachInStreamRange((entity) => { // Рендер огня в зоне видимости
					if(typeof(entity.getVariable("obj.type")) !== "undefined") {
						if(entity.getVariable("obj.type") == "entity_fire") {
							// Тушение
							if(mp.game.system.vdist(entity.position.x, entity.position.y, entity.position.z, fireJob.marker.position.x, fireJob.marker.position.y, fireJob.marker.position.z) <= 1) {
								let pos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(fireJob.marker.position.x,fireJob.marker.position.y,fireJob.marker.position.z));
								if(fireJob.wateractive && typeof(entity.destroying) === "undefined") {
									if(typeof(entity.health_) === "undefined") entity.health_ = 100;
									if(mp.game.controls.isControlPressed(0, 24) && !localPlayer.vehicle) {
										if(entity.health_ <= 0) {
											if(!fireResultFiringAF) {
												fireResultFiringAF = setTimeout(() => { fireResultFiringAF = false; }, 6000);
												
												let isFinded = false;
												mp.vehicles.forEachInStreamRange(
													(vehicle, id) => {
														if(typeof(vehicle.getVariable("veh.hash")) !== "undefined") {
															if(vehicle.getVariable("veh.hash") == "s_p450") isFinded = true;
														}
													}
												);
												
												if(isFinded) {
													entity.destroying = true;
													mp.events.callRemote('actionMakedFireJob', entity.remoteId);
													mp.game.ui.messages.showMidsized("Очаг потушен", "~s~Вы ~g~успешно ~s~потушили очаг возгарания!");
													mp.game.ui.notifications.showWithPicture("МЧС", "Идёт погрузка..", "Вы успешно потушили очаг возгарания..", "CHAR_CALL911", 1, false, 1, 2);
												}else{
													mp.game.ui.messages.showMidsized("Рядом нет пожарных расчётов", "~s~Рядом ~r~должен быть ~s~хоть один пожарный грузовик!");
												}
											}
										}else{
											if(value == 1) entity.health_ = entity.health_-0.3;
											else entity.health_ = entity.health_-0.3;
										}
									}else if(localPlayer.vehicle && mp.game.controls.isControlPressed(0, 25)) {
										let isFinded = false;
										if(typeof(localPlayer.vehicle.getVariable("veh.hash")) !== "undefined") {
											if(localPlayer.vehicle.getVariable("veh.hash") == "s_p450") isFinded = true;
										}
										if(isFinded) {
											if(entity.health_ <= 0) {
												entity.destroying = true;
												mp.events.callRemote('actionMakedFireJob', entity.remoteId);
												mp.game.ui.messages.showMidsized("Очаг потушен", "~s~Вы ~g~успешно ~s~потушили очаг возгарания!");
												mp.game.ui.notifications.showWithPicture("МЧС", "Идёт погрузка..", "Вы успешно потушили очаг возгарания..", "CHAR_CALL911", 1, false, 1, 2);
											}else{
												//if(processorFuelVehData) {
													//if(typeof(processorFuelVehData.firetank) !== "undefined") {
														//if(processorFuelVehData.firetank > 0) {
															entity.health_ = entity.health_-0.5;
															//processorFuelVehData.firetank = processorFuelVehData.firetank - 0.1;
															//updateWaterFireTruckTank = true;
														//}
													//}
												//}
											}
										}
									}
									displayFireHealth(entity, pos.x, pos.y);
								}
							}
						}
					}
				});
			}
		}else{
			if(fireJob.wateractive) {
				fireJob.wateractive = false;
				if(fireJob.marker) {
					if(mp.markers.exists(fireJob.marker)) {
						fireJob.marker.destroy();
						fireJob.marker = false;
					}
				}
			}
		}
	}else{
		if(fireJob.wateractive) {
			fireJob.wateractive = false;
			if(fireJob.marker) {
				if(mp.markers.exists(fireJob.marker)) {
					fireJob.marker.destroy();
					fireJob.marker = false;
				}
			}
		}
	}
}

function renderFireMarker(value,target) {
    // fireJob.marker.z = 0;
	let pos = localPlayer.position;
	if(value == 2) pos = localPlayer.vehicle.position;
	if(typeof(target.position) !== "undefined") {
		let raycastResult = mp.raycasting.testPointToPoint(new mp.Vector3(pos.x, pos.y, pos.z), new mp.Vector3(target.position.x, target.position.y, target.position.z), localPlayer, -1);
		if(typeof(raycastResult) !== "undefined") {
			if(raycastResult.position) {
				if(mp.markers.exists(fireJob.marker)) fireJob.marker.position = new mp.Vector3(raycastResult.position.x, raycastResult.position.y, raycastResult.position.z);
			}
		}
	}
}

function displayFireHealth(object_, x, y) {
    let health = object_.health_;
    health = health <= 100 ? health / 100 : (health - 100) / 100;
	
    let width = 0.025, height = 0.007, border = 0.0015;
    mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
    mp.game.graphics.drawRect(x, y, width, height, 41, 66, 78, 255);
    mp.game.graphics.drawRect(x - width / 2 * (1 - health), y, width * health, height, 48, 108, 135, 200);
}

var oldFireMarkerZ;
function return_FireMarker(value) {
	if(value == 1 || value == 2) {
		var res = mp.game.graphics.getScreenActiveResolution(1, 1);
		var position = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2]);
		var direction = mp.cameras.new("gameplay").getDirection();
		
		if(value == 1) {
			var distance = 3;
			var radius = 0.55;
			var z = (direction.z * distance) + position.z;
		}else if(value == 2) {
			var distance = 28;
			var radius = 1.2;
			
			let heading = mp.game.cam.getGameplayCamRot(0);
			let angle = Math.round(heading.x) >= 0 ? 90 : Math.abs(heading.x)
			var sss = 1 - Math.sin((angle * Math.PI) / 180);
			
			if(sss <= 0.9541788919176408 && angle != 90) var z = oldFireMarkerZ;
			else {
				var z = (direction.z * distance) + position.z;
				oldFireMarkerZ = z;
			}
		}
		
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify({"position":new mp.Vector3((direction.x * distance) + position.x, (direction.y * distance) + position.y, z),"radius":radius})+"</span>");
		return {"position":new mp.Vector3((direction.x * distance) + position.x, (direction.y * distance) + position.y, z),"radius":radius};
	}
}

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(shape == fireWorkZone) fireImInWorkZone = true;
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(shape == fireWorkZone) fireImInWorkZone = false;
	}
});
}