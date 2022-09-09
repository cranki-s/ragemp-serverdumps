{
/* --------------------------------------------------------------------------------
 * equiparpd.js
 *
 * Autor: Zeeky & FerniMoon
 *
 * Descripción: Menu de equipar para la facción LSPD
 *
 * -------------------------------------------------------------------------------- */

var menuEquiparpd;

mp.events.add("mostrar_equipar_pd", function () { mostrar_equipar_pd() });

function mostrar_equipar_pd() {
    menuEquiparpd = crearMenu("Equipar", "LSPD");
    menuEquiparpd.AddItem(new UIMenuItem("Uniformidades", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Ropa", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Accesorios", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Rangos", "Equipar LSPD"));
    // menuEquiparpd.AddItem(new UIMenuItem("Armas", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Chalecos", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Cascos y gorras", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Guantes", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Placas", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Skins", "Equipar LSPD"));
    menuEquiparpd.AddItem(new UIMenuItem("Cargadores", "Equipar LSPD"));

    menuEquiparpd.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_equipar_pd_uniformidades();
                break;
            case 1:
                mostrar_equipar_pd_ropa();
                break;
            case 2:
                mostrar_equipar_pd_accesorios();
                break;
            case 3:
                mostrar_equipar_pd_rangos();
                break;
            // case 4:
                // mostrar_equipar_pd_armas();
                // break;
            case 4:
                mostrar_equipar_pd_chalecos();
                break;
            case 5:
                mostrar_equipar_pd_cascos();
                break;
            case 6:
                mostrar_equipar_pd_guantes();
                break;
            case 7:
                mostrar_equipar_pd_placas();
                break;
            case 8:
                mostrar_equipar_pd_skins();
                break;
            case 9:
                mostrar_equipar_pd_cargadores();
                break;
            default:
                menuEquiparpd?.Close();
                return;
        }

        menuEquiparpd?.Close(true);
    });

    menuEquiparpd.MenuClose.on(item => {
        menuEquiparpd = null;   
    });
}

function mostrar_equipar_pd_uniformidades() {
    menuEquiparpd_uniformidades = crearMenu("Uniformidades", "Uniformes por rango", true);
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Cadete", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga larga", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga larga con 1 tira", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga larga con 2 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga larga con 3 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga larga con 4 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga larga con 5 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga larga con 6 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial III", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial III+", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Sargento", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Sargento II", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Teniente", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Capitán", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Comandante", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Ayudante del Jefe", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Asistente del jefe", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Jefe de policía", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Gala", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Gala con 1 tira", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Gala con 2 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Gala con 3 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Gala con 4 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Gala con 5 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Gala con 6 tiras", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Antidisturbios", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Antibombas", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Motorista", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Buzo", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga larga de tráfico", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Oficial manga corta de tráfico", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Gala de tráfico", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("METRO (Manga corta)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("METRO (Manga larga)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("METRO K9 (Manga corta)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("METRO K9 (Manga larga)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("METRO BS (Manga corta)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("METRO BS (Manga larga)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("SWAT", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("GND (Manga corta)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("GND (Manga larga)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("DSA (Manga corta)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("DSA (Manga larga)", ""));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("DSA (Piloto)", ""));
    menuEquiparpd_uniformidades.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    menuEquiparpd_uniformidades.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuEquiparpd_uniformidades.ItemSelect.on((item, index) => {

        if (index < 46) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPD:Uniformidades", (index + 1));
        }

        // Volver
        if (index == 46) {
            menuEquiparpd_uniformidades?.Close(true);
        }
    });

    menuEquiparpd_uniformidades.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_uniformidades = null;
    });
}

