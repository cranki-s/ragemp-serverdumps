{
var cef_tuning = require("./LURP/cef.js");
var tuning_cefId = -1;

var motor_real = 0;
var transmision_real = 0;

const opcionesMenuTuning = [
    ["Alerones", "Alerón", 0, 399, "Tapas de correa", "Tapa"],
    ["Parachoques delanteros", "Parachoque", 1, 400, "Guardabarros delanteros", "Modelo"],
    ["Parachoques traseros", "Parachoque", 2, 401, "Guardabarros traseros", "Modelo"],
    ["Faldones laterales", "Faldón", 3, 403, "Filtros de aire", "Filtro"],
    ["Tubos de escape", "Tubo de escape", 4, 404, "Tubos de escape", "Tubo de escape"],
    ["Jaulas antivuelco", "Jaula", 5, 405, "Estetica del motor", "Motor"],
    ["Rejillas", "Rejilla", 6, 406, "Varios", "Vario"],
    ["Capós", "Capó", 7, 407, "Asientos", "Asiento"],
    ["Guardabarros", "Guardabarros", 8, 408, "Palancas de arranque", "Palanca"],
    ["Guardabarros derechos", "Guardabarros", 9, 409, "Respaldos asiento", "Respaldo"],
    ["Techos", "Techo", 10, 410, "Depositos", "Deposito"],
    ["Motores", "Motor", 11, 411, "Motores", "Motor"],
    ["Frenos", "Freno", 12, 412, "Frenos", "Freno"],
    ["Transmisiones", "Transmisión", 13, 413, "Transmisiones", "Transmisión"],
    ["Claxons", "Claxon", 14, 414, "Claxons", "Claxon"],
    ["Suspensiones", "Suspensión", 15, 415, "Suspensiones", "Suspensión"],
    ["Armaduras", "Armadura", 16, 417, "Armaduras", "Armadura"],
    ["UNK17", "UNK17", 17, 535, "UNK17", "UNK17"],
    ["Turbos", "Turbo", 18, 418, "Turbos", "Turbo"],
    ["UNK19", "UNK19", 19, 536, "UNK19", "UNK19"],
    ["Humo de neumáticos", "Humo", 20, 537, "Humo de neumáticos", "Humo"],
    ["UNK21", "UNK21", 21, 552, "UNK21", "UNK21"],
    ["Xenones", "Xenón", 22, 419, "Xenones", "Xenón"],
    ["Ruedas", "Rueda", 23, 420, "Ruedas", "Rueda"],
    ["Ruedas", "Rueda", 24, 421, "Ruedas traseras", "Rueda trasera"],
    ["Portaplacas", "Portaplaca", 25, 538, "Portaplacas", "Portaplaca"],
    ["Matriculas", "Matricula", 26, 422, "Matriculas", "Matricula"],
    ["Tapicerías", "Tapicería", 27, 423, "Tapicerías", "Tapicería"],
    ["Adornos", "Adorno", 28, 424, "Adornos", "Adorno"],
    ["Salpicaderos", "Salpicadero", 29, 539, "Salpicaderos", "Salpicadero"],
    ["Diseño de diales", "Dial", 30, 425, "Diseño de diales", "Dial"],
    ["Altavoces de las puertas", "Altavoz", 31, 540, "Altavoces de las puertas", "Altavoz"],
    ["Asientos", "Asiento", 32, 541, "Asientos", "Asiento"],
    ["Volantes", "Volante", 33, 426, "Volantes", "Volante"],
    ["Palancas de cambio", "Palanca", 34, 427, "Palancas de cambio", "Palanca"],
    ["Placas", "Placa", 35, 428, "Placas", "Placa"],
    ["Altavoces", "Altavoz", 36, 542, "Altavoces", "Altavoz"],
    ["Maletero", "Maletero", 37, 553, "Maletero", "Maletero"], //UNK37
    ["Hidráulicos", "Hidráulico", 38, 429, "Hidráulicos", "Hidráulico"],
    ["Bloque del motor", "Bloque", 39, 543, "Bloque del motor", "Bloque"],
    ["Turbos", "Turbo", 40, 430, "Turbos", "Turbo"],
    ["Puntales", "Puntal", 41, 544, "Puntales", "Puntal"],
    ["Cubiertas para ruedas", "Cubierta", 42, 545, "Cubiertas para ruedas", "Cubierta rueda"],
    ["Antenas", "Antena", 43, 546, "Antenas", "Antena"],
    ["Embellecedores", "Embellecedor", 44, 551, "Embellecedores", "Embellecedor"],
    ["Tanques", "Tanque", 45, 547, "Tanques", "Tanque"],
    ["Tintes de ventanillas", "Tinte", 46, 431, "Tintes de ventanillas", "Tinte"],
    ["UNK47", "UNK47", 47, 548, "UNK47", "UNK47"],
    ["Vinilos", "Vinilo", 48, 432, "Vinilos", "Vinilo"],
    ["UNK49", "UNK49", 49, 549, "UNK49", "UNK49"],
    ["Neones", "Neón", 50, 550, "Neones", "Neón"],
    ["Nacarados", "Nacarado", 51, 646, "Nacarados", "Nacarado"],
	["Color de Llantas", "Color", 52, 670, "Color de llantas", "Color llanta"]
];

//Aunque se repite en las piezas el tinte de ventanillas habria que mirarlo si esa opcion sale alguna vez, 
//tu añadiste la 51 como tintado de los cristales que es lo mismo que la opcion 46, de todas formas para la 51 compartiria misma opcion de la db la 431

const tiposRuedas = [
  ["Deportivas", 50],
  ["Muscle", 36],
  ["Lowrider", 30],
  ["SUV", 38],
  ["Todoterreno", 35],
  ["Tuner", 48],
  ["Moto", 48],
  ["Gama alta", 40],
  ["Benny's Original", 217],
  ["Benny's Bespoke", 217],
  ["Urbanas", 210],
  ["Carrera", 210]
];

var Items = {};

var idJugadorTuning;
var vehiculoJugador = null;
var vehiculo = null;
var modsVehiculo;
// var piezasNegocio = null;
var posicionCamaraPreview = null;
var sceneryCamera = null;
var timerCamara;
var esMecanico;
var urlApi;
var apiKey;

let cambiarHudTaller = false;

let llaveNegocio = -1;

mp.events.add('iniciarTuning', function (jugador, idNegocio, mecanico, URL_API, API_KEY) {
    idJugadorTuning = jugador;
    esMecanico = mecanico;
    urlApi = URL_API;
    apiKey = API_KEY;

    vehiculoJugador = null;
    vehiculo = null;
    llaveNegocio = -1;

    iniciarTuning(false, idNegocio);
    // Cargamos los precios y la disponibilidad de las piezas antes de iniciar el tuning
    /*https.get('https://api.lu-rp.es/negocios/stock/' + parseInt(idNegocio), (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            piezasNegocio = JSON.parse(data);
            iniciarTuning();
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });*/
    /*$.ajax({
        dataType: 'json',
        url: 'https://api.lu-rp.es/negocios/stock/' + parseInt(idNegocio),
        async: false
    })
    .done(function(data) {
        piezasNegocio = JSON.parse(data);
        iniciarTuning();
    });*/
});

/**
 * Si no existe el vehiculo clonado para tuneo carga los mods, lo crea y le aplica todos los mods
 * Si existe el vehiculo clonado para tuneo crea las camaras y ejecuta el cef de tuneo
 */
function iniciarTuning(existeVehTuneo = false, idNegocio = -1) {
    if (!existeVehTuneo){
        // Primero vamos a crear un coche igual al del jugador para poder tunear a partir de él
        vehiculoJugador = player_local.vehicle;
        if (!vehiculoJugador || vehiculoJugador == null) return;

        llaveNegocio = idNegocio;

        modsVehiculo = cargarMods(vehiculoJugador);
        crearVehiculo(vehiculoJugador, modsVehiculo);
    }
    else {
        if (vehiculo && llaveNegocio != -1) {
            crearCameras();
    
            if (tuning_cefId >= 0) {
                cef_tuning.cerrarCef(tuning_cefId, false);
                tuning_cefId = -1;
            }
    
            resetearTuning();
    
            //obtenemos el precio por el cual se vende en concesionarios este vehículo
            let precio = 0;
            if (vehiculoJugador.propiedades) {
                if (vehiculoJugador.propiedades.precio) {
                    precio = vehiculoJugador.propiedades.precio;
                }
            }
    
            cambiarHudTaller = !hudOculto; // Nos permite ocultar y mostrar el hud si ya de por si lo tiene activo
    
            //Ocultar hud
            if (cambiarHudTaller == true) {
                mp.game.ui.displayRadar(false);
                mp.game.ui.displayHud(false);
                mp.gui.chat.show(false);
    
                mp.events.call("hud:estado_hud");
            }
    
            if (tuning_cefId < 0) {
                tuning_cefId = cef_tuning.crearCef("package://LURP/cef/mecanico/tuning.html", {
                    puedeCerrar: false,
                    mostrarCursor: true
                });
        
                cef_tuning.ejecutarCef(tuning_cefId, "addTunes(" + llaveNegocio + ", " + JSON.stringify(modsVehiculo) + ", '" + urlApi + "/negocios/stock/" + llaveNegocio + "', '" + apiKey + "', '" + _k + "', '" +precio + "');");
                cef_tuning.ejecutarCef(tuning_cefId, "addRuedas(" + JSON.stringify(cargarRuedas(vehiculo)) + ");");
                llaveNegocio = -1; // Una vez usada la reseteamos a su valor por defecto
            }
        }
    }
}

/**
 * Funcion que crea el vehiculo clon para la preview del tuneo
 */
function crearVehiculo(vehiculoJugador, modsVehiculo) {
    if (vehiculoJugador) {
        let colorVehiculo = null;
        let colorVehiculoPrimarioCustom = null;
        let colorVehiculoSecundarioCustom = null;

        if (vehiculoJugador.getIsPrimaryColourCustom()) {
            colorVehiculoPrimarioCustom = vehiculoJugador.getCustomPrimaryColour(0, 0, 0);
        }
        if (vehiculoJugador.getIsSecondaryColourCustom()) {
            colorVehiculoSecundarioCustom = vehiculoJugador.getCustomSecondaryColour(0, 0, 0);
        }

        colorVehiculo = vehiculoJugador.getColours(0, 0);
        
        // Congelamos y volvemos invisible el vehiculo original
        vehiculoJugador.setModKit(0);
        vehiculoJugador.setVisible(false, false);
        vehiculoJugador.freezePosition(true);

        let wheelType = vehiculoJugador.getWheelType();

        // Creamos el vehiculo clon
        let vehiculoTuning = mp.vehicles.new(
            vehiculoJugador.model, 
            new mp.Vector3(vehiculoJugador.position.x, vehiculoJugador.position.y, vehiculoJugador.position.z + 1.0), {
                heading: 125,
                numberPlate: mp.game.invokeString("0x7CE1CCB9B293020E", vehiculoJugador.handle),
                alpha: 255,
                locked: false,
                engine: false,
                dimension: player_local.dimension
            }
        );

        // Esperamos a tener el vehiculo creado (handle != 0, el evento de streamIn no funciona con coches creados en cliente en tu misma dimension)
        let count = 0;
        let cocheCreado = setInterval(() => {
            if (vehiculoTuning && typeof vehiculoTuning.handle === "number" && vehiculoTuning.handle != 0){
                // Evitamos que se siga ejecutando el intervalo
                clearInterval(cocheCreado);
                cocheCreado = null;

                // Quitamos colisiones con todos los vehiculos cercanos y con nosotros mismos
                // Parece raro pero si aplicamos la funcion del reves entonces solo se quita la colision de la ultima llamda a la funcion, las demas se "reactivan"
                player_local.setNoCollision(vehiculoTuning.handle, false);
                mp.vehicles.forEachInStreamRange(function (vehicle) {
                    if (vehicle != vehiculoTuning) {
                        vehicle.setNoCollision(vehiculoTuning.handle, false);
                    }
                });

                // Congelamos el coche y lo colocamos correctamente en el suelo
                vehiculoTuning.freezePosition(true);
                vehiculoTuning.setOnGroundProperly(5.0);

                // Aplicamos diferentes tuneos del coche original al coche clon
                vehiculoTuning.setWheelType(wheelType);
                vehiculoTuning.setColours(colorVehiculo.colorPrimary, colorVehiculo.colorSecondary);

                if (colorVehiculoPrimarioCustom) {
                    vehiculoTuning.setCustomPrimaryColour(colorVehiculoPrimarioCustom.r, colorVehiculoPrimarioCustom.g, colorVehiculoPrimarioCustom.b);
                }
                
                if (colorVehiculoSecundarioCustom) {
                    vehiculoTuning.setCustomSecondaryColour(colorVehiculoSecundarioCustom.r, colorVehiculoSecundarioCustom.g, colorVehiculoSecundarioCustom.b);
                }      
                
                for (modVehiculo of modsVehiculo) {
                    if ((parseInt(modVehiculo.Value) == 23 || parseInt(modVehiculo.Value) == 24) && mp.game.vehicle.isThisModelABike(vehiculoTuning.getModel())) { // Ruedas en una moto
                        vehiculoTuning.setWheelType(6);
                        vehiculoTuning.setMod(23, parseInt(modVehiculo.Equipada));
                        vehiculoTuning.setMod(24, parseInt(modVehiculo.Equipada));
                    }
                    else {
                        vehiculoTuning.setMod(
                            parseInt(modVehiculo.Value),
                            parseInt(modVehiculo.Equipada)
                        );
                    }
                }

                let extraColors = vehiculoJugador.getExtraColours(1, 1);

                vehiculoTuning.setExtraColours(parseInt(extraColors.pearlescentColor), parseInt(extraColors.wheelColor));

                // Aplicamos colores de cuadro y salpicadero del vehiculo original
                if ("number" === typeof vehiculoJugador.propiedades.colorcuadro && vehiculoJugador.propiedades.colorcuadro >= 0 && vehiculoJugador.propiedades.colorcuadro < 160)
                    mp.game.invoke("0x6089CDF6A57F326C", vehiculoTuning.handle, vehiculoJugador.propiedades.colorcuadro);
        
                if ("number" === typeof vehiculoJugador.propiedades.colorsalpicadero && vehiculoJugador.propiedades.colorsalpicadero >= 0 && vehiculoJugador.propiedades.colorsalpicadero < 160)
                    mp.game.invoke("0xF40DD601A65F7F19", vehiculoTuning.handle, vehiculoJugador.propiedades.colorsalpicadero);

                // Aplicamos la misma suciedad que tiene el vehiculo original
                let floatSuciedad = 0.0;
                if (vehiculoJugador.propiedades && typeof vehiculoJugador.propiedades.suciedad === "number") {
                    floatSuciedad = vehiculoJugador.propiedades.suciedad;
                }
                vehiculoTuning.setDirtLevel(floatSuciedad);

                // El motor tiene que estar encendido para que se puedan ver los neones
                vehiculoTuning.setEngineOn(true, true, true);
                
                vehiculo = vehiculoTuning;

                // Iniciamos el tuneo -> se crean camaras y se muestra el cef
                iniciarTuning(true);
                return;
            }
            else{
                count++;
                if (count >= 100){
                    // Evitamos que se siga ejecutando el intervalo
                    clearInterval(cocheCreado);
                    cocheCreado = null;
                    logError("TUNEO", "El vehículo no existe");
                    return;
                }
            }
        }, 15);
    }
}

//W
var rot;
mp.keys.bind(0x57, true, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (timerCamara != null) {
            clearInterval(timerCamara);
            timerCamara = null;
        }
        timerCamara = setInterval(() => {
            if (vehiculo != null) {
                posicionCamaraPreview.z += 0.08;
                sceneryCamera.setParams(posicionCamaraPreview.x, posicionCamaraPreview.y, posicionCamaraPreview.z, rot.x, rot.y, rot.z, 70, 1, 1, 1, 2);
            }
        }, 10)
    }
});
mp.keys.bind(0x57, false, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (timerCamara != null) {
            clearInterval(timerCamara);
            timerCamara = null;
        }
    }
});
//S
mp.keys.bind(0x53, true, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (timerCamara != null) {
            clearInterval(timerCamara);
            timerCamara = null;
        }
        timerCamara = setInterval(() => {
            if (vehiculo != null) {
                posicionCamaraPreview.z -= 0.08;
                sceneryCamera.setParams(posicionCamaraPreview.x, posicionCamaraPreview.y, posicionCamaraPreview.z, rot.x, rot.y, rot.z, 70, 1, 1, 1, 2);
            }
        }, 10)

    }
});
mp.keys.bind(0x53, false, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (timerCamara != null) {
            clearInterval(timerCamara);
            timerCamara = null;
        }
    }
});

