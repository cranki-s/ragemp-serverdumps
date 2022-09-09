{
/* --------------------------------------------------------------------------------
 * global.js
 *
 * Autor: Kenshin
 *
 * Descripción: Funciones varias
 *
 * -------------------------------------------------------------------------------- */
var opciones = require('/LURP/opciones');//

//Cuando nos quedamos sin municion no podra disparar ni la guardara
mp.game1.weapon.unequipEmptyWeapons = false;

var Natives = {
    IS_RADAR_HIDDEN: "0x157F93B036700462",
    IS_RADAR_ENABLED: "0xAF754F20EB5CD51A",
    SET_TEXT_OUTLINE: "0x2513DFB0FB8400FE",
    ACTIVATE_ROCKSTAR_EDITOR: "0x49DA8145672B2725",
    START_RECORDING: "0xC3AC2FFF9612AC81",
    STOP_RECORDING_AND_SAVE_CLIP: "0x071A5197D6AFC8B3"
};

// Variables globales para el funcionamiento de NATIVEUI
var NativeUI = require('/LURP/menus/nativeui/index.js');
var Menu = NativeUI.Menu;
var UIMenuItem = NativeUI.UIMenuItem;
var UIMenuListItem = NativeUI.UIMenuListItem;
var UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
var UIMenuSliderItem = NativeUI.UIMenuSliderItem;
var BadgeStyle = NativeUI.BadgeStyle;
var Point = NativeUI.Point;
var ItemsCollection = NativeUI.ItemsCollection;
var Color = NativeUI.Color;
var ListItem = NativeUI.ListItem;
var BindMenuToItem = NativeUI.BindMenuToItem;
var BannerSprite = NativeUI.BannerSprite;

//Variables globales en todo el cliente
var _VERSION = " ";
var _NOSV = 0;
var pararCiclo = false;
var purga = false;
var inocente = false; // Solo activar el día de los inocentes (28 de Diciembre) | Activa cosas troll pero que no influyen en el juego.
var juego = null;
var menuAbierto = false;
var bloqueoTeclas = false; // Para bloquear la ejecucion del Enter o Backspace al cerrar un nativeui usando esas teclas
var blockGuion = true;
var congelado = false;
var gasolina = 100;
var kilometros = 0.0;
var antiflood_envio = true;
var navegador = null;
var navegador_ocultarChat = false;
var logueado = false;
var camara = null;
var en_camaraheli = false;
var estaChatAbierto = false;
var nombre_usuario = "Desconocido";
var id_pj = 0;
var nombre_pj = "Desconocido";
var personaje_id = 0;
var inventario = [];
var vehiculos = [];
var peds_negocios = [];
var peds_facciones = {};
var facciones = [];
var territorios = [];
var posiciones_ped_robar_vehiculo = [];
var icono_clima = "";
var temperatura = 0;
var propiedad_id = 0;
var dimension_real = 0; // La dimension establecida por el servidor, usada para el "autofix automatico"
var particula_regadera = null;
var lata_spray = null;
var particula_pulverizador = null;
var multas = [];
var puntosrol_positivos = 0;
var puntosrol_negativos = 0;
//var hudOculto = false;
var radiohablando = false;
var vozactiva = false;
var hablando = false;
var player_local = mp.players.local;
var en_interior = 0;
var estaMuerto = false;
var floodboton = null;
var tamanoChat = 12;
var tiempoChat = 40;
var cefpuede_cerrar = false;
var cantidad_cefs = 0;
var mostrar_texto_cabeza = true;
var mostrar_texto_objetos = true;
//Funciones globales para todo el cliente
var blockedClasses = [13, 14, 15, 16, 21]; // https://wiki.rage.mp/index.php?title=Vehicle_Classes
var sinVentanas = [8, 13, 14, 16, 21]; // https://wiki.rage.mp/index.php?title=Vehicle_Classes
var sinRadio = [13, 18, 21]; // https://wiki.rage.mp/index.php?title=Vehicle_Classes
var tipoMapa = 0;
var tiempo_payday = 0;
var tiempo_prision = null;
var tiempo_drogas = 0;

var apiUrl = null;
var apiKey = null;
var _k = null;
var wsBranch = null;
var puerto = 0;

var canalradio = null;
var adminservicio = false;
var miembroStaff = false;
var prision = false;
var autoPilotActivatedVeh = false;
var autoPilotActivated = false;
var nivelAdmin = -1;
var vikens = 0;
var teclasExtra = false;
var inventarioExtra = false;

var limitador_autolavado = false;

var montado = false;
var federalLockdown = false;

var buses = 0;
var taxis = 0;

var faccion = 0;
var trabajos = [];
var negociosJug = [];
var propiedadesJug = [];

var objetosSuelo = {};

var esposado = false;
var personalizando = false;
// Variables para el sistema de cultivos (cultivos.js)
var plantas = [];
var distanciaPermitidaEntrePlantayPlanta = 3.0;
var interactuandoConPlanta = false

var gasolineras = [];
var cajeros = [];
var interiores = {};
var negocios = [];
var propiedades = [];
var garajes = [
    { "ascensor_pos_exterior": new mp.Vector3(470.4775, -984.8336, 30.6896), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 0.0), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(-1536.768, -578.5033, 25.70781), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, 0.0), "ascensor_dimension_interior": 536 },
    { "ascensor_pos_exterior": new mp.Vector3(818.4575, -1374.978, 26.3091), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 2.098926), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 812 },
    { "ascensor_pos_exterior": new mp.Vector3(818.4575, -1374.978, 26.3091), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 0.0), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(0.0, 0.0, 0.0), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, 0.0), "ascensor_dimension_interior": 0 },
    { "ascensor_pos_exterior": new mp.Vector3(-1577.691, -563.6797, 108.523), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 122.082), "ascensor_dimension_exterior": 849, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 847 },
    { "ascensor_pos_exterior": new mp.Vector3(147.4132, -1113.571, 29.30521), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 87.3827), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 813 },
    { "ascensor_pos_exterior": new mp.Vector3(617.8771, -23.63827, 82.7806), "ascensor_rot_exterior": new mp.Vector3(0, 0, 267.7407), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 537 },
    { "ascensor_pos_exterior": new mp.Vector3(445.8928, -998.4269, 30.68933), "ascensor_rot_exterior": new mp.Vector3(0, 0, 1.843511), "ascensor_dimension_exterior": 538, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 538 },
    { "ascensor_pos_exterior": new mp.Vector3(818.4575, -1374.978, 26.3091), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 2.098926), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(-1536.768, -578.5033, 25.70781), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, 0.0), "ascensor_dimension_interior": 538 },
    { "ascensor_pos_exterior": new mp.Vector3(-1137.134, -199.2777, 37.96), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 190.0942), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(1380.065, 259.4124, -48.99381), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, 176.6094), "ascensor_dimension_interior": 2 },
    { "ascensor_pos_exterior": new mp.Vector3(-959.9196, -294.1023, 38.51313), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 297.2561), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(1380.065, 259.4124, -48.99381), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, 176.6094), "ascensor_dimension_interior": 4 },
    { "ascensor_pos_exterior": new mp.Vector3(-82.95149, -1399.508, 29.32077), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 174.61), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(1380.065, 259.4124, -48.99381), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, 176.6094), "ascensor_dimension_interior": 5 },
    { "ascensor_pos_exterior": new mp.Vector3(1194.245, 2722.233, 38.62724), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 0.298549), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 539 },
    { "ascensor_pos_exterior": new mp.Vector3(975.1787, 2490.356, 50.62693), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 174.5315), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 540 },
    { "ascensor_pos_exterior": new mp.Vector3(371.5861, -1612.73, 29.29204), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 318.4238), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 541 },
    { "ascensor_pos_exterior": new mp.Vector3(-480.9648, 6010.248, 31.28745), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 46.2352), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(-1536.768, -578.5033, 25.70781), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, 0.0), "ascensor_dimension_interior": 542 },
    { "ascensor_pos_exterior": new mp.Vector3(-1077.952, -254.5284, 37.76331), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 23.14591), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 7 },
    { "ascensor_pos_exterior": new mp.Vector3(-713.54, -2267.496, 88.75677), "ascensor_rot_exterior": new mp.Vector3(0.0, 0.0, 356.9269), "ascensor_dimension_exterior": 0, "ascensor_pos_interior": new mp.Vector3(125.2041, -742.2153, 33.13332), "ascensor_rot_interior": new mp.Vector3(0.0, 0.0, -22.4526), "ascensor_dimension_interior": 8 },
];
var ascensores= [
    { "ascensor_centro": new mp.Vector3(2504.386, -342.0772, 94.09238), "ascensor_botonera": new mp.Vector3(2502.944, -342.2, 94.09238), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2502.079, -339.7787, 94.09237), "ascensor_botonera": new mp.Vector3(2500.642, -339.8778, 94.09237), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2494.973, -346.8805, 94.09237), "ascensor_botonera": new mp.Vector3(2496.354, -347.0034, 94.09237), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2497.232, -349.2548, 94.09237), "ascensor_botonera": new mp.Vector3(2498.697, -349.289, 94.09237), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2504.386, -342.0772, 101.8933), "ascensor_botonera": new mp.Vector3(2502.944, -342.2, 101.8933), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2502.079, -339.7787, 101.8933), "ascensor_botonera": new mp.Vector3(2500.642, -339.8778, 101.8933), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2494.973, -346.8805, 101.8933), "ascensor_botonera": new mp.Vector3(2496.354, -347.0034, 101.8933), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2497.232, -349.2548, 101.8933), "ascensor_botonera": new mp.Vector3(2498.697, -349.289, 101.8933), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2504.386, -342.0772, 105.6866), "ascensor_botonera": new mp.Vector3(2502.944, -342.2, 105.6866), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2502.079, -339.7787, 105.6866), "ascensor_botonera": new mp.Vector3(2500.642, -339.8778, 105.6866), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2494.973, -346.8805, 105.6904), "ascensor_botonera": new mp.Vector3(2496.354, -347.0034, 105.6904), "ubicacion": "FIB1"}, // FIB 1
    { "ascensor_centro": new mp.Vector3(2497.232, -349.2548, 105.6904), "ascensor_botonera": new mp.Vector3(2498.697, -349.289, 105.6904), "ubicacion": "FIB1" }, // FIB 1

    { "ascensor_centro": new mp.Vector3(2504.3916, -433.23618, 99.11225), "ascensor_botonera": new mp.Vector3(2505.815, -433.1461, 99.11225), "ubicacion": "FIB2" }, // FIB 2
    { "ascensor_centro": new mp.Vector3(2504.3916, -433.23618, 106.9129), "ascensor_botonera": new mp.Vector3(2505.815, -433.1461, 106.9129), "ubicacion": "FIB2" }, // FIB 2

    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 38.2432), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 38.2432), "ubicacion": "Comisaria Vespucci 1"}, // Comisaria Vespucci 1
    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 34.36075), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 34.36075), "ubicacion": "Comisaria Vespucci 1"}, // Comisaria Vespucci 1
    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 30.757141), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 30.757141), "ubicacion": "Comisaria Vespucci 1"}, // Comisaria Vespucci 1
    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 26.827583), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 26.827583), "ubicacion": "Comisaria Vespucci 1"}, // Comisaria Vespucci 1
    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 23.038637), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 23.038637), "ubicacion": "Comisaria Vespucci 1"}, // Comisaria Vespucci 1
    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 19.001205), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 19.001205), "ubicacion": "Comisaria Vespucci 1"}, // Comisaria Vespucci 1
    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 13.6873665), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 13.6873665), "ubicacion": "Comisaria Vespucci 1"}, // Comisaria Vespucci 1
    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 10.276635), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 10.276635), "ubicacion": "Comisaria Vespucci 1"}, // Comisaria Vespucci 1
    { "ascensor_centro": new mp.Vector3(-1096.1172, -850.3819, 4.884179), "ascensor_botonera": new mp.Vector3(-1097.7905, -849.9091, 4.884179), "ubicacion": "Comisaria Vespucci 1" }, // Comisaria Vespucci 1

    { "ascensor_centro": new mp.Vector3(-1066.022, -833.74133, 27.036465), "ascensor_botonera": new mp.Vector3(-1067.7045, -833.2471, 27.036465), "ubicacion": "Comisaria Vespucci 2" }, // Comisaria Vespucci 2 - Planta 3
    { "ascensor_centro": new mp.Vector3(-1066.022, -833.74133, 19.035643), "ascensor_botonera": new mp.Vector3(-1067.7045, -833.2471, 19.035643), "ubicacion": "Comisaria Vespucci 2" }, // Comisaria Vespucci 2 - Planta 1
    { "ascensor_centro": new mp.Vector3(-1066.022, -833.74133, 14.882768), "ascensor_botonera": new mp.Vector3(-1067.7045, -833.2471, 14.882768), "ubicacion": "Comisaria Vespucci 2" }, // Comisaria Vespucci 2 - Planta -3
    { "ascensor_centro": new mp.Vector3(-1066.022, -833.74133, 11.03725), "ascensor_botonera": new mp.Vector3(-1067.7045, -833.2471, 11.03725), "ubicacion": "Comisaria Vespucci 2" }, // Comisaria Vespucci 2 - Planta -2
    { "ascensor_centro": new mp.Vector3(-1066.022, -833.74133, 5.479814), "ascensor_botonera": new mp.Vector3(-1067.7045, -833.2471, 5.479814), "ubicacion": "Comisaria Vespucci 2" }, // Comisaria Vespucci 2 - Planta -1

    { "ascensor_centro": new mp.Vector3(-573.0352, -135.84616, 47.919056), "ascensor_botonera": new mp.Vector3(-574.2925, -135.51299, 47.919056), "ubicacion": "Comisaria Rockford Hills" }, // Comisaria Rockford Hills - Planta 3
    { "ascensor_centro": new mp.Vector3(-572.8622, -135.82976, 42.867416), "ascensor_botonera": new mp.Vector3(-574.11597, -135.42732, 42.867416), "ubicacion": "Comisaria Rockford Hills" }, // Comisaria Rockford Hills - Planta 2
    { "ascensor_centro": new mp.Vector3(-572.9945, -129.20457, 38.41052), "ascensor_botonera": new mp.Vector3(-571.721, -129.6116, 38.41053), "ubicacion": "Comisaria Rockford Hills" }, // Comisaria Rockford Hills - Planta 1
];

