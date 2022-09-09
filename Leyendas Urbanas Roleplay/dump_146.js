{
/* --------------------------------------------------------------------------------
 * equiparfib.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menu de equipar y armeria para la facción FIB
 *
 * -------------------------------------------------------------------------------- */

mp.events.add("mostrar_equipar_fib", function () { mostrar_equipar_fib() });

function mostrar_equipar_fib() {
    equiparFIB = crearMenu("Equipar", "FIB");
    equiparFIB.AddItem(new UIMenuItem("Uniformidades", ""));
    equiparFIB.AddItem(new UIMenuItem("Ropa", ""));
    equiparFIB.AddItem(new UIMenuItem("Accesorios", ""));
    equiparFIB.AddItem(new UIMenuItem("Guantes", ""));
    equiparFIB.AddItem(new UIMenuItem("Chalecos", ""));
    equiparFIB.AddItem(new UIMenuItem("Cascos", ""));
    equiparFIB.AddItem(new UIMenuItem("Equipo", ""));
    equiparFIB.AddItem(new UIMenuItem("Skins", ""));

    equiparFIB.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_equipar_fib_uniformidades();
                break;
            case 1:
                mostrar_equipar_fib_ropa();
                break;
            case 2:
                mostrar_equipar_fib_accesorios();
                break;
            case 3:
                mostrar_equipar_fib_guantes();
                break;
            case 4:
                mostrar_equipar_fib_chalecos();
                break;
            case 5:
                mostrar_equipar_fib_cascos();
                break;
            case 6:
                mostrar_equipar_fib_equipo();
                break;
            case 7:
                mostrar_equipar_fib_skins();
                break;
            default:
                equiparFIB?.Close();
                return;
        }

        equiparFIB?.Close(true);
    });

    equiparFIB.MenuClose.on(item => {
        equiparFIB = null;
    });
}

function mostrar_equipar_fib_uniformidades() {
    equiparFIB_ROPA = crearMenu("Uniformidades", "Uniformidades relacionados con el trabajo", true);
    equiparFIB_ROPA.AddItem(new UIMenuItem("Manga corta", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Manga larga", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Gala", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Deporte (Corto)", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Deporte (Largo)", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("SWAT", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Buzo", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Piloto", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Antibomba", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("NBQ", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Paramedico", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Basurero", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Autobusero", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Pescador", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Cartero", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Minero", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Reponedor", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Temporero", ""));
    equiparFIB_ROPA.AddItem(aplicarColores(new UIMenuItem("Vestirse", "Vistes con tu ropa normal"), "Amarillo"));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparFIB_ROPA.ItemSelect.on((item, index) => {

        if (index < 19) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("equiparFIB_UNIFORMIDADES", (index + 1));
        }

        // Volver
        if (index == 19) {
            equiparFIB_ROPA?.Close(true);
        }
    });

    equiparFIB_ROPA.MenuClose.on(item => {
        mostrar_equipar_fib();
        equiparFIB_ROPA = null;
    });
}

function mostrar_equipar_fib_ropa() {
    equiparFIB_ROPA = crearMenu("Ropa", "Ropa relacionada con el trabajo", true);
    equiparFIB_ROPA.AddItem(new UIMenuItem("Chaqueta FIB", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Chaqueta FIB (traje)", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Polo", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Camiseta corta", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Camiseta larga", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Camiseta larga corbata", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Camiseta táctica", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Pantalón táctico", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Pantalón de instrucción", ""));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Camista deporte", ""));
    equiparFIB_ROPA.AddItem(aplicarColores(new UIMenuItem("Vestirse", "Vistes con tu ropa normal"), "Amarillo"));
    equiparFIB_ROPA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparFIB_ROPA.ItemSelect.on((item, index) => {

        if (index < 11) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("equiparFIB_ROPA", (index + 1));
        }

        // Volver
        if (index == 11) {
            equiparFIB_ROPA?.Close(true);
        }
    });

    equiparFIB_ROPA.MenuClose.on(item => {
        mostrar_equipar_fib();
        equiparFIB_ROPA = null;
    });
}

function mostrar_equipar_fib_accesorios() {
    equiparFIB_ACCESORIOS = crearMenu("Accesorios", "Accesorios utiles para el trabajo", true);
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(1) Máscara antigas", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(1) Pinganillo blanco", ""));
    equiparFIB_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(2) Pines abiertos", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(2) Pines cerrados", ""));
    equiparFIB_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(3) Identificacion", ""));
    equiparFIB_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", ""), "Rojo"));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(4) Holster", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(4) Pernera táctica", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(4) Holster con cargadores", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(4) Holster torso", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(4) Bombona oxígeno", "Ponte esto estando en el agua"));
    equiparFIB_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (4)", ""), "Rojo"));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(5) Placa cinturón", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(5) Cinturón con taser", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(5) Cinturón con taser y porra", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(5) Cinturón SWAT", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(5) Holster torso (traje)", ""));
    equiparFIB_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (5)", ""), "Rojo"));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(6) Placa torso", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(6) Placa colgada", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(6) Arnés pantalón", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(6) Arnés completo", ""));
    equiparFIB_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (6)", ""), "Rojo"));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(7) Gafas balísticas", ""));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("(7) Máscara de buceo", ""));
    equiparFIB_ACCESORIOS.AddItem(aplicarColores(new UIMenuItem("Quitar (7)", ""), "Rojo"));
    equiparFIB_ACCESORIOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparFIB_ACCESORIOS.ItemSelect.on((item, index) => {

        if (index < 28) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("equiparFIB_ACCESORIOS", (index + 1));
        }

        // Volver
        if (index == 28) {
            equiparFIB_ACCESORIOS?.Close(true);
        }
    });

    equiparFIB_ACCESORIOS.MenuClose.on(item => {
        mostrar_equipar_fib();
        equiparFIB_ACCESORIOS = null;
    });
}

