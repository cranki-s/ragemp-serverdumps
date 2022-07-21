{
let GlobalDisable = false;
let vehicleStopped = false;
let vehicleStoppedOnOwn = false;
let diffToggle = false;

var lastRenderTimeFuel = null;
var lastRenderSpeed = 0;

var maxAccelerateDistance = 0.0;
var mediumAccelerateDistance = 0.0;
var normalAccelerateDistance = 0.0;
var noAccelerateDistance = 0.0;

let fuelDistance = 0.0;
let lastFuelDistance = 0.0;

let torque = 1.0;
let power = 1.0;

var AutoPilot = false;
var CruiseControl = false;

mp.events.add(
{
    "disable_fuel" : () => {
        GlobalDisable = !GlobalDisable;
        if(GlobalDisable)
            mp.gui.chat.push(`[DEBUG] Fuel disabled`);
        else 
            mp.gui.chat.push(`[DEBUG] Fuel enabled`);
    },
    "update_torque_power" : (amount, amount2) => {
        torque = amount;
        power = amount2;
    },

    "enable_autopilot_fuel" : (status) => {
        AutoPilot = status;
    },

    "enable_cruise_control" : (status) => {
        CruiseControl = status;
    },

    "update_miles_fuel" : (amount) => {
        fuelDistance += amount;
    },

    "get_debug_value" : (vehicle) => {
        let accelerating = vehicle.getAcceleration();
        var name = mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model)
        mp.events.callRemote('send_debug_value', accelerating,name);
    },

    "client_get_fuel": (vehicle = null) => {
        var player = mp.players.local;
        var veh;
        if(vehicle == null){
            veh = player.vehicle;
        }
        else{
            veh = vehicle;
        }

        if (veh !== null) {
            mp.events.callRemote('server_send_fuel', veh, maxAccelerateDistance, mediumAccelerateDistance, normalAccelerateDistance);
        
            /*mp.gui.chat.push(`[DEBUG] max: ${maxAccelerateDistance}`);
            mp.gui.chat.push(`[DEBUG] med: ${mediumAccelerateDistance}`);
            mp.gui.chat.push(`[DEBUG] nor: ${normalAccelerateDistance}`);
            mp.gui.chat.push(`[DEBUG] dec: ${noAccelerateDistance}`);*/
            //mp.gui.chat.push(`[DEBUG] distance: ${fuelDistance}`);
            maxAccelerateDistance = 0.0;
            mediumAccelerateDistance = 0.0;
            normalAccelerateDistance = 0.0;
            lastFuelDistance = 0.0;
            fuelDistance = 0.0;
        }
     },
});

function IsAerial(type){
    if(type == 15 || type == 16) return true;
    return false;
}

mp.events.add("render", () =>
{
	if(GlobalDisable)
		return;
	
    if(mp.players.local.vehicle != null)
    {
        if(mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle){

            //mp.players.local.vehicle.setEngineTorqueMultiplier(torque);
            //mp.players.local.vehicle.setEnginePowerMultiplier(power);

            let vehClass = mp.players.local.vehicle.getClass();
            let isControlAcceleratePressed = mp.game.controls.isControlPressed(0, 71); //accelerate
            let isControlBrakePressed = mp.game.controls.isControlPressed(0, 72); //brake
            let isControlHandbrakePressed = mp.game.controls.isControlPressed(0, 76); //handbrake

            let isControlAccelerateAerialPressed = mp.game.controls.isControlPressed(0, 87); //accelerate Helicopter/Plane
            
            if((vehClass >= 0 && vehClass <= 12) || (vehClass >= 14 && vehClass <= 20))
            {
                if((!IsAerial(vehClass) && isControlAcceleratePressed || isControlBrakePressed) || (IsAerial(vehClass) && isControlAccelerateAerialPressed) || AutoPilot || CruiseControl)
                {
                    let speed = mp.players.local.vehicle.getSpeed();
                    speed = Math.round(speed * 2.236936);

                    if(Date.now() >= lastRenderTimeFuel+1000){
                        /*let accelerating = mp.players.local.vehicle.getAcceleration();
                        mp.gui.chat.push(`[DEBUG] Acc: ${accelerating}`);*/

                        if(speed > 0){
                            if(speed >= lastRenderSpeed+8){
                                //Accelerating
                                //mp.gui.chat.push(`[DEBUG] You are accelerating FAST.`);
                                maxAccelerateDistance += fuelDistance-lastFuelDistance;
                            }
                            else if(speed >= lastRenderSpeed+3){
                                //Accelerating
                                //mp.gui.chat.push(`[DEBUG] You are accelerating.`);
                                mediumAccelerateDistance += fuelDistance-lastFuelDistance;
                            }
                            else if(speed >= lastRenderSpeed-3 && speed < lastRenderSpeed+3){
                                //mp.gui.chat.push(`[DEBUG] You are maintaining speed.`);
                                normalAccelerateDistance += fuelDistance-lastFuelDistance;
                            }
                            else if(speed < lastRenderSpeed-3){
                                //mp.gui.chat.push(`[DEBUG] You are lowering speed.`);
                                noAccelerateDistance += fuelDistance-lastFuelDistance;
                            }
                        }
                        lastFuelDistance = fuelDistance;
                        lastRenderSpeed = speed;
                        lastRenderTimeFuel = Date.now();
                    }
                }
            }

            /*if((vehClass >= 0 && vehClass <= 12) || vehClass === 18 || vehClass === 19 || vehClass === 20){
                if(speed < 1)
                {
                    vehicleStopped = true;
                }
                else
                {
                    vehicleStopped = false;
                    vehicleStoppedOnOwn = false;
                    diffToggle = false;
                }
                
                if((!isControlBrakePressed && mp.game.controls.isControlEnabled(0, 72)) && !isControlHandbrakePressed && vehicleStopped)
                {
                    vehicleStoppedOnOwn = true;
                    mp.players.local.vehicle.setBrakeLights(true);
                }
                
                if(vehicleStopped && !vehicleStoppedOnOwn && !mp.players.local.vehicle.isInBurnout() && !diffToggle)
                {
                    mp.players.local.vehicle.setBrakeLights(true);
                    mp.game.controls.disableControlAction(0, 72, true);
                }
                
                if((isControlAcceleratePressed && !isControlBrakePressed) || isControlHandbrakePressed)
                {
                    mp.players.local.vehicle.setBrakeLights(false);
                }
                
                if(mp.game.controls.isDisabledControlJustReleased(0, 72) && vehicleStopped)
                {
                    mp.game.controls.enableControlAction(0, 72, true);
                    diffToggle = true;
                }
            }*/
        }
    }
});
}