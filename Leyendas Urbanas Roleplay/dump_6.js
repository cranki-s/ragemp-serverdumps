{
/* --------------------------------------------------------------------------------
 * general.js
 *
 * Autor: Kenshin
 *
 * Descripción: Eventos sin agrupar o categorizar
 *
 * -------------------------------------------------------------------------------- */

// En desuso debido a que pasa a ser una notificación en el CEF del HUD
/*var _SET_NOTIFICATION_COLOR_NEXT = "0x39BBF623FC803EAC";
var _SET_NOTIFICATION_BACKGROUND_COLOR = "0x92F0DA1E27DB96DC";
var maxStringLength = 99;
mp.events.add("notificacion", function (message, flashing, textColor, bgColor, flashColor) {
    if (flashing === void 0) { flashing = false; }
    if (textColor === void 0) { textColor = -1; }
    if (bgColor === void 0) { bgColor = -1; }
    if (flashColor === void 0) { flashColor = [77, 77, 77, 200]; }
    if (textColor > -1)
        mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1)
        mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing)
        mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);
    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (var i = 0, msgLen = message.length; i < msgLen; i += maxStringLength)
        mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.drawNotification(flashing, true);
});
mp.events.add("notificacion_imagen", function (title, sender, message, notifPic, icon, flashing, textColor, bgColor, flashColor) {
    if (icon === void 0) { icon = 0; }
    if (flashing === void 0) { flashing = false; }
    if (textColor === void 0) { textColor = -1; }
    if (bgColor === void 0) { bgColor = -1; }
    if (flashColor === void 0) { flashColor = [77, 77, 77, 200]; }
    if (textColor > -1)
        mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1)
        mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing)
        mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);

    if (!mp.game.graphics.hasStreamedTextureDictLoaded(notifPic)) {
        mp.game.graphics.requestStreamedTextureDict(notifPic, true);
    }

    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (var i = 0, msgLen = message.length; i < msgLen; i += maxStringLength)
        mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.setNotificationMessage(notifPic, notifPic, flashing, icon, title, sender);
    mp.game.ui.drawNotification(false, true);
});*/

// Teclas //
/* - Tecla E -- Interacción a pie -
 *
 * Primero se realizan 2 raycast debido a que los flags 4-8 son identicos y ambos afectan a peds y players.
 *
 * 1.- Se realiza un raycast que no colisiona con vehículos ni peds-players
 * 2.- Si tras el primer raycast su resultado no nos sirve realizamos un segundo raycast que solo colisiona con peds-players
 * 
 * 3.- Si ningún raycast nos da un resultado útil entonces ejecutamos lo que anteriormente era la tecla U
 */

var estabaChatAbierto = true;
var estabaVozActiva = true;
var bigNotyActiva = false;
var tratoActivo = false;
var territorioID = -1;
var notificacionVending = null;

mp.keys.bind(0x45, false, () => {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (player_local.vehicle) return;
    if (navegador != null) return;
    if (cantidad_cefs > 0) return;
    if (isNoClip) return; // noclip o recon
    if (campoTiroActivo) return;
    if (arrastrado) return;
    if (enmaletero) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;

    if (setFloodboton(1000, "FB1") == false) return;

    // -- Si tenemos un arma y estamos apuntando a un muerto al usar la E le rematamos --
    if (player_local.weapon != 2725352035) {
        let apuntado = mp.game.player.getEntityIsFreeAimingAt();
        if (apuntado != undefined && mp.players.exists(apuntado)) {
            let health = apuntado.getHealth();
            if (health != undefined) {
                health = (health <= 100) ? (health / 100) : ((health - 100) / 100);
                if (health <= 0) {
                    let apuntado_id = apuntado.id;
                    if (mp.controladorJugadores._jugadores[apuntado_id] != undefined && mp.controladorJugadores._jugadores[apuntado_id].conectado) {
                        let id_jug = mp.controladorJugadores._jugadores[apuntado_id].id_jugador;
                        let position = mp.players.local.position;
                        let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
                        let zona = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
                        let calle = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
                        if (id_jug != undefined && id_jug != null)
                            mp.events.callRemote("rematar:ejecutar", id_jug, zona, calle);
                        return;
                    }
                }
            }
        }
    }

    const camera = mp.cameras.new("gameplay"); // Camara de gameplay
    let position = camera.getCoord(); // Posición de la camara como Vector3
    let direction = camera.getDirection(); // Dirección a la que está apuntando la cámara como Vector3
    let endPosition = new mp.Vector3((direction.x * 30) + (position.x), (direction.y * 30) + (position.y), (direction.z * 30) + (position.z)); // Punto random dibujado entre posicion y dirección a X distancia

    // Raycast que se usa en principio, para las plantas del sistema de cultivos, por ello radio 1 para que no sea muy dificil dar con los objetos
    let raycast = mp.raycasting.testCapsule(position, endPosition, 2, player_local, 16); // Colision con objetos
    if (raycast) { // Ha tocado algo
        let entidad = raycast.entity;
        if (entidad && entidad != null) { // El resultado es válido
            let tipo = entidad.type;
            if (tipo != undefined && tipo != null) { // ENTIDAD RAGEMP
                if (tipo == "object") {
                    switch (entidad.model) {
                        case 276792131: case 3989082015: case 700751921: case 355543203: case 452618762: case 127785952: case 652856340: case 1996912527:
                            endPosition = raycast.position;
                            raycast = mp.raycasting.testPointToPoint(position, endPosition, player_local, 3); // Colision con mapa y vehiculos
                            if (raycast) { // La planta está detras de una pared o vehículo, no seguimos
                                limpiarHandleRaycast(raycast.entity);
                                return;
                            }

                            if (calcDist(player_local.position, new mp.Vector3(entidad.position.x, entidad.position.y, entidad.position.z)) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                                // Si está la purga activa, no le dejamos interactuar con la planta
                                if (purga) {
                                    mostrarAviso("info", 5000, "Durante la purga no puedes interactuar con la planta, tampoco sufrirá cambios de ningún tipo");
                                    return;
                                }
                                // Si está haciendo alguna acción con la planta, no le permitimos abrir la vaina evidentemente
                                if (typeof interactuandoConPlanta === 'boolean' && interactuandoConPlanta) {
                                    mostrarAviso("info", 5000, "Ya estás interactuando con una planta, no seas ansias");
                                    return;
                                }
                                mp.events.call("cultivar:menu_planta_raycast");
                                return;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }

    // Si el raycast no detecta planta, comprobamos si está en el rango de pulsar la E para abrir el menu
    for (let i = 0, n = plantas.length; i < n; i++)
    {
        if (plantas[i].posicion)
        {
            if (calcDist(plantas[i].posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2))
            {
                // Si está la purga activa, no le dejamos interactuar con la planta
                if (purga) {
                    mostrarAviso("info", 5000, "Durante la purga no puedes interactuar con la planta, tampoco sufrirá cambios de ningún tipo");
                    return;
                }
                // Si está haciendo alguna acción con la planta, no le permitimos abrir la vaina evidentemente
                if (typeof interactuandoConPlanta === 'boolean' && interactuandoConPlanta) {
                    mostrarAviso("info", 5000, "Ya estás interactuando con una planta, no seas ansias");
                    return;
                }

                mp.events.call("cultivar:menu_planta_raycast");
                return;
            }
        }
    }

    raycast = mp.raycasting.testCapsule(position, endPosition, 0.55, player_local, 240); // Colision con objetos
    if (raycast) { // Ha tocado algo
        let entidad = raycast.entity;
        if (entidad && entidad != null) { // El resultado es válido
            let tipo = raycast.entity.type;
            if (tipo != undefined && tipo != null) { // ENTIDAD RAGEMP
                if (tipo == "object") {
                    switch (entidad.model) {
                        case 684927: case -870868698: case -1126237515: case -1364697528: case 506770882: case 3168729781: // Cajeros
                            mp.events.callRemote("tecla_raycast", 1);
                            return;
                        case 1158960338: case 1281992692: case -1559354806: case -429560270: case 1511539537: case -2103798695: case 295857659: case -78626473: // Cabinas telefónicas
                            mp.events.callRemote("tecla_raycast", 2);
                            return;
                        case 1933174915: case 1339433404: case -2007231801: case 1694452750: case -462817101: case -469694731: case -164877493: case 3825272565: // Surtidores
                            if (calcDist(raycast.position, player_local.position) <= 7.0){
                                mp.events.callRemote("tecla_raycast", 3);
                                return;
                            }
                            break;
                        case -1741437518: case 992069095: case 2553529778: // Cola
                            if (calcDist(player_local.position, new mp.Vector3(entidad.position.x, entidad.position.y, entidad.position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 0);
                                return;
                            }
                            break;
                        case 1114264700: case -504687826: case 3790279470: // sprunk
                            if (calcDist(player_local.position, new mp.Vector3(entidad.position.x, entidad.position.y, entidad.position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 1);
                                return;
                            }
                            break;
                        case 1099892058: // agua
                            if (calcDist(player_local.position, new mp.Vector3(entidad.position.x, entidad.position.y, entidad.position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 2);
                                return;
                            }
                            break;
                        case 690372739: // cafe
                            if (calcDist(player_local.position, new mp.Vector3(entidad.position.x, entidad.position.y, entidad.position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 3);
                                return;
                            }
                            break;
                        case -654402915: case -1034034125: case 3260933171: case 3640564381: // variado
                            if (calcDist(player_local.position, new mp.Vector3(entidad.position.x, entidad.position.y, entidad.position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 4);
                                return;
                            }
                            break;
                        case 73774428: // Tabaco
                            if (calcDist(player_local.position, new mp.Vector3(entidad.position.x, entidad.position.y, entidad.position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 5);
                                return;
                            }
                            break;
                        case -1103205386: case 3191761910: // Energetica
                            if (calcDist(player_local.position, new mp.Vector3(entidad.position.x, entidad.position.y, entidad.position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 6);
                                return;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            else { // ENTIDAD GTAV (o peds creados con mp.peds)
                if (mp.game.invoke("0x7239B21A38F536BA", entidad)) { // Si existe la entidad seguimos
                    let hashModelNativa = mp.game.invoke("0x9F47B058362C84B5", entidad); // Obtenemos el hash del modelo resultado de la colisión
                    let position = mp.game.invokeVector3("0x3FEF770D40960D5A", entidad, false);
                    switch (hashModelNativa) {
                        case 684927: case -870868698: case -1126237515: case -1364697528: case 506770882: case 3168729781: // Cajeros
                            mp.events.callRemote("tecla_raycast", 1);
                            return;
                        case 1158960338: case 1281992692: case -1559354806: case -429560270: case 1511539537: case -2103798695: case 295857659: case -78626473: // Cabinas telefónicas
                            mp.events.callRemote("tecla_raycast", 2);
                            return;
                        case 1933174915: case 1339433404: case -2007231801: case 1694452750: case -462817101: case -469694731: case -164877493: case 3825272565: // Surtidores
                            if (calcDist(raycast.position, player_local.position) <= 7.0){
                                mp.events.callRemote("tecla_raycast", 3);
                                return;
                            }
                            break;
                        case -1741437518: case 992069095: case 2553529778: // Cola
                            if (calcDist(player_local.position, new mp.Vector3(position.x, position.y, position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 0);
                                return;
                            }
                            break;
                        case 1114264700: case -504687826: case 3790279470: // sprunk
                            if (calcDist(player_local.position, new mp.Vector3(position.x, position.y, position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 1);
                                return;
                            }
                            break;
                        case 1099892058: // agua
                            if (calcDist(player_local.position, new mp.Vector3(position.x, position.y, position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 2);
                                return;
                            }
                            break;
                        case 690372739: // cafe
                            if (calcDist(player_local.position, new mp.Vector3(position.x, position.y, position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 3);
                                return;
                            }
                            break;
                        case -654402915: case -1034034125: case 3260933171: case 3640564381: // variado
                            if (calcDist(player_local.position, new mp.Vector3(position.x, position.y, position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 4);
                                return;
                            }
                            break;
                        case 73774428: // Tabaco
                            if (calcDist(player_local.position, new mp.Vector3(position.x, position.y, position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 5);
                                return;
                            }
                            break;
                        case -1103205386: case 3191761910: // Energetica
                            if (calcDist(player_local.position, new mp.Vector3(position.x, position.y, position.z)) < 1.5) {
                                mp.events.callRemote("mostrar_menu_vending", 6);
                                return;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }

    raycast = mp.raycasting.testCapsule(position, endPosition, 0.55, player_local, 230); // Colision con peds y veh (metro)
    if (raycast) {
        let entidad = raycast.entity;
        if (entidad && entidad != null) {
            for (const pedId in peds_facciones) {
                const ped = peds_facciones[pedId];
                if (!ped.ped || !mp.peds.exists(ped.ped)) continue;

                if (entidad == ped.ped && faccion == ped.faccion_id) {
                    mp.events.callRemote("faccion:menu_ped", ped.SQLID);
                    return;
                }
                
                if (entidad == ped.ped && faccion > 0 && faccion != ped.faccion_id)
                {
                    // mp.events.callRemote("ped:empezar_tiroteo", ped.SQLID);
                    mp.events.callRemote("faccion:menu_comprar_ped", ped.SQLID);
                    return;
                }
                
                if (entidad == ped.ped && faccion == 0)
                {
                    let jugador = mp.controladorJugadores._jugadores[player_local.id];
                    if((jugador.trabajos).includes(1) || (jugador.trabajos).includes(2) || (jugador.trabajos).includes(25)){
                        mp.events.callRemote("ped:empezar_tiroteo", ped.SQLID);
                        return;
                    }else{
                        mp.events.callRemote("faccion:menu_comprar_ped", ped.SQLID);
                        return;
                    }
                }
            }

            let aux = entidad.model;
            let model = aux == undefined ? mp.game.invoke("0x9F47B058362C84B5", entidad) : aux; // Si no podemos obtener el modelo con .model usamos la nativa, es necesario con el tren
            switch (model) {
                case 3014915558: // Autoescuela - job autobusero
                    if (calcDist(player_local.position, new mp.Vector3(-704.2617, -1398.436, 5.495287)) < 3.0) {
                        mp.events.callRemote("tecla_raycast", 4);
                        return;
                    }
                    if (calcDist(player_local.position, new mp.Vector3(437.55, -625.99, 28.70815)) < 2.5 || // LS
                        calcDist(player_local.position, new mp.Vector3(-774.9046, -2632.354, 13.94462)) < 2.5) { // LS Aeropuerto
                        mp.events.call("mostrar_menu_job_raycast", "Autobusero");
                        return;
                    }
                    break;
                case 436345731: // job camionero
                    if (calcDist(player_local.position, new mp.Vector3(797.3534, -2988.584, 6.020938)) < 2.5 || // LS
                        calcDist(player_local.position, new mp.Vector3(173.6267, 2778.841, 46.07729)) < 2.5 || // Sandy
                        calcDist(player_local.position, new mp.Vector3(-17.78542, 6304.42, 31.37496)) < 2.5) { // Paleto
                        mp.events.call("mostrar_menu_job_raycast", "Camionero");
                        return;
                    }
                    break;
                case 4000686095: // job basurero
                    if (calcDist(player_local.position, new mp.Vector3(-356.0805, -1513.9795, 27.716805)) < 2.5 || // LS
                        calcDist(player_local.position, new mp.Vector3(2029.934, 3183.627, 45.08184)) < 2.5 || // Sandy
                        calcDist(player_local.position, new mp.Vector3(-149.3427, 6485.527, 29.72809)) < 2.5) { // Paleto
                        mp.events.call("mostrar_menu_job_raycast", "Basurero");
                        return;
                    }
                    break;
                case 3321821918: // job minero
                    if (calcDist(player_local.position, new mp.Vector3(2566.461, 2714.431, 42.61328)) < 2.5) {
                        mp.events.call("mostrar_menu_job_raycast", "Minero");
                        return;
                    }
                    break;
                case 1240094341: // job temporero
                    if (calcDist(player_local.position, new mp.Vector3(417.8389, 6520.701, 27.71741)) < 2.5 || // Paleto
                        calcDist(player_local.position, new mp.Vector3(1905.676, 4926.507, 48.91108)) < 2.5) { // Grapeseed
                        mp.events.call("mostrar_menu_job_raycast", "Recolector");
                        return;
                    }
                    break;
                case 1650036788: // job cartero
                    if (calcDist(player_local.position, new mp.Vector3(78.63522, 111.5582, 81.16817)) < 2.5 || // LS
                        calcDist(player_local.position, new mp.Vector3(-425.7651, -2785.7996, 6.000382)) < 2.5 || // LS Puerto
                        calcDist(player_local.position, new mp.Vector3(-405.1782, 6150.5205, 31.678293)) < 2.5) { // Paleto
                        mp.events.call("mostrar_menu_job_raycast", "Cartero");
                        return;
                    }
                    break;
                case 2705543429: // job taxista
                    if (calcDist(player_local.position, new mp.Vector3(-569.1012, -2327.932, 13.94462)) < 2.5 || // LS
                        calcDist(player_local.position, new mp.Vector3(1997.401, 3780.306, 32.18078)) < 2.5 || // Sandy
                        calcDist(player_local.position, new mp.Vector3(-42.07331, 6435.479, 31.49069)) < 2.5) { // Paleto
                        mp.events.call("mostrar_menu_job_raycast", "Taxista");
                        return;
                    }
                    break;
                case 3008586398: // job paramedico
                    if (calcDist(player_local.position, new mp.Vector3(162.4232, -1119.935, 29.32092)) < 2.5) {
                        mp.events.call("mostrar_menu_job_raycast", "Paramedico");
                        return;
                    }
                    break;
                case 2040438510: // job reponerdor
                    if (calcDist(player_local.position, new mp.Vector3(814.0063, -1644.947, 30.90012)) < 2.5) {
                        mp.events.call("mostrar_menu_job_raycast", "Reponedor");
                        return;
                    }
                    break;
                case 2255894993: // job pescador
                    if (calcDist(player_local.position, new mp.Vector3(-339.3759, -2444.141, 7.296101)) < 2.5) {
                        mp.events.call("mostrar_menu_job_raycast", "Pescador");
                        return;
                    }
                case 868868440: // Metro - subir y bajar
                    mp.events.call("raycast_metro");
                    return;
                case 1283141381: // Cef coches robados
                    mp.events.callRemote("cef_robar_coche");
                    return;
                case 2896414922: // Traficar negro
                    if(tieneObjetoMano()) mp.events.callRemote("traficarnegroraycast");
                    else mostrarAviso("danger", 5000, "No tienes nada en la mano para venderle");
                    return;
                default:
                    break;
            }
        }
    }

    try {
        if (!mostrar_cef_pesca) { // sistemas/pesca.js
            let negocio_mostrador = null;
            let propiedad_armario = null;
            let ammunation = null;
            let avatar = 2.0;
            let juzgados = 2.0;
            let ayuntamiento = 2.0;

            // Ponerte de servicio como paramédico en las taquillas del hospital de pillbox hill
            if (calcDist(player_local.position, new mp.Vector3(298.82355, -597.8011, 43.28409)) < 2.5 && player_local.dimension == 0) {
                mp.events.callRemote("deservicio:paramedico");
                return;
            }

            // Menu de máscaras, solo se podrá abrir si la PURGA ESTA ACTIVA. COMENTAO HASTA LA PURGAAAAA
            if ((calcDist(player_local.position, new mp.Vector3(300.47382, -1003.9423, 29.327621)) < 2.0 && player_local.dimension == 0) || (calcDist(player_local.position, new mp.Vector3(-169.11797, -1308.8752, 31.310343)) < 2.0 && player_local.dimension == 0) || (calcDist(player_local.position, new mp.Vector3(-1265.9401, -818.18994, 17.099028)) < 2.0 && player_local.dimension == 0) || (calcDist(player_local.position, new mp.Vector3(1569.2933, 3573.3599, 33.15769)) < 2.0 && player_local.dimension == 0) || (calcDist(player_local.position, new mp.Vector3(21.302479, 6511.38, 31.492159)) < 2.0 && player_local.dimension == 0)) {
                if (modopurga)
                {   // Si tiene alguna máscara puesta o tiene algo en la mano, no le enseñamos el menu, me va a bugear el menu por los cojones
                    if ((mp.players.local.getDrawableVariation(1) == 0) && (!tieneObjetoMano()))
                    {
                        mp.events.call('mascaraspurga:mostrar_menu');
                        return;
                    }
                    else
                    {
                        mostrarAviso("danger", 6000, "Quitate la máscara que llevas puesta y/o asegurate de no tener nada en la mano para poder visualizar el menu");
                        return;
                    }
                }
            }

            // Menú para las medicinas de la purga
            if ((calcDist(player_local.position, new mp.Vector3(308.21854, -1003.4811, 29.317635)) < 2.0 && player_local.dimension == 0) || (calcDist(player_local.position, new mp.Vector3(-154.08633, -1308.6785, 31.309383)) < 2.0 && player_local.dimension == 0) || (calcDist(player_local.position, new mp.Vector3(-1276.2034, -805.80237, 17.304289)) < 2.0 && player_local.dimension == 0) || (calcDist(player_local.position, new mp.Vector3(1563.2083, 3575.3774, 33.74667)) < 2.0 && player_local.dimension == 0) || (calcDist(player_local.position, new mp.Vector3(14.408886, 6504.474, 31.492159)) < 2.0 && player_local.dimension == 0)) {
                if (modopurga)
                {   
                    mp.events.call('medicinas:mostrar_menu_purga');
                    return;
                }
            }

            if (calcDist(player_local.position, new mp.Vector3(12.54883, -1105.1913, 29.7970)) < 3.0 && player_local.dimension == 0 && !campoTiroActivo) { // GALERIA DE TIRO DE PILLBOX HILL
                if (modopurga) {   // Si el modo purga esta activo, no le dejamos hacer el entrenamiento
                    mostrarAviso("danger", 6000, "No disponible durante la purga");
                    return;
                }
                mp.events.call('ammunation:mostrar_menu_campodetiro');
                mp.events.call("sound:play", "campotiropillboxhill", false);
                return;
            }

            if (calcDist(player_local.position, new mp.Vector3(819.6754, -2155.774, 29.6190)) < 3.0 && player_local.dimension == 0 && !campoTiroActivo) { // GALERIA DE TIRO DE CYPRESS FLAT
                if (modopurga) {   // Si el modo purga esta activo, no le dejamos hacer el entrenamiento
                    mostrarAviso("danger", 6000, "No disponible durante la purga");
                    return;
                }
                mp.events.call('ammunation:mostrar_menu_campodetiro');
                mp.events.call("sound:play", "campotirocypressflat", false);
                return;
            }

            if (en_Trabajo_Cartero) {
                mp.events.callRemote('tecla_accion');
                return;
            }

            for (let i = 0, n = negocios.length; i < n; i++) {
                if (player_local.dimension == 0) {
                    if (negocios[i].tipo != 20 && negocios[i].tipo != 23) {
                        if (negocios[i].interior_id == 0) {
                            if (calcDist(player_local.position, negocios[i].mostrador) <= 2.5) {
                                negocio_mostrador = negocios[i].llave;
                                break;
                            }
                        }
                    }
                }
                else {
                    if (negocios[i].interior_id != 0) {
                        if (negocios[i].tipo != 23) {
                            if (player_local.dimension == negocios[i].llave) {
                                negocio_mostrador = negocios[i].llave;
                                break;
                            }
                        }
                    }
                }
            }

            if (negocio_mostrador != null) {
                mp.events.callRemote('negocios:mostrador', negocio_mostrador);
                return;
            }

            // Menu propiedades tecla E (o menu de seguridad de propiedades)
            if (player_local.dimension == 0) {
                let radio = player_local.vehicle ? 5.0 : 2.5;

                for (let i = 0, n = propiedades.length; i < n; i++) {
                    if (propiedades[i].tipo < 3) {
                        if (calcDist(player_local.position, propiedades[i].pospuerta) <= radio || calcDist(player_local.position, propiedades[i].possalida) <= radio) {
                            propiedad_armario = propiedades[i].llave;
                            break;
                        }
                    }
                }

                if (propiedad_armario != null) {
                    mp.events.callRemote('propiedades:armario', propiedad_armario, false);
                    return;
                }
            }

            if (modopurga) // Si esta el modo purga activo, solo le dejamos comprar armas en estas posiciones definidas
            {
                if ((calcDist(player_local.position, new mp.Vector3(312.8873, -1003.6975, 29.311502)) < 2.0 && player_local.dimension == 0)
                    || (calcDist(player_local.position, new mp.Vector3(-164.36293, -1308.9047, 31.321835)) < 2.0 && player_local.dimension == 0)
                    || (calcDist(player_local.position, new mp.Vector3(-1271.3212, -811.9394, 17.115644)) < 2.0 && player_local.dimension == 0)
                    || (calcDist(player_local.position, new mp.Vector3(1561.3988, 3567.5737, 34.132187)) < 2.0 && player_local.dimension == 0)
                    || (calcDist(player_local.position, new mp.Vector3(17.276636, 6507.9194, 31.492159)) < 2.0 && player_local.dimension == 0)
                ) {
                    ammunation = 1;
                }
            }
            else // Si no está activo, le dejamos comprar en cualquier ammunation de los definidos
            {
                for (let i = 0, n = ammunations.length; i < n; i++) {
                    if (calcDist(player_local.position, ammunations[i].posicion) < 2.0 && player_local.dimension == 0 && !campoTiroActivo) {
                        ammunation = 1;
                        break;
                    }
                }
            }

            if (ammunation != null) {
                if (modopurga) {
                    mp.events.call('ammunation:mostrar_menu_purga');
                    return;
                } else {
                    mp.events.callRemote('ammunation:consultar_licencias');
                    return;
                }
            }

            // Tecla E en ayuntamientos: menu multas, foto avatar, menu ayuntamiento
            if (player_local.dimension == 0){
                // Obtenemos la posicion mas cercana de cada tipo
                for (let i = 0, n = posicionesJuzgados.length; i < n; i++) {
                    let dist = calcDist(player_local.position, posicionesJuzgados[i].posicion);
                    if (dist < 2.0) {
                        juzgados = dist;
                        break;
                    }
                }
    
                for (let i = 0, n = posicionesAyuntamientos.length; i < n; i++) {
                    let dist = calcDist(player_local.position, posicionesAyuntamientos[i].posicion);
                    if (dist < 2.0) {
                        ayuntamiento = dist;
                        break;
                    }
                }
    
                for (let i = 0, n = posicionesAvatar.length; i < n; i++) {
                    let dist = calcDist(player_local.position, posicionesAvatar[i].posicion)
                    if (dist < 2.0) {
                        avatar = dist;
                        break;
                    }
                }
    
                // Obtenemos la mas cercana de los 3 tipos, y solo valoramos esa
                let resDistancias = Math.min(juzgados, ayuntamiento, avatar);
                if (resDistancias < 2.0){
                    switch (resDistancias) {
                        case juzgados:
                            if (modopurga) {   // Si el modo purga esta activo, no le dejamos abrir el menu para pagar multas
                                mostrarAviso("danger", 6000, "No disponible durante la purga");
                                return;
                            }
                            if (multas.length <= 0) {
                                mostrarAviso("info", 4000, "No tienes ninguna multa pendiente");
                                return;
                            }
        
                            mp.events.call('mostrar_menu_multas');
                            return;
                        case ayuntamiento:
                            if (modopurga) {   // Si el modo purga esta activo, no le dejamos abrir el menu para pagar multas
                                mostrarAviso("danger", 6000, "No disponible durante la purga");
                                return;
                            }
                            mp.events.call('ayuntamiento:mostrar_menu_general');
                            return;
                        case avatar:
                            if (player_local.getHealth() < 67) {
                                mostrarAviso("danger", 5500, "Tienes muy poca vida para poder hacer esto ahora");
                                return;
                            }
        
                            mp.game.cam.doScreenFadeOut(70);
                            mp.events.callRemote('avatar:iniciar', player_local.position);
                            return;
                        default:
                            break;
                    }
                }
            }

            mp.events.callRemote("tecla_accion");
        } else {
            if (!pesca) { // Para no solapar los CEF
                mp.events.call("pesca:mostrar_pesca");
            }
        }
    } catch (e) {
        logError("TECLA E", e);
    }
});
// TECLA U - Interacción por raycast con jugadores/vehículos y menús JOBS
mp.keys.bind(0x55, false, () => {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;

    const camera = mp.cameras.new("gameplay"); // Camara de gameplay
    let position = camera.getCoord(); // Posición de la camara como Vector3
    let direction = camera.getDirection(); // Dirección a la que está apuntando la cámara como Vector3
    let endPosition = new mp.Vector3((direction.x * 10) + (position.x), (direction.y * 10) + (position.y), (direction.z * 10) + (position.z)); // Punto random dibujado entre posicion y dirección a X distancia

    let raycast = mp.raycasting.testCapsule(position, endPosition, 0.45, player_local, 14); // 4 Colision con peds-players
    // raycast = mp.raycasting.testCapsule(position, endPosition, 0.55, player_local, 6); // Colision con peds-players y vehiculos - DESACTIVADO

    if (raycast) { // Ha tocado algo
        var entidad = raycast.entity;
        if (entidad && entidad != null) { // El resultado es válido
            let tipo = raycast.entity.type;
            if (tipo != undefined && tipo != null) { // ENTIDAD RAGEMP
                switch (tipo) {
                    case 'player': // Acciones rápidas con el jugador apuntado
                        if (calcDist(entidad.position, player_local.position) <= 5.0) {
                            let jug = mp.controladorJugadores._jugadores[entidad.id];
                            if (jug != undefined) {
                                if (jug.conectado && !jug.oculto) {
                                    let id_jug = jug.id_jugador;
                                    let nivel = jug.nivel_pj;
                                    let conocido = typeof jug.conocido !== "undefined" ? jug.conocido : false;
                                    mp.events.call("mostrar_menu_jugador_raycast", id_jug, nivel, conocido);
                                }
                            }
                            return;
                        }
                        break;
                    case 'vehicle': // Acciones rápidas con el vehículo apuntado
                        if (calcDist(entidad.position, player_local.position) <= 5.0) {
                            if (arrastrando) {
                                if (entidad.propiedades) {
                                    if(entidad.propiedades.llave) mp.events.callRemote("metercuerporaycast", entidad.propiedades.llave);
                                    return;
                                }
                            }else{
                                if(entidad.hasVariable("CUERPO")){
                                    if (entidad.getVariable("CUERPO") != null) {
                                        if (setFloodboton(1000, "FB2") == false) return;
                                        mp.events.callRemote("sacarcuerporaycast", entidad.propiedades.llave);
                                        return;
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    if (arrastrando){
        if (setFloodboton(1000, "FB2") == false) return;
        mp.events.callRemote("carrastrar_raycast");
        return;
    }

    if (setFloodboton(1000, "FB2") == false) return;
    mp.events.callRemote("tecla_menu");
});
//Tecla Y
mp.keys.bind(0x59, false, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (campoTiroActivo) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (cantidad_cefs > 0) return;
    if (arrastrado) return;
    if (enmaletero) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;

    // Si estás en un vehículo pero no eres el conductor no te dejamos usar la Y
    if (player_local.vehicle && player_local.vehicle.getPedInSeat(-1) != player_local.handle) return;

    try {
        let propiedad_entrar_vehiculo = null;
        let propiedad_salir_vehiculo = null;

        if(!player_local.vehicle)
        {
            const camera = mp.cameras.new("gameplay"); // Camara de gameplay
            let position = camera.getCoord(); // Posición de la camara como Vector3
            let direction = camera.getDirection(); // Dirección a la que está apuntando la cámara como Vector3
            let farAway = new mp.Vector3((direction.x * 10) + (position.x), (direction.y * 10) + (position.y), (direction.z * 10) + (position.z)); // Punto random dibujado entre posicion y dirección a X distancia

            let raycast = mp.raycasting.testCapsule(position, farAway, 0.6, player_local, 2); // Solo colisiona con vehículos
            if (raycast) {
                var veh_cerca = raycast.entity;
                let huesoCaravana = veh_cerca.getBoneIndexByName('door_pside_r');
                if (veh_cerca && veh_cerca != null && veh_cerca.model == '1876516712' && calcDist(veh_cerca.getWorldPositionOfBone(huesoCaravana), player_local.position) <= 1.0) { // Si el resultado es válido y está a < 5m
                    if (veh_cerca.propiedades && veh_cerca.propiedades.llave) {
                        if ((veh_cerca.getSpeed() * 3.6) > 10)
                        {
                            mostrarAviso("danger", 5000, "No puedes subirte a una caravana que está en marcha")
                        }
                        else
                        {
                            propiedad_entrar_vehiculo = veh_cerca.propiedades.llave;
                            if (setFloodboton(1000, "FB3") == false) return;
                            mp.events.callRemote('propiedades:entrar:vehiculo', propiedad_entrar_vehiculo);
                        }
                        return;
                    }
                }
            }
        }

        let ascensor = 0;
        // Ascensor Hospital PillBox. Garaje Derecha
        if (calcDist(player_local.position, new mp.Vector3(342.22, -585.497, 28.799286)) < 2.0 && player_local.dimension == 0) {
            ascensor = 1;
            mp.events.call("mostrar_ascensor_hospital_pillbox", ascensor);
            return;
        }
        // Ascensor Hospital PillBox. Garaje Izquierda
        if (calcDist(player_local.position, new mp.Vector3(343.5259, -581.7806, 28.799236)) < 2.0 && player_local.dimension == 0) {
            ascensor = 2;
            mp.events.call("mostrar_ascensor_hospital_pillbox", ascensor);
            return;
        }
        // Ascensor Hospital PillBox. Planta Derecha
        if (calcDist(player_local.position, new mp.Vector3(330.3331, -601.1409, 43.284084)) < 2.0 && player_local.dimension == 0) {
            ascensor = 3;
            mp.events.call("mostrar_ascensor_hospital_pillbox", ascensor);
            return;
        }
        // Ascensor Hospital PillBox. Planta Izquierda
        if (calcDist(player_local.position, new mp.Vector3(332.28677, -595.6692, 43.284084)) < 2.0 && player_local.dimension == 0) {
            ascensor = 4;
            mp.events.call("mostrar_ascensor_hospital_pillbox", ascensor);
            return;
        }
        // Ascensor Hospital PillBox. Planta Azotea
        if (calcDist(player_local.position, new mp.Vector3(327.20126, -603.6753, 43.284054)) < 2.0 && player_local.dimension == 0) {
            ascensor = 5;
            mp.events.call("mostrar_ascensor_hospital_pillbox", ascensor);
            return;
        }
        // Ascensor Hospital PillBox. Azotea
        if (calcDist(player_local.position, new mp.Vector3(338.9164, -584.0134, 74.16557)) < 2.0 && player_local.dimension == 0) {
            ascensor = 6;
            mp.events.call("mostrar_ascensor_hospital_pillbox", ascensor);
            return;
        }

        if (calcDist(player_local.position, new mp.Vector3(124.7822, -741.6646, 33.13323)) < 3.0 && player_local.dimension == 31) {
            mp.events.call('mostrar_ascensor_fd');
            return;
        }

        let ascensor_garaje_entrar = false;
        let ascensor_garaje_salir = false;
        for (let i = 0, n = garajes.length; i < n; i++) {
            if (calcDist(player_local.position, garajes[i].ascensor_pos_exterior) < 3.0 && player_local.dimension == garajes[i].ascensor_dimension_exterior) {
                ascensor_garaje_entrar = true;
                break;
            }
            if (calcDist(player_local.position, garajes[i].ascensor_pos_interior) < 3.0 && player_local.dimension == garajes[i].ascensor_dimension_interior) {
                ascensor_garaje_salir = true;
                break;
            }
        }

        if (ascensor_garaje_entrar) {
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('garaje:ascensor:entrar');
            return;
        }
        if (ascensor_garaje_salir) {
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('garaje:ascensor:salir');
            return;
        }

        let negocio_entrar = null;
        let negocio_salir = null;

        for (let i = 0, n = negocios.length; i < n; i++) {
            if (negocios[i].tipo != 20) {
                if (calcDist(player_local.position, negocios[i].puerta) < 3.0 && player_local.dimension == 0) {
                    negocio_entrar = negocios[i].llave;
                    break;
                }
            }

            if (negocios[i].tipo == 19 || negocios[i].tipo == 21 || negocios[i].tipo == 24) {
                if (calcDist(player_local.position, negocios[i].edificio_entrada_pos) <= 5.0 && player_local.dimension == 0) {
                    negocio_entrar = negocios[i].llave;
                    break;
                }
                if (calcDist(player_local.position, negocios[i].edificio_ascensor_pos) <= 5.0 && player_local.dimension == negocios[i].edificio_ascensor_dimension) {
                    negocio_entrar = negocios[i].llave;
                    break;
                }
                if (calcDist(player_local.position, negocios[i].edificio_tejado_pos) <= 2.5 && player_local.dimension == 0) {
                    negocio_entrar = negocios[i].llave;
                    break;
                }
            }

            if (player_local.dimension == negocios[i].llave) {

                if (negocios[i].tipo == 19 || negocios[i].tipo == 21 || negocios[i].tipo == 24) {
                    if (calcDist(player_local.position, negocios[i].edificio_salida_garaje_pos) <= 5.0 && player_local.dimension == negocios[i].edificio_garaje_dimension) {
                        negocio_salir = negocios[i].llave;
                        break;
                    }
                    if (calcDist(player_local.position, negocios[i].edificio_ascensor_pos) <= 5.0 && player_local.dimension == negocios[i].edificio_ascensor_dimension) {
                        negocio_salir = negocios[i].llave;
                        break;
                    }
                }

                if (interiores.hasOwnProperty(negocios[i].interior_id)) {
                    let posicion = new mp.Vector3(parseFloat(interiores[negocios[i].interior_id].posx), parseFloat(interiores[negocios[i].interior_id].posy), parseFloat(interiores[negocios[i].interior_id].posz));
                    if (calcDist(player_local.position, posicion) <= 3.0) {
                        negocio_salir = negocios[i].llave;
                        break;
                    }
                }

                // for (let j = 0, m = interiores.length; j < m; j++) {
                //     let posicion = new mp.Vector3(parseFloat(interiores[j].posx), parseFloat(interiores[j].posy), parseFloat(interiores[j].posz));
                //     if (calcDist(player_local.position, posicion) < 3.0 && interiores[j].id == negocios[i].interior_id) {
                //         negocio_salir = negocios[i].llave;
                //         break;
                //     }
                // }

                if (negocio_salir != null) {
                    break;
                }
            }

        }

        if (negocio_entrar != null) {
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('negocios:entrar', negocio_entrar);
            return;
        }
        if (negocio_salir != null) {
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('negocios:salir', negocio_salir);
            return;
        }

        let propiedad_entrar = null;
        let propiedad_interior = null;
        let propiedad_salir = null;

        let propiedad_garaje_entrar = null;
        let propiedad_garaje_salir = null;


        let radio = player_local.vehicle ? 5.0 : 2.5;

        for (let i = 0, n = propiedades.length; i < n; i++) {
            if (player_local.dimension == 0) {
                if (propiedades[i].tipo < 3) {
                    if (calcDist(player_local.position, propiedades[i].pospuerta) <= radio || calcDist(player_local.position, propiedades[i].huirext) <= radio || calcDist(player_local.position, propiedades[i].posextterraza) <= radio) {
                        propiedad_entrar = propiedades[i].llave;
                        propiedad_interior = propiedades[i].interior_id;
                        break;
                    }
                    if (calcDist(player_local.position, propiedades[i].possalida) <= radio) {
                        propiedad_garaje_entrar = propiedades[i].llave;
                        break;
                    }
                }
            }
            else {
                if (player_local.dimension == propiedades[i].llave) {
                    if (calcDist(player_local.position, propiedades[i].huirint) <= radio || calcDist(player_local.position, propiedades[i].posintterraza) <= radio) {
                        propiedad_salir = propiedades[i].llave;
                        break;
                    }

                    if (garaje_plantas != null && garaje_plantas.length > 0) {
                        for (let j = 0, m = garaje_plantas.length; j < m; j++) {
                            if (calcDist(player_local.position, garaje_plantas[j]) <= radio) {
                                propiedad_salir = propiedades[i].llave;
                                propiedad_interior = propiedades[i].interior_id;
                                break;
                            }
                        }

                        if (propiedad_salir != null) {
                            break;
                        }
                    }

                    if (interiores.hasOwnProperty(propiedades[i].interior_id)) {
                        let posicion = new mp.Vector3(parseFloat(interiores[propiedades[i].interior_id].posx), parseFloat(interiores[propiedades[i].interior_id].posy), parseFloat(interiores[propiedades[i].interior_id].posz));
                        let radioCaravana = radio * 2;
                        if(propiedades[i].tipo < 4){
                            if (calcDist(player_local.position, posicion) <= radio) {
                                propiedad_salir = propiedades[i].llave;
                                break;
                            }
                        } else {
                            if (calcDist(player_local.position, posicion) <= radioCaravana) {
                                propiedad_salir_vehiculo = propiedades[i].llave;
                                break;
                            }
                        }
                    }

                    if (interiores.hasOwnProperty(propiedades[i].interior_garaje_id)) {
                        let posicion = new mp.Vector3(parseFloat(interiores[propiedades[i].interior_garaje_id].posx), parseFloat(interiores[propiedades[i].interior_garaje_id].posy), parseFloat(interiores[propiedades[i].interior_garaje_id].posz));
                        if (calcDist(player_local.position, posicion) <= radio) {
                            propiedad_garaje_salir = propiedades[i].llave;
                            break;
                        }
                    }

                    // for (let j = 0, m = interiores.length; j < m; j++) {
                    //     let posicion = new mp.Vector3(parseFloat(interiores[j].posx), parseFloat(interiores[j].posy), parseFloat(interiores[j].posz));
                    //     if (interiores[j].id == propiedades[i].interior_id) {
                    //         let radioCaravana = radio * 2;
                    //         if(propiedades[i].tipo < 4){
                    //             if (calcDist(player_local.position, posicion) < radio) {
                    //                 propiedad_salir = propiedades[i].llave;
                    //                 break;
                    //             }
                    //         } else {
                    //             if (calcDist(player_local.position, posicion) < radioCaravana) {
                    //                 propiedad_salir_vehiculo = propiedades[i].llave;
                    //                 break;
                    //             }
                    //         }
                    //     }
                    //     if (interiores[j].id == propiedades[i].interior_garaje_id) {
                    //         if (calcDist(player_local.position, posicion) < radio) {
                    //             propiedad_garaje_salir = propiedades[i].llave;
                    //             break;
                    //         }
                    //     }
                    // }

                    if (propiedad_salir != null || propiedad_garaje_salir != null || propiedad_salir_vehiculo != null) {
                        break;
                    }
                }
            }
        }

        if (propiedad_entrar != null) {
            // Switch para los garajes (almacenes) con multiples plantas
            switch (propiedad_interior) {
                case 283: case 299: case 300: case 301: case 302: case 303: case 304: case 305: case 306: case 308: case 309:
                    mp.events.call("menu_plantas_garaje", 3, propiedad_entrar); // Garajes dlc "the contract" 3 plantas
                    return;
                default:
                    break;
            }
            if (setFloodboton(1000, "FB3") == false) return;            
            mp.events.callRemote('propiedades:entrar', propiedad_entrar);
            return;
        }
        if (propiedad_salir != null) {
            // Switch para los garajes (almacenes) con multiples plantas
            switch (propiedad_interior) {
                case 283: case 299: case 300: case 301: case 302: case 303: case 304: case 305: case 306: case 308: case 309:
                    mp.events.callRemote("propiedades:salir:planta", propiedad_salir);
                    return;
                default:
                    break;
            }
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('propiedades:salir', propiedad_salir);
            return;
        }

        if (propiedad_garaje_entrar != null) {
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('propiedades:entrar:garaje', propiedad_garaje_entrar);
            return;
        }
        if (propiedad_garaje_salir != null) {
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('propiedades:salir:garaje', propiedad_garaje_salir);
            return;
        }

        if (propiedad_entrar_vehiculo != null) {
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('propiedades:entrar:vehiculo', propiedad_entrar_vehiculo);
            return;
        }

        if (propiedad_salir_vehiculo != null) {
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('propiedades:salir:vehiculo', propiedad_salir_vehiculo);
            return;
        }

        if (player_local.dimension == 0){
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('jugador:entrar');
        }else{
            if (setFloodboton(1000, "FB3") == false) return;
            mp.events.callRemote('jugador:salir');
        }
        return;
    } catch (e) {
        logError("TECLA Y", e);
    }
});

//Tecla ALT
mp.keys.bind(0x12, false, function () {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;

    if (campoTiroActivo) {
        mostrarAviso("danger", 2000, "No puedes hacer eso en este momento");
        return;
    }
    if (menu_cefId >= 0) {
        cef_menu.cerrarCef(menu_cefId, false);
        menu_cefId = -1;
    } else {
        if (cantidad_cefs > 0) return;
        if (setFloodboton(1000, "FB4") == false) return;
        mostrarmenu();
    }
});
//Tecla M
mp.keys.bind(0x4D, false, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (campoTiroActivo) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    
    if (player_local.vehicle) {
        if (autoPilotActivatedVeh == true || autoPilotActivated == true) {
            mostrarAviso("info", 5000, "No puedes apagar el motor con el piloto activado");
            return;
        }
        if (esBici(player_local.vehicle)) return;

        if (!player_local.vehicle.propiedades || !player_local.vehicle.propiedades.gasolina || player_local.vehicle.propiedades.gasolina <= 1) {
            if (esVehiculoElectrico(player_local.vehicle)) {
                mostrarAviso("danger", 5000, "El vehículo no tiene bateria");
            }
            else {
                mostrarAviso("danger", 5000, "El vehículo no tiene gasolina");
            }
        }
        else {
            if (setFloodboton(1000, "FB5") == false) return;
            mp.events.callRemote("encender_apagar_motor", true);
        }
    }
    else {
        const camera = mp.cameras.new("gameplay"); // Camara de gameplay
        let position = camera.getCoord(); // Posición de la camara como Vector3
        let direction = camera.getDirection(); // Dirección a la que está apuntando la cámara como Vector3
        let farAway = new mp.Vector3((direction.x * 10) + (position.x), (direction.y * 10) + (position.y), (direction.z * 10) + (position.z)); // Punto random dibujado entre posicion y dirección a 3 metros

        let raycast = mp.raycasting.testCapsule(position, farAway, 0.5, player_local.handle, 2); // Solo colisiona con vehículos
        if (raycast) {
            let veh_cerca = raycast.entity;
            // Si el coche existe y estamos cerca de la posicion de colision del raycast
            if (veh_cerca && veh_cerca != null && (calcDist(veh_cerca.position, player_local.position) <= 5.0 || calcDist(player_local.position, raycast.position) <= 3.0)) {
                let puedeUsar = false;
                let clase = veh_cerca.getClass();
                if (clase == 10 || clase == 14 || clase == 15 || clase == 16 || clase == 17 || clase == 19 || clase == 20 || clase == 22) { // Barcos, helicopteros, aviones... Abrimos maletero
                    puedeUsar = true;
                }
                else { // Segun si tiene maletero delante o detras calculamos su posicion
                    let dimCar = mp.game.gameplay.getModelDimensions(veh_cerca.model);
                    if (dimCar != undefined && dimCar != null) {
                        let maleteroDelante = posicionMaletero(veh_cerca.model);
                        let directionVeh = veh_cerca.getForwardVector();
                        let dimCorrecta = { y: 1.0, z: 0.0 }; // Dimension predefinida

                        if (maleteroDelante == true) {
                            dimCorrecta.y = Math.abs(dimCar.max.y) - 0.4;
                            dimCorrecta.z = Math.abs(dimCar.max.z) / 3;
                            let posMaletero = new mp.Vector3((directionVeh.x * dimCorrecta.y) + (veh_cerca.position.x), (directionVeh.y * dimCorrecta.y) + (veh_cerca.position.y), (directionVeh.z * dimCorrecta.y) + (veh_cerca.position.z + dimCorrecta.z));

                            // Si estamos cerca del maletero
                            if (calcDist(player_local.position, posMaletero) <= 1.8) {
                                puedeUsar = true;
                            }
                            else {
                                mostrarAviso("danger", 4000, "No estás cerca del maletero");
                            }
                        }
                        else {
                            dimCorrecta.y = Math.abs(dimCar.min.y) - 0.4;
                            dimCorrecta.z = Math.abs(dimCar.max.z) / 3;
                            let directionAux = new mp.Vector3(directionVeh.x * Math.cos(3.14159) - directionVeh.y * Math.sin(3.14159), directionVeh.x * Math.sin(3.14159) + directionVeh.y * Math.cos(3.14159), directionVeh.z);
                            let posMaletero = new mp.Vector3((directionAux.x * dimCorrecta.y) + (veh_cerca.position.x), (directionAux.y * dimCorrecta.y) + (veh_cerca.position.y), (directionAux.z * dimCorrecta.y) + (veh_cerca.position.z + dimCorrecta.z));

                            // Si estamos cerca del maletero
                            if (calcDist(player_local.position, posMaletero) <= 1.8) {
                                puedeUsar = true;
                            }
                            else{
                                mostrarAviso("danger", 4000, "No estás cerca del maletero");
                            }
                        }
                    }
                }

                if (puedeUsar == true) {
                    let llave_veh = null;
                    if (veh_cerca.propiedades && veh_cerca.propiedades.llave) {
                        llave_veh = veh_cerca.propiedades.llave;
                    }

                    if (llave_veh != null) {
                        if (setFloodboton(1000, "FB73") == false) return;
                        mp.events.callRemote("mostrar_maletero", true, llave_veh);
                        return;
                    }
                }
            }
        }
    }
});

//Tecla B
mp.keys.bind(0x42, false, function () {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (campoTiroActivo) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    let indexPuertas = [];
    for (let i = 0, n = puertas.length; i < n; i++) {
        for (let j = 0, m = puertas[i].objetos.length; j < m; j++) {
            let pos = null;
            if (puertas[i].posx != 0 && puertas[i].posy != 0 && puertas[i].posz != 0) pos = new mp.Vector3(parseFloat(puertas[i].posx), parseFloat(puertas[i].posy), parseFloat(puertas[i].posz));
            else pos = new mp.Vector3(parseFloat(puertas[i].objetos[j].posx), parseFloat(puertas[i].objetos[j].posy), parseFloat(puertas[i].objetos[j].posz));
            if (calcDist(pos, player_local.position) < puertas[i].distancia) {
                let obj = {
                    indexp: i,
                    pos: pos
                }
                indexPuertas.push(obj);
            }
        }
    }
    let dist_ult = 15;
    let index_puerta_cercano = -1;
    for (let i = 0; i < indexPuertas.length; i++) {
        let dist_nueva = calcDist(indexPuertas[i].pos, player_local.position)
        if (dist_nueva < dist_ult) {
            dist_ult = dist_nueva;
            index_puerta_cercano = indexPuertas[i].indexp;
        }
    }
    if (index_puerta_cercano > -1) {
        let tienePermisos = false;
        let jugador = mp.controladorJugadores._jugadores[player_local.id];
        let ic = index_puerta_cercano;

        if (adminservicio) {
            mp.gui.chat.push("Estás en la puerta número: "+(ic + 1));
            tienePermisos = true;
        }

        if (!tienePermisos) {
            for (let k = 0; k < puertas[ic].trabajos.length; k++) {
                if ((jugador.trabajos).includes(parseInt(puertas[ic].trabajos[k]))) {
                    tienePermisos = true;
                }
            }
        }

        if (!tienePermisos) {
            for(let k = 0; k < puertas[ic].negocios.length; k++){
                if(negociosJug.includes(parseInt(puertas[ic].negocios[k]))){
                    tienePermisos = true;
                }
            }
        }

        if (!tienePermisos) {
            for(let k = 0; k < puertas[ic].propiedades.length; k++){
                if(propiedadesJug.includes(parseInt(puertas[ic].propiedades[k]))){
                    tienePermisos = true;
                }
            }
        }

        if (!tienePermisos) {
            for (let k = 0; k < puertas[ic].facciones.length; k++) {
                if (faccion == parseInt(puertas[ic].facciones[k])) {
                    tienePermisos = true;
                }
            }
        }

        if (!tienePermisos) {
            for (let k = 0; k < puertas[ic].personajes.length; k++) {
                if (personaje_id == parseInt(puertas[ic].personajes[k])) {
                    tienePermisos = true;
                }
            }
        }

        if (tienePermisos) {
            if (puertas[ic].locked) {
                puertas[ic].locked = false;
                for (let k = 0, o = puertas[ic].objetos.length; k < o; k++) {
                    let pos2 = new mp.Vector3(parseFloat(puertas[ic].objetos[k].posx), parseFloat(puertas[ic].objetos[k].posy), parseFloat(puertas[ic].objetos[k].posz));
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey(puertas[ic].objetos[k].modelo), pos2.x, pos2.y, pos2.z, puertas[ic].locked, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(puertas[ic].objetos[k].modelo), pos2.x, pos2.y, pos2.z, puertas[ic].locked, 0.0, false);
                    if (puertas[ic].timer > 0) {
                        crearTimeout(() => {
                            puertas[ic].locked = true;
                            mp.game.object.doorControl(mp.game.gameplay.getHashKey(puertas[ic].objetos[k].modelo), pos2.x, pos2.y, pos2.z, true, 0.0, 50.0, 0.0);
                            mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(puertas[ic].objetos[k].modelo), pos2.x, pos2.y, pos2.z, true, 0.0, false);
                        }, puertas[ic].timer);
                    }
                }
                if (puertas[ic].timer > 0) {
                    mostrarAviso("success", 5000, "Puerta desbloqueada, se cerrará en " + parseInt(puertas[ic].timer / 1000) + " segundos");
                    let nearbyPlayers = [];

                    mp.players.forEachInStreamRange((player) => {
                        if (player != player_local)
                            nearbyPlayers.push(player.remoteId);
                    });

                    mp.events.callRemote("puertas:abrir:en_rango", JSON.stringify(nearbyPlayers), false, puertas[ic].id);
                    return;
                } else {
                    mostrarAviso("success", 5000, "Puerta desbloqueada");
                    mp.events.callRemote("puertas:abrir_cerrar", false, puertas[ic].id);
                    return;
                }
            } else {
                puertas[ic].locked = true;
                mostrarAviso("success", 5000, "Puerta bloqueada");
                if (puertas[ic].timer == 0) {
                    mp.events.callRemote("puertas:abrir_cerrar", true, puertas[ic].id);
                }
                for (let k = 0, o = puertas[ic].objetos.length; k < o; k++) {
                    let pos2 = new mp.Vector3(parseFloat(puertas[ic].objetos[k].posx), parseFloat(puertas[ic].objetos[k].posy), parseFloat(puertas[ic].objetos[k].posz));
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey(puertas[ic].objetos[k].modelo), pos2.x, pos2.y, pos2.z, true, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(puertas[ic].objetos[k].modelo), pos2.x, pos2.y, pos2.z, true, 0.0, false);
                }
                return;
            }
        }
    }
    
    if (player_local.vehicle) { // Montado en coche mandamos evento con su llave
        let radio = 5.0;
        let vehiculo = player_local.vehicle;
        let llave_veh = null;
        if ((vehiculo.getSpeed() * 3.6) < 10) { // Velocidad < 10kmh -> Comprobamos cercanía a propiedades/negocios
            let negocio_llave = null;
            for (let i = 0, n = negocios.length; i < n; i++) {
                if (negocios[i].tipo != 19 && negocios[i].tipo != 20 && negocios[i].tipo != 21) {
                    if (player_local.dimension == 0) {
                        if (calcDist(player_local.position, negocios[i].puerta) <= radio) {
                            negocio_llave = negocios[i].llave;
                            break;
                        }
                    }
                    else {
                        if (player_local.dimension == negocios[i].llave) {
                            if (interiores.hasOwnProperty(negocios[i].interior_id)) {
                                let posicion = new mp.Vector3(parseFloat(interiores[negocios[i].interior_id].posx), parseFloat(interiores[negocios[i].interior_id].posy), parseFloat(interiores[negocios[i].interior_id].posz));
                                if (calcDist(player_local.position, posicion) <= radio) {
                                    negocio_llave = negocios[i].llave;
                                    break;
                                }
                            }
                            // for (let j = 0, m = interiores.length; j < m; j++) {
                            //     if (interiores[j].id == negocios[i].interior_id) {
                            //         let posicion = new mp.Vector3(parseFloat(interiores[j].posx), parseFloat(interiores[j].posy), parseFloat(interiores[j].posz));
                            //         if (calcDist(player_local.position, posicion) < radio) {
                            //             negocio_llave = negocios[i].llave;
                            //             break;
                            //         }
                            //     }
                            // }

                            if (negocio_llave != null) break;
                        }
                    }
                }
            }

            if (negocio_llave != null) {
                if (setFloodboton(1000, "FB6") == false) return;
                mp.events.callRemote("abrir_cerrar", negocio_llave, false); // llave, esPropiedad (false)
                return;
            }

            let propiedad_llave = null;
            for (let i = 0, n = propiedades.length; i < n; i++) {
                if (player_local.dimension == 0) {
                    if (propiedades[i].tipo < 3) {
                        if (calcDist(player_local.position, propiedades[i].pospuerta) <= radio || calcDist(player_local.position, propiedades[i].possalida) <= radio) {
                            propiedad_llave = propiedades[i].llave;
                            break;
                        }
                    }
                }
                else {
                    if (player_local.dimension == propiedades[i].llave) {
                        if (interiores.hasOwnProperty(propiedades[i].interior_id)) {
                            let posicion = new mp.Vector3(parseFloat(interiores[propiedades[i].interior_id].posx), parseFloat(interiores[propiedades[i].interior_id].posy), parseFloat(interiores[propiedades[i].interior_id].posz));
                            if (calcDist(player_local.position, posicion) <= radio) {
                                propiedad_llave = propiedades[i].llave;
                                break;
                            }
                        }

                        if (interiores.hasOwnProperty(propiedades[i].interior_garaje_id)) {
                            let posicion = new mp.Vector3(parseFloat(interiores[propiedades[i].interior_garaje_id].posx), parseFloat(interiores[propiedades[i].interior_garaje_id].posy), parseFloat(interiores[propiedades[i].interior_garaje_id].posz));
                            if (calcDist(player_local.position, posicion) <= radio) {
                                propiedad_llave = propiedades[i].llave;
                                break;
                            }
                        }
                        // if (interiores[j].id == propiedades[i].interior_id || interiores[j].id == propiedades[i].interior_garaje_id) {
                        //     let posicion = new mp.Vector3(parseFloat(interiores[j].posx), parseFloat(interiores[j].posy), parseFloat(interiores[j].posz));
                        //     if (calcDist(player_local.position, posicion) < radio) {
                        //         propiedad_llave = propiedades[i].llave;
                        //         break;
                        //     }
                        // }
                        // for (let j = 0, m = interiores.length; j < m; j++) {
                        //     if (interiores[j].id == propiedades[i].interior_id || interiores[j].id == propiedades[i].interior_garaje_id) {
                        //         let posicion = new mp.Vector3(parseFloat(interiores[j].posx), parseFloat(interiores[j].posy), parseFloat(interiores[j].posz));
                        //         if (calcDist(player_local.position, posicion) < radio) {
                        //             propiedad_llave = propiedades[i].llave;
                        //             break;
                        //         }
                        //     }
                        // }

                        if (propiedad_llave != null) break;
                    }
                }
            }

            if (propiedad_llave != null) {
                if (setFloodboton(1000, "FB6") == false) return;
                mp.events.callRemote("abrir_cerrar", propiedad_llave, true); // llave, esPropiedad (true)
                return;
            }
        }

        // Si va a más de 10kmh o no está en propiedad/negocio abrimos o cerramos el vehículo
        if (vehiculo.propiedades && vehiculo.propiedades.llave) {
            llave_veh = vehiculo.propiedades.llave;
        }

        if (llave_veh != null) {
            if (setFloodboton(1000, "FB6") == false) return;
            mp.events.callRemote("abrir_cerrar_vehiculo", llave_veh);
        }
        else {
            mostrarAviso("danger", 5000, "El vehículo no existe");
        }
    } else { // A pie comprobamos si tiene cerca un coche
        const camera = mp.cameras.new("gameplay"); // Camara de gameplay
        let position = camera.getCoord(); // Posición de la camara como Vector3
        let direction = camera.getDirection(); // Dirección a la que está apuntando la cámara como Vector3
        let farAway = new mp.Vector3((direction.x * 10) + (position.x), (direction.y * 10) + (position.y), (direction.z * 10) + (position.z)); // Punto random dibujado entre posicion y dirección a X distancia

        let raycast = mp.raycasting.testCapsule(position, farAway, 0.6, player_local, 2); // Solo colisiona con vehículos

        if (raycast) {
            var veh_cerca = raycast.entity;
            if (veh_cerca && veh_cerca != null && calcDist(veh_cerca.position, player_local.position) <= 5.0) { // Si el resultado es válido
                let llave_veh = null;
                if (veh_cerca.propiedades && veh_cerca.propiedades.llave) {
                    llave_veh = veh_cerca.propiedades.llave;
                }

                if (llave_veh != null) {
                    if (setFloodboton(1000, "FB6") == false) return;
                    mp.events.callRemote("abrir_cerrar_vehiculo", llave_veh);
                }
                else {
                    mostrarAviso("danger", 5000, "El vehículo no existe");
                }
                return;
            }
        }

        let radio = 2.5;

        // No apunta a ningún coche cercano -> comprobamos si hay negocio/propiedad cerca y en ese caso mandamos evento para abrir/cerrar
        let negocio_llave = null;
        for (let i = 0, n = negocios.length; i < n; i++) {
            if (negocios[i].tipo != 19 && negocios[i].tipo != 20 && negocios[i].tipo != 21) {
                if (player_local.dimension == 0) {
                    if (calcDist(player_local.position, negocios[i].puerta) <= radio) {
                        negocio_llave = negocios[i].llave;
                        break;
                    }
                }
                else {
                    if (player_local.dimension == negocios[i].llave) {
                        if (interiores.hasOwnProperty(negocios[i].interior_id)) {
                            let posicion = new mp.Vector3(parseFloat(interiores[negocios[i].interior_id].posx), parseFloat(interiores[negocios[i].interior_id].posy), parseFloat(interiores[negocios[i].interior_id].posz));
                            if (calcDist(player_local.position, posicion) <= radio) {
                                negocio_llave = negocios[i].llave;
                                break;
                            }
                        }
                        // for (let j = 0, m = interiores.length; j < m; j++) {
                        //     if (interiores[j].id == negocios[i].interior_id) {
                        //         let posicion = new mp.Vector3(parseFloat(interiores[j].posx), parseFloat(interiores[j].posy), parseFloat(interiores[j].posz));
                        //         if (calcDist(player_local.position, posicion) < radio) {
                        //             negocio_llave = negocios[i].llave;
                        //             break;
                        //         }
                        //     }
                        // }

                        if (negocio_llave != null) break;
                    }
                }
            }
        }

        if (negocio_llave != null) {
            if (setFloodboton(1000, "FB6") == false) return;
            mp.events.callRemote("abrir_cerrar", negocio_llave, false); // llave, esPropiedad (false)
            return;
        }

        let propiedad_llave = null;
        for (let i = 0, n = propiedades.length; i < n; i++) {
            if (player_local.dimension == 0) {
                if (propiedades[i].tipo < 3) {
                    if (calcDist(player_local.position, propiedades[i].pospuerta) <= radio || calcDist(player_local.position, propiedades[i].possalida) <= radio) {
                        propiedad_llave = propiedades[i].llave;
                        break;
                    }
                }
            }
            else {
                if (player_local.dimension == propiedades[i].llave) {
                    if (interiores.hasOwnProperty(propiedades[i].interior_id)) {
                        let posicion = new mp.Vector3(parseFloat(interiores[propiedades[i].interior_id].posx), parseFloat(interiores[propiedades[i].interior_id].posy), parseFloat(interiores[propiedades[i].interior_id].posz));
                        if (calcDist(player_local.position, posicion) <= radio) {
                            propiedad_llave = propiedades[i].llave;
                            break;
                        }
                    }

                    if (interiores.hasOwnProperty(propiedades[i].interior_garaje_id)) {
                        let posicion = new mp.Vector3(parseFloat(interiores[propiedades[i].interior_garaje_id].posx), parseFloat(interiores[propiedades[i].interior_garaje_id].posy), parseFloat(interiores[propiedades[i].interior_garaje_id].posz));
                        if (calcDist(player_local.position, posicion) <= radio) {
                            propiedad_llave = propiedades[i].llave;
                            break;
                        }
                    }
                    // for (let j = 0, m = interiores.length; j < m; j++) {
                    //     if (interiores[j].id == propiedades[i].interior_id || interiores[j].id == propiedades[i].interior_garaje_id) {
                    //         let posicion = new mp.Vector3(parseFloat(interiores[j].posx), parseFloat(interiores[j].posy), parseFloat(interiores[j].posz));
                    //         if (calcDist(player_local.position, posicion) <radio) {
                    //             propiedad_llave = propiedades[i].llave;
                    //             break;
                    //         }
                    //     }
                    // }

                    if (propiedad_llave != null) break;
                }
            }
        }

        if (propiedad_llave != null) {
            if (setFloodboton(1000, "FB6") == false) return;
            mp.events.callRemote("abrir_cerrar", propiedad_llave, true); // llave, esPropiedad (true)
            return;
        }
    }
});
//Tecla I 
mp.keys.bind(0x49, false, function () {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;
    if (cantidad_cefs > 0) return;
    
    if (campoTiroActivo) {
        mostrarAviso("danger", 2000, "No puedes hacer eso en este momento");
        return;
    }

    // if (player_local.vehicle)
    // {
    //     if (player_local.vehicle.getPedInSeat(-1) == player_local.handle || player_local.vehicle.getPedInSeat(0) == player_local.handle)
    //     {
    //         let llave_guantera = player_local.vehicle.propiedades.llave;
    //         if (setFloodboton(1000, "FB7") == false) return;
    //         mp.events.callRemote("mostrar_guantera", llave_guantera);
    //         return;
    //     }
    // }

    // Si no esta subido en un vehiculo comprobamos: taquillas, contenedores, inventario maletero e inventario propiedad
    if (!player_local.vehicle) {
        for (let i = 0; i < posTaquillas.length; i++) {
            if (calcDist(player_local.position, posTaquillas[i].pos) < 3) {
                if (setFloodboton(1000, "FB7") == false) return;
                mp.events.callRemote("taquillas:mostrar", posTaquillas[i].tipo);
                return;
            }
        }

        let positionParaContenedores = player_local.getCoords(true);
        let directionAuxParaContenedores = player_local.getForwardVector();
        let endPositionParaContenedores = new mp.Vector3((directionAuxParaContenedores.x * 1) + (positionParaContenedores.x), (directionAuxParaContenedores.y * 1) + (positionParaContenedores.y), (directionAuxParaContenedores.z * 1) + (positionParaContenedores.z));

        let raycastParaContenedores = mp.raycasting.testCapsule(positionParaContenedores, endPositionParaContenedores, 0.1, player_local, 240); // Colision con objetos
        if (raycastParaContenedores) // Ha tocado algo
        {
            let entidad = raycastParaContenedores.entity;
            if (entidad && entidad != null) // El resultado es válido
            {
                let tipo = entidad.type;
                let modelo_contenedor = null;

                if (tipo != undefined && tipo != null) // ENTIDAD RAGEMP
                {
                    if (tipo == "object") {
                        switch (entidad.model) {
                            case 684586828:
                                modelo_contenedor = "prop_cs_dumpster_01a";
                                break;
                            case 218085040:
                                modelo_contenedor = "prop_dumpster_01a";
                                break;
                            case 666561306:
                                modelo_contenedor = "prop_dumpster_02a";
                                break;
                            case 4236481708:
                                modelo_contenedor = "prop_dumpster_02b";
                                break;
                            case 4088277111:
                                modelo_contenedor = "prop_dumpster_3a";
                                break;
                            case 1511880420:
                                modelo_contenedor = "prop_dumpster_4a";
                                break;
                            case 682791951:
                                modelo_contenedor = "prop_dumpster_4b";
                                break;
                            case 577432224:
                                modelo_contenedor = "p_dumpster_t";
                                break;
                            default:
                                break;
                        }

                        if (modelo_contenedor != null) {
                            if (setFloodboton(1000, "FB7") == false) return;
                            mp.events.callRemote("contenedores:mostrar", modelo_contenedor);
                            return;
                        }
                    }
                }
                else // ENTIDAD GTAV (o peds creados con mp.peds)
                {
                    if (mp.game.invoke("0x7239B21A38F536BA", entidad)) { // Si existe la entidad seguimos
                        let hashModelNativa = mp.game.invoke("0x9F47B058362C84B5", entidad); // Obtenemos el hash del modelo resultado de la colisión

                        switch (hashModelNativa) {
                            case 684586828:
                                modelo_contenedor = "prop_cs_dumpster_01a";
                                break;
                            case 218085040:
                                modelo_contenedor = "prop_dumpster_01a";
                                break;
                            case 666561306:
                                modelo_contenedor = "prop_dumpster_02a";
                                break;
                            case -58485588:
                                modelo_contenedor = "prop_dumpster_02b";
                                break;
                            case -206690185:
                                modelo_contenedor = "prop_dumpster_3a";
                                break;
                            case 1511880420:
                                modelo_contenedor = "prop_dumpster_4a";
                                break;
                            case 682791951:
                                modelo_contenedor = "prop_dumpster_4b";
                                break;
                            case 577432224:
                                modelo_contenedor = "p_dumpster_t";
                                break;
                            default:
                                break;
                        }

                        if (modelo_contenedor != null) {
                            if (setFloodboton(1000, "FB7") == false) return;
                            mp.events.callRemote("contenedores:mostrar", modelo_contenedor);
                            return;
                        }
                    }
                }
            }
        }

        if (player_local.dimension != 0) {
            let propiedad_armario = null;
            for (let i = 0, n = propiedades.length; i < n; i++) {
                if (player_local.dimension == propiedades[i].llave) {
                    if (calcDist(player_local.position, propiedades[i].inventario) < 2.5)
                        propiedad_armario = propiedades[i].llave;
                    break;
                }
            }

            if (propiedad_armario != null) {
                if (setFloodboton(1000, "FB7") == false) return;
                mp.events.callRemote('propiedades:armario', propiedad_armario, true);
                return;
            }
        }
    }

    if (setFloodboton(1000, "FB7") == false) return;
    mp.events.call("mostrarinventario");
});

// Tecla - GUION
mp.keys.bind(0xBD, true, () => {
    if (menuAbierto) return;
    if (blockGuion) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (campoTiroActivo) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;

    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});

//Tecla O - Menú jugador by Zeeky
mp.keys.bind(0x4F, true, function () {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (campoTiroActivo) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;

    mp.events.call("jugador:mostrar_menu");
});

//Tecla J
mp.keys.bind(0x4A, false, function () {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (campoTiroActivo) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (player_local.vehicle) {
        if (player_local.vehicle && player_local.vehicle.getPedInSeat(-1) == player_local.handle) {
            if (player_local.vehicle.model == mp.game.joaat("cargobob") || player_local.vehicle.model == mp.game.joaat("cargobob2") || player_local.vehicle.model == mp.game.joaat("cargobob3") || player_local.vehicle.model == mp.game.joaat("cargobob4")) {
                if (setFloodboton(1000, "FB10") == false) return;

                if (player_local.vehicle.isCargobobHookActive()) {
                    mp.events.callRemote("cargobob_gancho", false);
                }
                else {
                    mp.events.callRemote("cargobob_gancho", true);
                }
                return;
            }
            var clase = player_local.vehicle.getClass();
            if (clase == 18) {
                if (setFloodboton(1000, "FB11") == false) return;

                if (player_local.vehicle.isSirenSoundOn()) {
                    mostrarAviso("success", 5000, "<span style='color:red;'>Desactivadas</span> sirenas acusticas");
                    mp.events.callRemote("sonido_sirena", true);
                    player_local.setEnableWeaponBlocking(true);
                }
                else {
                    mostrarAviso("success", 5000, "<span style='color:green;'>Activadas</span> sirenas acusticas");
                    mp.events.callRemote("sonido_sirena", false);
                    player_local.setEnableWeaponBlocking(false);
                }
            }
        }
    }
});

//Tecla K 
mp.keys.bind(0x4B, false, function () {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (jugadorEscopeteado) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (navegador != null) return;
    if (pointing.active) // Si estamos señalando, no cancelamos animación
        return;
    if (pesca_iniciada) return; // Durante la pesca no permitimos abrir el telefono
    if (cantidad_cefs > 0) return;
    if (avatarEnProceso) return;
    //if (montado) return;
    if (temporero_enEscenario) return;
    if (federal_enTrabajoJardinero) return;
    if (federal_enTrabajoCartero) return;
    if (juego != null) return;

    if (player_local.vehicle) {
        if (menu_vehiculo != null) return;
        mp.events.call("mostrar_menu_coche");
    } else {
        if (player_local.getHealth() > 10 && montado == false && !enmaletero && !arrastrado && !arrastrando) {
            if (player_local.getVariable("ANIMACION") != null) {
                if (setFloodboton(1000, "FB12") == false) return;
                player_local.clearTasks();
                mp.events.callRemote("parar_animacion");
                mp.events.call("minero:parar_anim");
            } else {
                player_local.clearTasks();
            }
        }
    }
});

//Tecla F5
mp.keys.bind(0x74, true, function () {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (campoTiroActivo) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;

    if (setFloodboton(1000, "FB72") == false) return;

    mp.events.call("mostrar_menu_f5");
});
//Tecla F7
mp.keys.bind(0x76, true, function () {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (campoTiroActivo) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return; // sistemas/animupdate/animupdate.js

    if (hudOculto) {
        if(tipoMapa != 2) mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);
        // if (opciones.variables.hambre) {
        //     mostrar_hambre();
        // }
        //hudOculto = false;
    }
    else {
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);
        // if (opciones.variables.hambre) {
        //     ocultar_hambre();
        // }
        //hudOculto = true;
    }

    mp.events.call("hud:estado_hud");
});

mp.events.add('estado_interfaz', (ignoreHud = false) => {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (campoTiroActivo) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (setFloodboton(1000, "FB15") == false) return;

    if (hudOculto) {
        if(tipoMapa != 2) mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);
        // if (opciones.variables.hambre) {
        //     mostrar_hambre();
        // }
        //hudOculto = false;
    }
    else {
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);
        // if (opciones.variables.hambre) {
        //     ocultar_hambre();
        // }
        //hudOculto = true;
    }

    if (!ignoreHud)
        mp.events.call("hud:estado_hud");
});

mp.events.add('ocultar_minimap', () => {
    mp.game.ui.displayRadar(false);
});

mp.events.add('mostrar_minimap', () => {
    if(tipoMapa != 2) mp.game.ui.displayRadar(true);
});

mp.events.add('ocultar_chat', () => {
    mp.gui.chat.show(false);
});
mp.events.add('ocultar_hud', () => {
    // mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    // mp.gui.chat.show(false);
    // if (opciones.variables.hambre) {
    //     ocultar_hambre();
    // }
    hudOculto = true;
});

//Tecla F8
mp.keys.bind(0x77, true, function () {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;

    var momentoActual = new Date();
    var dia = "" + momentoActual.getDate();
    dia.padStart(2, "0");
    var mes = momentoActual.getMonth();
    var month = new Array();
    month[0] = "01";
    month[1] = "02";
    month[2] = "03";
    month[3] = "04";
    month[4] = "05";
    month[5] = "06";
    month[6] = "07";
    month[7] = "08";
    month[8] = "09";
    month[9] = "10";
    month[10] = "11";
    month[11] = "12";
    var ano = momentoActual.getFullYear();
    var hora = momentoActual.getHours();
    var minuto = momentoActual.getMinutes();
    var segundo = momentoActual.getSeconds();
    mostrarAviso("success", 5000, "Captura de pantalla guardada como: captura-" + dia + "-" + month[mes] + "-" + ano + "_" + hora + "-" + minuto + "-" + segundo + ".png");
    mp.gui.takeScreenshot("captura-" + dia + "-" + month[mes] + "-" + ano + "_" + hora + "-" + minuto + "-" + segundo + ".png", 1, 100, 0);
});

// Tecla X - Recoger objeto suelo/Tirar objeto en mano
mp.keys.bind(0x58, true, async () => {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;
    if (player_local.vehicle) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    
    try {
        if (mp.players.local.getHealth() <= 10) return;
        if (!tieneObjetoMano()) {
            if (Object.keys(objetosSuelo).length <= 0 && Object.keys(objetosMisiones).length == 0) return;

            let dist_ult = 1.6; // Distancia max <= 1.5, valor reasignado cada vez que un objeto está más cerca que el anterior
            let id_obj_mas_cercano = null; // ID del objeto más cercano o null si no hay ningún objeto a menos de 1.6
            for (let id in objetosSuelo) {
                if (objetosSuelo[id].dimension == player_local.dimension) {
                    let dist_nueva = calcDist(player_local.position, objetosSuelo[id].pos);
                    if (dist_nueva < dist_ult) {
                        id_obj_mas_cercano = id;
                        dist_ult = dist_nueva;
                    }
                }
            }

            let esObjetoDeMisiones = false;
            if (id_obj_mas_cercano == null) {
                dist_ult = 1.6;
                for (let accionId in objetosMisiones) { // sistemas/misiones/misiones.js
                    const o = objetosMisiones[accionId];
                    if (!o.o || o.o.handle === 0) continue;
                    if (o.o.dimension == player_local.dimension) {
                        let dist = calcDist(player_local.position, o.o.position);
                        if (dist < dist_ult) {
                            esObjetoDeMisiones = true;
                            id_obj_mas_cercano = accionId;
                            dist_ult = dist;
                        }
                    }
                }
            }

            if (id_obj_mas_cercano != null) {
                if (setFloodboton(700, "FB17") == false) return;

                // Animacion de recoger el objeto
                if (!mp.game.streaming.hasAnimDictLoaded("pickup_object")) {
                    for (mp.game.streaming.requestAnimDict("pickup_object"); !mp.game.streaming.hasAnimDictLoaded("pickup_object");) await mp.game.waitAsync(0);
                }
                player_local.taskPlayAnim("pickup_object", "pickup_low", 8.0, 17, -1, 0, 0.0, false, false, false);

                if (!esObjetoDeMisiones) { // Si no es un objeto de misiones es un objeto creado en el servidor
                    let o = mp.objects.at(id_obj_mas_cercano);
                    let sqlid = objetosSuelo[id_obj_mas_cercano].sqlid;
                    delete objetosSuelo[id_obj_mas_cercano];

                    crearTimeout(() => {
                        let territorioEnemigo = false;
                        if (territorioID != -1 && territorioID != faccion) territorioEnemigo = true;
                        mp.events.callRemote("recoger_tecla", sqlid, territorioEnemigo);
                        player_local.stopAnimTask("pickup_object", "pickup_low", 1.0);
                    }, 550);
                    if (o && o.labelSuelo) {
                        if (mp.labels.exists(o.labelSuelo)) {
                            o.labelSuelo.destroy();
                            o.labelSuelo = null;
                        }
                    }
                } else { // Si es un objeto de misiones, lo borramos al recogerlo y notificamos al servidor
                    // id_obj_mas_cercano = accionId
                    // const o = objetosMisiones[id_obj_mas_cercano];
                    mp.events.callRemote("jugador:recogerObjetoMision", id_obj_mas_cercano);
                    // mp.events.call("misiones:objetos:borrar", id_obj_mas_cercano);

                    // if (o) {
                    //     if (o.o && mp.objects.exists(o.o)) {
                    //         o.o.destroy();
                    //         o.o = null;
                    //     }

                    //     if (o.label && mp.labels.exists(o.label)) {
                    //         o.label.destroy();
                    //         o.label = null;
                    //     }
                    // }
                }
            }
        } else {
            let objeto_mano = obtenerObjetoMano();

            if (armaActiva.id == objeto_mano.id){
                mostrarAviso("danger", 5000, "No puedes tirar el arma, guardala primero");
                return;
            } 

            let modelo = objeto_mano.modeloTirar; // Modelo del objeto      

            // Posicion y rotacion por defecto
            let position = player_local.getCoords(true); // .position no, si no se mueve tras conectar .position = (0,0,0)
            let posObj = new mp.Vector3(position.x, position.y, position.z - 0.9);
            let rotObj = new mp.Vector3(0.0, 0.0, 0.0);

            // Si el modelo existe creamos el objeto temporal y realizamos las comprobaciones, en caso contrario mandamos la posicion y rotacion por defecto
            if (modelo && modelo != -1 && modelo != 0) {
                if (setFloodboton(700, "FB17") == false) return;

                let objeto = null; // Objeto temporal

                // Calculamos posicion "aleatoria" detras del jugador
                let posDetras = new mp.Vector3(position.x - 5.0, position.y - 5.0, position.z - 5.0);

                // Cargamos las colisiones del modelo en caso de no tenerlas ya cargadas
                if (!mp.game.streaming.hasModelLoaded(modelo)) {
                    mp.game.streaming.requestModel(modelo);
                    let count = 0;
                    while (!mp.game.streaming.hasModelLoaded(modelo)) {
                        count++;
                        if (count >= 40) {
                            break;
                        }
                        await mp.game.waitAsync(10);
                    }
                }

                // Creamos el objeto temporal con alpha 0
                objeto = mp.objects.new(modelo, posDetras,
                    {
                        rotation: rotObj,
                        alpha: 0,
                        dimension: player_local.dimension
                    });

                // Intervalo de 5ms, una vez el objeto existe realiza los calculos, en caso contrario a la vuelta 8 corta el intervalo y manda valores por defecto
                let counter = 0;
                let intervalo_objeto = setInterval(() => {
                    if (objeto && mp.objects.exists(objeto) && typeof objeto.handle === "number" && objeto.handle != 0) {
                        clearInterval(intervalo_objeto);
                        intervalo_objeto = null;

                        position = player_local.getCoords(true);
                        position.z = position.z + 0.7; // Para permitir dejar objetos por encima de la cintura sin sobrepasar la altura del personaje
                        let direction = player_local.getForwardVector();

                        let distTirar = 0.5;
                        if (player_local.hasVariable("ANIMACION")) {
                            let animTirar = player_local.getVariable("ANIMACION");
                            if (animTirar != null && animTirar[0] == 0 && animTirar[1] == "idle" && animTirar[2] == "anim@heists@box_carry@") {
                                distTirar = 0.8;
                            }
                        }

                        var posEnfrente = new mp.Vector3((direction.x * distTirar) + (position.x), (direction.y * distTirar) + (position.y), (direction.z * distTirar) + (position.z));

                        // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                        let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                        if (raycastPared != undefined) {
                            mostrarAviso("danger", 4000, "No hay espacio suficiente para tirar el objeto");

                            limpiarHandleRaycast(raycastPared.entity);
                            return;
                        }

                        // Como tiene espacio para tirar objeto le damos margen para calcular la altura final del objeto
                        posEnfrente.z = posEnfrente.z + 0.2;

                        // Raycast desde la posicion frente al jugador hasta la misma posicion con -1000 de altura
                        var raycast = mp.raycasting.testPointToPoint(posEnfrente, new mp.Vector3(posEnfrente.x, posEnfrente.y, posEnfrente.z - 1000.0), objeto, 19); // Colision con mapa, vehiculos y objetos
                        let tipoColision = -1;
                        let posColision = null;
                        if (raycast) { // Ha tocado algo
                            objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                            let entidad = raycast.entity;
                            if (entidad != undefined && entidad != null) { // El resultado es válido
                                let tipo = entidad.type;
                                switch (tipo) {
                                    case 'vehicle': // colision con vehiculo
                                        tipoColision = 0;
                                        posColision = raycast.position;
                                        break;
                                    case 'object': // colision con objeto
                                        tipoColision = 1;
                                        posColision = raycast.position;
                                        break;
                                    default:
                                        if (tipo == undefined || tipo == null) { // colision con mapa
                                            tipoColision = 2;
                                            posColision = raycast.position;
                                            limpiarHandleRaycast(entidad);
                                        }
                                        break;
                                }
                            }
                        }
                        else {
                            objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                        } 

                        objeto.placeOnGroundProperly();
                        let pos = objeto.getCoords(true); // Necesario para actualizar la posicion
                        let rot = objeto.getRotation(2); // Necesario para actualizar la rotacion
                        objeto.position = new mp.Vector3(pos.x, pos.y, pos.z);
                        objeto.rotation = new mp.Vector3(rot.x, rot.y, rot.z);

                        posObj = objeto.position;
                        rotObj = objeto.rotation;

                        // Si el raycast nos ha dado una colision valida realizamos sus comprobaciones
                        if (tipoColision != -1) {
                            // Obtenemos altura del objeto por debajo de su eje
                            let dimZ = 0.0;
                            let dimensiones = mp.game.gameplay.getModelDimensions(modelo);
                            if (dimensiones != undefined && dimensiones != null) {
                                dimZ = Math.abs(dimensiones.min.z);
                            }

                            switch (tipoColision) {
                                case 0: // vehiculo
                                    posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ + 0.015); // + margen error por colisiones del vehiculo
                                    rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                    break;
                                case 1: // objeto
                                    let aux1 = posColision.z - objeto.position.z;
                                    // Si el raycast esta ligeramente mas alto que la posicion del objeto (ej: tirar el objeto sobre un prop con las colisiones rotas)
                                    if (aux1 > 0.1) {
                                        posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                        rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                    }
                                    break;
                                case 2: // mapa
                                    let aux2 = posColision.z - objeto.position.z;
                                    // Si el raycast esta mucho mas bajo que la posicion del objeto (ej: tirar el objeto de un puente)
                                    // O si el raycast esta ligeramente mas alto que el objeto (ej: tirar el objeto sobre algo sin colisiones, coches oxidados de los canales de la mesa)
                                    if (aux2 > 0.2 || aux2 < -0.6) {
                                        posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                        rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                        // Eliminamos el objeto temporal
                        objeto.destroy();

                        // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                        if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                            calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                            let posAux = player_local.getCoords(true);

                            posObj.x = posAux.x;
                            posObj.y = posAux.y;
                        }
                        mp.events.callRemote("tirar_tecla", objeto_mano.id, posObj, rotObj);
                        return;
                    }
                    else {
                        counter++;
                        if (counter > 7) { // +- 75ms
                            clearInterval(intervalo_objeto);
                            intervalo_objeto = null;

                            // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                            if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                                calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                                let posAux = player_local.getCoords(true);

                                posObj.x = posAux.x;
                                posObj.y = posAux.y;
                            }
                            mp.events.callRemote("tirar_tecla", objeto_mano.id, posObj, rotObj);
                            return;
                        }
                    }
                }, 10);
            }
            else {
                // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                    calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                    let posAux = player_local.getCoords(true);

                    posObj.x = posAux.x;
                    posObj.y = posAux.y;
                }
                if (setFloodboton(700, "FB17") == false) return;
                mp.events.callRemote("tirar_tecla", objeto_mano.id, posObj, rotObj);
            }
        }
    } catch (e) {
        logError("TECLA X", e);
    }
});
// Tecla ENTER
//Cuando tengamos un objeto en la mano pulsamos enter lo usamos
mp.keys.bind(0x0D, true, () => {
    if (!logueado) return;
    if (menuAbierto) return;
    if (bloqueoTeclas) return;
    if (player_local.vehicle) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (cantidad_cefs > 0) return;
    if (tratoActivo) return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;
    if (openEditor || actualObj) return;
    crearTimeout(() => {
        try {
            if (bloqueoTeclas) return;
            if (tieneObjetoMano()) {
                let objeto = obtenerObjetoMano();
                if (player_local.weapon == 2725352035) {
                    const camera = mp.cameras.new("gameplay"); // Camara de gameplay
                    let position = camera.getCoord(); // Posición de la camara como Vector3
                    let direction = camera.getDirection(); // Dirección a la que está apuntando la cámara como Vector3
                    let endPosition = new mp.Vector3((direction.x * 10) + (position.x), (direction.y * 10) + (position.y), (direction.z * 10) + (position.z)); // Punto random dibujado entre posicion y dirección a X distancia

                    var raycast = mp.raycasting.testCapsule(position, endPosition, 0.45, player_local, 2); // 4 Colision con peds-players

                    if (raycast) { // Ha tocado algo
                        var entidad = raycast.entity;
                        if (entidad && entidad != null) { // El resultado es válido
                            let tipo = entidad.type;
                            if (tipo != undefined && tipo != null && entidad.propiedades) { // ENTIDAD RAGEMP
                                switch (objeto.tipoObjeto) {
                                    case 1958:
                                        if (setFloodboton(500, "FB18") == false) return;
                                        mp.events.callRemote("vehiculo:raycast:falsificarmatricula", entidad.propiedades.llave);
                                        return;
                                    case 1541: case 177: case 1619:
                                        if (setFloodboton(500, "FB18") == false) return;
                                        mp.events.callRemote("vehiculo:raycast:quitarmatriculafalsa", entidad.propiedades.llave);
                                        return;
                                    case 76:
                                        if (setFloodboton(500, "FB18") == false) return;
                                        mp.events.callRemote("vehiculo:raycast:usarlata", entidad.propiedades.llave);
                                        return;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                    if (setFloodboton(500, "FB18") == false) return;
                    mp.events.callRemote("objetos:usar", objeto.id);
                }
            }
        } catch (e) {
            logError("TECLA ENTER", e);
        }
    }, 150);
});
// Tecla BACKSPACE // Tecla RETROCESO
//Cuando tengamos un objeto en la mano pulsamos backspace lo guardamos
mp.keys.bind(0x08, true, () => {
    if (!logueado) return;
    if (menuAbierto) return;
    if (bloqueoTeclas) return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (bigNotyActiva) return;
    if (tratoActivo) return;
    if (cantidad_cefs > 0) return;
    try {
        if (tieneObjetoMano()) {
            if (player_local.weapon == 2725352035 && armaActiva.id == 0) {
                if (setFloodboton(500, "FB19") == false) return;
                let objeto_mano = obtenerObjetoMano();
                mp.events.callRemote("objetos:guardar", objeto_mano.id);
            }else{
                mp.events.call("ruletaarmas:elegirarma", 0, 0, 0);
            }
        }
    } catch (e) {
        logError("TECLA BACKSPACE", e);
    }
});

// Teclas //
function calcDist(v1, v2) {
    if (v1 != undefined && v2 != undefined)
        return mp.game.system.vdist(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);

    return null;
}

mp.events.add({
    "global:teclasextra": function (estado) {
        teclasExtra = estado;
        mp.events.call("hud:teclasExtra", teclasExtra);
        mp.events.call("hud:actualizar_inventario");
    },
    "global:inventarioextra": function (estado) {
        inventarioExtra = estado;
    },
    "global:tiempopayday": function (tiempoPayday) {
        tiempo_payday = tiempoPayday;
    },
    "global:pruebatrucha": function (estado) {
        if(estado)
        {
            //Ayunta
            mp.game.streaming.requestIpl("bh1_occl_05");
            mp.game.streaming.requestIpl("guberheli");
            mp.game.streaming.requestIpl("hei_bh1_rd_critical_3");
            mp.game.streaming.requestIpl("int_cityhall_milo_");

            //Mision Row
            mp.game.streaming.requestIpl("hei_dt1_19_interior_0_heist_police_dlc_milo_");
            mp.game.streaming.requestIpl("hei_dt1_19_strm_0");
            mp.game.streaming.requestIpl("hei_dt1_occl_05");
            mp.game.streaming.requestIpl("MRPD_SmokerBalkon");
        }
        else
        {
            //Ayunta
            mp.game.streaming.removeIpl("bh1_occl_05");
            mp.game.streaming.removeIpl("guberheli");
            mp.game.streaming.removeIpl("hei_bh1_rd_critical_3");
            mp.game.streaming.removeIpl("int_cityhall_milo_");

            //Mision Row
            mp.game.streaming.removeIpl("hei_dt1_19_interior_0_heist_police_dlc_milo_");
            mp.game.streaming.removeIpl("hei_dt1_19_strm_0");
            mp.game.streaming.removeIpl("hei_dt1_occl_05");
            mp.game.streaming.removeIpl("MRPD_SmokerBalkon");
        }
    },
    "global:tiempopayday": function (tiempoPayday) {
        tiempo_payday = tiempoPayday;
    },
    "global:tiempoprision": function (tiempoPrision) {
        tiempo_prision = tiempoPrision;
    },
    "puntosrol_positivos": function (positivos) {
        puntosrol_positivos = positivos;
    },
    "puntosrol_negativos": function (negativos) {
        puntosrol_negativos = negativos;
    },
    "cargar_inventario": function (array) {
        try {
            var objetos_array = JSON.parse(array);
            var _loop_1 = function () {
                var objeto_existe = false;
                inventario.forEach(function (obj) {
                    if (obj.id == objetos_array[i])
                        objeto_existe = true;
                });
                if (!objeto_existe) {
                    // Obtenemos los datos
                    var obj = { id: objetos_array[i], nombre: objetos_array[i + 1], cantidad: objetos_array[i + 2], mano: objetos_array[i + 3], accesorio: objetos_array[i + 4], mascara: objetos_array[i + 5], tipoObjeto: objetos_array[i + 6], modeloTirar: objetos_array[i + 7], celdaInv: objetos_array[i + 8], imagen: objetos_array[i + 9], categoria: objetos_array[i + 10], componente: objetos_array[i + 11], slot: objetos_array[i + 12] };
                    inventario.push(obj);
                }
            };
            for (var i = 0; i < objetos_array.length; i += 13) {
                _loop_1();
            }
        } catch (e) {
            logError("INV-1", e);
        }
    },
    "EnviaraCef": function (execute) { return enviaraCef(execute); },
    "CerrarCef": function () { return cerrarCef(); },
    "DestruirCamara": function () { return destruirCamara(); },
    "CerrarCefDestruirCamara": function () {
        cerrarCef();
        destruirCamara();
    },
    "CambiarRotacion": function (angle) { return player_local.setHeading(angle); },
    "changeChatState": function (estado) {
        estaChatAbierto = estado;
        mp.events.call("hud:estadoChat", estado);
    },
    "ajustarTamanoChat": function (tamano) {
        chatbox.execute("tamanoChat('" + tamano + "')");
        //mp.events.callRemote("tamano_chat", tamano);
        tamanoChat = tamano;
        mp.storage.data.personajes[personaje_id].tamanoChat = tamano;
        mp.storage.flush();
    },
    "ajustarTiempoChat": function (tiempo) {
        chatbox.execute("tiempoChat('" + tiempo + "')");
        //mp.events.callRemote("tiempo_chat", tiempo);
        tiempoChat = tiempo;
        mp.storage.data.personajes[personaje_id].tiempoChat = tiempo;
        mp.storage.flush();
    },
    "ajustarVerTextoObjetos": (estado) => {
        mostrar_texto_objetos = estado;
        mp.storage.data.personajes[personaje_id].textoObjetos = estado;
        mp.storage.flush();

        mp.objects.forEachInStreamRange(entity => {
            if (mostrar_texto_objetos) {
                if (objetosSuelo.hasOwnProperty(entity.id) && !entity.labelSuelo) {
                    entity.labelSuelo = mp.labels.new("~y~" + objetosSuelo[entity.id].nombre + "\n~g~[X]~w~ para recoger", entity.position, { los: false, font: 6, drawDistance: 1.5, color: [255, 255, 255, 255], dimension: entity.dimension });
                }
            } else {
                if (objetosSuelo.hasOwnProperty(entity.id) && entity.labelSuelo && mp.labels.exists(entity.labelSuelo)) {
                    entity.labelSuelo.destroy();
                    entity.labelSuelo = null;
                }
            }
        });
    },
    "ajustarVerAme": (estado) => {
        mostrar_texto_cabeza = estado;
        mp.storage.data.personajes[personaje_id].textoCabeza = estado;
        mp.storage.flush();
    },
    "establecer_clima": function (icono, temp, tiempo) {
        icono_clima = icono;
        temperatura = temp;
        if (purga) {
            if(juego == "squid_1") return;
            mp.game.time.setClockTime(0, 0, 0);
            mp.game.time.setClockDate(02, 04, 2021);
            mp.game.gameplay.setWeatherTypePersist("HALLOWEEN");
            return;
        } else {
            //mp.game.gameplay.setWeatherTypeNowPersist(tiempo);
            mp.game.gameplay.setWeatherTypeOverTime(tiempo, 30);
        }
    },
    "actualizar_dimension": function (dim) {
        dimension_real = dim;

        cargarMapeadosDimension(dim);
    },
    "propiedad_id": function (propiedad) {
        propiedad_id = propiedad;

        // Si sale de un garaje con varias plantas eliminamos las posiciones de las plantas
        if (propiedad == 0) {
            garaje_plantas = [];
        }
    },
    "garaje_plantas": function (array) {
        let diccionario_plantas = (typeof array === "string" ? JSON.parse(array) : array);
        if (diccionario_plantas != null) {
            Object.keys(diccionario_plantas).forEach(function (key) {
                if (key != -10) { // Evitamos meter la rotacion
                    garaje_plantas.push(diccionario_plantas[key]);
                }
            });
        }
    },
    "general:nativa": function (nativa, parametros) {
        mp.game.invoke(nativa, parametros);
    },
    "esposar": function(jugador, estado) {
        mp.game.invoke("0xDF1AF8B5D56542FA", jugador.handle, estado);
    },
    "stop_sonido": function () {
        mp.game.audio.stopSound(0);
    },
    "reproducir_sonido": function (sonido, set) {
        mp.game.audio.playSoundFrontend(-1, sonido, set, true);
    },
    "reproducir_musica": function (musica) {
        mp.game.audio.triggerMusicEvent(musica);
    },
    "parar_musica": function (musica) {
        mp.game.audio.cancelMusicEvent(musica);
    },
    "reproducir_ringtone": function (sonido) {
        mp.game.audio.playPedRingtone(sonido, player_local.handle, false);
    },
    "screenfx_iniciar": function (efecto) {
        mp.game.graphics.startScreenEffect(efecto, 20000, true);
    },
    "screenfx_parar": function (efecto) {
        mp.game.graphics.stopScreenEffect(efecto);
    },
    "efectoScreenfx": function (efecto, duracion, bucle) {
        mp.game.graphics.startScreenEffect(efecto, duracion, bucle);
        if (!bucle) {
            crearTimeout(function () {
                mp.game.graphics.stopScreenEffect(efecto);
            }, duracion);
        }
    },
    "efectoShake_iniciar": function (estilo) {
        mp.game.cam.shakeGameplayCam(estilo, 1.5);

    },
    "efectoShakeFuerte_iniciar": function (estilo) {
        mp.game.cam.shakeGameplayCam(estilo, 2.0);
    },
    "efectoShakeExplosion_iniciar": function (estilo) {
        mp.game.cam.shakeGameplayCam(estilo, 3.0);
    },
    "efectoShake": function (estilo, intensidad) {
        mp.game.cam.shakeGameplayCam(estilo, intensidad);
        crearTimeout(function () {
            mp.game.cam.stopGameplayCamShaking(true);
        }, 10000);
    },
    "efectoShake_parar": function () {
        mp.game.cam.stopGameplayCamShaking(true);
    },
    "checkpoint_armas": function (zona) {
        checkpointArmas1 = mp.game.ui.addBlipForRadius(0, 0, 1, 500.0);
        mp.game.invoke("0xDF735600A4696DAF", checkpointArmas1, 5);
        mp.game.invoke("0x45FF974EEE1C8734", checkpointArmas1, 70);
        mp.game.invoke("0x03D7FB09E75D6B7E", checkpointArmas1, 1);
    },
    "luces": function (estado, tipo) {
        if (tipo == 0) {
            for (let i = 0; i <= 16; i++) mp.game.graphics.setLightsState(i, estado);
        }
        if (tipo == 1) {
            for (let i = 0; i <= 16; i++) {
                crearTimeout(mp.game.graphics.setLightsState(i, estado), 2000)
            }
        }
    },
    "mostrar_scaleform": (scaleform) => {
        if (nivelAdmin < 6) return;
        if (scaleform_global != null) {
            scaleform_global.dispose();
            scaleform_global = null;
        }

        scaleform_global = new messageScaleform(scaleform);
        scaleform_global.callFunction("SHOW_MIDSIZED_MESSAGE", "Pruebas");
        scaleform_global.renderFullscreen();

        crearTimeout(function () {
            if (scaleform_global != null) {
                scaleform_global.dispose();
                scaleform_global = null;
            }
        }, 10000);
    },
    "timecycle": function (tiempo) {
        if (nivelAdmin < 6) return;
        mp.game.graphics.setTimecycleModifier(tiempo);

        crearTimeout(function () {
            mp.game.invoke("0x0F07E7745A236711");
        }, 10000);
    },
    "idinterior": function (x, y, z) {
        var interior = mp.game.interior.getInteriorAtCoords(x, y, z);
        mp.gui.chat.push("InteriorID: " + interior);
    },

    "editor_rockstar": function () {
        if (nivelAdmin < 1) return;
        mp.game.invoke(Natives.ACTIVATE_ROCKSTAR_EDITOR);
    },

    "grabar:comenzar": function (modo) {
        mp.game.invoke(Natives.START_RECORDING, modo);
    },
    "grabar:parar": function () {
        mp.game.invoke(Natives.STOP_RECORDING_AND_SAVE_CLIP);
    },
    "pruebas:hasStreamedTextureDictLoaded": async function (textureDict) {
        if (nivelAdmin < 2) return;
        if (!mp.game.graphics.hasStreamedTextureDictLoaded(textureDict)) {
            mp.game.graphics.requestStreamedTextureDict(textureDict, true);
            while (!mp.game.graphics.hasStreamedTextureDictLoaded(textureDict)) await mp.game.waitAsync(0);
        }
    },
    "pruebas:cochescerca": function () {
        if (nivelAdmin < 2) return;
        let contador = 0;
        mp.vehicles.forEachInStreamRange(
            (vehicle) => {
                contador++;
            }
        );

        mp.gui.chat.push("Total vehículos cercanos: " + contador);
    },
    "escenario": function (player, escenario) {
        player.taskStartScenarioInPlace(escenario, 0, true);
    },
    "explodeveh": function (vehiculo) {
        if (mp.vehicles.exists(vehiculo)) {
            mp.game.invoke("0xBA71116ADF5B514C", vehiculo.handle, true, false);
        }
    },
    "global:radio": function (estado) {
        mp.events.call("hud:modificar_parametro", "radioactiva", estado);
    },
    "global:canalradio": function (canal) {
        canalradio = canal;
        mp.events.call("hud:modificar_parametro", "radio", canal);
        if(canal == null)
            mp.events.call("hud:modificar_parametro", "radioactiva", false);
        else
            mp.events.call("hud:modificar_parametro", "radioactiva", true);
    },
    "global:adminservicio": function (estado) {
        adminservicio = estado;
        mp.events.call("hud:modificar_parametro", "adminservicio", estado);
    },
    "global:staff": function (estado) {
        miembroStaff = estado;
        nivelAdmin = 6;
    },
    "global:vikens": function (cantidad) {
        vikens = cantidad;
    },
    "global:prision": function (estado) {
        prision = estado;
    },
    "global:faccion": function (fc) {
        faccion = fc;
    },
    "global:trabajos": function (array) {
        try {
            let trabajos_array = JSON.parse(array);
            if (trabajos_array != null) {
                trabajos = trabajos_array;
            }
            else {
                trabajos = [];
            }
        } catch (e) {
            logError("GLB-1", e);
        }
    },
    "global:jugador:negocios": function (array) {
        let negocios_array = JSON.parse(array);
        if (negocios_array != null) {
            negociosJug = negocios_array;
        }
        else {
            negociosJug = [];
        }
    },
    "global:jugador:propiedades": function (array) {
        let propiedades_array = JSON.parse(array);
        if (propiedades_array != null) {
            propiedadesJug = propiedades_array;
        }
        else {
            propiedadesJug = [];
        }
    },
    "global:esposado": function (estado){
        esposado = estado;
    }
});

/**
 * Segun xday es necesario usar esta funcion para invalidar el resultado de un raycast que tiene el flag 1 activado (tambien tienen flag 1 todos los raycast con flags impares o sin flags)
 * 
 * Este código lo comparte a raiz de los reportes de dos usuarios sobre perdidas de fps, uno de ellos indica que usaba 10 raycast
 */
function limpiarHandleRaycast(entity) {
    // Se usa una nativa para saber si es una entidad y luego otra para comprobar que es objeto (tipo 3)
    if (typeof entity !== 'number' || entity === 0 || typeof entity.handle !== "undefined") return; // Solo podemos usar esto con objetos nativos de GTAV no de RAGE, por lo tanto si .handle no existe sabemos que es de GTAV
    if (mp.game.invoke("0x7239B21A38F536BA", entity) && mp.game.invoke("0x8ACD366038D14505", entity) == 3) {
        mp.game.shapetest.releaseScriptGuidFromEntity(entity); // NATIVA: 0x2B3334BCA57CD799 - RELEASE_SCRIPT_GUID_FROM_ENTITY
    }
}

function tieneObjetoMano()
{
    for (let i = 0, n = inventario.length; i < n; i++) {
        if(inventario[i].mano)
        {   
            return true;
        }
    }

    return false;
}

function obtenerObjetoMano()
{
    for (let i = 0, n = inventario.length; i < n; i++) {
        if(inventario[i].mano)
        {   
            return inventario[i];
        }
    }

    return null;
}

mp.events.add("playerDeath", (player, reason, killer) => {
    if(player == player_local)
    {
        estaMuerto = true;
        if (listaArmas[armaActiva.tipoObjeto]) {
            if(listaArmas[armaActiva.tipoObjeto].categoria != 0){
                let municion = player_local.getAmmoInClip(armaActiva.hash) || armaActiva.cantidad;
                mp.events.callRemote("arma:actualizarmunicion", armaActiva.id, municion);
            }
        }
        mp.game.player.disableVehicleRewards();
        mp.game.gameplay.setFadeOutAfterDeath(false);
        player.setConfigFlag(429, true);
        armaActiva.id = 0;
        armaActiva.tipoObjeto = 0;
        armaActiva.hash = 0;
        armaActiva.tipoCargador = 0;
        bloqueado = false;
        guardado = true;

        // Obtenemos todas las armas que tiene en el inventario y su modelo
        let array_modelos = [];
        if (listaArmas != undefined && listaArmas != null) {
            for (let i = 0, n = inventario.length; i < n; i++) {
                let tipo = inventario[i]?.tipoObjeto;
                if (tipo != undefined && tipo != null && listaArmas.hasOwnProperty(tipo)) {
                    let id = inventario[i]?.id;
                    let model = inventario[i]?.modeloTirar;
                    if (id != undefined && id != null && model != undefined && model != null) {
                        array_modelos.push({ sqlid: id, modelo: model });
                    }
                }
            }
        }

        // Si tiene al menos un arma procedemos a realizar los calculos para tirarla correctamente al suelo
        if (array_modelos.length > 0) {
            let position = player_local.getCoords(true); // .position no, si no se mueve tras conectar .position = (0,0,0)

            // Con un intervalo de 20ms recorremos el array de armas que tiene, por cada arma calculamos su posicion y rotacion adecuada
            let indice = 0;
            let array_resultado = [];
            let intervaloArmas = setInterval(async () => {
                let modelo = array_modelos[indice].modelo;

                // Posicion y rotacion por defecto
                let posObj = new mp.Vector3(position.x, position.y, position.z - 0.9);
                let rotObj = new mp.Vector3(0.0, 0.0, 0.0);

                // Si el modelo existe creamos el objeto temporal y realizamos las comprobaciones, en caso contrario mandamos la posicion y rotacion por defecto
                if (modelo && modelo != -1 && modelo != 0) {
                    let objeto = null; // Objeto temporal

                    // Calculamos posicion "aleatoria" detras del jugador
                    let posDetras = new mp.Vector3(position.x - 5.0, position.y - 5.0, position.z - 5.0);

                    // Cargamos las colisiones del modelo en caso de no tenerlas ya cargadas
                    if (!mp.game.streaming.hasModelLoaded(modelo)) {
                        mp.game.streaming.requestModel(modelo);
                        let count = 0;
                        while (!mp.game.streaming.hasModelLoaded(modelo)) {
                            count++;
                            if (count >= 40) {
                                break;
                            }
                            await mp.game.waitAsync(10);
                        }
                    }

                    // Creamos el objeto temporal con alpha 0
                    objeto = mp.objects.new(modelo, posDetras,
                        {
                            rotation: rotObj,
                            alpha: 0,
                            dimension: player_local.dimension
                        });

                    // Intervalo de 5ms, una vez el objeto existe realiza los calculos, en caso contrario a la vuelta 8 corta el intervalo y manda valores por defecto
                    let counter = 0;
                    let intervalo_objeto = setInterval(() => {
                        if (objeto && mp.objects.exists(objeto) && typeof objeto.handle === "number" && objeto.handle != 0) {
                            clearInterval(intervalo_objeto);
                            intervalo_objeto = null;

                            position = player_local.getCoords(true);
                            position.z = position.z + 0.5;

                            // Calculamos posicion aleatoria para cada arma dentro de un radio de 1.2m
                            let r = 2 * Math.sqrt(Math.random());
                            let theta = Math.random() * 1.2 * Math.PI;
                            let x_en_radio = position.x + r * Math.cos(theta);
                            let y_en_radio = position.y + r * Math.sin(theta);

                            let newPosition = new mp.Vector3(x_en_radio, y_en_radio, position.z);

                            // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto, le forzamos la posicion del jugador
                            let raycastPared = mp.raycasting.testPointToPoint(position, newPosition, objeto, 1);
                            if (raycastPared != undefined) {
                                newPosition = position;

                                limpiarHandleRaycast(raycastPared.entity);
                            }

                            // Margen para calcular la altura final del objeto
                            newPosition.z = newPosition.z + 0.4;

                            let flags = 19; // Colision con mapa, vehiculos y objetos
                            // Si muere dentro de un vehiculo quitamos el flag de colision con vehiculos, queremos que las armas caigan al suelo si mueres en un coche, helicoptero...
                            if (player_local.vehicle) {
                                flags = 17;
                            }

                            // Raycast desde la posicion calculada hasta la misma posicion con altura -1000.0
                            var raycast = mp.raycasting.testPointToPoint(newPosition, new mp.Vector3(newPosition.x, newPosition.y, newPosition.z - 1000.0), objeto, flags);
                            let tipoColision = -1;
                            let posColision = null;
                            if (raycast) { // Ha tocado algo
                                objeto.position = newPosition; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                                let entidad = raycast.entity;
                                if (entidad != undefined && entidad != null) { // El resultado es válido
                                    let tipo = entidad.type;
                                    switch (tipo) {
                                        case 'vehicle': // colision con vehiculo
                                            tipoColision = 0;
                                            posColision = raycast.position;
                                            break;
                                        case 'object': // colision con objeto
                                            tipoColision = 1;
                                            posColision = raycast.position;
                                            break;
                                        default:
                                            if (tipo == undefined || tipo == null) { // colision con mapa
                                                tipoColision = 2;
                                                posColision = raycast.position;
                                                limpiarHandleRaycast(entidad);
                                            }
                                            break;
                                    }
                                }
                            }
                            else {
                                objeto.position = newPosition; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                            }

                            objeto.placeOnGroundProperly();
                            let pos = objeto.getCoords(true); // Necesario para actualizar la posicion
                            let rot = objeto.getRotation(2); // Necesario para actualizar la rotacion
                            objeto.position = new mp.Vector3(pos.x, pos.y, pos.z);
                            objeto.rotation = new mp.Vector3(rot.x, rot.y, rot.z);

                            posObj = objeto.position;
                            rotObj = objeto.rotation;

                            // Si el raycast nos ha dado una colision valida realizamos sus comprobaciones
                            if (tipoColision != -1) {
                                // Obtenemos altura del objeto por debajo de su eje
                                let dimZ = 0.0;
                                let dimensiones = mp.game.gameplay.getModelDimensions(modelo);
                                if (dimensiones != undefined && dimensiones != null) {
                                    dimZ = Math.abs(dimensiones.min.z);
                                }

                                switch (tipoColision) {
                                    case 0: // vehiculo
                                        posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ + 0.015); // + margen error por colisiones del vehiculo
                                        rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                        break;
                                    case 1: // objeto
                                        let aux1 = posColision.z - objeto.position.z;
                                        // Si el raycast esta ligeramente mas alto que la posicion del objeto (ej: tirar el objeto sobre un prop con las colisiones rotas)
                                        if (aux1 > 0.1) {
                                            posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                            rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                        }
                                        break;
                                    case 2: // mapa
                                        let aux2 = posColision.z - objeto.position.z;
                                        // Si el raycast esta mucho mas bajo que la posicion del objeto (ej: tirar el objeto de un puente)
                                        // O si el raycast esta ligeramente mas alto que el objeto (ej: tirar el objeto sobre algo sin colisiones, coches oxidados de los canales de la mesa)
                                        if (aux2 > 0.2 || aux2 < -0.6) {
                                            posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                            rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }

                            // Eliminamos el objeto temporal
                            objeto.destroy();

                            // Si por algun motivo el arma esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                            if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                                calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                                let posAux = player_local.getCoords(true);

                                posObj.x = posAux.x;
                                posObj.y = posAux.y;
                            }
                            const auxIndex = indice;
                            array_resultado.push({ sqlid: array_modelos[auxIndex].sqlid, posicion: posObj, rotacion: rotObj });

                            // Si hemos acabado de recorrer el array mandamos el evento con todas las armas y sus posiciones/rotaciones adecuadas
                            if (indice + 1 >= array_modelos.length) {
                                mp.events.callRemote("tirar_array_objetos_calculados", JSON.stringify(array_resultado), true);

                                clearInterval(intervaloArmas);
                                intervaloArmas = null;
                                return;
                            }
                            else {
                                indice++;
                            }
                        }
                        else {
                            counter++;
                            if (counter > 7) { // +- 75ms
                                clearInterval(intervalo_objeto);
                                intervalo_objeto = null;

                                // Si por algun motivo el arma esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                                if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                                    calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                                    let posAux = player_local.getCoords(true);

                                    posObj.x = posAux.x;
                                    posObj.y = posAux.y;
                                }
                                const auxIndex = indice;
                                array_resultado.push({ sqlid: array_modelos[auxIndex].sqlid, posicion: posObj, rotacion: rotObj });

                                // Si hemos acabado de recorrer el array mandamos el evento con todas las armas y sus posiciones/rotaciones adecuadas
                                if (indice + 1 >= array_modelos.length) {
                                    mp.events.callRemote("tirar_array_objetos_calculados", JSON.stringify(array_resultado), true);

                                    clearInterval(intervaloArmas);
                                    intervaloArmas = null;
                                    return;
                                }
                                else {
                                    indice++;
                                }
                            }
                        }
                    }, 10);
                }
                else {
                    // Si por algun motivo el arma esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                    if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                        calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                        let posAux = player_local.getCoords(true);

                        posObj.x = posAux.x;
                        posObj.y = posAux.y;
                    }
                    const auxIndex = indice;
                    array_resultado.push({ sqlid: array_modelos[auxIndex].sqlid, posicion: posObj, rotacion: rotObj });

                    // Si hemos acabado de recorrer el array mandamos el evento con todas las armas y sus posiciones/rotaciones adecuadas
                    if (indice + 1 >= array_modelos.length) {
                        mp.events.callRemote("tirar_array_objetos_calculados", JSON.stringify(array_resultado), true);

                        clearInterval(intervaloArmas);
                        intervaloArmas = null;
                        return;
                    }
                    else {
                        indice++;
                    }
                }
            }, 20);
        }
    }
});

mp.events.add("playerSpawn", () => {
    estaMuerto = false;
});

mp.events.add('iniciarAlarma', function (parametro) {
    if (parametro == 1)
        mp.game.audio.startAlarm("PRISON_ALARMS", true);
    if (parametro == 2)
        mp.game.audio.startAlarm("PORT_OF_LS_HEIST_FORT_ZANCUDO_ALARMS", true);
    if (parametro == 3)
        mp.game.audio.startAlarm("JEWEL_STORE_HEIST_ALARMS", true);
    if (parametro == 4)
        mp.game.audio.startAlarm("PORT_OF_LS_HEIST_SHIP_ALARMS", true);
});
mp.events.add('pararAlarma', function (parametro) {
    if (parametro == 1)
        mp.game.audio.stopAlarm("PRISON_ALARMS", true);
    if (parametro == 2)
        mp.game.audio.stopAlarm("PORT_OF_LS_HEIST_FORT_ZANCUDO_ALARMS", true);
    if (parametro == 3)
        mp.game.audio.stopAlarm("JEWEL_STORE_HEIST_ALARMS", true);
    if (parametro == 4)
        mp.game.audio.stopAlarm("PORT_OF_LS_HEIST_SHIP_ALARMS", true);
});

mp.events.add('congelar', function () {
    congelado = true;
    player_local.freezePosition(true);
    if (player_local.vehicle)
        player_local.vehicle.freezePosition(true);
});
mp.events.add('descongelar', function () {
    congelado = false;
    player_local.freezePosition(false);
    if (player_local.vehicle)
        player_local.vehicle.freezePosition(false);
});
mp.events.add('tiempoEspera', function (tiempo) {
    player_local.freezePosition(true);
    if (player_local.vehicle)
        player_local.vehicle.freezePosition(true);
    crearTimeout(function () {
        player_local.freezePosition(false);
        if (player_local.vehicle)
            player_local.vehicle.freezePosition(false);
    }, tiempo);
});
//SOLO EN LA 0.3.7
//mp.events.add('enviarMunicion', function (weaponhash) {
//    var municion = mp.game.invoke("0x015A522136D7F951", player_local.handle, weaponhash);
//    if (antiflood_envio) {
//        antiflood_envio = false;
//        crearTimeout(function () {
//            mp.events.callRemote("guardar_municion", weaponhash, municion);
//            antiflood_envio = true;
//        }, 10);
//    }
//});
//Actualizamos el inventario del jugador
mp.events.add("INVENTARIO-ADD", function (value) {
    if (value != null) {
        try {
            var objeto_array_1 = JSON.parse(value);
            var objeto_existe_1 = false;
            for (let i = 0, n = inventario.length; i < n; i++) {
                if (inventario[i].id == objeto_array_1[0]) {
                    objeto_existe_1 = true;
                    break;
                }
            }
            if (!objeto_existe_1) {
                var obj = {
                    id: objeto_array_1[0],
                    nombre: objeto_array_1[1],
                    cantidad: objeto_array_1[2],
                    mano: objeto_array_1[3],
                    accesorio: objeto_array_1[4],
                    mascara: objeto_array_1[5],
                    tipoObjeto: objeto_array_1[6],
                    modeloTirar: objeto_array_1[7],
                    celdaInv: objeto_array_1[8],
                    imagen: objeto_array_1[9],
                    categoria: objeto_array_1[10],
                    componente: objeto_array_1[11],
                    slot: objeto_array_1[12],
                };
                inventario.push(obj);

                logInfo("INVENTARIO-ADD", "v: " + value);
                mp.events.call("inventario:addobjeto", obj);
                mp.events.call("hud:actualizar_inventario");
                mp.events.call("hud:actualizar_inventario_mano");
            }
            if (armaActiva.tipoCargador == objeto_array_1[6]) {
                if (enCasillaAccesoRapido(objeto_array_1[0])) {
                    armaActiva.totalBalas += objeto_array_1[2];
                    if (!player_local.vehicle) {
                        player_local.setWeaponAmmo(armaActiva.hash, parseInt(player_local.getWeaponAmmo(armaActiva.hash) + objeto_array_1[2]));
                    }
                }
            }
        } catch (e) {
            logError("INV-2", e);
        }
    }
});

//Actualizamos un objeto a la mano
mp.events.add("INVENTARIO-MANO-ADD", function (value) {
    if (value != null) {
        for (let i = 0, n = inventario.length; i < n; i++) {
            if (inventario[i].id == value) {
                inventario[i].mano = true;
                inventario[i].celdaInv = 0;
                break;
            }
        }

        logInfo("INVENTARIO-MANO-ADD", "v: " + value);

        //Actualizamos de continuo los objetos que tenemos en la mano
        mp.events.call("hud:actualizar_inventario");
        mp.events.call("hud:actualizar_inventario_mano");
    }
});
//Sacamos un objeto de la mano
mp.events.add("INVENTARIO-MANO-DEL", function (value) {
    if (value != null) {
        for (let i = 0, n = inventario.length; i < n; i++) {
            if (inventario[i].id == value) {
                if (camaras == true) {
                    cerrarCamaraFotos();
                }
                inventario[i].mano = false;
                break;
            }
        }

        logInfo("INVENTARIO-MANO-DEL", "v: " + value);
        //Actualizamos de continuo los objetos que tenemos en la mano
        mp.events.call("hud:actualizar_inventario");
        mp.events.call("hud:actualizar_inventario_mano");
    }
});
//Actualizamos un objeto en los accesorios
mp.events.add("INVENTARIO-ACCESORIO-ADD", function (value) {
    if (value != null) {
        for (let i = 0, n = inventario.length; i < n; i++) {
            if (inventario[i].id == value) {
                inventario[i].accesorio = true;
                break;
            }
        }
        logInfo("INVENTARIO-ACCESORIO-ADD", "v: " + value);
    }
});
//Sacamos un objeto en los accesorios
mp.events.add("INVENTARIO-ACCESORIO-DEL", function (value) {
    if (value != null) {
        for (let i = 0, n = inventario.length; i < n; i++) {
            if (inventario[i].id == value) {
                inventario[i].accesorio = false;
                break;
            }
        }
        logInfo("INVENTARIO-ACCESORIO-DEL", "v: " + value);
    }
});
//Actualizamos un objeto en las mascaras
mp.events.add("INVENTARIO-MASCARA-ADD", function (value) {
    if (value != null) {
        for (let i = 0, n = inventario.length; i < n; i++) {
            if (inventario[i].id == value) {
                inventario[i].mascara = true;
                break;
            }
        }
        logInfo("INVENTARIO-MASCARA-ADD", "v: " + value);
    }
});
//Sacamos un objeto en los mascaras
mp.events.add("INVENTARIO-MASCARA-DEL", function (value) {
    if (value != null) {
        for (let i = 0, n = inventario.length; i < n; i++) {
            if (inventario[i].id == value) {
                inventario[i].mascara = false;
                break;
            }
        }
        logInfo("INVENTARIO-MASCARA-DEL", "v: " + value);
    }
});
//Borramos un objeto del inventario del jugador
mp.events.add("INVENTARIO-DEL", function (value) {
    if (value != null) {
        for (let i = 0, n = inventario.length; i < n; i++) {
            if (inventario[i].id == value) {
                inventario.splice(i, 1);
                break;
            }
        }
        mp.events.call("hud:actualizar_inventario");
        mp.events.call("hud:actualizar_inventario_mano");
        logInfo("INVENTARIO-DEL", "v:" + value);
    }
});
//Borramos un objeto del inventario del jugador
mp.events.add("INVENTARIO-CELDA", function (value, celda) {
    if (value != null) {
        for (let i = 0, n = inventario.length; i < n; i++) {
            if (inventario[i].id == value) {
                inventario[i].celdaInv = celda;
                break;
            }
        }
        mp.events.call("hud:actualizar_inventario");
        mp.events.call("hud:actualizar_inventario_mano");
        logInfo("INVENTARIO-CELDA", "v: " + value + ", celda: " + celda);
    }
});
//Actualizamos la cantidad de un objeto
mp.events.add('inventario_cantidad', function (sqlidobjeto, cantidad) {
    for (let i = 0, n = inventario.length; i < n; i++) {
        if (inventario[i].id == sqlidobjeto) {
            inventario[i].cantidad = cantidad;
            break;
        }
    }
});


mp.events.add('obtener_stamina', function () {
    let stamina = mp.game.invokeFloat('0x3F9F16F8E65A7ED7', player_local.handle);
    mostrarAviso("info", 10000, "Estamina actual: " + stamina);
});
mp.events.add('resetear_stamina', function () {
    mp.game.invoke('0xA6F312FCCE9C1DFE', player_local.handle);
});
mp.events.add('restaurar_stamina', function (cantidad) {
    mp.game.invoke('0xA352C1B864CAFD33', player_local.handle, cantidad);
});
mp.events.add('establecer_stat', function (stat, valor) {
    mp.game.stats.statSetInt(mp.game.joaat(stat), valor, false);
});

//Definimos todos los stats del juego al 100% para igualar los savegame
mp.game.stats.statSetInt(mp.game.joaat("SP0_STAMINA"), 100, !1), mp.game.stats.statSetInt(mp.game.joaat("SP0_STRENGTH"), 100, !1), mp.game.stats.statSetInt(mp.game.joaat("SP0_LUNG_CAPACITY"), 100, !1), mp.game.stats.statSetInt(mp.game.joaat("SP0_WHEELIE_ABILITY"), 100, !1), mp.game.stats.statSetInt(mp.game.joaat("SP0_FLYING_ABILITY"), 100, !1), mp.game.stats.statSetInt(mp.game.joaat("SP0_SHOOTING_ABILITY"), 100, !1), mp.game.stats.statSetInt(mp.game.joaat("SP0_STEALTH_ABILITY"), 100, !1);

var PedsBus = {
    peds: [],
    add: function (ped) {
        this.peds.push(ped);
    },
    remove: function (ped) {
        if (mp.peds.exists(ped))
            ped.destroy();
    }
};
mp.events.add('crearPedBus', function (parametro1, parametro2, parametro3) {
    var Ped = mp.peds.new(parametro1, parametro2, parametro3, 0);
    PedsBus.add(Ped);
});
mp.events.add('borrarPedBus', function () {
    try {
        PedsBus.peds.forEach(function (ped) {
            PedsBus.remove(ped);
        });
        PedsBus.peds = [];
    }
    catch (e) {
        logError("PEDS-1", e);
    }
});

var pedTaxi = null;

mp.events.add('taxi:acabarNpc', () => {
    mp.events.call('borrarPedsTaxi');
    mp.events.call('borrar_ruta');
    mp.events.call('luz_taxi');
});

mp.events.add('taxi:iniciarNpc', (posicion) => {
    mp.events.call('luz_taxi');
    mp.events.call('mostrar_ruta_ex', 1, posicion, 2);

    PedsAnimaciones.forEach(p => {
        if (p.id === 100) {
            let idx = PedsAnimaciones.indexOf(p);
            if (idx > -1)
                PedsAnimaciones.splice(idx, 1);
        }
    });

    if (pedTaxi != null) {
        if (player_local.vehicle.isSeatFree(1)) {
            pedTaxi.ped.taskEnterVehicle(player_local.vehicle.handle, 10000, 1, 1, 16, 0);
        } else {
            mp.events.call("borrarPedsTaxi");
        }
    }
});

mp.events.add('crearPedsTaxi', function (parametro1, parametro2, parametro3) {
    if (pedTaxi != null) return;

    mp.events.call("crearPedAnimacion", JSON.stringify([
        parametro1,
        parametro2,
        parametro3,
        0,
        "amb@world_human_drug_dealer_hard@male@idle_b",
        "idle_d",
        100
    ]), (ped) => {
        pedTaxi = {
            ped: ped,
            model: parametro1
        };
    }, true);
});

mp.events.add('borrarPedsTaxi', function () {
    try {
        if (mp.peds.exists(pedTaxi.ped))
            pedTaxi.ped.destroy();
        pedTaxi = null;
    }
    catch (e) {
        logError("PEDS-2", e);
    }
});
//NEGOCIOS
mp.events.add('crearPedsNegocios', function (array) {
    try {
        var peds_array = JSON.parse(array);
        var _loop_3 = function () {
            var ped_existe = false;
            peds_negocios.forEach(function (ped) {
                if (ped.negocio == peds_array[i + 4])
                    ped_existe = true;
            });
            if (!ped_existe) {
                if (peds_array[i + 1] != undefined) {
                    var Ped = mp.peds.new(peds_array[i], new mp.Vector3(peds_array[i + 1].x, peds_array[i + 1].y, peds_array[i + 1].z), peds_array[i + 2], peds_array[i + 3]);
                    Ped.dimension = peds_array[i + 3];
                    var obj = {
                        ped: Ped,
                        negocio: peds_array[i + 4],
                    };
                    peds_negocios.push(obj);
                }
            }
        };
        for (var i = 0; i < peds_array.length; i += 5) {
            _loop_3();
        }
    } catch (e) {
        logError("PEDS-3", e);
    }
});

mp.events.add('crearPedNegocio', function (array) {
    try {
        var peds_array = JSON.parse(array);


        peds_negocios.forEach(function (pedn) {
            mp.peds.forEach(function (ped) {
                if (pedn.Ped == ped) {
                    if (ped.doesExist())
                        ped.destroy();
                }
            });

            var idx = peds_negocios.indexOf(pedn);
            if (idx !== -1)
                peds_negocios.splice(idx, 1);
        });

        if (peds_array[1] != undefined) {
            var Ped = mp.peds.new(peds_array[0], new mp.Vector3(peds_array[1].x, peds_array[1].y, peds_array[1].z), peds_array[2], peds_array[3]);
            Ped.dimension = peds_array[3];
            var obj = {
                ped: Ped,
                negocio: peds_array[4],
            };
            peds_negocios.push(obj);
        }


    } catch (e) {
        logError("PEDS-4", e);
    }
});

mp.events.add('borrarPedNegocio', function (parametro1) {
    try {
        peds_negocios.forEach(function (ped) {
            if (ped.negocio == parametro1) {
                if (ped.Ped != null) {
                    if (ped.Ped.doesExist())
                        ped.Ped.destroy();
                    var idx = peds_negocios.indexOf(ped);
                    if (idx !== -1)
                        peds_negocios.splice(idx, 1);
                }
            }
        });
    }
    catch (e) {
        logError("PEDS-5", e);
    }
});

mp.events.add('negocio:establecer:posicion', function (negocio, pos) {
    try {
        for(let i = 0; i < negocios.length; i++){
            if (negocios[i].llave == negocio) {
                negocios[i].puerta = pos;
                break;
            }
        }
    }
    catch (e) {
        logError("NEG-1", e);
    }
});

mp.events.add('negocio:establecer:posicion:mostrador', function (negocio, pos) {
    try {
        for(let i = 0; i < negocios.length; i++){
            if (negocios[i].llave == negocio) {
                negocios[i].mostrador = pos;
                break;
            }
        }
    }
    catch (e) {
        logError("NEG-2", e);
    }
});

mp.events.add('negocio:establecer:posicion:ascensor', function (negocio, pos) {
    try {
        for(let i = 0; i < negocios.length; i++){
            if (negocios[i].llave == negocio) {
                negocios[i].edificio_ascensor_pos = pos;
                break;
            }
        }
    }
    catch (e) {
        logError("NEG-3", e);
    }
});

mp.events.add('negocio:establecer:posicion:ascensor:dimension', function (negocio, dimension) {
    try {
        for(let i = 0; i < negocios.length; i++){
            if (negocios[i].llave == negocio) {
                negocios[i].edificio_ascensor_dimension = dimension;
                break;
            }
        }
    }
    catch (e) {
        logError("NEG-4", e);
    }
});

mp.events.add('negocio:establecer:posicion:tejado', function (negocio, pos) {
    try {
        for(let i = 0; i < negocios.length; i++){
            if (negocios[i].llave == negocio) {
                negocios[i].edificio_tejado_pos = pos;
                break;
            }
        }
    }
    catch (e) {
        logError("NEG-5", e);
    }
});

mp.events.add('negocio:establecer:posicion:entradaveh', function (negocio, pos) {
    try {
        for(let i = 0; i < negocios.length; i++){
            if (negocios[i].llave == negocio) {
                negocios[i].edificio_entrada_pos = pos;
                break;
            }
        }
    }
    catch (e) {
        logError("NEG-6", e);
    }
});

mp.events.add('negocio:establecer:posicion:salidavehgaraje', function (negocio, pos) {
    try {
        for(let i = 0; i < negocios.length; i++){
            if (negocios[i].llave == negocio) {
                neg.edificio_salida_garaje_pos = pos;
                break;
            }
        }
    }
    catch (e) {
        logError("NEG-7", e);
    }
});

mp.events.add('negocio:establecer:interior', function (negocio, interior) {
    try {
        for(let i = 0; i < negocios.length; i++){
            if (negocios[i].llave == negocio) {
                negocios[i].interior_id = interior;
                break;
            }
        }
    }
    catch (e) {
        logError("Negocio interior", e);
    }
});
//PROPIEDADES
mp.events.add('propiedad:establecer:posicion', function (propiedad, pos) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if (propiedades[i].llave == propiedad) {
                propiedades[i].possalida = pos;
                break;
            }
        }
    }
    catch (e) { 
        logError("Propiedad posicion", e);
    }
});

mp.events.add('propiedad:establecer:posicion:inventario', function (propiedad, pos) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if (propiedades[i].llave == propiedad) {
                propiedades[i].inventario = pos;
                break;
            }
        }
    }
    catch (e) { 
        logError("Propiedad inventario", e);
    }
});

mp.events.add('propiedad:establecer:posicion:huir:interior', function (propiedad, pos) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if (propiedades[i].llave == propiedad) {
                propiedades[i].huirint = pos;
                break;
            }
        }
    }
    catch (e) {
        logError("Propiedad huir interior", e);
    }
});

mp.events.add('propiedad:establecer:posicion:huir:exterior', function (propiedad, pos) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if (propiedades[i].llave == propiedad) {
                propiedades[i].huirext = pos;
                break;
            }
        }
    }
    catch (e) { 
        logError("Propiedad huir exterior", e);
    }
});

mp.events.add('propiedad:establecer:posicion:terraza:interior', function (propiedad, pos) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if (propiedades[i].llave == propiedad) {
                propiedades[i].posintterraza = pos;
                break;
            }
        }
    }
    catch (e) {
        logError("Propiedad terraza interior", e);
     }
});

mp.events.add('propiedad:establecer:posicion:terraza:exterior', function (propiedad, pos) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if (propiedades[i].llave == propiedad) {
                propiedades[i].posextterraza = pos;
                break;
            }
        }
    }
    catch (e) { 
        logError("Propiedad terraza exterior", e);
    }
});

mp.events.add('propiedad:establecer:interior', function (propiedad, interior) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if (propiedades[i].llave == propiedad) {
                propiedades[i].interior_id = interior;
                break;
            }
        }
    }
    catch (e) {
        logError("Propiedad interior", e);
     }
});

mp.events.add('propiedad:establecer:interiorgaraje', function (propiedad, interior) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if (propiedades[i].llave == propiedad) {
                propiedades[i].interior_garaje_id = interior;
                break;
            }
        }
    }
    catch (e) {
        logError("Propiedad garaje", e);
     }
});

function esBus(vehiculo) {
    if (vehiculo === null) {
        return false;
    }
    var modelo = vehiculo.model;
    if (modelo === mp.game.joaat("airbus") || modelo === mp.game.joaat("bus") || modelo === mp.game.joaat("coach") || modelo === mp.game.joaat("rentalbus") || modelo === mp.game.joaat("tourbus")) {
        return true;
    }
    return false;
}

//Actualizamos las multas del jugador
mp.events.add("MULTAS-ADD", function (value) {
    if (value != null) {
        try {
            var multas_array_1 = JSON.parse(value);
            var multa_existe_1 = false;
            for (let i = 0, n = multas.length; i < n; i++) {
                if (multas[i].id == multas_array_1[0]) {
                    multa_existe_1 = true;
                    break;
                }
            }
            if (!multa_existe_1) {
                var obj = {
                    id: multas_array_1[0],
                    fecha: multas_array_1[1],
                    importe: multas_array_1[2],
                    razon: multas_array_1[3],
                };
                multas.push(obj);
            }
        } catch (e) {
            logError("MULTAS-1", e);
        }
    }
});
//Actualizamos los vehiculos del jugador
mp.events.add("MULTAS-DEL", function (value) {
    if (value != null) {
        for (let i = 0, n = multas.length; i < n; i++) {
            if (multas[i].id == value) {
                multas.splice(i, 1);
                break;
            }
        }
    }
});

function obtenerWaypoint() {
    let blipEncontrado = false;
    let iteradorBlip = mp.game.invoke('0x186E5D252FA50E7D');
    let primerId = mp.game.invoke('0x1BEDE233E6CD2A1F', iteradorBlip);
    let siguienteId = mp.game.invoke('0x14F96AA50D6FBEA7', iteradorBlip);
    let posicion;

    for (let i = primerId; mp.game.invoke('0xA6DB27D19ECBB7DA', i) != 0; i = siguienteId) {
        if (mp.game.invoke('0xBE9B0959FFD0779B', i) == 4) {
            posicion = mp.game.ui.getBlipInfoIdCoord(i);
            blipEncontrado = true;
        }
    }

    if (blipEncontrado) {
        return posicion;
    }

    return null;
}

mp.events.add('explosionJugador', function (jugador, tipo, rango) {
    mp.game.fire.addExplosion(jugador.position.x, jugador.position.y, jugador.position.z, tipo, rango, true, false, 2.0);
});

mp.events.add('explosion', function (posicion, tipo, rango) {
    if(typeof posicion.x === 'number' && typeof posicion.y === 'number' && typeof posicion.z === 'number'){
        mp.game.fire.addExplosion(posicion.x, posicion.y, posicion.z, tipo, rango, true, false, 2.0);
    }
});

mp.events.add('WAYPOINT', () => {
    let posicion = obtenerWaypoint();
    if (posicion != undefined && posicion != null) {
        mp.events.callRemote("establecer_waypoint", posicion.x, posicion.y);
    } else {
        mp.events.callRemote("establecer_waypoint", -1, -1);
    }
});

mp.events.add('estaEnAgua', (callback) => {
    let estaAgua = false;

    if (player_local.vehicle != undefined) {
        mp.events.callRemote(callback, "false");
        return;
    }

    if (player_local.isOnVehicle()) {
        let vehiculos = [];
        mp.vehicles.forEachInStreamRange(veh => vehiculos.push(veh));

        for (let i = 0; i < vehiculos.length; i++) {
            if (mp.game.invoke("0xEC5F66E459AF3BB2", player_local.handle, vehiculos[i].handle)) {
                if (mp.game.vehicle.isThisModelABoat(vehiculos[i].getModel())) {
                    if (mp.game.invoke("0xCFB0A0D8EDD145A3", vehiculos[i].handle)) {
                        mp.events.callRemote(callback, "true");
                        return;
                    }
                }
            }
        }
    } else {
        if (!player_local.isSwimmingUnderWater()) {
            if (player_local.isInWater()) {
                mp.events.callRemote(callback, "true");
                return;
            }
        }
    }

    mp.events.callRemote(callback, "false");
});

var skinsPedsNeg = [mp.game.joaat("s_m_y_valet_01"), mp.game.joaat("s_m_m_strvend_01"), mp.game.joaat("cs_mrk"), mp.game.joaat("ig_lifeinvad_01"), mp.game.joaat("cs_lifeinvad_01"), mp.game.joaat("ig_lifeinvad_02"), mp.game.joaat("cs_guadalope"), mp.game.joaat("u_f_y_jewelass_01"), mp.game.joaat("u_m_m_jewelthief"), mp.game.joaat("u_f_y_princess"), mp.game.joaat("u_m_y_antonb"), mp.game.joaat("cs_natalia"), mp.game.joaat("a_f_y_femaleagent"), mp.game.joaat("a_f_m_bevhills_01"), mp.game.joaat("a_m_m_bevhills_01"), mp.game.joaat("a_m_y_bevhills_01"), mp.game.joaat("a_m_y_genstreet_02"), mp.game.joaat("a_f_y_soucent_01")];

//Variables sin uso comentadas (7): edificio_entrada_rot, edificio_salida_pos, edificio_salida_rot, edificio_entrada_garaje_pos, edificio_entrada_garaje_rot, edificio_salida_garaje_rot, edificio_ascensor_rot
mp.events.add("global:negocios:add", function (array) {
    try {
        var pos_array = JSON.parse(array);
        let pedpos = new mp.Vector3(parseFloat(pos_array.pedx), parseFloat(pos_array.pedy), parseFloat(pos_array.pedz));
        if (pedpos.x != 0.0 && pedpos.y != 0.0 && pedpos.z != 0.0) {

            let skin = skinsPedsNeg[Math.floor(Math.random() * skinsPedsNeg.length)];

            if(pos_array.ped != null && pos_array.ped != "")
            {
                skin = mp.game.joaat(pos_array.ped);
            }

            let dimension = (parseInt(pos_array.interior_id) == 0 ? 0 : parseInt(pos_array.llave));

            var ped_existe = false;
            peds_negocios.forEach(function (ped) {
                if (ped.negocio == pos_array.llave)
                    ped_existe = true;
            });


            if (!ped_existe) {
                var Ped = mp.peds.new(skin, pedpos, parseFloat(pos_array.rotpedz), dimension);
                Ped.dimension = dimension;
                var objp = {
                    ped: Ped,
                    negocio: pos_array.llave,
                };
                peds_negocios.push(objp);
            }
        }

        var obj = {
            llave: parseInt(pos_array.llave), nombre: pos_array.nombre, puerta: new mp.Vector3(parseFloat(pos_array.posx), parseFloat(pos_array.posy), parseFloat(pos_array.posz)), mostrador: new mp.Vector3(parseFloat(pos_array.mostradorx), parseFloat(pos_array.mostradory), parseFloat(pos_array.mostradorz)), pedpos: new mp.Vector3(parseFloat(pos_array.pedx), parseFloat(pos_array.pedy), parseFloat(pos_array.pedz)), rotped: new mp.Vector3(parseFloat(pos_array.rotpedx), parseFloat(pos_array.rotpedy), parseFloat(pos_array.rotpedz)), tipo: parseInt(pos_array.tipo), interior_id: parseInt(pos_array.interior_id), edificio_entrada_pos: new mp.Vector3(parseFloat(pos_array.pos_entrada_x), parseFloat(pos_array.pos_entrada_y), parseFloat(pos_array.pos_entrada_z)), /*edificio_entrada_rot: new mp.Vector3(parseFloat(pos_array.rot_entrada_x), parseFloat(pos_array.rot_entrada_y), parseFloat(pos_array.rot_entrada_z)), edificio_salida_pos: new mp.Vector3(parseFloat(pos_array.pos_salida_x), parseFloat(pos_array.pos_salida_y), parseFloat(pos_array.pos_salida_z)), edificio_salida_rot: new mp.Vector3(parseFloat(pos_array.rot_salida_x), parseFloat(pos_array.rot_salida_y), parseFloat(pos_array.rot_salida_z)), edificio_entrada_garaje_pos: new mp.Vector3(parseFloat(pos_array.pos_entrada_garaje_x), parseFloat(pos_array.pos_entrada_garaje_y), parseFloat(pos_array.pos_entrada_garaje_z)), edificio_entrada_garaje_rot: new mp.Vector3(parseFloat(pos_array.rot_entrada_garaje_x), parseFloat(pos_array.rot_entrada_garaje_y), parseFloat(pos_array.rot_entrada_garaje_z)),*/ edificio_salida_garaje_pos: new mp.Vector3(parseFloat(pos_array.pos_salida_garaje_x), parseFloat(pos_array.pos_salida_garaje_y), parseFloat(pos_array.pos_salida_garaje_z)), /*edificio_salida_garaje_rot: new mp.Vector3(parseFloat(pos_array.rot_salida_garaje_x), parseFloat(pos_array.rot_salida_garaje_y), parseFloat(pos_array.rot_salida_garaje_z)),*/ edificio_garaje_dimension: parseInt(pos_array.garaje_dimension), edificio_ascensor_pos: new mp.Vector3(parseFloat(pos_array.ascensor_x), parseFloat(pos_array.ascensor_y), parseFloat(pos_array.ascensor_z)), /*edificio_ascensor_rot: new mp.Vector3(parseFloat(pos_array.ascensor_rx), parseFloat(pos_array.ascensor_ry), parseFloat(pos_array.ascensor_rz)),*/ edificio_ascensor_dimension: parseInt(pos_array.ascensor_dimension), edificio_tejado_pos: new mp.Vector3(parseFloat(pos_array.tejado_x), parseFloat(pos_array.tejado_y), parseFloat(pos_array.tejado_z)) }; negocios.push(obj);
    } catch (e) {
        logError("Negocios añadir", e);
    }
});

mp.events.add("global:multas:add", function (array) {
    try {
        var pos_array = JSON.parse(array);
        var obj = { id: parseInt(pos_array.id), fecha: pos_array.fecha, importe: parseInt(pos_array.importe), razon: pos_array.razon }; multas.push(obj);
    } catch (e) {
        logError("Multas", e);
    }
});

//Variables sin uso comentadas (4): rotpuerta,  rotsalida, rotintterraza, rotextterraza
mp.events.add("global:propiedades:add", function (array) {
    try {
        var pos_array = JSON.parse(array);
        var obj = { llave: parseInt(pos_array.llave), personaje_id: parseInt(pos_array.personaje_id), tipo: parseInt(pos_array.tipo), pospuerta: new mp.Vector3(parseFloat(pos_array.posx), parseFloat(pos_array.posy), parseFloat(pos_array.posz)), /*rotpuerta: new mp.Vector3(parseFloat(pos_array.rotx), parseFloat(pos_array.roty), parseFloat(pos_array.rotz)),*/ possalida: new mp.Vector3(parseFloat(pos_array.posx_salida), parseFloat(pos_array.posy_salida), parseFloat(pos_array.posz_salida)), /*rotsalida: new mp.Vector3(parseFloat(pos_array.rotx_salida), parseFloat(pos_array.roty_salida), parseFloat(pos_array.rotz_salida)),*/ inventario: new mp.Vector3(parseFloat(pos_array.posx_inv), parseFloat(pos_array.posy_inv), parseFloat(pos_array.posz_inv)), huirint: new mp.Vector3(parseFloat(pos_array.posx_int_huir), parseFloat(pos_array.posy_int_huir), parseFloat(pos_array.posz_int_huir)), huirext: new mp.Vector3(parseFloat(pos_array.posx_ext_huir), parseFloat(pos_array.posy_ext_huir), parseFloat(pos_array.posz_ext_huir)), posintterraza: new mp.Vector3(parseFloat(pos_array.posx_int_terraza), parseFloat(pos_array.posy_int_terraza), parseFloat(pos_array.posz_int_terraza)), /*rotintterraza: new mp.Vector3(parseFloat(pos_array.rotx_int_terraza), parseFloat(pos_array.roty_int_terraza), parseFloat(pos_array.rotz_int_terraza)),*/ posextterraza: new mp.Vector3(parseFloat(pos_array.posx_ext_terraza), parseFloat(pos_array.posy_ext_terraza), parseFloat(pos_array.posz_ext_terraza)), /*rotextterraza: new mp.Vector3(parseFloat(pos_array.rotx_ext_terraza), parseFloat(pos_array.roty_ext_terraza), parseFloat(pos_array.rotz_ext_terraza)),*/ interior_id: parseInt(pos_array.interior_id), interior_garaje_id: parseInt(pos_array.interior_garaje_id), puerta: parseInt(pos_array.puerta), alarma: parseInt(pos_array.alarma), estadoPuerta: parseInt(pos_array.estadoPuerta), abierta: "true" == pos_array.abierta, vehiculo_id: pos_array.vehiculo_id }; propiedades.push(obj);
    } catch (e) {
        logError("Propiedades añadir", e);
    }
});

mp.events.add("global:propiedades:change", function (array) {
    try {
    } catch (e) {
        logError("Propiedades cambiar", e);
    }
});

mp.events.add("global:propiedades:remove", function (id) {
    try {
        for(let i = 0; i < propiedades.length; i++){
            if(propiedades[i].id == id){
                propiedades.splice(i, 1);
            }
        }
    } catch (e) {
        logError("Propiedades eliminar", e);
    }
});

mp.events.add("global:gasolineras:add", function (array) {
    try {
        var pos_array = JSON.parse(array);
        var obj = { id: parseInt(pos_array.id), nombre: pos_array.nombre, tipo: parseInt(pos_array.tipo), tarifa: parseInt(pos_array.tarifa), marca: parseInt(pos_array.marca), posicion: new mp.Vector3(parseFloat(pos_array.posx), parseFloat(pos_array.posy), parseFloat(pos_array.posz)), surtidores: [] }; gasolineras.push(obj);
    } catch (e) {
        logError("Gasolineras", e);
    }
});

mp.events.add("global:gasolineras:surtidor:add", function (id, array) {
    try {
        var pos_array = JSON.parse(array);
        for (let i = 0, n = gasolineras.length; i < n; i++) {
            if (gasolineras[i].id == id) {
                var objs = {
                    id: parseInt(pos_array.ids),
                    electrico: pos_array.electrico,
                    posicion: new mp.Vector3(parseFloat(pos_array.posx), parseFloat(pos_array.posy), parseFloat(pos_array.posz)),
                };
                gasolineras[i].surtidores.push(objs);
                break;
            }
        }
    } catch (e) {
        logError("Surtidores", e);
    }
});

mp.events.add("global:cajeros:add", function (array) {
    try {
        var pos_array = JSON.parse(array);
        crearCajero(pos_array.id, parseFloat(pos_array.posx), parseFloat(pos_array.posy), parseFloat(pos_array.posz), 0);
    } catch (e) {
        logError("Cajeros", e);
    }
});

mp.events.add("global:senalamientos:add", matr => {
    try {
        senalamientos.push(matr);
    } catch (e) {
        logError("Senalamientos", e);
    }
});

mp.events.add("global:taxi:inicio", total => {
    try {

        mp.events.call("hud:modificar_parametro", "taxi", true);
        taxis = total;

        if(taxis == 0)
        {
            mp.events.call("hud:modificar_parametro", "taxicolor", "--red-color");
        }
        if(taxis > 0 && taxis < 5)
        {
            mp.events.call("hud:modificar_parametro", "taxicolor", "--orange-color");
        }
        if(taxis > 5)
        {
            mp.events.call("hud:modificar_parametro", "taxicolor", "--green-color");
        }

        mp.events.call("hud:modificar_parametro", "taxitotal", taxis);
    } catch (e) {
        logError("Taxi 1", e);
    }
});

mp.events.add("global:taxi:total", total => {
    try {
        taxis = total;

        if(taxis == 0)
        {
            mp.events.call("hud:modificar_parametro", "taxicolor", "--red-color");
        }
        if(taxis > 0 && taxis < 5)
        {
            mp.events.call("hud:modificar_parametro", "taxicolor", "--orange-color");
        }
        if(taxis > 5)
        {
            mp.events.call("hud:modificar_parametro", "taxicolor", "--green-color");
        }

        mp.events.call("hud:modificar_parametro", "taxitotal", taxis);
    } catch (e) {
        logError("Taxi 2", e);
    }
});

mp.events.add("global:bus:inicio", total => {
    try {
        mp.events.call("hud:modificar_parametro", "bus", true);

        buses = total;

        if(buses == 0)
        {
            mp.events.call("hud:modificar_parametro", "buscolor", "--red-color");
        }
        if(buses > 0 && buses < 2)
        {
            mp.events.call("hud:modificar_parametro", "buscolor", "--orange-color");
        }
        if(buses > 2)
        {
            mp.events.call("hud:modificar_parametro", "buscolor", "--green-color");
        }

        mp.events.call("hud:modificar_parametro", "bustotal", buses);
    } catch (e) {
        logError("Buses 1", e);
    }
});

mp.events.add("global:bus:total", total => {
    try {

        buses = total;

        if(buses == 0)
        {
            mp.events.call("hud:modificar_parametro", "buscolor", "--red-color");
        }
        if(buses > 0 && buses < 2)
        {
            mp.events.call("hud:modificar_parametro", "buscolor", "--orange-color");
        }
        if(buses > 2)
        {
            mp.events.call("hud:modificar_parametro", "buscolor", "--green-color");
        }

        mp.events.call("hud:modificar_parametro", "bustotal", buses);
    } catch (e) {
        logError("Buses 2", e);
    }
});

//Facciones
mp.events.add('general:facciones:add', function (json) {
    try {
        let array = JSON.parse(json);

        let faccion_existe = false;
        facciones.forEach(function (f) {
            if (f.id == array.id)
                faccion_existe = true;
        });
        if (!faccion_existe) {
            let obj = {
                id: array.id,
                lider: array.lider,
                nombre: array.nombre,
                descripcion: array.descripcion,
                nivel: array.nivel,
                validada: array.validada,
                verificada: array.verificada,
                tipo: array.tipo,
                color: array.color,
                imagen: array.imagen,
            };
            facciones.push(obj);
        }
    } catch (e) {
        logError("Facciones", e);
     }
});

//Facciones territorios
mp.events.add('general:facciones:territorios:add', function (json) {
    try {
        let array = JSON.parse(json);

        let territorio_existe = false;
        territorios.forEach(function (f) {
            if (f.id == array.id)
            territorio_existe = true;
        });
        if (!territorio_existe) {

            let _poligono = array.poligono.split(",");
            let poligono = [];
            for (let i = 0; i < _poligono.length; i+= 3)
            {
                poligono.push(new mp.Vector3(parseFloat(_poligono[i]), parseFloat(_poligono[i+1]), parseFloat(_poligono[i+2])));
            }

            let obj = {
                id: array.id,
                nombre: array.nombre,
                poligono: poligono,
                dimension: array.dimension,
                faccion_id: array.faccion_id,
            };
            territorios.push(obj);
        }
        
    } catch (e) { 
        logError("Facciones territorios", e);
    }
});

mp.events.add("posiciones:ped:robarvehiculos", function (datos) {
    try {
        posiciones_ped_robar_vehiculo.push(datos);
    } catch (e) {
        logError("PEDS-6", e);
    }
})

// let radares_chunksCodigoEsperados = 0;
// let radares_codigoClienteRecibido = "";
// let radares_chunksCodigoRecibidos = 0;
// mp.events.add('radares:obtener', (chunk) => {
//     if (radares_chunksCodigoEsperados <= 0) {
//         radares_chunksCodigoEsperados = chunk;
//     } else {
//         radares_chunksCodigoRecibidos++;
//         radares_codigoClienteRecibido += chunk;

//         if (radares_chunksCodigoRecibidos == radares_chunksCodigoEsperados) {
//             let temp_radares = JSON.parse(radares_codigoClienteRecibido)
//             for (let temp_radar of temp_radares) {
//                 radares.push({
//                     nombre: temp_radar.nombre,
//                     tipo: temp_radar.tipo,
//                     radar: new mp.Vector3(temp_radar.radar_pos[0], temp_radar.radar_pos[1], temp_radar.radar_pos[2]),
//                     radarRot: temp_radar.radar_rot,
//                     final: new mp.Vector3(temp_radar.final_pos[0], temp_radar.final_pos[1], temp_radar.final_pos[2]),
//                     señal: new mp.Vector3(temp_radar.senal_pos[0], temp_radar.senal_pos[1], temp_radar.senal_pos[2]),
//                     señalRot: temp_radar.senal_rot,
//                     limite: temp_radar.limite
//                 })
//             }
//         }
//     }
// });

/**
 * Evento para tirar un objeto del inventario según su SQLID
 * @param {number} sqlid_objeto SQLID del objeto
 * @param {boolean} notificar Define si el servidor mostrará el /me de tirar el objeto o no
 */
mp.events.add("tirar_obj_sqlid", async (sqlid_objeto, notificar = false, pararAnimacion = false) => {
    let grados = 1.39626; // Radianes de rotacion segun el asiento ocupado
    let dimCorrecta = 0.2; // Ajuste a sumar segun el asiento ocupado
    if (player_local.vehicle) {
        let puedeTirar = puedeTirarObjeto();
        if (!puedeTirar.puede) {
            if (puedeTirar.grados != 0) {
                mostrarAviso("danger", 4000, "Tu puerta y ventanilla están cerradas");
            }
            else {
                mostrarAviso("danger", 4000, "No puedes tirar objetos desde tu asiento");
            }
            return;
        }
        grados = puedeTirar.grados;
        dimCorrecta = puedeTirar.ajusteDim;
    }

    let modelo = null; // Modelo del objeto
    for (let i = 0, n = inventario.length; i < n; i++) {
        if (inventario[i].id == sqlid_objeto) {
            modelo = inventario[i].modeloTirar;
            break;
        }
    }

    // Posicion y rotacion por defecto
    let position = player_local.getCoords(true); // .position no, si no se mueve tras conectar .position = (0,0,0)
    let posObj = new mp.Vector3(position.x, position.y, position.z - 0.9);
    let rotObj = new mp.Vector3(0.0, 0.0, 0.0);

    // Si el modelo existe creamos el objeto temporal y realizamos las comprobaciones, en caso contrario mandamos la posicion y rotacion por defecto
    if (modelo && modelo != -1 && modelo != 0) {
        let objeto = null; // Objeto temporal

        // Calculamos posicion "aleatoria" detras del jugador
        let posDetras = new mp.Vector3(position.x - 5.0, position.y - 5.0, position.z - 5.0);

        // Cargamos las colisiones del modelo en caso de no tenerlas ya cargadas
        if (!mp.game.streaming.hasModelLoaded(modelo)) {
            mp.game.streaming.requestModel(modelo);
            let count = 0;
            while (!mp.game.streaming.hasModelLoaded(modelo)) {
                count++;
                if (count >= 40) {
                    break;
                }
                await mp.game.waitAsync(10);
            }
        }

        // Creamos el objeto temporal con alpha 0
        objeto = mp.objects.new(modelo, posDetras,
            {
                rotation: rotObj,
                alpha: 0,
                dimension: player_local.dimension
            });

        // Intervalo de 5ms, una vez el objeto existe realiza los calculos, en caso contrario a la vuelta 8 corta el intervalo y manda valores por defecto
        let counter = 0;
        let intervalo_objeto = setInterval(() => {
            if (objeto && mp.objects.exists(objeto) && typeof objeto.handle === "number" && objeto.handle != 0) {
                clearInterval(intervalo_objeto);
                intervalo_objeto = null;

                position = player_local.getCoords(true);
                position.z = position.z + 0.7; // Para permitir dejar objetos por encima de la cintura sin sobrepasar la altura del personaje
                let direction = player_local.getForwardVector();

                // Si esta en un vehiculo rotamos el punto de tirado los grados adecuados segun su asiento
                if (player_local.vehicle) {
                    let dimCar = mp.game.gameplay.getModelDimensions(player_local.vehicle.model);
                    if (dimCar != undefined && dimCar != null) {
                        dimCorrecta += Math.abs(dimCar.max.x); // Dimension predefinida segun asiento + ancho maximo del vehiculo
                    }
                    else {
                        dimCorrecta += 0.5;
                    }

                    let directionAux = new mp.Vector3(direction.x * Math.cos(grados) - direction.y * Math.sin(grados), direction.x * Math.sin(grados) + direction.y * Math.cos(grados), direction.z);
                    var posEnfrente = new mp.Vector3((directionAux.x * dimCorrecta) + (position.x), (directionAux.y * dimCorrecta) + (position.y), (directionAux.z * dimCorrecta) + (position.z));

                    // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                    let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                    if (raycastPared != undefined) {
                        mostrarAviso("danger", 4000, "No hay espacio suficiente para tirar el objeto");

                        limpiarHandleRaycast(raycastPared.entity);
                        return;
                    }
                }
                else {
                    let distTirar = 0.5;
                    if (player_local.hasVariable("ANIMACION")) {
                        let animTirar = player_local.getVariable("ANIMACION");
                        if (animTirar != null && animTirar[0] == 0 && animTirar[1] == "idle" && animTirar[2] == "anim@heists@box_carry@") {
                            distTirar = 0.8;
                            comprobacionEstricta = true;
                        }
                    }

                    var posEnfrente = new mp.Vector3((direction.x * distTirar) + (position.x), (direction.y * distTirar) + (position.y), (direction.z * distTirar) + (position.z));

                    // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                    let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                    if (raycastPared != undefined) {
                        mostrarAviso("danger", 4000, "No hay espacio suficiente para tirar el objeto");

                        limpiarHandleRaycast(raycastPared.entity);
                        return;
                    }
                }

                // Como tiene espacio para tirar objeto le damos margen para calcular la altura final del objeto
                posEnfrente.z = posEnfrente.z + 0.2;

                // Raycast desde la posicion frente al jugador hasta la misma posicion con altura 0.0
                var raycast = mp.raycasting.testPointToPoint(posEnfrente, new mp.Vector3(posEnfrente.x, posEnfrente.y, posEnfrente.z - 1000.0), objeto, 19); // Colision con mapa, vehiculos y objetos
                let tipoColision = -1;
                let posColision = null;
                if (raycast) { // Ha tocado algo
                    objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                    let entidad = raycast.entity;
                    if (entidad != undefined && entidad != null) { // El resultado es válido
                        let tipo = entidad.type;
                        switch (tipo) {
                            case 'vehicle': // colision con vehiculo
                                tipoColision = 0;
                                posColision = raycast.position;
                                break;
                            case 'object': // colision con objeto
                                tipoColision = 1;
                                posColision = raycast.position;
                                break;
                            default:
                                if (tipo == undefined || tipo == null) { // colision con mapa
                                    tipoColision = 2;
                                    posColision = raycast.position;
                                    limpiarHandleRaycast(entidad);
                                }
                                break;
                        }
                    }
                }
                else {
                    objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                }

                objeto.placeOnGroundProperly();
                let pos = objeto.getCoords(true); // Necesario para actualizar la posicion
                let rot = objeto.getRotation(2); // Necesario para actualizar la rotacion
                objeto.position = new mp.Vector3(pos.x, pos.y, pos.z);
                objeto.rotation = new mp.Vector3(rot.x, rot.y, rot.z);

                posObj = objeto.position;
                rotObj = objeto.rotation;

                // Si el raycast nos ha dado una colision valida realizamos sus comprobaciones
                if (tipoColision != -1) {
                    // Obtenemos altura del objeto por debajo de su eje
                    let dimZ = 0.0;
                    let dimensiones = mp.game.gameplay.getModelDimensions(modelo);
                    if (dimensiones != undefined && dimensiones != null) {
                        dimZ = Math.abs(dimensiones.min.z);
                    }

                    switch (tipoColision) {
                        case 0: // vehiculo
                            posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ + 0.015); // + margen error por colisiones del vehiculo
                            rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                            break;
                        case 1: // objeto
                            let aux1 = posColision.z - objeto.position.z;
                            // Si el raycast esta ligeramente mas alto que la posicion del objeto (ej: tirar el objeto sobre un prop con las colisiones rotas)
                            if (aux1 > 0.1) {
                                posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                            }
                            break;
                        case 2: // mapa
                            let aux2 = posColision.z - objeto.position.z;
                            // Si el raycast esta mucho mas bajo que la posicion del objeto (ej: tirar el objeto de un puente)
                            // O si el raycast esta ligeramente mas alto que el objeto (ej: tirar el objeto sobre algo sin colisiones, coches oxidados de los canales de la mesa)
                            if (aux2 > 0.2 || aux2 < -0.6) {
                                posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                            }
                            break;
                        default:
                            break;
                    }
                }

                // Eliminamos el objeto temporal
                objeto.destroy();

                // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                    calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                    let posAux = player_local.getCoords(true);

                    posObj.x = posAux.x;
                    posObj.y = posAux.y;
                }
                mp.events.callRemote("tirar_objeto_calculado", sqlid_objeto, posObj, rotObj, notificar, pararAnimacion);
                return;
            }
            else {
                counter++;
                if (counter > 7) { // +- 75ms
                    clearInterval(intervalo_objeto);
                    intervalo_objeto = null;

                    // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                    if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                        calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                        let posAux = player_local.getCoords(true);

                        posObj.x = posAux.x;
                        posObj.y = posAux.y;
                    }
                    mp.events.callRemote("tirar_objeto_calculado", sqlid_objeto, posObj, rotObj, notificar, pararAnimacion);
                    return;
                }
            }
        }, 10);
    }
    else {
        // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
        if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 && 
            calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
            let posAux = player_local.getCoords(true);

            posObj.x = posAux.x;
            posObj.y = posAux.y;
        }
        mp.events.callRemote("tirar_objeto_calculado", sqlid_objeto, posObj, rotObj, notificar, pararAnimacion);
    }
});

