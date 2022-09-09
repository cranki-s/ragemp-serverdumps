{
/**
 * vehiculoSync.js
 * 
 * Descripción: Se encarga de la sincronizacion de propiedades en el cliente entre los vehiculos.
 * 
 * Dries
 */
mp.game.controls.useDefaultVehicleEntering = false;
mp.players.local.setConfigFlag(241, true); // PED_FLAG_DISABLE_STOPPING_VEH_ENGINE - Evita que el cliente tras bajar de un vehículo encendido lo apague visualmente (ténicamente el motor sigue encendido)
 
var limitadorVelocidad = 0;
var cinturon = false;
let intervalo_nieve = null;
let intervalo_esposas = null;
let bodyHealthVeh;
let engineHealthVeh;
let guardarDamage;
let danoArmas = false;
let direccionDamage = false;
let intervaloVehiculo = null;

// Variables para evitar romper la ventanilla al intentar entrar a un vehiculo que pasa de estar bloqueado a desbloqueado en medio de la accion
let antiSmash = {entrando: false, vehObjetivo: null};
let faseSmash = 0;

mp.controladorVehiculos = {
    _vehiculos: {},
    _vehiculosGrua: {},
    _vehiculosCuerpo: {},
 
    establecerPropiedades: (vehiculo, sync=false) => {
        if (!vehiculo || !mp.vehicles.exists(vehiculo)) return;
        try {
            if (!vehiculo.propiedades)
                vehiculo.propiedades = {};

            if (vehiculo.hasVariable("VEHICULO")) {
                let _v = vehiculo.getVariable("VEHICULO");
                if (_v != null){
                    let v = typeof _v === "string" ? JSON.parse(_v) : _v;

                    // Podriamos hacer un vehiculo.propiedades = v
                    // aunque de esta manera con el bucle for solamente actualizamos las variables sincronizadas y no
                    // destruimos variables de .propiedades que hayamos creado solo en el cliente, dios sabe para qué
                    for (let i = 0; i < Object.keys(v).length; i++) {
                        let item = Object.keys(v)[i];
                        vehiculo.propiedades[item] = v[item];
                    }

                    if (sync) mp.controladorVehiculos.sincronizarPropiedades(vehiculo);
                }
                else{
                    // getVariable("VEHICULO") es null, un posible motivo es que al realizar ResetEntitySharedData
                    // nunca se vacia esa variable, simplemente la iguala a null, y cuando eso pasa el cliente
                    // siempre va a obtener que hasVariable("VEHICULO") == true, pero getVariable("VEHICULO") == null 
                    logError("V-1-1", "null: " + vehiculo.model); 
                }
            }
        } catch (e) {
            logError("V-1", e);
        }
    },
    sincronizarPropiedades: (vehiculo) => {
        if (!vehiculo || !mp.vehicles.exists(vehiculo)) return;
        if (typeof vehiculo.handle !== "number" || vehiculo.handle == 0) return; // Si no esta en stream no seguimos
        try {
            if (vehiculo.propiedades) {
                vehiculo.trackVisibility();

                // Se desactivan las puertas temporalmente hasta finalizar la sincronizacion
                for (let i = 0; i < 8; i++) {
                    vehiculo.setDoorBreakable(i, false);
                }

                // Motor
                if (vehiculo.propiedades.motor == true) {
                    vehiculo.setEngineOn(true, true, false);
                }
 
                // Sirenas - apagadas por defecto
                if ('boolean' === typeof vehiculo.propiedades.sirenas)
                    vehiculo.setSiren(vehiculo.propiedades.sirenas);
 
                // Sirena acústica - solo funciona con sirenas encendidas y si hay conductor 
                if ('boolean' === typeof vehiculo.propiedades.sirena_acustica)
                    vehiculo.setSirenSound(vehiculo.propiedades.sirena_acustica);
                 
                // Suciedad
                if ("number" === typeof vehiculo.propiedades.suciedad)
                    vehiculo.setDirtLevel(vehiculo.propiedades.suciedad);

                // Color dashboard - salpicadero
                if ("number" === typeof vehiculo.propiedades.colorcuadro && vehiculo.propiedades.colorcuadro >= 0 && vehiculo.propiedades.colorcuadro < 160)
                    mp.game.invoke("0x6089CDF6A57F326C", vehiculo.handle, vehiculo.propiedades.colorcuadro);

                // Color trim - tapiceria o costuras segun modelo
                if ("number" === typeof vehiculo.propiedades.colorsalpicadero && vehiculo.propiedades.colorsalpicadero >= 0 && vehiculo.propiedades.colorsalpicadero < 160)
                    mp.game.invoke("0xF40DD601A65F7F19", vehiculo.handle, vehiculo.propiedades.colorsalpicadero);

                // Ventanillas delanteras
                switch (vehiculo.propiedades.ventanillas_del) {
                    case 1: // Izq
                        vehiculo.rollDownWindow(0);
                        vehiculo.rollUpWindow(1);
                        break;
                    case 2: // Der
                        vehiculo.rollUpWindow(0);
                        vehiculo.rollDownWindow(1);
                        break;
                    case 3: // Ambas
                        vehiculo.rollDownWindow(0);
                        vehiculo.rollDownWindow(1);
                        break;
                    default:
                        break;
                }
 
                // Ventanillas traseras
                switch (vehiculo.propiedades.ventanillas_tra) {
                    case 1: // Izq
                        vehiculo.rollDownWindow(2);
                        vehiculo.rollUpWindow(3);
                        break;
                    case 2: // Der
                        vehiculo.rollUpWindow(2);
                        vehiculo.rollDownWindow(3);
                        break;
                    case 3: // Ambas
                        vehiculo.rollDownWindow(2);
                        vehiculo.rollDownWindow(3);
                        break;
                    default:
                        break;
                }
 
                // Volvemos a dejar las puertas sincronizadas
                let puertasJson = vehiculo.propiedades.puertas;
                if (puertasJson !== undefined) {
                    for (let i = 0; i < 3; i++) {
                        let puertas = i * 2; // Las puertas vienen en pares
                        switch (puertasJson[i]) {
                            case 1:
                                vehiculo.setDoorOpen(puertas, false, false);
                                vehiculo.setDoorShut(puertas + 1, false);
                                break;
                            case 2:
                                vehiculo.setDoorShut(puertas, false);
                                vehiculo.setDoorOpen(puertas + 1, false, false);
                                break;
                            case 3:
                                vehiculo.setDoorOpen(puertas, false, false);
                                vehiculo.setDoorOpen(puertas + 1, false, false);
                                break;
                            default:
                                break;
                        }
                    }
                }

                // Ruedas - Si es una moto necesitamos tener en cuenta la rueda trasera (mod 24)
                if (typeof vehiculo.propiedades.ruedas[0] === "number" && typeof vehiculo.propiedades.ruedas[1] === "number") {
                    if (vehiculo.propiedades.ruedas[1] != -1) { // Tiene ruedas no de serie
                        vehiculo.setWheelType(vehiculo.propiedades.ruedas[0]);
                        vehiculo.setMod(23, vehiculo.propiedades.ruedas[1]);
                        if (mp.game.vehicle.isThisModelABike(vehiculo.getModel()) && vehiculo.getClass() != 13) {
                            vehiculo.setMod(24, vehiculo.propiedades.ruedas[1]);
                        }
                    }
                    else { // Ruedas de serie
                        // Necesario por comportamiento rukoso de rage: si una moto ha tenido en algun momento una rueda de categoria 6 (ruedas de moto) 
                        // cuando vuelve a tener ruedas de serie la moto siempre carga con la rueda de delante siendo una deportiva de coche
                        // por lo tanto nosotros lo arreglamos quitando los mods de ruedas a las motos que llevan ruedas de serie
                        if (mp.game.vehicle.isThisModelABike(vehiculo.getModel()) && vehiculo.getClass() != 13) {
                            vehiculo.setWheelType(0);
                            vehiculo.removeMod(23);
                            vehiculo.removeMod(24);
                        }
                    }
                }

                if (vehiculo.propiedades.vida) {
                    vehiculo.setBodyHealth(vehiculo.propiedades.vida);
                    let vidaMotor = vehiculo.propiedades.vida + (1000 - vehiculo.propiedades.vida) * (vehiculo.propiedades.vida / 1200);
                    vehiculo.setEngineHealth(vidaMotor)
                }
 
                // Alarma y cadenas
                switch (vehiculo.propiedades.alarma_cadenas) {
                    case 1: // Alarma
                        mp.game.invoke("0xCDE5E70C1DDB954C", vehiculo.handle, true); //SET_VEHICLE_ALARM
                        mp.game.invoke("0xB8FF7AB45305C345", vehiculo.handle); //START_VEHICLE_ALARM
                        if (icono_clima == "snow") {
                            mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, true); // cadenas
                            mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 1);
                        }
                        else {
                            mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false); // cadenas
                            mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                        }
                        break;
                    case 2: // Cadenas
                        mp.game.invoke("0xCDE5E70C1DDB954C", vehiculo.handle, false); //SET_VEHICLE_ALARM
                        mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false); // cadenas
                        mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                        break;
                    case 3: // Ambas
                        mp.game.invoke("0xCDE5E70C1DDB954C", vehiculo.handle, true); //SET_VEHICLE_ALARM
                        mp.game.invoke("0xB8FF7AB45305C345", vehiculo.handle); //START_VEHICLE_ALARM
                        mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false); // cadenas
                        mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                        break;
                    default:
                        break;
                }
            }
            else
            {
                mp.controladorVehiculos.establecerPropiedades(vehiculo, false);
            }
        } catch (e) {
            logError("V-2", e);
        }
    },
    establecerPropiedad: (vehiculo, propiedad, valor, sync=true) => {
        if (!vehiculo || !mp.vehicles.exists(vehiculo)) return;
        if (!propiedad || (valor == null || valor == undefined)) return;
        try {
            // Si el vehiculo ya lo tenemos sincronizado, actualizamos la propiedad
            // Si no, sincronizamos las propiedades enteras
            if (vehiculo.propiedades != undefined) {
                vehiculo.propiedades[propiedad] = valor;
                if (sync)
                    mp.controladorVehiculos.sincronizarPropiedad(vehiculo, propiedad);
            } else {
                mp.controladorVehiculos.establecerPropiedades(vehiculo);
            }
        } catch (e) {
            logError("V-3", e);
        }
    },
    sincronizarPropiedad: (vehiculo, propiedad) => {
        if (!vehiculo || !mp.vehicles.exists(vehiculo)) return;
        if (typeof vehiculo.handle !== "number" || vehiculo.handle == 0) return; // Si no esta en stream no seguimos
        if (propiedad == undefined || propiedad == null) return;
        if (!vehiculo.propiedades.hasOwnProperty(propiedad)) return;
        try {
            switch (propiedad) {
                case "sirena_acustica":
                    vehiculo.setSirenSound(vehiculo.propiedades.sirena_acustica);
                    break;
                case "sirenas":
                    vehiculo.setSiren(vehiculo.propiedades.sirenas);
                    break;
                case "vida":
                    vehiculo.setBodyHealth(vehiculo.propiedades.vida);
                    let vidaMotor = vehiculo.propiedades.vida + (1000 - vehiculo.propiedades.vida) * (vehiculo.propiedades.vida / 1200);
                    vehiculo.setEngineHealth(vidaMotor)
                    if (player_local.vehicle == vehiculo) vida_vehiculo_jugador = vidaMotor;
                    break;
                case "suciedad":
                    vehiculo.setDirtLevel(vehiculo.propiedades.suciedad);
                    break;
                case "ventanillas_del":
                    switch (vehiculo.propiedades.ventanillas_del) {
                        case 0: // Ninguna
                            vehiculo.rollUpWindow(0);
                            vehiculo.rollUpWindow(1);
                            break;
                        case 1: // Izq
                            vehiculo.rollDownWindow(0);
                            vehiculo.rollUpWindow(1);
                            break;
                        case 2: // Der
                            vehiculo.rollUpWindow(0);
                            vehiculo.rollDownWindow(1);
                            break;
                        case 3: // Ambas
                            vehiculo.rollDownWindow(0);
                            vehiculo.rollDownWindow(1);
                            break;
                        default:
                            break;
                    }
                    break;
                case "ventanillas_tra":
                    switch (vehiculo.propiedades.ventanillas_tra) {
                        case 0: // Ninguna
                            vehiculo.rollUpWindow(2);
                            vehiculo.rollUpWindow(3);
                            break;
                        case 1: // Izq
                            vehiculo.rollDownWindow(2);
                            vehiculo.rollUpWindow(3);
                            break;
                        case 2: // Der
                            vehiculo.rollUpWindow(2);
                            vehiculo.rollDownWindow(3);
                            break;
                        case 3: // Ambas
                            vehiculo.rollDownWindow(2);
                            vehiculo.rollDownWindow(3);
                            break;
                        default:
                            break;
                    }
                    break; 
                case "kilometros":
                    if (vehiculo == player_local.vehicle) {
                        kilometros = vehiculo.propiedades.kilometros;
                    }
                    break;
                case "motor":
                    vehiculo.setEngineOn(vehiculo.propiedades.motor, false, !vehiculo.propiedades.motor);
                    break;
                case "alarma_cadenas":
                    switch (vehiculo.propiedades.alarma_cadenas) {
                        case 0: // Ninguna
                            mp.game.invoke("0xCDE5E70C1DDB954C", vehiculo.handle, false); //SET_VEHICLE_ALARM
                            if (icono_clima == "snow") {
                                mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, true); // cadenas
                                mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 1);
                            }
                            else {
                                mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false); // cadenas
                                mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                            }
                            break;
                        case 1: // Alarma
                            mp.game.invoke("0xCDE5E70C1DDB954C", vehiculo.handle, true); //SET_VEHICLE_ALARM
                            mp.game.invoke("0xB8FF7AB45305C345", vehiculo.handle); //START_VEHICLE_ALARM
                            if (icono_clima == "snow") {
                                mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, true); // cadenas
                                mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 1);
                            }
                            else {
                                mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false); // cadenas
                                mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                            }
                            break;
                        case 2: // Cadenas
                            mp.game.invoke("0xCDE5E70C1DDB954C", vehiculo.handle, false); //SET_VEHICLE_ALARM
                            mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false); // cadenas
                            mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                            break;
                        case 3: // Ambas
                            mp.game.invoke("0xCDE5E70C1DDB954C", vehiculo.handle, true); //SET_VEHICLE_ALARM
                            mp.game.invoke("0xB8FF7AB45305C345", vehiculo.handle); //START_VEHICLE_ALARM
                            mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false); // cadenas
                            mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                            break;
                        default:
                            break;
                    }
                    break;
                case "puertas":
                    let array = vehiculo.propiedades.puertas;
                    for (let i = 0; i < 3; i++) {
                        let puertas = i * 2; // Las puertas vienen en pares
                        switch (array[i]) {
                            case 0:
                                vehiculo.setDoorShut(puertas, false);
                                vehiculo.setDoorShut(puertas + 1, false);
                                break;
                            case 1:
                                vehiculo.setDoorOpen(puertas, false, false);
                                vehiculo.setDoorShut(puertas + 1, false);
                                break;
                            case 2:
                                vehiculo.setDoorShut(puertas, false);
                                vehiculo.setDoorOpen(puertas + 1, false, false);
                                break;
                            case 3:
                                vehiculo.setDoorOpen(puertas, false, false);
                                vehiculo.setDoorOpen(puertas + 1, false, false);
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case "gasolina":
                    if (player_local.vehicle == vehiculo) {
                        gasolina = vehiculo.propiedades.gasolina;
                    }
                    break;
                case "ruedas":
                    if (vehiculo.propiedades.ruedas[1] != -1) {
                        vehiculo.setWheelType(vehiculo.propiedades.ruedas[0]);
                        vehiculo.setMod(23, vehiculo.propiedades.ruedas[1]);
                        if (mp.game.vehicle.isThisModelABike(vehiculo.getModel()) && vehiculo.getClass() != 13) {
                            vehiculo.setMod(24, vehiculo.propiedades.ruedas[1]);
                        }
                    }
                    else {
                        vehiculo.setWheelType(0);
                        vehiculo.removeMod(23);
                        if (mp.game.vehicle.isThisModelABike(vehiculo.getModel()) && vehiculo.getClass() != 13) {
                            vehiculo.removeMod(24);
                        }
                    }
                    break;
                case "potencia":
                    vehiculo.setEnginePowerMultiplier(vehiculo.propiedades.potencia);
                    break;
                case "transmision":
                    vehiculo.setEngineTorqueMultiplier(vehiculo.propiedades.transmision);
                    break;
                case "colorcuadro":
                    mp.game.invoke("0x6089CDF6A57F326C", vehiculo.handle, vehiculo.propiedades.colorcuadro);
                    break;
                case "colorsalpicadero":
                    mp.game.invoke("0xF40DD601A65F7F19", vehiculo.handle, vehiculo.propiedades.colorsalpicadero);
                    break;
                default:
                    break;
            }
        } catch (e) {
            logError("V-4", e);
        }
    }
};

