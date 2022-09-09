{
/* --------------------------------------------------------------------------------
 * academias.js
 *
 * Autor: Kenshin
 *
 * Descripción: Diferentes scripts y recursos para las academias
 * -------------------------------------------------------------------------------- */
var global_arrestar = require('./LURP/global');
var cef_arrestar = require('./LURP/cef.js');


var arrestar_cefId = -1;

var ficha_arresto = 0;
var agente_arresto = 0;
var tipo_arresto = 0;
var tiempo_arresto = 0;
var juicio_arresto = 0;
var puntos_arresto = 0;
var multa_arresto = 0;
var carnet_arresto = 0;
var fecha_arresto = "";
var dependencia_arresto = 0;
var celdaHash  = 0;

let arrestar_navegador = null;
let timeoutFoto = null;
let anteriorPosicionFoto = null;

mp.events.add('justicia:arrestar:mostrar', function (celda, json) {

    anteriorPosicionFoto = player_local.position;

    var array = JSON.parse(json);

    ficha_arresto = array.ficha_id;
    agente_arresto = array.agente_personaje_id;
    tipo_arresto = array.tipo;
    tiempo_arresto = array.tiempo;
    juicio_arresto = array.juicio;
    puntos_arresto = array.puntos;
    multa_arresto = array.multa;
    carnet_arresto = array.carnet;
    fecha_arresto = array.fecha;
    dependencia_arresto = array.dependencia;
    celdaHash = celda;

    if (arrestar_cefId < 0) {
        arrestar_cefId = cef_arrestar.crearCef("package://LURP/cef/arrestar/arrestar.html", {
            puedeCerrar: true,
            mostrarCursor: true
        });

        cef_arrestar.ejecutarCef(arrestar_cefId, "departamento(" + array.dependencia + ")");
        cef_arrestar.ejecutarCef(arrestar_cefId, "condena(" + array.tipo + "," + array.multa + "," + array.puntos + "," + array.tiempo + ")");
		cef_arrestar.ejecutarCef(arrestar_cefId, "fecha('" + array.fecha + "')");
        cef_arrestar.ejecutarCef(arrestar_cefId, "cargos('" + JSON.stringify(array.cargos) + "')");
    }
});

mp.events.add('arrestar:cerrarcef', function () {
    if (arrestar_cefId >= 0) {
        cef_arrestar.cerrarCef(arrestar_cefId, false);
        arrestar_cefId = -1;
    }

    if(tipo_arresto == 0)
    {
        mp.events.callRemote("prision:arrestar", ficha_arresto, agente_arresto, tipo_arresto, tiempo_arresto, multa_arresto, puntos_arresto, carnet_arresto, celdaHash);

        fecha_arresto = "";
        ficha_arresto = 0;
        agente_arresto = 0;
        tipo_arresto = 0;
        tiempo_arresto = 0;
        multa_arresto = 0;
        puntos_arresto = 0;
        carnet_arresto = 0;
        juicio_arresto = 0;
        dependencia_arresto = 0;
        celdaHash = 0;
    }
    else
    {
        player_local.dimension = player_local.id;
        avatarEnProceso = true;

        player_local.clearTasksImmediately();

        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);
        mp.events.call("hud:estado_hud");
        
        mp.game.cam.doScreenFadeOut(70);
        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(100);

            mp.players.local.position = new mp.Vector3(405.15, -997.47, -99);

            global_arrestar.crearCamara(402.27, -1004.49, -98.56, 1.2367, 0, -3.51834, 45);

            setTimeout(() => {
            player_local.taskGoStraightToCoord(402.55, -996.37, -99.01, 0.5, -1, 180, 2);

            mp.events.call("hud:mostrar_loading", "Estamos sacando una foto para tu ficha");

            setTimeout(() => {
                setTimeout(async() => {
                    if (!mp.game.streaming.hasAnimDictLoaded("mp_character_creation@lineup@male_a")) {
                    mp.game.streaming.requestAnimDict("mp_character_creation@lineup@male_a");
                        while (!mp.game.streaming.hasAnimDictLoaded("mp_character_creation@lineup@male_a")) await mp.game.waitAsync(0);
                    }

                    player_local.taskPlayAnim("mp_character_creation@lineup@male_a", "loop_raised", 8.0, -8.0, -1, 1, 0.0, false, false, false);
                    
                }, 6000);

                setTimeout(() => {
                    mp.events.call("arrestar:foto:iniciar", true, 3500);
                }, 6300);
            }, 1000);
            }, 300);
        }, 800);
    }
});

