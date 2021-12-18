{
let lastInteract = 0,
    aduty = false,
    toggleMouse = false,
    isInHotKeyAction = false,
    chatOpened = false,
    repairKey = false,
    chatVisible = false,
    lidoor = false,
    pasteKey = false,
    adutyKey = false,
    waterveh = false;
ekey = false;
doorcontrol = false;
hudOn = false;
adnimBrowser = false;

function canInteract() {
    return lastInteract + 3000 < Date.now()
}

mp.events.add("playerCreateWaypoint", (position) => {
    mp.game1.ui.setNewWaypoint(position.x, position.y);
});

mp.game1.interior.enableInteriorProp(247041, "meth_lab_upgrade");
mp.game1.interior.enableInteriorProp(247041, "meth_lab_production");
mp.game1.interior.enableInteriorProp(247041, "meth_lab_security_high");
mp.game1.interior.enableInteriorProp(247041, "meth_lab_setup");
mp.game1.interior.enableInteriorProp(247041, "meth_lab_empty");
mp.game1.interior.refreshInterior(247041);
mp.game1.streaming.requestIpl("bkr_biker_interior_placement_interior_2_biker_dlc_int_ware01_milo");

mp.events.add('startscreenfx', (effectName, duration, looped) => {
    mp.game.graphics.startScreenEffect(effectName, duration, looped);
});

mp.events.add('stopscreenfx', (effectName) => {
    mp.game.graphics.stopScreenEffect(effectName);
});

mp.events.add("render", () => {
    if (lidoor == true) return;
    mp.game.object.doorControl(-1425071302, -1046.516, -229.3581, 39.43794, true, 0.0, 0.0, 0.0);
    mp.game.object.doorControl(1104171198, -1045.12, -232.004, 39.43794, true, 0.0, 0.0, 0.0);
    mp.game.object.doorControl(-495720969, -1055.958, -236.4251, 44.171, true, 0.0, 0.0, 0.0);
    if (doorcontrol == true) return;
    //Hinter Eingang
    mp.game.object.doorControl(-1679881977, -1083.62, -260.4166, 38.1867, true, 0.0, 0.0, 0.0);
    mp.game.object.doorControl(-1045015371, -1080.974, -259.0203, 38.1867, true, 0.0, 0.0, 0.0);
    //Seiten EIngang
    mp.game.object.doorControl(-340230128, -1042.518, -240.6915, 38.11796, true, 0.0, 0.0, 0.0);

});

mp.events.add("Client:Rob:boom", () => {
    mp.game.fire.addExplosion(-1045.12, -232.004, 39.43794, 2, 8, true, true, 5);
});

mp.events.add("Client:Rob:alldooropen", () => {
    doorcontrol = true;
    //Hinter Eingang
    mp.game.object.doorControl(-1679881977, -1083.62, -260.4166, 38.1867, false, 0.0, 0.0, 0.0);
    mp.game.object.doorControl(-1045015371, -1080.974, -259.0203, 38.1867, false, 0.0, 0.0, 0.0);
    //Seiten EIngang
    mp.game.object.doorControl(-340230128, -1042.518, -240.6915, 38.11796, false, 0.0, 0.0, 0.0);
});

mp.events.add("Client:Rob:openDoor", (boolean) => {
    lidoor = boolean;
    mp.game.object.doorControl(-1425071302, -1046.516, -229.3581, 39.43794, true, 0.0, -50.0, -50.0);
    mp.game.object.doorControl(1104171198, -1045.12, -232.004, 39.43794, true, 0.0, 50.0, 50.0);

});

mp.events.add("Client:Rob:openTresorDoor", (boolean) => {
    lidoor = boolean;
    mp.game.object.doorControl(-495720969, -1055.958, -236.4251, 44.171, true, 0.0, -50.0, -50.0);

});

mp.events.add("Client:Rob:resetdoor", (boolean) => {
    lidoor = boolean;
});

mp.events.add("Client:Mukke:start", (SoundName, SoundSetName) => {
    mp.game.audio.playSound(-1, SoundName, SoundSetName, true, 0, true);
});

mp.events.add("Client:Alarm:start", (alarmName, p2) => {
    mp.game.audio.startAlarm(alarmName, p2);
});

mp.events.add("Client:WeaponComp:set", (weapon, weaponcomp) => {
    mp.events.callRemote("ServerJS:WeaponComp:setcomp", weapon, weaponcomp);
});

mp.events.add("Client:WeaponComp:reeemove", (weapon) => {
    mp.events.callRemote("ServerJS:remallcomps", weapon);
});

mp.events.add("Client:WeaponComp:removeALL", () => {
    mp.events.callRemote("ServerJS:WeaponComp:removeALL");
});

mp.events.add("Client:WeaponComp:remove", (player, weaponHash) => {
    mp.events.callRemote("ServerJS:WeaponComp:removeweaponComp", player, weaponHash);
});

mp.events.add("Client:WeaponAllComp:set", (weapon, weaponcomp1, weaponcomp2, weaponcomp3, weaponcomp4, weaponcomp5, weaponcomp6, weaponcomp7, weaponcomp8, weaponcomp9) => {
    mp.events.callRemote("ServerJS:WeaponComp:setallcomp", weapon, weaponcomp1, weaponcomp2, weaponcomp3, weaponcomp4, weaponcomp5, weaponcomp6, weaponcomp7, weaponcomp8, weaponcomp9);
});


mp.game.ui.setHudColour(143, 218, 0, 0, 180);

mp.nametags.enabled = false;

mp.events.add("changeChatState", (state) => {
    chatOpened = state;
});

mp.keys.bind(0x45, false, function() {
    if (mp.gui.cursor.visible || chatOpened || !canInteract) return;
    if (lastInteract + 3000 > Date.now()) {
        if (!mp.players.local.vehicle) mp.gui.chat.push("Spamschutz! Warte 3 Sekunden.");
        lastInteract = Date.now();
        return;
    }
    lastInteract = Date.now();
    mp.events.callRemote("Server:Keyhandler:pressE");
});

//Vanish
mp.keys.bind(0x75, false, function() {
    if (adutyKey) return;
    adutyKey = true;
    mp.events.callRemote("Server:Admin:toggleVanish");
    setTimeout(() => {
        adutyKey = false;
    }, 5000);
});

//CHAT toggle
mp.keys.bind(0x21, false, function() {
    if (chatVisible) mp.gui.chat.show(true);
    else mp.gui.chat.show(false);
    chatVisible = !chatVisible;
});

//Key
mp.keys.bind(0x2D, false, function() {
    if (pasteKey) return;
    pasteKey = true;
    mp.events.callRemote("Server:Hotkey:GetInformation");
    setTimeout(() => {
        pasteKey = false;
    }, 5000);
});

mp.events.add("Client:Ped:createPeds", (pedArray) => {
    pedArray = JSON.parse(pedArray);
    for (var i in pedArray) {
        spawnPed(pedArray[i].pedModel, pedArray[i].pedPos.x, pedArray[i].pedPos.y, pedArray[i].pedPos.z, pedArray[i].pedRot.z)
    }
});

mp.events.add("Client:Ped:createDealerPed", (pedModel, pedPos, pedRot) => {
    spawnPed(pedModel, pedPos.x, pedPos.y, pedPos.z, pedRot.z)

});
//Heal
mp.keys.bind(0xBC, false, function() {
    if (!canInteract || isInHotKeyAction || mp.gui.cursor.visible || chatOpened) return;

    isInHotKeyAction = true;
    lastInteract = Date.now();
    mp.events.callRemote("Server:Hotkey:useFirstAidKit");
    setTimeout(() => {
        isInHotKeyAction = false;
    }, 4700);
});
//Weste
mp.keys.bind(0xBE, false, function() {
    if (!canInteract || isInHotKeyAction || mp.gui.cursor.visible || chatOpened) return;
    isInHotKeyAction = true;
    lastInteract = Date.now();
    mp.events.callRemote("Server:Hotkey:useVest");
    setTimeout(() => {
        isInHotKeyAction = false;
    }, 4700);
});

mp.events.add("Client:Freeze:setState", state => {
    mp.players.local.freezePosition(state);
});

function spawnPed(model, x, y, z, rotation) {
    mp.peds.new(mp.game.joaat(`${model}`), new mp.Vector3(x, y, z), rotation, 0, (streamPed) => {
        streamPed.setAlpha(255);
    });
}

mp.keys.bind(0x77, true, () => {
    toggleMouse = !toggleMouse;
    mp.gui.cursor.show(toggleMouse, toggleMouse);
});

mp.events.add("Client:Firing:state", state => {
    isInHotKeyAction = state;
});

mp.events.add("Client:Admin:setAdutyState", state => {
    aduty = state;
    if (aduty) {
        mp.game1.player.setInvincible(true);
    } else {
        mp.game1.player.setInvincible(false);
    }
});

mp.events.add('render', () => {
    if (mp.players.local.vehicle) {
        mp.game1.audio.setRadioToStationName("OFF");
        mp.game1.audio.setUserRadioControlEnabled(false);
    }
    if (waterveh == false && mp.players.local.vehicle) {
        if (mp.players.local.isInWater() == false) return;
        waterveh = true;
        var vehicle = mp.players.local.vehicle;
        mp.events.callRemote("Server:Vehicle:UnderWater", vehicle);
        setTimeout(() => {
            waterveh = false;
        }, 5000);
    }
    if (mp.players.local.isSprinting()) mp.game.player.restoreStamina(100);
    mp.game1.controls.disableControlAction(0, 243, true);
    mp.game1.player.setHealthRechargeMultiplier(0.0);
});

//G-Key Passenger
function calcDist(v1, v2) {
    return mp.game.system.vdist(
        v1.x,
        v1.y,
        v1.z,
        v2.x,
        v2.y,
        v2.z
    );
}

mp.game1.controls.useDefaultVehicleEntering = true;

mp.keys.bind(
    71,
    false,
    () => {
        if (mp.gui.cursor.visible) return;
        if (mp.players.local.vehicle === null || !mp.gui.cursor.visible) {
            let playerPos = mp.players.local.position;
            let vehHandle = mp.game.vehicle.getClosestVehicle(playerPos.x, playerPos.y, playerPos.z, 30, 0, 70);
            let vehicle = mp.vehicles.atHandle(vehHandle);

            if (vehicle !== null) {
                let seat_pside_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_pside_r"));
                let seat_pside_f = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_pside_f"));
                let seat_dside_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_dside_r"));
                let seat_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_r"));

                let distance = calcDist(playerPos, seat_pside_r);
                let seat = 2;
                if (vehicle.isSeatFree(0) && calcDist(playerPos, seat_pside_f) < distance) {
                    distance = calcDist(playerPos, seat_pside_f);
                    seat = 0;
                }
                if (vehicle.isSeatFree(1) && calcDist(playerPos, seat_dside_r) < distance) {
                    distance = calcDist(playerPos, seat_dside_r);
                    seat = 1;
                }
                if (vehicle.isSeatFree(3) && calcDist(playerPos, seat_r) < distance) {
                    seat = 3;
                }

                if (vehicle.isSeatFree(seat))
                    mp.players.local.taskEnterVehicle(vehHandle, 5000, seat, 2.0, 1, 0);
            }
        }
    }
);


mp.game1.streaming.removeIpl("fakeint");
mp.game1.streaming.requestIpl("shr_int");
mp.game1.streaming.requestIpl("imp_dt1_11_modgarage");
mp.game1.interior.enableInteriorProp(mp.game1.interior.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, "v_carshowroom"), "csr_beforeMission");
mp.game1.interior.enableInteriorProp(mp.game1.interior.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, "v_carshowroom"), "shutter_open");

