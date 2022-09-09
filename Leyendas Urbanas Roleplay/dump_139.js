{
/* --------------------------------------------------------------------------------
 * equiparfd.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menu de equipar para la facción de LSFD
 *
 * -------------------------------------------------------------------------------- */

mp.events.add("mostrar_equipar_fd", function () { mostrar_equipar_fd() });

function mostrar_equipar_fd() {
    equiparFD = crearMenu("Equipar", "LSFD");
    equiparFD.AddItem(new UIMenuItem("Uniformes", "Equipar LSFD"));
    equiparFD.AddItem(new UIMenuItem("Accesorios", "Equipar LSFD"));
    //equiparFD.AddItem(new UIMenuItem("Bolsas", "Equipar LSFD")); // METER CON ACCESORIOS
    equiparFD.AddItem(new UIMenuItem("Cascos y gorras", "Equipar LSFD"));
    equiparFD.AddItem(new UIMenuItem("Chalecos", "Equipar LSFD"));
    //equiparFD.AddItem(new UIMenuItem("Decals", "Equipar LSFD")); // METER CON ACCESORIOS
    equiparFD.AddItem(new UIMenuItem("Guantes", "Equipar LSFD"));
    equiparFD.AddItem(new UIMenuItem("Equipamiento", "Equipar LSFD"));
    equiparFD.AddItem(new UIMenuItem("Conos", "Equipar LSFD"));
    //equiparFD.AddItem(new UIMenuItem("Mascaras", "Equipar LSFD")); // METER CON ACCESORIOS
    //equiparFD.AddItem(new UIMenuItem("Placa", "Equipar LSFD")); // METER CON ACCESORIOS
    equiparFD.AddItem(new UIMenuItem("Skins", "Equipar LSFD"));

    equiparFD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_equipar_fd_uniformes();
                break;
            case 1:
                mostrar_equipar_fd_accesorios();
                break;
            case 2:
                mostrar_equipar_fd_cascos();
                break;
            case 3:
                mostrar_equipar_fd_chalecos();
                break;
            case 4:
                mostrar_equipar_fd_guantes();
                break;
            case 5:
                mostrar_equipar_fd_equipamiento();
                break;
            case 6:
                mostrar_equipar_fd_conos();
                break;
            case 7:
                mostrar_equipar_fd_skins();
                break;
            default:
                equiparFD?.Close();
                break;
        }

        equiparFD?.Close(true);
    });

    equiparFD.MenuClose.on(item => {
        equiparFD = null;
    });
}

function mostrar_equipar_fd_uniformes() {
    equiparFD_ROPA = crearMenu("Uniformes", "Uniformes relacionadas con el trabajo", true);
    equiparFD_ROPA.AddItem(new UIMenuItem("Buzo", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Chubasquero (Con capucha)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Chubasquero (Sin capucha)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Paramédico (Verano)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Paramédico (Invierno)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Piloto", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Deportivo (Invierno)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Deportivo (Verano)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Parque 1 (Verano)", "Ropa de parque pantalones paramedico"));
    equiparFD_ROPA.AddItem(new UIMenuItem("Parque 1 (Invierno)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Parque 2 (Verano)", "Ropa de parque pantalones ignifugos"));
    equiparFD_ROPA.AddItem(new UIMenuItem("Parque 2 (Invierno)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Socorrista rojo (pantalón)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Socorrista rojo (bañador)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Socorrista blanco (pantalón)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Socorrista blanco (bañador)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Ignifugo", "Traje ignifugo"));
    equiparFD_ROPA.AddItem(new UIMenuItem("NBQ", "Traje NBQ"));
    equiparFD_ROPA.AddItem(new UIMenuItem("Forestal (Verano)", "Uniforme forestal para verano"));
    equiparFD_ROPA.AddItem(new UIMenuItem("Forestal (Invierno)", "Uniforme forestal para invierno"));
    equiparFD_ROPA.AddItem(new UIMenuItem("Gala", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Gala (Mandos)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Mandos (Verano)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Mandos (Invierno)", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Chief", ""));
    equiparFD_ROPA.AddItem(new UIMenuItem("Asuntos Internos", ""));
    equiparFD_ROPA.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    equiparFD_ROPA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFD_ROPA.ItemSelect.on((item, index) => {

        if (index < 27) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparFD:Uniformidades", (index + 1));
        }

        // Volver
        if (index == 27) {
            equiparFD_ROPA?.Close(true);
        }
    });

    equiparFD_ROPA.MenuClose.on(item => {
        equiparFD_ROPA = null;
        mostrar_equipar_fd();
    });
}

