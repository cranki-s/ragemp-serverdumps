{

var peds_facciones_by_entity_id = {};
var intervaloApuntadoPed = null;

mp.events.add({
    "faccion:ped:createAll": pedArray => {
        pedArray = typeof pedArray === "string" ? JSON.parse(pedArray) : pedArray;
        if (!pedArray) return;

        for (const ped of pedArray) {
            if (peds_facciones.hasOwnProperty(ped.SQLID))
                continue;

            const p = mp.peds.new(
                mp.game.joaat(ped.modelo),
                ped.posicion,
                ped.rotacion.z,
                0
            );

            const o = Object.assign({
                ped: p,
                tiroteoActivo: null,
            }, ped);

            peds_facciones[ped.SQLID] = o;
            peds_facciones_by_entity_id[p.id] = ped.SQLID;
        }
    },

    "faccion:ped:createOne": ped => {
        ped = typeof ped === "string" ? JSON.parse(ped) : ped;
        if (!ped) return;

        if (peds_facciones.hasOwnProperty(ped.SQLID))
            return;

        const p = mp.peds.new(
            mp.game.joaat(ped.modelo),
            ped.posicion,
            ped.rotacion.z,
            0
        );

        const o = Object.assign({
            ped: p,
            tiroteoActivo: null
        }, ped);

        peds_facciones[ped.SQLID] = o;
        peds_facciones_by_entity_id[p.id] = ped.SQLID;
    },

    "faccion:ped:sync": ped => {
        ped = typeof ped === "string" ? JSON.parse(ped) : ped;
        if (!ped) return;

        if (!peds_facciones.hasOwnProperty(ped.SQLID))
            return;

        const keys = Object.keys(ped);
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if (k === "ped") continue;

            if (peds_facciones[ped.SQLID].hasOwnProperty(k)) {
                if (k === 'modelo') {
                    if (peds_facciones[ped.SQLID][k] != ped[k]) {
                        if (peds_facciones[ped.SQLID].ped && mp.peds.exists(peds_facciones[ped.SQLID].ped)) {
                            peds_facciones[ped.SQLID].ped.model = mp.game.joaat(ped[k]);
                        }
                    }
                }

                peds_facciones[ped.SQLID][k] = ped[k];
            }
        }
    },

    "faccion:ped:delOne": sqlid => {
        sqlid = typeof sqlid === "string" ? parseInt(sqlid) : sqlid;
        if (!sqlid || sqlid <= 0) return;

        if (!peds_facciones.hasOwnProperty(sqlid))
            return;

        const p = peds_facciones[sqlid].ped;
        if (mp.peds.exists(p)) {
            delete peds_facciones_by_entity_id[p.id];
            p.destroy();
        }

        delete peds_facciones[sqlid];
    },

    "faccion:ped:delAll": sqlid => {
        sqlid = typeof sqlid === "string" ? parseInt(sqlid) : sqlid;
        if (!sqlid || sqlid <= 0) return;

        for (const pedId in peds_facciones) {
            if (peds_facciones[pedId].faccion_id != sqlid)
                continue;

            const p = peds_facciones[pedId].ped;
            if (mp.peds.exists(p)) {
                delete peds_facciones_by_entity_id[p.id];
                p.destroy();
            }

            delete peds_facciones[pedId];
        }
    }
});

function obtenerPedsStream() {
    const result = [];

    for (const p of mp.peds.streamed) {
        result.push(p);
    }

    return result;
}