/* Kill Messages */
let deathName = null,
    $language = "en";

mp.events.add("Client:Death:setKillerName", (death) => {
    let languageValue = mp.storage.data.language;
    if (languageValue == undefined)
        $language = "en";
    else $language = languageValue;
    deathName = death;
    setTimeout(() => {
        deathName = null;
    }, 5000);
});

const controlsIds = {
    F5: 327,
    W: 32, //232
    S: 33, //31, 219, 233, 268, 269
    A: 34, //234
    D: 35, //30, 218, 235, 266, 267
    Space: 321,
    LCtrl: 326,
    Shift: 16
};

global.fly = { flying: false, f: 2.0, w: 2.0, h: 2.0 };
global.gameplayCam = mp.cameras.new("gameplay");

mp.events.add("render", () => {
    if (aduty) {
        let controls = mp.game1.controls;
        let fly = global.fly;
        const direction = global.gameplayCam.getDirection();
        controlModifier = mp.keys.isDown(controlsIds.LCtrl);
        shiftModifier = mp.keys.isDown(controlsIds.Shift);
        var fastMult = 1;
        var slowMult = 1;
        if (shiftModifier) {
            fastMult = 3;
        } else if (controlModifier) {
            slowMult = 0.5;
        }
        if (controls.isControlJustPressed(0, controlsIds.F5)) {
            fly.flying = !fly.flying;

            const player = mp.players.local;
            player.freezePosition(fly.flying);

            if (!fly.flying &&
                !controls.isControlPressed(0, controlsIds.Space)) {
                let position = mp.players.local.position;
                position.z = mp.game1.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
                mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
            }

            mp.game1.graphics.notify(fly.flying ? "Fly: ~g~Aktiviert" : "Fly: ~r~Deaktiviert");
        } else if (fly.flying) {
            let updated = false;
            let position = mp.players.local.position;

            if (controls.isControlPressed(0, controlsIds.W)) {

                position.x += direction.x * fastMult * slowMult;;
                position.y += direction.y * fastMult * slowMult;;
                position.z += direction.z * fastMult * slowMult;;
                updated = true;
            } else if (controls.isControlPressed(0, controlsIds.S)) {

                position.x -= direction.x * fastMult * slowMult;;
                position.y -= direction.y * fastMult * slowMult;;
                position.z -= direction.z * fastMult * slowMult;;
                updated = true;
            } else {
                fly.f = 2.0;
            }

            if (controls.isControlPressed(0, controlsIds.A)) {


                position.x += (-direction.y) * fastMult * slowMult;;
                position.y += direction.x * fastMult * slowMult;;
                updated = true;
            } else if (controls.isControlPressed(0, controlsIds.D)) {
                if (fly.l < 8.0)
                    fly.l *= 1.05;

                position.x -= (-direction.y) * fastMult * slowMult;;
                position.y -= direction.x * fastMult * slowMult;;
                updated = true;
            } else {
                fly.l = 2.0;
            }

            if (controls.isControlPressed(0, controlsIds.Space)) {

                position.z += fastMult * slowMult;;
                updated = true;
            } else {
                fly.h = 2.0;
            }

            if (updated) {
                mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
            }
        }
    }

    if (deathName == null) return;
    if ($language == "en")
        mp.game1.graphics.drawText(`You killed ${deathName}.`, [0.5, 0.25], {
            font: 6,
            color: [255, 255, 255, 185],
            scale: [0.32, 0.32],
            outline: true
        });
    else if ($language == "de")
        mp.game1.graphics.drawText(`Du hast ${deathName} getoetet.`, [0.5, 0.25], {
            font: 6,
            color: [255, 255, 255, 185],
            scale: [0.32, 0.32],
            outline: true
        });
});

