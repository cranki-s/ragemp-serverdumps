{
mp.events.add("ammunation:mostrar_menu_purga", function () { mostrar_ammunation_purga() });

function mostrar_ammunation_purga() {

    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
    menuAbierto = true;

    let menuAmmunation = crearMenu("Ammunation", "Categorias de armas");
    menuAmmunation.AddItem(new UIMenuItem("Blancas", " "));
    menuAmmunation.AddItem(new UIMenuItem("Pistolas", " "));
    menuAmmunation.AddItem(new UIMenuItem("Subfusiles", " "));
    menuAmmunation.AddItem(new UIMenuItem("Escopetas", " "));
    menuAmmunation.AddItem(new UIMenuItem("Rifles de asalto", " "));
    menuAmmunation.AddItem(new UIMenuItem("Lanzadas", " "));

    menuAmmunation.ItemSelect.on((item, index) => {
        menuAmmunation.setVisible(false);
        menuAmmunation = null;

        switch (index) {
            case 0:
                mostrar_menu_ammunationpurga_blancas();
                break;
            case 1:
                mostrar_menu_ammunationpurga_pistolas();
                break;
            case 2:
                mostrar_menu_ammunationpurga_subfusiles();
                break;
            case 3:
                mostrar_menu_ammunationpurga_escopetas();                         
                break;
            case 4:
                mostrar_menu_ammunationpurga_rifles();
                break;
            case 5:
                mostrar_menu_ammunationpurga_lanzadas();
                break;
        }
    });

    menuAmmunation.MenuClose.on(item => {
        mp.gui.chat.show(true);
        menuAmmunation = null;
        menuAbierto = false;
    });
}

function mostrar_menu_ammunationpurga_blancas() {

    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
    menuAbierto = true;

    let menuAmmunationPurga_blancas = crearMenu("Blancas", " ");
    let AmmuOpcionItem = new UIMenuItem("Daga", "Queréis dejar de poner estas mierdas...");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Bate", "Para esos que juegan al beisbol.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Botella rota", "Si le das con esto le espabilas...");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Palanca", "Hará algo supongo...");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Linterna", "Sin comentarios.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Palo de golf", "Hole in one.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Martillo", "Pablito clavó un clavito.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Hacha", "A cortar leña, joder.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Puño americano", "Símbolo del patriotismo, digo, que mierda es esta.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Cuchillo", "Puede que esto sea incluso más useless que tu puño.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Machete", "¿No ibas a cortar carne?");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Navaja", "Es una mierda, no vas a matar a nadie.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Porra policial", "Conviertete en policía por un día.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Llave inglesa", "Necesitas cambiar unas tuercas.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Hacha de batalla", "Ready to fight.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Taco de billar", "Hora de jugar con tu cabeza.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Hacha de piedra", "Quieres volver a la edad de piedra y lo sabes.");
    AmmuOpcionItem.SetRightLabel("~o~100 pp");
    menuAmmunationPurga_blancas.AddItem(AmmuOpcionItem);
    menuAmmunationPurga_blancas.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuAmmunationPurga_blancas.ItemSelect.on((item, index) => {
        let enMostrador = false;

        /*ammunations.forEach(function (obj)
        {
            if (calcDist(player_local.position, obj.posicion) < 2.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador)
        {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto.');
            return;
        }*/

        if ((tieneObjetoMano()) || (player_local.weapon != 2725352035))
        {
            menuAmmunationPurga_blancas.setVisible(false);
            menuAmmunationPurga_blancas = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            mostrarAviso("danger", 8000, 'Debes tener las manos libres para comprar poder comprar este arma');
            return;
        }

        if (index < 17) {
            menuAmmunationPurga_blancas.setVisible(false);
            menuAmmunationPurga_blancas = null;
            mp.gui.chat.show(true);

            menuAbierto = false;

            //Damos el arma desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:blancas_purga', (index + 1));
        }

        // Volver
        if (index == 17) {
            menuAmmunationPurga_blancas.setVisible(false);
            mostrar_ammunation_purga();
        }
    });

    menuAmmunationPurga_blancas.MenuClose.on(item => {
        mostrar_ammunation_purga();
    });
}

