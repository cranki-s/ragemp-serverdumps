{
/*mp.markers.new(28, new mp.Vector3(-893.9126,-2402.5571,14.0244), 30, // DEBUG
{
	direction: new mp.Vector3(0, 0, 0),
	rotation: new mp.Vector3(0, 180, 0),
	color: [0, 0, 200, 50],
	visible: true,
	dimension: 0
});*/

var airWorkZone = mp.colshapes.newSphere(-893.9126,-2402.5571,14.0244,30,0);
var airImInWorkZone = false;

var curAirTask = false, airBlip = false;
var airCheckpoint = false;

var airTasksBlocked = false;

function startAirJob() {
	mp.game.ui.notifications.showWithPicture("ЦУП", "Работы нет", "К сожалению, сегодня не полетаем.", "CHAR_NIGEL", 1, false, 1, 2);
	notyAPI.error("Данная работа сейчас недоступна из-за вылетов (синхра самолётов RAGE).", 3000, true);
	if(1 == 1) return notyAPI.error("Когда запустим вновь, сообщим в группе ВКонтакте и Discord.", 3000, true);
	
	if(typeof(localPlayer.getVariable('player.lics')) === "undefined") return hud_browser.execute('jobPanelError("#startAirJob", "Технические неполадки системы лицензий..")');
	let myLics = {};
	if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
	if(myLics["airCat"] === undefined) return hud_browser.execute('jobPanelError("#startAirJob", "Отсутствует лицензия пилота « Самолётов »")');
	
	if(typeof(localPlayer.getVariable('player.blocks')) === "undefined") return hud_browser.execute('jobPanelError("#startAirJob", "Не инициализирован уровень персонажа..")');
	let myBlocks = localPlayer.getVariable('player.blocks');
	if(typeof(myBlocks.lvl) !== "undefined") {
		if(myBlocks.lvl < 10) return hud_browser.execute('jobPanelError("#startAirJob", "Необходим 10 уровень персонажа, его нужно повысить через телефон.")');
	}else{
		return hud_browser.execute('jobPanelError("#startAirJob", "Не инициализирован уровень персонажа..")');
	}
	
	closeJobTablet();
	mp.events.callRemote('startAirJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас приняли работать в авиацию", 5, false, true, 6500);
	setTimeout(function() {
		mp.game.ui.notifications.showWithPicture("ЦУП", "Добро пожаловать", "Нажми F5 и выбери свой первый полётный-лист.", "CHAR_NIGEL", 1, false, 1, 2);
	}, 2000);
}
mp.events.add("startAirJob", startAirJob);

function getAirTasks() {
	//closeJobTablet(true);
	mp.game.ui.notifications.showWithPicture("ЦУП", "Рейсов нет", "К сожалению, сегодня не полетаем.", "CHAR_NIGEL", 1, false, 1, 2);
	notyAPI.error("Данная работа сейчас недоступна из-за вылетов (синхра самолётов RAGE).", 3000, true);
	if(1 == 1) return notyAPI.error("Когда запустим вновь, сообщим в группе ВКонтакте и Discord.", 3000, true);
	
	//if(!airBlip) mp.events.callRemote('getAirTasks');
	//else hud_browser.execute("gettedAirTasks('you_have_task');");
}
mp.events.add("getAirTasks", getAirTasks);

function gettedAirTasks(airTasks){
	if(airTasks) {
		if(!curAirTask && typeof(localPlayer.getVariable("player.job")) !== "undefined") {
			if(Object.keys(airTasks).length > 0) {
				let jobData = localPlayer.getVariable("player.job");
				
				let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
				for (var k in airTasks) {
					if(airTasks[k]) {
						let taskData = airTasks[k];
						taskData.planeName = "Самолёт";
						if(parseInt(jobData.rank) >= parseInt(taskData.minRank)) {
							if(typeof(taskData.plane) !== "undefined") {
								if(typeof(decVehStats[0][taskData.plane]) !== "undefined") taskData.planeName = decVehStats[0][taskData.plane].name;
								else taskData.planeName = taskData.plane;
							}
						}else{
							delete airTasks[k];
						}
					}
				}
				airTasks = airTasks.filter(function (el) { return el != null; });
				
				hud_browser.execute("gettedAirTasks('ok', '"+JSON.stringify(airTasks)+"');");
			}else{
				hud_browser.execute("gettedAirTasks('empty');");
			}
		}else{
			hud_browser.execute("gettedAirTasks('you_have_task');");
		}
	}
}
mp.events.add("gettedAirTasks", gettedAirTasks);

function airStartStop() {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		closeJobTablet(true);
		
		if(jobData.work == 0) {
			mp.game.ui.notifications.showWithPicture("ЦУП", "Временно недоступно", "Эта работа сейчас недоступна.", "CHAR_NIGEL", 1, false, 1, 2);
			notyAPI.error("Данная работа сейчас недоступна из-за вылетов (синхра самолётов RAGE).", 3000, true);
			if(1 == 1) return notyAPI.error("Когда запустим вновь, сообщим в группе ВКонтакте и Discord.", 3000, true);
			if(airImInWorkZone) {
				if(localPlayer.vehicle) {
					mp.game.ui.notifications.showWithPicture("ЦУП", "Связь плохая", "Нельзя начать смену из транспорта.", "CHAR_NIGEL", 1, false, 1, 2);
				}else{
					if(!activeJOBoperation) {
						mp.events.call("sleepAntiCheat");
						mp.events.callRemote('startJobWork');
						mp.game.ui.notifications.showWithPicture("ЦУП", "Смена началась", "Возьмите любую задачу. Задачи в планшете (F5)", "CHAR_NIGEL", 1, false, 1, 2);
					}
				}
			}else{
				mp.game.ui.notifications.showWithPicture("ЦУП", "Явитесь в офис", "Смену можно начать только на территории ЦУПа.", "CHAR_NIGEL", 1, false, 1, 2);
				notyAPI.error("Явитесь в Центр Управления Полётами что бы начать смену.", 3000, true);
			}
		}else{
			if(!activeJOBoperation) {
				activeJOBoperation = true;
				
				if(curAirTask) mp.events.callRemote('cancelAirTask', JSON.stringify(curAirTask), false);
				curAirTask = false;
				
				if(mp.blips.exists(airBlip)) airBlip.destroy();
				airBlip = false;
				if(mp.checkpoints.exists(airCheckpoint)) airCheckpoint.destroy();
				airCheckpoint = false;
		
				if(jobData.workMoney > 0) {
					//let resWorkMoney = roundNumber((parseInt(jobData.workMoney)-(parseInt(jobData.workMoney)*0.13)), 0);
					let resWorkMoney = roundNumber(parseInt(jobData.workMoney), 0);
					let workMoneyText = resWorkMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы заработали за смену"+workMoneyText+" руб.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("ЦУП", "Было круто", "Отдохните и выходите на смену снова, от винта!", "CHAR_NIGEL", 1, false, 1, 2);
				}else{
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы ничего не заработали за смену.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("ЦУП", "Это как так?", "Ты не выполнил ни одной задачи. Предупреждение.", "CHAR_NIGEL", 1, false, 1, 2);
				}
				
				mp.events.callRemote('stopJobWork');
			}
		}
	}
}
mp.events.add("airStartStop", airStartStop);

function acceptTaskAir(data){
	if(data) {
		closeJobTablet();
		
		mp.game.ui.notifications.showWithPicture("ЦУП", "Рейсов нет", "К сожалению, сегодня не полетаем.", "CHAR_NIGEL", 1, false, 1, 2);
		notyAPI.error("Данная работа сейчас недоступна из-за вылетов (синхра самолётов RAGE).", 3000, true);
		if(1 == 1) return notyAPI.error("Когда запустим вновь, сообщим в группе ВКонтакте и Discord.", 3000, true);
		
		if(airTasksBlocked) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("ЦУП", "Блокировка доступа", "У Вас блок доступа к задачам на 1 мин.", "CHAR_NIGEL", 1, false, 1, 2);
			return notyAPI.error("У Вас заблокирован доступ к задачам, попробуйте через минуту.", 3000, true);
		}
		
		if(localPlayer.vehicle) return notyAPI.error("Вы не должны быть в транспорте.", 3000, true);
		
		if(!airImInWorkZone) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("ЦУП", "Явитесь в офис", "Смену можно начать только на территории ЦУПа.", "CHAR_NIGEL", 1, false, 1, 2);
			return notyAPI.error("Явитесь в Центр Управления Полётами что бы взять задание.", 3000, true);
		}
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('acceptTaskAir', data);
	}
}
mp.events.add("acceptTaskAir", acceptTaskAir);