setInterval(function funcionIntervaloApuntadoPed() {
    if (!logueado)
        return;
    if (menuAbierto) return;
    if (mp.game.invoke("0xB0034A223497FFCB")) return;
    if (estaChatAbierto)
        return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;

    for (const streamedPed of mp.peds.streamed) {
        if (peds_facciones_by_entity_id.hasOwnProperty(streamedPed.id)) {
            const pedId = peds_facciones_by_entity_id[streamedPed.id];
            const ped = peds_facciones[pedId];

            if (!ped) continue;
            if (ped.muerto || ped.detenido || !ped.activo || ped.retirado) continue;
    
            if (!ped.muerto && ped.ped.isDead()) {
                peds_facciones[pedId].muerto = true;
                ped.tiroteoActivo = null;
                mp.events.callRemote("ped:matar_ped", pedId);
                continue;
            }

            // Pasado un minuto desde el tiroteo si el tio se aleja
            // cierto rango el tiroteo se cancela

            if (ped.tiroteoActivo != null) {
                if (typeof ped.tiroteoUnix !== 'undefined' && (Date.now() - ped.tiroteoUnix >= 60_000)) {
                    if (calcDist(player_local.position, ped.ped.position) >= 100 || ped.tiroteoActivo.isDead()) {
                        ped.tiroteoActivo = null;
                        mp.events.callRemote("ped:abandonar_tiroteo", ped.SQLID);
                        continue;
                    }
                }
            }
    
            if (faccion != ped.faccion_id) {
                if (mp.game.player.isFreeAimingAtEntity(ped.ped.handle)) {
                    if (calcDist(player_local.position, ped.ped.getCoords(false)) <= 20.0) {
                        if (ped.tiroteoActivo == null) {
                            mp.events.callRemote("ped:empezar_tiroteo", pedId);
                        }
                        continue;
                    }
                } else {
                    if (!mp.game.controls.isControlPressed(0, 25)) continue;
    
                    let bEsArmaBlanca = false;
                    for (let i = 0; i < armasBlancas.length; i++) {
                        if (player_local.weapon == armasBlancas[i]) {
                            bEsArmaBlanca = true;
                            break;
                        }
                    }
        
                    if (bEsArmaBlanca) {
                        if (calcDist(player_local.position, ped.ped.getCoords(false)) <= 3.0) {
                            if (ped.tiroteoActivo == null)
                                mp.events.callRemote("ped:empezar_tiroteo", pedId);
                            continue;
                        }                        
                    }
                }
            }
        }
    }
}, 200);

mp.events.add("ped:tiroteo_empezado", (pedId, nivel, jugadorEnemigo) => {
    if(pedId == null || jugadorEnemigo == null) return;
    if(peds_facciones.hasOwnProperty(pedId)){
        peds_facciones[pedId].tiroteoActivo = jugadorEnemigo;
        peds_facciones[pedId].tiroteoUnix = Date.now();
        let ped = peds_facciones[pedId].ped;
        let vida = 500;
        let arma = 0;
        let rango = 0;

        switch (peds_facciones[pedId].armas) {
            case 0:
                // weapon_knife
                arma = 2578778090;
                break;
            case 1:
                // weapon_pistol
                arma = 453432689;
                break;
            case 2:
                // weapon_microsmg
                arma = 324215364;
                break;
            case 3:
                // weapon_assaultrifle
                arma = 3220176749;
                break;
            default:
                // weapon_knife
                arma = 2578778090;
                break;

        }

        switch (nivel) {
            case 1:
                vida = 750;
                rango = 1;
                break;
            case 2:
                vida = 1000;
                rango = 2;
                break;
        }

        ped.setDynamic(true);
        ped.freezePosition(false);
        ped.setCanBeDamaged(true);
        ped.setInvincible(false);
        ped.setOnlyDamagedByPlayer(true);
        ped.setCanRagdollFromPlayerImpact(true);
        ped.setSweat(100);
        ped.setRagdollOnCollision(true);
        ped.giveWeapon(arma, 100, true);
        ped.setProofs(false, false, false, false, false, false, false, false);
        ped.setCombatAbility(nivel >= 2 ? 2 : 1);
        ped.setCombatRange(rango);
        ped.setHealth(vida);
        ped.setCombatMovement(3);
        ped.setCombatAttributes(0, true);
        ped.setCombatAttributes(46, true);
        ped.setCombatAttributes(5, true);
        ped.setCombatFloat(5, 0.8);
        ped.taskCombat(jugadorEnemigo.handle, 0, 16);

    }
});
}