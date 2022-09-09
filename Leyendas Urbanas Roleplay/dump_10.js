{
/* --------------------------------------------------------------------------------
 * nametags.js
 *
 * Autor: Kenshin
 *
 * Descripción: Contiene el control de los nombres encima de la cabeza y los sistemas que cambian esos nombres o que dibujan cosas sobre los personajes
 * - nametags (y textos cuando alguien escribe o sistema rematar)
 * - textos cabeza (ej: /ame)
 * - conocidos
 * -------------------------------------------------------------------------------- */

/*
 * 
 * **** NAMETAGS ****
 * 
 */
mp.nametags.enabled = false; // Desactiva los nametags por defecto de RAGEMP

let skinHombre = mp.game.joaat('mp_m_freemode_01');
let skinMujer = mp.game.joaat('mp_f_freemode_01');

// Variables de configuracion de los nametags
var nametagsConfig = {
    /*render: true,
    renderDistance: 255,
    onFootOffset: 20,
    inCarOffset: 60,
    textFont: 4,
    textColor: [
        255,
        255,
        255,
        255
    ],
    textScale: [
        0.35,
        0.35
    ],
    textOutline: true,*/
    maxDistance: 250,
    muted: [255, 255, 255, 255],
    barWidth: 0.030,
    barHeight: 0.0060,
    barBorder: 0.001,
    barBorderColor: {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    },
    healthBarColorFill: {
        r: 75,
        g: 11,
        b: 20,
        a: 255
    },
    healthBarColor: {
        r: 185,
        g: 34,
        b: 40,
        a: 255
    },
    armourBarColorFill: {
        r: 40,
        g: 40,
        b: 40,
        a: 255
    },
    armourBarColor: {
        r: 200,
        g: 200,
        b: 200,
        a: 255
    }
};

const graphics = mp.game.graphics;

// Textos adicionales de los nametags
const texto_remate = "\n\n~b~Presiona [E] para rematar";
const texto_escribiendo = "  ~c~[...]";

/*
 * Color verde al hablar - Roto por parte de RAGEMP
 * 
 * Ambos eventos se reciben muchisimas veces sin sentido, una persona hablando 5 segundos puede mandar ambos eventos casi 30 veces.
 * Por esto mismo el color verde al hablar no funciona bien y no se puede reconocer un "patron" de error.
 */

// Evento para recibir el cambio de un jugador que abre o cierra el chat o chat de voz
var escribiendoNombre = {}; // Lista de jugadores escribiendo en el chat
var hablandoNombre = {}; // Lista de jugadores usando el chat de voz
mp.events.add('cambiar_estado_voz_chat', function (playerId, chat, voz) {
    if (chat) escribiendoNombre[playerId] = true;
    else if (escribiendoNombre.hasOwnProperty(playerId)) delete escribiendoNombre[playerId];

    if (voz) hablandoNombre[playerId] = true;
    else if (hablandoNombre.hasOwnProperty(playerId)) delete hablandoNombre[playerId];
});

// Render que dibuja los nametags
mp.events.add("render", function (nametags) {
    if (!logueado) return;
    if (hudOculto == true) return;

    let colorNombre = nametagsConfig.muted;
    if (adminservicio == true) {
        nametags.forEach(function (nametag) {
            let player = nametag[0], x = nametag[1], y = nametag[2];
            if (typeof player.handle === "number" && player.handle != 0) {
                let jugador = mp.controladorJugadores._jugadores[player.id];
                if (jugador && !jugador.oculto) {
                    let y2 = y + 0.042;
                    let nombre = "";

                    if (jugador.caratapada.estado) {
                        if (jugador.caratapada.iaa) {
                            nombre = player.name;
                        } else {
                            nombre = "[" + jugador.nombre_usuario + "] [ID: " + jugador.id_jugador + "] " + player.name;
                        }
                    } else {
                        nombre = "[" + jugador.nombre_usuario + "] " + player.name + " (" + jugador.id_jugador + ")";
                    }

                    if (escribiendoNombre[jugador.id_jugador]) {
                        nombre = nombre + texto_escribiendo;
                    }

                    if (hablandoNombre[jugador.id_jugador]) {
                        graphics.drawText(nombre, [x, y2], {
                            font: 4,
                            centre: false,
                            color: [102, 255, 102, 255],
                            scale: [0.55, 0.55],
                            outline: true
                        });
                    } else {
                        graphics.drawText(nombre, [x, y2], {
                            font: 4,
                            centre: false,
                            color: [colorNombre[0], colorNombre[1], colorNombre[2], colorNombre[3]],
                            scale: [0.55, 0.55],
                            outline: true
                        });
                    }
                }
            }
        });
    } else {
        nametags.forEach(function (nametag) {
            let player = nametag[0], x = nametag[1], y = nametag[2], distance = nametag[3];
            if (typeof player.handle === "number" && player.handle != 0) {
                let jugador = mp.controladorJugadores._jugadores[player.id];
                if (jugador && !jugador.oculto && distance <= nametagsConfig.maxDistance) {

                    // Codigo para evitar dibujar nombres a traves de paredes, coches o vegetacion
                    if (!player_local.vehicle || player_local.vehicle != player.vehicle) {
                        let jugadorPosicionNametag = player.getWorldPositionOfBone(98);
                        let playerLocalPosicion = player_local.getWorldPositionOfBone(98);

                        let raycast = mp.raycasting.testPointToPoint(playerLocalPosicion, jugadorPosicionNametag, null, 275);
                        if (raycast) {
                            // Si la entidad es objeto del mapa (flag impares -> flag 1) limpiamos su handle
                            let entidad = raycast.entity;
                            if (typeof entidad !== 'number' && typeof entidad.handle !== 'undefined') entidad = entidad.handle;
                            if (typeof (entidad) === 'number' && entidad !== 0 && mp.game.invoke("0x7239B21A38F536BA", entidad) && mp.game.invoke("0x8ACD366038D14505", entidad) == 3) {
                                mp.game.shapetest.releaseScriptGuidFromEntity(entidad); // NATIVA: 0x2B3334BCA57CD799 - RELEASE_SCRIPT_GUID_FROM_ENTITY
                            }
                            return;
                        }
                    }

                    let nombre = ""; // .name NO incluye la id: "Nombre Apellido"
                    if (jugador.adminservicio) { // Si el jugador esta en adminservicio ponemos su nombre (en este caso es de usuario) en morado
                        colorNombre = [214, 49, 176, 255];
                        nombre = player.name + " (" + jugador.id_jugador + ")"; // Rango staff, nombre de usuario e ID
                    } else { // Si no esta en adminservicio usamos color por defecto y segun las opciones mostramos id/nombre o no
                        colorNombre = nametagsConfig.muted;
                        if (mp.storage.data.options) {
                            if (mp.storage.data.options.nametags) {
                                if (mp.storage.data.options.nametagsIds) {
                                    let id_jug = jugador.id_jugador;
                                    if (id_jug == 0) {
                                        id_jug = "0";
                                    } else {
                                        id_jug = id_jug + "";
                                    }

                                    if (mp.storage.data.options.nametagsConocidos 
                                        && jugador.conocido && jugador.caratapada.estado == false 
                                        && (player.model === skinHombre || player.model === skinMujer)) {
                                        nombre = player.name + " (" + id_jug + ")"; // "Nombre Apellido (ID)"
                                    } else {
                                        nombre = id_jug; // "ID"
                                    }
                                } else {
                                    if (mp.storage.data.options.nametagsConocidos 
                                        && jugador.conocido && jugador.caratapada.estado == false 
                                        && (player.model === skinHombre || player.model === skinMujer)) {
                                        nombre = player.name; // "Nombre Apellido"
                                    }
                                }
                            }
                        }
                    }

                    // Vemos si esta escribiendo, y si apuntamos su vida, armadura y texto de remate
                    if (mp.storage.data.options) {
                        if (mp.storage.data.options.nametags) {
                            if (escribiendoNombre[jugador.id_jugador]) { // Si el tio está escribiendo le saldrá [...]
                                nombre = nombre + texto_escribiendo;
                            }

                            // Si apuntamos a alguien vemos su vida, armadura y en caso de estar muerto el texto de remate
                            if (mp.game.player.isFreeAimingAtEntity(player.handle)) {
                                let y2_1 = y + 0.072;

                                let health = player.getHealth();
                                health = (health <= 100) ? (health / 100) : ((health - 100) / 100);
                                let armour = player.getArmour();
                                armour = (armour <= 100) ? (armour / 100) : ((armour - 100) / 100);

                                // Si apuntamos a un muerto añadimos el texto de remate (no puños)
                                if (health <= 0 && player_local.weapon != 2725352035) {
                                    nombre = nombre + texto_remate;
                                }

                                //let health = mp.game.invoke("0xEEF059FAD016D209", player.handle);
                                //let armour = mp.game.invoke("0x9483AF821605B1D8", player.handle);
                                if (armour > 0) {
                                    // armour bar border
                                    graphics.drawRect(x, y2_1, nametagsConfig.barWidth + nametagsConfig.barBorder * 2, nametagsConfig.barHeight + nametagsConfig.barBorder * 2, nametagsConfig.barBorderColor.r, nametagsConfig.barBorderColor.g, nametagsConfig.barBorderColor.b, nametagsConfig.barBorderColor.a);
                                    // armour bar fill
                                    graphics.drawRect(x, y2_1, nametagsConfig.barWidth, nametagsConfig.barHeight, nametagsConfig.armourBarColorFill.r, nametagsConfig.armourBarColorFill.g, nametagsConfig.armourBarColorFill.b, nametagsConfig.armourBarColorFill.a);
                                    // armour bar
                                    graphics.drawRect(x - nametagsConfig.barWidth / 2 * (1 - armour), y2_1, nametagsConfig.barWidth * armour, nametagsConfig.barHeight, nametagsConfig.armourBarColor.r, nametagsConfig.armourBarColor.g, nametagsConfig.armourBarColor.b, nametagsConfig.armourBarColor.a);
                                    // increment y coord for the armour bar
                                    y2_1 += (nametagsConfig.barHeight + nametagsConfig.barBorder * 2) + 0.0032;
                                }

                                // health bar border
                                graphics.drawRect(x, y2_1, nametagsConfig.barWidth + nametagsConfig.barBorder * 2, nametagsConfig.barHeight + nametagsConfig.barBorder * 2, nametagsConfig.barBorderColor.r, nametagsConfig.barBorderColor.g, nametagsConfig.barBorderColor.b, nametagsConfig.barBorderColor.a);
                                // health bar fill
                                graphics.drawRect(x, y2_1, nametagsConfig.barWidth, nametagsConfig.barHeight, nametagsConfig.healthBarColorFill.r, nametagsConfig.healthBarColorFill.g, nametagsConfig.healthBarColorFill.b, nametagsConfig.healthBarColorFill.a);
                                // health bar
                                graphics.drawRect(x - nametagsConfig.barWidth / 2 * (1 - health), y2_1, nametagsConfig.barWidth * health, nametagsConfig.barHeight, nametagsConfig.healthBarColor.r, nametagsConfig.healthBarColor.g, nametagsConfig.healthBarColor.b, nametagsConfig.healthBarColor.a);
                            }
                        }
                    }

                    // Si al final su nombre no es vacio lo dibujamos
                    if (nombre !== "") {
                        let y2 = y + 0.042;

                        if (hablandoNombre[jugador.id_jugador]) {
                            graphics.drawText(nombre, [x, y2], {
                                font: 4,
                                centre: false,
                                color: [102, 255, 102, 255],
                                scale: [0.35, 0.35],
                                outline: true
                            });
                        } else {
                            graphics.drawText(nombre, [x, y2], {
                                font: 4,
                                centre: false,
                                color: [colorNombre[0], colorNombre[1], colorNombre[2], colorNombre[3]],
                                scale: [0.35, 0.35],
                                outline: true
                            });
                        }
                    }
                }
            }
        });
    }
});


/*
 * 
 * **** TEXTOS CABEZA ****
 * 
 */
var textosCabeza = {};

// Evento que recibe un nuevo texto que mostrar en la cabeza de un jugador
mp.events.add('mostrar_textoCabeza', function (array) {
    if (typeof array !== "string") return;
    if (!mostrar_texto_cabeza) return;
    let arrayJson = JSON.parse(array);

    let jug = mp.players.atRemoteId(arrayJson[0]);
    if (!jug || !mp.players.exists(jug)) return;
    if (jug == player_local) return;
    if (jug) {
        if (textosCabeza.hasOwnProperty(jug.id)) {
            if (mp.labels.exists(textosCabeza[jug.id].label))
                textosCabeza[jug.id].label.destroy();
            delete textosCabeza[jug.id];
        }
   
        let label = mp.labels.new(arrayJson[1], new mp.Vector3(jug.position.x, jug.position.y, jug.position.z + 1), { los: false, font: 6, drawDistance: arrayJson[5], color: arrayJson[2], dimension: arrayJson[4] });
        let timeout_texto = crearTimeout(() => {
            if (!mp.players.exists(jug)) return;
            if (textosCabeza[jug.id]) {
                if (mp.labels.exists(textosCabeza[jug.id].label))
                    textosCabeza[jug.id].label.destroy();
                delete textosCabeza[jug.id];
            }
        }, arrayJson[3]);

        textosCabeza[jug.id] = {
            label: label,
            distancia: arrayJson[5],
            timeout: timeout_texto
        }
    }
});

// Render que dibuja los textos cabeza (ej: /ame)
mp.events.add("render", () => {
    if (!mostrar_texto_cabeza) return;
    mp.players.forEachInStreamRange(jug => {
        if (mp.controladorJugadores._jugadores[jug.id]) {
            if (mp.controladorJugadores._jugadores[jug.id].oculto) {
                if (textosCabeza[jug.id]) {
                    if (mp.labels.exists(textosCabeza[jug.id].label))
                        textosCabeza[jug.id].label.destroy();
                    delete textosCabeza[jug.id];
                }
            } else if (textosCabeza.hasOwnProperty(jug.id)) {
                textosCabeza[jug.id].label.position = new mp.Vector3(jug.position.x, jug.position.y, jug.position.z+1);
            }
        }
    });
});


/*
 * 
 * **** CONOCIDOS ****
 * 
 */
var pjConocidos = {}; // Objeto que contiene las sqlids de los personajes conocidos
var pjConocidosPermanente = {}; // Lista usada para poder borrar temporalmente los conocidos, sin tener que relogear para poder volver a recargar los conocidos

// Evento para anadir un conocido
mp.events.add('add:pj:conocido', function (sqlidPj) {
    if (typeof sqlidPj !== "number") return;

    if (pjConocidos.hasOwnProperty(sqlidPj)) {
        delete pjConocidos[sqlidPj];
    }

    pjConocidos[sqlidPj] = true;

    pjConocidosPermanente = pjConocidos;

    logInfo("CONOCIDOS", "Nuevo conocido: " + sqlidPj);

    // Aplicamos el cambio al jugador si lo tenemos en rango
    mp.players.forEachInStreamRange(player => { 
        let jugador = mp.controladorJugadores._jugadores[player.id];
        if (jugador && typeof jugador.sqlid_personaje === "number") {
            if (sqlidPj == jugador.sqlid_personaje) {
                jugador.conocido = true;
                return;
            }
        }
    });
});

// Evento para eliminar un conocido
mp.events.add('remove:pj:conocido', function (sqlidPj) {
    if (typeof sqlidPj !== "number") return;

    if (pjConocidos.hasOwnProperty(sqlidPj)) {
        delete pjConocidos[sqlidPj];

        pjConocidosPermanente = pjConocidos;

        logInfo("CONOCIDOS", "Eliminado conocido: " + sqlidPj);

        // Aplicamos el cambio al jugador si lo tenemos en rango
        mp.players.forEachInStreamRange(player => { 
            let jugador = mp.controladorJugadores._jugadores[player.id];
            if (jugador && typeof jugador.sqlid_personaje === "number") {
                if (sqlidPj == jugador.sqlid_personaje) {
                    if (jugador.conocido) {
                        delete jugador.conocido;
                    }
                    return;
                }
            }
        });
    }
});

// Evento para eliminar todos los conocidos
mp.events.add('remove:all:conocidos', function (temporal = false) {
    if (temporal == true){ // Borra TEMPORALMENTE los conocidos al cliente, NO necesita relogear para poder recargar los conocidos borrados
        pjConocidosPermanente = pjConocidos;
        pjConocidos = {};

        // Aplicamos el cambio a la gente que tenemos en rango
        mp.players.forEachInStreamRange(player => {
            let jugador = mp.controladorJugadores._jugadores[player.id];
            if (jugador && jugador.conocido) {
                delete jugador.conocido;
            }
        });

        logInfo("CONOCIDOS", "Eliminados todos los conocidos temporalmente");
    }
    else{ // Borra por completo los conocidos al cliente, necesita relogear para poder recargar los conocidos borrados
        pjConocidos = {};
        pjConocidosPermanente = pjConocidos;

        // Aplicamos el cambio a la gente que tenemos en rango
        mp.players.forEachInStreamRange(player => {
            let jugador = mp.controladorJugadores._jugadores[player.id];
            if (jugador && jugador.conocido) {
                delete jugador.conocido;
            }
        });
    
        logInfo("CONOCIDOS", "Eliminados todos los conocidos");
    }
});

// Evento para recargar todos los conocidos
mp.events.add('recargar:pjs:conocidos', function () {
    if (pjConocidosPermanente){
        pjConocidos = pjConocidosPermanente;

        // Aplicamos los conocidos a la gente que tenemos en rango
        mp.players.forEachInStreamRange(player => {
            let jugador = mp.controladorJugadores._jugadores[player.id];
            if (jugador && typeof jugador.sqlid_personaje === "number") {
                if (pjConocidos.hasOwnProperty(jugador.sqlid_personaje)){
                    jugador.conocido = true;
                }
            }
        });
    
        logInfo("CONOCIDOS", "Recargados: " + count);
    }
});

// Evento para cargar los personajes conocidos tras conectar (deberia ser sustituido por carga desde API)
mp.events.add('cargar:pjs:conocidos', function (array_sqlids) {
    if (typeof array_sqlids !== "string") return;

    let array_ids = JSON.parse(array_sqlids);
    let count = 0;
    pjConocidos = {};

    for (let i = 0; i < array_ids.length; i++) {
        let sqlidPj = array_ids[i];
        if (!pjConocidos.hasOwnProperty(sqlidPj)) {
            pjConocidos[sqlidPj] = true;
            count++;
        }
    }

    pjConocidosPermanente = pjConocidos;

    // Aplicamos los conocidos a la gente que tenemos en rango
    crearTimeout(function () {
        mp.players.forEachInStreamRange(player => {
            let jugador = mp.controladorJugadores._jugadores[player.id];
            if (jugador && typeof jugador.sqlid_personaje === "number") {
                for (let i = 0; i < array_ids.length; i++) {
                    if (sqlidPj == jugador.sqlid_personaje) {
                        jugador.conocido = true;
                        array_ids.splice(i, 1);
                        break;
                    }
                }
            }
        });
    }, 30000);

    logInfo("CONOCIDOS", "Cargados: " + count);

    mp.events.remove('cargar:pjs:conocidos');
});

}