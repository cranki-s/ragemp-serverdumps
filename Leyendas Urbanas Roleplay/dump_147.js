{
/* --------------------------------------------------------------------------------
 * menusfederal.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menus relacionados con la facción de Prision
 *
 * -------------------------------------------------------------------------------- */

/*
 *      VARIABLES
 */

//Variables especificas para el menu de seguridad
var menuprision_jugadorescerca;
let enTaquillasFuncionariosFederal = false;

/*
 *      COLSHAPES
 */

colshapetaquillasFuncionarios = mp.colshapes.newSphere(1830.537, 2582.708, 45.891, 2.0, 0);

/*
 *      EVENTOS
 */

mp.events.add({
    "playerEnterColshape": (colshape) => {
        if (colshape == colshapetaquillasFuncionarios) {
            let jugador = mp.controladorJugadores._jugadores[player_local.id];
            
            if (!jugador || (jugador && !(jugador.trabajos).includes(31))) {
                return;
            }
            
            enTaquillasFuncionariosFederal = true;

            //Si esta de servicio fuera porque ya se lo habremos mostrado cuando no lo estaba.
            if (!jugador || (jugador && jugador.deservicio)) {
                return;
            }

            mostrarAviso("big", 12000, "<h1>Taquillas para funcionarios</h1>" +
            "<p>Pulsa la tecla <span style='color:green;'><strong>[E]</strong></span> en este punto para entrar/salir de servicio como funcionario de la prisión federal</p>" +
            "<p>Estando de servicio, pulsa la tecla <strong><span style='color:green;'>[U]</span></strong> para acceder al menú del trabajo, donde podrás equiparte y acceder otras funcionalidades</p>");
        }
    },
    "playerExitColshape": (colshape) => {
        if (colshape == colshapetaquillasFuncionarios) {

            mp.events.call("hud:ocultar_aviso_grande");
            enTaquillasFuncionariosFederal = false;
        }
    },
});

mp.events.add({
    "prisionfederal:mostrar_menu": function () {
        mostrar_menu_prisionfederal();
        mp.events.call("hud:ocultar_aviso_grande");
    },
});

/*
 *      MENU DE SERVICIO TECLA U
 */

function mostrar_menu_prisionfederal() {
    menuPRISION = crearMenu("Prisión Federal", " ");
    menuPRISION.AddItem(new UIMenuItem("Equipar", "Equipar con sus respectivas categorias para la facción de prisión."));
    menuPRISION.AddItem(new UIMenuItem("Armeria", "Armeria con sus respectivas categorias para la facción de prisión."));
    menuPRISION.AddItem(new UIMenuItem("Cachear", "Cachea al jugador seleccionado."));
    menuPRISION.AddItem(new UIMenuItem("Esposar", "Esposa al jugador seleccionado."));
    menuPRISION.AddItem(new UIMenuItem("Desesposar", "Desesposa al jugador seleccionado."));
    menuPRISION.AddItem(new UIMenuItem("Curar", "Cura al jugador seleccionado."));
    menuPRISION.AddItem(new UIMenuItem("Reanimar", "Reanima al jugador seleccionado."));

    menuPRISION.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                menuPRISION?.Close(true);
                mostrar_equipar_prisionfederal();
                break;
            case 1:
                menuPRISION?.Close(true);
                mostrar_armeria_prisionfederal();
                break;
            case 2:
                menuPRISION?.Close(true);
                menuprision_jugadorescerca = 2;
                evento_mostrar_jugadores_cerca();
                break;
            case 3:
                menuPRISION?.Close(true);
                menuprision_jugadorescerca = 3;
                evento_mostrar_jugadores_cerca();
                break;
            case 4:
                menuPRISION?.Close(true);
                menuprision_jugadorescerca = 4;
                evento_mostrar_jugadores_cerca();
                break;
            case 5:
                menuPRISION?.Close(true);
                menuprision_jugadorescerca = 5;
                evento_mostrar_jugadores_cerca();
                break;
            case 6:
                menuPRISION?.Close(true);
                menuprision_jugadorescerca = 6;
                evento_mostrar_jugadores_cerca();
                break;
        }
    });

    menuPRISION.MenuClose.on(item => {
        menuPRISION = null;
    });
}

