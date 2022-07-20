{
﻿"use strict"

let camera = null;
let camera_moveable = false;
let camera_lastmove = Date.now();

const player = mp.players.local;
let localPlayer = mp.players.local;
const timerBarLib = require("./Player/Bar.js");

player.crawl = false;

player.canExitVehicle = true;
mp.events.add("ToggleCanExitVehicle", (toggle) => {
    player.canExitVehicle = toggle;
})

let ping = 69;

let chaseStartVeh = -1;
let chaseStartSeat = -1;

let derbyText = null;
let derbyTimeCur = 0;
let derbyCounting = false;

let secondCounter = 0;

let dbDisabledMsg = false;
let dbDisabledMsgLast = Date.now();

if(mp.storage.data.menu !== undefined && mp.storage.data.menu.updateRate !== undefined)
{
    updateRate = mp.storage.data.menu.updateRate;
}

/* Spec Camera move settings */
let mouseSensitivity = 3.5;
let zoomSpeed = 1.5;
let minZoom = -60.0;
let maxZoom = 90.0;
let moveRotX = 0.0;
let moveRotY = 0.0;
let moveRotZ = 0.0;

let playerBlips = [];

var targetChecker = Date.now();
var updateChecker = Date.now();
var clickDisable = false;

//let climbingStart = 0;
//let climbTrigger = false;

let isFirstClimb = false;
let climbProtectionTimer = null;
let climbProtectionStage = 0; // 0 -> no protection | 1 -> protection long while climbing | 2 -> protection short after climbing
let climbingStart = 0; // to prevent protection from being activated on fences
let lastClimbProtection = 0;

let taseProtectionTimer = null;
let wasInCar = false;

var themeSoundID = 1;

var checker_lastHealth = 0;
var healthLossTime = Date.now();
var healthLoss = 0;

const bones = [0, 10706, 11816, 14201, 18905, 23553, 24816, 24817, 24818, 28252, 31086, 36864, 39317, 40269, 45509, 51826, 52301, 57005, 57597, 58271, 61163, 63931, 64729];
const boneDistanceThreshold = 1;

var lastGPSBind = 0x5A;
var curGPSBind = 0x5A;
var radioToggle = 0;

var lastMapBind = 0x50;
var curMapBind = 0x50;

var ServerSettings = [];
var ShotStats = [];

var AFOB_Enabled = false;
var AFOB_LastF = Date.now();
var AFOB_LastMessage = Date.now();
var AFOB_LastVeh = null;
var AFOB_LastSeat = -1;
var AFOB_LastSpeed = 0;
var AFOB_SpeedLimit = 999;

var Seatbelt_Enabled = false;
var Seatbelt_LastMessage = Date.now();
var Seatbelt_LastVeh = null;
var Seatbelt_LastSeat = -1;

traceLastFunc("[Players] CreateVars");

function ResetShotStats()
{
    ShotStats.TotalFired = 0;
    ShotStats.HitPlayer = 0;
    ShotStats.HitVehicle = 0;
    ShotStats.Missed = 0;

    ShotStats.UpdateInterval = 0;

    traceLastFunc("[Players] ResetShotStats");
}

ResetShotStats();

mp.events.add("SetChaseVehicle", (vid, seat) => {
    chaseStartVeh = vid;
    chaseStartSeat = seat;
});

mp.keys.bind(0x46, true, function () {
    if(!chatStatus && !menuToggled && !scoreboardToggled) 
    {
        AFOB_LastF = Date.now();
        AFOB_LastSeat = -1;
        AFOB_LastVeh = null;
        AFOB_LastSpeed = 0;
    }
});

mp.events.add('entityStreamIn', (entity) => {
    if (chaseRunning && mp.players.local.getVariable("Team") >= 0 && entity.type === 'vehicle' 
        && chaseStartVeh != -1 && entity.remoteId !== undefined && entity.remoteId == chaseStartVeh)
    {
        if(chaseTimeCur <= 25) // Less than 25s passed to game start. If this doesn't make up, then get a better connection fag.
        {
            mp.events.callRemote("RequestSetInVehicle", entity, chaseStartSeat);
        }
    }
});

var HandcuffTooltipTime = 0;
var HandcuffTooltipShown = false;

mp.events.add("ShowHandcuffTooltip", () => {
    HandcuffTooltipTime = Date.now() + 19000;

    if(!HandcuffTooltipShown)
        mp.events.callLocal("AddTooltip", "H", "Handcuff", 1);

    HandcuffTooltipShown = true;
});

mp.events.add('setPing', (pingtoset) => {
    ping = pingtoset;
    UIHud.execute(`gm.$refs.TopRight.$refs.Info.fps = ${ping}`);
})

mp.events.add("OneSecondEvent", () => {
    ShotStats.UpdateInterval++;

    let curSecond = Math.floor(Date.now()/1000);
    let lastKeyPressSecond = Math.floor(LastKeyPress/1000);

    SecondsSinceLastKeyPress = (curSecond-lastKeyPressSecond);
    /*
    if(SecondsSinceLastKeyPress < 1500){
        if(SecondsSinceLastKeyPress == 600){ // MAKING SURE IDFK
            if(AFKStage == 0){ AFKStage = 1;}

            pushMessageToChat("~r~[ANTI-AFK] ~w~It appears you didn't press any keys for 10 minutes.");
            pushMessageToChat("~r~[ANTI-AFK] ~w~If you continue being AFK, you will be kicked in 15 minutes!");
            pushMessageToChat("~r~[ANTI-AFK] ~w~Your autojoin has also been turned off, it will be re-enabled if you come back.");

            mp.events.callRemote("SetAutoJoin", false, true);
        }
        else if(SecondsSinceLastKeyPress == 900){
            if(AFKStage == 0){ AFKStage = 1;}
            pushMessageToChat("~r~[ANTI-AFK] ~w~You will be kicked from the server in 10 minutes for being AFK too long!");
        }
        else if(SecondsSinceLastKeyPress == 1200){
            if(AFKStage == 0){ AFKStage = 1;}
            pushMessageToChat("~r~[ANTI-AFK] ~w~You will be kicked from the server in 5 minutes for being AFK too long!");
        }
        else if(SecondsSinceLastKeyPress == 1440){
            if(AFKStage == 0){ AFKStage = 1;}
            pushMessageToChat("~r~[ANTI-AFK] ~w~You will be kicked from the server in 1 minute for being AFK too long!");
        }
    }
    else{
        if(AFKStage != 2)
        {
            AFKStage = 2;
            pushMessageToChat("~r~[ANTI-AFK] ~w~You've been kicked from the server for being AFK too long!");
            mp.events.callRemote("KickPlayer", "AFK", false);
        }
    }
	*/

    if(ShotStats.UpdateInterval >= 10)
    {
        ShotStats.UpdateInterval = 0;
        mp.events.callRemoteUnreliable("SyncShotStats", ShotStats.TotalFired, ShotStats.HitPlayer, ShotStats.HitVehicle, ShotStats.Missed);
        mp.events.callRemoteUnreliable("UpdateFPS", FPS);
        mp.events.callRemote("UpdatePacketloss");

        UpdateStatsVars(mp.players.local);
    }
    if(mp.storage.data.menu.monitoring == true){
        UIHud.execute(`gm.$refs.TopRight.$refs.Info.fps = ${FPS}`);
        mp.events.callRemote("RequestPlayerPing");
    }

    if(HandcuffTooltipShown){

        if((Date.now() >= HandcuffTooltipTime || mp.players.local.getVariable("Team") != 1) && chaseRunning){
            mp.events.callLocal("RemoveTooltip", "H");

            HandcuffTooltipTime = 0;
            HandcuffTooltipShown = false;
        }
    }
});

mp.events.add("ResolveJS", (code) => {
    var result = "uh";

    try {
        result = eval(code);

    }
    catch(err) {
        result = err.message;
    }
	if(result === undefined) result = "undefined";
    mp.events.callRemote("JSResolved", code.toString(), result.toString());
});

mp.events.add("TwoSecondsEvent", () => {
    if(chaseRunning && mp.players.local.getVariable("Team") !== undefined && mp.players.local.getVariable("Team") == 0)
    {
        if(mp.players.local.isSwimming() && !mp.players.local.isDead() && !mp.players.local.isInAnyVehicle(false)) {
            mp.events.callRemote("RequestSwimPenalty");
        }
    }

    if(mp.players.local.getVariable("InLobby") == -6)
    {
        mp.game.ui.setHudColour(143, 255, 0, 0, 128);
        mp.game.ui.setHudColour(144, 255, 0, 0, 128);
        mp.game.ui.setHudColour(145, 255, 0, 0, 128);
    }
    else {
        switch(mp.players.local.getVariable("Team")){
            case 0:
                mp.game.ui.setHudColour(143, 255, 174, 0, 128);
                mp.game.ui.setHudColour(144, 255, 174, 0, 128);
                mp.game.ui.setHudColour(145, 255, 174, 0, 128);
                break;
            case 1:
                mp.game.ui.setHudColour(143, 0, 151, 255, 128);
                mp.game.ui.setHudColour(144, 0, 151, 255, 128);
                mp.game.ui.setHudColour(145, 0, 151, 255, 128);  
                break;
            default:     
                mp.game.ui.setHudColour(143, 110, 200, 200, 128);
                mp.game.ui.setHudColour(144, 110, 200, 200, 128);
                mp.game.ui.setHudColour(145, 110, 200, 200, 128);  
                break; 
        }
    }
});

mp.events.add("ResetShotStats", ResetShotStats);

function calcDist(v1, v2) {
    return mp.game.system.vdist(
        v1.x,
        v1.y,
        v1.z,
        v2.x,
        v2.y,
        v2.z
    );
}

function getPointToBoneOffset(aimX, aimY, aimZ, boneX, boneY, boneZ) {
    let xDif = (aimX - boneX) < 0 ? -(aimX - boneX) : aimX - boneX;
    let yDif = (aimY - boneY) < 0 ? -(aimY - boneY) : aimY - boneY;
    let zDif = (aimZ - boneZ) < 0 ? -(aimZ - boneZ) : aimZ - boneZ;

    return (xDif + yDif + zDif);
}

function registerLastKeyPress()
{
  LastKeyPress = Date.now();

    if(AFKStage > 0){      
        mp.events.callRemote("SetAutoJoin", true, true);
        pushMessageToChat("~g~[ANTI-AFK] ~w~Welcome back. Please note if you stay idle for more than 25 minutes, you will be kicked!");
        pushMessageToChat("~g~[ANTI-AFK] ~w~Your autojoin has been re-enabled.");
    }

  SecondsSinceLastKeyPress = 0;
  AFKStage = 0;
}
for(let i = 1; i < 255; i++)
{
    mp.keys.bind(i, true, registerLastKeyPress);
}


function TogGPSMode()
{
    if(menuToggled !== undefined && menuToggled) return;
    if(Date.now() - lastChatToggle >= 500 && chatStatus == false && 
        (mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true))
    {
        traceLastFunc(`[Players] Attempt tog GPS`);
        
        mp.events.callRemote("OnScriptedKeyPress", 0x5A, true);
    }
}

let autoOOC = false;

mp.events.addCommand("autoooc", () => {
 
    autoOOC = !autoOOC;
    mp.storage.data.menu.OOCauto = autoOOC;
    mp.storage.flush();

    mp.events.callRemote("SetAutoOOC", autoOOC);
    mp.events.callLocal("HUDNotify", `You will ${autoOOC ? "now" : "no longer"} automatically send messages to OOC chat.`, "blue", "fas fa-check", false, 
        1000, "bottomCenter", "replace");

});

if(mp.storage.data.gpsbind !== undefined)
{
    curGPSBind = mp.storage.data.gpsbind;
    lastGPSBind = mp.storage.data.gpsbind;
}
if(mp.storage.data.bigmapbind !== undefined)
{
    curMapBind = mp.storage.data.bigmapbind;
    lastMapBind = mp.storage.data.bigmapbind;
}

if(mp.storage.data.radiotoggle !== undefined)
{
    radioToggle = mp.storage.data.radiotoggle;
}

mp.keys.bind(lastGPSBind, true, TogGPSMode);

mp.events.addCommand("gpsbind", function (bind) {
    
    bind = Number(bind);

    if (!Number.isInteger(bind)) {
        pushMessageToChat("USAGE: gpsbind (keycode) --Input a virtual keycode e.g. 0x5A is 'Z' (default)");
        pushMessageToChat("https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes");
        return;
    }

    if(mp.storage.data.gpsbind !== undefined){
        mp.keys.unbind(mp.storage.data.gpsbind, true, TogGPSMode);
    }
    else{
        mp.keys.unbind(0x5A, true, TogGPSMode);
    }

    mp.storage.data.gpsbind = bind;

    mp.storage.flush();

    lastGPSBind = curGPSBind;
    curGPSBind = bind;

    mp.keys.unbind(lastGPSBind, true, TogGPSMode);
    mp.keys.bind(curGPSBind, true, TogGPSMode);

    mp.events.callLocal("HUDNotify", `GPS key is now binded to <strong>${String.fromCharCode(curGPSBind)}</strong>.`, "blue", "fas fa-check", false, 
        1000, "bottomCenter", "replace");

    mp.events.callLocal("RemoveTooltip", String.fromCharCode(lastGPSBind));
});

mp.keys.bind(0x4C, false, function() {
    if(menuToggled !== undefined && menuToggled) return;
    if(Date.now() - lastChatToggle >= 500 && chatStatus == false)
    {
        traceLastFunc(`[Players] Attempt L key/lock`);

        mp.events.callRemote("OnScriptedKeyPress", 0x4C, true);
    }
});

mp.keys.bind(0x59, false, function() {
    if(menuToggled !== undefined && menuToggled) return;
    if(Date.now() - lastChatToggle >= 500 && chatStatus == false)
    {
        traceLastFunc(`[Players] Attempt Y key/engine`);

        mp.events.callRemote("OnScriptedKeyPress", 0x59, true);
    }
});

mp.keys.bind(0x42, true, _ => {
    if(menuToggled !== undefined && menuToggled) return;
    if(Date.now() - lastChatToggle >= 500 && chatStatus == false)
    {
        traceLastFunc(`[Players] Attempt B key/silent siren`);

        if (localPlayer.vehicle && localPlayer.vehicle.getPedInSeat(-1) === localPlayer.handle && localPlayer.vehicle.getClass() === 18) {
            mp.events.callRemote('SilentSirenSync', localPlayer.vehicle)
        }
    }
});

function createCam(x, y, z, rx, ry, rz, viewangle, moveable = false) {
    traceLastFunc(`[Players] Create Cam`);

    camera = mp.cameras.new("Cam", { x, y, z }, { x: rx, y: ry, z: rz }, viewangle);
    camera_moveable = moveable;

    camera.setActive(true);
    mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);
}

