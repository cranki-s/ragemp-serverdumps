{
let drone = {
    stopAllScreenEffect: function()
    {
        mp.game.invoke('0xB4EDDC19532BFB85'); // ANIMPOSTFX_STOP_ALL

        mp.game.graphics.setNightvision(false);
        mp.game.graphics.setSeethrough(false);
        mp.game.graphics.setTimecycleModifierStrength(0);

        mp.game.graphics.setNoiseoveride(false);
        mp.game.graphics.setNoisinessoveride(0);

        mp.game.graphics.transitionFromBlurred(0);
    },

    enter: function() {
        isInDrone = true;
        mp.events.callRemote('startSpecMission');
    },
    exit: function() {
        isInDrone = false;
        vision_state = 0;
        mp.events.callRemote('stopSpecMission');
        drone.stopAllScreenEffect();
    },

    startOrEnd: function() {
        if (isInDrone)
            drone.exit();
        else
            drone.enter();
    },
    enterLspd: function(vId) {
        mp.events.callRemote('startSpecMissionLspd', vId);
    },
    exitLspd: function() {
        isInDrone = false;
        isLspd = false;
        vision_state = 0;
        mp.events.callRemote('stopSpecMissionLspd');
        stopAllScreenEffect();
    },
    enterSmall: function(vId) {
        mp.events.callRemote('startSpecMissionSmall', vId);
    },
    startOrEndLspd: function() {
        if (isInDrone)
            drone.exitLspd();
        else
            drone.enterLspd();
    },
    isDrone: function() {
        return isInDrone;
    },
    calculateDegSec: function(input, rcRate, gRate, expo) {
        let RPY_useRates = 1.0 - Math.abs(input) * gRate;
        let input2 = ((input*input*input)*expo + input*(1 - expo));
        return 200.0 / RPY_useRates * input2 * rcRate;
    },
    
    calculateDegSecPitch: function(inputP) {
        return drone.calculateDegSec(inputP, contRcRatePR, contRateP, contExpoPR);
    },
    
    calculateDegSecRoll: function(inputR) {
        return drone.calculateDegSec(inputR, contRcRatePR, contRateR, contExpoPR);
    },
    
    calculateDegSecYaw: function(inputY) {
        return drone.calculateDegSec(inputY, contRcRateY, contRateY, contExpoY);
    },
    
    vectorMag: function(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    },
    
    vectorNorm: function(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    },

    disableControls: function() {
        mp.game.controls.disableControlAction(0, 85, true);//Q
        mp.game.controls.disableControlAction(0,75,true);//F
		
		mp.game.controls.disableControlAction(2, 0, true);
        mp.game.controls.disableControlAction(0, 8, true);
        mp.game.controls.disableControlAction(0, 9, true);
        mp.game.controls.disableControlAction(0, 30, true);
        mp.game.controls.disableControlAction(0, 31, true);
        mp.game.controls.disableControlAction(0, 32, true);
        mp.game.controls.disableControlAction(0, 33, true);
        mp.game.controls.disableControlAction(0, 34, true);
        mp.game.controls.disableControlAction(0, 35, true);
        mp.game.controls.disableControlAction(0, 36, true);
        mp.game.controls.disableControlAction(0, 63, true);
        mp.game.controls.disableControlAction(0, 64, true);
        mp.game.controls.disableControlAction(0, 71, true);
        mp.game.controls.disableControlAction(0, 72, true);
        mp.game.controls.disableControlAction(0, 77, true);
        mp.game.controls.disableControlAction(0, 78, true);
        mp.game.controls.disableControlAction(0, 78, true);
        mp.game.controls.disableControlAction(0, 87, true);
        mp.game.controls.disableControlAction(0, 88, true);
        mp.game.controls.disableControlAction(0, 89, true);
        mp.game.controls.disableControlAction(0, 90, true);
        mp.game.controls.disableControlAction(0, 129, true);
        mp.game.controls.disableControlAction(0, 130, true);
        mp.game.controls.disableControlAction(0, 133, true);
        mp.game.controls.disableControlAction(0, 134, true);
        mp.game.controls.disableControlAction(0, 136, true);
        mp.game.controls.disableControlAction(0, 139, true);
        mp.game.controls.disableControlAction(0, 146, true);
        mp.game.controls.disableControlAction(0, 147, true);
        mp.game.controls.disableControlAction(0, 148, true);
        mp.game.controls.disableControlAction(0, 149, true);
        mp.game.controls.disableControlAction(0, 150, true);
        mp.game.controls.disableControlAction(0, 151, true);
        mp.game.controls.disableControlAction(0, 232, true);
        mp.game.controls.disableControlAction(0, 266, true);
        mp.game.controls.disableControlAction(0, 267, true);
        mp.game.controls.disableControlAction(0, 268, true);
        mp.game.controls.disableControlAction(0, 269, true);
        mp.game.controls.disableControlAction(0, 278, true);
        mp.game.controls.disableControlAction(0, 279, true);
        mp.game.controls.disableControlAction(0, 338, true);
        mp.game.controls.disableControlAction(0, 339, true);
        mp.game.controls.disableControlAction(0, 44, true);
        mp.game.controls.disableControlAction(0, 20, true);
        mp.game.controls.disableControlAction(0, 47, true);
    },

    keyPressToggleVision: function () {
        try {
            if (isInDrone) {
                if (vision_state === 0) {
                    mp.game.graphics.setNightvision(true);
                    vision_state = 1;
                }
                else if (vision_state === 1) {
                    mp.game.graphics.setNightvision(false);
                    mp.game.graphics.setSeethrough(true);
                    vision_state = 2;
                }
                else {
                    mp.game.graphics.setNightvision(false);
                    mp.game.graphics.setSeethrough(false);
                    vision_state = 0;
                }
                mp.game.audio.playSoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
            }
        }
        catch (e) {
    
        }
    },

    PlaySound: function(vehId, prefix, name, ref = "") {

        try {
            let veh = mp.vehicles.atRemoteId(vehId);
            if (veh !== undefined && mp.vehicles.exists(veh)) {
                /*if (vehicles.has(veh.remoteId, prefix + 'currentSound')) {
                    let sId = vehicles.get(veh.remoteId, prefix + 'currentSound');
                    mp.game.audio.stopSound(sId);
                    mp.game.audio.releaseSoundId(sId);
                    vehicles.reset(veh.remoteId, prefix + 'currentSound');
                }
                */
    
                let sId = mp.game.invoke('0x430386FE9BF80B45');
                //mp.game.invoke(methods.PLAY_SOUND_FROM_ENTITY, sId, name, veh.handle, ref, 0, 0);
                mp.game.audio.playSoundFromEntity(sId, name, veh.handle, ref, true, 0);
                //vehicles.set(veh.remoteId, prefix + 'currentSound', sId);
            }
        }
        catch (e) {
        }
    }
};

let isInDrone = false;
let isLspd = false;

//CONTROL
let contRcRatePR = 1.5;
let contRcRateY = 1.5;
let contExpoPR = 0.8;
let contExpoY = 0.8;
let contRateP = 0.5;
let contRateR = 0.5;
let contRateY = 0.3;

//

let maxSpeed = 13;
let speedSlowly = 0.1;
let currentSpeed = 0;
let currentSpeedZ = 0;
let speedOffset = 0.4;
let speedLeftRight = 0.9;
let vision_state = 0;

//

// admin cmd /drone
mp.events.add('client:StartAdminDrone', function () {
    if (!loggedin || localplayer.getVariable('IS_ADMIN') !== true) return;

    drone.enter();
});

// lspd use drone
mp.events.add('client:StartLSPDDrone', function () {
    if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true) return;
    
    drone.enterLspd();
});

