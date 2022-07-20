{
function getClosestVehicle( position ) 
{
    try {
        let closest = 50;
        let closestVeh = null;

        mp.vehicles.forEachInStreamRange( v => {
            let dist =  mp.game.system.vdist( position.x, position.y, position.z, v.position.x, v.position.y, v.position.z );

            if( dist < closest ) {
                closest = dist;
                closestVeh = v;
            }
        } );

        return { distance: closest, vehicle: closestVeh };
    } catch( e ) { }
}

// G to ENTER + SHIFT + G to OUTER ENT script from GTAWorld

mp.game.controls.useDefaultVehicleEntering = false;
mp.keys.bind(71, false, () => 
{
    if (mp.players.local.vehicle === null && !mp.gui.cursor.visible && !chatStatus && Date.now() - lastChatToggle >= 500 && !menuToggled && 
        !scoreboardToggled)
    {
        const driverSeatId = -1; // CHANGE THIS AS THE DRIVER INDEX CHANGES
        const playerPos = mp.players.local.position;
        let closestVeh = getClosestVehicle(playerPos);

        if (closestVeh.distance > 5)
        {
            return;
        }

        let vehicle = closestVeh.vehicle;
        if (!vehicle) return;

        if (vehicle.isAVehicle()) 
        {
            if (vehicle.getVariable('Locked') !== undefined && vehicle.getVariable('Locked') === true) 
            {
                return; // No need to calc stuff, vehicle is locked.
            }
            if (mp.game.vehicle.isThisModelABike(vehicle.model)) 
            {
                if (vehicle.isSeatFree(0)) 
                {
                    mp.players.local.taskEnterVehicle(vehicle.handle, 5000, 0, 2.0, 1, 0);
                }
                return;
            }

            // Seat Bones (connected to the... leg bone)
            // const seatFrontDriver = vehicle.getBoneIndexByName('seat_dside_f');
            const seatRear = vehicle.getBoneIndexByName('seat_r');
            const seatFrontPassenger = vehicle.getBoneIndexByName('seat_pside_f');
            const seatRearDriver = vehicle.getBoneIndexByName('seat_dside_r');
            const seatRearDriver1 = vehicle.getBoneIndexByName('seat_dside_r1');
            const seatRearDriver2 = vehicle.getBoneIndexByName('seat_dside_r2');
            const seatRearDriver3 = vehicle.getBoneIndexByName('seat_dside_r3');
            const seatRearDriver4 = vehicle.getBoneIndexByName('seat_dside_r4');
            const seatRearDriver5 = vehicle.getBoneIndexByName('seat_dside_r5');
            const seatRearDriver6 = vehicle.getBoneIndexByName('seat_dside_r6');
            const seatRearDriver7 = vehicle.getBoneIndexByName('seat_dside_r7');
            const seatRearPassenger = vehicle.getBoneIndexByName('seat_pside_r');
            const seatRearPassenger1 = vehicle.getBoneIndexByName('seat_pside_r1');
            const seatRearPassenger2 = vehicle.getBoneIndexByName('seat_pside_r2');
            const seatRearPassenger3 = vehicle.getBoneIndexByName('seat_pside_r3');
            const seatRearPassenger4 = vehicle.getBoneIndexByName('seat_pside_r4');
            const seatRearPassenger5 = vehicle.getBoneIndexByName('seat_pside_r5');
            const seatRearPassenger6 = vehicle.getBoneIndexByName('seat_pside_r6');
            const seatRearPassenger7 = vehicle.getBoneIndexByName('seat_pside_r7');
    
            // Positions in world
            // const seatFrontDriverPosition = seatFrontDriver === -1 ? null : vehicle.getWorldPositionOfBone(seatFrontDriver);
            const seatRearPosition = seatRear === -1 ? null : vehicle.getWorldPositionOfBone(seatRear);
            const seatFrontPassengerPosition = seatFrontPassenger === -1 ? null : vehicle.getWorldPositionOfBone(seatFrontPassenger);
            const seatRearDriverPosition = seatRearDriver === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver);
            const seatRearDriver1Position = seatRearDriver1 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver1);
            const seatRearDriver2Position = seatRearDriver2 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver2);
            const seatRearDriver3Position = seatRearDriver3 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver3);
            const seatRearDriver4Position = seatRearDriver4 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver4);
            const seatRearDriver5Position = seatRearDriver5 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver5);
            const seatRearDriver6Position = seatRearDriver6 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver6);
            const seatRearDriver7Position = seatRearDriver7 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver7);
            const seatRearPassengerPosition = seatRearPassenger === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger);
            const seatRearPassenger1Position = seatRearPassenger1 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger1);
            const seatRearPassenger2Position = seatRearPassenger2 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger2);
            const seatRearPassenger3Position = seatRearPassenger3 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger3);
            const seatRearPassenger4Position = seatRearPassenger4 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger4);
            const seatRearPassenger5Position = seatRearPassenger5 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger5);
            const seatRearPassenger6Position = seatRearPassenger6 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger6);
            const seatRearPassenger7Position = seatRearPassenger7 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger7);
    
            // Get closest seat
            let closestFreeSeatNumber = -1;
            let seatIndex = driverSeatId;
            let closestSeatDistance = Number.MAX_SAFE_INTEGER;
            let calculatedDistance = null;
    
            // Inline Rear
            calculatedDistance = seatRearPosition === null ? null : calcDist(playerPos, seatRearPosition);
            seatIndex = seatRear === -1 ? seatIndex : seatIndex + 1;
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) 
            {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            // Side by Side vehicles
            calculatedDistance = seatFrontPassengerPosition === null ? null : calcDist(playerPos, seatFrontPassengerPosition);
            seatIndex = seatFrontPassenger === -1 ? seatIndex : seatIndex + 1;
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) 
            {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearDriverPosition === null ? null : calcDist(playerPos, seatRearDriverPosition);
            seatIndex = seatRearDriver === -1 ? seatIndex : seatIndex + 1;
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) 
            {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearPassengerPosition === null ? null : calcDist(playerPos, seatRearPassengerPosition);
            seatIndex = seatRearPassenger === -1 ? seatIndex : seatIndex + 1;
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) 
            {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            // Force inner seats before outer grab holds if shift not pressed
            calculatedDistance = seatRearDriver1Position === null ? null : calcDist(playerPos, seatRearDriver1Position);
            seatIndex = seatRearDriver1 === -1 ? seatIndex : seatIndex + 1; // 3

            if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) 
            {
                if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) 
                {
                    closestSeatDistance = calculatedDistance;
                    closestFreeSeatNumber = seatIndex;
                }
            }
    
            // Force inner seats before outer grab holds if shift not pressed
            calculatedDistance = seatRearPassenger1Position === null ? null : calcDist(playerPos, seatRearPassenger1Position);
            seatIndex = seatRearPassenger1 === -1 ? seatIndex : seatIndex + 1; // 4
            if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) 
            {
                if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) 
                {
                    closestSeatDistance = calculatedDistance;
                    closestFreeSeatNumber = seatIndex;
                }
            }
    
            // Force inner seats before outer grab holds if shift not pressed
            calculatedDistance = seatRearDriver2Position === null ? null : calcDist(playerPos, seatRearDriver2Position);
            seatIndex = seatRearDriver2 === -1 ? seatIndex : seatIndex + 1; // 5
            if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) 
            {
                if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) 
                {
                    closestSeatDistance = calculatedDistance;
                    closestFreeSeatNumber = seatIndex;
                }
            }
    
            // Force inner seats before outer grab holds if shift not pressed
            calculatedDistance = seatRearPassenger2Position === null ? null : calcDist(playerPos, seatRearPassenger2Position);
            seatIndex = seatRearPassenger2 === -1 ? seatIndex : seatIndex + 1; // 6
            if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) 
            {
                if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                    closestSeatDistance = calculatedDistance;
                    closestFreeSeatNumber = seatIndex;
                }
            }
    
            calculatedDistance = seatRearDriver3Position === null ? null : calcDist(playerPos, seatRearDriver3Position);
            seatIndex = seatRearDriver3 === -1 ? seatIndex : seatIndex + 1;
            
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearPassenger3Position === null ? null : calcDist(playerPos, seatRearPassenger3Position);
            seatIndex = seatRearPassenger3 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearDriver4Position === null ? null : calcDist(playerPos, seatRearDriver4Position);
            seatIndex = seatRearDriver4 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearPassenger4Position === null ? null : calcDist(playerPos, seatRearPassenger4Position);
            seatIndex = seatRearPassenger4 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearDriver5Position === null ? null : calcDist(playerPos, seatRearDriver5Position);
            seatIndex = seatRearDriver5 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearPassenger5Position === null ? null : calcDist(playerPos, seatRearPassenger5Position);
            seatIndex = seatRearPassenger5 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearDriver6Position === null ? null : calcDist(playerPos, seatRearDriver6Position);
            seatIndex = seatRearDriver6 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearPassenger6Position === null ? null : calcDist(playerPos, seatRearPassenger6Position);
            seatIndex = seatRearPassenger6 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearDriver7Position === null ? null : calcDist(playerPos, seatRearDriver7Position);
            seatIndex = seatRearDriver7 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            calculatedDistance = seatRearPassenger7Position === null ? null : calcDist(playerPos, seatRearPassenger7Position);
            seatIndex = seatRearPassenger7 === -1 ? seatIndex : seatIndex + 1;

            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
    
            if (closestFreeSeatNumber === -1) {
                return; // No closest passenger seat, single seater?
            }
    
            const lastAnimatableSeatOverrides = {
                [mp.game.joaat('journey')]: driverSeatId + 1,
                [mp.game.joaat('journey2')]: driverSeatId + 1
            };
    
            let lastAnimatableSeatIndex = driverSeatId + 3;

            if (lastAnimatableSeatOverrides[vehicle.model] !== undefined) {
                lastAnimatableSeatIndex = lastAnimatableSeatOverrides[vehicle.model];
            }
    
            if (closestFreeSeatNumber <= lastAnimatableSeatIndex) {
                // Normal Enter
                mp.players.local.taskEnterVehicle(vehicle.handle, 5000, closestFreeSeatNumber, 2.0, 1, 0);
            } else {
                // Warp Enter
                mp.game.invoke('0x9A7D091411C5F684', mp.players.local.handle, vehicle.handle, closestFreeSeatNumber);
            }
        }
    }
});