//D
mp.keys.bind(0x44, true, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (timerCamara != null) {
            clearInterval(timerCamara);
            timerCamara = null;
        }
        timerCamara = setInterval(() => {
            if (vehiculo != null) {
                posicionCamaraPreview.x += 0.08;
                sceneryCamera.setParams(posicionCamaraPreview.x, posicionCamaraPreview.y, posicionCamaraPreview.z, rot.x, rot.y, rot.z, 70, 1, 1, 1, 2);
            }
        }, 10)
    }
});

mp.keys.bind(0x44, false, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (timerCamara != null) {
            clearInterval(timerCamara);
            timerCamara = null;
        }
    }
});

//A
mp.keys.bind(0x41, true, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (timerCamara != null) {
            clearInterval(timerCamara);
            timerCamara = null;
        }
        timerCamara = setInterval(() => {
            if (vehiculo != null) {
                posicionCamaraPreview.x -= 0.08;
                sceneryCamera.setParams(posicionCamaraPreview.x, posicionCamaraPreview.y, posicionCamaraPreview.z, rot.x, rot.y, rot.z, 70, 1, 1, 1, 2);
            }
        }, 10)

    }
});

mp.keys.bind(0x41, false, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (timerCamara != null) {
            clearInterval(timerCamara);
            timerCamara = null;
        }
    }
});