mp.events.add("arrestar:foto:iniciar", (camaraAnterior=false, secs = 2000) => { 

    if (camaraAnterior) {
        global_arrestar.interpolateCamaras(new mp.Vector3(402.6, -998.75, -99.12), new mp.Vector3(0, 0, 358), 45, secs, 1000);
    } else {
        global_arrestar.crearCamara(402.6, -998.75, -99.12, 0, 0, 358, 45);
    }

    let comisaria = "Desconocido";

    if(dependencia_arresto == 0)
    {
        comisaria = "Juzgados";
    }

    if(dependencia_arresto == 1)
    {
        comisaria = "Mission Row (LSPD)";
    }

    if(dependencia_arresto == 2)
    {
        comisaria = "Vinewood (LSPD)";
    }

    if(dependencia_arresto == 3)
    {
        comisaria = "Vespucci Beach (LSPD)";
    }

    if(dependencia_arresto == 4)
    {
        comisaria = "Del Perro (LSPD)";
    }

    if(dependencia_arresto == 5)
    {
        comisaria = "Rockford Hills (LSPD)";
    }
    
    if(dependencia_arresto == 6)
    {
        comisaria = "Paleto Bay (LSSD)";
    }
    
    if(dependencia_arresto == 7)
    {
        comisaria = "Sandy Shore (LSSD)";
    }

    if(dependencia_arresto == 8)
    {
        comisaria = "Davis (LSSD)";
    }

    if(dependencia_arresto == 9)
    {
        comisaria = "Los Santos (FIB)";
    }

    if(dependencia_arresto == 10)
    {
        comisaria = "NOOSE (FIB)";
    }

    if(dependencia_arresto == 11)
    {
        comisaria = "Penitenciaría de Bolingbroke (SASPA)";
    }

    /* switch(dependencia_arresto)
    {
        case 0:
            comisaria = "Juzgados";
            break;
        case 1:
            comisaria = "Mission Row (LSPD)";
            break;
        case 2:
            comisaria = "Vinewood (LSPD)";
            break;
        case 3:
            comisaria = "Vespucci Beach (LSPD)";
            break;
        case 4:
            comisaria = "Del Perro (LSPD)";
            break;
        case 5:
            comisaria = "Rockford Hills (LSPD)";
            break;
        case 6:
            comisaria = "Paleto Bay (LSSD)";
            break;
        case 7:
            comisaria = "Sandy Shore (LSSD)";
            break;
        case 8:
            comisaria = "Davis (LSSD)";
            break;
        case 9:
            comisaria = "Los Santos (FIB)";
            break;
        case 10:
            comisaria = "NOOSE (FIB)";
            break;
        case 11:
            comisaria = "Penitenciaría de Bolingbroke (SASPA)";
            break;
    } */

    mp.events.call("ShowMugshotBoard", fecha_arresto.padStart(6, 0), comisaria, "#" + ficha_arresto, nombre_pj, -1)
  
    setTimeout(() => {
      mp.gui.takeScreenshot('avatar.png', 1, 0, 100);
    
      arrestar_cefId = cef_arrestar.crearCef("package://LURP/cef/arrestar/foto.html", {
          mostrarCursor: false,
          sumarNumeroCefs: false
      });
    
      arrestar_navegador = cef_arrestar.obtenerCef(arrestar_cefId).navegador;
      mp.events.add('browserDomReady', arrestar_domReady);
  
      timeoutFoto = setTimeout(() => {
        mostrarAviso("danger", 8000, "Ha ocurrido un error mientras tomábamos la foto");
        mp.events.call("arrestar:foto:fin");
      }, 60*1000);
    }, 5700);
});

function arrestar_domReady() {
    let resolucion = mp.game.graphics.getScreenActiveResolution(100, 100);

    arrestar_navegador.call("arrestar:foto:cef", 'https://api.lu-rp.es/dries/s1/avatar/ficha/' + ficha_arresto, JSON.stringify(resolucion), ficha_arresto, apiKey, _k);
    mp.events.remove('browserDomReady', arrestar_domReady);
}

mp.events.add('arrestar:foto:fin', function () {

    player_local.position = anteriorPosicionFoto;
    player_local.dimension = 0;

    clearTimeout(timeoutFoto);
    timeoutFoto = null;
    mp.events.call("HideMugshotBoard");
  
    if (arrestar_cefId >= 0) {
        cef_arrestar.cerrarCef(arrestar_cefId, false, false, false);
        arrestar_cefId = -1;
        

        avatarEnProceso = false;
        mp.events.call("hud:cerrar_loading");
    
        
        mp.game.cam.doScreenFadeOut(70);
        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(100);

            mp.events.callRemote("cambiarDimension", 0);

            if(tipoMapa != 2) mp.game.ui.displayRadar(true);
            mp.game.ui.displayHud(true);
            mp.gui.chat.show(true);
            mp.events.call("hud:estado_hud");

            global_arrestar.destruirCamara();

            player_local.clearTasksImmediately();

            mostrarAviso("success", 8000, "Has añadido correctamente una foto a tu ficha");
        }, 800);
      
    }

    setTimeout(() => {
        mp.events.callRemote("prision:arrestar", ficha_arresto, agente_arresto, tipo_arresto, tiempo_arresto, multa_arresto, puntos_arresto, carnet_arresto, celdaHash);

        fecha_arresto = "";
        ficha_arresto = 0;
        agente_arresto = 0;
        tipo_arresto = 0;
        tiempo_arresto = 0;
        multa_arresto = 0;
        puntos_arresto = 0;
        carnet_arresto = 0;
        juicio_arresto = 0;
        dependencia_arresto = 0;
        celdaHash = 0;
    }, 2000);
});


