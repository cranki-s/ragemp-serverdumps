{
var cef_reponedor = require('./LURP/cef.js');
var reponedor_cefId = -1;

mp.events.add({
    "reponedor:entregar_bebidascef": () => {
        if (!hudOculto) {
            mp.events.call("hud:estado_hud");
            mp.game.ui.displayRadar(false);
            mp.game.ui.displayHud(false);
            mp.gui.chat.show(false);
        }

        if (reponedor_cefId < 0) {
            reponedor_cefId = cef_reponedor.crearCef("package://LURP/cef/reponedor/reponedorHTML.html", {
                puedeCerrar: false,
                mostrarCursor: true,
            });
        }
    },
    "reponedor:finalizar": () => {
        if (hudOculto)
            mp.events.call("hud:estado_hud");

        if (reponedor_cefId >= 0) {
            cef_reponedor.cerrarCef(reponedor_cefId, false);
            mp.events.callRemote("fin_cef_reponedor");
            reponedor_cefId = -1;
        }
    },
});
}