mp.keys.bind(0x45, true, function () {
    if (estaChatAbierto)
        return;
    if (vehiculo != null) {
        if (vehiculo.hood){
            vehiculo.hood = false;
            vehiculo.setDoorShut(4, true);
        } else {
            vehiculo.hood = true;
            vehiculo.setDoorOpen(4, false, true);
        }
    }
});


mp.events.add("zoomInCamaraTaller", () => {
    if (vehiculo != null) {
        posicionCamaraPreview.y += 0.15;
        sceneryCamera.setParams(posicionCamaraPreview.x, posicionCamaraPreview.y, posicionCamaraPreview.z, rot.x, rot.y, rot.z, 70, 1, 1, 1, 2);
    }
})
mp.events.add("zoomOutCamaraTaller", () => {
    if (vehiculo != null) {
        posicionCamaraPreview.y -= 0.15;
        sceneryCamera.setParams(posicionCamaraPreview.x, posicionCamaraPreview.y, posicionCamaraPreview.z, rot.x, rot.y, rot.z, 70, 1, 1, 1, 2);
    }
})
function crearCameras() {
    posicionCamaraPreview = vehiculo.position;
    posicionCamaraPreview.y -= 4.6;
    posicionCamaraPreview.z += 1.2;
    // sceneryCamera = mp.cameras.new("default", posicionCamaraPreview, (-3, 0, -0.6756696), 70);
    sceneryCamera = mp.cameras.new("default", posicionCamaraPreview, (-17, 0, 0), 70);
    sceneryCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);
    vehiculo.setHeading(vehiculo.getHeading() + 135);
    rot = sceneryCamera.getRot(2);
    rot.x = -17;
    sceneryCamera.setParams(posicionCamaraPreview.x, posicionCamaraPreview.y, posicionCamaraPreview.z, rot.x, rot.y, rot.z, 70, 1, 1, 1, 2);
}

