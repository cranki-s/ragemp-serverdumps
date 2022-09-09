{
/* --------------------------------------------------------------------------------
 * camaraheli.js
 *
 * Autor: Doomer
 *
 * Descripción: Sistema de cámara del helicoptero
 *
 * -------------------------------------------------------------------------------- */
var messageScaleform = require('/LURP/sistemas/scaleform/BasicScaleform.js');
var camaraHeli = null;
var modoVision = 0;
var scaleform_camaraheli = null;
var timerCamara;

let fov_maxH = 100.0
let fov_minH = 5.0 // max zoom level (smaller fov is more zoom)
let speed_lrH = 8.0 // speed by which the camera pans left-right
let speed_udH = 8.0 // speed by which the camera pans up-down

let fovH = (fov_maxH+fov_minH)*0.5;

let heatTime = 0;
let heatEnable = true;
let heatInterval = null;
let heatLoadTimeout = null;

// Disparado cada tic
function render_camaraheli() {
    if (camaraHeli != null) {
        if (camaraHeli.isActive()) {
            mp.game.controls.disableAllControlActions(0);
            // Control de disparo alterna entre modos de visión
            let jugador = mp.controladorJugadores._jugadores[player_local.id];
            if (jugador.trabajos != undefined && jugador.deservicio != undefined) {
                if (((jugador.trabajos).includes(1) || (jugador.trabajos).includes(2) || (jugador.trabajos).includes(3) || (jugador.trabajos).includes(25)) && jugador.deservicio == true) {
                    if (mp.game.controls.isDisabledControlJustPressed(0, 24)) {
                        switch (modoVision) {
                            case 0:
                                mp.game.invoke('0x7E08924259E08CE0', false);
                                mp.game.invoke('0x18F621F7A5B1F85D', true);
                                modoVision = 1;
                                break;
                            case 1:
                                //Si esta en el tiempo de 2 minutos no le dejamos usar de nuevo la termica
                                if(heatEnable)
                                {
                                    mp.game.invoke('0x7E08924259E08CE0', true);
                                    mp.game.invoke('0x18F621F7A5B1F85D', false);
                                    modoVision = 2;
                                    
                                    if(heatTime >= 30)
                                    {
                                        //Quitamos vision termica y limitamos durante 2 minutos
                                        mp.game.invoke('0x7E08924259E08CE0', false);
                                        mp.game.invoke('0x18F621F7A5B1F85D', false);
                                        modoVision = 0;
                                        heatEnable = false;
                                        if(heatLoadTimeout == null)
                                        {
                                            heatLoadTimeout = crearTimeout(function () {
                                                heatEnable = true;
                                                heatLoadTimeout = null;
                                            }, 120000);
                                        }

                                        heatTime = 0;

                                        if(heatInterval != null)
                                        {
                                            clearInterval(heatInterval);
                                            heatInterval = null;
                                        }
                                    }

                                    if(heatInterval == null)
                                    {
                                        heatTime++;
                                        heatInterval = setInterval(() => {
                                            heatTime++;

                                            if(heatTime >= 30)
                                            {
                                                //Quitamos vision termica y limitamos durante 2 minutos
                                                mp.game.invoke('0x7E08924259E08CE0', false);
                                                mp.game.invoke('0x18F621F7A5B1F85D', false);
                                                modoVision = 0;
                                                heatEnable = false;
                                                if(heatLoadTimeout == null)
                                                {
                                                    heatLoadTimeout = crearTimeout(function () {
                                                        heatEnable = true;
                                                        heatLoadTimeout = null;
                                                    }, 120000);
                                                }

                                                heatTime = 0;

                                                if(heatInterval != null)
                                                {
                                                    clearInterval(heatInterval);
                                                    heatInterval = null;
                                                }
                                            }

                                        }, 1000);
                                    }
                                }
                                else
                                {
                                    mp.game.invoke('0x7E08924259E08CE0', false);
                                    mp.game.invoke('0x18F621F7A5B1F85D', false);
                                    modoVision = 0;
                                }
                                break;
                            default:
                                if(heatInterval != null)
                                {
                                    clearInterval(heatInterval);
                                    heatInterval = null;
                                }
                                mp.game.invoke('0x7E08924259E08CE0', false);
                                mp.game.invoke('0x18F621F7A5B1F85D', false);
                                modoVision = 0;
                                break;
                        }
                    }
                }
            }

            let zoomvalue = (1.0/(fov_maxH-fov_minH))*(fovH-fov_minH);
			checkInputRotationHeli(camaraHeli, zoomvalue);

            //handleZoomHeli(camaraHeli);
            hideHUDThisFrameHeli();

            // Fijación de objetivo
            if (mp.controladorJugadores._jugadores[player_local.id]) {
                let jugador = mp.controladorJugadores._jugadores[player_local.id];
                if (jugador.trabajos != undefined && jugador.deservicio != undefined) {
                    if (((jugador.trabajos).includes(1) || (jugador.trabajos).includes(2) || (jugador.trabajos).includes(3) || (jugador.trabajos).includes(25)) && jugador.deservicio == true) {
                        if (mp.game.controls.isDisabledControlJustPressed(0, 22) && !estaChatAbierto) {
                            var distance = 100;
                            var position = camaraHeli.getCoord(); // grab the position of the gameplay camera as Vector3
                            var direction = camaraHeli.getDirection(); // get the forwarding vector of the direction you aim with the gameplay camera as Vector3 
                            var farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z)); // calculate a random point, drawn on a invisible line between camera position and direction (* distance)
                            var raycast = mp.raycasting.testPointToPoint(position, farAway, player_local.vehicle, 15); // Colision con player, vehicle y mapa
                            // Ponemos objetivo
                            let encontrado = false;
                            if (raycast != undefined) {
                                let entidadCam = raycast.entity;
                                if (entidadCam != undefined && entidadCam != null) { // El resultado es válido
                                    let tipo = entidadCam.type;
                                    switch (tipo) {
                                        case "player":
                                            // Enviamos el aviso al servidor de que hemos fijado el objetivo
                                            if (mp.controladorJugadores._jugadores[entidadCam.id]) {
                                                //let jugadorRay = mp.controladorJugadores._jugadores[raycast.entity.id];
                                                //mp.events.callRemote("objetivo_fijado_heli", raycast.entity.getVariable("ID_JUGADOR"));
                                                player_local.setMountedWeaponTarget(entidadCam.handle, 1, 0, 0, 0);
                                                player_local.vehicle.setSearchlight(true, false);
                                                mp.game.graphics.notify("~b~> ~w~Objetivo fijado");
                                                mp.gui.chat.push("Identificación: " + entidadCam.name);
                                                encontrado = true;
                                            }
                                            break;
                                        case "vehicle":
                                            // Enviamos el aviso al servidor de que hemos fijado el objetivo
                                            if (mp.controladorJugadores._jugadores[entidadCam.id]) {
                                                //let jugadorRay = mp.controladorJugadores._jugadores[raycast.entity.id];
                                                //mp.events.callRemote("objetivo_fijado_heli", raycast.entity.getVariable("ID_JUGADOR"));
                                                player_local.setMountedWeaponTarget(entidadCam.handle, 1, 0, 0, 0);
                                                player_local.vehicle.setSearchlight(true, false);
                                                mp.game.graphics.notify("~b~> ~w~Objetivo fijado");
                                                mp.gui.chat.push("Identificación: " + entidadCam.name);
                                                encontrado = true;
                                            }
                                            if (entidadCam.propiedades) {
                                                let nombre = entidadCam.propiedades.nombre;
                                                let matricula = mp.game.invokeString("0x7CE1CCB9B293020E", entidadCam.handle);

                                                mp.gui.chat.push("Vehículo: " + nombre);
                                                mp.gui.chat.push("Matricula: " + matricula);
                                                //mp.events.callRemote("objetivo_fijado_heli", raycast.entity.getVariable("ID_JUGADOR"));
                                                player_local.setMountedWeaponTarget(entidadCam.handle, 0, 0, 0, 0);
                                                player_local.vehicle.setSearchlight(true, true);
                                                mp.game.graphics.notify("~b~> ~w~Objetivo fijado");
                                                encontrado = true;
                                            }
                                            break;
                                        default:
                                            if (tipo == undefined || tipo == null) {
                                                limpiarHandleRaycast(entidadCam);
                                            }
                                            break;
                                    }
                                }
                            }

                            if (!encontrado) {
                                mp.game.graphics.notify("~r~> ~w~Objetivo no encontrado");
                            }
                        }
                    }
                }
            }

            // Si nos hemos bajado del vehículo, paramos la cámara
            if (!player_local.vehicle) {
                mp.events.remove('render', render_camaraheli); // Eliminamos render específico de camaraheli

                camaraHeli.detach();
                camaraHeli.setActive(false);
                mp.game.cam.renderScriptCams(false, true, 0, true, true);
                if (mp.cameras.exists(camaraHeli))
                    camaraHeli.destroy();
                camaraHeli = null;
                // Resteamos los modos de visión
                mp.game.invoke('0x7E08924259E08CE0', false);
                mp.game.invoke('0x18F621F7A5B1F85D', false);
                if (scaleform_camaraheli != null) {
                    scaleform_camaraheli.dispose();
                    scaleform_camaraheli = null;
                }
                mp.game.controls.enableAllControlActions(0);
                mp.events.call("hud:estado_hud");

                menuAbierto = false;
                en_camaraheli = false;
            }
            // Dibujamos el cursor
            //let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
            //let scaleX = resolution.x / 2;
            //let scaleY = resolution.y / 2;
            //mp.game.graphics.drawText("+", [scaleX, scaleY], {
            //    font: 4,
            //    color: [255, 255, 255, 255],
            //    scale: [1.2, 1.2],
            //    outline: true,
            //    centre: true
            //});
            if (scaleform_camaraheli != null)
                scaleform_camaraheli.renderFullscreen();
        }
        else {
            mp.game.controls.enableAllControlActions(0);
        }
    }
}

