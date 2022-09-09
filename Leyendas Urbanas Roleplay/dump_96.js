{
//###################################################### CARGA Y DECLARACIONES

// Borramos los trenes ya existentes al cargar
if (mp.storage.data.trainhandles) {
	for (let h of mp.storage.data.trainhandles) {
		let c = GetTrainCarriage(h, 1) || GetTrainCarriage(h, 0);
		if (c) mp.game.vehicle.deleteMissionTrain(c);

		let exist = mp.game.invoke('0x7239B21A38F536BA', h);
		if(exist)
			mp.game.vehicle.deleteMissionTrain(h);
	}

	mp.storage.data.trainhandles = [];
} 
//Probamos a lanzar esta nativa en vez de la otra funcion del storage para limpiar todos los trenes recemos para que funcione..
//cosa que dudo peo bueno si alguien ve trenes duplicados que reconecte
//mp.game.invoke('0x736A718577F39C7D'); //DELETE_ALL_TRAINS


//MODELOS PARA EVITAR CRASHES
mp.game.streaming.requestModel(mp.game.joaat("cablecar"));
mp.game.streaming.requestModel(mp.game.joaat("freight"));
mp.game.streaming.requestModel(mp.game.joaat("freightcar"));
mp.game.streaming.requestModel(mp.game.joaat("freightcar2"));
mp.game.streaming.requestModel(mp.game.joaat("freightgrain"));
mp.game.streaming.requestModel(mp.game.joaat("freightcont1"));
mp.game.streaming.requestModel(mp.game.joaat("freightcont2"));
mp.game.streaming.requestModel(mp.game.joaat("freighttrailer"));
mp.game.streaming.requestModel(mp.game.joaat("metrotrain"));
mp.game.streaming.requestModel(mp.game.joaat("tankercar"));

//POSICIONES PARADAS DE METRO
let posMetroLSIAT_FIN = new mp.Vector3(-1226.846, -2890.335, -8.8);
let posMetroLSIAT_D = new mp.Vector3(-1077.7, -2720.6, -9.75);
let posMetroLSIAP_D = new mp.Vector3(-875.636, -2321.116, -14.3);
let posMetroPdS_D = new mp.Vector3(-536.6, -1285.1, 25.4);
let posMetroStraw_D = new mp.Vector3(263.492, -1209.917, 37.5);
let posBurton_D = new mp.Vector3(-287.131, -331.800, 8.6);
let posPortola_D = new mp.Vector3(-822.643, -133.112, 18.5);
let posDelPerro_D = new mp.Vector3(-1349.145, -484.187, 13.667);
let poslittleSeoul_D = new mp.Vector3(-494.708, -680.666, 10.42);
let posPillboxSouth_D = new mp.Vector3(-219.921, -1037.568, 28.8);
let posDavis_D = new mp.Vector3(116.274, -1732.107, 28.5);
let posDavis_FIN = new mp.Vector3(373.56982421875, -1946.272705078125, 16.372859573364258);
let posDavis_A = new mp.Vector3(113.63387298583984, -1718.84326171875, 28.530203247070312);
let posPillboxSouth_A = new mp.Vector3(-207.9844970703125, -1032.4150390625, 28.822538375854492);
let poslittleSeoul_A = new mp.Vector3(-507.3758544921875, -665.5537109375, 9.698348045349121);
let posDelPerro_A = new mp.Vector3(-1348.4888916015625, -455.00433349609375, 12.934150695800781);
let posPortola_A = new mp.Vector3(-805.187744140625, -140.43597412109375, 17.839019775390625);
let posBurton_A = new mp.Vector3(-302.5052795410156, -338.2046813964844, 7.952048301696777);
let posMetroStraw_A = new mp.Vector3(261.6791687011719, -1198.4700927734375, 36.85935592651367);
let posMetroPdS_A = new mp.Vector3(-549.9638671875, -1292.241943359375, 24.68971824645996);
let posMetroLSIAP_A = new mp.Vector3(-890.835693359375, -2317.43017578125, -13.836983680725098);
let posMetroLSIAT_A = new mp.Vector3(-1097.1556396484375, -2720.235595703125, -9.522414207458496);

//POSICIONES PARADAS DE TRENES
let posTrenLSA = new mp.Vector3(660.467, -1042.605, 22.404);
let posTrenLSD = new mp.Vector3(670.928, -1064.033, 22.479);//**
let posTrenSandy = new mp.Vector3(1773.784, 3487.621, 38.764);//**
let posTrenPaleto = new mp.Vector3(64.598, 6293.528, 31.431);//**
let posTrenGrapeseed = new mp.Vector3(2897.991, 4838.483, 62.931);//**

//VARIABLES GENERALES METRO Y TRENES
var myMetros = [];//Metros automaticos
var myMetroDriver = [];//Conductores de metro automaticos
var myTrains = [];//Trenes Automaticos
var myMetrosRC = [];//Raycasting de parada para los Metros
var myTrainsRC = [];//Raycasting de parada para los Trenes
var metroStopTime = 10000;
var trainStopTime = 30000;
var setCoordsTime = 3500;
var metroSpeed = 25.5;
var trainSpeed = 15.01;

//VARIABLES PUERTAS Y ASIENTOS (METRO)
let currentMetro = -1;
let currentParada = -1;
let currentPuerta = -1;
var currentSeat = -1;

var temp_currentParada;
var temp_currentPuerta;

var puertas_rails = [];
var puedeBajar = false;
var textoFin = "Fin de línea.";
var textoRojo = "Espera al metro.";
var textoVerde = "[E] Subir al metro.";
var textoRojoC = [170, 70, 70, 255];
var textoVerdeC = [70, 170, 70, 255];
const sitAnimM = 'amb@code_human_in_bus_passenger_idles@male@sit@base';
const sitAnimF = 'amb@code_human_in_bus_passenger_idles@female@sit@base';
const sitAnimD = 'amb@code_human_train_driver@base';
const loadAnim = (anim) => {
	return new Promise(resolve => {
		mp.game.streaming.requestAnimDict(anim)
		const timer = setInterval(() => {
			if (mp.game.streaming.hasAnimDictLoaded(anim)) {
				clearInterval(timer)
				resolve()
			}
		}, 100)
	});
}
let trainSeats = [
	//40, // seat_dside_f driver
	41, // seat_dside_r
	42, // seat_pside_f
	43, // seat_pside_r
	44, // seat_pside_r1
	45, // seat_pside_r2
	46, // seat_dside_r1
	47, // seat_dside_r2
	48, // seat_pside_r3
	49, // seat_dside_r3
];

let leftSide = [
	41, // seat_dside_r
	46, // seat_dside_r1
	47, // seat_dside_r2
	49, // seat_dside_r3
];

let rightSide = [
	42, // seat_pside_f
	43, // seat_pside_r
	44, // seat_pside_r1
	45, // seat_pside_r2
	48, // seat_pside_r3
];

let huesos_nombre = {
	"seat_dside_r": 41,
	"seat_pside_f": 42,
	"seat_pside_r": 43,
	"seat_pside_r1": 44,
	"seat_pside_r2": 45,
	"seat_dside_r1": 46,
	"seat_dside_r2": 47,
	"seat_pside_r3": 48,
	"seat_dside_r3": 49
};

//ARRAY PARADAS METRO
var paradas = [];
var LSIAT_FIN = { id: 0, nombre: "LSIAT_FIN", nextStopTime: 9755, speed: metroSpeed, pos: posMetroLSIAT_FIN, text: 'Aeropuerto' }; paradas.push(LSIAT_FIN);//LSIAT_FIN 
var LSIAT_D = { id: 1, nombre: "LSIAT_D", nextStopTime: 20965, speed: metroSpeed, pos: posMetroLSIAT_D, text: 'Aeropuerto' }; paradas.push(LSIAT_D);
var LSIAP_D = { id: 2, nombre: "LSIAP_D", nextStopTime: 45800, speed: metroSpeed, pos: posMetroLSIAP_D, text: 'Aeropuerto-Parking' }; paradas.push(LSIAP_D);
var PdS_D = { id: 3, nombre: "PdS_D", nextStopTime: 34540, speed: metroSpeed, pos: posMetroPdS_D, text: 'Puerto Del Sol' }; paradas.push(PdS_D);
var Straw_D = { id: 4, nombre: "Straw_D", nextStopTime: 73425, speed: metroSpeed, pos: posMetroStraw_D, text: 'Strawberry' }; paradas.push(Straw_D);
var Burton_D = { id: 5, nombre: "Burton_D", nextStopTime: 27675, speed: metroSpeed, pos: posBurton_D, text: 'Burton' }; paradas.push(Burton_D);
var Portola_D = { id: 6, nombre: "Portola_D", nextStopTime: 30930, speed: metroSpeed, pos: posPortola_D, text: 'Portola' }; paradas.push(Portola_D);
var DelPerro_D = { id: 7, nombre: "DelPerro_D", nextStopTime: 40030, speed: metroSpeed, pos: posDelPerro_D, text: 'Del Perro' }; paradas.push(DelPerro_D);
var littleSeoul_D = { id: 8, nombre: "littleSeoul_D", nextStopTime: 25090, speed: metroSpeed, pos: poslittleSeoul_D, text: 'Little Seoul' }; paradas.push(littleSeoul_D);
var PillboxSouth_D = { id: 9, nombre: "PillboxSouth_D", nextStopTime: 35650, speed: metroSpeed, pos: posPillboxSouth_D, text: 'Pillbox Sur' }; paradas.push(PillboxSouth_D);
var Davis_D = { id: 10, nombre: "Davis_D", nextStopTime: 13300, speed: metroSpeed, pos: posDavis_D, text: 'Davis' }; paradas.push(Davis_D);
var Davis_FIN = { id: 11, nombre: "Davis_FIN", nextStopTime: 31968, speed: metroSpeed, pos: posDavis_FIN, text: 'Davis' }; paradas.push(Davis_FIN);//Davis_FIN 
var Davis_A = { id: 12, nombre: "Davis_A", nextStopTime: 35407, speed: metroSpeed, pos: posDavis_A, text: 'Davis' }; paradas.push(Davis_A);
var PillboxSouth_A = { id: 13, nombre: "PillboxSouth_A", nextStopTime: 25800, speed: metroSpeed, pos: posPillboxSouth_A, text: 'Pillbox Sur' }; paradas.push(PillboxSouth_A);
var littleSeoul_A = { id: 14, nombre: "littleSeoul_A", nextStopTime: 40200, speed: metroSpeed, pos: poslittleSeoul_A, text: 'Little Seoul' }; paradas.push(littleSeoul_A);
var DelPerro_A = { id: 15, nombre: "DelPerro_A", nextStopTime: 29800, speed: metroSpeed, pos: posDelPerro_A, text: 'Del Perro' }; paradas.push(DelPerro_A);
var Portola_A = { id: 16, nombre: "Portola_A", nextStopTime: 26740, speed: metroSpeed, pos: posPortola_A, text: 'Portola' }; paradas.push(Portola_A);
var Burton_A = { id: 17, nombre: "Burton_A", nextStopTime: 72900, speed: metroSpeed, pos: posBurton_A, text: 'Burton' }; paradas.push(Burton_A);
var Straw_A = { id: 18, nombre: "Straw_A", nextStopTime: 35145, speed: metroSpeed, pos: posMetroStraw_A, text: 'Strawberry' }; paradas.push(Straw_A);
var PdS_A = { id: 19, nombre: "PdS_A", nextStopTime: 45420, speed: metroSpeed, pos: posMetroPdS_A, text: 'Puerto Del Sol' }; paradas.push(PdS_A);
var LSIAP_A = { id: 20, nombre: "LSIAP_A", nextStopTime: 21365, speed: metroSpeed, pos: posMetroLSIAP_A, text: 'Aeropuerto-Parking' }; paradas.push(LSIAP_A);
var LSIAT_A = { id: 21, nombre: "LSIAT_A", nextStopTime: 12665, speed: metroSpeed, pos: posMetroLSIAT_A, text: 'Aeropuerto' }; paradas.push(LSIAT_A);

//ARRAY PARADAS TREN
var trainStops = [];
var TS_LSD = { id: 0, nombre: "TS_LSD", speed: trainSpeed, pos: posTrenLSA, text: 'Los Santos' }; trainStops.push(TS_LSD);		//**
var TS_SANDY = { id: 1, nombre: "TS_SANDY", speed: trainSpeed, pos: posTrenSandy, text: 'Sandy Shores' }; trainStops.push(TS_SANDY);		//**
var TS_PALETO = { id: 2, nombre: "TS_PALETO", speed: trainSpeed, pos: posTrenPaleto, text: 'Paleto Bay' }; trainStops.push(TS_PALETO);		//**
var TS_GRAPESEED = { id: 3, nombre: "TS_GRAPESEED", speed: trainSpeed, pos: posTrenGrapeseed, text: 'Grapeseed' }; trainStops.push(TS_GRAPESEED);	//**
var TS_LSA = { id: 4, nombre: "TS_LSA", speed: trainSpeed, pos: posTrenLSD, text: 'Los Santos' }; trainStops.push(TS_LSA);		//**


//ARRAY RAYCAST METRO
myMetrosRC.push({ nombre: "LSIAT_FIN", paradaIndex: 0, pos1: new mp.Vector3(-1225.632, -2888.856, -8.013), pos2: new mp.Vector3(-1228.020, -2891.644, -8.324), sonidopos1: null, sonidopos2: null, sonido: "" });
myMetrosRC.push({ nombre: "LSIAT_D", paradaIndex: 1, pos1: new mp.Vector3(-1101.332, -2746.395, -8.323), pos2: new mp.Vector3(-1098.629, -2748.649, -8.323), sonidopos1: null, sonidopos2: null, sonido: "" });
myMetrosRC.push({ nombre: "LSIAP_D", paradaIndex: 2, pos1: new mp.Vector3(-889.456, -2353.511, -12.643), pos2: new mp.Vector3(-886.294, -2354.388, -12.646), sonidopos1: new mp.Vector3(-898.84155, -2531.7732, -8.329248), sonidopos2: new mp.Vector3(-892.9068, -2534.569, -8.32406), sonido: "estacionparking" });
myMetrosRC.push({ nombre: "PdS_D", paradaIndex: 3, pos1: new mp.Vector3(-552.784, -1316.178, 25.893), pos2: new mp.Vector3(-549.788, -1317.487, 25.894), sonidopos1: new mp.Vector3(-634.5291, -1648.2603, 10.899694), sonidopos2: new mp.Vector3(-640.19885, -1645.5046, 10.86033), sonido: "Puertadelsol" });
myMetrosRC.push({ nombre: "Straw_D", paradaIndex: 4, pos1: new mp.Vector3(228.257, -1211.239, 38.059), pos2: new mp.Vector3(227.988, -1208.491, 38.094), sonidopos1: new mp.Vector3(-130.47737, -1220.1508, 37.548817), sonidopos2: new mp.Vector3(-130.64139, -1215.5278, 37.550003), sonido: "Strawberry" });
myMetrosRC.push({ nombre: "Burton_D", paradaIndex: 5, pos1: new mp.Vector3(-285.375, -366.507, 9.150), pos2: new mp.Vector3(-289.095, -366.733, 9.150), sonidopos1: new mp.Vector3(41.97998, -539.5763, 17.7519), sonidopos2: new mp.Vector3(38.48627, -545.0708, 17.751986), sonido: "burton" });
myMetrosRC.push({ nombre: "Portola_D", paradaIndex: 6, pos1: new mp.Vector3(-791.742, -116.810, 19.043), pos2: new mp.Vector3(-792.999, -114.518, 19.045), sonidopos1: new mp.Vector3(-479.63284, -195.25237, 12.994777), sonidopos2: new mp.Vector3(-479.60532, -190.55707, 12.993987), sonido: "Portola" });
myMetrosRC.push({ nombre: "DelPerro_D", paradaIndex: 7, pos1: new mp.Vector3(-1365.686, -453.034, 14.140), pos2: new mp.Vector3(-1368.547, -454.779, 14.133), sonidopos1: new mp.Vector3(-1098.2548, -266.3462, 19.036892), sonidopos2: new mp.Vector3(-1101.346, -260.68417, 19.03691), sonido: "DelPerro" });
myMetrosRC.push({ nombre: "littleSeoul_D", paradaIndex: 8, pos1: new mp.Vector3(-530.042, -679.417, 10.902), pos2: new mp.Vector3(-530.104, -682.685, 10.896), sonidopos1: new mp.Vector3(-700.6825, -705.71466, 10.895618), sonidopos2: new mp.Vector3(-701.3924, -699.25104, 10.895617), sonido: "Littleseoul" });
myMetrosRC.push({ nombre: "PillboxSouth_D", paradaIndex: 9, pos1: new mp.Vector3(-206.171, -1004.869, 29.146), pos2: new mp.Vector3(-208.909, -1004.004, 29.201), sonidopos1: new mp.Vector3(-179.79282, -852.1454, 20.639645), sonidopos2: new mp.Vector3(-183.2312, -855.42554, 20.761724), sonido: "pillboxs" });
myMetrosRC.push({ nombre: "Davis_D", paradaIndex: 10, pos1: new mp.Vector3(88.643, -1711.183, 28.962), pos2: new mp.Vector3(91.226, -1707.572, 29.229), sonidopos1: new mp.Vector3(-206.77032, -1454.7634, 31.526861), sonidopos2: new mp.Vector3(-210.9706, -1459.4299, 31.515404), sonido: "Davis" });
myMetrosRC.push({ nombre: "Davis_FIN", paradaIndex: 11, pos1: new mp.Vector3(374.710, -1945.007, 16.773), pos2: new mp.Vector3(372.523, -1947.604, 16.774), sonidopos1: null, sonidopos2: null, sonido: "" });
myMetrosRC.push({ nombre: "Davis_A", paradaIndex: 12, pos1: new mp.Vector3(139.342, -1742.780, 29.120), pos2: new mp.Vector3(141.665, -1739.905, 28.993), sonidopos1: null, sonidopos2: null, sonido: "" });
myMetrosRC.push({ nombre: "PillboxSouth_A", paradaIndex: 13, pos1: new mp.Vector3(-221.962, -1064.871, 29.144), pos2: new mp.Vector3(-219.669, -1065.808, 29.305), sonidopos1: new mp.Vector3(-248.65962, -1299.4014, 31.225819), sonidopos2: new mp.Vector3(-253.98401, -1299.6066, 31.293625), sonido: "pillboxs" });
myMetrosRC.push({ nombre: "littleSeoul_A", paradaIndex: 14, pos1: new mp.Vector3(-472.382, -666.799, 10.912), pos2: new mp.Vector3(-472.393, -663.213, 10.896), sonidopos1: new mp.Vector3(-243.03941, -728.81946, 15.695529), sonidopos2: new mp.Vector3(-237.71623, -725.86053, 15.6961355), sonido: "Littleseoul" });
myMetrosRC.push({ nombre: "DelPerro_A", paradaIndex: 15, pos1: new mp.Vector3(-1329.268, -483.752, 14.132), pos2: new mp.Vector3(-1332.187, -485.804, 14.148), sonidopos1: new mp.Vector3(-1098.6072, -581.238, 3.9583316), sonidopos2: new mp.Vector3(-1094.5898, -579.3845, 4.0057216), sonido: "DelPerro" });
myMetrosRC.push({ nombre: "Portola_A", paradaIndex: 16, pos1: new mp.Vector3(-835.999, -156.858, 19.051), pos2: new mp.Vector3(-834.349, -159.713, 19.037), sonidopos1: new mp.Vector3(-1238.4071, -338.96674, 14.131765), sonidopos2: new mp.Vector3(-1238.2716, -343.3519, 14.135573), sonido: "Portola" });
myMetrosRC.push({ nombre: "Burton_A", paradaIndex: 17, pos1: new mp.Vector3(-300.866, -303.787, 9.161), pos2: new mp.Vector3(-304.089, -303.885, 9.150), sonidopos1: new mp.Vector3(-521.177, -188.16093, 14.092858), sonidopos2: new mp.Vector3(-518.58856, -183.92332, 14.125601), sonido: "burton" });
myMetrosRC.push({ nombre: "Straw_A", paradaIndex: 18, pos1: new mp.Vector3(297.77408, -1199.9368, 38.085705), pos2: new mp.Vector3(297.91202, -1197.2925, 38.119118), sonidopos1: new mp.Vector3(520.85516, -916.309, 17.091394), sonidopos2: new mp.Vector3(515.6361, -916.4024, 17.248003), sonido: "Strawberry" });
myMetrosRC.push({ nombre: "PdS_A", paradaIndex: 19, pos1: new mp.Vector3(-534.411, -1260.772, 25.905), pos2: new mp.Vector3(-536.810, -1259.572, 25.905), sonidopos1: new mp.Vector3(-263.31076, -1209.9237, 37.54918), sonidopos2: new mp.Vector3(-263.4614, -1215.687, 37.550404), sonido: "Puertadelsol" });
myMetrosRC.push({ nombre: "LSIAP_A", paradaIndex: 20, pos1: new mp.Vector3(-877.417, -2284.927, -12.643), pos2: new mp.Vector3(-879.759, -2284.200, -12.637), sonidopos1: new mp.Vector3(-770.0305, -2134.5205, -10.034559), sonidopos2: new mp.Vector3(-774.02386, -2132.945, -10.041985), sonido: "estacionparking" });
myMetrosRC.push({ nombre: "LSIAT_A", paradaIndex: 21, pos1: new mp.Vector3(-1073.596, -2694.365, -8.315), pos2: new mp.Vector3(-1076.019, -2692.421, -8.323), sonidopos1: new mp.Vector3(-884.9296, -2487.252, -12.212277), sonidopos2: new mp.Vector3(-890.6796, -2485.4263, -12.185694), sonido: "terminal4" });

//ARRAY RAYCAST TREN
myTrainsRC.push({ nombre: "TS_LSD", paradaIndex: 0, pos1: new mp.Vector3(662.571, -1042.342, 22.276), pos2: new mp.Vector3(665.189, -1042.274, 22.276) });	//**
myTrainsRC.push({ nombre: "TS_SANDY", paradaIndex: 1, pos1: new mp.Vector3(1774.638, 3487.305, 38.701), pos2: new mp.Vector3(1772.746, 3490.494, 38.655) });	//**
myTrainsRC.push({ nombre: "TS_PALETO", paradaIndex: 2, pos1: new mp.Vector3(64.570, 6292.949, 31.512), pos2: new mp.Vector3(66.469, 6289.925, 31.511) });	//**	
myTrainsRC.push({ nombre: "TS_GRAPESEED", paradaIndex: 3, pos1: new mp.Vector3(2898.159, 4838.353, 62.946), pos2: new mp.Vector3(2901.381, 4840.464, 62.917) });	//**	
myTrainsRC.push({ nombre: "TS_LSA", paradaIndex: 4, pos1: new mp.Vector3(667.493, -1067.624, 22.556), pos2: new mp.Vector3(671.384, -1067.509, 22.534) });	//**

//########################### PUERTAS METRO: 4x Vector3 + Parada
let puertasMetro = [];
//##########LSIAT_FIN
//let puertasLSIAT_FIN = [];
//puertasMetro.push(puertasLSIAT_FIN);
creaPuertas(new mp.Vector3(-1, -2, -700), new mp.Vector3(-1, -2, -700), new mp.Vector3(-1, -2, -700), new mp.Vector3(-1, -2, -700), 0);
//TODO Borrar esta shit si es posible
//##########LSIAT_D
creaPuertas(new mp.Vector3(-1076.860, -2716.890, -7.410), new mp.Vector3(-1080.868, -2721.489, -7.410), new mp.Vector3(-1084.370, -2725.655, -7.410), new mp.Vector3(-1088.141, -2730.135, -7.410), 1);
// //##########LSIAP_D
creaPuertas(new mp.Vector3(-876.550, -2317.271, -11.733), new mp.Vector3(-878.621, -2322.842, -11.733), new mp.Vector3(-880.535, -2328.095, -11.733), new mp.Vector3(-882.548, -2333.682, -11.733), 2);
//##########PdS_D
creaPuertas(new mp.Vector3(-536.958, -1281.319, 26.902), new mp.Vector3(-539.351, -1286.647, 26.902), new mp.Vector3(-541.687, -1291.699, 26.902), new mp.Vector3(-544.027, -1297.025, 26.902), 3);
//##########Straw_D
creaPuertas(new mp.Vector3(266.748, -1208.045, 38.904), new mp.Vector3(260.865, -1208.065, 38.903), new mp.Vector3(255.502, -1208.082, 38.904), new mp.Vector3(249.409, -1208.117, 38.908), 4);
//##########Burton_D
creaPuertas(new mp.Vector3(-288.976, -328.378, 10.063), new mp.Vector3(-288.965, -334.469, 10.063), new mp.Vector3(-289.028, -339.829, 10.063), new mp.Vector3(-288.959, -345.905, 10.063), 5);
//##########Portola_D
creaPuertas(new mp.Vector3(-824.561, -136.398, 19.950), new mp.Vector3(-819.331, -133.452, 19.950), new mp.Vector3(-814.697, -130.712, 19.950), new mp.Vector3(-809.506, -127.723, 19.950), 6);
//##########DelPerro_D
creaPuertas(new mp.Vector3(-1345.791, -486.258, 15.045), new mp.Vector3(-1348.877, -480.915, 15.045), new mp.Vector3(-1351.551, -476.298, 15.045), new mp.Vector3(-1354.497, -470.797, 15.045), 7);
//##########littleSeoul_D
creaPuertas(new mp.Vector3(-491.527, -678.851, 11.809), new mp.Vector3(-497.399, -678.823, 11.809), new mp.Vector3(-502.858, -678.841, 11.809), new mp.Vector3(-508.768, -678.810, 11.809), 8);
//##########PillboxSouth_D
creaPuertas(new mp.Vector3(-219.383, -1041.258, 30.141), new mp.Vector3(-217.349, -1035.715, 30.141), new mp.Vector3(-215.447, -1030.522, 30.141), new mp.Vector3(-213.365, -1024.878, 30.141), 9);
//##########Davis_D
creaPuertas(new mp.Vector3(120.333984, -1732.6438, 30.109987), new mp.Vector3(115.8816, -1728.7295, 30.11019), new mp.Vector3(111.60199, -1725.2087, 30.110136), new mp.Vector3(106.889565, -1721.2333, 30.110128), 10);
//##########Davis_FIN
creaPuertas(new mp.Vector3(-1, -2, -700), new mp.Vector3(-1, -2, -700), new mp.Vector3(-1, -2, -700), new mp.Vector3(-1, -2, -700), 11);
//##########Davis_A
creaPuertas(new mp.Vector3(109.847, -1718.048, 30.114), new mp.Vector3(114.507, -1721.911, 30.113), new mp.Vector3(118.608, -1725.508, 30.112), new mp.Vector3(123.368, -1729.236, 30.111), 12);
//##########PillboxSouth_A
creaPuertas(new mp.Vector3(-208.847, -1028.701, 30.140), new mp.Vector3(-210.923, -1034.278, 30.140), new mp.Vector3(-212.650, -1039.547, 30.140), new mp.Vector3(-214.609, -1045.012, 30.140), 13);
//##########littleSeoul_A
creaPuertas(new mp.Vector3(-510.731, -667.635, 11.809), new mp.Vector3(-504.726, -667.410, 11.809), new mp.Vector3(-499.304, -667.316, 11.809), new mp.Vector3(-493.414, -667.367, 11.809), 14);
//##########DelPerro_A
creaPuertas(new mp.Vector3(-1351.940, -453.097, 15.045), new mp.Vector3(-1348.795, -458.246, 15.045), new mp.Vector3(-1346.150, -462.998, 15.045), new mp.Vector3(-1343.101, -468.143, 15.045), 15);
//##########Portola_A
creaPuertas(new mp.Vector3(-803.097, -137.143, 19.950), new mp.Vector3(-808.339, -140.167, 19.950), new mp.Vector3(-813.106, -142.925, 19.950), new mp.Vector3(-818.289, -145.956, 19.950), 16);
//##########Burton_A
creaPuertas(new mp.Vector3(-300.124, -335.546, 10.063), new mp.Vector3(-300.181, -330.187, 10.063), new mp.Vector3(-300.224, -324.098, 10.063), new mp.Vector3(-300.518, -341.537, 10.063), 17);
//##########Straw_A
creaPuertas(new mp.Vector3(258.324, -1200.503, 38.903), new mp.Vector3(264.268, -1200.702, 38.903), new mp.Vector3(269.773, -1200.674, 38.904), new mp.Vector3(275.711, -1200.526, 38.904), 18);
//##########PdS_A
creaPuertas(new mp.Vector3(-549.696, -1295.862, 26.902), new mp.Vector3(-547.312, -1290.568, 26.902), new mp.Vector3(-544.742, -1285.777, 26.902), new mp.Vector3(-542.392, -1280.150, 26.902), 19);
//##########LSIAP_A
creaPuertas(new mp.Vector3(-889.843, -2321.230, -11.733), new mp.Vector3(-887.944, -2315.521, -11.733), new mp.Vector3(-886.370, -2310.498, -11.733), new mp.Vector3(-884.114, -2304.881, -11.733), 20);
//##########LSIAT_A
creaPuertas(new mp.Vector3(-1086.498, -2710.820, -7.410), new mp.Vector3(-1090.569, -2715.311, -7.410), new mp.Vector3(-1093.873, -2719.764, -7.410), new mp.Vector3(-1097.628, -2724.181, -7.410), 21);

//###################################################### FUNCIONES

function sleep(ms) {
	return new Promise(resolve => crearTimeout(resolve, ms));
}

function newLabel(text, position, los, fontID, distance, color, dimension) {
	return mp.labels.new(text, position,
		{
			los: los,
			font: fontID,
			drawDistance: distance,
			color: color,
			dimension: dimension
		});
}

function getDistance(pos1, pos2, useZ) {
	let distance = mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, useZ);
	return distance;
}

