{
var afRadioPanel = false;
var radioInWorldEnabled = true;

var soundsInStream = {};

//const radioCamera = mp.cameras.new("gameplay");

function setRadioVeh(url, volume, title) {
	if(url && title) mp.events.callRemote('setRadioVeh', '[{"url":"'+url+'","volume":"'+volume+'","title":"'+title+'"}]');
}
mp.events.add("setRadioVeh", setRadioVeh);

function toggleRadioInWorld(theState) {
	if(typeof(theState) !== "undefined") radioInWorldEnabled = theState;
}

let syncRadio = setInterval(function() {
	if(hud_browser) {
		let sendData = {}, tempVehs = {}, tempSD = {};
		if(localPlayer.vehicle && localPlayer.vehicle.getVariable("veh.id")) {
			let inVehID = localPlayer.vehicle.getVariable("veh.id");
			if(inVehID) sendData["inVeh"] = inVehID;
		}
		let myPos = localPlayer.position;
		sendData["myPos"] = {"x":roundNumber(myPos.x, 4), "y":roundNumber(myPos.y, 4), "z":roundNumber(myPos.z, 4)};
		
		/*let cam_pos = radioCamera.getCoord();
		let	cam_vector = radioCamera.getDirection();*/
		
		mp.vehicles.forEachInStreamRange(
			(vehicle) => {
				let vehID = vehicle.getVariable("veh.id");
				if(vehID && vehicle.getVariable("veh.radio")) {
					let radioData = JSON.parse(vehicle.getVariable("veh.radio").toString());
					if(radioData.url) {
						let url = radioData.url;
						let volume = radioData.volume;
						
						let vehPos = vehicle.position;
						let dist = mp.game.system.vdist2(vehPos.x, vehPos.y, vehPos.z, myPos.x, myPos.y, myPos.z);
						
						vehPos = {"x":roundNumber(vehPos.x, 4), "y":roundNumber(vehPos.y, 4), "z":roundNumber(vehPos.z, 4)};
						
						if(radioInWorldEnabled) {
							if(dist <= 5000) {
								/*let car_vector = {x: vehPos.x-cam_pos.x, y: vehPos.y-cam_pos.y};
								let dx = car_vector.x * cam_vector.x + car_vector.y * cam_vector.y;
								let dy = mp.game.system.sqrt(cam_vector.x*cam_vector.x + cam_vector.y*cam_vector.y) * mp.game.system.sqrt(car_vector.x*car_vector.x + car_vector.y*car_vector.y);
								let s = cam_vector.x*(vehPos.y-cam_pos.y) - cam_vector.y*(vehPos.x-cam_pos.x), a = 1;
								if(s > 0) a = -1;
								else if(s < 0) a = 1;
								else a = 0;
								let pan = Math.sqrt(1-(dx / dy).toFixed(3)*(dx / dy).toFixed(3))*a;
								tempVehs[vehID] = {"url":url, "volume":volume, "vehPos":vehPos, "dist":dist.toString(), "pan":pan.toString()};*/
								tempVehs[vehID] = {"url":url, "volume":volume, "vehPos":vehPos, "dist":dist.toString()};
								//chatAPI.sysPush("<span style=\"color:#FF6146\"> * PAN: "+pan+"</span>");
							}
						}else{
							if(typeof(sendData["inVeh"]) !== "undefined") {
								if(vehID == sendData["inVeh"]) tempVehs[vehID] = {url, volume, vehPos, dist};
							}
						}
					}
				}
			}
		);
		sendData["vehs"] = tempVehs;
		
		if(radioInWorldEnabled) {
			for(var key in soundsInStream) {
				let sdData = soundsInStream[key];
				let dist = calculateDistance(myPos, sdData.pos);
				soundsInStream[key]["dist"] = dist;
				tempSD[key] = soundsInStream[key];
			}
		}
		
		sendData["soundDesigns"] = tempSD;
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * old: "+JSON.stringify(sendData["soundDesigns"])+"</span>");
		
		hud_browser.execute('sendDataRadio(\''+JSON.stringify(sendData)+'\');');
	}
}, 250);

var radioPanel = false;
mp.keys.bind(0x51, true, function() { // Q Меню (Радио в машинах)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x51)) return false;
	
	if(hud_browser && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
		if(radioPanel) {
			if(afRadioPanel) return false;
			afRadioPanel = true;
			setTimeout(function() { afRadioPanel = false }, 500);
	
			hud_browser.execute('toggleRadioPanel();');
			mp.gui.cursor.visible = false;
			radioPanel = false;
			
			restoreBinds();
		}else{
			if(localPlayer.vehicle) {
				if(vehSeat != -1) return false;
				hud_browser.execute('toggleRadioPanel('+localPlayer.getVariable("player.id")+');');
				mp.gui.cursor.visible = true;
				radioPanel = true;
				allowBinds = [0x51];
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.getVariable("checkpoint.type")) !== "undefined") {
			let checkPointType = checkpoint.getVariable("checkpoint.type");
			if(checkPointType == "soundDesign") {
				let sdData = checkpoint.getVariable('checkpoint.data');
				soundsInStream[sdData.id] = sdData;
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.getVariable("checkpoint.type")) !== "undefined") {
			let checkPointType = checkpoint.getVariable("checkpoint.type");
			if(checkPointType == 'soundDesign') {
				let sdData = checkpoint.getVariable('checkpoint.data');
				if(typeof(soundsInStream[sdData.id]) !== "undefined") {
					soundsInStream[sdData.id] = undefined;
					soundsInStream = JSON.parse(JSON.stringify(soundsInStream));
				}
			}
		}
	}
});
}