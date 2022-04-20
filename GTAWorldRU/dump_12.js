{
﻿var resolution = mp.game.graphics.getScreenResolution(0, 0);
var resolution_Ex = mp.game.graphics.getScreenActiveResolution(0, 0);

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

var draw_text = true;
var money = 0;
var draw_money = true;
var moneystring = "";
var draw_textures = false;
var max_amount = 0;
var print_hud = true;
var print_hud_ex = true;
var useKmh = false; // Toggle kmh / mph speedometer.
var m_hudWindow = null;
var bank = 0;
var bankstring = "";

var dirtymoney = 0;
var dirtymoneystring = "";

var res_X = 1920;
var res_Y = 1080;
var cardinalsText = "";
var road = "";
var m_playerId = "1.9.9e";
var m_onlineCount = 1;
var logged = 0;
var fuel = 100.0;
let miles = 0.00;
var ATCOnline = false

var aviationHUD_X = 0.006; //310; //550
var aviationHUD_Y = 0.205; //230; //240
var aviationHUD_Scale = 0.8; //1
var aviationHUD_Center = false; //true

var speedHUD_X = 0.006; //310; //440
var speedHUD_Y = 0.165; //190; //185
var speedHUD_Scale = 0.8; //1
var speedHUD_Center = false; //true

var fuelHUD_X = 0.006; //310; //415
var fuelHUD_Y = 0.125 //150; //130
var fuelHUD_Scale = 0.8; //0.9
var fuelHUD_Center = false; //true

var milesHUD_X = 0.006; //310; //615
var milesHUD_Y = 0.085; //110; //130
var milesHUD_Scale = 0.8; //0.9
var milesHUD_Center = false; //true

var speedoDivHUD_X = 0.005; //308; //400
var speedoDivHUD_Y = 0.045; //70; //63
var speedoDivHUD_Scale = 1;
var speedoDivHUD_Center = false; //true

var cardinalHUD_X = 0.025; //350;//335; //365
var cardinalHUD_Y = 0.046; //71; // 67
var cardinalHUD_Scale = 1; // 1.05
var cardinalHUD_Center = true; //true

var cardinalDivHUD_X = 0.038; //380;//360; //400
var cardinalDivHUD_Y = 0.045; //70; //63
var cardinalDivHUD_Scale = 1;
var cardinalDivHUD_Center = false; //true

var zoneHUD_X = 0.045; //397; //375; // 550
var zoneHUD_Y = 0.040 //65; //59
var zoneHUD_Scale = 0.5;
var zoneHUD_Center = false; //true;

var streetHUD_X = 0.045; //397; //375; // 550
var streetHUD_Y = 0.016; //40; //35
var streetHUD_Scale = 0.4;
var streetHUD_Center = false; //true;

var playerHUD_Y = 35; //40
var playerHUD_Scale = 0.45; //0.55

var moneyElement = null;
var bankElement = null;

var WidescreenOffset_X = 0;
var WidescreenOffset_Y = 0;

var bigmap_status = false;
var x_coord = 0;

var voiceChannelData = {
    channelID: 0,
    members: []
};

const blockedModels = [2280493020, 1664418166, 3211609992];
const useSpeedo = true;
const updateInterval = 500; // milliseconds, lower value = more accurate, at the cost of performance

const Natives = {
    IS_RADAR_HIDDEN: "0x157F93B036700462",
    IS_RADAR_ENABLED: "0xAF754F20EB5CD51A",
    SET_TEXT_OUTLINE: "0x2513DFB0FB8400FE"
};

let minimap = {};
mp.game.stats.statSetInt(mp.game.joaat("SP0_SHOOTING_ABILITY"), 20, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_STRENGTH"), 10, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_STAMINA"), 50, false);
// https://github.com/glitchdetector/fivem-minimap-anchor
function getMinimapAnchor() {
    let sfX = 1.0 / 20.0;
    let sfY = 1.0 / 20.0;
    let safeZone = mp.game.graphics.getSafeZoneSize();
    let aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
    let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    let scaleX = 1.0 / resolution.x;
    let scaleY = 1.0 / resolution.y;

    let minimap = {
        width: scaleX * (resolution.x / (4 * aspectRatio)),
        height: scaleY * (resolution.y / 5.674),
        scaleX: scaleX,
        scaleY: scaleY,
        leftX: scaleX * (resolution.x * (sfX * (Math.abs(safeZone - 1.0) * 10))),
        bottomY: 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(safeZone - 1.0) * 10))),
    };

    minimap.rightX = minimap.leftX + minimap.width;
    minimap.topY = minimap.bottomY + WidescreenOffset_Y - minimap.height;

    return minimap;
}

