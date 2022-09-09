{
/**
 * pesca.js
 * 
 * Descripción: Contiene el sistema de la pesca
 * 
 * Autor: Dries
 */

var intervalo_pesca_iniciado = false;
var temporizador_teclau_iniciado = false;

var temporizador_teclau = null;
var temporizador_escapa = null;

var intervalo_pesca = null;
var cebo = null;
var prob = null;

var pesca_iniciada = false;

var mostrar_cef_pesca = false;
var parametro_pesca = 0;

var posicionPesca = null;

mp.events.add({
    "pesca:iniciar_pesca": (cantidad_cebo, probabilidad) => {
        cebo = cantidad_cebo;
        prob = probabilidad;
        intentos_fallidos = 0; // cef/pesca.js
        pesca_iniciada = true;
        mp.gui.chat.show(false);
        posicionPesca = player_local.position;
        mp.events.call("ShowMidsizedMessage", "Comienzas a pescar", "Dispones de " + cebo + " cebos. Atento a las notificaciones del minimapa. Utiliza /fpesca para finalizar en cualquier momento.", 2500);
        crearTimeout(() => {
            mp.gui.chat.show(true);
        }, 3800);

        let i_pesca = setInterval(() => {
            if (posicionPesca) {
                if (calcDist(player_local.position, posicionPesca) > 1.0) {
                    mostrarAviso("danger", 7000, "Has dejado de pescar porque te has alejado");
                    mp.events.call("pesca:detener_pesca");
                    mp.events.callRemote("pesca:finalizar");
                    clearInterval(i_pesca);
                    i_pesca = null;
                }
            } else {
                mostrarAviso("danger", 7000, "Has dejado de pescar porque te has alejado");
                mp.events.call("pesca:detener_pesca");
                mp.events.callRemote("pesca:finalizar");
                clearInterval(i_pesca);
                i_pesca = null;
            }
        }, 2000);

        iniciar_intervalo_pesca();
    },
    "pesca:detener_pesca": () => {
        detener_intervalo_pesca();
        intentos_fallidos = 0; // cef/pesca.js
        mostrar_cef_pesca = false;
        pesca_iniciada = false;
        posicionPesca = null;
    },
    "pesca:mostrar_cef_pesca": (parametro = 0) => {
        mostrar_cef_pesca = true;
        parametro_pesca = parametro;
        iniciar_temporizador_teclau();

        temporizador_escapa = crearTimeout(() => {
            mp.gui.chat.push("!{red} Has esperado demasiado y el pez se ha escapado.");
            mp.events.call("pesca:pesca_fallida");
        }, 15000);
    }
});

function iniciar_temporizador_teclau() {
    if (!temporizador_teclau_iniciado) {
        temporizador_teclau_iniciado = true;
        temporizador_teclau = crearTimeout(() => {
            mostrar_cef_pesca = false;
            temporizador_teclau_iniciado = false;
        }, 15000);
    }
}

function detener_intervalo_pesca() {
    if (intervalo_pesca_iniciado && intervalo_pesca != null) {
        cebo = null;
        prob = null;
        clearInterval(intervalo_pesca);
        clearTimeout(temporizador_teclau);
        intervalo_pesca_iniciado = false;
    }
}

function iniciar_intervalo_pesca() {
    if (!intervalo_pesca_iniciado && cebo != null && prob != null) {
        let tiempo_intervalo_pesca = 60000/prob;
        intervalo_pesca_iniciado = true;
        intervalo_pesca = setInterval(comprobar_pesca, tiempo_intervalo_pesca);
    }
}

function comprobar_pesca() {
    if (!mostrar_cef_pesca && !pesca) {
        let valor = Math.floor(Math.random() * 100);
        mp.events.callRemote("pesca:comprobar_valor", valor);
    }   
}

mp.events.add("playerCommand", (command) => {
	const args = command.split(/[ ]+/);
	const commandName = args[0];

	args.shift();
		
	if (commandName === "fpesca") {
		mp.events.call("pesca:detener_pesca");
	}
});
}