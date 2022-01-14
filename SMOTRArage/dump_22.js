{
/*mp.markers.new(28, new mp.Vector3(901.2396,-169.0619,74.0757), 30, // DEBUG
{
	direction: new mp.Vector3(0, 0, 0),
	rotation: new mp.Vector3(0, 180, 0),
	color: [0, 0, 200, 50],
	visible: true,
	dimension: 0
});*/

var taxiWorkZone = mp.colshapes.newSphere(901.2396,-169.0619,74.0757, 30, 0);
var taxiImInWorkZone = false;

let taxiPed = false;
let taxiMarker = false;
let taxiBlip = false;
let taxiCheckpoint = false;
let curCallData = [];
let taxiCallsBlocked = false;

var taxiMomentStart = false;

function cancelTaxiJobClient(){
	closeJobTablet(true);
	
	if(typeof(curCallData) != "undefined") {
		if(typeof(curCallData.callData) != "undefined") mp.events.callRemote('cancelTaxiJobClient', JSON.stringify(curCallData.callData));
		curCallData = [];
		
		if(mp.peds.exists(taxiPed)) taxiPed.destroy();
		taxiPed = false;
		if(mp.markers.exists(taxiMarker)) taxiMarker.destroy();
		taxiMarker = false;
		if(mp.blips.exists(taxiBlip)) taxiBlip.destroy();
		taxiBlip = false;
		if(mp.checkpoints.exists(taxiCheckpoint)) taxiCheckpoint.destroy();
		taxiCheckpoint = false;
		
		mp.game.ui.messages.showMidsized("~g~Вы успешно ~s~отказались от заказа", "~s~Новые заказы можно посмотреть в планшете (F5)");
		mp.game.ui.notifications.showWithPicture("Босс", "Отказ от заказа", "Отменил. Я заблокировал агрегатор на 1 мин.", "CHAR_ORTEGA", 1, false, 1, 2);
		
		taxiCallsBlocked = true;
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Босс", "Агрегатор доступен", "Я разблокировал тебе агрегатор.", "CHAR_ORTEGA", 1, false, 1, 2);
			taxiCallsBlocked = false;
		}, 60000);
	}
}
mp.events.add("cancelTaxiJobClient", cancelTaxiJobClient);

function taxiWorkCanceledByPlayer(){
	if(typeof(curCallData) != "undefined") {
		curCallData = [];

		if(mp.peds.exists(taxiPed)) taxiPed.destroy();
		taxiPed = false;
		if(mp.markers.exists(taxiMarker)) taxiMarker.destroy();
		taxiMarker = false;
		if(mp.blips.exists(taxiBlip)) taxiBlip.destroy();
		taxiBlip = false;
		if(mp.checkpoints.exists(taxiCheckpoint)) taxiCheckpoint.destroy();
		taxiCheckpoint = false;
		
		mp.game.ui.messages.showMidsized("~r~Игрок ~s~отменил от заказ", "~s~Новые заказы можно посмотреть в планшете (F5)");
		mp.game.ui.notifications.showWithPicture("Босс", "Игрок отказался", "Вот уроды, кхм.. Клиент отменил заказ.", "CHAR_ORTEGA", 1, false, 1, 2);
	}
}
mp.events.add("taxiWorkCanceledByPlayer", taxiWorkCanceledByPlayer);

function acceptCallTaxi(data){
	if(data) {
		closeJobTablet();
		/*if(data.name == "Работа в такси") {
			mp.game.ui.notifications.showWithPicture("Босс", "Блок агрегатора", "Таксопарк на доработке, попробуйте позже..", "CHAR_ORTEGA", 1, false, 1, 2);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Работа такси на доработке, попробуйте позже.</span>");
		}*/
		if(taxiCallsBlocked) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("Босс", "Блок агрегатора", "У тебя заблокирован агрегатор на 1 мин.", "CHAR_ORTEGA", 1, false, 1, 2);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас заблокирован доступ к агрегатору, попробуйте через минуту..</span>");
		}
		let theVeh = localPlayer.vehicle;
		if(theVeh) {
			if(!theVeh.getVariable("veh.job")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть в рабочем транспорте</span>");
			if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')))) {
				let vehJob = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')));
				if(vehJob.remoteId.toString() != localPlayer.remoteId.toString()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть в личном рабочем транспорте</span>");
			}else{
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть в личном рабочем транспорте</span>");
			}
		}else{
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть в рабочем транспорте</span>");
		}
		//data = JSON.parse(data);
		//data = data[0];
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * DATA: "+data+"</span>");
		mp.events.callRemote('acceptCallTaxi', data);
	}
}
mp.events.add("acceptCallTaxi", acceptCallTaxi);

