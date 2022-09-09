{
/**
 * pesca.js
 * 
 * Descripción: Contiene el controlador del CEF del sistema de la pesca
 * 
 * Autor: Dries
 */

var cef_pesca = require("./LURP/cef.js");

var pesca_cefId = -1;

var pesca = false;
var intentos_fallidos = 0;

mp.events.add({
    "pesca:mostrar_pesca": () => {
        if (pesca_cefId < 0) {
            pesca_cefId = cef_pesca.crearCef("package://LURP/cef/pesca/pesca.html", {
                puedeCerrar: false,
                mostrarCursor: false
            });

            cef_pesca.ejecutarCef(pesca_cefId, "temporizador()");
        }
            mp.gui.chat.show(false);
            mostrar_cef_pesca = false;
            pesca = true;
            clearTimeout(temporizador_escapa); // sistemas/pesca.js
            clearTimeout(temporizador_teclau); // sistemas/pesca.js
    },
    "pesca:cerrar_pesca": () => {
        cerrarCefPesca();
    },
    "pesca:pesca_fallida": () => {
        intentos_fallidos++;

        if (intentos_fallidos >= 3) {
            mp.events.callRemote("pesca:intento_fallido");
            intentos_fallidos = 0;
        }

        cerrarCefPesca();
    },
    "pesca:cazar_pez": () => {
        mostrar_cef_pesca = false; // sistemas/pesca.js
        temporizador_teclau_iniciado = false; // sistemas/pesca.js
        mp.events.callRemote("pesca:cazar_pez", parametro_pesca); // sistemas/pesca.js
        cerrarCefPesca();
    }
});

function cerrarCefPesca() {
    if (pesca_cefId >= 0) {
        cef_pesca.cerrarCef(pesca_cefId, false);
        pesca_cefId = -1;
    }
    mostrar_cef_pesca = false;
    pesca = false;
    mp.gui.chat.show(true);
}
}