function cargarMods(vehicle) {
    let clase = vehicle.getClass();
    if(clase == 8)
    {
        var mods = [];
        for (let i = 0; i < 50; i++) {
            //No parecen hacer nada los omitimos
            if(i == 17 || i == 19 || i == 21 || i == 24 || i == 47 || i == 49) continue;

            if (!vehicle) return mods;
            if (vehicle.getNumMods(i) == 0) continue;
            if (saltarIndexArmas(i, vehicle.model)) continue;
            let opciones = [];
            let piezaEquipada = -1;
            opciones.push(["De serie", -1, vehicle.getMod(i) == -1 ? true : false]);
            let indiceBorrar = -1; // Pdebido al sistema hay que tener esto porque hay algunas veces que cumple ambas condiciones y solo debería la ultima
            for (let j = 0; j < vehicle.getNumMods(i); j++) {
                if (saltarIndexDerby(i, j, vehicle.model)) continue;
                // Esto es debido a que en la potencia y la transmisión no le colocamos la pieza como tal sino que solo le asignamos unos valores
                switch (i) {
                    case 11:
                        let tiene = false;
                        if(j == 0 && motor_real >= 5 && motor_real < 10){
                            opciones[0][2] = false;
                            tiene = true;
                            piezaEquipada = 0;
                        }
                        else if(j == 1 && motor_real >= 10 && motor_real < 15){
                            opciones[0][2] = false;
                            tiene = true;
                            piezaEquipada = 1;         
                        }
                        else if(j == 2 && motor_real >= 15 && motor_real < 20){
                            tiene = true;
                            opciones[0][2] = false;
                            piezaEquipada = 2;
                        }
                        else if(j == 3 && motor_real >= 20){
                            opciones[0][2] = false;
                            indiceBorrar = opciones.length;
                            tiene = true;
                            piezaEquipada = 3;
                        }
                        else if(j == 4 && motor_real >= 25){
                            if(indiceBorrar != -1) opciones[indiceBorrar][2] = false;
                            tiene = true;
                            piezaEquipada = 4;
                        }
                        opciones.push([
                            opcionesMenuTuning[i][5] + " " + (j + 1),
                            j,
                            tiene
                        ]);
                        break;
                    case 13:
                        let tiene2 = false;
                        if(j == 0 && transmision_real >= 1.05 && transmision_real < 1.1){
                            opciones[0][2] = false;
                            tiene2 = true;
                            piezaEquipada = 0;
                        }
                        else if(j == 1 && transmision_real >= 1.1 && transmision_real < 1.15){
                            opciones[0][2] = false;
                            tiene2 = true;
                            piezaEquipada = 1;         
                        }
                        else if(j == 2 && transmision_real >= 1.15){
                            opciones[0][2] = false;
                            indiceBorrar = opciones.length;
                            tiene2 = true;
                            piezaEquipada = 2;
                        }
                        else if(j == 3 && transmision_real >= 1.2){
                            if (indiceBorrar != -1) opciones[indiceBorrar][2] = false;
                            tiene2 = true;
                            piezaEquipada = 3;
                        }
                        opciones.push([
                            opcionesMenuTuning[i][5] + " " + (j + 1),
                            j,
                            tiene2
                        ]);
                        break;
                    default:
                        opciones.push([
                            opcionesMenuTuning[i][5] + " " + (j + 1),
                            j,
                            vehicle.getMod(i) == j ? true : false
                        ]);
                        if (vehicle.getMod(i) == j) {
                            piezaEquipada = j;
                        }
                        break;
                }
            }
            mods.push({
                Title: opcionesMenuTuning[i][4],
                Value: opcionesMenuTuning[i][2],
                Items: opciones,
                Equipada: piezaEquipada,
                Id: opcionesMenuTuning[i][3]
                //Precio: getPiezaPrecio(opcionesMenuTuning[i][3]),
                //Cantidad: getPiezaCantidad(opcionesMenuTuning[i][3])
            });
        }
        let extraColors = vehicle.getExtraColours(1, 1);
        let colorllantaVehiculo = parseInt(extraColors.wheelColor);
        let coloresLlanta = [];
        coloresLlanta.push(["Ninguno", 0, colorllantaVehiculo == 0]);
        for (let j = 1; j < 160; j++) {
            coloresLlanta.push(["Color " + j, j, colorllantaVehiculo == j]);
        }
        mods.push({
            Title: "Color llanta",
            Value: 52,
            Items: coloresLlanta,
            Equipada: colorllantaVehiculo,
            Id: 670
        })
        let nacaradoVehiculo = parseInt(extraColors.pearlescentColor);
        let colores = [];
        colores.push(["Ninguno", 0, nacaradoVehiculo == 0]);
        for (let j = 1; j < 160; j++) {
            colores.push(["Color " + j, j, nacaradoVehiculo == j]);
        }
        mods.push({
            Title: "Color nacarado",
            Value: 51,
            Items: colores,
            Equipada: nacaradoVehiculo,
            Id: 646
            //Precio: getPiezaPrecio(431),
            //Cantidad: getPiezaCantidad(431)
        });
        return mods;
    }
    else
    {
        var mods = [];
        for (let i = 0; i < 50; i++) {
            //No parecen hacer nada los omitimos
            if(i == 17 || i == 19 || i == 21 || i == 47 || i == 49) continue;

            if (!vehicle) return mods;
            if (vehicle.getNumMods(i) == 0) continue;
            if (saltarIndexArmas(i, vehicle.model)) continue;
            let opciones = [];
            let piezaEquipada = -1;
            opciones.push(["De serie", -1, vehicle.getMod(i) == -1 ? true : false]);
            let indiceBorrar = -1; // Pdebido al sistema hay que tener esto porque hay algunas veces que cumple ambas condiciones y solo debería la ultima
            for (let j = 0; j < vehicle.getNumMods(i); j++) {
                if (saltarIndexDerby(i, j, vehicle.model)) continue;
                switch (i) {
                    case 11:
                        let tiene = false;
                        if(j == 0 && motor_real >= 5 && motor_real < 10){
                            opciones[0][2] = false;
                            tiene = true;
                            piezaEquipada = 0;
                        }
                        else if (j == 1 && motor_real >= 10 && motor_real < 15){
                            opciones[0][2] = false;
                            tiene = true;
                            piezaEquipada = 1;         
                        }
                        else if (j == 2 && motor_real >= 15 && motor_real < 20){
                            opciones[0][2] = false;
                            tiene = true;
                            piezaEquipada = 2;
                        }
                        else if (j == 3 && motor_real >= 20){
                            opciones[0][2] = false;
                            indiceBorrar = opciones.length;
                            tiene = true;
                            piezaEquipada = 3;
                        }
                        else if (j == 4 && motor_real >= 25){
                            if(indiceBorrar != -1) opciones[indiceBorrar][2] = false;
                            tiene = true;
                            piezaEquipada = 4;
                        }
                        opciones.push([
                            opcionesMenuTuning[i][5] + " " + (j + 1),
                            j,
                            tiene
                        ]);
                        break;
                    case 13:
                        let tiene2 = false;
                        if (j == 0 && transmision_real >= 1.05 && transmision_real < 1.1){
                            opciones[0][2] = false;
                            tiene2 = true;
                            piezaEquipada = 0;
                        }
                        else if (j == 1 && transmision_real >= 1.1 && transmision_real < 1.15){
                            opciones[0][2] = false;
                            tiene2 = true;
                            piezaEquipada = 1;         
                        }
                        else if (j == 2 && transmision_real >= 1.15){
                            opciones[0][2] = false;
                            indiceBorrar = opciones.length;
                            tiene2 = true;
                            piezaEquipada = 2;
                        }
                        else if (j == 3 && transmision_real >= 1.2){
                            opciones[0][2] = false;
                            if(indiceBorrar != -1) opciones[indiceBorrar][2] = false;
                            tiene2 = true;
                            piezaEquipada = 3;
                        }
                        opciones.push([
                            opcionesMenuTuning[i][1] + " " + (j + 1),
                            j,
                            tiene2
                        ]);
                        break;
                    default:
                        opciones.push([
                            opcionesMenuTuning[i][1] + " " + (j + 1),
                            j,
                            vehicle.getMod(i) == j ? true : false
                        ]);
                        if (vehicle.getMod(i) == j) {
                            piezaEquipada = j;
                        }
                        break;
                }
            }
            mods.push({
                Title: opcionesMenuTuning[i][0],
                Value: opcionesMenuTuning[i][2],
                Items: opciones,
                Equipada: piezaEquipada,
                Id: opcionesMenuTuning[i][3]
                //Precio: getPiezaPrecio(opcionesMenuTuning[i][3]),
                //Cantidad: getPiezaCantidad(opcionesMenuTuning[i][3])
            });
        }
        let extraColors = vehicle.getExtraColours(1, 1);
        let colorllantaVehiculo = parseInt(extraColors.wheelColor);
        let coloresLlanta = [];
        coloresLlanta.push(["Ninguno", 0, colorllantaVehiculo == 0]);
        for (let j = 1; j < 160; j++) {
            coloresLlanta.push(["Color " + j, j, colorllantaVehiculo == j]);
        }
        mods.push({
            Title: "Color llanta",
            Value: 52,
            Items: coloresLlanta,
            Equipada: colorllantaVehiculo,
            Id: 670
        });
        let neonVehiculo = vehicle.getNeonLightsColour(1, 1, 1);
        let neonEquipado = true;
        if ((neonVehiculo.r == 0 && neonVehiculo.g == 0 && neonVehiculo.b == 0) || (neonVehiculo.r == 255 && neonVehiculo.g == 0 && neonVehiculo.b == 255)) {
            neonEquipado = false;
        }
        mods.push({
            Title: "Neones",
            Value: 50,
            Items: [
                ["Ninguno", -1, !neonEquipado],
                ["Completo", 0, neonEquipado]
            ],
            Equipada: vehicle.getNeonLightsColour(1, 1, 1),
            Id: 550
            //Precio: getPiezaPrecio(550),
            //Cantidad: getPiezaCantidad(550)
        });
        let tintVehiculo = vehicle.getWindowTint();
        mods.push({
            Title: "Tintado de los cristales",
            Value: 46,
            Items: [
                ["Ninguno", 0, tintVehiculo == 0],
                ["Negro puro", 1, tintVehiculo == 1],
                ["Humo oscuro", 2, tintVehiculo == 2],
                ["Humo brillante", 3, tintVehiculo == 3],
                ["Lima", 4, tintVehiculo == 4],
                ["Stock", 5, tintVehiculo == 5],
                ["Verde", 6, tintVehiculo == 6]
            ],
            Equipada: vehicle.getWindowTint(),
            Id: 431
            //Precio: getPiezaPrecio(431),
            //Cantidad: getPiezaCantidad(431)
        });
        let nacaradoVehiculo = parseInt(extraColors.pearlescentColor);
        let colores = [];
        colores.push(["Ninguno", 0, nacaradoVehiculo == 0]);
        for (let j = 1; j < 160; j++) {
            colores.push(["Color " + j, j, nacaradoVehiculo == j]);
        }
        mods.push({
            Title: "Color nacarado",
            Value: 51,
            Items: colores,
            Equipada: nacaradoVehiculo,
            Id: 646
            //Precio: getPiezaPrecio(431),
            //Cantidad: getPiezaCantidad(431)
        });
        return mods;
    }
}