function acceptedCallTaxi(isError, data){
	restoreBinds();
	jobPanel = false;
	if(isError) {
		return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Этот заказ уже перехватили, выберите другой</span>");
	}else{
		if(data) {
			data = JSON.parse(data);
			curCallData = data;
			mp.game.ui.messages.showMidsized("~g~Вызов ~s~принят", "~s~отправляйтесь за клиентом");
			mp.game.ui.notifications.showWithPicture("Босс", "Вызов принят", "Отправляйся к клиенту. Точка уже на радаре.", "CHAR_ORTEGA", 1, false, 1, 2);
			let callData = data.callData;
			
			taxiPed = mp.peds.new(
				mp.game.joaat(callData[5]), 
				new mp.Vector3(parseFloat(callData[0]), parseFloat(callData[1]), parseFloat(callData[2])),
				parseFloat(callData[3])
			);
			taxiPed.freezePosition(true);
			
			taxiMarker = mp.markers.new(1, new mp.Vector3(parseFloat(callData[0]), parseFloat(callData[1]), parseFloat(callData[2])-2.3), 4.3,
			{
				direction: new mp.Vector3(0, 0, 0),
				rotation: new mp.Vector3(0, 0, 0),
				color: [255, 0, 0, 200],
				visible: true,
				dimension: 0
			});
			taxiBlip = mp.blips.new(626, new mp.Vector3(parseFloat(callData[0]), parseFloat(callData[1]), parseFloat(callData[2])), {
				name: "Вас ожидает клиент",
				scale: 0.8,
				color: 5,
				shortRange: false,
				dimension: 0
			});
			taxiBlip.setRoute(true);
			taxiBlip.setRouteColour(5);
			taxiCheckpoint = mp.checkpoints.new(0, new mp.Vector3(parseFloat(callData[0]), parseFloat(callData[1]), parseFloat(callData[2])), 9,
			{
				color: [255, 255, 255, 0],
				visible: true,
				dimension: 0
			});
			taxiCheckpoint.data = {"type":"taxiClientPoint","callData":callData};
		}else{
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Сбой в работе агрегатора, выберите другой вызов</span>");
		}
	}
}
mp.events.add("acceptedCallTaxi", acceptedCallTaxi);

function gettedTaxiCalls(taxiCalls){
	if(taxiCalls) {
		let myPos = localPlayer.position;
		let taxiCallsToSend = [];
		for (var k in taxiCalls) {
			if(taxiCalls[k]) {
				let callData = taxiCalls[k];
				if(callData[6].toString() == "false") {
					if(localPlayer.getVariable("player.job")) {
						let jobData = localPlayer.getVariable("player.job");
						if(typeof(jobData.workActCost) != "undefined") {
							let dist = mp.game.gameplay.getDistanceBetweenCoords(parseFloat(myPos.x), parseFloat(myPos.y), parseFloat(myPos.z), parseFloat(callData[0]), parseFloat(callData[1]), parseFloat(callData[2]), true);
							dist = roundNumber(dist/1000, 1);
							let distToPoint = mp.game.gameplay.getDistanceBetweenCoords(parseFloat(callData[0]), parseFloat(callData[1]), parseFloat(callData[2]), parseFloat(callData[7]), parseFloat(callData[8]), parseFloat(callData[9]), true);
							distToPoint = roundNumber(distToPoint/1000, 1);
							
							let nick = "Бот";
							let cost = 2500;
							if(callData[4] == "ped") {
								nick = "Бот";
								cost = roundNumber(parseInt(jobData.workActCost) * distToPoint, 0);
							}else if(callData[4] == "player") {
								mp.players.forEach(
									(player) => {
										if(typeof(player.getVariable("player.id")) != "undefined") {
											if(parseInt(player.getVariable("player.id")) == parseInt(callData[5])) {
												nick = player.getVariable("player.nick");
												cost = roundNumber((parseInt(jobData.workActCost) * distToPoint) + (parseInt(jobData.workActCost) * distToPoint) * 0.05, 0);
												return false;
											}
										}
									}
								);
							}
							
							//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вызвал: "+nick+" | От вас в "+dist+" км. | Маршрут: "+distToPoint+" км. | "+cost+" руб.</span>");
							
							if(cost != 2500) taxiCallsToSend.push({"nick":nick.toString(), "cost":cost, "dist":dist, "distToPoint":distToPoint, "callData":callData});
						}
					}
				}
			}
		}
		if(!taxiMarker) {
			if(Object.keys(taxiCallsToSend).length > 0) {
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(taxiCallsToSend)+"</span>");
				hud_browser.execute("gettedTaxiCalls('ok', '"+JSON.stringify(taxiCallsToSend)+"');");
			}else{
				hud_browser.execute("gettedTaxiCalls('empty');");
			}
		}else{
			hud_browser.execute("gettedTaxiCalls('you_have_call');");
		}
	}
}
mp.events.add("gettedTaxiCalls", gettedTaxiCalls);