function cancelAirJobTask(){
	closeJobTablet(true);
	if(curAirTask) {
		if(mp.blips.exists(airBlip)) airBlip.destroy();
		airBlip = false;
		if(mp.checkpoints.exists(airCheckpoint)) airCheckpoint.destroy();
		airCheckpoint = false;
		
		mp.game.ui.messages.showMidsized("~g~Вы успешно ~s~отказались от заказа", "~s~Новые заказы можно посмотреть в планшете (F5)");
		mp.game.ui.notifications.showWithPicture("ЦУП", "Отказ от задачи", "Отменили и заблокировали задачи на 1 мин.", "CHAR_NIGEL", 1, false, 1, 2);
		
		airTasksBlocked = true;
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("ЦУП", "Задачи доступны", "Мы разблокировали Вам задачи.", "CHAR_NIGEL", 1, false, 1, 2);
			airTasksBlocked = false;
		}, 60000);
		
		airJobOldDist = 0, airJobCourseWarns = 0;
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelAirTask', JSON.stringify(curAirTask), false);
		curAirTask = false;
	}
}
mp.events.add("cancelAirJobTask", cancelAirJobTask);

function acceptedAirTask(isError, data){
	restoreBinds();
	jobPanel = false;
	if(isError) {
		return notyAPI.error(isError, 3000, true);
	}else{
		if(data) {
			mp.events.call("sleepAntiCheat");
			data = JSON.parse(data);
			curAirTask = data;
			curAirTask.curPoint = 0;
			if(hud_browser) hud_browser.execute("hiddenAction('Загружаем локацию и задание пилота..');");
		}else{
			return notyAPI.error("Сбой в работе ЦУПа, выберите другую задачу.", 3000, true);
		}
	}
}
mp.events.add("acceptedAirTask", acceptedAirTask);

