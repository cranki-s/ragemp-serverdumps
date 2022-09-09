{
﻿/* --------------------------------------------------------------------------------
 * cultivos.js
 *
 * Autor: FerniMoon
 *
 * Descripcin: Sistema relacionado con el cultivo a partir de semillas
 * --------------------------------------------------------------------------------*/

/*  INDICE
      - DEBUG
      - VARIABLES USADAS EN EL SISTEMA
      - EVENTOS
*/

//------------------------------------------------------------------------------------------DEBUG---------------------------------------------------------------------------------------------------------//

mp.events.add({
    "cultivar:activar_debugTERRENO": function () {
        mp.events.remove("render", debugTERRENO);
        mp.events.add("render", debugTERRENO);
    },
    "cultivar:desactivar_debugTERRENO": function () {
        mp.events.remove("render", debugTERRENO);
    }
});

function debugTERRENO() {
    if (!logueado) return;
    //MANO DERECHA
    //let position = player_local.getBoneCoords(6286, 0, 0, 0);
    //let endPosition = player_local.getBoneCoords(6286, 0.5, 0, 0);

    //CABEZA
    //let position = player_local.getBoneCoords(12844, 0, 0, 0);
    //let endPosition = player_local.getBoneCoords(12844, 0.5, 0, 0);

    //MANO IZQUIERDA
    //let position = player_local.getBoneCoords(36029, 0, 0, 0);
    //let endPosition = player_local.getBoneCoords(36029, 0.5, 0, 0);

    let position = player_local.position;
    let endPosition = new mp.Vector3(player_local.position.x, player_local.position.y, (player_local.position.z - 1.2));

    mp.game.graphics.drawLine(position.x, position.y, position.z, endPosition.x, endPosition.y, endPosition.z, 255, 0, 0, 255); // Está en la línea de visión

    let raycast = mp.raycasting.testCapsule(position, endPosition, 0.001, player_local, -1); // Colision con objetos
    if (raycast)
    {
        if (obtenerTerrenoDeMaterial(raycast.material).puedePlantar) mp.gui.chat.push("!{green} SI. MATERIAL: " + obtenerTerrenoDeMaterial(raycast.material).nombreDeMaterial + ". CASE: " + raycast.material + ". HUMEDAD: " + obtenerTerrenoDeMaterial(raycast.material).humedadPorDefecto + ". FERTILIZANTE: " + obtenerTerrenoDeMaterial(raycast.material).fertilizantePorDefecto + ". CALIDAD: " + obtenerTerrenoDeMaterial(raycast.material).calidadDelTerrenoParaPlantar + "");
        else mp.gui.chat.push("!{red} NO. MATERIAL: " + obtenerTerrenoDeMaterial(raycast.material).nombreDeMaterial + ". CASE: " + raycast.material + ". ");

        limpiarHandleRaycast(raycast.entity);
    }
    else
    {
        mp.gui.chat.push("!{orange} NO SE ESTA DETECTANDO NADA (:");
    }
}

//------------------------------------------------------------------------------VARIABLES USADAS EN EL SISTEMA--------------------------------------------------------------------------------------------//

/*
 *      VARIABLES QUE SE PUEDEN EDITAR PARA QUE EL SISTEMA FUNCIONE A TU GUSTO 
 */
// DURACIÓN DE LAS ACCIONES. PONER EN MS. 1 MINUTO CORRESPONDE A 500 MS.
let duracionSembrarSemilla = 250; // 250 (30 segundos)
let duracionInspeccionarPlanta = 125; // 125 (15 segundos)
let duracionRegarPlanta = 250; // 250 (30 segundos)
let duracionFertilizarPlanta = 250; // 250 (30 segundos)
let duracionCortarPlanta = 500; // 500 (1 minuto)
let duracionPulverizarPlanta = 375; // 375 (45 segundos)
let duracionArrancarPlanta = 1500; // 1500 (3 minutos)
let duracionQuitarSemilla = 1500; // 1500 (3 minutos)
let duracionAnalizarTerreno = 500; // 500 (1 minuto)

/* La duración de pelar una planta viene defina desde el servidor, dependerá de la cantidad de gramos de marihuana que vaya a obtener, tardará mas o menos. 
 * (Mínimo 1 minuto, máximo 5, lo hace un random.)*/

// ANIMACIONES DE CADA ACCION.
// Sembrar semilla
let animLibreriaSembrarSemilla = "amb@world_human_gardener_plant@male@base";
let animAnimacionSembrarSemilla = "base";
let flagSembrarSemilla = 33;
// Inspeccionar planta (NIVEL 0)
let animLibreriaInspeccionarPlantaLVL0 = "amb@medic@standing@kneel@idle_a";
let animAnimacionInspeccionarPlantaLVL0 = "idle_c";
let flagInspeccionarPlantaLVL0 = 33;
// Inspeccionar planta (NIVEL +1)
let animLibreriaInspeccionarPlanta = "amb@medic@standing@kneel@base";
let animAnimacionInspeccionarPlanta = "base";
let flagInspeccionarPlanta = 33;
// Regar planta
let animLibreriaRegarPlanta = "pickup_object";
let animAnimacionRegarPlanta = "putdown_low";
let flagRegarPlanta = 51;
// Fertilizar planta
let animLibreriaFertilizarPlanta = "pickup_object";
let animAnimacionFertilizarPlanta = "putdown_low";
let flagFertilizarPlanta = 51;
// Cortar planta
let animLibreriaCortarPlanta = "amb@world_human_gardener_plant@female@idle_a";
let animAnimacionCortarPlanta = "idle_c_female";
let flagCortarPlanta = 35;
// Pulverizar planta
let animLibreriaPulverizarPlanta = "anim@amb@business@weed@weed_inspecting_lo_med_hi@";
let animAnimacionPulverizarPlanta = "weed_spraybottle_crouch_spraying_02_inspector";
let flagPulverizarPlanta = 35;
// Arrancar planta
let animLibreriaArrancarPlanta = "amb@world_human_gardener_plant@female@idle_a";
let animAnimacionArrancarPlanta = "idle_c_female";
let flagArrancarPlanta = 35;
// Quitar semilla
let animLibreriaQuitarSemilla = "amb@world_human_gardener_plant@female@idle_a";
let animAnimacionQuitarSemilla = "idle_c_female";
let flagQuitarSemilla = 35;
// Pelar en suelo planta marihuana
let animLibreriaPelarEnSueloPlantaConTijeras = "missmechanic";
let animAnimacionPelarEnSueloPlantaConTijeras = "work2_base";
let flagPelarEnSueloPlantaConTijeras = 35;
// Pelar en mesa planta marihuana
let animLibreriaPelarEnMesaPlantaConTijeras = "missmechanic";
let animAnimacionPelarEnMesaPlantaConTijeras = "work2_base";
let flagPelarEnMesaPlantaConTijeras = 35;
// Analizar terreno con el objeto "Analizar de terreno"
let animLibreriaAnalizarTerreno = "rcmextreme3";
let animAnimacionAnalizarTerreno = "idle";
let flagAnalizarTerreno = 35;

/* La animacion de pelar una planta viene defina desde el servidor, no hay que preocuparse por ello.*/

// HASH DE LOS OBJETOS DE PLANTAS QUE SE CREARÁN CUANDO CORRESPONDA
// Nivel 0 (ES EL MISMO OBJETO PARA TODOS LOS TIPOS DE PLANTAS)
// Normal
let hashPlantaNivel0 = 276792131;
let objetoPlantaModelNivel0 = 276792131;
//              MARIHUANA
// Nivel 1
// Normal
let hashPlantaMarihuanaNivel1Normal = -305885281;
let objetoPlantaMarihuanaModelNivel1Normal = 3989082015;
// Hongos
let hashPlantaMarihuanaNivel1Hongos = 700751921;
let objetoPlantaMarihuanaModelNivel1Hongos = 700751921;
// Muerta
let hashPlantaMarihuanaNivel1Muerta = 355543203;
let objetoPlantaMarihuanaModelNivel1Muerta = 355543203;
// Nivel 2
// Normal
let hashPlantaMarihuanaNivel2Normal = 452618762;
let objetoPlantaMarihuanaModelNivel2Normal = 452618762;
// Hongos
let hashPlantaMarihuanaNivel2Hongos = 127785952;
let objetoPlantaMarihuanaModelNivel2Hongos = 127785952;
// Muerta
let hashPlantaMarihuanaNivel2Muerta = 652856340;
let objetoPlantaMarihuanaModelNivel2Muerta = 652856340;
// Nivel 3
// Normal
let hashPlantaMarihuanaNivel3 = 1996912527;
let objetoPlantaMarihuanaModelNivel3 = 1996912527;
//              TOMATE
// Nivel 1
// Normal
let hashPlantaTomateNivel1Normal = 452618762;
let objetoPlantaTomateModelNivel1Normal = 452618762;
// Hongos
let hashPlantaTomateNivel1Hongos = 452618762;
let objetoPlantaTomateModelNivel1Hongos = 452618762;
// Muerta
let hashPlantaTomateNivel1Muerta = 452618762;
let objetoPlantaTomateModelNivel1Muerta = 452618762;

// Nivel 2
// Normal
let hashPlantaTomateNivel2Normal = 452618762;
let objetoPlantaTomateModelNivel2Normal = 452618762;
// Hongos
let hashPlantaTomateNivel2Hongos = 452618762;
let objetoPlantaTomateModelNivel2Hongos = 452618762;
// Muerta
let hashPlantaTomateNivel2Muerta = 452618762;
let objetoPlantaTomateModelNivel2Muerta = 452618762;
// Nivel 3
// Normal
let hashPlantaTomateNivel3 = 452618762;
let objetoPlantaTomateModelNivel3 = 452618762;

/*
 *      VARIABLES QUE SOLO DEBE TOCAR EL CREADOR DE ESTE ARTILUGIO DE SISTEMA, CAMBIANDO UN SOLO NUMERO PUEDES FUNARTE EL SISTEMA ENTERO
 */

// Variables de los menus
let menuSEMILLAS = null;
let menuCULTIVOS = null;
let menuCONFIRMAR = null;
let menuUSAROBJ = null;
let menuUSAROBJ_PALA = null;

let item1UsarPalaJardineria; // Variable para en el menu de usar la pala de jardineria, variar el texto, descripcion del item en cuestión de la situacion

let frenteMesaDeMarihuana = false; // Variable que se pondrá a TRUE cuando se esté frente a una mesa de marihuana (Lo hace la función "obtenerMesaMarihuanaEnFrente()")

let markerUsarPalaJardineria = null; // Variable que guarda el marker que se crea cuando usas la pala de jardineria y eliges la semilla

let usarObjeto_SQLIDObjCerca = null; // Variables usadas en la función cuando se usa un objeto

//----------------------------------------------------------------------------------------EVENTOS-----------------------------------------------------------------------------------------------------//

mp.events.add({
    // Eventos para añadir, cambiar o eliminar una planta
    "cultivar:plantas:add": function (array)
    { //Lo carga cuando conecta para guardar todas las plantas en el cliente o cuando se crea una nueva planta y se envia a todos los clientes
        try
        {

            let planta = JSON.parse(array);

            let obj = {
                id: parseInt(planta.id),
                personaje_id: parseInt(planta.personaje_id),
                faccion_id: parseInt(planta.faccion_id),
                posicion: new mp.Vector3(parseFloat(planta.posx), parseFloat(planta.posy), parseFloat(planta.posz)),
                rotacion: new mp.Vector3(parseFloat(planta.rotx), parseFloat(planta.roty), parseFloat(planta.rotz)),
                tipo: parseInt(planta.tipo),
                nivel: parseInt(planta.nivel),
                crecimiento: parseInt(planta.crecimiento),
                terrenoPlantada: planta.terreno,
                agua: parseInt(planta.agua),
                fertilizante: parseInt(planta.fertilizante),
                calidadDelTerreno: parseInt(planta.calidad_terreno),
                hongos: planta.hongos,
                muerta: planta.muerta,
                dimension: parseInt(planta.dimension),
                puerto: parseInt(planta.puerto),
                textlabel: null,
                objetoPlanta: null
            };

            // Actualiza la lista de plantas
            plantas.push(obj);

            // Sincronizamos las plantas por cliente, le creamos el objeto que le tengamos que crear
            sincronizarPlantaVisible(parseInt(planta.id));

        } catch (e) {
            console.log("Error cultivar:plantas:add: " + e);
        }
    },
    "cultivar:plantas:change": function (array)
    { // Modificamos algun valor de una planta
        try
        {
            let planta = JSON.parse(array);

            for (let i = 0; i < plantas.length; i++) {
                if (plantas[i].id == planta.id) {
                    plantas[i].id = parseInt(planta.id);
                    plantas[i].personaje_id = parseInt(planta.personaje_id);
                    plantas[i].faccion_id = parseInt(planta.faccion_id),
                    plantas[i].posicion = new mp.Vector3(parseFloat(planta.posx), parseFloat(planta.posy), parseFloat(planta.posz));
                    plantas[i].rotacion = new mp.Vector3(parseFloat(planta.rotx), parseFloat(planta.roty), parseFloat(planta.rotz));
                    plantas[i].tipo = parseInt(planta.tipo);
                    plantas[i].nivel = parseInt(planta.nivel);
                    plantas[i].crecimiento = parseInt(planta.crecimiento);
                    plantas[i].terrenoPlantada = planta.terreno;
                    plantas[i].agua = parseInt(planta.agua);
                    plantas[i].fertilizante = parseInt(planta.fertilizante);
                    plantas[i].calidadDelTerreno = parseInt(planta.calidad_terreno);
                    plantas[i].hongos = planta.hongos;
                    plantas[i].muerta = planta.muerta;
                    plantas[i].dimension = parseInt(planta.dimension);
                    plantas[i].puerto = parseInt(planta.puerto);
                    break;
                }
            }

            // Sincronizamos las plantas por cliente, le creamos el objeto que le tengamos que crear
            sincronizarPlantaVisible(parseInt(planta.id));
        }
        catch (e)
        {
            console.log("Error cultivar:plantas:change: " + e);
        }
    },
    "cultivar:plantas:del": function (planta) { // Eliminamos una planta porque ha sido cortada, arrancada o ha muerto
        try
        {
            for (let i = 0; i < plantas.length; i++) {
                if (plantas[i].id == planta) {
                    if (mp.objects.exists(plantas[i].objetoPlanta)) {
                        plantas[i].objetoPlanta.destroy();
                        plantas[i].objetoPlanta = null;
                    }
                    if (mp.labels.exists(plantas[i].textlabel)) {
                        plantas[i].textlabel.destroy();
                        plantas[i].textlabel = null;
                    }
                    plantas.splice(i, 1);
                    break;
                }
            }
        }
        catch (e) {
            console.log("Error cultivar:plantas:del: " + e);
        }
    },

    // Se llama cuando usas la pala de jardineria
    "cultivar:usar_pala_jardineria": function (value) { // Se ejecuta al tirar /usar o pulsar ENTER con una Pala de jardineria en la mano

        if (typeof interactuandoConPlanta === 'boolean' && interactuandoConPlanta) {
            mostrarAviso("info", 5000, "Ya estás interactuando con una planta, no seas ansias");
            return;
        }

        menu_usar_objeto_palaJardineria(JSON.parse(value));
    },

    // Se llama cuando usas cualquier objeto de los aptos (se define en servidor los que son aptos) en el sistema de cultivos (Excepto )
    "cultivar:usar_objeto": function (nombreObjetoMano, tipoObjetoMano, cantidadObjetoMano, posicionObjetoCerca, nombreObjetoCerca, tipoObjetoCerca, SQLIDObjetoCerca, cantidadObjetoCerca) {

        if (typeof interactuandoConPlanta === 'boolean' && interactuandoConPlanta) {
            mostrarAviso("info", 5000, "Ya estás interactuando con una planta, no seas ansias");
            return;
        }

        menu_usar_objeto(nombreObjetoMano, tipoObjetoMano, cantidadObjetoMano, posicionObjetoCerca, nombreObjetoCerca, tipoObjetoCerca, SQLIDObjetoCerca, cantidadObjetoCerca);
    },

    // Menu que se abre cuando pulsas la E mirando alguna planta/semilla
    "cultivar:menu_planta_raycast": function () {

        if (typeof interactuandoConPlanta === 'boolean' && interactuandoConPlanta) {
            mostrarAviso("info", 5000, "Ya estás interactuando con una planta, no seas ansias");
            return;
        }

        menu_planta();
    },

    // Se ejecuta al tirar /usar o pulsar ENTER con un Analizador de terreno en la mano
    "cultivar:analizarTerreno": function () {
        if (typeof interactuandoConPlanta === 'boolean' && interactuandoConPlanta)
        {
            mostrarAviso("info", 5000, "Ya estás interactuando con una planta, no seas ansias");
            return;
        }

        mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaAnalizarTerreno, animAnimacionAnalizarTerreno, 5, 5, -1, flagAnalizarTerreno);

        let int = crearTimeout(() => {
            clearTimeout(int);
            int = null;
            // Ejecutmos la función que se encargará del progreso de analizar el terreno
            progresoAnalizarTerreno();
        }, 500);
        return;      
    }, 

    "cultivos:cargar_modelos": function () {
        cargarModelosPlantas();
    },

    "cultivos:cargar_modelo": async (model) => {

        let modelo = parseInt(model);

        if (modelo && modelo != -1 && modelo != 0) {

            mp.gui.chat.push("CARGANDO HASH " + modelo);

            if (!mp.game.streaming.hasModelLoaded(modelo)) {
                let intervalo;
                intervalo = setInterval(async () => {
                    if (mp.game.streaming.hasModelLoaded(modelo)) {
                        clearInterval(intervalo);
                        mp.gui.chat.push("¿SE CARGÓ? = (" + mp.game.streaming.hasModelLoaded(modelo) + ")");
                    }
                    mp.game.streaming.requestModel(modelo);
                    await mp.game.waitAsync(100);
                }, 100);
            }
            else
            {
                mp.gui.chat.push("YA ESTABA CARGADO");
            }
        }
        else
        {
            mp.gui.chat.push("HASH INVÁLIDO");
        } 
    }
});

//---------------------------------------------------------------------FUNCIONES DEL SISTEMA DE CULTIVOS-----------------------------------------------------------------------------//


function sincronizarPlantaVisible(plantaId) {
    for (let planta of plantas) {
        if (planta.id == plantaId) {
            if (planta.posicion) {
                // Dependiendo del tipo de planta, haremos una cosa u otra
                switch (planta.tipo) {
                    case 1: // Marihuana
                        switch (planta.nivel) {
                            case 0: // PLANTA NIVEL 0
                                if (planta.objetoPlanta == null || planta.objetoPlanta == undefined) // Si el objeto todavia no ha sido creado por primera vez, lo creamos
                                {                                   
                                    crearPlantaVisible(planta, hashPlantaNivel0);
                                    break;
                                }
                                else // Si ya ha sido creado, vemos a ver si tenemos que crearlo de nuevo o subirlo de nivel
                                {
                                    if (planta.objetoPlanta.model != objetoPlantaModelNivel0) {
                                        // Con este if lo que conseguimos es borrar el objeto del hash anterior y crear el nuevo, para que luego a la hora de cortar la planta, no se quede el otro objeto ahi perdido
                                        if (mp.objects.exists(planta.objetoPlanta)) {
                                            planta.objetoPlanta.destroy();
                                            planta.objetoPlanta = null;
                                        }
                                        crearPlantaVisible(planta, hashPlantaNivel0);
                                        break;
                                    }
                                    break;
                                }
                                break;

                            case 1: // PLANTA NIVEL 1
                                if (planta.objetoPlanta == null || planta.objetoPlanta == undefined) // Si el objeto todavia no ha sido creado por primera vez, lo creamos
                                {
                                    if (planta.muerta == true) {
                                        crearPlantaVisible(planta, hashPlantaMarihuanaNivel1Muerta);
                                        break;
                                    }
                                    else
                                        if (planta.hongos == true) {
                                            crearPlantaVisible(planta, hashPlantaMarihuanaNivel1Hongos);
                                            break;
                                        }
                                        else
                                            if (planta.hongos == false && planta.muerta == false) {
                                                crearPlantaVisible(planta, hashPlantaMarihuanaNivel1Normal);
                                                break;
                                            }
                                    break;
                                }
                                else // Si ya ha sido creado, vemos a ver si tenemos que crearlo de nuevo o subirlo de nivel
                                {
                                    if (planta.muerta == true) {
                                        if (planta.objetoPlanta.model != objetoPlantaMarihuanaModelNivel1Muerta) {
                                            // Con este if lo que conseguimos es borrar el objeto del hash anterior y crear el nuevo, para que luego a la hora de cortar la planta, no se quede el otro objeto ahi perdido
                                            if (mp.objects.exists(planta.objetoPlanta)) {
                                                planta.objetoPlanta.destroy();
                                                planta.objetoPlanta = null;
                                            }
                                            crearPlantaVisible(planta, hashPlantaMarihuanaNivel1Muerta);
                                            break;
                                        }
                                    }
                                    else if (planta.hongos == true) {
                                        if (planta.objetoPlanta.model != objetoPlantaMarihuanaModelNivel1Hongos) {
                                            // Con este if lo que conseguimos es borrar el objeto del hash anterior y crear el nuevo, para que luego a la hora de cortar la planta, no se quede el otro objeto ahi perdido
                                            if (mp.objects.exists(planta.objetoPlanta)) {
                                                planta.objetoPlanta.destroy();
                                                planta.objetoPlanta = null;
                                            }
                                            crearPlantaVisible(planta, hashPlantaMarihuanaNivel1Hongos);
                                            break;
                                        }
                                    }
                                    else if (planta.hongos == false && planta.muerta == false) // Si no tiene ni hongos ni está muerta y el objeto que debe de tener no lo tiene
                                    {
                                        if (planta.objetoPlanta.model != objetoPlantaMarihuanaModelNivel1Normal) {
                                            // Con este if lo que conseguimos es borrar el objeto del hash anterior y crear el nuevo, para que luego a la hora de cortar la planta, no se quede el otro objeto ahi perdido
                                            if (mp.objects.exists(planta.objetoPlanta)) {
                                                planta.objetoPlanta.destroy();
                                                planta.objetoPlanta = null;
                                            }
                                            crearPlantaVisible(planta, hashPlantaMarihuanaNivel1Normal);
                                            break;
                                        }
                                        break;
                                    }
                                    break;
                                }
                                break;

                            case 2: // PLANTA NIVEL 2
                                if (planta.objetoPlanta == null || planta.objetoPlanta == undefined) // Si el objeto todavia no ha sido creado por primera vez, lo creamos
                                {
                                    if (planta.muerta == true) {
                                        crearPlantaVisible(planta, hashPlantaMarihuanaNivel2Muerta);
                                        break;
                                    }
                                    else
                                        if (planta.hongos == true) {
                                            crearPlantaVisible(planta, hashPlantaMarihuanaNivel2Hongos);
                                            break;
                                        }
                                        else
                                            if (planta.hongos == false && planta.muerta == false) {
                                                crearPlantaVisible(planta, hashPlantaMarihuanaNivel2Normal);
                                                break;
                                            }
                                    break;
                                }
                                else // Si ya ha sido creado, vemos a ver si tenemos que crearlo de nuevo o subirlo de nivel
                                {
                                    if (planta.muerta == true) {
                                        if (planta.objetoPlanta.model != objetoPlantaMarihuanaModelNivel2Muerta) {
                                            // Con este if lo que conseguimos es borrar el objeto del hash anterior y crear el nuevo, para que luego a la hora de cortar la planta, no se quede el otro objeto ahi perdido
                                            if (mp.objects.exists(planta.objetoPlanta)) {
                                                planta.objetoPlanta.destroy();
                                                planta.objetoPlanta = null;
                                            }
                                            crearPlantaVisible(planta, hashPlantaMarihuanaNivel2Muerta);
                                            break;
                                        }
                                        break;
                                    }
                                    else if (planta.hongos == true) {
                                        if (planta.objetoPlanta.model != objetoPlantaMarihuanaModelNivel2Hongos) {
                                            // Con este if lo que conseguimos es borrar el objeto del hash anterior y crear el nuevo, para que luego a la hora de cortar la planta, no se quede el otro objeto ahi perdido
                                            if (mp.objects.exists(planta.objetoPlanta)) {
                                                planta.objetoPlanta.destroy();
                                                planta.objetoPlanta = null;
                                            }
                                            crearPlantaVisible(planta, hashPlantaMarihuanaNivel2Hongos);
                                            break;
                                        }
                                        break;
                                    }
                                    else if (planta.hongos == false && planta.muerta == false) // Si no tiene ni hongos ni está muerta y el objeto que debe de tener no lo tiene
                                    {
                                        if (planta.objetoPlanta.model != objetoPlantaMarihuanaModelNivel2Normal) {
                                            // Con este if lo que conseguimos es borrar el objeto del hash anterior y crear el nuevo, para que luego a la hora de cortar la planta, no se quede el otro objeto ahi perdido
                                            if (mp.objects.exists(planta.objetoPlanta)) {
                                                planta.objetoPlanta.destroy();
                                                planta.objetoPlanta = null;
                                            }
                                            crearPlantaVisible(planta, hashPlantaMarihuanaNivel2Normal);
                                            break;
                                        }
                                        break;
                                    }
                                    break;
                                }
                                break;

                            case 3: // PLANTA NIVEL 3
                                if (planta.objetoPlanta == null || planta.objetoPlanta == undefined) // Si el objeto todavia no ha sido creado por primera vez, lo creamos
                                {
                                    crearPlantaVisible(planta, hashPlantaMarihuanaNivel3);
                                    break;
                                }
                                else // Si ya ha sido creado, vemos a ver si tenemos que crearlo de nuevo
                                {
                                    if (planta.objetoPlanta.model != objetoPlantaMarihuanaModelNivel3) {
                                        // Con este if lo que conseguimos es borrar el objeto del hash anterior y crear el nuevo, para que luego a la hora de cortar la planta, no se quede el otro objeto ahi perdido
                                        if (mp.objects.exists(planta.objetoPlanta)) {
                                            planta.objetoPlanta.destroy();
                                            planta.objetoPlanta = null;
                                        }
                                        crearPlantaVisible(planta, hashPlantaMarihuanaNivel3);
                                        break;
                                    }
                                    break;
                                }
                                break;
                        }
                        break;

                    default:
                        break;
                }

            }
        }
    }
}

