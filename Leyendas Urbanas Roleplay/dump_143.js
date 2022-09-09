{
/* --------------------------------------------------------------------------------
 * menupd.js
 *
 * Autor: Drako
 *
 * Descripción: Menus relacionados con las facciones de PD y SD
 *
 * -------------------------------------------------------------------------------- */

//Variables especificas para el menu de seguridad
var pd_jugadorescerca;
var menupd_condena_idjugadorseleccionado;

mp.events.add({
    "PD:mostrar_menu": function () {
        mostrar_menu_pd();
    },
    "enviarTiempo_Arresto": function (condena) {
        mp.events.callRemote('menupdsd:tiempo_arresto', menupd_condena_idjugadorseleccionado, condena);           
    }    
});


function mostrar_menu_pd() {
    menuPD = crearMenu("Dpto de Justicia", " ");
    menuPD.AddItem(new UIMenuItem("Información", "Opciones relacionadas para obtener información sobre una persona o sobre la facción."));
    menuPD.AddItem(new UIMenuItem("Procesamiento", "Opciones relacionadas para el procesamiento de un detenido."));
    menuPD.AddItem(new UIMenuItem("Marcar", "Opciones disponibles para solicitar refuerzos."));
    // menuPD.AddItem(new UIMenuItem("Pinchos", "Opciones disponibles para colocar o quitar pinchos."));
    menuPD.AddItem(new UIMenuItem("Depósito", "Opciones para interactuar con el depósito."));
    menuPD.AddItem(new UIMenuItem("Extras", "Comandos extras."));
    menuPD.AddItem(new UIMenuItem("Cúpula", "Comandos para miembros de la cúpula de la facción."));
    // menuPD.AddItem(new UIMenuListItem("~g~Colocar cono~w~", "Selecciona el cono que quieres colocar.", new ItemsCollection(["1", "2", "3", "4", "5", "6"])));
    // menuPD.AddItem(aplicarColores(new UIMenuItem("Quitar cono", "Elimina el cono más cercano a tu posicion."), "Naranja"));
    if(player_local.vehicle){
        menuPD.AddItem(new UIMenuItem("ALPR", "Activa o desactiva el ALPR del vehículo."));
    }
    menuPD.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuPD.ItemSelect.on((item, index) => {
        if (item instanceof UIMenuListItem) {
            mp.events.callRemote("menuPD_Conos", parseInt(item.SelectedItem.DisplayText));
        }
        else {
            if (item.Text == "Cerrar") {
                menuPD?.Close();
            }
            else {
                switch (index) {
                    case 0:
                        menuPD?.Close(true);
                        mostrar_informacion_pd();
                        break;
                    case 1:
                        menuPD?.Close(true);
                        mostrar_procesamiento_pd();
                        break;
                    case 2:
                        menuPD?.Close(true);
                        mostrar_marcar_pd();
                        break;
                    // case 3:
                    //     menuPD.setVisible(false);
                    //     menuPD = null;
                    //     mostrar_pinchos_pd();
                    //     break;
                    case 3:
                        menuPD?.Close(true);
                        mostrar_deposito_pd();
                        break;
                    case 4:
                        menuPD?.Close(true);
                        mostrar_extras_pd();
                        break;
                    case 5:
                        menuPD?.Close(true);
                        mostrar_cupula_pd();
                        break;
                    // case 8:
                    //     mp.events.callRemote("menuSEG_comando_qcono");
                    //     break;
                    case 6:
                        if (setFloodboton(5000, "FB71") == false) {
                            mostrarAviso("danger", 5000, "Debes esperar almenos 5 segundos entre activar y desactivar el ALPR");
                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                            return;
                        }
                        menuPD?.Close();
                        mp.events.callRemote("menu_alpr");
                        break;
                    default:
                        break;
                }
            }
        }
    });

    menuPD.MenuClose.on(item => {
        menuPD = null;
    });
}

function evento_mostrar_jugadores_cerca() {
    let jugadores_proximos = [];

    menuPDJugadores = crearMenu('Dpto de justicia', 'Jugadores cercanos', true);
    mp.players.forEachInStreamRange(function (player) {
        if (player == player_local) return;

        let jugador = mp.controladorJugadores._jugadores[player.id];
        if (jugador) {
            let conectado = mp.controladorJugadores._jugadores[player.id].conectado;
            let oculto = mp.controladorJugadores._jugadores[player.id].oculto;

            if (conectado == true && oculto == false) {
                let dist = mp.game.gameplay.getDistanceBetweenCoords(player.position.x, player.position.y, player.position.z, player_local.position.x, player_local.position.y, player_local.position.z, true);

                if (dist <= 5.0) {
                    menuPDJugadores.AddItem(new UIMenuItem(obtenerNombreConocido(player), ''));
                    jugadores_proximos.push(jugador.id_jugador);

                }
            }
        }
    });

    menuPDJugadores.ItemSelect.on((item, index) => {
        menuPDJugadores.setVisible(false);
        menuPDJugadores = null;

        jugadorID = jugadores_proximos[index];
        switch (pd_jugadorescerca) {
            case 0:
                mp.events.callRemote('menuPD_cachear', jugadorID);
                break;
            case 1:
                mp.events.callRemote('menuPD_esposar', jugadorID);
                break;
            case 2:
                mp.events.callRemote('menuPD_desesposar', jugadorID);
                break;
            case 3:
                mp.events.callRemote('menuPD_CCS', jugadorID);
                break;
            case 4:
                menupd_condena_idjugadorseleccionado = jugadorID;
                mp.events.call("cantidad:mostrar", "enviarTiempo_Arresto", "Condena");
                break;
            case 5:
                mp.events.callRemote('menuPD_desarrestar', jugadorID);
                break;
            case 6:
                mp.events.callRemote('menuPD_quitararmas', jugadorID);
                break;
            case 7:
                mp.events.callRemote('menuPD_quitardrogas', jugadorID);
                break;
        }
    });

    menuPDJugadores.MenuClose.on(item => {
        mostrar_menu_pd();
        menuPDJugadores = null;
    });
}

function mostrar_procesamiento_pd() {
    procesamientoPD = crearMenu("Procesamiento", "Departamento de Justicia", true);
    procesamientoPD.AddItem(new UIMenuItem("Cachear", ""));
    procesamientoPD.AddItem(new UIMenuItem("Esposar", ""));
    procesamientoPD.AddItem(new UIMenuItem("Desesposar", ""));
    procesamientoPD.AddItem(new UIMenuItem("Comprobar cinturón", ""));
    procesamientoPD.AddItem(new UIMenuItem("Arrestar", ""));
    procesamientoPD.AddItem(new UIMenuItem("Desarrestar", ""));
    procesamientoPD.AddItem(new UIMenuItem("Quitar armas", ""));
    procesamientoPD.AddItem(new UIMenuItem("Quitar drogas", ""));
    procesamientoPD.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    procesamientoPD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                pd_jugadorescerca = 0;
                evento_mostrar_jugadores_cerca();
                break;
            case 1:
                pd_jugadorescerca = 1;
                evento_mostrar_jugadores_cerca();
                break;
            case 2:
                pd_jugadorescerca = 2;
                evento_mostrar_jugadores_cerca();
                break;
            case 3:
                pd_jugadorescerca = 3;
                evento_mostrar_jugadores_cerca();
                break;
            case 4:
                pd_jugadorescerca = 4;
                evento_mostrar_jugadores_cerca();
                break;
            case 5:
                pd_jugadorescerca = 5;
                evento_mostrar_jugadores_cerca();
                break;
            case 6:
                pd_jugadorescerca = 6;
                evento_mostrar_jugadores_cerca();
                break;
            case 7:
                pd_jugadorescerca = 7;
                evento_mostrar_jugadores_cerca();
                break;
            default:
                procesamientoPD?.Close(true);
                return;
        }

        procesamientoPD.setVisible(false, true);
        procesamientoPD = null;
    });

    procesamientoPD.MenuClose.on(item => {
        procesamientoPD = null;
        mostrar_menu_pd();
    });
}