// Disable Idle-Cinematic camera (that focuses on random surroundings)

let IdleDate = new Date();
mp.events.add('render', () => {
    const dif = new Date().getTime() - IdleDate.getTime();
    const seconds = dif / 1000;

    if (Math.abs(seconds) > 29.5) {
        mp.game.invoke(`0xF4F2C0D4EE209E20`); //Clear Idle Timer
        IdleDate = new Date();
    }
});


// NoClip Script

var getNormalizedVector = function(vector) {
    var mag = Math.sqrt(
        vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );
    vector.x = vector.x / mag;
    vector.y = vector.y / mag;
    vector.z = vector.z / mag;
    return vector;
};

var getCrossProduct = function(v1, v2) {
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
};

var bindASCIIKeys = {
    Q: 69,
    E: 81,
    LCtrl: 17,
    Shift: 16,
};

var noClipCamera;
var shiftModifier = false;
var controlModifier = false;
var verySlowMult = 0.05;
var localPlayer = mp.players.local;

mp.events.add("ForceNoclip", (OnOrOff) => {
    isNoClip = OnOrOff;
    mp.game.ui.displayRadar(!isNoClip);
    if (isNoClip) {
      startNoClip();
    } else {
      stopNoClip();
    }
});


mp.events.addCommand("noclip_vsm", function (rate) {
    rate = Number(rate);

    if (rate < 0.01 || rate > 100.0) {
        pushMessageToChat("Invalid rate, must be between 0.01 - 100.0 (0.10 optimal)");
        return;
    }

    verySlowMult = rate;

    pushMessageToChat(`Very slow multiplier (LSHIFT + CTRL together) set to ${verySlowMult}.`);
});