function mostrar_equipar_fib_guantes() {
    equiparFIB_GUANTES = crearMenu("Guantes", "Guantes relacionados con el trabajo", true);
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(1) Tácticos", "(Polo y camiseta)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(1) Anticorte", "(Polo y camiseta)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(1) Latex azules", "(Polo y camiseta)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(1) Gala", "(Polo y camiseta)"));
    equiparFIB_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", "(Polo y camiseta)"), "Rojo"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(2) Tácticos", "(Manga corta)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(2) Anticorte", "(Manga corta)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(2) Latex azules", "(Manga corta)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(2) Gala", "(Manga corta)"));
    equiparFIB_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", "(Manga corta)"), "Rojo"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(3) Tácticos", "(Manga larga)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(3) Anticorte", "(Manga larga)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(3) Latex azules", "(Manga larga)"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("(3) Gala", "(Manga larga)"));
    equiparFIB_GUANTES.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", "(Manga larga)"), "Rojo"));
    equiparFIB_GUANTES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_GUANTES.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("equiparFIB_GUANTES", (index + 1));
        }

        // Volver
        if (index == 15) {
            equiparFIB_GUANTES?.Close(true);
        }
    });

    equiparFIB_GUANTES.MenuClose.on(item => {
        mostrar_equipar_fib();
        equiparFIB_GUANTES = null;
    });
}

function mostrar_equipar_fib_chalecos() {
    equiparFIB_CHALECOS = crearMenu("Chalecos", "Chalecos relacionados con el trabajo", true);
    equiparFIB_CHALECOS.AddItem(new UIMenuItem("(1) Kevlar", "50% de armadura"));
    equiparFIB_CHALECOS.AddItem(aplicarColores(new UIMenuItem("Quitar (1)", ""), "Rojo"));
    equiparFIB_CHALECOS.AddItem(new UIMenuItem("(2) Ajustado", "75% de armadura"));
    equiparFIB_CHALECOS.AddItem(aplicarColores(new UIMenuItem("Quitar (2)", ""), "Rojo"));
    equiparFIB_CHALECOS.AddItem(new UIMenuItem("(3) Ligero azul 1", "80% de armadura"));
    equiparFIB_CHALECOS.AddItem(new UIMenuItem("(3) Ligero azul 2", "80% de armadura"));
    equiparFIB_CHALECOS.AddItem(new UIMenuItem("(3) Ligero verde", "80% de armadura"));
    equiparFIB_CHALECOS.AddItem(new UIMenuItem("(3) SWAT", "100% de armadura"));
    equiparFIB_CHALECOS.AddItem(aplicarColores(new UIMenuItem("Quitar (3)", ""), "Rojo"));
    equiparFIB_CHALECOS.AddItem(new UIMenuItem("(4) Táctico", "100% de armadura"));
    equiparFIB_CHALECOS.AddItem(aplicarColores(new UIMenuItem("Quitar (4)", ""), "Rojo"));
    equiparFIB_CHALECOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparFIB_CHALECOS.ItemSelect.on((item, index) => {

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("equiparFIB_CHALECOS", (index + 1));
        }

        // Volver
        if (index == 10) {
            equiparFIB_CHALECOS?.Close(true);
        }
    });

    equiparFIB_CHALECOS.MenuClose.on(item => {
        mostrar_equipar_fib();
        equiparFIB_CHALECOS = null;
    });
}

