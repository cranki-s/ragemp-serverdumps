{
/*
mp.markers.new(28, new mp.Vector3(471.7285,-1886.5043,26.0981), 10, // DEBUG
{
	direction: new mp.Vector3(0, 0, 0),
	rotation: new mp.Vector3(0, 180, 0),
	color: [0, 0, 200, 50],
	visible: true,
	dimension: 0
});
*/
var chipsInStream = [];

var chip1shape = mp.colshapes.newSphere(471.7285,-1886.5043,26.0981, 15, 0);
var chip2shape = mp.colshapes.newSphere(545.5057,-181.9909,54.4777, 15, 0);
var chip3shape = mp.colshapes.newSphere(1144.9686,-782.0062,57.5987, 15, 0);
var chip4shape = mp.colshapes.newSphere(-1285.8651,-1364.4087,4.322, 15, 0);
var chip5shape = mp.colshapes.newSphere(-213.1524,6235.4424,31.5094, 15, 0);
var chip6shape = mp.colshapes.newSphere(641.551,250.8256,103.1587, 15, 0);
var chip7shape = mp.colshapes.newSphere(29.1332,-1323.8102,29.5218, 15, 0);
var chip8shape = mp.colshapes.newSphere(1767.3389,3327.5876,41.4386, 15, 0);
var chipImInZone = false;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'chip_render') {
				let chipData = shape.getVariable('col.data');
				
				let chipArray = {'pos': [parseFloat(chipData[0]), parseFloat(chipData[1]), parseFloat(chipData[2])], 'alpha': 0};
				chipsInStream.push(chipArray);
				
				return null;
			}
		}
	}
	if(typeof(shape) != "undefined") {
		if(shape == chip1shape || shape == chip2shape || shape == chip3shape || shape == chip4shape || shape == chip5shape || shape == chip6shape || shape == chip7shape || shape == chip8shape) {
			chipImInZone = true;
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'chip_render') {
				let chipRenderData = shape.getVariable('col.data');
				for(var i in chipsInStream) {
					let tempData = chipsInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == chipRenderData[0] && posData[1] == chipRenderData[1] && posData[2] == chipRenderData[2]) {
						if(chipsInStream[i] || chipsInStream[i] !== undefined) delete chipsInStream[i];
					}
					tempData = null;
				}
				chipsInStream = chipsInStream.filter(function (el) { return el != null; });
				
				chipRenderData = null;
				return null;
			}
		}
	}
	if(typeof(shape.id) != "undefined") {
		if(shape == chip1shape || shape == chip2shape || shape == chip3shape || shape == chip4shape || shape == chip5shape || shape == chip6shape || shape == chip7shape || shape == chip8shape) {
			chipImInZone = false;
			if(hud_browser) {
				if(tuningPanel) {
					hud_browser.execute('toggleTuningPanel(false);');
					mp.gui.cursor.visible = false;
					tuningPanel = false;
					
					restoreBinds();
				}
			}
		}
	}
});

