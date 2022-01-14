{
// REQUESTING TRAIN MODELS

var trainModels = ["2te116", "vagon1", "vagon2", "vagon3", "vagon4","vagon5", "m_81_7171", "m_81_7172", "s_lastochka1", "s_lastochka2"];
function requestTrainModel(model) {
	let tempModel = mp.game.joaat(model);
	if(!mp.game.streaming.hasModelLoaded(tempModel)) {
		mp.game.streaming.requestModel(tempModel);
		while(!mp.game.streaming.hasModelLoaded(tempModel)) mp.game.wait(0);
	}
}
for (let i = 0; i < trainModels.length; i++) { requestTrainModel(trainModels[i]); }

// REQUESTING TRAIN MODELS END

var trainBlip = false;
var curMissionID = false, curSimaKey = 0, curSimaphore = {}, curTrainPointKey = 0, curTrainPoint = {};
var missionIDParams = {
	"0":{
		"accel":1.5,
		"dccel":2.5,
		"maxSpeed": 45, // 160
		"simaphores":[
			{"color":"green","speed":60,"pos":new mp.Vector3(666.7604,-926.8142,21.9617)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8023,-1126.2014,24.3865)},
			{"color":"green","speed":80,"pos":new mp.Vector3(685.8439,-1385.2883,23.8298)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8714,-1059.9115,22.5071)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8312,-926.7221,21.9663)},
			{"color":"green","speed":80,"pos":new mp.Vector3(667.3271,-754.4077,23.7542)},
			{"color":"green","speed":80,"pos":new mp.Vector3(863.2278,-473.5885,30.0689)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.0642,-947.9285,57.063)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.0404,-791.5458,91.3597)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1986.9216,-745.7905,97.0174)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2285.0051,-505.0648,95.4889)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2433.4104,-330.1152,93.8006)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2562.8894,-109.8985,93.3385)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2651.0195,859.6979,77.7321)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2610.9224,1623.5208,28.0806)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2611.1536,2047.0511,32.2204)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2640.7051,2973.8308,40.4618)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2495.2268,5730.3525,60.8899)},
			{"color":"green","speed":110,"pos":new mp.Vector3(2341.1006,5947.7983,60.8442)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1620.468,6360.2705,40.9654)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-430.0746,4015.873,81.9504)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-319.1938,3724.9766,68.616)},
			{"color":"green","speed":110,"pos":new mp.Vector3(584.2336,3180.3181,42.4529)},
			{"color":"green","speed":150,"pos":new mp.Vector3(1186.0214,3251.5437,39.7671)},
			{"color":"green","speed":150,"pos":new mp.Vector3(1935.4368,3579.3589,38.4319)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2540.5007,2841.6323,38.7513)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2562.3579,-109.8987,93.338)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2433.2126,-329.8372,93.7976)},
			{"color":"green","speed":110,"pos":new mp.Vector3(2285.095,-505.2754,95.4958)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1987.0186,-745.4688,97.0217)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.2385,-791.7618,91.3609)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.2706,-948.1615,57.08)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.1822,-473.5239,30.0641)}
		],
		"points":[
			{"pos":new mp.Vector3(672.8807,-681.2565,25.1953),"color":[255,150,0,150],"type":"pogruzkaTovar","drawColor":[0,0,0,0],"heading":354.926,"width":4,"height":18,"dir":dirGenerator(356.926)},
			{"pos":new mp.Vector3(-168.8703,6113.4219,31.5801),"color":[255,150,0,150],"type":"razgruzkaTovar","drawColor":[0,0,0,0],"heading":134.296,"width":4,"height":18,"dir":dirGenerator(134.296)},
			{"pos":new mp.Vector3(664.5845,-823.9052,23.3681),"color":[255,150,0,150],"type":"finalPoint","drawColor":[0,0,0,0],"heading":180.287,"width":4,"height":18,"dir":dirGenerator(180.287)}
		]
	},
	"1":{
		"accel":1.5,
		"dccel":2.5,
		"maxSpeed": 45, // 160
		"simaphores":[
			{"color":"green","speed":60,"pos":new mp.Vector3(666.7604,-926.8142,21.9617)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8023,-1126.2014,24.3865)},
			{"color":"green","speed":80,"pos":new mp.Vector3(685.8439,-1385.2883,23.8298)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8714,-1059.9115,22.5071)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8312,-926.7221,21.9663)},
			{"color":"green","speed":80,"pos":new mp.Vector3(667.3271,-754.4077,23.7542)},
			{"color":"green","speed":80,"pos":new mp.Vector3(863.2278,-473.5885,30.0689)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.0642,-947.9285,57.063)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.0404,-791.5458,91.3597)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1986.9216,-745.7905,97.0174)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2285.0051,-505.0648,95.4889)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2433.4104,-330.1152,93.8006)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2562.8894,-109.8985,93.3385)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2651.0195,859.6979,77.7321)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2610.9224,1623.5208,28.0806)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2611.1536,2047.0511,32.2204)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2640.7051,2973.8308,40.4618)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2495.2268,5730.3525,60.8899)},
			{"color":"green","speed":110,"pos":new mp.Vector3(2341.1006,5947.7983,60.8442)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1620.468,6360.2705,40.9654)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-430.0746,4015.873,81.9504)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-319.1938,3724.9766,68.616)},
			{"color":"green","speed":110,"pos":new mp.Vector3(584.2336,3180.3181,42.4529)},
			{"color":"green","speed":150,"pos":new mp.Vector3(1186.0214,3251.5437,39.7671)},
			{"color":"green","speed":150,"pos":new mp.Vector3(1935.4368,3579.3589,38.4319)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2540.5007,2841.6323,38.7513)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2562.3579,-109.8987,93.338)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2433.2126,-329.8372,93.7976)},
			{"color":"green","speed":110,"pos":new mp.Vector3(2285.095,-505.2754,95.4958)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1987.0186,-745.4688,97.0217)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.2385,-791.7618,91.3609)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.2706,-948.1615,57.08)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.1822,-473.5239,30.0641)}
		],
		"points":[
			{"pos":new mp.Vector3(672.8807,-681.2565,25.1953),"color":[255,150,0,150],"type":"pogruzkaTovar","drawColor":[0,0,0,0],"heading":354.926,"width":4,"height":18,"dir":dirGenerator(356.926)},
			{"pos":new mp.Vector3(-168.8703,6113.4219,31.5801),"color":[255,150,0,150],"type":"razgruzkaTovar","drawColor":[0,0,0,0],"heading":134.296,"width":4,"height":18,"dir":dirGenerator(134.296)},
			{"pos":new mp.Vector3(664.5845,-823.9052,23.3681),"color":[255,150,0,150],"type":"finalPoint","drawColor":[0,0,0,0],"heading":180.287,"width":4,"height":18,"dir":dirGenerator(180.287)}
		]
	},
	"2":{
		"accel":1.5,
		"dccel":2.5,
		"maxSpeed": 45, // 160
		"simaphores":[
			{"color":"green","speed":60,"pos":new mp.Vector3(666.7604,-926.8142,21.9617)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8023,-1126.2014,24.3865)},
			{"color":"green","speed":80,"pos":new mp.Vector3(685.8439,-1385.2883,23.8298)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8714,-1059.9115,22.5071)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8312,-926.7221,21.9663)},
			{"color":"green","speed":80,"pos":new mp.Vector3(667.3271,-754.4077,23.7542)},
			{"color":"green","speed":80,"pos":new mp.Vector3(863.2278,-473.5885,30.0689)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.0642,-947.9285,57.063)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.0404,-791.5458,91.3597)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1986.9216,-745.7905,97.0174)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2285.0051,-505.0648,95.4889)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2433.4104,-330.1152,93.8006)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2562.8894,-109.8985,93.3385)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2651.0195,859.6979,77.7321)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2610.9224,1623.5208,28.0806)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2611.1536,2047.0511,32.2204)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2640.7051,2973.8308,40.4618)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2495.2268,5730.3525,60.8899)},
			{"color":"green","speed":110,"pos":new mp.Vector3(2341.1006,5947.7983,60.8442)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1620.468,6360.2705,40.9654)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-430.0746,4015.873,81.9504)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-319.1938,3724.9766,68.616)},
			{"color":"green","speed":110,"pos":new mp.Vector3(584.2336,3180.3181,42.4529)},
			{"color":"green","speed":150,"pos":new mp.Vector3(1186.0214,3251.5437,39.7671)},
			{"color":"green","speed":150,"pos":new mp.Vector3(1935.4368,3579.3589,38.4319)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2540.5007,2841.6323,38.7513)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2562.3579,-109.8987,93.338)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2433.2126,-329.8372,93.7976)},
			{"color":"green","speed":110,"pos":new mp.Vector3(2285.095,-505.2754,95.4958)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1987.0186,-745.4688,97.0217)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.2385,-791.7618,91.3609)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.2706,-948.1615,57.08)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.1822,-473.5239,30.0641)}
		],
		"points":[
			{"pos":new mp.Vector3(672.8807,-681.2565,25.1953),"color":[255,150,0,150],"type":"pogruzkaTovar","drawColor":[0,0,0,0],"heading":354.926,"width":4,"height":18,"dir":dirGenerator(356.926)},
			{"pos":new mp.Vector3(-168.8703,6113.4219,31.5801),"color":[255,150,0,150],"type":"razgruzkaTovar","drawColor":[0,0,0,0],"heading":134.296,"width":4,"height":18,"dir":dirGenerator(134.296)},
			{"pos":new mp.Vector3(664.5845,-823.9052,23.3681),"color":[255,150,0,150],"type":"finalPoint","drawColor":[0,0,0,0],"heading":180.287,"width":4,"height":18,"dir":dirGenerator(180.287)}
		]
	},
	"3":{
		"accel":1.2,
		"dccel":2.2,
		"maxSpeed": 35, // 130
		"simaphores":[
			{"color":"green","speed":40,"pos":new mp.Vector3(666.7604,-926.8142,21.9617)},
			{"color":"green","speed":40,"pos":new mp.Vector3(666.8023,-1126.2014,24.3865)},
			{"color":"green","speed":60,"pos":new mp.Vector3(685.8439,-1385.2883,23.8298)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8714,-1059.9115,22.5071)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8312,-926.7221,21.9663)},
			{"color":"green","speed":60,"pos":new mp.Vector3(667.3271,-754.4077,23.7542)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.2278,-473.5885,30.0689)},
			{"color":"green","speed":60,"pos":new mp.Vector3(1363.0642,-947.9285,57.063)},
			{"color":"green","speed":60,"pos":new mp.Vector3(1794.0404,-791.5458,91.3597)},
			{"color":"green","speed":90,"pos":new mp.Vector3(1986.9216,-745.7905,97.0174)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2285.0051,-505.0648,95.4889)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2433.4104,-330.1152,93.8006)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2562.8894,-109.8985,93.3385)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2651.0195,859.6979,77.7321)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2610.9224,1623.5208,28.0806)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2611.1536,2047.0511,32.2204)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2640.7051,2973.8308,40.4618)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2495.2268,5730.3525,60.8899)},
			{"color":"green","speed":90,"pos":new mp.Vector3(2341.1006,5947.7983,60.8442)},
			{"color":"green","speed":90,"pos":new mp.Vector3(1620.468,6360.2705,40.9654)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-430.0746,4015.873,81.9504)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-319.1938,3724.9766,68.616)},
			{"color":"green","speed":90,"pos":new mp.Vector3(584.2336,3180.3181,42.4529)},
			{"color":"green","speed":130,"pos":new mp.Vector3(1186.0214,3251.5437,39.7671)},
			{"color":"green","speed":130,"pos":new mp.Vector3(1935.4368,3579.3589,38.4319)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2540.5007,2841.6323,38.7513)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2562.3579,-109.8987,93.338)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2433.2126,-329.8372,93.7976)},
			{"color":"green","speed":90,"pos":new mp.Vector3(2285.095,-505.2754,95.4958)},
			{"color":"green","speed":90,"pos":new mp.Vector3(1987.0186,-745.4688,97.0217)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.2385,-791.7618,91.3609)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.2706,-948.1615,57.08)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.1822,-473.5239,30.0641)}
		],
		"points":[
			{"pos":new mp.Vector3(672.8807,-681.2565,25.1953),"color":[255,150,0,150],"type":"pogruzkaTovar","drawColor":[0,0,0,0],"heading":354.926,"width":4,"height":18,"dir":dirGenerator(356.926)},
			{"pos":new mp.Vector3(-168.8703,6113.4219,31.5801),"color":[255,150,0,150],"type":"razgruzkaTovar","drawColor":[0,0,0,0],"heading":134.296,"width":4,"height":18,"dir":dirGenerator(134.296)},
			{"pos":new mp.Vector3(664.5845,-823.9052,23.3681),"color":[255,150,0,150],"type":"finalPoint","drawColor":[0,0,0,0],"heading":180.287,"width":4,"height":18,"dir":dirGenerator(180.287)}
		]
	},
	"4":{
		"accel":1.5,
		"dccel":2.5,
		"maxSpeed": 45, // 160
		"simaphores":[
			{"color":"green","speed":60,"pos":new mp.Vector3(666.7604,-926.8142,21.9617)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8023,-1126.2014,24.3865)},
			{"color":"green","speed":80,"pos":new mp.Vector3(685.8439,-1385.2883,23.8298)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8714,-1059.9115,22.5071)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8312,-926.7221,21.9663)},
			{"color":"green","speed":80,"pos":new mp.Vector3(667.3271,-754.4077,23.7542)},
			{"color":"green","speed":80,"pos":new mp.Vector3(863.2278,-473.5885,30.0689)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.0642,-947.9285,57.063)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.0404,-791.5458,91.3597)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1986.9216,-745.7905,97.0174)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2285.0051,-505.0648,95.4889)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2433.4104,-330.1152,93.8006)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2562.8894,-109.8985,93.3385)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2651.0195,859.6979,77.7321)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2610.9224,1623.5208,28.0806)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2611.1536,2047.0511,32.2204)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2640.7051,2973.8308,40.4618)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2495.2268,5730.3525,60.8899)},
			{"color":"green","speed":110,"pos":new mp.Vector3(2341.1006,5947.7983,60.8442)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1620.468,6360.2705,40.9654)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-430.0746,4015.873,81.9504)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-319.1938,3724.9766,68.616)},
			{"color":"green","speed":110,"pos":new mp.Vector3(584.2336,3180.3181,42.4529)},
			{"color":"green","speed":150,"pos":new mp.Vector3(1186.0214,3251.5437,39.7671)},
			{"color":"green","speed":150,"pos":new mp.Vector3(1935.4368,3579.3589,38.4319)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2540.5007,2841.6323,38.7513)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2562.3579,-109.8987,93.338)},
			{"color":"green","speed":150,"pos":new mp.Vector3(2433.2126,-329.8372,93.7976)},
			{"color":"green","speed":110,"pos":new mp.Vector3(2285.095,-505.2754,95.4958)},
			{"color":"green","speed":110,"pos":new mp.Vector3(1987.0186,-745.4688,97.0217)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.2385,-791.7618,91.3609)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.2706,-948.1615,57.08)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.1822,-473.5239,30.0641)}
		],
		"points":[
			{"pos":new mp.Vector3(672.8807,-681.2565,25.1953),"color":[255,150,0,150],"type":"pogruzkaTovar","drawColor":[0,0,0,0],"heading":354.926,"width":4,"height":18,"dir":dirGenerator(356.926)},
			{"pos":new mp.Vector3(-168.8703,6113.4219,31.5801),"color":[255,150,0,150],"type":"razgruzkaTovar","drawColor":[0,0,0,0],"heading":134.296,"width":4,"height":18,"dir":dirGenerator(134.296)},
			{"pos":new mp.Vector3(664.5845,-823.9052,23.3681),"color":[255,150,0,150],"type":"finalPoint","drawColor":[0,0,0,0],"heading":180.287,"width":4,"height":18,"dir":dirGenerator(180.287)}
		]
	},
	"5":{
		"accel":1.1,
		"dccel":2.1,
		"maxSpeed": 30, // 115
		"simaphores":[
			{"color":"green","speed":40,"pos":new mp.Vector3(666.7604,-926.8142,21.9617)},
			{"color":"green","speed":40,"pos":new mp.Vector3(666.8023,-1126.2014,24.3865)},
			{"color":"green","speed":60,"pos":new mp.Vector3(685.8439,-1385.2883,23.8298)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8714,-1059.9115,22.5071)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8312,-926.7221,21.9663)},
			{"color":"green","speed":60,"pos":new mp.Vector3(667.3271,-754.4077,23.7542)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.2278,-473.5885,30.0689)},
			{"color":"green","speed":60,"pos":new mp.Vector3(1363.0642,-947.9285,57.063)},
			{"color":"green","speed":60,"pos":new mp.Vector3(1794.0404,-791.5458,91.3597)},
			{"color":"green","speed":90,"pos":new mp.Vector3(1986.9216,-745.7905,97.0174)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2285.0051,-505.0648,95.4889)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2433.4104,-330.1152,93.8006)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2562.8894,-109.8985,93.3385)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2651.0195,859.6979,77.7321)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2610.9224,1623.5208,28.0806)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2611.1536,2047.0511,32.2204)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2640.7051,2973.8308,40.4618)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2495.2268,5730.3525,60.8899)},
			{"color":"green","speed":90,"pos":new mp.Vector3(2341.1006,5947.7983,60.8442)},
			{"color":"green","speed":90,"pos":new mp.Vector3(1620.468,6360.2705,40.9654)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-430.0746,4015.873,81.9504)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-319.1938,3724.9766,68.616)},
			{"color":"green","speed":90,"pos":new mp.Vector3(584.2336,3180.3181,42.4529)},
			{"color":"green","speed":130,"pos":new mp.Vector3(1186.0214,3251.5437,39.7671)},
			{"color":"green","speed":130,"pos":new mp.Vector3(1935.4368,3579.3589,38.4319)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2540.5007,2841.6323,38.7513)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2562.3579,-109.8987,93.338)},
			{"color":"green","speed":130,"pos":new mp.Vector3(2433.2126,-329.8372,93.7976)},
			{"color":"green","speed":90,"pos":new mp.Vector3(2285.095,-505.2754,95.4958)},
			{"color":"green","speed":90,"pos":new mp.Vector3(1987.0186,-745.4688,97.0217)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.2385,-791.7618,91.3609)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.2706,-948.1615,57.08)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.1822,-473.5239,30.0641)}
		],
		"points":[
			{"pos":new mp.Vector3(672.8807,-681.2565,25.1953),"color":[255,150,0,150],"type":"pogruzkaTovar","drawColor":[0,0,0,0],"heading":354.926,"width":4,"height":18,"dir":dirGenerator(356.926)},
			{"pos":new mp.Vector3(-168.8703,6113.4219,31.5801),"color":[255,150,0,150],"type":"razgruzkaTovar","drawColor":[0,0,0,0],"heading":134.296,"width":4,"height":18,"dir":dirGenerator(134.296)},
			{"pos":new mp.Vector3(664.5845,-823.9052,23.3681),"color":[255,150,0,150],"type":"finalPoint","drawColor":[0,0,0,0],"heading":180.287,"width":4,"height":18,"dir":dirGenerator(180.287)}
		]
	},
	"6":{
		"accel":1.7,
		"dccel":2.7,
		"maxSpeed": 50, // 165
		"simaphores":[
			{"color":"green","speed":60,"pos":new mp.Vector3(666.7604,-926.8142,21.9617)},
			{"color":"green","speed":60,"pos":new mp.Vector3(666.8023,-1126.2014,24.3865)},
			{"color":"green","speed":80,"pos":new mp.Vector3(685.8439,-1385.2883,23.8298)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8714,-1059.9115,22.5071)},
			{"color":"green","speed":80,"pos":new mp.Vector3(666.8312,-926.7221,21.9663)},
			{"color":"green","speed":80,"pos":new mp.Vector3(667.3271,-754.4077,23.7542)},
			{"color":"green","speed":80,"pos":new mp.Vector3(863.2278,-473.5885,30.0689)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.0642,-947.9285,57.063)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.0404,-791.5458,91.3597)},
			{"color":"green","speed":120,"pos":new mp.Vector3(1986.9216,-745.7905,97.0174)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2285.0051,-505.0648,95.4889)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2433.4104,-330.1152,93.8006)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2562.8894,-109.8985,93.3385)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2651.0195,859.6979,77.7321)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2610.9224,1623.5208,28.0806)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2611.1536,2047.0511,32.2204)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2640.7051,2973.8308,40.4618)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2495.2268,5730.3525,60.8899)},
			{"color":"green","speed":120,"pos":new mp.Vector3(2341.1006,5947.7983,60.8442)},
			{"color":"green","speed":120,"pos":new mp.Vector3(1620.468,6360.2705,40.9654)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-430.0746,4015.873,81.9504)},
			{"color":"green","speed":80,"pos":new mp.Vector3(-319.1938,3724.9766,68.616)},
			{"color":"green","speed":120,"pos":new mp.Vector3(584.2336,3180.3181,42.4529)},
			{"color":"green","speed":165,"pos":new mp.Vector3(1186.0214,3251.5437,39.7671)},
			{"color":"green","speed":165,"pos":new mp.Vector3(1935.4368,3579.3589,38.4319)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2540.5007,2841.6323,38.7513)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2562.3579,-109.8987,93.338)},
			{"color":"green","speed":165,"pos":new mp.Vector3(2433.2126,-329.8372,93.7976)},
			{"color":"green","speed":120,"pos":new mp.Vector3(2285.095,-505.2754,95.4958)},
			{"color":"green","speed":120,"pos":new mp.Vector3(1987.0186,-745.4688,97.0217)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1794.2385,-791.7618,91.3609)},
			{"color":"green","speed":80,"pos":new mp.Vector3(1363.2706,-948.1615,57.08)},
			{"color":"green","speed":60,"pos":new mp.Vector3(863.1822,-473.5239,30.0641)}
		],
		"points":[
			{"pos":new mp.Vector3(167.5511,-1984.226,18.3412),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":135.8,"width":4,"height":18,"dir":dirGenerator(135.8)}, // Davis, LS
			{"pos":new mp.Vector3(672.8807,-681.2565,25.1953),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":344.926,"width":4,"height":18,"dir":dirGenerator(346.926)}, // Baza LS
			{"pos":new mp.Vector3(1948.8035,-757.6938,97.2607),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":266.620,"width":4,"height":18,"dir":dirGenerator(266.620)}, // Palomino Hilands
			{"pos":new mp.Vector3(2413.2344,-358.1894,94.3122),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":318.804,"width":4,"height":18,"dir":dirGenerator(318.804)}, // Tataviam Mountains
			{"pos":new mp.Vector3(2611.0808,1682.9401,27.0501),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":0.837,"width":4,"height":18,"dir":dirGenerator(0.837)}, // Palmer-Taylor Power Station
			{"pos":new mp.Vector3(2616.2476,2935.9929,39.9680),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":326.221,"width":4,"height":18,"dir":dirGenerator(326.221)}, // Davis Kvarts
			{"pos":new mp.Vector3(-168.8703,6113.4219,31.5801),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":124.296,"width":4,"height":18,"dir":dirGenerator(124.296)}, // Paleto Bay
			{"pos":new mp.Vector3(1876.9445,3548.147,38.6613),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":304.406,"width":4,"height":18,"dir":dirGenerator(304.406)}, // Sandy Shoers
			{"pos":new mp.Vector3(2601.0356,2925.0229,39.9133),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":146.630,"width":4,"height":18,"dir":dirGenerator(146.630)}, // Davis Kvarts
			{"pos":new mp.Vector3(2312.2134,-470.416,95.4264),"color":[255,150,0,150],"type":"stantionR","drawColor":[0,0,0,0],"heading":140.801,"width":4,"height":18,"dir":dirGenerator(140.801)}, // Palomino Hilands
			{"pos":new mp.Vector3(664.5845,-823.9052,23.3681),"color":[255,150,0,150],"type":"finalPoint","drawColor":[0,0,0,0],"heading":170.287,"width":4,"height":18,"dir":dirGenerator(170.287)}
		]
	},
	"7":{
		"accel":3.5,
		"dccel":4.5,
		"maxSpeed": 30, // 115
		"simaphores":[
			{"color":"green","speed":60,"pos":new mp.Vector3(89.0611,-1703.8025,29.245)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-252.0017,-1398.595,31.2832)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-169.9674,-906.2639,20.9692)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-264.5179,-706.0677,15.6962)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-449.9084,-666.6399,10.9067)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-586.5045,-669.999,10.8956)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-640.117,-674.4955,10.896)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-1320.5691,-505.949,14.1402)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-1308.8195,-340.7957,14.1317)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-1130.5753,-288.265,19.0369)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-856.7804,-169.1507,19.0538)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-300.7747,-279.4097,9.1487)},
			{"color":"green","speed":110,"pos":new mp.Vector3(176.8746,-602.9567,17.7608)},
			{"color":"green","speed":110,"pos":new mp.Vector3(210.2005,-598.6445,17.7575)},
			{"color":"green","speed":110,"pos":new mp.Vector3(537.2258,-657.4133,15.3132)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-736.4852,-1993.7299,-10.2483)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-757.0671,-2050.1621,-10.2483)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-872.1282,-2271.6428,-12.6472)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-1054.7804,-2672.7041,-8.3245)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-1108.6409,-2755.7356,-8.3259)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-894.3581,-2368.0115,-12.6472)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-756.8847,-2068.5618,-10.2483)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-736.7293,-2012.7206,-10.2473)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-614.6172,-1563.5548,13.3398)},
			{"color":"green","speed":110,"pos":new mp.Vector3(222.7843,-585.6506,17.7575)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-288.298,-375.0762,9.1486)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-738.4459,-90.3547,19.0377)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-779.8893,-110.2205,19.0418)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-1118.3324,-273.9774,19.0369)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-1291.4191,-334.5381,14.1317)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-1380.0547,-427.0692,14.1309)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-603.9919,-676.0796,10.8956)},
			{"color":"green","speed":110,"pos":new mp.Vector3(-545.7959,-679.1481,10.9001)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-169.7251,-904.7894,20.9238)},
			{"color":"green","speed":60,"pos":new mp.Vector3(-169.7251,-904.7894,20.9238)},
		],
		"points":[
			{"pos":new mp.Vector3(104.4209,-1711.101,29.1293),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":49.151,"width":4,"height":22,"dir":dirGenerator(49.151)}, // Davis
			{"pos":new mp.Vector3(-203.3928,-1019.8647,29.3239),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":338.188,"width":4,"height":22,"dir":dirGenerator(338.188)}, // Pillbox South
			{"pos":new mp.Vector3(-529.4287,-665.5203,10.9094),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":87.971,"width":4,"height":22,"dir":dirGenerator(87.971)}, // Little Seoul
			{"pos":new mp.Vector3(-1359.7917,-435.4292,14.1458),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":31.200,"width":4,"height":22,"dir":dirGenerator(31.200)}, // Del Perro
			{"pos":new mp.Vector3(-787.3124,-130.2345,19.0508),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":299.974,"width":4,"height":22,"dir":dirGenerator(299.974)}, // Portola Drive
			{"pos":new mp.Vector3(-302.3009,-359.6808,9.1635),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":179.362,"width":4,"height":22,"dir":dirGenerator(179.362)}, // Burton
			{"pos":new mp.Vector3(243.2628,-1198.4683,38.0761),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":92.307,"width":4,"height":22,"dir":dirGenerator(92.307)}, // Strawberry
			{"pos":new mp.Vector3(-552.5513,-1297.6134,25.9065),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":152.729,"width":4,"height":22,"dir":dirGenerator(152.729)}, // Puerto del Sol
			{"pos":new mp.Vector3(-901.4651,-2346.6531,-12.606),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":161.157,"width":4,"height":22,"dir":dirGenerator(161.157)}, // LSIA Parking
			{"pos":new mp.Vector3(-1109.7587,-2735.3711,-8.3097),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":136.008,"width":4,"height":22,"dir":dirGenerator(136.008)}, // LSIA Terminal 4
			{"pos":new mp.Vector3(-1057.4897,-2696.7178,-8.2793),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":319.500,"width":4,"height":22,"dir":dirGenerator(319.500)}, // LSIA Terminal 4
			{"pos":new mp.Vector3(-865.5612,-2292.5515,-12.6323),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":337.021,"width":4,"height":22,"dir":dirGenerator(337.021)}, // LSIA Parking
			{"pos":new mp.Vector3(-527.6741,-1265.3129,25.904),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":332.835,"width":4,"height":22,"dir":dirGenerator(332.835)}, // Puerto del Sol
			{"pos":new mp.Vector3(298.0285,-1210.0483,38.0747),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":269.910,"width":4,"height":22,"dir":dirGenerator(269.910)}, // Strawberry
			{"pos":new mp.Vector3(-286.9993,-297.7302,9.1935),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":2.639,"width":4,"height":22,"dir":dirGenerator(0.639)}, // Burton
			{"pos":new mp.Vector3(-848.3321,-147.9061,19.081),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":124.760,"width":4,"height":22,"dir":dirGenerator(124.760)}, // Portola Drive
			{"pos":new mp.Vector3(-1341.4658,-497.541,14.1755),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":206.785,"width":4,"height":22,"dir":dirGenerator(206.785)}, // Del Perro
			{"pos":new mp.Vector3(-467.8731,-680.7336,10.9397),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":271.831,"width":4,"height":22,"dir":dirGenerator(271.831)}, // Little Seoul
			{"pos":new mp.Vector3(-224.5117,-1050.1123,29.3265),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":156.459,"width":4,"height":22,"dir":dirGenerator(156.459)}, // Pillbox South
			{"pos":new mp.Vector3(127.5512,-1741.5698,29.0579),"color":[255,150,0,150],"type":"stantionL","drawColor":[0,0,0,0],"heading":221.356,"width":4,"height":22,"dir":dirGenerator(221.356)}, // Davis
			{"pos":new mp.Vector3(361.6095,-1936.051,16.7264),"color":[255,150,0,150],"type":"finalPoint","drawColor":[0,0,0,0],"heading":225.745,"width":4,"height":22,"dir":dirGenerator(225.745)}
		]
	}
}

var trainWorkZone = mp.colshapes.newSphere(707.0614, -965.5336, 30.4128, 80, 0);
var trainImInWorkZone = false;

var trainTasksBlocked = false;

function startTrainJob() {
	closeJobTablet();
	mp.events.callRemote('startTrainJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас приняли работать на железные дороги", 5, false, true, 6500);
	setTimeout(function() {
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Добро пожаловать", "Получил рабочий планшет? Нажми F5 и выбери свой первый маршрут.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
	}, 2000);
}
mp.events.add("startTrainJob", startTrainJob);

function trainStartStop() {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		closeJobTablet(true);
		
		if(jobData.work == 0) {
			if(trainImInWorkZone) {
				if(!activeJOBoperation) {
					mp.events.call("sleepAntiCheat");
					mp.events.callRemote('startJobWork');
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Смена началась", "Возьми маршрут. Они в планшете (F5)", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Диспетчер", "Отправляйся в офис", "Смену можно начать только на территории базы.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Явитесь на базу железных дорог что бы начать смену.</span>");
			}
		}else{
			if(!activeJOBoperation) {
				activeJOBoperation = true;
				
				if(typeof(localPlayer.train) !== "undefined") mp.events.callRemote('cancelTrainTask', false);
				
				if(jobData.workMoney > 0) {
					//let resWorkMoney = roundNumber((parseInt(jobData.workMoney)-(parseInt(jobData.workMoney)*0.13)), 0);
					let resWorkMoney = roundNumber(parseInt(jobData.workMoney), 0);
					let workMoneyText = resWorkMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы заработали за смену"+workMoneyText+" руб.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Молодец!", "Отдохни и выходи на смену снова, ждём тебя!", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
				}else{
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы ничего не заработали за смену.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Что случилось?", "Не выполнил ни одного поручения?! Блок агрегатора 1 мин.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
					trainTasksBlocked = true;
					setTimeout(function() {
						mp.game.ui.notifications.showWithPicture("Диспетчер", "Маршруты доступны", "Я разблокировал тебе агрегатор.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
						trainTasksBlocked = false;
					}, 60000);
				}
				
				mp.events.callRemote('stopJobWork');
			}
		}
	}
}
mp.events.add("trainStartStop", trainStartStop);

function cancelTrainJobTask() {
	closeJobTablet(true);
	if(typeof(localPlayer.train) !== "undefined") {
		mp.game.ui.messages.showMidsized("~g~Вы успешно ~s~отказались от маршрута", "~s~Новые маршруты можно посмотреть в планшете (F5)");
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Отказ от маршрута", "Я заблокировал тебе маршруты на 1 мин.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
		
		trainTasksBlocked = true;
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Маршруты доступны", "Я разблокировал тебе маршруты.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			trainTasksBlocked = false;
		}, 60000);
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelTrainTask', false);
		
		if(trainBlip) {
			if(mp.blips.exists(trainBlip)) trainBlip.destroy();
		}
		
		curMissionID = false, curSimaKey = 0, curSimaphore = {}, curTrainPointKey = 0, curTrainPoint = {};
		trainParkedProcess = false;
	}
}
mp.events.add("cancelTrainJobTask", cancelTrainJobTask);

function getTrainTasks() {
	if(typeof(localPlayer.train) === "undefined") {
		if(localPlayer.vehicle) return hud_browser.execute("gettedTrainTasks('you_in_veh');");
		let jobData = localPlayer.getVariable("player.job");
		if(typeof(jobData) === "undefined") {
			//chatAPI.sysPush("<span style=\"color:#FF6146\">3</span>");
			return hud_browser.execute("gettedTrainTasks('empty');");
		}else{
			if(jobData.work == 0) return hud_browser.execute("gettedTrainTasks('no_active_work');");
		}
		mp.events.callRemote('getTrainTasks');
	}else{
		hud_browser.execute("gettedTrainTasks('you_have_task');");
	}
}
mp.events.add("getTrainTasks", getTrainTasks);

function gettedTrainTasks(trainTasks){
	if(trainTasks) {
		if(typeof(localPlayer.train) === "undefined" && typeof(localPlayer.getVariable("player.job")) !== "undefined") {
			if(localPlayer.vehicle) return hud_browser.execute("gettedTrainTasks('you_in_veh');");
			
			trainTasks = JSON.parse(trainTasks);
			if(Object.keys(trainTasks).length > 0) {
				let jobData = localPlayer.getVariable("player.job");
					
				for (var k in trainTasks) {
					if(trainTasks[k]) {
						let taskData = trainTasks[k];
						if(parseInt(jobData.rank) < parseInt(taskData.minRank)) delete trainTasks[k];
					}
				}
				trainTasks = trainTasks.filter(function (el) { return el != null; });
				
				//chatAPI.sysPush("<span style=\"color:#FF6146\">"+JSON.stringify(courierTasks)+"</span>");
				hud_browser.execute("gettedTrainTasks('ok', '"+JSON.stringify(trainTasks)+"');");
			}else{
				hud_browser.execute("gettedTrainTasks('empty');");
			}
		}else{
			hud_browser.execute("gettedTrainTasks('you_have_task');");
		}
	}
}
mp.events.add("gettedTrainTasks", gettedTrainTasks);

function acceptTaskTrain(data) {
	if(data) {
		closeJobTablet();
		restoreBinds();
		jobPanel = false;
		
		if(typeof(localPlayer.train) !== "undefined") {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Закончи смену", "У тебя уже есть активный маршрут", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Что бы взять маршрут, необходимо закончить активный маршрут..</span>");
		}
		
		if(localPlayer.vehicle) {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Выйди из транспорта", "Вылези из транспорта и попробуй ещё раз..", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Что бы взять маршрут, вылези из транспортного средства..</span>");
		}
		
		if(trainTasksBlocked) {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Блокировка доступа", "У Тебя блок доступа к маршрутам на 1 мин.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Тебя заблокирован доступ к маршрутам, попробуйте через минуту..</span>");
		}
		
		if(!trainImInWorkZone) {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Явитесь на базу", "Взять поручение можно только в офисе.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Явись в офис что бы взять поручение.</span>");
		}
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('acceptTaskTrain', data);
	}
}
mp.events.add("acceptTaskTrain", acceptTaskTrain);

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(shape == trainWorkZone) trainImInWorkZone = true;
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(shape == trainWorkZone) trainImInWorkZone = false;
	}
});

var nextSimaTimer = false;
function trainMissionProcessor(ostanovka) {
	if(typeof(ostanovka) !== "undefined") {
		if(ostanovka == "pogruzkaTovar") {
			mp.game.ui.messages.showMidsized("Пожалуйста ожидайте..", "~s~Начали ~g~погрузку ~s~Вашего состава, подождите.");
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Идёт погрузка..", "Подожди пока состав полностью загрузят..", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			setTimeout(() => {
				mp.game.ui.messages.showMidsized("Погрузка окончена", "~s~Отправляйтесь на станцию для разгрузки!");
				mp.game.ui.notifications.showWithPicture("Диспетчер", "Всё, в путь!", "Можешь отправляться на следующую станцию.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
				
				let mParams = missionIDParams[curMissionID];
				curTrainPointKey = curTrainPointKey + 1;
				curTrainPoint = mParams.points[curTrainPointKey];
				
				if(trainBlip) {
					if(mp.blips.exists(trainBlip)) trainBlip.destroy();
				}
				
				trainBlip = mp.blips.new(626, curTrainPoint.pos, {
					name: "Следующая остановка состава",
					scale: 0.8,
					color: 1,
					shortRange: false,
					dimension: 0
				});
				
				trainParkedProcess = false;
			}, 10000);
		}else if(ostanovka == "razgruzkaTovar") {
			mp.game.ui.messages.showMidsized("Пожалуйста ожидайте..", "~s~Начали ~g~разгрузку ~s~Вашего состава, подождите.");
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Идёт разгрузка..", "Подожди пока состав полностью разгрузят..", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			setTimeout(() => {
				mp.game.ui.messages.showMidsized("Разгрузка окончена", "~s~Доставьте состав на базу железных дорог");
				mp.game.ui.notifications.showWithPicture("Диспетчер", "Отстрелялся?", "Можешь отправляться на базу.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
				
				let mParams = missionIDParams[curMissionID];
				curTrainPointKey = curTrainPointKey + 1;
				curTrainPoint = mParams.points[curTrainPointKey];
				
				if(trainBlip) {
					if(mp.blips.exists(trainBlip)) trainBlip.destroy();
				}
				
				trainBlip = mp.blips.new(626, curTrainPoint.pos, {
					name: "Следующая остановка состава",
					scale: 0.8,
					color: 1,
					shortRange: false,
					dimension: 0
				});
				
				trainParkedProcess = false;
			}, 10000);
		}else if(ostanovka == "stantionR") {
			mp.game.ui.messages.showMidsized("Вы прибыли на станцию", "~s~Откройте ~g~правые двери ~s~(русская Ю)");
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Пассажиры", "Ожидай команду на отправление", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
		}else if(ostanovka == "stantionL") {
			mp.game.ui.messages.showMidsized("Вы прибыли на станцию", "~s~Откройте ~g~левые двери ~s~(русская Б)");
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Пассажиры", "Ожидай команду на отправление", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
		}else if(ostanovka == "finalPoint") {
			mp.game.ui.messages.showMidsized("Маршрут выполнен!", "~s~Успешный ~g~маршрут~s~, Вы справились!");
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Так держать", "Ты успешно выполнил весь маршрут!", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			
			setTimeout(() => {
				mp.events.callRemote('actionMakedTrainJob');
				
				if(trainBlip) {
					if(mp.blips.exists(trainBlip)) trainBlip.destroy();
				}
				
				curMissionID = false, curSimaKey = 0, curSimaphore = {}, curTrainPointKey = 0, curTrainPoint = {};
				
				trainParkedProcess = false;
			}, 2000);
		}
	}else if(typeof(missionIDParams[curMissionID]) !== "undefined") {
		let mParams = missionIDParams[curMissionID];
		
		if(curSimaKey == 0) {
			mParams.simaphores.forEach((prop) => {
				prop.color = getRandomInt(0,2);
				if(prop.color == 1) prop.color = "yellow";
				else prop.color = "green";
			});
			mParams.simaphores[0].color = "green";
			
			curTrainPoint = mParams.points[curTrainPointKey];
			
			if(trainBlip) {
				if(mp.blips.exists(trainBlip)) trainBlip.destroy();
			}
			
			trainBlip = mp.blips.new(626, curTrainPoint.pos, {
				name: "Следующая остановка состава",
				scale: 0.8,
				color: 1,
				shortRange: false,
				dimension: 0
			});
		}
		
		if(typeof(curSimaphore.checkpoint) !== "undefined") {
			if(mp.checkpoints.exists(curSimaphore.checkpoint)) curSimaphore.checkpoint.destroy();
			delete curSimaphore.checkpoint;
		}
		
		if(typeof(mParams.simaphores[curSimaKey]) !== "undefined") {
			curSimaphore.checkpoint = mp.checkpoints.new(40, new mp.Vector3(mParams.simaphores[curSimaKey].pos.x, mParams.simaphores[curSimaKey].pos.y, mParams.simaphores[curSimaKey].pos.z-0.5), 10.0,
			{
				color: [255, 255, 255, 0],
				visible: true,
				dimension: localPlayer.dimension
			});
		}
		
		if(typeof(curSimaphore.marker) !== "undefined") {
			if(mp.markers.exists(curSimaphore.marker)) curSimaphore.marker.destroy();
			delete curSimaphore.marker;
		}
		
		if(typeof(mParams.simaphores[curSimaKey]) !== "undefined") {
			if(mParams.simaphores[curSimaKey].color == "yellow") {
				if(typeof(mParams.simaphores[curSimaKey+1]) !== "undefined") {
					let mayBeNextRed = getRandomInt(0,2);
					if(mayBeNextRed == 1 && curSimaKey+1 < Object.keys(mParams.simaphores).length-1) {
						mParams.simaphores[curSimaKey+1].color = "red";
						if(nextSimaTimer) clearTimeout(nextSimaTimer);
						nextSimaTimer = setTimeout(() => {
							if(typeof(missionIDParams[curMissionID]) !== "undefined") {
								let mParams = missionIDParams[curMissionID];
								if(typeof(mParams.simaphores[curSimaKey]) !== "undefined") {
									mParams.simaphores[curSimaKey].color = "green";
									localPlayer.train.simaphore = "green";
									if(typeof(curSimaphore.marker) !== "undefined") {
										if(mp.markers.exists(curSimaphore.marker)) curSimaphore.marker.colour = [11, 163, 58, 180];
									}
								}
							}
						}, getRandomInt(60000,120000));
					}
				}
			}
			
			let simaColor = [11, 163, 58];
			if(mParams.simaphores[curSimaKey].color == "yellow") simaColor = [232, 184, 12];
			else if(mParams.simaphores[curSimaKey].color == "red") simaColor = [212, 13, 18];
			curSimaphore["marker"] = mp.markers.new(30, new mp.Vector3(mParams.simaphores[curSimaKey].pos.x, mParams.simaphores[curSimaKey].pos.y, mParams.simaphores[curSimaKey].pos.z-0.5), 15.0, {
				direction: new mp.Vector3(0, 0, 0),
				rotation: new mp.Vector3(0, 0, 0),
				color: [simaColor[0], simaColor[1], simaColor[2], 180],
				visible: true,
				dimension: 0
			});
			
			if(localPlayer.train.simaphore == "red") trainWarning("redSima");
			
			localPlayer.train.simaphore = mParams.simaphores[curSimaKey].color.toString();
			localPlayer.train.speedLimit = mParams.simaphores[curSimaKey].speed.toString();
			
			curSimaKey++;
		}else{
			localPlayer.train.simaphore = "green";
		}
	}
}

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(curSimaphore.checkpoint) !== "undefined") {
				if(mp.checkpoints.exists(curSimaphore.checkpoint)) {
					if(curSimaphore.checkpoint == checkpoint) return trainMissionProcessor();
				}
			}
		}
	}
});

mp.events.addDataHandler("player.train", function (entity, value, oldValue) {
	if(entity) {
		if(entity.handle != 0) {
			if(value && !oldValue) {
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * createTrain("+value.mID+", "+value.speed+", "+value.start.x+", "+value.start.y+", "+value.start.z+")</span>");
				if(entity == localPlayer) {
					curMissionID = value.mID.toString();
					curSimaKey = 0;
					curTrainPoint = {};
					curTrainPointKey = 0;
				}
				createTrain(entity, value.mID, value.speed, value.f, value.start.x, value.start.y, value.start.z);
				if(entity == localPlayer) trainMissionProcessor();
			}else if(value && oldValue) {
				if(typeof(entity.train) !== "undefined") {
					if(typeof(entity.train.trains[0]) !== "undefined") {
						if(entity != localPlayer) {
							if(entity.train.trains[0]) {
								mp.game.invoke('0x591CA673AA6AB736', entity.train.trains[0], entity.position.x, entity.position.y, entity.position.z);
								mp.game.invoke('0xAA0BC91BE0B796E3', entity.train.trains[0], value.speed); // setTrainSpeed
								mp.game.invoke('0x16469284DB8C62B5', entity.train.trains[0], value.speed); // setTrainCruiseSpeed
							}
						}
					}else{
						createTrain(entity, value.mID, value.speed, value.f, entity.position.x, entity.position.y, entity.position.z);
					}
				}else{
					createTrain(entity, value.mID, value.speed, value.f, entity.position.x, entity.position.y, entity.position.z);
				}
			}else if(!value && oldValue) {
				if(typeof(entity.train) !== "undefined") {
					mp.events.call("sleepAntiCheat");
					
					if(typeof(entity.train.trains[0]) !== "undefined") mp.game.vehicle.deleteMissionTrain(entity.train.trains[0]);
					delete entity.train;
					
					if(entity == localPlayer) {
						if(nextSimaTimer) clearTimeout(nextSimaTimer);
						
						if(typeof(curSimaphore.checkpoint) !== "undefined") {
							if(mp.checkpoints.exists(curSimaphore.checkpoint)) curSimaphore.checkpoint.destroy();
							delete curSimaphore.checkpoint;
						}
						
						if(typeof(curSimaphore.marker) !== "undefined") {
							if(mp.markers.exists(curSimaphore.marker)) curSimaphore.marker.destroy();
							delete curSimaphore.marker;
						}
						
						if(trainBlip) {
							if(mp.blips.exists(trainBlip)) trainBlip.destroy();
						}
						
						curMissionID = false, curSimaKey = 0, curSimaphore = {}, curTrainPointKey = 0, curTrainPoint = {};
						trainParkedProcess = false;
						
						localPlayer.position = new mp.Vector3(711.58, -966.5077, 30.3953); // в Офис
					}
				}
			}
		}
	}
});

function createTrain(entity, mID, speed, flip, x, y, z) {
	if(entity && typeof(mID) !== "undefined" && typeof(speed) !== "undefined" && typeof(flip) !== "undefined" && typeof(x) !== "undefined" && typeof(y) !== "undefined" && typeof(z) !== "undefined") {
		if(entity.handle != 0) {
			let train_1 = mp.game.vehicle.createMissionTrain(parseInt(mID), parseFloat(x), parseFloat(y), parseFloat(z), flip);
			let train_2 = mp.game.invoke('0x08AAFD0814722BC3', train_1, 1);
			let train_3 = mp.game.invoke('0x08AAFD0814722BC3', train_1, 2);
			let train_4 = mp.game.invoke('0x08AAFD0814722BC3', train_1, 3);
			
			//let pos = mp.game.invokeVector3('0x3FEF770D40960D5A', train_1);
			
			let tempData = {};
			
			tempData["mID"] = mID;
			tempData["speed"] = speed;
			tempData["trains"] = [train_1, train_2, train_3, train_4];
			
			if(entity == localPlayer) {
				tempData["doors"] = [0,0]; // L, R
				tempData["simaphore"] = "green";
				tempData["speedLimit"] = 40;
				tempData["warns"] = 0;
				
				oldTrainSpeed = 0;
			}
			
			entity.train = tempData;
			
			if(!mp.game.invoke('0xEFBE71898A993728', entity.handle, train_1)) mp.game.invoke('0x6B9BBD38AB0796DF', entity.handle, train_1, 0, 0, 0, 0, 0, 0, 0, true, true, false, true, 0, true); // AttachEntityToEntity
			
			mp.game.invoke('0xAA0BC91BE0B796E3', train_1, tempData.speed); // setTrainSpeed
			mp.game.invoke('0x16469284DB8C62B5', train_1, tempData.speed); // setTrainCruiseSpeed
			mp.game.invoke('0xAD738C3085FE7E11', train_1, true, false); // setAsMission
		}
	}
}

mp.keys.bind(0xBC, true, function() { // Левые двери
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0xBC)) return false;
	
	if(typeof(localPlayer.train) !== "undefined") {
		if(!localPlayer.train.doors[0]) {
			if(trainParkedProcess.type == "stantionL") {
				setTimeout(() => {
					mp.game.ui.messages.showMidsized("Пассажиры заняли свои места", "~s~Закройте ~g~левые двери ~s~(русская Б)");
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Отправление", "Можешь продолжать, не забудь закрыть двери.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
					
					let mParams = missionIDParams[curMissionID];
					curTrainPointKey = curTrainPointKey + 1;
					curTrainPoint = mParams.points[curTrainPointKey];
					
					if(trainBlip) {
						if(mp.blips.exists(trainBlip)) trainBlip.destroy();
					}
					
					trainBlip = mp.blips.new(626, curTrainPoint.pos, {
						name: "Следующая остановка состава",
						scale: 0.8,
						color: 1,
						shortRange: false,
						dimension: 0
					});
					
					trainParkedProcess = false;
				}, 10000);
			}
			
			// открыть
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[0],0);
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[0],2);
			//
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[1],0);
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[1],2);
			//
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[2],0);
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[2],2);
			//
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[3],0);
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[3],2);
			
			localPlayer.train.doors[0] = 1;
			if(localPlayer.train.speed != 0) trainWarning("openDoorsInSpeed");
		}else{
			// закрыть
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[0],0);
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[0],2);
			//
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[1],0);
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[1],2);
			//
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[2],0);
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[2],2);
			//
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[3],0);
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[3],2);
			
			localPlayer.train.doors[0] = 0;
		}
	}
});
 
