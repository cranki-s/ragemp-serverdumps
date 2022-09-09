{
/**
 * hud.js
 * 
 * Contiene el controlador del HUD, la actualizacion de sus datos y su mostrado en el Cef
 * 
 * Dries
 */

var cef_hud = require("./LURP/cef.js");

var hud_cefId = -1;
var loading_cefId = -1;

var zona, calle, direccion = "";
var marcador = null;
var blipRuta = null;
var dinero = 0;
var dinero_banco = 0;
var gasolina = 0;
var gasolina_iniciales = 0;
var kilometros = 0;
var kilometros_iniciales = 0;
var kilometros_posicion = 0;
var distancia_recorrida = 0;
var intervalo_hud = null;
var tiempoIntervaloHud = 200;
var intervalo_gasolina = null;
var tiempoIntervaloGasolina = 45000;

var intervalo_kilometros = null;
var tiempoIntervaloKilometros = 1000;

var hudOculto = false;
var coche = false;
var arma = false;

var chunksCodigoEsperados = 0;
var codigoClienteRecibido = "";
var chunksCodigoRecibidos = 0;

var vehiculo_jugador = null;
var vehiculo_jugador_asiento = null;
var vida_vehiculo_jugador = 0;

var logrosMostradosActuales = [];

mp.events.add({
    "hud:purga_inicio": () => {
        cef_hud.ejecutarCef(hud_cefId, `showPurga()`);
    },
    "hud:purga_fin": () => {
        cef_hud.ejecutarCef(hud_cefId, `hidePurga()`);
    },
    "hud:cerrar_aviso_fijo": () => {
        cef_hud.ejecutarCef(hud_cefId, `hideFixedText()`);
    },
    "hud:ocultar_aviso_grande": () => {
        cef_hud.ejecutarCef(hud_cefId, `hideBigNoty()`);
    },
    "mostrar_trato": (array) => {
        let trato_array = JSON.parse(array);
        let titulo = trato_array[0];
        let mensaje = trato_array[1];

        let mensajeCompleto = "<h3>" + titulo + "</h3>" + mensaje;
        enviarTrato(String(mensajeCompleto));
    },
    "hud:trato_aceptar": () => {
        if (tratoActivo) tratoActivo = false;  
        mp.events.callRemote("trato_aceptar");
    },
    "hud:trato_cancelar": () => {
        if (tratoActivo) tratoActivo = false;  
        mp.events.callRemote("trato_cancelar");
    },
    "hud:aviso": (array) => {  
        let json_array = JSON.parse(array);
        if (json_array[0] <= 4) {
            switch (json_array[0]) {
                case 0:
                    mostrarAviso("success", json_array[1], json_array[2]);
                    break;
                case 1:
                    mostrarAviso("danger", json_array[1], json_array[2]);
                    break;
                case 2:
                    mostrarAviso("info", json_array[1], json_array[2]);
                    break;
                case 3:
                    mostrarAviso("reward", json_array[1], json_array[2]);
                    break;
                case 4:
                    mostrarAviso("admin", json_array[1], json_array[2]);
                    break;
            }
        } else {
            if (json_array[0] == 5) {
                mostrarAviso("fixed", -1, json_array[2]);
            } else if (json_array[0] == 6) {
                mostrarAviso("big", (60*3.5), json_array[2]);
            }
        }
    },
    "hud:aviso_minimapa": (array) => {
        let json_array = JSON.parse(array);
        mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);
        switch (json_array[0]) {
            case 0:
                mostrarAvisoMinimapa("pd", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 1:
                mostrarAvisoMinimapa("sd", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 2:
                mostrarAvisoMinimapa("fd", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 3:
                mostrarAvisoMinimapa("fib", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 4:
                mostrarAvisoMinimapa("saspa", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 5:
                mostrarAvisoMinimapa("taxi", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 6:
                mostrarAvisoMinimapa("paramedico", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 7:
                mostrarAvisoMinimapa("radar", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 8:
                mostrarAvisoMinimapa("mision", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 9:
                mostrarAvisoMinimapa("banco", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 10:
                mostrarAvisoMinimapa("email", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 11:
                mostrarAvisoMinimapa("telefono", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 12:
                mostrarAvisoMinimapa("mecanico", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            case 13:
                mostrarAvisoMinimapa("generico", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
            default:
                mostrarAvisoMinimapa("generico", json_array[1], json_array[2], json_array[3], json_array[4]);
                break;
        }
    },
    "hud:mostrar_hud": (datos) => { 
        if (hud_cefId < 0 && !cef_hud.existeCef(hud_cefId)) {  
            hud_cefId = cef_hud.crearCef("package://LURP/cef/hud/index.html", {
                puedeCerrar: false,
                mostrarCursor: false,
                sumarNumeroCefs: false
            });

            //let d = JSON.parse(datos_str);

            //let datos = {
            //    premium: d[0],
            //    nivel: d[1],
            //    dinero: d[2],
            //    hambre: d[3],
            //    sed: d[4],
            //    id: d[5],
            //    deservicio: d[6],
            //    radio: d[7],
            //    direccion: "",
            //    zona: "",
            //    calle: ""
            //};
            //cef_hud.ejecutarCef(hud_cefId, "updateHUD('" + JSON.stringify(datos) + "')");
            cef_hud.ejecutarCef(hud_cefId, "updateHUD('" + datos + "')");
            // cef_hud.ejecutarCef(hud_cefId, "openWs('" + _k + "','" + apiKey + "','" + id_pj + "', '" + personaje_id + "', '" + nombre_pj + "', '" + ramaWs + "')");
            cef_hud.ejecutarCef(hud_cefId, "openWs('" + _k + "','" + apiKey + "','" + personaje_id + "', '" + personaje_id + "', '" + nombre_pj + "', '" + wsBranch + "')");

            //setTimeout(() => {
            //    cef_hud.ejecutarCef(hud_cefId, `descargarCliente('${apiUrl}', '${apiKey}', '${_k}')`);
            //}, 5000);
        }
    },

    "hud:cargar_multas": (personaje_id) => {
        cef_hud.ejecutarCef(hud_cefId, "cargarMultas('" + _k + "','" + apiKey + "','" + personaje_id + "')");
    },
    
    "hud:estado_hud": (forceState = null) => {
        if (typeof forceState === 'boolean') {
            hudOculto = !forceState;
        } else {
            hudOculto = !hudOculto;
        }

        if (hudOculto) cef_hud.ejecutarCef(hud_cefId, "hideHud()");
        else cef_hud.ejecutarCef(hud_cefId, "showHud()");
    },

    "hud:ocultar_hud_excepto_elementos": listaElementos => {
        cef_hud.ejecutarCef(hud_cefId, `hideExceptClasses('${JSON.stringify(listaElementos)}')`);
    },

    "hud:estado_hud_body": estado => {
        if (estado) {
            cef_hud.ejecutarCef(hud_cefId, "showHud(true)");
        } else {
            cef_hud.ejecutarCef(hud_cefId, "hideHud(true)");
        }
    },

    "hud:estadoChat": (status) => {
        cef_hud.ejecutarCef(hud_cefId, `statusChat(${status})`);
    },

    "hud:escape": (status) => {
        cef_hud.ejecutarCef(hud_cefId, `statusEscape(${status})`);
    },

    "hud:teclasExtra": (status) => {
        cef_hud.ejecutarCef(hud_cefId, `statusTeclasExtra(${status})`);
    },

    "hud:actualizar_inventario": () => {
        let items = [];
        for (let i = 0, n = inventario.length; i < n; i++) {

            /* let cantidad = null
            if(inventario[i].cantidad > 0)
                cantidad = inventario[i].cantidad; */

            if(!inventario[i].mano && !inventario[i].accesorio && !inventario[i].mascara)
            {  
                if(inventario[i].celdaInv > 0 && inventario[i].celdaInv < 7)
                { 
                    let obj = {
                        id: inventario[i].id,
                        category: inventario[i].categoria,
                        object: inventario[i].tipoObjeto,
                        index: inventario[i].celdaInv,
                        amount: inventario[i].cantidad,
                        name: inventario[i].nombre,
                    };
                    items.push(obj);
                }
            }
        }
        cef_hud.ejecutarCef(hud_cefId, "addItems('" + JSON.stringify(items).replace("'", "") + "')");
    },

    "hud:actualizar_inventario_mano": () => {
        let items = [];
        for (let i = 0, n = inventario.length; i < n; i++) {

            if(inventario[i].mano)
            {
                let obj = {
                    id: inventario[i].id,
                    category: inventario[i].categoria,
                    object: inventario[i].tipoObjeto,
                    index: inventario[i].celdaInv,
                    amount: inventario[i].cantidad,
                    name: inventario[i].nombre,
                };
                items.push(obj);
            }
        }
        cef_hud.ejecutarCef(hud_cefId, "addHand('" + JSON.stringify(items).replace("'", "") + "')");
    },

    "hud:modificar_parametro": (parametro, valor) => {
        if (hud_cefId >= 0 && cef_hud.existeCef(hud_cefId)) {
            
            switch (parametro) { 
                case "hablando":
                    cef_hud.ejecutarCef(hud_cefId, `setVoice(${valor})`);
                    break;

                case "radiohablando":
                    cef_hud.ejecutarCef(hud_cefId, `setRadioV(${valor})`);
                    break;
                case "radioactiva":
                    cef_hud.ejecutarCef(hud_cefId, `isRadioActive(${valor})`);
                    break;
                case "adminservicio":
                    cef_hud.ejecutarCef(hud_cefId, `isAdminService(${valor})`);
                    break;
                case "dinero":
                    cef_hud.ejecutarCef(hud_cefId, `setMoney('${valor}')`);
                    break;
                case "hambre":
                    cef_hud.ejecutarCef(hud_cefId, `setEat(${valor})`);
                    break;
                case "sed":
                    cef_hud.ejecutarCef(hud_cefId, `setDrink(${valor})`);
                    break;
                case "id":
                    cef_hud.ejecutarCef(hud_cefId, `setId(${valor})`);
                    break;
                case "nivel":
                    cef_hud.ejecutarCef(hud_cefId, `setLevel(${valor})`);
                    break;

                case "premium":
                    cef_hud.ejecutarCef(hud_cefId, `isPremium(${valor})`);
                    break;

                case "radio":
                    cef_hud.ejecutarCef(hud_cefId, `setRadio(${valor})`);
                    break;
                case "deservicio":
                    cef_hud.ejecutarCef(hud_cefId, `showRadio(${valor})`);
                    break;
                case "arma":
                    cef_hud.ejecutarCef(hud_cefId, `setWeapon("${valor}")`);
                    break;
                case "ppurga":
                    cef_hud.ejecutarCef(hud_cefId, `setPpurga('${valor}')`);
                    break;
                case "pnivel":
                    cef_hud.ejecutarCef(hud_cefId, `setNpurga('${valor}')`);
                    break;  
                case "taxi":
                    cef_hud.ejecutarCef(hud_cefId, `showTaxi(${valor})`);
                    break;  
                case "taxitotal":
                    cef_hud.ejecutarCef(hud_cefId, `setTaxi(${valor})`);
                    break; 
                case "taxicolor":
                    cef_hud.ejecutarCef(hud_cefId, `setTaxiColor('${valor}')`);
                    break;
                case "bus":
                    cef_hud.ejecutarCef(hud_cefId, `showBus(${valor})`);
                    break; 
                case "bustotal":
                    cef_hud.ejecutarCef(hud_cefId, `setBus(${valor})`);
                    break; 
                case "buscolor":
                    cef_hud.ejecutarCef(hud_cefId, `setBusColor('${valor}')`);
                    break;    
                case "notykey":
                    cef_hud.ejecutarCef(hud_cefId, `showNotyKeys('${valor}')`);
                    break;
                case "notykeyText":
                    cef_hud.ejecutarCef(hud_cefId, `setNotyKeys('${valor}')`);
                    break;               
            }
        }
    },
    "hud:mostrar_coche": (estado) => {
        cef_hud.ejecutarCef(hud_cefId, `showVehicle(${estado})`);
        coche = estado;

        if (estado && intervalo_gasolina == null && intervalo_kilometros == null) {
            crearIntervaloGasolina();
            crearIntervaloKilometros();
        }
        else if (!estado && intervalo_gasolina != null && intervalo_kilometros != null) {
            clearInterval(intervalo_gasolina);
            clearInterval(intervalo_kilometros);
        }
    },
    "hud:mostrar_notykey": (estado) => {
        cef_hud.ejecutarCef(hud_cefId, `showNotyKeys(${estado})`);
    },
    "hud:notykey": (text) => {
        cef_hud.ejecutarCef(hud_cefId, `setNotyKeys('${text}')`);
        mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);
    },
    "hud:mostrar_faccion": (estado) => {
        cef_hud.ejecutarCef(hud_cefId, `showEnvironmentFaction(${estado})`);
    },    
    "hud:faccion": (name, image, color) => {
        cef_hud.ejecutarCef(hud_cefId, `setFaction("${name}", "${image}", "${color}")`);
    },
    "hud:mostrar_arma": (estado) => {
        arma = estado;
        cef_hud.ejecutarCef(hud_cefId, `showWeapon(${estado})`);
        cef_hud.ejecutarCef(hud_cefId, `setFireMode('${nombreModosDisparo[modoDisparoActual]}')`);
    },
    "hud:modo_disparo": () => {
        if (hud_cefId >= 0) {
            cef_hud.ejecutarCef(hud_cefId, `setFireMode('${nombreModosDisparo[modoDisparoActual]}')`);
        }
    },
    //"hud:obtenerChunkCodigo": (chunk) => {
    //    if (chunksCodigoEsperados <= 0) {
    //        chunksCodigoEsperados = chunk;
    //    } else {
    //        chunksCodigoRecibidos++;
    //        codigoClienteRecibido += chunk;
            
    //        if (chunksCodigoRecibidos == chunksCodigoEsperados) {
    //            let codigo = JSON.parse(codigoClienteRecibido);
    //            for (let c of codigo) {
    //                eval(c);
    //            }
    //        }
    //    }
    //},
    "hud:mostrar_logro": (id) => {
        if (logrosMostradosActuales.length > 0 || cantidad_cefs > 0) {
            logrosMostradosActuales.push(id);
        } else {
            cef_hud.ejecutarCef(hud_cefId, `showAchievement(${id})`);
        }
    },
    "hud:mostrar_loading": (texto) => {
        loading_cefId = cef_hud.crearCef("package://LURP/cef/hud/aviso.html", {
            puedeCerrar: false,
            mostrarCursor: false,
            sumarNumeroCefs: false
        });

        cef_hud.ejecutarCef(loading_cefId, "mostrar('" + texto+ "')");
    },
    "hud:cerrar_loading": () => {
        if (loading_cefId >= 0) {
            cef_hud.cerrarCef(loading_cefId, false, false, false);
            loading_cefId = -1;
        }
    },
    "hud:limitadorVelocidad:actualizar": (speed) => {
        cef_hud.ejecutarCef(hud_cefId, `showSpeedLimiter(${speed})`);
    },
    "hud:limitadorVelocidad:ocultar": () => {
        cef_hud.ejecutarCef(hud_cefId, `hideSpeedLimiter()`);
    },
    "hud:minimapa:ancho": (ancho) => {
        cef_hud.ejecutarCef(hud_cefId, `moveHudMinimap(${ancho})`)
    },
    "hud:mostrar_ocultar": (opcion, estado) => {

        let div = null;
        switch(opcion)
        {
            case "hudNivel":
                div = ".lvl";
                break;
            case "hudPremium":
                div = ".premium";
                break;
            case "hudStreamer":
                div = ".streamer";
                break;
            case "hudDinero":
                div = ".money";
                break;
            case "hudAutobuses":
                div = ".bus";
                break;
            case "hudTaxi":
                div = ".taxi";
                break;
            case "hudRadio":
                div = ".radio";
                break;
            case "hudHambre":
                div = ".eat";
                break;
            case "hudSed":
                div = ".drink";
                break;
            case "hudId":
                div = ".r3";
                break;
            case "hudOrientacion":
                div = ".direction";
                break;
            case "hudUbicacion":
                div = ".r5-2";
                break;
            case "hudInventario":
                div = ".inv";
                break;
            case "hudTeclas":
                div = ".keys";
                break;
            case "hudVehiculo":
                div = ".vehicle-info";
                break;
        }
        let jug = mp.controladorJugadores._jugadores[player_local.id];
        if (jug) {
            if (!jug.deservicio && opcion == "hudRadio") {
                return;
            }
        }
        

        if (!player_local.vehicle && opcion == "hudVehiculo") {
            return;
        }

        if (div != null) {
            if (estado)
                cef_hud.ejecutarCef(hud_cefId, `showDiv("${div}")`);
            else
                cef_hud.ejecutarCef(hud_cefId, `hideDiv("${div}")`);
        }
        
    },
    'sound:play': (name, loop) => {
        cef_hud.ejecutarCef(hud_cefId,`playSound("${name}", ${loop})`)
    },
    'sound:cancel': () => {
        cef_hud.ejecutarCef(hud_cefId,`stopSound()`)
    },
    "sound:playEffect": (name, loop) => {
        if (mp.storage.data.options.efectosAudio) cef_hud.ejecutarCef(hud_cefId,`playSoundEffect("${name}", ${loop})`)
    },
    'sound:stopEffect': () => {
        if (mp.storage.data.options.efectosAudio) cef_hud.ejecutarCef(hud_cefId,`stopSoundEffect()`)
    },
	'sound:radio': (url) => {
        cef_hud.ejecutarCef(hud_cefId,`playRadio("${url}")`)
    },
    'radio:play': (src, vol, alFinalizar) => {
        cef_hud.ejecutarCef(hud_cefId,`playRadioVol("${src}", ${vol})`)
    },
    'radio:resumir': () => {
        cef_hud.ejecutarCef(hud_cefId,`resumirRadio()`);
    },
    'radio:stop': () => {
        cef_hud.ejecutarCef(hud_cefId,`finalizarRadio()`);
    },
    'radio:volumen': (tipo, subir, volumen) => {
        cef_hud.ejecutarCef(hud_cefId,`actualizarVolumenRadio(${tipo}, ${subir}, ${volumen})`);
    },
    'festival:play': (src, vol) => {
        cef_hud.ejecutarCef(hud_cefId,`playFestivalVol("${src}", ${vol})`);
    },
    'festival:stop': () => {
        cef_hud.ejecutarCef(hud_cefId,`festivalStop()`);
    },
    // 'festival:fade': (volumen) => {
    //     cef_hud.ejecutarCef(hud_cefId,`fadeVolumenFestival(${volumen})`);
    // },
    // 'festival:posicionarEmisora': (coordenadasx, coordenadasy, coordenadasz) => {
    //     cef_hud.ejecutarCef(hud_cefId,`posicionarEmisora(${coordenadasx}, ${coordenadasy}, ${coordenadasz})`);
    // },
    // 'festival:posicionarUsuario': (coordenadasUsuario) => {
    //     cef_hud.ejecutarCef(hud_cefId,`posicionarUsuario(${coordenadasUsuario.x}, ${coordenadasUsuario.y}, ${coordenadasUsuario.z})`);
    // }
    'desactivarVarBigNoty': () => {
        bigNotyActiva = false;
    },
    'desactivarVarTrato': () => {
        tratoActivo = false;
    },
});

setInterval(() => {
    if (logrosMostradosActuales.length > 0) {
        if (cantidad_cefs <= 0) {
            let logroAMostrar = logrosMostradosActuales.pop();
            cef_hud.ejecutarCef(hud_cefId, `showAchievement(${logroAMostrar})`);
            // mostrarLogro(logroAMostrar.nombre, logroAMostrar.descripcion, logroAMostrar.txdLib, logroAMostrar.txdName, logroAMostrar.color);
        }
	}
}, 10800);

function enviarTrato(msg) {
    tratoActivo = true;
    cef_hud.ejecutarCef(hud_cefId, `sendDeal("${msg}")`);
}
exports.enviarTrato = enviarTrato;

function cerrarTextoFijo() {
    cef_hud.ejecutarCef(hud_cefId, `hideFixedText()`);
}
exports.cerrarTextoFijo = cerrarTextoFijo;

let avisoEnviado = false;
function mostrarAviso(estilo, tiempo, mensaje) {
    if (!mp.system.isFocused && (estilo != "big" && estilo != "fixed")) {
       
        if (!avisoEnviado) {
            avisoEnviado = true;
            mp.system.notify({
                title: opciones.variables.nombreDiscord,
                text: "¡Tienes nuevas notificaciones en el juego!",
                attribute: "LURP",
                duration: 25,
                silent: false
            });
            setTimeout(() => {
                avisoEnviado = false;
            });
        }
    }

    if (estilo != "big" && estilo != "fixed") {
        cef_hud.ejecutarCef(hud_cefId, `sendNoty("${estilo}", ${tiempo}, "${mensaje}")`);
    } else if (estilo == "big") {
        cef_hud.ejecutarCef(hud_cefId, `sendBigNoty("${mensaje}")`);
        bigNotyActiva = true;
    } else if (estilo == "fixed") {
        cef_hud.ejecutarCef(hud_cefId, `sendFixedText("${mensaje}")`);
    }
}
exports.mostrarAviso = mostrarAviso;

function mostrarAvisoMinimapa(estilo, titulo, subtitulo, mensaje, tiempo = 5000) {
    mp.game.audio.playSoundFrontend(-1, "Lose_1st", "GTAO_FM_Events_Soundset", true);
    cef_hud.ejecutarCef(hud_cefId, `sendMinimapAlert("${estilo}", "${titulo}", "${subtitulo}", "${mensaje}", ${tiempo})`);
}
exports.mostrarAvisoMinimapa = mostrarAvisoMinimapa;

function actualizarMunicion(cargada, total) {
    cef_hud.ejecutarCef(hud_cefId, `setAmmo(${cargada}, ${total})`);
}
exports.actualizarMunicion = actualizarMunicion;

function actualizarModoDisparo(nombre) {
    cef_hud.ejecutarCef(hud_cefId, `setFireMode(${nombre})`);
}
exports.actualizarModoDisparo = actualizarModoDisparo;

var mapaPrision = fort1Zancudo = portaaviones = null;

mp.events.add("playerEnterVehicle", (vehicle, seat) => {
    hudEnterVehicle(vehicle, seat);
});

function hudEnterVehicle(vehicle, seat) {
    vehiculo_jugador_asiento = seat;
    if (!vehicle.propiedades) {
        let d = JSON.parse(vehicle.getVariable("VEHICULO"));
        let gas = d.gasolina;
        let kil = d.kilometros;
        let vida = d.vida;

        mp.controladorVehiculos.establecerPropiedad(vehicle, "kilometros", kil);
        mp.controladorVehiculos.establecerPropiedad(vehicle, "gasolina", gas);
        mp.controladorVehiculos.establecerPropiedad(vehicle, "vida", vida);

        setTimeout(() => {
            hudEnterVehicle(vehicle);
        }, 500);
    }
    else {

        gasolina = vehicle.propiedades.gasolina;
        gasolina_iniciales = vehicle.propiedades.gasolina;
        kilometros = vehicle.propiedades.kilometros;
        kilometros_iniciales = vehicle.propiedades.kilometros;
        kilometros_posicion = vehicle.position;
        let vidaActual = vehicle.propiedades.vida;
        vida_vehiculo_jugador = vidaActual + (1000 - vidaActual) * (vidaActual / 1200);

        if (vehicle.getClass() == 15 || vehicle.getClass() == 15 || vehicle.model == mp.game.joaat("lguardmav") || vehicle.model == mp.game.joaat("maverick2") || vehicle.model == mp.game.joaat("polmav") || vehicle.model == mp.game.joaat("polbuz") || vehicle.model == mp.game.joaat("buzzard3") || vehicle.model == mp.game.joaat("buzzard4") || vehicle.model == mp.game.joaat("deluxo2")) {
            mapaPrision = mp.game.ui.addBlipForRadius(1690.072, 2581.333, 1, 300.0);
            mp.game.invoke("0xDF735600A4696DAF", mapaPrision, 5);
            mp.game.invoke("0x45FF974EEE1C8734", mapaPrision, 70);
            mp.game.invoke("0x03D7FB09E75D6B7E", mapaPrision, 1);

            fort1Zancudo = mp.game.ui.addBlipForRadius(-2193.968, 3159.964, 1, 550.0);
            mp.game.invoke("0xDF735600A4696DAF", fort1Zancudo, 5);
            mp.game.invoke("0x45FF974EEE1C8734", fort1Zancudo, 70);
            mp.game.invoke("0x03D7FB09E75D6B7E", fort1Zancudo, 1);

            portaaviones = mp.game.ui.addBlipForRadius(3073.813, -4715.359, 1, 300.0);
            mp.game.invoke("0xDF735600A4696DAF", portaaviones, 5);
            mp.game.invoke("0x45FF974EEE1C8734", portaaviones, 70);
            mp.game.invoke("0x03D7FB09E75D6B7E", portaaviones, 1);
        }

        vehiculo_jugador = vehicle;
    }
}

mp.events.add('playerLeaveVehicle', () => {
    if(mapaPrision != null)
    {
        mp.game.ui.removeBlip(mapaPrision);
        mapaPrision = null;
    }
    if(fort1Zancudo != null)
    {
        mp.game.ui.removeBlip(fort1Zancudo);
        fort1Zancudo = null;
    }
    if(portaaviones != null)
    {
        mp.game.ui.removeBlip(portaaviones);
        portaaviones = null;
    }

    if (vehiculo_jugador != null) {
        if (mp.vehicles.exists(vehiculo_jugador)) {
            if(alpr){
                mp.events.call("mostrar_alpr", false);
            }
            if (menu_vehiculo != null) {
                menu_vehiculo?.Close();
            }
            if (vehiculo_jugador && vehiculo_jugador_asiento == -1) {
                if (vehiculo_jugador.propiedades) {
                    if (gasolina < gasolina_iniciales || kilometros > kilometros_iniciales || vehiculo_jugador.getBodyHealth() < vehiculo_jugador.propiedades.vida) {
                        mp.events.callRemote("bajar_vehiculo", vehiculo_jugador, gasolina, kilometros.toFixed(1), vehiculo_jugador.getDirtLevel(), vehiculo_jugador.getBodyHealth());
                    }
                }
                vehiculo_jugador = null;
                distancia_recorrida = 0;
            }
            else {
                vehiculo_jugador = null;
            }
        }
        else {
            vehiculo_jugador = null;
        }
    }

    if (intervalo_gasolina != null) {
        clearInterval(intervalo_gasolina);
    }
    if (intervalo_kilometros != null) {
        clearInterval(intervalo_kilometros);
    }
    vehiculo_jugador_asiento = null;
    intervalo_gasolina = null;
    intervalo_kilometros = null;
    distancia_recorrida = 0;
});

var minimap = {
    width: 0,
    height: 0,
    scaleX: 0,
    scaleY: 0,
    leftX: 0,
    bottomY: 0,
    rightX: 0,
    topY: 0,
};

function getMinimapAnchor() {
    var sfX = 1.0 / 20.0;
    var sfY = 1.0 / 20.0;
    var safeZone = mp.game.graphics.getSafeZoneSize();
    var aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
    var resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    var scaleX = 1.0 / resolution.x;
    var scaleY = 1.0 / resolution.y;
    minimap.width = scaleX * (resolution.x / (4 * aspectRatio)),
        minimap.height = scaleY * (resolution.y / 5.674),
        minimap.scaleX = scaleX,
        minimap.scaleY = scaleY,
        minimap.leftX = scaleX * (resolution.x * (sfX * (Math.abs(safeZone - 1.0) * 10))),
        minimap.bottomY = 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(safeZone - 1.0) * 10))),
        minimap.rightX = minimap.leftX + minimap.width;
    minimap.topY = minimap.bottomY - minimap.height;
    return minimap;
}

var evento_enviado = false;
function crearIntervaloGasolina() {
    if (intervalo_gasolina != null) {
        clearInterval(intervalo_gasolina);
    }
    intervalo_gasolina = setInterval(() => {
        if (!logueado) return;
        if (!player_local.vehicle) return;
        if (!coche) return;
    
        let vehiculo = player_local.vehicle;
        if (vehiculo !== null && !esBici(vehiculo)) {
            if (vehiculo.getIsEngineRunning()) {
                if (gasolina <= 0) {
                    if (vehiculo.getPedInSeat(-1) == player_local.handle && !evento_enviado) {
                        evento_enviado = true;
                        setTimeout(() => {
                            if (gasolina <= 0) {
                                mp.events.callRemote("sin_gasolina");
                            }
                        }, 5000);
                    }
                } else {
                    gasolina--;
                }
            }
        }
        
    }, tiempoIntervaloGasolina);
}

function crearIntervaloKilometros() {
    if (intervalo_kilometros != null) {
        clearInterval(intervalo_kilometros);
    }
    intervalo_kilometros = setInterval(() => {
        if (!logueado) return;
        if (!player_local.vehicle) return;
        if (!coche) return;

        let vehiculo = player_local.vehicle;
        if (vehiculo !== null && !esBici(vehiculo)) {
            let distancia = calcDist(kilometros_posicion, vehiculo.position);
            kilometros_posicion = vehiculo.position;
            distancia_recorrida += distancia; 
            let kilometrosEchos = round((distancia_recorrida / 1000), 1);
            if (kilometrosEchos >= 0.1) {
                kilometros += 0.1;
                distancia_recorrida = 0;
            }
        }
    }, tiempoIntervaloKilometros);
}

var nivel_alarma = 0;

let armaCargada = "";
intervalo_hud = setInterval(() => {
    if (!hudOculto && logueado) {
        if (player_local.vehicle && player_local.vehicle.getClass() != 13) {
            if (!coche) {
                if (player_local.vehicle.propiedades) {
                    if (player_local.vehicle.propiedades.nivel_alarma > 0) {
                        cef_hud.ejecutarCef(hud_cefId, `setAlarm(${nivel_alarma})`);
                    } else cef_hud.ejecutarCef(hud_cefId, `setAlarm(null)`);
                } else cef_hud.ejecutarCef(hud_cefId, `setAlarm(null)`);
                
                if (mp.storage.data.options.hudVehiculo) mp.events.call("hud:mostrar_coche", true);
            }
        } else if (coche) mp.events.call("hud:mostrar_coche", false);

        if (player_local.weapon != 2725352035 && armas["0x"+(player_local.weapon.toString(16)).toUpperCase()]) {
            if (player_local.weapon != armaCargada) {
                mp.events.call("hud:modificar_parametro", "arma", armas["0x"+(player_local.weapon.toString(16)).toUpperCase()]);
                armaCargada = player_local.weapon;
            
                if (mp.game.weapon.getWeapontypeGroup(player_local.weapon) == 2685387236)
                    actualizarMunicion(0, 0);
            }

            if (!arma) {
                mp.events.call("hud:mostrar_arma", true);
            }
        } else if (arma) mp.events.call("hud:mostrar_arma", false);

        if (mp.game.invoke(Natives.IS_RADAR_ENABLED) && !mp.game.invoke(Natives.IS_RADAR_HIDDEN)) {
            let position = player_local.position;
            let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
            let rotacion = player_local.getHeading();

            minimap = getMinimapAnchor();
            if (player_local.dimension == 0 || adminservicio || isNoClip) { // Si está en una casa o negocio (dim != 0) no actualizamos calle ni zona
                if (cercaIsla) {
                    zona = "Cayo Perico"
                    calle = "";
                } else {
                    zona = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
                    calle = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
                    if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName) calle += " / " + mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad);

                }
                
            }

            if (rotacion > 22.5 && rotacion < 67.5) direccion = "NO";
            else if (rotacion > 292.5 && rotacion < 337.5) direccion = "NE";
            else if (rotacion > 112.5 && rotacion < 157.5) direccion = "SO";
            else if (rotacion > 202.5 && rotacion < 247.5) direccion = "SE";
            else if (rotacion > 157.5 && rotacion < 202.5) direccion = "S";
            else if (rotacion > 247.5 && rotacion < 292.5) direccion = "E";
            else if (rotacion > 67.5 && rotacion < 112.5) direccion = "O";
            else if (rotacion > 337.5 && rotacion <= 360) direccion = "N";
            else if (rotacion >= 0 && rotacion < 22.5) direccion = "N";
        }
    }

    if (hud_cefId >= 0 && cef_hud.existeCef(hud_cefId)) cef_hud.ejecutarCef(hud_cefId, `setAddress("${direccion}", "${zona}", "${calle}")`);
    if (coche && player_local.vehicle && player_local.vehicle.propiedades) {
        if (player_local.vehicle.propiedades.nivel_alarma != nivel_alarma) {
            cef_hud.ejecutarCef(hud_cefId, `setAlarm(${player_local.vehicle.propiedades.nivel_alarma})`);
            nivel_alarma = player_local.vehicle.propiedades.nivel_alarma;
        }
    }
}, tiempoIntervaloHud);

/**
 * 
 *   Eventos relacionados con el HUD, al final de todo para no molestar
 *   ole ole
 * 
 */

mp.events.add('mostrar_subtitulo', function (mensaje, tiempo) {
    mp.game.ui.setTextEntry(mensaje);
    mp.game.ui.drawSubtitleTimed(tiempo, true);
});
mp.events.add('borrar_marcador', function () {
    if (marcador !== null) {
        //if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        //}
    }
});
mp.events.add('mostrar_marcador_ex', function (parametro1, parametro2, parametro3) {
    if (marcador !== null) {
        //if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        //}        
    }
    marcador = mp.markers.new(parametro1, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z), parametro3, { color: [200, 247, 57, 180] });
});
mp.events.add('mostrar_waypoint', function (parametro1) {
    mp.game.ui.setNewWaypoint(parametro1.x, parametro1.y);
});
mp.events.add('mostrar_marcador', function (parametro1, parametro2, dimension = 0) {
    if (marcador !== null) {
        //if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        //}
    }
    marcador = mp.markers.new(parametro1, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z), 2.0, { color: [200, 247, 57, 180], dimension: dimension });
});
mp.events.add('mostrar_ruta_ex', function (parametro1, parametro2, parametro3) {
    if (blipRuta !== null) {
        //if (mp.markers.exists(blipRuta)) {
            mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, false);
            blipRuta.destroy();
            blipRuta = null;
        //}
    }
    if (marcador !== null) {
        //if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        //}
    }

    blipRuta = mp.blips.new(8, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z),
    {
            name: 'Destino',
            color: 5,
            //shortRange: true,
    });

    mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, true);
    mp.game.invoke("0x837155CD2F63DA09", blipRuta.handle, 5);

    marcador = mp.markers.new(parametro1, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z), parametro3, { color: [200, 247, 57, 180] });
});
mp.events.add('mostrar_ruta_ex_dim', function (parametro1, parametro2, parametro3, parametro4) {
    if (blipRuta !== null) {
        //if (mp.markers.exists(blipRuta)) {
            mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, false);
            blipRuta.destroy();
            blipRuta = null;
        //}
    }
    if (marcador !== null) {
        //if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        //}
    }

    blipRuta = mp.blips.new(8, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z),
    {
            name: 'Destino',
            color: 5,
            //shortRange: true,
            dimension: parametro4,
    });

    mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, true);
    mp.game.invoke("0x837155CD2F63DA09", blipRuta.handle, 5);

    marcador = mp.markers.new(parametro1, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z), parametro3, { color: [200, 247, 57, 180], dimension: parametro4 });
});
mp.events.add('mostrar_ruta', function (parametro1, parametro2) {
    if (blipRuta !== null) {
        //if (mp.markers.exists(blipRuta)) {
            mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, false);
            mp.game.invoke("0xD12882D3FF82BF11");
            mp.game.invoke("0x86A652570E5F25DD", blipRuta.handle);
            blipRuta.destroy();
            blipRuta = null;
        //}
    }
    if (marcador !== null) {
        //if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        //}
    }
    
    blipRuta = mp.blips.new(8, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z),
    {
            name: 'Destino',
            color: 5,
            //shortRange: true,
    });

    mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, true);
    mp.game.invoke("0x837155CD2F63DA09", blipRuta.handle, 5);

    marcador = mp.markers.new(parametro1, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z), 2.0, { color: [200, 247, 57, 180], });
});
mp.events.add('borrar_ruta', function () {
    if (blipRuta !== null) {
        //if (mp.markers.exists(blipRuta)) {
            mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, false);
            // mp.game.invoke("0xD12882D3FF82BF11");
            // mp.game.invoke("0x86A652570E5F25DD", blipRuta.handle);

            if (mp.blips.exists(blipRuta)) {
                blipRuta.destroy();
                blipRuta = null;
            }
        //}
    }
    if (marcador !== null) {
        if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        }
    }
});

