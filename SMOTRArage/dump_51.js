{
var gasInStream = [];
var imInGasStation = false;
var imRefuiling = false;

var processorFuelVeh = false, processorFuelVehPos = {"x":0,"y":0,"z":0}, processorFuelVehData = {};
let saveGasTicks = 0;

var vehGasSaving = false;

mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
	if(processorFuelVeh) {
		saveGasTicks = 0;
		processorFuelVeh = false;
		processorFuelVehPos = {"x":0,"y":0,"z":0};
		processorFuelVehData = {};
	}
});

function vehFuelProcessor() {
	if(localPlayer.vehicle && typeof(localPlayer.vehicle.getVariable("veh.fuel")) !== "undefined" && typeof(localPlayer.vehicle.getVariable("vehicle.engine")) !== "undefined" && vehSeat == -1) {
		let theVeh = localPlayer.vehicle;
		let vehClass = theVeh.getClass().toString();
		
		let customSpeed = false;
		let noRemain = false;
		if(typeof(theVeh.getVariable("veh.params")) !== "undefined") {
			let vehParams = JSON.parse(theVeh.getVariable("veh.params"));
			
			if(typeof(vehParams.maxSpeed) !== "undefined") customSpeed = parseInt(vehParams.maxSpeed);
			if(typeof(vehParams.rent_type) !== "undefined") {
				if(vehParams.rent_type == "d3") noRemain = true;
			}
		}
		
		if(typeof(curCourierTask) !== "undefined") {
			if(typeof(curCourierTask.workTimer) !== "undefined") noRemain = true;
		}
		
		if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
			if(theVeh.getVariable("veh.hash") == "s_p450") {
				if(typeof(processorFuelVehData.firetank) !== "undefined") {
					if(updateWaterFireTruckTank) {
						saveGasTicks++;
						if(saveGasTicks >= 65) {
							vehGasSaving = theVeh.id.toString();
							mp.events.callRemoteUnreliable('vehSetFuel', theVeh, JSON.stringify(processorFuelVehData), false);
						}
						updateWaterFireTruckTank = false;
					}
				}
				noRemain = true;
			}
		}
		
		if(!noRemain) {
			if(processorFuelVeh && theVeh.getVariable("vehicle.engine") && processorFuelVeh == theVeh && processorFuelVehPos.x != 0 && processorFuelVehPos.y != 0 && processorFuelVehPos.z != 0) {
				processorFuelVehData = JSON.parse(theVeh.getVariable("veh.fuel"));
				let tempVehPos = theVeh.position;
				let dist = mp.game.system.vdist2(processorFuelVehPos.x, processorFuelVehPos.y, processorFuelVehPos.z, tempVehPos.x, tempVehPos.y, tempVehPos.z);
				dist = roundNumber(dist / 40000, 4); // км.
				
				processorFuelVehData.probeg = roundNumber(parseFloat(processorFuelVehData.probeg) + dist, 4); // новый пробег
				let consumption = roundNumber(dist / 12, 4); // было 10
				
				if(vehClass == "15") consumption = roundNumber(dist / 2, 4);
				
				/*if(processorFuelVehData.type.toString() == "95") consumption = roundNumber(dist / 8, 4);
				else if(processorFuelVehData.type.toString() == "98") consumption = roundNumber(dist / 8, 4);
				else if(processorFuelVehData.type.toString() == "100") consumption = roundNumber(dist / 8, 4);
				else if(processorFuelVehData.type.toString() == "diesel") consumption = roundNumber(dist / 8, 4);*/
				
				if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
					let myBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(myBlocks.premium) !== "undefined") consumption = roundNumber(consumption / 2, 4);
				}
				
				processorFuelVehData.value = roundNumber(parseFloat(processorFuelVehData.value) - consumption, 4);
				if(processorFuelVehData.value < 0) processorFuelVehData.value = 0;
				
				if(processorFuelVehData.value <= 0) {
					notyAPI.error("В баке нет топлива, двигатель заглох!", 5000, true);
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * В баке нет топлива, двигатель заглох!</span>");
					mp.events.callRemote('keypress:4', false);
				}
				
				/*chatAPI.sysPush("<span style=\"color:#FF6146\"> * Пройденная дистанция: <b>"+dist.toString()+"</b> км.</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Расход: <b>"+consumption.toString()+"</b> л.</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Новые параметры: пробег: <b>"+processorFuelVehData.probeg.toString()+"</b> км. | топливо: <b>"+processorFuelVehData.value.toString()+"</b> л.</span>");*/
				
				if(dist > 0.1 && consumption > 0) {
					saveGasTicks++;
					if(saveGasTicks >= 65) {
						saveGasTicks = 0;
						vehGasSaving = theVeh.id.toString();
						mp.events.callRemoteUnreliable('vehSetFuel', theVeh, JSON.stringify(processorFuelVehData), true);
					}else{
						vehGasSaving = theVeh.id.toString();
						mp.events.callRemoteUnreliable('vehSetFuel', theVeh, JSON.stringify(processorFuelVehData), false);
					}
				}
			}
			processorFuelVeh = theVeh;
			processorFuelVehPos = theVeh.position;
		}else{
			saveGasTicks = 0;
			processorFuelVeh = false;
			processorFuelVehPos = {"x":0,"y":0,"z":0};
			processorFuelVehData = {};
		}
	}else{
		if(processorFuelVeh) {
			saveGasTicks = 0;
			processorFuelVeh = false;
			processorFuelVehPos = {"x":0,"y":0,"z":0};
			processorFuelVehData = {};
		}
	}
}