/**
 * Evento para tirar un objeto nuevo que no está en el inventario
 * 
 * @param {number} modelo Hash numérico del objeto
 */
mp.events.add("tirar_obj_modelo", async (modelo, tipoObjeto, cantidad = -1) => {
    let grados = 1.39626; // Radianes de rotacion segun el asiento ocupado
    let dimCorrecta = 0.2; // Ajuste a sumar segun el asiento ocupado
    if (player_local.vehicle) {
        let puedeTirar = puedeTirarObjeto(true);

        grados = puedeTirar.grados;
        dimCorrecta = puedeTirar.ajusteDim;
    }

    // Posicion y rotacion por defecto
    let position = player_local.getCoords(true); // .position no, si no se mueve tras conectar .position = (0,0,0)
    let posObj = new mp.Vector3(position.x, position.y, position.z - 0.9);
    let rotObj = new mp.Vector3(0.0, 0.0, 0.0);

    // Si el modelo existe creamos el objeto temporal y realizamos las comprobaciones, en caso contrario mandamos la posicion y rotacion por defecto
    if (modelo && modelo != -1 && modelo != 0) {
        let objeto = null; // Objeto temporal

        // Calculamos posicion "aleatoria" detras del jugador
        let posDetras = new mp.Vector3(position.x - 5.0, position.y - 5.0, position.z - 5.0);

        // Cargamos las colisiones del modelo en caso de no tenerlas ya cargadas
        if (!mp.game.streaming.hasModelLoaded(modelo)) {
            mp.game.streaming.requestModel(modelo);
            let count = 0;
            while (!mp.game.streaming.hasModelLoaded(modelo)) {
                count++;
                if (count >= 40) {
                    break;
                }
                await mp.game.waitAsync(10);
            }
        }

        // Creamos el objeto temporal con alpha 0
        objeto = mp.objects.new(modelo, posDetras,
            {
                rotation: rotObj,
                alpha: 0,
                dimension: player_local.dimension
            });

        // Intervalo de 5ms, una vez el objeto existe realiza los calculos, en caso contrario a la vuelta 8 corta el intervalo y manda valores por defecto
        let counter = 0;
        let intervalo_objeto = setInterval(() => {
            if (objeto && mp.objects.exists(objeto) && typeof objeto.handle === "number" && objeto.handle != 0) {
                clearInterval(intervalo_objeto);
                intervalo_objeto = null;

                position = player_local.getCoords(true);
                position.z = position.z + 0.7; // Para permitir dejar objetos por encima de la cintura sin sobrepasar la altura del personaje
                let direction = player_local.getForwardVector();

                // Si esta en un vehiculo rotamos el punto de tirado los grados adecuados segun su asiento
                if (player_local.vehicle) {
                    let dimCar = mp.game.gameplay.getModelDimensions(player_local.vehicle.model);
                    if (dimCar != undefined && dimCar != null) {
                        dimCorrecta += Math.abs(dimCar.max.x); // Dimension predefinida segun asiento + ancho maximo del vehiculo
                    }
                    else {
                        dimCorrecta += 0.5;
                    }

                    let directionAux = new mp.Vector3(direction.x * Math.cos(grados) - direction.y * Math.sin(grados), direction.x * Math.sin(grados) + direction.y * Math.cos(grados), direction.z);
                    var posEnfrente = new mp.Vector3((directionAux.x * dimCorrecta) + (position.x), (directionAux.y * dimCorrecta) + (position.y), (directionAux.z * dimCorrecta) + (position.z));

                    // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                    let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                    if (raycastPared != undefined) {
                        position = player_local.getCoords(true);
                        posObj = new mp.Vector3(position.x, position.y, position.z - 0.9);
                        rotObj = new mp.Vector3(0.0, 0.0, 0.0);

                        mp.events.callRemote("tirar_nuevo_objeto", tipoObjeto, posObj, rotObj, cantidad);

                        limpiarHandleRaycast(raycastPared.entity);
                        return;
                    }
                }
                else {
                    var posEnfrente = new mp.Vector3((direction.x * 0.5) + (position.x), (direction.y * 0.5) + (position.y), (direction.z * 0.5) + (position.z));

                    // Si el raycast toca una pared significa que no hay el espacio suficiente como para tirar el objeto
                    let raycastPared = mp.raycasting.testPointToPoint(position, posEnfrente, objeto, 1);
                    if (raycastPared != undefined) {
                        position = player_local.getCoords(true);
                        posObj = new mp.Vector3(position.x, position.y, position.z - 0.9);
                        rotObj = new mp.Vector3(0.0, 0.0, 0.0);

                        mp.events.callRemote("tirar_nuevo_objeto", tipoObjeto, posObj, rotObj, cantidad);

                        limpiarHandleRaycast(raycastPared.entity);
                        return;
                    }
                }

                // Como tiene espacio para tirar objeto le damos margen para calcular la altura final del objeto
                posEnfrente.z = posEnfrente.z + 0.2;

                // Raycast desde la posicion frente al jugador hasta la misma posicion con altura 0.0
                var raycast = mp.raycasting.testPointToPoint(posEnfrente, new mp.Vector3(posEnfrente.x, posEnfrente.y, posEnfrente.z - 1000.0), objeto, 19); // Colision con mapa, vehiculos y objetos
                let tipoColision = -1;
                let posColision = null;
                if (raycast) { // Ha tocado algo
                    objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                    let entidad = raycast.entity;
                    if (entidad != undefined && entidad != null) { // El resultado es válido
                        let tipo = entidad.type;
                        switch (tipo) {
                            case 'vehicle': // colision con vehiculo
                                tipoColision = 0;
                                posColision = raycast.position;
                                break;
                            case 'object': // colision con objeto
                                tipoColision = 1;
                                posColision = raycast.position;
                                break;
                            default:
                                if (tipo == undefined || tipo == null) { // colision con mapa
                                    tipoColision = 2;
                                    posColision = raycast.position;
                                    limpiarHandleRaycast(entidad);
                                }
                                break;
                        }
                    }
                }
                else {
                    objeto.position = posEnfrente; // Actualizamos la posicion del objeto (si la persona va corriendo esto se nota)
                }

                objeto.placeOnGroundProperly();
                let pos = objeto.getCoords(true); // Necesario para actualizar la posicion
                let rot = objeto.getRotation(2); // Necesario para actualizar la rotacion
                objeto.position = new mp.Vector3(pos.x, pos.y, pos.z);
                objeto.rotation = new mp.Vector3(rot.x, rot.y, rot.z);

                posObj = objeto.position;
                rotObj = objeto.rotation;

                // Si el raycast nos ha dado una colision valida realizamos sus comprobaciones
                if (tipoColision != -1) {
                    // Obtenemos altura del objeto por debajo de su eje
                    let dimZ = 0.0;
                    let dimensiones = mp.game.gameplay.getModelDimensions(modelo);
                    if (dimensiones != undefined && dimensiones != null) {
                        dimZ = Math.abs(dimensiones.min.z);
                    }

                    switch (tipoColision) {
                        case 0: // vehiculo
                            posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ + 0.015); // + margen error por colisiones del vehiculo
                            rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                            break;
                        case 1: // objeto
                            let aux1 = posColision.z - objeto.position.z;
                            // Si el raycast esta ligeramente mas alto que la posicion del objeto (ej: tirar el objeto sobre un prop con las colisiones rotas)
                            if (aux1 > 0.1) {
                                posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                            }
                            break;
                        case 2: // mapa
                            let aux2 = posColision.z - objeto.position.z;
                            // Si el raycast esta mucho mas bajo que la posicion del objeto (ej: tirar el objeto de un puente)
                            // O si el raycast esta ligeramente mas alto que el objeto (ej: tirar el objeto sobre algo sin colisiones, coches oxidados de los canales de la mesa)
                            if (aux2 > 0.2 || aux2 < -0.6) {
                                posObj = new mp.Vector3(objeto.position.x, objeto.position.y, posColision.z + dimZ);
                                rotObj = new mp.Vector3(0.0, 0.0, 0.0);
                            }
                            break;
                        default:
                            break;
                    }
                }

                // Eliminamos el objeto temporal
                objeto.destroy();

                // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                    calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                    let posAux = player_local.getCoords(true);

                    posObj.x = posAux.x;
                    posObj.y = posAux.y;
                }
                mp.events.callRemote("tirar_nuevo_objeto", tipoObjeto, posObj, rotObj, cantidad);
                return;
            }
            else {
                counter++;
                if (counter > 7) { // +- 75ms
                    clearInterval(intervalo_objeto);
                    intervalo_objeto = null;

                    // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
                    if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
                        calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
                        let posAux = player_local.getCoords(true);

                        posObj.x = posAux.x;
                        posObj.y = posAux.y;
                    }
                    mp.events.callRemote("tirar_nuevo_objeto", tipoObjeto, posObj, rotObj, cantidad);
                    return;
                }
            }
        }, 10);
    }
    else {
        // Si por algun motivo el objeto esta muy cerca de 0,0,x y el jugador esta lejos del objeto, igualamos la posicion a la del jugador
        if (calcDist(new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) < 3.0 &&
            calcDist(new mp.Vector3(position.x, position.y, 0.0), new mp.Vector3(posObj.x, posObj.y, 0.0)) > 3.0) {
            let posAux = player_local.getCoords(true);

            posObj.x = posAux.x;
            posObj.y = posAux.y;
        }
        mp.events.callRemote("tirar_nuevo_objeto", tipoObjeto, posObj, rotObj, cantidad);
    }
});

