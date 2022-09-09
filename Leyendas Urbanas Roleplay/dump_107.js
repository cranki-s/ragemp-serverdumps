{
/**
 * Controlador trabajo limpiador prision federal
 *
 * Autor: poleStar
 */

let floodbotonLimpiador = 0;
var cef_limpiador = require('./LURP/cef.js');

var rutaPuntos = [];

var limpiador_textlabel = null;
var limpiador_blip = null;
var limpiador_marcador = null;

var tipo_ruta = null;
var indiceRuta = -1;
var trabajosRestantes = 10;

var puedeFregar = false;

var limpiador_cefId = -1;

var haObtenidoPremio = false; // 1 premio por ruta máximo

mp.events.add("limpiador:iniciar", (tipo, ruta) => {
    rutaPuntos = (typeof ruta === "string" ? JSON.parse(ruta) : ruta);
    rutaPuntos.pop();
    tipo_ruta = tipo;

    indiceRuta = -1;
    puedeFregar = true;
    trabajosRestantes = 10;

    mp.events.add("playerDeath", limpiadorDeathHandle);

    if (tipo_ruta == 0)
        mostrarAviso("info", 5000, "Se te ha entregado una Escoba para que realices tu trabajo");
    else
        mostrarAviso("info", 5000, "Se te ha entregado una Fregona para que realices tu trabajo");

    generarRuta();
    haObtenidoPremio = false;

    mp.events.add("limpiador:finalizar", () => {
        if (limpiador_textlabel && mp.labels.exists(limpiador_textlabel))
            limpiador_textlabel.destroy();

        if (limpiador_blip && mp.blips.exists(limpiador_blip))
            limpiador_blip.destroy();

        if (limpiador_marcador && mp.markers.exists(limpiador_marcador))
            limpiador_marcador.destroy();
        limpiador_textlabel = limpiador_blip = limpiador_marcador = null;

        puedeFregar = false;
        rutaPuntos = [];
        haObtenidoPremio = false;

        // Borramos todos los eventos creados para trabajar, dejando así sus funciones sin referencias (son limpiadas de memoria al no tener referencias)
        mp.events.remove("playerDeath", limpiadorDeathHandle);
        mp.events.remove("limpiador:siguiente");
        mp.events.remove("limpiador:no_objeto_mano");
        mp.events.remove("limpiador:mostrar_limpiador");
        mp.events.remove("limpiador:seleccionar_menu");
        mp.events.remove("limpiador:cef:abrir");
        mp.events.remove("limpiador:cef:fin");
        mp.events.remove("limpiador:cef:mal");
        // Borramos bindeo para evitar comprobaciones sin sentido cuando el usuario no está en el trabajo (función limpiada de memoria al no tener referencias)
        mp.keys.unbind(0x47, true, teclaGLimpiador);
    });

    mp.events.add("limpiador:siguiente", () => {
        if (!haObtenidoPremio)
            obtenerPremio(); // Probabilidad 1% de obtener un objeto

        if (limpiador_textlabel && mp.labels.exists(limpiador_textlabel))
            limpiador_textlabel.destroy();

        if (limpiador_blip && mp.blips.exists(limpiador_blip))
            limpiador_blip.destroy();

        if (limpiador_marcador && mp.markers.exists(limpiador_marcador))
            limpiador_marcador.destroy();
        limpiador_textlabel = limpiador_blip = limpiador_marcador = null;

        puedeFregar = true;
        trabajosRestantes--;
        generarRuta();
    });

    mp.events.add("limpiador:no_objeto_mano", () => {
        if (tipo_ruta == 0)
            mostrarAviso("info", 5000, "Debes tener una escoba en la mano");
        else
            mostrarAviso("info", 5000, "Debes tener una fregona en la mano");

        puedeFregar = true;
    });


    mp.events.add("limpiador:mostrar_limpiador", () => {
        mp.events.call("mostrar_limpiador", trabajosRestantes);
    });

    mp.events.add("limpiador:seleccionar_menu", (index) => {
        switch (index) {
            case 1:
                marcarPuntoActual();
                break;
            case 2:
                if (limpiador_textlabel && mp.labels.exists(limpiador_textlabel))
                    limpiador_textlabel.destroy();

                if (limpiador_blip && mp.blips.exists(limpiador_blip))
                    limpiador_blip.destroy();

                if (limpiador_marcador && mp.markers.exists(limpiador_marcador))
                    limpiador_marcador.destroy();
                limpiador_textlabel = limpiador_blip = limpiador_marcador = null;

                limpiador_blip = mp.blips.new(1, new mp.Vector3(1765.599, 2588.922, 45.91767), { name: "Fin de ruta", scale: 1.0, color: 5 });
                limpiador_marcador = mp.markers.new(20, new mp.Vector3(1765.599, 2588.922, 45.91767 + 0.15), 2,
                    {
                        color: [255, 153, 0, 200],
                        visible: true,
                        dimension: 0
                    });

                mp.events.callRemote("cancelar_limpiador");

                trabajosRestantes = 0;
                puedeFregar = false;
                break;
        }
    });

    mp.events.add("limpiador:cef:abrir", () => {
        if (!hudOculto) {
            mp.events.call("hud:estado_hud");
            mp.game.ui.displayRadar(false);
            mp.game.ui.displayHud(false);
            mp.gui.chat.show(false);
        }

        if (Math.random() >= 0.5) {
            if (limpiador_cefId < 0) {
                limpiador_cefId = cef_limpiador.crearCef("package://LURP/cef/limpiador/limpiadorHTML.html", {
                    puedeCerrar: false,
                    mostrarCursor: true
                });
            }
        } else {
            if (limpiador_cefId < 0) {
                limpiador_cefId = cef_limpiador.crearCef("package://LURP/cef/limpiador2/limpiadorHTMLcefdos.html", {
                    puedeCerrar: false,
                    mostrarCursor: true
                });
            }
        }
    });

    mp.events.add("limpiador:cef:fin", () => {
        if (limpiador_cefId >= 0) {
            cef_limpiador.cerrarCef(limpiador_cefId, false);
            limpiador_cefId = -1;
        }

        if (hudOculto)
            mp.events.call("hud:estado_hud");

        mp.events.callRemote("limpiador_e_acabar");
        mp.events.call("limpiador:siguiente");
    });

    mp.events.add("limpiador:cef:mal", () => {
        if (limpiador_cefId >= 0) {
            cef_limpiador.cerrarCef(limpiador_cefId, false);
            limpiador_cefId = -1;
        }

        if (hudOculto)
            mp.events.call("hud:estado_hud");

        puedeFregar = true;
        mostrarAviso("info", 4000, "Has fallado, vuelve a intentarlo");
        mp.events.callRemote("limpiador_e_acabar");
    });

    mp.keys.bind(0x47, true, teclaGLimpiador);
});

function limpiadorDeathHandle() {
    if (limpiador_cefId >= 0) {
        cef_limpiador.cerrarCef(limpiador_cefId, false);
        limpiador_cefId = -1;
    }

    mp.events.call("limpiador:finalizar");
    mp.events.callRemote("limpiador_muerte");
}

function generarRuta() {
    indiceRuta++;
    if (indiceRuta >= 9 || trabajosRestantes == 0) {
        marcarPuntoActual();
        mp.events.callRemote("limpiador_final");
    } else {
        mostrarAviso("info", 5000, "Dirígete a la zona que tienes que limpiar");
        marcarPuntoActual();
    }
}

function marcarPuntoActual() {
    if (limpiador_textlabel && mp.labels.exists(limpiador_textlabel))
        limpiador_textlabel.destroy();

    if (limpiador_blip && mp.blips.exists(limpiador_blip))
        limpiador_blip.destroy();

    if (limpiador_marcador && mp.markers.exists(limpiador_marcador))
        limpiador_marcador.destroy();
    limpiador_textlabel = limpiador_blip = limpiador_marcador = null;

    if (indiceRuta >= 9 || trabajosRestantes == 0) {
        if (tipo_ruta == 0)
            mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar tu escoba");
        else
            mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar tu fregona");

        limpiador_blip = mp.blips.new(1, new mp.Vector3(1765.599, 2588.922, 45.91767), { name: "Fin de ruta", scale: 1.0, color: 5 });
        limpiador_marcador = mp.markers.new(20, new mp.Vector3(1765.599, 2588.922, 45.91767 + 0.15), 2,
            {
                color: [255, 153, 0, 200],
                visible: true,
                dimension: 0
            });
    } else {
        if (tipo_ruta == 0)
            limpiador_textlabel = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~comenzar~w~ a barrer", rutaPuntos[indiceRuta], { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
        else
            limpiador_textlabel = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~comenzar~w~ a fregar", rutaPuntos[indiceRuta], { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });

        limpiador_blip = mp.blips.new(1, rutaPuntos[indiceRuta], { name: "Ruta limpiador", scale: 1.0, color: 5 });
        limpiador_marcador = mp.markers.new(20, new mp.Vector3(rutaPuntos[indiceRuta].x, rutaPuntos[indiceRuta].y, rutaPuntos[indiceRuta].z + 0.15), 1.75,
            {
                color: [255, 153, 0, 200],
                visible: true,
                dimension: 0
            });
    }
}

// Funcion que comprueba si la persona tiene la "suerte" de encontrar un objeto con probabilidad máxima de +-5.8%
function obtenerPremio() {
    // Puntos de la zona de trabajos, no tiene sentido en la zona de celdas/modulos
    let punto = rutaPuntos[indiceRuta].x;
    if (punto == 1771.061 || punto == 1768.055 || punto == 1761.762 || punto == 1762.827 || punto == 1771.061) {
        let numero_1 = Math.floor(Math.random() * (17 - 0)) + 0; // Numero entero aleatorio entre 16 y 0
        let numero_2 = Math.floor(Math.random() * (17 - 0)) + 0; // Numero entero aleatorio entre 16 y 0

        if (numero_1 == numero_2) {
            mp.events.callRemote("premio_limpiador");
            haObtenidoPremio = true;
        }
    }
}

function teclaGLimpiador() {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (cantidad_cefs > 0) return;
    if (player_local.vehicle) return;
    if (!puedeFregar) return;
    if (floodbotonLimpiador == 0) {
        floodbotonLimpiador = 1;
        crearTimeout(function () {
            floodbotonLimpiador = 0;
        }, 1000);

        if (indiceRuta >= 9 || trabajosRestantes == 0) {
            if (limpiador_textlabel && mp.labels.exists(limpiador_textlabel))
                limpiador_textlabel.destroy();

            if (limpiador_blip && mp.blips.exists(limpiador_blip))
                limpiador_blip.destroy();

            if (limpiador_marcador && mp.markers.exists(limpiador_marcador))
                limpiador_marcador.destroy();
            limpiador_textlabel = limpiador_blip = limpiador_marcador = null;

            if (tipo_ruta == 0)
                mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar tu escoba");
            else
                mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar tu fregona");

            limpiador_blip = mp.blips.new(1, new mp.Vector3(1765.599, 2588.922, 45.91767), { name: "Fin de ruta", scale: 1.0, color: 5 });
            limpiador_marcador = mp.markers.new(20, new mp.Vector3(1765.599, 2588.922, 45.91767 + 0.15), 2,
                {
                    color: [255, 153, 0, 200],
                    visible: true,
                    dimension: 0
                });
            return;
        }
        if (calcDist(player_local.position, rutaPuntos[indiceRuta]) <= 1) {
            puedeFregar = false;
            mp.events.callRemote("limpiador_e_iniciar");
        } else {
            mostrarAviso("info", 5000, "Dirígete a la zona que tienes que limpiar");
            mp.game.ui.setNewWaypoint(rutaPuntos[indiceRuta].x, rutaPuntos[indiceRuta].y);
        }
    }
}
}