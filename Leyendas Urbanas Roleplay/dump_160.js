{
﻿/*
 * Autores: Semi3k, poleStar
 * 
 * Descripción: Sistema de graffitis
 * */

// Variables funcionamiento local graffitis
const sinPositivo = Math.sin(1.5708); // +90
const cosPositivo = Math.cos(1.5708); // +90

const sinNegativo = Math.sin(-1.5708); // -90
const cosNegativo = Math.cos(-1.5708); // -90

let modelo = null;
let nuevoGraffiti = null;
let paredCalculada = null;

let listaGraffitisGlobal = [];
let listaGraffitisFaccion = [];

let cef_graffitis = require("./LURP/cef.js");
let graffitis_cefId = -1;

let graff_cercano = false;

let categorias_mostradas = 0; // 0 - ninguna, 1 - globales, 2 - faccion, 3 - ambas
let posicion_pj = null;

let intervalBorrado = null;
let confirmarLimpiar = null;

// Variables sincronizacion particulas spray
let int_distancia = null; // Intervalo para destruir particulas cuando ya estamos demasiado lejos de ellas (en ese caso ya no recibimos el evento en rango para pararlas)
let fxSpray = null; // Efecto de particula local
let efectos_sync = []; // Array de particulas sincronizadas {id: sqlid_personaje, fx: particula, pos: posicion}

// Evento para mostrar el cef de graffitis cargando los globales y en caso de ser necesario los de faccion
mp.events.add("mostrar_cef_graffitis", function (encontrado, jsonGlobal, jsonFaccion = null) {
	if (jsonGlobal == null) {
		if (jsonFaccion != null) {
			graff_cercano = encontrado;
			listaGraffitisFaccion = (typeof jsonFaccion === "string" ? JSON.parse(jsonFaccion) : jsonFaccion);

			if (listaGraffitisFaccion != null && listaGraffitisFaccion.length > 0) {
				if (graffitis_cefId < 0) {
					graffitis_cefId = cef_graffitis.crearCef("package://LURP/cef/menusopciones/menuoptions.html", {
						puedeCerrar: true,
						mostrarCursor: true
					}, true);

					mp.events.add("crear_graffiti:facciones", facciones_menu);
					mp.events.add("crear_graffiti:cerrar", graffitis_menu_cerrar);

					let titulo = "Graffitis";
					let evento = "crear_graffiti";

					cef_graffitis.ejecutarCef(graffitis_cefId, `setTitle('${titulo}', '${evento}')`);

					let opciones = [{ nombre: "Facciones", evento: "facciones" }];

					cef_graffitis.ejecutarCef(graffitis_cefId, `setOptions('${JSON.stringify(opciones)}')`);
					categorias_mostradas = 2;
				}
			}
		}
	}
	else {
		graff_cercano = encontrado;
		listaGraffitisGlobal = (typeof jsonGlobal === "string" ? JSON.parse(jsonGlobal) : jsonGlobal);

		if (jsonFaccion != null) {
			listaGraffitisFaccion = (typeof jsonFaccion === "string" ? JSON.parse(jsonFaccion) : jsonFaccion);
		}
		if (listaGraffitisGlobal != null && listaGraffitisGlobal.length > 0) {
			if (graffitis_cefId < 0) {
				graffitis_cefId = cef_graffitis.crearCef("package://LURP/cef/menusopciones/menuoptions.html", {
					puedeCerrar: true,
					mostrarCursor: true
				}, true);

				mp.events.add("crear_graffiti:globales", globales_menu);
				mp.events.add("crear_graffiti:cerrar", graffitis_menu_cerrar);

				let titulo = "Graffitis";
				let evento = "crear_graffiti";

				cef_graffitis.ejecutarCef(graffitis_cefId, `setTitle('${titulo}', '${evento}')`);

				let opciones = [{ nombre: "Globales", evento: "globales" }];
				if (listaGraffitisFaccion != null && listaGraffitisFaccion.length > 0) {
					opciones.push({ nombre: "Facciones", evento: "facciones" });
					mp.events.add("crear_graffiti:facciones", facciones_menu);
					categorias_mostradas = 3;
				}
				else {
					categorias_mostradas = 1;
				}

				cef_graffitis.ejecutarCef(graffitis_cefId, `setOptions('${JSON.stringify(opciones)}')`);
			}
		}
	}
});

// Funcion para enviar al cef los graffitis globales cargados
function globales_menu() {
	let graffitisGlobales = [];

	for (let i = 0, n = listaGraffitisGlobal.length; i < n; i++) {
		let model = listaGraffitisGlobal[i].modelo;
		let name = listaGraffitisGlobal[i].nombre;
		let img = listaGraffitisGlobal[i].imagen;

		graffitisGlobales.push({ nombre: name, imagen: "package://LURP/assets/images/graffitis/" + img + ".png", params: { modelo: model } });
	}

	cef_graffitis.ejecutarCef(graffitis_cefId, `setMenuOptions('${JSON.stringify(graffitisGlobales)}')`);
}

// Funcion para enviar al cef los graffitis de faccion cargados
function facciones_menu() {
	let graffitisFaccion = [];

	for (let i = 0, n = listaGraffitisFaccion.length; i < n; i++) {
		let model = listaGraffitisFaccion[i].modelo;
		let name = listaGraffitisFaccion[i].nombre;
		let img = listaGraffitisFaccion[i].imagen;

		graffitisFaccion.push({ nombre: name, imagen: "package://LURP/assets/images/graffitis/" + img + ".png", params: { modelo: model } });
	}

	cef_graffitis.ejecutarCef(graffitis_cefId, `setMenuOptions('${JSON.stringify(graffitisFaccion)}')`);
}

// Evento para calcular si el cliente tiene espacio suficiente, en ese caso abrimos el cef
mp.events.add("calcular_pared", function () {
	paredCalculada = calcularPared();
	if (paredCalculada != null) {
		if (paredCalculada.puedeUsar == true) {
			mp.events.callRemote("cef_grafiti");
		}
		else {
			switch (paredCalculada.error) {
				case 1:
					mostrarAviso("danger", 6500, "No estás frente a una pared, o su superficie no es suficientemente grande y plana");
					break;
				case 2:
					mostrarAviso("danger", 5000, "Estás demasiado cerca de la pared");
					break;
				case 3:
					mostrarAviso("danger", 5000, "Estás demasiado lejos de la pared");
					break;
				case 4:
					mostrarAviso("danger", 5000, "Aquí no puedes poner un grafiti");
					break;
				default:
					mostrarAviso("danger", 4000, "Error desconocido");
					break;
			}

			paredCalculada = null;
			graff_cercano = false;
			modelo = null;
			nuevoGraffiti = null;
			listaGraffitisGlobal = [];
			listaGraffitisFaccion = [];
			categorias_mostradas = 0;
		}
	}
	else {
		mostrarAviso("danger", 4000, "Error desconocido");

		graff_cercano = false;
		modelo = null;
		nuevoGraffiti = null;
		listaGraffitisGlobal = [];
		listaGraffitisFaccion = [];
		categorias_mostradas = 0;
	}
});

/**
 * Crea el graffiti según el modelo introducido
 * 
 * @param {any} model Modelo de graffiti a crear
 */
mp.events.add("crear_graffiti:seleccionar", function (e) {
	if (graffitis_cefId >= 0) {
		cef_graffitis.cerrarCef(graffitis_cefId, false);
		graffitis_cefId = -1;
	}

	switch (categorias_mostradas) {
		case 1:
			mp.events.remove("crear_graffiti:globales");
			mp.events.remove("crear_graffiti:cerrar");
			break;
		case 2:
			mp.events.remove("crear_graffiti:facciones");
			mp.events.remove("crear_graffiti:cerrar");
			break;
		case 3:
			mp.events.remove("crear_graffiti:globales");
			mp.events.remove("crear_graffiti:facciones");
			mp.events.remove("crear_graffiti:cerrar");
			break;
		default:
			break;
	}

	if (typeof e === "string") {
		let params = JSON.parse(e);
		modelo = params.modelo;

		if (paredCalculada != null) {
			nuevoGraffiti = CreateModel(modelo, paredCalculada.posicion, paredCalculada.posicionNormal);
			if (nuevoGraffiti != undefined && nuevoGraffiti != null && mp.objects.exists(nuevoGraffiti)) {
				posicion_pj = player_local.position;
				setAlphas();
			}
			else {
				mostrarAviso("danger", 4000, "El modelo de graffiti seleccionado no existe");
				paredCalculada = null;
				graff_cercano = false;
				modelo = null;
				nuevoGraffiti = null;
				listaGraffitisGlobal = [];
				listaGraffitisFaccion = [];
				categorias_mostradas = 0;
			}
		}
		else {
			mostrarAviso("danger", 4000, "Error desconocido");

			graff_cercano = false;
			modelo = null;
			nuevoGraffiti = null;
			listaGraffitisGlobal = [];
			listaGraffitisFaccion = [];
			categorias_mostradas = 0;
		}
	}
	else {
		mostrarAviso("danger", 4000, "Error desconocido");

		paredCalculada = null;
		graff_cercano = false;
		modelo = null;
		nuevoGraffiti = null;
		listaGraffitisGlobal = [];
		listaGraffitisFaccion = [];
		categorias_mostradas = 0;
	}
});

/**
 * Inicia el limpiado de un grafiti
 * 
 * Si te mueves, cancelas animación o cambias de dimension (entrar interiores) se cancela el limpiado
 * 
 * @param {number} tiempo Tiempo de duración de la limpieza
 * @param {number} fase Fase de limpieza realizada
 */
mp.events.add("limpiar_grafiti", function (tiempo, fase) {
	mp.events.callRemote("aplicar_animacion_sincronizada", "oddjobs@assassinate@multi@windowwasher", "_wash_loop", 5, 5, -1, 1);

	const posBorrado = player_local.position;
	const dimBorrado = player_local.dimension;
	const faseBorrado = fase + 1;
	const tiempoFinal = tiempo * 1000;

	if (confirmarLimpiar != null) {
		clearTimeout(confirmarLimpiar);
		confirmarLimpiar = null;
	}
	confirmarLimpiar = crearTimeout(() => {
		mp.events.callRemote("confirmar:borrado:grafiti", faseBorrado);

		if (intervalBorrado != null) {
			clearInterval(intervalBorrado);
			intervalBorrado = null;
		}
		confirmarLimpiar = null;
	}, tiempoFinal);

	let tiempoEstimado = 0;
	let contadorAnim = 0;
	if (intervalBorrado != null) {
		clearInterval(intervalBorrado);
		intervalBorrado = null;
	}
	intervalBorrado = setInterval(function () {
		if (tiempoEstimado >= tiempoFinal) {
			mp.events.callRemote("confirmar:borrado:grafiti", faseBorrado);

			if (confirmarLimpiar != null) {
				clearTimeout(confirmarLimpiar);
				confirmarLimpiar = null;
			}

			clearInterval(intervalBorrado);
			intervalBorrado = null;
			return;
		}

		if (confirmarLimpiar == null) {
			clearInterval(intervalBorrado);
			intervalBorrado = null;
			return;
		}
		else {
			if (calcDist(player_local.position, posBorrado) > 1.0 || player_local.dimension != dimBorrado) {
				mp.events.callRemote("cancelar:borrado:grafiti", 2);

				clearTimeout(confirmarLimpiar);
				confirmarLimpiar = null;
				clearInterval(intervalBorrado);
				intervalBorrado = null;
				return;
			}

			if (!player_local.isPlayingAnim("oddjobs@assassinate@multi@windowwasher", "_wash_loop", 3)) {
				contadorAnim++;

				if (contadorAnim > 7) {
					mp.events.callRemote("cancelar:borrado:grafiti", 3);

					clearTimeout(confirmarLimpiar);
					confirmarLimpiar = null;
					clearInterval(intervalBorrado);
					intervalBorrado = null;
					return;
				}
			}
			else {
				contadorAnim = 0;
			}
		}

		tiempoEstimado += 150;
	}, 150);
});

/**
 * Evento recibido tras ser cancelado el limpiado por cualquier motivo
 * Para el intervalo y timeout
 */
mp.events.add("cancelar_limpiar", function () {
	if (confirmarLimpiar != null) {
		clearTimeout(confirmarLimpiar);
		confirmarLimpiar = null;
	}
	if (intervalBorrado != null) {
		clearInterval(intervalBorrado);
		intervalBorrado = null;
	}
});

// Funcion para cerrar el cef de graffitis
function graffitis_menu_cerrar() {
	if (graffitis_cefId > 0) {
		cef_graffitis.cerrarCef(graffitis_cefId, false);
		graffitis_cefId = -1;

		switch (categorias_mostradas) {
			case 1:
				mp.events.remove("crear_graffiti:globales");
				mp.events.remove("crear_graffiti:cerrar");
				break;
			case 2:
				mp.events.remove("crear_graffiti:facciones");
				mp.events.remove("crear_graffiti:cerrar");
				break;
			case 3:
				mp.events.remove("crear_graffiti:globales");
				mp.events.remove("crear_graffiti:facciones");
				mp.events.remove("crear_graffiti:cerrar");
				break;
			default:
				break;
		}
	}

	listaGraffitisGlobal = [];
	listaGraffitisFaccion = [];
	categorias_mostradas = 0;
};

/**
 * Calcula la posicion de colision y el vector normal de la colision con una pared.
 * 
 * @return {object} Devuelve objeto con la posicion y posicion normal de la colision, null en caso de que no haya colision o no sea válida.
 * */
function calcularPared() {
	// raycast central
	let position = new mp.Vector3(player_local.position.x, player_local.position.y, player_local.position.z + 0.35);
	let direction = player_local.getForwardVector();
	let farAway = new mp.Vector3((direction.x * 5) + (position.x), (direction.y * 5) + (position.y), (direction.z * 5) + (position.z));
	let raycastMaterial = mp.raycasting.testCapsule(position, farAway, 0.001, null, 1); // Colision con mapa SOLO PARA VER MATERIAL
	if (raycastMaterial) { // Ha tocado algo
		let materialPermitido = false;
		let materialDetectado = raycastMaterial.material;
		if (materialDetectado != undefined && materialDetectado != null) {
			materialPermitido = obtenerTerrenoDeMaterial(materialDetectado).puedePonerGraffiti;
		}

		let entityMaterial = raycastMaterial.entity;
		if (entityMaterial != undefined && entityMaterial != null) {
			limpiarHandleRaycast(entityMaterial);
		}

		if (materialPermitido == false) {
			return { puedeUsar: false, error: 4, posicion: null, posicionNormal: null };
		}
	}
	else {
		return { puedeUsar: false, error: 4, posicion: null, posicionNormal: null };
    }

	let raycast = mp.raycasting.testPointToPoint(position, farAway, null, 1); // Colision con mapa - raycast central usado para calcular posicion y rotacion del grafiti

	/*
	 * Si a partir de este punto no entiendes que cojones es esta mierda mejor no toques nada y avisa al puto loco de poleStar
	 * 
	 * 9 raycast los cuales comprueban de forma muy muy precisa si la pared es suficientemente grande y plana.
	 * Esto también permite que el usuario no tenga que estar 100% de frente a la pared.
	 * 
	 * Imagen que explica que hace todo el siguiente código: https://i.imgur.com/3xv5mrZ.png
	 * Para poder ver las lineas de debug de esa ^^ imagen busca los cambios del commit "5504f17" y el siguiente a ese que afecta a este archivo
	 */

	let colision = null;
	let colisionDer = null;
	let colisionIzq = null;
	let colisionUp = null;
	let colisionDown = null;
	let colisionEsqUpDer = null;
	let colisionEsqDownDer = null;
	let colisionEsqUpIzq = null;
	let colisionEsqDownIzq = null;
	let entityN = null;
	let entityDer = null;
	let entityIzq = null;
	let entityUp = null;
	let entityDown = null;
	let entityEsqUpDer = null;
	let entityEsqDownDer = null;
	let entityEsqUpIzq = null;
	let entityEsqDownIzq = null;
	if (raycast) {
		entityN = raycast.entity;
		if (entityN != undefined && entityN != null) {
			colision = raycast.position;
			limpiarHandleRaycast(entityN);

			let distancia = calcDist(position, colision);
			if (distancia < 0.8) {
				return { puedeUsar: false, error: 2, posicion: null, posicionNormal: null };
			}
			if (distancia > 2.0) {
				return { puedeUsar: false, error: 3, posicion: null, posicionNormal: null };
			}

			// pos derecha
			let directionDer = new mp.Vector3(direction.x * cosPositivo - direction.y * sinPositivo, direction.x * sinPositivo + direction.y * cosPositivo, direction.z);
			let farAwayDer = new mp.Vector3((directionDer.x * 1.8) + (position.x), (directionDer.y * 1.8) + (position.y), (directionDer.z * 1.8) + (position.z));
			let finalDer = new mp.Vector3((direction.x * 3) + (farAwayDer.x), (direction.y * 3) + (farAwayDer.y), (direction.z * 3) + (farAwayDer.z));
			let raycastDer = mp.raycasting.testPointToPoint(farAwayDer, finalDer, null, 17);

			// pos izquierda
			let directionIzq = new mp.Vector3(direction.x * cosNegativo - direction.y * sinNegativo, direction.x * sinNegativo + direction.y * cosNegativo, direction.z);
			let farAwayIzq = new mp.Vector3((directionIzq.x * 1.8) + (position.x), (directionIzq.y * 1.8) + (position.y), (directionIzq.z * 1.8) + (position.z));
			let finalIzq = new mp.Vector3((direction.x * 3) + (farAwayIzq.x), (direction.y * 3) + (farAwayIzq.y), (direction.z * 3) + (farAwayIzq.z));
			let raycastIzq = mp.raycasting.testPointToPoint(farAwayIzq, finalIzq, null, 17);

			// pos arriba
			let farAwayUp = new mp.Vector3(position.x, position.y, position.z + 0.7);
			let finalUp = new mp.Vector3((direction.x * 3) + (farAwayUp.x), (direction.y * 3) + (farAwayUp.y), (direction.z * 3) + (farAwayUp.z));
			let raycastUp = mp.raycasting.testPointToPoint(farAwayUp, finalUp, null, 17);

			// pos abajo
			let farAwayDown = new mp.Vector3(position.x, position.y, position.z - 0.7);
			let finalDown = new mp.Vector3((direction.x * 3) + (farAwayDown.x), (direction.y * 3) + (farAwayDown.y), (direction.z * 3) + (farAwayDown.z));
			let raycastDown = mp.raycasting.testPointToPoint(farAwayDown, finalDown, null, 17);

			// esq arriba derecha
			let raycastEsqUpDer = mp.raycasting.testPointToPoint(new mp.Vector3(farAwayDer.x, farAwayDer.y, farAwayDer.z + 0.7), new mp.Vector3(finalDer.x, finalDer.y, finalDer.z + 0.7), null, 17);

			// esq abajo derecha
			let raycastEsqDownDer = mp.raycasting.testPointToPoint(new mp.Vector3(farAwayDer.x, farAwayDer.y, farAwayDer.z - 0.7), new mp.Vector3(finalDer.x, finalDer.y, finalDer.z - 0.7), null, 17);

			// esq arriba izquierda
			let raycastEsqUpIzq = mp.raycasting.testPointToPoint(new mp.Vector3(farAwayIzq.x, farAwayIzq.y, farAwayIzq.z + 0.7), new mp.Vector3(finalIzq.x, finalIzq.y, finalIzq.z + 0.7), null, 17);

			// esq abajo izquierda
			let raycastEsqDownIzq = mp.raycasting.testPointToPoint(new mp.Vector3(farAwayIzq.x, farAwayIzq.y, farAwayIzq.z - 0.7), new mp.Vector3(finalIzq.x, finalIzq.y, finalIzq.z - 0.7), null, 17);

			if (raycastDer) {
				entityDer = raycastDer.entity;
				if (entityDer != undefined && entityDer != null) {
					colisionDer = raycastDer.position;
					limpiarHandleRaycast(entityDer);
					if (raycastIzq) {
						entityIzq = raycastIzq.entity;
						if (entityIzq != undefined && entityIzq != null) {
							colisionIzq = raycastIzq.position;
							limpiarHandleRaycast(entityIzq);
							if (raycastUp) {
								entityUp = raycastUp.entity;
								if (entityUp != undefined && entityUp != null) {
									colisionUp = raycastUp.position;
									limpiarHandleRaycast(entityUp);
									if (raycastDown) {
										entityDown = raycastDown.entity;
										if (entityDown != undefined && entityDown != null) {
											colisionDown = raycastDown.position;
											limpiarHandleRaycast(entityDown);
											if (raycastEsqUpDer) {
												entityEsqUpDer = raycastEsqUpDer.entity;
												if (entityEsqUpDer != undefined && entityEsqUpDer != null) {
													colisionEsqUpDer = raycastEsqUpDer.position;
													limpiarHandleRaycast(entityEsqUpDer);
													if (raycastEsqDownDer) {
														entityEsqDownDer = raycastEsqDownDer.entity;
														if (entityEsqDownDer != undefined && entityEsqDownDer != null) {
															colisionEsqDownDer = raycastEsqDownDer.position;
															limpiarHandleRaycast(entityEsqDownDer);
															if (raycastEsqUpIzq) {
																entityEsqUpIzq = raycastEsqUpIzq.entity;
																if (entityEsqUpIzq != undefined && entityEsqUpIzq != null) {
																	colisionEsqUpIzq = raycastEsqUpIzq.position;
																	limpiarHandleRaycast(entityEsqUpIzq);
																	if (raycastEsqDownIzq) {
																		entityEsqDownIzq = raycastEsqDownIzq.entity;
																		if (entityEsqDownIzq != undefined && entityEsqDownIzq != null) {
																			colisionEsqDownIzq = raycastEsqDownIzq.position;
																			limpiarHandleRaycast(entityEsqDownIzq);

																			let resultadoLados = calcDist(colisionDer, colision) + calcDist(colisionIzq, colision);
																			let resultadoEsperadoLados = calcDist(colisionDer, colisionIzq);

																			// Esta mirando a una pared recta si los tres puntos forman una linea recta
																			if (Math.abs(resultadoEsperadoLados - resultadoLados) < 0.000001) {
																				let resultadoEsquinasUp = calcDist(colisionEsqUpDer, colisionUp) + calcDist(colisionEsqUpIzq, colisionUp);
																				let resultadoEsperadoEsquinasUp = calcDist(colisionEsqUpDer, colisionEsqUpIzq);

																				if (Math.abs(resultadoEsperadoEsquinasUp - resultadoEsquinasUp) < 0.000001) {
																					let resultadoEsquinasDown = calcDist(colisionEsqDownDer, colisionDown) + calcDist(colisionEsqDownIzq, colisionDown);
																					let resultadoEsperadoEsquinasDown = calcDist(colisionEsqDownDer, colisionEsqDownIzq);

																					if (Math.abs(resultadoEsperadoEsquinasDown - resultadoEsquinasDown) < 0.000001) {
																						if (calcDist(new mp.Vector3(colisionUp.x, colisionUp.y, 0.0), new mp.Vector3(colisionDown.x, colisionDown.y, 0.0)) < 0.1) {
																							let posicionObjeto = raycast.position;
																							let posicionNormalObjeto = new mp.Vector3(raycast.surfaceNormal.x, raycast.surfaceNormal.y, raycast.surfaceNormal.z);

																							let dist = graff_cercano == false ? 0.017 : 0.023; // Si hay graffiti cercano sobreponemos ligeramente el nuevo

																							let posFinal = new mp.Vector3((posicionNormalObjeto.x * dist) + (posicionObjeto.x), (posicionNormalObjeto.y * dist) + (posicionObjeto.y), (posicionNormalObjeto.z * dist) + (posicionObjeto.z));

																							if (posicionObjeto != null && posicionNormalObjeto != null) {
																								return { puedeUsar: true, error: 0, posicion: posFinal, posicionNormal: posicionNormalObjeto };
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return { puedeUsar: false, error: 1, posicion: null, posicionNormal: null };
}

// Funcion para crear un modelo pegandolo a la pared correctamente
function CreateModel(model, pos, normal) {
	let atan = Math.atan2(normal.x, normal.y);
	let angleDegrees = 180 + (atan * -180 / Math.PI);

	return mp.objects.new(mp.game.joaat(model), pos,
		{
			rotation: new mp.Vector3(normal.x, normal.y, angleDegrees),
			alpha: 0,
			dimension: player_local.dimension
		});
}

/**
 * Cada segundo aumenta ligeramente el alpha del graffiti, cuando llega a 255 elimina la entidad local y envia a servidor la informacion para su creacion y guardado.
 */
function setAlphas() {
	mp.events.callRemote("aplicar_animacion_sincronizada", "oddjobs@assassinate@multi@windowwasher", "_wash_loop", 5, 5, -1, 1);
	particulaSpray(true);

	let alpha = 0;
	let interval = setInterval(function () {
		if (typeof lata_spray === "undefined" || lata_spray == null || !player_local.isPlayingAnim("oddjobs@assassinate@multi@windowwasher", "_wash_loop", 3)) {
			if (nuevoGraffiti != undefined && nuevoGraffiti != null && mp.objects.exists(nuevoGraffiti)) {
				nuevoGraffiti.destroy();
			}

			particulaSpray(false);

			mp.events.callRemote("limpiar_animacion");
			mostrarAviso("danger", 4000, "Has parado de pintar antes de acabar el graffiti");

			graff_cercano = false;
			nuevoGraffiti = null;
			modelo = null;
			listaGraffitisGlobal = [];
			listaGraffitisFaccion = [];
			categorias_mostradas = 0;
			clearInterval(interval);
			interval = null;
			return;
		}
		else if (calcDist(player_local.position, posicion_pj) > 1.0) {
			if (nuevoGraffiti != undefined && nuevoGraffiti != null && mp.objects.exists(nuevoGraffiti)) {
				nuevoGraffiti.destroy();
			}

			particulaSpray(false);

			mp.events.callRemote("limpiar_animacion");
			mostrarAviso("danger", 4000, "Te has movido antes de acabar el graffiti");

			graff_cercano = false;
			nuevoGraffiti = null;
			modelo = null;
			listaGraffitisGlobal = [];
			listaGraffitisFaccion = [];
			categorias_mostradas = 0;
			clearInterval(interval);
			interval = null;
			return;
		}
		else {
			if (nuevoGraffiti != undefined && nuevoGraffiti != null && mp.objects.exists(nuevoGraffiti)) {
				alpha += 51; // El alpha visible va en incrementos de 51
				switch(alpha){
					case 51:
						mostrarAviso("info", 5000, "Te quedan 80 segundos para acabar el grafiti");
						break;
					case 102:
						mostrarAviso("info", 5000, "Te quedan 60 segundos para acabar el grafiti");
						break;
					case 153:
						mostrarAviso("info", 5000, "Te quedan 40 segundos para acabar el grafiti");
						break;
					case 204:
						mostrarAviso("info", 5000, "Te quedan 20 segundos para acabar el grafiti");
						break;
					default:
						break;
				}

				let pos = nuevoGraffiti.position;
				let rot = nuevoGraffiti.rotation;
				nuevoGraffiti.destroy();
				nuevoGraffiti = CreateModel(modelo, pos, rot);
				nuevoGraffiti.setAlpha(alpha);

				if (alpha >= 255) {
					particulaSpray(false);

					mp.events.callRemote("guardar_grafiti", JSON.stringify(modelo), pos, rot); // Guardado y creacion del graffiti en servidor
					crearTimeout(function () {
						if (nuevoGraffiti != undefined && nuevoGraffiti != null && mp.objects.exists(nuevoGraffiti)) {
							nuevoGraffiti.destroy();
							nuevoGraffiti = null;
						}
					}, 50);

					graff_cercano = false;
					modelo = null;
					listaGraffitisGlobal = [];
					listaGraffitisFaccion = [];
					categorias_mostradas = 0;
					clearInterval(interval);
					interval = null;
				}
			}
			else {
				particulaSpray(false);

				mp.events.callRemote("limpiar_animacion");
				mostrarAviso("danger", 4000, "Error al crear el graffiti");

				graff_cercano = false;
				nuevoGraffiti = null;
				modelo = null;
				listaGraffitisGlobal = [];
				listaGraffitisFaccion = [];
				categorias_mostradas = 0;
				clearInterval(interval);
				interval = null;
			}
        }
	}, 20000);
}

/**
 * Funcion para crear/borrar la particula local y enviar el evento para sincronizarla en rango
 * 
 * @param {boolean} crear Indica si se crea o destruye la particula
 */
async function particulaSpray(crear) {
	if (crear == true) {
		if (typeof lata_spray !== "undefined" && typeof lata_spray.handle === "number") { // Si tiene la lata de spray en la mano y la particula no existe la creamos. Si la particula existe actualizamos la rotacion
			if (fxSpray == null || mp.game.graphics.doesParticleFxLoopedExist(fxSpray) == false) {
				if (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_playerlamgraff")) {
					mp.game.streaming.requestNamedPtfxAsset("scr_playerlamgraff");
					while (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_playerlamgraff")) {
						await mp.game.waitAsync(0);
					}
				}

				mp.game.graphics.setPtfxAssetNextCall("scr_playerlamgraff");
				fxSpray = mp.game.graphics.startParticleFxLoopedOnEntity2("scr_lamgraff_paint_spray", lata_spray.handle, 0.0, 0.0, 0.015, 0.0, 0.0, 90.0, 1.0, false, false, false);

				mp.events.callRemote("spray:particle", true);
			}
		}
	}
	else {
		if (fxSpray != null && mp.game.graphics.doesParticleFxLoopedExist(fxSpray) == true) {
			mp.events.callRemote("spray:particle", false);
			mp.game.graphics.stopParticleFxLooped(fxSpray, false);
			fxSpray = null;
		}
	}
}

/**
 * Evento para sincronizar las particulas, bool indica si se crea o destruye la particula
 * 
 * Bool --> Indica si crear o borrar la particula
 * sqlidpj --> Usada para enlazar la persona "propietaria" de la particula con su particula y posicion
 */
mp.events.add('spray:particle', async function (player, bool, sqlidPj = -1) {
	let sqlid = sqlidPj;
	if (sqlid != -1 && player != player_local && player != undefined && player != null) {
		if (bool == true) { // Crear -> Obtenemos la entidad de la lata de spray que tiene en la mano, creamos y guardamos la particula
			if (player.objetos[91] != undefined) { // Comprobamos que tiene el objeto de la lata de spray en la mano
				let lata = player.objetos[91].objeto;
				if (lata != undefined && lata != null && mp.objects.exists(lata) && lata.model == 1749718958) {
					let efecto = null;
					for (let i = 0, n = efectos_sync.length; i < n; i++) {
						if (efectos_sync[i].id == sqlid) { // Si es el jugador que acabamos de recibir
							efecto = efectos_sync[i].fx;
							break;
						}
					}

					// Si el jugador ya tiene la particula activa la paramos
					if (efecto != null && mp.game.graphics.doesParticleFxLoopedExist(efecto) == true) {
						mp.game.graphics.stopParticleFxLooped(efecto, false);
					}

					// Cargamos y creamos la particula
					if (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_playerlamgraff")) {
						mp.game.streaming.requestNamedPtfxAsset("scr_playerlamgraff");
						while (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_playerlamgraff")) {
							await mp.game.waitAsync(0);
						}
					}

					mp.game.graphics.setPtfxAssetNextCall("scr_playerlamgraff");
					let particula = mp.game.graphics.startParticleFxLoopedOnEntity2("scr_lamgraff_paint_spray", lata.handle, 0.0, 0.0, 0.015, 0.0, 0.0, 90.0, 1.0, false, false, false);

					// Si el intervalo de distancias no existe lo creamos
					if (int_distancia == null) {
						int_distancia = setInterval(() => {
							if (efectos_sync != undefined && efectos_sync != null && efectos_sync.length > 0) {
								let posicion = player_local.position;
								for (let i = efectos_sync.length - 1; i >= 0; i--) {
									// Si la particula está a más de 150.0 y está activa la paramos y borramos de la lista
									if (calcDist(posicion, efectos_sync[i].pos) > 150.0) {
										let particula = efectos_sync[i].fx;
										if (particula != null && mp.game.graphics.doesParticleFxLoopedExist(particula) == true) {
											mp.game.graphics.stopParticleFxLooped(particula, false);
											particula = null;
										}
										efectos_sync.splice(i, 1);
									}
								}

								// Si tras borrar algun efecto sincronizado no quedan más, paramos el intervalo
								if (efectos_sync.length <= 0) {
									clearInterval(int_distancia);
									int_distancia = null;
								}
							}
							else {
								clearInterval(int_distancia);
								int_distancia = null;
							}
						}, 5000);
					}

					// La añadimos al array de creadas
					efectos_sync.push({ id: sqlid, fx: particula, pos: player.position });
				}
			}
		}
		else { // BORRAR
			for (let i = 0, n = efectos_sync.length; i < n; i++) {
				if (efectos_sync[i].id == sqlid) { // Si es el jugador que acabamos de recibir
					let particula = efectos_sync[i].fx;
					// Si el jugador tiene la particula activa la paramos
					if (particula != null && mp.game.graphics.doesParticleFxLoopedExist(particula) == true) {
						mp.game.graphics.stopParticleFxLooped(particula, false);
						particula = null;
					}
					efectos_sync.splice(i, 1);
					break;
				}
			}

			// Si tras borrar un efecto sincronizado no quedan más y el intervalo de distancias sigue activo lo paramos
			if (efectos_sync.length <= 0) {
				if (int_distancia != null) {
					clearInterval(int_distancia);
					int_distancia = null;
				}
			}
		}
	}
});

}