mp.events.add("Client:Vehicle:playerEnteredVehicle", (vehicle, multiplier) => {
    if (vehicle == undefined) return;
    vehicle.setEnginePowerMultiplier(multiplier);
    vehicle.setEngineTorqueMultiplier(1.5);
});

mp.keys.bind(0x72, true, function() {
    if (!canInteract || mp.gui.cursor.visible || chatOpened || !mp.players.local.vehicle) return;
    if (repairKey == true) {
        mp.gui.chat.push("Du kannst nur jede 30 Sekunden dein Fahrzeug reparieren!");
        return;
    }
    repairKey = true;
    mp.events.callRemote("VehcileRepair");
    setTimeout(() => {
        repairKey = false;
    }, 30000);
});

//Maske M
mp.keys.bind(0x4D, false, function() {
    if (!canInteract || mp.gui.cursor.visible || chatOpened) return;
    mp.events.callRemote("Server:User:Mask");
});

//Aduty
mp.keys.bind(0xBF, false, function() {
    if (mp.gui.cursor.visible) return;
    mp.events.callRemote("Server:Admin:Aduty");
});
//Hut H
mp.keys.bind(0x48, false, function() {
    if (!canInteract || mp.gui.cursor.visible || chatOpened) return;
    mp.events.callRemote("Server:Clothes:Hat");
});

