{
/* --------------------------------------------------------------------------------
 * textlabel.js
 *
 * Autor: Kenshin
 *
 * Descripción: Sistema de peds.
 *
 *
 * -------------------------------------------------------------------------------- */
var PedsEscenarios = [];
var PedsAnimaciones = [];
let Ped;
let obj;

mp.events.add('crearPedEscenario', function (array) {
    let peds_array = JSON.parse(array);
    let existe = false;
    let ped_duplicado = null;
    PedsEscenarios.forEach(function (p) {
        if (p.id == peds_array[5])
        {
            existe = true;
            ped_duplicado = p;
        }
    });

    if (!existe) {
        Ped = mp.peds.new(mp.game.joaat(peds_array[0]), new mp.Vector3(peds_array[1].x, peds_array[1].y, peds_array[1].z), peds_array[2], peds_array[3]);
        obj = { ped: Ped, id: peds_array[5], escenario: peds_array[4] };
        PedsEscenarios.push(obj);
    }
    else { 
        // Como en su dia se pusieron peds a cholon con la misma id la alternativa es comprobar si realmente esta duplicado comparando sus posiciones
        if (ped_duplicado != null && calcDist(new mp.Vector3(peds_array[1].x, peds_array[1].y, peds_array[1].z), ped_duplicado.ped.position) > 1.0) {
            let nueva_id = PedsEscenarios.length;

            Ped = mp.peds.new(mp.game.joaat(peds_array[0]), new mp.Vector3(peds_array[1].x, peds_array[1].y, peds_array[1].z), peds_array[2], peds_array[3]);
            obj = { ped: Ped, id: nueva_id, escenario: peds_array[4] };
            PedsEscenarios.push(obj);
        }
    }
});

mp.events.add('crearPedAnimacion', function (array, callback, modelEsHash=false) {
    let peds_array = JSON.parse(array);
    let existe = false;
    PedsAnimaciones.forEach(function (p) {
        if (p.id == peds_array[6])
        {
            existe = true;
        }
    });

    if(!existe)
    {
        Ped = mp.peds.new(!modelEsHash ? mp.game.joaat(peds_array[0]) : peds_array[0], new mp.Vector3(peds_array[1].x, peds_array[1].y, peds_array[1].z), peds_array[2], peds_array[3]);
        obj = {ped: Ped, id: PedsAnimaciones.length+1, diccionario: peds_array[4], animacion: peds_array[5]};
        PedsAnimaciones.push(obj);

        if (callback && callback !== void 0) callback(Ped);
    }
});

// Este evento sirve para solo recibir una vez todos los peds a crear en vez de llamar muchas veces a los otros dos eventos
mp.events.add('crearPedsTraficar', function (ped, escenario, array) {
    let array_posiciones = JSON.parse(array);
    for (let i = 0; i < array_posiciones.length; i++) {
        Ped = mp.peds.new(mp.game.joaat(ped), new mp.Vector3(array_posiciones[i][0].x, array_posiciones[i][0].y, array_posiciones[i][0].z), array_posiciones[i][1].z, 0);
        obj = { ped: Ped, id: PedsEscenarios.length + 1, escenario: escenario };
        PedsEscenarios.push(obj);
    }

    mp.events.remove("crearPedsTraficar");
});

// //const Toxybobi = mp.peds.new(mp.game.joaat("mp_m_freemode_01"), new mp.Vector3(-899.8542, -1290.9749, 5.245302), 108.346725, 0);
// //const Toxybobi = mp.game.ped.createPed(4, mp.game.joaat("mp_m_freemode_01"), -899.8542, -1290.9749, 5.245302, 108.346725, false, false);
// const Toxybobi = mp.game.invoke("0xD49F9B0955C367DE", 4, mp.game.joaat("mp_m_freemode_01"), -899.8542, -1290.9749, 5.245302, 108.346725, false, false); 

// //mp.game.invoke("0x428CA6DBD1094446", Toxybobi, true); // FREEZE_ENTITY_POSITION
// mp.game.invoke("0x239528EACDC3E7DE", Toxybobi, true); // SET_PLAYER_INVINCIBLE
// mp.game.invoke("0x3882114BDE571AD4", Toxybobi, true);  // SET_ENTITY_INVINCIBLE
// mp.game.invoke("0xE43A13C9E4CCCBCF", Toxybobi, true); // _BLOCK_PED_DEAD_BODY_SHOCKING_EVENTS
// mp.game.invoke("0x8FE22675A5A45817", Toxybobi, true); // CLEAR_PED_BLOOD_DAMAGE
// mp.game.invoke("0x9F8AA94D6D97DBF4", Toxybobi, true); // SET_BLOCKING_OF_NON_TEMPORARY_EVENTS
// mp.game.invoke("0xB3B1CB349FF9C75D", Toxybobi, false, false); // SET_CAN_ATTACK_FRIENDLY
// mp.game.invoke("0x63F58F7C80513AAD", Toxybobi, false); // SET_PED_CAN_BE_TARGETTED
// mp.game.invoke("0xCB7553CDCEF4A735", Toxybobi, false); // SET_PED_CAN_COWER_IN_COVER
// mp.game.invoke("0x9F7794730795E019", Toxybobi, 292, true); // SET_PED_COMBAT_ATTRIBUTES
// mp.game.invoke("0x9F7794730795E019", Toxybobi, 1424  , true); // SET_PED_COMBAT_ATTRIBUTES
// mp.game.invoke("0x90D2156198831D69", Toxybobi, true); // TASK_SET_BLOCKING_OF_NON_TEMPORARY_EVENTS
// mp.game.invoke("0x70A2D1137C8ED7C9", Toxybobi, 0, false); // SET_PED_FLEE_ATTRIBUTES
// mp.game.invoke("0x9F7794730795E019", Toxybobi, 17, true); // SET_PED_COMBAT_ATTRIBUTES
// mp.game.invoke("0x9F8AA94D6D97DBF4", Toxybobi, true); // SET_BLOCKING_OF_NON_TEMPORARY_EVENTS
// mp.game.invoke("0x63F58F7C80513AAD", Toxybobi, false); // SET_PED_CAN_BE_TARGETTED

// // setPedHeadBlendData

// mp.game.invoke("0x9414E18B9434C2FE", Toxybobi, 0, 25, 0, 5, 0, 0, 0.5, 0, 0, false);

// mp.game.invoke("0x4CFFC65454C93A49", Toxybobi, 0, 0); // _SET_PED_HAIR_COLOR
// mp.game.invoke("0x50B56988B170AFDF", Toxybobi, 1); // _SET_PED_EYE_COLOR


// // setPedComponentVariation

// mp.game.invoke("0x262B14F48D29DE80", Toxybobi, 2, 0, 0, 0);
// mp.game.invoke("0x262B14F48D29DE80", Toxybobi, 3, 0, 0, 0);
// mp.game.invoke("0x262B14F48D29DE80", Toxybobi, 4, 47, 0, 0);
// mp.game.invoke("0x262B14F48D29DE80", Toxybobi, 5, 0, 0, 0);
// mp.game.invoke("0x262B14F48D29DE80", Toxybobi, 6, 51, 0, 0);
// mp.game.invoke("0x262B14F48D29DE80", Toxybobi, 7, 0, 0, 0);
// mp.game.invoke("0x262B14F48D29DE80", Toxybobi, 8, 15, 0, 0);
// mp.game.invoke("0x262B14F48D29DE80", Toxybobi, 11, 97, 1, 0);

// // setPedHeadOverlay
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 0, 255, 0);
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 1, 11, parseFloat(1));
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 2, 33, parseFloat(1));
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 3, 2, parseFloat(1));
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 4, 255, 0);
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 5, 255, 0);
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 6, 255, 0);
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 7, 1, parseFloat(0.6));
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 8, 255, 0);
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 9, 255, 0);
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 10, 255, 0);
// mp.game.invoke("0x48F44967FA05CC1E", Toxybobi, 11, 255, 0);