async function cargarModelosPlantas() {

    /* 
            MODELOS PLANTAS MARIHUANA
    */

    mp.game.streaming.requestModel(hashPlantaNivel0);
    await mp.game.waitAsync(10);
    if (!mp.game.streaming.hasModelLoaded(hashPlantaNivel0)) {
        let intervalo_1;
        intervalo_1 = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hashPlantaNivel0)) {
                clearInterval(intervalo_1);
            }
            mp.game.streaming.requestModel(hashPlantaNivel0);
            await mp.game.waitAsync(100);
        }, 100);
    }

    mp.game.streaming.requestModel(hashPlantaMarihuanaNivel1Normal);
    await mp.game.waitAsync(10);
    if (!mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel1Normal)) {
        let intervalo_2;
        intervalo_2 = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel1Normal)) {
                clearInterval(intervalo_2);
            }
            mp.game.streaming.requestModel(hashPlantaMarihuanaNivel1Normal);
            await mp.game.waitAsync(100);
        }, 100);
    }

    mp.game.streaming.requestModel(hashPlantaMarihuanaNivel1Hongos);
    await mp.game.waitAsync(10);
    if (!mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel1Hongos)) {
        let intervalo_3;
        intervalo_3 = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel1Hongos)) {
                clearInterval(intervalo_3);
            }
            mp.game.streaming.requestModel(hashPlantaMarihuanaNivel1Hongos);
            await mp.game.waitAsync(100);
        }, 100);
    }

    mp.game.streaming.requestModel(hashPlantaMarihuanaNivel1Muerta);
    await mp.game.waitAsync(10);
    if (!mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel1Muerta)) {
        let intervalo_4;
        intervalo_4 = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel1Muerta)) {
                clearInterval(intervalo_4);
            }
            mp.game.streaming.requestModel(hashPlantaMarihuanaNivel1Muerta);
            await mp.game.waitAsync(100);
        }, 100);
    }

    mp.game.streaming.requestModel(hashPlantaMarihuanaNivel2Normal);
    await mp.game.waitAsync(10);
    if (!mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel2Normal)) {
        let intervalo_5;
        intervalo_5 = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel2Normal)) {
                clearInterval(intervalo_5);
            }
            mp.game.streaming.requestModel(hashPlantaMarihuanaNivel2Normal);
            await mp.game.waitAsync(100);
        }, 100);
    }

    mp.game.streaming.requestModel(hashPlantaMarihuanaNivel2Hongos);
    await mp.game.waitAsync(10);
    if (!mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel2Hongos)) {
        let intervalo_6;
        intervalo_6 = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel2Hongos)) {
                clearInterval(intervalo_6);
            }
            mp.game.streaming.requestModel(hashPlantaMarihuanaNivel2Hongos);
            await mp.game.waitAsync(100);
        }, 100);
    }

    mp.game.streaming.requestModel(hashPlantaMarihuanaNivel2Muerta);
    await mp.game.waitAsync(10);
    if (!mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel2Muerta)) {
        let intervalo_7;
        intervalo_7 = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel2Muerta)) {
                clearInterval(intervalo_7);
            }
            mp.game.streaming.requestModel(hashPlantaMarihuanaNivel2Muerta);
            await mp.game.waitAsync(100);
        }, 100);
    }

    mp.game.streaming.requestModel(hashPlantaMarihuanaNivel3);
    await mp.game.waitAsync(10);
    if (!mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel3)) {
        let intervalo_8;
        intervalo_8 = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hashPlantaMarihuanaNivel3)) {
                clearInterval(intervalo_8);
            }
            mp.game.streaming.requestModel(hashPlantaMarihuanaNivel3);
            await mp.game.waitAsync(100);
        }, 100);
    }

    /*
        MODELOS PLANTAS COCA
    */


    /*
        MODELOS PLANTAS TOMATES
    */
}

async function crearPlantaVisible(planta, hash)
{
    mp.game.streaming.requestModel(hash);

    await mp.game.waitAsync(10);

    if (!mp.game.streaming.hasModelLoaded(hash)) {
        let intervalo;
        intervalo = setInterval(async () => {
            if (mp.game.streaming.hasModelLoaded(hash)) {
                clearInterval(intervalo);
            }
            mp.game.streaming.requestModel(hash);
            await mp.game.waitAsync(100);
        }, 100);
    }

    planta.objetoPlanta = mp.objects.new(hash, planta.posicion, { rotation: planta.rotacion });
}

async function usarPalaJardineria(posicion, semillasEnInventario, nombreDeMaterial, humedadPorDefecto, fertilizantePorDefecto, calidadDelTerrenoParaPlantar)
{
    // Obtenemos la posicion de Z por defecto y la posicion que tenemos guardada, que es la misma posicion en la cual obtuvimos el terreno, para que no pongan plantas en sitios que no deben
    let getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(posicion.x, posicion.y, (posicion.z + 1), parseFloat(0), false);
    // Creamos la variable que guardará la rotacion de la planta
    let rotacionPlanta = new mp.Vector3(0, 0, 0);

    // Borramos el marker y lo creamos en azul
    if (mp.markers.exists(markerUsarPalaJardineria)) markerUsarPalaJardineria.destroy();
    markerUsarPalaJardineria = mp.markers.new(0, new mp.Vector3(posicion.x, posicion.y, getGroundZ + 0.3), 0.30,
        {
            color: [69, 127, 202, 255],
            visible: true,
            dimension: player_local.dimension
        });

    // El modelo para obtener la rotacion es el hashPlantaNivel0, que será el mismo para todas las semillas que se planten
    let modelo = hashPlantaNivel0;

    // Si el modelo existe intentamos calcular su Z y rotación correcta, en caso contrario se usan ambos valores por defecto
    if (modelo != null) {

        // Creamos el objeto en su posicíon final pero por encima del jugador
        let posDebajo = new mp.Vector3(posicion.x, posicion.y, posicion.z + 1.0);

        if (!mp.game.streaming.hasCollisionForModelLoaded(modelo)) {

            mp.game.streaming.requestCollisionForModel(modelo);
            let count = 0;
            while (!mp.game.streaming.hasCollisionForModelLoaded(modelo)) {
                count++;
                if (count >= 100) {
                    break;
                }
                await mp.game.waitAsync(5);
            }
        }

        // Creamos el objeto temporal con alpha 0
        let objetoTemporal = mp.objects.new(modelo, posDebajo,
            {
                rotation: rotacionPlanta,
                alpha: 0,
                dimension: player_local.dimension
            }
        );

        /**
         * Intervalo de 5ms para calcular la Z y rotacion correcta de la planta
         * 
         * Una vez el jugador ha acabado la animación y se aleja 3 metros de la posicion de la planta comenzamos los calculos.
         * Si el intervalo da 15 vueltas y el objeto no existe se utiliza la posicion y rotacion por defecto.
         **/
        let counter = 0;
        let intervalo_planta = setInterval(() => {
            if (objetoTemporal != null && mp.objects.exists(objetoTemporal)) {

                objetoTemporal.placeOnGroundProperly();
                let pos = objetoTemporal.getCoords(true); // Necesario para actualizar la posicion
                let rot = objetoTemporal.getRotation(2); // Necesario para actualizar la rotacion

                objetoTemporal.position = new mp.Vector3(pos.x, pos.y, pos.z);
                objetoTemporal.rotation = new mp.Vector3(rot.x, rot.y, rot.z);

                // Actualizamos la Z a guardar si es diferente a 0
                if (objetoTemporal.position.z != 0) getGroundZ = objetoTemporal.position.z;

                rotacionPlanta = objetoTemporal.rotation; // Actualizamos la rotación a guardar

                // Eliminamos el objeto temporal
                objetoTemporal.destroy();

                clearInterval(intervalo_planta);
                intervalo_planta = null;
            }
            else {
                counter++;
                // Si el objeto no se crea tras 15 vueltas al intervalo cancelamos el intervalo y mandamos la Z y rotación por defecto
                if (counter > 15) { // +- 75ms
                    clearInterval(intervalo_planta);
                    intervalo_planta = null;
                }
            }
        }, 5);
    }

    if (getGroundZ <= 0)
    {
        if (mp.markers.exists(markerUsarPalaJardineria)) markerUsarPalaJardineria.destroy();
        interactuandoConPlanta = false;
        // Descongelamos al tio para que pueda andar, ya que lo habiamos congelado antes
        player_local.freezePosition(false);
        mostrarAviso("danger", 4000, "Algo no ha ido bien... vuelve a intentarlo");
        return;
    }

    // Borramos el marker y lo creamos en verde
    if (mp.markers.exists(markerUsarPalaJardineria)) markerUsarPalaJardineria.destroy();
    markerUsarPalaJardineria = mp.markers.new(0, new mp.Vector3(posicion.x, posicion.y, getGroundZ + 0.3), 0.30,
        {
            color: [69, 182, 73, 255],
            visible: true,
            dimension: player_local.dimension
        });

    // Creamos el menu
    menuSEMILLAS = crearMenuConDistancia(0.05, "Semillas", "¿Qué semilla deseas plantar?");
    semillasEnInventario.forEach(obj => {
        menuSemillasItem = new UIMenuItem("" + obj.nombreObjeto.substring(0, 27) + (obj.nombreObjeto.length > 27 ? "..." : ""), obj.cantidad > 1 ? "A este objeto le quedan " + obj.cantidad + " usos" : "A este objeto le queda 1 uso");
        menuSemillasItem.SetRightLabel("ID: " + obj.SQLIDObjeto + "");
        menuSEMILLAS.AddItem(menuSemillasItem);
    });
    menuSEMILLAS.AddItem(aplicarColores(new UIMenuItem("No quiero sembrar ninguna semilla", "Si no quieres sembrar ninguna semilla, selecciona esta opción y se cerrará el menú"), "Rojo"));

    // Evento que se ejecutará al pulsar una opción del menu
    menuSEMILLAS.ItemSelect.on((item, index) => {

        // Si pulsa en la opción de ayuda no hacemos nada, ya que le mostramos el texto de ayuda en la descripción de la opción
        if (item.Text == "Ayuda") return;

        // Si pulsa en cancelar directamente cerramos el menu sin mandar ningún evento
        if (item.Text == "No quiero sembrar ninguna semilla") {
            if (menuSEMILLAS != null) menuSEMILLAS?.Close(); 
            if (mp.markers.exists(markerUsarPalaJardineria)) markerUsarPalaJardineria.destroy();
            interactuandoConPlanta = false;
            pararAnimacion();
            return;
        }

        // Si llega a este punto es porque no ha pulsado ni ayuda ni que no quiere plantar ninguna semilla por lo tanto ha tenido que pulsar en alguna semilla, pack de semillas...
        // Obtenemos la posición para obtener el material, enfrente del personaje
        let positionInt1 = player_local.getCoords(true);
        let directionAuxInt1 = player_local.getForwardVector();
        let endPositionInt1 = new mp.Vector3((directionAuxInt1.x * 1.1) + (positionInt1.x), (directionAuxInt1.y * 1.1) + (positionInt1.y), (directionAuxInt1.z * 1.1) + (positionInt1.z));
        let raycastInt1 = mp.raycasting.testCapsule(new mp.Vector3(endPositionInt1.x, endPositionInt1.y, endPositionInt1.z + 1.0), new mp.Vector3(endPositionInt1.x, endPositionInt1.y, endPositionInt1.z - 1.6), 0.001, player_local, -1); // Colision con objetos
        if (raycastInt1) // Ha tocado algo
        {
            let cercaDeOtraPlanta = false;

            // Obtenemos los jugadores cerca
            let jugsCerca = mp.players.toArray().filter((jug) => (calcDist(jug.position, new mp.Vector3(raycastInt1.position.x, raycastInt1.position.y, raycastInt1.position.z)) < distanciaPermitidaEntrePlantayPlanta && jug.dimension == 0));
            // Obtenemos si está cerca de otra planta
            for (let i = 0, n = plantas.length; i < n; i++) {
                if (plantas[i].posicion) {
                    if (calcDist(plantas[i].posicion, raycastInt1.position) < distanciaPermitidaEntrePlantayPlanta) {
                        cercaDeOtraPlanta = true;
                    }
                }
            }

            if (player_local.isInWater() || player_local.isSwimming() || player_local.isSwimmingUnderWater())
            {
                mostrarAviso("danger", 8000, "No puedes sembrar una semilla en el agua");
                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
            }
            else if (semillasEnInventario.length <= 0)
            {
                mostrarAviso("danger", 8000, "No tienes ninguna semilla ni pack de semillas en las teclas de accion rapida con cantidad igual o mayor a 1");
                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
            }
            else if (cercaDeOtraPlanta == true)
            {
                mostrarAviso("danger", 8000, "Estás demasiado cerca de otra planta. Debes estar a más de " + distanciaPermitidaEntrePlantayPlanta + " metros");
                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
            }
            else if (jugsCerca.length > 1)
            {
                mostrarAviso("danger", 8000, "No puedes sembrar una semilla mientras haya gente cerca tuya (debe estar a más de " + distanciaPermitidaEntrePlantayPlanta + " metros de la flecha");
                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
            }
            else if (obtenerTerrenoDeMaterial(raycastInt1.material).puedePlantar === false)
            {
                mostrarAviso("danger", 8000, "El terreno sobre el que deseas plantar la semilla no es apropiado para ello");
                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
            }
            else
            {
                // Ocultamos el menu ya que no queremos que se vea
                menuSEMILLAS.setVisible(false);
                menuSEMILLAS = null;
                menu_con_distancia = null;

                // Le ejecutamos la anim que le hace agacharse como si estuviese comprbando el terreno y plantando la semilla
                mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaSembrarSemilla, animAnimacionSembrarSemilla, 5, 5, -1, flagSembrarSemilla);

                // Borramos el marker que le indicará donde se pondrá la semilla ya que el tio se agacha y empieza a sembrarla
                if (mp.markers.exists(markerUsarPalaJardineria)) markerUsarPalaJardineria.destroy();

                // Esperamos 500ms antes de ejecutar la función para que le de tiempo a hacer la animacion y no haya problemas con las comprobaciones luego
                let int = crearTimeout(() => {
                    clearTimeout(int);
                    int = null;
                    progresoSembrarSemilla((semillasEnInventario[index]["SQLIDObjeto"]), new mp.Vector3(posicion.x, posicion.y, getGroundZ), rotacionPlanta, nombreDeMaterial, humedadPorDefecto, fertilizantePorDefecto, calidadDelTerrenoParaPlantar, player_local.dimension);
                }, 500);
            }

            limpiarHandleRaycast(raycastInt1.entity);
        }
        else
        {
            mostrarAviso("danger", 8000, "Es imposible plantar una semilla hacia donde está mirando tu personaje");
            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
        }
    });

    // Evento que se ejecutará al pulsar la tecla RETROCESO o CLICK DERECHO
    menuSEMILLAS.MenuClose.on(() => {
        // Descongelamos al tio para que pueda andar, ya que lo habiamos congelado antes
        player_local.freezePosition(false); 
        menu_con_distancia = null;
        if (mp.markers.exists(markerUsarPalaJardineria)) markerUsarPalaJardineria.destroy();
        interactuandoConPlanta = false;
        pararAnimacion();
        menuSEMILLAS = null;
    });
}

function pararAnimacion() {// Función que para una animación, primero creo que la intenta parar por cliente y luego por servidor, ni idea
    mp.events.callRemote("limpiar_animacion");
}

