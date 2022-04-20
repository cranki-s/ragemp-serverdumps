{
let vehCam = false;
let camStartPos = {};
let camLookAt = {};
let autosalonVehicle = false;

var autosalonsInStream = [];

let exitPos = "0,0,0";
var salonName = "Неизвестно";

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'autosalon_render') {
				let salonData = shape.getVariable('col.data');
				
				let salonMarker = mp.markers.new(1, new mp.Vector3(parseFloat(salonData[0]), parseFloat(salonData[1]), parseFloat(salonData[2])), 1.1,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [255, 255, 255, 200],
					visible: true,
					dimension: 0
				});
				
				let tunArray = {'marker': salonMarker, 'data': salonData[3], 'pos': [parseFloat(salonData[0]), parseFloat(salonData[1]), parseFloat(salonData[2])], 'alpha': 0};
				autosalonsInStream.push(tunArray);
				salonMarker = null;
			}
			if(colType == 'autosalon') {
				if(!localPlayer.vehicle && hud_browser) {
					if(allowBinds != stockBinds) return false;
					mp.events.call("sleepAntiCheat");
					
					let salonData = shape.getVariable('col.data');
					let sData = JSON.parse(salonData[3]);
					
					salonName = sData["name"];
					
					localPlayer.freezePosition(true);
					if(hud_browser) hud_browser.execute("hiddenAction('Открываем каталог "+salonName+"..');");
					mp.events.callRemote('playerToSalon', false, salonName);
					exitPos = sData["blipPos"];
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					let vehs = {};
					let sShowCars = sData["showCars"];
					for (var k in sShowCars) {
						let vehName = k;
						if(typeof(decVehStats[0][k]) != "undefined") vehName = decVehStats[0][k].name;
						else vehName = k;
						
						let vehCost = 999999999;
						if(typeof(decVehStats[0][k]) != "undefined") vehCost = decVehStats[0][k].cost;
						vehCost = vehCost.toString();
						
						vehs[k] = {"title":vehName,"cost":vehCost};
					}
					vehs = JSON.stringify(vehs);
					
					setTimeout(function() {
						if(!vehCam) {
							let vehPos = {"x":-1507.3842, "y":-2993.9888, "z":-82.4855};
							if(salonName == "Салон вертолётов") vehPos = {"x":-144.8816,"y":-592.0447,"z":212.0109};
							if(salonName != "Салон вертолётов") {
								vehCam = mp.cameras.new('default', new mp.Vector3(vehPos.x+4.2, vehPos.y+4.2, vehPos.z+1.5), new mp.Vector3(vehPos.x, vehPos.y, vehPos.z), 40);
								camStartPos = {"x":vehPos.x+4.2, "y":vehPos.y+4.2, "z":vehPos.z+1.5};
							}else{
								vehCam = mp.cameras.new('default', new mp.Vector3(vehPos.x+14.2, vehPos.y+14.2, vehPos.z+6.5), new mp.Vector3(vehPos.x, vehPos.y, vehPos.z), 40);
								camStartPos = {"x":vehPos.x+14.2, "y":vehPos.y+14.2, "z":vehPos.z+6.5};
							}
							vehCam.pointAtCoord(vehPos.x, vehPos.y, vehPos.z);
							camLookAt = {"x":vehPos.x, "y":vehPos.y, "z":vehPos.z};
							vehCam.setActive(true);
							vehCam.setMotionBlurStrength(100);
							mp.game.cam.renderScriptCams(true, false, 0, true, false);
							mp.game.ui.displayRadar(false);
						}
						if(hud_browser) hud_browser.execute("hiddenAction('');");
						if(hud_browser) hud_browser.execute("toggleAutoSalonMenu('"+vehs+"', '"+salonName+"');");
						mp.gui.cursor.visible = true;
						allowBinds = [];
					}, 2000);
					
					salonData = null;
					sData = null;
					return false;
				}
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'autosalon_render') {
				let tunRenderData = shape.getVariable('col.data');
				for(var i in autosalonsInStream) {
					let tempData = autosalonsInStream[i];
					let posData = tempData['pos'];
					if (posData[0] == tunRenderData[0] && posData[1] == tunRenderData[1] && posData[2] == tunRenderData[2]) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(autosalonsInStream[i] || autosalonsInStream[i] !== undefined) delete autosalonsInStream[i];
					}
					tempData = null;
				}
				autosalonsInStream = autosalonsInStream.filter(function (el) { return el != null; });
				
				tunRenderData = null;
			}
		}
	}
});

