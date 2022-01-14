{
/*mp.markers.new(28, new mp.Vector3(-893.9126,-2402.5571,14.0244), 30, // DEBUG
{
	direction: new mp.Vector3(0, 0, 0),
	rotation: new mp.Vector3(0, 180, 0),
	color: [0, 0, 200, 50],
	visible: true,
	dimension: 0
});*/

let courierMarshrut1 = { // Органические удобрения, manure
	"pogruzkaBlip":new mp.Vector3(2489.0747,4962.7329,44.4415),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(2489.0747,4962.7329,44.4415-2.9),"heading":314.47,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(314.47),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Органические удобрения","hash":"manure"},"marshrut":1,"startPoint":"Ферма в Грейпсид","endPoint":"Холмы Тонгва, виноградники","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut2 = { // Запчасти для картингов, cartparts
	"pogruzkaBlip":new mp.Vector3(1729.1659,3713.0398,33.8853),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(1729.1659,3713.0398,33.8853-2.9),"heading":22.387,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(22.387),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(1724.3125,3711.4141,33.9416-2.9),"heading":21.742,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(21.742),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Запчасти для картингов","hash":"cartparts"},"marshrut":2,"startPoint":"Склад в Сэнди-Шорс","endPoint":"Del Perro, Магелан Авеню","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut3 = { // Компьютерные комплектующие, pcparts 
	"pogruzkaBlip":new mp.Vector3(-1317.9438,-764.3234,19.9836),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-1317.9438,-764.3234,19.9836-2.9),"heading":128.464,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(128.464),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-1326.6564,-756.3666,19.9726-2.9),"heading":127.906,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(127.906),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-1288.0803,-795.1234,17.2001-2.9),"heading":127.083,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(127.083),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Компьютерные комплектующие","hash":"pcparts"},"marshrut":3,"startPoint":"Del Perro, Шоссе Дель-Перро","endPoint":"Большая пустыня сеньоры","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut4 = { // Строй материалы, bmats 
	"pogruzkaBlip":new mp.Vector3(922.6915,-1564.2578,30.3349),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(922.6915,-1564.2578,30.3349-2.9),"heading":90.099,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(90.099),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(922.9113,-1557.0259,30.3818-2.9),"heading":90.841,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(90.841),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Строй материалы","hash":"bmats"},"marshrut":4,"startPoint":"Большая пустыня сеньоры","endPoint":"Зеркальный парк","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut5 = { // Запчасти для двигателя, engineparts 
	"pogruzkaBlip":new mp.Vector3(-1139.8842,-2041.6906,12.8128),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-1139.8842,-2041.6906,12.8128-2.9),"heading":314.261,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(314.261),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-1116.8625,-2011.6211,12.7866-2.9),"heading":313.959,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.959),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-1156.2112,-2035.9713,12.7668-2.9),"heading":226.499,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(226.499),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Запчасти для двигателя","hash":"engineparts"},"marshrut":5,"startPoint":"Аэропорт ЛС, Гринвич-парквэй","endPoint":"Бухта Полето","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut6 = { // Запчасти для коробки передач, gearparts 
	"pogruzkaBlip":new mp.Vector3(874.8867,-961.8074,25.8909),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(874.8867,-961.8074,25.8909-2.9),"heading":89.150,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(89.150),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(868.2964,-940.2112,25.886-2.9),"heading":2.168,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(2.168),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(888.5333,-923.2972,25.8876-2.9),"heading":89.152,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(89.152),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Запчасти для коробки передач","hash":"gearparts"},"marshrut":6,"startPoint":"Ла Меса, Бульвар Веспуччи","endPoint":"Пустня сеньоры, Понорама-драйв","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut7 = { // Музыкальные инструменты, music 
	"pogruzkaBlip":new mp.Vector3(-669.3297,-169.409,37.2817),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-669.3297,-169.409,37.2817-2.9),"heading":121.008,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(121.008),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-667.5944,-172.4408,37.2812-2.9),"heading":121.411,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(121.411),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-681.2477,-166.5327,37.2815-2.9),"heading":209.602,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(209.602),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Музыкальные инструменты","hash":"music"},"marshrut":7,"startPoint":"Rockford Hills","endPoint":"Заподный Виноградник","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut8 = { // Одежда для мужчин, mancloth 
	"pogruzkaBlip":new mp.Vector3(-314.3308,-2433.4819,5.6064),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-314.3308,-2433.4819,5.6064-2.9),"heading":229.727,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(229.727),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-301.456,-2444.0522,5.6075-2.9),"heading":229.428,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(229.428),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-282.4127,-2460.3289,5.6079-2.9),"heading":230.082,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(230.082),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Одежда для мужчин","hash":"mancloth"},"marshrut":8,"startPoint":"Елисейский остров","endPoint":"Виноградное семя","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut9 = { // Одежда для женщин, girlcloth 
	"pogruzkaBlip":new mp.Vector3(1218.1549,-2923.5176,5.4714),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(1218.1549,-2923.5176,5.4714-2.9),"heading":90.715,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(90.715),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(1218.2241,2936.0754,5.4713-2.9),"heading":92.578,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(92.578),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(1217.7728,-2904.623,5.4716-2.9),"heading":91.867,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(91.867),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Одежда для женщин","hash":"girlcloth"},"marshrut":9,"startPoint":"Терминал, Буканир-вэй","endPoint":"Del Perro, Шоссе Дель-Перро","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut10 = { // Запчасти для оружия, gunparts 
	"pogruzkaBlip":new mp.Vector3(542.2912,-1943.3243,24.6337),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(542.2912,-1943.3243,24.6337-2.9),"heading":305.308,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(305.308),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(537.4719,-1926.0278,24.5906-2.9),"heading":304.527,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(304.527),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Запчасти для оружия","hash":"gunparts"},"marshrut":10,"startPoint":"Форт Занкудо","endPoint":"Кипарисовые равнины","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut11 = { // Полицейская документация, policedocs
	"pogruzkaBlip":new mp.Vector3(407.9963,-998.7802,28.9151),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(407.9963,-998.7802,28.9151-2.9),"heading":49.781,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(49.781),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(407.6729,-993.7795,28.8931-2.9),"heading":48.927,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(48.927),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Полицейская документация","hash":"policedocs"},"marshrut":11,"startPoint":"Ряд Миссии, Синнер-Стрит","endPoint":"Бухта Палето, Прокопио-Променад","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut12 = { // Медицинское оборудование, medical
	"pogruzkaBlip":new mp.Vector3(3494.2393,3779.1011,29.5592),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(3494.2393,3779.1011,29.5592-2.9),"heading":169.329,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(169.329),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(3505.6118,3776.8044,29.5437-2.9),"heading":168.818,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(168.818),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(3513.321,3775.3635,29.5417-2.9),"heading":169.934,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(169.934),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Медицинское оборудование","hash":"medical"},"marshrut":12,"startPoint":"Humane Labs and Research, Шаньский перевал","endPoint":"Строуберри, Крузейд-роуд","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut13 = { // Нефтепродукты, neft
	"pogruzkaBlip":new mp.Vector3(2904.3013,4396.438,49.8904),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(2904.3013,4396.438,49.8904-2.9),"heading":204.142,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(204.142),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(2908.4697,4398.4932,49.8679-2.9),"heading":202.516,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(202.516),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Нефтепродукты","hash":"neft"},"marshrut":13,"startPoint":"Хребет Сан Кьянски, Шаньский перевал","endPoint":"Холмы Чемберлен, Гроув-стрит","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut14 = { // Корзины для сбора винограда, vinebags
	"pogruzkaBlip":new mp.Vector3(1216.5874,-2978.959,5.5224),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(1216.5874,-2978.959,5.5224-2.9),"heading":90.916,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(90.916),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(1215.9684,-2972.1421,5.5044-2.9),"heading":89.091,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(89.091),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(1215.6521,-2965.1699,5.4924-2.9),"heading":89.588,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(89.588),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Корзины для сбора винограда","hash":"vinebags"},"marshrut":14,"startPoint":"Терминал, Буканир-вэй","endPoint":"Холмы Тонгва, Буэн-Вино-роуд","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut15 = { // Бланки автомобильных страховок, cardocs
	"pogruzkaBlip":new mp.Vector3(2534.5066,-361.3586,92.6188),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(2534.5066,-361.3586,92.6188-2.9),"heading":137.171,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(137.171),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(2524.9055,-371.2535,92.6192-2.9),"heading":137.231,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(137.231),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(2523.1189,-385.4779,92.6188-2.9),"heading":180.657,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(180.657),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Бланки автомобильных страховок","hash":"cardocs"},"marshrut":15,"startPoint":"NOOSE, Сустансия-роуд","endPoint":"Чумаш, Шоссе Грейт-Оушн","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut16 = { // Удочки для рыбалки, rodes
	"pogruzkaBlip":new mp.Vector3(1699.632,4940.9224,41.7687),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(1699.632,4940.9224,41.7687-2.9),"heading":55.661,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(55.661),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(1695.6906,4936.3618,41.7048-2.9),"heading":50.323,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(50.323),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Удочки для рыбалки","hash":"rodes"},"marshrut":16,"startPoint":"Виноградное семя, Грейпсид-Мэйн-стрит","endPoint":"Каньон Банхам, Шоссе Грейт-Оушн","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut17 = { // Строительные каски, buildhats
	"pogruzkaBlip":new mp.Vector3(-169.0535,-1038.3892,26.9274),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-169.0535,-1038.3892,26.9274-2.9),"heading":249.440,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(249.440),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-154.4162,-1043.6158,26.9227-2.9),"heading":253.065,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(253.065),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Строительные каски","hash":"buildhats"},"marshrut":17,"startPoint":"Бухта Палето, Бульвар Палето","endPoint":"Альта, Окьюпейшн-авеню","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut18 = { // Маскарадные маски, masks
	"pogruzkaBlip":new mp.Vector3(1736.9617,3289.2932,40.7705),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(1736.9617,3289.2932,40.7705-2.9),"heading":207.062,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(207.062),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(1752.5793,3291.697,40.739-2.9),"heading":252.077,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(252.077),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(1722.0558,3277.6064,40.7425-2.9),"heading":294.342,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(294.342),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Маскарадные маски","hash":"masks"},"marshrut":18,"startPoint":"Большая пустыня сеньоры, Панорама-драйв","endPoint":"Пляж Веспуччи, Витус-стрит","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut19 = { // Верёвки и мыло, lolmilo
	"pogruzkaBlip":new mp.Vector3(-3050.4609,597.3295,7.0692),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-3050.4609,597.3295,7.0692-2.9),"heading":287.706,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(287.706),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-3052.9983,602.9173,6.9078-2.9),"heading":287.214,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(287.214),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Верёвки и мыло","hash":"lolmilo"},"marshrut":19,"startPoint":"Каньон Банхам, Инесено-роуд","endPoint":"Bolingbroke Penitentiary, Шоссе 68","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut20 = { // Резиновые женщины, plasticgirl
	"pogruzkaBlip":new mp.Vector3(165.1092,-2990.6106,5.5536),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(165.1092,-2990.6106,5.5536-2.9),"heading":269.830,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(269.830),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(165.0203,-2997.3511,5.5368-2.9),"heading":268.826,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(268.826),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(165.2674,-3004.0776,5.5237-2.9),"heading":271.930,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(271.930),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Резиновые женщины","hash":"plasticgirl"},"marshrut":20,"startPoint":"Елисейский остров, Сигнал-стрит","endPoint":"Форт Занкуда, Шоссе Грейт-Оушн","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut21 = { // Покрышки
	"pogruzkaBlip":new mp.Vector3(-435.6181,-2854.7456,5.6062),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-435.6181,-2854.7456,5.6062-2.9),"heading":134.976,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.976),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-444.4459,-2863.562,5.6058-2.9),"heading":134.987,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(134.987),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-453.581,-2872.7166,5.6063-2.9),"heading":135.047,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(135.047),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Покрышки","hash":"tires"},"marshrut":21,"startPoint":"Елисейский остров, Плэйс-плэйс","endPoint":"Бертон, Карсер-вэй","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut22 = { // Диски, wheels
	"pogruzkaBlip":new mp.Vector3(-106.4339,-2410.573,5.6057),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-106.4339,-2410.573,5.6057-2.9),"heading":89.627,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(89.627),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-105.4611,-2415.8811,5.6063-2.9),"heading":90.854,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(90.854),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-106.315,-2421.4609,5.6053-2.9),"heading":89.654,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(89.654),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Диски","hash":"wheels"},"marshrut":22,"startPoint":"Еслисейский остров, Чупакабра-стрит","endPoint":"Большая пустыня сеньоры, Шоссе 68","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut23 = { // Запчасти для Mercedes-Benz, mersparts 
	"pogruzkaBlip":new mp.Vector3(-1856.6667,-313.9035,48.794),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-1856.6667,-313.9035,48.794-2.9),"heading":347.482,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(347.482),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-1843.3722,-323.6466,48.7942-2.9),"heading":341.642,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(341.642),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Запчасти для Mercedes-Benz","hash":"mersparts"},"marshrut":23,"startPoint":"Текстильный город, Литл-Бигхарн-авеню","endPoint":"Плэйа-виста","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut24 = { // Запчасти для Subaru, subaruparts 
	"pogruzkaBlip":new mp.Vector3(-15.5663,-1307.3196,28.847),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-15.5663,-1307.3196,28.847-2.9),"heading":357.601,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(357.601),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(-21.1224,-1307.9193,28.8726-2.9),"heading":0.333,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(0.333),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(3.6722,-1306.5106,29.7775-2.9),"heading":268.803,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(268.803),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Запчасти для Subaru","hash":"subaruparts"},"marshrut":24,"startPoint":"Строуберри, Пауэр-стрит","endPoint":"Терминал, Буканир-вэй","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut25 = { // Запчасти для грузовиков, bigparts 
	"pogruzkaBlip":new mp.Vector3(144.6373,-3326.3594,5.67),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(144.6373,-3326.3594,5.67-2.9),"heading":179.503,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(179.503),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(115.2989,-3309.812,5.6603-2.9),"heading":94.579,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(94.579),"width":2.8,"height":6.5},
	    {"position":new mp.Vector3(115.4039,-3291.2017,5.6612-2.9),"heading":90.136,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(90.136),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Запчасти для грузовиков","hash":"bigparts"},"marshrut":25,"startPoint":"Гора Чилиад, Шоссе Грейт-Оушн","endPoint":"Песчаные берега, Шоссе Сенора","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut26 = { // Комбикорм для птиц, combirds
	"pogruzkaBlip":new mp.Vector3(489.1374,-3074.1355,5.6957),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(489.1374,-3074.1355,5.6957-2.9),"heading":0.439,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(0.439),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(489.1611,-3095.176,5.7095-2.9),"heading":358.862,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(358.862),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(479.7639,-3077.6692,5.6946-2.9),"heading":180.406,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(180.406),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Комбикорм для птиц","hash":"combirds"},"marshrut":26,"startPoint":"Елисейский остров, Вуду-плейс","endPoint":"Виноградное семя, Джоуд-лейн","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut27 = { // Доставка пиццы, pizza
	"pogruzkaBlip":new mp.Vector3(150.7606,-1449.9133,28.7698),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(150.7606,-1449.9133,28.7698-2.9),"heading":108.133,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(108.133),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(159.1923,-1457.2263,28.7686-2.9),"heading":96.527,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(96.527),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(142.2128,-1457.6974,28.7534-2.9),"heading":51.700,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(51.700),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Доставка пиццы","hash":"pizza"},"marshrut":27,"startPoint":"Дэвис, Строберри-авеню","endPoint":"Большая пустыня сеньоры, Джошуа-роуд","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut28 = { // Деревенский самогон, samogon
	"pogruzkaBlip":new mp.Vector3(2313.8396,4893.8628,41.4571),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(2313.8396,4893.8628,41.4571-2.9),"heading":11.367,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(11.367),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(2306.8337,4886.8364,41.4569-2.9),"heading":8.291,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(8.291),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Деревенский самогон","hash":"samogon"},"marshrut":28,"startPoint":"Виноградное семя, Юнион-роуд","endPoint":"Del Perro, Марафон-авеню","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut29 = { // Патроны для оружия, ammo
	"pogruzkaBlip":new mp.Vector3(529.5402,-27.7215,70.2782),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(529.5402,-27.7215,70.2782-2.9),"heading":211.228,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(211.228),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(533.8938,-24.7643,70.2348-2.9),"heading":209.887,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(209.887),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Патроны для оружия","hash":"ammo"},"marshrut":29,"startPoint":"Форт Занкуда, Шоссе Грейт-Оушн","endPoint":"Кипарисовые равнины, Попьюлар-стрит","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

let courierMarshrut30 = { // Инстременты для чип тюнинга, chiptun
	"pogruzkaBlip":new mp.Vector3(-184.3922,-1318.193,30.9465),
	"pogruzkaMarkers":[
		{"position":new mp.Vector3(-184.3922,-1318.193,30.9465-2.9),"heading":226.776,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(270.146),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-183.8626,-1334.9502,30.9492-2.9),"heading":164.875,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(268.515),"width":2.8,"height":6.5}
	],
	"endpointBlip":new mp.Vector3(-64.7822,6389.2974,31.1386),
	"endpointMarkers":[
		{"position":new mp.Vector3(-74.898,6394.7368,31.1382-2.9),"heading":240.632,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(240.632),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-79.9015,6389.0386,31.1389-2.9),"heading":243.667,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(243.667),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-64.7822,6389.2974,31.1386-2.9),"heading":318.319,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(318.319),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-54.6052,6399.4653,31.1394-2.9),"heading":26.889,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(26.889),"width":2.8,"height":6.5},
		{"position":new mp.Vector3(-63.8773,6408.1997,31.1391-2.9),"heading":313.897,"color":[255,150,0,150],"drawColor":[0,0,0,0],"direction":dirGenerator(313.897),"width":2.8,"height":6.5},
	]
	//ПАРАМЕТРЫ: courierTasks.push({"id":courierTasksIDs,"courier":false,"cargo":{"name":"Инстременты для чип тюнинга","hash":"chiptun"},"marshrut":30,"startPoint":"Бухта Палето, Бульвар Палето","endPoint":"Rancho, Литл-Бигхорн-авеню","cost":getRandomInt(35000,45000),"minRank":1,"courierID":false,"courierPlayerID":false});
};

var courierWorkZone = mp.colshapes.newSphere(-50.8892,6359.6006,31.4296,50,0);
var courierImInWorkZone = false;

var curCourierTask = false, courierBlip = false;

var courierTasksBlocked = false;

var courierMomentStart = false;

function startCourierJob() {
	if(typeof(localPlayer.getVariable('player.lics')) === "undefined") return hud_browser.execute('jobPanelError("#startCourierJob", "Технические неполадки системы лицензий..")');
	if(typeof(localPlayer.getVariable('player.vehs')) === "undefined") return hud_browser.execute('jobPanelError("#startCourierJob", "Ваш личный транспорт не инициализирован..")');
	let myLics = {};
	if(IsJsonString(JSON.stringify(localPlayer.getVariable('player.lics')))) myLics = localPlayer.getVariable('player.lics');
	if(myLics["bCat"] === undefined) return hud_browser.execute('jobPanelError("#startCourierJob", "Отсутствуют водительские права категории «B»")');
	
	var myVehs = localPlayer.getVariable('player.vehs');
	if(typeof(myVehs.count) === "undefined") return hud_browser.execute('jobPanelError("#startCourierJob", "Ваш личный транспорт не инициализирован..")');
	if(parseInt(myVehs.count) <= 0) return hud_browser.execute('jobPanelError("#startCourierJob", "У Вас нет личного транспорта!")');
	
	closeJobTablet();
	mp.events.callRemote('startCourierJob');
	mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вас приняли работать в курьерскую службу", 5, false, true, 6500);
	setTimeout(function() {
		mp.game.ui.notifications.showWithPicture("Логист", "Приветствую", "Получил рабочий планшет? Нажми F5 и выбери задачу.", "CHAR_ONEIL", 1, false, 1, 2);
	}, 2000);
}
mp.events.add("startCourierJob", startCourierJob);

function courierStartStop() {
	if(localPlayer.getVariable("player.job")) {
		let jobData = localPlayer.getVariable("player.job");
		closeJobTablet(true);
		
		if(jobData.work == 0) {
			if(courierImInWorkZone) {
				if(!localPlayer.vehicle) {
					mp.game.ui.notifications.showWithPicture("Логист", "Ты чё, пешком?", "Нельзя начать смену без машины.", "CHAR_ONEIL", 1, false, 1, 2);
				}else{
					if(!activeJOBoperation) {
						let jobVeh = localPlayer.vehicle;
						if(jobVeh) {
							if(typeof(jobVeh.getVariable('veh.id')) !== "undefined" && typeof(jobVeh.getVariable('veh.own')) !== "undefined" && typeof(jobVeh.getVariable('veh.hash')) !== "undefined") {
								if(mp.players.atRemoteId(parseInt(jobVeh.getVariable('veh.own')))) {
									let vehOwn = mp.players.atRemoteId(parseInt(jobVeh.getVariable('veh.own')));
									if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Работать можно только на личном транспорте</span>");
								}else{
									return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Работать можно только на личном транспорте</span>");
								}
							}else{
								return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Работать можно только на личном транспорте</span>");
							}
						}
						
						if(typeof(jobVeh.getVariable('veh.num')) !== "undefined") {
							if(jobVeh.getVariable('veh.num') == "theMoto") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Мото-техника на этой работе недоступна.</span>");
						}
						
						if(jobVeh.getClass().toString() == "15") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * На вертолётном транспорте эта работа недоступна.</span>");
						
						if(typeof(jobVeh.getVariable('veh.params')) !== "undefined") {
							let vehParams = JSON.parse(jobVeh.getVariable("veh.params"));
							if(typeof(vehParams.rent) !== "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * На арендованном транспорте работать нельзя</span>");
						}
						
						courierMomentStart = true;
						setTimeout(function() { courierMomentStart = false; }, 3500);
						mp.events.call("sleepAntiCheat");
						mp.events.callRemote('startJobWork', localPlayer.vehicle);
						mp.game.ui.notifications.showWithPicture("Логист", "Смена началась", "Возьми поручение. Они в планшете (F5)", "CHAR_ONEIL", 1, false, 1, 2);
					}
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Логист", "Дуй в офис", "Смену можно начать только на территории базы.", "CHAR_ONEIL", 1, false, 1, 2);
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Явитесь на базу курьерской службы что бы начать смену.</span>");
			}
		}else{
			if(!activeJOBoperation) {
				activeJOBoperation = true;
				
				if(curCourierTask) mp.events.callRemote('cancelCourierTask', JSON.stringify(curCourierTask), false);
				if(typeof(curCourierTask.workTimer) !== "undefined") clearTimeout(curCourierTask.workTimer);
				curCourierTask = false;
				
				if(mp.blips.exists(courierBlip)) courierBlip.destroy();
				courierBlip = false;
		
				if(jobData.workMoney > 0) {
					//let resWorkMoney = roundNumber((parseInt(jobData.workMoney)-(parseInt(jobData.workMoney)*0.13)), 0);
					let resWorkMoney = roundNumber(parseInt(jobData.workMoney), 0);
					let workMoneyText = resWorkMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы заработали за смену"+workMoneyText+" руб.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Логист", "А ты хорош!", "Отдохни и выходи на смену снова, давай братан!", "CHAR_ONEIL", 1, false, 1, 2);
				}else{
					mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~работа", "~s~Вы ничего не заработали за смену.", 5, false, true, 6500);
					mp.game.ui.notifications.showWithPicture("Логист", "Это как так?", "Не выполнил ни одного поручения?! Блок агрегатора 1 мин.", "CHAR_ONEIL", 1, false, 1, 2);
					courierTasksBlocked = true;
					setTimeout(function() {
						mp.game.ui.notifications.showWithPicture("Логист", "Задачи доступны", "Я разблокировал тебе агрегатор.", "CHAR_ONEIL", 1, false, 1, 2);
						courierTasksBlocked = false;
					}, 60000);
				}
				
				mp.events.callRemote('stopJobWork');
			}
		}
	}
}
mp.events.add("courierStartStop", courierStartStop);

function getCourierTasks(){
	if(!courierBlip) {
		if(!localPlayer.vehicle) {
			return hud_browser.execute("gettedCourierTasks('you_not_in_veh');");
		}else{
			let theVeh = localPlayer.vehicle;
			if(typeof(theVeh.getVariable("veh.id")) === "undefined" || typeof(localPlayer.getVariable("player.job")) === "undefined") {
				//chatAPI.sysPush("<span style=\"color:#FF6146\">1</span>");
				return hud_browser.execute("gettedCourierTasks('you_not_in_veh');");
			}
			if(typeof(theVeh.getVariable('veh.params')) !== "undefined") {
				let vehParams = JSON.parse(theVeh.getVariable("veh.params"));
				//chatAPI.sysPush("<span style=\"color:#FF6146\">2</span>");
				if(typeof(vehParams.rent) !== "undefined") return hud_browser.execute("gettedCourierTasks('you_not_in_veh');");
			}
			
			let jobData = localPlayer.getVariable("player.job");
			if(typeof(jobData) === "undefined") {
				//chatAPI.sysPush("<span style=\"color:#FF6146\">3</span>");
				return hud_browser.execute("gettedCourierTasks('you_not_in_veh');");
			}

			let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
			if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) {
				//chatAPI.sysPush("<span style=\"color:#FF6146\">4</span>");
				return hud_browser.execute("gettedCourierTasks('you_not_in_veh');");
			}
		}
		mp.events.callRemote('getCourierTasks');
	}else{
		hud_browser.execute("gettedCourierTasks('you_have_task');");
	}
}
mp.events.add("getCourierTasks", getCourierTasks);

function gettedCourierTasks(courierTasks){
	if(courierTasks) {
		if(!curCourierTask && typeof(localPlayer.getVariable("player.job")) !== "undefined") {
			courierTasks = JSON.parse(courierTasks);
			if(Object.keys(courierTasks).length > 0) {
				let jobData = localPlayer.getVariable("player.job");
					
				for (var k in courierTasks) {
					if(courierTasks[k]) {
						let taskData = courierTasks[k];
						if(parseInt(jobData.rank) < parseInt(taskData.minRank)) delete courierTasks[k];
					}
				}
				courierTasks = courierTasks.filter(function (el) { return el != null; });
				
				//chatAPI.sysPush("<span style=\"color:#FF6146\">"+JSON.stringify(courierTasks)+"</span>");
				hud_browser.execute("gettedCourierTasks('ok', '"+JSON.stringify(courierTasks)+"');");
			}else{
				hud_browser.execute("gettedCourierTasks('empty');");
			}
		}else{
			hud_browser.execute("gettedCourierTasks('you_have_task');");
		}
	}
}
mp.events.add("gettedCourierTasks", gettedCourierTasks);

function acceptTaskCourier(data){
	if(data) {
		closeJobTablet();
		if(courierTasksBlocked) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("Логист", "Блокировка доступа", "У Тебя блок доступа к поручениям на 1 мин.", "CHAR_ONEIL", 1, false, 1, 2);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Тебя заблокирован доступ к поручениям, попробуйте через минуту..</span>");
		}
		
		if(!courierImInWorkZone) {
			restoreBinds();
			jobPanel = false;
			mp.game.ui.notifications.showWithPicture("Логист", "Явитесь на базу", "Взять поручение можно только в конторе.", "CHAR_ONEIL", 1, false, 1, 2);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Явись в контору что бы взять поручение.</span>");
		}
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('acceptTaskCourier', data);
	}
}
mp.events.add("acceptTaskCourier", acceptTaskCourier);

function acceptedCourierTask(isError, data){
	restoreBinds();
	jobPanel = false;
	if(isError) {
		return chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+isError+"</span>");
	}else{
		if(data) {
			if(localPlayer.vehicle) {
				data = JSON.parse(data);
				curCourierTask = data;
				if(curCourierTask.marshrut == 1) curCourierTask.marshrut = courierMarshrut1;
				if(curCourierTask.marshrut == 2) curCourierTask.marshrut = courierMarshrut2;
				if(curCourierTask.marshrut == 3) curCourierTask.marshrut = courierMarshrut3;
				if(curCourierTask.marshrut == 4) curCourierTask.marshrut = courierMarshrut4;
				if(curCourierTask.marshrut == 5) curCourierTask.marshrut = courierMarshrut5;
				if(curCourierTask.marshrut == 6) curCourierTask.marshrut = courierMarshrut6;
				if(curCourierTask.marshrut == 7) curCourierTask.marshrut = courierMarshrut7;
				if(curCourierTask.marshrut == 8) curCourierTask.marshrut = courierMarshrut8;
				if(curCourierTask.marshrut == 9) curCourierTask.marshrut = courierMarshrut9;
				if(curCourierTask.marshrut == 10) curCourierTask.marshrut = courierMarshrut10;
				if(curCourierTask.marshrut == 11) curCourierTask.marshrut = courierMarshrut11;
				if(curCourierTask.marshrut == 12) curCourierTask.marshrut = courierMarshrut12;
				if(curCourierTask.marshrut == 13) curCourierTask.marshrut = courierMarshrut13;
				if(curCourierTask.marshrut == 14) curCourierTask.marshrut = courierMarshrut14;
				if(curCourierTask.marshrut == 15) curCourierTask.marshrut = courierMarshrut15;
				if(curCourierTask.marshrut == 16) curCourierTask.marshrut = courierMarshrut16;
				if(curCourierTask.marshrut == 17) curCourierTask.marshrut = courierMarshrut17;
				if(curCourierTask.marshrut == 18) curCourierTask.marshrut = courierMarshrut18;
				if(curCourierTask.marshrut == 19) curCourierTask.marshrut = courierMarshrut19;
				if(curCourierTask.marshrut == 20) curCourierTask.marshrut = courierMarshrut20;
				if(curCourierTask.marshrut == 21) curCourierTask.marshrut = courierMarshrut21;
				if(curCourierTask.marshrut == 22) curCourierTask.marshrut = courierMarshrut22;
				if(curCourierTask.marshrut == 23) curCourierTask.marshrut = courierMarshrut23;
				if(curCourierTask.marshrut == 24) curCourierTask.marshrut = courierMarshrut24;
				if(curCourierTask.marshrut == 25) curCourierTask.marshrut = courierMarshrut25;
				if(curCourierTask.marshrut == 26) curCourierTask.marshrut = courierMarshrut26;
				if(curCourierTask.marshrut == 27) curCourierTask.marshrut = courierMarshrut27;
				if(curCourierTask.marshrut == 28) curCourierTask.marshrut = courierMarshrut28;
				if(curCourierTask.marshrut == 29) curCourierTask.marshrut = courierMarshrut29;
				if(curCourierTask.marshrut == 30) curCourierTask.marshrut = courierMarshrut30;
				
				curCourierTask.curPoint = "getCargo";
				
				courierProcessor();
			}else{
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Сбой в работе диспетчера, выберите другой рейс</span>");
			}
		}else{
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Сбой в работе диспетчера, выберите другой рейс</span>");
		}
	}
}
mp.events.add("acceptedCourierTask", acceptedCourierTask);

function stopCourierWithTimer(){
	closeJobTablet(true);
	if(curCourierTask) {
		if(mp.blips.exists(courierBlip)) courierBlip.destroy();
		courierBlip = false;
		
		if(BLOCK_CONTROLS && localPlayer.vehicle) {
			BLOCK_CONTROLS = false;
			localPlayer.vehicle.freezePosition(false);
		}
		
		mp.game.ui.messages.showMidsized("~r~Вы опоздали ~s~при выполнении поручения", "~s~Задача отменена, взять новую можно в планшете (F5)");
		mp.game.ui.notifications.showWithPicture("Логист", "Серьёзное опоздание", "Я заблокировал тебе поручения на 1 мин.", "CHAR_ONEIL", 1, false, 1, 2);
		
		courierTasksBlocked = true;
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Логист", "Поручения доступны", "Я разблокировал тебе поручения.", "CHAR_ONEIL", 1, false, 1, 2);
			courierTasksBlocked = false;
		}, 60000);
		
		vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelCourierTask', JSON.stringify(curCourierTask), false);
		if(typeof(curCourierTask.workTimer) !== "undefined") clearTimeout(curCourierTask.workTimer);
		curCourierTask = false;
	}
}

