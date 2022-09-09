{
/* --------------------------------------------------------------------------------
 * minero.js
 *
 * Autor: Dries
 *
 * Descripción: Controlador del cliente del job de minero
 * -------------------------------------------------------------------------------- */

var cef_minero = require('./LURP/cef.js');

var minero_cefId = -1;

var vehiculoMinero = null; // Vehiculo asignado al cliente para el job
var blipMinero = null; // Blip que marca el vehiculo
var enVehiculoMinero = false; // Indica si el cliente esta subido en su vehiculo asignado
var mineroIniciado = false; // Indica si hemos empezado a trabajar, o sea, si se nos ha abierto el minijuego por primera vez

var colshapeMineroCantera = null; // Colshape de la cantera (donde se puede picar)
var puedeMinar = false; // Indica si podemos pulsar a la E y picar
var textlabelMinero = null; // Es el textlabel pegado al vehiculo de minero
var colshapeMineroPed = null; // Colshape del ped easter egg de minero

var nivel_minero = -1; // Nivel del minijuego en funcion de la habilidad
var tiempo_minero = -1; // Tiempo que dura el minijuego

var trabajosRealizados = -1; // Trabajos realizado satifactoriamente (veces completado el minijuego)

var tienePiedra = false; // Indica si tiene la piedra pegada en la mano

mp.events.add("minero:iniciar_trabajo", (vehiculo, vehiculo_posicion) => {
    if (vehiculoMinero != null) vehiculoMinero = null;
    if (blipMinero != null) {
        try {
            if (mp.blips.exists(blipMinero))
                blipMinero.destroy();
        } catch (e) { }

        blipMinero = null;
    }

    mp.events.add("playerDeath", mineroDeathHandle);
    mp.events.add("playerEnterVehicle", entrarVehiculoMinero);
    mp.events.add("playerLeaveVehicle", salirVehiculoMinero);
    mp.events.add("playerEnterColshape", entrarColshapeInicialMinero);

    vehiculoMinero = vehiculo;

    let colshape = mp.colshapes.newCircle(2952.183, 2788.797, 50, 0);
    colshapeMineroCantera = colshape;

    colshape = mp.colshapes.newSphere(2938.2737, 2812.6555, 43.42805, 1.5, 0);
    colshapeMineroPed = colshape;

    if (blipMinero == null)
        blipMinero = mp.markers.new(0, new mp.Vector3(vehiculo_posicion.x, vehiculo_posicion.y, vehiculo_posicion.z), 1.5, { visible: true, color: [200, 247, 57, 180], dimension: 0 });

    mp.events.add("minero:iniciar", (nivel, tiempo) => {
        if (!mineroIniciado) return;

        if (trabajosRealizados < 0)
            trabajosRealizados = 0;

        tienePiedra = false;

        nivel_minero = nivel;
        tiempo_minero = tiempo;

        mp.events.call("minero:iniciar_picar");
    });

    mp.events.add("minero:iniciar_picar", () => {
        if (!mineroIniciado) return;

        if (!hudOculto) {
            mp.events.call("hud:estado_hud");
            mp.game.ui.displayRadar(false);
            mp.game.ui.displayHud(false);
            mp.gui.chat.show(false);
        }

        if (minero_cefId < 0) {
            minero_cefId = cef_minero.crearCef("package://LURP/cef/minero/minero.html", {
                puedeCerrar: false,
                mostrarCursor: true
            });

            cef_minero.ejecutarCef(minero_cefId, `cargar(${tiempo_minero}, ${nivel_minero})`);
        }
    });

    mp.events.add("minero:finalizar", () => {
        if (hudOculto)
            mp.events.call("hud:estado_hud");

        if (minero_cefId >= 0) {
            cef_minero.cerrarCef(minero_cefId, false);
            minero_cefId = -1;
        }

        mostrarAviso("info", 8000, "Puedes volver a picar presionando la tecla [J]");
    });

    mp.events.add("minero:exito", () => {
        if (minero_cefId >= 0) {
            cef_minero.cerrarCef(minero_cefId, false);
            minero_cefId = -1;
        }

        if (hudOculto)
            mp.events.call("hud:estado_hud");

        mostrarAviso("success", 7000, "¡Has finalizado el trabajo! Lleva los minerales a tu camión");
        mp.events.callRemote("minero:pegar_mineral");
        tienePiedra = true;
        trabajosRealizados++;
        if (vehiculoMinero && !textlabelMinero) {
            crearTextlabelMinero();
        }
    });

    mp.events.add("minero:acabar_trabajo", () => {
        // Reseteamos variables a null para evitar referencias a objetos borrados (expirados) incluidos posibles blips activos
        if (blipMinero) {
            if (mp.blips.exists(blipMinero))
                blipMinero.destroy();
            blipMinero = null;
        }

        if (textlabelMinero) {
            if (mp.labels.exists(textlabelMinero))
                textlabelMinero.destroy();
            textlabelMinero = null;
        }

        if (colshapeMineroPed) {
            if (mp.colshapes.exists(colshapeMineroPed))
                colshapeMineroPed.destroy();
            colshapeMineroPed = null;
        }

        if (colshapeMineroCantera) {
            if (mp.colshapes.exists(colshapeMineroCantera))
                colshapeMineroCantera.destroy();
            colshapeMineroCantera = null;
        }

        if (minero_cefId >= 0) {
            cef_minero.cerrarCef(minero_cefId, false);
            minero_cefId = -1;
        }

        vehiculoMinero = null;
        enVehiculoMinero = false;
        mineroIniciado = false;
        tienePiedra = false;
        trabajosRealizados = -1;
        puedeMinar = false;
        nivel_minero = tiempo_minero = 0;

        // Borramos todos los eventos creados para trabajar, dejando así sus funciones sin referencias (son limpiadas de memoria al no tener referencias)
        mp.events.remove("playerDeath", mineroDeathHandle);
        mp.events.remove("minero:iniciar");
        mp.events.remove("minero:iniciar_picar");
        mp.events.remove("minero:finalizar");
        mp.events.remove("minero:exito");
        mp.events.remove("minero:mostrar_menu");
        mp.events.remove("minero:seleccionar_menu");
        mp.events.remove("playerEnterVehicle", entrarVehiculoMinero);
        mp.events.remove("playerLeaveVehicle", salirVehiculoMinero);
        mp.events.remove("playerEnterColshape", entrarColshapeInicialMinero);
        mp.events.remove("playerEnterColshape", entrarColshapeCanteraMinero);
        mp.events.remove("playerExitColshape", salirColshapeCanteraMinero);
        mp.events.remove("minero:acabar_trabajo");
        // Borramos bindeo para evitar comprobaciones sin sentido cuando el usuario no está en el trabajo (función limpiada de memoria al no tener referencias)
        mp.keys.unbind(0x4A, true, teclaJMinero);
    });

    mp.events.add("minero:mostrar_menu", () => {
        mp.events.call("mostrar_minero", (trabajosRealizados > 0 ? 3 - trabajosRealizados : 3));
    });

    mp.events.add("minero:seleccionar_menu", (index) => {
        switch (index) {
            case 1:
                if (!vehiculoMinero) return;
                mp.game.ui.setNewWaypoint(vehiculoMinero.position.x, vehiculoMinero.position.y);
                break;
            case 2:
                mp.game.ui.setNewWaypoint(2772.5251, 2807.1536);
                mostrarAviso("success", 7000, "Se ha marcado la posición final de ruta");
                break;
            case 3:
                mp.events.call("minero:acabar_trabajo");
                mp.events.callRemote("minero:cancelar_ruta");
                break;
        }
    });

    mp.keys.bind(0x4A, true, teclaJMinero);
});

/**
 * Eventos fijos
 */
mp.events.add("minero:cargar", (puntosJson) => {
    if (typeof puntosJson !== "string") return;

    try {
        let puntos = JSON.parse(puntosJson);

        for (let i = 0; i < puntos.length; i++) {
            mp.events.call("crearPedAnimacion", JSON.stringify([
                "s_m_y_construct_02",
                puntos[i].posicion,
                puntos[i].rotacion.z,
                0,
                "random@street_race",
                "_car_b_lookout",
                200 + i
            ]), (p) => {
                mp.labels.new("~w~Cantera\n~g~Utiliza ~y~/trabajo minero~g~ para obtener el trabajo.", puntos[i].posicion, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
            });
        }
    } catch (e) { }
});

mp.events.add("minero:parar_anim", () => {
    if (mineroIniciado) {
        mineroIniciado = false;
        mostrarAviso("info", 8000, "Puedes volver a picar presionando la tecla [J]");
    }
});

function crearTextlabelMinero() {
    if (!vehiculoMinero) return;

    let pos = vehiculoMinero.getWorldPositionOfBone(vehiculoMinero.getBoneIndexByName("indicator_lr"));
    textlabelMinero = mp.labels.new("~r~"+(4-trabajosRealizados)+"~w~ minerales restantes\nPresiona la tecla ~g~[J]\n~w~para dejar los minerales", pos, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
}

function mineroDeathHandle() {
    if (minero_cefId >= 0) {
        cef_minero.cerrarCef(minero_cefId, false);
        minero_cefId = -1;
    }

    mp.events.call("minero:acabar_trabajo");
}

/**
 * Funciones Vehiculo
 */
function entrarVehiculoMinero(vehicle) {
    if (vehiculoMinero == null) return;
    if (vehicle != vehiculoMinero) return;

    if (blipMinero != null) {
        if (mp.blips.exists(blipMinero))
            blipMinero.destroy();
        blipMinero = null;
    }

    enVehiculoMinero = true;

    if (textlabelMinero) {
        if (mp.labels.exists(textlabelMinero))
            textlabelMinero.destroy();
        textlabelMinero = null;
    }
}

function salirVehiculoMinero() {
    if (vehiculoMinero == null) return;
    if (!enVehiculoMinero) return;
    if (calcDist(player_local.position, new mp.Vector3(2772.5251, 2807.1536, 41.51105) < 6)) return; // Para evitar problemas con el punto final

    if (blipMinero) {
        blipMinero.setCoords(player_local.position);
    } else {
        blipMinero = mp.blips.new(1, player_local.position, { name: "Vehiculo Minero", scale: 1.0, color: 5});
    }

    enVehiculoMinero = false;

    if (trabajosRealizados > 0)
        crearTextlabelMinero();
}

/**
 * Funciones Colshapes
 */
function entrarColshapeInicialMinero(colshape) {
    if (colshape == colshapeMineroCantera && enVehiculoMinero) {
        //mp.gui.chat.push("!{red}[!] !{white}Presiona la tecla !{#03BEFC}[E] !{white}en la cantera para comenzar a picar minerales.")
        mostrarAviso("info", 7000, "Presiona la tecla [J] en la cantera para comenzar a picar minerales");

        puedeMinar = true;

        mp.events.remove("playerEnterColshape", entrarColshapeInicialMinero);
        mp.events.add("playerEnterColshape", entrarColshapeCanteraMinero);
        mp.events.add("playerExitColshape", salirColshapeCanteraMinero);
    }
}

function entrarColshapeCanteraMinero(colshape) {
    if (colshape == colshapeMineroCantera) {
        puedeMinar = true;
    } else if (colshape == colshapeMineroPed) {
        let pos = player_local.position;
        mp.gui.chat.push("!{yellow}Carlos Monterrey dice!{white}: Ay ay ay... Estoy bien cansado, wey...");
        setTimeout(() => {
            if (calcDist(player_local.position, pos) <= 3.0) {
                mp.gui.chat.push("!{yellow}Carlos Monterrey dice!{white}: ¿Eh? Escucha, " + player_local.name.split("("+player_local.remoteId+")")[0].split(" ")[0]+","+
                +" tú también estás bajo las órdenes del gringo del jefe, ¿wey?");

                setTimeout(() => {
                    if (calcDist(player_local.position, pos) <= 3.0) {
                        mp.gui.chat.push("!{yellow}Carlos Monterrey dice!{white}: Ay amigo... Yo dejaré este mamado trabajo bien pronto... Tú tienes cara de currar como un pinche negro de Grove."+
                        " Tome. No mame amigo. Si necesitas cualquier cosa, a mí no me digas. Estoy hasta el orto de problemas, wey.");

                        mp.events.callRemote("minero:easter_egg");
                    }
                }, 10000);
            }
        }, 10000);

        if (mp.colshapes.exists(colshapeMineroPed)) {
            colshapeMineroPed.destroy();
            colshapeMineroPed = null;
        }
    }
}

function salirColshapeCanteraMinero(colshape) {
    if (colshape == colshapeMineroCantera) {
        puedeMinar = false;
    }
}

/**
 * Funciones Teclas
 */
// J
function teclaJMinero() {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) return;
    if (enVehiculoMinero) return;
    if (!puedeMinar) return;

    if (!mineroIniciado) {
        mp.events.callRemote("minero:iniciar");
        mineroIniciado = true;
    }
    else {
        if (!tienePiedra) {
            if (trabajosRealizados >= 3) {
                mostrarAviso("info", 6000, "El camión está lleno, vuelve a la cantera para descargarlo");
                mp.game.ui.setNewWaypoint(2772.5251, 2807.1536);
                return;
            }
            if (textlabelMinero && calcDist(player_local.position, textlabelMinero.position) <= 1.5) {
                mostrarAviso("danger", 6000, "Debes picar minerales antes de poder cargarlos");
                return;
            }
            if (setFloodboton(1000, "FB40") == false) return;
            mp.events.callRemote("minero:iniciar");
        }
        else {
            if (textlabelMinero && calcDist(player_local.position, textlabelMinero.position) <= 1.5) {
                if (setFloodboton(1000, "FB40") == false) return;
                mp.events.callRemote("minero:quitar_mineral_pegado");
                tienePiedra = false;

                if (trabajosRealizados >= 3) {
                    mostrarAviso("info", 6000, "El camión está lleno, vuelve a la cantera para descargarlo");
                    mp.game.ui.setNewWaypoint(2772.5251, 2807.1536);
                }
                else {
                    mostrarAviso("success", 6000, "Puedes continuar picando o llevar los minerales a la cantera");
                }

                if (textlabelMinero) {
                    if (mp.labels.exists(textlabelMinero))
                        textlabelMinero.destroy();
                    textlabelMinero = null;
                }
            }
        }
    }
}
}