mp.events.add("ToggleNoclip", () => {
    mp.events.callLocal("ForceNoclip", !isNoClip);
});
  
function startNoClip() 
{   
    var camPos = new mp.Vector3(
        localPlayer.position.x,
        localPlayer.position.y,
        localPlayer.position.z
    );
    var camRot = mp.game.cam.getGameplayCamRot(2);
    noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
    noClipCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    localPlayer.freezePosition(true);
    localPlayer.setInvincible(true);
    localPlayer.setVisible(false, false);
    localPlayer.setCollision(false, false);
}
  
function stopNoClip() 
{
    if (noClipCamera) {
      localPlayer.position = noClipCamera.getCoord();
      localPlayer.setHeading(noClipCamera.getRot(2).z);
      noClipCamera.destroy(true);
      noClipCamera = null;
    }
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    localPlayer.freezePosition(false);
    localPlayer.setInvincible(false);
    localPlayer.setVisible(true, false);
    localPlayer.setCollision(true, false);
}

mp.events.add('render', function() 
{
    if (!noClipCamera || mp.gui.cursor.visible) {
      return;
    }
    controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
    shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
    var rot = noClipCamera.getRot(2);
    var fastMult = 1;
    var slowMult = 1;
    if (shiftModifier) {
      fastMult = 3;
    } else if (controlModifier) {
      slowMult = 0.5;
    }

    if(shiftModifier && controlModifier)
    {
        fastMult = 1;
        slowMult = verySlowMult;
    }

    var rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    var rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    var leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
    var leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
    var pos = noClipCamera.getCoord();
    var rr = noClipCamera.getDirection();
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = rr.x * leftAxisY * fastMult * slowMult;
    vector.y = rr.y * leftAxisY * fastMult * slowMult;
    vector.z = rr.z * leftAxisY * fastMult * slowMult;
    var upVector = new mp.Vector3(0, 0, 1);
    var rightVector = getCrossProduct(
      getNormalizedVector(rr),
      getNormalizedVector(upVector)
    );
    rightVector.x *= leftAxisX * 0.5 * slowMult;
    rightVector.y *= leftAxisX * 0.5 * slowMult;
    rightVector.z *= leftAxisX * 0.5 * slowMult;
    var upMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.Q)) {
      upMovement = 0.5;
    }
    var downMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.E)) {
      downMovement = 0.5;
    }

    mp.players.local.position = new mp.Vector3(
      pos.x + vector.x + 1,
      pos.y + vector.y + 1,
      pos.z + vector.z - 35
    );
    mp.players.local.heading = rr.z;
    noClipCamera.setCoord(
      pos.x - vector.x + rightVector.x,
      pos.y - vector.y + rightVector.y,
      pos.z - vector.z + rightVector.z + upMovement - downMovement
    );
    noClipCamera.setRot(
      rot.x + rightAxisY * -5.0,
      0.0,
      rot.z + rightAxisX * -5.0,
      2
    );
});  

