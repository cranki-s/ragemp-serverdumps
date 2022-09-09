{
/*

    CEF del menú genérico de jugadores

*/
var cef_menujugadores = require("./LURP/cef.js");

var menujugadores_cefId = -1;

mp.events.add("mostrar_jugadores_menu", (jugadores) => {
    let jugadores_ = null;
    if (typeof(jugadores) == "string")
        jugadores_ = JSON.parse(jugadores);
        
    if (jugadores_ != null)
        mostrarjugadoresGenerico(jugadores_);
});

mp.events.add("reconearMenuPj", (id) => {
    mp.events.callRemote("reconear_evento", id);
});

mp.events.add("cerrarMenuJugadores", () => {
    if (menujugadores_cefId >= 0) {
        cef_menujugadores.cerrarCef(menujugadores_cefId);
        menujugadores_cefId = -1;
    }
});

function mostrarjugadoresGenerico(jugadores_) {
    if (menujugadores_cefId < 0) {
        menujugadores_cefId = cef_menujugadores.crearCef("package://LURP/cef/menujugadores/menujugadores.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });

        var jugadores= [];

        jugadores_.forEach(jugador => {
            let ply = {
                id: jugador.id,
                sqlid: jugador.sqlidPersonaje,
                nombre_pj: jugador.nombrePersonaje,
                nombre_visible: jugador.nombreVisible,
                n_pdr_neg: jugador.n_pdr_negativos,
                n_pdr_pos: jugador.n_pdr_positivos,
                n_ajails: jugador.n_ajails,
                n_advert: jugador.n_advertencias,
                usuario: jugador.usuario,
                nivel: jugador.nivel,
                n_bloq_pj: jugador.n_bloqueosPj,
                n_bloq_usu: jugador.n_bloqueosUsuario
            };
            
            jugadores.push(ply);
        });

        cef_menujugadores.ejecutarCef(menujugadores_cefId, "app.cargarPersonajes('" + JSON.stringify(jugadores) + "')");
    }
    // global_jugadores.prepararCef();
    // global_jugadores.abrirCef("package://LURP/cef/menujugadores/menujugadores.html", 1);
    

    // global_jugadores.enviaraCef("app.cargarPersonajes('" + JSON.stringify(jugadores) + "')");
}
//# sourceMappingURL=jugadores.js.map
}