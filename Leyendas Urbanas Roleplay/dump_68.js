{
/* --------------------------------------------------------------------------------
 * hambre.js
 *
 * Autor: Morell
 *
 * Descripción: HUD para el hambre y la sed
 *
 * -------------------------------------------------------------------------------- */
var hudHambre = false;
var navegadorHambre = null;
var hambreValor = 0;
var sedValor = 0;
// Tiempo anterior
var tiempoAnteriorHambre = 0;
var tiempoAnteriorSed = 0;
var TIPO_HAMBRE = 1;
var TIPO_SED = 2;
// Registramos los eventos del cliente
mp.events.add({
    'establecer_hambre': function (valor) {
        establecer_valores(TIPO_HAMBRE, (hambreValor - valor) * -1, true);
    },
    'establecer_sed': function (valor) {
        establecer_valores(TIPO_SED, (sedValor - valor) * -1, true);
    },
    'comiendo': function (valor) {
        mp.events.callRemote("comiendo", valor);
        establecer_valores(TIPO_HAMBRE, (hambreValor - (hambreValor + valor)) * -1, false);
    },
    'bebiendo': function (valor) {
        mp.events.callRemote("bebiendo", valor);
        establecer_valores(TIPO_SED, (sedValor - (sedValor + valor)) * -1, false);
    }
});
function establecer_valores(tipo, cantidad, rapido) {
    if (rapido === void 0) { rapido = false; }
    switch (tipo) {
        case TIPO_HAMBRE:
            if (tiempoAnteriorHambre == 0) {
                rapido = true;
                tiempoAnteriorHambre = 1;
            }
            hambreValor = (hambreValor <= 0 && cantidad < 0) ? 0 : (hambreValor >= 100 && cantidad > 0) ? 100 : hambreValor + cantidad;

            mp.events.call("hud:modificar_parametro", "hambre", hambreValor);
            break;
        case TIPO_SED:
            if (tiempoAnteriorSed == 0) {
                rapido = true;
                tiempoAnteriorSed = 1;
            }
            sedValor = (sedValor <= 0 && cantidad < 0) ? 0 : (sedValor >= 100 && cantidad > 0) ? 100 : sedValor + cantidad;

            mp.events.call("hud:modificar_parametro", "sed", sedValor);
            break;
    }
}
setInterval(function () {
    if (logueado) {
        var tiempoMilisegundos = new Date().getTime();
        var timeRagdoll = (Math.floor(Math.random() * 3) + 1) * 1000;
        // Entramos cada 60 segundos
        if (tiempoMilisegundos - tiempoAnteriorHambre > 180000 && !arrastrado && !arrastrando && !enmaletero) {
            establecer_valores(TIPO_HAMBRE, -1);
            establecer_valores(TIPO_SED, -1);
            tiempoAnteriorHambre = tiempoMilisegundos;

            // Si el hambre es 0 y la sed es 0
            if (hambreValor == 0 && sedValor == 0) {
                if (player_local.vehicle) {
                    mostrarAviso("info", 6000, "Tienes mucha hambre y sed, bebe y come cuanto antes");
                }
                else if (!player_local.vehicle) {
                    player_local.setToRagdoll(timeRagdoll, timeRagdoll * 2, 0, false, false, false);
                    mostrarAviso("info", 6000, "Tienes mucha hambre y sed, bebe y come cuanto antes");
                }
                return;
            }

            // Si el hambre es menor a 15 y la sed también es menor a 15
            if (hambreValor < 15 && sedValor < 15) {
                if (player_local.vehicle) {
                    mostrarAviso("info", 8000, "Notas tu boca seca y te rugen las tripas, deberias beber y comer");
                }
                else if (!player_local.vehicle) {
                    player_local.setToRagdoll(1000, 1000, 4, false, false, false);
                    mostrarAviso("info", 8000, "Notas tu boca seca y te rugen las tripas, deberias beber y comer");
                }
                return;
            }

            // Si hemos llegado hasta aqui, es por que unicamente el hambre o la sed, uno de los dos es menor a 15, asi que vamos a ver cual es y aplicarle lo que le corresponde
            if (hambreValor < 15)
            {
                if (player_local.vehicle) {
                    mostrarAviso("info", 4000, "Te rugen las tripas, necesitas comer");
                }
                else if (!player_local.vehicle) {
                    player_local.setToRagdoll(1000, 1000, 4, false, false, false);
                    mostrarAviso("info", 4000, "Te rugen las tripas, necesitas comer");
                }
                return;
            }
            if (sedValor < 15) {
                if (player_local.vehicle) {
                    mostrarAviso("info", 4000, "Notas tu boca seca, necesitas beber");
                }
                else if (!player_local.vehicle) {
                    player_local.setToRagdoll(1000, 1000, 4, false, false, false);
                    mostrarAviso("info", 4000, "Notas tu boca seca, necesitas beber");
                }
                return;
            }
        }
    }
}, 60000);
//# sourceMappingURL=hambre.js.map



}