{
/* --------------------------------------------------------------------------------
 * sanidad -> negocios.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menus relacionados con los negocios de tipo "Sanidad"
 *
 * -------------------------------------------------------------------------------- */

/*
 *      VARIABLES 
 */

// Variable que guarda el menu de los jugadores cercanos cuando se pulsa una opcion que lo usa
let menuSanidadNegJugadores;

// Variable que se usa como objeto para mandar el conjunto que hay que ponerle al servidor
let equipar;

// Guardamos en variables las ropas y texturas que tiene puesta
let DefaultRopa11;
let DefaultTextureRopa11;
let DefaultRopa10;
let DefaultTextureRopa10;
let DefaultRopa9;
let DefaultTextureRopa9;
let DefaultRopa8;
let DefaultRopa7;
let DefaultTextureRopa7;
let DefaultRopa5;
let DefaultTextureRopa5;
let DefaultRopa4;
let DefaultRopaTexture4;
let DefaultRopa3;
let DefaultRopa1;
let DefaultAccesorio1;
let DefaultAccesorioTexture1;
let DefaultAccesorio0;
let DefaultAccesorioTexture0;

// Variables para los CheckBox
let uniformeInviernoAzulPuesto;
let uniformeVeranoAzulPuesto;
let uniformeInviernoVerdePuesto;
let uniformeVeranoVerdePuesto;
let guantesMangaLargaPuesto;
let guantesMangaCortaPuesto;
let guantesCamisetasPuesto;
let cascoBasicoPuesto;
let cascoAntidisturbiosPuesto;
let gorraAzulPuesta;
let gorraVerdePuesta;
let gafasNegrasPuesta;
let gafasBlancasPuesta;
let pinganilloPuesto;
let estetoscopioPuesto;
let identificacionPuesto;
let bolsa0EspaldaPuesta;
let bolsa1EspaldaPuesta;
let bolsa2EspaldaPuesta;
let bolsa3EspaldaPuesta;
let bolsa4EspaldaPuesta;
let bolsa5EspaldaPuesta;
let bolsa6EspaldaPuesta;
let bolsa7EspaldaPuesta;
let bolsa8EspaldaPuesta;
let bolsa9EspaldaPuesta;
let radioCinturonWalkiePuesto;
let radioCinturonRadioPuesto;
let radioCinturonRadioHombroPuesto;
let chalecoPuestoVerde;
let chalecoPuestoRojo;
let decals1Puesto;
let decals2Puesto;
let decals3Puesto;

// Variable para guardar el genero
let genero = -1;

// Variable para cada chexbock
let item1;
let item2;
let item3;
let item4;
let item5;
let item6;
let item7;
let item8;
let item9;
let item10;
let item11;
let item12;
let item13;
let item14;
let item15;
let item16;
let item17;
let item18;
let item19;
let item20;
let item21;
let item22;
let item23;
let item24;
let item25;
let item26;
let item27;
let item28;
let item29;
let item30;
let item31;
let item32;
let item33;
let item34;
let item35;

/*
 *      EVENTOS 
 */

mp.events.add({
    "negocioSanidad:mostrar_menu": function () {
        mostrar_menu_sanidad_neg();
    },
    "negocioSanidad:refrescarCheckeds": function () {
        refrescarCheckedRopayAccesoriosPuestos();
    }
});



/*
 *      FUNCIONES
 */

function mostrar_menu_sanidad_neg() {

    let objetoMano = obtenerObjetoMano();
    let objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);

    menuSanidad = crearMenu("Sanidad", "Menu para negocios sanitarios");
    menuSanidad.AddItem(new UIMenuItem("Equipar", "Accedes al equipar para los negocios de sanidad"));
    // Si lleva puesta la bolsa abierta, le mostraremos una opción para permitirle cerrarla
    if (player_local.getDrawableVariation(5) == 81) {
        item31 = new UIMenuItem("Cerrar bolsa", "Cierra la bolsa que llevas en la espalda");
        menuSanidad.AddItem(item31);
    }
    // Si lleva puesta la bolsa abierta, le mostraremos una opción para permitirle cerrarla
    if (player_local.getDrawableVariation(5) == 82) {

        item31 = new UIMenuItem("Abrir bolsa", "Abre la bolsa que llevas en la espalda");
        menuSanidad.AddItem(item31);
    }
    if (objetoTipoEnMano == 126 || objetoTipoEnMano == 461)
    {
        menuSanidad.AddItem(new UIMenuItem("Curar", "Curaras a alguien que se encuentre cerca de ti"));
        menuSanidad.AddItem(new UIMenuItem("Reanimar", "Reanimaras a alguien que se encuentre cerca de ti"));
        menuSanidad.AddItem(new UIMenuItem("Desintoxicar", "Curas a alguien de sus adicciones derivadas de las drogas que se encuentre cerca de ti"));
    }
    else
    {
        menuSanidadItem = aplicarColores(new UIMenuItem("Curar", "Necesitas tener un botiquín o una bolsa de primeros auxilios en tu mano para poder curar a otro jugador"), "Naranja");
        menuSanidadItem.SetRightBadge(BadgeStyle.Lock);
        menuSanidad.AddItem(menuSanidadItem);
        menuSanidadItem = aplicarColores(new UIMenuItem("Reanimar", "Necesitas tener un botiquín o una bolsa de primeros auxilios en tu mano para poder reanimar a otro jugador"), "Naranja");
        menuSanidadItem.SetRightBadge(BadgeStyle.Lock);
        menuSanidad.AddItem(menuSanidadItem);
        menuSanidadItem = aplicarColores(new UIMenuItem("Desintoxicar", "Necesitas tener un botiquín o una bolsa de primeros auxilios en tu mano para poder desintoxicar a otro jugador"), "Naranja");
        menuSanidadItem.SetRightBadge(BadgeStyle.Lock);
        menuSanidad.AddItem(menuSanidadItem);
    }
    menuSanidad.AddItem(new UIMenuItem("Botiquin", "Coges un botiquín y lo agarras en la mano"));
    menuSanidad.AddItem(new UIMenuListItem("Colocar cono", "Selecciona el cono que quieres colocar", new ItemsCollection(["1", "2", "3", "4"])));
    menuSanidad.AddItem(new UIMenuItem("Quitar cono", "Elimina el cono más cercano a tu posicion"));
    menuSanidad.AddItem(new UIMenuItem("Acabar jornada", "Dejas de trabajar poniendote fuera de servicio, ya no recibiras mas avisos ni notificaciones del trabajo"));
    menuSanidad.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    menuSanidad.ItemSelect.on((item, index) => {

        switch (item.Text) {
            case "Equipar":
                menuSanidad?.Close(true);
                mostrar_equipar_sanidad_neg();
                break;

            case "Cerrar bolsa":
                item31.Text = ("Abrir bolsa"); 
                item31.Description = "Abre la bolsa que llevas en la espalda";
                mp.events.callRemote("negocioSanidad:AlternarEstadoBolsa", 82, player_local.getTextureVariation(5));
                break;

            case "Abrir bolsa":
                item31.Text = ("Cerrar bolsa");
                item31.Description = "Cierra la bolsa que llevas en la espalda";
                mp.events.callRemote("negocioSanidad:AlternarEstadoBolsa", 81, player_local.getTextureVariation(5));
                break;

            case "Curar":
                if (objetoTipoEnMano == 126 || objetoTipoEnMano == 461) {
                    menuSanidad?.Close(true);
                    mostrar_jugadores_cerca("Curar");
                }
                else {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                break;

            case "Reanimar":
                if (objetoTipoEnMano == 126 || objetoTipoEnMano == 461) {
                    menuSanidad?.Close(true);
                    mostrar_jugadores_cerca("Reanimar");
                }
                else {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                break;

            case "Desintoxicar":
                if (objetoTipoEnMano == 126 || objetoTipoEnMano == 461) {
                    menuSanidad?.Close(true);
                    mostrar_jugadores_cerca("Desintoxicar");
                }
                else {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                break;

            case "Botiquin":
                mp.events.callRemote("negocioSanidad:Coger_botiquin");
                break;

            case "Colocar cono":
                mp.events.callRemote("negocioSanidad:Poner_cono", parseInt(item.SelectedItem.DisplayText));
                break;

            case "Quitar cono":
                mp.events.callRemote("negocioSanidad:Quitar_cono");
                break;

            case "Acabar jornada":
                menuSanidad?.Close();
                mp.events.callRemote("negocioSanidad:Acabar_jornada");
                break;

            case "Cerrar":
                menuSanidad?.Close();
                break;
        }
    });

    menuSanidad.MenuClose.on(item => {
        menuSanidad = null;
    });
}


function mostrar_jugadores_cerca(opcion) {

    let jugadores_proximos = [];

    menuSanidadNegJugadores = crearMenu('Sanidad', 'Jugadores cercanos', true);
    mp.players.forEachInStreamRange(function (player) {
        if (player == player_local) return;
        let jugador = mp.controladorJugadores._jugadores[player.id];
        if (jugador) {
            let conectado = mp.controladorJugadores._jugadores[player.id].conectado;
            let oculto = mp.controladorJugadores._jugadores[player.id].oculto;

            if (conectado == true && oculto == false) {
                let dist = mp.game.gameplay.getDistanceBetweenCoords(player.position.x, player.position.y, player.position.z, player_local.position.x, player_local.position.y, player_local.position.z, true);

                if (dist <= 2.0) {
                    menuSanidadNegJugadores.AddItem(new UIMenuItem(obtenerNombreConocido(player), ''));
                    jugadores_proximos.push(jugador.id_jugador);

                }
            }
        }
    });

    if (jugadores_proximos.length <= 0)
    {
        OpcionItem = aplicarColores(new UIMenuItem("Ningún jugador cerca", "No estás cerca de ningún jugador"), "Naranja");
        OpcionItem.SetRightBadge(BadgeStyle.Lock);
        menuSanidadNegJugadores.AddItem(OpcionItem);
    }

    menuSanidadNegJugadores.ItemSelect.on((item, index) => {
        menuSanidadNegJugadores.setVisible(false);
        menuSanidadNegJugadores = null;
        jugadorID = jugadores_proximos[index];

        if (item.Text == "Ningún jugador cerca")
        {
            mostrarAviso("danger", 5000, "No estás cerca de ningún jugador al que " + opcion);
            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
            return;
        }

        switch (opcion) {
            case "Curar": // Curar
                mp.events.callRemote("negocioSanidad:Curar", jugadorID);
                break;
            case "Reanimar": // Reanimar
                mp.events.callRemote("negocioSanidad:Reanimar", jugadorID);
                break;
            case "Desintoxicar": // Desintoxicar
                mp.events.callRemote("negocioSanidad:Desintoxicar", jugadorID);
                break;
        }
    });

    menuSanidadNegJugadores.MenuClose.on(item => {
        mostrar_menu_sanidad_neg();
    });
}


function mostrar_equipar_sanidad_neg() {

    menuSanidad_EQUIPAR = crearMenu("Equipar", "Sanidad", true);

    menuSanidad_EQUIPAR.AddItem(aplicarColores(new UIMenuItem("Ayuda", "El número a la izquierda de cada opción indica la categoria a la que pertenece. No se podrán tener 2 prendas de forma simultanea de la misma categoria"), "Amarillo"));

    item1 = new UIMenuCheckboxItem("(1) Uniforme invierno azul", uniformeInviernoAzulPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item1);

    item2 = new UIMenuCheckboxItem("(1) Uniforme verano azul", uniformeVeranoAzulPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item2);

    item3 = new UIMenuCheckboxItem("(1) Uniforme invierno verde", uniformeInviernoVerdePuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item3);

    item4 = new UIMenuCheckboxItem("(1) Uniforme verano verde", uniformeVeranoVerdePuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item4);

    item5 = new UIMenuCheckboxItem("(2) Guantes médicos (Manga larga)", guantesMangaLargaPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item5);

    item6 = new UIMenuCheckboxItem("(2) Guantes médicos (Manga corta)", guantesMangaCortaPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item6);

    item7 = new UIMenuCheckboxItem("(2) Guantes médicos (Camisetas)", guantesCamisetasPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item7);

    item8 = new UIMenuCheckboxItem("(3) Casco básico", cascoBasicoPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item8);

    item9 = new UIMenuCheckboxItem("(3) Casco antidisturbios", cascoAntidisturbiosPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item9);

    item10 = new UIMenuCheckboxItem("(3) Gorra azul", gorraAzulPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item10);

    item11 = new UIMenuCheckboxItem("(3) Gorra verde", gorraVerdePuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item11);

    item12 = new UIMenuCheckboxItem("(4) Gafas negras", gafasNegrasPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item12);

    item13 = new UIMenuCheckboxItem("(4) Gafas blancas", gafasBlancasPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item13);

    item14 = new UIMenuCheckboxItem("(5) Pinganillo", pinganilloPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item14);

    item15 = new UIMenuCheckboxItem("(6) Estetoscopio", estetoscopioPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item15);

    item16 = new UIMenuCheckboxItem("(6) Identificación", identificacionPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item16);

    item17 = new UIMenuCheckboxItem("(7) Bolsa negra", bolsa0EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item17);

    item18 = new UIMenuCheckboxItem("(7) Bolsa azul oscuro", bolsa1EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item18);

    item19 = new UIMenuCheckboxItem("(7) Bolsa amarilla", bolsa2EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item19);

    item20 = new UIMenuCheckboxItem("(7) Bolsa roja", bolsa3EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item20);

    item21 = new UIMenuCheckboxItem("(7) Bolsa verde", bolsa4EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item21);

    item22 = new UIMenuCheckboxItem("(7) Bolsa naranja", bolsa5EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item22);

    item23 = new UIMenuCheckboxItem("(7) Bolsa morado", bolsa6EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item23);

    item24 = new UIMenuCheckboxItem("(7) Bolsa rosa", bolsa7EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item24);

    item25 = new UIMenuCheckboxItem("(7) Bolsa azul y rojo", bolsa8EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item25);

    item26 = new UIMenuCheckboxItem("(7) Bolsa azul y amarilla", bolsa9EspaldaPuesta, " ");
    menuSanidad_EQUIPAR.AddItem(item26);

    item27 = new UIMenuCheckboxItem("(8) Cinturón con walkie", radioCinturonWalkiePuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item27);

    item28 = new UIMenuCheckboxItem("(8) Cinturón con radio", radioCinturonRadioPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item28);

    item29 = new UIMenuCheckboxItem("(8) Cinturon radio hombro", radioCinturonRadioHombroPuesto, " ");
    menuSanidad_EQUIPAR.AddItem(item29);

    item30 = new UIMenuCheckboxItem("(9) Chaleco verde", chalecoPuestoVerde, " ");
    menuSanidad_EQUIPAR.AddItem(item30);

    item32 = new UIMenuCheckboxItem("(9) Chaleco rojo", chalecoPuestoRojo, " ");
    menuSanidad_EQUIPAR.AddItem(item32);

    item33 = new UIMenuCheckboxItem("(10) Decal 1", decals1Puesto, " ");
    menuSanidad_EQUIPAR.AddItem(item33);

    item34 = new UIMenuCheckboxItem("(10) Decal 2", decals2Puesto, " ");
    menuSanidad_EQUIPAR.AddItem(item34);

    item35 = new UIMenuCheckboxItem("(10) Decal 3", decals3Puesto, " ");
    menuSanidad_EQUIPAR.AddItem(item35);

    refrescarCheckedRopayAccesoriosPuestos();

    menuSanidad_EQUIPAR.CheckboxChange.on((item, state) => {
        switch (item.Text) {

            case "Ayuda":
                break;

            case "(1) Uniforme invierno azul":
                if (!state) { // Quitar
                    uniformeInviernoAzulPuesto = false;
                    if (!(uniformeVeranoAzulPuesto == true || uniformeInviernoVerdePuesto == true || uniformeVeranoVerdePuesto == true)) mp.events.callRemote("negocioSanidad:aplicar_vestirse");
                }
                else { // Poner
                    uniformeInviernoAzulPuesto = true;
                    equipar = null;
                    if (genero == 0) // Hombre
                    {
                        equipar = {
                            ropa11: 249,
                            texturaRopa11: 0,

                            ropa10: 57,
                            texturaRopa10: 0,

                            ropa9: 0,
                            texturaRopa9: 0,

                            ropa8: 71,
                            texturaRopa8: 3,

                            ropa7: 0,
                            texturaRopa7: 0,

                            ropa6: 25,
                            texturaRopa6: 0,

                            ropa5: 0,
                            texturaRopa5: 0,

                            ropa4: 96,
                            texturaRopa4: 0,

                            ropa3: 4,
                            texturaRopa3: 0,

                            ropa1: 0,
                            texturaRopa1: 0,

                            accesorio1: player_local.getPropIndex(1),
                            texturaAccesorio1: player_local.getPropTextureIndex(1),

                            accesorio0: player_local.getPropIndex(0),
                            texturaAccesorio0: player_local.getPropTextureIndex(0)
                        };
                    }
                    else // Mujer
                    {
                        equipar = {
                            ropa11: 257,
                            texturaRopa11: 0,

                            ropa10: 65,
                            texturaRopa10: 0,

                            ropa9: 9,
                            texturaRopa9: 0,

                            ropa8: 14,
                            texturaRopa8: 0,

                            ropa7: 0,
                            texturaRopa7: 0,

                            ropa6: 25,
                            texturaRopa6: 0,

                            ropa5: 0,
                            texturaRopa5: 0,

                            ropa4: 99,
                            texturaRopa4: 0,

                            ropa3: 3,
                            texturaRopa3: 0,

                            ropa1: 0,
                            texturaRopa1: 0,

                            accesorio1: player_local.getPropIndex(1),
                            texturaAccesorio1: player_local.getPropTextureIndex(1),

                            accesorio0: player_local.getPropIndex(0),
                            texturaAccesorio0: player_local.getPropTextureIndex(0)
                        };
                    }

                    if (uniformeVeranoAzulPuesto == true) {
                        item2.Checked = false;
                        uniformeVeranoAzulPuesto = false;
                    }
                    if (uniformeInviernoVerdePuesto == true) {
                        item3.Checked = false;
                        uniformeInviernoVerdePuesto = false;
                    }
                    if (uniformeVeranoVerdePuesto == true) {
                        item4.Checked = false;
                        uniformeVeranoVerdePuesto = false;
                    }

                    mp.events.callRemote("negocioSanidad:confimar_ropa", JSON.stringify(equipar));
                }
            break;
            case "(1) Uniforme verano azul":
                if (!state) { // Quitar
                    uniformeVeranoAzulPuesto = false;
                    if (!(uniformeVeranoAzulPuesto == true || uniformeInviernoVerdePuesto == true || uniformeVeranoVerdePuesto == true)) mp.events.callRemote("negocioSanidad:aplicar_vestirse");
                }
                else { // Poner
                    uniformeVeranoAzulPuesto = true;
                    equipar = null;

                    if (genero == 0) // Hombre
                    {
                        equipar = {
                            ropa11: 250,
                            texturaRopa11: 0,

                            ropa10: 58,
                            texturaRopa10: 0,

                            ropa9: 0,
                            texturaRopa9: 0,

                            ropa8: 15,
                            texturaRopa8: 0,

                            ropa7: 0,
                            texturaRopa7: 0,

                            ropa6: 25,
                            texturaRopa6: 0,

                            ropa5: 0,
                            texturaRopa5: 0,

                            ropa4: 96,
                            texturaRopa4: 0,

                            ropa3: 0,
                            texturaRopa3: 0,

                            ropa1: 0,
                            texturaRopa1: 0,

                            accesorio1: player_local.getPropIndex(1),
                            texturaAccesorio1: player_local.getPropTextureIndex(1),

                            accesorio0: player_local.getPropIndex(0),
                            texturaAccesorio0: player_local.getPropTextureIndex(0)
                        };
                    }
                    else // Mujer
                    {
                        equipar = {
                            ropa11: 258,
                            texturaRopa11: 0,

                            ropa10: 66,
                            texturaRopa10: 0,

                            ropa9: 0,
                            texturaRopa9: 0,

                            ropa8: 14,
                            texturaRopa8: 0,

                            ropa7: 0,
                            texturaRopa7: 0,

                            ropa6: 25,
                            texturaRopa6: 0,

                            ropa5: 0,
                            texturaRopa5: 0,

                            ropa4: 99,
                            texturaRopa4: 0,

                            ropa3: 0,
                            texturaRopa3: 0,

                            ropa1: 0,
                            texturaRopa1: 0,

                            accesorio1: player_local.getPropIndex(1),
                            texturaAccesorio1: player_local.getPropTextureIndex(1),

                            accesorio0: player_local.getPropIndex(0),
                            texturaAccesorio0: player_local.getPropTextureIndex(0)
                        };
                    }

                    if (uniformeInviernoAzulPuesto == true)
                    {
                        item1.Checked = false;
                        uniformeInviernoAzulPuesto = false;
                    }
                    if (uniformeInviernoVerdePuesto == true)
                    {
                        item3.Checked = false;
                        uniformeInviernoVerdePuesto = false;
                    }
                    if (uniformeVeranoVerdePuesto == true)
                    {
                        item4.Checked = false;
                        uniformeVeranoVerdePuesto = false;
                    }

                    mp.events.callRemote("negocioSanidad:confimar_ropa", JSON.stringify(equipar));
                }
            break;
            case "(1) Uniforme invierno verde":
                if (!state)
                { // Quitar
                    uniformeInviernoVerdePuesto = false;
                    if (!(uniformeVeranoAzulPuesto == true || uniformeInviernoVerdePuesto == true || uniformeVeranoVerdePuesto == true)) mp.events.callRemote("negocioSanidad:aplicar_vestirse");
                }
                else
                { // Poner
                    uniformeInviernoVerdePuesto = true;
                    equipar = null;

                    if (genero == 0) // Hombre
                    {
                        equipar = {
                            ropa11: 249,
                            texturaRopa11: 1,

                            ropa10: 57,
                            texturaRopa10: 0,

                            ropa9: 0,
                            texturaRopa9: 0,

                            ropa8: 71,
                            texturaRopa8: 3,

                            ropa7: 0,
                            texturaRopa7: 0,

                            ropa6: 25,
                            texturaRopa6: 0,

                            ropa5: 0,
                            texturaRopa5: 0,

                            ropa4: 96,
                            texturaRopa4: 1,

                            ropa3: 4,
                            texturaRopa3: 0,

                            ropa1: 0,
                            texturaRopa1: 0,

                            accesorio1: player_local.getPropIndex(1),
                            texturaAccesorio1: player_local.getPropTextureIndex(1),

                            accesorio0: player_local.getPropIndex(0),
                            texturaAccesorio0: player_local.getPropTextureIndex(0)
                        };
                    }
                    else // Mujer
                    {
                        equipar = {
                            ropa11: 257,
                            texturaRopa11: 1,

                            ropa10: 65,
                            texturaRopa10: 0,

                            ropa9: 0,
                            texturaRopa9: 0,

                            ropa8: 76,
                            texturaRopa8: 3,

                            ropa7: 0,
                            texturaRopa7: 0,

                            ropa6: 25,
                            texturaRopa6: 0,

                            ropa5: 0,
                            texturaRopa5: 0,

                            ropa4: 99,
                            texturaRopa4: 1,

                            ropa3: 3,
                            texturaRopa3: 0,

                            ropa1: 0,
                            texturaRopa1: 0,

                            accesorio1: player_local.getPropIndex(1),
                            texturaAccesorio1: player_local.getPropTextureIndex(1),

                            accesorio0: player_local.getPropIndex(0),
                            texturaAccesorio0: player_local.getPropTextureIndex(0)
                        };
                    }

                    if (uniformeInviernoAzulPuesto == true) {
                        item1.Checked = false;
                        uniformeInviernoAzulPuesto = false;
                    }
                    if (uniformeVeranoAzulPuesto == true) {
                        item2.Checked = false;
                        uniformeVeranoAzulPuesto = false;
                    }
                    if (uniformeVeranoVerdePuesto == true) {
                        item4.Checked = false;
                        uniformeVeranoVerdePuesto = false;
                    }

                    mp.events.callRemote("negocioSanidad:confimar_ropa", JSON.stringify(equipar));
                }
            break;
            case "(1) Uniforme verano verde":
                if (!state)
                { // Quitar
                    uniformeVeranoVerdePuesto = false;
                    if (!(uniformeVeranoAzulPuesto == true || uniformeInviernoVerdePuesto == true || uniformeVeranoVerdePuesto == true)) mp.events.callRemote("negocioSanidad:aplicar_vestirse");
                }
                else
                { // Poner
                    uniformeVeranoVerdePuesto = true;
                    equipar = null;

                    if (genero == 0) // Hombre
                    {
                        equipar = {
                            ropa11: 249,
                            texturaRopa11: 1,

                            ropa10: 57,
                            texturaRopa10: 0,

                            ropa9: 0,
                            texturaRopa9: 0,

                            ropa8: 71,
                            texturaRopa8: 3,

                            ropa7: 0,
                            texturaRopa7: 0,

                            ropa6: 25,
                            texturaRopa6: 0,

                            ropa5: 0,
                            texturaRopa5: 0,

                            ropa4: 96,
                            texturaRopa4: 1,

                            ropa3: 4,
                            texturaRopa3: 0,

                            ropa1: 0,
                            texturaRopa1: 0,

                            accesorio1: player_local.getPropIndex(1),
                            texturaAccesorio1: player_local.getPropTextureIndex(1),

                            accesorio0: player_local.getPropIndex(0),
                            texturaAccesorio0: player_local.getPropTextureIndex(0)
                        };
                    }
                    else // Mujer
                    {
                        equipar = {
                            ropa11: 250,
                            texturaRopa11: 1,

                            ropa10: 58,
                            texturaRopa10: 0,

                            ropa9: 0,
                            texturaRopa9: 0,

                            ropa8: 15,
                            texturaRopa8: 0,

                            ropa7: 0,
                            texturaRopa7: 0,

                            ropa6: 25,
                            texturaRopa6: 0,

                            ropa5: 0,
                            texturaRopa5: 0,

                            ropa4: 96,
                            texturaRopa4: 1,

                            ropa3: 0,
                            texturaRopa3: 0,

                            ropa1: 0,
                            texturaRopa1: 0,

                            accesorio1: player_local.getPropIndex(1),
                            texturaAccesorio1: player_local.getPropTextureIndex(1),

                            accesorio0: player_local.getPropIndex(0),
                            texturaAccesorio0: player_local.getPropTextureIndex(0)
                        };
                    }

                    if (uniformeInviernoAzulPuesto == true) {
                        item1.Checked = false;
                        uniformeInviernoAzulPuesto = false;
                    }
                    if (uniformeVeranoAzulPuesto == true) {
                        item2.Checked = false;
                        uniformeVeranoAzulPuesto = false;
                    }
                    if (uniformeInviernoVerdePuesto == true) {
                        item3.Checked = false;
                        uniformeInviernoVerdePuesto = false;
                    }

                    mp.events.callRemote("negocioSanidad:confimar_ropa", JSON.stringify(equipar));
                }
                break;
            case "(2) Guantes médicos (Manga larga)":
                if (!state)
                {
                    guantesMangaLargaPuesto = false;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 4, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 3, 0, true); // Mujer                  
                }
                else
                {
                    guantesMangaLargaPuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 88, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 101, 0, true); // Mujer       

                    if (guantesMangaCortaPuesto == true)
                    {
                        item6.Checked = false;
                        guantesMangaCortaPuesto = false;
                    }
                    if (guantesCamisetasPuesto == true)
                    {
                        item7.Checked = false;
                        guantesCamisetasPuesto = false;
                    }
                }
            break;
            case "(2) Guantes médicos (Manga corta)":
                if (!state) {
                    guantesMangaCortaPuesto = false;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 11, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 9, 0, true); // Mujer
                }
                else {
                    guantesMangaCortaPuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 92, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 106, 0, true); // Mujer

                    if (guantesMangaLargaPuesto == true)
                    {
                        item5.Checked = false;
                        guantesMangaLargaPuesto = false;
                    }
                    if (guantesCamisetasPuesto == true)
                    {
                        item7.Checked = false;
                        guantesCamisetasPuesto = false;
                    }
                }
            break;
            case "(2) Guantes médicos (Camisetas)":
                if (!state) { // Quitar
                    guantesCamisetasPuesto = false;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 0, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 14, 0, true); // Mujer
                }
                else { // Poner
                    guantesCamisetasPuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 85, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 3, 109, 0, true); // Mujer

                    if (guantesMangaLargaPuesto == true) {
                        item5.Checked = false;
                        guantesMangaLargaPuesto = false;
                    }
                    if (guantesMangaCortaPuesto == true) {
                        item6.Checked = false;
                        guantesMangaCortaPuesto = false;
                    }
                }
            break;
            case "(3) Casco básico":
                if (!state)
                { // Quitar
                    cascoBasicoPuesto = false;
                    mp.events.callRemote("negocioSanidad:quitar_propt", 0);
                }
                else
                { // Poner
                    cascoBasicoPuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:poner_propt", 0, 39, 2, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:poner_propt", 0, 38, 2, false); // Mujer

                    if (cascoAntidisturbiosPuesto == true)
                    {
                        item9.Checked = false;
                        cascoAntidisturbiosPuesto = false;
                    }
                    if (gorraAzulPuesta == true)
                    {
                        item10.Checked = false;
                        gorraAzulPuesta = false;
                    }
                    if (gorraVerdePuesta == true)
                    {
                        item11.Checked = false;
                        gorraVerdePuesta = false;
                    }
                }
            break;
            case "(3) Casco antidisturbios":
                if (!state) {
                    cascoAntidisturbiosPuesto = false
                    mp.events.callRemote("negocioSanidad:quitar_propt", 0);
                }
                else {
                    cascoAntidisturbiosPuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:poner_propt", 0, 125, 1, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:poner_propt", 0, 124, 1, false); // Mujer

                    if (cascoBasicoPuesto == true) {
                        item8.Checked = false;
                        cascoBasicoPuesto = false;
                    }
                    if (gorraAzulPuesta == true) {
                        item10.Checked = false;
                        gorraAzulPuesta = false;
                    }
                    if (gorraVerdePuesta == true) {
                        item11.Checked = false;
                        gorraVerdePuesta = false;
                    }
                }
            break;
            case "(3) Gorra azul":
                if (!state) {
                    gorraAzulPuesta = false;
                    mp.events.callRemote("negocioSanidad:quitar_propt", 0);
                }
                else {
                    gorraAzulPuesta = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:poner_propt", 0, 122, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:poner_propt", 0, 121, 0, false); // Mujer

                    if (cascoBasicoPuesto == true) {
                        item8.Checked = false;
                        cascoBasicoPuesto = false;
                    }
                    if (cascoAntidisturbiosPuesto == true) {
                        item9.Checked = false;
                        cascoAntidisturbiosPuesto = false;
                    }
                    if (gorraVerdePuesta == true) {
                        item11.Checked = false;
                        gorraVerdePuesta = false;
                    }
                }
            break;
            case "(3) Gorra verde":
                if (!state)
                {
                    gorraVerdePuesta = false;
                    mp.events.callRemote("negocioSanidad:quitar_propt", 0);
                }
                else
                {
                    gorraVerdePuesta = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:poner_propt", 0, 122, 1, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:poner_propt", 0, 121, 1, false); // Mujer

                    if (cascoBasicoPuesto == true) {
                        item8.Checked = false;
                        cascoBasicoPuesto = false;
                    }
                    if (cascoAntidisturbiosPuesto == true) {
                        item9.Checked = false;
                        cascoAntidisturbiosPuesto = false;
                    }
                    if (gorraAzulPuesta == true) {
                        item10.Checked = false;
                        gorraAzulPuesta = false;
                    }
                }
            break;
            case "(4) Gafas negras":
                if (!state)
                {
                    gafasNegrasPuesta = false;
                    mp.events.callRemote("negocioSanidad:quitar_propt", 1);
                }
                else
                {
                    gafasNegrasPuesta = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:poner_propt", 1, 15, 9, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:poner_propt", 1, 9, 9, false); // Mujer

                    if (gafasBlancasPuesta == true)
                    {
                        item13.Checked = false;
                        gafasBlancasPuesta = false;
                    }
                }
            break;
            case "(4) Gafas blancas":
                if (!state)
                {
                    gafasBlancasPuesta = false;
                    mp.events.callRemote("negocioSanidad:quitar_propt", 1);
                }
                else
                {
                    gafasBlancasPuesta = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:poner_propt", 1, 15, 10, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:poner_propt", 1, 9, 10, false); // Mujer

                    if (gafasNegrasPuesta == true) {
                        item12.Checked = false;
                        gafasNegrasPuesta = false;
                    }
                }
            break;
            case "(5) Pinganillo":
                if (!state)
                {
                    pinganilloPuesto = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 1, 0, 0, true);
                }
                else
                {
                    pinganilloPuesto = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 1, 121, 0, false);
                }
            break;
            case "(6) Estetoscopio":
                if (!state)
                {
                    estetoscopioPuesto = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 7, 0, 0, true);
                }
                else
                {
                    estetoscopioPuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 7, 126, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 7, 96, 0, false); // Mujer

                    if (identificacionPuesto == true) {
                        item16.Checked = false;
                        identificacionPuesto = false;
                    }
                }
            break;
            case "(6) Identificación":
                if (!state)
                {
                    identificacionPuesto = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 7, 0, 0, true);
                }
                else
                {
                    identificacionPuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 7, 127, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 7, 97, 0, false); // Mujer

                    if (estetoscopioPuesto == true) {
                        item15.Checked = false;
                        estetoscopioPuesto = false;
                    }
                }
                break;

            case "(7) Bolsa negra":
                if (!state)
                {
                    bolsa0EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else
                {
                    bolsa0EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 0, false);

                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa7EspaldaPuesta == true) {
                        item24.Checked = false;
                        bolsa7EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa azul oscuro":
                if (!state)
                {
                    bolsa1EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else
                {
                    bolsa1EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 1, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa7EspaldaPuesta == true) {
                        item24.Checked = false;
                        bolsa7EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa amarilla":
                if (!state)
                {
                    bolsa2EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else {
                    bolsa2EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 2, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa7EspaldaPuesta == true) {
                        item24.Checked = false;
                        bolsa7EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa roja":
                if (!state) {
                    bolsa3EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else {
                    bolsa3EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 3, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa7EspaldaPuesta == true) {
                        item24.Checked = false;
                        bolsa7EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa verde":
                if (!state) {
                    bolsa4EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else {
                    bolsa4EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 4, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa7EspaldaPuesta == true) {
                        item24.Checked = false;
                        bolsa7EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa naranja":
                if (!state) {
                    bolsa5EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else {
                    bolsa5EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 5, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa7EspaldaPuesta == true) {
                        item24.Checked = false;
                        bolsa7EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa morado":
                if (!state) {
                    bolsa6EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else {
                    bolsa6EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 6, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa7EspaldaPuesta == true) {
                        item24.Checked = false;
                        bolsa7EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa rosa":
                if (!state) {
                    bolsa7EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else {
                    bolsa7EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 7, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa azul y rojo":
                if (!state) {
                    bolsa8EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else {
                    bolsa8EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 8, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa7EspaldaPuesta == true) {
                        item24.Checked = false;
                        bolsa7EspaldaPuesta = false;
                    }
                    if (bolsa9EspaldaPuesta == true) {
                        item26.Checked = false;
                        bolsa9EspaldaPuesta = false;
                    }
                }
                break;

            case "(7) Bolsa azul y amarilla":
                if (!state) {
                    bolsa9EspaldaPuesta = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 0, 0, true);
                }
                else {
                    bolsa9EspaldaPuesta = true;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 5, 82, 9, false);

                    if (bolsa0EspaldaPuesta == true) {
                        item17.Checked = false;
                        bolsa0EspaldaPuesta = false;
                    }
                    if (bolsa1EspaldaPuesta == true) {
                        item18.Checked = false;
                        bolsa1EspaldaPuesta = false;
                    }
                    if (bolsa2EspaldaPuesta == true) {
                        item19.Checked = false;
                        bolsa2EspaldaPuesta = false;
                    }
                    if (bolsa3EspaldaPuesta == true) {
                        item20.Checked = false;
                        bolsa3EspaldaPuesta = false;
                    }
                    if (bolsa4EspaldaPuesta == true) {
                        item21.Checked = false;
                        bolsa4EspaldaPuesta = false;
                    }
                    if (bolsa5EspaldaPuesta == true) {
                        item22.Checked = false;
                        bolsa5EspaldaPuesta = false;
                    }
                    if (bolsa6EspaldaPuesta == true) {
                        item23.Checked = false;
                        bolsa6EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                    if (bolsa8EspaldaPuesta == true) {
                        item25.Checked = false;
                        bolsa8EspaldaPuesta = false;
                    }
                }
                break;

            case "(8) Cinturón con walkie":
                if (!state) {
                    radioCinturonWalkiePuesto = false;
                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 15, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 14, 0, true); // Mujer
                }
                else {
                    radioCinturonWalkiePuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 78, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 81, 0, false); // Mujer

                    if (radioCinturonRadioPuesto == true) {
                        item28.Checked = false;
                        radioCinturonRadioPuesto = false;
                    }
                    if (radioCinturonRadioHombroPuesto == true) {
                        item29.Checked = false;
                        radioCinturonRadioHombroPuesto = false;
                    }
                }
            break;
            case "(8) Cinturón con radio":
                if (!state) {
                    radioCinturonRadioPuesto = false;
                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 15, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 14, 0, true); // Mujer
                }
                else {
                    radioCinturonRadioPuesto = true

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 129, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 159, 0, false); // Mujer

                    if (radioCinturonWalkiePuesto == true) {
                        item27.Checked = false;
                        radioCinturonWalkiePuesto = false;
                    }
                    if (radioCinturonRadioHombroPuesto == true) {
                        item29.Checked = false;
                        radioCinturonRadioHombroPuesto = false;
                    }
                }
            break;
            case "(8) Cinturon radio hombro":
                if (!state) {
                    radioCinturonRadioHombroPuesto = false;
                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 15, 0, true); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 14, 0, true); // Mujer
                }
                else {
                    radioCinturonRadioHombroPuesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 153, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 8, 189, 0, false); // Mujer

                    if (radioCinturonWalkiePuesto == true) {
                        item27.Checked = false;
                        radioCinturonWalkiePuesto = false;
                    }
                    if (radioCinturonRadioPuesto == true) {
                        item28.Checked = false;
                        radioCinturonRadioPuesto = false;
                    }
                }
            break;
            case "(9) Chaleco verde":
                if (!state)
                {
                    chalecoPuestoVerde = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 9, 0, 0, true);
                }
                else
                {
                    chalecoPuestoVerde = true;
                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 9, 28, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 9, 31, 0, false); // Mujer

                    if (chalecoPuestoRojo == true) {
                        item32.Checked = false;
                        chalecoPuestoRojo = false;
                    }
                }
                break;
            case "(9) Chaleco rojo":
                if (!state)
                {
                    chalecoPuestoRojo = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 9, 0, 0, true);
                }
                else
                {
                    chalecoPuestoRojo = true;
                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 9, 28, 4, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 9, 31, 4, false); // Mujer

                    if (chalecoPuestoVerde == true) {
                        item30.Checked = false;
                        chalecoPuestoVerde = false;
                    }
                }
                break;
            case "(10) Decal 1":
                if (!state) {
                    decals1Puesto = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 0, 0, true);
                }
                else
                {
                    decals1Puesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 57, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 65, 0, false); // Mujer

                    if (decals2Puesto == true) {
                        item34.Checked = false;
                        decals2Puesto = false;
                    }
                    if (decals3Puesto == true) {
                        item35.Checked = false;
                        decals3Puesto = false;
                    }
                }
                break;
            case "(10) Decal 2":
                if (!state) {
                    decals2Puesto = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 0, 0, true);
                }
                else {
                    decals2Puesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 58, 0, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 66, 0, false); // Mujer

                    if (decals1Puesto == true) {
                        item33.Checked = false;
                        decals1Puesto = false;
                    }
                    if (decals3Puesto == true) {
                        item35.Checked = false;
                        decals3Puesto = false;
                    }
                }
                break;
            case "(10) Decal 3":
                if (!state) {
                    decals3Puesto = false;
                    mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 0, 0, true);
                }
                else {
                    decals3Puesto = true;

                    if (genero == 0) mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 58, 1, false); // Hombre
                    else mp.events.callRemote("negocioSanidad:cambiar_ropat", 10, 66, 1, false); // Mujer

                    if (decals1Puesto == true) {
                        item33.Checked = false;
                        decals1Puesto = false;
                    }
                    if (decals2Puesto == true) {
                        item34.Checked = false;
                        decals2Puesto = false;
                    }
                }
                break;
        }
    });

    menuSanidad_EQUIPAR.MenuClose.on(item => {
        mostrar_menu_sanidad_neg();
    });
}