var ammunations = [
    { "nombre": "Phillbox Hill", "posicion": new mp.Vector3(22.05738, -1106.914, 29.79703) },
    { "nombre": "La Mesa", "posicion": new mp.Vector3(842.5709, -1033.869, 28.19486) },
    { "nombre": "Cypress Flats", "posicion": new mp.Vector3(810.4271, -2157.571, 29.619) },
    { "nombre": "Morningwood", "posicion": new mp.Vector3(-1305.678, -394.1169, 36.69577) },
    { "nombre": "Chumash", "posicion": new mp.Vector3(-3172.185, 1087.419, 20.83873) },
    { "nombre": "Río Zancudo", "posicion": new mp.Vector3(-1118.142, 2698.353, 18.55413) },
    { "nombre": "Sandy Shores", "posicion": new mp.Vector3(1693.435, 3759.874, 34.70531) },
    { "nombre": "Montañas Tataviam", "posicion": new mp.Vector3(2568.212, 294.2726, 108.7349) },
    { "nombre": "Paleto Bay", "posicion": new mp.Vector3(-330.6808, 6083.538, 31.45477) },
    { "nombre": "Little Seoul", "posicion": new mp.Vector3(-662.2412, -935.2114, 21.82922) },
    { "nombre": "Hawick", "posicion": new mp.Vector3(252.2426, -50.07045, 69.94109) },
];
var posicionesAvatar = [
    { "nombre": "Ayuntamiento Los Santos", "posicion": new mp.Vector3(-531.5369, -182.80406, 38.222427) },
    { "nombre": "Ayuntamiento Sandy Shore", "posicion": new mp.Vector3(1699.9453, 3782.9033, 34.766914) },
    { "nombre": "Ayuntamiento Paleto Bay", "posicion": new mp.Vector3(-147.87442, 6289.4453, 31.491571) }
];
var posicionesJuzgados = [
    { "nombre": "Juzgados de Los Santos", "posicion": new mp.Vector3(233.06003, -429.1491, 48.076775) },
    { "nombre": "Ayuntamiento Sandy Shore", "posicion": new mp.Vector3(1698.688, 3781.722, 34.76694) },
    { "nombre": "Ayuntamiento Paleto Bay", "posicion": new mp.Vector3(-151.9243, 6298.599, 31.48951) }
];
var posicionesAyuntamientos = [
    { "nombre": "Ayuntamiento Los Santos", "posicion": new mp.Vector3(-549.8019, -191.8376, 38.22483) },
    { "nombre": "Ayuntamiento Sandy Shore", "posicion": new mp.Vector3(1701.543, 3783.776, 34.76694) },
    { "nombre": "Ayuntamiento Paleto Bay", "posicion": new mp.Vector3(-151.1248, 6302.993, 31.61087) }
];

