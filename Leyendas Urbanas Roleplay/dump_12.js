{
/**
 * jugadorSync.js
 * 
 * Descripción: Se encarga de la sincronizacion de propiedades en el cliente entre los jugadores.
 * 
 * Dries
 */

 /**
  * Controlador de los jugadores. Almacena todas las propiedades y los jugadores para ser usados localmente sin necesidad de referirse a las variables
  * compartidas en archivos externos.
  */
 mp.controladorJugadores = {
    _jugadores: {},

    sincronizarAnimacion: async (entity) => {
        if (!entity || !mp.players.exists(entity)) return;
        if (typeof entity.handle !== "number" || entity.handle == 0) return;  // Si no esta en stream no seguimos
        if (!mp.controladorJugadores._jugadores.hasOwnProperty(entity.id)) return;
        if (!entity.hasVariable("ANIMACION")) return;      

        try {
            let b = JSON.parse(entity.getVariable("ANIMACION"));
            if(b){
                switch (b[0]) {
                    case 0:
                        for (mp.game.streaming.requestAnimDict(b[2]); !mp.game.streaming.hasAnimDictLoaded(b[2]);) await mp.game.waitAsync(0) // await r.default.sleep(10);
                        crearTimeout(() => {
                            if (entity && mp.players.exists(entity)) {
                                try {
                                    entity.taskPlayAnim(b[2], b[1], b[5], b[6], b[7], b[3], 0.0, false, false, false);
                                } catch (b) {
                                    logError("J-1", b);
                                }
                            }
                        }, 1000);
                        break;
                    case 1:
                        crearTimeout(() => {
                            if (entity != null && mp.players.exists(entity)) {
                                entity.clearTasks();
                                entity.taskStartScenarioInPlace(b[1], 0, true);
                            }
                        }, 1000);
                        break;
                    case 2:
                        crearTimeout(() => {
                            if (entity != null && mp.players.exists(entity)) {
                                entity.clearTasks();

                                entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
                                entity.setStrafeClipset(strafeClipSet);
                            }
                        }, 200);
                        break;
                    default:
                        break;
                }
            }
        } catch (e) {
            logError("J-2", e);
        }
    },

    sincronizarWalkingStyle: async (entity) => {
        if (!entity || !mp.players.exists(entity)) return;
        if (!mp.controladorJugadores._jugadores.hasOwnProperty(entity.id)) return;
        if (!walkingStyleJugs.hasOwnProperty(entity.id)) return;

        let e = mp.controladorJugadores._jugadores[entity.id].walkingstyle;
        let a = walkingStyleJugs[entity.id];
        let b = (typeof a === "string" ? JSON.parse(a) : a);

        if (!e) {
            if (!b[0]) {
                entity.resetMovementClipset(0.0);
            }

            delete walkingStyleJugs[entity.id];
        } else {
            switch (b[0]) {
                case 0:
                    for (mp.game.streaming.requestClipSet(b[2]); !mp.game.streaming.hasClipSetLoaded(b[2]);) await mp.game.waitAsync(0);
                    /*if (!mp.game.streaming.hasClipSetLoaded(b[2])) {
                        mp.game.streaming.requestClipSet(b[2]);
                        while (!mp.game.streaming.hasClipSetLoaded(b[2])) await mp.game.waitAsync(0);
                    }*/
                    crearTimeout(() => {
                        if (mp.players.exists(entity)) {
                            entity.setMovementClipset(b[2], 0.0);
                        }
                    }, 1000);
                    break;
                default:
                    break;
            }
        }
    },

    tieneAdminservicio: (jugador) => {
        if (!jugador)
            return false;
        
        if (!mp.controladorJugadores._jugadores[jugador.id])
            return false;

        return mp.controladorJugadores._jugadores[jugador.id].adminservicio;
    }
};

/**
 * Controla los objetos pegados del jugador, se diferencian por el hueso al que estan pegados dado que no hay dos objetos en el mismo hueso
 */
mp.controladorJugadores.objetos = {
    establecerObjetos: (jugador, valor) => {
        if (!jugador || !valor) return;
        
        try {
            let nuevosObjetos = (typeof valor === "string" ? JSON.parse(valor) : valor);

            if (!jugador.objetos) jugador.objetos = {};

            for (let hueso in jugador.objetos) {
                let objeto = jugador.objetos[hueso];
                if (nuevosObjetos.indexOf(objeto) === -1)
                    mp.controladorJugadores.objetos.eliminarObjeto(jugador, objeto);
            }

            for (let objeto of nuevosObjetos) {
                let hueso = mp.controladorJugadores.objetos.obtenerHueso(jugador, objeto.hueso);
                if (!jugador.objetos.hasOwnProperty(hueso))
                    mp.controladorJugadores.objetos.agregarObjeto(jugador, objeto);
            }
        } catch (e) {
            logError("J-3", e);
        }
    },
    agregarObjeto: (jugador, objeto) => {
        if (!jugador || !objeto) return;

        // Solo creamos el objeto (y por lo tanto ejecutamos su attach) si la persona esta en nuestro rango de stream
        // La información se va a guardar independientemente de lo anterior
        let crearObjeto = (typeof jugador.handle === "number" && jugador.handle != 0);

        try {
            // Obtenemos el hueso de manera segura
            let hueso = mp.controladorJugadores.objetos.obtenerHueso(jugador, objeto.hueso);
            let _objeto = null;

            if (jugador.objetos.hasOwnProperty(hueso)) {
                let o = jugador.objetos[hueso].objeto;
                if (o){
                    if (mp.objects.exists(o)){
                        o.setCollision(false, false);
                        let d = o.datosAttach;
                        if (d && d.entidad) {
                            o.detach(true, true);
                        }

                        o.destroy();
                    }
                }

                jugador.objetos[hueso].objeto = null;
            }

            if (crearObjeto) {
                _objeto = mp.objects.new(objeto.modelo, jugador.position, {
                    rotation: new mp.Vector3(0, 0, 0),
                    alpha: 255,
                    dimension: jugador.dimension
                });

                // Si ha dado tiempo a que el objeto sea creado directamente ejecutamos todo, en caso contrario creamos un intervalo muy pequeño para ejecutar todo nada más sea creado
                if (_objeto != undefined && _objeto != null && mp.objects.exists(_objeto)) {
                    _objeto.datosAttach = {
                        entidad: jugador.handle,
                        hueso: hueso,
                        posicion: objeto.posicion,
                        rotacion: objeto.rotacion
                    };

                    _objeto.notifyStreaming = true;

                    // Si el jugador al que pegamos el objeto es el propio cliente comprobamos si es X objeto para poder usar su entidad en algunos sistemas
                    if (jugador == player_local) {
                        switch (objeto.modelo) {
                            case -1644950477: // Regadera -> Utilizado para la particula de agua
                                if (typeof particula_regadera !== "undefined") particula_regadera = _objeto;
                                break;
                            case 1749718958: // Lata de spray -> Utilizado para la particula de spray
                                if (typeof lata_spray !== "undefined") lata_spray = _objeto;
                                break;
                            case -1599313277: // Pulverizador -> Utilizado para la particula de pulverizar
                                if (typeof particula_pulverizador !== "undefined") particula_pulverizador = _objeto;
                                break;
                            default:
                                if (typeof particula_regadera !== "undefined") particula_regadera = null;
                                if (typeof lata_spray !== "undefined") lata_spray = null;
                                if (typeof particula_pulverizador !== "undefined") particula_pulverizador = null;
                                break;
                        }
                    }

                    jugador.objetos[hueso] = objeto;
                    jugador.objetos[hueso].objeto = _objeto;
                }
                else {
                    let count = 0;
                    let int_datosAttach = setInterval(() => {
                        if (count >= 100) {
                            logError("ATTACH", "Attach objeto cancelado, el objeto: " + objeto.modelo + ", no existe");

                            clearInterval(int_datosAttach);
                            int_datosAttach = null;
                            return;
                        }

                        if (_objeto != undefined && _objeto != null && mp.objects.exists(_objeto)) {
                            _objeto.datosAttach = {
                                entidad: jugador.handle,
                                hueso: hueso,
                                posicion: objeto.posicion,
                                rotacion: objeto.rotacion
                            };

                            _objeto.notifyStreaming = true;

                            // Si el jugador al que pegamos el objeto es el propio cliente comprobamos si es X objeto para poder usar su entidad en algunos sistemas
                            if (jugador == player_local) {
                                switch (objeto.modelo) {
                                    case -1644950477: // Regadera -> Utilizado para la particula de agua
                                        if (typeof particula_regadera !== "undefined") particula_regadera = _objeto;
                                        break;
                                    case 1749718958: // Lata de spray -> Utilizado para la particula de spray
                                        if (typeof lata_spray !== "undefined") lata_spray = _objeto;
                                        break;
                                    case -1599313277: // Pulverizador -> Utilizado para la particula de pulverizar
                                        if (typeof particula_pulverizador !== "undefined") particula_pulverizador = _objeto;
                                        break;
                                    default:
                                        if (typeof particula_regadera !== "undefined") particula_regadera = null;
                                        if (typeof lata_spray !== "undefined") lata_spray = null;
                                        if (typeof particula_pulverizador !== "undefined") particula_pulverizador = null;
                                        break;
                                }
                            }

                            jugador.objetos[hueso] = objeto;
                            jugador.objetos[hueso].objeto = _objeto;

                            clearInterval(int_datosAttach);
                            int_datosAttach = null;
                            return;
                        }

                        count++;
                    }, 5);
                }
            }
            else {
                jugador.objetos[hueso] = objeto;
                jugador.objetos[hueso].objeto = _objeto;
            }
        } catch (e) {
            logError("J-4", e);
        }
    },
    eliminarObjeto: (jugador, objeto) => {
        if (!jugador || !objeto) return;
        
        try {
            if (jugador.objetos != null) {
                let hueso = mp.controladorJugadores.objetos.obtenerHueso(jugador, objeto.hueso);
                if (jugador.objetos.hasOwnProperty(hueso)) {
                    let o = jugador.objetos[hueso].objeto;

                    if (jugador == player_local) {
                        switch (o.modelo) {
                            case -1644950477: // Regadera -> Utilizado para la particula de agua
                                if (typeof particula_regadera !== "undefined") particula_regadera = null;
                                break;
                            case 1749718958: // Lata de spray -> Utilizado para la particula de spray
                                if (typeof lata_spray !== "undefined") lata_spray = null;
                                break;
                            case -1599313277: // Pulverizador -> Utilizado para la particula de pulverizar
                                if (typeof particula_pulverizador !== "undefined") particula_pulverizador = null;
                                break;
                            default:
                                break;
                        }
                    }

                    if (o){
                        if(mp.objects.exists(o)){
                            o.setCollision(false, false);
                            let d = o.datosAttach;
                            if (d && d.entidad) {
                                o.detach(true, true);
                            }

                            o.destroy();
                        }
                    }

                    delete jugador.objetos[hueso];
                }
            }
        } catch (e) {
            logError("J-5", e);
        }
    },
    limpiarObjetos: (jugador) => {
        if (!jugador) return;
        
        try {
            if (jugador.objetos) {
                for (let hueso in jugador.objetos) {
                    let o = jugador.objetos[hueso].objeto;

                    if (o){
                        if (mp.objects.exists(o)){
                            o.setCollision(false, false);
                            let d = o.datosAttach;
                            if (d && d.entidad) {
                                o.detach(true, true);
                            }

                            o.destroy();
                        }
                    }
                }
            }
        } catch (e) {
            logError("J-6", e);
        }
    },
    sincronizarObjetos: (jugador) => {
        if (!jugador) return;
        
        try {
            if (!jugador.objetos) {
                jugador.objetos = {};
            }

            for (let hueso in jugador.objetos) {
                mp.controladorJugadores.objetos.agregarObjeto(jugador, jugador.objetos[hueso]);
            }
        } catch (e) {
            logError("J-7", e);
        }
    },
    /**
     * Obtiene el indice del hueso a partir del id proporcionado en integer
     * Utilizado solo para obtener el indice de hueso de un jugador ya que se apoya en que player_local ~ jugador
     */
    obtenerHueso: (jugador, huesoId) => {
        if (!jugador || !huesoId) return -1;
        let hueso = (jugador.getBoneIndex(huesoId) < 0 ? player_local.getBoneIndex(huesoId) : jugador.getBoneIndex(huesoId));
        return (typeof hueso === "string" ? parseInt(hueso) : hueso);
    }
};

mp.events.add("CINTURON", (estado) => {
    if (estado) {
        player_local.setConfigFlag(32, false);
    } else {
        player_local.setConfigFlag(32, true);
        mp.game.controls.enableControlAction(0, 75, true);
        mp.game.controls.enableControlAction(1, 75, true);
        mp.game.controls.enableControlAction(27, 75, true);
    }

    cinturon = estado;
});

var walkingStyleJugs = {};
mp.events.addDataHandler("ANIMACION", (entity, value, oldValue) => {
    if (!entity || !mp.players.exists(entity)) return;
    if (typeof entity.handle !== "number" || entity.handle == 0) return;  // Si no esta en stream no seguimos
    if (!value || typeof value !== "string") return;

    let b = JSON.parse(value);

    if (b) {
        switch (b[0]) {
            case 0:
                mp.game.streaming.requestAnimDict(b[2]);
                for (let i = 0; mp.game.streaming.hasAnimDictLoaded(b[2]) === 0 && i < 15; i++) {
                    //mp.gui.chat.push("Intento " + i + " de cargar la animación " + b[2]);
                }

                crearTimeout(() => {
                    if (entity && mp.players.exists(entity) && player_local != entity) {
                        try {
                            // entity.taskPlayAnimAdvanced(b[2], b[1], 8.0, 0, -1, b[3], 0.0, false, false, false);
                            entity.taskPlayAnim(b[2], b[1], b[5], b[6], b[7], b[3], 0.0, false, false, false);
                        } catch (e) {
                            logError("J-8", e);
                        }
                    }
                }, 200);

                break;
            case 1:
                crearTimeout(() => {
                    if (entity != null && mp.players.exists(entity)) {
                        entity.clearTasks();
                        entity.taskStartScenarioInPlace(b[1], 0, true);
                    }
                }, 1000);
                break;
            case 2:
                crearTimeout(() => {
                    if (entity != null && mp.players.exists(entity)) {
                        entity.clearTasks();

                        entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
                        entity.setStrafeClipset(strafeClipSet);
                    }
                }, 200);
                break;
            default:
                break;
        }
    }
});

mp.events.addDataHandler("JUGADOR", (entity, value, oldValue) => {
    // mp.gui.chat.push("Value en JUGADOR es " + typeof value + " | " + typeof oldValue);
    if (!entity) return;
    if (typeof value !== "string") {
        if (value == null) { // Si se realiza ResetEntitySharedData y tenemos las propiedades de ese jugador las borramos
            let id = entity.id;
            if (entity.objetos) {
                mp.controladorJugadores.objetos.limpiarObjetos(entity);
                delete entity.objetos;
            }

            if (mp.controladorJugadores._jugadores.hasOwnProperty(id)) {
                let id_jug = mp.controladorJugadores._jugadores[id].id_jugador;
                if (escribiendoNombre.hasOwnProperty(id_jug)) {
                    delete escribiendoNombre[id_jug];
                }

                if (hablandoNombre.hasOwnProperty(id_jug)) {
                    delete hablandoNombre[id_jug];
                }

                delete mp.controladorJugadores._jugadores[id];
            }

            if (walkingStyleJugs.hasOwnProperty(id)) {
                delete walkingStyleJugs[id];
            }
        }
        return;
    }
    if (!mp.players.exists(entity)) return;
    try {
        let v = JSON.parse(value);
        let ov = typeof oldValue === "string" ? JSON.parse(oldValue) : null;

        if (entity == player_local) {
            let jug = mp.controladorJugadores._jugadores[player_local.id];
            if (jug) {
                if(purga)
                {
                    if (jug.nivel_purga != v.nivel_purga)
                        mp.events.call("hud:modificar_parametro", "pnivel", v.nivel_purga);
                }
                else
                {
                    if (jug.nivel_pj != v.nivel_pj)
                        mp.events.call("hud:modificar_parametro", "nivel", v.nivel_pj);
                }
                if (jug.adminservicio != v.adminservicio) {
                    adminservicio = v.adminservicio;
                    mp.events.call("hud:modificar_parametro", "adminservicio", adminservicio);
                }

                if (jug.deservicio != v.deservicio)
                    mp.events.call("hud:modificar_parametro", "deservicio", v.deservicio);
            } else {
                if(purga)
                {
                    mp.events.call("hud:modificar_parametro", "pnivel", v.nivel_purga);
                }
                else
                {
                    mp.events.call("hud:modificar_parametro", "nivel", v.nivel_pj);
                }
                mp.events.call("hud:modificar_parametro", "adminservicio", adminservicio);
                mp.events.call("hud:modificar_parametro", "deservicio", v.deservicio);
            }
        }

        if (v.oculto && ((ov && !ov.oculto) || !ov)) {
            mp.controladorJugadores.objetos.limpiarObjetos(entity);
        } else if (v.oculto && (ov && ov.oculto)) {
            mp.controladorJugadores.objetos.sincronizarObjetos(entity);
        }
        // if (entity != player_local && (v.deservicio || ov.deservicio)) {
        //     if (!jugadoresRadio.hasOwnProperty(v.radio))
        //         jugadoresRadio[v.radio] = [];

        //     let idx = jugadoresRadio[v.radio].indexOf(entity);
        //     if (idx < 0) {
        //         jugadoresRadio[v.radio].push(entity);
        //     }

        //     if (ov.radio != v.radio && jugadoresRadio.hasOwnProperty(ov.radio)) {
        //         idx = jugadoresRadio[ov.radio].indexOf(entity);
        //         if (idx > -1) jugadoresRadio[ov.radio].splice(idx, 1);
        //     }
        // }

        // if (entity != player_local && (v.deservicio || ov.deservicio)) {
        //     if (!jugadoresFaccion.hasOwnProperty(v.faccion))
        //         jugadoresFaccion[v.faccion] = [];

        //     let idx = jugadoresFaccion[v.faccion].indexOf(entity);
        //     if (idx < 0) {
        //         jugadoresFaccion[v.faccion].push(entity);
        //     }

        //     if (ov.faccion != v.faccion && jugadoresFaccion.hasOwnProperty(ov.faccion)) {
        //         idx = jugadoresFaccion[ov.faccion].indexOf(entity);
        //         if (idx > -1) jugadoresFaccion[ov.faccion].splice(idx, 1);
        //     }
        // }

        // Obtenemos si le conocemos, y en ese caso lo ponemos en la nueva informacion a actualizar para no perderlo
        if (mp.controladorJugadores._jugadores[entity.id] && mp.controladorJugadores._jugadores[entity.id].conocido)
            v.conocido = true;

        mp.controladorJugadores._jugadores[entity.id] = v;

        if (v.objetos != undefined) mp.controladorJugadores.objetos.establecerObjetos(entity, v.objetos);
    } catch (e) {
        logError("J-9", e);
    }
});

// player entityStreamIn - streamHandler
function streamInPlayers(entity) {
    try {
        // Sincronizamos los objetos pegados ya almacenados localmente
        mp.controladorJugadores.objetos.sincronizarObjetos(entity);

        // Sincronizamos animaciones
        mp.controladorJugadores.sincronizarAnimacion(entity);
        //Sincronizamos los walkingstyles
        //mp.controladorJugadores.sincronizarWalkingStyle(entity);

        if (entity.hasVariable("ARRASTRAR")) {
            if (entity.getVariable("ARRASTRAR") != null) {
                let obj = mp.players.atRemoteId(entity.getVariable("ARRASTRAR"));
                waitFor(obj).then(obj => {
                    if (obj) {
                        entity.attachTo(obj.handle, 11816, 0.0, 0.48, 0.0, 0.0, 0.0, 0.0, true, true, false, false, 0, true);
                    }
                });
            }
        }

        // Actualizamos la informacion de personajes conocidos
        let jugador = mp.controladorJugadores._jugadores[entity.id];
        if (jugador && typeof jugador.sqlid_personaje === "number") {
            if (jugador.conocido) {
                // Si la entidad cuenta como conocida pero ya no la tenemos en la lista de conocidos entonces borramos su propiedad de conocida
                if (!pjConocidos.hasOwnProperty(jugador.sqlid_personaje)) {
                    delete jugador.conocido;
                }
            }
            else {
                // Si la entidad no cuenta como conocida pero la tenemos en la lista de conocidos entonces creamos su propiedad de conocida
                if (pjConocidos.hasOwnProperty(jugador.sqlid_personaje)) {
                    jugador.conocido = true;
                }
            }
        }

        entity.setConfigFlag(241, true); // Evita que si baja de un vehículo con el motor encendido nuestro cliente visualmente apague el motor (comportamiento por defecto de GTAV)
    }
    catch (e) {
        logError("J-10", e);
    }
}

// object entityStreamIn - streamHandler
function streamInObjetos(entity) {
    try {
        let d = entity.datosAttach;
        if (d && d.entidad) {
            entity.attachTo(d.entidad, d.hueso, d.posicion.x, d.posicion.y, d.posicion.z, d.rotacion.x, d.rotacion.y, d.rotacion.z, false, false, false, false, 2, true);
        }
    }
    catch (e) {
        logError("J-11", e);
    }
}

// player entityStreamOut - streamHandler
function streamOutPlayers(entity) {
    try {
        if (mp.controladorJugadores._jugadores[entity.id]) {
            let id = mp.controladorJugadores._jugadores[entity.id].id_jugador;
            if (escribiendoNombre.hasOwnProperty(id)) delete escribiendoNombre[id];
            if (hablandoNombre.hasOwnProperty(id)) delete hablandoNombre[id];
        }

        if (textosCabeza[entity.id]) {
            if (mp.labels.exists(textosCabeza[entity.id].label))
                textosCabeza[entity.id].label.destroy();

            pararTimeout(textosCabeza[entity.id].timeout);

            delete textosCabeza[entity.id];
        }

        mp.controladorJugadores.objetos.limpiarObjetos(entity);
    }
    catch (e) {
        logError("J-12", e);
    }
}

function cambio_objetos_dimension() {
    if (player_local.objetos) {
        mp.controladorJugadores.objetos.sincronizarObjetos(player_local);
    }
}

let ultima_dimension = player_local.dimension;

mp.events.add("playerQuit", (jugador) => {
    try {
        // Eliminamos los objetos para no ocupar tontamente espacio
        if (jugador.objetos) {
            for (let _objeto in jugador.objetos) {
                mp.controladorJugadores.objetos.eliminarObjeto(_objeto);
            }
        }
    } catch (e) {
        logError("J-13", e);
    }
});

let timerEscopetaLetal = null;
var jugadorEscopeteado = false;
var tazerFX1="Dont_tazeme_bro";
var tazerFX2 = "ChopVision";
let meleeFistDamage = 10;
let meleeBluntCat1 = 15;
let meleeBluntCat2 = 25;
let meleeSlashCat1 = 20;
let meleeSlashCat2 = 30;

//Daño entrante, con este evento cancelamos el daño para un tipo de arma y aplicamos otros efectos.
mp.events.add("incomingDamage", (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    if (mp.controladorJugadores._jugadores[player_local.id]) {
        let jugador = mp.controladorJugadores._jugadores[player_local.id];
        if (jugador.adminservicio) {
            mp.gui.chat.push("IncomingDamage Entidad: " + sourceEntity.id + " Jugador: " + sourcePlayer.name + " Objetivo: " + targetEntity.name + " Arma: " + weapon + " Hueso: " + boneIndex + " Hueso traducido: " + player_local.getRagdollBoneIndex(boneIndex) + " Daño: " + damage);
            mp.gui.chat.push("Tipo entidad: " + sourceEntity.type);
            return true;
        }
    }
    if (targetEntity && targetEntity.type === "player") {
        if (weapon === 1432025498) {
            if (calcDist(sourceEntity.position, targetEntity.position) < 10) {
                jugadorEscopeteado = true;
                clearTimeout(timerEscopetaLetal);
                player_local.setToRagdoll(10000, 10000, 0, false, false, false);
                mp.game.graphics.startScreenEffect("MenuMGTournamentIn", 10000, true);
                mp.game.cam.shakeGameplayCam("DRUNK_SHAKE", 1.5);

                timerEscopetaLetal = crearTimeout(() => {
                    mp.game.cam.stopGameplayCamShaking(true);
                    mp.game.graphics.stopScreenEffect("MenuMGTournamentIn");
                    jugadorEscopeteado = false;
                }, 10000);
                mp.events.callRemote("heridas_setHP", 10);
                return true;
            }
            return true;
        }
        else if (weapon === 911657153)//FX para el taser
        {
            mp.game.graphics.startScreenEffect(tazerFX1, 3000, true);
            mp.game.graphics.startScreenEffect(tazerFX2, 3000, true);
            player_local.setToRagdoll(10000, 10000, 0, false, false, false);
            sleep(3500).then(() => {
                mp.game.graphics.stopScreenEffect(tazerFX1);
                mp.game.graphics.stopScreenEffect(tazerFX2);
            });
            mp.events.callRemote("heridas_setHP", 5);
            return true;
        }
         else if (weapon === 2725352035 && damage > 0)//Puño
        {
            mp.events.callRemote("heridas_setHP", meleeFistDamage);
            return true;
        }
        else if ((weapon === 2343591895 || weapon === 1737195953 || weapon === 3638508604) && damage > 0)//Linterna, Porra, Puño Americano
        {
            mp.events.callRemote("heridas_setHP", meleeBluntCat1);
            return true;
        }
        else if ((weapon === 2508868239 || weapon === 1317494643 || weapon === 1141786504 || weapon === 2484171525 || weapon === 419712736 || weapon === 2227010557) && damage > 0)//Bate, Martillo, Golf, Taco, Llave, Palanca
        {
            mp.events.callRemote("heridas_setHP", meleeBluntCat2);
            return true;
        }
        else if ((weapon === 4192643659 || weapon === 3756226112 || weapon === 2578778090) && damage > 0)//botella, navaja, cuchillo
        {
            mp.events.callRemote("heridas_setHP", meleeSlashCat1);
            return true;
        }
        else if ((weapon === 3441901897 || weapon === 4191993645 || weapon === 940833800 || weapon === 2460120199 || weapon === 3713923289) && damage > 0)//hacha 1, hacha 2, hacha 3, daga, machete
        {
            mp.events.callRemote("heridas_setHP", meleeSlashCat2);
            return true;
        } 
    }
});
//Daño saliente, con este evento quien genera el daño le muestra la info a el a quien disparo
mp.events.add("outgoingDamage", (sourceEntity, targetEntity, targetPlayer, weapon, boneIndex, damage) => {
    if (mp.controladorJugadores._jugadores[player_local.id]) {
        let jugador = mp.controladorJugadores._jugadores[player_local.id];
        if (jugador.adminservicio) {
            mp.gui.chat.push("OutgoingDamage Entidad: " + sourceEntity.id + " Jugador: " + sourceEntity.name + " Objetivo: " + targetPlayer.name + " Arma: " + weapon + " Hueso: " + boneIndex + " Hueso traducido: " + player_local.getRagdollBoneIndex(boneIndex) + " Daño: " + damage);
            mp.gui.chat.push("Tipo entidad: " + targetPlayer.type);
        }
    }
});
function sleep(ms) {
  return new Promise(resolve => crearTimeout(resolve, ms));
}

let disparoBloqueado = false;
let controlesAtaques = [24, 25, 68, 69, 91, 92, 257];
function weaponIsMelee(hash) {
    let whash = parseInt(hash);
    if (whash == -1834847097) return true;
    if (whash == -1786099057) return true;
    if (whash == -102323637) return true;
    if (whash == -2067956739) return true;
    if (whash == -1569615261) return true;
    if (whash == -1951375401) return true;
    if (whash == 1141786504) return true;
    if (whash == 1317494643) return true;
    if (whash == -102973651) return true;
    if (whash == -656458692) return true;
    if (whash == -1716189206) return true;
    if (whash == -581044007) return true;
    if (whash == -538741184) return true;
    if (whash == 1737195953) return true;
    if (whash == 419712736) return true;
    if (whash == -853065399) return true;
    if (whash == -1810795771) return true;
    if (whash == 940833800) return true;
    return false;
}

//Funcion lanzada cada tick del servidor
mp.events.add("render", function () {
/*     if (!logueado) {
        mp.players.local.freezePosition(true);
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.activate(false);
        return;
    }

    if (navegador != null && navegador_ocultarChat) {
        mp.gui.cursor.visible = true;
        mp.game.ui.displayRadar(false);
        mp.gui.chat.show(false);
    } */

    if (avatarEnProceso) {
        for (let i = 0; i < 33; i++) {
            mp.game.controls.disableAllControlActions(i);
        }
    }

    mp.game.ui.hideHudComponentThisFrame(3);
    mp.game.ui.hideHudComponentThisFrame(6);
    mp.game.ui.hideHudComponentThisFrame(7);
    mp.game.ui.hideHudComponentThisFrame(8);
    mp.game.ui.hideHudComponentThisFrame(9);
    mp.game.ui.hideHudComponentThisFrame(13);
    mp.game.ui.displayAmmoThisFrame(false);

    /* if (player_local.weapon != 2725352035) {
          if (mp.game.weapon.getWeapontypeGroup(player_local.weapon) != 2685387236) {
              mp.game.invoke("0x4A3DC7ECCC321032", player_local.handle, 0.1, false);   
          }
      }*/
    //Si está muerto, no le permitimos atacar R (cancela la animacion)

    let weaponHash = mp.game.invoke("0x0A6DB4965674D243", player_local.handle); //GET_SELECTED_PED_WEAPON

    //MELEE ATTACK con la R bloqueado si no estas con los puños o armas melee
    let isMelee = weaponIsMelee(weaponHash);
    if (!isMelee)//Si el grupo del arma actual es diferente al grupo melee, bloqueo los ataques cuerpo a cuerpo
    {
        mp.game.controls.disableControlAction(32, 140, true);
        mp.game.controls.disableControlAction(32, 141, true);
        mp.game.controls.disableControlAction(32, 142, true);
        mp.game.controls.disableControlAction(32, 143, true);
        mp.game.controls.disableControlAction(32, 263, true);
        mp.game.controls.disableControlAction(32, 264, true);
    }

    // Desactiva la patada desde la moto
    if (player_local.vehicle) {
        mp.game.controls.disableControlAction(32, 345, true);
    } 

    if (estaMuerto || pesca_iniciada /*|| enZonaSegura*/) {
        mp.game.controls.disableControlAction(0, 140, true);
        mp.game.controls.disableControlAction(0, 141, true);
        mp.game.controls.disableControlAction(0, 142, true);
        mp.game.controls.disableControlAction(0, 263, true);
        mp.game.controls.disableControlAction(0, 264, true);
    }

    if (pesca_iniciada) {
        mp.game.controls.disableControlAction(0, 22, true);
        mp.game.controls.disableControlAction(0, 102, true);
    }

    // if (player_local.hasBeenDamagedByAnyPed()) {
    //     if (player_local.getLastDamageBone(0) === 31086) {
    //         let disparoAutor = null;

    //         mp.players.forEachInStreamRange((jug) => {
    //             if (localPlayer.hasBeenDamagedBy(jug.handle, true)) disparoAutor = jug;
    //         });

    //         if (disparoAutor != null) {
    //             mp.game.gameplay.shootSingleBulletBetweenCoords(player_local.position.x, player_local.position.y, player_local.position.z, player_local.position.x, player_local.position.y, player_local.position.z + 0.055, 10000, false, disparoAutor.weapon, disparoAutor.handle, false, false, 9000.0);
    //         }
    //     }

    //     player_local.clearLastDamage();
    // }
    if(mp.controladorJugadores._jugadores[player_local.id] != undefined){
        if(player_local.hasVariable("ANIMACION"))
        {
            if(player_local.getVariable("ANIMACION") != null)
            {
                if(mp.game.controls.isControlPressed(32, 25) && !enmaletero && !bloqueado && !arrastrando && !arrastrado){
                    player_local.clearTasks();
                    mp.events.callRemote("limpiar_animacion");
                }
            }
        }
    }

    if (scaleform_global != null)
        scaleform_global.renderFullscreen();

    if (disparoBloqueado) {
        for (let i = 0; i < controlesAtaques.length; i++) {
            mp.game.controls.disableControlAction(0, controlesAtaques[i], true);
        }
    } else if (player_local.weapon != 2725352035) {
        if (player_local.vehicle == undefined && !player_local.isGettingIntoAVehicle()) {
            for (let i = 0; i < controlesAtaques.length; i++) {
                if (mp.game.controls.isControlPressed(0, controlesAtaques[i])) {
                    if (!mp.game.controls.isInputDisabled(0)) {
                        mp.events.call("antimando:mostrar");
                        disparoBloqueado = true;
                        break;
                    }
                }
            }
        } else {
            if (mp.game.controls.isControlPressed(0, 68) || mp.game.controls.isControlPressed(0, 69)) {
                if (!mp.game.controls.isInputDisabled(0)) {
                    mp.events.call("antimando:mostrar");
                    disparoBloqueado = true;
                }
            }
        }
    }

    if (ultima_dimension != player_local.dimension) {
        ultima_dimension = player_local.dimension;
        cambio_objetos_dimension();
    }
});

// Funciones/Eventos de agacharse
const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.25;

const loadClipSet = async (clipSetName) => {
    mp.game.streaming.requestClipSet(clipSetName);
    while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) await mp.game.waitAsync(0);
};

loadClipSet(movementClipSet);
loadClipSet(strafeClipSet);

// Resetea el agachado de un player para toda la gente en rango
mp.events.add("parar_agacharse", (entity) => {
    if (!entity || !mp.players.exists(entity)) return;

    entity.resetMovementClipset(clipSetSwitchTime);
    entity.resetStrafeClipset();
});

// Tecla CTRL - Agacharse
mp.keys.bind(0xA3, false, () => {
    if (estaChatAbierto) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (cantidad_cefs > 0) return;
    if (player_local.vehicle) return;
    if (montado) return; // Si esta en el metro no le permitimos agacharse para no rukar la anim
    if (player_local.getHealth() <= 66) return;

    if (teclaControlDerechaPulsado) {
        teclaControlDerechaPulsado = false;
    } else {
        teclaControlDerechaPulsado = true;
    }

    mp.events.callRemote("toggleCrouch");
});
}