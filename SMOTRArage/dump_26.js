{
/*mp.markers.new(28, new mp.Vector3(-893.9126,-2402.5571,14.0244), 30, // DEBUG
{
	direction: new mp.Vector3(0, 0, 0),
	rotation: new mp.Vector3(0, 180, 0),
	color: [0, 0, 200, 50],
	visible: true,
	dimension: 0
});*/

var truckMomentStart = false;

let truckMarshrut1 = { // Actros, pilomat
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-601.8714,5342.8735,70.4683),
	"endpointMarkers":[
		{"position":new mp.Vector3(-601.8714,5342.8735,70.4683-3.3),"heading":173.60,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(173.60),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut2 = { // Actros, pilomat
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-509.7189,5265.5776,80.6101),
	"endpointMarkers":[
		{"position":new mp.Vector3(-509.7189,5265.5776,80.6101-3.3),"heading":155.16,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(155.16),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut3 = { // Actros, wood
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(288.3423,6790.0723,15.6965),
	"endpointMarkers":[
		{"position":new mp.Vector3(288.3423,6790.0723,15.6965-3.3),"heading":188.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(188.40),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut4 = { // Actros, wood
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-541.6321,5376.7417,70.5674),
	"endpointMarkers":[
		{"position":new mp.Vector3(-541.6321,5376.7417,70.5674-3.3),"heading":82.21,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(82.21),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut5 = { // Actros, tubes
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(286.1227,2829.3606,43.4336),
	"endpointMarkers":[
		{"position":new mp.Vector3(286.1227,2829.3606,43.4336-3.3),"heading":289.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(289.05),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut6 = { // Actros, tubes
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(2895.1143,4381.5093,50.3714),
	"endpointMarkers":[
		{"position":new mp.Vector3(2895.1143,4381.5093,50.3714-3.3),"heading":294.76,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(294.76),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut7 = { // Actros, tubes
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1146.8861,2084.0945,55.9525),
	"endpointMarkers":[
		{"position":new mp.Vector3(1146.8861,2084.0945,55.9525-3.3),"heading":288.23,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(288.23),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut8 = { // Actros, neft
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(2895.1143,4381.5093,50.3714),
	"endpointMarkers":[
		{"position":new mp.Vector3(2895.1143,4381.5093,50.3714-3.3),"heading":294.76,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(294.76),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut9 = { // Actros, tubes TEST
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-390.1935,-2775.6772,6.0004),
	"endpointMarkers":[
		{"position":new mp.Vector3(-390.1935,-2775.6772,6.0004-3.3),"heading":128.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(128.73),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut10 = { // Arocs, CAT
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(2409.3743,4986.8101,46.1991),
	"endpointMarkers":[
		{"position":new mp.Vector3(2409.3743,4986.8101,46.1991-3.3),"heading":132.12,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.12),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut11 = { // Arocs, CAT
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(90.1092,6520.5435,31.3237),
	"endpointMarkers":[
		{"position":new mp.Vector3(90.1092,6520.5435,31.3237-3.3),"heading":126.86,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(126.86),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut12 = { // Arocs, Яхта
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1370.4717,4319.5234,38.213),
	"endpointMarkers":[
		{"position":new mp.Vector3(1370.4717,4319.5234,38.213-3.3),"heading":58.49,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(58.49),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut13 = { // Arocs, Яхта
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1565.676,3792.5701,34.1405),
	"endpointMarkers":[
		{"position":new mp.Vector3(1565.676,3792.5701,34.1405-3.3),"heading":38.213,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.213),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut14 = { // Arocs, Армейская деталь
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-1666.9309,3077.5708,31.301),
	"endpointMarkers":[
		{"position":new mp.Vector3(-1666.9309,3077.5708,31.301-3.3),"heading":219.49,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(219.49),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut15 = { // Arocs, Армейская деталь
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(3504.7097,3677.9639,33.8816),
	"endpointMarkers":[
		{"position":new mp.Vector3(3504.7097,3677.9639,33.8816-3.3),"heading":77.544,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(77.544),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut16 = { // Arocs, Контейнер с грузом
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-1157.1597,2666.9946,18.0939),
	"endpointMarkers":[
		{"position":new mp.Vector3(-1157.1597,2666.9946,18.0939-3.3),"heading":206.18,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(206.18),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut17 = { // Arocs, Контейнер с грузом
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1768.8383,3307.5293,41.1586),
	"endpointMarkers":[
		{"position":new mp.Vector3(1768.8383,3307.5293,41.1586-3.3),"heading":252.88,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(252.88),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut18 = { // VNL, IKEA Хармони
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(587.6883,2794.5759,42.078),
	"endpointMarkers":[
		{"position":new mp.Vector3(587.6883,2794.5759,42.078-3.3),"heading":4.79,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.79),"width":3,"height":14},
		{"position":new mp.Vector3(582.1607,2794.1958,42.1409-3.3),"heading":4.79,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.79),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut19 = { // VNL, IKEA Сэнди-Шорс
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1968.0311,3752.6885,32.2061),
	"endpointMarkers":[
		{"position":new mp.Vector3(1968.0311,3752.6885,32.2061-3.3),"heading":216.63,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(216.63),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut20 = { // VNL, APPLE Хармони
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(587.6883,2794.5759,42.078),
	"endpointMarkers":[
		{"position":new mp.Vector3(587.6883,2794.5759,42.078-3.3),"heading":4.79,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.79),"width":3,"height":14},
		{"position":new mp.Vector3(582.1607,2794.1958,42.1409-3.3),"heading":4.79,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.79),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut21 = { // VNL, Apple Humane Labs
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(3565.7222,3662.6919,33.9454),
	"endpointMarkers":[
		{"position":new mp.Vector3(3565.7222,3662.6919,33.9454-3.3),"heading":95.666,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(95.666),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut22 = { // VNL, Apple Палето Бэй, Willies
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-67.3125,6496.3735,31.4904),
	"endpointMarkers":[
		{"position":new mp.Vector3(-67.3125,6496.3735,31.4904-3.3),"heading":112.56,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(112.56),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut23 = { // VNL, AMAZON Грейпсид
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1711.2941,4802.1846,41.7697),
	"endpointMarkers":[
		{"position":new mp.Vector3(1711.2941,4802.1846,41.7697-3.3),"heading":84.95,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(84.95),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut24 = { // VNL, AMAZON Палето Бэй
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(150.7981,6638.207,31.6049),
	"endpointMarkers":[
		{"position":new mp.Vector3(150.7981,6638.207,31.6049-3.3),"heading":220.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(220.00),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut25 = { // VNL, AMAZON Грейт-Чапаррал, шоссе 68
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-1134.2875,2694.0164,18.8004),
	"endpointMarkers":[
		{"position":new mp.Vector3(-1134.2875,2694.0164,18.8004-3.3),"heading":154.66,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(154.66),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut26 = { // VNL, Wallmart Хармони
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(587.6883,2794.5759,42.078),
	"endpointMarkers":[
		{"position":new mp.Vector3(587.6883,2794.5759,42.078-3.3),"heading":4.79,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.79),"width":3,"height":14},
		{"position":new mp.Vector3(582.1607,2794.1958,42.1409-3.3),"heading":4.79,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.79),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut27 = { // VNL, Wallmart Федеральная тюрьма Лос-Сантоса
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1854.5282,2551.8059,45.672),
	"endpointMarkers":[
		{"position":new mp.Vector3(1854.5282,2551.8059,45.672-3.3),"heading":354.107,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(354.107),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut28 = { // VNL, Wallmart Симфонический театр Лос-Сантоса
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(203.3745,1245.3187,225.4598),
	"endpointMarkers":[
		{"position":new mp.Vector3(203.3745,1245.3187,225.4598-3.3),"heading":280,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(280),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut29 = { // VNL, Wallmart Палето Бэй, Willies
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-67.3125,6496.3735,31.4904),
	"endpointMarkers":[
		{"position":new mp.Vector3(-67.3125,6496.3735,31.4904-3.3),"heading":112.56,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(112.56),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut30 = { // VNL, Samsung Хармони
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(587.6883,2794.5759,42.078),
	"endpointMarkers":[
		{"position":new mp.Vector3(587.6883,2794.5759,42.078-3.3),"heading":4.79,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.79),"width":3,"height":14},
		{"position":new mp.Vector3(582.1607,2794.1958,42.1409-3.3),"heading":4.79,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.79),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut31 = { // VNL, Samsung Humane Labs
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(3565.7222,3662.6919,33.9454),
	"endpointMarkers":[
		{"position":new mp.Vector3(3565.7222,3662.6919,33.9454-3.3),"heading":95.666,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(95.666),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut32 = { // VNL, Samsung Палето Бэй, Willies
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-67.3125,6496.3735,31.4904),
	"endpointMarkers":[
		{"position":new mp.Vector3(-67.3125,6496.3735,31.4904-3.3),"heading":112.56,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(112.56),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut33 = { // VNL, DUREX Федеральная тюрьма Лос-Сантоса
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1854.5282,2551.8059,45.672),
	"endpointMarkers":[
		{"position":new mp.Vector3(1854.5282,2551.8059,45.672-3.3),"heading":354.107,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(354.107),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut34 = { // VNL, DUREX Симфонический театр Лос-Сантоса
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(203.3745,1245.3187,225.4598),
	"endpointMarkers":[
		{"position":new mp.Vector3(203.3745,1245.3187,225.4598-3.3),"heading":280,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(280),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut35 = { // VNL, DUREX Сэнди-Шорс
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(1968.0311,3752.6885,32.2061),
	"endpointMarkers":[
		{"position":new mp.Vector3(1968.0311,3752.6885,32.2061-3.3),"heading":216.63,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(216.63),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut36 = { // VNL, Walmart Лаго Занкудо
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-2522.3533,2336.0264,33.2105),
	"endpointMarkers":[
		{"position":new mp.Vector3(-2522.3533,2336.0264,33.2105-3.3),"heading":213.371,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(213.371),"width":3,"height":14},
		{"position":new mp.Vector3(-2530.0457,2335.563,33.2094-3.3),"heading":213.371,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(212.018),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut37 = { // VNL, Amazon Лаго Занкудо
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(926.1957,3660.594,32.6255),
	"endpointMarkers":[
		{"position":new mp.Vector3(926.1957,3660.594,32.6255-3.3),"heading":269.525,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(269.525),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut38 = { // Actros, Amazon Ветряная ферма
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(2480.0432,1589.406,32.8716),
	"endpointMarkers":[
		{"position":new mp.Vector3(2480.0432,1589.406,32.8716-3.3),"heading":269.263,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(269.263),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut39 = { // VNL, Durex Прокопио-променад
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-672.2142,5822.7368,17.4815),
	"endpointMarkers":[
		{"position":new mp.Vector3(-672.2142,5822.7368,17.4815-3.3),"heading":67.043,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(67.043),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut40 = { // VNL, IKEA Шоссе Сенора
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(2699.6509,3450.1384,55.9469),
	"endpointMarkers":[
		{"position":new mp.Vector3(2699.6509,3450.1384,55.9469-3.3),"heading":249.410,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(249.410),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut41 = { // Actros, Нефтепродукты
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(236.992,2588.7468,44.8929),
	"endpointMarkers":[
		{"position":new mp.Vector3(236.992,2588.7468,44.8929-3.0),"heading":20.157,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(20.157),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut42 = { // Actros, Нефтепродукты
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(2725.1951,1709.0409,24.2733),
	"endpointMarkers":[
		{"position":new mp.Vector3(2725.1951,1709.0409,24.2733-3.0),"heading":272.093,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(272.093),"width":3,"height":14},
		{"position":new mp.Vector3(2773.0078,1709.0435,24.2747-3.0),"heading":271.594,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(271.594),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut43 = { // VNL, Samsung
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-67.0945,1879.1006,196.6787),
	"endpointMarkers":[
		{"position":new mp.Vector3(-67.0945,1879.1006,196.6787-3.0),"heading":260.374,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(260.374),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut44 = { // VNL, Apple
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(611.5448,2804.4709,41.5881),
	"endpointMarkers":[
		{"position":new mp.Vector3(611.5448,2804.4709,41.5881-3.0),"heading":5.893,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(5.893),"width":3,"height":14},
		{"position":new mp.Vector3(604.9719,2802.9194,41.5822-3.0),"heading":4.208,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(4.208),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut45 = { // Arocs, Контейнер с грузом
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(177.4946,2743.8633,43.0943),
	"endpointMarkers":[
		{"position":new mp.Vector3(177.4946,2743.8633,43.0943-3.0),"heading":99.423,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(99.423),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

let truckMarshrut46 = { // Arocs, CAT
	"pogruzkaBlip":new mp.Vector3(-532.0687,-2818.8875,6.0004),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-505.0674,-2829.8564,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-509.8111,-2834.5649,6.004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-513.9752,-2838.7063,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8141,-2843.4905,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-523.1789,-2847.9175,6.0004-3.3),"heading":47.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.13),"width":4,"height":6.5},
		{"position":new mp.Vector3(-518.8992,-2808.6934,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-529.9841,-2799.7261,6.0455-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5},
		{"position":new mp.Vector3(-536.9337,-2793.5515,6.0004-3.3),"heading":136.34,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(136.34),"width":4,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-286.4563,6035.355,31.1743),
	"endpointMarkers":[
		{"position":new mp.Vector3(-286.4563,6035.355,31.1743-3.0),"heading":48.316,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(48.316),"width":3,"height":14},
		{"position":new mp.Vector3(-268.849,6061.8584,31.1325-3.0),"heading":49.539,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(49.539),"width":3,"height":14}
	],
	"bazaBackBlip":new mp.Vector3(-386.045,-2660.3125,6.0002),
	"bazaBackMarkers":[
		{"position":new mp.Vector3(-257.2983,-2572.6265,6.0006-3.3),"heading":178.203,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.203),"width":3,"height":14},
		{"position":new mp.Vector3(-266.851,-2579.8989,6.0006-3.3),"heading":178.10,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(178.10),"width":3,"height":14},
		{"position":new mp.Vector3(-358.0685,-2594.9722,6.0003-3.3),"heading":130.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(130.47),"width":3,"height":14},
		{"position":new mp.Vector3(-383.7819,-2620.4355,6.0003-3.3),"heading":132.71,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(132.71),"width":3,"height":14},
		{"position":new mp.Vector3(-410.0958,-2647.2419,6.0002-3.3),"heading":131.05,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.05),"width":3,"height":14},
		{"position":new mp.Vector3(-444.016,-2680.364,6.0002-3.3),"heading":138.15,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.15),"width":3,"height":14},
		{"position":new mp.Vector3(-474.3696,-2711.3489,6.0002-3.3),"heading":138.40,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(138.40),"width":3,"height":14},
		{"position":new mp.Vector3(-468.4227,-2755.4624,6.0002-3.3),"heading":43.676,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(43.676),"width":3,"height":14},
		{"position":new mp.Vector3(-479.9584,2768.1741,6.0004-3.3),"heading":38.506,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(38.506),"width":3,"height":14},
		{"position":new mp.Vector3(-485.8505,-2775.4905,6.0004-3.3),"heading":36.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.815),"width":3,"height":14},
		{"position":new mp.Vector3(-496.9845,-2785.6479,6.0004-3.3),"heading":40.766,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(40.766),"width":3,"height":14},
		{"position":new mp.Vector3(-432.7078,-2711.1775,6.0002-3.3),"heading":223.99,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(223.99),"width":3,"height":14},
		{"position":new mp.Vector3(-422.6357,-2703.312,6.0002-3.3),"heading":224.38,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.38),"width":3,"height":14},
		{"position":new mp.Vector3(-412.8348,-2742.1892,6.0002-3.3),"heading":357.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.53),"width":3,"height":14},
		{"position":new mp.Vector3(-400.878,-2743.9443,6.001-3.3),"heading":358.53,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.53),"width":3,"height":14},
		{"position":new mp.Vector3(-391.3651,-2656.1357,6.0002-3.3),"heading":313.46,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.46),"width":3,"height":14},
		{"position":new mp.Vector3(-340.255,-2604.4497,6.0003-3.3),"heading":312.00,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(312.00),"width":3,"height":14},
		{"position":new mp.Vector3(-306.6359,-2547.9248,6.0006-3.3),"heading":225.96,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(225.96),"width":3,"height":14},
		{"position":new mp.Vector3(-269.0743,-2543.8591,6.0006-3.3),"heading":139.54,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(139.54),"width":3,"height":14},
		{"position":new mp.Vector3(-265.3459,-2508.1226,6.0006-3.3),"heading":228.74,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(228.74),"width":3,"height":14},
		{"position":new mp.Vector3(-260.5601,-2501.459,6.0006-3.3),"heading":224.13,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(224.13),"width":3,"height":14},
		{"position":new mp.Vector3(-254.7072,-2495.6079,6.0006-3.3),"heading":233.89,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(233.89),"width":3,"height":14},
		{"position":new mp.Vector3(-312.8976,-2607.6213,6.0003-3.3),"heading":316.73,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(316.73),"width":3,"height":14},
		{"position":new mp.Vector3(-362.5563,-2656.4954,6.0003-3.3),"heading":133.32,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(133.32),"width":3,"height":14},
		{"position":new mp.Vector3(-336.3795,-2631.3164,6.0003-3.3),"heading":134.25,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.25),"width":3,"height":14}
	]
};

var truckWorkZone = mp.colshapes.newSphere(-422.5246,-2787.9614,6.0004,150,0);
var truckImInWorkZone = false;

var curTruckTask = false, truckBlip = false;

var truckTasksBlocked = false;

function startTruckJob() {
	if(typeof(localPlayer.getVariable('player.lics')) === "undefined") return hud_browser.execute('jobPanelError("#startTruckJob", "Технические неполадки системы лицензий..")');
	let myLics = {};
	if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
	if(myLics["cCat"] === undefined) return hud_browser.execute('jobPanelError("#startTruckJob", "Отсутствуют водительские права категории «C»")');
	if(myLics["eCat"] === undefined) return hud_browser.execute('jobPanelError("#startTruckJob", "Отсутствуют водительские права категории «E»")');
	
	if(typeof(localPlayer.getVariable('player.blocks')) === "undefined") return hud_browser.execute('jobPanelError("#startTruckJob", "Не инициализирован уровень персонажа..")');
	let myBlocks = localPlayer.getVariable('player.blocks');
	if(typeof(myBlocks.lvl) !== "undefined") {
		if(myBlocks.lvl < 5) return hud_browser.execute('jobPanelError("#startTruckJob", "Необходим 5 уровень персонажа, его нужно повысить через телефон.")');
	}else{
		return hud_browser.execute('jobPanelError("#startTruckJob", "Не инициализирован уровень персонажа..")');
	}
	
	closeJobTablet();
	mp.events.callRemote('startTruckJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас приняли работать в грузоперевозки", 5, false, true, 6500);
	setTimeout(function() {
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Добро пожаловать", "Получил рабочий планшет? Нажми F5 и выбери свой первый рейс.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
	}, 2000);
}
mp.events.add("startTruckJob", startTruckJob);

function startTruckWorkError(errReason) {
	if(typeof(errReason) === "undefined") return notyAPI.error("Что-то пошло не так при выборе грузовика.", 3000, true);
	notyAPI.error(errReason, 3000, true);
}
mp.events.add("startTruckWorkError", startTruckWorkError);

function truckStartStop(gruzovik) {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		closeJobTablet(true);
		
		if(jobData.work == 0) {
			if(typeof(gruzovik) === "undefined") return notyAPI.error("Вы не выбрали грузовик.", 3000, true);
			if(gruzovik != "1" && gruzovik != "2" && gruzovik != "3") return notyAPI.error("Вы не выбрали грузовик.", 3000, true);
			if(truckImInWorkZone) {
				if(localPlayer.vehicle) {
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Связь плохая", "Нельзя начать смену из транспорта.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
				}else{
					if(!activeJOBoperation) {
						truckMomentStart = true;
						setTimeout(function() { truckMomentStart = false; }, 3500);
						mp.events.call("sleepAntiCheat");
						mp.events.callRemote('startJobWork', gruzovik);
						mp.game.ui.notifications.showWithPicture("Диспетчер", "Смена началась", "Возьми рейс. Задачи в планшете (F5)", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
					}
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Диспетчер", "Явитесь в офис", "Смену можно начать только на территории базы.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
				notyAPI.error("Явитесь на базу грузоперевозок что бы начать смену.", 3000, true);
			}
		}else{
			if(!activeJOBoperation) {
				activeJOBoperation = true;
				
				//if(curTruckTask) mp.events.callRemote('cancelTruckTask', JSON.stringify(curTruckTask), false);
				//curTruckTask = false;
		
				if(truckBlip) {
					truckBlip.destroy();
					truckBlip = false;
				}
				
				if(jobVehBackTimer) clearTimeout(jobVehBackTimer);
				
				vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
				curTruckTask = false;
		
				if(jobData.workMoney > 0) {
					//let resWorkMoney = roundNumber((parseInt(jobData.workMoney)-(parseInt(jobData.workMoney)*0.13)), 0);
					let resWorkMoney = roundNumber(parseInt(jobData.workMoney), 0);
					let workMoneyText = resWorkMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы заработали за смену"+workMoneyText+" руб.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Молодца!", "Отдохни и выходи на смену снова, давай братан!", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
				}else{
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы ничего не заработали за смену.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Это как так?", "Ты не выполнил ни одного рейса. Блок агрегатора 1 мин.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
					truckTasksBlocked = true;
					setTimeout(function() {
						mp.game.ui.notifications.showWithPicture("Диспетчер", "Задачи доступны", "Я разблокировал тебе рейсы.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
						truckTasksBlocked = false;
					}, 60000);
				}
				
				mp.events.callRemote('stopJobWork');
			}
		}
	}
}
mp.events.add("truckStartStop", truckStartStop);

function getTruckTasks(){
	if(!truckBlip) {
		if(!localPlayer.vehicle) {
			return hud_browser.execute("gettedTruckTasks('you_not_in_veh');");
		}else{
			let theVeh = localPlayer.vehicle;
			if(typeof(theVeh.getVariable("veh.job")) === "undefined") return hud_browser.execute("gettedTruckTasks('you_not_in_veh');");
			if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')))) {
				let vehJob = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')));
				if(vehJob.remoteId.toString() != localPlayer.remoteId.toString()) return hud_browser.execute("gettedTruckTasks('you_not_in_veh');");
			}else{
				 return hud_browser.execute("gettedTruckTasks('you_not_in_veh');");
			}
		}
		mp.events.callRemote('getTruckTasks');
	}else{
		hud_browser.execute("gettedTruckTasks('you_have_task');");
	}
}
mp.events.add("getTruckTasks", getTruckTasks);

function gettedTruckTasks(truckTasks){
	if(truckTasks) {
		if(!curTruckTask && typeof(localPlayer.getVariable("player.job")) !== "undefined") {
			truckTasks = JSON.parse(truckTasks);
			if(Object.keys(truckTasks).length > 0) {
				let jobData = localPlayer.getVariable("player.job");
				
				let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
				for (var k in truckTasks) {
					if(truckTasks[k]) {
						let taskData = truckTasks[k];
						taskData.truckName = "Грузовик";
						if(parseInt(jobData.rank) >= parseInt(taskData.minRank)) {
							if(typeof(taskData.truck) !== "undefined") {
								if(typeof(decVehStats[0][taskData.truck]) !== "undefined") taskData.truckName = decVehStats[0][taskData.truck].name;
								else taskData.truckName = taskData.truck;
							}
						}else{
							delete truckTasks[k];
						}
					}
				}
				truckTasks = truckTasks.filter(function (el) { return el != null; });
				
				if(truckTasks) hud_browser.execute("gettedTruckTasks('ok', '"+JSON.stringify(truckTasks)+"');");
				else hud_browser.execute("gettedTruckTasks('empty');");
			}else{
				hud_browser.execute("gettedTruckTasks('empty');");
			}
		}else{
			hud_browser.execute("gettedTruckTasks('you_have_task');");
		}
	}
}
mp.events.add("gettedTruckTasks", gettedTruckTasks);

function acceptTaskTruck(data){
	if(data) {
		if(typeof(data.premium) !== "undefined") {
			if(data.premium) {
				if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
					let myBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(myBlocks.premium) === "undefined") return notyAPI.error("У Вас нет премиум-статуса.", 3000, true);
				}
			}
		}
		closeJobTablet();
		if(truckTasksBlocked) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Блокировка доступа", "У Тебя блок доступа к задачам на 1 мин.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
			return notyAPI.error("У Тебя заблокирован доступ к рейсам, попробуйте через минуту.", 3000, true);
		}
		
		if(!truckImInWorkZone) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Явитесь в офис", "Рейс можно начать только на территории Базы.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
			return notyAPI.error("Явись на базу что бы взять рейс.", 3000, true);
		}
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('acceptTaskTruck', data);
	}
}
mp.events.add("acceptTaskTruck", acceptTaskTruck);

function acceptedTruckTask(isError, data) {
	restoreBinds();
	jobPanel = false;
	if(isError) {
		return notyAPI.error(isError, 3000, true);
	}else{
		if(data) {
			if(localPlayer.vehicle) {
				data = JSON.parse(data);
				curTruckTask = data;
				if(curTruckTask.marshrut == 1) curTruckTask.marshrut = truckMarshrut1;
				if(curTruckTask.marshrut == 2) curTruckTask.marshrut = truckMarshrut2;
				if(curTruckTask.marshrut == 3) curTruckTask.marshrut = truckMarshrut3;
				if(curTruckTask.marshrut == 4) curTruckTask.marshrut = truckMarshrut4;
				if(curTruckTask.marshrut == 5) curTruckTask.marshrut = truckMarshrut5;
				if(curTruckTask.marshrut == 6) curTruckTask.marshrut = truckMarshrut6;
				if(curTruckTask.marshrut == 7) curTruckTask.marshrut = truckMarshrut7;
				if(curTruckTask.marshrut == 8) curTruckTask.marshrut = truckMarshrut8;
				if(curTruckTask.marshrut == 9) curTruckTask.marshrut = truckMarshrut9;
				if(curTruckTask.marshrut == 10) curTruckTask.marshrut = truckMarshrut10;
				if(curTruckTask.marshrut == 11) curTruckTask.marshrut = truckMarshrut11;
				if(curTruckTask.marshrut == 12) curTruckTask.marshrut = truckMarshrut12;
				if(curTruckTask.marshrut == 13) curTruckTask.marshrut = truckMarshrut13;
				if(curTruckTask.marshrut == 14) curTruckTask.marshrut = truckMarshrut14;
				if(curTruckTask.marshrut == 15) curTruckTask.marshrut = truckMarshrut15;
				if(curTruckTask.marshrut == 16) curTruckTask.marshrut = truckMarshrut16;
				if(curTruckTask.marshrut == 17) curTruckTask.marshrut = truckMarshrut17;
				if(curTruckTask.marshrut == 18) curTruckTask.marshrut = truckMarshrut18;
				if(curTruckTask.marshrut == 19) curTruckTask.marshrut = truckMarshrut19;
				if(curTruckTask.marshrut == 20) curTruckTask.marshrut = truckMarshrut20;
				if(curTruckTask.marshrut == 21) curTruckTask.marshrut = truckMarshrut21;
				if(curTruckTask.marshrut == 22) curTruckTask.marshrut = truckMarshrut22;
				if(curTruckTask.marshrut == 23) curTruckTask.marshrut = truckMarshrut23;
				if(curTruckTask.marshrut == 24) curTruckTask.marshrut = truckMarshrut24;
				if(curTruckTask.marshrut == 25) curTruckTask.marshrut = truckMarshrut25;
				if(curTruckTask.marshrut == 26) curTruckTask.marshrut = truckMarshrut26;
				if(curTruckTask.marshrut == 27) curTruckTask.marshrut = truckMarshrut27;
				if(curTruckTask.marshrut == 28) curTruckTask.marshrut = truckMarshrut28;
				if(curTruckTask.marshrut == 29) curTruckTask.marshrut = truckMarshrut29;
				if(curTruckTask.marshrut == 30) curTruckTask.marshrut = truckMarshrut30;
				if(curTruckTask.marshrut == 31) curTruckTask.marshrut = truckMarshrut31;
				if(curTruckTask.marshrut == 32) curTruckTask.marshrut = truckMarshrut32;
				if(curTruckTask.marshrut == 33) curTruckTask.marshrut = truckMarshrut33;
				if(curTruckTask.marshrut == 34) curTruckTask.marshrut = truckMarshrut34;
				if(curTruckTask.marshrut == 35) curTruckTask.marshrut = truckMarshrut35;
				if(curTruckTask.marshrut == 36) curTruckTask.marshrut = truckMarshrut36;
				if(curTruckTask.marshrut == 37) curTruckTask.marshrut = truckMarshrut37;
				if(curTruckTask.marshrut == 38) curTruckTask.marshrut = truckMarshrut38;
				if(curTruckTask.marshrut == 39) curTruckTask.marshrut = truckMarshrut39;
				if(curTruckTask.marshrut == 40) curTruckTask.marshrut = truckMarshrut40;
				if(curTruckTask.marshrut == 41) curTruckTask.marshrut = truckMarshrut41;
				if(curTruckTask.marshrut == 42) curTruckTask.marshrut = truckMarshrut42;
				if(curTruckTask.marshrut == 43) curTruckTask.marshrut = truckMarshrut43;
				if(curTruckTask.marshrut == 44) curTruckTask.marshrut = truckMarshrut44;
				if(curTruckTask.marshrut == 45) curTruckTask.marshrut = truckMarshrut45;
				if(curTruckTask.marshrut == 46) curTruckTask.marshrut = truckMarshrut46;
				
				curTruckTask.curPoint = "getCargo";
				
				truckProcessor();
			}else{
				return notyAPI.error("Сбой в работе диспетчера, выберите другой рейс.", 3000, true);
			}
		}else{
			return notyAPI.error("Сбой в работе диспетчера, выберите другой рейс.", 3000, true);
		}
	}
}
mp.events.add("acceptedTruckTask", acceptedTruckTask);

function truckProcessor() {
	if(curTruckTask) {
		if(curTruckTask.curPoint == "getCargo") {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Рейс назначен", "Отправляйся в зону погрузки, маршрут уже радаре", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
			
			if(truckBlip) {
				truckBlip.destroy();
				truckBlip = false;
			}
			
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(curTruckTask.marshrut.pogruzkaBlip)+"</span>");
			
			truckBlip = mp.blips.new(1, [curTruckTask.marshrut.pogruzkaBlip.x, curTruckTask.marshrut.pogruzkaBlip.y, curTruckTask.marshrut.pogruzkaBlip.z], {
				name: "Зона взятия прицепа / груза",
				scale: 1.5,
				color: 47,
				shortRange: false,
				dimension: 0
			});
			truckBlip.setRoute(true);
			truckBlip.setRouteColour(47);
			
			vehParkMarkers = curTruckTask.marshrut.pogruzkaMarkers, parkingVeh = localPlayer.vehicle, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
		}else if(curTruckTask.curPoint == "gettingCargo") {
			if(localPlayer.vehicle) {
				if(typeof(localPlayer.vehicle.getVariable("veh.job")) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
						let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
						if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
							mp.game.ui.notifications.showWithPicture("Работник терминала", "Начинаем погрузку", "Дружище, подожди немного, сейчас загрузим и прицепим", "CHAR_BEVERLY", 1, false, 1, 2);
							
							BLOCK_CONTROLS = true;
							localPlayer.vehicle.freezePosition(true);
							
							if(truckBlip) {
								truckBlip.destroy();
								truckBlip = false;
							}
							
							setTimeout(function() {
								if(localPlayer.vehicle && parkingVeh) {
									if(mp.vehicles.exists(parkingVeh)) {
										if(localPlayer.vehicle == parkingVeh && typeof(goodVehParked.x) !== "undefined") {
											let cheatDist = mp.game.system.vdist(parkingVeh.position.x, parkingVeh.position.y, parkingVeh.position.z, goodVehParked.x, goodVehParked.y, goodVehParked.z);
											if(cheatDist > 30) mp.events.callRemote('kickAct', localPlayer, "читы на телепорт на работе");
										}else{
											truckJobWarn();
										}
									}
								}else{
									truckJobWarn();
								}
							}, 5000);
							
							setTimeout(function() {
								if(localPlayer.vehicle && parkingVeh) {
									if(localPlayer.vehicle == parkingVeh) {
										vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
										mp.events.callRemote('truckSetCargo', localPlayer.vehicle, JSON.stringify(curTruckTask));
									}else{
										truckJobWarn();
									}
								}else{
									truckJobWarn();
								}
							}, 10000);
						}
					}else{
						truckJobWarn();
					}
				}else{
					truckJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Работник терминала", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_BEVERLY", 1, false, 1, 2);
				truckJobWarn();
			}
		}else if(curTruckTask.curPoint == "rideCargo") {
			if(localPlayer.vehicle) {
				if(typeof(localPlayer.vehicle.getVariable("veh.job")) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
						let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
						if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
							mp.game.ui.notifications.showWithPicture("Диспетчер", "Отправляйся в рейс", "Ты успешно взял груз, отправляйся в зону выгрузки", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
							
							BLOCK_CONTROLS = false;
							localPlayer.vehicle.freezePosition(false);
							
							if(truckBlip) {
								truckBlip.destroy();
								truckBlip = false;
							}
							
							truckBlip = mp.blips.new(1, [curTruckTask.marshrut.endpointBlip.x, curTruckTask.marshrut.endpointBlip.y, curTruckTask.marshrut.endpointBlip.z], {
								name: "Зона доставки груза",
								scale: 1.5,
								color: 47,
								shortRange: false,
								dimension: 0
							});
							truckBlip.setRoute(true);
							truckBlip.setRouteColour(47);
							
							vehParkMarkers = curTruckTask.marshrut.endpointMarkers, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
						}else{
							truckJobWarn();
						}
					}else{
						truckJobWarn();
					}
				}else{
					truckJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Работник терминала", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_BEVERLY", 1, false, 1, 2);
				truckJobWarn();
			}
		}else if(curTruckTask.curPoint == "droppingCargo") {
			if(localPlayer.vehicle) {
				if(typeof(localPlayer.vehicle.getVariable("veh.job")) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
						let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
						if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
							mp.game.ui.notifications.showWithPicture("Работник терминала", "Начинаем выгрузку", "Дружище, подожди немного, сейчас всё выгрузим", "CHAR_BEVERLY", 1, false, 1, 2);
							
							BLOCK_CONTROLS = true;
							localPlayer.vehicle.freezePosition(true);
							
							if(truckBlip) {
								truckBlip.destroy();
								truckBlip = false;
							}
				
							setTimeout(function() {
								if(localPlayer.vehicle && parkingVeh) {
									if(mp.vehicles.exists(parkingVeh)) {
										let tempTrailer = false;
										if(typeof(trailersPool) !== "undefined") {
											if(typeof(trailersPool[localPlayer.vehicle.handle.toString()]) !== "undefined") {
												if(typeof(trailersPool[localPlayer.vehicle.handle.toString()].trailer) !== "undefined") tempTrailer = trailersPool[localPlayer.vehicle.handle.toString()].trailer;
											}
										}
										if(tempTrailer) {
											if(tempTrailer == parkingVeh && typeof(goodVehParked.x) !== "undefined") {
												let cheatDist = mp.game.system.vdist(parkingVeh.position.x, parkingVeh.position.y, parkingVeh.position.z, goodVehParked.x, goodVehParked.y, goodVehParked.z);
												if(cheatDist > 30) mp.events.callRemote('kickAct', localPlayer, "читы на телепорт на работе");
											}else{
												truckJobWarn();
											}
										}else{
											truckJobWarn();
										}
									}else{
										truckJobWarn();
									}
								}else{
									truckJobWarn();
								}
							}, 5000);
				
							setTimeout(function() {
								if(localPlayer.vehicle) {
									if(typeof(localPlayer.vehicle.getVariable("veh.job")) !== "undefined") {
										if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
											let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
											if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
												vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
												mp.events.callRemote('truckSetCargo', localPlayer.vehicle, JSON.stringify(curTruckTask));
											}else{
												truckJobWarn();
											}
										}else{
											truckJobWarn();
										}
									}else{
										truckJobWarn();
									}
								}else{
									truckJobWarn();
								}
							}, 10000);
						}else{
							truckJobWarn();
						}
					}else{
						truckJobWarn();
					}
				}else{
					truckJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Работник терминала", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_BEVERLY", 1, false, 1, 2);
				truckJobWarn();
			}
		}else if(curTruckTask.curPoint == "cargoDropped") {
			if(localPlayer.vehicle) {
				if(typeof(localPlayer.vehicle.getVariable("veh.job")) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
						let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
						if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
							mp.game.ui.notifications.showWithPicture("Диспетчер", "Возвращайся на базу", "Ты успешно сдал груз, отправляйся на базу", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
							
							BLOCK_CONTROLS = false;
							localPlayer.vehicle.freezePosition(false);
							
							if(truckBlip) {
								truckBlip.destroy();
								truckBlip = false;
							}
							
							truckBlip = mp.blips.new(1, [curTruckTask.marshrut.bazaBackBlip.x, curTruckTask.marshrut.bazaBackBlip.y, curTruckTask.marshrut.bazaBackBlip.z], {
								name: "Зона доставки груза",
								scale: 1.5,
								color: 47,
								shortRange: false,
								dimension: 0
							});
							truckBlip.setRoute(true);
							truckBlip.setRouteColour(47);
							
							vehParkMarkers = curTruckTask.marshrut.bazaBackMarkers, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
						}else{
							truckJobWarn();
						}
					}else{
						truckJobWarn();
					}
				}else{
					truckJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Работник терминала", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_BEVERLY", 1, false, 1, 2);
				truckJobWarn();
			}
		}else if(curTruckTask.curPoint == "bazaBack") {
			if(localPlayer.vehicle && typeof(curTruckTask.id) !== "undefined") {
				if(typeof(localPlayer.vehicle.getVariable("veh.job")) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
						let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
						if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
							mp.game.ui.notifications.showWithPicture("Диспетчер", "Рейс окончен", "Выбирай новый рейс или отдохни, решать тебе", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
							mp.game.ui.messages.showMidsized("~g~Рейс ~s~завершён", "~s~вы заработали"+curTruckTask.cost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.");
							
							if(truckBlip) {
								truckBlip.destroy();
								truckBlip = false;
							}
							
							if(jobVehBackTimer) clearTimeout(jobVehBackTimer);
							
							vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
							
							if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
								let myBlocks = localPlayer.getVariable("player.blocks");
								if(typeof(myBlocks.premium) !== "undefined") notyAPI.info("<b>Премиум-доступ</b>: Вы получили надбавку к зарплате (10%).", 3000, true);
							}
							
							mp.events.callRemote('actionMakedTruckJob', localPlayer.vehicle, curTruckTask.id.toString());
							curTruckTask = false;
						}else{
							truckJobWarn();
						}
					}else{
						truckJobWarn();
					}
				}else{
					truckJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Работник терминала", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_BEVERLY", 1, false, 1, 2);
				truckJobWarn();
			}
		}
	}
}

function warnTruckJobIsDead(player) {
	if(player == localPlayer) {
		if(curTruckTask) {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Ты потерял рейс", "Выговор, следи за здоровьем!", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
			truckJobWarn();
		}
	}
}
mp.events.add("playerDeath", warnTruckJobIsDead);

function truckSettedCargo(nextPoint) {
	if(typeof(nextPoint) !== "undefined") {
		curTruckTask.curPoint = nextPoint.toString();
		truckProcessor();
	}
}
mp.events.add("truckSettedCargo", truckSettedCargo);

function cancelTruckJobTask(){
	closeJobTablet(true);
	if(curTruckTask) {
		if(mp.blips.exists(truckBlip)) truckBlip.destroy();
		truckBlip = false;
		
		if(BLOCK_CONTROLS && localPlayer.vehicle) {
			BLOCK_CONTROLS = false;
			localPlayer.vehicle.freezePosition(false);
		}
		
		mp.game.ui.messages.showMidsized("~g~Вы успешно ~s~отказались от рейса", "~s~Новые рейсы можно посмотреть в планшете (F5)");
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Отказ от задачи", "Я заблокировал тебе рейсы на 1 мин.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
		
		truckTasksBlocked = true;
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Задачи доступны", "Я разблокировал тебе рейсы.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
			truckTasksBlocked = false;
		}, 60000);
		
		vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelTruckTask', JSON.stringify(curTruckTask), false);
		curTruckTask = false;
	}
}
mp.events.add("cancelTruckJobTask", cancelTruckJobTask);

function truckJobWarn() {
	if(curTruckTask) {
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Предупреждение", "В целях безопасности я закончил твой рейс.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
		mp.game.ui.messages.showMidsized("~r~Рейс провален", "~s~Вы покинули грузовик в ответственный момент.");

		if(mp.blips.exists(truckBlip)) truckBlip.destroy();
		truckBlip = false;
		
		if(BLOCK_CONTROLS && localPlayer.vehicle) {
			BLOCK_CONTROLS = false;
			localPlayer.vehicle.freezePosition(false);
		}
		
		truckTasksBlocked = true;
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Отказ от задачи", "Я заблокировал тебе рейсы на 1 мин.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Задачи доступны", "Я разблокировал тебе рейсы.", "CHAR_MP_MEX_BOSS", 1, false, 1, 2);
			truckTasksBlocked = false;
		}, 60000);

		vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelTruckTask', JSON.stringify(curTruckTask), true);
		curTruckTask = false;
	}
}

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(shape == truckWorkZone) truckImInWorkZone = true;
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(shape == truckWorkZone) truckImInWorkZone = false;
	}
});
}