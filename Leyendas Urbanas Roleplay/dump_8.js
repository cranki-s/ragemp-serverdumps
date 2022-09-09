{
/* --------------------------------------------------------------------------------
 * interiores.js
 *
 * Autor: Kenshin
 *
 * Descripción: Para cargar props u otros usos para los interiores
 * -------------------------------------------------------------------------------- */
let anteriorInterior = 0;
let texlabelSalida = null;

let objeto1 = null;
let objeto2 = null;

//Penthouse casino 274689
//Actualizamos la info de un interior con sus props especificos cuando entramos en el mismo
mp.events.add("INTERIOR", (nuevo_interior) => {
    try {
        if (nuevo_interior != null) {
            en_interior = nuevo_interior;
            if (nuevo_interior == anteriorInterior) return;

            //Cuando salimos
            switch (anteriorInterior) {
                case 2:
                    mp.game.streaming.removeIpl("apa_ss1_12_interior_v_comedy_milo_");
                    break;
                case 7:
                    mp.game.streaming.removeIpl("coroner_int_on");
                    mp.game.streaming.removeIpl("coroner_int_off");
                    mp.game.streaming.removeIpl("coronertrash");
                    break;
                case 10:
                    mp.game.interior.disableInteriorProp(197889, "V_57_FranklinStuff");
                    mp.game.interior.disableInteriorProp(197889, "V_57_Safari");
                    mp.game.interior.refreshInterior(197889);
                    break;
                case 16:
                    mp.game.streaming.removeIpl("trevorstrailertidy");
                    break;
                case 22:
                    mp.game.interior.disableInteriorProp(246785, "set_up");
                    mp.game.interior.disableInteriorProp(246785, "interior_basic");
                    mp.game.interior.disableInteriorProp(246785, "equipment_basic");
                    mp.game.interior.disableInteriorProp(246785, "security_low");
                    mp.game.interior.disableInteriorProp(246785, "clutter");
                    mp.game.interior.refreshInterior(246785);
                    break;
                case 34:
                    mp.game.interior.disableInteriorProp(246529, "Walls_01");
                    mp.game.interior.disableInteriorProp(246529, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246529, "Decorative_01");
                    mp.game.interior.disableInteriorProp(246529, "lower_walls_default");
                    mp.game.interior.disableInteriorProp(246529, "NO_MOD_BOOTH");
                    mp.game.interior.disableInteriorProp(246529, "Gun_Locker");
                    mp.game.interior.refreshInterior(246529);
                    break;
                case 35:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_01");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 73:
                    mp.game.interior.disableInteriorProp(171777, "swap_clean_apt");
                    mp.game.interior.refreshInterior(171777);
                    break;
                case 75:
                    mp.game.streaming.removeIpl("facelobby");
                    break;
                case 76:
                    mp.game.interior.disableInteriorProp(252673, "basic_style_set");
                    mp.game.interior.disableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.refreshInterior(252673);
                    break;
                case 77:
                    mp.game.streaming.removeIpl("lr_sc1_04_interior_v_strip3_milo_");
                    break;
                case 85:
                    mp.game.streaming.removeIpl("bkr_bi_hw1_13_int");
                    break;
                case 104:
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Style03");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_equipment_setup");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_security_upgrade");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_style03_podium");
                    mp.game.interior.disableInteriorProp(271617, "int01_ba_lights_screen");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Screen");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_bar_content");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_booze_02");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_dj03");
                    mp.game.interior.disableInteriorProp(271617, "DJ_04_Lights_02");
                    mp.game.interior.disableInteriorProp(271617, "DJ_04_Lights_03");
                    mp.game.interior.disableInteriorProp(271617, "DJ_04_Lights_04");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_lightgrid_01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_trad_lights");
                    mp.game.interior.refreshInterior(271617);
                    break;
                case 105:
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Style02");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_equipment_setup");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_security_upgrade");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_style02_podium");
                    mp.game.interior.disableInteriorProp(271617, "int01_ba_lights_screen");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Screen");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_bar_content");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_booze_02");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_dj01");
                    mp.game.interior.disableInteriorProp(271617, "DJ_03_Lights_02");
                    mp.game.interior.disableInteriorProp(271617, "DJ_03_Lights_03");
                    mp.game.interior.disableInteriorProp(271617, "DJ_03_Lights_04");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_lightgrid_01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_trad_lights");
                    mp.game.interior.refreshInterior(271617);
                    break;
                case 106:
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Style01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_equipment_setup");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_security_upgrade");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_style01_podium");
                    mp.game.interior.disableInteriorProp(271617, "int01_ba_lights_screen");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Screen");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_bar_content");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_booze_01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_dj01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Worklamps");
                    mp.game.interior.disableInteriorProp(271617, "DJ_02_Lights_02");
                    mp.game.interior.disableInteriorProp(271617, "DJ_02_Lights_03");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_lightgrid_01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Clutter");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_trad_lights");
                    mp.game.interior.refreshInterior(271617);
                    break;
                case 114:
                    mp.game.streaming.removeIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                        var phIntID = 274689;
                    var phPropList = [
                    "Set_Pent_Tint_Shell",
                    "Set_Pent_Pattern_01",
                    "Set_Pent_Arcade_Retro",
                    "Set_Pent_Bar_Clutter",
                    "set_pent_bar_light_01",
                    "Set_Pent_Media_Bar_Closed",
                    "Set_Pent_Spa_Bar_Closed",
                    "Set_Pent_SPA_BLOCKER",
                    ];
                    for (var _i = 0, phPropList_1 = phPropList; _i < phPropList_1.length; _i++) {
                    var propName = phPropList_1[_i];
                    mp.game.interior.disableInteriorProp(phIntID, propName);
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 958.5333, 24.80821, 116.81, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"),  958.5333, 24.80821, 116.81, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, false);

                    break;
                case 115:
                    mp.game.interior.disableInteriorProp(252673, "urban_style_set");
                    mp.game.interior.disableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.refreshInterior(252673);
                    break;
                case 116:
                    mp.game.interior.disableInteriorProp(252673, "branded_style_set");
                    mp.game.interior.disableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.refreshInterior(252673);
                    break;
                case 117:
                    mp.game.interior.disableInteriorProp(252673, "basic_style_set");
                    mp.game.interior.disableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.disableInteriorProp(252673, "door_blocker");
                    mp.game.interior.refreshInterior(252673);
                    break;
                case 118:
                    mp.game.interior.disableInteriorProp(252673, "urban_style_set");
                    mp.game.interior.disableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.disableInteriorProp(252673, "door_blocker");
                    mp.game.interior.refreshInterior(252673);
                    break;
                case 119:
                    mp.game.interior.disableInteriorProp(252673, "branded_style_set");
                    mp.game.interior.disableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.disableInteriorProp(252673, "door_blocker");
                    mp.game.interior.refreshInterior(252673);
                    break;
                case 129:
                    mp.game.interior.disableInteriorProp(253441, "garage_decor_01");
                    mp.game.interior.refreshInterior(253441);
                    break;
                case 130:
                    mp.game.interior.disableInteriorProp(253441, "garage_decor_02");
                    mp.game.interior.refreshInterior(253441);
                    break;
                case 131:
                    mp.game.interior.disableInteriorProp(253441, "garage_decor_03");
                    mp.game.interior.refreshInterior(253441);
                    break;
                case 132:
                    mp.game.interior.disableInteriorProp(253441, "garage_decor_04");
                    mp.game.interior.refreshInterior(253441);
                    break;
                case 133:
                    mp.game.streaming.removeIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_");
                    mp.game.interior.disableInteriorProp(260353, "set_tint_shell");
                    mp.game.interior.disableInteriorProp(260353, "set_modarea");
                    mp.game.interior.disableInteriorProp(260353, "set_office_basic");
                    mp.game.interior.disableInteriorProp(260353, "office_blocker_set");
                    mp.game.interior.disableInteriorProp(260353, "set_bedroom_blinds_closed");
                    mp.game.interior.disableInteriorProp(260353, "set_bedroom_clutter");
                    mp.game.interior.disableInteriorProp(260353, "set_floor_1");
                    mp.game.interior.disableInteriorProp(260353, "set_floor_decal_2");
                    mp.game.interior.disableInteriorProp(260353, "set_lighting_hangar_a");
                    mp.game.interior.refreshInterior(260353);
                    break;
                case 134:
                    mp.game.interior.disableInteriorProp(253697, "garage_decor_01");
                    mp.game.interior.refreshInterior(253697);
                    break;
                case 135:
                    mp.game.interior.disableInteriorProp(253697, "garage_decor_02");
                    mp.game.interior.refreshInterior(253697);
                    break;
                case 136:
                    mp.game.interior.disableInteriorProp(253697, "garage_decor_03");
                    mp.game.interior.refreshInterior(253697);
                    break;
                case 137:
                    mp.game.interior.disableInteriorProp(253697, "garage_decor_04");
                    mp.game.interior.refreshInterior(253697);
                    break;
                case 173:
                    mp.game.streaming.removeIpl("interior_placement");
                    break;
                case 178:
                    mp.game.interior.disableInteriorProp(252673, "door_blocker");
                    mp.game.interior.refreshInterior(252673);
                    break;
                case 179:
                    mp.game.interior.disableInteriorProp(247041, "meth_lab_upgrade");
                    mp.game.interior.disableInteriorProp(247041, "meth_lab_production");
                    mp.game.interior.disableInteriorProp(247041, "meth_lab_security_high");
                    mp.game.interior.disableInteriorProp(247041, "meth_lab_setup");
                    mp.game.interior.refreshInterior(247041);
                    break;
                case 180:
                    mp.game.interior.disableInteriorProp(247297, "weed_upgrade_equip");
                    mp.game.interior.disableInteriorProp(247297, "weed_low_security");
                    mp.game.interior.disableInteriorProp(247297, "weed_security_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "weed_set_up");
                    mp.game.interior.disableInteriorProp(247297, "weed_chairs");
                    mp.game.interior.disableInteriorProp(247297, "weed_production");
                    mp.game.interior.disableInteriorProp(247297, "weed_drying");
                    mp.game.interior.disableInteriorProp(247297, "weed_hosea");
                    mp.game.interior.disableInteriorProp(247297, "weed_hoseb");
                    mp.game.interior.disableInteriorProp(247297, "weed_hosec");
                    mp.game.interior.disableInteriorProp(247297, "weed_hosed");
                    mp.game.interior.disableInteriorProp(247297, "weed_hosee");
                    mp.game.interior.disableInteriorProp(247297, "weed_hosef");
                    mp.game.interior.disableInteriorProp(247297, "weed_hoseg");
                    mp.game.interior.disableInteriorProp(247297, "weed_hoseh");
                    mp.game.interior.disableInteriorProp(247297, "weed_hosei");
                    mp.game.interior.disableInteriorProp(247297, "weed_growtha_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growtha_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growtha_stage3");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthb_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthb_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthb_stage3");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthc_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthc_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthc_stage3");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthd_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthd_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthd_stage3");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthe_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthe_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthe_stage3");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthf_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthf_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthf_stage3");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthg_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthg_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthg_stage3");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthh_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthh_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthh_stage3");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthi_stage1");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthi_stage2");
                    mp.game.interior.disableInteriorProp(247297, "weed_growthi_stage3");
                    mp.game.interior.disableInteriorProp(247297, "light_growtha_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growthb_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growthc_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growthd_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growthe_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growthf_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growthg_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growthh_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growthi_stage23_standard");
                    mp.game.interior.disableInteriorProp(247297, "light_growtha_stage23_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "light_growthb_stage23_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "light_growthc_stage23_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "light_growthd_stage23_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "light_growthe_stage23_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "light_growthf_stage23_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "light_growthg_stage23_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "light_growthh_stage23_upgrade");
                    mp.game.interior.disableInteriorProp(247297, "light_growthi_stage23_upgrade");
                    mp.game.interior.refreshInterior(247297);
                    break;
                case 181:
                    mp.game.interior.disableInteriorProp(247553, "set_up");
                    mp.game.interior.disableInteriorProp(247553, "security_low");
                    mp.game.interior.disableInteriorProp(247553, "security_high");
                    mp.game.interior.disableInteriorProp(247553, "equipment_upgrade");
                    mp.game.interior.disableInteriorProp(247553, "production_upgrade");
                    mp.game.interior.disableInteriorProp(247553, "coke_press_upgrade");
                    mp.game.interior.disableInteriorProp(247553, "table_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(247553, "coke_cut_01");
                    mp.game.interior.disableInteriorProp(247553, "coke_cut_02");
                    mp.game.interior.disableInteriorProp(247553, "coke_cut_03");
                    mp.game.interior.disableInteriorProp(247553, "coke_cut_04");
                    mp.game.interior.disableInteriorProp(247553, "coke_cut_05");
                    mp.game.interior.refreshInterior(247553);
                    break;
                case 191:
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Style01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_equipment_setup");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_security_upgrade");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_style01_podium");
                    mp.game.interior.disableInteriorProp(271617, "int01_ba_lights_screen");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_Screen");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_bar_content");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_booze_01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_dj01");
                    mp.game.interior.disableInteriorProp(271617, "DJ_01_Lights_02");
                    mp.game.interior.disableInteriorProp(271617, "DJ_01_Lights_03");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_lightgrid_01");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(271617, "Int01_ba_trad_lights");
                    mp.game.interior.refreshInterior(271617);
                    break;
                case 192:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_02");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_01");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 193:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 194:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_02");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 195:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_01");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 196:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_02");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 197:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_03");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 198:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_04");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 199:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_05");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 200:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_06");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 201:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_07");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 202:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_08");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 203:
                    mp.game.interior.disableInteriorProp(246273, "Walls_01");
                    mp.game.interior.disableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.disableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.disableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.disableInteriorProp(246273, "Mural_09");
                    mp.game.interior.refreshInterior(246273);
                    break;
                case 204:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_02b");
                    mp.game.interior.disableInteriorProp(237313, "office_chairs");
                    mp.game.interior.refreshInterior(237313);
                    break;
                case 205:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_02c");
                    mp.game.interior.disableInteriorProp(237569, "office_chairs");
                    mp.game.interior.refreshInterior(237569);
                    break;
                case 206:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_02a");
                    mp.game.interior.disableInteriorProp(237057, "office_chairs");
                    mp.game.interior.refreshInterior(237057);
                    break;
                case 207:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_01a");
                    mp.game.interior.disableInteriorProp(236289, "office_chairs");
                    mp.game.interior.refreshInterior(236289);
                    break;
                case 208:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_01b");
                    mp.game.interior.disableInteriorProp(236545, "office_chairs");
                    mp.game.interior.refreshInterior(236545);
                    break;
                case 209:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_01c");
                    mp.game.interior.disableInteriorProp(236801, "office_chairs");
                    mp.game.interior.refreshInterior(236801);
                    break;
                case 210:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_03a");
                    mp.game.interior.disableInteriorProp(237825, "office_chairs");
                    mp.game.interior.refreshInterior(237825);
                    break;
                case 211:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_03b");
                    mp.game.interior.disableInteriorProp(238081, "office_chairs");
                    mp.game.interior.refreshInterior(238081);
                    break;
                case 212:
                    mp.game.streaming.removeIpl("ex_dt1_02_office_03c");
                    mp.game.interior.disableInteriorProp(238337, "office_chairs");
                    mp.game.interior.refreshInterior(238337);
                    break;
                case 213:
                    mp.game.interior.disableInteriorProp(246785, "set_up");
                    mp.game.interior.disableInteriorProp(246785, "production");
                    mp.game.interior.disableInteriorProp(246785, "interior_upgrade");
                    mp.game.interior.disableInteriorProp(246785, "equipment_upgrade");
                    mp.game.interior.disableInteriorProp(246785, "security_high");

                    mp.game.interior.disableInteriorProp(246785, "interior_basic");
                    mp.game.interior.disableInteriorProp(246785, "equipment_basic");
                    mp.game.interior.disableInteriorProp(246785, "security_low");
                    mp.game.interior.refreshInterior(246785);
                    break;
                case 214:
                    mp.game.interior.enableInteriorProp(7170, "shutter_open");
                    mp.game.interior.disableInteriorProp(7170, "shutter_closed");
                    mp.game.interior.refreshInterior(7170);
                    break;
                case 216:
                    mp.game.streaming.removeIpl("apa_v_mp_h_01_a");
                    break;
                case 217:
                    mp.game.streaming.removeIpl("apa_v_mp_h_02_a");
                    break;
                case 218:
                    mp.game.streaming.removeIpl("apa_v_mp_h_03_a");
                    break;
                case 219:
                    mp.game.streaming.removeIpl("apa_v_mp_h_04_a");
                    break;
                case 220:
                    mp.game.streaming.removeIpl("apa_v_mp_h_05_a");
                    break;
                case 221:
                    mp.game.streaming.removeIpl("apa_v_mp_h_06_a");
                    break;
                case 222:
                    mp.game.streaming.removeIpl("apa_v_mp_h_07_a");
                    break;
                case 223:
                    mp.game.streaming.removeIpl("apa_v_mp_h_08_a");
                    break;  
                case 227: 
                    mp.game.interior.disableInteriorProp(281089, "dj_01_lights_01");
                    mp.game.interior.disableInteriorProp(281089, "dj_01_lights_02");
                    mp.game.interior.disableInteriorProp(281089, "dj_01_lights_03");
                    mp.game.interior.disableInteriorProp(281089, "dj_01_lights_04");
                    mp.game.interior.disableInteriorProp(281089, "dint01_ba_bar_content");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_dj_keinemusik");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_equipment_setup");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(281089, "dint01_ba_style02_podium");
                    mp.game.interior.refreshInterior(281089);
                    break;
                case 229:
                    mp.game.streaming.removeIpl("electronica_ymap");
                    break;
                case 241:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_1");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;
                case 231:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_2");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;
                case 232:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_3");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;

                case 233:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_4");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;

                case 234:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_5");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;

                case 235:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_6");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;

                case 236:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_7");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;

                case 237:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_8");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;

                case 238:
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_style_9");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_bedroom");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cabinets");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_cutscene");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_default");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_car_lift_purchase");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_cut_seats");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_laptop");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_lightbox");
                    mp.game.interior.disableInteriorProp(285953, "entity_set_tints");
                    mp.game.interior.refreshInterior(285953);
                    break;

                case 239:
                    mp.game.interior.disableInteriorProp(286209, "entity_set_test_lights");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_test_lights_cheap");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_time_trial");
                    mp.game.interior.refreshInterior(286209);

                    if(objeto1 != null)
                    {
                        if(mp.objects.exists(objeto1)) objeto1.destroy();
                        objeto1 = null;
                    }
                    if(objeto2 != null)
                    {
                        if(mp.objects.exists(objeto2)) objeto2.destroy();
                        objeto2 = null;
                    }
                    break;

                case 240:
                    mp.game.interior.disableInteriorProp(284673, "tintable_walls");
                    mp.game.interior.refreshInterior(284673);
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_2_tuner_methlab_1_milo_");
                    break;

                case 242:
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_floor_option_01");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_neon_option_01");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_option_01");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_streetx4");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_constant_geometry");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_big_screen");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
                    mp.game.interior.refreshInterior(278273);
                    break;

                case 243:
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_ceiling_beams");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_floor_option_02");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_neon_option_02");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_option_02");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_streetx4");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_constant_geometry");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_big_screen");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
                    mp.game.interior.refreshInterior(278273);
                    break;

                case 244:
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_floor_option_03");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_neon_option_03");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_option_03");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_streetx4");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_constant_geometry");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_big_screen");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
                    mp.game.interior.refreshInterior(278273);
                    break;

                case 245:
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_floor_option_04");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_neon_option_04");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_option_04");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_streetx4");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_constant_geometry");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_big_screen");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
                    mp.game.interior.refreshInterior(278273);
                    break;

                case 246:
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_floor_option_05");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_neon_option_05");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_option_05");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_streetx4");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_constant_geometry");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_big_screen");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
                    mp.game.interior.refreshInterior(278273);
                    break;

                case 247:
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_floor_option_06");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_neon_option_06");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_option_06");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_streetx4");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_constant_geometry");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_big_screen");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
                    mp.game.interior.refreshInterior(278273);
                    break;

                case 248:
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_floor_option_07");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_neon_option_07");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_option_07");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_streetx4");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_constant_geometry");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_big_screen");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
                    mp.game.interior.refreshInterior(278273);
                    break;

                case 249:
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_floor_option_08");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_neon_option_08");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_mural_option_08");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_streetx4");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_constant_geometry");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_big_screen");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
                    mp.game.interior.disableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
                    mp.game.interior.refreshInterior(278273);
                    break;

                case 250:
                    mp.game.interior.disableInteriorProp(281089, "dj_02_lights_01");
                    mp.game.interior.disableInteriorProp(281089, "dj_02_lights_02");
                    mp.game.interior.disableInteriorProp(281089, "dj_02_lights_03");
                    mp.game.interior.disableInteriorProp(281089, "dj_02_lights_04");
                    mp.game.interior.disableInteriorProp(281089, "dint01_ba_bar_content");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_dj_moodyman");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_equipment_setup");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(281089, "dint01_ba_style02_podium");
                    mp.game.interior.refreshInterior(281089);
                    break;
                case 251:
                    mp.game.interior.disableInteriorProp(281089, "dj_03_lights_01");
                    mp.game.interior.disableInteriorProp(281089, "dj_03_lights_02");
                    mp.game.interior.disableInteriorProp(281089, "dj_03_lights_03");
                    mp.game.interior.disableInteriorProp(281089, "dj_03_lights_04");
                    mp.game.interior.disableInteriorProp(281089, "dint01_ba_bar_content");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_dj_palms_trax");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_equipment_setup");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(281089, "dint01_ba_style02_podium");
                    mp.game.interior.refreshInterior(281089);
                    break;
                case 252:
                    mp.game.interior.disableInteriorProp(281089, "dj_04_lights_01");
                    mp.game.interior.disableInteriorProp(281089, "dj_04_lights_02");
                    mp.game.interior.disableInteriorProp(281089, "dj_04_lights_03");
                    mp.game.interior.disableInteriorProp(281089, "dj_04_lights_04");
                    mp.game.interior.disableInteriorProp(281089, "dint01_ba_bar_content");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_dj_palms_trax");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_equipment_setup");
                    mp.game.interior.disableInteriorProp(281089, "int01_ba_equipment_upgrade");
                    mp.game.interior.disableInteriorProp(281089, "dint01_ba_style02_podium");
                    mp.game.interior.refreshInterior(281089);
                    break;
                case 253:
                    mp.game.interior.disableInteriorProp(285441, "tintable_walls");
                    mp.game.interior.refreshInterior(285441);
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_3_tuner_methlab_1_milo_");
                    break;
                case 254:
                    mp.game.interior.disableInteriorProp(285185, "tintable_walls");
                    mp.game.interior.refreshInterior(285185);
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_4_tuner_methlab_1_milo_");
                    break;
                case 255:
                    mp.game.interior.disableInteriorProp(284929, "tintable_walls");
                    mp.game.interior.refreshInterior(284929);
                    mp.game.streaming.removeIpl("tr_int_placement_tr_interior_5_tuner_methlab_1_milo_");
                    break;
                case 258:
                    mp.game.streaming.removeIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                        "Set_Pent_Tint_Shell",
                        "Set_Pent_Pattern_01",
                        "Set_Pent_Clutter_01",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                        var propName = phPropList_2[_a];
                        mp.game.interior.disableInteriorProp(phIntID, propName);
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 985.7617, 64.95393, 116.2652, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"),  985.7617, 64.95393, 116.2652, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 984.7018, 63.25783, 116.2652, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 984.7018, 63.25783, 116.2652, false, 0.0, false);
                    break;
                case 259:
                    mp.game.streaming.removeIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                        "Set_Pent_Tint_Shell",
                        "Set_Pent_Pattern_01",
                        "Set_Pent_Clutter_01",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                        var propName = phPropList_2[_a];
                        mp.game.interior.disableInteriorProp(phIntID, propName);
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 985.7617, 64.95393, 116.2652, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"),  985.7617, 64.95393, 116.2652, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 984.7018, 63.25783, 116.2652, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 984.7018, 63.25783, 116.2652, false, 0.0, false);
                        
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 981.1838, 61.14946, 116.2874, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"),  981.1838, 61.14946, 116.2874, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 979.4877, 62.20929, 116.2874, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 979.4877, 62.20929, 116.2874, false, 0.0, false);
                        
                    break;
                case 260:
                    mp.game.streaming.removeIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                        "Set_Pent_Tint_Shell",
                        "Set_Pent_Pattern_01",
                        "Set_Pent_Clutter_01",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                        var propName = phPropList_2[_a];
                        mp.game.interior.disableInteriorProp(phIntID, propName);
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 981.1838, 61.14946, 116.2874, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"),  981.1838, 61.14946, 116.2874, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 979.4877, 62.20929, 116.2874, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 979.4877, 62.20929, 116.2874, false, 0.0, false);
                        
                    break;
                case 261:
                    mp.game.interior.disableInteriorProp(272129, "Int_03_ba_Tint");
                    mp.game.interior.disableInteriorProp(272129, "Int_03_ba_weapons_mod");
                    mp.game.interior.disableInteriorProp(272129, "Int_03_ba_bikemod");
                    mp.game.interior.disableInteriorProp(272129, "Int_03_ba_Light_Rig1");
                    mp.game.interior.refreshInterior(272129);
                    break;

                case 262:
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -597.9043, -928.5729, 24.01972, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -597.9043, -928.5729, 24.01972, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -597.9066, -931.1725, 24.01972, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -597.9066, -931.1725, 24.01972, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -576.0771, -939.5714, 24.02606, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -576.0771, -939.5714, 24.02606, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -573.478, -939.5773, 24.02606, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -573.478, -939.5773, 24.02606, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -585.4329, -913.0152, 24.02606, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -585.4329, -913.0152, 24.02606, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -588.0329, -913.0066, 24.02606, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -588.0329, -913.0066, 24.02606, false, 0.0, false);
                    break;

                case 263:

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("apa_v_ilev_fh_bedrmdoor"), -579.6191, -919.2062, 28.30607, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("apa_v_ilev_fh_bedrmdoor"), -579.6191, -919.2062, 28.30607, false, 0.0, false);
                    break;

                case 264:
                    mp.game.interior.disableInteriorProp(286209, "entity_set_test_lights");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_test_lights_cheap");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_time_trial");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_meet_lights");
					mp.game.interior.disableInteriorProp(286209, "entity_set_meet_lights_cheap");
                    mp.game.interior.refreshInterior(286209);

                    if(objeto1 != null)
                    {
                        if(mp.objects.exists(objeto1)) objeto1.destroy();
                        objeto1 = null;
                    }
                    if(objeto2 != null)
                    {
                        if(mp.objects.exists(objeto2)) objeto2.destroy();
                        objeto2 = null;
                    }
                    break; 

                case 265:
                    mp.game.interior.disableInteriorProp(286209, "entity_set_test_lights");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_test_lights_cheap");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_time_trial");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_meet_lights");
                    mp.game.interior.disableInteriorProp(286209, "entity_set_meet_lights_cheap");
                    mp.game.interior.refreshInterior(286209);
                    break;
                case 266:
                    mp.game.streaming.removeIpl("ch_int_placement_ch_interior_4_dlc_casino_hotel_milo_");
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("ch_prop_ch_service_door_02a"), 2509.743, -266.5509, -38.965, false, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ch_prop_ch_service_door_02a"),  2509.743, -266.5509, -38.965, false, 0.0, false);
                    break;
                case 267:
                    mp.game.interior.disableInteriorProp(247809, "counterfeit_setup");
                    mp.game.interior.disableInteriorProp(247809, "counterfeit_upgrade_equip");
                    mp.game.interior.disableInteriorProp(247809, "counterfeit_low_security");
                    mp.game.interior.disableInteriorProp(247809, "money_cutter");
                    mp.game.interior.disableInteriorProp(247809, "dryera_on");
                    mp.game.interior.disableInteriorProp(247809, "dryerb_on");
                    mp.game.interior.disableInteriorProp(247809, "dryerc_on");
                    mp.game.interior.disableInteriorProp(247809, "dryerd_open");
                    mp.game.interior.disableInteriorProp(247809, "counterfeit_cashpile100a");
                    mp.game.interior.disableInteriorProp(247809, "counterfeit_cashpile100b");
                    mp.game.interior.disableInteriorProp(247809, "counterfeit_cashpile100c");
                    mp.game.interior.disableInteriorProp(247809, "counterfeit_cashpile100d");
                    mp.game.interior.refreshInterior(247809);
                    break;
                case 268:
                    mp.game.streaming.removeIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                        "Set_Pent_Tint_Shell",
                        "Set_Pent_Spa_Bar_Closed",
                        "Set_Pent_SPA_BLOCKER",
                    ];
                    for (var _i = 0, phPropList_1 = phPropList; _i < phPropList_1.length; _i++) {
                        var propName = phPropList_1[_i];
                        mp.game.interior.disableInteriorProp(phIntID, propName);
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 958.5333, 24.80821, 116.81, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 958.5333, 24.80821, 116.81, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, false, 0.0, false);

                    break;
                case 269:
                    mp.game.streaming.removeIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                        "Set_Pent_Tint_Shell",
                        "Set_Pent_Spa_Bar_Closed",
                        "Set_Pent_SPA_BLOCKER",
                    ];
                    for (var _i = 0, phPropList_1 = phPropList; _i < phPropList_1.length; _i++) {
                        var propName = phPropList_1[_i];
                        mp.game.interior.disableInteriorProp(phIntID, propName);
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 958.5333, 24.80821, 116.81, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 958.5333, 24.80821, 116.81, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, false, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, false);

                    break;
                case 270:
                    mp.game.streaming.removeIpl("vw_casino_garage");
                    break;
                case 272:
                    mp.game.streaming.removeIpl("prologue06_int");
                    break;
                case 274:
                    mp.game.streaming.removeIpl("ch_int_placement_ch_interior_3_dlc_casino_back_milo_");
                    break;
                case 275:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l1"), -430.1948, 262.37326, 82.004875, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r1"), -429.74622, 262.28632, 82.004875, false, 0.0, false); 
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l3"), -419.61624, 268.1909, 82.1945, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r3"), -420.07773, 268.22012, 82.194496, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l2"), -426.74677, 263.1455, 82.19415, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r2"), -426.75085, 263.82108, 82.19415, false, 0.0, false); 
                    // mp.game.streaming.removeIpl("gta5rp_comedyclub_milo_");
                    break;
                case 276:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -429.66473, 276.19168, 82.19449, false, 0.0, false); 
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_4"), -425.12198, 283.8309, 82.19441, false, 0.0, false);
                    // mp.game.streaming.removeIpl("gta5rp_comedyclub_milo_");
                    break;
                case 277:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01b"), -438.618, 264.6551, 83.69353, false, 0.0, false); 
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01b"), -438.36417, 265.84418, 84.69354, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -439.6111, 277.46243, 83.67462, false, 0.0, false);
                    // mp.game.streaming.removeIpl("gta5rp_comedyclub_milo_");
                    break;
                case 278:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 299.57413, 205.17848, 104.37239, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 300.05345, 204.42105, 103.37242, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 301.21915, 203.57991, 104.37232, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 302.0188, 203.37553, 103.37242, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 303.4928, 203.1843, 104.37241, false, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 304.5032, 203.26543, 103.37242, false, 0.0, false);
                    // mp.game.streaming.removeIpl("gta5rp_comedyclub_milo_");
                    break;
                case 279:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("cls_cs_door"), 1088.8549, -777.3906, 57.44279, false, 0.0, false);
                    // mp.game.streaming.removeIpl("int_shop1_milo_");
                    break;
                case 280:
                    mp.game.streaming.removeIpl("h4_islandx_mansion_office");
                    break;
                case 281:
                    mp.game.streaming.removeIpl("h4_islandx_mansion_vault");
                    break;
                case 282:
                    mp.game.streaming.removeIpl("trevorstrailertrash");
                    break;
                case 283:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Lights");
                    mp.game.interior.refreshInterior(286721);
                    break;
                //case 284:
                    //mp.game.object.doorControl(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_l_01a"), -1011.854, -81.56206, -99.2532, false, 0.0, 50.0, 0.0);
                    //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_l_01a"), -1011.854, -81.56206, -99.2532, false, 0.0, false);
                    //mp.game.object.doorControl(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_r_01a"), -1009.454, -81.56206, -99.2532, false, 0.0, 50.0, 0.0);
                    //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_r_01a"), -1009.454, -81.56206, -99.2532, false, 0.0, false);
                    //break;
                case 288:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.refreshInterior(287745);
                    break;
                case 289:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_1");
                    mp.game.interior.refreshInterior(287745);
                       
                    break;
                case 290:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_2");
                    mp.game.interior.refreshInterior(287745);
                    break;
                case 291:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_3");
                    mp.game.interior.refreshInterior(287745);
                    break;
                case 292:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_4");
                    mp.game.interior.refreshInterior(287745);
                    break;
                case 293:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_5");
                    mp.game.interior.refreshInterior(287745);
                    break;
                case 294:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_6");
                    mp.game.interior.refreshInterior(287745);
                    break;
                case 295:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_7");
                    mp.game.interior.refreshInterior(287745);
                    break;
                case 296:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_8");
                    mp.game.interior.refreshInterior(287745);
                    break;
                case 297:
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.disableInteriorProp(287745, "Entity_Set_Wpaper_9");
                    mp.game.interior.refreshInterior(287745);
                    break;
                //case 298:
                    //mp.game.object.doorControl(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_l_01a"), -1011.854, -81.56206, -99.2532, false, 0.0, 50.0, 0.0);
                    //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_l_01a"), -1011.854, -81.56206, -99.2532, false, 0.0, false);
                    //mp.game.object.doorControl(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_r_01a"), -1009.454, -81.56206, -99.2532, false, 0.0, 50.0, 0.0);
                    //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_r_01a"), -1009.454, -81.56206, -99.2532, false, 0.0, false);
                    //break;
                case 299:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 300:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_01");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 301:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_02");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 302:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_03");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 303:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_04");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 304:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_05");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 305:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_06");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 306:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_07");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 307:
                    mp.game.streaming.removeIpl("ba_int_placement_ba_interior_1_dlc_int_02_ba_milo_");
                    mp.game.interior.disableInteriorProp(271873, "Int02_ba_garage_blocker");
                    mp.game.interior.disableInteriorProp(271873, "Int02_ba_equipment_upgrade");
                    mp.game.interior.refreshInterior(271873);
                    break;
                case 308:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_08");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 309:
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_09");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 310:
                    mp.game.streaming.removeIpl("ba_int_placement_ba_interior_1_dlc_int_02_ba_milo_");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.disableInteriorProp(286721, "Entity_Set_Wallpaper_09");
                    mp.game.interior.disableInteriorProp(271873, "Int02_ba_truckmod");
                    mp.game.interior.refreshInterior(286721);
                    break;
                case 311:
                    mp.game.streaming.removeIpl("gr_grdlc_interior_placement_interior_1_grdlc_int_02_milo_");
                    mp.game.interior.refreshInterior(258561);
                    break;
                default:
                    break;
            }

            // Borramos el textlabel del interior
            if (texlabelSalida != null) {
                if (mp.labels.exists(texlabelSalida)) {
                    texlabelSalida.destroy();
                }
                texlabelSalida = null;
            }

            // Si ha entrado en un interior
            if (nuevo_interior != 0) {
                if (interiores.hasOwnProperty(nuevo_interior)) {
                    let posicion = new mp.Vector3(parseFloat(interiores[nuevo_interior].posx), parseFloat(interiores[nuevo_interior].posy), parseFloat(interiores[nuevo_interior].posz));
                    let radio = 2.5;
                    if (player_local.vehicle) radio = 5.0;
                    texlabelSalida = mp.labels.new("~w~Salida\n~g~Pulsa la tecla ~y~Y~g~ para salir", posicion, { los: true, font: 6, drawDistance: radio, color: [255, 255, 255, 255], dimension: mp.players.local.dimension });
                }
            }

            // Actualizamos anteriorInterior
            anteriorInterior = nuevo_interior;

            switch (nuevo_interior) {
                case 2:
                    mp.game.streaming.requestIpl("apa_ss1_12_interior_v_comedy_milo_");
                    anteriorInterior = 2;
                    break;
                case 7:
                    mp.game.streaming.requestIpl("coroner_int_on");
                    mp.game.streaming.requestIpl("coroner_int_off");
                    mp.game.streaming.requestIpl("coronertrash");
                    anteriorInterior = 7;
                    break;
                case 10:
                    mp.game.interior.enableInteriorProp(197889, "V_57_FranklinStuff");
                    mp.game.interior.enableInteriorProp(197889, "V_57_Safari");
                    mp.game.interior.refreshInterior(197889);
                    anteriorInterior = 10;
                    break;
                case 16:
                    mp.game.streaming.requestIpl("trevorstrailertidy");
                    anteriorInterior = 16;
                    break;
                case 22:
                    mp.game.interior.enableInteriorProp(246785, "set_up");
                    mp.game.interior.enableInteriorProp(246785, "interior_basic");
                    mp.game.interior.enableInteriorProp(246785, "equipment_basic");
                    mp.game.interior.enableInteriorProp(246785, "security_low");
                    mp.game.interior.enableInteriorProp(246785, "clutter");
                    mp.game.interior.refreshInterior(246785);
                    anteriorInterior = 22;
                    break;
                case 34:
                    mp.game.interior.enableInteriorProp(246529, "Walls_01");
                    mp.game.interior.enableInteriorProp(246529, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246529, "Decorative_01");
                    mp.game.interior.enableInteriorProp(246529, "lower_walls_default");
                    mp.game.interior.enableInteriorProp(246529, "NO_MOD_BOOTH");
                    mp.game.interior.enableInteriorProp(246529, "NO_Gun_Locker");
                    mp.game.interior.refreshInterior(246529);
                    anteriorInterior = 34;
                    break;
                case 35:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_01");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 35;
                    break;
                case 73:
                    mp.game.interior.enableInteriorProp(171777, "swap_clean_apt");
                    mp.game.interior.refreshInterior(171777);
                    anteriorInterior = 73;
                    break;
                case 75:
                    mp.game.streaming.requestIpl("facelobby");
                    anteriorInterior = 75;
                    break;
                case 76:
                    mp.game.interior.enableInteriorProp(252673, "basic_style_set");
                    mp.game.interior.enableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.refreshInterior(252673);
                    anteriorInterior = 76;
                    break;
                case 77:
                    mp.game.streaming.requestIpl("lr_sc1_04_interior_v_strip3_milo_");
                    anteriorInterior = 77;
                    break;
                case 85:
                    mp.game.streaming.requestIpl("bkr_bi_hw1_13_int");
                    anteriorInterior = 85;
                    break;
                case 104:
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Style03");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_equipment_setup");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_security_upgrade");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_style03_podium");
                    mp.game.interior.enableInteriorProp(271617, "int01_ba_lights_screen");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Screen");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_bar_content");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_booze_02");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_dj03");
                    mp.game.interior.enableInteriorProp(271617, "DJ_04_Lights_02");
                    mp.game.interior.enableInteriorProp(271617, "DJ_04_Lights_03");
                    mp.game.interior.enableInteriorProp(271617, "DJ_04_Lights_04");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_lightgrid_01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_equipment_upgrade");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_trad_lights");
                    mp.game.interior.refreshInterior(271617);
                    anteriorInterior = 104;
                    break;
                case 105:
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Style02");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_equipment_setup");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_security_upgrade");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_style02_podium");
                    mp.game.interior.enableInteriorProp(271617, "int01_ba_lights_screen");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Screen");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_bar_content");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_booze_02");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_dj01");
                    mp.game.interior.enableInteriorProp(271617, "DJ_03_Lights_02");
                    mp.game.interior.enableInteriorProp(271617, "DJ_03_Lights_03");
                    mp.game.interior.enableInteriorProp(271617, "DJ_03_Lights_04");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_lightgrid_01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_equipment_upgrade");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_trad_lights");
                    mp.game.interior.refreshInterior(271617);
                    anteriorInterior = 105;
                    break;
                case 106:
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Style01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_equipment_setup");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_security_upgrade");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_style01_podium");
                    mp.game.interior.enableInteriorProp(271617, "int01_ba_lights_screen");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Screen");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_bar_content");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_booze_01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_dj01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Worklamps");
                    mp.game.interior.enableInteriorProp(271617, "DJ_02_Lights_02");
                    mp.game.interior.enableInteriorProp(271617, "DJ_02_Lights_03");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_lightgrid_01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Clutter");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_equipment_upgrade");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_trad_lights");
                    mp.game.interior.refreshInterior(271617);
                    anteriorInterior = 106;
                    break;
                case 114:
                    mp.game.streaming.requestIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                    "Set_Pent_Tint_Shell",
                    "Set_Pent_Pattern_01",
                    "Set_Pent_Arcade_Retro",
                    "Set_Pent_Bar_Clutter",
                    "set_pent_bar_light_01",
                    "Set_Pent_Media_Bar_Closed",
                    "Set_Pent_Spa_Bar_Closed",
                    "Set_Pent_SPA_BLOCKER",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                        var propName = phPropList_2[_a];
                        mp.game.interior.enableInteriorProp(phIntID, propName);
                        mp.game.invoke("0xC1F1920BAF281317", phIntID, propName, 1); // _SET_INTERIOR_PROP_COLOR
                    }
                    mp.game.interior.refreshInterior(phIntID);


                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 958.5333, 24.80821, 116.81, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"),  958.5333, 24.80821, 116.81, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, false);

                    anteriorInterior = 114;
                    break;
                case 115:
                    mp.game.interior.enableInteriorProp(252673, "urban_style_set");
                    mp.game.interior.enableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.refreshInterior(252673);
                    anteriorInterior = 115;
                    break;
                case 116:
                    mp.game.interior.enableInteriorProp(252673, "branded_style_set");
                    mp.game.interior.enableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.refreshInterior(252673);
                    anteriorInterior = 116;
                    break;
                case 117:
                    mp.game.interior.enableInteriorProp(252673, "basic_style_set");
                    mp.game.interior.enableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.enableInteriorProp(252673, "door_blocker");
                    mp.game.interior.refreshInterior(252673);
                    anteriorInterior = 117;
                    break;
                case 118:
                    mp.game.interior.enableInteriorProp(252673, "urban_style_set");
                    mp.game.interior.enableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.enableInteriorProp(252673, "door_blocker");
                    mp.game.interior.refreshInterior(252673);
                    anteriorInterior = 118;
                    break;
                case 119:
                    mp.game.interior.enableInteriorProp(252673, "branded_style_set");
                    mp.game.interior.enableInteriorProp(252673, "car_floor_hatch");
                    mp.game.interior.enableInteriorProp(252673, "door_blocker");
                    mp.game.interior.refreshInterior(252673);
                    anteriorInterior = 119;
                    break;
                case 129:
                    mp.game.interior.enableInteriorProp(253441, "garage_decor_01");
                    mp.game.interior.refreshInterior(253441);
                    anteriorInterior = 129;
                    break;
                case 130:
                    mp.game.interior.enableInteriorProp(253441, "garage_decor_02");
                    mp.game.interior.refreshInterior(253441);
                    anteriorInterior = 130;
                    break;
                case 131:
                    mp.game.interior.enableInteriorProp(253441, "garage_decor_03");
                    mp.game.interior.refreshInterior(253441);
                    anteriorInterior = 131;
                    break;
                case 132:
                    mp.game.interior.enableInteriorProp(253441, "garage_decor_04");
                    mp.game.interior.refreshInterior(253441);
                    anteriorInterior = 132;
                    break;
                case 133:
                    mp.game.streaming.requestIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_");
                    mp.game.interior.enableInteriorProp(260353, "set_tint_shell");
                    mp.game.interior.enableInteriorProp(260353, "set_modarea");
                    mp.game.interior.enableInteriorProp(260353, "set_office_basic");
                    mp.game.interior.enableInteriorProp(260353, "office_blocker_set");
                    mp.game.interior.enableInteriorProp(260353, "set_floor_1");
                    mp.game.interior.enableInteriorProp(260353, "set_lighting_hangar_a");
                    mp.game.invoke("0xC1F1920BAF281317", 260353, "set_tint_shell", 1);
                    mp.game.invoke("0xC1F1920BAF281317", 260353, "set_modarea", 1);
                    mp.game.invoke("0xC1F1920BAF281317", 260353, "set_office_basic", 1);
                    mp.game.interior.refreshInterior(260353);
                    anteriorInterior = 133;
                    break;
                case 134:
                    mp.game.interior.enableInteriorProp(253697, "garage_decor_01");
                    mp.game.interior.refreshInterior(253697);
                    anteriorInterior = 134;
                    break;
                case 135:
                    mp.game.interior.enableInteriorProp(253697, "garage_decor_02");
                    mp.game.interior.refreshInterior(253697);
                    anteriorInterior = 135;
                    break;
                case 136:
                    mp.game.interior.enableInteriorProp(253697, "garage_decor_03");
                    mp.game.interior.refreshInterior(253697);
                    anteriorInterior = 136;
                    break;
                case 137:
                    mp.game.interior.enableInteriorProp(253697, "garage_decor_04");
                    mp.game.interior.refreshInterior(253697);
                    anteriorInterior = 137;
                    break;
                case 173:
                    mp.game.streaming.requestIpl("interior_placement");
                    anteriorInterior = 173;
                    break;
                case 178:
                    mp.game.interior.enableInteriorProp(252673, "door_blocker");
                    mp.game.interior.refreshInterior(252673);
                    anteriorInterior = 178;
                    break;
                case 179:
                    mp.game.interior.enableInteriorProp(247041, "meth_lab_upgrade");
                    mp.game.interior.enableInteriorProp(247041, "meth_lab_production");
                    mp.game.interior.enableInteriorProp(247041, "meth_lab_security_high");
                    mp.game.interior.enableInteriorProp(247041, "meth_lab_setup");
                    mp.game.interior.refreshInterior(247041);
                    anteriorInterior = 179;
                    break;
                case 180:
                    mp.game.interior.enableInteriorProp(247297, "weed_upgrade_equip");
                    mp.game.interior.enableInteriorProp(247297, "weed_low_security");
                    mp.game.interior.enableInteriorProp(247297, "weed_security_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "weed_set_up");
                    mp.game.interior.enableInteriorProp(247297, "weed_chairs");
                    mp.game.interior.enableInteriorProp(247297, "weed_production");
                    mp.game.interior.enableInteriorProp(247297, "weed_drying");
                    mp.game.interior.enableInteriorProp(247297, "weed_hosea");
                    mp.game.interior.enableInteriorProp(247297, "weed_hoseb");
                    mp.game.interior.enableInteriorProp(247297, "weed_hosec");
                    mp.game.interior.enableInteriorProp(247297, "weed_hosed");
                    mp.game.interior.enableInteriorProp(247297, "weed_hosee");
                    mp.game.interior.enableInteriorProp(247297, "weed_hosef");
                    mp.game.interior.enableInteriorProp(247297, "weed_hoseg");
                    mp.game.interior.enableInteriorProp(247297, "weed_hoseh");
                    mp.game.interior.enableInteriorProp(247297, "weed_hosei");
                    mp.game.interior.enableInteriorProp(247297, "weed_growtha_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growtha_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growtha_stage3");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthb_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthb_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthb_stage3");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthc_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthc_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthc_stage3");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthd_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthd_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthd_stage3");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthe_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthe_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthe_stage3");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthf_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthf_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthf_stage3");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthg_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthg_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthg_stage3");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthh_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthh_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthh_stage3");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthi_stage1");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthi_stage2");
                    mp.game.interior.enableInteriorProp(247297, "weed_growthi_stage3");
                    mp.game.interior.enableInteriorProp(247297, "light_growtha_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growthb_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growthc_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growthd_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growthe_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growthf_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growthg_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growthh_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growthi_stage23_standard");
                    mp.game.interior.enableInteriorProp(247297, "light_growtha_stage23_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "light_growthb_stage23_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "light_growthc_stage23_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "light_growthd_stage23_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "light_growthe_stage23_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "light_growthf_stage23_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "light_growthg_stage23_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "light_growthh_stage23_upgrade");
                    mp.game.interior.enableInteriorProp(247297, "light_growthi_stage23_upgrade");
                    mp.game.interior.refreshInterior(247297);
                    anteriorInterior = 180;
                    break;
                case 181:
                    mp.game.interior.enableInteriorProp(247553, "set_up");
                    mp.game.interior.enableInteriorProp(247553, "security_low");
                    mp.game.interior.enableInteriorProp(247553, "security_high");
                    mp.game.interior.enableInteriorProp(247553, "equipment_upgrade");
                    mp.game.interior.enableInteriorProp(247553, "production_upgrade");
                    mp.game.interior.enableInteriorProp(247553, "coke_press_upgrade");
                    mp.game.interior.enableInteriorProp(247553, "table_equipment_upgrade");
                    mp.game.interior.enableInteriorProp(247553, "coke_cut_01");
                    mp.game.interior.enableInteriorProp(247553, "coke_cut_02");
                    mp.game.interior.enableInteriorProp(247553, "coke_cut_03");
                    mp.game.interior.enableInteriorProp(247553, "coke_cut_04");
                    mp.game.interior.enableInteriorProp(247553, "coke_cut_05");
                    mp.game.interior.refreshInterior(247553);
                    anteriorInterior = 181;
                    break;
                case 191:
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Style01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_equipment_setup");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_security_upgrade");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_style01_podium");
                    mp.game.interior.enableInteriorProp(271617, "int01_ba_lights_screen");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_Screen");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_bar_content");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_booze_01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_dj01");
                    mp.game.interior.enableInteriorProp(271617, "DJ_01_Lights_02");
                    mp.game.interior.enableInteriorProp(271617, "DJ_01_Lights_03");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_lightgrid_01");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_equipment_upgrade");
                    mp.game.interior.enableInteriorProp(271617, "Int01_ba_trad_lights");
                    mp.game.interior.refreshInterior(271617);
                    anteriorInterior = 191;
                    break;
                case 192:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_02");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_01");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 192;
                    break;
                case 193:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 193;
                    break;
                case 194:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_02");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 194;
                    break;
                case 195:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_01");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 195;
                    break;
                case 196:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_02");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 196;
                    break;
                case 197:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_03");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 197;
                    break;
                case 198:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_04");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 198;
                    break;
                case 199:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_05");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 199;
                    break;
                case 200:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_06");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 200;
                    break;
                case 201:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_07");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 201;
                    break;
                case 202:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_08");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 202;
                    break;
                case 203:
                    mp.game.interior.enableInteriorProp(246273, "Walls_01");
                    mp.game.interior.enableInteriorProp(246273, "Furnishings_01");
                    mp.game.interior.enableInteriorProp(246273, "Decorative_02");
                    mp.game.interior.enableInteriorProp(246273, "Gun_Locker");
                    mp.game.interior.enableInteriorProp(246273, "Mural_09");
                    mp.game.interior.refreshInterior(246273);
                    anteriorInterior = 203;
                    break;
                case 204:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_02b");
                    mp.game.interior.enableInteriorProp(237313, "office_chairs");
                    mp.game.interior.refreshInterior(237313);
                    anteriorInterior = 204;
                    break;
                case 205:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_02c");
                    mp.game.interior.enableInteriorProp(237569, "office_chairs");
                    mp.game.interior.refreshInterior(237569);
                    anteriorInterior = 205;
                    break;
                case 206:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_02a");
                    mp.game.interior.enableInteriorProp(237057, "office_chairs");
                    mp.game.interior.refreshInterior(237057);
                    anteriorInterior = 206;
                    break;
                case 207:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_01a");
                    mp.game.interior.enableInteriorProp(236289, "office_chairs");
                    mp.game.interior.refreshInterior(236289);
                    anteriorInterior = 207;
                    break;
                case 208:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_01b");
                    mp.game.interior.enableInteriorProp(236545, "office_chairs");
                    mp.game.interior.refreshInterior(236545);
                    anteriorInterior = 208;
                    break;
                case 209:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_01c");
                    mp.game.interior.enableInteriorProp(236801, "office_chairs");
                    mp.game.interior.refreshInterior(236801);
                    anteriorInterior = 209;
                    break;
                case 210:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_03a");
                    mp.game.interior.enableInteriorProp(237825, "office_chairs");
                    mp.game.interior.refreshInterior(237825);
                    anteriorInterior = 210;
                    break;
                case 211:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_03b");
                    mp.game.interior.enableInteriorProp(238081, "office_chairs");
                    mp.game.interior.refreshInterior(238081);
                    anteriorInterior = 211;
                    break;
                case 212:
                    mp.game.streaming.requestIpl("ex_dt1_02_office_03c");
                    mp.game.interior.enableInteriorProp(238337, "office_chairs");
                    mp.game.interior.refreshInterior(238337);
                    anteriorInterior = 212;
                    break;
                case 213:
                    mp.game.interior.enableInteriorProp(246785, "set_up");
                    mp.game.interior.enableInteriorProp(246785, "production");
                    mp.game.interior.enableInteriorProp(246785, "interior_upgrade");
                    mp.game.interior.enableInteriorProp(246785, "equipment_upgrade");
                    mp.game.interior.enableInteriorProp(246785, "security_high");
    
                    mp.game.interior.refreshInterior(246785);
                    anteriorInterior = 213;
                    break;
                case 214:
                    mp.game.interior.disableInteriorProp(7170, "shutter_open");
                    mp.game.interior.enableInteriorProp(7170, "shutter_closed");
                    mp.game.interior.refreshInterior(7170);
                    anteriorInterior = 214;
                    break;
                case 216:
                    mp.game.streaming.requestIpl("apa_v_mp_h_01_a");
                    anteriorInterior = 216;
                    break;
                case 217:
                    mp.game.streaming.requestIpl("apa_v_mp_h_02_a");
                    anteriorInterior = 217;
                    break;
                case 218:
                    mp.game.streaming.requestIpl("apa_v_mp_h_03_a");
                    anteriorInterior = 218;
                    break;
                case 219:
                    mp.game.streaming.requestIpl("apa_v_mp_h_04_a");
                    anteriorInterior = 219;
                    break;
                case 220:
                    mp.game.streaming.requestIpl("apa_v_mp_h_05_a");
                    anteriorInterior = 220;
                    break;
                case 221:
                    mp.game.streaming.requestIpl("apa_v_mp_h_06_a");
                    anteriorInterior = 221;
                    break;
                case 222:
                    mp.game.streaming.requestIpl("apa_v_mp_h_07_a");
                    anteriorInterior = 222;
                    break;
                case 223:
                    mp.game.streaming.requestIpl("apa_v_mp_h_08_a");
                    anteriorInterior = 223;
                    break;
                case 227: 
					mp.game.interior.enableInteriorProp(281089, "dj_01_lights_01");
					mp.game.interior.enableInteriorProp(281089, "dj_01_lights_02");
					mp.game.interior.enableInteriorProp(281089, "dj_01_lights_03");
					mp.game.interior.enableInteriorProp(281089, "dj_01_lights_04");
					mp.game.interior.enableInteriorProp(281089, "dint01_ba_bar_content");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_dj_keinemusik");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_equipment_setup");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_equipment_upgrade");
					mp.game.interior.enableInteriorProp(281089, "dint01_ba_style02_podium");
					mp.game.interior.refreshInterior(281089);
					anteriorInterior = 227;
					break;
                case 229:
                    mp.game.streaming.requestIpl("electronica_ymap");
                    anteriorInterior = 229;
                    break;
				case 241:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_1");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 241;
					break;
				case 231:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_2");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 231;
					break;
				case 232:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_3");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 232;
					break;
				case 233:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_4");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 233;
					break;
				case 234:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_5");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 234;
					break;
				case 235:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_6");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 235;
					break;
				case 236:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_7");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 236;
					break;
				case 237:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_8");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 237;
					break;
				case 238:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_0_tuner_mod_garage_milo_");
					mp.game.interior.enableInteriorProp(285953, "entity_set_style_9");
					mp.game.interior.enableInteriorProp(285953, "entity_set_bedroom");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cabinets");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_cutscene");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_default");
					mp.game.interior.enableInteriorProp(285953, "entity_set_car_lift_purchase");
					mp.game.interior.enableInteriorProp(285953, "entity_set_cut_seats");
					mp.game.interior.enableInteriorProp(285953, "entity_set_laptop");
					mp.game.interior.enableInteriorProp(285953, "entity_set_lightbox");
					mp.game.interior.enableInteriorProp(285953, "entity_set_tints");
					mp.game.interior.refreshInterior(285953);
					anteriorInterior = 238;
					break;
				case 239:
					mp.game.interior.enableInteriorProp(286209, "entity_set_test_lights");
					mp.game.interior.enableInteriorProp(286209, "entity_set_test_lights_cheap");
					mp.game.interior.enableInteriorProp(286209, "entity_set_time_trial");
					mp.game.interior.refreshInterior(286209);
					anteriorInterior = 239;

                    objeto1 = mp.objects.new(mp.game.joaat("tr_prop_tr_gate_r_01a"), new mp.Vector3(-2148.653, 1110.646, 29.48058), { rotation: new mp.Vector3(0, 0, -90), alpha: 255, dimension: player_local.dimension });
                    objeto2 = mp.objects.new(mp.game.joaat("tr_prop_tr_gate_l_01a"), new mp.Vector3(-2148.653, 1101.464, 29.48058), { rotation: new mp.Vector3(0, 0, -90), alpha: 255, dimension: player_local.dimension });
					break;
				case 240:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_2_tuner_methlab_1_milo_");
					mp.game.interior.enableInteriorProp(284673, "tintable_walls");
                    mp.game.invoke('0xC1F1920BAF281317', 284673, "tintable_walls", 0);
					mp.game.interior.refreshInterior(284673);
					anteriorInterior = 240;
					break;
				case 242:
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
					mp.game.interior.enableInteriorProp(278273, "entity_set_floor_option_01");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_neon_option_01");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_option_01");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_streetx4");
					mp.game.interior.enableInteriorProp(278273, "entity_set_constant_geometry");
					mp.game.interior.enableInteriorProp(278273, "entity_set_big_screen");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
					mp.game.interior.refreshInterior(278273);
					anteriorInterior = 242;
					break;
				case 243:
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_ceiling_beams");
					mp.game.interior.enableInteriorProp(278273, "entity_set_floor_option_02");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_neon_option_02");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_option_02");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_streetx4");
					mp.game.interior.enableInteriorProp(278273, "entity_set_constant_geometry");
					mp.game.interior.enableInteriorProp(278273, "entity_set_big_screen");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
					mp.game.interior.refreshInterior(278273);
					anteriorInterior = 243;
					break;
				case 244:
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
					mp.game.interior.enableInteriorProp(278273, "entity_set_floor_option_03");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_neon_option_03");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_option_03");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_streetx4");
					mp.game.interior.enableInteriorProp(278273, "entity_set_constant_geometry");
					mp.game.interior.enableInteriorProp(278273, "entity_set_big_screen");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
					mp.game.interior.refreshInterior(278273);
					anteriorInterior = 244;
					break;
				case 245:
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
					mp.game.interior.enableInteriorProp(278273, "entity_set_floor_option_04");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_neon_option_04");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_option_04");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_streetx4");
					mp.game.interior.enableInteriorProp(278273, "entity_set_constant_geometry");
					mp.game.interior.enableInteriorProp(278273, "entity_set_big_screen");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
					mp.game.interior.refreshInterior(278273);
					anteriorInterior = 245;
					break;
				case 246:
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
					mp.game.interior.enableInteriorProp(278273, "entity_set_floor_option_05");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_neon_option_05");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_option_05");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_streetx4");
					mp.game.interior.enableInteriorProp(278273, "entity_set_constant_geometry");
					mp.game.interior.enableInteriorProp(278273, "entity_set_big_screen");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
					mp.game.interior.refreshInterior(278273);
					anteriorInterior = 246;
					break;
				case 247:
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
					mp.game.interior.enableInteriorProp(278273, "entity_set_floor_option_06");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_neon_option_06");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_option_06");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_streetx4");
					mp.game.interior.enableInteriorProp(278273, "entity_set_constant_geometry");
					mp.game.interior.enableInteriorProp(278273, "entity_set_big_screen");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
					mp.game.interior.refreshInterior(278273);
					anteriorInterior = 247;
					break;
				case 248:
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
					mp.game.interior.enableInteriorProp(278273, "entity_set_floor_option_07");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_neon_option_07");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_option_07");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_streetx4");
					mp.game.interior.enableInteriorProp(278273, "entity_set_constant_geometry");
					mp.game.interior.enableInteriorProp(278273, "entity_set_big_screen");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
					mp.game.interior.refreshInterior(278273);
					anteriorInterior = 248;
					break;
				case 249:
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_ceiling_flat");
					mp.game.interior.enableInteriorProp(278273, "entity_set_floor_option_08");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_neon_option_08");
					mp.game.interior.enableInteriorProp(278273, "entity_set_mural_option_08");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_streetx4");
					mp.game.interior.enableInteriorProp(278273, "entity_set_constant_geometry");
					mp.game.interior.enableInteriorProp(278273, "entity_set_big_screen");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_brawler");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_cabs");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_claw");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_gunner");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_king");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_love");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_monkey");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_patriot");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_racer");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_retro");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_strife");
					mp.game.interior.enableInteriorProp(278273, "entity_set_arcade_set_trophy_teller");
					mp.game.interior.refreshInterior(278273);
					anteriorInterior = 249;
					break;
				case 250:
					mp.game.interior.enableInteriorProp(281089, "dj_02_lights_01");
					mp.game.interior.enableInteriorProp(281089, "dj_02_lights_02");
					mp.game.interior.enableInteriorProp(281089, "dj_02_lights_03");
					mp.game.interior.enableInteriorProp(281089, "dj_02_lights_04");
					mp.game.interior.enableInteriorProp(281089, "dint01_ba_bar_content");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_dj_moodyman");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_equipment_setup");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_equipment_upgrade");
					mp.game.interior.enableInteriorProp(281089, "dint01_ba_style02_podium");
					mp.game.interior.refreshInterior(281089);
					anteriorInterior = 250;
					break;
				case 251:
					mp.game.interior.enableInteriorProp(281089, "dj_03_lights_01");
					mp.game.interior.enableInteriorProp(281089, "dj_03_lights_02");
					mp.game.interior.enableInteriorProp(281089, "dj_03_lights_03");
					mp.game.interior.enableInteriorProp(281089, "dj_03_lights_04");
					mp.game.interior.enableInteriorProp(281089, "dint01_ba_bar_content");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_dj_palms_trax");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_equipment_setup");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_equipment_upgrade");
					mp.game.interior.enableInteriorProp(281089, "dint01_ba_style02_podium");
					mp.game.interior.refreshInterior(281089);
					anteriorInterior = 251;
					break;
				case 252:
					mp.game.interior.enableInteriorProp(281089, "dj_04_lights_01");
					mp.game.interior.enableInteriorProp(281089, "dj_04_lights_02");
					mp.game.interior.enableInteriorProp(281089, "dj_04_lights_03");
					mp.game.interior.enableInteriorProp(281089, "dj_04_lights_04");
					mp.game.interior.enableInteriorProp(281089, "dint01_ba_bar_content");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_dj_palms_trax");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_equipment_setup");
					mp.game.interior.enableInteriorProp(281089, "int01_ba_equipment_upgrade");
					mp.game.interior.enableInteriorProp(281089, "dint01_ba_style02_podium");
					mp.game.interior.refreshInterior(281089);
					anteriorInterior = 252;
					break;
                case 253:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_3_tuner_methlab_1_milo_");
                    mp.game.interior.enableInteriorProp(285441, "tintable_walls");
                    mp.game.invoke('0xC1F1920BAF281317', 285441, "tintable_walls", 1);
                    mp.game.interior.refreshInterior(285441);
                    anteriorInterior = 253;
                    break;
                case 254:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_4_tuner_methlab_1_milo_");
                    mp.game.interior.enableInteriorProp(285185, "tintable_walls");
                    mp.game.invoke('0xC1F1920BAF281317', 285185, "tintable_walls", 2);
                    mp.game.interior.refreshInterior(285185);
                    anteriorInterior = 254;
                    break;
                case 255:
                    mp.game.streaming.requestIpl("tr_int_placement_tr_interior_5_tuner_methlab_1_milo_");
                    mp.game.interior.enableInteriorProp(284929, "tintable_walls");
                    mp.game.invoke('0xC1F1920BAF281317', 284929, "tintable_walls", 3);
                    mp.game.interior.refreshInterior(284929);
                    anteriorInterior = 255;
                    break;
                case 258:
                    mp.game.streaming.requestIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                        "Set_Pent_Tint_Shell",
                        "Set_Pent_Pattern_01",
                        "Set_Pent_Clutter_01",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                        var propName = phPropList_2[_a];
                        mp.game.interior.enableInteriorProp(phIntID, propName);
                        mp.game.invoke("0xC1F1920BAF281317", phIntID, propName, 1); // _SET_INTERIOR_PROP_COLOR
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 985.7617, 64.95393, 116.2652, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"),  985.7617, 64.95393, 116.2652, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 984.7018, 63.25783, 116.2652, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 984.7018, 63.25783, 116.2652, true, 0.0, false);
  
                    anteriorInterior = 258;
                    break;
                case 259:
                    mp.game.streaming.requestIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                        "Set_Pent_Tint_Shell",
                        "Set_Pent_Pattern_01",
                        "Set_Pent_Clutter_01",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                        var propName = phPropList_2[_a];
                        mp.game.interior.enableInteriorProp(phIntID, propName);
                        mp.game.invoke("0xC1F1920BAF281317", phIntID, propName, 1); // _SET_INTERIOR_PROP_COLOR
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 985.7617, 64.95393, 116.2652, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"),  985.7617, 64.95393, 116.2652, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 984.7018, 63.25783, 116.2652, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 984.7018, 63.25783, 116.2652, true, 0.0, false);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 981.1838, 61.14946, 116.2874, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"),  981.1838, 61.14946, 116.2874, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 979.4877, 62.20929, 116.2874, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 979.4877, 62.20929, 116.2874, true, 0.0, false);
  
                    anteriorInterior = 259;
                    break;
                case 260:
                    mp.game.streaming.requestIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                        "Set_Pent_Tint_Shell",
                        "Set_Pent_Pattern_01",
                        "Set_Pent_Clutter_01",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                        var propName = phPropList_2[_a];
                        mp.game.interior.enableInteriorProp(phIntID, propName);
                        mp.game.invoke("0xC1F1920BAF281317", phIntID, propName, 1); // _SET_INTERIOR_PROP_COLOR
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 981.1838, 61.14946, 116.2874, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"),  981.1838, 61.14946, 116.2874, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 979.4877, 62.20929, 116.2874, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_ddl_01a"), 979.4877, 62.20929, 116.2874, true, 0.0, false);
  
                    anteriorInterior = 260;
                    break;
                case 261:
                    mp.game.interior.enableInteriorProp(272129, "Int_03_ba_Tint");
                    mp.game.interior.enableInteriorProp(272129, "Int_03_ba_weapons_mod");
                    mp.game.interior.enableInteriorProp(272129, "Int_03_ba_bikemod");
                    mp.game.interior.enableInteriorProp(272129, "Int_03_ba_Light_Rig1");
                    mp.game.invoke('0xC1F1920BAF281317', 272129, "Int_03_ba_Tint", 1);
                    mp.game.invoke('0xC1F1920BAF281317', 272129, "Int_03_ba_weapons_mod", 1);
                    mp.game.invoke('0xC1F1920BAF281317', 272129, "Int_03_ba_bikemod", 1);
                    mp.game.interior.refreshInterior(272129);
                    anteriorInterior = 261;
                    break;
                case 262:
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -597.9043, -928.5729, 24.01972, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -597.9043, -928.5729, 24.01972, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -597.9066, -931.1725, 24.01972, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -597.9066, -931.1725, 24.01972, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -576.0771, -939.5714, 24.02606, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -576.0771, -939.5714, 24.02606, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -573.478, -939.5773, 24.02606, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -573.478, -939.5773, 24.02606, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -585.4329, -913.0152, 24.02606, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -585.4329, -913.0152, 24.02606, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_doorwn1"), -588.0329, -913.0066, 24.02606, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_doorwn1"), -588.0329, -913.0066, 24.02606, true, 0.0, false);

                    anteriorInterior = 262;
                    break;
                        
                case 263:
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("apa_v_ilev_fh_bedrmdoor"), -579.6191, -919.2062, 28.30607, true, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("apa_v_ilev_fh_bedrmdoor"), -579.6191, -919.2062, 28.30607, true, 0.0, false);

                    anteriorInterior = 263;
                    break;
    
                case 264:
					mp.game.interior.enableInteriorProp(286209, "entity_set_test_lights");
					mp.game.interior.enableInteriorProp(286209, "entity_set_test_lights_cheap");
					mp.game.interior.enableInteriorProp(286209, "entity_set_time_trial");
                    mp.game.interior.enableInteriorProp(286209, "entity_set_meet_lights");
					mp.game.interior.enableInteriorProp(286209, "entity_set_meet_lights_cheap");
					mp.game.interior.refreshInterior(286209);
					anteriorInterior = 264;

                    objeto1 = mp.objects.new(mp.game.joaat("tr_prop_tr_gate_r_01a"), new mp.Vector3(-2148.653, 1110.646, 29.48058), { rotation: new mp.Vector3(0, 0, -90), alpha: 255, dimension: player_local.dimension });
                    objeto2 = mp.objects.new(mp.game.joaat("tr_prop_tr_gate_l_01a"), new mp.Vector3(-2148.653, 1101.464, 29.48058), { rotation: new mp.Vector3(0, 0, -90), alpha: 255, dimension: player_local.dimension });
					break;  
                case 265:
					mp.game.interior.enableInteriorProp(286209, "entity_set_test_lights");
					mp.game.interior.enableInteriorProp(286209, "entity_set_test_lights_cheap");
					mp.game.interior.enableInteriorProp(286209, "entity_set_time_trial");
                    mp.game.interior.enableInteriorProp(286209, "entity_set_meet_lights");
					mp.game.interior.enableInteriorProp(286209, "entity_set_meet_lights_cheap");
					mp.game.interior.refreshInterior(286209);
					anteriorInterior = 265;
					break;
                case 266:
                    mp.game.streaming.requestIpl("ch_int_placement_ch_interior_4_dlc_casino_hotel_milo_");
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("ch_prop_ch_service_door_02a"), 2509.743, -266.5509, -38.965, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ch_prop_ch_service_door_02a"),  2509.743, -266.5509, -38.965, true, 0.0, false);
                    anteriorInterior = 266;
                    break;
                case 267:
                    mp.game.interior.enableInteriorProp(247809, "counterfeit_setup");
                    mp.game.interior.enableInteriorProp(247809, "counterfeit_upgrade_equip");
                    mp.game.interior.enableInteriorProp(247809, "counterfeit_low_security");
                    mp.game.interior.enableInteriorProp(247809, "money_cutter");
                    mp.game.interior.enableInteriorProp(247809, "dryera_on");
                    mp.game.interior.enableInteriorProp(247809, "dryerb_on");
                    mp.game.interior.enableInteriorProp(247809, "dryerc_on");
                    mp.game.interior.enableInteriorProp(247809, "dryerd_open");
                    mp.game.interior.enableInteriorProp(247809, "counterfeit_cashpile100a");
                    mp.game.interior.enableInteriorProp(247809, "counterfeit_cashpile100b");
                    mp.game.interior.enableInteriorProp(247809, "counterfeit_cashpile100c");
                    mp.game.interior.enableInteriorProp(247809, "counterfeit_cashpile100d");
                    mp.game.interior.refreshInterior(247809);
                    anteriorInterior = 267;
                    break;
                case 268:
                    mp.game.streaming.requestIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                    "Set_Pent_Tint_Shell",
                    "Set_Pent_Spa_Bar_Closed",
                    "Set_Pent_SPA_BLOCKER",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                        var propName = phPropList_2[_a];
                        mp.game.interior.enableInteriorProp(phIntID, propName);
                        mp.game.invoke("0xC1F1920BAF281317", phIntID, propName, 1); // _SET_INTERIOR_PROP_COLOR
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 958.5333, 24.80821, 116.81, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"),  958.5333, 24.80821, 116.81, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, false);

                    anteriorInterior = 268;
                    break;
                       
                case 269:
                    mp.game.streaming.requestIpl("vw_casino_penthouse");
                    //let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                    var phIntID = 274689;
                    var phPropList = [
                    "Set_Pent_Tint_Shell",
                    "Set_Pent_Media_Bar_Closed",
                    "Set_Pent_SPA_BLOCKER",
                    ];
                    for (var _a = 0, phPropList_2 = phPropList; _a < phPropList_2.length; _a++) {
                    var propName = phPropList_2[_a];
                    mp.game.interior.enableInteriorProp(phIntID, propName);
                    mp.game.invoke("0xC1F1920BAF281317", phIntID, propName, 1); // _SET_INTERIOR_PROP_COLOR
                    }
                    mp.game.interior.refreshInterior(phIntID);

                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 958.5333, 24.80821, 116.81, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"),  958.5333, 24.80821, 116.81, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_lounge_01a"), 956.444, 26.11376, 116.81, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 957.8351, 39.79839, 116.6799, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_slide_01a"), 959.8186, 38.55892, 116.6799, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 960.5483, 26.61708, 116.2641, true, 0.0, false);
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, 50.0, 0.0);    
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("vw_prop_vw_door_dd_01a"), 959.4884, 24.92099, 116.2641, true, 0.0, false);

                    anteriorInterior = 269;
                    break;
                case 270:
                    mp.game.streaming.requestIpl("vw_casino_garage");
                    anteriorInterior = 270;
                    break;
                case 272:
                    mp.game.streaming.requestIpl("prologue06_int");
                    anteriorInterior = 272;
                    break;
                case 274:
                    mp.game.streaming.requestIpl("ch_int_placement_ch_interior_3_dlc_casino_back_milo_");
                    anteriorInterior = 274;
                    break;
                case 275:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l1"), -430.1948, 262.37326, 82.004875, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r1"), -429.74622, 262.28632, 82.004875, true, 0.0, false); 
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l3"), -419.61624, 268.1909, 82.1945, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r3"), -420.07773, 268.22012, 82.194496, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l2"), -426.74677, 263.1455, 82.19415, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r2"), -426.75085, 263.82108, 82.19415, true, 0.0, false); 
                    // mp.game.streaming.requestIpl("gta5rp_comedyclub_milo_");
                    anteriorInterior = 275;
                    break; 
                case 276:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -429.66473, 276.19168, 82.19449, true, 0.0, false); 
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_4"), -425.12198, 283.8309, 82.19441, true, 0.0, false);
                    // mp.game.streaming.requestIpl("gta5rp_comedyclub_milo_");
                    anteriorInterior = 276;
                    break; 
                case 277:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -439.6111, 277.46243, 83.67462, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01b"), -438.618, 264.6551, 83.69353, true, 0.0, false); 
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01b"), -438.36417, 265.84418, 84.69354, true, 0.0, false);
                    // mp.game.streaming.requestIpl("gta5rp_comedyclub_milo_");
                    anteriorInterior = 277;
                    break;
                case 278:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 299.57413, 205.17848, 104.37239, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 300.05345, 204.42105, 103.37242, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 301.21915, 203.57991, 104.37232, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 302.0188, 203.37553, 103.37242, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 303.4928, 203.1843, 104.37241, true, 0.0, false);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 304.5032, 203.26543, 103.37242, true, 0.0, false);
                    // mp.game.streaming.requestIpl("gta5rp_comedyclub_milo_");
                    anteriorInterior = 278;
                    break;
                case 279:
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("cls_cs_door"), 1088.8549, -777.3906, 57.44279, true, 0.0, false);
                    // mp.game.streaming.requestIpl("int_shop1_milo_");
                    anteriorInterior = 279;
                    break;
                case 280:
                    mp.game.streaming.requestIpl("h4_islandx_mansion_office");
                    anteriorInterior = 280;
                    break;
                case 281:
                    mp.game.streaming.requestIpl("h4_islandx_mansion_vault");
                    anteriorInterior = 281;
                    break;
                case 282:
                    mp.game.streaming.requestIpl("trevorstrailertrash");
                    anteriorInterior = 282;
                    break;
                case 283:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Lights");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 283;
                    break;
                //case 284:
                    //mp.game.object.doorControl(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_l_01a"), -1011.854, -81.56206, -99.2532, true, 0.0, 50.0, 0.0);    
                    //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_l_01a"), -1011.854, -81.56206, -99.2532, true, 0.0, false);
                    //mp.game.object.doorControl(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_r_01a"), -1009.454, -81.56206, -99.2532, true, 0.0, 50.0, 0.0);    
                    //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_r_01a"), -1009.454, -81.56206, -99.2532, true, 0.0, false);
                    //anteriorInterior = 284;
                    //break;
                case 288:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 288;
                    break;
                case 289:                           
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_1");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 289;
                    break;
                case 290:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_2");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 290;
                    break;
                case 291:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_3");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 291;
                    break;
                case 292:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_4");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 292;
                    break;
                case 293:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_5");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 293;
                    break;
                case 294:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_6");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 294;
                    break;
                case 295:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_7");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 295;
                    break;
                case 296:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_8");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 296;
                    break;
                case 297:
                    mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Armoury");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Tint_AG");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Player_Seats");
                    mp.game.interior.enableInteriorProp(287745, "Entity_Set_Wpaper_9");
                    mp.game.interior.refreshInterior(287745);
                    anteriorInterior = 297;
                    break;
                //case 298:
                    //mp.game.object.doorControl(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_l_01a"), -1011.854, -81.56206, -99.2532, true, 0.0, 50.0, 0.0);    
                    //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_l_01a"), -1011.854, -81.56206, -99.2532, true, 0.0, false);
                    //mp.game.object.doorControl(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_r_01a"), -1009.454, -81.56206, -99.2532, true, 0.0, 50.0, 0.0);    
                    //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("sf_prop_sf_door_stat_r_01a"), -1009.454, -81.56206, -99.2532, true, 0.0, false);
                    //anteriorInterior = 298;
                    //break;
                case 299:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 299;
                    break;
                case 300:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_01");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 300;
                    break;
                case 301:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_02");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 301;
                    break;
                case 302:                               
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_03");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 302;
                    break;
                case 303:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_04");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 303;
                    break;
                case 304:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_05");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 304;
                    break;
                case 305:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_06");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 305;
                    break;
                case 306:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_07");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 306;
                    break;
                case 307:
                    mp.game.streaming.requestIpl("ba_int_placement_ba_interior_1_dlc_int_02_ba_milo_");
                    mp.game.interior.enableInteriorProp(271873, "Int02_ba_garage_blocker");
                    mp.game.interior.enableInteriorProp(271873, "Int02_ba_equipment_upgrade");
                    mp.game.interior.refreshInterior(271873);
                    anteriorInterior = 308;
                    break;
                case 308:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_08");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 308;
                    break;
                case 309:
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Workshop_Wall");
                    mp.game.interior.enableInteriorProp(286721, "Entity_Set_Wallpaper_09");
                    mp.game.interior.refreshInterior(286721);
                    anteriorInterior = 309;
                    break;
                case 310:
                    mp.game.streaming.requestIpl("ba_int_placement_ba_interior_1_dlc_int_02_ba_milo_");
                    mp.game.interior.enableInteriorProp(271873, "Int02_ba_garage_blocker");
                    mp.game.interior.enableInteriorProp(271873, "Int02_ba_equipment_upgrade");
                    mp.game.interior.enableInteriorProp(271873, "Int02_ba_truckmod");
                    mp.game.interior.refreshInterior(271873);
                    anteriorInterior = 310;
                    break;
                case 311:
                    mp.game.streaming.requestIpl("gr_grdlc_interior_placement_interior_1_grdlc_int_02_milo_");
                    mp.game.interior.refreshInterior(258561);
                    anteriorInterior = 311;
                    break;
                default:
                    break;
            }
        }
    } catch (e) {
        if (adminservicio) {
            mp.gui.chat.push("Error interior: " + e);
        }
    }
});
mp.events.add({
    "agregar_prop": function (interior, prop) {
        mp.game.interior.enableInteriorProp(interior, prop);
        mp.game.interior.refreshInterior(interior);
    },
    "quitar_prop": function (interior, prop) {
        mp.game.interior.disableInteriorProp(interior, prop);
        mp.game.interior.refreshInterior(interior);
    },
    "info_prop_interior": function (interior, prop, estado) {
        if (estado) {
            mp.game.interior.enableInteriorProp(interior, prop);
            mp.game.interior.refreshInterior(interior);
        }
        else {
            mp.game.interior.disableInteriorProp(interior, prop);
            mp.game.interior.refreshInterior(interior);
        }
    },
    "cargar_props_interior": function (array) {
        try {
            var props_array = JSON.parse(array);
            for (var i = 0; i < props_array.length; i += 3) {
                if (props_array[i + 2])
                    mp.game.interior.enableInteriorProp(props_array[i], props_array[i + 1]);
                else
                    mp.game.interior.disableInteriorProp(props_array[i], props_array[i + 1]);
                mp.game.interior.refreshInterior(props_array[i]);
            }
        }catch(e) {}
    },
});

