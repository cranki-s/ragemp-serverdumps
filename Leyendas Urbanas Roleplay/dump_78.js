{
/* --------------------------------------------------------------------------------
 * robonegocio.js
 *
 * Autor: Doomer
 *
 * Descripción: Sistema de robo a negocios (asalto a mano armada)
 *
 * -------------------------------------------------------------------------------- */
// ID del negocio que se está atracando
var negocioPedAtraco = null;
// Indica si hay un atraco en curso
var atracoEnCurso = false;
// Hora cuando el jugador apunta por primera vez a un NPC
var tiempoApuntando = -1;

mp.game.streaming.requestAnimDict("misschinese2_crystalmaze");
var armasBlancas = [
    2578778090,
    2460120199,
    4191993645,
    3713923289,
    3756226112,
    3441901897,
    2227010557,
    2508868239,
    4192643659,
    1141786504,
    1317494643,
    419712736,
    2484171525
];

// Disparado cada tic
setInterval(() => {
    if (!logueado)
        return;
    if (purga)
        return;
    if (atracoEnCurso == true) {
        return;
    }

    if (player_local.weapon == 2725352035) {
        return;
    }
    // Comprobamos si es un arma blanca
    var bEsArmaBlanca = false;
    for (let i = 0; i < armasBlancas.length; i++) {
        if (player_local.weapon == armasBlancas[i]) {
            bEsArmaBlanca = true;
            break;
        }
    }
    //Si el jugador está apuntando..
    if ((mp.game.invoke("0x2E397FD2ECD37C87", player_local) || (bEsArmaBlanca && mp.game.controls.isControlPressed(0, 25))) && negocioPedAtraco == null) {
        if (!atracoEnCurso) {
            if (bEsArmaBlanca) {
                if (peds_negocios != null) {
                    peds_negocios.forEach((peds) => {
                        if (calcDist(player_local.position, peds.ped.getCoords(false)) <= 3.0) {
                            // Si es policía de servicio nada
                            if (faccion == 1 && mp.controladorJugadores._jugadores[player_local.id].deservicio === true) {
                                return;
                            }
                            if (tiempoApuntando === -1) {
                                tiempoApuntando = new Date().getTime();
                            }
                            if (new Date().getTime() - tiempoApuntando >= 2000 && tiempoApuntando !== -1) {
                                var idNegocio = peds.negocio;
                                negocioPedAtraco = peds.ped;
                                mp.events.callRemote("empezar_asalto_negocio", idNegocio);
                                atracoEnCurso = true;
                                negocioPedAtraco.taskPlayAnim("misschinese2_crystalmaze", "_stand_loop", 8.0, 1.0, -1, 1, 0.0, false, false, false);
                                asalto_negocio_terminar();
                            }
                        }
                    });
                }
            }
            else {
                if (peds_negocios != null) {
                    peds_negocios.forEach((peds) => {
                        if (calcDist(player_local.position, peds.ped.getCoords(false)) <= 5.0) {
                            if (mp.game.invoke("0x3C06B5C839B38F7B", player_local, peds.ped.handle)) {
                                // Si es policía de servicio nada
                                if (faccion == 1 && mp.controladorJugadores._jugadores[player_local.id].deservicio === true) {
                                    return;
                                }
                                if (tiempoApuntando === -1) {
                                    tiempoApuntando = new Date().getTime();
                                }
                                if (new Date().getTime() - tiempoApuntando >= 2000 && tiempoApuntando !== -1) {
                                    var idNegocio = peds.negocio;
                                    negocioPedAtraco = peds.ped;
                                    mp.events.callRemote("empezar_asalto_negocio", idNegocio);
                                    atracoEnCurso = true;
                                    negocioPedAtraco.taskPlayAnim("misschinese2_crystalmaze", "_stand_loop", 8.0, 1.0, -1, 1, 0.0, false, false, false);
                                    asalto_negocio_terminar();
                                }
                            }
                        }
                    });
                }
            }
        }
        else {
            mostrarAviso("error", 6000, "Debes esperar cinco minutos entre intentos o robos");
        }
    }
    else {
        if (negocioPedAtraco != null || tiempoApuntando != -1) {
            negocioPedAtraco = null;
            tiempoApuntando = -1;
        }
    }
}, 500);
function asalto_negocio_terminar() {
    if (atracoEnCurso) {
        crearTimeout(function () {
            atracoEnCurso = false;
            tiempoApuntando = -1;
            negocioPedAtraco.stopAnim("_stand_loop", "misschinese2_crystalmaze", 0);
            negocioPedAtraco = null;
        }, 300000);
    }
}
//# sourceMappingURL=robonegocio.js.map
}