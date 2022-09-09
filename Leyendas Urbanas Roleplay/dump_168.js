{
/*
 * Autor: poleStar
 * 
 * Descripcion: Archivo que contiene funciones para controlar diferentes aspectos de nativeui
 * 
 * 
 * Funcionalidades añadidas a index.js de NATIVEUI:
 * 1.- Detección de errores: Si recibe parámetros no válidos registra el error y devuelve un menú genérico evitando así necesitar reconectar y manteniendo la funcionalidad de dicho menú
 * 2.- Detección de librería/sprite: Si la librería o sprite no se pueden cargar automáticamente registra el error y abre el menú con la apariencia por defecto
 * 3.- Manejo de render: Solo existirá un render para el menú visible. Si un menú deja de ser visible o es cerrado su render es parado, si se reactiva su render es activado
 * 4.- Formato descripción: Las descipciones de opciones ahora permiten +-380 carácteres y aprovechan todo el ancho del menú
 * */

/**
 * Todas las variables disponibles de NATIVEUI ya estan definidas en global.js, no hace falta volver a definirlas ni hacer el require
 * 
 * NativeUI = require('/LURP/menus/nativeui/index.js');
 * Menu
 * UIMenuItem
 * UIMenuListItem
 * UIMenuCheckboxItem
 * UIMenuSliderItem
 * BadgeStyle
 * Point
 * ItemsCollection
 * Color
 * ListItem
 * BindMenuToItem
 * BannerSprite
 */

// VARIABLES LOCALES
// Colores predefinidos. HB - HighlightedBackColor (color de fondo cuando la opción esta seleccionada). FC - ForeColor (color de las letras). HF - HighlightedForeColor (color de las letras cuando la opción esta seleccionada)
const negro = new Color(5, 3, 12, 255);
const blanco = new Color(255, 255, 255, 255);

const verdeHB = new Color(0, 214, 103, 255);
const verdeFC = new Color(0, 214, 103, 255);
const verdeHF = new Color(0, 0, 0, 255);
const naranjaHB = new Color(255, 121, 0, 255);
const naranjaFC = new Color(255, 121, 0, 255);
const naranjaHF = new Color(0, 0, 0, 255);
const azulHB = new Color(69, 127, 202, 255);
const azulFC = new Color(69, 127, 202, 255);
const azulHF = new Color(0, 0, 0, 255);
const amarilloHB = new Color(255, 255, 0, 255);
const amarilloFC = new Color(255, 255, 0, 255);
const amarilloHF = new Color(0, 0, 0, 255);
const rojoHB = new Color(229, 57, 53, 255);
const rojoFC = new Color(229, 57, 53, 255);
const rojoHF = new Color(0, 0, 0, 255);
const grisHB = new Color(150, 150, 150, 255);
const grisFC = new Color(150, 150, 150, 255);
const grisHF = new Color(0, 0, 0, 255);
const rosaHB = new Color(255, 25, 159, 255);
const rosaFC = new Color(255, 25, 159, 255);
const rosaHF = new Color(0, 0, 0, 255);
const moradoHB = new Color(143, 106, 181, 255);
const moradoFC = new Color(143, 106, 181, 255);
const moradoHF = new Color(0, 0, 0, 255);

// Colores predefinidos, estas variables se pueden cambiar para personalizar todos los NATIVEUI que abre el usuario
let colorFondoSubtitulo = azulHB;
let colorLetrasSubtitulo = blanco;

// Texturas predefinidas
var defaultLib = "texturas_menus";
var defaultSpr = "textura_menu";

// Lista de menus abiertos con distancia maxima
var menu_con_distancia = null;
let int_distancia_menu = null;

const pointPos = new Point(50, 50);

// FUNCIONES
/**
 * Aplica el color selecionado a la opción del menu introducida
 * 
 * * USO: mi_menu.AddItem(aplicarColores(new UIMenuItem("Opcion 1", "Descripcion 1"), "Verde"));
 * 
 * @param {any} opcion UIMenuItem que va a recibir el cambio de colores
 * @param {any} stringColor Colores basicos introducidos como "Verde" o "verde"
 * @returns {any} UIMenuItem
 */
function aplicarColores(opcion, stringColor) {
    if (opcion != undefined && opcion != null) {
        if (typeof stringColor === "string") {
            switch (stringColor) {
                case "Verde": case "verde":
                    opcion.HighlightedBackColor = verdeHB;
                    opcion.ForeColor = verdeFC;
                    opcion.HighlightedForeColor = verdeHF;
                    break;
                case "Naranja": case "naranja":
                    opcion.HighlightedBackColor = naranjaHB;
                    opcion.ForeColor = naranjaFC;
                    opcion.HighlightedForeColor = naranjaHF;
                    break;
                case "Azul": case "azul":
                    opcion.HighlightedBackColor = azulHB;
                    opcion.ForeColor = azulFC;
                    opcion.HighlightedForeColor = azulHF;
                    break;
                case "Amarillo": case "amarillo":
                    opcion.HighlightedBackColor = amarilloHB;
                    opcion.ForeColor = amarilloFC;
                    opcion.HighlightedForeColor = amarilloHF;
                    break;
                case "Rojo": case "rojo":
                    opcion.HighlightedBackColor = rojoHB;
                    opcion.ForeColor = rojoFC;
                    opcion.HighlightedForeColor = rojoHF;
                    break;
                case "Gris": case "gris":
                    opcion.HighlightedBackColor = grisHB;
                    opcion.ForeColor = grisFC;
                    opcion.HighlightedForeColor = grisHF;
                    break;
                case "Rosa": case "rosa":
                    opcion.HighlightedBackColor = rosaHB;
                    opcion.ForeColor = rosaFC;
                    opcion.HighlightedForeColor = rosaHF;
                    break;
                case "Morado": case "morado":
                    opcion.HighlightedBackColor = moradoHB;
                    opcion.ForeColor = moradoFC;
                    opcion.HighlightedForeColor = moradoHF;
                    break;
                default:
                    break;
            }
        }
        return opcion;
    }
    else {
        return new UIMenuItem("~r~ERROR", "~r~Error al cargar al aplicar el color.");
    }
}

/**
 * Aplica el color introducido como color por defecto para el subtitulo de todos los NATIVEUI que abre el usuario
 * Según el color introducido ajusta el color de las letras del subtítulo para tener un buen contraste
 * 
 * * USO: colorPredeterminado("Verde");
 * 
 * @param {any} color String indicando el nuevo color predeterminado
 */
function colorPredeterminado(color) {
    let colorEscogido = color;
    if (typeof color === "string") {
        switch (color) {
            case "Verde": case "verde":
                colorFondoSubtitulo = verdeHB;
                colorLetrasSubtitulo = blanco;
                break;
            case "Naranja": case "naranja":
                colorFondoSubtitulo = naranjaHB;
                colorLetrasSubtitulo = blanco;
                break;
            case "Azul": case "azul":
                colorFondoSubtitulo = azulHB;
                colorLetrasSubtitulo = blanco;
                break;
            case "Amarillo": case "amarillo":
                colorFondoSubtitulo = amarilloHB;
                colorLetrasSubtitulo = negro;
                break;
            case "Rojo": case "rojo":
                colorFondoSubtitulo = rojoHB;
                colorLetrasSubtitulo = blanco;
                break;
            case "Gris": case "gris":
                colorFondoSubtitulo = grisHB;
                colorLetrasSubtitulo = blanco;
                break;
            case "Rosa": case "rosa":
                colorFondoSubtitulo = rosaHB;
                colorLetrasSubtitulo = blanco;
                break;
            case "Morado": case "morado":
                colorFondoSubtitulo = moradoHB;
                colorLetrasSubtitulo = blanco;
                break;
            case "Negro": case "negro":
                colorFondoSubtitulo = negro;
                colorLetrasSubtitulo = blanco;
                break;
            default:
                colorEscogido = "Azul";
                colorFondoSubtitulo = azulHB;
                colorLetrasSubtitulo = blanco;
                break;
        }
    }
    else {
        colorFondoSubtitulo = azulHB;
        colorLetrasSubtitulo = blanco;
        colorEscogido = "Azul";
    }

    if (mp.storage.data.options) {
        mp.storage.data.options.hudColorNativeUI = colorEscogido;
        mp.storage.flush();
    }
}

/**
 * Crea y devuelve un menu con los parametros introducidos.
 * Si el titulo o descripcion no son string los establece como string vacio.
 * Si no se quiere usar un valor opcional se debe introducir null para que sea usado por defecto.
 * Si por algún motivo NATIVEUI recibe valores erroneos lo dejará en el chat y en console.txt, además al introducir librerias que no existen usará las librerías por defecto de gta.
 * 
 * 
 * * USO: crearMenu("Menú", "Descripción");
 * * USO: crearMenu("Menú", "Descripcion", "commonmenu", "interaction_bgd");
 * * USO: crearMenu("Menú", "Descripcion", "commonmenu", "interaction_bgd", new Point(50, 50));
 * * USO: crearMenu("Menú", "Descripcion", null, null, new Point(50, 50), new Color(0, 0, 0, 255));
 * * USO: crearMenu("Menú", "Descripcion", null, null, new Point(50, 50), new Color(0, 0, 0, 255), new Color(255, 255, 255, 255));
 * 
 * 
 * @param {string} titulo String del titulo
 * @param {string} descripcion String de la descripcion
 * @param {string} libreria -OPCIONAL- Libreria - Por defecto "texturas_menus"
 * @param {string} sprite -OPCIONAL- Sprite - Por defecto "textura_menu"
 * @param {any} posicion -OPCIONAL- Point posicion del menu - Por defecto (50, 50)
 * @param {any} colorFondoSubtitulo -OPCIONAL- Color de fondo del subtitulo - Por defecto azulHB
 * @param {any} colorLetrasSubtitulo -OPCIONAL- Color de las letras del subtitulo - Por defecto blanco
 * @returns {any} Menu
 */
function crearMenu(titulo, descripcion, otroMenuAlCerrar = false, libreria = null, sprite = null, posicion = null, colorFondoSub = null, colorLetrasSub = null) {
    if (typeof titulo !== "string") {
        titulo = "";
    }
    if (typeof descripcion !== "string") {
        descripcion = "";
    }

    let pos = posicion == null ? pointPos : posicion;
    let cFondoSub = colorFondoSub == null ? colorFondoSubtitulo : colorFondoSub;
    let cLetrasSub = colorLetrasSub == null ? colorLetrasSubtitulo : colorLetrasSub;
    let lib = libreria;
    let spr = sprite;
    if (typeof libreria !== "string" || typeof sprite !== "string") { // Si la libreria o sprite no son string se utilizan por defecto
        lib = defaultLib;
        spr = defaultSpr;
    }

    if (lib == "texturas_menus" && defaultLib != "texturas_menus") {
        lib = defaultLib;
        spr = defaultSpr;
    }

    return new Menu(titulo, descripcion, pos, cFondoSub, cLetrasSub, lib, spr, otroMenuAlCerrar);
}

/**
 * Misma funcion y uso que crearMenu, pero pide como primer parámetro una distancia máxima.
 * Esto comprueba si el usuario está a más distancia de la recibida para cerrar el menú
 * 
 * El evento MenuClose.on del menú creado con esta función debe actualizar "menu_con_distancia" a null -> menu_con_distancia = null;
 * 
 * * USO: crearMenu(6.0, "Menú", "Descripción");
 * * USO: crearMenu(7.0, "Menú", "Descripcion", "commonmenu", "interaction_bgd");
 * * USO: crearMenu(2.0, "Menú", "Descripcion", "commonmenu", "interaction_bgd", new Point(50, 50));
 * * USO: crearMenu(10.0, "Menú", "Descripcion", null, null, new Point(50, 50), new Color(0, 0, 0, 255));
 * * USO: crearMenu(2.0, "Menú", "Descripcion", null, null, new Point(50, 50), new Color(0, 0, 0, 255), new Color(255, 255, 255, 255));
 * 
 * @param {number} distancia_max Distancia de cierre del menú, si el usuario se aleja mas de esta distancia el menú se cierra
 * @param {string} titulo String del titulo
 * @param {string} descripcion String de la descripcion
 * @param {string} libreria -OPCIONAL- Libreria - Por defecto "texturas_menus"
 * @param {string} sprite -OPCIONAL- Sprite - Por defecto "textura_menu"
 * @param {any} posicion -OPCIONAL- Point posicion del menu - Por defecto (50, 50)
 * @param {any} colorFondoSubtitulo -OPCIONAL- Color de fondo del subtitulo - Por defecto azulHB
 * @param {any} colorLetrasSubtitulo -OPCIONAL- Color de las letras del subtitulo - Por defecto blanco
 * @returns {any} Menu
 */
function crearMenuConDistancia(distancia_max, titulo, descripcion, otroMenuAlCerrar = false, libreria = null, sprite = null, posicion = null, colorFondoSub = null, colorLetrasSub = null) {
    if (typeof distancia_max !== "number") {
        return crearMenu(titulo, descripcion, otroMenuAlCerrar, libreria, sprite, posicion, colorFondoSub, colorLetrasSub);
    }

    menu_con_distancia = crearMenu(titulo, descripcion, otroMenuAlCerrar, libreria, sprite, posicion, colorFondoSub, colorLetrasSub);
    const pos_apertura = player_local.position;

    if (int_distancia_menu != null) {
        clearInterval(int_distancia_menu);
        int_distancia_menu = null;
    }
    int_distancia_menu = setInterval(() => {
        if (menu_con_distancia == null) {
            clearInterval(int_distancia_menu);
            int_distancia_menu = null;
        }
        else {
            if (calcDist(player_local.position, pos_apertura) > distancia_max) {
                menu_con_distancia?.Close();
                mostrarAviso("danger", 5000, "Se ha cerrado el menú, te has alejado demasiado del lugar de apertura");
                menu_con_distancia = null;

                clearInterval(int_distancia_menu);
                int_distancia_menu = null;
            }
        }
    }, 100);

    return menu_con_distancia;
}

let timeoutTeclasBloqueadas = null;
/**
 * Bloquea/desbloquea el uso de las teclas que tengan la comprobacion: if (bloqueoTeclas) return;
 * 
 * @param {string} titulo String del titulo
 * @returns {any} Menu
 */
function bloquearTeclas(bool) {
    if (timeoutTeclasBloqueadas != null) {
        pararTimeout(timeoutTeclasBloqueadas);
        timeoutTeclasBloqueadas = null;
    }

    if (bool) {
        bloqueoTeclas = true;
    }
    else {
        timeoutTeclasBloqueadas = crearTimeout(() => {
            timeoutTeclasBloqueadas = null;
            bloqueoTeclas = false;
        }, 75);
    }
}

/**
 * Antiguo "BannerSprite" de C# - Introduce un numero y recibe la libreria y sprite del menu, por defecto devuelve la textura negra.
 * 
 * @param {any} numero
 * @returns {object} .libreria y .sprite
 */
function intEstilo(numero)
{
    let resultado = { libreria: "texturas_menus", sprite: "textura_menu"};
    switch (numero) {
        case 1:
            resultado = { libreria: "shopui_title_barber", sprite: "shopui_title_barber"};
            break;
        case 2:
            resultado = { libreria: "shopui_title_barber2", sprite: "shopui_title_barber2" };
            break;
        case 3:
            resultado = { libreria: "shopui_title_barber3", sprite: "shopui_title_barber3" };
            break;
        case 4:
            resultado = { libreria: "shopui_title_barber4", sprite: "shopui_title_barber4" };
            break;
        case 5:
            resultado = { libreria: "shopui_title_carmod", sprite: "shopui_title_carmod" };
            break;
        case 6:
            resultado = { libreria: "shopui_title_carmod2", sprite: "shopui_title_carmod2" };
            break;
        case 7:
            resultado = { libreria: "shopui_title_conveniencestore", sprite: "shopui_title_conveniencestore" };
            break;
        case 8:
            resultado = { libreria: "shopui_title_conveniencestore", sprite: "shopui_title_conveniencestore" };
            break;
        case 9:
            resultado = { libreria: "shopui_title_darts", sprite: "shopui_title_darts" };
            break;
        case 10:
            resultado = { libreria: "shopui_title_gasstation", sprite: "shopui_title_gasstation" };
            break;
        case 11:
            resultado = { libreria: "shopui_title_golfshop", sprite: "shopui_title_golfshop" };
            break;
        case 12:
            resultado = { libreria: "shopui_title_graphics_franklin", sprite: "shopui_title_graphics_franklin" };
            break;
        case 13:
            resultado = { libreria: "shopui_title_graphics_michael", sprite: "shopui_title_graphics_michael" };
            break;
        case 14:
            resultado = { libreria: "shopui_title_graphics_trevor", sprite: "shopui_title_graphics_trevor" };
            break;
        case 15:
            resultado = { libreria: "shopui_title_gunclub", sprite: "shopui_title_gunclub" };
            break;
        case 16:
            resultado = { libreria: "shopui_title_highendfashion", sprite: "shopui_title_highendfashion" };
            break;
        case 17:
            resultado = { libreria: "shopui_title_highendsalon", sprite: "shopui_title_highendsalon" };
            break;
        /*case 18:
            resultado = { libreria: "shopui_title_liqourstore", sprite: "shopui_title_liqourstore" };
            break;
        case 19:
            resultado = { libreria: "shopui_title_liqourstore2", sprite: "shopui_title_liqourstore2" };
            break;
        case 20:
            resultado = { libreria: "shopui_title_liqourstore3", sprite: "shopui_title_liqourstore3" };
            break;*/
        case 21:
            resultado = { libreria: "shopui_title_lowendfashion", sprite: "shopui_title_lowendfashion" };
            break;
        case 22:
            resultado = { libreria: "shopui_title_lowendfashion2", sprite: "shopui_title_lowendfashion2" };
            break;
        case 23:
            resultado = { libreria: "shopui_title_midfashion", sprite: "shopui_title_midfashion" };
            break;
        case 24:
            resultado = { libreria: "shopui_title_movie_masks", sprite: "shopui_title_movie_masks" };
            break;
        case 25:
            resultado = { libreria: "shopui_title_tattoos", sprite: "shopui_title_tattoos" };
            break;
        case 26:
            resultado = { libreria: "shopui_title_tattoos2", sprite: "shopui_title_tattoos2" };
            break;
        case 27:
            resultado = { libreria: "shopui_title_tattoos3", sprite: "shopui_title_tattoos3" };
            break;
        case 28:
            resultado = { libreria: "shopui_title_tattoos4", sprite: "shopui_title_tattoos4" };
            break;
        case 29:
            resultado = { libreria: "shopui_title_tattoos5", sprite: "shopui_title_tattoos5" };
            break;
        case 30:
            resultado = { libreria: "shopui_title_tennis", sprite: "shopui_title_tennis" };
            break;
        case 31:
            resultado = { libreria: "mpshops", sprite: "shopui_title_graphics_sale" };
            break;
        case 32:
            resultado = { libreria: "shopui_title_supermod", sprite: "shopui_title_supermod" };
            break;
        case 33:
            resultado = { libreria: "shopui_title_clubhousemod", sprite: "shopui_title_clubhousemod" };
            break;
        case 34:
            resultado = { libreria: "shopui_title_exec_vechupgrade", sprite: "shopui_title_exec_vechupgrade" };
            break;
        case 35:
            resultado = { libreria: "shopui_title_ie_modgarage", sprite: "shopui_title_ie_modgarage" };
            break;
        case 36:
            resultado = { libreria: "shopui_title_gr_gunmod", sprite: "shopui_title_gr_gunmod" };
            break;
        case 37:
            resultado = { libreria: "shopui_title_sm_hangar", sprite: "shopui_title_sm_hangar" };
            break;
        default:
            break;
    }
    return resultado;
}

var Anchor = {
    TopLeft: 0,
    TopCenter: 1,
    TopRight: 2,
    MiddleLeft: 3,
    MiddleCenter: 4,
    MiddleRight: 6,
    BottomLeft: 7,
    BottomCenter: 8,
    BottomRight: 9
};

function convertAnchorPos(x, y, anchor, xOffset, yOffset) {
    let res = Menu.GetScreenResolutionMaintainRatio();

    switch (anchor) {
        case Anchor.TopLeft:
            return new Point(x, y);
        case Anchor.TopCenter:
            return new Point(res.Width / 2 + x, 0 + y);
        case Anchor.TopRight:
            return new Point(res.Width - x - xOffset, y);
        default:
            mp.gui.chat.push("No se ha leído correctamente el Anchor");
            return pointPos;
    }
}

}