//Bunker
mp.game.interior.enableInteriorProp(258561, "bunker_style_a");
mp.game.interior.enableInteriorProp(258561, "upgrade_bunker_set");
mp.game.interior.enableInteriorProp(258561, "security_upgrade");
mp.game.interior.enableInteriorProp(258561, "office_blocker_set");
mp.game.interior.enableInteriorProp(258561, "gun_locker_upgrade");
mp.game.interior.enableInteriorProp(258561, "gun_range_lights");
mp.game.interior.enableInteriorProp(258561, "Gun_schematic_set");
mp.game.interior.refreshInterior(258561);
mp.game.interior.enableInteriorProp(171777, "swap_sofa_A");
mp.game.interior.refreshInterior(171777);
//Casa de michael
mp.game.interior.enableInteriorProp(166657, "V_Michael_M_items");
mp.game.interior.enableInteriorProp(166657, "V_Michael_D_items");
mp.game.interior.enableInteriorProp(166657, "V_Michael_S_items");
mp.game.interior.enableInteriorProp(166657, "V_Michael_L_Items");
mp.game.interior.enableInteriorProp(166657, "V_Michael_bed_tidy");
mp.game.interior.refreshInterior(166657);

//Motorsport
mp.game.interior.enableInteriorProp(7170, "csr_beforeMission");
mp.game.interior.enableInteriorProp(7170, "shutter_open");
mp.game.interior.refreshInterior(7170);