// DATAHANDLER - Solo se usa para guardar/actualizar la informacion sincronizada, nunca ejecuta los cambios de esa informacion
mp.events.addDataHandler("VEHICULO", (entity, value, oldValue) => {
    // mp.gui.chat.push("!{yellow}" + value);
    // mp.gui.chat.push("!{orange}" + oldValue);
    if (!entity) return;
    if (typeof value !== "string") {
        if (value == null) { // Si se realiza ResetEntitySharedData y tenemos las propiedades de ese veh las borramos
            if (!entity.propiedades) return;
            else {
                if (mp.controladorVehiculos._vehiculos.hasOwnProperty(entity.propiedades.llave)) {
                    delete mp.controladorVehiculos._vehiculos[entity.propiedades.llave];
                }

                if (entity.remoteId) {
                    if (mp.controladorVehiculos._vehiculosGrua.hasOwnProperty(entity.remoteId)) {
                        delete mp.controladorVehiculos._vehiculosGrua[entity.remoteId];
                    }

                    if (mp.controladorVehiculos._vehiculosCuerpo.hasOwnProperty(entity.remoteId)) {
                        delete mp.controladorVehiculos._vehiculosCuerpo[entity.remoteId];
                    }
                }

                delete entity.propiedades;
            }
        }
        return;
    }
    if (!mp.vehicles.exists(entity)) return;
    try {
        let v = JSON.parse(value);
        let ov = typeof oldValue === "string" ? JSON.parse(oldValue) : null;

        if (ov == null) {
            mp.controladorVehiculos.establecerPropiedades(entity, true);
        }
        else {
            for (item in v) {
                if (ov.hasOwnProperty(item)) {
                    if (typeof v[item] !== 'object') {
                        if (ov[item] != v[item]) {
                            // mp.gui.chat.push("!{green}Se establece la propiedad " + item + " -> " + JSON.stringify(v[item]));
                            mp.controladorVehiculos.establecerPropiedad(entity, item, v[item], false);
                        }
                    }
                    else {
                        if (JSON.stringify(ov[item]) != JSON.stringify(v[item])) {
                            // mp.gui.chat.push("!{green}Se establece la propiedad " + item + " -> " + JSON.stringify(v[item]));
                            mp.controladorVehiculos.establecerPropiedad(entity, item, v[item], false);
                        }
                    }
                } else {
                    // mp.gui.chat.push("Se establece la propiedad " + item + " -> " + JSON.stringify(v[item]));
                    mp.controladorVehiculos.establecerPropiedad(entity, item, v[item], false);
                }
            }
        }
    } catch (e) {
        logError("V-5", e);
    }
});