function creaPuertas(puerta1, puerta2, puerta3, puerta4, paradaPuerta) {
	let fpuerta1 = puerta1;
	let fpuerta2 = puerta2;
	let fpuerta3 = puerta3;
	let fpuerta4 = puerta4;
	puertas_rails.push(fpuerta1);
	puertas_rails.push(fpuerta2);
	puertas_rails.push(fpuerta3);
	puertas_rails.push(fpuerta4);
}

function CloseToMetroDoor(useZ) {
	let playerPos = mp.players.local.position;

	for (i = 0; i < puertas_rails.length; i++) {
		let puertaPos = puertas_rails[i];
		if (getDistance(playerPos, puertaPos, useZ) < 1) {
			let auxParada = Math.floor(i / 4);
			let auxPuerta = Math.floor(i % 4);
			if (puertasMetro[auxParada].length <= 0) {
				mostrarAviso("danger", 7000, 'Espera a que el metro esté en la estación y parado');
				return false;
			}
			else if (auxParada == 10 || auxParada == 21) {
				mostrarAviso("danger", 7000, 'Fin de línea, espera el siguiente metro al otro lado');
				return false;
			}

			if (!montado) {
				temp_currentParada = auxParada;
				temp_currentPuerta = auxPuerta;
				let auxMetroID = getMetroByParada(auxParada);

				let t_id = -1;
				for (let t in trenes_vehiculos) {
					if (trenes_vehiculos[t] == auxMetroID) {
						t_id = t;
						break;
					}
				}

				currentMetro = auxMetroID;

				logInfo("Metro", "Valor tren " + t_id);
				mp.events.callRemote("trenes:subir_jugador", t_id);
				return;
			}
			return 1;
		}
	}
}

