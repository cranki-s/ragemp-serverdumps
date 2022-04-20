{
var busMomentStart = false;

let busMarshrut1 = [ // Маршрут городской 1
	{"position":new mp.Vector3(497.2885,-902.0411,25.4927-2.65),"heading":179.642,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(179.642),"width":4,"height":14.5},
	{"position":new mp.Vector3(5.9715,-1552.6627,28.909-2.65),"heading":141.955,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(141.955),"width":4,"height":14.5},
	{"position":new mp.Vector3(-266.415,-1334.3932,30.8948-2.65),"heading":0.942,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(0.942),"width":4,"height":14.5},
	{"position":new mp.Vector3(-72.9225,-613.9393,35.8612-2.65),"heading":341.946,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(341.946),"width":4,"height":14.5},
	{"position":new mp.Vector3(51.5284,6.6409,68.9707-2.65),"heading":71.337,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(71.337),"width":4,"height":14.5},
	{"position":new mp.Vector3(-765.8533,293.4938,85.2421-2.65),"heading":95.932,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(95.932),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1585.7615,167.9557,58.4084-2.65),"heading":114.495,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(114.495),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1619.1262,-232.6143,53.8468-2.65),"heading":160.939,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(160.939),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1512.4121,-400.5093,39.6336-2.65),"heading":227.430,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(227.430),"width":4,"height":14.5},
	{"position":new mp.Vector3(-982.2034,-412.3332,37.3719-2.65),"heading":208.058,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(208.058),"width":4,"height":14.5},
	{"position":new mp.Vector3(-691.3439,-667.2984,30.5222-2.65),"heading":269.087,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(269.087),"width":4,"height":14.5},
	{"position":new mp.Vector3(-504.948,-667.2794,32.6952-2.65),"heading":270.685,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(270.685),"width":4,"height":14.5},
	{"position":new mp.Vector3(-258.9841,-322.0006,29.5908-2.65),"heading":7.841,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(7.841),"width":4,"height":14.5},
	{"position":new mp.Vector3(106.7399,-319.4758,45.3944-2.65),"heading":250.031,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(250.031),"width":4,"height":14.5},
	{"position":new mp.Vector3(249.2747,-581.07,42.8631-2.65),"heading":156.913,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(156.913),"width":4,"height":14.5}
];

let busMarshrut2 = [ // Маршрут городской 2
	{"position":new mp.Vector3(308.0089,-766.7106,28.949-2.65),"heading":162.509,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(162.509),"width":4,"height":14.5},
	{"position":new mp.Vector3(-842.6165,-1147.1904,6.4542-2.65),"heading":118.012,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(118.012),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1234.027,-1087.1426,7.9354-2.65),"heading":16.950,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(16.950),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1478.64,-630.3711,30.2713-2.65),"heading":305.623,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(305.623),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1516.8811,-374.7233,41.8258-2.65),"heading":47.518,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(47.518),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1421.0555,-86.0115,52.1248-2.65),"heading":292.068,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(292.068),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1333.3147,-313.0551,37.9128-2.65),"heading":211.470,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(211.470),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1046.3158,-388.4397,37.2892-2.65),"heading":294.294,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(294.294),"width":4,"height":14.5},
	{"position":new mp.Vector3(-678.989,-375.8238,33.9434-2.65),"heading":249.041,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(249.041),"width":4,"height":14.5},
	{"position":new mp.Vector3(-652.4684,-607.8519,32.8527-2.65),"heading":180.351,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(180.351),"width":4,"height":14.5},
	//{"position":new mp.Vector3(504.7867,-667.3087,32.6913-2.65),"heading":271.953,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(271.953),"width":4,"height":14.5},
	{"position":new mp.Vector3(-244.9173,-715.0045,33.089-2.65),"heading":158.893,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(158.893),"width":4,"height":14.5},
	{"position":new mp.Vector3(-248.9098,-883.0806,30.2294-2.65),"heading":249.099,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(249.099),"width":4,"height":14.5}
];

let busMarshrut3 = [ // Маршрут городской 3
	{"position":new mp.Vector3(246.2853,-940.0787,28.9595-2.65),"heading":160.580,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(160.580),"width":4,"height":14.5},	
	{"position":new mp.Vector3(356.2309,-1063.3643,29.0506-2.65),"heading":270.415,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(270.415),"width":4,"height":14.5},
	{"position":new mp.Vector3(489.5959,-1418.5348,28.8585-2.65),"heading":79.887,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(79.887),"width":4,"height":14.5},
	{"position":new mp.Vector3(-197.5624,-1780.9819,29.3926-2.65),"heading":120.713,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(120.713),"width":4,"height":14.5},
	{"position":new mp.Vector3(-995.9183,-2465.1267,13.4862-2.65),"heading":151.187,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(151.187),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1064.0323,-2695.3682,13.4846-2.65),"heading":229.709,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(229.709),"width":4,"height":14.5},
	{"position":new mp.Vector3(441.0952,-2029.2562,23.217-2.65),"heading":226.328,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(226.328),"width":4,"height":14.5},
	{"position":new mp.Vector3(817.1784,-1909.9966,28.861-2.65),"heading":348.359,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(348.359),"width":4,"height":14.5},
	{"position":new mp.Vector3(806.4725,-1351.5442,25.9546-2.65),"heading":359.527,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(359.527),"width":4,"height":14.5},
	{"position":new mp.Vector3(784.7294,-776.2592,26.0624-2.65),"heading":358.553,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.553),"width":4,"height":14.5},
	{"position":new mp.Vector3(-104.2904,-608.9197,35.7415-2.65),"heading":160.088,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(160.088),"width":4,"height":14.5},
	{"position":new mp.Vector3(-171.6332,-819.6791,30.7972-2.65),"heading":160.626,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(160.626),"width":4,"height":14.5},
	{"position":new mp.Vector3(409.2824,-732.8546,28.8914-2.65),"heading":1.534,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(1.534),"width":4,"height":14.5}
];