// Evento de sincronizacion en rango - Usado para guardar/actualizar una variable sincronizada y ejecutar su cambio
mp.events.add("VEHICULO_SYNC", (entity, propiedad, value) => {
    if (!entity || !mp.vehicles.exists(entity)) return;
    if (typeof propiedad !== "string") return;

    switch (propiedad) {
        case "sirena_acustica":
            if ('boolean' !== typeof value) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "sirena_acustica", value);
            break;
        case "sirenas":
            if ('boolean' !== typeof value) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "sirenas", value);
            break;
        case "suciedad":
            if (value == undefined || value == null) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "suciedad", value);
            break;
        case "ventanillas_del":
            if ('number' !== typeof value) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "ventanillas_del", value);
            break;
        case "ventanillas_tra":
            if ('number' !== typeof value) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "ventanillas_tra", value);
            break;
        case "kilometros":
            if (value == undefined || value == null) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "kilometros", value);
            break;
        case "motor":
            if ('boolean' !== typeof value) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "motor", value);
            break;
        case "alarma_cadenas":
            if ('number' !== typeof value) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "alarma_cadenas", value);
            break;
        case "puertas":
            if (value == undefined || value == null) return;
            let vJson = JSON.parse(value);
            mp.controladorVehiculos.establecerPropiedad(entity, "puertas", vJson); // Las puertas vienen en un array que contiene pares de puertas [0/1, 2/3...]
            break;
        case "gasolina":
            if (value == undefined || value == null) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "gasolina", value);
            break;
        case "ruedas":
            if (value == undefined || value == null) return;
            let valueJson = typeof value === "string" ? JSON.parse(value) : value;
            mp.controladorVehiculos.establecerPropiedad(entity, "ruedas", valueJson);
            break;
        case "potencia":
            if (value == undefined || value == null) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "potencia", value);
            break;
        case "transmision":
            if (value == undefined || value == null) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "transmision", value);
            break;
        case "vida":
            if (value == undefined || value == null) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "vida", value);
            break;
        case "bloqueo":
            if ('boolean' !== typeof value) return;
            if (value) {
                entity.setDoorsLocked(2);
                if (!mp.game.vehicle.isThisModelABicycle(entity.getModel())) mp.game.audio.playSoundFromEntity(1, "Remote_Control_Close", entity.handle, "PI_Menu_Sounds", true, 0);
                // Si el vehículo es un barco, tirar el ancla
                if (mp.game.vehicle.isThisModelABoat(entity.getModel())) {
                    entity.setBoatAnchor(true); // Si es un barco y está bloqueado, se tira el ancla
                    mp.game.invoke('0xE3EBAAE484798530', entity.handle, true); // Si el ancla está tirada, te aseguro que el barco no se mueve.
                }
            } else {
                entity.setDoorsLocked(1);
                if (!mp.game.vehicle.isThisModelABicycle(entity.getModel())) mp.game.audio.playSoundFromEntity(1, "Remote_Control_Open", entity.handle, "PI_Menu_Sounds", true, 0);
                if (mp.game.vehicle.isThisModelABoat(entity.getModel())) {
                    entity.setBoatAnchor(false); // Si es un barco y está bloqueado, se tira el ancla
                    mp.game.invoke('0xE3EBAAE484798530', entity.handle, false); // Si el ancla está tirada, te aseguro que el barco no se mueve.

                }
            }
            break;
        case "intermitentes":
            if ('number' !== typeof value) return;
            switch (value) {
                case 0: // Ninguno
                    entity.setIndicatorLights(1, false);
                    entity.setIndicatorLights(0, false);
                    break;
                case 1: // Izq
                    entity.setIndicatorLights(1, true);
                    entity.setIndicatorLights(0, false);
                    break;
                case 2: // Der
                    entity.setIndicatorLights(1, false);
                    entity.setIndicatorLights(0, true);
                    break;
                case 3: // Ambos
                    entity.setIndicatorLights(1, true);
                    entity.setIndicatorLights(0, true);
                    break;
                default:
                    break;
            }
            break;
        case "faccion":
            if (value == undefined || value == null) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "faccion", value, false);
            break;
        case "trabajos":
            if (value == undefined || value == null) return;
            let vJsont = JSON.parse(value); // JSON -> array
            mp.controladorVehiculos.establecerPropiedad(entity, "trabajos", vJsont, false); // Los trabajos vienen en un array
            break;
        case "alpr":
            if ('boolean' !== typeof value) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "alpr", value, false);
            break;
        case "colorcuadro":
            if ("number" !== typeof value || value < 0 || value >= 160) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "colorcuadro", value);
            break;
        case "colorsalpicadero":
            if ("number" !== typeof value || value < 0 || value >= 160) return;
            mp.controladorVehiculos.establecerPropiedad(entity, "colorsalpicadero", value);
            break;
        default:
            break;
    }
});