mp.events.add('mostrar_rutaBlip', function (parametro1, parametro2, parametro3) {
    if (blipRuta !== null) {
        //if (mp.markers.exists(blipRuta)) {
            mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, false);
            // mp.game.invoke("0xD12882D3FF82BF11");
            // mp.game.invoke("0x86A652570E5F25DD", blipRuta.handle);

            if (mp.blips.exists(blipRuta)) {
                blipRuta.destroy();
                blipRuta = null;
            }
        //}
    }
    if (marcador !== null) {
        //if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        //}
    }

    blipRuta = mp.blips.new(8, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z),
    {
            name: 'Destino',
            color: 5,
            //shortRange: true,
    });

    mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, true);
    mp.game.invoke("0x837155CD2F63DA09", blipRuta.handle, 5);

    marcador = mp.markers.new(parametro1, new mp.Vector3(parametro2.x, parametro2.y, parametro2.z), 2.0, { color: [200, 247, 57, 180], });
});
mp.events.add('borrar_rutaBlip', function () {
    if (blipRuta !== null) {
        //if (mp.markers.exists(blipRuta)) {
            mp.game.invoke("0x4F7D8A9BFB0B43E9", blipRuta.handle, false);
            // mp.game.invoke("0xD12882D3FF82BF11");
            // mp.game.invoke("0x86A652570E5F25DD", blipRuta.handle);

            if (mp.blips.exists(blipRuta)) {
                blipRuta.destroy();
                blipRuta = null;
            }
        //}
    }
    if (marcador !== null) {
        //if (mp.markers.exists(marcador)) {
            marcador.destroy();
            marcador = null;
        //}
    }
});

