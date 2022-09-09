{
/* --------------------------------------------------------------------------------
 * cerradura.js
 *
 * Autor: Kenshin
 *
 * Descripción: Minijuegos para hakear
 *
 * -------------------------------------------------------------------------------- */
var cef_cerradura = require("./LURP/cef.js");

var cerradura_cefId = -1;

var tipoCerradura = 0;
var timer;
mp.events.add('cerradura:mostrar', function (ganzuas, tipo, puerta) {
    tipoCerradura = tipo;
    // Creamos el navegador y mostramos el menu de seleccion de la parada del metro
    if (cerradura_cefId < 0) {
        cerradura_cefId = cef_cerradura.crearCef("package://LURP/cef/minijuego/cerradura/cerradura.html", {
            puedeCerrar: false,
            mostrarCursor: true
        });

        cef_cerradura.ejecutarCef(cerradura_cefId, `establecerOpciones(` + parseInt(puerta) + `,` + parseInt(ganzuas) + `)`);

        switch (puerta) {
            case 1:
                timer = setTimeout(() => {
                    mp.events.call("cerradura:cerrar");
                }, 15000);
                break;
            case 2:
                timer = setTimeout(() => {
                    mp.events.call("cerradura:cerrar");
                }, 10000);
                break;
            case 3:
                timer = setTimeout(() => {
                    mp.events.call("cerradura:cerrar");
                }, 5000);
                break;
            default:
                timer = setTimeout(() => {
                    mp.events.call("cerradura:cerrar");
                }, 30000);
                break;
        }
    }
    // global_cerradura.prepararCef();
    // global_cerradura.abrirCef("package://LURP/cef/minijuego/cerradura/cerradura.html");
    // global_cerradura.enviaraCef(`comenzar('`+puerta+`')`);
    // global_cerradura.enviaraCef(`establecerIntentos('`+dificultad+`')`);

});

mp.events.add('cerradura:cerrar', function () {
    clearTimeout(timer);
    //No ha superado el hakeo lo cerramos
    if (cerradura_cefId >= 0) {
        cef_cerradura.cerrarCef(cerradura_cefId, false);
        cerradura_cefId = -1;
    }
    // mp.events.call("CerrarCef");
    mp.events.callRemote('cerradura:fracaso', tipoCerradura);
});

mp.events.add('cerradura:exito', function () {
    clearTimeout(timer);
    //Ha superado el hakeo lo cerramos
    if (cerradura_cefId >= 0) {
        cef_cerradura.cerrarCef(cerradura_cefId, false);
        cerradura_cefId = -1;
    }
    // mp.events.call("CerrarCef");
    mp.events.callRemote('cerradura:exito', tipoCerradura);
});
}