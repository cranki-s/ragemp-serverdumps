{
﻿var dirtt = null;
var lastdirt;

mp.game.vehicle.defaultEngineBehaviour = false;
function getNearestPlayerVehicleForSeatInRange(e) {
    const {
        x: a,
        y: i,
        z: n
    } = mp.players.local.position;
    let t = null,
        r = e;
    return mp.vehicles.forEachInStreamRange(e => {
        const o = mp.game.system.vdist(e.position.x, e.position.y, e.position.z, a, i, n);
        if (o < r) {
            const a = e.getModel();
            a != mp.game.joaat("boattrailer") && (t = e, r = o)
        }
    }), t
}
mp.keys.bind(70, !1, function() {
    if(isAttachToTrunkVeh){ mp.players.local.clearTasks(); return;}
    if (!mp.gui.cursor.visible && null == mp.players.local.vehicle) {
        if (7 !== mp.players.local.getScriptTaskStatus(2500551826)){ mp.players.local.clearTasks(); return;}
        const e = getNearestPlayerVehicleForSeatInRange(5);
        if(e.testdrive!=null){
            NewEvent.callRemote('TestDrive.Start', e.model>>0, e.col1, e.col2);
            return;
       }
        if (e && mp.vehicles.exists(e) && 5 > e.getSpeed()) {            
            if (e.isSeatFree(-1) || e.getPedInSeat(-1) == mp.players.local.handle || 0 == e.getPedInSeat(-1)) {
                mp.players.local.taskEnterVehicle(e.handle, 2500, -1, 1, 1, 0); return; 
            }
            for (let a = 0; a < e.getMaxNumberOfPassengers(); a++)
                if (e.isSeatFree(a)){
                    if(parseInt(e.getClass())==14) boatVehicle = e;
                     mp.players.local.taskEnterVehicle(e.handle, 5e3, a, 1, 1, 0); 
                     return;
                    }
        }
    }
});





mp.events.add("VehStream_EngineSound", (veh)=>{
    if (localplayer.isInAnyVehicle(false) && localplayer.vehicle.handle == veh.handle) {
        mp.gui.execute(`sound.sound='package://sound/engine_start.mp3'`);
    }
})

mp.events.add("VehStream_SetEngineStatus", (veh, status, lights, left, right) => {
    try {
        if (veh !== undefined) {
            veh.setEngineOn(status, status, !status);
			veh.setUndriveable(!status);
			if(lights) {
				if(left) veh.setIndicatorLights(1, true);
				else veh.setIndicatorLights(1, false);
				if(right) veh.setIndicatorLights(0, true);
				else veh.setIndicatorLights(0, false);
			}
            
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetSirenSound", (veh, status) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined && veh.getClass() == 18) veh.setSirenSound(status);
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetLockStatus", (veh, status) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined) {
                if (status) {
                    veh.setDoorsLocked(2);
					mp.game.audio.playSoundFromEntity(1, "Remote_Control_Close", veh.handle, "PI_Menu_Sounds", true, 0);
                } else {
                    veh.setDoorsLocked(1);
					mp.game.audio.playSoundFromEntity(1, "Remote_Control_Open", veh.handle, "PI_Menu_Sounds", true, 0);
				}
            }
        }
    } catch (e) { }
});


mp.events.add("VehStream_PlayerExitVehicleAttempt", (entity, enginestate) => {
	mp.events.call("VehStream_SetEngineStatus", entity, enginestate, false, false, false);
});

mp.events.add("VehStream_PlayerEnterVehicle", (entity, seat, enginestate) => {
	mp.events.call("VehStream_SetEngineStatus", entity, enginestate, false, false, false);
});
let isInFaggio = false;
mp.events.add("playerEnterVehicle", (entity, seat) => {
    try {
       /* if(mp.game.vehicle.getDisplayNameFromVehicleModel(entity.model) == "FAGGIO"){            
            isInFaggio = true;
            let speed = 90 / 3.6;
            mp.players.local.vehicle.setMaxSpeed(speed);
        }*/
        if (seat == 0) {
            lastdirt = entity.getDirtLevel();
            if (dirtt != null) clearInterval(dirtt);
            dirtt = setInterval(function () {
                dirtlevel(entity);
            }, 20000);

            if (entity.getVariable('BOOST') != undefined) {
                var boost = entity.getVariable('BOOST');
                entity.setEnginePowerMultiplier(boost);
                entity.setEngineTorqueMultiplier(boost);
            }
        }
    } catch (e) { }
});






