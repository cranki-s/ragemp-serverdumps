{
let Constants = require("./gtalife/WeaponFiringMode/constants.js")

let lockedData = {}
let localPlayer  = mp.players.local
let currentWeapon = localPlayer.weapon
let ignoreCurrentWeapon = Constants.isWeaponIgnored(currentWeapon)
let weaponConfig = {}
let lastWeaponConfigUpdate = 0
let curFiringMode = 0
let curBurstShots = 0


mp.events.add("render", () => {
    if (localPlayer.weapon != currentWeapon) {
        currentWeapon = localPlayer.weapon;
        ignoreCurrentWeapon = Constants.isWeaponIgnored(currentWeapon);

        curFiringMode = weaponConfig[currentWeapon] === undefined ? Constants.firingModes.Auto : weaponConfig[currentWeapon];

        if (curFiringMode == Constants.firingModes.Burst) {
            if (!Constants.canWeaponUseBurstFire(currentWeapon)) curFiringMode = Constants.firingModes.Auto;
        } else if (curFiringMode == Constants.firingModes.Single) {
            if (!Constants.canWeaponUseSingleFire(currentWeapon)) curFiringMode = Constants.firingModes.Auto;
        }

        if ((curFiringMode == Constants.firingModes.Auto || curFiringMode == Constants.firingModes.Burst) && (Constants.isWeaponSingleFireOnly(currentWeapon) && lockedData[currentWeapon])) curFiringMode = Constants.firingModes.Single;

        curBurstShots = 0;
    }

    if (ignoreCurrentWeapon) return;

    if (curFiringMode != Constants.firingModes.Auto) {
        if (curFiringMode == Constants.firingModes.Burst) {
            if (localPlayer.isShooting()) curBurstShots++;
            if (curBurstShots > 0 && curBurstShots < 3) mp.game.controls.setControlNormal(0, 24, 1.0);

            if (curBurstShots == 3) {
                mp.game.player.disableFiring(false);
                if (mp.game.controls.isDisabledControlJustReleased(0, 24)) curBurstShots = 0;
            }

            if (localPlayer.isReloading()) curBurstShots = 0;
        } else if (curFiringMode == Constants.firingModes.Single) {
            if (mp.game.controls.isDisabledControlPressed(0, 24)) mp.game.player.disableFiring(false);
        } else if (curFiringMode == Constants.firingModes.Safe) {
            mp.game.player.disableFiring(false);
            if (mp.game.controls.isDisabledControlJustPressed(0, 24)) mp.game.audio.playSoundFrontend(-1, "Faster_Click", "RESPAWN_ONLINE_SOUNDSET", true);
        }
    }

    if (mp.game.ui.isHudComponentActive(2) || Date.now() - lastWeaponConfigUpdate < 3000) {
        let safeZone = mp.game.graphics.getSafeZoneSize();
        let finalDrawX = 0.984 - (1.0 - safeZone) * 0.5;
        let finalDrawY = 0.025 + (1.0 - safeZone) * 0.5;
        if (Constants.isBoltAction(currentWeapon))
            Constants.drawTextAligned("BOLT", finalDrawX, finalDrawY, 4, Constants.firingModeColor[curFiringMode], .5);
        else if(Constants.isPumpAction(currentWeapon))
            Constants.drawTextAligned("PUMP", finalDrawX, finalDrawY, 4, Constants.firingModeColor[curFiringMode], .5);
        else
            Constants.drawTextAligned(Constants.firingModeNames[curFiringMode], finalDrawX, finalDrawY, 4, Constants.firingModeColor[curFiringMode], .5);
    }
});

mp.keys.bind(0x4D, false, () => {

	if (logged == 0 || chatopened  || cef_opened)
		return;

    if (ignoreCurrentWeapon) return;

    let newFiringMode = curFiringMode - 1;


    if (newFiringMode < Constants.firingModes.Auto) newFiringMode = Constants.firingModes.Single;


    if (newFiringMode == Constants.firingModes.Burst) {
        if (!Constants.canWeaponUseBurstFire(currentWeapon)) newFiringMode = Constants.firingModes.Auto;
    } else if (newFiringMode == Constants.firingModes.Single) {
        if (!Constants.canWeaponUseSingleFire(currentWeapon)) newFiringMode = Constants.firingModes.Auto;
    }

    if ((newFiringMode == Constants.firingModes.Auto || newFiringMode == Constants.firingModes.Burst) && (Constants.isWeaponSingleFireOnly(currentWeapon) || lockedData[currentWeapon])) newFiringMode = Constants.firingModes.Single;


    if (curFiringMode != newFiringMode) {
        mp.events.callRemote("OnPlayerFiringModeChange")
        curFiringMode = newFiringMode;
        curBurstShots = 0;
        lastWeaponConfigUpdate = Date.now();

        mp.game.audio.playSoundFrontend(-1, "Faster_Click", "RESPAWN_ONLINE_SOUNDSET", true);
        weaponConfig[currentWeapon] = curFiringMode;
        
        mp.gui.chat.push("You have switched your weapon-mode to " + Constants.firingModeNames[curFiringMode] + "!")

    }
});

mp.events.add("FiringMode::UpdateModes", function(data){
    if (data){
        let entries = data.split("|")
        entries.forEach((entry) => {
            let [weapon, mode] = entry.split("=")
            weapon = parseInt(weapon, 36)
            
            let unlocked = mode.includes("*")
            mode = parseInt(mode.replace("*", ""))

            lockedData[weapon] = unlocked
            weaponConfig[weapon] = mode 

            if (currentWeapon == weapon){
                curFiringMode = mode
                curBurstShots = 0;
                lastWeaponConfigUpdate = Date.now()
            }
        })
    }
})


mp.game.audio.setAudioFlag("LoadMPData", true);
}