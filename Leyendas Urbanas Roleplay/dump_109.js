{
/**
 * lavanderia.js
 * 
 * DescripciÃ³n: Contiene el sistema del trabajo de lavanderia
 * 
 * Autor: FerniMoon y Dries
 */

let floodbotonLavanderia = 0;
var cef_lavanderia = require('./LURP/cef.js');
mp.game.streaming.requestAnimDict("anim@heists@box_carry@");

var celdas = {}; // Lista de celdas de la ruta

var lavadorasPosiciones = [ // Posiciones fijas de las lavadoras (asi evitamos que el sv tenga que mandarlas)
    { "pos_lavadora": new mp.Vector3(1764.652, 2583.693, 45.91769) },
    { "pos_lavadora": new mp.Vector3(1766.034, 2583.671, 45.91769) },
    { "pos_lavadora": new mp.Vector3(1767.408, 2583.642, 45.91769) },
    { "pos_lavadora": new mp.Vector3(1768.763, 2583.694, 45.91769) },
    { "pos_lavadora": new mp.Vector3(1770.082, 2583.713, 45.91769) },
    { "pos_lavadora": new mp.Vector3(1771.393, 2583.719, 45.91769) },
];
var lavadoras = {}; // Lista de lavadoras
var blipZonaLavadoras = null;

var blipFinal = null;
var markerFinal = null;

/*
 * estadoRuta
 * 0 -> Esta recogiendo
 * 1 -> Tiene que ir a lavadoras
 * 2 -> Esta entregando
 * 3 -> Job acabado
 */
var estadoRuta = -1;
var celda_actual = null; // ID de la celda actual
var puedeUsarE = false;
var number = 0;
var cuentaRecoger = -1; // Cuantos puntos quedan por recoger
var cuentaEntregar = -1; // Cuantos puntos quedan por entregar

var lavanderia_cefId = -1;

// Posiciones puertas, para crear colshapes y recargar animaciones al cruzarlas
var colshapePosiciones = [
    { "colshape_pos": new mp.Vector3(1765.6396, 2566.7234, 45.615013) },
    { "colshape_pos": new mp.Vector3(1761.3224, 2578.5254, 45.91767) },
    { "colshape_pos": new mp.Vector3(1691.5999, 2566.605, 45.574196) },
    { "colshape_pos": new mp.Vector3(1678.9265, 2568.8962, 45.58875) },
    { "colshape_pos": new mp.Vector3(1702.437, 2568.8787, 45.58875) },
];
var colshapes_creadas_lavanderia = [];

mp.events.add("lavanderia:empezar", (celdas_string) => {
    let jsonCeldas = JSON.parse(celdas_string);

    cuentaRecoger = 10;
    cuentaEntregar = 10;

    mp.events.add("playerDeath", lavanderiaDeathHandle);
    mp.events.add("playerExitColshape", salirColshapePuertaLavanderia);

    // Creamos marker, textLabel y blip en cada celda
    let i = number;
    jsonCeldas.forEach(function (obj) {
        // Creamos marker, textLabel y blip de cada celda
        let markerCelda = mp.markers.new(20, obj, 0.50,
            {
                color: [0, 120, 255, 255],
                visible: true,
                dimension: 0
            });
        let textlabelCelda = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~recoger~w~ la ropa", obj, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
        let blipCelda = mp.blips.new(1, obj, { name: "Ruta lavandería", scale: 1.0, color: 5 });

        // Creamos objeto ropa sucia de cada celda
        let getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(obj.x, obj.y, obj.z + 0.10, parseFloat(0), false);
        let objetoTemp = mp.game.object.createObject(452397669, obj.x, obj.y, getGroundZ, false, true, true); // p_t_shirt_pile_s

        celdas[i] = {
            id: i,
            posicion: obj,
            marcador: markerCelda,
            textlabel: textlabelCelda,
            objeto: objetoTemp,
            blip: blipCelda,
            recoger: false,
            entregar: false
        };
        i++;
    });

    crear_colshapes_lavanderia();

    estadoRuta = 0;
    puedeUsarE = true;
    mostrarAviso("info", 7000, "Se te ha entregado una cesta, puedes ir al punto que quieras, pero recuerda pasar por todos");

    mp.events.add("lavanderia:finalizar", () => {
        for (let id in lavadoras) {
            if (lavadoras[id].marcador != null && mp.markers.exists(lavadoras[id].marcador)){
                lavadoras[id].marcador.destroy();
                lavadoras[id].marcador = null;
            }

            if (lavadoras[id].textlabel != null && mp.labels.exists(lavadoras[id].textlabel)) {
                lavadoras[id].textlabel.destroy();
                lavadoras[id].textlabel = null;
            }
        }

        for (let id in celdas) {
            if (celdas[id].marcador != null && mp.markers.exists(celdas[id].marcador)){
                celdas[id].marcador.destroy();
                celdas[id].marcador = null;
            }

            if (celdas[id].textlabel != null && mp.labels.exists(celdas[id].textlabel)) {
                celdas[id].textlabel.destroy();
                celdas[id].textlabel = null;
            }

            if (celdas[id].blip != null && mp.blips.exists(celdas[id].blip)) {
                celdas[id].blip.destroy();
                celdas[id].blip = null;
            }

            if (celdas[id].objeto != null) {
                mp.game.object.deleteObject(celdas[id].objeto);
                celdas[id].objeto = null;
            }
        }

        if (blipFinal != null && mp.blips.exists(blipFinal))
            blipFinal.destroy();

        if (markerFinal != null && mp.markers.exists(markerFinal))
            markerFinal.destroy();

        blipFinal = markerFinal = null;

        borrar_colshapes_lavanderia();

        estadoRuta = -1;
        puedeUsarE = false;
        lavadoras = {}
        celdas = {}
        colshapes_creadas_lavanderia = [];

        // Borramos todos los eventos creados para trabajar, dejando así sus funciones sin referencias (son limpiadas de memoria al no tener referencias)
        mp.events.remove("playerDeath", lavanderiaDeathHandle);
        mp.events.remove("playerExitColshape", salirColshapePuertaLavanderia);
        mp.events.remove("lavanderia:siguiente:recoger");
        mp.events.remove("lavanderia:siguiente:entregar");
        mp.events.remove("lavanderia:cef:abrir");
        mp.events.remove("lavanderia:cef:fin");
        mp.events.remove("lavanderia:no_objeto_mano");
        mp.events.remove("lavanderia:mostrar_lavanderia");
        mp.events.remove("lavanderia:seleccionar_menu");
        // Borramos bindeo para evitar comprobaciones sin sentido cuando el usuario no está en el trabajo (función limpiada de memoria al no tener referencias)
        mp.keys.unbind(0x47, true, teclaGLavanderia);
    });

    mp.events.add("lavanderia:siguiente:recoger", () => {
        /*
        * Recoge la ropa sucia de celda_actual
        */
        if (celda_actual != null) {
            celdas[celda_actual].recoger = true;
            if (celdas[celda_actual].marcador != null && mp.markers.exists(celdas[celda_actual].marcador)) {
                celdas[celda_actual].marcador.destroy();
                celdas[celda_actual].marcador = null;
            }

            if (celdas[celda_actual].textlabel != null && mp.labels.exists(celdas[celda_actual].textlabel)) {
                celdas[celda_actual].textlabel.destroy();
                celdas[celda_actual].textlabel = null;
            }

            if (celdas[celda_actual].blip != null && mp.blips.exists(celdas[celda_actual].blip)) {
                celdas[celda_actual].blip.destroy();
                celdas[celda_actual].blip = null;
            }

            // Borramos el objeto de ropa sucia que acaba de recoger
            if (celdas[celda_actual].objeto != null) {
                mp.game.object.deleteObject(celdas[celda_actual].objeto);
                celdas[celda_actual].objeto = null;
            }

            cuentaRecoger--;
            if (cuentaRecoger == 0) { // Ultimo punto de recogida --> Creamos puntos lavadoras
                // Creamos marker y textLabel en cada lavadora
                let i = number;
                lavadorasPosiciones.forEach(function (obj) {
                    let markerLav = mp.markers.new(20, obj.pos_lavadora, 0.50,
                        {
                            color: [0, 120, 255, 255],
                            visible: true,
                            dimension: 0
                        });
                    let textlabelLav = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~meter~w~ la ropa", obj.pos_lavadora, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });

                    lavadoras[i] = {
                        id: i,
                        posicion: obj.pos_lavadora,
                        marcador: markerLav,
                        textlabel: textlabelLav
                    };
                    i++;
                });

                blipZonaLavadoras = mp.blips.new(1, new mp.Vector3(1767.943, 2583.698, 45.91769), { name: "Ruta lavandería", scale: 1.0, color: 5 });

                mp.events.callRemote("lavanderia_cambio_tarea");
                estadoRuta = 1;
                mostrarAviso("info", 6000, "Has acabado de recoger la ropa sucia, dirigete a las lavadoras");
            } else {
                mostrarAviso("info", 4000, "Puedes seguir con otra celda");
            }
            puedeUsarE = true;
        }
    });

    mp.events.add("lavanderia:siguiente:entregar", () => {
        /*
         * Entrega la ropa limpia en celda_actual
         */
        if (celda_actual != null) {
            celdas[celda_actual].entregar = true;
            if (celdas[celda_actual].marcador != null && mp.markers.exists(celdas[celda_actual].marcador)) {
                celdas[celda_actual].marcador.destroy();
                celdas[celda_actual].marcador = null;
            }

            if (celdas[celda_actual].textlabel != null && mp.labels.exists(celdas[celda_actual].textlabel)) {
                celdas[celda_actual].textlabel.destroy();
                celdas[celda_actual].textlabel = null;
            }

            if (celdas[celda_actual].blip != null && mp.blips.exists(celdas[celda_actual].blip)) {
                celdas[celda_actual].blip.destroy();
                celdas[celda_actual].blip = null;
            }

            // Creamos el objeto de ropa limpia que acaba de entregar
            if (celdas[celda_actual].objeto == null) {
                let getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(celdas[celda_actual].posicion.x, celdas[celda_actual].posicion.y, celdas[celda_actual].posicion.z + 0.10, parseFloat(0), false);
                let objetoTemp = mp.game.object.createObject(3246710738, celdas[celda_actual].posicion.x, celdas[celda_actual].posicion.y, getGroundZ, false, true, true); // prop_cs_t_shirt_pile
                celdas[celda_actual].objeto = objetoTemp;
            }

            cuentaEntregar--;
            if (cuentaEntregar == 0) { // Ultimo punto de recogida -- ruta acabada
                mp.events.callRemote("lavanderia_final");

                estadoRuta = 3;
                if (blipFinal != null && mp.blips.exists(blipFinal))
                    blipFinal.destroy();

                if (markerFinal != null && mp.markers.exists(markerFinal))
                    markerFinal.destroy();

                blipFinal = markerFinal = null;

                blipFinal = mp.blips.new(1, new mp.Vector3(1766.758, 2581.16, 45.91773), { name: "Fin de ruta", scale: 1.0, color: 5 });
                markerFinal = mp.markers.new(20, new mp.Vector3(1766.758, 2581.16, 45.91773 + 0.15), 2,
                    {
                        color: [255, 153, 0, 200],
                        visible: true,
                        dimension: 0
                    });
                mostrarAviso("info", 6000, "Has acabado el servicio, vuelve a la lavandería a dejar la cesta");
            } else {
                mostrarAviso("info", 4000, "Puedes seguir con otra celda");
            }
            puedeUsarE = true;
        }
    });

    mp.events.add("lavanderia:cef:abrir", () => {
        if (!hudOculto) {
            mp.events.call("hud:estado_hud");
            mp.game.ui.displayRadar(false);
            mp.game.ui.displayHud(false);
            mp.gui.chat.show(false);
        }

        if (lavanderia_cefId < 0) {
            lavanderia_cefId = cef_lavanderia.crearCef("package://LURP/cef/lavanderia/lavanderia.html", {
                puedeCerrar: false,
                mostrarCursor: true
            });
        }
    });

    mp.events.add("lavanderia:cef:fin", () => {
        /*
        * Ha acabado de lavar la ropa, ahora le mandamos a entregarla de vuelta celda por celda
        */
        if (lavanderia_cefId >= 0) {
            cef_lavanderia.cerrarCef(lavanderia_cefId, false);
            lavanderia_cefId = -1;
        }

        if (hudOculto)
            mp.events.call("hud:estado_hud");

        // Borramos lavadoras, ya no se necesitan
        for (let id in lavadoras) {
            if (lavadoras[id].marcador != null && mp.markers.exists(lavadoras[id].marcador)) {
                lavadoras[id].marcador.destroy();
                lavadoras[id].marcador = null;
            }

            if (lavadoras[id].textlabel != null && mp.labels.exists(lavadoras[id].textlabel)) {
                lavadoras[id].textlabel.destroy();
                lavadoras[id].textlabel = null;
            }
        }

        if (blipZonaLavadoras != null && mp.blips.exists(blipZonaLavadoras)) {
            blipZonaLavadoras.destroy();
            blipZonaLavadoras == null;
        }

        // Volvemos a crear blips, marker y textlabel, de las celdas, solo les queda entregar la ropa limpia
        for (let id in celdas) {
            if (celdas[id].marcador == null && !mp.markers.exists(celdas[id].marcador)) {
                let nuevoMarkerCelda = mp.markers.new(20, celdas[id].posicion, 0.50,
                    {
                        color: [0, 120, 255, 255],
                        visible: true,
                        dimension: 0
                    });
                celdas[id].marcador = nuevoMarkerCelda;
            }

            if (celdas[id].textlabel == null && !mp.labels.exists(celdas[id].textlabel)) {
                let nuevoTextLabelCelda = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~entregar~w~ la ropa", celdas[id].posicion, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
                celdas[id].textlabel = nuevoTextLabelCelda;
            }

            if (celdas[id].blip == null && !mp.blips.exists(celdas[id].blip)) {
                let nuevoBlipCelda = mp.blips.new(1, celdas[id].posicion, { name: "Ruta lavandería", scale: 1.0, color: 5 });
                celdas[id].blip = nuevoBlipCelda;
            }
        }

        mp.events.callRemote("lavanderia_cambio_tarea");

        puedeUsarE = true;
        estadoRuta = 2;
        mostrarAviso("info", 8000, "Ya puedes volver por cada celda a devolver la ropa limpia");
    });

    mp.events.add("lavanderia:no_objeto_mano", () => {
        if (estadoRuta == 0 || estadoRuta == 1)
            mostrarAviso("info", 5000, "Debes tener la cesta en la mano");
        if (estadoRuta == 2)
            mostrarAviso("info", 5000, "Debes tener la pila de ropa en la mano");

        puedeUsarE = true;
    });

    mp.events.add("lavanderia:mostrar_lavanderia", () => {
        switch (estadoRuta) {
            case 0:
                mp.events.call("mostrar_lavanderia", cuentaRecoger); // Indicamos al menu que tiene que recoger X puntos
                break;
            case 1:
                mp.events.call("mostrar_lavanderia", -1); // Indicamos al menu que tiene que ir a lavadoras
                break;
            case 2:
                mp.events.call("mostrar_lavanderia", cuentaEntregar); // Indicamos al menu que tiene que entregar X puntos
                break;
            case 3:
                if (blipFinal != null && mp.blips.exists(blipFinal))
                    blipFinal.destroy();

                if (markerFinal != null && mp.markers.exists(markerFinal))
                    markerFinal.destroy();

                blipFinal = markerFinal = null;

                blipFinal = mp.blips.new(1, new mp.Vector3(1766.758, 2581.16, 45.91773), { name: "Fin de ruta", scale: 1.0, color: 5 });
                markerFinal = mp.markers.new(20, new mp.Vector3(1766.758, 2581.16, 45.91773 + 0.15), 2,
                    {
                        color: [255, 153, 0, 200],
                        visible: true,
                        dimension: 0
                    });

                mostrarAviso("info", 6000, "Has acabado el servicio, vuelve a la lavandería para dejar todo");
                break;
        }
    });

    mp.events.add("lavanderia:seleccionar_menu", (index) => {
        switch (index) {
            case 1:
                marcarPuntosActuales();
                break;
            case 2:
                if (estadoRuta == 0 || estadoRuta == 2) { // Cancela mientras le quedan puntos por recoger o entregar
                    for (let id in celdas) {
                        if (celdas[id].marcador != null && mp.markers.exists(celdas[id].marcador)) {
                            celdas[id].marcador.destroy();
                            celdas[id].marcador = null;
                        }

                        if (celdas[id].textlabel != null && mp.labels.exists(celdas[id].textlabel)) {
                            celdas[id].textlabel.destroy();
                            celdas[id].textlabel = null;
                        }

                        if (celdas[id].blip != null && mp.blips.exists(celdas[id].blip)) {
                            celdas[id].blip.destroy();
                            celdas[id].blip = null;
                        }

                        if (celdas[id].objeto != null) {
                            mp.game.object.deleteObject(celdas[id].objeto);
                            celdas[id].objeto = null;
                        }
                    }
                }
                if (estadoRuta == 1) { // Cancela sin acabar de lavar la ropa
                    for (let id in lavadoras) {
                        if (lavadoras[id].marcador != null && mp.markers.exists(lavadoras[id].marcador)) {
                            lavadoras[id].marcador.destroy();
                            lavadoras[id].marcador = null;
                        }

                        if (lavadoras[id].textlabel != null && mp.labels.exists(lavadoras[id].textlabel)) {
                            lavadoras[id].textlabel.destroy();
                            lavadoras[id].textlabel = null;
                        }
                    }

                    if (blipZonaLavadoras != null && mp.blips.exists(blipZonaLavadoras)) {
                        blipZonaLavadoras.destroy();
                        blipZonaLavadoras = null;
                    }
                }

                mp.events.callRemote("cancelar_lavanderia");

                if (blipFinal != null && mp.blips.exists(blipFinal))
                    blipFinal.destroy();

                if (markerFinal != null && mp.markers.exists(markerFinal))
                    markerFinal.destroy();

                blipFinal = markerFinal = null;

                blipFinal = mp.blips.new(1, new mp.Vector3(1766.758, 2581.16, 45.91773), { name: "Fin de ruta", scale: 1.0, color: 5 });
                markerFinal = mp.markers.new(20, new mp.Vector3(1766.758, 2581.16, 45.91773 + 0.15), 2,
                    {
                        color: [255, 153, 0, 200],
                        visible: true,
                        dimension: 0
                    });
                mostrarAviso("info", 6000, "Vuelve a la lavanderí­a a dejar la cesta");

                cuentaRecoger = cuentaEntregar = 0;
                estadoRuta = 3; // job acabado (cancelado)
                break;
        }
    });

    mp.keys.bind(0x47, true, teclaGLavanderia);
});

function lavanderiaDeathHandle() {
    if (lavanderia_cefId >= 0) {
        cef_lavanderia.cerrarCef(lavanderia_cefId, false);
        lavanderia_cefId = -1;
    }

    mp.events.call("lavanderia:finalizar");
    mp.events.callRemote("lavanderia_muerte");
}

function marcarPuntosActuales() {
    switch (estadoRuta) {
        case 0: // recoger
            for (let id in celdas) {
                if (celdas[id].recoger == false) { // Evitamos generar los puntos por los que ya ha pasado
                    if (celdas[id].marcador != null && mp.markers.exists(celdas[id].marcador)) {
                        celdas[id].marcador.destroy();
                        celdas[id].marcador = null;
                    }

                    if (celdas[id].textlabel != null && mp.labels.exists(celdas[id].textlabel)) {
                        celdas[id].textlabel.destroy();
                        celdas[id].textlabel = null;
                    }

                    if (celdas[id].blip != null && mp.blips.exists(celdas[id].blip)) {
                        celdas[id].blip.destroy();
                        celdas[id].blip = null;
                    }

                    let markerCelda = mp.markers.new(20, celdas[id].posicion, 0.50,
                        {
                            color: [0, 120, 255, 255],
                            visible: true,
                            dimension: 0
                        });
                    let textlabelCelda = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~recoger~w~ la ropa", celdas[id].posicion, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
                    let blipCelda = mp.blips.new(1, celdas[id].posicion, { name: "Ruta lavanderia", scale: 1.0, color: 5 });

                    celdas[id].marcador = markerCelda;
                    celdas[id].textlabel = textlabelCelda;
                    celdas[id].blip = blipCelda;
                }
            }
            break;
        case 1: // lavadoras
            for (let id in lavadoras) {
                if (lavadoras[id].marcador != null && mp.markers.exists(lavadoras[id].marcador)) {
                    lavadoras[id].marcador.destroy();
                    lavadoras[id].marcador = null;
                }

                if (lavadoras[id].textlabel != null && mp.labels.exists(lavadoras[id].textlabel)) {
                    lavadoras[id].textlabel.destroy();
                    lavadoras[id].textlabel = null;
                }

                let markerLav = mp.markers.new(20, lavadoras[id].posicion, 0.50,
                    {
                        color: [0, 120, 255, 255],
                        visible: true,
                        dimension: 0
                    });
                let textlabelLav = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~meter~w~ la ropa", lavadoras[id].posicion, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
                lavadoras[id].marcador = markerLav;
                lavadoras[id].textlabel = textlabelLav;
            }

            if (blipZonaLavadoras != null && mp.blips.exists(blipZonaLavadoras)) {
                blipZonaLavadoras.destroy();
                blipZonaLavadoras = null;
            }

            blipZonaLavadoras = mp.blips.new(1, new mp.Vector3(1767.943, 2583.698, 45.91769), { name: "Ruta lavandería", scale: 1.0, color: 5 });
            break;
        case 2: // entregar
            for (let id in celdas) {
                if (celdas[id].entregar == false) { // Evitamos generar los puntos por los que ya ha pasado
                    if (celdas[id].marcador != null && mp.markers.exists(celdas[id].marcador)) {
                        celdas[id].marcador.destroy();
                        celdas[id].marcador = null;
                    }

                    if (celdas[id].textlabel != null && mp.labels.exists(celdas[id].textlabel)) {
                        celdas[id].textlabel.destroy();
                        celdas[id].textlabel = null;
                    }

                    if (celdas[id].blip != null && mp.blips.exists(celdas[id].blip)) {
                        celdas[id].blip.destroy();
                        celdas[id].blip = null;
                    }

                    let markerCelda = mp.markers.new(20, celdas[id].posicion, 0.50,
                        {
                            color: [0, 120, 255, 255],
                            visible: true,
                            dimension: 0
                        });
                    let textlabelCelda = mp.labels.new("Presiona la tecla ~g~[G]\n~w~para ~r~entregar~w~ la ropa", celdas[id].posicion, { los: false, font: 6, drawDistance: 5.0, color: [255, 255, 255, 255], dimension: 0 });
                    let blipCelda = mp.blips.new(1, celdas[id].posicion, { name: "Ruta lavandería", scale: 1.0, color: 5 });

                    celdas[id].marcador = markerCelda;
                    celdas[id].textlabel = textlabelCelda;
                    celdas[id].blip = blipCelda;
                }
            }
            break;
        case 3: // job acabado
            if (blipFinal != null && mp.blips.exists(blipFinal))
                blipFinal.destroy();

            if (markerFinal != null && mp.markers.exists(markerFinal))
                markerFinal.destroy();

            blipFinal = markerFinal = null;

            blipFinal = mp.blips.new(1, new mp.Vector3(1766.758, 2581.16, 45.91773), { name: "Fin de ruta", scale: 1.0, color: 5 });
            markerFinal = mp.markers.new(20, new mp.Vector3(1766.758, 2581.16, 45.91773 + 0.15), 2,
                {
                    color: [255, 153, 0, 200],
                    visible: true,
                    dimension: 0
                });

            mostrarAviso("info", 6000, "Has acabado el servicio, vuelve a la lavandería para dejar todo");
            break;
    }
}

/*
 * Funciones colshapes (para recargar animacion al cruzar puertas)
 */
// Crea colshapes para volver a poner animación al cruzar puertas
function crear_colshapes_lavanderia() {
    let i = 0;
    let size = 2.5;
    colshapePosiciones.forEach(function (obj) {
        if (obj.colshape_pos.x == 1678.9265 || obj.colshape_pos.x == 1702.437)
            size = 4;
        else
            size = 2.5;
        let colshapeTemp = mp.colshapes.newSphere(obj.colshape_pos.x, obj.colshape_pos.y, obj.colshape_pos.z, size, 0)
        colshapes_creadas_lavanderia[i] = colshapeTemp;
        i++;
    });
}

// Elimina colshape creadas
function borrar_colshapes_lavanderia() {
    if (colshapes_creadas_lavanderia != null && colshapes_creadas_lavanderia.length > 0) {
        for (let i = 0; i < colshapes_creadas_lavanderia.length; i++) {
            let colshapeTemp = colshapes_creadas_lavanderia[i];
            if (colshapeTemp !== undefined && colshapeTemp != null && mp.colshapes.exists(colshapeTemp)) {
                colshapeTemp.destroy();
                colshapeTemp = null;
            }
        }
    }
}

// Establece animación al salir del colshape de una puerta
function salirColshapePuertaLavanderia(shape) {
    for (let i = 0; i < colshapes_creadas_lavanderia.length; i++) {
        let colshapeTemp = colshapes_creadas_lavanderia[i];
        if (shape == colshapeTemp) {
            mp.players.local.taskPlayAnim("anim@heists@box_carry@", "idle", 8.0, 1.0, -1, 49, 0, false, false, false) // 49 -> Se suman flags deseados
            break;
        }
    }
}

function teclaGLavanderia() {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (cantidad_cefs > 0) return;
    if (player_local.vehicle) return;
    if (!puedeUsarE) return;
    if (floodbotonLavanderia == 0) {
        floodbotonLavanderia = 1;
        crearTimeout(function () {
            floodbotonLavanderia = 0;
        }, 1000);

        switch (estadoRuta) {
            case 0:
                if (Object.keys(celdas).length <= 0) return;
                for (let id in celdas) {
                    if (celdas[id].recoger == false && calcDist(player_local.position, celdas[id].posicion) <= 2.0) {
                        mp.events.callRemote("lavanderia_e"); //recoger
                        celda_actual = celdas[id].id;
                        puedeUsarE = false;
                        break;
                    }
                }
                // En caso de no estar cerca de ningún punto le avisamos
                if (puedeUsarE) mostrarAviso("info", 6000, "Te falta pasar por alguna celda, dirígete a ella para recoger la ropa sucia");
                break;
            case 1:
                if (Object.keys(lavadoras).length <= 0) return;
                for (let id in lavadoras) {
                    if (calcDist(player_local.position, lavadoras[id].posicion) <= 1.0) {
                        mp.events.callRemote("lavanderia_e");
                        mp.events.call("lavanderia:cef:abrir");
                        puedeUsarE = false;
                        break;
                    }
                }
                // En caso de no estar cerca de alguna lavadora le notificamos por si acaso
                if (puedeUsarE) mostrarAviso("info", 6000, "Dirigete a la lavandería para usar una de las lavadoras");
                break;
            case 2:
                if (Object.keys(celdas).length <= 0) return;
                for (let id in celdas) {
                    if (celdas[id].entregar == false && calcDist(player_local.position, celdas[id].posicion) <= 2.0) {
                        mp.events.callRemote("lavanderia_e"); // entregar
                        celda_actual = celdas[id].id;
                        puedeUsarE = false;
                        break;
                    }
                }
                // En caso de no estar cerca de ningún punto le avisamos
                if (puedeUsarE) mostrarAviso("info", 6000, "Te falta pasar por alguna celda, dirígete a ella para entregar la ropa limpia");
                break;
            case 3:
                if (blipFinal != null && mp.blips.exists(blipFinal))
                    blipFinal.destroy();

                if (markerFinal != null && mp.markers.exists(markerFinal))
                    markerFinal.destroy();

                blipFinal = markerFinal = null;

                blipFinal = mp.blips.new(1, new mp.Vector3(1766.758, 2581.16, 45.91773), { name: "Fin de ruta", scale: 1.0, color: 5 });
                markerFinal = mp.markers.new(20, new mp.Vector3(1766.758, 2581.16, 45.91773 + 0.15), 2,
                    {
                        color: [255, 153, 0, 200],
                        visible: true,
                        dimension: 0
                    });

                mostrarAviso("info", 6000, "Has acabado el servicio, vuelve a la lavandería para dejar todo");
                break;
        }
    }
}
}