function mostrar_equipar_pd_ropa() {
    menuEquiparpd_ropa = crearMenu("Ropa", "Ropa relacionadas con el trabajo", true);
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Pantalón tráfico", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Pantalón METRO azul", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Pantalón METRO negro", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Pantalón SWAT", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Pantalón GND", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta GND (Manga corta)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta GND (Manga larga)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta METRO (Manga corta)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta METRO (Manga larga)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta METRO K9 (Manga corta)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta METRO K9 (Manga larga)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta METRO BS (Manga corta)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta METRO BS (Manga larga)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta táctica SWAT", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Polo negro", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Polo ciclista", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Polo SWAT", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Polo GND", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Polo RHD", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta tráfico", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta GND", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta METRO", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta RHD", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta OCTF", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta DSA", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Camiseta OFCOM", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo ligero", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo ligero PO III", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo ligero PO III+", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo ligero DTC I", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo ligero DTC II", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo ligero DTC III", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo ligero SGT I", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo ligero SGT II", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo grande", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo grande GND (Uniforme)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Abrigo grande GND (Camiseta)", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Cortavientos tráfico", ""));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Cortavientos RHD", ""));
    menuEquiparpd_ropa.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    menuEquiparpd_ropa.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparpd_ropa.ItemSelect.on((item, index) => {

        if (index < 40) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('EquiparPD:Ropas', (index + 1));
        }

        // Volver
        if (index == 40) {
            menuEquiparpd_ropa?.Close(true);
        }
    });

    menuEquiparpd_ropa.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_ropa = null;
    });
}

function mostrar_equipar_pd_accesorios() {
    menuEquiparpd_accesorios = crearMenu("Accesorios", "Accesorios utiles en nuestro trabajo", true);
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(1) BodyCam (Uniforme)", ""));
    menuEquiparpd_accesorios.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(2) BodyCam (Chaleco)", ""));
    menuEquiparpd_accesorios.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(3) Cinturón con porra", "Cinturón táctico con porra"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(3) Cinturón con taser", "Cinturón táctico con taser"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(3) Cinturón con taser y porra", "Cinturon táctico con taser y porra"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(3) Cinturón METRO", ""));
    menuEquiparpd_accesorios.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", ""), "Rojo"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(4) Cinturón sin porra", "Cinturón táctico normal"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(4) Holster", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(4) Pernera táctica", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(4) Cinturón detective", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(4) Cinturón SWAT", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(4) Bombona de oxígeno", ""));
    menuEquiparpd_accesorios.AddItem(aplicarColores(new UIMenuItem("Quitar (4)", ""), "Rojo"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(5) Arnés corto", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(5) Arnés largo", ""));
    menuEquiparpd_accesorios.AddItem(aplicarColores(new UIMenuItem("Quitar (5)", ""), "Rojo"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(6) Gafas tácticas", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(6) Máscara de buceo", ""));
    menuEquiparpd_accesorios.AddItem(aplicarColores(new UIMenuItem("Quitar (6)", ""), "Rojo"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(7) Piganillo táctico", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(7) Mascara de gas", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("(7) Mascara de gas 2", ""));
    menuEquiparpd_accesorios.AddItem(aplicarColores(new UIMenuItem("Quitar (7)", ""), "Rojo"));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("Tablet LSPD", ""));
    menuEquiparpd_accesorios.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparpd_accesorios.ItemSelect.on((item, index) => {

        if (index < 27)
        {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPD:Accesorios", (index + 1));
        }

        // Volver
        if (index == 27)
        {
            menuEquiparpd_accesorios?.Close(true);
        }
    });

    menuEquiparpd_accesorios.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_accesorios = null;
    });
}