// // _SET_PED_FACE_FEATURE
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 0, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 1, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 2, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 3, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 4, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 5, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 6, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 7, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 8, -0.37);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 9, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 10, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 11, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 12, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 13, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 14, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 15, -0.3);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 16, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 17, -0.28);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 18, 0);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 19, 0.23);
// mp.game.invoke("0x71A5C1DBA060049E", Toxybobi, 19, 0.23);

// mp.game.invoke("0x93376B65A266EB5F", Toxybobi, 1, 5, 4, true); //SET_PED_PROP_INDEX

// obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HIKER_STANDING" };
// PedsEscenarios.push(obj);

//Metro
mp.peds.new(mp.game.joaat("s_m_m_lsmetro_01"), new mp.Vector3(-474.2551, -709.8112, 20.03185), -94.69626, 0);
mp.peds.new(mp.game.joaat("s_m_m_lsmetro_01"), new mp.Vector3(-1353.516, -508.8743, 23.26936), -71.83154, 0);
mp.peds.new(mp.game.joaat("s_m_m_lsmetro_01"), new mp.Vector3(-843.3865, -122.8993, 28.18497), 113.3643, 0);
mp.peds.new(mp.game.joaat("s_m_m_lsmetro_01"), new mp.Vector3(-250.0131, -298.7916, 21.62639), 115.4976, 0);
mp.peds.new(mp.game.joaat("s_m_m_lsmetro_01"), new mp.Vector3(-917.3973, -2344.027, -3.507518), -125.15, 0);
mp.peds.new(mp.game.joaat("s_m_m_lsmetro_01"), new mp.Vector3(-1025.361, -2755.062, 0.8003627), -136.3452, 0);

