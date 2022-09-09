{
/* --------------------------------------------------------------------------------
 * seguridad.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menus relacionados con los negocios de tipo "Empresas de seguridad"
 *
 * -------------------------------------------------------------------------------- */

//Variables especificas para el menu de seguridad
let seguridad_jugadorescerca;
let seguridad_alarma_idjugadorselecionado;
let seguridad_alarma_nivel;
let seguridad_cerradura_nivel;

mp.events.add({
    "seguridad:mostrar_menu": function () {
        mostrar_menu_seg();
    },
    "enviarPrecio_Alarma": function (precio_alarma) {
        if (!seguridad_alarma_preciopuesto) {
            mp.events.callRemote('seguridad:instalar_alarma', seguridad_alarma_idjugadorselecionado, seguridad_alarma_nivel, precio_alarma);
            seguridad_alarma_preciopuesto = true;
        }
    },
    "enviarPrecio_Cerradura": function (precio_cerradura) {
        if (!seguridad_cerradura_preciopuesto) {
            mp.events.callRemote('seguridad:instalar_puerta', seguridad_alarma_idjugadorselecionado, seguridad_cerradura_nivel, precio_cerradura);
            seguridad_cerradura_preciopuesto = true;
        }
    }
});

function mostrar_menu_seg() {

    menuSEG = crearMenu("Seguridad", " ");
    menuSEG.AddItem(new UIMenuItem("Equipar", "Equipar con sus respectivas categorias para las empresas de seguridad."));
    menuSEG.AddItem(new UIMenuItem("Instalar alarma", "Opción para instalar alarma en vehiculos, propiedades y negocios."));
    menuSEG.AddItem(new UIMenuItem("Mejorar cerradura", "Opción para mejorar la cerradura en vehiculos, propiedades y negocios."));
    menuSEG.AddItem(new UIMenuItem("Cachear", "Cachea al jugador seleccionado."));
    menuSEG.AddItem(new UIMenuItem("Esposar", "Esposa al jugador seleccionado."));
    menuSEG.AddItem(new UIMenuItem("Desesposar", "Desesposa al jugador seleccionado."));
    menuSEG.AddItem(new UIMenuItem("Montar detector", "Opción para montar el detector de metales."));
    menuSEG.AddItem(new UIMenuItem("Desmontar detector", "Opción para desmontar el detector de metales."));
    menuSEG.AddItem(new UIMenuItem("Skins", "Opción para elegir diferentes skins."));
    menuSEG.AddItem(new UIMenuListItem("~g~Colocar cono~w~", "Selecciona el cono que quieres colocar.", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7"])));
    menuSEG.AddItem(aplicarColores(new UIMenuItem("Quitar cono", "Elimina el cono más cercano a tu posicion."), "Rojo"));

    menuSEG.ItemSelect.on((item, index) => {

        if (item instanceof UIMenuListItem) {
            mp.events.callRemote("menuSEG_Conos", parseInt(item.SelectedItem.DisplayText));
        }
        else {
            switch (index) {
                case 0:
                    menuSEG?.Close(true);
                    mostrar_equipar_seg();
                    break;
                case 1:
                    menuSEG?.Close(true);
                    seguridad_jugadorescerca = 1;
                    evento_mostrar_jugadores_cerca();
                    break;
                case 2:
                    menuSEG?.Close(true);
                    seguridad_jugadorescerca = 2;
                    evento_mostrar_jugadores_cerca();
                    break;
                case 3:
                    menuSEG?.Close(true);
                    seguridad_jugadorescerca = 3;
                    evento_mostrar_jugadores_cerca();
                    break;
                case 4:
                    menuSEG?.Close(true);
                    seguridad_jugadorescerca = 4;
                    evento_mostrar_jugadores_cerca();
                    break;
                case 5:
                    menuSEG?.Close(true);
                    seguridad_jugadorescerca = 5;
                    evento_mostrar_jugadores_cerca();
                    break;
                case 6:
                    menuSEG?.Close();
                    mp.events.callRemote("menuSEG_comando_montardetector");
                    break;
                case 7:
                    menuSEG?.Close();
                    mp.events.callRemote("menuSEG_comando_desmontardetector");
                    break;
                case 8:
                    menuSEG?.Close(true);
                    mostrar_seguridad_skins();
                    break;
                case 10:
                    mp.events.callRemote("menuSEG_comando_qcono");
                    break;
            }
        }
    });

    menuSEG.MenuClose.on(item => {
        menuSEG = null;
    });
}

function evento_mostrar_jugadores_cerca() {

    let jugadores_proximos = [];

    menuSeguridadJugadores = crearMenu('Seguridad', 'Jugadores cercanos', true);
    mp.players.forEachInStreamRange(function (player) {
        if (player == player_local) return;

        let jugador = mp.controladorJugadores._jugadores[player.id];
        if (jugador) {
            let conectado = mp.controladorJugadores._jugadores[player.id].conectado;
            let oculto = mp.controladorJugadores._jugadores[player.id].oculto;

            if (conectado == true && oculto == false) {
                let dist = mp.game.gameplay.getDistanceBetweenCoords(player.position.x, player.position.y, player.position.z, player_local.position.x, player_local.position.y, player_local.position.z, true);

                if (dist <= 5.0) {
                    menuSeguridadJugadores.AddItem(new UIMenuItem(obtenerNombreConocido(player), ''));
                    jugadores_proximos.push(jugador.id_jugador);

                }
            }
        }
    });

    menuSeguridadJugadores.ItemSelect.on((item, index) => {
        menuSeguridadJugadores.setVisible(false);
        menuSeguridadJugadores = null;
        jugadorID = jugadores_proximos[index];
        switch (seguridad_jugadorescerca) {
            case 1:
                seguridad_alarma_idjugadorselecionado = jugadorID;
                mostrar_seguridad_nivel_alarma();
                break;
            case 2:
                seguridad_alarma_idjugadorselecionado = jugadorID;
                mostrar_seguridad_mejorar_cerradura();
                break;
            case 3:
                mp.events.callRemote('seguridad:jugadorescerca_cachear', jugadorID);
                break;
            case 4:
                mp.events.callRemote('menu:jugadorescerca_esposar', jugadorID);
                break;
            case 5:
                mp.events.callRemote('menu:jugadorescerca_desesposar', jugadorID);
                break;
        }
    });

    menuSeguridadJugadores.MenuClose.on(item => {
        mostrar_menu_seg();
        menuSeguridadJugadores = null;
    });
}

function mostrar_seguridad_nivel_alarma() {

    menuSEG_NIVEL_ALARMA = crearMenu("Nivel de alarma", " ", true);
    menuSEG_NIVEL_ALARMA.AddItem(new UIMenuItem("Nivel 0", " "));
    menuSEG_NIVEL_ALARMA.AddItem(new UIMenuItem("Nivel 1", " "));
    menuSEG_NIVEL_ALARMA.AddItem(new UIMenuItem("Nivel 2", " "));
    menuSEG_NIVEL_ALARMA.AddItem(new UIMenuItem("Nivel 3", " "));
    menuSEG_NIVEL_ALARMA.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    menuSEG_NIVEL_ALARMA.ItemSelect.on((item, index) => {
        menuSEG_NIVEL_ALARMA.setVisible(false);
        menuSEG_NIVEL_ALARMA = null;

        if (index < 4) {
            switch (index) {
                case 0:
                    seguridad_alarma_nivel = 0;
                    break;
                case 1:
                    seguridad_alarma_nivel = 1;
                    break;
                case 2:
                    seguridad_alarma_nivel = 2;
                    break;
                case 3:
                    seguridad_alarma_nivel = 3;
                    break;
            }

            if (seguridad_alarma_nivel != null) {
                seguridad_alarma_preciopuesto = false;
                mp.events.call("cantidad:mostrar", "enviarPrecio_Alarma", "Precio");
            }
        }

        // Volver
        if (index == 4) {
            evento_mostrar_jugadores_cerca();
        }
    });

    menuSEG_NIVEL_ALARMA.MenuClose.on(item => {
        evento_mostrar_jugadores_cerca();
        menuSEG_NIVEL_ALARMA = null;
    });
}

function mostrar_seguridad_mejorar_cerradura() {

    menuSEG_MEJORAR_CERRADURA = crearMenu("Nivel de cerradura", " ", true);
    menuSEG_MEJORAR_CERRADURA.AddItem(new UIMenuItem("Nivel 0", " "));
    menuSEG_MEJORAR_CERRADURA.AddItem(new UIMenuItem("Nivel 1", " "));
    menuSEG_MEJORAR_CERRADURA.AddItem(new UIMenuItem("Nivel 2", " "));
    menuSEG_MEJORAR_CERRADURA.AddItem(new UIMenuItem("Nivel 3", " "));
    menuSEG_MEJORAR_CERRADURA.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    menuSEG_MEJORAR_CERRADURA.ItemSelect.on((item, index) => {
        menuSEG_MEJORAR_CERRADURA.setVisible(false);
        menuSEG_MEJORAR_CERRADURA = null;

        if (index < 4) {
            switch (index) {
                case 0:
                    seguridad_cerradura_nivel = 0;
                    break;
                case 1:
                    seguridad_cerradura_nivel = 1;
                    break;
                case 2:
                    seguridad_cerradura_nivel = 2;
                    break;
                case 3:
                    seguridad_cerradura_nivel = 3;
                    break;
            }

            if (seguridad_cerradura_nivel != null) {
                seguridad_cerradura_preciopuesto = false;
                mp.events.call("cantidad:mostrar", "enviarPrecio_Cerradura", "Precio");
            }
        }

        // Volver
        if (index == 4) {
            evento_mostrar_jugadores_cerca();
        }
    });

    menuSEG_MEJORAR_CERRADURA.MenuClose.on(item => {
        evento_mostrar_jugadores_cerca();
        menuSEG_MEJORAR_CERRADURA = null;
    });
}

function mostrar_seguridad_skins() {

    menuSEG_SKINS = crearMenu("Skins", " ", true);
    menuSEG_SKINS.AddItem(new UIMenuItem("PERRO SECURITY", " "));
    menuSEG_SKINS.AddItem(new UIMenuItem("Chaleco negro", "PERRO SECURITY"));
    menuSEG_SKINS.AddItem(new UIMenuItem("Chaleco verde", "PERRO SECURITY"));
    menuSEG_SKINS.AddItem(new UIMenuItem("Chaleco rojo", "PERRO SECURITY"));
    menuSEG_SKINS.AddItem(new UIMenuItem("Chaleco azul", "PERRO SECURITY"));
    menuSEG_SKINS.AddItem(new UIMenuItem("Pelaje 1", "PERRO SECURITY"));
    menuSEG_SKINS.AddItem(new UIMenuItem("Pelaje 2", "PERRO SECURITY"));
    menuSEG_SKINS.AddItem(new UIMenuItem("Pelaje 3", "PERRO SECURITY"));
    menuSEG_SKINS.AddItem(new UIMenuItem("Pelaje 4", "PERRO SECURITY"));
    menuSEG_SKINS.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    menuSEG_SKINS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    menuSEG_SKINS.ItemSelect.on((item, index) => {

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("seguridad:menu_skins", (index + 1));
        }

        // Volver
        if (index == 10) {
            menuSEG_SKINS?.Close(true);
        }
    });

    menuSEG_SKINS.MenuClose.on(item => {
        mostrar_menu_seg();
        menuSEG_SKINS = null;
    });
}

function mostrar_equipar_seg() {

    equiparSEG = crearMenu("Equipar", "Seguridad", true);
    equiparSEG.AddItem(new UIMenuItem("Ropa", "Accedes a la categoria de ropa."));
    equiparSEG.AddItem(new UIMenuItem("Accesorios", "Accedes a la categoria de accesorios."));
    equiparSEG.AddItem(new UIMenuItem("Chalecos", "Accedes a la categoria de chalecos."));
    equiparSEG.AddItem(new UIMenuItem("Cascos/Gorras", "Accedes a la categoria de cascos y gorras."));
    equiparSEG.AddItem(new UIMenuItem("Guantes", "Accedes a la categoria de guantes."));
    equiparSEG.AddItem(new UIMenuItem("Equipamiento", "Accedes a la categoria de equipamiento."));
    equiparSEG.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    equiparSEG.ItemSelect.on((item, index) => {
        equiparSEG.setVisible(false, true);
        equiparSEG = null;
        switch (index) {
            case 0:
                mostrar_equipar_seg_ropa();
                break;
            case 1:
                mostrar_equipar_seg_accesorios();
                break;
            case 2:
                mostrar_equipar_seg_chalecos();
                break;
            case 3:
                mostrar_equipar_seg_cascos();
                break;
            case 4:
                mostrar_equipar_seg_guantes();
                break;
            case 5:
                mostrar_equipar_seg_equipamiento();
                break;
            case 6: // VOLVER
                mostrar_menu_seg();
                break;
        }
    });

    equiparSEG.MenuClose.on(item => {
        equiparSEG = null;
        mostrar_menu_seg();
    });
}

function mostrar_equipar_seg_ropa()
{
    let displaytext = "";

    equiparSEG_ROPA = crearMenu("Ropa", " ", true);
    // Si es del negocio de seguridad Falcon Security (549)
    if ((negociosJug).includes(549)) equiparSEG_ROPA.AddItem(new UIMenuListItem("Falcon Security", "Uniforme de uso exclusivo para la empresa de seguridad Falcon Security.", new ItemsCollection(["1", "2", "3", "4", "5"])));
    // Si es del negocio de seguridad Lock And Load Security (682)
    if ((negociosJug).includes(682)) equiparSEG_ROPA.AddItem(new UIMenuListItem("Lock And Load Security", "Uniformes de uso exclusivo para la empresa de seguridad Lock And Load Security.", new ItemsCollection(["1", "2", "3", "4", "5"])));
    // Si es del negocio de seguridad DeeJay Booking Security (849)
    if ((negociosJug).includes(849)) equiparSEG_ROPA.AddItem(new UIMenuListItem("DeeJay Booking Security", "Uniforme de uso exclusivo para la empresa de seguridad DeeJay Booking Security.", new ItemsCollection(["1", "2", "3", "4", "5"])));
    // Si es del negocio de seguridad Gruppe Sechs (898)
    if ((negociosJug).includes(898)) equiparSEG_ROPA.AddItem(new UIMenuListItem("Gruppe Sechs", "Uniforme de uso exclusivo para la empresa de seguridad Gruppe Sechs.", new ItemsCollection(["1", "2", "3", "4", "5"])));
    // Si es del negocio de seguridad Constellar, Inc (900)
    if ((negociosJug).includes(900)) equiparSEG_ROPA.AddItem(new UIMenuListItem("Constellar, Inc", "Uniforme de uso exclusivo para la empresa de seguridad Constellar, Inc.", new ItemsCollection(["1", "2", "3", "4", "5"])));
    // Si es del negocio de seguridad Buho Security (914)
    if ((negociosJug).includes(914)) equiparSEG_ROPA.AddItem(new UIMenuListItem("Buho Security", "Uniformes de uso exclusivo para la empresa de seguridad Buho Security.", new ItemsCollection(["1", "2", "3", "4", "5"])));
    // Si es del negocio de seguridad BOBCAT Security (NO HAY EMPRESA, POR LO QUE NO HAY LLAVE)
    if ((negociosJug).includes(823)) equiparSEG_ROPA.AddItem(new UIMenuListItem("BOBCAT Security", "Uniforme de uso exclusivo para la empresa de seguridad BOBCAT Security.", new ItemsCollection(["1", "2", "3", "4", "5"])));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa verde militar 1", "Uniforme con manga corta."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa verde militar 2", "Uniforme con manga larga."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa beis 1", "Uniforme con manga corta."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa beis 2", "Uniforme con manga larga."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa caqui 1", "Uniforme con manga corta."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa caqui 2", "Uniforme con manga larga."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa blanca 1", "Uniforme con manga corta."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa blanca 2", "Uniforme con manga larga."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa gris 1", "Uniforme con manga corta."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa gris 2", "Uniforme con manga larga."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa gris oscuro 1", "Uniforme con manga corta."));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Uniforme con camisa gris oscuro 2", "Uniforme con manga larga."));
    equiparSEG_ROPA.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    equiparSEG_ROPA.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    equiparSEG_ROPA.ItemSelect.on((item, index) =>
    {
        if (item.Text == "Volver")
        {
            equiparSEG_ROPA?.Close(true);
        }
        else
        {
            if (item instanceof UIMenuListItem) displaytext = item.SelectedItem.DisplayText;
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSEG_ROPA", item.Text, displaytext);
        }
    });

    equiparSEG_ROPA.MenuClose.on(item =>
    {
        mostrar_equipar_seg();
        equiparSEG_ROPA = null;
    });
}