let busMarshrut4 = [ // МежГород 4
	{"position":new mp.Vector3(496.7277,-980.3076,27.1087-2.65),"heading":180.572,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(180.572),"width":4,"height":14.5},
	{"position":new mp.Vector3(806.8298,-1352.0721,25.9396-2.65),"heading":358.858,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.858),"width":4,"height":14.5},
	{"position":new mp.Vector3(793.4695,-955.4071,25.5318-2.65),"heading":7.500,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(7.500),"width":4,"height":14.5},
	{"position":new mp.Vector3(926.287,-129.2428,75.5882-2.65),"heading":59.094,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(59.094),"width":4,"height":14.5},
	{"position":new mp.Vector3(971.5853,148.6781,80.5355-2.65),"heading":321.140,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(321.140),"width":4,"height":14.5},
	{"position":new mp.Vector3(1972.6703,2486.7136,54.2359-2.65),"heading":325.620,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(325.620),"width":4,"height":14.5},
	{"position":new mp.Vector3(2816.45,3406.9988,55.4485-2.65),"heading":336.047,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(336.047),"width":4,"height":14.5},
	{"position":new mp.Vector3(2796.4253,4481.3115,47.203-2.65),"heading":14.502,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(14.502),"width":4,"height":14.5},
	{"position":new mp.Vector3(1703.4763,6389.6489,32.1065-2.65),"heading":77.296,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(77.296),"width":4,"height":14.5},
	{"position":new mp.Vector3(-215.5191,6172.5972,30.8932-2.65),"heading":135.914,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(135.914),"width":4,"height":14.5},
	{"position":new mp.Vector3(-710.5677,5544.8013,37.1082-2.65),"heading":122.231,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(122.231),"width":4,"height":14.5},
	{"position":new mp.Vector3(-2245.6489,4289.1465,46.6532-2.65),"heading":148.757,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(148.757),"width":4,"height":14.5},
	{"position":new mp.Vector3(-2495.6501,3620.3301,13.8054-2.65),"heading":169.467,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(169.467),"width":4,"height":14.5},
	{"position":new mp.Vector3(-3126.8826,1080.931,20.1463-2.65),"heading":171.999,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(171.999),"width":4,"height":14.5},
	{"position":new mp.Vector3(-3006.6526,379.9061,14.4696-2.65),"heading":171.109,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(171.109),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1839.0648,-602.0844,11.0527-2.65),"heading":229.205,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(229.205),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1214.8054,-884.653,12.4816-2.65),"heading":304.593,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(304.593),"width":4,"height":14.5},
	{"position":new mp.Vector3(-685.7748,-1255.2865,10.2215-2.65),"heading":210.924,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(210.924),"width":4,"height":14.5},
	{"position":new mp.Vector3(-298.4117,-1843.9484,25.8767-2.65),"heading":270.695,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(270.695),"width":4,"height":14.5},
	{"position":new mp.Vector3(346.587,-722.5308,28.8883-2.65),"heading":341.978,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(341.978),"width":4,"height":14.5}
];

let busMarshrut5 = [ // Маршрут городской 5
	{"position":new mp.Vector3(1533.5723,825.6657,77.0998-2.65),"heading":331.687,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(331.687),"width":4,"height":14.5},
	{"position":new mp.Vector3(2546.4797,1622.5756,29.3409-2.65),"heading":1.145,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(1.145),"width":4,"height":14.5},
	{"position":new mp.Vector3(2562.2969,2675.1829,39.7507-2.65),"heading":22.361,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(22.361),"width":4,"height":14.5},
	{"position":new mp.Vector3(2285.3811,3124.6025,47.5382-2.65),"heading":22.851,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(22.851),"width":4,"height":14.5},
	{"position":new mp.Vector3(2502.2366,4102.4307,37.9155-2.65),"heading":334.369,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(334.369),"width":4,"height":14.5},
	{"position":new mp.Vector3(2782.5427,3430.9006,55.3524-2.65),"heading":154.960,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(154.960),"width":4,"height":14.5},
	{"position":new mp.Vector3(296.7383,2589.1182,44.0663-2.65),"heading":206.840,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(206.840),"width":4,"height":14.5},
	{"position":new mp.Vector3(907.6479,2206.6675,48.2141-2.65),"heading":243.793,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.793),"width":4,"height":14.5},
	{"position":new mp.Vector3(1160.3759,1803.5081,73.9954-2.65),"heading":216.731,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(216.731),"width":4,"height":14.5},
	{"position":new mp.Vector3(1290.1071,1179.9965,106.4735-2.65),"heading":180.126,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(180.126),"width":4,"height":14.5},
	{"position":new mp.Vector3(908.4353,484.392,120.7971-2.65),"heading":179.417,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(179.417),"width":4,"height":14.5},
	{"position":new mp.Vector3(225.7728,-343.3612,43.7948-2.65),"heading":71.686,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(71.686),"width":4,"height":14.5},
	{"position":new mp.Vector3(42.8623,-697.5289,43.7584-2.65),"heading":158.066,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(158.066),"width":4,"height":14.5},
	{"position":new mp.Vector3(58.4933,-995.3768,28.9323-2.65),"heading":249.241,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(249.241),"width":4,"height":14.5}
];

