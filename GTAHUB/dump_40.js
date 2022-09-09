{
/**
    melee: 2685387236
    Handguns: 416676503
    Submachine Gun: 3337201093
    Shotgun: 860033945
    Assault Rifle: 970310034
    Light Machine Gun: 1159398588
    Sniper: 3082541095
    Heavy Weapon: 2725924767
    Throwables: 1548507267
    Misc: 4257178988  
*/

const weaponsTypeToDisable = [416676503, 3337201093, 860033945, 970310034, 1159398588, 3082541095, 2725924767];

const player = mp.players.local;

mp.events.add("render", () => {

    let selectedWeapon = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); // GET_SELECTED_PED_WEAPON
    if (selectedWeapon !== -1569615261) {
        let typeOfWeapon = mp.game.weapon.getWeapontypeGroup(selectedWeapon); // Get type of weapon

        // check if current type of weapon need to be disabled, do it.
        if (weaponsTypeToDisable.includes(typeOfWeapon)) {
            let aiming = player.getConfigFlag(78, true)
            let shotting = player.isShooting();
            let reloading = player.isReloading();

            if (aiming || shotting || reloading) {
                mp.game.controls.disableControlAction(0, 22, true); //Space control
            }
        }
    }
});

}