function drawText(text, drawXY, font, color, scale, center = false) {
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale, scale);
    mp.game.ui.setTextColour(color[0], color[1], color[2], color[3]);
    mp.game.invoke(Natives.SET_TEXT_OUTLINE);

    mp.game.ui.setTextCentre(center);

    mp.game.ui.drawText(drawXY[0], drawXY[1]);
}

/*mp.events.add("playerCommand", (command) => {
    const args = command.split(/[ ]+/);
    const commandName = args[0];
        
    if (commandName === "hud") {
        args.shift();
        const arg1 = args[0];
        if (arg1 === "fuel") {
            args.shift();
            fuelHUD_X = parseFloat(args[0]);
            fuelHUD_Y = parseFloat(args[1]);
            fuelHUD_Scale = parseFloat(args[2]);
            fuelHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[FUEL] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "speed") {
            args.shift();
            speedHUD_X = parseFloat(args[0]);
            speedHUD_Y = parseFloat(args[1]);
            speedHUD_Scale = parseFloat(args[2]);
            speedHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[SPEED] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "miles") {
            args.shift();
            milesHUD_X = parseFloat(args[0]);
            milesHUD_Y = parseFloat(args[1]);
            milesHUD_Scale = parseFloat(args[2]);
            milesHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[MILES] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "speedo") {
            args.shift();
            speedoDivHUD_X = parseFloat(args[0]);
            speedoDivHUD_Y = parseFloat(args[1]);
            speedoDivHUD_Scale = parseFloat(args[2]);
            speedoDivHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[SPEEDO DIV] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "aviation") {
            args.shift();
            aviationHUD_X = parseFloat(args[0]);
            aviationHUD_Y = parseFloat(args[1]);
            aviationHUD_Scale = parseFloat(args[2]);
            aviationHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[AVIATION] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "cardinal") {
            args.shift();
            cardinalHUD_X = parseFloat(args[0]);
            cardinalHUD_Y = parseFloat(args[1]);
            cardinalHUD_Scale = parseFloat(args[2]);
            cardinalHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[CARDINAL] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "cardinaldiv") {
            args.shift();
            cardinalDivHUD_X = parseFloat(args[0]);
            cardinalDivHUD_Y = parseFloat(args[1]);
            cardinalDivHUD_Scale = parseFloat(args[2]);
            cardinalDivHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[CARDINAL DIV] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "zone") {
            args.shift();
            zoneHUD_X = parseFloat(args[0]);
            zoneHUD_Y = parseFloat(args[1]);
            zoneHUD_Scale = parseFloat(args[2]);
            zoneHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[ZONE] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "street") {
            args.shift();
            streetHUD_X = parseFloat(args[0]);
            streetHUD_Y = parseFloat(args[1]);
            streetHUD_Scale = parseFloat(args[2]);
            streetHUD_Center = args[3] == 1 ? true:false;
            mp.gui.chat.push(`[STREET] X: ${args[0]}, Y: ${args[1]}, Scale: ${args[2]}, Center: ${args[3] == 1 ? true:false}`);
            return;
        }else if (arg1 === "players") {
            args.shift();
            playerHUD_Y = parseFloat(args[0]);
            playerHUD_Scale = parseFloat(args[1]);
            mp.gui.chat.push(`[PLAYERS] Y: ${args[0]}, Scale: ${args[1]}`);
            return;
        }else if (arg1 === "offset") {
            args.shift();
            WidescreenOffset_X = parseFloat(args[0]);
            WidescreenOffset_Y = parseFloat(args[1]);
            mp.gui.chat.push(`[Offset] X: ${args[0]}, Y: ${args[1]}`);
            return;
        }else{
            mp.gui.chat.push(`/hud [fuel, speed, miles, aviation, cardinal, zone, street, players] [x] [y] [scale] [center 0/1]`);
            return;
        }
    }
});*/

mp.events.add('setHUDOffset', (x, y) => {
    WidescreenOffset_X = parseFloat(x);
    WidescreenOffset_Y = parseFloat(y);

    mp.storage.data.widescreenoffsetx = WidescreenOffset_X;
    mp.storage.data.widescreenoffsety = WidescreenOffset_Y;
    mp.storage.flush();
});

let streetName = null;
let zoneName = null;
let isMetric = false;
var interiorName = "";

