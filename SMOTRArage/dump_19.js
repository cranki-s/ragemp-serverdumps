{
var racingStartInStream = {};
var createRacePanel = false;
var dialogRacePanel = false;

var activeStreetRace = false;

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(mp.checkpoints.exists(streetRaceCheckpoint)) {
			if(streetRaceCheckpoint == checkpoint && activeStreetRace) {
				mp.events.callRemote('finishStreetRace', JSON.stringify(activeStreetRace));
				if(mp.checkpoints.exists(streetRaceCheckpoint)) {
					streetRaceCheckpoint.destroy();
					streetRaceCheckpoint = false;
				}
				if(mp.blips.exists(streetRaceBlip)) {
					streetRaceBlip.destroy();
					streetRaceBlip = false;
				}
				activeStreetRace = false;
			}
		}else{
			if(typeof(checkpoint.getVariable("checkpoint.type")) !== "undefined") {
				let checkPointType = checkpoint.getVariable("checkpoint.type");
				if(checkPointType == "racingStart_render") {
					if(typeof(checkpoint.getVariable("checkpoint.data")) !== "undefined") {
						let racingStartData = checkpoint.getVariable("checkpoint.data");
						let posData = new mp.Vector3(parseFloat(checkpoint.position.x), parseFloat(checkpoint.position.y), parseFloat(checkpoint.position.z)-1.1);
						let racingStartMarker = mp.markers.new(1, posData, 2.4,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 0, 0),
							color: [82, 202, 219, 200],
							visible: true,
							dimension: 0
						});
						racingStartInStream[racingStartData.key] = {'pos':posData,'marker':racingStartMarker.id.toString(),'alpha':0};
					}
				}else if(checkPointType == "racingStart") {
					if(hud_browser) {
						if(typeof(checkpoint.getVariable("checkpoint.data")) !== "undefined") {
							if(!localPlayer.vehicle) {
								if(allowBinds != stockBinds) return false;
								let racingStartData = checkpoint.getVariable("checkpoint.data");
								allowBinds = [];
								hud_browser.execute("toggleRacingPanel('"+racingStartData.active.toString()+"');");
								mp.gui.cursor.visible = true;
								createRacePanel = {"key":racingStartData.key,"checkID":racingStartData.checkID,"active":racingStartData.active.toString()};
							}
						}
					}
				}else if(checkPointType == "racingStart_startpos") {
					if(hud_browser && localPlayer.vehicle && vehSeat == -1) {
						if(typeof(checkpoint.getVariable('checkpoint.data')) !== "undefined") {
							if(allowBinds != stockBinds) return false;
							
							let racingStartCheckData = checkpoint.getVariable('checkpoint.data');
							if(racingStartCheckData.racer) return notyAPI.error("Кто-то уже занял эту позицию, выбери другую.", 3000, true);
							if(typeof(localPlayer.getVariable("player.money")) === "undefined") return notyAPI.error("Недостаточно средств для участия в заезде.", 3000, true);
							if(parseInt(localPlayer.getVariable("player.money")) < parseInt(racingStartCheckData.cost)) return notyAPI.error("Недостаточно средств для участия в заезде.", 3000, true);
							
							allowBinds = [];
							dialogRacePanel = {"key":racingStartCheckData.key,"subkey":racingStartCheckData.subkey,"cost":racingStartCheckData.cost.toString(),"heading":racingStartCheckData.heading.toString(),"racer":racingStartCheckData.racer.toString()};
							activeStreetRace = JSON.parse(JSON.stringify(dialogRacePanel));
							hud_browser.execute("toggleRacingDialogPanel('"+racingStartCheckData.cost.toString()+"');");
							mp.gui.cursor.visible = true;
						}
					}
				}
			}
		}
	}
});