function courierProcessor() {
	if(curCourierTask) {
		if(curCourierTask.curPoint == "getCargo") {
			mp.game.ui.notifications.showWithPicture("Логист", "Рейс назначен", "Отправляйся в зону погрузки, маршрут уже радаре", "CHAR_ONEIL", 1, false, 1, 2);
			mp.game.ui.notifications.showWithPicture("Логист", "Обрати внимание", "На выполнение поручения максимум 10 мин.", "CHAR_ONEIL", 1, false, 1, 2);
			
			curCourierTask.workTimer = setTimeout(stopCourierWithTimer, 600000);
			
			if(courierBlip) {
				courierBlip.destroy();
				courierBlip = false;
			}
			
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(curCourierTask.marshrut.pogruzkaBlip)+"</span>");
			
			courierBlip = mp.blips.new(1, [curCourierTask.marshrut.pogruzkaBlip.x, curCourierTask.marshrut.pogruzkaBlip.y, curCourierTask.marshrut.pogruzkaBlip.z], {
				name: "Зона взятия прицепа / груза",
				scale: 1.5,
				color: 47,
				shortRange: false,
				dimension: 0
			});
			courierBlip.setRoute(true);
			courierBlip.setRouteColour(47);
			
			vehParkMarkers = curCourierTask.marshrut.pogruzkaMarkers, parkingVeh = localPlayer.vehicle, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
		}else if(curCourierTask.curPoint == "gettingCargo") {
			if(localPlayer.vehicle) {
				if(typeof(localPlayer.vehicle.getVariable("veh.id")) !== "undefined") {
					if(curCourierTask.courier == localPlayer.vehicle.getVariable("veh.id").toString()) {
						mp.game.ui.notifications.showWithPicture("Местный грузчик", "Начинаем погрузку", "Дружище, подожди немного, сейчас загрузим", "CHAR_BEVERLY", 1, false, 1, 2);
						
						BLOCK_CONTROLS = true;
						localPlayer.vehicle.freezePosition(true);
						
						if(courierBlip) {
							courierBlip.destroy();
							courierBlip = false;
						}
						
						setTimeout(function() {
							if(localPlayer.vehicle && parkingVeh) {
								if(mp.vehicles.exists(parkingVeh)) {
									if(localPlayer.vehicle == parkingVeh && typeof(goodVehParked.x) !== "undefined") {
										let cheatDist = mp.game.system.vdist(parkingVeh.position.x, parkingVeh.position.y, parkingVeh.position.z, goodVehParked.x, goodVehParked.y, goodVehParked.z);
										if(cheatDist > 30) mp.events.callRemote('kickAct', localPlayer, "читы на телепорт на работе");
									}else{
										courierJobWarn();
									}
								}else{
									courierJobWarn();
								}
							}else{
								courierJobWarn();
							}
						}, 5000);
						
						setTimeout(function() {
							if(localPlayer.vehicle && parkingVeh) {
								if(localPlayer.vehicle == parkingVeh) {
									vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
									// GEN TIME OF DELIVERY
									
									curCourierTask.deliveryTime = moment(new Date(curYear+"-"+curMonth+"-"+curDay+" "+curHours+":"+curMinutes+":"+curSeconds),"DD-MM-YYYY HH:mm:ss").add((curCourierTask.time+2), 'minutes');
									//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+curCourierTask.deliveryTime+"</span>");
									
									BLOCK_CONTROLS = false;
									localPlayer.vehicle.freezePosition(false);
									
									curCourierTask.curPoint = "rideCargo";
									courierProcessor();
								}else{
									courierJobWarn();
								}
							}else{
								courierJobWarn();
							}
						}, 10000);
					}else{
						courierJobWarn();
					}
				}else{
					courierJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Работник терминала", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_BEVERLY", 1, false, 1, 2);
				courierJobWarn();
			}
		}else if(curCourierTask.curPoint == "rideCargo") {
			if(localPlayer.vehicle) {
				if(typeof(localPlayer.vehicle.getVariable("veh.id")) !== "undefined") {
					if(curCourierTask.courier == localPlayer.vehicle.getVariable("veh.id").toString()) {
						let dateFormater = moment.duration((curCourierTask.deliveryTime).diff(moment(new Date(curYear+"-"+curMonth+"-"+curDay+" "+curHours+":"+curMinutes+":"+curSeconds),"DD-MM-YYYY HH:mm:ss")));
						let deliveryOstPeriod = dateFormater.minutes() + " мин. " + dateFormater.seconds() + " сек.";
						mp.game.ui.notifications.showWithPicture("Логист", "Выполняй поручение", "Необходимо доставить за "+deliveryOstPeriod, "CHAR_ONEIL", 1, false, 1, 2);
						
						if(courierBlip) {
							courierBlip.destroy();
							courierBlip = false;
						}
						
						courierBlip = mp.blips.new(1, [curCourierTask.marshrut.endpointBlip.x, curCourierTask.marshrut.endpointBlip.y, curCourierTask.marshrut.endpointBlip.z], {
							name: "Зона доставки груза",
							scale: 1.5,
							color: 47,
							shortRange: false,
							dimension: 0
						});
						courierBlip.setRoute(true);
						courierBlip.setRouteColour(47);
						
						vehParkMarkers = curCourierTask.marshrut.endpointMarkers, parkingVeh = localPlayer.vehicle, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
						curCourierTask.curPoint = "cargoDrop";
					}else{
						courierJobWarn();
					}
				}else{
					courierJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Работник терминала", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_BEVERLY", 1, false, 1, 2);
				courierJobWarn();
			}
		}else if(curCourierTask.curPoint == "cargoDrop") {
			if(localPlayer.vehicle) {
				if(typeof(localPlayer.vehicle.getVariable("veh.id")) !== "undefined") {
					if(curCourierTask.courier == localPlayer.vehicle.getVariable("veh.id").toString()) {
						let dateFormater = moment.duration(curCourierTask.deliveryTime.diff(moment(new Date(curYear+"-"+curMonth+"-"+curDay+" "+curHours+":"+curMinutes+":"+curSeconds),"DD-MM-YYYY HH:mm:ss")));
						if(dateFormater.minutes() < -5) {
							mp.game.ui.notifications.showWithPicture("Логист", "Ты опоздал!", "Выбирай новое поручение или отдохни, решать тебе", "CHAR_ONEIL", 1, false, 1, 2);
							mp.game.ui.messages.showMidsized("~r~Поручение ~s~провалено", "~s~ты ничего не заработал, опоздание на "+(dateFormater.minutes()*-1)+" мин.");
							
							if(courierBlip) {
								courierBlip.destroy();
								courierBlip = false;
							}
							
							mp.events.callRemote('cancelCourierTask', curCourierTask.id.toString());
							if(typeof(curCourierTask.workTimer) !== "undefined") clearTimeout(curCourierTask.workTimer);
							curCourierTask = false;
							
							return false;
						}else if(dateFormater.minutes() > 2) {
							mp.game.ui.notifications.showWithPicture("Логист", "Подожди немного", "Ты сможешь сдать поручение через "+(dateFormater.minutes()-2)+" мин.", "CHAR_ONEIL", 1, false, 1, 2);
							
							setTimeout(function() {
								if(localPlayer.vehicle) {
									if(typeof(localPlayer.vehicle.getVariable("veh.id")) !== "undefined") {
										if(mp.vehicles.exists(parkingVeh)) {
											if(localPlayer.vehicle == parkingVeh && typeof(goodVehParked.x) !== "undefined") vehParkMarkers = curCourierTask.marshrut.endpointMarkers, parkingVeh = localPlayer.vehicle, goodVehParked = false, activeVehParking = false; // Активируем парковочные маркеры
											else courierJobWarn();
										}else{
											courierJobWarn();
										}
									}else{
										courierJobWarn();
									}
								}else{
									courierJobWarn();
								}
							}, 5000);
							
							return false;
						}
						
						setTimeout(function() {
							if(localPlayer.vehicle) {
								if(typeof(localPlayer.vehicle.getVariable("veh.id")) !== "undefined") {
									if(mp.vehicles.exists(parkingVeh)) {
										if(localPlayer.vehicle == parkingVeh && typeof(goodVehParked.x) !== "undefined") {
											let cheatDist = mp.game.system.vdist(parkingVeh.position.x, parkingVeh.position.y, parkingVeh.position.z, goodVehParked.x, goodVehParked.y, goodVehParked.z);
											if(cheatDist > 30) mp.events.callRemote('kickAct', localPlayer, "читы на телепорт на работе");
										}else{
											courierJobWarn();
										}
									}else{
										courierJobWarn();
									}
								}else{
									courierJobWarn();
								}
							}else{
								courierJobWarn();
							}
						}, 5000);
						
						BLOCK_CONTROLS = true;
						localPlayer.vehicle.freezePosition(true);
			
						mp.game.ui.notifications.showWithPicture("Местный грузчик", "Начинаем разгрузку", "Дружище, подожди немного, сейчас всё выгрузим", "CHAR_BEVERLY", 1, false, 1, 2);
			
						setTimeout(function() {
							if(localPlayer.vehicle) {
								if(typeof(localPlayer.vehicle.getVariable("veh.id")) !== "undefined") {
									if(curCourierTask.courier == localPlayer.vehicle.getVariable("veh.id").toString()) {
										vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
										
										mp.game.ui.notifications.showWithPicture("Логист", "Поручение выполнено", "Выбирай новое поручение или отдохни, решать тебе", "CHAR_ONEIL", 1, false, 1, 2);
										mp.game.ui.messages.showMidsized("~g~Поручение ~s~выполнено", "~s~вы заработали"+curCourierTask.cost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.");

										if(courierBlip) {
											courierBlip.destroy();
											courierBlip = false;
										}

										mp.events.callRemote('actionMakedCourierJob', curCourierTask.id.toString());
										if(typeof(curCourierTask.workTimer) !== "undefined") clearTimeout(curCourierTask.workTimer);
										curCourierTask = false;
										
										BLOCK_CONTROLS = false;
										localPlayer.vehicle.freezePosition(false);
									}else{
										courierJobWarn();
									}
								}else{
									courierJobWarn();
								}
							}else{
								courierJobWarn();
							}
						}, 10000);
					}else{
						courierJobWarn();
					}
				}else{
					courierJobWarn();
				}
			}else{
				mp.game.ui.notifications.showWithPicture("Работник терминала", "Стоп-стоп", "А чё это за левый транспорт?", "CHAR_BEVERLY", 1, false, 1, 2);
				courierJobWarn();
			}
		}
	}
}

