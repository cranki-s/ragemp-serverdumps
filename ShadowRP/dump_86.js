{
exports = {
	//оружие ближнего боя
	meleeWeapons: {
		2460120199	: "Antique Cavalry Dagger",
		2508868239	: "Baseball Bat",
		4192643659	: "Bottle",
		2227010557	: "Crowbar",
		2725352035	: "Fist",
		2343591895	: "Flashlight",
		1141786504	: "Golf Club",
		1317494643	: "Hammer",
		4191993645	: "Hatchet",
		3638508604	: "Knuckle",
		2578778090	: "Knife",
		3713923289	: "Machete",
		3756226112	: "Switchblade",
		1737195953	: "Nightstick",
		419712736	: "Pipe Wrench",
		3441901897	: "Battle Axe",
		2484171525	: "Pool Cue",
		940833800	: "Stone Hatchet"
	},
	//Тип оружия (неполный список)
	weaponTypeGroups: {
		2685387236	: "melee",
		416676503	: "Handguns",
		3337201093	: "Submachine Gun",
		860033945	: "Shotgun",
		970310034	: "Assault Rifle",
		1159398588	: "Light Machine Gun",
		3082541095	: "Sniper",
		2725924767	: "Heavy Weapon",
		1548507267	: "Throwables",
		4257178988	: "Misc",
	},
	//Фукнция получения названия группы оружия из списка
	getPlayerWeaponTypeGroup() {
		return this.weaponTypeGroups[mp.game.weapon.getWeapontypeGroup(mp.players.local.weapon)]
	}
}
}