function cargarRuedas(vehicle) {
    var ruedas = [];
    // Si es una moto solo cargamos la categoria 6
    if (mp.game.vehicle.isThisModelABike(vehicle.getModel())) {
        let opciones = [];
        for (let i = -1; i < 48; i++) {
            if (i == -1) {
                opciones.push(["De serie", 500, true]);
            } else {
                opciones.push(["Moto" + " " + (i + 1), i, vehicle.getMod(23) == i && vehicle.getWheelType() == 6 ? true : false]);
            }
        }
        ruedas.push({
            Title: "Moto",
            Value: 6,
            Active: vehicle.getWheelType() == 6 ? true : false,
            Items: opciones
        });
    }
    else {
        for ([index, tipoRueda] of tiposRuedas.entries()) {
            let opciones = [];
            for (let i = -1; i < tipoRueda[1]; i++) {
                if (i == -1) {
                    opciones.push(["De serie", 500, true]);
                } else {
                    opciones.push([tipoRueda[0] + " " + (i + 1), i, vehicle.getMod(23) == i && vehicle.getWheelType() == index ? true : false]);
                }
            }
            ruedas.push({
                Title: tipoRueda[0],
                Value: index,
                Active: vehicle.getWheelType() == index ? true : false,
                Items: opciones
            });
        }
    }
    return ruedas;
}


