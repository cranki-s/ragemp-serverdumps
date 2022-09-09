{
﻿/* --------------------------------------------------------------------------------
 * purga.js
 *
 * Descripción: Controlador de misiones purga
 * -------------------------------------------------------------------------------- */

var puntosPurga = 0;
var nivelPurga = 1;
mp.events.add("actualizar:info:purga", function (puntos, nivel, equipo, activar = false) {
    if (activar || nivel > nivelPurga) // Si acaba de conectarse o sube de nivel le creamos la misión de su nivel
        mp.events.call("misionPurga", nivel);

    puntosPurga = puntos;
    nivelPurga = nivel;
    let _equipoPurga = equipo.length > 0 ? JSON.parse(equipo) : equipo;
    equipoPurga = {
        id: _equipoPurga[0],
        name: _equipoPurga[1],
        
    };

    //mp.events.call("hud:aviso", JSON.stringify([5, -1, `Puntos purga: ${puntosPurga} <br> Nivel purga: ${nivelPurga}`]));
    mp.events.call("hud:modificar_parametro", "ppurga", puntosPurga);
    mp.events.call("hud:modificar_parametro", "pnivel", nivelPurga);
});

var intervaloMision1 = null;
var intervaloMision2 = null;
var intervaloMision3 = null;
var intervaloMision4 = null;
var intervaloMision5 = null;
var checkpointMision1 = null;
var checkpointMision2 = null;
var checkpointMision3 = null;
var checkpointMision4 = null;
var checkpointMision5 = null;
mp.events.add("misionPurga", (id) => {
    if (!logueado) return;
    if (!purga) return;
    switch (id) { //relacionamos todas las misiones con el switch
        case 2:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Acabas de recibir una misión, ve a las coordenadas marcadas en el mapa, tienes 10 minutos");
            checkpointMision1 = mp.blips.new(9, new mp.Vector3(2466.9216, 3786.4912, 41.85097), { name: "Misión 1", scale: 2.0, color: 1, alpha: 100, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, }); //blip para identificar el checkpoint en el minimapa (no es la zona exacta, es aproximada para que busquen)

            let avisar = true;
            if (intervaloMision1 != null) {
                clearInterval(intervaloMision1);
                intervaloMision1 = null;
            }
            intervaloMision1 = setInterval(() => {
                let dist = calcDist(new mp.Vector3(2466.9216, 3786.49, 41.85097), new mp.Vector3(player_local.x, player_local.y, player_local.z));
                if (dist < 75.0) { // Distancia entre el vector de la misión y el jugador
                    if (avisar) {
                        mp.events.call("ShowMidsizedMessage", "~r~Cada vez estás más cerca~r~", "~g~Te daré una pista, pinturas aliens y por alguna mesa el regalo para esta noche.~g~", 5000);
                        avisar = false;
                    }
                } else {
                    avisar = true;
                }
            }, 1500);
            break;
        case 4:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Acabas de recibir una misión, ve a las coordenadas marcadas en el mapa, tienes 10 minutos");
            checkpointMision2 = mp.blips.new(9, new mp.Vector3(1751.8602, 3263.7698, 41.301228), { name: "Misión 2", scale: 2.0, color: 1, alpha: 100, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, }); //blip para identificar el checkpoint en el minimapa (no es la zona exacta, es aproximada para que busquen)

            let avisar1 = true;
            if (intervaloMision2 != null) {
                clearInterval(intervaloMision2);
                intervaloMision2 = null;
            }
            intervaloMision2 = setInterval(() => {
                let dist = calcDist(new mp.Vector3(1711.8644, 3282.9048, 41.608818), new mp.Vector3(player_local.x, player_local.y, player_local.z));
                if (dist < 75.0) { // Distancia entre el vector de la misión y el jugador
                    if (avisar1) {
                        mp.events.call("ShowMidsizedMessage", "~r~Cada vez estás más cerca~r~", "~g~Recuerda que el transporte público siempre es bueno, suerte~g~", 5000);
                        avisar1 = false;
                    }
                } else {
                    avisar1 = true;
                }
            }, 1500);
            break;
        case 6:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Acabas de recibir una misión, ve a las coordenadas marcadas en el mapa, tienes 10 minutos");
            checkpointMision3 = mp.blips.new(9, new mp.Vector3(-418.6897, 1148.0934, 325.86102), { name: "Misión 3", scale: 2.0, color: 1, alpha: 100, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, }); //blip para identificar el checkpoint en el minimapa (no es la zona exacta, es aproximada para que busquen)

            let avisar2 = true;
            if (intervaloMision3 != null) {
                clearInterval(intervaloMision3);
                intervaloMision3 = null;
            }
            intervaloMision3 = setInterval(() => {
                let dist = calcDist(new mp.Vector3(-442.87747, 1060.3837, 327.68198), new mp.Vector3(player_local.x, player_local.y, player_local.z));
                if (dist < 75.0) { // Distancia entre el vector de la misión y el jugador
                    if (avisar2) {
                        mp.events.call("ShowMidsizedMessage", "~r~Cada vez estás más cerca~r~", "~g~Que buenas vistas hay de la ciudad... Suerte~g~", 5000);
                        avisar2 = false;
                    }
                } else {
                    avisar2 = true;
                }
            }, 1500);
            break;
        case 8:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Acabas de recibir una misión, ve a las coordenadas marcadas en el mapa, tienes 10 minutos");
            checkpointMision4 = mp.blips.new(9, new mp.Vector3(-411.41132, -1712.4808, 19.309462), { name: "Misión 4", scale: 2.0, color: 1, alpha: 100, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, }); //blip para identificar el checkpoint en el minimapa (no es la zona exacta, es aproximada para que busquen)

            let avisar3 = true;
            if (intervaloMision4 != null) {
                clearInterval(intervaloMision4);
                intervaloMision4 = null;
            }
            intervaloMision4 = setInterval(() => {
                let dist = calcDist(new mp.Vector3(-444.53162, -1711.7664, 18.74471), new mp.Vector3(player_local.x, player_local.y, player_local.z));
                if (dist < 75.0) { // Distancia entre el vector de la misión y el jugador
                    if (avisar3) {
                        mp.events.call("ShowMidsizedMessage", "~r~Cada vez estás más cerca~r~", "~g~¿Cuantas toneladas pesará? Suerte~g~", 5000);
                        avisar3 = false;
                    }
                } else {
                    avisar3 = true;
                }
            }, 1500);
            break;
        case 10:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Acabas de recibir una misión, ve a las coordenadas marcadas en el mapa, tienes 10 minutos");
            checkpointMision5 = mp.blips.new(9, new mp.Vector3(-129.21638, -1005.7752, 27.209446), { name: "Misión 5", scale: 2.0, color: 1, alpha: 100, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, }); //blip para identificar el checkpoint en el minimapa (no es la zona exacta, es aproximada para que busquen)

            let avisar4 = true;
            if (intervaloMision5 != null) {
                clearInterval(intervaloMision5);
                intervaloMision5 = null;
            }
            intervaloMision5 = setInterval(() => {
                let dist = calcDist(new mp.Vector3(-120.13184, -977.73553, 304.24954), new mp.Vector3(player_local.x, player_local.y, player_local.z));
                if (dist < 75.0) { // Distancia entre el vector de la misión y el jugador
                    if (avisar4) {
                        mp.events.call("ShowMidsizedMessage", "~r~Cada vez estás más cerca~r~", "~g~Quien la sigue la consigue... No te canses de subir~g~", 5000);
                        avisar4 = false;
                    }
                } else {
                    avisar4 = true;
                }
            }, 1500);
            break;
        default:
            break;
    }
});

mp.events.add("mensaje:RachaBajas", (rachadebajas) => {
    if (rachadebajas == 5) {
        mp.events.call("ShowMidsizedMessage", "~r~MENUDA BESTIA", "Llevas una racha de ~r~" + rachadebajas + "~w~ bajas", 7000);
        mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
    };

    if (rachadebajas == 10) {
        mp.events.call("ShowMidsizedMessage", "~b~IMPARABLE", "Llevas una racha de ~b~" + rachadebajas + "~w~ bajas", 7000);
        mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
    };

    if (rachadebajas == 15) {
        mp.events.call("ShowMidsizedMessage", "~g~LOCURA", "Llevas una racha de ~g~" + rachadebajas + "~w~ bajas", 7000);
        mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
    };

    if (rachadebajas == 20) {
        mp.events.call("ShowMidsizedMessage", "~p~MAESTRO", "Llevas una racha de ~p~" + rachadebajas + "~w~ bajas", 7000);
        mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
    };

    if (rachadebajas == 25) {
        mp.events.call("ShowMidsizedMessage", "~b~ ASESINO EN SERIE", "Llevas una racha de ~b~" + rachadebajas + "~w~ bajas", 7000);
        mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
    };

    if (rachadebajas == 30) {
        mp.events.call("ShowMidsizedMessage", "~y~INHUMANO", "Llevas una racha de ~y~" + rachadebajas + "~w~ bajas", 7000);
        mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
    };

    if (rachadebajas == 40) {
        mp.events.call("ShowMidsizedMessage", "~q~PRO PLAYER", "Llevas una racha de ~q~" + rachadebajas + "~w~ bajas", 7000);
        mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
    };

    if (rachadebajas == 50) {
        mp.events.call("ShowMidsizedMessage", "~o~HACKER", "Llevas una racha de ~o~" + rachadebajas + "~w~ bajas", 7000);
        mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
    };

});

mp.events.add("mensaje:TiroLejano", (distanciaMuerteRedondeada) => {

    mp.events.call("ShowMidsizedMessage", "~r~TIRO LEJANO", "Has matado a una distancia de ~r~" + distanciaMuerteRedondeada + "~w~ metros", 6000);
    mp.game.audio.playSoundFrontend(-1, "Mission_Pass_Notify", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);

});

mp.events.add("acabar:misionPurga", (id) => {
    if (!logueado) return;
    if (!purga) return;
    switch (id) {  //relacionamos todas las misiones con el switch
        case 2:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Sigue así y recibirás más misiones, has conseguido 200 puntos de purga");
            if (intervaloMision1 != null) {
                clearInterval(intervaloMision1);
                intervaloMision1 = null;
            }
            if (checkpointMision1 != null && mp.blips.exists(checkpointMision1))
                checkpointMision1.destroy();
            break;
        case 4:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Sigue así y recibirás más misiones, has conseguido 400 puntos de purga");
            if (intervaloMision2 != null) {
                clearInterval(intervaloMision2);
                intervaloMision2 = null;
            }
            if (checkpointMision2 != null && mp.blips.exists(checkpointMision2))
                checkpointMision2.destroy();
            break;
        case 6:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Sigue así y recibirás más misiones, has conseguido 600 puntos de purga");
            if (intervaloMision3 != null) {
                clearInterval(intervaloMision3);
                intervaloMision3 = null;
            }
            if (checkpointMision3 != null && mp.blips.exists(checkpointMision3))
                checkpointMision3.destroy();
            break;
        case 8:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Sigue así y recibirás más misiones, has conseguido 800 puntos de purga");
            if (intervaloMision4 != null) {
                clearInterval(intervaloMision4);
                intervaloMision4 = null;
            }
            if (checkpointMision4 != null && mp.blips.exists(checkpointMision4))
                checkpointMision4.destroy();
            break;
        case 10:
            mostrarAvisoMinimapa("misión", "Misión purga", "Anónimo", "Has terminado la última misión, has conseguido 1000 puntos de purga");
            if (intervaloMision5 != null) {
                clearInterval(intervaloMision5);
                intervaloMision5 = null;
            }
            if (checkpointMision5 != null && mp.blips.exists(checkpointMision5))
                checkpointMision5.destroy();
            break;
        default:
            break;
    }
});

}ጉ㬌ǝ