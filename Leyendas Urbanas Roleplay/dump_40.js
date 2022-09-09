{
/*
    cabinas.js

    Autor: Dries

    Descripción: Controlador de las cabinas telefónicas
*/

var cef_cabinas = require("./LURP/cef.js");

var cabinas_cefId = -1;

// var cabina = false;

mp.events.add({
    "mostrar_cabina": (numero_cabina) => {
        if (cabinas_cefId < 0) {
            cabinas_cefId = cef_cabinas.crearCef("package://LURP/cef/cabinas/cabinas.html", {
                puedeCerrar: true,
                mostrarCursor: true
            });

            cef_cabinas.ejecutarCef(cabinas_cefId, `cargarCabina("${numero_cabina}")`);
        }
    },
    "llamar_cabina": (numero, numeroCabina) => {
        mp.events.callRemote("realizar_llamada_cabina", numero, numeroCabina);
    },
    "cerrar_cabina": (sinColgar = false, sinDesocupar = false) => {
        cerrarCabina(sinColgar, sinDesocupar);
    },
    "colgar": () => {
        mp.events.callRemote("colgar_llamada");

        if (cabinas_cefId >= 0) {
            cef_cabinas.ejecutarCef(cabinas_cefId, "cambiarFondo('colgado')");
        }
    },
    "en_llamada_cabina": (numero) => {
        if (cabinas_cefId >= 0) {
            cef_cabinas.ejecutarCef(cabinas_cefId, `enLlamada_("${numero}")`);
        }
    },
    "llamada_colgada_cabina": () => {
        if (cabinas_cefId >= 0) {
            cef_cabinas.ejecutarCef(cabinas_cefId, "cambiarFondo('colgado')");
        }
    }
});

function cerrarCabina(sinColgar, sinDesocupar) {
    if (cabinas_cefId >= 0) {
        cef_cabinas.cerrarCef(cabinas_cefId, false);
        cabinas_cefId = -1;
    }
    // cabina = false;
    mp.events.callRemote('cerrar_cabina', sinColgar, sinDesocupar);
    mp.game.audio.playSoundFrontend(1, "Put_Away", "Phone_SoundSet_Michael", true);
}
}