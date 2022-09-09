{
/* --------------------------------------------------------------------------------
 * equiparsd.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menu de equipar para la facción LSSD
 *
 * -------------------------------------------------------------------------------- */

mp.events.add("mostrar_equipar_sd", function () { mostrar_equipar_sd() });

function mostrar_equipar_sd() {
    menuEquiparsd = crearMenu("Equipar", "LSSD");
    menuEquiparsd.AddItem(new UIMenuItem("Uniformidades", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Ropa", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Accesorios", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Rangos", "Equipar LSSD"));
    // menuEquiparsd.AddItem(new UIMenuItem("Armas", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Chalecos", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Cascos y gorras", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Guantes", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Placas", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Skins", "Equipar LSSD"));
    menuEquiparsd.AddItem(new UIMenuItem("Cargadores", "Equipar LSSD"));

    menuEquiparsd.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_equipar_sd_uniformidades();
                break;
            case 1:
                mostrar_equipar_sd_ropa();
                break;
            case 2:
                mostrar_equipar_sd_accesorios();
                break;
            case 3:
                mostrar_equipar_sd_rangos();
                break;
            //case 4:
                //mostrar_equipar_sd_armas();
                //break;
            case 4:
                mostrar_equipar_sd_chalecos();
                break;
            case 5:
                mostrar_equipar_sd_cascos();
                break;
            case 6:
                mostrar_equipar_sd_guantes();
                break;
            case 7:
                mostrar_equipar_sd_placas();
                break;
            case 8:
                mostrar_equipar_sd_skins();
                break;
            case 9:
                mostrar_equipar_sd_cargadores();
                break;
            default:
                menuEquiparsd?.Close();
                return;
        }

        menuEquiparsd?.Close(true);
    });

    menuEquiparsd.MenuClose.on(item => {
        menuEquiparsd = null;
    });
}

function mostrar_equipar_sd_uniformidades() {
    menuEquiparsd_uniformidades = crearMenu("Uniformidades", "Uniformes por rango", true);
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Aspirante", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Deputy", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Deputy manga larga", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Deputy Sheriff II", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Corporal", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Sargento", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Teniente", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Capitán", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Comandante", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Jefe de divisiones", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Asistente del sheriff", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Undersheriff", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Sheriff", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Gala", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("STF (Verano)", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("STF (Invierno)", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("OSSB", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Antidisturbios", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Antibombas", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Motorista", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Buzo", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Ciclista", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("SAS", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Abrigo ligero", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Abrigo ligero DS II", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Abrigo ligero Corporal", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Abrigo ligero SGT", ""));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Abrigo grande", ""));
    menuEquiparsd_uniformidades.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    menuEquiparsd_uniformidades.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuEquiparsd_uniformidades.ItemSelect.on((item, index) => {

        if (index < 29) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSD:Uniformidades", (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_uniformidades?.Close(true);
        }
    });

    menuEquiparsd_uniformidades.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_uniformidades = null;
    });
}

function mostrar_equipar_sd_ropa() {
    menuEquiparsd_ropa = crearMenu("Ropa", "Ropa relacionadas con el trabajo", true);
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Pantalon tráfico", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Pantalon STF (Táctico)", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Pantalon STF (Patrullaje)", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Pantalon OSSB", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Pantalon ciclista", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Polo STF", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Polo HU", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Polo SIB", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Camiseta Sheriff", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Camiseta FTO", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Camiseta SAS", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Camiseta HU", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Camiseta NPU", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Camiseta OFRC", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Camiseta PSU", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Cortavientos SIB", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Abrigo ligero", ""));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Abrigo grande", ""));
    menuEquiparsd_ropa.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    menuEquiparsd_ropa.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparsd_ropa.ItemSelect.on((item, index) => {

        if (index < 19) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('EquiparSD:Ropas', (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_ropa?.Close(true);
        }
    });

    menuEquiparsd_ropa.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_ropa = null;
    });
}


function mostrar_equipar_sd_accesorios() {
    menuEquiparsd_ropa_acc = crearMenu("Accesorios", "Accesorios utiles en nuestro trabajo", true);
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(1) BodyCam (Uniforme)", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(1) BodyCam (Chaleco)", ""));
    menuEquiparsd_ropa_acc.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(2) Cinturón con porra", "Cinturón táctico con porra"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(2) Cinturón con taser", "Cinturón táctico con taser"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(2) Cinturón con taser y porra", "Cinturon táctico con taser y porra"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(2) Cinturón STF", ""));
    menuEquiparsd_ropa_acc.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(3) Cinturón sin porra", "Cinturón táctico normal"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(3) Holster", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(3) Pernera táctica", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(3) Cinturón detective", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(3) Holster pecho", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(3) Cinturón STF", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(3) Bombona de oxígeno", ""));
    menuEquiparsd_ropa_acc.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", ""), "Rojo"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(4) Arnés corto", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(4) Arnés largo", ""));
    menuEquiparsd_ropa_acc.AddItem(aplicarColores(new UIMenuItem("Quitar (4)", ""), "Rojo"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(5) Gafas tácticas", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(5) Máscara de buceo", ""));
    menuEquiparsd_ropa_acc.AddItem(aplicarColores(new UIMenuItem("Quitar (5)", ""), "Rojo"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(6) Piganillo táctico", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(6) Mascara de gas", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("(6) Mascara de gas 2", ""));
    menuEquiparsd_ropa_acc.AddItem(aplicarColores(new UIMenuItem("Quitar (6)", ""), "Rojo"));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("Tablet LSSD", ""));
    menuEquiparsd_ropa_acc.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparsd_ropa_acc.ItemSelect.on((item, index) => {

        if (index < 27) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSD:Accesorios", (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_ropa_acc?.Close(true);
        }
    });

    menuEquiparsd_ropa_acc.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_ropa_acc = null;
    });
}

