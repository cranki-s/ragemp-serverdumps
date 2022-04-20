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
					if(allowBinds != stockBinds) return false;
					if(typeof(localPlayer.getVariable('player.money')) === "undefined") return notyAPI.error("Аренда транспорта для Вас недоступна, попробуйте позже.", 3000, true);
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
		
		let myLics = {};
		if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
		
		if(rentClassVeh == "water" || rentClassVeh == "water2" || rentClassVeh == "water3" || rentClassVeh == "water4") {
			if(typeof(myLics["boatCat"]) === "undefined") return hud_browser.execute("errorRentVehPanel('У Вас нет лицензии на управление водным транспортом');");
		}
		
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
		notyAPI.error("По техническим причинам, не удалось взять транспорт в аренду.", 3000, true);
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
}