function deleteMetro(metroID) {
	deleteMetroDriver(metroID);
	
	let exist = mp.game.invoke('0x7239B21A38F536BA', metroID);
	if(exist)
		mp.game.vehicle.deleteMissionTrain(metroID);

	for (var i = 0; i < myMetros.length; i++) {
		if (myMetros[i].trainID === metroID) {
			myMetros.splice(i, 1);
		}
	}
}

function deleteMetroDriver(metroID) {
	for (var i = 0; i < myMetroDriver.length; i++) {
		if (myMetroDriver[i].trainID == metroID) {
			if (mp.peds.exists(myMetroDriver[i].driverID))
				myMetroDriver[i].driverID.destroy();
		}
	}
}

function getMetroByParada(auxParada) {
	for (let i = 0; i < myMetros.length; i++) {
		if (myMetros[i].paradaID + 1 == auxParada)
			return myMetros[i].trainID;
	}
	return -1;
}

function crearTextosPuerta(parada) {
	let _puertas = puertas_rails.slice(parada * 4, (parada * 4 + 3));

	if (!puertasMetro[parada])
		puertasMetro[parada] = [];

	if (puertasMetro[parada].length > 0) eliminarTextosPuerta(parada);

	for (let p of _puertas) {
		puertasMetro[parada].push(mp.labels.new("Presiona la tecla ~g~[E]~w~\npara subir al metro", p, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 }));
	}
}