mp.events.add("playerWeaponShot", (pos, entidad) => {
    let SQLDIdObjeto;
    switch (player_local.weapon) {
        case 2481070269: // Granada
            SQLDIdObjeto = [221, 1682];
            break;
        case 2694266206: // Gas lacrimógeno
            SQLDIdObjeto = [36, 1683];
            break;
        case 615608432: // Molotov
            SQLDIdObjeto = [11, 1684];
            break;
        case 741814745: // Mina con detonador
            SQLDIdObjeto = [222, 1685];
            break;
        case 2874559379: // Mina de aproximación
            SQLDIdObjeto = [220, 1686];
            break;
        case 126349499: // Bola de nieve
            SQLDIdObjeto = [214];
            break;
        case 3125143736: // Bomba casera
            SQLDIdObjeto = [254, 1687];
            break;
        case 600439132: // Pelota de baseball
            SQLDIdObjeto = [1103];
            break;
        case 4256991824: // Granada de humo
            SQLDIdObjeto = [49, 1688];
            break;
        case 1233104067: // Bengala
            SQLDIdObjeto = [18, 1689];
            break;
        case 101631238: // Extintor
            return;
        default:
            SQLDIdObjeto = null;
            break;
    }

    if (SQLDIdObjeto != null) {
        armaActiva.id = 0;
        armaActiva.tipoObjeto = 0;
        armaActiva.cantidad = 0;
        bloqueado = false;
        guardado = true;
        mp.events.callRemote('armas:borrar_arma_lanzada', JSON.stringify(SQLDIdObjeto));
    }

    let v = 0.03;
    let dp = 0.2;
    // let dy = (Math.random() * 0.1).toFixed(2);
    let t = mp.game.weapon.getWeapontypeGroup(player_local.weapon);

    switch (t) {
        case 860033945:
            v += 0.12;
            dp += 0.2;
            break;
        case 3082541095:
            v += 0.3;
            dp += 0.5;
            break;
        case 2725924767:
            v += 0.3;
            dp = 0.05;
            break;
        case 1548507267:
            v = dp = 0;
            break;
        case 2685387236:
            v = dp = 0;
            break;
    }

    mp.game.invoke("0xFD55E49555E017CF", "SMALL_EXPLOSION_SHAKE", v);

    // let p = mp.game.cam.getGameplayCamRelativeHeading();
    // if(player_local.vehicle) mp.game.cam.setGameplayCamRelativePitch(p + 2.5 + dp + ((player_local.vehicle.getSpeed() * 3.6)/100), 1.0);
    // else mp.game.cam.setGameplayCamRelativePitch(p + dp, 1.0);

    let p = mp.game.cam.getGameplayCamRot(0);
    if (player_local.vehicle) mp.game.cam.setGameplayCamRelativePitch(p.x + 2.3 + dp + ((player_local.vehicle.getSpeed() * 3.6)/100), 1.0);
    else mp.game.cam.setGameplayCamRelativePitch(p.x + dp, 1.0);


    //if (mp.game.invoke("0x8D4D46230B2C353A") != 4) mp.game.cam.setGameplayCamRawYaw(p.z + dy);
});