mp.events.add("vehiculo:establecer_valor_real", (json) => {
    let array = JSON.parse(json);
    motor_real = array[0];
    transmision_real = array[1];
})
/*function getPiezaPrecio(idPieza) {
    for (piezaNegocio of piezasNegocio) {
        if (piezaNegocio.objeto_id == idPieza) {
            return piezaNegocio.precio;
        }
    }
    return 0;
}

function getPiezaCantidad(idPieza) {
    for (piezaNegocio of piezasNegocio) {
        if (piezaNegocio.objeto_id == idPieza) {
            return piezaNegocio.cantidad;
        }
    }
    return 0;
}*/

function seleccionarOpcionTuning(categoria, opcion) {
    // Neones
    if (categoria == 50) {
        if (opcion == 0) {
            activarNeones();
        } else {
            desactivarNeones();
        }
    // Tintado de los cristales
    } else if (categoria == 46) {
        vehiculo.setWindowTint(parseInt(opcion));
    // Color nacarado
    } else if (categoria == 51) {
        let extraColors = vehiculo.getExtraColours(1, 1);
        vehiculo.setExtraColours(parseInt(opcion), parseInt(extraColors.wheelColor));
    } else if (categoria == 52) {
        let extraColors = vehiculo.getExtraColours(1, 1);
        vehiculo.setExtraColours(parseInt(extraColors.pearlescentColor), parseInt(opcion));
    } else {
        vehiculo.setMod(parseInt(categoria), parseInt(opcion));
    }

    // Si estamos en la categoria de Claxons, emitimos el sonido
    if (categoria == 14) {
        vehiculo.startHorn(10 * 1000, -1, true);
    }
}

