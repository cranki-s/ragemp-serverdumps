{
var globalAdmEvent = {};
var premissionToGlobalAdmEvent = false;

function refreshGlobalAdmEvent(newValue) {
	if(typeof(newValue) !== "undefined") globalAdmEvent = newValue;
	else if(typeof(mp.world.data["globalAdmEvent"]) !== "undefined") globalAdmEvent = mp.world.data["globalAdmEvent"];
	if(globalAdmEvent) {
		if(JSON.stringify(globalAdmEvent) == "{}") {
			chatAPI.notifyPush("Глобальное мероприятие <span style=\"color:#FEBC00\"><b>окончено</b></span>, спасибо Всем за участие!");
			mp.game.ui.notifications.showWithPicture("Рупор свободы", "Мероприятие окончено", "Спасибо Всем за участие, до скорых встреч!", "CHAR_MP_STRIPCLUB_PR", 1, false, 1, 2);
		}
	}
}
			
mp.events.add("globalAdmEventStarted", (eventMembers, eventName) => {
	if(typeof(eventMembers) !== "undefined" && typeof(eventName) !== "undefined") {
		if(localPlayer.dimension != 0) return false;
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) return false;
		}
		if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
			let playerBlocks = localPlayer.getVariable("player.blocks");
			if(typeof(playerBlocks.jail) !== "undefined") return false;
		}
		
		chatAPI.notifyPush("Начинается глобальное мероприятие <span style=\"color:#FEBC00\"><b>"+eventName+"</b></span> на <span style=\"color:#FEBC00\"><b>"+eventMembers+"</b></span> чел.");
		chatAPI.notifyPush("Прямо сейчас нажмите <span style=\"color:#FEBC00\"><b>F8</b></span> что-бы принять участие!");
		mp.game.ui.notifications.showWithPicture("Рупор свободы", "Глобальное мероприятие", "Нажми F8 что бы учавстовать!", "CHAR_MP_STRIPCLUB_PR", 1, false, 1, 2);
		
		premissionToGlobalAdmEvent = true;
	}
});

mp.events.add("worldDataChanged", (key, oldValue, newValue) => {
	if(key == "globalAdmEvent") refreshGlobalAdmEvent();
});

mp.events.add("triggerAdmEvent", (eventMembers, eventName) => {
	if(typeof(eventMembers) !== "undefined" && typeof(eventName) !== "undefined") {
		chatAPI.notifyPush("Начинаем глобальное мероприятие <span style=\"color:#FEBC00\"><b>"+eventName+"</b></span> на <span style=\"color:#FEBC00\"><b>"+eventMembers+"</b></span> чел.");
		mp.events.callRemote('triggerAdmEvent', eventMembers, eventName);
	}
});

mp.events.add("globalAdmEventOk", (eventName) => {
	if(typeof(eventName) !== "undefined") {
		chatAPI.notifyPush("Вы приняли участие в глобальном мероприятии <span style=\"color:#FEBC00\"><b>"+eventName+"</b></span>.");
		mp.game.ui.messages.showMidsizedShard("~y~Участие ~w~в мероприятии", "~s~~h~"+eventName+"", 5, false, true, 5000);
	}
});
}~s~Вас приняли работать на развозку вина", 5, false, true, 6500);
	setTimeout(function() {
		mp.game.ui.notifications.showWithPicture("Босс", "Приветик, милок", "Получил рабочий планшет? Нажми F5 и начни смену.", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
	}, 2000);
}
mp.events.add("startWineDeliveryJob", startWineDeliveryJob);

