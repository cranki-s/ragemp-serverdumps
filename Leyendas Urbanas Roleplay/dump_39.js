{
/* --------------------------------------------------------------------------------
 * rascagana.js
 *
 * Autor: Kenshin
 *
 * Descripción: Minijuego de rascagana
 * -------------------------------------------------------------------------------- */

var cef_rascagana = require("./LURP/cef.js");

var rascagana_cefId = -1;

mp.events.add('minijuego:rascagana:mostrar', function (url) {
    if (rascagana_cefId < 0) {
        rascagana_cefId = cef_rascagana.crearCef(url, {
            puedeCerrar: true,
            mostrarCursor: true
        });

        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 100);

        mp.events.call("sound:play", "Christmas", false);
    }
});
mp.events.add('minijuego:rascagana:cerrar', function () {
    if (rascagana_cefId >= 0) {
        cef_rascagana.cerrarCef(rascagana_cefId);
        rascagana_cefId = -1;

        mp.events.call("sound:cancel");
    }
});
mp.events.add('pickups:completado', (idPickup, tipoRegalo) => {
    mp.events.callRemote("pickups:obtenido", idPickup, tipoRegalo);
});

}