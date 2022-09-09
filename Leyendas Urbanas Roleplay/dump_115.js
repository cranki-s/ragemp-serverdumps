{
/*
    Camera Effects:

    0 - No/cancel effect
    1 - Effect zooms in, gradually tilts cam clockwise apx 30 degrees, wobbles slowly. Motion blur is active until cancelled
    2 - Effect immediately tilts cam clockwise apx 30 degrees, begins to wobble slowly, then gradually tilts cam back to normal. The wobbling will continue until the effect is cancelled

    Source: NativeDB
*/

const scriptConstants = {
    screenFX: "DeathFailMPIn",
    textDelay: 750,
    camEffect: 2
};

const deathMessages = {
    "melee": ["te ha matado a guantazos.", "te ha dado una paliza.", "te ha tratado mal.", "te ha dado un revés.", "te ha matado de una hostia."],
    "molotov": ["te ha prendido fuego.", "se ha preparado un cocido contigo.", "te va a echar a la barbacoa."],
    "knife": ["te ha acuchillado.", "te ha apuñalado.", "se va a comer tus vísceras."],
    "pistol": ["te ha disparado.", "te ha hecho trizas el cráneo.", "te ha reventado a balazos.", "te ha metido una bala en el cráneo.", "te ha enchufado un balazo."],
    "smg": ["te ha matado con un subfusil.", "te ha maldecido con su subfusil.", "te ha llenado de balas.", "ha acabado contigo."],
    "rifle": ["te ha matado con un rifle.", "te ha hecho un buen agujero.", "ha terminado contigo.", "te ha hecho una alfombra."],
    "mg": ["te ha ametrelleado.", "te ha cosido a balas.", "te ha hecho pedazos."],
    "shotgun": ["te ha dado un escopetazo.", "te ha pulverizado.", "te ha esparcido por el suelo."],
    "sniper": ["te ha matado con un francotirador.", "te ha hecho un 360 no-scope.", "te ha elegido como su presa."],
    "heavy": ["te ha destruido.", "te ha borrrado de la faz de la tierra.", "te ha hecho cenizas."],
    "minigun": ["te ha partido por la mitad.", "te ha hecho añicos.", "ha eliminado tu existencia.", "te ha hecho un owned."],
    "explosive": ["te ha explotado.", "te ha reventado.", "te ha hecho ca-bum."],
    "rotor": ["estaba cortando el césped, pero te ha cortado a tí."],
    "flatten": ["ha arrasado contigo."]
};

let textTimer = null;
let estaMuerto = false;
mp.events.add("playerDeath", (player, reason, killer) => {
	if(estaMuerto) return;
	mp.game.gameplay.setFadeOutAfterDeath(false);
    mp.game.audio.playSoundFrontend(-1, "Bed", "WastedSounds", true);
    mp.game.graphics.startScreenEffect(scriptConstants.screenFX, 0, true);
    mp.game.cam.shakeGameplayCam("DEATH_FAIL_IN_EFFECT_SHAKE", 4.5);
    mp.game.cam.setCamEffect(scriptConstants.camEffect);

	estaMuerto = true;

    if (textTimer) clearTimeout(textTimer);
    textTimer = crearTimeout(function() {
        mp.game.ui.messages.showShard("~r~Muerto", (killer ? `${killer.handle == player.handle ? `Te suicidaste.` : getDeathMessage(obtenerNombreConocido(killer), reason)}` : "Suicida."));
    }, scriptConstants.textDelay);
});

mp.events.add("playerSpawn", () => {
    mp.game.graphics.stopScreenEffect(scriptConstants.screenFX);
    mp.game.cam.stopGameplayCamShaking(true)
    mp.game.invoke("0x068E835A1D0DC0E3", scriptConstants.screenFX);
    mp.game.cam.setCamEffect(0);
	estaMuerto = false;
    if (textTimer) {
        clearTimeout(textTimer);
        textTimer = null;
    }
});

mp.events.add("iniciar_efecto_muerto", () => {
    mp.game.audio.playSoundFrontend(-1, "Bed", "WastedSounds", true);
    mp.game.graphics.startScreenEffect(scriptConstants.screenFX, 0, true);
    mp.game.cam.shakeGameplayCam("DEATH_FAIL_IN_EFFECT_SHAKE", 4.5);
    //mp.game.cam.setCamEffect(scriptConstants.camEffect);
	estaMuerto = true;
});


mp.events.add("parar_efecto_muerto", () => {
    mp.game.graphics.stopScreenEffect(scriptConstants.screenFX);
    mp.game.invoke("0x068E835A1D0DC0E3", scriptConstants.screenFX);
    mp.game.cam.stopGameplayCamShaking(true)
    //mp.game.cam.setCamEffect(0);
	estaMuerto = false;
    if (textTimer) {
        clearTimeout(textTimer);
        textTimer = null;
    }
});

// mistakes were made, rage standards crying
function getDeathMessage(name, reason) {
    let msgGroup;
    switch (reason) {
        case mp.game.joaat("weapon_unarmed"):
        case mp.game.joaat("weapon_bat"):
        case mp.game.joaat("weapon_nightstick"):
        case mp.game.joaat("weapon_hammer"):
        case mp.game.joaat("weapon_crowbar"):
        case mp.game.joaat("weapon_golfclub"):
        case mp.game.joaat("weapon_knuckle"):
        case mp.game.joaat("weapon_hatchet"):
        case mp.game.joaat("weapon_poolcue"):
        case mp.game.joaat("weapon_wrench"):
        case mp.game.joaat("weapon_flashlight"):
        case mp.game.joaat("weapon_bottle"):
        case mp.game.joaat("weapon_battleaxe"):
        case mp.game.joaat("weapon_machete"):
            msgGroup = "melee";
        break;

        case mp.game.joaat("weapon_molotov"):
            msgGroup = "molotov";
        break;

        case mp.game.joaat("weapon_knife"):
        case mp.game.joaat("weapon_dagger"):
        case mp.game.joaat("weapon_switchblade"):
            msgGroup = "knife";
        break;

        case mp.game.joaat("weapon_pistol"):
        case mp.game.joaat("weapon_combatpistol"):
        case mp.game.joaat("weapon_appistol"):
        case mp.game.joaat("weapon_snspistol"):
        case mp.game.joaat("weapon_snspistol_mk2"):
        case mp.game.joaat("weapon_heavypistol"):
        case mp.game.joaat("weapon_vintagepistol"):
        case mp.game.joaat("weapon_marksmanpistol"):
        case mp.game.joaat("weapon_machinepistol"):
        case mp.game.joaat("weapon_revolver"):
        case mp.game.joaat("weapon_revolver_mk2"):
        case mp.game.joaat("weapon_pistol50"):
        case mp.game.joaat("weapon_pistol_mk2"):
        case mp.game.joaat("weapon_doubleaction"):
            msgGroup = "pistol";
        break;

        case mp.game.joaat("weapon_smg"):
        case mp.game.joaat("weapon_microsmg"):
        case mp.game.joaat("weapon_combatpdw"):
        case mp.game.joaat("weapon_minismg"):
        case mp.game.joaat("weapon_assaultsmg"):
        case mp.game.joaat("weapon_gusenberg"):
        case mp.game.joaat("weapon_smg_mk2"):
            msgGroup = "smg";
        break;

        case mp.game.joaat("weapon_assaultrifle"):
        case mp.game.joaat("weapon_carbinerifle"):
        case mp.game.joaat("weapon_carbinerifle_mk2"):
        case mp.game.joaat("weapon_advancedrifle"):
        case mp.game.joaat("weapon_assaultrifle_mk2"):
        case mp.game.joaat("weapon_specialcarbine"):
        case mp.game.joaat("weapon_specialcarbine_mk2"):
        case mp.game.joaat("weapon_bullpuprifle"):
        case mp.game.joaat("weapon_bullpuprifle_mk2"):
        case mp.game.joaat("weapon_musket"):
        case mp.game.joaat("weapon_compactrifle"):
            msgGroup = "rifle";
        break;

        case mp.game.joaat("weapon_mg"):
        case mp.game.joaat("weapon_combatmg"):
        case mp.game.joaat("weapon_combatmg_mk2"):
        case mp.game.joaat("vehicle_weapon_player_bullet"):
        case mp.game.joaat("vehicle_weapon_ruiner_bullet"):
        case mp.game.joaat("vehicle_weapon_cannon_blazer"):
        case mp.game.joaat("vehicle_weapon_oppressor_mg"):
        case mp.game.joaat("vehicle_weapon_ardent_mg"):
        case mp.game.joaat("vehicle_weapon_nightshark_mg"):
        case mp.game.joaat("vehicle_weapon_microlight_mg"):
        case mp.game.joaat("vehicle_weapon_tula_nosemg"):
        case mp.game.joaat("vehicle_weapon_tula_mg"):
        case mp.game.joaat("vehicle_weapon_tula_dualmg"):
        case mp.game.joaat("vehicle_weapon_deluxo_mg"):
        case mp.game.joaat("vehicle_weapon_subcar_mg"):
        case mp.game.joaat("vehicle_weapon_comet_mg"):
        case mp.game.joaat("vehicle_weapon_revolter_mg"):
        case mp.game.joaat("vehicle_weapon_savestra_mg"):
        case mp.game.joaat("vehicle_weapon_viseris_mg"):
        case mp.game.joaat("vehicle_weapon_caracara_mg"):
        case mp.game.joaat("vehicle_weapon_bombushka_dualmg"):
        case mp.game.joaat("vehicle_weapon_dogfighter_mg"):
        case mp.game.joaat("vehicle_weapon_mogul_nose"):
        case mp.game.joaat("vehicle_weapon_mogul_dualnose"):
        case mp.game.joaat("vehicle_weapon_mogul_turret"):
        case mp.game.joaat("vehicle_weapon_mogul_dualturret"):
        case mp.game.joaat("vehicle_weapon_rogue_mg"):
        case mp.game.joaat("vehicle_weapon_seabreeze_mg"):
        case mp.game.joaat("vehicle_weapon_vigilante_mg"):
        case mp.game.joaat("vehicle_weapon_dune_mg"):
            msgGroup = "mg";
        break;

        case mp.game.joaat("weapon_pumpshotgun"):
        case mp.game.joaat("weapon_pumpshotgun_mk2"):
        case mp.game.joaat("weapon_sawnoffshotgun"):
        case mp.game.joaat("weapon_assaultshotgun"):
        case mp.game.joaat("weapon_bullpupshotgun"):
        case mp.game.joaat("weapon_heavyshotgun"):
        case mp.game.joaat("weapon_dbshotgun"):
        case mp.game.joaat("weapon_autoshotgun"):
            msgGroup = "shotgun";
        break;

        case mp.game.joaat("weapon_heavysniper"):
        case mp.game.joaat("weapon_remotesniper"):
        case mp.game.joaat("weapon_sniperrifle"):
        case mp.game.joaat("weapon_marksmanrifle"):
        case mp.game.joaat("weapon_marksmanrifle_mk2"):
        case mp.game.joaat("weapon_heavysniper_mk2"):
            msgGroup = "sniper";
        break;

        case mp.game.joaat("weapon_explosion"):
        case mp.game.joaat("weapon_grenadelauncher"):
        case mp.game.joaat("weapon_flaregun"):
        case mp.game.joaat("weapon_rpg"):
        case mp.game.joaat("weapon_vehicle_rocket"):
        case mp.game.joaat("weapon_railgun"):
        case mp.game.joaat("weapon_firework"):
        case mp.game.joaat("weapon_hominglauncher"):
        case mp.game.joaat("weapon_compactlauncher"):
        case mp.game.joaat("weapon_airstrike_rocket"):
        case mp.game.joaat("vehicle_weapon_turret_technical"):
        case mp.game.joaat("vehicle_weapon_space_rocket"):
        case mp.game.joaat("vehicle_weapon_player_laser"):
        case mp.game.joaat("vehicle_weapon_player_buzzard"):
        case mp.game.joaat("weapon_passenger_rocket"):
        case mp.game.joaat("vehicle_weapon_plane_rocket"):
        case mp.game.joaat("vehicle_weapon_player_savage"):
        case mp.game.joaat("vehicle_weapon_tank"):
        case mp.game.joaat("vehicle_weapon_ruiner_rocket"):
        case mp.game.joaat("vehicle_weapon_turret_boxville"):
        case mp.game.joaat("vehicle_weapon_turret_insurgent"):
        case mp.game.joaat("vehicle_weapon_player_lazer"):
        case mp.game.joaat("vehicle_weapon_oppressor_missile"):
        case mp.game.joaat("vehicle_weapon_tampa_missile"):
        case mp.game.joaat("vehicle_weapon_tampa_mortar"):
        case mp.game.joaat("vehicle_weapon_akula_turret_single"):
        case mp.game.joaat("vehicle_weapon_akula_turret_dual"):
        case mp.game.joaat("vehicle_weapon_akula_missile"):
        case mp.game.joaat("vehicle_weapon_akula_barrage"):
        case mp.game.joaat("vehicle_weapon_avenger_cannon"):
        case mp.game.joaat("vehicle_weapon_barrage_top_mg"):
        case mp.game.joaat("vehicle_weapon_barrage_rear_mg"):
        case mp.game.joaat("vehicle_weapon_barrage_rear_gl"):
        case mp.game.joaat("vehicle_weapon_cherno_missile"):
        case mp.game.joaat("vehicle_weapon_deluxo_missile"):
        case mp.game.joaat("vehicle_weapon_khanjali_cannon"):
        case mp.game.joaat("vehicle_weapon_khanjali_cannon_heavy"):
        case mp.game.joaat("vehicle_weapon_khanjali_mg"):
        case mp.game.joaat("vehicle_weapon_khanjali_gl"):
        case mp.game.joaat("vehicle_weapon_subcar_missile"):
        case mp.game.joaat("vehicle_weapon_subcar_torpedo"):
        case mp.game.joaat("vehicle_weapon_thruster_missile"):
        case mp.game.joaat("vehicle_weapon_bomb_standard_wide"):
        case mp.game.joaat("vehicle_weapon_volatol_dualmg"):
        case mp.game.joaat("vehicle_weapon_bombushka_cannon"):
        case mp.game.joaat("vehicle_weapon_dogfighter_missile"):
        case mp.game.joaat("vehicle_weapon_hunter_mg"):
        case mp.game.joaat("vehicle_weapon_hunter_missile"):
        case mp.game.joaat("vehicle_weapon_hunter_barrage"):
        case mp.game.joaat("vehicle_weapon_hunter_cannon"):
        case mp.game.joaat("vehicle_weapon_rogue_cannon"):
        case mp.game.joaat("vehicle_weapon_rogue_missile"):
        case mp.game.joaat("vehicle_weapon_vigilante_missile"):
        case mp.game.joaat("vehicle_weapon_nose_turret_valkyrie"):
        case mp.game.joaat("vehicle_weapon_dune_grenadelauncher"):
        case mp.game.joaat("vehicle_weapon_halftrack_dualmg"):
        case mp.game.joaat("vehicle_weapon_halftrack_quadmg"):
        case mp.game.joaat("vehicle_weapon_apc_cannon"):
        case mp.game.joaat("vehicle_weapon_apc_missile"):
        case mp.game.joaat("vehicle_weapon_apc_mg"):
            msgGroup = "heavy";
        break;

        case mp.game.joaat("weapon_minigun"):
        case mp.game.joaat("vehicle_weapon_turret_limo"):
        case mp.game.joaat("vehicle_weapon_tampa_fixedminigun"):
        case mp.game.joaat("vehicle_weapon_tampa_dualminigun"):
        case mp.game.joaat("vehicle_weapon_insurgent_minigun"):
        case mp.game.joaat("vehicle_weapon_technical_minigun"):
        case mp.game.joaat("vehicle_weapon_havok_minigun"):
        case mp.game.joaat("vehicle_weapon_tula_minigun"):
        case mp.game.joaat("vehicle_weapon_akula_minigun"):
        case mp.game.joaat("vehicle_weapon_barrage_top_minigun"):
        case mp.game.joaat("vehicle_weapon_barrage_rear_minigun"):
        case mp.game.joaat("vehicle_weapon_thruster_mg"):
        case mp.game.joaat("vehicle_weapon_caracara_minigun"):
        case mp.game.joaat("vehicle_weapon_turret_valkyrie"):
        case mp.game.joaat("vehicle_weapon_dune_minigun"):
            msgGroup = "minigun";
        break;

        case mp.game.joaat("weapon_stickybomb"):
        case mp.game.joaat("weapon_grenade"):
        case mp.game.joaat("weapon_proxmine"):
        case mp.game.joaat("weapon_pipebomb"):
            msgGroup = "explosive";
        break;

        case mp.game.joaat("vehicle_weapon_rotors"):
            msgGroup = "rotor";
        break;

        case mp.game.joaat("weapon_rammed_by_car"):
        case mp.game.joaat("weapon_run_over_by_car"):
            msgGroup = "flatten";
        break;

        default:
            msgGroup = "noidea";
    }

    return `<C>${name}</C> ${(deathMessages[msgGroup]) ? deathMessages[msgGroup][ Math.floor(Math.random() * deathMessages[msgGroup].length) ] : "te mato."}`;
}
}