// SKY CAMERA

const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
let gui;
let camSwitchNativeReturn = undefined;

let canManuallyResetCamera = false;

mp.events.add('moveSkyCamera', (moveTo, switchType, showGui, timeout = 1) => moveFromToAir(moveTo, switchType, showGui, timeout));
function moveFromToAir(moveTo, switchType, showGui, timeout = 1) {   
    if(mp.storage.data.menu.CameraSwitch != undefined && mp.storage.data.menu.CameraSwitch == false){
        return; // if it's toggled off, dont switch the camera!
    }
    /*
        switchType: 0 - 3

        0: 1 step towards ped
        1: 3 steps out from ped (Recommended)
        2: 1 step out from ped
        3: 1 step towards ped
    */
   setTimeout(() => {
        switch (moveTo) 
        {
            case 'up':
                    if (showGui == false) {
                        gui = 'false';
                        mp.events.callLocal("HideAllElementsExceptChat", false); // hide elements
                    };
                    focusChat(chatStatus);

                    canManuallyResetCamera = false;

                    mp.game.invoke(Natives.SWITCH_OUT_PLAYER, mp.players.local.handle, 0, parseInt(switchType));
                break;
            case 'down':
                    if (gui == 'false') {
                        checkCamInAir();
                    };
                    camSwitchNativeReturn = mp.game.invoke(Natives.SWITCH_IN_PLAYER, mp.players.local.handle);
                    
                    mp.gui.chat.push("~g~[HINT]~w~ If your camera is stuck in the air, you can now ~y~press CapsLock~w~ to manually reset it.");
                    mp.gui.chat.push("~g~[>]~w~ You have ~y~10 seconds~w~ to do this!");
                    canManuallyResetCamera = true;

                    setTimeout(() => { canManuallyResetCamera = false; }, 10000);
                break;
        
            default:
                break;
        }
    }, timeout);
}
mp.keys.bind(0x14, true, function() {
    if(!chatStatus) return;

    mp.gui.chat.push("~y~Resetting your camera manually....");
    mp.gui.chat.push("~r~NOTE: ~w~If you were bugged, please notify the developers about this, a log has automatically been sent.");
    
    canManuallyResetCamera = false;

    mp.game.invoke(Natives.SWITCH_IN_PLAYER, mp.players.local.handle);
    mp.events.callLocal("HideAllElementsExceptChat", true); // show em
    gui = 'true';

    if(UIHud != null && UIHud != undefined)
        UIHud.execute(`gm.hud = ${showHud};`);

    mp.events.callRemote("DebugLog_SendCameraStuckLog", (camSwitchNativeReturn == undefined ? "undefined" : camSwitchNativeReturn.toString()));
});

