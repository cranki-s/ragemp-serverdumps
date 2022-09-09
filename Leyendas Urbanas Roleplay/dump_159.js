{
﻿const pos_strawberry = new mp.Vector3(24.57766, -1391.815, 28.94249);
const pos_littleseoul = new mp.Vector3(-699.8408, -933.2875, 18.62677);

let intervalo_distancia = null;
let particulas_activas = [];

mp.events.add("autolavado_limitador", function (estado) {
    if (player_local.vehicle) {
        if (estado == true && limitador_autolavado == false) {
            limitador_autolavado = true;
            mp.events.call("hud:limitadorVelocidad:actualizar", 15);
            limitadorVelocidad = 15;
            limitadoresVelocidad[player_local.vehicle.id] = 15;
            mostrarAviso("success", 5000, "Se ha limitado la velocidad del vehículo a " + 15 + " km/h");
            return;
        }

        if (estado == false && limitador_autolavado == true) {
            limitador_autolavado = false;
            mp.events.call("hud:limitadorVelocidad:ocultar");
            limitadorVelocidad = 0;
            delete limitadoresVelocidad[player_local.vehicle.id];
            return;
        }
    }
    else {
        limitador_autolavado = false;
    }
});

mp.events.add("iniciar_efecto_agua", function (array) {
    let array_particulas = (typeof array === "string" ? JSON.parse(array) : array);

    if (array_particulas != undefined && array_particulas != null) {
        activarParticulas(array_particulas);
    }
});

mp.events.add("parar_efecto_agua", function (boolean) {
    desactivarParticulas(boolean);
});

async function activarParticulas(particulas) {
    if (intervalo_distancia != null) {
        clearInterval(intervalo_distancia);
        intervalo_distancia = null;
    }
    // Intervalo para borrar las particulas del autolavado si nos alejamos mas de 250.0m de ellos
    intervalo_distancia = setInterval(() => {
        if (particulas_activas != undefined && particulas_activas != null) {
            if (particulas_activas.length > 0) {
                let distancia_1 = calcDist(player_local.position, pos_strawberry);
                let distancia_2 = calcDist(player_local.position, pos_littleseoul);

                if (distancia_1 >= 250.0 && distancia_2 >= 250.0) {
                    for (let i = particulas_activas.length - 1; i >= 0; i--) {
                        mp.game.graphics.stopParticleFxLooped(particulas_activas[i].particula, false);
                        particulas_activas.splice(i, 1);
                    }

                    particulas_activas = [];

                    clearInterval(intervalo_distancia);
                    intervalo_distancia = null;
                }
                else {
                    if (distancia_1 >= 250.0) {
                        for (let i = particulas_activas.length - 1; i >= 0; i--) {
                            if (particulas_activas[i].id <= 12) {
                                mp.game.graphics.stopParticleFxLooped(particulas_activas[i].particula, false);
                                particulas_activas.splice(i, 1);
                            }
                        }
                    }

                    if (distancia_2 >= 250.0) {
                        for (let i = particulas_activas.length - 1; i >= 0; i--) {
                            if (particulas_activas[i].id >= 13) {
                                mp.game.graphics.stopParticleFxLooped(particulas_activas[i].particula, false);
                                particulas_activas.splice(i, 1);
                            }
                        }
                    }
                }
            }
            else {
                clearInterval(intervalo_distancia);
                intervalo_distancia = null;
            }
        }
        else {
            clearInterval(intervalo_distancia);
            intervalo_distancia = null;
        }
    }, 10000);

    // Carga y creacion de las particulas
    for (let i = 0, n = particulas.length; i < n; i++) {
        let fxName = particulas[i].fxName;
        let effectName = particulas[i].effectName;
        let position = particulas[i].position;
        let rotation = particulas[i].rotation;

        if (!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) {
            mp.game.streaming.requestNamedPtfxAsset(fxName);
            while (!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) {
                await mp.game.waitAsync(0);
            }
        }
        mp.game.graphics.setPtfxAssetNextCall(fxName);

        const fx = mp.game.graphics.startParticleFxLoopedAtCoord(effectName, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, 1.0, true, true, true, false);

        particulas_activas.push({ id: particulas[i].id, particula: fx });
    }
}

function desactivarParticulas(autolavado) {
    if (particulas_activas != undefined && particulas_activas != null) {
        if (particulas_activas.length > 0) {
            if (autolavado) {
                for (let i = particulas_activas.length - 1; i >= 0; i--) {
                    if (particulas_activas[i].id <= 12) {
                        mp.game.graphics.stopParticleFxLooped(particulas_activas[i].particula, false);
                        particulas_activas.splice(i, 1);
                    }
                }
            }
            else {
                for (let i = particulas_activas.length - 1; i >= 0; i--) {
                    if (particulas_activas[i].id >= 13) {
                        mp.game.graphics.stopParticleFxLooped(particulas_activas[i].particula, false);
                        particulas_activas.splice(i, 1);
                    }
                }
            }
        }
    }
}

}