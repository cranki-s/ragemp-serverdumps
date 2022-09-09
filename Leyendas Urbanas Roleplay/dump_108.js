{
/**
 * Controlador trabajo jardineria prision federal
 *
 * Autor: poleStar
 */

let floodbotonJardinero = 0;

var jardinero_posicionesRuta = [];

var jardinero_textlabel = null;
var jardinero_blip = null;
var jardinero_marcador = null;

var federal_enTrabajoJardinero = false; // Para evitar K o pararanim
var tipo_ruta = null;
var indiceRuta = -1;
var trabajosRestantes = -1;
var ultimoTrabajo = 0;

var jardinero_puedeUsarE = false;

var plantas_creadas = []; // Lista de plantas (objetos) creadas
var haObtenidoPremio = false; // 1 premio por ruta máximo

mp.events.add("jardinero:iniciar", (tipo, ruta, numero) => {
    jardinero_posicionesRuta = (typeof ruta === "string" ? JSON.parse(ruta) : ruta);
    jardinero_posicionesRuta.pop();
    tipo_ruta = tipo;

    indiceRuta = -1;
    jardinero_puedeUsarE = true;
    trabajosRestantes = ultimoTrabajo = numero - 1;

    mp.events.add("playerDeath", jardineroDeathHandle);

    if (tipo_ruta == 0)
        mostrarAviso("info", 5000, "Se te ha entregado una Azada para que realices tu trabajo");
    else
        mostrarAviso("info", 5000, "Se te ha entregado una Pala para que realices tu trabajo");

    crear_plantas();
    generarRuta();
    federal_enTrabajoJardinero = true;
    haObtenidoPremio = false;

    mp.events.add("jardinero:finalizar", () => {
        if (jardinero_textlabel && mp.labels.exists(jardinero_textlabel))
            jardinero_textlabel.destroy();

        if (jardinero_blip && mp.blips.exists(jardinero_blip))
            jardinero_blip.destroy();

        if (jardinero_marcador && mp.markers.exists(jardinero_marcador))
            jardinero_marcador.destroy();

        indiceRuta = -1;
        jardinero_posicionesRuta = [];
        jardinero_textlabel = jardinero_blip = jardinero_marcador = null;
        jardinero_puedeUsarE = false;
        federal_enTrabajoJardinero = false;

        plantas_creadas = [];
        haObtenidoPremio = false;

        // Borramos todos los eventos creados para trabajar, dejando así sus funciones sin referencias (son limpiadas de memoria al no tener referencias)
        mp.events.remove("playerDeath", jardineroDeathHandle);
        mp.events.remove("jardinero:siguiente");
        mp.events.remove("jardinero:no_objeto_mano");
        mp.events.remove("jardinero:mostrar_jardinero");
        mp.events.remove("jardinero:seleccionar_menu");
        mp.events.remove("jardinero:mostrar_jardinero");
        mp.events.remove("jardinero:finalizar");
        mp.events.remove("jardinero:finalizar");
        // Borramos bindeo para evitar comprobaciones sin sentido cuando el usuario no está en el trabajo (función limpiada de memoria al no tener referencias)
        mp.keys.unbind(0x47, true, teclaGJardinero);
    });

    mp.events.add("jardinero:siguiente", () => {
        if (!haObtenidoPremio)
            obtenerPremio(); // Probabilidad de obtener un objeto

        if (jardinero_textlabel && mp.labels.exists(jardinero_textlabel))
            jardinero_textlabel.destroy();

        if (jardinero_blip && mp.blips.exists(jardinero_blip))
            jardinero_blip.destroy();

        if (jardinero_marcador && mp.markers.exists(jardinero_marcador))
            jardinero_marcador.destroy();

        jardinero_textlabel = jardinero_blip = jardinero_marcador = null;

        borrar_planta();
        jardinero_puedeUsarE = true;
        trabajosRestantes--;
        generarRuta();
    });

    mp.events.add("jardinero:no_objeto_mano", () => {
        if (tipo_ruta == 0)
            mostrarAviso("info", 5000, "Debes tener una azada en la mano");
        else
            mostrarAviso("info", 5000, "Debes tener una pala en la mano");

        jardinero_puedeUsarE = true;
    });

    mp.events.add("jardinero:mostrar_jardinero", () => {
        mp.events.call("mostrar_jardinero", trabajosRestantes);
    });

    mp.events.add("jardinero:seleccionar_menu", (index) => {
        switch (index) {
            case 1:
                marcarPuntoActual();
                break;
            case 2:
                if (jardinero_textlabel && mp.labels.exists(jardinero_textlabel))
                    jardinero_textlabel.destroy();

                if (jardinero_blip && mp.blips.exists(jardinero_blip))
                    jardinero_blip.destroy();

                if (jardinero_marcador && mp.markers.exists(jardinero_marcador))
                    jardinero_marcador.destroy();
                jardinero_textlabel = jardinero_blip = jardinero_marcador = null;

                jardinero_blip = mp.blips.new(1, new mp.Vector3(1771.235, 2588.776, 45.91773), { name: "Fin de ruta", scale: 1.0, color: 5 });
                jardinero_marcador = mp.markers.new(20, new mp.Vector3(1771.235, 2588.776, 45.91773 + 0.15), 2,
                    {
                        color: [255, 153, 0, 200],
                        visible: true,
                        dimension: 0
                    });

                borrar_todas_plantas();
                mp.events.callRemote("cancelar_jardinero");

                trabajosRestantes = 0;
                break;
        }
    });

    mp.keys.bind(0x47, true, teclaGJardinero);
});

function jardineroDeathHandle() {
    borrar_todas_plantas();
    mp.events.call("jardinero:finalizar");
    mp.events.callRemote("jardinero_muerte");
}

function generarRuta() {
    animJardinero(false);
    indiceRuta++;
    if (indiceRuta >= ultimoTrabajo) {
        marcarPuntoActual();
        mp.events.callRemote("jardinero_final");
    } else {
        mostrarAviso("info", 5000, "Dirígete a la próxima zona que tienes que despejar");
        marcarPuntoActual();
    }
}

function marcarPuntoActual() {
    if (jardinero_textlabel && mp.labels.exists(jardinero_textlabel))
        jardinero_textlabel.destroy();

    if (jardinero_blip && mp.blips.exists(jardinero_blip))
        jardinero_blip.destroy();

    if (jardinero_marcador && mp.markers.exists(jardinero_marcador))
        jardinero_marcador.destroy();
    jardinero_textlabel = jardinero_blip = jardinero_marcador = null;

    if (indiceRuta >= ultimoTrabajo || trabajosRestantes == 0) {
        if (tipo_ruta == 0)
            mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar tu azada");
        else
            mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar tu pala");

        jardinero_blip = mp.blips.new(1, new mp.Vector3(1771.235, 2588.776, 45.91773), { name: "Fin de ruta", scale: 1.0, color: 5 });
        jardinero_marcador = mp.markers.new(20, new mp.Vector3(1771.235, 2588.776, 45.91773 + 0.15), 2,
            {
                color: [255, 153, 0, 200],
                visible: true,
                dimension: 0
            });
    } else {
        jardinero_textlabel = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~comenzar~w~ a retirar las malas hierbas", jardinero_posicionesRuta[indiceRuta], { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });

        jardinero_blip = mp.blips.new(1, jardinero_posicionesRuta[indiceRuta], { name: "Ruta jardinero", scale: 1.0, color: 5 });
        jardinero_marcador = mp.markers.new(0, new mp.Vector3(jardinero_posicionesRuta[indiceRuta].x, jardinero_posicionesRuta[indiceRuta].y, jardinero_posicionesRuta[indiceRuta].z + 2), 1.25,
            {
                color: [255, 153, 0, 175],
                visible: true,
                dimension: 0
            });
    }
}

// Funcion que comprueba si la persona tiene la "suerte" de encontrar un objeto con probabilidad máxima de +-5.8%
function obtenerPremio() {
    let numero_1 = Math.floor(Math.random() * (17 - 0)) + 0; // Numero entero aleatorio entre 16 y 0
    let numero_2 = Math.floor(Math.random() * (17 - 0)) + 0; // Numero entero aleatorio entre 16 y 0

    if (numero_1 == numero_2) {
        mp.events.callRemote("premio_jardinero");
        haObtenidoPremio = true;
    }
}

// Crea todas las plantas en los puntos de la ruta
function crear_plantas() {
    jardinero_posicionesRuta.forEach(function (obj) {
        let getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(obj.x, obj.y, obj.z, parseFloat(0), false);
        let objeto = mp.game.object.createObject(4232507369, obj.x, obj.y, getGroundZ - 0.13, false, true, true);
        plantas_creadas.push(objeto);
    });
}

// Borra la última planta retirada por el trabajador
function borrar_planta() {
    // Borramos objeto, luego borramos su netHandle del array, por eso siempre usamos indice 0 para obtener la planta a borrar
    if (plantas_creadas != null && plantas_creadas.length > 0) {
        let planta = plantas_creadas[0];
        if (planta !== undefined && planta != null)
            mp.game.object.deleteObject(planta);
        plantas_creadas.splice(plantas_creadas.indexOf(planta), 1);
    }
}

// Borra todas las plantas sobrantes en casos de muerte, cancelación o en los que falle alguna mierda
function borrar_todas_plantas() {
    if (plantas_creadas != null && plantas_creadas.length > 0) {
        for (let i = 0; i < plantas_creadas.length; i++) {
            let planta = plantas_creadas[i];
            if (planta !== undefined && planta != null)
                mp.game.object.deleteObject(planta);
        }
    }
}

let intervaloAnimJardinero = null;
function animJardinero(activar) {
    if (activar == true) {
        let contadorAnim = 0;
        if (intervaloAnimJardinero != null) {
            clearInterval(intervaloAnimJardinero);
            intervaloAnimJardinero = null;
        }
        intervaloAnimJardinero = setInterval(function () {
            if (calcDist(player_local.position, jardinero_posicionesRuta[indiceRuta]) > 1.5) {
                mp.events.callRemote("jardinero_anim_parada", 0);

                clearInterval(intervaloAnimJardinero);
                intervaloAnimJardinero = null;
                return;
            }

            if (!player_local.isPlayingAnim("amb@world_human_janitor@male@idle_a", "idle_a", 3) && !player_local.isPlayingAnim("amb@world_human_gardener_plant@male@base", "base", 3)) {
                contadorAnim++;

                if (contadorAnim > 7) {
                    mp.events.callRemote("jardinero_anim_parada", 1);

                    clearInterval(intervaloAnimJardinero);
                    intervaloAnimJardinero = null;
                    return;
                }
            }
            else {
                contadorAnim = 0;
            }
        }, 150);
    }
    else {
        if (intervaloAnimJardinero != null) {
            clearInterval(intervaloAnimJardinero);
            intervaloAnimJardinero = null;
        }
    }
}

function teclaGJardinero() {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (cantidad_cefs > 0) return;
    if (player_local.vehicle) return;
    if (!jardinero_puedeUsarE) return;
    if (floodbotonJardinero == 0) {
        floodbotonJardinero = 1;
        crearTimeout(function () {
            floodbotonJardinero = 0;
        }, 1000);

        if (indiceRuta >= ultimoTrabajo || trabajosRestantes == 0) {
            if (jardinero_textlabel && mp.labels.exists(jardinero_textlabel))
                jardinero_textlabel.destroy();

            if (jardinero_blip && mp.blips.exists(jardinero_blip))
                jardinero_blip.destroy();

            if (jardinero_marcador && mp.markers.exists(jardinero_marcador))
                jardinero_marcador.destroy();
            jardinero_textlabel = jardinero_blip = jardinero_marcador = null;

            if (tipo_ruta == 0)
                mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar tu azada");
            else
                mostrarAviso("info", 6000, "Has acabado el servicio, vuelve al almacén para dejar tu pala");

            jardinero_blip = mp.blips.new(1, new mp.Vector3(1771.235, 2588.776, 45.91773), { name: "Fin de ruta", scale: 1.0, color: 5 });
            jardinero_marcador = mp.markers.new(20, new mp.Vector3(1771.235, 2588.776, 45.91773 + 0.15), 2,
                {
                    color: [255, 153, 0, 200],
                    visible: true,
                    dimension: 0
                });
            return;
        }
        if (calcDist(player_local.position, jardinero_posicionesRuta[indiceRuta]) <= 1) {
            jardinero_puedeUsarE = false;
            animJardinero(true);
            mp.events.callRemote("jardinero_e");
        } else {
            mostrarAviso("info", 5000, "No estás en la zona correcta, dirígete a la zona que tienes que despejar");
            mp.game.ui.setNewWaypoint(jardinero_posicionesRuta[indiceRuta].x, jardinero_posicionesRuta[indiceRuta].y);
        }
    }
}
}