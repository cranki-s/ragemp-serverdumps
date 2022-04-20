{
var ceilsInStream = [];
var fracgarPanel = false;
var gettingFracCar = false;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'police_ceil_render') {
				let myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) !== "undefined" || typeof(myFraction.name) !== "undefined" || typeof(myFraction.rank) !== "undefined") {
					if(typeof(mp.world.data.fractions[myFraction.id]) !== "undefined" || typeof(mp.world.data.fractions[myFraction.id].settings) !== "undefined") {
						let fractionData = mp.world.data.fractions[myFraction.id];
						let fracSettings = mp.world.data.fractions[myFraction.id].settings;
						if(fractionData.type !== "undefined") {
							if(fractionData.type == "gov") {
								if(myFraction.name == "ПОЛИЦИЯ") {
									if(typeof(fracSettings[myFraction.rank.toString()].jailMVD) !== "undefined") {
										let colData = shape.getVariable('col.data');

										let ceilMarker = mp.markers.new(1, new mp.Vector3(parseFloat(colData.pos.x), parseFloat(colData.pos.y), parseFloat(colData.pos.z)-1), 1.1,
										{
											direction: new mp.Vector3(0, 0, 0),
											rotation: new mp.Vector3(0, 0, 0),
											color: [75, 147, 219, 200],
											visible: true,
											dimension: 0
										});

										let ceilCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(colData.pos.x), parseFloat(colData.pos.y), parseFloat(colData.pos.z)), 1.1,
										{
											color: [255, 255, 255, 0],
											visible: true,
											dimension: localPlayer.dimension
										});
										ceilCheck.ceilData = colData;

										let ceilArray = {'marker':ceilMarker,'check':ceilCheck,'data':colData,'alpha':0};
										ceilsInStream.push(ceilArray);
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

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.ceilData) !== "undefined") {
				if(hud_browser && !fracgarPanel) {
					if(gettingFracCar) return notyAPI.error("Вы уже берёте ТС из гаража, подождите.", 3000, true);
					
					fracgarPanel = JSON.parse(JSON.stringify(checkpoint.ceilData));
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					for(var k in fracgarPanel.hashes) {
						if(typeof(fracgarPanel.hashes[k].lvl) !== "undefined") {
							if(typeof(decVehStats[0][k]) !== "undefined") fracgarPanel.hashes[k]["name"] = decVehStats[0][k].name;
							else fracgarPanel.hashes[k]["name"] = k;
						}
						fracgarPanel.hashes[k]["active"] = parseInt(fracgarPanel.hashes[k]["max"]) - Object.keys(fracgarPanel.hashes[k]["active"]).length;
					}
					
					//chatAPI.sysPush(JSON.stringify(fracgarPanel));
					hud_browser.execute('toggleFracgar(\''+JSON.stringify(fracgarPanel)+'\');');
					allowBinds = [];
					mp.gui.cursor.visible = true;
					// checkpoint.ceilData
				}
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.ceilData) !== "undefined") {
				if(hud_browser) hud_browser.execute('toggleFracgar();');
				if(fracgarPanel) fracgarPanel = false;
				mp.gui.cursor.visible = false;
				restoreBinds();
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'police_ceil_render') {
				let colData = shape.getVariable('col.data');
				for(var i in ceilsInStream) {
					let tempData = ceilsInStream[i];
					if(JSON.stringify(colData) == JSON.stringify(tempData.data)) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(ceilsInStream[i] || ceilsInStream[i] !== undefined) delete ceilsInStream[i];
					}
				}
				ceilsInStream = ceilsInStream.filter(function(el) { return el != null; });
				return false;
			}
		}
	}
});
}