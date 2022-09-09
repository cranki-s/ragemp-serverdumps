{
/* --------------------------------------------------------------------------------
 * misiones.js
 *
 * Autor: dries
 *
 * Descripción: Eventos y funciones requeridos por el sistema de misiones.
 * -------------------------------------------------------------------------------- */

var pedsMisiones = {};
var colshapesMisiones = {};
var objetosMisiones = {};
var markersMisiones = {};
var ultimaCamaraMisiones = null;

mp.events.add({
    'misiones:ped:crear': async (accionId, modelo, posicion, heading, dimension) => {
        if (!mp.game.streaming.hasModelLoaded(mp.game.joaat(modelo))) {
            mp.game.streaming.requestModel(mp.game.joaat(modelo));
            while (!mp.game.streaming.hasModelLoaded(mp.game.joaat(modelo))) await mp.game.waitAsync(0);
        }

        let p = mp.peds.new(mp.game.joaat(modelo), posicion, heading, dimension);

        if (!p.hasCollisionLoadedAround() || p.isWaitingForWorldCollision()) {
            mp.game.streaming.requestCollisionAtCoord(p.position.x, p.position.y, p.position.z);
            while (!p.hasCollisionLoadedAround() || p.isWaitingForWorldCollision()) await mp.game.waitAsync(0);
        }

        //mp.gui.chat.push("[debug] " + JSON.stringify(p));
    
        // p.setDynamic(true);
        // p.freezePosition(false);
        p.setCanBeDamaged(true);
        p.setInvincible(false);
        p.setOnlyDamagedByPlayer(true);
        p.setCanRagdollFromPlayerImpact(true);
        p.setRagdollOnCollision(true);
        p.setProofs(false, false, false, false, false, false, false, false);
    
        if (Object.keys(pedsMisiones).length <= 0) {
            // mp.gui.chat.push("creado render");
            mp.events.add("render", misiones_renderPeds);
        }
    
        pedsMisiones[accionId] = {id: p.id, vivo: true, creadoUnix: Date.now()};
    },
    'misiones:ped:borrar': accionId => {
        if (pedsMisiones.hasOwnProperty(accionId)) {
            const p = mp.peds.at(pedsMisiones[accionId].id);
            if (!p) return;
    
            p.destroy();
            delete pedsMisiones[accionId];
        }
    },

    'misiones:colshape:crear': (accionId, posicion, rango, dimension) => {
        const c = mp.colshapes.newSphere(posicion.x, posicion.y, posicion.z, rango, dimension);
        //mp.gui.chat.push("[debug] " + JSON.stringify(c));
    
        if (Object.keys(colshapesMisiones).length <= 0) {
            mp.events.add("playerEnterColshape", misiones_enterColshape);
        }
    
        colshapesMisiones[c.id] = { colshape: c, accionId: accionId };
    },
    'misiones:colshape:borrar': accionId => {
        for (const colshapeId in colshapesMisiones) {
            const c = colshapesMisiones[colshapeId];
            if (!c) continue;

            if (c.accionid == accionId) {
                if (mp.colshapes.exists(c.colshape)) {
                    c.colshape.destroy();
                }
        
                delete colshapesMisiones[colshapeId];
                break;
            }
        }

        if (Object.keys(colshapesMisiones).length <= 0) {
            mp.events.remove("playerEnterColshape", misiones_enterColshape);
        }
    },
    
    'misiones:camara:crear': (accionId, posicion, rotacion, interpolar, tiempo) => {
        let c = mp.cameras.new('default', posicion, rotacion, 90);

        if (interpolar && ultimaCamaraMisiones) {
            //mp.gui.chat.push("[debug] interpolando");
            c.setActiveWithInterp(ultimaCamaraMisiones.handle, tiempo, 1, 1);
        }

        //mp.gui.chat.push("[debug] se crea cam inter " + interpolar + ", ult cam " + JSON.stringify(ultimaCamaraMisiones));

        if (!interpolar || !ultimaCamaraMisiones) {
            //mp.gui.chat.push("[debug] active true");
            c.setActive(true);
            mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);
        } else if (interpolar && ultimaCamaraMisiones) {
            //mp.gui.chat.push("[debug] render script cams");
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
        }

        ultimaCamaraMisiones = c;
    },
    'misiones:camara:reset': tiempo => {
        if (!ultimaCamaraMisiones) {
            return;
        }

        ultimaCamaraMisiones.setActive(false);
        mp.game.cam.renderScriptCams(false, true, tiempo, true, true);

        if (mp.cameras.exists(ultimaCamaraMisiones))
            ultimaCamaraMisiones.destroy();

        ultimaCamaraMisiones = null;
    },

    'misiones:util:fadeIn': tiempo => {
        mp.game.cam.doScreenFadeIn(tiempo);
    },
    'misiones:util:fadeOut': tiempo => {
        mp.game.cam.doScreenFadeOut(tiempo);
    },
    'misiones:util:hud': (mostrarMinimapa, mostrarHud) => {
        mp.game.ui.displayRadar(!!mostrarMinimapa);
        mp.game.ui.displayHud(!!mostrarHud);
        mp.gui.chat.show(!!mostrarHud);

        if ((!!mostrarHud && hudOculto) || (!mostrarHud && !hudOculto)) {
            mp.events.call("hud:estado_hud");
            return;
        }
    },
    'misiones:util:mostrarAyudaNativa': (texto, tiempo) => {
        mp.game.gxt.set('DBR_METHHLP', texto);
        mp.game.ui.setTextComponentFormat('DBR_METHHLP');

        mp.game.ui.displayHelpTextFromStringLabel(0, false, true, tiempo);
    },

    'misiones:objetos:crear': async (accionId, modelo, posicion, rotacion, dimension, nombre) => {
        if (!mp.game.streaming.hasModelLoaded(modelo)) {
            mp.game.streaming.requestModel(modelo);
            while (!mp.game.streaming.hasModelLoaded(modelo)) await mp.game.waitAsync(0);
        }

        const o = mp.objects.new(modelo, posicion, {
            rotation: rotacion,
            dimension: dimension,
        });

        if (!o.hasCollisionLoadedAround() || o.isWaitingForWorldCollision()) {
            mp.game.streaming.requestCollisionAtCoord(o.position.x, o.position.y, o.position.z);
            while (!o.hasCollisionLoadedAround() || o.isWaitingForWorldCollision()) await mp.game.waitAsync(0);
        }

        let l = null;
        if (typeof nombre === 'string' && nombre.length > 0) {
            let zCorrecta = o.position.z + 0.2;
            let dimObj = mp.game.gameplay.getModelDimensions(o.model);
            if (dimObj != undefined && dimObj != null) {
                zCorrecta += Math.abs(dimObj.max.z);
            }

            l = mp.labels.new("~y~" + nombre + "\n~g~[X]~w~ para recoger", new mp.Vector3(posicion.x, posicion.y, zCorrecta), { los: false, font: 6, drawDistance: 1.5, color: [255, 255, 255, 255], dimension: dimension });
        }

        let obj = {
            o: o,
            label: l,
            nombre: nombre
        };

        if (objetosMisiones.hasOwnProperty(accionId)) {
            delete objetosMisiones[accionId];
        }

        objetosMisiones[accionId] = obj;
        // mp.gui.chat.push('[debug] creado c_obj ' + JSON.stringify(obj));
    },
    'misiones:objetos:borrar': accionId => {
        //mp.gui.chat.push("[debug] borrando obj " + accionId);
        if (!objetosMisiones.hasOwnProperty(accionId)) {
            return;
        }

        // te preguntaras por qué he llamado a la variable o:
        // porque el objeto de rage se llama o tambien
        // y al llamar al objeto de rage se produce la cara o.o
        const o = objetosMisiones[accionId];

        if (o) {
            if (o.o && mp.objects.exists(o.o)) {
                o.o.destroy();
                o.o = null;
            }
    
            if (o.label && mp.labels.exists(o.label)) {
                o.label.destroy();
                o.label = null;
            }

            delete objetosMisiones[accionId];
        }
    },

    'misiones:marcador:crear': (accionId, tipo, posicion, tamano, dimension) => {
        const m = mp.markers.new(tipo, posicion, tamano, {
            dimension: dimension,
            visible: true,
            color: [200, 247, 57, 180]
        });

        if (markersMisiones.hasOwnProperty(accionId)) {
            delete markersMisiones[accionId];
        }

        markersMisiones[accionId] = m;
        // mp.gui.chat.push('[debug] creado marker ' + JSON.stringify(m));
    },
    'misiones:marcador:borrar': accionId => {
        //mp.gui.chat.push("[debug] borrando marcador " + accionId);

        if (accionId >= 0) {
            if (!markersMisiones.hasOwnProperty(accionId)) {
                return;
            }
    
            const m = markersMisiones[accionId];
    
            if (m && mp.markers.exists(m)) {
                m.destroy();
                delete markersMisiones[accionId];
            }
        } else {
            for (const aId in markersMisiones) {
                const m = markersMisiones[aId];
                if (m && mp.markers.exists(m)) {
                    m.destroy();
                    delete markersMisiones[accionId];
                }
            }
        }
    }

});