function obtenerTerrenoDeMaterial(materialDeTerreno) { // Función obtener sobre el material sobre el que esta el raycast

    // SISTEMA DE CULTIVOS
    let puedePlantar = false;
    let nombreDeMaterial = "";
    let humedadPorDefecto = 0; // 0% - 100%
    let fertilizantePorDefecto = 0; // 0% - 100%
    let calidadDelTerrenoParaPlantar = 0; // 0 - Imposible, 1 - Muy malo, 2 - Malo, 3 - Normal, 4 Bueno, 5 Muy bueno

    // SISTEMA DE GRAFFITIS
    let puedePonerGraffiti = true;

    switch (materialDeTerreno.toString()) // Ponemos en este switch los materiales que tenemos documentados
    {
        //  CALIDAD DE TERRENO 1
        case "-1595148316": // Arena suelta
            puedePlantar = true;
            nombreDeMaterial = "arena suelta";
            humedadPorDefecto = 10;
            fertilizantePorDefecto = 0;
            calidadDelTerrenoParaPlantar = 1;
            break;
        case "510490462": // Arena compacta
            puedePlantar = true;
            nombreDeMaterial = "arena compacta";
            humedadPorDefecto = 0;
            fertilizantePorDefecto = 0;
            calidadDelTerrenoParaPlantar = 1;
            break;
        case "2128369009": // Grava grande
            puedePlantar = true;
            nombreDeMaterial = "grava grande";
            humedadPorDefecto = 0;
            fertilizantePorDefecto = 0;
            calidadDelTerrenoParaPlantar = 1;
            break;
        case "-356706482": // Grava profunda
            puedePlantar = true;
            nombreDeMaterial = "grava profunda";
            humedadPorDefecto = 0;
            fertilizantePorDefecto = 0;
            calidadDelTerrenoParaPlantar = 1;
            break;
        case "-1942898710": // Barro duro
            puedePlantar = true;
            nombreDeMaterial = "barro duro";
            humedadPorDefecto = 10;
            fertilizantePorDefecto = 10;
            calidadDelTerrenoParaPlantar = 1;
            break;
        case "1144315879": // Arcilla dura
            puedePlantar = true;
            nombreDeMaterial = "arcilla dura";
            humedadPorDefecto = 0;
            fertilizantePorDefecto = 5;
            calidadDelTerrenoParaPlantar = 1;
            break;
        case "560985072": // Arcilla blanda
            puedePlantar = true;
            nombreDeMaterial = "arcilla blanda";
            humedadPorDefecto = 0;
            fertilizantePorDefecto = 5;
            calidadDelTerrenoParaPlantar = 1;
            break;
        case "2352068586": // Tierra con rocas
            puedePlantar = true;
            nombreDeMaterial = "tierra con rocas";
            humedadPorDefecto = 10;
            fertilizantePorDefecto = 10;
            calidadDelTerrenoParaPlantar = 1;
            break;
        case "3008270349": // Cesped
            puedePlantar = true;
            nombreDeMaterial = "cesped";
            humedadPorDefecto = 10;
            fertilizantePorDefecto = 10;
            calidadDelTerrenoParaPlantar = 1;
            break;

        //  CALIDAD DE TERRENO 2
        case "1913209870": // Arenisca quebradiza
            puedePlantar = true;
            nombreDeMaterial = "arenisca quebradiza";
            humedadPorDefecto = 10;
            fertilizantePorDefecto = 0;
            calidadDelTerrenoParaPlantar = 2;
            break;
        case "-1885547121": // Pista de tierra
            puedePlantar = true;
            nombreDeMaterial = "pista de tierra";
            humedadPorDefecto = 10;
            fertilizantePorDefecto = 20;
            calidadDelTerrenoParaPlantar = 2;
            break;
        case "2409420175": // Tierra con raices
            puedePlantar = true;
            nombreDeMaterial = "tierra con raices";
            humedadPorDefecto = 10;
            fertilizantePorDefecto = 10;
            calidadDelTerrenoParaPlantar = 2;
            break;
        case "4170197704": // Tierra con flores
            puedePlantar = true;
            nombreDeMaterial = "tierra con flores";
            humedadPorDefecto = 10;
            fertilizantePorDefecto = 10;
            calidadDelTerrenoParaPlantar = 2;
            break;
        case "3833216577": // Tierra con hojas
            puedePlantar = true;
            nombreDeMaterial = "tierra con hojas";
            humedadPorDefecto = 15;
            fertilizantePorDefecto = 15;
            calidadDelTerrenoParaPlantar = 2;
            break;
        case "2387446527": // Barro seco
            puedePlantar = true;
            nombreDeMaterial = "barro seco";
            humedadPorDefecto = 0;
            fertilizantePorDefecto = 20;
            calidadDelTerrenoParaPlantar = 2;
            break;

        //  CALIDAD DE TERRENO 3
        case "951832588": // Grava pequeña
            puedePlantar = true;
            nombreDeMaterial = "grava pequeña";
            humedadPorDefecto = 30;
            fertilizantePorDefecto = 20;
            calidadDelTerrenoParaPlantar = 3;
            break;
        case "1109728704": // Barro profundo
            puedePlantar = true;
            nombreDeMaterial = "barro profundo";
            humedadPorDefecto = 30;
            fertilizantePorDefecto = 50;
            calidadDelTerrenoParaPlantar = 3;
            break;
        case "223086562": // Pantano
            puedePlantar = true;
            nombreDeMaterial = "pantano";
            humedadPorDefecto = 70;
            fertilizantePorDefecto = 20;
            calidadDelTerrenoParaPlantar = 3;
            break;
        case "3381615457": // Tierra humeda
            puedePlantar = true;
            nombreDeMaterial = "tierra humeda";
            humedadPorDefecto = 85;
            fertilizantePorDefecto = 30;
            calidadDelTerrenoParaPlantar = 3;
            break;
        case "3594309083": // Tierra
            puedePlantar = true;
            nombreDeMaterial = "tierra";
            humedadPorDefecto = 25;
            fertilizantePorDefecto = 30;
            calidadDelTerrenoParaPlantar = 3;
            break;
        case "3985845843": // Tierra con hojas secas
            puedePlantar = true;
            nombreDeMaterial = "tierra con hojas secas";
            humedadPorDefecto = 30;
            fertilizantePorDefecto = 30;
            calidadDelTerrenoParaPlantar = 3;
            //Posicion: 1383.6821, 1174.6886, 114.52207
            break;
        case "1333033863": // Hierba
            puedePlantar = true;
            nombreDeMaterial = "hierba";
            humedadPorDefecto = 60;
            fertilizantePorDefecto = 60;
            calidadDelTerrenoParaPlantar = 3;
            break;

        //  CALIDAD DE TERRENO 4
        case "1635937914": // Barro suave
            puedePlantar = true;
            nombreDeMaterial = "barro suave";
            humedadPorDefecto = 20;
            fertilizantePorDefecto = 50;
            calidadDelTerrenoParaPlantar = 4;
            break;
        case "2253637325": // Suelo boscoso
            puedePlantar = true;
            nombreDeMaterial = "suelo boscoso";
            humedadPorDefecto = 20;
            fertilizantePorDefecto = 35;
            calidadDelTerrenoParaPlantar = 4;
            break;

        //  CALIDAD DE TERRENO 5
        case "-461750719": // Hierba larga
            puedePlantar = true;
            nombreDeMaterial = "hierba larga";
            humedadPorDefecto = 60;
            fertilizantePorDefecto = 60;
            calidadDelTerrenoParaPlantar = 5;
            break;
        case "-1286696947": // Hierba corta
            puedePlantar = true;
            nombreDeMaterial = "hierba corta";
            humedadPorDefecto = 60;
            fertilizantePorDefecto = 50;
            calidadDelTerrenoParaPlantar = 5;
            break;


        //  DONDE NO PODRÁ PLANTAR:
        case "2699818980":
            nombreDeMaterial = "arena";
            break;
        case "-1":
            nombreDeMaterial = "ninguno";
            break;
        case "-1775485061":
            nombreDeMaterial = "unk";
            break;
        case "1187676648":
            nombreDeMaterial = "hormigón";
            break;
        case "359120722":
            nombreDeMaterial = "bache de hormigón";
            break;
        case "-1084640111":
            nombreDeMaterial = "hormigón polvoriento";
            break;
        case "282940568":
            nombreDeMaterial = "asfalto";
            break;
        case "-1301352528":
            nombreDeMaterial = "asfalto pintado";
            break;
        case "1886546517":
            nombreDeMaterial = "bache de asfalto";
            break;
        case "-250168275":
            nombreDeMaterial = "banda sonora";
            break;
        case "-954112554":
            nombreDeMaterial = "bloque de brisa";
            break;
        case "-840216541":
            nombreDeMaterial = "roca";
            break;
        case "-124769592":
            nombreDeMaterial = "musgo de roca";
            break;
        case "765206029":
            nombreDeMaterial = "piedra";
            break;
        case "576169331":
            nombreDeMaterial = "adoquín";
            break;
        case "1639053622":
            nombreDeMaterial = "ladrillo";
            break;
        case "1945073303":
            nombreDeMaterial = "mármol";
            break;
        case "1907048430":
            nombreDeMaterial = "losa de pavimento";
            break;
        case "592446772":
            nombreDeMaterial = "piedra arenisca sólida";
            break;
        case "909950165":
            nombreDeMaterial = "arena mojada";
            break;
        case "-1907520769":
            nombreDeMaterial = "pista de arena";
            break;
        case "-1136057692":
            nombreDeMaterial = "arena bajo el agua";
            break;
        case "509508168":
            nombreDeMaterial = "arena seca profundamente";
            break;
        case "1288448767":
            nombreDeMaterial = "arena mojada profundamente";
            break;
        case "-786060715":
            nombreDeMaterial = "hielo";
            break;
        case "-1931024423":
            nombreDeMaterial = "pista de hielo";
            break;
        case "-1937569590":
            nombreDeMaterial = "nieve suelta";
            break;
        case "-878560889":
            nombreDeMaterial = "nieve compacta";
            break;
        case "1619704960":
            nombreDeMaterial = "nieve profunda";
            break;
        case "1550304810":
            nombreDeMaterial = "asfalto de nieve";
            break;
        case "1925605558":
            nombreDeMaterial = "vía de tren de grava";
            break;
        case "312396330":
            nombreDeMaterial = "bache de barro";
            break;
        case "-273490167":
            nombreDeMaterial = "barro bajo el agua";
            break;
        case "1584636462":
            nombreDeMaterial = "pantano profundo";
            break;
        case "-700658213":
            nombreDeMaterial = "suelo";
            break;
        case "-1833527165":
            nombreDeMaterial = "heno";
            break;
        case "581794674":
            puedePonerGraffiti = false;
            nombreDeMaterial = "arbustos";
            break;
        case "-913351839":
            nombreDeMaterial = "ramitas";
            break;
        case "-2041329971":
            nombreDeMaterial = "hojas";
            break;
        case "-1543323456":
            nombreDeMaterial = "alambre de púas físico";
            break;
        case "605776921":
            nombreDeMaterial = "superficie de la mesa de billar física";
            break;
        case "972939963":
            nombreDeMaterial = "cojín de la mesa de billar física";
            break;
        case "-748341562":
            nombreDeMaterial = "bola de billar física";
            break;
        case "483400232":
            nombreDeMaterial = "nalgas";
            break;
        case "-460535871":
            nombreDeMaterial = "muslo izquierdo";
            break;
        case "652772852":
            nombreDeMaterial = "espinilla izquierda";
            break;
        case "1926285543":
            nombreDeMaterial = "pie izquierdo";
            break;
        case "-236981255":
            nombreDeMaterial = "muslo derecho";
            break;
        case "-446036155":
            nombreDeMaterial = "brilla a la derecha";
            break;
        case "-2013761145":
            nombreDeMaterial = "metal eléctrico físico";
            break;
        case "-1170043733":
            nombreDeMaterial = "cerca eléctrica física";
            break;
        case "-291631035":
            nombreDeMaterial = "cápsula física ped";
            break;
        case "1345867677":
            nombreDeMaterial = "vacío del coche físico";
            break;
        case "2016463089":
            nombreDeMaterial = "lanzador físico oxidado";
            break;
        case "-235302683":
            nombreDeMaterial = "lanzador físico";
            break;
        case "-256704763":
            nombreDeMaterial = "pelota de tenis física";
            break;
        case "-1693813558":
            nombreDeMaterial = "pelota de golf física";
            break;
        case "1666473731":
            nombreDeMaterial = "phys sin fricción";
            break;
        case "332778253":
            nombreDeMaterial = "llama de metal vfx";
            break;
        case "-691277294":
            nombreDeMaterial = "vapor de metal vfx";
            break;
        case "611561919":
            nombreDeMaterial = "torre de agua de metal vfx";
            break;
        case "-309134265":
            nombreDeMaterial = "vfx metal electrificado";
            break;
        case "1059629996":
            nombreDeMaterial = "plástico emisivo";
            break;
        case "1501078253":
            nombreDeMaterial = "vidrio emisivo";
            break;
        case "1445160429":
            nombreDeMaterial = "carne seca";
            break;
        case "868733839":
            nombreDeMaterial = "carne fresca";
            break;
        case "-1634184340":
            nombreDeMaterial = "gasolina";
            break;
        case "-634481305":
            nombreDeMaterial = "aceite";
            break;
        case "5236042":
            nombreDeMaterial = "sangre";
            break;
        case "435688960":
            nombreDeMaterial = "agua";
            break;
        case "513061559":
            nombreDeMaterial = "cristal de coche opaco";
            break;
        case "-1721915930":
            nombreDeMaterial = "vidrio de automóvil a prueba de balas";
            break;
        case "1070994698":
            nombreDeMaterial = "vidrio de coche fuerte";
            break;
        case "602884284":
            nombreDeMaterial = "medio de vidrio para automóvil";
            break;
        case "1247281098":
            nombreDeMaterial = "vidrio del coche débil";
            break;
        case "2130571536":
            nombreDeMaterial = "techo blando del coche transparente";
            break;
        case "-979647862":
            nombreDeMaterial = "techo blando del coche";
            break;
        case "2137197282":
            nombreDeMaterial = "plástico de coche";
            break;
        case "-93061983":
            nombreDeMaterial = "metal de automóvil";
            break;
        case "-1619794068":
            nombreDeMaterial = "plexiglás";
            break;
        case "1500272081":
            nombreDeMaterial = "vidrio opaco";
            break;
        case "244521486":
            nombreDeMaterial = "vidrio a prueba de balas";
            break;
        case "937503243":
            nombreDeMaterial = "vidrio disparado a través";
            break;
        case "673696729":
            nombreDeMaterial = "persianas de lamas";
            break;
        case "1429989756":
            nombreDeMaterial = "pantalla de televisión";
            break;
        case "-570470900":
            nombreDeMaterial = "cuero";
            break;
        case "-1756927331":
            nombreDeMaterial = "poliestireno";
            break;
        case "1341866303":
            nombreDeMaterial = "almohada de plumas";
            break;
        case "808719444":
            nombreDeMaterial = "espuma";
            break;
        case "474149820":
            nombreDeMaterial = "papel";
            break;
        case "-1409054440":
            nombreDeMaterial = "caja de cartón";
            break;
        case "236511221":
            nombreDeMaterial = "hoja de cartón";
            break;
        case "-251888898":
            nombreDeMaterial = "yeso quebradizo";
            break;
        case "-574122433":
            nombreDeMaterial = "yeso sólido";
            break;
        case "652772852":
            nombreDeMaterial = "espinilla izquierda";
            break;
        case "1926285543":
            nombreDeMaterial = "pie izquierdo";
            break;
        case "-236981255":
            nombreDeMaterial = "muslo derecho";
            break;
        case "-446036155":
            nombreDeMaterial = "brilla a la derecha";
            break;
        case "-1369136684":
            nombreDeMaterial = "pie derecho";
            break;
        case "-1922286884":
            nombreDeMaterial = "spine0";
            break;
        case "-1140112869":
            nombreDeMaterial = "columna1";
            break;
        case "1457572381":
            nombreDeMaterial = "columna2";
            break;
        case "32752644":
            nombreDeMaterial = "columna3";
            break;
        case "-1469616465":
            nombreDeMaterial = "clavícula izquierda";
            break;
        case "-510342358":
            nombreDeMaterial = "brazo superior izquierdo";
            break;
        case "1045062756":
            nombreDeMaterial = "brazo inferior izquierdo";
            break;
        case "113101985":
            nombreDeMaterial = "mano izquierda";
            break;
        case "-1557288998":
            nombreDeMaterial = "clavícula derecha";
            break;
        case "1501153539":
            nombreDeMaterial = "brazo superior derecho";
            break;
        case "1777921590":
            nombreDeMaterial = "desconocido (1)";
            break;
        case "2000961972":
            nombreDeMaterial = "mano derecha";
            break;
        case "1718294164":
            nombreDeMaterial = "cuello";
            break;
        case "-735392753":
            nombreDeMaterial = "cabeza";
            break;
        case "286224918":
            nombreDeMaterial = "animal predeterminado";
            break;
        case "-1916939624":
            nombreDeMaterial = "motor de coche";
            break;
        case "999829011":
            nombreDeMaterial = "charco";
            break;
        case "2015599386":
            nombreDeMaterial = "pavimento de hormigón";
            break;
        case "-1147361576":
            nombreDeMaterial = "pavimento de ladrillos";
            break;
        case "-2047468855":
            nombreDeMaterial = "encuadernación dinámica física de la cubierta";
            break;
        case "998201806":
            nombreDeMaterial = "barril de cerveza de madera vfx";
            break;
        case "-2140087047":
            nombreDeMaterial = "madera de alta fricción";
            break;
        case "127813971":
            nombreDeMaterial = "roca noinst";
            break;
        case "1441114862":
            puedePonerGraffiti = false;
            nombreDeMaterial = "arbustos noinst";
        case "-729112334":
            nombreDeMaterial = "superficie de carretera sólida de metal";
            break;
        case "-2088174996":
            nombreDeMaterial = "superficie de la rampa de acrobacias";
            break;
        case "746881105":
            nombreDeMaterial = "temp 01";
            break;
        case "-1977970111":
            nombreDeMaterial = "temp 02";
            break;
        case "1911121241":
            nombreDeMaterial = "temp 03";
            break;
        case "1923995104":
            nombreDeMaterial = "temp 04";
            break;
        case "-1393662448":
            nombreDeMaterial = "temp 05";
            break;
        case "1061250033":
            nombreDeMaterial = "temp 06";
            break;
        case "-1765523682":
            nombreDeMaterial = "temp 07";
            break;
        case "1343679702":
            nombreDeMaterial = "temp 08";
            break;
        case "1026054937":
            nombreDeMaterial = "temp 09";
            break;
        case "63305994":
            nombreDeMaterial = "temp 10";
            break;
        case "47470226":
            nombreDeMaterial = "temp 11";
            break;
        case "702596674":
            nombreDeMaterial = "temp 12";
            break;
        case "-1637485913":
            nombreDeMaterial = "temp 13";
            break;
        case "-645955574":
            nombreDeMaterial = "temp 14";
            break;
        case "-1583997931":
            nombreDeMaterial = "temp 15";
            break;
        case "-1512735273":
            nombreDeMaterial = "temp 16";
            break;
        case "1011960114":
            nombreDeMaterial = "temp 17";
            break;
        case "1354993138":
            nombreDeMaterial = "temp 18";
            break;
        case "-801804446":
            nombreDeMaterial = "temp 19";
            break;
        case "-2052880405":
            nombreDeMaterial = "temp 20";
            break;
        case "-1037756060":
            nombreDeMaterial = "temp 21";
            break;
        case "-620388353":
            nombreDeMaterial = "temp 22";
            break;
        case "465002639":
            nombreDeMaterial = "temp 23";
            break;
        case "1963820161":
            nombreDeMaterial = "temp 24";
            break;
        case "1952288305":
            nombreDeMaterial = "temperatura 25";
            break;
        case "-1116253098":
            nombreDeMaterial = "temp 26";
            break;
        case "889255498":
            nombreDeMaterial = "temp 27";
            break;
        case "-1179674098":
            nombreDeMaterial = "temp 28";
            break;
        case "1078418101":
            nombreDeMaterial = "temp 29";
            break;
        case "13626292":
            nombreDeMaterial = "temp 30";
            break;
        case "581794674":
            puedePonerGraffiti = false;
            nombreDeMaterial = "arbustos";
            break;
        case "-913351839":
            nombreDeMaterial = "ramitas";
            break;
        case "-2041329971":
            nombreDeMaterial = "hojas";
            break;
        case "-309121453":
            nombreDeMaterial = "astillas de madera";
            break;
        case "-1915425863":
            nombreDeMaterial = "tres ladridos";
            break;
        case "-1447280105":
            nombreDeMaterial = "metal sólido pequeño";
            break;
        case "-365631240":
            nombreDeMaterial = "medio sólido metálico";
            break;
        case "752131025":
            nombreDeMaterial = "metal sólido grande";
            break;
        case "15972667":
            nombreDeMaterial = "metal hueco pequeño";
            break;
        case "1849540536":
            nombreDeMaterial = "metal";
            break;
        case "-583213831":
            nombreDeMaterial = "metal hueco grande";
            break;
        case "762193613":
            nombreDeMaterial = "cadena metálica pequeña";
            break;
        case "125958708":
            nombreDeMaterial = "eslabón de cadena de metal grande";
            break;
        case "834144982":
            nombreDeMaterial = "chapa de metal";
            break;
        case "-426118011":
            nombreDeMaterial = "rejilla metálica";
            break;
        case "2100727187":
            nombreDeMaterial = "barandilla de metal";
            break;
        case "1761524221":
            nombreDeMaterial = "conducto de metal";
            break;
        case "-231260695":
            nombreDeMaterial = "puerta de garaje de metal";
            break;
        case "-754997699":
            nombreDeMaterial = "boca de alcantarilla de metal";
            break;
        case "-399872228":
            nombreDeMaterial = "madera maciza pequeña";
            break;
        case "555004797":
            nombreDeMaterial = "medio sólido de madera";
            break;
        case "815762359":
            nombreDeMaterial = "madera maciza grande";
            break;
        case "126470059":
            nombreDeMaterial = "madera maciza pulida";
            break;
        case "-749452322":
            nombreDeMaterial = "piso de madera polvoriento";
            break;
        case "1993976879":
            nombreDeMaterial = "madera hueca pequeña";
            break;
        case "-365476163":
            nombreDeMaterial = "madera";
            break;
        case "-925419289":
            nombreDeMaterial = "madera hueca grande";
            break;
        case "1176309403":
            nombreDeMaterial = "tablero de madera";
            break;
        case "722686013":
            nombreDeMaterial = "madera vieja que cruje";
            break;
        case "-1742843392":
            nombreDeMaterial = "madera de alta densidad";
            break;
        case "2011204130":
            nombreDeMaterial = "celosía de madera";
            break;
        case "-1186320715":
            nombreDeMaterial = "cerámica";
            break;
        case "1755188853":
            nombreDeMaterial = "teja";
            break;
        case "-1417164731":
            nombreDeMaterial = "fieltro de techo";
            break;
        case "1354180827":
            nombreDeMaterial = "fibra de vidrio";
            break;
        case "-642658848":
            nombreDeMaterial = "lona";
            break;
        case "-2073312001":
            nombreDeMaterial = "plástico";
            break;
        case "627123000":
            nombreDeMaterial = "hueco de plástico";
            break;
        case "-1625995479":
            nombreDeMaterial = "plástico de alta densidad";
            break;
        case "-1859721013":
            nombreDeMaterial = "plástico transparente";
            break;
        case "772722531":
            nombreDeMaterial = "plástico hueco transparente";
            break;
        case "-1338473170":
            nombreDeMaterial = "plástico transparente de alta densidad";
            break;
        case "-766055098":
            nombreDeMaterial = "fibra de vidrio hueca";
            break;
        case "-145735917":
            nombreDeMaterial = "goma";
            break;
        case "-783934672":
            nombreDeMaterial = "goma hueca";
            break;
        case "289630530":
            nombreDeMaterial = "linóleo";
            break;
        case "1845676458":
            nombreDeMaterial = "laminado";
            break;
        case "669292054":
            nombreDeMaterial = "alfombra sólida";
            break;
        case "158576196":
            nombreDeMaterial = "alfombra sólida polvorienta";
            break;
        case "-1396484943":
            nombreDeMaterial = "piso de alfombra";
            break;
        case "4044799021":
            nombreDeMaterial = "bandas rugosas";
            break;
        case "2847687191":
            nombreDeMaterial = "aluminio";
            //Posicion: 751.5424, 6467.08, 30.584953
            break;
        case "2461440131":
            nombreDeMaterial = "desconocido (2)";
            //Posicion: 752.22754, 6473.157, 29.052181
            break;
        case "2379541433":
            nombreDeMaterial = "madera con tierra";
            //Posicion: 653.2161, 6456.396, 31.451206
            break;
        case "3454750755":
            nombreDeMaterial = "rocas";
            //Posicion: -629.21216, 6237.396, 4.0918894
            break;
        case "2519482235":
            nombreDeMaterial = "acero";
            //Posicion: 185.05957, 6855.1055, 22.195581
            break;
        case "3895095068":
            nombreDeMaterial = "madera";
            //Posicion: 365.0078, 6459.858, 30.217812
            break;
        case "3929336056":
            nombreDeMaterial = "aluminio";
            //Posicion: 2222.9365, 4914.174, 40.692505
            break;
        case "4201905313":
            nombreDeMaterial = "chapa";
            //Posicion: 2180.6643, 5573.9033, 53.900352
            break;
        case "3652308448":
            nombreDeMaterial = "desconocido (3)";
            //Posicion: 2907.051, 4625.5327, 48.33625
            break;
        case "4170197704":
            nombreDeMaterial = "tierra con flores";
            //Posicion: 1842.5111, 6420.9707, 43.55863
            break;
        case "3539969597":
            nombreDeMaterial = "desconocido (4)";
            //Posicion: 1460.7645, 1122.2343, 114.33423
            break;
        case "2221655295":
            nombreDeMaterial = "desconocido (5)";
            //Posicion: 1467.0155, 1102.2303, 114.33436
            break;
        case "3711753465":
            nombreDeMaterial = "aluminio";
            //Posicion: 1454.032, 1102.5194, 114.333984
            break;
        case "2993614768":
            nombreDeMaterial = "desconocido (6)";
            //Posicion: 2729.5483, 5005.427, 35.557087
            break;
        case "122789469":
            nombreDeMaterial = "tela";
            //Posicion: 1469.8248, 6356.365, 23.796978
            break;
        case "3210327185":
            nombreDeMaterial = "hormigon";
            //Posicion: 644.1749, -1354.2183, 9.727328
            break;
        case "2877802565":
            nombreDeMaterial = "losa de techo";
            //Posicion: 122.19275, -142.72978, 66.1122
            break;
        case "3511032624":
            nombreDeMaterial = "caucho";
            //Posicion: 603.3618 6505.4233 29.836025
            break;
        default:
            break;
    }

    let obj = {
        puedePlantar: puedePlantar,
        puedePonerGraffiti: puedePonerGraffiti,
        nombreDeMaterial: nombreDeMaterial,
        humedadPorDefecto: humedadPorDefecto,
        fertilizantePorDefecto: fertilizantePorDefecto,
        calidadDelTerrenoParaPlantar: calidadDelTerrenoParaPlantar,
    };

    return obj;
}

