{
let planes = [
    mp.game.joaat("besra"),
    mp.game.joaat("hydra"),
    mp.game.joaat("lazer"),
    mp.game.joaat("pyro"),
    mp.game.joaat("strikeforce"),
    mp.game.joaat("akula"),
    mp.game.joaat("hunter"),
    mp.game.joaat("savage"),
    mp.game.joaat("annihilator2")
]

mp.events.add("render", () => {

    // if player is in compatible airplane
    if (mp.players.local.vehicle && planes.includes(mp.players.local.vehicle.model)) {
        let firstPerson = mp.game.invoke("0x8D4D46230B2C353A") === 4; // GET_FOLLOW_PED_CAM_VIEW_MODE
        if (firstPerson) {
            mp.vehicles.forEachInStreamRange(veh => {

                // check if veh is in air and is plane or helicopter
                if (mp.vehicles.exists(veh) && veh.handle && veh !== mp.players.local.vehicle && veh.isInAir()) {
                    if (veh.getClass() === 15 || veh.getClass() === 16) {
                        let altitudeFt = (veh.position.z * 3.281).toFixed(0);
                        let speedKt = (veh.getSpeed() * 1.944).toFixed(0);
                        let textInfo = `${veh.getNumberPlateText()}~n~${altitudeFt}ft~n~${speedKt}kt`
                        mp.game.graphics.drawText(textInfo, [veh.position.x, veh.position.y, veh.position.z], {
                            font: 2,
                            color: [175, 242, 119, 255],
                            scale: [0.25, 0.25],
                            outline: true
                        });
                    }
                }
            });
        }
    }
})
}