// Checks whether the camera is in the air. If so, then reset the timer
function checkCamInAir() {
    if (mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) 
    {
        mp.events.callLocal("HideAllElementsExceptChat", false); // hide elements
        focusChat(chatStatus);
        setTimeout(() => 
        {
            checkCamInAir();
        }, 400);
    } 
    else 
    {
        mp.events.callLocal("HideAllElementsExceptChat", true); // show em
        gui = 'true';

        if(UIHud != null && UIHud != undefined)
            UIHud.execute(`gm.hud = ${showHud};`);
    }
}

let GIF_FPS = 24;
let GIF_Duration = 1;
let GIF_Identifier = "null";

let GIF_CaptureQueue = [];
let GIF_Captured = [];

let GIF_Browser = null;
let GIF_FilesProcessed = 0;
let GIF_Files = [];

let GIF_Start = new Date();
let GIF_Working = 0;


mp.events.add("TakeGIF", (duration, identifier = "null", fps = 24) => {
    
    if(GIF_Working != 0) return;

    if(typeof FPS !== 'undefined' && fps >= FPS) fps = Math.round(FPS / 2.0);

    GIF_Captured = [];
    GIF_CaptureQueue = [];

    GIF_Files = [];
    GIF_Browser = null;
    GIF_FilesProcessed = 0;

    GIF_Duration = duration;
    GIF_FPS = fps;
    GIF_Identifier = identifier;

    let nextTimeout = 0;
    for(let i = 0; i < GIF_Duration*GIF_FPS; i++)
    {
        GIF_CaptureQueue.push(Date.now() + nextTimeout);
            
        nextTimeout = Math.round(nextTimeout + (1000 / GIF_FPS));    
    }

    GIF_Start = new Date();
    GIF_Working = 1;
});

mp.events.add(`GIFUploadResult`, (result, data) => {
    mp.events.callRemote(`GIFReceived`, result, data, GIF_Identifier);

    GIF_Browser.active = false;

    setTimeout(() => {
        GIF_Browser.destroy(); // Destroying right after was crashing the client, not sure why.
        GIF_Working = 0;
    }, 1000);
});

mp.events.add(`GIFVerifyFile`, (filename, result) => {
    GIF_FilesProcessed++;
    if(result == true) GIF_Files.push(filename);
});