let busMarshrut6 = [ // Маршрут городской 6
	{"position":new mp.Vector3(307.6105,-766.671,28.9333-2.65),"heading":159.622,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(159.622),"width":4,"height":14.5},
	{"position":new mp.Vector3(-504.9372,-259.8245,35.1969-2.65),"heading":109.777,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(109.777),"width":4,"height":14.5},  
	{"position":new mp.Vector3(-746.0861,-324.9189,35.8892-2.65),"heading":66.639,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(66.639),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1303.115,229.0689,58.54-2.65),"heading":95.104,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(95.104),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1601.3053,160.525,59.2596-2.65),"heading":114.446,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(114.446),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1620.043,-235.2197,53.7713-2.65),"heading":159.432,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(159.432),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1754.5798,-510.657,38.2534-2.65),"heading":211.541,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(211.541),"width":4,"height":14.5},
	{"position":new mp.Vector3(118.8341,-193.3523,54.2254-2.65),"heading":248.998,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(248.998),"width":4,"height":14.5},
	{"position":new mp.Vector3(906.6201,-138.5731,76.172-2.65),"heading":237.149,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(237.149),"width":4,"height":14.5},
	{"position":new mp.Vector3(1179.6694,-671.5273,60.9536-2.65),"heading":188.812,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(188.812),"width":4,"height":14.5},
	{"position":new mp.Vector3(1287.5779,-2024.0197,44.239-2.65),"heading":109.192,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(109.192),"width":4,"height":14.5},
	{"position":new mp.Vector3(212.1304,-3331.5247,5.4634-2.65),"heading":266.316,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(266.316),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1032.5243,-2728.5742,19.8305-2.65),"heading":239.582,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(239.582),"width":4,"height":14.5},
	{"position":new mp.Vector3(-266.3258,-1288.2079,30.6621-2.65),"heading":359.599,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(359.599),"width":4,"height":14.5},
	{"position":new mp.Vector3(-213.3799,-998.3159,28.8896-2.65),"heading":338.934,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(338.934),"width":4,"height":14.5},
	{"position":new mp.Vector3(345.6883,-723.993,28.9092-2.65),"heading":339.933,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(339.933),"width":4,"height":14.5}
];
		
let busMarshrut7 = [ // Маршрут межГород 7
	{"position":new mp.Vector3(307.9484,-766.7745,28.9479-2.65),"heading":162.634,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(162.634),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1164.6495,-401.7653,35.1947-2.65),"heading":98.347,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(98.347),"width":4,"height":14.5},
	{"position":new mp.Vector3(-2976.5544,464.982,14.846-2.65),"heading":355.917,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(355.917),"width":4,"height":14.5},
	{"position":new mp.Vector3(-714.5437,5782.7065,17.3164-2.65),"heading":334.855,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(334.855),"width":4,"height":14.5},
	{"position":new mp.Vector3(-359.1591,6167.7988,30.9325-2.65),"heading":314.515,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(314.515),"width":4,"height":14.5},
	{"position":new mp.Vector3(2786.3486,3435.5576,55.3187-2.65),"heading":156.212,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(156.212),"width":4,"height":14.5},
	{"position":new mp.Vector3(685.3053,657.9955,128.5796-2.65),"heading":68.707,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(68.707),"width":4,"height":14.5},
	{"position":new mp.Vector3(1163.6711,-560.3005,64.1512-2.65),"heading":182.540,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(182.540),"width":4,"height":14.5},
	{"position":new mp.Vector3(409.9389,-785.5015,28.8776-2.65),"heading":2.202,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(2.202),"width":4,"height":14.5}
];

