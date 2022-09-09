{
/* --------------------------------------------------------------------------------
 * ordenadores.js
 *
 * Autor: Kenshin
 *
 * Descripción: Diferentes scripts y recursos relacionados con los ordenadores,
 * -------------------------------------------------------------------------------- */
var cef_ordenadores = require('./LURP/cef.js');

var ordenadores_cefId = -1;

mp.events.add("ordenador:cerrar", () => {
    if (ordenadores_cefId >= 0) {
        cef_ordenadores.cerrarCef(ordenadores_cefId);
        ordenadores_cefId = -1;
        mp.events.call('descongelar');
        blockGuion = false;
    }
});

mp.events.add('ordenador:mostrar', function (url) {
    if (ordenadores_cefId < 0) {
        ordenadores_cefId = cef_ordenadores.crearCef(url, {
            mostrarCursor: true,
            puedeCerrar: true,
            mostrarChat: false
        }, true);
        
        blockGuion = true;
        mp.events.call('congelar');
    }
    // global_ordenadores.prepararCef();
    // global_ordenadores.abrirCef(url);
});

}