function mostrar_menu_ammunationpurga_pistolas() {

    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
    menuAbierto = true;

    let menuAmmunationPurga_pistolas = crearMenu("Pistolas", " ");
    let AmmuOpcionItem = new UIMenuItem("Pistola", "Pistola de balines.");
    AmmuOpcionItem.SetRightLabel("~o~600 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola Mk II", " ");
    AmmuOpcionItem.SetRightLabel("~o~850 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola de combate", "Esto es de policías, joder.");
    AmmuOpcionItem.SetRightLabel("~o~700 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola perforante", "Esto parece un rifle de asalto.");
    AmmuOpcionItem.SetRightLabel("~o~2000 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Taser", "Bzzz...");
    AmmuOpcionItem.SetRightLabel("~o~300 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola calibre 50", "Calibre 50.");
    AmmuOpcionItem.SetRightLabel("~o~750 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("SNS Pistol", "¿Esto es una pistola?.");
    AmmuOpcionItem.SetRightLabel("~o~350 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("SNS Pistol Mk II", " ");
    AmmuOpcionItem.SetRightLabel("~o~650 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola pesada", "Vale, empezamos a hablar.");
    AmmuOpcionItem.SetRightLabel("~o~700 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola vintage", "Pistola de balines con algunos retoques.");
    AmmuOpcionItem.SetRightLabel("~o~350 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola de tirador", "Cuidado con esto.");
    AmmuOpcionItem.SetRightLabel("~o~1200 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revolver pesado", "Cuidado con esto v2.");
    AmmuOpcionItem.SetRightLabel("~o~1000 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revolver pesado Mk II", " ");
    AmmuOpcionItem.SetRightLabel("~o~1350 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revolver de doble acción", " ");
    AmmuOpcionItem.SetRightLabel("~o~1100 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola de ceramica", " ");
    AmmuOpcionItem.SetRightLabel("~o~750 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revolver de la marina", " ");
    AmmuOpcionItem.SetRightLabel("~o~800 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola perico", "Con esto llegas a Cayo Perico seguro.");
    AmmuOpcionItem.SetRightLabel("~o~600 pp");
    menuAmmunationPurga_pistolas.AddItem(AmmuOpcionItem);
    menuAmmunationPurga_pistolas.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuAmmunationPurga_pistolas.ItemSelect.on((item, index) => {
        let enMostrador = false;

        /*ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 2.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto.');
            return;
        }*/

        if ((tieneObjetoMano()) || (player_local.weapon != 2725352035)) {
            menuAmmunationPurga_pistolas.setVisible(false);
            menuAmmunationPurga_pistolas = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            mostrarAviso("danger", 8000, 'Debes tener las manos libres para comprar poder comprar este arma');
            return;
        }

        if (index < 17) {

            let precioArmaEnPP = 0;

            switch (index) {
                case 0:
                    precioArmaEnPP = 600;
                    break;
                case 1:
                    precioArmaEnPP = 850;
                    break;
                case 2:
                    precioArmaEnPP = 700;
                    break;
                case 3:
                    precioArmaEnPP = 2000;
                    break;
                case 4:
                    precioArmaEnPP = 300;
                    break;
                case 5:
                    precioArmaEnPP = 750;
                    break;
                case 6:
                    precioArmaEnPP = 350;
                    break;
                case 7:
                    precioArmaEnPP = 650;
                    break;
                case 8:
                    precioArmaEnPP = 700;
                    break;
                case 9:
                    precioArmaEnPP = 350;
                    break;
                case 10:
                    precioArmaEnPP = 1200;
                    break;
                case 11:
                    precioArmaEnPP = 1000;
                    break;
                case 12:
                    precioArmaEnPP = 1350;
                    break;
                case 13:
                    precioArmaEnPP = 1100;
                    break;
                case 14:
                    precioArmaEnPP = 750;
                    break;
                case 15:
                    precioArmaEnPP = 800;
                    break;
                case 16:
                    precioArmaEnPP = 600;
                    break;
            }

            menuAmmunationPurga_pistolas.setVisible(false);
            menuAmmunationPurga_pistolas = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            //Damos el arma desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:pistolas_purga', index + 1, precioArmaEnPP);
        }

        // Volver
        if (index == 17) {
            menuAmmunationPurga_pistolas.setVisible(false);
            mostrar_ammunation_purga();
        }
    });

    menuAmmunationPurga_pistolas.MenuClose.on(item => {
        mostrar_ammunation_purga();
    });

}

function mostrar_menu_ammunationpurga_subfusiles() {

    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
    menuAbierto = true;

    let menuAmmunationPurga_subfusiles = crearMenu("Subfusiles", " ");
    let AmmuOpcionItem = new UIMenuItem("UZI", "¿Quien no conoce este arma?");
    AmmuOpcionItem.SetRightLabel("~o~1250 pp");
    menuAmmunationPurga_subfusiles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("MP5", "Ratatatata.");
    AmmuOpcionItem.SetRightLabel("~o~1750 pp");
    menuAmmunationPurga_subfusiles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("MP5 Mk II", " ");
    AmmuOpcionItem.SetRightLabel("~o~2000 pp");
    menuAmmunationPurga_subfusiles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusil de asalto", "Esto parece matar.");
    AmmuOpcionItem.SetRightLabel("~o~1400 pp");
    menuAmmunationPurga_subfusiles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("ADP de combate", "Grapadora.");
    AmmuOpcionItem.SetRightLabel("~o~2000 pp");
    menuAmmunationPurga_subfusiles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("TEC-9", "Hora de convertite en afroamericano.");
    AmmuOpcionItem.SetRightLabel("~o~1250 pp");
    menuAmmunationPurga_subfusiles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Mini SMG", "¿Esto es mini?.");
    AmmuOpcionItem.SetRightLabel("~o~1250 pp");
    menuAmmunationPurga_subfusiles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Gusenberg", "Clásico.");
    AmmuOpcionItem.SetRightLabel("~o~2350 pp");
    menuAmmunationPurga_subfusiles.AddItem(AmmuOpcionItem);
    menuAmmunationPurga_subfusiles.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    menuAmmunationPurga_subfusiles.ItemSelect.on((item, index) => {
        let enMostrador = false;

        /*ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 2.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto.');
            return;
        }*/

        if ((tieneObjetoMano()) || (player_local.weapon != 2725352035)) {
            menuAmmunationPurga_subfusiles.setVisible(false);
            menuAmmunationPurga_subfusiles = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            mostrarAviso("danger", 8000, 'Debes tener las manos libres para comprar poder comprar este arma');
            return;
        }

        if (index < 8) {

            let precioArmaEnPP = 0;

            switch (index) {
                case 0:
                    precioArmaEnPP = 1250;
                    break;
                case 1:
                    precioArmaEnPP = 1750;
                    break;
                case 2:
                    precioArmaEnPP = 2000;
                    break;
                case 3:
                    precioArmaEnPP = 1400;
                    break;
                case 4:
                    precioArmaEnPP = 2000;
                    break;
                case 5:
                    precioArmaEnPP = 1250;
                    break;
                case 6:
                    precioArmaEnPP = 1250;
                    break;
                case 7:
                    precioArmaEnPP = 2350;
                    break;
            }

            menuAmmunationPurga_subfusiles.setVisible(false);
            menuAmmunationPurga_subfusiles = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            //Damos el arma desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:subfusiles_purga', index + 1, precioArmaEnPP);
        }

        // Volver
        if (index == 8) {
            menuAmmunationPurga_subfusiles.setVisible(false);
            mostrar_ammunation_purga();
        }
    });

    menuAmmunationPurga_subfusiles.MenuClose.on(item => {
        mostrar_ammunation_purga(); 
    });

}

function mostrar_menu_ammunationpurga_escopetas() {

    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
    menuAbierto = true;

    let menuAmmunationPurga_escopetas = crearMenu("Escopetas", " ");
    let AmmuOpcionItem = new UIMenuItem("Escopeta", "¿Esto peta?."); 
    AmmuOpcionItem.SetRightLabel("~o~1200 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta recortada", "Para tu pecho.");
    AmmuOpcionItem.SetRightLabel("~o~1000 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de asalto", "Peligro.");
    AmmuOpcionItem.SetRightLabel("~o~1800 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta bullpup", "Bulldog modo shotgun.");
    AmmuOpcionItem.SetRightLabel("~o~1100 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Mosquete", "Tres años para recargar.");
    AmmuOpcionItem.SetRightLabel("~o~1200 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta pesada", "Menudos cartuchos.");
    AmmuOpcionItem.SetRightLabel("~o~2000 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de dos cañones", " ");
    AmmuOpcionItem.SetRightLabel("~o~700 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta Sweeper", "No la he visto en mi vida.");
    AmmuOpcionItem.SetRightLabel("~o~2000 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de combate", " ");
    AmmuOpcionItem.SetRightLabel("~o~2200 pp");
    menuAmmunationPurga_escopetas.AddItem(AmmuOpcionItem);
    menuAmmunationPurga_escopetas.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuAmmunationPurga_escopetas.ItemSelect.on((item, index) => {
        let enMostrador = false;

        /*ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 2.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto.');
            return;
        }*/

        if ((tieneObjetoMano()) || (player_local.weapon != 2725352035)) {
            menuAmmunationPurga_escopetas.setVisible(false);
            menuAmmunationPurga_escopetas = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            mostrarAviso("danger", 8000, 'Debes tener las manos libres para comprar poder comprar este arma');
            return;
        }

        if (index < 9) {

            let precioArmaEnPP = 0;

            switch (index) {
                case 0:
                    precioArmaEnPP = 1200;
                    break;
                case 1:
                    precioArmaEnPP = 1000;
                    break;
                case 2:
                    precioArmaEnPP = 1800;
                    break;
                case 3:
                    precioArmaEnPP = 1100;
                    break;
                case 4:
                    precioArmaEnPP = 1200;
                    break;
                case 5:
                    precioArmaEnPP = 2000;
                    break;
                case 6:
                    precioArmaEnPP = 700;
                    break;
                case 7:
                    precioArmaEnPP = 2000;
                    break;
                case 8:
                    precioArmaEnPP = 2200;
                    break;
            }

            menuAmmunationPurga_escopetas.setVisible(false);
            menuAmmunationPurga_escopetas = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            //Damos el arma desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:escopetas_purga', index + 1, precioArmaEnPP);
        }

        // Volver
        if (index == 9) {
            menuAmmunationPurga_escopetas.setVisible(false);
            mostrar_ammunation_purga();
        }
    });

    menuAmmunationPurga_escopetas.MenuClose.on(item => {
        mostrar_ammunation_purga(); 
    });
}

function mostrar_menu_ammunationpurga_rifles() {

    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
    menuAbierto = true;

    let menuAmmunationPurga_rifles = crearMenu("Rifles de Asalto", " ");
    let AmmuOpcionItem = new UIMenuItem("AK-47", "Recuerda, nada de ruso.");
    AmmuOpcionItem.SetRightLabel("~o~2400 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("AK-47 Mk II", " ");
    AmmuOpcionItem.SetRightLabel("~o~2650 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("M4", "La favorita de todos.");
    AmmuOpcionItem.SetRightLabel("~o~2400 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("M4 Mk II", " ");
    AmmuOpcionItem.SetRightLabel("~o~2550 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Rifle avanzado", "Nos vamos al espacio.");
    AmmuOpcionItem.SetRightLabel("~o~2400 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina especial", "Empezamos a hablar de nuevo.");
    AmmuOpcionItem.SetRightLabel("~o~2500 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina especial Mk II", " ");
    AmmuOpcionItem.SetRightLabel("~o~2650 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Rifle bullpup", "Esto suena a bulldog.");
    AmmuOpcionItem.SetRightLabel("~o~2400 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Rifle bullpup Mk II", " ");
    AmmuOpcionItem.SetRightLabel("~o~2550 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Rifle compacto", "Una AKU de toda la vida.");
    AmmuOpcionItem.SetRightLabel("~o~2350 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Rifle militar", " ");
    AmmuOpcionItem.SetRightLabel("~o~2250 pp");
    menuAmmunationPurga_rifles.AddItem(AmmuOpcionItem);
    menuAmmunationPurga_rifles.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuAmmunationPurga_rifles.ItemSelect.on((item, index) => {
        let enMostrador = false;

        /*ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 2.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto.');
            return;
        }*/

        if ((tieneObjetoMano()) || (player_local.weapon != 2725352035)) {
            menuAmmunationPurga_rifles.setVisible(false);
            menuAmmunationPurga_rifles = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            mostrarAviso("danger", 8000, 'Debes tener las manos libres para comprar poder comprar este arma');
            return;
        }

        if (index < 11) {

            let precioArmaEnPP = 0;

            switch (index) {
                case 0:
                    precioArmaEnPP = 2400;
                    break;
                case 1:
                    precioArmaEnPP = 2650;
                    break;
                case 2:
                    precioArmaEnPP = 2400;
                    break;
                case 3:
                    precioArmaEnPP = 2550;
                    break;
                case 4:
                    precioArmaEnPP = 2400;
                    break;
                case 5:
                    precioArmaEnPP = 2500;
                    break;
                case 6:
                    precioArmaEnPP = 2650;
                    break;
                case 7:
                    precioArmaEnPP = 2400;
                    break;
                case 8:
                    precioArmaEnPP = 2550;
                    break;
                case 9:
                    precioArmaEnPP = 2350;
                    break;
                case 10:
                    precioArmaEnPP = 2250;
                    break;
            }

            menuAmmunationPurga_rifles.setVisible(false);
            menuAmmunationPurga_rifles = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            //Damos el arma desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:rifles_purga', index + 1, precioArmaEnPP);
        }

        // Volver
        if (index == 11) {
            menuAmmunationPurga_rifles.setVisible(false);
            mostrar_ammunation_purga();
        }
    });

    menuAmmunationPurga_rifles.MenuClose.on(item => {
        mostrar_ammunation_purga(); 
    });
}

function mostrar_menu_ammunationpurga_lanzadas() {

    mp.gui.cursor.visible = false;
    mp.gui.chat.show(false);
    menuAbierto = true;

    let menuAmmunationPurga_lanzadas = crearMenu("Lanzadas", " ");
    let AmmuOpcionItem = new UIMenuItem("Granada explosiva", " ");
    AmmuOpcionItem.SetRightLabel("~o~2500 pp");
    menuAmmunationPurga_lanzadas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Gas lacrimogeno", " ");
    AmmuOpcionItem.SetRightLabel("~o~850 pp");
    menuAmmunationPurga_lanzadas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Molotov", " ");
    AmmuOpcionItem.SetRightLabel("~o~850 pp");
    menuAmmunationPurga_lanzadas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Mina con detonador", " ");
    AmmuOpcionItem.SetRightLabel("~o~3000 pp");
    menuAmmunationPurga_lanzadas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Bomba casera", " ");
    AmmuOpcionItem.SetRightLabel("~o~2000 pp");
    menuAmmunationPurga_lanzadas.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Bengala", " ");
    AmmuOpcionItem.SetRightLabel("~o~300 pp");
    menuAmmunationPurga_lanzadas.AddItem(AmmuOpcionItem);
    menuAmmunationPurga_lanzadas.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuAmmunationPurga_lanzadas.ItemSelect.on((item, index) => {
        let enMostrador = false;

        /*ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 2.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto.');
            return;
        }*/

        if ((tieneObjetoMano()) || (player_local.weapon != 2725352035)) {
            menuAmmunationPurga_lanzadas.setVisible(false);
            menuAmmunationPurga_lanzadas = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            mostrarAviso("danger", 8000, 'Debes tener las manos libres para comprar poder comprar este arma');
            return;
        }

        if (index < 6) {

            let precioArmaEnPP = 0;

            switch (index) {
                case 0:
                    precioArmaEnPP = 2500;
                    break;
                case 1:
                    precioArmaEnPP = 850;
                    break;
                case 2:
                    precioArmaEnPP = 850;
                    break;
                case 3:
                    precioArmaEnPP = 3000;
                    break;
                case 4:
                    precioArmaEnPP = 2000;
                    break;
                case 5:
                    precioArmaEnPP = 300;
                    break;
            }

            menuAmmunationPurga_lanzadas.setVisible(false);
            menuAmmunationPurga_lanzadas = null;
            mp.gui.chat.show(true);
            menuAbierto = false;

            //Damos el arma desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:lanzadas_purga', index + 1, precioArmaEnPP);
        }

        // Volver
        if (index == 6) {
            menuAmmunationPurga_lanzadas.setVisible(false);
            mostrar_ammunation_purga();
        }
    });

    menuAmmunationPurga_lanzadas.MenuClose.on(item => {
        mostrar_ammunation_purga();
    });
}




}