let busMarshrut8 = [ // Маршрут Город 8
	{"position":new mp.Vector3(305.9731,-771.3818,28.9296-2.65),"heading":160.112,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(160.112),"width":4,"height":14.5},
	{"position":new mp.Vector3(67.8919,-973.118,28.9448-2.65),"heading":69.776,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(69.776),"width":4,"height":14.5},
	{"position":new mp.Vector3(-628.9469,-710.0614,29.2083-2.65),"heading":359.730,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(359.730),"width":4,"height":14.5},
	{"position":new mp.Vector3(-658.7375,-273.2943,35.4267-2.65),"heading":29.769,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(29.769),"width":4,"height":14.5},
	{"position":new mp.Vector3(-938.4379,-130.7167,37.2476-2.65),"heading":116.996,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(116.996),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1247.2991,-69.7256,43.6782-2.65),"heading":61.941,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(61.941),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1922.1637,220.7656,84.1437-2.65),"heading":29.571,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(29.571),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1460.8447,855.6696,183.4479-2.65),"heading":192.818,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(192.818),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1167.9246,938.1865,197.1034-2.65),"heading":308.472,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(308.472),"width":4,"height":14.5},
	{"position":new mp.Vector3(-77.3569,895.3242,235.28-2.65),"heading":36.802,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(36.802),"width":4,"height":14.5},
	{"position":new mp.Vector3(308.4988,952.8608,207.7088-2.65),"heading":172.383,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(172.383),"width":4,"height":14.5},
	{"position":new mp.Vector3(45.866,305.575,110.4691-2.65),"heading":159.190,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(159.190),"width":4,"height":14.5},
	{"position":new mp.Vector3(-143.2561,-296.763,39.4142-2.65),"heading":162.310,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(162.310),"width":4,"height":14.5},
	{"position":new mp.Vector3(-244.3647,-715.8751,33.0909-2.65),"heading":157.509,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(157.509),"width":4,"height":14.5},
	{"position":new mp.Vector3(-249.3613,-882.4543,30.2773-2.65),"heading":252.815,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(252.815),"width":4,"height":14.5},
	{"position":new mp.Vector3(322.0183,-795.658,28.8827-2.65),"heading":340.585,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(340.585),"width":4,"height":14.5}
];

let busMarshrut9 = [ // Маршрут Город 9
	{"position":new mp.Vector3(-104.0439,-609.2021,35.7444-2.65),"heading":160.871,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(160.871),"width":4,"height":14.5},
	{"position":new mp.Vector3(-692.9841,-649.5637,30.7155-2.65),"heading":89.049,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(89.049),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1145.4998,-806.8745,15.1048-2.65),"heading":131.808,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(131.808),"width":4,"height":14.5},
	{"position":new mp.Vector3(-2974.9983,509.2805,15.1307-2.65),"heading":2.256,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(2.256),"width":4,"height":14.5},
	{"position":new mp.Vector3(-3227.3845,979.4225,12.4588-2.65),"heading":2.378,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(2.378),"width":4,"height":14.5},
	{"position":new mp.Vector3(-2451.3792,3752.2205,17.5999-2.65),"heading":343.507,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(343.507),"width":4,"height":14.5},
	{"position":new mp.Vector3(-160.3729,6204.438,30.879-2.65),"heading":314.611,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(314.611),"width":4,"height":14.5},
	{"position":new mp.Vector3(1663.1744,4855.4712,41.6719-2.65),"heading":188.847,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(188.847),"width":4,"height":14.5},
	{"position":new mp.Vector3(1824.7588,3649.2144,33.9693-2.65),"heading":119.764,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(119.764),"width":4,"height":14.5},
	{"position":new mp.Vector3(2539.2825,1589.1233,29.9793-2.65),"heading":182.070,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(182.070),"width":4,"height":14.5},
	{"position":new mp.Vector3(2524.5017,295.4404,108.3578-2.65),"heading":175.905,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(175.905),"width":4,"height":14.5},
	{"position":new mp.Vector3(330.0858,-767.1107,28.9375-2.65),"heading":342.222,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(342.222),"width":4,"height":14.5}
];

let busMarshrut10 = [ // Маршрут межГород 10
	{"position":new mp.Vector3(395.7777,-985.5255,28.9541-2.65),"heading":177.163,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(177.163),"width":4,"height":14.5},
	{"position":new mp.Vector3(-241.9995,-860.9975,30.305-2.65),"heading":69.921,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(69.921),"width":4,"height":14.5},
	{"position":new mp.Vector3(-623.0092,-606.8821,32.975-2.65),"heading":0.122,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(0.122),"width":4,"height":14.5},
	{"position":new mp.Vector3(-660.0104,-272.0827,35.4652-2.65),"heading":30.558,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(30.558),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1619.7913,-235.4993,53.7839-2.65),"heading":163.176,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(163.176),"width":4,"height":14.5},
	{"position":new mp.Vector3(-2975.9834,481.9983,14.9265-2.65),"heading":355.707,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(355.707),"width":4,"height":14.5},
	{"position":new mp.Vector3(-2209.6729,2290.5813,32.5289-2.65),"heading":295.784,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(295.784),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1091.1368,2678.2761,19.1392-2.65),"heading":309.437,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(309.437),"width":4,"height":14.5},
	{"position":new mp.Vector3(545.9393,2681.228,41.8556-2.65),"heading":276.604,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(276.604),"width":4,"height":14.5},
	{"position":new mp.Vector3(2525.5107,326.8994,109.6047-2.65),"heading":177.125,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(177.125),"width":4,"height":14.5},
	{"position":new mp.Vector3(979.1516,-2072.4099,30.5019-2.65),"heading":89.490,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(89.490),"width":4,"height":14.5},
	{"position":new mp.Vector3(124.2373,-1712.7096,28.7377-2.65),"heading":49.795,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(49.795),"width":4,"height":14.5},
	{"position":new mp.Vector3(-213.6307,-997.9608,28.909-2.65),"heading":340.842,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(340.842),"width":4,"height":14.5},
	{"position":new mp.Vector3(72.0842,-700.3871,43.8361-2.65),"heading":341.087,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(341.087),"width":4,"height":14.5},
	{"position":new mp.Vector3(184.0478,-750.8074,32.6182-2.65),"heading":161.271,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(161.271),"width":4,"height":14.5},
	{"position":new mp.Vector3(345.3934,-723.7836,28.9228-2.65),"heading":339.666,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(339.666),"width":4,"height":14.5}
];