function eliminarTextosPuerta(parada) {
	if (!puertasMetro[parada]) return;
	for (let p of puertasMetro[parada]) {
		if (mp.labels.exists(p))
			p.destroy();
		p = null;
	}
	puertasMetro[parada] = [];
}

function createMetroDriver(autoMetro) {
	let metroDriver = mp.peds.new(mp.game.joaat("ig_andreas"), new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z), 270, mp.players.local.dimension);
	metroDriver.taskEnterVehicle(autoMetro, 10000, 0, 1, 16, 0);
	loadAnim(sitAnimD).then(_ => {
		metroDriver.taskPlayAnim(sitAnimD, 'sit', 3.0, -8, 1000000, 2, 1, false, false, false)
	});
	myMetroDriver.push({ trainID: autoMetro, driverID: metroDriver });
}

var guardarDelay = false;
function createMetro(parada, id, montar = false) {
	let autoMetro = mp.game.vehicle.createMissionTrain(25, paradas[parada].pos.x, paradas[parada].pos.y, paradas[parada].pos.z, true);
	// let autoMetro = mp.game.invoke('0x63C6CCA8E68AE8C8', 25, paradas[parada].pos.x, paradas[parada].pos.y, paradas[parada].pos.z, true);
	myMetros.push({ trainID: autoMetro, paradaID: parada, frenando: false });
	SetTrainCoords(autoMetro, paradas[parada].pos.x, paradas[parada].pos.y, paradas[parada].pos.z);
	SetTrainSpeed(autoMetro, 0);
	SetTrainCruiseSpeed(autoMetro, 0);

	let trainCarriage = GetTrainCarriage(autoMetro, 1) || GetTrainCarriage(autoMetro, 0);

	if (montar) {
		currentParada = parada;
		attachPlayerToTrain(mp.players.local, autoMetro, -1, currentSeat);
		currentMetro = autoMetro;
	}

	// createMetroDriver(autoMetro);

	//Velocidad inicial, si no es _FIN, se espera 10 segundos antes de arrancar, si es una de estas, arranca con cruise y standar speed fijadas
	if (parada != 0 && parada != 11) {
		eliminarTextosPuerta(parada);

		if (currentMetro == autoMetro) puedeBajar = false;

		SetVehicleDoorShut(autoMetro, 0);
		SetVehicleDoorShut(autoMetro, 2);
		SetVehicleDoorShut(trainCarriage, 1);
		SetVehicleDoorShut(trainCarriage, 3);

		sleep(1500).then(() => {
			SetTrainCruiseSpeed(autoMetro, paradas[parada].speed);
		});
	}
	else {
		SetTrainSpeed(autoMetro, paradas[parada].speed);
		SetTrainCruiseSpeed(autoMetro, paradas[parada].speed);
		SetVehicleDoorShut(autoMetro, 0);
		SetVehicleDoorShut(autoMetro, 2,);
		SetVehicleDoorShut(trainCarriage, 1);
		SetVehicleDoorShut(trainCarriage, 3);
	}

 	if (!mp.storage.data.trainhandles)
		mp.storage.data.trainhandles = [];

	mp.storage.data.trainhandles.push(autoMetro);

	if (!guardarDelay) {
		mp.storage.flush();
		guardarDelay = true;
		crearTimeout(() => {
			guardarDelay = false;
		}, 1 * 60 * 1000);
	}

	trenes_vehiculos[id] = autoMetro;
	vagones_trenes[trainCarriage] = autoMetro;

	return autoMetro;
}

