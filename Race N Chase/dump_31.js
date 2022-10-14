{
var lastWaypointStatus = false;


mp.events.add("playerCreateWaypoint", (position) => {

    if(!lastWaypointStatus) // Only if NEWLY created waypoint. Not like if it was force synced before.
    {
        mp.events.callRemote("SetWaypoint", position.x, position.y, position.z);

        lastWaypointStatus = true;
    }
});

mp.events.add("playerDisableWaypoint", () => {

    if(lastWaypointStatus) // So this does not trigger on FORCESYNCED calls.
    {
        mp.events.callRemote("DisableWaypoint");

        lastWaypointStatus = false;
    }
});

mp.events.add("gameSetWaypoint", function (x, y) {
    lastWaypointStatus = true;
    mp.game.ui.setNewWaypoint(x, y);
});

mp.events.add("gameDisableWaypoint", function () {
    lastWaypointStatus = false;
    mp.game.invoke('0xA7E4E2D361C2627F'); // VOID SET_WAYPOINT_OFF()
});

mp.events.add("OneSecondEvent", () => {
    if(!mp.game.invoke('0x1DD1F58F493F1DA5') && lastWaypointStatus) { // BOOL IS_WAYPOINT_ACTIVE() 
        mp.events.callLocal("playerDisableWaypoint");
    }
});

mp.events.add('Sync:SetDoorOpen', (entity, doorIndex, loose, instantly) => {
    entity.setDoorOpen(doorIndex, loose, instantly);
});

mp.events.add('Sync:SetDoorShut', (entity, doorIndex, instantly) => {
    entity.setDoorShut(doorIndex, instantly);
});

mp.events.addDataHandler('Status_Trunk', function (entity, value, oldValue) 
{
    if (entity.type === 'vehicle') 
    {
        if (value == true){
            entity.setDoorOpen(5, false, true);
            entity.setDoorOpen(6, false, true);
            entity.setDoorOpen(7, false, true);
        } else {
            entity.setDoorShut(5, true);
            entity.setDoorShut(6, true);
            entity.setDoorShut(7, true);
        }
    }
});

mp.events.addDataHandler('EntAlpha', function (entity, value, oldValue) 
{
    entity.setAlpha(value);
});

mp.events.addDataHandler('ComponentSyncTrigger', function (entity, value, oldValue) 
{
    if(entity != null && entity.type === 'player') mp.events.callRemote("RequestCompSync", entity);
});

mp.events.add("OpenVehicleDoor", (vehicle, doorId) => {
    if(vehicle.type === 'vehicle') vehicle.setDoorOpen(doorId, false, true);
});

mp.events.addDataHandler('vMaxSpeed', function (entity, value, oldValue) 
{
    if (entity.type === 'vehicle') 
    {
        entity.setMaxSpeed(value);
    }
});

mp.events.addDataHandler('vInitialDriveForce', function (entity, value, oldValue) 
{
    if (entity.type === 'vehicle') 
    {
        entity.setEnginePowerMultiplier(value);
    }
});

mp.events.addDataHandler('Engine', function (entity, value, oldValue) 
{
    if (entity.type === 'vehicle')
    {
        entity.setEngineOn(value, true, true);
    }
});

mp.events.addDataHandler('SirenState', function (entity, value, oldValue) {
    if(entity.type === 'vehicle')
    {
        if(entity.getClass() === 18) entity.setSiren(value);
    }
});

mp.events.add("AttachWeaponComponent", (target, weapon, comp) => {
    mp.game.invoke("0xD966D51AA5B28BB9", target.handle, weapon, comp);
    //mp.game.invoke("0xADF692B254977C0C", target.handle, weapon, true);
});

mp.events.add('playerLeaveVehicle', (vehicle, seat) => {
    if(mp.vehicles.exists(vehicle) && vehicle.getClass() === 18)
    {
        mp.events.callRemote("SendSirenSync", vehicle, vehicle.isSirenOn());
    }
});

mp.events.add('entityStreamIn', (entity) => {

    if(entity != null && entity.type === 'player') 
    {
        mp.events.callRemote("RequestCompSync", entity);
        if(entity.getVariable("EntAlpha") !== undefined) entity.setAlpha(entity.getVariable("EntAlpha"));
    }
    if (entity.type === 'vehicle') 
    {
        if(entity.getVariable("SirenState") !== undefined && entity.getClass() === 18)
        {
            entity.setSiren(entity.getVariable("SirenState"));
        }
        if(entity.getVariable("Status_Trunk") !== undefined)
        {
            if (entity.getVariable("Status_Trunk") == true)
            {
                entity.setDoorOpen(5, false, true);
                entity.setDoorOpen(6, false, true);
                entity.setDoorOpen(7, false, true);
            } 
            else 
            {
                entity.setDoorShut(5, true);
                entity.setDoorShut(6, true);
                entity.setDoorShut(7, true);
            }
        }

        if(entity.getVariable("Engine") !== undefined)
        {
            entity.setEngineOn(entity.getVariable("Engine"), true, true);
        }

        if(entity.getVariable("vMaxSpeed") !== undefined)
        {
            entity.setMaxSpeed(entity.getVariable("vMaxSpeed"));
        }

        if(entity.getVariable("vInitialDriveForce") !== undefined)
        {
            entity.setEnginePowerMultiplier(entity.getVariable("vInitialDriveForce"));
        }
    }
});


// Silent Siren
let localPlayer = mp.players.local;

mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'vehicle' && entity.getClass() === 18 && entity.hasVariable('SilentSiren')) entity.getVariable('SilentSiren') ? entity.setSirenSound(true) : entity.setSirenSound(false);
    
});

