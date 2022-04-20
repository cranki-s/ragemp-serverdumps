{
var teleportsInStream = [];
let antiLoopTeleporter = false;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'teleporter_render') {
				let colData = shape.getVariable('col.data');
				
				let markerDim = 0;
				if(typeof(colData[8]) !== "undefined") {
					let tempData = colData[8];
					if(typeof(tempData.markerDim) !== "undefined") markerDim = parseInt(tempData.markerDim);
				}
				
				let teleporterMarker = mp.markers.new(21, new mp.Vector3(parseFloat(colData[0]), parseFloat(colData[1]), parseFloat(colData[2])), 1.1,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(180, 0, 0),
					color: [250, 169, 22, 200],
					visible: true,
					dimension: markerDim
				});
				
				let teleporterCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(colData[0]), parseFloat(colData[1]), parseFloat(colData[2])), 0.5,
				{
					color: [255, 255, 255, 0],
					visible: true,
					dimension: markerDim
				});
				teleporterCheck.teleporterData = colData;
				
				let teleporterArray = {'marker':teleporterMarker,'check':teleporterCheck,'data':colData,'alpha':0};
				teleportsInStream.push(teleporterArray);
				return false;
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'teleporter_render') {
				let colData = shape.getVariable('col.data');
				for(var i in teleportsInStream) {
					let tempData = teleportsInStream[i];
					if(JSON.stringify(colData) == JSON.stringify(tempData.data)) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(teleportsInStream[i] || teleportsInStream[i] !== undefined) delete teleportsInStream[i];
					}
				}
				teleportsInStream = teleportsInStream.filter(function (el) { return el != null; });
				return false;
			}
		}
	}
});

var heistIsland = false;
mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", false);
mp.game.invoke("0x5E1460624D194A38", false);
function makeTeleportOnTeleporter(colData) {
	if(typeof(colData) !== "undefined") {
		ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
		if(slotInUse != "0" || ammoInUseCount > 0) {
			ammoInUseCount = CryptoJS.AES.encrypt((ammoInUseCount).toString(), krKey);
			return notyAPI.error("С оружием сюда нельзя, уберите оружие.", 3000, true);
		}
		ammoInUseCount = CryptoJS.AES.encrypt((ammoInUseCount).toString(), krKey);
		if(typeof(localPlayer.getVariable("player.money")) === "undefined") return notyAPI.error("Заведение сейчас закрыто, приходите позже.. (#1)", 3000, true);;
		if(typeof(localPlayer.getVariable("player.bank")) === "undefined") return notyAPI.error("Заведение сейчас закрыто, приходите позже.. (#2)", 3000, true);
		if(typeof(localPlayer.getVariable("player.donate")) === "undefined") return notyAPI.error("Заведение сейчас закрыто, приходите позже.. (#3)", 3000, true);
		if(typeof(localPlayer.getVariable("player.inv")) === "undefined") return notyAPI.error("Заведение сейчас закрыто, приходите позже.. (#4)", 3000, true);
		if(typeof(localPlayer.getVariable("player.pers")) === "undefined") return notyAPI.error("Заведение сейчас закрыто, приходите позже.. (#5)", 3000, true);
		
		if(fishingMode) return notyAPI.error("С удочкой сюда нельзя, уберите удочку.", 3000, true);
		
		BLOCK_CONTROLS = true;
		antiLoopTeleporter = true;
		mp.game.cam.doScreenFadeOut(50);
		
		let dim = "0";
		
		let tempData = {};
		if(typeof(colData[8]) !== "undefined") {
			tempData = colData[8];
			if(typeof(tempData.dim) !== "undefined") dim = tempData.dim.toString();
			if(typeof(tempData.special) !== "undefined") {
				if(tempData.special == "heistIslandEnter") {
					heistIsland = true;
					mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", true);
					mp.game.invoke("0x5E1460624D194A38", true);
				}else if(tempData.special == "heistIslandExit") {
					heistIsland = false;
					mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", false);
					mp.game.invoke("0x5E1460624D194A38", false);
				}
			}
		}
		
		mp.events.call("sleepAntiCheat");
		localPlayer.position = new mp.Vector3(parseFloat(colData[5]), parseFloat(colData[6]), parseFloat(colData[7]));
		mp.events.callRemote('playerUseTeleporter', JSON.stringify(tempData));
	}
}

mp.events.add("teleporterResult", (resultat) => {
	if(typeof(resultat) !== "undefined") {
		if(resultat) {
			BLOCK_CONTROLS = false;
			mp.game.cam.doScreenFadeIn(1550);
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.teleporterData) !== "undefined") {
				if(allowBinds != stockBinds) return false;
				if(antiLoopTeleporter) {
					antiLoopTeleporter = false;
					return false;
				}
				return makeTeleportOnTeleporter(checkpoint.teleporterData);
			}
		}
	}
});
}