/*mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2131.181, 2916.715, -61.9019), 298.3988, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2132.425, 2925.541, -61.9019), 217.7485, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2120.873, 2925.962, -61.90193), 118.4055, 1);
mp.peds.new(mp.game.joaat("s_f_y_airhostess_01"), new mp.Vector3(2110.472, 2929.218, -61.90193), 216.5262, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2165.93, 2919.456, -81.07534), 62.78629, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2166.032, 2923.034, -81.07534), 115.0477, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2176.736, 2922.102, -84.80005), 3.62385, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2035.536, 2950.734, -61.90184), 260.9715, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2047.686, 2960.334, -61.90184), 53.27818, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2043.83, 2962.842, -61.90184), 237.8179, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2044.034, 2947.301, -61.90174), 145.1531, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2058.165, 2935.849, -61.90179), 70.24935, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2040.985, 2931.435, -61.90177), 298.1017, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2036.845, 2944.241, -61.90177), 170.9854, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2076.741, 2933.572, -61.90174), 172.6151, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2080.058, 2926.972, -61.90189), 336.306, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2099.894, 2929.067, -61.9019), 169.53, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2059.294, 2985.333, -61.90179), 147.0092, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2039.294, 2976.604, -64.50157), 239.2691, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2045.738, 2966.107, -67.30132), 306.5695, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2059.051, 2985.158, -67.30164), 157.9972, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2062.688, 2981.748, -67.30132), 113.2464, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2054.811, 2984.407, -72.702), 309.4395, 1);
mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(2049.886, 2992.442, -72.7021), 251.0213, 1);*/

//Metro Davis
Ped = mp.peds.new(mp.game.joaat("a_m_y_soucent_03"), new mp.Vector3(103.09287, -1714.1102, 30.113718), 102.714554, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET_CLUBHOUSE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_m_m_soucent_02"), new mp.Vector3(101.56363, -1714.4965, 30.112186), -77.91611, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET" };
PedsEscenarios.push(obj);

//Prision
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1831.9, 2603.045, 45.8891), 317.1709, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1841.947, 2602.625, 45.60049), 293.8102, 0);
//mp.peds.new(mp.game.joaat("mp_m_securoguard_01"), new mp.Vector3(1850.922, 2583.662, 45.67205), 1.775827, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1849.11, 2584.066, 45.67205), 279.2732, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1902.049, 2605.631, 45.96619), 321.3275, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1827.509, 2619.526, 62.98271), 247.109, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1819.795, 2622.227, 62.9604), 77.42701, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1844.505, 2700.576, 62.96947), 97.78444, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1770.602, 2759.276, 62.90271), 135.6254, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1652.374, 2754.637, 62.891), 200.6942, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1572.236, 2676.552, 62.74025), 232.5991, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1538.884, 2583.636, 62.69921), 256.3143, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1545.063, 2469.448, 62.72168), 283.3781, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1657.574, 2398.962, 62.72208), 348.7913, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1761.308, 2414.817, 62.72166), 27.96022, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1819.691, 2475.77, 62.69747), 70.73116, 0);
mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1827.519, 2478.596, 62.69924), 312.3936, 0);


/*// Vanilla DIM 0
Ped = mp.peds.new(mp.game.joaat("u_m_y_staggrm_01"), new mp.Vector3(113.1812, -1288.443, 28.45869), -136.3452, 0);
obj = {ped: Ped, id: 0, diccionario: "mp_safehouse", animacion: "lap_dance_girl"};
PedsAnimaciones.push(obj);
Ped = mp.peds.new(mp.game.joaat("s_f_y_stripper_02"), new mp.Vector3(111.8325, -1285.85, 28.45869), -136.3452, 0);
obj = {ped: Ped, id: 0, diccionario: "mp_safehouse", animacion: "lap_dance_girl"};
PedsAnimaciones.push(obj);
Ped = mp.peds.new(mp.game.joaat("u_m_y_staggrm_01"), new mp.Vector3(105.6556, -1294.953, 29.2587), -136.3452, 0);
obj = {ped: Ped, id: 0, diccionario: "mp_safehouse", animacion: "lap_dance_girl"};
PedsAnimaciones.push(obj);
Ped = mp.peds.new(mp.game.joaat("s_f_y_stripper_01"), new mp.Vector3(102.2857, -1290.132, 29.2587), 313.0893, 0);
obj = {ped: Ped, id: 0, diccionario: "mp_safehouse", animacion: "lap_dance_girl"};
PedsAnimaciones.push(obj);*/

Ped = mp.peds.new(mp.game.joaat("s_m_y_sheriff_01"), new mp.Vector3(50.78776, 6486.787, 31.42528), 223.1622, 0);
obj = {ped: Ped, id: 0, escenario: "CODE_HUMAN_MEDIC_TIME_OF_DEATH"};
PedsEscenarios.push(obj);
//Ped = mp.peds.new(mp.game.joaat("s_f_y_sheriff_01"), new mp.Vector3(361.7357, -1590.506, 29.29206), 316.0003, 0);
//obj = {ped: Ped, id: 0, escenario: "CODE_HUMAN_MEDIC_TIME_OF_DEATH"};
//PedsEscenarios.push(obj);

//Mapeo comisaría Mission Row PD
//Ped = mp.peds.new(mp.game.joaat("s_m_m_fiboffice_01"), new mp.Vector3(433.16565, -975.1353, 30.710213), 95.59843, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HIKER_STANDING" };
//PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("s_f_y_cop_01"), new mp.Vector3(432.47162, -974.2181, 30.710733), 158.36021, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_DRINKING" };
//PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_cop_01"), new mp.Vector3(434.03275, -983.76086, 30.709293), 89.39902, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("csb_cop"), new mp.Vector3(480.66193, -996.6832, 30.689804), 87,22751, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_cop_01"), new mp.Vector3(443.14316, -981.93207, 30.689583), 84.769516, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);