mp.events.addDataHandler("SilentSiren", (entity, value) => {
    if (entity.type === "vehicle") entity.setSirenSound(value);
});


// Collision Sync, ffs this took me hours of researching the shitass system but hey I figured it out -kevy
function ToggleCollisionsForEnt(ent, state)
{
    if(ent === null || ent === undefined|| ent.handle === 0) return;

    if(ent.type === 'vehicle')
    { // ITS A VEH
        ent.setInvincible(!state);
        ent.setCanBeDamaged(state);
        ent.setCanBreak(state);
    }
    //ent.setAlpha(state ? 255 : 200);

    mp.vehicles.streamed.forEach(targ => {

        ent.setNoCollision(targ.handle, state);
        targ.setNoCollision(ent.handle, state);

        if((ent.getVariable("Collisions") != undefined && ent.getVariable("Collisions") == false) || (targ.getVariable("Collisions") != undefined && targ.getVariable("Collisions") == false))
        { // EITHER of them has disabled, means disabled collisions take precedence over enabled.
            ent.setNoCollision(targ.handle, false);
            targ.setNoCollision(ent.handle, false);
        }
    });
    mp.players.streamed.forEach(targ => {    

        ent.setNoCollision(targ.handle, state);
        targ.setNoCollision(ent.handle, state);

        if((ent.getVariable("Collisions") != undefined && ent.getVariable("Collisions") == false) || (targ.getVariable("Collisions") != undefined && targ.getVariable("Collisions") == false))
        { // EITHER of them has disabled, means disabled collisions take precedence over enabled.
            ent.setNoCollision(targ.handle, false);
            targ.setNoCollision(ent.handle, false);
        }
    });
}

mp.events.add('entityStreamIn', (entity) => {
    if(entity.getVariable("Collisions") !== undefined) 
        ToggleCollisionsForEnt(entity, entity.getVariable("Collisions"));
    else
        ToggleCollisionsForEnt(entity, true); // This will refresh and cause other vehicles collision relations to refresh with this one
});

mp.events.add("ToggleCollisionsForEnt", (ent, state) => { ToggleCollisionsForEnt(ent, state); });

mp.events.addDataHandler('Collisions', function (entity, value, oldValue) 
{
    ToggleCollisionsForEnt(entity, value);
});


// Pickups
mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === 'object' && entity.getVariable("BelongsToPickup") !== undefined) {
        entity.setCollision(false, false);

        entity.BelongsToPickup = entity.getVariable("BelongsToPickup");
        if(entity.getVariable("PropLighting") !== undefined)
        {
            entity.PropLighting = entity.getVariable("PropLighting");
        }
    }
});

mp.events.addDataHandler('BelongsToPickup', function (entity, value, oldValue) 
{
    if (entity.type === 'object') 
    {
        entity.setCollision(false, false);

        entity.BelongsToPickup = entity.getVariable("BelongsToPickup");
    }
});

mp.events.addDataHandler('PropLighting', function (entity, value, oldValue) 
{
    if (entity.type === 'object') 
    {
        if(value) entity.PropLighting = value;
        else delete entity.PropLighting;
    }
});


