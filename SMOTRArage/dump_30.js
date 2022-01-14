{
var fracgarsInStream = [];
var fracgarPanel = false;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'fracgar_render') {
				let colData = shape.getVariable('col.data');
				
				let fracgarMarker = mp.markers.new(1, new mp.Vector3(parseFloat(colData.pos.x), parseFloat(colData.pos.y), parseFloat(colData.pos.z)-1), 1.1,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [colData.color.r, colData.color.g, colData.color.b, 200],
					visible: true,
					dimension: 0
				});
				
				let fracgarCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(colData.pos.x), parseFloat(colData.pos.y), parseFloat(colData.pos.z)), 1.1,
				{
					color: [255, 255, 255, 0],
					visible: true,
					dimension: localPlayer.dimension
				});
				fracgarCheck.fracgarData = colData;
				
				let fracgarArray = {'marker':fracgarMarker,'check':fracgarCheck,'data':colData,'alpha':0};
				fracgarsInStream.push(fracgarArray);
				return false;
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.fracgarData) !== "undefined") {
				if(hud_browser && !fracgarPanel) {
					fracgarPanel = JSON.parse(JSON.stringify(checkpoint.fracgarData));
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					for(var k in fracgarPanel.hashes) {
						if(typeof(fracgarPanel.hashes[k].lvl) !== "undefined") {
							if(typeof(decVehStats[0][k]) !== "undefined") fracgarPanel.hashes[k]["name"] = decVehStats[0][k].name;
							else fracgarPanel.hashes[k]["name"] = k;
						}
						fracgarPanel.hashes[k]["active"] = Object.keys(fracgarPanel.hashes[k]["active"]).length;
					}
					
					chatAPI.sysPush(JSON.stringify(fracgarPanel));
					hud_browser.execute('toggleFracgar(\''+JSON.stringify(fracgarPanel)+'\');');
					allowBinds = [];
					mp.gui.cursor.visible = true;
					// checkpoint.fracgarData
				}
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.fracgarData) !== "undefined") {
				if(hud_browser) hud_browser.execute('toggleFracgar();');
				if(fracgarPanel) fracgarPanel = false;
				mp.gui.cursor.visible = false;
				restoreBinds();
			}
		}
	}
});

mp.events.add("closeFracgar", () => {
	if(hud_browser) hud_browser.execute('toggleFracgar();');
	if(fracgarPanel) fracgarPanel = false;
	mp.gui.cursor.visible = false;
	restoreBinds();
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'fracgar_render') {
				let colData = shape.getVariable('col.data');
				for(var i in fracgarsInStream) {
					let tempData = fracgarsInStream[i];
					if(JSON.stringify(colData) == JSON.stringify(tempData.data)) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(fracgarsInStream[i] || fracgarsInStream[i] !== undefined) delete fracgarsInStream[i];
					}
				}
				fracgarsInStream = fracgarsInStream.filter(function(el) { return el != null; });
				return false;
			}
		}
	}
});
}