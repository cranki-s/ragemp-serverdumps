{
/* --------------------------------------------------------------------------------
 * radares.js
 *
 * Autor: Kenshin
 *
 * Descripción: Sistema de radares fijos y moviles
 *
 * -------------------------------------------------------------------------------- */

var cef_radar = require('./LURP/cef.js');

let detectado = true;
let detectadoSenalamientos = false;
let multaActual = {};

var radar_cefId = -1;
var radar_navegador = null;

var timeoutRadar = null;

let radares = [
    // {
    //     nombre: 'Autopista Los Santos',
    //     tipo: 1,
    //     radar: new mp.Vector3(1307.902, 620.764, 80.135),
    //     radarRot: 144.363,
    //     final: new mp.Vector3(1328.620, 600.205, 80.131),
    //     señal: new mp.Vector3(1380.608, 689.015, 79.213),
    //     señalRot: 144.363,
    //     limite: 50,
    //     objetoRadar: null,
    //     objetoSeñal: null
    // }
];

let radares_chunksCodigoEsperados = 0;
let radares_codigoClienteRecibido = "";
let radares_chunksCodigoRecibidos = 0;
mp.events.add('radares:obtener', (chunk) => {
    if (radares_chunksCodigoEsperados <= 0) {
        radares_chunksCodigoEsperados = chunk;
    } else {
        radares_chunksCodigoRecibidos++;
        radares_codigoClienteRecibido += chunk;

        if (radares_chunksCodigoRecibidos == radares_chunksCodigoEsperados) {
            let temp_radares = JSON.parse(radares_codigoClienteRecibido);
            let radares_cargados = 0;
            let radares_total = temp_radares.length;
            for (let temp_radar of temp_radares) {

                let hash;

                switch (temp_radar.tipo) {
                    case 1:
                        hash = mp.game.joaat("prop_speed_camera"); // 1927491455;
                        break;
                    case 2:
                        hash = mp.game.joaat("prop_speed_camera"); // 1927491455; //2300317205
                        break;
                }

                let objeto = mp.objects.new(hash, new mp.Vector3(temp_radar.radar_pos[0], temp_radar.radar_pos[1], temp_radar.radar_pos[2] - 2.99957), { rotation: temp_radar.radar_rot });

                radares.push({
                    id: temp_radar.id,
                    nombre: temp_radar.nombre,
                    tipo: temp_radar.tipo,
                    radar: new mp.Vector3(temp_radar.radar_pos[0], temp_radar.radar_pos[1], temp_radar.radar_pos[2]),
                    radarRot: temp_radar.radar_rot,
                    final: new mp.Vector3(temp_radar.final_pos[0], temp_radar.final_pos[1], temp_radar.final_pos[2]),
                    // señal: new mp.Vector3(temp_radar.senal_pos[0], temp_radar.senal_pos[1], temp_radar.senal_pos[2]),
                    // señalRot: temp_radar.senal_rot,
                    limite: temp_radar.limite,
                    objetoRadar: objeto
                });
                radares_cargados++;
            }

            let _i = setInterval(() => {
                if (radares_cargados == radares_total) {
                    detectado = false;
                    clearInterval(_i);
                    _i = null;
                }
            }, 100);
        }
    }
});

// Temporal para crear un radar móvil
/*
mp.keys.bind(0x60, true, () => {
    mp.gui.chat.push('Empezamos a crear el radar móvil');

    let dis = 80;
    let radar = new mp.Vector3(player_local.position.x, player_local.position.y, player_local.position.z);
    let dir = player_local.getForwardVector();
    let final = new mp.Vector3((dir.x * dis) + (radar.x), (dir.y * dis) + (radar.y), (dir.z * dis) + (radar.z));
    let rot = player_local.getHeading();

    mp.gui.chat.push(`Coordenadas de inicio: ${radar}`);
    mp.gui.chat.push(`Coordenadas finales: ${final}`);
    mp.gui.chat.push(`La rotación es: ${rot}`);
    mp.gui.chat.push('Nos vamos al servidor');

    mp.events.callRemote('radares:nuevoMovil', radar.x, radar.y, radar.z, rot, final.x, final.y, final.z, 50);
});
*/

mp.events.add('render', () => {
    if (!logueado || radares.length == 0 || detectado || !player_local.vehicle) return;

    if(purga) return;
    
    for (let radar of radares) {
        let r = mp.raycasting.testPointToPoint(radar.radar, radar.final, null, 2); // Colision solo con vehiculos

        if (r) {
            if (r.entity.type == 'vehicle' && r.entity == player_local.vehicle) {
                if (player_local.vehicle.getClass() != 13 && player_local.vehicle.getClass() != 15 && player_local.vehicle.getClass() != 16) {
                    var matricula = mp.game.invokeString("0x7CE1CCB9B293020E", r.entity.handle);
                    if (senalamientos.includes(matricula) && !detectadoSenalamientos && r.entity.getPedInSeat(-1) == player_local.handle) {
                        var position = mp.players.local.position;
                        var getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
                        zona = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
                        calle = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);

                        detectadoSenalamientos = true;
                        crearTimeout(() => { detectadoSenalamientos = false; }, 1500);

                        mp.events.callRemote("senalamientos:detectado", matricula, radar.nombre, zona, calle);
                    }

                    if ((r.entity.getSpeed() * 3.6).toFixed(0) > radar.limite) {
                        let vel = (r.entity.getSpeed() * 3.6).toFixed(0);

                        if (r.entity.isSirenOn() || r.entity.isSirenSoundOn()) {
                            let jug = mp.controladorJugadores._jugadores[player_local.id];
                            let trabajos = [1, 2, 3, 4, 16, 25];

                            for (let trabajo of jug.trabajos) {
                                for (v of trabajos) {
                                    if (parseInt(trabajo) == v) return;
                                }
                            }
                        }

                        detectado = true;

                        mp.game.audio.playSoundFrontend(0, 'Camera_Shoot', 'Phone_Soundset_Franklin', true);
                        mp.game.graphics.startScreenEffect('MP_WarpCheckpoint', 500, false);

                        crearTimeout(() => { detectado = false; }, 1500);

                        if (r.entity.getPedInSeat(-1) == player_local.handle) {
                            mp.events.callRemote('radares:detectado', radar.radar.x, radar.radar.y, radar.radar.z, r.entity.propiedades.llave, vel, radar.limite, radar.tipo);

                            mp.gui.takeScreenshot('radar.png', 1, 0, 100);

                            radar_cefId = cef_radar.crearCef("package://LURP/sistemas/radares/radar.html", {
                                mostrarCursor: false,
                                sumarNumeroCefs: false
                            });

                            radar_navegador = cef_radar.obtenerCef(radar_cefId).navegador;

                            multaActual = {
                                matricula: matricula,
                                velocidad: vel,
                                limite: radar.limite,
                                tipo: radar.tipo,
                                id: radar.id
                            };

                            mp.events.add('browserDomReady', radar_domReady);

                            timeoutRadar = crearTimeout(() => {
                                mp.events.call("radar:fin");
                            }, 60*1000);
                        }

                        break;
                    }
                }
            }
        }
    }
});

