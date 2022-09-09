{
/*
 * trabajadoresfederal.js
 *
 * Contiene el controlador del CEF trabajadoresfederal, la actualizacion de sus datos y su mostrado en el CEF.
 *
 * Javigra
 */

var cef_trabajadoresfederal = require("./LURP/cef.js");

var trabajadoresfederal_cefId = -1;

mp.events.add('mostrar_trabajadoresfederal', function () {
    if (trabajadoresfederal_cefId < 0 && !cef_trabajadoresfederal.existeCef(cef_trabajadoresfederal)) {
        trabajadoresfederal_cefId = cef_trabajadoresfederal.crearCef("package://LURP/cef/prisionfederal/trabajadoresfederal/trabajadoresfederal.html", {
        mostrarCursor: true,
        sumarNumeroCefs: false
        });
    }
});

mp.events.add("cerrar_trabajadoresfederal", function () {
    if (trabajadoresfederal_cefId >= 0) {
        cef_trabajadoresfederal.cerrarCef(trabajadoresfederal_cefId, false);
        trabajadoresfederal_cefId = -1;
    }
});

mp.events.add("solicitar_trabajadores", function (id) {
    mp.events.callRemote('solicitar_trabajadores_federal', id);
});

mp.events.add("devolver_trabajadores_prisionfederal", function (json) {
    cef_trabajadoresfederal.ejecutarCef(trabajadoresfederal_cefId, `loadWorkers(${json})`);
});
}