mp.events.add('render', () => { // GIF::Main()

    if(GIF_Working >= 1)
    {
        if(GIF_Working == 1) // Step 1: Take all the screens
        {
            if(GIF_CaptureQueue.length > 0) // LEFT TO CAPTURE.
            {
                GIF_CaptureQueue.forEach((mark) => {
                    if(GIF_Captured.indexOf(GIF_CaptureQueue) == -1)
                    {
                        if(Date.now() >= mark)
                        {
                            let _fname = `${GIF_Start.getDate()}-${GIF_Start.getMonth()}-${GIF_Start.getFullYear()}+${GIF_Start.getHours()};${GIF_Start.getMinutes()};${GIF_Start.getSeconds()}+${Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("/", "_")}_${mark}.jpg`;
                            mp.gui.takeScreenshot(_fname, 0, 7, 99);
                            GIF_Captured.push(mark);
                        }
                    }
                });

                GIF_Captured.forEach((mark) => {
                    if(GIF_CaptureQueue.indexOf(mark) != -1) GIF_CaptureQueue.splice(GIF_CaptureQueue.indexOf(mark), 1);
                });
            }
            else GIF_Working = 2; // ALL CAPTURED
        }
        
        if(GIF_Working == 2) // Step 2: Verify and list the screens present
        {
            if(GIF_Browser == null)
            {
                GIF_Browser = mp.browsers.new(`package://Player/GIFFer.html`);
        
                GIF_Captured.forEach(mark => {
                    let _fname = `${GIF_Start.getDate()}-${GIF_Start.getMonth()}-${GIF_Start.getFullYear()}+${GIF_Start.getHours()};${GIF_Start.getMinutes()};${GIF_Start.getSeconds()}+${Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("/", "_")}_${mark}.jpg`;
                    
                    GIF_Browser.execute(`
                        if(fileExists("http://screenshots/${_fname}"))
                        {
                            mp.trigger("GIFVerifyFile", "${_fname}", true);
                        }
                        else mp.trigger("GIFVerifyFile", "${_fname}", false);
                    `);
                });
            }

            if(GIF_FilesProcessed >= GIF_Captured.length) // Processed only so if some screenshots didn't appear, they'll not jam the OP.
            {
                GIF_Working = 3;
            }
        }

        if(GIF_Working == 3) // Step 3: Upload the files with the respective identifier
        {
            GIF_Browser.execute(`images = [];`);
            
            GIF_Files.forEach(name => {
                GIF_Browser.execute(`
                    images.push(
                        {
                            name: "${name}",
                            url: "http://screenshots/${name}"
                        });
                `);
            });

            let _gifname = `${mp.players.local.name}_${GIF_Identifier}_${GIF_Start.getDate()}-${GIF_Start.getMonth()}-${GIF_Start.getFullYear()}+${GIF_Start.getHours()};${GIF_Start.getMinutes()};${GIF_Start.getSeconds()}+${Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("/", "_")}.gif`;
            //  uploadAllImages(uploadUrl, gifName, files, fps = 24)
            GIF_Browser.execute(`uploadAllImages("http://192.210.243.62/lsccv/gifuploader.php", "${_gifname}", images, ${GIF_FPS})`);

            GIF_Working = 4; // NOW WE WAIT...
        }
    }
});

// Check if holding sniper for the crosshair
let sniperHashes = [3342088282, 1785463520, 205991906, 177293209, 100416529];
function isHoldingSniper(){
    let returnValue = false;
    if(mp.players.local != undefined && mp.players.exists(mp.players.local)){
        if(mp.players.local.weapon != undefined){
            if(sniperHashes.includes(mp.players.local.weapon)){
                returnValue = true;
            }
        }
    }
    return returnValue;
}


// Screenshotter

let ssViewCEF = null;
let ssViewCursor = false;

mp.events.add('TakeScreenshot', (quality, compression, identifier = "null") => 
{
    let _fdate = new Date();
    let _fname = `${_fdate.getDate()}-${_fdate.getMonth()}-${_fdate.getFullYear()}+${_fdate.getHours()};${_fdate.getMinutes()};${_fdate.getSeconds()}+${Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("/", "_")}.jpg`;
    mp.gui.takeScreenshot(_fname, 0, quality, compression);
    let screenshotter_cef = mp.browsers.new("package://Player/Screenshotter.html");
    // function loadImage(name, url, event, identifier, uploadUrl)

    mp.events.add(`Screenshotter${_fdate.getMilliseconds()}`, (result, data, identifier) => {
        mp.events.callRemote(`ScreenshotReceived`, result, data, identifier);

        screenshotter_cef.active = false;

        setTimeout(() => {
            screenshotter_cef.destroy(); // Destroying right after was crashing the client, not sure why.
        }, 1000);
        mp.events.remove(`Screenshotter${_fdate.getMilliseconds()}`);
    });

    screenshotter_cef.execute(`
        loadImage("${mp.players.local.name};${identifier}+${_fname}", 
        "http://screenshots/${_fname}", 
        "Screenshotter${_fdate.getMilliseconds()}", 
        "${identifier}", 
        "https://phpscreenshotserver.ls-cc.info/imguploader.php");`);
});

mp.events.add("ViewScreenshot", (identifier) => {
    if(ssViewCEF != null)
    {
        ssViewCEF.destroy();
        ssViewCEF = null;
    }

    ssViewCEF = mp.browsers.new(`https://phpscreenshotserver.ls-cc.info/screenshots/${identifier}`);
});