/**
 * Devuelve si un jugador puede tirar un objeto desde su asiento en un vehiculo, los radianes de rotacion para calcular la posicion del objeto y el ajuste de suma necesario
 * 
 * @param {boolean} ignorar Define si el cliente ignora el estado de las puertas y ventanillas (abiertas o cerradas)
 */
function puedeTirarObjeto(ignorar = false) {
    if (player_local.vehicle) {
        let puedeTirar = false;
        let gradosRot = 1.39626; // 80 - Representacion en radianes
        let ajuste = 0.2; // Para ajustar bien las posiciones de los asientos traseros

        let claseVehiculo = player_local.vehicle.getClass()
        if (claseVehiculo == 8 || claseVehiculo == 13 || claseVehiculo == 22) { // Si es bici, moto o open wheel
            puedeTirar = true;
        }
        else {
            let asiento = null;
            for (let i = 0; i < 4; i++) {
                if (player_local.vehicle.getPedInSeat(i - 1) == player_local.handle) {
                    asiento = i - 1;
                    break;
                }
            }

            if (asiento != null && player_local.vehicle.propiedades) {
                let puertasJson = player_local.vehicle.propiedades.puertas;
                if (puertasJson === undefined) {
                    puertasJson = [0, 0, 0, 0]; // Por defecto tomamos todas las puertas como cerradas
                }
                let ventanillasDel = 3; // Por defecto tomamos las ventanillas como abiertas
                let ventanillasTra = 3;
                if (sinVentanas.indexOf(player_local.vehicle.getClass()) == -1) {
                    ventanillasDel = player_local.vehicle.propiedades.ventanillas_del;
                    ventanillasTra = player_local.vehicle.propiedades.ventanillas_tra;
                }

                // Dependiendo del asiento ocupado comprobamos si su puerta o ventanilla estan abiertas
                switch (asiento) {
                    case -1:
                        if (ignorar == true) {
                            puedeTirar = true;
                            gradosRot = 1.39626; // 80
                            ajuste = 0.2;
                        }
                        else if (puertasJson[0] == 1 || puertasJson[0] == 3 || ventanillasDel == 1 || ventanillasDel == 3) {
                            puedeTirar = true;
                            gradosRot = 1.39626; // 80
                            ajuste = 0.2;
                        }
                        break;
                    case 1:
                        if (ignorar == true) {
                            puedeTirar = true;
                            gradosRot = 2.18166; // 125
                            ajuste = 0.43;
                        }
                        else if (puertasJson[1] == 1 || puertasJson[1] == 3 || ventanillasTra == 1 || ventanillasTra == 3) {
                            puedeTirar = true;
                            gradosRot = 2.18166; // 125
                            ajuste = 0.43;
                        }
                        break;
                    case 0:
                        if (ignorar == true) {
                            puedeTirar = true;
                            gradosRot = 4.88692; // 280
                            ajuste = 0.2;
                        }
                        else if (puertasJson[0] == 2 || puertasJson[0] == 3 || ventanillasDel == 2 || ventanillasDel == 3) {
                            puedeTirar = true;
                            gradosRot = 4.88692; // 280
                            ajuste = 0.2;
                        }
                        break;
                    case 2:
                        if (ignorar == true) {
                            puedeTirar = true;
                            gradosRot = 4.10152; // 235
                            ajuste = 0.43;
                        }
                        else if (puertasJson[1] == 2 || puertasJson[1] == 3 || ventanillasTra == 2 || ventanillasTra == 3) {
                            puedeTirar = true;
                            gradosRot = 4.10152; // 235
                            ajuste = 0.43;
                        }
                        break;
                    default:
                        puedeTirar = false;
                        grados = 0;
                        ajuste = 0;
                        break;
                }
            }
        }

        return { puede: puedeTirar, grados: gradosRot, ajusteDim: ajuste};
    }
    else {
        return { puede: false, grados: 0, ajusteDim: 0};
    }
}