let selectedVeh;
function salonGenVeh(hash) {
	if(hash) {
		let dim = localPlayer.dimension;
		if(selectedVeh) {
			selectedVeh.destroy();
			selectedVeh = null;
		}
		
		let vehPos = {"x":-1507.3842,"y":-2993.9888,"z":-82.7855};
		if(salonName == "Салон вертолётов") vehPos = {"x":-144.8816,"y":-592.0447,"z":212.0109};
		
		selectedVeh = mp.vehicles.new(mp.game.joaat(hash), vehPos,
		{
			heading: -5,
			color: [[255,255,255],[0,0,0]],
			locked: false,
			engine: false,
			dimension: dim
		});
		selectedVeh.hash = hash;
		selectedVeh.isAutoSalon = true;
	}else{
		if(selectedVeh) {
			selectedVeh.destroy();
			selectedVeh = null;
		}
	}
}
mp.events.add("salonGenVeh", salonGenVeh);

function setTempVehBuyData(name, value) {
	if(selectedVeh && name !== undefined && value !== undefined) {
		if(name == "color1") {
			selectedVeh.color1 = value;
			let vData = explode(",", value);
			selectedVeh.setCustomPrimaryColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
		}else if(name == "color2") {
			selectedVeh.color2 = value;
			let vData = explode(",", value);
			selectedVeh.setCustomSecondaryColour(parseInt(vData[0]), parseInt(vData[1]), parseInt(vData[2]));
		}
	}
}
mp.events.add("setTempVehBuyData", setTempVehBuyData);

function salonTestDrive(tdCost) {
	if(selectedVeh && tdCost != undefined) {
		tdCost = parseInt(tdCost);
		let myMoney = parseInt(localPlayer.getVariable("player.money"));
		if(tdCost > myMoney) return hud_browser.execute("testDriveNeedMoney();");
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('playerStartTestDrive', tdCost);
		
		if(hud_browser) hud_browser.execute("hiddenAction('Начинаем тест-драйв транспортного средства..');");
		
		if(salonName != "Салон вертолётов") {
			localPlayer.position = new mp.Vector3(-843.5933, 1880.6595, 159.7293);
			selectedVeh.position = new mp.Vector3(-843.5933, 1880.6595, 159.7293);
		}else{
			localPlayer.position = new mp.Vector3(-1001.226, 4511.9438, 159.3271);
			selectedVeh.position = new mp.Vector3(-1001.226, 4511.9438, 159.3271);
		}
		
		selectedVeh.makedTestDrive = true;
		
		if(vehCam) {
			vehCam.setActive(false);
			vehCam.detach();
			vehCam.destroy();
			vehCam = null;
		}
		mp.game.cam.renderScriptCams(false, false, 0, false, false);
		mp.game.ui.displayRadar(true);
		mp.gui.cursor.visible = false;
	}
}
mp.events.add("salonTestDrive", salonTestDrive);

mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
	if(vehicle) {
		if(vehicle.makedTestDrive && hud_browser) hud_browser.execute("stopTestDrive();");
	}
});

