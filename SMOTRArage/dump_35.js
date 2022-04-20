{
let afAnimalPedController = false;
let afAnimalPedTasker = false;
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
	if(!localPlayer.isDead() && ammoInUse != "0") {
		//if(targetPosition) chatAPI.sysPush("<span style=\"color:#FF6146\"> * Попадание в: "+JSON.stringify(targetPosition)+"</span>");
		
		let startPosition = localPlayer.getBoneCoords(12844, 0.5, 0, 0);
		let isPedShooted = mp.raycasting.testCapsule(startPosition, targetPosition, 0.1, null, 8);
		if(isPedShooted) {
			if(typeof(isPedShooted.entity) !== "undefined") {
				let pedShooted = mp.peds.atHandle(isPedShooted.entity.handle);
				if(mp.peds.exists(pedShooted)) {
					//if(!pedShooted.isDead()) {
						if(typeof(pedShooted.getVariable("ped.type")) !== "undefined") {
							let pedType = pedShooted.getVariable("ped.type");
							if(pedType == "animal") {
								if(pedShooted.quality == 1) pedShooted.quality = 90;
								else if(pedShooted.quality > 15) pedShooted.quality = pedShooted.quality - 10;
								//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Качество тушки: "+pedShooted.quality+"</span>");
								if(typeof(pedShooted.remoteId) !== "undefined") {
									if(pedShooted.controller) {
										if(pedShooted.controller.remoteId) {
											if(pedShooted.controller.remoteId != localPlayer.remoteId) {
												if(mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, pedShooted.controller.position.x, pedShooted.controller.position.y, pedShooted.controller.position.z) > 300) {
													if(!afAnimalPedController) {
														mp.events.callRemote('setAnimalPedContoller', pedShooted.remoteId.toString());
														//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Я контроллер пошёл нахуй</span>");
													}
													afAnimalPedController = true;
													setTimeout(function() { afAnimalPedController = false; }, 2500);
												}
											}
										}else{
											if(!afAnimalPedController) {
												mp.events.callRemote('setAnimalPedContoller', pedShooted.remoteId.toString());
												//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Я контроллер пошёл нахуй</span>");
											}
											afAnimalPedController = true;
											setTimeout(function() { afAnimalPedController = false; }, 2500);
										}
									}
									if(pedShooted.isDead() && typeof(pedShooted.alreadyDead) === "undefined") {
										if(pedShooted.remoteId) {
											//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Животное убито</span>");
											mp.events.callRemote('rebornAnimal', pedShooted.remoteId.toString());
											pedShooted.alreadyDead = true;
										}
									}
								}
							}
						}
					//}
				}
			}
		}
		
		/*if(!afAnimalPedTasker) {
			afAnimalPedTasker = true;
			setTimeout(function() { afAnimalPedTasker = false; }, 2000);
			mp.peds.forEachInStreamRange(
				(ped, id) => {
					if(typeof(ped.controller) !== "undefined") {
						if(ped.controller == localPlayer) {
							if(typeof(ped.getVariable("ped.type")) !== "undefined" && typeof(ped.getVariable("ped.data")) !== "undefined") {
								let pedType = ped.getVariable("ped.type");
								if(pedType == "animal") {
									if(ped.getHealth() > 0) {
										let pedData = ped.getVariable("ped.data");
										if(mp.peds.exists(ped)) {
											if(pedData.agressive) { // в атаку от испуга, если животное агрессивное
												ped.setBlockingOfNonTemporaryEvents(true);
												ped.setFleeAttributes(0, false);
												ped.setCombatAttributes(46, true);
												ped.clearTasks();
												ped.taskPutDirectlyIntoMelee(localPlayer.handle, 10.0, -10.0, 0.0, false);
											}
											//ped.taskCombat(localPlayer.handle, 0, 16);
											//chatAPI.sysPush("<span style=\"color:#FF6146\"> * COMBAT MODE | "+ped.getHealth()+"</span>");
										}
									}
								}
							}
						}
					}
				}
			);
		}*/
	}
});

function tryAnimalMakeTask(pedRemoteId) {
	if(typeof(pedRemoteId) !== "undefined") {
		pedRemoteId = parseInt(pedRemoteId);
		let ped = mp.peds.atRemoteId(pedRemoteId);
		if(ped) {
			if(mp.peds.exists(ped)) {
				if(typeof(ped.controller) !== "undefined") {
					if(ped.controller == localPlayer) {
						if(typeof(ped.getVariable("ped.type")) !== "undefined" && typeof(ped.getVariable("ped.data")) !== "undefined") {
							let pedType = ped.getVariable("ped.type");
							if(pedType == "animal") {
								if(ped.getHealth() > 0) {
									let pedData = ped.getVariable("ped.data");
									if(mp.peds.exists(ped)) {
										if(pedData.agressive) {
											ped.setBlockingOfNonTemporaryEvents(true);
											ped.setFleeAttributes(0, false);
											ped.setCombatAttributes(46, true);
											ped.clearTasks();
										}
										
										ped.taskWanderStandard(10.0, 10);
										//ped.taskCombat(localPlayer.handle, 0, 16);
										//chatAPI.sysPush("<span style=\"color:#FF6146\"> * COMBAT MODE | "+ped.getHealth()+"</span>");
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

/*
mp.events.add("entityControllerChange", (entity, newController) => {
	if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146;\"> Controller changed: "+entity.type+"</span>");
	if(entity.type == "ped") {
		if(typeof(entity.getVariable('ped.type')) !== "undefined") {
			let pedType = entity.getVariable('ped.type');
			if(pedType == "animal") {
				//entity.taskWanderInArea(entity.position.x, entity.position.y, entity.position.z, 350.0, 300.0, 10.0);
			}
		}
	}
});
*/
}