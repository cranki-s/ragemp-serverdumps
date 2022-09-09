{
﻿/* --------------------------------------------------------------------------------
    * antiafk.js
    *
    * Autor: poleStar
    *
    * Descripcion: Sistema anti-afk. Ademas de funcionar como el antiguo y detectar si alguien se queda totalmente AFK sin tocar nada 
    * esta version es capaz de tener en cuenta todos los controles de GTA y si son pulsados durante mucho tiempo para evitar el sistema AFK (como antiguamente les funcionaba con cualquier control)
    *
    * -------------------------------------------------------------------------------- */

const MAX_TIEMPO_AFK = 600; // Tiempo en segundos para ser detectado como AFK

let dimension_AFK = false; // Solo sera true si el jugador se queda AFK en dimension 0, en las demas dimensiones no tiene uso
var anularPaydayAFK = false;

let contadorTeclas = [];

// Cada segundo comprobamos la lista de teclas pulsadas que nos mantiene el render
setInterval(function () {
    if (!logueado) return;
    if (miembroStaff) return;
    if (prision) return;
    if (en_camaraheli) return;

    let estabaAFK = anularPaydayAFK;
    let nuevoAFK = false;

    // Si alguna tecla pulsada lleva MAX_TIEMPO_AFK veces pulsada significa que antes usaba esa tecla para evadir el antiguo sistema AFK -> esta AFK
    let tam = contadorTeclas.length;
    for (let i = 0; i < tam; i++) {
        contadorTeclas[i].numero++;

        if (contadorTeclas[i].numero >= MAX_TIEMPO_AFK) {
            nuevoAFK = true;
            break;
        }
    }

    if (nuevoAFK) {
        if (!estabaAFK) { // Si ahora esta AFK y antes no lo estaba
            if (player_local.dimension == 0) {
                dimension_AFK = true;
            }

            mp.events.callRemote('detectado_afk', true, dimension_AFK);

            anularPaydayAFK = true;
        }
    }
    else {
        if (estabaAFK) { // Si ahora no esta AFK y antes lo estaba
            mp.events.callRemote('detectado_afk', false, dimension_AFK);

            dimension_AFK = false;
            anularPaydayAFK = false;
        }
    }
}, 1000);

// Render que comprueba si X control esta pulsado o no
mp.events.add("render", () => {
    if (!logueado) return;
    if (miembroStaff) return;
    if (prision) return;
    if (en_camaraheli) return;

    let totalPulsados = 0;

    for (let key = 0; key < 357; key++) {
        let pulsado = false;
        switch (key) {
            case 1: case 2: case 3: case 4: case 5: case 6: case 26: case 79: // Controles de camara
                pulsado = mp.game.controls.isControlPressed(1, key);
                break;
            case 239: case 240: // Son Keys del raton, el 239 se spamea cuando minimizas el juego
                continue;
            default:
                pulsado = mp.game.controls.isControlPressed(0, key);
                break;
        }

        // Si el control esta pulsado
        let tam = contadorTeclas.length;
        if (pulsado) {
            totalPulsados++;

            // Comprobamos si estaba pulsado anteriormente
            let encontrada = false;
            for (let i = 0; i < tam; i++) {
                if (contadorTeclas[i].tecla == key) {
                    encontrada = true;
                    //mp.gui.chat.push("++ KEY 1 ++: " + key + ", " + contadorTeclas[i].numero);
                    break;
                }
            }

            // Si no estaba pulsado anteriormente lo anadimos a la lista de controles pulsados
            if (!encontrada) {
                contadorTeclas.push({ tecla: key, numero: 0 });
                //mp.gui.chat.push("++ KEY 1 ++: " + key);
            }
        } else {
            // Si el control no esta pulsado y esta en la lista de controles pulsados lo borramos
            for (let i = 0; i < tam; i++) {
                if (contadorTeclas[i].tecla == key) {
                    //mp.gui.chat.push("-- KEY 1 --: " + key + ", " + contadorTeclas[i].numero);
                    contadorTeclas.splice(i, 1);
                    break;
                }
            }
        }
    }

    // Si no ha pulsado ningun control - Usamos "-1" como tecla para indicar que no esta usando ningun control
    if (totalPulsados == 0) {
        let encontrada = false;
        let tam = contadorTeclas.length;
        for (let i = 0; i < tam; i++) {
            if (contadorTeclas[i].tecla == -1) {
                encontrada = true;
                //mp.gui.chat.push("++ KEY 2 ++: " + -1 + ", " + contadorTeclas[i].numero);
                break;
            }
        }

        // Si no estaba pulsado anteriormente lo anadimos a la lista de controles pulsados
        if (!encontrada) {
            contadorTeclas.push({ tecla: -1, numero: 0 });
            //mp.gui.chat.push("++ KEY 2 ++: " + -1);
        }
    }
    else {
        let tam = contadorTeclas.length;
        for (let i = 0; i < tam; i++) {
            if (contadorTeclas[i].tecla == -1) {
                //mp.gui.chat.push("-- KEY 2 --: " + -1 + ", " + contadorTeclas[i].numero);
                contadorTeclas.splice(i, 1);
                break;
            }
        }
    }
});


// ANTIGUO SISTEMA

/* --------------------------------------------------------------------------------
    * antiafk.js
    *
    * Autor: Morell
    *
    * Descripcion: Sistema anti-afk
    *
    * -------------------------------------------------------------------------------- */

/*var MAX_INTENTOS_KICK = 10;
var INICIO_AVISO_AFK = 5;
var intentosAFK = 0;
var jugadorAFK = true;
let intervalo_AFK = null;
let dimension_AFK = false; // Solo sera true si el jugador se queda AFK en dimension 0, en las demas dimensiones no tiene uso
var anularPaydayAFK = false;
var render_afk = false;

// Disparado cada tic
mp.events.add("render", () => {
    for (var key = 0; key < 357; key++) {
        if (key !== 240 && key !== 239) { // Son Keys del raton, el 239 se spamea cuando minimizas el juego
            if (mp.game.controls.isControlPressed(0, key)) {
                jugadorAFK = false;
                return;
            }
        }
    }
});

// Si pasados 10 minutos esta AFK en dimension 0 el sv le cambia a dimension 1, el cliente anula su intervalo de payday y crea un intervalo de 100ms para detectar cuando deja de estar AFK
// Si el intervalo de 100ms detecta que deja de estar AFK el sv le vuelve a dejar en dimension 0 y el cliente vuelve a permitir su intervalo de payday
setInterval(function () {
    if (!logueado) return;
    if (miembroStaff) return;
    if (prision) return;
    if (en_camaraheli) return;

    if (anularPaydayAFK == true) return; // Si ya ha sido detectado como AFK no seguimos, esto sera false cuando el otro intervalo detecte que el usuario ha vuelto

    if (jugadorAFK) {
        intentosAFK += 1;

        if ((MAX_INTENTOS_KICK - intentosAFK) === 0) {
            if (player_local.dimension == 0) {
                dimension_AFK = true;
                mp.events.callRemote('detectado_afk', true);
            }
            anularPaydayAFK = true;

            if (intervalo_AFK != null) {
                clearInterval(intervalo_AFK);
            }
            intervalo_AFK = setInterval(function () {
                if (jugadorAFK == false) {
                    anularPaydayAFK = false;
                    if (dimension_AFK == true) {
                        mp.events.callRemote('detectado_afk', false);
                        dimension_AFK = false;
                    }
                    clearInterval(intervalo_AFK);
                    intervalo_AFK = null;
                    return;
                }
            }, 100);

            return;
        }
    } else {
        intentosAFK = 0;
    }
    jugadorAFK = true;
}, 60000);*/

}㺫䭗쀩ꮈ