var posTaquillas = [{tipo: 1, pos: new mp.Vector3(461.80685, -998.9948, 30.689558)},
    {tipo: 1, pos: new mp.Vector3(461.72458, -996.5778, 30.689585)},
    {tipo: 8, pos: new mp.Vector3(-570.52625, -104.71578, 33.677135)},
    {tipo: 8, pos: new mp.Vector3(-567.6574, -112.00292, 33.67706)},
    {tipo: 8, pos: new mp.Vector3(-565.8477, -107.500046, 33.677105)},
    {tipo: 3, pos: new mp.Vector3(-1093.427, -832.0702, 14.283229)},
    {tipo: 3, pos: new mp.Vector3(-1098.5902, -831.4453, 14.282789)},
    {tipo: 3, pos: new mp.Vector3(-1079.8805, -823.37524, 14.882971)},
    {tipo: 7, pos: new mp.Vector3(368.74277, -1602.2004, 29.292046)},
    {tipo: 6, pos: new mp.Vector3(1853.3395, 3689.0708, 29.818531)},
    {tipo: 5, pos: new mp.Vector3(-449.60928, 6009.0566, 31.71574)},
    // {tipo: , pos: new mp.Vector3(1157.176, -1470.531, -105.3123)},
    // {tipo: , pos: new mp.Vector3(269.4273, -1362.772, 24.53779)},
    // {tipo: , pos: new mp.Vector3(301.40683, -599.3481, 43.284084)},
    {tipo: 10, pos: new mp.Vector3(1194.699, -1478.301, 34.85953)},
    {tipo: 10, pos: new mp.Vector3(1212.9476, -1478.2092, 35.07361)},
    {tipo: 11, pos: new mp.Vector3(195.6791, -1652.655, 29.8032)},
    {tipo: 11, pos: new mp.Vector3(203.20636, -1649.037, 34.200085)},
    // {tipo: 14, pos: new mp.Vector3(1691.392, 3585.782, 35.62093)},
    // {tipo: , pos: new mp.Vector3(-1067.9, -2378.715, 14.08272)},
    {tipo: 15, pos: new mp.Vector3(-366.99402, 6101.174, 31.635775)},
    {tipo: 15, pos: new mp.Vector3(-359.2852, 6113.642, 31.439476)},
    {tipo: 12, pos: new mp.Vector3(-628.33936, -121.96613, 39.22009)},
    {tipo: 9, pos: new mp.Vector3(2521.75, -331.0647, 94.09245)},
    {tipo: 9, pos: new mp.Vector3(2514.627, -343.3857, 101.8933)},
    {tipo: 16, pos: new mp.Vector3(1830.537, 2582.708, 45.891)},];