/**
 * Devuelve si un vehiculo tiene el maletero delante o detras
 * True - Delante, False - Detras
 * 
 * @param {number} modelo Modelo del vehiculo
 * @returns {boolean} True - Delante, False - Detras
 */
function posicionMaletero(modelo) {
    /* Vehiculos con maletero delante:
     * ardent, cheetah2, ninef2, ruston, comet6, comet7, comet4, comet3, coquette4, deveste
     * zorrusso, gp1, krieger, nero, nero2, osiris, pfister811, prototipo, sc1, t20
     * tempesta, thrax, tigon, turismor, tyrant, vagner, xa21, infernus2, stromberg, torero
     * turismo2, viseris, adder, autarch, cheetah, cyclone, entity2, vagrant, ignus, zeno
     * tenf, tenf2, torero2, corsita, lm87, weevil2, brioso2, brioso3
     */
    switch (modelo) {
        case 159274291: case 223240013: case 2833484545: case 719660200: case 2568944644: case 1141395928: case 1561920505: case 2272483501: case 2566281822: case 1591739866:
        case 3612858749: case 1234311532: case 3630826055: case 1034187331: case 1093792632: case 1987142870: case 2465164804: case 2123327359: case 1352136073: case 1663218586:
        case 272929391: case 1044193113: case 2936769864: case 408192225: case 3918533058: case 1939284556: case 917809321: case 2889029532: case 886810209: case 1504306544:
        case 3312836369: case 3903371924: case 3078201489: case 3981782132: case 2983812512: case 1392481335: case 2174267100: case 740289177: case 2850852987: case 655665811:
        case 3400983137: case 274946574: case 4129572538: case 3540279623: case 4284049613: case 3300595976: case 1429622905: case 15214558:
            return true;
        default:
            return false;
    }
}

