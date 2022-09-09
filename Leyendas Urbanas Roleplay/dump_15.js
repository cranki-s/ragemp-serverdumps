{
/* --------------------------------------------------------------------------------
 * objetos.js
 *
 * Autor: Kenshin
 *
 * Descripción: Funciones relacionadas con objetos
 *
 * -------------------------------------------------------------------------------- */

let intervalo_pinchos = null;
let arrayPinchos = [];
var ruedasCoche = [
    ["wheel_lf", 0],
    ["wheel_lr", 2],
    ["wheel_rf1", 4],
    ["wheel_rf", 1],
    ["wheel_rm", 3],
    ["wheel_rr", 5],
];
let modelosColision = {}; // Modelos de objetos que tienen colision desactivada con coches por ser de poco volumen (NO AFECTA A PROPS)
const maxVolumenObjeto = 0.7; // Volumen a partir del cual los objetos tienen colision, por debajo no tienen colision

// object entityStreamIn - streamHandler
function streamInObjects(entity) {
    try {
        // Comprobamos si el objeto ha sido recogido por otro jugador
        let e = (entity.hasVariable("OBJETO") && entity.getVariable("OBJETO"));
        // El objeto no ha sido recogido, sigue en el suelo simplemente borramos el text label para optimizar
        if (e) {
            if (objetosSuelo.hasOwnProperty(entity.id)) {
                // Codigo para quitar las colisiones entre vehiculos y objetos de poco volumen (NO AFECTA A PROPS)
                if (modelosColision.hasOwnProperty(entity.model)){
                    if (modelosColision[entity.model] == false){
                        // Antiguo modelo SIN colision
                        if (player_local.vehicle) entity.setNoCollision(player_local.vehicle.handle, false);
                        objetosSuelo[entity.id].colision = false;
                    }
                }
                else {
                    // Si es la primera vez que hacemos streamIn de este modelo de objeto calculamos si debe tener colisiones con vehiculos
                    let dimObj = mp.game.gameplay.getModelDimensions(entity.model);
                    if (dimObj){
                        let dimTotalX = Math.abs(dimObj.max.x) + Math.abs(dimObj.min.x);
                        let dimTotalY = Math.abs(dimObj.max.y) + Math.abs(dimObj.min.y);
                        let dimTotalZ = Math.abs(dimObj.max.z) + Math.abs(dimObj.min.z);
    
                        let volumenObjeto = dimTotalX * dimTotalY * dimTotalZ;
                        if (volumenObjeto <= maxVolumenObjeto){
                            // Nuevo modelo SIN colision
                            if (player_local.vehicle) entity.setNoCollision(player_local.vehicle.handle, false);
                            objetosSuelo[entity.id].colision = false;
                            modelosColision[entity.model] = false;
                        }
                        else{
                            // Nuevo modelo CON colision
                            objetosSuelo[entity.id].colision = true;
                            modelosColision[entity.model] = true;
                        }
                    }
                }

                if (objetosSuelo[entity.id].nombre == "Pinchos") {
                    let existe = false;
                    for (let i = 0; i < arrayPinchos.length; i++) {
                        if (arrayPinchos[i].sqlid == objetosSuelo[entity.id].sqlid) {
                            existe = true;
                            break;
                        }
                    }
                    if (!existe) {
                        let obj = {
                            entity: entity,
                            sqlid: objetosSuelo[entity.id].sqlid
                        }
                        arrayPinchos.push(obj);
                    }
                    if (intervalo_pinchos == null && arrayPinchos.length > 0) {
                        intervalo_pinchos = setInterval(intervaloPinchos, 150);
                    }
                }
                if (!entity.labelSuelo && mostrar_texto_objetos) {
                    let dimObj = mp.game.gameplay.getModelDimensions(entity.model);
                    let zCorrecta = entity.position.z + 0.2;
                    if (dimObj) {
                        zCorrecta += Math.abs(dimObj.max.z);
                    }

                    entity.labelSuelo = mp.labels.new("~y~" + objetosSuelo[entity.id].nombre + "\n~g~[X]~w~ para recoger", new mp.Vector3(entity.position.x, entity.position.y, zCorrecta), { los: false, font: 6, drawDistance: 1.5, color: [255, 255, 255, 255], dimension: entity.dimension });
                }
            }
        } else {
            // El objeto ha sido recogido por otro jugador o lo que sea por algun motivo no existe ya en el suelo
            if (entity.labelSuelo && mp.labels.exists(entity.labelSuelo)) {
                entity.labelSuelo.destroy();
                entity.labelSuelo = null;
            }

            delete objetosSuelo[entity.id];
        }
    } catch (e) {
        logError("OBJ-1", e);
    }
}

// object entityStreamOut - streamHandler
function streamOutObjects(entity) {
    try {
        // Comprobamos si el objeto ha sido recogido por otro jugador
        let e = (entity.hasVariable("OBJETO") && entity.getVariable("OBJETO"));
        // El objeto no ha sido recogido, sigue en el suelo simplemente borramos el text label para optimizar
        if (e) {
            if (objetosSuelo.hasOwnProperty(entity.id)) {
                if (objetosSuelo[entity.id].nombre == "Pinchos") {
                    for (let i = 0; i < arrayPinchos.length; i++) {
                        if (arrayPinchos[i].sqlid == objetosSuelo[entity.id].sqlid) {
                            arrayPinchos.splice(i, 1);
                            break;
                        }
                    }

                    if (intervalo_pinchos != null && arrayPinchos.length <= 0) {
                        clearInterval(intervalo_pinchos);
                        intervalo_pinchos = null;
                    }
                }
                if (entity.labelSuelo && mp.labels.exists(entity.labelSuelo)) {
                    entity.labelSuelo.destroy();
                    entity.labelSuelo = null;
                }
            }
        } else {
            // El objeto ha sido recogido por otro jugador o lo que sea por algun motivo no existe ya en el suelo
            if (entity.labelSuelo && mp.labels.exists(entity.labelSuelo)) {
                entity.labelSuelo.destroy();
                entity.labelSuelo = null;
            }
            delete objetosSuelo[entity.id];
        }
    } catch (e) {
        logError("OBJ-2", e);
    }
}

function intervaloPinchos() {
    if (!player_local.vehicle) return;
    if (player_local.vehicle.getPedInSeat(-1) != player_local.handle) return;
    for (let i = arrayPinchos.length - 1; i >= 0; i--) {
        if (arrayPinchos[i].entity.handle > 0) {
            if (calcDist(player_local.position, arrayPinchos[i].entity.position) <= 3.0) {
                let idRuedaAleatorio = Math.floor(Math.random() * ruedasCoche.length);
                player_local.vehicle.setTyreBurst(idRuedaAleatorio, false, 1000);
                // Lo borramos
                mp.events.callRemote("borrar_pincho", arrayPinchos[i].sqlid);
            }
        }
        else {
            arrayPinchos.splice(i, 1);
        }
    }

    if (intervalo_pinchos != null && arrayPinchos.length <= 0) {
        clearInterval(intervalo_pinchos);
        intervalo_pinchos = null;
    }
}

mp.events.addDataHandler("OBJETO", (entity, value) => {
    if (!entity || entity.type !== "object") return;
    if (typeof value !== "string") return;
    try {
        if (objetosSuelo.hasOwnProperty(entity.id)) {
            if (objetosSuelo[entity.id].nombre == "Pinchos") {
                for (let i = 0; i < arrayPinchos.length; i++) {
                    if (arrayPinchos[i].sqlid == objetosSuelo[entity.id].sqlid) {
                        arrayPinchos.splice(i, 1);
                        break;
                    }
                }

                if (intervalo_pinchos != null && arrayPinchos.length <= 0) {
                    clearInterval(intervalo_pinchos);
                    intervalo_pinchos = null;
                }
            }
            delete objetosSuelo[entity.id];
        }

        if (entity.labelSuelo && mp.labels.exists(entity.labelSuelo)) {
            entity.labelSuelo.destroy();
            entity.labelSuelo = null;
        }

        let valueJson = JSON.parse(value);
        objetosSuelo[entity.id] = { sqlid: (valueJson[0] ? valueJson[0] : -1), pos: entity.position, dimension: entity.dimension, nombre: (valueJson[1] ? valueJson[1] : ""), colision: true };
        entity.notifyStreaming = true;
    } catch (e) {
        logError("OBJ-3", e);
    }
});

// Evitamos que el coche al que subimos tenga colisiones con objetos de poco volumen
mp.events.add("playerEnterVehicle", (vehiculo, seat) => {
    if (vehiculo){
        mp.objects.forEachInStreamRange(function (object) { 
            if (objetosSuelo.hasOwnProperty(object.id) && objetosSuelo[object.id].colision == false){
                object.setNoCollision(vehiculo.handle, false);
            }
        });
    }
});

}