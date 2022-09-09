{
﻿/*
 * alpr.js
 *
 * Contiene el controlador del ALPR, la actualizacion de sus datos y su mostrado en el CEF.
 *
 * Javigra (XD) noyzxc
 */

var cef_alpr = require("./LURP/cef.js");
var alpr = false;

var alpr_cefId = -1;

var ALPRnombreDelante = '';
var ALPRnombreDetras = '';
var ALPRmatriculaDelante = '';
var ALPRmatriculaDetras = '';

mp.events.add('mostrar_alpr', function (estado) {
    if (estado) {
        if (!player_local.vehicle) {
            return;
        }
        if (alpr_cefId < 0 && !cef_alpr.existeCef(cef_alpr)) {
            alpr_cefId = cef_alpr.crearCef("package://LURP/cef/alpr/alpr.html", {
                mostrarCursor: false,
                sumarNumeroCefs: false
            });
            alpr = true;
            mp.events.add('render', render_alpr);
            menu_vehiculo_item_alpr.Text = ("Desactivar ALPR");
            menu_vehiculo_item_alpr.Description = "Desactiva el ALPR del vehículo";
            menu_vehiculo_item_alpr.RightLabel = "~g~Activado";
        }
    } else {
        if (alpr_cefId >= 0) {
            cef_alpr.cerrarCef(alpr_cefId, false);
            if (menu_vehiculo != null) mp.gui.chat.show(false);
            alpr_cefId = -1;
            alpr = false;
            mp.events.remove('render', render_alpr);    
            menu_vehiculo_item_alpr.Text = ("Activar ALPR");
            menu_vehiculo_item_alpr.Description = "Activa el ALPR del vehículo";
            menu_vehiculo_item_alpr.RightLabel = "~r~Desactivado";
            ALPRnombreDelante = '';
            ALPRnombreDetras = '';
            ALPRmatriculaDelante = '';
            ALPRmatriculaDetras = '';
        }
    }
});

function diferenciaAngulos(a, b) {
    let dif = mp.game.gameplay.absf(a - b);
    while (dif >= 360) {
        dif -= 360;
    }
    dif = dif > 180 ? 360 - dif : dif;
    return dif;
}

function render_alpr(){
    if (alpr != false && player_local.vehicle) {
        // Fijacion de objetivo
        let distance = 30;
        let direction = player_local.vehicle.getForwardVector();
        let positionHueso = player_local.vehicle.getWorldPositionOfBone(player_local.vehicle.getBoneIndexByName("bumper_f"));
        let position2Hueso = player_local.vehicle.getWorldPositionOfBone(player_local.vehicle.getBoneIndexByName("bumper_r"));

        let position = new mp.Vector3((direction.x * 1) + (positionHueso.x), (direction.y * 1) + (positionHueso.y), (direction.z * 1) + (positionHueso.z));
        let position2 = new mp.Vector3((direction.x * -1) + (position2Hueso.x), (direction.y * -1) + (position2Hueso.y), (direction.z * -1) + (position2Hueso.z));

        let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z));
        let farAway2 = new mp.Vector3((direction.x * -distance) + (position2.x), (direction.y * -distance) + (position2.y), (direction.z * -distance) + (position2.z)); // calculate a random point, drawn on a invisible line between camera position and direction (* distance)
        let raycast = mp.raycasting.testCapsule(position, farAway, 0.2, player_local.vehicle.handle, 2);
        let raycast2 = mp.raycasting.testCapsule(position2, farAway2, 0.2, player_local.vehicle.handle, 2);

        // mp.game.graphics.drawLine(position.x, position.y, position.z, farAway.x, farAway.y, farAway.z, 255, 0, 0, 255);
        // mp.game.graphics.drawLine(position2.x, position2.y, position2.z, farAway2.x, farAway2.y, farAway2.z, 0, 0, 255, 255);

        // Ponemos objetivo
        let headingPatrulla = player_local.vehicle.getHeading();

        let velocidadDelante = '0';
        let velocidadDetras = '0';

        if (raycast != undefined || raycast2 != undefined) {
            if (raycast && !raycast2) {
                if (raycast.entity.type == "vehicle") {
                    if (raycast.entity.propiedades) {
                        if (raycast.entity.propiedades.nombre != undefined) {
                            let dif = diferenciaAngulos(headingPatrulla, raycast.entity.getHeading());
                            let puedeVer = false;
                            if (dif <= 35) puedeVer = true;
                            else {
                                dif = diferenciaAngulos(headingPatrulla, raycast.entity.getHeading() + 180);
                                if (dif <= 35) puedeVer = true;
                            };
                            if (!puedeVer) return;
                            ALPRnombreDelante = raycast.entity.propiedades.nombre;
                            velocidadDelante = Math.round(raycast.entity.getSpeed() * 3.6);
                            ALPRmatriculaDelante = mp.game.invokeString("0x7CE1CCB9B293020E", raycast.entity.handle);
                            if (ALPRnombreDelante != undefined && velocidadDelante != undefined && ALPRmatriculaDelante != undefined) {
                                cef_alpr.ejecutarCef(alpr_cefId, `showALPR('${ALPRnombreDelante}', '${ALPRmatriculaDelante}', '${velocidadDelante}', '${ALPRnombreDetras}', '${ALPRmatriculaDetras}', '0')`);
                            }
                        }
                    }
                    return;
                }
            } else if (!raycast && raycast2) {
                if (raycast2.entity.type == "vehicle") {
                    if (raycast2.entity.propiedades) {
                        if (raycast2.entity.propiedades.nombre != undefined) {
                            let dif = diferenciaAngulos(headingPatrulla, raycast2.entity.getHeading());
                            let puedeVer = false;
                            if (dif <= 35) puedeVer = true;
                            else {
                                dif = diferenciaAngulos(headingPatrulla, raycast2.entity.getHeading() + 180);
                                if (dif <= 35) puedeVer = true;
                            };
                            if (!puedeVer) return;
                            ALPRnombreDetras = raycast2.entity.propiedades.nombre;
                            velocidadDetras = Math.round(raycast2.entity.getSpeed() * 3.6);
                            ALPRmatriculaDetras = mp.game.invokeString("0x7CE1CCB9B293020E", raycast2.entity.handle);
                            if (ALPRnombreDetras != undefined && velocidadDetras != undefined && ALPRmatriculaDetras != undefined) {
                                cef_alpr.ejecutarCef(alpr_cefId, `showALPR('${ALPRnombreDelante}', '${ALPRmatriculaDelante}', '0', '${ALPRnombreDetras}', '${ALPRmatriculaDetras}', '${velocidadDetras}')`);
                                return;
                            }
                        }
                    }
                }
            } else if (raycast && raycast2) {
                if (raycast.entity.type == "vehicle" && raycast2.entity.type == "vehicle") {
                    if (raycast.entity.propiedades && raycast2.entity.propiedades) {
                        if (raycast.entity.propiedades.nombre != undefined && raycast2.entity.propiedades.nombre != undefined) {
                            let dif = diferenciaAngulos(headingPatrulla, raycast.entity.getHeading());
                            let puedeVer = false;
                            if (dif <= 35) puedeVer = true;
                            else {
                                dif = diferenciaAngulos(headingPatrulla, raycast.entity.getHeading() + 180);
                                if (dif <= 35) puedeVer = true;
                            };
                            let dif2 = diferenciaAngulos(headingPatrulla, raycast2.entity.getHeading());
                            let puedeVer2 = false;
                            if (dif2 <= 35) puedeVer2 = true;
                            else {
                                dif2 = diferenciaAngulos(headingPatrulla, raycast2.entity.getHeading() + 180);
                                if (dif2 <= 35) puedeVer2 = true;
                            };
                            if (puedeVer) {
                                ALPRnombreDelante = raycast.entity.propiedades.nombre;
                                velocidadDelante = Math.round(raycast.entity.getSpeed() * 3.6);
                                ALPRmatriculaDelante = mp.game.invokeString("0x7CE1CCB9B293020E", raycast.entity.handle);
                            }
                            if (puedeVer2) {
                                ALPRnombreDetras = raycast2.entity.propiedades.nombre;
                                velocidadDetras = Math.round(raycast2.entity.getSpeed() * 3.6);
                                ALPRmatriculaDetras = mp.game.invokeString("0x7CE1CCB9B293020E", raycast2.entity.handle);
                            }
                            if (ALPRnombreDelante != undefined && velocidadDelante != undefined && ALPRmatriculaDelante != undefined && ALPRnombreDetras != undefined && velocidadDetras != undefined && ALPRmatriculaDetras != undefined) {
                                cef_alpr.ejecutarCef(alpr_cefId, `showALPR('${ALPRnombreDelante}', '${ALPRmatriculaDelante}', '${velocidadDelante}', '${ALPRnombreDetras}', '${ALPRmatriculaDetras}', '${velocidadDetras}')`);
                            }
                        }
                    }
                    return;
                }
            } else {
                cef_alpr.ejecutarCef(alpr_cefId, `showALPR('${ALPRnombreDelante}', '${ALPRmatriculaDelante}', '0', '${ALPRnombreDetras}', '${ALPRmatriculaDetras}', '0')`);
                return;
            }
        } else {
            cef_alpr.ejecutarCef(alpr_cefId, `showALPR('${ALPRnombreDelante}', '${ALPRmatriculaDelante}', '0', '${ALPRnombreDetras}', '${ALPRmatriculaDetras}', '0')`);
            return;
        }
    }
};
}ǝ