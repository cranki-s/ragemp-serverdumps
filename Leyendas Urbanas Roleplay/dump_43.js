{
var cef_ruka = require("./LURP/cef.js");

var ruka_cefId = -1;

mp.events.add("mostrar_ruka", (texto) => {
    if (ruka_cefId < 0) {
        ruka_cefId = cef_ruka.crearCef("package://LURP/cef/ruka/ruka.html", {
            puedeCerrar: false,
            mostrarCursor: true
        });

        cef_ruka.ejecutarCef(ruka_cefId, "ponerTexto('"+texto+"')");
    }
});

mp.events.add("cerrar_ruka", () => {
    cerrarRuka();
});

function cerrarRuka() {
    if (ruka_cefId >= 0) {
        cef_ruka.cerrarCef(ruka_cefId, false);
        ruka_cefId = -1;
    }
}
}