function stopTestDrive() {
	mp.events.call("sleepAntiCheat");
	
	localPlayer.freezePosition(true);
	if(hud_browser) hud_browser.execute("hiddenAction('Тест-драйв окончен, возвращаемся в автосалон..');");
	mp.events.callRemote('playerToSalon', true, salonName);
	
	delete selectedVeh.makedTestDrive;
	if(salonName != "Салон вертолётов") selectedVeh.position = new mp.Vector3(-1507.3842, -2993.9888, -82.7855);
	else selectedVeh.position = new mp.Vector3(-144.8816, -592.0447, 212.0109);
		
	if(!vehCam) {
		let vehPos = {"x":-1507.3842, "y":-2993.9888, "z":-82.4855};
		if(salonName == "Салон вертолётов") vehPos = {"x":-144.8816,"y":-592.0447,"z":212.0109};
		if(salonName != "Салон вертолётов") {
			vehCam = mp.cameras.new('default', new mp.Vector3(vehPos.x+4.2, vehPos.y+4.2, vehPos.z+1.5), new mp.Vector3(vehPos.x, vehPos.y, vehPos.z), 40);
			camStartPos = {"x":vehPos.x+4.2, "y":vehPos.y+4.2, "z":vehPos.z+1.5};
		}else{
			vehCam = mp.cameras.new('default', new mp.Vector3(vehPos.x+14.2, vehPos.y+14.2, vehPos.z+6.5), new mp.Vector3(vehPos.x, vehPos.y, vehPos.z), 40);
			camStartPos = {"x":vehPos.x+14.2, "y":vehPos.y+14.2, "z":vehPos.z+6.5};
		}
		vehCam.pointAtCoord(vehPos.x, vehPos.y, vehPos.z);
		camLookAt = {"x":vehPos.x, "y":vehPos.y, "z":vehPos.z};
		vehCam.setActive(true);
		vehCam.setMotionBlurStrength(100);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);
		mp.game.ui.displayRadar(false);
	}
	
	mp.gui.cursor.visible = true;
}
mp.events.add("stopTestDrive", stopTestDrive);

function autoSalonExit(sHash, color1, color2, resCost) {
	if(sHash !== undefined && color1 !== undefined && color2 !== undefined && resCost !== undefined) {
		resCost = parseInt(resCost);
		let myMoney = parseInt(localPlayer.getVariable("player.money"));
		if(resCost > myMoney) return hud_browser.execute("autoSalonNeedMoney();");
		
		var vehsData = localPlayer.getVariable('player.vehs');
		var housesData = localPlayer.getVariable('player.houses');
		
		let freeParks = 0;
		if(housesData && vehsData) freeParks = parseInt(housesData.parks) - parseInt(vehsData.count);
		
		if(vehsData.count >= 36) return hud_browser.execute("autoSalon36Vehs();");
		
		if(freeParks < 1) return hud_browser.execute("autoSalonNeedParks();");
		
		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		let vehCost = 999999999;
		if(typeof(decVehStats[0][sHash]) !== "undefined") vehCost = parseInt(decVehStats[0][sHash].cost);
		else return hud_browser.execute("autoSalonUnknownError();");
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * COST IN DUMP: "+vehCost+"</span>");
		if(resCost != vehCost) return hud_browser.execute("autoSalonUnknownError();");
		
		mp.events.call("sleepAntiCheat");
		
		if(hud_browser) hud_browser.execute("hiddenAction('Заключаем договор с автосалоном..');");
		
		let vehType = "car";
		if(salonName == "Салон вертолётов") vehType = "heli";
		if(salonName == "Салон мото-техники") vehType = "moto";
		
		let buyData = {"hash":sHash, "type":vehType, "color1":color1, "color2":color2, "resCost":resCost};
		mp.events.callRemote('playerBuyVehicle', exitPos, JSON.stringify(buyData));
		
		if(selectedVeh) {
			selectedVeh.destroy();
			selectedVeh = null;
		}
		
		if(vehCam) {
			vehCam.setActive(false);
			vehCam.detach();
			vehCam.destroy();
			vehCam = null;
		}
		mp.game.cam.renderScriptCams(false, false, 0, false, false);
		mp.game.ui.displayRadar(true);
		mp.gui.cursor.visible = false;
		
		setTimeout(function() {
			if(hud_browser) hud_browser.execute("hiddenAction('Подписываем договор с автосалоном..');");
		}, 1000);
		
		setTimeout(function() {
			if(hud_browser) hud_browser.execute("hiddenAction('Отправляем запрос на регистрацию транспортного средства..');");
		}, 2000);
		
		setTimeout(function() {
			if(hud_browser) hud_browser.execute("hiddenAction('Получаем государственные номерные знаки..');");
		}, 3000);
		
		setTimeout(function() {
			if(hud_browser) hud_browser.execute("hiddenAction('Автосалон благодарит Вас за покупку, приятной эксплуатации!');");
		}, 4000);
		
		setTimeout(function() {
			if(hud_browser) hud_browser.execute("hiddenAction('');");
			localPlayer.freezePosition(false);
		}, 5000);
		
		let vehName = sHash;
		if(typeof(decVehStats[0][sHash]) != "undefined") vehName = decVehStats[0][sHash].name;
		let costText = resCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
		
		setTimeout(function() {
			mp.game.ui.messages.showMidsizedShard("~y~Вы купили ~w~транспорт", "~s~"+vehName+"~n~Оплачено~g~~h~"+costText+" ~s~руб.", 5, false, true, 8000);
		}, 5500);
		
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Менеджер автосалона", "Ого, поздравляем!", "Видим у Вас появился новый транспорт. Проверьте F3!", "CHAR_CARSITE", 1, false, 1, 2);
		}, 10000);
		
		hud_browser.execute("toggleAutoSalonMenu();");
		
		restoreBinds();
	}else{
		if(hud_browser) hud_browser.execute("hiddenAction('Закрываем каталог транспортных средств..');");
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('playerFromSalon', exitPos);
		
		if(selectedVeh) {
			selectedVeh.destroy();
			selectedVeh = null;
		}
		
		if(vehCam) {
			vehCam.setActive(false);
			vehCam.detach();
			vehCam.destroy();
			vehCam = null;
		}
		mp.game.cam.renderScriptCams(false, false, 0, false, false);
		mp.game.ui.displayRadar(true);
		mp.gui.cursor.visible = false;
		
		setTimeout(function() {
			if(hud_browser) hud_browser.execute("hiddenAction('');");
			localPlayer.freezePosition(false);
		}, 2000);
		
		restoreBinds();
	}
}
mp.events.add("autoSalonExit", autoSalonExit);