mp.events.add("playerLeaveVehicle", (entity) => {
    try {
        if(isInFaggio == true){
            isInFaggio = false;
        }
        if (dirtt != null) {
            clearInterval(dirtt);
            dirtt = null;
        }
    } catch (e) { }
});



mp.events.add("VehStream_SetVehicleDoorStatus_Single", (veh, door, state) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined) {
                if (state === 0) {
                    veh.setDoorShut(door, false);
                }
                else if (state === 1) {
                    veh.setDoorOpen(door, false, false);
                }
                else {
                    veh.setDoorBroken(door, true);
                }
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetVehicleDoorStatus", (...args) => {
    try {
        if (args[0] && mp.vehicles.exists(args[0])) {
            if (args[0] !== undefined) {
                let y = 0;
                for (y = 1; y < args.length; y++) {
                    if (args[y] === 0) {
                        args[0].setDoorShut(y - 1, false);
                    }
                    else if (args[y] === 1) {
                        args[0].setDoorOpen(y - 1, false, false);
                    }
                    else {
                        args[0].setDoorBroken(y - 1, true);
                    }
                }
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_FixStreamIn", (entity, data) => {
    if(!entity) return;
    if (entity.type !== "vehicle") return;
    if (entity && mp.vehicles.exists(entity)) {
        let typeor = typeof entity.getVariable('VehicleSyncData');
        let actualData = entity.getVariable('VehicleSyncData');

        //Do it anyway
        setTimeout(() => {
            entity.getVariable("freezestatusboat") && (mp.game.invoke("0xE3EBAAE484798530", entity.handle, !0), mp.game.invoke("0x75DBEC174AEEAD10", entity.handle, !0));       
            mp.game.streaming.requestCollisionAtCoord(entity.position.x, entity.position.y, entity.position.z);
            entity.setLoadCollisionFlag(true);
            entity.trackVisibility();
            //Set doors unbreakable for a moment
            let x = 0;
            for (x = 0; x < 8; x++) {
                entity.setDoorBreakable(x, false);
            }
            entity.setUndriveable(true);  
        }, 100);            
        //Needed to stop vehicles from freaking out        
		//entity.setOnGroundProperly();  
	//	if(entity.getClass() == 18) entity.setSirenSound(entity.getVariable('SIRENSOUND'));
		
        if (typeor !== 'undefined') {
            actualData = JSON.parse(actualData);
            entity.setEngineOn(actualData.Engine, actualData.Engine, !actualData.Engine);
            entity.setUndriveable(true);
            entity.setDirtLevel(actualData.Dirt);

            if (actualData.Locked) entity.setDoorsLocked(2);
            else entity.setDoorsLocked(1);
			
			if(actualData.RightIL) entity.setIndicatorLights(0, true);
			else entity.setIndicatorLights(0, false);
			if(actualData.LeftIL) entity.setIndicatorLights(1, true);
			else entity.setIndicatorLights(1, false);
				
            for (x = 0; x < 8; x++) {
                if (actualData.Door[x] === 1)
                    entity.setDoorOpen(x, false, false);
                else if (actualData.Door[x] === 0)
                    entity.setDoorShut(x, true);
                else
                    entity.setDoorBroken(x, true);
            }
        }

        data = JSON.parse(data);
        entity.setNumberPlateText(data[0]);
        entity.setColours(data[1], data[2]);
        if (data[3] != null) {
            //mp.gui.chat.push('VehStream_FixStreamIn check');
            data = data[3];

            entity.setMod(4, data.Muffler);
            entity.setMod(3, data.SideSkirt);
            entity.setMod(7, data.Hood);
            entity.setMod(0, data.Spoiler);
            entity.setMod(6, data.Lattice);
            entity.setMod(8, data.Wings);
            entity.setMod(10, data.Roof);
            entity.setMod(48, data.Vinyls);
            entity.setMod(1, data.FrontBumper);
            entity.setMod(2, data.RearBumper);

            entity.setMod(11, data.Engine);
            entity.setMod(18, data.Turbo);
            entity.setMod(13, data.Transmission);
            entity.setMod(15, data.Suspension);
            entity.setMod(12, data.Brakes);
			if(data.Headlights >= 0) {
				entity.setMod(22, 0);
				SetHLColor(entity, entity.getVariable('hlcolor'));
			} else entity.setMod(22, data.Headlights);
            entity.setMod(14, data.Horn);

            entity.setWindowTint(data.WindowTint);

            entity.setCustomPrimaryColour(data.PrimColor.Red, data.PrimColor.Green, data.PrimColor.Blue);
            entity.setCustomSecondaryColour(data.SecColor.Red, data.SecColor.Green, data.SecColor.Blue);

            entity.setWheelType(data.WheelsType);
            entity.setMod(23, data.Wheels);
        }
    }
});

function dirtlevel(entity) {
    try {
        if (entity && mp.vehicles.exists(entity)) {
            if (localplayer.vehicle == entity && entity.getPedInSeat(-1) == localplayer.handle)
                mp.events.call("VehStream_GetVehicleDirtLevel", entity);
        }
        else {
            if (dirtt != null) {
                clearInterval(dirtt);
                dirtt = null;
            }
        }
    } catch (e) {
    }
};

mp.events.add("VehStream_SetVehicleDirtLevel", (entity, dirt) => {
    try {
        if (entity && mp.vehicles.exists(entity)) {
            if (entity !== undefined) {
                entity.setDirtLevel(dirt);
                if (entity.getPedInSeat(-1) == mp.players.local.handle) {
                    lastdirt = dirt;
                }
            }
        }
    } catch (e) {
    }
});
mp.events.add("VehStream_GetVehicleDirtLevel", (entity) => {
    try {
        if (entity && mp.vehicles.exists(entity)) {
            if (entity !== undefined) {
                if (entity.getPedInSeat(-1) == mp.players.local.handle) {
                    let curdirt = parseFloat(entity.getDirtLevel());
                    let raznica = parseFloat((curdirt - lastdirt));
                    if (raznica >= 0.01) {
                        raznica = raznica/3;
                        let newdirt = parseFloat((lastdirt + raznica));
                        if (newdirt > 15) newdirt = 15;
                        lastdirt = newdirt;
                        NewEvent.callRemote("VehStream_SetVehicleDirt", entity, newdirt);
                    }
                }
            }
        }
    } catch (e) {
    }
});
mp.events.addDataHandler("freezestatusboat", function(e, a) {
    0 === e.handle || (mp.game.invoke("0xE3EBAAE484798530", e.handle, a), mp.game.invoke("0x75DBEC174AEEAD10", e.handle, a))
});
//Sync data on stream in
mp.events.add("entityStreamIn", (entity) => {
    try {
        if (entity.type !== "vehicle") return;
        if (entity && mp.vehicles.exists(entity))
        {
            let typeor = typeof entity.getVariable('VehicleSyncData');
            let actualData = entity.getVariable('VehicleSyncData');
            // if(entity.hasVariable('freezestatusboat')){
            //     let freezestatus = entity.getVariable('freezestatusboat');
            //     entity.freezePosition(freezestatus);
            // }    
            setTimeout(() => {
                try{
                entity.getVariable("freezestatusboat") && (mp.game.invoke("0xE3EBAAE484798530", entity.handle, !0), mp.game.invoke("0x75DBEC174AEEAD10", entity.handle, !0));    
                }catch(e){}   
            }, 100);            
            //Needed to stop vehicles from freaking out
            mp.game.streaming.requestCollisionAtCoord(entity.position.x, entity.position.y, entity.position.z);
            entity.setLoadCollisionFlag(true);
            entity.trackVisibility();
            //Set doors unbreakable for a moment
            let x = 0;
            for (x = 0; x < 8; x++) {
                entity.setDoorBreakable(x, false);
            }
            entity.setUndriveable(true);            
            const a=entity.getVariable("colorType");
			if(a&&"0_0"!=a){
				const i=entity.getExtraColours(1,1),n=a.split("_");
				entity.setModColor1(parseInt(n[0]),0,0),
				entity.setModColor2(parseInt(n[1]),0),
				entity.setExtraColours(i.pearlescentColor,i.wheelColor)

			}
			
            if (typeor !== 'undefined') {
                actualData = JSON.parse(actualData);
				SetHLColor(entity, entity.getVariable('hlcolor'));
				entity.setEngineOn(actualData.Engine, actualData.Engine, !actualData.Engine);
                entity.setDirtLevel(actualData.Dirt);

                if (actualData.Locked) entity.setDoorsLocked(2);
                else entity.setDoorsLocked(1);
				
				if(actualData.RightIL) entity.setIndicatorLights(0, true);
				else entity.setIndicatorLights(0, false);
				if(actualData.LeftIL) entity.setIndicatorLights(1, true);
				else entity.setIndicatorLights(1, false);
            }
            else NewEvent.callRemote("VehStream_RequestFixStreamIn", entity);

        }
    } catch (e) { }
});

mp.events.add("VehStream_SetVehicleIndicatorLights_Single", (veh, light, state) => {
	try {
		if (veh && mp.vehicles.exists(veh)) {
			if (veh !== undefined) {
				if (light == 0) {
					if(state) veh.setIndicatorLights(0, true);
					else veh.setIndicatorLights(0, false);
				} else if(light == 1) {
					if(state) veh.setIndicatorLights(1, true);
					else veh.setIndicatorLights(1, false);
				}
			}
		}
	} catch (e) {
	}
});

mp.events.add("VehStream_SetVehicleIndicatorLights", (...args) => {
	try {
		if (args[0] && mp.vehicles.exists(args[0])) {
			if (args[0] !== undefined) {
				let y = 0;
				if(args[1]) args[0].setIndicatorLights(1, true);
				else args[0].setIndicatorLights(1, false);
				if(args[2]) args[0].setIndicatorLights(0, true);
				else args[0].setIndicatorLights(0, false);
			}
		}
	} catch (e) {
	}
});

mp.events.add("VehStream_SetVehicleHeadLightColor", (entity, color) => {
	try {
		if (entity && mp.vehicles.exists(entity)) {
			if (entity !== undefined) SetHLColor(entity,color);
		}
	} catch (e) {
	}
});

function SetHLColor(vehicle, color) {
	try {
		if (vehicle && mp.vehicles.exists(vehicle)) mp.game.invoke('0xE41033B25D003A07', vehicle.handle, color);
	} catch (e) {
	}
}
const player = mp.players.local;
var isAttachToTrunkVeh = !1,
    attachToTrunkVeh = null,
    attachToTrunkVehByPlayer = null,
    attachToTrunkVehTimer = null;
mp.events.add("client_vehicle_attachToTrunk", function(e, a) {
    if (!isAttachToTrunkVeh && mp.vehicles.exists(e)) {
        const i = mp.game.gameplay.getModelDimensions(e.getModel());
        player.attachTo(e.handle, -1, 0, -(i.max.y - i.min.y) / 2 + .5, .4, 0, 0, 0, !1, !1, !1, !1, 20, !0),
         player.clearTasks(), 
         player.clearTasksImmediately(),
          isAttachToTrunkVeh = !0,
           attachToTrunkVeh = e, 
           attachToTrunkVehByPlayer = a,
            attachToTrunkVehTimer = setInterval(() => {
            if (!mp.vehicles.exists(attachToTrunkVeh)) return mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['C'])), isAttachToTrunkVeh = !1, void clearInterval(attachToTrunkVehTimer)
        }, 500),mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['C']),'Вылезти из багажника');
    }
}), 
mp.events.add("client_vehicle_dettachFromTrunk", function() {
    isAttachToTrunkVeh && (isAttachToTrunkVeh = !1, player.detach(!0, !0), clearInterval(attachToTrunkVehTimer))
}), 
mp.keys.bind(67, !0, function() {
    if (isAttachToTrunkVeh && mp.vehicles.exists(attachToTrunkVeh)) {
        if (null != attachToTrunkVehByPlayer && mp.players.exists(attachToTrunkVehByPlayer) && 0 !== attachToTrunkVehByPlayer.handle) {
            const e = player.position,
                a = attachToTrunkVehByPlayer.position;            
            if (100 > mp.game.system.vdist2(e.x, e.y, e.z, a.x, a.y, a.z)) return
        }
        NewEvent.callRemote("server_vehicle_backFromTrunk", attachToTrunkVeh),mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['C'])); 
    }
}),
 mp.events.addDataHandler("attachToVehicleTrunk", function(e, a) {
    if (0 !== e.handle && e != player) {
        if (-1 == a) return void e.detach(!0, !0);
        const i = mp.vehicles.atRemoteId(a);
        if (i && 0 !== i.handle) {
            const a = mp.game.gameplay.getModelDimensions(i.getModel());
            e.attachTo(i.handle, -1, 0, -(a.max.y - a.min.y) / 2 + .5, .4, 0, 0, 0, !1, !1, !1, !1, 20, !0)
        }
    }
}), 
mp.events.add("entityStreamIn", function(e) {
    if ("player" === e.type && e.hasVariable("attachToVehicleTrunk")) {
        const a = e.getVariable("attachToVehicleTrunk");
        if (-1 == a) return;
        setTimeout(() => {
            if (mp.players.exists(e) && 0 !== e.handle && a == e.getVariable("attachToVehicleTrunk")) {
                const i = mp.vehicles.atRemoteId(a);
                if (i && 0 !== i.handle) {
                    const a = mp.game.gameplay.getModelDimensions(i.getModel());
                    e.attachTo(i.handle, -1, 0, -(a.max.y - a.min.y) / 2 + .5, .4, 0, 0, 0, !1, !1, !1, !1, 20, !0)
                }
            }
        }, 400)
    }
});
}