{

///* --------------------------------------------------------------------------------
// * maleterocuerpo.js
// *
// *
// *
// * Descripción: Script para meter un cuerpo en un maletero
// *
// * -------------------------------------------------------------------------------- */
var enmaletero;

mp.events.add("meter_cuerpo_maletero", (vehiculo, jugador, offset, rot) => {
    if (vehiculo != undefined && jugador != undefined) {
        let offsetPosicion = offset;
        let offsetRotacion = rot;
        if(jugador == player_local){
            crearTimeout(() => {
            jugador.attachTo(vehiculo.handle, -1, offsetPosicion.x, offsetPosicion.y, offsetPosicion.z, offsetRotacion.x, offsetRotacion.y, offsetRotacion.z, false, false, false, false, 20, true);
            mp.events.callRemote("aplicar_animacion_sincronizada", "timetable@floyd@cryingonbed@base", "base", 3.0, 3.0, -1, 1);
            enmaletero = true;
            mp.events.add("render", renderBloquearTeclasMaletero);
            }, 500)
        }else{
            crearTimeout(() => {
                jugador.attachTo(vehiculo.handle, -1, offsetPosicion.x, offsetPosicion.y, offsetPosicion.z, offsetRotacion.x, offsetRotacion.y, offsetRotacion.z, false, false, false, false, 20, true);
            }, 500)
        }
    }
})

mp.events.add("sacar_cuerpo_maletero", (jugMal, jugTp) => {
    crearTimeout(() => {
        jugMal.detach(false, false);
        jugMal.clearTasks();
        enmaletero = false;
        jugMal.position = jugTp.position;
        mp.events.remove("render", renderBloquearTeclasMaletero)
    }, 250)
})

function renderBloquearTeclasMaletero () {
    if(enmaletero)
    {
        mp.game.controls.disableControlAction(32, 75, true);
    }
}

mp.events.add("sincronizar_cuerpo_maletero", () => {
    if(player_local.vehicle)
    {
        let entity = player_local.vehicle;
        if (entity.hasVariable("CUERPO")) {
            if (entity.getVariable("CUERPO") != null) {
                let e = JSON.parse(entity.getVariable("CUERPO"));
                let _player = mp.players.atRemoteId(e[0]);
                waitFor(_player).then(player => {
                    if (player) {
                        meterCuerpoMaletero(entity, player, e[1], e[2], e[3], e[4]);
                    }
                });
            }
        }
    }
})
}