{
/* Недостающие части IPL карты */

mp.game.streaming.requestIpl("ch1_02_open"); // Глитч открытого интерьера на пляже
mp.game.streaming.requestIpl("sp1_10_real_interior"); // открытый интерьер стадика
mp.game.streaming.requestIpl("sp1_10_real_interior_lod"); // открытый интерьер стадика
mp.game.streaming.requestIpl("ferris_finale_Anim"); // колесо обозрения на пляже
mp.game.streaming.requestIpl("gr_case6_bunkerclosed"); // закрытый бункер merryweather
mp.game.streaming.requestIpl("Coroner_Int_On"); // части интерьера больницы
mp.game.streaming.requestIpl("ex_dt1_02_office_02c"); // аркадиус
mp.game.streaming.requestIpl("imp_dt1_02_modgarage"); // аркадиус гараж

/* */

/* casino */

// Подгружаем недостающие части здания самого казино...
mp.game.streaming.requestIpl("hei_dlc_windows_casino"); // зеркальные окна на здании
mp.game.streaming.requestIpl("hei_dlc_casino_door"); // рамка двери
mp.game.streaming.requestIpl("vw_dlc_casino_door"); // сами двери
mp.game.streaming.requestIpl("hei_dlc_casino_aircon"); // кондиционер на крыше
mp.game.streaming.requestIpl("vw_casino_penthouse");
mp.game.streaming.requestIpl("bh1_47_joshhse_unburnt");
mp.game.streaming.requestIpl("bh1_47_joshhse_unburnt_lod");
mp.game.streaming.requestIpl("CanyonRvrShallow");
mp.game.streaming.requestIpl("ch1_02_open");
mp.game.streaming.requestIpl("Carwash_with_spinners");
mp.game.streaming.requestIpl("sp1_10_real_interior");
mp.game.streaming.requestIpl("sp1_10_real_interior_lod");
mp.game.streaming.requestIpl("ferris_finale_Anim");
mp.game.streaming.removeIpl("hei_bi_hw1_13_door");
mp.game.streaming.requestIpl("fiblobby");
mp.game.streaming.requestIpl("fiblobby_lod");
mp.game.streaming.requestIpl("apa_ss1_11_interior_v_rockclub_milo_");
mp.game.streaming.requestIpl("hei_sm_16_interior_v_bahama_milo_");
mp.game.streaming.requestIpl("hei_hw1_blimp_interior_v_comedy_milo_");
mp.game.streaming.requestIpl("gr_case6_bunkerclosed");
mp.game.streaming.requestIpl("ex_dt1_02_office_01b");

mp.game.streaming.requestIpl("gr_grdlc_int_02");
mp.game.streaming.requestIpl("gr_grdlc_int_01");
mp.game.streaming.requestIpl("grdlc_int_01_shell");
mp.game.streaming.requestIpl("gr_entrance_placement");
mp.game.streaming.requestIpl("gr_grdlc_interior_placement");
mp.game.streaming.requestIpl("gr_grdlc_interior_placement_interior_0_grdlc_int_01_milo_");
mp.game.streaming.requestIpl("gr_grdlc_interior_placement_interior_1_grdlc_int_02_milo_");

mp.game.streaming.requestIpl("gr_case0_bunkerclosed");
mp.game.streaming.requestIpl("gr_case1_bunkerclosed");
mp.game.streaming.requestIpl("gr_case2_bunkerclosed");
mp.game.streaming.requestIpl("gr_case3_bunkerclosed");
mp.game.streaming.requestIpl("gr_case4_bunkerclosed");
mp.game.streaming.requestIpl("gr_case5_bunkerclosed");
mp.game.streaming.requestIpl("gr_case6_bunkerclosed");
mp.game.streaming.requestIpl("gr_case7_bunkerclosed");
mp.game.streaming.requestIpl("gr_case8_bunkerclosed");
mp.game.streaming.requestIpl("gr_case9_bunkerclosed");
mp.game.streaming.requestIpl("gr_case10_bunkerclosed");
mp.game.streaming.requestIpl("gr_case11_bunkerclosed");

// ФИКС БОЛЬНИЦЫ В ЦЕНТРЕ ============================

mp.game.streaming.removeIpl("rc12b_fixed");
mp.game.streaming.removeIpl("rc12b_destroyed");
mp.game.streaming.removeIpl("rc12b_default");
mp.game.streaming.removeIpl("rc12b_hospitalinterior_lod");
mp.game.streaming.removeIpl("rc12b_hospitalinterior");

//====================================================

let bunkINT = mp.game.interior.getInteriorAtCoords(882.93414, -3240.119, -98.35586);
let bunkProps = [
	"gr_grdlc_int_02",
	"gr_grdlc_int_01",
	"grdlc_int_01_shell",
	"gr_entrance_placement",
	"gr_grdlc_interior_placement",
	"gr_grdlc_interior_placement_interior_0_grdlc_int_01_milo_",
	"gr_grdlc_interior_placement_interior_1_grdlc_int_02_milo_",
	"weed_upgrade_equip",
	"weed_security_upgrade",
	"standard_bunker_set",
	"counterfeit_standard_equip",
	"interior_basic",
	"meth_lab_basic",
	"coke_cut_01",
	"weed_growtha_stage1",
	
	"standard_bunker_set",
	"Bunker_Style_C",
	"Office_Upgrade_set",
	"security_upgrade",
	"Gun_schematic_set",
	"gun_range_lights",
	"gun_locker_upgrade",
];
for (const propName of bunkProps) {
    mp.game.interior.enableInteriorProp(bunkINT, propName);
    // mp.game.invoke("0x8D8338B92AD18ED6", phIntID, propName, 1); // _SET_INTERIOR_PROP_COLOR
}
let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
let phPropList = [
    "Set_Pent_Tint_Shell",
    "Set_Pent_Pattern_01",
    "Set_Pent_Spa_Bar_Open",
    "Set_Pent_Media_Bar_Open",
    "Set_Pent_Dealer",
    "Set_Pent_Arcade_Retro",
    "Set_Pent_Bar_Clutter",
    "Set_Pent_Clutter_01",
    "set_pent_bar_light_01",
    "set_pent_bar_party_0"
];

for (const propName of phPropList) {
    mp.game.interior.enableInteriorProp(phIntID, propName);
    // mp.game.invoke("0x8D8338B92AD18ED6", phIntID, propName, 1); // _SET_INTERIOR_PROP_COLOR
}

mp.game.interior.refreshInterior(phIntID);


var interiorer = mp.game.interior.getInteriorAtCoords(994.5925, -3002.594, -39.64699);
		mp.game.streaming.requestIpl("imp_impexp_interior_placement_interior_1_impexp_intwaremed_milo_");
		let proplist = [
		  	"garage_decor_01",
			"garage_decor_02",
			"garage_decor_03",
			"garage_decor_04",
			"lighting_option01",
			"lighting_option02",
			"lighting_option03",
			"lighting_option04",
			"lighting_option05",
			"lighting_option06",
			"lighting_option07",
			"lighting_option08",
			"lighting_option09",
			"numbering_style01_n3",
			"numbering_style02_n3",
			"numbering_style03_n3",
			"numbering_style04_n3",
			"numbering_style05_n3",
			"numbering_style06_n3",
			"numbering_style07_n3",
			"numbering_style08_n3",
			"numbering_style09_n3",
			"floor_vinyl_01",
			"floor_vinyl_02",
			"floor_vinyl_03",
			"floor_vinyl_04",
			"floor_vinyl_05",
			"floor_vinyl_06",
			"floor_vinyl_07",
			"floor_vinyl_08",
			"floor_vinyl_09",
			"floor_vinyl_10",
			"floor_vinyl_11",
			"floor_vinyl_12",
			"floor_vinyl_13",
			"floor_vinyl_14",
			"floor_vinyl_15",
			"floor_vinyl_16",
			"floor_vinyl_17",
			"floor_vinyl_18",
			"floor_vinyl_19",
			"urban_style_set",
			"car_floor_hatch",
			"door_blocker"
		];
		for (const propName of proplist) {
			mp.game.interior.enableInteriorProp(interiorer, propName);
			//mp.game.invoke("0x8D8338B92AD18ED6", interiorer, propName, 1);
		}
		mp.game.interior.refreshInterior(interiorer);
		
		var interiorer3 = mp.game.interior.getInteriorAtCoords(3939.823,-4961.717,-495.3002);
		mp.game.interior.enableInteriorProp(interiorer3, "h4_mph4_airstrip_interior_0_airstrip_hanger");
		
		
		
const arcadeId = mp.game.interior.getInteriorAtCoordsWithType(2730.0, -380.0, -49.0, "ch_DLC_Arcade");
const planRoomId = mp.game.interior.getInteriorAtCoordsWithType(2730.0, -380.0, -49.0, "ch_DLC_Plan");
const propList = {
    "arcade": [
		"entity_set_arcade_set_trophy_love",
		"entity_set_arcade_set_ceiling_flat",
		"entity_set_arcade_set_trophy_brawler",
		"entity_set_arcade_set_trophy_cabs",
		"entity_set_arcade_set_trophy_claw",
		"entity_set_arcade_set_trophy_gunner",
		"entity_set_arcade_set_trophy_king",
		"entity_set_arcade_set_trophy_monkey",
		"entity_set_arcade_set_trophy_patriot",
		"entity_set_arcade_set_trophy_racer",
		"entity_set_arcade_set_trophy_retro",
		"entity_set_arcade_set_trophy_strife",
		"entity_set_arcade_set_trophy_teller",
		"entity_set_arcade_set_streetx4",
		"entity_set_big_screen",
		"entity_set_constant_geometry",
		"Entity_Set_Plushie_09",
		"Entity_Set_Plushie_01",
		"Entity_Set_Plushie_02",
		"Entity_Set_Plushie_03",
		"Entity_Set_Plushie_04",
		"Entity_Set_Plushie_05",
		"Entity_Set_Plushie_06",
		"Entity_Set_Plushie_07",
		"Entity_Set_Plushie_08",
		"entity_set_mural_neon_option_07",
		"entity_set_mural_option_07",
		"entity_set_screens",
		"entity_set_floor_option_01"
    ],

    "planRoom": [
        "set_plan_bed",
        "set_plan_garage",
        "set_plan_setup",
        "set_plan_scribbles",
        "set_plan_computer",
        "set_plan_arcade_x4",
        "set_plan_plans",
        "set_plan_casino",
        "set_plan_keypad",
        "set_plan_vault",
        "set_plan_mechanic",
        "set_plan_hacker",
        "set_plan_weapons",
        "Set_Plan_Vault_Laser",
        "Set_Plan_Vault_Drill",
        "Set_Plan_Electric_Drill",
        "Set_Plan_Plastic_Explosives",
        "Set_Plan_Hacking_Device",
        "Set_Plan_Cockroaches",
        "Set_Plan_Stealth_Outfits",
        "Set_Plan_Gruppe_Sechs_Outfits",
        "Set_Plan_Fireman_Helmet",
        "Set_Plan_Drone_Parts",
        "Set_Plan_Vault_KeyCard_01a",
        "Set_Plan_Swipe_Card_01a",
        "Set_Plan_Swipe_Card_01b"
    ]
};

for (const [group, props] of Object.entries(propList)) {
    for (const prop of props) {
        mp.game.interior.enableInteriorProp(group === "arcade" ? arcadeId : planRoomId, prop);
    }
}

mp.game.interior.refreshInterior(arcadeId);
mp.game.interior.refreshInterior(planRoomId);
}