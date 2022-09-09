{
﻿/* --------------------------------------------------------------------------------
 * campodetiro.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Sistema para las galerias de tiros de los ammunations
 *
 * -------------------------------------------------------------------------------- */

/*
 * GENERAL
 */

mp.events.add("playerEnterColshape", (colshape) => {
	if (colshape == colshapeFIB1 ||
		colshape == colshapeFIB2 ||
		colshape == colshapeFIB3 ||
		colshape == colshapeFIB4 ||
		colshape == colshapeFIB5 ||
		colshape == colshapeFIB6 ||
		colshape == colshapeFIB7 ||
		colshape == colshapeFIB8 ||
		colshape == colshapeFIB9 ||
		colshape == colshapeFIB10 ||
		colshape == colshapeFIB11 ||
		colshape == colshapeFIB12 ||
		colshape == colshapeFIB13) {
		penalizado = true;
	}
	if (colshape == colshapeFIB14) {
		player_local.position = new mp.Vector3(2483.1633, -388.1259, 82.69448);
	}
	if (colshape == colshapeSalirPillboxHill) {
		player_local.position = new mp.Vector3(13.07653, -1098.1765, 29.797028);
	}
	if (colshape == colshapeSalirCypressFlat) {
		player_local.position = new mp.Vector3(821.81586, -2162.496, 29.618996);
	}
});

const localPlayer = mp.players.local;
var campoTiroActivo = false; // Variable que le indicará al anti-cheat si está en mitad de un entrenamiento o no (Para que no le quite el arma y lo kickee)
let contador = 30; // Variable para guardar el tiempo de contador

function iniciarContador() {
	let int = setInterval(() => {
		if (contador <= 0) clearInterval(int);
		contador--;
	}, 1000);
}

function campoTiroFalse() {
	campoTiroActivo = false
}

function cuentaAtras() {

	mp.game.ui.messages.showMidsizedShard("5", "", 2, false, true, 1000, false);

	crearTimeout(() => {
		mp.game.ui.messages.showMidsizedShard("4", "", 2, false, true, 1000, false);
	}, 1000);

	crearTimeout(() => {
		mp.game.ui.messages.showMidsizedShard("3", "", 2, false, true, 1000, false);
	}, 2000);

	crearTimeout(() => {
		mp.game.ui.messages.showMidsizedShard("2", "", 2, false, true, 1000, false);
	}, 3000);

	crearTimeout(() => {
		mp.game.ui.messages.showMidsizedShard("1", "", 2, false, true, 1000, false);
	}, 4000);

	crearTimeout(() => {
		mp.game.ui.messages.showMidsizedShard("¡YA!", "", 2, false, true, 1000, false);
	}, 5000);
}


/*
 * CYPRESS FLAT
 */

// VARIABLES CYPRESS FLAT
let ver_objetivos_cypressflat = false; // Solo poner true en el caso que haya que testear algo por BUG.
let ver_cajas_debug_cypressflat = false; // Solo poner true en el caso que haya que testear algo por BUG.

let objetivo_cypressflat;
let cCoords_cypressflat;
var esta_empezado_cypressflat = false;
let puntos_cypressflat = 0;
let objetivos_restantes_cypressflat = 20;
let tiempo_de_intervalo_cypressflat;
let suma_puntos_CF = "";
let armaElegidaCF;
let nivelElegidoCF;
let weaponArmaCF;

// COLSHAPES PARA QUE NO SALGA DEL AMMUNATION
let colshapeSalirCypressFlat = null;

mp.events.add("ammunation:empezar_cypressflat", (tiempoIntervalo, armaElegida, nivelElegido, weaponArma) => {

	// Activamos excepción para el anti-cheat
	campoTiroActivo = true;

	// Le bloqueamos para que no pueda cambiar de arma
	player_local.setCanSwitchWeapon(false);

	// Le ocultamos el chat durante el entrenamiento
	mp.gui.chat.show(false);

	// Terminamos la transicion de pantalla..
	mp.game.cam.doScreenFadeIn(1000);
	mp.events.call("hud:estado_hud");
	if(tipoMapa != 2) mp.game.ui.displayRadar(true);
	mp.game.ui.displayHud(true);
	mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

	armaElegidaCF = armaElegida;
	nivelElegidoCF = nivelElegido;
	weaponArmaCF = weaponArma;

	esta_empezado_cypressflat = true;
	objetivos_restantes_cypressflat = 20;
	puntos_cypressflat = 0;

	tiempo_de_intervalo_cypressflat = ((tiempoIntervalo) * 1000);

	crearColshapesAmmunationCypressFlat();

	cuentaAtras();

	crearTimeout(ammunation_cypressflat, 6500);
});

let objetivos_cypressflat = [
	[815.58141113281, -2171.3816894531, 30.23],
	[816.58141113281, -2171.3816894531, 30.23],
	[817.58141113281, -2171.3816894531, 30.23],
	[818.58141113281, -2171.3816894531, 30.23],
	[819.58141113281, -2171.3816894531, 30.23],
	[820.58141113281, -2171.3816894531, 30.23],
	[821.58141113281, -2171.3816894531, 30.23],
	[822.58141113281, -2171.3816894531, 30.23],
	[823.58141113281, -2171.3816894531, 30.23],
	[824.58141113281, -2171.3816894531, 30.23],
	[825.58141113281, -2171.3816894531, 30.23],
	[826.58141113281, -2171.3816894531, 30.23],
	[827.58141113281, -2171.3816894531, 30.23],
	[815.58141113281, -2180.5102539063, 30.23],
	[816.58141113281, -2180.5102539063, 30.23],
	[817.58141113281, -2180.5102539063, 30.23],
	[818.58141113281, -2180.5102539063, 30.23],
	[819.58141113281, -2180.5102539063, 30.23],
	[820.58141113281, -2180.5102539063, 30.23],
	[821.58141113281, -2180.5102539063, 30.23],
	[822.58141113281, -2180.5102539063, 30.23],
	[823.58141113281, -2180.5102539063, 30.23],
	[824.58141113281, -2180.5102539063, 30.23],
	[825.58141113281, -2180.5102539063, 30.23],
	[826.58141113281, -2180.5102539063, 30.23],
	[827.58141113281, -2180.5102539063, 30.23],
	[815.58141113281, -2191.6252441406, 30.23],
	[816.58141113281, -2191.6252441406, 30.23],
	[817.58141113281, -2191.6252441406, 30.23],
	[818.58141113281, -2191.6252441406, 30.23],
	[819.58141113281, -2191.6252441406, 30.23],
	[820.58141113281, -2191.6252441406, 30.23],
	[821.58141113281, -2191.6252441406, 30.23],
	[822.58141113281, -2191.6252441406, 30.23],
	[823.58141113281, -2191.6252441406, 30.23],
	[824.58141113281, -2191.6252441406, 30.23],
	[825.58141113281, -2191.6252441406, 30.23],
	[826.58141113281, -2191.6252441406, 30.23],
	[827.58141113281, -2191.6252441406, 30.23],
];

function ammunation_cypressflat() {
	let contador = 0;

	if (esta_empezado_cypressflat) {
		if (objetivos_restantes_cypressflat >= 0) {

			if (objetivos_restantes_cypressflat > 0) {

				if (contador < 20) {
					let random = Math.floor(Math.random() * 39);
					cCoords_cypressflat = objetivos_cypressflat[random];

					if (objetivo_cypressflat && mp.objects.exists(objetivo_cypressflat)) {
						objetivo_cypressflat.destroy();
					}

					let model = mp.game.joaat("prop_range_target_01");

					objetivo_cypressflat = mp.objects.new(model, new mp.Vector3(cCoords_cypressflat[0], cCoords_cypressflat[1], cCoords_cypressflat[2] + 1),
						{
							rotation: new mp.Vector3(0, 0, 2.3),
							alpha: 255,
							dimension: mp.players.local.dimension
						});
                }
			}

			contador++;

			objetivos_restantes_cypressflat--;

			crearTimeout(ammunation_cypressflat, tiempo_de_intervalo_cypressflat);
		}
	}
}
function crearColshapesAmmunationCypressFlat() {
	colshapeSalirCypressFlat = mp.colshapes.newSphere(826.887, -2160.6072, 29.618996, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
}
function romperColshapesAmmunationCypressFlat() {
	if (colshapeSalirCypressFlat != null && mp.colshapes.exists(colshapeSalirCypressFlat)) {
		colshapeSalirCypressFlat.destroy();
		colshapeSalirCypressFlat = null;
	}
}


/*
 * PILLBOX HILL
 */

// VARIABLES PILLBOX HILL
let ver_objetivos_pillboxhill = false; // Solo poner true en el caso que haya que testear algo por BUG.

let objetivo_pillboxhill;
let cCoords_pillboxhill;
var esta_empezado_pillboxhill = false;
let objetivos_derribados_pillboxhill = 0;
let tiempo_de_intervalo_pillboxhill;
let suma_objetivo_derribado_pillboxhill = "";
let armaElegidaPH;
let nivelElegidoPH;
let weaponArmaPH;
let objetivosQueDebenAparecerPH;
let objetivosRestantesPH;

let objetivos_totales_aparecidos_pillboxhill = 0;

// COLSHAPES PARA QUE NO SALGA DEL AMMUNATION
let colshapeSalirPillboxHill = null;

mp.events.add("ammunation:empezar_pillboxhill", (tiempoIntervalo, armaElegida, nivelElegido, weaponArma, objetivosQueDebenAparecer) => {

	// Activamos excepción para el anti-cheat
	campoTiroActivo = true;

	// Le bloqueamos para que no pueda cambiar de arma
	player_local.setCanSwitchWeapon(false);

	// Le ocultamos el chat durante el entrenamiento
	mp.gui.chat.show(false);

	// Terminamos la transicion de pantalla..
	mp.game.cam.doScreenFadeIn(1000);
	mp.events.call("hud:estado_hud");
	if(tipoMapa != 2) mp.game.ui.displayRadar(true);
	mp.game.ui.displayHud(true);
	mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

	armaElegidaPH = armaElegida;
	nivelElegidoPH = nivelElegido;
	weaponArmaPH = weaponArma;
	objetivosQueDebenAparecerPH = objetivosQueDebenAparecer;
	objetivosRestantesPH = objetivosQueDebenAparecer;

	esta_empezado_pillboxhill = true;
	objetivos_derribados_pillboxhill = 0;
	objetivos_totales_aparecidos_pillboxhill = 0;
	contador = 30;

	tiempo_de_intervalo_pillboxhill = ((tiempoIntervalo) * 1000);

	crearColshapesAmmunationPillboxHill();

	cuentaAtras();

	crearTimeout(ammunation_pillboxhill, 6500);
	crearTimeout(iniciarContador, 5500);
});

let objetivos_pillboxhill = [
	[10.50, -1087.98, 30.37],
	[11.44167, -1088.31667, 30.37],
	[12.38334, -1088.65334, 30.37],
	[13.325, -1088.99, 30.37],
	[14.26667, -1089.32667, 30.37],
	[15.20834, -1089.66334, 30.37],
	[16.15, -1090.00, 30.37],
	[17.09167, -1090.336677, 30.37],
	[18.03334, -1090.67334, 30.37],
	[18.975, -1091.05, 30.37],
	[19.91667, -1091.38667, 30.37],
	[20.85834, -1091.72334, 30.37],
	[21.80, -1092.10, 30.37],
	[13.655, -1079.426, 30.37],
	[14.59583, -1079.76933, 30.37],
	[15.53666, -1080.11266, 30.37],
	[16.47750, -1080.456, 30.37],
	[17.41833, -1080.79933, 30.37],
	[18.35916, -1081.14266, 30.37],
	[19.300, -1081.486, 30.37],
	[20.24083, -1081.829, 30.37],
	[21.18166, -1082.173, 30.37],
	[22.12250, -1082.516, 30.37],
	[23.06333, -1082.859, 30.37],
	[24.00416, -1083.20266, 30.37],
	[24.945, -1083.546, 30.37],
	[17.400, -1068.970, 30.37],
	[18.34292, -1069.31250, 30.37],
	[19.28584, -1069.655, 30.37],
	[20.22875, -1069.9975, 30.37],
	[21.17167, -1070.34, 30.37],
	[22.11459, -1070.6825, 30.37],
	[23.05750, -1071.025, 30.37],
	[24.00042, -1071.3675, 30.37],
	[24.94334, -1071.710, 30.37],
	[25.88625, -1072.05250, 30.37],
	[26.82887, -1072.395, 30.37],
	[27.77179, -1072.7375, 30.37],
	[28.715, -1073.080, 30.37],
];

function ammunation_pillboxhill() {
	if (esta_empezado_pillboxhill) {

		let random = Math.floor(Math.random() * 39);
		cCoords_pillboxhill = objetivos_pillboxhill[random];

		if (objetivo_pillboxhill && mp.objects.exists(objetivo_pillboxhill)) {
			objetivo_pillboxhill.destroy();
		}

		let model = mp.game.joaat("prop_range_target_01");

		objetivo_pillboxhill = mp.objects.new(model, new mp.Vector3(cCoords_pillboxhill[0], cCoords_pillboxhill[1], cCoords_pillboxhill[2] + 1),
			{
				rotation: new mp.Vector3(0, 0, 161),
				alpha: 255,
				dimension: mp.players.local.dimension
			});

		objetivos_totales_aparecidos_pillboxhill++;
		objetivosRestantesPH--;

		crearTimeout(ammunation_pillboxhill, tiempo_de_intervalo_pillboxhill);
	}
}
function crearColshapesAmmunationPillboxHill() {
	colshapeSalirPillboxHill = mp.colshapes.newSphere(7.463307, -1098.3442, 29.796995, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
}
function romperColshapesAmmunationPillboxHill() {
	if (colshapeSalirPillboxHill != null && mp.colshapes.exists(colshapeSalirPillboxHill)) {
		colshapeSalirPillboxHill.destroy();
		colshapeSalirPillboxHill = null;
	}
}


/*
 * FIB
 */

// VARIABLES FIB
let ver_objetivos_FIB = false; // Solo poner true en el caso que haya que testear algo por BUG.
let ver_cajas_debug_FIB_1 = false; // Solo poner true en el caso que haya que testear algo por BUG.
let ver_cajas_debug_FIB_3 = false; // Solo poner true en el caso que haya que testear algo por BUG.
let ver_cajas_debug_FIB_4 = false; // Solo poner true en el caso que haya que testear algo por BUG.

let objetivo_FIB;
let cCoords_FIB;
let armaElegidaFIB;
let nivelElegidoFIB;
let esta_empezado_FIB = false;
let mostrar_texto_informativo_FIB = false;
let tiempo_de_intervalo_FIB;
let modo_de_practica = 0;
let weaponArmaFIB;
let objetivosQueDebenAparecerFIB;
let objetivosRestantesFIB;
let penalizado = false;

// COLSHAPES PARA QUE NO ENTREN DONDE ESTAN LAS DIANAS
let colshapeFIB1 = null;
let colshapeFIB2 = null;
let colshapeFIB3 = null;
let colshapeFIB4 = null;
let colshapeFIB5 = null;
let colshapeFIB6 = null;
let colshapeFIB7 = null;
let colshapeFIB8 = null;
let colshapeFIB9 = null;
let colshapeFIB10 = null;
let colshapeFIB11 = null;
let colshapeFIB12 = null;
let colshapeFIB13 = null;
let colshapeFIB14 = null;

// MODO 1
let puntos_FIB_1 = 0;
let objetivos_restantes_FIB_1 = 20;
let suma_puntos_FIB_1 = "";

// MODO 2
let objetivos_derribados_FIB_2 = 0;
let objetivos_totales_aparecidos_FIB_2 = 0;
let suma_objetivo_derribado_FIB_2 = "";

// MODO 3
let cabezas_derribadas_FIB_3 = 0;
let objetivos_totales_aparecidos_FIB_3 = 0;
let suma_objetivo_derribado_FIB_3 = "";

// MODO 4
let LETAL_derribados_FIB_4 = 0;
let NO_LETAL_derribados_FIB_4 = 0;
let objetivos_totales_aparecidos_FIB_4 = 0;
let suma_NO_LETAL_derribado_FIB_4 = "";

// POSICIONES DONDE APARECERÁN LOS OBJETIVOS DEL FIB
let objetivos_FIB = [
	[2481.43, -398.41, 83.1],
	[2480.72, -397.7, 83.1],
	[2480.01, -396.99, 83.1],
	[2479.30, -396.28, 83.1],
	[2478.59, -395.57, 83.1],
	[2477.88, -394.86, 83.1],
	[2477.16, -394.15, 83.1],
	[2476.45, -393.44, 83.1],
	[2475.74, -392.73, 83.1],
	[2475.03, -392.03, 83.1],
	[2474.32, -391.32, 83.1],
	[2473.61, -390.61, 83.1],
	[2472.9, -389.9, 83.1],
	[2474.96, -404.9, 83.1],
	[2474.251, -404.19, 83.1],
	[2473.542, -403.48, 83.1],
	[2472.833, -402.77, 83.1],
	[2472.124, -402.06, 83.1],
	[2471.415, -401.35, 83.1],
	[2470.705, -400.64, 83.1],
	[2469.997, -399.93, 83.1],
	[2469.288, -399.22, 83.1],
	[2468.578, -398.51, 83.1],
	[2467.87, -397.8, 83.1],
	[2467.161, -397.09, 83.1],
	[2466.452, -396.38, 83.1],
	[2467.13, -412.75, 83.075],
	[2466.419, -412.035, 83.075],
	[2465.708, -411.320, 83.075],
	[2464.998, -410.604, 83.075],
	[2464.286, -409.89, 83.075],
	[2463.575, -409.175, 83.075],
	[2462.865, -408.485, 83.075],
	[2462.153, -407.745, 83.075],
	[2461.442, -407.03, 83.075],
	[2460.733, -406.353, 83.075],
	[2460.02, -405.60, 83.075],
	[2459.309, -404.885, 83.075],
	[2458.6, -404.22, 83.075],
];



/*
 * EVENTOS
 * */

mp.events.add("ammunation:empezar_FIB", (modoAmmunationFIB, tiempoIntervalo, armaElegida, nivelElegido, weaponArma, objetivosQueDebenAparecer) => {

	// Activamos excepción para el anti-cheat
	campoTiroActivo = true;

	// Le bloqueamos para que no pueda cambiar de arma
	player_local.setCanSwitchWeapon(false);

	// Le ocultamos el chat durante el entrenamiento
	mp.gui.chat.show(false);

	// Terminamos la transicion de pantalla..
	mp.game.cam.doScreenFadeIn(1000);
	mp.events.call("hud:estado_hud");
	if(tipoMapa != 2) mp.game.ui.displayRadar(true);
	mp.game.ui.displayHud(true);
	mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

	armaElegidaFIB = armaElegida;
	nivelElegidoFIB = nivelElegido;
	modo_de_practica = modoAmmunationFIB;
	weaponArmaFIB = weaponArma;
	objetivosQueDebenAparecerFIB = objetivosQueDebenAparecer;
	objetivosRestantesFIB = objetivosQueDebenAparecer;

	esta_empezado_FIB = true;
	tiempo_de_intervalo_FIB = ((tiempoIntervalo) * 1000);

	crearColshapesAmmunationFIB();

	cuentaAtras();

	if (modoAmmunationFIB == 1) {

		objetivos_restantes_FIB_1 = 20;
		puntos_FIB_1 = 0;

		crearTimeout(ammunation_FIB_1, 6500);
		return;
	}

	if (modoAmmunationFIB == 2) {

		objetivos_derribados_FIB_2 = 0;
		objetivos_totales_aparecidos_FIB_2 = 0;
		contador = 30;

		crearTimeout(ammunation_FIB_2, 6500);
		crearTimeout(iniciarContador, 5500);
		return;
	}

	if (modoAmmunationFIB == 3) {

		cabezas_derribadas_FIB_3 = 0;
		objetivos_totales_aparecidos_FIB_3 = 0;
		contador = 30;

		crearTimeout(ammunation_FIB_3, 6500);
		crearTimeout(iniciarContador, 5500);
		return;
	}

	if (modoAmmunationFIB == 4) {

		LETAL_derribados_FIB_4 = 0;
		NO_LETAL_derribados_FIB_4 = 0;
		objetivos_totales_aparecidos_FIB_4 = 0;
		contador = 30;

		crearTimeout(ammunation_FIB_4, 6500);
		crearTimeout(iniciarContador, 5500);
		return;
	}

});



/*
 * FUNCIONES
 * */

function ammunation_FIB_1() {
	if (esta_empezado_FIB) {
		if (objetivos_restantes_FIB_1 >= 0) {

			if (objetivos_restantes_FIB_1 > 0) {

				let random = Math.floor(Math.random() * 39);
				cCoords_FIB = objetivos_FIB[random];

				if (objetivo_FIB && mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
				}

				let model = mp.game.joaat("prop_range_target_01");

				objetivo_FIB = mp.objects.new(model, new mp.Vector3(cCoords_FIB[0], cCoords_FIB[1], cCoords_FIB[2] + 1),
					{
						rotation: new mp.Vector3(0, 0, -45.2),
						alpha: 255,
						dimension: mp.players.local.dimension
					});
			}

			objetivos_restantes_FIB_1--;

			crearTimeout(ammunation_FIB_1, tiempo_de_intervalo_FIB);
		}
	}
}
function ammunation_FIB_2() {
	if (esta_empezado_FIB) {

		let random = Math.floor(Math.random() * 39);
		cCoords_FIB = objetivos_FIB[random];

		if (objetivo_FIB && mp.objects.exists(objetivo_FIB)) {
			objetivo_FIB.destroy();
		}

		let model = mp.game.joaat("prop_range_target_01");

		objetivo_FIB = mp.objects.new(model, new mp.Vector3(cCoords_FIB[0], cCoords_FIB[1], cCoords_FIB[2] + 1),
			{
				rotation: new mp.Vector3(0, 0, -45.2),
				alpha: 255,
				dimension: mp.players.local.dimension
			});
		objetivos_totales_aparecidos_FIB_2++;
		objetivosRestantesFIB--;

		crearTimeout(ammunation_FIB_2, tiempo_de_intervalo_FIB);
	}
}
function ammunation_FIB_3() {
	if (esta_empezado_FIB) {

		let random = Math.floor(Math.random() * 39);
		cCoords_FIB = objetivos_FIB[random];

		if (objetivo_FIB && mp.objects.exists(objetivo_FIB)) {
			objetivo_FIB.destroy();
		}

		let model = mp.game.joaat("prop_ped_gib_01");

		objetivo_FIB = mp.objects.new(model, new mp.Vector3(cCoords_FIB[0], cCoords_FIB[1], cCoords_FIB[2]),
			{
				rotation: new mp.Vector3(0, 0, 135),
				alpha: 255,
				dimension: mp.players.local.dimension
			});
		objetivos_totales_aparecidos_FIB_3++;
		objetivosRestantesFIB--;

		crearTimeout(ammunation_FIB_3, tiempo_de_intervalo_FIB);
	}
}
function ammunation_FIB_4() {
	if (esta_empezado_FIB) {

		let random = Math.floor(Math.random() * 39);
		cCoords_FIB = objetivos_FIB[random];

		if (objetivo_FIB && mp.objects.exists(objetivo_FIB)) {
			objetivo_FIB.destroy();
		}

		let model = mp.game.joaat("prop_ped_gib_01");

		objetivo_FIB = mp.objects.new(model, new mp.Vector3(cCoords_FIB[0], cCoords_FIB[1], cCoords_FIB[2]),
			{
				rotation: new mp.Vector3(0, 0, 135),
				alpha: 255,
				dimension: mp.players.local.dimension
			});
		objetivos_totales_aparecidos_FIB_4++;
		objetivosRestantesFIB--;

		crearTimeout(ammunation_FIB_4, tiempo_de_intervalo_FIB);
	}
}
function crearColshapesAmmunationFIB()
{
	colshapeFIB1 = mp.colshapes.newSphere(2486.0298, -394.09686, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB2 = mp.colshapes.newSphere(2486.0298, -394.09686, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB3 = mp.colshapes.newSphere(2484.5989, -392.5589, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB4 = mp.colshapes.newSphere(2483.9446, -391.80276, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB5 = mp.colshapes.newSphere(2483.2473, -391.08603, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB6 = mp.colshapes.newSphere(2482.55, -390.3693, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB7 = mp.colshapes.newSphere(2481.8528, -389.65256, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB8 = mp.colshapes.newSphere(2481.1555, -388.93582, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB9 = mp.colshapes.newSphere(2480.4583, -388.2191, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB10 = mp.colshapes.newSphere(2479.761, -387.50235, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB11 = mp.colshapes.newSphere(2479.0637, -386.7856, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB12 = mp.colshapes.newSphere(2478.3665, -386.06888, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB13 = mp.colshapes.newSphere(2477.6692, -385.35214, 82.694435, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
	colshapeFIB14 = mp.colshapes.newSphere(2488.6738, -390.1187, 82.69453, 0.9, (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));
}
function romperColshapesAmmunationFIB() {
	if (colshapeFIB1 != null && mp.colshapes.exists(colshapeFIB1)) {
		colshapeFIB1.destroy();
		colshapeFIB1 = null;
	}
	if (colshapeFIB2 != null && mp.colshapes.exists(colshapeFIB2)) {
		colshapeFIB2.destroy();
		colshapeFIB2 = null;
	}
	if (colshapeFIB3 != null && mp.colshapes.exists(colshapeFIB3)) {
		colshapeFIB3.destroy();
		colshapeFIB3 = null;
	}
	if (colshapeFIB4 != null && mp.colshapes.exists(colshapeFIB4)) {
		colshapeFIB4.destroy();
		colshapeFIB4 = null;
	}
	if (colshapeFIB5 != null && mp.colshapes.exists(colshapeFIB5)) {
		colshapeFIB5.destroy();
		colshapeFIB5 = null;
	}
	if (colshapeFIB6 != null && mp.colshapes.exists(colshapeFIB6)) {
		colshapeFIB6.destroy();
		colshapeFIB6 = null;
	}
	if (colshapeFIB7 != null && mp.colshapes.exists(colshapeFIB7)) {
		colshapeFIB7.destroy();
		colshapeFIB7 = null;
	}
	if (colshapeFIB8 != null && mp.colshapes.exists(colshapeFIB8)) {
		colshapeFIB8.destroy();
		colshapeFIB8 = null;
	}
	if (colshapeFIB9 != null && mp.colshapes.exists(colshapeFIB9)) {
		colshapeFIB9.destroy();
		colshapeFIB9 = null;
	}
	if (colshapeFIB10 != null && mp.colshapes.exists(colshapeFIB10)) {
		colshapeFIB10.destroy();
		colshapeFIB10 = null;
	}
	if (colshapeFIB11 != null && mp.colshapes.exists(colshapeFIB11)) {
		colshapeFIB11.destroy();
		colshapeFIB11 = null;
	}
	if (colshapeFIB12 != null && mp.colshapes.exists(colshapeFIB12)) {
		colshapeFIB12.destroy();
		colshapeFIB12 = null;
	}
	if (colshapeFIB13 != null && mp.colshapes.exists(colshapeFIB13)) {
		colshapeFIB13.destroy();
		colshapeFIB13 = null;
	}
	if (colshapeFIB14 != null && mp.colshapes.exists(colshapeFIB14)) {
		colshapeFIB14.destroy();
		colshapeFIB14 = null;
	}
}



/*
 * RENDER
 * */

mp.events.add("render", () => {

	/*
	* CYPRESS FLAT
	*/

	if (esta_empezado_cypressflat) {

		if (objetivos_restantes_cypressflat >= 0) {
			mp.events.call("hud:aviso", JSON.stringify([5, -1, `Objetivos restantes: ${objetivos_restantes_cypressflat} <br> Puntos: ${puntos_cypressflat} ${suma_puntos_CF}`]));
		}

		// Le obligamos a estar en una dimension definida (SU ID +1)
		if ((mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1) != player_local.dimension) mp.events.callRemote('cambiarDimension', (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));

		if (objetivos_restantes_cypressflat < 0) {

			romperColshapesAmmunationCypressFlat();

			mp.events.call("hud:cerrar_aviso_fijo");
			mp.game.ui.messages.showMidsizedShard("~g~ENTRENAMIENTO COMPLETADO", "", 2, false, true, 2000, false);

			let porcentajePuntosConseguidos = 0;

			if (objetivos_cypressflat && mp.objects.exists(objetivo_cypressflat)) {
				objetivo_cypressflat.destroy();
				objetivo_cypressflat = null;
			}

			cCoords_cypressflat = null;
			esta_empezado_cypressflat = false;
			suma_puntos_CF = "";

			porcentajePuntosConseguidos = (puntos_cypressflat * 100) / 200;

			crearTimeout(() => { // 

				mp.events.callRemote('ammunation:terminar_entrenamiento_cypressflat', armaElegidaCF, nivelElegidoCF, puntos_cypressflat, porcentajePuntosConseguidos.toFixed(2), weaponArmaCF);

				// Empezamos transicion de pantalla
				mp.game.cam.doScreenFadeOut(500);
				mp.events.call("hud:estado_hud");
				mp.game.ui.displayRadar(false);
				mp.game.ui.displayHud(false);
				mp.gui.chat.show(false);
				mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

				// Audio de que se esta recopilando las estadisticas
				mp.events.call("sound:play", "recopilandoestadisticas", false);

				// Le dejamos volver a usar las rueda de armas
				player_local.setCanSwitchWeapon(true);

				crearTimeout(() => { // Cuatro segundos después...
					mp.game.cam.doScreenFadeIn(2000);
					mp.events.call("hud:estado_hud");
					if(tipoMapa != 2) mp.game.ui.displayRadar(true);
					mp.game.ui.displayHud(true);
					mp.gui.chat.show(true);
					mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

					// Le limpiamos animacion de "modo ataque"
					player_local.clearTasksImmediately();
				}, 4000);

				crearTimeout(campoTiroFalse, 4000);				
			}, 2000);		
		}
	}
	if (objetivo_cypressflat) {

		if (ver_cajas_debug_cypressflat) {
			mp.game.graphics.drawBox(cCoords_cypressflat[0] + 0.07, cCoords_cypressflat[1] + 0.12, cCoords_cypressflat[2] - 0.27, cCoords_cypressflat[0] - 0.05, cCoords_cypressflat[1], cCoords_cypressflat[2] - 0.12, 255, 0, 0, 25);
			mp.game.graphics.drawBox(cCoords_cypressflat[0] + 0.12, cCoords_cypressflat[1] + 0.12, cCoords_cypressflat[2] - 0.36, cCoords_cypressflat[0] - 0.11, cCoords_cypressflat[1], cCoords_cypressflat[2] - 0.045, 0, 255, 0, 50);
			mp.game.graphics.drawBox(cCoords_cypressflat[0] + 0.18, cCoords_cypressflat[1] + 0.12, cCoords_cypressflat[2] - 0.44, cCoords_cypressflat[0] - 0.17, cCoords_cypressflat[1], cCoords_cypressflat[2] + 0.04, 0, 0, 255, 75);
			mp.game.graphics.drawBox(cCoords_cypressflat[0] + 0.24, cCoords_cypressflat[1] + 0.12, cCoords_cypressflat[2] - 0.52, cCoords_cypressflat[0] - 0.22, cCoords_cypressflat[1], cCoords_cypressflat[2] + 0.12, 255, 255, 255, 100);
		}

		if (objetivo_cypressflat.hasBeenDamagedBy(mp.players.local.handle, true)) {

			crearTimeout(() => {
				suma_puntos_CF = "";
			}, 500);

			if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_cypressflat[0] + 0.07, cCoords_cypressflat[1] + 0.12, cCoords_cypressflat[2] - 0.27, cCoords_cypressflat[0] - 0.05, cCoords_cypressflat[1], cCoords_cypressflat[2] - 0.12, true, true)) {
				puntos_cypressflat = puntos_cypressflat + 10;
				suma_puntos_CF = " + 10";
				mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
			}
			else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_cypressflat[0] + 0.12, cCoords_cypressflat[1] + 0.12, cCoords_cypressflat[2] - 0.36, cCoords_cypressflat[0] - 0.11, cCoords_cypressflat[1], cCoords_cypressflat[2] - 0.045, true, true)) {
				puntos_cypressflat = puntos_cypressflat + 9;
				suma_puntos_CF = " + 9";
				mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
			}
			else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_cypressflat[0] + 0.18, cCoords_cypressflat[1] + 0.12, cCoords_cypressflat[2] - 0.44, cCoords_cypressflat[0] - 0.17, cCoords_cypressflat[1], cCoords_cypressflat[2] + 0.04, true, true)) {
				puntos_cypressflat = puntos_cypressflat + 8;
				suma_puntos_CF = " + 8";
				mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
			}
			else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_cypressflat[0] + 0.24, cCoords_cypressflat[1] + 0.12, cCoords_cypressflat[2] - 0.52, cCoords_cypressflat[0] - 0.22, cCoords_cypressflat[1], cCoords_cypressflat[2] + 0.12, true, true)) {
				puntos_cypressflat = puntos_cypressflat + 7;
				suma_puntos_CF = " + 7";
				mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
			}
			if (mp.objects.exists(objetivo_cypressflat)) {
				objetivo_cypressflat.destroy();
				objetivo_cypressflat = null;
				cCoords_cypressflat = null;
			}
		}
	}


	/*
	* PILLBOX HILL
	*/

	if (esta_empezado_pillboxhill) {

		mp.events.call("hud:aviso", JSON.stringify([5, - 1, `Objetivos restantes: ${objetivosRestantesPH} <br> Objetivos derribados: ${objetivos_derribados_pillboxhill} ${suma_objetivo_derribado_pillboxhill}`]));

		// Le obligamos a estar en una dimension definida (SU ID +1)
		if ((mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1) != player_local.dimension) mp.events.callRemote('cambiarDimension', (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));

		if ((contador <= 0) && (objetivos_totales_aparecidos_pillboxhill >= objetivosQueDebenAparecerPH)) {

			romperColshapesAmmunationPillboxHill();

			mp.events.call("hud:cerrar_aviso_fijo");
			mp.game.ui.messages.showMidsizedShard("~g~ENTRENAMIENTO COMPLETADO", "", 2, false, true, 2000, false);

			let porcentajeObjetivosDerribados = 0;

			if (objetivo_pillboxhill && mp.objects.exists(objetivo_pillboxhill)) {
				objetivo_pillboxhill.destroy();
				objetivo_pillboxhill = null;
			}

			cCoords_pillboxhill = null;
			esta_empezado_pillboxhill = false;
			suma_objetivo_derribado_pillboxhill = "";

			porcentajeObjetivosDerribados = (objetivos_derribados_pillboxhill * 100) / objetivos_totales_aparecidos_pillboxhill;

			crearTimeout(() => { // 

				mp.events.callRemote('ammunation:terminar_entrenamiento_pillboxhill', armaElegidaPH, nivelElegidoPH, porcentajeObjetivosDerribados.toFixed(2), objetivos_derribados_pillboxhill, objetivos_totales_aparecidos_pillboxhill, weaponArmaPH);

				// Empezamos transicion de pantalla
				mp.game.cam.doScreenFadeOut(500);
				mp.events.call("hud:estado_hud");
				mp.game.ui.displayRadar(false);
				mp.game.ui.displayHud(false);
				mp.gui.chat.show(false);
				mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

				// Audio de que se esta recopilando las estadisticas
				mp.events.call("sound:play", "recopilandoestadisticas", false);

				// Le dejamos volver a usar las rueda de armas
				player_local.setCanSwitchWeapon(true);

				crearTimeout(() => { // Cuatro segundos después...
					mp.game.cam.doScreenFadeIn(2000);
					mp.events.call("hud:estado_hud");
					if(tipoMapa != 2) mp.game.ui.displayRadar(true);
					mp.game.ui.displayHud(true);
					mp.gui.chat.show(true);
					mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

					// Le limpiamos animacion de "modo ataque"
					player_local.clearTasksImmediately();
				}, 4000);

				crearTimeout(campoTiroFalse, 4000);
			}, 2000);		
		}
	}
	if (objetivo_pillboxhill) {

		if (objetivo_pillboxhill.hasBeenDamagedBy(mp.players.local.handle, true)) {

			crearTimeout(() => {
				suma_objetivo_derribado_pillboxhill = "";
			}, 500);

			objetivos_derribados_pillboxhill = objetivos_derribados_pillboxhill + 1;

			mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
			suma_objetivo_derribado_pillboxhill = " + 1"

			if (mp.objects.exists(objetivo_pillboxhill)) {
				objetivo_pillboxhill.destroy();
				objetivo_pillboxhill = null;
				cCoords_pillboxhill = null;
			}
		}
	}

	/*
	* FIB
	*/

	if (esta_empezado_FIB) {
		// Le obligamos a estar en una dimension definida (SU ID +1)
		if ((mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1) != player_local.dimension) mp.events.callRemote('cambiarDimension', (mp.controladorJugadores._jugadores[player_local.id].id_jugador + 1));

		if (modo_de_practica == 1) {

			if (objetivos_restantes_FIB_1 >= 0) {
				if (penalizado) {
					mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#E53935;'>PENALIZADO</span></strong>`]));
				} else {
					mp.events.call("hud:aviso", JSON.stringify([5, -1, `Objetivos restantes: ${objetivos_restantes_FIB_1} <br> Puntos: ${puntos_FIB_1} ${suma_puntos_FIB_1}`]));
                }
			}

			if (objetivos_restantes_FIB_1 <= 0) {

				// Rompemos la colshapes que hemos creado para que no se meta dentro de donde están las dianas
				romperColshapesAmmunationFIB();

				mp.events.call("hud:cerrar_aviso_fijo");
				if (penalizado) {
					mp.game.ui.messages.showMidsizedShard("~r~ENTRENAMIENTO PENALIZADO", "", 2, false, true, 2000, false);
				} else {
					mp.game.ui.messages.showMidsizedShard("~g~ENTRENAMIENTO COMPLETADO", "", 2, false, true, 2000, false);
				}
				
				let porcentajePuntosConseguidos = 0;

				if (objetivo_FIB && mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
					objetivo_FIB = null;
				}

				cCoords_FIB = null;
				esta_empezado_FIB = false;
				suma_puntos_FIB_1 = "";
				
				porcentajePuntosConseguidos = (puntos_FIB_1 * 100) / 200;

				crearTimeout(() => { // 

					mp.events.callRemote('ammunation:terminar_entrenamiento_FIB_1', armaElegidaFIB, nivelElegidoFIB, puntos_FIB_1, porcentajePuntosConseguidos.toFixed(2), weaponArmaFIB, penalizado);

					// Empezamos transicion de pantalla
					mp.game.cam.doScreenFadeOut(500);
					mp.events.call("hud:estado_hud");
					mp.game.ui.displayRadar(false);
					mp.game.ui.displayHud(false);
					mp.gui.chat.show(false);
					mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

					// Le dejamos volver a usar las rueda de armas
					player_local.setCanSwitchWeapon(true);

					// Ponemos a false la variable que guarda si fue penalizado o no
					penalizado = false;

					crearTimeout(() => { // Cuatro segundos después...
						mp.game.cam.doScreenFadeIn(2000);
						mp.events.call("hud:estado_hud");
						if(tipoMapa != 2) mp.game.ui.displayRadar(true);
						mp.game.ui.displayHud(true);
						mp.gui.chat.show(true);
						mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

						// Le limpiamos animacion de "modo ataque"
						player_local.clearTasksImmediately();

						// Seteamos las variables a sus valores por defecto por si vuelve hacer otra prueba no tenga problemas
						puntos_FIB_1 = 0;
						objetivos_restantes_FIB_1 = 20;
					}, 4000);

					crearTimeout(campoTiroFalse, 4000);

				}, 2000);
			}
		}
		if (modo_de_practica == 2) {

			if (penalizado) {
				mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#E53935;'>PENALIZADO</span></strong>`]));
			} else {
				mp.events.call("hud:aviso", JSON.stringify([5, - 1, `Objetivos restantes: ${objetivosRestantesFIB} <br> Objetivos derribados: ${objetivos_derribados_FIB_2} ${suma_objetivo_derribado_FIB_2}`]));
			}

			if ((contador <= 0) && (objetivos_totales_aparecidos_FIB_2 >= objetivosQueDebenAparecerFIB)) {

				// Rompemos la colshapes que hemos creado para que no se meta dentro de donde están las dianas
				romperColshapesAmmunationFIB();

				mp.events.call("hud:cerrar_aviso_fijo");
				if (penalizado) {
					mp.game.ui.messages.showMidsizedShard("~r~ENTRENAMIENTO PENALIZADO", "", 2, false, true, 2000, false);
				} else {
					mp.game.ui.messages.showMidsizedShard("~g~ENTRENAMIENTO COMPLETADO", "", 2, false, true, 2000, false);
				}

				let porcentajeObjetivosDerribados = 0;

				if (objetivo_FIB && mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
					objetivo_FIB = null;
				}

				cCoords_FIB = null;
				esta_empezado_FIB = false;
				suma_objetivo_derribado_FIB_2 = "";

				porcentajeObjetivosDerribados = (objetivos_derribados_FIB_2 * 100) / objetivos_totales_aparecidos_FIB_2;

				crearTimeout(() => { // 

					mp.events.callRemote('ammunation:terminar_entrenamiento_FIB_2', armaElegidaFIB, nivelElegidoFIB, porcentajeObjetivosDerribados.toFixed(2), objetivos_derribados_FIB_2, objetivos_totales_aparecidos_FIB_2, weaponArmaFIB, penalizado);

					// Empezamos transicion de pantalla
					mp.game.cam.doScreenFadeOut(500);
					mp.events.call("hud:estado_hud");
					mp.game.ui.displayRadar(false);
					mp.game.ui.displayHud(false);
					mp.gui.chat.show(false);
					mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

					// Le dejamos volver a usar las rueda de armas
					player_local.setCanSwitchWeapon(true);

					// Ponemos a false la variable que guarda si fue penalizado o no
					penalizado = false;

					crearTimeout(() => { // Cuatro segundos después...
						mp.game.cam.doScreenFadeIn(2000);
						mp.events.call("hud:estado_hud");
						if(tipoMapa != 2) mp.game.ui.displayRadar(true);
						mp.game.ui.displayHud(true);
						mp.gui.chat.show(true);
						mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

						// Le limpiamos animacion de "modo ataque"
						player_local.clearTasksImmediately();

						// Seteamos las variables a sus valores por defecto por si vuelve hacer otra prueba no tenga problemas
						objetivos_derribados_FIB_2 = 0;
						objetivos_totales_aparecidos_FIB_2 = 0;
						contador = 30;
					}, 4000);

					crearTimeout(campoTiroFalse, 4000);

				}, 2000);
			}
		}

		if (modo_de_practica == 3) {

			if (penalizado) {
				mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#E53935;'>PENALIZADO</span></strong>`]));
			} else {
				mp.events.call("hud:aviso", JSON.stringify([5, - 1, `Objetivos restantes: ${objetivosRestantesFIB} <br> Objetivos derribados: ${cabezas_derribadas_FIB_3} ${suma_objetivo_derribado_FIB_3}`]));
			}
			
			if ((contador <= 0) && (objetivos_totales_aparecidos_FIB_3 >= objetivosQueDebenAparecerFIB)) {

				// Rompemos la colshapes que hemos creado para que no se meta dentro de donde están las dianas
				romperColshapesAmmunationFIB();

				mp.events.call("hud:cerrar_aviso_fijo");
				if (penalizado) {
					mp.game.ui.messages.showMidsizedShard("~r~ENTRENAMIENTO PENALIZADO", "", 2, false, true, 2000, false);
				} else {
					mp.game.ui.messages.showMidsizedShard("~g~ENTRENAMIENTO COMPLETADO", "", 2, false, true, 2000, false);
				}

				let porcentajeCabezasDerribadas = 0;

				if (objetivo_FIB && mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
					objetivo_FIB = null;
				}

				cCoords_FIB = null;
				esta_empezado_FIB = false;
				suma_objetivo_derribado_FIB_3 = "";

				porcentajeCabezasDerribadas = (cabezas_derribadas_FIB_3 * 100) / objetivos_totales_aparecidos_FIB_3;

				crearTimeout(() => { // 

					mp.events.callRemote('ammunation:terminar_entrenamiento_FIB_3', armaElegidaFIB, nivelElegidoFIB, porcentajeCabezasDerribadas.toFixed(2), cabezas_derribadas_FIB_3, objetivos_totales_aparecidos_FIB_3, weaponArmaFIB, penalizado);

					// Empezamos transicion de pantalla
					mp.game.cam.doScreenFadeOut(500);
					mp.events.call("hud:estado_hud");
					mp.game.ui.displayRadar(false);
					mp.game.ui.displayHud(false);
					mp.gui.chat.show(false);
					mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

					// Le dejamos volver a usar las rueda de armas
					player_local.setCanSwitchWeapon(true);

					// Ponemos a false la variable que guarda si fue penalizado o no
					penalizado = false;

					crearTimeout(() => { // Cuatro segundos después...
						mp.game.cam.doScreenFadeIn(2000);
						mp.events.call("hud:estado_hud");
						if(tipoMapa != 2) mp.game.ui.displayRadar(true);

						mp.game.ui.displayHud(true);
						mp.gui.chat.show(true);
						mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

						// Le limpiamos animacion de "modo ataque"
						player_local.clearTasksImmediately();

						// Seteamos las variables a sus valores por defecto por si vuelve hacer otra prueba no tenga problemas
						cabezas_derribadas_FIB_3 = 0;
						objetivos_totales_aparecidos_FIB_3 = 0;
						contador = 30;
					}, 4000);

					crearTimeout(campoTiroFalse, 4000);

				}, 2000);
			}
		}

		if (modo_de_practica == 4) {

			if (penalizado) {
				mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#E53935;'>PENALIZADO</span></strong>`]));
			} else {
				mp.events.call("hud:aviso", JSON.stringify([5, - 1, `Objetivos restantes: ${objetivosRestantesFIB} <br> Tiros en zona no letal: ${NO_LETAL_derribados_FIB_4} ${suma_NO_LETAL_derribado_FIB_4}`]));
			}

			if ((contador <= 0) && (objetivos_totales_aparecidos_FIB_4 >= objetivosQueDebenAparecerFIB)) {

				// Rompemos la colshapes que hemos creado para que no se meta dentro de donde están las dianas
				romperColshapesAmmunationFIB();

				mp.events.call("hud:cerrar_aviso_fijo");
				if (penalizado) {
					mp.game.ui.messages.showMidsizedShard("~r~ENTRENAMIENTO PENALIZADO", "", 2, false, true, 2000, false);
				} else {
					mp.game.ui.messages.showMidsizedShard("~g~ENTRENAMIENTO COMPLETADO", "", 2, false, true, 2000, false);
				}

				if (objetivo_FIB && mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
					objetivo_FIB = null;
				}

				cCoords_FIB = null;
				esta_empezado_FIB = false;
				suma_objetivo_derribado_FIB_4 = "";
		
				crearTimeout(() => { // 

					mp.events.callRemote('ammunation:terminar_entrenamiento_FIB_4', armaElegidaFIB, nivelElegidoFIB, LETAL_derribados_FIB_4, NO_LETAL_derribados_FIB_4, objetivos_totales_aparecidos_FIB_4, weaponArmaFIB, penalizado);

					// Empezamos transicion de pantalla
					mp.game.cam.doScreenFadeOut(500);
					mp.events.call("hud:estado_hud");
					mp.game.ui.displayRadar(false);
					mp.game.ui.displayHud(false);
					mp.gui.chat.show(false);
					mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

					// Le dejamos volver a usar las rueda de armas
					player_local.setCanSwitchWeapon(true);

					// Ponemos a false la variable que guarda si fue penalizado o no
					penalizado = false;

					crearTimeout(() => { // Cuatro segundos después...
						mp.game.cam.doScreenFadeIn(2000);
						mp.events.call("hud:estado_hud");
						if(tipoMapa != 2) mp.game.ui.displayRadar(true);

						mp.game.ui.displayHud(true);
						mp.gui.chat.show(true);
						mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

						// Le limpiamos animacion de "modo ataque"
						player_local.clearTasksImmediately();

						// Seteamos las variables a sus valores por defecto por si vuelve hacer otra prueba no tenga problemas
						LETAL_derribados_FIB_4 = 0;
						NO_LETAL_derribados_FIB_4 = 0;
						objetivos_totales_aparecidos_FIB_4 = 0;
						contador = 30;
					}, 4000);

					crearTimeout(campoTiroFalse, 4000);

				}, 2000);
			}
		}
	}

	if (objetivo_FIB) {
		if (modo_de_practica == 1) {
			if (ver_cajas_debug_FIB_1) {
				mp.game.graphics.drawBox (cCoords_FIB[0]+0.07, cCoords_FIB[1]+0.04, cCoords_FIB[2]-0.27, cCoords_FIB[0]-0.035, cCoords_FIB[1]-0.045, cCoords_FIB[2]-0.12, 255, 0, 0, 125);
				mp.game.graphics.drawBox (cCoords_FIB[0]+0.12, cCoords_FIB[1]+0.08, cCoords_FIB[2]-0.36, cCoords_FIB[0]-0.1, cCoords_FIB[1]-0.085, cCoords_FIB[2]-0.045, 0, 255, 0, 100);
				mp.game.graphics.drawBox (cCoords_FIB[0]+0.18, cCoords_FIB[1]+0.12, cCoords_FIB[2]-0.44, cCoords_FIB[0]-0.17, cCoords_FIB[1]-0.125, cCoords_FIB[2]+0.04, 0, 0, 255, 75);
				mp.game.graphics.drawBox (cCoords_FIB[0]+0.24, cCoords_FIB[1]+0.16, cCoords_FIB[2]-0.52, cCoords_FIB[0]-0.2, cCoords_FIB[1]-0.165, cCoords_FIB[2]+0.12, 255, 255, 255, 50);
			}

			if (objetivo_FIB.hasBeenDamagedBy(mp.players.local.handle, true)) {

				crearTimeout(() => {
					suma_puntos_FIB_1 = "";
				}, 500);

				if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] + 0.07, cCoords_FIB[1] + 0.04, cCoords_FIB[2] - 0.27, cCoords_FIB[0] - 0.035, cCoords_FIB[1] - 0.045, cCoords_FIB[2] - 0.12, true, true)) {
					puntos_FIB_1 = puntos_FIB_1 + 10;
					suma_puntos_FIB_1 = " + 10";
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] + 0.12, cCoords_FIB[1] + 0.08, cCoords_FIB[2] - 0.36, cCoords_FIB[0] - 0.1, cCoords_FIB[1] - 0.085, cCoords_FIB[2] - 0.045, true, true)) {
					puntos_FIB_1 = puntos_FIB_1 + 9;
					suma_puntos_FIB_1 = " + 9";
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] + 0.18, cCoords_FIB[1] + 0.12, cCoords_FIB[2] - 0.44, cCoords_FIB[0] - 0.17, cCoords_FIB[1] - 0.125, cCoords_FIB[2] + 0.04, true, true)) {
					puntos_FIB_1 = puntos_FIB_1 + 8;
					suma_puntos_FIB_1 = " + 8";
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] + 0.24, cCoords_FIB[1] + 0.16, cCoords_FIB[2] - 0.52, cCoords_FIB[0] - 0.2, cCoords_FIB[1] - 0.165, cCoords_FIB[2] + 0.12, true, true)) {
					puntos_FIB_1 = puntos_FIB_1 + 7;
					suma_puntos_FIB_1 = " + 7";
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				if (mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
					objetivo_FIB = null;
					cCoords_FIB = null;
				}
			}
		}

		if (modo_de_practica == 2) {

			if (objetivo_FIB.hasBeenDamagedBy(mp.players.local.handle, true)) {

				crearTimeout(() => {
					suma_objetivo_derribado_FIB_2 = "";
				}, 500);

				objetivos_derribados_FIB_2 = objetivos_derribados_FIB_2 + 1;
				suma_objetivo_derribado_FIB_2 = " + 1"
				mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				if (mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
					objetivo_FIB = null;
					cCoords_FIB = null;
				}
			}
		}

		if (modo_de_practica == 3) {
			if (ver_cajas_debug_FIB_3) {
				mp.game.graphics.drawBox (cCoords_FIB[0]+0.19, cCoords_FIB[1]+0.19, cCoords_FIB[2]+0.92, cCoords_FIB[0]-0.19, cCoords_FIB[1]-0.19, cCoords_FIB[2]+0.66, 255, 0, 0, 125);
			}

			if (objetivo_FIB.hasBeenDamagedBy(mp.players.local.handle, true)) {

				crearTimeout(() => {
					suma_objetivo_derribado_FIB_3 = "";
				}, 500);

				if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] + 0.19, cCoords_FIB[1] + 0.19, cCoords_FIB[2] + 0.92, cCoords_FIB[0] - 0.19, cCoords_FIB[1] - 0.19, cCoords_FIB[2] + 0.66, true, true)) {
					cabezas_derribadas_FIB_3 = cabezas_derribadas_FIB_3 + 1;
					suma_objetivo_derribado_FIB_3 = " + 1";
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				if (mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
					objetivo_FIB = null;
					cCoords_FIB = null;
				}
			}
		}

		if (modo_de_practica == 4) {
			if (ver_cajas_debug_FIB_4) {
				mp.game.graphics.drawBox (cCoords_FIB[0]+0.3, cCoords_FIB[1]+0.3, cCoords_FIB[2]+0.07, cCoords_FIB[0]-0.3, cCoords_FIB[1]-0.3, cCoords_FIB[2]-1.1, 255, 0, 0, 100); // ZONA NO LETAL. CADERA Y PIERNAS
				mp.game.graphics.drawBox (cCoords_FIB[0]+0.5, cCoords_FIB[1]-0.1, cCoords_FIB[2]+0.6, cCoords_FIB[0], cCoords_FIB[1]-0.5, cCoords_FIB[2]-0.12, 255, 0, 0, 100); // ZONA NO LETAL. BRAZO IZQUIERDO			
				mp.game.graphics.drawBox (cCoords_FIB[0]-0.1, cCoords_FIB[1]+0.5, cCoords_FIB[2]+0.58, cCoords_FIB[0]-0.5, cCoords_FIB[1]+0.15, cCoords_FIB[2]-0.12, 255, 0, 0, 100); // ZONA NO LETAL. BRAZO DERECHO				
				mp.game.graphics.drawBox (cCoords_FIB[0]-0.6, cCoords_FIB[1]-0.17, cCoords_FIB[2], cCoords_FIB[0]+0.6, cCoords_FIB[1]+0.19, cCoords_FIB[2]+1.1, 255, 0, 0, 100); // ZONA LETAL. TORSO Y CABEZA
			}

			if (objetivo_FIB.hasBeenDamagedBy(mp.players.local.handle, true)) {

				crearTimeout(() => {
					suma_NO_LETAL_derribado_FIB_4 = "";
				}, 500);

				if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] + 0.3, cCoords_FIB[1] + 0.3, cCoords_FIB[2] + 0.07, cCoords_FIB[0] - 0.3, cCoords_FIB[1] - 0.3, cCoords_FIB[2] - 1.1, true, true)) {
					NO_LETAL_derribados_FIB_4 = NO_LETAL_derribados_FIB_4 + 1;
					suma_NO_LETAL_derribado_FIB_4 = " + 1";
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] + 0.5, cCoords_FIB[1] - 0.1, cCoords_FIB[2] + 0.6, cCoords_FIB[0], cCoords_FIB[1] - 0.5, cCoords_FIB[2] - 0.12, true, true)) {
					NO_LETAL_derribados_FIB_4 = NO_LETAL_derribados_FIB_4 + 1;
					suma_NO_LETAL_derribado_FIB_4 = " + 1";
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] - 0.1, cCoords_FIB[1] + 0.5, cCoords_FIB[2] + 0.58, cCoords_FIB[0] - 0.5, cCoords_FIB[1] + 0.15, cCoords_FIB[2] - 0.12, true, true)) {
					NO_LETAL_derribados_FIB_4 = NO_LETAL_derribados_FIB_4 + 1;
					suma_NO_LETAL_derribado_FIB_4 = " + 1";
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				else if (mp.game.gameplay.hasBulletImpactedInBox(cCoords_FIB[0] - 0.6, cCoords_FIB[1] - 0.17, cCoords_FIB[2], cCoords_FIB[0] + 0.6, cCoords_FIB[1] + 0.19, cCoords_FIB[2] + 1.1, true, true)) {
					LETAL_derribados_FIB_4 = LETAL_derribados_FIB_4 + 1;
					mp.game.audio.playSoundFromCoord(-1, "Mission_Pass_Notify", player_local.position.x, player_local.position.y, player_local.position.z, "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", false, 0, false);
				}
				if (mp.objects.exists(objetivo_FIB)) {
					objetivo_FIB.destroy();
					objetivo_FIB = null;
					cCoords_FIB = null;
				}
			}
		}
	}
});



