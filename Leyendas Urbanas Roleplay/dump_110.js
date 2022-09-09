{
/**
 * Controlador trabajo cartero prision federal
 *
 * Autor: poleStar
 */

let floodbotonCartero = 0;

var cartero_posicionesRuta = [];

var cartero_textlabel = null;
var cartero_blip = null;
var cartero_marcador = null;

var federal_enTrabajoCartero = false; // Para evitar K o pararanim
var indiceRuta = -1;
var trabajosRestantes = -1;
var ultimoTrabajo = 0;

var cartero_puedeUsarE = false;
var haObtenidoPremio = false; // 1 premio por ruta máximo

mp.events.add("cartero:iniciar", (ruta) => {
    cartero_posicionesRuta = (typeof ruta === "string" ? JSON.parse(ruta) : ruta);
    cartero_posicionesRuta.pop();

    indiceRuta = -1;
    cartero_puedeUsarE = true;
    trabajosRestantes = ultimoTrabajo = 6;

    mp.events.add("playerDeath", carteroDeathHandle);

    mostrarAviso("info", 5000, "Se te ha entregado un taco de periódicos que tienes que entregar");

    generarRuta();
    federal_enTrabajoCartero = true;
    haObtenidoPremio = false;

    mp.events.add("cartero:finalizar", () => {
        if (cartero_textlabel && mp.labels.exists(cartero_textlabel))
            cartero_textlabel.destroy();

        if (cartero_blip && mp.blips.exists(cartero_blip))
            cartero_blip.destroy();

        if (cartero_marcador && mp.markers.exists(cartero_marcador))
            cartero_marcador.destroy();

        indiceRuta = -1;
        cartero_posicionesRuta = [];
        cartero_textlabel = cartero_blip = cartero_marcador = null;
        cartero_puedeUsarE = false;
        federal_enTrabajoCartero = false;
        haObtenidoPremio = false;

        // Borramos todos los eventos creados para trabajar, dejando así sus funciones sin referencias (son limpiadas de memoria al no tener referencias)
        mp.events.remove("playerDeath", carteroDeathHandle);
        mp.events.remove("cartero:siguiente");
        mp.events.remove("cartero:no_objeto_mano");
        mp.events.remove("cartero:mostrar_cartero");
        mp.events.remove("cartero:seleccionar_menu");
        mp.events.remove("cartero:finalizar");
        // Borramos bindeo para evitar comprobaciones sin sentido cuando el usuario no está en el trabajo (función limpiada de memoria al no tener referencias)
        mp.keys.unbind(0x47, true, teclaGCartero);
    });

    mp.events.add("cartero:siguiente", () => {
        if (!haObtenidoPremio)
            obtenerPremio();

        if (cartero_textlabel && mp.labels.exists(cartero_textlabel))
            cartero_textlabel.destroy();

        if (cartero_blip && mp.blips.exists(cartero_blip))
            cartero_blip.destroy();

        if (cartero_marcador && mp.markers.exists(cartero_marcador))
            cartero_marcador.destroy();

        cartero_textlabel = cartero_blip = cartero_marcador = null;

        cartero_puedeUsarE = true;
        trabajosRestantes--;
        generarRuta();
    });

    mp.events.add("cartero:no_objeto_mano", () => {
        mostrarAviso("info", 5000, "Debes tener el taco de periodicos en la mano");
        cartero_puedeUsarE = true;
    });

    mp.events.add("cartero:mostrar_cartero", () => {
        mp.events.call("mostrar_cartero_federal", trabajosRestantes);
    });

    mp.events.add("cartero:seleccionar_menu", (index) => {
        switch (index) {
            case 1:
                marcarPuntoActual();
                break;
            case 2:
                if (cartero_textlabel && mp.labels.exists(cartero_textlabel))
                    cartero_textlabel.destroy();

                if (cartero_blip && mp.blips.exists(cartero_blip))
                    cartero_blip.destroy();

                if (cartero_marcador && mp.markers.exists(cartero_marcador))
                    cartero_marcador.destroy();
                cartero_textlabel = cartero_blip = cartero_marcador = null;

                cartero_blip = mp.blips.new(1, new mp.Vector3(1762.5521, 2591.9783, 45.917694), { name: "Fin de ruta", scale: 1.0, color: 5 });
                cartero_marcador = mp.markers.new(20, new mp.Vector3(1762.5521, 2591.9783, 45.917694 + 0.15), 2,
                    {
                        color: [255, 153, 0, 200],
                        visible: true,
                        dimension: 0
                    });

                mp.events.callRemote("cancelar_cartero_federal");
                mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar el taco de periódicos");

                trabajosRestantes = 0;
                break;
        }
    });

    mp.keys.bind(0x47, true, teclaGCartero);
});

function carteroDeathHandle() {
    mp.events.call("cartero:finalizar");
    mp.events.callRemote("cartero_muerte_federal");
}

/*
 * Funciones ruta
 */
function generarRuta() {
    indiceRuta++;
    if (indiceRuta >= ultimoTrabajo) {
        marcarPuntoActual();
        mp.events.callRemote("cartero_final_federal");
    } else {
        mostrarAviso("info", 5000, "Dirígete a la próxima zona de entrega");
        marcarPuntoActual();
    }
}

function marcarPuntoActual() {
    if (cartero_textlabel && mp.labels.exists(cartero_textlabel))
        cartero_textlabel.destroy();

    if (cartero_blip && mp.blips.exists(cartero_blip))
        cartero_blip.destroy();

    if (cartero_marcador && mp.markers.exists(cartero_marcador))
        cartero_marcador.destroy();
    cartero_textlabel = cartero_blip = cartero_marcador = null;

    if (indiceRuta >= ultimoTrabajo || trabajosRestantes == 0) {

        mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar el taco de periódicos");

        cartero_blip = mp.blips.new(1, new mp.Vector3(1762.5521, 2591.9783, 45.917694), { name: "Fin de ruta", scale: 1.0, color: 5 });
        cartero_marcador = mp.markers.new(20, new mp.Vector3(1762.5521, 2591.9783, 45.917694 + 0.15), 2,
            {
                color: [255, 153, 0, 200],
                visible: true,
                dimension: 0
            });
    } else {
        cartero_textlabel = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~entregar~w~ el periódico", cartero_posicionesRuta[indiceRuta], { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });

        cartero_blip = mp.blips.new(1, cartero_posicionesRuta[indiceRuta], { name: "Ruta cartero", scale: 1.0, color: 5 });
        cartero_marcador = mp.markers.new(20, new mp.Vector3(cartero_posicionesRuta[indiceRuta].x, cartero_posicionesRuta[indiceRuta].y, cartero_posicionesRuta[indiceRuta].z + 0.75), 0.5,
            {
                color: [0, 120, 255, 255],
                visible: true,
                dimension: 0
            });
    }
}

/*
 * Funcion recompensa
 * Comprueba si la persona tiene la "suerte" de encontrar un objeto con probabilidad máxima de +-5.8%
 */
function obtenerPremio() {
    // Puntos de la zona de trabajos, no tiene sentido en la zona de celdas/modulos
    let numero_1 = Math.floor(Math.random() * (17 - 0)) + 0; // Numero entero aleatorio entre 16 y 0
    let numero_2 = Math.floor(Math.random() * (17 - 0)) + 0; // Numero entero aleatorio entre 16 y 0

    if (numero_1 == numero_2) {
        mp.events.callRemote("premio_cartero_federal");
        haObtenidoPremio = true;
    }
}

function teclaGCartero() {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (cantidad_cefs > 0) return;
    if (player_local.vehicle) return;
    if (!cartero_puedeUsarE) return;
    if (floodbotonCartero == 0) {
        floodbotonCartero = 1;
        crearTimeout(function () {
            floodbotonCartero = 0;
        }, 1000);

        if (indiceRuta >= ultimoTrabajo || trabajosRestantes == 0) {
            if (cartero_textlabel && mp.labels.exists(cartero_textlabel))
                cartero_textlabel.destroy();

            if (cartero_blip && mp.blips.exists(cartero_blip))
                cartero_blip.destroy();

            if (cartero_marcador && mp.markers.exists(cartero_marcador))
                cartero_marcador.destroy();
            cartero_textlabel = cartero_blip = cartero_marcador = null;

            mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar el taco de periódicos");

            cartero_blip = mp.blips.new(1, new mp.Vector3(1762.5521, 2591.9783, 45.917694), { name: "Fin de ruta", scale: 1.0, color: 5 });
            cartero_marcador = mp.markers.new(20, new mp.Vector3(1762.5521, 2591.9783, 45.917694 + 0.15), 2,
                {
                    color: [255, 153, 0, 200],
                    visible: true,
                    dimension: 0
                });
            return;
        }
        //Distancia baja para evitar posibles bugs con animaciones al entregar el objeto
        if (calcDist(player_local.position, cartero_posicionesRuta[indiceRuta]) <= 1) {
            cartero_puedeUsarE = false;
            mp.events.callRemote("cartero_e_federal");
        } else {
            mostrarAviso("info", 5000, "No estás en la zona correcta, dirígete a la zona de entrega");
            mp.game.ui.setNewWaypoint(cartero_posicionesRuta[indiceRuta].x, cartero_posicionesRuta[indiceRuta].y);
        }
    }
}
}