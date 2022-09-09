{
/* --------------------------------------------------------------------------------
 * dados.js
 *
 * Autor: Kenshin
 *
 * Descripción: Minijuego de dados
 * -------------------------------------------------------------------------------- */
var cef_dados = require("./LURP/cef.js");

var dados_cefId = -1;

mp.events.add('minijuego:dados:mostrar', function () {
    if (dados_cefId < 0) {
        dados_cefId = cef_dados.crearCef("package://LURP/cef/minijuego/dados/dados.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });
    }
});
mp.events.add('minijuego:dados:cerrar', function (numero) {
    if (dados_cefId >= 0) {
        cef_dados.cerrarCef(dados_cefId);
        dados_cefId = -1;
    }
    mp.events.callRemote('minijuego:dados:compartir', numero);
});

}