mp.events.add({
	"playerEnterVehicle": (vehicle, seat) => {
		if(tuningPanel) {
			if(hud_browser) {
				hud_browser.execute('toggleTuningPanel(false);');
				mp.gui.cursor.visible = false;
				tuningPanel = false;
				
				restoreBinds();
			}
		}

		if(typeof(vehicle.getVariable("veh.handling")) !== "undefined" && typeof(vehicle.getVariable("veh.hash")) !== "undefined" && typeof(vehicle.getVariable("veh.job")) === "undefined") {
			let vehHash = vehicle.getVariable("veh.hash");
			
			let getHandling = require('./game_tuning/handlings.js');
			if(typeof(getHandling) !== "undefined") {
				if(typeof(getHandling.main[0][vehHash]) !== "undefined") {
					let handlingTable = JSON.parse(vehicle.getVariable("veh.handling"));
					
					let stockChip = getHandling.main[0][vehHash].HandlingData.Item;
					
					for(var k in handlingTable) {
						let isSet = false;
						if(k.toUpperCase() == "fInitialDriveMaxFlatVel".toUpperCase()) {
							handlingTable[k] = parseFloat(handlingTable[k]) / 3.6;
							isSet = true;
						}else if(k.toUpperCase() == "fSuspensionRaise".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < -0.05 || parseFloat(handlingTable[k]) > 0.3) handlingTable[k] = parseFloat(stockChip.fSuspensionRaise);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fSuspensionLowerLimit".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < -0.5 || parseFloat(handlingTable[k]) > 0.5) handlingTable[k] = parseFloat(stockChip.fSuspensionLowerLimit);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fSuspensionUpperLimit".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < -0.5 || parseFloat(handlingTable[k]) > 0.5) handlingTable[k] = parseFloat(stockChip.fSuspensionUpperLimit);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fSuspensionForce".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 1 || parseFloat(handlingTable[k]) > 4) handlingTable[k] = parseFloat(stockChip.fSuspensionForce);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fLowSpeedTractionLossMult".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0 || parseFloat(handlingTable[k]) > 1.5) handlingTable[k] = parseFloat(stockChip.fLowSpeedTractionLossMult);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fTractionSpringDeltaMax".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0.1 || parseFloat(handlingTable[k]) > 0.5) handlingTable[k] = parseFloat(stockChip.fTractionSpringDeltaMax);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fTractionCurveMin".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0.5 || parseFloat(handlingTable[k]) > 3.5) handlingTable[k] = parseFloat(stockChip.fTractionCurveMin);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fTractionCurveMax".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 1 || parseFloat(handlingTable[k]) > 4) handlingTable[k] = parseFloat(stockChip.fTractionCurveMax);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fHandBrakeForce".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0.01 || parseFloat(handlingTable[k]) > 2) handlingTable[k] = parseFloat(stockChip.fHandBrakeForce);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fBrakeForce".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0.01 || parseFloat(handlingTable[k]) > 2) handlingTable[k] = parseFloat(stockChip.fBrakeForce);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fDriveBiasFront".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0 || parseFloat(handlingTable[k]) > 1) handlingTable[k] = parseFloat(stockChip.fDriveBiasFront);
							handlingTable[k] = parseFloat(handlingTable[k]);
							isSet = true;
						}else if(k.toUpperCase() == "fBrakeBiasFront".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0 || parseFloat(handlingTable[k]) > 1) handlingTable[k] = parseFloat(stockChip.fBrakeBiasFront);
							handlingTable[k] = parseFloat(handlingTable[k]) * 2;
							isSet = true;
						}else if(k.toUpperCase() == "fSteeringLock".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 30 || parseFloat(handlingTable[k]) > 80) handlingTable[k] = parseFloat(stockChip.fSteeringLock);
							handlingTable[k] = parseFloat(handlingTable[k]) * 0.017453292;
							isSet = true;
						}else if(k.toUpperCase() == "fTractionCurveLateral".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 1 || parseFloat(handlingTable[k]) > 27) handlingTable[k] = parseFloat(stockChip.fTractionCurveLateral);
							handlingTable[k] = parseFloat(handlingTable[k]) * 0.017453292;
							isSet = true;
						}else if(k.toUpperCase() == "fTractionBiasFront".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0.2 || parseFloat(handlingTable[k]) > 0.5) handlingTable[k] = parseFloat(stockChip.fTractionBiasFront);
							handlingTable[k] = parseFloat(handlingTable[k]) * 2;
							isSet = true;
						}else if(k.toUpperCase() == "fSuspensionCompDamp".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0.5 || parseFloat(handlingTable[k]) > 2.5) handlingTable[k] = parseFloat(stockChip.fSuspensionCompDamp);
							handlingTable[k] = parseFloat(handlingTable[k]) / 10;
							isSet = true;
						}else if(k.toUpperCase() == "fSuspensionReboundDamp".toUpperCase()) {
							if(parseFloat(handlingTable[k]) < 0.5 || parseFloat(handlingTable[k]) > 2.5) handlingTable[k] = parseFloat(stockChip.fSuspensionReboundDamp);
							handlingTable[k] = parseFloat(handlingTable[k]) / 10;
							isSet = true;
						}else if(k.toUpperCase() == "fSuspensionBiasFront".toUpperCase()) {
							handlingTable[k] = parseFloat(handlingTable[k]) * 2;
							isSet = true;
						}else if(k.toUpperCase() == "fAntiRollBarBiasFront".toUpperCase()) {
							handlingTable[k] = parseFloat(handlingTable[k]) * 2;
							isSet = true;
						}
						//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * "+k+": "+handlingTable[k]+"</span>");
						if(isSet) vehicle.setHandling(k.toString(), handlingTable[k], true);
					}
				}
			}
			getHandling = null;
		}
	},
	"playerLeaveVehicle": (vehicle, seat) => {
		if(tuningPanel) {
			if(hud_browser) {
				hud_browser.execute('toggleTuningPanel(false);');
				mp.gui.cursor.visible = false;
				tuningPanel = false;
				
				restoreBinds();
			}
		}
	}
});