function evento_mostrar_jugadores_cerca() {
    let jugadores_proximos = [];

    menuPRISIONJugadores = crearMenu('Prisión Federal', 'Jugadores cercanos', true);
    mp.players.forEachInStreamRange(function (player) {
        if (player == player_local) return;

        let jugador = mp.controladorJugadores._jugadores[player.id];
        if (jugador) {
            let conectado = mp.controladorJugadores._jugadores[player.id].conectado;
            let oculto = mp.controladorJugadores._jugadores[player.id].oculto;

            if (conectado == true && oculto == false) {
                let dist = mp.game.gameplay.getDistanceBetweenCoords(player.position.x, player.position.y, player.position.z, player_local.position.x, player_local.position.y, player_local.position.z, true);

                if (dist <= 5.0) {
                    menuPRISIONJugadores.AddItem(new UIMenuItem(obtenerNombreConocido(player), ''));
                    jugadores_proximos.push(jugador.id_jugador);

                }
            }
        }
    });

    menuPRISIONJugadores.ItemSelect.on((item, index) => {
        menuPRISIONJugadores.setVisible(false);
        menuPRISIONJugadores = null;

        jugadorID = jugadores_proximos[index];
        switch (menuprision_jugadorescerca) {
            case 2:
                mp.events.callRemote('menusfederal:jugadorescerca_cachear', jugadorID);
                break;
            case 3:
                mp.events.callRemote('menu:jugadorescerca_esposar', jugadorID);
                break;
            case 4:
                mp.events.callRemote('menu:jugadorescerca_desesposar', jugadorID);
                break;
            case 5:
                mp.events.callRemote('menusfederal:jugadorescerca_curar', jugadorID);
                break;
            case 6:
                mp.events.callRemote('menusfederal:jugadorescerca_reanimar', jugadorID);
                break;
        }
    });

    menuPRISIONJugadores.MenuClose.on(item => {
        mostrar_menu_prisionfederal();
    });
}

/*
 *      EQUIPAR
 */

function mostrar_equipar_prisionfederal() {
    equiparPRISION = crearMenu("Equipar", "Prisión Federal", true);
    equiparPRISION.AddItem(new UIMenuItem("Uniformidades", " "));
    equiparPRISION.AddItem(new UIMenuItem("Accesorios", " "));
    equiparPRISION.AddItem(new UIMenuItem("Chalecos", " "));
    equiparPRISION.AddItem(new UIMenuItem("Cascos/Gorras", " "));
    equiparPRISION.AddItem(new UIMenuItem("Guantes", " "));
    equiparPRISION.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    equiparPRISION.ItemSelect.on((item, index) => {
        equiparPRISION.setVisible(false, true);
        equiparPRISION = null;

        switch (index) {
            case 0:
                mostrar_equipar_prisionfederal_ropa();
                break;
            case 1:
                mostrar_equipar_prisionfederal_accesorios();
                break;
            case 2:
                mostrar_equipar_prisionfederal_chalecos();
                break;
            case 3:
                mostrar_equipar_prisionfederal_cascos();
                break;
            case 4:
                mostrar_equipar_prisionfederal_guantes();
                break;
            case 5: // VOLVER
                mostrar_menu_prisionfederal();
                break;
        }
    });

    equiparPRISION.MenuClose.on(item => {
        equiparPRISION = null;
        mostrar_menu_prisionfederal();
    });
}

function mostrar_equipar_prisionfederal_ropa() {
    equiparPRISION_ROPA = crearMenu("Uniformidades", " ", true);
    equiparPRISION_ROPA.AddItem(new UIMenuItem("Uniforme con camiseta (Manga corta)", " "));
    equiparPRISION_ROPA.AddItem(new UIMenuItem("Uniforme con camiseta (Manga larga)", " "));
    equiparPRISION_ROPA.AddItem(new UIMenuItem("Uniforme con camiseta (Manga larga corbata)", " "));
    equiparPRISION_ROPA.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    equiparPRISION_ROPA.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    equiparPRISION_ROPA.ItemSelect.on((item, index) => {

        if (index < 4) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPF:Uniformidades", (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 4) {
            equiparPRISION_ROPA?.Close(true);
        }
    });

    equiparPRISION_ROPA.MenuClose.on(item => {
        mostrar_equipar_prisionfederal();
        equiparPRISION_ROPA = null;
    });
}

