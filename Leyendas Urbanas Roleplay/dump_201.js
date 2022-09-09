{
/**
 * choques.js
 * 
 * Descripción: Reescritura total del sistema de choques de los vehículos.
 * 
 * Celeritas
 */

// Antiguamente habían tres estados: "Pantalla a negro", "Pantalla borrosa", "Pantalla roja", esta vez vamos a reworkearlo a "Pantalla negra" y "Contusión".

// Variables globales que afectan a todo el sistema

var pantallaNegraChoque = true; // Activa o desactiva la pantalla negra al impactar.
var pantallaNegraVelocidad = true; // Activa o desactiva la pantalla negra por un cambio brusco en la velocidad del vehículo.
var recibirDanoVehiculo = false; // Activa o desactiva recibir un daño.

// Variables que podemos tocar para equilibrar el sistema

let danoImpacto = 20; // Cuánto daño hace falta para detectar un impacto.
let cambioVelocidad = 60; // Cuánta velocidad debe cambiar de manera brusca para detectar un impacto. 

let probabilidadPincharRuedas = 0; // Qué probabilidad hay de pinchar las ruedas tras un impacto.
let tiempoPantallaNegra = 250; // Cuanto tiempo dura la pantalla negra.

// Variables del propio sistema - NO TOCAR

let debug = true; // Si el modo Debug está activado, mostrará los mensajes de depuración. Requiere servicio administrativo.
let vidaActual = 1000; // Vida actual del vehículo.
let velocidadActual = 0; // Velocidad actual del vehículo
let pantallaNegra = false; // Detecta si tenemos la pantalla negra activada.
let contusionPJ = false; // Detecta si hay una contusión.
let activarPantallaNegraPersonaje = false;
let activarContusionPersonaje = false;

let danoAnterior = 0; // Guarda el daño anterior para detectar cambios bruscos.
let velocidadAnterior = 0; // Guarda la velocidad anterior para detectar cambios bruscos.

let numAsiento; // Asiento asignado al jugador al entrar al vehículo.
let idVehiculo;
let iterado = false; // Prevenimos EL PRIMER render.
let rngNumero;
let numRueda;

// Funciones del sistema

async function activarPantallaNegra(duracion) {
    if (pantallaNegra) return;
    if(debug && adminservicio) {
        mp.gui.chat.push('Creada pantalla negra.');
    }
    pantallaNegra = true;
    activarPantallaNegraPersonaje = true;
    await oscurecerPantalla(duracion);
    await wait(tiempoPantallaNegra);
    await mostrarPantalla(duracion);
    pantallaNegra = false;
    activarPantallaNegraPersonaje = false;
}

async function contusion() {
    if (contusionPJ) return;
    if(debug && adminservicio) {
        mp.gui.chat.push('Creada contusión.');
    }
    contusionPJ = true;
    activarContusionPersonaje = true;
    mp.game.audio.playSoundFrontend(-1, "SCREEN_FLASH", "CELEBRATION_SOUNDSET", true);
    await wait(1000);
    contusionPJ = false;
    activarContusionPersonaje = false;
}

function aplicarDano(cantidad) {
    let dano = Math.round(cantidad);
    
    if (recibirDanoVehiculo) {
        if (debug && adminservicio) {
            mp.gui.chat.push("Daño recibido: " + dano);
        }
        mp.events.callRemote("heridas_setHP", dano);
    } else if (debug && adminservicio) {
        mp.gui.chat.push("No se ha recibido daño debido a que el sistema está desactivado.");
    }
}

function estaConductorVehiculo() {
    let vehiculo = player_local.vehicle;

    if (player_local.isInAnyVehicle && mp.vehicles.exists(vehiculo)) {
        if(debug && adminservicio) {
            mp.gui.chat.push("Estamos en un vehículo.");
        }
        if (vehiculo.getPedInSeat(-1) == player_local.handle) {
            let claseVeh = vehiculo.getClass();
            if(debug && adminservicio) {
                mp.gui.chat.push('El jugador es un conductor.');
            }
            if (claseVeh != 13 && claseVeh != 15 && claseVeh != 16 && claseVeh != 21) { // Ni aviones, ni helicópteros, ni barcos, ni trenes.
                if(debug && adminservicio) {
                    mp.gui.chat.push('El jugador es un conductor en un vehículo válido.');
                }
                return true;
            }
        }
    }

    return false;
}

function estaPasajeroVehiculo() {
    let vehiculo = player_local.vehicle;

    if (player_local.isInAnyVehicle && mp.vehicles.exists(vehiculo)) {
        if(debug && adminservicio) {
            mp.gui.chat.push('El jugador está en un vehículo y el vehículo existe.');
        }
        if (numAsiento != -1) {
            if(debug && adminservicio) {
                mp.gui.chat.push('El jugador es un pasajero.');
            }
            return true;
        }
    }

    return false;
}

function chocarVehiculo() {
    let vehiculo = player_local.vehicle;

    if (!mp.vehicles.exists(vehiculo)) return;

    if(!iterado) {
        iterado = true;
        return;
    }

    if (player_local.vehicle == null) {
        mp.events.remove('render', chocarVehiculo);
        return;
    }

    if (pantallaNegraChoque && iterado) {
        vidaActual = vehiculo.getBodyHealth();
        
        if (vidaActual != danoAnterior && idVehiculo == vehiculo.id) {
            if (debug && adminservicio) {
                mp.gui.chat.push('Variables antes del impacto pantallaNegra: ' + pantallaNegra + ' vidaActual: ' + vidaActual + ' danoAnterior: ' + danoAnterior + ' danoImpacto: ' + danoImpacto);
            }
            if (!pantallaNegra && (vidaActual < danoAnterior) && ((danoAnterior - vidaActual) >= danoImpacto)) {
                if (debug && adminservicio) {
                    mp.gui.chat.push('Variables tras impacto pantallaNegra: ' + pantallaNegra + ' vidaActual: ' + vidaActual + ' danoAnterior: ' + danoAnterior + ' calculo: ' + (danoAnterior - vidaActual) + ' danoImpacto: ' + danoImpacto);
                }
                if (!mp.game.invoke('0x131D401334815E94', vehiculo.handle, 0, 2)) { // hasEntityBeenDamagedByWeapon
                    if (estaConductorVehiculo()) {
                        activarPantallaNegra(tiempoPantallaNegra + (danoAnterior - vidaActual) * 15);
                        contusion();
                        aplicarDano(3);
                        loteriaDesinflarRueda();
                    }

                    if (estaPasajeroVehiculo()) {
                        if (!activarPantallaNegraPersonaje && !activarContusionPersonaje) {
                            if (!pantallaNegra) {
                                activarPantallaNegra(tiempoPantallaNegra + (danoAnterior - vidaActual) * 15);
                                contusion();
                                aplicarDano(3);
                            }
                        }
                    }
                } else { return; }
            }
        }

        danoAnterior = vidaActual;
    }

    if (pantallaNegraVelocidad && iterado) {
        velocidadActual = vehiculo.getSpeed() * 2.23; 

        if (velocidadActual == velocidadAnterior) return;
        
        if (idVehiculo != vehiculo.id) return;
        
        if (!pantallaNegra && (velocidadActual < velocidadAnterior) && ((velocidadAnterior - velocidadActual) >= cambioVelocidad)) {
            if (debug && adminservicio) {
                mp.gui.chat.push('Variables tras del impacto pantallaNegra: ' + pantallaNegra + ' velocidadActual: ' + velocidadActual + ' velocidadAnterior: ' + velocidadAnterior + ' cambioVelocidad: ' + cambioVelocidad);
            }
            if (estaConductorVehiculo) {
                activarPantallaNegra(tiempoPantallaNegra + (velocidadAnterior - velocidadActual) * 15);
                contusion();
                loteriaDesinflarRueda();
            }

            if (estaPasajeroVehiculo && !activarPantallaNegraPersonaje && !pantallaNegra) {
                activarPantallaNegra(tiempoPantallaNegra + (velocidadAnterior - velocidadActual) * 15);
                contusion();
            }

        }
        velocidadAnterior = velocidadActual;
    }
    if (idVehiculo == -1) {
        idVehiculo = vehiculo.id;
    }
}

function loteriaDesinflarRueda() {
    generarNumeroAleatorio(10);
    if (rngNumero >= 9) {
        let vehiculo = player_local.vehicle;
        generarRueda(0, 5);
        if (debug && adminservicio) {
            mp.gui.chat.push('Le toca desinflar la rueda número ' + numRueda);
        }
        vehiculo.setTyreBurst(numRueda, false, 1000);
    }
}

function generarRueda(min, max) {
    numRueda = Math.floor(Math.random() * (max - min + 1)) + min;
    return (numRueda === 2 || numRueda === 3) ? generarRueda(min, max) : numRueda; // Estas no son válidas en coches, pero si en otros vehículos. Vamos a hacerlo universal y ya.
}

function generarNumeroAleatorio(maximo) {
    rngNumero = Math.floor(Math.random() * maximo);
    if (debug && adminservicio) {
        mp.gui.chat.push('Numero generado: ' + rngNumero);
    }
    return rngNumero;
}
// Funciones nativas de RAGE

mp.events.add("playerEnterVehicle", (vehicle, seat) => {
    numAsiento = seat;
    let claseVeh = vehicle.getClass();
    danoAnterior = vehicle.getBodyHealth();
    vidaActual = vehicle.getBodyHealth();
    velocidadAnterior = 0;
    velocidadActual = 0;
    iterado = false;

    if (idVehiculo == vehicle.id) {
        if (debug && adminservicio) {
            mp.gui.chat.push('idVehiculo: ' + idVehiculo + ' vehicle.id: ' + vehicle.id + ' | CAMBIADO A -1');
        }
        idVehiculo = -1;
    } else {
        if (debug && adminservicio) {
            mp.gui.chat.push('idVehiculo: ' + idVehiculo + ' vehicle.id: ' + vehicle.id);
        }
        idVehiculo = vehicle.id;
    }

    if (debug && adminservicio) {
        mp.gui.chat.push('Entrada en vehículo. danoAnterior: ' + danoAnterior + ' iterado: ' + iterado);
    }
    if (claseVeh != 13 && claseVeh != 8 && claseVeh != 22) {
       mp.events.add('render', chocarVehiculo);
    }
});

mp.events.add("playerExitVehicle", (vehicle, seat) => {
    if (debug && adminservicio) {
        mp.gui.chat.push('Eliminada tarea render de chocar vehículo');
    }
    mp.events.remove('render', chocarVehiculo);
    iterado = false;
    pantallaNegraChoque = true;  // Lo volvemos a activar para evitar errores.
    pantallaNegraVelocidad = true; // Lo volvemos a activar para evitar errores.

});

mp.events.add("vehiculos:choques:estado", (estado) => {
    if (debug && adminservicio) {
        mp.gui.chat.push('Modificado el estado de choques a ' + estado);
    }
    pantallaNegraChoque = estado;
    pantallaNegraVelocidad = estado;
});



// Otras cosas del sistema

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function oscurecerPantalla(duration) {
    return new Promise((resolve) => {
        let duracion = Math.round(duration);
        mp.game.cam.doScreenFadeOut(duracion);

        if (debug && adminservicio) {
            mp.gui.chat.push('Iniciando pantalla negra... PantallaNegraPersonaje ' + activarPantallaNegraPersonaje + ' pantallaNegra ' + pantallaNegra);
        }
        if (!hudOculto) {
            if(tipoMapa != 2) mp.game.ui.displayRadar(false);
            mp.game.ui.displayHud(false);
            mp.gui.chat.show(false);

            mp.events.call("hud:estado_hud");
        }

        const timer = setInterval(() => {
            if (mp.game.invoke('0xB16FCE9DDC7BA182')) {
                if (debug && adminservicio) {
                    mp.gui.chat.push('La pantalla sigue oscureciendo... PantallaNegraPersonaje ' + activarPantallaNegraPersonaje + ' pantallaNegra ' + pantallaNegra);
                }

                clearInterval(timer);
                resolve();
            }
        }, 50);
    });
}

function mostrarPantalla(duration) {
    return new Promise((resolve) => {
        let duracion = Math.round(duration);
        mp.game.cam.doScreenFadeIn(duracion);

        if (debug && adminservicio) {
            mp.gui.chat.push('Iniciando mostrar pantalla... PantallaNegraPersonaje ' + activarPantallaNegraPersonaje + ' pantallaNegra ' + pantallaNegra);
        }
        if (hudOculto) {
            if(tipoMapa != 2) mp.game.ui.displayRadar(true);
            mp.game.ui.displayHud(true);
            mp.gui.chat.show(true);

            mp.events.call("hud:estado_hud");
        }
        const timer = setInterval(() => {
            if (mp.game.invoke('0x5A859503B0C08678')) {
                if (debug && adminservicio) {
                    mp.gui.chat.push('La pantalla sigue intentando mostrarse... PantallaNegraPersonaje ' + activarPantallaNegraPersonaje + ' pantallaNegra ' + pantallaNegra);
                }

                clearInterval(timer);
                resolve();
            }
        }, 50);
    });
}


}