{
/* --------------------------------------------------------------------------------
 * tiempo.js
 *
 * Autor: Morell
 *
 * Descripción: Sistema de ciclo de tiempo
 *
 * -------------------------------------------------------------------------------- */

var date_gta;
var horajson;

function syncTime() {
    if (pararCiclo) {
        return;
    }

    if (juego != null) {
        return;
    }

    if(purga)
    {
        mp.game.time.setClockTime(0, 0, 0);
        mp.game.time.setClockDate(02, 04, 2021);
    }
    else
    {
        //var fecha = new Date().toLocaleString("es-ES", { timeZone: "UTC" }).split(" ");
        //var time = fecha[1].split(':');

        var ahora = new Date();

        /*var hora = parseInt(time[0])+2;
        var minuto = parseInt(time[1]);
        var segundo = parseInt(time[2]);*/

        var hora = ahora.getUTCHours();
        var minuto = ahora.getUTCMinutes();
        var segundo = ahora.getUTCSeconds();

        // Hacemos esto para que cuando llegue a las 00:00 de la hora real, no se ponga la hora del juego a las 0,
        // esto dura hasta las 9 que es cuando se hace el reinicio
        if (hora >= 0 && hora < 9) {
            hora += 24;
        }

        var segundos_total = hora * 3600;
        segundos_total += minuto * 60;
        segundos_total += segundo;

        // 480 segundos quiere decir que cada 8 minutos es una hora del GTA
        var segundos_gta = segundos_total * 3600 / 480;

        date_gta = new Date(segundos_gta * 1000);
        
        //let fecha_hora = obtener_fecha_hora(date_gta);

        var fecha_gta = date_gta.toISOString().split("T");

        var fecha_gta_fecha = fecha_gta[0].split('-');
        var year_gta = parseInt(fecha_gta_fecha[0]);
        var mes_gta = parseInt(fecha_gta_fecha[1]);
        var dia_gta = parseInt(fecha_gta_fecha[2]);

        var fecha_gta_hora = fecha_gta[1].split(':');
        var hora_gta = parseInt(fecha_gta_hora[0]);
        var minuto_gta = parseInt(fecha_gta_hora[1]);
        var segundo_gta = parseInt(fecha_gta_hora[2]);

        mp.game.time.setClockTime(hora_gta, minuto_gta, segundo_gta);
        mp.game.time.setClockDate(year_gta, mes_gta, dia_gta);
    }
    /*mp.game.time.setClockTime(12, 12, 12);
    mp.game.time.setClockDate(31, 10, 2019);

    mp.game.gameplay.setWeatherTypePersist("EXTRASUNNY");*/
};

setInterval(syncTime, 100);

mp.events.add("playerCommand", (command) => {
    const args = command.split(/[ ]+/);
    const commandName = args[0];

    args.shift();

    if (commandName === "reloj") {
        var hora_reloj = date_gta;
        if (hora_reloj) {
            hora_reloj.setHours(parseInt(date_gta.getHours()) - 1);
            mostrarAviso("info", 5000, "> Son las " + hora_reloj.getHours() + ":" + (hora_reloj.getMinutes() < 10 ? '0' : '') + hora_reloj.getMinutes());
        }
        //mp.gui.chat.push("> Son las " + hora_reloj.getHours() + ":" + (hora_reloj.getMinutes() < 10 ? '0' : '') + hora_reloj.getMinutes() + ".");
    }
});

mp.events.add({
    "tiempo:pararCiclo": () => {
        pararCiclo = !pararCiclo;
    },
    "tiempo:establecer": (h, m, s) => {
        pararCiclo = !pararCiclo;
        mp.game.time.setClockTime(h, m, s);
        mp.game.time.setClockDate(31, 10, 2019);
    }
});
}