// sync drone sound
mp.events.add("vSync:Sound", (vehId) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setAlpha(0);
            veh.setCanBeDamaged(false);
            veh.setInvincible(true);

            drone.PlaySound(veh.remoteId, 'drone', "Flight_Loop", "DLC_Arena_Drone_Sounds");
        }
    }
    catch (e) {

    }
});

// ESC (exit drone)
mp.keys.bind(0x1B, true, function() {
    if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true || global.menuOpened) return;

    if (isInDrone) {
        if (isLspd)
            drone.exitLspd();
        else
            drone.exit();
    }
});

// TAB (change cam effect)
mp.keys.bind(0x09, true, function() {
    if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true) return;

    if (isInDrone) {
        drone.keyPressToggleVision();
    }
});

mp.events.add('client:drone:status', (status) => {
    isInDrone = status;
    isLspd = status;
	mp.game.invoke(getNative("SET_FOLLOW_PED_CAM_VIEW_MODE"), 4);
	
	mp.events.call('showHUD', status);
});

mp.events.add('client:drone:status:hud', (status) => {
	mp.events.call('showHUD', status);
});

mp.events.add('client:drone:status:ped', (status) => {
	//В РАЗРАБОТКЕ
});

mp.events.add('playerLeaveVehicle', () => {
    if (!isInDrone)
        return;
    isInDrone = false;
    isLspd = false;
    vision_state = 0;
    drone.stopAllScreenEffect();
});