function mostrar_equipar_prisionfederal_accesorios() {
    equiparPRISION_ACCESORIOS = crearMenu("Accesorios", " ", true);
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con porra", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con taser", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con taser y holster", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con porra y radio en hombro", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con radio colgada en cinturon", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con radio en hombro", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con radio en cinturon", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con varios compartimentos 1", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(1) Cinturón con varios compartimentos 2", " "));
    equiparPRISION_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", " "), "Rojo"));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(2) Placa", " "));
    equiparPRISION_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", " "), "Rojo"));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("(3) Pinganillo blanco oreja", " "));
    equiparPRISION_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", " "), "Rojo"));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("Tablet SASPA", " "));
    equiparPRISION_ACCESORIOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparPRISION_ACCESORIOS.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPF:Accesorios", (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 15) {
            equiparPRISION_ACCESORIOS?.Close(true);
        }
    });

    equiparPRISION_ACCESORIOS.MenuClose.on(item => {
        mostrar_equipar_prisionfederal();
        equiparPRISION_ACCESORIOS = null;
    });
}

function mostrar_equipar_prisionfederal_chalecos() {
    equiparPRISION_CHALECOS = crearMenu("Chalecos", " ", true);
    equiparPRISION_CHALECOS.AddItem(new UIMenuItem("(1) Kevlar", " ")); 
    equiparPRISION_CHALECOS.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    equiparPRISION_CHALECOS.AddItem(new UIMenuItem("(2) Antibalas", " "));
    equiparPRISION_CHALECOS.AddItem(new UIMenuItem("(2) Antidisturbios", " "));
    equiparPRISION_CHALECOS.AddItem(new UIMenuItem("(2) Ligero gris", " "));
    equiparPRISION_CHALECOS.AddItem(new UIMenuItem("(2) Ligero beis", " "));
    equiparPRISION_CHALECOS.AddItem(new UIMenuItem("(2) Ligero negro", " "));
    equiparPRISION_CHALECOS.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", " "), "Rojo"));
    equiparPRISION_CHALECOS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    equiparPRISION_CHALECOS.ItemSelect.on((item, index) => {

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPF:Chalecos", (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 8) {
            equiparPRISION_CHALECOS?.Close(true);
        }
    });

    equiparPRISION_CHALECOS.MenuClose.on(item => {
        mostrar_equipar_prisionfederal();
        equiparPRISION_CHALECOS = null;
    });
}

function mostrar_equipar_prisionfederal_cascos() {
    equiparPRISION_CASCOS = crearMenu("Gorras/Cascos", " ", true);
    equiparPRISION_CASCOS.AddItem(new UIMenuItem("Casco básico", " "));
    equiparPRISION_CASCOS.AddItem(new UIMenuItem("Casco antidisturbios (Abajo)", " "));
    equiparPRISION_CASCOS.AddItem(new UIMenuItem("Casco antidisturbios (Arriba)", " "));
    equiparPRISION_CASCOS.AddItem(new UIMenuItem("Gorra básica gris", " "));
    equiparPRISION_CASCOS.AddItem(new UIMenuItem("Gorra básica negra", " "));
    equiparPRISION_CASCOS.AddItem(aplicarColores(new UIMenuItem("Quitar", " "), "Rojo"));
    equiparPRISION_CASCOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparPRISION_CASCOS.ItemSelect.on((item, index) => {

        if (index < 6) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPF:Cascos", (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 6) {
            equiparPRISION_CASCOS?.Close(true);
        }
    });

    equiparPRISION_CASCOS.MenuClose.on(item => {
        mostrar_equipar_prisionfederal();
        equiparPRISION_CASCOS = null;
    });
}