// Nos permite que el controlador de un vehiculo VACIO siempre "actualice" su posicion de forma correcta, sin dejarlo en medio de calles, barcos flotando por el mar...
mp.events.add("entityControllerChange", (entity, newController) => {
    if (!logueado || !entity || entity.handle == 0) return;
    if (!newController || newController != player_local) return;
    try {
        if (entity.type && entity.type == "vehicle" && mp.vehicles.exists(entity)){
            if (player_local.vehicle != entity){
                // Cargamos colisiones del modelo en caso de no tenerlas cargadas
                let model = entity.model;
                if (!mp.game.streaming.hasCollisionForModelLoaded(model)) {
                    mp.game.streaming.requestCollisionForModel(model);
                }

                // Forzamos cargar las colisiones
                entity.setLoadCollisionFlag(true);

                // Congelamos el coche (puede quedar en el aire unos metros sobre el suelo debido a como RAGE crea en stream los vehiculos)
                entity.freezePosition(true);

                // Pedimos las colisiones en la posicion exacta del coche
                let pos = entity.getCoords(true);
                mp.game.streaming.requestCollisionAtCoord(pos.x, pos.y, pos.z);

                crearTimeout(() => {
                    // Tras 1.5 segundos si el vehiculo sigue existiendo lo colocamos en el suelo y descongelamos
                    if (entity && mp.vehicles.exists(entity) && entity.handle != 0){
                        let resultado = entity.setOnGroundProperly(5.0); // Forzamos que sea colocado correctamente en el suelo

                        // Lo descongelamos si no es un barco (para que no se vaya flotando)
                        if (!mp.game.vehicle.isThisModelABoat(model)){
                            entity.freezePosition(false); 
                        }

                        // Ahora este cliente al ser el controlador es el que actualiza la posicion de este vehiculo vacio al servidor (y el servidor a los demas clientes) 
                    }
                }, 1500);
            }
        }
    }
    catch (e) {
        logError("V-10", e);
    }
});

// vehicle entityStreamIn - streamHandler
function streamInVehiculos(entity) {
    try {
        let model = entity.model;
        if (!mp.game.streaming.hasCollisionForModelLoaded(model)) {
            mp.game.streaming.requestCollisionForModel(model);
        }

        let pos = entity.getCoords(true);
        mp.game.streaming.requestCollisionAtCoord(pos.x, pos.y, pos.z);

        entity.setLoadCollisionFlag(true);

        if (entity.propiedades) {
            mp.controladorVehiculos._vehiculos[entity.propiedades.llave] = entity;

            if (entity.propiedades.grua) {
                let variableGrua = entity.propiedades.grua;
                if (variableGrua) {
                    let objGrua = typeof variableGrua === "string" ? JSON.parse(variableGrua) : variableGrua;
                    let _vehiculoRemolcado = mp.vehicles.atRemoteId(objGrua[0]);
                    waitFor(_vehiculoRemolcado).then(vehiculoRemolcado => {
                        if (vehiculoRemolcado) {
                            montarVehiculoGrua(entity, vehiculoRemolcado, objGrua[1]);
                        }
                    });
                } else {
                    if (mp.controladorVehiculos._vehiculosGrua.hasOwnProperty(entity.remoteId)) {
                        delete mp.controladorVehiculos._vehiculosGrua[entity.remoteId];
                    }
                }
            } else {
                if (mp.controladorVehiculos._vehiculosGrua.hasOwnProperty(entity.remoteId)) {
                    delete mp.controladorVehiculos._vehiculosGrua[entity.remoteId];
                }
            }
        }

        if (entity.hasVariable("CUERPO")) {
            if (entity.getVariable("CUERPO") != null) {
                let e = JSON.parse(entity.getVariable("CUERPO"));
                let _player = mp.players.atRemoteId(e[0]);
                waitFor(_player).then(player => {
                    if (player) {
                        meterCuerpoMaletero(entity, player, e[1], e[2], e[3], e[4]);
                    }
                });
            }
        }
        // Sincronizamos las propiedades (ya cargadas)
        mp.controladorVehiculos.sincronizarPropiedades(entity);
    }
    catch (e) {
        logError("V-6", e);
    }
}

// vehicle entityStreamOut - streamHandler
function streamOutVehiculos(entity) {
    try {
        if (entity.propiedades) {
            if (mp.controladorVehiculos._vehiculos.hasOwnProperty(entity.propiedades.llave)) {
                delete mp.controladorVehiculos._vehiculos[entity.propiedades.llave];
            }

            if (mp.controladorVehiculos._vehiculosGrua.hasOwnProperty(entity.remoteId)) {
                delete mp.controladorVehiculos._vehiculosGrua[entity.remoteId];
            }

            if (mp.controladorVehiculos._vehiculosCuerpo.hasOwnProperty(entity.remoteId)) {
                delete mp.controladorVehiculos._vehiculosCuerpo[entity.remoteId];
            }
        }
    }
    catch (e) {
        logError("V-7", e);
    }
}

function meterCuerpoMaletero(vehiculo, jugador, posX, posY, posZ, rotZ) {
    if (!vehiculo.handle || !jugador.handle) return;
    if (!mp.controladorVehiculos._vehiculosCuerpo.hasOwnProperty(vehiculo.remoteId)) {
        mp.controladorVehiculos._vehiculosCuerpo[vehiculo.remoteId] = {
            vehiculo: vehiculo,
            playerId: jugador.remoteId,
            posX: posX,
            posY: posY,
            posZ: posZ,
            rotZ: rotZ
        };
    }
    jugador.attachTo(vehiculo.handle, -1, posX, posY, posZ, 0.0, 0.0, rotZ, false, false, false, false, 20, true);
    jugador.taskPlayAnim("timetable@floyd@cryingonbed@base", "base", 3.0, 3.0, -1, 1, 0.0, false, false, false);
}
 
function waitFor(e) {
    return new Promise((resolve, reject) => {
    let time = Date.now()
    let interval = setInterval(() => {
        if (e && e.handle) {
        clearInterval(interval)
        resolve(e)
        }
   
        if (Date.now() - time >= 5000) {
        clearInterval(interval)
        resolve(null)
        }
    }, 100)
    })
}

