{
/*
 * Descripcion: Contiene el menú desaparecido en causas antinaturales de paramedico
*/

let opcion = 0;
let usuariosID = [];
let usuariosIDseleccionados = [];

let paramedico = null;
let menuUsuariosParamedico = null;

// Evento menu
mp.events.add("mostrar_paramedico", function () {
    mostrar_paramedico();
});

// Funcion para mostrar el menu de opciones trabajando
function mostrar_paramedico()
{
    let objetoMano = obtenerObjetoMano();
    let objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);

    opcion = 0;

    paramedico = crearMenu("Paramédico", "Trabajo paramédico opciones disponibles");
    if (objetoTipoEnMano == 126 || objetoTipoEnMano == 461) {
        paramedico.AddItem(new UIMenuItem("Curar", "Curaras a alguien que se encuentre cerca de ti"));
        paramedico.AddItem(new UIMenuItem("Reanimar", "Reanimaras a alguien que se encuentre cerca de ti"));
        paramedico.AddItem(new UIMenuItem("Desintoxicar", "Curas a alguien de sus adicciones derivadas de las drogas que se encuentre cerca de ti"));
    }
    else {
        paramedicoItem = aplicarColores(new UIMenuItem("Curar", "Necesitas tener un botiquín o una bolsa de primeros auxilios en tu mano para poder curar a otro jugador"), "Naranja");
        paramedicoItem.SetRightBadge(BadgeStyle.Lock);
        paramedico.AddItem(paramedicoItem);
        paramedicoItem = aplicarColores(new UIMenuItem("Reanimar", "Necesitas tener un botiquín o una bolsa de primeros auxilios en tu mano para poder reanimar a otro jugador"), "Naranja");
        paramedicoItem.SetRightBadge(BadgeStyle.Lock);
        paramedico.AddItem(paramedicoItem);
        paramedicoItem = aplicarColores(new UIMenuItem("Desintoxicar", "Necesitas tener un botiquín o una bolsa de primeros auxilios en tu mano para poder desintoxicar a otro jugador"), "Naranja");
        paramedicoItem.SetRightBadge(BadgeStyle.Lock);
        paramedico.AddItem(paramedicoItem);
    }
    paramedico.AddItem(new UIMenuItem("Botiquin", "Coges un botiquín de la ambulancia."));
    paramedico.AddItem(new UIMenuItem("Guantes medicos", "Te pones los guantes medicos."));
    paramedico.AddItem(new UIMenuItem("Quitar guantes", "Te quitas los guantes medicos."));
    paramedico.AddItem(new UIMenuItem("Ropa verano", "Te pones la ropa de verano, manga corta."));
    paramedico.AddItem(new UIMenuItem("Ropa invierno", "Te pones la ropa de invierno, chaqueta de manga larga."));
    paramedico.AddItem(new UIMenuItem("Acabar jornada", "Dejas de trabajar poniendote fuera de servicio, ya no recibiras mas avisos ni notificaciones del trabajo."));
    paramedico.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    paramedico.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            if (index > 2) {
                mp.events.callRemote("menu_paramedico", index, 0);
                paramedico?.Close();
            }
            else {
                if (objetoTipoEnMano == 126 || objetoTipoEnMano == 461)
                {
                    opcion = index;
                    paramedico?.Close(true);
                    usuarios_paramedico();
                }
                else {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }             
            }
        }
        else {
            paramedico?.Close();
        }
    });

    paramedico.MenuClose.on(() => {
        paramedico = null;
    });
}

// Funcion para mostrar el menu de seleccion de usuarios
function usuarios_paramedico() {

    usuariosID = [];
    usuariosIDseleccionados = [];
    menuUsuariosParamedico = crearMenuConDistancia(4, "Paramédico", "Trabajo paramédico opciones disponibles");

    mp.players.forEachInStreamRange(function (player) {
        if (player != player_local) {
            if (calcDist(player_local.position, player.position) < 3.5) {
                let jugador = mp.controladorJugadores._jugadores[player.id];
                if (jugador) {
                    let encontrado = false;
                    for (let i = 0, n = usuariosIDseleccionados.length; i < n; i++) {
                        if (usuariosIDseleccionados[i] == jugador.id_jugador) {
                            encontrado = true;
                            break;
                        }
                    }

                    if (!encontrado) {
                        menuUsuariosParamedico.AddItem(new UIMenuItem(obtenerNombreConocido(player), ""));
                        usuariosID.push(jugador.id_jugador);
                    }
                }
            }
        }
    });

    if (usuariosID.length <= 0) {
        menuUsuariosParamedico.AddItem(new UIMenuItem("Ningun usuario cercano", ""));
    }
    menuUsuariosParamedico.AddItem(new UIMenuItem("Volver", "Cierra el menú actual"));


    menuUsuariosParamedico.ItemSelect.on((item, index) => {
        if (item.Text == "Volver" || usuariosID.length <= 0) {
            menuUsuariosParamedico?.Close(true);
            mostrar_paramedico();
        }
        else {
            mp.events.callRemote("menu_paramedico", opcion, usuariosID[index]);
            menuUsuariosParamedico?.Close();
        }
    });

    menuUsuariosParamedico.MenuClose.on(() => {
        menu_con_distancia = null;

        menuUsuariosParamedico = null;
    });
}

}