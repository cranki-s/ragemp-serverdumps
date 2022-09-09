{
var cef_encapuchar = require("./LURP/cef.js");

var encapuchar_cefId = -1;

var encapuchar = false;
let estadoHud = false;

function activar_encapuchar() {
    if (!encapuchar) {
        encapuchar = true;

        estadoHud = !hudOculto; // Nos permite ocultar y mostrar el hud si ya de por si lo tiene activo
    
        //Ocultar/mostrar hud
        if (estadoHud == true) {
            mp.game.ui.displayRadar(false);
            mp.game.ui.displayHud(false);
            mp.gui.chat.show(true);
            mp.gui.cursor.visible = false;
    
            mp.events.call("hud:estado_hud");
        }

        if (encapuchar_cefId < 0) {
            encapuchar_cefId = cef_encapuchar.crearCef("package://LURP/cef/secuestrar/encapuchar.html", {
                mostrarCursor: false,
                puedeCerrar: false
            });
        }
    }
}

function desactivar_encapuchar() {
    if (estadoHud == true) {
        if (tipoMapa != 2) mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);

        mp.events.call("hud:estado_hud");
    }

    if (encapuchar) {
        if (encapuchar_cefId >= 0) {
            cef_encapuchar.cerrarCef(encapuchar_cefId, false);
            encapuchar_cefId = -1;
        }
        encapuchar = false;
    }
}

mp.events.add({
    "encapuchar:activar": activar_encapuchar,
    "encapuchar:desactivar": desactivar_encapuchar
})

}