mp.events.add("GRUA", (grua, value) => {
    if (grua == undefined || grua == null) return;
    if (grua.handle == 0 || grua.type !== "vehicle") return;
 
    let valorJson = typeof value === "string" ? JSON.parse(value) : value;
 
    let _vehiculoRemolcado = mp.vehicles.atRemoteId(valorJson[0]);
    waitFor(_vehiculoRemolcado).then(vehiculoRemolcado => {
        if (vehiculoRemolcado) {
        montarVehiculoGrua(grua, vehiculoRemolcado, valorJson[1]);
        }
    });
});
 
mp.events.add("CAMIONERO", (vehiculo) => {
    try {
        if (vehiculo.propiedades) {
            if (vehiculo.propiedades.motor != undefined && vehiculo.propiedades.motor == true) {
                vehiculo.setEngineOn(true, false, false);
            }
 
            /* vehiculo.setUndriveable(true); */
            vehiculo.setEnginePowerMultiplier(vehiculo.propiedades.potencia);
            vehiculo.setEngineTorqueMultiplier(vehiculo.propiedades.transmision);
            if (vehiculo.propiedades.frenos > 0)
                vehiculo.setHandling("FBRAKEFORCE", (vehiculo.propiedades.frenos));

            if (icono_clima == "snow") {
                if (vehiculo.propiedades.alarma_cadenas != undefined) {
                    switch (vehiculo.propiedades.alarma_cadenas) {
                        case 0: case 1: // No tiene cadenas
                            mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, true);
                            mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 1);
                            break;
                        case 2: case 3: // Tiene cadenas
                            mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false);
                            mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                        break;
                        default:
                            break;
                    }
                }
            } else {
                mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false);
                mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
            }
        }
    } catch (e) {
        logError("V-8", e);
    }
});

// Evento para añadir un vehiculo al array vehiculos
mp.events.add("VEHICULOS-ADD", function (value) {
    if (value != null) {
        var vehiculos_array_1 = JSON.parse(value);
        var vehiculo_existe_1 = false;
        for (let i = 0, n = vehiculos.length; i < n; i++) {
            if (vehiculos[i].id == vehiculos_array_1[0]) {
                vehiculo_existe_1 = true;
                break;
            }
        }
        if (!vehiculo_existe_1) {
            var obj = {
                id: vehiculos_array_1[0],
                title: vehiculos_array_1[1],
                number: vehiculos_array_1[2],
                price: vehiculos_array_1[3],
                fTank: vehiculos_array_1[4],
                impuestos: vehiculos_array_1[5],
                propio: vehiculos_array_1[6],
                electrico: vehiculos_array_1[7],
            };
            vehiculos.push(obj);
        }
    }
});

// Evento para eliminar un vehiculo del array vehiculos
mp.events.add("VEHICULOS-DEL", function (value) {
    if (value != null) {
        for (let i = 0, n = vehiculos.length; i < n; i++) {
            if (vehiculos[i].id == value) {
                vehiculos.splice(i, 1);
                break;
            }
        }
    }
});

// Evento para cargar el array vehiculos tras conectar
mp.events.add("cargar_vehiculos", (array) => {
    if (typeof(array) !== "string") return;
     
    let arrayJson = JSON.parse(array);
    for (let i = 1; i < parseInt(arrayJson[0]) * 8; i+= 8) {
        let vehiculo_existe = false;
        for (let j = 0, m = vehiculos.length; j < m; j++) {
            if (vehiculos[j].id == arrayJson[i]) {
                vehiculo_existe = true;
                break;
            }
        }
 
        if (!vehiculo_existe) {
            var veh = {
                id: arrayJson[i],
                title: arrayJson[i + 1],
                number: arrayJson[i + 2],
                price: arrayJson[i + 3],
                fTank: arrayJson[i + 4],
                impuestos: arrayJson[i + 5],
                propio: arrayJson[i + 6],
                electrico: arrayJson[i + 7],
            };
            vehiculos.push(veh);
        }
    }

    mp.events.remove("cargar_vehiculos"); // Es un evento de un uso, por lo tanto lo borramos
});
 
mp.events.add("desenganchar_vehiculo", (trailer) => {
    if (player_local.vehicle != undefined) {
        if (player_local.vehicle.model == mp.game.joaat("towtruck") || player_local.vehicle.model == mp.game.joaat("towtruck2")) {
            player_local.vehicle.detachFromTowTruck(trailer.handle);
        } else {
            player_local.vehicle.detachFromTrailer();
        }
    }
});
 
mp.events.add("establecer_grua", (jugador, vehRemolcado, posGrua) => {
    if (jugador.vehicle != undefined) {
        if (mp.vehicles.exists(vehRemolcado)) {
            let posicion = vehRemolcado.getBoneIndexByName("tow_mount_a");
            vehRemolcado.attachTo(jugador.vehicle.handle, posicion, posGrua.x, posGrua.y, posGrua.z, 0.0, 0.0, 0.0, false, false, true, false, 2, true);
        }
    } 
});
 
mp.events.add("quitar_grua", (vehRemolcado) => {
    if (mp.vehicles.exists(vehRemolcado)) {
        vehRemolcado.detach(true, false);
        vehRemolcado.setCollision(true, true);
 
        if (mp.controladorVehiculos._vehiculosGrua.hasOwnProperty(vehRemolcado.remoteId)) {
            delete mp.controladorVehiculos._vehiculosGrua[vehRemolcado.remoteId];
        }
    }
});
 
mp.events.add("establecer_cargobob", (jugador, vehEnganchar) => {
    if (jugador.vehicle != undefined) {
        if (mp.vehicles.exists(vehEnganchar)) {
            let posicion = vehEnganchar.getCargobobHookPosition();
            let hueso = vehEnganchar.getBoneIndexByName("chassis");
 
            vehEnganchar.attachTo(jugador.vehicle.handle, hueso, 0.0, 0.5, -4.5, 0.0, 0.0, 0.0, false, false, true, false, 2, true);
        }
    }
});
 
mp.events.add("quitar_cargobob", (vehiculo, vehDesenganchar) => {
    if (mp.vehicles.exists(vehiculo)) {
        if (mp.vehicles.exists(vehDesenganchar)) {
            vehDesenganchar.detach(false, false);
        }
    }
});
 
mp.events.add("establecer_skylift", (jugador, vehEnganchar) => {
    if (jugador.vehicle != undefined) {
        if (mp.vehicles.exists(vehEnganchar)) {
            let hueso = vehEnganchar.getBoneIndexByName("chassis");
            vehEnganchar.attachTo(jugador.vehicle.handle, hueso, 0.0, -3.0, -1.0, 0.0, 0.0, 0.0, false, false, true, false, 2, true);
        }
    }
});
 
mp.events.add("quitar_skylift", (vehiculo, vehDesenganchar) => {
    if (mp.vehicles.exists(vehiculo)) {
        if (mp.vehicles.exists(vehDesenganchar)) {
            vehDesenganchar.detach(false, false);
        }
    }
});
 
mp.events.add("establecer_trailer", (trailer, vehRemolcado, posGrua) => {
    if (mp.vehicles.exists(vehRemolcado) && mp.vehicles.exists(trailer)) {
        let posicion = vehRemolcado.getBoneIndexByName("tow_mount_a");
        vehRemolcado.attachTo(trailer.handle, posicion, posGrua.x, posGrua.y, posGrua.z, 0.0, 0.0, 0.0, false, false, true, false, 2, true);
    }
});
 
mp.events.add("quitar_trailer", (vehRemolcado) => {
    if (mp.vehicles.exists(vehRemolcado)) {
        vehRemolcado.detach(false, false);
    }
});
 
mp.events.add("rappel", (jugador) => {
    jugador.taskRappelFromHeli(0);
});

