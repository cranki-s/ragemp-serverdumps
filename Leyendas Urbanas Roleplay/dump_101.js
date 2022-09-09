{
/* --------------------------------------------------------------------------------
 * avatar.js
 *
 * Autor: Dries
 *
 * Descripcion: Recoge una foto del personaje en las posiciones definidas y la envia a la super maravillosa api
 *
 * -------------------------------------------------------------------------------- */

var global_avatar = require('./LURP/global');
var cef_avatar = require('./LURP/cef.js');

var avatar_cefId = -1;
var avatar_navegador = null;

var anteriorPosicion = null;
var avatarEnProceso = false;

var timeoutAvatar = null;

mp.events.add("avatar:iniciar:escena", async (posicionInicial) => {
  anteriorPosicion = posicionInicial;
  avatarEnProceso = true;

  player_local.clearTasksImmediately();

  mp.game.ui.displayRadar(false);
  mp.game.ui.displayHud(false);
  mp.gui.chat.show(false);
  mp.events.call("hud:estado_hud");
  
  mp.game.cam.doScreenFadeOut(70);
  crearTimeout(() => {
    mp.game.cam.doScreenFadeIn(100);

    mp.players.local.position = new mp.Vector3(405.15, -997.47, -99);

    global_avatar.crearCamara(402.27, -1004.49, -98.56, 1.2367, 0, -3.51834, 45);

    crearTimeout(() => {
      player_local.taskGoStraightToCoord(402.55, -996.37, -99.01, 0.5, -1, 180, 2);

      crearTimeout(() => {
        mp.events.call("hud:mostrar_loading", "Estamos sacando una imagen de tu cara, ¡sonríe!");
        crearTimeout(async() => {
            if (!mp.game.streaming.hasAnimDictLoaded("random@shop_tattoo")) {
              mp.game.streaming.requestAnimDict("random@shop_tattoo");
                while (!mp.game.streaming.hasAnimDictLoaded("random@shop_tattoo")) await mp.game.waitAsync(0);
            }

            player_local.taskPlayAnim("random@shop_tattoo", "_idle", 8.0, 0, -1, 1, 0.0, false, false, false);
        }, 6000);

        mp.events.call("avatar:iniciar", true, 3500, false);
      }, 1000);
    }, 300);
  }, 800);
})

mp.events.add("avatar:iniciar", (camaraAnterior=false, secs = 2000, modifHud = true) => {
  posCamaraFoto = new mp.Vector3(402.5, -998, -98.32);

  if (camaraAnterior) {
    global_avatar.interpolateCamaras(new mp.Vector3(402.5, -998, -98.32), new mp.Vector3(0, 0, 358), 15, secs, 1000);
  } else {
    global_avatar.crearCamara(402.5, -998, -98.32, 0, 0, 358, 15);
  }

  avatarEnProceso = true;

  mp.events.add("render", renderLuzFoto);

  if (modifHud) {
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.gui.chat.show(false);
    mp.events.call("hud:estado_hud");
  }

    crearTimeout(() => {
    mp.gui.takeScreenshot('avatar.png', 1, 0, 100);
  
    avatar_cefId = cef_avatar.crearCef("package://LURP/sistemas/avatar/avatar.html", {
        mostrarCursor: false,
        sumarNumeroCefs: false
    });
  
    avatar_navegador = cef_avatar.obtenerCef(avatar_cefId).navegador;
    mp.events.add('browserDomReady', avatar_domReady);

    mp.events.remove("render", renderLuzFoto);

    timeoutAvatar = crearTimeout(() => {
      mostrarAviso("danger", 8000, "Ha ocurrido un error mientras tomábamos la foto. Por favor, inténtalo de nuevo en el Ayuntamiento");
      mp.events.call("avatar:fin");
    }, 60*1000);
  }, 5700);
});

function avatar_domReady() {
  let resolucion = mp.game.graphics.getScreenActiveResolution(100, 100);

  avatar_navegador.call("avatar:cef", 'https://api.lu-rp.es/dries/s1/avatar/personaje/' + personaje_id, JSON.stringify(resolucion), personaje_id, apiKey, _k);
  mp.events.remove('browserDomReady', avatar_domReady);
}

mp.events.add("avatar:fin", () => {
  clearTimeout(timeoutAvatar);
  timeoutAvatar = null;

  if (avatar_cefId >= 0) {
    cef_avatar.cerrarCef(avatar_cefId, false, false, false);
    avatar_cefId = -1;
    
    avatarEnProceso = false;
    mp.events.call("hud:cerrar_loading");

    if (personalizando) { // cef/personalizacion
      // if(tipoMapa != 2) mp.game.ui.displayRadar(true);

      // mp.game.ui.displayHud(true);
      // mp.gui.chat.show(true);
      // mp.events.call("hud:estado_hud");

      global_avatar.destruirCamara();

      player_local.clearTasksImmediately();
      
      mp.events.call("finalizar_personalizacion");
    } else {
      mp.game.cam.doScreenFadeOut(70);
      crearTimeout(() => {
        mp.game.cam.doScreenFadeIn(100);

        player_local.position = anteriorPosicion;

        mp.events.callRemote("cambiarDimension", 0);

        if(tipoMapa != 2) mp.game.ui.displayRadar(true);

        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);
        mp.events.call("hud:estado_hud");

        global_avatar.destruirCamara();

        player_local.clearTasksImmediately();

        mostrarAviso("success", 8000, "Has actualizado la foto de tu documentación con éxito");
      }, 800);
    }
  }
});

let posCamaraFoto = null;
function renderLuzFoto() {
    if (posCamaraFoto != null && camara != null) {
        let direction = camara.getDirection();
        mp.game.graphics.drawSpotLightWithShadow(posCamaraFoto.x, posCamaraFoto.y, posCamaraFoto.z, direction.x, direction.y, direction.z, 255, 255, 255, 15.0, 10, 1.0, 30.0, 1.0, 0.0);
    }
}

}