function refrescarCheckedRopayAccesoriosPuestos() {

    // Guardamos en variables las ropas y texturas que tiene puesta
    DefaultRopa11 = player_local.getDrawableVariation(11);
    DefaultTextureRopa11 = player_local.getTextureVariation(11);
    DefaultRopa10 = player_local.getDrawableVariation(10);
    DefaultTextureRopa10 = player_local.getTextureVariation(10);
    DefaultRopa9 = player_local.getDrawableVariation(9);
    DefaultTextureRopa9 = player_local.getTextureVariation(9);
    DefaultRopa8 = player_local.getDrawableVariation(8);
    DefaultRopa7 = player_local.getDrawableVariation(7);
    DefaultTextureRopa7 = player_local.getTextureVariation(7);
    DefaultRopa5 = player_local.getDrawableVariation(5);
    DefaultTextureRopa5 = player_local.getTextureVariation(5);
    DefaultRopa4 = player_local.getDrawableVariation(4);
    DefaultRopaTexture4 = player_local.getTextureVariation(4);
    DefaultRopa3 = player_local.getDrawableVariation(3);
    DefaultRopa1 = player_local.getDrawableVariation(1);
    DefaultAccesorio1 = player_local.getPropIndex(1);
    DefaultAccesorioTexture1 = player_local.getPropTextureIndex(1);
    DefaultAccesorio0 = player_local.getPropIndex(0);
    DefaultAccesorioTexture0 = player_local.getPropTextureIndex(0);

    // Ponemos a false las variables para los CheckBox
    uniformeInviernoAzulPuesto = false;
    uniformeVeranoAzulPuesto = false;
    uniformeInviernoVerdePuesto = false;
    uniformeVeranoVerdePuesto = false;
    guantesMangaLargaPuesto = false;
    guantesMangaCortaPuesto = false;
    guantesCamisetasPuesto = false;
    cascoBasicoPuesto = false;
    cascoAntidisturbiosPuesto = false;
    gorraAzulPuesta = false;
    gorraVerdePuesta = false;
    gafasNegrasPuesta = false;
    gafasBlancasPuesta = false;
    pinganilloPuesto = false;
    estetoscopioPuesto = false;
    identificacionPuesto = false;
    bolsa0EspaldaPuesta = false;
    bolsa1EspaldaPuesta = false;
    bolsa2EspaldaPuesta = false;
    bolsa3EspaldaPuesta = false;
    bolsa4EspaldaPuesta = false;
    bolsa5EspaldaPuesta = false;
    bolsa6EspaldaPuesta = false;
    bolsa7EspaldaPuesta = false;
    bolsa8EspaldaPuesta = false;
    bolsa9EspaldaPuesta = false;
    radioCinturonWalkiePuesto = false;
    radioCinturonRadioPuesto = false;
    radioCinturonRadioHombroPuesto = false;
    chalecoPuestoVerde = false;
    chalecoPuestoRojo = false;
    decals1Puesto = false;
    decals2Puesto = false;
    decals3Puesto = false;

    // Desmarcamos todo los CheckBox que hay
    item1.Checked = false;
    item2.Checked = false;
    item3.Checked = false;
    item4.Checked = false;
    item5.Checked = false;
    item6.Checked = false;
    item7.Checked = false;
    item8.Checked = false;
    item9.Checked = false;
    item10.Checked = false;
    item11.Checked = false;
    item12.Checked = false;
    item13.Checked = false;
    item14.Checked = false;
    item15.Checked = false;
    item16.Checked = false;
    item17.Checked = false;
    item18.Checked = false;
    item19.Checked = false;
    item20.Checked = false;
    item21.Checked = false;
    item22.Checked = false;
    item23.Checked = false;
    item24.Checked = false;
    item25.Checked = false;
    item26.Checked = false;
    item27.Checked = false;
    item28.Checked = false;
    item29.Checked = false;
    item30.Checked = false;
    item32.Checked = false;
    item33.Checked = false;
    item34.Checked = false;
    item35.Checked = false;

    // Miramos a ver que es lo que lleva puesto, lo que lleve puesto lo marcaremos en el menu
    if (player_local.model == mp.game.joaat("mp_m_freemode_01")) {
        genero = 0; // Hombre

        /*
         *      ROPA INDEX 11 
         */

        // Obtenemos si tiene el uniforme invierno azul puesto
        if (DefaultRopa11 == 249 && DefaultTextureRopa11 == 0){
            item1.Checked = true;
            uniformeInviernoAzulPuesto = true;
        } 
        // Obtenemos si tiene el uniforme verano azul puesto
        if (DefaultRopa11 == 250 && DefaultTextureRopa11 == 0) {
            item2.Checked = true;
            uniformeVeranoAzulPuesto = true;
        }
        // Obtenemos si tiene el uniforme invierno verde puesto
        if (DefaultRopa11 == 249 && DefaultTextureRopa11 == 1) {
            item3.Checked = true;
            uniformeInviernoVerdePuesto = true;
        } 

        // Obtenemos si tiene el uniforme verano verde puesto
        if (DefaultRopa11 == 250 && DefaultTextureRopa11 == 1) {
            item4.Checked = true;
            uniformeVeranoVerdePuesto = true;
        } 

        /*
         *      ROPA INDEX 10
         */

        // Obtenemos si tiene el decals 1 puesto
        if (DefaultRopa10 == 57 && DefaultTextureRopa10 == 0) {
            item33.Checked = true;
            decals1Puesto = true;
        }

        // Obtenemos si tiene el decals 2 puesto
        if (DefaultRopa10 == 58 && DefaultTextureRopa10 == 0) {
            item34.Checked = true;
            decals2Puesto = true;
        }

        // Obtenemos si tiene el decals 2 puesto
        if (DefaultRopa10 == 58 && DefaultTextureRopa10 == 1) {
            item35.Checked = true;
            decals3Puesto = true;
        }

        /*
         *      ROPA INDEX 9
         */

        // Obtenemos si tiene el chaleco verde puesto
        if (DefaultRopa9 == 28 && DefaultTextureRopa9 == 0) {
            item30.Checked = true;
            chalecoPuestoVerde = true;
        }

        // Obtenemos si tiene el chaleco rojo puesto
        if (DefaultRopa9 == 28 && DefaultTextureRopa9 == 4) {
            item32.Checked = true;
            chalecoPuestoRojo = true;
        }

        /*
         *      ROPA INDEX 8
         */

        // Obtenemos si tiene el cinturon con walkie puesto
        if (DefaultRopa8 == 78) {
            item27.Checked = true;
            radioCinturonWalkiePuesto = true;
        }

        // Obtenemos si tiene el cinturon con radio puesto
        if (DefaultRopa8 == 129) {
            item28.Checked = true;
            radioCinturonRadioPuesto = true;
        }

        // Obtenemos si tiene el cinturon con radio en hombro puesto
        if (DefaultRopa8 == 153) {
            item29.Checked = true;
            radioCinturonRadioHombroPuesto = true;
        }

        /*
         *      ROPA INDEX 7
         */

        // Obtenemos si tiene el estetoscopio  puesto
        if (DefaultRopa7 == 126) {
            item15.Checked = true;
            estetoscopioPuesto = true;
        }

        // Obtenemos si tiene la identificacion puesta
        if (DefaultRopa7 == 127) {
            item16.Checked = true;
            identificacionPuesto = true;
        }

        /*
         *      ROPA INDEX 3
         */

        // Obtenemos si tiene los guantes medicos manga larga
        if (DefaultRopa3 == 88) {
            item5.Checked = true;
            guantesMangaLargaPuesto = true;
        }

        // Obtenemos si tiene los guantes medicos manga corta
        if (DefaultRopa3 == 92) {
            item6.Checked = true;
            guantesMangaCortaPuesto = true;
        }

        // Obtenemos si tiene los guantes medicos camiseta
        if (DefaultRopa3 == 85) {
            item7.Checked = true;
            guantesCamisetasPuesto = true;
        }

        /*
         *      ACCESORIO INDEX 0
         */

        // Obtenemos si tiene el casco basico puesto
        if (DefaultAccesorio0 == 39) {
            item8.Checked = true;
            cascoBasicoPuesto = true;
        }

        // Obtenemos si tiene el casco antidisturbios puesto
        if (DefaultAccesorio0 == 125) {
            item9.Checked = true;
            cascoAntidisturbiosPuesto = true;
        }

        // Obtenemos si tiene la gorra azul puesta
        if (DefaultAccesorio0 == 122 && DefaultAccesorioTexture0 == 0) {
            item10.Checked = true;
            gorraAzulPuesta = true;
        }

        // Obtenemos si tiene la gorra verde puesta
        if (DefaultAccesorio0 == 122 && DefaultAccesorioTexture0 == 1) {
            item11.Checked = true;
            gorraVerdePuesta = true;
        }

        /*
         *      ACCESORIO INDEX 1
         */

        // Obtenemos si tiene las gafas negras puestas
        if (DefaultAccesorio1 == 15 && DefaultAccesorioTexture1 == 9) {
            item12.Checked = true;
            gafasNegrasPuesta = true;
        }

        // Obtenemos si tiene las gafas blancas puestas
        if (DefaultAccesorio1 == 15 && DefaultAccesorioTexture1 == 10) {
            item13.Checked = true;
            gafasBlancasPuesta = true;
        }
    }
    else {
        genero = 1; // Mujer

        /*
         *      ROPA INDEX 11 
         */

        // Obtenemos si tiene el uniforme invierno azul puesto
        if (DefaultRopa11 == 257 && DefaultTextureRopa11 == 0)
        {
            item1.Checked = true;
            uniformeInviernoAzulPuesto = true;
        }

        // Obtenemos si tiene el uniforme verano azul puesto
        if (DefaultRopa11 == 258 && DefaultTextureRopa11 == 0) {
            item2.Checked = true;
            uniformeVeranoAzulPuesto = true;
        }

        // Obtenemos si tiene el uniforme invierno verde puesto
        if (DefaultRopa11 == 257 && DefaultTextureRopa11 == 1)
        {
            item3.Checked = true;
            uniformeInviernoVerdePuesto = true;
        }

        // Obtenemos si tiene el uniforme verano verde puesto
        if (DefaultRopa11 == 258 && DefaultTextureRopa11 == 1) {
            item4.Checked = true;
            uniformeVeranoVerdePuesto = true;
        }

        /*
         *      ROPA INDEX 10
         */

        // Obtenemos si tiene el decals 1 puesto
        if (DefaultRopa10 == 65 && DefaultTextureRopa10 == 0) {
            item33.Checked = true;
            decals1Puesto = true;
        }

        // Obtenemos si tiene el decals 2 puesto
        if (DefaultRopa10 == 66 && DefaultTextureRopa10 == 0) {
            item34.Checked = true;
            decals2Puesto = true;
        }

        // Obtenemos si tiene el decals 2 puesto
        if (DefaultRopa10 == 66 && DefaultTextureRopa10 == 1) {
            item35.Checked = true;
            decals3Puesto = true;
        }

        /*
         *      ROPA INDEX 9
         */

        // Obtenemos si tiene el chaleco verde puesto
        if (DefaultRopa9 == 31 && DefaultTextureRopa9 == 0) {
            item30.Checked = true;
            chalecoPuestoVerde = true;
        }

        // Obtenemos si tiene el chaleco rojo puesto
        if (DefaultRopa9 == 31 && DefaultTextureRopa9 == 4) {
            item32.Checked = true;
            chalecoPuestoRojo = true;
        }

        /*
         *      ROPA INDEX 8
         */

        // Obtenemos si tiene el cinturon con walkie puesto
        if (DefaultRopa8 == 81) {
            item27.Checked = true;
            radioCinturonWalkiePuesto = true;
        }

        // Obtenemos si tiene el cinturon con radio puesto
        if (DefaultRopa8 == 159) {
            item28.Checked = true;
            radioCinturonRadioPuesto = true;
        }

        // Obtenemos si tiene el cinturon con radio en hombro puesto
        if (DefaultRopa8 == 189) {
            item29.Checked = true;
            radioCinturonRadioHombroPuesto = true;
        }

        /*
         *      ROPA INDEX 7
         */

        // Obtenemos si tiene el estetoscopio  puesto
        if (DefaultRopa7 == 96) {
            item15.Checked = true;
            estetoscopioPuesto = true;
        }

        // Obtenemos si tiene la identificacion puesta
        if (DefaultRopa7 == 97) {
            item16.Checked = true;
            identificacionPuesto = true;
        }

        /*
         *      ROPA INDEX 3
         */

        // Obtenemos si tiene los guantes medicos manga larga
        if (DefaultRopa3 == 101) {
            item5.Checked = true;
            guantesMangaLargaPuesto = true;
        }
        // Obtenemos si tiene los guantes medicos manga corta
        if (DefaultRopa3 == 106) {
            item6.Checked = true;
            guantesMangaCortaPuesto = true;
        }
        // Obtenemos si tiene los guantes medicos camiseta
        if (DefaultRopa3 == 85) {
            item7.Checked = true;
            guantesCamisetasPuesto = true;
        }

        /*
         *      ACCESORIO INDEX 0
         */

        // Obtenemos si tiene el casco basico puesto
        if (DefaultAccesorio0 == 109) {
            item8.Checked = true;
            cascoBasicoPuesto = true;
        }

        // Obtenemos si tiene el casco antidisturbios puesto
        if (DefaultAccesorio0 == 124) {
            item9.Checked = true;
            cascoAntidisturbiosPuesto = true;
        }

        // Obtenemos si tiene la gorra azul puesta
        if (DefaultAccesorio0 == 121 && DefaultAccesorioTexture0 == 0) {
            item10.Checked = true;
            gorraAzulPuesta = true;
        }

        // Obtenemos si tiene la gorra verde puesta
        if (DefaultAccesorio0 == 121 && DefaultAccesorioTexture0 == 1) {
            item11.Checked = true;
            gorraVerdePuesta = true;
        }

        /*
         *      ACCESORIO INDEX 1
         */

        // Obtenemos si tiene las gafas negras puestas
        if (DefaultAccesorio1 == 9 && DefaultAccesorioTexture1 == 9) {
            item12.Checked = true;
            gafasNegrasPuesta = true;
        }

        // Obtenemos si tiene las gafas blancas puestas
        if (DefaultAccesorio1 == 9 && DefaultAccesorioTexture1 == 10) {
            item13.Checked = true;
            gafasBlancasPuesta = true;
        }
    }

    /*
     *      ROPA INDEX 1
     */

    // Obtenemos si tiene el pinganillo puesto
    if (DefaultRopa1 == 121) {
        item14.Checked = true;
        pinganilloPuesto = true;
    }


    /*
     *      ROPA INDEX 5
     */
    // Obtenemos si tiene la bolsa abierta o cerrada puesta con la textura que corresponda -> ((DefaultRopa5 == 81 && DefaultTextureRopa5 == 0) || (DefaultRopa5 == 82 && DefaultTextureRopa5 == 0))
    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 0) {
        item17.Checked = true;
        bolsa0EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 1) {
        item18.Checked = true;
        bolsa1EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 2) {
        item19.Checked = true;
        bolsa2EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 3) {
        item20.Checked = true;
        bolsa3EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 4) {
        item21.Checked = true;
        bolsa4EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 5) {
        item22.Checked = true;
        bolsa5EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 6) {
        item23.Checked = true;
        bolsa6EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 7) {
        item24.Checked = true;
        bolsa7EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 8) {
        item25.Checked = true;
        bolsa8EspaldaPuesta = true;
    }

    if ((DefaultRopa5 == 81 || DefaultRopa5 == 82) && DefaultTextureRopa5 == 9) {
        item26.Checked = true;
        bolsa9EspaldaPuesta = true;
    }
}
}