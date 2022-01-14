{
var pedsInStream = [];

mp.game.streaming.requestAnimDict("special_ped@jessie@monologue_7@monologue_7b");
mp.game.streaming.requestAnimDict("special_ped@jessie@monologue_7@monologue_7c");
mp.game.streaming.requestAnimDict("special_ped@mani@monologue_8@monologue_8g");
mp.game.streaming.requestAnimDict("special_ped@mime@monologue_3@monologue_3a");
mp.game.streaming.requestAnimDict("special_ped@baygor@monologue_6@monologue_6i");
mp.game.streaming.requestAnimDict("special_ped@bill@base");
mp.game.streaming.requestAnimDict("special_ped@impotent_rage@base");

/*
mp.events.add("youAreControlledTraffic", pedID => {
	if(typeof(pedID) !== "undefined") {
		let thePed = mp.peds.atRemoteId(pedID);
		if(mp.peds.exists(thePed)) {
			let thePedData = thePed.getVariable("ped.data");
			let theVeh = mp.vehicles.atRemoteId(parseInt(thePedData.veh));
			if(mp.vehicles.exists(theVeh)) {
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+thePedData.veh+"</span>");
				setTimeout(function() {
					thePed.taskWarpIntoVehicle(theVeh.handle, -1);
				}, 1500);

				//player.taskVehicleDriveToCoord(vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10);
				
				setTimeout(function() {
					thePed.taskVehicleDriveToCoord(theVeh.handle, 2173.0334, 2691.8123, 48.2732, 40, 1, mp.game.joaat("m5f90new"), 1, 1.0, true);
				}, 10500);
			}
		}
	}
});
*/

function pedTrafficResume(thePed) {
	if(typeof(thePed.trafficVeh) !== "undefined") {
		if(mp.vehicles.exists(thePed.trafficVeh)) {
			if(typeof(thePed.trafficVeh.getVariable("veh.traffic")) !== "undefined") {
				let vehTraffic = thePed.trafficVeh.getVariable("veh.traffic");
				thePed.taskWarpIntoVehicle(thePed.trafficVeh.handle, -1);
				setTimeout(function() {
					if(mp.peds.exists(thePed) && mp.vehicles.exists(thePed.trafficVeh)) {
						//let vehRot = thePed.trafficVeh.getRotation();
						//thePed.trafficVeh.setRotation(pitch, roll, yaw, rotationOrder, p5);
						//thePed.trafficVeh.setOnGroundProperly();
						
						thePed.taskVehicleDriveToCoord(thePed.trafficVeh.handle, parseFloat(vehTraffic.end.x), parseFloat(vehTraffic.end.y), parseFloat(vehTraffic.end.z), 85, 1, mp.game.joaat(vehTraffic.hash), 1, 1.0, true);
						thePed.trafficVeh.setForwardSpeed(vehTraffic.syncSpeed);
					}
				}, 550);
			}
		}
	}
}

function createPedTraffic(entity) {
	if(typeof(entity.trafficPed) !== "undefined") {
		if(mp.peds.exists(entity.trafficPed)) entity.trafficPed.destroy();
	}
	
	let thePed = mp.peds.new(mp.game.joaat("u_m_y_babyd"), new mp.Vector3(parseFloat(entity.position.x), parseFloat(entity.position.y), parseFloat(entity.position.z)), { dynamic: true });
	thePed.contoller = localPlayer;
	
	thePed.freezePosition(false);
	thePed.setCanBeDamaged(true);
	thePed.setInvincible(false);
	thePed.CanRagdoll = true;
	thePed.setOnlyDamagedByPlayer(true);
	thePed.setCanRagdollFromPlayerImpact(true);
	thePed.setSweat(100);
	thePed.setRagdollOnCollision(true);

	thePed.setProofs(false, false, false, false, false, false, false, false); 

	thePed.trafficVeh = entity;
	entity.trafficPed = thePed;
	
	pedTrafficResume(thePed);
}

function trafficSyncChecker() {
	mp.vehicles.forEachInStreamRange(
		(entity, id) => {
			if(typeof(entity.getVariable("veh.type")) !== "undefined" && typeof(entity.getVariable("veh.traffic")) !== "undefined") {
				if(entity.getVariable("veh.type") == "traffic") {
						let trafficData = entity.getVariable("veh.traffic");
						if(calculateDistance(new mp.Vector3(trafficData.end.x,trafficData.end.y,trafficData.end.z), entity.position) <= 50) {
							mp.events.callRemoteUnreliable('destroyTraffic', entity.remoteId.toString());
						}else if((calculateDistance(new mp.Vector3(trafficData.x,trafficData.y,trafficData.z), new mp.Vector3(trafficData.end.x,trafficData.end.y,trafficData.end.z)) - calculateDistance(new mp.Vector3(trafficData.end.x,trafficData.end.y,trafficData.end.z), entity.position)) < -50) {
							mp.events.callRemoteUnreliable('destroyTraffic', entity.remoteId.toString());
						}
					if(entity.controller == localPlayer) {
						//chatAPI.sysPush(`${entity.type}(ClientID: ${entity.id}) you re controlled`);
						if(typeof(entity.trafficPed) === "undefined") {
							let vehTraffic = entity.getVariable("veh.traffic");
							if(typeof(vehTraffic.hash) !== "undefined") {
								if(vehTraffic.type == "taskVehicleDriveToCoord") createPedTraffic(entity);
							}
						}else{
							if(!mp.peds.exists(entity.trafficPed)) mp.events.callRemoteUnreliable('destroyTraffic', entity.remoteId.toString());
							else if(entity.trafficPed.getScriptTaskStatus(0x93a5526e) == 7) mp.events.callRemoteUnreliable('destroyTraffic', entity.remoteId.toString());
						}
					}
					if(!entity.controller) {
						if(calculateDistance(entity.position, localPlayer.position) < 600) mp.events.callRemoteUnreliable('makeMeATrafficController', entity.remoteId);
					}
					/*}else if(!entity.controller) {
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * makeMeATrafficController: "+entity.remoteId+"</span>");
						if(calculateDistance(entity.position, localPlayer.position) < 255) mp.events.callRemoteUnreliable('makeMeATrafficController', entity.remoteId);
					}else if(entity.controller.handle == 0) {
						if(calculateDistance(entity.position, localPlayer.position) < 255) mp.events.callRemoteUnreliable('makeMeATrafficController', entity.remoteId);
					}else if(entity.controller.handle != 0) {
						if(calculateDistance(entity.position, entity.controller.position) > 255) mp.events.callRemoteUnreliable('makeMeATrafficController', entity.remoteId);
					}*/
				}
			}
		}
	);
}
//setInterval(trafficSyncChecker, 1500);

mp.events.addDataHandler('veh.traffic', function (entity, value, oldValue) {
	if(entity.handle != 0) {
		if(entity.controller == localPlayer) {
			//chatAPI.sysPush(`${entity.type}(ClientID: ${entity.id}) you re controlled`);
			let vehTraffic = entity.getVariable("veh.traffic");
			if(typeof(vehTraffic.hash) !== "undefined") {
				if(vehTraffic.type == "taskVehicleDriveToCoord") {
					createPedTraffic(entity);
				}
			}
		}//else if(!entity.controller) {
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * makeMeATrafficController: "+entity.remoteId+"</span>");
			//if(calculateDistance(entity.position, localPlayer.position) < 255) mp.events.callRemoteUnreliable('makeMeATrafficController', entity.remoteId.toString());
		//}
	}
});

mp.events.add("entityStreamIn", entity => {
   if(entity.type == "ped") {
	    pedTrafficResume(entity);
		if(typeof(entity.getVariable("ped.type")) !== "undefined") {
			let pedType = entity.getVariable("ped.type");
			if(pedType == "static") {
				if(entity.getVariable("ped.data")) {
					let pedData = entity.getVariable("ped.data");
					if(pedData.animDict && mp.game.streaming.hasAnimDictLoaded(pedData.animDict)) entity.taskPlayAnim(pedData.animDict, pedData.anim, 8.0, 1.0, -1, 1, 1.0, false, false, false);
				}
			}/*else if(pedType == "traffic") {
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(entity)+"</span>");
				if(typeof(entity.getVariable("ped.data")) !== "undefined") {
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+entity.controller+"</span>");
					entity.controller = localPlayer;
					
					let thePedData = entity.getVariable("ped.data");
					let theVeh = mp.vehicles.atRemoteId(parseInt(thePedData.veh));
					
					if(mp.vehicles.exists(theVeh)) {
						setTimeout(function() {
							entity.taskWarpIntoVehicle(theVeh.handle, -1);
						}, 1500);

						//player.taskVehicleDriveToCoord(vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10);
						
						setTimeout(function() {
							entity.taskVehicleDriveToCoord(theVeh.handle, 0.52, 0.38, 72.1, 70, 1, mp.game.joaat("m5f90new"), 1, 1.0, true);
						}, 2500);
						//mp.events.callRemote('makeMeATrafficController', entity.remoteId);
					}
				}
			}*/
		}
   }else if(entity.type == "vehicle") {
		if(typeof(entity.getVariable("veh.type")) !== "undefined" && typeof(entity.getVariable("veh.traffic")) !== "undefined") {
			if(entity.getVariable("veh.type") == "traffic") {
				if(entity.controller == localPlayer) {
					//chatAPI.sysPush(`${entity.type}(ClientID: ${entity.id}) you re controlled`);
					let vehTraffic = entity.getVariable("veh.traffic");
					if(typeof(vehTraffic.hash) !== "undefined") {
						if(vehTraffic.type == "taskVehicleDriveToCoord") createPedTraffic(entity);
					}
				}else if(!entity.controller) {
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * makeMeATrafficController: "+entity.remoteId+"</span>");
					//if(calculateDistance(entity.position, localPlayer.position) < 255) mp.events.callRemoteUnreliable('makeMeATrafficController', entity.remoteId);
				}
			}
		}
   }
});

mp.events.add('entityStreamOut', (entity) => {
	if(entity) {
		switch(entity.type) {
			case 'vehicle':
				if(typeof(entity.trafficPed) !== 'undefined') {
					if(typeof(entity.trafficPed) !== "undefined") {
						if(mp.peds.exists(entity.trafficPed)) entity.trafficPed.destroy();
						entity.trafficPed = false;
					}
				}
				break;
		}
	}
});
}