var dentro_surtidor = null;
var dentro_cajeros = null;
var dentro_propiedades = null;
var dentro_ascensor = null;
var dentro_ped_robar_veh = null;

var textlabel_surtidor = null;
var textlabel_cajeros = null;
var textlabel_propiedades = null;
var textlabel_ascensor = null;

// Variables especificas para funcionamiento en ascensores
var distancia_botonera = null;
var posicion_botonera = null;
let ascensorEnElQueEstamos = "";
var menu_abierto_FIB1 = false;
var menu_abierto_FIB2 = false;
let menu_abierto_Comisaria_Vespucci_1 = false;
let menu_abierto_Comisaria_RockfordHills = false;

var controlador = 0;
var distancia_anterior = new mp.Vector3(0, 0, 0);
var desactivarMarkersInventario = false;
/* Switch para evitar ejecutar bucles innecesarios
 * 0 - Nada (crear)
 * 1 - en Cajero (borrar)
 * 2 - en Surtidor (borrar)
 * 3 - en Propiedad (borrar)
 * 4 - en Ascensor FIB (borrar)
 * 5 - cerca de ped de robo de vehiculos (evitar notificar multiples veces)
 * 
 * Si acabas de crear un marker directamente te saltas los demás bucles.
 * Cuando ya hay marker creado solo ejecutas la parte de su borrado. 
*/
setInterval(() => {
    if(!purga)
    {
        if (desactivarMarkersInventario) {// No podemos crear markers con el CEF del inventario activo, porque lo rukamos
            if (textlabel_cajeros != null) { //1
                if (mp.markers.exists(textlabel_cajeros))
                    textlabel_cajeros.destroy();
                textlabel_cajeros = null;
            }

            if (textlabel_surtidor != null) { //2
                if (mp.markers.exists(textlabel_surtidor))
                    textlabel_surtidor.destroy();
                textlabel_surtidor = null;
            }

            if (textlabel_propiedades != null) { //3
                if (mp.markers.exists(textlabel_propiedades))
                    textlabel_propiedades.destroy();
                textlabel_propiedades = null;
            }

            if (textlabel_ascensor != null) { // 6
                if (mp.markers.exists(textlabel_ascensor))
                    textlabel_ascensor.destroy();
                textlabel_ascensor = null;
            }

            controlador = 0;
            return; 
        }

        switch (controlador) {
            case 0: // Crear nuevo marker
                // Cajeros en distintas dimensiones, si no estamos en 0 no comprobamos casas, gasolineras ni ascensores
                for (let i = 0, n = cajeros.length; i < n; i++) {
                    if (calcDist(player_local.position, cajeros[i].posicion) <= 2) {
                        if (textlabel_cajeros != null) {
                            if (mp.markers.exists(textlabel_cajeros))
                                textlabel_cajeros.destroy();
                        }

                        textlabel_cajeros = mp.markers.new(29, new mp.Vector3(cajeros[i].posicion.x, cajeros[i].posicion.y, cajeros[i].posicion.z), 0.90,
                            {
                                color: [90, 210, 0, 100],
                                visible: true,
                                dimension: player_local.dimension
                            });
                        dentro_cajeros = cajeros[i].posicion;
                        controlador = 1;
                        //mostrarAviso("fixed", 5000, "Pulsa la tecla E mirando al cajero");
                        mp.events.call("hud:notykey", `[{"tecla": "E", "texto": "Pulsa mirando al cajero"}]`);
                        mp.events.call("hud:mostrar_notykey", true);
                        break;
                    }
                }

                // Si no está interactuando con la planta, le creamos la notiicacion de la tecla E (Plantas en distintas dimensiones)
                if (typeof interactuandoConPlanta === 'boolean' && !interactuandoConPlanta) {
                    for (let i = 0, n = plantas.length; i < n; i++) {
                        if (calcDist(player_local.position, plantas[i].posicion) <= (distanciaPermitidaEntrePlantayPlanta / 2)) {
                            cercaPlantaId = plantas[i].id;
                            controlador = 6;
                            mp.events.call("hud:notykey", `[{"tecla": "E", "texto": "Pulsa mirando a la planta/semilla"}]`);
                            mp.events.call("hud:mostrar_notykey", true);
                            break;
                        }
                    }
                }

                
                if (player_local.dimension == 0) {
                    if (controlador != 0) return;
                    for (let i = 0, n = posiciones_ped_robar_vehiculo.length; i < n; i++) {
                        if (calcDist(player_local.position, posiciones_ped_robar_vehiculo[i]) <= 2.5) {
                            dentro_ped_robar_veh = posiciones_ped_robar_vehiculo[i];
                            controlador = 5;
                            mp.events.call("hud:notykey", `[{"tecla": "E", "texto": "Pulsa E mirando al NPC para interactuar"}]`);
                            mp.events.call("hud:mostrar_notykey", true);
                            break;
                        }
                    }

                    if (controlador != 0) return; // Si lo he creado no sigo
                    for (let i = 0, n = gasolineras.length; i < n; i++) {
                        for (let j = 0, m = gasolineras[i].surtidores.length; j < m; j++) {
                            if (calcDist(player_local.position, gasolineras[i].surtidores[j].posicion) <= 2.5) {
                                if (textlabel_surtidor != null) {
                                    if (mp.markers.exists(textlabel_surtidor))
                                        textlabel_surtidor.destroy();
                                }

                                let getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(gasolineras[i].surtidores[j].posicion.x, gasolineras[i].surtidores[j].posicion.y, gasolineras[i].surtidores[j].posicion.z, parseFloat(0), false);
                                textlabel_surtidor = mp.markers.new(25, new mp.Vector3(gasolineras[i].surtidores[j].posicion.x, gasolineras[i].surtidores[j].posicion.y, getGroundZ + 0.1), 1.3,
                                    {
                                        color: [51, 204, 51, 100],
                                        visible: true,
                                        dimension: 0
                                    });
                                dentro_surtidor = gasolineras[i].surtidores[j].posicion;
                                controlador = 2;
                                //mostrarAviso("fixed", 5000, "Pulsa la tecla E mirando al surtidor");
                                mp.events.call("hud:notykey", `[{"tecla": "E", "texto": "Pulsa mirando al surtidor fuera del vehículo"}]`);
                                mp.events.call("hud:mostrar_notykey", true);
                                break;
                            }
                        }
                        if (controlador == 2) break;
                    }

                    if (controlador != 0) return; // Si lo he creado no sigo
                    for (let i = 0, n = ascensores.length; i < n; i++)
                    {
                        if (ascensores[i].ubicacion == "FIB1" || ascensores[i].ubicacion == "FIB2")
                        {
                            if (calcDist(player_local.position, ascensores[i].ascensor_centro) <= 1.6)
                            {
                                if (textlabel_ascensor != null)
                                {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                distancia_botonera = new mp.Vector3(ascensores[i].ascensor_botonera.x, ascensores[i].ascensor_botonera.y, player_local.position.z);
                                textlabel_ascensor = mp.markers.new(20, new mp.Vector3(ascensores[i].ascensor_botonera.x, ascensores[i].ascensor_botonera.y, ascensores[i].ascensor_botonera.z - 0.35), 0.50,
                                    {
                                        color: [0, 120, 255, 255],
                                        visible: true,
                                        dimension: 0
                                    });
                                mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);

                                controlador = 4;
                                dentro_ascensor = ascensores[i].ascensor_centro;
                                posicion_botonera = ascensores[i].ascensor_botonera;
                                ascensorEnElQueEstamos = "FIB";

                                // No mando aviso si cambia de planta pero se queda dentro del ascensor (distinta altura, misma X e Y)
                                //if (distancia_botonera.z != distancia_anterior.z && distancia_botonera.x == distancia_anterior.x && distancia_botonera.y == distancia_anterior.y) return;
                                break;
                            }
                        }
                        else if (ascensores[i].ubicacion == "Comisaria Vespucci 1" || ascensores[i].ubicacion == "Comisaria Vespucci 2")
                        {
                            if (calcDist(player_local.position, ascensores[i].ascensor_centro) <= 1.9)
                            {
                                if (textlabel_ascensor != null)
                                {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                distancia_botonera = new mp.Vector3(ascensores[i].ascensor_botonera.x, ascensores[i].ascensor_botonera.y, player_local.position.z);
                                textlabel_ascensor = mp.markers.new(20, new mp.Vector3(ascensores[i].ascensor_botonera.x, ascensores[i].ascensor_botonera.y, ascensores[i].ascensor_botonera.z - 0.35), 0.50,
                                    {
                                        color: [0, 120, 255, 255],
                                        visible: true,
                                        dimension: 0
                                    });
                                mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);

                                controlador = 4;
                                dentro_ascensor = ascensores[i].ascensor_centro;
                                posicion_botonera = ascensores[i].ascensor_botonera;
                                ascensorEnElQueEstamos = "ComisariaVespucci";

                                // No mando aviso si cambia de planta pero se queda dentro del ascensor (distinta altura, misma X e Y)
                                //if (distancia_botonera.z != distancia_anterior.z && distancia_botonera.x == distancia_anterior.x && distancia_botonera.y == distancia_anterior.y) return;
                                break;
                            }
                        }
                        else if (ascensores[i].ubicacion == "Comisaria Rockford Hills") {
                            if (calcDist(player_local.position, ascensores[i].ascensor_centro) <= 1.5) {
                                if (textlabel_ascensor != null) {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                distancia_botonera = new mp.Vector3(ascensores[i].ascensor_botonera.x, ascensores[i].ascensor_botonera.y, player_local.position.z);
                                textlabel_ascensor = mp.markers.new(20, new mp.Vector3(ascensores[i].ascensor_botonera.x, ascensores[i].ascensor_botonera.y, ascensores[i].ascensor_botonera.z - 0.35), 0.50,
                                    {
                                        color: [0, 120, 255, 255],
                                        visible: true,
                                        dimension: 0
                                    });
                                mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);

                                controlador = 4;
                                dentro_ascensor = ascensores[i].ascensor_centro;
                                posicion_botonera = ascensores[i].ascensor_botonera;
                                ascensorEnElQueEstamos = "ComisariaRockfordHills";

                                // No mando aviso si cambia de planta pero se queda dentro del ascensor (distinta altura, misma X e Y)
                                //if (distancia_botonera.z != distancia_anterior.z && distancia_botonera.x == distancia_anterior.x && distancia_botonera.y == distancia_anterior.y) return;
                                break;
                            }
                        }                        
                    }

                    if (controlador != 0) return; // Si lo he creado no sigo
                    for (let i = 0, n = propiedades.length; i < n; i++) {
                        if (propiedades[i].tipo < 3) {
                            if (calcDist(player_local.position, propiedades[i].pospuerta) <= 2.5) {
                                if (textlabel_propiedades != null) {
                                    if (mp.markers.exists(textlabel_propiedades))
                                        textlabel_propiedades.destroy();
                                }

                                let getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(propiedades[i].pospuerta.x, propiedades[i].pospuerta.y, propiedades[i].pospuerta.z, parseFloat(0), false);
                                textlabel_propiedades = mp.markers.new(25, new mp.Vector3(propiedades[i].pospuerta.x, propiedades[i].pospuerta.y, getGroundZ + 0.1), 1,
                                    {
                                        color: [255, 153, 0, 100],
                                        visible: true,
                                        dimension: 0
                                    });

                                dentro_propiedades = propiedades[i].pospuerta;
                                controlador = 3;
                                //mostrarAviso("fixed", 5000, "Pulsa Y para entrar o la tecla E para ver su menu");
                                mp.events.call("hud:notykey", `[{"tecla": "Y", "texto": "Pulsa para entrar"}, {"tecla": "E", "texto": "Pulsa para abrir su menú"}]`);
                                mp.events.call("hud:mostrar_notykey", true);
                                break;
                            }
                            if (calcDist(player_local.position, propiedades[i].possalida) <= 2.5) {
                                if (textlabel_propiedades != null) {
                                    if (mp.markers.exists(textlabel_propiedades))
                                        textlabel_propiedades.destroy();
                                }

                                let getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(propiedades[i].possalida.x, propiedades[i].possalida.y, propiedades[i].possalida.z, parseFloat(0), false);
                                textlabel_propiedades = mp.markers.new(25, new mp.Vector3(propiedades[i].possalida.x, propiedades[i].possalida.y, getGroundZ + 0.1), 2.5,
                                    {
                                        color: [255, 153, 0, 100],
                                        visible: true,
                                        dimension: 0
                                    });

                                dentro_propiedades = propiedades[i].possalida;
                                controlador = 3;
                                mp.events.call("hud:notykey", `[{"tecla": "Y", "texto": "Pulsa la tecla para entrar"}]`);
                                mp.events.call("hud:mostrar_notykey", true);
                                break;
                            }
                        }
                    }
                }
                break;
            case 1: // Borrar marker cajero
                if (calcDist(player_local.position, dentro_cajeros) > 2) {
                    controlador = 0;
                    if (textlabel_cajeros != null) {
                        if (mp.markers.exists(textlabel_cajeros))
                            textlabel_cajeros.destroy();
                        textlabel_cajeros = null;
                    }
                    dentro_cajeros = null;
                    mp.events.call("hud:mostrar_notykey", false);
                }
                break;
            case 2: // Borrar marker surtidor
                if (calcDist(player_local.position, dentro_surtidor) > 2.5) {
                    controlador = 0;
                    if (textlabel_surtidor != null) {
                        if (mp.markers.exists(textlabel_surtidor))
                            textlabel_surtidor.destroy();
                        textlabel_surtidor = null;
                    }
                    dentro_surtidor = null;
                    mp.events.call("hud:mostrar_notykey", false);
                }
                break;
            case 3: // Borrar marker propiedad
                if (calcDist(player_local.position, dentro_propiedades) > 2.5) {
                    controlador = 0;
                    if (textlabel_propiedades != null) {
                        if (mp.markers.exists(textlabel_propiedades))
                            textlabel_propiedades.destroy();
                        textlabel_propiedades = null;
                    }
                    dentro_propiedades = null;
                    mp.events.call("hud:mostrar_notykey", false);
                }
                break;
            case 4: // Borrar marker ascensores
                if (ascensorEnElQueEstamos == "FIB")
                {
                    if (calcDist(player_local.position, dentro_ascensor) > 1.6) // FUERA DEL ASCENSOR
                    {
                        controlador = 0;

                        if (menu_abierto_FIB1) {
                            mp.events.call('cerrar_ascensor_FIB1');
                            menu_abierto_FIB1 = false;
                        }

                        if (menu_abierto_FIB2) {
                            mp.events.call('cerrar_ascensor_FIB2');
                            menu_abierto_FIB2 = false;
                        }

                        mp.events.call("hud:mostrar_notykey", false);

                        if (textlabel_ascensor != null) {
                            if (mp.markers.exists(textlabel_ascensor)) {
                                textlabel_ascensor.destroy();
                                textlabel_ascensor = null;
                            }
                        }

                        if (player_local.z != distancia_botonera.z) { // cambia de planta
                            distancia_anterior = distancia_botonera;
                        }
                        else { // sale andando, misma planta                                          
                            distancia_anterior = new mp.Vector3(0, 0, 0);
                        }

                        distancia_botonera = null;
                        dentro_ascensor = null;
                        ascensorEnElQueEstamos = "";
                    }
                    else // DENTRO DEL ASCENSOR
                    {
                        if (calcDist(player_local.position, distancia_botonera) < 0.35) // CERCA DE LA BOTONERA
                        {
                            if (menu_abierto_FIB1 == true || menu_abierto_FIB2 == true) return; // Si ya hay uno abierto salgo

                            if (calcDist(player_local.position, new mp.Vector3(2504.386, -342.0772, 94.09238)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 1 - PLANTA 1 
                                calcDist(player_local.position, new mp.Vector3(2502.079, -339.7787, 94.09238)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 2 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(2494.973, -346.8805, 94.09238)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 3 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(2497.232, -349.2548, 94.09238)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 4 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(2504.386, -342.0772, 101.8932)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 1 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(2502.079, -339.7787, 101.8932)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 2 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(2494.973, -346.8805, 101.8932)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 3 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(2497.232, -349.2548, 101.8932)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 4 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(2504.386, -342.0772, 105.6866)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 1 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(2502.079, -339.7787, 105.6867)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 2 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(2494.973, -346.8805, 105.6904)) < 1.6 ||    //FIB. EDIFICIO 1 - ASCENSOR 3 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(2497.232, -349.2548, 105.6904)) < 1.6) {    //FIB. EDIFICIO 1 - ASCENSOR 4 - PLANTA 4

                                if (textlabel_ascensor != null) {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                mp.events.call('mostrar_ascensor_FIB1');
                                menu_abierto_FIB1 = true;
                            }

                            if (calcDist(player_local.position, new mp.Vector3(2504.316, -433.2722, 99.11225)) < 1.6 ||    //FIB. EDIFICIO 2 - ASCENSOR 1 - PLANTA 2
                                calcDist(player_local.position, new mp.Vector3(2504.316, -433.2722, 106.9129)) < 1.6) {    //FIB. EDIFICIO 2 - ASCENSOR 1 - PLANTA 4

                                if (textlabel_ascensor != null) {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                mp.events.call('mostrar_ascensor_FIB2');
                                menu_abierto_FIB2 = true;
                            }
                        }
                        else // LEJOS DE LA BOTONERA
                        {
                            // LEJOS DE BOTONERA Y FUERA DEL ASCENSOR
                            if (calcDist(player_local.position, new mp.Vector3(2504.386, -342.0772, 94.09238)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 1 - PLANTA 1 
                                calcDist(player_local.position, new mp.Vector3(2502.079, -339.7787, 94.09238)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 2 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(2494.973, -346.8805, 94.09238)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 3 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(2497.232, -349.2548, 94.09238)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 4 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(2504.386, -342.0772, 101.8932)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 1 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(2502.079, -339.7787, 101.8932)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 2 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(2494.973, -346.8805, 101.8932)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 3 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(2497.232, -349.2548, 101.8932)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 4 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(2504.386, -342.0772, 105.6866)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 1 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(2502.079, -339.7787, 105.6867)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 2 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(2494.973, -346.8805, 105.6904)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 3 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(2497.232, -349.2548, 105.6904)) > 1.6 &&    //FIB. EDIFICIO 1 - ASCENSOR 4 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(2504.316, -433.2722, 99.11225)) > 1.6 &&    //FIB. EDIFICIO 2 - ASCENSOR 1 - PLANTA 2
                                calcDist(player_local.position, new mp.Vector3(2504.316, -433.2722, 106.9129)) > 1.6) {    //FIB. EDIFICIO 2 - ASCENSOR 1 - PLANTA 4
                                
                                controlador = 0;

                                if (menu_abierto_FIB1) {
                                    mp.events.call('cerrar_ascensor_FIB1');
                                    menu_abierto_FIB1 = false;
                                }

                                if (menu_abierto_FIB2) {
                                    mp.events.call('cerrar_ascensor_FIB2');
                                    menu_abierto_FIB2 = false;
                                }

                                mp.events.call("hud:mostrar_notykey", false);

                                if (textlabel_ascensor != null) {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                if (player_local.z != distancia_botonera.z) { // cambia de planta
                                    distancia_anterior = distancia_botonera;
                                }
                                else { // sale andando, misma planta                                          
                                    distancia_anterior = new mp.Vector3(0, 0, 0);
                                }

                                distancia_botonera = null;
                                dentro_ascensor = null;
                                ascensorEnElQueEstamos = "";
                            }
                            else // LEJOS DE BOTONERA Y DENTRO DE ASCENSOR
                            {
                                if (textlabel_ascensor == null) {
                                    if (!mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor = mp.markers.new(20, new mp.Vector3(posicion_botonera.x, posicion_botonera.y, posicion_botonera.z - 0.35), 0.50,
                                            {
                                                color: [0, 120, 255, 255],
                                                visible: true,
                                                dimension: 0
                                            });
                                        mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);
                                    }
                                }

                                if (menu_abierto_FIB1) {
                                    mp.events.call('cerrar_ascensor_FIB1');
                                    menu_abierto_FIB1 = false;
                                }
                                if (menu_abierto_FIB2) {
                                    mp.events.call('cerrar_ascensor_FIB2');
                                    menu_abierto_FIB2 = false;
                                }
                            }
                        }
                    }
                }    
                else if (ascensorEnElQueEstamos == "ComisariaVespucci")
                {
                    if (calcDist(player_local.position, dentro_ascensor) > 1.9) // FUERA DEL ASCENSOR
                    {
                        controlador = 0;

                        if (menu_abierto_Comisaria_Vespucci_1)
                        {
                            mp.events.call('cerrar_ascensor_Comisaria_Vespucci_1');
                            menu_abierto_Comisaria_Vespucci_1 = false;
                        }

                        mp.events.call("hud:mostrar_notykey", false);

                        if (textlabel_ascensor != null)
                        {
                            if (mp.markers.exists(textlabel_ascensor)) {
                                textlabel_ascensor.destroy();
                                textlabel_ascensor = null;
                            }
                        }

                        if (player_local.z != distancia_botonera.z)
                        { // cambia de planta
                            distancia_anterior = distancia_botonera;
                        }
                        else
                        { // sale andando, misma planta                                          
                            distancia_anterior = new mp.Vector3(0, 0, 0);
                        }

                        distancia_botonera = null;
                        dentro_ascensor = null;
                        ascensorEnElQueEstamos = "";                        
                    }
                    else // DENTRO DEL ASCENSOR
                    {
                        if (calcDist(player_local.position, distancia_botonera) < 0.35) { // CERCA DE LA BOTONERA

                            if (menu_abierto_Comisaria_Vespucci_1 == true) return; // Si ya hay uno abierto salgo

                            if (calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 38.2432)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 6
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 34.36075)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 5
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 30.757141)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 26.827583)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 23.038637)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 2
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 19.001205)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 13.6873665)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA -3
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 10.276635)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA -2
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 4.884179)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 1 - PLANTA -1
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 27.036465)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 2 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 19.035643)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 2 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 14.882768)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 2 - PLANTA -3
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 11.03725)) < 1.9 ||    //Comisaria Vespucci. ASCENSOR 2 - PLANTA -2
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 5.479814)) < 1.9)    //Comisaria Vespucci. ASCENSOR 2 - PLANTA -1
                            {    

                                if (textlabel_ascensor != null)
                                {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                mp.events.call('mostrar_ascensor_Comisaria_Vespucci_1');
                                menu_abierto_Comisaria_Vespucci_1 = true;
                            }
                        }
                        else // LEJOS DE LA BOTONERA
                        {
                            // LEJOS DE BOTONERA Y FUERA DEL ASCENSOR
                            if (calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 38.2432)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 6
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 34.36075)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 5
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 30.757141)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 4
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 26.827583)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 23.038637)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 2
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 19.001205)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 13.6873665)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA -3
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 10.276635)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA -2
                                calcDist(player_local.position, new mp.Vector3(-1096.1172, -850.3819, 4.884179)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 1 - PLANTA -1
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 27.036465)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 2 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 19.035643)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 2 - PLANTA 1
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 14.882768)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 2 - PLANTA -3
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 11.03725)) > 1.9 &&    //Comisaria Vespucci. ASCENSOR 2 - PLANTA -2
                                calcDist(player_local.position, new mp.Vector3(-1066.022, -833.74133, 5.479814)) > 1.9)    //Comisaria Vespucci. ASCENSOR 2 - PLANTA -1
                            {    
                                controlador = 0;

                                if (menu_abierto_Comisaria_Vespucci_1) {
                                    mp.events.call('cerrar_ascensor_Comisaria_Vespucci_1');
                                    menu_abierto_Comisaria_Vespucci_1 = false;
                                }

                                mp.events.call("hud:mostrar_notykey", false);

                                if (textlabel_ascensor != null) {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                if (player_local.z != distancia_botonera.z) { // cambia de planta
                                    distancia_anterior = distancia_botonera;
                                }
                                else { // sale andando, misma planta                                          
                                    distancia_anterior = new mp.Vector3(0, 0, 0);
                                }

                                distancia_botonera = null;
                                dentro_ascensor = null;
                                ascensorEnElQueEstamos = ""; 
                            }
                            else // LEJOS DE BOTONERA Y DENTRO DE ASCENSOR
                            {
                                if (textlabel_ascensor == null) {
                                    if (!mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor = mp.markers.new(20, new mp.Vector3(posicion_botonera.x, posicion_botonera.y, posicion_botonera.z - 0.35), 0.50,
                                            {
                                                color: [0, 120, 255, 255],
                                                visible: true,
                                                dimension: 0
                                            });
                                        mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);
                                    }  
                                }

                                if (menu_abierto_Comisaria_Vespucci_1)
                                {
                                    mp.events.call('cerrar_ascensor_Comisaria_Vespucci_1');
                                    menu_abierto_Comisaria_Vespucci_1 = false;
                                }
                            }
                        }
                    }
                }
                else if (ascensorEnElQueEstamos == "ComisariaRockfordHills") {
                    if (calcDist(player_local.position, dentro_ascensor) > 1.5) // FUERA DEL ASCENSOR
                    {
                        controlador = 0;

                        if (menu_abierto_Comisaria_RockfordHills) {
                            mp.events.call('cerrar_ascensor_Comisaria_RockfordHills');
                            menu_abierto_Comisaria_RockfordHills = false;
                        }

                        if (textlabel_ascensor != null) {
                            if (mp.markers.exists(textlabel_ascensor)) {
                                textlabel_ascensor.destroy();
                                textlabel_ascensor = null;
                            }
                        }

                        if (player_local.z != distancia_botonera.z) { // cambia de planta
                            distancia_anterior = distancia_botonera;
                        }
                        else { // sale andando, misma planta                                          
                            distancia_anterior = new mp.Vector3(0, 0, 0);
                        }

                        distancia_botonera = null;
                        dentro_ascensor = null;
                        ascensorEnElQueEstamos = "";
                    }
                    else // DENTRO DEL ASCENSOR
                    {
                        if (calcDist(player_local.position, distancia_botonera) < 0.35) { // CERCA DE LA BOTONERA

                            if (menu_abierto_Comisaria_RockfordHills == true) return; // Si ya hay uno abierto salgo

                            if (calcDist(player_local.position, new mp.Vector3(-573.0352, -135.84616, 47.919056)) < 1.5 ||    // Comisaria Rockford Hills. ASCENSOR 1 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(-572.8622, -135.82976, 42.867416)) < 1.5 ||    // Comisaria Rockford Hills. ASCENSOR 1 - PLANTA 2
                                calcDist(player_local.position, new mp.Vector3(-572.9945, -129.20457, 38.41052)) < 1.5)    // Comisaria Rockford Hills. ASCENSOR 1 - PLANTA -1
                            {

                                if (textlabel_ascensor != null) {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                mp.events.call('mostrar_ascensor_Comisaria_RockfordHills');
                                menu_abierto_Comisaria_RockfordHills = true;
                            }
                        }
                        else // LEJOS DE LA BOTONERA
                        {
                            // LEJOS DE BOTONERA Y FUERA DEL ASCENSOR
                            if (calcDist(player_local.position, new mp.Vector3(-573.0352, -135.84616, 47.919056)) > 1.5 &&    // Comisaria Rockford Hills. ASCENSOR 1 - PLANTA 3
                                calcDist(player_local.position, new mp.Vector3(-572.8622, -135.82976, 42.867416)) > 1.5 &&    // Comisaria Rockford Hills. ASCENSOR 1 - PLANTA 2
                                calcDist(player_local.position, new mp.Vector3(-572.9945, -129.20457, 38.41052)) > 1.5)    // Comisaria Rockford Hills. ASCENSOR 1 - PLANTA 3
                            {
                                controlador = 0;

                                if (menu_abierto_Comisaria_RockfordHills) {
                                    mp.events.call('cerrar_ascensor_Comisaria_RockfordHills');
                                    menu_abierto_Comisaria_RockfordHills = false;
                                }

                                if (textlabel_ascensor != null) {
                                    if (mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor.destroy();
                                        textlabel_ascensor = null;
                                    }
                                }

                                if (player_local.z != distancia_botonera.z) { // cambia de planta
                                    distancia_anterior = distancia_botonera;
                                }
                                else { // sale andando, misma planta                                          
                                    distancia_anterior = new mp.Vector3(0, 0, 0);
                                }

                                distancia_botonera = null;
                                dentro_ascensor = null;
                                ascensorEnElQueEstamos = "";
                            }
                            else // LEJOS DE BOTONERA Y DENTRO DE ASCENSOR
                            {
                                if (textlabel_ascensor == null) {
                                    if (!mp.markers.exists(textlabel_ascensor)) {
                                        textlabel_ascensor = mp.markers.new(20, new mp.Vector3(posicion_botonera.x, posicion_botonera.y, posicion_botonera.z - 0.35), 0.50,
                                            {
                                                color: [0, 120, 255, 255],
                                                visible: true,
                                                dimension: 0
                                            });
                                        mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);
                                    }
                                }

                                if (menu_abierto_Comisaria_RockfordHills) {
                                    mp.events.call('cerrar_ascensor_Comisaria_RockfordHills');
                                    menu_abierto_Comisaria_RockfordHills = false;
                                }
                            }
                        }
                    }
                }
                break;
            case 5:
                if (calcDist(player_local.position, dentro_ped_robar_veh) > 2.5) {
                    controlador = 0;
                    dentro_ped_robar_veh = null;
                    mp.events.call("hud:mostrar_notykey", false);
                }
                break;
            case 6: // Borrar marker plantas
                let plantaPosicion = null; // Esta variable será la que guarde la posicion de la planta, la definimos como NULL
                // Buscamos la planta sobre la que estaba, si no está, la variable plantaPosicion se quedará como NULL y por lo tanto cerramos la notificacion, si está creada, guardamos la posicion en ella.
                for (let i = 0, n = plantas.length; i < n; i++) {
                    if (plantas[i].id == cercaPlantaId) {
                        plantaPosicion = plantas[i].posicion;
                        break;
                    }
                }
                // Comprobamos que la variable PlantaPosicion se haya definido como la posición de la planta, si no se ha definido cerramos la notificacion, si se ha definido comprobamos que no se haya alejado de la planta
                if ((plantaPosicion == null) || (calcDist(player_local.position, plantaPosicion) > (distanciaPermitidaEntrePlantayPlanta / 2))) {
                    controlador = 0;
                    cercaPlantaId = null;
                    mp.events.call("hud:mostrar_notykey", false);
                    break;
                }
                break;
            default:
                break;
        }
    }

    // Si el jugador está en el agua...
    if (player_local.isInWater()) {
        if (player_local.isSwimming() || player_local.isSwimmingUnderWater()) // Comprobamos si está nadando o buceando, y como lo esté que se vaya olvidando del movil y del analizador de terrenos
        {
            if (adminservicio || puerto != 22005) return; // Si está con /adminservicio se va a librar de que se le rompa el movil
            for (let item of inventario) {
                // Comprobamos si tiene en el inventario algun objeto de los que le queremos quitar, para mandar el evento al servidor y quitarselo
                switch (item.tipoObjeto) {
                    case 74: // Telefono
                    case 1050: // Analizador de terreno 
                        mp.events.callRemote('inventario:quitarObjetoPorEntrarEnAgua', item.tipoObjeto);
                        break;
                }
            }
        }
    }
}, 1000);