mp.keys.bind(0x71, true, function() {
    if(ssViewCEF != null)
    {
        ssViewCursor = !ssViewCursor;
        mp.gui.cursor.show(ssViewCursor, ssViewCursor);
    }
});

mp.keys.bind(0x73, true, function() {
    if(ssViewCEF != null)
    {
        ssViewCEF.destroy();
        ssViewCEF = null;

        if(ssViewCursor)
        {
            ssViewCursor = false;
            mp.gui.cursor.show(ssViewCursor, ssViewCursor);
        }
    }
});

/////////////////////////////////////////////////////////

let operationType = 0; // 1: BOOT SHUT, 2: BOOT OPEN, 3: BONNET OPEN, 4: BONNET CLOSE

mp.game.streaming.requestAnimDict("veh@low@front_ps@enter_exit");
mp.game.streaming.requestAnimDict("rcmnigel3_trunk");
mp.game.streaming.requestAnimDict("rcmepsilonism8");

mp.keys.bind(0x4A, false, () => {

    if (!mp.players.local.isInAnyVehicle(false) && operationType == 0 
        && chatStatus == false && Date.now() - lastChatToggle >= 500 && !menuToggled && !scoreboardToggled && 
        !mp.players.local.isRagdoll())
    {
        let veh = getClosestVehicle(mp.players.local.position);

        if(veh === undefined) return;

        if(!mp.vehicles.exists(veh.vehicle) || veh.vehicle.handle === 0) return;
        if(veh.vehicle.getVariable("Locked") !== undefined && veh.vehicle.getVariable("Locked") == true)
        {
            if(mp.players.local.weapon != 0x84BD7BFD && mp.players.local.weapon != 2227010557) // Not crowbar
            {
                return;
            }
        }

        let sidebones = [
          "handle_dside_f",
          "handle_dside_r",
          "handle_pside_f",
          "handle_pside_r",
          "bonnet",
          "boot"
        ];

        let closestHandle = "";
        let closestDist = 100.0;
        sidebones.forEach((side) => {
            let bone = veh.vehicle.getBoneIndexByName(side);
            if(bone != -1)
            {
                let dist = calcDist(mp.players.local.position, veh.vehicle.getWorldPositionOfBone(bone));
                if(dist < closestDist)
                {
                    closestDist = dist;
                    closestHandle = side;
                }
            }
        });

        if(closestDist <= 3.5)
        {
            /*if(closestHandle == "handle_dside_f") // doors kinda buggy and bad
            {
                if(veh.vehicle.getDoorAngleRatio(0) >= 0.25)
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading());
                    mp.events.callRemote("play_anim", "veh@low@front_ds@enter_exit", "d_close_out", 48, 4.0, 0.0, 1000, 0.0, false, false, false);
                    mp.events.callRemote("Sync:DoorShut", veh.vehicle, 0, false);
        
                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");
                        mp.players.local.clearTasksImmediately();
                    }, 1250);
                }
                else 
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading() - 90.0);
                    mp.players.local.stopAnim()
                    mp.events.callRemote("play_anim", "veh@low@front_ds@enter_exit", "d_open_out", 48, 4.0, 0.0, 1000, 0.0, false, false, false);
                    mp.events.callRemote("Sync:DoorOpen", veh.vehicle, 0, false, false);
                    
                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");
                        mp.players.local.clearTasksImmediately();
                    }, 1250);
                }
            }
            else if (closestHandle == "handle_dside_r")
            {
                if(veh.vehicle.getDoorAngleRatio(2) >= 0.25)
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading());
                    mp.events.callRemote("play_anim", "veh@low@front_ds@enter_exit", "d_close_out", 48, 4.0, 0.0, 1000, 0.0, false, false, false);
                    mp.events.callRemote("Sync:DoorShut", veh.vehicle, 2, false);
                    
                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");
                        mp.players.local.clearTasksImmediately();
                    }, 1250);
                }
                else 
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading() - 90.0);
                    mp.events.callRemote("play_anim", "veh@low@front_ds@enter_exit", "d_open_out", 48, 4.0, 0.0, 1000, 0.0, false, false, false);
                    mp.events.callRemote("Sync:DoorOpen", veh.vehicle, 2, false, false);
                    
                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");
                        mp.players.local.clearTasksImmediately();
                    }, 1250);
                }
            }
            else if (closestHandle == "handle_pside_f")
            {
                if(veh.vehicle.getDoorAngleRatio(1) >= 0.25)
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading());
                    mp.events.callRemote("play_anim", "veh@low@front_ps@enter_exit", "d_close_out", 48, 4.0, 0.0, 1000, 0.0, false, false, false);
                    mp.events.callRemote("Sync:DoorShut", veh.vehicle, 1, false);
                    
                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");
                        mp.players.local.clearTasksImmediately();
                    }, 1250);
                }
                else 
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading() + 90.0);
                    mp.events.callRemote("play_anim", "veh@low@front_ps@enter_exit", "d_open_out", 48, 4.0, 0.0, 1000, 0.0, false, false, false);
                    mp.events.callRemote("Sync:DoorOpen", veh.vehicle, 1, false, false);
                    
                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");
                        mp.players.local.clearTasksImmediately();
                    }, 1250);
                }
            }
            else if (closestHandle == "handle_pside_r")
            {
                if(veh.vehicle.getDoorAngleRatio(3) >= 0.25)
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading());
                    mp.events.callRemote("play_anim", "veh@low@front_ps@enter_exit", "d_close_out", 48, 4.0, 0.0, 1000, 0.0, false, false, false);
                    mp.events.callRemote("Sync:DoorShut", veh.vehicle, 3, false);

                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");
                        mp.players.local.clearTasksImmediately();
                    }, 1250);
                }
                else 
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading() + 90.0);
                    mp.events.callRemote("play_anim", "veh@low@front_ps@enter_exit", "d_open_out", 48, 4.0, 0.0, 1000, 0.0, false, false, false);
                    mp.events.callRemote("Sync:DoorOpen", veh.vehicle, 3, false, false);

                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");
                        mp.players.local.clearTasksImmediately();
                    }, 1250);
                }
            }
            else */if (closestHandle == "bonnet")
            {
                if(veh.vehicle.getDoorAngleRatio(4) >= 0.25)
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading() - 180.0);
                    mp.events.callRemote("play_anim", "rcmepsilonism8", "bag_handler_close_trunk_walk_left", 48, 4.0, 0.0, 2500, 0.0, false, false, false);
                    operationType = 4;

                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");

                        if (mp.vehicles.exists(veh.vehicle) && veh.vehicle.handle !== 0)
                        {
                            mp.events.callRemote("Sync:DoorShut", veh.vehicle, 4, false);
                        }
                        operationType = 0;
                    }, 1250);
                }
                else 
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading() - 180.0);
                    mp.events.callRemote("play_anim", "rcmnigel3_trunk", "out_trunk_trevor", 48, 4.0, 0.0, 2500, 0.0, false, false, false);
                    operationType = 3;

                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");

                        if (mp.vehicles.exists(veh.vehicle) && veh.vehicle.handle !== 0)
                        {
                            mp.events.callRemote("Sync:DoorOpen", veh.vehicle, 4, false, false);
                        }
                        operationTimer = 0;
                        operationType = 0;
                    }, 750);
                }
            }
            else if (closestHandle == "boot")
            {
                if(veh.vehicle.getDoorAngleRatio(5) >= 0.25)
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading());
                    mp.events.callRemote("play_anim", "rcmepsilonism8", "bag_handler_close_trunk_walk_left", 48, 4.0, 0.0, 2500, 0.0, false, false, false);
                    operationType = 1;

                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");

                        if (mp.vehicles.exists(veh.vehicle) && veh.vehicle.handle !== 0)
                        {
                            mp.events.callRemote("Sync:DoorShut", veh.vehicle, 5, false);
                        }
                        operationType = 0;
                    }, 1250);
                }
                else 
                {
                    mp.players.local.setHeading(veh.vehicle.getHeading());
                    mp.events.callRemote("play_anim", "rcmnigel3_trunk", "out_trunk_trevor", 48, 4.0, 0.0, 2500, 0.0, false, false, false);
                    operationType = 2;

                    setTimeout(() => {
                        mp.events.callRemote("clear_anim");

                        if (mp.vehicles.exists(veh.vehicle) && veh.vehicle.handle !== 0)
                        {
                            mp.events.callRemote("Sync:DoorOpen", veh.vehicle, 5, false, false);
                        }
                        operationType = 0;
                    }, 750);
                }
            }
        }     
    }
});
}