mp.events.add('render', () => {
    mp.game1.weapon.unequipEmptyWeapons = true;
    mp.game1.controls.disableControlAction(2, 44, true);
    //mp.game.controls.disableControlAction(1, 142, true);
    //mp.game.player.setWeaponDamageModifier(0.4);
    mp.game1.ped.setAiWeaponDamageModifier(3.00);
    mp.players.local.setSuffersCriticalHits(false);
    mp.game1.controls.disableControlAction(1, 140, true);
    mp.game1.controls.disableControlAction(0, 140, true);
    mp.game1.controls.disableControlAction(0, 142, true);
    mp.game1.gameplay.setFadeOutAfterDeath(false);
});

    //disable AFK cam
setInterval(() => {
    mp.game1.invoke('0x9E4CFFF989258472');
    mp.game1.invoke('0xF4F2C0D4EE209E20');
}, 25000);

//vehicle multiplikator
mp.events.add('Client:Veh:Multiplier', (speed) => {
    if (mp.players.local.vehicle) {
        mp.players.local.vehicle.setEnginePowerMultiplier(speed)
    }
});

mp.events.add('Client:Veh:MaxSpeed', (maxspeed) => {
    if (mp.players.local.vehicle) {
        let vehicle = mp.players.local.vehicle
        let speed = (maxspeed / 3.6)
        vehicle.setMaxSpeed(speed)
            //mp.players.local.vehicle.setMaxSpeed(speed)
    }
});