var timeoutVending = null;
// Intervalo texto objetos
setInterval(function () {
    if(notificacionVending != null && timeoutVending == null){
        timeoutVending = crearTimeout(() => {
            timeoutVending = null;
            notificacionVending = null;
        }, 15000)
    }
}, 500);

setInterval(() => {
    if (anularPaydayAFK == true) return; // Si el usuario esta AFK no realizamos payday

    if (tiempo_payday >= 60) {
        mp.events.callRemote('payday:entregar');
        tiempo_payday = 0;
    }
    else {
        tiempo_payday++;
    }
    if (tiempo_drogas >= 10 && !adminservicio) {
        //A los 10 minutos enviamos el evento para reproducir sus adicciones, pero hacemos un random del 50% para que en algunas ocasiones no se envie
        let random = Math.floor(Math.random() * 100);
        if((random % 2) == 0)
        {
            mp.events.callRemote('drogas:adiccion');
            tiempo_drogas = 0;
        }

        tiempo_drogas = 0;
    }
    else {
        tiempo_drogas++;
    }
}, 60000);

let act_dim = 0;
setInterval(() => {
    if(!logueado) return;

    if (tiempo_prision != null) {
        if (tiempo_prision <= 1) {
            mp.events.callRemote('jugador:prision:finalizar');
            tiempo_prision = null;
        }
        else {
            tiempo_prision--;
        }
    }

    let cambioVoz = false;
    if (vozactiva != estabaVozActiva) {
        cambioVoz = true;
        estabaVozActiva = !estabaVozActiva;
    }

    let cambioChat = false;
    if (estaChatAbierto != estabaChatAbierto) {
        cambioChat = true;
        estabaChatAbierto = !estabaChatAbierto;
    }

    if (cambioChat || cambioVoz){
        let players = [];
        for (let i = 0; i < mp.players.streamed.length; i++) {
            const player = mp.players.streamed[i];

            if(mp.controladorJugadores._jugadores[player.id] != undefined){
                if(player != player_local && !mp.controladorJugadores._jugadores[player.id].oculto){
                    players.push(mp.controladorJugadores._jugadores[player.id].id_jugador);
                }
            }

            if (i == mp.players.streamed.length - 1 && players.length > 0) {
                // Pero como cojones va a dar undefined esto?
                // mi mente sana no es capaz con dar con el motivo pero aparentemente
                // si ocurre estamos protegidos
                if (mp.controladorJugadores._jugadores[player_local.id] != undefined) {
                    mp.events.callRemoteUnreliable("comprobar_voz_chat_abierto", JSON.stringify(players), mp.controladorJugadores._jugadores[player_local.id].id_jugador, estaChatAbierto, vozactiva);
                }
            }
        }
    }

    // Codigo para actualizar a los jugadores invisibles dentro de interiores
    if(mp.controladorJugadores._jugadores[player_local.id] != undefined)
    {
        let playerRoom = mp.game.invoke("0x47C2A06D4F5F424B", player_local.handle);
        if(playerRoom != 0 && playerRoom != undefined && playerRoom != null) {
            for (let i = 0; i < mp.players.streamed.length; i++) {
                const player = mp.players.streamed[i];
                if(player != player_local)
                {
                    if(calcDist(player.position, player_local.position) < 30)
                    {
                        let playerInterior = mp.game.invoke("0x2107BA504071A6BB", player_local.handle); // gets the interior in which the player is
                        //Desactivamos todo esto porque impedia realizar comprobaciones en interiores de dimension 0 - Kenshin
                        // if (playerRoom != 0 || playerInterior != 0) {
                            // let targetRoom = mp.game.invoke("0x47C2A06D4F5F424B", player.handle); 
                            // let targetInterior = mp.game.invoke("0x2107BA504071A6BB", player.handle);
                            // if (targetRoom != 0 || targetInterior != 0) {
                            //     mp.gui.chat.push("target Room ID: " + targetRoom);
                            //     mp.gui.chat.push("target Interior ID: " + targetInterior);
                                mp.game.invoke("0x52923C4710DD9907", player.handle, playerInterior, playerRoom); // forces the same room and id on the target
                            // }
                        // }
                    }
                }
            }
        }
    }

    // Codigo para realizar autofix automático
    if (!player_local.vehicle && (player_local.dimension != dimension_real)) {
        act_dim++;
        if (act_dim >= 2) {
            act_dim = 0;
            logInfo("AUTO_AUTOFIX", "Dim jugador: " + player_local.dimension + ", Dim real: " + dimension_real);
            mp.events.callRemote("autofix_automatico", dimension_real);
        }
    }
}, 1000);