mp.events.add("acceptStreetRace", () => {
	if(hud_browser) {
		if(dialogRacePanel && localPlayer.vehicle) {
			let theVeh = localPlayer.vehicle;
			if(typeof(theVeh.getVariable('veh.own')) !== "undefined") {
				let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
				if(vehOwn.remoteId.toString() == localPlayer.remoteId.toString()) {
					if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')))) {
						let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
						if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) return hud_browser.execute("createRacePanelError(2, 'Только личное ТС');");
					}else{
						return hud_browser.execute("createRacePanelError(2, 'Только личное ТС');");
					}
					if(theVeh.getVariable('veh.num') == "theMoto") return hud_browser.execute("createRacePanelError(2, 'На мото нельзя');");
					
					if(typeof(theVeh.getVariable('veh.params')) !== "undefined") {
						let vehParams = JSON.parse(theVeh.getVariable("veh.params"));
						if(typeof(vehParams.rent) !== "undefined") return hud_browser.execute("createRacePanelError(2, 'Это арендованый транспорт');");
					}
					
					if(theVeh.getClass() == 15) return hud_browser.execute("createRacePanelError(2, 'Это арендованый транспорт');");
				}else{
					return hud_browser.execute("createRacePanelError(2, 'Только личное ТС');");
				}
			}else{
				return hud_browser.execute("createRacePanelError(2, 'Только личное ТС');");
			}
			
			if(dialogRacePanel.racer == "true") return hud_browser.execute("createRacePanelError(2, 'На этой позиции уже есть гонщик');");
			hud_browser.execute("toggleRacingDialogPanel();");
			mp.gui.cursor.visible = false;
			localPlayer.freezePosition(true);
			if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(true);
			
			if(dialogRacePanel.cost) mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~уличная гонка", "~s~Вы успешно приняли эту зарубу!~n~Оплачен взнос:"+dialogRacePanel.cost.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.", 5, false, true, 6500);
			
			mp.events.callRemote('acceptStreetRace', JSON.stringify(dialogRacePanel));
			localPlayer.vehicle.setHeading(parseFloat(dialogRacePanel.heading));
		}
	}
});

mp.events.add("acceptStreetRaceError", (errorText) => {
	if(hud_browser) {
		if(typeof(errorText) !== "undefined") return hud_browser.execute("createRacePanelError(2, '"+errorText+"');");
	}
});

mp.events.add("closeRacingDialogPanel", () => {
	if(hud_browser) {
		if(dialogRacePanel) {
			dialogRacePanel = false;
			activeStreetRace = false;
			if(hud_browser) {
				hud_browser.execute("toggleRacingDialogPanel();");
				mp.gui.cursor.visible = false;
				restoreBinds();
			}
		}
	}
});

mp.events.add("createStreetRace", (streetRaceCost) => {
	if(hud_browser) {
		if(createRacePanel) {
			if(createRacePanel.active == "true") return hud_browser.execute("createRacePanelError(1, 'Кто-то уже начал гоночный сеанс!');");
			if(typeof(streetRaceCost) === "undefined") return hud_browser.execute("createRacePanelError(1, 'Вы не указали сумму взноса');");
			if(!streetRaceCost) return hud_browser.execute("createRacePanelError(1, 'Минимальный взнос 10 000 руб.');");
			else if(parseInt(streetRaceCost) < 10000) return hud_browser.execute("createRacePanelError(1, 'Минимальный взнос 10 000 руб.');");
			else if(parseInt(streetRaceCost) > 500000) return hud_browser.execute("createRacePanelError(1, 'Максимальный взнос 500 000 руб.');");
			mp.events.callRemote('createStreetRace', streetRaceCost, JSON.stringify(createRacePanel));
			if(createRacePanel) createRacePanel = false;
			hud_browser.execute("toggleRacingPanel();");
			mp.gui.cursor.visible = false;
			restoreBinds();
		}
	}
});