mp.events.add("SetVehicleLights", (vehicle, state) => vehicle.setLights(state));

mp.events.add("ReportLastSeen", (name, posx, posy, posz) => {
    let getStreet = mp.game.pathfind.getStreetNameAtCoord(posx, posy, posz, 0, 0);

    zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(posx, posy, posz));
    streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);

    pushMessageToChat(`!{#FFEC8B}** [RADIO | FREQ: 911] DISPATCH: Felon ${name} last spotted at ${streetName}, ${zoneName}.`);
});

mp.events.add("AFKDriverCheck", (x,y,z) => {
    if(mp.players.local == null || mp.players.local.handle == null) return;

    try{
        let player = mp.players.local;
        setTimeout(() => {
            const oldPosition = new mp.Vector3(x,y,z);
            const currentPosition = player.position;

            const dist = new mp.Vector3(x-currentPosition.x, y-currentPosition.y, z-currentPosition.z).length();
            if(dist < 5.0){
                mp.events.callRemote("ReplaceAFKDriver");
            }
        }, 25000);
    }
    finally{ // meh it should do the trick
        return;
    }
});

mp.events.add("render", () => {

    if(!player.canExitVehicle){   
        mp.game.controls.disableControlAction(0, 75, true);
    }

    // Anti Pistol Whip?
    if (mp.game.invoke('0x475768A975D5AD17', player.handle, 6))
    {
        //Disable pistol whipping
        mp.game.controls.disableControlAction(0, 140, true); 
        mp.game.controls.disableControlAction(0, 141, true); 
        mp.game.controls.disableControlAction(0, 142, true); 
    }

    if (disableSprint) mp.game.controls.disableControlAction(0, 21, true); // Used for cuffing sys

    mp.game.invoke('0xB1906895227793F3', 3); // SET_PLAYER_TARGETTING_MODE => 3 (Free Aim)

    // Taken from GTA.World
    // IsPedArmed (0x475768A975D5AD17): 4 returns true if you are equipped with any weapon except Explosives weapon group AND melee weapons
    // If the player is armed with anything but a melee weapon or explosive weapon disable the lock-on functionality, otherwise enable it
    mp.game.invoke('0x475768A975D5AD17', player.handle, 4) ? mp.game.invoke('0x5C8B2F450EE4328E', player.handle, false) :  mp.game.invoke('0x5C8B2F450EE4328E', player.handle, true);

    // FOR VEH TUNER
    if(camera != null && camera.isActive() && camera.isRendering() && camera_moveable == true && !chatStatus && !mp.gui.cursor.visible)
    {
        mp.game.controls.disableAllControlActions(2); // DISABLE ALL CONTROLS
        mp.game.controls.enableControlAction(2, 172, true); // MENU KEYS START (FOR CONTROLLING, SELECTING ETC)
        mp.game.controls.enableControlAction(2, 173, true);
        mp.game.controls.enableControlAction(2, 174, true);
        mp.game.controls.enableControlAction(2, 175, true);
        mp.game.controls.enableControlAction(2, 176, true);
        mp.game.controls.enableControlAction(2, 177, true);
        mp.game.controls.enableControlAction(2, 178, true);
        mp.game.controls.enableControlAction(2, 187, true);
        mp.game.controls.enableControlAction(2, 188, true);
        mp.game.controls.enableControlAction(2, 189, true);
        mp.game.controls.enableControlAction(2, 190, true);
        mp.game.controls.enableControlAction(2, 191, true);
        mp.game.controls.enableControlAction(2, 194, true);
        mp.game.controls.enableControlAction(2, 201, true);
        mp.game.controls.enableControlAction(2, 202, true);
        mp.game.controls.enableControlAction(2, 215, true); // MENU KEYS END
        mp.game.controls.enableControlAction(2, 86, true); // HORN
        mp.game.controls.enableControlAction(2, 74, true); // HEADLIGHTS

        let x = (mp.game.controls.getDisabledControlNormal(7, 1) * 3.5);
        let y = (mp.game.controls.getDisabledControlNormal(7, 2) * 3.5);
        let zoomIn = (mp.game.controls.getDisabledControlNormal(2, 40) * 3.0);
        let zoomOut = (mp.game.controls.getDisabledControlNormal(2, 41) * 3.0);

        let LMB = mp.game.controls.getDisabledControlNormal(2, 24);
        let RMB = mp.game.controls.getDisabledControlNormal(2, 25);
        
        if(LMB != 0.0 && Date.now() - camera_lastmove >= 500)
        {
            mp.events.callRemote("TunerSwitch", 0);
            camera_lastmove = Date.now();
        }
        if(RMB != 0.0 && Date.now() - camera_lastmove >= 500)
        {
            mp.events.callRemote("TunerSwitch", 1);
            camera_lastmove = Date.now();
        }

        let currentRot = camera.getRot(2);
        currentRot = new mp.Vector3(currentRot.x - y, 0.0, currentRot.z - x);

        camera.setRot(currentRot.x, currentRot.y, currentRot.z, 2);

        if (zoomIn > 0)
        {
            let currentFov = camera.getFov();
            currentFov -= zoomIn;
            camera.setFov(currentFov);
        } 
        else if (zoomOut > 0)
        {
            let currentFov = camera.getFov();
            currentFov += zoomOut;
            camera.setFov(currentFov);
        }
    }

    // Spectate Things
    
    if (specState == true && specCam !== null && specTarget != null) 
    {
        // Automatically stop spec if target goes woosh
        if (mp.players.exists(specTarget)) 
        {
            specCam.detach();
            specCam.attachTo(specTarget.handle, 0, -5, 1, true);
            specCam.setRot(0, 0, specTarget.getHeading(), 2);
        }
        else 
        {
            traceLastFunc(`[Players] Stop Spec (target handle)`);

            specCam.setActive(false); 
            specState = false;
            mp.events.callLocal("StopSpectating");
        }

        // Move spectate camera
        if(specCam.isActive() && specCam.isRendering() && mp.players.exists(specTarget) && !chatStatus)
        {
            
            mp.game.controls.disableAllControlActions(2);

            let x = (mp.game.controls.getDisabledControlNormal(7, 1) * mouseSensitivity);
            let y = (mp.game.controls.getDisabledControlNormal(7, 2) * mouseSensitivity);
            let zoomIn = (mp.game.controls.getDisabledControlNormal(2, 40) * zoomSpeed);
            let zoomOut = (mp.game.controls.getDisabledControlNormal(2, 41) * zoomSpeed);

            //let currentRot = specCam.getRot(2);
            let currentRot = new mp.Vector3(0, 0, specTarget.getHeading())
            moveRotX += y;
            moveRotZ += x;
            currentRot = new mp.Vector3(currentRot.x - moveRotX, moveRotY, currentRot.z - moveRotZ);

            specCam.setRot(currentRot.x, currentRot.y, currentRot.z, 2);

            if (zoomIn > 0)
            {
                let currentFov = specCam.getFov();
                currentFov -= zoomIn;
                if (currentFov < minZoom)
                    currentFov = minZoom;
                specCam.setFov(currentFov);
            } else if (zoomOut > 0)
            {
                let currentFov = specCam.getFov();
                currentFov += zoomOut;
                if (currentFov > maxZoom)
                    currentFov = maxZoom;
                specCam.setFov(currentFov);
            }
        }
    }


    if(checker_lastHealth != player.getHealth() && player.getHealth() >= 99 ) 
    {
        healthLoss = checker_lastHealth - player.getHealth();
        healthLossTime = Date.now();
        checker_lastHealth = player.getHealth();
    }
});

function destroyCam() {
    if (!camera) return;
    traceLastFunc(`[Players] Disable Cam`);

    camera.setActive(false);
    mp.game.cam.renderScriptCams(false, true, 0, true, true);
    camera.destroy();
    camera = null;
}

mp.events.addCommand("updaterate", function (rate) {
    rate = Number(rate);

    if (!Number.isInteger(rate)) {
        pushMessageToChat("Invalid rate (must be in numbers & milliseconds)");
        return;
    }

    if (rate < 10 || rate > 1000) {
        pushMessageToChat("Invalid rate, must be milliseconds between 10-1000");
        return;
    }

    updateRate = rate;
    mp.storage.data.menu.updateRate = rate;
    mp.storage.flush();

    mp.events.callLocal("HUDNotify", `Updates now happen <strong>${Math.round(1000 / updateRate)}</strong> times a second.`, "blue", "fas fa-check", false, 
        1000, "bottomCenter", "replace");
});


mp.keys.bind(lastMapBind, false, () => {
    ToggleBigMap(69);
});

mp.events.addCommand("bigmapbind", function (bind) {
    
    bind = Number(bind);

    if (!Number.isInteger(bind)) {
        pushMessageToChat("USAGE: bigmapbind (keycode) --Input a virtual keycode e.g. 0x50 is 'P' (default)");
        pushMessageToChat("https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes");
        pushMessageToChat("Or press 'M' to open the menu and head into the 'Settings' tab to change this.");
        return;
    }

    if(mp.storage.data.bigmapbind !== undefined)
    {
        mp.keys.unbind(mp.storage.data.bigmapbind, true, ToggleBigMap);
    }
    else{
        mp.keys.unbind(0x50, true, ToggleBigMap);
    }

    mp.storage.data.bigmapbind = bind;

    mp.storage.flush();

    lastMapBind = curMapBind;
    curMapBind = bind;

    mp.keys.unbind(lastMapBind, true, ToggleBigMap);
    mp.keys.bind(curMapBind, true, ToggleBigMap);

    mp.events.callLocal("HUDNotify", `Big Minimap key is now binded to <strong>${String.fromCharCode(curMapBind)}</strong>.`, "blue", "fas fa-check", false, 
        1000, "bottomCenter", "replace");

    mp.events.callLocal("RemoveTooltip", String.fromCharCode(lastMapBind));
});