mp.keys.bind(0xBE, true, function() { // Правые двери
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0xBE)) return false;
	
	if(typeof(localPlayer.train) !== "undefined") {
		if(!localPlayer.train.doors[1]) {
			if(trainParkedProcess.type == "stantionR") {
				setTimeout(() => {
					mp.game.ui.messages.showMidsized("Пассажиры заняли свои места", "~s~Закройте ~g~правые двери ~s~(русская Ю)");
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Отправление", "Можешь продолжать, не забудь закрыть двери.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
					
					let mParams = missionIDParams[curMissionID];
					curTrainPointKey = curTrainPointKey + 1;
					curTrainPoint = mParams.points[curTrainPointKey];
					
					if(trainBlip) {
						if(mp.blips.exists(trainBlip)) trainBlip.destroy();
					}
					
					trainBlip = mp.blips.new(626, curTrainPoint.pos, {
						name: "Следующая остановка состава",
						scale: 0.8,
						color: 1,
						shortRange: false,
						dimension: 0
					});
					
					trainParkedProcess = false;
				}, 10000);
			}
			
			// открыть
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[0],1);
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[0],3);
			//
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[1],1);
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[1],3);
			//
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[2],1);
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[2],3);
			//
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[3],1);
			mp.game.invoke('0x7C65DAC73C35C862',localPlayer.train.trains[3],3);
			
			localPlayer.train.doors[1] = 1;
			if(localPlayer.train.speed != 0) trainWarning("openDoorsInSpeed");
		}else{
			// закрыть
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[0],1);
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[0],3);
			//
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[1],1);
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[1],3);
			//
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[2],1);
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[2],3);
			//
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[3],1);
			mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[3],3);
			
			localPlayer.train.doors[1] = 0;
		}
	}
});