let busMarshrut11 = [ // Межгород ВИП 11
	{"position":new mp.Vector3(144.1368,-1001.642,28.9879-2.65),"heading":71.339,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(71.339),"width":4,"height":14.5},
	{"position":new mp.Vector3(-127.504,-764.1497,33.199-2.65),"heading":342.486,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(342.486),"width":4,"height":14.5},
	{"position":new mp.Vector3(-459.815,-139.2796,38.0212-2.65),"heading":30.492,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(30.492),"width":4,"height":14.5},
	{"position":new mp.Vector3(-1525.1545,-467.1953,35.0164-2.65),"heading":123.459,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(123.459),"width":4,"height":14.5},
	{"position":new mp.Vector3(1380.0973,3569.5586,34.6535-2.65),"heading":286.913,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(286.913),"width":4,"height":14.5},
	{"position":new mp.Vector3(1958.3938,3852.0347,31.6575-2.65),"heading":211.568,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(211.568),"width":4,"height":14.5},
	{"position":new mp.Vector3(1788.4679,4581.2222,36.7807-2.65),"heading":92.155,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(92.155),"width":4,"height":14.5},
	{"position":new mp.Vector3(1684.7382,4945.2388,42.0133-2.65),"heading":304.725,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(304.725),"width":4,"height":14.5},
	{"position":new mp.Vector3(2804.2332,3479.4143,54.7559-2.65),"heading":158.502,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(158.502),"width":4,"height":14.5},
	{"position":new mp.Vector3(253.7424,-570.4316,42.884-2.65),"heading":158.205,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(158.205),"width":4,"height":14.5},
	{"position":new mp.Vector3(234.4385,-856.3591,29.4324-2.65),"heading":251.080,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(251.080),"width":4,"height":14.5}
];

var busWorkZone = mp.colshapes.newSphere(437.2815,-622.9944,28.7087,60,0);
var busImInWorkZone = false;

var curBusTask = false, busBlip = false;

var busTasksBlocked = false;