function radar_domReady() {
    let resolucion = mp.game.graphics.getScreenActiveResolution(100, 100);

    let matricula = multaActual.matricula;
    let vel = multaActual.velocidad;
    let limite = multaActual.limite;
    let tipo = multaActual.tipo;
    let id = multaActual.id;

    radar_navegador.call("radar:cef", 'https://api.lu-rp.es/dries/s1/radar/' + personaje_id, JSON.stringify(resolucion), personaje_id, matricula, vel, limite, tipo, id, apiKey, _k);
    mp.events.remove('browserDomReady', radar_domReady);

    multaActual = {};
}

mp.events.add("radar:fin", () => {
    clearTimeout(timeoutRadar);
    timeoutRadar = null;

    if (radar_cefId >= 0) {
        cef_radar.cerrarCef(radar_cefId, false, false, false);
        radar_cefId = -1;
        
        if(tipoMapa != 2) mp.game.ui.displayRadar(true);

        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);
    }
});


mp.events.add('radares:añadirMovil', (radarX, radarY, radarZ, rot, finalX, finalY, finalZ, limite) => {
    /*
    mp.gui.chat.push(`Estamos en el cliente`);
    mp.gui.chat.push(`Hash radar: ${mp.game.joaat('radar_tripod')}`);
    mp.gui.chat.push(`Hash señal: ${mp.game.joaat('radar_sign_01')}`);
    mp.gui.chat.push(`Coordenadas inicio: ${radarX}, ${radarY}, ${radarZ}`);
    mp.gui.chat.push(`Coordenadas final: ${finalX}, ${finalY}, ${finalZ}`);
    mp.gui.chat.push(`Rotación: ${rot}`);
    mp.gui.chat.push(`Limite: ${limite}`);
    */

    let item = {
        nombre: '',
        tipo: 2,
        radar: new mp.Vector3(radarX, radarY, radarZ),
        radarRot: new mp.Vector3(0.0, 0.0, rot),
        final: new mp.Vector3(finalX, finalY, finalZ),
        // señal: null,
        // señalRot: null,
        limite: limite,
        objetoRadar: null,
        objetoSeñal: null
    }

    radares.push(item);
});
/* 
setInterval(() => {
    if(!purga)
    {
        if (radares.length > 0) {
            for (let radar of radares) {
                if (radar.radarObjeto) {
                    if (calcDist(player_local.position, radar.radar) > 300.0) {
                        if (radar.radar && mp.objects.exists(radar.objetoRadar)) radar.objetoRadar.destroy(); radar.radarObjeto = null;
                        // if (radar.señal) radar.objetoSeñal.destroy();

                        let i = radares.indexOf(radar);

                        if (i != -1) radares.splice(i, 1);
                    }
                } else {
                    if (calcDist(player_local.position, radar.radar) < 300.0) {
                        let hash;

                        switch (radar.tipo) {
                            case 1:
                                hash = 1927491455;
                                break;
                            case 2:
                                hash = 1927491455; //2300317205
                                break;
                        }

                        radar.objetoRadar = mp.objects.new(hash, new mp.Vector3(radar.radar.x, radar.radar.y, radar.radar.z - 0.99957), { rotation: radar.radarRot });

                        // if (radar.tipo == 2 && radar.señal) radar.objetoSeñal = mp.objects.new(3863333246, radar.señal, { rotation: radar.señalRot });
                    }
                }
            }
        }
    }
}, 5000); */
}