mp.events.add('act_dinero', function (parametro1, parametro2) {
    dinero = parametro1;
    dinero_banco = parametro2;
    mp.events.call("hud:modificar_parametro", "dinero", parametro1);
});

mp.keys.bind(0x1B, true, () => { 
    try {
        let status = mp.game.invoke("0xB0034A223497FFCB");
        mp.events.call("hud:escape", status);
    } catch (e) { }
});
mp.keys.bind(0x47, true, teclaG);

//Tecla Z
mp.keys.bind(0x5A, true, function () {
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

    if(tipoMapa < 2){
        tipoMapa++
    }else{
        tipoMapa = 0;
    }
    if (tipoMapa === 0) {
        if(tipoMapa != 2) mp.game.ui.displayRadar(true);
        mp.game.ui.setRadarBigmapEnabled(false, true);
        mp.game.ui.setRadarZoom(0.0);
        mp.events.call("hud:minimapa:ancho", 0);
        mp.events.call("hud:mostrar_ocultar", "hudOrientacion", mp.storage.data.options.hudOrientacion);
        mp.events.call("hud:mostrar_ocultar", "hudUbicacion", mp.storage.data.options.hudUbicacion);
    } else if (tipoMapa === 1) {
        mp.game.ui.setRadarBigmapEnabled(true, false);
        mp.game.ui.setRadarZoom(0.0);
        mp.events.call("hud:minimapa:ancho", 1);
        mp.events.call("hud:mostrar_ocultar", "hudOrientacion", mp.storage.data.options.hudOrientacion);
        mp.events.call("hud:mostrar_ocultar", "hudUbicacion", mp.storage.data.options.hudUbicacion);
    }else{
        mp.game.ui.displayRadar(false);
        mp.events.call("hud:minimapa:ancho", 2);
        mp.events.call("hud:mostrar_ocultar", "hudOrientacion", false);
        mp.events.call("hud:mostrar_ocultar", "hudUbicacion", false);
    }
    mp.storage.data.personajes[personaje_id].tipoMapa = tipoMapa;
    mp.storage.flush();
});