function trainWarning(reason) {
	if(typeof(reason) !== "undefined") {
		if(reason == "speedLimit") {
			mp.game.ui.messages.showMidsized("Превышение скоросного ограничение", "~s~Вы ~r~превысили ~s~скоростной режим, предупреждение!");
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Ты что творишь?", "Придержи коней, превышение, выговор!", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			localPlayer.train.warns++;
		}else if(reason == "redSima") {
			mp.game.ui.messages.showMidsized("Запрещающий сигнал семафора", "~s~Вы ~r~проехали на красный ~s~семафор, предупреждение!");
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Ты куда?", "Пролетел под красный семафор? Выговор!", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			localPlayer.train.warns++;
		}else if(reason == "openDoorsInSpeed") {
			mp.game.ui.messages.showMidsized("Нельзя открывать двери на ходу", "~s~Вы ~r~открыли двери ~s~во время движения, предупреждение!");
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Тебя засудят!", "Зачем ты открыл двери? Выговор!", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			localPlayer.train.warns++;
		}
		if(localPlayer.train.warns >= 3) {
			closeJobTablet(true);
			
			trainTasksBlocked = true;
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Выговоры", "Я заблокировал тебе маршруты на 1 мин.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
			setTimeout(function() {
				mp.game.ui.notifications.showWithPicture("Диспетчер", "Маршруты доступны", "Я разблокировал тебе маршруты.", "CHAR_MP_MEX_DOCKS", 1, false, 1, 2);
				trainTasksBlocked = false;
			}, 60000);
			
			mp.events.call("sleepAntiCheat");
			mp.events.callRemote('cancelTrainTask', true);
			
			if(trainBlip) {
				if(mp.blips.exists(trainBlip)) trainBlip.destroy();
			}
			
			curMissionID = false, curSimaKey = 0, curSimaphore = {}, curTrainPointKey = 0, curTrainPoint = {};
			trainParkedProcess = false;
		}
	}
}

