{
/* --------------------------------------------------------------------------------
 * voz.js
 *
 * Autor: Kenshin
 *
 * Descripción: Sistema de Voz con volumen variable segun distancias y otras condiciones
 *
 * -------------------------------------------------------------------------------- */

/**
 * Variables generales de voz
 */
// Cargamos la animacion facial de hablar
mp.game.streaming.requestAnimDict("mp_facial");
mp.game.streaming.requestAnimDict("facials@gen_male@variations@normal");

// Rango maximo para escuchar a otros jugadores
const rangoMaximo = 8.0;

// Volumen minimo de las voces
const volumenMinimo = 0.1;

// Volumen maximo de las voces, determinado por el ajuste de chat de voz del usuario (DESACTIVADO TEMPORALMENTE)
//let volumenUsuario = 1.0; //(mp.game.invoke("0xC488FF2356EA7791", 722) / 10); // Nativa que devuelve el volumen del chat de voz del usuario en int 0-10

// Modo de la radio (sin uso)
let modoRadio = 1;

// Lista de jugadores ordenados por id (local) en nuestro canal de radio
// var jugadoresRadio = {};
// var jugadoresFaccion = {};


/**
 * Utilidades sobre la voz
 */
// Eventos nativos recibidos cuando un jugador habla o deja de hablar
mp.events.add('playerStartTalking', (player) => {
    if (PHONE.target != player)
        player.voice3d = true;
    player.playFacialAnim("mic_chatter", "mp_facial");
});
mp.events.add('playerStopTalking', (player) => {
    player.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});

// Actualizamos el volumen de la voz cuando cierran el menu de ajustes (DESACTIVADO TEMPORALMENTE)
/*mp.keys.bind(0x1B, false, function() {
    crearTimeout(() => {
        if (!mp.game.ui.isPauseMenuActive()) {
            volumenUsuario = (mp.game.invoke("0xC488FF2356EA7791", 722) / 10);
        }
    }, 200);
});*/

// Funcion para activar el microfono
const activarMicrofono = () => {
    if (mp.voiceChat.muted) {
        mp.voiceChat.muted = false;
        vozactiva = true;
        player_local.playFacialAnim("mic_chatter", "mp_facial");

        mp.events.call("hud:modificar_parametro", "hablando", true);
        // switch(modoRadio)
        // {
        //     case 1:
        //         mp.events.callRemote("voz:radio:activar", player_local);
        //         mp.events.call("hud:modificar_parametro", "radiohablando", true);
        //         break; 
        //     case 2:
        //         mp.events.callRemote("voz:aeronave:activar", player_local);
        //         mp.events.call("hud:modificar_parametro", "radiohablando", true);
        //         break;
        //     default:
        //         break;
        // }
    }
};

// Funcion para desactivar el microfono
const desactivarMicrofono = () => {
    if (!mp.voiceChat.muted) {
        mp.voiceChat.muted = true;
        vozactiva = false;
        player_local.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");

        mp.events.call("hud:modificar_parametro", "hablando", false);
        // switch(modoRadio)
        // {
        //     case 1:
        //         mp.events.callRemote("voz:radio:desactivar", player_local);
        //         mp.events.call("hud:modificar_parametro", "radiohablando", false);
        //         break; 
        //     case 2:
        //         mp.events.callRemote("voz:aeronave:desactivar", player_local);
        //         mp.events.call("hud:modificar_parametro", "radiohablando", false);
        //         break;
        //     default:
        //         break;
        // }
    }
};


/**
 * Controles voz cliente
 */
// Tecla F4
mp.keys.bind(0x73, true, function () {
    if (!mp.voiceChat.muted) {
        desactivarMicrofono();
    }
    else {
        if (estaMuerto == true) {
            desactivarMicrofono();

            mostrarAviso("danger", 6000, "No puedes hablar estando muerto");
            return;
        }
        activarMicrofono();
    }
});

// Tecla N,  muerto y hablando le cortamos el chat de voz y le avisamos, si estando muerto intenta hablar le avisamos de que no puede
let cancelada_voz_muerto = false;
let evitar_voz_muerto = false;
mp.events.add('render', () => {
    if (estaMuerto == true) {
        if (!mp.voiceChat.muted) {
            if (cancelada_voz_muerto == false) {
                cancelada_voz_muerto = true;

                desactivarMicrofono();

                mostrarAviso("danger", 6000, "Micrófono desactivado, no puedes hablar estando muerto");
            }
        }
        else {
            if (mp.game.controls.isControlPressed(0, 249)) { //INPUT_PUSH_TO_TALK
                if (estaChatAbierto) return;

                if (evitar_voz_muerto == false) {
                    evitar_voz_muerto = true;

                    mostrarAviso("danger", 6000, "No puedes hablar estando muerto");
                }
            }
            else if (mp.game.controls.isControlReleased(0, 249)) { //INPUT_PUSH_TO_TALK
                if (!mp.game.controls.isControlJustReleased(0, 249)) return;
                if (estaChatAbierto) return;

                evitar_voz_muerto = false;
            }
        }
        return;
    }
    else {
        cancelada_voz_muerto = false;
        evitar_voz_muerto = false;

        if (mp.game.controls.isControlPressed(0, 249)) { //INPUT_PUSH_TO_TALK
            if (estaChatAbierto) return;

            //Cuando pulsamos
            activarMicrofono();
        }
        else if (mp.game.controls.isControlReleased(0, 249)) { //INPUT_PUSH_TO_TALK
            if (!mp.game.controls.isControlJustReleased(0, 249)) return;
            if (estaChatAbierto) return;

            //Cuando soltamos
            desactivarMicrofono();
        }
    }
});

// Tecla F9
// mp.keys.bind(0x78, true, () => {
//     modoRadio++;
//     if(modoRadio > 3)
//         modoRadio = 1;
//     mp.gui.chat.push("Modo radio: " + modoRadio);
//  });

// mp.keys.bind(0x78, false, () => {
//     if (!mp.controladorJugadores._jugadores[player_local.id].deservicio) return;
//     // Podriamos dejar el microfono abierto pero la gente tiende a ser subnormal, no se daria cuenta y hablaría ooc con la voz activada
//     desactivarMicrofono();
//     mp.events.call("reproducir_sonido", "End_Squelch", "CB_RADIO_SFX");

//     if (jugadoresRadio.hasOwnProperty(canalradio)) {
//         for (let p of jugadoresRadio[canalradio]) {
//             if (mp.players.exists(p)) {
//                 if (calcDist(p.position, player_local.position) > MaxRange) {
//                     mp.events.callRemote("remove_voice_listener", p);
//                 } else {
//                     g_voiceMgr.add(p, false);
//                 }
//             } else {
//                 mp.events.callRemote("remove_voice_listener", p);
//             }
//         }
//     }
// });

// // Tecla F10
// mp.keys.bind(0x79, true, () => {
//     if (!mp.controladorJugadores._jugadores[player_local.id].deservicio) return;
//     // Si no tenia la voz activa, se la activamos
//     activarMicrofono();
//     mp.events.call("reproducir_sonido", "Start_Squelch", "CB_RADIO_SFX");

//     if (jugadoresFaccion.hasOwnProperty(faccion)) {
//         for (let jug of jugadoresFaccion[faccion]) {
//             if (jug == player_local) continue;
//             if (mp.controladorJugadores._jugadores[player_local.id].deservicio) {
//                 mp.events.callRemote("add_voice_listener_radio", jug);
//                 g_voiceMgr.remove(jug, false);
//             }
//         }
//     }
// });

// mp.keys.bind(0x79, false, () => {
//     if (!mp.controladorJugadores._jugadores[player_local.id].deservicio) return;
//     // Podriamos dejar el microfono abierto pero la gente tiende a ser subnormal, no se daria cuenta y hablaría ooc con la voz activada
//     desactivarMicrofono();
//     mp.events.call("reproducir_sonido", "End_Squelch", "CB_RADIO_SFX");

//     if (jugadoresFaccion.hasOwnProperty(faccion)) {
//         for (let p of jugadoresFaccion[faccion]) {
//             if (mp.players.exists(p) && mp.controladorJugadores._jugadores[player_local.id].deservicio) {
//                 if (calcDist(p.position, player_local.position) > MaxRange) {
//                     mp.events.callRemote("remove_voice_listener", p);
//                 } else {
//                     g_voiceMgr.add(p, false);
//                 }
//             } else {
//                 mp.events.callRemote("remove_voice_listener", p);
//             }
//         }
//     }
// });


/**
 * Funciones y eventos esenciales para el control de la voz
 */
// Variable que contiene la lista con los oyentes y las funciones para añadir o retirar oyentes
const g_voiceMgr = {
    listeners: [],
    add: function (player, notify) {
        if (this.listeners.indexOf(player) === -1) {
            this.listeners.push(player);

            if (notify) mp.events.callRemote("add_voice_listener", player);

            player.voiceAutoVolume = true; // Quitamos autovolumen para evitar conflicto con nuestro sistema
            player.voiceVolume = 0.0; // Volumen por defecto a 0
            player.voice3d = true; // Voz 3D activada
            player.isListening = true;
        }
    },
    remove: function (player, notify, tlf = false) {
        let idx = this.listeners.indexOf(player);
        if (idx !== -1){
            this.listeners.splice(idx, 1);

            if (notify) mp.events.callRemote("remove_voice_listener", player);

            if (!tlf){
                player.voiceAutoVolume = false;
                player.voiceVolume = 0.0;
                player.voice3d = false;
                player.isListening = false;
            }
        }
    }
};

// Evento para limpiar los jugadores que se desconectan
mp.events.add("playerQuit", (player) => {
    if (player && player.isListening) {
        g_voiceMgr.remove(player, false);
    }
});

// streamIn de jugador
function streamInVoz (player){
    // Si no es objetivo de llamada ni es oyente activo ponemos su volumen a 0
    if (player != PHONE.target && !player.isListening){
        player.voiceAutoVolume = false;
        player.voiceVolume = 0.0;
    }
}

// streamOut de jugador
function streamOutVoz (player){
    // Si no es objetivo de llamada ponemos su volumen a 0
    if (player != PHONE.target){
        player.voiceAutoVolume = false;
        player.voiceVolume = 0.0;
    }
}


/**
 * Funciones voz telefono
 */
let PHONE = {
    target: null,
    status: false
};

// Evento para activar la voz al iniciar una llamada
mp.events.add('telefono_llamada', (objetivo) => {
    if (!PHONE.target) {
        PHONE.target = objetivo;
        PHONE.status = true;
        g_voiceMgr.remove(objetivo, false, true); // Lo eliminamos de la lista de listeners cercanos para que no le afecten esos cambios
        objetivo.voiceVolume = 1.0;
        objetivo.voice3d = false;
    }
});

// Evento para parar la voz al acabar una llamada
mp.events.add('telefono_colgar', (objetivo = null) => {
    if (PHONE.target) {
        // Si el jugador existe en nuestro stream range
        if (mp.players.exists(PHONE.target) && PHONE.target.handle != 0) {
            let localPos = player_local.position;
            const playerPos = PHONE.target.position;
            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
            if (dist > rangoMaximo) {
                // Si esta a mas de la distancia maxima de voz lo eliminamos
                mp.events.callRemote("remove_voice_listener", PHONE.target);
                PHONE.target.voiceAutoVolume = false;
                PHONE.target.voiceVolume = 0.0;
                PHONE.target.voice3d = false;
                PHONE.target.isListening = false;
            }
            else {
                // Si esta a menos de la distancia maxima de voz lo metemos como oyente
                g_voiceMgr.add(PHONE.target, false);
            }
        }
        else {
            // Si no esta en stream range lo eliminamos
            mp.events.callRemote("remove_voice_listener", PHONE.target);
        }

        // Restauramos las variables de voz del telefono a su estado por defecto
        PHONE.target = null;
        PHONE.status = false;
    }
});

// Evento para resetear la voz del cliente
mp.events.add('resetearvoz', () => {
    crearTimeout(function () {
        mp.voiceChat.cleanupAndReload(true, true, true);
        crearTimeout(function () {
            mp.voiceChat.cleanupAndReload(false, false, true);
            crearTimeout(function () {
                mp.voiceChat.cleanupAndReload(true, false, false);
            }, 100);
        }, 100);
    }, 500);
});

// Eventos solo usados con comandos administrativos
mp.events.add('activar_vozentre', (objetivo) => {
    if (mp.players.exists(objetivo)) {
        if (objetivo.handle !== 0) {
            g_voiceMgr.add(objetivo, true);
        }
    }
});
mp.events.add('desactivar_vozentre', (objetivo) => {
    if (mp.players.exists(objetivo)) {
        if (objetivo.handle !== 0) {
            g_voiceMgr.remove(objetivo, true);
        }
    }
});


/**
 * Intervalo principal, encargado del funcionamiento del sistema de voz por proximidad
 */
setInterval(() => {
    let localPos = player_local.position; // Poscion del cliente
    let distanciaMaxima = rangoMaximo; // Distancia maxima por defecto

    // Si el cliente esta en un vehiculo con todas las ventanillas cerradas disminuimos la distancia maxima
    let ventanillas_propias = false;
    if (player_local.vehicle) {
        if (sinVentanas.indexOf(player_local.vehicle.getClass()) == -1) {
            if (player_local.vehicle.propiedades) {
                if (player_local.vehicle.propiedades.ventanillas_del == 0 && player_local.vehicle.propiedades.ventanillas_tra == 0) {
                    ventanillas_propias = true;
                    distanciaMaxima = 5.0;
                }
            }
        }
    }

    // Actualizamos la lista con nuevos oyentes
    mp.players.forEachInStreamRange(player => {
        if (player != player_local) {
            if (!player.isListening && (!PHONE.target || PHONE.target != player) /*&& (!jugadoresRadio.hasOwnProperty(player.id))*/) {
                const playerPos = player.position;
                let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

                // Creamos copia de la distancia maxima, la usamos para comprobar la distancia entre el cliente y este jugador
                let distanciaMaximaAux = distanciaMaxima;

                // El cliente no esta en vehiculo, comprobamos si el jugador cercano lo esta en uno con todas las ventanillas cerradas
                // y en ese caso disminuimos la copia de la distancia maxima
                if (distanciaMaximaAux > 5.0){
                    if (player.vehicle) {
                        if (sinVentanas.indexOf(player.vehicle.getClass()) == -1) {
                            if (player.vehicle.propiedades) {
                                if (player.vehicle.propiedades.ventanillas_del == 0 && player.vehicle.propiedades.ventanillas_tra == 0) {
                                    distanciaMaximaAux = 5.0;
                                }
                            }
                        }
                    }
                }

                // Si la distancia es menor lo metemos como nuevo oyente
                if (dist <= distanciaMaximaAux) {
                    g_voiceMgr.add(player, true);
                }
            }
        }
    });

    // Iteramos sobre todos los oyentes existentes 
    g_voiceMgr.listeners.forEach((player) => {
        if (player.handle !== 0 && player.dimension == player_local.dimension) {
            const playerPos = player.position;
            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

            // Creamos copia de la distancia maxima, sera la que usamos para comprobar la distancia entre el cliente y el oyente
            let distanciaMaximaAux = distanciaMaxima;

            // Si el oyente esta en vehiculo con ventanillas cerradas disminuye la copia de la distancia maxima
            let ventanillas_ajenas = false;
            if (player.vehicle) {
                if (sinVentanas.indexOf(player.vehicle.getClass()) == -1) {
                    if (player.vehicle.propiedades) {
                        if (player.vehicle.propiedades.ventanillas_del == 0 && player.vehicle.propiedades.ventanillas_tra == 0) {
                            ventanillas_ajenas = true;
                            distanciaMaximaAux = 5.0;
                        }
                    }
                }
            }

            // Si el oyente esta a mas distancia de la permitida lo borramos como oyente
            if (dist > distanciaMaximaAux) {
                g_voiceMgr.remove(player, true);
            }
            else {
                if (player_local.vehicle){
                    if (player.vehicle){
                        if (player_local.vehicle == player.vehicle){
                            // Mismo coche, volumen maximo
                            player.voiceVolume;
                        }
                        else {
                            // Diferentes coches
                            if (ventanillas_propias || ventanillas_ajenas) {
                                // Uno de los dos con ventanillas cerradas, volumen minimo
                                player.voiceVolume = volumenMinimo;
                            }
                            else {
                                // Los dos con ventanillas abiertas, volumen segun distancia
                                player.voiceVolume = 1 - (dist / distanciaMaximaAux);
                            }
                        }
                    }
                    else {
                        // Solo cliente en coche
                        if (ventanillas_propias) {
                            // Ventanillas cerradas, volumen minimo
                            player.voiceVolume = volumenMinimo;
                        }
                        else {
                            player.voiceVolume = 1 - (dist / distanciaMaximaAux);
                        }
                    }
                }
                else {
                    if (player.vehicle){
                        // Solo jugador en coche
                        if (ventanillas_ajenas) {
                            // Ventanillas cerradas, volumen segun distancia
                            player.voiceVolume = volumenMinimo;
                        }
                        else {
                            // Ventanillas abiertas, volumen segun distancia
                            player.voiceVolume = 1 - (dist / distanciaMaximaAux);
                        }
                    }
                    else {
                        // Ninguno de los dos en coche, volumen segun distancia
                        player.voiceVolume = 1 - (dist / distanciaMaximaAux);
                    }
                }
            }
        }
        else {
            g_voiceMgr.remove(player, true);
        }
    });
}, 500);

}