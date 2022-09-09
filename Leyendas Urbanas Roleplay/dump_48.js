{
/* --------------------------------------------------------------------------------
 * academias.js
 *
 * Autor: Kenshin
 *
 * Descripción: Diferentes scripts y recursos para las academias
 * -------------------------------------------------------------------------------- */
var cef_academias = require('./LURP/cef.js');

var academias_cefId = -1;

mp.events.add('justicia:academia:mostrar', function (nombre, tipo) {
    if (academias_cefId < 0) {
        academias_cefId = cef_academias.crearCef("package://LURP/cef/academias/academia_justicia.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });

        cef_academias.ejecutarCef(academias_cefId, "nombre('Fdo: " + nombre + "')");
        cef_academias.ejecutarCef(academias_cefId, "departamento(" + tipo + ")");
    }
});
mp.events.add('justicia:academia:enviar', function (firma) {
    if (academias_cefId >= 0) {
        cef_academias.cerrarCef(academias_cefId, false);
        academias_cefId = -1;

        mp.events.callRemote('justicia:academia:unirse', firma);
    }
});


mp.events.add('lsfd:academia:mostrar', function (tipo) {
    if (academias_cefId < 0) {
        academias_cefId = cef_academias.crearCef("package://LURP/cef/academias/academia_lsfd.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });

        cef_academias.ejecutarCef(academias_cefId, "direccion(" + tipo + ")");
    }
});
mp.events.add('lsfd:academia:enviar', function (firma) {
    if (academias_cefId >= 0) {
        cef_academias.cerrarCef(academias_cefId, false);
        academias_cefId = -1;

        mp.events.callRemote('lsfd:academia:unirse', firma);
    }    
});
mp.events.add('academias:cerrarcef', function () {
    if (academias_cefId >= 0) {
        cef_academias.cerrarCef(academias_cefId, false);
        academias_cefId = -1;
    }
});

}