{
mp.events.add("parar_animacion", (jugador) => {
    if (jugador && mp.players.exists(jugador)) {
        try {
            if (!arrastrado && !enmaletero) {
                jugador.clearTasks();
            } else {
                if (player_local.isMale()) {
                    player_local.stopAnimTask("cellphone@", "cellphone_call_listen_base", 1.0);
                } else {
                    player_local.stopAnimTask("cellphone@female", "cellphone_call_listen_base", 1.0);
                }
            }
        } catch (e) {
            if (mp.controladorJugadores.tieneAdminservicio(jugador))
                mp.gui.chat.push("ERROR pararAnimacion" + e);
        }
    }
})

mp.events.add("aplicar_animacion", async (jugador, flags, libreria, nombre, duracion, speedIn, speedOut, startOffset = 0.0, lockX = false, lockY = false, lockZ = false) => {
    try {
        // jugador.taskPlayAnim(animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, startOffset, lockX, lockY, lockZ);
        /*if (!mp.game.streaming.hasAnimDictLoaded(libreria)) {
        }*/ // Lo hacemos como la Wiki de RAGE.
        for (let i = 0; mp.game.streaming.hasAnimDictLoaded(libreria) == false && i < 15; i++) {
            mp.game.streaming.requestAnimDict(libreria);
            await mp.game.waitAsync(50);
        }
        if (jugador && mp.players.exists(jugador)) {
            try {
                // entity.taskPlayAnim(animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, startOffset, lockX, lockY, lockZ);
                jugador.taskPlayAnim(libreria, nombre, speedIn, speedOut, duracion, flags, startOffset, lockX, lockY, lockZ)
            } catch (e) {
                if (mp.controladorJugadores.tieneAdminservicio(player_local))
                    mp.gui.chat.push("ERROR ejecutarAnimacion" + e);
            }
        }
    } catch (e) { console.log(e) }
});

mp.events.add("aplicar_escenario", (esc) => {
    try {
        crearTimeout(() => {
            if (player_local && mp.players.exists(player_local)) {
                try {
                    let escenario = JSON.parse(esc);
                    // entity.taskPlayAnim(animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, startOffset, lockX, lockY, lockZ);
                    player_local.taskStartScenarioInPlace(escenario[1], 0, true);
                } catch (e) {
                    if (mp.controladorJugadores.tieneAdminservicio(player_local))
                        mp.gui.chat.push("ERROR ejecutar_escenario" + e);
                }
            }
         }, 200);
    } catch (e) { console.log(e) }
})
var diccionarioEspera = null;
var animacionEspera = null;
var animEnCurso = 0;
var posicionInicioAnim = null;
var eventoServidor = null;
var permiteMoverse = false;
var args = null;
var tiempoComienzoAnimacion = 0;
var duracionAnimacion = 0;
mp.events.add("aplicar_animacion_espera", async (jugador, eventServ, argsSV, canMove, flags, libreria, nombre, duracion, speedIn, speedOut, startOffset = 0.0, lockX = false, lockY = false, lockZ = false) => {
    if (animEnCurso) return;
    diccionarioEspera = libreria;
    animacionEspera = nombre;
    animEnCurso = 1;
    posicionInicioAnim = jugador.position;
    eventoServidor = eventServ;
    args = argsSV;
    permiteMoverse = canMove;
    duracionAnimacion = duracion;

    for (let i = 0; mp.game.streaming.hasAnimDictLoaded(libreria) == false && i < 15; i++) {
        mp.game.streaming.requestAnimDict(libreria);
        await mp.game.waitAsync(50);
    }
    jugador.taskPlayAnim(libreria, nombre, speedIn, speedOut, duracion, flags, startOffset, lockX, lockY, lockZ);
    tiempoComienzoAnimacion = new Date().getTime();
    if(jugador == player_local){
        mp.events.add('render', comprobarTiempoAnimacion);
    }
})

function comprobarTiempoAnimacion() {

    if(!permiteMoverse && player_local.hasAnimFinished(diccionarioEspera, animacionEspera, 3) && animEnCurso == 1){
        if(calcDist(posicionInicioAnim, player_local.position) > 0.05){
            mp.events.callRemote(eventoServidor, false, args);
            resetVariables();
        }
    }

    if (!player_local.isPlayingAnim(diccionarioEspera, animacionEspera, 3) && animEnCurso == 1 && (new Date().getTime() - tiempoComienzoAnimacion < duracionAnimacion)) {
        mp.events.callRemote(eventoServidor, false, args);
        resetVariables();
    }

    if (!player_local.isPlayingAnim(diccionarioEspera, animacionEspera, 3) && animEnCurso == 1 && (new Date().getTime() - tiempoComienzoAnimacion > duracionAnimacion)) {
        mp.events.callRemote(eventoServidor, true, args);
        resetVariables();
    }
}

function resetVariables() {
    diccionarioEspera = null;
    animacionEspera = null;
    animEnCurso = 0;
    posicionInicioAnim = null;
    eventoServidor = null;
    permiteMoverse = false;
    args = null;
    tiempoComienzoAnimacion = 0;
    duracionAnimacion = 0;
    mp.events.remove('render', comprobarTiempoAnimacion);
}

}