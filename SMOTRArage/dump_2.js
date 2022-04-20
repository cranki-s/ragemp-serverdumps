"use strict";

//mp.game.waitAsync(5000);

var vehForApplyChip = false;
var cruiseControl = false;

mp.blips.forEach(
	(blip, id) => {
		if(blip) blip.destroy();
	}
);

mp.browsers.forEach(
	(browser, id) => {
		if(browser) browser.destroy();
	}
);

mp.cameras.forEach(
	(camera, id) => {
		if(camera) camera.destroy();
	}
);

mp.checkpoints.forEach(
	(checkpoint, id) => {
		if(checkpoint) checkpoint.destroy();
	}
);

mp.colshapes.forEach(
	(colshape, id) => {
		if(colshape) colshape.destroy();
	}
);

mp.labels.forEach(
	(label, id) => {
		if(label) label.destroy();
	}
);

mp.markers.forEach(
	(marker, id) => {
		if(marker) marker.destroy();
	}
);

mp.objects.forEach(
	(object, id) => {
		if(object) object.destroy();
	}
);

mp.pickups.forEach(
	(pickup, id) => {
		if(pickup) pickup.destroy();
	}
);

mp.peds.forEach(
	(ped, id) => {
		if(ped) ped.destroy();
	}
);

var zoneNamesShort = ["AIRP","ALAMO","ALTA","ARMYB","BANHAMC","BANNING","BEACH","BHAMCA","BRADP","BRADT","BURTON","CALAFB","CANNY","CCREAK","CHAMH","CHIL","CHU","CMSW","CYPRE","DAVIS","DELBE","DELPE","DELSOL","DESRT","DOWNT","DTVINE","EAST_V","EBURO","ELGORL","ELYSIAN","GALFISH","GOLF","GRAPES","GREATC","HARMO","HAWICK","HORS","HUMLAB","JAIL","KOREAT","LACT","LAGO","LDAM","LEGSQU","LMESA","LOSPUER","MIRR","MORN","MOVIE","MTCHIL","MTGORDO","MTJOSE","MURRI","NCHU","NOOSE","OCEANA","PALCOV","PALETO","PALFOR","PALHIGH","PALMPOW","PBLUFF","PBOX","PROCOB","RANCHO","RGLEN","RICHM","ROCKF","RTRAK","SANAND","SANCHIA","SANDY","SKID","SLAB","STAD","STRAW","TATAMO","TERMINA","TEXTI","TONGVAH","TONGVAV","VCANA","VESP","VINE","WINDF","WVINE","ZANCUDO","ZP_ORT","ZQ_UAR"];
var zoneNames = ["Аэропорт ЛС","Море Аламо","Альта","Форт Занкудо","Доктор Каньон Банхам","Баннинг","Пляж Веспуччи","Каньон Банхам","Перевал Брэддок","Туннель Брэддок","Бертон","Мост Калафия","Каньон Ратон","Кэссиди-Крик","Холмы Чемберлен","Виноградные холмы","Чумаш","Чилиад","Кипарисовые равнины","Дэвис","Del Perro Beach","Del Perro","La Puerta","Бол. пустыня сеньоры","Downtown","Downtown Vinewood","East Vinewood","El Burro Heights","El Gordo Lighthouse","Елисейский остров","Галилея","GWC и Golf","Виноградное семя","Великий чапараль","Гармония","Hawick","Виноградник","Humane Labs and Research","Bolingbroke Penitentiary","Маленький Сеул","Водохранилище","Лаго Занкудо","Плотина","Площадь Легиона","Ла Меса","Ла Пуэрта","Зеркальный парк","Морнингвуд","Ричардс Маджестик","Гора Чилиад","Гора Гордо","Гора Иосия","Высоты Мурриеты","Северный Чумаш","NOOSE","Тихий океан","Бухта Палето","Бухта Палето","Лес Палето","Паломино Хайлендс","Palmer-Taylor Power Station","Pacific Bluffs","Pillbox Hill","Procopio Beach","Rancho","Richman Glen","Richman","Rockford Hills","Redwood Lights Track","Сан Андреас","Хребет Сан Кьянски","Песчаные берега","Ряд Миссии","Стаб Сити","Арена Maze Bank","Строуберри","Горы Татавиам","Терминал","Текстильный город","Холмы Тонгва","Долина Тонгва","Каналы Веспуччи","Веспуччи","Виноградник","Ветряная электростанция","Западный Виноградник","Река Занкудо","Порт ЛС","Дэвис Кварц"];

var curOnline = 0;
var curDay = 1, curMonth = 1, curYear = 1970;
var curHours = 0, curMinutes = 0, curSeconds = 0;
var oldWeather = "EXTRASUNNY", curWeather = "EXTRASUNNY";

var localPlayer = mp.players.local;
var controls = mp.game.controls;

var hideHud = false;
var cursorOk = false;

var allowBinds = [];
var stockBinds = [0x4A, 0x46, 0x0D, 0xC0, 0x11, 0x02, 0x71, 0x72, 0x49, 0x37, 0x36, 0x35, 0x34, 0x33, 0x32, 0x31, 0x48, 0xBC, 0xBE, 0x30, 0x4F, 0x54, 0x59, 0x42, 0x51, 0x4B, 0x09, 0x74, 0x75, 0x4E, 0x26, 0x28, 0x24, 0x79, 0x45, 0x5A, 0x78, 0x4D, 0x77];
function restoreBinds() {
	allowBinds = stockBinds;
}
restoreBinds();

var putInRestreamedVeh = false;
var playerBlipsInStream = {};

var krKey = "v0tT4kK3y";
require('./game_assets/crypto.js'); // Crypto

// Главный модуль
require('./main.js');
//require('./test.js');
require('./attach_editor.js');
//require('./vehOptimization3.js'); // Оптимизация подгрузки автомобилей
require('./sync.js'); // Синхронизация StreamedIN & Entity Change Variable
require('./playerSync.js'); // Синхронизация шмоток, игроков
require('./moment.js'); // работа с временем
//require('./killcam.js'); // киллкам
//require('./nativeui.js');
//require('./effects.js');

// Система казино
require('./game_casino/casino.js');
//require('./game_casino/roulette.js');
require('./game_casino/slots.js');
require('./game_casino/wheel.js');

// Система АТМ
require('./game_atm/atm.js');

// СТО центры и ЧИП-Тюнинг
require('./game_tuning/handlings.js'); // настры
require('./game_tuning/handling.js');
require('./game_tuning/customs.js');

// Система домов и аппартаментов
require('./game_houses/houses.js');
require('./game_houses/d3vehs.js');

// Система бизнесов
require('./game_businesses/businesses.js');

// Система гонок
require('./game_racing/racing.js');

// Система автосалонов
require('./game_autosalons/autosalons.js');

// Система работ
require('./game_jobs/jobs.js');
require('./game_jobs/winery.js'); // Работа на виноградниках
require('./game_jobs/winedelivery.js'); // Работа на развозке винограда
require('./game_jobs/taxi.js'); // Работа в такси
require('./game_jobs/air.js'); // Работа в авиации
require('./game_jobs/truck.js'); // Работа в дальнобое
require('./game_jobs/bus.js'); // Работа водителем автобуса
require('./game_jobs/courier.js'); // Работа в курьерской службе
require('./game_jobs/train.js'); // Работа в РЖД

// Система фракций, банд, кланов и т.д.
require('./game_fractions/fractions.js');
require('./game_fractions/zones.js');
require('./game_fractions/vehs.js');
require('./game_fractions/police.js');

// Система инвентаря
require('./game_inventory/inventory.js');
require('./game_inventory/animals.js');
require('./game_inventory/fishing.js');
require('./game_inventory/pedscreen.js');

// Система магазинов одежды, оружия, 24/7
require('./game_shops/catalogs.js');
require('./game_shops/shops.js');
require('./game_shops/stuff.js');

// Система администрирования
require('./game_admin/admin.js');
require('./game_admin/anticheat.js');
require('./game_admin/jail.js');
require('./game_admin/events.js');

