{
/* --------------------------------------------------------------------------------
 * robovehiculo.js
 *
 * Autor: Kenshin
 *
 * Descripción: Sistema de robo a negocios (asalto a mano armada)
 *
 * -------------------------------------------------------------------------------- */
// Golpes que se le dan al vehiculo para forzarlo
var golpesForzar = -1;
//mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
//    mp.gui.chat.push('Golpeando coche ' + targetPosition + " Coche: " + targetEntity.model);
//});

mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    if (!logueado)
        return;
    if (purga)
        return;
    if (player_local.weapon == mp.game.joaat("weapon_crowbar")) {
        if (upOrDown == "down") {
            mp.vehicles.forEachInStreamRange((vehicle) => {
                if (calcDist(vehicle.position, player_local.position) < 10) {
                    let puerta = null;
                    if (vehicle.getClass() == 8 || vehicle.getClass() == 13) {
                        puerta = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_f"));
                        if (puerta != null) {
                            if (calcDist(player_local.position, puerta) <= 2.5) {
                                if (golpesForzar == 5) {
                                    mp.events.callRemote("forzar_puerta", vehicle);
                                    golpesForzar = 0;
                                    return;
                                }
                                else {
                                    golpesForzar++;
                                }
                            }
                        }
                    }
                    else 
                    {
                        puertal = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_dside_f"));
                        puertar = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_dside_r"));
                        if (puertal != null) {
                            if (calcDist(player_local.position, puertal) <= 1.5) {
                                if (golpesForzar == 5) {
                                    mp.events.callRemote("forzar_puerta", vehicle);
                                    golpesForzar = 0;
                                    return;
                                }
                                else {
                                    golpesForzar++;
                                }
                            }
                        }
                        if (puertar != null) {
                            if (calcDist(player_local.position, puertar) <= 1.5) {
                                if (golpesForzar == 5) {
                                    mp.events.callRemote("forzar_puerta", vehicle);
                                    golpesForzar = 0;
                                    return;
                                }
                                else {
                                    golpesForzar++;
                                }
                            }
                        }
                    }

                    let maletero = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("boot"));
                    if (calcDist(player_local.position, maletero) <= 2.0) {
                        if (golpesForzar == 5) {
                            if (mp.controladorJugadores._jugadores[player_local.id] != undefined) {
                                if (mp.controladorJugadores._jugadores[player_local.id].trabajos && mp.controladorJugadores._jugadores[player_local.id].deservicio) {
                                    if ((mp.controladorJugadores._jugadores[player_local.id].trabajos.includes(1) || mp.controladorJugadores._jugadores[player_local.id].trabajos.includes(2) || mp.controladorJugadores._jugadores[player_local.id].trabajos.includes(25)) && mp.controladorJugadores._jugadores[player_local.id].deservicio == true) {
                                        mp.events.callRemote("policia_abrir_maletero", vehicle);
                                        golpesForzar = 0;
                                        return;
                                    }
                                }
                            }
                            
                            if (faccion != 0) {  
                                mp.events.callRemote("faccion_abrir_maletero", vehicle);
                                golpesForzar = 0;
                                return;
                            }
                        
                            //mp.events.callRemote("forzar_maletero", vehicle);
                            golpesForzar = 0;
                        }
                        else {
                            golpesForzar++;
                        }
                    }
                }
            });
        }
    }
});
var listaModelos = [];
var cochesrobados_cefId = -1;
var cef_cochesrobados = require("./LURP/cef.js");;

mp.events.add("mostrar_cef_coches", function (modelos) {
	listaModelos = (typeof modelos === "string" ? JSON.parse(modelos) : modelos);
    
	
	if (listaModelos != null && Object.keys(listaModelos).length > 0) {
		if (cochesrobados_cefId < 0) {
			cochesrobados_cefId = cef_cochesrobados.crearCef("package://LURP/cef/menusopciones/menuoptions.html", {
				puedeCerrar: false,
				mostrarCursor: true
			});

			let titulo = "Posibles vehículos a robar";
			let evento = "robarvehiculo";
			mp.events.add("robarvehiculo:cerrar", coches_menu_cerrar);
            
			cef_cochesrobados.ejecutarCef(cochesrobados_cefId, `setTitle('${titulo}', '${evento}')`);

			cef_cochesrobados.ejecutarCef(cochesrobados_cefId, `setOptions()`);

            if (cef_cochesrobados != null && cochesrobados_cefId > 0) {
                let listaCoches = [];
                Object.keys(listaModelos).forEach(function (key) {
                    listaCoches.push({ nombre: listaModelos[key], imagen: "https://files.lu-rp.ovh/v/vehiculos/med_" + key + ".png", params: { modelo: key } });
                });
                cef_cochesrobados.ejecutarCef(cochesrobados_cefId, `setMenuOptions('${JSON.stringify(listaCoches)}')`);
            }
		}
    }
});

function coches_menu_cerrar() {
    if (cochesrobados_cefId > 0) {
        cef_cochesrobados.cerrarCef(cochesrobados_cefId, false);
        cochesrobados_cefId = -1;
		mp.events.remove("robarvehiculo:cerrar");
    }
};

//# sourceMappingURL=robovehiculo.js.map
}