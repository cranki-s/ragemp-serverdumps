{
var afJobPanel = false;
var activeJOBoperation = false;
var jobsInStream = [];

var jobPanel = false;
mp.keys.bind(0x74, true, function() { // F5 Меню (Рабочий планшет)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x74)) return false;
	
	if(hud_browser) {
		if(jobPanel) {
			closeJobTablet(true);
		}else{
			if(afJobPanel) return false;
			if(activeJOBoperation) return false;
			afJobPanel = true;
			setTimeout(function() { afJobPanel = false }, 1500);
			
			if(localPlayer.getVariable("player.job")) {
				let jobData = localPlayer.getVariable("player.job");
				if(jobData.name) {
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(jobData)+"</span>");
					hud_browser.execute('toggleJobsPanel(\''+JSON.stringify(jobData)+'\');');
					mp.gui.cursor.visible = true;
					jobPanel = true;
					
					allowBinds = [0x74];
				}
			}
		}
	}
});

function closeJobTablet(resBinds) {
	if(hud_browser) {
		hud_browser.execute('toggleJobsPanel()');
		mp.gui.cursor.visible = false;
		
		if(resBinds) {
			jobPanel = false;
			restoreBinds();
		}
	}
}
mp.events.add("closeJobTablet", closeJobTablet);

function leaveFromJob() {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		if(jobData.work != 0) return hud_browser.execute('jobPanelError(\'#makeLeaveFromJob\', \'Сначала завершите смену\')');
	}

	closeJobTablet(true);
	
	let myJobData = localPlayer.getVariable("player.job");
	if(typeof(myJobData.name) !== 'undefined') {
		if(myJobData.name == "winery") wineryForceStop();
		else if(myJobData.name == "wineDelivery") wineDeliveryForceStop();
		else if(myJobData.name == "taxi") taxiForceStop();
	}
	
	mp.events.callRemote('leaveFromJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы успешно уволились с работы", 5, false, true, 6500);
}
mp.events.add("leaveFromJob", leaveFromJob);

function warnsJobFired(jobData) {
	closeJobTablet(true);
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас уволили с работы без выплаты за последнюю смену.", 5, false, true, 6500);
	
	if(jobData) {
		jobData = JSON.parse(jobData);
		if(typeof(jobData.name) !== 'undefined') {
			if(jobData.name == "winery") wineryForceStop();
			else if(jobData.name == "wineDelivery") wineDeliveryForceStop();
			else if(jobData.name == "taxi") taxiForceStop();
		}
	}
}
mp.events.add("warnsJobFired", warnsJobFired);

function warnsJobRankDown() {
	closeJobTablet(true);
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас понизили в ранге без выплаты за последнюю смену.", 5, false, true, 6500);
}
mp.events.add("warnsJobRankDown", warnsJobRankDown);

function jobRankUp() {
	closeJobTablet(true);
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас повысили в ранге, поздравляем!", 5, false, true, 6500);
}
mp.events.add("jobRankUp", jobRankUp);

