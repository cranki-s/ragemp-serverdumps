{
///* --------------------------------------------------------------------------------
// * menu.js
// *
// * Autor: Kenshin
// *
// * Descripción: Lista de inventario aparte del menu
// *
// * -------------------------------------------------------------------------------- */
var cef_jugadores = require("./LURP/cef.js");

var jugadores_cefId = -1;

mp.events.add("cerrarJugadores", () => {
    if (jugadores_cefId >= 0) {
        cef_jugadores.cerrarCef(jugadores_cefId, false);
        jugadores_cefId = -1;
    }
});

function mostrarjugadores() {
    try {
        if (jugadores_cefId < 0) {
            jugadores_cefId = cef_jugadores.crearCef("package://LURP/cef/jugadores/jugadores.html", {
                puedeCerrar: false,
                mostrarCursor: true
            });

            var jugadores = [];
            mp.players.forEach(function (players) {
                if (mp.controladorJugadores._jugadores[players.id]) {
                    if (mp.controladorJugadores._jugadores[players.id].conectado) { // Conectado
                        if (mp.controladorJugadores._jugadores[players.id].oculto == false) { // Oculto
                            var ply = null;
                            if (mp.controladorJugadores._jugadores[players.id].caratapada.estado == true) // Caratapada
                                ply = { id: mp.controladorJugadores._jugadores[players.id].id_jugador, nombre: obtenerNombreConocido(players), nivel: "0", usuario: "Oculto" };
                            else
                                ply = { id: mp.controladorJugadores._jugadores[players.id].id_jugador, nombre: obtenerNombreConocido(players), nivel: mp.controladorJugadores._jugadores[players.id].nivel_pj, usuario: mp.controladorJugadores._jugadores[players.id].nombre_usuario };

                            if (ply)
                                jugadores.push(ply);
                        }
                    }
                }
            });
    
            cef_jugadores.ejecutarCef(jugadores_cefId, "app.cargarPersonajes('" + JSON.stringify(jugadores) + "')");
        }
    } catch (e) {
        console.log("Error jugadores: " + e.message);
    }
}
//# sourceMappingURL=jugadores.js.map
}