//Ped comisaría vespucci
Ped = mp.peds.new(mp.game.joaat("s_f_y_cop_01"), new mp.Vector3(-1097.1068, -818.5365, 19.036144), -53.909176, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_cop_01"), new mp.Vector3(-1097.422, -839.8425, 19.00151), 124.04578, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Mapeo comisaría Pier PD
/*Ped = mp.peds.new(mp.game.joaat("s_m_y_cop_01"), new mp.Vector3(-1635.12, -1022.745, 13.14543), 327.6122, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

//Exterior comisaría Vinewood PD
Ped = mp.peds.new(mp.game.joaat("a_m_y_business_02"), new mp.Vector3(649.3121, -21.337774, 81.87469), -135.25772, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_STAND_MOBILE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_cop_01"), new mp.Vector3(624.1305, 18.868656, 87.825615), 148.98662, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_ciasec_01"), new mp.Vector3(623.61127, 17.512405, 87.823166), -20.689093, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_DRINKING" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("u_m_m_fibarchitect"), new mp.Vector3(622.4559, 18.62097, 87.900116), -115.72559, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET_CLUBHOUSE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("csb_prolsec"), new mp.Vector3(618.21423, 18.240808, 87.868225), -18.557692, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_GUARD_STAND" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_cop_01"), new mp.Vector3(639.2225, 4.7214866, 82.78638), -110.62627, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("cs_karen_daniels"), new mp.Vector3(636.9592, -1.8941617, 82.786385), -150.16495, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_STAND_MOBILE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_fiboffice_02"), new mp.Vector3(638.6747, -1.9793379, 82.787), 123.4327, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET_CLUBHOUSE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_ranger_01"), new mp.Vector3(638.8294, -3.3101068, 82.78773), 29.215532, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_ciasec_01"), new mp.Vector3(637.1412, -3.2212384, 82.78716), -70.64528, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_SMOKE" };
PedsEscenarios.push(obj);*/


//Peds feria Pier

Ped = mp.peds.new(mp.game.joaat("a_f_y_tourist_01"), new mp.Vector3(-1645.59, -1078.41, 13.15793), 54.01249, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

//Vagabundos debajo del puente al lado del Flecca

//Ped = mp.peds.new(mp.game.joaat("s_m_m_trucker_01"), new mp.Vector3(36.88123, -1209.729, 29.34049), 298.2426, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_STAND_FIRE" };
//PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_m_m_trampbeac_01"), new mp.Vector3(36.85531, -1238.798, 29.3028), 268.9348, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_STAND_FIRE" };
PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("ig_russiandrunk"), new mp.Vector3(-10.53372, -1231.187, 29.29525), 68.08616, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_STAND_FIRE" };
//PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("a_m_o_tramp_01"), new mp.Vector3(139.9479, -1196.001, 29.45982), 300.5688, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_STAND_FIRE" };
//PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("a_m_m_trampbeac_01"), new mp.Vector3(173.3939, -1201.74, 29.2951), 255.5575, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_STAND_FIRE" };
//PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_m_m_trampbeac_01"), new mp.Vector3(-64.96525, -1236.925, 29.05163), 70.12944, 0);
obj = { ped: Ped, id: 0, diccionario: "amb@world_human_bum_slumped@male@laying_on_left_side@idle_a", animacion: "idle_b" };
PedsAnimaciones.push(obj);

//Comisaría Davis SD

Ped = mp.peds.new(mp.game.joaat("s_f_y_sheriff_01"), new mp.Vector3(363.1787, -1592.8977, 29.292036), 43.430614, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(356.6062, -1594.451, 29.29205), 180.154, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
//PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_sheriff_01"), new mp.Vector3(365.20682, -1608.8508, 29.29206), -42.52451, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("s_m_y_hwaycop_01"), new mp.Vector3(368.9175, -1594.104, 29.29205), 33.04249, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_DRINKING" };
//PedsEscenarios.push(obj);

// Comisaría Sandy SD
Ped = mp.peds.new(mp.game.joaat("s_m_y_hwaycop_01"), new mp.Vector3(1861.5878, 3690.4783, 34.219433), 28.373287, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("s_m_y_ranger_01"), new mp.Vector3(1844.773, 3690.3, 34.26749), 286.0276, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
//PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_sheriff_01"), new mp.Vector3(1850.186, 3679.849, 34.26787), 229.1979, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_COFFEE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_sheriff_01"), new mp.Vector3(1851.8561, 3688.1577, 34.219433), -151.9537, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

// Hospital sandy

Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(1831.4819, 3677.367, 34.27486), -109.88715, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

// Comisaría Paleto SD
Ped = mp.peds.new(mp.game.joaat("s_f_y_sheriff_01"), new mp.Vector3(-448.95514, 6012.91, 31.71574), -48.8385, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(-441.7314, 5989.586, 27.80372), -80.505875, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("csb_cop"), new mp.Vector3(-440.9486, 6010.526, 31.71648), 31.33258, 0);
//obj = { ped: Ped, id: 0, diccionario: "anim@heists@prison_heiststation@cop_reactions", animacion: "cop_b_reaction" };
//PedsAnimaciones.push(obj);

/*//COLOCAR A ESTA ANIM ASIENTO11 MUJER DENUNCIANDO
Ped = mp.peds.new(mp.game.joaat("MrsPhillips"), new mp.Vector3(-442.1525, 6010.014, 31.7165), 237.9051, 0);
obj = { ped: Ped, id: 0, diccionario: "anim@heists@prison_heiststation@cop_reactions", animacion: "cop_b_reaction" };
PedsAnimaciones.push(obj);

//Ped Exterior Comisaría Paleto SD (barrera)
Ped = mp.peds.new(mp.game.joaat("s_m_y_hwaycop_01"), new mp.Vector3(-456.019, 6021.415, 31.49012), 45.04925, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_STAND_MOBILE" };
PedsEscenarios.push(obj);*/

// Muscle beach, Vespucci
Ped = mp.peds.new(mp.game.joaat("a_m_y_musclbeac_02"), new mp.Vector3(-1209.205, -1559.178, 4.60801), 46.47635, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_MUSCLE_FLEX" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("u_m_y_babyd"), new mp.Vector3(-1200.025, -1571.156, 4.609427), 216.1354, 0);
obj = { ped: Ped, id: 0, escenario: "PROP_HUMAN_MUSCLE_CHIN_UPS_ARMY" };
PedsEscenarios.push(obj);

/*// Peds vigilantes de playa casetas
Ped = mp.peds.new(mp.game.joaat("s_f_y_baywatch_01"), new mp.Vector3(-1373.414, -1624.364, 3.725401), 108.5975, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_BINOCULARS" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_baywatch_01"), new mp.Vector3(-1467.029, -1388.995, 4.13811), 107.9253, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_BINOCULARS" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_baywatch_01"), new mp.Vector3(-1560.544, -1155.268, 3.911211), 132.5747, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_BINOCULARS" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_baywatch_01"), new mp.Vector3(-1496.464, -1031.845, 10.52019), 138.9357, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_BINOCULARS" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_baywatch_01"), new mp.Vector3(-1796.58, -855.2629, 9.19999), 115.7201, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_BINOCULARS" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_f_y_baywatch_01"), new mp.Vector3(-2006.94, -557.1163, 12.88623), 126.6938, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_BINOCULARS" };
PedsEscenarios.push(obj);*/

//Central de bomberos, Paleto Bay
Ped = mp.peds.new(mp.game.joaat("s_m_y_fireman_01"), new mp.Vector3(-377.06497, 6122.409, 31.479527), 89.313065, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_COFFEE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(-378.44528, 6121.134, 31.479527), 10.216255, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_fireman_01"), new mp.Vector3(-374.15543, 6115.832, 31.63579), 75.70534, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Hospital Davis
Ped = mp.peds.new(mp.game.joaat("a_m_o_soucent_02"), new mp.Vector3(307.24167, -1454.4348, 29.966597), -3.81548, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_SMOKE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_m_m_trampbeac_01"), new mp.Vector3(305.63, -1453.235, 29.968306), -60.76748, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_DRUG_DEALER_HARD" };
PedsEscenarios.push(obj);

//Hospital Pillbox Hill (solo colocadas en el ext)
//Ped = mp.peds.new(mp.game.joaat("cs_andreas"), new mp.Vector3(353.69876, -599.5457, 28.764914), -135.78484, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_SMOKE" };
//PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_m_m_bevhills_01"), new mp.Vector3(361.42957, -579.09155, 28.82719), -171.1879, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET_CLUBHOUSE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_m_y_bevhills_01"), new mp.Vector3(361.74704, -580.4024, 28.829483), 13.940484, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_f_m_bevhills_02"), new mp.Vector3(360.34976, -580.3001, 28.821749), -63.941673, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_COFFEE" };
PedsEscenarios.push(obj);


//Megamall Davis
Ped = mp.peds.new(mp.game.joaat("a_m_m_trampbeac_01"), new mp.Vector3(69.07639, -1713.3662, 29.261364), -34.359867, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_BUM_FREEWAY" };
PedsEscenarios.push(obj);

//Peds Legion Square
Ped = mp.peds.new(mp.game.joaat("a_m_m_paparazzi_01"), new mp.Vector3(167.4401, -987.0672, 30.09191), 326.3185, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_PAPARAZZI" };
PedsEscenarios.push(obj);

//Deposito Davis
Ped = mp.peds.new(mp.game.joaat("s_m_y_cop_01"), new mp.Vector3(411.0151, -1621.034, 29.29205), 230.2885, 0);
// Ped = mp.peds.new(mp.game.joaat("s_m_y_cop_01"), new mp.Vector3(364.0017, -1589.3539, 29.292027), 230.2885, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Hospital Sandy
Ped = mp.peds.new(mp.game.joaat("s_f_y_scrubs_01"), new mp.Vector3(1834.796, 3687.951, 34.27005), 95.75723, 0);
obj = { ped: Ped, id: 0, diccionario: "anim@heists@prison_heiststation@cop_reactions", animacion: "cop_b_reaction" };
PedsAnimaciones.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_scientist_01"), new mp.Vector3(1835.213, 3683.378, 34.27005), 120.8648, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Puente cercano al fleca (por colocar ubicación más identificativa)
//Ped = mp.peds.new(mp.game.joaat("a_c_rat"), new mp.Vector3(35.635, -1208.922, 28.35499), 177.0098, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_RATS_EATING" };
//PedsEscenarios.push(obj);

// PEDS Amunations
mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(22.53776, -1105.516, 29.79703), 157.9794, 0); // Pillbox Hill
mp.peds.new(mp.game.joaat("mp_m_exarmy_01"), new mp.Vector3(842.4277, -1035.251, 28.19486), 358.6886, 0); // La Mesa
mp.peds.new(mp.game.joaat("ig_josef"), new mp.Vector3(809.9211, -2159.065, 29.61899), 344.2439, 0); // Cypress Flats
mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(-1304.144, -394.529, 36.69577), 81.96175, 0); // Morningwood
mp.peds.new(mp.game.joaat("mp_m_exarmy_01"), new mp.Vector3(-3173.701, 1088.293, 20.83873), 248.8032, 0); // Chumash
mp.peds.new(mp.game.joaat("ig_josef"), new mp.Vector3(-1119.087, 2699.604, 18.55413), 223.0624, 0); // Rio Zancudo
mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(1692.098, 3760.952, 34.70531), 231.0293, 0); // Sandy Shores
mp.peds.new(mp.game.joaat("mp_m_exarmy_01"), new mp.Vector3(2568.032, 292.48, 108.7349), 2.114569, 0); // Montañas Tataviam
mp.peds.new(mp.game.joaat("ig_josef"), new mp.Vector3(-331.7736, 6084.979, 31.45477), 226.7203, 0); // Paleto Bay
mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(-662.2878, -933.3775, 21.82922), 174.2832, 0); // Little Seoul
mp.peds.new(mp.game.joaat("mp_m_exarmy_01"), new mp.Vector3(253.9954, -50.69419, 69.94106), 66.69405, 0); // Hawick
// Galerias de tiro
mp.peds.new(mp.game.joaat("mp_m_exarmy_01"), new mp.Vector3(12.018128, -1106.9371, 29.797007), -22.625683, 0); // Pillbox Hill
mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(819.64594, -2154.0142, 29.619001), 179.81175, 0); // Cypress Flats

//Federal ambiente
Ped = mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(1840.0415, 2581.114, 46.019257), -92.761444, 0);
obj = { ped: Ped, id: 0, diccionario: "anim@heists@prison_heiststation@cop_reactions", animacion: "cop_b_reaction" };    //Anim polidepie3
PedsAnimaciones.push(obj);


//peds charla entrada federal
Ped = mp.peds.new(mp.game.joaat("mp_m_securoguard_01"), new mp.Vector3(1838.6964, 2591.5671, 45.890957), 158.15393, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_highsec_04"), new mp.Vector3(1838.62, 2589.455, 45.89095), 23.83546, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("csb_cop"), new mp.Vector3(1837.0094, 2589.954, 45.89095), -57.73654, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_COFFEE" };
PedsEscenarios.push(obj);


//Federal enfermeria 1
Ped = mp.peds.new(mp.game.joaat("s_m_m_paramedic_01"), new mp.Vector3(1780.0427, 2579.8645, 45.91773), 86.76915, 0);
obj = { ped: Ped, id: 0, diccionario: "rcmabigail", animacion: "base" };
PedsAnimaciones.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1784.3776, 2577.3071, 45.917694), 179.38203, 0);
obj = { ped: Ped, id: 0, diccionario: "anim@heists@prison_heiststation@cop_reactions", animacion: "cop_b_reaction" };
PedsAnimaciones.push(obj);