mp.events.add("raceNotifyCreated", (nick, id, cost) => {
	if(hud_browser && typeof(nick) !== "undefined" && typeof(id) !== "undefined" && typeof(cost) !== "undefined") {
		notyAPI.info("Уличная гонка где-то рядом, <b>"+nick+"</b> (<b>"+id+"</b>) уже всё организовал, взнос:<b>"+cost.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b> руб.", 3000, true);
		chatAPI.notifyPush("Уличная гонка где-то рядом, <span style=\"color:#FEBC00\"><b>"+nick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+id+"</b></span>) уже всё организовал, взнос:<span style=\"color:#FEBC00\"><b>"+cost.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
		chatAPI.notifyPush("У Вас есть 60 секунд, что бы <span style=\"color:#FEBC00\"><b>занять свободную позицию</b></span> старта!");
		mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~уличная гонка", "~s~Игрок "+nick+" ("+id+") создал гоночную сессию!~n~И это где-то очень рядом, взнос:"+cost.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.", 5, false, true, 6500);
	}
});

mp.events.add("streetRaceResult", (winMoney, nick, id) => {
	if(typeof(nick) !== "undefined" && typeof(id) !== "undefined" && typeof(winMoney) !== "undefined") {
		if(mp.checkpoints.exists(streetRaceCheckpoint)) {
			streetRaceCheckpoint.destroy();
			streetRaceCheckpoint = false;
		}
		if(mp.blips.exists(streetRaceBlip)) {
			streetRaceBlip.destroy();
			streetRaceBlip = false;
		}
		if(activeStreetRace) activeStreetRace = false;
		if(hud_browser) {
			chatAPI.notifyPush("Заезд окончен! <span style=\"color:#FEBC00\"><b>"+nick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+id+"</b></span>) забирает куш в размере <span style=\"color:#FEBC00\"><b>"+winMoney.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~уличная гонка", "~s~Игрок "+nick+" ("+id+") одержал победу!~n~Куш в размере:"+winMoney.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб. достаётся ему!", 5, false, true, 6500);
		}
	}
});

mp.events.add("createStreetRaceError", (errorText) => {
	if(hud_browser) {
		if(typeof(errorText) !== "undefined") return hud_browser.execute("createRacePanelError(1, '"+errorText+"');");
	}
});

mp.events.add("closeRacingPanel", () => {
	if(createRacePanel) createRacePanel = false;
	if(hud_browser) {
		hud_browser.execute("toggleRacingPanel();");
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
});

var streetRaceBlip = false, streetRaceCheckpoint = false;
mp.events.add("readyRace", (result, cost, finish) => {
	if(!result) {
		finish = JSON.parse(finish);
		streetRaceBlip = mp.blips.new(610, finish.pos, {
			name: "Точка финиша уличной гонки",
			scale: 1.1,
			color: 1,
			shortRange: false,
			dimension: 0
		});
		streetRaceBlip.setRoute(true);
		streetRaceBlip.setRouteColour(6);
		
		finish.pos.z = finish.pos.z - 10;
		
		streetRaceCheckpoint = mp.checkpoints.new(4, finish.pos, 20.5,
		{
			color: [242, 75, 75, 200],
			visible: true,
			dimension: 0
		});
		
		if(activeStreetRace) {
			let cd = 0;
			let cdInterval = setInterval(function(){
				cd++;
				if(cd == 1) {
					if(hud_browser) hud_browser.execute('playSound("raceCD", "0.2");');
					mp.game.ui.messages.showShard("Ready", "Давно тебя не было в уличных гонках..", 6, 2, 2000);
				}else if(cd == 2) {
					if(hud_browser) hud_browser.execute('playSound("raceCD", "0.25");');
					mp.game.ui.messages.showShard("Set", "Готовься к старту!", 6, 2, 2000);
				}else if(cd == 3) {
					if(hud_browser) hud_browser.execute('playSound("raceCDGo", "0.3");');
					mp.game.ui.messages.showShard("GO", "Вперёд! Поехали!!!", 6, 2, 2000);
					clearInterval(cdInterval);
					localPlayer.freezePosition(false);
					if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(false);
				}
			}, 1500);
		}
	}else{
		if(activeStreetRace) activeStreetRace = false;
		if(mp.checkpoints.exists(streetRaceCheckpoint)) {
			streetRaceCheckpoint.destroy();
			streetRaceCheckpoint = false;
		}
		if(mp.blips.exists(streetRaceBlip)) {
			streetRaceBlip.destroy();
			streetRaceBlip = false;
		}
		localPlayer.freezePosition(false);
		if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(false);
		return notyAPI.error("Уличная гонка сорвалась, причина: <b>"+result+"</b>", 3000, true);
	}
});

mp.events.add("playerDeath", (player, reason, killer) => {
    if(activeStreetRace) activeStreetRace = false;
	if(mp.checkpoints.exists(streetRaceCheckpoint)) {
		streetRaceCheckpoint.destroy();
		streetRaceCheckpoint = false;
	}
	if(mp.blips.exists(streetRaceBlip)) {
		streetRaceBlip.destroy();
		streetRaceBlip = false;
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.getVariable("checkpoint.type")) !== "undefined") {
			let checkPointType = checkpoint.getVariable("checkpoint.type");
			if(checkPointType == 'racingStart_render') {
				if(typeof(checkpoint.getVariable('checkpoint.data')) !== "undefined") {
					let racingStartData = checkpoint.getVariable('checkpoint.data');
					if(typeof(racingStartInStream[racingStartData.key]) !== "undefined") {
						let tempData = racingStartInStream[racingStartData.key];
						let tempMarker = mp.markers.at(parseInt(tempData['marker']));
						if(mp.markers.exists(tempMarker)) tempMarker.destroy();
						racingStartInStream[racingStartData.key] = undefined;
						racingStartInStream = JSON.parse(JSON.stringify(racingStartInStream));
					}
				}
			}else if(checkPointType == "racingStart") {
				if(createRacePanel) createRacePanel = false;
				if(hud_browser) {
					hud_browser.execute("toggleRacingPanel();");
					mp.gui.cursor.visible = false;
					restoreBinds();
				}
			}else if(checkPointType == "racingStart_startpos") {
				if(dialogRacePanel) dialogRacePanel = false;
				if(hud_browser) {
					hud_browser.execute("toggleRacingDialogPanel();");
					mp.gui.cursor.visible = false;
					restoreBinds();
				}
			}
		}
	}
});
}Φ