/*
 * DEBUG
 * */

if (ver_objetivos_cypressflat) {

	// NIVEL 1
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(815.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(816.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(817.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(818.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(819.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(820.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(821.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(822.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(823.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(824.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(825.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(826.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(827.58141113281, -2171.3816894531, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});

	// NIVEL 2
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(815.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(816.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(817.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(818.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(819.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(820.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(821.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(822.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(823.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(824.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(825.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(826.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(827.5860134667969, -2180.5102539063, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});

	// NIVEL 3		
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(815.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(816.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(817.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(818.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(819.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(820.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(821.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(822.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(823.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(824.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(825.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(826.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(827.57416699219, -2191.6252441406, 30.23 + 1),
		{
			rotation: new mp.Vector3(0, 0, 2.3),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
}
if (ver_objetivos_pillboxhill) {

	// NIVEL 1
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(10.50, -1087.98, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(11.44167, -1088.31667, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(12.38334, -1088.65334, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(13.325, -1088.99, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(14.26667, -1089.32667, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(15.20834, -1089.66334, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(16.15, -1090.00, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(17.09167, -1090.336677, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(18.03334, -1090.67334, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(18.975, -1091.05, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(19.91667, -1091.38667, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(20.85834, -1091.72334, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(21.80, -1092.10, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});

	// NIVEL 2
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(13.655, -1079.426, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(14.59583, -1079.76933, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(15.53666, -1080.11266, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(16.47750, -1080.456, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(17.41833, -1080.79933, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(18.35916, -1081.14266, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(19.300, -1081.486, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(20.24083, -1081.829, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(21.18166, -1082.173, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(22.12250, -1082.516, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(23.06333, -1082.859, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(24.00416, -1083.20266, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(24.945, -1083.546, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});

	// NIVEL 3
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(17.400, -1068.970, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(18.34292, -1069.31250, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(19.28584, -1069.655, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(20.22875, -1069.9975, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(21.17167, -1070.34, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(22.11459, -1070.6825, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(23.05750, -1071.025, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(24.00042, -1071.3675, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(24.94334, -1071.710, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(25.88625, -1072.05250, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(26.82887, -1072.395, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(27.77179, -1072.7375, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(28.715, -1073.080, 30.37 + 1),
		{
			rotation: new mp.Vector3(0, 0, 161),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
}
if (ver_objetivos_FIB) {
	// NIVEL 1
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2481.43, -398.41, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2480.72, -397.7, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2480.01, -396.99, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2479.30, -396.28, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2478.59, -395.57, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2477.88, -394.86, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2477.16, -394.15, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2476.45, -393.44, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2475.74, -392.73, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2475.03, -392.03, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2474.32, -391.32, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2473.61, -390.61, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2472.9, -389.9, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});

	// NIVEL 2
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2474.96, -404.9, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2474.251, -404.19, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2473.542, -403.48, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2472.833, -402.77, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2472.124, -402.06, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2471.415, -401.35, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2470.705, -400.64, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2469.997, -399.93, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2469.288, -399.22, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2468.578, -398.51, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2467.87, -397.8, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2467.161, -397.09, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2466.452, -396.38, 84.3),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});

	// NIVEL 3
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2467.13, -412.75, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2466.419, -412.035, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2465.708, -411.320, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2464.998, -410.604, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2464.286, -409.89, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2463.575, -409.175, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2462.865, -408.485, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2462.153, -407.745, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2461.442, -407.03, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2460.733, -406.353, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2460.02, -405.60, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2459.309, -404.885, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
	mp.objects.new(mp.game.joaat("prop_range_target_01"), new mp.Vector3(2458.6, -404.22, 84.075),
		{
			rotation: new mp.Vector3(0, 0, -45.2),
			alpha: 255,
			dimension: mp.players.local.dimension
		});
}

mp.events.add("ammunation:campotiro_transicionpantalla", () => {

	mp.game.cam.doScreenFadeOut(800)
	mp.events.call("hud:estado_hud");
	mp.game.ui.displayRadar(false);
	mp.game.ui.displayHud(false);
	mp.gui.chat.show(false);
	mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

});

}