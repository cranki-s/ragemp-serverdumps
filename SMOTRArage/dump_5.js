{
var vehsInStream = 0;

mp.discord.update('SMOTRArage', 'smotrarage.ru');

// Houses Sync

mp.events.addDataHandler("col.data", function (entity, value) {
	if(entity.type == 'colshape' && entity.handle != 0) {
		if(entity.getVariable("col.type") == "house_render") {
			// Удаляем визуал дома
			
			let houseData = value;
			
			if(typeof(houseData) !== "undefined") {
				if(typeof(housesInStream[houseData.id]) !== "undefined") {
					let tempData = housesInStream[houseData.id];
					let tempMarker = mp.markers.at(parseInt(tempData['marker']));
					if(mp.markers.exists(tempMarker)) tempMarker.destroy();
					let tempCheck = mp.checkpoints.at(parseInt(tempData['check']));
					if(mp.checkpoints.exists(tempCheck)) tempCheck.destroy();
					if(tempData['blip'] != "false") {
						let tempBlip = mp.blips.at(parseInt(tempData['blip']));
						if(mp.blips.exists(tempBlip)) tempBlip.destroy();
					}
					housesInStream[houseData.id] = undefined;
					housesInStream = JSON.parse(JSON.stringify(housesInStream));
					
					// Пересоздаем визуал дома
					
					if(typeof(houseData.name) === "undefined") {
						let markerColor = [46, 204, 113, 185];
						if(houseData.own > 0) markerColor = [225, 59, 59, 185];
						if(houseData.own == localPlayer.getVariable('player.id')) markerColor = [240, 203, 88, 185];
						let houseMarker = mp.markers.new(20, new mp.Vector3(parseFloat(houseData.pos[0]), parseFloat(houseData.pos[1]), parseFloat(houseData.pos[2])-0.2), 1.2,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 180, 0),
							color: markerColor,
							visible: true,
							dimension: 0
						});
						
						let houseCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(houseData.pos.x), parseFloat(houseData.pos.y), parseFloat(houseData.pos.z)-0.2), 0.5,
						{
							color: [255, 255, 255, 0],
							visible: true,
							dimension: localPlayer.dimension
						});
						houseCheck.houseData = houseData;
						
						let houseBlip = false;
						let houseName = "жилое имущество";
						let blipColor = 2;
						if(houseData.own > 0) {
							blipColor = 1;
							houseName = "жилое имущество";
						}
						if(parseInt(houseData.own) != parseInt(localPlayer.getVariable('player.id'))) {
							houseBlip = mp.blips.new(40, new mp.Vector3(parseFloat(houseData.pos.x), parseFloat(houseData.pos.y), parseFloat(houseData.pos.z)), {
								name: houseName,
								scale: 0.8,
								color: blipColor,
								shortRange: true,
								dimension: 0
							});
							if(blipColor != 2) houseBlip.setCategory(11);
						}
						
						if(houseBlip) housesInStream[houseData.id] = {'data':houseData,'marker':houseMarker,'check':houseCheck,'blip':houseBlip,'alpha': 0};
					}else{
						let houseMarker = mp.markers.new(20, new mp.Vector3(parseFloat(houseData.pos.x), parseFloat(houseData.pos.y), parseFloat(houseData.pos.z)-0.2), 1.2,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 180, 0),
							color: [223, 138, 48, 185],
							visible: true,
							dimension: 0
						});
						
						let houseCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(houseData.pos.x), parseFloat(houseData.pos.y), parseFloat(houseData.pos.z)-0.2), 0.5,
						{
							color: [255, 255, 255, 0],
							visible: true,
							dimension: localPlayer.dimension
						});
						houseCheck.houseData = houseData;
						
						housesInStream[houseData.id] = {'data': houseData,'marker': houseMarker.id.toString(),'check': houseCheck.id.toString(),'alpha': 0};
					}
				}else{
					if(typeof(houseData.id) !== "undefined") {
						if(typeof(houseData.name) !== "undefined") {
							if(typeof(housesInStream) !== "undefined") {
								if(housesInStream) {
									if(typeof(housesInStream[houseData.id]) !== "undefined") {
										if(typeof(housesInStream[houseData.id].data) !== "undefined") housesInStream[houseData.id].data = houseData;
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

mp.events.addDataHandler("player.houses", function (entity, value) {
	if(entity == localPlayer) {
		if(typeof(myHousesBlips) !== "undefined") {
			for(var i in myHousesBlips) {
				let tempData = myHousesBlips[i];
				if(tempData['id']) {
					if(tempData['blip']) {
						tempData['blip'].destroy();
						delete tempData['blip'];
					}
					if(myHousesBlips[i] || myHousesBlips[i] !== undefined) {
						delete myHousesBlips[i];
					}
				}
				tempData = null;
			}
			myHousesBlips = [];
			
			for (var k in value.houses) {
				let houseData = value.houses[k];
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Data: "+JSON.stringify(houseData)+"</span>");
				houseData.pos = explode(",", houseData.pos);
				
				let houseBlip = mp.blips.new(40, new mp.Vector3(parseFloat(houseData.pos[0]), parseFloat(houseData.pos[1]), parseFloat(houseData.pos[2])),
				{
					name: "жилое имущество ID "+houseData.id,
					scale: 0.8,
					color: 5,
					shortRange: false,
					dimension: 0
				});
				houseBlip.setCategory(10);
				
				let houseArray = {'id': houseData.id, 'blip': houseBlip};
				myHousesBlips.push(houseArray);
			}
			if(value.houses) chatAPI.notifyPush("В Вашем владении жилых имуществ: <span style=\"color:#FEBC00\"><b>"+value.count+"</b></span>");
			else chatAPI.notifyPush("В Вашем владении жилых имуществ: <span style=\"color:#FEBC00\"><b>0</b></span>");
		}
	}
});

mp.events.addDataHandler("player.businesses", function (entity, value) {
	if(entity == localPlayer) {
		if(typeof(myBusinessesBlips) !== "undefined") {
			for(var i in myBusinessesBlips) {
				let tempData = myBusinessesBlips[i];
				if(tempData['id']) {
					if(tempData['blip']) {
						tempData['blip'].destroy();
						delete tempData['blip'];
					}
					if(myBusinessesBlips[i] || myBusinessesBlips[i] !== undefined) {
						delete myBusinessesBlips[i];
					}
				}
				tempData = null;
			}
			myBusinessesBlips = [];
			
			for (var k in value.businesses) {
				let businessData = value.businesses[k];
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Data: "+JSON.stringify(businessData)+"</span>");
				businessData.pos = explode(",", businessData.pos);
				
				let businessBlip = mp.blips.new(375, new mp.Vector3(parseFloat(businessData.pos[0]), parseFloat(businessData.pos[1]), parseFloat(businessData.pos[2])),
				{
					name: "коммерция ID "+businessData.id,
					scale: 0.8,
					color: 5,
					shortRange: false,
					dimension: 0
				});
				businessBlip.setCategory(10);
				
				let businessArray = {'id': businessData.id, 'blip': businessBlip};
				myBusinessesBlips.push(businessArray);
			}
			if(value.businesses) chatAPI.notifyPush("В Вашем владении малых бизнесов: <span style=\"color:#FEBC00\"><b>"+value.count+"</b></span>");
			else chatAPI.notifyPush("В Вашем владении малых бизнесов: <span style=\"color:#FEBC00\"><b>0</b></span>");
		}
	}
});

mp.events.addDataHandler("player.money", function (entity, value) {
	if(entity && value) {
		if(entity == localPlayer) {
			if(value < -10000) return mp.events.callRemote('banAct', localPlayer, 9999, "banYears", "Минусовой баланс (нал)", "true", "true", "true");
		}
	}
});
mp.events.addDataHandler("player.bank", function (entity, value) {
	if(entity && value) {
		if(entity == localPlayer) {
			if(value < 0) return mp.events.callRemote('banAct', localPlayer, 9999, "banYears", "Минусовой баланс (банк)", "true", "true", "true");
		}
	}
});
mp.events.addDataHandler("player.donate", function (entity, value) {
	if(entity && value) {
		if(entity == localPlayer) {
			if(value < 0) return mp.events.callRemote('banAct', localPlayer, 9999, "banYears", "Минусовой баланс (донат)", "true", "true", "true");
		}
	}
});

// Veh Sync

mp.keys.bind(0x4E, true, function() { // N Key
    if(localPlayer.vehicle){
		if(vehSeat != -1) return false;
		if(!allowBinds || !Array.isArray(allowBinds)) return false;
		if(!allowBinds.includes(0x4E)) return false;
		
        if(localPlayer.vehicle.hood){
            localPlayer.vehicle.hood = false;
            localPlayer.vehicle.setDoorShut(0, true);
			localPlayer.vehicle.setDoorShut(1, true);
			localPlayer.vehicle.setDoorShut(2, true);
			localPlayer.vehicle.setDoorShut(3, true);
			localPlayer.vehicle.setDoorShut(4, true);
			localPlayer.vehicle.setDoorShut(5, true);
			localPlayer.vehicle.setDoorShut(6, true);
			localPlayer.vehicle.setDoorShut(7, true);
			localPlayer.vehicle.rollUpWindow(0);
			localPlayer.vehicle.rollUpWindow(1);
			localPlayer.vehicle.rollUpWindow(2);
			localPlayer.vehicle.rollUpWindow(3);
        }else{
            localPlayer.vehicle.hood = true;
            localPlayer.vehicle.setDoorOpen(0, false, false);
			localPlayer.vehicle.setDoorOpen(1, false, false);
			localPlayer.vehicle.setDoorOpen(2, false, false);
			localPlayer.vehicle.setDoorOpen(3, false, false);
			localPlayer.vehicle.setDoorOpen(4, false, false);
			localPlayer.vehicle.setDoorOpen(5, false, false);
			localPlayer.vehicle.setDoorOpen(6, false, false);
			localPlayer.vehicle.setDoorOpen(7, false, false);
			localPlayer.vehicle.rollDownWindow(0);
			localPlayer.vehicle.rollDownWindow(1);
			localPlayer.vehicle.rollDownWindow(2);
			localPlayer.vehicle.rollDownWindow(3);
        }
    }
});

mp.events.addDataHandler('veh.num', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && value && entity.handle != 0) {
		let vehClass = entity.getClass().toString();
		if(vehClass != "15") {
			if(value != "theMoto") {
				if(parseInt(entity.isExtraTurnedOn(5)) != 1) entity.setExtra(5, 0);
				if(parseInt(entity.isExtraTurnedOn(6)) != 1) entity.setExtra(6, 0);
				let num = value.toString();
				num = num.split("|").join("");
				num = num.split(" ").join("");
				entity.setNumberPlateText(num);
				entity.numberPlateType = 4;
				entity.setNumberPlateTextIndex(4);
			}else{
				if(parseInt(entity.isExtraTurnedOn(5)) == 1) entity.setExtra(5, -1);
				if(parseInt(entity.isExtraTurnedOn(6)) == 1) entity.setExtra(6, -1);
				entity.setNumberPlateText("SMOTRA");
			}
		}else{
			// Номера
			if(parseInt(entity.isExtraTurnedOn(5)) != 1) entity.setExtra(5, 0);
			if(parseInt(entity.isExtraTurnedOn(6)) != 1) entity.setExtra(6, 0);
			let num = value.toString();
			num = str_replace_all(num, "-", "Z");
			entity.setNumberPlateText(num);
			entity.numberPlateType = 4;
			entity.setNumberPlateTextIndex(4);
		}
	}
});

mp.events.addDataHandler('vehicle.flashturns', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && entity.handle != 0) {
		if(typeof(value.left) !== "undefined" && typeof(value.right) !== "undefined") {
			if(value.left) entity.setIndicatorLights(1, true);
			else entity.setIndicatorLights(1, false);
			if(value.right) entity.setIndicatorLights(0, true);
			else entity.setIndicatorLights(0, false);
		}
	}
});

mp.events.addDataHandler('veh.params', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && entity.handle != 0) {
		//chatAPI.sysPush("<span style=\"color:#FF6146;\"> JSONIO: "+value+"</span>");
		value = JSON.parse(value);
		let entityClass = entity.getClass();
		if(value["tint"] !== undefined) entity.setWindowTint(parseInt(value["tint"]));
		if(typeof(value["lock"]) !== "undefined") {
			if(value["lock"]) {
				entity.setAlarm(true);
				entity.setDoorsLockedForAllPlayers(true);
				entity.setDoorsLocked(2);
			}else{
				entity.setAlarm(false);
				entity.setDoorsLockedForAllPlayers(false);
				entity.setDoorsLocked(1);
			}
			//chatAPI.sysPush("<span style=\"color:#FF6146;\"> "+value["lock"]+" | "+entity.getDoorLockStatus()+"</span>");
		}
		if(typeof(value["neon"]) !== "undefined") {
			let vehNeon = explode(",", value["neon"]);
			if(parseInt(vehNeon[1]) == 0) {
				entity.setNeonLightEnabled(0, false);
				entity.setNeonLightEnabled(1, false);
				entity.setNeonLightEnabled(2, false);
				entity.setNeonLightEnabled(3, false);
			}else{
				entity.setNeonLightsColour(parseInt(vehNeon[2]), parseInt(vehNeon[3]), parseInt(vehNeon[4]));
				if(parseInt(vehNeon[0]) == 1) {
					entity.setNeonLightEnabled(0, true);
					entity.setNeonLightEnabled(1, true);
				}else if(parseInt(vehNeon[0]) == 2) {
					entity.setNeonLightEnabled(2, true);
					entity.setNeonLightEnabled(3, true);
				}else if(parseInt(vehNeon[0]) == 3) {
					entity.setNeonLightEnabled(0, true);
					entity.setNeonLightEnabled(1, true);
					entity.setNeonLightEnabled(2, true);
					entity.setNeonLightEnabled(3, true);
				}
			}
		}
		if(typeof(value["livery"]) !== "undefined") {
			let vehLivery = parseInt(value["livery"]);
			if(vehLivery < 0) {
				entity.setLivery(0);
				entity.setMod(48, -1);
			}else{
				entity.setLivery(vehLivery+1);
				entity.setMod(48, vehLivery);
			}
		}else{
			entity.setLivery(0);
			entity.setMod(48, -1);
		}
		if(value["tyresCanBurst"] !== undefined) {
			let tyresCanBurst = parseInt(value["tyresCanBurst"]);
			if(tyresCanBurst == 0) entity.setTyresCanBurst(true);
			else entity.setTyresCanBurst(false);
		}else{
			entity.setTyresCanBurst(true);
		}
	}
});

