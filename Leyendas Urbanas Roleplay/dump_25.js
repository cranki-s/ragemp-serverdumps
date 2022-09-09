{
/* --------------------------------------------------------------------------------
 * personalizacion.js
 *
 * Autor: Doomer
 *
 * Descripción: Script de personalización de personajes
 * -------------------------------------------------------------------------------- */
var global_personalizacion = require('/LURP/global');
var cef_personalizacion = require("./LURP/cef.js");
const freemodeModels = [mp.game.joaat("mp_m_freemode_01"), mp.game.joaat("mp_f_freemode_01")];
var torsoDataMale = require('./LURP/cef/personalizacion/filtros/besttorso_male.js');
var torsoDataFemale = require('./LURP/cef/personalizacion/filtros/besttorso_female.js');
var undershirtDataMale = require('./LURP/cef/personalizacion/filtros/bestundershirt_male.js');
var undershirtDataFemale = require('./LURP/cef/personalizacion/filtros/bestundershirt_female.js');
var personalizacion_cefId = -1;

var camaraP = {
    x: -1014.1485,
    y: -85.43034,
    z: -99.403076,
    rx: 0,
    ry: 0,
    rz: 180,
    angulo: 15,
};

var paso1 = "{}";
var paso1_guardado = null;
var ropa_personaje = {};
var colorOjos = 0;
var paso2;
var tatuajesPersonaje = [];
var paso3_colorpelo1 = 0;
var paso3_colorpelo2 = 0;
var paso3_degradadocoleccion = "vacio";
var paso3_degradadooverlay = "vacio";
var paso3_guardado = null;
var negocio_id = 0;
var genero_pj = 0;
var paso3head = [{
        id: 0,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 1,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 2,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 3,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 4,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 5,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 6,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 7,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 8,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 9,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 10,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
    {
        id: 11,
        index: 255,
        opacity: 0,
        color1: 0,
        color2: 0,
    },
];
var ropa = [{
        componente: 2,
        id: 0,
        color: 0,
        underColor: 0,
    },
    {
        componente: 3,
        id: 0,
        color: 0,
        underColor: 0,
    },
    {
        componente: 4,
        id: 0,
        color: 0,
        underColor: 0,
    },
    {
        componente: 5,
        id: 0,
        color: 0,
        underColor: 0,
    },
    {
        componente: 6,
        id: 0,
        color: 0,
        underColor: 0,
    },
    {
        componente: 7,
        id: 0,
        color: 0,
        underColor: 0,
    },
    {
        componente: 8,
        id: 15,
        color: 0,
        underColor: 0,
    },
    {
        componente: 11,
        id: 0,
        color: 0,
        underColor: 0,
    },
];

//let accesorios = [
//    { accesorio: 0, id: 0, color: 0, underColor: 0, },
//    { accesorio: 1, id: 0, color: 0, underColor: 0, },
//];

var urlJson;

var ropa_personaje = {
    "torso": {
        "componente": 3,
        "id": 0,
        "textura": 0,
    },
    "top": {
        "componente": 11,
        "id": 91,
        "textura": 0,
    },
    "camisa": {
        "componente": 8,
        "id": 57,
        "textura": 0,
    },
    "pantalones": {
        "componente": 4,
        "id": 61,
        "textura": 0,
    },
    "accesorio": {
        "componente": 7,
        "id": 0,
        "textura": 0,
    },
    "calzado": {
        "componente": 6,
        "id": 34,
        "textura": 0,
    },
    "misc": {
        "componente": 5,
        "id": 0,
        "textura": 0,
    }
};

function cargarRopaPuesta() {
    ropa_personaje.top.id = player_local.getDrawableVariation(11);
    ropa_personaje.top.textura = player_local.getTextureVariation(11);
    ropa_personaje.camisa.id = player_local.getDrawableVariation(8);
    ropa_personaje.camisa.textura = player_local.getTextureVariation(8);
    ropa_personaje.pantalones.id = player_local.getDrawableVariation(4);
    ropa_personaje.pantalones.textura = player_local.getTextureVariation(4);
    ropa_personaje.calzado.id = player_local.getDrawableVariation(6);
    ropa_personaje.calzado.textura = player_local.getTextureVariation(6);
    ropa_personaje.accesorio.id = player_local.getDrawableVariation(7);
    ropa_personaje.accesorio.textura = player_local.getTextureVariation(7);
    ropa_personaje.torso.id = player_local.getDrawableVariation(3);
    ropa_personaje.torso.textura = player_local.getTextureVariation(3);
    ropa_personaje.misc.id = player_local.getDrawableVariation(5);
    ropa_personaje.misc.textura = player_local.getTextureVariation(5);
}

function startLoadingMessage(text) {
    mp.game.ui.setLoadingPromptTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.showLoadingPrompt(1);
}

let mostrar_carga = false;
let mensajeRender = "Cargando personalización...";
let render_personalizacion = function () {
    if (mostrar_carga)
        startLoadingMessage(mensajeRender);
}
mp.events.add('render', render_personalizacion);

mp.events.add({
    "establecer_ropa": function (array) {
        setTimeout(function () {
            var ropa_array = JSON.parse(array);
            for (var i = 0; i < ropa_array.length; i += 3) {
                player_local.setComponentVariation(ropa_array[i], ropa_array[i + 1], ropa_array[i + 2], 0);
            }
        }, 5000);
    },
    "mostrar_personalizacion": function (genero, url_Json, primerUso = true) {
        if (primerUso){
            mp.events.call("personalizacion:fadeInOut", 25, 3000, 800);

            mostrar_carga = true;
            mp.events.call("cerrarAutentificacion");
            mp.game.ui.displayRadar(false);
    
            player_local.setHeadOverlay(2, 255, 0, 0, 0);
            genero_pj = genero;
    
            urlJson = url_Json;
    
            player_local.freezePosition(true);
    
            personalizando = true;   
            
            setTimeout(() => {
                if (personalizacion_cefId >= 0){
                    cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
                    personalizacion_cefId = -1;
                }
    
                if (personalizacion_cefId < 0) {
                    personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/paso1.html", {
                        puedeCerrar: true,
                        mostrarCursor: true
                    });
                }
    
                if (paso1_guardado != null){
                    cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.loadSaved('" + paso1_guardado + "')");
                }
                
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z + 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo);
                player_local.position = new mp.Vector3(-1014.1485, -88.43034, -99.403076);
                player_local.setHeading(-2.7440557);
                //mp.game.cam.renderScriptCams(false, true, 0, true, true);
                //mp.cameras.new('default', new mp.Vector3(camaraP.x, camaraP.y, camaraP.z), new mp.Vector3(camaraP.rx, camaraP.ry, camaraP.rz), camaraP.angulo);
                player_local.taskPlayAnim("random@shop_tattoo", "_idle", 8.0, 1.0, -1, (1 | 2), 0.0, false, false, false);;
    
                mp.controladorJugadores.objetos.limpiarObjetos(player_local);
    
                mostrar_carga = false;
                mp.game.invoke('0x10D373323E5B9C0D');
                mp.events.remove("render", render_personalizacion);
            }, 2900);
        } else {
            personalizando = true;   
            
            setTimeout(() => {
                if (personalizacion_cefId >= 0){
                    cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
                    personalizacion_cefId = -1;
                }
    
                if (personalizacion_cefId < 0) {
                    personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/paso1.html", {
                        puedeCerrar: true,
                        mostrarCursor: true
                    });
                }
    
                if (paso1_guardado != null){
                    cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.loadSaved('" + paso1_guardado + "')");
                }
                
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z + 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo);
                player_local.position = new mp.Vector3(-1014.1485, -88.43034, -99.403076);
                player_local.setHeading(-2.7440557);
                //mp.game.cam.renderScriptCams(false, true, 0, true, true);
                //mp.cameras.new('default', new mp.Vector3(camaraP.x, camaraP.y, camaraP.z), new mp.Vector3(camaraP.rx, camaraP.ry, camaraP.rz), camaraP.angulo);
                player_local.taskPlayAnim("random@shop_tattoo", "_idle", 8.0, 1.0, -1, (1 | 2), 0.0, false, false, false);;
    
                mp.controladorJugadores.objetos.limpiarObjetos(player_local);
    
                mp.game.invoke('0x10D373323E5B9C0D');
            }, 50);
        }
    },
    "personalizacion_paso3": function (strJSON_1, strJSON_2, color_ojos, datosPaso1 = null) {
        player_local.setHeadOverlay(2, 255, 0, 0, 0);
        paso1 = strJSON_1;
        paso2 = strJSON_2;
        colorOjos = color_ojos;

        paso1_guardado = datosPaso1; // Informacion guardada por si volvemos al paso anterior

        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
            personalizacion_cefId = -1;
        }

        personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/paso3.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });
        if (genero_pj == 0)
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.loadMans()");
        else
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.loadWomans()");

        if (paso3_guardado != null){
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.loadSaved('" + paso3_guardado + "')");
        }
        
        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.camRotation = " + player_local.heading);
    },
    "personalizacion_paso4": function (datosPaso3 = null) {
        paso3_guardado = datosPaso3; // Informacion guardada por si volvemos al paso anterior

        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
            personalizacion_cefId = -1;
        }

        personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/paso4.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });
        if (genero_pj == 0) {
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + urlJson + "masculino','tiendamasculino','" + apiKey + "','" + _k + "','" + genero_pj + "')");
        } else {
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + urlJson + "femenino','tiendafemenino','" + apiKey + "','" + _k + "','" + genero_pj + "')");
        }

        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.camRotation = " + player_local.heading);
        global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.1, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 30);
    },
    "personalizacion_avatar": () => {
        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false);
            personalizacion_cefId = -1;
        }
    
        mp.game.cam.doScreenFadeOut(25);
        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(1500);
            player_local.position = new mp.Vector3(405.15, -997.47, -99);    
            global_avatar.crearCamara(402.27, -1004.49, -98.56, 1.2367, 0, -3.51834, 45);

            setTimeout(() => {
                player_local.freezePosition(false);
                player_local.taskGoStraightToCoord(402.55, -996.37, -99.01, 0.5, -1, 180, 2);

                setTimeout(() => {
                    mp.events.call("hud:mostrar_loading", "Estamos sacando una imagen de tu cara, ¡sonríe!");
                    setTimeout(async() => {
                        if (!mp.game.streaming.hasAnimDictLoaded("random@shop_tattoo")) {
                            mp.game.streaming.requestAnimDict("random@shop_tattoo");
                            while (!mp.game.streaming.hasAnimDictLoaded("random@shop_tattoo")) await mp.game.waitAsync(0);
                        }

                        player_local.taskPlayAnim("random@shop_tattoo", "_idle", 8.0, 0, -1, 1, 0.0, false, false, false);
                    }, 4000);

                    mp.events.call("avatar:iniciar");
                }, 1000);
            }, 300);
        }, 800);
    },
    "finalizar_personalizacion": function () {
        mp.events.callRemote("ppj_est_datoscara", paso1, paso3_colorpelo1, paso3_colorpelo2, colorOjos);
        var facedata = JSON.parse(paso2);
        for (var i = 0; i < facedata.length; i++) {
            mp.events.callRemote("ppj_est_compcara", i, facedata[i]);
        }
        for (var i = 0; i < paso3head.length; i++) {
            mp.events.callRemote("ppj_est_caractcara", paso3head[i].id, paso3head[i].index, paso3head[i].opacity, paso3head[i].color1, paso3head[i].color2);
        }
        for (var i = 0; i < ropa.length; i++) {
            mp.events.callRemote("ppj_est_ropa", ropa[i].componente, ropa[i].id, ropa[i].color);
        }
        mp.events.callRemote("ppj_est_degradado", parseInt(19), paso3_degradadooverlay, paso3_degradadocoleccion);
        mp.events.callRemote("ppj_lista");

        mp.game.cam.doScreenFadeOut(25);

        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(1500);
        }, 1000);

        setTimeout(() => {
            mp.events.callRemote("limpiar_animacion");
            player_local.clearTasks();
        }, 2000);

        // mostrar_carga = false;
        // mp.game.invoke("0x10D373323E5B9C0D");
        // mp.events.remove("render", render_personalizacion);
        mp.events.call("DestruirCamara");
        
        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false);
            personalizacion_cefId = -1;
        }
        // if (hambre_cefId >= 0) {
        //     cef_personalizacion.ejecutarCef(hambre_cefId, "mostrar()");
        // }
    },
    "atras_personalizacion": (faseActual, info = null) => {
        switch(faseActual){
            case 3:
                paso3_guardado = info; // Informacion guardada por si volvemos al paso anterior
                mp.events.call("mostrar_personalizacion", genero_pj, urlJson, false);
                break;
            case 4:
                mp.events.call("personalizacion_paso3", paso1, paso2, colorOjos, paso1_guardado);
                break;
            default:
                break;
        }
    },
    "mostrar_ropa_casa": function (url_Json, SQLIDPJ) { 
        camaraP.x = -1014.1485;
        camaraP.y = -85.43034;
        camaraP.z = -99.403076;
        camaraP.rx = 0;
        camaraP.ry = 0;
        camaraP.rz = 180;
        camaraP.angulo = 15;

        cargarRopaPuesta();
        if (player_local.model == freemodeModels[0]) {
            genero_pj = 0;
        } else {
            genero_pj = 1;
        }
        
        player_local.freezePosition(true);   
        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
            personalizacion_cefId = -1;
        }
        
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
        mp.game.cam.doScreenFadeOut(25);

        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(750);
            personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/armario.html", {
                mostrarCursor: true,
                puedeCerrar: true
            }); 
            player_local.position = new mp.Vector3(-1014.1485, -88.43034, -99.403076);
            player_local.setHeading(-2.7440557);
            player_local.taskPlayAnim("random@shop_tattoo", "_idle", 8.0, 0, -1, 1, 0.0, false, false, false);
            global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.1, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 25);
            let top_puesto = player_local.getDrawableVariation(11);
            let torso_puesto = player_local.getDrawableVariation(3);
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + url_Json[0] + "','armario" + SQLIDPJ + "','" + apiKey + "','" + _k + "','" + genero_pj + "','" + top_puesto + "','" + torso_puesto + "')");
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarConjuntos('" + url_Json[1] + "','conjuntos" + SQLIDPJ + "','" + apiKey + "','" + _k + "')");
        }, 1000);
       
        if (!hudOculto) mp.events.call("hud:estado_hud");


        // if (player_local.getVariable("ROPA") != undefined) {
        //     cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarRopa('" + player_local.getVariable("ROPA") + "')");
        // }

        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.camRotation = '" + player_local.heading + "'");
    },
    "mostrar_ropa_negocio": function (genero, parametro1, parametro2, posicion, rotacion, tipo, url_Json) {
        player_local.freezePosition(true);
        camaraP.x = posicion.x;
        camaraP.y = posicion.y;
        camaraP.z = posicion.z;
        camaraP.rx = rotacion.x;
        camaraP.ry = rotacion.y;
        camaraP.rz = rotacion.z;
        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
            personalizacion_cefId = -1;
        }
        cargarRopaPuesta();
        genero_pj = genero;
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
        mp.game.cam.doScreenFadeOut(25);

        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(750);
            personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/ropa.html", {
                puedeCerrar: true,
                mostrarCursor: true
            });
            global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.8, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 30);
            let top_puesto = player_local.getDrawableVariation(11);
            let torso_puesto = player_local.getDrawableVariation(3);
            if (genero == 0) {
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + url_Json + "masculino/" + tipo + "','tiendamasculino','" + apiKey + "', '" + _k + "','" + genero_pj + "','" + top_puesto + "','" + torso_puesto + "')");
            } else {
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + url_Json + "femenino/" + tipo + "','tiendafemenino','" + apiKey + "', '" + _k + "','" + genero_pj + "','" + top_puesto + "','" + torso_puesto + "')");
            }
    
            negocio_id = parametro1;
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.id = '" + parametro1 + "'");
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.nombreTienda = '" + parametro2 + "'");
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.camRotation = '" + player_local.heading + "'");    
        }, 1000);

        if (!hudOculto)
            mp.events.call("hud:estado_hud");
        },
    "mostrar_ropa_fib": function (genero, posicion, rotacion, url_Json) {
        player_local.freezePosition(true);
        camaraP.x = -1014.1485;
        camaraP.y = -85.43034;
        camaraP.z = -99.403076;
        camaraP.rx = 0;
        camaraP.ry = 0;
        camaraP.rz = 180;
        camaraP.angulo = 15;
        
        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
            personalizacion_cefId = -1;
        }
        cargarRopaPuesta();
        genero_pj = genero;
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
        mp.game.cam.doScreenFadeOut(25);

        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(750);
            personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/ropafib.html", {
                puedeCerrar: true,
                mostrarCursor: true
                });
            player_local.position = new mp.Vector3(-1014.1485, -88.43034, -99.403076);
            player_local.setHeading(-2.7440557);
            player_local.taskPlayAnim("random@shop_tattoo", "_idle", 8.0, 0, -1, 1, 0.0, false, false, false);
            global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.1, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 25);
            let top_puesto = player_local.getDrawableVariation(11);
            let torso_puesto = player_local.getDrawableVariation(3);
            if (genero == 0) {
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + url_Json + "masculino/" + "','tiendamasculino','" + apiKey + "', '" + _k + "','" + genero_pj + "','" + top_puesto + "','" + torso_puesto + "')");
            } else {
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + url_Json + "femenino/" + "','tiendafemenino','" + apiKey + "', '" + _k + "','" + genero_pj + "','" + top_puesto + "','" + torso_puesto + "')");
            }
        }, 1000);

        if (!hudOculto)
            mp.events.call("hud:estado_hud");

        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.camRotation = '" + player_local.heading + "'");
    },
    "mostrar_pelo_negocio": function (genero, parametro1, parametro2, posicion, rotacion) {
        player_local.freezePosition(true);
        camaraP.x = -33.425278;
        camaraP.y = -152.37302;
        camaraP.z = 57.086544;
        camaraP.rx = 0;
        camaraP.ry = 0;
        camaraP.rz = 65;
        camaraP.angulo = 30;

        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
            personalizacion_cefId = -1;
        }

        personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/barberia.html", {
            mostrarCursor: true,
            puedeCerrar: true
        });
        player_local.position = new mp.Vector3(-35.425278, -152.37302, 57.086544);
        player_local.setHeading(245);
        player_local.taskPlayAnim("random@shop_tattoo", "_idle", 8.0, 0, -1, 1, 0.0, false, false, false);
        global_personalizacion.crearCamara(camaraP.x, camaraP.y - 0.90, camaraP.z + 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo);
        if (genero == 0)
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.loadMans()");
        else
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.loadWomans()");
        negocio_id = parametro1;
        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.id = '" + parametro1 + "'");
        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.nombreTienda = '" + parametro2 + "'");
        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.camRotation = '" + player_local.heading + "'");
    },
    "mostrar_tatuaje_negocio": function (genero, parametro1, parametro2, posicion, rotacion, url_Json, tatus) {
        player_local.freezePosition(true);
        camaraP.x = 322.32272;
        camaraP.y = 179.5249;
        camaraP.z = 103.58656;
        camaraP.rx = 0;
        camaraP.ry = 0;
        camaraP.rz = 245;
        camaraP.angulo = 15;
        tatuajes = JSON.stringify(tatus);
        tatuajesPersonaje = tatus;

        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId, false, false, false);
            personalizacion_cefId = -1;
        }

        personalizacion_cefId = cef_personalizacion.crearCef("package://LURP/cef/personalizacion/tatuajes.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });

        player_local.position = new mp.Vector3(324.32272, 179.5249, 103.58656);
        player_local.setHeading(65);
        player_local.taskPlayAnim("random@shop_tattoo", "_idle", 8.0, 0, -1, 1, 0.0, false, false, false);
        // global_personalizacion.prepararCef();
        global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z - 0.13, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 35);
        // global_personalizacion.abrirCef("package://LURP/cef/personalizacion/tatuajes.html");
        if (genero == 0) {
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + url_Json + "masculino','tatuajesmasculino','" + apiKey + "', '" + _k + "', '" + tatuajes + "')");
        } else {
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarDatos('" + url_Json + "femenino','tatuajesfemenino','" + apiKey + "', '" + _k + "', '" + tatuajes + "')");
        }
        // global_personalizacion.enviaraCef("cargarDatos('" + url_Json + "masculino','" + apiKey + "')");

        // global_personalizacion.enviaraCef("cargarDatos('" + url_Json + "femenino','" + apiKey + "')");
        negocio_id = parametro1;
        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.id = '" + parametro1 + "'");
        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.nombreTienda = '" + parametro2 + "'");
        cef_personalizacion.ejecutarCef(personalizacion_cefId, "app.camRotation = '" + player_local.heading + "'");
        // global_personalizacion.enviaraCef("app.id = '" + parametro1 + "'");
        // global_personalizacion.enviaraCef("app.nombreTienda = '" + parametro2 + "'");
        // global_personalizacion.enviaraCef("app.camRotation = '" + player_local.heading + "'");

        player_local.setComponentVariation(5, 0, 0, 0);
        player_local.setComponentVariation(1, 0, 0, 0);
        if (genero == 0)
        {
            player_local.setComponentVariation(3, 15, 0, 0);
            player_local.setComponentVariation(4, 61, 0, 0);
            player_local.setComponentVariation(6, 34, 0, 0);
            player_local.setComponentVariation(7, 0, 0, 0);
            player_local.setComponentVariation(8, 15, 0, 0);
            player_local.setComponentVariation(10, 0, 0, 0);
            player_local.setComponentVariation(11, 91, 0, 0);
            player_local.setComponentVariation(9, 0, 0, 0);
        }
        else
        {
            player_local.setComponentVariation(3, 15, 0, 0);
            player_local.setComponentVariation(4, 17, 0, 0);
            player_local.setComponentVariation(6, 35, 0, 0);
            player_local.setComponentVariation(7, 0, 0, 0);
            player_local.setComponentVariation(8, 10, 0, 0);
            player_local.setComponentVariation(10, 0, 0, 0);
            player_local.setComponentVariation(11, 15, 0, 0);
            player_local.setComponentVariation(9, 0, 0, 0);
        }
    },
    "personalizacion_ropaCamarapelo": function (type) {
        switch (type) {
            //case "Hats":
            //    global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 10);
            //    break;
            //case "Glasses":
            //    global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo - 5);
            //    break;
            case "Cara":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y - 0.90, camaraP.z + 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo - 10);
                break;
            case "Torsos": case "Conjuntos": case "Miscelánea":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y - 0.90, camaraP.z + 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo -5);
                break;
            case "Tops":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Camisa interior":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Accesorios":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Pantalones":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.9, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 25);
                break;
            case "Calzado":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 1.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 20);
                break;
            default:
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.8, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 30);
                break;
        }
    },

    "personalizacion_ropaCamararopa": function (type) {
        switch (type) {
            //case "Hats":
            //    global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 10);
            //    break;
            //case "Glasses":
            //    global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo - 5);
            //    break;
            case "Cara":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo);
                break;
            case "Torsos": case "Conjuntos": case "Miscelánea":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Tops":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Camisa interior":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Accesorios":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Pantalones":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.9, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 25);
                break;
            case "Calzado":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 1.4, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 20);
                break;
            default:
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.8, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 30);
                break;
        }
    },

    "personalizacion_ropaCamara": function (type) {
        switch (type) {
            //case "Hats":
            //    global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 10);
            //    break;
            //case "Glasses":
            //    global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo - 5);
            //    break;
            case "Cara":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z + 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo);
                break;
            case "Torsos": case "Conjuntos": case "Miscelánea":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.1, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 25);
                break;
            case "Tops":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z + 0.35, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Camisa interior":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z + 0.35, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Accesorios":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z + 0.35, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case "Pantalones":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.35, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 15);
                break;
            case "Calzado":
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.9, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 10);
                break;
            default:
                global_personalizacion.crearCamara(camaraP.x, camaraP.y, camaraP.z - 0.1, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 25);
                break;
        }
    },
    //Cara paso1 y paso2
    "personalizacion_colorojos": function (colorOjo) {
        player_local.setEyeColor(colorOjo);
    },
    "personalizacion_actualizarskin": function (strJSON) {
        var skindata = JSON.parse(strJSON);
        player_local.setHeadBlendData(skindata[0], skindata[1], 0, skindata[2], 0, 0, skindata[3], 0, 0, false);
    },
    "personalizacion_actualizarcara": function (strJSON) {
        var facedata = JSON.parse(strJSON);
        for (var i = 0; i < facedata.length; i++) {
            player_local.setFaceFeature(i, facedata[i]);
        }
    },
    //Peluquerias o barberias
    "personalizacion_headoverlay": function (strJSON) {
        var d = JSON.parse(strJSON);
        player_local.setHeadOverlay(d.id, d.index, d.opacity, d.color1, d.color2);
        switch (d.id) {
            //Manchas 
            case 0:
                paso3head[0].id = d.id;
                paso3head[0].index = d.index;
                paso3head[0].opacity = d.opacity;
                paso3head[0].color1 = d.color1;
                paso3head[0].color2 = d.color2;
                break;
                //Vello facial
            case 1:
                paso3head[1].id = d.id;
                paso3head[1].index = d.index;
                paso3head[1].opacity = d.opacity;
                paso3head[1].color1 = d.color1;
                paso3head[1].color2 = d.color2;
                break;
                //Cejas
            case 2:
                paso3head[2].id = d.id;
                paso3head[2].index = d.index;
                paso3head[2].opacity = d.opacity;
                paso3head[2].color1 = d.color1;
                paso3head[2].color2 = d.color2;
                break;
                //Envejecimiento 
            case 3:
                paso3head[3].id = d.id;
                paso3head[3].index = d.index;
                paso3head[3].opacity = d.opacity;
                paso3head[3].color1 = d.color1;
                paso3head[3].color2 = d.color2;
                break;
                //Maquillaje 
            case 4:
                paso3head[4].id = d.id;
                paso3head[4].index = d.index;
                paso3head[4].opacity = d.opacity;
                paso3head[4].color1 = d.color1;
                paso3head[4].color2 = d.color2;
                break;
                //Blush 
            case 5:
                paso3head[5].id = d.id;
                paso3head[5].index = d.index;
                paso3head[5].opacity = d.opacity;
                paso3head[5].color1 = d.color1;
                paso3head[5].color2 = d.color2;
                break;
                //Complexión
            case 6:
                paso3head[6].id = d.id;
                paso3head[6].index = d.index;
                paso3head[6].opacity = d.opacity;
                paso3head[6].color1 = d.color1;
                paso3head[6].color2 = d.color2;
                break;
                //daños por sol
            case 7:
                paso3head[7].id = d.id;
                paso3head[7].index = d.index;
                paso3head[7].opacity = d.opacity;
                paso3head[7].color1 = d.color1;
                paso3head[7].color2 = d.color2;
                break;
                //barra de labios
            case 8:
                paso3head[8].id = d.id;
                paso3head[8].index = d.index;
                paso3head[8].opacity = d.opacity;
                paso3head[8].color1 = d.color1;
                paso3head[8].color2 = d.color2;
                break;
                //Moles / Pecas
            case 9:
                paso3head[9].id = d.id;
                paso3head[9].index = d.index;
                paso3head[9].opacity = d.opacity;
                paso3head[9].color1 = d.color1;
                paso3head[9].color2 = d.color2;
                break;
                //pelo en el pecho
            case 10:
                paso3head[10].id = d.id;
                paso3head[10].index = d.index;
                paso3head[10].opacity = d.opacity;
                paso3head[10].color1 = d.color1;
                paso3head[10].color2 = d.color2;
                break;
                //manchas corporales
            case 11:
                paso3head[11].id = d.id;
                paso3head[11].index = d.index;
                paso3head[11].opacity = d.opacity;
                paso3head[11].color1 = d.color1;
                paso3head[11].color2 = d.color2;
                break;
        }
    },
    "personalizacion_colorpelo": function (col1, col2) {
        player_local.setHairColor(col1, col2);
        paso3_colorpelo1 = col1;
        paso3_colorpelo2 = col2;
    },
    "personalizacion_degradadopelo": function (collection, overlay) {
        player_local.clearFacialDecorations();
        player_local.clearDecorations();
        if(tatuajesPersonaje.length > 0){
            for (let i = 0; i < tatuajesPersonaje.length; i++) {
                if(tatuajesPersonaje[i].zona != 19){
                    player_local.setDecoration(mp.game.joaat(tatuajesPersonaje[i].coleccion), mp.game.joaat(tatuajesPersonaje[i].nombre));
                }
            }
        }
            if (collection != "vacio" && overlay != "vacio"){
                player_local.setFacialDecoration(mp.game.joaat(collection), mp.game.joaat(overlay));
                paso3_degradadocoleccion = collection;
                paso3_degradadooverlay = overlay;
            }
    },
    //Tienda de ropa
    "personalizacion_ropa": function (strJSON) {
        if (player_local.model == freemodeModels[0]) {
            genero_pj = 0;
        } else {
            genero_pj = 1;
        }
        console.log(strJSON);
        var d = JSON.parse(strJSON);
        player_local.setComponentVariation(parseInt(d.title), parseInt(d.number), parseInt(d.color), parseInt(d.underColor));
        switch (d.title) {
            case 2:
                ropa[0].id = d.number;
                ropa[0].color = d.color;
                ropa[0].underColor = d.underColor;
                break;
            case 3:
                ropa[1].id = d.number;
                ropa[1].color = d.color;
                ropa[1].underColor = d.underColor;
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + parseInt(ropa[1].id) + "\")");
                break;
            case 4:
                ropa[2].id = d.number;
                ropa[2].color = d.color;
                ropa[2].underColor = d.underColor;
                break;
            case 5:
                ropa[3].id = d.number;
                ropa[3].color = d.color;
                ropa[3].underColor = d.underColor;
                break;
            case 6:
                ropa[4].id = d.number;
                ropa[4].color = d.color;
                ropa[4].underColor = d.underColor;
                break;
            case 7:
                ropa[5].id = d.number;
                ropa[5].color = d.color;
                ropa[5].underColor = d.underColor;
                break;
            case 8:
                ropa[6].id = d.number;
                ropa[6].color = d.color;
                ropa[6].underColor = d.underColor;
                if (genero_pj == 0) {
                    // male
                    if (undershirtDataMale.undershirts[ropa[7].id][parseInt(d.number)].BestTorsoDrawable != -1) {
                        ropa[1].id = undershirtDataMale.undershirts[ropa[7].id][parseInt(d.number)].BestTorsoDrawable;
                        ropa[1].color = 0;
                        ropa[1].underColor = 2;
                        cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + parseInt(ropa[1].id) + "\")");
                        player_local.setComponentVariation(3, undershirtDataMale.undershirts[ropa[7].id][parseInt(d.number)].BestTorsoDrawable, 0, 2);
                    } else {
                        ropa[1].id = torsoDataMale.torsos[ropa[7].id][ropa[7].color].BestTorsoDrawable;
                        ropa[1].color = torsoDataMale.torsos[ropa[7].id][ropa[7].color].BestTorsoTexture;
                        ropa[1].underColor = 2;
                        cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + parseInt(ropa[1].id) + "\")");
                        player_local.setComponentVariation(3, torsoDataMale.torsos[ropa[7].id][ropa[7].color].BestTorsoDrawable, torsoDataMale.torsos[ropa[7].id][ropa[7].color].BestTorsoTexture, 2);
                    }
                } else {
                    // female
                    if (undershirtDataFemale.undershirts[ropa[7].id][parseInt(d.number)].BestTorsoDrawable != -1) {
                        ropa[1].id = undershirtDataFemale.undershirts[ropa[7].id][parseInt(d.number)].BestTorsoDrawable;
                        ropa[1].color = 0;
                        ropa[1].underColor = 2;
                        player_local.setComponentVariation(3, undershirtDataFemale.undershirts[ropa[7].id][parseInt(d.number)].BestTorsoDrawable, 0, 2);
                    } else {
                        ropa[1].id = torsoDataFemale.torsos[ropa[7].id][ropa[7].color].BestTorsoDrawable;
                        ropa[1].color = torsoDataFemale.torsos[ropa[7].id][ropa[7].color].BestTorsoTexture;
                        ropa[1].underColor = 2;
                        cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + parseInt(ropa[1].id) + "\")");
                        player_local.setComponentVariation(3, torsoDataFemale.torsos[ropa[7].id][ropa[7].color].BestTorsoDrawable, torsoDataFemale.torsos[ropa[7].id][ropa[7].color].BestTorsoTexture, 2);
                    }
                }
                break;
            case 11:
                ropa[7].id = d.number;
                ropa[7].color = d.color;
                ropa[7].underColor = d.underColor;
                // Cambia la camisa a la vez para poner la por defecto
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTop(\"" + parseInt(d.number) + "\")");
                ropa[6].color = 0;
                ropa[6].underColor = 2;
                if (genero_pj == 0) {
                    // male
                    ropa[6].id = 15;
                    player_local.setComponentVariation(parseInt(8), parseInt(15), parseInt(0), parseInt(2));
                    if (torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) {
                        ropa[1].id = torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable;
                        ropa[1].color = torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture;
                        ropa[1].underColor = 2;
                        cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + parseInt(ropa[1].id) + "\")");
                        player_local.setComponentVariation(3, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture, 2);
                    }
                } else {
                    // female
                    ropa[6].id = 14;
                    player_local.setComponentVariation(parseInt(8), parseInt(14), parseInt(0), parseInt(2));
                    if (torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) {
                        ropa[1].id = torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable;
                        ropa[1].color = torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture;
                        ropa[1].underColor = 2;
                        cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + parseInt(ropa[1].id) + "\")");
                        player_local.setComponentVariation(3, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture, 2);
                    }
                }
                break;
        }
    },
    //"personalizacion_accesorio": (strJSON) => {
    //    const d = JSON.parse(strJSON);
    //    player_local.setPropIndex(d.title, d.number, d.color, false);
    //},
    //Tienda de ropa
    "cambiar_ropa": function (strJSON, filtro) {
        var d = JSON.parse(strJSON);
        player_local.setComponentVariation(parseInt(d.title), parseInt(d.number), parseInt(d.color), parseInt(d.underColor));
        if (filtro != undefined && filtro) {
            switch (d.title) {
                case 11:
                    if (genero_pj == 0) {
                        // male
                        player_local.setComponentVariation(parseInt(8), parseInt(15), parseInt(0), parseInt(2));
                        if (torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) player_local.setComponentVariation(3, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture, 2);
                    } else {
                        // female
                        player_local.setComponentVariation(parseInt(8), parseInt(14), parseInt(0), parseInt(2));
                        if (torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) player_local.setComponentVariation(3, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture, 2);
                    }
                    break;
                case 8:
                    if (genero_pj == 0) {
                        // male
                        if (undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable != -1) {
                            player_local.setComponentVariation(3, undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable, 0, 2);
                        } else {
                            player_local.setComponentVariation(3, torsoDataMale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoDrawable, torsoDataMale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoTexture, 2);
                        }
                    } else {
                        // female
                        if (undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable != -1) {
                            player_local.setComponentVariation(3, undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable, 0, 2);
                        } else {
                            player_local.setComponentVariation(3, torsoDataFemale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoDrawable, torsoDataFemale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoTexture, 2);
                        }
                    }
                    break;
            }
        }
    },
    "comprar_ropa": function (strJSON, filtro) {
        var d = JSON.parse(strJSON);
        if (filtro != undefined && !filtro) {
            mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);
        }
        switch (d.title) {
            case 11:
                ropa_personaje.top.id = d.number;
                ropa_personaje.top.textura = d.color;
                if (filtro != undefined && filtro) {
                    cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTop(\"" + parseInt(d.number) + "\")");
                    if (genero_pj == 0) {
                        // male
                        ropa_personaje.camisa.id = parseInt(15);
                        ropa_personaje.camisa.textura = parseInt(0);
                        mp.events.callRemote("ppj_comprar_ropa", negocio_id, parseInt(8), parseInt(15), parseInt(0), 0);
                        if (torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) {
                            ropa_personaje.torso.id = torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable;
                            ropa_personaje.torso.textura = torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture;
                            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable + "\")");
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, 3, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture, 0);
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);
                        }
                    } else {
                        // female
                        ropa_personaje.camisa.id = parseInt(14);
                        ropa_personaje.camisa.textura = parseInt(0);
                        mp.events.callRemote("ppj_comprar_ropa", negocio_id, parseInt(8), parseInt(14), parseInt(0), 0);
                        if (torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) {
                            ropa_personaje.torso.id = torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable;
                            ropa_personaje.torso.textura = torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture;
                            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable + "\")");
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, 3, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture, 0);
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);
                        }
                    }
                }
                break;
            case 8:
                ropa_personaje.camisa.id = d.number;
                ropa_personaje.camisa.textura = d.color;
                if (filtro != undefined && filtro) {
                    if (genero_pj == 0) {
                        // male
                        if (undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable != -1) {
                            ropa_personaje.torso.id = undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable;
                            ropa_personaje.torso.textura = 0;
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, 3, undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable, 0, 0);
                            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + ropa_personaje.torso.id + "\")");
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);
                        } else {
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, 3, torsoDataMale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoDrawable, torsoDataMale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoTexture, 0);
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);

                        }
                    } else {
                        // female
                        if (undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable != -1) {
                            ropa_personaje.torso.id = undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable;
                            ropa_personaje.torso.textura = 0;
                            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + ropa_personaje.torso.id + "\")");
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, 3, undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable, 0, 0);
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);

                        } else {
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, 3, torsoDataFemale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoDrawable, torsoDataFemale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoTexture, 0);
                            mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);
                        }
                    }
                }
                break;
            case 3:
                ropa_personaje.torso.id = d.number;
                ropa_personaje.torso.textura = d.color;
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + d.number + "\")");
                mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);

                break;
            case 4:
                ropa_personaje.pantalones.id = d.number;
                ropa_personaje.pantalones.textura = d.color;
                mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);

                break;
            case 5:
                ropa_personaje.misc.id = d.number;
                ropa_personaje.misc.textura = d.color;
                mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);

                break;
            case 6:
                ropa_personaje.calzado.id = d.number;
                ropa_personaje.calzado.textura = d.color;
                mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);

                break;
            case 7:
                ropa_personaje.accesorio.id = d.number;
                ropa_personaje.accesorio.textura = d.color;
                mp.events.callRemote("ppj_comprar_ropa", negocio_id, d.title, d.number, d.color, d.precio);

                break;
            default:
                break;
        }
    },
    //Armarios de las casas
    "equipar_ropa": function (strJSON, filtro) {
        var d = JSON.parse(strJSON);
        player_local.setComponentVariation(parseInt(d.title), parseInt(d.number), parseInt(d.color), 0);
        if (filtro != undefined && filtro) {
            switch (d.title) {
                case 11:
                    if (genero_pj == 0) {
                        // male
                        player_local.setComponentVariation(parseInt(8), parseInt(15), parseInt(0), parseInt(2));
                        if (torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) player_local.setComponentVariation(3, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture, 2);
                    } else {
                        // female
                        player_local.setComponentVariation(parseInt(8), parseInt(14), parseInt(0), parseInt(2));
                        if (torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) player_local.setComponentVariation(3, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture, 2);
                    }
                    break;
                case 8:
                    if (genero_pj == 0) {
                        // male
                        if (undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable != -1) {
                            player_local.setComponentVariation(3, undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable, 0, 2);
                        } else {
                            player_local.setComponentVariation(3, torsoDataMale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoDrawable, torsoDataMale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoTexture, 2);
                        }
                    } else {
                        // female
                        if (undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable != -1) {
                            player_local.setComponentVariation(3, undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable, 0, 2);
                        } else {
                            player_local.setComponentVariation(3, torsoDataFemale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoDrawable, torsoDataFemale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoTexture, 2);
                        }
                    }
                    break;
            }
        }
    },
    "poner_ropa": function (strJSON, filtro) {
        var d = JSON.parse(strJSON);
        mp.events.callRemote("ppj_poner_ropa", d.title, d.number, d.color);
        // Ya que los conjuntos envía el d.title como string y al poner la ropa normal lo envía como int
        if (typeof d.title === "string") {
            filtro = false;
        }
        switch (parseInt(d.title)) {
            case 11:
                ropa_personaje.top.id = d.number;
                ropa_personaje.top.textura = d.color;
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTop(\"" + parseInt(d.number) + "\")");
                if (filtro != undefined && filtro) {
                    if (genero_pj == 0) {
                        // male
                        ropa_personaje.camisa.id = parseInt(15);
                        ropa_personaje.camisa.textura = parseInt(0);
                        mp.events.callRemote("ppj_poner_ropa", 8, 15, 0);
                        if (torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) {
                            ropa_personaje.torso.id = torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable;
                            ropa_personaje.torso.textura = torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture;
                            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable + "\")");
                            mp.events.callRemote("ppj_poner_ropa", 3, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataMale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture);
                        }
                    } else {
                        // female
                        ropa_personaje.camisa.id = parseInt(14);
                        ropa_personaje.camisa.textura = parseInt(0);
                        mp.events.callRemote("ppj_poner_ropa", 8, 14, 0);
                        if (torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable != -1) {
                            ropa_personaje.torso.id = torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable;
                            ropa_personaje.torso.textura = torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture;
                            cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable + "\")");
                            mp.events.callRemote("ppj_poner_ropa", 3, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoDrawable, torsoDataFemale.torsos[parseInt(d.number)][parseInt(d.color)].BestTorsoTexture);
                        }
                    }
                }
                break;
            case 8:
                ropa_personaje.camisa.id = d.number;
                ropa_personaje.camisa.textura = d.color;
                if (filtro != undefined && filtro) {
                    if (genero_pj == 0) {
                        // male
                        if (undershirtDataMale.undershirts[ropa_personaje.top.id] != undefined) {
                            if (undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable != -1) {
                                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable + "\")");
                                mp.events.callRemote("ppj_poner_ropa", 3, undershirtDataMale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable, 0);
                            } else {
                                mp.events.callRemote("ppj_poner_ropa", 3, torsoDataMale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoDrawable, torsoDataMale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoTexture);
                            }
                        }

                    } else {
                        // female
                        if (undershirtDataFemale.undershirts[ropa_personaje.top.id] != undefined) {
                            if (undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable != -1 && undershirtDataFemale.undershirts[ropa_personaje.top.id] != undefined) {
                                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable + "\")");
                                mp.events.callRemote("ppj_poner_ropa", 3, undershirtDataFemale.undershirts[ropa_personaje.top.id][parseInt(d.number)].BestTorsoDrawable, 0);
                            } else {
                                mp.events.callRemote("ppj_poner_ropa", 3, torsoDataFemale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoDrawable, torsoDataFemale.torsos[ropa_personaje.top.id][ropa_personaje.top.textura].BestTorsoTexture);
                            }
                        }
                    }
                }
                break;
            case 3:
                ropa_personaje.torso.id = d.number;
                ropa_personaje.torso.textura = d.color;
                cef_personalizacion.ejecutarCef(personalizacion_cefId, "cargarNuevoTorso(\"" + d.number + "\")");
                break;
            case 4:
                ropa_personaje.pantalones.id = d.number;
                ropa_personaje.pantalones.textura = d.color;
                break;
            case 5:
                ropa_personaje.misc.id = d.number;
                ropa_personaje.misc.textura = d.color;
                break;
            case 6:
                ropa_personaje.calzado.id = d.number;
                ropa_personaje.calzado.textura = d.color;
                break;
            case 7 || 8:
                ropa_personaje.accesorio.id = d.number;
                ropa_personaje.accesorio.textura = d.color;
                break;
            default:
                break;
        }
    },
    "poner_ropa_personaje": function () {
        // Accesorios
        player_local.setComponentVariation(7, parseInt(ropa_personaje.accesorio.id), parseInt(ropa_personaje.accesorio.textura), 2)
        // top
        player_local.setComponentVariation(11, parseInt(ropa_personaje.top.id), parseInt(ropa_personaje.top.textura), 2)
        // torso
        player_local.setComponentVariation(3, parseInt(ropa_personaje.torso.id), parseInt(ropa_personaje.torso.textura), 2)
        // Camisa
        player_local.setComponentVariation(8, parseInt(ropa_personaje.camisa.id), parseInt(ropa_personaje.camisa.textura), 2)
        // pantalones
        player_local.setComponentVariation(4, parseInt(ropa_personaje.pantalones.id), parseInt(ropa_personaje.pantalones.textura), 2)
        // calzado
        player_local.setComponentVariation(6, parseInt(ropa_personaje.calzado.id), parseInt(ropa_personaje.calzado.textura), 2)
        // Misc
        player_local.setComponentVariation(5, parseInt(ropa_personaje.misc.id), parseInt(ropa_personaje.misc.textura), 2)

    },
    "eliminar_ropa": function (strJSON) {
        var d = JSON.parse(strJSON);
        mp.events.callRemote("ppj_eliminar_ropa", d.title, d.number, d.color);
    },
    // Eventos de los conjuntos
    "crear_conjunto": (prendasStr, nombre) => {
        mp.events.callRemote("ppj_crear_conjunto", JSON.stringify(ropa_personaje), nombre);
    },

    "eliminar_conjunto": (id) => {
        mp.events.callRemote("ppj_eliminar_conjunto", (typeof id != 'number' ? parseInt(id) : id));
    },
    // Fin eventos de los conjuntos

    "resultado_poner_ropa": function (info) {
        cef_personalizacion.ejecutarCef(personalizacion_cefId, "mostrarInfo(\"" + info + "\")");
    },
    //Peluquerias o barberias
    "comprar_pelo": function (strJSON) {
        var d = JSON.parse(strJSON);
        player_local.setHeadOverlay(d.id, d.index, d.opacity, d.color1, d.color2);
        mp.events.callRemote("ppj_comprar_pelo", negocio_id, d.precio, d.id, d.index, d.opacity, d.color1, d.color2);
    },
    "comprar_colorpelo": function (col1, col2) {
        mp.events.callRemote("ppj_comprar_pelo_color", col1, col2);
    },
    "comprar_degradadopelo": function (collection, overlay) {
        mp.events.callRemote("ppj_comprar_pelo_degradado", mp.game.joaat(collection), mp.game.joaat(overlay));
    },
    "error_comprar_ropa": function (error) {
        if (personalizacion_cefId >= 0) {
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "mostrarError(\"" + error + "\")");
        }
    },
    "resultado_comprar_ropa": function (info) {
        if (personalizacion_cefId >= 0) {
            cef_personalizacion.ejecutarCef(personalizacion_cefId, "mostrarInfo(\"" + info + "\")");
        }
    },
    "finalizar_ropa": function () {
        player_local.freezePosition(false);
        mp.events.call("DestruirCamara");
        mp.events.call("personalizacion_cambiarLuz", true);
        if (personalizacion_cefId >= 0) {
            cef_personalizacion.cerrarCef(personalizacion_cefId);
            personalizacion_cefId = -1;
        }

        mp.gui.chat.show(false);
        mp.game.cam.doScreenFadeOut(25);

        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(750);
            if (hudOculto) mp.events.call("hud:estado_hud");
            mp.gui.chat.show(true);
        }, 1000);

        mp.events.callRemote("finalizar_ropa");
    },
    "cambiar_tatuaje": function (strJSON) {
        var d = JSON.parse(strJSON);

        player_local.clearDecorations();
        for (let i = 0; i < tatuajesPersonaje.length; i++) {
        player_local.setDecoration(mp.game.joaat(tatuajesPersonaje[i].coleccion), mp.game.joaat(tatuajesPersonaje[i].nombre));
        }
        if(d.hash != "vacio") player_local.setDecoration(mp.game.joaat(d.coleccion), mp.game.joaat(d.hash));
    },
    "comprar_tatuaje": function (strJSON) {
        var d = JSON.parse(strJSON);
        player_local.clearDecorations();
        player_local.clearFacialDecorations();
        
        for (let i = 0; i < tatuajesPersonaje.length; i++) {
            if(d.zona == 19 && tatuajesPersonaje[i].zona == 19){
                tatuajesPersonaje[i].coleccion = d.coleccion;
                tatuajesPersonaje[i].nombre = d.hash;
                player_local.setDecoration(mp.game.joaat(tatuajesPersonaje[i].coleccion), mp.game.joaat(tatuajesPersonaje[i].nombre))
                mp.events.callRemote("ppj_comprar_tatuaje", negocio_id, d.precio, d.zona, d.hash, d.coleccion);
                return;
            }
            player_local.setDecoration(mp.game.joaat(tatuajesPersonaje[i].coleccion), mp.game.joaat(tatuajesPersonaje[i].nombre))
        }
        
        let obj = {
            zona: d.zona,
            nombre: d.hash,
            coleccion: d.coleccion
        }
        tatuajesPersonaje.push(obj);
        
        // player_local.setDecoration(mp.game.joaat(d.coleccion), mp.game.joaat(d.hash));
        mp.events.callRemote("ppj_comprar_tatuaje", negocio_id, d.precio, d.zona, d.hash, d.coleccion);
    },
    "eliminar_tatuaje": function (strJSON) {
        var d = JSON.parse(strJSON);
        for (let i = 0; i < tatuajesPersonaje.length; i++) {
            if(d.hash == tatuajesPersonaje[i].nombre){
                tatuajesPersonaje.splice(i, 1);
            }
        }
        mp.events.callRemote("ppj_eliminar_tatuaje", negocio_id, d.zona, d.hash, d.coleccion);
    },
    "tatuajes_ropaCamara": function (type) {
        switch (parseInt(type)) {
            case 0: // Cuerpo
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 1: // Cara
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 2: // Brazo izquierdo
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 3: // Brazo derecho
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 4: // Pierna izquierda
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z - 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case 5: // Pierna derecha
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z - 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case 6: // Pectoral izquierdo
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 7: // Pectoral derecho
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 8: // Gemelo izquierdo
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z - 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case 9: // Gemelo derecho
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z - 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case 10: // Hombro izquierdo
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 11: // Hombro derecho
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 12: // Muslo izquierdo
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z - 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case 13: // Muslo derecho
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z - 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 8);
                break;
            case 14: // Barriga
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 15: // Mano izquierda
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 16: // Mano derecha
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 17: //Espalda
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.3, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            case 18: // Cuello
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z + 0.6, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 5);
                break;
            default:
                global_personalizacion.crearCamara(camaraP.x, camaraP.y + 0.90, camaraP.z - 0.13, camaraP.rx, camaraP.ry, camaraP.rz, camaraP.angulo + 35);
                break;
        }
    },
    "personalizacion:fadeInOut": function (tiempoout, tiemposig, tiempoin) {
        if (!hudOculto) mp.events.call("hud:estado_hud");
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
        mp.game.cam.doScreenFadeOut(tiempoout);

        setTimeout(function () {
            mp.game.cam.doScreenFadeIn(tiempoin)
        }, tiemposig);
    },
    "personalizacion_cambiarLuz": function (forzarApagado = false) { // Crea/destruye una luz para iluminar al personaje en el /ropa
        // Si sale de la personalizacion y la luz estaba encendida la paramos
        if (forzarApagado == true) {
            if (renderLuzRopaActivo == true) {
                renderLuzRopaActivo = false;
                mp.events.remove("render", renderLuzRopa);
            }
            return;
        }

        // Si enciende o apaga la luz creamos/borramos el render de la luz
        if (renderLuzRopaActivo == false) {
            renderLuzRopaActivo = true;
            mp.events.add("render", renderLuzRopa);
        }
        else {
            renderLuzRopaActivo = false;
            mp.events.remove("render", renderLuzRopa);
        }
    },
});

