{
/* --------------------------------------------------------------------------------
 * avisoherido.js
 *
 * Autor: Kenshin
 *
 * Descripción: Envía al servidor la señal para crear el aviso de herido si procede,
 * muestra la interfaz del aviso de herido, etc.
 * -------------------------------------------------------------------------------- */
var cef_placa = require("./LURP/cef.js");

var placa_cefId = -1;

mp.events.add("cerrarPlaca", () => {
    if (placa_cefId >= 0) {
        cef_placa.cerrarCef(placa_cefId);
        placa_cefId = -1;
    }
})

mp.events.add('mostrar_placa', function (personaje_id) {
    if (placa_cefId < 0) {
        placa_cefId = cef_placa.crearCef("package://LURP/cef/placa/placa.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_placa.ejecutarCef(placa_cefId, "mostrarPlaca(\"" + personaje_id + "\")");
    }
    // global_placa.prepararCef();
    // global_placa.abrirCef("package://LURP/cef/placa/placa.html");
    // global_placa.enviaraCef("mostrarPlaca(\"" + personaje_id + "\")");
});
mp.events.add('mostrar_placaiaa', function (personaje_id) {
    if (placa_cefId < 0) {
        placa_cefId = cef_placa.crearCef("package://LURP/cef/placa/placa.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_placa.ejecutarCef(placa_cefId, "mostrarPlacaIAA()");
    }
    // global_placa.prepararCef();
    // global_placa.abrirCef("package://LURP/cef/placa/placa.html");
    // global_placa.enviaraCef("mostrarPlacaIAA()");
});
mp.events.add('mostrar_documentacion', function (personaje_id) {
    if (placa_cefId < 0) {
        placa_cefId = cef_placa.crearCef("package://LURP/cef/placa/placa.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_placa.ejecutarCef(placa_cefId, "mostrarDocumentacion(\"" + personaje_id + "\")");
    }

    // global_placa.prepararCef();
    // global_placa.abrirCef("package://LURP/cef/placa/placa.html");
    // global_placa.enviaraCef("mostrarDocumentacion(\"" + personaje_id + "\")");
});
mp.events.add('mostrar_licencias', function (personaje_id) {
    if (placa_cefId < 0) {
        placa_cefId = cef_placa.crearCef("package://LURP/cef/placa/placa.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_placa.ejecutarCef(placa_cefId, "mostrarLicencias(\"" + personaje_id + "\")");
    }

    // global_placa.prepararCef();
    // global_placa.abrirCef("package://LURP/cef/placa/placa.html");
    // global_placa.enviaraCef("mostrarLicencias(\"" + personaje_id + "\")");
});

mp.events.add('mostrar_licencia_caza', function (licencia_id) {
    if (placa_cefId < 0) {
        placa_cefId = cef_placa.crearCef("package://LURP/cef/placa/placa.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_placa.ejecutarCef(placa_cefId, "mostrarLicenciaCaza(\"" + licencia_id + "\")");
    }

    // global_placa.prepararCef();
    // global_placa.abrirCef("package://LURP/cef/placa/placa.html");
    // global_placa.enviaraCef("mostrarLicencias(\"" + personaje_id + "\")");
});

mp.events.add('mostrar_licencia_armas', function (licencia_id) {
    if (placa_cefId < 0) {
        placa_cefId = cef_placa.crearCef("package://LURP/cef/placa/placa.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_placa.ejecutarCef(placa_cefId, "mostrarLicenciaArmas(\"" + licencia_id + "\")");
    }

    // global_placa.prepararCef();
    // global_placa.abrirCef("package://LURP/cef/placa/placa.html");
    // global_placa.enviaraCef("mostrarLicencias(\"" + personaje_id + "\")");
});

mp.events.add('mostrar_licencia_pesca', function (licencia_id) {
    if (placa_cefId < 0) {
        placa_cefId = cef_placa.crearCef("package://LURP/cef/placa/placa.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_placa.ejecutarCef(placa_cefId, "mostrarLicenciaPesca(\"" + licencia_id + "\")");
    }

    // global_placa.prepararCef();
    // global_placa.abrirCef("package://LURP/cef/placa/placa.html");
    // global_placa.enviaraCef("mostrarLicencias(\"" + personaje_id + "\")");
});

mp.events.add('mostrar_licencia_seguridad', function (licencia_id) {
    if (placa_cefId < 0) {
        placa_cefId = cef_placa.crearCef("package://LURP/cef/placa/placa.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        cef_placa.ejecutarCef(placa_cefId, "mostrarLicenciaSeguridad(\"" + licencia_id + "\")");
    }

    // global_placa.prepararCef();
    // global_placa.abrirCef("package://LURP/cef/placa/placa.html");
    // global_placa.enviaraCef("mostrarLicencias(\"" + personaje_id + "\")");
});
//# sourceMappingURL=placa.js.map
}