let rotAngle = 0;
mp.events.add('render', () => {
	if(vehCam) {
		let corrections = false;
		
		let pos = vehCam.getCoord();
		let rot = vehCam.getRot(2);
		let fov = vehCam.getFov();
		
		let cameraX = pos.x;
		let cameraY = pos.y;
		let cameraZ = pos.z;
		
		if (mp.keys.isDown(37) === true) {
			corrections = true;
			
			rotAngle = rotAngle + 1.5;
			rotAngle = (rotAngle) * (Math.PI/180); // Convert to radians

			cameraX = Math.cos(rotAngle) * (pos.x - camLookAt.x) - Math.sin(rotAngle) * (pos.y-camLookAt.y) + camLookAt.x;
			cameraY = Math.sin(rotAngle) * (pos.x - camLookAt.x) + Math.cos(rotAngle) * (pos.y - camLookAt.y) + camLookAt.y;
		}
		if (mp.keys.isDown(39) === true) {
			corrections = true;

			rotAngle = rotAngle - 1.5;
			rotAngle = (rotAngle) * (Math.PI/180); // Convert to radians

			cameraX = Math.cos(rotAngle) * (pos.x - camLookAt.x) - Math.sin(rotAngle) * (pos.y-camLookAt.y) + camLookAt.x;
			cameraY = Math.sin(rotAngle) * (pos.x - camLookAt.x) + Math.cos(rotAngle) * (pos.y - camLookAt.y) + camLookAt.y;
		}
		if (mp.keys.isDown(38) === true) {
			corrections = true;
			let zLimitUpper = camStartPos.z + 1;
			
			if(pos.z <= (zLimitUpper)) cameraZ = pos.z + 0.025;
		}
		if (mp.keys.isDown(40) === true) {
			corrections = true;
			let zLimitDown = camStartPos.z - 0.7;
			
			if(pos.z >= (zLimitDown)) cameraZ = pos.z - 0.025;
		}
		
		if(corrections) vehCam.setParams(cameraX, cameraY, cameraZ, rot.x, rot.y, rot.z, fov, 0, 1, 1, 2);
	}
});
}