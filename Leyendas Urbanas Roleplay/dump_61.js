{
/*
 * camarasfederal.js
 *
 * Contiene el controlador del CEF camarasfederal, la actualizacion de sus datos y su mostrado en el CEF.
 *
 * Javigra
 */

var cef_camarasfederal = require("./LURP/cef.js");

var camarasfederal_cefId = -1;

mp.events.add('mostrar_cefcamarasfederal', function () {
    if (camarasfederal_cefId < 0 && !cef_camarasfederal.existeCef(cef_camarasfederal)) {
        camarasfederal_cefId = cef_camarasfederal.crearCef("package://LURP/cef/prisionfederal/camarasfederal/camarasfederal.html", {
            mostrarCursor: true,
            sumarNumeroCefs: false
        });
    }
});

mp.events.add("cerrar_cefcamarasfederal", function () {
    if (camarasfederal_cefId >= 0) {
        cef_camarasfederal.cerrarCef(camarasfederal_cefId, false);
        camarasfederal_cefId = -1;
    }
});
}