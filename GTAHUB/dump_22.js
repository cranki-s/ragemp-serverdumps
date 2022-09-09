{
let player = mp.players.local,
    vehMaxSpeed,
    vehMaxSpeedKm,
    vehClass,
    cruiseControl,
    input,
    vehColission,
    km = 3.6,
    toggleKey = 0x4B, // Q
    addKey = 0x6B, // +
    substractKey = 0x6D, //-
    disableKey = [0x53, 0x57], //W & S
    forceSpeed = 0;

mp.rpc("cruisecontrol:set_max_speed", (maxSpeed) => {
    forceSpeed = maxSpeed;

    if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) {
        player.vehicle.setMaxSpeed(forceSpeed / km);
        cruiseControl = false;
        vehColission = false;
    }
});

mp.events.add("playerEnterVehicle", (vehicle, seat) => {
    if (vehicle && seat === -1) {
        vehicle.setMaxSpeed(forceSpeed / km);
    }
});

mp.events.add("render", () => {
    if (cruiseControl) {
        if (player.vehicle && vehClass !== 16) {
            if (vehColission && vehMaxSpeedKm !== 0) {
                mp.game.graphics.notify(`~w~Freno de emergencia activado`);
                vehMaxSpeedKm = 0;
                vehMaxSpeed = 0;
                mp.game.audio.playSound(-1, "TIMER_STOP", "HUD_MINI_GAME_SOUNDSET", true, 0, true);
            }

            let speed = player.vehicle.getSpeed() * km;
            if (Math.trunc(speed) <= 5 && vehColission) {
                cruiseControl = false;
                vehColission = false;
            }

            let differenceSpeed = speed - vehMaxSpeedKm;
            let amount = (Math.abs(differenceSpeed) / 1.7) > 1.0 ? 1.0 : (Math.abs(differenceSpeed) / 1.7)

            let going = player.vehicle.getSpeedVector(true);
            if (differenceSpeed < 0) mp.game.controls.setControlNormal(27, 71, amount); // Speed up
            else if (differenceSpeed > 0 && going.y > 0) mp.game.controls.setControlNormal(27, 72, amount);// Brake
            else if (differenceSpeed > 0 && going.y < 0) mp.game.controls.setControlNormal(27, 71, amount); // Speed up because is in reverse
            if (player.vehicle.hasCollidedWithAnything() || player.vehicle.isInAir()) vehColission = true; // Emergency brake enabled

        } else if (!player.vehicle) cruiseControl = false;
    }
});

function isValidVehicle(vehClass) {
    switch (vehClass) {
        case 13: return false; //Cycles
        case 15: return false; //Helicopters
        default: return true;
    }
}

mp.keys.bind(toggleKey, true, function () {
    if (mp.gui.cursor.visible || forceSpeed) return;
    if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) {
        vehClass = player.vehicle.getClass();
        if (!isValidVehicle(vehClass)) return;
        if (!cruiseControl) {
            vehMaxSpeed = player.vehicle.getSpeed();
            vehMaxSpeedKm = Math.trunc(vehMaxSpeed * km);

            let going = player.vehicle.getSpeedVector(true);
            if(going.y < 0) return;

            if (vehMaxSpeedKm <= 5) return;
            mp.game.graphics.notify(`~w~Velocidad crucero activada a ~b~${vehMaxSpeedKm} km/h`);
            cruiseControl = true;
            vehColission = false;

            // Airplanes
            if (vehClass === 16) {
                player.vehicle.setMaxSpeed(vehMaxSpeed);
            }
        } else {
            cruiseControl = false;

            // Airplanes
            if (vehClass === 16) {
                let maxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(player.vehicle.model);
                player.vehicle.setMaxSpeed(maxSpeed);
            }
        }
    }
});

mp.keys.bind(disableKey[0], true, function () {
    if (mp.gui.cursor.visible) return
    if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle && player.vehicle.getClass() !== 16 && cruiseControl) {
        cruiseControl = false;
    }
});

mp.keys.bind(disableKey[1], true, function () {
    if (mp.gui.cursor.visible) return
    if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle && player.vehicle.getClass() !== 16 && cruiseControl) {
        cruiseControl = false;
    }
});

mp.keys.bind(addKey, true, function () {
    if (mp.gui.cursor.visible) return
    if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) {
        vehClass = player.vehicle.getClass()
        if (!isValidVehicle(vehClass)) return;
        if (cruiseControl) {
            vehMaxSpeedKm += 5
            vehMaxSpeed = vehMaxSpeedKm / km
            mp.game.graphics.notify(`~w~Velocidad crucero aumentada ~b~+5 km/h`);

            if (player.vehicle.getClass() === 16) {
                player.vehicle.setMaxSpeed(vehMaxSpeed);
            }
        }
    }
});

mp.keys.bind(substractKey, true, function () {
    if (mp.gui.cursor.visible) return
    if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) {
        vehClass = player.vehicle.getClass();
        if (!isValidVehicle(vehClass)) return;
        if (cruiseControl) {
            if (vehMaxSpeed - 5 < 0) return cruiseControl = false;

            vehMaxSpeedKm -= 5
            vehMaxSpeed = vehMaxSpeedKm / km
            mp.game.graphics.notify(`~w~Velocidad crucero reducida ~b~-5 km/h`);

            if (player.vehicle.getClass() === 16) {
                player.vehicle.setMaxSpeed(vehMaxSpeed);
            }
        }
    }
});
}