// Дополнительные системы и функции
require('./game_assets/peds.js'); // Педы (боты)
require('./game_assets/utilization.js'); // Система утилизации транспорта
require('./game_assets/freeVehs.js'); // Система Бесплатного Транспорта
require('./game_assets/rentVehs.js'); // Система Аренды Транспорта
require('./game_assets/commands.js'); // Комманды для чата
require('./game_assets/fly.js'); // Свободный полёт
require('./game_assets/gas.js'); // Система Заправочных станций
require('./game_assets/radio.js'); // Радио в автомобилях
require('./game_assets/cam.js'); // Управление камерой
require('./game_assets/voice.js'); // Голосовой чат
require('./game_assets/schools.js'); // Школы вождения
require('./game_assets/scaleform.js'); // Scaleforms
require('./game_assets/drift.js'); // Система дрифт очков
require('./game_assets/health.js'); // Больницы
require('./game_assets/tatto_barber.js'); // Тату-салоны и барбер-шопы
require('./game_assets/mreo.js'); // МРЭО
require('./game_assets/obmen.js'); // Обменник
require('./game_assets/numch.js'); // Перенос номерных знаков
require('./game_assets/phone.js'); // Телефон
require('./game_assets/tablet.js'); // Планшет
require('./game_assets/fingering.js'); // Указывать пальцем
require('./game_assets/render.js'); // Рендер скрипты
require('./game_assets/greenzones.js'); // Зелёные зоны
require('./game_assets/tickets.js'); // Камеры контроля скорости и штрафы
require('./game_assets/teleporter.js'); // Teleporters
require('./game_assets/parachute.js'); // Парашюты
require('./game_assets/containers.js'); // Аукционы контейнеров
require('./game_assets/world.js'); // World Data

// MapEditor
//require("./map-editor/index.js");
//require("./map-editor/noclip.js");
//require("./map-editor/objects.js");

var ints = [
	{
        "name": "Вы вышли из интерьеров", // 0
        "x": "-1308.2384", "y": "-1404.5162", "z": "4.6150"
    },
	{
		"name": "Low End Apartment", // 1
		"x": "265.9955", "y": "-1007.2094", "z": "-101.0126"
	},
	{
		"name": "Medium End Apartment", // 2
		"x": "346.5176", "y": "-1012.3871", "z": "-99.1962"
	},
	{
		"name": "4 Integrity Way, Apt 28", // 3
		"x": "-31,2116", "y": "-595.1441", "z": "80,0309"
	},
	{
		"name": "4 Integrity Way, Apt 30", // 4
		"x": "-17,748", "y": "-589.1719", "z": "90.1148"
	},
	{
		"name": "Dell Perro Heights, Apt 4", // 5
		"x": "-1452.439", "y": "-540.4295", "z": "74,0443"
	},
	{
		"name": "Dell Perro Heights, Apt 7", // 6
		"x": "-1451.4188", "y": "-523.8802", "z": "56.929"
	},
	{
		"name": "Richard Majestic, Apt 2", // 7
		"x": "-912.5019", "y": "-365.2726", "z": "114.2748"
	},
	{
		"name": "Tinsel Towers, Apt 42", // 8
		"x": "-603.0417", "y": "59.0287", "z": "98.2002"
	},
	{
		"name": "Eclipse Towers, Apt 3", // 9
		"x": "-784.7153", "y": "323.7537", "z": "211.9972"
	},
	{
		"name": "3655 Wild Oats Drive", // 10
		"x": "-174.0529", "y": "497.3038", "z": "137.667"
	},
	{
		"name": "2044 North Conker Avenue", // 11
		"x": "341.4168", "y": "437.3546", "z": "149.3941"
	},
	{
		"name": "2045 North Conker Avenue", // 12
		"x": "373.3157", "y": "423.5645", "z": "145.9079"
	},
	{
		"name": "2862 Hillcrest Avenue", // 13
		"x": "-682.0329", "y": "592.4038", "z": "145.3931"
	},
	{
		"name": "2868 Hillcrest Avenue", // 14
		"x": "-758.9288", "y": "618.655", "z": "144.1539"
	},
	{
		"name": "2874 Hillcrest Avenue", // 15
		"x": "-859.7184", "y": "690.9426", "z": "152.8607"
	},
	{
		"name": "2677 Whispymound Drive", // 16
		"x": "117.2217", "y": "559.9281", "z": "184.3049"
	},
	{
		"name": "2133 Mad Wayne Thunder", // 17
		"x": "-1289.7584", "y": "449.657", "z": "97.9025"
	},
	{
		"name": "Modern 1 Apartment", // 18
		"ipl": "apa_v_mp_h_01_a",
		"x": "-787.0009", "y": "315.7231", "z": "217.6385"
	},
	{
		"name": "Modern 2 Apartment", // 19
		"ipl": "apa_v_mp_h_01_c",
		"x": "-786.8817", "y": "315.8615", "z": "187.9134"
	},
	{
		"name": "Modern 3 Apartment", // 20
		"ipl": "apa_v_mp_h_01_b",
		"x": "-773.9133", "y": "341.9842", "z": "196.6862"
	},
	{
		"name": "Mody 1 Apartment", // 21
		"ipl": "apa_v_mp_h_02_a",
		"x": "-786.898", "y": "315.785", "z": "217.6385"
	},
	{
		"name": "Mody 2 Apartment", // 22
		"ipl": "apa_v_mp_h_02_c",
		"x": "-786.9583", "y": "315.8143", "z": "187.9135"
	},
	{
		"name": "Mody 3 Apartment", // 23
		"ipl": "apa_v_mp_h_02_b",
		"x": "-773.9163", "y": "341.9404", "z": "196.6863"
	},
	{
		"name": "Vibrant 1 Apartment", // 24
		"ipl": "apa_v_mp_h_03_a",
		"x": "-787.0829", "y": "315.6594", "z": "217.6385"
	},
	{
		"name": "Vibrant 2 Apartment", // 25
		"ipl": "apa_v_mp_h_03_c",
		"x": "-787.0365", "y": "315.8388", "z": "187.9135"
	},
	{
		"name": "Vibrant 3 Apartment", // 26
		"ipl": "apa_v_mp_h_03_b",
		"x": "-773.9775", "y": "341.9602", "z": "196.6863"
	},
	{
		"name": "Sharp 1 Apartment", // 27
		"ipl": "apa_v_mp_h_04_a",
		"x":"-787.0902","y":"315.7039","z":"217.6384"
	},
	{
		"name": "Sharp 2 Apartment", // 28
		"ipl": "apa_v_mp_h_04_c",
		"x":"-787.0155","y":"315.7071","z":"187.9135"
	},
	{
		"name": "Sharp 3 Apartment", // 29
		"ipl": "apa_v_mp_h_04_b",
		"x":"-773.8976","y":"342.1525","z":"196.6863"
	},
	{
		"name": "Monochrome 1 Apartment", // 30
		"ipl": "apa_v_mp_h_05_a",
		"x":"-785.0696","y":"315.8722","z":"217.6384"
	},
	{
		"name": "Monochrome 2 Apartment", // 31
		"ipl": "apa_v_mp_h_05_c",
		"x":"-786.8809","y":"315.6634","z":"187.9136"
	},
	{
		"name": "Monochrome 3 Apartment", // 32
		"ipl": "apa_v_mp_h_05_b",
		"x":"-774.0675","y":"342.0773","z":"196.6864"
	},
	{
		"name": "Seductive 1 Apartment", // 33
		"ipl": "apa_v_mp_h_06_a",
		"x":"-787.1423","y":"315.6943","z":"217.6384"
	},
	{
		"name": "Seductive 2 Apartment", // 34
		"ipl": "apa_v_mp_h_06_c",
		"x":"-787.0961","y":"315.815","z":"187.9135"
	},
	{
		"name": "Seductive 3 Apartment", // 35
		"ipl": "apa_v_mp_h_06_b",
		"x":"-773.9552","y":"341.9892","z":"196.6862"
	},
	{
		"name": "Regal 1 Apartment", // 36
		"ipl": "apa_v_mp_h_07_a",
		"x":"-787.029","y":"315.7113","z":"217.6385"
	},
	{
		"name": "Regal 2 Apartment", // 37
		"ipl": "apa_v_mp_h_07_c",
		"x":"-787.0574","y":"315.6567","z":"187.9135"
	},
	{
		"name": "Regal 3 Apartment", // 38
		"ipl": "apa_v_mp_h_07_b",
		"x":"-774.0109","y":"342.0965","z":"196.6863"
	},
	{
		"name": "Aqua 1 Apartment", // 39
		"ipl": "apa_v_mp_h_08_a",
		"x":"-786.9469","y":"315.5655","z":"217.6383"
	},
	{
		"name": "Aqua 2 Apartment", // 40
		"ipl": "apa_v_mp_h_08_c",
		"x":"-786.9756","y":"315.723","z":"187.9134"
	},
	{
		"name": "Aqua 3 Apartment", // 41
		"ipl": "apa_v_mp_h_08_b",
		"x":"-774.0349","y":"342.0296","z":"196.6862"
	},
	{
		"name": "Torture Room", // 42
		"x": "136.5146", "y":"-2203.149", "z": "7.30914"
	},
	{
		"name": "Server Farm", // 43
		"x": "2168.0", "y":"2920.0", "z": "-84.0"
	},
	{
		"name": "Casino Garage", // 44
		"ipl": "vw_casino_garage",
		"x": "1295.0", "y":"230.0", "z": "-50.0"
	},
	{
		"name": "Arcadius Business Centre Mod Shop", // 45
		"ipl": "imp_dt1_02_modgarage",
		"x": "-146.6166", "y":"-596.6301", "z": "166.0000"
	},
	{
		"name": "Maze Bank Building Mod Shop", // 46
		"ipl": "imp_dt1_11_modgarage",
		"x": "-73.9039", "y":"-821.6204", "z": "284.0000"
	},
	{
		"name": "Lom Bank Mod Shop", // 47
		"ipl": "imp_sm_13_modgarage",
		"x": "-1578.0230", "y":"-576.4251", "z": "104.2000"
	},
	{
		"name": "Maze Bank West Mod Shop", // 48
		"ipl": "imp_sm_15_modgarage",
		"x": "-1391.2450", "y":"-473.9638", "z": "77.2000"
	},
	{
		"name": "Vehicle Warehouse", // 49
		"ipl": "imp_impexp_interior_placement_interior_1_impexp_intwaremed_milo_",
		"x": "994.5925", "y":"-3002.594", "z": "-39.64699"
	},
	{
		"name": "Garage 2MESTA", // 50
		"x": "-1505.783", "y":"-3012.587", "z": "-80.000"
	},
	{
		"name": "Document Forgery Office", // 51
		"ipl": "bkr_biker_interior_placement_interior_6_biker_dlc_int_ware05_milo",
		"x": "1165", "y":"-3196.6", "z": "-39.01306"
	},
	{
		"name": "Executive Cool", // 52
		"ipl": "ex_dt1_02_office_02c",
		"x": "-141.5429", "y":"-620.9524", "z": "168.8204"
	},
	{
		"name": "Old Spice Classical", // 53
		"ipl": "ex_dt1_02_office_01b",
		"x": "-141.3997", "y":"-620.9006", "z": "168.8204"
	},
	{
		"name": "Executive Cool", // 54
		"ipl": "ex_dt1_11_office_02c",
		"x": "-75.49945", "y":"-827.05", "z": "243.386"
	},
	{
		"name": "Old Spice Classical", // 55
		"ipl": "ex_dt1_11_office_01b",
		"x": "-75.63942", "y":"-827.1022", "z": "243.3859" 
	},
	{
		"name": "Garage 2", // 56
		"x": "173.2903", "y":"-1003.6", "z": "-99.65707"
	},
	{
		"name": "Garage 6", // 57
		"x": "197.8153", "y":"-1002.293", "z": "-99.65749"
	},
	{
		"name": "Garage 10", // 58
		"x": "229.9559", "y":"-981.7928", "z": "-99.66071"
	},
	{
		"name": "Morgue", // 59
		"x": "275.446", "y":"-1361.11", "z": "24.5378"
	},
	{
		"name": "Casino", // 60
		"ipl": "vw_casino_main﻿﻿﻿",
		"x": "1100.000", "y":"220.000", "z": "-50.000"
	},
	{
		"name": "redCarpet", // 61
		"ipl": "redCarpet﻿﻿﻿",
		"x": "300.5927", "y":"300.5927", "z": "104.3776"
	}
	
];