//Federal enfermeria 2
Ped = mp.peds.new(mp.game.joaat("s_f_y_scrubs_01"), new mp.Vector3(1686.1136, 2576.1733, 45.897648), 105.43611, 0);
obj = { ped: Ped, id: 0, diccionario: "switch@michael@sitting", animacion: "idle" };
PedsAnimaciones.push(obj);

//peds ambiente pasillo federal
Ped = mp.peds.new(mp.game.joaat("s_m_y_prisoner_01"), new mp.Vector3(1790.6831, 2578.6113, 45.917664), 84.05333, 0);
obj = { ped: Ped, id: 0, diccionario: "missah_2_ext_altleadinout", animacion: "sofa_loop" };
PedsAnimaciones.push(obj);

Ped = mp.peds.new(mp.game.joaat("cs_prolsec_02"), new mp.Vector3(1790.6008, 2579.7314, 45.917725), 89.59955, 0);
obj = { ped: Ped, id: 0, diccionario: "missah_2_ext_altleadinout", animacion: "sofa_loop" };
PedsAnimaciones.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1787.2551, 2588.153, 45.91768), -2.8471777, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("csb_prolsec"), new mp.Vector3(1788.2806, 2589.3572, 45.917683), 96.92195, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_m_m_prolhost_01"), new mp.Vector3(1787.3358, 2590.0022, 45.917683), -179.78227, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_HANG_OUT_STREET" };
PedsEscenarios.push(obj);