function mostrar_informacion_pd() {
    informacionPD = crearMenu("Información", "Departamento de Justicia", true);
    informacionPD.AddItem(new UIMenuItem("Avisos", "Muestra los avisos pendientes."));
    informacionPD.AddItem(new UIMenuItem("Centralita", "Muestra las centralitas pendientes."));
    informacionPD.AddItem(new UIMenuItem("Miembros", "Muestra los miembros de la facción."));
    informacionPD.AddItem(new UIMenuItem("Rangos", "Muestra los rangos de la facción."));
    informacionPD.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    informacionPD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("menuPD_mostrar_avisos", index);
                break;
            case 1:
                mp.events.callRemote("menuPD_mostrar_centralita", index);
                break;
            case 2:
                mp.events.callRemote("menuPD_MIEMBROS", 1);
                break;
            case 3:
                mp.events.callRemote("menuPD_RANGOS", index);
                break;
            default:
                informacionPD?.Close(true);
                return;
        }

        informacionPD.setVisible(false);
        informacionPD = null;
    });

    informacionPD.MenuClose.on(item => {
        informacionPD = null;
        mostrar_menu_pd();
    });
}

function mostrar_marcar_pd() {
    marcarPD = crearMenu("Marcar", "Departamento de Justicia", true);
    marcarPD.AddItem(new UIMenuItem("Desactivar refuerzos", ""));
    marcarPD.AddItem(new UIMenuItem("Solicitar refuerzos de mi departamento", ""));
    marcarPD.AddItem(new UIMenuItem("Solicitar Grua", ""));
    marcarPD.AddItem(new UIMenuItem("Solicitar cuerpos médicos o bomberos", ""));
    marcarPD.AddItem(new UIMenuItem("Solicitar paramédico", ""));
    marcarPD.AddItem(new UIMenuItem("Solicitar departamento de justicia", ""));
    marcarPD.AddItem(new UIMenuItem("Solicitar FIB", ""));
    marcarPD.AddItem(aplicarColores(new UIMenuItem("Activar Botón del pánico", ""), "Rojo"));
    marcarPD.AddItem(aplicarColores(new UIMenuItem("Desactivar Botón del pánico", ""), "Rojo"));
    marcarPD.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    marcarPD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("evento_marcar_servidor", index);
                break;
            case 1:
                mp.events.callRemote("evento_marcar_servidor", index);
                break;
            case 2:
                mp.events.callRemote("evento_marcar_servidor", index);
                break;
            case 3:
                mp.events.callRemote("evento_marcar_servidor", index);
                break;
            case 4:
                mp.events.callRemote("evento_marcar_servidor", index);
                break;
            case 5:
                mp.events.callRemote("evento_marcar_servidor", index);
                break;
            case 6:
                mp.events.callRemote("evento_marcar_servidor", index);
                break;
            case 7:
                mp.events.callRemote("evento_marcar_servidor", index);
                break;
            case 8:
                mp.events.callRemote("menuPD_BPD", index);
                break;
            default:
                marcarPD?.Close(true);
                return;
        }

        marcarPD.setVisible(false);
        marcarPD = null;
    });

    marcarPD.MenuClose.on(item => {
        marcarPD = null;
        mostrar_menu_pd();
    });
}