function mostrar_equipar_fib_cascos() {
    equiparFIB_CASCOS = crearMenu("Cascos", "Cascos relacionados con el trabajo", true);
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco táctico", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco nocturno", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco infrarrojos", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco kevlar", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco básico", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco aéreo", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco pesado (arriba)", "Perfecto de usar con uniforme Antibomba"));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco pesado (abajo)", "Perfecto de usar con uniforme Antibomba"));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Casco de minero", "Se debe usar con el uniforme Minero"));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Auriculares de vuelo", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Gorra azul dorada", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Gorra azul blanca", ""));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Gorra de cartero", "Se debe usar con el uniforme Cartero"));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Sombrero temporero", "Se debe usar con el uniforme Temporero"));
    equiparFIB_CASCOS.AddItem(aplicarColores(new UIMenuItem("Quitar", "Quita la gorra o casco actual"), "Rojo"));
    equiparFIB_CASCOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_CASCOS.ItemSelect.on((item, index) => {

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("equiparFIB_CASCOS", (index + 1));
        }

        // Volver
        if (index == 15) {
            equiparFIB_CASCOS?.Close(true);
        }
    });

    equiparFIB_CASCOS.MenuClose.on(item => {
        mostrar_equipar_fib();
        equiparFIB_CASCOS = null;
    });
}

function mostrar_equipar_fib_equipo() {
    equiparFIB_EQUIPO = crearMenu("Equipo", "Equipo util para el trabajo", true);
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Taser", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Gas lacrimógeno", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Ordenador portátil (abierto)", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Cuchillo", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Alicates", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Almadena", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Binoculares", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Botiquin", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Cámara de fotos", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Escudo antidisturbios", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Lanzahumo", "Tiene 10 cargas de humo en el cargador"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Linterna", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Megáfono", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Palanca", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Paracaidas", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Protector auditivo", ""));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Walkie-talkie"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Tablet FIB"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Cargador pistola de combate"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Cargador pistola cerámica"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Cargador pistola MKII"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Cargador pistola pesada"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Marcador FIB"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Optiwand"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Documentos confidenciales"));
    equiparFIB_EQUIPO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior."));

    equiparFIB_EQUIPO.ItemSelect.on((item, index) => {

        if (index < 25) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("equiparFIB_EQUIPO", (index + 1));
        }

        // Volver
        if (index == 25) {
            equiparFIB_EQUIPO?.Close(true);
        }
    });

    equiparFIB_EQUIPO.MenuClose.on(item => {
        mostrar_equipar_fib();
        equiparFIB_EQUIPO = null;
    });
}

function mostrar_equipar_fib_skins() {
    equiparFIB_SKINS = crearMenu("Skins", "Skins relacionadas con el trabajo", true);
    equiparFIB_SKINS.AddItem(new UIMenuItem("PERRO FIB", " "));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Chaleco negro", "PERRO FIB"));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Chaleco verde", "PERRO FIB"));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Chaleco rojo", "PERRO FIB"));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Chaleco azul", "PERRO FIB"));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Pelaje 1", "PERRO FIB"));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Pelaje 2", "PERRO FIB"));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Pelaje 3", "PERRO FIB"));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Pelaje 4", "PERRO FIB"));
    equiparFIB_SKINS.AddItem(aplicarColores(new UIMenuItem("Vestirse", "Vistes con tu ropa normal"), "Amarillo"));
    equiparFIB_SKINS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_SKINS.ItemSelect.on((item, index) => {

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("equiparFIB_SKINS", (index + 1));
        }

        // Volver
        if (index == 10) {
            equiparFIB_SKINS?.Close(true);
        }
    });

    equiparFIB_SKINS.MenuClose.on(item => {
        equiparFIB_SKINS = null;
        mostrar_equipar_fib();
    });
}