// Render que mantiene la luz del /ropa
let renderLuzRopaActivo = false;
function renderLuzRopa() {
    if (camara != undefined && camara != null) {
        let camDir = camara.getDirection();
        let camPos = camara.getCoord();
        if (camDir != undefined && camDir != null && camPos != undefined && camPos != null) {
            mp.game.graphics.drawSpotLightWithShadow(camPos.x, camPos.y, camPos.z, camDir.x, camDir.y, camDir.z, 255, 255, 255, 13.0, 1.0, 1.0, 20.0, 1.0, 1.0);
        }
    }
}

// Disparado cada tic
//mp.events.add("render", () => {
//    if (navegadorEditorPersonaje !== undefined && camaraSkin !== null)
//    {
//        mp.gui.cursor.visible = true;
//        mp.gui.chat.show(false);
//        mp.game.ui.displayRadar(false);
//        if (camaraSkin.isActive) {
//            camara_auth.setActive(true);
//        }
//        if (controlCamara) {
//            //NAPI.player_local.Stopplayer_localAnimation();
//            //API.loadAnimationDict("random@shop_tattoo");
//            //NAPI.player_local.Playplayer_localAnimation("random@shop_tattoo", "_idle", (1 | 2));
//        }
//        //mp.game.ui.drawSubtitleTimed(0, "Utiliza las teclas ~y~A ~w~y ~y~D ~w~para rotar el personaje" + (controlCamara ? "~n~Usa ~y~W ~w~y ~y~S ~w~para controlar la altura de la cámara y ~y~E ~w~y ~y~Q ~w~para el zoom." : ""));
//    }
//});
//function asignarRopaActual() {
//    let variacion = 0;
//    let textura = 0;
//    let palette = 0;
//    //Pelo 2
//    variacion = player_local.getDrawableVariation(2);
//    textura = player_local.getTextureVariation(2);
//    palette = player_local.getPaletteVariation(2);
//    ropa[0].id = variacion;
//    ropa[0].color = textura;
//    ropa[0].underColor = palette;
//    player_local.setComponentVariation(2, variacion, textura, palette);
//    //Torso 3
//    variacion = player_local.getDrawableVariation(3);
//    textura = player_local.getTextureVariation(3);
//    palette = player_local.getPaletteVariation(3);
//    ropa[1].id = variacion;
//    ropa[1].color = textura;
//    ropa[1].underColor = palette;
//    player_local.setComponentVariation(3, variacion, textura, palette);
//    //pantalones 4
//    variacion = player_local.getDrawableVariation(4);
//    textura = player_local.getTextureVariation(4);
//    palette = player_local.getPaletteVariation(4);
//    ropa[2].id = variacion;
//    ropa[2].color = textura;
//    ropa[2].underColor = palette;
//    player_local.setComponentVariation(2, variacion, textura, palette);
//    //Foot 6
//    variacion = player_local.getDrawableVariation(6);
//    textura = player_local.getTextureVariation(6);
//    palette = player_local.getPaletteVariation(6);
//    ropa[3].id = variacion;
//    ropa[3].color = textura;
//    ropa[3].underColor = palette;
//    player_local.setComponentVariation(6, variacion, textura, palette);
//    //Accessories  7
//    variacion = player_local.getDrawableVariation(7);
//    textura = player_local.getTextureVariation(7);
//    palette = player_local.getPaletteVariation(7);
//    ropa[4].id = variacion;
//    ropa[4].color = textura;
//    ropa[4].underColor = palette;
//    player_local.setComponentVariation(7, variacion, textura, palette);
//    //Undershirts 8
//    variacion = player_local.getDrawableVariation(8);
//    textura = player_local.getTextureVariation(8);
//    palette = player_local.getPaletteVariation(8);
//    ropa[5].id = variacion;
//    ropa[5].color = textura;
//    ropa[5].underColor = palette;
//    player_local.setComponentVariation(8, variacion, textura, palette);
//    //top 11
//    variacion = player_local.getDrawableVariation(11);
//    textura = player_local.getTextureVariation(11);
//    palette = player_local.getPaletteVariation(11);
//    ropa[6].id = variacion;
//    ropa[6].color = textura;
//    ropa[6].underColor = palette;
//    player_local.setComponentVariation(11, variacion, textura, palette);
//}

//mp.events.add('playerCommand', (command) => {
//    const args = command.split(/[ ]+/);
//    const commandName = args[0];

//    args.shift();

//    if (commandName === "verropa") {
//        mp.gui.chat.push(player_local.getVariable("ROPA"));
//    }
//});

//# sourceMappingURL=personalizacion.js.map
}