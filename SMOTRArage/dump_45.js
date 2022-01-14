{
var rVehInStream = [];
var activeRenting = false;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.data) == "undefined") {
				if(shape.getVariable('col.type')) {
					let colType = shape.getVariable('col.type');
					if(colType == 'rentVeh_render') {
						let rVehData = shape.getVariable('col.data');
						
						let rVehMarker = mp.markers.new(1, new mp.Vector3(rVehData[0], rVehData[1], rVehData[2]), 1.5,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 0, 0),
							color: [22, 111, 158, 200],
							visible: true,
							dimension: 0
						});
						
						let rVehCheck = mp.checkpoints.new(40, new mp.Vector3(rVehData[0], rVehData[1], rVehData[2]+1), 0.5,
						{
							color: [255, 255, 255, 0],
							visible: true,
							dimension: localPlayer.dimension
						});
						rVehCheck.rVehData = rVehData;
						
						let rVehArray = {'marker': rVehMarker, 'check': rVehCheck, 'pos': [rVehData[0], rVehData[1], rVehData[2]], 'class': rVehData[3], 'name': rVehData[4].toString(), 'class': rVehData[3], 'alpha': 0};
						rVehInStream.push(rVehArray);
					}
				}
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.rVehData) !== "undefined") {
			let rVehData = checkpoint.rVehData;
			if(!localPlayer.vehicle && hud_browser && !activeRenting) {
				if(typeof(localPlayer.getVariable('player.id')) !== "undefined") {
					if(typeof(localPlayer.getVariable('player.money')) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Аренда транспорта для Вас недоступна, попробуйте позже..</span>");
					allowBinds = [];
					
					if(rVehData[3].toString() == "d3vehs") hud_browser.execute('premiumToggleRentPanel(\''+rVehData[3].toString()+'\');');
					else hud_browser.execute('toggleRentPanel(\''+rVehData[3].toString()+'\');');
					
					mp.gui.cursor.visible = true;
					mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
				}
			}
		}
	}
});

mp.events.add('rentVeh', (rentClassVeh, sVehRentHash, sVehRentCost) => {
	if(rentClassVeh && sVehRentHash && sVehRentCost && hud_browser) {
		if(typeof(localPlayer.getVariable("player.money")) === "undefined") return hud_browser.execute("errorRentVehPanel('Аренда сейчас недоступна');");;
		let myMoney = parseInt(localPlayer.getVariable("player.money"));
		if(myMoney < parseInt(sVehRentCost)) return hud_browser.execute("errorRentVehPanel('Недостаточно средств');");
		rentVehClose();
		mp.events.callRemote('rentVeh', rentClassVeh, sVehRentHash, sVehRentCost);
		
		let vehName = "Транспорт";
		
		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		if(typeof(decVehStats[0][sVehRentHash]) != "undefined") vehName = decVehStats[0][sVehRentHash].name;
		else vehName = sVehRentHash;
		
		let costText = sVehRentCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
		
		return mp.game.ui.messages.showMidsizedShard("~y~Вы арендовали ~w~"+vehName, "~s~Оплачено~g~~h~"+costText+" ~s~руб.", 5, false, true, 8000);
	}
});

mp.events.add('rentPremiumVeh', (premiumRentClassVeh, sVehRentHash, sVehRentCost, sVehRentSalon, sVehRentHours) => {
	if(premiumRentClassVeh && sVehRentHash && sVehRentCost && sVehRentSalon && sVehRentHours && hud_browser) {
		if(typeof(localPlayer.getVariable("player.money")) === "undefined") return hud_browser.execute("premiumErrorRentVehPanel('Аренда сейчас недоступна');");;
		let myMoney = parseInt(localPlayer.getVariable("player.money"));
		if(myMoney < parseInt(sVehRentCost)) return hud_browser.execute("premiumErrorRentVehPanel('Недостаточно средств');");
		rentVehClose();
		activeRenting = true;
		return mp.events.callRemote('rentPremiumVeh', premiumRentClassVeh, sVehRentHash, sVehRentCost, sVehRentSalon, sVehRentHours);
	}
});

function rentVehClose() {
	if(hud_browser) {
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
		hud_browser.execute("toggleRentPanel();");
		hud_browser.execute("premiumToggleRentPanel();");
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add('rentVehClose', rentVehClose);

mp.events.add('premiumRentResult', (result, hash, cost, hours) => {
	if(result) {
		if(typeof(hash) !== "undefined" && typeof(cost) !== "undefined" && typeof(hours) !== "undefined") {
			let vehName = "Транспорт";
			
			let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
			decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
			
			if(typeof(decVehStats[0][hash]) != "undefined") vehName = decVehStats[0][hash].name;
			else vehName = hash;
			
			let costText = cost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
			
			mp.game.ui.messages.showMidsizedShard("~y~Вы арендовали ~w~"+vehName, "~s~Оплачено~g~~h~"+costText+" ~s~руб.", 5, false, true, 8000);
		}
	}else{
		chatAPI.sysPush("<span style=\"color:#FF6146\"> * По техническим причинам, не удалось взять транспорт в аренду..</span>");
	}
	activeRenting = false;
});

function myRentVehChecker() {
	if(typeof(localPlayer.getVariable("player.vehs")) !== "undefined") {
		let myVehs = localPlayer.getVariable("player.vehs");
		for(var k in myVehs.vehicles) {
			if(typeof(myVehs.vehicles[k].params.rent) !== "undefined") {
				if(myVehs.count > 0) myVehs.count = myVehs.count - 1;
				if(typeof(myVehs.vehicles[k].params.rent.endDate) !== "undefined") {
					if(new Date() >= new Date(myVehs.vehicles[k].params.rent.endDate)) {
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Арендованная тачка бб</span>");
						return mp.events.callRemote('getPlayerVehicles');
						break;
					}
				}
			}
		}
	}
}

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'rentVeh_render') {
					let rVehData = shape.getVariable('col.data');
					for(var i in rVehInStream) {
						let tempData = rVehInStream[i];
						let posData = tempData['pos'];
						if (posData[0] == rVehData[0] && posData[1] == rVehData[1] && posData[2] == rVehData[2]) {
							if(tempData['marker']) {
								tempData['marker'].destroy();
								delete tempData['marker'];
							}
							if(rVehInStream[i] || rVehInStream[i] !== undefined) delete rVehInStream[i];
						}
						tempData = null;
					}
					rVehInStream = rVehInStream.filter(function (el) { return el != null; });
				}
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.rVehData) !== "undefined") {
			return rentVehClose();
		}
	}
});
}notifications.showWithPicture("Босс", "Я несу убытки", "Ты никого не возил за смену. Предупреждение.", "CHAR_ORTEGA", 1, false, 1, 2);
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