// Render que contiene el codigo para evitar romper ventanillas al entrar a vehiculos y los attach de gruas y cuerpos en maletero
mp.events.add("render", () => {
    let tempEntrando = player_local.isTryingToEnterALockedVehicle();
    if (antiSmash.entrando != tempEntrando){
        antiSmash.entrando = tempEntrando;
        
        let tempPuertas = 0;

        let entrandoVeh = player_local.getVehicleIsTryingToEnter();
        if (entrandoVeh) {
            // Si el vehiculo al que entramos es distinto al anterior reseteamos la fase de deteccion a 0
            if (antiSmash.vehObjetivo){
                if (entrandoVeh != antiSmash.vehObjetivo){
                    antiSmash.vehObjetivo = entrandoVeh;
                    faseSmash = 0;
                }
            }
            else{
                antiSmash.vehObjetivo = entrandoVeh;
                faseSmash = 0;
            }

            // Obtenemos el vehiculo al que estamos entrando y obtenemos el estado de sus puertas
            let vehTest = mp.vehicles.atHandle(entrandoVeh);
            if (vehTest){ 
                tempPuertas = vehTest.getDoorLockStatus();
            }
        }

        // Diferenciamos la fase en la que nos encontramos
        switch(faseSmash){
            case 0: // Detectar intento de entrar a veh bloqueado
                if (tempPuertas == 2 && tempEntrando == true){
                    faseSmash = 1;
                }
                break;
            case 1: // Detectar si el veh bloqueado pasa a estar abierto mientras entramos
                if (tempPuertas == 1 && tempEntrando == false){
                    player_local.clearTasksImmediately(); // Paramos la task de entrar al vehiculo antes de romper la ventanilla
                    faseSmash = 0;
                }
                break;
            default:
                faseSmash = 0;
                break;
        }
    }

    for (let vehRemolcado in mp.controladorVehiculos._vehiculosGrua) {
        let obj = mp.controladorVehiculos._vehiculosGrua[vehRemolcado];
        let v = mp.vehicles.atRemoteId(vehRemolcado) || null;
        let hueso = v.getBoneIndexByName("tow_mount_a");
        let v_ = mp.vehicles.atRemoteId(obj.grua) || null;

        if (!v || !v_) continue;
        v.attachTo(v_.handle, hueso, obj.posicion.x, obj.posicion.y, obj.posicion.z, 0.0, 0.0, 0.0, true, false, true, false, 0, true);
    }

    for(let vehCuerpo in mp.controladorVehiculos._vehiculosCuerpo){
        let obj = mp.controladorVehiculos._vehiculosCuerpo[vehCuerpo];
        let v = obj.vehiculo || null;
        let posX = obj.posX || null;
        let posY = obj.posY || null;
        let posZ = obj.posZ || null;
        let rotZ = obj.rotZ || null;
        let v_ = mp.players.atRemoteId(obj.playerId) || null;
        if (!v || !v_ || !posX || !posY || !posZ || rotZ) continue;
        v_.attachTo(v.handle, -1, posX, posY, posZ, 0.0, 0.0, rotZ, false, false, false, false, 20, true);
    }
});

let mejoras = 1;
let kilometrosAnteriores = 0;
mp.events.add("playerEnterVehicle", (vehiculo, seat) => {
    try {
        if (vehiculo != undefined) {
            vehiculo.freezePosition(false); // Es necesario por si ya eramos el controlador del vehiculo

            // Si se sube de piloto o copiloto, comprobamos si al vehículo al que se va a subir tiene el ALPR activo, si lo tiene, se lo mostramos
            if (seat == -1 || seat == 0) {
                if (vehiculo.propiedades != undefined)
                {
                    let trabajosDelVehiculo = vehiculo.propiedades.trabajos;
                    if (trabajosDelVehiculo.length > 0)
                    {
                        if ((trabajosDelVehiculo).includes(1) || (trabajosDelVehiculo).includes(2) || (trabajosDelVehiculo).includes(25) || (trabajosDelVehiculo).includes(31))
                        {
                            if (vehiculo.propiedades.alpr)
                            {
                                mp.events.call("mostrar_alpr", true);
                            }
                        } 
                    }
                }
            }

            mp.events.callRemote("vehiculo:mejoras_reales", vehiculo);

            if(player_local.weapon != 2725352035 && armaActiva.id > 0){
                sacarArmaCargador(armaActiva.cantidad);
            }

            if (limitadoresVelocidad.hasOwnProperty(vehiculo.id)) { // menu/sistemas/vehiculo
                limitadorVelocidad = limitadoresVelocidad[vehiculo.id];
                mp.events.call("hud:limitadorVelocidad:actualizar", limitadorVelocidad);
            }
 
            if (vehiculo.propiedades) {
                // mp.gui.chat.push("Propiedades (1)");
                if (vehiculo.propiedades.motor == true) {
                    vehiculo.setEngineOn(true, true, false);
                }

                vehiculo.setBodyHealth(vehiculo.propiedades.vida);
                bodyHealthVeh = vehiculo.propiedades.vida;

                let vidaActual = vehiculo.propiedades.vida;
                vida_vehiculo_jugador = vidaActual + (1000 - vidaActual) * (vidaActual / 1200);
                vehiculo.setEngineHealth(vida_vehiculo_jugador)
                engineHealthVeh = vida_vehiculo_jugador;
                vehiculo.setEnginePowerMultiplier(vehiculo.propiedades.potencia);
                vehiculo.setEngineTorqueMultiplier(vehiculo.propiedades.transmision);

                if (icono_clima == "snow") {
                    switch (vehiculo.propiedades.alarma_cadenas) {
                        case 0: case 1: // No tiene cadenas
                            mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, true);
                            mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 1);
                            break;
                        case 2: case 3: // Tiene cadenas
                            mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false); // cadenas
                            mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                            break;
                        default:
                            break;
                    }
                } else {
                    mp.game.invoke("0x222FF6A823D122E2", vehiculo.handle, false);
                    mp.game.invoke("0x6DEE944E1EE90CFB", vehiculo.handle, 0);
                }

                if (!esBici(vehiculo) && seat == -1) {
                    mostrarAviso("info", 4000, "Presiona la tecla 'K' para abrir el menú del vehículo");
                }
                calcularNumMejoras(vehiculo);
                guardarDamage = setInterval(damageVehiculo, 500);
                kilometrosAnteriores = vehiculo.propiedades.kilometros;
                mp.events.add('render', renderVehiculo);
                intervaloVehiculo = setInterval(intervaloVehiculoFuncion, 1000);

                if(vehiculo.getClass() == 8 && esposado){
                    intervalo_esposas = setInterval(intervaloEsposas, 5000);
                }
            }

            //intervalo_nieve = setInterval(intervaloNieve, 5000);
        }
    } catch (e) {
        logError("V-9", e);
    }
});
 
function damageVehiculo() {
    if (player_local.vehicle && player_local.getHealth() >= 1) {
        bodyHealthVeh = player_local.vehicle.getBodyHealth();
    }
    if (player_local.vehicle) {
        engineHealthVeh = vida_vehiculo_jugador;
    }
}