/*function createTrain(parada) {
	let autoTrain = mp.game.vehicle.createMissionTrain(0, trainStops[parada].pos.x, trainStops[parada].pos.y, trainStops[parada].pos.z, true);
	let autoTrain = createMissionTrain(0, trainStops[parada].pos.x, trainStops[parada].pos.y, trainStops[parada].pos.z, true);
	myTrains.push({ trainID: autoTrain, paradaID: parada, frenando: false });
	SetTrainCoords(autoTrain, trainStops[parada].pos.x, trainStops[parada].pos.y, trainStops[parada].pos.z);
	SetTrainSpeed(autoTrain, 0);
	SetTrainCruiseSpeed(autoTrain, 0);
	sleep(trainStopTime).then(() => { SetTrainCruiseSpeed(autoTrain, trainStops[parada].speed); });
}*/

function createMissionTrain(variation, posx, posy, posz, direction) {
	let train = mp.game.invoke('0x63C6CCA8E68AE8C8', variation, posx, posy, posz, direction); //CREATE_MISSION_TRAIN
	return train;
}
function SetTrainSpeed(func_train, func_speed) {
	mp.game.invoke('0xAA0BC91BE0B796E3', func_train, func_speed); //SET_TRAIN_SPEED
}
function SetTrainCruiseSpeed(func_train, func_speed) {
	mp.game.invoke('0x16469284DB8C62B5', func_train, func_speed); //SET_TRAIN_CRUISE_SPEED
}
function SetTrainCoords(func_train, fx, fy, fz) {
	mp.game.invoke('0x591CA673AA6AB736', func_train, fx, fy, fz);  //SET_MISSION_TRAIN_COORDS
}
function GetTrainCarriage(func_train, id) {
	let remolque = mp.game.invoke('0x08AAFD0814722BC3', func_train, id); //GET_TRAIN_CARRIAGE
	return remolque;
}
function SetVehicleDoorShut(func_train, id) {//TODO cogerla del enlace
	mp.game.invoke('0x93D9BD300D7789E5', func_train, id, true);  //GET_TRAIN_CARRIAGE
}
function SetVehicleDoorOpen(func_train, id) {//TODO cogerla del enlace
	mp.game.invoke('0x7C65DAC73C35C862', func_train, id, true, false);  //GET_TRAIN_CARRIAGE
}