function mostrar_deposito_pd() {
    depositoPD = crearMenu("Información", "Departamento de Justicia", true);
    depositoPD.AddItem(new UIMenuItem("Meter vehículos en el depósito", ""));
    depositoPD.AddItem(new UIMenuItem("Solicitar grua", "Coloca un cepo en el vehículo y llamas a una grua para que se lo lleve"));
    depositoPD.AddItem(new UIMenuItem("Anular grua", "Anula la petición de mecánico para llevarse el coche."));
    depositoPD.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    depositoPD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("menuPD_meterdeposito", index);
                break;
            case 1:
                mp.events.callRemote("menuPD_SolicitarGrua", index);
                break;
            case 2:
                mp.events.callRemote("menuPD_AnularGrua", index);
                break;
            default:
                depositoPD?.Close(true);
                return;
        }

        depositoPD.setVisible(false);
        depositoPD = null;
    });

    depositoPD.MenuClose.on(item => {
        depositoPD = null;
        mostrar_menu_pd();
    });
}

function mostrar_extras_pd() {
    extrasPD = crearMenu("Información", "Departamento de Justicia", true);
    extrasPD.AddItem(new UIMenuItem("Forzar puerta", "Coloca una carga explosiva con temporizador en la puerta de una propiedad"));
    extrasPD.AddItem(new UIMenuItem("Foco", "Enciende o apaga el foco del helicóptero"));
    extrasPD.AddItem(new UIMenuItem("Encender cámara del helicóptero", ""));
    extrasPD.AddItem(new UIMenuItem("Fibracam", "Introduces un cable de fibra óptica por debajo de la puerta de una propiedad para ver el contenido del interior."));
    extrasPD.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    extrasPD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mp.events.callRemote("menuPD_FP");
                break;
            case 1:
                mp.events.callRemote("menuPD_FOCO");
                break;
            case 2:
                mp.events.callRemote("menuPD_CAMARAHELI");
                break;
            case 3:
                mp.events.callRemote("menuPD_fibracam");
                break;
            default:
                extrasPD?.Close();
                return;
        }

        extrasPD.setVisible(false);
        extrasPD = null;
    });

    extrasPD.MenuClose.on(item => {
        extrasPD = null;
        mostrar_menu_pd();
    });
}

function mostrar_cupula_pd() {
    cupulaPD = crearMenu("Información", "Departamento de Justicia", true);
    cupulaPD.AddItem(new UIMenuItem("Estado Familia", "Permites o desactivas el uso del chat de tu facción"));
    cupulaPD.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    cupulaPD.ItemSelect.on((item, index) => {
        if (index == 0) {
            cupulaPD.setVisible(false);
            cupulaPD = null;

            mp.events.callRemote("menuPD_HFAMILIA");
        }
        else {
            cupulaPD?.Close(true);
        }
    });

    cupulaPD.MenuClose.on(item => {
        mostrar_menu_pd();
        cupulaPD = null;
    });
}

// function mostrar_pinchos_pd() {

//     mp.gui.cursor.visible = false;
//     mp.gui.chat.show(false);
//     menuAbierto = true;

//     cupulaPD = crearMenu("Información", "Departamento de Justicia");
//     cupulaPD.AddItem(new UIMenuItem("Colocar pinchos", ""));
//     cupulaPD.AddItem(new UIMenuItem("Quitar pinchos", ""));
//     cupulaPD.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

//     cupulaPD.ItemSelect.on((item, index) => {
//         cupulaPD.setVisible(false);
//         cupulaPD = null;
//         mp.gui.chat.show(true);
//         menuAbierto = false;
//         switch (index) {
//             case 0:
//                 mp.events.callRemote("menuPD_PINCHOS");
//                 break;
//             case 1:
//                 mp.events.callRemote("menuPD_QPINCHO");
//                 break;
//             case 2:
//                 // Volver
//                 mostrar_menu_pd();
//                 break;
//         }
//     });

//     cupulaPD.MenuClose.on(item => {
//         cupulaPD = null;
//         mostrar_menu_pd();
//     });
// }

}