var senalamientos = [];
var blips_guardados = [];
var garaje_plantas = [];

var scaleform_global = null;

var redondearNumero = function (number, ends) {
    if (ends === void 0) { ends = 0; }
    return parseFloat(number.toFixed(ends));
};
exports.redondearNumero = redondearNumero;

var enCasillaAccesoRapido = function (sqlid) {
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].id == sqlid && inventario[i].celdaInv >= 1 && inventario[i].celdaInv <= 6) {
            return true;
        }
    }
    return false;
};
exports.enCasillaAccesoRapido = enCasillaAccesoRapido;
// navegador //
// camara //
function crearCamara(x, y, z, rx, ry, rz, viewangle) {
    if (camara != null) {
        camara.setActive(false);
        mp.game.cam.renderScriptCams(false, true, 0, true, true);

        if (mp.cameras.exists(camara))
            camara.destroy();
    }
    camara = mp.cameras.new("default", new mp.Vector3(x, y, z), new mp.Vector3(rx, ry, rz), viewangle);
    camara.setActive(true);
    mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);
}
exports.crearCamara = crearCamara;
function interpolateCamara(x1, y1, z1, rx1, ry1, rz1, viewangle1, x2, y2, z2, rx2, ry2, rz2, viewangle2, tiempo) {
    if (camara != null) {
        camara.setActive(false);
        mp.game.cam.renderScriptCams(false, true, 0, true, true);
        if (mp.cameras.exists(camara))
            camara.destroy();
    }

    var camera1 = mp.cameras.new('default', new mp.Vector3(x1, y1, z1), new mp.Vector3(rx1, ry1, rz1), viewangle1);
    var camera2 = mp.cameras.new('default', new mp.Vector3(x2, y2, z2), new mp.Vector3(rx2, ry2, rz2), viewangle2);
    camera2.setActiveWithInterp(camera1.handle, tiempo, 0, 0); // 2000ms = 2secs, 0, 0 - idk
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    crearTimeout(function () {
        if (camera1 != null) {
            camera1.setActive(false);
            mp.game.cam.renderScriptCams(false, true, 0, true, true);

            if (mp.cameras.exists(camera1))
                camera1.destroy();
        }
        if (camera2 != null) {
            camera2.setActive(false);
            mp.game.cam.renderScriptCams(false, true, 0, true, true);

            if (mp.cameras.exists(camera2))
                camera2.destroy();
        }
    }, tiempo);

}
exports.interpolateCamara = interpolateCamara;
function interpolateCamaras(posicion2, rotacion2, viewangle2, tiempo, tiempoTimer) {
    if (camara != null) {

        let camera1 = camara;
        let camera2 = mp.cameras.new('default', posicion2, rotacion2, viewangle2);
        camera2.setActiveWithInterp(camera1.handle, tiempo, 1, 1);

        crearTimeout(() => {
            camara = camera2;
        }, tiempo + 100);

        // crearTimeout(function () {
        //     mp.game.cam.renderScriptCams(false, true, 3000, true, true);
        //     if (camera1 != null) {
        //         camera1.setActive(false);
        //         mp.game.cam.renderScriptCams(false, true, 0, true, true);
        //         camera1.destroy();
        //     }
        //     if (camera2 != null) {
        //         camera2.setActive(false);
        //         mp.game.cam.renderScriptCams(false, true, 0, true, true);
        //         camera2.destroy();
        //     }
        // }, tiempoTimer);
    }

}
exports.interpolateCamaras = interpolateCamaras;
function destruirCamara() {
    if (camara == null)
        return;
    camara.setActive(false);
    mp.game.cam.renderScriptCams(false, true, 0, true, true);
    if (mp.cameras.exists(camara))
        camara.destroy();
    camara = null;
}
exports.destruirCamara = destruirCamara;
// camara //
function drawText(text, drawXY, font, color, scale, alignRight) {
    if (alignRight === void 0) { alignRight = false; }
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale, scale);
    mp.game.ui.setTextColour(color[0], color[1], color[2], color[3]);
    mp.game.invoke(Natives.SET_TEXT_OUTLINE);
    if (alignRight) {
        mp.game.ui.setTextRightJustify(true);
        mp.game.ui.setTextWrap(0, drawXY[0]);
    }
    mp.game.ui.drawText(drawXY[0], drawXY[1]);
}
exports.drawText = drawText;