mp.events.addDataHandler('vehicle.engine', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && entity.handle != 0) {
		if(value) entity.setEngineOn(true, true, true);
		else entity.setEngineOn(false, true, true);
		mp.game.audio.setRadioToStationName("OFF");
		mp.game.invoke("0x1B9C0099CB942AC6", entity, "OFF");
		mp.game.invoke("0xF7F26C6E9CC9EBB8", !0); // SET_FRONTEND_RADIO_ACTIVE
		mp.game.invoke("0xF7F26C6E9CC9EBB8", false); // SET_FRONTEND_RADIO_ACTIVE
	}
});

mp.events.addDataHandler('vehicle.lights', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && entity.handle != 0) {
		if(value) {
			//chatAPI.warningPush(value);
			switch(value) {
				case 1:
					entity.setLights(value);
					entity.setLightMultiplier(0.0);
					entity.setFullbeam(false);
					break;
				case 2:
					entity.setLights(value);
					entity.setLightMultiplier(0.0);
					entity.setFullbeam(false);
					break;
				case 3:
					entity.setLights(value);
					entity.setLightMultiplier(0.5);
					entity.setFullbeam(false);
					break;
				case 4:
					entity.setLights(3);
					entity.setLightMultiplier(0.5);
					entity.setFullbeam(true);
					break;
			}
		}
	}
});

function syncD3Vehicle(entity) {
	if(entity && entity.handle != 0) {
		//entity.setEngineOn(true, true, true);
		
		let entityClass = entity.getClass();
		
		//entity.setLights(2);
		//entity.setLightMultiplier(0.5);
		//entity.setFullbeam(false);
		
		entity.freezePosition(false);
		entity.position = new mp.Vector3(entity.d3Veh.x,entity.d3Veh.y,entity.d3Veh.z);
		
		let vehColors = JSON.parse(entity.d3Veh.colors);
		
		if(vehColors["color1"] !== undefined) {
			let vehColor1 = explode(",", vehColors["color1"]);
			entity.setCustomPrimaryColour(parseInt(vehColor1[0]), parseInt(vehColor1[1]), parseInt(vehColor1[2]));
		}
		
		if(vehColors["color2"] !== undefined) {
			let vehColor2 = explode(",", vehColors["color2"]);
			entity.setCustomSecondaryColour(parseInt(vehColor2[0]), parseInt(vehColor2[1]), parseInt(vehColor2[2]));
		}
		
		if(vehColors["tyre"] !== undefined) {
			entity.toggleMod(20, true);
			let vehColorTyre = explode(",", vehColors["tyre"]);
			if(parseInt(vehColorTyre[0]) == 0 && parseInt(vehColorTyre[1]) == 0 && parseInt(vehColorTyre[2]) == 0) vehColorTyre[0] = 1, vehColorTyre[1] = 1, vehColorTyre[2] = 1;
			entity.setTyreSmokeColor(parseInt(vehColorTyre[0]), parseInt(vehColorTyre[1]), parseInt(vehColorTyre[2]));
		}
		
		entity.setColours(parseInt(vehColors["material"]), parseInt(vehColors["material"]));
		if(typeof(vehColors["pearl"]) === "undefined") vehColors["pearl"] = "-1";
		if(typeof(vehColors["wheels"]) === "undefined") vehColors["wheels"] = 0;
		entity.setExtraColours(parseInt(vehColors["pearl"]), parseInt(vehColors["wheels"]));
		mp.game.invoke("0x2036F561ADD12E33", entity.handle, parseInt(vehColors["pearl"]), parseInt(vehColors["wheels"]));
		
		let tempTuning = JSON.parse(entity.d3Veh.tuning);
		for (var k in tempTuning) {
			entity.setMod(parseInt(k), parseInt(tempTuning[k]));
		}
		
		let vehParams = JSON.parse(entity.d3Veh.params);
		if(vehParams["tint"] !== undefined) entity.setWindowTint(parseInt(vehParams["tint"]));
		if(typeof(vehParams["lock"]) !== "undefined") {
			if(vehParams["lock"]) {
				entity.setAlarm(true);
				entity.setDoorsLockedForAllPlayers(true);
				entity.setDoorsLocked(2);
			}else{
				entity.setAlarm(false);
				entity.setDoorsLockedForAllPlayers(false);
				entity.setDoorsLocked(1);
			}
			//chatAPI.sysPush("<span style=\"color:#FF6146;\"> ST "+vehParams["lock"]+" | "+entity.getDoorLockStatus()+"</span>");
		}
		if(typeof(vehParams["neon"]) !== "undefined") {
			let vehNeon = explode(",", vehParams["neon"]);
			if(parseInt(vehNeon[1]) == 0) {
				entity.setNeonLightEnabled(0, false);
				entity.setNeonLightEnabled(1, false);
				entity.setNeonLightEnabled(2, false);
				entity.setNeonLightEnabled(3, false);
			}else{
				entity.setNeonLightsColour(parseInt(vehNeon[2]), parseInt(vehNeon[3]), parseInt(vehNeon[4]));
				if(parseInt(vehNeon[0]) == 1) {
					entity.setNeonLightEnabled(0, true);
					entity.setNeonLightEnabled(1, true);
				}else if(parseInt(vehNeon[0]) == 2) {
					entity.setNeonLightEnabled(2, true);
					entity.setNeonLightEnabled(3, true);
				}else if(parseInt(vehNeon[0]) == 3) {
					entity.setNeonLightEnabled(0, true);
					entity.setNeonLightEnabled(1, true);
					entity.setNeonLightEnabled(2, true);
					entity.setNeonLightEnabled(3, true);
				}
			}
		}
		if(typeof(vehParams["livery"]) !== "undefined") {
			let vehLivery = parseInt(vehParams["livery"]);
			entity.setLivery(vehLivery+1);
			entity.setMod(48, vehLivery);
		}else{
			entity.setLivery(0);
			entity.setMod(48, -1);
		}
		if(vehParams["tyresCanBurst"] !== undefined) {
			let tyresCanBurst = parseInt(vehParams["tyresCanBurst"]);
			if(tyresCanBurst == 0) entity.setTyresCanBurst(true);
			else entity.setTyresCanBurst(false);
		}else{
			entity.setTyresCanBurst(true);
		}
		
		entity.setExtra(1, 1);
		entity.setExtra(2, 1);
		entity.setExtra(3, 1);
		entity.setExtra(4, 1);
			
		if(parseInt(entity.isExtraTurnedOn(5)) != 1 && entity.d3Veh.number) entity.setExtra(5, 0);
		else entity.setExtra(5, 1);
		if(parseInt(entity.isExtraTurnedOn(6)) != 1 && entity.d3Veh.number) entity.setExtra(6, 0);
		else entity.setExtra(6, 1);
		let num = entity.d3Veh.number.toString();
		num = num.split("|").join("");
		num = num.split(" ").join("");
		entity.setNumberPlateText(num);
		entity.numberPlateType = 4;
		entity.setNumberPlateTextIndex(4);
		
		setTimeout(() => {
			if(mp.vehicles.exists(entity)) {
				if(entity && entity.handle != 0) entity.freezePosition(true);
			}
		}, 2500);
	}
}