function mostrar_equipar_sd_rangos() {
    menuEquiparsd_rangos = crearMenu("Rangos", "Rangos utiles en nuestro trabajo", true);
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Parche DS II ", ""));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Parche CPL", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Parche Sargento", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Teniente", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Capitán", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Comandante", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Jefe de Divisiones", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Asistente del Sheriff", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Undersheriff", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Sheriff", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Sheriff (Línea)", "(Manga corta)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Parche DS II", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Parche CPL", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Parche Sargento", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Teniente", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Capitán", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Comandante", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Jefe de división", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Asistente del Sheriff", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Undersheriff", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Sheriff", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Pines Sheriff (Linea)", "(Manga larga con corbata - Gala)"));
    menuEquiparsd_rangos.AddItem(aplicarColores(new UIMenuItem("Quitar", ""), "Rojo"));
    menuEquiparsd_rangos.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparsd_rangos.ItemSelect.on((item, index) => {

        if (index < 23) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSD:Rangos", (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_rangos?.Close(true);
        }
    });

    menuEquiparsd_rangos.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_rangos = null;
    });

}

// function mostrar_equipar_sd_armas() {

//     mp.gui.cursor.visible = false;
//     mp.gui.chat.show(false);
//     menuAbierto = true;

//     menuEquiparsd_armas = crearMenu("Armas", "Armas relacionadas con el trabajo");
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Esencial Oficial", "Conjunto de todos los objetos."));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Esencial Mando", "Conjunto de todos los objetos para mandos."));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Pistola", ""));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Pistola de combate", "Arma reglamentaria."));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Pistola de ceramica", ""));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Pistola calibre 50", "Arma para mandos."));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Pistola pesada", ""));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Taser", "Arma no letal."));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Porra policial", ""));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Linterna", " "));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Señal luminosa", "Señal luminosa para dirigir el tráfico."));
//     menuEquiparsd_armas.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

//     menuEquiparsd_armas.ItemSelect.on((item, index) => {

//         if (index < 11) {
//             //Las armas debemos darlas en el propio servidor no por el lado del cliente le enviamos el arma elegida
//             mp.events.callRemote("EquiparSD:Armas", (index + 1));
//         }

//         // Volver
//         if (index == 11) {
//             menuEquiparsd_armas.setVisible(false);
//             mostrar_equipar_sd();
//         }
//     });

//     menuEquiparsd_armas.MenuClose.on(item => {
//         mostrar_equipar_sd();
//     });


// }


function mostrar_equipar_sd_chalecos() {
    menuEquiparsd_chalecos = crearMenu("Chalecos", "Chalecos relacionados con el trabajo", true);
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(1) Kevlar", "50% de armadura"));
    menuEquiparsd_chalecos.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(2) Ajustado", "75% de armadura"));
    menuEquiparsd_chalecos.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(3) Semipesado", "75% de armadura"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(3) Pesado", "75% de armadura"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(3) Tráfico", "75% de armadura"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(3) Reflectante", "0% de armadura"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(3) Antidisturbios", "100% de armadura"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(3) STF", "100% de armadura"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(3) STF Táctico", "100% de armadura"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("(3) Chaleco con radio", "75% de armadura"));
    menuEquiparsd_chalecos.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", ""), "Rojo"));
    menuEquiparsd_chalecos.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparsd_chalecos.ItemSelect.on((item, index) => {

        if (index < 13) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSD:Chalecos", (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_chalecos?.Close(true);
        }
    });

    menuEquiparsd_chalecos.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_chalecos = null;
    });
}


function mostrar_equipar_sd_cascos() {
    menuEquiparsd_cascos = crearMenu("Cascos", "Cascos relacionados con el trabajo", true);
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco básico", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco visión nocturna", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco táctico", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco ANTIBOMBAS", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco STF", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco motorista 1", "Casco con visera abierta"));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco motorista 2", "Casco con visera cerrada"));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco Antidisturbios 1", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco Antidisturbios 2", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Casco piloto", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Auriculares piloto", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Gorra básica verde", ""));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Sombrero FTO", ""));
    menuEquiparsd_cascos.AddItem(aplicarColores(new UIMenuItem("Quitar", "Quita la gorra o casco actual"), "Rojo"));
    menuEquiparsd_cascos.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparsd_cascos.ItemSelect.on((item, index) => {

        if (index < 14) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSD:Cascos", (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_cascos?.Close(true);
        }
    });

    menuEquiparsd_cascos.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_cascos = null;
    });
}

