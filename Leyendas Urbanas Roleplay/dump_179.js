{
﻿/*
 * Descripcion: Contiene el menú para iniciar el trabajo o menu de trabajo de basurero
*/

let usuariosID = [];
let usuariosIDseleccionados = [];
let puntoRuta = new mp.Vector3(0.0, 0.0, 0.0);

let menuBasurero = null;
let menuTrabajoBasurero = null;
let menuUsuariosBasurero = null;

// Evento menu
mp.events.add("mostrar_basurero", function (vector3) {
    mostrar_basurero(vector3);
});

mp.events.add("trabajar_basurero", function () {
    if (menuAbierto == false) trabajar_basurero();
});

// Funcion para mostrar el menu de opciones trabajando
function mostrar_basurero(vector) {

    puntoRuta = vector;

    menuBasurero = crearMenu("Basurero", "Trabajo basurero opciones disponibles");
    menuBasurero.AddItem(new UIMenuItem("Recoger", "Recoge la basura del contenedor."));
    menuBasurero.AddItem(new UIMenuItem("Meter", "Metes la basura en tu camión."));
    menuBasurero.AddItem(new UIMenuItem("Ruta", "Marca la ruta que debes hacer."));
    menuBasurero.AddItem(new UIMenuItem("Cancelar", "Cancelas el trabajo actual."));
    menuBasurero.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuBasurero.ItemSelect.on((item, index) => {
        switch (index) {
            case 0: case 1: case 3:
                mp.events.callRemote("menu_basurero", index);
                break;
            case 2:
                mp.game.ui.setNewWaypoint(puntoRuta.x, puntoRuta.y);
                break;
            default:
                break;
        }

        menuBasurero?.Close();
    });

    menuBasurero.MenuClose.on(() => {
        menuBasurero = null;
    });
}

// Funcion para mostrar el menu de seleccion de trabajo
function trabajar_basurero() {
    usuariosIDseleccionados = [];

    menuTrabajoBasurero = crearMenuConDistancia(4, "Basurero", "Trabajo basurero elige el modo");
    menuTrabajoBasurero.AddItem(new UIMenuItem("Solo", "Realizarás una línea en solitario, deberás conducir y bajarte del camión para recoger la basura en los diferentes contenedores."));
    menuTrabajoBasurero.AddItem(new UIMenuItem("Acompañado", "Realizarás una línea acompañado, hasta un máximo de dos jugadores más podrán acompañarte para realizar la línea, de esta forma se dividen las tareas y ganareis más dinero por realizarla juntos."));
    menuTrabajoBasurero.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuTrabajoBasurero.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("trabajo_basurero", false, 0, 0);
                menuTrabajoBasurero?.Close();
                break;
            case 1:
                menuTrabajoBasurero?.Close(true);
                usuarios_basurero();
                break;
            default:
                menuTrabajoBasurero?.Close();
                break;
        }
    });

    menuTrabajoBasurero.MenuClose.on(() => {
        menu_con_distancia = null;
        menuTrabajoBasurero = null;
    });
}

// Funcion para mostrar el menu de seleccion de compañeros
function usuarios_basurero() {

    usuariosID = [];

    menuUsuariosBasurero = crearMenuConDistancia(4, "Basurero", "Trabajo basurero opciones disponibles");

    mp.players.forEachInStreamRange(function (player) {
        if (player != player_local) {
            if (calcDist(player_local.position, player.position) < 5.0) {
                let jugador = mp.controladorJugadores._jugadores[player.id];
                if (jugador) {
                    let listaTrabajos = jugador.trabajos;
                    let basurero = false;
                    for (tId of listaTrabajos) {
                        if (tId == 6) {
                            basurero = true;
                            break;
                        }
                    }

                    if (basurero) {
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
                            menuUsuariosBasurero.AddItem(item);
                        }
                        else {
                            menuUsuariosBasurero.AddItem(new UIMenuItem(obtenerNombreConocido(player), ""));
                        }

                        usuariosID.push(jugador.id_jugador);
                    }
                }
            }
        }
    });

    menuUsuariosBasurero.AddItem(new UIMenuItem("Comenzar", "Una vez marcados los usuarios con los que deseas realizar la ruta comienza dicha ruta."));
    menuUsuariosBasurero.AddItem(new UIMenuItem("Volver", "Cierra el menú actual"));

    menuUsuariosBasurero.ItemSelect.on((item, index) => {
        if (item.Text == "Volver") {
            menuUsuariosBasurero?.Close(true);
            trabajar_basurero();
        }
        else {
            if (index == usuariosID.length) {
                if (usuariosIDseleccionados.length > 0) {
                    if (usuariosIDseleccionados.length == 1)
                        mp.events.callRemote("trabajo_basurero", true, usuariosIDseleccionados[0], 0);
                    else
                        mp.events.callRemote("trabajo_basurero", true, usuariosIDseleccionados[0], usuariosIDseleccionados[1]);

                    menuUsuariosBasurero?.Close();
                }
                else {
                    mostrarAviso("danger", 8000, "Debes seleccionar al menos un compañero más con el que realizaras la ruta");
                    menuUsuariosBasurero?.Close(true);
                    usuarios_basurero();
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
                    menuUsuariosBasurero?.Close(true);
                    usuarios_basurero();
                }
            }
        }
    });

    menuUsuariosBasurero.MenuClose.on(() => {
        menu_con_distancia = null;
        menuUsuariosBasurero = null;
    });
}

}