mp.events.add("comprobar_territorio", () => {
    if (territorioID != -1 && territorioID != faccion) mp.events.callRemote("aviso:arma_recogida");
})


// Desactiva las muertes sigilosas
mp.events.add("playerReady", (player) => {
    const possibleActions = [
        "AR_knife_low_kick_far",
        "AR_knife_low_kick_close",
        "ACT_low_kick_close",
        "ACT_low_kick_far",
        "ACT_takedown_a",
        "ACT_takedown_heavy",
        "ACT_armed_takedown",
        "AR_stealth_kill_a",
        "AR_stealth_kill_knife",
        "ACT_stealth_kill_a",
        "ACT_stealth_kill_weapon",
        "ACT_stealth_kill_b",
        "ACT_stealth_kill_c",
        "ACT_stealth_kill_d",
        "ACT_stealth_kill_a_gardener"
    ];

    possibleActions.forEach(key => {
        const keyHash = mp.game.joaat(key);
        mp.game.invoke("0xA6A12939F16D85BE", keyHash >> 0, false);
    });
});

mp.events.add('fadeInOut', (tiempoout, tiemposig, tiempoin) => {
    mp.game.cam.doScreenFadeOut(tiempoout);
    crearTimeout(function(){ mp.game.cam.doScreenFadeIn(tiempoin) }, tiemposig);
});

/**
 * Evento recibido cuando se entra o sale de una propiedad o negocio
 *
 * @param {boolean} prop_neg True -> Propiedad, False -> Negocio
 * @param {boolean} entrar_salir True -> Entrar, False -> Salir
 * @param {number} tipocallback Null -> No es el controlador de la accion, no envia evento de vuelta, !=Null -> Es el controlador, envía evento de vuelta
 */
mp.events.add('entrar_interior', (prop_neg, entrar_salir, tipocallback = null, pos_raycast = null, dir_raycast = null, dist = null, vehiculo = null) => {
    menuAbierto = true;

    const tipo_callback = tipocallback;

    if (prop_neg == true) {
        if (entrar_salir == true) {
            logInfo("PROPIEDAD", "Entrando, controlador: " + ((tipocallback != null) ? tipocallback : false));
        }
        else {
            logInfo("PROPIEDAD", "Saliendo, controlador: " + ((tipocallback != null) ? tipocallback : false));
        }
    }
    else {
        if (entrar_salir == true) {
            logInfo("NEGOCIO", "Entrando, controlador: " + ((tipocallback != null) ? tipocallback : false));
        }
        else {
            logInfo("NEGOCIO", "Saliendo, controlador: " + ((tipocallback != null) ? tipocallback : false));
        }
    }

    const cambiarHud = !hudOculto; // Nos permite ocultar y mostrar el hud si ya de por si lo tiene activo
    let vehPasajeroEntrar = null; // FIX para meter a los pasajeros de vuelta en un vehículo, RAGEMP jodió en sv el tp automático a todos los pasajeros

    //Ocultar/mostrar hud
    if (cambiarHud == true) {
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);

        mp.events.call("hud:estado_hud");
    }

    mp.game.cam.doScreenFadeOut(200);
    if (typeof tipocallback === "number") { // Solo mandamos evento si es conductor o si va a pie
        crearTimeout(() => {
            if (prop_neg == true) {
                if (entrar_salir == true) {
                    logInfo("PROPIEDAD", "Entrando, evento enviado");
                    if (tipo_callback != null) {
                        mp.events.callRemote("confirmar:entrada", tipo_callback);
                    }
                    else {
                        logError("PROPIEDAD", "Tipo recibido: null");
                    }
                }
                else {
                    logInfo("PROPIEDAD", "Saliendo, evento enviado");
                    if (tipo_callback != null) {
                        if (pos_raycast != null && dir_raycast != null && dist != null) {
                            let pos1 = pos_raycast;
                            let pos2 = new mp.Vector3(pos_raycast.x + (dist * dir_raycast.x), pos_raycast.y + (dist * dir_raycast.y), pos_raycast.z + (dist * dir_raycast.z));

                            let puede = true;

                            crearTimeout(() => {
                                // Hay partes del mapa que no detecta el raycast no se por que
                                // segun que texturas de edifcios, cristales? quien sabe
                                let hitData = mp.raycasting.testPointToPoint(pos1, pos2, vehiculo, 1);
                                if (hitData) {
                                    puede = false;
                                    limpiarHandleRaycast(hitData.entity);
                                }
    
                                if (puede) {
                                    mp.events.callRemote("confirmar:salida", tipo_callback, true);
                                } else {
                                    mp.events.callRemote("confirmar:salida", tipo_callback, false);
                                }
                            }, 500);
                        } else {
                            mp.events.callRemote("confirmar:salida", tipo_callback, true);
                        }
                    }
                    else {
                        logError("PROPIEDAD", "Tipo recibido: null");
                    }
                }
            }
            else {
                if (entrar_salir == true) {
                    logInfo("NEGOCIO", "Entrando, evento enviado");
                    if (tipo_callback != null) {
                        mp.events.callRemote("confirmar:entrada:neg", tipo_callback);
                    }
                    else {
                        logError("NEGOCIO", "Tipo recibido: null");
                    }
                }
                else {
                    logInfo("NEGOCIO", "Saliendo, evento enviado");
                    if (tipo_callback != null) {
                        mp.events.callRemote("confirmar:salida:neg", tipo_callback);
                    }
                    else {
                        logError("NEGOCIO", "Tipo recibido: null");
                    }
                }
            }
        }, 250);
    }
    else { // No es el controlador, por lo tanto si está en un vehículo lo guardamos junto con su asiento
        if (player_local.vehicle) {
            for (let i = -1; i < 3; i++) {
                if (player_local.vehicle.getPedInSeat(i) == player_local.handle) {
                    vehPasajeroEntrar = { vehiculo: player_local.vehicle, asiento: i };
                }
            }
        }
    }

    crearTimeout(() => {
        // Si estaba en un vehículo le subimos de vuelta
        if (vehPasajeroEntrar != null && vehPasajeroEntrar.vehiculo != null && mp.vehicles.exists(vehPasajeroEntrar.vehiculo)) {
            player_local.setIntoVehicle(vehPasajeroEntrar.vehiculo.handle, vehPasajeroEntrar.asiento);
        }

        mp.game.cam.doScreenFadeIn(500);

        crearTimeout(() => {
            if (cambiarHud == true) {
                if (tipoMapa != 2) mp.game.ui.displayRadar(true);
                mp.game.ui.displayHud(true);
                mp.gui.chat.show(true);

                mp.events.call("hud:estado_hud");
            }

            menuAbierto = false;
        }, 500);
    }, 1500);
});

/* Evento recibido cuando se entra a una propiedad
 * controlador -> True significa que devuelve evento a servidor confirmando la entrada a la propiedad
 * tipo -> Permite diferenciar en servidor que código ejecutar según la propiedad que sea (garaje, propiedad, caravanas...)
 * 
 * Contiene FIX para los asientos de pasajeros, el servidor hace TP al pasajero y el cliente se mete a si mismo dentro del vehículo
 */
mp.events.add('entrar_salir_garaje', (tipo) => {
    menuAbierto = true;

    const tipo_garaje = tipo;

    logInfo("GARAJE", "/garaje");

    const cambiarHud = !hudOculto; // Nos permite ocultar y mostrar el hud si ya de por si lo tiene activo

    //Ocultar/mostrar hud
    if (cambiarHud == true) {
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);

        mp.events.call("hud:estado_hud");
    }

    mp.game.cam.doScreenFadeOut(200);
    crearTimeout(() => {
        logInfo("GARAJE", "/garaje, evento enviado");
        mp.events.callRemote("confirmar:garaje", tipo_garaje);
    }, 250);

    crearTimeout(() => {
        mp.game.cam.doScreenFadeIn(500);

        crearTimeout(() => {
            if (cambiarHud == true) {
                if (tipoMapa != 2) mp.game.ui.displayRadar(true);
                mp.game.ui.displayHud(true);
                mp.gui.chat.show(true);

                mp.events.call("hud:estado_hud");
            }

            menuAbierto = false;
        }, 500);
    }, 1500);
});

// Intervalo territorios de faccion
let enTerritorio_anterior = false; // Permite mandar una sola vez los eventos del hud de actualizar faccion a false
let poligono_anterior = null;
setInterval(function () {
    try
    {
        if(!logueado) return;
        if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
        if (player_local.dimension == 0) { // Solo funciona fuera de casas y negocios, así al entrar no se quita y no te muestra otra facción por el tp al interior
            if (territorios != null && territorios.length > 0) {
                let enTerritorio = false;

                for (let i = 0, n = territorios.length; i < n; i++) {
                    let t = territorios[i];
                    if (estaEnPoligono(t.poligono, player_local.position)) {
                        if (t.id == poligono_anterior) {
                            enTerritorio = true;
                            break;
                        }
                        else {
                            let image = "https://files.lu-rp.ovh/static/assets/images/lurp.png";
                            let color = "";
                            for (let j = 0, m = facciones.length; j < m; j++) {
                                let f = facciones[j];
                                if (f.id == t.faccion_id) {
                                    color = f.color;
                                    if (f.imagen != "")
                                        image = "https://files.lu-rp.ovh/v/facciones/imagen/" + f.imagen;

                                    break;
                                }
                            }

                            mp.events.call("hud:faccion", t.nombre, image, color);
                            mp.events.call("hud:mostrar_faccion", true);
                            territorioID = t.faccion_id;
                            logInfo("Territorio", "color: " + color);

                            poligono_anterior = t.id;
                            enTerritorio = true;
                            break;
                        }
                    }
                }

                if (!enTerritorio && enTerritorio_anterior) {
                    poligono_anterior = null;
                    territorioID = -1;
                    mp.events.call("hud:mostrar_faccion", false);
                    mp.events.call("hud:faccion", "", "", "");
                }

                enTerritorio_anterior = enTerritorio;
            }
        }
    }
    catch (e)
    {
        logError("Territorios intervalo", e);
    }
}, 1000);

exports.estaEnPoligono = estaEnPoligono;
function estaEnPoligono(polygon, position) {
    try
    {
        let result = false;
        let j = polygon.length - 1;
        for (let i = 0; i < polygon.length; i++)
        {
            if (polygon[i].y < position.y && polygon[j].y >= position.y || polygon[j].y < position.y && polygon[i].y >= position.y)
            {
                if (polygon[i].x + (position.y - polygon[i].y) / (polygon[j].y - polygon[i].y) * (polygon[j].x - polygon[i].x) < position.x)
                {
                    result = !result;
                }
            }
            j = i;
        }
        return result;
    }
    catch (e)
    {
        logError("estaEnPoligono", e);
        return false;
    }
}
}