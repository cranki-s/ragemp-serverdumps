{
const weaponsData = require('./src/weapon/weaponsData');

mp.events.add('render', () => {
    try {
		if(weaponsData.getPlayerWeaponTypeGroup() != "melee" && weaponsData.getPlayerWeaponTypeGroup() != undefined || !(mp.players.local.weapon in weaponsData.meleeWeapons)) {
			mp.game.controls.disableControlAction(2, 142, true);
		}
    } catch (e) { 
		mp.gui.chat.push(e);
	}
});
}