function progresoSembrarSemilla(SQLIDObjeto_semilla_seleccionada, posicionPlanta, rotacionPlanta, nombreDeMaterial, humedadPorDefecto, fertilizantePorDefecto, calidadDelTerrenoParaPlantar, dimension) {

    let posicionPersonaje = player_local.position;
    let porcentajeProgeso = 0;
    let objetoMano;
    let objetoTipoEnMano;

    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));

    let int = setInterval(() => {
        objetoMano = obtenerObjetoMano();
        objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);

        // Si el objeto que tiene en la mano no es el que debe de tener, cancelamos la siembra de la semilla
        if (objetoTipoEnMano != 569) {
            player_local.freezePosition(false); // Descongelamos al tio para que pueda andar, ya que lo habiamos congelado antes
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes sembrar la semilla sin el objeto correspondiente en la mano");
            clearInterval(int);
            return;
        }

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos el regado
        if (calcDist(posicionPersonaje, player_local.position) > 1.85) {
            player_local.freezePosition(false); // Descongelamos al tio para que pueda andar, ya que lo habiamos congelado antes
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte del lugar mientras estás plantando la semilla");
            clearInterval(int);
            return;
        }

        // Si llega al 100% del progeso, completado el proceso de sembrado
        if (porcentajeProgeso >= 100) {
            player_local.freezePosition(false); // Descongelamos al tio para que pueda andar, ya que lo habiamos congelado antes
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));;
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.callRemote("cultivar:nuevaPlanta", SQLIDObjeto_semilla_seleccionada, posicionPlanta, rotacionPlanta, nombreDeMaterial, humedadPorDefecto, fertilizantePorDefecto, calidadDelTerrenoParaPlantar, dimension);
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si deja de hacer la animación que le corresponde para plantar la semilla, le cancelamos el sembrado
        if (player_local.isPlayingAnim(animLibreriaSembrarSemilla, animAnimacionSembrarSemilla, 3))
        {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else
        {
            player_local.freezePosition(false); // Descongelamos al tio para que pueda andar, ya que lo habiamos congelado antes
            interactuandoConPlanta = false; // Ponemos a false la variable de estar interactuando con la planta
            if (menuSEMILLAS != null) menuSEMILLAS?.Close(); // Si tiene el menu abierto, se lo cerramos
            pararAnimacion(); // Paramos la animacion que estará haciendo de plantar     
            mp.events.call("hud:cerrar_aviso_fijo"); // Le cerramos la notificacion que le muestra el progreso
            clearInterval(int); // Borramos el intervalo
            return;
        }
    }, duracionSembrarSemilla);
}

function progresoInspeccionarPlanta(plantaId, plantaPosicion, plantaNivel) {
    let porcentajeProgeso = 0;
    let planta = null;
    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));
    let int = setInterval(() => {

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos inspeccion
        if (calcDist(plantaPosicion, player_local.position) > 1.85) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte de la planta mientras la estás inspeccionando");
            clearInterval(int);
            return;
        }

        // Si llega al 100% del progeso, completado el proceso de inspección
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));

            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);

            for (let plantaC of plantas) {
                if (plantaC.id == plantaId) {
                    if (calcDist(plantaC.posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                        planta = plantaC;
                    }
                }
            }

            if (planta == null) {
                mostrarAviso("info", 5000, "La planta que estabas intentando inspeccionar ha desaparecido para siempre");
                return;
            }

            let tieneHongos;
            if (planta.hongos == true) {
                tieneHongos = " <strong><span style='color:#E53935;'>SI</span></strong>";
            } else {
                tieneHongos = " <strong><span style='color:#45B649;'>NO</span></strong>";
            }

            // Si la planta está muerta, directamente le decimos que está muerta y listo
            if (planta.muerta == true) {
                mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                    "<p><i class='fas fa-skull-crossbones'></i><span style='color:#E53935;'><strong> Esta planta está muerta </strong></span><i class='fas fa-skull-crossbones'></i></p>");
                return;
            }

            // Dependiendo del tipo de planta y la fase de crecimiento en la que se encuentre, le mostraremos unas cosas u otras.
            switch (planta.tipo) {
                case 1: // Marihuana
                    switch (planta.nivel) {
                        case 0: // Nivel 0
                            mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                                "<p><i class='fas fa-star'></i> Nivel: " + planta.nivel + " (" + planta.crecimiento + "/100%)</p>" +
                                "<p><i class='fas fa-mountain'></i> Terreno: " + planta.terrenoPlantada.charAt(0).toUpperCase() + planta.terrenoPlantada.slice(1) + "</p>" +
                                "<p><i class='fas fa-tint'></i> Agua: " + planta.agua + "%</p>" +
                                "<p><i class='fas fa-bolt'></i> Fertilizante: " + planta.fertilizante + "%</p>" +
                                "<p><i class='fas fa-exclamation-triangle'></i> Hongos: " + tieneHongos + "</p>");
                            break;
                        case 1: // Nivel 1
                            mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                                "<p><i class='fas fa-cannabis'></i> Tipo de planta: Marihuana</p>" +
                                "<p><i class='fas fa-star'></i> Nivel: " + planta.nivel + " (" + planta.crecimiento + "/100%)</p>" +
                                "<p><i class='fas fa-mountain'></i> Terreno: " + planta.terrenoPlantada.charAt(0).toUpperCase() + planta.terrenoPlantada.slice(1) + "</p>" +
                                "<p><i class='fas fa-tint'></i> Agua: " + planta.agua + "%</p>" +
                                "<p><i class='fas fa-bolt'></i> Fertilizante: " + planta.fertilizante + "%</p>" +
                                "<p><i class='fas fa-exclamation-triangle'></i> Hongos: " + tieneHongos + "</p>");
                            break;
                        case 2: // Nivel 2
                            mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                                "<p><i class='fas fa-cannabis'></i> Tipo de planta: Marihuana</p>" +
                                "<p><i class='fas fa-star'></i> Nivel: " + planta.nivel + " (" + planta.crecimiento + "/100%)</p>" +
                                "<p><i class='fas fa-mountain'></i> Terreno: " + planta.terrenoPlantada.charAt(0).toUpperCase() + planta.terrenoPlantada.slice(1) + "</p>" +
                                "<p><i class='fas fa-tint'></i> Agua: " + planta.agua + "%</p>" +
                                "<p><i class='fas fa-bolt'></i> Fertilizante: " + planta.fertilizante + "%</p>" +
                                "<p><i class='fas fa-exclamation-triangle'></i> Hongos: " + tieneHongos + "</p>");
                            break;
                        case 3: // Nivel 3
                            mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                                "<p><i class='fas fa-cannabis'></i> Tipo de planta: Marihuana</p>" +
                                "<p><i class='fas fa-check'></i><span style='color:#45B649;'><strong> Esta planta está lista para ser cortada </strong></span><i class='fas fa-check'></i></p>");
                            break;
                        default:
                            break;
                    }
                    break;
                case 2: // Tomate
                    switch (planta.nivel) {
                        case 0: // Nivel 0
                            mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                                "<p><i class='fas fa-star'></i> Nivel: " + planta.nivel + " (" + planta.crecimiento + "/100%)</p>" +
                                "<p><i class='fas fa-mountain'></i> Terreno: " + planta.terrenoPlantada.charAt(0).toUpperCase() + planta.terrenoPlantada.slice(1) + "</p>" +
                                "<p><i class='fas fa-tint'></i> Agua: " + planta.agua + "%</p>" +
                                "<p><i class='fas fa-bolt'></i> Fertilizante: " + planta.fertilizante + "%</p>" +
                                "<p><i class='fas fa-exclamation-triangle'></i> Hongos: " + tieneHongos + "</p>");
                            break;
                        case 1: // Nivel 1
                            mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                                "<p><i class='fas fa-seedling'></i> Tipo de planta: Tomate</p>" +
                                "<p><i class='fas fa-star'></i> Nivel: " + planta.nivel + " (" + planta.crecimiento + "/100%)</p>" +
                                "<p><i class='fas fa-mountain'></i> Terreno: " + planta.terrenoPlantada.charAt(0).toUpperCase() + planta.terrenoPlantada.slice(1) + "</p>" +
                                "<p><i class='fas fa-tint'></i> Agua: " + planta.agua + "%</p>" +
                                "<p><i class='fas fa-bolt'></i> Fertilizante: " + planta.fertilizante + "%</p>" +
                                "<p><i class='fas fa-exclamation-triangle'></i> Hongos: " + tieneHongos + "</p>");
                            break;
                        case 2: // Nivel 2
                            mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                                "<p><i class='fas fa-seedling'></i> Tipo de planta: Tomate</p>" +
                                "<p><i class='fas fa-star'></i> Nivel: " + planta.nivel + " (" + planta.crecimiento + "/100%)</p>" +
                                "<p><i class='fas fa-mountain'></i> Terreno: " + planta.terrenoPlantada.charAt(0).toUpperCase() + planta.terrenoPlantada.slice(1) + "</p>" +
                                "<p><i class='fas fa-tint'></i> Agua: " + planta.agua + "%</p>" +
                                "<p><i class='fas fa-bolt'></i> Fertilizante: " + planta.fertilizante + "%</p>" +
                                "<p><i class='fas fa-exclamation-triangle'></i> Hongos: " + tieneHongos + "</p>");
                            break;
                        case 3: // Nivel 3
                            mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                                "<p><i class='fas fa-seedling'></i> Tipo de planta: Tomate</p>" +
                                "<p><i class='fas fa-check'></i><span style='color:#45B649;'><strong> Esta planta está lista para ser cosechada </strong></span><i class='fas fa-check'></i></p>");
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            return;
        }

        // Si deja de hacer la animación que le corresponde para inspeccionar la planta, le cancelamos la inspeccion
        if (plantaNivel == 0) {
            if (player_local.isPlayingAnim(animLibreriaInspeccionarPlantaLVL0, animAnimacionInspeccionarPlantaLVL0, 3)) {
                mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
                porcentajeProgeso++;
            }
            else {
                interactuandoConPlanta = false;
                mostrarAviso("danger", 5000, "Se ha cancelado el proceso de inspeccionar la planta");
                pararAnimacion();
                mp.events.call("hud:cerrar_aviso_fijo");
                clearInterval(int);
                return;
            }
        }
        else
        {
            if (player_local.isPlayingAnim(animLibreriaInspeccionarPlanta, animAnimacionInspeccionarPlanta, 3)) {
                mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
                porcentajeProgeso++;
            }
            else {
                interactuandoConPlanta = false;
                mostrarAviso("danger", 5000, "Se ha cancelado el proceso de inspeccionar la planta");
                pararAnimacion();
                mp.events.call("hud:cerrar_aviso_fijo");
                clearInterval(int);
                return;
            }
        }
    }, duracionInspeccionarPlanta);
}

function progresoRegarPlanta(litros_regar, plantaCercaId, plantaCercaPosicion) {

    // Creas la particula, para esto activamos su render
    if (particula_regadera != null) particulaRegadera(true);

    let porcentajeProgeso = 0;
    let objetoMano;
    let objetoTipoEnMano;

    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));

    let int = setInterval(() => {
        objetoMano = obtenerObjetoMano();
        objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);

        // Si el objeto que tiene en la mano no es el que debe de tener, cancelamos el regado
        if (objetoTipoEnMano != 2017) {
            clearInterval(int);
            interactuandoConPlanta = false;
            particulaRegadera(false);
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes regar la planta sin el objeto correspondiente en la mano");
            pararAnimacion();
            return;
        }

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos el regado
        if (calcDist(plantaCercaPosicion, player_local.position) > 1.85) {
            clearInterval(int);
            interactuandoConPlanta = false;
            particulaRegadera(false);
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte de la planta mientras la estás regando");
            pararAnimacion();
            return;
        }

        // Si llega al 100% del progeso, completado el regado
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));
            clearInterval(int);
            interactuandoConPlanta = false;
            particulaRegadera(false);
            mp.events.callRemote("cultivar:actualizar_agua_planta", parseInt(litros_regar), parseInt(plantaCercaId));
            mp.events.call("hud:cerrar_aviso_fijo");
            pararAnimacion();
            return;
        }

        // Si en algun momento deja de hacer la animacion que le corresponde, cancelamos el regado
        if (player_local.isPlayingAnim(animLibreriaRegarPlanta, animAnimacionRegarPlanta, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            particulaRegadera(false);
            clearInterval(int);
            interactuandoConPlanta = false;
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de regar la planta");
            mp.events.call("hud:cerrar_aviso_fijo");
            return;
        }
    }, duracionRegarPlanta);
}

function progresoFertilizarPlanta(litros_fertilizar, plantaCercaId, plantaCercaPosicion) {
    // Creas la particula, para esto activamos su render
    if (particula_regadera != null) particulaRegadera(true);

    let porcentajeProgeso = 0;
    let objetoMano;
    let objetoTipoEnMano;

    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));

    let int = setInterval(() => {
        objetoMano = obtenerObjetoMano();
        objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);

        // Si el objeto que tiene en la mano no es el que debe de tener, cancelamos el fertilizado
        if (objetoTipoEnMano != 2018) {
            interactuandoConPlanta = false;
            pararAnimacion();
            particulaRegadera(false);
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes fertilizar la planta sin el objeto correspondiente en la mano");
            clearInterval(int);
            return;
        }

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos el fertilizado
        if (calcDist(plantaCercaPosicion, player_local.position) > 1.85) {
            interactuandoConPlanta = false;
            pararAnimacion();
            particulaRegadera(false);
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte de la planta mientras la estás fertilizando");
            clearInterval(int);
            return;
        }

        // Si llega al 100% del progeso, completado el fertilizado
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));

            interactuandoConPlanta = false;
            pararAnimacion();
            particulaRegadera(false);
            mp.events.callRemote("cultivar:actualizar_fertilizante_planta", parseInt(litros_fertilizar), parseInt(plantaCercaId));
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si en algun momento deja de hacer la animacion que le corresponde, cancelamos el fertilizado
        if (player_local.isPlayingAnim(animLibreriaFertilizarPlanta, animAnimacionFertilizarPlanta, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            particulaRegadera(false);
            interactuandoConPlanta = false;
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de fertilizar la planta");
            // Le cerramos la notificacion que le muestra el progreso
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }
    }, duracionFertilizarPlanta);
}

function progresoCortarPlanta(plantaCercaId, plantaCercaPosicion) {

    let porcentajeProgeso = 0;

    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));

    let int = setInterval(() => {

        if (player_local.weapon != 3756226112 && player_local.weapon != 2578778090 && player_local.weapon != 3441901897 && player_local.weapon != 4191993645 && player_local.weapon != 940833800 && player_local.weapon != 2460120199 && player_local.weapon != 3713923289) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes cortar la planta sin el utensilio correspondiente en la mano");
            clearInterval(int);
            return;
        }

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos el cortado
        if (calcDist(plantaCercaPosicion, player_local.position) > 1.85) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte de la planta mientras la estás cortando");
            clearInterval(int);
            return;
        }

        // Si llega al 100% del progeso, completado el cortado
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.callRemote("cultivar:cortar_planta", parseInt(plantaCercaId));
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si en algun momento deja de hacer la animacion que le corresponde, cancelamos el cortado
        if (player_local.isPlayingAnim(animLibreriaCortarPlanta, animAnimacionCortarPlanta, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            interactuandoConPlanta = false;
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de cortar la planta");
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }
    }, duracionCortarPlanta);
}

function progresoPulverizarPlanta(plantaCercaId, plantaCercaPosicion) {
    // Creas la particula, para esto activamos su render
    if (particula_pulverizador != null) particulaPulverizador(true);

    let porcentajeProgeso = 0;
    let objetoMano;
    let objetoTipoEnMano;

    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));


    let int = setInterval(() => {
        objetoMano = obtenerObjetoMano();
        objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);

        // Si el objeto que tiene en la mano no es el que debe de tener, cancelamos el pulverizado
        if (objetoTipoEnMano != 908) {
            interactuandoConPlanta = false;
            pararAnimacion();
            particulaPulverizador(false);
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes pulverizar la planta sin el objeto correspondiente en la mano");
            clearInterval(int);
            return;
        }

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos el pulverizado
        if (calcDist(plantaCercaPosicion, player_local.position) > 1.85) {
            interactuandoConPlanta = false;
            pararAnimacion();
            particulaPulverizador(false);
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte de la planta mientras la estás pulverizando");
            clearInterval(int);
            return;
        }

        // Si llega al 100% del progeso, completado el pulverizado
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));

            interactuandoConPlanta = false;
            pararAnimacion();
            particulaPulverizador(false);
            mp.events.callRemote("cultivar:pulverizar_planta", parseInt(plantaCercaId));
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si en algun momento deja de hacer la animacion que le corresponde, cancelamos el pulverizado
        if (player_local.isPlayingAnim(animLibreriaPulverizarPlanta, animAnimacionPulverizarPlanta, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            particulaPulverizador(false);
            interactuandoConPlanta = false;
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de pulverizar la planta");
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }
    }, duracionPulverizarPlanta);
}

function progresoArrancarPlanta(plantaCercaId, plantaCercaPosicion) {
    let porcentajeProgeso = 0;
    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));
    let int = setInterval(() => {

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos el arrancado
        if (calcDist(plantaCercaPosicion, player_local.position) > 1.85) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte de la planta mientras la estás arrancando");
            clearInterval(int);
            return;
        }

        // Comprobar que en ningún momento tenga ningún objeto ni arma en mano
        if ((tieneObjetoMano()) || (player_local.weapon != 2725352035))
        {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "Debes tener ambas manos libres mientras la estás arrancando");
            clearInterval(int);
            return;
        }

        // Si llega al 100% del progeso, completado el arrancado
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));

            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.callRemote("cultivar:arrancar_planta", parseInt(plantaCercaId));
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si en algun momento deja de hacer la animacion que le corresponde, cancelamos el arrancado
        if (player_local.isPlayingAnim(animLibreriaArrancarPlanta, animAnimacionArrancarPlanta, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            interactuandoConPlanta = false;
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de arrancar la planta");
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }
    }, duracionArrancarPlanta);
}

function progresoQuitarSemilla(plantaCercaId, plantaCercaPosicion) {
    let porcentajeProgeso = 0;
    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));
    let int = setInterval(() => {

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos el quitar la semilla
        if (calcDist(plantaCercaPosicion, player_local.position) > 1.85) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte del lugar mientras estás quitando la semilla");
            clearInterval(int);
            return;
        }

        // Comprobar que en ningún momento tenga ningún objeto ni arma en mano
        if ((tieneObjetoMano()) || (player_local.weapon != 2725352035)) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "Debes tener ambas manos libres mientras quitas la semilla");
            clearInterval(int);
            return;
        }

        // Si llega al 100% del progeso, completado quitar la semilla
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));

            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.callRemote("cultivar:quitar_semilla", parseInt(plantaCercaId));
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si en algun momento deja de hacer la animacion que le corresponde, cancelamos el quitar la semilla
        if (player_local.isPlayingAnim(animLibreriaQuitarSemilla, animAnimacionQuitarSemilla, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            interactuandoConPlanta = false;
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de quitar la semilla");
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }
    }, duracionQuitarSemilla);
}

function progresoPelarEnSueloPlantaConTijeras(cantidadParaDar, SQLIDObjetoCerca) {

    // El tiempo que tarde en pelar la planta serán random pero dependiendo de la cantidad a pelar
    let duracionTiempo = ((cantidadParaDar * 4) + (Math.random() * (83 - 41) + 41));

    let porcentajeProgeso = 0;
    let objetoMano;
    let objetoTipoEnMano;
    let posicionDePelar = player_local.position;

    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));

    let int = setInterval(() => {

        // Si llega al 100% del progeso, completado el pelado
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));
            interactuandoConPlanta = false;
            mp.events.callRemote("cultivar:terminar_progresoPelarPlanta", cantidadParaDar, SQLIDObjetoCerca, false);
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos inspeccion
        if (calcDist(posicionDePelar, player_local.position) > 0.5) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte de la planta mientras la estás pelando");
            clearInterval(int);
            return;
        }

        // Si el objeto que tiene en la mano no es el que debe de tener, cancelamos el pelado
        objetoMano = obtenerObjetoMano();
        objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);
        if (objetoTipoEnMano != 879 && objetoTipoEnMano != 942) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes pelar la planta con las tijeras si no las tienes en las manos");
            clearInterval(int);
            return;
        }

        // Si en algun momento deja de hacer la animacion que le corresponde, cancelamos el pelado
        if (player_local.isPlayingAnim(animLibreriaPelarEnSueloPlantaConTijeras, animAnimacionPelarEnSueloPlantaConTijeras, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            interactuandoConPlanta = false;
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de pelar la planta en el suelo");
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }
    }, duracionTiempo);
}

function progresoPelarEnMesaPlantaConTijeras(cantidadParaDar, SQLIDObjetoCerca) {

    // El tiempo que tarde en pelar la planta serán random pero dependiendo de la cantidad a pelar
    let duracionTiempo = ((cantidadParaDar * 2) + (Math.random() * (83 - 41) + 41));

    let porcentajeProgeso = 0;
    let objetoMano;
    let objetoTipoEnMano;
    let position;
    let directionAux;
    let endPosition;
    let frenteMesa;
    let posicionDePelar = player_local.position;

    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));

    let int = setInterval(() => {
        // Si llega al 100% del progeso, completado el pelado
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));
            interactuandoConPlanta = false;
            mp.events.callRemote("cultivar:terminar_progresoPelarPlanta", cantidadParaDar, SQLIDObjetoCerca, true);
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos inspeccion
        if (calcDist(posicionDePelar, player_local.position) > 0.5) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes alejarte de la planta mientras la estás pelando");
            clearInterval(int);
            return;
        }

        // Si en algún momento el tio se gira y el raycast no choca con la mesa, cancelamos proceso de pelar
        frenteMesa = false;
        position = player_local.getCoords(true);
        directionAux = player_local.getForwardVector();
        endPosition = new mp.Vector3((directionAux.x * 0.4) + (position.x), (directionAux.y * 0.4) + (position.y), (directionAux.z * 0.4) + (position.z));
        let raycast = mp.raycasting.testCapsule(new mp.Vector3(endPosition.x, endPosition.y, (endPosition.z + 0.2)), new mp.Vector3(endPosition.x, endPosition.y, (endPosition.z - 0.5)), 0.01, player_local, 16); // Colision con objetos
        if (raycast) { // Ha tocado algo
            var entidad = raycast.entity;
            if (entidad && entidad != null) { // El resultado es válido
                let tipo = entidad.type;
                if (tipo != undefined && tipo != null) { // ENTIDAD RAGEMP
                    if (tipo == "object") {
                        switch (entidad.model) {
                            case 518749770: // Mesa de marihuana
                                frenteMesa = true;
                                break;
                        }
                    }
                }
            }
        }
        if (frenteMesa == false) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "Debes estar frente a la mesa mientras estás pelando la planta");
            clearInterval(int);
            return;
        }

        // Si el objeto que tiene en la mano no es el que debe de tener, cancelamos el pelado
        objetoMano = obtenerObjetoMano();
        objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);
        if (objetoTipoEnMano != 879 && objetoTipoEnMano != 942) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes pelar la planta con las tijeras si no las tienes en las manos");
            clearInterval(int);
            return;
        }

        // Si en algun momento deja de hacer la animacion que le corresponde, cancelamos el pelado
        if (player_local.isPlayingAnim(animLibreriaPelarEnSueloPlantaConTijeras, animAnimacionPelarEnSueloPlantaConTijeras, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            interactuandoConPlanta = false;
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de pelar la planta en la mesa");
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }
    }, duracionTiempo);
}