function startBusJob() {
	if(typeof(localPlayer.getVariable('player.lics')) === "undefined") return hud_browser.execute('jobPanelError("#startBusJob", "Технические неполадки системы лицензий..")');
	let myLics = {};
	if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
	if(myLics["bCat"] === undefined) return hud_browser.execute('jobPanelError("#startBusJob", "Отсутствуют водительские права категории «B»")');
	if(myLics["dCat"] === undefined) return hud_browser.execute('jobPanelError("#startBusJob", "Отсутствуют водительские права категории «D»")');
	
	if(typeof(localPlayer.getVariable('player.blocks')) === "undefined") return hud_browser.execute('jobPanelError("#startBusJob", "Не инициализирован уровень персонажа..")');
	let myBlocks = localPlayer.getVariable('player.blocks');
	if(typeof(myBlocks.lvl) !== "undefined") {
		if(myBlocks.lvl < 4) return hud_browser.execute('jobPanelError("#startBusJob", "Необходим 4 уровень персонажа, его нужно повысить через телефон.")');
	}else{
		return hud_browser.execute('jobPanelError("#startBusJob", "Не инициализирован уровень персонажа..")');
	}
	
	closeJobTablet();
	mp.events.callRemote('startBusJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас приняли работать водителем автобуса", 5, false, true, 6500);
	setTimeout(function() {
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Добро пожаловать", "Рабочий планшет. Нажми F5 и выбери свой первый маршрут.", "CHAR_CHENGSR", 1, false, 1, 2);
	}, 2000);
}
mp.events.add("startBusJob", startBusJob);

function startBusWorkError(errReason) {
	if(typeof(errReason) === "undefined") return notyAPI.error("Что-то пошло не так при выборе автобуса.", 3000, true);
	notyAPI.error(errReason, 3000, true);
}
mp.events.add("startBusWorkError", startBusWorkError);

function busStartStop(busik) {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		closeJobTablet(true);
		
		if(jobData.work == 0) {
			if(typeof(busik) === "undefined") return notyAPI.error("Вы не выбрали автобус.", 3000, true);
			if(busik != "1" && busik != "2" && busik != "3") return notyAPI.error("Вы не выбрали автобус.", 3000, true);
			if(busImInWorkZone) {
				if(localPlayer.vehicle) {
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Связь плохая", "Нельзя начать смену из транспорта.", "CHAR_CHENGSR", 1, false, 1, 2);
				}else{
					if(!activeJOBoperation) {
						busMomentStart = true;
						setTimeout(function() { busMomentStart = false; }, 3500);
						mp.events.call("sleepAntiCheat");
						mp.events.callRemote('startJobWork', busik);
						mp.game.ui.notifications.showWithPicture("Диспетчер", "Смена началась", "Возьми маршрут. Задачи в планшете (F5)", "CHAR_CHENGSR", 1, false, 1, 2);
					}
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Диспетчер", "Явитесь в офис", "Смену можно начать только на территории базы.", "CHAR_CHENGSR", 1, false, 1, 2);
				notyAPI.error("Явитесь на базу автобусных перевозок что бы начать смену.", 3000, true);
			}
		}else{
			if(!activeJOBoperation) {
				activeJOBoperation = true;
				
				//if(curBusTask) mp.events.callRemote('cancelBusTask', JSON.stringify(curBusTask), false);
				//curBusTask = false;
		
				if(busBlip) {
					busBlip.destroy();
					busBlip = false;
				}
				
				if(jobVehBackTimer) clearTimeout(jobVehBackTimer);
				
				vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
				curBusTask = false;
		
				if(jobData.workMoney > 0) {
					//let resWorkMoney = roundNumber((parseInt(jobData.workMoney)-(parseInt(jobData.workMoney)*0.13)), 0);
					let resWorkMoney = roundNumber(parseInt(jobData.workMoney), 0);
					let workMoneyText = resWorkMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы заработали за смену"+workMoneyText+" руб.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Молодца!", "Отдохни и выходи на смену снова, давай братан!", "CHAR_CHENGSR", 1, false, 1, 2);
				}else{
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы ничего не заработали за смену.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Диспетчер", "Это как так?", "Стоп посреди маршрута? Блок агрегатора 1 мин.", "CHAR_CHENGSR", 1, false, 1, 2);
					busTasksBlocked = true;
					setTimeout(function() {
						mp.game.ui.notifications.showWithPicture("Диспетчер", "Задачи доступны", "Я разблокировал тебе рейсы.", "CHAR_CHENGSR", 1, false, 1, 2);
						busTasksBlocked = false;
					}, 60000);
				}
				
				mp.events.callRemote('stopJobWork');
			}
		}
	}
}
mp.events.add("busStartStop", busStartStop);

function getBusTasks(){
	if(!busBlip) {
		if(!localPlayer.vehicle) {
			return hud_browser.execute("gettedBusTasks('you_not_in_veh');");
		}else{
			let theVeh = localPlayer.vehicle;
			if(typeof(theVeh.getVariable("veh.job")) === "undefined") return hud_browser.execute("gettedBusTasks('you_not_in_veh');");
			if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')))) {
				let vehJob = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.job')));
				if(vehJob.remoteId.toString() != localPlayer.remoteId.toString()) return hud_browser.execute("gettedBusTasks('you_not_in_veh');");
			}else{
				 return hud_browser.execute("gettedBusTasks('you_not_in_veh');");
			}
		}
		mp.events.callRemote('getBusTasks');
	}else{
		hud_browser.execute("gettedBusTasks('you_have_task');");
	}
}
mp.events.add("getBusTasks", getBusTasks);

function gettedBusTasks(busTasks) {
	if(busTasks) {
		if(!curBusTask && typeof(localPlayer.getVariable("player.job")) !== "undefined") {
			busTasks = JSON.parse(busTasks);
			if(Object.keys(busTasks).length > 0) {
				let jobData = localPlayer.getVariable("player.job");
				
				let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
				for (var k in busTasks) {
					if(busTasks[k]) {
						let taskData = busTasks[k];
						taskData.inline = Object.keys(taskData.inline).length;
						taskData.busName = "Автобус";
						if(parseInt(jobData.rank) >= parseInt(taskData.minRank)) {
							if(typeof(taskData.bus) !== "undefined") {
								if(typeof(decVehStats[0][taskData.bus]) !== "undefined") taskData.busName = decVehStats[0][taskData.bus].name;
								else taskData.busName = taskData.bus;
							}
						}else{
							busTasks[k] = undefined;
						}
					}
				}
				busTasks = JSON.parse(JSON.stringify(busTasks));
				
				if(busTasks) hud_browser.execute("gettedBusTasks('ok', '"+JSON.stringify(busTasks)+"');");
				else hud_browser.execute("gettedBusTasks('empty');");
			}else{
				hud_browser.execute("gettedBusTasks('empty');");
			}
		}else{
			hud_browser.execute("gettedBusTasks('you_have_task');");
		}
	}
}
mp.events.add("gettedBusTasks", gettedBusTasks);

function acceptTaskBus(data) {
	if(data) {
		data = JSON.parse(data);
		if(typeof(data.premium) !== "undefined") {
			if(data.premium) {
				if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
					let myBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(myBlocks.premium) === "undefined") return notyAPI.error("У Вас нет премиум-статуса.", 3000, true);
				}
			}
		}
		if(parseInt(data.inline) >= parseInt(data.maxInline)) return notyAPI.error("На линии слишком много водителей, выберите другой маршрут.", 3000, true);
		closeJobTablet();
		if(busTasksBlocked) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Блокировка доступа", "У Тебя блок доступа к задачам на 1 мин.", "CHAR_CHENGSR", 1, false, 1, 2);
			return notyAPI.error("У Тебя заблокирован доступ к маршрутам, попробуйте через минуту.", 3000, true);
		}
		
		if(!busImInWorkZone) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Явитесь в офис", "Рейс можно начать только на территории Базы.", "CHAR_CHENGSR", 1, false, 1, 2);
			return notyAPI.error("Явись на базу что бы взять рейс.", 3000, true);
		}
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('acceptTaskBus', JSON.stringify(data));
	}
}
mp.events.add("acceptTaskBus", acceptTaskBus);

