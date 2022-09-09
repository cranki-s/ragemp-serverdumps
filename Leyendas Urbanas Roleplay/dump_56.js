{
var cef_autoescuela = require('./LURP/cef.js');

var autoescuela_cefId = -1;

var dialogosAutoescuelaHistorial = [];

mp.events.add({
    "autoescuela:mostrar": () => {
        if (autoescuela_cefId < 0) {
            autoescuela_cefId = cef_autoescuela.crearCef("package://LURP/cef/autoescuela/autoescuela.html", {
                mostrarCursor: false,
                puedeCerrar: true,
                sumarNumeroCefs: false
            });

            cef_autoescuela.ejecutarCef(autoescuela_cefId, `cargarMensajes('${JSON.stringify(dialogosAutoescuelaHistorial)}')`);
        }
    },
    "autoescuela:mostrar_punto": (x, y) => {
        mp.events.call("mostrar_waypoint", new mp.Vector3(x, y, 0));
        let parpadeo = setInterval(() => {
            mp.game.invoke("0xF2DD778C22B15BDA");
        }, 300);
    
        setTimeout(() => {
            clearInterval(parpadeo);
        }, 1000);
    },
    "autoescuela:cerrar": () => {
        if (autoescuela_cefId >= 0) {
            cef_autoescuela.cerrarCef(autoescuela_cefId);
            autoescuela_cefId = -1;
        }
    }
});
}