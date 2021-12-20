{
setTimeout(() => {
    mp.gui.chat.show(true)
}, 5000)

let bursttyres = 0;

mp.events.add("render", () => {
    if (mp.players.local.vehicle) {
        bursttyres = (mp.game.invoke("0xBA291848A0815CA9", mp.players.local.vehicle.handle, 5, false) +
            mp.game.invoke("0xBA291848A0815CA9", mp.players.local.vehicle.handle, 4, false) +
            mp.game.invoke("0xBA291848A0815CA9", mp.players.local.vehicle.handle, 1, false) +
            mp.game.invoke("0xBA291848A0815CA9", mp.players.local.vehicle.handle, 0, false))

        if (bursttyres >= 3) {
            mp.players.local.vehicle.setMaxSpeed(40 / 3.6)
        } else {
            mp.players.local.vehicle.setMaxSpeed(mp.players.local.vehicle.getModel() * 4)
        }

        mp.game.audio.setRadioToStationName("OFF")
        mp.players.local.setConfigFlag(429, true);
        // mp.gui.chat.push("t: " + mp.players.local.vehicle.getHeightAboveGround())
        // mp.gui.chat.push("t1: " + JSON.stringify(mp.players.local.vehicle.getRotation(5)))
        // mp.gui.chat.push("t: " + mp.players.local.vehicle.isInAir())
        // if (mp.players.local.vehicle.getEngineHealth() <= 400) {
        // }
    }
})

//Code2

mp.keys.bind(119, true, () => { // F8
    if (mp.players.local.vehicle) {
        if (mp.players.local.vehicle.isSirenOn()) {
            if (mp.players.local.vehicle.isSirenSoundOn()) {
                mp.events.callRemote("Server:Vehicle:ToggelSilentSiren", false);
                mp.players.local.vehicle.setSirenSound(true);
            } else {
                mp.events.callRemote("Server:Vehicle:ToggelSilentSiren", true);
                mp.players.local.vehicle.setSirenSound(false);
            }
        }
    }
})

mp.keys.bind(35, true, () => { //Ende
    if (mp.players.local.vehicle) {
        mp.events.callRemote("Server:Vehicle:ToggleIndicatorLights", 0)
        mp.players.local.vehicle.setIndicatorLights(1, false)
        mp.players.local.vehicle.setIndicatorLights(0, false)
    }
})

mp.keys.bind(37, true, () => { //Links
    if (mp.players.local.vehicle) {
        mp.events.callRemote("Server:Vehicle:ToggleIndicatorLights", 1)
        mp.players.local.vehicle.setIndicatorLights(1, true)
        mp.players.local.vehicle.setIndicatorLights(0, false)
    }
})

mp.keys.bind(39, true, () => { //Rechts
    if (mp.players.local.vehicle) {
        mp.events.callRemote("Server:Vehicle:ToggleIndicatorLights", 2)
        mp.players.local.vehicle.setIndicatorLights(1, false)
        mp.players.local.vehicle.setIndicatorLights(0, true)
    }
})

mp.keys.bind(38, true, () => { //Hoch
    if (mp.players.local.vehicle) {
        mp.events.callRemote("Server:Vehicle:ToggleIndicatorLights", 3)
        mp.players.local.vehicle.setIndicatorLights(1, true)
        mp.players.local.vehicle.setIndicatorLights(0, true)
    }
})

mp.events.add("render", () => {
    mp.vehicles.forEachInStreamRange(
        (vehicle) => {
            if (vehicle.getVariable("VEHICLE_SILENT_SIREN_ON") == true) {
                vehicle.setSirenSound(false);
            } else {
                vehicle.setSirenSound(true);
            }

            if (vehicle.getVariable("VEHICLE_INDICATOR_LIGHT_STATE") == 1) {
                mp.players.local.vehicle.setIndicatorLights(1, true)
                mp.players.local.vehicle.setIndicatorLights(0, false)
            }
            if (vehicle.getVariable("VEHICLE_INDICATOR_LIGHT_STATE") == 2) {
                mp.players.local.vehicle.setIndicatorLights(1, false)
                mp.players.local.vehicle.setIndicatorLights(0, true)
            }
            if (vehicle.getVariable("VEHICLE_INDICATOR_LIGHT_STATE") == 3) {
                mp.players.local.vehicle.setIndicatorLights(1, true)
                mp.players.local.vehicle.setIndicatorLights(0, true)
            }
            if (vehicle.getVariable("VEHICLE_INDICATOR_LIGHT_STATE") == 0) {
                mp.players.local.vehicle.setIndicatorLights(1, false)
                mp.players.local.vehicle.setIndicatorLights(0, false)
            }
        }
    )
})

mp.events.add("entityStreamIn", (entity) => {
    if (entity != null && entity.type == 'vehicle') {
        if (entity.getVariable("VEHICLE_SILENT_SIREN_ON") == true) {
            entity.setSirenSound(false);
        } else {
            entity.setSirenSound(true);
        }

        if (entity.getVariable("IS_CAR_SHOP_VEHICLE") == true) {
            entity.freezePosition(true);
            entity.setInvincible(true);
        }

        if (entity.getVariable("VEHICLE_INDICATOR_LIGHT_STATE") == 1) {
            entity.setIndicatorLights(1, true)
            entity.setIndicatorLights(0, false)
        }
        if (entity.getVariable("VEHICLE_INDICATOR_LIGHT_STATE") == 2) {
            entity.setIndicatorLights(1, false)
            entity.setIndicatorLights(0, true)
        }
        if (entity.getVariable("VEHICLE_INDICATOR_LIGHT_STATE") == 3) {
            entity.setIndicatorLights(1, true)
            entity.setIndicatorLights(0, true)
        }
        if (entity.getVariable("VEHICLE_INDICATOR_LIGHT_STATE") == 0) {
            entity.setIndicatorLights(1, false)
            entity.setIndicatorLights(0, false)
        }
    }
});
}