function progresoAnalizarTerreno() {

    interactuandoConPlanta = true;
    let porcentajeProgeso = 0;
    let objetoMano;
    let objetoTipoEnMano;
    let posicionAnalizandoTerreno = player_local.position;

    mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: 0%</strong>`]));

    let int = setInterval(() => {
        objetoMano = obtenerObjetoMano();
        objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);

        // Si el objeto que tiene en la mano no es el que debe de tener, cancelamos la analización del terreno
        if (objetoTipoEnMano != 1050) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No puedes analizar el terreno sin el objeto correspondiente en la mano");
            clearInterval(int);
            return;
        }

        // Si en algun momento se aleja mas de la cuenta de la planta, cancelamos el regado
        if (calcDist(posicionAnalizandoTerreno, player_local.position) > 0.2) {
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            mostrarAviso("danger", 5000, "No moverte mientras estás analizando el terreno");
            clearInterval(int);
            return;
        }

        // Si llega al 100% del progeso, completado el proceso de sembrado
        if (porcentajeProgeso >= 100) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong><span style='color:#00d667;'>PROGRESO: 100%</span></strong>`]));

            // Obtenemos la posición de donde tiene la mano derecha, que al estar agachado está cerca del suelo
            let position = player_local.getBoneCoords(28422, 0, 0, 0);
            let endPosition = player_local.getBoneCoords(28422, 1, 0, 0);
            let posicionAnalizarTerreno = null;
            let materialAnalizarTerreno = null;

            let raycast = mp.raycasting.testCapsule(position, endPosition, 0.001, player_local, -1); // Colision con objetos
            if (raycast) { // Ha tocado algo
                posicionAnalizarTerreno = raycast.position;
                materialAnalizarTerreno = raycast.material;
                limpiarHandleRaycast(raycast.entity);
            }

            if (posicionAnalizarTerreno == null || materialAnalizarTerreno == null)
            {
                interactuandoConPlanta = false;
                pararAnimacion();
                mp.events.call("hud:cerrar_aviso_fijo");
                clearInterval(int);

                mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                    "<p><strong><span style='color:#ff7900;'> La inspección no ha resultado exitosa, vuelve a intentarlo </span></strong></p>");
                return;
            }

            // Obtenemos el terreno sobre el que esta con todas sus variables
            let variablesTerreno = obtenerTerrenoDeMaterial(materialAnalizarTerreno);

            let humedadPorDefectoAnalizarTerreno = Math.random() * ((variablesTerreno.humedadPorDefecto + 5) - (variablesTerreno.humedadPorDefecto - 5)) + (variablesTerreno.humedadPorDefecto - 5);
            let fertilizantePorDefectoAnalizarTerreno = Math.random() * ((variablesTerreno.fertilizantePorDefecto + 5) - (variablesTerreno.fertilizantePorDefecto - 5)) + (variablesTerreno.fertilizantePorDefecto - 5);

            if (humedadPorDefectoAnalizarTerreno < 0) humedadPorDefectoAnalizarTerreno = 0;
            if (fertilizantePorDefectoAnalizarTerreno < 0) fertilizantePorDefectoAnalizarTerreno = 0;

            if (variablesTerreno.puedePlantar)
            {
                mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                    "<p><strong><i class='fas fa-check'></i><span style='color:#45B649;'> APTO PARA CULTIVAR </span></strong></p>" +
                    "<p><i class='fas fa-mountain'></i> Terreno: " + variablesTerreno.nombreDeMaterial.charAt(0).toUpperCase() + variablesTerreno.nombreDeMaterial.slice(1) + "</p>" +
                    "<p><i class='fas fa-tint'></i> Humedad: " + humedadPorDefectoAnalizarTerreno.toFixed() + "%</p>" +
                    "<p><i class='fas fa-bolt'></i> Fertilizante: " + fertilizantePorDefectoAnalizarTerreno.toFixed() + "%</p>" +
                    "<p><i>Margen de error de +-5% en humedad y fertilizante</i></p>");
            } else
            {
                mostrarAviso("big", 10000, "<h1> RESULTADO DE INSPECCIÓN </h1>" +
                    "<p><strong><i class='fas fa-times'></i><span style='color:#E53935;'> NO APTO PARA CULTIVAR </span></strong></p>" +
                    "<p><i class='fas fa-mountain'></i> Terreno: " + variablesTerreno.nombreDeMaterial.charAt(0).toUpperCase() + variablesTerreno.nombreDeMaterial.slice(1) + "</p>");
            }

            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

        // Si deja de hacer la animación que le corresponde para analizar el terreno, le cancelamos el analisis
        if (player_local.isPlayingAnim(animLibreriaAnalizarTerreno, animAnimacionAnalizarTerreno, 3)) {
            mp.events.call("hud:aviso", JSON.stringify([5, -1, `<strong>PROGRESO: ${porcentajeProgeso}%</strong>`]));
            porcentajeProgeso++;
        }
        else {
            mostrarAviso("danger", 5000, "Se ha cancelado el proceso de analizar el terreno");
            interactuandoConPlanta = false;
            pararAnimacion();
            mp.events.call("hud:cerrar_aviso_fijo");
            clearInterval(int);
            return;
        }

    }, duracionAnalizarTerreno);
}

//-----------------------------------------------------------------------------MENUS USADOS EN EL SISTEMA DE CULTIVOS---------------------------------------------------------------------------------//

// MENU PRINCIPAL, ES EL QUE SE ABRE CUANDO PULSAS LA E CERCA DE UNA PLANTA, DEPENDIENDO DE LAS ACCIONES QUE PUEDA REALIZAR, LO CREAMOS DE UNA FORMA U OTRA.
function menu_planta() {

    let planta = null;
    let objetoMano = obtenerObjetoMano();
    let objetoTipoEnMano = (objetoMano != null ? objetoMano.tipoObjeto : -1);
    let objetoCantidadEnMano = (objetoMano != null ? objetoMano.cantidad : -1);

    for (let plantaC of plantas) {
        if (plantaC.posicion) {
            if (calcDist(plantaC.posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                planta = plantaC;
            }
        }
    }

    if (planta == null) return;

    let opcionMenu = 0;

    menuCULTIVOS = crearMenuConDistancia(0.5, "Cultivos", "Opciones disponibles");
    // Si la planta está muerta, unicamente le permitiremos inspeccionarla y arrancarla
    if (planta.muerta == true) {
        menuCULTIVOS.AddItem(new UIMenuItem("Inspeccionar", "Inspecciona la planta y obtén información sobre su estado"));

        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035))
        {
            CultivoOpcionItem = aplicarColores(new UIMenuItem("Arrancar", "Necesitas tener las manos libres para poder arrancar la planta"), "Naranja");
            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
            menuCULTIVOS.AddItem(CultivoOpcionItem);
        }
        else
        {
            menuCULTIVOS.AddItem(new UIMenuItem("Arrancar", "Arranca la planta sin obtener nada de ella"));
        }

    }
    else {
        // Cortar 
        if (player_local.weapon == 3756226112 || player_local.weapon == 2578778090 || player_local.weapon == 3441901897 || player_local.weapon == 4191993645 || player_local.weapon == 940833800 || player_local.weapon == 2460120199 || player_local.weapon == 3713923289) {
            opcionMenu = 3;
            menuCULTIVOS.AddItem(new UIMenuItem("Inspeccionar", "Inspecciona la planta y obtén información sobre su estado"));
            CultivoOpcionItem = aplicarColores(new UIMenuItem("Regar", "Necesitas tener una regadera con agua en la mano para poder regar la planta"), "Naranja");
            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
            menuCULTIVOS.AddItem(CultivoOpcionItem);
            CultivoOpcionItem = aplicarColores(new UIMenuItem("Fertilizar", "Necesitas tener una regadera con fertilizante en la mano para poder regar la planta"), "Naranja");
            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
            menuCULTIVOS.AddItem(CultivoOpcionItem);
            if (planta.nivel == 3) {
                menuCULTIVOS.AddItem(new UIMenuItem("Cortar", "Cortas la planta y obtienes el correspondiente beneficio"));
            }
            else {
                CultivoOpcionItem = aplicarColores(new UIMenuItem("Cortar", "La planta debe ser nivel 3 para poder ser cortada"), "Azul");
                CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuCULTIVOS.AddItem(CultivoOpcionItem);
            }
            CultivoOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "Necesitas tener un pulverizador en la mano para poder quitar los hongos a la planta"), "Naranja");
            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
            menuCULTIVOS.AddItem(CultivoOpcionItem);
            if (planta.nivel == 0) {
                if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Quitar semilla", "Necesitas tener las manos libres para poder quitar la semilla"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                } else {
                    menuCULTIVOS.AddItem(new UIMenuItem("Quitar semilla", "Quita la semilla y haz que no crezca ninguna planta"));
                }
            } else {
                if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Arrancar", "Necesitas tener las manos libres para poder arrancar la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                } else {
                    menuCULTIVOS.AddItem(new UIMenuItem("Arrancar", "Arranca la planta sin obtener nada de ella"));
                }
            }
            menuCULTIVOS.AddItem(aplicarColores(new UIMenuItem("Cerrar", "Cierra el menú actual"), "Rojo"));
            menuCULTIVOS._activeItem = 1e3 + 4;
        }
        else {
            // Dependiendo del objeto que tenga en la mano el menu se lo crearemos de una forma u otra
            switch (objetoTipoEnMano) {
                // Regar (Objetos aptos para regar)
                case 2017: // Regadera con agua
                    opcionMenu = 1;
                    menuCULTIVOS.AddItem(new UIMenuItem("Inspeccionar", "Inspecciona la planta y obtén información sobre su estado"));
                    menuCULTIVOS.AddItem(new UIMenuListItem("Regar", "Riega la planta con la cantidad de litros que selecciones", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"])));
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Fertilizar", "Necesitas tener una regadera con fertilizante en la mano para poder regar la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Cortar", "Podrás cortar la planta con navaja, cuchillo, daga, machete, hacha, hacha de batalla o hacha de piedra teniendo el arma en la mano"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "Necesitas tener un pulverizador en la mano para poder quitar los hongos a la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    if (planta.nivel == 0) {
                        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Quitar semilla", "Necesitas tener las manos libres para poder quitar la semilla"), "Naranja");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        } else {
                            menuCULTIVOS.AddItem(new UIMenuItem("Quitar semilla", "Quita la semilla y haz que no crezca ninguna planta"));
                        }
                    } else {
                        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Arrancar", "Necesitas tener las manos libres para poder arrancar la planta"), "Naranja");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        } else {
                            menuCULTIVOS.AddItem(new UIMenuItem("Arrancar", "Arranca la planta sin obtener nada de ella"));
                        }
                    }
                    menuCULTIVOS.AddItem(aplicarColores(new UIMenuItem("Cerrar", "Cierra el menú actual"), "Rojo"));
                    menuCULTIVOS._activeItem = 1e3 + 2;
                    break;
                // Fertilizar (Objetos aptos para fertilizar)
                case 2018: // Regadera con fertilizante
                    opcionMenu = 2;
                    menuCULTIVOS.AddItem(new UIMenuItem("Inspeccionar", "Inspecciona la planta y obtén información sobre su estado"));
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Regar", "Necesitas tener una regadera con agua en la mano para poder regar la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    menuCULTIVOS.AddItem(new UIMenuListItem("Fertilizar", "Fertiliza la planta con la cantidad de litros que selecciones", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"])));
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Cortar", "Podrás cortar la planta con navaja, cuchillo, daga, machete, hacha, hacha de batalla o hacha de piedra teniendo el arma en la mano"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "Necesitas tener un pulverizador en la mano para poder quitar los hongos a la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    if (planta.nivel == 0) {
                        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Quitar semilla", "Necesitas tener las manos libres para poder quitar la semilla"), "Naranja");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        } else {
                            menuCULTIVOS.AddItem(new UIMenuItem("Quitar semilla", "Quita la semilla y haz que no crezca ninguna planta"));
                        }
                    } else {
                        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Arrancar", "Necesitas tener las manos libres para poder arrancar la planta"), "Naranja");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        } else {
                            menuCULTIVOS.AddItem(new UIMenuItem("Arrancar", "Arranca la planta sin obtener nada de ella"));
                        }
                    }
                    menuCULTIVOS.AddItem(aplicarColores(new UIMenuItem("Cerrar", "Cierra el menú actual"), "Rojo"));
                    menuCULTIVOS._activeItem = 1e3 + 3;
                    break;
                // Pulverizar
                case 908: // Pulverizador
                    opcionMenu = 4;
                    menuCULTIVOS.AddItem(new UIMenuItem("Inspeccionar", "Inspecciona la planta y obtén información sobre su estado"));
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Regar", "Necesitas tener una regadera con agua en la mano para poder regar la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Fertilizar", "Necesitas tener una regadera con fertilizante en la mano para poder regar la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Cortar", "Podrás cortar la planta con navaja, cuchillo, daga, machete, hacha, hacha de batalla o hacha de piedra teniendo el arma en la mano"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    if (objetoCantidadEnMano <= 0)
                    {
                        CultivoOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "El pulverizador que tienes en la mano tiene 0 usos, está acabado"), "Rojo");
                        CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuCULTIVOS.AddItem(CultivoOpcionItem);
                    }
                    else
                    {
                        if (planta.hongos == true) {
                            menuCULTIVOS.AddItem(new UIMenuItem("Pulverizar", "Pulveriza la planta para eliminar los hongos de ella"));
                        } else {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "La planta no tiene hongos, por lo que no tiene que ser pulverizada"), "Verde");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        }
                    }
                    if (planta.nivel == 0) {
                        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Quitar semilla", "Necesitas tener las manos libres para poder quitar la semilla"), "Naranja");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        } else {
                            menuCULTIVOS.AddItem(new UIMenuItem("Quitar semilla", "Quita la semilla y haz que no crezca ninguna planta"));
                        }
                    } else {
                        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Arrancar", "Necesitas tener las manos libres para poder arrancar la planta"), "Naranja");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        } else {
                            menuCULTIVOS.AddItem(new UIMenuItem("Arrancar", "Arranca la planta sin obtener nada de ella"));
                        }
                    }
                    menuCULTIVOS.AddItem(aplicarColores(new UIMenuItem("Cerrar", "Cierra el menú actual"), "Rojo"));
                    menuCULTIVOS._activeItem = 1e3 + 5;
                    break;
                default: // Sin objeto en la mano o con un objeto que no es los que tenemos definidos para hacer las acciones correspondientes
                    opcionMenu = 5;
                    menuCULTIVOS.AddItem(new UIMenuItem("Inspeccionar", "Inspecciona la planta y obtén información sobre su estado"));
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Regar", "Necesitas tener una regadera con agua en la mano para poder regar la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Fertilizar", "Necesitas tener una regadera con fertilizante en la mano para poder regar la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Cortar", "Podrás cortar la planta con navaja, cuchillo, daga, machete, hacha, hacha de batalla o hacha de piedra teniendo el arma en la mano"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    CultivoOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "Necesitas tener un pulverizador en la mano para poder quitar los hongos a la planta"), "Naranja");
                    CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuCULTIVOS.AddItem(CultivoOpcionItem);
                    if (planta.nivel == 0) {
                        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Quitar semilla", "Necesitas tener las manos libres para poder quitar la semilla"), "Naranja");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        } else {
                            menuCULTIVOS.AddItem(new UIMenuItem("Quitar semilla", "Quita la semilla y haz que no crezca ninguna planta"));
                        }
                    } else {
                        if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                            CultivoOpcionItem = aplicarColores(new UIMenuItem("Arrancar", "Necesitas tener las manos libres para poder arrancar la planta"), "Naranja");
                            CultivoOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuCULTIVOS.AddItem(CultivoOpcionItem);
                        } else {
                            menuCULTIVOS.AddItem(new UIMenuItem("Arrancar", "Arranca la planta sin obtener nada de ella"));
                        }
                    }
                    menuCULTIVOS.AddItem(aplicarColores(new UIMenuItem("Cerrar", "Cierra el menú actual"), "Rojo"));
                    break;
            }
        }
    }

    menuCULTIVOS.ItemSelect.on((item, index) => {

        switch (item.Text) {
            case "Inspeccionar":
                if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                if (adminservicio) // Si está de adminservicio, directamente le mostramos la información y también la SQLID de la planta
                {
                    interactuandoConPlanta = false;
                    mostrarAviso("big", 10000, "<h1> INSPECCIÓN EN ADMINSERVICIO </h1>" +
                        "<p><i class='fab fa-stripe-s'></i> SQLID: " + planta.id + "</p>" +
                        "<p><i class='fas fa-parking'></i> Plantada por PJ: " + planta.personaje_id + "</p>" +
                        "<p><i class='fab fa-facebook-square'></i> De faccion: " + planta.faccion_id + "</p>" +
                        "<p><i class='fas fa-star'></i> Nivel: " + planta.nivel + " (" + planta.crecimiento + "/100%)</p>" +
                        "<p><i class='fas fa-mountain'></i> Terreno: " + planta.terrenoPlantada.charAt(0).toUpperCase() + planta.terrenoPlantada.slice(1) + "</p>" +
                        "<p><i class='fas fa-tint'></i> Agua: " + planta.agua + "%</p>" +
                        "<p><i class='fas fa-bolt'></i> Fertilizante: " + planta.fertilizante + "%</p>" +
                        "<p><i class='fas fa-exclamation-triangle'></i> Hongos: " + planta.hongos + "</p>");
                }
                else
                {
                    // Si es nivel 0 hacemos una animación, si es nivel 1 hacemos otra.
                    if (planta.nivel == 0) mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaInspeccionarPlantaLVL0, animAnimacionInspeccionarPlantaLVL0, 5, 5, -1, flagInspeccionarPlantaLVL0);
                    else mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaInspeccionarPlanta, animAnimacionInspeccionarPlanta, 5, 5, -1, flagInspeccionarPlanta);

                    interactuandoConPlanta = true;

                    let int = crearTimeout(() => {
                        clearTimeout(int);
                        int = null;
                        progresoInspeccionarPlanta(planta.id, planta.posicion, planta.nivel);
                    }, 500);
                }
                break;

            case "Regar":
                if (opcionMenu != 1)
                {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    return;
                }

                if (item instanceof UIMenuListItem) {

                    let objetoManoRegarPlanta = obtenerObjetoMano();

                    if (objetoManoRegarPlanta == null) {
                        if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                        mostrarAviso("danger", 5000, "No puedes regar sin una regadera en la mano");
                        return;
                    }

                    if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                        if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                        mostrarAviso("danger", 5000, "No puedes regar con " + parseInt(item.SelectedItem.DisplayText) + "l");
                        return;
                    }

                    let objetoCantidadEnManoRegarPlanta = (objetoManoRegarPlanta != null ? objetoManoRegarPlanta.cantidad : -1);

                    if (parseInt(item.SelectedItem.DisplayText) > objetoCantidadEnManoRegarPlanta) {
                        mostrarAviso("danger", 5000, "No puedes regar con " + parseInt(item.SelectedItem.DisplayText) + "l si la regadera solo tiene " + objetoCantidadEnManoRegarPlanta + "l");
                        return;
                    }

                    if (menuCULTIVOS != null) menuCULTIVOS?.Close();

                    let plantaCercaId = null;
                    let plantaCercaPosicion = null;

                    for (let planta of plantas) {
                        if (planta.posicion) {
                            if (calcDist(planta.posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                                plantaCercaId = planta.id;
                                plantaCercaPosicion = planta.posicion;
                            }
                        }
                    }

                    if ((plantaCercaId != null) && (plantaCercaPosicion != null)) {

                        interactuandoConPlanta = true;

                        mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaRegarPlanta, animAnimacionRegarPlanta, 5, 5, -1, flagRegarPlanta);


                        crearTimeout(function () {
                            progresoRegarPlanta(parseInt(item.SelectedItem.DisplayText), plantaCercaId, plantaCercaPosicion);
                        }, 500);

                    }
                    else
                    {
                        mostrarAviso("danger", 5000, "No estás cerca de ninguna planta");
                        return;
                    }

                } else {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                break;

            case "Fertilizar":
                if (opcionMenu != 2)
                {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    return;
                }

                if (item instanceof UIMenuListItem) {

                    let objetoManoFertilizarPlanta = obtenerObjetoMano();

                    if (objetoManoFertilizarPlanta == null) {
                        if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                        mostrarAviso("danger", 5000, "No puedes fertilizar sin una regadera en la mano");
                        return;
                    }

                    if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                        if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                        mostrarAviso("danger", 5000, "No puedes fertilizar con " + parseInt(item.SelectedItem.DisplayText) + "l");
                        return;
                    }

                    let objetoCantidadEnManoFertilizarPlanta = (objetoManoFertilizarPlanta != null ? objetoManoFertilizarPlanta.cantidad : -1);

                    if (parseInt(item.SelectedItem.DisplayText) > objetoCantidadEnManoFertilizarPlanta) {
                        mostrarAviso("danger", 5000, "No puedes fertilizar con " + parseInt(item.SelectedItem.DisplayText) + "l si la regadera solo tiene " + objetoCantidadEnManoFertilizarPlanta + "l");
                        return;
                    }

                    if (menuCULTIVOS != null) menuCULTIVOS?.Close();

                    let plantaCercaId = null;
                    let plantaCercaPosicion = null;

                    for (let planta of plantas) {
                        if (planta.posicion) {
                            if (calcDist(planta.posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                                plantaCercaId = planta.id;
                                plantaCercaPosicion = planta.posicion;
                            }
                        }
                    }

                    if ((plantaCercaId != null) && (plantaCercaPosicion != null)) {

                        interactuandoConPlanta = true;

                        mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaFertilizarPlanta, animAnimacionFertilizarPlanta, 5, 5, -1, flagFertilizarPlanta);

                        crearTimeout(function () {
                            progresoFertilizarPlanta(parseInt(item.SelectedItem.DisplayText), plantaCercaId, plantaCercaPosicion);
                        }, 500);

                    }
                    else
                    {
                        mostrarAviso("danger", 5000, "No estás cerca de ninguna planta");
                        return;
                    }
                } else {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                break;

            case "Cortar":
                if (opcionMenu != 3) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    return;
                }
                if (planta.nivel == 3) {
                    if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                    menu_confirmar("cortar", -1);
                }
                else {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                break;

            case "Pulverizar":
                if (opcionMenu != 4) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    return;
                }
                if (planta.hongos == true) // Si tiene hongos le permitimos pulverizar, si no tiene, le ponemos un sonidito guapi de error
                {
                    mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaPulverizarPlanta, animAnimacionPulverizarPlanta, 5, 5, -1, flagPulverizarPlanta);

                    interactuandoConPlanta = true;
                    if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                    let int = crearTimeout(() => {
                        clearTimeout(int);
                        int = null;
                        progresoPulverizarPlanta(planta.id);
                    }, 500);
                }
                else {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                break;

            case "Arrancar":
                if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                else {
                    if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                    menu_confirmar("arrancar", -1);
                }
                break;
            case "Quitar semilla":
                if ((objetoTipoEnMano != -1) || (player_local.weapon != 2725352035)) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                }
                else {
                    if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                    menu_confirmar("quitar_semilla", -1);
                }
                break;

            case "Recoger":
            case "Cerrar":
                if (menuCULTIVOS != null) menuCULTIVOS?.Close();
                break;

            default:
                break;
        }
    });

    menuCULTIVOS.MenuClose.on(item => {
        menu_con_distancia = null;
        menuCULTIVOS = null;
    });
}

