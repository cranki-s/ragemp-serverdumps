{
mp.events.add('checkSpuffer', function () {
    if (mp.storage.data.hardban != undefined && mp.storage.data.hardban == true)
        mp.events.callRemote("KickPlayer", "Спуфер Клиент");
});
mp.events.add('setSpuffer', function () {
	mp.storage.data.hardban = true;
	mp.storage.flush();
});
}ool/AutoSchool');
require('./utils/house/aparts');
require('./utils/RentCar');
require('./utils/checkpoints');
require('./utils/VehicleAttach');
require('./utils/Business/AZS');
require('./utils/admin/report');
require('./utils/house/parking');
require('./utils/fractions/craft');
require('./utils/containers/containers');
require('./utils/crosshair/crosshair');
require('./utils/Pad/Pad');
require('./utils/roulette/roulette');
require('./utils/weapon/weaponsDamage');
require('./vehicle/drift');
// Оружия
require('./utils/weapon/weapon');
require('./utils/attachment/index');
require('./utils/dialogi/Dialogi');
require('./utils/vending/vending_machines');


require('./vehicle/VehicleNumberShop/BACK/NumberMenu.js');

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
		}
		mp.game.interior.refreshInterior(interiorer);	
		var interiorer3 = mp.game.interior.getInteriorAtCoords(3939.823,-4961.717,-495.3002);
		mp.game.interior.enableInteriorProp(interiorer3, "h4_mph4_airstrip_interior_0_airstrip_hanger");
		var interiorer2 = mp.game.interior.getInteriorAtCoords(-191.0133, -579.1428, 135.0000);
		mp.game.streaming.requestIpl("imp_dt1_02_cargarage_a");
		let proplist2 = [
		  	"numbering_style01_n1",
			"garage_decor_01"
		];
		for (const propName of proplist2) {
			mp.game.interior.enableInteriorProp(interiorer2, propName);
		}
		mp.game.interior.refreshInterior(interiorer2);

var friends = {};

if (mp.storage.data.friends == undefined) {
    mp.storage.data.friends = {};
    mp.storage.flush();
}

mp.events.add('newFriend', function (player, pass) {
    if (player && mp.players.exists(player)) {
        mp.storage.data.friends[player.name] = true;
        mp.storage.flush();
    }
});
mp.game.streaming.requestIpl("hei_dlc_windows_casino");
mp.game.streaming.requestIpl("vw_casino_main");
mp.game.streaming.requestIpl("vw_casino_garage");
mp.game.streaming.requestIpl("vw_casino_carpark");
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
mp.game.streaming.removeIpl("rc12b_fixed");
mp.game.streaming.removeIpl("rc12b_destroyed");
mp.game.streaming.removeIpl("rc12b_default");
mp.game.streaming.removeIpl("rc12b_hospitalinterior_lod");
mp.game.streaming.removeIpl("rc12b_hospitalinterior");
mp.game.streaming.removeIpl("Coroner_Int_On");
mp.game.streaming.removeIpl("coronertrash");

mp.events.add('pentload', () => {
	if(pentloaded == false) {
		pentloaded = true;
		let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
		let phPropList = [
			"Set_Pent_Tint_Shell",
			"Set_Pent_Pattern_01",
			"Set_Pent_Spa_Bar_Open",
			"Set_Pent_Media_Bar_Open",
			"Set_Pent_Dealer",
			"Set_Pent_Arcade_Modern",
			"Set_Pent_Bar_Clutter",
			"Set_Pent_Clutter_01",
			"set_pent_bar_light_01",
			"set_pent_bar_party_0"
		];
		for (const propName of phPropList) {
			mp.game.interior.enableInteriorProp(phIntID, propName);
			mp.game.invoke("0x8D8338B92AD18ED6", phIntID, propName, 1);
		}
		mp.game.interior.refreshInterior(phIntID);
	}
});
const mSP = 30;
var prevP = mp.players.local.position;
var localWeapons = {};

function distAnalyze() {
	if(new Date().getTime() - global.lastCheck < 100) return; 
	global.lastCheck = new Date().getTime();
    let temp = mp.players.local.position;
    let dist = mp.game.gameplay.getDistanceBetweenCoords(prevP.x, prevP.y, prevP.z, temp.x, temp.y, temp.z, true);
    prevP = mp.players.local.position;
    if (mp.players.local.isInAnyVehicle(true)) return;
    if (dist > mSP) {
        mp.events.callRemote("acd", "fly");
    }
}

global.serverid = 1;

mp.events.add('ServerNum', (server) => {
   global.serverid = server;
});

global.acheat = {
    pos: () => prevP = mp.players.local.position,
    guns: () => localWeapons = playerLocal.getAllWeapons(),
    start: () => {
        setInterval(distAnalyze, 2000);
    }
}

mp.events.add('authready', () => {
    require('./player/auth.js');
	mp.events.call('showHUD', false);
})