let airJobOldDist = 0, airJobCourseWarns = 0;
function checkAirJobCourse() {
	if(curAirTask) {
		let myPos = localPlayer.position;
		if(airJobOldDist == 0) {
			if(typeof(curAirTask.curPoint) !== "undefined") {
				let pointData = curAirTask.marshrut[curAirTask.curPoint.toString()];
				if(typeof(curAirTask.marshrut[curAirTask.curPoint.toString()]) !== "undefined") {
					if(typeof(pointData.x) !== "undefined") {
						if(pointData.x) {
							let airJobNewDist = mp.game.system.vdist2(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z), parseFloat(myPos.x), parseFloat(myPos.y), parseFloat(myPos.z));
							airJobOldDist = mp.game.system.vdist2(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z), parseFloat(myPos.x), parseFloat(myPos.y), parseFloat(myPos.z));
							airJobCourseWarns = 0;
						}
					}
				}
			}
		}else{
			if(typeof(curAirTask.marshrut[curAirTask.curPoint.toString()]) !== "undefined") {
				let pointData = curAirTask.marshrut[curAirTask.curPoint.toString()];
				if(typeof(pointData.x) !== "undefined") {
					if(pointData.x) {
						let airJobNewDist = mp.game.system.vdist2(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z), parseFloat(myPos.x), parseFloat(myPos.y), parseFloat(myPos.z));
						
						if(airJobNewDist != airJobOldDist) {
							if(airJobNewDist > airJobOldDist) {
								airJobCourseWarns++;
								if(airJobCourseWarns == 1) {
									if(hud_browser) hud_browser.execute('playSound("soundAirWarn", "0.35");');
								}else if(airJobCourseWarns == 2) {
									if(hud_browser) hud_browser.execute('playSound("soundAirWarnEpic", "0.35");');
								}else if(airJobCourseWarns >= 3) {
									mp.game.ui.notifications.showWithPicture("ЦУП", "Предупреждение", "В целях безопасности мы перехватили Вашу задачу.", "CHAR_NIGEL", 1, false, 1, 2);
									mp.game.ui.messages.showMidsized("~r~Рейс провален", "~s~Вы ничего не заработали, причина: отклонение от курса.");
						
									if(mp.blips.exists(airBlip)) airBlip.destroy();
									airBlip = false;
									if(mp.checkpoints.exists(airCheckpoint)) airCheckpoint.destroy();
									airCheckpoint = false;

									airJobOldDist = 0, airJobCourseWarns = 0;
									
									mp.events.call("sleepAntiCheat");
									mp.events.callRemote('cancelAirTask', JSON.stringify(curAirTask), true);
									curAirTask = false;
								}
							}else{
								airJobOldDist = mp.game.system.vdist2(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z), parseFloat(myPos.x), parseFloat(myPos.y), parseFloat(myPos.z));
								airJobCourseWarns = 0;
							}
						}else{
							airJobCourseWarns++;
							if(airJobCourseWarns == 1) {
								if(hud_browser) hud_browser.execute('playSound("airDontSleep", "0.35");');
							}else if(airJobCourseWarns == 2) {
								mp.game.ui.notifications.showWithPicture("ЦУП", "Предупреждение", "В целях безопасности мы перехватили Вашу задачу.", "CHAR_NIGEL", 1, false, 1, 2);
								mp.game.ui.messages.showMidsized("~r~Рейс провален", "~s~Вы ничего не заработали, причина: уснул за штурвалом.");
					
								if(mp.blips.exists(airBlip)) airBlip.destroy();
								airBlip = false;
								if(mp.checkpoints.exists(airCheckpoint)) airCheckpoint.destroy();
								airCheckpoint = false;

								airJobOldDist = 0, airJobCourseWarns = 0;
								
								mp.events.call("sleepAntiCheat");
								mp.events.callRemote('cancelAirTask', JSON.stringify(curAirTask), true);
								curAirTask = false;
							}
						}
					}
				}
			}
		}
	}
}

