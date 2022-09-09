{
let lastRadarInfo = {
    vehicle: null,
    speed: 0,
    distance: 0
}
let hideSpeedTimer;

mp.events.add("render", () => {

    // detect if player has radar gun in hand
    if (mp.players.local.weapon === 1193553863) {
        mp.game.controls.disableControlAction(0, 24, true); // fire
        if (mp.game.controls.isControlPressed(0, 25)) {
            let raycast = pointingAt(200);
            if (raycast && raycast.entity && raycast.entity.type === "vehicle") {
                let v = raycast.entity;
                mp.game.graphics.drawLine(v.position.x, v.position.y, v.position.z + 1, v.position.x, v.position.y, v.position.z + 3, 255, 255, 255, 255);
                let vehName = mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(v.model));
                let speedKm = (v.getSpeed() * 3.6).toFixed(0);
                if (speedKm > lastRadarInfo.speed || v !== lastRadarInfo.vehicle) {
                    lastRadarInfo.vehicle = v;
                    let lPos = mp.players.local.position;
                    let distance = mp.game.system.vdist(v.position.x, v.position.y, v.position.z, lPos.x, lPos.y, lPos.z);
                    showSpeed(speedKm, distance);
                }

                mp.game.graphics.drawText(`${vehName}\n${speedKm} km/h`, [v.position.x, v.position.y, v.position.z + 3.5], {
                    font: 0,
                    color: [255, 255, 255, 185],
                    scale: [0.2, 0.2],
                    outline: true
                });
            }
        }
    }
});

function pointingAt(distance) {
    const camera = mp.cameras.new("gameplay");
    let position = camera.getCoord();
    let direction = camera.getDirection();
    let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z));
    let result = mp.raycasting.testPointToPoint(position, farAway, null, 2);
    camera.destroy();

    return result; // and return the result ( undefined, if no hit )
}

function showSpeed(speed, distance) {
    browserCall("radargunVM", "toggle", true);
    browserExecute("radargunVM.speed = " + speed + ";");
    browserExecute("radargunVM.distance = " + distance.toFixed(0) + ";");
    clearTimeout(hideSpeedTimer);
    hideSpeedTimer = setTimeout(() => {
        browserCall("radargunVM", "toggle", false);
        hideSpeedTimer = null;
    }, 5000)
}
}