function bajarPlayer(player) {
	soundplay = false;
	currentMetro = -1;
	currentSeat = -1;
	montado = false;
	detachPlayer(player);
	mp.players.local.dimension = 0;
}

function playTrainPlayerAnim(player, stop = false) {
	mp.controladorJugadores.sincronizarAnimacion(player);
}

function attachPlayerToTrain(player, metroID = 0, auxSeat = -1, forceSeat = -1) {
	player.attachTo(
		metroID, // entity
		forceSeat,
		0.0, // x
		0.06, // y
		-0.03,// 1.05, // z
		180, 180, 180,
		true, // p9
		true, // useSoftPinningx
		true, // collision
		true, // isPed
		0, // vertexIndex
		true // fixedRot
	);

	player.setInvincible(true);
	playTrainPlayerAnim(player);
	return forceSeat;
}

function detachPlayer(player) {
	player.setInvincible(false);
	player.detach(false, false);
}

let soundplay = false;
//###################################################### EVENTO RENDER PRINCIPAL
mp.events.add('render', () => {

	if (!logueado || myMetrosRC.length == 0) return;

	for (j = 0; j < myMetrosRC.length; j++) {
		if (myMetrosRC[j].sonidopos1 != null && myMetrosRC[j].sonidopos2 != null) {
			const audiohitData = mp.raycasting.testPointToPoint(myMetrosRC[j].sonidopos1, myMetrosRC[j].sonidopos2, null, 2); // Colision con vehiculos y tren
			if (audiohitData) {
				if (currentMetro != -1) {
					for (var i = 0; i < myMetros.length; i++) {
						if (myMetros[i].trainID == audiohitData.entity) {
							let thisWagon = myMetros[i];
							if (currentMetro == thisWagon.trainID) {
								if(!soundplay)
								{
									mp.events.call("sound:play", myMetrosRC[j].sonido, false);
									soundplay = true;
								}
							}
						}
					}
				}
			}
		}

		const hitData = mp.raycasting.testPointToPoint(myMetrosRC[j].pos1, myMetrosRC[j].pos2, null, 2); // Colision con vehiculos y tren
		if (!hitData) {
			//mp.game.graphics.drawLine(myMetrosRC[j].pos1.x, myMetrosRC[j].pos1.y, myMetrosRC[j].pos1.z, myMetrosRC[j].pos2.x, myMetrosRC[j].pos2.y, myMetrosRC[j].pos2.z, 255, 255, 255, 255); // Is in line of sight
		} else {
			//mp.game.graphics.drawLine(myMetrosRC[j].pos1.x, myMetrosRC[j].pos1.y, myMetrosRC[j].pos1.z, myMetrosRC[j].pos2.x, myMetrosRC[j].pos2.y, myMetrosRC[j].pos2.z, 255, 0, 0, 255); // Is NOT in line of sight
			for (var i = 0; i < myMetros.length; i++) {
				if (myMetros[i].trainID == hitData.entity && myMetros[i].frenando == false &&
					!(myMetros[i].paradaID == 11 && myMetrosRC[j].nombre == "Davis_FIN") && !(myMetros[i].paradaID == 0 && myMetrosRC[j].nombre == "LSIAT_FIN")) {
					soundplay = false;
					let thisWagon = myMetros[i];
					let trainCarriage = GetTrainCarriage(thisWagon.trainID, 1) || GetTrainCarriage(thisWagon.trainID, 0);
					let nextParada = 0;
					if (thisWagon.paradaID <= 20) nextParada = thisWagon.paradaID + 1;

					if (thisWagon.paradaID != 10 && thisWagon.paradaID != 21) {
						myMetros[i].frenando = true;
						SetTrainCruiseSpeed(thisWagon.trainID, 0);
						let timer = setCoordsTime;
						let finDeLinea = false;
						sleep(timer).then(() => {
							SetTrainCoords(thisWagon.trainID, paradas[nextParada].pos.x, paradas[nextParada].pos.y, paradas[nextParada].pos.z);

							if (!purga) { // En purga metro solo da vueltas, ni abrimos puertas ni creamos texto
								SetVehicleDoorOpen(thisWagon.trainID, 0);
								SetVehicleDoorOpen(thisWagon.trainID, 2);
								SetVehicleDoorOpen(trainCarriage, 1);
								SetVehicleDoorOpen(trainCarriage, 3);
								crearTextosPuerta(nextParada);
                            }

							if (currentMetro == thisWagon.trainID) {
								puedeBajar = true;
								currentParada = nextParada;
							}

							//AQUI BAJO SI ES 9 Ó 20
							if ((thisWagon.paradaID == 9 || thisWagon.paradaID == 20) && (currentMetro == thisWagon.trainID)) {
								let t_id = -1;
								for (let t in trenes_vehiculos) {
									if (trenes_vehiculos[t] == currentMetro) {
										t_id = t;
										break;
									}
								}

								mp.events.callRemote("trenes:bajar_jugador", t_id);

								bajarPlayer(mp.players.local);
								try
								{
									mp.players.local.position = puertasMetro[nextParada][currentPuerta].position;
								}
								catch(e)
								{
									if(thisWagon.paradaID == 9)
										mp.players.local.position = new mp.Vector3(120.333984, -1732.6438, 30.109987);
									if(thisWagon.paradaID == 20)
										mp.players.local.position = new mp.Vector3(-889.843, -2321.230, -11.733);
								}
								currentParada = -1;
								currentPuerta = -1;
								currentSeat = -1;
								finDeLinea = true;
								eliminarTextosPuerta(nextParada);
							}
						});
					}
					else {
						deleteMetro(thisWagon.trainID);
					}
				}
			}
		}
	}
});