function warnCourierJobIsDead(player) {
	if(player == localPlayer) {
		if(curCourierTask) {
			mp.game.ui.notifications.showWithPicture("Логист", "Ты потерял поручение", "Выговор, следи за здоровьем!", "CHAR_ONEIL", 1, false, 1, 2);
			courierJobWarn();
		}
	}
}
mp.events.add("playerDeath", warnCourierJobIsDead);

function cancelCourierJobTask(){
	closeJobTablet(true);
	if(curCourierTask) {
		if(mp.blips.exists(courierBlip)) courierBlip.destroy();
		courierBlip = false;
		
		if(BLOCK_CONTROLS && localPlayer.vehicle) {
			BLOCK_CONTROLS = false;
			localPlayer.vehicle.freezePosition(false);
		}
		
		mp.game.ui.messages.showMidsized("~g~Вы успешно ~s~отказались от поручения", "~s~Новые поручения можно посмотреть в планшете (F5)");
		mp.game.ui.notifications.showWithPicture("Логист", "Отказ от поручения", "Я заблокировал тебе поручения на 1 мин.", "CHAR_ONEIL", 1, false, 1, 2);
		
		courierTasksBlocked = true;
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Логист", "Поручения доступны", "Я разблокировал тебе поручения.", "CHAR_ONEIL", 1, false, 1, 2);
			courierTasksBlocked = false;
		}, 60000);
		
		vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelCourierTask', JSON.stringify(curCourierTask), false);
		if(typeof(curCourierTask.workTimer) !== "undefined") clearTimeout(curCourierTask.workTimer);
		curCourierTask = false;
	}
}
mp.events.add("cancelCourierJobTask", cancelCourierJobTask);