let int_antiAfkCam = null;
exports.anularCamaraAFK = anularCamaraAFK;
/**
 * Crea (o destruye) un intervalo para anular (o reactivar) la cámara que GTAV pone cuando detecta que llevas X tiempo AFK
 * 
 * @param {boolean} estado True - Desactiva la cámara AFK creando el intervalo, False - Reactiva la cámara AFK parando el intervalo
 */
function anularCamaraAFK(estado) {
    if (int_antiAfkCam != null) {
        clearInterval(int_antiAfkCam);
        int_antiAfkCam = null;
    }

    if (estado == true) {
        // Reseteamos los timer de 30 segundos que usa GTAV para activar la cámara AFK
        mp.game.invoke('0x9E4CFFF989258472');
        mp.game.invoke('0xF4F2C0D4EE209E20');

        // Creamos intervalo de 25 segundos para volver a resetear ambos timer
        int_antiAfkCam = setInterval(() => {
            mp.game.invoke('0x9E4CFFF989258472');
            mp.game.invoke('0xF4F2C0D4EE209E20');
        }, 25000);
    }
}

exports.crearCajero = crearCajero;
function crearCajero(id, posx, posy, posz, banco) {
    var obj = {
        id: id,
        posicion: new mp.Vector3(posx, posy, posz),
        banco: banco,
    };
    cajeros.push(obj);
}