//Casino
mp.game.streaming.requestIpl("hei_dlc_windows_casino");
mp.game.streaming.requestIpl("hei_dlc_casino_door");
mp.game.streaming.requestIpl("vw_dlc_casino_door");
mp.game.streaming.requestIpl("hei_dlc_casino_aircon");

// Car meet
mp.game.streaming.requestIpl("tr_tuner_meetup");


//Airsoft Drift UncleJust 1010.13257, -3209.345, -12.282315
//Test kenshin 120834
let esferaDriftUncle = mp.colshapes.newSphere(1010.13257, -3209.345, -12.282315, 250.0);

mp.events.add("playerEnterColshape", (colshape) => {
    if (colshape == esferaDriftUncle) {
        mp.game.interior.enableInteriorProp(132098, "set1");
        mp.game.interior.enableInteriorProp(132098, "set2");
        mp.game.interior.enableInteriorProp(132098, "set3");
        mp.game.interior.enableInteriorProp(132098, "set4");
        mp.game.interior.enableInteriorProp(132098, "set5");
        mp.game.interior.enableInteriorProp(132098, "set6");
        mp.game.interior.enableInteriorProp(132098, "set7");
        mp.game.interior.enableInteriorProp(132098, "set8");
        mp.game.interior.enableInteriorProp(132098, "set9");
        mp.game.interior.refreshInterior(132098);
    }
});