let propiedadesVeh = null;
let inicioFallos = 4000;
function calcularNumMejoras(vehiculo) {
    if (vehiculo.propiedades) {
        propiedadesVeh = vehiculo.propiedades;
        if (propiedadesVeh.potencia >= 5 && propiedadesVeh.potencia < 10) mejoras += 1;
        if (propiedadesVeh.potencia >= 10 && propiedadesVeh.potencia < 15) mejoras += 2;
        if (propiedadesVeh.potencia >= 15 && propiedadesVeh.potencia < 20) mejoras += 3;
        if (propiedadesVeh.potencia >= 20) mejoras += 4;
        // if (propiedadesVeh.potencia >= 25) mejoras += 5;
        if (propiedadesVeh.transmision >= 1.05 && propiedadesVeh.transmision < 1.1) mejoras += 1;
        if (propiedadesVeh.transmision >= 1.1 && propiedadesVeh.transmision < 1.15) mejoras += 2;
        if (propiedadesVeh.transmision >= 1.15) mejoras += 3;
        // if (propiedadesVeh.transmision >= 1.2) mejoras += 3;
        // if (vehiculo.getMod(12) == 0) mejoras += 1;
        // if (vehiculo.getMod(12) == 1) mejoras += 2;
        // if (vehiculo.getMod(12) == 2) mejoras += 3;
    }
}
function fallosVehiculo(vehiculo){
    if(vehiculo.propiedades){
        propiedadesVeh = vehiculo.propiedades;
        if(!propiedadesVeh.motor){
            return;
        }
        if(vehiculo.getEngineHealth() < 400){
            if(Math.random() > 0.7){
                mostrarAviso("danger", 5000, "El motor está en las últimas y se ha apagado solo...")
                player_local.vehicle.setEngineOn(false, false, false);
                mp.events.callRemote("encender_apagar_motor", false);
                return;
            }
        }
        
        inicioFallos = (inicioFallos / mejoras);
        if(vehiculo.propiedades.kilometros > inicioFallos){
            resta = vehiculo.propiedades.kilometros - inicioFallos;
            if(resta > 180) if(elCochePresentaFallos(resta, mejoras)) mp.events.callRemote("vehiculo:modificarDaños", vehiculo, kilometros);
        }
    }
}
function elCochePresentaFallos(resta, mejoras){
    // Numero aleatorio del 1 al 1000
    let numero = Math.random() * (1000 - 1) + 1;
    if ((resta / (100 + mejoras * 10) * mejoras >= numero)){
        return true;
    }
    return false;
}

function intervaloVehiculoFuncion() {
    if (player_local.vehicle) {
        let veh = player_local.vehicle;
        if (veh.getPedInSeat(-1) == player_local.handle) {
            if (kilometros - kilometrosAnteriores > 3.153) {
                kilometrosAnteriores = kilometros;
                fallosVehiculo(veh);
            }

            if (veh.propiedades != null && veh.propiedades != undefined) {
                let vida = veh.getBodyHealth();
                if (veh.propiedades.vida > vida) {
                    mp.events.callRemote("vehiculo:actualizar_vida", vida);
                }
            }
        }
    }
}

mp.events.add("reparar_chapa", (vehiculo) => {
    let vida = vehiculo.getBodyHealth();
    vehiculo.setFixed();
    vehiculo.setBodyHealth(vida);
})

function renderVehiculo() {
    if (player_local.vehicle != undefined) {
        if (limitadorVelocidad > 0 && player_local.vehicle.getPedInSeat(-1) == player_local.handle) {
            player_local.vehicle.setMaxSpeed((limitadorVelocidad * 1000) / 3600);
        } else {
            player_local.vehicle.setMaxSpeed(500);
        }

        if (cinturon || congelado) {
            mp.game.controls.disableControlAction(32, 75, true);
        }
        
        if (player_local.vehicle.propiedades)
        {
            if (player_local.vehicle.propiedades.transmision > 0) {
                player_local.vehicle.setEngineTorqueMultiplier(player_local.vehicle.propiedades.transmision);
            }
        }

        if (cruiseEnabled) {
            player_local.vehicle.setForwardSpeed(cruiseSpeed);
            if (player_local.vehicle.hasCollidedWithAnything()) cruiseEnabled = false;   // Comprobación de colisión
            if (mp.game.controls.isControlPressed(2, 76) || mp.game.controls.isControlPressed(2, 72)) cruiseEnabled = false;     //  Comprobación de frenos
            if (mp.game.controls.isControlPressed(32, 71)) cruiseEnabled = false;     // Comprobación de aceleración
            if (player_local.vehicle.isInAir()) cruiseEnabled = false;   //  Comprobación si está en el aire
            if (!player_local.vehicle.getIsEngineRunning()) cruiseEnabled = false;   //  Comprobación si apaga el coche
            if (!cruiseEnabled) mostrarAviso("danger", 5000, "El modo crucero ha sido deshabilitado");
        }

        // mp.gui.chat.push("danoArmas es: "+danoArmas);

        let daño = bodyHealthVeh - player_local.vehicle.getBodyHealth();
        // if(player_local.vehicle.hasCollidedWithAnything()){
        let vidaActual = player_local.vehicle.getBodyHealth();
        vida_vehiculo_jugador = vidaActual + (1000 - vidaActual) * (vidaActual / 1200);
        player_local.vehicle.setEngineHealth(vida_vehiculo_jugador);
        if (vida_vehiculo_jugador < 200 && player_local.vehicle.getIsEngineRunning()) mp.events.callRemote("encender_apagar_motor", false);
        // }

        if (player_local.vehicle.getIsEngineRunning()) {
            let danoMotor = engineHealthVeh - vida_vehiculo_jugador;
            if (player_local.vehicle && vehiculo_jugador_asiento == -1 && (danoMotor >= 60) && (danoMotor <= 90)) { // Lo mismo que arriba. Apaga el motor y le cuesta encenderlo a la siguiente.

                player_local.vehicle.setEngineOn(false, false, false);
                mp.events.callRemote("encender_apagar_motor", false);
                if (vida_vehiculo_jugador < 550) {
                    mp.events.callRemote("vehiculo:modificarDaños", vehiculo, kilometros);
                }
            }
                if (player_local.vehicle && vehiculo_jugador_asiento == -1 && (danoMotor >= 90)) { // Destruye el motor.
                    player_local.vehicle.setEngineOn(false, false, false);
                    mp.events.callRemote('vehiculos:motor:destruidoImpacto', player_local.vehicle, danoMotor);
                }
                
            if (player_local.vehicle && vehiculo_jugador_asiento == -1) {
                if (player_local.vehicle.getEngineHealth() < 400 && !direccionDamage) {
                    direccionDamage = true;
                    mp.game.invoke("0x222FF6A823D122E2", player_local.vehicle.handle, true); // Jode un montón el coche, como si no llevara las cadenas en la nieve. Para ir bien, debe reparar el motor en un mecánico.
                } else {
                    if (!icono_clima == "snow" || (icono_clima == "snow" && (player_local.vehicle.propiedades.alarma_cadenas == 0 || player_local.vehicle.propiedades.alarma_cadenas == 1)) && direccionDamage) {
                        direccionDamage = false;
                        mp.game.invoke("0x222FF6A823D122E2", player_local.vehicle.handle, false);
                    }
                }
            }
        }
    }
}

mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    if (player_local.vehicle != undefined) {
        if(targetEntity.type === 'vehicle') {
            if (weapon == 2725352035)
            {
                let vida = player_local.vehicle.getBodyHealth() - 5;
                mp.events.callRemote("vehiculo:actualizar_vida", vida);
                return true;
            }
        }
    }
});