function unLockStopWork(isNaloged) {
	if(typeof(isNaloged) !== "undefined") {
		activeJOBoperation = false;
		if(isNaloged) chatAPI.notifyPush("С зарплаты удержан подоходный налог в 13%, Ваша зарплата:"+isNaloged.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.");
	}
}
mp.events.add("unLockStopWork", unLockStopWork);

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'job_render') {
				let jobData = shape.getVariable('col.data');
				
				let jobMarker = mp.markers.new(1, new mp.Vector3(parseFloat(jobData[0]), parseFloat(jobData[1]), parseFloat(jobData[2])), 1.1,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [255, 0, 0, 200],
					visible: true,
					dimension: 0
				});
				
				let jobCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(jobData[0]), parseFloat(jobData[1]), parseFloat(jobData[2])), 1.0,
				{
					color: [255, 255, 255, 0],
					visible: true,
					dimension: localPlayer.dimension
				});
				jobCheck.jobData = jobData;
				
				let jobArray = {'marker': jobMarker, 'check': jobCheck, 'data': jobData[4], 'pos': [parseFloat(jobData[0]), parseFloat(jobData[1]), parseFloat(jobData[2])], 'alpha': 0};
				jobsInStream.push(jobArray);
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.jobData) !== "undefined") {
			let jobData = checkpoint.jobData;
			let jData = JSON.parse(jobData[4]);
			
			//if(jData.name == "Работа в такси") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Работа такси на доработке, попробуйте позже.</span>");
			
			if(localPlayer.getVariable("player.job") && !localPlayer.vehicle && hud_browser) {
				let myJobData = localPlayer.getVariable("player.job");
				if(myJobData.name) {
					if(myJobData.name == jobData[3].toString()) {
						chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы уже работаете на этой работе.</span>");
						return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Используйте рабочий планшет для управления сменами (<b>F5</b>)</span>");
					}else{
						chatAPI.sysPush("<span style=\"color:#FF6146\"> * Что бы устроится сюда, необходимо быть безработным.</span>");
						return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Увольтесь с текущей работы, через планшет (<b>F5</b>)</span>");
					}
				}else{
					if(jobData[3].toString() == "winery") {
						if(hud_browser) {
							hud_browser.execute('toggleJobsPanel(\'{"name":"jobStartWinery"}\')');
							mp.gui.cursor.visible = true;
						}
					}else if(jobData[3].toString() == "wineDelivery") {
						if(hud_browser) {
							hud_browser.execute('toggleJobsPanel(\'{"name":"jobStartWineDelivery"}\')');
							mp.gui.cursor.visible = true;
						}
					}else if(jobData[3].toString() == "taxi") {
						if(hud_browser) {
							hud_browser.execute('toggleJobsPanel(\'{"name":"jobStartTaxi"}\')');
							mp.gui.cursor.visible = true;
						}
					}else if(jobData[3].toString() == "air") {
						if(hud_browser) {
							hud_browser.execute('toggleJobsPanel(\'{"name":"jobStartAir"}\')');
							mp.gui.cursor.visible = true;
						}
					}else if(jobData[3].toString() == "truck") {
						if(hud_browser) {
							hud_browser.execute('toggleJobsPanel(\'{"name":"jobStartTruck"}\')');
							mp.gui.cursor.visible = true;
						}
					}else if(jobData[3].toString() == "courier") {
						if(hud_browser) {
							hud_browser.execute('toggleJobsPanel(\'{"name":"jobStartCourier"}\')');
							mp.gui.cursor.visible = true;
						}
					}else if(jobData[3].toString() == "train") {
						if(hud_browser) {
							hud_browser.execute('toggleJobsPanel(\'{"name":"jobStartTrain"}\')');
							mp.gui.cursor.visible = true;
						}
					}else if(jobData[3].toString() == "fire") {
						if(hud_browser) {
							hud_browser.execute('toggleJobsPanel(\'{"name":"jobStartFire"}\')');
							mp.gui.cursor.visible = true;
						}
					}
				}
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'job_render') {
				let jobRenderData = shape.getVariable('col.data');
				for(var i in jobsInStream) {
					let tempData = jobsInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == jobRenderData[0] && posData[1] == jobRenderData[1] && posData[2] == jobRenderData[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(jobsInStream[i] || jobsInStream[i] !== undefined) delete jobsInStream[i];
					}
					tempData = null;
				}
				jobsInStream = jobsInStream.filter(function (el) { return el != null; });
				
				jobRenderData = null;
				return null;
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.jobData) !== "undefined") {
			return closeJobTablet();
		}
	}
});

var jobVehBackTimer = false;
function checkVehInWorkOnJob(vehicle, seat) {
	if(vehicle && localPlayer.getVariable("player.job")) {
		if(curCourierTask && parkingVeh) {
			if(typeof(curCourierTask.courier) !== "undefined") {
				if(typeof(vehicle.getVariable("veh.id")) !== "undefined") {
					if(vehicle.getVariable("veh.id").toString() == curCourierTask.courier) parkingVeh = vehicle;
				}
			}else if(typeof(curTruckTask.curPoint) !== "undefined") {
				if(typeof(vehicle.getVariable("veh.job")) !== "undefined") {
					let vehJob = mp.players.atRemoteId(parseInt(vehicle.getVariable('veh.job')));
					if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
						if(curTruckTask.curPoint != "getCargo") {
							if(typeof(trailersPool) !== "undefined") {
								if(typeof(trailersPool[vehicle.handle.toString()]) !== "undefined") {
									if(typeof(trailersPool[vehicle.handle.toString()].trailer) !== "undefined") {
										let tempTrailer = trailersPool[vehicle.handle.toString()].trailer;
										if(mp.vehicles.exists(tempTrailer) && mp.vehicles.exists(entity)) parkingVeh = tempTrailer;
									}
								}
							}
						}else{
							parkingVeh = vehicle;
						}
					}
				}
			}
		}
		let myJobData = localPlayer.getVariable("player.job");
		if(typeof(myJobData.name) !== 'undefined') {
			if(myJobData.name == "winery") {
				if(typeof(myJobData.work) !== 'undefined' && myJobData.work == 1) {
					if(typeof(vehicle.getVariable("veh.hash")) !== "undefined") {
						if(vehicle.getVariable("veh.hash") != "faggio") {
							mp.game.ui.notifications.showWithPicture("Босс", "Никакого транспорта", "Только на мопедах по полям. Предупреждение.", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
							mp.events.callRemote('warnJob');
						}
					}else{
						mp.game.ui.notifications.showWithPicture("Босс", "Никакого транспорта", "Только на мопедах по полям. Предупреждение.", "CHAR_MRS_THORNHILL", 1, false, 1, 2);
						mp.events.callRemote('warnJob');
					}
				}
			}
			if(seat == -1) {
				if(typeof(vehicle.getVariable("veh.job")) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(vehicle.getVariable('veh.job')))) {
						let vehJob = mp.players.atRemoteId(parseInt(vehicle.getVariable('veh.job')));
						if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
							if(jobVehBackTimer) {
								clearTimeout(jobVehBackTimer);
								mp.game.ui.messages.showMidsized("~s~Вы вернулись в ~g~рабочий транспорт", "~s~Теперь всё в полном порядке ^_^");
								/*if(curTruckTask && parkingVeh) {
									if(typeof(curTruckTask.curPoint) !== "undefined") parkingVeh = vehJob;
								}*/
							}
						}
					}
				}
			}
		}
	}
}
mp.events.add("playerEnterVehicle", checkVehInWorkOnJob);