mp.events.add("render", () => {
    const frameTime = mp.game.invokeFloat("0x0000000050597EE2"); // TIMESTEP

    for (const obj of mp.objects.streamed) {
        if (obj.BelongsToPickup === undefined) {
            continue;
        }

        obj.setCollision(false, false);
        mp.players.local.setNoCollision(obj.handle, false);
        if(mp.players.local.isInAnyVehicle(false)) mp.players.local.vehicle.setNoCollision(obj.handle, false);

        if(obj.getVariable("PropRotation") !== undefined && obj.getVariable("PropRotation") == true)
        {
            const { x: rotX, y: rotY, z: rotZ } = obj.getRotation(2);
            obj.setRotation(rotX, rotY, rotZ + (90.0 * frameTime), 2, true); // 90.0 rotation amount * frameTime
        }

        if (obj.PropLighting !== undefined) {
            const { x: posX, y: posY, z: posZ } = obj.position;
            
            mp.game.graphics.drawLightWithRangeAndShadow(posX, posY, posZ, obj.PropLighting[0], obj.PropLighting[1], obj.PropLighting[2], 
                obj.PropLighting[3], obj.PropLighting[4], obj.PropLighting[5]);
        }
    }
});

// FLASHLIGHT AND AIMING + DIRECTION SYNC


let isAimingLastReport = false;

let lastCameraDirReport = new mp.Vector3(-1.0, -1.0, -1.0);
let lastUpdateTime = Date.now();
let cameraUpdateDisabled = false;

mp.events.add('render', () => {

    if(mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true)
    {
        if(isAimingLastReport != mp.game.player.isFreeAiming())
        {
            isAimingLastReport = mp.game.player.isFreeAiming();
            mp.events.callRemoteUnreliable("UpdateAimingState", isAimingLastReport);
        }

        if(ServerSettings.CameraUpdateTime !== undefined && ServerSettings.CameraUpdateTime >= 10 
            && mp.players.local.getVariable("UpdateCameraData") == true)
        {
            if(ServerSettings.CameraUpdateTime != 699 && Date.now() - lastUpdateTime >= ServerSettings.CameraUpdateTime)
            {
                let camera = mp.cameras.new("gameplay");
                let direction = camera.getDirection();

                if(lastCameraDirReport.x != direction.x || lastCameraDirReport.y != direction.y || lastCameraDirReport.z != direction.z)
                {
                    lastCameraDirReport = direction;
                    cameraUpdateDisabled = false;
                    mp.events.callRemoteUnreliable("UpdateCameraDir", lastCameraDirReport.x, lastCameraDirReport.y, lastCameraDirReport.z);
                }
                lastUpdateTime = Date.now();
            }
            else if(ServerSettings.CameraUpdateTime == 699 && cameraUpdateDisabled == false)
            {
                mp.events.callRemoteUnreliable("UpdateCameraDir", -1.0, -1.0, -1.0);
                cameraUpdateDisabled = true;
            }
        }
        else if(cameraUpdateDisabled == false)
        {
            mp.events.callRemoteUnreliable("UpdateCameraDir", -1.0, -1.0, -1.0);
            cameraUpdateDisabled = true;
        }

        mp.players.streamed.forEach(target => 
        {
            if(target.weapon !== 0 && target.weapon != 2725352035 && target != mp.players.local)
            {
                if(target.getVariable("FlashlightEquipped") == true)
                {
                    if(target.getVariable("IsAiming") == true && target.getVariable("CameraDirectionX") !== undefined && target.getVariable("CameraDirectionX") !== null)
                    {
                        let handPos = target.getWorldPositionOfBone(target.getBoneIndexByName("BONETAG_R_HAND"));    
                        let forward = target.getForwardVector();
                    
                        let origin = new mp.Vector3(handPos.x + forward.x * 3.4, handPos.y + forward.y * 3.4, (handPos.z + forward.z * 3.4));
                                                            
                        mp.game.graphics.drawSpotLightWithShadow(origin.x, origin.y, origin.z, target.getVariable("CameraDirectionX"), target.getVariable("CameraDirectionY"), target.getVariable("CameraDirectionZ"), 255, 255, 255, 15, 7, 2, 20, 1, 1);
                        mp.game.graphics.drawLightWithRange(handPos.x, handPos.y, handPos.z, 255, 255, 255, 1, 8);
                    }
                }
            }
        });
    }
});
}