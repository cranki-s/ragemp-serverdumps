{
/* --------------------------------------------------------------------------------
 * robocamion.js
 *
 * Autor: Kenshin
 *
 * Descripción: Sistema de robo a camiones (asalto a mano armada)
 *
 * -------------------------------------------------------------------------------- */
// ID del negocio que se está atracando
var jugadorAsaltado = null;
// Indica si hay un atraco en curso
var atracoEnCursoC = false;
// Hora cuando el jugador apunta por primera vez a un NPC
var tiempoApuntandoC = -1;
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
var vehiculosCamion = [
    mp.game.joaat("hauler"),
    mp.game.joaat("hauler2"),
    mp.game.joaat("mule"),
    mp.game.joaat("mule2"),
    mp.game.joaat("mule3"),
    mp.game.joaat("mule4"),
    mp.game.joaat("packer"),
    mp.game.joaat("phantom"),
    mp.game.joaat("phantom3"),
    mp.game.joaat("pounder"),
    mp.game.joaat("pounder2"),
    mp.game.joaat("boxville2"),
    mp.game.joaat("boxville3"),
    mp.game.joaat("boxville4"),
    mp.game.joaat("burrito"),
    mp.game.joaat("burrito2"),
    mp.game.joaat("burrito3"),
    mp.game.joaat("burrito4"),
    mp.game.joaat("burrito5"),
    mp.game.joaat("gburrito"),
    mp.game.joaat("gburrito2"),
    mp.game.joaat("paradise"),
    mp.game.joaat("pony"),
    mp.game.joaat("pony2"),
    mp.game.joaat("rumpo"),
    mp.game.joaat("rumpo2"),
    mp.game.joaat("youga"),
    mp.game.joaat("youga2"),
    mp.game.joaat("speedo")
];

// Disparado cada tic
setInterval(() => {
    if (!logueado)
        return;
    if (purga)
        return;
    if (atracoEnCursoC == true) {
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
    if ((mp.game.invoke("0x2E397FD2ECD37C87", player_local) || (bEsArmaBlanca && mp.game.controls.isControlPressed(0, 25))) && jugadorAsaltado == null && !atracoEnCurso) {
        if (bEsArmaBlanca) {
            mp.players.forEachInStreamRange((player) => {
                if (player.vehicle) {
                    if (player.vehicle.getPedInSeat(-1) == player.handle) {
                        // Comprobamos si es un arma blanca
                        var bEsCamion = false;
                        for (let i = 0; i < vehiculosCamion.length; i++) {
                            if (player.vehicle.model == vehiculosCamion[i]) {
                                bEsCamion = true;
                                break;
                            }
                        }
                        if (bEsCamion) {
                            if (calcDist(player_local.position, player.getCoords(false)) <= 5.0) {
                                // Si es policía de servicio nada
                                if (faccion == 1 && mp.controladorJugadores._jugadores[player_local.id].deservicio === true) {
                                    return;
                                }
                                if (tiempoApuntandoC === -1) {
                                    tiempoApuntandoC = new Date().getTime();
                                }
                                if (new Date().getTime() - tiempoApuntandoC >= 2000 && tiempoApuntandoC !== -1) {
                                    if (mp.controladorJugadores._jugadores[player.id].id_jugador != undefined) {
                                        var jugadorID = mp.controladorJugadores._jugadores[player.id].id_jugador;
                                    }
                                    else {
                                        return;
                                    }
                                    jugadorAsaltado = player;
                                    mp.events.callRemote("empezar_asalto_camion", jugadorID);
                                    atracoEnCursoC = true;
                                    asalto_camion_terminar();
                                }
                            }
                        }
                    }
                }
            });
        }
        else {
            mp.players.forEachInStreamRange((player) => {
                if (player.vehicle) {
                    if (player.vehicle.getPedInSeat(-1) == player.handle) {
                        // Comprobamos si es un arma blanca
                        var bEsCamion = false;
                        for (let i = 0; i < vehiculosCamion.length; i++) {
                            if (player.vehicle.model == vehiculosCamion[i]) {
                                bEsCamion = true;
                                break;
                            }
                        }
                        if (bEsCamion) {
                            if (calcDist(player_local.position, player.getCoords(false)) <= 10.0) {
                                if (mp.game.invoke("0x3C06B5C839B38F7B", player_local, player.handle)) {
                                    // Si es policía de servicio nada
                                    if (faccion == 1 && mp.controladorJugadores._jugadores[player_local.id].deservicio === true) {
                                        return;
                                    }
                                    if (tiempoApuntandoC === -1) {
                                        tiempoApuntandoC = new Date().getTime();
                                    }
                                    if (new Date().getTime() - tiempoApuntandoC >= 2000 && tiempoApuntandoC !== -1) {
                                        if (mp.controladorJugadores._jugadores[player.id].id_jugador != undefined) {
                                            var jugadorID = mp.controladorJugadores._jugadores[player.id].id_jugador;
                                        }
                                        else {
                                            return;
                                        }
                                        jugadorAsaltado = player;
                                        mp.events.callRemote("empezar_asalto_camion", jugadorID);
                                        atracoEnCursoC = true;
                                        asalto_camion_terminar();
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    else {
        if (jugadorAsaltado != null || tiempoApuntandoC != -1) {
            jugadorAsaltado = null;
            tiempoApuntandoC = -1;
        }
    }
}, 500);

function asalto_camion_terminar() {
    if (atracoEnCursoC) {
        crearTimeout(function () {
            atracoEnCursoC = false;
            tiempoApuntandoC = -1;
            jugadorAsaltado = null;
        }, 300000);
    }
}
//# sourceMappingURL=robocamion.js.map
}