function mostrar_equipar_fd_accesorios() {
    equiparFD_ACCESORIOS = crearMenu("Accesorios ropa", "Accesorios relacionados con el trabajo", true);
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(1) Pinganillo", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(1) Mascara de gas", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(1) Mascara de gas 2", ""));
    equiparFD_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Arnes cintura", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Arnes completo", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Bolsa negra cerrada", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Bolsa negra abierta", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Paracaidas", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Placa bombero", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Placa capitán", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Placa jefe", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(2) Placa investigador", ""));
    equiparFD_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(3) Estetoscopio", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(3) Identificacion", ""));
    equiparFD_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", ""), "Rojo"));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(4) Bombona oxigeno", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(4) ERA", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(4) Riñonera", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(4) Cinturon tactico", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(4) Radio cintura", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(4) Radio cintura y extensión", ""));
    equiparFD_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (4)", ""), "Rojo"));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(5) Pin Capitan", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(5) Pin Teniente", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(5) Pin Jefe", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(5) Decals LSFD", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(5) Decals Paramedico 1", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(5) Decals Paramedico 2", ""));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("(5) Decals Paramedico 3", ""));
    equiparFD_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (5)", ""), "Rojo"));
    equiparFD_ACCESORIOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFD_ACCESORIOS.ItemSelect.on((item, index) => {

        if (index < 32) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparFD:Accesorios", (index + 1));
        }

        // Volver
        if (index == 32) {
            equiparFD_ACCESORIOS?.Close(true);
        }
    });

    equiparFD_ACCESORIOS.MenuClose.on(item => {
        equiparFD_ACCESORIOS = null;
        mostrar_equipar_fd();
    });
}

function mostrar_equipar_fd_cascos() {
    equiparFD_CASCOS = crearMenu("Cascos y gorras", "Cascos y gorras relacionados con el trabajo", true);
    equiparFD_CASCOS.AddItem(new UIMenuItem("Casco amarillo sin gafas", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Casco naranja sin gafas", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Casco chief sin gafas", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Casco amarillo con gafas", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Casco naranja con gafas", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Casco chief con gafas", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Gorra FIRE", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Auriculares", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Auriculares de vuelo", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Casco moto", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Gorra azul", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Gorra gala", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Gorra gala (mandos)", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Gorra verde", ""));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Tactico 1", "Con vision nocturna"));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Tactico 2", "Con vision termica"));
    equiparFD_CASCOS.AddItem(aplicarColores(new UIMenuItem("Quitar", "Quita la gorra o casco actual"), "Rojo"));
    equiparFD_CASCOS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    equiparFD_CASCOS.ItemSelect.on((item, index) => {

        if (index < 17) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparFD:Cascos", (index + 1));
        }

        // Volver
        if (index == 17) {
            equiparFD_CASCOS?.Close(true);
        }
    });

    equiparFD_CASCOS.MenuClose.on(item => {
        equiparFD_CASCOS = null;
        mostrar_equipar_fd();
    });
}

function mostrar_equipar_fd_chalecos() {
    equiparFD_CHALECOS = crearMenu("Chalecos", "Chalecos relacionados con el trabajo", true);
    equiparFD_CHALECOS.AddItem(new UIMenuItem("Salvavidas", ""));
    equiparFD_CHALECOS.AddItem(new UIMenuItem("Ligero naranja", ""));
    equiparFD_CHALECOS.AddItem(new UIMenuItem("Ligero rojo", ""));
    equiparFD_CHALECOS.AddItem(new UIMenuItem("Ligero verde", ""));
    equiparFD_CHALECOS.AddItem(aplicarColores(new UIMenuItem("Quitar", "Quita el chaleco actual"), "Rojo"));
    equiparFD_CHALECOS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    equiparFD_CHALECOS.ItemSelect.on((item, index) => {

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparFD:Chalecos", (index + 1));
        }

        // Volver
        if (index == 5) {
            equiparFD_CHALECOS?.Close(true);
        }
    });

    equiparFD_CHALECOS.MenuClose.on(item => {
        equiparFD_CHALECOS = null;
        mostrar_equipar_fd();
    });
}