mp.events.add("playerExitColshape", (colshape) => {
    if (colshape == esferaDriftUncle) {
        mp.game.interior.disableInteriorProp(132098, "set1");
        mp.game.interior.disableInteriorProp(132098, "set2");
        mp.game.interior.disableInteriorProp(132098, "set3");
        mp.game.interior.disableInteriorProp(132098, "set4");
        mp.game.interior.disableInteriorProp(132098, "set5");
        mp.game.interior.disableInteriorProp(132098, "set6");
        mp.game.interior.disableInteriorProp(132098, "set7");
        mp.game.interior.disableInteriorProp(132098, "set8");
        mp.game.interior.disableInteriorProp(132098, "set9");
        mp.game.interior.refreshInterior(132098);
    }
});

// Actualizamos la distancia de vision del textlabel de interiores segun si entra o sale de vehiculos
mp.events.add("playerLeaveVehicle", () => {
    if (texlabelSalida != null) {
        if (mp.labels.exists(texlabelSalida)) {
            texlabelSalida.drawDistance = 2.5;
        }
    }
});

mp.events.add("playerEnterVehicle", (vehiculo, seat) => {
    if (texlabelSalida != null) {
        if (mp.labels.exists(texlabelSalida)) {
            texlabelSalida.drawDistance = 5.0;
        }
    }
});