var hideHUDThisFrameHeli = function () {
	for (let i = 1; i <= 22; i++) {
		mp.game.ui.hideHudComponentThisFrame(i);
	}
}

var checkInputRotationHeli = function(cam, zoomvalue) {
	let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220)
	let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221)
	let rotation = cam.getRot(2);
	if (rightAxisX != 0.0 || rightAxisY != 0.0) {
		new_z = rotation.z + rightAxisX*-1.0*(speed_udH)*(zoomvalue+0.1)
		new_x = Math.max(Math.min(20.0, rotation.x + rightAxisY*-1.0*(speed_lrH)*(zoomvalue+0.1)), -89.5)
		cam.setRot(new_x, 0.0, new_z, 2);
	}
}

//Q
mp.keys.bind(0x51, true, function () {
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (camaraHeli != null) {
        if (camaraHeli.isActive()) {
            clearTimeout(timerCamara);
            timerCamara = setInterval(function () {
                var fov = camaraHeli.getFov();
                fov = fov - 2;
                if(fov < fov_minH)
                {
                    fov = fov_minH;
                }
                camaraHeli.setFov(fov);
                scaleform_camaraheli.callFunction("SET_ALT_FOV_HEADING", fov);
            }, 50);
            mp.game.audio.playSoundFrontend(0, "Zoom_In", "DLC_HEIST_PLANNING_BOARD_SOUNDS", true);
        }
    }
});
mp.keys.bind(0x51, false, function () {
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (camaraHeli != null) {
        if (camaraHeli.isActive()) {
            clearInterval(timerCamara);
        }
    }
});
//E
mp.keys.bind(0x45, true, function () {
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (camaraHeli != null) {
        if (camaraHeli.isActive()) {
            clearTimeout(timerCamara);
            timerCamara = setInterval(function () {
                if (camaraHeli != null) {
                    var fov = camaraHeli.getFov();
                    fov = fov + 2;
                    if(fov > fov_maxH)
                    {
                        fov = fov_maxH;
                    }
                    scaleform_camaraheli.callFunction("SET_ALT_FOV_HEADING", fov);
                    camaraHeli.setFov(fov);
                }
            }, 50);
            mp.game.audio.playSoundFrontend(0, "Zoom_Out", "DLC_HEIST_PLANNING_BOARD_SOUNDS", true);
        }
    }
});
mp.keys.bind(0x45, false, function () {
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (camaraHeli != null) {
        if (camaraHeli.isActive()) {
            clearInterval(timerCamara);
        }
    }
});

