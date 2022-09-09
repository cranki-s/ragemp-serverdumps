{
/*
 * trabajosfederal.js
 *
 * Contiene el controlador del CEF trabajosfederal, la actualizacion de sus datos y su mostrado en el CEF.
 *
 * Javigra
 */

var cef_trabajosfederal = require("./LURP/cef.js");

var trabajosfederal_cefId = -1;

mp.events.add('mostrar_trabajosfederal', function () {
    if (trabajosfederal_cefId < 0 && !cef_trabajosfederal.existeCef(cef_trabajosfederal)) {
        trabajosfederal_cefId = cef_trabajosfederal.crearCef("package://LURP/cef/prisionfederal/trabajosfederal/trabajosfederal.html", {
        mostrarCursor: true,
        sumarNumeroCefs: false
        });
    }
});

mp.events.add("cerrar_trabajosfederal", function () {
    if (trabajosfederal_cefId >= 0) {
        cef_trabajosfederal.cerrarCef(trabajosfederal_cefId, false);
        trabajosfederal_cefId = -1;
    }
});

mp.events.add("prision_federal:enviar_trabajo", function (trabajo) {
    mp.events.callRemote('trabajos_federal', `${trabajo}`);
});

mp.events.add("prision_federal:add_trabajo_desactivado", function (id) {
    cef_trabajosfederal.ejecutarCef(trabajosfederal_cefId, `addTrabajoDesactivado(${id})`);
});

mp.events.add("prision_federal:eliminar_trabajo_desactivado", function (id) {
    cef_trabajosfederal.ejecutarCef(trabajosfederal_cefId, `eliminarTrabajoDesactivado(${id})`);
});
}