function mostrar_equipar_sd_guantes() {
    menuEquiparsd_guantes = crearMenu("Guantes", "Guantes relacionados con el trabajo", true);
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(1) Tácticos", "(Polo y camiseta)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(1) Anticorte", "(Polo y camiseta)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(1) Latex azules", "(Polo y camiseta)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(1) Gala", "(Polo y camiseta)"));
    menuEquiparsd_guantes.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", "(Polo y camiseta)"), "Rojo"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(2) Tácticos", "(Manga corta)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(2) Anticorte", "(Manga corta)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(2) Latex azules", "(Manga corta)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(2) Gala", "(Manga corta)"));
    menuEquiparsd_guantes.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", "(Manga corta)"), "Rojo"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(3) Tácticos", "(Manga larga)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(3) Anticorte", "(Manga larga)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(3) Latex azules", "(Manga larga)"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("(3) Gala", "(Manga larga)"));
    menuEquiparsd_guantes.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", "(Manga larga)"), "Rojo"));
    menuEquiparsd_guantes.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparsd_guantes.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSD:Guantes", (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_guantes?.Close(true);
        }
    });

    menuEquiparsd_guantes.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_guantes = null;
    });
}


function mostrar_equipar_sd_placas() {
    menuEquiparsd_placas = crearMenu("Placas", "Placas relacionados con el trabajo", true);
    menuEquiparsd_placas.AddItem(new UIMenuItem("(1) Placa cinturón", ""));
    menuEquiparsd_placas.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Deputy", ""));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Sargento", ""));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Teniente", ""));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Capitán", ""));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Comandante", ""));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Jefe de divisiones", ""));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Asistente del Sheriff", ""));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Undersheriff", ""));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(2) Placa pecho Sheriff", ""));
    menuEquiparsd_placas.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    menuEquiparsd_placas.AddItem(new UIMenuItem("(3) Banda negra placa", ""));
    menuEquiparsd_placas.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", ""), "Rojo"));
    menuEquiparsd_placas.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparsd_placas.ItemSelect.on((item, index) => {

        if (index < 14) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSD:Placas", (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_placas?.Close(true);
        }
    });

    menuEquiparsd_placas.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_placas = null;
    });
}


function mostrar_equipar_sd_skins() {
    menuEquiparsd_skins = crearMenu("Skins", "Skins relacionados con el trabajo", true);
    menuEquiparsd_skins.AddItem(new UIMenuItem("PERRO SHERIFF", " "));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Chaleco negro", "PERRO SHERIFF"));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Chaleco verde", "PERRO SHERIFF"));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Chaleco rojo", "PERRO SHERIFF"));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Chaleco azul", "PERRO SHERIFF"));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Pelaje 1", "PERRO SHERIFF"));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Pelaje 2", "PERRO SHERIFF"));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Pelaje 3", "PERRO SHERIFF"));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Pelaje 4", "PERRO SHERIFF"));
    menuEquiparsd_skins.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    menuEquiparsd_skins.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuEquiparsd_skins.ItemSelect.on((item, index) => {

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparSD:Skins", (index + 1));
        }

        if (item.Text == "Volver") {
            menuEquiparsd_skins?.Close(true);
        }
    });

    menuEquiparsd_skins.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_skins = null;
    });
}

function mostrar_equipar_sd_cargadores() {
    menuEquiparsd_cargadores = crearMenu("Cargadores", "Cargadores relacionados con el trabajo", true);
    menuEquiparsd_cargadores.AddItem(new UIMenuItem("Pistola de combate", "Cargador pistola de combate."));
    menuEquiparsd_cargadores.AddItem(new UIMenuItem("Pistola calibre 50", "Cargador pistola calibre 50."));
    menuEquiparsd_cargadores.AddItem(new UIMenuItem("Pistola MKII", "Cargador pistola MKII."));
    menuEquiparsd_cargadores.AddItem(new UIMenuItem("Pistola cerámica", "Cargador pistola cerámica."));
    menuEquiparsd_cargadores.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuEquiparsd_cargadores.ItemSelect.on((item, index) => {

        if (index < 4) {
            //Las armas debemos darlas en el propio servidor no por el lado del cliente le enviamos el arma elegida
            mp.events.callRemote("EquiparSD:Cargadores", (index + 1));
        }


        if (item.Text == "Volver") {
            menuEquiparsd_cargadores?.Close(true);
        }
    });

    menuEquiparsd_cargadores.MenuClose.on(item => {
        mostrar_equipar_sd();
        menuEquiparsd_cargadores = null;
    });
}

}