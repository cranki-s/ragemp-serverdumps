{
/* --------------------------------------------------------------------------------
 * prisionfederal.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Eventos usados en la prisión federal
 *
 * -------------------------------------------------------------------------------- */

var navFederalt = null;
var navFederaltt = null;

mp.events.add("prisionfederal:pantalla_traslado", function () { pantalla_traslado() });

function pantalla_traslado() {

    // Ocultamos todo el hud y lo que vemos en la pantalla y le ponemos la pantalla en negra.
    if (navFederalt != null && mp.browsers.exists(navFederalt)) {
        navFederalt.destroy();
    }
    navFederalt = mp.browsers.new("package://LURP/cef/prisionfederal/trasladofederal/federal.html");
    if (navFederaltt != null && mp.browsers.exists(navFederaltt)) {
        navFederaltt.destroy();
    }
    navFederaltt = mp.browsers.new("package://LURP/cef/prisionfederal/trasladofederal/tapon.html");

    //mp.game.cam.doScreenFadeOut(300)
    mp.events.call("hud:estado_hud");
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.gui.chat.show(false);
    //mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

    player_local.freezePosition(true);
    player_local.setInvincible(true);
    player_local.setCollision(false, false);


    // Después de 35 segundos le volvemos a mostrar el hud y todo lo que le ocultamos.
    setTimeout(() => {

        if (navFederalt != null && mp.browsers.exists(navFederalt)) {
            navFederalt.destroy();
            navFederalt = null;
        }
        if (navFederaltt != null && mp.browsers.exists(navFederaltt)) {
            navFederaltt.destroy();
            navFederaltt = null;
        }

        mp.game.cam.doScreenFadeIn(2000);
        mp.events.call("hud:estado_hud");
        if(tipoMapa != 2) mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);
        mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");

        player_local.freezePosition(false);
        player_local.setInvincible(false);
        player_local.setCollision(true, false);

    },35000);

}

}