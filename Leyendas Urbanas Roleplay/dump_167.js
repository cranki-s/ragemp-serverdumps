{
﻿/*
 * Controlador de streamIn y streamOut
 * 
 * Autor: poleStar
 * 
 * Descripción: El objetivo de este archivo es agrupar todas las referencias de los eventos streamIn y streamOut para redirigirlos según sea necesario a las funciones correspondientes.
 * De esta forma evitamos ejecutar muchas comprobaciones innecesarias correspondientes al stream de otro tipo de entidades.
 * El efecto de esto será más notable dependiendo de la cantidad de entidades que están entrando/saliendo de stream, recordemos que suelen ser muchas en ciertas zonas.
 */

// Evento streamIn - Redirige a las funciones necesarias según el tipo de entidad que entra en stream
mp.events.add("entityStreamIn", (entity) => {
    if (!logueado || !entity) return;

    switch (entity.type) {
        case "player":
            if (mp.players.exists(entity)) {
                streamInPlayers(entity); // jugadorSync.js
                streamInRails(entity); // rails.js
                streamInVoz(entity); // voz.js
            }
            return;
        case "vehicle":
            if (mp.vehicles.exists(entity)) {
                streamInVehiculos(entity); // vehiculoSync.js
            }
            return;
        case "object":
            if (mp.objects.exists(entity)) {
                streamInObjetos(entity); // jugadorSync.js
                streamInObjects(entity); // objetos.js
            }
            return;
        case "ped":
            if (mp.peds.exists(entity)) {
                streamInPeds(entity); // peds (junta peds.js, pedsfacciones.js, alerta.js)
            }
            return;
        default:
            return;
	}
});

// Evento streamOut - Redirige a las funciones necesarias según el tipo de entidad que sale de stream
mp.events.add("entityStreamOut", (entity) => {
    if (!logueado || !entity) return;

    switch (entity.type) {
        case "player":
            if (mp.players.exists(entity)) {
                streamOutPlayers(entity); // jugadorSync.js
                streamOutVoz(entity); // voz.js
            }
            return;
        case "vehicle":
            if (mp.vehicles.exists(entity)) {
                streamOutVehiculos(entity); // vehiculoSync.js
            }
            return;
        case "object":
            if (mp.objects.exists(entity)) {
                streamOutObjects(entity); // objetos.js
            }
            return;
        default:
            return;
    }
});

// ped entityStreamIn - streamHandler
function streamInPeds(entity) {
    // streamIn peds.js
    for (let i = 0, n = PedsEscenarios.length; i < n; i++) {
        let p = PedsEscenarios[i];
        if (p.ped == entity) {
            entity.taskStartScenarioInPlace(p.escenario, -1, false);
            return;
        }
    }

    // streamIn peds.js
    for (let i = 0, n = PedsAnimaciones.length; i < n; i++) {
        let p = PedsAnimaciones[i];
        if (p.ped == entity) {
            mp.game.streaming.requestAnimDict(p.diccionario);
            entity.taskPlayAnim(p.diccionario, p.animacion, 8.0, 1.0, -1, 1, 0.0, false, false, false);
            return;
        }
    }

    // streamIn alerta.js (solo se usa con purga activa)
    if (pedsAmmuEscenarios.length > 0) {
        for (let i = 0, n = pedsAmmuEscenarios.length; i < n; i++) {
            let p = PedsEscenarios[i];
            if (p.ped == entity) {
                entity.taskStartScenarioInPlace(p.escenario, -1, false);
                return;
            }
        }
    }
}

}