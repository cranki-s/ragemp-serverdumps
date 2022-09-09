{
var cef_cantidad = require("./LURP/cef.js");

var cantidad_cefId = -1;
let tipo_cierre = true; // Define si tras confirmar la cantidad en el cef se abre un menu de NativeUI asi no rukamos el chat y el menu

mp.events.add({
    "cantidad:mostrar": (evento, titulo = "Cantidad", cierre = true) => {
        if (cantidad_cefId < 0) {
            tipo_cierre = cierre;

            cantidad_cefId = cef_cantidad.crearCef("package://LURP/cef/cantidad/cantidad_template.html", {
                puedeCerrar: true,
                mostrarCursor: true
            }, true);

            cef_cantidad.ejecutarCef(cantidad_cefId, "eventoCallback('" + evento +"')");
            cef_cantidad.ejecutarCef(cantidad_cefId, "titulo('" + titulo +"')");
        }
    },
    "cantidad:cerrar": (aux = null) => {
        if (cantidad_cefId >= 0) {
            if (aux != null){ // Se cierra el cef porque ha elegido cantidad
                cef_cantidad.cerrarCef(cantidad_cefId, true, true, tipo_cierre);
                menuAbierto = !tipo_cierre;
            } else { // Se cierra el cef por cancelar o tocar la X
                cef_cantidad.cerrarCef(cantidad_cefId, true, true, true);
                menuAbierto = false;
            }
            cantidad_cefId = -1;
        }
    },
    "cantidad:enviar": (evento, datos) => {
        mp.events.call(evento, datos);
        mp.events.call("cantidad:cerrar", tipo_cierre);
    }
});

}