function checkVehOutWorkOnJob(vehicle, seat) {
	if(vehicle && localPlayer.getVariable("player.job")) {
		let myJobData = localPlayer.getVariable("player.job");
		if(typeof(myJobData.name) !== 'undefined') {
			if(typeof(vehicle.getVariable("veh.job")) !== "undefined") {
				if(mp.players.atRemoteId(parseInt(vehicle.getVariable('veh.job')))) {
					let vehJob = mp.players.atRemoteId(parseInt(vehicle.getVariable('veh.job')));
					if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
						if(typeof(myJobData.work) !== "undefined") {
							if(myJobData.work == 1) {
								if(myJobData.name != "air" && myJobData.name != "fire") {
									chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы покинули рабочий транспорт, у Вас есть 5 минут что бы вернуться в него.</span>");
									mp.game.ui.messages.showMidsized("~s~Вы покинули ~r~рабочий транспорт", "~s~У Вас есть 5 минут что бы вернуться в него.\nИначе - смена будет закрыта автоматически.");
									if(myJobData.name == "wineDelivery") jobVehBackTimer = setTimeout(wineDeliveryStartStop, 300000);
									else if(myJobData.name == "taxi") jobVehBackTimer = setTimeout(taxiStartStop, 300000);
									else if(myJobData.name == "truck") jobVehBackTimer = setTimeout(truckStartStop, 300000);
								}else{
									if(curAirTask) {
										chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы покинули рабочий транспорт, задача отменена.</span>");
										mp.game.ui.messages.showMidsized("~s~Вы покинули ~r~рабочий транспорт", "~s~Задача отменена автоматически.");
										
										airTasksBlocked = true;
										setTimeout(function() {
											mp.game.ui.notifications.showWithPicture("ЦУП", "Задачи доступны", "Мы разблокировали Вам задачи.", "CHAR_ACTING_UP", 1, false, 1, 2);
											airTasksBlocked = false;
										}, 60000);
										
										mp.events.call("sleepAntiCheat");
										
										if(curAirTask) mp.events.callRemote('cancelAirTask', JSON.stringify(curAirTask), false);
										curAirTask = false;
										
										if(mp.blips.exists(airBlip)) airBlip.destroy();
										airBlip = false;
										if(mp.checkpoints.exists(airCheckpoint)) airCheckpoint.destroy();
										airCheckpoint = false;
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
mp.events.add("playerLeaveVehicle", checkVehOutWorkOnJob);

mp.events.addDataHandler('player.job', function (entity, value, oldValue) {
	if(entity && entity.type === 'player' && typeof(value) != 'undefined') {
		if(typeof(value.name) != 'undefined' && typeof(value.work) != 'undefined') {
			if(value.name == "winery") {
				if(value.work == 1) {
					entity.setComponentVariation(5, 40, 0, 0);
				}else{
					entity.setComponentVariation(5, 0, 0, 0);
				}
			}
		}
		if(oldValue && typeof(value.name) == 'undefined' && typeof(oldValue.name) != 'undefined' && typeof(oldValue.work) != 'undefined') {
			if(oldValue.name == "winery") {
				if(oldValue.work == 1) entity.setComponentVariation(5, 0, 0, 0);
			}
		}
	}
});
}