function mostrar_equipar_prisionfederal_guantes() {
    equiparPRISION_GUANTES = crearMenu("Guantes", " ", true);
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(1) Tácticos", "(Polo y camiseta)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(1) Anticorte", "(Polo y camiseta)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(1) Latex azules", "(Polo y camiseta)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(1) Gala", "(Polo y camiseta)"));
    equiparPRISION_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", "(Polo y camiseta)"), "Rojo"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(2) Tácticos", "(Manga corta)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(2) Anticorte", "(Manga corta)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(2) Latex azules", "(Manga corta)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(2) Gala", "(Manga corta)"));
    equiparPRISION_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", "(Manga corta)"), "Rojo"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(3) Tácticos", "(Manga larga)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(3) Anticorte", "(Manga larga)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(3) Latex azules", "(Manga larga)"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("(3) Gala", "(Manga larga)"));
    equiparPRISION_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", "(Manga larga)"), "Rojo"));
    equiparPRISION_GUANTES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparPRISION_GUANTES.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPF:Guantes", (index + 1));
        }

        // Volver
        if (index == 15) {
            equiparPRISION_GUANTES?.Close(true);
        }
    });

    equiparPRISION_GUANTES.MenuClose.on(item => {
        mostrar_equipar_prisionfederal();
        equiparPRISION_GUANTES = null;
    });
}

/*
 *      ARMERIA 
 */

function mostrar_armeria_prisionfederal() {
    armeriaPF = crearMenu("Armeria", "Prisión Federal", true);
    armeriaPF.AddItem(new UIMenuItem("Blancas", " "));
    armeriaPF.AddItem(new UIMenuItem("Pistolas", " "));
    armeriaPF.AddItem(new UIMenuItem("Ametralladoras", " "));
    armeriaPF.AddItem(new UIMenuItem("Rifles de asalto", " "));
    armeriaPF.AddItem(new UIMenuItem("Francotiradores", " "));
    armeriaPF.AddItem(new UIMenuItem("Escopetas", " "));
    armeriaPF.AddItem(new UIMenuItem("Otros", " "));
    armeriaPF.AddItem(new UIMenuItem("Cargadores", " "));
    armeriaPF.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

    armeriaPF.ItemSelect.on((item, index) => {
        armeriaPF.setVisible(false, true);
        armeriaPF = null;

        switch (index) {
            case 0:
                mostrar_armeria_pf_blancas();
                break;
            case 1:
                mostrar_armeria_pf_pistolas();
                break;
            case 2:
                mostrar_armeria_pf_ametralladoras();
                break;
            case 3:
                mostrar_armeria_pf_rifles();
                break;
            case 4:
                mostrar_armeria_pf_franco();
                break;
            case 5:
                mostrar_armeria_pf_escopetas();
                break;
            case 6:
                mostrar_armeria_pf_otros();
                break;
            case 7:
                mostrar_armeria_pf_cargadores();
                break;
            case 8:
                mostrar_menu_prisionfederal();
                break;
        }
    });

    armeriaPF.MenuClose.on(item => {
        armeriaPF = null;
        mostrar_menu_prisionfederal();
    });
}

function mostrar_armeria_pf_blancas() {
    armeriaPF_BLANCAS = crearMenu("Blancas", "Armas de mano o armas blancas", true);
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Cuchillo", "")); // 33
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Porra", "Porra de uso policial")); // 22
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Martillo", " ")); // 19
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Bate béisbol", "")); // 31
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Palanca", "Gordon Freeman")); // 28
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Palo de golf", "")); // 16
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Botella cristal rota", "")); // 48
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Daga", "")); // 30
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Hacha", "")); // 47
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Puño americano", "")); // 242
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Machete", "")); // 44
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Linterna", "")); // 29
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Navaja", "")); // 243
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Taco de billar", "")); // 218
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Llave inglesa", "Usada para arreglar vehículos, o problemas personales")); // 34
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Hacha de batalla", "")); // 217
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Hacha de piedra", "")); // 1090
    armeriaPF_BLANCAS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    armeriaPF_BLANCAS.ItemSelect.on((item, index) => {

        if (index < 17) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPF:Blancas', (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 17) {
            armeriaPF_BLANCAS?.Close(true);
        }
    });

    armeriaPF_BLANCAS.MenuClose.on(item => {
        mostrar_armeria_prisionfederal();
        armeriaPF_BLANCAS = null;
    });
}

