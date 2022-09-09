{
﻿/* --------------------------------------------------------------------------------
 * ascensor.js
 *
 * Autor: FerniMoon
 *
 * Descripcin: Diferentes sistemas de ascensores
 *
 * -------------------------------------------------------------------------------- */

let cef_ascensor = require("./LURP/cef.js");
let ascensor_cefId = -1;

let puedeUsarAscensor = true;

let ascensorFIB1_necesitaMantenimiento;
let ascensorFIB2_necesitaMantenimiento;
let ascensorFIB3_necesitaMantenimiento;
let ascensorFIB4_necesitaMantenimiento;
let ascensorFIB5_necesitaMantenimiento;
let ascensorComisariaVespucci1_necesitaMantenimiento;
let ascensorComisariaVespucci2_necesitaMantenimiento;
let ascensorComisariaRockfordHills_necesitaMantenimiento;

let itemMENOS1 = null
let itemMENOS2 = null
let itemMENOS3 = null
let item1 = null
let item2 = null
let item3 = null
let item4 = null
let item5 = null
let item6 = null

let posAscensorFIB1 = [
    new mp.Vector3(2504.386, -342.0772, 94.09238), //ASCENSOR 1 - PLANTA 1
    new mp.Vector3(2504.386, -342.0772, 101.8932), //ASCENSOR 1 - PLANTA 3
    new mp.Vector3(2504.386, -342.0772, 105.6866), //ASCENSOR 1 - PLANTA 4

    new mp.Vector3(2502.079, -339.7787, 94.09238), //ASCENSOR 2 - PLANTA 1
    new mp.Vector3(2502.079, -339.7787, 101.8932), //ASCENSOR 2 - PLANTA 3
    new mp.Vector3(2502.079, -339.7787, 105.6867), //ASCENSOR 2 - PLANTA 4

    new mp.Vector3(2494.973, -346.8805, 94.09238), //ASCENSOR 3 - PLANTA 1
    new mp.Vector3(2494.973, -346.8805, 101.8932), //ASCENSOR 3 - PLANTA 3
    new mp.Vector3(2494.973, -346.8805, 105.6904), //ASCENSOR 3 - PLANTA 4

    new mp.Vector3(2497.232, -349.2548, 94.09238), //ASCENSOR 4 - PLANTA 1
    new mp.Vector3(2497.232, -349.2548, 101.8932), //ASCENSOR 4 - PLANTA 3
    new mp.Vector3(2497.232, -349.2548, 105.6904) //ASCENSOR 4 - PLANTA 4
]

let posAscensorFIB2 = [
    new mp.Vector3(2504.316, -433.2722, 106.9129), //ASCENSOR 1 - PLANTA 4
    new mp.Vector3(2504.3916, -433.23618, 99.112) //ASCENSOR 1 - PLANTA 2
]

let posAscensoresComisariaVespucci = [
    new mp.Vector3(-1096.1172, -850.3819, 38.2432), // ASCENSOR 1 - PLANTA 6
    new mp.Vector3(-1096.1172, -850.3819, 34.36075), // ASCENSOR 1 - PLANTA 5
    new mp.Vector3(-1096.1172, -850.3819, 30.757141), // ASCENSOR 1 - PLANTA 4
    new mp.Vector3(-1096.1172, -850.3819, 26.827583), // ASCENSOR 1 - PLANTA 3
    new mp.Vector3(-1096.1172, -850.3819, 23.038637), // ASCENSOR 1 - PLANTA 2
    new mp.Vector3(-1096.1172, -850.3819, 19.001205), // ASCENSOR 1 - PLANTA 1
    new mp.Vector3(-1096.1172, -850.3819, 13.6873665), // ASCENSOR 1 - PLANTA -3
    new mp.Vector3(-1096.1172, -850.3819, 10.276635), // ASCENSOR 1 - PLANTA -2
    new mp.Vector3(-1096.1172, -850.3819, 4.884179), // ASCENSOR 1 - PLANTA -1

    new mp.Vector3(-1066.022, -833.74133, 27.036465), // ASCENSOR 2 - PLANTA 3
    new mp.Vector3(-1066.022, -833.74133, 19.035643), // ASCENSOR 2 - PLANTA 1
    new mp.Vector3(-1066.022, -833.74133, 14.882768), // ASCENSOR2 2 - PLANTA -3
    new mp.Vector3(-1066.022, -833.74133, 11.03725), // ASCENSOR 2 - PLANTA -2
    new mp.Vector3(-1066.022, -833.74133, 5.479814) // ASCENSOR 2 - PLANTA -1
]

let posAscensoresComisariaRockfordHills = [
    new mp.Vector3(-573.0352, -135.84616, 47.919056), // ASCENSOR 1 - PLANTA 3
    new mp.Vector3(-572.8622, -135.82976, 42.867416), // ASCENSOR 1 - PLANTA 2
    new mp.Vector3(-572.9945, -129.20457, 38.41052) // ASCENSOR 1 - PLANTA 1
]

/*mp.events.add('render', () =>
{
    mp.gui.chat.push("XYZ: " + calcDist(player_local.position, posAscensoresComisariaRockfordHills[2]));
});*/

function bloquearUsoAscensor() {
    puedeUsarAscensor = false;
    crearTimeout(() => {
        puedeUsarAscensor = true; 
    }, 5000);
}

mp.events.add({
    "ascensores:actualizarAscensoresNecesitanMantenimiento": (v1, v2, v3, v4, v5, v6, v7, v8) => {
        ascensorFIB1_necesitaMantenimiento = v1;
        ascensorFIB2_necesitaMantenimiento = v2;
        ascensorFIB3_necesitaMantenimiento = v3;
        ascensorFIB4_necesitaMantenimiento = v4;
        ascensorFIB5_necesitaMantenimiento = v5;
        ascensorComisariaVespucci1_necesitaMantenimiento = v6;
        ascensorComisariaVespucci2_necesitaMantenimiento = v7;
        ascensorComisariaRockfordHills_necesitaMantenimiento = v8;
    },
    "ascensores:actualizarAscensorNecesitaMantenimiento": (CodigoAscensor, estado) => {
        switch (CodigoAscensor) {
            case 1:
                ascensorFIB1_necesitaMantenimiento = estado;
                break;
            case 2:
                ascensorFIB2_necesitaMantenimiento = estado;
                break;
            case 3:
                ascensorFIB3_necesitaMantenimiento = estado;
                break;
            case 4:
                ascensorFIB4_necesitaMantenimiento = estado;
                break;
            case 5:
                ascensorFIB5_necesitaMantenimiento = estado;
                break;
            case 6:
                ascensorComisariaVespucci1_necesitaMantenimiento = estado;
                break;
            case 7:
                ascensorComisariaVespucci2_necesitaMantenimiento = estado;
                break;
            case 8:
                ascensorComisariaRockfordHills_necesitaMantenimiento = estado;
                break;
        }
    },
    "ascensores:movimiento_ascensor": (player, playerReceiver, tiempoMovimientoAscensor, desde, hacia) => {
        pantallaMovimientoAscensor(player, playerReceiver, tiempoMovimientoAscensor, desde, hacia);
    },

    "mostrar_ascensor_FIB1": function () {
        mostrar_ascensor_FIB_Edificio1();
    },
    "mostrar_ascensor_FIB2": function () {
        mostrar_ascensor_FIB_Edificio2();
    },
    "mostrar_ascensor_Comisaria_Vespucci_1": function () {
        mostrar_ascensor_Comisaria_Vespucci_1();
    },
    "mostrar_ascensor_Comisaria_RockfordHills": function () {
        mostrar_ascensor_Comisaria_RockfordHills();
    },
    "mostrar_ascensor_hospital_pillbox": (ascensor) => {
        mostrar_ascensor_Hospital_Pillbox(ascensor);
    },

    "cerrar_ascensor_FIB1": function () {
        cerrar_ascensor_FIB_Edificio1();
    },
    "cerrar_ascensor_FIB2": function () {
        cerrar_ascensor_FIB_Edificio2();
    },
    "cerrar_ascensor_Comisaria_Vespucci_1": function () {
        cerrar_ascensor_Comisaria_Vespucci_1();
    },
    "cerrar_ascensor_Comisaria_RockfordHills": function () {
        cerrar_ascensor_Comisaria_RockfordHills();
    },

    "sonidoFinAscensor": () => {
        mp.events.call("sound:play", "ding", false);
    },
    "sonidoAscensorERROR": () => {
        mp.game.audio.playSoundFromCoord(-1, "ERROR", player_local.position.x, player_local.position.y, player_local.position.z, "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, false);
    },
});


function mostrar_ascensor_FIB_Edificio1()
{
    // Obtenemos los trabajos del jugador que abre el menu del ascensor para saber si tiene permiso para usarlo o no
    let jug = mp.controladorJugadores._jugadores[player_local.id];

    let pos_z = player_local.position.z.toFixed(4);
    let pos_z_4 = pos_z >= 105.6764 && pos_z <= 105.6982;
    let pos_z_3 = pos_z >= 101.8831 && pos_z <= 101.9050;
    let pos_z_1 = pos_z >= 94.0822 && pos_z <= 94.1038;

    let ascensorFIB = 0;
    if (!(calcDist(player_local.position, posAscensorFIB1[0]) > 2 && calcDist(player_local.position, posAscensorFIB1[1]) > 2 && calcDist(player_local.position, posAscensorFIB1[2]) > 2)) // PRIMERO DERECHA
    {
        ascensorFIB = 1;
    }
    if (!(calcDist(player_local.position, posAscensorFIB1[3]) > 2 && calcDist(player_local.position, posAscensorFIB1[4]) > 2 && calcDist(player_local.position, posAscensorFIB1[5]) > 2)) // SEGUNDO DERECHA
    {
        ascensorFIB = 2;
    }
    if (!(calcDist(player_local.position, posAscensorFIB1[6]) > 2 && calcDist(player_local.position, posAscensorFIB1[7]) > 2 && calcDist(player_local.position, posAscensorFIB1[8]) > 2)) // SEGUNDO IZQUIERDA
    {
        ascensorFIB = 3;
    }
    if (!(calcDist(player_local.position, posAscensorFIB1[9]) > 2 && calcDist(player_local.position, posAscensorFIB1[10]) > 2 && calcDist(player_local.position, posAscensorFIB1[11]) > 2)) // PRIMERO IZQUIERDA
    {
        ascensorFIB = 4;
    }

    item1 = null;
    item2 = null;
    item3 = null;
    item4 = null;

    if ((jug.trabajos).includes(25)) // Si tiene el trabajo FIB..
    {
        if (ascensorFIB == 1) {
            if (ascensorFIB1_necesitaMantenimiento) {
                ascensorFIB_1 = crearMenu("Ascensor 1", "FIB");
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible"), "Rojo");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                mp.events.call("sound:play", "ascensorEnMantenimiento", false);
            }
            else {
                ascensorFIB_1 = crearMenu("Ascensor 1", "FIB");
                item4 = new UIMenuItem("Planta 4", "Celdas de detención. Sala de interrogatorios. Escaleras a techo");
                ascensorFIB_1.AddItem(item4);
                item3 = new UIMenuItem("Planta 3", "Laboratorio. Taquillas. Sala de control. Sala de armas. Sala de evidencias");
                ascensorFIB_1.AddItem(item3);
                item2 = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible"), "Rojo");
                item2.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(item2);
                item1 = new UIMenuItem("Planta 1", "Sala principal. Seguridad. Gimnasio. Cantina. Taquillas");
                ascensorFIB_1.AddItem(item1);
            }
        }
        else if (ascensorFIB == 2) {
            if (ascensorFIB2_necesitaMantenimiento) {
                ascensorFIB_1 = crearMenu("Ascensor 2", "FIB");
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "El ascensor 2 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "El ascensor 2 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible"), "Rojo");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "El ascensor 2 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                mp.events.call("sound:play", "ascensorEnMantenimiento", false);
            }
            else {
                ascensorFIB_1 = crearMenu("Ascensor 2", "FIB");
                item4 = new UIMenuItem("Planta 4", "Celdas de detención. Sala de interrogatorios. Escaleras a techo");
                ascensorFIB_1.AddItem(item4);
                item3 = new UIMenuItem("Planta 3", "Laboratorio. Taquillas. Sala de control. Sala de armas. Sala de evidencias");
                ascensorFIB_1.AddItem(item3);
                item2 = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible"), "Rojo");
                item2.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(item2);
                item1 = new UIMenuItem("Planta 1", "Sala principal. Seguridad. Gimnasio. Cantina. Taquillas");
                ascensorFIB_1.AddItem(item1);
            }
        }
        else if (ascensorFIB == 3) {
            if (ascensorFIB3_necesitaMantenimiento) {
                ascensorFIB_1 = crearMenu("Ascensor 3", "FIB");
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "El ascensor 3 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "El ascensor 3 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible"), "Rojo");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "El ascensor 3 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                mp.events.call("sound:play", "ascensorEnMantenimiento", false);
            }
            else {
                ascensorFIB_1 = crearMenu("Ascensor 3", "FIB");
                item4 = new UIMenuItem("Planta 4", "Celdas de detención. Sala de interrogatorios. Escaleras a techo");
                ascensorFIB_1.AddItem(item4);
                item3 = new UIMenuItem("Planta 3", "Laboratorio. Taquillas. Sala de control. Sala de armas. Sala de evidencias");
                ascensorFIB_1.AddItem(item3);
                item2 = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible"), "Rojo");
                item2.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(item2);
                item1 = new UIMenuItem("Planta 1", "Sala principal. Seguridad. Gimnasio. Cantina. Taquillas");
                ascensorFIB_1.AddItem(item1);
            }
        }
        else if (ascensorFIB == 4) {
            if (ascensorFIB4_necesitaMantenimiento) {
                ascensorFIB_1 = crearMenu("Ascensor 4", "FIB");
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "El ascensor 4 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "El ascensor 4 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible"), "Rojo");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "El ascensor 4 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(ascensorOpcionItem);
                mp.events.call("sound:play", "ascensorEnMantenimiento", false);
            }
            else {
                ascensorFIB_1 = crearMenu("Ascensor 4", "FIB");
                item4 = new UIMenuItem("Planta 4", "Celdas de detención. Sala de interrogatorios. Escaleras a techo");
                ascensorFIB_1.AddItem(item4);
                item3 = new UIMenuItem("Planta 3", "Laboratorio. Taquillas. Sala de control. Sala de armas. Sala de evidencias");
                ascensorFIB_1.AddItem(item3);
                item2 = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible"), "Rojo");
                item2.SetRightBadge(BadgeStyle.Lock);
                ascensorFIB_1.AddItem(item2);
                item1 = new UIMenuItem("Planta 1", "Sala principal. Seguridad. Gimnasio. Cantina. Taquillas");
                ascensorFIB_1.AddItem(item1);
            }
        }
    }
    else // Si no tiene el trabajo de FIB..
    {
        if (ascensorFIB == 1) {
            ascensorFIB_1 = crearMenu("Ascensor 1", "FIB");
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
        }
        else if (ascensorFIB == 2) {
            ascensorFIB_1 = crearMenu("Ascensor 2", "FIB");
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
        }
        else if (ascensorFIB == 3) {
            ascensorFIB_1 = crearMenu("Ascensor 3", "FIB");
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
        }
        else if (ascensorFIB == 4) {
            ascensorFIB_1 = crearMenu("Ascensor 4", "FIB");
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_1.AddItem(ascensorOpcionItem);        
        }
    }

    let enPlanta = 0;
    if (pos_z_4)
    {
        enPlanta = 4;
        ascensorFIB_1._activeItem = 1e3 + 0;
        if (item4 != null) {
            item4.Description = item4.Description + "\nEstás en esta planta";
            item4.HighlightedBackColor = new Color(0, 214, 103, 255);
            item4.ForeColor = new Color(0, 214, 103, 255);
            item4.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }
    else if (pos_z_3)
    {
        enPlanta = 3;
        ascensorFIB_1._activeItem = 1e3 + 1;
        if (item3 != null) {
            item3.Description = item3.Description + "\nEstás en esta planta";
            item3.HighlightedBackColor = new Color(0, 214, 103, 255);
            item3.ForeColor = new Color(0, 214, 103, 255);
            item3.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }
    else if (pos_z_1)
    {
        enPlanta = 1;
        ascensorFIB_1._activeItem = 1e3 + 3;
        if (item1 != null) {
            item1.Description = item1.Description + "\nEstás en esta planta";
            item1.HighlightedBackColor = new Color(0, 214, 103, 255);
            item1.ForeColor = new Color(0, 214, 103, 255);
            item1.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }

    ascensorFIB_1.ItemSelect.on((item, index) => {

        if (!(jug.trabajos).includes(25)) {
            mostrarAviso("danger", 5000, 'No tienes autorización para hacer uso de este ascensor');
            return;
        }

        if (item.Text == "Planta 2") {
            mostrarAviso("admin", 3000, 'Esta planta no está disponible');
            return;
        }

        switch (ascensorFIB)
        {
            case 1:
                if (ascensorFIB1_necesitaMantenimiento) {
                    mp.events.call("sound:play", "ascensorEnMantenimiento", false);
                    mostrarAviso("admin", 5000, 'El ascensor 1 necesita mantenimiento, no es posible hacer uso de él');
                    return;
                }
                break;

            case 2:
                if (ascensorFIB2_necesitaMantenimiento) {
                    mp.events.call("sound:play", "ascensorEnMantenimiento", false);
                    mostrarAviso("admin", 5000, 'El ascensor 2 necesita mantenimiento, no es posible hacer uso de él');
                    return;
                }
                break;

            case 3:
                if (ascensorFIB3_necesitaMantenimiento) {
                    mp.events.call("sound:play", "ascensorEnMantenimiento", false);
                    mostrarAviso("admin", 5000, 'El ascensor 3 necesita mantenimiento, no es posible hacer uso de él');
                    return;
                }
                break;
            case 4:
                if (ascensorFIB4_necesitaMantenimiento) {
                    mp.events.call("sound:play", "ascensorEnMantenimiento", false);
                    mostrarAviso("admin", 5000, 'El ascensor 4 necesita mantenimiento, no es posible hacer uso de él');
                    return;
                }
                break;
            default:
                return;
        }

        if (!puedeUsarAscensor)
        {
            mostrarAviso("admin", 5000, 'Espera 5 segundos a que el motor del ascensor se enfrie');
            return;
        }

        let enAscensor = false;
        let ascensor;
        let jugMaximosEnAscensor = 4; //Maximo de personas dentro del ascensor

        for (let i = 0; i < posAscensorFIB1.length; i++) {
            if (calcDist(player_local.position, posAscensorFIB1[i]) < 1.6 && player_local.dimension == 0) {
                ascensor = posAscensorFIB1[i];
                enAscensor = true;
            }
        }

        if (!enAscensor)
        {
            mostrarAviso("danger", 8000, 'Debes estar dentro del ascensor para poder hacer eso');
            return;
        }
        
        let jugsCerca = mp.players.toArray().filter((jug) => (calcDist(jug.position, ascensor) < 1.6 && jug.dimension == 0 && Math.abs(jug.position.z - ascensor.z) <= 3.0));

        for (let i = 0; i < jugsCerca.length; i++) {
            if (jugsCerca[i].vehicle) {
                mostrarAviso("danger", 8000, 'No puedes hacer uso del ascensor si hay gente con vehículos en su interior');
                return;
            }
        }

        if (jugsCerca.length > jugMaximosEnAscensor)
        {
            mostrarAviso("info", 8000, "El ascensor tiene demasiado peso. Maximo " + jugMaximosEnAscensor + " ocupantes");
            mp.game.audio.playSoundFromCoord(-1, "ERROR", player_local.position.x, player_local.position.y, player_local.position.z, "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, false);

            for (let i = 0; i < jugsCerca.length; i++) {
                let jugador = jugsCerca[i];
                if (jugador == player_local) continue;
                mp.events.callRemote('ascensores:AscensorLleno', jugador, jugMaximosEnAscensor)
            }
            return;
        }

        let z;

        let seleccionadaPlanta4 = false;
        let seleccionadaPlanta3 = false;
        let seleccionadaPlanta1 = false;

        switch (item.Text) {
            case "Planta 4":
                z = 105.6866;
                seleccionadaPlanta4 = true;
                break;
            case "Planta 3":
                z = 101.8933;
                seleccionadaPlanta3 = true;
                break;
            case "Planta 1":
                z = 94.09238;
                seleccionadaPlanta1 = true;
                break;
        }

        if ((pos_z_4 == true && seleccionadaPlanta4 == true) || (pos_z_3 == true && seleccionadaPlanta3 == true) || (pos_z_1 == true && seleccionadaPlanta1 == true))
        {
            mostrarAviso("info", 8000, "Ya estas en la " + item.Text);
            return;
        }

        let tiempoAudioAscensor = 3;
        if (pos_z_4)
        {
            if (item.Text == "Planta 3") {
                tiempoAudioAscensor = 3;
            }
            else if (item.Text == "Planta 1") {
                tiempoAudioAscensor = 9;
            }
        }
        else if (pos_z_3)
        {
            if (item.Text == "Planta 4") {
                tiempoAudioAscensor = 3;
            }
            else if (item.Text == "Planta 1") {
                tiempoAudioAscensor = 6;
            }
        }
        else if (pos_z_1)
        {
            if (item.Text == "Planta 4") {
                tiempoAudioAscensor = 9;
            }
            else if (item.Text == "Planta 3") {
                tiempoAudioAscensor = 6;
            }
        }

        for (let i = 0; i < jugsCerca.length; i++)
        {
            let jugador = jugsCerca[i];
            mp.events.callRemote('ascensores:tpAscensor', jugador, new mp.Vector3(jugador.position.x, jugador.position.y, z), jugador.getRotation(2), item.Text, enPlanta, tiempoAudioAscensor);
        }

        ascensorFIB_1?.Close();            
    });

    ascensorFIB_1.MenuClose.on(item => {
        ascensorFIB_1 = null;
    });
    mp.gui.chat.show(false); // Si esto está aqui es por algo, no te hagas el listo de borrarlo sin preguntar a quien lo ha puesto el porqué lo hizo
}
function cerrar_ascensor_FIB_Edificio1() {
    if (ascensorFIB_1 != null) {
        mp.events.call("sound:cancel");
        ascensorFIB_1?.Close();
    }
}


function mostrar_ascensor_FIB_Edificio2()
{
    // Obtenemos los trabajos del jugador que abre el menu del ascensor para saber si tiene permiso para usarlo o no
    let jug = mp.controladorJugadores._jugadores[player_local.id];

    let pos_z = player_local.position.z.toFixed(4);
    let pos_z_4 = pos_z >= 105.9129 && pos_z <= 107.9129;
    let pos_z_2 = pos_z >= 98.11225 && pos_z <= 100.11225;

    item1 = null;
    item2 = null;
    item3 = null;
    item4 = null;

    if ((jug.trabajos).includes(25)) // Si tiene el trabajo FIB..
    {
        if (ascensorFIB5_necesitaMantenimiento)
        {
            ascensorFIB_2 = crearMenu("Ascensor 5", "FIB");
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "El ascensor 5 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_2.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "Esta planta no está disponible"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_2.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "El ascensor 5 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_2.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "Esta planta no está disponible"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_2.AddItem(ascensorOpcionItem);
        }
        else
        {
            ascensorFIB_2 = crearMenu("Ascensor 5", "FIB");

            item4 = new UIMenuItem("Planta 4", "Sala de reuniones. Sala de control. Oficinas del director y subdirector ");
            ascensorFIB_2.AddItem(item4);

            item3 = aplicarColores(new UIMenuItem("Planta 3", "Esta planta no está disponible"), "Rojo");
            item3.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_2.AddItem(item3);
            item2 = new UIMenuItem("Planta 2", "Sala de conferencias. Sala de prensa. Oficinas de: División de investigación criminal, equipo de rescate de rehenes, academia nacional, agencia de observación de drogas, rama de seguridad nacional, comunicación");
            ascensorFIB_2.AddItem(item2);
            item1 = aplicarColores(new UIMenuItem("Planta 1", "Esta planta no está disponible"), "Rojo");
            item1.SetRightBadge(BadgeStyle.Lock);
            ascensorFIB_2.AddItem(item1);

        }
    }
    else // Si no tiene el trabajo de FIB..
    {
        ascensorFIB_2 = crearMenu("Ascensor 5", "FIB");
        ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
        ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
        ascensorFIB_2.AddItem(ascensorOpcionItem);
        ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
        ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
        ascensorFIB_2.AddItem(ascensorOpcionItem);
        ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
        ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
        ascensorFIB_2.AddItem(ascensorOpcionItem);
        ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
        ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
        ascensorFIB_2.AddItem(ascensorOpcionItem);
    }

    let enPlanta = 0;
    if (pos_z_4)
    {
        enPlanta = 4;
        ascensorFIB_2._activeItem = 1e3 + 0;
        if (item4 != null) {
            item4.Description = item4.Description + "\nEstás en esta planta";
            item4.HighlightedBackColor = new Color(0, 214, 103, 255);
            item4.ForeColor = new Color(0, 214, 103, 255);
            item4.HighlightedForeColor = new Color(0, 0, 0, 255);
        }

    }
    else if (pos_z_2)
    {
        enPlanta = 2;
        ascensorFIB_2._activeItem = 1e3 + 2;
        if (item2 != null) {
            item2.Description = item2.Description + "\nEstás en esta planta";
            item2.HighlightedBackColor = new Color(0, 214, 103, 255);
            item2.ForeColor = new Color(0, 214, 103, 255);
            item2.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }

    ascensorFIB_2.ItemSelect.on((item, index) => {

        if (!(jug.trabajos).includes(25)) {
            mostrarAviso("danger", 5000, 'No tienes autorización para hacer uso de este ascensor');
            return;
        }

        if (item.Text == "Planta 1" || item.Text == "Planta 3") {
            mostrarAviso("admin", 3000, 'Esta planta no está disponible');
            return;
        }

        if (ascensorFIB5_necesitaMantenimiento) {
            mp.events.call("sound:play", "ascensorEnMantenimiento", false);
            mostrarAviso("admin", 5000, 'El ascensor 5 necesita mantenimiento, no es posible hacer uso de él');
            return;
        }

        if (!puedeUsarAscensor) {
            mostrarAviso("admin", 5000, 'Espera 5 segundos a que el motor del ascensor se enfrie');
            return;
        }

        let enAscensor = false;
        let ascensor;
        let jugMaximosEnAscensor = 4; //Maximo de personas dentro del ascensor

        for (let i = 0; i < posAscensorFIB2.length; i++) {
            if (calcDist(player_local.position, posAscensorFIB2[i]) < 1.6 && player_local.dimension == 0) {
                ascensor = posAscensorFIB2[i];
                enAscensor = true;
            }
        }

        if (!enAscensor) {
            mostrarAviso("danger", 8000, 'Debes estar dentro del ascensor para poder hacer eso');
            return;
        }

        let jugsCerca = mp.players.toArray().filter((jug) => (calcDist(jug.position, ascensor) < 2.0 && jug.dimension == 0 && Math.abs(jug.position.z - ascensor.z) <= 3.0));

        for (let i = 0; i < jugsCerca.length; i++) {
            if (jugsCerca[i].vehicle) {
                mostrarAviso("danger", 8000, 'No puedes hacer uso del ascensor si hay gente con vehículos en su interior');
                return;
            }
        }

        if (jugsCerca.length > jugMaximosEnAscensor)
        {
            mostrarAviso("info", 8000, "El ascensor tiene demasiado peso. Maximo " + jugMaximosEnAscensor + " ocupantes");
            mp.game.audio.playSoundFromCoord(-1, "ERROR", player_local.position.x, player_local.position.y, player_local.position.z, "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, false);

            for (let i = 0; i < jugsCerca.length; i++) {
                let jugador = jugsCerca[i];
                if (jugador == player_local) continue;
                mp.events.callRemote('ascensores:AscensorLleno', jugador, jugMaximosEnAscensor)
            }
            return;
        }

        let z;
        let seleccionadaPlanta4 = false;
        let seleccionadaPlanta2 = false;

        switch (item.Text) {
            case "Planta 4":
                z = 106.9129;
                seleccionadaPlanta4 = true;
                break;
            case "Planta 2":
                z = 99.11225;
                seleccionadaPlanta2 = true;
                break;
        }

        if ((pos_z_4 == true && seleccionadaPlanta4 == true) || (pos_z_2 == true && seleccionadaPlanta2 == true)) {
            mostrarAviso("info", 8000, "Ya estas en la " + item.Text);
            return;
        }

        for (let i = 0; i < jugsCerca.length; i++) {
            let jugador = jugsCerca[i];
            mp.events.callRemote('ascensores:tpAscensor', jugador, new mp.Vector3(jugador.position.x, jugador.position.y, z), jugador.getRotation(2), item.Text, enPlanta, 6);
        }

        ascensorFIB_2?.Close();
    });

    ascensorFIB_2.MenuClose.on(item => {
        ascensorFIB_2 = null;
    });
    mp.gui.chat.show(false); // Si esto está aqui es por algo, no te hagas el listo de borrarlo sin preguntar a quien lo ha puesto el porqué lo hizo
}
function cerrar_ascensor_FIB_Edificio2() {
    if (ascensorFIB_2 != null) {
        mp.events.call("sound:cancel");
        ascensorFIB_2?.Close();
    }
}


function mostrar_ascensor_Comisaria_Vespucci_1()
{
    // Obtenemos los trabajos del jugador que abre el menu del ascensor para saber si tiene permiso para usarlo o no
    let jug = mp.controladorJugadores._jugadores[player_local.id];

    // Obtenemos si está en el ascensor 1 o 2 de vespucci
    let ascensorVespucci = 0;
    if (!(calcDist(player_local.position, posAscensoresComisariaVespucci[0]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[1]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[2]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[3]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[4]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[5]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[6]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[7]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[8]) > 2)) {
        ascensorVespucci = 1;
    }
    if (!(calcDist(player_local.position, posAscensoresComisariaVespucci[9]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[10]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[11]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[12]) > 2 &&
        calcDist(player_local.position, posAscensoresComisariaVespucci[13]) > 2)) {
        ascensorVespucci = 2;
    }

    let pos_z = player_local.position.z.toFixed(4);
    let pos_z_6 = pos_z >= 37.2432 && pos_z <= 39.2432;
    let pos_z_5 = pos_z >= 33.36075 && pos_z <= 35.3807;
    let pos_z_4 = pos_z >= 29.7571 && pos_z <= 31.7571;
    let pos_z_3 = pos_z >= 25.8275 && pos_z <= 27.8275;
    let pos_z_2 = pos_z >= 21.0386 && pos_z <= 24.0586;
    let pos_z_1 = pos_z >= 18.0012 && pos_z <= 20.0012;
    let pos_z_Menos_3 = pos_z >= 12.6873 && pos_z <= 15.6873;
    let pos_z_Menos_2 = pos_z >= 9.2766 && pos_z <= 11.5766;
    let pos_z_Menos_1 = pos_z >= 3.8841 && pos_z <= 6.8841;

    itemMENOS1 = null
    itemMENOS2 = null
    itemMENOS3 = null
    item1 = null
    item2 = null
    item3 = null
    item4 = null
    item5 = null
    item6 = null

    if ((jug.trabajos).includes(1) || (jug.trabajos).includes(2) || (jug.trabajos).includes(25)) // Si tiene el trabajo de policia, sheriff o FIB..
    {
        if (ascensorVespucci == 1)
        {
            if (ascensorComisariaVespucci1_necesitaMantenimiento) {
                ascensorComisaria_Vespucci_1 = crearMenu("Ascensor 1", "Comisaria de Vespucci");
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 6", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 5", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -3", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -2", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -1", "El ascensor 1 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                mp.events.call("sound:play", "ascensorEnMantenimiento", false);
            }
            else {
                ascensorComisaria_Vespucci_1 = crearMenu("Ascensor 1", "Comisaria de Vespucci");
                item6 = new UIMenuItem("Planta 6", "Helipuerto. Techo");
                ascensorComisaria_Vespucci_1.AddItem(item6);
                item5 = new UIMenuItem("Planta 5", "Oficina de detectives. Oficina de capitanes. Personal de oficina");
                ascensorComisaria_Vespucci_1.AddItem(item5);
                item4 = new UIMenuItem("Planta 4", "Dispatch. Headquarters. Asuntos internos. Personal de oficina");
                ascensorComisaria_Vespucci_1.AddItem(item4);
                item3 = new UIMenuItem("Planta 3", "Gimnasio. Oficinas de división. Taquillas. Sala de prensa");
                ascensorComisaria_Vespucci_1.AddItem(item3);
                item2 = new UIMenuItem("Planta 2", "Cafetería");
                ascensorComisaria_Vespucci_1.AddItem(item2);
                item1 = new UIMenuItem("Planta 1", "Sala principal. Sala de trámites. Sala de entrevistas. Sala de conferencias");
                ascensorComisaria_Vespucci_1.AddItem(item1);
                itemMENOS3 = new UIMenuItem("Planta -3", "Garaje LSPD. Sala de armería");
                ascensorComisaria_Vespucci_1.AddItem(itemMENOS3);
                itemMENOS2 = new UIMenuItem("Planta -2", "Laboratorio criminalístico. Salas de pruebas");
                ascensorComisaria_Vespucci_1.AddItem(itemMENOS2);
                itemMENOS1 = new UIMenuItem("Planta -1", "Celdas de detención. Sala de identificación. Sala de interrogacion. Garaje forense");
                ascensorComisaria_Vespucci_1.AddItem(itemMENOS1);
            }
        }
        else if (ascensorVespucci == 2)
        {
            if (ascensorComisariaVespucci2_necesitaMantenimiento) {
                ascensorComisaria_Vespucci_1 = crearMenu("Ascensor 2", "Comisaria de Vespucci");
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "El ascensor 2 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible desde este ascensor. Sube por el otro ascensor o por las escaleras"), "Rojo");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "El ascensor 2 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -3", "El ascensor 2 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -2", "El ascensor 2 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -1", "El ascensor 2 necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
                ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
                mp.events.call("sound:play", "ascensorEnMantenimiento", false);
            }
            else {
                ascensorComisaria_Vespucci_1 = crearMenu("Ascensor 2", "Comisaria de Vespucci");
                item3 = new UIMenuItem("Planta 3", "Gimnasio. Oficinas de división. Taquillas. Sala de prensa");
                ascensorComisaria_Vespucci_1.AddItem(item3);
                item2 = aplicarColores(new UIMenuItem("Planta 2", "Esta planta no está disponible desde este ascensor. Sube por el otro ascensor o por las escaleras"), "Rojo");
                item2.SetRightBadge(BadgeStyle.Lock);
                ascensorComisaria_Vespucci_1.AddItem(item2);
                item1 = new UIMenuItem("Planta 1", "Sala principal. Sala de trámites. Sala de entrevistas. Sala de conferencias");
                ascensorComisaria_Vespucci_1.AddItem(item1);
                itemMENOS3 = new UIMenuItem("Planta -3", "Garaje LSPD. Sala de armería");
                ascensorComisaria_Vespucci_1.AddItem(itemMENOS3);
                itemMENOS2 = new UIMenuItem("Planta -2", "Laboratorio criminalístico. Salas de pruebas");
                ascensorComisaria_Vespucci_1.AddItem(itemMENOS2);
                itemMENOS1 = new UIMenuItem("Planta -1", "Celdas de detención. Sala de identificación. Sala de interrogacion. Garaje forense");
                ascensorComisaria_Vespucci_1.AddItem(itemMENOS1);
            }
        } 
    }
    else // Si no tiene el trabajo de policia, sheriff o FIB..
    {
        if (ascensorVespucci == 1)
        {
            ascensorComisaria_Vespucci_1 = crearMenu("Ascensor 1", "Comisaria de Vespucci");
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 6", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 5", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 4", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
        }
        else if (ascensorVespucci == 2)
        {
            ascensorComisaria_Vespucci_1 = crearMenu("Ascensor 2", "Comisaria de Vespucci");
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta -1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_Vespucci_1.AddItem(ascensorOpcionItem);
        } 
    }

    let enPlanta = 0;
    if (pos_z_6) {
        enPlanta = 6;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + (-1);
        if (item6 != null) {
            item6.Description = item6.Description + "\nEstás en esta planta";
            item6.HighlightedBackColor = new Color(0, 214, 103, 255);
            item6.ForeColor = new Color(0, 214, 103, 255);
            item6.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
        
    }
    else if (pos_z_5) {
        enPlanta = 5;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + 0;
        if (item5 != null) {
            item5.Description = item5.Description + "\nEstás en esta planta";
            item5.HighlightedBackColor = new Color(0, 214, 103, 255);
            item5.ForeColor = new Color(0, 214, 103, 255);
            item5.HighlightedForeColor = new Color(0, 0, 0, 255);
        }        
    }
    else if (pos_z_4) {
        enPlanta = 4;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + 1;
        if (item4 != null) {
            item4.Description = item4.Description + "\nEstás en esta planta";
            item4.HighlightedBackColor = new Color(0, 214, 103, 255);
            item4.ForeColor = new Color(0, 214, 103, 255);
            item4.HighlightedForeColor = new Color(0, 0, 0, 255);
        } 
    }
    else if (pos_z_3) {
        enPlanta = 3;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + 2;
        if (item3 != null) {
            item3.Description = item3.Description + "\nEstás en esta planta";
            item3.HighlightedBackColor = new Color(0, 214, 103, 255);
            item3.ForeColor = new Color(0, 214, 103, 255);
            item3.HighlightedForeColor = new Color(0, 0, 0, 255);
        } 
    }
    else if (pos_z_2) {
        enPlanta = 2;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + 3;
        if (item2 != null) {
            item2.Description = item2.Description + "\nEstás en esta planta";
            item2.HighlightedBackColor = new Color(0, 214, 103, 255);
            item2.ForeColor = new Color(0, 214, 103, 255);
            item2.HighlightedForeColor = new Color(0, 0, 0, 255);
        } 
    }
    else if (pos_z_1) {
        enPlanta = 1;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + 4;
        if (item1 != null) {
            item1.Description = item1.Description + "\nEstás en esta planta";
            item1.HighlightedBackColor = new Color(0, 214, 103, 255);
            item1.ForeColor = new Color(0, 214, 103, 255);
            item1.HighlightedForeColor = new Color(0, 0, 0, 255);
        } 
    }
    else if (pos_z_Menos_3) {
        enPlanta = -3;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + 5;
        if (itemMENOS3 != null) {
            itemMENOS3.Description = itemMENOS3.Description + "\nEstás en esta planta";
            itemMENOS3.HighlightedBackColor = new Color(0, 214, 103, 255);
            itemMENOS3.ForeColor = new Color(0, 214, 103, 255);
            itemMENOS3.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }
    else if (pos_z_Menos_2) {
        enPlanta = -2;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + 6;
        if (itemMENOS2 != null) {
            itemMENOS2.Description = itemMENOS2.Description + "\nEstás en esta planta";
            itemMENOS2.HighlightedBackColor = new Color(0, 214, 103, 255);
            itemMENOS2.ForeColor = new Color(0, 214, 103, 255);
            itemMENOS2.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }
    else if (pos_z_Menos_1) {
        enPlanta = -1;
        ascensorComisaria_Vespucci_1._activeItem = 1e3 + 7;
        if (itemMENOS1 != null) {
            itemMENOS1.Description = itemMENOS1.Description + "\nEstás en esta planta";
            itemMENOS1.HighlightedBackColor = new Color(0, 214, 103, 255);
            itemMENOS1.ForeColor = new Color(0, 214, 103, 255);
            itemMENOS1.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }

    ascensorComisaria_Vespucci_1.ItemSelect.on((item, index) => {

        if (!((jug.trabajos).includes(1) || (jug.trabajos).includes(2) || (jug.trabajos).includes(25))) {
            mostrarAviso("danger", 5000, 'No tienes autorización para hacer uso de este ascensor');
            return;
        }

        if (ascensorVespucci == 2 && item.Text == "Planta 2")
        {
            mostrarAviso("admin", 5000, 'Esta planta no está disponible desde este ascensor. Sube por el otro ascensor o por las escaleras');
            return;
        }

        if (ascensorVespucci == 1)
        {
            if (ascensorComisariaVespucci1_necesitaMantenimiento) {
                mp.events.call("sound:play", "ascensorEnMantenimiento", false);
                mostrarAviso("admin", 5000, 'El ascensor 1 necesita mantenimiento, no es posible hacer uso de él');
                return;
            }
        }
        else if (ascensorVespucci == 2)
        {
            if (ascensorComisariaVespucci2_necesitaMantenimiento) {
                mp.events.call("sound:play", "ascensorEnMantenimiento", false);
                mostrarAviso("admin", 5000, 'El ascensor 2 necesita mantenimiento, no es posible hacer uso de él');
                return;
            }
        }

        if (!puedeUsarAscensor)
        {
            mostrarAviso("admin", 5000, 'Espera 5 segundos a que el motor del ascensor se enfrie');
            return;
        }

        let enAscensor = false;
        let ascensor;
        let jugMaximosEnAscensor = 8; //Maximo de personas dentro del ascensor

        for (let i = 0; i < posAscensoresComisariaVespucci.length; i++) {
            if (calcDist(player_local.position, posAscensoresComisariaVespucci[i]) < 1.9 && player_local.dimension == 0) {
                ascensor = posAscensoresComisariaVespucci[i];
                enAscensor = true;
            }
        }

        if (!enAscensor) {
            mostrarAviso("danger", 8000, 'Debes estar dentro del ascensor para poder hacer eso');
            return;
        }

        let jugsCerca = mp.players.toArray().filter((jug) => (calcDist(jug.position, ascensor) < 1.9 && jug.dimension == 0 && Math.abs(jug.position.z - ascensor.z) <= 3.0));

        for (let i = 0; i < jugsCerca.length; i++) {
            if (jugsCerca[i].vehicle) {
                mostrarAviso("danger", 8000, 'No puedes hacer uso del ascensor si hay gente con vehículos en su interior');
                return;
            }
        }

        if (jugsCerca.length > jugMaximosEnAscensor)
        {
            mostrarAviso("info", 8000, "El ascensor tiene demasiado peso. Maximo " + jugMaximosEnAscensor + " ocupantes");
            mp.game.audio.playSoundFromCoord(-1, "ERROR", player_local.position.x, player_local.position.y, player_local.position.z, "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, false);

            for (let i = 0; i < jugsCerca.length; i++) {
                let jugador = jugsCerca[i];
                if (jugador == player_local) continue;
                mp.events.callRemote('ascensores:AscensorLleno', jugador, jugMaximosEnAscensor)
            }
            return;
        }

        let z;

        let seleccionadaPlanta6 = false;
        let seleccionadaPlanta5 = false;
        let seleccionadaPlanta4 = false;
        let seleccionadaPlanta3 = false;
        let seleccionadaPlanta2 = false;
        let seleccionadaPlanta1 = false;
        let seleccionadaPlantaMenos3 = false;
        let seleccionadaPlantaMenos2 = false;
        let seleccionadaPlantaMenos1 = false;

        switch (item.Text) {
            case "Planta 6":
                z = 38.2432;
                seleccionadaPlanta6 = true;
                break;
            case "Planta 5":
                z = 34.36075;
                seleccionadaPlanta5 = true;
                break;
            case "Planta 4":
                z = 30.757141;
                seleccionadaPlanta4 = true;
                break;
            case "Planta 3":
                if (ascensorVespucci == 1) z = 26.827583;
                else if (ascensorVespucci == 2) z = 27.036465;             
                seleccionadaPlanta3 = true;
                break;
            case "Planta 2":
                z = 23.038637;
                seleccionadaPlanta2 = true;
                break;
            case "Planta 1":
                if (ascensorVespucci == 1) z = 19.001205;
                else if (ascensorVespucci == 2) z = 19.035643; 
                seleccionadaPlanta1 = true;
                break;
            case "Planta -3":
                if (ascensorVespucci == 1) z = 13.6873665;
                else if (ascensorVespucci == 2) z = 14.882768; 
                seleccionadaPlantaMenos3 = true;
                break;
            case "Planta -2":
                if (ascensorVespucci == 1) z = 10.276635;
                else if (ascensorVespucci == 2) z = 11.03725;
                seleccionadaPlantaMenos2 = true;
                break;
            case "Planta -1":
                if (ascensorVespucci == 1) z = 4.884179;
                else if (ascensorVespucci == 2) z = 5.479814;   
                seleccionadaPlantaMenos1 = true;
                break;
        }

        if ((pos_z_6 == true && seleccionadaPlanta6 == true) ||
            (pos_z_5 == true && seleccionadaPlanta5 == true) ||
            (pos_z_4 == true && seleccionadaPlanta4 == true) ||
            (pos_z_3 == true && seleccionadaPlanta3 == true) ||
            (pos_z_2 == true && seleccionadaPlanta2 == true) ||
            (pos_z_1 == true && seleccionadaPlanta1 == true) ||
            (pos_z_Menos_3 == true && seleccionadaPlantaMenos3 == true) ||
            (pos_z_Menos_2 == true && seleccionadaPlantaMenos2 == true) ||
            (pos_z_Menos_1 == true && seleccionadaPlantaMenos1 == true))
        {
            mostrarAviso("info", 8000, "Ya estas en la " + item.Text);
            return;
        }

        let tiempoAudioAscensor = 3;
        if (pos_z_6)
        {
            if (item.Text == "Planta 5") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta 4") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta 3") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta 2") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta 1") tiempoAudioAscensor = 15;
            else if (item.Text == "Planta -3") tiempoAudioAscensor = 18;
            else if (item.Text == "Planta -2") tiempoAudioAscensor = 21;
            else if (item.Text == "Planta -1") tiempoAudioAscensor = 24;
        }
        else if (pos_z_5)
        {
            if (item.Text == "Planta 6") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta 4") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta 3") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta 2") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta 1") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta -3") tiempoAudioAscensor = 15;
            else if (item.Text == "Planta -2") tiempoAudioAscensor = 18;
            else if (item.Text == "Planta -1") tiempoAudioAscensor = 21;
        }
        else if (pos_z_4)
        {
            if (item.Text == "Planta 6") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta 5") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta 3") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta 2") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta 1") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta -3") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta -2") tiempoAudioAscensor = 15;
            else if (item.Text == "Planta -1") tiempoAudioAscensor = 18;
        }
        else if (pos_z_3)
        {
            if (item.Text == "Planta 6") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta 5") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta 4") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta 2") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta 1") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta -3") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta -2") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta -1") tiempoAudioAscensor = 15;
        }
        else if (pos_z_2)
        {
            if (item.Text == "Planta 6") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta 5") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta 4") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta 3") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta 1") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta -3") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta -2") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta -1") tiempoAudioAscensor = 12;
        }
        else if (pos_z_1)
        {
            if (item.Text == "Planta 6") tiempoAudioAscensor = 15;
            else if (item.Text == "Planta 5") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta 4") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta 3") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta 2") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta -3") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta -2") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta -1") tiempoAudioAscensor = 9;
        }
        else if (pos_z_Menos_3)
        {
            if (item.Text == "Planta 6") tiempoAudioAscensor = 18;
            else if (item.Text == "Planta 5") tiempoAudioAscensor = 15;
            else if (item.Text == "Planta 4") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta 3") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta 2") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta 1") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta -2") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta -1") tiempoAudioAscensor = 6;
        }
        else if (pos_z_Menos_2)
        {
            if (item.Text == "Planta 6") tiempoAudioAscensor = 21;
            else if (item.Text == "Planta 5") tiempoAudioAscensor = 18;
            else if (item.Text == "Planta 4") tiempoAudioAscensor = 15;
            else if (item.Text == "Planta 3") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta 2") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta 1") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta -3") tiempoAudioAscensor = 3;
            else if (item.Text == "Planta -1") tiempoAudioAscensor = 3;
        }
        else if (pos_z_Menos_1)
        {
            if (item.Text == "Planta 6") tiempoAudioAscensor = 24;
            else if (item.Text == "Planta 5") tiempoAudioAscensor = 21;
            else if (item.Text == "Planta 4") tiempoAudioAscensor = 18;
            else if (item.Text == "Planta 3") tiempoAudioAscensor = 15;
            else if (item.Text == "Planta 2") tiempoAudioAscensor = 12;
            else if (item.Text == "Planta 1") tiempoAudioAscensor = 9;
            else if (item.Text == "Planta -3") tiempoAudioAscensor = 6;
            else if (item.Text == "Planta -2") tiempoAudioAscensor = 3;
        }

        for (let i = 0; i < jugsCerca.length; i++) {
            let jugador = jugsCerca[i];
            mp.events.callRemote('ascensores:tpAscensor', jugador, new mp.Vector3(jugador.position.x, jugador.position.y, z), jugador.getRotation(2), item.Text, enPlanta, tiempoAudioAscensor);
        }

        ascensorComisaria_Vespucci_1?.Close();
    });

    ascensorComisaria_Vespucci_1.MenuClose.on(item => {
        ascensorComisaria_Vespucci_1 = null;
    });
    mp.gui.chat.show(false); // Si esto está aqui es por algo, no te hagas el listo de borrarlo sin preguntar a quien lo ha puesto el porqué lo hizo
}
function cerrar_ascensor_Comisaria_Vespucci_1() {
    if (ascensorComisaria_Vespucci_1 != null) {
        mp.events.call("sound:cancel");
        ascensorComisaria_Vespucci_1?.Close();
    }
}