function syncContainer(entity) {
	if(entity && entity.handle != 0) {
		entity.freezePosition(false);
		entity.position = entity.isContainer.pos;
		setTimeout(() => {
			if(mp.vehicles.exists(entity)) {
				if(entity && entity.handle != 0) {
					if(!entity.isContent) entity.position = entity.isContainer.pos;
					entity.setHeading(entity.isContainer.heading);
					entity.freezePosition(true);
				}
			}
		}, 2500);
	}
}

/*
mp.events.addDataHandler('veh.hash', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && entity.handle != 0) {
		if(value) {
			let vehHash = value;
			if(typeof(entity.getVariable("veh.job")) !== "undefined") {
				if(vehHash == "mb_actros" || vehHash == "v_vnl" || vehHash == "mb_arocs") noColVehs[entity.handle.toString()] = 1;
			}
		}
	}
});
*/

var finishTheftPoint = {};

mp.events.addDataHandler('veh.theft', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle') {
		if(!value && entity.handle != 0) {
			if(typeof(entity.theftBlip) === "undefined") {
				let vehBlip = mp.blips.new(225, new mp.Vector3(entity.position.x, entity.position.y, entity.position.z),
				{
					name: "Транспорт, который можно угнать",
					scale: 0.7,
					color: 55,
					shortRange: true,
					dimension: 0
				});
				entity.theftBlip = vehBlip;
			}
			
			entity.setProofs(true, true, true, true, true, true, true, true);
			/*entity.setOnGroundProperly();
			entity.freezePosition(true);
			entity.setOnGroundProperly();*/
		}else{
			if(typeof(entity.theftBlip) !== "undefined") {
				if(mp.blips.exists(entity.theftBlip)) {
					entity.theftBlip.destroy();
					entity.theftBlip = undefined;
					if(entity.handle != 0) {
						//entity.freezePosition(false);
						entity.setProofs(true, true, true, false, false, false, false, false);
					}
					if(localPlayer.vehicle) {
						if(localPlayer.vehicle == entity) {
							if(typeof(value.blip) !== "undefined") {
								if(mp.blips.exists(mp.blips.atRemoteId(value.blip))) mp.blips.atRemoteId(value.blip).setAlpha(0);
							}
						}
					}
				}
			}
		}
	}
});

var finishGrabTruckPoint = {};