function mostrar_equipar_fd_guantes() {
    equiparFD_GUANTES = crearMenu("Guantes", "Guantes relacionados con el trabajo", true);
    equiparFD_GUANTES.AddItem(new UIMenuItem("(1) Tácticos", "(Polo y camiseta)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(1) Anticorte", "(Polo y camiseta)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(1) Latex azules", "(Polo y camiseta)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(1) Gala", "(Polo y camiseta)"));
    equiparFD_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", "(Polo y camiseta)"), "Rojo"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(2) Tácticos", "(Manga corta)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(2) Anticorte", "(Manga corta)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(2) Latex azules", "(Manga corta)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(2) Gala", "(Manga corta)"));
    equiparFD_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", "(Manga corta)"), "Rojo"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(3) Tácticos", "(Manga larga)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(3) Anticorte", "(Manga larga)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(3) Latex azules", "(Manga larga)"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("(3) Gala", "(Manga larga)"));
    equiparFD_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", "(Manga larga)"), "Rojo"));
    equiparFD_GUANTES.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    equiparFD_GUANTES.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparFD:Guantes", (index + 1));
        }

        // Volver
        if (index == 15) {
            equiparFD_GUANTES?.Close(true);
        }
    });

    equiparFD_GUANTES.MenuClose.on(item => {
        equiparFD_GUANTES = null;
        mostrar_equipar_fd();
    });
}

function mostrar_equipar_fd_equipamiento() {
    equiparFD_ARMAS = crearMenu("Equipamiento", "Equipamiento relacionado con el trabajo", true);
    equiparFD_ARMAS.AddItem(new UIMenuItem("Bengala", ""));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Bolsa primeros auxilios", ""));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Botiquín", ""));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Extintor", ""));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Hacha", ""));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Linterna", ""));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Palanca", " "));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Pistola bengalas", ""));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Tablet LSFD", ""));
    equiparFD_ARMAS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    equiparFD_ARMAS.ItemSelect.on((item, index) => {

        if (index < 9) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparFD:Equipamiento", (index + 1));
        }

        // Volver
        if (index == 9) {
            equiparFD_ARMAS?.Close(true);
        }
    });

    equiparFD_ARMAS.MenuClose.on(item => {
        equiparFD_ARMAS = null;
        mostrar_equipar_fd();
    });
}

function mostrar_equipar_fd_conos() {
    equiparFD_CONOS = crearMenu("Conos", "Conos relacionado con el trabajo", true);
    equiparFD_CONOS.AddItem(new UIMenuItem("Barrera luminosa dirección", "")); // 2040
    equiparFD_CONOS.AddItem(new UIMenuItem("Cono luminoso", "")); // 2037
    equiparFD_CONOS.AddItem(new UIMenuItem("Barrera blanca y naranja", "")); // 2035
    equiparFD_CONOS.AddItem(new UIMenuItem("Barrera", "")); // 1765
    equiparFD_CONOS.AddItem(new UIMenuItem("Cono", "")); // 877
    equiparFD_CONOS.AddItem(new UIMenuItem("Barrera de agua", "")); // 2049
    equiparFD_CONOS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    equiparFD_CONOS.ItemSelect.on((item, index) => {

        if (index < 6) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparFD:Conos", (index + 1));
        }

        // Volver
        if (index == 6) {
            equiparFD_CONOS?.Close(true);
        }
    });

    equiparFD_CONOS.MenuClose.on(item => {
        equiparFD_CONOS = null;
        mostrar_equipar_fd();
    });
}

function mostrar_equipar_fd_skins() {
    equiparFD_SKINS = crearMenu("Skins", "Skins relacionadas con el trabajo", true);
    equiparFD_SKINS.AddItem(new UIMenuItem("PERRO RESCUE", " "));
    equiparFD_SKINS.AddItem(new UIMenuItem("Chaleco negro", "PERRO RESCUE"));
    equiparFD_SKINS.AddItem(new UIMenuItem("Chaleco verde", "PERRO RESCUE"));
    equiparFD_SKINS.AddItem(new UIMenuItem("Chaleco rojo", "PERRO RESCUE"));
    equiparFD_SKINS.AddItem(new UIMenuItem("Chaleco azul", "PERRO RESCUE"));
    equiparFD_SKINS.AddItem(new UIMenuItem("Pelaje 1", "PERRO RESCUE"));
    equiparFD_SKINS.AddItem(new UIMenuItem("Pelaje 2", "PERRO RESCUE"));
    equiparFD_SKINS.AddItem(new UIMenuItem("Pelaje 3", "PERRO RESCUE"));
    equiparFD_SKINS.AddItem(new UIMenuItem("Pelaje 4", "PERRO RESCUE"));
    equiparFD_SKINS.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    equiparFD_SKINS.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior"));

    equiparFD_SKINS.ItemSelect.on((item, index) => {

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparFD:Skins", (index + 1));
        }

        // Volver
        if (index == 10) {
            equiparFD_SKINS?.Close(true);
        }
    });

    equiparFD_SKINS.MenuClose.on(item => {
        equiparFD_SKINS = null;
        mostrar_equipar_fd();
    });
}

}