let delayE = false;
//###################################################### TECLAS Y COMANDOS

mp.events.add("raycast_metro", () => { //Tecla E para subir/bajar Metro
	if (!logueado)
		return;
	if (menuAbierto) return;
	if (mp.game.invoke("0xB0034A223497FFCB")) return;
	if (estaChatAbierto)
		return;
	if (navegador != null)
		return;
	if (purga) return; // En purga metro no se puede usar
	if (delayE) return;
	delayE = true;
	crearTimeout(() => {
		delayE = false;
	}, 1000);
	if (!montado) {
		if (!mp.players.local.vehicle) {
			CloseToMetroDoor(false);
		}
	}
	else {
		if (puedeBajar) {
			let t_id = -1;
			for (let t in trenes_vehiculos) {
				if (trenes_vehiculos[t] == currentMetro) {
					t_id = t;
					break;
				}
			}

			mp.events.callRemote("trenes:bajar_jugador", t_id);
			bajarPlayer(mp.players.local);
			mp.players.local.position = puertasMetro[currentParada][currentPuerta].position;
			currentParada = -1;
			currentSeat = -1;
			currentPuerta = -1;

			return;
		}
		else {
			mostrarAviso("danger", 7000, 'No puedes bajarte de un metro en marcha')
		}
	}
});

mp.events.add("playerCommand", (command) => {
	if (!mp.controladorJugadores.tieneAdminservicio(player_local)) return;
	const args = command.split(/[ ]+/);
	const commandName = args[0];

	args.shift();

	if (commandName === "irmetro") {
		let station = parseInt(args[0]);
		if (!isNaN(station) && station >= 0 && station < paradas.length) {
			mp.gui.chat.push('Estacion #' + station + ': !{Green}' + paradas[station].nombre)
			mp.players.local.position = new mp.Vector3(paradas[station].pos.x, paradas[station].pos.y, paradas[station].pos.z + 1);
		}
		else {
			mp.gui.chat.push('Uso: /irmetro [1...21]');
		}
	}
});

//Almacena los objetos de los trenes como se especifica en el evento trenes:inicializar
var trenes = {};

//id servidor -> id local
var trenes_vehiculos = {};

//id local vehiculo -> lista ids jugadores
var trenes_pasajeros = {};

//Id local del vagon -> id local del tren
var vagones_trenes = {};

// Id tren servidor -> array [lista asientos disponibles tren, lista asientos disponibles vagon]
var trenes_asientos = {};