exports.borrarCajero = borrarCajero;
function borrarCajero(id) {
    for (let i = 0, n = cajeros.length; i < n; i++) {
        if (cajeros[i].id == id)
        {
            var idx = cajeros.indexOf(cajeros[i]);
            if (idx !== -1)
                cajeros.splice(idx, 1);
            break;
        }
    }
}

exports.borrarCajeros = borrarCajeros;
function borrarCajeros() {
    cajeros = [];
}

exports.logInfo = logInfo;
/**
 * Registra informacion en consola y console.txt con la hora en la que se ha producido
 *
 * * USO: logInfo("AUTO_AUTOFIX");
 * * USO: logInfo("INVENTARIO", "Añadido objeto");
 *
 * @param {string} titulo Titulo que será introducido entre corchetes []
 * @param {string} texto Texto opcional
 */
function logInfo(titulo, texto = null) {
    let date = new Date(Date.now());
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let millisec = date.getMilliseconds();

    if (texto != null)
        mp.console.logInfo("(" + hours + ":" + minutes + ":" + seconds + ":" + millisec + ") [INFO]: " + titulo + ": " + texto, true, true);
    else
        mp.console.logInfo("(" + hours + ":" + minutes + ":" + seconds + ":" + millisec + ") [INFO]: " + titulo, true, true);
}

mp.events.add('logInfo', (titulo, texto = null) => {
    logInfo(titulo, texto);
});

exports.logError = logError;
/**
 * Registra un error en consola y console.txt con la hora en la que se ha producido
 * OPCIONAL: si recibe como segundo parametro una excepcion tambien la escribe, sino solo deja escrito el codigo de error introducido
 *
 * * USO: logError("V-1", e);
 * * USO: logError("V-1");
 *
 * @param {string} texto Texto o código para identificar el error
 * @param {Error} excepcion Excepcion recibida
 */
function logError(texto, excepcion = null) {
    let date = new Date(Date.now());
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let millisec = date.getMilliseconds();

    if (excepcion != null)
        mp.console.logError("(" + hours + ":" + minutes + ":" + seconds + ":" + millisec + ") [ERROR]: " + texto + ": " + excepcion, true, true);
    else
        mp.console.logError("(" + hours + ":" + minutes + ":" + seconds + ":" + millisec + ") [ERROR]: " + texto, true, true);
}

mp.events.add('logError', (texto, excepcion = null) => {
    logError(texto, excepcion);
});

exports.setFloodboton = setFloodboton;
/**
 * Funcion para activar el floodboton, si se ha podido activar devuelve true, si ya estaba activado devuelve false
 *
 * * USO: setFloodboton(1000, ""); -> Si devuelve true podemos seguir, si devuelve false significa que el floodboton está activo, no podemos seguir
 *
 * @param {number} tiempo Tiempo en MS para resetear la variable floodboton en caso de que no esté activa
 * @param {string} codigo Codigo que identifica de donde proviene el cambio realizado
 * @returns {boolean} Resultado de activar el floodboton
 */
function setFloodboton(tiempo, codigo) {
    const t = tiempo;
    //const c = codigo;
    if (floodboton == null) {
        //logInfo("Floodboton", "Activado: " + c + ", ms: " + t);

        let tiempoIntervalo = tiempo / 10;
        let contador = 0;
        let intervaloSeguro = setInterval(() => {
            if (contador > t) {
                //logInfo("Floodboton", "Desactivado Forzado: " + c);
                if (floodboton) {
                    pararTimeout(floodboton);
                }

                floodboton = null;

                clearInterval(intervaloSeguro);
                intervaloSeguro = null;
                return;
            }

            contador = contador + tiempoIntervalo;
        }, tiempoIntervalo);

        floodboton = crearTimeout(() => {
            //logInfo("Floodboton", "Desactivado: " + c);

            if (intervaloSeguro) {
                clearInterval(intervaloSeguro);
                intervaloSeguro = null;
            }

            floodboton = null;
        }, t);

        return true;
    }
    else {
        //logInfo("Floodboton", "Intento de cambio cuando ya esta activo: " + c);
        return false;
    }
}