function teclaG() {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (!player_local.vehicle) {
        if (setFloodboton(1000, "FB36") == false) return;

        let vehiculo_elegido_1 = null;
        let dist_1 = 10.0;
        mp.vehicles.forEachInStreamRange(function (vehicle) {
            let _dist = calcDist(vehicle.position, player_local.position);
            if (_dist < dist_1) {
                vehiculo_elegido_1 = vehicle;
                dist_1 = _dist;
            }
        });

        if (vehiculo_elegido_1 != null) {
            if (!player_local.vehicle) {
                let playerPos = player_local.position;
                let veh = vehiculo_elegido_1;
                if (calcDist(veh.position, playerPos) < 7) {
                    if (veh !== null) {
                        if (adminservicio) {
                            mp.gui.chat.push("Total pasajeros: " + veh.getMaxNumberOfPassengers());
                            mp.gui.chat.push("Clase: " + veh.getClass())
                        }
                        if (veh.getClass() == 8 || veh.getClass() == 13) {
                            var seat = undefined;
                            //let seat_f = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_f")); //Conductor moto
                            var seat_r = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_r")); //Pasajero moto
                            if (calcDist(playerPos, seat_r) < 2.5) {
                                seat = 0;
                            }
                            if (seat != undefined) {
                                if (veh.isSeatFree(seat)) {
                                    mp.players.local.taskEnterVehicle(veh.handle, 5000, seat, 2.0, 1, 0);
                                }
                            }
                        }
                        else {
                            //let seat_dside_f = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_dside_f")); //conductor (izquierda)
                            var seat_pside_r = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_pside_r")); // detras del copiloto (derecha)
                            var seat_pside_f = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_pside_f")); // copiloto (derecha)
                            var seat_dside_r = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_dside_r")); // detras del conductor (izquierda)
                            var seat_dside_r1 = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_dside_r1"));
                            var seat_pside_r1 = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_pside_r1"));
                            var seat_dside_r2 = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_dside_r2"));
                            var seat_pside_r2 = veh.getWorldPositionOfBone(veh.getBoneIndexByName("seat_pside_r2"));
                            var seat = undefined;
                            var totalpasajeros = veh.getMaxNumberOfPassengers();
                            if (totalpasajeros < 8 && veh.getClass() != 13 && veh.getClass() != 14 && veh.getClass() != 16 && veh.getClass() != 19 && veh.getClass() != 21) {
                                //Copiloto
                                if (calcDist(playerPos, seat_pside_f) < 1.4) {
                                    seat = 0;
                                } else {
                                    //Atras conductor
                                    if (calcDist(playerPos, seat_dside_r) < 1.4 || calcDist(playerPos, seat_dside_r1) < 2.2) {
                                        seat = 1;
                                        if (calcDist(playerPos, seat_dside_r1) < 0.8 && totalpasajeros > 3)
                                            seat = 3;
                                    }
                                    //detras copiloto
                                    if (calcDist(playerPos, seat_pside_r) < 1.4 || calcDist(playerPos, seat_pside_r1) < 2.2) {
                                        seat = 2;
                                        if (calcDist(playerPos, seat_pside_r1) < 0.8 && totalpasajeros > 3)
                                            seat = 4;
                                    }
                                    //Especiales
                                    if (calcDist(playerPos, seat_dside_r2) < 0.85) {
                                        if (totalpasajeros > 5) {
                                            seat = 5;
                                        }
                                        else {
                                            seat = 3;
                                        }
                                    }
                                    //Especiales
                                    if (calcDist(playerPos, seat_pside_r2) < 0.85) {
                                        if (totalpasajeros > 5) {
                                            seat = 6;
                                        }
                                        else {
                                            seat = 4;
                                        }
                                    }
                                }
                                if (adminservicio) {
                                    mp.gui.chat.push("Seat: " + seat);
                                }
                                if (seat != undefined) {
                                    if (veh.isSeatFree(seat)) {
                                        mp.players.local.taskEnterVehicle(veh.handle, 5000, seat, 2.0, 1, 0);
                                    }
                                }
                            } else {
                                if (veh.model == 3196165219 || veh.model == 1941029835) {
                                    for (var i = 1; i < totalpasajeros; i++) {
                                        if (veh.isSeatFree(i)) {
                                            mp.players.local.taskEnterVehicle(veh.handle, 5000, i, 2.0, 1, 0);
                                            break;
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < totalpasajeros; i++) {
                                        if (veh.isSeatFree(i)) {
                                            mp.players.local.taskEnterVehicle(veh.handle, 5000, i, 2.0, 16, 0);
                                            break;
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

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function esVehiculoElectrico(vehiculo) {
    if (!vehiculo) return false;
    let modelo = vehiculo.model;

    /**
     * raiden, neon, voltic, voltic2, khamelion, surge, dilettante, dilettante2, 
     * airtug, imorgon, iwagen, cyclone, tezeract, omnisegt
     */
    switch (modelo){
        case 2765724541: case 2445973230: case 2672523198: case 989294410: case 544021352: case 2400073108: case 3164157193: case 1682114128: case 1147287684: case 3757070668:
        case 1560980623: case 3162245632: case 662793086: case 1392481335: case 1031562256: case 3789743831:
            return true;
        default:
            return false;
    }
}

function esBici(vehiculo) {
    if (vehiculo.getClass() === 13) return true;
    return false;
}

function obtenerPuntoCardinal() {
    var rotacion = mp.players.local.getHeading();
    if (rotacion > 22.5 && rotacion < 67.5) {
        return "NO";
    }
    else if (rotacion > 292.5 && rotacion < 337.5) {
        return "NE";
    }
    else if (rotacion > 112.5 && rotacion < 157.5) {
        return "SO";
    }
    else if (rotacion > 202.5 && rotacion < 247.5) {
        return "SE";
    }
    else if (rotacion > 157.5 && rotacion < 202.5) {
        return "S";
    }
    else if (rotacion > 247.5 && rotacion < 292.5) {
        return "E";
    }
    else if (rotacion > 67.5 && rotacion < 112.5) {
        return "O";
    }
    else if (rotacion > 337.5 && rotacion <= 360) {
        return "N";
    }
    else if (rotacion >= 0 && rotacion < 22.5) {
        return "N";
    }
}

const armas = { "0x92A27487": "dagger", "0x958A4A8F": "bat", "0xF9E6AA4B": "bottle", "0x84BD7BFD": "crowbar", "0xA2719263": "unarmed", "0x8BB05FD7": "flashlight", "0x440E4788": "golfclub", "0x4E875F73": "hammer", "0xF9DCBF2D": "hatchet", "0xD8DF3C3C": "knuckle", "0x99B507EA": "knife", "0xDD5DF8D9": "machete", "0xDFE37640": "switchblade", "0x678B81B1": "nightstick", "0x19044EE0": "wrench", "0xCD274149": "battleaxe", "0x94117305": "poolcue", "0x3813FC08": "stone_hatchet", "0x1B06D571": "pistol", "0xBFE256D4": "pistol_mk2", "0x5EF9FEC4": "combatpistol", "0x22D8FE39": "appistol", "0x3656C8C1": "stungun", "0x99AEEB3B": "pistol50", "0xBFD21232": "snspistol", "0x88374054": "snspistol_mk2", "0xD205520E": "heavypistol", "0x83839C4": "vintagepistol", "0x47757124": "flaregun", "0xDC4DB296": "marksmanpistol", "0xC1B3C3D1": "revolver", "0xCB96392F": "revolver_mk2", "0x97EA20B8": "doubleaction", "0xAF3696A1": "raypistol", "0x2B5EF5EC": "ceramicpistol", "0x13532244": "microsmg", "0x2BE6766B": "smg", "0x78A97CD0": "smg_mk2", "0xEFE7E2DF": "assaultsmg", "0xA3D4D34": "combatpdw", "0xDB1AA450": "machinepistol", "0xBD248B55": "minismg", "0x476BF155": "raycarbine", "0x1D073A89": "pumpshotgun", "0x555AF99A": "pumpshotgun_mk2", "0x7846A318": "sawnoffshotgun", "0xE284C527": "assaultshotgun", "0x9D61E50F": "bullpupshotgun", "0xA89CB99E": "musket", "0x3AABBBAA": "heavyshotgun", "0xEF951FBB": "dbshotgun", "0x12E82D3D": "autoshotgun", "0xBFEFFF6D": "assaultrifle", "0x394F415C": "assaultrifle_mk2", "0x83BF0278": "carbinerifle", "0xFAD1F1C9": "carbinerifle_mk2", "0xAF113F99": "advancedrifle", "0xC0A3098D": "specialcarbine", "0x969C3D67": "specialcarbine_mk2", "0x7F229F94": "bullpuprifle", "0x84D6FAFD": "bullpuprifle_mk2", "0x624FE830": "compactrifle", "0x9D07F764": "mg", "0x7FD62962": "combatmg", "0xDBBD7280": "combatmg_mk2", "0x61012683": "gusenberg", "0x5FC3C11": "sniperrifle", "0xC472FE2": "heavysniper", "0xA914799": "heavysniper_mk2", "0xC734385A": "marksmanrifle", "0x6A6C02E0": "marksmanrifle_mk2", "0xB1CA77B1": "rpg", "0xA284510B": "grenadelauncher", "0x4DD2DC56": "grenadelauncher_smoke", "0x42BF8A85": "minigun", "0x7F7497E5": "firework", "0x6D544C99": "railgun", "0x63AB0442": "hominglauncher", "0x781FE4A": "compactlauncher", "0xB62D1F67": "rayminigun", "0x93E220BD": "grenade", "0xA0973D5E": "bzgas", "0xFDBC8A50": "smokegrenade", "0x497FACC3": "flare", "0x24B17070": "molotov", "0x2C3731D9": "stickybomb", "0xAB564B93": "proxmine", "0x787F0BB": "snowball", "0xBA45E8B8": "pipebomb", "0x23C9F95C": "ball", "0x34A67B97": "petrolcan", "0x60EC506": "fireextinguisher", "0xFBAB5776": "parachute", "0xBA536372": "hazardcan", "0x5A96BA4": "combatshotgun", "0x57A4368C": "gadgetpistol", "0x9D1F17E6": "militaryrifle" };


/* 
 * MODO DE DISPARO DEL ARMA
 */
const localPlayer = mp.players.local;

const firingModes = {
    Auto: 0,
    Burst: 1,
    Single: 2,
    Safe: 3
};

const nombreModosDisparo = ["AUTO", "RÁFAGA", "ÚNICO", "SEGURO"];

const ignoredWeaponGroups = [ // Las armas en estos grupos son completamente ignoradas.
    mp.game.joaat("GROUP_UNARMED"), mp.game.joaat("GROUP_MELEE"), mp.game.joaat("GROUP_FIREEXTINGUISHER"), mp.game.joaat("GROUP_PARACHUTE"), mp.game.joaat("GROUP_STUNGUN"),
    mp.game.joaat("GROUP_THROWN"), mp.game.joaat("GROUP_PETROLCAN"), mp.game.joaat("GROUP_DIGISCANNER"), mp.game.joaat("GROUP_HEAVY")
];

const burstFireAllowedWeapons = [mp.game.joaat("WEAPON_APPISTOL")]; // if a weapon's group is already in burstFireAllowedGroups, don't put it here
const burstFireAllowedGroups = [mp.game.joaat("GROUP_SMG"), mp.game.joaat("GROUP_MG"), mp.game.joaat("GROUP_RIFLE")];

const singleFireBlacklist = [ // Las armas aquí no pueden usar el modo de disparo único
    mp.game.joaat("WEAPON_STUNGUN"), mp.game.joaat("WEAPON_FLAREGUN"), mp.game.joaat("WEAPON_MARKSMANPISTOL"), mp.game.joaat("WEAPON_REVOLVER"), mp.game.joaat("WEAPON_REVOLVER_MK2"),
    mp.game.joaat("WEAPON_DOUBLEACTION"), mp.game.joaat("WEAPON_PUMPSHOTGUN"), mp.game.joaat("WEAPON_PUMPSHOTGUN_MK2"), mp.game.joaat("WEAPON_SAWNOFFSHOTGUN"), mp.game.joaat("WEAPON_BULLPUPSHOTGUN"),
    mp.game.joaat("WEAPON_MUSKET"), mp.game.joaat("WEAPON_DBSHOTGUN"), mp.game.joaat("WEAPON_SNIPERRIFLE"), mp.game.joaat("WEAPON_HEAVYSNIPER"), mp.game.joaat("WEAPON_HEAVYSNIPER_MK2")
];

// Funciones
const isWeaponIgnored = (weaponHash) => {
    return ignoredWeaponGroups.indexOf(mp.game.weapon.getWeapontypeGroup(weaponHash)) > -1;
};

const canWeaponUseBurstFire = (weaponHash) => {
    return burstFireAllowedGroups.indexOf(mp.game.weapon.getWeapontypeGroup(weaponHash)) > -1 ? true : (burstFireAllowedWeapons.indexOf(weaponHash) > -1);
};

const canWeaponUseSingleFire = (weaponHash) => {
    return singleFireBlacklist.indexOf(weaponHash) == -1;
};

const drawTextAligned = (text, drawX, drawY, font, color, scale) => {
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale, scale);
    mp.game.ui.setTextColour(color[0], color[1], color[2], color[3]);
    mp.game.ui.setTextRightJustify(true);
    mp.game.ui.setTextWrap(0, drawX);
    mp.game.invoke("0x2513DFB0FB8400FE"); // SET_TEXT_OUTLINE
    mp.game.ui.drawText(drawX, drawY);
};

// Variables
let currentWeapon = localPlayer.weapon;
let ignoreCurrentWeapon = isWeaponIgnored(currentWeapon);
let weaponConfig = {};
let lastWeaponConfigUpdate = 0;

// Estos son para el arma actual
var modoDisparoActual = 0;
let curBurstShots = 0;

// Cargar audio mp para el sonido del clic
mp.game.audio.setAudioFlag("LoadMPData", true);

let municionAnterior = null;
mp.events.add("render", () => {

    if (!logueado) return;

    if (localPlayer.weapon != currentWeapon) {
        // playerWeaponChange cliente cuando ...
        currentWeapon = localPlayer.weapon;
        ignoreCurrentWeapon = isWeaponIgnored(currentWeapon);

        modoDisparoActual = weaponConfig[currentWeapon] === undefined ? firingModes.Auto : weaponConfig[currentWeapon];
        curBurstShots = 0;
    }

    if (!ignoreCurrentWeapon)
    {
        if (modoDisparoActual != firingModes.Auto) {
            if (modoDisparoActual == firingModes.Burst) {
                // Manejar fuego de ráfaga
                if (localPlayer.isShooting()) curBurstShots++;
                if (curBurstShots > 0 && curBurstShots < 3) mp.game.controls.setControlNormal(0, 24, 1.0);

                if (curBurstShots == 3) {
                    mp.game.player.disableFiring(false);
                    if (mp.game.controls.isDisabledControlJustReleased(0, 24)) curBurstShots = 0;
                }

                if (localPlayer.isReloading()) curBurstShots = 0;
            } else if (modoDisparoActual == firingModes.Single) {
                // Manejar un solo fuego
                if (mp.game.controls.isDisabledControlPressed(0, 24)) mp.game.player.disableFiring(false);
            } else if (modoDisparoActual == firingModes.Safe) {
                // Manejar seguro
                mp.game.player.disableFiring(false);
                if (mp.game.controls.isDisabledControlJustPressed(0, 24)) mp.game.audio.playSoundFrontend(-1, "Faster_Click", "RESPAWN_ONLINE_SOUNDSET", true);
            }
        }
    }

    if (hudOculto) return;

    if (player_local.vehicle) {
        let vehiculo = player_local.vehicle;
    
        if (vehiculo.propiedades) {
            if (!esBici(vehiculo)) {
                cef_hud.ejecutarCef(hud_cefId, `setFuel(${(esVehiculoElectrico(vehiculo) ? 1 : 0)}, ${gasolina})`);
                cef_hud.ejecutarCef(hud_cefId, `setKm(${kilometros})`);
            }
        }
    
        cef_hud.ejecutarCef(hud_cefId, `setSpeed(${(vehiculo.getSpeed() * 3.6).toFixed(0)})`);
        cef_hud.ejecutarCef(hud_cefId, `setDamage(${Math.floor(vida_vehiculo_jugador / 10)})`);
    }

    if (arma) {
        // console.log("Weapon: " + player_local.weapon)
        // console.log("Cargador: " + player_local.getAmmoInClip(player_local.weapon))
        // console.log("Munición: " + player_local.getWeaponAmmo(player_local.weapon))
        //let a = mp.game.invoke("0x015A522136D7F951", player_local.handle, player_local.weapon);
        //let b = null;
        //let c = mp.game.invoke("0x2E1202248937775C", player_local.handle, player_local.weapon, b);
        //c = player_local.getAmmoInClip(player_local.weapon);
        // mp.gui.chat.push(": " + a + " || " + c + " -> " + c);
        /*let municion = player_local.getAmmoInClip(player_local.weapon);
        if(municion == null)
        {
            municion = municionAnterior;
        }
        else
        {
            municionAnterior = municion;
        }*/
        if(!recargando) actualizarMunicion(armaActiva.cantidad, /*a*/armaActiva.totalBalas);
    }
});

// Tecla COMA - Cambiar el modo de despido
mp.keys.bind(0xBC, false, () => {
    if (!logueado) return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto) return;
    if (navegador != null) return;
    if (cantidad_cefs > 0) return;
    if (ignoreCurrentWeapon) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;

    let newFiringMode = modoDisparoActual + 1;
    if (newFiringMode > firingModes.Safe) newFiringMode = firingModes.Auto;

    if (newFiringMode == firingModes.Burst) {
        // Cambiado a ráfaga, compruebe si el arma admite ráfagas de fuego. si no, salta a modo seguro
        if (!canWeaponUseBurstFire(currentWeapon)) newFiringMode = canWeaponUseSingleFire(currentWeapon) ? firingModes.Single : firingModes.Safe;
    } else if (newFiringMode == firingModes.Single) {
        // Cambiado a simple, compruebe si el arma admite un solo disparo. si no, salta a modo seguro
        if (!canWeaponUseSingleFire(currentWeapon)) newFiringMode = firingModes.Safe;
    }

    if (modoDisparoActual != newFiringMode) {
        modoDisparoActual = newFiringMode;
        curBurstShots = 0;
        lastWeaponConfigUpdate = Date.now();

        mp.game.audio.playSoundFrontend(-1, "Faster_Click", "RESPAWN_ONLINE_SOUNDSET", true);
        weaponConfig[currentWeapon] = modoDisparoActual;

        mp.events.call("hud:modo_disparo", nombreModosDisparo[modoDisparoActual]);
    }
});

// mp.events.add("playerCommand", (command) => {
//     const args = command.split(/[ ]+/);
//     const commandName = args[0];

//     args.shift();

//     if (commandName === "hudminimap") {
//         if (!logueado) return;
//         mostrarAvisoMinimapa('fd', 'Centralita',"Avisos", 'Hay nuevos avisos, utiliza /avisos para poder verlos', 5000);
//     }

//     if (commandName === "manguera2") {
//         mp.objects.new(mp.game.joaat("w_am_hose"), player_local.position, { rotation: new mp.Vector3(0.0, 0.0, -146.5), alpha: 255, dimension: 0 });
//     }

//     if (commandName === "manguera3") {
//         mp.objects.new(-511501345, player_local.position, { rotation: new mp.Vector3(0.0, 0.0, -146.5), alpha: 255, dimension: 0 });
//     }

//     if (commandName === "manguera4") {
//         mp.objects.new(3783465951, player_local.position, { rotation: new mp.Vector3(0.0, 0.0, -146.5), alpha: 255, dimension: 0 });
//     }

// });
}