var tuningPanel = false;

mp.keys.bind(0x42, true, function() { // B Меню (Handling Editor)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x42)) return false;
	
	if(hud_browser) {
		if(tuningPanel) {
			hud_browser.execute('toggleTuningPanel(false);');
			mp.gui.cursor.visible = false;
			tuningPanel = false;
			
			restoreBinds();
		}else{
			if(afTuningPanel) return false;
			afTuningPanel = true;
			setTimeout(function() { afTuningPanel = false }, 500);
			
			if(!chipImInZone) return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Вы должны находится в боксе чип-тюнинг станции..</span>");
			if(vehSeat != -1) return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Вы должны быть за рулём.</span>");
			
			let vehicle = localPlayer.vehicle;
			if(vehicle) {
				if(typeof(vehicle.getVariable("veh.job")) !== "undefined" || typeof(vehicle.getVariable("veh.id")) === "undefined" || typeof(vehicle.getVariable("veh.tuning")) === "undefined" || typeof(vehicle.getVariable("veh.hash")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Транспорт не подготовлен для чип-тюнинга..</span>");
				
				let vehHash = vehicle.getVariable("veh.hash");
				let getHandling = require('./game_tuning/handlings.js');
				if(typeof(getHandling.main[0][vehHash].HandlingData.Item) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Транспорт не подготовлен для чип-тюнинга..</span>");
				
				if(vehicle.getVariable("veh.id")) {
					hud_browser.execute('toggleTuningPanel(true);');
					reloadChipTuningData();
					mp.gui.cursor.visible = true;
					tuningPanel = true;
					
					allowBinds = [0x42];
				}else{
					return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Транспорт не подготовлен для чип-тюнинга..</span>");
				}
			}
		}
	}
});

function reloadChipTuningData() {
	let vehicle = localPlayer.vehicle;
	if(vehicle && vehicle.getVariable("veh.id") && vehicle.getVariable("veh.tuning")) {
		let vehTuning = JSON.parse(vehicle.getVariable("veh.tuning"));
		vehTuning = {
			"engineStage": parseInt(vehTuning["11"] !== undefined ? vehTuning["11"] : -1),
			"gearboxStage": parseInt(vehTuning["13"] !== undefined ? vehTuning["13"] : -1),
			"brakeStage": parseInt(vehTuning["12"] !== undefined ? vehTuning["12"] : -1),
			"turboStage": parseInt(vehTuning["18"] !== undefined ? vehTuning["18"] : -1),
			"suspStage": parseInt(vehTuning["15"] !== undefined ? vehTuning["15"] : -1)
		}
		vehTuning = JSON.stringify(vehTuning);
		//chatAPI.sysPush("CHECKING");
		
		let vehName = "Транспорт";
		let stockChip = false;
		if(vehicle.getVariable("veh.hash")) {
			let vehHash = vehicle.getVariable("veh.hash");
			
			let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
			decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
			
			if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
			else vehName = vehHash;
			
			let getHandling = require('./game_tuning/handlings.js');
			stockChip = JSON.stringify(getHandling.main[0][vehHash].HandlingData.Item);
			//chatAPI.sysPush(" * : "+stockChip);
			getHandling = null;
		}
		
		let vehID = vehicle.getVariable("veh.id");
		let handlingTable = {};
		if(typeof(vehicle.getVariable("veh.handling")) !== "undefined") {
			handlingTable = JSON.parse(vehicle.getVariable("veh.handling"));
		
			/*
			for(var k in handlingTable) {
				if(k.toUpperCase() == "fInitialDriveMaxFlatVel".toUpperCase()) { handlingTable[k] = parseFloat(handlingTable[k]) * 3.6; }
				else if(k.toUpperCase() == "fBrakeBiasFront".toUpperCase()) { handlingTable[k] = parseFloat(handlingTable[k]) / 2; }
				else if(k.toUpperCase() == "fSteeringLock".toUpperCase()) {
					let tmpVal = parseFloat(handlingTable[k]);
					handlingTable[k] = tmpVal / 0.017453292; 
					handlingTable[k] = (tmpVal / handlingTable[k]) * handlingTable[k]; }
				else if(k.toUpperCase() == "fTractionCurveLateral".toUpperCase()) {
					let tmpVal = parseFloat(handlingTable[k]);
					handlingTable[k] = tmpVal / 0.017453292; 
					handlingTable[k] = (tmpVal / handlingTable[k]) * handlingTable[k]; }
				else if(k.toUpperCase() == "fTractionBiasFront".toUpperCase()) { handlingTable[k] = parseFloat(handlingTable[k]) / 2; }
				else if(k.toUpperCase() == "fSuspensionCompDamp".toUpperCase()) { handlingTable[k] = parseFloat(handlingTable[k]) * 10; }
				else if(k.toUpperCase() == "fSuspensionReboundDamp".toUpperCase()) { handlingTable[k] = parseFloat(handlingTable[k]) * 10; }
				else if(k.toUpperCase() == "fSuspensionBiasFront".toUpperCase()) { handlingTable[k] = parseFloat(handlingTable[k]) / 2; }
				else if(k.toUpperCase() == "fAntiRollBarBiasFront".toUpperCase()) { handlingTable[k] = parseFloat(handlingTable[k]) / 2; }
			}
			*/
		}
		
		let savedChips = JSON.stringify(mp.storage.data.chips);
		if(!savedChips) savedChips = false;
		
		//chatAPI.sysPush("GETTED: "+savedChips.toString());
		
		let sendTuningData = '[{"vehName":"'+vehName+'","vehID":"'+vehID+'","handling":'+JSON.stringify(handlingTable)+',"tuning":'+vehTuning+',"stchip":'+stockChip+',"saved":'+savedChips+'}]';
		//chatAPI.sysPush(sendTuningData);
		hud_browser.execute('sendTuningData(\''+sendTuningData+'\');');
	}else{
		hud_browser.execute('toggleTuningPanel(false);');
		mp.gui.cursor.visible = false;
		tuningPanel = false;
		restoreBinds();
	}
}

function closeChipTuning() {
	if(tuningPanel && hud_browser) {
		hud_browser.execute('toggleTuningPanel(false);');
		mp.gui.cursor.visible = false;
		tuningPanel = false;
		restoreBinds();
	}
}
mp.events.add("closeChipTuning", closeChipTuning);

function applyChipTuning(handlingTable) {
	if(typeof(handlingTable) !== "undefined") {
		let vehicle = localPlayer.vehicle;
		//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * NEW: "+handlingTable+"</span>");
		if(vehicle) {
			if(typeof(vehicle.getVariable("veh.job")) === "undefined") {
				let handlingTableToSave = handlingTable;
				handlingTable = JSON.parse(handlingTable);
				
				let stockChip = false;
				if(vehicle.getVariable("veh.hash")) {
					let vehHash = vehicle.getVariable("veh.hash");
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
					else vehName = vehHash;
					
					let getHandling = require('./game_tuning/handlings.js');
					stockChip = JSON.stringify(getHandling.main[0][vehHash].HandlingData.Item);
					//chatAPI.sysPush(" * : "+stockChip);
					getHandling = null;
				}
				
				for(var k in handlingTable) {
					let isSet = false;
					if(k.toUpperCase() == "fInitialDriveMaxFlatVel".toUpperCase()) {
						handlingTable[k] = parseFloat(handlingTable[k]) / 3.6;
						isSet = true;
					}else if(k.toUpperCase() == "fSuspensionRaise".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < -0.05 || parseFloat(handlingTable[k]) > 0.3) handlingTable[k] = parseFloat(stockChip.fSuspensionRaise);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fSuspensionLowerLimit".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < -0.5 || parseFloat(handlingTable[k]) > 0.5) handlingTable[k] = parseFloat(stockChip.fSuspensionLowerLimit);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fSuspensionUpperLimit".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < -0.5 || parseFloat(handlingTable[k]) > 0.5) handlingTable[k] = parseFloat(stockChip.fSuspensionUpperLimit);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fSuspensionForce".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 1 || parseFloat(handlingTable[k]) > 4) handlingTable[k] = parseFloat(stockChip.fSuspensionForce);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fLowSpeedTractionLossMult".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0 || parseFloat(handlingTable[k]) > 1.5) handlingTable[k] = parseFloat(stockChip.fLowSpeedTractionLossMult);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fTractionSpringDeltaMax".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0.1 || parseFloat(handlingTable[k]) > 0.5) handlingTable[k] = parseFloat(stockChip.fTractionSpringDeltaMax);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fTractionCurveMin".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0.5 || parseFloat(handlingTable[k]) > 3.5) handlingTable[k] = parseFloat(stockChip.fTractionCurveMin);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fTractionCurveMax".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 1 || parseFloat(handlingTable[k]) > 4) handlingTable[k] = parseFloat(stockChip.fTractionCurveMax);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fHandBrakeForce".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0.01 || parseFloat(handlingTable[k]) > 2) handlingTable[k] = parseFloat(stockChip.fHandBrakeForce);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fBrakeForce".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0.01 || parseFloat(handlingTable[k]) > 2) handlingTable[k] = parseFloat(stockChip.fBrakeForce);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fDriveBiasFront".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0 || parseFloat(handlingTable[k]) > 1) handlingTable[k] = parseFloat(stockChip.fDriveBiasFront);
						handlingTable[k] = parseFloat(handlingTable[k]);
						isSet = true;
					}else if(k.toUpperCase() == "fBrakeBiasFront".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0 || parseFloat(handlingTable[k]) > 1) handlingTable[k] = parseFloat(stockChip.fBrakeBiasFront);
						handlingTable[k] = parseFloat(handlingTable[k]) * 2;
						isSet = true;
					}else if(k.toUpperCase() == "fSteeringLock".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 30 || parseFloat(handlingTable[k]) > 80) handlingTable[k] = parseFloat(stockChip.fSteeringLock);
						handlingTable[k] = parseFloat(handlingTable[k]) * 0.017453292;
						isSet = true;
					}else if(k.toUpperCase() == "fTractionCurveLateral".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 1 || parseFloat(handlingTable[k]) > 27) handlingTable[k] = parseFloat(stockChip.fTractionCurveLateral);
						handlingTable[k] = parseFloat(handlingTable[k]) * 0.017453292;
						isSet = true;
					}else if(k.toUpperCase() == "fTractionBiasFront".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0.2 || parseFloat(handlingTable[k]) > 0.5) handlingTable[k] = parseFloat(stockChip.fTractionBiasFront);
						handlingTable[k] = parseFloat(handlingTable[k]) * 2;
						isSet = true;
					}else if(k.toUpperCase() == "fSuspensionCompDamp".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0.5 || parseFloat(handlingTable[k]) > 2.5) handlingTable[k] = parseFloat(stockChip.fSuspensionCompDamp);
						handlingTable[k] = parseFloat(handlingTable[k]) / 10;
						isSet = true;
					}else if(k.toUpperCase() == "fSuspensionReboundDamp".toUpperCase()) {
						if(parseFloat(handlingTable[k]) < 0.5 || parseFloat(handlingTable[k]) > 2.5) handlingTable[k] = parseFloat(stockChip.fSuspensionReboundDamp);
						handlingTable[k] = parseFloat(handlingTable[k]) / 10;
						isSet = true;
					}else if(k.toUpperCase() == "fSuspensionBiasFront".toUpperCase()) {
						handlingTable[k] = parseFloat(handlingTable[k]) * 2;
						isSet = true;
					}else if(k.toUpperCase() == "fAntiRollBarBiasFront".toUpperCase()) {
						handlingTable[k] = parseFloat(handlingTable[k]) * 2;
						isSet = true;
					}
					//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * "+k+": "+handlingTable[k]+"</span>");
					if(isSet) vehicle.setHandling(k.toString(), handlingTable[k], true);
				}
				handlingTable[k] = roundNumber(handlingTable[k], 5);
				//vehForApplyChip = {"id": vehicle.getVariable("veh.id"), "heading": vehicle.getHeading()};
				mp.events.callRemote('setVehHandling', vehicle, handlingTableToSave);
				//if(hud_browser) hud_browser.execute("hiddenAction('Загружаем настройки чип-тюнинга..');");
			}
		}
	}
}
mp.events.add("applyChipTuning", applyChipTuning);

function saveChipTuning(handlingTable, theVehName, chipName) {
	if(handlingTable && theVehName && chipName) {
		let vehicle = localPlayer.vehicle;
		if(vehicle) {
			handlingTable = JSON.parse(handlingTable);
			if(!mp.storage.data.chips) {
				mp.storage.data.chips = {};
				mp.storage.data.chips[chipName] = {theVehName, handlingTable};
			}else{
				mp.storage.data.chips[chipName] = {theVehName, handlingTable};
			}
			mp.events.callRemote('updateStorage', JSON.stringify(mp.storage.data));
		}
		reloadChipTuningData();
	}
}
mp.events.add("saveChipTuning", saveChipTuning);

function deleteChipTuning(chipName) {
	if(chipName) {
		if(mp.storage.data.chips) {
			let chips = mp.storage.data.chips;
			for(var k in chips) {
				if(k == chipName) delete mp.storage.data.chips[chipName];
			}
			mp.events.callRemote('updateStorage', JSON.stringify(mp.storage.data));
		}
	}
}
mp.events.add("deleteChipTuning", deleteChipTuning);
}̦