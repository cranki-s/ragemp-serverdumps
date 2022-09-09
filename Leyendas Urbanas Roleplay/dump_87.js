{
var activar_mirilla = false;
var camara_mirilla;

mp.events.add({
    "mostrar_mirilla": (posx, posy, posz, rotx, roty, rotz) => {
        activar_mirilla = true;
        mp.events.call("screenfx_iniciar", "DefaultFlash");
        crearCamara(posx, posy, posz, rotx, roty, rotz);

        mp.events.add('render', render_mirilla);
    },
    "cerrar_mirilla": (posx, posy, posz) => {
        mp.events.remove('render', render_mirilla);

        activar_mirilla = false;
        mp.events.call("screenfx_parar", "DefaultFlash");
        eliminarCamara(posx, posy, posz);
    }
});

function crearCamara(posx, posy, posz, rotx, roty, rotz) {
    if (camara_mirilla == undefined) {
        camara_posicion = new mp.Vector3(posx, posy, posz);
        camara_rotacion = new mp.Vector3(rotx, roty, rotz);
        player_local.position = camara_posicion;

        camara_mirilla = mp.cameras.new('default', camara_posicion, camara_rotacion, 45);
        camara_mirilla.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        player_local.freezePosition(true);
        player_local.setVisible(false, false);
        player_local.setCollision(false, false);
        player_local.setInvincible(true);
        mp.events.call("hud:estado_hud");
    }   
}

function eliminarCamara(posx, posy, posz) {
    if (camara_mirilla != undefined) {
        player_local.position = new mp.Vector3(posx, posy, posz);
        camara_mirilla.destroy(true);
        camara_mirilla = null;
    }

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    player_local.freezePosition(false);
    player_local.setInvincible(false);
    player_local.setVisible(true, false);
    player_local.setCollision(true, false);
    mp.events.call("hud:estado_hud");
}

function cancelarControles() {
    mp.game.controls.disableAllControlActions(0);
    mp.game.controls.disableAllControlActions(1);
    mp.game.controls.disableAllControlActions(2);
}

/*function activarControles() {
    mp.game.controls.enableAllControlActions(0);
    mp.game.controls.enableAllControlActions(1);
    mp.game.controls.enableAllControlActions(2);
}*/

function render_mirilla() {
    if (activar_mirilla) {
        cancelarControles();
    }
}
}