//Aracde 278273

//254209 MOD GARAGE CEO 1
//253697 MOD GARAGE CEO 2
//253953 MOD GARAGE CEO 3
//Michael casa 166401
//Michael casa 166657

//Arenawar 1 272385
//Arenawar 2 272641
//Arenawar 3 272897
//Arenawar 4 273153

//Maze Bank Arena (Forma default)
/*mp.game.interior.enableInteriorProp(272385, "Set_Crowd_A");
mp.game.interior.enableInteriorProp(272385, "Set_Crowd_B");
mp.game.interior.enableInteriorProp(272385, "Set_Crowd_C");
mp.game.interior.enableInteriorProp(272385, "Set_Crowd_D");
mp.game.interior.enableInteriorProp(272385, "Set_Dystopian_06");
mp.game.interior.enableInteriorProp(272385, "Set_Pit_Fence_Oval");
mp.game.interior.enableInteriorProp(272385, "Set_Lights_night");
mp.game.interior.refreshInterior(272385);*/

//const arcadeId = mp.game.interior.getInteriorAtCoordsWithType(2730.0, -380.0, -49.0, "ch_DLC_Arcade");
//const planRoomId = mp.game.interior.getInteriorAtCoordsWithType(2730.0, -380.0, -49.0, "ch_DLC_Plan");
//const propList = {
//    "arcade": [
//        "entity_set_arcade_set_derelict",
//        "entity_set_floor_option_01",
//        "entity_set_arcade_set_ceiling_mirror"
//    ],