const scriptConst = {
    boardPropName: "prop_police_id_board",
    textPropName: "prop_police_id_text",
    renderTargetName: "ID_Text",
    animDictionary: "mp_character_creation@lineup@male_a",
    animName: "loop_raised"
};

let scriptHandles = {
    boardHandle: null,
    textHandle: null,
    scaleformHandle: null,
    renderTargetID: null
};

let render_arrestar = function () {
    if (scriptHandles.scaleformHandle != null && scriptHandles.renderTargetID != null) {
        mp.game.ui.setTextRenderId(scriptHandles.renderTargetID);
        mp.game.graphics.drawScaleformMovie(scriptHandles.scaleformHandle, 0.405, 0.37, 0.81, 0.74, 255, 255, 255, 255, 0);
        mp.game.ui.setTextRenderId(1);
    }
}

mp.events.add("ShowMugshotBoard", (title, topText, midText, bottomText, rank = -1) => {
    if (scriptHandles.boardHandle == null) {

        mp.events.add('render', render_arrestar);

        // create props
        scriptHandles.boardHandle = mp.objects.new(mp.game.joaat("prop_police_id_board"), mp.players.local.position, new mp.Vector3(), 255, 0);
        scriptHandles.textHandle = mp.objects.new(mp.game.joaat("prop_police_id_text"), mp.players.local.position, new mp.Vector3(), 255, 0);

        // load scaleform & set up the content
        scriptHandles.scaleformHandle = mp.game.graphics.requestScaleformMovie("mugshot_board_01");
        while (!mp.game.graphics.hasScaleformMovieLoaded(scriptHandles.scaleformHandle)) mp.game.wait(0);

        if (!mp.game.graphics.hasScaleformMovieLoaded(scriptHandles.scaleformHandle)) {
            do
            {
                scriptHandles.scaleformHandle = mp.game.graphics.requestScaleformMovie("mugshot_board_01");
            } while (!mp.game.graphics.hasScaleformMovieLoaded(scriptHandles.scaleformHandle));
        }

        mp.game.graphics.pushScaleformMovieFunction(scriptHandles.scaleformHandle, "SET_BOARD");
        mp.game.graphics.pushScaleformMovieFunctionParameterString(title);
        mp.game.graphics.pushScaleformMovieFunctionParameterString(midText);
        mp.game.graphics.pushScaleformMovieFunctionParameterString(bottomText);
        mp.game.graphics.pushScaleformMovieFunctionParameterString(topText);
        mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
        if (rank > -1) mp.game.graphics.pushScaleformMovieFunctionParameterInt(rank);
        mp.game.graphics.popScaleformMovieFunctionVoid();

        // set up rendertarget
        mp.game.ui.registerNamedRendertarget("ID_Text", false);
        mp.game.ui.linkNamedRendertarget(mp.game.joaat("prop_police_id_text"));
        scriptHandles.renderTargetID = mp.game.ui.getNamedRendertargetRenderId("ID_Text");

        // attach to the player
        scriptHandles.boardHandle.attachTo(mp.players.local.handle, mp.players.local.getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, false, 2, true);
        scriptHandles.textHandle.attachTo(mp.players.local.handle, mp.players.local.getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, false, 2, true);

        // animation
        mp.game.streaming.requestAnimDict("mp_character_creation@lineup@male_a");
        while (!mp.game.streaming.hasAnimDictLoaded("mp_character_creation@lineup@male_a")) mp.game.wait(0);
        mp.players.local.taskPlayAnim("mp_character_creation@lineup@male_a", "loop_raised", 8.0, -8.0, -1, 1, 0.0, false, false, false);
    }
});

mp.events.add("HideMugshotBoard", () => {
    
    mp.events.remove("render", render_arrestar);

    if (scriptHandles.boardHandle != null) scriptHandles.boardHandle.destroy();
    if (scriptHandles.textHandle != null) scriptHandles.textHandle.destroy();
    if (scriptHandles.scaleformHandle != null) mp.game.graphics.setScaleformMovieAsNoLongerNeeded(scriptHandles.scaleformHandle);
    if (scriptHandles.renderTargetID != null) mp.game.ui.releaseNamedRendertarget("ID_Text"); // should be renderTargetName string but says "expected Number", whatever mp.game.invoke("0xE9F6FFE837354DD4", "ID_Text");
    scriptHandles.boardHandle = null;
    scriptHandles.textHandle = null;
    scriptHandles.scaleformHandle = null;
    scriptHandles.renderTargetID = null;

    mp.players.local.stopAnimTask("mp_character_creation@lineup@male_a", "loop_raised", -4.0);
    if (mp.game.streaming.hasAnimDictLoaded("mp_character_creation@lineup@male_a")) mp.game.streaming.removeAnimDict("mp_character_creation@lineup@male_a");
});
}