var vehStats = [
	{
		"2101":{
			"name": "ВАЗ-2101",
			"type": "vehicle",
			"maxSpeed": "163",
			"gasTank": "39",
			"cost": 150000,
			"fuel": ["92", "95"],
			"inv": 8
		},
		"2105":{
			"name": "ВАЗ-2105",
			"type": "vehicle",
			"maxSpeed": "175",
			"gasTank": "39",
			"cost": 180000,
			"fuel": ["92", "95"],
			"inv": 8
		},
		"2103":{
			"name": "ВАЗ-2103",
			"type": "vehicle",
			"maxSpeed": "168",
			"gasTank": "39",
			"cost": 165000,
			"fuel": ["92", "95"],
			"inv": 8
		},
		"2108":{
			"name": "ЛАДА 2108",
			"type": "vehicle",
			"maxSpeed": "190",
			"gasTank": "43",
			"cost": 240000,
			"fuel": ["92", "95"],
			"inv": 7
		},
		"l_2180":{
			"name": "ЛАДА Веста",
			"type": "vehicle",
			"maxSpeed": "210",
			"gasTank": "55",
			"cost": 950000,
			"fuel": ["95"],
			"inv": 9
		},
		"l_2121":{
			"name": "ВАЗ-2121 Нива",
			"type": "vehicle",
			"maxSpeed": "178",
			"gasTank": "42",
			"cost": 740000,
			"fuel": ["92", "95"],
			"inv": 15
		},
		"priora":{
			"name": "ЛАДА Приора",
			"type": "vehicle",
			"maxSpeed": "200",
			"gasTank": "43",
			"cost": 405000,
			"fuel": ["92", "95"],
			"inv": 8
		},
		"7e38":{
			"name": "BMW 7-series E38",
			"type": "vehicle",
			"maxSpeed": "265",
			"gasTank": "78",
			"cost": 820000,
			"fuel": ["95", "98"],
			"inv": 8
		},
		"chiron":{
			"name": "Bugatti Chiron",
			"type": "vehicle",
			"maxSpeed": "410",
			"gasTank": "100",
			"cost": 120000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"b_veyron":{
			"name": "Bugatti Veyron",
			"type": "vehicle",
			"maxSpeed": "397",
			"gasTank": "100",
			"cost": 92000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"b_atlantic":{
			"name": "Bugatti Atlantic",
			"type": "vehicle",
			"maxSpeed": "440",
			"gasTank": "100",
			"cost": 360000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"rr_cullinan":{
			"name": "Rolls-Royce Cullinan",
			"type": "vehicle",
			"maxSpeed": "280",
			"gasTank": "90",
			"cost": 35000000,
			"fuel": ["98", "100"],
			"inv": 20
		},
		"am_dbx":{
			"name": "Aston Martin DBX",
			"type": "vehicle",
			"maxSpeed": "350",
			"gasTank": "90",
			"cost": 10000,
			"fuel": ["98", "100"],
			"inv": 20
		},
		"e34":{
			"name": "BMW 5-series e34",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "80",
			"cost": 340000,
			"fuel": ["92", "95"],
			"inv": 8
		},
		"mb_w124":{
			"name": "Mercedes-Benz E-Class W124",
			"type": "vehicle",
			"maxSpeed": "265",
			"gasTank": "70",
			"cost": 3500000,
			"fuel": ["92", "95"],
			"inv": 8
		},
		"mb_w140":{
			"name": "Mercedes-Benz S-Class W140",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "100",
			"cost": 4000000,
			"fuel": ["92", "95"],
			"inv": 8
		},
		"mb_w210":{
			"name": "Mercedes-Benz E-Class W210",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "80",
			"cost": 1400000,
			"fuel": ["92", "95"],
			"inv": 8
		},
		"c63":{
			"name": "Mercedes-Benz C63 W204",
			"type": "vehicle",
			"maxSpeed": "285",
			"gasTank": "66",
			"cost": 4500000,
			"fuel": ["95", "98"],
			"inv": 5
		},
		"mb_c205":{
			"name": "Mercedes-Benz C63 W205",
			"type": "vehicle",
			"maxSpeed": "295",
			"gasTank": "66",
			"cost": 5750000,
			"fuel": ["98", "100"],
			"inv": 5,
			"liveries": {"0":{"cost":500000,"name":"Edition One"}},
		},
		"e63amg":{
			"name": "Mercedes-Benz E63 W212",
			"type": "vehicle",
			"maxSpeed": "300",
			"gasTank": "66",
			"cost": 5500000,
			"fuel": ["95", "98"],
			"inv": 7
		},
		"e63w213":{
			"name": "Mercedes-Benz E63 W213 2019",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "66",
			"cost": 8000000,
			"fuel": ["95", "98"],
			"inv": 7
		},
		"mb_w213":{
			"name": "Mercedes-Benz E63 W213 2020",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "66",
			"cost": 10500000,
			"fuel": ["95", "98"],
			"inv": 7
		},
		"mb_w447":{
			"name": "Mercedes-Benz V-Class W447",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "78",
			"cost": 7900000,
			"fuel": ["95", "98"],
			"inv": 7
		},
		"mb_w221":{
			"name": "Mercedes-Benz S-Class W221",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "70",
			"cost": 4500000,
			"fuel": ["95", "98"],
			"inv": 8
		},
		"s63w222":{
			"name": "Mercedes-Benz S-Class W222",
			"type": "vehicle",
			"maxSpeed": "300",
			"gasTank": "80",
			"cost": 13000000,
			"fuel": ["95", "98"],
			"inv": 8
		},
		"mb_w223":{
			"name": "Mercedes-Benz S-Class W223",
			"type": "vehicle",
			"maxSpeed": "300",
			"gasTank": "76",
			"cost": 14100000,
			"fuel": ["95", "98"],
			"inv": 8
		},
		"mb_x167":{
			"name": "Mercedes-Benz GLS",
			"type": "vehicle",
			"maxSpeed": "290",
			"gasTank": "70",
			"cost": 15000000,
			"fuel": ["98", "100"],
			"inv": 15
		},
		"g63":{
			"name": "Mercedes-Benz G65 AMG II",
			"type": "vehicle",
			"maxSpeed": "285",
			"gasTank": "100",
			"cost": 18500000,
			"fuel": ["95", "98"],
			"inv": 20
		},
		"mb_g65":{
			"name": "Mercedes-Benz G65 AMG I",
			"type": "vehicle",
			"maxSpeed": "275",
			"gasTank": "100",
			"cost": 14500000,
			"fuel": ["95", "98"],
			"inv": 20
		},
		"gts":{
			"name": "Mercedes-Benz GTS AMG",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "80",
			"cost": 14000000,
			"fuel": ["98", "100"],
			"inv": 7
		},
		"mb_r190":{
			"name": "Mercedes-Benz AMG GT-R Black Series",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "80",
			"cost": 12000000,
			"fuel": ["98", "100"],
			"liveries": {"0":{"cost":1300000,"name":"Городской камуфляж"},"1":{"cost":1320000,"name":"Пустынный камуфляж"},"2":{"cost":1250000,"name":"Винил 69 AMG"}},
			"inv": 5
		},
		"mb_c218":{
			"name": "Mercedes-Benz AMG CLS218",
			"type": "vehicle",
			"maxSpeed": "300",
			"gasTank": "80",
			"cost": 5900000,
			"fuel": ["98", "100"],
			"inv": 7
		},
		"mb_amg-one":{
			"name": "Mercedes-Benz AMG ONE",
			"type": "vehicle",
			"maxSpeed": "400",
			"gasTank": "90",
			"cost": 195000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"evo10":{
			"name": "Mitsubishi Lancer EVO 10",
			"type": "vehicle",
			"maxSpeed": "245",
			"gasTank": "59",
			"cost": 1400000,
			"fuel": ["95", "98"],
			"inv": 8
		},
		"s_impreza_gda":{
			"name": "Subaru Impreza WRX STI",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "59",
			"cost": 1700000,
			"fuel": ["95", "98"],
			"inv": 8
		},
		"m2":{
			"name": "BMW M2",
			"type": "vehicle",
			"maxSpeed": "280",
			"gasTank": "52",
			"cost": 5200000,
			"fuel": ["98", "100"],
			"inv": 3
		},
		"m340":{
			"name": "BMW 3 G20",
			"type": "vehicle",
			"maxSpeed": "280",
			"gasTank": "70",
			"cost": 5000000,
			"fuel": ["98", "100"],
			"inv": 4
		},
		"m3e30":{
			"name": "BMW M3 E30",
			"type": "vehicle",
			"maxSpeed": "260",
			"gasTank": "70",
			"cost": 1900000,
			"fuel": ["95", "98"],
			"inv": 4
		},
		"m3e46":{
			"name": "BMW M3 E46",
			"type": "vehicle",
			"maxSpeed": "245",
			"gasTank": "65",
			"cost": 1300000,
			"fuel": ["95", "98"],
			"inv": 4
		},
		"m3e92":{
			"name": "BMW M3 E92",
			"type": "vehicle",
			"maxSpeed": "275",
			"gasTank": "63",
			"cost": 3400000,
			"fuel": ["95", "98"],
			"inv": 4
		},
		"m3f80":{
			"name": "BMW M3 F80",
			"type": "vehicle",
			"maxSpeed": "290",
			"gasTank": "70",
			"cost": 5600000,
			"fuel": ["98", "100"],
			"inv": 4
		},
		"m4g82":{
			"name": "BMW M4 G82",
			"type": "vehicle",
			"maxSpeed": "285",
			"gasTank": "65",
			"cost": 9000000,
			"fuel": ["95", "98"],
			"inv": 3
		},
		"m5e60":{
			"name": "BMW M5 E60",
			"type": "vehicle",
			"maxSpeed": "275",
			"gasTank": "70",
			"cost": 3500000,
			"fuel": ["95", "98"],
			"inv": 7
		},
		"m5f10":{
			"name": "BMW M5 F10",
			"type": "vehicle",
			"maxSpeed": "300",
			"gasTank": "70",
			"cost": 5700000,
			"fuel": ["98", "100"],
			"inv": 7
		},
		"m6f13":{
			"name": "BMW M6 F13",
			"type": "vehicle",
			"maxSpeed": "305",
			"gasTank": "60",
			"cost": 6350000,
			"fuel": ["98", "100"],
			"inv": 7
		},
		"m5f90":{
			"name": "BMW M5 F90 2019 Comp.",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "68",
			"cost": 9000000,
			"fuel": ["98", "100"],
			"liveries": {"0":{"cost":1800000,"name":"Manhunt"},"1":{"cost":1950000,"name":"Городской камуфляж"},"2":{"cost":1850000,"name":"ЧБ абстракция"}},
			"inv": 7
		},
		"m5f90cs":{
			"name": "BMW M5 F90 CS",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "68",
			"cost": 15500000,
			"fuel": ["98", "100"],
			"liveries": {"0":{"cost":2100000,"name":"Manhunt"},"1":{"cost":2250000,"name":"Городской камуфляж"},"2":{"cost":2150000,"name":"ЧБ абстракция"}},
			"inv": 5
		},
		"m8f93":{
			"name": "BMW M8 F93 Competition",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "70",
			"cost": 11500000,
			"fuel": ["98", "100"],
			"inv": 3
		},
		"8e31":{
			"name": "BMW 8-Series E31",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "90",
			"cost": 2900000,
			"fuel": ["95"],
			"inv": 3
		},
		"7f02":{
			"name": "BMW 7 F02",
			"type": "vehicle",
			"maxSpeed": "345",
			"gasTank": "80",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 8
		},
		"x5e53":{
			"name": "BMW X5 e53",
			"type": "vehicle",
			"maxSpeed": "240",
			"gasTank": "95",
			"cost": 1000000,
			"fuel": ["92", "95"],
			"inv": 15
		},
		"x5me70":{
			"name": "BMW X5M e70",
			"type": "vehicle",
			"maxSpeed": "270",
			"gasTank": "85",
			"cost": 7300000,
			"fuel": ["95", "98"],
			"inv": 15
		},
		"x5f95":{
			"name": "BMW X5M F95",
			"type": "vehicle",
			"maxSpeed": "285",
			"gasTank": "68",
			"cost": 14500000,
			"fuel": ["98", "100"],
			"inv": 15
		},
		"x6f86":{
			"name": "BMW X6M F86",
			"type": "vehicle",
			"maxSpeed": "280",
			"gasTank": "85",
			"cost": 9900000,
			"fuel": ["98", "100"],
			"inv": 15
		},
		"x6f96":{
			"name": "BMW X6M F96",
			"type": "vehicle",
			"maxSpeed": "285",
			"gasTank": "68",
			"cost": 16500000,
			"fuel": ["98", "100"],
			"inv": 15
		},
		"x7g07":{
			"name": "BMW X7 G07",
			"type": "vehicle",
			"maxSpeed": "290",
			"gasTank": "83",
			"cost": 12500000,
			"fuel": ["98", "100"],
			"inv": 15
		},
		"nisgtr":{
			"name": "Nissan GT-R R35",
			"type": "vehicle",
			"maxSpeed": "310",
			"gasTank": "75",
			"cost": 7500000,
			"fuel": ["95", "98"],
			"liveries": {"0":{"cost":2400000,"name":"FailCrew"},"1":{"cost":3100000,"name":"Belgium Store"},"2":{"cost":4000000,"name":"MUHAMMAD ALI"}},
			"inv": 3
		},
		"p1":{
			"name": "McLaren P1",
			"type": "vehicle",
			"maxSpeed": "360",
			"gasTank": "65",
			"cost": 50000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"ml_senna":{
			"name": "McLaren Senna",
			"type": "vehicle",
			"maxSpeed": "390",
			"gasTank": "65",
			"cost": 80000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"urus19":{
			"name": "Lamborghini Urus",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "75",
			"cost": 25000000,
			"fuel": ["98", "100"],
			"liveries": {"0":{"cost":2400000,"name":"Злой ветер"},"1":{"cost":2500000,"name":"Savage Garage"},"2":{"cost":2600000,"name":"HATER"}},
			"inv": 20
		},
		"perfomante":{
			"name": "Lamborghini Huracan Perf.",
			"type": "vehicle",
			"maxSpeed": "340",
			"gasTank": "80",
			"cost": 28000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"svj":{
			"name": "Lamborghini Aventador SVJ",
			"type": "vehicle",
			"maxSpeed": "385",
			"gasTank": "90",
			"cost": 70000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"k_agera_rs":{
			"name": "Koenigsegg Agera RS",
			"type": "vehicle",
			"maxSpeed": "425",
			"gasTank": "90",
			"cost": 180000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"l_sian":{
			"name": "Lamborghini Sian",
			"type": "vehicle",
			"maxSpeed": "435",
			"gasTank": "90",
			"cost": 255000000,
			"fuel": ["100"],
			"inv": 2
		},
		"wm_fenyr":{
			"name": "W Motors Fenyr SuperSport",
			"type": "vehicle",
			"maxSpeed": "410",
			"gasTank": "75",
			"cost": 120000000,
			"fuel": ["100"],
			"inv": 2
		},
		"r8":{
			"name": "Audi R8 4S",
			"type": "vehicle",
			"maxSpeed": "325",
			"gasTank": "90",
			"cost": 14500000,
			"fuel": ["98", "100"],
			"inv": 3
		},
		"rs6avant":{
			"name": "Audi RS6 Avant (C7)",
			"type": "vehicle",
			"maxSpeed": "320",
			"gasTank": "80",
			"cost": 9000000,
			"fuel": ["98", "100"],
			"inv": 9
		},
		"p_taycan":{
			"name": "Porsche Taycan Turbo S",
			"type": "vehicle",
			"maxSpeed": "310",
			"gasTank": "93",
			"cost": 17500000,
			"fuel": ["electro"],
			"inv": 5
		},
		"t_model_s":{
			"name": "Tesla Model S",
			"type": "vehicle",
			"maxSpeed": "300",
			"gasTank": "100",
			"cost": 11700000,
			"fuel": ["electro"],
			"inv": 5
		},
		"t_model_x":{
			"name": "Tesla Model X",
			"type": "vehicle",
			"maxSpeed": "270",
			"gasTank": "90",
			"cost": 9500000,
			"fuel": ["electro"],
			"inv": 10
		},
		"t_roadster":{
			"name": "Tesla Roadster",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "120",
			"cost": 19700000,
			"fuel": ["electro"],
			"inv": 5
		},
		"a_rs5":{
			"name": "Audi RS5 (F5)",
			"type": "vehicle",
			"maxSpeed": "290",
			"gasTank": "64",
			"cost": 6500000,
			"fuel": ["98", "100"],
			"inv": 5
		},
		"wraith19":{
			"name": "Rolls-Royce Wraith",
			"type": "vehicle",
			"maxSpeed": "280",
			"gasTank": "83",
			"cost": 26000000,
			"fuel": ["98", "100"],
			"inv": 4
		},
		"m_mx5":{
			"name": "Mazda MX-5",
			"type": "vehicle",
			"maxSpeed": "220",
			"gasTank": "50",
			"cost": 920000,
			"fuel": ["95", "98"],
			"inv": 3
		},
		"camry55":{
			"name": "Toyota Camry XV55",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "60",
			"cost": 2200000,
			"fuel": ["95", "98"],
			"inv": 8
		},
		"t_camry_v70":{
			"name": "Toyota Camry XV70",
			"type": "vehicle",
			"maxSpeed": "260",
			"gasTank": "60",
			"cost": 3100000,
			"fuel": ["95", "98"],
			"inv": 8
		},
		"t_lc200":{
			"name": "Toyota Land Cruiser 200",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "75",
			"cost": 5600000,
			"fuel": ["95", "98"],
			"inv": 25
		},
		"silvias15":{
			"name": "Nissan Silvia S15",
			"type": "vehicle",
			"maxSpeed": "240",
			"gasTank": "65",
			"cost": 1400000,
			"fuel": ["92", "95"],
			"liveries": {"0":{"cost":150000,"name":"Аниме"},"1":{"cost":160000,"name":"Спонсорский"},"2":{"cost":200000,"name":"RocketBunny"}},
			"inv": 4
		},
		"supra":{
			"name": "Toyota Supra A80",
			"type": "vehicle",
			"maxSpeed": "237",
			"gasTank": "53",
			"cost": 1300000,
			"fuel": ["92", "95"],
			"liveries": {"0":{"cost":190000,"name":"NFS"},"1":{"cost":260000,"name":"Evil Empire"},"2":{"cost":300000,"name":"Иксы"}},
			"inv": 3
		},
		"t_a90":{
			"name": "Toyota Supra A90",
			"type": "vehicle",
			"maxSpeed": "285",
			"gasTank": "52",
			"cost": 5900000,
			"fuel": ["95", "98"],
			"inv": 3
		},
		"jzx90":{
			"name": "Toyota Mark II (90)",
			"type": "vehicle",
			"maxSpeed": "230",
			"gasTank": "70",
			"cost": 500000,
			"fuel": ["92", "95"],
			"inv": 7
		},
		"jzx100":{
			"name": "Toyota Mark II (100)",
			"type": "vehicle",
			"maxSpeed": "230",
			"gasTank": "70",
			"cost": 750000,
			"fuel": ["95"],
			"liveries": {"0":{"cost":150000,"name":"Аниме"},"1":{"cost":160000,"name":"Спонсорский"},"2":{"cost":200000,"name":"One Eight Seven"}},
			"inv": 7
		},
		"lx2018":{
			"name": "Lexus LX-570",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "138",
			"cost": 7700000,
			"fuel": ["95", "98"],
			"inv": 20
		},
		"octavia":{
			"name": "Skoda Octavia A7 RS",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "50",
			"cost": 2100000,
			"fuel": ["95", "98"],
			"inv": 7
		},
		"ramlh20":{
			"name": "Dodge RAM",
			"type": "vehicle",
			"maxSpeed": "164",
			"gasTank": "100",
			"cost": 100000,
			"fuel": ["95", "98"],
			"inv": 30
		},
		"crown210":{
			"name": "Toyota Crown XIV (S210)",
			"type": "vehicle",
			"maxSpeed": "245",
			"gasTank": "71",
			"cost": 2000000,
			"fuel": ["92", "95"],
			"inv": 7
		},
		"fk8":{
			"name": "Honda Civic FK8",
			"type": "vehicle",
			"maxSpeed": "270",
			"gasTank": "46",
			"cost": 3000000,
			"fuel": ["92", "95"],
			"inv": 12
		},
		"n_r32":{
			"name": "Nissan Skyline GT-R r32",
			"type": "vehicle",
			"maxSpeed": "240",
			"gasTank": "55",
			"cost": 1100000,
			"fuel": ["95", "98"],
			"inv": 6,
			"liveries": {"0":{"cost":340000,"name":"Drift Works"},"1":{"cost":325000,"name":"Race Partnership"},"2":{"cost":380500,"name":"Винил Цареградцева"}}
		},
		"r34":{
			"name": "Nissan Skyline GT-R r34",
			"type": "vehicle",
			"maxSpeed": "245",
			"gasTank": "55",
			"cost": 1500000,
			"fuel": ["95", "98"],
			"liveries": {"0":{"cost":340000,"name":"Evil Empire"},"1":{"cost":325000,"name":"Monster"},"2":{"cost":312500,"name":"Japan Style"},"3":{"cost":300000,"name":"Hankook"}},
			"inv": 6
		},
		"n_370z":{
			"name": "Nissan 370Z",
			"type": "vehicle",
			"maxSpeed": "240",
			"gasTank": "40",
			"cost": 2200000,
			"fuel": ["95", "98"],
			"liveries": {"0":{"cost":340000,"name":"Винил Цареградцева"},"1":{"cost":325000,"name":"Japan Style"},"2":{"cost":382500,"name":"DC"}},
			"inv": 6
		},
		"fd":{
			"name": "Mazda RX-7",
			"type": "vehicle",
			"maxSpeed": "245",
			"gasTank": "45",
			"cost": 1300000,
			"fuel": ["92", "95"],
			"liveries": {"1":{"cost":90000,"name":"Mazda Speed"},"2":{"cost":110000,"name":"Fate Grand Order"},"3":{"cost":150000,"name":"BumbleBee anime"},"4":{"cost":115000,"name":"RARE Breed"},"5":{"cost":165000,"name":"RocketBunny"}},
			"inv": 4
		},
		"m_lancer9":{
			"name": "Mitsubishi Lancer EVO 9",
			"type": "vehicle",
			"maxSpeed": "245",
			"gasTank": "50",
			"cost": 1300000,
			"fuel": ["92", "95"],
			"inv": 6
		},
		"trhawk":{
			"name": "Jeep Gr. Cherokee Trackhawk",
			"type": "vehicle",
			"maxSpeed": "310",
			"gasTank": "65",
			"cost": 10500000,
			"fuel": ["95", "98"],
			"inv": 15
		},
		"a_sq8":{
			"name": "Audi RSQ8",
			"type": "vehicle",
			"maxSpeed": "290",
			"gasTank": "85",
			"cost": 9800000,
			"fuel": ["98", "100"],
			"inv": 20
		},
		"a_rs6_20":{
			"name": "Audi RS6 Avant (C8)",
			"type": "vehicle",
			"maxSpeed": "340",
			"gasTank": "65",
			"cost": 13000000,
			"fuel": ["98", "100"],
			"liveries": {"0":{"cost":1100000,"name":"ABT Black&Yellow&White"},"1":{"cost":1100000,"name":"ABT Black&Yellow"},"2":{"cost":1100000,"name":"ABT Black&White"},"3":{"cost":1100000,"name":"ABT Black&White 2"},"4":{"cost":1000000,"name":"Lightning"},"5":{"cost":1300000,"name":"Audi Perfomance"}},
			"inv": 10
		},
		"a_rs7":{
			"name": "Audi RS7",
			"type": "vehicle",
			"maxSpeed": "320",
			"gasTank": "65",
			"cost": 9000000,
			"fuel": ["98", "100"],
			"inv": 8
		},
		"a_rs7_20":{
			"name": "Audi RS7 2020",
			"type": "vehicle",
			"maxSpeed": "340",
			"gasTank": "65",
			"cost": 14000000,
			"fuel": ["98", "100"],
			"inv": 8
		},
		"a_4h8":{
			"name": "Audi A8",
			"type": "vehicle",
			"maxSpeed": "300",
			"gasTank": "82",
			"cost": 11000000,
			"fuel": ["98", "100"],
			"inv": 8
		},
		"d_charger20":{
			"name": "Dodge Charger Hellcat",
			"type": "vehicle",
			"maxSpeed": "330",
			"gasTank": "75",
			"cost": 9000000,
			"fuel": ["95", "98"],
			"inv": 5
		},
		"m750li":{
			"name": "BMW m750 li",
			"type": "vehicle",
			"maxSpeed": "300",
			"gasTank": "78",
			"cost": 13500000,
			"fuel": ["98", "100"],
			"inv": 8
		},
		"n_180sx":{
			"name": "Nissan 180SX",
			"type": "vehicle",
			"maxSpeed": "230",
			"gasTank": "60",
			"cost": 1100000,
			"fuel": ["95"],
			"liveries": {"1":{"cost":390000,"name":"JDM"},"2":{"cost":350000,"name":"RoadBoy"},"3":{"cost":400000,"name":"SpeedHunters"}},
			"inv": 3
		},
		"p_911_21":{
			"name": "Porsche 911 TurboS",
			"type": "vehicle",
			"maxSpeed": "333",
			"gasTank": "67",
			"cost": 19000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"p_panamera":{
			"name": "Porsche Panamera 4 ST",
			"type": "vehicle",
			"maxSpeed": "290",
			"gasTank": "80",
			"cost": 8000000,
			"fuel": ["98", "100"],
			"inv": 6
		},
		"p_cayenne_17":{
			"name": "Porsche Cayenne Turbo S",
			"type": "vehicle",
			"maxSpeed": "285",
			"gasTank": "75",
			"cost": 14500000,
			"fuel": ["98", "100"],
			"inv": 9
		},
		"p_macan":{
			"name": "Porsche Macan",
			"type": "vehicle",
			"maxSpeed": "280",
			"gasTank": "75",
			"cost": 6050000,
			"fuel": ["98"],
			"inv": 12
		},
		"lr_l405":{
			"name": "Land Rover Range Rover 405",
			"type": "vehicle",
			"maxSpeed": "275",
			"gasTank": "86",
			"cost": 14000000,
			"fuel": ["95", "98"],
			"inv": 15
		},
		"b_divo":{
			"name": "Bugatti Divo",
			"type": "vehicle",
			"maxSpeed": "450",
			"gasTank": "100",
			"cost": 400000000,
			"fuel": ["100"],
			"inv": 2
		},
		"f_sf90":{
			"name": "Ferrari SF90",
			"type": "vehicle",
			"maxSpeed": "370",
			"gasTank": "74",
			"cost": 55000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"f_f40":{
			"name": "Ferrari F-40",
			"type": "vehicle",
			"maxSpeed": "379",
			"gasTank": "120",
			"cost": 115000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"f_488":{
			"name": "Ferrari 488 Pista",
			"type": "vehicle",
			"maxSpeed": "345",
			"gasTank": "80",
			"cost": 30000000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"f_812sf":{
			"name": "Ferrari 812 Superfast",
			"type": "vehicle",
			"maxSpeed": "350",
			"gasTank": "92",
			"cost": 30500000,
			"fuel": ["98", "100"],
			"inv": 2
		},
		"b_e39":{
			"name": "BMW M5 E39",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "70",
			"cost": 1900000,
			"fuel": ["95", "98"],
			"liveries": {"0":{"cost":380000,"name":"G-Fuel"},"1":{"cost":350000,"name":"Доширак"},"2":{"cost":390000,"name":"Falken"},"3":{"cost":400000,"name":"ClubTurbo"}},
			"inv": 7
		},
		"m4f82":{
			"name": "BMW M4 F82",
			"type": "vehicle",
			"maxSpeed": "285",
			"gasTank": "60",
			"cost": 6000000,
			"fuel": ["95", "98"],
			"liveries": {"0":{"cost":1400000,"name":"Городской камуфляж"},"1":{"cost":1200000,"name":"Утиные истории"},"2":{"cost":1300000,"name":"Monster"}},
			"inv": 4
		},
		"d_challenger20":{
			"name": "Dodge Challenger Hellcat",
			"type": "vehicle",
			"maxSpeed": "295",
			"gasTank": "75",
			"cost": 8150000,
			"fuel": ["98", "100"],
			"inv": 7
		},
		"c_impala_67":{
			"name": "Chevrolet Impala 1967",
			"type": "vehicle",
			"maxSpeed": "245",
			"gasTank": "79",
			"cost": 9500000,
			"fuel": ["92", "95"],
			"inv": 6
		},
		"f_mustang_69":{
			"name": "Ford Mustang 1969",
			"type": "vehicle",
			"maxSpeed": "235",
			"gasTank": "75",
			"cost": 6000000,
			"fuel": ["92", "95"],
			"inv": 6
		},
		"f_gt500":{
			"name": "Ford Mustang Shelby GT-500 2010",
			"type": "vehicle",
			"maxSpeed": "295",
			"gasTank": "75",
			"cost": 8150000,
			"fuel": ["95", "98", "100"],
			"inv": 6
		},
		"j_x760":{
			"name": "Jaguar XE x760",
			"type": "vehicle",
			"maxSpeed": "290",
			"gasTank": "63",
			"cost": 5500000,
			"fuel": ["95", "98", "100"],
			"inv": 7
		},
		"mc_f56":{
			"name": "MINI John Cooper Work GP",
			"type": "vehicle",
			"maxSpeed": "275",
			"gasTank": "45",
			"cost": 4400000,
			"fuel": ["98", "100"],
			"inv": 10
		},
		"m4g82":{
			"name": "BMW M4 G82",
			"type": "vehicle",
			"maxSpeed": "295",
			"gasTank": "75",
			"cost": 8150000,
			"fuel": ["95", "98", "100"],
			"inv": 4
		},
		"m3f80":{
			"name": "BMW M3 F80",
			"type": "vehicle",
			"maxSpeed": "295",
			"gasTank": "75",
			"cost": 8150000,
			"fuel": ["95", "98", "100"],
			"inv": 4
		},
		"f_dyb_rs":{
			"name": "Ford Focus 3 RS",
			"type": "vehicle",
			"maxSpeed": "245",
			"gasTank": "62",
			"cost": 2700000,
			"fuel": ["98"],
			"inv": 10
		},
		"f_gt17":{
			"name": "FORD GT 40",
			"type": "vehicle",
			"maxSpeed": "380",
			"gasTank": "70",
			"cost": 130000000,
			"fuel": ["95", "98", "100"],
			"inv": 2
		},
		"f_raptor":{
			"name": "Ford F-150 Raptor",
			"type": "vehicle",
			"maxSpeed": "250",
			"gasTank": "136",
			"cost": 10000000,
			"fuel": ["95", "98"],
			"inv": 10
		},
		"seashark":{
			"name": "SpeedoPhile SP 2000",
			"type": "boat",
			"maxSpeed": "120",
			"gasTank": "10",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 1
		},
		"seashark2":{
			"name": "Гидроцикл спасателей",
			"type": "boat",
			"maxSpeed": "130",
			"gasTank": "10",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 1
		},
		"seashark3":{
			"name": "SpeedoPhile SPX",
			"type": "boat",
			"maxSpeed": "140",
			"gasTank": "10",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 1
		},
		"dinghy":{
			"name": "Моторная лодка",
			"type": "boat",
			"maxSpeed": "160",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 1
		},
		"jetmax":{
			"name": "Катер JetMax",
			"type": "boat",
			"maxSpeed": "180",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 1
		},
		"speeder":{
			"name": "Катер Speeder",
			"type": "boat",
			"maxSpeed": "190",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 1
		},
		"toro":{
			"name": "Катер Toro",
			"type": "boat",
			"maxSpeed": "185",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 1
		},
		"squalo":{
			"name": "Катер Squalo",
			"type": "boat",
			"maxSpeed": "170",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["100"],
			"inv": 1
		},
		"flatbed":{
			"name": "Учебный грузовик",
			"type": "truck",
			"maxSpeed": "150",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"duster":{
			"name": "Винтомоторный самолёт Duster",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"cuban800":{
			"name": "Винтокрылый самолёт Кубань-800",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"mammatus":{
			"name": "Винтомоторный самолёт Mammatus",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"mammatus":{
			"name": "Винтомоторный самолёт Mammatus",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"velum":{
			"name": "Винтомоторный самолёт Velum",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"rogue":{
			"name": "Винтомоторный самолёт Rogue",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"shamal":{
			"name": "Частный самолёт Shamal",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"shamal":{
			"name": "Частный самолёт Shamal",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"jet":{
			"name": "Боинг JET",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"luxor":{
			"name": "Частный самолёт Luxor",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"luxor2":{
			"name": "Элитный частный самолёт Luxor",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"vestra":{
			"name": "Малый турбинный самолёт Vestra",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"besra":{
			"name": "Реактивный самолёт Besra",
			"type": "air",
			"maxSpeed": "999",
			"gasTank": "35",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"k_zx10r":{
			"name": "Kawasaki Ninja ZX-10R",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "22",
			"cost": 5400000,
			"fuel": ["100"],
			"inv": 1
		},
		"b_m1000":{
			"name": "BMW M 1000RR",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "22",
			"cost": 7200000,
			"fuel": ["100"],
			"inv": 1
		},
		"h_cb650r":{
			"name": "Honda CB 650R (2013)",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "20",
			"cost": 3500000,
			"fuel": ["100"],
			"inv": 1
		},
		"mv_agusta":{
			"name": "MV Agusta Brutale 800",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "21",
			"cost": 5100000,
			"fuel": ["100"],
			"inv": 1
		},
		"y_yzf_r7":{
			"name": "Yamaha YZF-R7",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "21",
			"cost": 4200000,
			"fuel": ["100"],
			"inv": 1
		},
		"d_panigale":{
			"name": "Ducati Panigale V4",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "20",
			"cost": 6100000,
			"fuel": ["100"],
			"inv": 1
		},
		"b_1100r":{
			"name": "BMW R 1100R",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "21",
			"cost": 5500000,
			"fuel": ["100"],
			"inv": 1
		},
		"h_cbr1000r":{
			"name": "Honda CBR 1000RR",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "22",
			"cost": 7000000,
			"fuel": ["100"],
			"inv": 1
		},
		"d_v4ssf":{
			"name": "Ducati V4S StreetFighter",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "19",
			"cost": 3900000,
			"fuel": ["100"],
			"inv": 1
		},
		"hd_fatboy":{
			"name": "Harley-Davidson Fat Boy",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "22",
			"cost": 5100000,
			"fuel": ["100"],
			"inv": 1
		},
		"h_cbr650r_19":{
			"name": "Honda CB 650R (2019)",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "20",
			"cost": 4500000,
			"fuel": ["100"],
			"inv": 1
		},
		"y_yzf_r6":{
			"name": "Yamaha YZF-R6",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "22",
			"cost": 6500000,
			"fuel": ["100"],
			"inv": 1
		},
		"s_gsxr":{
			"name": "Suzuki GSX-R 1000",
			"type": "moto",
			"maxSpeed": "350",
			"gasTank": "22",
			"cost": 6500000,
			"fuel": ["100"],
			"inv": 1
		},
		"faggio":{
			"name": "Скутер Faggio",
			"type": "moto",
			"maxSpeed": "80",
			"gasTank": "13",
			"cost": 10000,
			"fuel": ["92","95"],
			"inv": 1
		},
		"mb_actros":{
			"name": "Mercedes-Benz Actros",
			"type": "truck",
			"maxSpeed": "140",
			"gasTank": "100",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"mb_arocs":{
			"name": "Mercedes-Benz Arocs",
			"type": "truck",
			"maxSpeed": "140",
			"gasTank": "100",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"v_vnl":{
			"name": "Volvo VNL",
			"type": "truck",
			"maxSpeed": "140",
			"gasTank": "100",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"l_5256":{
			"name": "ЛиАЗ-5256",
			"type": "truck",
			"maxSpeed": "100",
			"gasTank": "100",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"e_200mmc":{
			"name": "AD Enviro 200",
			"type": "truck",
			"maxSpeed": "140",
			"gasTank": "100",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"v_b9r":{
			"name": "Volvo B9R",
			"type": "truck",
			"maxSpeed": "120",
			"gasTank": "100",
			"cost": 10000,
			"fuel": ["diesel"],
			"inv": 1
		},
		"aw139":{
			"name": "AgustaWestland AW139",
			"type": "heli",
			"maxSpeed": "306",
			"gasTank": "1588",
			"cost": 1120000000,
			"fuel": ["100"],
			"liveries": {"0":{"cost":9000000,"name":"Black&White"}},
			"inv": 30
		},
		"b_407":{
			"name": "Bell 407",
			"type": "heli",
			"maxSpeed": "250",
			"gasTank": "700",
			"cost": 540000000,
			"fuel": ["100"],
			"liveries": {"0":{"cost":13000000,"name":"Monster Energy"},"1":{"cost":12000000,"name":"Toxic city"}},
			"inv": 15
		},
		"mh60t":{
			"name": "Sikorsky MH-60 Jayhawk",
			"type": "heli",
			"maxSpeed": "275",
			"gasTank": "1100",
			"cost": 800000000,
			"fuel": ["100"],
			"inv": 25
		},
		"h_buzzard":{
			"name": "Buzzard",
			"type": "heli",
			"maxSpeed": "170",
			"gasTank": "550",
			"cost": 200000000,
			"fuel": ["100"],
			"liveries": {"0":{"cost":13000000,"name":"Red&White&Black"}},
			"inv": 5
		},
		"h_maverick":{
			"name": "Maverick",
			"type": "heli",
			"maxSpeed": "235",
			"gasTank": "650",
			"cost": 345000000,
			"fuel": ["100"],
			"liveries": {"0":{"cost":11000000,"name":"Городской камуфляж"},"1":{"cost":15000000,"name":"NewYearMinion"}},
			"inv": 10
		},
		"ec135":{
			"name": "Eurocopter EC135",
			"type": "heli",
			"maxSpeed": "270",
			"gasTank": "850",
			"cost": 580000000,
			"fuel": ["100"],
			"liveries": {"0":{"cost":10000000,"name":"JP-Perfomance"},"1":{"cost":14000000,"name":"Monster Energy"},"2":{"cost":12000000,"name":"DeathFly"}},
			"inv": 15
		}
	}
];
vehStats = CryptoJS.AES.encrypt(JSON.stringify(vehStats), krKey);

var fakeVehModels = {
	"2101":"cheburek",
	"2105":"cheburek",
	"2103":"cheburek",
	"2108":"kanjo",
	"l_2180":"jackal",
	"l_2121":"brawler",
	"priora":"tailgater",
	"7e38":"primo2",
	"chiron":"nero",
	"rr_cullinan":"superd",
	"e34":"stanier",
	"mb_w140":"stanier",
	"mb_w124":"stanier",
	"mb_w210":"intruder",
	"c63":"premier",
	"e63amg":"asterope",
	"e63w213":"asterope",
	"mb_w213":"tailgater",
	"mb_w447":"moonbeam2",
	"s63w222":"primo2",
	"g63":"dubsta2",
	"mb_g65":"dubsta",
	"gts":"oracle2",
	"mb_r190":"alpha",
	"mb_c218":"schafter4",
	"evo10":"kuruma",
	"s_impreza_gda":"kuruma",
	"m2":"fusilade",
	"m340":"komoda",
	"m3e30":"sentinel3",
	"m3e46":"sentinel3",
	"m3f80":"komoda",
	"m4g82":"rapidgt",
	"m5e60":"komoda",
	"m5f10":"schafter2",
	"m6f13":"schwarzer",
	"m5f90":"oracle2",
	"m5f90cs":"oracle2",
	"m8":"schwarzer",
	"7f02":"schafter3",
	"x5e53":"rocoto",
	"x5me70":"rocoto",
	"x5f95":"rebla",
	"x7g07":"rebla",
	"nisgtr":"elegy2",
	"p1":"visione",
	"vantage":"zorrusso",
	"urus19":"toros",
	"perfomante":"tempesta",
	"svj":"zentorno",
	"l_sian":"zentorno",
	"r8":"ninef2",
	"rs6avant":"ingot",
	"a_rs5":"cogcabrio",
	"wraith19":"windsor",
	"m_mx5":"ruston",
	"camry55":"schafter5",
	"t_lc200":"rebla",
	"silvias15":"elegy",
	"supra":"feltzer2",
	"t_a90":"feltzer2",
	"jzx90":"primo",
	"jzx100":"stanier",
	"lx2018":"gresley",
	"l_lc500":"feltzer2",
	"octavia":"premier",
	"crown210":"tailgater",
	"fk8":"asea",
	"r34":"elegy",
	"fd":"comet2",
	"m_lancer9":"kuruma",
	"trhawk":"baller5",
	"a_sq8":"baller6",
	"a_rs6_20":"ingot",
	"a_rs7":"tailgater",
	"a_4h8":"felon",
	"d_charger20":"fugitive",
	"m750li":"jackal",
	"n_180sx":"tropos",
	"p_911_21":"comet2",
	"p_panamera":"neon",
	"p_macan":"novak",
	"f_488":"rapidgt2",
	"b_e39":"glendale",
	"m4f82":"zion",
	"j_wrangler":"mesa",
	"d_challenger20":"gauntlet4",
	"f_gt500":"dominator",
	"j_x760":"jugular",
	"mc_f56":"issi7",
	"m4g82":"rapidgt",
	"m3f80":"komoda",
	"f_gt17":"tigon",
	"f_raptor":"contender"
};

mp.game.vehicle.addModelOverride(mp.game.joaat("oracle2"), mp.game.joaat("rapidgt"));

/*for(var k in fakeVehModels) {
	mp.game.vehicle.addModelOverride(mp.game.joaat(k), mp.game.joaat(fakeVehModels[k]));
}*/

// NOTIFY SYSTEM

const _SET_NOTIFICATION_COLOR_NEXT = "0x39BBF623FC803EAC";
const _SET_NOTIFICATION_BACKGROUND_COLOR = "0x92F0DA1E27DB96DC";
const maxStringLength = 99;

mp.events.add("BN_Show", (message, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => {
    if (textColor > -1) mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1) mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing) mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);

    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (let i = 0, msgLen = message.length; i < msgLen; i += maxStringLength) mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.drawNotification(flashing, true);
	
	if(hud_browser) hud_browser.execute('playSound("quad_tone", 0.15);');
});

mp.events.add("BN_ShowWithPicture", (title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => {
    if (textColor > -1) mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1) mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing) mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);

    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (let i = 0, msgLen = message.length; i < msgLen; i += maxStringLength) mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.setNotificationMessage(notifPic, notifPic, flashing, icon, title, sender);
    mp.game.ui.drawNotification(false, true);
	
	if(hud_browser) hud_browser.execute('playSound("quad_tone", 0.15);');
});

mp.events.add("BN_ShowWithPictureSMS", (title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => {
    if (textColor > -1) mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1) mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing) mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);

    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (let i = 0, msgLen = message.length; i < msgLen; i += maxStringLength) mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.setNotificationMessage(notifPic, notifPic, flashing, icon, title, sender);
    mp.game.ui.drawNotification(false, true);
	
	if(hud_browser) hud_browser.execute('playSound("sms", 0.15);');
});

mp.game.ui.notifications = {
    show: (message, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => mp.events.call("BN_Show", message, flashing, textColor, bgColor, flashColor),
    showWithPicture: (title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => mp.events.call("BN_ShowWithPicture", title, sender, message, notifPic, icon, flashing, textColor, bgColor, flashColor),
	showSMS: (title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => mp.events.call("BN_ShowWithPictureSMS", title, sender, message, notifPic, icon, flashing, textColor, bgColor, flashColor)
};

// NOTIFY SYSTEM END

function dirGenerator(theHeading) {
	if(typeof(theHeading) !== "undefined") {
		theHeading = theHeading / 180 * Math.PI + .5 * Math.PI;
		let dirX = -1.5 * Math.cos(theHeading);
		let dirY = -1.5 * Math.sin(theHeading);
		return [dirX,dirY];
	}else{
		return [0,0];
	}
}

function str_replace_all(string, str_find, str_replace){
	try {
		return string.replace(new RegExp(str_find, "gi"), str_replace);
	}
	catch(ex){return string;}
}

/*
var prCrptAlphStr = {
	"a":"0x1",
	"b":"0x1",
	"c":"0x1",
	"d":"0x1",
	"e":"0x1",
	"f":"0x1",
	"g":"0x1",
	"h":"0x1",
	"i":"0x1",
	"j":"0x1",
	"k":"0x1",
	"l":"0x1",
	"m":"0x1",
	"n":"0x1",
	"o":"0x1",
	"p":"0x1",
	"q":"0x1",
	"r":"0x1",
	"s":"0x1",
	"t":"0x1",
	"u":"0x1",
	"v":"0x1",
	"w":"0x1",
	"x":"0x1",
	"y":"0x1",
	"z":"0x1"
}

function prEnc(varType, varContent){
	return str_replace_all(varType, str_find, str_replace);
}
*/

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function removeTags(str) {
	if ((str===null) || (str===''))
		return false;
	else
		str = str.toString();
		return str.replace(/<[^>]*>/g, '');
}

function explode(d, s, l)
{
    var out=[], tmp, pos;
    if (l)
    {
        tmp = s;
        pos = s.indexOf(d)
        while(l-1 && pos>=0)
        {
            out.push(tmp.substr(0, pos));
            tmp = tmp.substr(pos+d.length);
            l--;
            pos = tmp.indexOf(d);
        }
        out.push(tmp);
    }
    else
        out = s.split(d);
    return out;
}

function millisecToTime(ms) {
	var d, h, m, s;
	if (isNaN(ms)) {
		return {d:0,h:0,m:0,s:0};
	}
	d = ms / (1000 * 60 * 60 * 24);
	h = (d - ~~d) * 24;
	m = (h - ~~h) * 60;
	s = (m - ~~m) * 60;
	return {d: ~~d, h: ~~h, m: ~~m, s: ~~s};
}

function radians(degrees) {
    var TAU = 2 * Math.PI;
    return degrees * TAU / 360;
}

function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
}

var isInteger = function (value) {
  if (typeof value !== 'number') {
    return false;
  }

  if ((value | 0) !== value) {
    return false;
  }

  return true;
}

function between(check, min, max) {
  if (check < 0) {
    check *= -1;
  }

  return check >= min && check <= max;
}

function calculateDistance(p1, p2) {
    var a = p2.x - p1.x;
    var b = p2.y - p1.y;
    var c = p2.z - p1.z;

    return Math.sqrt(a * a + b * b + c * c);
}

function stringToBoolean(string) {
    switch(string.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function toFixedFloat(num) {
	return num = Number(+num).toFixed(1);
}ᣡ鸔ȍ