mp.events.addDataHandler('veh.fuel', function (entity, value, oldValue) {
	if(localPlayer.vehicle) {
		if(entity && entity.type == "vehicle" && value && oldValue) {
			if(typeof(value) != "undefined" && typeof(oldValue) != "undefined") {
				if(entity.id.toString() == vehGasSaving) {
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Топливо синхронизировано и сохранено</span>");
					vehGasSaving = false;
				}
			}
		}
	}
});

mp.events.add("entityDestroyed", entity => {
	if(typeof(entity.id) !== "undefined") {
		if(entity.id.toString() == vehGasSaving) {
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Топливо синхронизировано и сохранено</span>");
			vehGasSaving = false;
		}
	}
});

function closeGasPanel() {
	if(hud_browser) {
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
		hud_browser.execute("toggleGasPanel();");
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("closeGasPanel", closeGasPanel);

function closeGasElectroPanel() {
	if(hud_browser) {
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
		hud_browser.execute("toggleElectroPanel();");
		mp.gui.cursor.visible = false;
		restoreBinds();
		if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(false);
	}
}
mp.events.add("closeGasElectroPanel", closeGasElectroPanel);

function gasPayAndRefuel(gasVehName, gasType, gasValue, gasCost) {
	if(hud_browser) {
		if(gasVehName && gasType && gasValue && gasCost && !imRefuiling) {
			let theVeh = localPlayer.vehicle;
			if(theVeh && vehSeat == -1) {
				if(typeof(localPlayer.getVariable("player.money")) !== "undefined" && typeof(theVeh.getVariable("veh.fuel")) !== "undefined") {
					if(vehGasSaving) return hud_browser.execute("gasPanelError('Заправка на тех. обслуживании, попробуйте ещё раз..');");
					
					if(gasType != "electro") {
						let myMoney = parseInt(localPlayer.getVariable("player.money"));
						if(myMoney < gasCost) return hud_browser.execute("gasPanelError('Недостаточно средств');");
					}
					
					let vehName = "Транспорт";
					let vehHash = theVeh.getVariable("veh.hash");
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
					else vehName = vehHash;
					
					let vehGasTank = false;
					if(typeof(decVehStats[0][vehHash]) != "undefined") vehGasTank = decVehStats[0][vehHash].gasTank;
					
					let vehGasTypes = false;
					if(typeof(decVehStats[0][vehHash]) != "undefined") {
						vehGasTypes = JSON.stringify(decVehStats[0][vehHash].fuel);
						vehGasTypes = vehGasTypes.replace(/^.{2}/, '');
						vehGasTypes = vehGasTypes.replace(/.{2}$/, '');
					}
					if(vehGasTypes) vehGasTypes = '["'+vehGasTypes.toString()+'"]';
					
					let gasVehValue = theVeh.getVariable("veh.fuel").toString();
					gasVehValue = JSON.parse(gasVehValue);
					
					if(vehName && vehGasTypes && vehGasTank && gasVehValue) {
						if(gasType != "electro") {
							if(gasVehValue.value >= vehGasTank) return hud_browser.execute("gasPanelError('Бак полон');");
							if(!/^[0-9]+$/.test(gasValue)) return hud_browser.execute("gasPanelError('Вы не ввели кол-во литров');");
							if(!gasValue || gasValue == "" || gasValue.length == 0 || parseInt(gasValue) <= 0) return hud_browser.execute("gasPanelError('Вы не ввели кол-во литров');");
							if(parseInt(gasValue) > vehGasTank || (gasVehValue.value+parseInt(gasValue)) > (vehGasTank+1)) return hud_browser.execute("gasPanelError('Нельзя заправить более полного бака');");
							
							let costText = gasCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
							let gasName = gasType.toString();
							if(gasName == "92") gasName = "АИ-92";
							else if(gasName == "95") gasName = "АИ-95";
							else if(gasName == "98") gasName = "АИ-98";
							else if(gasName == "100") gasName = "АИ-100";
							else if(gasName == "diesel") gasName = "дизеля";
							closeGasPanel();
							imRefuiling = true;
							vehGasSaving = theVeh.id.toString();
							
							mp.game.ui.messages.showMidsizedShard("~y~Вы заправили ~w~"+gasVehName, "~s~Заправлено ~g~~h~"+gasValue+"~s~ л.  ~g~~h~"+gasName+"~n~~s~Оплачено~g~~h~"+costText+" ~s~руб.", 5, false, true, 8000);
						}else{
							if(gasVehValue.value >= vehGasTank) return hud_browser.execute("refuelingPanelError('Батарея заряжена');");
							
							closeGasPanel();
							imRefuiling = true;
							vehGasSaving = theVeh.id.toString();
							
							mp.game.ui.messages.showMidsizedShard("~y~Вы зарядили ~w~"+gasVehName, "~s~Заряжено ~g~~h~"+gasValue+"~s~ кВт/ч  ~g~~h~Электричество~n~~s~Зарядка ~g~~h~полностью ~s~бесплатна", 5, false, true, 8000);
						}
						mp.events.callRemote('vehRefuel', theVeh, gasType, gasValue, gasCost);
						theVeh.freezePosition(false);
					}else{
						return hud_browser.execute("gasPanelError('Неизвестная ошибка, повторите позднее..');");
					}
				}else{
					return hud_browser.execute("gasPanelError('Недостаточно средств');");
				}
			}else{
				return hud_browser.execute("gasPanelError('Произошла ошибка инициализации транспорта');");
			}
		}else{
			return hud_browser.execute("gasPanelError('Неизвестная ошибка');");
		}
	}
}
mp.events.add("gasPayAndRefuel", gasPayAndRefuel);

function refuelSuccess() {
	imRefuiling = false;
}
mp.events.add("refuelSuccess", refuelSuccess);

function openGasPanel() {
	let theVeh = localPlayer.vehicle;
	if(theVeh.getVariable("veh.id") && theVeh.getVariable("veh.hash") && theVeh.getVariable("veh.fuel") && !imRefuiling) {
		let vehName = "Транспорт";
		let vehHash = theVeh.getVariable("veh.hash");
		
		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
		else vehName = vehHash;
		
		let vehGasTank = false;
		if(typeof(decVehStats[0][vehHash]) != "undefined") vehGasTank = decVehStats[0][vehHash].gasTank;
		
		let vehGasTypes = false;
		if(typeof(decVehStats[0][vehHash]) != "undefined") {
			vehGasTypes = JSON.stringify(decVehStats[0][vehHash].fuel);
			vehGasTypes = vehGasTypes.replace(/^.{2}/, '');
			vehGasTypes = vehGasTypes.replace(/.{2}$/, '');
		}
		if(vehGasTypes) vehGasTypes = '["'+vehGasTypes.toString()+'"]';
		let tempVehGasTypes = JSON.parse(vehGasTypes);
		
		if(vehGasTypes.includes('electro')) return notyAPI.error("Эта заправка недоступна для электро-транспорта.", 3000, true);
		
		let gasVehValue = theVeh.getVariable("veh.fuel").toString();
		
		if(vehName && vehGasTypes && vehGasTank && gasVehValue) {
			allowBinds = [];
			mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
			//chatAPI.sysPush(theVeh.getVariable("veh.id").toString()+" | "+vehName.toString()+" | "+vehGasTank.toString()+" | "+vehGasTypes.toString()+" | "+gasVehValue.toString());
			hud_browser.execute("toggleGasPanel('"+theVeh.getVariable("veh.id").toString()+"','"+vehName.toString()+"','"+vehGasTank.toString()+"','"+vehGasTypes.toString()+"','"+gasVehValue.toString()+"');");
			mp.gui.cursor.visible = true;
		}else{
			notyAPI.error("Заправочная станция сломалась, повторите позднее..", 3000, true);
		}
	}
}

function openElectroPanel() {
	let theVeh = localPlayer.vehicle;
	if(theVeh.getVariable("veh.id") && theVeh.getVariable("veh.hash") && theVeh.getVariable("veh.fuel") && !imRefuiling) {
		let vehName = "Транспорт";
		let vehHash = theVeh.getVariable("veh.hash");
		
		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
		else vehName = vehHash;
		
		let vehGasTank = false;
		if(typeof(decVehStats[0][vehHash]) != "undefined") vehGasTank = decVehStats[0][vehHash].gasTank;
		
		let vehGasTypes = false;
		if(typeof(decVehStats[0][vehHash]) != "undefined") {
			vehGasTypes = JSON.stringify(decVehStats[0][vehHash].fuel);
			vehGasTypes = vehGasTypes.replace(/^.{2}/, '');
			vehGasTypes = vehGasTypes.replace(/.{2}$/, '');
		}
		if(vehGasTypes) vehGasTypes = JSON.parse('["'+vehGasTypes.toString()+'"]');
		if(!vehGasTypes.includes('electro')) return notyAPI.error("Зарядка доступна только для электро-транспорта.", 3000, true);
		
		let gasVehValue = theVeh.getVariable("veh.fuel").toString();
		
		if(vehName && vehGasTank && gasVehValue) {
			allowBinds = [];
			mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
			//chatAPI.sysPush(theVeh.getVariable("veh.id").toString()+" | "+vehName.toString()+" | "+vehGasTank.toString()+" | "+vehGasTypes.toString()+" | "+gasVehValue.toString());
			hud_browser.execute("toggleElectroPanel('"+theVeh.getVariable("veh.id").toString()+"','"+vehName.toString()+"','"+vehGasTank.toString()+"','"+gasVehValue.toString()+"');");
			mp.gui.cursor.visible = true;
			if(theVeh) theVeh.freezePosition(true);
		}else{
			notyAPI.error("Зарядная станция сломалась, повторите позднее..", 3000, true);
		}
	}
}

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'gas_render') {
				let gasData = shape.getVariable('col.data');
				
				let gasMarkerID = 36;
				let gasMarkerColor = [193, 53, 53];
				if(gasData[3] == "heli") {
					gasMarkerID = 34;
				}else if(gasData[3] == "electro") {
					gasMarkerColor = [255, 162, 25];
				}
				
				let gasMarker = mp.markers.new(gasMarkerID, new mp.Vector3(gasData[0], gasData[1], gasData[2]), 2.2,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [gasMarkerColor[0], gasMarkerColor[1], gasMarkerColor[2], 75],
					visible: true,
					dimension: 0
				});
				
				let gasCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(gasData[0]), parseFloat(gasData[1]), parseFloat(gasData[2])), 2.1,
				{
					color: [255, 255, 255, 0],
					visible: true,
					dimension: localPlayer.dimension
				});
				gasCheck.gasData = gasData;
				
				let gasArray = {'marker': gasMarker, 'check': gasCheck, 'pos': [gasData[0], gasData[1], gasData[2], gasData[3]], 'alpha': 0};
				gasInStream.push(gasArray);
				gasMarker = null;
				return null;
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.gasData) !== "undefined") {
			if(allowBinds != stockBinds) return false;
			if(localPlayer.getVariable('player.id')) {
				let theVeh = localPlayer.vehicle;
				
				let gasData = checkpoint.gasData;
					
				if(gasData[3] != "electro") imInGasStation = "gas";
				else imInGasStation = "electro";
				
				if(theVeh && vehSeat == -1) {
					if(vehPanel) return false;
					if(myVehSaving) return false;
					if(inventorySaving || invCEFUpdating || invCEFUpdatingVeh) return false;
					if(inventoryPanel) return false;
					if(imRefuiling) return notyAPI.error("Ваш транспорт уже заправляется, ждите..", 3000, true);
					
					if(gasData[3] == "heli") {
						if(theVeh.getClass() != 15) return notyAPI.error("Здесь можно заправить только вертолёт.", 3000, true);
					}else{
						if(theVeh.getClass() == 15) return notyAPI.error("Здесь нельзя заправить вертолёт.", 3000, true);
					}
					
					theVeh.setForwardSpeed(0);
					
					if(gasData[3] != "electro") openGasPanel();
					else openElectroPanel();
				}
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(shape && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'gas_render') {
				let gasData = shape.getVariable('col.data');
				for(var i in gasInStream) {
					let tempData = gasInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == gasData[0] && posData[1] == gasData[1] && posData[2] == gasData[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(gasInStream[i] || gasInStream[i] !== undefined) delete gasInStream[i];
					}
					tempData = null;
				}
				gasInStream = gasInStream.filter(function (el) { return el != null; });
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.gasData) !== "undefined") {
			if(imInGasStation) {
				if(imInGasStation == "electro") closeGasElectroPanel();
				else if(imInGasStation == "gas") closeGasPanel();
				imInGasStation = false;
			}
		}
	}
});
}