function airProcessor() {
	if(curAirTask) {
		let noNext = false;
		
		if(curAirTask.curPoint == 0) {
			mp.game.ui.notifications.showWithPicture("ЦУП", "Задача получена", "Пилот, пожалуйста пристягните ремень и заведите двигатели", "CHAR_NIGEL", 1, false, 1, 2);
			if(hud_browser) hud_browser.execute('playSound("startAirFly", "0.35");');
			
			noNext = true;
			curAirTask.curPoint++;
		}
		let pointData = curAirTask.marshrut[curAirTask.curPoint.toString()];
		
		if(airCheckpoint) {
			airCheckpoint.destroy();
			airCheckpoint = false;
		}
		
		if(airBlip) {
			airBlip.destroy();
			airBlip = false;
		}
		
		let checkPointType = 14;
		let checkPointColor = [42, 193, 79, 125];
		
		let dir = new mp.Vector3(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z)+25.5);
		if(curAirTask.curPoint < Object.keys(curAirTask.marshrut).length-1) {
			let nextPointData = curAirTask.marshrut[(curAirTask.curPoint+1).toString()];
			dir = new mp.Vector3(parseFloat(nextPointData.x), parseFloat(nextPointData.y), parseFloat(nextPointData.z)+25.5);
			
			if(typeof(pointData.pleaseUp) !== "undefined" || typeof(pointData.pleaseUpChassis) !== "undefined" || typeof(pointData.pleaseDownChassis) !== "undefined" || typeof(pointData.pleaseLand) !== "undefined") {
				if(typeof(pointData.pleaseUp) !== "undefined") {
					if(hud_browser) hud_browser.execute('playSound("pleaseUpAir", "0.35");');
				}else if(typeof(pointData.pleaseUpChassis) !== "undefined") {
					if(hud_browser) hud_browser.execute('playSound("pleaseUpChassisAir", "0.35");');
				}else if(typeof(pointData.pleaseDownChassis) !== "undefined") {
					if(hud_browser) hud_browser.execute('playSound("pleaseDownChassisAir", "0.35");');
				}else if(typeof(pointData.pleaseLand) !== "undefined") {
					if(hud_browser) hud_browser.execute('playSound("pleaseLandAir", "0.35");');
				}
			}else{
				let dist = mp.game.system.vdist2(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z), parseFloat(nextPointData.x), parseFloat(nextPointData.y), parseFloat(nextPointData.z));
				if(dist > 900000) {
					let randSound = "newAirPoint"+getRandomInt(1,3);
					if(hud_browser) hud_browser.execute('playSound("'+randSound+'", "0.35");');
				}
			}
			
			airBlip = mp.blips.new(1, new mp.Vector3(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z)), {
				name: "Актуальный курс",
				scale: 1.5,
				color: 1,
				shortRange: false,
				dimension: 0
			});
			
			airJobOldDist = 0;
		}else{
			checkPointType = 16;
			checkPointColor = [255, 255, 255, 150];
			dir = new mp.Vector3(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z)+25.5);
		}
		
		airCheckpoint = mp.checkpoints.new(checkPointType, new mp.Vector3(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z)-6.7), 55,
		{
			direction: dir,
			color: checkPointColor,
			visible: true,
			dimension: 0
		});
		airCheckpoint.posData = new mp.Vector3(parseFloat(pointData.x), parseFloat(pointData.y), parseFloat(pointData.z)-6.7);
		
		if(!noNext) curAirTask.curPoint++;
	}
}

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined" && typeof(airCheckpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(mp.checkpoints.exists(airCheckpoint) && checkpoint == airCheckpoint) {
				if(curAirTask.curPoint >= Object.keys(curAirTask.marshrut).length) {
					if(airCheckpoint) {
						airCheckpoint.destroy();
						airCheckpoint = false;
					}
					
					if(airBlip) {
						airBlip.destroy();
						airBlip = false;
					}
					
					mp.game.ui.messages.showMidsized("~g~Рейс успешно ~s~завершён", "~s~вы заработали "+curAirTask.cost+" руб.");
					mp.game.ui.notifications.showWithPicture("ЦУП", "Успешное задание", "Рейс завершён, проверь планшет на новые задачи (F5)", "CHAR_NIGEL", 1, false, 1, 2);
					
					if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
						let myBlocks = localPlayer.getVariable("player.blocks");
						if(typeof(myBlocks.premium) !== "undefined") notyAPI.info("<b>Премиум-доступ</b>: Вы получили надбавку к зарплате (10%).", 3000, true);
					}
					
					mp.events.callRemote('actionMakedAirJob', curAirTask.id.toString());
					curAirTask = false;
				}else{
					airProcessor();
				}
			}
		}
	}
});

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(shape == airWorkZone) airImInWorkZone = true;
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(shape == airWorkZone) airImInWorkZone = false;
	}
});
}Φ