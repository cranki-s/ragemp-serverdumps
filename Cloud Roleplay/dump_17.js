{
let localPlayer = mp.players.local;
const camlocalPlayer = mp.players.local;
let bodyCam = null;
let bodyCamStart = null;

getCameraOffset = (pos, angle, dist) => {
    angle = angle * 0.0174533;
    pos.y = pos.y + dist * Math.sin(angle);
    pos.x = pos.x + dist * Math.cos(angle);
    return pos;
}

mp.events.add("client:setcam", (toggle) => {
    if (toggle) {
        bodyCamStart = camlocalPlayer.position;
        let camValues = { Angle: camlocalPlayer.getRotation(2).z + 90, Dist: 2.6, Height: 0.2 };
        let pos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
        bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
        bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
        bodyCam.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 500, true, false);
    } else {
        if (bodyCam == null) return;
        bodyCam.setActive(false);
        bodyCam.destroy();
        mp.game.cam.renderScriptCams(false, true, 500, true, true);

        bodyCam = null;
    }
    camlocalPlayer.taskPlayAnim("amb@world_human_guard_patrol@male@base", "base", 8.0, 1, -1, 1, 0.0, false, false, false);
});


mp.events.add("client:setcamflag", (flag) => {
    let camValues = { Angle: 0, Dist: 1, Height: 0.2 };
    switch (flag) {
        case 0: // Torso
            {
                camValues = { Angle: 0, Dist: 2.6, Height: 0.2 };
                break;
            }
        case 1: // Head
            {
                camValues = { Angle: 0, Dist: 1, Height: 0.5 };
                break;
            }
        case 2: // Hair / Bear / Eyebrows
            {
                camValues = { Angle: 0, Dist: 0.5, Height: 0.7 };
                break;
            }
        case 3: // chesthair
            {
                camValues = { Angle: 0, Dist: 1, Height: 0.2 };
                break;
            }
        case 4: //Foot
            {
                camValues = { Angle: 0, Dist: 1, Height: -0.75 };
                break;
            }
        case 5: // Torso Backk
            {
                camValues = { Angle: 180, Dist: 2.6, Height: 0.2 };
                break;
            }
        case 6: // Legs
            {
                camValues = { Angle: 0, Dist: 2.6, Height: -0.5 };
                break;
            }
        case 7: // Watch
            {
                camValues = { Angle: 0, Dist: 1, Height: -0.2 };
                break;
            }
    }
    const camPos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camlocalPlayer.getRotation(2).z + 90 + camValues.Angle, camValues.Dist);
    bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
});
}