// MENU QUE SE ABRIRÁ AL TIRAR /USAR O TECLA ENTER CON LA PALA DE JARDINERIA
function menu_usar_objeto_palaJardineria(semillasEnInventario) {

    // PONEMOS LA VARIABLE DE INTERACTUAR CON LA PLANTA A TRUE
    interactuandoConPlanta = true;

    // Variables que se usan unicamente en esta función
    let intervalo_Int1 = null;

    let descripcionOpcion0 = "No tienes ninguna semilla ni pack de\nsemillas en las teclas de accion\nrapida con cantidad igual o mayor a 1";
    let descripcionOpcion1 = "No puedes sembrar una semilla en el agua";
    let descripcionOpcion2 = "Estás demasiado cerca de otra planta.\nLa flecha roja debe estar a más de " + distanciaPermitidaEntrePlantayPlanta + " metros"
    let descripcionOpcion3 = "No puedes sembrar una semilla mientras\nhaya gente cerca tuya (debe estar a más\nde " + distanciaPermitidaEntrePlantayPlanta + " metros de la flecha)";
    let descripcionOpcion4 = "Es imposible plantar una semilla hacia\ndonde está mirando tu personaje";
    let descripcionOpcion5 = "El terreno sobre el que deseas plantar\nla semilla no es apropiado para ello";
    let descripcionOpcion6 = "Accedes a un menu para seleccionar la\nsemilla que deseas plantar";

    // CREAMOS EL MENU
    menuUSAROBJ_PALA = crearMenu("Pala de jardineria", " ");
    menuUSAROBJ_PALA.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Frente a nuestro personaje veremos una flecha que se pondrá verde si es posible sembrar, roja si no es posible o azul si se están realizando comprobaciones. Si no es posible sembrar, en la descripción de la opción “Sembrar semilla” nos indicará el motivo"), "Amarillo")); // "Se indicará con una flecha el lugar donde se sembrará la semilla. La flecha roja indicará el no poder sembrar la semilla, la verde indicará que si puedes sembrarla. Si en algún momento la flecha azul ten paciencia"
    if (purga) // Si la purga está activa, le diremos que no está disponible sembrar una semilla durante la purga
    {
        OBJUsarPalaOpcionItem = aplicarColores(new UIMenuItem("Sembrar semilla", "No puedes sembrar una semilla durante la purga, espera a que termine el evento"), "Rojo");
        OBJUsarPalaOpcionItem.SetRightBadge(BadgeStyle.Lock);
        menuUSAROBJ_PALA.AddItem(OBJUsarPalaOpcionItem);
    }
    else
    {
        // OPCION "AYUDA"
        item1UsarPalaJardineria = new UIMenuItem("Sembrar semilla", "");
        menuUSAROBJ_PALA.AddItem(item1UsarPalaJardineria);
        // SI NO TIENE SEMILLAS EN EL INVENTARIO, DIRECTAMENTE NO PUEDE SEMBRAR
        if (semillasEnInventario.length <= 0) {
            if (item1UsarPalaJardineria.Description.length != descripcionOpcion0.length) {
                item1UsarPalaJardineria.Description = descripcionOpcion0;
                item1UsarPalaJardineria.HighlightedBackColor = new Color(229, 57, 53, 255);
                item1UsarPalaJardineria.ForeColor = new Color(229, 57, 53, 255);
                item1UsarPalaJardineria.HighlightedForeColor = new Color(0, 0, 0, 255);
                item1UsarPalaJardineria.RightBadge = BadgeStyle.Lock;
            }
        }
        else // SI TIENE SEMILLA EN INVENTARIO, ESTAREMOS COMBRANDO CADA 50 MS SI TIENE GENTE CERCA, SI ESTÁ METIDO EN EL AGUA O SI ESTA CERCA DE UNA PLANTA
        {
            intervalo_Int1 = setInterval(() => {
                if (mp.markers.exists(markerUsarPalaJardineria)) markerUsarPalaJardineria.destroy();

                // Obtenemos la posición para obtener el material, enfrente del personaje
                let positionInt1 = player_local.getCoords(true);
                let directionAuxInt1 = player_local.getForwardVector();
                let endPositionInt1 = new mp.Vector3((directionAuxInt1.x * 1.1) + (positionInt1.x), (directionAuxInt1.y * 1.1) + (positionInt1.y), (directionAuxInt1.z * 1.1) + (positionInt1.z));
                let raycastInt1 = mp.raycasting.testCapsule(new mp.Vector3(endPositionInt1.x, endPositionInt1.y, endPositionInt1.z + 1.0), new mp.Vector3(endPositionInt1.x, endPositionInt1.y, endPositionInt1.z - 1.6), 0.001, player_local, -1); // Colision con objetos
                if (raycastInt1) // Ha tocado algo
                {
                    let cercaPlantaInt1 = false;

                    // Obtenemos los jugadores cerca
                    let jugsCercaInt1 = mp.players.toArray().filter((jug) => (calcDist(jug.position, new mp.Vector3(raycastInt1.position.x, raycastInt1.position.y, raycastInt1.position.z)) < distanciaPermitidaEntrePlantayPlanta && jug.dimension == 0));
                    // Obtenemos si está cerca de otra planta
                    for (let i = 0, n = plantas.length; i < n; i++) {
                        if (plantas[i].posicion) {
                            if (calcDist(plantas[i].posicion, raycastInt1.position) < distanciaPermitidaEntrePlantayPlanta) {
                                cercaPlantaInt1 = true;
                            }
                        }
                    }

                    let colorMarker = { R: 69, G: 182, B: 73, };

                    // COMPROBAMOS SI LA DESCRIPCION DE LA OPCION "Sembrar Semilla" es la que debe tener dependiendo dela situacion
                    if (player_local.isInWater() || player_local.isSwimming() || player_local.isSwimmingUnderWater()) {
                        if (item1UsarPalaJardineria.Description.length != descripcionOpcion1.length) {
                            item1UsarPalaJardineria.Description = descripcionOpcion1;
                            item1UsarPalaJardineria.HighlightedBackColor = new Color(229, 57, 53, 255);
                            item1UsarPalaJardineria.ForeColor = new Color(229, 57, 53, 255);
                            item1UsarPalaJardineria.HighlightedForeColor = new Color(0, 0, 0, 255);
                            item1UsarPalaJardineria.RightBadge = BadgeStyle.Lock;
                        }
                        if (colorMarker.R != 229 && colorMarker.G != 57 && colorMarker.B != 53) colorMarker = { R: 229, G: 57, B: 53, };
                    }
                    else if (cercaPlantaInt1) {
                        if (item1UsarPalaJardineria.Description.length != descripcionOpcion2.length) {
                            item1UsarPalaJardineria.Description = descripcionOpcion2;
                            item1UsarPalaJardineria.HighlightedBackColor = new Color(229, 57, 53, 255);
                            item1UsarPalaJardineria.ForeColor = new Color(229, 57, 53, 255);
                            item1UsarPalaJardineria.HighlightedForeColor = new Color(0, 0, 0, 255);
                            item1UsarPalaJardineria.RightBadge = BadgeStyle.Lock;
                        }
                        if (colorMarker.R != 229 && colorMarker.G != 57 && colorMarker.B != 53) colorMarker = { R: 229, G: 57, B: 53, };

                    }
                    else if (jugsCercaInt1.length > 1) {
                        if (item1UsarPalaJardineria.Description.length != descripcionOpcion3.length) {
                            item1UsarPalaJardineria.Description = descripcionOpcion3;
                            item1UsarPalaJardineria.HighlightedBackColor = new Color(229, 57, 53, 255);
                            item1UsarPalaJardineria.ForeColor = new Color(229, 57, 53, 255);
                            item1UsarPalaJardineria.HighlightedForeColor = new Color(0, 0, 0, 255);
                            item1UsarPalaJardineria.RightBadge = BadgeStyle.Lock;
                        }
                        if (colorMarker.R != 229 && colorMarker.G != 57 && colorMarker.B != 53) colorMarker = { R: 229, G: 57, B: 53, };
                    }
                    else if (obtenerTerrenoDeMaterial(raycastInt1.material).puedePlantar === false) {
                        if (item1UsarPalaJardineria.Description.length != descripcionOpcion5.length) {
                            item1UsarPalaJardineria.Description = descripcionOpcion5;
                            item1UsarPalaJardineria.HighlightedBackColor = new Color(229, 57, 53, 255);
                            item1UsarPalaJardineria.ForeColor = new Color(229, 57, 53, 255);
                            item1UsarPalaJardineria.HighlightedForeColor = new Color(0, 0, 0, 255);
                            item1UsarPalaJardineria.RightBadge = BadgeStyle.Lock;
                        }
                        if (colorMarker.R != 229 && colorMarker.G != 57 && colorMarker.B != 53) colorMarker = { R: 229, G: 57, B: 53, };
                    }
                    else {
                        if (item1UsarPalaJardineria.Description.length != descripcionOpcion6.length) {
                            item1UsarPalaJardineria.Description = descripcionOpcion6;
                            item1UsarPalaJardineria.HighlightedBackColor = new Color(255, 255, 255, 255);
                            item1UsarPalaJardineria.ForeColor = new Color(245, 245, 245, 255);
                            item1UsarPalaJardineria.HighlightedForeColor = new Color(0, 0, 0, 255);
                            item1UsarPalaJardineria.RightBadge = BadgeStyle.None;
                        }
                        if (colorMarker.R != 69 && colorMarker.G != 182 && colorMarker.B != 73) colorMarker = { R: 69, G: 182, B: 73, };
                    }

                    // LE CREAMOS EL MARKER VERDE O ROJO, DEPENDE DE LO QUE SE HAYA PUESTO EN LA VARIABLE colorMarker
                    markerUsarPalaJardineria = mp.markers.new(0, new mp.Vector3(raycastInt1.position.x, raycastInt1.position.y, (mp.game.gameplay.getGroundZFor3dCoord(raycastInt1.position.x, raycastInt1.position.y, (raycastInt1.position.z + 1), parseFloat(0), false) + 0.3)), 0.3,
                        {
                            color: [colorMarker.R, colorMarker.G, colorMarker.B, 255],
                            visible: true,
                            dimension: raycastInt1.dimension
                        });

                    limpiarHandleRaycast(raycastInt1.entity);
                }
                else {
                    if (item1UsarPalaJardineria.Description.length != descripcionOpcion4.length) {
                        item1UsarPalaJardineria.Description = descripcionOpcion4;
                        item1UsarPalaJardineria.HighlightedBackColor = new Color(229, 57, 53, 255);
                        item1UsarPalaJardineria.ForeColor = new Color(229, 57, 53, 255);
                        item1UsarPalaJardineria.HighlightedForeColor = new Color(0, 0, 0, 255);
                        item1UsarPalaJardineria.RightBadge = BadgeStyle.Lock;
                    }

                    let posEnfrenteInt1 = new mp.Vector3((player_local.getForwardVector().x * 1) + (player_local.getCoords(true).x), (player_local.getForwardVector().y * 1) + (player_local.getCoords(true).y), (player_local.getForwardVector().z * 1) + (player_local.getCoords(true).z));
                    markerUsarPalaJardineria = mp.markers.new(0, new mp.Vector3(posEnfrenteInt1.x, posEnfrenteInt1.y, (posEnfrenteInt1.z - 0.65)), 0.30,
                        {
                            color: [229, 57, 53, 255],
                            visible: true,
                            dimension: player_local.dimension
                        });
                }
            }, 10);
        }
    }

    menuUSAROBJ_PALA.ItemSelect.on((item, index) => {
        switch (item.Text)
        {
            case "Sembrar semilla":
                if (purga)
                {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ_PALA != null) menuUSAROBJ_PALA?.Close();
                }
                else
                {
                    // Obtenemos la posición para obtener el material, enfrente del personaje
                    let positionInt1 = player_local.getCoords(true);
                    let directionAuxInt1 = player_local.getForwardVector();
                    let endPositionInt1 = new mp.Vector3((directionAuxInt1.x * 1.1) + (positionInt1.x), (directionAuxInt1.y * 1.1) + (positionInt1.y), (directionAuxInt1.z * 1.1) + (positionInt1.z));
                    let raycastInt1 = mp.raycasting.testCapsule(new mp.Vector3(endPositionInt1.x, endPositionInt1.y, endPositionInt1.z + 1.0), new mp.Vector3(endPositionInt1.x, endPositionInt1.y, endPositionInt1.z - 1.6), 0.001, player_local, -1); // Colision con objetos
                    if (raycastInt1) // Ha tocado algo
                    {
                        let cercaDeOtraPlanta = false;

                        // Obtenemos los jugadores cerca
                        let jugsCerca = mp.players.toArray().filter((jug) => (calcDist(jug.position, new mp.Vector3(raycastInt1.position.x, raycastInt1.position.y, raycastInt1.position.z)) < distanciaPermitidaEntrePlantayPlanta && jug.dimension == 0));
                        // Obtenemos si está cerca de otra planta
                        for (let i = 0, n = plantas.length; i < n; i++) {
                            if (plantas[i].posicion) {
                                if (calcDist(plantas[i].posicion, raycastInt1.position) < distanciaPermitidaEntrePlantayPlanta) {
                                    cercaDeOtraPlanta = true;
                                }
                            }
                        }

                        if (player_local.isInWater() || player_local.isSwimming() || player_local.isSwimmingUnderWater()) mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        else if (semillasEnInventario.length <= 0) mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        else if (cercaDeOtraPlanta == true) mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        else if (jugsCerca.length > 1) mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        else if (obtenerTerrenoDeMaterial(raycastInt1.material).puedePlantar === false) mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        else {
                            // Borramos intervalo 1
                            if (intervalo_Int1 != null) {
                                clearInterval(intervalo_Int1);
                                intervalo_Int1 = null;
                            }

                            // Congelamos al tio para que eliga que semilla quiere plantar
                            player_local.freezePosition(true);
                            // Ocultamos el menu ya que no queremos que se vea
                            //menuUSAROBJ_PALA?.Close();  
                            menuUSAROBJ_PALA.setVisible(false);
                            menuUSAROBJ_PALA = null;

                            // Nos vamos a la funcion que te deja elegir la semilla y ejecutar el proceso de sembrarla
                            usarPalaJardineria(raycastInt1.position, semillasEnInventario, obtenerTerrenoDeMaterial(raycastInt1.material).nombreDeMaterial, obtenerTerrenoDeMaterial(raycastInt1.material).humedadPorDefecto, obtenerTerrenoDeMaterial(raycastInt1.material).fertilizantePorDefecto, obtenerTerrenoDeMaterial(raycastInt1.material).calidadDelTerrenoParaPlantar);
                        }

                        limpiarHandleRaycast(raycastInt1.entity);
                    }
                    else {
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    }
                }  
                break;

            default:
                break;
        }
    });

    menuUSAROBJ_PALA.MenuClose.on(item => {

        interactuandoConPlanta = false;

        // Borramos intervalo 1
        if (intervalo_Int1 != null)
        {
            clearInterval(intervalo_Int1);
            intervalo_Int1 = null;
        }
        // Borramos marker 1
        if (mp.markers.exists(markerUsarPalaJardineria)) markerUsarPalaJardineria.destroy();

        menuUSAROBJ_PALA = null;
    });
}