//DISABLE_PLAYER_FIRING
mp.events.add("render", () => {
    if (isInHotKeyAction == true) {
        mp.game1.invoke("0x5E6CC07646BBEAB8", mp.players.local, isInHotKeyAction);
    }
});

//SET_PED_INFINITE_AMMO_CLIP
mp.events.add("Client:Aduty:InfiniteAmmo", state => {
    aduty = state;
    if (aduty) {
        mp.game1.invoke("0x183DADC6AA953186", mp.players.local.handle, true);
        mp.players.local.setConfigFlag(32, false);
    } else {
        mp.game1.invoke("0x183DADC6AA953186", mp.players.local.handle, false);
        mp.players.local.setConfigFlag(32, true);
    }
});

mp.events.add("VehStream_SetEngineStatus", (veh, status) => {
    if (veh !== undefined) {
        if (veh.isSeatFree(-1)) //Turns engine on instantly if no driver, otherwise it will not turn on
        {
            veh.setEngineOn(status, true, false);
            veh.setUndriveable(true);
        } else {
            veh.setEngineOn(status, false, true);
            veh.setUndriveable(!status);
        }
    }
});

mp.events.add("render", () => {
    if (mp.players.local.isSittingInAnyVehicle(true) && mp.players.local.vehicle && mp.players.local.weapon == mp.game.joaat("weapon_minismg")) {
        mp.game1.invoke("0x5E6CC07646BBEAB8", mp.players.local, true);
    }
});

//Disable Ambient Sounds
mp.game1.invoke(0xB4F90FAF7670B16F, false); //police reports in car
mp.game1.invoke(0x218DD44AAAC964FF, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", true, 0);
mp.game1.invoke(0x218DD44AAAC964FF, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", true, 0);
mp.game1.invoke(0x218DD44AAAC964FF, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", true, 0);
mp.game1.invoke(0xBDA07E5950085E46, 0, false, false);
mp.game1.invoke(0x1D6650420CEC9D3B, "AZ_DISTANT_SASQUATCH", 0, 0);
mp.game1.audio.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
mp.game1.audio.setAudioFlag("LoadMPData", true);
mp.game1.audio.setAudioFlag("DisableFlightMusic", true);

mp.events.add('Client:Vehicle:freeze', bool => {
    if (!mp.players.local.vehicle) return;
    mp.players.local.vehicle.freezePosition(bool);
});

mp.events.add('Client:Vehicle:light', state => {
    if (!mp.players.local.vehicle) return;
    mp.players.local.vehicle.setLights(state);
});

mp.events.add('Client:VehicleOut:freeze', (vehicle) => {
    if (vehicle == null) return;
    if (vehicle.getSpeed() < 5.55556) {
        vehicle.setForwardSpeed(0);
        vehicle.setEngineOn(false, false, true);
    }
});

mp.events.add('Client:Player:DisableWeapons', (bool) => {
    if (!mp.players.local) return;
    mp.players.local.setEnableHandcuffs(bool);
});

mp.events.add('Client:Player:SetHealth', (health) => {
    if (!mp.players.local) return;
    mp.players.local.setMaxHealth(health);
    mp.players.local.setHealth(health);
});
}