//Cadenas de nieve navidad
function intervaloNieve() {
    if (icono_clima == "snow") {
        if (player_local.vehicle && player_local.vehicle.getPedInSeat(-1) == player_local.handle) {
            if (player_local.vehicle.getClass() == 8) {
                if ((player_local.vehicle.getSpeed() * 3.6) > 30) {
                    if (player_local.vehicle.propiedades != undefined) {
                        switch (player_local.vehicle.propiedades.alarma_cadenas) {
                            case 0: case 1: // No tiene cadenas
                                var timeRagdoll = (Math.floor(Math.random() * 3) + 1) * 1000;
                                player_local.setToRagdoll(timeRagdoll, timeRagdoll * 2, 0, false, false, false);
                                mostrarAviso("info", 6000, "Al no llevar cadenas pierdes el control");
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    }
}

//Está esposado y en una moto
function intervaloEsposas() {
    if (player_local.vehicle && player_local.vehicle.getPedInSeat(0) == player_local.handle) {
        if (player_local.vehicle.getClass() == 8) {
            if ((player_local.vehicle.getSpeed() * 3.6) > 50) {
                var timeRagdoll = (Math.floor(Math.random() * 3) + 1) * 1000;
                player_local.setToRagdoll(timeRagdoll, timeRagdoll * 2, 0, false, false, false);
                mostrarAviso("info", 6000, "Al estar esposado no te has agarrado bien y caes");
            }
        }
    }
}

mp.events.add("sin_gasolina", () => {
    if (player_local.vehicle != undefined) {
        if (player_local.vehicle.propiedades != undefined) {
            player_local.vehicle.propiedades.gasolina = 0;
        }
    }
});
 
mp.events.add("playerLeaveVehicle", () => {
    limitadorVelocidad = 0;
    mp.events.call("hud:limitadorVelocidad:ocultar");
    clearInterval(guardarDamage);
    mejoras = null;
    propiedadesVeh = null;
    guardarDamage = null;
    if (cinturon) cinturon = false;
    mp.events.remove('render', renderVehiculo);
    if(armaActiva.id > 0){
        crearTimeout(() => {
            sacarArmaCargador(armaActiva.cantidad);
        }, 1000)
    }
    if(intervalo_nieve != null)
    {
        clearInterval(intervalo_nieve);
        intervalo_nieve = null;
    }
    
    if(intervalo_esposas != null)
    {
        clearInterval(intervalo_esposas);
        intervalo_esposas = null;
    }
    
    if(intervaloVehiculo != null)
    {
        clearInterval(intervaloVehiculo);
        intervaloVehiculo = null;
    }
});
 
function montarVehiculoGrua(grua, vehiculoRemolcado, posicion = null) {
    if (!grua.handle || !vehiculoRemolcado.handle) return;
    if (vehiculoRemolcado.model == mp.game.joaat("cargobob") || vehiculoRemolcado.model == mp.game.joaat("cargobob2") || vehiculoRemolcado.model == mp.game.joaat("cargobob3") || vehiculoRemolcado.model == mp.game.joaat("cargobob4")) {
        var hueso = vehiculoRemolcado.getBoneIndexByName("chassis");
        crearTimeout(() => {
            vehiculoRemolcado.attachTo(grua.handle, hueso, 0.0, 0.5, -4.5, 0.0, 0.0, 0.0, false, false, true, false, 2, true);
        }, 100);
    }
    else if (vehiculoRemolcado.model == mp.game.joaat("skylift")) {
        var hueso = vehiculoRemolcado.getBoneIndexByName("chassis");
        crearTimeout(() => {
            vehiculoRemolcado.attachTo(grua.handle, hueso, 0.0, -3.0, -1.0, 0.0, 0.0, 0.0, false, false, true, false, 2, true);
        }, 100);
    }
    else if (posicion) {
        vehiculoRemolcado.setCollision(false, true);
        if (!mp.controladorVehiculos._vehiculosGrua.hasOwnProperty(vehiculoRemolcado.remoteId)) {
            mp.controladorVehiculos._vehiculosGrua[vehiculoRemolcado.remoteId] = {
                grua: grua.remoteId,
                posicion: posicion
            };
        }
    }
}
 
mp.events.add("playerCommand", (command) => {
    const args = command.split(/[ ]+/);
    const commandName = args[0];
 
    args.shift();
 
    if (commandName === "menucoche") {
        if (!logueado) return;
 
        if (player_local.vehicle) {
            if (player_local.vehicle.getPedInSeat(-1) == player_local.handle) {
                if (setFloodboton(1000, "FB20") == false) return;

                mp.events.call("mostrar_menu_coche");
            }
        }
    }

    // if(commandName === "dañoscoche") {
    //     mp.gui.chat.push("bodyHealth "+player_local.vehicle.getBodyHealth());
    //     mp.gui.chat.push("engineHealth "+player_local.vehicle.getEngineHealth());
    //     mp.gui.chat.push("vida_vehiculo_jugador "+vida_vehiculo_jugador);
    // }
});

// Funcion para bajar o subir la ventanilla de un vehículo
function bajar_subir_ventanilla(ventanilla) {
    if (player_local.vehicle) {
        if (player_local.vehicle.getPedInSeat(-1) == player_local.handle || player_local.vehicle.getPedInSeat(ventanilla-1) == player_local.handle) {
            if (sinVentanas.indexOf(player_local.vehicle.getClass()) == -1) {
                if (setFloodboton(1000, "FB21") == false) return;

                mp.events.callRemote("vantana_vehiculo", ventanilla);
            }
        }
    }
}
 
//Tecla NumPad 7
mp.keys.bind(0x67, true, function () {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (player_local.vehicle) {
        if (player_local.vehicle.getPedInSeat(-1) == player_local.handle) {
            if (sinVentanas.indexOf(player_local.vehicle.getClass()) == -1) {
                if (setFloodboton(1000, "FB22") == false) return;

                mp.events.callRemote("vantana_vehiculo", 0);
            }
        }
    }
});
// Tecla F
mp.keys.bind(0x46, true, function () {
if (!logueado)
    return;
if (estaChatAbierto)
    return;
if (navegador != null)
    return;
if (menuAbierto) return;
if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
if (cantidad_cefs > 0) return;
if (player_local.vehicle) {
    if(cinturon){
        mp.events.callRemote("poner_quitar_cinturon");
    }
}
});

//Tecla NumPad 9
mp.keys.bind(0x69, true, function () {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) {
        if (player_local.vehicle.getPedInSeat(-1) == player_local.handle || player_local.vehicle.getPedInSeat(0) == player_local.handle) {
            if (sinVentanas.indexOf(player_local.vehicle.getClass()) == -1) {
                if (setFloodboton(1000, "FB23") == false) return;

                mp.events.callRemote("vantana_vehiculo", 1);
            }
        }
    }
});
//Tecla NumPad 1
mp.keys.bind(0x61, true, function () {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) {
        if (player_local.vehicle.getPedInSeat(-1) == player_local.handle || player_local.vehicle.getPedInSeat(1) == player_local.handle) {
            if (sinVentanas.indexOf(player_local.vehicle.getClass()) == -1) {
                if (setFloodboton(1000, "FB24") == false) return;

                mp.events.callRemote("vantana_vehiculo", 2);
            }
        }
    }
});
//Tecla NumPad 3
mp.keys.bind(0x63, true, function () {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) {
        if (player_local.vehicle.getPedInSeat(-1) == player_local.handle || player_local.vehicle.getPedInSeat(2) == player_local.handle) {
            if (sinVentanas.indexOf(player_local.vehicle.getClass()) == -1) {
                if (setFloodboton(1000, "FB25") == false) return;

                mp.events.callRemote("vantana_vehiculo", 3);
            }
        }
    }
});
//Tecla NumPad 4
mp.keys.bind(0x64, true, function () {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) {
        if (setFloodboton(1000, "FB26") == false) return;

        let vehicle = player_local.vehicle;
        if (vehicle && vehicle.getPedInSeat(-1) == player_local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1)
            mp.events.callRemote("toggleIndicator", 1);
    }
});
//Tecla NumPad 6
mp.keys.bind(0x66, true, function () {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) {
        if (setFloodboton(1000, "FB27") == false) return;

        let vehicle = player_local.vehicle;
        if (vehicle && vehicle.getPedInSeat(-1) == player_local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1)
            mp.events.callRemote("toggleIndicator", 0);
    }
});
//Tecla NumPad 5
mp.keys.bind(0x65, true, function () {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (player_local.vehicle) {
        if (setFloodboton(1000, "FB28") == false) return;

        let vehicle = player_local.vehicle;
        if (vehicle && vehicle.getPedInSeat(-1) == player_local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1)
        mp.events.callRemote("toggleIndicator", 2);
    }
});

}