function mostrar_ascensor_Comisaria_RockfordHills()
{
    // Obtenemos los trabajos del jugador que abre el menu del ascensor para saber si tiene permiso para usarlo o no
    let jug = mp.controladorJugadores._jugadores[player_local.id];

    let pos_z = player_local.position.z.toFixed(4);
    let pos_z_3 = pos_z >= 47.7190 && pos_z <= 48.1190;
    let pos_z_2 = pos_z >= 42.6674 && pos_z <= 43.0674;
    let pos_z_1 = pos_z >= 38.2105 && pos_z <= 38.6105;

    item3 = false;
    item2 = false;
    item1 = false;

    if ((jug.trabajos).includes(1) || (jug.trabajos).includes(2) || (jug.trabajos).includes(25))
    {
        // Si tiene el trabajo de policia, sheriff o FIB..
        if (ascensorComisariaRockfordHills_necesitaMantenimiento)
        {
            // Si el ascensor está en mantenimiento
            ascensorComisaria_RockfordHills = crearMenu("Ascensor", "Comisaria de Rockford Hills");
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "El ascensor necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_RockfordHills.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "El ascensor necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_RockfordHills.AddItem(ascensorOpcionItem);
            ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "El ascensor necesita mantenimiento, no es posible hacer uso de él"), "Naranja");
            ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
            ascensorComisaria_RockfordHills.AddItem(ascensorOpcionItem);
            mp.events.call("sound:play", "ascensorEnMantenimiento", false);
        }
        else
        {
            ascensorComisaria_RockfordHills = crearMenu("Ascensor", "Comisaria de Rockford Hills");
            item3 = new UIMenuItem("Planta 3", "Oficina de fuerzas especiales. Sala de información. Salón de clases. Oficina. Cocina");
            ascensorComisaria_RockfordHills.AddItem(item3);
            item2 = new UIMenuItem("Planta 2", "Sala Forense. Oficinas. Oficina del jefe. Almacenamiento. Depósito de cadáveres");
            ascensorComisaria_RockfordHills.AddItem(item2);
            item1 = new UIMenuItem("Planta 1", "Recepción");
            ascensorComisaria_RockfordHills.AddItem(item1);
        }
    }
    else
    {
        // Si no tiene el trabajo de policia, sheriff o FIB..
        ascensorComisaria_RockfordHills = crearMenu("Ascensor", "Comisaria de Rockford Hills");
        ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 3", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
        ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
        ascensorComisaria_RockfordHills.AddItem(ascensorOpcionItem);
        ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 2", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
        ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
        ascensorComisaria_RockfordHills.AddItem(ascensorOpcionItem);
        ascensorOpcionItem = aplicarColores(new UIMenuItem("Planta 1", "No tienes autorización para hacer uso de este ascensor"), "Rojo");
        ascensorOpcionItem.SetRightBadge(BadgeStyle.Lock);
        ascensorComisaria_RockfordHills.AddItem(ascensorOpcionItem);
    }

    let enPlanta = 0;
    if (pos_z_3) {
        enPlanta = 3;
        ascensorComisaria_RockfordHills._activeItem = 1e3 + (-1);
        if (item3 != null) {
            item3.Description = item3.Description + "\nEstás en esta planta";
            item3.HighlightedBackColor = new Color(0, 214, 103, 255);
            item3.ForeColor = new Color(0, 214, 103, 255);
            item3.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }
    else if (pos_z_2) {
        enPlanta = 2;
        ascensorComisaria_RockfordHills._activeItem = 1e3 + 0;
        if (item2 != null) {
            item2.Description = item2.Description + "\nEstás en esta planta";
            item2.HighlightedBackColor = new Color(0, 214, 103, 255);
            item2.ForeColor = new Color(0, 214, 103, 255);
            item2.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }
    else if (pos_z_1) {
        enPlanta = 1;
        ascensorComisaria_RockfordHills._activeItem = 1e3 + 1;
        if (item1 != null) {
            item1.Description = item1.Description + "\nEstás en esta planta";
            item1.HighlightedBackColor = new Color(0, 214, 103, 255);
            item1.ForeColor = new Color(0, 214, 103, 255);
            item1.HighlightedForeColor = new Color(0, 0, 0, 255);
        }
    }

    ascensorComisaria_RockfordHills.ItemSelect.on((item, index) => {

        if (!((jug.trabajos).includes(1) || (jug.trabajos).includes(2) || (jug.trabajos).includes(25)))
        {
            mostrarAviso("danger", 5000, 'No tienes autorización para hacer uso de este ascensor');
            return;
        }

        if (ascensorComisariaRockfordHills_necesitaMantenimiento) {
            mp.events.call("sound:play", "ascensorEnMantenimiento", false);
            mostrarAviso("admin", 5000, 'El ascensor 5 necesita mantenimiento, no es posible hacer uso de él');
            return;
        }

        if (!puedeUsarAscensor) {
            mostrarAviso("admin", 5000, 'Espera 5 segundos a que el motor del ascensor se enfrie');
            return;
        }

        let enAscensor = false;
        let ascensor;
        let jugMaximosEnAscensor = 6; //Maximo de personas dentro del ascensor

        for (let i = 0; i < posAscensoresComisariaRockfordHills.length; i++) {
            if (calcDist(player_local.position, posAscensoresComisariaRockfordHills[i]) < 1.5 && player_local.dimension == 0) {
                ascensor = posAscensoresComisariaRockfordHills[i];
                enAscensor = true;
            }
        }

        if (!enAscensor) {
            mostrarAviso("danger", 8000, 'Debes estar dentro del ascensor para poder hacer eso');
            return;
        }

        let jugsCerca = mp.players.toArray().filter((jug) => (calcDist(jug.position, ascensor) < 1.5 && jug.dimension == 0 && Math.abs(jug.position.z - ascensor.z) <= 3.0));

        for (let i = 0; i < jugsCerca.length; i++) {
            if (jugsCerca[i].vehicle) {
                mostrarAviso("danger", 8000, 'No puedes hacer uso del ascensor si hay gente con vehículos en su interior');
                return;
            }
        }

        if (jugsCerca.length > jugMaximosEnAscensor) {
            mostrarAviso("info", 8000, "El ascensor tiene demasiado peso. Maximo " + jugMaximosEnAscensor + " ocupantes");
            mp.game.audio.playSoundFromCoord(-1, "ERROR", player_local.position.x, player_local.position.y, player_local.position.z, "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, false);

            for (let i = 0; i < jugsCerca.length; i++) {
                let jugador = jugsCerca[i];
                if (jugador == player_local) continue;
                mp.events.callRemote('ascensores:AscensorLleno', jugador, jugMaximosEnAscensor)
            }
            return;
        }

        let seleccionadaPlanta3 = false;
        let seleccionadaPlanta2 = false;
        let seleccionadaPlanta1 = false;

        let posicion;
        let rotacion;
        switch (item.Text) {
            case "Planta 3":
                seleccionadaPlanta3 = true;
                posicion = new mp.Vector3(-575.4706, -137.05467, 47.92124);
                rotacion = new mp.Vector3(0, 0, 108.92541);
                break;
            case "Planta 2":
                seleccionadaPlanta2 = true;
                posicion = new mp.Vector3(-575.0159, -136.7607, 42.86349);
                rotacion = new mp.Vector3(0, 0, 107.73367);
                break;
            case "Planta 1":
                seleccionadaPlanta2 = true;
                posicion = new mp.Vector3(-570.6355, -128.14297, 38.450138);
                rotacion = new mp.Vector3(0, 0, -72.42717);
                break;
        }

        if ((pos_z_3 == true && seleccionadaPlanta3 == true) || (pos_z_2 == true && seleccionadaPlanta2 == true) || (pos_z_1 == true && seleccionadaPlanta1 == true)) {
            mostrarAviso("info", 8000, "Ya estas en la " + item.Text);
            return;
        }

        let tiempoAudioAscensor = 3;

        if (pos_z_3) {
            if (item.Text == "Planta 2") {
                tiempoAudioAscensor = 3;
            }
            else if (item.Text == "Planta 1") {
                tiempoAudioAscensor = 6;
            }
        }
        else if (pos_z_2) {
            tiempoAudioAscensor = 3;
        }
        else if (pos_z_1) {
            if (item.Text == "Planta 2") {
                tiempoAudioAscensor = 3;
            }
            else if (item.Text == "Planta 3") {
                tiempoAudioAscensor = 6;
            }
        }

        for (let i = 0; i < jugsCerca.length; i++) {
            let jugador = jugsCerca[i];
            mp.events.callRemote('ascensores:tpAscensor', jugador, posicion, rotacion, item.Text, enPlanta, tiempoAudioAscensor);
        }

        ascensorComisaria_RockfordHills?.Close();
    });

    ascensorComisaria_RockfordHills.MenuClose.on(item => {
        ascensorComisaria_RockfordHills = null;
    });
    mp.gui.chat.show(false); // Si esto está aqui es por algo, no te hagas el listo de borrarlo sin preguntar a quien lo ha puesto el porqué lo hizo
}
function cerrar_ascensor_Comisaria_RockfordHills() {
    if (ascensorComisaria_RockfordHills != null) {
        ascensorComisaria_RockfordHills?.Close();
        mp.events.call("sound:cancel");
    }
}


function mostrar_ascensor_Hospital_Pillbox(ascensor) {
    if (!logueado)
        return;
    if (ascensor == 0)
        return;

    switch (parseInt(ascensor)) {
        case 1:
            mp.players.local.position = new mp.Vector3(330.3331, -601.1409, 43.284084);
            mp.players.local.setHeading(68);
            mostrarAviso("info", 3000, 'Has llegado a la planta');
            break;
        case 2:
            mp.players.local.position = new mp.Vector3(332.28677, -595.6692, 43.284084);
            mp.players.local.setHeading(68);
            mostrarAviso("info", 3000, 'Has llegado a la planta');
            break;
        case 3:
            mp.players.local.position = new mp.Vector3(342.22, -585.497, 28.799286);
            mostrarAviso("info", 3000, 'Has llegado al garaje');
            break;
        case 4:
            mp.players.local.position = new mp.Vector3(343.5259, -581.7806, 28.799236);
            mostrarAviso("info", 3000, 'Has llegado al garaje');
            break;
        case 5:
            mp.players.local.position = new mp.Vector3(338.9164, -584.0134, 74.16557);
            mp.players.local.setHeading(-113);
            mostrarAviso("info", 3000, 'Has llegado a la azotea');
            break;
        case 6:
            mp.players.local.position = new mp.Vector3(327.20126, -603.6753, 43.284054);
            mp.players.local.setHeading(-18);
            mostrarAviso("info", 3000, 'Has llegado a la planta');
            break;
    }

    // Le ponemos el sonido como si hubiese llegado a su fin el ascensor
    mp.events.call("sound:play", "ding", false);
}
/*function mostrar_ascensor_Hospital_Pillbox() {
    if (ascensorHospital_Pillbox != null) {
        ascensorHospital_Pillbox?.Close();
    }
}*/


function pantallaMovimientoAscensor(player, playerReceiver, tiempoMovimientoAscensor, desde, hacia)
{
    fadeInOut(100, 1000, 800);
    if (!hudOculto) mp.events.call("hud:estado_hud");
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.gui.chat.show(false);
    mp.events.call("sound:play", "ascensor", false);
    player_local.freezePosition(true);
    player_local.setInvincible(true);
    player_local.setCollision(false, false);

    // Comprobacion para saber si el ascensor sube o baja
    let direccion = "";
    if (hacia < 0 && desde < 0) {
        if (hacia < desde) {
            direccion = "sube";
        } else {
            direccion = "baja";
        }
    } else {
        if (hacia < desde) {
            direccion = "baja";
        } else {
            direccion = "sube";
        }
    }

    crearTimeout(() =>
    {
        if (ascensor_cefId < 0 && !cef_ascensor.existeCef(cef_ascensor)) {
            ascensor_cefId = cef_ascensor.crearCef("package://LURP/cef/ascensor/ascensor.html", {
                mostrarCursor: false,
                sumarNumeroCefs: false
            });
        }

        cef_ascensor.ejecutarCef(ascensor_cefId, `actualizarInfoCef('${desde}', '${direccion}', '${1}')`);

        if (tiempoMovimientoAscensor > 3) // Si el tiempo es mayor a 3, creamos el intervalo que irá cambiandole el fade por el cef de la foto de la puerta del ascensor, si es menor a 3 significa que está cambiando 1 planta (de planta 1 a planta 2 por ejemplo) y por lo tanto no hay que mostrar nada
        { 
            let intervalopPantalla = null;
            let contador = 0;
            intervalopPantalla = setInterval(() => {
                contador = contador + 3;
                if (contador == tiempoMovimientoAscensor)
                {
                    cef_ascensor.ejecutarCef(ascensor_cefId, `actualizarInfoCef('${hacia}', '${direccion}', '${0.25}', '${true}')`);

                    mp.events.call("sound:cancel");
                    mp.events.call("sound:play", "ding", false);

                    crearTimeout(() =>
                    {
                        if (ascensor_cefId >= 0) {
                            if (player == playerReceiver) {
                                cef_ascensor.cerrarCef(ascensor_cefId, false, false, false);
                            }
                            else {
                                cef_ascensor.cerrarCef(ascensor_cefId, false);
                            }
                            ascensor_cefId = -1;
                        }
                        if (hudOculto) mp.events.call("hud:estado_hud");
                        if (tipoMapa != 2) mp.game.ui.displayRadar(true);
                        player_local.freezePosition(false);
                        player_local.setInvincible(false);
                        player_local.setCollision(true, false);
                        mp.game.ui.displayHud(true);
                        mp.gui.chat.show(true);
                        clearInterval(intervalopPantalla);
                        intervalopPantalla = null;
                        contador = 0;
                        bloquearUsoAscensor();
                    }, 850); 
                }
                else
                {
                    let planta = undefined;
                    if (desde == 6)
                    {
                        if (hacia == 4) {
                            if (contador == 3) planta = 5;
                        }
                        else if (hacia == 3) {
                            if (contador == 3) planta = 5;
                            else if (contador == 6) planta = 4;
                        }
                        else if (hacia == 2) {
                            if (contador == 3) planta = 5;
                            else if (contador == 6) planta = 4;
                            else if (contador == 9) planta = 3;
                        }
                        else if (hacia == 1) {
                            if (contador == 3) planta = 5;
                            else if (contador == 6) planta = 4;
                            else if (contador == 9) planta = 3;
                            else if (contador == 12) planta = 2;
                        }
                        else if (hacia == -3) {
                            if (contador == 3) planta = 5;
                            else if (contador == 6) planta = 4;
                            else if (contador == 9) planta = 3;
                            else if (contador == 12) planta = 2;
                            else if (contador == 15) planta = 1;
                        }
                        else if (hacia == -2) {
                            if (contador == 3) planta = 5;
                            else if (contador == 6) planta = 4;
                            else if (contador == 9) planta = 3;
                            else if (contador == 12) planta = 2;
                            else if (contador == 15) planta = 1;
                            else if (contador == 18) planta = -3;
                        }
                        else if (hacia == -1) {
                            if (contador == 3) planta = 5;
                            else if (contador == 6) planta = 4;
                            else if (contador == 9) planta = 3;
                            else if (contador == 12) planta = 2;
                            else if (contador == 15) planta = 1;
                            else if (contador == 18) planta = -3;
                            else if (contador == 21) planta = -2;
                        }
                    }
                    else if (desde == 5)
                    {
                        if (hacia == 3) {
                            if (contador == 3) planta = 4;
                        }
                        else if (hacia == 2) {
                            if (contador == 3) planta = 4;
                            else if (contador == 6) planta = 3;
                        }
                        else if (hacia == 1) {
                            if (contador == 3) planta = 4;
                            else if (contador == 6) planta = 3;
                            else if (contador == 9) planta = 2;
                        }
                        else if (hacia == -3) {
                            if (contador == 3) planta = 4;
                            else if (contador == 6) planta = 3;
                            else if (contador == 9) planta = 2;
                            else if (contador == 12) planta = 1;
                        }
                        else if (hacia == -2) {
                            if (contador == 3) planta = 4;
                            else if (contador == 6) planta = 3;
                            else if (contador == 9) planta = 2;
                            else if (contador == 12) planta = 1;
                            else if (contador == 15) planta = -3;
                        }
                        else if (hacia == -1) {
                            if (contador == 3) planta = 4;
                            else if (contador ==6) planta = 3;
                            else if (contador == 9) planta = 2;
                            else if (contador == 12) planta = 1;
                            else if (contador == 15) planta = -3;
                            else if (contador == 18) planta = -2;
                        }
                    }
                    else if (desde == 4)
                    {
                        if (hacia == 6) {
                            if (contador == 3) planta = 5;
                        }
                        else if (hacia == 2) {
                            if (contador == 3) planta = 3;
                        }
                        else if (hacia == 1) {
                            if (contador == 3) planta = 3;
                            else if (contador == 6) planta = 2;
                        }
                        else if (hacia == -3) {
                            if (contador == 3) planta = 3;
                            else if (contador == 6) planta = 2;
                            else if (contador == 9) planta = 1;
                        }
                        else if (hacia == -2) {
                            if (contador == 3) planta = 3;
                            else if (contador == 6) planta = 2;
                            else if (contador == 9) planta = 1;
                            else if (contador == 12) planta = -3;
                        }
                        else if (hacia == -1) {
                            if (contador == 3) planta = 3;
                            else if (contador == 6) planta = 2;
                            else if (contador == 9) planta = 1;
                            else if (contador == 12) planta = -3;
                            else if (contador == 15) planta = -2;
                        }
                    }
                    else if (desde == 3)
                    {
                        if (hacia == 6) {
                            if (contador == 3) planta = 4;
                            else if (contador == 6) planta = 5;
                        }
                        else if (hacia == 5) {
                            if (contador == 3) planta = 4;
                        }
                        else if (hacia == 1) {
                            if (contador == 3) planta = 2;
                        }
                        else if (hacia == -3) {
                            if (contador == 3) planta = 2;
                            else if (contador == 6) planta = 1;
                        }
                        else if (hacia == -2) {
                            if (contador == 3) planta = 2;
                            else if (contador == 6) planta = 1;
                            else if (contador == 9) planta = -3;
                        }
                        else if (hacia == -1) {
                            if (contador == 3) planta = 2;
                            else if (contador == 6) planta = 1;
                            else if (contador == 9) planta = -3;
                            else if (contador == 12) planta = -2;
                        }
                    }
                    else if (desde == 2)
                    {
                        if (hacia == 6) {
                            if (contador == 3) planta = 3;
                            else if (contador == 6) planta = 4;
                            else if (contador == 9) planta = 5;
                        }
                        else if (hacia == 5) {
                            if (contador == 3) planta = 3;
                            else if (contador == 6) planta = 4;
                        }
                        else if (hacia == 4) {
                            if (contador == 3) planta = 3;
                        }
                        else if (hacia == -3) {
                            if (contador == 3) planta = 1;
                        }
                        else if (hacia == -2) {
                            if (contador == 3) planta = 1;
                            else if (contador == 6) planta = -3;
                        }
                        else if (hacia == -1) {
                            if (contador == 3) planta = 1;
                            else if (contador == 6) planta = -3;
                            else if (contador == 9) planta = -2;
                        }
                    }
                    else if (desde == 1)
                    {
                        if (hacia == 6) {
                            if (contador == 3) planta = 2;
                            else if (contador == 6) planta = 3;
                            else if (contador == 9) planta = 4;
                            else if (contador == 12) planta = 5;
                        }
                        else if (hacia == 5) {
                            if (contador == 3) planta = 2;
                            else if (contador == 6) planta = 3;
                            else if (contador == 9) planta = 4;
                        }
                        else if (hacia == 4) {
                            if (contador == 3) planta = 2;
                            else if (contador == 6) planta = 3;
                        }
                        else if (hacia == 3) {
                            if (contador == 3) planta = 2;
                        }
                        else if (hacia == -2) {
                            if (contador == 3) planta = -1;
                        }
                        else if (hacia == -1) {
                            if (contador == 3) planta = -3;
                            else if (contador == 6) planta = -2;
                        }
                    }
                    else if (desde == -3)
                    {
                        if (hacia == 6) {
                            if (contador == 3) planta = 1;
                            else if (contador == 6) planta = 2;
                            else if (contador == 9) planta = 3;
                            else if (contador == 12) planta = 4;
                            else if (contador == 15) planta = 5;
                        }
                        else if (hacia == 5) {
                            if (contador == 3) planta = 1;
                            else if (contador == 6) planta = 2;
                            else if (contador == 9) planta = 3;
                            else if (contador == 12) planta = 4;
                        }
                        else if (hacia == 4) {
                            if (contador == 3) planta = 1;
                            else if (contador == 6) planta = 2;
                            else if (contador == 9) planta = 3;
                        }
                        else if (hacia == 3) {
                            if (contador == 3) planta = 1;
                            else if (contador == 6) planta = 2;
                        }
                        else if (hacia == 2) {
                            if (contador == 3) planta = 1;
                        }
                        else if (hacia == -1) {
                            if (contador == 3) planta = -2;
                        }
                    }
                    else if (desde == -2)
                    {
                        if (hacia == 6) {
                            if (contador == 3) planta = -3;
                            else if (contador == 6) planta = 1;
                            else if (contador == 9) planta = 2;
                            else if (contador == 12) planta = 3;
                            else if (contador == 15) planta = 4;
                            else if (contador == 18) planta = 5;
                        }
                        else if (hacia == 5) {
                            if (contador == 3) planta = -3;
                            else if (contador == 6) planta = 1;
                            else if (contador == 9) planta = 2;
                            else if (contador == 12) planta = 3;
                            else if (contador == 15) planta = 4;
                        }
                        else if (hacia == 4) {
                            if (contador == 3) planta = -3;
                            else if (contador == 6) planta = 1;
                            else if (contador == 9) planta = 2;
                            else if (contador == 12) planta = 3;
                        }
                        else if (hacia == 3) {
                            if (contador == 3) planta = -3;
                            else if (contador == 6) planta = 1;
                            else if (contador == 9) planta = 2;
                        }
                        else if (hacia == 2) {
                            if (contador == 3) planta = -3;
                            else if (contador == 6) planta = 1;
                        }
                        else if (hacia == 1) {
                            if (contador == 3) planta = -3;
                        }
                    }
                    else if (desde == -1)
                    {
                        if (hacia == 6) {
                            if (contador == 3) planta = -2;
                            else if (contador == 6) planta = -3;
                            else if (contador == 9) planta = 1;
                            else if (contador == 12) planta = 2;
                            else if (contador == 15) planta = 3;
                            else if (contador == 18) planta = 4;
                            else if (contador == 21) planta = 5;
                        }
                        else if (hacia == 5) {
                            if (contador == 3) planta = -2;
                            else if (contador == 6) planta = -3;
                            else if (contador == 9) planta = 1;
                            else if (contador == 12) planta = 2;
                            else if (contador == 15) planta = 3;
                            else if (contador == 18) planta = 4;
                        }
                        else if (hacia == 4) {
                            if (contador == 3) planta = -2;
                            else if (contador == 6) planta = -3;
                            else if (contador == 9) planta = 1;
                            else if (contador == 12) planta = 2;
                            else if (contador == 15) planta = 3;
                        }
                        else if (hacia == 3) {
                            if (contador == 3) planta = -2;
                            else if (contador == 6) planta = -3;
                            else if (contador == 9) planta = 1;
                            else if (contador == 12) planta = 2;
                        }
                        else if (hacia == 2) {
                            if (contador == 3) planta = -2;
                            else if (contador == 6) planta = -3;
                            else if (contador == 9) planta = 1;
                        }
                        else if (hacia == 1) {
                            if (contador == 3) planta = -2;
                            else if (contador == 6) planta = -3;
                        }
                        else if (hacia == -3) {
                            if (contador == 3) planta = -2;
                        }
                    }

                    cef_ascensor.ejecutarCef(ascensor_cefId, `actualizarInfoCef('${planta}')`);
                }
            }, 3000);
        }
        else
        {
            crearTimeout(() =>
            {
                cef_ascensor.ejecutarCef(ascensor_cefId, `actualizarInfoCef('${hacia}', '${direccion}', '${0.25}', '${true}')`);

                mp.events.call("sound:cancel");
                mp.events.call("sound:play", "ding", false);

                crearTimeout(() => {
                    if (ascensor_cefId >= 0) {
                        if (player == playerReceiver) {
                            cef_ascensor.cerrarCef(ascensor_cefId, false, false, false);
                        }
                        else {
                            cef_ascensor.cerrarCef(ascensor_cefId, false);
                        }
                        ascensor_cefId = -1;
                    }
                    if (hudOculto) mp.events.call("hud:estado_hud");
                    if (tipoMapa != 2) mp.game.ui.displayRadar(true);
                    player_local.freezePosition(false);
                    player_local.setInvincible(false);
                    player_local.setCollision(true, false);
                    mp.game.ui.displayHud(true);
                    mp.gui.chat.show(true);
                    bloquearUsoAscensor();
                }, 850);
            }, ((tiempoMovimientoAscensor * 1000) + 1));
        }
    }, 500);
}


function fadeInOut(tiempoout, tiemposig, tiempoin)
{
    if (!hudOculto) mp.events.call("hud:estado_hud");
    mp.game.cam.doScreenFadeOut(tiempoout);

    crearTimeout(function () {
        mp.game.cam.doScreenFadeIn(tiempoin)
    }, tiemposig);
}
}