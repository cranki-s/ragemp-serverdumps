{
/*mp.markers.new(28, new mp.Vector3(-1921.5873,2057.5757,140.7345), 30, // DEBUG
{
	direction: new mp.Vector3(0, 0, 0),
	rotation: new mp.Vector3(0, 180, 0),
	color: [0, 0, 200, 50],
	visible: true,
	dimension: 0
});*/

var wineryDeliveryMomentStart = false;

var wineDeliveryWorkZone = mp.colshapes.newSphere(-1921.5873,2057.5757,140.7345, 30, 0);
var wineDeliveryImInWorkZone = false;

let wineDeliveryActionsForGoToBase = 0;

let wineDeliveryStartPos = {"x":0,"y":0,"z":0};

let shopsPoses = [
	["-3250.5977","993.4695","11.8418"],
	["-2964.1775","374.4562","14.1664"],
	["-3050.9368","592.3166","6.9213"],
	["-1824.599","780.0491","137.2708"],
	["-1535.5408","-435.3284","34.8015"],
	["-703.1462","-856.6828","22.7301"],
	["-821.5616","-1088.7628","10.3714"],
	["1153.1721","-332.3593","68.1548"],
	["1158.1664","-463.08","66.1327"],
	["621.0651","2724.1501","41.1942"],
	["540.8793","2678.7146","41.5967"],
	["899.7198","3653.2046","32.1197"],
	["1956.3341","3737.6384","31.5517"],
	["2689.0732","3286.2234","54.5998"],
	["1699.0613","4937.6123","41.4393"],
	["1727.7451","6405.0898","33.7694"],
	["58.5791","-1569.9891","28.8191"],
	["-52.4347","-1761.9708","28.4277"],
	["-39.8512","-1745.8295","28.9521"],
	["160.7789","-1563.0822","28.9965"],
	["-339.7714","-1478.3824","30.368"],
	["-543.9476","-1219.6996","18.0325"],
	["-709.2186","-920.8896","18.7641"],
	["286.1028","-1261.6467","29.0347"],
	["819.6342","-1038.234","26.3111"],
	["1201.9935","-1388.4541","34.9774"],
	["638.6503","261.4872","102.8744"],
	["-1429.9175","-271.4662","45.9583"],
	["-2079.02","-327.4526","12.8814"],
	["-1823.5859","780.0934","137.598"],
	["-2567.7939","2319.0459","32.8148"],
	["270.0424","2600.8665","44.4079"],
	["1775.8824","3331.6592","41.0718"],
	["2659.8628","3261.1208","54.9909"],
	["1720.809","6409.0308","33.7329"]

];

let wineDeliveryMarker = false;
let wineDeliveryBlip = false;
let wineDeliveryShape = false;

function startWineDeliveryJob() {
	if(typeof(localPlayer.getVariable('player.lics')) === "undefined") return hud_browser.execute('jobPanelError("#startWineDeliveryJob", "Технические неполадки системы лицензий..")');
	let myLics = {};
	if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
	if(myLics["cCat"] === undefined) return hud_browser.execute('jobPanelError("#startWineDeliveryJob", "Отсутствуют водительские права категории «C»")');
	closeJobTablet();
	mp.events.callRemote('startWineDeliveryJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас приняли работать на развозку вина", 5, false, true, 6500);
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
}賄͈眓̦