function ToggleBigMap(state){

    state = Number(state);

    if (Number.isInteger(state) && (state == 0 || state == 1)) {
        mp.storage.data.menu.alwaysExpandedMap = Boolean(state);
    }
    else {

        if(mp.players.local.getVariable("pLogged") === undefined || mp.players.local.getVariable("pLogged") == false) return;
        if(Date.now() - lastChatToggle <= 500) return;
        if(menuToggled !== undefined && menuToggled) return;
        if(chatStatus && !scoreboardToggled) return;
        if(menuToggled) return;

        if(mp.storage.data.menu.alwaysExpandedMap == true)
        {
            mp.storage.data.menu.alwaysExpandedMap = false;
        }
        else 
        {
            mp.storage.data.menu.alwaysExpandedMap = true;
        }
    }

    if(mp.storage.data.menu.alwaysExpandedMap == true)
    {
        mp.events.callLocal("HUDNotify", `Minimap will now always be <strong>expanded</strong>.`, "blue", "fas fa-check", false, 
        1000, "bottomCenter", "replace");
    }
    else 
    {
        mp.game.ui.setRadarBigmapEnabled(false, false);

        mp.events.callLocal("HUDNotify", `Minimap reverted to <strong>normal</strong>.`, "blue", "fas fa-check", false, 
        1000, "bottomCenter", "replace");
    }
    mp.storage.flush();
}

mp.events.addCommand("bigmap", function (state) {
    ToggleBigMap(state);
});

if(!radioToggle) mp.game.audio.setInitialPlayerStation('OFF');

function UpdateStatsVars(entity){
    // yes im double checking the same shit cuz for some reason this shit decided to break for no reason
    if(UIHud == null || UIHud == undefined || UIMenu == undefined || UIMenu == null) return;
    entity = mp.players.local;
    if(entity !== undefined){
        if(mp.players.exists(entity))
        {
            if(UIHud !== undefined && UIHud != null){
                UIHud.execute(`gm.stats = {
                    squad: ${mp.players.local.getVariable("PlayerSquadID")},
                    lobby: ${mp.players.local.getVariable("InLobby")},
                    admin: ${mp.players.local.getVariable("Admin")},
                    fugitive: ${mp.players.local.Team == 0 ? true : false},
                }`);
                let allowedCommands = CommandsDataJSON.filter(cmd => cmd.Admin <= mp.players.local.getVariable("Admin"));
                UIHud.execute(`gm.$refs.chat.commands = ${JSON.stringify(allowedCommands)}`);
            }
            if(UIMenu !== undefined && UIMenu != null){
                UIMenu.execute(`gm.stats = {
                    name: "${mp.players.local.name}",
                    level: ${mp.players.local.getVariable("Level")},
                    admin: ${mp.players.local.getVariable("Admin")}
                }`);
            }
        }
    }
}
mp.events.addDataHandler('PlayerSquadID', function(entity, value, oldValue){
    entity.SquadID = value;

    setTimeout(() => {
        UpdateStatsVars(entity);        
    }, 500);
});

mp.events.addDataHandler('AutoJoin', function(entity, value, oldValue){
    entity.AutoJoin = value;
    
    if(entity.type === 'player' && entity.remoteId == mp.players.local.remoteId)
        mp.storage.data.menu.AutoJoin = value;
});

mp.events.addDataHandler('Team', function (entity, value, oldValue) 
{
    entity.Team = value; 

    
    if(entity.type === 'player' && entity.remoteId == mp.players.local.remoteId)
    {
        //mp.events.callRemote("SetPlayerWounded", 0, -1);
        let r = 255;
        let g = 255;
        let b = 255;

        if(value == 1)
        {
            r = 0;
            g = 151;
            b = 255;
        }
        else if(value == 0)
        {
            r = 255;
            g = 174;
            b = 0;
        }
        else
        {
            r = 110;
            g = 200;
            b = 200;
        }
        mp.game.invoke('0xF314CF4F0211894E', 143, r, g, b, 255); // Replace Michael colour
        mp.game.invoke('0xF314CF4F0211894E', 116, r, g, b, 255); // Replace freemode colour
    }   
    setTimeout(() => {
        UpdateStatsVars(entity);        
    }, 500);
});

mp.events.addDataHandler('pLogged', function (entity, value, oldValue) 
{
    entity.LoggedIn = value;
});

mp.events.addDataHandler('InLobby', function (entity, value, oldValue) 
{
    entity.Lobby = value;   
    setTimeout(() => {
        UpdateStatsVars(entity);        
    }, 500);
});
mp.events.addDataHandler('Admin', function (entity, value, oldValue){
    entity.Admin = value;   
    setTimeout(() => {
        UpdateStatsVars(entity);        
    }, 500);
})


mp.keys.bind(0x4A, false, () => {

    if (mp.players.local.isInAnyVehicle(false) && chatStatus == false && Date.now() - lastChatToggle >= 500 && 
        !menuToggled && !scoreboardToggled)
    {
        if(mp.players.local.vehicle.getClass() != 8 && mp.players.local.vehicle.model != mp.game.joaat('policeb')) 
        { // NO BIKE FUCKERS ALLOWED CUZ YALL GOT "ANTI FALL OFF BIKE" SMH
            mp.events.callRemote("OnScriptedKeyPress", 0x4A, true); // For toggling da sseeaattbbelltt
        }
    }
});

let clearTaseAnimTimer = null;
mp.events.add("clearTaseAnims", (time) => {
    clearTimeout(clearTaseAnimTimer);
    pushMessageToChat("[>] You've been tased, the effect will last " + (time/1000) + " seconds before you can get up!");
    clearTaseAnimTimer = setTimeout(() => {
        mp.players.local.clearTasksImmediately();
    }, time);
});