mp.events.add("mostrar_armeria_fib", function () { mostrar_equipar_fib_armamento() });

// ARMERIA FIB

function mostrar_equipar_fib_armamento() {
    equiparFIB_ARMAMENTO = crearMenu("Armeria", "FIB");
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Blancas", ""));
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Pistolas", ""));
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Ametralladoras", ""));
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Rifles de asalto", ""));
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Francotiradores", ""));
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Escopetas", ""));
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Armas lanzadas", ""));
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Cargadores", ""));
    equiparFIB_ARMAMENTO.AddItem(new UIMenuItem("Conos", ""));

    equiparFIB_ARMAMENTO.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_equipar_fib_armamento_blancas();
                break;
            case 1:
                mostrar_equipar_fib_armamento_pistolas();
                break;
            case 2:
                mostrar_equipar_fib_armamento_ametralladoras();
                break;
            case 3:
                mostrar_equipar_fib_armamento_riflesdeasalto();
                break;
            case 4:
                mostrar_equipar_fib_armamento_francotiradores();
                break;
            case 5:
                mostrar_equipar_fib_armamento_escopetas();
                break;
            case 6:
                mostrar_equipar_fib_armamento_armaslanzadas();
                break;
            case 7:
                mostrar_equipar_fib_armamento_cargadores();
                break;
            case 8:
                mostrar_equipar_fib_armamento_conos();
                break;
            default:
                equiparFIB_ARMAMENTO?.Close();
                return;
        }

        equiparFIB_ARMAMENTO?.Close(true);
    });

    equiparFIB_ARMAMENTO.MenuClose.on(item => {
        equiparFIB_ARMAMENTO = null;
    });
}

function mostrar_equipar_fib_armamento_blancas() {
    equiparFIB_ARMAMENTO_BLANCAS = crearMenu("Blancas", "Armas de mano o armas blancas", true);
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Cuchillo", "")); // 33
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Palanca", "Gordon Freeman")); // 28
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Hacha", "")); // 47
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Machete", "")); // 44
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Linterna", "")); // 29
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Navaja", "")); // 243
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Llave inglesa", "Usada para arreglar vehículos, o problemas personales")); // 34
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Hacha de batalla", "")); // 217
    equiparFIB_ARMAMENTO_BLANCAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_BLANCAS.ItemSelect.on((item, index) => {

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_BLANCAS', (index + 1));
        }

        // Volver
        if (index == 8) {
            equiparFIB_ARMAMENTO_BLANCAS?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_BLANCAS.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_BLANCAS = null;
    });
}

function mostrar_equipar_fib_armamento_pistolas() {
    equiparFIB_ARMAMENTO_PISTOLAS = crearMenu("Pistolas", " ", true);
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Pistola de bengalas", "")); // 17
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("SNS Pistol", "Pistola de dimensiones muy pequeñas")); // 39
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("SNS Pistol MKII", "Pistola de dimensiones muy pequeñas potente")); // 248
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Pistola de combate", "")); // 20
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Pistola", "")); // 8
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Pistola MKII", "Pistola usada por cuerpos del estado")); // 247
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Pistola AP", "Pistola automática")); // 215
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Pistola pesada", "Pistola táctica con mira incorporada")); // 43
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Pistola calibre 50", "")); // 32
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Revólver", "")); // 245
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Revólver MKII", "")); // 249
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Pistola de cerámica", "")); // 1093
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Revólver de la Marina", "")); // 1094
    equiparFIB_ARMAMENTO_PISTOLAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_PISTOLAS.ItemSelect.on((item, index) => {

        if (index < 13) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_PISTOLAS', (index + 1));
        }

        // Volver
        if (index == 13) {
            equiparFIB_ARMAMENTO_PISTOLAS?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_PISTOLAS.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_PISTOLAS = null;
    });
}