function wineDeliveryStartStop() {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		closeJobTablet(true);
		
		if(jobData.work == 0) {
			if(wineDeliveryImInWorkZone) {
				if(localPlayer.vehicle) {
					mp.game.ui.notifications.showWithPicture("Босс", "Связь плохая", "Нельзя начать смену из транспорта.", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
				}else{
					if(!activeJOBoperation) {
						wineryDeliveryMomentStart = true;
						setTimeout(function() { wineryDeliveryMomentStart = false; }, 3500);
						mp.events.call("sleepAntiCheat");
						mp.events.callRemote('startJobWork');
						mp.game.ui.notifications.showWithPicture("Босс", "Ну, милок, с богом", "Началась твоя рабочая смена. Статистика в планшете (F5)", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
						wineDeliveryActionsForGoToBase = 0;
						wineDeliveryProccessor();
					}
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Босс", "А ты где?", "Смену можно начать только на территории винного хранилища.", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Явитесь на территорию винного хранилища что бы начать смену.</span>");
			}
		}else{
			if(!activeJOBoperation) {
				activeJOBoperation = true;
				if(mp.markers.exists(wineDeliveryMarker)) wineDeliveryMarker.destroy();
				wineDeliveryMarker = false;
				if(mp.blips.exists(wineDeliveryBlip)) wineDeliveryBlip.destroy();
				wineDeliveryBlip = false;
				if(mp.colshapes.exists(wineDeliveryShape)) wineDeliveryShape.destroy();
				wineDeliveryShape = false;

				if(jobVehBackTimer) clearTimeout(jobVehBackTimer);
				
				if(jobData.workMoney > 0) {
					//let resWorkMoney = roundNumber((parseInt(jobData.workMoney)-(parseInt(jobData.workMoney)*0.13)), 0);
					let resWorkMoney = roundNumber(parseInt(jobData.workMoney), 0);
					let workMoneyText = resWorkMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы заработали за смену"+workMoneyText+" руб.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Босс", "Буду ждать тебя, котик", "Ну вот и закончилась твоя рабочая смена. Славно.", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
				}else{
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы ничего не заработали за смену.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Босс", "Какого чёрта?", "Ты ничего не сделал за смену. Предупреждение.", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
				}
				
				mp.events.callRemote('stopJobWork');
			}
		}
	}
}
mp.events.add("wineDeliveryStartStop", wineDeliveryStartStop);

function wineDeliveryForceStop() {
	if(mp.markers.exists(wineDeliveryMarker)) wineDeliveryMarker.destroy();
	wineDeliveryMarker = false;
	if(mp.blips.exists(wineDeliveryBlip)) wineDeliveryBlip.destroy();
	wineDeliveryBlip = false;
	if(mp.colshapes.exists(wineDeliveryShape)) wineDeliveryShape.destroy();
	wineDeliveryShape = false;
	
	if(jobVehBackTimer) clearTimeout(jobVehBackTimer);
}

function wineDeliveryProccessor() {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		
		wineDeliveryActionsForGoToBase++;
		let maxWineDeliveryActionsForGoToBase = jobData.rank + 1;
		if(maxWineDeliveryActionsForGoToBase >= 5) maxWineDeliveryActionsForGoToBase = 5;
		
		if(wineDeliveryActionsForGoToBase >= maxWineDeliveryActionsForGoToBase) {
			wineDeliveryStartPos = localPlayer.position;
			
			mp.game.ui.notifications.showWithPicture("Босс", "Пора на склады", "Новая партия товара для развозки ждёт тебя на базе.", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
			wineDeliveryShape = mp.colshapes.newSphere(-1904.4851, 2044.6267, 140.7399, 4.3/2, 0);
			wineDeliveryMarker = mp.markers.new(1, new mp.Vector3(-1904.4851, 2044.6267, 140.7399-1.3), 2.3,
			{
				direction: new mp.Vector3(0, 0, 0),
				rotation: new mp.Vector3(0, 0, 0),
				color: [255, 0, 0, 200],
				visible: true,
				dimension: 0
			});
			wineDeliveryBlip = mp.blips.new(626, new mp.Vector3(-1904.4851, 2044.6267, 140.7399), {
				name: "Точка погрузки на базе",
				scale: 0.8,
				color: 1,
				shortRange: false,
				dimension: 0
			});
			wineDeliveryBlip.setRoute(true);
			wineDeliveryBlip.setRouteColour(1);
			wineDeliveryShape.data = {"type":"wineDeliveryJobEvent", "marker":wineDeliveryMarker, "blip":wineDeliveryBlip};
			wineDeliveryActionsForGoToBase = 0;
		}else{
			wineDeliveryStartPos = localPlayer.position;
			
			let fieldPos = false;
			
			fieldPos = shopsPoses[getRandomInt(0, Object.keys(shopsPoses).length)];
		
			if(fieldPos) {
				wineDeliveryShape = mp.colshapes.newSphere(parseFloat(fieldPos[0]), parseFloat(fieldPos[1]), parseFloat(fieldPos[2]), 4.3/2, 0);
				wineDeliveryMarker = mp.markers.new(1, new mp.Vector3(parseFloat(fieldPos[0]), parseFloat(fieldPos[1]), parseFloat(fieldPos[2])-1.3), 2.3,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [255, 0, 0, 200],
					visible: true,
					dimension: 0
				});
				wineDeliveryBlip = mp.blips.new(626, new mp.Vector3(parseFloat(fieldPos[0]), parseFloat(fieldPos[1]), parseFloat(fieldPos[2])), {
					name: "Магазин для поставки вина",
					scale: 0.8,
					color: 1,
					shortRange: false,
					dimension: 0
				});
				wineDeliveryShape.data = {"type":"wineDeliveryJobEvent", "marker":wineDeliveryMarker, "blip":wineDeliveryBlip};
				wineDeliveryBlip.setRoute(true);
				wineDeliveryBlip.setRouteColour(1);
			}
		}
	}
}

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.id) != "undefined") {
				if(shape == wineDeliveryWorkZone) wineDeliveryImInWorkZone = true;
				if(typeof(shape.data) != 'undefined') {
					if(hud_browser && localPlayer.vehicle) {
						let toVehDist = mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z);
						if(toVehDist > 50) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Неизвестная ошибка..</span>");
						if(localPlayer.vehicle.getVariable("veh.job")) {
							if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
								let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
								if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
									if(typeof shape.data.type != 'undefined') {
										if(shape.data.type == "wineDeliveryJobEvent") {
											if(!localPlayer.hasCollisionLoadedAround()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Подождите полную прогрузку окружения..</span>");
											
											if(typeof shape.data.marker != 'undefined') shape.data.marker.destroy();
											if(typeof shape.data.blip != 'undefined') shape.data.blip.destroy();
											//let eventTime = getRandomInt(5000, 10000);

											let myPos = localPlayer.position;
											let dist = mp.game.system.vdist(myPos.x, myPos.y, myPos.z, wineDeliveryStartPos.x, wineDeliveryStartPos.y, wineDeliveryStartPos.z);
											if(shape.data) {
												localPlayer.freezePosition(true);
												localPlayer.vehicle.freezePosition(true);
												
												
												mp.game.ui.messages.showMidsized("~g~Начинаем ~s~разгрузку", "~s~пожалуйста, подождите..");
												
												let shapePos = false;
												if(typeof(shape) !== 'undefined' && mp.colshapes.exists(shape)) {
													shapePos = shape.position;
													shape.destroy();
												}
												
												setTimeout(function() {
													mp.game.ui.messages.showMidsized("~g~Успешно ~s~разгрузились", "~s~спасибо");
													if(typeof shape !== 'undefined' && mp.colshapes.exists(shape)) shape.destroy();
													if(shapePos) {
														let cheatDist = mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, shapePos.x, shapePos.y, shapePos.z);
														if(cheatDist > 20) return mp.events.callRemote('kickAct', localPlayer, "читы на телепорт на работе");
													}
													localPlayer.freezePosition(false);
													if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(false);
													
													mp.events.callRemote('actionMakedWineDeliveryJob', false, dist);
													wineDeliveryProccessor();
												}, 4000);
											}else{
												mp.game.ui.messages.showMidsized("~g~Успешно ~s~приняли новую партию", "~s~следуйте в следующий магазин для разгрузки");
												if(typeof shape !== 'undefined' && mp.colshapes.exists(shape)) shape.destroy();
			
												mp.events.callRemote('actionMakedWineDeliveryJob', true, dist);
												wineDeliveryProccessor();
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(shape == wineDeliveryWorkZone) wineDeliveryImInWorkZone = false;
		}
	}
});
}賄͈讈䩿ß