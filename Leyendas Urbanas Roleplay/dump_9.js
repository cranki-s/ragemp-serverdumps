{
/* --------------------------------------------------------------------------------
 * red.js
 *
 * Autor: Doomer
 *
 * Descripción: Sistema de control de la red en el servidor (cliente)
 *
 * -------------------------------------------------------------------------------- */
// Límite de ping
var LIMITE_PING = 600;
// Número máximo de advertencias antes de la expulsión del jugador
var MAX_ADVERTENCIAS = 3;

// Número de advertencias dadas por ping alto
var advertencias = 0;

// Disparado cada tic
setInterval(() => {
    if (logueado) {
        if (miembroStaff == false) {
            // Comprobamos la latencia del jugador cada 30 segundos, y si es mayor a la permitida, le damos advertencias o expulsamos
            var ping = player_local.ping;
            if (ping >= LIMITE_PING) {
                advertencias++;
                if (advertencias >= MAX_ADVERTENCIAS) {
                    mp.events.callRemote('expulsar', "Ping demasiado alto.");
                    return;
                }
                //mp.gui.chat.colors = true;
                //mp.gui.chat.push("~r~[!] ~w~Tu ping (" + ping + " ms) es demasiado alto y ha superado el límite de " + LIMITE_PING + " ms. Mejora tu conexión o terminarás siendo expulsado.");
                mostrarAviso("info", 5000, "<span style='color:red;'>[!]</span> Tu ping (" + ping + " ms) es demasiado alto y ha superado el límite de " + LIMITE_PING + " ms. Mejora tu conexión o terminarás siendo expulsado");
            }
            else {
                if (advertencias > 0) {
                    advertencias--;
                }
            }
        }
    }
}, 30000);
//# sourceMappingURL=red.js.map
}