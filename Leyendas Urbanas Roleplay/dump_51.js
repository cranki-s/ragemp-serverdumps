{
var cef_gymkana = require("./LURP/cef.js");

var gymkana_cefId = -1;
var puntosGymkana = {};

mp.events.add({
    "gymkana:mostrar_imagen": (url) => {
        if (gymkana_cefId < 0 && !cef_gymkana.existeCef(gymkana_cefId)) {
            gymkana_cefId = cef_gymkana.crearCef("package://LURP/cef/gymkana/gymkana.html", {
                puedeCerrar: true,
                mostrarCursor: true
            });

            cef_gymkana.ejecutarCef(gymkana_cefId, `cargarImagen("${url}")`);
        }
    },
    "gymkana:cerrar_imagen": () => {
        if (gymkana_cefId >= 0 && cef_gymkana.existeCef(gymkana_cefId)) {
            cef_gymkana.cerrarCef(gymkana_cefId);
            gymkana_cefId = -1;
        }
    },
    "gymkana:iniciar": (puntos) => {
        if (typeof(puntos) === "string") {
            let puntosJson = JSON.parse(puntos);
            for (let i = 0; i < puntosJson.length; i++) {
                let punto = puntosJson[i].posicion;
                let url = puntosJson[i].url;
                let marcador = mp.markers.new(32, punto, 0.5, {
                    color: [200, 247, 57, 180],
                    visible: true,
                    dimension: 0
                });

                let colshape = mp.colshapes.newSphere(punto.x, punto.y, punto.z, 1, 0);
                puntosGymkana[colshape.id] = {
                    id: puntosJson[i].id,
                    url: url,
                    pos: punto,
                    marca: marcador
                };
            }
        }
    },
    "gymkana:parar": () => {
        for (let punto in puntosGymkana) {
            if (mp.markers.exists(puntosGymkana[punto].marca))
                puntosGymkana[punto].marca.destroy();
            delete puntosGymkana[punto];
        }
    }
});

mp.events.add("playerEnterColshape", (colshape) => {
    if (!player_local.vehicle) {
        if (puntosGymkana[colshape.id] != undefined) {
            let col = puntosGymkana[colshape.id];
            mp.events.call("gymkana:mostrar_imagen", col.url);
            mp.events.callRemote("gymkana:entrar_punto", col.id);
        }
    }
});

mp.events.add("playerExitColshape", (colshape) => {
    if (!player_local.vehicle) {
        if (puntosGymkana[colshape.id] != undefined) {
            mp.events.call("gymkana:cerrar_imagen");
        }
    }
});

// Evento que permite desactivar/activar los markers de la gymkhana. Como cualquier otro marker en pantalla rukaban el inventario, maletero...
mp.events.add("desactivarMarkersGymkhana", (desactivar) => {
    if (desactivar) {
        for (let punto in puntosGymkana) {
            if (puntosGymkana[punto].marca != null && mp.markers.exists(puntosGymkana[punto].marca)) {
                puntosGymkana[punto].marca.destroy();
                puntosGymkana[punto].marca = null;
            }
        }
    }
    else {
        for (let punto in puntosGymkana) {
            if (puntosGymkana[punto].marca == null || !mp.markers.exists(puntosGymkana[punto].marca)) {
                puntosGymkana[punto].marca = mp.markers.new(32, puntosGymkana[punto].pos, 0.5, {
                    color: [200, 247, 57, 180],
                    visible: true,
                    dimension: 0
                });
            }
        }
    }
});

}