function mostrar_equipar_fib_armamento_ametralladoras() {
    equiparFIB_ARMAMENTO_AMETRALLADORAS = crearMenu("Ametralladoras", " ", true);
    equiparFIB_ARMAMENTO_AMETRALLADORAS.AddItem(new UIMenuItem("MP5", "")); // 12
    equiparFIB_ARMAMENTO_AMETRALLADORAS.AddItem(new UIMenuItem("MP5 MKII", "Versión de la MP5 sin culata")); // 227
    equiparFIB_ARMAMENTO_AMETRALLADORAS.AddItem(new UIMenuItem("Subfusil de asalto", "Subfusil de uso militar")); // 46
    equiparFIB_ARMAMENTO_AMETRALLADORAS.AddItem(new UIMenuItem("Combat PDW", "Subfusil táctico")); // 5
    equiparFIB_ARMAMENTO_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora ligera", "")); // 228
    equiparFIB_ARMAMENTO_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora de combate", "")); // 26
    equiparFIB_ARMAMENTO_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora de combate MKII", "")); // 231
    equiparFIB_ARMAMENTO_AMETRALLADORAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_AMETRALLADORAS.ItemSelect.on((item, index) => {

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_AMETRALLADORAS', (index + 1));
        }

        // Volver
        if (index == 7) {
            equiparFIB_ARMAMENTO_AMETRALLADORAS?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_AMETRALLADORAS.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_AMETRALLADORAS = null;
    });
}

function mostrar_equipar_fib_armamento_riflesdeasalto() {
    equiparFIB_ARMAMENTO_RILFES = crearMenu("Rifles de asalto", " ", true);
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("Rifle avanzado", "")); // 38
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("Rifle bullpup", " ")); // 24
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("Rifle bullpup MKII", "Famas del ejército Francés")); // 236
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("AK-47", "")); // 40
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("AK-47 MKII", "Versión de la AK-47 mejorada")); // 233
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("M4", "")); // 27
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("M4 MKII", "Arma basada en la HK416")); // 234
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("Carabina Especial", "G36C Alemana")); // 41
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("Carabina Especial MKII", "G36C mejorada")); // 235
    equiparFIB_ARMAMENTO_RILFES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_RILFES.ItemSelect.on((item, index) => {

        if (index < 9) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_RILFES', (index + 1));
        }

        // Volver
        if (index == 9) {
            equiparFIB_ARMAMENTO_RILFES?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_RILFES.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_RILFES = null;
    });
}

function mostrar_equipar_fib_armamento_francotiradores() {
    equiparFIB_ARMAMENTO_FRANCOS = crearMenu("Francotiradores", " ", true);
    equiparFIB_ARMAMENTO_FRANCOS.AddItem(new UIMenuItem("Marksman rifle", "Rifle de precisión automático")); // 42 
    equiparFIB_ARMAMENTO_FRANCOS.AddItem(new UIMenuItem("Marksman rifle MKII", "Rifle de precisión automático potente")); // 238
    equiparFIB_ARMAMENTO_FRANCOS.AddItem(new UIMenuItem("Rifle de precisión pesado", "Rifle de precisión antimaterial")); // 6
    equiparFIB_ARMAMENTO_FRANCOS.AddItem(new UIMenuItem("Rifles de precisión pesado MKII", "")); // 237
    equiparFIB_ARMAMENTO_FRANCOS.AddItem(new UIMenuItem("Rifle de precisión", "")); // 2
    equiparFIB_ARMAMENTO_FRANCOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_FRANCOS.ItemSelect.on((item, index) => {

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_FRANCOS', (index + 1));
        }

        // Volver
        if (index == 5) {
            equiparFIB_ARMAMENTO_FRANCOS?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_FRANCOS.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_FRANCOS = null;
    });
}