function updateDirectionText() {
    var camera = mp.cameras.new("gameplay");
    var cameraDirection = camera.getDirection();

    if (0.3 < cameraDirection.x && 0.3 < cameraDirection.y) {
        cardinalsText = "СВ";
    } else if (cameraDirection.x < -0.3 && 0.3 < cameraDirection.y) {
        cardinalsText = "СЗ";
    } else if (0.3 < cameraDirection.x && cameraDirection.y < -0.3) {
        cardinalsText = "ЮВ";
    } else if (cameraDirection.x < -0.3 && cameraDirection.y < -0.3) {
        cardinalsText = "ЮЗ";
    } else if (-0.3 < cameraDirection.x && cameraDirection.x < 0.3 && cameraDirection.y < -0.3) {
        cardinalsText = "Ю";
    } else if (cameraDirection.x < -0.3 && -0.3 < cameraDirection.y && cameraDirection.y < 0.3) {
        cardinalsText = "З";
    } else if (0.3 < cameraDirection.x && -0.3 < cameraDirection.y && cameraDirection.y < 0.3) {
        cardinalsText = "В";
    } else if (-0.3 < cameraDirection.x && cameraDirection.x < 0.3 && cameraDirection.y > 0.3) {
        cardinalsText = "С";
    }
    camera.destroy(true);
}

/*
mp.events.add('addPlayerToPlayerList', (currentPlayers, id, name, ping, playerListArray) => 
{
    m_onlineCount = currentPlayers;
});
*/
function updateValues() {
    if (mp.players.local === null || mp.players.local === undefined)
        return;

    mp.game.player.restoreStamina(100);
    minimap = getMinimapAnchor();

    if (typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.widescreenoffsetx !== 'undefined' && mp.storage.data.widescreenoffsetx) {
        WidescreenOffset_X = mp.storage.data.widescreenoffsetx;
    }
    if (typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.widescreenoffsety !== 'undefined' && mp.storage.data.widescreenoffsety) {
        WidescreenOffset_Y = mp.storage.data.widescreenoffsety;
    }
    //resolution_Ex = mp.game.graphics.getScreenActiveResolution(0,0);

    // Only get the location, if radar is enabled and visible
    if (mp.game.invoke(Natives.IS_RADAR_ENABLED) && !mp.game.invoke(Natives.IS_RADAR_HIDDEN)) {
        isMetric = mp.game.gameplay.getProfileSetting(227) == 1;
        const position = mp.players.local.position;
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
        zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
        streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName) streetName += ` / ${mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)}`;
    } else {
        streetName = null;
        zoneName = null;
    }
    updateDirectionText();
    if (m_hudWindow != null) {
        m_hudWindow.execute(`playerId("${m_playerId}");`);
        m_hudWindow.execute(`onlineCount(${m_onlineCount});`);
        m_hudWindow.execute(`locationData("${cardinalsText + " | " + zoneName}", "${streetName}");`);
    }
}

setInterval(() => {
    if (!print_hud || !print_hud_ex)
        return;

    if (logged && draw_text) {
        updateValues();
    }
}, 1000);

var hud_display = true;
var isInCCTV = false;
var tempVehicleDistance = 0.0;
var distanceTimeNow = null;
var RenderTimeNow = null;
var BurnoutCheck = 0;
var toggled_f7 = true;
mp.keys.bind(0x76, true, (player) => {
    if (m_hudWindow != null)
        m_hudWindow.active = !toggled_f7;
    toggled_f7 = !toggled_f7;
});

var FuelType = "Fuel";