function acceptedBusTask(isError, data) {
	restoreBinds();
	jobPanel = false;
	if(isError) {
		return notyAPI.error(isError, 3000, true);
	}else{
		if(data) {
			if(localPlayer.vehicle) {
				data = JSON.parse(data);
				curBusTask = data;
				if(curBusTask.marshrut == 1) curBusTask.marshrut = busMarshrut1;
				else if(curBusTask.marshrut == 2) curBusTask.marshrut = busMarshrut2;
				else if(curBusTask.marshrut == 3) curBusTask.marshrut = busMarshrut3;
				else if(curBusTask.marshrut == 4) curBusTask.marshrut = busMarshrut4;
				else if(curBusTask.marshrut == 5) curBusTask.marshrut = busMarshrut5;
				else if(curBusTask.marshrut == 6) curBusTask.marshrut = busMarshrut6;
				else if(curBusTask.marshrut == 7) curBusTask.marshrut = busMarshrut7;
				else if(curBusTask.marshrut == 8) curBusTask.marshrut = busMarshrut8;
				else if(curBusTask.marshrut == 9) curBusTask.marshrut = busMarshrut9;
				else if(curBusTask.marshrut == 10) curBusTask.marshrut = busMarshrut10;
				else if(curBusTask.marshrut == 11) curBusTask.marshrut = busMarshrut11;
				
				curBusTask.curPoint = 0;
				busProcessor();
			}else{
				return notyAPI.error("Сбой в работе диспетчера, выберите другой маршрут.", 3000, true);
			}
		}else{
			return notyAPI.error("Сбой в работе диспетчера, выберите другой маршрут.", 3000, true);
		}
	}
}
mp.events.add("acceptedBusTask", acceptedBusTask);

function busProcessor() {
	if(curBusTask) {
		if(curBusTask.curPoint == 0) {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Маршрут назначен", "Отправляйтесь на остановку, маршрут уже на радаре", "CHAR_CHENGSR", 1, false, 1, 2);
			
			if(busBlip) {
				busBlip.destroy();
				busBlip = false;
			}
			
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(curBusTask.marshrut.pogruzkaBlip)+"</span>");
			
			busBlip = mp.blips.new(1, [curBusTask.marshrut[curBusTask.curPoint].position.x, curBusTask.marshrut[curBusTask.curPoint].position.y, curBusTask.marshrut[curBusTask.curPoint].position.z], {
				name: "Автобусная остановка",
				scale: 1.5,
				color: 47,
				shortRange: false,
				dimension: 0
			});
			busBlip.setRoute(true);
			busBlip.setRouteColour(47);
			
			vehParkMarkers = [curBusTask.marshrut[curBusTask.curPoint]], parkingVeh = localPlayer.vehicle, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
		}else if(curBusTask.curPoint > 0 && Object.keys(curBusTask.marshrut).length > curBusTask.curPoint) {
			if(localPlayer.vehicle) {
				if(typeof(localPlayer.vehicle.getVariable("veh.job")) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
						let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
						if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
							mp.game.ui.notifications.showWithPicture("Диспетчер", "Ждём пассажиров", "Дружище, подожди немного, пассажиры выходят и заходят", "CHAR_CHENGSR", 1, false, 1, 2);
							
							BLOCK_CONTROLS = true;
							localPlayer.vehicle.freezePosition(true);
							
							if(busBlip) {
								busBlip.destroy();
								busBlip = false;
							}
							
							setTimeout(function() {
								if(localPlayer.vehicle && parkingVeh) {
									if(mp.vehicles.exists(parkingVeh)) {
										if(localPlayer.vehicle == parkingVeh && typeof(goodVehParked.x) !== "undefined") {
											let cheatDist = mp.game.system.vdist(parkingVeh.position.x, parkingVeh.position.y, parkingVeh.position.z, goodVehParked.x, goodVehParked.y, goodVehParked.z);
											if(cheatDist > 30) mp.events.callRemote('kickAct', localPlayer, "читы на телепорт на работе");
										}else{
											busJobWarn();
										}
									}
								}else{
									busJobWarn();
								}
							}, 2500);
							
							setTimeout(function() {
								if(localPlayer.vehicle && parkingVeh) {
									if(localPlayer.vehicle == parkingVeh) {
										vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
										vehParkMarkers = [curBusTask.marshrut[curBusTask.curPoint]], parkingVeh = localPlayer.vehicle, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
										
										BLOCK_CONTROLS = false;
										localPlayer.vehicle.freezePosition(false);
										
										busBlip = mp.blips.new(1, [curBusTask.marshrut[curBusTask.curPoint].position.x, curBusTask.marshrut[curBusTask.curPoint].position.y, curBusTask.marshrut[curBusTask.curPoint].position.z], {
											name: "Автобусная остановка",
											scale: 1.5,
											color: 47,
											shortRange: false,
											dimension: 0
										});
										busBlip.setRoute(true);
										busBlip.setRouteColour(47);
									}else{
										busJobWarn();
									}
								}else{
									busJobWarn();
								}
							}, 5000);
						}
					}else{
						busJobWarn();
					}
				}else{
					busJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Диспетчер", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_CHENGSR", 1, false, 1, 2);
				busJobWarn();
			}
		}else if(Object.keys(curBusTask.marshrut).length <= curBusTask.curPoint) {
			if(localPlayer.vehicle && typeof(curBusTask.marshrut) !== "undefined") {
				if(typeof(localPlayer.vehicle.getVariable("veh.job")) !== "undefined") {
					if(mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')))) {
						let vehJob = mp.players.atRemoteId(parseInt(localPlayer.vehicle.getVariable('veh.job')));
						if(vehJob.remoteId.toString() == localPlayer.remoteId.toString()) {
							mp.game.ui.notifications.showWithPicture("Диспетчер", "Маршрут окончен", "Выбирай новый маршрут или отдохни, решать тебе", "CHAR_CHENGSR", 1, false, 1, 2);
							mp.game.ui.messages.showMidsized("~g~Маршрут ~s~завершён", "~s~вы заработали"+curBusTask.cost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.");
							
							if(busBlip) {
								busBlip.destroy();
								busBlip = false;
							}
							
							if(jobVehBackTimer) clearTimeout(jobVehBackTimer);
							
							vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
							
							if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
								let myBlocks = localPlayer.getVariable("player.blocks");
								if(typeof(myBlocks.premium) !== "undefined") notyAPI.info("<b>Премиум-доступ</b>: Вы получили надбавку к зарплате (10%).", 3000, true);
							}
							
							mp.events.callRemote('actionMakedBusJob', localPlayer.vehicle, curBusTask.marshrut.toString());
							curBusTask = false;
						}else{
							busJobWarn();
						}
					}else{
						busJobWarn();
					}
				}else{
					busJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Диспетчер", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_CHENGSR", 1, false, 1, 2);
				busJobWarn();
			}
		}
	}
}

