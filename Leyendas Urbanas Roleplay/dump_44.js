{
/* --------------------------------------------------------------------------------
 * entorno.js
 *
 * Autor: Kenshin
 *
 * Descripción: Envia el mensaje de entorno al servidor
 * 
 * -------------------------------------------------------------------------------- */
var cef_entorno = require("./LURP/cef.js");

var entorno_cefId = -1;

mp.events.add('mostrar_form_entorno', puedeVerEmergencias => {
    if (entorno_cefId < 0) {
        mp.gui.chat.show(false);

        entorno_cefId = cef_entorno.crearCef("package://LURP/cef/entorno/entorno.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });

        cef_entorno.ejecutarCef(entorno_cefId, `app.establecerEmergencias(${puedeVerEmergencias})`);
    }
});

mp.events.add('enviarEntorno', function (tipo, aviso, mensaje) {
    mp.gui.chat.show(true);
    if(mensaje.length > 2048)
    {
        mp.gui.chat.push("Mensaje demasiado largo.");
        return;
    }

    var position = mp.players.local.position;
    var getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
    zona = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
    calle = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);

    let json = {
        tipo: tipo,
        aviso: aviso,
        mensaje: mensaje,
        zona: zona,
        calle: calle,
    };

   mp.events.callRemote('mensaje_entorno', JSON.stringify(json));
});
mp.events.add('ver_entornos', function (emergencias) {
    if (entorno_cefId >= 0) {
        cef_entorno.cerrarCef(entorno_cefId, false);
        entorno_cefId = -1;
    }
    entornos(emergencias);
});

function entornos(emergencias = false) {
    if (entorno_cefId < 0) {
        mp.gui.chat.show(false);

        entorno_cefId = cef_entorno.crearCef("package://LURP/cef/entorno/entornos.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });

        cef_entorno.ejecutarCef(entorno_cefId, "app.datosEncrypt('" + apiKey + "', '" + _k + "')");
        cef_entorno.ejecutarCef(entorno_cefId, "establecerPosicion('" + JSON.stringify(player_local.position) + "')");
        cef_entorno.ejecutarCef(entorno_cefId, `app.cargarDatos(${emergencias})`);
    }
}

mp.events.add("cerrarEntornos", () => {
    if (entorno_cefId >= 0) {
        mp.gui.chat.show(true);
        cef_entorno.cerrarCef(entorno_cefId);
        entorno_cefId = -1;
    }
});

//# sourceMappingURL=avisoherido.js.map
}