{
var fVehInStream = [];

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.data) == "undefined") {
				if(shape.getVariable('col.type')) {
					let colType = shape.getVariable('col.type');
					if(colType == 'freeVeh_render') {
						let fVehData = shape.getVariable('col.data');
						
						let fVehMarker = mp.markers.new(1, new mp.Vector3(fVehData[0], fVehData[1], fVehData[2]), 2.5,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 0, 0),
							color: [214, 35, 30, 0],
							visible: true,
							dimension: 0
						});
						
						let fVehArray = {'marker': fVehMarker, 'pos': [fVehData[0], fVehData[1], fVehData[2]], 'alpha': 0};
						fVehInStream.push(fVehArray);
						fVehMarker = null;
						return null;
					}
				}
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'freeVeh_render') {
					let fVehData = shape.getVariable('col.data');
					for(var i in fVehInStream) {
						let tempData = fVehInStream[i];
						let posData = tempData['pos'];
						if (posData[0] == fVehData[0] && posData[1] == fVehData[1] && posData[2] == fVehData[2]) {
							if(tempData['marker']) {
								tempData['marker'].destroy();
								delete tempData['marker'];
							}
							if(fVehInStream[i] || fVehInStream[i] !== undefined) delete fVehInStream[i];
						}
					}
					fVehInStream = fVehInStream.filter(function (el) { return el != null; });
					return null;
				}
			}
		}
	}
});
}