function seleccionarRuedaTuning(categoria, rueda, veh = vehiculo) {
    let idCategoria = parseInt(categoria);
    let idRueda = parseInt(rueda);
    if (idRueda != 500)
    {
        // Si es una moto forzamos la ID 6 de ruedas y tambien ponemos el mod 24 (rueda trasera)
        if (mp.game.vehicle.isThisModelABike(veh.getModel())) {
            veh.setWheelType(6);
            veh.setMod(23, idRueda);
            veh.setMod(24, idRueda);
        }
        else {
            veh.setWheelType(idCategoria);
            veh.setMod(23, idRueda);
        }
    }
    else
    {
        veh.setWheelType(0);
        veh.removeMod(23);
        // Si es una moto tambien quitamos el mod 24 (rueda trasera)
        if (mp.game.vehicle.isThisModelABike(veh.getModel())) {
            veh.removeMod(24);
        }
    }
}

function seleccionarColorNeones(color, veh = vehiculo) {
    let rgbaColor = hexToRgbA(color);
    if (rgbaColor != null)
        veh.setNeonLightsColour(rgbaColor[0], rgbaColor[1], rgbaColor[2]);
}

function comprarTaller(jugador, cambios) {
    mp.events.callRemote("escoger_piezas_tuning", idJugadorTuning, cambios);
    cancelarTaller();
    //aplicarCambios(JSON.parse(cambios));
}

function aplicarCambios(cambios) {
    Object.entries(cambios).forEach(function([key, cambio]) {
        // En el caso de los neones
        if (key == 50) {
            if (cambio.valor != -1) {
                activarNeones(vehiculo);
                seleccionarColorNeones(cambio.valor, vehiculo);
            } else {
                desactivarNeones(vehiculo);
            }
        // Cristales tintados
        } else if (key == 46) {
            vehiculo.setWindowTint(parseInt(cambio.valor));
        // Color nacarado
        } else if (key == 51) {
            let extraColors = vehiculo.getExtraColours(1, 1);
            vehiculo.setExtraColours(parseInt(cambio.valor), parseInt(extraColors.wheelColor));
        } else if (key == 52) {
            let extraColors = vehiculo.getExtraColours(1, 1);
            vehiculo.setExtraColours(parseInt(extraColors.pearlescentColor), parseInt(cambio.valor));
        } else if (key == 23) {
            seleccionarRuedaTuning(cambio.valor[0], cambio.valor[1], vehiculo);
        }

        if (key == 23) {
            if (cambio.valor[1] == "500") {
                vehiculo.removeMod(parseInt(key));
            } else {
                vehiculo.setMod(parseInt(key), parseInt(cambio.valor[1]));
            }
        }
        else
        {
            if (cambio.valor == "-1") {
                vehiculo.removeMod(parseInt(key));
            } else {
                vehiculo.setMod(
                    parseInt(key),
                    parseInt(cambio.valor)
                );
            }
        }
    });
}

function cancelarTaller() {
    if (tuning_cefId >= 0) {
        cef_tuning.cerrarCef(tuning_cefId, false);
        tuning_cefId = -1;
    }
    resetearTuning();
    if (mp.vehicles.exists(vehiculo))
        vehiculo.destroy();
    vehiculo = null;
    mp.gui.cursor.visible = false;
    if(tipoMapa != 2) mp.game.ui.displayRadar(true);
    vehiculoJugador.setModKit(-1);
    vehiculoJugador.setVisible(true, true);
    vehiculoJugador.freezePosition(false);
    sceneryCamera.setActive(false);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    if (mp.cameras.exists(sceneryCamera))
        sceneryCamera.destroy();
    sceneryCamera = null;
    vehiculoJugador = null;

    //Mostrar hud
    if (cambiarHudTaller == true) {
        if (tipoMapa != 2) mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);

        mp.events.call("hud:estado_hud");
    }
}

var ultimoMovimiento = 0;

function rotarVehiculo(offsetX, offsetY) {
    if (offsetX < ultimoMovimiento) {
        vehiculo.setHeading(vehiculo.getHeading() - 1);
    } else if (offsetX > ultimoMovimiento) {
        vehiculo.setHeading(vehiculo.getHeading() + 1);
    }
    ultimoMovimiento = offsetX;
}

mp.events.add("tuning:seleccionarOpcion", seleccionarOpcionTuning);
mp.events.add("tuning:seleccionarRueda", seleccionarRuedaTuning);
mp.events.add("tuning:seleccionarColorNeones", seleccionarColorNeones);
mp.events.add("tuning:comprarTaller", comprarTaller);
mp.events.add("tuning:cancelarTaller", cancelarTaller);
mp.events.add("tuning:mostrar:preview", mostrarPreview);
mp.events.add("tuning:cerrar:preview", cerrarPreview);
//mp.events.add("tuning:rotarVehiculo", rotarVehiculo);

function activarNeones(veh = vehiculo) {
    veh.setNeonLightEnabled(2, true);
    veh.setNeonLightEnabled(3, true);
    veh.setNeonLightEnabled(0, true);
    veh.setNeonLightEnabled(1, true);
}

function desactivarNeones(veh = vehiculo) {
    veh.setNeonLightEnabled(2, false);
    veh.setNeonLightEnabled(3, false);
    veh.setNeonLightEnabled(0, false);
    veh.setNeonLightEnabled(1, false);
}