//Federal control camaras
Ped = mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1780.3466, 2573.814, 45.917683), 99.798195, 0);
obj = { ped: Ped, id: 0, diccionario: "anim@move_m@security_guard", animacion: "idle" };
PedsAnimaciones.push(obj);

Ped = mp.peds.new(mp.game.joaat("mp_m_securoguard_01"), new mp.Vector3(1780.593, 2572.2363, 45.91712), -175.16995, 0);
obj = { ped: Ped, id: 0, diccionario: "anim@heists@prison_heiststation@cop_reactions", animacion: "cop_b_reaction" };
PedsAnimaciones.push(obj);


//Guardias varios sueltos prision federal
Ped = mp.peds.new(mp.game.joaat("mp_m_securoguard_01"), new mp.Vector3(1775.978, 2567.1816, 45.91771), 3.7131774, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_prisguard_01"), new mp.Vector3(1689.6279, 2547.4788, 55.03625), 71.282104, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);
Ped = mp.peds.new(mp.game.joaat("s_m_m_security_01"), new mp.Vector3(1691.9224, 2557.5498, 55.03735), -93.0422, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
PedsEscenarios.push(obj);


//Federal administrativos sentados
Ped = mp.peds.new(mp.game.joaat("ig_mrk"), new mp.Vector3(1699.5686, 2571.2822, 45.584644), 175.3255, 0);
obj = { ped: Ped, id: 0, diccionario: "switch@michael@sitting", animacion: "idle" };
PedsAnimaciones.push(obj);
Ped = mp.peds.new(mp.game.joaat("s_m_m_ciasec_01"), new mp.Vector3(1695.0308, 2588.6453, 45.91148), 105.43611, 0);
obj = { ped: Ped, id: 0, diccionario: "anim@heists@prison_heiststation@cop_reactions", animacion: "cop_b_reaction" };
PedsAnimaciones.push(obj);

Ped = mp.peds.new(mp.game.joaat("mp_m_securoguard_01"), new mp.Vector3(1680.3297, 2585.2148, 45.911526), 85.37112, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Ped farmacia pillboxhill
Ped = mp.peds.new(mp.game.joaat("Doctor01SMM"), new mp.Vector3(309.66565, -594.025, 43.284), 26.528, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

//Ped farmacia paleto bay
mp.peds.new(mp.game.joaat("Scrubs01SFY"), new mp.Vector3(309.66565, -594.025, 43.284), 26.528, 0);

/* --- JOBS --- */
/*Centrales basurero*/
Ped = mp.peds.new(mp.game.joaat("s_m_y_garbage"), new mp.Vector3(-355.44797, -1513.8839, 27.717018), -134.80508, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_garbage"), new mp.Vector3(2029.8801, 3184.106, 45.129242), 172.40915, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_garbage"), new mp.Vector3(-149.03943, 6484.9316, 29.728067), 21.142563, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

/*Centrales camionero*/
// LS
Ped = mp.peds.new(mp.game.joaat("s_m_m_cntrybar_01"), new mp.Vector3(797.7643, -2988.4854, 6.020934), 81.835976, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);
//Sandy
Ped = mp.peds.new(mp.game.joaat("s_m_m_cntrybar_01"), new mp.Vector3(173.0377, 2778.9126, 46.07724), -108.45476, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);
//Paleto
Ped = mp.peds.new(mp.game.joaat("s_m_m_cntrybar_01"), new mp.Vector3(-17.416723, 6303.896, 31.374683), 34.314854, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

/*Centrales autobus*/
//LS
Ped = mp.peds.new(mp.game.joaat("a_m_y_business_02"), new mp.Vector3(438.02124, -625.89545, 28.70835), 87.51971, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);
//LS Aeropuerto
Ped = mp.peds.new(mp.game.joaat("a_m_y_business_02"), new mp.Vector3(-775.30426, -2632.3, 13.944616), -104.73054, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

/*Centrales cartero*/
//LS
Ped = mp.peds.new(mp.game.joaat("s_m_m_postal_01"), new mp.Vector3(78.04565, 111.59959, 81.168205), -109.698074, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);
//LS Puerto
Ped = mp.peds.new(mp.game.joaat("s_m_m_postal_01"), new mp.Vector3(-426.25394, -2786.1006, 6.0003786), -53.58832, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);
//Paleto
Ped = mp.peds.new(mp.game.joaat("s_m_m_postal_01"), new mp.Vector3(-405.4284, 6150.7944, 31.67829), -139.71533, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

/*Centrales de taxista*/
//LS
Ped = mp.peds.new(mp.game.joaat("a_m_y_business_03"), new mp.Vector3(-568.4878, -2328.2021, 13.945059), 91.71377, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_COFFEE" };
PedsEscenarios.push(obj);
//Sandy
Ped = mp.peds.new(mp.game.joaat("a_m_y_business_03"), new mp.Vector3(1997.4342, 3780.7178, 32.180763), 179.82893, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_COFFEE" };
PedsEscenarios.push(obj);
//Paleto
Ped = mp.peds.new(mp.game.joaat("a_m_y_business_03"), new mp.Vector3(-42.429504, 6435.168, 31.64258), -42.346897, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_COFFEE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("a_m_m_tourist_01"), new mp.Vector3(-44.38303, 6438.078, 31.490683), -53.296112, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_SMOKE" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_m_cntrybar_01"), new mp.Vector3(-43.527237, 6437.346, 31.490683), -5.70624, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_SMOKE" };
PedsEscenarios.push(obj);

/*Central reponedor*/
//Ambiente
//Ped = mp.peds.new(mp.game.joaat("mp_m_securoguard_01"), new mp.Vector3(816.1598, -1605.8679, 31.764153), -116.32147, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_COP_IDLES" };
//PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("csb_prolsec"), new mp.Vector3(818.1301, -1620.8197, 31.322434), -99.27598, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_GUARD_PATROL" };
//PedsEscenarios.push(obj);
//Central reponedor LS parada autobús
//Ped = mp.peds.new(mp.game.joaat("a_m_y_soucent_03"), new mp.Vector3(822.9519, -1639.222, 30.251004), -100.519295, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_SMOKE" };
//PedsEscenarios.push(obj);

//Ped = mp.peds.new(mp.game.joaat("a_m_o_soucent_03"), new mp.Vector3(822.455, -1637.7329, 30.335867), -97.459694, 0);
//obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_SMOKING_POT" };
//PedsEscenarios.push(obj);
//Ped obtener JOB
Ped = mp.peds.new(mp.game.joaat("ig_josh"), new mp.Vector3(813.49316, -1645.1715, 31.06554), -77.377525, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

/*Central minero*/
Ped = mp.peds.new(mp.game.joaat("s_m_y_construct_01"), new mp.Vector3(2975.037, 2796.882, 41.1598), 306.5415, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CONST_DRILL" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_construct_02"), new mp.Vector3(2962.453, 2774.146, 39.56023), 193.7737, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CONST_DRILL" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_construct_01"), new mp.Vector3(2942.675, 2767.44, 39.54347), 116.2741, 0,);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CONST_DRILL" };
PedsEscenarios.push(obj);

Ped = mp.peds.new(mp.game.joaat("s_m_y_construct_02"), new mp.Vector3(2938.226, 2813.055, 43.37659), 202.5122, 0);
obj = { ped: Ped, id: 0, diccionario: "anim@heists@fleeca_bank@ig_7_jetski_owner", animacion: "owner_idle" };
PedsAnimaciones.push(obj);

/*Central paramédico*/
Ped = mp.peds.new(mp.game.joaat("s_m_m_paramedic_01"), new mp.Vector3(162.40585, -1119.3375, 29.321987), 175.92136, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_AA_COFFEE" };
PedsEscenarios.push(obj);

/*Centrales temporero*/
//Paleto
Ped = mp.peds.new(mp.game.joaat("s_m_m_gardener_01"), new mp.Vector3(417.25662, 6520.74, 27.714674), -99.545265, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);
//Grapeseed
Ped = mp.peds.new(mp.game.joaat("s_m_m_gardener_01"), new mp.Vector3(1905.1349, 4926.6465, 48.911682), -116.103745, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
PedsEscenarios.push(obj);

/*Central pescador*/
Ped = mp.peds.new(mp.game.joaat("s_m_y_dockwork_01"), new mp.Vector3(-338.88284, -2443.713, 7.2960997), 140.78761, 0);
obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_SMOKING_POT" };
PedsEscenarios.push(obj);

/*//Zancudo y Porta aviones
mp.peds.new(mp.game.joaat("s_m_y_marine_01"), new mp.Vector3(-2303.763, 3387.315, 31.25652), 62.57939, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(-2301.304, 3387.584, 31.25652), 315.8932, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_01"), new mp.Vector3(-1590.881, 2796.422, 17.07146), 256.4191, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(-1593.789, 2797.833, 17.07146), 127.2119, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3100.877, -4815.53, 2.036521), 158.0987, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3084.223, -4819.546, 2.038476), 220.9699, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3096.846, -4794.048, 2.037212), 168.0248, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3083.465, -4811.354, 7.027186), 193.0567, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3084.09, -4828.121, 7.027193), 250.7463, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3077.688, -4830.145, 7.02719), 139.3201, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3104.495, -4821.311, 7.030757), 186.481, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3115.071, -4784.221, 4.077734), 352.5799, 0);
mp.peds.new(mp.game.joaat("s_m_y_marine_03"), new mp.Vector3(3027.102, -4713.352, 4.077677), 176.4065, 0);*/

// FIB
mp.peds.new(mp.game.joaat("mp_m_fibsec_01"), new mp.Vector3(2487.6572, -376.61203, 82.694466), -137.05681, 0);

}