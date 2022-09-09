{
/* --------------------------------------------------------------------------------
 * fibracam.js
 *
 * Autor: Zeeky
 *
 * Descripción: Sistema de fibracam para cuerpos del estado.
 *
 * -------------------------------------------------------------------------------- */

var activar_fibracam = false;
var scaleform_fibracam = null;
var tiempo_fibracam = 0;
mp.events.add({
    "mostrar_fibracam": (tipo, llave, posx, posy, posz) => {
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);

        activar_fibracam = true;
        mp.game.graphics.setTimecycleModifier("scanline_cam_cheap");
        mp.game.graphics.setTimecycleModifierStrength(2.0);
        player_local.freezePosition(true);
        player_local.setVisible(false, false);
        player_local.setCollision(false, false);
        player_local.setInvincible(true);
        cancelarControles();

        if (scaleform_fibracam == null)
            scaleform_fibracam = new messageScaleform("security_cam");

        switch(tipo)
        {
            case 1:
                texto = "Propiedad " + llave + " / ENTRADA";
                break;
            case 2:
                texto = "Propiedad " + llave + " / TERRAZA";
                break;  
            case 3:
                texto = "Propiedad " + llave + " / GARAJE";
                break;   
            case 4:
                texto = "Propiedad " + llave + " / HUIDA";
                break;   
            case 5:
                texto = "Negocio " + llave;
                break;
            default:
                texto = "Desconocido";
                break;
        }  

        var getStreet = mp.game.pathfind.getStreetNameAtCoord(posx, posy, posz, 0, 0);
        zona = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(posx, posy, posz));
        calle = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);

        tiempo_fibracam = 12;
        scaleform_fibracam.callFunction("SET_TIME", 00, 12);
        timerTiempo = setInterval(function () {
            tiempo_fibracam--;
            scaleform_fibracam.callFunction("SET_TIME", 00, tiempo_fibracam);
        }, 1000);

        scaleform_fibracam.callFunction("SET_DETAILS", texto);
        scaleform_fibracam.callFunction("SET_LOCATION", zona + " / " + calle);
        scaleform_fibracam.renderFullscreen();
        mp.events.call("hud:estado_hud");

        mp.events.add('render', render_fibracam);
    },
    "cerrar_fibracam": () => {
        mp.events.remove('render', render_fibracam);

        if(tipoMapa != 2) mp.game.ui.displayRadar(true);

        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);

        activar_fibracam = false;
        mp.game.invoke("0x0F07E7745A236711");
        player_local.freezePosition(false);
        player_local.setInvincible(false);
        player_local.setVisible(true, false);
        player_local.setCollision(true, false);
        activarControles();

        clearTimeout(timerTiempo);

        if (scaleform_fibracam != null) {
            scaleform_fibracam.dispose();
            scaleform_fibracam = null;
        }
        mp.events.call("hud:estado_hud");
    }
});

function cancelarControles() {
    mp.game.controls.disableAllControlActions(0);
    mp.game.controls.disableAllControlActions(2);
}

function activarControles() {
    mp.game.controls.enableAllControlActions(0);
    mp.game.controls.enableAllControlActions(2);
}

function render_fibracam() {
    if (scaleform_fibracam != null)
        scaleform_fibracam.renderFullscreen();
    if (activar_fibracam) {
        cancelarControles();
    }
}

}