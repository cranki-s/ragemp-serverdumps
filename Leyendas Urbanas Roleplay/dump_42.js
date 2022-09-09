{
/*
    historialadmin.js

    Autor: Dries

    Descripción: CEF del Historial administrativo de un usuario

*/
var cef_historialadmin = require('./LURP/cef.js');

var historialadmin_cefId = -1;

mp.events.add({
    "mostrar_historial_admin": (jugador) => {
        if (nivelAdmin < 2) return;
        let jugador_ = JSON.parse(jugador);
        mostrarInfoJugador(jugador_);

        if (historialadmin_cefId >= 0) {
            cef_historialadmin.ejecutarCef(historialadmin_cefId, `cargarApikey('${apiKey}', '${_k}')`)
        }
    },
    "reconearPj": (id) => {
        mp.events.callRemote("reconear_evento", id);
    },
    "cerrarHistorialAdmin": () => {
        if (historialadmin_cefId >= 0) {
            cef_historialadmin.cerrarCef(historialadmin_cefId);
            historialadmin_cefId = -1;
        }
    },
    "ha:enc:ajails": (iv, en) => {
        if (historialadmin_cefId >= 0) {
            cef_historialadmin.ejecutarCef(historialadmin_cefId, `obtenerAjails('${iv}', '${en}')`);
        }
    },
    'ha:enc:adverts': (iv, en) => {
        if (historialadmin_cefId >= 0) {
            cef_historialadmin.ejecutarCef(historialadmin_cefId, `obtenerAdvertencias('${iv}', '${en}')`);
        }
    },
    "ha:enc:bloqpj": (iv, en) => {
        if (historialadmin_cefId >= 0) {
            cef_historialadmin.ejecutarCef(historialadmin_cefId, `obtenerBloqPj('${iv}', '${en}')`);
        }
    },
    "ha:enc:bloqusu": (iv, en) => {
        if (historialadmin_cefId >= 0) {
            cef_historialadmin.ejecutarCef(historialadmin_cefId, `obtenerBloqUsu('${iv}', '${en}')`);
        }
    },
    "ha:enc:pdrpos": (iv, en) => {
        if (historialadmin_cefId >= 0) {
            cef_historialadmin.ejecutarCef(historialadmin_cefId, `obtenerPdrPos('${iv}', '${en}')`);
        }
    },
    "ha:enc:pdrneg": (iv, en) => {
        if (historialadmin_cefId >= 0) {
            cef_historialadmin.ejecutarCef(historialadmin_cefId, `obtenerPdrNeg('${iv}', '${en}')`);
        }
    }
});

function mostrarInfoJugador(jugador) {
    if (historialadmin_cefId < 0) {
        historialadmin_cefId = cef_historialadmin.crearCef("package://LURP/cef/historialadmin/historialadmin.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });

        let ply = {
            id: jugador.id,
            sqlid: jugador.sqlidPersonaje,
            uid: jugador.sqlidUsuario,
            nombre_pj: jugador.nombrePersonaje,
            nombre_visible: jugador.nombreVisible,
            n_pdr_neg: jugador.n_pdr_negativos,
            n_pdr_pos: jugador.n_pdr_positivos,
            n_ajails: jugador.n_ajails,
            n_advert: jugador.n_advertencias,
            usuario: jugador.usuario,
            nivel: jugador.nivel,
            n_bloqpj: jugador.n_bloqueosPj,
            n_bloqusu: jugador.n_bloqueosUsuario,
        };

        cef_historialadmin.ejecutarCef(historialadmin_cefId, "app.cargarPersonajes('" + JSON.stringify(ply) + "')");
    }
}
//# sourceMappingURL=jugadores.js.map
}