function misiones_enterColshape(colshape) {
    if (colshapesMisiones.hasOwnProperty(colshape.id)) {
        const colshapeObj = colshapesMisiones[colshape.id];

        mp.events.callRemote("misiones:entrarColshape", colshapeObj.accionId);

        if (mp.colshapes.exists(colshape)) {
            colshape.destroy();
        }

        delete colshapesMisiones[colshape.id];

        if (Object.keys(colshapesMisiones).length <= 0) {
            mp.events.remove("playerEnterColshape", misiones_enterColshape);
        }
    }
}

function misiones_renderPeds() {
    for (let accionId in pedsMisiones) {
        const ped = pedsMisiones[accionId];
        if (!ped.vivo) continue;

        const p = mp.peds.at(ped.id);
        if (!p) continue;
        if (!mp.peds.exists(p)) continue;
        if (p.handle === 0) continue;

        // p.setDynamic(true);
        // p.freezePosition(false);
        // p.setCanBeDamaged(true);
        // p.setInvincible(false);
        // p.setOnlyDamagedByPlayer(true);
        // p.setCanRagdollFromPlayerImpact(true);
        // p.setRagdollOnCollision(true);
        // p.setProofs(false, false, false, false, false, false, false, false);

        if (p.isDead() && (Date.now() - ped.creadoUnix) >= 500) {
            ped.vivo = false;

            // Pasado un tiempo eliminamos el ped
            // ya no podremos usarlo en la mision, sera invalido
            crearTimeout(() => {
                if (mp.peds.exists(p)) {
                    p.destroy();
                    delete pedsMisiones[accionId];
                }
            }, 5_000);

            // mp.gui.chat.push("muere ped");
            mp.events.callRemote("jugador:alMatarPed", accionId);
        }
    }

    if (Object.keys(pedsMisiones).length <= 0) {
        // mp.gui.chat.push("se elimina render");
        mp.events.remove("render", misiones_renderPeds);
    }
}
}