function resetearTuning() {
    if (modsVehiculo != null) {
        for (modVehiculo of modsVehiculo) {
            vehiculo.setMod(
                parseInt(modVehiculo.Value),
                parseInt(modVehiculo.Equipada)
            );

            if (modVehiculo.Value == 50) {
                vehiculo.setNeonLightsColour(
                    modVehiculo.Equipada.r,
                    modVehiculo.Equipada.g,
                    modVehiculo.Equipada.b
                );
            }

            if (modVehiculo.Value == 46) {
                vehiculo.setWindowTint(parseInt(modVehiculo.Equipada));
            }

            if (modVehiculo.Value == 51) {
                let extraColors = vehiculo.getExtraColours(1, 1);
                vehiculo.setExtraColours(parseInt(modVehiculo.Equipada), parseInt(extraColors.wheelColor));
            }

            if (modVehiculo.Value == 52) {
                let extraColors = vehiculo.getExtraColours(1, 1);
                vehiculo.setExtraColours(parseInt(extraColors.pearlescentColor), parseInt(modVehiculo.Equipada));
            }
        }
    }
}

function hexToRgbA(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
    }

    return null; // Si el hex recibido no es valido
    //throw new Error("Bad Hex:" + " " + hex);
}

function mostrarPreview(cambiosArray) {

    vehiculoJugador = mp.players.local.vehicle;

    if(vehiculoJugador != null)
    {
        if(vehiculoJugador)
        {
            // Primero vamos a crear un coche igual al del jugador para poder tunear a partir de él
            modsVehiculo = cargarMods(vehiculoJugador);
            crearVehiculo(vehiculoJugador, modsVehiculo);
            if (tuning_cefId < 0) {
                tuning_cefId = cef_tuning.crearCef("package://LURP/cef/mecanico/preview.html", {
                    puedeCerrar: false,
                    mostrarCursor: true
                });
            }

            if (vehiculo) {
                crearCameras();
                aplicarCambios(JSON.parse(cambiosArray));
            }
        }
    }
}

function cerrarPreview() {
    if(vehiculoJugador != null)
    {
        if(vehiculoJugador)
        {
            if (tuning_cefId >= 0) {
                cef_tuning.cerrarCef(tuning_cefId, false);
                tuning_cefId = -1;
            }
            mp.gui.cursor.visible = false;
            if(tipoMapa != 2) mp.game.ui.displayRadar(true);
            sceneryCamera.setActive(false);
            mp.game.cam.renderScriptCams(false, false, 0, true, false);
            if (mp.cameras.exists(sceneryCamera))
                sceneryCamera.destroy();
            sceneryCamera = null;
            resetearTuning();
            mp.gui.cursor.visible = false;
            vehiculoJugador.setModKit(-1);
            vehiculoJugador.setVisible(true, true);
            vehiculoJugador.freezePosition(false);

            if (mp.vehicles.exists(vehiculo))
                vehiculo.destroy();
            vehiculo = null;
            vehiculoJugador = null;

            //Mostrar hud
            if (cambiarHudTaller == true) {
                if (tipoMapa != 2) mp.game.ui.displayRadar(true);
                mp.game.ui.displayHud(true);
                mp.gui.chat.show(true);

                mp.events.call("hud:estado_hud");
            }
        }
    }
}
mp.events.add("CambiarRotacionCoche", (angle) => {
    if(vehiculo != null) vehiculo.setHeading(angle); 
})

function saltarIndexArmas(i, modelo) {
    switch (modelo) {
        case mp.game.joaat("savestra"):
            if (i == 10) {
                return true;
            }
            break;
        case mp.game.joaat("viseris"):
            if (i == 10) {
                return true;
            }
            break;
        case mp.game.joaat("comet4"):
            if (i == 10) {
                return true;
            }
            break;
        case mp.game.joaat("revolter"):
            if (i == 10) {
                return true;
            }
            break;
        case mp.game.joaat("speedo4"):
            if (i == 5 || i == 9 || i == 10) {
                return true;
            }
            break;
        case mp.game.joaat("JB7002"):
            if (i == 10) {
                return true;
            }
            break;
        case mp.game.joaat("deluxo"):
            if (i == 10) {
                return true;
            }
            break;
        case mp.game.joaat("imperator"):
            if (i == 5 || i == 6 || i == 9 || i == 10 || i == 35 || i == 40 || i == 41 || i == 42 || i == 43 || i == 44 || i == 45) {
                return true;
            }
            break;
        case mp.game.joaat("brutus"):
            if (i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9 || i == 10 || i == 35 || i == 40 || i == 41 || i == 42 || i == 44 || i == 45) {
                return true;
            }
            break;
        case mp.game.joaat("deathbike"):
            if (i == 40 || i == 41 || i == 43 || i == 44 || i == 45) {
                return true;
            }
            break;
        case mp.game.joaat("jubilee"):
            if (i == 45 || i == 5) {
                return true;
            }
            break;
        case mp.game.joaat("deity"):
            if (i == 45 || i == 5) {
                return true;
            }
            break;
        case mp.game.joaat("champion"):
            if (i == 45 || i == 5) {
                return true;
            }
            break;
        case mp.game.joaat("buffalo4"):
            if (i == 45 || i == 5) {
                return true;
            }
            break;
        case mp.game.joaat("granger2"):
            if (i == 45 || i == 5) {
                return true;
            }
            break;
        case mp.game.joaat("patriot3"):
            if (i == 45 || i == 5) {
                return true;
            }
            break;
        case mp.game.joaat("havok"):
            if (i == 10) {
                return true;
            }
            break;
    }
}
function saltarIndexDerby(i, j, modelo){
    if(modelo == mp.game.joaat("imperator")){
        if(i == 4){
            if(j == 3 || j == 4 || j == 5){
                return true;
            }
        }
    }
    else if(modelo == mp.game.joaat("deathbike")){
        if(i == 5){
            if(j == 2){
                return true;
            }
        }
    }   
}

}