function mostrar_equipar_seg_accesorios() {

    equiparSEG_ACCESORIOS = crearMenu("Accesorios", " ", true);
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(1)Pinganillo blanco oreja", " "));
    equiparSEG_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", " "), "Rojo"));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(2) BodyCam (Chaleco)", ""));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(2) Bolsa en espalda", " "));
    equiparSEG_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", " "), "Rojo"));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(3) Pernera con taser", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(3) Cinturón con taser", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(3) Cinturón holster", " "));
    equiparSEG_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", " "), "Rojo"));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturón holster", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Pernera con pistola", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturón con pistola", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturón con porra y radio en hombro", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturón con radio colgada en cinturon", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturón con radio en hombro", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturón con radio en el pecho ", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturón con varios compartimentos 1", " "));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturón con varios compartimentos 2", " "));
    equiparSEG_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (4)", " "), "Rojo"));
    equiparSEG_ACCESORIOS.AddItem(new UIMenuItem("(5) BodyCam (Uniforme)", ""));
    equiparSEG_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (5)", " "), "Rojo"));
    equiparSEG_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Volver", "Vuelve al menú anterior"), "Naranja"));

    equiparSEG_ACCESORIOS.ItemSelect.on((item, index) => {

        if (index < 21) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSEG_ACCESORIOS", (index + 1));
        }

        // Volver
        if (index == 21) {
            equiparSEG_ACCESORIOS?.Close(true);
        }
    });

    equiparSEG_ACCESORIOS.MenuClose.on(item => {
        mostrar_equipar_seg();
        equiparSEG_ACCESORIOS = null;
    });
}

