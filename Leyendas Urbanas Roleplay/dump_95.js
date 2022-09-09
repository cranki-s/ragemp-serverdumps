{
﻿const localPlayer = mp.players.local;
let autoPilotColshape = null;
var intervaloAvisosAeronaves;
var avisosCargados = false;
mp.events.add("piloto_automatico_aeronaves", (velocidad) => 
{
	if (!logueado)
		return;
	if (player_local.vehicle !== null) {
		if (autoPilotActivated == false) { // Est desactivado -> activar

			if (localPlayer.vehicle.getPedInSeat(-1) == localPlayer.handle) {
				if (localPlayer.vehicle.getIsEngineRunning() == false) {
					mostrarAviso("info", 5000, "Arranque primero los motores de la aeronave")
					return;
				}
				try {
					if (mp.game.invoke('0x1DD1F58F493F1DA5')) // IS_WAYPOINT_ACTIVE
					{
						let blipID = mp.game.invoke('0x186E5D252FA50E7D'); 		// _GET_BLIP_INFO_ID_ITERATOR
						let firstBlip = mp.game.invoke('0x1BEDE233E6CD2A1F', blipID); // GET_FIRST_BLIP_INFO_ID
						let nextBlip = mp.game.invoke('0x14F96AA50D6FBEA7', blipID); // GET_NEXT_BLIP_INFO_ID

						for (let i = firstBlip; mp.game.invoke('0xA6DB27D19ECBB7DA', i) != 0; i = nextBlip) // DOES_BLIP_EXIST
						{
							if (mp.game.invoke('0xBE9B0959FFD0779B', i) == 4) // GET_BLIP_INFO_ID_TYPE
							{
								var coord = mp.game.ui.getBlipInfoIdCoord(i);
								let altitude = mp.players.local.getHeightAboveGround();
								if (altitude < 60) {
									mostrarAviso("danger", 6000, "Necesitas estar a una altitud mas alta para accionarlo")
									return;
								}
								if (coord) {
									localPlayer.taskPlaneMission(localPlayer.vehicle.handle, 0, 0, coord.x, coord.y, coord.z, 4, velocidad / 3.6, 100.0, 190.0, 20000.0, 550.0);
									mostrarAviso("success", 6000, "Activado sistema de ayuda en trayectoria de vuelo a " + velocidad + "km/h");
									mp.game.audio.playSoundFrontend(-1, "CHALLENGE_UNLOCKED", "HUD_AWARDS", true);
									localPlayer.setDriverAbility(1.0);
									//Rebajamos como de rapido coge las revoluciones el motor para evitar giros inesperados y tener mejor respuesta a la hora de detectar Peds o objetos frente nuestra.
									localPlayer.vehicle.setHandling("fDriveInertia", 0.5);
									//Aumentamos el tiempo de reaccion girando, contra mas value ms girara, pero habr que tener en cuenta el factor velocidad.  Mejora la respuesta a la hora posibles colisiones.                                      
									localPlayer.vehicle.setHandling("fSteeringLock", 0.9);

									mp.events.add("playerDeath", pilotoDeathHandle);
									mp.events.add("playerLeaveVehicle", pilotoSalir);
									mp.events.add("playerEnterColshape", pilotoColshape);

									autoPilotActivated = true;

									if (autoPilotColshape != null && mp.colshapes.exists(autoPilotColshape)) autoPilotColshape.destroy();

									autoPilotColshape = mp.colshapes.newSphere(coord.x, coord.y, coord.z, 15.0, localPlayer.dimension);

									clearInterval(intervaloAvisosAeronaves);
									intervaloAvisosAeronaves = setInterval(function () {
										let altitude = mp.players.local.getHeightAboveGround();
										if (altitude < 85 && !avisosCargados) {
											mp.events.call("sound:play", "pilotoaeronavealertaaltitud", false);
											mostrarAviso("danger", 4000, "Cuidado, la aeronave ha bajado el limite permitido de altitud");
											avisosCargados = true;
										}
										else if (altitude > 85 && avisosCargados) {
											avisosCargados = false
											mostrarAviso("info", 4000, "Altitud retomada, te volveremos a avisar si desciende")
										}
									}, 8000);
								}
								return;
							}
						}
					}
				} catch (e) { }
				mostrarAviso("info", 5000, "Coloque el input en el mapa para cargar la ruta");
				mp.events.call("sound:play", "pilotoautomaticogps", false);
			}
		} else { // Est activado -> desactivar
			stopAutopilotPlane(false);
			mostrarAviso("info", 5000, "Asistencia de trayectoria en vuelo parada");
			mp.events.call("sound:play", "pilotoautomaticoparado", false);
			limitadorVelocidad = 0;
        }
	}
});

function pilotoDeathHandle() {
	if (!logueado) return;
	if (autoPilotActivated == true)
		stopAutopilotPlane(false)
}

function pilotoColshape(shape) {
	if (!logueado) return;
	if (shape == autoPilotColshape) {
		stopAutopilotPlane();
		mostrarAviso("success", 4000, "Ha llegado al input que coloco");
		mp.events.call("sound:play", "pilotoautomaticodestino", false);
	}
}

function pilotoSalir() {
	if (!logueado) return;
	if (autoPilotActivated == true)
		stopAutopilotPlane(false)
}

function stopAutopilotPlane(stopVehicle = true) {
	mp.events.remove("playerDeath", pilotoDeathHandle);
	mp.events.remove("playerLeaveVehicle", pilotoSalir);
	mp.events.remove("playerEnterColshape", pilotoColshape);

	if (autoPilotActivated) {
		if (localPlayer.vehicle) {
			if (stopVehicle) localPlayer.vehicle.setVelocity(0.0, 0.0, 0.0);
			localPlayer.setDriverAbility(0.0);
			localPlayer.vehicle.setHandling("fDriveInertia", 0.6)  //Default
			localPlayer.vehicle.setHandling("fSteeringLock", 0.45); //Default
			localPlayer.clearTasks();
		}

		if (autoPilotColshape != null && mp.colshapes.exists(autoPilotColshape)) {
			autoPilotColshape.destroy();
			autoPilotColshape = null;
		}

		autoPilotActivated = false;
		clearInterval(intervaloAvisosAeronaves)
		avisosCargados = false;
	}
}


}