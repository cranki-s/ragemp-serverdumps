{
/*
 * cefpuertasfederal.js
 *
 * Contiene el controlador del CEF puertasfederal, la actualizacion de sus datos y su mostrado en el CEF.
 *
 * Javigra
 */

var cef_puertasfederal = require("./LURP/cef.js");

var puertasfederal_cefId = -1;

var myOpenDoors = [];
var waitingForDoors = false;

mp.events.add('mostrar_cefpuertasfederal', function () {
    mp.events.callRemote("getOpenDoorsCEF");
    waitingForDoors = true;
    if (puertasfederal_cefId < 0 && !cef_puertasfederal.existeCef(cef_puertasfederal)) {
        puertasfederal_cefId = cef_puertasfederal.crearCef("package://LURP/cef/prisionfederal/puertasfederal/puertasfederal.html", {
            mostrarCursor: true,
            sumarNumeroCefs: false
        });
    }
    const timerWaitingDoors = setInterval(() => {
        if (!waitingForDoors) {
            for (let i = 0; i < myOpenDoors.length; i++) {
                cef_puertasfederal.ejecutarCef(puertasfederal_cefId, "changeDoorStatus(" + myOpenDoors.hash + "," + myOpenDoors.doorID + ")");
            }
        }
        clearInterval(timerWaitingDoors);
    }, 1500);
});

mp.events.add("cerrar_cefpuertasfederal", function () {
    if (puertasfederal_cefId >= 0) {
        cef_puertasfederal.cerrarCef(puertasfederal_cefId, false);
        puertasfederal_cefId = -1;
    }
});

mp.events.add("setOpenDoorsCEF", function (serverOpenedDoors) {
    myOpenDoors = serverOpenedDoors;
    waitingForDoors = false;
});
}