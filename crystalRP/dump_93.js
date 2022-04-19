{
mp.keys.bind(Keys.VK_R, false, ReloadWeapon);
const currentWeapon = () => mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), localplayer.handle);
setInterval(function() {
    var current = currentWeapon();
	if (current == -1569615261 || current == 911657153) return;
	var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, current);
	if (ammo != 0) return;
	mp.events.callRemote("playerReload", current, ammo);
}, 100)
function ReloadWeapon() {
    if (!loggedin || chatActive || new Date().getTime() - global.lastCheck < 1000 || mp.gui.cursor.visible) return;
	var current = currentWeapon();
	if (current == -1569615261 || current == 911657153) return;
	var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, current);
	if (mp.game.weapon.getWeaponClipSize(current) == ammo) return;
	mp.events.callRemote("playerReload", current, ammo);
	global.lastCheck = new Date().getTime();
}
var ammosweap = 0;
var givenWeapon = -1569615261;
var to = false;
mp.events.add('client::setweapon', function (weaponHash) {
	weaponHash = parseInt(weaponHash);
	givenWeapon = weaponHash;
	mp.game.invoke(getNative("MAKE_PED_RELOAD"), localplayer.handle);
	mp.game.invoke(getNative("SET_PED_AMMO"), mp.players.local.handle, weaponHash, 9000);
	mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), mp.players.local.handle, weaponHash, 1500, false, true);
	mp.game.invoke(getNative("MAKE_PED_RELOAD"), mp.players.local.handle);
});

mp.events.add('client::removeweapon', function (weaponHash) {
	weaponHash = parseInt(weaponHash);
	givenWeapon = -1569615261;
	mp.game.invoke(getNative("SET_PED_AMMO"), mp.players.local.handle, weaponHash, 0);
	mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), mp.players.local.handle, weaponHash);
});