function mostrar_equipar_seg_chalecos() {
    equiparSEG_CHALECOS = crearMenu("Chalecos", " ", true);
    equiparSEG_CHALECOS.AddItem(new UIMenuItem("Kevlar", " "));
    equiparSEG_CHALECOS.AddItem(new UIMenuItem("Ligero", " "));
    equiparSEG_CHALECOS.AddItem(new UIMenuItem("Semi-Pesado", " "));
    equiparSEG_CHALECOS.AddItem(aplicarColores(new UIMenuItem("Quitar", " "), "Rojo"));
    equiparSEG_CHALECOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparSEG_CHALECOS.ItemSelect.on((item, index) => {

        if (index < 4) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSEG_CHALECOS", (index + 1));
        }

        // Volver
        if (index == 4) {
            equiparSEG_CHALECOS?.Close(true);
        }
    });

    equiparSEG_CHALECOS.MenuClose.on(item => {
        mostrar_equipar_seg();
        equiparSEG_CHALECOS = null;
    });
}

function mostrar_equipar_seg_cascos() {

    equiparSEG_CASCOS = crearMenu("Gorras/Cascos", " ", true);
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Casco con micro", " "));
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Casco simple", " "));
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Casco antidisturbios", " "));
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra SECURITY", " "));
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra SECUROSERV", " "));
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica negra", " ")); // 0 - 142 - 0
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica gris", " ")); // 0 - 142 -  1
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica blanca", " ")); // 0 - 142 -  2
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica roja", " ")); // 0 - 142 -  3
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica azul", " ")); // 0 - 142 -  4
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica rosa", " ")); // 0 - 142 -  22
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica morada", " ")); // 0 - 142 -  23
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica naranja", " ")); // 0 - 142 -  24
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Gorra básica verde", " ")); // 0 - 142 -  25
    equiparSEG_CASCOS.AddItem(aplicarColores(new UIMenuItem("Quitar", "Te quitas el/la casco/gorra que llevas puesto."), "Rojo"));
    equiparSEG_CASCOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparSEG_CASCOS.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSEG_CASCOS", (index + 1));
        }

        // Volver
        if (index == 15) {
            equiparSEG_CASCOS?.Close(true);
        }
    });

    equiparSEG_CASCOS.MenuClose.on(item => {
        mostrar_equipar_seg();
        equiparSEG_CASCOS = null;
    });
}