function mostrar_armeria_pf_pistolas() {
    armeriaPF_PISTOLAS = crearMenu("Pistolas", "", true);
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Taser", "")); // 14
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola de bengalas", "")); // 17
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("SNS Pistol", "Pistola de dimensiones muy pequeñas")); // 39
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("SNS Pistol MKII", "Pistola de dimensiones muy pequeñas potente")); // 248
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola vintage", "Pistola antigua")); // 4
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola de combate", "")); // 20
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola", "")); // 8
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola MKII", "Pistola usada por cuerpos del estado")); // 247
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola AP", "Pistola automática")); // 215
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola pesada", "Pistola táctica con mira incorporada")); // 43
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola calibre 50", "")); // 32
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Pistola marksman", "Pistola antigua")); // 244
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Revólver de doble acción", "Revólver antiguo")); // 246
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Revólver", "")); // 245
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Revólver MKII", "")); // 249
    armeriaPF_PISTOLAS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    armeriaPF_PISTOLAS.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPF:Pistolas', (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 15) {
            armeriaPF_PISTOLAS?.Close(true);
        }
    });

    armeriaPF_PISTOLAS.MenuClose.on(item => {
        mostrar_armeria_prisionfederal();
        armeriaPF_PISTOLAS = null;
    });
}

function mostrar_armeria_pf_ametralladoras() {
    armeriaPF_AMETRALLADORAS = crearMenu("Ametralladoras", "", true);
    armeriaPF_AMETRALLADORAS.AddItem(new UIMenuItem("UZI", "")); // 7
    armeriaPF_AMETRALLADORAS.AddItem(new UIMenuItem("Mini SMG", "Scorpion")); // 251
    armeriaPF_AMETRALLADORAS.AddItem(new UIMenuItem("MP5", "")); // 12
    armeriaPF_AMETRALLADORAS.AddItem(new UIMenuItem("MP5 MKII", "Versión de la MP5 sin culata")); // 227
    armeriaPF_AMETRALLADORAS.AddItem(new UIMenuItem("Subfusil de asalto", "Subfusil de uso militar")); // 46
    armeriaPF_AMETRALLADORAS.AddItem(new UIMenuItem("Combat PDW", "Subfusil táctico")); // 5
    armeriaPF_AMETRALLADORAS.AddItem(new UIMenuItem("Gusenberg", "Thompson de la segunda guerra mundial")); // 21
    armeriaPF_AMETRALLADORAS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    armeriaPF_AMETRALLADORAS.ItemSelect.on((item, index) => {

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPF:Ametralladoras', (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 7) {
            armeriaPF_AMETRALLADORAS?.Close(true);
        }
    });

    armeriaPF_AMETRALLADORAS.MenuClose.on(item => {
        mostrar_armeria_prisionfederal();
        armeriaPF_AMETRALLADORAS = null;
    });
}

function mostrar_armeria_pf_rifles() {
    armeriaPF_RIFLES = crearMenu("Rifles de asalto", "", true);
    armeriaPF_RIFLES.AddItem(new UIMenuItem("Rifle compacto", "Versión de la AK-47 sin culata")); // 232
    armeriaPF_RIFLES.AddItem(new UIMenuItem("Rifle avanzado", "")); // 38
    armeriaPF_RIFLES.AddItem(new UIMenuItem("Rifle bullpup", " ")); // 24
    armeriaPF_RIFLES.AddItem(new UIMenuItem("Rifle bullpup MKII", "Famas del ejército Francés")); // 236
    armeriaPF_RIFLES.AddItem(new UIMenuItem("AK-47", "")); // 40
    armeriaPF_RIFLES.AddItem(new UIMenuItem("AK-47 MKII", "Versión de la AK-47 mejorada")); // 233
    armeriaPF_RIFLES.AddItem(new UIMenuItem("M4", "")); // 27
    armeriaPF_RIFLES.AddItem(new UIMenuItem("M4 MKII", "Arma basada en la HK416")); // 234
    armeriaPF_RIFLES.AddItem(new UIMenuItem("Carabina Especial", "G36C Alemana")); // 41
    armeriaPF_RIFLES.AddItem(new UIMenuItem("Carabina Especial MKII", "G36C mejorada")); // 235
    armeriaPF_RIFLES.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    armeriaPF_RIFLES.ItemSelect.on((item, index) => {

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPF:Rifles', (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 10) {
            armeriaPF_RIFLES?.Close(true);
        }
    });

    armeriaPF_RIFLES.MenuClose.on(item => {
        mostrar_armeria_prisionfederal();
        armeriaPF_RIFLES = null;
    });
}