function mostrar_equipar_pd_rangos() {
    menuEquiparpd_rangos = crearMenu("Rangos", "Rangos utiles en nuestro trabajo", true);
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Oficial III (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Oficial III+ (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Sargento I (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Sargento II (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Detective I (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Detective II (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Detective III (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Teniente (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Capitán (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Comandante (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Ayudante del Jefe (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Asistente del Jefe (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Jefe de Policía (Manga corta)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Oficial III (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Oficial III+ (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Sargento I (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Sargento II (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Detective I (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Detective II (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Parche Detective III (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Teniente (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Capitán (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Comandante (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Ayudante del Jefe (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Asistente del Jefe (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Pines Jefe de Policía (Manga larga)", "Solo disponible para miembros con ese rango"));
    menuEquiparpd_rangos.AddItem(aplicarColores(new UIMenuItem("Quitar", ""), "Rojo"));
    menuEquiparpd_rangos.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparpd_rangos.ItemSelect.on((item, index) => {

        if (index < 27) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPD:Rangos", (index + 1));
        }

        // Volver
        if (index == 27) {
            menuEquiparpd_rangos?.Close(true);
        }
    });

    menuEquiparpd_rangos.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_rangos = null;
    });
}

// function mostrar_equipar_pd_armas() {

//     mp.gui.cursor.visible = false;
//     mp.gui.chat.show(false);
//     menuAbierto = true;

//     menuEquiparpd_armas = crearMenu("Armas", "Armas relacionadas con el trabajo");
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Esencial Oficial", "Conjunto de todos los objetos."));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Esencial Mando", "Conjunto de todos los objetos para mandos."));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Pistola de combate", "Arma reglamentaria."));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Pistola calibre 50", "Arma para mandos."));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Pistola MKII", ""));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Pistola cerámica", ""));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Taser", "Arma no letal."));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Porra policial", ""));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Linterna", " "));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Señal luminosa", "Señal luminosa para dirigir el tráfico."));
//     menuEquiparpd_armas.AddItem(new UIMenuItem("Volver", "~w~Vuelve al menú anterior."));

//     menuEquiparpd_armas.ItemSelect.on((item, index) => {

//         if (index < 10)
//         {
//             //Las armas debemos darlas en el propio servidor no por el lado del cliente le enviamos el arma elegida
//             mp.events.callRemote("EquiparPD:Armas", (index + 1));
//         }

//         // Volver
//         if (index == 10)
//         {
//             menuEquiparpd_armas.setVisible(false);
//             mostrar_equipar_pd();
//         }
//     });

//     menuEquiparpd_armas.MenuClose.on(item => {
//         mostrar_equipar_pd();
//     });


// }


function mostrar_equipar_pd_chalecos() {
    menuEquiparpd_chalecos = crearMenu("Chalecos", "Chalecos relacionados con el trabajo", true);
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(1) Kevlar", "50% de armadura"));
    menuEquiparpd_chalecos.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(2) Ajustado", "75% de armadura"));
    menuEquiparpd_chalecos.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) Semipesado", "75% de armadura"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) Pesado", "75% de armadura"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) Tráfico", "75% de armadura"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) Reflectante", "0% de armadura"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) Antidisturbios", "100% de armadura"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) GND", "75% de armadura"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) RHD", "75% de armadura"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) METRO", "100% de armadura"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("(3) SWAT", "100% de armadura"));
    menuEquiparpd_chalecos.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", ""), "Rojo"));
    menuEquiparpd_chalecos.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparpd_chalecos.ItemSelect.on((item, index) => {

        if (index < 14)
        {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPD:Chalecos", (index + 1));
        }

        // Volver
        if (index == 14)
        {
            menuEquiparpd_chalecos?.Close(true);
        }
    });

    menuEquiparpd_chalecos.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_chalecos = null;
    });
}


function mostrar_equipar_pd_cascos() {
    menuEquiparpd_cascos = crearMenu("Cascos y gorras", "Cascos y gorras relacionados con el trabajo", true);
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco básico", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco visión nocturna", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco táctico", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco ANTIBOMBAS", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco METRO", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco motorista 1", "Casco con visera abierta"));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco motorista 2", "Casco con visera cerrada"));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco Antidisturbios 1", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco Antidisturbios 2", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Casco piloto", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Auriculares piloto", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Gorra de gala", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Gorra de gala (mandos)", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Gorra básica negra", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Gorra básica azul", ""));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Sombrero FTO", ""));
    menuEquiparpd_cascos.AddItem(aplicarColores(new UIMenuItem("Quitar", "Quita la gorra o casco actual"), "Rojo"));
    menuEquiparpd_cascos.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparpd_cascos.ItemSelect.on((item, index) => {

        if (index < 17)
        {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPD:Cascos", (index + 1));
        }

        // Volver
        if (index == 17)
        {
            menuEquiparpd_cascos?.Close(true);
        }
    });

    menuEquiparpd_cascos.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_cascos = null;
    });
}

function mostrar_equipar_pd_guantes() {
    menuEquiparpd_guantes = crearMenu("Guantes", "Guantes relacionados con el trabajo", true);
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(1) Tácticos", "(Polo y camiseta)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(1) Anticorte", "(Polo y camiseta)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(1) Latex azules", "(Polo y camiseta)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(1) Gala", "(Polo y camiseta)"));
    menuEquiparpd_guantes.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", "(Polo y camiseta)"), "Rojo"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(2) Tácticos", "(Manga corta)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(2) Anticorte", "(Manga corta)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(2) Latex azules", "(Manga corta)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(2) Gala", "(Manga corta)"));
    menuEquiparpd_guantes.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", "(Manga corta)"), "Rojo"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(3) Tácticos", "(Manga larga)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(3) Anticorte", "(Manga larga)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(3) Latex azules", "(Manga larga)"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("(3) Gala", "(Manga larga)"));
    menuEquiparpd_guantes.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", "(Manga larga)"), "Rojo"));
    menuEquiparpd_guantes.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparpd_guantes.ItemSelect.on((item, index) => {

        if (index < 15)
        {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPD:Guantes", (index + 1));
        }

        // Volver
        if (index == 15)
        {
            menuEquiparpd_guantes?.Close(true);
        }
    });

    menuEquiparpd_guantes.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_guantes = null;
    });
}

