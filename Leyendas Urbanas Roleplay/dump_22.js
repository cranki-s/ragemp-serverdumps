{
/* --------------------------------------------------------------------------------
 * cajero.js
 *
 * Autor: Kenshin
 *
 * Descripción: Realiza las operaciones de los cajeros
 *
 * -------------------------------------------------------------------------------- */
var cef_cajero = require("./LURP/cef.js");

var cajero_cefId = -1;
let cajero_id = 0;

// Registramos los eventos del cliente
mp.events.add('mostrar_cajero', function (cajeroID, tipo, pin, cantidad) {
    cajero_id = cajeroID;
    mp.players.local.freezePosition(true);

    let style = "css/cajero_atm.css";
    switch(tipo)
    {
        case 1:
            style = "css/cajero_atm.css";
            break;
        case 2:
            style = "css/cajero_azul.css";
            break;
        case 3:
            style = "css/cajero_rojo.css";
            break;
        case 4:
            style = "css/cajero_fleeca.css";
            break;
    }

    if (cajero_cefId < 0) {
        cajero_cefId = cef_cajero.crearCef("package://LURP/cef/cajero/cajero.html", {
            mostrarCursor: true,
            puedeCerrar: true,
            mostrarChat: false
        });
        cef_cajero.ejecutarCef(cajero_cefId, "init(\"" + style + "\")");

        cef_cajero.ejecutarCef(cajero_cefId, "app.pin = '" + pin + "'");
        cef_cajero.ejecutarCef(cajero_cefId, "mostrarDineromano(\"" + dinero + "\")");
        cef_cajero.ejecutarCef(cajero_cefId, "mostrarDinerobanco(\"" + cantidad + "\")");
    }
});
mp.events.add('error_operacion_cajero', function (error) {
    if (cajero_cefId >= 0) {
        cef_cajero.ejecutarCef(cajero_cefId, "mostrarError(\"" + error + "\")");
    }
});
mp.events.add('resultado_operacion_cajero', function (info, banco) {
    if (cajero_cefId >= 0) {
        cef_cajero.ejecutarCef(cajero_cefId, "mostrarDineromano(\"" + dinero + "\")");
        cef_cajero.ejecutarCef(cajero_cefId, "mostrarDinerobanco(\"" + banco + "\")");
        cef_cajero.ejecutarCef(cajero_cefId, "mostrarInfo(\"" + info + "\")");
    }
});
mp.events.add('salir_cajero', function () {
    mp.players.local.freezePosition(false);
    if (cajero_cefId >= 0) {
        cef_cajero.cerrarCef(cajero_cefId);
        cajero_cefId = -1;
    }
    mp.events.callRemote("cajero_salir");
});
mp.events.add('cajero:tarjeta:pin', function (pin) {
    mp.events.callRemote("cajero:tarjeta:pin", pin, cajero_id);
});
mp.events.add('cajero:tarjeta:bloquear', function () {
    mp.players.local.freezePosition(false);
    if (cajero_cefId >= 0) {
        cef_cajero.cerrarCef(cajero_cefId);
        cajero_cefId = -1;
    }
    mp.events.callRemote("cajero:tarjeta:bloquear", cajero_id);
});
// Función que dispara el evento de ingresar cantidad en un cajero en el servidor
mp.events.add('cajero_ingresar', function (cantidad) {
    mp.events.callRemote("cajero_ingresar", cantidad, cajero_id);
});
// Función que dispara el evento de extraer dinero de un cajero en el servidor
mp.events.add('cajero_extraer', function (cantidad) {
    mp.events.callRemote("cajero_extraer", cantidad, cajero_id);
});
// Función que dispara el evento de transferir dinero en un cajero en el servidor
mp.events.add('cajero_transferir', function (nombre, cantidad, concepto) {
    mp.events.callRemote("cajero_transferir", nombre, cantidad, cajero_id, concepto);
});
// Función que dispara el evento de transferir dinero en un cajero en el servidor
mp.events.add('cajero:tarjeta:pin', function (pin) {
    mp.events.callRemote("cajero:tarjeta:pin", pin, cajero_id);
});
}