{
let electricalChargingPoints = [{ x: 115.978035, y: 6554.6235, z: 31.091272 }, { x: 121.084946, y: 6549.3384, z: 31.091293 }];
let electricalChargingRot = [{ x: 0.0, y: 0.0, z: 44.80668 }, { x: 0.0, y: 0.0, z: 44.80668 }]


function initObjects() {
    electricalChargingPoints.forEach((pos, index) => {
        let build = mp.objects.new(mp.game.joaat("coil"), pos,
            {
                rotation: electricalChargingRot[index],
                alpha: 255,
                dimension: 0
            });
    })
}


initObjects();




/*const getgasPump = (range = 5.0) => {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    const res = mp.game.graphics.getScreenActiveResolution(1, 1);
    const secondPoint = mp.game.graphics.screen2dToWorld3d([res.x / 2, res.y / 2, (2 | 4 | 8)]);
    if (!secondPoint) return null;


    startPosition.z -= 0.3;
    const target = mp.raycasting.testCapsule(startPosition, secondPoint, 0.3, mp.players.local, 17);


    if (target && target.entity !== 0 && mp.game.invoke("0x7239B21A38F536BA", target.entity) && mp.game.invoke("0x8ACD366038D14505", target.entity) == 3) {
        return target;
    }
    else return null;

}

var raycast = null;
var canGrab = false;

mp.events.add({
    'render': () => {
        if (!mp.players.local.vehicle && !mp.gui.cursor.visible && !sitting) {
            raycast = getgasPump();
            let objpos = null;
            if (raycast) {
                objpos = mp.game.invokeVector3("0x3FEF770D40960D5A", raycast.entity, false)
                mp.game.invoke("0x9F47B058362C84B5", raycast.entity);
                if (raycast && fuelPumps.includes(mp.game.invoke("0x9F47B058362C84B5", raycast.entity)) && !mp.game.player.isFreeAiming() && mp.game.gameplay.getDistanceBetweenCoords(objpos.x, objpos.y, objpos.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 1) {
                    raycastMenuItems = [];
                    let text = "Grab fuel nozzle";
                    canGrab = true;
                    addRaycastMenuOption(text);
                    mp.game.graphics.drawText(displayRaycastMenu(), [objpos.x, objpos.y, objpos.z], {
                        font: 0,
                        color: [255, 255, 255, 255],
                        scale: [0.2, 0.2],
                        centre: true
                    });
                    raycastMenuOn = true;

                }
            }
            else {
                canGrab = false;
            }
        }
    }
});


mp.keys.bind(69, true, () => {

    if (sitting) {
        let pos = mp.game.invokeVector3("0x3FEF770D40960D5A", sitChair, false)
        let playerPos = mp.players.local.position;
        mp.players.local.taskStartScenarioAtPosition('PROP_HUMAN_SEAT_ARMCHAIR', 0, 0, (playerPos.z - pos.z) / 2, 180.0, 2, true, false);


        while (mp.players.local.isUsingScenario('PROP_HUMAN_SEAT_ARMCHAIR')) mp.game.wait(0)
        mp.players.local.clearTasks();
        sitting = false;
        sitChair = null;
    }
});*/
}