//    "planRoom": [
//        "set_plan_bed",
//        "set_plan_garage",
//        "set_plan_setup",
//        "set_plan_scribbles",
//        "set_plan_computer",
//        "set_plan_arcade_x4",
//        "set_plan_plans",
//        "set_plan_casino",
//        "set_plan_keypad",
//        "set_plan_vault",
//        "set_plan_mechanic",
//        "set_plan_hacker",
//        "set_plan_weapons",
//        "Set_Plan_Vault_Laser",
//        "Set_Plan_Vault_Drill",
//        "Set_Plan_Electric_Drill",
//        "Set_Plan_Plastic_Explosives",
//        "Set_Plan_Hacking_Device",
//        "Set_Plan_Cockroaches",
//        "Set_Plan_Stealth_Outfits",
//        "Set_Plan_Gruppe_Sechs_Outfits",
//        "Set_Plan_Fireman_Helmet",
//        "Set_Plan_Drone_Parts",
//        "Set_Plan_Vault_KeyCard_01a",
//        "Set_Plan_Swipe_Card_01a",
//        "Set_Plan_Swipe_Card_01b"
//    ]
//};

//for (const [group, props] of Object.entries(propList)) {
//    for (const prop of props) {
//        mp.game.interior.enableInteriorProp(group === "arcade" ? arcadeId : planRoomId, prop);
//    }
//}

//mp.game.interior.refreshInterior(arcadeId);
//mp.game.interior.refreshInterior(planRoomId);

//CLUB nighclub perico 281089
//Car Meet 285697
//Tuner Garage 285953
//Penthouse 274689
}