function mostrar_equipar_pd_placas() {
    menuEquiparpd_placas = crearMenu("Placas", "Placas relacionados con el trabajo", true);
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cuello Oficial", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cuello Detective", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cuello Sargento", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cuello Teniente", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cuello Capitán", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Oficial", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Detective", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Sargento", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Teniente", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Capitán", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Comandante", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Ayudante del Jefe", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Asistente del Jefe", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa pecho Jefe de Policía", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Oficial", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Detective", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Sargento", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Teniente", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Capitán", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Comandante", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Ayudante del Jefe", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Asistente del Jefe", ""));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(1) Placa cinturon Jefe de Policía", ""));
    menuEquiparpd_placas.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    menuEquiparpd_placas.AddItem(new UIMenuItem("(2) Banda negra placa", ""));
    menuEquiparpd_placas.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    menuEquiparpd_placas.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    menuEquiparpd_placas.ItemSelect.on((item, index) => {

        if (index < 26)
        {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparPD:Placas", (index + 1));
        }

        // Volver
        if (index == 26)
        {
            menuEquiparpd_placas?.Close(true);
        }
    });

    menuEquiparpd_placas.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_placas = null;
    });
}


function mostrar_equipar_pd_skins() {
    menuEquiparpd_skins = crearMenu("Skins", "Skins relacionados con el trabajo", true);
    menuEquiparpd_skins.AddItem(new UIMenuItem("PERRO POLICE", " "));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Chaleco negro", "PERRO POLICE"));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Chaleco verde", "PERRO POLICE"));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Chaleco rojo", "PERRO POLICE"));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Chaleco azul", "PERRO POLICE"));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Pelaje 1", "PERRO POLICE"));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Pelaje 2", "PERRO POLICE"));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Pelaje 3", "PERRO POLICE"));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Pelaje 4", "PERRO POLICE"));
    menuEquiparpd_skins.AddItem(aplicarColores(new UIMenuItem("Vestirse", ""), "Amarillo"));
    menuEquiparpd_skins.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuEquiparpd_skins.ItemSelect.on((item, index) => {
        if (item.Text != "Volver") {
            if (index < 10) {
                //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
                mp.events.callRemote("EquiparPD:Skins", (index + 1));
            }
        }
        else {
            menuEquiparpd_skins?.Close(true);
        }
    });

    menuEquiparpd_skins.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_skins = null;
    });
}

function mostrar_equipar_pd_cargadores() {
    menuEquiparpd_cargadores = crearMenu("Cargadores", "Cargadores relacionados con el trabajo", true);
    menuEquiparpd_cargadores.AddItem(new UIMenuItem("Pistola de combate", "Cargador pistola de combate."));
    menuEquiparpd_cargadores.AddItem(new UIMenuItem("Pistola calibre 50", "Cargador pistola calibre 50."));
    menuEquiparpd_cargadores.AddItem(new UIMenuItem("Pistola MKII", "Cargador pistola MKII."));
    menuEquiparpd_cargadores.AddItem(new UIMenuItem("Pistola cerámica", "Cargador pistola cerámica."));
    menuEquiparpd_cargadores.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    menuEquiparpd_cargadores.ItemSelect.on((item, index) => {
        if (item.Text != "Volver") {
            if (index < 4) {
                //Las armas debemos darlas en el propio servidor no por el lado del cliente le enviamos el arma elegida
                mp.events.callRemote("EquiparPD:Cargadores", (index + 1));
            }
        }
        else {
            menuEquiparpd_cargadores?.Close(true);
        }
    });

    menuEquiparpd_cargadores.MenuClose.on(item => {
        mostrar_equipar_pd();
        menuEquiparpd_cargadores = null;
    });
}

}