function mostrar_equipar_seg_guantes() {

    equiparSEG_GUANTES = crearMenu("Guantes", " ", true);
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(1) Tácticos", "(Polo y camiseta)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(1) Anticorte", "(Polo y camiseta)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(1) Latex azules", "(Polo y camiseta)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(1) Gala", "(Polo y camiseta)"));
    equiparSEG_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", "(Polo y camiseta)"), "Rojo"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(2) Tácticos", "(Manga corta)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(2) Anticorte", "(Manga corta)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(2) Latex azules", "(Manga corta)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(2) Gala", "(Manga corta)"));
    equiparSEG_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", "(Manga corta)"), "Rojo"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(3) Tácticos", "(Manga larga)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(3) Anticorte", "(Manga larga)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(3) Latex azules", "(Manga larga)"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("(3) Gala", "(Manga larga)"));
    equiparSEG_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", "(Manga larga)"), "Rojo"));
    equiparSEG_GUANTES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparSEG_GUANTES.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSEG_GUANTES", (index + 1));
        }

        // Volver
        if (index == 15) {
            equiparSEG_GUANTES?.Close(true);
        }
    });

    equiparSEG_GUANTES.MenuClose.on(item => {
        mostrar_equipar_seg();
        equiparSEG_GUANTES = null;
    });
}