mp.events.add('render', () => {
    if (!isInDrone)
        return;
    try {
        let v = mp.players.local.vehicle;
        if (v) {

            drone.disableControls();

            let roll = v.getRoll();
            let pitch = v.getPitch();

            let isPressS = mp.game.controls.isDisabledControlPressed(0, 32); //S
            let isPressW = mp.game.controls.isDisabledControlPressed(0, 33); //W
            let isPressA = mp.game.controls.isDisabledControlPressed(0, 34); //A
            let isPressD = mp.game.controls.isDisabledControlPressed(0, 35); //D

            let inputPitch    = isPressS ? speedOffset : 0; //S
            let inputRoll     = isPressW ? speedOffset * -1 : 0; //W
            let inputYaw      = isPressA ? speedLeftRight : 0; //A
            let inputThrottle = isPressD ? speedLeftRight * -1 : 0; //D

            let hasColl = v.hasCollidedWithAnything();

            let offsetStop = 0;
            let offsetRotRoll = 0;
            let offsetRotYaw = 0;

            if (isPressS)
                offsetRotRoll = -0.6;
            if (isPressW)
                offsetRotRoll = 0.6;

            if (isPressA && (currentSpeed > 5 || currentSpeed < -5))
                offsetRotYaw = -2;
            if (isPressD && (currentSpeed > 5 || currentSpeed < -5))
                offsetRotYaw = 2;


            let zOffset = 0;
            let zOffsetStop = 0;
            if (mp.game.controls.isDisabledControlPressed(0, 44) && !hasColl) //Q
                zOffset = 0.004;
            if (mp.game.controls.isDisabledControlPressed(0, 20) && !hasColl) //Z
                zOffset = -0.004;

            if (!mp.game.controls.isDisabledControlPressed(0, 20) && !mp.game.controls.isDisabledControlPressed(0, 44) && !hasColl) {
                if (currentSpeedZ < -0.1)
                    zOffsetStop = 0.004;
                else if (currentSpeedZ > 0.1)
                    zOffsetStop = -0.004;
                else if (currentSpeedZ < 0)
                    zOffsetStop = 0.001;
                else if (currentSpeedZ > 0)
                    zOffsetStop = -0.001;
            }

            if (!isPressA && !isPressD) {
                if (v.getRotation(0).y < -1)
                    offsetRotYaw = 2;
                else if (v.getRotation(0).y > 1)
                    offsetRotYaw = -2;
                else if (v.getRotation(0).y < 0)
                    offsetRotYaw = 0.001;
                else if (v.getRotation(0).y > 0)
                    offsetRotYaw = -0.001;
            }

            if (!isPressS && !isPressW && currentSpeed !== 0) {
                if (currentSpeed < -1)
                    offsetStop = 0.05;
                else if (currentSpeed > 1)
                    offsetStop = -0.05;
                else if (currentSpeed < 0)
                    offsetStop = 0.001;
                else if (currentSpeed > 0)
                    offsetStop = -0.001;

                if (v.getRotation(0).x < -1)
                    offsetRotRoll = 0.6;
                else if (v.getRotation(0).x > 1)
                    offsetRotRoll = -0.6;
                else if (v.getRotation(0).x < 0)
                    offsetRotRoll = 0.001;
                else if (v.getRotation(0).x > 0)
                    offsetRotRoll = -0.001;
            }

            let yoff = inputPitch + inputRoll;
            let xoff = inputYaw + inputThrottle;

            currentSpeed += yoff + offsetStop;

            /*mp.game.graphics.drawText(`YO:${yoff}\nXO:${xoff}\nZO:${zOffset}\nRL:${offsetRotRoll}\nSPEED:${currentSpeed.toFixed(2)}\nSTOP:${offsetStop}`, [0.5, 0.005], {
                font: 7,
                color: [255, 255, 255, 255],
                scale: [0.4, 0.4],
                outline: true
            });*/

            if (v.isInWater())
                zOffset = 0.01;

            let speedOffsetZ = 0;
            if (currentSpeed > 1) {
                speedOffsetZ = zOffset + (v.getRotation(0).x / -200);
            }
            if (currentSpeed < -1) {
                speedOffsetZ = zOffset + (v.getRotation(0).x / 400);
            }

            currentSpeedZ += zOffset + zOffsetStop;
            if (currentSpeedZ > maxSpeed / 100)
                currentSpeedZ = maxSpeed / 100;
            if (currentSpeedZ < maxSpeed / -100)
                currentSpeedZ = maxSpeed / -100;

            if (maxSpeed < currentSpeed)
                currentSpeed = maxSpeed;
            if ((maxSpeed * -1 / 2) > currentSpeed)
                currentSpeed = (maxSpeed * -1 / 2);

            if (hasColl && currentSpeed > 5)
                currentSpeed = 5;
            /*if (hasColl && currentSpeedZ > 0.05)
                currentSpeedZ = 0.05;*/

            let newPos = v.getOffsetFromInWorldCoords(0, currentSpeed / 50, currentSpeedZ + speedOffsetZ);
            let heading = v.getRotation(0).z;

            //let vel = v.getVelocity();
            //v.setVelocity(vel.x, vel.y, 0);
            v.setVelocity(0, currentSpeed / 30, currentSpeedZ + (v.getRotation(0).x / - 100));

            let finalX = offsetRotRoll + v.getRotation(0).x;
            let finalY = offsetRotYaw + v.getRotation(0).y;

            if (finalX > 25)
                finalX = 25;
            if (finalX < -25)
                finalX = -25;

            if (finalY > 50)
                finalY = 50;
            if (finalY < -50)
                finalY = -50;

            v.setRotation(finalX, finalY, heading + xoff, 0, false);
            v.setCoordsNoOffset(newPos.x, newPos.y, newPos.z, true, true, true);
        }
    }
    catch (e) {

    }
});
}