function mostrar_armeria_pf_franco() {
    armeriaPF_FRANCO = crearMenu("Francotiradores", "", true);
    armeriaPF_FRANCO.AddItem(new UIMenuItem("Marksman rifle", "Rifle de precisión automático")); // 42
    armeriaPF_FRANCO.AddItem(new UIMenuItem("Marksman rifle MKII", "Rifle de precisión automático potente")); // 238
    armeriaPF_FRANCO.AddItem(new UIMenuItem("Rifle de precisión pesado", "Rifle de precisión antimaterial")); // 6
    armeriaPF_FRANCO.AddItem(new UIMenuItem("Rifles de precisión pesado MKII", "")); // 237
    armeriaPF_FRANCO.AddItem(new UIMenuItem("Rifle de precisión", "")); // 2
    armeriaPF_FRANCO.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    armeriaPF_FRANCO.ItemSelect.on((item, index) => {

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPF:Francos', (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 5) {
            armeriaPF_FRANCO?.Close(true);
        }
    });

    armeriaPF_FRANCO.MenuClose.on(item => {
        mostrar_armeria_prisionfederal();
        armeriaPF_FRANCO = null;
    });
}

function mostrar_armeria_pf_escopetas() {
    armeriaPF_ESCOPETAS = crearMenu("Escopetas", "", true);
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Mosquete", "Mosquete del siglo 19")); // 37
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Escopeta recortada", "")); // 23
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Escopeta", " ")); // 9
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Escopeta Goma", "Escopeta antidisturbios")); // 240
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Escopeta bullpup", "")); // 35
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Escopeta sweeper", "Escopeta compacta con cargador de tambor")); // 252
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Escopeta pesada", "")); // 15
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de asalto", "")); // 45
    armeriaPF_ESCOPETAS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    armeriaPF_ESCOPETAS.ItemSelect.on((item, index) => {

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPF:Escopetas', (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 8) {
            armeriaPF_ESCOPETAS?.Close(true);
        }
    });

    armeriaPF_ESCOPETAS.MenuClose.on(item => {
        mostrar_armeria_prisionfederal();
        armeriaPF_ESCOPETAS = null;
    });
}

function mostrar_armeria_pf_otros() {
    armeriaPF_OTROS = crearMenu("Otros", "", true);
    armeriaPF_OTROS.AddItem(new UIMenuItem("Botiquin", "")); // 126
    armeriaPF_OTROS.AddItem(new UIMenuItem("Bolsa primeros auxilios", "")); // 461
    armeriaPF_OTROS.AddItem(new UIMenuItem("Extintor", "")); // 3
    armeriaPF_OTROS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    armeriaPF_OTROS.ItemSelect.on((item, index) => {

        if (index < 3) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPF:Otros', (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 3) {
            armeriaPF_OTROS?.Close(true);
        }
    });

    armeriaPF_OTROS.MenuClose.on(item => {
        mostrar_armeria_prisionfederal();
        armeriaPF_OTROS = null;
    });
}


function mostrar_armeria_pf_cargadores(){
    armeriaPF_CARGADORES = crearMenu("Cargadores", "", true);
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Fusil de francotirador pesado", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Fusil de tirador MkII", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Escopeta", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Pistola", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Pistola calibre 50", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Pistola de combate", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Pistola pesada", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Subfusil", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Escopeta pesada", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Ametralladora de combate", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("M4", "")); 
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("M4 MKII", ""));
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Escopeta de goma", ""));
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Carabina especial", ""));
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Pistola MKII", ""));
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Pistola perforante", ""));
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Lanzahumos", ""));
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Pistola de bengalas", ""));
    armeriaPF_CARGADORES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPF_CARGADORES.ItemSelect.on((item, index) => {

        if (index < 18) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPF:Cargadores', (index + 1), enTaquillasFuncionariosFederal);
        }

        // Volver
        if (index == 18) {
            armeriaPF_CARGADORES?.Close(true);
        }
    });

    armeriaPF_CARGADORES.MenuClose.on(item => {
        mostrar_armeria_prisionfederal();
        armeriaPF_CARGADORES = null;
    });
}

}