function mostrar_equipar_seg_equipamiento() {

    equiparSEG_EQUIPAMIENTO = crearMenu("Equipamiento", " ", true);
    EquipamientoOpcionItem = new UIMenuItem("Boton del pánico", "Compras un botón del pánico por el precio indicado."); // 1599
    EquipamientoOpcionItem.SetRightLabel("20.000$");
    equiparSEG_EQUIPAMIENTO.AddItem(EquipamientoOpcionItem);
    EquipamientoOpcionItem = new UIMenuItem("Maletín con alarma nivel 1", "Compras un maletín con una alarma de nivel 1 por el precio indicado."); // 1611
    EquipamientoOpcionItem.SetRightLabel("25.000$");
    equiparSEG_EQUIPAMIENTO.AddItem(EquipamientoOpcionItem);
    EquipamientoOpcionItem = new UIMenuItem("Maletín con alarma nivel 2", "Compras un maletín con una alarma de nivel 2 por el precio indicado."); // 1612
    EquipamientoOpcionItem.SetRightLabel("125.000$");
    equiparSEG_EQUIPAMIENTO.AddItem(EquipamientoOpcionItem);
    EquipamientoOpcionItem = new UIMenuItem("Maletín con alarma nivel 3", "Compras un maletín con una alarma de nivel 3 por el precio indicado."); // 1613
    EquipamientoOpcionItem.SetRightLabel("250.000$");
    equiparSEG_EQUIPAMIENTO.AddItem(EquipamientoOpcionItem);
    EquipamientoOpcionItem = new UIMenuItem("Maletín con cerradura nivel 1", "Compras un maletín con una cerradura de nivel 1 por el precio indicado."); // 1614
    EquipamientoOpcionItem.SetRightLabel("25.000$");
    equiparSEG_EQUIPAMIENTO.AddItem(EquipamientoOpcionItem);
    EquipamientoOpcionItem = new UIMenuItem("Maletín con cerradura nivel 2", "Compras un maletín con una cerradura de nivel 2 por el precio indicado."); // 1615
    EquipamientoOpcionItem.SetRightLabel("200.000$");
    equiparSEG_EQUIPAMIENTO.AddItem(EquipamientoOpcionItem);
    EquipamientoOpcionItem = new UIMenuItem("Maletín con cerradura nivel 3", "Compras un maletín con una cerradura de nivel 3 por el precio indicado."); // 1616
    EquipamientoOpcionItem.SetRightLabel("450.000$");
    equiparSEG_EQUIPAMIENTO.AddItem(EquipamientoOpcionItem);
    equiparSEG_EQUIPAMIENTO.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    equiparSEG_EQUIPAMIENTO.ItemSelect.on((item, index) => {

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSEG_EQUIPAMIENTO", (index + 1));
        }

        // Volver
        if (index == 7) {
            equiparSEG_EQUIPAMIENTO?.Close(true);
        }
    });

    equiparSEG_EQUIPAMIENTO.MenuClose.on(item => {
        mostrar_equipar_seg();
        equiparSEG_EQUIPAMIENTO = null;
    });
}