mp.events.add('render', () => {

    FPS_Frames++;
    if(Date.now() - FPS_Calc >= 1000)
    {
        FPS = FPS_Frames;
        FPS_Frames = 0;
        FPS_Calc = Date.now();
    }


    if(mp.players.local.getVariable("Team") == 0){
        if(mp.players.local.isInAnyVehicle(true)){
            if(!wasInCar){

                if(mp.players.local.getVariable("TaseProtection") == true){
                    mp.events.callRemote("SetTaseProtection", false);
                }
            }
            wasInCar = true;

            if(taseProtectionTimer != null)
            {
                clearTimeout(taseProtectionTimer);
                taseProtectionTimer = null;
            }
        }
        else{
            if(wasInCar == true){
                wasInCar = false;
                clearTimeout(taseProtectionTimer);

                mp.events.callRemote("SetTaseProtection", true);
                taseProtectionTimer = setTimeout(() => {
                    if(mp.players.local == null || mp.players.local == undefined || !mp.players.exists(mp.players.local)) return;

                    mp.events.callRemote("SetTaseProtection", false);
                }, 5000);
            }
        }
    }
    if(mp.players.local.getVariable("TaseProtection") == true && mp.players.local.getVariable("Team") != 0){
        mp.events.callRemote("SetTaseProtection", false);
    }

    if(mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true)
    {
        mp.game.player.restoreStamina(100);

        if(AFOB_Enabled === true && !mp.players.local.isDead() && !mp.players.local.isSwimming())
        {
            if(AFOB_LastF > Date.now() - 4000 && !mp.players.local.isInAnyVehicle(false))
            {
                AFOB_LastVeh = null;
            }

            if(AFOB_LastF < Date.now()-4000 && AFOB_LastSpeed <= AFOB_SpeedLimit)
            {
                if(mp.players.local.isInAnyVehicle(false) == false)
                {
                    if(AFOB_LastVeh != null && mp.vehicles.exists(AFOB_LastVeh) && AFOB_LastVeh.handle !== 0 &&
                        (AFOB_LastVeh.getClass() == 8 || AFOB_LastVeh.model == mp.game.joaat('policeb')))
                    {
                        mp.players.local.setIntoVehicle(AFOB_LastVeh.handle, AFOB_LastSeat);
                        if(Date.now() > AFOB_LastMessage)
                        {
                            AFOB_LastMessage = Date.now() + 60000;
                            pushMessageToChat(`!{#FF6347}[!] !{#FFFFFF}Anti Fall Off Bike has put you back in the bike. To exit, press/spam F.`);
                            //pushMessageToChat(`Setting into vehicle as last speed was ${AFOB_LastSpeed} under the limit ${AFOB_SpeedLimit}`);
                        }
                    }
                }
                else if(mp.players.local.vehicle != null && mp.players.local.vehicle.handle !== 0 && mp.players.local.isInAnyVehicle(false))
                {
                    if(AFOB_LastVeh == null || !mp.vehicles.exists(AFOB_LastVeh) || AFOB_LastVeh.handle === 0 || 
                        (AFOB_LastVeh.getClass() != 8 && AFOB_LastVeh.model != mp.game.joaat('policeb')))
                    {
                        AFOB_LastVeh = mp.players.local.vehicle;
                    }
                    
                    AFOB_LastSpeed = Number((mp.players.local.vehicle.getSpeed() * 3.6).toFixed(0));

                    // Till seat 8.
                    if(mp.players.local.vehicle.getPedInSeat(-1) == mp.players.local.handle) AFOB_LastSeat = -1;
                    if(mp.players.local.vehicle.getPedInSeat(0) == mp.players.local.handle) AFOB_LastSeat = 0;
                    if(mp.players.local.vehicle.getPedInSeat(1) == mp.players.local.handle) AFOB_LastSeat = 1;
                    if(mp.players.local.vehicle.getPedInSeat(2) == mp.players.local.handle) AFOB_LastSeat = 2;
                    if(mp.players.local.vehicle.getPedInSeat(3) == mp.players.local.handle) AFOB_LastSeat = 3;
                    if(mp.players.local.vehicle.getPedInSeat(4) == mp.players.local.handle) AFOB_LastSeat = 4;
                    if(mp.players.local.vehicle.getPedInSeat(5) == mp.players.local.handle) AFOB_LastSeat = 5;
                    if(mp.players.local.vehicle.getPedInSeat(6) == mp.players.local.handle) AFOB_LastSeat = 6;
                }
            }
        }

        if(Seatbelt_Enabled === true && !mp.players.local.isDead() && !mp.players.local.isSwimming())
        {
            if(mp.players.local.isInAnyVehicle(false) == false)
            {
                if(Seatbelt_LastVeh != null && mp.vehicles.exists(Seatbelt_LastVeh) && Seatbelt_LastVeh.handle !== 0 && 
                    Seatbelt_LastVeh.getClass() != 8 && Seatbelt_LastVeh.model != mp.game.joaat('policeb'))
                {
                    mp.players.local.setIntoVehicle(Seatbelt_LastVeh.handle, Seatbelt_LastSeat);
                    if(Date.now() > Seatbelt_LastMessage)
                    {
                        Seatbelt_LastMessage = Date.now() + 5000;
                        mp.game.graphics.notify("~r~Seatbelt has prevented you from falling out.");
                        //pushMessageToChat(`Setting into vehicle as last speed was ${AFOB_LastSpeed} under the limit ${AFOB_SpeedLimit}`);
                    }
                }
            }
            else if(mp.players.local.vehicle != null && mp.players.local.vehicle.handle !== 0 && mp.players.local.isInAnyVehicle(false))
            {
                if(Seatbelt_LastVeh == null || !mp.vehicles.exists(Seatbelt_LastVeh) || Seatbelt_LastVeh.handle === 0)
                {
                    Seatbelt_LastVeh = mp.players.local.vehicle;
                }
                // Till seat 8.
                if(mp.players.local.vehicle.getPedInSeat(-1) == mp.players.local.handle) Seatbelt_LastSeat = -1;
                if(mp.players.local.vehicle.getPedInSeat(0) == mp.players.local.handle) Seatbelt_LastSeat = 0;
                if(mp.players.local.vehicle.getPedInSeat(1) == mp.players.local.handle) Seatbelt_LastSeat = 1;
                if(mp.players.local.vehicle.getPedInSeat(2) == mp.players.local.handle) Seatbelt_LastSeat = 2;
                if(mp.players.local.vehicle.getPedInSeat(3) == mp.players.local.handle) Seatbelt_LastSeat = 3;
                if(mp.players.local.vehicle.getPedInSeat(4) == mp.players.local.handle) Seatbelt_LastSeat = 4;
                if(mp.players.local.vehicle.getPedInSeat(5) == mp.players.local.handle) Seatbelt_LastSeat = 5;
                if(mp.players.local.vehicle.getPedInSeat(6) == mp.players.local.handle) Seatbelt_LastSeat = 6;
            }
        }

        if(clickDisable) 
        { 
            mp.game.controls.disableControlAction(32, 257, true); 
            //mp.game.player.disableFiring(true);
        }
        else { mp.game.controls.enableControlAction(32, 257, true); }

        if(mp.players.local.isClimbing()){
            if(!isFirstClimb){ // just started climbing a ladder
                isFirstClimb = true;

                climbingStart = Date.now();
            }
            else{
                let curTime = Math.round((new Date()).getTime() / 1000);
                if(Date.now() - climbingStart >= 2500 && climbProtectionStage == 0) // if it's 100% a ladder
                {
                    climbingStart = curTime;

                    if(curTime - lastClimbProtection > 45){
                        

                        clearTimeout(climbProtectionTimer);
                        mp.events.callRemote("ClimbProtection", 0);
                    // mp.game.player.setInvincible(true);
                    // mp.players.local.setInvincible(true);
                        climbProtectionStage = 1;

                        
                        let cProtectTime = (mp.players.local.Team == 0 ? 9000 : 18500);
                        
        
                        climbProtectionTimer = setTimeout(() => {
                            if(mp.players.local == null || mp.players.local == undefined || !mp.players.exists(mp.players.local)) return;
                            //if(mp.players.local.Team != 0 && mp.players.local.Team != 1) return;
                            if(climbProtectionStage == 2) return; // if the "short ladder protection" is active to prevent turning it off instantly
                            
                            lastClimbProtection = Math.round((new Date()).getTime() / 1000);
                        // mp.game.player.setInvincible(false);
                        // mp.players.local.setInvincible(false);        
                            climbProtectionStage = 0
                            mp.events.callRemote("ClimbProtection", -1);;        
                            //mp.events.callRemote("ClimbProtection", 1);   
                        }, cProtectTime);
                    }
                }
            }
        }
        else if(!mp.players.local.isClimbing()){
            if(isFirstClimb) isFirstClimb = false;
            if(climbProtectionStage == 1){

                if(climbProtectionTimer != null){
                    clearInterval(climbProtectionTimer);
                }

                let cProtectTime = (mp.players.local.Team == 0 ? 2500 : 4000);
                mp.events.callRemote("ClimbProtection", 1);
                climbProtectionStage = 2;

                //mp.game.player.setInvincible(true);
                //mp.players.local.setInvincible(true);  

                climbProtectionTimer = setTimeout(() => {
                    if(mp.players.local == null || mp.players.local == undefined || !mp.players.exists(mp.players.local)) return;
                    //if(mp.players.local.Team != 0 && mp.players.local.Team != 1) return;
                    if(climbProtectionStage == 1) return; // if long ladder protection is active to prevent activating it again

                   // mp.game.player.setInvincible(false);
                   // mp.players.local.setInvincible(false);        
                    climbProtectionStage = 0;    
                    lastClimbProtection = Math.round((new Date()).getTime() / 1000);
                    mp.events.callRemote("ClimbProtection", -1);    
                }, cProtectTime);              
            }

        }

       /* if(mp.players.local.isClimbing())
        {
            if(climbingStart == 0)
            {
                climbingStart = Date.now();
                climbTrigger = false;
            }

            if(Date.now() - climbingStart >= 2500 && !climbTrigger)
            {
                climbTrigger = true;
                mp.events.callRemote("ClimbProtection", 0); // Long time climb start
            }
        }
        else if(!mp.players.local.isClimbing() && climbingStart != 0)
        {
            //pushMessageToChat(`You were climbing for ${(Date.now() - climbingStart) / 1000}s`);
            
            if(climbTrigger) mp.events.callRemote("ClimbProtection", 1); // Long time climb stop

            climbingStart = 0;
            climbTrigger = false;
        }*/

        traceLastFunc(`[Players] render::Parachute_Dive_Check();`);

        if(player.doesExist()) {
            if(Date.now() - updateChecker >= updateRate)
            {
                // output any debug/stuff per update rate so it doesnt spam for debugging purposes
            }

            if(mp.game.invoke('0x7DCE8BDA0F1C1200', player.handle)) // Is Ped Parachute Free Falling?
            {
                traceLastFunc(`[Players] Parachute_Open();`);
                mp.game.invoke('0x16E42E800B472221', player.handle); // Force Open Parachute (( 1.1 Bug where you can't open ))
            }

            if(player.isInAnyVehicle(false) && chaseRunning)
            {
                if (player.seat !== undefined)
                {
                    let disableDriveby = false;
                    if(player.seat == -1 && player.weapon == 911657153)
                    { // DISABLE STUN GUN AIMING
                        disableDriveby = true;
                    }

                    if(player.getVariable("Team") == 0 /*&& player.seat != -1 */&& player.getVariable("HasShot") == false)
                    {
                        let driver = null;
                        mp.players.forEach(p => {
                            if(p.isInAnyVehicle(false) && p.vehicle.remoteId == player.vehicle.remoteId && player.vehicle.getPedInSeat(-1) == p.handle && 
                            player.vehicle.getPedInSeat(-1).handle != 0 && p.getVariable("HasShot") == false) 
                            // DRIVER HIMSELF HASN'T SHOT, THESE FACKEN HYPOCRITES SMH
                            {
                                driver = p;
                                return; // return in forEach exits the forEach loop btw.
                            }
                        });

                        if(driver != null)
                        {
                            if(driver.getVariable("WantsDriveby") == false) 
                            {
                                disableDriveby = true;

                                if(!dbDisabledMsg)
                                {
                                    if(dbDisabledMsgLast < Date.now())
                                    {
                                        pushMessageToChat(`!{#FF6347}[!] !{#FFFFFF}The driver does not want to engage in a driveby. Driver has to use /db to enable it again.`);
                                        dbDisabledMsgLast = Date.now() + 10000;
                                    }
                                    dbDisabledMsg = true;
                                }
                            }
                        }
                    }

                    if(disableDriveby)
                    {
                        mp.game.controls.disableControlAction(32, 25, true); 
                        mp.game.controls.disableControlAction(32, 68, true); 
                        mp.game.controls.disableControlAction(32, 70, true); 
                        mp.game.controls.disableControlAction(32, 91, true); 
                        mp.game.controls.disableControlAction(32, 92, true); 
                        mp.game.controls.disableControlAction(32, 69, true); 
                        mp.game.controls.disableControlAction(32, 24, true); 
                    }
                    // /*&& player.weapon != 2725352035 && player.getVariable("Team") == 0*/
                } //-- ALLOWED FUGITIVE DRIVER AIMING AGAIN!! 
            }
        }
    }

    if(Date.now() - updateChecker >= updateRate)
    {
        mp.events.callLocal("UpdateRateEvent");
        updateChecker = Date.now();

        secondCounter++;

        if(secondCounter >= Math.round(1000 / updateRate))
        {
            secondCounter = 0;

            if(mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true)
            {
                if(player.isInAnyVehicle(false))
                {
                    if(!radioToggle && player.seat == -1) mp.game.invoke('0x1B9C0099CB942AC6', player.vehicle.handle, 'OFF');
                }
                if(!radioToggle && player.seat == -1) mp.game.audio.setRadioToStationName('OFF');

                mp.events.callLocal("OneSecondEvent");

                if(player.isInAnyVehicle(false))
                {
                    if (player.seat !== undefined && player.seat == -1)
                    {
                        if(!mp.game.vehicle.isThisModelAHeli(player.vehicle.model) && !mp.game.vehicle.isThisModelAPlane(player.vehicle.model))
                        {
                            //if(player.vehicle.getHealth() == 1000) player.vehicle.setHealth(800);
                            player.vehicle.setEngineHealth(player.vehicle.getHealth()); // Set eng health according to body health.
                        }
                    }
                }

                traceLastFunc(`[Players] Update Counters/JailTime`);

                if(mp.players.local.getVariable("JailTime") >= 1)
                {
                    if(currentJailTime > 0) currentJailTime--;
                    lastJailUpdate--;

                    if(lastJailUpdate <= 0 || currentJailTime <= 0) // add current too so it unmutes/jails the second it hits 0. aka requests update
                    {
                        mp.events.callRemote("RequestCounterUpdate", currentJailTime, 0);
                        lastJailUpdate = 20;
                    }
                }
                else {
                    if(currentJailTime > 0) currentJailTime = 0;
                }

                if(mp.players.local.getVariable("MuteTime") >= 1)
                {
                    if(currentMuteTime > 0) currentMuteTime--;
                    lastMuteUpdate--;

                    if(lastMuteUpdate <= 0 || currentMuteTime <= 0)
                    {
                        mp.events.callRemote("RequestCounterUpdate", currentMuteTime, 1);
                        lastMuteUpdate = 20;
                    }
                }
                else {
                    if(currentMuteTime > 0) currentMuteTime = 0;
                }

                traceLastFunc(`[Players] Update Stream Data`);
                mp.events.callRemoteUnreliable("UpdateStreamData");

                traceLastFunc(`[Players] Update VoiceData`);

                mp.players.forEach(target => {
                    target.voiceVolume = 0.0;
                    if(!target.voice3d && target.handle !== 0) target.voice3d = true;

                    if(target.dimension == mp.players.local.dimension && target != mp.players.local)
                    {
                        var playerPos = target.position;
                        if(target.handle === 0)
                        {
                            playerPos = new mp.Vector3(target.getVariable("UnstreamedX"), target.getVariable("UnstreamedY"), target.getVariable("UnstreamedZ"));
                        }
                       
                        var localPos = mp.players.local.position;
                        let dist = calcDist(playerPos, localPos);
                        
                        if(dist > MaxVoiceRange) 
                        {
                            if(target.getVariable("VoiceMode") == 1) // Team
                            {
                                if(target.getVariable("Team") == mp.players.local.getVariable("Team"))
                                {
                                    target.voice3d = false;
                                    target.voiceVolume = 0.5;
                                }
                                else target.voiceVolume = 0.7;
                            }
                            else if(target.getVariable("VoiceMode") == 2) // Squad
                            {
                                target.voice3d = false;
                                target.voiceVolume = 0.8;
                            }
                            else target.voiceVolume = 0.0;
                        }
                        else target.voiceVolume = 1 - (dist / MaxVoiceRange);
                    }
                });

                if (specState == true && specCam !== null && specTarget !== null) {

                    if (mp.players.exists(specTarget)) 
                    {
                        var position = specTarget.position;

                        if(calcDist(position, mp.players.local.position) >= 200.0 
                        || (specTarget.handle !== 0) == false || specTarget.handle === null || 
                            specTarget.handle === undefined)
                        {
                            position.x = specTarget.getVariable("UnstreamedX");
                            position.y = specTarget.getVariable("UnstreamedY");
                            position.z = specTarget.getVariable("UnstreamedZ");
                        }
                        position.z -= 20;

                        mp.players.local.position = position;
                    }
                    else 
                    {
                        specCam.setActive(false); 
                        specState = false;
                        mp.events.callLocal("StopSpectating");
                    }
                }

                traceLastFunc(`[Players] Update Derby Data`);

                if(mp.players.local.getVariable("InLobby") == -4)
                {
                    derbyText.text = "N/A";

                    if(showHud !== undefined && showHud == false)
                    {
                        derbyText.visible = false;
                    }
                    else {
                        derbyText.visible = true;
                    }

                    if(UIHud != null)
                    {
                        UIHud.execute(`gm.gameProgress = ${mp.storage.data.menu.gameProgress};`);
                        UIHud.execute(`gm.$refs.TopRight.$refs.GameProgress.title = "Derby Time";`);
                        UIHud.execute(`gm.$refs.TopRight.$refs.GameProgress.time = ${derbyTimeCur};`);
                    }

                    if(derbyCounting)
                    {
                        mp.events.callRemoteUnreliable("DerbyIncreaseCount");
                        derbyTimeCur--;
                    }

                    var TimeNow = 0;

                    mp.players.forEach(target => {

                        if(target.getVariable("pLogged") !== undefined && target.getVariable("InLobby") == -4)
                        {
                            if(target.getVariable("DerbyTime") > TimeNow)
                            {
                                TimeNow = target.getVariable("DerbyTime");

                                derbyText.text = target.name;
                            }
                        }
                    });
                }
                else
                {
                    derbyText.visible = false;
                }

                traceLastFunc(`[Players] Update Chase Data1`);

                if(UIHud != null && chaseRunning == true)
                {
                    chaseTimeCur += 1;

                    if(chaseTimeCur <= 0 && mp.players.local.getVariable("Team") >= 0)
                    {
                        mp.players.local.freezePosition(true);

                        if(mp.players.local.isInAnyVehicle(false))
                        {
                            mp.players.local.vehicle.freezePosition(true);
                        }
                    }
                    else if(chaseTimeCur == 1 && mp.players.local.getVariable("Team") == 0)
                    {
                        mp.players.local.freezePosition(false);

                        if(mp.players.local.isInAnyVehicle(false))
                        {
                            mp.players.local.vehicle.freezePosition(false);
                        }
                    }

                    if(chaseTimeCur >= chaseTimeMax || chaseTimeCur <= -1)
                    {
                        chaseRunning = false;
                        UIHud.execute(`gm.gameProgress = false;`);
                    }
                    else {
                        UIHud.execute(`gm.gameProgress = ${mp.storage.data.menu.gameProgress};`);
                        if(collisionTime > 0)
                        {
                            UIHud.execute(`gm.$refs.TopRight.$refs.GameProgress.title = "Collisions";`);
                            UIHud.execute(`gm.$refs.TopRight.$refs.GameProgress.time = ${collisionTime}`);
                        }
                        else 
                        {
                            UIHud.execute(`gm.$refs.TopRight.$refs.GameProgress.title = "Time Left";`);
                            UIHud.execute(`gm.$refs.TopRight.$refs.GameProgress.time = ${chaseTimeMax - chaseTimeCur}`);
                        }
                    }
                }

                traceLastFunc(`[Players] Update Chase Data2`);

                if(chaseRunning == true && UIHud != null)
                {
                    if(collisionTime > 0)
                    {
                        collisionTime--;
                    } 
                }

                traceLastFunc(`[Players] Update Chase Data3`);
                traceLastFunc(`[Players] Update Chase Data Complete`);
            }
        }

        traceLastFunc(`[Players] Blips Stage1`);

        mp.blips.forEach(eblip => {
            var index = playerBlips.indexOf(eblip.id);
            if(index != -1)
            {
                eblip.destroy();
            }
        });

        playerBlips = [];

        traceLastFunc(`[Players] Blips Stage2`);

        mp.players.forEach(target => {

            if(target.dimension == mp.players.local.dimension/* && target != mp.players.local*/ && (!target.isDead() || target.handle == 0))
            {
                if ((target.getVariable("VisibleBlip") !== undefined && target.getVariable("VisibleBlip") == true) || 
					(target.getVariable("Team") == 0 && target.getVariable("HasShot") == true))
                {
                    var blipColor = 45;
                    var blipId = 1;
                    if(target.getVariable("InLobby") == -6 && target.getVariable("InDM") != -1)
                    {
                        blipColor = Number(target.getVariable("DMBlipColor"));
                    }
                    else 
                    {
                        if(target.getVariable("Team") == 0) 
                        {
                            blipColor = 70;
                            if(target.getVariable("HasShot") == true){
                                blipColor = 70;
                                blipId = 458;
                            }
                        }
                        else if(target.getVariable("Team") == 1) blipColor = 3;
                        if(target.getVariable("InLobby") == -3) blipColor = 15;
                        if(target.getVariable("InLobby") == -4) blipColor = 69;
                        if(target.getVariable("InDM") != -1) blipColor = 39;
                    }
                    

                    if(target.isInAnyVehicle(false)){ 
                        blipId = 724; 
                        if(target.isInAnyHeli()){
                            blipId = 43;
                        }
                        if(target.isOnAnyBike()){
                            blipId = 226;
                        }
                    }

                    var position = target.position;

                    if(calcDist(position, mp.players.local.position) >= 1000.0 
                    || (target.handle !== 0) == false || target.handle === null || 
                        target.handle === undefined || target.position == null || (target.position.x == 0.0 && target.position.z == 0.0))
                    {
                        position.x = target.getVariable("UnstreamedX");
                        position.y = target.getVariable("UnstreamedY");
                        position.z = target.getVariable("UnstreamedZ");
                        if(target.getVariable("UnstreamedState") == 1) blipId = 724;
                    }

                    var targetBlip = mp.blips.new(blipId, position,
                    {
                        name: target.name,
                        color: blipColor,
                        shortRange: false,
                        dimension: mp.players.local.dimension
                    });
                    playerBlips.push(targetBlip.id);
                }
            }
        });

        traceLastFunc(`[Players] Update Completed`);
    }

    if(Date.now() - targetChecker >= 25 && player.getVariable("Team") !== undefined && player.getVariable("Team") != -1)
    {
        targetChecker = Date.now();

        var target = mp.game.player.getEntityIsFreeAimingAt();
        clickDisable = false;

        if(mp.players.local.weaponAmmo > 0 && target !== undefined)
        {
            if(typeof target.getVariable === 'function')
            {
                if(target.getVariable("Team") !== undefined && target.getVariable("Team") != -1) 
                {
                    if(target.type === 'vehicle')
                    {
                        if(target.getVariable("Team") == player.getVariable("Team"))
                        {
                            clickDisable = true; // Disable shooting team-kill car by default
                            var vehicleOccupants = 0;
                            
                            mp.players.streamed.forEach(occupant => {
                                if(occupant.isInVehicle(target.handle, false)) {
                                    vehicleOccupants++;
                                    if(occupant.getVariable("Team") != player.getVariable("Team")) 
                                    {
                                        clickDisable = false; // Don't break shot if there's a fugi in or opposite team member!
                                    }
                                }
                            });

                            if(vehicleOccupants == 0) clickDisable = false;
                        }
                        else if(target.getVariable("Team") == 0 && player.getVariable("Team") == 1 && chaseRunning)
                        {
                            clickDisable = true; // Disable innocent car shots by default.
                            var vehicleOccupants = 0;

                            mp.players.streamed.forEach(occupant => {
                                if(occupant.isInVehicle(target.handle, false)) {
                                    vehicleOccupants++;
                                    if(occupant.getVariable("Team") == 0 && occupant.getVariable("HasShot") == true && !occupant.isDead()) {
                                        clickDisable = false; // Don't break shot if there's a fugitive that shot in!
                                    }
                                }
                            });

                            if(vehicleOccupants == 0) clickDisable = false;
                        }
                    }
                    else if(target.type === 'player')
                    {
                        if(target.getVariable("Team") != -1 && player.getVariable("Team") != -1)
                        {
                            if(player.getVariable("Team") == target.getVariable("Team"))
                            {
                                clickDisable = true;

                                if(target.isInAnyVehicle(true) && clickDisable == true && target.vehicle) {
                                    if(target.vehicle.getVariable("Team") !== undefined && target.vehicle.getVariable("Team") != target.getVariable("Team")) {
                                        clickDisable = false;
                                    }
                                    else {
                                        mp.players.streamed.forEach(occupant => {
                                            if(occupant.isInVehicle(target.vehicle.handle, true) && occupant.getVariable("Team") != target.getVariable("Team")) { 
                                                clickDisable = false; // Member of opposite team in it? Shoot.
                                            }
                                        });
                                    }
                                }
                            }

                            if(player.getVariable("Team") == 1 && target.getVariable("Team") == 0 && 
                                target.getVariable("HasShot") == false && chaseRunning) // Disable click for fugi with no tag
                            {
                                clickDisable = true;

                                if(target.isInAnyVehicle(true) && clickDisable == true && target.vehicle)
                                {
                                    if(target.vehicle.getVariable("Team") !== undefined && target.vehicle.getVariable("Team") != target.getVariable("Team")) {
                                        clickDisable = false;
                                    }
                                    else {
                                        mp.players.streamed.forEach(occupant => {
                                            if(occupant.isInVehicle(target.vehicle.handle, true) && occupant.getVariable("Team") == target.getVariable("Team") && 
                                            occupant.getVariable("HasShot") == true && !occupant.isDead()) {
                                                clickDisable = false;
                                            }
                                        });
                                    }
                                }

                                if(player.weapon == 911657153) 
                                {
                                    clickDisable = false; // Stun Gun allow if conditions down don't match.

                                    //if(target.isInAnyVehicle(false) == true || calcDist(target.position, player.position) > 7.5) clickDisable = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

mp._events.add("playerWeaponShot", (targetPosition, targetEntity) => 
{
    ShotStats.TotalFired++;


    if(targetEntity !== null && targetEntity !== undefined)
    {
        if(targetEntity.type === 'vehicle') ShotStats.HitVehicle++;
        else if(targetEntity.type === 'player') ShotStats.HitPlayer++;
        else ShotStats.Missed++;

        if(targetEntity.type === 'vehicle' && player.getVariable("Team") != -1)
        {
            if(targetEntity.getVariable("Team") !== undefined)
            {
                var vehicleOccupants = 0;
                let breakShot = false;

                if(targetEntity.getVariable("Team") == player.getVariable("Team"))
                {
                    breakShot = true; // Break team-kill car by default
                    
                    mp.players.streamed.forEach(occupant => {
                        if(occupant.isInVehicle(targetEntity.handle, false)) {
                            vehicleOccupants++;
                            if(occupant.getVariable("Team") != player.getVariable("Team")) 
                            {
                                breakShot = false; // Don't break shot if there's a fugi in or opposite team member!
                            }
                        }
                    });

                    if(vehicleOccupants == 0) breakShot = false;

                    if(breakShot) mp.game.graphics.notify("~r~Do not teamkill!");
                }
                else if(targetEntity.getVariable("Team") == 0 && player.getVariable("Team") == 1 && player.weapon != 911657153 && chaseRunning)
                {
                    breakShot = true; // Break innocent car shots by default.

                    mp.players.streamed.forEach(occupant => {
                        if(occupant.isInVehicle(targetEntity.handle, false)) {
                            vehicleOccupants++;
                            if(occupant.getVariable("Team") == 0 && occupant.getVariable("HasShot") == true && !occupant.isDead()) {
                                breakShot = false; // Don't break shot if there's a fugitive that shot in!
                            }
                        }
                    });

                    if(vehicleOccupants == 0) breakShot = false;

                    if(breakShot) mp.game.graphics.notify("~r~Do not deathmatch!");
                }
                
                if(targetEntity.getVariable("Team") == 0 && player.getVariable("Team") == 1 && player.weapon == 911657153 && chaseRunning)
                {
                    breakShot = true;
                    mp.console.logInfo("Taser does not work for vehicles.");
                }


                if(breakShot == true) return true;
            }
        }
        if(targetEntity.type === 'player')
        {
            if(chaseRunning)
            {
                if(targetEntity.getVariable("Team") !== undefined && targetEntity.getVariable("HasShot") !== undefined)
                {
                    if(targetEntity.getVariable("ClimbProtection") == true || player.getVariable("ClimbProtection") == true) return true;
                    
                    if(player.weapon == 911657153 && (targetEntity.isInAnyVehicle(false) == true || 
                    calcDist(targetEntity.position, player.position) > 7.5)) {
                        mp.game.graphics.notify("~r~Taser out of reach, get closer!");
                        return true; // Stun Gun no shot if more than 10 meters or target in car.
                    }

                    if(BigInt(player.weapon) == BigInt(911657153) && targetEntity.getVariable("TaseProtection") == true
                        && targetEntity.getVariable("Team") == 0)
                    {
                        mp.game.graphics.notify("~r~Cannot tase! Target exiting vehicle!");
                        return true;
                    }

                    if(player.weapon == 911657153 && (targetEntity.getVariable("HasShot") == true || chaseTimeCur < 60) && targetEntity.getVariable("Team") == 0)
                    {
                        return true;
                    }
                }
            }

            if(targetEntity.isInAnyVehicle(false) == false)
            {
                if(targetEntity.getVariable("Team") != -1)
                {
                    if(player.getVariable("Team") == targetEntity.getVariable("Team"))
                    {
                        mp.events.callRemote("PlayerShotAtWrongPlayer", 0, targetEntity);
                        return true;
                    }
                    if(player.getVariable("Team") == 1 && targetEntity.getVariable("Team") == 0 && targetEntity.getVariable("HasShot") == false && 
                        player.weapon != 911657153 && chaseRunning) // Shot a fugitive that hasn't shot.
                    {
                        mp.events.callRemote("PlayerShotAtWrongPlayer", 1, targetEntity);
                        return true;
                    }
                }
            }

            let bone = -1;
            let previousOffset = 9999;

            for (let i = 0; i < bones.length; i++) {
                let boneCoords = targetEntity.getBoneCoords(bones[i], 0, 0, 0);
                let newOffset = getPointToBoneOffset(targetPosition.x, targetPosition.y, targetPosition.z, boneCoords.x, boneCoords.y, boneCoords.z);

                if (newOffset < previousOffset) {
                    bone = bones[i];
                    previousOffset = newOffset;
                }
            }

            if (previousOffset < boneDistanceThreshold)
                mp.events.callRemote('opsp', targetEntity, bone, mp.players.local.weapon);

            if(targetEntity.getVariable("Team") != mp.players.local.getVariable("Team") && chaseRunning && mp.players.local.getVariable("Team") != -1)
            {
                if(targetEntity.getVariable("Wounded") == 1)
                {
                    return true;
                }
            }
        }
    }

    if(mp.players.local.getVariable("HasShot") == false && player.getVariable("Team") == 0 && chaseRunning)
    {
        mp.events.callRemote("GivePlayerShotTag");
    }
    if(chaseRunning && mp.players.local.Team == 0 || mp.players.local.Team == 1)
        mp.events.callRemote("SetShotsFired", true);
});

mp._events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {

    if(targetEntity !== null && targetEntity !== undefined && targetEntity.type === 'player' && targetEntity == player)
    {
        if(sourceEntity !== null && sourceEntity !== undefined && sourceEntity.type === 'player')
        {

            if(weapon == 911657153 && targetEntity.isInAnyVehicle(false)) return true; // Disable stun if in car.

            if(targetEntity.getVariable("ClimbProtection") == true || sourceEntity.getVariable("ClimbProtection") == true) return true;

            if(BigInt(weapon) == BigInt(911657153) && BigInt(targetEntity.getVariable("LastVehEnterExit")) + BigInt(5000) >= BigInt(Date.now())) return true;

            if(weapon == 911657153 && targetEntity.getVariable("HasShot") == true && targetEntity.getVariable("Team") == 0 && chaseRunning) return true;

            if(sourceEntity.getVariable("Team") != -1 && player.getVariable("Team") != -1)
            {
                if(player.getVariable("Team") == sourceEntity.getVariable("Team"))
                {
                    return true;
                }

                if(sourceEntity.getVariable("Team") == 1 && player.getVariable("Team") == 0 && 
                    player.getVariable("HasShot") == false && weapon != 911657153 && chaseRunning) // Took damage from a cop and hasn't shot.
                {
                    return true;
                }

                if(chaseRunning)
                {
                    let HP = mp.players.local.getHealth();

                    if(HP - damage <= 15){

                        if(mp.players.local.getVariable("Wounded") == 0) 
                        {
                            if(!mp.players.local.isDead()){
                                mp.game.player.setInvincible(true);
                                mp.players.local.setInvincible(true);
                                mp.events.callLocal("setWounded", 1, sourcePlayer.remoteId);
                                damage = 0;
                                mp.game.weapon.setCurrentDamageEventAmount(0);
                                mp.game.weapon.cancelCurrentDamageEvent();
                                return true;
                            }
                            else{
                                damage = 0;
                                mp.game.weapon.setCurrentDamageEventAmount(0);
                                mp.game.weapon.cancelCurrentDamageEvent();
                                return true;
                            }
                        }
                    }

                    if(mp.players.local.getVariable("Wounded") == 1)
                    {
                        damage = 0;
                        mp.game.weapon.setCurrentDamageEventAmount(0);
                        mp.game.weapon.cancelCurrentDamageEvent();
                        return true;
                    }
                }
            }
        }
    }
});

mp.events.add("togglePlayerCrawl", (toggle) => {toggleCrawl(toggle)});

let crawlAnim;
let crawlAnimTimeout;

let woundedTimeLeft = 60;
let woundedTimer = null;

mp.events.add('render', () => {
    if(mp.players.local.getVariable("Wounded") > 0){
        //if (mp.players.local.isInAnyVehicle(false)) { // making sure to disable driveby and vehicle movement completely good RP
            mp.game.controls.disableControlAction(0, 61, true);
            mp.game.controls.disableControlAction(0, 62, true);
            mp.game.controls.disableControlAction(0, 63, true);
            mp.game.controls.disableControlAction(0, 64, true);
            mp.game.controls.disableControlAction(0, 71, true);
            mp.game.controls.disableControlAction(0, 72, true);
            mp.game.controls.disableControlAction(0, 73, true);
            mp.game.controls.disableControlAction(0, 74, true);
            mp.game.controls.disableControlAction(0, 75, true);
            mp.game.controls.disableControlAction(0, 278, true);
            mp.game.controls.disableControlAction(0, 279, true);

            mp.game.controls.disableControlAction(0, 76, true);
            mp.game.controls.disableControlAction(0, 91, true);
            mp.game.controls.disableControlAction(0, 92, true);
            mp.game.controls.disableControlAction(0, 24, true);
            mp.game.controls.disableControlAction(0, 25, true);
            mp.game.controls.disableControlAction(0, 69, true);
            mp.game.controls.disableControlAction(0, 70, true);
            mp.game.controls.disableControlAction(0, 140, true);
            mp.game.controls.disableControlAction(0, 141, true);
            mp.game.controls.disableControlAction(0, 142, true);
            mp.game.controls.disableControlAction(0, 257, true);
            mp.game.controls.disableControlAction(0, 263, true);
            mp.game.controls.disableControlAction(0, 265, true);
            mp.game.controls.disableControlAction(32, 68, true);
            mp.game.controls.disableControlAction(32, 70, true);

            // MOVEMENT CONTROLS JUMP AND SPRINT
            mp.game.controls.disableControlAction(0, 22, true);
            mp.game.controls.disableControlAction(0, 102, true);
            mp.game.controls.disableControlAction(0, 258, true);
            mp.game.controls.disableControlAction(0, 259, true);
            mp.game.controls.disableControlAction(0, 350, true);

            mp.game.controls.disableControlAction(0, 137, true);
        
    }
});

mp.events.add("ResetWounded", () => {
    mp.game.graphics.stopScreenEffect('DrugsDrivingIn');
    toggleCrawl(false);

    if(chaseRunning && mp.players.local.getVariable("Team") >= 0) 
    {
        mp.players.local.setInvincible(false);
        mp.game.player.setInvincible(false);
    }

    if(woundedTimer != null) 
    {
        clearInterval(woundedTimer);
        woundedTimer = null;
    }
});

mp.events.add('setWounded', (state, idToPass) => 
{
    // if its trying to set the same state but the state isnt 0 [revive or clearing vars]
    if (state == mp.players.local.getVariable("Wounded") && state != 0) return;
    if (!chaseRunning && state != 0) return;
    // if the player is no longer in a team and it tries to set them wounded [but not 0]
    if ((mp.players.local.getVariable("Team") != 1 && mp.players.local.getVariable("Team") != 0) && state != 0) return;
    // if the player is already in crawl mode and it tries to set them to state 1 [ragdoll] return
    if(mp.players.local.getVariable("Wounded") == 2 && state == 1) return;
    if(mp.players.local.isDead()) return;

    if(state == 1) // Pre-wounded (beginning of wounded mode) --ragdolling the player and waiting 3 secs before giving ability to crawl
    {
        if(woundedTimer != null)
        {
            clearInterval(woundedTimer);
            woundedTimer = null;
        }

        woundedTimeLeft = 60;

        woundedTimer = setInterval(() => {

            if(!chaseRunning || mp.players.local.getVariable("Wounded") == 0 || mp.players.local.getVariable("Team") < 0) 
            {
                clearInterval(woundedTimer);
                woundedTimer = null;
                return;
            }

            if(woundedTimeLeft > 0) 
            {
                woundedTimeLeft--;
                if(woundedTimeLeft % 5 == 0) // Every 5 seconds. Please. No event spams.
                {
                    mp.events.callRemote("WoundedTimerTick", woundedTimeLeft);
                }
            }
            else
            {
                mp.events.callRemote("WoundedTimerTick", 0);
            }
        }, 1000);

        if(!mp.players.local.isInAnyVehicle(false))
        {
            mp.players.local.setToRagdoll(4000, 4000 * 2, 0, true, true, true);

            setTimeout(() => {
                if(chaseRunning && mp.players.local.getVariable("Team") >= 0 && mp.players.local.getVariable("Wounded") != 0 && !mp.players.local.isDead())
                {
                    mp.events.callLocal("setWounded", 2, -1);
                }
            }, 4030);
        }
        else 
        {
            mp.events.callRemote("play_anim", 'anim@veh@lowrider@std@ds@arm@base', 'die', 2, 8.0, 0, -1, 0, false, false, false);
        }
        mp.game.player.setInvincible(true);
        mp.game.player.setInvincible(true);
        setTimeout(() => {
            if(chaseRunning && mp.players.local.getVariable("Team") >= 0 && mp.players.local.getVariable("Wounded") != 0 && !mp.players.local.isDead())
            {
                mp.events.callLocal("setWounded", 2, -1);
            }
        }, 2000);
        mp.events.callRemote("play_anim", "amb@world_human_push_ups@male@exit", "exit", 2, 8.0, 0, -1, 0, false, false, false);
        //mp.game.graphics.startScreenEffect('DrugsDrivingIn', -1, true);
    }
    else if(state == 2) // As wounded player goes into wounded state
    {
        if(mp.players.local.getVariable("Wounded") != 1 || !chaseRunning || mp.players.local.getVariable("Team") < 0 || mp.players.local.isDead()) return;
        
        mp.players.local.setInvincible(false);
        mp.game.player.setInvincible(false);
        if(!mp.players.local.isInAnyVehicle(false))
        {
            mp.players.local.clearDrivebyTaskUnderneathDrivingTask();
            mp.events.callRemote("clear_tasks", 1);
            mp.events.callRemote("play_anim", 'move_crawlprone2crawlfront', 'front', 2, 8.0, 0, -1, 0, false, false, false);
            toggleCrawl(true);   
        }   
        else{
            mp.events.callRemote("play_anim", 'anim@veh@lowrider@std@ds@arm@base', 'die', 2, 8.0, 0, -1, 0, false, false, false);
        }
    }
    else if(state == 0) // DISABLE WOUNDED
    {
        mp.events.callLocal("ResetWounded");
    }

    mp.events.callRemote("ServerConsoleOutput", `calling cs->ss SetPlayerWounded(${state}, ${idToPass}) for ${mp.players.local.name}`);
    mp.events.callRemote("SetPlayerWounded", state, idToPass);
});

function handleCrawlControls() 
{
    if(!mp.players.local) return;
    if (!mp.players.local.crawl) return;
    if(chatStatus) return;
    let dict = 'move_crawl';
    let rotation = mp.players.local.getRotation(2);
    mp.game.controls.disableControlAction(0, 32, true);
    mp.game.controls.disableControlAction(0, 33, true);
    mp.game.controls.disableControlAction(0, 34, true);
    mp.game.controls.disableControlAction(0, 35, true);
    if(mp.game.controls.isDisabledControlPressed(0, 34))
    {
        mp.players.local.setRotation(rotation.x, rotation.y, rotation.z + 0.5, 2, true);
    }
    if(mp.game.controls.isDisabledControlPressed(0, 35))
    {
        mp.players.local.setRotation(rotation.x, rotation.y, rotation.z - 0.5, 2, true);
    }
    if(mp.game.controls.isDisabledControlPressed(0, 32))
    {
        if (crawlAnim === ('onfront_fwd' || 'onfront_bwd') || crawlAnimTimeout) return;

        crawlAnim = 'onfront_fwd';

        let timer = mp.game.entity.getEntityAnimDuration('move_crawl', crawlAnim);

        mp.game.streaming.requestAnimDict(dict);

        mp.players.local.taskPlayAnim(dict, crawlAnim, 8.0, 1000, -1, 2, 0, false, false, false);

        crawlAnimTimeout = setTimeout(() => {
            crawlAnim = undefined;
            crawlAnimTimeout = undefined;
        }, (timer - 0.1) * 1000);
    }
    if(mp.game.controls.isDisabledControlPressed(0, 33))
    {
        if (crawlAnim === ('onfront_fwd' || 'onfront_bwd') || crawlAnimTimeout) return;
        crawlAnim = 'onfront_bwd';

        let timer = mp.game.entity.getEntityAnimDuration('move_crawl', crawlAnim);

        mp.game.streaming.requestAnimDict(dict);

        mp.players.local.taskPlayAnim(dict, crawlAnim, 8.0, 1000, -1, 2, 0, false, false, false);

        crawlAnimTimeout = setTimeout(() => {
            crawlAnim = undefined;
            crawlAnimTimeout = undefined;
        }, (timer - 0.1) * 1000);
    }
}

function toggleCrawl(option){
    if(option == true){
        if(mp.players.local.crawl){
            mp.players.local.crawl = false;
            clearInterval(crawlInterval);
            mp.players.local.clearTasks();
            //player.clearSecondaryTask()

            toggleCrawl(option);
        }
        else{
            crawlInterval = setInterval(handleCrawlControls, 0);
            mp.players.local.crawl = true;
            mp.game.streaming.requestAnimDict('move_crawlprone2crawlfront');

            mp.players.local.taskPlayAnim(
                'move_crawlprone2crawlfront',
                'front',
                8.0,
                1000,
                -1,
                2,
                0,
                false,
                false,
                false
            );
        }
    }
    else{
        if(mp.players.local.crawl){
            mp.players.local.crawl = false;
            clearInterval(crawlInterval);
            mp.players.local.clearTasks();
            //player.clearSecondaryTask()
        }       
    }
}

function isMeleeWeapon(weapon){
    switch(weapon){
        case 2725352035:
        case 2578778090:
        case 1737195953:
        case 1317494643:
        case 2508868239:
        case 1141786504:
        case 2227010557:
        case 4192643659:
        case 2460120199:
        case 3638508604:
        case 4191993645:
        case 3713923289:
        case 3756226112:
        case 3441901897:
        case 2484171525:
        case 419712736:
            return true;
        default: return false;
    }
}

mp._events.add("outgoingDamage", (sourceEntity, targetEntity, targetPlayer, weapon, boneIndex, damage) => {
    if(sourceEntity !== undefined && sourceEntity !== null && sourceEntity.type === 'player' && sourceEntity == player && player.getVariable("Team") != -1)
    {
        if(targetEntity !== undefined && targetEntity !== null && targetEntity.type === 'player')
        {
            if(sourceEntity.getVariable("ClimbProtection") == true || targetEntity.getVariable("ClimbProtection") == true) return true;

            if(targetEntity.getVariable("Team") != -1 && player.getVariable("Team") != -1)
            {
                if(sourceEntity.getVariable("Team") == targetEntity.getVariable("Team"))
                {
                    return true;
                }

                if(sourceEntity.getVariable("Team") == 1 && targetEntity.getVariable("Team") == 0 && chaseRunning)
                {
                    if(targetEntity.getVariable("HasShot") == false) // Shot a fugitive that hasn't shot.
                    {
                        if(weapon != 911657153) return true; // cant damage dem at alll if thy havent shot unless taser

                        if(chaseTimeCur < 60) return true; // nah not at da start

                        if(targetEntity.getVariable("TaseProtection") == true && targetEntity.getVariable("Team") == 0)
                        {
                            mp.game.graphics.notify("~r~Cannot tase! Target exiting vehicle!");
                            return true;
                        }

                        if(targetEntity.getVariable("Team") == 0 && targetEntity.getVariable("HasShot") == true) {
                            return true;
                        }

                        if((targetEntity.isInAnyVehicle(false) == true || 
                            calcDist(targetEntity.position, player.position) > 7.5)) {

                            mp.game.graphics.notify("~r~Taser out of reach, get closer!");
                            return true; // Stun Gun no shot if more than 10 meters or target in car.
                        }
                    }
                    else{
                        if(weapon == 911657153){ // Attempt to tase a fugitive with shot tag.
                            mp.game.graphics.notify("~r~Target has shot, cannot tase them!");
                            return true;
                        }
                    }
                }
                if(sourceEntity.getVariable("Team") == 0 && targetEntity.getVariable("Team") == 1 && sourceEntity.getVariable("HasShot") == false
                    && isMeleeWeapon(weapon) && chaseRunning)
                {
                    mp.events.callRemote("GivePlayerShotTag");
                }

                if(sourceEntity.getVariable("Team") != targetEntity.getVariable("Team"))
                {
                    if(targetEntity.getVariable("Wounded") == 1)
                    {
                        damage = 0;
                        mp.game.weapon.setCurrentDamageEventAmount(0);
                        mp.game.weapon.cancelCurrentDamageEvent();
                        return true;
                    }
                    if(targetEntity.getVariable("Wounded") == 2)
                    {
                        mp.events.callRemote("opsp", targetPlayer, boneIndex, mp.players.local.weapon);
                        return true;
                    }
                }
            }
        }
        else if(targetEntity.type === 'vehicle' && player.getVariable("Team") != -1)
        {
            if(targetEntity.getVariable("Team") !== undefined && player.getVariable("Team") != -1)
            {
                let breakShot = false;
                var vehicleOccupants = 0;

                if(weapon == 911657153)
                {
                    breakShot = true;
                    mp.console.logInfo("Taser does not work for vehicles. (2)");
                }

                if(targetEntity.getVariable("Team") == player.getVariable("Team"))
                {
                    breakShot = true; // Break team-kill car by default
                    
                    mp.players.streamed.forEach(occupant => {
                        if(occupant.isInVehicle(targetEntity.handle, false)) {
                            vehicleOccupants++;
                            if(occupant.getVariable("Team") != player.getVariable("Team")) {
                                breakShot = false; // Don't break shot if there's a fugi in or opposite team member!
                            }
                        }
                    });

                    if(vehicleOccupants == 0) breakShot = false;

                    if(breakShot) mp.game.graphics.notify("~r~Do not teamkill!");
                }
                else if(targetEntity.getVariable("Team") == 0 && player.getVariable("Team") == 1 && weapon != 911657153 && chaseRunning)
                {
                    breakShot = true; // Break innocent car shots by default.

                    mp.players.streamed.forEach(occupant => {
                        if(occupant.isInVehicle(targetEntity.handle, false)) {
                            vehicleOccupants++;
                            if(occupant.getVariable("Team") == 0 && occupant.getVariable("HasShot") == true && !occupant.isDead()) {
                               breakShot = false; // Don't break shot if there's a fugitive that shot in!
                            }
                        }
                    });

                    if(vehicleOccupants == 0) breakShot = false;

                    if(breakShot) mp.game.graphics.notify("~r~Do not deathmatch!");
                }

                if(targetEntity.getVariable("Team") == 0 && player.getVariable("Team") == 1 && weapon == 911657153)
                {
                    breakShot = true;
                    mp.console.logInfo("Taser does not work for vehicles.");
                }

                if(breakShot == true) return true;
            }
        }
    }
});

mp.events.add("entplayanim", (entity, animDictionary, animName, animFlag, speed = 8.0, speedMul = 0.0, duration = -1, playbackRate = 0.0, lockX = false, lockY = false, lockZ = false) => {
    if(entity.handle === 0) return;

    if(entity.remoteId == mp.players.local.remoteId)
    {
        mp.events.callRemote("UpdateLastAnim", animDictionary, animName);
    }

	mp.game.streaming.requestAnimDict(animDictionary);
	new Promise(() => {
	const timer = setInterval(() => {
		if(mp.game.streaming.hasAnimDictLoaded(animDictionary)) {
			clearInterval(timer);
			resolvePlayAnim(entity, animDictionary, animName, animFlag, speed, speedMul, duration, playbackRate, lockX, lockY, lockZ);
		}
	}, 100);
});
});

mp.events.add("entcleartasks", (entity, immediately) => {
    if(entity.handle === 0) return;

    if(immediately == 1) entity.clearTasksImmediately();
    else entity.clearTasks();
});

function resolvePlayAnim(entity, animDictionary, animName, animFlag, speed = 8.0, speedMul = 0.0, duration = -1, playbackRate = 0.0, lockX = false, lockY = false, lockZ = false)
{
	entity.taskPlayAnim(animDictionary, animName, speed, speedMul, duration, animFlag, playbackRate, lockX, lockY, lockZ);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

mp.events.add("entclearanim", (entity, animDictionary, animName) => {
    
    if(animDictionary != "null" || animDictionary != null)
    {
        entity.stopAnimTask(animDictionary, animName, 1.0);
    }
    if(!entity.isFalling()) entity.clearTasks();
});

mp.events.add('native:call', (nativeName, args, hasCallback) => {
    let commandString = "";
    if(args.length > 0)
    {
        commandString = nativeName + "(";
        for(var i = 0; i < args.length; i++)
        {
            if(typeof args[i] === 'string')
            {
                commandString += '"' + args[i] + '"';
            }
            else commandString += args[i];
 
            if(i != args.length - 1)
            {
                commandString += ", ";
            }
        }
        commandString += ");";
    }
    else commandString = nativeName + "();";
 
    var native = eval(commandString);
 
    if(hasCallback)
    {
        mp.events.callRemote("native:return", native);
    }
});

mp.events.add(
{
    "GetGroundZ": (px, py, pz, dimension, returnEvent) => {
        let getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(px, py, pz, parseFloat(0), false);

        mp.events.callRemote(returnEvent, px, py, getGroundZ, dimension);
    },
    "ChangeVehicleHeading": (heading) => {
        if(mp.players.local.isInAnyVehicle(false)) mp.players.local.vehicle.setHeading(heading);
    },

    "ToggleAFOB": (status, speedLimit) => {
        AFOB_LastF = Date.now();
        AFOB_LastSeat = -1;
        AFOB_LastVeh = null;
        AFOB_Enabled = status;
        AFOB_LastSpeed = 0;

        if(status) AFOB_SpeedLimit = speedLimit;
    },

    "ToggleSeatbelt": (status) => {
        Seatbelt_Enabled = status;
        Seatbelt_LastMessage = Date.now() - 100000;
        Seatbelt_LastVeh = null;
        Seatbelt_LastSeat = -1;
    },

    "SyncServerSettings": (onfootcollisions, cameraUpdateTime) => {
        ServerSettings.OnfootCollisions = onfootcollisions;
        ServerSettings.CameraUpdateTime = cameraUpdateTime;
    },
    "ToggleClientRadio": () => {
        radioToggle = !radioToggle;

        mp.storage.data.radiotoggle = radioToggle;

        mp.storage.flush();

        if(!radioToggle) pushMessageToChat("!{#FF6347}[!] !{#FFFFFF}Vehicle radio toggled OFF.");
        else pushMessageToChat("!{#FF6347}[!] !{#FFFFFF}Vehicle radio toggled ON.");
    },
    "SetInVehEx": (vehicle, vehseat) => {
        mp.players.local.setIntoVehicle(vehicle.handle, vehseat);
    },
    "ToggleHud": (show) => {
        if(show)
        {
            if(mp.players.local.getVariable("InLobby") == -4 && derbyText != null) {
                derbyText.visible = true;
            }
        }
        else{

            if(derbyText != null) {
                derbyText.visible = false;
            }
        }
    },
    "ClearTaskNotFalling": () => {
        if(!mp.players.local.isFalling()) mp.players.local.clearTasksImmediately();
    },
    "ThrowFromVehicle": () => {
        let localVeh = mp.players.local.vehicle;
        if (localVeh) {
            mp.players.local.taskLeaveVehicle(localVeh.handle, 4160);
        }
    },
    "DisableControlActions": (actiongroup) => {
        mp.game.controls.disableAllControlActions(actiongroup);
    },

    "EnableControlActions": (actiongroup) => {
        mp.game.controls.enableAllControlActions(actiongroup);
    },

    "SetHandcuffs": (status) => {
        if(status == true)
        {
            mp.players.local.clearTasksImmediately();

            mp.players.local.setEnableHandcuffs(true);

            mp.events.callRemote("play_anim", "mp_prison_break", "handcuffed", 32, 8.0, 0.0, -1, 0.0, false, false, false);
        }
        else
        {
            mp.players.local.setEnableHandcuffs(false);

            mp.players.local.clearTasksImmediately();
        }
    },
    "SetHandsup": (status) =>
    {
        if(status == true)
        {
            mp.events.callRemote("play_anim", "ped", "handsup_base", 50, 8.0, 0.0, -1, 0.0, false, false, false);
        }
        else
        {
            mp.events.callRemote("play_anim", "ped", "handsup_exit", 50, 8.0, 0.0, -1, 0.0, false, false, false);
            mp.players.local.stopAnim("handsup", "ped", 8.0);

            setTimeout(() => {
                mp.players.local.stopAnim("handsup_exit", "ped", 8.0);
                mp.players.local.clearTasksImmediately();
            }, 500);
        }
    },
    "SetDerbyCounting": (status, time) => {
        derbyTimeCur = time;
        derbyCounting = status;
    },
    "SetTimeWeather": (hour, minute, second, weather) => {
        mp.game.time.setClockTime(hour, minute, second);

        switch(weather) {
            case 0:
                mp.game.gameplay.setWeatherTypeNow('EXTRASUNNY');
                break;
            case 1:
                mp.game.gameplay.setWeatherTypeNow('CLEAR');
                break;
            case 2:
                mp.game.gameplay.setWeatherTypeNow('CLOUDS');
                break;
            case 3:
                mp.game.gameplay.setWeatherTypeNow('SMOG');
                break;
            case 4:
                mp.game.gameplay.setWeatherTypeNow('FOGGY');
                break;
            case 5:
                mp.game.gameplay.setWeatherTypeNow('OVERCAST');
                break;
            case 6:
                mp.game.gameplay.setWeatherTypeNow('RAIN');
                break;
            case 7:
                mp.game.gameplay.setWeatherTypeNow('THUNDER');
                break;
            case 8:
                mp.game.gameplay.setWeatherTypeNow('CLEARING');
                break;
            case 9:
                mp.game.gameplay.setWeatherTypeNow('SNOWLIGHT');
                break;
            default:
                mp.game.gameplay.setWeatherTypeNow('CLOUDS');
                break;
        }
    },
    "SpectatePlayer": (target) => {

        if(specCam != null)
        {
            specCam.setActive(false);
            specCam.destroy();
            specCam = null;
        }

        specTarget = target;

        mp.game.cam.renderScriptCams(false, false, 0, true, false);

        specCam = mp.cameras.new('default', target.position, new mp.Vector3(0, 0, target.getHeading()), target.isInAnyVehicle(false) ? 80 : 60);
        specCam.attachTo(target.handle, 0, target.isInAnyVehicle(false) ? -6 : -5, target.isInAnyVehicle(false) ? 3 : 1, true);
        specCam.setActive(true);

        mp.game.cam.renderScriptCams(true, false, 0, true, false);

        specState = true;
    },

    "ShakeCam": (shakeType, amplit, time) => {
        mp.game.cam.shakeGameplayCam(shakeType, amplit);
        setTimeout(() => {
            mp.game.cam.stopGameplayCamShaking(true);
        }, time);
    },

    "PlayMissionComplete": (type) => {
        mp.game.audio.playMissionCompleteAudio(type);
    },

    "StopSpectating": () => {

        specTarget = null;
        specState = false;

        mp.game.cam.renderScriptCams(false, false, 0, true, false);

        if(specCam != null)
        {
            specCam.setActive(false);
            specCam.destroy();
            specCam = null;
        }
    },

    "setToRagdoll": (time1, time2, ragdollType, p4, p5, p6) => {
        player.clearTasksImmediately();
        player.setToRagdoll(time1, time2, ragdollType, p4, p5, p6);
    },
    "SetJailCounter": (time) => {
        currentJailTime = time;
        lastJailUpdate = 10;
    },
    "SetMuteCounter": (time) => {
        currentMuteTime = time;
        lastMuteUpdate = 10;
    },

    "SetActorInvulnerable": (toggle) => {
        if(toggle)
        {
            player.setInvincible(true);
        }
        else
        {
            player.setInvincible(false);
        }
    },

    "StartChaseTimer": (iTimeCur, iTimeMax, collisionDuration, mode) => {

        chaseTimeCur = iTimeCur - 1;
        chaseTimeMax = iTimeMax;
        collisionTime = collisionDuration;
        chaseRunning = true;
        chaseMode = mode;
    },

    "SendNotification": (title, text, attribute, duration) => {
        mp.system.notify(title, text, attribute, duration, false);
    },

    "HideChaseTimer": () => {
        if(UIHud != null) UIHud.execute(`gm.gameProgress = false;`);
        chaseRunning = false;
    },

    "playerEnterVehicle": (vehicle, seat) => {
        dbDisabledMsg = false;
        player.seat = seat;
        mp.events.callRemote("UpdateLastVehEnterExit", Date.now());
        if(vehicle.Collisions == undefined || vehicle.Collisions == true) vehicle.setInvincible(false);

        if(!radioToggle && seat == -1) mp.game.invoke('0x1B9C0099CB942AC6', vehicle.handle, 'OFF');

        if(mp.game.vehicle.isThisModelAHeli(vehicle.model) || mp.game.vehicle.isThisModelAPlane(vehicle.model)) {
            mp.events.callRemote("RequestParachute", vehicle);
        }

        if (seat == -1) {
            if(vehicle.getVariable("Engine") !== undefined)
            {
                vehicle.setEngineOn(vehicle.getVariable("Engine"), true, true);
            }
            else vehicle.setEngineOn(true, true, true);
        }
    },

    "playerLeaveVehicle": (vehicle, seat) => {
        if (vehicle != null) {
            mp.events.callRemote("UpdateLastVehEnterExit", Date.now());
            if(Seatbelt_Enabled == true && vehicle.getClass() != 8 && vehicle.model != mp.game.joaat('policeb'))
            {
                mp.game.graphics.notify("~r~You cannot leave with seatbelt on.");
                mp.players.local.clearTasks();
                mp.players.local.setIntoVehicle(vehicle.handle, seat);
            }

            if(vehicle.getVariable("Engine") !== undefined)
                vehicle.setEngineOn(vehicle.getVariable("Engine"), true, true);
            else vehicle.setEngineOn(true, true, true);
        }
    },

    "InitChaseTimer": () => {
        
        if(UIHud != null) UIHud.execute(`gm.gameProgress = false;`);

        if(derbyText == null)
        {
            derbyText = new timerBarLib.TimerBar(" ", false);
            derbyText.text = "N/A";
            derbyText.textColor = 109; // HUD_COLOUR_GOLD
            derbyText.usePlayerStyle = true;
            derbyText.visible = false;
        }
    },

    "DestroyPlayerCamera": () => destroyCam(),

    "SetPlayerFrozen": (status) => {
        player.freezePosition(status);

        if(player.vehicle)
        {
            player.vehicle.freezePosition(status);
        }
    },

    "CreatePlayerCamera": (x, y, z, rx, ry, rz, viewangle, moveable = false) => {
        createCam(x, y, z, rx, ry, rz, viewangle, moveable);
    },

    "SetDiscordStatus": (serverName, status) => {
        mp.discord.update(serverName, status);
    },

    "playerReady": (player) => {
        setTimeout(() => {
            loginBrowser = mp.browsers.new("package://LoginRegister/index.html"); // Right on connect so it doesn't overlay the notifications.
            loginBrowser.active = false;
        }, 1000);


        mp.events.callRemote("playerReadyCon");
        mp.game.gxt.set('PM_PAUSE_HDR', 'Race \'N\' Chase'); // Replace map title

        setInterval(() => {
            if(mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true)
            {
                mp.events.callRemote("UpdateTabbedState", mp.system.isFocused);
                mp.events.callLocal("TwoSecondsEvent");
            }
        }, 2000);
    },
});

mp.events.add("OnPlayerLoginRegister", () => {

    setTimeout(() => {
        setStorageDataVars();
    }, 550);

    if(mp.storage.data.menu !== undefined && mp.storage.data.menu.myweather !== undefined)
    {
        mp.events.callRemote("SetPlayerPrivateWeather", mp.storage.data.menu.myweather);
    }

    setTimeout(() => {
        focusChat(false);
    }, 250);
});

mp.events.add("setVoiceModeMenu", (value) => {
    mp.storage.data.menu.VoiceMode = value;
});

function setStorageDataVars(){

    LastKeyPress = Date.now();
    AFKStage = 0;

    if(mp.storage.data.menu.OOCauto !== undefined){
        autoOOC = mp.storage.data.menu.OOCauto;
        mp.events.callRemote("SetAutoOOC", autoOOC);
    }
    else{
        mp.storage.data.menu.OOCauto = autoOOC;
        mp.events.callRemote("SetAutoOOC", autoOOC);
    }

    if(mp.storage.data.menu.AutoJoin !== undefined){
        mp.players.local.AutoJoin = mp.storage.data.menu.AutoJoin;
        mp.events.callRemote("SetAutoJoin", mp.players.local.AutoJoin, false);
    }
    else{
        mp.storage.data.menu.AutoJoin = ((mp.players.local.AutoJoin) ? mp.players.local.AutoJoin : true);
        mp.events.callRemote("SetAutoJoin", mp.storage.data.menu.AutoJoin, false);
    }

    if(mp.storage.data.menu.InactiveChatOpacity == undefined){
        mp.storage.data.menu.InactiveChatOpacity = 0.5;
    }
    if(mp.storage.data.menu.ActiveChatOpacity == undefined){
        mp.storage.data.menu.InactiveChatOpacity = 1.0;
    }
    if(mp.storage.data.menu.ShowInactiveChat == undefined){
        mp.storage.data.menu.ShowInactiveChat = true;
    }
    if(mp.storage.data.menu.CameraSwitch == undefined){
        mp.storage.data.menu.CameraSwitch = true;
    }
    if(mp.storage.data.menu.AutoLogin == undefined){
        mp.storage.data.menu.AutoLogin = true;
    }

    if(mp.storage.data.menu.EventMusic !== undefined){
        mp.players.local.EventMusic = mp.storage.data.menu.EventMusic;
    }
    else{
        mp.storage.data.menu.EventMusic = true;
        mp.players.local.EventMusic = true;
    }

    if(mp.storage.data.menu.monitoring !== undefined){
        if(UIHud != undefined && UIHud != null)
            UIHud.execute(`gm.$refs.TopRight.$refs.Info.monitor = ${mp.storage.data.menu.monitoring}`);
    }
    else{
        mp.storage.data.menu.monitoring = false;
        if(UIHud != undefined && UIHud != null)
            UIHud.execute(`gm.$refs.TopRight.$refs.Info.monitor = false;`);
    }

    if(mp.storage.data.menu.VoiceMode !== undefined){
        //mp.storage.data.menu.VoiceMode = false;
        mp.events.callRemote("SetVoiceMode", mp.storage.data.menu.VoiceMode, false);
    }
    else{
        mp.storage.data.menu.VoiceMode = 0;
        mp.events.callRemote("SetVoiceMode", 0, false);
    }

    if(mp.storage.data.menu.CustomCrosshair !== undefined){
        showCustomCrosshair = mp.storage.data.menu.CustomCrosshair;
    }
    else{
        showCustomCrosshair = false;
        mp.storage.data.menu.CustomCrosshair = false;
    }
    if(mp.storage.data.menu.AlwaysOnCrosshair !== undefined){
        alwaysShowCustomCrosshair = mp.storage.data.menu.AlwaysOnCrosshair;
    }
    else{
        alwaysShowCustomCrosshair = false;
        mp.storage.data.AlwaysOnCrosshair = false;
    }
    if(mp.storage.data.menu.SniperCustomCrosshair !== undefined){
        showCustomCrosshairInSniper = mp.storage.data.menu.SniperCustomCrosshair;
    }
    else{
        showCustomCrosshairInSniper = false;
        mp.storage.data.menu.SniperCustomCrosshair = false;
    }

    mp.events.callLocal("LoadCrosshair");

    mp.storage.flush();
}
}