// MENU QUE SE ABRIRÁ AL TIRAR /USAR O TECLA ENTER EN ALGUNO DE LOS OBJETOS USADOS EN EL SISTEMA DE CULTIVOS
function menu_usar_objeto(nombreObjetoMano, tipoObjetoMano, cantidadObjetoMano, posicionObjetoCerca, nombreObjetoCerca, tipoObjetoCerca, SQLIDObjetoCerca, cantidadObjetoCerca) {

    // Si está nadando o buceando, no le permitiremos usar ningún objeto
    if (player_local.isSwimming() || player_local.isSwimmingUnderWater())
    {
        mostrarAviso("danger", 5000, "Este objeto no puede ser usado mientras nadas o buceas");
        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
        return;
    }

    // Variables que se usan unicamente en esta función
    let plantaId = null;
    let plantaPosicion = null;
    let plantaNivel = null;
    let plantaHongos = null;
    let plantaMuerta = null;
    let opcionRellenarEnSuperficieDeAgua = "";
    let opcionRellenarDeObjetoCerca = "";
    let frenteMesaDeMarihuana = false;
    // Variables declaradas fuera de esta función puestas a null
    usarObjeto_SQLIDObjCerca = null;

    // Si la purga esta desactivada, hacemos comprobaciones, si está activa nos evitamos hacerlas
    if (!purga)
    {
        // Comprobacion para saber si está cerca de una planta
        for (let planta of plantas) {
            if (planta.posicion) {
                if (calcDist(planta.posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                    plantaId = planta.id;
                    plantaPosicion = planta.posicion;
                    plantaNivel = planta.nivel;
                    plantaHongos = planta.hongos;
                    plantaMuerta = planta.muerta;
                }
            }
        }

        // Si está usando la tijera o tijera roja, comprobamos si está frente a una mesa de marihuana
        if (tipoObjetoMano == 879 || tipoObjetoMano == 942) {
            // Raycast para obtener si está frente a una mesa de marihuana
            let position = player_local.getCoords(true);
            let directionAux = player_local.getForwardVector();
            let endPosition = new mp.Vector3((directionAux.x * 0.4) + (position.x), (directionAux.y * 0.4) + (position.y), (directionAux.z * 0.4) + (position.z));

            let raycast = mp.raycasting.testCapsule(new mp.Vector3(endPosition.x, endPosition.y, (endPosition.z + 0.2)), new mp.Vector3(endPosition.x, endPosition.y, (endPosition.z - 0.5)), 0.01, player_local, 16); // Colision con objetos
            if (raycast) { // Ha tocado algo
                var entidad = raycast.entity;
                if (entidad && entidad != null) { // El resultado es válido
                    let tipo = entidad.type;
                    if (tipo != undefined && tipo != null) { // ENTIDAD RAGEMP
                        if (tipo == "object") {
                            switch (entidad.model) {
                                case 518749770: // Mesa de marihuana
                                    frenteMesaDeMarihuana = true;
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }

    switch (tipoObjetoMano) {

        /*
         *      REGAR / FERTILIZAR
         */
        case 571: // Regadera
            menuUSAROBJ = crearMenuConDistancia(0.5, "Regadera vacia", " ");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Podrás rellenarla de agua en una superficie acuática o estando cerca de una garrafa con agua o bidón con agua. Y de fertilizante estando cerca de un cubo con fertilizante o bidón con fertilizante"), "Amarillo"));
            if (purga)
            {
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "No puedes rellenar la regadera en una superficie de agua durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("No disponible durante la purga", "No puedes rellenar la regadera de un objeto cercano durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
            }
            else
            {
                if (tipoObjetoCerca == -1 && !player_local.isInWater()) {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "Necesitas estar sobre agua para poder rellenar la regadera"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca o un Cubo/Bidon con fertilizante cerca para rellenar la regadera"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    break;
                }

                if (tipoObjetoCerca == 1974 || tipoObjetoCerca == 2019 || player_local.isInWater()) // Rellenar agua
                {
                    if (player_local.isInWater()) {
                        opcionRellenarEnSuperficieDeAgua = "Regadera vacia";
                        menuUSAROBJ.AddItem(new UIMenuListItem("Rellenar en superficie de agua", "Rellenas la regadera con la cantidad de litros que selecciones", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"])));
                    }
                    else {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "Necesitas estar sobre agua para poder rellenar la regadera"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    if (tipoObjetoCerca == -1) {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca para rellenar la regadera"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    else {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Este objeto contiene 0 litros de agua, está vacio"), "Rojo");
                            USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca, + "");
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            opcionRellenarDeObjetoCerca = "Regadera vacia";
                            USAROBJOpcionItem = new UIMenuListItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Contiene " + cantidadObjetoCerca + " litros de agua", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]));
                            USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca + "");
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                    }
                    break;
                }

                if (tipoObjetoCerca == 577 || tipoObjetoCerca == 909) // Rellenar fertilizante
                {
                    if (tipoObjetoCerca == -1) {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con fertilizante cerca para rellenar la regadera"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    else {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Este objeto contiene 0 litros de fertilizante, está vacio"), "Rojo");
                            USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca, + "");
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            opcionRellenarDeObjetoCerca = "Regadera vacia";
                            USAROBJOpcionItem = new UIMenuListItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Contiene " + cantidadObjetoCerca + " litros de fertilizante", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]));
                            USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca + "");
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                    }
                    break;
                }
            }            
            break;

        case 2017: // Regadera con agua
            menuUSAROBJ = crearMenuConDistancia(0.5,"Regadera con agua", "Contiene " + cantidadObjetoMano + " litros de agua");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Podrás: 1.Regar una planta estando cerca de ella. 2.Rellenar del mismo contenido que tiene la regadera, de igual forma que se explica con la regadera vacía. 3.Vaciar el contenido de la regadera y obtener una regadera vacía"), "Amarillo"));
            if (purga)
            {
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "No puedes rellenar la regadera en una superficie de agua durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("No disponible durante la purga", "No puedes rellenar la regadera de un objeto cercano durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Regar planta", "No puedes regar una planta durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Vaciar regadera", "No puedes vaciar la regadera durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
            }
            else
            {
                // RELLENAR REGADERA
                if (tipoObjetoCerca == 1974 || tipoObjetoCerca == 2019 || player_local.isInWater()) // Rellenar agua
                {
                    if (player_local.isInWater()) {
                        opcionRellenarEnSuperficieDeAgua = "Regadera con agua";
                        if (cantidadObjetoMano >= 50) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "La regadera con agua ya está llena"), "Verde");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            menuUSAROBJ.AddItem(new UIMenuListItem("Rellenar en superficie de agua", "Rellenas la regadera con la cantidad de litros que selecciones", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"])));
                        }
                    }
                    else {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "Necesitas estar sobre agua para poder rellenar la regadera"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }

                    if (tipoObjetoCerca == -1) {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca para rellenar la regadera"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    else {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Este objeto contiene 0 litros de agua, está vacio"), "Rojo");
                            USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca, + "");
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            opcionRellenarDeObjetoCerca = "Regadera con agua";
                            if (cantidadObjetoMano >= 50) {
                                USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "La regadera con agua ya está llena"), "Verde");
                                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            } else {
                                USAROBJOpcionItem = new UIMenuListItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Contiene " + cantidadObjetoCerca + " litros de agua", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]));
                                USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca + "");
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            }
                        }
                    }
                } else {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "Necesitas estar sobre agua para poder rellenar la garrafa"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca para rellenar la garrafa"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }

                // REGAR CON REGADERA
                if (plantaPosicion != null && (calcDist(plantaPosicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2))) {
                    if (plantaMuerta) {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("Regar planta", "La planta está muerta, ¿para qué regarla?"), "Rojo");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    else
                        if (plantaNivel == 3) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Regar planta", "La planta ya está a nivel 3, no es necesario regarla"), "Verde");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                        else {
                            menuUSAROBJ.AddItem(new UIMenuListItem("Regar planta", "Riega la planta con la cantidad de litros que selecciones", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"])));
                        }
                }
                else {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Regar planta", "No estás cerca de ninguna planta como para poder regarla"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }

                // VACIAR REGADERA
                menuUSAROBJ.AddItem(new UIMenuItem("Vaciar regadera", "Vacia la regadera para poder rellenarla nuevamente"));
            }
            break;

        case 2018: // Regadera con fertiizante
            menuUSAROBJ = crearMenuConDistancia(0.5,"Regadera con fert..", "Contiene " + cantidadObjetoMano + " litros de fertilizante");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Podrás: 1.Fertilizar una planta estando cerca de ella. 2.Rellenar del mismo contenido que tiene la regadera, de igual forma que se explica con la regadera vacía. 3.Vaciar el contenido de la regadera y obtener una regadera vacía"), "Amarillo"));
            if (purga)
            {
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("No disponible durante la purga", "No puedes rellenar la regadera de un objeto cercano durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Fertilizar planta", "No puedes fertilizar una planta durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Vaciar regadera", "No puedes vaciar la regadera durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
            }
            else
            {
                // RELLENAR REGADERA
                if (tipoObjetoCerca == 577 || tipoObjetoCerca == 909) // Rellenar fertilizante
                {
                    if (tipoObjetoCerca == -1) {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca para rellenar la regadera"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    else {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Este objeto contiene 0 litros de fertilizante, está vacio"), "Rojo");
                            USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca, + "");
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            opcionRellenarDeObjetoCerca = "Regadera con fertilizante";
                            if (cantidadObjetoMano >= 50) {
                                USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "La regadera con fertilizante ya está llena"), "Verde");
                                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            } else {
                                USAROBJOpcionItem = new UIMenuListItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Contiene " + cantidadObjetoCerca + " litros de fertilizante", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]));
                                USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca + "");
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            }
                        }
                    }
                } else {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber un Cubo/Bidon con fertilizante cerca para rellenar la garrafa"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }

                // REGAR CON REGADERA
                if (plantaPosicion != null && (calcDist(plantaPosicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2))) {
                    if (plantaMuerta) {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("Fertilizar planta", "La planta está muerta, ¿para qué fertilizarla?"), "Rojo");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    else
                        if (plantaNivel == 3) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Fertilizar planta", "La planta ya está a nivel 3, no es necesario fertilizarla"), "Verde");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                        else {
                            menuUSAROBJ.AddItem(new UIMenuListItem("Fertilizar planta", "Fertiliza la planta con la cantidad de litros que selecciones", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"])));
                        }
                }
                else {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Fertilizar planta", "No estás cerca de ninguna planta como para poder fertilizarla"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }

                // VACIAR REGADERA
                menuUSAROBJ.AddItem(new UIMenuItem("Vaciar regadera", "Vacia la regadera para poder rellenarla nuevamente"));
            }
            break;

        /*
         *      PELAR
         */
        case 879: // Tijeras (Puede Pelar)
            menuUSAROBJ = crearMenuConDistancia(0.5,"Tijeras", " ");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Puedes pelar la planta de 2 formas. 1.Estando la planta en el suelo y tú cerca de ella. 2. Estando la planta encima de una mesa de marihuana y tú cerca de ella"), "Amarillo"));
            if (purga)
            {
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "No puedes pelar una planta en el suelo durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "No puedes pelar una planta en la mesa durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
            }
            else
            {
                if (tipoObjetoCerca == 1888) {
                    // Pelar en mesa
                    if (frenteMesaDeMarihuana) {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "La planta que estás intentando pelar tiene 0 gramos y no está en el suelo"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "La planta que estás intentando pelar tiene 0 gramos"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                        else {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "La planta que estás intentando pelar no está en el suelo"), "Naranja");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            menuUSAROBJ.AddItem(new UIMenuItem("Pelar en mesa", "Al pelar la planta con la ayuda de una mesa de marihuana, obtienes los " + cantidadObjetoCerca + " gramos de la plantaa"));
                        }
                    }
                    else // Pelar en suelo
                    {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "La planta que estás intentando pelar tiene 0 gramos"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "La planta que estás intentando pelar tiene 0 gramos y no está sobre una mesa de marihuana"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                        else {
                            menuUSAROBJ.AddItem(new UIMenuItem("Pelar en suelo", "Al pelar la planta sin ayuda de una mesa, obtienes la mitad de los gramos de la planta (" + (cantidadObjetoCerca == 1 ? 1 : (cantidadObjetoCerca / 2)) + " gramos)"));
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "La planta que estás intentando pelar no está sobre una mesa de marihuana o tú no estás lo suficiente cerca de la mesa"), "Naranja");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                    }
                }
                else {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "No estás cerca de ninguna planta que esté cortada en el suelo lista para pelar"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "No estás cerca de ninguna mesa de marihuana con una planta encima lista para pelar o tú no estás lo suficiente cerca de la mesa"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }
            }
            break;

        case 942: // Tijeras rojas (Puede Pelar)
            menuUSAROBJ = crearMenuConDistancia(0.5, "Tijeras", " ");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Puedes pelar la planta de 2 formas. 1.Estando la planta en el suelo y tú cerca de ella. 2. Estando la planta encima de una mesa de marihuana y tú cerca de ella"), "Amarillo"));
            if (purga)
            {
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "No puedes pelar una planta en el suelo durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "No puedes pelar una planta en la mesa durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
            }
            else
            {
                if (tipoObjetoCerca == 1888) {
                    // Pelar en mesa
                    if (frenteMesaDeMarihuana) {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "La planta que estás intentando pelar tiene 0 gramos y no está en el suelo"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "La planta que estás intentando pelar tiene 0 gramos"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                        else {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "La planta que estás intentando pelar no está en el suelo"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            menuUSAROBJ.AddItem(new UIMenuItem("Pelar en mesa", "Al pelar la planta con la ayuda de una mesa de marihuana, obtienes los " + cantidadObjetoCerca + " gramos de la planta"));
                        }
                    }
                    else // Pelar en suelo
                    {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "La planta que estás intentando pelar tiene 0 gramos"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "La planta que estás intentando pelar tiene 0 gramos y no está sobre una mesa de marihuana"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                        else {
                            menuUSAROBJ.AddItem(new UIMenuItem("Pelar en suelo", "Al pelar la planta sin ayuda de una mesa, obtienes la mitad de los gramos de la planta (" + (cantidadObjetoCerca == 1 ? 1 : (cantidadObjetoCerca / 2)) + " gramos)"));
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "La planta que estás intentando pelar no está sobre una mesa de marihuana"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                    }
                }
                else {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en suelo", "No estás cerca de ninguna planta que esté cortada en el suelo lista para pelar"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pelar en mesa", "No estás cerca de ninguna mesa de marihuana con una planta encima lista para pelar"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }
            }
            break;

        /*
         *      PULVERIZAR 
         */ 
        case 908: // Pulverizador (Puede Pulverizar)
            menuUSAROBJ = crearMenuConDistancia(0.5,"Pulverizador", "Le quedan " + cantidadObjetoMano + " usos");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Puedes pulverizar una planta estando cerca de la misma, si la planta no tiene hongos, no será necesario pulverizarla. (Cuando la planta tenga hongos, tendrá un aspecto blanco)"), "Amarillo"));
            if (purga)
            {
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "No puedes pulverizar una planta durante la purga, espera que termine el evento"), "Verde");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
            }
            else
            {
                if (cantidadObjetoMano <= 0) {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "El pulverizador que tienes en la mano tiene 0 usos, está acabado"), "Rojo");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }
                else {
                    if (plantaHongos == true) {
                        if (plantaMuerta) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "La planta está muerta, ¿para qué pulverizarla?"), "Rojo");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        }
                        else
                            if (plantaNivel == 3) {
                                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "La planta ya está a nivel 3, no es necesario pulverizarla"), "Verde");
                                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            }
                            else {
                                menuUSAROBJ.AddItem(new UIMenuItem("Pulverizar", "Pulveriza la planta para eliminar los hongos de ella"));
                            }
                    }
                    else {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("Pulverizar", "La planta no tiene hongos, por lo que no tiene que ser pulverizada"), "Verde");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                }  
            }  
            break;

        /*
         *      RELLENAR OBJETO
         */
        case 1974: // Garrafa con agua
            menuUSAROBJ = crearMenuConDistancia(0.5,"Garrafa con agua", "Contiene " + cantidadObjetoMano + " litros de agua");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Podras rellenar la regadera vacía y la regadera con agua estando cerca de este objeto, además este mismo objeto a su vez podrá ser rellenado de la misma forma de la que se rellena la regadera vacía"), "Amarillo"));
            if (purga)
            {
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "No puedes rellenar la garrafa en una superficie de agua durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("No disponible durante la purga", "No puedes rellenar la garrafa de un objeto cercano durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
            }
            else
            {
                if (tipoObjetoCerca == 1974 || tipoObjetoCerca == 2019 || player_local.isInWater()) // Rellenar agua
                {
                    if (player_local.isInWater()) {
                        opcionRellenarEnSuperficieDeAgua = "Garrafa con agua";
                        if (cantidadObjetoMano >= 50) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "La garrafa con agua ya está llena"), "Verde");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            menuUSAROBJ.AddItem(new UIMenuListItem("Rellenar en superficie de agua", "Rellenas la garrafa con la cantidad de litros que selecciones", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"])));
                        }
                    }
                    else {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "Necesitas estar sobre agua para poder rellenar la garrafa"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }

                    if (tipoObjetoCerca == -1) {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca para rellenar la garrafa"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    else {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Este objeto contiene 0 litros de agua, está vacio"), "Rojo");
                            USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca, + "");
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            opcionRellenarDeObjetoCerca = "Garrafa con agua";
                            if (cantidadObjetoMano >= 50) {
                                USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "La garrafa con agua ya está llena"), "Verde");
                                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            } else {
                                USAROBJOpcionItem = new UIMenuListItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Contiene " + cantidadObjetoCerca + " litros de agua", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]));
                                USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca + "");
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            }
                        }
                    }
                } else {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "Necesitas estar sobre agua para poder rellenar la garrafa"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca para rellenar la garrafa"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }
            }
            break;

        case 2019: // Bidon con agua
            menuUSAROBJ = crearMenuConDistancia(0.5,"Bidon con agua", "Contiene " + cantidadObjetoMano + " litros de agua");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Ayuda", "Podras rellenar la regadera vacía y la regadera con agua estando cerca de este objeto, además este mismo objeto a su vez podrá ser rellenado de la misma forma de la que se rellena la regadera vacía"), "Amarillo"));
            if (purga)
            {
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "No puedes rellenar el bidon en una superficie de agua durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                USAROBJOpcionItem = aplicarColores(new UIMenuItem("No disponible durante la purga", "No puedes rellenar el bidon de un objeto cercano durante la purga, espera que termine el evento"), "Rojo");
                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                menuUSAROBJ.AddItem(USAROBJOpcionItem);
            }
            else
            {
                if (tipoObjetoCerca == 1974 || tipoObjetoCerca == 2019 || player_local.isInWater()) // Rellenar agua
                {
                    if (player_local.isInWater()) {
                        opcionRellenarEnSuperficieDeAgua = "Bidon con agua";
                        if (cantidadObjetoMano >= 100) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "El bidon con agua ya está lleno"), "Verde");
                            USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            menuUSAROBJ.AddItem(new UIMenuListItem("Rellenar en superficie de agua", "Rellenas el bidon con la cantidad de litros que selecciones", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"])));
                        }
                    }
                    else {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "Necesitas estar sobre agua para poder rellenar el bidon"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }

                    if (tipoObjetoCerca == -1) {
                        USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca para rellenar el bidon"), "Naranja");
                        USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                        menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    }
                    else {
                        if (cantidadObjetoCerca <= 0) {
                            USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Este objeto contiene 0 litros de agua, está vacio"), "Rojo");
                            USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca, + "");
                            menuUSAROBJ.AddItem(USAROBJOpcionItem);
                        } else {
                            opcionRellenarDeObjetoCerca = "Bidon con agua";
                            if (cantidadObjetoMano >= 100) {
                                USAROBJOpcionItem = aplicarColores(new UIMenuItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "El bidon con agua ya está lleno"), "Verde");
                                USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            } else {
                                USAROBJOpcionItem = new UIMenuListItem("" + nombreObjetoCerca.substring(0, 27) + (nombreObjetoCerca.length > 27 ? "..." : ""), "Contiene " + cantidadObjetoCerca + " litros de agua", new ItemsCollection(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]));
                                USAROBJOpcionItem.SetRightLabel("ID: " + SQLIDObjetoCerca + "");
                                menuUSAROBJ.AddItem(USAROBJOpcionItem);
                            }

                        }
                    }
                } else {
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("Rellenar en superficie de agua", "Necesitas estar sobre agua para poder rellenar el bidon"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                    USAROBJOpcionItem = aplicarColores(new UIMenuItem("No hay ningún objeto cerca", "Debe haber una Garrafa/Bidon con agua cerca para rellenar el bidon"), "Naranja");
                    USAROBJOpcionItem.SetRightBadge(BadgeStyle.Lock);
                    menuUSAROBJ.AddItem(USAROBJOpcionItem);
                }
            }            
            break;

        default:
            menuUSAROBJ = crearMenuConDistancia(0.5,"ERROR 404", "");
            menuUSAROBJ.AddItem(aplicarColores(new UIMenuItem("Cerrar", "Oh, vaya, algo no ha ido bien. Le agradecemos que notifique que objeto has usado para que te salga ERROR 404"), "Rojo"));
            break;
    }

    menuUSAROBJ.ItemSelect.on((item, index) => {

        switch (item.Text) {
            /*
            *      RELLENAR EN SUPERFICIE AGUA
            */
            case "Rellenar en superficie de agua":
                if (purga)
                {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else
                {
                    if (player_local.isInWater()) {
                        if (item instanceof UIMenuListItem) {
                            switch (opcionRellenarEnSuperficieDeAgua) {
                                case "Regadera vacia":
                                    if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                        mostrarAviso("danger", 5000, "No puedes rellenar la regadera con " + parseInt(item.SelectedItem.DisplayText) + " litros de agua");
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) > 50) {
                                        mostrarAviso("danger", 5000, "La capacidad máxima de la regadera son 50 litros");
                                        return;
                                    }
                                    break;

                                case "Regadera con agua":
                                    if (cantidadObjetoMano >= 50) {
                                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                        mostrarAviso("danger", 5000, "No puedes rellenar la regadera con " + parseInt(item.SelectedItem.DisplayText) + " litros de agua");
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) > 50) {
                                        mostrarAviso("danger", 5000, "La capacidad máxima de la regadera son 50 litros");
                                        return;
                                    }
                                    break;

                                case "Garrafa con agua":
                                    if (cantidadObjetoMano >= 50) {
                                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                        mostrarAviso("danger", 5000, "No puedes rellenar la garrafa con " + parseInt(item.SelectedItem.DisplayText) + " litros de agua");
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) > 50) {
                                        mostrarAviso("danger", 5000, "La capacidad máxima de la garrafa con agua son 50 litros");
                                        return;
                                    }
                                    break;

                                case "Bidon con agua":
                                    if (cantidadObjetoMano >= 100) {
                                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                        mostrarAviso("danger", 5000, "No puedes rellenar el bidon con " + parseInt(item.SelectedItem.DisplayText) + " litros de agua");
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) > 100) {
                                        mostrarAviso("danger", 5000, "La capacidad máxima del bidon con agua son 100 litros");
                                        return;
                                    }
                                    break;
                            }

                            if (menuUSAROBJ != null) menuUSAROBJ?.Close();

                            mp.events.callRemote("cultivar:rellenar_agua", parseInt(item.SelectedItem.DisplayText), opcionRellenarEnSuperficieDeAgua);

                        } else {
                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        }
                    }
                    else {
                        if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                        mostrarAviso("danger", 5000, "No estás en ninguna superficie con agua");
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    }
                }   
                break;

            /*
            *      RELLENAR DE OBJETO CERCA
            */
            case "Garrafa con agua":
            case "Bidón con agua":
            case "Cubo con fertilizante":
            case "Bidón con fertilizante":
                if (purga)
                {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else
                {
                    if (calcDist(posicionObjetoCerca, player_local.position) > 2) // Comprobamos que esté cerca del objeto del que quiere rellenar la regadera
                    {
                        mostrarAviso("danger", 8000, "Debes estar a menos de 2 metros de el/la " + item.Text + " para rellenar la regadera");
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        return;
                    }
                    else // Si está a menos de 2 metros...
                    {
                        // Vemos si la cantidad del objeto es 0 o mayor a 0
                        if (cantidadObjetoCerca <= 0)
                        {
                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        }
                        else
                        {
                            usarObjeto_SQLIDObjCerca = SQLIDObjetoCerca;

                            if (usarObjeto_SQLIDObjCerca != null)
                            {
                                switch (opcionRellenarDeObjetoCerca) {
                                    case "Regadera vacia":
                                        if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                            mostrarAviso("danger", 5000, "Imposible rellenar la regadera con " + parseInt(item.SelectedItem.DisplayText) + " litros");
                                            return;
                                        }
                                        if (parseInt(item.SelectedItem.DisplayText) > 50) {
                                            mostrarAviso("danger", 5000, "La capacidad máxima de la regadera son 50 litros");
                                            return;
                                        }

                                        let restorio1 = cantidadObjetoCerca - parseInt(item.SelectedItem.DisplayText);
                                        if (restorio1 <= -1) {
                                            mostrarAviso("danger", 5000, "No puedes rellenar la regadera con " + parseInt(item.SelectedItem.DisplayText) + " litros si el objeto cercano solo tiene " + cantidadObjetoCerca + " litros");
                                            return;
                                        }
                                        break;

                                    case "Regadera con agua":
                                        if (cantidadObjetoMano >= 50) {
                                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                            return;
                                        }

                                        if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                            mostrarAviso("danger", 5000, "Imposible rellenar la regadera con " + parseInt(item.SelectedItem.DisplayText) + " litros");
                                            return;
                                        }
                                        if (parseInt(item.SelectedItem.DisplayText) > 50) {
                                            mostrarAviso("danger", 5000, "La capacidad máxima de la regadera con agua son 50 litros");
                                            return;
                                        }

                                        let restorio2 = cantidadObjetoCerca - parseInt(item.SelectedItem.DisplayText);
                                        if (restorio2 <= -1) {
                                            mostrarAviso("danger", 5000, "No puedes rellenar la regadera con " + parseInt(item.SelectedItem.DisplayText) + " litros si el objeto cercano solo tiene " + cantidadObjetoCerca + " litros");
                                            return;
                                        }
                                        break;

                                    case "Regadera con fertilizante":
                                        if (cantidadObjetoMano >= 50) {
                                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                            return;
                                        }

                                        if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                            mostrarAviso("danger", 5000, "Imposible rellenar la regadera con " + parseInt(item.SelectedItem.DisplayText) + " litros");
                                            return;
                                        }
                                        if (parseInt(item.SelectedItem.DisplayText) > 50) {
                                            mostrarAviso("danger", 5000, "La capacidad máxima de la regadera con fertilizante son 50 litros");
                                            return;
                                        }

                                        let restorio3 = cantidadObjetoCerca - parseInt(item.SelectedItem.DisplayText);
                                        if (restorio3 <= -1) {
                                            mostrarAviso("danger", 5000, "No puedes rellenar la regadera con " + parseInt(item.SelectedItem.DisplayText) + " litros si el objeto cercano solo tiene " + cantidadObjetoCerca + " litros");
                                            return;
                                        }
                                        break;

                                    case "Garrafa con agua":
                                        if (cantidadObjetoMano >= 50) {
                                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                            return;
                                        }

                                        if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                            mostrarAviso("danger", 5000, "Imposible rellenar la garrafa con " + parseInt(item.SelectedItem.DisplayText) + " litros");
                                            return;
                                        }
                                        if (parseInt(item.SelectedItem.DisplayText) > 50) {
                                            mostrarAviso("danger", 5000, "La capacidad máxima de la garrafa con agua son 50 litros");
                                            return;
                                        }

                                        let restorio4 = cantidadObjetoCerca - parseInt(item.SelectedItem.DisplayText);
                                        if (restorio4 <= -1) {
                                            mostrarAviso("danger", 5000, "No puedes rellenar la garrafa con " + parseInt(item.SelectedItem.DisplayText) + " litros si el objeto cercano solo tiene " + cantidadObjetoCerca + " litros");
                                            return;
                                        }
                                        break;

                                    case "Bidon con agua":
                                        if (cantidadObjetoMano >= 100) {
                                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                            return;
                                        }

                                        if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                            mostrarAviso("danger", 5000, "Imposible rellenar el bidon con " + parseInt(item.SelectedItem.DisplayText) + " litros");
                                            return;
                                        }
                                        if (parseInt(item.SelectedItem.DisplayText) > 100) {
                                            mostrarAviso("danger", 5000, "La capacidad máxima del bidon con agua son 100 litros");
                                            return;
                                        }

                                        let restorio5 = cantidadObjetoCerca - parseInt(item.SelectedItem.DisplayText);
                                        if (restorio5 <= -1) {
                                            mostrarAviso("danger", 5000, "No puedes rellenar el bidon con " + parseInt(item.SelectedItem.DisplayText) + " litros si el objeto cercano solo tiene " + cantidadObjetoCerca + " litros");
                                            return;
                                        }
                                        break;
                                }

                                if (menuUSAROBJ != null) menuUSAROBJ?.Close();

                                mp.events.callRemote("cultivar:rellenar_objeto_de_objetoCerca", parseInt(item.SelectedItem.DisplayText), usarObjeto_SQLIDObjCerca, opcionRellenarDeObjetoCerca);
                            }
                            else {
                                if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                                mostrarAviso("danger", 5000, "Algo no ha ido bien, vuelve a intentarlo");
                            }
                        }
                    }
                }  
                break;

            /*
             *      VACIAR REGADERA
             */
            case "Vaciar regadera":
                if (purga)
                {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else
                {
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                    mp.events.callRemote("cultivar:vaciarRegadera");  
                }          
                break;

            /*
            *      REGAR
            */
            case "Regar planta": // Regar - Regadera
                if (purga) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else {
                    if (plantaPosicion != null && calcDist(plantaPosicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {

                        if (plantaMuerta) {
                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        }
                        else
                            if (plantaNivel == 3) {
                                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                            }
                            else {
                                if (item instanceof UIMenuListItem) {

                                    let objetoManoRegarPlanta = obtenerObjetoMano();

                                    if (objetoManoRegarPlanta == null) {
                                        if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                                        mostrarAviso("danger", 5000, "No puedes regar sin una regadera en la mano");
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                        mostrarAviso("danger", 5000, "No puedes regar con " + parseInt(item.SelectedItem.DisplayText) + "l");
                                        return;
                                    }

                                    let objetoCantidadEnManoRegarPlanta = (objetoManoRegarPlanta != null ? objetoManoRegarPlanta.cantidad : -1);

                                    if (parseInt(item.SelectedItem.DisplayText) > objetoCantidadEnManoRegarPlanta) {
                                        mostrarAviso("danger", 5000, "No puedes regar con " + parseInt(item.SelectedItem.DisplayText) + "l si la regadera solo tiene " + objetoCantidadEnManoRegarPlanta + "l");
                                        return;
                                    }

                                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();

                                    let plantaCercaId = null;
                                    let plantaCercaPosicion = null;

                                    for (let planta of plantas) {
                                        if (planta.posicion) {
                                            if (calcDist(planta.posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                                                plantaCercaId = planta.id;
                                                plantaCercaPosicion = planta.posicion;
                                            }
                                        }
                                    }

                                    if ((plantaCercaId != null) && (plantaCercaPosicion != null)) {
                                        interactuandoConPlanta = true;
                                        //mp.events.callRemote("cultivar:ejecutar_animacion", flagRegarPlanta, animLibreriaRegarPlanta, animAnimacionRegarPlanta, -1);
                                        mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaRegarPlanta, animAnimacionRegarPlanta, 5, 5, -1, flagRegarPlanta);

                                        crearTimeout(function () {
                                            progresoRegarPlanta(parseInt(item.SelectedItem.DisplayText), plantaCercaId, plantaCercaPosicion);
                                        }, 500);
                                    } else {
                                        mostrarAviso("danger", 5000, "No estás cerca de ninguna planta");
                                        return;
                                    }
                                }
                                else {
                                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                }
                            }
                    }
                    else {
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        mostrarAviso("danger", 8000, "No estás cerca de ninguna planta");
                        return;
                    }
                }  
                break;

            /*
            *      FERTILIZAR
            */
            case "Fertilizar planta": // Fertilizar - Cubo con fertilizante y Bidon de fertilizante
                if (purga) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else {
                    if (plantaPosicion != null && calcDist(plantaPosicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {

                        if (plantaMuerta) {
                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        }
                        else
                            if (plantaNivel == 3) {
                                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                            }
                            else {
                                if (item instanceof UIMenuListItem) {

                                    let objetoManoFertilizarPlanta = obtenerObjetoMano();

                                    if (objetoManoFertilizarPlanta == null) {
                                        mostrarAviso("danger", 5000, "No puedes fertilizar sin una regadera en la mano");
                                        return;
                                    }

                                    if (parseInt(item.SelectedItem.DisplayText) <= 0) {
                                        mostrarAviso("danger", 5000, "No puedes fertilizar con " + parseInt(item.SelectedItem.DisplayText) + "l");
                                        return;
                                    }

                                    let objetoCantidadEnManoFertilizarPlanta = (objetoManoFertilizarPlanta != null ? objetoManoFertilizarPlanta.cantidad : -1);

                                    if (parseInt(item.SelectedItem.DisplayText) > objetoCantidadEnManoFertilizarPlanta) {
                                        mostrarAviso("danger", 5000, "No puedes fertilizar con " + parseInt(item.SelectedItem.DisplayText) + "l si la regadera solo tiene " + objetoCantidadEnManoFertilizarPlanta + "l");
                                        return;
                                    }

                                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();

                                    let plantaCercaId = null;
                                    let plantaCercaPosicion = null;

                                    for (let planta of plantas) {
                                        if (planta.posicion) {
                                            if (calcDist(planta.posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                                                plantaCercaId = planta.id;
                                                plantaCercaPosicion = planta.posicion;
                                            }
                                        }
                                    }

                                    if ((plantaCercaId != null) && (plantaCercaPosicion != null)) {
                                        interactuandoConPlanta = true;
                                        mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaFertilizarPlanta, animAnimacionFertilizarPlanta, 5, 5, -1, flagFertilizarPlanta);

                                        crearTimeout(function () {
                                            progresoFertilizarPlanta(parseInt(item.SelectedItem.DisplayText), plantaCercaId, plantaCercaPosicion);
                                        }, 500);
                                    } else {
                                        mostrarAviso("danger", 5000, "No estás cerca de ninguna planta");
                                        return;
                                    }
                                } else {
                                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                }
                            }
                    }
                    else {
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        mostrarAviso("danger", 8000, "No estás cerca de ninguna planta");
                        return;
                    }
                }   
                break;

            /*
             *      PELAR 
             */
            case "Pelar en suelo":
                if (purga) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else {
                    if (tipoObjetoCerca == 1888 && calcDist(posicionObjetoCerca, player_local.position) < 2) {
                        if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                        menu_confirmar("pelar en suelo", cantidadObjetoCerca, SQLIDObjetoCerca);
                    }
                    else {
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        mostrarAviso("danger", 8000, "No estás cerca de ningun objeto Planta marihuana grande cogollos que esté en el suelo");
                    }
                }      
                break;
            case "Pelar en mesa":
                if (purga) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else {
                    if (tipoObjetoCerca == 1888 && calcDist(posicionObjetoCerca, player_local.position) < 2) {
                        if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                        menu_confirmar("pelar en mesa", cantidadObjetoCerca, SQLIDObjetoCerca);
                    }
                    else {
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        mostrarAviso("danger", 8000, "No estás cerca de ningun objeto Planta marihuana grande cogollos que esté sobre una mesa de marihuana");
                    }
                }      
                break;

            /*
            *      CORTAR
            */
            case "Cortar":
                if (purga) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else {
                    if (plantaNivel == 3) {
                        if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                        menu_confirmar("cortar", -1);
                    }
                    else {
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    }
                }
                break;

            /*
            *      PULVERIZAR
            */
            case "Pulverizar": // Si tiene hongos le permitimos pulverizar, si no tiene, le ponemos un sonidito guapi de error
                if (purga) {
                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    mostrarAviso("danger", 5000, "No disponible durante la purga, espera a que termine el evento");
                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                }
                else {
                    if (cantidadObjetoMano <= 0) {
                        mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    }
                    else {
                        if (plantaHongos == true) {
                            if (plantaMuerta) {
                                mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                            }
                            else {
                                if (plantaNivel == 3) {
                                    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                                }
                                else {
                                    if (menuUSAROBJ != null) menuUSAROBJ?.Close();
                                    mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaPulverizarPlanta, animAnimacionPulverizarPlanta, 5, 5, -1, flagPulverizarPlanta);

                                    interactuandoConPlanta = true;
                                    let int = crearTimeout(() => {
                                        clearTimeout(int);
                                        int = null;
                                        progresoPulverizarPlanta(plantaId);

                                    }, 500);
                                }
                            }
                        }
                        else {
                            mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                        }
                    }
                }          
                break;

            case "Cerrar":
                menuUSAROBJ?.Close();
                break;

            default:
                break;
        }
    });

    menuUSAROBJ.MenuClose.on(item => {
        menu_con_distancia = null;
        menuUSAROBJ = null;
    });
}