function mostrar_equipar_fib_armamento_escopetas() {
    equiparFIB_ARMAMENTO_ESCOPETAS = crearMenu("Escopetas", " ", true);
    equiparFIB_ARMAMENTO_ESCOPETAS.AddItem(new UIMenuItem("Mosquete", "Mosquete del siglo 19")); // 37
    equiparFIB_ARMAMENTO_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de corredera", " ")); // 9
    equiparFIB_ARMAMENTO_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de goma", "Escopeta antidisturbios")); // 240
    equiparFIB_ARMAMENTO_ESCOPETAS.AddItem(new UIMenuItem("Escopeta bullpup", "")); // 35
    equiparFIB_ARMAMENTO_ESCOPETAS.AddItem(new UIMenuItem("Escopeta pesada", "")); // 15
    equiparFIB_ARMAMENTO_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de asalto", "")); // 45
    equiparFIB_ARMAMENTO_ESCOPETAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_ESCOPETAS.ItemSelect.on((item, index) => {

        if (index < 6) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_ESCOPETAS', (index + 1));
        }

        // Volver
        if (index == 6) {
            equiparFIB_ARMAMENTO_ESCOPETAS?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_ESCOPETAS.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_ESCOPETAS = null;
    });
}

function mostrar_equipar_fib_armamento_armaslanzadas() {
    equiparFIB_ARMAMENTO_LANZADAS = crearMenu("Armas lanzadas", " ", true);
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Lata de combustible", "")); // 13
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Bola de nieve", "")); // 214
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Pelota", " ")); // 10
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Bengala", "")); // 18
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Granada de humo", "")); // 49
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Gas lacrimógeno", "")); // 36
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Molotov", "")); // 11
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Bomba casera", "")); // 254
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Granada", "")); // 221
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Mina con detonador", "")); // 222
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Mina de aproximación", "")); // 220
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Extintor", "")); // 3
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Bidón peligroso", "")); // 1091
    equiparFIB_ARMAMENTO_LANZADAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_LANZADAS.ItemSelect.on((item, index) => {

        if (index < 13) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_LANZADAS', (index + 1));
        }

        // Volver
        if (index == 13) {
            equiparFIB_ARMAMENTO_LANZADAS?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_LANZADAS.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_LANZADAS = null;
    });
}

function mostrar_equipar_fib_armamento_cargadores(){
    equiparFIB_ARMAMENTO_CARGADORES = crearMenu("Cargadores", "", true);
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Fusil de francotirador pesado", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Fusil de tirador MkII", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Escopeta", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Pistola", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Pistola calibre 50", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Pistola de combate", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Pistola pesada", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Subfusil", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Escopeta pesada", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Ametralladora de combate", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("M4", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("M4 MKII", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Escopeta de goma", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Carabina especial", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Carabina especial MK II", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Pistola MKII", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Pistola perforante", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Lanzahumos", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Pistola de bengalas", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("SNS Pistol", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("SNS Pistol MKII", "")); 
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Ametralladora de combate MK II", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("MP5 MKII", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Ametralladora ligera", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Rifle avanzado", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Rifle bullup", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Rifle bullup MK II", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("AK47", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("AK47 MKII", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Marksman rifle", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Rifle de precisión pesado MK II", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Rifle de precisión", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Escopeta bullpup", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Mosquetero", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Escopeta de asalto", ""));
    equiparFIB_ARMAMENTO_CARGADORES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_CARGADORES.ItemSelect.on((item, index) => {

        if (index < 35) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_CARGADORES', (index + 1));
        }

        // Volver
        if (index == 35) {
            equiparFIB_ARMAMENTO_CARGADORES?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_CARGADORES.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_CARGADORES = null;
    });
}

function mostrar_equipar_fib_armamento_conos() {
    equiparFIB_ARMAMENTO_CONOS = crearMenu("Conos", "", true);
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Cartel vehículos parados", "")); // 2042
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Barrera luminosa dirección", "Un lanzagranadas destinado para manifestaciones")); // 2040
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Cono luminoso", "Un megáfono (Uso: /meg [texto])")); // 2037
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Barrera blanca y naranja", "Botiquin medico")); // 2035
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Barrera", "")); // 1765
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Cono", "")); // 877
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Pinchos", "")); // 2048
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Cartel FIB", "")); // 2047
    equiparFIB_ARMAMENTO_CONOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparFIB_ARMAMENTO_CONOS.ItemSelect.on((item, index) => {

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparFIB_ARMAMENTO_CONOS', (index + 1));
        }

        // Volver
        if (index == 8) {
            equiparFIB_ARMAMENTO_CONOS?.Close(true);
        }
    });

    equiparFIB_ARMAMENTO_CONOS.MenuClose.on(item => {
        mostrar_equipar_fib_armamento();
        equiparFIB_ARMAMENTO_CONOS = null;
    });
}

}