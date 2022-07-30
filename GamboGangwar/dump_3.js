{
mp.nametags.enabled = false;
globalThis.isAduty = false;

mp.events.add("Client:setAduty", state => {
    globalThis.isAduty = state;
    mp.nametags.enabled = state;
    mp.game.player.setInvincible(state);
});

mp.discord.update('Gambo Gangwar', 'discord.gg/gambogangwar');
mp.game.ui.setHudColour(143, 204, 0, 255, 180);

mp.events.add("playerSpawn", (player) => {
    player.setInvincible(true);
    player.setAlpha(100);
    player.setCanSwitchWeapon(false);

    setTimeout(() => {
        player.setCanSwitchWeapon(true);
        player.setInvincible(false);
        player.setAlpha(255);
    }, 1500);
});

let deathName = null;

mp.events.add("Client:Death:setKillerName", (death) => {
    deathName = death;
    setTimeout(() => {
        deathName = null;
    }, 5000);
});

mp.events.add('render', () => {
    mp.game.controls.disableControlAction(32, 140, true);
    mp.game.controls.disableControlAction(32, 141, true);
    mp.game.controls.disableControlAction(32, 142, true);

    if (mp.players.local.isUsingActionMode()) {
        mp.players.local.setUsingActionMode(false, -1, "-1");
    }

    if (mp.players.local.vehicle) {
        mp.game1.audio.setRadioToStationName("OFF");
        mp.game1.audio.setUserRadioControlEnabled(false);
    }
    mp.players.local.setSuffersCriticalHits(false);

    if (mp.players.local.isSprinting())
        mp.game1.player.restoreStamina(100);

    mp.game1.player.setHealthRechargeMultiplier(0.0);

    if (mp.players.local.isPerformingStealthKill())
        mp.players.local.clearTasksImmediately();

    if (deathName != null) {
        mp.game1.graphics.drawText(`Du hast ${deathName} getoetet.`, [0.5, 0.25], {
            font: 6,
            color: [255, 255, 255, 185],
            scale: [0.32, 0.32],
            outline: true
        });
    }
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
     if (!globalThis.isAduty) return;
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

mp.keys.bind(71, false, () => {
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
});
}