// MENU PARA CONFIRMACIONES, USADOS EN VARIOS CASOS PARA CONFIRMAR ALGUNA ACCION IMPORTANTE
function menu_confirmar(accion, cantidadObjeto, SQLIDObjetoCerca) {

    let planta_Id = null;
    let plantaPosicion = null;

    for (let planta of plantas) {
        if (planta.posicion) {
            if (calcDist(planta.posicion, player_local.position) < (distanciaPermitidaEntrePlantayPlanta / 2)) {
                planta_Id = planta.id;
                plantaPosicion = planta.posicion;
            }
        }
    }

    menuCONFIRMAR = crearMenuConDistancia(0.5, "Confirmación", " ");
    switch (accion) {
        case "cortar":
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Confirmar", "Confirmarás cortar la planta, una vez confirmado, no podrás volver atras"), "Verde"));
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Cancelar", "Cancelas cortar la planta. La planta seguirá plantada"), "Rojo"));
            break;
        case "arrancar":
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Confirmar", "Confirmarás arrancar la planta, una vez confirmado, no podrás volver atras"), "Verde"));
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Cancelar", "Cancelas arrancar la planta. La planta seguirá plantada"), "Rojo"));
            break;
        case "quitar_semilla":
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Confirmar", "Confirmarás quitar la semilla, una vez confirmado, no podrás volver atras"), "Verde"));
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Cancelar", "Cancelas quitar la semilla. La semilla seguirá plantada"), "Rojo"));
            break;
        case "pelar en suelo":
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Confirmar", "Confirmarás pelar la planta con tijeras y obtener " + (cantidadObjeto == 1 ? 1 : (cantidadObjeto / 2)) + " gramos, una vez confirmado, no podrás volver atras"), "Verde"));
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Cancelar", "Cancelas el pelar la planta"), "Rojo"));
            break;
        case "pelar en mesa":
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Confirmar", "Confirmarás pelar la planta en la mesa y obtener " + cantidadObjeto + " gramos, una vez confirmado, no podrás volver atras"), "Verde"));
            menuCONFIRMAR.AddItem(aplicarColores(new UIMenuItem("Cancelar", "Cancelas el pelar la planta"), "Rojo"));
            break;
    }

    menuCONFIRMAR.ItemSelect.on((item, index) => {
        if (menuCONFIRMAR != null) menuCONFIRMAR?.Close();

        switch (index) {
            case 0: // CONFIRMAR
                if (accion == "cortar") {
                    mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaCortarPlanta, animAnimacionCortarPlanta, 5, 5, -1, flagCortarPlanta);
                    interactuandoConPlanta = true;
                    if (menuCONFIRMAR != null) menuCONFIRMAR?.Close();
                    let int = crearTimeout(() => {
                        clearTimeout(int);
                        int = null;
                        progresoCortarPlanta(planta_Id, plantaPosicion);
                    }, 500);
                    return;
                }
                if (accion == "arrancar") {
                    mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaArrancarPlanta, animAnimacionArrancarPlanta, 5, 5, -1, flagArrancarPlanta);
                    interactuandoConPlanta = true;
                    if (menuCONFIRMAR != null) menuCONFIRMAR?.Close();
                    let int = crearTimeout(() => {
                        clearTimeout(int);
                        int = null;
                        progresoArrancarPlanta(planta_Id, plantaPosicion);
                    }, 500);
                    return;
                }
                if (accion == "quitar_semilla") {
                    mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaQuitarSemilla, animAnimacionQuitarSemilla, 5, 5, -1, flagQuitarSemilla);
                    interactuandoConPlanta = true;
                    if (menuCONFIRMAR != null) menuCONFIRMAR?.Close();
                    let int = crearTimeout(() => {
                        clearTimeout(int);
                        int = null;
                        progresoQuitarSemilla(planta_Id, plantaPosicion);
                    }, 500);
                    return;
                }
                if (accion == "pelar en suelo") {
                    mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaPelarEnSueloPlantaConTijeras, animAnimacionPelarEnSueloPlantaConTijeras, 5, 5, -1, flagPelarEnSueloPlantaConTijeras);
                    interactuandoConPlanta = true;
                    if (menuCONFIRMAR != null) menuCONFIRMAR?.Close();
                    let int = crearTimeout(() => {
                        clearTimeout(int);
                        int = null;
                        progresoPelarEnSueloPlantaConTijeras((cantidadObjeto == 1 ? 1 : (cantidadObjeto / 2)), SQLIDObjetoCerca);
                    }, 500);
                    return;
                }
                if (accion == "pelar en mesa") {
                    mp.events.callRemote("aplicar_animacion_sincronizada", animLibreriaPelarEnMesaPlantaConTijeras, animAnimacionPelarEnMesaPlantaConTijeras, 5, 5, -1, flagPelarEnMesaPlantaConTijeras);
                    interactuandoConPlanta = true;
                    if (menuCONFIRMAR != null) menuCONFIRMAR?.Close();
                    let int = crearTimeout(() => {
                        clearTimeout(int);
                        int = null;
                        progresoPelarEnMesaPlantaConTijeras(cantidadObjeto, SQLIDObjetoCerca);
                    }, 500);
                    return;
                }
                break;
            case 1: // CANCELAR
                break;
        }
    });

    menuCONFIRMAR.MenuClose.on(item => {
        menu_con_distancia = null;
        menuCONFIRMAR = null;
    });
}

//----------------------------------------------------------------------------- PARTICULAS DEL SISTEMA DE CULTIVOS ---------------------------------------------------------------------------------//

/*
 *      VARIABLES PARA LAS PARTICULAS DE LA REGADERA Y SINCRONIZARLAS
 */
let intDistanciaRegadera = null; // Intervalo para destruir particulas cuando ya estamos demasiado lejos de ellas (en ese caso ya no recibimos el evento en rango para pararlas)
let fxRegadera = null; // Efecto de particula local
let efectosSyncRegadera = []; // Array de particulas sincronizadas de la regadera {id: sqlid_personaje, fx: particula, pos: posicion}

let intDistanciaPulverizador = null; // Intervalo para destruir particulas cuando ya estamos demasiado lejos de ellas (en ese caso ya no recibimos el evento en rango para pararlas)
let fxPulverizador = null; // Efecto de particula local
let efectosSyncPulverizador = []; // Array de particulas sincronizadas del pulverizador {id: sqlid_personaje, fx: particula, pos: posicion}

// Funcion para crear/borrar la particula local y enviar el evento para sincronizarla en rango
async function particulaRegadera(crear) {
    if (crear == true) {
        if (particula_regadera != null && typeof particula_regadera.handle === "number") { // Si tiene la regadera en la mano y la particula no existe la creamos. Si la particula existe actualizamos la rotacion
            if (fxRegadera == null || mp.game.graphics.doesParticleFxLoopedExist(fxRegadera) == false) {
                if (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_mp_house")) {
                    mp.game.streaming.requestNamedPtfxAsset("scr_mp_house");
                    while (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_mp_house")) {
                        await mp.game.waitAsync(0);
                    }
                }

                mp.game.graphics.setPtfxAssetNextCall("scr_mp_house");
                fxRegadera = mp.game.graphics.startParticleFxLoopedOnEntity2("ent_amb_shower", particula_regadera.handle, 0.35, 0.0, 0.2, -30.0, -30.0, -90.0, 1, false, false, false);

                mp.events.callRemote("regadera:particle", true);
            }
        }
    }
    else {
        if (fxRegadera != null && mp.game.graphics.doesParticleFxLoopedExist(fxRegadera) == true) {
            mp.events.callRemote("regadera:particle", false);
            mp.game.graphics.stopParticleFxLooped(fxRegadera, false);
            fxRegadera = null;
        }
    }
}

/**
 * Evento para sincronizar las particulas, bool indica si se crea o destruye la particula
 * 
 * Bool --> Indica si crear o borrar la particula
 * sqlidpj --> Usada para enlazar la persona "propietaria" de la particula con su particula y posicion
 */
mp.events.add('regadera:particle', async function (player, bool, sqlidPj = -1) {
    let sqlid = sqlidPj;
    if (sqlid != -1 && player != player_local && player != undefined && player != null) {
        if (bool == true) { // Crear -> Obtenemos la entidad de la regadera que tiene en la mano, creamos y guardamos la particula
            if (player.objetos[91] != undefined) { // Comprobamos que tiene el objeto de la regadera en la mano
                let regadera = player.objetos[91].objeto;
                if (regadera != undefined && regadera != null && mp.objects.exists(regadera) && regadera.model == 2650016819) {
                    let efecto = null;
                    for (let i = 0, n = efectosSyncRegadera.length; i < n; i++) {
                        if (efectosSyncRegadera[i].id == sqlid) { // Si es el jugador que acabamos de recibir
                            efecto = efectosSyncRegadera[i].fx;
                            break;
                        }
                    }

                    // Si el jugador ya tiene la particula activa la paramos
                    if (efecto != null && mp.game.graphics.doesParticleFxLoopedExist(efecto) == true) {
                        mp.game.graphics.stopParticleFxLooped(efecto, false);
                    }

                    // Cargamos y creamos la particula
                    if (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_mp_house")) {
                        mp.game.streaming.requestNamedPtfxAsset("scr_mp_house");
                        while (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_mp_house")) {
                            await mp.game.waitAsync(0);
                        }
                    }

                    mp.game.graphics.setPtfxAssetNextCall("scr_mp_house");
                    let particula = mp.game.graphics.startParticleFxLoopedOnEntity2("ent_amb_shower", regadera.handle, 0.35, 0.0, 0.2, -30.0, -30.0, -90.0, 1, false, false, false);

                    // Si el intervalo de distancias no existe lo creamos
                    if (intDistanciaRegadera == null) {
                        intDistanciaRegadera = setInterval(() => {
                            if (efectosSyncRegadera != undefined && efectosSyncRegadera != null && efectosSyncRegadera.length > 0) {
                                let posicion = player_local.position;
                                for (let i = efectosSyncRegadera.length - 1; i >= 0; i--) {
                                    // Si la particula está a más de 150.0 y está activa la paramos y borramos de la lista
                                    if (calcDist(posicion, efectosSyncRegadera[i].pos) > 150.0) {
                                        let particula = efectosSyncRegadera[i].fx;
                                        if (particula != null && mp.game.graphics.doesParticleFxLoopedExist(particula) == true) {
                                            mp.game.graphics.stopParticleFxLooped(particula, false);
                                            particula = null;
                                        }
                                        efectosSyncRegadera.splice(i, 1);
                                    }
                                }

                                // Si tras borrar algun efecto sincronizado no quedan más, paramos el intervalo
                                if (efectosSyncRegadera.length <= 0) {
                                    clearInterval(intDistanciaRegadera);
                                    intDistanciaRegadera = null;
                                }
                            }
                            else {
                                clearInterval(intDistanciaRegadera);
                                intDistanciaRegadera = null;
                            }
                        }, 5000);
                    }

                    // La añadimos al array de creadas
                    efectosSyncRegadera.push({ id: sqlid, fx: particula, pos: player.position });
                }
            }
        }
        else { // BORRAR
            for (let i = 0, n = efectosSyncRegadera.length; i < n; i++) {
                if (efectosSyncRegadera[i].id == sqlid) { // Si es el jugador que acabamos de recibir
                    let particula = efectosSyncRegadera[i].fx;
                    // Si el jugador tiene la particula activa la paramos
                    if (particula != null && mp.game.graphics.doesParticleFxLoopedExist(particula) == true) {
                        mp.game.graphics.stopParticleFxLooped(particula, false);
                        particula = null;
                    }
                    efectosSyncRegadera.splice(i, 1);
                    break;
                }
            }

            // Si tras borrar un efecto sincronizado no quedan más y el intervalo de distancias sigue activo lo paramos
            if (efectosSyncRegadera.length <= 0) {
                if (intDistanciaRegadera != null) {
                    clearInterval(intDistanciaRegadera);
                    intDistanciaRegadera = null;
                }
            }
        }
    }
});

// Funcion para crear/borrar la particula local y enviar el evento para sincronizarla en rango
async function particulaPulverizador(crear) {
    if (crear == true) {
        if (particula_pulverizador != null && typeof particula_pulverizador.handle === "number") { // Si tiene el pulverizador en la mano y la particula no existe la creamos. Si la particula existe actualizamos la rotacion
            if (fxPulverizador == null || mp.game.graphics.doesParticleFxLoopedExist(fxPulverizador) == false) {
                if (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_playerlamgraff")) {
                    mp.game.streaming.requestNamedPtfxAsset("scr_playerlamgraff");
                    while (!mp.game.streaming.hasNamedPtfxAssetLoaded("scr_playerlamgraff")) {
                        await mp.game.waitAsync(0);
                    }
                }

                mp.game.graphics.setPtfxAssetNextCall("scr_playerlamgraff");
                fxPulverizador = mp.game.graphics.startParticleFxLoopedOnEntity2("scr_lamgraff_paint_spray", particula_pulverizador.handle, 0.0, 0.0, 0.015, 0.0, 0.0, 90.0, 1.0, false, false, false);

                mp.events.callRemote("pulverizador:particle", true);
            }
        }
    }
    else {
        if (fxPulverizador != null && mp.game.graphics.doesParticleFxLoopedExist(fxPulverizador) == true) {
            mp.events.callRemote("pulverizador:particle", false);
            mp.game.graphics.stopParticleFxLooped(fxPulverizador, false);
            fxPulverizador = null;
        }
    }
}

/**
 * Evento para sincronizar las particulas, bool indica si se crea o destruye la particula
 * 
 * Bool --> Indica si crear o borrar la particula
 * sqlidpj --> Usada para enlazar la persona "propietaria" de la particula con su particula y posicion
 */
mp.events.add('pulverizador:particle', async function (player, bool, sqlidPj = -1) {
    let sqlid = sqlidPj;
    if (sqlid != -1 && player != player_local && player != undefined && player != null) {
        if (bool == true) { // Crear -> Obtenemos la entidad del pulverizador que tiene en la mano, creamos y guardamos la particula
            if (player.objetos[91] != undefined) { // Comprobamos que tiene el objeto del pulverizador en la mano
                let pulverizador = player.objetos[91].objeto;
                if (pulverizador != undefined && pulverizador != null && mp.objects.exists(pulverizador) && pulverizador.model == 2695654019) {
                    let efecto = null;
                    for (let i = 0, n = efectosSyncPulverizador.length; i < n; i++) {
                        if (efectosSyncPulverizador[i].id == sqlid) { // Si es el jugador que acabamos de recibir
                            efecto = efectosSyncPulverizador[i].fx;
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
                    let particula = mp.game.graphics.startParticleFxLoopedOnEntity2("scr_lamgraff_paint_spray", pulverizador.handle, 0.0, 0.0, 0.015, 0.0, 0.0, 90.0, 1.0, false, false, false);

                    // Si el intervalo de distancias no existe lo creamos
                    if (intDistanciaPulverizador == null) {
                        intDistanciaPulverizador = setInterval(() => {
                            if (efectosSyncPulverizador != undefined && efectosSyncPulverizador != null && efectosSyncPulverizador.length > 0) {
                                let posicion = player_local.position;
                                for (let i = efectosSyncPulverizador.length - 1; i >= 0; i--) {
                                    // Si la particula está a más de 150.0 y está activa la paramos y borramos de la lista
                                    if (calcDist(posicion, efectosSyncPulverizador[i].pos) > 150.0) {
                                        let particula = efectosSyncPulverizador[i].fx;
                                        if (particula != null && mp.game.graphics.doesParticleFxLoopedExist(particula) == true) {
                                            mp.game.graphics.stopParticleFxLooped(particula, false);
                                            particula = null;
                                        }
                                        efectosSyncPulverizador.splice(i, 1);
                                    }
                                }

                                // Si tras borrar algun efecto sincronizado no quedan más, paramos el intervalo
                                if (efectosSyncPulverizador.length <= 0) {
                                    clearInterval(intDistanciaPulverizador);
                                    intDistanciaPulverizador = null;
                                }
                            }
                            else {
                                clearInterval(intDistanciaPulverizador);
                                intDistanciaPulverizador = null;
                            }
                        }, 5000);
                    }

                    // La añadimos al array de creadas
                    efectosSyncPulverizador.push({ id: sqlid, fx: particula, pos: player.position });
                }
            }
        }
        else { // BORRAR
            for (let i = 0, n = efectosSyncPulverizador.length; i < n; i++) {
                if (efectosSyncPulverizador[i].id == sqlid) { // Si es el jugador que acabamos de recibir
                    let particula = efectosSyncPulverizador[i].fx;
                    // Si el jugador tiene la particula activa la paramos
                    if (particula != null && mp.game.graphics.doesParticleFxLoopedExist(particula) == true) {
                        mp.game.graphics.stopParticleFxLooped(particula, false);
                        particula = null;
                    }
                    efectosSyncPulverizador.splice(i, 1);
                    break;
                }
            }

            // Si tras borrar un efecto sincronizado no quedan más y el intervalo de distancias sigue activo lo paramos
            if (efectosSyncPulverizador.length <= 0) {
                if (intDistanciaPulverizador != null) {
                    clearInterval(intDistanciaPulverizador);
                    intDistanciaPulverizador = null;
                }
            }
        }
    }
});

/* ---------------------------------------------------------------------------BASURA QUE ME SERVIRÁ PARA ALGO EN OTRO MOMENTO-------------------------------------------------------------------------- */
}