exports.crearTimeout = crearTimeout;
/**
 * Funcion que sustituye al setTimeout() nativo evitando así el problema conocido que tiene en RAGEMP, a veces nunca se ejecuta su código y se queda en espera indefinida
 * 
 * @param {any} funcion Funcion a ejecutar
 * @param {number} tiempo Tiempo de espera en ms
 * @returns {number} Handle del intervalo creado
 */
function crearTimeout(funcion, tiempo) {
    let temp_interval = setInterval(() => {
        clearInterval(temp_interval);
        funcion();
        temp_interval = null;
    }, tiempo);
    return temp_interval;
}

exports.pararTimeout = pararTimeout;
/**
 * Funcion que sustituye a clearTimeout(), solo se debe usar con los timeout creados con crearTimeout()
 * 
 * @param {number} handle Handle del timeout a parar
 */
function pararTimeout(handle) {
    if (!handle) return;

    clearInterval(handle);
    handle = null;
}

exports.debugNativa = debugNativa;
/**
 * Funcion que ejecuta una nativa y guarda en console.txt cuando se ejecuta y los parámtros que ha recibido
 *
 * * USO: debugNativa("void", "0x0000000", 1, 2);
 * * USO: debugNativa("float", "0x0000001", 1, 2);
 * 
 * Tipos de nativa soportados:
 * - "void" -> No devuelve nada o int o bool
 * - "float" -> Devuelve un float
 * - "vector3" -> Devuelve un vector3
 * - "string" -> Devuelve un string
 * 
 * 
 * Cosas que sabemos de las nativas:
 * - Si devuelve vector3 hay que usar mp.game.invokeVector3(), si devuelve string hay que usar mp.game.invokeString(), si devuelve float hay que usar mp.game.invokeFloat()
 * - Si la nativa no devuelve nada (void) o devuelve int, o bool, o hash, hay que usar mp.game.invoke()
 * - Si la nativa pide un parámetro "Entity" si queremos introducirle una entidad de RAGEMP usamos "entidad.handle", si la entidad es de GTAV usamos directamente la entidad sin .handle "entidad".
 * - Las nativas que devuelven "Bool" no devuelven true o false, sino 1 o 0 respectivamente. Hay que tener en cuenta que (1 == true) y (0 == false) siempre se cumple en javascript.
 * - "SE EXCEPTION_ACCESS_VIOLATION" en main_logs.txt significa que hay algún problema con una nativa. Llamar una nativa con menos parámetros de los que necesita o con tipos erroneos (ej: meterle un int cuando pide string) causa estos errores.
 * - NO USAR - mp.game.invokeStrict() parece funcionar como mp.game.invoke() pero parece necesitar variables y no datos explícitos como parámetros (ej: no meterle un 1, sino mi_var, siendo let mi_var = 1;) Causa crasheos muy extraños, por lo tanto no es recomendable usarla ya que parece estar bastante rota.
 * 
 * 
 * @param {string} tipo Tipo de nativa
 * @param {string} nativa Hash de la nativa
 * @returns {boolean} Resultado de ejecutar la nativa
 */
