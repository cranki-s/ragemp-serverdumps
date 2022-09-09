{
﻿/*
 * Autor: poleStar
 * 
 * Descripcion: Permite el uso de un comando /visera, sube o baja la visera siempre y cuando tengamos un casco correcto. Al usarlo de nuevo te cambia el estado de la visera.
 */

let anteriorCasco = { drawable: -1, texture: -1 };

mp.events.add("evento_visera", () => {
    let usandoCasco = obtenerCascoEnUso();
    let sustitutoCasco = obtenerCascoSustituido(usandoCasco.drawable);

    if (sustitutoCasco >= 0) {
        anteriorCasco = { drawable: usandoCasco.drawable, texture: usandoCasco.texture };
        mp.events.callRemote("cambiar_visera", sustitutoCasco, usandoCasco.texture, false);
    }
    else if (sustitutoCasco == -1) {
        mostrarAviso("danger", 5000, "El casco que estás utilizando no te permite esta opción");
    }
    else if (sustitutoCasco == -2) {
        if (obtenerCascoSustituido(anteriorCasco.drawable) == usandoCasco.drawable) {
            mp.events.callRemote("cambiar_visera", anteriorCasco.drawable, anteriorCasco.texture, true);
        }
        else {
            mostrarAviso("danger", 5000, "No tienes casco con visera, recuerda que necesitas ponerte un casco que tenga visera");
        }
    }
    else {
        mostrarAviso("danger", 5000, "Opción desconocida");
    }
});

function obtenerCascoEnUso() {
    let resultado = { drawable: player_local.getPropIndex(0), texture: player_local.getPropTextureIndex(0) };
    return resultado;
}

function obtenerCascoSustituido(idCasco) {
    if (player_local.model === mp.game.joaat('mp_m_freemode_01')) { // pj masculino
        switch (idCasco) {
            case 0: case 67: case 68: case 69: case 70: case 71: case 72: case 74: case 79: case 81: case 92: case 127:
                return -2;
            case 82:
                return 67;
            case 50:
                return 68;
            case 51:
                return 69;
            case 52:
                return 70;
            case 53:
                return 71;
            case 62:
                return 72;
            case 73:
                return 74;
            case 78:
                return 79;
            case 80:
                return 81;
            case 91:
                return 92;
            case 128:
                return 127;
            default:
                return -1;
        }
    }
    else if (player_local.model === mp.game.joaat('mp_f_freemode_01')) { // pj femenino
        switch (idCasco) {
            case 0: case 66: case 67: case 68: case 69: case 70: case 71: case 73: case 78: case 80: case 91: case 126:
                return -2;
            case 81:
                return 66;
            case 49:
                return 67;
            case 50:
                return 68;
            case 51:
                return 69;
            case 52:
                return 70;
            case 62:
                return 71;
            case 72:
                return 73;
            case 77:
                return 78;
            case 79:
                return 80;
            case 90:
                return 91;
            case 127:
                return 126;
            default:
                return -1;
        }
    }
    else { // Usando un casco que no tiene visera o no contemplamos
        return -1;
    }
}

}