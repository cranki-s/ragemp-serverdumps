{
﻿/*
 * Autor: poleStar
 * 
 * Descripcion: Permite el uso de un comando /guantes, quita los guantes siempre y cuando tengamos un torso correcto. Al usarlo de nuevo te vuelve a colocar los guantes.
 */

let anteriorTorso = { drawable: -1, texture: -1 };

mp.events.add("evento_guantes", () => {
    let usandoTorso = obtenerTorsoEnUso();
    let sustitutoTorso = obtenerTorsoSustituto(usandoTorso.drawable);

    if (sustitutoTorso >= 0) {
        anteriorTorso = { drawable: usandoTorso.drawable, texture: usandoTorso.texture };
        mp.events.callRemote("cambiar_guantes", sustitutoTorso, 0, false);
    }
    else if (sustitutoTorso == -1) {
        mostrarAviso("danger", 5000, "El torso que estás utilizando no te permite esta opción");
    }
    else if (sustitutoTorso == -2) {
        if (obtenerTorsoSustituto(anteriorTorso.drawable) == usandoTorso.drawable) {
            mp.events.callRemote("cambiar_guantes", anteriorTorso.drawable, anteriorTorso.texture, true);
        }
        else {
            mostrarAviso("danger", 5000, "No tienes guantes que ponerte, recuerda que necesitas ponerte un torso que tenga guantes");
        }
    }
    else {
        mostrarAviso("danger", 5000, "Opción desconocida");
    }
});

function obtenerTorsoEnUso() {
    let resultado = { drawable: player_local.getDrawableVariation(3), texture: player_local.getTextureVariation(3) };
    return resultado;
}

function obtenerTorsoSustituto(idTorso) {
    if (player_local.model === mp.game.joaat('mp_m_freemode_01')) { // pj masculino
        switch (idTorso) {
            case 0: case 1: case 2: case 4: case 5: case 6: case 8: case 11: case 12: case 14: case 15: case 112: case 113: case 114: case 184:
                return -2;
            case 19: case 30: case 41: case 52: case 63: case 74: case 85: case 99: case 138: case 151: case 171:
                // 0 - Antebrazos y parte del brazo
                return 0;
            case 20: case 31: case 42: case 53: case 64: case 75: case 86: case 100: case 139: case 152: case 172:
                // 1 - manos y munecas
                return 1;
            case 21: case 32: case 43: case 54: case 65: case 76: case 87: case 101: case 140: case 153: case 173:
                // 2 - Brazos enteros sin cuerpo
                return 2;
            case 16: case 17: case 18: case 22: case 33: case 44: case 55: case 66: case 77: case 88: case 96:
            case 102: case 110: case 111: case 141: case 154: case 165: case 166: case 174: case 195:
                // 4 - Solo manos
                return 4;
            case 23: case 34: case 45: case 56: case 67: case 78: case 89: case 103: case 142: case 155: case 175:
                // 5 - cuerpo entero sin pecho
                return 5;
            case 24: case 35: case 46: case 57: case 68: case 79: case 90: case 104: case 143: case 156: case 176:
                // 6 - solo manos 2
                return 6;
            case 25: case 36: case 47: case 58: case 69: case 80: case 91: case 105: case 144: case 157: case 177:
                // 8 - solo antebrazos
                return 8;
            case 26: case 37: case 48: case 59: case 70: case 81: case 92: case 106: case 145: case 158: case 178:
                // 11 - antebrazos y codo
                return 11;
            case 27: case 38: case 49: case 60: case 71: case 82: case 93: case 107: case 146: case 159: case 179:
                // 12 - solo manos y poco cuello
                return 12;
            case 28: case 39: case 50: case 61: case 72: case 83: case 94: case 108: case 147: case 160: case 180:
                // 14 - Manos, munecas y pecho entero
                return 14;
            case 29: case 40: case 51: case 62: case 73: case 84: case 95: case 109: case 136: case 137: case 170:
                // 15 - cuerpo entero
                return 15;
            case 115: case 116: case 117: case 118: case 119: case 120: case 121: case 148: case 161: case 181:
                // 112 - Sin tirantes todo
                return 112;
            case 122: case 123: case 124: case 125: case 126: case 127: case 128: case 149: case 162: case 182:
                // 113 - Sin tirantes y sin cuerpo
                return 113;
            case 129: case 130: case 131: case 132: case 133: case 134: case 135: case 150: case 163: case 183:
                // 114 - Sin tirantes con medio pecho
                return 114;
            case 185: case 186: case 187: case 188: case 189: case 190: case 191: case 192: case 193: case 194:
                // 184 - Antebrazos con codo y cuerpo
                return 184;
            default:
                return -1;
        }
    }
    else if (player_local.model === mp.game.joaat('mp_f_freemode_01')) { // pj femenino
        switch (idTorso) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 9: case 11: case 12: case 14: case 15: case 129: case 130: case 131: case 153: case 161: case 229:
                return -2;
            case 20: case 33: case 46: case 59: case 72: case 85: case 98: case 114: case 171: case 187: case 212:
                // 0 - Brazos y parte de arriba pecho, sin hombros
                return 0;
            case 21: case 34: case 47: case 60: case 73: case 86: case 99: case 115: case 172: case 188: case 213:
                // 1 - Antebrazos y parte de arriba pecho, sin hombros
                return 1;
            case 22: case 35: case 48: case 61: case 74: case 87: case 100: case 116: case 173: case 189: case 214:
                // 2 - Con mas parte de brazo derecho que izquierdo
                return 2;
            case 17: case 18: case 19: case 23: case 36: case 49: case 62: case 75: case 88: case 101: case 111:
            case 117: case 127: case 128: case 174: case 190: case 206: case 207: case 215: case 240:
                // 3 - Solo manos
                return 3;
            case 24: case 37: case 50: case 63: case 76: case 89: case 102: case 118: case 175: case 191: case 216:
                // 4 - Todo cuerpo sin senos
                return 4;
            case 25: case 38: case 51: case 64: case 77: case 90: case 103: case 119: case 176: case 192: case 217:
                // 5 - Antebrazos con parte del pecho
                return 5;
            case 26: case 39: case 52: case 65: case 78: case 91: case 104: case 120: case 177: case 193: case 218:
                // 6 - Manos con todo el pecho
                return 6;
            case 27: case 40: case 53: case 66: case 79: case 92: case 105: case 121: case 178: case 194: case 219:
                // 7 - Manos con parte de arriba del pecho
                return 7;
            case 28: case 41: case 54: case 67: case 80: case 93: case 106: case 122: case 179: case 195: case 220:
                // 9 - Antebrazos con parte de arriba del pecho
                return 9;
            case 16: case 29: case 42: case 55: case 68: case 81: case 94: case 107: case 123: case 180: case 196: case 221:
                // 11 - Brazos enteros y parte de arriba del pecho
                return 11;
            case 30: case 43: case 56: case 69: case 82: case 95: case 108: case 124: case 181: case 197: case 222:
                // 12 - Brazos enteros y parte de arriba del torso
                return 12;
            case 31: case 44: case 57: case 70: case 83: case 96: case 109: case 125: case 182: case 198: case 223:
                // 14 - Antebrazos con mitad del brazo
                return 14;
            case 32: case 45: case 58: case 71: case 84: case 97: case 110: case 126: case 169: case 170: case 211:
                // 15 - Cuerpo entero
                return 15;
            case 132: case 133: case 134: case 135: case 136: case 137: case 138: case 183: case 199: case 224:
                // 129 - Cuerpo entero sin tirantes
                return 129;
            case 139: case 140: case 141: case 142: case 143: case 144: case 145: case 184: case 200: case 225:
                // 130 - Brazos sin tirantes ni torso
                return 130;
            case 146: case 147: case 148: case 149: case 150: case 151: case 152: case 185: case 201: case 226:
                // 131 - Brazos sin tirantes, con parte de arriba del pecho
                return 131;
            case 154: case 155: case 156: case 157: case 158: case 159: case 160: case 186: case 202: case 227:
                // 153 - Brazos enteros sin hombros, con tripa
                return 153;
            case 162: case 163: case 164: case 165: case 166: case 167: case 168: case 203: case 204: case 228:
                // 161 - Brazos con tripa
                return 161;
            case 230: case 231: case 232: case 233: case 234: case 235: case 236: case 237: case 238: case 239:
                // 229 - Antebrazos, con casi todo el pecho entero
                return 229;
            default:
                return -1;
        }
    }
    else { // Usando una skin que no es los masculino/femenino por defecto
        return -1;
    }
}

}