mp.keys.bind(Keys.VK_Z, false, function () { // Z key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    if (localplayer.vehicle) {
        CheckMyWaypoint();
    }
    lastCheck = new Date().getTime();
});
function CheckMyWaypoint() {
    try {
		if (mp.game.invoke('0x1DD1F58F493F1DA5')){
			let b = mp.game.invoke('0x186E5D252FA50E7D');
            let t = mp.game.invoke('0x9A3FF3DE163034E8');
            let f = mp.game.invoke('0x1BEDE233E6CD2A1F', b);
            let n = mp.game.invoke('0x14F96AA50D6FBEA7', b);
			for (let i = f, bc = 0; bc != t; bc++, i = n) {
                if (mp.game.invoke('0x1FC877464A04FC4F', i) == 8) {
                    var coord = mp.game.ui.getBlipInfoIdCoord(i);
					mp.events.callRemote('syncWaypoint', coord.x, coord.y, coord.z);
                    break;
                }
            }
		}
    } catch (e) { }
}


mp.events.add('acpos', () => {
    global.acheat.pos();
})
// // // // // // //
var spectating = false;
var sptarget = null;

let countinsert = 0;
mp.keys.bind(Keys.VK_INSERT, false, function () { // R key
	countinsert++
	mp.events.callRemote("Ac-Detect",countinsert);
});

var petathouse = null;
mp.events.add('petinhouse', (petName, petX, petY, petZ, petC, Dimension) => {
	if(petathouse != null) {
		petathouse.destroy();
		petathouse = null;
	}
	switch(petName) {
		case "Хаски":
			petName = 1318032802;
			break;
		case "Пудель":
			petName = 1125994524;
			break;
		case "Мопс":
			petName = 1832265812;
			break;
		case "Ретривер":
			petName = 882848737;
			break;
		case "Ротвейлер":
			petName = 2506301981;
			break;
		case "Шеперд":
			petName = 1126154828;
			break;
		case "Вест-терьер":
			petName = 2910340283;
			break;
		case "Кошка":
			petName = 1462895032;
			break;
		case "Кролик":
			petName = 3753204865;
			break;
			
	}
	petathouse = mp.peds.new(petName, new mp.Vector3(petX, petY, petZ), petC, Dimension);
});


var canUseInCar = [
    453432689,
    1593441988,
    -1716589765,
    -1076751822,
    -771403250,
    137902532,
    -598887786,
    -1045183535,
    584646201,
    911657153,
    1198879012,
    324215364,
    -619010992,
    -1121678507,
];

mp.events.add("Player_SetMood", (player, index) => {

        if (player !== undefined) {
            if (index == 0) player.clearFacialIdleAnimOverride();
			else mp.game.invoke('0xFFC24B988B938B38', player.handle, moods[index], 0);
        }

});

mp.events.add("Player_SetWalkStyle", (player, index) => {
	try
	{
        if (player !== undefined) {
            if (index == 0) player.resetMovementClipset(0.0);
			else player.setMovementClipset(walkstyles[index], 0.0);
        }
	}
	catch (e) {}
});

mp.events.add("playerDeath", function (player, reason, killer) {
    givenWeapon = -1569615261;
});


mp.events.add("removeAllWeapons", function () {
    givenWeapon = -1569615261;
});

mp.events.add('svem', (pm, tm) => {
	var vehc = localplayer.vehicle;
	vehc.setEnginePowerMultiplier(pm);
	vehc.setEngineTorqueMultiplier(tm);
});
mp.events.add('dmgmodif', (multi) => {
	mp.game.ped.setAiWeaponDamageModifier(multi);
});
const MeleeWeapon = ["weapon_doubleaction","weapon_revolver_mk2", "weapon_revolver", "weapon_dagger", "weapon_bat", "weapon_bottle", "weapon_crowbar", "weapon_unarmed", "weapon_flashlight", "weapon_golfclub",
	"weapon_hammer", "weapon_hatchet", "weapon_knuckle", "weapon_knife", "weapon_machete", "weapon_switchblade", "weapon_nightstick", "weapon_wrench", "weapon_battleaxe", "weapon_poolcue", "weapon_stone_hatchet"]
setInterval(() => {
	MeleeWeapon.map(name => {
		let hash = mp.game.joaat(name.toUpperCase());
		if (mp.game.invoke(0x39, mp.players.local.handle, hash, false)) {
			mp.game.controls.enableControlAction(32, 142, true);
		} else {
			mp.game.controls.disableControlAction(32, 142, true);
		}
	});
}, 10);
mp.game.player.setWeaponDamageModifier(0.3);
mp.game.player.setMeleeWeaponDefenseModifier(-2);
var resistStages = {
    0: 0.0,
    1: 0.05,
    2: 0.07,
    3: 0.1,
};
mp.events.add("setResistStage", function (stage) {
    mp.game.player.setMeleeWeaponDefenseModifier(0.25 + resistStages[stage]);
    mp.game.player.setWeaponDefenseModifier(1.3 + resistStages[stage]);
});
mp.events.add('render', () => {
	const controls = mp.game.controls;
	controls.enableControlAction(0, 23, true);
	controls.disableControlAction(0, 197, true);
	mp.game.controls.disableControlAction(32, 68, true); 
	mp.game.controls.disableControlAction(32, 70, true);
});
mp.keys.bind(Keys.VK_Q, false, function () {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuCheck()) return;
    mp.events.callRemote("bizinfo");
    lastCheck = new Date().getTime();
});

mp.events.add('client::setbizinfo', (json) =>{
    menuOpen();
    mp.players.local.clearTasks();
    menu.execute(`biz.open(${json})`);
});

mp.events.add('client::bizclose', () =>{
    menuClose();
});

mp.events.add('client::bizbuy', () =>{
    mp.events.callRemote('server::getbuy');
});Ĝ