mp.events.addDataHandler('veh.grabTruck', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle') {
		if(!value && entity.handle != 0) {
			if(typeof(entity.grabTruckBlip) === "undefined") {
				let vehBlip = mp.blips.new(477, new mp.Vector3(entity.position.x, entity.position.y, entity.position.z),
				{
					name: "Грузовик с лутом",
					scale: 0.7,
					color: 55,
					shortRange: true,
					dimension: 0
				});
				entity.grabTruckBlip = vehBlip;
			}
			
			entity.setProofs(true, true, true, true, true, true, true, true);
		}else{
			if(entity.handle != 0) entity.setProofs(true, true, true, false, false, false, false, false);
			if(typeof(entity.grabTruckBlip) !== "undefined") {
				if(mp.blips.exists(entity.grabTruckBlip)) {
					entity.grabTruckBlip.destroy();
					entity.grabTruckBlip = undefined;
					if(localPlayer.vehicle) {
						if(localPlayer.vehicle == entity) {
							if(typeof(value.blip) !== "undefined") {
								if(mp.blips.exists(mp.blips.atRemoteId(value.blip))) mp.blips.atRemoteId(value.blip).setAlpha(0);
							}
							let theVeh = localPlayer.vehicle;
							if(typeof(finishGrabTruckPoint.blip) === "undefined") {
								let grabTruckTempData = value;
								
								if(typeof(grabTruckTempData.blip) !== "undefined") {
									if(mp.blips.exists(mp.blips.atRemoteId(grabTruckTempData.blip))) mp.blips.atRemoteId(grabTruckTempData.blip).setAlpha(0);
								}
								
								finishGrabTruckPoint["blip"] = mp.blips.new(626, new mp.Vector3(parseFloat(grabTruckTempData.finish.x), parseFloat(grabTruckTempData.finish.y), parseFloat(grabTruckTempData.finish.z)), {
									name: "Точка доставки грузовика со стаффом",
									scale: 0.8,
									color: 1,
									shortRange: false,
									dimension: 0
								});
								finishGrabTruckPoint.blip.setRoute(true);
								finishGrabTruckPoint.blip.setRouteColour(1);
								
								vehParkMarkers = [{"position":new mp.Vector3(parseFloat(grabTruckTempData.finish.x),parseFloat(grabTruckTempData.finish.y),parseFloat(grabTruckTempData.finish.z)-2.3),"heading":parseFloat(grabTruckTempData.finish.heading),"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(parseFloat(grabTruckTempData.finish.heading)),"width":3,"height":14}], parkingVeh = theVeh, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
								if(typeof(trailersPool) !== "undefined") {
									if(typeof(trailersPool[theVeh.handle.toString()]) !== "undefined") {
										if(typeof(trailersPool[theVeh.handle.toString()].trailer) !== "undefined") {
											let tempTrailer = trailersPool[theVeh.handle.toString()].trailer;
											if(mp.vehicles.exists(tempTrailer) && mp.vehicles.exists(theVeh)) parkingVeh = tempTrailer;
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

function reSyncVehicle(entity) {
	if(entity && entity.handle != 0) {
		let vehClass = entity.getClass().toString();
		entity.setHandling("FDEFORMATIONDAMAGEMULT", 0.7); // Разрушаемость кузовов
		entity.setDisablePetrolTankDamage(false);
		
		if(mp.storage.data.settings) {
			if(typeof(mp.storage.data.settings) !== "undefined") {
				let deforms = "Stock";
				if(mp.storage.data.settings.deforms) {
					if(typeof(mp.storage.data.settings.deforms) !== "undefined") {
						deforms = mp.storage.data.settings.deforms;
					}
				}
				if(deforms == "Stock") entity.setHandling("FDEFORMATIONDAMAGEMULT", 0.7);
				else if(deforms == "Middle") entity.setHandling("FDEFORMATIONDAMAGEMULT", 3.5);
				else if(deforms == "Hard") entity.setHandling("FDEFORMATIONDAMAGEMULT", 6.5);
				else if(deforms == "BEAMng") entity.setHandling("FDEFORMATIONDAMAGEMULT", 9.9);
			}
		}
		
		entity.setDirtLevel(0);
		
		/*
		if(typeof(entity.getVariable("veh.job")) !== "undefined") {
			if(typeof(entity.getVariable("veh.hash")) !== "undefined") {
				let vehHash = entity.getVariable("veh.hash");
				if(vehHash == "mb_actros" || vehHash == "v_vnl" || vehHash == "mb_arocs") noColVehs[entity.handle.toString()] = 1;
			}
		}
		*/
		
		if(typeof(entity.getVariable("veh.theft")) !== "undefined") {
			if(!entity.getVariable("veh.theft")) {
				if(typeof(entity.theftBlip) === "undefined") {
					let vehBlip = mp.blips.new(225, new mp.Vector3(entity.position.x, entity.position.y, entity.position.z),
					{
						name: "Транспорт, который можно угнать",
						scale: 0.7,
						color: 55,
						shortRange: true,
						dimension: 0
					});
					entity.theftBlip = vehBlip;
				}
				
				entity.setProofs(true, true, true, true, true, true, true, true);
				/*entity.setOnGroundProperly();
				entity.freezePosition(true);
				entity.setOnGroundProperly();*/
			}else{
				//entity.freezePosition(false);
				entity.setProofs(true, true, true, false, false, false, false, false);
			}
		}
		
		if(typeof(entity.getVariable("veh.grabTruck")) !== "undefined") {
			if(!entity.getVariable("veh.grabTruck")) {
				if(typeof(entity.theftBlip) === "undefined") {
					let vehBlip = mp.blips.new(477, new mp.Vector3(entity.position.x, entity.position.y, entity.position.z),
					{
						name: "Грузовик с лутом",
						scale: 0.7,
						color: 55,
						shortRange: true,
						dimension: 0
					});
					entity.grabTruckBlip = vehBlip;
				}
				
				entity.setProofs(true, true, true, true, true, true, true, true);
			}else{
				entity.setProofs(true, true, true, false, false, false, false, false);
			}
		}
		
		if(typeof(entity.getVariable("vehicle.sale")) !== "undefined") {
			//entity.freezePosition(true);
			entity.setProofs(true, true, true, true, true, true, true, true);
			entity.setOnGroundProperly();
			entity.freezePosition(true);
			entity.setOnGroundProperly();
		}
		
		if(vehClass != "15") {
			if(typeof(entity.tyagach) === "undefined" && typeof(entity.imTrailerData) === "undefined") {
				entity.setExtra(1, 1);
				entity.setExtra(2, 1);
				entity.setExtra(3, 1);
				entity.setExtra(4, 1);
			}
		
			// Номера
			if(typeof(entity.getVariable("veh.num")) !== "undefined") {
				if(entity.getVariable("veh.num") != "theMoto") {
					if(parseInt(entity.isExtraTurnedOn(5)) != 1) entity.setExtra(5, 0);
					if(parseInt(entity.isExtraTurnedOn(6)) != 1) entity.setExtra(6, 0);
					let num = entity.getVariable("veh.num").toString();
					num = num.split("|").join("");
					num = num.split(" ").join("");
					entity.setNumberPlateText(num);
					entity.numberPlateType = 4;
					entity.setNumberPlateTextIndex(4);
				}else{
					if(parseInt(entity.isExtraTurnedOn(5)) == 1) entity.setExtra(5, -1);
					if(parseInt(entity.isExtraTurnedOn(6)) == 1) entity.setExtra(6, -1);
					entity.setNumberPlateText("SMOTRA");
				}
			}
		}else{
			// Номера
			if(typeof(entity.getVariable("veh.num")) !== "undefined") {
				if(entity.getVariable("veh.num") != "theMoto") {
					if(parseInt(entity.isExtraTurnedOn(5)) != 1) entity.setExtra(5, 0);
					if(parseInt(entity.isExtraTurnedOn(6)) != 1) entity.setExtra(6, 0);
					let num = entity.getVariable("veh.num").toString();
					num = str_replace_all(num, "-", "Z");
					entity.setNumberPlateText(num);
					entity.numberPlateType = 4;
					entity.setNumberPlateTextIndex(4);
				}
			}
		}
	
		// Поворотники
		
		if(typeof(entity.getVariable("vehicle.flashturns")) !== "undefined") {
			let flashturns = entity.getVariable("vehicle.flashturns");
			if(typeof(flashturns.left) !== "undefined" && typeof(flashturns.right) !== "undefined") {
				if(flashturns.left) entity.setIndicatorLights(1, true);
				else entity.setIndicatorLights(1, false);
				if(flashturns.right) entity.setIndicatorLights(0, true);
				else entity.setIndicatorLights(0, false);
			}
		}
		
		// Тонировка, центральный замок, неон, шины (пулестойкие)
		if(typeof(entity.getVariable("veh.params")) !== "undefined") {
			let vehParams = JSON.parse(entity.getVariable("veh.params"));
			if(vehParams["tint"] !== undefined) entity.setWindowTint(parseInt(vehParams["tint"]));
			if(typeof(vehParams["lock"]) !== "undefined") {
				if(vehParams["lock"]) {
					entity.setAlarm(true);
					entity.setDoorsLockedForAllPlayers(true);
					entity.setDoorsLocked(2);
				}else{
					entity.setAlarm(false);
					entity.setDoorsLockedForAllPlayers(false);
					entity.setDoorsLocked(1);
				}
				//chatAPI.sysPush("<span style=\"color:#FF6146;\"> ST "+vehParams["lock"]+" | "+entity.getDoorLockStatus()+"</span>");
			}
			if(typeof(vehParams["neon"]) !== "undefined") {
				let vehNeon = explode(",", vehParams["neon"]);
				if(parseInt(vehNeon[1]) == 0) {
					entity.setNeonLightEnabled(0, false);
					entity.setNeonLightEnabled(1, false);
					entity.setNeonLightEnabled(2, false);
					entity.setNeonLightEnabled(3, false);
				}else{
					entity.setNeonLightsColour(parseInt(vehNeon[2]), parseInt(vehNeon[3]), parseInt(vehNeon[4]));
					if(parseInt(vehNeon[0]) == 1) {
						entity.setNeonLightEnabled(0, true);
						entity.setNeonLightEnabled(1, true);
					}else if(parseInt(vehNeon[0]) == 2) {
						entity.setNeonLightEnabled(2, true);
						entity.setNeonLightEnabled(3, true);
					}else if(parseInt(vehNeon[0]) == 3) {
						entity.setNeonLightEnabled(0, true);
						entity.setNeonLightEnabled(1, true);
						entity.setNeonLightEnabled(2, true);
						entity.setNeonLightEnabled(3, true);
					}
				}
			}
			if(typeof(vehParams["livery"]) !== "undefined") {
				let vehLivery = parseInt(vehParams["livery"]);
				if(vehLivery < 0) {
					entity.setLivery(0);
					entity.setMod(48, -1);
				}else{
					entity.setLivery(vehLivery+1);
					entity.setMod(48, vehLivery);
				}
			}else{
				entity.setLivery(0);
				entity.setMod(48, -1);
			}
			if(vehParams["tyresCanBurst"] !== undefined) {
				let tyresCanBurst = parseInt(vehParams["tyresCanBurst"]);
				if(tyresCanBurst == 0) entity.setTyresCanBurst(true);
				else entity.setTyresCanBurst(false);
			}else{
				entity.setTyresCanBurst(true);
			}
		}
		
		// Материал покраски
		if(typeof(entity.getVariable("veh.colors")) !== "undefined") {
			let vehColors = JSON.parse(entity.getVariable("veh.colors"));
			
			if(vehColors["color1"] !== undefined) {
				let vehColor1 = explode(",", vehColors["color1"]);
				entity.setCustomPrimaryColour(parseInt(vehColor1[0]), parseInt(vehColor1[1]), parseInt(vehColor1[2]));
			}
			
			if(vehColors["color2"] !== undefined) {
				let vehColor2 = explode(",", vehColors["color2"]);
				entity.setCustomSecondaryColour(parseInt(vehColor2[0]), parseInt(vehColor2[1]), parseInt(vehColor2[2]));
			}
			
			if(vehColors["tyre"] !== undefined) {
				entity.toggleMod(20, true);
				let vehColorTyre = explode(",", vehColors["tyre"]);
				if(parseInt(vehColorTyre[0]) == 0 && parseInt(vehColorTyre[1]) == 0 && parseInt(vehColorTyre[2]) == 0) vehColorTyre[0] = 1, vehColorTyre[1] = 1, vehColorTyre[2] = 1;
				entity.setTyreSmokeColor(parseInt(vehColorTyre[0]), parseInt(vehColorTyre[1]), parseInt(vehColorTyre[2]));
			}
			
			entity.setColours(parseInt(vehColors["material"]), parseInt(vehColors["material"]));
			if(typeof(vehColors["pearl"]) === "undefined") vehColors["pearl"] = "-1";
			if(typeof(vehColors["wheels"]) === "undefined") vehColors["wheels"] = 0;
			entity.setExtraColours(parseInt(vehColors["pearl"]), parseInt(vehColors["wheels"]));
			mp.game.invoke("0x2036F561ADD12E33", entity.handle, parseInt(vehColors["pearl"]), parseInt(vehColors["wheels"]));
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Wheels color: "+vehColors["wheels"].toString());
		}
		
		// Тюнинг
		if(typeof(entity.getVariable("veh.tuning")) !== "undefined") {
			let tempTuning = JSON.parse(entity.getVariable("veh.tuning"));
			for (var k in tempTuning) {
				entity.setMod(parseInt(k), parseInt(tempTuning[k]));
			}
		}
		
		if(typeof(entity.getVariable("vehicle.engine")) !== "undefined") {
			if(entity.getVariable("vehicle.engine")) entity.setEngineOn(true, true, true);
			else entity.setEngineOn(false, true, true);
		}
		
		// Оптика
		if(typeof(entity.getVariable("vehicle.lights")) !== "undefined") {
			let vehLights = entity.getVariable("vehicle.lights");
			switch(vehLights) {
				case 1:
					entity.setLights(vehLights);
					entity.setLightMultiplier(0.0);
					entity.setFullbeam(false);
					break;
				case 2:
					entity.setLights(vehLights);
					entity.setLightMultiplier(0.0);
					entity.setFullbeam(false);
					break;
				case 3:
					entity.setLights(vehLights);
					entity.setLightMultiplier(0.5);
					entity.setFullbeam(false);
					break;
				case 4:
					entity.setLights(3);
					entity.setLightMultiplier(0.5);
					entity.setFullbeam(true);
					break;
			}
		}else{
			entity.setLights(1);
			entity.setLightMultiplier(0.0);
			entity.setFullbeam(false);
		}
	}
}

mp.events.addDataHandler('veh.school', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && value && !localPlayer.vehicle && entity.handle != 0) {
		if(!localPlayer.vehicle) {
			if(mp.players.atRemoteId(parseInt(value))) {
				let vehSchool = mp.players.atRemoteId(parseInt(value));
				if(vehSchool.remoteId.toString() == localPlayer.remoteId.toString()) {
					localPlayer.freezePosition(false);
					mp.events.call("sleepAntiCheat");
					localPlayer.setIntoVehicle(entity.handle, -1);
					if(hud_browser) hud_browser.execute("togglePreloader('');");
					mp.events.callRemoteUnreliable("rentVehNoWarpAgain", entity);
				}
			}
		}
	}
});

mp.events.addDataHandler('veh.type', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && value && entity.handle != 0) {
		if(value == "rentVeh") {
			if(!localPlayer.vehicle) {
				if(typeof(entity.getVariable('veh.own')) !== "undefined" && typeof(entity.getVariable('veh.warp')) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(entity.getVariable('veh.own')))) {
						let vehOwn = mp.players.atRemoteId(parseInt(entity.getVariable('veh.own')));
						if(vehOwn.remoteId.toString() == localPlayer.remoteId.toString()) {
							if(entity.getVariable("veh.warp")) {
								mp.events.call("sleepAntiCheat");
								localPlayer.setIntoVehicle(entity.handle, -1);
								mp.events.callRemoteUnreliable("rentVehNoWarpAgain", entity);
							}
						}
					}
				}
			}
		}
	}
});

mp.events.addDataHandler('veh.colors', function (entity, value, oldValue) { // Материал покраски
	if(entity && entity.type == 'vehicle' && value && entity.handle != 0) {
		let vehColors = JSON.parse(entity.getVariable("veh.colors"));
		
		if(vehColors["color1"] !== undefined) {
			let vehColor1 = explode(",", vehColors["color1"]);
			entity.setCustomPrimaryColour(parseInt(vehColor1[0]), parseInt(vehColor1[1]), parseInt(vehColor1[2]));
		}
		
		if(vehColors["color2"] !== undefined) {
			let vehColor2 = explode(",", vehColors["color2"]);
			entity.setCustomSecondaryColour(parseInt(vehColor2[0]), parseInt(vehColor2[1]), parseInt(vehColor2[2]));
		}
		
		if(vehColors["tyre"] !== undefined) {
			entity.toggleMod(20, true);
			let vehColorTyre = explode(",", vehColors["tyre"]);
			if(parseInt(vehColorTyre[0]) == 0 && parseInt(vehColorTyre[1]) == 0 && parseInt(vehColorTyre[2]) == 0) vehColorTyre[0] = 1, vehColorTyre[1] = 1, vehColorTyre[2] = 1;
			entity.setTyreSmokeColor(parseInt(vehColorTyre[0]), parseInt(vehColorTyre[1]), parseInt(vehColorTyre[2]));
		}
		
		entity.setColours(parseInt(vehColors["material"]), parseInt(vehColors["material"]));
		if(typeof(vehColors["pearl"]) === "undefined") vehColors["pearl"] = "-1";
		if(typeof(vehColors["wheels"]) === "undefined") vehColors["wheels"] = 0;
		entity.setExtraColours(parseInt(vehColors["pearl"]), parseInt(vehColors["wheels"]));
		mp.game.invoke("0x2036F561ADD12E33", entity.handle, parseInt(vehColors["pearl"]), parseInt(vehColors["wheels"]));
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Wheels color: "+vehColors["wheels"].toString());
	}
});

mp.events.addDataHandler('veh.tuning', function (entity, value, oldValue) { // Тюнинг
	if(entity && entity.type == 'vehicle' && value && entity.handle != 0) {
		let tempTuning = JSON.parse(entity.getVariable("veh.tuning"));
		for (var k in tempTuning) {
			entity.setMod(parseInt(k), parseInt(tempTuning[k]));
		}
	}
});

mp.events.addDataHandler('veh.job', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && value && entity.handle != 0) {
		if(!localPlayer.vehicle) {
			if(mp.players.atRemoteId(parseInt(value))) {
				let vehJob = mp.players.atRemoteId(parseInt(value));
				if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
					mp.events.call("sleepAntiCheat");
					if(hud_browser && curAirTask) {
						hud_browser.execute("hiddenAction('');");
						airProcessor();
					}
					localPlayer.setIntoVehicle(entity.handle, -1);
					mp.events.callRemoteUnreliable("rentVehNoWarpAgain", entity);
				}
			}
		}
		if(typeof(entity.getVariable("veh.hash")) !== "undefined") {
			let vehHash = entity.getVariable("veh.hash");
			if(typeof(entity.getVariable("veh.trailerForVeh")) === "undefined") entity.setSirenSound(false);
			if(vehHash == "mule") {
				setTimeout(() => {
					if(mp.vehicles.exists(entity)) {
						for (let i = 1; i <= 7; i++) {
							entity.setExtra(i, 1);
						}
						entity.setExtra(5, 0);
					}
				}, 1500);
			}else if(vehHash == "s_p450") {
				if(value != localPlayer.remoteId.toString()) entity.setDoorsLockedForPlayer(localPlayer.handle, true);
				else entity.setDoorsLockedForPlayer(localPlayer.handle, false);
			}
		}
	}
});

mp.events.addDataHandler('player.spec', function (entity, value, oldValue) {
	if(entity && entity.type == 'player' && entity.handle != 0) {
		if(typeof(playerBlipsInStream) !== "undefined") {
			if(value) {
				if(typeof(playerBlipsInStream) != "undefined") {
					if(typeof(playerBlipsInStream[entity.id.toString()]) !== "undefined") {
						if(typeof(playerBlipsInStream[entity.id.toString()].blip) !== "undefined") {
							let theBlip = playerBlipsInStream[entity.id.toString()].blip;
							if(theBlip) {
								if(mp.blips.exists(theBlip)) theBlip.destroy();
							}
							playerBlipsInStream[entity.id.toString()] = undefined;
							playerBlipsInStream = JSON.parse(JSON.stringify(playerBlipsInStream));
						}
					}
				}
			}else{
				if(typeof(entity.getVariable("player.inv")) !== "undefined") {
					let playerInv = entity.getVariable("player.inv");
					if(typeof(entity.getVariable("player.spec")) === "undefined" || !entity.getVariable("player.spec")) {
						if(typeof(playerInv.mask) === "undefined") {
							let pos = entity.position;
							
							let blipColor = 4;
							if(typeof(entity.getVariable("player.fraction")) !== "undefined") {
								let playerFraction = entity.getVariable("player.fraction");
								if(typeof(playerFraction.color) !== "undefined") blipColor = playerFraction.color;
							}
							
							let playerBlip = mp.blips.new(1, new mp.Vector3(pos.x, pos.y, pos.z),
							{
								name: "Какой-то игрок",
								scale: 0.7,
								color: blipColor,
								shortRange: true,
								dimension: 0
							});
							playerBlip.setCategory(7);
							playerBlip.playerHandle = entity.handle;
							
							playerBlipsInStream[entity.id.toString()] = {'blip':playerBlip};
						}
					}
				}
			}
		}
	}
});

var trailersPool = {};

mp.events.addDataHandler('veh.trailerForVeh', function (entity, value, oldValue) {
	if(entity && entity.type == 'vehicle' && entity.handle != 0) {
		/*if(hud_browser) {
			if(value) chatAPI.sysPush("<span style=\"color:#FF6146;\"> NEW VALUE: "+JSON.stringify(value).toString()+"</span>");
			else chatAPI.sysPush("<span style=\"color:#FF6146;\"> NEW VALUE: "+value.toString()+"</span>");
		}*/
		if(value) {
			if(typeof(trailersPool[entity.handle.toString()]) === "undefined") {
				entity.detachFromTrailer();
				
				//if(mp.vehicles.exists(trailersPool[entity.handle.toString()].trailer)) trailersPool[entity.handle.toString()].trailer.destroy();
				
				//if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146;\"> Создаем и аттачим прицеп</span>");
				let trailerData = value;
				let truckPos = entity.position;
				let tempTrailer = mp.vehicles.new(mp.game.joaat(trailerData.hash), new mp.Vector3(truckPos.x, truckPos.y, truckPos.z+2),
				{
					numberPlate: "ADMIN",
					color: [[255, 0, 0],[255,0,0]]
				});
				trailerData.tyagach = entity.handle;
				tempTrailer.imTrailerData = trailerData;
				
				if(trailerData.hash != "mb_tanker") entity.setSirenSound(true);
				else entity.setSirenSound(false);
				
				trailersPool[entity.handle.toString()] = {"trailer":tempTrailer};
				
				trailersPool = Object.entries(trailersPool).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
				
				setTimeout(() => {
					if(mp.vehicles.exists(tempTrailer) && mp.vehicles.exists(entity)) {
						tempTrailer.setCanBeDamaged(false);
						if(typeof(trailerData.extra) !== "undefined") {
							for (let i = 1; i <= 4; i++) {
								if(typeof(trailerData.extra[i.toString()]) !== "undefined") tempTrailer.setExtra(i, 0);
								else tempTrailer.setExtra(i, 1);
							}
						}else{
							for (let i = 1; i <= 4; i++) {
								tempTrailer.setExtra(i, 1);
							}
						}
						if(typeof(trailerData.livery) !== "undefined") {
							tempTrailer.setLivery(parseInt(trailerData.livery)+1);
							tempTrailer.setMod(48, parseInt(trailerData.livery));
						}else{
							tempTrailer.setLivery(0);
							tempTrailer.setMod(48, -1);
						}
						if(typeof(trailerData.golovaExtra) !== "undefined") {
							for (let i = 1; i <= 4; i++) {
								if(typeof(trailerData.golovaExtra[i.toString()]) !== "undefined") entity.setExtra(i, 0);
								else entity.setExtra(i, 1);
							}
						}else{
							for (let i = 1; i <= 4; i++) {
								entity.setExtra(i, 1);
							}
						}
						if(typeof(trailerData.num) !== "undefined") {
							tempTrailer.setExtra(5, 0);
							tempTrailer.setNumberPlateText(trailerData.num);
							tempTrailer.numberPlateType = 4;
							tempTrailer.setNumberPlateTextIndex(4);
						}else{
							tempTrailer.setExtra(5, 1);
						}
						mp.game.invoke("0x95CF53B3D687F9FA", tempTrailer.handle); // SET_TRAILER_LEGS_RAISED
					}
				}, 500);
				
				entity.attachToTrailer(tempTrailer.handle, 10);
				if(localPlayer.vehicle) {
					if(entity == localPlayer.vehicle && typeof(curTruckTask) !== "undefined") {
						if(curTruckTask.curPoint != "getCargo") {
							parkingVeh = tempTrailer;
						}
					}
				}
			}else{
				let tempTrailer = trailersPool[entity.handle.toString()].trailer;
				let trailerData = value;
				if(trailerData && mp.vehicles.exists(tempTrailer) && mp.vehicles.exists(entity)) {
					setTimeout(() => {
						if(mp.vehicles.exists(tempTrailer) && mp.vehicles.exists(entity)) {
							tempTrailer.setCanBeDamaged(false);
							if(typeof(trailerData.extra) !== "undefined") {
								for (let i = 1; i <= 4; i++) {
									if(typeof(trailerData.extra[i.toString()]) !== "undefined") tempTrailer.setExtra(i, 0);
									else tempTrailer.setExtra(i, 1);
								}
							}else{
								for (let i = 1; i <= 4; i++) {
									tempTrailer.setExtra(i, 1);
								}
							}
							if(typeof(trailerData.livery) !== "undefined") {
								tempTrailer.setLivery(parseInt(trailerData.livery)+1);
								tempTrailer.setMod(48, parseInt(trailerData.livery));
							}else{
								tempTrailer.setLivery(0);
								tempTrailer.setMod(48, -1);
							}
							if(typeof(trailerData.golovaExtra) !== "undefined") {
								for (let i = 1; i <= 4; i++) {
									if(typeof(trailerData.golovaExtra[i.toString()]) !== "undefined") entity.setExtra(i, 0);
									else entity.setExtra(i, 1);
								}
							}else{
								for (let i = 1; i <= 4; i++) {
									entity.setExtra(i, 1);
								}
							}
							if(typeof(trailerData.num) !== "undefined") {
								tempTrailer.setExtra(5, 0);
								tempTrailer.setNumberPlateText(trailerData.num);
								tempTrailer.numberPlateType = 4;
								tempTrailer.setNumberPlateTextIndex(4);
							}else{
								tempTrailer.setExtra(5, 1);
							}
						}
						if(localPlayer.vehicle) {
							if(entity == localPlayer.vehicle && typeof(curTruckTask) !== "undefined") {
								if(curTruckTask.curPoint != "getCargo") {
									parkingVeh = tempTrailer;
								}
							}
						}
					}, 500);
				}
			}
		}else{
			if(typeof(trailersPool[entity.handle.toString()]) !== "undefined") {
				entity.detachFromTrailer();
				if(mp.vehicles.exists(trailersPool[entity.handle.toString()].trailer)) trailersPool[entity.handle.toString()].trailer.destroy();
				trailersPool[entity.handle.toString()] = null;
				trailersPool = Object.entries(trailersPool).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
			}
		}
	}
});

function trailersSyncAttachChecker() {
	for(var i in trailersPool) {
		if(typeof(trailersPool[i]) !== "undefined") {
			let veh = mp.vehicles.atHandle(parseInt(i));
			if(mp.vehicles.exists(veh)) {
				//if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146;\"> EXISTS: "+JSON.stringify(veh.getVariable('veh.trailerForVeh'))+"</span>");
				if(typeof(veh.getVariable('veh.trailerForVeh')) !== 'undefined') {
					if(typeof(trailersPool[veh.handle.toString()]) !== "undefined") {
						if(trailersPool[veh.handle.toString()].trailer) {
							//if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146;\"> CHECKRESULT: "+veh.isAttachedToTrailer()+"</span>");
							if(veh.isAttachedToTrailer().toString() == "false") {
								trailersPool[veh.handle.toString()].trailer.destroy();
								trailersPool[veh.handle.toString()] = null;
								trailersPool = Object.entries(trailersPool).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
								
								let trailerData = veh.getVariable('veh.trailerForVeh');
								let truckPos = veh.position;
								let tempTrailer = mp.vehicles.new(mp.game.joaat(trailerData.hash), new mp.Vector3(truckPos.x, truckPos.y, truckPos.z+2),
								{
									numberPlate: "ADMIN",
									color: [[255, 0, 0],[255,0,0]]
								});
								trailerData.tyagach = veh.handle;
								tempTrailer.imTrailerData = trailerData;
								
								if(trailerData.hash != "mb_tanker") veh.setSirenSound(true);
								else veh.setSirenSound(false);
								
								trailersPool[veh.handle.toString()] = {"trailer":tempTrailer};
								
								setTimeout(() => {
									if(mp.vehicles.exists(tempTrailer) && mp.vehicles.exists(veh)) {
										tempTrailer.setCanBeDamaged(false);
										if(typeof(trailerData.extra) !== "undefined") {
											for (let i = 1; i <= 4; i++) {
												if(typeof(trailerData.extra[i.toString()]) !== "undefined") tempTrailer.setExtra(i, 0);
												else tempTrailer.setExtra(i, 1);
											}
										}else{
											for (let i = 1; i <= 4; i++) {
												tempTrailer.setExtra(i, 1);
											}
										}
										if(typeof(trailerData.livery) !== "undefined") {
											tempTrailer.setLivery(parseInt(trailerData.livery)+1);
											tempTrailer.setMod(48, parseInt(trailerData.livery));
										}else{
											tempTrailer.setLivery(0);
											tempTrailer.setMod(48, -1);
										}
										if(typeof(trailerData.golovaExtra) !== "undefined") {
											for (let i = 1; i <= 4; i++) {
												if(typeof(trailerData.golovaExtra[i.toString()]) !== "undefined") veh.setExtra(i, 0);
												else veh.setExtra(i, 1);
											}
										}else{
											for (let i = 1; i <= 4; i++) {
												veh.setExtra(i, 1);
											}
										}
										if(typeof(trailerData.num) !== "undefined") {
											tempTrailer.setExtra(5, 0);
											tempTrailer.setNumberPlateText(trailerData.num);
											tempTrailer.numberPlateType = 4;
											tempTrailer.setNumberPlateTextIndex(4);
										}else{
											tempTrailer.setExtra(5, 1);
										}
										mp.game.invoke("0x95CF53B3D687F9FA", tempTrailer.handle); // SET_TRAILER_LEGS_RAISED
									}
								}, 500);
								
								veh.attachToTrailer(tempTrailer.handle, 10);
								if(localPlayer.vehicle) {
									if(veh == localPlayer.vehicle && typeof(curTruckTask) !== "undefined") {
										if(curTruckTask.curPoint != "getCargo") {
											parkingVeh = tempTrailer;
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

// StreamCast
mp.events.add('entityStreamIn', (entity) => {
	if(entity) {
		//if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146;\"> Streamed Entity Type: "+entity.type+"</span>");
		switch(entity.type) {
			case 'ped':
				if(typeof(entity.getVariable('ped.type')) !== "undefined") {
					let pedType = entity.getVariable('ped.type');
					if(pedType == "animal") {
						let pos = entity.position;
						setTimeout(() => { 
							if(mp.peds.exists(entity)) {
								if(entity.isDead()) entity.quality = 0;
								else entity.quality = 1;
							}
						 }, 500);
						entity.setProofs(false, true, true, true, true, true, true, true);
						
						/*let pedBlip = mp.blips.new(442, new mp.Vector3(pos.x, pos.y, pos.z),
						{
							name: "Какое-то животное",
							color: 4,
							shortRange: true,
							dimension: 0
						});
						pedBlip.setCategory(7);
						
						let playerBlipArray = {'blip': pedBlip, 'player': entity};
						playerBlipsInStream.push(playerBlipArray);*/
						
						/*if(typeof(entity.controller) === "undefined") {
							mp.events.callRemoteUnreliable('setAnimalPedContoller', entity.remoteId.toString());
							setTimeout(() => { tryAnimalMakeTask(entity.remoteId.toString()); }, 2500);
						}else if(!entity.controller) {
							mp.events.callRemoteUnreliable('setAnimalPedContoller', entity.remoteId.toString());
							setTimeout(() => { tryAnimalMakeTask(entity.remoteId.toString()); }, 2500);
						}else if(!mp.players.exists(entity.controller)) {
							mp.events.callRemoteUnreliable('setAnimalPedContoller', entity.remoteId.toString());
							setTimeout(() => { tryAnimalMakeTask(entity.remoteId.toString()); }, 2500);
						}*/
						/*else if(mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, entity.x, entity.y, entity.z) > 300) {
							mp.events.callRemote('setAnimalPedContoller', entity.remoteId.toString());
							setTimeout(() => { tryAnimalMakeTask(entity.remoteId.toString()); }, 2500);
						}*/
						//chatAPI.sysPush("<span style=\"color:#FF6146;\"> SYNCED PED: "+entity.remoteId+"</span>");
					}
				}
				break;
			case 'vehicle':
				vehsInStream++;
			
				if(typeof(entity.isAutoSalon) === "undefined") reSyncVehicle(entity);
				if(typeof(entity.d3Veh) !== "undefined") syncD3Vehicle(entity);
				if(typeof(entity.isContainer) !== "undefined") syncContainer(entity);
				
				/*
				setTimeout(() => {
					if(mp.vehicles.exists(entity)) {
						let decalType = 1010;
						let pos = entity.position;
						
						let normDir = normalizeDirection(entity.getForwardVector());
						let unkVec = normDir;
						let tempDecal = mp.game.invoke("0xB302244A1839BDAD", decalType, pos.x, pos.x, pos.z, normDir.x, normDir.y, normDir.z, unkVec.x, unkVec.y, unkVec.z, 5, 5, 255, 255, 255, 255, 20.0, 1, 0, 1);
						
						mp.game.graphics.addDecal(1110, pos.x, pos.x, pos.z, 0 , 0 , -1 , 0, 1, 0, 4 , 4 , 255, 0.1, 0.1, 1.0, 150.0, true, false, true);
						//chatAPI.sysPush("<span style=\"color:#FF6146;\"> Apply decal "+tempDecal+"</span>");
					}
				}, 1000);
				*/
				
				/*setTimeout(() => {
					if(mp.vehicles.exists(entity)) {
						let posDec = entity.getWorldPositionOfBone(entity.getBoneIndexByName("bonnet"));
						chatAPI.sysPush("<span style=\"color:#FF6146;\"> POS: "+JSON.stringify(posDec)+"</span>");
						mp.game.graphics.addDecal(5000, posDec.x, posDec.y, posDec.z, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 50.0, 50.0, 1.0, 0.0, 0.0, 255.0, -1.0, true, false, true);
					}
				}, 1000);*/
				
				if(typeof(entity.getVariable('veh.trailerForVeh')) !== 'undefined') {
					if(typeof(trailersPool[entity.handle.toString()]) === "undefined") {
						entity.detachFromTrailer();
						
						let trailerData = entity.getVariable('veh.trailerForVeh');
						if(typeof(trailerData) !== "undefined") {
							if(typeof(trailerData.hash) !== "undefined") {
								let truckPos = entity.position;
								let tempTrailer = mp.vehicles.new(mp.game.joaat(trailerData.hash), new mp.Vector3(truckPos.x, truckPos.y, truckPos.z+2),
								{
									numberPlate: "ADMIN",
									color: [[255, 0, 0],[255,0,0]]
								});
								trailerData.tyagach = entity.handle;
								tempTrailer.imTrailerData = trailerData;
								
								if(trailerData.hash != "mb_tanker") entity.setSirenSound(true);
								else entity.setSirenSound(false);
								
								trailersPool[entity.handle.toString()] = {"trailer":tempTrailer};
								
								setTimeout(() => {
									if(mp.vehicles.exists(tempTrailer) && mp.vehicles.exists(entity)) {
										tempTrailer.setCanBeDamaged(false);
										if(typeof(trailerData.extra) !== "undefined") {
											for (let i = 1; i <= 4; i++) {
												if(typeof(trailerData.extra[i.toString()]) !== "undefined") tempTrailer.setExtra(i, 0);
												else tempTrailer.setExtra(i, 1);
											}
										}else{
											for (let i = 1; i <= 4; i++) {
												tempTrailer.setExtra(i, 1);
											}
										}
										if(typeof(trailerData.livery) !== "undefined") {
											tempTrailer.setLivery(parseInt(trailerData.livery)+1);
											tempTrailer.setMod(48, parseInt(trailerData.livery));
										}else{
											tempTrailer.setLivery(0);
											tempTrailer.setMod(48, -1);
										}
										if(typeof(trailerData.golovaExtra) !== "undefined") {
											for (let i = 1; i <= 4; i++) {
												if(typeof(trailerData.golovaExtra[i.toString()]) !== "undefined") entity.setExtra(i, 0);
												else entity.setExtra(i, 1);
											}
										}else{
											for (let i = 1; i <= 4; i++) {
												entity.setExtra(i, 1);
											}
										}
										if(typeof(trailerData.num) !== "undefined") {
											tempTrailer.setExtra(5, 0);
											tempTrailer.setNumberPlateText(trailerData.num);
											tempTrailer.numberPlateType = 4;
											tempTrailer.setNumberPlateTextIndex(4);
										}else{
											tempTrailer.setExtra(5, 1);
										}
										mp.game.invoke("0x95CF53B3D687F9FA", tempTrailer.handle); // SET_TRAILER_LEGS_RAISED
									}
								}, 500);
								
								entity.attachToTrailer(tempTrailer.handle, 10);
								if(localPlayer.vehicle) {
									if(entity == localPlayer.vehicle && typeof(curTruckTask) !== "undefined") {
										if(curTruckTask.curPoint != "getCargo") {
											parkingVeh = tempTrailer;
										}
									}
								}
							}
						}
					}
				}
				
				if(typeof(entity.imTrailerData) !== "undefined") {
					let trailerData = entity.imTrailerData;
					if(typeof(trailerData.tyagach) !== "undefined") {
						if(mp.vehicles.atHandle(trailerData.tyagach)) {
							if(mp.vehicles.atHandle(trailerData.tyagach).isAttachedToTrailer().toString() == "false") {
								mp.vehicles.atHandle(trailerData.tyagach).attachToTrailer(entity.handle, 10);
								if(localPlayer.vehicle) {
									if(mp.vehicles.atHandle(trailerData.tyagach) == localPlayer.vehicle && typeof(curTruckTask) !== "undefined") {
										if(curTruckTask.curPoint != "getCargo") {
											parkingVeh = entity;
										}
									}
								}
							}
						}
					}
					if(typeof(trailerData.extra) !== "undefined") {
						for (let i = 1; i <= 7; i++) {
							if(typeof(trailerData.extra[i.toString()]) !== "undefined") entity.setExtra(i, 0);
							else entity.setExtra(i, 1);
						}
					}
					if(typeof(trailerData.livery) !== "undefined") {
						entity.setLivery(parseInt(trailerData.livery)+1);
						entity.setMod(48, parseInt(trailerData.livery));
					}else{
						entity.setLivery(0);
						entity.setMod(48, -1);
					}
				}
				
				//chatAPI.sysPush("<span style=\"color:#FF6146;\"> IS: "+typeof(entity.isAutoSalon)+"</span>");
				
				if(typeof(CryptoJS) !== "undefined" && typeof(vehStats) !== "undefined" && typeof(krKey) !== "undefined") {
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					if(typeof(entity.makedTestDrive) !== "undefined") {
						entity.setHeading(38.322);
						setTimeout(() => {
							if(mp.vehicles.exists(entity)) {
								entity.setDirtLevel(0);
								entity.setHeading(38.322);
								entity.setFixed();
								
								localPlayer.freezePosition(false);
								mp.events.call("sleepAntiCheat");
								localPlayer.setIntoVehicle(entity.handle, -1);
								entity.setEngineOn(true, true, true);
								entity.setDoorShut(0, true);
								entity.setDoorShut(1, true);
								
								if(salonName != "Салон вертолётов") {
									if(parseInt(entity.isExtraTurnedOn(1)) != 0) entity.setExtra(1, 1);
									if(parseInt(entity.isExtraTurnedOn(2)) != 0) entity.setExtra(2, 1);
									if(parseInt(entity.isExtraTurnedOn(3)) != 0) entity.setExtra(3, 1);
									if(parseInt(entity.isExtraTurnedOn(4)) != 0) entity.setExtra(4, 1);
									
									if(parseInt(entity.isExtraTurnedOn(5)) != 1) entity.setExtra(5, 0);
									if(parseInt(entity.isExtraTurnedOn(6)) != 1) entity.setExtra(6, 0);
								}
								
								if(entity.color1 !== undefined) {
									let vData = explode(",", entity.color1);
									entity.setCustomPrimaryColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
								}
								if(entity.color2 !== undefined) {
									let vData = explode(",", entity.color2);
									entity.setCustomSecondaryColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
								}
								
								if(hud_browser) {
									hud_browser.execute("hiddenAction('');");
									hud_browser.execute("testDriveStarted();");
								}
								
								if(entity.hash) {
									let vehHash = entity.hash;
									let vehMaxSpeed = 100;
									if(typeof(decVehStats[0][vehHash]) !== "undefined" && typeof(decVehStats[0][vehHash].maxSpeed) !== "undefined") vehMaxSpeed = decVehStats[0][vehHash].maxSpeed.toString();
									if(primarySpeedLimit) entity.setMaxSpeed(primarySpeedLimit*0.277);
									else entity.setMaxSpeed(vehMaxSpeed*0.277);
								}
							}
						}, 1000);
					}else if(typeof(entity.isAutoSalon) !== "undefined") {
						if(mp.vehicles.exists(entity)) {
							if(hud_browser && entity.hash) {
								let vehHash = entity.hash;
								let vehMaxSpeed = 100;
								let vehFuelTank = 5;
								let vehFuelType = "gas";
								let vehTrunk = 0;
								let vehHaveTuning = "не доступны";
								if(typeof(decVehStats[0][vehHash]) != "undefined") {
									vehMaxSpeed = decVehStats[0][vehHash].maxSpeed.toString();
									vehFuelTank = decVehStats[0][vehHash].gasTank.toString();
									vehTrunk = decVehStats[0][vehHash].inv.toString();
									vehFuelType = decVehStats[0][vehHash].fuel[0];
									
									let spoilers = 0, fbumps = 0, bbumps = 0, skirts = 0, hoods = 0, fenders = 0, roofs = 0;
									spoilers = entity.getNumMods(0); // Spoilers
									fbumps = entity.getNumMods(1); // Front bumps
									bbumps = entity.getNumMods(2); // Back bumps
									skirts = entity.getNumMods(3); // Side Skirts
									hoods = entity.getNumMods(7); // Hoods
									fenders = entity.getNumMods(8); // Fenders
									roofs = entity.getNumMods(10); // Roofs
									if(spoilers > 0 || fbumps > 0 || bbumps > 0 || skirts > 0 || hoods > 0 || fenders > 0 || roofs > 0) vehHaveTuning = "доступны";
								}
								hud_browser.execute("vehAutoSalonSetInfo('"+vehMaxSpeed+"', '"+vehFuelTank+"', '"+vehFuelType+"', '"+vehTrunk+"', '"+vehHaveTuning+"');");
							}
							
							entity.setDirtLevel(0);
							if(salonName == "Салон вертолётов") entity.setHeading(-5);
							else entity.setHeading(-75);
							entity.setDirtLevel(0);
							if(salonName == "Салон вертолётов") entity.setHeading(-5);
							else entity.setHeading(-75);
							entity.setEngineOn(true, true, true);
							entity.setLights(3);
							entity.setLightMultiplier(0.5);
							entity.setFullbeam(false);
							entity.setWindowTint(2);
							
							setTimeout(() => {
								if(mp.vehicles.exists(entity)) {
									entity.rollDownWindow(0);
									entity.rollDownWindow(1);
									entity.setDoorOpen(0, false, false);
									entity.setDoorOpen(1, false, false);
								}
							}, 850);
							
							entity.setIndicatorLights(0, true);
							entity.setIndicatorLights(1, true);
							
							if(salonName != "Салон вертолётов") {
								entity.setExtra(1, 1);
								entity.setExtra(2, 1);
								entity.setExtra(3, 1);
								entity.setExtra(4, 1);
							}
							
							if(typeof(entity.getVariable('veh.job')) !== 'undefined') {
								if(typeof(entity.getVariable('veh.hash')) !== 'undefined') {
									if(entity.getVariable('veh.hash').toString() == 'octavia') {
										entity.setLivery(1+1);
										entity.setMod(48, 2);
										//entity.setLivery(1);
									}
								}
							}
							
							if(salonName != "Салон вертолётов") {
								if(parseInt(entity.isExtraTurnedOn(5)) != 1) entity.setExtra(5, 0);
								if(parseInt(entity.isExtraTurnedOn(6)) != 1) entity.setExtra(6, 0);
							}
							
							if(entity.color1 !== undefined) {
								let vData = explode(",", entity.color1);
								entity.setCustomPrimaryColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
							}
							if(entity.color2 !== undefined) {
								let vData = explode(",", entity.color2);
								entity.setCustomSecondaryColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
							}
						}
						if(hud_browser) {
							hud_browser.execute("hiddenAction('');");
							hud_browser.execute("vehAutoSalonLoaded();");
						}
					}
					
					if(typeof(entity.getVariable("veh.type")) !== "undefined" && typeof(entity.getVariable("veh.own")) !== "undefined" && typeof(entity.getVariable("veh.warp")) !== "undefined") {
						if(entity.getVariable("veh.type") == "rentVeh" && entity.getVariable("veh.warp")) {
							if(!localPlayer.vehicle) {
								if(typeof(entity.getVariable('veh.own')) !== "undefined") {
									if(mp.players.atRemoteId(parseInt(entity.getVariable('veh.own')))) {
										let vehOwn = mp.players.atRemoteId(parseInt(entity.getVariable('veh.own')));
										if(vehOwn.remoteId.toString() == localPlayer.remoteId.toString()) {
											mp.events.call("sleepAntiCheat");
											localPlayer.setIntoVehicle(entity.handle, -1);
											mp.events.callRemoteUnreliable("rentVehNoWarpAgain", entity);
										}
									}
								}
							}
						}
					}
					
					if(typeof(entity.getVariable("veh.school")) !== "undefined") {
						if(!localPlayer.vehicle) {
							if(mp.players.atRemoteId(parseInt(entity.getVariable('veh.school')))) {
								let vehSchool = mp.players.atRemoteId(parseInt(entity.getVariable('veh.school')));
								if(vehSchool.remoteId.toString() == localPlayer.remoteId.toString()) {
									localPlayer.freezePosition(false);
									localPlayer.setIntoVehicle(entity.handle, -1);
									if(hud_browser) hud_browser.execute("togglePreloader('');");
									mp.events.callRemoteUnreliable("rentVehNoWarpAgain", entity);
								}
							}
						}
					}
					
					if(typeof(entity.getVariable("veh.job")) !== "undefined") {
						if(!localPlayer.vehicle) {
							if(mp.players.atRemoteId(parseInt(entity.getVariable('veh.job')))) {
								let vehJob = mp.players.atRemoteId(parseInt(entity.getVariable('veh.job')));
								if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
									mp.events.call("sleepAntiCheat");
									if(hud_browser && curAirTask) {
										hud_browser.execute("hiddenAction('');");
										airProcessor();
									}
									localPlayer.setIntoVehicle(entity.handle, -1);
									mp.events.callRemoteUnreliable("rentVehNoWarpAgain", entity);
								}
							}
						}
						if(typeof(entity.getVariable("veh.hash")) !== "undefined") {
							let vehHash = entity.getVariable("veh.hash");
							if(typeof(entity.getVariable("veh.trailerForVeh")) === "undefined") entity.setSirenSound(false);
							if(vehHash == "mule") {
								setTimeout(() => {
									if(mp.vehicles.exists(entity)) {
										for (let i = 1; i <= 7; i++) {
											entity.setExtra(i, 1);
										}
										entity.setExtra(5, 0);
									}
								}, 1500);
							}else if(vehHash == "s_p450") {
								if(entity.getVariable("veh.job") != localPlayer.remoteId.toString()) entity.setDoorsLockedForPlayer(localPlayer.handle, true);
								else entity.setDoorsLockedForPlayer(localPlayer.handle, false);
							}
						}
					}
				}
				break;
			case 'object':
				/*if(typeof(entity.paraplayer) !== "undefined") {
					let thePlayer = mp.players.atHandle(entity.paraplayer);
					if(thePlayer) entity.attachTo(entity.paraplayer, 57717, 0, 0, 3, 0, 0, 0, true, true, true, false, 0, true);
				}*/
				break;
		}
	}
});

mp.events.add('entityStreamOut', (entity) => {
	if(entity) {
		switch(entity.type) {
			case 'ped':
				if(typeof(entity.getVariable('ped.type')) !== "undefined") {
					let pedType = entity.getVariable('ped.type');
					if(pedType == "animal") {
						if(typeof(entity.controller) !== "undefined") {
							if(entity.controller == localPlayer) {
								//chatAPI.sysPush("<span style=\"color:#FFF;\"> * Сьебался нахуй: "+entity.remoteId.toString()+"</span>");
								mp.events.callRemoteUnreliable('setAnimalPedContoller', entity.remoteId.toString(), true);
							}
						}
					}
				}
				/*if(typeof(playerBlipsInStream) != "undefined") {
					for(var i in playerBlipsInStream) {
						let tempData = playerBlipsInStream[i];
						if(mp.peds.exists(tempData['player'])) {
							if(tempData !== undefined && tempData['player'] !== undefined && tempData['player'] == entity && tempData['blip'] !== undefined) {
								if(mp.blips.exists(tempData['blip'])) tempData['blip'].destroy();
								delete playerBlipsInStream[i];
								break;
							}
						}else{
							if(mp.blips.exists(tempData['blip'])) tempData['blip'].destroy();
							delete playerBlipsInStream[i];
							break;
						}
					}
					playerBlipsInStream = playerBlipsInStream.filter(function (el) { return el != null; });
					break;
				}*/
				break;
			case 'vehicle':
				vehsInStream--;
				if(typeof(entity.getVariable('veh.trailerForVeh')) !== 'undefined') {
					if(typeof(trailersPool[entity.handle.toString()]) !== "undefined") {
						if(trailersPool[entity.handle.toString()].trailer) {
							entity.detachFromTrailer();
							trailersPool[entity.handle.toString()].trailer.destroy();
							trailersPool[entity.handle.toString()] = null;
							trailersPool = Object.entries(trailersPool).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
						}
					}
				}
				
				if(typeof(entity.getVariable('veh.theft')) !== 'undefined') {
					if(!entity.getVariable('veh.theft')) {
						if(typeof(entity.theftBlip) !== "undefined") {
							if(mp.blips.exists(entity.theftBlip)) {
								entity.theftBlip.destroy();
								entity.theftBlip = undefined;
							}
						}
					}
				}
				
				if(typeof(entity.getVariable('veh.grabTruck')) !== 'undefined') {
					if(!entity.getVariable('veh.grabTruck')) {
						if(typeof(entity.grabTruckBlip) !== "undefined") {
							if(mp.blips.exists(entity.grabTruckBlip)) {
								entity.grabTruckBlip.destroy();
								entity.grabTruckBlip = undefined;
							}
						}
					}
				}
				break;
		}
	}
});

mp.events.add("playerSpawn", () => {
	mp.game.player.setHealthRechargeMultiplier(0.0);
	mp.game.player.setRunSprintMultiplierFor(1.15);
	
	mp.game.gameplay.disableAutomaticRespawn(true);
	mp.game.gameplay.ignoreNextRestart(true);
	mp.game.gameplay.setFadeInAfterDeathArrest(false);
	mp.game.gameplay.setFadeOutAfterDeath(false);
	mp.game.gameplay.setFadeInAfterLoad(false);
	mp.game.audio.setUserRadioControlEnabled(false);
	mp.game.audio.setFrontendRadioActive(false);
	//mp.game.vehicle.defaultEngineBehaviour = false; // Не пытается завести авто
	
	mp.game.player.setCanDoDriveBy(false);
});

mp.events.add("playerQuit", (player) => {
	if(typeof(playerBlipsInStream) != "undefined") {
		if(typeof(playerBlipsInStream[player.id.toString()]) !== "undefined") {
			if(typeof(playerBlipsInStream[player.id.toString()].blip) !== "undefined") {
				let theBlip = playerBlipsInStream[player.id.toString()].blip;
				if(theBlip) {
					if(mp.blips.exists(theBlip)) theBlip.destroy();
				}
				playerBlipsInStream[player.id.toString()] = undefined;
				playerBlipsInStream = JSON.parse(JSON.stringify(playerBlipsInStream));
			}
		}
	}
});

/*
function normalizeDirection(vector){
	var vectorMagnitude;
	var fVar1;
	vectorMagnitude = mp.game.invoke("0xA8CEACB4F35AE058", vector.x, vector.y, vector.z);
	if(vectorMagnitude != 0.0) {
		fVar1 = 1.0 / vectorMagnitude;
		vector.x = vector.x*fVar1;
		vector.y = vector.y*fVar1;
		vector.z = vector.z*fVar1;
	}else{
		vector.x = 0.0;
		vector.y = 0.0;
		vector.z = 0.0;
	}
	chatAPI.sysPush("<span style=\"color:#FF6146;\"> "+JSON.stringify(vector)+"</span>");
	return vector;
}
*/
}