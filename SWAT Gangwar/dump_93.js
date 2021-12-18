{
mp.events.add('render', () => {
    if (mp.players.local.weapon == mp.game.joaat("weapon_pumpshotgun"))
    {
		    mp.game.player.setWeaponDamageModifier(0.5);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_revolver"))
    {
		    mp.game.player.setWeaponDamageModifier(0.60);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_advancedrifle"))
    {
		    mp.game.player.setWeaponDamageModifier(0.475);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_gusenberg"))
    {
		    mp.game.player.setWeaponDamageModifier(0.5);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_assaultrifle"))
    {
		    mp.game.player.setWeaponDamageModifier(0.5);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_specialcarbine"))
    {
		    mp.game.player.setWeaponDamageModifier(0.475);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_compactrifle"))
    {
		    mp.game.player.setWeaponDamageModifier(0.5);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_bullpuprifle"))
    {
		    mp.game.player.setWeaponDamageModifier(0.45);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_heavysniper"))
    {
		    mp.game.player.setWeaponDamageModifier(100);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_marksmanrifle"))
    {
		    mp.game.player.setWeaponDamageModifier(0.265);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_sniperrifle"))
    {
		    mp.game.player.setWeaponDamageModifier(0.9);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_appistol"))
    {
		    mp.game.player.setWeaponDamageModifier(0.575);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_smg"))
    {
		    mp.game.player.setWeaponDamageModifier(0.565);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_machinepistol"))
    {
		    mp.game.player.setWeaponDamageModifier(0.70);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_combatpdw"))
    {
		    mp.game.player.setWeaponDamageModifier(0.475);
    }	
	else if (mp.players.local.weapon == mp.game.joaat("weapon_musket"))
    {
		    mp.game.player.setWeaponDamageModifier(1.0);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_marksmanpistol"))
    {
		    mp.game.player.setWeaponDamageModifier(1000);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_microsmg"))
    {
		    mp.game.player.setWeaponDamageModifier(0.675);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_minismg"))
    {
		    mp.game.player.setWeaponDamageModifier(0.6);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_assaultsmg"))
    {
		    mp.game.player.setWeaponDamageModifier(0.55);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_pistol"))
    {
		    mp.game.player.setWeaponDamageModifier(0.525);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_combatshotgun"))
    {
		    mp.game.player.setWeaponDamageModifier(0.525);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_heavysniper_mk2"))
    {
		    mp.game.player.setWeaponDamageModifier(0.525);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_combatmg_mk2"))
    {
		    mp.game.player.setWeaponDamageModifier(0.525);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_revolver_mk2"))
    {
		    mp.game.player.setWeaponDamageModifier(0.25);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_bullpuprifle_mk2"))
    {
		    mp.game.player.setWeaponDamageModifier(0.45);
    }
	else if (mp.players.local.weapon == mp.game.joaat("weapon_carbinerifle"))
    {
		    mp.game.player.setWeaponDamageModifier(0.45);
    }
	else{
		    mp.game.player.setWeaponDamageModifier(0.4);
	}
});
}