mp.events.add({
	"nuevoMetro": (id, parada) => {
		if(!logueado) return;

		createMetro(parada, id);
	},
	"trenes:eliminar": (id) => {
		if(!logueado) return;

		let h = trenes_vehiculos[id];
		if (h) {
			let c = GetTrainCarriage(h, 1) || GetTrainCarriage(h, 0);
			if (c) mp.game.vehicle.deleteMissionTrain(c);

			let exist = mp.game.invoke('0x7239B21A38F536BA', h);
			if(exist)
				mp.game.vehicle.deleteMissionTrain(h);
		}
	},
	"trenes:actualizar": (id, parada, _pasajeros) => {
		if(!logueado) return;

		let id_tren = trenes_vehiculos[id];
		if (!id_tren) {
			id_tren = createMetro(parada, id);
		}
		// Como el tren ya existia en nuestro cliente, pasamos toda la informacion del tren en nuestro cliente
		// de la antigua id del tren a la nueva
		else {
			let old_id = id_tren;
			let vagon_id = GetTrainCarriage(id_tren, 1) || GetTrainCarriage(id_tren, 0);

			deleteMetro(id_tren);
			createMetro(parada, id, (currentMetro == id_tren));

			id_tren = trenes_vehiculos[id];

			trenes_pasajeros[id_tren] = [];
			trenes_pasajeros[GetTrainCarriage(id_tren, 1) || GetTrainCarriage(id_tren, 0)] = [];

			if (!trenes_pasajeros[old_id]) trenes_pasajeros[old_id] = [];
			if (!trenes_pasajeros[vagon_id]) trenes_pasajeros[vagon_id] = [];

			// Actualizamos la lista de pasajeros en el tren
			for (let p_id of trenes_pasajeros[old_id]) {
				if (p_id == mp.players.local.remoteId) continue;
				let j = mp.players.atRemoteId(p_id);
				if (!mp.players.exists(j)) continue;
				if (!j.trenSync) continue;

				j.trenSync.tren = id_tren;
				trenes_pasajeros[j.trenSync.tren].push(p_id);

				attachPlayerToTrain(j, j.trenSync.tren, -1, j.trenSync.hueso);
			}

			// Actualizamos la lista de pasajeros en el vagon
			for (let p_id of trenes_pasajeros[vagon_id]) {
				if (p_id == mp.players.local.remoteId) continue;
				let j = mp.players.atRemoteId(p_id);
				if (!mp.players.exists(j)) continue;
				if (!j.trenSync) continue;

				j.trenSync.tren = GetTrainCarriage(id_tren, 1) || GetTrainCarriage(id_tren, 0);
				trenes_pasajeros[j.trenSync.tren].push(p_id);

				attachPlayerToTrain(j, j.trenSync.tren, -1, j.trenSync.hueso);
			}

			trenes_pasajeros[old_id] = [];
			trenes_pasajeros[vagon_id] = [];
		}

		if (!trenes_pasajeros[id_tren]) trenes_pasajeros[id_tren] = [];

		let pasajeros = typeof _pasajeros === "string" ? JSON.parse(_pasajeros) : _pasajeros;

		if(pasajeros == undefined)
		{
			pasajeros = [];
		}

		// Lista de nuevos pasajeros ordenados por su id en el servidor
		let ids_nuevos = {};
		for (let p of pasajeros) {
			ids_nuevos[p.id_jugador] = p;
		}

		// Eliminamos de la lista de pasajeros los que se hayan bajado en la parada
		for (let p of trenes_pasajeros[id_tren]) {
			let j = mp.players.atRemoteId(p);
			if (!mp.players.exists(j)) return;

			if (!ids_nuevos.hasOwnProperty(j.remoteId)) {
				let h = id_tren;

				let idx = trenes_pasajeros[h].indexOf(j.remoteId);
				if (idx > -1) trenes_pasajeros[h].splice(idx, 1);

				if (j.trenSync) {
					delete j.trenSync;
					if (j.trenSync) j.trenSync = null;
				}

				detachPlayer(j);
			}
		}

		let c = GetTrainCarriage(id_tren, 1) || GetTrainCarriage(id_tren, 0);
		if (!trenes_pasajeros[c]) trenes_pasajeros[c] = [];

		// Mismo proceso anterior pero esta vez con el vagon del tren
		for (let p of trenes_pasajeros[c]) {
			let j = mp.players.atRemoteId(p);
			if (!mp.players.exists(j)) return;

			if (!ids_nuevos.hasOwnProperty(j.remoteId)) {
				let h = c;

				let idx = trenes_pasajeros[h].indexOf(j.remoteId);
				if (idx > -1) trenes_pasajeros[h].splice(idx, 1);

				if (j.trenSync) {
					delete j.trenSync;
					if (j.trenSync) j.trenSync = null;
				}

				detachPlayer(j);
			}
		}

		// Añadimos los nuevos pasajeros a la lista
		for (let p of pasajeros) {
			let h = id_tren;
			if (p.enVagon) h = GetTrainCarriage(id_tren, 1) || GetTrainCarriage(id_tren, 0);

			let j = mp.players.atRemoteId(p.id_jugador);
			if (!mp.players.exists(j)) return;

			// Debe ser un pasajero nuevo, es decir, todavia no figura como pasajero en nuestro cliente
			if (trenes_pasajeros[h].indexOf(j.remoteId) === -1) {
				j.trenSync = {
					tren: h,
					hueso: huesos_nombre[p.hueso]
				}

				if (!trenes_pasajeros[h]) trenes_pasajeros[h] = [];
				trenes_pasajeros[h].push(j.remoteId);

				attachPlayerToTrain(j, h - 1, huesos_nombre[p.hueso]);
			}
		}
	},
	"trenes:subir_jugador": (jugadorId, id, esVagon, hueso) => {
		if(!logueado) return;

		soundplay = false;

		let h = (!esVagon ? trenes_vehiculos[id] : (
			GetTrainCarriage(trenes_vehiculos[id], 1) || GetTrainCarriage(trenes_vehiculos[id], 0)
		));

		let j = mp.players.atRemoteId(jugadorId);
		if (!mp.players.exists(j)) return;

		j.trenSync = {
			tren: h,
			hueso: huesos_nombre[hueso]
		};

		attachPlayerToTrain(j, h, -1, huesos_nombre[hueso]);

		if (j == player_local) {
			currentSeat = huesos_nombre[hueso];
			currentParada = temp_currentParada;
			currentPuerta = temp_currentPuerta;
			temp_currentPuerta = temp_currentParada = -1;
			puedeBajar = true;
			montado = true;
		}

		if (!trenes_pasajeros[h]) trenes_pasajeros[h] = [];
		trenes_pasajeros[h].push(j.remoteId);
	},
	"trenes:bajar_jugador": (jugadorId, id, esVagon) => {
		if(!logueado) return;

		let h = (!esVagon ? trenes_vehiculos[id] : (
			GetTrainCarriage(trenes_vehiculos[id], 1) || GetTrainCarriage(trenes_vehiculos[id], 0)
		));

		let j = mp.players.atRemoteId(jugadorId);
		if (!mp.players.exists(j)) return;

		if (j.trenSync) {
			delete j.trenSync;
			if (j.trenSync) j.trenSync = null;
		}

		if (j != player_local)
			detachPlayer(j);

		if (!trenes_pasajeros[h]) trenes_pasajeros[h] = [];
		let idx = trenes_pasajeros[h].indexOf(j.remoteId);
		if (idx > -1) trenes_pasajeros[h].splice(idx, 1);
	},
	"trenes:expulsar_jugador": () => {
		if(!logueado) return;

		bajarPlayer(mp.players.local);
	},
});

// player entityStreamIn - streamHandler
function streamInRails(entity) {
	try {
		if (!entity.trenSync) return;

		attachPlayerToTrain(entity, entity.trenSync.tren, -1, entity.trenSync.hueso);
	} catch (e) {
		if (mp.controladorJugadores.tieneAdminservicio(player_local))
			mp.gui.chat.push("entityStreamIn rails " + e);
	}
}

function objectToArray(object) {
	let r = [];
	if (!object) return r;
	for (let i in object) {
		r.push(object[i]);
	}
	return r;
}
}