function getTaxiCalls(){
	if(!taxiMarker) {
		if(taxiCall) return hud_browser.execute("gettedTaxiCalls('you_have_call_from_phone');");
		mp.events.callRemote('getTaxiCalls');
	}else{
		hud_browser.execute("gettedTaxiCalls('you_have_call');");
	}
}
mp.events.add("getTaxiCalls", getTaxiCalls);

function startTaxiJob() {
	if(typeof(localPlayer.getVariable('player.lics')) === "undefined") return hud_browser.execute('jobPanelError("#startTaxiJob", "Технические неполадки системы лицензий..")');
	let myLics = {};
	if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
	if(myLics["bCat"] === undefined) return hud_browser.execute('jobPanelError("#startTaxiJob", "Отсутствуют водительские права категории «B»")');
	closeJobTablet(true);
	mp.events.callRemote('startTaxiJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас приняли работать в такси", 5, false, true, 6500);
	setTimeout(function() {
		mp.game.ui.notifications.showWithPicture("Босс", "Приветствую", "Получил рабочий планшет? Нажми F5 и начни смену.", "CHAR_ORTEGA", 1, false, 1, 2);
	}, 2000);
}
mp.events.add("startTaxiJob", startTaxiJob);

function taxiStartStop() {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		closeJobTablet(true);
		
		if(jobData.work == 0) {
			if(taxiImInWorkZone) {
				if(localPlayer.vehicle) {
					mp.game.ui.notifications.showWithPicture("Босс", "Связь плохая", "Нельзя начать смену из транспорта.", "CHAR_ORTEGA", 1, false, 1, 2);
				}else{
					if(!activeJOBoperation) {
						taxiMomentStart = true;
						setTimeout(function() { taxiMomentStart = false; }, 3500);
						mp.events.call("sleepAntiCheat");
						mp.events.callRemote('startJobWork');
						mp.game.ui.notifications.showWithPicture("Босс", "На линии", "Началась твоя рабочая смена. Агрегатор в планшете (F5)", "CHAR_ORTEGA", 1, false, 1, 2);
						if(hud_browser) hud_browser.execute('playSound("welcomeTaxiWork", "0.1");');
					}
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Босс", "Жду в таксопарке", "Смену можно начать только на территории таксопарка.", "CHAR_ORTEGA", 1, false, 1, 2);
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Явитесь в таксопарк что бы начать смену в такси.</span>");
			}
		}else{
			if(!activeJOBoperation) {
				activeJOBoperation = true;
				
				if(typeof(curCallData) != "undefined") {
					if(typeof(curCallData.callData) != "undefined") mp.events.callRemote('cancelTaxiJobClient', JSON.stringify(curCallData.callData));
					curCallData = [];

					if(mp.peds.exists(taxiPed)) taxiPed.destroy();
					taxiPed = false;
					if(mp.markers.exists(taxiMarker)) taxiMarker.destroy();
					taxiMarker = false;
					if(mp.blips.exists(taxiBlip)) taxiBlip.destroy();
					taxiBlip = false;
					if(mp.checkpoints.exists(taxiCheckpoint)) taxiCheckpoint.destroy();
					taxiCheckpoint = false;
				}
		
				if(jobVehBackTimer) clearTimeout(jobVehBackTimer);
		
				if(jobData.workMoney > 0) {
					//let resWorkMoney = roundNumber((parseInt(jobData.workMoney)-(parseInt(jobData.workMoney)*0.13)), 0);
					let resWorkMoney = roundNumber(parseInt(jobData.workMoney), 0);
					let workMoneyText = resWorkMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы заработали за смену"+workMoneyText+" руб.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Босс", "Отстрелялся", "С линии снял тебя, отдохни и выходи на линию снова.", "CHAR_ORTEGA", 1, false, 1, 2);
				}else{
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы ничего не заработали за смену.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Босс", "Я несу убытки", "Ты никого не возил за смену. Предупреждение.", "CHAR_ORTEGA", 1, false, 1, 2);
				}
				
				
				mp.events.callRemote('stopJobWork');
			}
		}
	}
}
mp.events.add("taxiStartStop", taxiStartStop);

function taxiForceStop() {
	if(mp.peds.exists(taxiPed)) taxiPed.destroy();
	taxiPed = false;
	if(mp.markers.exists(taxiMarker)) taxiMarker.destroy();
	taxiMarker = false;
	if(mp.blips.exists(taxiBlip)) taxiBlip.destroy();
	taxiBlip = false;
	if(mp.checkpoints.exists(taxiCheckpoint)) taxiCheckpoint.destroy();
	taxiCheckpoint = false;
	
	if(jobVehBackTimer) clearTimeout(jobVehBackTimer);
}

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.id) !== "undefined") {
				if(checkpoint == taxiCheckpoint) {
					let checkpointPos = false;
					if(typeof(checkpoint) !== 'undefined' && mp.checkpoints.exists(checkpoint)) checkpointPos = checkpoint.position;
					
					if(typeof(taxiCheckpoint.data) !== "undefined") {
						if(taxiCheckpoint.data.type == "taxiEndPoint") {
							if(!localPlayer.hasCollisionLoadedAround()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Подождите полную прогрузку окружения..</span>");
							let theVeh = localPlayer.vehicle;
							if(theVeh) {
								if(!theVeh.getVariable("veh.job")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть на рабочем транспорте</span>");
								if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')))) {
									let vehJob = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')));
									if(vehJob.remoteId.toString() != localPlayer.remoteId.toString()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть на личном рабочем транспорте</span>");
								}else{
									return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть на личном рабочем транспорте</span>");
								}
								if(theVeh.getSpeed() > 15) {
									chatAPI.sysPush("<span style=\"color:#FF6146\"> * Остановите полностью транспортное средство для высадки клиента</span>");
									return mp.game.ui.notifications.showWithPicture("Босс", "Чё типа, быстрый?", "По-медленнее, дай человеку выйти! Ты в своём уме?", "CHAR_ORTEGA", 1, false, 1, 2);
								}
							}else{
								return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть на рабочем транспорте</span>");
							}
							let resTaxiMoney = 0;
							let tempCallData = curCallData.callData;
							
							if(typeof(localPlayer.getVariable("player.job")) != "undefined") {
								let jobData = localPlayer.getVariable("player.job");
								if(tempCallData[4] == "ped") resTaxiMoney = roundNumber(parseInt(jobData.workActCost) * curCallData.distToPoint, 0);
								
								mp.game.ui.messages.showMidsized("~g~Клиент доставлен ~s~к месту назначения", "~s~вы заработали "+resTaxiMoney+" руб.");
								mp.game.ui.notifications.showWithPicture("Босс", "Красава-на!", "Так держать, проверь планшет на новые заказы (F5)", "CHAR_ORTEGA", 1, false, 1, 2);
							}
							
							if(mp.peds.exists(taxiPed)) taxiPed.destroy();
							taxiPed = false;
							if(mp.markers.exists(taxiMarker)) taxiMarker.destroy();
							taxiMarker = false;
							if(mp.blips.exists(taxiBlip)) taxiBlip.destroy();
							taxiBlip = false;
							if(mp.checkpoints.exists(taxiCheckpoint)) taxiCheckpoint.destroy();
							taxiCheckpoint = false;
							
							mp.events.callRemote('actionMakedTaxiJob', tempCallData[5].toString(), resTaxiMoney);
							
							curCallData = [];
						}else if(taxiCheckpoint.data.type == "taxiClientPoint") {
							if(!localPlayer.hasCollisionLoadedAround()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Подождите полную прогрузку окружения..</span>");
							let myJobData = localPlayer.getVariable("player.job");
							if(typeof(myJobData.name) != 'undefined') {
								if(myJobData.name == "taxi" && typeof(myJobData.work) != 'undefined') {
									let checkData = taxiCheckpoint.data.callData;
									let theVeh = localPlayer.vehicle;
									if(theVeh) {
										if(!theVeh.getVariable("veh.job")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть на рабочем транспорте</span>");
										if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')))) {
											let vehJob = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')));
											if(vehJob.remoteId.toString() != localPlayer.remoteId.toString()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть на личном рабочем транспорте</span>");
										}else{
											return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны быть на личном рабочем транспорте</span>");
										}
										if(theVeh.getSpeed() > 13) {
											chatAPI.sysPush("<span style=\"color:#FF6146\"> * Остановите полностью транспортное средство для посадки клиента в машину</span>");
											return mp.game.ui.notifications.showWithPicture("Босс", "Чё типа, быстрый?", "По-медленнее, клиент тебя не заметил! Ты в своём уме?", "CHAR_ORTEGA", 1, false, 1, 2);
										}
										if(typeof(checkData[5]) !== "undefined" && checkData[6].toString() != "false") {
											if(parseInt(checkData[6]) == parseInt(localPlayer.getVariable("player.id"))) {
												if(checkData[4] == "ped") {
													if(taxiPed) {
														localPlayer.freezePosition(true);
														localPlayer.vehicle.freezePosition(true);
														setTimeout(function() {
															if(checkpointPos) {
																let cheatDist = mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, checkpointPos.x, checkpointPos.y, checkpointPos.z);
																if(cheatDist > 20) mp.events.callRemote('kickAct', localPlayer, "читы на телепорт на работе");
															}
															localPlayer.freezePosition(false);
															if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(false);
														}, 4000);
														
														taxiPed.freezePosition(false);
														taxiPed.taskEnterVehicle(theVeh.handle, 10000, 2, 1, 1, 0);
														
														setTimeout(() => {
															if(taxiPed && theVeh) {
																if(mp.peds.exists(taxiPed)) {
																	if(taxiPed.isInVehicle(theVeh.handle, false) && hud_browser) hud_browser.execute('playSound("taxiDriveStart", "0.1");');
																}
															}
														}, 10500);
														
														if(mp.markers.exists(taxiMarker)) taxiMarker.destroy();
														taxiMarker = false;
														if(mp.blips.exists(taxiBlip)) taxiBlip.destroy();
														taxiBlip = false;
														if(mp.checkpoints.exists(taxiCheckpoint)) taxiCheckpoint.destroy();
														taxiCheckpoint = false;
														
														mp.game.ui.messages.showMidsized("~g~Прибытие к ~s~клиенту", "~s~дождитесь посадки клиента в такси и отвезите его");
														mp.game.ui.notifications.showWithPicture("Босс", "Клиент на месте?", "Если его нет, отменяй вызов :(", "CHAR_ORTEGA", 1, false, 1, 2);
														
														taxiMarker = mp.markers.new(1, new mp.Vector3(parseFloat(checkData[7]), parseFloat(checkData[8]), parseFloat(checkData[9])-2.3), 4.3,
														{
															direction: new mp.Vector3(0, 0, 0),
															rotation: new mp.Vector3(0, 0, 0),
															color: [255, 0, 0, 200],
															visible: true,
															dimension: 0
														});
														taxiBlip = mp.blips.new(626, new mp.Vector3(parseFloat(checkData[7]), parseFloat(checkData[8]), parseFloat(checkData[9])), {
															name: "Точка маршрута от клиента",
															scale: 0.8,
															color: 5,
															shortRange: false,
															dimension: 0
														});
														taxiBlip.setRoute(true);
														taxiBlip.setRouteColour(5);
														
														taxiCheckpoint = mp.checkpoints.new(0, new mp.Vector3(parseFloat(checkData[7]), parseFloat(checkData[8]), parseFloat(checkData[9])), 9,
														{
															color: [255, 255, 255, 0],
															visible: true,
															dimension: 0
														});
														
														taxiCheckpoint.data = {"type":"taxiEndPoint"};
													}else{
														chatAPI.sysPush("<span style=\"color:#FF6146\"> * Бот не хочет ехать с Вами, отмените и возьмите другой заказ.</span>");
														chatAPI.sysPush("<span style=\"color:#FF6146\"> * По всей видимости, он не в адекватном состоянии..</span>");
														mp.game.ui.notifications.showWithPicture("Босс", "Клиент странный", "Не пускай этого алкаша в машину", "CHAR_ORTEGA", 1, false, 1, 2);
													}
												}else if(checkData[4] == "player") {
													localPlayer.freezePosition(true);
													localPlayer.vehicle.freezePosition(true);
													setTimeout(function() {
														if(checkpointPos) {
															let cheatDist = mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, checkpointPos.x, checkpointPos.y, checkpointPos.z);
															if(cheatDist > 20) mp.events.callRemote('kickAct', localPlayer, "читы на телепорт на работе");
														}
														localPlayer.freezePosition(false);
														if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(false);
													}, 4000);
													
													if(mp.peds.exists(taxiPed)) taxiPed.destroy();
													taxiPed = false;
													if(mp.markers.exists(taxiMarker)) taxiMarker.destroy();
													taxiMarker = false;
													if(mp.blips.exists(taxiBlip)) taxiBlip.destroy();
													taxiBlip = false;
													if(mp.checkpoints.exists(taxiCheckpoint)) taxiCheckpoint.destroy();
													taxiCheckpoint = false;
													
													mp.game.ui.messages.showMidsized("~g~Прибытие к ~s~клиенту", "~s~дождитесь посадки клиента в такси и отвезите его");
													mp.game.ui.notifications.showWithPicture("Босс", "Клиент на месте?", "Если его нет, отменяй вызов :(", "CHAR_ORTEGA", 1, false, 1, 2);
													
													taxiBlip = mp.blips.new(626, new mp.Vector3(parseFloat(checkData[7]), parseFloat(checkData[8]), parseFloat(checkData[9])), {
														name: "Точка маршрута от клиента",
														scale: 0.8,
														color: 5,
														shortRange: false,
														dimension: 0
													});
													taxiBlip.setRoute(true);
													taxiBlip.setRouteColour(5);
												}
											}else{
												chatAPI.sysPush("<span style=\"color:#FF6146\"> * Это не Ваш клиент ("+checkData[6]+" | "+localPlayer.getVariable("player.id")+")</span>");
											}
										}else{
											chatAPI.sysPush("<span style=\"color:#FF6146\"> * Это не Ваш клиент "+checkData[5].toString()+" | "+checkData[6].toString()+"</span>");
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

mp.events.add('taxiRouteStarted', () => {
	if(hud_browser) hud_browser.execute('playSound("taxiDriveStart", "0.1");');
});

mp.events.add('taxiRouteEnded', (resCost) => {
	if(resCost) {
		let tempCallData = curCallData.callData;
		
		if(typeof(localPlayer.getVariable("player.job")) != "undefined") {
			let jobData = localPlayer.getVariable("player.job");
			
			mp.game.ui.messages.showMidsized("~g~Клиент доставлен ~s~к месту назначения", "~s~вы заработали"+resCost.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.");
			mp.game.ui.notifications.showWithPicture("Босс", "Красава-на!", "Так держать, проверь планшет на новые заказы (F5)", "CHAR_ORTEGA", 1, false, 1, 2);
		}
		
		if(mp.peds.exists(taxiPed)) taxiPed.destroy();
		taxiPed = false;
		if(mp.markers.exists(taxiMarker)) taxiMarker.destroy();
		taxiMarker = false;
		if(mp.blips.exists(taxiBlip)) taxiBlip.destroy();
		taxiBlip = false;
		if(mp.checkpoints.exists(taxiCheckpoint)) taxiCheckpoint.destroy();
		taxiCheckpoint = false;
		
		mp.events.callRemote('actionMakedTaxiJob', false, parseInt(resCost));
		
		curCallData = [];
	}
});

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(shape == taxiWorkZone) taxiImInWorkZone = true;
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(shape == taxiWorkZone) taxiImInWorkZone = false;
	}
});
}