// Eventos disparados por el servidor
mp.events.add('camara_heli', function () {
    if (camaraHeli === null) {
        if (!player_local.vehicle) {
            return;
        }
        if (!mp.game.graphics.hasStreamedTextureDictLoaded("helicopterhud")) {
            mp.game.graphics.requestStreamedTextureDict("helicopterhud", true);
        }

        camaraHeli = mp.cameras.new("DEFAULT_SCRIPTED_FLY_CAMERA", player_local.position, new mp.Vector3(0, 0, 0), fovH);
        camaraHeli.attachTo(player_local.vehicle.handle, 0, 2.8, -1.3, true);
        camaraHeli.setActive(true);
        let zoomvalue = (1.0 / (fov_maxH - fov_minH)) * (fovH - fov_minH);
        checkInputRotationHeli(camaraHeli, zoomvalue);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        if (mp.controladorJugadores._jugadores[player_local.id]) {
            let jugador = mp.controladorJugadores._jugadores[player_local.id];
            if (jugador.trabajos != undefined && jugador.deservicio != undefined) {
                if (((jugador.trabajos).includes(1) || (jugador.trabajos).includes(2) || (jugador.trabajos).includes(3) || (jugador.trabajos).includes(25)) && jugador.deservicio == true) {
                    mp.game.graphics.notify("~b~> ~w~Presiona el botón de disparo para alternar entre los tipos de visión disponibles");
                    mp.game.graphics.notify("~b~> ~w~Presiona la tecla de salto para fijar la luz en el objetivo al que apuntas.");
                }
            }
            if (scaleform_camaraheli == null)
                scaleform_camaraheli = new messageScaleform("HELI_CAM");
            if (jugador.trabajos != undefined && jugador.deservicio != undefined) {
                if (((jugador.trabajos).includes(1) || (jugador.trabajos).includes(2) || (jugador.trabajos).includes(3) || (jugador.trabajos).includes(25)) && jugador.deservicio == true) {
                    scaleform_camaraheli.callFunction("SET_CAM_LOGO", 1);
                }
                else {
                    scaleform_camaraheli.callFunction("SET_CAM_LOGO", 0);
                }
            } else {
                scaleform_camaraheli.callFunction("SET_CAM_LOGO", 0);
            }
            let fov = camaraHeli.getFov();
            scaleform_camaraheli.callFunction("SET_ALT_FOV_HEADING", fov);
            scaleform_camaraheli.renderFullscreen();
            mp.events.call("hud:estado_hud");

            menuAbierto = true;
            en_camaraheli = true;
            mp.events.add('render', render_camaraheli); // Creamos render específico de camaraheli
        }
    }
    else
    {
        menuAbierto = false;
        en_camaraheli = false;
        mp.events.remove('render', render_camaraheli); // Eliminamos render específico de camaraheli

        mp.game.graphics.setStreamedTextureDictAsNoLongerNeeded("helicopterhud");
        camaraHeli.detach();
        camaraHeli.setActive(false);
        mp.game.cam.renderScriptCams(false, true, 0, true, true);
        if (mp.cameras.exists(camaraHeli))
            camaraHeli.destroy();
        camaraHeli = null;
        // Resteamos los modos de visión
        mp.game.invoke('0x7E08924259E08CE0', false);
        mp.game.invoke('0x18F621F7A5B1F85D', false);
        if (scaleform_camaraheli != null) {
            scaleform_camaraheli.dispose();
            scaleform_camaraheli = null;
        }
        mp.game.controls.enableAllControlActions(0);
        mp.events.call("hud:estado_hud");
    }
});
//# sourceMappingURL=camaraheli.js.map
mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
    if(heatInterval != null)
    {
        clearInterval(heatInterval);
    }
    if(heatLoadTimeout != null)
    {
        clearTimeout(heatLoadTimeout);
    }
    
    heatTime = 0;
    heatEnable = true;
    heatInterval = null;
    heatLoadTimeout = null;
})
}