{
var cef_animaciones = require("./LURP/cef.js");

var animaciones_cefId = -1;

mp.events.add({
    "animaciones:mostrar": () => {
        if (animaciones_cefId < 0) {
            mp.gui.chat.show(false);
            animaciones_cefId = cef_animaciones.crearCef("package://LURP/cef/animaciones/animaciones.html", {
                mostrarCursor: true,
                puedeCerrar: true
            });
        }
    },
    "animaciones:obtener_datos": (nombre, descripcion, unicoPj) => {
        if (nombre == undefined || nombre.length <= 0 || unicoPj == undefined || unicoPj == null)
            return;
        if (unicoPj == 1) unicoPj = true;
        else unicoPj = false;
        mp.events.call("recibir_datos_animacion", nombre, descripcion, unicoPj);
        mp.events.call("animaciones:cerrar", true);
    },
    "animaciones:cerrar": (animacion=false) => {
        mp.gui.chat.show(true);
        if (!animacion) {
            if (animaciones_cefId >= 0) {
                cef_animaciones.cerrarCef(animaciones_cefId);
                animaciones_cefId = -1;
            }
        } else {
            cef_animaciones.ejecutarCef(animaciones_cefId, "atras()");
        }
    }
});
}