function debugNativa(tipo, nativa, param1 = null, param2 = null, param3 = null, param4 = null) {
    let resultado = null;
    switch (tipo) {
        case "void":
            if (param1 != null) {
                if (param2 != null) {
                    if (param3 != null) {
                        if (param4 != null) {
                            mp.console.logInfo("(" + Date.now() + ") [NATIVE]: void: " + nativa + ", " + param1 + ", " + param2 + ", " + param3 + ", " + param4, true, true);
                            resultado = mp.game.invoke(nativa, param1, param2, param3, param4);
                        }
                        else {
                            mp.console.logInfo("(" + Date.now() + ") [NATIVE]: void: " + nativa + ", " + param1 + ", " + param2 + ", " + param3, true, true);
                            resultado = mp.game.invoke(nativa, param1, param2, param3);
                        }
                    }
                    else {
                        mp.console.logInfo("(" + Date.now() + ") [NATIVE]: void: " + nativa + ", " + param1 + ", " + param2, true, true);
                        resultado = mp.game.invoke(nativa, param1, param2);
                    }
                }
                else {
                    mp.console.logInfo("(" + Date.now() + ") [NATIVE]: void: " + nativa + ", " + param1, true, true);
                    resultado = mp.game.invoke(nativa, param1);
                }
            }
            else {
                mp.console.logInfo("(" + Date.now() + ") [NATIVE]: void: " + nativa, true, true);
                resultado = mp.game.invoke(nativa);
            }
            return resultado;
        case "float":
            if (param1 != null) {
                if (param2 != null) {
                    if (param3 != null) {
                        if (param4 != null) {
                            mp.console.logInfo("(" + Date.now() + ") [NATIVE]: float: " + nativa, true, true);
                            resultado = mp.game.invokeFloat(nativa, param1, param2, param3, param4);
                        }
                        else {
                            mp.console.logInfo("(" + Date.now() + ") [NATIVE]: float: " + nativa, true, true);
                            resultado = mp.game.invokeFloat(nativa, param1, param2, param3);
                        }
                    }
                    else {
                        mp.console.logInfo("(" + Date.now() + ") [NATIVE]: float: " + nativa, true, true);
                        resultado = mp.game.invokeFloat(nativa, param1, param2);
                    }
                }
                else {
                    mp.console.logInfo("(" + Date.now() + ") [NATIVE]: float: " + nativa, true, true);
                    resultado = mp.game.invokeFloat(nativa, param1);
                }
            }
            else {
                mp.console.logInfo("(" + Date.now() + ") [NATIVE]: float: " + nativa, true, true);
                resultado = mp.game.invokeFloat(nativa);
            }
            return resultado;
        case "vector3":
            if (param1 != null) {
                if (param2 != null) {
                    if (param3 != null) {
                        if (param4 != null) {
                            mp.console.logInfo("(" + Date.now() + ") [NATIVE]: vector3: " + nativa, true, true);
                            resultado = mp.game.invokeVector3(nativa, param1, param2, param3, param4);
                        }
                        else {
                            mp.console.logInfo("(" + Date.now() + ") [NATIVE]: vector3: " + nativa, true, true);
                            resultado = mp.game.invokeVector3(nativa, param1, param2, param3);
                        }
                    }
                    else {
                        mp.console.logInfo("(" + Date.now() + ") [NATIVE]: vector3: " + nativa, true, true);
                        resultado = mp.game.invokeVector3(nativa, param1, param2);
                    }
                }
                else {
                    mp.console.logInfo("(" + Date.now() + ") [NATIVE]: vector3: " + nativa, true, true);
                    resultado = mp.game.invokeVector3(nativa, param1);
                }
            }
            else {
                mp.console.logInfo("(" + Date.now() + ") [NATIVE]: vector3: " + nativa, true, true);
                resultado = mp.game.invokeVector3(nativa);
            }
            return resultado;
        case "string":
            if (param1 != null) {
                if (param2 != null) {
                    if (param3 != null) {
                        if (param4 != null) {
                            mp.console.logInfo("(" + Date.now() + ") [NATIVE]: string: " + nativa, true, true);
                            resultado = mp.game.invokeString(nativa, param1, param2, param3, param4);
                        }
                        else {
                            mp.console.logInfo("(" + Date.now() + ") [NATIVE]: string: " + nativa, true, true);
                            resultado = mp.game.invokeString(nativa, param1, param2, param3);
                        }
                    }
                    else {
                        mp.console.logInfo("(" + Date.now() + ") [NATIVE]: string: " + nativa, true, true);
                        resultado = mp.game.invokeString(nativa, param1, param2);
                    }
                }
                else {
                    mp.console.logInfo("(" + Date.now() + ") [NATIVE]: string: " + nativa, true, true);
                    resultado = mp.game.invokeString(nativa, param1);
                }
            }
            else {
                mp.console.logInfo("(" + Date.now() + ") [NATIVE]: string: " + nativa, true, true);
                resultado = mp.game.invokeString(nativa);
            }
            return resultado;
        default:
            return null;
    }
}

exports.obtenerEspacioInventario = obtenerEspacioInventario;
/**
 * Funcion que nos devuelve el espacio total que tiene nuestro inventario
 * 
 */
function obtenerEspacioInventario() {

    if(inventarioExtra)
    {
        return 24;
    }
    else
    {
        return 20;
    }
}

let skinHombre = mp.game.joaat('mp_m_freemode_01');
let skinMujer = mp.game.joaat('mp_f_freemode_01');

exports.obtenerNombreConocido = obtenerNombreConocido;
/**
 * Funcion para obtener el nombre de un jugador, teniendo en cuenta si le conocemos o no. Si estas en adminservicio siempre le "conoces" al otro jugador
 */
function obtenerNombreConocido(player) {
    let nombre = "";
    if (player) {
        let jugador = mp.controladorJugadores._jugadores[player.id];
        if (jugador) {
            // Si eres tu mismo o estas en adminservicio
            if (player == player_local || adminservicio) {
                nombre = player.name + " (" + jugador.id_jugador + ")";
            }
            else {
                // Sin caratapada
                if (jugador.caratapada.estado == false){
                    if (jugador.conocido && (player.model === skinHombre || player.model === skinMujer)) {
                        // Si le conocemos y lleva skin normal
                        nombre = player.name + " (" + jugador.id_jugador + ")";
                    }
                    else{
                        // Si es desconocido
                        if (player.model === skinMujer) {
                            nombre = "Desconocida (" + jugador.id_jugador + ")";
                        }
                        else {
                            nombre = "Desconocido (" + jugador.id_jugador + ")";
                        }
                    }
                }
                else{
                    // Caratapada, sea agente, pasamontañas o encapuchado
                    nombre = player.name;
                }
            }
        }
    }

    return nombre;
}

}