mp.events.add({
    "toggle_bigmap": (bool) => {
        bigmap_status = bool;
        draw_text = true;
    },

    "toggle_kmh": (bool) => {
        useKmh = !useKmh;
    },

    "update_fuel": (amount, type = "Fuel") => {
        mp.discord.update("GTA WORLD RU", "gta-world.ru");
        fuel = amount;
        FuelType = type;
    },

    "update_miles": (amount) => {
        miles = amount;
    },
    "GTAWUI::show": (player, playerid) => {
        if (m_hudWindow == null) {
            m_hudWindow = mp.browsers.new("package://gtalife/gtawhud/index.html");
            m_hudWindow.execute(`locationData("${zoneName}", "${streetName}");`);
            //m_playerId = playerid;
            //m_hudWindow.execute(`playerId("${m_playerId}");`);
        }
    },

    "start_vehicle_distance": () => {
        tempVehicleDistance = 0.0;
        distanceTimeNow = Date.now();
    },

    "client_get_distance": (type = 0, vehicle = null) => {
        var player = mp.players.local;
        var veh;
        if (vehicle == null) {
            veh = player.vehicle;
        } else {
            veh = vehicle;
        }

        if (veh !== null) {
            if (tempVehicleDistance < 100.0) {
                mp.events.callRemote('server_send_distance', tempVehicleDistance, type, veh);
                tempVehicleDistance = 0.0;
                distanceTimeNow = Date.now();
            }
        }
    },
    "atc_online": (online) => {
        ATCOnline = online;
    },
    "logged": () => {
        logged = 1;
    },

    "hud_display": () => {
        hud_display = !hud_display;
    },

    "StartWatchCCTV": (pos, rot) => {
        isInCCTV = true;
        let cctvCamera = API.createCamera(pos, rot);
        API.setActiveCamera(cctvCamera);
    },

    "StopWatchCCTV": () => {
        isInCCTV = false;
    },

    "display_gtaw": () => {
        if (draw_text)
            draw_text = false;
        else
            draw_text = true;
    },

    "toggle_display_gtaw": (toggle) => {
        draw_text = toggle;
    },


    "moneyDisplay": (amount) => {
        money = amount;
        if (money != null) {
            moneystring = "$" + numberWithCommas(money.toFixed());
        }
        // hide the singleplayer money - DISPLAY_CASH
        //mp.game.invoke('0x96DEC8D5430208B7', false);
    },

    "getwepdata": () => {
        GetWeaponData();
    },

    "bankDisplay": (amount) => {
        bank = amount;
        if (bank != null)
            bankstring = "$" + numberWithCommas(bank.toFixed());
    },
    "toggleCruise": () => {
        toggleCruise();
    },
    "debug_melee": () => {
        testEnabled = true;
    },
    "toggleCruiseEx": (bool) => {
        toggleCruise(bool);
    },

    "setInteriorName": (name) => {
        interiorName = name;
    },

    "playerJoinedToVoiceChannel": (channelID) => {
        voiceChannelData.channelID = channelID;
        mp.players.local.voiceAutoVolume = true;
        mp.players.local.voiceVolume = 1.0;
        mp.players.local.voice3d = true;
    },

    "playerDisconnectedFromVoiceChannel": () => {
        voiceChannelData.channelID = 0;
        voiceChannelData.members = [];
    },

    "voiceChannelMembersList": (data) => {
        voiceChannelData.members = JSON.parse(data);
    }
});

var res = false;
let cruiseSpeed;
let cruiseEnabled = false;
var lastCruiseTime = 0;

function isDriver() {
    if (mp.players.local.vehicle) return mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle;
}

mp.game.stats.statSetInt(mp.game.joaat("SP0_SHOOTING_ABILITY"), 20, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_STRENGTH"), 10, false);
mp.game.stats.statSetInt(mp.game.joaat("SP0_STAMINA"), 50, false);

function toggleCruise(setOff = false) {
    if (mp.game.invokeString("0x7CE1CCB9B293020E", mp.players.local.vehicle.handle).trim().valueOf() == 'RENTAL'.valueOf()) {} else {
        if (blockedModels.indexOf(mp.players.local.vehicle.getModel()) > -1)
        {
            mp.game.graphics.notify("~r~В этом автомобиля нет круиз контроля.");
            return;
        }

        if (!cruiseEnabled) {
            if (mp.players.local.vehicle.getSpeed() > 0) {
                if (Date.now() >= lastCruiseTime + 15000) {
                    cruiseEnabled = true;
                    cruiseSpeed = mp.players.local.vehicle.getSpeed();
                    mp.players.local.vehicle.setMaxSpeed(cruiseSpeed);
                    mp.game.graphics.notify("~w~КРУИЗ-КОНТРОЛЬ ~g~ВКЛ~w~. Скорость: ~b~" + (cruiseSpeed * 2.236936).toFixed(0) + " ~w~КМЧ.");
                    lastCruiseTime = Date.now();
                    mp.events.call('enable_cruise_control', true);
                }
            }
        } else {
            setOff = true;
        }
        if (setOff && cruiseEnabled) {
            var vehMaxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model);
            mp.players.local.vehicle.setMaxSpeed(vehMaxSpeed + 4);
            mp.game.graphics.notify("~w~КРУИЗ-КОНТРОЛЬ ~r~ВЫКЛ~w~.");
            mp.events.call('enable_cruise_control', false);
            cruiseEnabled = false;
        }
    }
}