var trainTicks = 0, goodTrainParked = false, trainParkedProcess = false, oldTrainSpeed = 0;
let kTrainPressed = false;
let speedWarning = 0;

mp.events.add('render', () => {
	if(typeof(localPlayer.train) !== "undefined") {
		if(typeof(localPlayer.train.trains[0]) !== "undefined") {
			if(!mp.game.invoke('0xEFBE71898A993728', localPlayer.handle, localPlayer.train.trains[0])) mp.game.invoke('0x6B9BBD38AB0796DF', localPlayer.handle, localPlayer.train.trains[0], 0, 0, 0, 0, 0, 0, 0, true, true, false, true, 0, true); // AttachEntityToEntity
			mp.game.invoke('0xE9EA16D6E54CDCA4', localPlayer.train.trains[0], 0); // SetInVehicleCamStateThisUpdate
			//mp.game.invoke('0x8D4D46230B2C353A', 3);

			//mp.game.invoke('0x8BBACBF51DA047A8', localPlayer.handle);
			//mp.game.invoke('0x44A113DD6FFC48D1', "FOLLOW_PED_SKY_DIVING_CAMERA", 3000);
			
			//mp.game.invoke('0x2AED6301F67007D5', localPlayer.train.trains[0]); // _DISABLE_CAM_COLLISION_FOR_ENTITY
			
			trainTicks++;
			
			let mParams = {};
			if(typeof(missionIDParams[curMissionID]) !== "undefined") mParams = missionIDParams[curMissionID];
			
			if(typeof(mParams.maxSpeed) !== "undefined") {
				if(Math.round(parseFloat(localPlayer.train.speed * 3.45)) > localPlayer.train.speedLimit) {
					speedWarning++;
					if(speedWarning >= 1000) {
						speedWarning = 0;
						trainWarning("speedLimit");
					}
				}else{
					if(speedWarning > 0 && speedWarning < 1000) speedWarning = speedWarning - 0.5;
				}
			}
			
			if(!goodTrainParked && !trainParkedProcess) {
				if(trainTicks == 40 || trainTicks == 80 || trainTicks == 120 || trainTicks == 160) {
					if(mp.game.controls.isControlPressed(0, 71)) { // -- Accel (W)
						if(typeof(mParams.maxSpeed) !== "undefined") {
							if(localPlayer.train.speed <= mParams.maxSpeed) {
								localPlayer.train.speed = Math.round((localPlayer.train.speed + mParams.accel).toFixed(1) * 100) / 100;
								if(!isFloat(localPlayer.train.speed)) localPlayer.train.speed = parseFloat(localPlayer.train.speed)+0.1;
								if(localPlayer.train.speed > -mParams.dccel && localPlayer.train.speed < mParams.accel) localPlayer.train.speed = 0;
								//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+localPlayer.train.speed+"</span>");
								mp.game.invoke('0xAA0BC91BE0B796E3', localPlayer.train.trains[0], localPlayer.train.speed); // setTrainSpeed
								mp.game.invoke('0x16469284DB8C62B5', localPlayer.train.trains[0], localPlayer.train.speed); // setTrainCruiseSpeed
							}
							kTrainPressed = "W";
						}
					}else if(mp.game.controls.isControlPressed(0, 72)){ // -- Dccel (S)
						if(typeof(mParams.maxSpeed) !== "undefined") {
							if(localPlayer.train.speed >= -10) {
								localPlayer.train.speed = Math.round((localPlayer.train.speed - mParams.dccel).toFixed(1) * 100) / 100;
								if(!isFloat(localPlayer.train.speed)) localPlayer.train.speed = parseFloat(localPlayer.train.speed)-0.1;
								if(localPlayer.train.speed > -mParams.dccel && localPlayer.train.speed < mParams.accel) localPlayer.train.speed = 0;
								//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+localPlayer.train.speed+"</span>");
								mp.game.invoke('0xAA0BC91BE0B796E3', localPlayer.train.trains[0], localPlayer.train.speed); // setTrainSpeed
								mp.game.invoke('0x16469284DB8C62B5', localPlayer.train.trains[0], localPlayer.train.speed); // setTrainCruiseSpeed
							}
							kTrainPressed = "S";
						}
					}
				}else if(trainTicks >= 200) {
					if(kTrainPressed == "W" || mp.game.controls.isControlPressed(0, 71)) { // -- Accel (W)
						if(typeof(mParams.maxSpeed) !== "undefined") {
							if(!kTrainPressed && localPlayer.train.speed <= mParams.maxSpeed) {
								localPlayer.train.speed = Math.round((localPlayer.train.speed + mParams.accel).toFixed(1) * 100) / 100;
								if(!isFloat(localPlayer.train.speed)) localPlayer.train.speed = parseFloat(localPlayer.train.speed)+0.1;
								if(localPlayer.train.speed > -mParams.dccel && localPlayer.train.speed < mParams.accel) localPlayer.train.speed = 0;
								mp.game.invoke('0xAA0BC91BE0B796E3', localPlayer.train.trains[0], localPlayer.train.speed); // setTrainSpeed
								mp.game.invoke('0x16469284DB8C62B5', localPlayer.train.trains[0], localPlayer.train.speed); // setTrainCruiseSpeed
							}
							if(oldTrainSpeed != localPlayer.train.speed) {
								mp.events.callRemote('setTrainSpeed', localPlayer.train.speed.toString());
								//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+localPlayer.train.speed+" SYNCED</span>");
								oldTrainSpeed = localPlayer.train.speed;
								
								if(localPlayer.train.speed != 0) {
									if(localPlayer.train.doors[0]) {
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[0],0);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[0],2);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[1],0);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[1],2);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[2],0);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[2],2);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[3],0);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[3],2);
										localPlayer.train.doors[0] = 0;
										trainWarning("openDoorsInSpeed");
									}else if(localPlayer.train.doors[1]) {
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[0],1);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[0],3);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[1],1);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[1],3);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[2],1);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[2],3);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[3],1);
										mp.game.invoke('0x93D9BD300D7789E5',localPlayer.train.trains[3],3);
										localPlayer.train.doors[1] = 0;
										trainWarning("openDoorsInSpeed");
									}
								}
							}
						}
					}else if(kTrainPressed == "S" || mp.game.controls.isControlPressed(0, 72)){ // -- Dccel (S)
						if(typeof(mParams.maxSpeed) !== "undefined") {
							if(!kTrainPressed && localPlayer.train.speed >= -10) {
								localPlayer.train.speed = Math.round((localPlayer.train.speed - mParams.dccel).toFixed(1) * 100) / 100;
								if(!isFloat(localPlayer.train.speed)) localPlayer.train.speed = parseFloat(localPlayer.train.speed)-0.1;
								if(localPlayer.train.speed > -mParams.dccel && localPlayer.train.speed < mParams.accel);
								mp.game.invoke('0xAA0BC91BE0B796E3', localPlayer.train.trains[0], localPlayer.train.speed); // setTrainSpeed
								mp.game.invoke('0x16469284DB8C62B5', localPlayer.train.trains[0], localPlayer.train.speed); // setTrainCruiseSpeed
							}
							if(oldTrainSpeed != localPlayer.train.speed) {
								mp.events.callRemote('setTrainSpeed', localPlayer.train.speed.toString());
								//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+localPlayer.train.speed+" SYNCED</span>");
								oldTrainSpeed = localPlayer.train.speed;
							}
						}
					}
					if(kTrainPressed) kTrainPressed = false;
					trainTicks = 0;
				}
			}
			
			if(typeof(curTrainPoint.pos) !== "undefined") {
				let train_1 = localPlayer.train.trains[0];
				let golovaPos = mp.game.invokeVector3('0x3FEF770D40960D5A', train_1);
				
				let markerPos = curTrainPoint.pos;
				let dist = mp.game.gameplay.getDistanceBetweenCoords(golovaPos.x, golovaPos.y, golovaPos.z, markerPos.x, markerPos.y, markerPos.z, false);
				if(dist < 8.5) {
					if(dist < 2) {
						curTrainPoint.color[0] = 0;
						curTrainPoint.color[1] = 255;
						curTrainPoint.color[2] = 0;
						curTrainPoint.color[3] = 255;
						if(!goodTrainParked && !trainParkedProcess && localPlayer.train.speed == 0) {
							goodTrainParked = curTrainPoint;
							trainParkedProcess = curTrainPoint;
							curTrainPoint.color[0] = 4;
							curTrainPoint.color[1] = 36;
							curTrainPoint.color[2] = 217;
						}else if(goodTrainParked || trainParkedProcess) {
							curTrainPoint.color[0] = 4;
							curTrainPoint.color[1] = 36;
							curTrainPoint.color[2] = 217;
						}
					}else{
						curTrainPoint.color[0] = 255;
						curTrainPoint.color[1] = 0;
						curTrainPoint.color[2] = 0;
						curTrainPoint.color[3] = 200;
					}
				}else{
					curTrainPoint.color[0] = 255;
					curTrainPoint.color[1] = 150;
					curTrainPoint.color[2] = 0;
					curTrainPoint.color[3] = 150;
				}
				
				for (let i = 0; i < 4; i++) {
					curTrainPoint.drawColor[i] += .03 * (curTrainPoint.color[i] - curTrainPoint.drawColor[i]);
				}
				
				mp.game1.graphics.drawMarker(43, markerPos.x, markerPos.y, markerPos.z-1.4, 0, 0, 0, 0, 0, curTrainPoint.heading, curTrainPoint.width, curTrainPoint.height, 9, curTrainPoint.drawColor[0], curTrainPoint.drawColor[1], curTrainPoint.drawColor[2], curTrainPoint.drawColor[3], true, false, 0, false, "", "", false);
				mp.game1.graphics.drawMarker(22, markerPos.x, markerPos.y, (markerPos.z-1.4)+0.65, curTrainPoint.dir[0], curTrainPoint.dir[1], 0, 270, 0, 0, 2, 2, 2, curTrainPoint.drawColor[0], curTrainPoint.drawColor[1], curTrainPoint.drawColor[2], curTrainPoint.drawColor[3], false, false, 0, false, "", "", false);
				
				if(goodTrainParked) {
					if(typeof(localPlayer.train) !== "undefined") {
						if(localPlayer.train) {
							if(typeof(goodTrainParked.type) !== "undefined") {
								trainMissionProcessor(goodTrainParked.type.toString());
								goodTrainParked = false;
							}
						}
					}
				}
			}
		}
	}
});

mp.events.add("playerQuit", (player) => {
	if(player == localPlayer) {
		mp.players.forEach((entity) => {
			if(typeof(entity.train) !== "undefined") {
				if(typeof(entity.train.trains[0]) !== "undefined") mp.game.vehicle.deleteMissionTrain(entity.train.trains[0]);
				delete entity.train;
			}
		});
	}
});
}