mp.events.add("alarmaOcerraduraInstalar:mostrar_trato", function (SQLIDJugador, SQLIDPJDestino, dinero, nivel, SQLIDVeh, SQLIDProp, SQLIDNeg, alarma_o_cerradura) {

    let alarmaOcerradura = "";
    switch (alarma_o_cerradura) {
        case 1:
            alarmaOcerradura = "alarma";
            break;
        case 2:
            alarmaOcerradura = "cerradura";
            break;
    }

    alarmaOcerraduraConfirmacion = crearMenu("Pagar", "Como desea realizar el pago de la " + alarmaOcerradura + ".");
    alarmaOcerraduraConfirmacion.AddItem(new UIMenuItem("Efectivo", "La " + alarmaOcerradura + " de nivel " + nivel + " tendrá un coste de " + dinero + "$."));
    alarmaOcerraduraConfirmacion.AddItem(new UIMenuItem("Cuenta bancaria", "La " + alarmaOcerradura + " de nivel " + nivel + " tendrá un coste de " + dinero + "$."));
    alarmaOcerraduraConfirmacion.AddItem(aplicarColores(new UIMenuItem("No quiero instalar la " + alarmaOcerradura + ".", " "), "Rojo"));

    alarmaOcerraduraConfirmacion.ItemSelect.on((item, index) => {
        alarmaOcerraduraConfirmacion?.Close();

        switch (index) {
            case 0: // PAGAR EN EFECTIVO
                switch (alarma_o_cerradura) {
                    case 1: // ALARMA
                        mp.events.callRemote('alarmaOcerraduraInstalar:aceptar_pago_alarma', SQLIDJugador, SQLIDPJDestino, dinero, nivel, SQLIDVeh, SQLIDProp, SQLIDNeg, 1);
                        break;
                    case 2: // CERRADURA
                        mp.events.callRemote('alarmaOcerraduraInstalar:aceptar_pago_cerradura', SQLIDJugador, SQLIDPJDestino, dinero, nivel, SQLIDVeh, SQLIDProp, SQLIDNeg, 1);
                        break;
                }
                break;
            case 1: // PAGAR CON CUENTA BANCARIA
                switch (alarma_o_cerradura) {
                    case 1: // ALARMA
                        mp.events.callRemote('alarmaOcerraduraInstalar:aceptar_pago_alarma', SQLIDJugador, SQLIDPJDestino, dinero, nivel, SQLIDVeh, SQLIDProp, SQLIDNeg, 2);
                        break;
                    case 2: // CERRADURA
                        mp.events.callRemote('alarmaOcerraduraInstalar:aceptar_pago_cerradura', SQLIDJugador, SQLIDPJDestino, dinero, nivel, SQLIDVeh, SQLIDProp, SQLIDNeg, 2);
                        break;
                }
                break;
            case 2:
                // Se cierra el menu
                break;
        }
    });

    alarmaOcerraduraConfirmacion.MenuClose.on(item => {
        alarmaOcerraduraConfirmacion = null;
    });
});
   

}