function checkCourierTaskAndStop() {
	if(curCourierTask) courierJobWarn("запрещено выполнять поручение на вертолёте");
}

function courierJobWarn(reason) {
	if(curCourierTask) {
		if(typeof(reason) !== "undefined") {
			mp.game.ui.notifications.showWithPicture("Логист", "Предупреждение", reason+".", "CHAR_ONEIL", 1, false, 1, 2);
			mp.game.ui.messages.showMidsized("~r~Поручение отозвано", "~s~"+reason+".");
		}else{
			mp.game.ui.notifications.showWithPicture("Логист", "Предупреждение", "В целях безопасности я закончил твой поручение.", "CHAR_ONEIL", 1, false, 1, 2);
			mp.game.ui.messages.showMidsized("~r~Поручение отозвано", "~s~Что-то случилось в ответственный момент.");
		}
		
		if(mp.blips.exists(courierBlip)) courierBlip.destroy();
		courierBlip = false;
		
		if(BLOCK_CONTROLS && localPlayer.vehicle) {
			BLOCK_CONTROLS = false;
			localPlayer.vehicle.freezePosition(false);
		}
		
		courierTasksBlocked = true;
		mp.game.ui.notifications.showWithPicture("Логист", "Отказ от поручения", "Я заблокировал тебе поручения на 1 мин.", "CHAR_ONEIL", 1, false, 1, 2);
		setTimeout(function() {
			mp.game.ui.notifications.showWithPicture("Логист", "Поручения доступны", "Я разблокировал тебе поручения.", "CHAR_ONEIL", 1, false, 1, 2);
			courierTasksBlocked = false;
		}, 60000);

		vehParkMarkers = [], parkingVeh = false, goodVehParked = false, activeVehParking = false; // Удаляем парковочные маркеры
		
		mp.events.call("sleepAntiCheat");
		mp.events.callRemote('cancelCourierTask', JSON.stringify(curCourierTask), true);
		if(typeof(curCourierTask.workTimer) !== "undefined") clearTimeout(curCourierTask.workTimer);
		curCourierTask = false;
	}
}

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(shape == courierWorkZone) courierImInWorkZone = true;
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.id) != "undefined") {
		if(shape == courierWorkZone) courierImInWorkZone = false;
	}
});
}