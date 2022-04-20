{
/*
mp.keys.bind(0x49, true, function() { // I Key
	mp.gui.chat.push('!{#FF6146} * Маркеры на клиенте: ');
	for(var i in housesInStream) {
		let houseID = housesInStream[i]['id'];
		mp.gui.chat.push('!{#FF6146} * ID: '+houseID);
	}
});
*/

/*var vehParkMarkers = [ // Разгрузка пиломатериалов на древообрабатывающем заводе
	{"position":new mp.Vector3(-601.8714,5342.8735,70.4683-3.3),"heading":173.60,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(173.60),"width":3,"height":14}
];*/

mp.nametags.orderByDistance = true; // Рисовать теги имен в обратном порядке

var noColVehs = {};

var jumpChecker = false;

function isPlayerVisible(player) {
	if(player.isTracked() == false) mp.game.invoke("0x7D7A2E43E74E2EB8", player.handle); // void RequestPedVisibilityTracking(int /* Ped */ ped);
	return player.isTrackedVisible();
}

var vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false;

function checkVehRarkGoodHeading(vehHeading, markerHeading) {
	let result = (markerHeading - vehHeading + 180) % 360 - 180;
	return Math.abs(result < -180 ? result + 360 : result);
}

function vehParkChecker() {
	if(!localPlayer.vehicle) return false;
	if(!parkingVeh) return false;
	if(parkingVeh && mp.vehicles.exists(parkingVeh)) {
		//parkingVeh = localPlayer.vehicle;
		let vehPos = parkingVeh.position;
		
		vehParkMarkers.forEach(theMarker => {
			let markerPos = theMarker.position;
			let dist = mp.game.gameplay.getDistanceBetweenCoords(vehPos.x, vehPos.y, vehPos.z, markerPos.x, markerPos.y, markerPos.z, false);
			if(dist < 4.5) {
				if(dist < 1 && checkVehRarkGoodHeading(parkingVeh.getHeading(), theMarker.heading) < 3) {
					theMarker.color[0] = 0;
					theMarker.color[1] = 255;
					theMarker.color[2] = 0;
					theMarker.color[3] = 255;
					if(!goodVehParked && mp.game.invoke("0x4805D2B1D8CF94A9", localPlayer.handle) == 0) {
						goodVehParked = markerPos;
						theMarker.color[0] = 4;
						theMarker.color[1] = 36;
						theMarker.color[2] = 217;
					}else if(activeVehParking) {
						theMarker.color[0] = 4;
						theMarker.color[1] = 36;
						theMarker.color[2] = 217;
					}
				}else{
					theMarker.color[0] = 255;
					theMarker.color[1] = 0;
					theMarker.color[2] = 0;
					theMarker.color[3] = 200;
				}
			}else{
				theMarker.color[0] = 255;
				theMarker.color[1] = 150;
				theMarker.color[2] = 0;
				theMarker.color[3] = 150;
			}
			
			for (let i = 0; i < 4; i++) {
				theMarker.drawColor[i] += .03 * (theMarker.color[i] - theMarker.drawColor[i]);
			}
			mp.game1.graphics.drawMarker(43, markerPos.x, markerPos.y, markerPos.z, 0, 0, 0, 0, 0, theMarker.heading, theMarker.width, theMarker.height, 3, theMarker.drawColor[0], theMarker.drawColor[1], theMarker.drawColor[2], theMarker.drawColor[3], true, false, 0, false, "", "", false);
			mp.game1.graphics.drawMarker(22, markerPos.x, markerPos.y, markerPos.z + 2.3, theMarker.direction[0], theMarker.direction[1], 0, 270, 0, 0, 2, 2, 2, theMarker.drawColor[0], theMarker.drawColor[1], theMarker.drawColor[2], theMarker.drawColor[3], false, false, 0, false, "", "", false);
		});
		
		if(!activeVehParking && goodVehParked) {
			if(typeof(curTruckTask) !== "undefined") {
				if(curTruckTask) {
					if(curTruckTask.curPoint == "getCargo") {
						curTruckTask.curPoint = "gettingCargo";
						truckProcessor();
						activeVehParking = goodVehParked;
						return goodVehParked = false;
					}else if(curTruckTask.curPoint == "rideCargo") {
						curTruckTask.curPoint = "droppingCargo";
						truckProcessor();
						activeVehParking = goodVehParked;
						return goodVehParked = false;
					}else if(curTruckTask.curPoint == "cargoDropped") {
						curTruckTask.curPoint = "bazaBack";
						truckProcessor();
						activeVehParking = goodVehParked;
						return goodVehParked = false;
					}
					return false;
				}
			}
			if(typeof(curBusTask) !== "undefined") {
				if(curBusTask) {
					if(curBusTask.curPoint >= 0) {
						curBusTask.curPoint++;
						busProcessor();
						activeVehParking = goodVehParked;
						return goodVehParked = false;
					}
					return false;
				}
			}
			if(typeof(curCourierTask) !== "undefined") {
				if(curCourierTask) {
					if(curCourierTask.curPoint == "getCargo") {
						curCourierTask.curPoint = "gettingCargo";
						courierProcessor();
						activeVehParking = goodVehParked;
						return goodVehParked = false;
					}else if(curCourierTask.curPoint == "cargoDrop") {
						courierProcessor();
						activeVehParking = goodVehParked;
						return goodVehParked = false;
					}
					return false;
				}
			}
			if(typeof(finishGrabTruckPoint.blip) !== "undefined") {
				grabTruckDelivered();
				activeVehParking = goodVehParked;
				return goodVehParked = false;
			}
		}
	}
}

var gangColorsForRender = {
	"1":"~HUD_COLOUR_RED~",
	"2":"~HUD_COLOUR_GREEN~",
	"3":"~HUD_COLOUR_RADAR_ARMOUR~",
	"4":"~HUD_COLOUR_WHITE~",
	"5":"~HUD_COLOUR_YELLOW~",
	"6":"~HUD_COLOUR_REDDARK~",
	"7":"~HUD_COLOUR_PURPLE~",
	"8":"~HUD_COLOUR_NET_PLAYER3~",
	"9":"~HUD_COLOUR_NET_PLAYER4~",
	"10":"~HUD_COLOUR_NET_PLAYER5~",
	"11":"~HUD_COLOUR_NET_PLAYER6~",
	"12":"~HUD_COLOUR_NET_PLAYER7~",
	"13":"~HUD_COLOUR_NET_PLAYER8~",
	"14":"~HUD_COLOUR_NET_PLAYER9~",
	"15":"~HUD_COLOUR_NET_PLAYER10~",
	"16":"~HUD_COLOUR_NET_PLAYER11~",
	"17":"~HUD_COLOUR_NET_PLAYER12~",
	"18":"~HUD_COLOUR_NET_PLAYER13~",
	"19":"~HUD_COLOUR_NET_PLAYER14~",
	"20":"~HUD_COLOUR_NET_PLAYER15~",
	"21":"~HUD_COLOUR_NET_PLAYER16~",
	"22":"~HUD_COLOUR_NET_PLAYER17~",
	"23":"~HUD_COLOUR_NET_PLAYER18~",
	"24":"~HUD_COLOUR_NET_PLAYER19~",
	"25":"~HUD_COLOUR_NET_PLAYER20~",
	"26":"~HUD_COLOUR_NET_PLAYER21~",
	"27":"~HUD_COLOUR_NET_PLAYER22~",
	"28":"~HUD_COLOUR_NET_PLAYER23~",
	"29":"~HUD_COLOUR_NET_PLAYER24~",
	"30":"~HUD_COLOUR_NET_PLAYER25~",
	"31":"~HUD_COLOUR_NET_PLAYER26~",
	"32":"~HUD_COLOUR_NET_PLAYER27~",
	"33":"~HUD_COLOUR_NET_PLAYER28~",
	"34":"~HUD_COLOUR_NET_PLAYER29~",
	"35":"~HUD_COLOUR_NET_PLAYER30~",
	"36":"~HUD_COLOUR_NET_PLAYER31~",
	"37":"~HUD_COLOUR_NET_PLAYER32~",
	"38":"~HUD_COLOUR_GANG1~",
	"39":"~HUD_COLOUR_SILVER~",
	"40":"~HUD_COLOUR_MENU_DIMMED~",
	"41":"~HUD_COLOUR_NET_PLAYER18~",
	"42":"~HUD_COLOUR_NORTH_BLUE~",
	"43":"~HUD_COLOUR_FRANKLIN~",
	"44":"~HUD_COLOUR_TREVOR~",
	"45":"~HUD_COLOUR_GOLF_P1~",
	"46":"~HUD_COLOUR_GOLF_P2~",
	"47":"~HUD_COLOUR_GOLF_P3~",
	"48":"~HUD_COLOUR_GOLF_P4~",
	"49":"~HUD_COLOUR_STUNT_2~",
	"50":"~HUD_COLOUR_WAYPOINT~",
	"51":"~HUD_COLOUR_NET_PLAYER12~",
	"52":"~HUD_COLOUR_NET_PLAYER20_DARK~",
	"53":"~HUD_COLOUR_G7~",
	"54":"~HUD_COLOUR_NET_PLAYER21_DARK~",
	"55":"~HUD_COLOUR_NET_PLAYER27_DARK~",
	"56":"~HUD_COLOUR_LOW_FLOW_DARK~",
	"57":"~HUD_COLOUR_VIDEO_EDITOR_VIDEO~",
	"58":"~HUD_COLOUR_WAYPOINTDARK~",
	"59":"~HUD_COLOUR_CHOP~",
	"60":"~HUD_COLOUR_VIDEO_EDITOR_AMBIENT~",
	"61":"~HUD_COLOUR_DEGEN_MAGENTA~",
	"62":"~HUD_COLOUR_MENU_BLUE~",
	"63":"~HUD_COLOUR_NET_PLAYER24~",
	"64":"~HUD_COLOUR_MENU_GREEN~",
	"65":"~HUD_COLOUR_NET_PLAYER27_DARK~",
	"66":"~HUD_COLOUR_LOCATION~",
	"67":"~HUD_COLOUR_FRIENDLY~",
	"68":"~HUD_COLOUR_NET_PLAYER21~",
	"69":"~HUD_COLOUR_PICKUP~",
	"70":"~HUD_COLOUR_LOCATION~",
	"71":"~HUD_COLOUR_PM_MITEM_HIGHLIGHT~",
	"72":"~HUD_COLOUR_SCRIPT_VARIABLE~",
	"73":"~HUD_COLOUR_LOCATION~",
	"74":"~HUD_COLOUR_FRIENDLY~",
	"75":"~HUD_COLOUR_CHOP~",
	"76":"~HUD_COLOUR_CONTROLLER_CHOP~",
	"77":"~HUD_COLOUR_VIDEO_EDITOR_VIDEO~",
	"78":"~HUD_COLOUR_HB_BLUE~",
	"79":"~HUD_COLOUR_CHOP~",
	"80":"~HUD_COLOUR_VIDEO_EDITOR_VIDEO~",
	"81":"~HUD_COLOUR_GOLF_P3~",
	"82":"~HUD_COLOUR_FRANKLIN~",
	"83":"~HUD_COLOUR_WAYPOINT~",
	"84":"~HUD_COLOUR_MICHAEL~",
	"85":"~HUD_COLOUR_INGAME_BG~"
}

const maxDistance = 20;
const width = 0.04;
const height = 0.0075;
const border = 0.001;

var renderCounter = 0;

mp.game.graphics.requestStreamedTextureDict("mplobby", true);
mp.game.graphics.requestStreamedTextureDict("mpleaderboard", true);
mp.game.graphics.requestStreamedTextureDict("pilotschool", true);

let chatAnimation = 0;

mp.events.add('render', (nametags) => {
	if(!mp.game.ui.isPauseMenuActive()) {
		mp.game.player.setRunSprintMultiplierFor(0.5);
		if(ammoInUse == "false") mp.game.invoke("0x3EDCB0505123623B", localPlayer.handle, true, mp.game.joaat("weapon_fireextinguisher"));
		
		/*
		mp.game.graphics.drawText(JSON.stringify(noColVehs), [0.5, 0.005], { 
		  font: 7, 
		  color: [255, 255, 255, 185], 
		  scale: [1.2, 1.2], 
		  outline: true
		});
		if(localPlayer.vehicle) {
			if(typeof(noColVehs[localPlayer.vehicle.handle.toString()]) !== "undefined") {
				mp.vehicles.forEachInStreamRange(
					(veh, id) => {
						if(veh.handle.toString() != localPlayer.vehicle.handle.toString()) {
							let myTrailerCollideWithMe = false;
							let isTrailer = false;
							if(typeof(trailersPool[localPlayer.vehicle.handle.toString()]) !== "undefined") {
								if(typeof(trailersPool[localPlayer.vehicle.handle.toString()].trailer) !== "undefined") {
									if(trailersPool[localPlayer.vehicle.handle.toString()].trailer.handle == veh.handle) myTrailerCollideWithMe = true;
								}
							}
							if(typeof(veh.imTrailerData) !== "undefined") isTrailer = true;
							if(!myTrailerCollideWithMe && (!mp.game.invoke(`0x22AC59A870E6A669`, veh.handle, -1) || isTrailer)) {
								mp.game.invoke(`0xA53ED5520C07654A`, veh.handle, localPlayer.vehicle.handle, true);
								mp.game.invoke(`0xA53ED5520C07654A`, localPlayer.vehicle.handle, veh.handle, true);
							}
						}
					}
				);
			}else{
				mp.vehicles.forEachInStreamRange(
					(veh, id) => {
						if(typeof(noColVehs[veh.handle.toString()]) !== "undefined") {
							let isTrailer = false;
							if(typeof(veh.imTrailerData) !== "undefined") isTrailer = true;
							if(!mp.game.invoke(`0x22AC59A870E6A669`, veh.handle, -1) || isTrailer) {
								mp.game.invoke(`0xA53ED5520C07654A`, veh.handle, localPlayer.vehicle.handle, true);
								mp.game.invoke(`0xA53ED5520C07654A`, localPlayer.vehicle.handle, veh.handle, true);
							}
						}
					}
				);
			}
		}
		Object.keys(noColVehs).map(function(handle1, index) {
			if(!mp.vehicles.exists(mp.vehicles.atHandle(parseInt(handle1)))) delete noColVehs[handle1];
		});
		*/
		
		if(typeof(vehParkMarkers) !== "undefined" && Object.keys(vehParkMarkers).length > 0) vehParkChecker();
		
		chatAnimation = chatAnimation + 4;
		if(chatAnimation >= 600) chatAnimation = 0;
		
		const graphics = mp.game.graphics;
		const screenRes = graphics.getScreenResolution(0, 0);
		
		if(localPlayer.getStealthMovement()) localPlayer.setStealthMovement(false, "DEFAULT_ACTION");
		if(localPlayer.isPerformingStealthKill()) localPlayer.clearTasksImmediately(); // anti stealth kill (left ctrl)
		
	/*
		mp.game.invoke('0x4757F00BC6323CFE', 3425972830, 0); // Выключить урон от пожарки
		mp.game.invoke('0x4757F00BC6323CFE', 1741783703, 0); // Выключить урон от пожарки
	*/
	
		mp.game.ui.hideHudComponentThisFrame(1);
		mp.game.ui.hideHudComponentThisFrame(2);
		mp.game.ui.hideHudComponentThisFrame(3);
		mp.game.ui.hideHudComponentThisFrame(4);
		mp.game.ui.hideHudComponentThisFrame(5);
		mp.game.ui.hideHudComponentThisFrame(6);
		mp.game.ui.hideHudComponentThisFrame(7);
		mp.game.ui.hideHudComponentThisFrame(8);
		mp.game.ui.hideHudComponentThisFrame(9);
		mp.game.ui.hideHudComponentThisFrame(10);
		mp.game.ui.hideHudComponentThisFrame(11);
		mp.game.ui.hideHudComponentThisFrame(12);
		mp.game.ui.hideHudComponentThisFrame(13);
		mp.game.ui.hideHudComponentThisFrame(15);
		mp.game.ui.hideHudComponentThisFrame(19);
		
		if(mp.game.controls.isControlJustPressed(1, 25) || mp.game.controls.isControlJustPressed(1, 68) || mp.game.controls.isControlJustPressed(1, 91)) {
			if(mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle)) {
				let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle);
				if(weaponHash !== -1569615261 && weaponHash !== 1737195953) mp.game.player.setLockon(false);
				else mp.game.player.setLockon(true);
			}else{
				mp.game.player.setLockon(true);
			}
		}
		
		if(BLOCK_CONTROLS) {
			//mp.game.invoke('0x5E6CC07646BBEAB8', mp.players.local.handle, true); // DISABLE_PLAYER_FIRING
			controls.disableControlAction(0, 257, true); // СТРЕЛЬБА
			controls.disableControlAction(0, 22, true);
			controls.disableControlAction(2, 25, true);
			controls.disableControlAction(0, 23, true); // INPUT ENTER
			controls.disableControlAction(0, 75, true); // INPUT VEH_EXIT
			
			controls.disableControlAction(2, 24, true);
			controls.disableControlAction(2, 69, true);
			controls.disableControlAction(2, 70, true);
			controls.disableControlAction(2, 92, true);

			controls.disableControlAction(2, 140, true);
			controls.disableControlAction(2, 141, true);
			controls.disableControlAction(2, 263, true);
			controls.disableControlAction(2, 264, true);
		}
		
		if(inCasino) {
			controls.disableControlAction(0, 257, true); // СТРЕЛЬБА
			controls.disableControlAction(0, 22, true);
			controls.disableControlAction(2, 25, true);
			controls.disableControlAction(0, 23, true); // INPUT ENTER
			
			controls.disableControlAction(2, 24, true);
			controls.disableControlAction(2, 69, true);
			controls.disableControlAction(2, 70, true);
			controls.disableControlAction(2, 92, true);

			controls.disableControlAction(2, 140, true);
			controls.disableControlAction(2, 141, true);
			controls.disableControlAction(2, 263, true);
			controls.disableControlAction(2, 264, true);
		}
		
		// Отключить убийство прикладом в ближнем бою
		if(mp.game.invoke('0x475768A975D5AD17', localPlayer.handle, 6)) {
			controls.disableControlAction(0, 140, true);
			controls.disableControlAction(0, 141, true);
			controls.disableControlAction(0, 142, true);
		}
		
		// Сток оружие
		controls.disableControlAction(1, 37, true);
		
		// Читы офф
		controls.disableControlAction(1, 243, true);
				
		// Радейка офф
		controls.disableControlAction(27, 81, true);
		controls.disableControlAction(27, 82, true);
		controls.disableControlAction(27, 83, true);
		controls.disableControlAction(27, 84, true);
		controls.disableControlAction(27, 85, true);
		
		// Управление светом офф
		controls.disableControlAction(27, 74, true);
		
		// F-G Keys (Посадка в авто)
		controls.enableControlAction(0, 23, true);
		controls.disableControlAction(0, 58, true);
		
		// Switch колёсиком и табом в авто выкл
		controls.disableControlAction(24, 37, true);
		controls.disableControlAction(27, 99, true);
		controls.disableControlAction(27, 100, true);
		controls.disableControlAction(27, 261, true);
		controls.disableControlAction(27, 262, true);
		
		if(rechargeTimer) mp.game.player.setHealthRechargeMultiplier(0.0);
		else mp.game.player.setHealthRechargeMultiplier(1.0);
		
		if(specToID != -1) {
			let specTo = mp.players.atRemoteId(specToID);
			if(specTo) {
				localPlayer.position = new mp.Vector3(specTo.position.x, specTo.position.y, specTo.position.z - 4);
				if(localPlayer.getAlpha()) localPlayer.setAlpha(0);
				mp.game.invoke('0x8BBACBF51DA047A8', specTo.handle); // заменяет у главной камеры "цель"
			}
		}else{
			if(localPlayer.getAlpha() != 255) localPlayer.resetAlpha();
		}
		
		/*
		if(!localPlayer.isInAnyVehicle(false) && !localPlayer.isDead()) {
	        if(!actMenu) {
		        actEntity = getLookingAtEntity();
				getNearestObjects();
			}else{
				if(actEntity) actEntity = false;
			}
		}else{
            getNearestObjects();
            if(actEntity != nearestObject) actEntity = false;
		}

	    if (nearestObject && (!actEntity || actEntity.type != "object")) {
		    mp.game.graphics.drawText("Взаимодействать на [ Z ]", [nearestObject.position.x, nearestObject.position.y, nearestObject.position.z], {
			    font: 0,
	            color: [255, 255, 255, 185],
		        scale: [0.4, 0.4],
			    outline: true
			});
		}else if(actEntity && !localPlayer.isInAnyVehicle(false)) {
			mp.game.graphics.drawText("Для взаимодействия, нажмите [ Z ]", [actEntity.position.x, actEntity.position.y, actEntity.position.z], {
				font: 0,
				color: [255, 255, 255, 185],
				scale: [0.25, 0.25],
				outline: true
			});
		}
		*/
		
		let myPos = localPlayer.position;
		/*if(mp.peds.exists(playerPedPreview)) {
			if(playerPedPreview.handle != 0) playerPedPreview.position = new mp.Vector3(myPos.x, myPos.y, myPos.z-1);
		}*/
		
		/*if(imGodeFuckingMode) {
			for (let i = 0; i < 650; i++) {
				mp.game.graphics.drawRect(getRandomInt(0,screenRes.x), getRandomInt(0,screenRes.y), getRandomInt(10,20), getRandomInt(10,20), getRandomInt(0,50), getRandomInt(0,50), getRandomInt(0,50), getRandomInt(200,255));
			}
		}*/
		
		let myFraction = {};
		if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") myFraction = localPlayer.getVariable("player.fraction");
		
		if(localPlayer.vehicle) {
			if(airCatCityCheckPoint) {
				let theVeh = localPlayer.vehicle;
				let vehPos = theVeh.position;
				mp.game.graphics.drawPoly(vehPos.x-0.5, vehPos.y-0.5, vehPos.z, vehPos.x+0.5, vehPos.y+0, vehPos.z, airCatCityCheckPoint.posData.x, airCatCityCheckPoint.posData.y, airCatCityCheckPoint.posData.z, 42, 193, 79, 85);
				mp.game.graphics.drawPoly(vehPos.x+0.5, vehPos.y+0.5, vehPos.z, vehPos.x-0.5, vehPos.y-0.5, vehPos.z, airCatCityCheckPoint.posData.x, airCatCityCheckPoint.posData.y, airCatCityCheckPoint.posData.z, 42, 193, 79, 85);
			}else if(airCheckpoint) {
				let theVeh = localPlayer.vehicle;
				let vehPos = theVeh.position;
				mp.game.graphics.drawPoly(vehPos.x-0.5, vehPos.y-0.5, vehPos.z, vehPos.x+0.5, vehPos.y+0, vehPos.z, airCheckpoint.posData.x, airCheckpoint.posData.y, airCheckpoint.posData.z, 42, 193, 79, 85);
				mp.game.graphics.drawPoly(vehPos.x+0.5, vehPos.y+0.5, vehPos.z, vehPos.x-0.5, vehPos.y-0.5, vehPos.z, airCheckpoint.posData.x, airCheckpoint.posData.y, airCheckpoint.posData.z, 42, 193, 79, 85);
			}
		}else{
			/*if(controls.isControlPressed(0, 22) && !localPlayer.isDead() && !jumpChecker) {
				if(localPlayer.getHeightAboveGround() < 1) {
					jumpChecker = localPlayer.position;
					let myRot = localPlayer.getHeading();
					
					jumpChecker.x = jumpChecker.x + Math.sin(Math.radians(-myRot))*2.5;
					jumpChecker.y = jumpChecker.y + Math.cos(Math.radians(-myRot))*2.5;
					jumpChecker.z = mp.game.gameplay.getGroundZFor3dCoord(jumpChecker.x, jumpChecker.y, jumpChecker.z, parseFloat(0), false)+1;
	
					setTimeout(() => {
						if(jumpChecker) {
							if(typeof(jumpChecker.z) !== "undefined" && localPlayer.getHeightAboveGround() > 1) {
								let raznitca = localPlayer.position.z - jumpChecker.z;
								chatAPI.sysPush("<span style=\"color:#FF6146\"> * Читосики: "+localPlayer.getHeightAboveGround()+" | Выс. пер. тобой: "+jumpChecker.z+" | Твоя высота: "+localPlayer.position.z+" | Разн: "+(localPlayer.position.z - jumpChecker.z)+"</span>");
								//if(jumpChecker.z != 1 && raznitca > 1.1) return antiCheatDetected('Читы, супер-прыжок');
							}
							jumpChecker = false;
						}
					}, 1000);
	
				}
			}*/
		}
		
		if(typeof(damagedList) !== "undefined") {
			damagedList.forEach((hitObject) => {
				if(!hitObject.isDeath) {
					if(hitObject.boneIndex == 20) mp.game.graphics.drawText("- "+hitObject.minusHP.toString()+" ~r~ГОЛОВА~w~!", [hitObject.position.x, hitObject.position.y, hitObject.position.z + 1.3], { font: 0, centre: true, color: [255, 255, 255, 155 - hitObject.count], scale: [0.25, 0.25], outline: true });
					else mp.game.graphics.drawText("- "+hitObject.minusHP.toString(), [hitObject.position.x, hitObject.position.y, hitObject.position.z + 1.3], { font: 0, centre: true, color: [255, 255, 255, 155 - hitObject.count], scale: [0.25, 0.25], outline: true });
				}else{
					mp.game.graphics.drawText("УБИТ!", [hitObject.position.x, hitObject.position.y, hitObject.position.z + 1.3], { font: 0, centre: true, color: [203, 52, 52, 155 - hitObject.count], scale: [0.35, 0.35], outline: true });
				}
				hitObject.count += 1;
				hitObject.position.z += 0.01;
				if(hitObject.count > 155) {
					var find = damagedList.findIndex(elem => elem == hitObject);
					damagedList.splice(find, 1);
				}
			});
		}
		
		/*if(typeof(trasserLinks) !== "undefined" && Object.keys(trasserLinks).length > 0) {
			for(let tr in trasserLinks) {
				if(typeof(trasserLinks[tr]) !== "undefined") {
					if(typeof(trasserLinks[tr].from) !== "undefined" && typeof(trasserLinks[tr].to) !== "undefined") {
						let from = trasserLinks[tr].from;
						let to = trasserLinks[tr].to;
						mp.game.graphics.drawLine(from.x-0.001, from.y-0.001, from.z-0.001, to.x+0.001, to.y+0.001, to.z+0.001, 108, 216, 134, 200);
						mp.game.graphics.drawLine(from.x, from.y, from.z, to.x, to.y, to.z, 108, 216, 134, 200);
						mp.game.graphics.drawLine(from.x+0.001, from.y+0.001, from.z+0.001, to.x+0.001, to.y+0.001, to.z+0.001, 108, 216, 134, 200);
					}
				}
			}
		}*/
		
		/*mp.vehicles.forEachInStreamRange(
			(vehicle, id) => {
				let frameTime = parseFloat(mp.game.invokeFloat('0x15C40837039FFAF7'));
				let theVelocity = vehicle.getVelocity();
				let drawPos = vehicle.position;
				drawPos.x = drawPos.x + theVelocity.x * frameTime;
				drawPos.y = drawPos.y + theVelocity.y * frameTime;
				drawPos.z = drawPos.z + theVelocity.z * fфrameTime;
				mp.game.graphics.setDrawOrigin(drawPos.x, drawPos.y, drawPos.z, 0);
				let x = 0, y = 0;
				graphics.drawText("CONTROLLER: ("+(vehicle.controller ? vehicle.controller.name : "null")+")", [x, y], {
					font: 4,
					color: [255,255,255,255],
					scale: [0.3, 0.3],
					outline: true
				});
				mp.game.invoke('0xFF0B610F6BE0D7AF');
			}
		);*/
		
		mp.players.forEachInStreamRange(
			(player, id) => {
				//let plPos = player.position; 
				if(typeof(player.getVariable("player.id")) !== "undefined") {
					if(player != localPlayer) {
						if(typeof(player.getVariable("player.passive")) !== "undefined") {
							if(player.getVariable("player.passive")) {
								//entity.setAlpha(200);
								player.setNoCollision(localPlayer.handle, true);
								localPlayer.setNoCollision(player.handle, true);
							}
						}
						if(player.getVariable("player.spec")) player.position = new mp.Vector3(25000, 25000, 7000);
						mp.game.invoke("0x476AE72C1D19D1A8", player.handle, 0);
						
						let parachuteState = player.getParachuteState();
						if(parachuteState >= 0 && parachuteState <= 2) parachuteProcessor(player, parachuteState.toString());
						
						if(!hideHud) {
							if(player.isOnScreen() && !player.getVariable("player.spec")) {
								let plPos = player.getBoneCoords(12844, 0, 0, 0);
								
								//mp.game.graphics.drawLine(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, 255, 255, 255, 255);
								let distance = mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true);
								
								if(distance < maxDistance && (player.getVariable("player.train") || isPlayerVisible(player))) {
									//let sizeCoef = (distance / maxDistance);
									
									if(!player.vehicle) {
										mp.game.graphics.setDrawOrigin(plPos.x, plPos.y, plPos.z, 0);
									}else{
										let frameTime = parseFloat(mp.game.invokeFloat('0x15C40837039FFAF7'));
										let theVelocity = player.vehicle.getVelocity();
										let drawPos = plPos;
										drawPos.x = drawPos.x + theVelocity.x * frameTime;
										drawPos.y = drawPos.y + theVelocity.y * frameTime;
										drawPos.z = drawPos.z + theVelocity.z * frameTime;
										mp.game.graphics.setDrawOrigin(drawPos.x, drawPos.y, drawPos.z, 0);
									}
									let x = 0, y = -0.128;
									
									let playerID = "NAN";
									if(typeof(player.getVariable("player.id") !== "undefined")) playerID = player.getVariable("player.id");
									
									var health = player.getHealth();
									if(health > 100) health = health / 2;
									health = health / 100;
									//health = health > 100 ? 1.0 : (health / 100);
								   
									var armour = player.getArmour() / 100;
									
									let playerFraction = {}
									if(typeof(player.getVariable("player.fraction")) !== "undefined") playerFraction = player.getVariable("player.fraction");
									
									let afkText = "";
									if(typeof(player.getVariable("player.afk")) !== "undefined") {
										if(player.getVariable("player.afk")) afkText = " ~w~[ ~c~AFK ~w~] ";
										else afkText = "";
									}
									
									if(!player.vehicle) {
										if(player.isTypingInTextChat || (voiceManager.listeners.indexOf(player) !== -1 && player.isVoiceActive)) {
											y += 0.0120;
											y += (distance/400);
											
											if(player.isTypingInTextChat) {
												if(chatAnimation >= 0 && chatAnimation <= 199) {
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x-0.005, y, 0.005, 0.010, 0, 255, 255, 255, chatAnimation);
												}else if(chatAnimation >= 200 && chatAnimation <= 399) {
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x-0.005, y, 0.005, 0.010, 0, 255, 255, 255, 200);
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x, y, 0.005, 0.010, 0, 255, 255, 255, chatAnimation);
												}else if(chatAnimation >= 400 && chatAnimation <= 599) {
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x-0.005, y, 0.005, 0.010, 0, 255, 255, 255, 200);
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x, y, 0.005, 0.010, 0, 255, 255, 255, 200);
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x+0.005, y, 0.005, 0.010, 0, 255, 255, 255, chatAnimation);
												}
												y += 0.010;
											}else if(voiceManager.listeners.indexOf(player) !== -1 && player.isVoiceActive) {
												mp.game.graphics.drawSprite("mplobby", "mp_charcard_stats_icons9", x, y, 0.010, 0.020, 0, 255, 255, 255, 255);
												y += 0.015;
											}
										}else{
											y += 0.0125;
											y += (distance/400);
										}
										
										if(typeof(chatVisualMessages["player"+player.remoteId]) !== "undefined") {
											if(chatVisualMessages["player"+player.remoteId]) {
												y += 0.010;
												let message = chatVisualMessages["player"+player.remoteId].clearMsg;
												if(message.length > 40) message = message.substring(0, 40) + "...";
												mp.game.graphics.drawRect(x, y, message.length * 0.00395, 0.02, 0, 0, 0, 135);
												graphics.drawText(message, [x, y-0.01], {
													font: 4,
													color: [217, 217, 217, 200],
													scale: [0.3, 0.3],
													outline: true
												});
												y += 0.010;
											}
										}
										
										if(typeof(playerFraction.name) !== "undefined" && typeof(playerFraction.color) !== "undefined") {
											let gangText = gangColorsForRender[playerFraction.color]+"« "+playerFraction.name+" »";
											
											graphics.drawText(gangText, [x, y], {
												font: 4,
												color: [217, 217, 217, 200],
												scale: [0.3, 0.3],
												outline: true
											});
											
											y += 0.015;
										}
										
										if(typeof(player.fRankName) !== "undefined") {
											let fRankName = "~w~"+player.fRankName;
											
											graphics.drawText(fRankName, [x, y], {
												font: 4,
												color: [217, 217, 217, 200],
												scale: [0.25, 0.25],
												outline: true
											});
											
											y += 0.015;
										}
										
										let blocks = {"lvl":1};
										if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") blocks = player.getVariable("player.blocks");
										let lvlText = " "+blocks.lvl+" lvl.";
										
										let statusText = "";
										if(typeof(player.getVariable("player.status")) !== "undefined") {
											let tempPlayerStatus = player.getVariable("player.status");
											if(tempPlayerStatus == "genadm") statusText = "~r~";
											else if(tempPlayerStatus == "admin") statusText = "~o~";
											else if(tempPlayerStatus == "moder") statusText = "~b~";
											else if(tempPlayerStatus == "helper") statusText = "~y~";
											else if(typeof(blocks.premium) !== "undefined") statusText = "~p~";
										}
										
										graphics.drawText(afkText+statusText+player.name+" ~w~(ID "+playerID+")"+lvlText, [x, y], {
											font: 4,
											color: [255,255,255,255],
											scale: [0.35, 0.35],
											outline: true
										});
									
										//if(mp.game.player.isFreeAimingAtEntity(player.handle)) {
											if(!imGodeFuckingMode) {
												let y2 = y + 0.032;
												
												let healthColor = [235, 36, 39];
												if(typeof(player.getVariable("player.passive")) !== "undefined") {
													if(player.getVariable("player.passive")) healthColor = [180, 180, 180];
												}
												
												if(armour > 0) {
													let x2 = x - width / 2 - border / 2;
													
													graphics.drawRect(x2, y2, width + border * 2, 0.0085, 0, 0, 0, 200);
													graphics.drawRect(x2, y2, width, height, 150, 150, 150, 255);
													graphics.drawRect(x2 - width / 2 * (1 - health), y2, width * health, height, 255, 255, 255, 200);
													
													x2 = x + width / 2 + border / 2;
													
													graphics.drawRect(x2, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
													graphics.drawRect(x2, y2, width, height, 41, 66, 78, 255);
													graphics.drawRect(x2 - width / 2 * (1 - armour), y2, width * armour, height, 48, 108, 135, 200);
												}else{
													graphics.drawRect(x, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
													graphics.drawRect(x, y2, width, height, 45, 45, 45, 255);
													graphics.drawRect(x - width / 2 * (1 - health), y2, width * health, height, healthColor[0], healthColor[1], healthColor[2], 200);
												}
											}
										//}
									}else{
										if(player.isTypingInTextChat || (voiceManager.listeners.indexOf(player) !== -1 && player.voiceVolume > 0)) {
											y += 0.0120;
											y += (distance/400);
											
											if(player.isTypingInTextChat) {
												if(chatAnimation >= 0 && chatAnimation <= 199) {
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x-0.005, y, 0.005, 0.010, 0, 255, 255, 255, chatAnimation);
												}else if(chatAnimation >= 200 && chatAnimation <= 399) {
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x-0.005, y, 0.005, 0.010, 0, 255, 255, 255, 200);
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x, y, 0.005, 0.010, 0, 255, 255, 255, chatAnimation);
												}else if(chatAnimation >= 400 && chatAnimation <= 599) {
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x-0.005, y, 0.005, 0.010, 0, 255, 255, 255, 200);
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x, y, 0.005, 0.010, 0, 255, 255, 255, 200);
													mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_car_colour_bg", x+0.005, y, 0.005, 0.010, 0, 255, 255, 255, chatAnimation);
												}
												y += 0.010;
											}else if(voiceManager.listeners.indexOf(player) !== -1 && player.voiceVolume > 0) {
												mp.game.graphics.drawSprite("mplobby", "mp_charcard_stats_icons9", x, y, 0.010, 0.020, 0, 255, 255, 255, 255);
												y += 0.015;
											}
										}else{
											y += 0.0125;
											y += (distance/400);
										}
										
										if(typeof(chatVisualMessages["player"+player.remoteId]) !== "undefined") {
											if(chatVisualMessages["player"+player.remoteId]) {
												y += 0.010;
												let message = chatVisualMessages["player"+player.remoteId].clearMsg;
												if(message.length > 40) message = message.substring(0, 40) + "...";
												mp.game.graphics.drawRect(x, y, message.length * 0.00395, 0.02, 0, 0, 0, 135);
												graphics.drawText(message, [x, y-0.01], {
													font: 4,
													color: [217, 217, 217, 200],
													scale: [0.3, 0.3],
													outline: true
												});
												y += 0.010;
											}
										}

										if(typeof(playerFraction.name) !== "undefined" && typeof(playerFraction.color) !== "undefined") {
											let gangText = gangColorsForRender[playerFraction.color]+"« "+playerFraction.name+" »";
											
											graphics.drawText(gangText, [x, y], {
												font: 4,
												color: [217, 217, 217, 200],
												scale: [0.3, 0.3],
												outline: true
											});
											
											y += 0.015;
										}
										
										let blocks = {"lvl":1};
										if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") blocks = player.getVariable("player.blocks");
										let lvlText = " "+blocks.lvl+" lvl.";
										
										let statusText = "";
										if(typeof(player.getVariable("player.status")) !== "undefined") {
											let tempPlayerStatus = player.getVariable("player.status");
											if(tempPlayerStatus == "genadm") statusText = "~r~";
											else if(tempPlayerStatus == "admin") statusText = "~o~";
											else if(tempPlayerStatus == "moder") statusText = "~b~";
											else if(tempPlayerStatus == "helper") statusText = "~y~";
											else if(typeof(blocks.premium) !== "undefined") statusText = "~p~";
										}
										
										graphics.drawText(afkText+statusText+player.name+" ~w~(ID "+playerID+")"+lvlText, [x, y], {
											font: 4,
											color: [255,255,255,255],
											scale: [0.35, 0.35],
											outline: true
										});
										
										if(!imGodeFuckingMode) {
											let y2 = y + 0.032;
											
											let healthColor = [235, 36, 39];
											if(typeof(player.getVariable("player.passive")) !== "undefined") {
												if(player.getVariable("player.passive")) healthColor = [180, 180, 180];
											}
											
											if(armour > 0) {
												let x2 = x - width / 2 - border / 2;
												
												graphics.drawRect(x2, y2, width + border * 2, 0.0085, 0, 0, 0, 200);
												graphics.drawRect(x2, y2, width, height, 150, 150, 150, 255);
												graphics.drawRect(x2 - width / 2 * (1 - health), y2, width * health, height, 255, 255, 255, 200);

												x2 = x + width / 2 + border / 2;
											   
												graphics.drawRect(x2, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
												graphics.drawRect(x2, y2, width, height, 41, 66, 78, 255);
												graphics.drawRect(x2 - width / 2 * (1 - armour), y2, width * armour, height, 48, 108, 135, 200);
											}else{
												graphics.drawRect(x, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
												graphics.drawRect(x, y2, width, height, 45, 45, 45, 255);
												graphics.drawRect(x - width / 2 * (1 - health), y2, width * health, height, healthColor[0], healthColor[1], healthColor[2], 200);
											}
										}
									}
									
									mp.game.invoke('0xFF0B610F6BE0D7AF');
								}else if(distance < (maxDistance + 300)) {
									if(typeof(myFraction.id) !== "undefined") {
										let playerFraction = {}
										if(typeof(player.getVariable("player.fraction")) !== "undefined") playerFraction = player.getVariable("player.fraction");
										if(typeof(playerFraction.id) !== "undefined") {
											if(playerFraction.id == myFraction.id) {
												mp.game.graphics.setDrawOrigin(plPos.x, plPos.y, plPos.z, 0);
												let x = 0, y = -0.065;
												y += 0.0125;
												y += (distance/3200);
												
												mp.game.graphics.drawSprite("pilotschool", "hudarrow", x, y, 0.010, 0.020, 180, 71, 226, 60, 200);
												
												y += 0.0140;
												
												let playerID = "NAN";
												if(typeof(player.getVariable("player.id") !== "undefined")) playerID = player.getVariable("player.id");
												graphics.drawText(player.name+" ("+playerID+")", [x, y], {
													font: 4,
													color: [71, 226, 60, 200],
													scale: [0.25, 0.25],
													outline: true
												});
												
												mp.game.invoke('0xFF0B610F6BE0D7AF');
											}
										}
									}
								}
							}
						}
					}
				}
			}
		);
		
		if(controls.isControlPressed(0, 24)) { // ЛКМ
			if(cameraPhone && !makingPhotoWithCamera) {
				makingPhotoWithCamera = true;
				makePhotoFromMobileCamera();
			}
		}
		
		if(hideHud) return false;
		
		/*mp.vehicles.forEachInStreamRange(
			(veh, id) => {
				if(veh.isOnScreen()) {
					let drawPos = veh.position;
					
					mp.game.graphics.setDrawOrigin(drawPos.x, drawPos.y, drawPos.z, 0);
					let x = 0, y = -0.112;
					
					let distance = mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, veh.position.x, veh.position.y, veh.position.z, true);
					
					y += 0.015;
					y += (distance/400);
					
					let controllerText = "Нет контроллера"
					if(veh.controller) controllerText = veh.controller.name;
					
					graphics.drawText("~w~"+controllerText, [x, y], {
						font: 4,
						color: [217, 217, 217, 200],
						scale: [0.4, 0.4],
						outline: true
					});
					
					mp.game.invoke('0xFF0B610F6BE0D7AF');
				}
			}
		);*/
		
		mp.peds.forEachInStreamRange(
			(ped, id) => {
				if(ped.isOnScreen() && typeof(ped.getVariable("ped.name")) !== "undefined") {
					let pedPos = ped.getBoneCoords(12844, 0, 0, 0);
					
					let pedType = false;
					if(typeof(ped.getVariable("ped.type")) !== "undefined") pedType = ped.getVariable("ped.type");
						
					let distance = mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, pedPos.x, pedPos.y, pedPos.z, true);
					
					if(distance < 13) {
						//let sizeCoef = (distance / maxDistance);
						
						let frameTime = parseFloat(mp.game.invokeFloat('0x15C40837039FFAF7'));
						let theVelocity = ped.getVelocity();
						if(ped.vehicle) theVelocity = ped.vehicle.getVelocity();
						let drawPos = pedPos;
						drawPos.x = drawPos.x + theVelocity.x * frameTime;
						drawPos.y = drawPos.y + theVelocity.y * frameTime;
						drawPos.z = drawPos.z + theVelocity.z * frameTime;
						
						mp.game.graphics.setDrawOrigin(drawPos.x, drawPos.y, drawPos.z, 0);
						
						let x = 0, y = -0.112;
						
						if(!ped.vehicle) {
							y += 0.015;
							y += (distance/400);
							
							if(pedType != "animal") {
								graphics.drawText("~w~"+ped.getVariable("ped.name"), [x, y], {
									font: 4,
									color: [217, 217, 217, 200],
									scale: [0.4, 0.4],
									outline: true
								});
								
								if(typeof(ped.getVariable("ped.desc")) !== "undefined") {
									y += 0.02;
									
									graphics.drawText("~w~"+ped.getVariable("ped.desc"), [x, y], {
										font: 4,
										color: [255,255,255,255],
										scale: [0.3, 0.3],
										outline: true
									});
								}
							}
							
							/*if(ped.controller) {
								y += 0.02;
								
								graphics.drawText("~w~"+ped.controller.name, [x, y], {
									font: 4,
									color: [255,255,255,255],
									scale: [0.3, 0.3],
									outline: true
								});
							}*/
							
							if(pedType == "dealer") {
								y += 0.015;
								
								graphics.drawText("~w~подойдите и нажмите « ~o~E ~w~»", [x, y], {
									font: 4,
									color: [255,255,255,255],
									scale: [0.25, 0.25],
									outline: true
								});
								
								mp.game1.graphics.drawMarker(
									27,
									pedPos.x, pedPos.y, pedPos.z - 1.55,
									0, 0, 0,
									0, 0, 90,
									1.0, 1.0, 1.0,
									241, 152, 11, 255,
									false, false, 2,
									false, "", "",false
								);
							}else if(pedType == "animal") {
								if(ped.getHealth() <= 0) {
									let pedData = ped.getVariable("ped.data");
									let pedAge = "молодая тушка";
									if(pedData.age == "adult") pedAge = "взрослая тушка";
									else if(pedData.age == "old") pedAge = "старая тушка";
									
									graphics.drawText("~w~"+ped.getVariable("ped.name"), [x, y], {
										font: 4,
										color: [217, 217, 217, 200],
										scale: [0.4, 0.4],
										outline: true
									});
								
									y += 0.025;
									
									graphics.drawText("~w~Примерный возраст ~o~"+pedAge, [x, y], {
										font: 4,
										color: [255,255,255,255],
										scale: [0.25, 0.25],
										outline: true
									});
									
									/*if(ped.controller) {
										y += 0.020;
										
										graphics.drawText("~w~[~o~DEBUG~w~] Контроллер ~o~"+ped.controller.name, [x, y], {
											font: 4,
											color: [255,255,255,255],
											scale: [0.25, 0.25],
											outline: true
										});
									}else{
										y += 0.020;
										
										graphics.drawText("~w~[~o~DEBUG~w~] Контроллера ~o~НЕТ", [x, y], {
											font: 4,
											color: [255,255,255,255],
											scale: [0.25, 0.25],
											outline: true
										});
									}*/
									
									/*if(ped.position) {
										y += 0.020;
										
										graphics.drawText("~w~[~o~DEBUG~w~] ~o~"+JSON.stringify(pedPos), [x, y], {
											font: 4,
											color: [255,255,255,255],
											scale: [0.25, 0.25],
											outline: true
										});
									}*/
									
									/*y += 0.020;
									
									graphics.drawText("~w~[~o~DEBUG~w~] Качество ~o~"+ped.quality, [x, y], {
										font: 4,
										color: [255,255,255,255],
										scale: [0.25, 0.25],
										outline: true
									});*/
									
									y += 0.020;
									
									graphics.drawText("~w~подойдите и зажмите « ~o~E ~w~» что бы освежевать", [x, y], {
										font: 4,
										color: [255,255,255,255],
										scale: [0.25, 0.25],
										outline: true
									});
									
									y += 0.015;
									
									graphics.drawText("~w~требуется инструмент « ~o~охотничий нож ~w~»", [x, y], {
										font: 4,
										color: [255,255,255,255],
										scale: [0.25, 0.25],
										outline: true
									});
								}
							}
						}
						
						mp.game.invoke('0xFF0B610F6BE0D7AF');
					}
				}
			}
		);
		
		if(typeof(housesInStream) !== "undefined" && Object.keys(housesInStream).length > 0) {
			for(var i in housesInStream) {
				let houseData = housesInStream[i]['data'];
				if(houseData) {
					if(typeof(houseData.name) === "undefined") {
						let textPosX = parseFloat(houseData.pos[0]);
						let textPosY = parseFloat(houseData.pos[1]);
						let textPosZ = parseFloat(houseData.pos[2]);
						let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
						//mp.gui.chat.push('!{#FF6146} X: '+textPosX+' | Y: '+textPosY+' | Z: '+textPosZ+' | Dist: '+dist);
						if (dist < 85) {
							if(housesInStream[i]['alpha'] < 185) housesInStream[i]['alpha'] = housesInStream[i]['alpha'] + 2;
							let forSale ="Жильё продаётся";
							if(houseData.own > 0) forSale ="Частная собственность";
							graphics.drawText(forSale, [textPosX, textPosY, textPosZ+0.85], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.4, 0.4],
								outline: true
							});
							
							let getStreet = mp.game.pathfind.getStreetNameAtCoord(textPosX, textPosY, textPosZ, 0, 0);
							let zoneName = mp.game.zone.getNameOfZone(textPosX, textPosY, textPosZ);

							let realZoneName = "San Andreas";
							if(zoneNamesShort.includes(zoneName)) {
								let zoneID = zoneNamesShort.indexOf(zoneName);
								realZoneName = zoneNames[zoneID];
							}
							let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
							
							graphics.drawText(realZoneName+", "+street+", "+i, [textPosX, textPosY, textPosZ+0.65], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
							
							graphics.drawText("Стоимость: "+houseData.cost.replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1')+" руб.", [textPosX, textPosY, textPosZ+0.55], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
							
							let owner ="Государство";
							if(houseData.ownlog.length > 1) {
								owner = houseData.ownlog+" ["+houseData.own+"]";
							}
							graphics.drawText("Владелец: "+owner, [textPosX, textPosY, textPosZ+0.45], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
							
							graphics.drawText("Кол-во мест: "+houseData.park, [textPosX, textPosY, textPosZ+0.35], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
						}else{
							housesInStream[i]['alpha'] = 0;
						}
					}else{
						let textPosX = parseFloat(houseData.pos.x);
						let textPosY = parseFloat(houseData.pos.y);
						let textPosZ = parseFloat(houseData.pos.z);
						let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
						//mp.gui.chat.push('!{#FF6146} X: '+textPosX+' | Y: '+textPosY+' | Z: '+textPosZ+' | Dist: '+dist);
						if (dist < 85) {
							if(housesInStream[i]['alpha'] < 185) housesInStream[i]['alpha'] = housesInStream[i]['alpha'] + 2;
							
							mp.game.graphics.drawSpotLight(textPosX, textPosY, textPosZ+1.25, 0, 0, -1, 223, 138, 48, 3, 10, 5, 35, 1);
							graphics.drawText(houseData.name, [textPosX, textPosY, textPosZ+1.05], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.4, 0.4],
								outline: true
							});
							
							let getStreet = mp.game.pathfind.getStreetNameAtCoord(textPosX, textPosY, textPosZ, 0, 0);
							let zoneName = mp.game.zone.getNameOfZone(textPosX, textPosY, textPosZ);

							let realZoneName = "San Andreas";
							if(zoneNamesShort.includes(zoneName)) {
								let zoneID = zoneNamesShort.indexOf(zoneName);
								realZoneName = zoneNames[zoneID];
							}
							let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
							
							graphics.drawText(realZoneName+", "+street+", "+i, [textPosX, textPosY, textPosZ+0.85], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
							
							graphics.drawText(houseData.desc, [textPosX, textPosY, textPosZ+0.75], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
							
							graphics.drawText("Квартир в доме: "+houseData.maxFlats, [textPosX, textPosY, textPosZ+0.55], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
							
							graphics.drawText("Осталось квартир: "+houseData.leftFlats, [textPosX, textPosY, textPosZ+0.45], {
								font: 4,
								color: [255, 255, 255, housesInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
						}
					}
				}
			}
		}
		
		if(typeof(businessesInStream) !== "undefined" && Object.keys(businessesInStream).length > 0) {
			for(var i in businessesInStream) {
				let businessData = businessesInStream[i]['data'];
				if(businessData) {
					let textPosX = parseFloat(businessData.pos[0]);
					let textPosY = parseFloat(businessData.pos[1]);
					let textPosZ = parseFloat(businessData.pos[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
					//mp.gui.chat.push('!{#FF6146} X: '+textPosX+' | Y: '+textPosY+' | Z: '+textPosZ+' | Dist: '+dist);
					if (dist < 85) {
						if(businessesInStream[i]['alpha'] < 185) businessesInStream[i]['alpha'] = businessesInStream[i]['alpha'] + 2;
						
						graphics.drawText(businessData.name, [textPosX, textPosY, textPosZ+1.05], {
							font: 4,
							color: [255, 255, 255, businessesInStream[i]['alpha']],
							scale: [0.5, 0.5],
							outline: true
						});
						
						let forSale ="Коммерция продаётся";
						if(businessData.own > 0) forSale ="Частная коммерция";
						graphics.drawText(forSale, [textPosX, textPosY, textPosZ+0.85], {
							font: 4,
							color: [255, 255, 255, businessesInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						let getStreet = mp.game.pathfind.getStreetNameAtCoord(textPosX, textPosY, textPosZ, 0, 0);
						let zoneName = mp.game.zone.getNameOfZone(textPosX, textPosY, textPosZ);

						let realZoneName = "San Andreas";
						if(zoneNamesShort.includes(zoneName)) {
							let zoneID = zoneNamesShort.indexOf(zoneName);
							realZoneName = zoneNames[zoneID];
						}
						let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
						
						graphics.drawText(realZoneName+", "+street+", "+i, [textPosX, textPosY, textPosZ+0.65], {
							font: 4,
							color: [255, 255, 255, businessesInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
						
						graphics.drawText("Стоимость: "+businessData.cost.replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1')+" руб.", [textPosX, textPosY, textPosZ+0.55], {
							font: 4,
							color: [255, 255, 255, businessesInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
						
						let owner = "Государство";
						if(businessData.ownlog.length > 1) {
							owner = businessData.ownlog+" ["+businessData.own+"]";
						}
						graphics.drawText("Владелец: "+owner, [textPosX, textPosY, textPosZ+0.45], {
							font: 4,
							color: [255, 255, 255, businessesInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
						
						graphics.drawText("Доход в сутки: "+businessData.income.replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1')+" руб.", [textPosX, textPosY, textPosZ+0.35], {
							font: 4,
							color: [255, 255, 255, businessesInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						businessesInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(atmInStream) !== "undefined" && Object.keys(atmInStream).length > 0) {
			for(var i in atmInStream) {
				let atmData = atmInStream[i];
				if(atmData) {
					let posData = atmData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(atmInStream[i]['alpha'] < 185) atmInStream[i]['alpha'] = atmInStream[i]['alpha'] + 2;
						graphics.drawText("Банкомат ATM", [textPosX, textPosY, textPosZ+2], {
							font: 4,
							color: [255, 255, 255, atmInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте сюда, что бы управлять счетами", [textPosX, textPosY, textPosZ+1.8], {
							font: 4,
							color: [255, 255, 255, atmInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						atmInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(gasInStream) !== "undefined" && Object.keys(gasInStream).length > 0) {
			for(var i in gasInStream) {
				let gasData = gasInStream[i];
				if(gasData) {
					let posData = gasData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(gasInStream[i]['alpha'] < 185) gasInStream[i]['alpha'] = gasInStream[i]['alpha'] + 2;
						
						let gasName = "Заправочная станция";
						let gasDesc = "Подъедьте сюда, что бы заправить транспорт";
						if(posData[3] == "heli") {
							gasName = "Вертолётная заправочная станция";
							gasDesc = "Приземлитесь сюда, что бы заправить вертолёт";
						}else if(posData[3] == "electro") {
							gasName = "Зарядная станция";
							gasDesc = "Подъедьте сюда, что бы зарядить транспорт";
						}
						
						graphics.drawText(gasName, [textPosX, textPosY, textPosZ+1.0], {
							font: 4,
							color: [255, 255, 255, gasInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText(gasDesc, [textPosX, textPosY, textPosZ+0.85], {
							font: 4,
							color: [255, 255, 255, gasInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						gasInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(fVehInStream) !== "undefined" && Object.keys(fVehInStream).length > 0) {
			for(var i in fVehInStream) {
				let fVehData = fVehInStream[i];
				if(fVehData) {
					let posData = fVehData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(fVehInStream[i]['alpha'] < 185) fVehInStream[i]['alpha'] = fVehInStream[i]['alpha'] + 2;
						graphics.drawText("Бесплатный транспорт", [textPosX, textPosY, textPosZ+3.0], {
							font: 4,
							color: [255, 255, 255, fVehInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Возьмите мопед, он совершенно бесплатный", [textPosX, textPosY, textPosZ+2.85], {
							font: 4,
							color: [255, 255, 255, fVehInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						fVehInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(containersInStream) !== "undefined" && Object.keys(containersInStream).length > 0) {
			for(var i in containersInStream) {
				let containerData = containersInStream[i];
				if(containerData) {
					let textPosX = parseFloat(containerData.data.check.x);
					let textPosY = parseFloat(containerData.data.check.y);
					let textPosZ = parseFloat(containerData.data.check.z);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
					
					mp.game.graphics.drawSpotLight(textPosX, textPosY, textPosZ+1.25, 0, 0, -1, 44, 123, 191, 3, 10, 5, 35, 1);
					if (dist < 85) {
						if(containerData.alpha < 185) containersInStream[i]['alpha'] = containersInStream[i]['alpha'] + 2;
						graphics.drawText("Аукцион контейнеров", [textPosX, textPosY, textPosZ+2.0], {
							font: 4,
							color: [255, 255, 255, containerData.alpha],
							scale: [0.4, 0.4],
							outline: true
						});
						
						let conClass = "~r~Эконом";
						let startBid = "~g~"+containerData.data.start.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
						if(containerData.data.auc == "mid") {
							conClass = "~y~Средний";
							startBid = "~y~"+containerData.data.start.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
						}else if(containerData.data.auc == "prem") {
							conClass = "~g~Премиум";
							startBid = "~r~"+containerData.data.start.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
						}
						
						graphics.drawText("Класс аукциона: "+conClass, [textPosX, textPosY, textPosZ+1.8], {
							font: 4,
							color: [255, 255, 255, containerData.alpha],
							scale: [0.3, 0.3],
							outline: true
						});
						
						let aucStatus = "~r~закрыт"
						if(containerData.data.active) aucStatus = "~g~открыт"
						
						graphics.drawText("Аукцион сейчас "+aucStatus, [textPosX, textPosY, textPosZ+1.7], {
							font: 4,
							color: [255, 255, 255, containerData.alpha],
							scale: [0.3, 0.3],
							outline: true
						});
						
						graphics.drawText("Начальная ставка"+startBid+" ~w~руб.", [textPosX, textPosY, textPosZ+1.6], {
							font: 4,
							color: [255, 255, 255, containerData.alpha],
							scale: [0.3, 0.3],
							outline: true
						});
						
						graphics.drawText("Статистика аукциона", [textPosX, textPosY, textPosZ+1.45], {
							font: 4,
							color: [255, 255, 255, containerData.alpha],
							scale: [0.4, 0.4],
							outline: true
						});
						
						if(!containerData.data.won) {
							graphics.drawText("Актуальная ставка: ~y~"+containerData.data.bid.nick+" ~w~(~y~"+containerData.data.bid.id+"~w~)", [textPosX, textPosY, textPosZ+1.25], {
								font: 4,
								color: [255, 255, 255, containerData.alpha],
								scale: [0.3, 0.3],
								outline: true
							});
						
							graphics.drawText("Текущая сумма:~g~"+containerData.data.bid.money.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~w~руб.", [textPosX, textPosY, textPosZ+1.15], {
								font: 4,
								color: [255, 255, 255, containerData.alpha],
								scale: [0.3, 0.3],
								outline: true
							});
							
							let expDateOstPeriod = "~y~0 ~w~мин. ~y~0 ~w~сек.";
							if(containerData.data.bid.date) {
								let expDate = moment.duration(moment(containerData.data.bid.date).diff(moment(curDay+"-"+curMonth+"-"+curYear+" "+curHours+":"+curMinutes+":"+curSeconds,"DD-MM-YYYY HH:mm:ss")));
								expDateOstPeriod = "~y~" + expDate.minutes() + " ~w~мин. ~y~" + expDate.seconds() + " ~w~сек.";
							}
							
							graphics.drawText("До победы: "+expDateOstPeriod, [textPosX, textPosY, textPosZ+1.0], {
								font: 4,
								color: [255, 255, 255, containerData.alpha],
								scale: [0.3, 0.3],
								outline: true
							});
						}else{
							graphics.drawText("Победитель: ~y~"+containerData.data.bid.nick+" ~w~(~y~"+containerData.data.bid.id+"~w~)", [textPosX, textPosY, textPosZ+1.25], {
								font: 4,
								color: [255, 255, 255, containerData.alpha],
								scale: [0.3, 0.3],
								outline: true
							});
							
							graphics.drawText("Ставка: ~g~"+containerData.data.bid.money.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~w~руб.", [textPosX, textPosY, textPosZ+1.15], {
								font: 4,
								color: [255, 255, 255, containerData.alpha],
								scale: [0.3, 0.3],
								outline: true
							});
							
							if(!containerData.data.won.opened) {
								graphics.drawText("Содержимое: ~r~контейнер ещё не открыт", [textPosX, textPosY, textPosZ+1.05], {
									font: 4,
									color: [255, 255, 255, containerData.alpha],
									scale: [0.3, 0.3],
									outline: true
								});
							}else{
								graphics.drawText("Содержимое: ~g~контейнер открыт", [textPosX, textPosY, textPosZ+1.05], {
									font: 4,
									color: [255, 255, 255, containerData.alpha],
									scale: [0.3, 0.3],
									outline: true
								});
							}
						}
					}else{
						containersInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(rVehInStream) !== "undefined" && Object.keys(rVehInStream).length > 0) {
			for(var i in rVehInStream) {
				let rVehData = rVehInStream[i];
				if(rVehData) {
					let posData = rVehData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(rVehInStream[i]['alpha'] < 185) rVehInStream[i]['alpha'] = rVehInStream[i]['alpha'] + 2;
						graphics.drawText(rVehInStream[i]['name'].toString(), [textPosX, textPosY, textPosZ+1.0], {
							font: 4,
							color: [255, 255, 255, rVehInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						let markerText = "Здесь можно арендовать транспорт";
						if(rVehInStream[i]['class'] == "water") markerText = "Здесь можно арендовать водный транспорт";
						
						graphics.drawText(markerText, [textPosX, textPosY, textPosZ+0.85], {
							font: 4,
							color: [255, 255, 255, rVehInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						rVehInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(mreosInStream) !== "undefined" && Object.keys(mreosInStream).length > 0) {
			for(var i in mreosInStream) {
				let mreoData = mreosInStream[i];
				if(mreoData) {
					let posData = mreoData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(mreosInStream[i]['alpha'] < 185) mreosInStream[i]['alpha'] = mreosInStream[i]['alpha'] + 2;
						graphics.drawText("Пункт МРЭО", [textPosX, textPosY, textPosZ+3.0], {
							font: 4,
							color: [255, 255, 255, mreosInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на транспортном средстве сюда", [textPosX, textPosY, textPosZ+2.85], {
							font: 4,
							color: [255, 255, 255, mreosInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
						
						graphics.drawText("Что бы купить новые номерные знаки", [textPosX, textPosY, textPosZ+2.75], {
							font: 4,
							color: [255, 255, 255, mreosInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						mreosInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(racingStartInStream) !== "undefined" && Object.keys(racingStartInStream).length > 0) {
			for(var i in racingStartInStream) {
				let racingStartData = racingStartInStream[i];
				if(racingStartData) {
					let posData = racingStartData['pos'];
					let dist = mp.game.system.vdist2(posData.x, posData.y, posData.z, myPos.x, myPos.y, myPos.z);
					if (dist < 85) {
						if(racingStartInStream[i]['alpha'] < 185) racingStartInStream[i]['alpha'] = racingStartInStream[i]['alpha'] + 2;
						graphics.drawText("Здесь ты можешь начать гоночную сессию", [posData.x, posData.y, posData.z+1.5], {
							font: 4,
							color: [255, 255, 255, racingStartInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, для создания гоночной сессии", [posData.x, posData.y, posData.z+1.35], {
							font: 4,
							color: [255, 255, 255, racingStartInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
						
						graphics.drawText("Бро, гоняйся в игре, а не в реальной жизни ;)", [posData.x, posData.y, posData.z+1.25], {
							font: 4,
							color: [255, 255, 255, racingStartInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						racingStartInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(obmensInStream) !== "undefined" && Object.keys(obmensInStream).length > 0) {
			for(var i in obmensInStream) {
				let obmenData = obmensInStream[i];
				if(obmenData) {
					let posData = obmenData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(obmensInStream[i]['alpha'] < 185) obmensInStream[i]['alpha'] = obmensInStream[i]['alpha'] + 2;
						graphics.drawText("Пункт обмена / покупки / продажи имущества", [textPosX, textPosY, textPosZ+1.5], {
							font: 4,
							color: [255, 255, 255, obmensInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, для совершения обмена", [textPosX, textPosY, textPosZ+1.35], {
							font: 4,
							color: [255, 255, 255, obmensInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
						
						graphics.drawText("Транспортом или номерными знаками", [textPosX, textPosY, textPosZ+1.25], {
							font: 4,
							color: [255, 255, 255, obmensInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						obmensInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(numchsInStream) !== "undefined" && Object.keys(numchsInStream).length > 0) {
			for(var i in numchsInStream) {
				let numchData = numchsInStream[i];
				if(numchData) {
					let posData = numchData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(numchsInStream[i]['alpha'] < 185) numchsInStream[i]['alpha'] = numchsInStream[i]['alpha'] + 2;
						graphics.drawText("Пункт переноса номерных знаков", [textPosX, textPosY, textPosZ+1.5], {
							font: 4,
							color: [255, 255, 255, numchsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, для совершения переноса", [textPosX, textPosY, textPosZ+1.35], {
							font: 4,
							color: [255, 255, 255, numchsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						numchsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(healthsInStream) !== "undefined" && Object.keys(healthsInStream).length > 0) {
			for(var i in healthsInStream) {
				let healthData = healthsInStream[i];
				if(healthData) {
					let posData = healthData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(healthsInStream[i]['alpha'] < 185) healthsInStream[i]['alpha'] = healthsInStream[i]['alpha'] + 2;
						graphics.drawText("Пополнить здоровье", [textPosX, textPosY, textPosZ+3.0], {
							font: 4,
							color: [255, 255, 255, healthsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, что бы пополнить здоровье", [textPosX, textPosY, textPosZ+2.85], {
							font: 4,
							color: [255, 255, 255, healthsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						healthsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(plasticInStream) !== "undefined" && Object.keys(plasticInStream).length > 0) {
			for(var i in plasticInStream) {
				let healthData = plasticInStream[i];
				if(healthData) {
					let posData = healthData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(plasticInStream[i]['alpha'] < 185) plasticInStream[i]['alpha'] = plasticInStream[i]['alpha'] + 2;
						graphics.drawText("Сделать пластическую операцию", [textPosX, textPosY, textPosZ+3.0], {
							font: 4,
							color: [255, 255, 255, plasticInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, что бы изменить своего персонажа", [textPosX, textPosY, textPosZ+2.85], {
							font: 4,
							color: [255, 255, 255, plasticInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						plasticInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(utilizationsInStream) !== "undefined" && Object.keys(utilizationsInStream).length > 0) {
			for(var i in utilizationsInStream) {
				let utilizationData = utilizationsInStream[i];
				if(utilizationData) {
					let posData = utilizationData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						if(utilizationsInStream[i]['alpha'] < 185) utilizationsInStream[i]['alpha'] = utilizationsInStream[i]['alpha'] + 2;
						graphics.drawText("Станция утилизации транспорта", [textPosX, textPosY, textPosZ+3.0], {
							font: 4,
							color: [255, 255, 255, utilizationsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Подъедь сюда, что бы утилизировать свой транспорт", [textPosX, textPosY, textPosZ+2.85], {
							font: 4,
							color: [255, 255, 255, utilizationsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						utilizationsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
			
		if(typeof(tuningsInStream) !== "undefined" && Object.keys(tuningsInStream).length > 0) {
			for(var i in tuningsInStream) {
				let tunData = tuningsInStream[i];
				if(tunData) {
					let posData = tunData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);

					if (dist < 85) {
						let tunName = "Станция технического обслуживания";
						let tunDesc = "Подъедь сюда, что бы прокачать свой транспорт";
						if(tunData['type'] == "heli") {
							tunName = "Техническое обслуживание вертолётов";
							tunDesc = "Приземлитесь сюда, что бы прокачать вертолёт";
						}
						
						if(tuningsInStream[i]['alpha'] < 185) tuningsInStream[i]['alpha'] = tuningsInStream[i]['alpha'] + 2;
						graphics.drawText(tunName, [textPosX, textPosY, textPosZ+3.0], {
							font: 4,
							color: [255, 255, 255, tuningsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText(tunDesc, [textPosX, textPosY, textPosZ+2.85], {
							font: 4,
							color: [255, 255, 255, tuningsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						tuningsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(garTuningsInStream) !== "undefined" && Object.keys(garTuningsInStream).length > 0) {
			for(var i in garTuningsInStream) {
				let garTunData = garTuningsInStream[i];
				if(garTunData) {
					let posData = garTunData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
					
					let name = "Неизвестно";
					let type = "unknown";
					if(garTuningsInStream[i]['type']) type = garTuningsInStream[i]['type'].toString();
					if(type == "paints") name = "Малярные работы";
					else if(type == "wheelsAndSusp") name = "Колёса и подвеска";
					else if(type == "engineTrans") name = "Двигатель и трансмиссия";
					else if(type == "additional") name = "Доп. оборудование и обвесы";
					
					if (dist < 85) {
						if(garTuningsInStream[i]['alpha'] < 185) garTuningsInStream[i]['alpha'] = garTuningsInStream[i]['alpha'] + 2;
						graphics.drawText(name, [textPosX, textPosY, textPosZ+1.5], {
							font: 4,
							color: [255, 255, 255, garTuningsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, что бы тюнинговать", [textPosX, textPosY, textPosZ+1.35], {
							font: 4,
							color: [255, 255, 255, garTuningsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						garTuningsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(autosalonsInStream) !== "undefined" && Object.keys(autosalonsInStream).length > 0) {
			for(var i in autosalonsInStream) {
				let salonData = autosalonsInStream[i];
				if(salonData) {
					let posData = salonData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					
					if(!IsJsonString(salonData["data"])) break;
					let sData = JSON.parse(salonData["data"]);
					
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
					
					let name = "Неизвестно";
					name = sData["name"];
					
					if (dist < 85) {
						if(autosalonsInStream[i]['alpha'] < 185) autosalonsInStream[i]['alpha'] = autosalonsInStream[i]['alpha'] + 2;
						graphics.drawText(name, [textPosX, textPosY, textPosZ+1.5], {
							font: 4,
							color: [255, 255, 255, autosalonsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, что бы изучить каталог", [textPosX, textPosY, textPosZ+1.35], {
							font: 4,
							color: [255, 255, 255, autosalonsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						autosalonsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(jobsInStream) !== "undefined" && Object.keys(jobsInStream).length > 0) {
			for(var i in jobsInStream) {
				let jobData = jobsInStream[i];
				if(jobData) {
					let posData = jobData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					
					if(!IsJsonString(jobData["data"])) break;
					let jData = JSON.parse(jobData["data"]);
					
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
					
					let name = "Неизвестно";
					name = jData["name"];
					
					if (dist < 85) {
						if(jobsInStream[i]['alpha'] < 185) jobsInStream[i]['alpha'] = jobsInStream[i]['alpha'] + 2;
						graphics.drawText(name, [textPosX, textPosY, textPosZ+1.5], {
							font: 4,
							color: [255, 255, 255, jobsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, что бы устроиться", [textPosX, textPosY, textPosZ+1.35], {
							font: 4,
							color: [255, 255, 255, jobsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						jobsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(schoolsInStream) !== "undefined" && Object.keys(schoolsInStream).length > 0) {
			for(var i in schoolsInStream) {
				let salonData = schoolsInStream[i];
				if(salonData) {
					let posData = salonData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					
					if(!IsJsonString(salonData["data"])) break;
					let sData = JSON.parse(salonData["data"]);
					
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
					
					let name = "Неизвестно";
					name = sData["name"];
					
					if (dist < 85) {
						if(schoolsInStream[i]['alpha'] < 185) schoolsInStream[i]['alpha'] = schoolsInStream[i]['alpha'] + 2;
						graphics.drawText(name, [textPosX, textPosY, textPosZ+1.7], {
							font: 4,
							color: [255, 255, 255, schoolsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте на маркер, что бы получить", [textPosX, textPosY, textPosZ+1.55], {
							font: 4,
							color: [255, 255, 255, schoolsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						schoolsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(chipsInStream) !== "undefined" && Object.keys(chipsInStream).length > 0) {
			for(var i in chipsInStream) {
				let chipData = chipsInStream[i];
				if(chipData) {
					let posData = chipData['pos'];
					let textPosX = parseFloat(posData[0]);
					let textPosY = parseFloat(posData[1]);
					let textPosZ = parseFloat(posData[2]);
					
					let dist = mp.game.system.vdist2(textPosX, textPosY, textPosZ, myPos.x, myPos.y, myPos.z);
					
					if (dist < 110) {
						if(chipsInStream[i]['alpha'] < 185) chipsInStream[i]['alpha'] = chipsInStream[i]['alpha'] + 2;
						graphics.drawText("Чип-тюнинг станция", [textPosX, textPosY, textPosZ+1.2], {
							font: 4,
							color: [255, 255, 255, chipsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Заедьте сюда на транспорте, и нажмите кнопку «B».", [textPosX, textPosY, textPosZ+1.05], {
							font: 4,
							color: [255, 255, 255, chipsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						chipsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(dropsInStream) !== "undefined" && Object.keys(dropsInStream).length > 0) {
			for(var i in dropsInStream) {
				let dropItemData = dropsInStream[i];
				if(dropItemData) {
					let dist = mp.game.system.vdist2(dropItemData.colPOS.x, dropItemData.colPOS.y, dropItemData.colPOS.z, myPos.x, myPos.y, myPos.z);
					
					if (dist < 30) {
						let dropData = dropItemData.drop;
						let dropName = dropData.hash;
						let dropDesc = false;
						let dropHealth = false;
						let dropAmount = false;
						
						if(dropItemData.object) {
							if(mp.objects.exists(mp.objects.at(parseInt(dropItemData.object)))) mp.objects.at(parseInt(dropItemData.object)).setCollision(false, false);
						}
						
						if(typeof(dropData.sex) !== "undefined") {
							if(typeof(allStuff[dropData.sex]) !== "undefined") {
								if(typeof(allStuff[dropData.sex][dropData.type]) !== "undefined") {
									if(dropData.type != "component" && dropData.type != "fish" && dropData.type != "ammo" && dropData.type != "health" && typeof(dropData.health) !== "undefined") dropHealth = dropData.health.toString();
									else if(dropData.type == "ammo" || dropData.type == "component" || dropData.type == "fish") dropAmount = dropData.amount;
									let tempData = allStuff[dropData.sex][dropData.type];
									if(typeof(tempData[dropData.hash]) !== "undefined") {
										tempData = tempData[dropData.hash];
										if(typeof(tempData.name) !== "undefined") dropName = tempData.name;
										if(typeof(tempData.desc) !== "undefined") dropDesc = tempData.desc;
									}
								}
							}
						}else{
							if(typeof(allStuff[dropData.type]) !== "undefined") {
								if(typeof(allStuff[dropData.type][dropData.hash]) !== "undefined") {
									if(dropData.type != "component" && dropData.type != "fish" && dropData.type != "ammo" && dropData.type != "health" && typeof(dropData.health) !== "undefined") dropHealth = dropData.health.toString();
									else if(dropData.type == "ammo" || dropData.type == "component" || dropData.type == "fish") dropAmount = dropData.amount;
									let tempData = allStuff[dropData.type][dropData.hash];
									if(typeof(tempData.name) !== "undefined") dropName = tempData.name;
									if(typeof(tempData.desc) !== "undefined") dropDesc = tempData.desc;
								}
							}
						}
						
						let zText = dropItemData.colPOS.z+0.5;
						if(dropsInStream[i]['alpha'] < 185) dropsInStream[i]['alpha'] = dropsInStream[i]['alpha'] + 2;
						graphics.drawText(dropName, [dropItemData.colPOS.x, dropItemData.colPOS.y, zText], {
							font: 4,
							color: [255, 255, 255, dropsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
						
						if(dropDesc) {
							zText = zText - 0.1;
							graphics.drawText(dropDesc, [dropItemData.colPOS.x, dropItemData.colPOS.y, zText], {
								font: 4,
								color: [255, 255, 255, dropsInStream[i]['alpha']],
								scale: [0.2, 0.2],
								outline: true
							});
						}
						
						if(dropHealth) {
							if(!dropDesc) zText = zText - 0.1;
							else zText = zText - 0.07;
							if(parseInt(dropHealth) > 0) dropHealth = 100-dropHealth;
							else dropHealth = 100;
							graphics.drawText("Износ: "+dropHealth+"%", [dropItemData.colPOS.x, dropItemData.colPOS.y, zText], {
								font: 4,
								color: [255, 255, 255, dropsInStream[i]['alpha']],
								scale: [0.2, 0.2],
								outline: true
							});
						}
						
						if(dropAmount) {
							if(!dropDesc && !dropHealth) zText = zText - 0.1;
							else zText = zText - 0.07;
							graphics.drawText("Количество: "+dropAmount, [dropItemData.colPOS.x, dropItemData.colPOS.y, zText], {
								font: 4,
								color: [255, 255, 255, dropsInStream[i]['alpha']],
								scale: [0.2, 0.2],
								outline: true
							});
						}
						
						if(!dropDesc && !dropHealth && !dropAmount) zText = zText - 0.1;
						else zText = zText - 0.07;
						graphics.drawText("Нажмите « Е », что-бы подобрать", [dropItemData.colPOS.x, dropItemData.colPOS.y, zText], {
							font: 4,
							color: [255, 255, 255, dropsInStream[i]['alpha']],
							scale: [0.2, 0.2],
							outline: true
						});
					}else{
						dropsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(elementLooting) {
			if(elementLooting.thetype == "animal") {
				let pedRemoteID = elementLooting.id;
				let thePed = mp.peds.atRemoteId(elementLooting.id);
				if(mp.peds.exists(thePed)) {
					elementLooting.tick = roundNumber(parseFloat(elementLooting.tick) + 0.001, 3);
					if(elementLooting.tick >= 1) {
						elementLooting.tick = 1;
						elementLooting["quality"] = thePed.quality;
						lootOpened(JSON.stringify(elementLooting));
						elementLooting = false;
					}else{
						let pedPos = thePed.getBoneCoords(12844, 0, 0, 0);
						mp.game.graphics.setDrawOrigin(pedPos.x, pedPos.y, pedPos.z, 0);

						let x = 0, y = -0.158;
						
						if(hud_browser) {
							if(elementLooting.tick == 0.001) hud_browser.execute('playSound("lootAnimalSt1", 0.18);');
							else if(elementLooting.tick == 0.2) hud_browser.execute('playSound("lootAnimalSt2", 0.18);');
							else if(elementLooting.tick == 0.4) hud_browser.execute('playSound("lootAnimalSt3", 0.18);');
							else if(elementLooting.tick == 0.6) hud_browser.execute('playSound("lootAnimalSt4", 0.18);');
							else if(elementLooting.tick == 0.8) hud_browser.execute('playSound("lootAnimalSt5", 0.18);');
						}
						
						let pedAnimalProgressText = "Делаем продольный разрез..";
						if(elementLooting.tick >= 0.2) pedAnimalProgressText = "Аккуратно срезаем шкуру..";
						if(elementLooting.tick >= 0.4) pedAnimalProgressText = "Извлекаем внутренние органы..";
						if(elementLooting.tick >= 0.6) pedAnimalProgressText = "Извлекаем поверхностный жир..";
						if(elementLooting.tick >= 0.8) pedAnimalProgressText = "Разделываем кости животного..";
						
						graphics.drawText(pedAnimalProgressText, [x, y], {
							font: 4,
							color: [255, 255, 255, 200],
							scale: [0.3, 0.3],
							outline: true
						});
						
						x = 0, y = -0.128;
						
						graphics.drawRect(x, y, 0.08 + 0.001 * 2, 0.0075 + 0.001 * 2, 0, 0, 0, 200);
						graphics.drawRect(x, y, 0.08, 0.0075, 45, 45, 45, 255);
						graphics.drawRect(x - 0.08 / 2 * (1 - elementLooting.tick), y, 0.08 * elementLooting.tick, 0.0075, 255, 255, 255, 200);
						
						mp.game.invoke('0xFF0B610F6BE0D7AF');
					}
				}else{
					elementLooting = false;
				}
			}
		}
			
		if(typeof(lootsInStream) !== "undefined" && Object.keys(lootsInStream).length > 0) {
			for(var i in lootsInStream) {
				let lootItemData = lootsInStream[i];
				if(lootItemData) {
					let dist = mp.game.system.vdist2(lootItemData.colPOS.x, lootItemData.colPOS.y, lootItemData.colPOS.z, myPos.x, myPos.y, myPos.z);
					
					if (dist < 30) {
						let lootData = lootItemData;
						let lootName = lootData.name;
						
						let zText = lootItemData.colPOS.z+0.65;
						if(lootsInStream[i]['alpha'] < 185) lootsInStream[i]['alpha'] = lootsInStream[i]['alpha'] + 2;
						
						if(elementLooting) {
							if(typeof(elementLooting.tick) !== "undefined") {
								if(elementLooting.thetype != "animal") {
									if(elementLooting.tick >= 1) {
										elementLooting.tick = 1;
										lootOpened(JSON.stringify(elementLooting));
										elementLooting = false;
									}else{
										mp.game.graphics.setDrawOrigin(lootItemData.colPOS.x, lootItemData.colPOS.y, lootItemData.colPOS.z, 0);
										
										let x = 0, y = -0.158;
										
										graphics.drawText("Вскрываем содержимое..", [x, y], {
											font: 4,
											color: [255, 255, 255, 200],
											scale: [0.3, 0.3],
											outline: true
										});
										
										x = 0, y = -0.128;
										
										elementLooting.tick = parseFloat(elementLooting.tick) + 0.001;
										graphics.drawRect(x, y, 0.08 + 0.001 * 2, 0.0075 + 0.001 * 2, 0, 0, 0, 200);
										graphics.drawRect(x, y, 0.08, 0.0075, 45, 45, 45, 255);
										graphics.drawRect(x - 0.08 / 2 * (1 - elementLooting.tick), y, 0.08 * elementLooting.tick, 0.0075, 255, 255, 255, 200);
										
										mp.game.invoke('0xFF0B610F6BE0D7AF');
									}
								}
							}
						}else{
							zText = zText - 0.3;
							graphics.drawText(lootName, [lootItemData.colPOS.x, lootItemData.colPOS.y, zText], {
								font: 4,
								color: [255, 255, 255, lootsInStream[i]['alpha']],
								scale: [0.3, 0.3],
								outline: true
							});
							
							zText = zText - 0.1;
							graphics.drawText("Зажмите « Е », что-бы вскрыть содержимое", [lootItemData.colPOS.x, lootItemData.colPOS.y, zText], {
								font: 4,
								color: [255, 255, 255, lootsInStream[i]['alpha']],
								scale: [0.2, 0.2],
								outline: true
							});
						}
					}else if(dist >= 30 && dist < 3500) {
						lootsInStream[i]['alpha'] = 0;
						mp.game1.graphics.drawMarker(
							27,
							lootItemData.colPOS.x, lootItemData.colPOS.y, lootItemData.colPOS.z,
							0, 0, 0,
							0, 0, 90,
							3.0, 3.0, 3.0,
							241, 152, 11, 130,
							false, false, 2,
							false, "", "",false
						);
					}else if(dist >= 3500) {
						lootsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(shopsInStream) !== "undefined" && Object.keys(shopsInStream).length > 0) {
			for(var i in shopsInStream) {
				let shopData = shopsInStream[i]['data'];
				if(typeof(shopData) !== "undefined") {
					let dist = mp.game.system.vdist2(parseFloat(shopData[6]), parseFloat(shopData[7]), parseFloat(shopData[8]), myPos.x, myPos.y, myPos.z);
					
					if (dist < 30) {
						if(shopsInStream[i]['alpha'] < 185) shopsInStream[i]['alpha'] = shopsInStream[i]['alpha'] + 2;
						graphics.drawText(shopData[3], [parseFloat(shopData[6]), parseFloat(shopData[7]), parseFloat(shopData[8])+0.0], {
							font: 4,
							color: [255, 255, 255, shopsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте сюда, что-бы посмотреть каталог магазина", [parseFloat(shopData[6]), parseFloat(shopData[7]), parseFloat(shopData[8])-0.1], {
							font: 4,
							color: [255, 255, 255, shopsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						shopsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(bsAndTattoInStream) !== "undefined" && Object.keys(bsAndTattoInStream).length > 0) {
			for(var i in bsAndTattoInStream) {
				let bsAndTattoData = bsAndTattoInStream[i];
				if(typeof(bsAndTattoData) !== "undefined") {
					let dist = mp.game.system.vdist2(parseFloat(bsAndTattoData.pos[0]), parseFloat(bsAndTattoData.pos[1]), parseFloat(bsAndTattoData.pos[2]), myPos.x, myPos.y, myPos.z);
					
					if (dist < 30) {
						if(bsAndTattoInStream[i]['alpha'] < 185) bsAndTattoInStream[i]['alpha'] = bsAndTattoInStream[i]['alpha'] + 2;
						
						let bsOrTattoTitle = bsAndTattoData.thisIs;
						let bsOrTattoDesc = "Встаньте сюда";
						if(bsOrTattoTitle == "bs") {
							bsOrTattoTitle = "Барбершоп";
							bsOrTattoDesc = "Встаньте сюда, что-бы сделать себе новую причёску";
						}else if(bsOrTattoTitle == "ts") {
							bsOrTattoTitle = "Тату-салон";
							bsOrTattoDesc = "Встаньте сюда, что-бы сделать или свести татуировки";
						}
						
						graphics.drawText(bsOrTattoTitle, [parseFloat(bsAndTattoData.pos[0]), parseFloat(bsAndTattoData.pos[1]), parseFloat(bsAndTattoData.pos[2])+1.2], {
							font: 4,
							color: [255, 255, 255, bsAndTattoInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText(bsOrTattoDesc, [parseFloat(bsAndTattoData.pos[0]), parseFloat(bsAndTattoData.pos[1]), parseFloat(bsAndTattoData.pos[2])+1.05], {
							font: 4,
							color: [255, 255, 255, bsAndTattoInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						bsAndTattoInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(fracgarsInStream) !== "undefined" && Object.keys(fracgarsInStream).length > 0) {
			for(var i in fracgarsInStream) {
				let fracgarData = fracgarsInStream[i]['data'];
				if(typeof(fracgarData) !== "undefined") {
					let dist = mp.game.system.vdist2(parseFloat(fracgarData.pos.x), parseFloat(fracgarData.pos.y), parseFloat(fracgarData.pos.z), myPos.x, myPos.y, myPos.z);
					
					if (dist < 30) {
						if(fracgarsInStream[i]['alpha'] < 185) fracgarsInStream[i]['alpha'] = fracgarsInStream[i]['alpha'] + 2;
						graphics.drawText(fracgarData.name, [parseFloat(fracgarData.pos.x), parseFloat(fracgarData.pos.y), parseFloat(fracgarData.pos.z)+0.0], {
							font: 4,
							color: [fracgarData.color.r, fracgarData.color.g, fracgarData.color.b, fracgarsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте сюда, что-бы взять служебный транспорт", [parseFloat(fracgarData.pos.x), parseFloat(fracgarData.pos.y), parseFloat(fracgarData.pos.z)-0.15], {
							font: 4,
							color: [255, 255, 255, fracgarsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						fracgarsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(ceilsInStream) !== "undefined" && Object.keys(ceilsInStream).length > 0) {
			for(var i in ceilsInStream) {
				let ceilData = ceilsInStream[i]['data'];
				if(typeof(ceilData) !== "undefined") {
					let dist = mp.game.system.vdist2(parseFloat(ceilData.pos.x), parseFloat(ceilData.pos.y), parseFloat(ceilData.pos.z), myPos.x, myPos.y, myPos.z);
					
					if (dist < 30) {
						if(ceilsInStream[i]['alpha'] < 185) ceilsInStream[i]['alpha'] = ceilsInStream[i]['alpha'] + 2;
						graphics.drawText("Тюремная камера", [parseFloat(ceilData.pos.x), parseFloat(ceilData.pos.y), parseFloat(ceilData.pos.z)+0.0], {
							font: 4,
							color: [75, 147, 219, ceilsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText("Встаньте сюда, что-бы посадить в камеру персонажа", [parseFloat(ceilData.pos.x), parseFloat(ceilData.pos.y), parseFloat(ceilData.pos.z)-0.15], {
							font: 4,
							color: [255, 255, 255, ceilsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						ceilsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		if(typeof(teleportsInStream) !== "undefined" && Object.keys(teleportsInStream).length > 0) {
			for(var i in teleportsInStream) {
				let shopData = teleportsInStream[i]['data'];
				if(typeof(shopData) !== "undefined") {
					let dist = mp.game.system.vdist2(parseFloat(shopData[0]), parseFloat(shopData[1]), parseFloat(shopData[2]), myPos.x, myPos.y, myPos.z);
					
					if (dist < 30) {
						if(teleportsInStream[i]['alpha'] < 185) teleportsInStream[i]['alpha'] = teleportsInStream[i]['alpha'] + 2;
						graphics.drawText(shopData[3].toString(), [parseFloat(shopData[0]), parseFloat(shopData[1]), parseFloat(shopData[2])+0.8], {
							font: 4,
							color: [255, 255, 255, teleportsInStream[i]['alpha']],
							scale: [0.4, 0.4],
							outline: true
						});
						
						graphics.drawText(shopData[4].toString(), [parseFloat(shopData[0]), parseFloat(shopData[1]), parseFloat(shopData[2])+0.7], {
							font: 4,
							color: [255, 255, 255, teleportsInStream[i]['alpha']],
							scale: [0.3, 0.3],
							outline: true
						});
					}else{
						teleportsInStream[i]['alpha'] = 0;
					}
				}
			}
		}
		
		/*if(typeof(playerBlipsInStream) !== "undefined" && Object.keys(playerBlipsInStream).length > 0) {
			for(var i in playerBlipsInStream) {
				if(typeof(playerBlipsInStream[i]) !== "undefined") {
					if(typeof(playerBlipsInStream[i].blip) !== "undefined") {
						let theBlip = playerBlipsInStream[i].blip;
						let thePlayer = mp.players.atRemoteId(parseInt(i));
						if(theBlip && thePlayer) {
							if(mp.blips.exists(theBlip) && mp.players.exists(thePlayer)) {*/
								//if(thePlayer.handle != -1 && !thePlayer.isDead()) {
									//theBlip.setCoords(thePlayer.position);
								/*}else{
									if(mp.blips.exists(theBlip)) theBlip.destroy();
									playerBlipsInStream[thePlayer.remoteId.toString()] = undefined;
									playerBlipsInStream = JSON.parse(JSON.stringify(playerBlipsInStream));
								}*/
							/*}
						}
					}
				}
			}
		}*/
		
		/*if(typeof(playerBlipsInStream) !== "undefined" && Object.keys(playerBlipsInStream).length > 0) {
			for(var i in playerBlipsInStream) {
				let tempData = playerBlipsInStream[i];
				if(tempData['player'] && tempData['player'] !== undefined) {
					if(mp.players.exists(tempData['player'])) {
						if(tempData['blip'] !== undefined) {
							if(mp.blips.exists(tempData['blip']) && tempData['player'].position) tempData['blip'].setCoords(tempData['player'].position);
						}
					}
				}
			}
		}*/
	}else{
		// Отключить убийство прикладом в ближнем бою
		if(mp.game.invoke('0x475768A975D5AD17', localPlayer.handle, 6)) {
			controls.disableControlAction(0, 140, true);
			controls.disableControlAction(0, 141, true);
			controls.disableControlAction(0, 142, true);
		}
		if(localPlayer.getStealthMovement()) localPlayer.setStealthMovement(false, "DEFAULT_ACTION");
		if(localPlayer.isPerformingStealthKill()) localPlayer.clearTasksImmediately(); // anti stealth kill (left ctrl)
			
		if(mp.game.controls.isControlJustPressed(1, 25) || mp.game.controls.isControlJustPressed(1, 68) || mp.game.controls.isControlJustPressed(1, 91)) {
			if(mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle)) {
				let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle);
				if(weaponHash !== -1569615261 && weaponHash !== 1737195953) mp.game.player.setLockon(false);
				else mp.game.player.setLockon(true);
			}else{
				mp.game.player.setLockon(true);
			}
		}
		
		mp.players.forEachInStreamRange(
		(player, id) => {
			//let plPos = player.position; 
			if(typeof(player.getVariable("player.id")) !== "undefined") {
				if(player != localPlayer) {
					if(typeof(player.getVariable("player.spec")) !== "undefined" && player.getVariable("player.spec")) player.position = new mp.Vector3(25000, 25000, 7000);
					mp.game.invoke("0x476AE72C1D19D1A8", player.handle, 0);
				}
			}
		});
	}
});

let secondUpdater = 1, hudHidding = false;
setInterval(function() {
	secondUpdater++;
	if(secondUpdater >= 20) {
		curSeconds++;
		if(curSeconds >= 60) {
			if(curMinutes < 59) {
				curMinutes++;
			}else{
				curMinutes = 0;
				curHours++;
			}
			curSeconds = 0;
		}
		secondUpdater = 1;
	}
	
	if(curHours >= 24) curHours = 0;
	
	if(fastUseSlotsTiming > 0 && fastUseSlotsTiming <= 100) fastUseSlotsTiming = fastUseSlotsTiming-1;

	if(secondUpdater >= 19 && !inventorySaving) {
		let myParachuteStatus = localPlayer.getParachuteState();
		//chatAPI.sysPush("<span style=\"color:#FFF;\"> * "+myParachuteStatus.toString()+"</span>");
		if(myParachuteStatus == 1) {
			if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
				let myInv = localPlayer.getVariable("player.inv");
				if(typeof(myInv.instrument) !== "undefined") {
					if(typeof(myInv.instrument.hash) !== "undefined") {
						if(myInv.instrument.hash == "parachute") {
							if(!inventorySaving && !invCEFUpdating && !invCEFUpdatingVeh) {
								inventorySaving = JSON.stringify(myInv);
								mp.events.callRemote("onPlayerParachuteOpen");
								//chatAPI.sysPush("<span style=\"color:#FFF;\"> * "+myParachuteStatus.toString()+"</span>");
							}
						}
					}
				}
			}
		}
	}
	
	//chatAPI.sysPush("<span style=\"color:#FFF;\"> * "+myParachuteStatus.toString()+"</span>");
	
	if(localPlayer.getStealthMovement()) localPlayer.setStealthMovement(false, "DEFAULT_ACTION");
	if(localPlayer.isPerformingStealthKill()) localPlayer.clearTasksImmediately(); // anti stealth kill (left ctrl)
		
	if(mp.game.player.isFreeAiming()) {
		if(mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle)) {
			let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle);
			if(weaponHash !== -1569615261 && weaponHash !== 1737195953) mp.game.player.setLockon(false);
			else mp.game.player.setLockon(true);
		}else{
			mp.game.player.setLockon(true);
		}
	}

	// Отключить убийство прикладом в ближнем бою
	if(mp.game.invoke('0x475768A975D5AD17', localPlayer.handle, 6)) {
		controls.disableControlAction(0, 140, true);
		controls.disableControlAction(0, 141, true);
		controls.disableControlAction(0, 142, true);
	}
	
	if(isAnimActive) {
		if(typeof(isAnimActive.dict) !== "undefined") {
			if(localPlayer.isPlayingAnim(isAnimActive.dict, isAnimActive.name, 3) == 0) {
				isAnimActive = false;
				if(actMenu && hud_browser) closeActMenu();
			}
		}
	}
	
	if(!hideHud) hudHidding = false;
	
	if(typeof(hud_browser) !== "undefined" && hud_browser && !hudHidding) {
		if(hideHud) hudHidding = true;
		
		let myPos = localPlayer.position;
		
		let playerID = localPlayer.getVariable('player.id');
		let playerMoney = localPlayer.getVariable('player.money');
		let playerChips = localPlayer.getVariable('player.chips');
		let playerNick = localPlayer.getVariable('player.nick');
		let playerInv = {};
		
		let theVeh = localPlayer.vehicle;
		if(!theVeh && typeof(localPlayer.getVariable('player.inv')) !== "undefined") playerInv = localPlayer.getVariable('player.inv');
		
		let vehData = {
			"doorLock":0,
			"seatBelt":0,
			"actualspeed":0,
			"vehHash":"Транспорт",
			"vehName":"Транспорт",
			"vehHealth":1000,
			"vehRpm":0,
			"vehGear":"P",
			"vehFuel":0,
			"vehFuelType":"92",
			"vehProbeg":0,
			"vehFireTank":false,
			"handBrake":0,
			"cruiseData":0,
			"airEngines":false
		};
		
		let flyData = {
			"seatBelt":0,
			"actualspeed":0,
			"actualalt":0,
			"airName":"Транспорт",
			"airHealth":1000,
			"airChassis":true,
			"airEngines":false,
			"airFuel":false
		};
		
		let vehClass = false;
		
		if(theVeh && vehSeat == -1) {
			if(typeof(dragy.veh) !== "undefined") {
				let dragySpeed = roundNumber(theVeh.getSpeed() * 3.6, 0);
				if(!dragy.started) {
					if(dragySpeed > 0) {
						dragy.started = true;
						dragy.frames = 1;
						dragy["60"] = 0;
						dragy["100"] = 0;
						dragy["200"] = 0;
					}else{
						if(!dragy.ready) {
							chatAPI.sysPush("<span style=\"color:#FFF;\"> * <span style=\"color:#2EB224;\"><b>DRAGY</b></span>, можно начинать, поехали!</span>");
							chatAPI.sysPush("<span style=\"color:#FFF;\"> * ************** <span style=\"color:#2EB224;\"><b>**************</b></span> **************</span>");
							dragy.ready = true;
						}
					}
				}else{
					dragy.frames++;
					if(dragySpeed >= 200) {
						if(dragy["200"] == 0) {
							dragy["200"] = roundNumber(parseFloat((dragy.frames * 40) / 1000), 2);
							chatAPI.sysPush("<span style=\"color:#FFF;\"> * <span style=\"color:#2EB224;\"><b>DRAGY</b></span>, 0-200 км/ч за "+dragy["200"]+" с.</span>");
							if(hud_browser) hud_browser.execute('playSound("200kmh", "0.2");');
							chatAPI.sysPush("<span style=\"color:#FFF;\"> * ************** <span style=\"color:#2EB224;\"><b>**************</b></span> **************</span>");
							chatAPI.sysPush("<span style=\"color:#FFF;\"> * <span style=\"color:#2EB224;\"><b>DRAGY</b></span>, замер окончен!</span>");
							dragy = {};
						}
					}else if(dragySpeed >= 100) {
						if(dragy["100"] == 0) {
							dragy["100"] = roundNumber(parseFloat((dragy.frames * 40) / 1000), 2);
							chatAPI.sysPush("<span style=\"color:#FFF;\"> * <span style=\"color:#2EB224;\"><b>DRAGY</b></span>, 0-100 км/ч за "+dragy["100"]+" с.</span>");
							if(hud_browser) hud_browser.execute('playSound("100kmh", "0.2");');
						}
					}else if(dragySpeed >= 60) {
						if(dragy["60"] == 0) {
							dragy["60"] = roundNumber(parseFloat((dragy.frames * 40) / 1000), 2);
							chatAPI.sysPush("<span style=\"color:#FFF;\"> * <span style=\"color:#2EB224;\"><b>DRAGY</b></span>, 0-60 км/ч за "+dragy["60"]+" с.</span>");
							if(hud_browser) hud_browser.execute('playSound("60kmh", "0.2");');
						}
					}
				}
			}
			vehClass = theVeh.getClass().toString();
			if(vehClass == "0" || parseInt(vehClass) <= 12 || (parseInt(vehClass) >= 17 && parseInt(vehClass) <= 20)) {
				if(cruiseControl) {
					if(theVeh.steeringAngle < -40 || theVeh.steeringAngle > 40) {
						cruiseControl = false;
						mp.game.ui.notifications.show("~w~Круиз контроль ~r~выключен", false, 18, 2);
					}
					if(theVeh.hasCollidedWithAnything() || theVeh.isInAir() || theVeh.isInWater()) {
						cruiseControl = false;
						mp.game.ui.notifications.show("~w~Круиз контроль ~r~выключен", false, 18, 2);
					}
					if(controls.isControlPressed(0, 77) || controls.isControlPressed(0, 78) || controls.isControlPressed(0, 76)) {
						cruiseControl = false;
						mp.game.ui.notifications.show("~w~Круиз контроль ~r~выключен", false, 18, 2);
					}
					if(localPlayer.vehicle.getIsEngineRunning() == 0) {
						cruiseControl = false;
						mp.game.ui.notifications.show("~w~Круиз контроль ~r~выключен", false, 18, 2);
					}
				}
				vehData.doorLock = theVeh.getDoorLockStatus();
				vehData.seatBelt = localPlayer.getConfigFlag(32, true);
				vehData.engine = theVeh.getIsEngineRunning();
				
				vehData.actualspeed = roundNumber(theVeh.getSpeed() * 3.6, 0);
				if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
					let vehHash = theVeh.getVariable("veh.hash");
					vehData.vehHash = vehHash;
					
					let customSpeed = false;
					if(typeof(theVeh.getVariable("veh.params")) !== "undefined") {
						let vehParams = JSON.parse(theVeh.getVariable("veh.params"));
						if(typeof(vehParams.maxSpeed) !== "undefined") customSpeed = parseInt(vehParams.maxSpeed);
					}
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					if(cruiseControl) theVeh.setForwardSpeed(cruiseControl*3.6);

					if(typeof(theVeh.getVariable("veh.job")) !== "undefined") {
						if(!customSpeed) {
							let vehMaxSpeed = 400;
							if(theVeh.getVariable("veh.hash") == "octavia") vehMaxSpeed = 195;
							else if(theVeh.getVariable("veh.hash") == "ramlh20") vehMaxSpeed = 164;
							else if(theVeh.getVariable("veh.hash") == "mb_actros") vehMaxSpeed = 140;
							else if(theVeh.getVariable("veh.hash") == "v_vnl") vehMaxSpeed = 140;
							else if(theVeh.getVariable("veh.hash") == "mb_arocs") vehMaxSpeed = 140;
							else if(theVeh.getVariable("veh.hash") == "l_5256") vehMaxSpeed = 100;
							else if(theVeh.getVariable("veh.hash") == "e_200mmc") vehMaxSpeed = 140;
							else if(theVeh.getVariable("veh.hash") == "v_b9r") vehMaxSpeed = 120;
							if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
							else theVeh.setMaxSpeed(vehMaxSpeed*0.277);
						}else{
							if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
							else theVeh.setMaxSpeed(customSpeed*0.277);
						}
					}else{
						if(typeof(theVeh.getVariable("veh.fuel")) !== "undefined") {
							let vehFuel = JSON.parse(theVeh.getVariable("veh.fuel"));
							if(typeof(vehFuel.value) !== "undefined") {
								if(!vehFuel.value && cruiseControl) {
									cruiseControl = false;
									mp.game.ui.notifications.show("~w~Круиз контроль ~r~выключен", false, 18, 2);
								}
							}
						}
						if(!customSpeed) {
							let vehMaxSpeed = 400;
							if(typeof(decVehStats[0][vehHash]) !== "undefined") vehMaxSpeed = parseInt(decVehStats[0][vehHash].maxSpeed);
							if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
							else theVeh.setMaxSpeed(vehMaxSpeed*0.277);
						}else{
							if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
							else theVeh.setMaxSpeed(customSpeed*0.277);
						}
					}
					
					if(typeof(decVehStats[0][vehHash]) !== "undefined") {
						vehData.vehName = decVehStats[0][vehHash].name;
						vehData.vehFuelTank = decVehStats[0][vehHash].gasTank;
					}else{
						vehData.vehName = vehHash;
					}
				}
				
				if(typeof(theVeh.getVariable("veh.fuel")) !== "undefined") {
					let fuelData = JSON.parse(theVeh.getVariable("veh.fuel"));
					if(typeof(fuelData.value) !== "undefined") {
						vehData.vehFuel = fuelData.value;
						vehData.vehFuelType = fuelData.type;
						vehData.vehProbeg = fuelData.probeg;
					}
				}else{
					vehData.vehFuel = 5;
					vehData.vehFuelType = "92";
					vehData.vehFuelTank = 5;
					vehData.vehProbeg = 0;
					vehData.vehFireTank = false;
				}
				
				vehData.vehHealth = theVeh.getEngineHealth();
				vehData.vehRpm = theVeh.rpm;
				vehData.vehGear = theVeh.gear;
				if(vehData.vehGear == 1 && vehData.actualspeed == 0) vehData.vehGear = "P";
				if(vehData.vehGear == 0 && vehData.actualspeed == 0) vehData.vehGear = "P";
				else if(vehData.vehGear == 0 && vehData.actualspeed > 0) vehData.vehGear = "R";
				if(vehData.vehFuelType == "electro" && vehData.vehGear > 0) vehData.vehGear = "d";
				if(mp.keys.isDown(32)) vehData.handBrake = 1;
				
				vehData.cruiseData = cruiseControl ? "1" : "0";
			}else if(parseInt(vehClass) == 15 || parseInt(vehClass) == 16) {
				flyData.seatBelt = localPlayer.getConfigFlag(32, true);
				
				if(parseInt(vehClass) == 16) flyData.actualspeed = roundNumber((theVeh.getSpeed() * 15.6), 0);
				else flyData.actualspeed = roundNumber((theVeh.getSpeed() * 3.6), 0);
				
				let theVehPos = theVeh.position;
				flyData.actualalt = roundNumber(mp.game.system.vdist2(theVehPos.x, theVehPos.y, theVehPos.z, theVehPos.x, theVehPos.y, 0)/180, 0);
				if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
					let vehHash = theVeh.getVariable("veh.hash");
					
					let customSpeed = false;
					if(typeof(theVeh.getVariable("veh.params")) !== "undefined") {
						let vehParams = JSON.parse(theVeh.getVariable("veh.params"));
						if(typeof(vehParams.maxSpeed) !== "undefined") customSpeed = parseInt(vehParams.maxSpeed);
					}
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					if(typeof(theVeh.getVariable("veh.job")) !== "undefined") {
						if(!customSpeed) {
							let vehMaxSpeed = 500;
							if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
							else theVeh.setMaxSpeed(vehMaxSpeed*0.277);
						}else{
							if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
							else theVeh.setMaxSpeed(customSpeed*0.277);
						}
					}else{
						if(!customSpeed) {
							let vehMaxSpeed = 400;
							if(typeof(decVehStats[0][vehHash]) !== "undefined") vehMaxSpeed = parseInt(decVehStats[0][vehHash].maxSpeed);
							if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
							else theVeh.setMaxSpeed(vehMaxSpeed*0.277);
						}else{
							if(primarySpeedLimit) theVeh.setMaxSpeed(primarySpeedLimit*0.277);
							else theVeh.setMaxSpeed(customSpeed*0.277);
						}
					}
					
					if(typeof(decVehStats[0][vehHash]) !== "undefined") flyData.vehName = decVehStats[0][vehHash].name;
					else flyData.vehName = vehHash;
					
					if(typeof(theVeh.getVariable("veh.fuel")) !== "undefined") {
						let fuelData = JSON.parse(theVeh.getVariable("veh.fuel"));
						flyData.airFuel = fuelData.value;
					}
				}
				flyData.vehHealth = theVeh.getEngineHealth();
				
				flyData.airChassis = theVeh.getLandingGearState();
				flyData.airEngines = theVeh.getIsEngineRunning();
			}
		}else{
			vehData.actualspeed = "false";
			if(cruiseControl) {
				cruiseControl = false;
				mp.game.ui.notifications.show("~w~Круиз контроль ~r~выключен", false, 18, 2);
			}
		}
		
		let getStreet = mp.game.pathfind.getStreetNameAtCoord(myPos.x, myPos.y, myPos.z, 0, 0);
		let zoneName = mp.game.zone.getNameOfZone(myPos.x, myPos.y, myPos.z);

		let realZoneName = "San Andreas";
		if(zoneNamesShort.includes(zoneName)) {
			let zoneID = zoneNamesShort.indexOf(zoneName);
			realZoneName = zoneNames[zoneID];
		}
		
		let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
		
		if(typeof(heistIsland) !== "undefined") {
			if(heistIsland) {
				realZoneName = "San Andreas";
				street = "остров свободы";
			}
		}
		
		let voice = mp.voiceChat.muted ? "false" : "true";
		
		let job = "none";
		if(typeof(localPlayer.getVariable("player.job")) !== "undefined") {
			let jobData = localPlayer.getVariable("player.job");
			if(jobData.name) {
				if(jobData.name == "winery") job = "Работа на винном производстве";
				else if(jobData.name == "wineDelivery") job = "Работа на развозке вина";
				else if(jobData.name == "taxi") job = "Работа в такси";
				else if(jobData.name == "air") job = "Работа в авиации";
				else if(jobData.name == "truck") job = "Работа в грузоперевозках";
				else if(jobData.name == "bus") job = "Работа водителем автобуса";
				else if(jobData.name == "courier") job = "Работа в курьерской службе";
				else if(jobData.name == "train") job = "Работа на железных дорогах";
				else if(jobData.name == "fire") job = "Работа в пожарном департаменте";
			}
		}
		
		let blocks = {};
		if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") blocks = localPlayer.getVariable("player.blocks");
		
		let getWeapon = false;
		if(mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle) && !theVeh) {
			let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle);
			if(weaponHash !== -1569615261) {
				let ammo = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
				getWeapon = {"hash":weaponHash,"ammo":ammo,"mag":localPlayer.getAmmoInClip(weaponHash)};
			}
		}
		
		let captureData = {};
		if(clanZones) {
			for(let i in clanZones) {
				let zoneData = clanZones[i];
				zoneData.name = i;
				if(typeof(zoneData.war.id) !== "undefined") captureData = zoneData;
			}
		}
		
		let tempClanCapters = [];
		if(typeof(clanCapters) !== "undefined") tempClanCapters = clanCapters;
		
		let fastInv = {"timing":fastUseSlotsTiming,"passive":localPlayer.getVariable("player.passive")};
		
		let myStatus = "player";
		if(typeof(localPlayer.getVariable("player.status")) !== "undefined") myStatus = localPlayer.getVariable("player.status");
		
		let sendData = {"id":playerID,"game_status":myStatus,"money":playerMoney,"chips":playerChips,"nick":playerNick,"sms":mp.storage.data.sms,"vehClass":vehClass,"vehData":vehData,"train":localPlayer.train,"flyData":flyData,"online":curOnline,"day":curDay,"month":curMonth,"year":curYear,"hours":curHours,"minutes":curMinutes,"zone":realZoneName,"street":street,"hideHud":hideHud.toString(),"camHack":camHack.toString(),"voice":voice,"job":job,"blocks":blocks,"weapon":getWeapon,"captureData":captureData,"clanCapters":tempClanCapters,"fishingMode":fishingMode,"inCasino":inCasino,"fastInv":fastInv};
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(sendData));
		hud_browser.execute('sendData(\''+JSON.stringify(sendData)+'\');');
		
		//renderCounter = 0;
	}
	
	if(typeof(mp.storage.data) !== "undefined") {
		if(typeof(mp.storage.data.settings) !== "undefined") {
			if(typeof(mp.storage.data.settings.wheelSmoke) !== "undefined") {
				if(mp.storage.data.settings.wheelSmoke) {
					mp.vehicles.forEachInStreamRange(
						(veh) => {
							if(veh.isOnScreen()) {
								vehClass = veh.getClass().toString();
								if(vehClass == "0" || (parseInt(vehClass) <= 12 && parseInt(vehClass) != 8) || (parseInt(vehClass) >= 17 && parseInt(vehClass) <= 20)) {
									//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+veh.getHeightAboveGround());
									if(veh.getHeightAboveGround() < 0.55) {
										let velocity = veh.getVelocity();
										let speed = veh.getSpeed();
										let fv = veh.getForwardVector();
										let fvn = normalize2d(fv.x, fv.y);
										let fvvn = normalize2d(velocity.x, velocity.y);
										let driftAngle = mp.game.gameplay.getAngleBetween2dVectors(fvn[0], fvn[1], fvvn[0], fvvn[1]);
										let leftWheel = veh.getBoneIndexByName("wheel_lr");
										let rightWheel = veh.getBoneIndexByName("wheel_rr");
										
										if(speed >= 16.0 && (driftAngle >= 12.0 && driftAngle <= 80.0)) driftSmoke("core", "proj_grenade_smoke", veh.handle, 1, 1.9, leftWheel, rightWheel);
										else if(speed < 16.0 && veh.isInBurnout()) driftSmoke("core", "exp_grd_bzgas_smoke", veh.handle, 2, 1.3, leftWheel, rightWheel);
									}
								}
							}
						}
					);
				}
			}
		}
	}
}, 50);

// DRIFT SMOKE

mp.game.streaming.requestNamedPtfxAsset("core");

let underPlayerHitEntity = function () {
	let position = JSON.parse(JSON.stringify(player.position));
	position.z -= 0.8;
	let secondPosition = JSON.parse(JSON.stringify(position));
	secondPosition.z -= 2.0;

	let entity = mp.raycasting.testPointToPoint(position, secondPosition, player, [-1]);

	if (entity !== undefined) {
		let p = entity.position;
		let entity2 = mp.raycasting.testCapsule(new mp.Vector3(p.x, p.y, p.z + 0.01), new mp.Vector3(p.x, p.y, p.z - 0.01), 0.01, player, [-1]);
		if (entity2) entity.material = entity2.material;
		return entity;
	}else{
		return false;
	}
};

async function driftSmoke(base, sub, vehHandle, dens, size, lrwheel, rrwheel) {
	let all_parts = [];
    
	for(let i = 0; i < dens; i++) {
        mp.game.graphics.setPtfxAssetNextCall(base);
        let fx1 = mp.game.graphics.startParticleFxLoopedOnEntityBone(sub, vehHandle, 0.05, 0, 0, 0, 0, 0, lrwheel, size, false, false, false);
		all_parts.push(fx1);

        mp.game.graphics.setPtfxAssetNextCall(base);
        let fx2 = mp.game.graphics.startParticleFxLoopedOnEntityBone(sub, vehHandle, 0.05, 0, 0, 0, 0, 0, rrwheel, size, false, false, false);
        all_parts.push(fx2);
	}
	
	await mp.game.waitAsync(1000);
	
    for(let i of all_parts) {
        mp.game.graphics.stopParticleFxLooped(parseInt(i), false);
	}
}

// DRIFT SMOKE END

function getLookingAtEntity() {
    let startPosition = localPlayer.getBoneCoords(12844, 0.5, 0, 0);
    var resolution = mp.game.graphics.getScreenActiveResolution(1, 1);
    let secondPoint = mp.game.graphics.screen2dToWorld3d([resolution.x / 2, resolution.y / 2, (2 | 4 | 8)]);
    if (secondPoint == undefined) return null;

    startPosition.z -= 0.3;
    const result = mp.raycasting.testPointToPoint(startPosition, secondPoint, localPlayer, (2 | 4 | 8 | 16));

    if (typeof result !== 'undefined') {
        if (typeof(result.entity.type) === 'undefined') return null;
        if (result.entity.type == 'object') return null;

        let entPos = result.entity.position;
        let lPos = localPlayer.position;
        if (mp.game.gameplay.getDistanceBetweenCoords(entPos.x, entPos.y, entPos.z, lPos.x, lPos.y, lPos.z, true) > 8) return null;
        return result.entity;
    }
    return null;
}

function getNearestObjects() {
    var tempO = false;
    if (localPlayer.isInAnyVehicle(false)) {
        var players = mp.players.toArray();
        players.forEach(
            (player) => {
                var posL = localPlayer.position;
                var posO = player.position;
                var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
                if (localPlayer != player && localPlayer.dimension === player.dimension && distance < 2) {
                    if(!tempO) tempO = player;
                    else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                        mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                        tempO = player;
                }
            });
    } /*else {
        var objects = mp.objects.toArray();
        objects.forEach(
            (object) => {
                var posL = localPlayer.position;
                var posO = object.position;
                var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
                if (object.getVariable('TYPE') != undefined && localPlayer.dimension === object.dimension && distance < 3) {
                    if (tempO === null) tempO = object;
                    else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                        mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                        tempO = object;
                }
            });
    }*/
    nearestObject = tempO;
}

/*
setInterval(function() {
	if(typeof(localPlayer.getVariable("player.id")) !== "undefined") mp.game.ui.notifications.show("~w~"+localPlayer.getVariable("player.id"), false, 18, 2);
	else mp.game.ui.notifications.show("~r~not found id player", false, 18, 2);
}, 3000);
*/
}