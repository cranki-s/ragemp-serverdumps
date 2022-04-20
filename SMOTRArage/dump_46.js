{
var utilizationsInStream = [];

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'utilization_render') {
				let utilizationData = shape.getVariable('col.data');
				
				let utilizationMarker = mp.markers.new(36, new mp.Vector3(parseFloat(utilizationData[0]), parseFloat(utilizationData[1]), parseFloat(utilizationData[2])-0.4), 2.5,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [137, 33, 166, 200],
					visible: true,
					dimension: 0
				});
				
				let utilizationCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(utilizationData[0]), parseFloat(utilizationData[1]), parseFloat(utilizationData[2])), 1.2,
				{
					color: [255, 255, 255, 0],
					visible: true,
					dimension: localPlayer.dimension
				});
				utilizationCheck.utilData = utilizationData;
				
				let utilizationArray = {'marker': utilizationMarker, 'pos': [parseFloat(utilizationData[0]), parseFloat(utilizationData[1]), parseFloat(utilizationData[2])-2.4], 'check':utilizationCheck.id.toString(), 'alpha': 0};
				utilizationsInStream.push(utilizationArray);
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.utilData) !== "undefined") {
			if(typeof(localPlayer.getVariable('player.id')) != "undefined" && hud_browser) {
				if(allowBinds != stockBinds) return false;
				if(typeof(localPlayer.getVariable('player.money')) != "undefined") {
					let utilVehicle = localPlayer.vehicle;
					
					if(utilVehicle && hud_browser) {
						if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
							if(localPlayer.getVariable("active.deal")) return notyAPI.error("У Вас есть активная сделка, утиль недоступен.", 3000, true);
						}

						if(typeof(utilVehicle.getVariable('veh.id')) !== "undefined" && typeof(utilVehicle.getVariable('veh.own')) !== "undefined" && typeof(utilVehicle.getVariable('veh.owners')) !== "undefined" && typeof(utilVehicle.getVariable('veh.hash')) !== "undefined" && typeof(utilVehicle.getVariable('veh.fuel')) !== "undefined") {
							if(mp.players.atRemoteId(parseInt(utilVehicle.getVariable('veh.own')))) {
								let vehOwn = mp.players.atRemoteId(parseInt(utilVehicle.getVariable('veh.own')));
								if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) return notyAPI.error("Утилизировать можно только личный транспорт.", 3000, true);
							}else{
								return notyAPI.error("Утилизировать можно только личный транспорт.", 3000, true);
							}
						}else{
							return notyAPI.error("Утилизировать можно только личный транспорт.", 3000, true);
						}
						
						if(vehPanel) closeVehMenu();
						
						if(hud_browser) {
							let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
							decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
							
							let vehHash = utilVehicle.getVariable('veh.hash').toString();
							let vehName = "Транспорт";
							if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
							else vehName = vehHash;
							let vehCost = 0;
							if(typeof(decVehStats[0][vehHash]) != "undefined") vehCost = decVehStats[0][vehHash].cost;
							vehCost = vehCost - (vehCost * 0.25);
							vehCost = vehCost.toString();
							
							let fuelData = {"probeg":0};
							if(typeof(utilVehicle.getVariable("veh.fuel")) !== "undefined") fuelData = JSON.parse(utilVehicle.getVariable("veh.fuel"));
							
							localPlayer.freezePosition(true);
							mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
							hud_browser.execute("toggleUtilizationBlank('"+vehName+"', '0', '"+roundNumber(fuelData.probeg,0)+"', '"+utilVehicle.getVariable('veh.owners')+"', '"+vehCost+"');");
							mp.gui.cursor.visible = true;
							
							allowBinds = [];
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
			if(colType == 'utilization_render') {
				let utilizationRenderData = shape.getVariable('col.data');
				for(var i in utilizationsInStream) {
					let tempData = utilizationsInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == utilizationRenderData[0] && posData[1] == utilizationRenderData[1] && posData[2] == utilizationRenderData[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						let tempCheck = mp.checkpoints.at(parseInt(tempData['check']));
						if(mp.markers.exists(tempCheck)) tempCheck.destroy();
						if(utilizationsInStream[i] || utilizationsInStream[i] !== undefined) delete utilizationsInStream[i];
					}
				}
				utilizationsInStream = utilizationsInStream.filter(function (el) { return el != null; });
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.utilData) !== "undefined") closeUtilizationBlank();
	}
});

function makeUtilization() {
	closeUtilizationBlank();
	if(vehPanel) closeVehMenu();
	
	let utilVehicle = localPlayer.vehicle;
	if(utilVehicle) {
		if(typeof(utilVehicle.getVariable('veh.id')) !== "undefined" && typeof(utilVehicle.getVariable('veh.own')) !== "undefined" && typeof(utilVehicle.getVariable('veh.hash')) !== "undefined") {
			if(mp.players.atRemoteId(parseInt(utilVehicle.getVariable('veh.own')))) {
				let vehOwn = mp.players.atRemoteId(parseInt(utilVehicle.getVariable('veh.own')));
				if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) return notyAPI.error("Утилизировать можно только личный транспорт.", 3000, true);
			}else{
				return notyAPI.error("Утилизировать можно только личный транспорт.", 3000, true);
			}
		}else{
			return notyAPI.error("Утилизировать можно только личный транспорт.", 3000, true);
		}
	
		if(typeof(utilVehicle.getVariable('veh.params')) !== "undefined") {
			let vehParams = JSON.parse(utilVehicle.getVariable("veh.params"));
			if(typeof(vehParams.rent) !== "undefined") return notyAPI.error("Арендованый транспорт нельзя утилизировать.", 3000, true);
		}

		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		let vehHash = utilVehicle.getVariable('veh.hash').toString();
		let vehName = "Транспорт";
		if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
		else vehName = vehHash;
		
		let vehCost = 0;
		if(typeof(decVehStats[0][vehHash]) != "undefined") vehCost = decVehStats[0][vehHash].cost;
		vehCost = vehCost - (vehCost * 0.25);
		
		if(hud_browser) hud_browser.execute("togglePreloader('true');");
		localPlayer.freezePosition(true);
		mp.events.callRemote('makeUtilization', utilVehicle, vehName, vehCost);
	}
}
mp.events.add("makeUtilization", makeUtilization);

function utilizationMaked(state, vehName, vehCost) {
	if(hud_browser) hud_browser.execute("togglePreloader('');");
	if(vehPanel) closeVehMenu();
	
	if(!state) {
		notyAPI.error("Во время утилизации произошла ошибка.", 3000, true);
	}else{
		if(hud_browser) hud_browser.execute('unsetSelVehData();');
		let costText = vehCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
		mp.game.ui.messages.showMidsizedShard("~y~Вы утилизировали ~w~транспорт", "~s~"+vehName.toString()+"~n~Получено~g~~h~"+costText+" ~s~руб.", 5, false, true, 8000);
	}
	
	localPlayer.freezePosition(false);
}
mp.events.add("utilizationMaked", utilizationMaked);

function closeUtilizationBlank() {
	restoreBinds();
	localPlayer.freezePosition(false);
	if(vehPanel) closeVehMenu();
	if(hud_browser) {
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
		hud_browser.execute("toggleUtilizationBlank();");
		mp.gui.cursor.visible = false;
	}
}
mp.events.add("closeUtilizationBlank", closeUtilizationBlank);
}