function warnBusJobIsDead(player) {
	if(player == localPlayer) {
		if(curBusTask) {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Ты потерял маршрут", "Выговор, следи за здоровьем!", "CHAR_CHENGSR", 1, false, 1, 2);
			busJobWarn();
		}
	}
}
mp.events.add("playerDeath", warnBusJobIsDead);

function truckSettedCargo(nextPoint) {
	if(typeof(nextPoint) !== "undefined") {
		curBusTask.curPoint = nextPoint.toString();
		busProcessor();
	}
}
mp.events.add("truckSettedCargo", truckSettedCargo);

function cancelBusJobTask(){
	closeJobTablet(true);
	if(curBusTask) {
		if(mp.blips.exists(busBlip)) busBlip.destroy();
		busBlip = false;
		
		if(BLOCK_CONTROLS && localPlayer.vehicle) {
			BLOCK_CONTROLS = false;
			localPlayer.vehicle.freezePosition(false);
		}
		
		mp.game.ui.messages.showMidsized("~g~Вы успешно ~s~отказались от рейса", "~s~Новые рейсы можно посмотреть в планшете (F5)");
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Отказ от задачи", "Я заблокировал тебе рейсы на 1 мин.", "CHAR_CHENGSR", 1, false, 1, 2);
		
		busTasksBlocked = true;
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Задачи доступны", "Я разблокировал тебе рейсы.", "CHAR_CHENGSR", 1, false, 1, 2);
			busTasksBlocked = false;
		}, 60000);
		
		vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelBusTask', JSON.stringify(curBusTask), false);
		curBusTask = false;
	}
}
mp.events.add("cancelBusJobTask", cancelBusJobTask);

function busJobWarn() {
	if(curBusTask) {
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Предупреждение", "В целях безопасности я закончил твой маршрут.", "CHAR_CHENGSR", 1, false, 1, 2);
		mp.game.ui.messages.showMidsized("~r~Маршрут провален", "~s~Вы покинули автобус в ответственный момент.");

		if(mp.blips.exists(busBlip)) busBlip.destroy();
		busBlip = false;
		
		if(BLOCK_CONTROLS && localPlayer.vehicle) {
			BLOCK_CONTROLS = false;
			localPlayer.vehicle.freezePosition(false);
		}
		
		busTasksBlocked = true;
		mp.game.ui.notifications.showWithPicture("Диспетчер", "Отказ от задачи", "Я заблокировал тебе рейсы на 1 мин.", "CHAR_CHENGSR", 1, false, 1, 2);
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Диспетчер", "Задачи доступны", "Я разблокировал тебе рейсы.", "CHAR_CHENGSR", 1, false, 1, 2);
			busTasksBlocked = false;
		}, 60000);

		vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelBusTask', JSON.stringify(curBusTask), true);
		curBusTask = false;
	}
}

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(shape == busWorkZone) busImInWorkZone = true;
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(shape == busWorkZone) busImInWorkZone = false;
	}
});
}鸔ȍ