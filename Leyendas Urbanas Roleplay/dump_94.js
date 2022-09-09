{
let autoPilotColshape = null;
var intervaloAvisosVehiculo;
var intervaloZ;

// Evento para activar el piloto
mp.events.add("piloto_automatico_vehiculos", (velocidad) =>  
{
	if (!logueado) return;
	if (player_local.vehicle !== null) {
		if (autoPilotActivatedVeh == false) { // Está desactivado -> activar

			if (player_local.vehicle.getPedInSeat(-1) == player_local.handle && autoPilotActivatedVeh == false)
			{
				if (player_local.vehicle.getIsEngineRunning() == 0) {
					mostrarAviso("info", 6000, "Arranque primero el motor del vehiculo");
					return;
				}
					if (mp.game.invoke('0x1DD1F58F493F1DA5')) // IS_WAYPOINT_ACTIVE
					{
						let blipID = mp.game.invoke('0x186E5D252FA50E7D'); 		// _GET_BLIP_INFO_ID_ITERATOR
						let firstBlip = mp.game.invoke('0x1BEDE233E6CD2A1F', blipID); // GET_FIRST_BLIP_INFO_ID
						let nextBlip = mp.game.invoke('0x14F96AA50D6FBEA7', blipID); // GET_NEXT_BLIP_INFO_ID

						for (let i = firstBlip; mp.game.invoke('0xA6DB27D19ECBB7DA', i) != 0; i = nextBlip) // DOES_BLIP_EXIST
						{
							if (mp.game.invoke('0xBE9B0959FFD0779B', i) == 4) // GET_BLIP_INFO_ID_TYPE
							{
								let coord = mp.game.ui.getBlipInfoIdCoord(i);
								if (coord) {
									if (calcDist(new mp.Vector3(611.61035, 5393.0527, 0.0), new mp.Vector3(coord.x, coord.y, 0.0)) < 958.0) { // Distancia entre chilliad y waypoint (en planos X,Y 2D)
										mostrarAviso("danger", 7000, "Por su seguridad el piloto automático no puede realizar el trayecto hasta la ubicación marcada");
										return;
									}
									player_local.taskVehicleDriveToCoordLongrange(player_local.vehicle.handle, coord.x, coord.y, coord.z, velocidad, 536870912 + 786603 + 8, 40.0);
									mostrarAviso("success", 6000, "Piloto automatico activado a " + velocidad + "km/h, disfrute del viaje");
									mp.events.call("sound:play", "pilotoautomaticoactivado", false);
									player_local.setDriverAbility(1.0); 					 //Colocamos la habilidad al player simulando que es el sistema, puesto que el que conduce es el player se lo seteamos a él, con esto mejoramos bastante la IA.
									player_local.vehicle.setHandling("fDriveInertia", 0.4);  //Rebajamos como de rapido coge las revoluciones el motor para evitar giros inesperados y tener mejor respuesta a la hora de detectar Peds o objetos frente nuestra.                                  
									player_local.vehicle.setHandling("fSteeringLock", 0.6); //Aumentamos el tiempo de reaccion girando, contra mas value más girara, pero habrá que tener en cuenta el factor velocidad.  Mejora la respuesta a la hora posibles colisiones.       
									if (mp.game.joaat("neon") && mp.game.joaat("toros") && mp.game.joaat("krieger") && mp.game.joaat("furia") && mp.game.joaat("prototipo"))
									{
										player_local.vehicle.setHandling("fDriveInertia", 0.10);
										player_local.vehicle.setHandling("fSteeringLock", 0.45);
                                    }

									mp.events.add("playerDeath", pilotoVehDeathHandle);
									mp.events.add("playerLeaveVehicle", pilotoVehSalir);
									mp.events.add("playerEnterColshape", pilotoVehColshape);

									autoPilotActivatedVeh = true;

									if (autoPilotColshape != null && mp.colshapes.exists(autoPilotColshape)) autoPilotColshape.destroy();

									//Vuelve el tubo para reducir bugs con temas de altura, le pasamos la z de la función.
									autoPilotColshape = mp.colshapes.newTube(coord.x, coord.y, coord.z, 85, 25);

									clearInterval(intervaloAvisosVehiculo);
									intervaloAvisosVehiculo = setInterval(function () {
										let engineHealth = mp.players.local.vehicle.getBodyHealth(); //Vida del coche
										let tankHealth = mp.players.local.vehicle.getPetrolTankHealth(); //Vida del tanque de combustible
										if (engineHealth < 500) {

											mostrarAviso("danger", 4000, "Cuidado, el motor esta perdiendo potencia");
										}
										if (tankHealth < 650) {
											mostrarAviso("danger", 4000, "Cuidado, fuga detectada en el tanque de combustible");
										}
										//Comprobamos niveles bajos de gasolina o batería
										if (gasolina < 20) {
											if (esVehiculoElectrico(player_local.vehicle)) {
												mostrarAviso("danger", 4000, "Cuidado, bateria baja detectada");
											}
											else {
												mostrarAviso("danger", 4000, "Cuidado, combustible bajo detectado");
											}
										}
										//Comprobamos en vehículos de cuatro ruedas si tienen alguna rueda pinchada
										for (let i = 0; i < 5; i++) {
											if (mp.players.local.vehicle.isTyreBurst(i, true)) {
												mostrarAviso("danger", 4000, "Cuidado, nivel bajo de presion en rueda");
											}
										}
									}, 15000);

									intervaloZ = setInterval(function () {
										let getZ = 0;
										let vueltas = 0;
										for (let i = 0; vueltas < 10; i = i + 50) {
											getZ = mp.game.gameplay.getGroundZFor3dCoord(coord.x, coord.y, coord.z + i, parseFloat(0), false);
											vueltas++;
											if (getZ > 0) {
												if (autoPilotColshape != null && mp.colshapes.exists(autoPilotColshape)) {
													autoPilotColshape.destroy();
													autoPilotColshape = mp.colshapes.newTube(coord.x, coord.y, getZ, 85, 25);
												}
												clearInterval(intervaloZ);
												break;
											}
										}
									}, 4000);

									//Tecla S -> Paramos el piloto, render creado así para poder eliminarlo cuando apagamos el piloto
									mp.events.add('render', render_pilotoautomatico);

								}
								return;
							}
						}
					}
					mostrarAviso("info", 6000, "Coloca la ruta en el GPS para iniciar el trayecto");
					mp.events.call("sound:play", "pilotoautomaticogps", false);

			}
		}
		else if (autoPilotActivatedVeh)
		{ // Está activado -> desactivar
			stopAutopilot(false);
			mostrarAviso("info", 4000, "Piloto automatico parado");
			mp.events.call("sound:play", "pilotoautomaticoparado", false);
		}
	}
});

// Evento para desactivar el piloto
mp.events.add("parar_pilotoautomatico_vehiculos", () => {
	if (!logueado) return;
	if (autoPilotActivatedVeh == true) {
		stopAutopilot(false); // No queremos que abusen de parar en seco
		mostrarAviso("danger", 6000, "Piloto automatico parado");
		mp.events.call("sound:play", "pilotoautomaticoparado", false);
	}
});

function pilotoVehDeathHandle() {
	if (!logueado) return;
	if (autoPilotActivatedVeh == true)
		stopAutopilot(false);
}

function pilotoVehColshape(shape) {
	if (!logueado) return;
	if (shape == autoPilotColshape) {
		stopAutopilot(true);
		mostrarAviso("success", 6000, "Has llegado a tu destino");
		mp.events.call("sound:play", "pilotoautomaticodestino", false);
	}
}

function pilotoVehSalir() {
	if (!logueado) return;
	if (autoPilotActivatedVeh == true)
		stopAutopilot(false);
}

function stopAutopilot(stopVehicle) {
	mp.events.remove('render', render_pilotoautomatico); // Eliminamos el render que creamos específico para para el piloto si tocan la S
	mp.events.remove("playerDeath", pilotoVehDeathHandle);
	mp.events.remove("playerLeaveVehicle", pilotoVehSalir);
	mp.events.remove("playerEnterColshape", pilotoVehColshape);

	if (player_local.vehicle) {
		if (stopVehicle == true) // Si es true detenemos el coche (solo si tocan el colshape final)
			player_local.vehicle.setVelocity(0.0, 0.0, 0.0);
		player_local.setDriverAbility(0.0);
		player_local.vehicle.setHandling("fDriveInertia", 1.0)  //Default
		player_local.vehicle.setHandling("fSteeringLock", 0.65); //Default
		player_local.clearTasks();
		limitadorVelocidad = 0;
	}

	if (autoPilotColshape != null && mp.colshapes.exists(autoPilotColshape)) {
		autoPilotColshape.destroy();
		autoPilotColshape = null;
	}

	autoPilotActivatedVeh = false;
	clearInterval(intervaloAvisosVehiculo);
	clearInterval(intervaloZ);
}

function render_pilotoautomatico() {
	if (!logueado) return;
	if (mp.game.controls.isControlPressed(32, 72)) {
		if (autoPilotActivatedVeh == true) {
			stopAutopilot(true);
			mostrarAviso("danger", 6000, "Piloto automatico parado");
			mp.events.call("sound:play", "pilotoautomaticoparado", false);
		}
	}
}
}