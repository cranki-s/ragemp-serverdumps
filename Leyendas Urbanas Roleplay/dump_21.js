{
/* --------------------------------------------------------------------------------
 * avisoherido.js
 *
 * Autor: Kenshin
 *
 * Descripción: Envía al servidor la señal para crear el aviso de herido si procede,
 * muestra la interfaz del aviso de herido, etc.
 * -------------------------------------------------------------------------------- */
var cef_herido = require('./LURP/cef.js');

var herido_cefId = -1;

mp.events.add('mostrar_aviso_herido', function () {
    if (herido_cefId < 0) {
        herido_cefId = cef_herido.crearCef("package://LURP/cef/avisoherido/avisoherido.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });
    }
});
mp.events.add('enviarAvisoHerido', function () {
    enviarAvisoHerido();
});

mp.events.add("cerrarAvisoHerido", () => {
    if (herido_cefId >= 0) {
        cef_herido.cerrarCef(herido_cefId);
        herido_cefId = -1;
    }
});

// Función para enviar el aviso de herido
function enviarAvisoHerido() {
    // Avisamos al servidor
    if (setFloodboton(5000, "FB30") == false) return;

    setTimeout(function () {
        mp.events.callRemote('enviar_aviso_herido');
    }, 100);

    // Cerramos la interfaz
    if (herido_cefId >= 0) {
        cef_herido.cerrarCef(herido_cefId, false);
        herido_cefId = -1;
    }
}
//# sourceMappingURL=avisoherido.js.map
}