var meleeAttack = false;
var testEnabled = false;
var timeout = 0;
mp.events.add('render', () => {
    if (mp.players.local === null || mp.players.local === undefined)
        return;
    mp.game.ui.hideHudComponentThisFrame(9);
    mp.game.ui.hideHudComponentThisFrame(7);
    mp.players.local.setHelmet(false);
    if (mp.players.local.isPerformingStealthKill()) {
        mp.players.local.clearTasksImmediately();
    }

    if (voiceChannelData.channelID > 0 && voiceChannelData.members.length > 0 && print_hud) {
        drawText("TAC " + voiceChannelData.channelID, [((res_Y - playerHUD_Y) / res_Y) - 0.03, (res_X / 2) / res_X], 4, [190, 190, 255, 255], playerHUD_Scale, true);
        var idx = 0;

        for (const member of voiceChannelData.members) {
            idx += 1;
            drawText(member.Name, [((res_Y - playerHUD_Y) / res_Y) - 0.03, ((res_X / 2) / res_X) + (idx * 0.02)], 4, [255, 255, 255, member.IsSpeaking ? 255 : 155], playerHUD_Scale, true);
        }
    }

    if (mp.players.local.isUsingActionMode()) {
        meleeAttack = true;
        if (timeout > 0) {
            clearTimeout(timeout);
            timeout = 0;
        }
    }
    if (!mp.players.local.isUsingActionMode() && meleeAttack) {
        meleeAttack = false;
        if (timeout > 0) {
            clearTimeout(timeout);
            timeout = 0;
        }

        timeout = setTimeout(() => {
            timeout = 0;
            if (!meleeAttack)
                mp.events.callRemoteUnreliable('clear_task_remote');
        }, 10000);
    }
    mp.players.local.setSuffersCriticalHits(false);
    mp.game.controls.disableControlAction(0, 36, true);
    mp.players.local.setStealthMovement(false, '0');

    // IsPedArmed: 6 returns true if they are equipped with any weapon except melee weapons
    // IsPedArmed: 4 returns true if you are equipped with any weapon except Explosives weapon group AND melee weapons
    if (mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 4)) {
        mp.game.controls.disableControlAction(0, 140, true); // INPUT_MELEE_ATTACK_LIGHT
        mp.game.controls.disableControlAction(0, 141, true); // INPUT_MELEE_ATTACK_HEAVY
        mp.game.controls.disableControlAction(0, 142, true); // INPUT_MELEE_ATTACK_ALTERNATE
    }
    mp.game.controls.disableControlAction(0, 36, true); // disable stealth mode

    /*if (!mp.players.local.isInParachuteFreeFall())
    {
        mp.game.controls.disableControlAction(0, 140, true); // INPUT_MELEE_ATTACK_LIGHT
        mp.game.controls.disableControlAction(0, 44, true); // INPUT_COVER
        mp.game.controls.disableControlAction(1, 7, true); // SLOWMO
        mp.game.controls.disableControlAction(17, 7, true); // SLOWMO
    }*/
    //Cruise Control & Miles system
    let player = mp.players.local;
    mp.game.controls.disableControlAction(2, 243, true);
    m_onlineCount = mp.players.length;
    if (player.isSittingInAnyVehicle()) {
        var car = mp.players.local.vehicle;
        if (car == null) return;

        if (isDriver()) {
            if (Date.now() >= RenderTimeNow + 1000) {
                let roofState = mp.players.local.vehicle.getConvertibleRoofState();
                let actualData = mp.players.local.vehicle.getVariable('VehicleSyncData');
                if (actualData !== undefined) {
                    if (actualData.Convertible !== undefined && actualData.LandingGear !== undefined && actualData.Siren !== undefined) {
                        if (roofState != 1 && roofState != 3) {
                            var roofStateBool = false;
                            if (roofState == 2) roofStateBool = true;

                            if (roofStateBool != actualData.Convertible) {
                                mp.events.callRemote('UpdateConvertible', roofState);
                            }
                        }

                        let gearState = mp.players.local.vehicle.getLandingGearState();
                        if (gearState != 1 && roofState != 2) {
                            if (gearState != actualData.LandingGear) {
                                mp.events.callRemote('UpdateGearState', gearState);
                            }
                        }
                        //mp.gui.chat.push(`UpdateSirenLights? -  ${mp.players.local.vehicle.isSirenOn()} != ${actualData.Siren[0]}`);
                        /*if(mp.players.local.vehicle.isSirenOn() != actualData.Siren[0]){
                            mp.events.callRemote('UpdateSirenLights', mp.players.local.vehicle.isSirenOn());
                        }*/
                    }
                }
                /*BurnoutCheck++;
                if(BurnoutCheck > 2){
                    if(mp.players.local.vehicle.hasVariable("is_in_burnout")){
                        if(!!mp.players.local.vehicle.isInBurnout() != mp.players.local.vehicle.getVariable("is_in_burnout")){
                            mp.events.callRemoteUnreliable('UpdateBurnoutState', mp.players.local.vehicle.isInBurnout());
                        }
                    }else{
                        mp.events.callRemoteUnreliable('UpdateBurnoutState', mp.players.local.vehicle.isInBurnout());
                    }
                    BurnoutCheck=0;
                }*/

                RenderTimeNow = Date.now();
            }
        }

        if (cruiseEnabled && isDriver()) {
            let currentvelo = player.vehicle.getVelocity();

            currentvelo.x = currentvelo.x * 1.1;
            currentvelo.y = currentvelo.y * 1.1;

            player.vehicle.setVelocity(currentvelo.x, currentvelo.y, currentvelo.z);
            //mp.players.local.vehicle.setForwardSpeed(cruiseSpeed);
            if (mp.players.local.vehicle.hasCollidedWithAnything()) return toggleCruise(); // Collision Check
            if (mp.game.controls.isControlPressed(2, 76) || mp.game.controls.isControlPressed(2, 72)) return toggleCruise(); //  Brake Check
            if (mp.players.local.vehicle.isInAir()) return toggleCruise(); //  Car in air check
            if (mp.players.local.vehicle.isInWater()) return toggleCruise(); //  Car in water check
            if (!mp.players.local.vehicle.getIsEngineRunning()) return toggleCruise(); //  Car engine running check
        }

        let speed = car.getSpeed();

        var toggle = car.getVariable("VehicleSyncData");
        if (toggle != null) {
            car.setEngineOn(toggle.Engine, true, true);
            car.setUndriveable(!toggle.Engine);
        }
        let tempDistance = 0;
        let speedcalc = 0;

        if (useKmh)
            speedcalc = Math.round(speed * 3.6);
        else
            speedcalc = Math.round(speed * 2.236936);

        if (Date.now() >= distanceTimeNow + 1 && speedcalc > 0) {

            let trip = speedcalc * ((Date.now() - distanceTimeNow) / 1000);
            tempDistance = parseFloat(trip / 3600);
            tempVehicleDistance += tempDistance;
            miles += tempDistance;
            distanceTimeNow = Date.now();
            mp.events.call('update_miles_fuel', tempDistance);
        }
    } else {
        cruiseEnabled = false;
        tempVehicleDistance = 0.0;
    }
    //

    if (!print_hud)
        return;

    if (!res) {
        resolution = mp.game.graphics.getScreenResolution(0, 0);
        if (resolution.x < 1920) {
            res_X = resolution.x;
            res_Y = resolution.y;
        }
        res = true;
    }
    if (logged) {
        //draw_text = false;
        if (draw_text) {

            x_coord = minimap.rightX;
            if (bigmap_status) {
                x_coord = minimap.rightX + 0.089;
            }

            if (player.isSittingInAnyVehicle()) {
                // Fuel UI
                if (typeof mp.players.local.m_ThermalActive === "undefined" || !mp.players.local.m_ThermalActive) {
                    if (fuel > -1) {
                        var fuelstring = "";
                        if (fuel > 90) {
                            fuelstring = `${FuelType} ~r~||~o~|||~g~|||||`;
                        }
                        else if (fuel > 80) {
                            fuelstring = `${FuelType} ~r~||~o~|||~g~||||`;
                        }
                        else if (fuel > 70) {
                            fuelstring = `${FuelType} ~r~||~o~|||~g~|||`;
                        }
                        else if (fuel > 60) {
                            fuelstring = `${FuelType} ~r~||~o~|||~g~||`;
                        }
                        else if (fuel > 50) {
                            fuelstring = `${FuelType} ~r~||~o~|||~g~|`;
                        }
                        else if (fuel > 40) {
                            fuelstring = `${FuelType} ~r~||~o~|||`;
                        }
                        else if (fuel > 30) {
                            fuelstring = `${FuelType} ~r~||~o~||`;
                        } else if (fuel > 20) {
                            fuelstring = `${FuelType} ~r~||~o~|`;
                        }
                        else if (fuel > 10) {
                            fuelstring = `${FuelType} ~r~||`;
                        }
                        else if (fuel > 0) {
                            fuelstring = `${FuelType} ~r~|`;
                        } else if (fuel <= 0) {
                            fuelstring = `${FuelType} ~r~ПУСТО`;

                        }
                        drawText(fuelstring, [x_coord + WidescreenOffset_X + fuelHUD_X, minimap.bottomY + WidescreenOffset_Y - fuelHUD_Y], 4, [255, 255, 255, 200], fuelHUD_Scale, fuelHUD_Center);
                    }
                }

                var car = mp.players.local.vehicle;
                if (car == null) return;
                let speed = car.getSpeed();


                if (typeof mp.players.local.m_ThermalActive === "undefined" || !mp.players.local.m_ThermalActive) {
                    var displaySpeed = "";
                    /*if (useKmh)
                        displaySpeed = Math.round(speed * 3.6) + " km/h"; // Kmh
                    else
                        displaySpeed = Math.round(speed * 2.236936) + " mph"; // Mph
                    }*/
                    if (useKmh)
                        displaySpeed = "KMH ~b~" + Math.round(speed * 3.6); // Kmh
                    else
                        displaySpeed = "MPH ~b~" + Math.round(speed * 2.236936) + ""; // Mph
                }


                //Distance Calculator
                var vehicleClass = car.getClass();
                if (vehicleClass == 15 || vehicleClass == 16) {
                    if (typeof mp.players.local.m_ThermalActive === "undefined" || !mp.players.local.m_ThermalActive) {
                        const position = mp.players.local.position;
                        const heading = 360 - Math.floor(car.getHeading())
                        const altitude = Math.round(position.z * 3.28);

                        // Display
                        if (ATCOnline) {
                            drawText(`ALT: ~b~${altitude}~s~ ft. / HDG: ~b~${heading} / ATC: ~g~ONLINE`, [x_coord + WidescreenOffset_X + aviationHUD_X, minimap.bottomY + WidescreenOffset_Y - aviationHUD_Y], 4, [255, 255, 255, 200], aviationHUD_Scale, aviationHUD_Center);
                        } else {
                            drawText(`ALT: ~b~${altitude}~s~ ft. / HDG: ~b~${heading}`, [x_coord + WidescreenOffset_X + aviationHUD_X, minimap.bottomY + WidescreenOffset_Y - aviationHUD_Y], 4, [255, 255, 255, 200], aviationHUD_Scale, aviationHUD_Center);
                        }

                    }
                }

                //Distance
                var miles2 = roundTo(miles, 2);
                if (miles2 > 0 && miles2 < 40000) {
                    if (typeof mp.players.local.m_ThermalActive === "undefined" || !mp.players.local.m_ThermalActive) {
                        drawText(`${miles2} mi.`, [x_coord + WidescreenOffset_X + milesHUD_X, minimap.bottomY + WidescreenOffset_Y - milesHUD_Y], 4, [255, 255, 255, 200], milesHUD_Scale, milesHUD_Center);
                    }
                }
                drawText("|", [x_coord + WidescreenOffset_X + speedoDivHUD_X, minimap.bottomY + WidescreenOffset_Y - speedoDivHUD_Y], 4, [255, 255, 255, 200], speedoDivHUD_Scale, speedoDivHUD_Center);
                // Speed UI
                if (typeof mp.players.local.m_ThermalActive === "undefined" || !mp.players.local.m_ThermalActive) {
                    drawText(displaySpeed, [x_coord + WidescreenOffset_X + speedHUD_X, minimap.bottomY + WidescreenOffset_Y - speedHUD_Y], 4, [255, 255, 255, 200], speedHUD_Scale, speedHUD_Center);
                }

            }
            // Money UI
            if (typeof mp.players.local.m_ThermalActive === "undefined" || !mp.players.local.m_ThermalActive) {
                mp.game.graphics.drawText(moneystring, [(res_X - 70) / res_X, 0.060], {
                    font: 4,
                    color: [115, 186, 131, 200],
                    scale: [0.8, 0.8],
                    outline: true,
                    centre: true
                });
                mp.game.graphics.drawText(bankstring, [(res_X - 70) / res_X, 0.1], {
                    font: 4,
                    color: [255, 255, 255, 200],
                    scale: [0.7, 0.7],
                    outline: true,
                    centre: true
                });
            }
            if (!print_hud_ex) return;
            // Location UI - Compass
            if (mp.players.local.dimension == 0) {
                if (typeof mp.players.local.m_ThermalActive === "undefined" || !mp.players.local.m_ThermalActive) {
                    drawText(cardinalsText, [x_coord + WidescreenOffset_X + cardinalHUD_X, minimap.bottomY + WidescreenOffset_Y - cardinalHUD_Y], 4, [255, 255, 255, 200], cardinalHUD_Scale, cardinalHUD_Center);
                    drawText("|", [x_coord + WidescreenOffset_X + cardinalDivHUD_X, minimap.bottomY + WidescreenOffset_Y - cardinalDivHUD_Y], 4, [255, 255, 255, 200], cardinalDivHUD_Scale, cardinalDivHUD_Center);
                    drawText(zoneName, [x_coord + WidescreenOffset_X + zoneHUD_X, minimap.bottomY + WidescreenOffset_Y - zoneHUD_Y], 4, [255, 255, 255, 200], zoneHUD_Scale, zoneHUD_Center);
                    drawText(streetName, [x_coord + WidescreenOffset_X + streetHUD_X, minimap.bottomY + WidescreenOffset_Y - streetHUD_Y], 4, [255, 255, 255, 200], streetHUD_Scale, streetHUD_Center);
                }
            } else {
                drawText(interiorName, [minimap.rightX + WidescreenOffset_X + streetHUD_X, minimap.bottomY + WidescreenOffset_Y - streetHUD_Y], 4, [255, 255, 255, 200], streetHUD_Scale, streetHUD_Center);
            }

            drawText("GTA-WORLD.RU - ~y~Roleplay v2.7.10 ~w~- " + m_onlineCount + "/1500", [(res_X / 2) / res_X, (res_Y - playerHUD_Y) / res_Y], 4, [255, 255, 255, 200], playerHUD_Scale, true);
        }
        /*if (isInCCTV === true) {
            // CCTV UI
            mp.game.graphics.drawText("CCTV", [(res_X / 2 - 72.8897705078125) / res_X, (resY / 2 + 392.16729736328125) / res_Y], {
                font: 6,
                color: [23,11,153,255],
                scale: [2, 2],
                outline: true,
                centre: true
            });
        }*/
    }
});

function roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return (Math.round(n) / multiplicator).toFixed(2);
}

function GetWeaponData() {
    const localPlayer = mp.players.local;
    // GET_PED_WEAPONTYPE_IN_SLOT - Returns a weapon at the specified slot if any was found.
    localPlayer.getWeaponTypeInSlot = (weaponSlot) => mp.game.invoke('0xEFFED78E9011134D', localPlayer.handle, weaponSlot);


    for (var i = 0; i < 81; i++) {
        const weapon = localPlayer.getWeaponTypeInSlot(i);
        if (weapon !== 0 && weapon !== 514) {
            mp.gui.chat.push("(" + i + ") Weapon: " + weapon);
        }
    }
    /*const localPlayer = mp.players.local;
localPlayer.getWeaponTypeInSlot = (weaponSlot) => mp.game.invoke('0xBBDDEBFD9564D52C', localPlayer.handle, weaponSlot);
localPlayer.getAmmoWeapon = (weaponhash) => mp.game.invoke('0x2406A9C8DA99D3F4', localPlayer.handle, weaponhash);
localPlayer.removeWeapon = (weaponhash) => mp.game.invoke('0xA48F593CC7A71FCC', localPlayer.handle, weaponhash);
localPlayer.setWeaponAmmo = (weaponhash, ammo) => mp.game.invoke('0xC8207C41C6D1E3CF', localPlayer.handle, weaponhash, ammo);
localPlayer.currentWeapon = mp.game.invoke('0x6678C142FAC881BA', localPlayer.handle);
localPlayer.giveWeaponComponent = (weaponhash, component) => mp.game.invoke('0xAD084726D7F23594', localPlayer.handle, weaponhash, component);
localPlayer.getWeaponClipSize = (weaponhash) => mp.game.invoke('0xADBCA3534D2F6BEB', weaponhash);
localPlayer.getAllWeapons = () => {
const weapons = [];
weaponSlots.forEach(weaponSlot => {
    const weapon = localPlayer.getWeaponTypeInSlot(weaponSlot);
    if (weapon !== 0 && weapon !== -1569615261) {
        weapons[weapon] = { ammo: localPlayer.getAmmoWeapon(weapon)
};
}
});
mp.events.callRemote('send_weaponlist', weapons);*/
}
}얜˥