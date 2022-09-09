{
/* --------------------------------------------------------------------------------
 * ayuda.js
 *
 * Autor: Kenshin
 *
 * Descripción: Controlador de la ayuda interactiva (cliente-servidor)
 *
 * -------------------------------------------------------------------------------- */
var cef_ayuda = require('./LURP/cef.js');

var ayuda_cefId = -1;

mp.events.add('mostrar_ayuda_interactiva', function (titulo, texto1, texto2, texto3, img1, img2, img3) {
    if (ayuda_cefId < 0) {
        ayuda_cefId = cef_ayuda.crearCef("package://LURP/cef/ayuda/ayuda.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        mp.events.call("hud:estado_hud");
    
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);
    
        mp.gui.chat.show(false);
        mp.game.graphics.transitionToBlurred(500);

        cef_ayuda.ejecutarCef(ayuda_cefId, "app.titulo = '" + titulo + "'");
        cef_ayuda.ejecutarCef(ayuda_cefId, "app.texto1 = '" + texto1 + "'");
        cef_ayuda.ejecutarCef(ayuda_cefId, "app.texto2 = '" + texto2 + "'");
        cef_ayuda.ejecutarCef(ayuda_cefId, "app.texto3 = '" + texto3 + "'");
        cef_ayuda.ejecutarCef(ayuda_cefId, "app.imagen1 = '" + img1 + "'");
        cef_ayuda.ejecutarCef(ayuda_cefId, "app.imagen2 = '" + img2 + "'");
        cef_ayuda.ejecutarCef(ayuda_cefId, "app.imagen3 = '" + img3 + "'");
    }
});

mp.events.add("cerrarAyuda", () => {
    if (ayuda_cefId >= 0) {
        cef_ayuda.cerrarCef(ayuda_cefId);
        ayuda_cefId = -1;

        mp.game.graphics.transitionFromBlurred(500);
        mp.gui.chat.show(true);

        mp.events.call("hud:estado_hud");

        if(tipoMapa != 2) mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);
    }
})
//# sourceMappingURL=ayuda.js.map
}