mp.events.add('wgive', (weaponHash, ammo, isReload, equipNow, imgID, AmmoCount) => {
    weaponHash = parseInt(weaponHash);
	if (weaponHash == 126349499)
		to = weaponHash;
    ammo = parseInt(ammo);
    ammo = ammo >= 9999 ? 9999 : ammo;
    givenWeapon = weaponHash;
    ammo += mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
    mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
	ammosweap = ammo;
    mp.gui.execute(`HUD.weapPng=${imgID};`);
	if (ammo != null) {
    	mp.gui.execute(`HUD.ammo=${ammo};`);
    	mp.gui.execute(`HUD.maxAmmo=${AmmoCount};`);
	}
    mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localplayer.handle, weaponHash, ammo, false, equipNow);
    if (isReload) {
        mp.game.invoke(getNative("MAKE_PED_RELOAD"), localplayer.handle);
    }
});
mp.events.add('offWeaponIMG', () => {
    mp.gui.execute(`HUD.weapPng=null;`);
    mp.gui.execute(`HUD.ammo=0;`);
});
mp.events.add('takeOffWeapon', (weaponHash) => {
    weaponHash = parseInt(weaponHash);
    var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
	if(ammo == ammosweap) mp.events.callRemote('playerTakeoffWeapon', weaponHash, ammo, 0);
	else mp.events.callRemote('playerTakeoffWeapon', weaponHash, ammosweap, 1);
	ammosweap = 0;
	mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
	mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, weaponHash);
	givenWeapon = -1569615261;
	mp.gui.execute(`HUD.ammo=0;`);
	mp.gui.execute(`HUD.weapPng=null;`);
});
mp.events.add('serverTakeOffWeapon', (weaponHash) => {
    weaponHash = parseInt(weaponHash);
    var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
	if(ammo == ammosweap) mp.events.callRemote('takeoffWeapon', weaponHash, ammo, 0);
	else mp.events.callRemote('takeoffWeapon', weaponHash, ammosweap, 1);
	ammosweap = 0;
	mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
	mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, weaponHash);
	givenWeapon = -1569615261;
	mp.gui.execute(`HUD.ammo=0;`);
	mp.gui.execute(`HUD.weapPng=null;`);
});
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    mp.events.callRemote("ShotWeapon");
});
var checkTimer = setInterval(function () {
    var current = currentWeapon();
    if (localplayer.isInAnyVehicle(true)) {
        var vehicle = localplayer.vehicle;
        if (vehicle == null) return;

        if (vehicle.getClass() == 15) 
            if (vehicle.getPedInSeat(-1) == localplayer.handle || vehicle.getPedInSeat(0) == localplayer.handle) 
				return;
        else 
            if (canUseInCar.indexOf(current) == -1) 
				return;
        
    }

    if (currentWeapon() != givenWeapon) {
		ammosweap = 0;
        mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localplayer.handle, givenWeapon, 1, false, true);
        mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, givenWeapon, 0);
        localplayer.taskReloadWeapon(false);
        localplayer.taskSwapWeapon(false);
        mp.gui.execute(`HUD.ammo=0;`);
    }
}, 100);
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
	if (match) return;
    var current = currentWeapon();
    var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, current);
    mp.gui.execute(`HUD.ammo=${ammo};`);
	if (current != -1569615261 && current != 911657153) {
		if (ammosweap > 0) ammosweap--;
		if (ammosweap == 0 && ammo != 0) {
			mp.events.callRemote('takeoffWeapon', current, 0, 1);
			ammosweap = 0;
			mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, current, 0);
			mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, current);
			givenWeapon = -1569615261;
			mp.gui.execute(`HUD.ammo=0;`);
		}
	}
	
	if (ammo <= 0) {
		ammosweap = 0;
        localplayer.taskSwapWeapon(false);
        mp.gui.execute(`HUD.ammo=0;`);
    }
	if (to)
	{
        var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, current);
		if(ammo == ammosweap) mp.events.callRemote('playerTakeoffWeapon', current, ammo, 0);
		else mp.events.callRemote('playerTakeoffWeapon', current, ammosweap, 1);
		ammosweap = 0;
		mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, current, 0);
		mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, current);
		givenWeapon = -1569615261;
		mp.gui.execute(`HUD.ammo=0;`);
		mp.gui.execute(`HUD.weapPng=null;`);
		to = false;
		mp.events.callRemote('takeoffWeapon', current, 0, 1);
	}
});
mp.events.add('render', () => {
    mp.game.controls.disableControlAction(2, 45, true); // reload control
    mp.game.controls.disableControlAction(1, 243, true); // CCPanelDisable
    mp.game.controls.disableControlAction(2, 12, true);
    mp.game.controls.disableControlAction(2, 13, true);
    mp.game.controls.disableControlAction(2, 14, true);
    mp.game.controls.disableControlAction(2, 15, true);
    mp.game.controls.disableControlAction(2, 16, true);
    mp.game.controls.disableControlAction(2, 17, true);
    mp.game.controls.disableControlAction(2, 37, true);
    mp.game.controls.disableControlAction(2, 99, true);
    mp.game.controls.disableControlAction(2, 100, true);
    mp.game.controls.disableControlAction(2, 157, true);
    mp.game.controls.disableControlAction(2, 158, true);
    mp.game.controls.disableControlAction(2, 159, true);
    mp.game.controls.disableControlAction(2, 160, true);
    mp.game.controls.disableControlAction(2, 161, true);
    mp.game.controls.disableControlAction(2, 162, true);
    mp.game.controls.disableControlAction(2, 163, true);
    mp.game.controls.disableControlAction(2, 164, true);
    mp.game.controls.disableControlAction(2, 165, true);
    mp.game.controls.disableControlAction(2, 261, true);
    mp.game.controls.disableControlAction(2, 262, true);
    if (currentWeapon() != -1569615261) { // heavy attack controls
    mp.game.controls.disableControlAction(2, 140, true);
    mp.game.controls.disableControlAction(2, 141, true);
    mp.game.controls.disableControlAction(2, 143, true);
    mp.game.controls.disableControlAction(2, 263, true);
    }
});
}