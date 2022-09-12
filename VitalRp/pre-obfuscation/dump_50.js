{





var roadPoints = [new mp.Vector3(1151.5741, -461.946, 66.381), new mp.Vector3(1137.2549, -503.19867, 64.06794), new mp.Vector3(1084.7931, -515.0803, 62.403477), new mp.Vector3(1086.8903, -409.0738, 66.69465), new mp.Vector3(906.2852, -243.8856, 68.97265), new mp.Vector3(937.4542, -172.8393, 74.02401), new mp.Vector3(812.8467, -64.72672, 80.231415), new mp.Vector3(714.2663, 2.766332, 83.61597), new mp.Vector3(535.2228, 80.82265, 95.96698), new mp.Vector3(381.0821, 135.37164, 102.66832), new mp.Vector3(222.73329, 188.12436, 105.10268), new mp.Vector3(184.93987, 155.1334, 102.99558), new mp.Vector3(124.56249, -9.200807, 67.26384), new mp.Vector3(81.7207, -140.59476, 54.69967), new mp.Vector3(209.67795, -213.54907, 53.65976), new mp.Vector3(285.04987, -110.80555, 69.290245), new mp.Vector3(376.45685, -128.76288, 64.55059), new mp.Vector3(485.4969, -161.29286, 55.3484), new mp.Vector3(484.7737, -291.3495, 46.508278), new mp.Vector3(521.55774, -355.53946, 43.023148), new mp.Vector3(546.0603, -550.208, 44.971287), new mp.Vector3(751.74023, -658.16486, 37.091217), new mp.Vector3(862.4242, -739.4223, 41.795242), new mp.Vector3(1014.868, -825.50964, 47.69258), new mp.Vector3(1149.6626, -839.333, 54.156925), new mp.Vector3(1204.3438, -778.84863, 56.651546), new mp.Vector3(1255.3082, - 748.6008, 61.433403), new mp.Vector3(1266.2848, -561.52246, 68.53792), new mp.Vector3(1197.7434, -512.49005, 64.64919), new mp.Vector3(1210.4701, -390.232, 68.02545), new mp.Vector3(1152.8549, -356.73026, 66.69297), new mp.Vector3(1101.5411, -369.88364, 66.63919), new mp.Vector3(1065.8865, -501.90054, 62.369865), new mp.Vector3(1095.8558, -520.7116, 62.713814), new mp.Vector3(1137.8643, -504.16425, 64.06178), new mp.Vector3(1151.1703, -463.67694, 66.31957)]
let dmvColshapes = [];
let checkpoint = 0;
let school = false;

mp.events.add("createRoad", () => {

    for (var i = 1; i < roadPoints.length; i++) {
        dmvColshapes[i] = mp.colshapes.newSphere(roadPoints[i].x, roadPoints[i].y, roadPoints[i].z, 10.0, mp.players.local.dimension);
    }
    mp.events.call("blip_create_ext", "dmv", roadPoints[2], 2, 0.5, 315, true, "DMV Checkpoint");
    mp.events.call("blip_router_visible", "dmv", true, 60);
    checkpoint = 1;
    school = true;
});

mp.events.add('playerEnterColshape', (shape) => {
    if (shape === dmvColshapes[checkpoint]) {
        if (mp.players.local.vehicle && mp.players.local.vehicle.hasVariable("Asigned") && mp.players.local.vehicle.getVariable("Asigned") == mp.players.local.getVariable("character_sqlid")) {
            dmvColshapes[checkpoint].destroy();
            dmvColshapes[checkpoint] = null;

            checkpoint++;


            if (checkpoint === 18) speedLimit = 150;
            if (checkpoint === 23) speedLimit = 75;

            mp.events.call("blip_remove", "dmv");
            if (checkpoint === 35) {
                endTest();
            }
            else if (roadPoints[checkpoint + 1]) {
                mp.events.call("blip_create_ext", "dmv", roadPoints[checkpoint + 1], 2, 0.5, 315, true, "DMV Checkpoint");
                mp.events.call("blip_router_visible", "dmv", true, 60);

            }
        }
    }
});

mp.events.add("destroyDMVCheckpoints", ()=> {
    for (var i = 1; i < roadPoints.length; i++) {
        if (dmvColshapes[i]) {
            dmvColshapes[i].destroy();
            dmvColshapes[i] = null;
        }
    }
    mp.events.call("blip_remove", "dmv");
})



let speedLimit = 75;

let offRoadCounter = 0;
let offLaneCounter = 0;
let speedingCounter = 0;
let seatBeltCounter = 0;

function endTest() {
    school = false;
    let totalPoints = 100;
    if (offLaneCounter < 1000) offLaneCounter = 0;
    if (offRoadCounter < 1000) offRoadCounter = 0;
    if (speedingCounter < 1000) speedingCounter = 0;
    if (seatBeltCounter < 1000) seatBeltCounter = 0;
    pointsToDelete = (offLaneCounter * 0.01) + (offRoadCounter * 0.01) + (speedingCounter * 0.01) + (seatBeltCounter * 0.01);
    totalPoints = 100 - pointsToDelete; 
    mp.events.call("showDMVResults", totalPoints)
    mp.events.callRemote("proccessdmvtest", totalPoints)
}

function drawTestText(text) {
    mp.game.graphics.drawText(`${text}`, [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
        font: 4,
        color: [255, 255, 255, 220 - 20],
        scale: [0.40, 0.40],
        outline: true,
        shadow: true,
        centre: false
    });
}

function playerStartEnterVehicleHandler(player, vehicle, seat) {

    if (vehicle.hasVariable("Asigned") && vehicle.getVariable("Asigned") != mp.players.local.getVariable("character_sqlid")) return true;
}

mp.events.add("playerStartEnterVehicle", playerStartEnterVehicleHandler);

mp.events.add('render', () => {
    if (school) {
        if (mp.players.local.isInAnyVehicle(!1) && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) {
            let badlane = mp.game.invokeFloat('0xDB89591E290D9182', mp.players.local);
            let roadside = mp.game.pathfind.isPointOnRoad(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, mp.players.local.vehicle.handle);

            let speed = Math.round(mp.players.local.vehicle.getSpeed() * 3.6, 0);
            if (roadside != 1 && checkpoint > 1) {
                offRoadCounter++;
            }


            if (badlane == 0 && checkpoint > 1) {
                offLaneCounter++;
            }


            if (speed > speedLimit) {
                speedingCounter++;
            }
            if (!mp.players.local.hasVariable("seatbelt") || !mp.players.local.getVariable("seatbelt")) {
                if (speed > 10) {
                    seatBeltCounter++;
                }
            }
        }
        
    }
});
}