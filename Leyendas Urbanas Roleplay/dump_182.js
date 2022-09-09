{
﻿/*
 * Descripcion: Contiene el menú para iniciar el trabajo o menu de trabajo de temporero
*/

let usuariosID = [];
let usuariosIDseleccionados = [];
let puntoRuta = new mp.Vector3(0.0, 0.0, 0.0);

let menuTemporero = null;
let menuTrabajoTemporero = null;
let menuUsuariosTemporero = null;

// Evento menu
mp.events.add("mostrar_temporero", function (vector3) {
    mostrar_temporero(vector3);
});

mp.events.add("trabajar_temporero", function () {
    trabajar_temporero();
});

// Funcion para mostrar el menu de opciones trabajando
function mostrar_temporero(vector) {
    puntoRuta = vector;

    menuTemporero = crearMenu("Recolector", "Trabajo recolector opciones disponibles");
    menuTemporero.AddItem(new UIMenuItem("Ruta", "Marca la ruta que debes hacer"));
    menuTemporero.AddItem(new UIMenuItem("Cancelar", "Cancelas el trabajo actual"));
    menuTemporero.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuTemporero.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("menu_temporero", index);
                break;
            case 1:
                mp.game.ui.setNewWaypoint(puntoRuta.x, puntoRuta.y);
                break;
            default:
                break;
        }

        menuTemporero?.Close();
    });

    menuTemporero.MenuClose.on(() => {
        menuTemporero = null;
    });
}

// Funcion para mostrar el menu de seleccion de trabajo
function trabajar_temporero() {

    usuariosIDseleccionados = [];

    menuTrabajoTemporero = crearMenuConDistancia(4, "Recolector", "Trabajo recolector elige el modo");
    menuTrabajoTemporero.AddItem(new UIMenuItem("Solo", "Realizaras una línea en solitario, deberás conducir y bajarte del tractor para recoger la fruta."));
    menuTrabajoTemporero.AddItem(new UIMenuItem("Acompañado", "Realizaras una línea acompañado, hasta un máximo de dos jugadores más podrán acompañarte para realizar la línea, de esta forma se dividen las tareas y ganareis más dinero por realizarla juntos."));
    menuTrabajoTemporero.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuTrabajoTemporero.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("trabajo_temporero", false, 0, 0);
                menuTrabajoTemporero?.Close();
                break;
            case 1:
                menuTrabajoTemporero?.Close(true);
                usuarios_temporero();
                break;
            default:
                menuTrabajoTemporero?.Close();
                break;
        }
    });

    menuTrabajoTemporero.MenuClose.on(() => {
        menu_con_distancia = null;

        menuTrabajoTemporero = null;
    });
}

// Funcion para mostrar el menu de seleccion de compañeros
function usuarios_temporero() {
    usuariosID = [];

    menuUsuariosTemporero = crearMenuConDistancia(4, "Recolector", "Trabajo recolector opciones disponibles");

    mp.players.forEachInStreamRange(function (player) {
        if (player != player_local) {
            if (calcDist(player_local.position, player.position) < 5.0) {
                let jugador = mp.controladorJugadores._jugadores[player.id];
                if (jugador) {
                    let listaTrabajos = jugador.trabajos;
                    let temporero = false;
                    for (tId of listaTrabajos) {
                        if (tId == 24) {
                            temporero = true;
                            break;
                        }
                    }

                    if (temporero) {
                        let encontrado = false;
                        for (let i = 0, n = usuariosIDseleccionados.length; i < n; i++) {
                            if (usuariosIDseleccionados[i] == jugador.id_jugador) {
                                encontrado = true;
                                break;
                            }
                        }

                        if (encontrado && !jugador.adminservicio) {
                            let item = new UIMenuItem(obtenerNombreConocido(player), "");
                            item.SetRightBadge(BadgeStyle.Tick);
                            menuUsuariosTemporero.AddItem(item);
                        }
                        else {
                            menuUsuariosTemporero.AddItem(new UIMenuItem(obtenerNombreConocido(player), ""));
                        }

                        usuariosID.push(jugador.id_jugador);
                    }
                }
            }
        }
    });

    menuUsuariosTemporero.AddItem(new UIMenuItem("Comenzar", "Una vez marcados los usuarios con los que deseas realizar la ruta comienza dicha ruta."));
    menuUsuariosTemporero.AddItem(new UIMenuItem("Volver", "Cierra el menú actual"));

    menuUsuariosTemporero.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            menuUsuariosTemporero?.Close(true);
            trabajar_temporero();
        }
        else {
            if (index == usuariosID.length) {
                if (usuariosIDseleccionados.length > 0) {
                    if (usuariosIDseleccionados.length == 1)
                        mp.events.callRemote("trabajo_temporero", true, usuariosIDseleccionados[0], 0);
                    else
                        mp.events.callRemote("trabajo_temporero", true, usuariosIDseleccionados[0], usuariosIDseleccionados[1]);

                    menuUsuariosTemporero?.Close();
                }
                else {
                    mostrarAviso("danger", 8000, "Debes seleccionar al menos un compañero más con el que realizaras la ruta");
                    menuUsuariosTemporero?.Close(true);
                    usuarios_temporero();
                }
            }
            else {
                if (usuariosIDseleccionados.length > 2) {
                    mostrarAviso("danger", 8000, "Puedes seleccionar máximo a dos compañeros");
                }
                else {
                    let encontrado = false;
                    for (let i = 0, n = usuariosIDseleccionados.length; i < n; i++) {
                        if (usuariosIDseleccionados[i] == usuariosID[index]) {
                            encontrado = true;
                            usuariosIDseleccionados.splice(i, 1);
                            break;
                        }
                    }

                    if (!encontrado) {
                        usuariosIDseleccionados.push(usuariosID[index]);
                    }
                    menuUsuariosTemporero?.Close(true);
                    usuarios_temporero();
                }
            }
        }
    });

    menuUsuariosTemporero.MenuClose.on(() => {
        menu_con_distancia = null;

        menuUsuariosTemporero = null;
    });
}

}