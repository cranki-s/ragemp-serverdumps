{
﻿global.chatopened = !1;
global.isChat = !1;
global.logged = 0;
global.aliases = {}
global.phone = false;
global.mdt = false;
let uiVelo_Browsers = undefined;
global.uiPlayer_Browsers = undefined;
global.uiGeneralStart_Browsers = undefined;
global.uiGlobal_Browsers = undefined;
let uiProgressBar_Browsers = undefined;
let streetName = null;
let zoneName = null;
let crossingRoad = null;
let currentMoney = null;
let currentBank = null;
let currentHunger = 0;
let currentThirsty = 0;
const localPlayer = mp.players.local;
var lastposition = mp.players.local.position;
var timerem = 600;
global.phone_menu = !1;
phone_msg = !1;
phone_app = !1;
phone_app_loaded = !1;
atm_close = !0;
let phone_ringtone = null;
let ringTone = null,
    ringToneCounter = 0;
var screenRes = mp.game.graphics.getScreenActiveResolution(0, 0);
let serverRemoteId = 0;
global.cuffMe = false;
licenseCef = undefined;
result = 0;
// init custom chat





setInterval(function () {
    let playerscount = 0;
    mp.players.forEach((player, id) => {
        playerscount++
    });
    mp.discord.update('VitalRP', '[' + playerscount + '/1000] www.vitalrp.co.uk')
    mp.game.ped.setAiWeaponDamageModifier(1.5);
}, 10000);





setInterval(function () {
    if (global.logged) {
        var pos = (mp.players.local.vehicle) ? mp.players.local.vehicle.position : mp.players.local.position;
        if (pos.x === lastposition.x && pos.y === lastposition.y && pos.z === lastposition.z) {
            timerem -= 1;
        }

        if (timerem == 120) {
            let first = Math.floor(Math.random() * (20 - 1 + 1) + 1);
            let second = Math.floor(Math.random() * (20 - 1 + 1) + 1);
            result = first + second;
            mp.events.callRemote("afkMaths", first, second);
        }

        if (timerem == 0) {
            mp.events.callRemote("kickplayerafk");
        }
        if (pos.x != lastposition.x || pos.y != lastposition.y || pos.z != lastposition.z) {
            timerem = 600;
        }
        lastposition = pos
    }
}, 1000);
// keypress enter
mp.keys.bind(0x0D, !0, (player) => {
    mp.events.call('closeChat')
});
// keypress esc
mp.keys.bind(0x1B, !0, (player) => {
    mp.events.call('forceCloseChat')
});
// keypress ctrl
mp.keys.bind(0xA2, true, () => {
    if (!chatopened) {
        if (global.phone === true && mp.gui.cursor.visible === true) return;
        if (mp.players.local.vehicle) return;
        mp.events.callRemote("toggleCrouch", true);
    }
});
mp.keys.bind(0xA2, false, () => {
    if (!chatopened) {
        mp.events.callRemote("toggleCrouch", false);
    }
});


mp.keys.bind(0x78, false, () => {
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (!chatopened) {
        mp.events.callRemote("OpenTicketMenu");
    }
});



mp.keys.bind(0x4A, false, () => {
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (!chatopened) {
        mp.events.callRemote("seatbelt");
    }
});



mp.events.add({
    "ShowTicketsMenu": (access, tickets) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/TicketInterface/index.html")
        }
        tickets = tickets.replace(/'/g, "\\'");
        tickets = tickets.replace(/`/g, "\\`");
        uiGlobal_Browsers.execute("app.loadTickets(" + access + ", '" + tickets + "');");
        mp.gui.cursor.visible = !0

    },
    "TicketAction": (action, id) => {
        mp.events.callRemote("TicketAction", action, id);
    },
    "CloseTicketMenu": () => {
        mp.events.callRemote("CloseTicketMenu");
    },
    "afksolve": (serverresult) => {
        if (result === serverresult && result !== -1) {
            timerem = 600;
            result = -1;
            mp.gui.chat.push("AFK Timer Reseted!")
        }
        else {
            mp.gui.chat.push("Wrong Answer")
        }
    }
});

mp.events.add({
    'Client::SetWorldState': (currentWeather) => {
        mp.game.gameplay.setWeatherTypeNow(currentWeather);
    },
    'Client::ChangePayment': (bool) => {
        if (global.uiPlayer_Browsers !== undefined) {
            global.uiPlayer_Browsers.execute("app.SwitchPayment(" + bool + ")");
        }
    },
})


var posX = 1920 * 0.75;
var posY = 1080 * 0.3;
var resolution = mp.game.graphics.getScreenResolution(0, 0);
var duration;
let script_version = "v2.000";
var ui_fuel = 100;
var ui_distance = "";
global.lastCheck = 0;
// keypres 1
mp.keys.bind(0x31, !1, function () {
    if (global.cuffMe || global.phone || logged === 0 || chatopened || uiGlobal_Browsers !== undefined || uiGeneralStart_Browsers != undefined || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (mp.keys.isDown(18) === false) {
        mp.events.callRemote('changeweap', 1);
        global.lastCheck = new Date().getTime()
    }
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote('tacset', 1);
    }
});
// keypress 2
mp.keys.bind(0x32, !1, function () {
    if (global.cuffMe || global.phone || logged === 0 || chatopened || uiGlobal_Browsers !== undefined || uiGeneralStart_Browsers != undefined || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (mp.keys.isDown(18) === false) {
        mp.events.callRemote('changeweap', 2);
        global.lastCheck = new Date().getTime()
    }
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote('tacset', 2);
    }
});
// keypress 3
mp.keys.bind(0x33, !1, function () {
    if (global.cuffMe || logged === 0 || global.phone || chatopened || uiGlobal_Browsers !== undefined || uiGeneralStart_Browsers != undefined || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (mp.keys.isDown(18) === false) {
        mp.events.callRemote('changeweap', 3);
        global.lastCheck = new Date().getTime()
    }
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote('tacset', 3);
    }
});

mp.keys.bind(0x34, !1, function () {
    if (global.cuffMe || logged === 0 || global.phone || chatopened || uiGlobal_Browsers !== undefined || uiGeneralStart_Browsers != undefined || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote('tacset', 4);
    }
});

mp.keys.bind(0x50, !1, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers !== undefined || uiGeneralStart_Browsers != undefined || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote('ChangePaymentType');
    }
});

mp.keys.bind(0x35, !1, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers !== undefined || uiGeneralStart_Browsers != undefined || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote('tacset', 5);
    }
});


mp.keys.bind(0x36, !1, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers !== undefined || uiGeneralStart_Browsers != undefined || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote('tacset', 6);
    }
});

mp.keys.bind(192, !1, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers !== undefined || uiGeneralStart_Browsers != undefined || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (mp.keys.isDown(18) === true) {
        mp.events.callRemote("quitac");
    }
});


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".")
}
var res_X = 1920;
var res_Y = 1080;
var text = "";
var road = "";
var limitMenu = null;
var limitSpeedItem = null;
var limitToggleItem = null;
var opened_custom = !0;
var limitMultiplier = 5;
var vehicleMaxSpeed = {};
var vehicleMaxSpeedEnabled = {};

let jail_time = 0;

var cam;
const camerasManager = require('./files/camerasManager.js');
global.menu_libary = !1;
var menuMain;
var menuMods = null;
var menuConfirmation;
var isAdminMenu = !1;
var buyModIndex;
var updateTimeoutInMilliseconds = 500;
var lastUpdateTickCount = 0;

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".")
}
let cashBar = null;
let bankBar = null;
var markers = {};
var blips = {};
class JobHelper {
    static createMarker(name, position, radius) {
        if (markers[name] != null) {
            return
        }
        var marker = mp.markers.new(28, position, radius, {
            direction: new mp.Vector3(0, 0, 0),
            rotation: new mp.Vector3(0, 0, 0),
            color: [255, 0, 0, 100],
            visible: !0,
            dimension: 0
        });
        markers[name] = marker;
        return marker
    }
    static removeMarker(name) {
        if (markers.length == 0 || markers[name] == null) {
            return
        }
        markers[name].destroy();
        markers[name] = null
    }
    static createBlip(name, position, color) {
        if (blips[name] != null) {
            return blips[name]
        }
        let blip = mp.blips.new(1, position, {
            name: name,
            color: color,
            shortRange: !1,
        });
        blips[name] = blip;
        return blip
    }
    static removeBlip(name) {
        if (blips.length == 0 || blips[name] === null || blips[name] === undefined) {
            return
        }
        blips[name].destroy();
        blips[name] = null
    }
}
class MarkerHelper {
    static createMarkerZ(name, position, radius) {
        if (markers[name] != null) {
            return
        }
        const getGroundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0, false);
        var marker = mp.markers.new(1, new mp.Vector3(position.x, position.y, getGroundZ), radius, {
            direction: new mp.Vector3(0, 0, 0),
            rotation: new mp.Vector3(0, 0, 0),
            color: [255, 0, 0, 100],
            visible: !0,
            dimension: 0
        });
        markers[name] = marker;
        return marker
    }
    static createMarker(name, position, radius) {
        if (markers[name] != null) {
            return
        }
        var marker = mp.markers.new(1, new mp.Vector3(position.x, position.y, position.z), radius, {
            direction: new mp.Vector3(0, 0, 0),
            rotation: new mp.Vector3(0, 0, 0),
            color: [255, 0, 0, 100],
            visible: !0,
            dimension: 0
        });
        markers[name] = marker;
        return marker
    }
    static removeMarker(name) {
        if (markers.length == 0 || markers[name] == null) {
            return
        }
        markers[name].destroy();
        markers[name] = null
    }
}





class BlipHelper {
    static createBlip(name, position, color) {
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null
        }
        var blip = mp.blips.new(1, position, {
            name: name,
            color: color,
            shortRange: !1,
        });
        blips[name] = blip;
        return blip
    }
    static createBlipExt(name, position, color, size, sprite = 1, shortRange = !1, bname = null) {
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null
        }
        var blip;
        if (bname == null) {
            blip = mp.blips.new(sprite, position, {
                color: color,
                scale: size,
                shortRange: !1,
            })
        } else {
            blip = mp.blips.new(sprite, position, {
                name: bname,
                color: color,
                scale: size,
                shortRange: !1,
            })
        }
        blips[name] = blip;
        blips[name].setColour(color);
        blips[name].setAsShortRange(shortRange);
        blips[name].setScale(size);
        return blip
    }
    static removeBlip(name) {
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null
        }
    }
    static moveBlip(name, position) {
        if (blips[name] == null) {
            return
        }
        blips[name].setCoords(position)
    }
    static colorBlip(name, color) {
        if (blips[name] == null) {
            return
        }
        blips[name].setColour(color)
    }
    static SetRoute(name, enabled) {
        if (blips[name] == null) {
            return
        }
        blips[name].setRoute(enabled)
    }
}
const Natives = {
    IS_RADAR_HIDDEN: "0x157F93B036700462",
    IS_RADAR_ENABLED: "0xAF754F20EB5CD51A",
    SET_TEXT_OUTLINE: "0x2513DFB0FB8400FE"
};


function updateDirectionText() {
    var camera = mp.cameras.new("gameplay");
    var cameraDirection = camera.getDirection();
    if (0.3 < cameraDirection.x && 0.3 < cameraDirection.y) {
        text = "N"
    } else if (cameraDirection.x < -0.3 && 0.3 < cameraDirection.y) {
        text = "N"
    } else if (0.3 < cameraDirection.x && cameraDirection.y < -0.3) {
        text = "S"
    } else if (cameraDirection.x < -0.3 && cameraDirection.y < -0.3) {
        text = "S"
    } else if (-0.3 < cameraDirection.x && cameraDirection.x < 0.3 && cameraDirection.y < -0.3) {
        text = "S"
    } else if (cameraDirection.x < -0.3 && -0.3 < cameraDirection.y && cameraDirection.y < 0.3) {
        text = "W"
    } else if (0.3 < cameraDirection.x && -0.3 < cameraDirection.y && cameraDirection.y < 0.3) {
        text = "E"
    } else if (-0.3 < cameraDirection.x && cameraDirection.x < 0.3 && cameraDirection.y > 0.3) {
        text = "N"
    }
    camera.destroy(!0)
}
function updateValues() {
    // only do stuff if radar is enabled and visible
    if (mp.players.local === null || mp.players.local === undefined)
        return;
    mp.game.player.restoreStamina(100);
    if (mp.game.invoke(Natives.IS_RADAR_ENABLED) && !mp.game.invoke(Natives.IS_RADAR_HIDDEN)) {
        let isMetric = mp.game.gameplay.getProfileSetting(227) == 1;
        const position = mp.players.local.position;
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
        zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
        streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        crossingRoad = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName) crossingRoad = `${mp.game.ui.getStreetNameFromHashKey(getStreet.streetName)} / ${mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)}`;

    } else {
        streetName = null;
        zoneName = null;
        crossingRoad = null;
    }
    updateDirectionText();
}



function playerEnterVehicleHandler(vehicle, seat) {
    mp.players.local.setHelmet(false);



    //mp.gui.chat.push(`You got into the car with ID: ${vehicle.id}. Seat: ${seat}`);
    if (seat === 1) {
        if (vehicle.hasVariable("engine_state")) {
            var engineState = vehicle.getVariable("engine_state");
            if (!engineState) {
                mp.players.local.setConfigFlag(429, true);
                // vehicle.setUndriveable(true);
            }
        }
    }
}
function playerLeaveVehicleHandler() {
    // mp.gui.chat.push("Player start leave the vehicle");
    if (mp.players.local.vehicle != null) {
        var engineState = mp.players.local.vehicle.getVariable("engine_state");
        var player = mp.players.local.vehicle.getPedInSeat(0);
        if (engineState) {
            mp.players.local.vehicle.setEngineOn(true, true, true);
        }

    }
}
mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);
mp.events.add("playerLeaveVehicle", playerLeaveVehicleHandler);
let DAYNIGHT_TEXT = null;
var newCam = null;
var selectCharacter = camerasManager.createCamera('selectCharacter', 'default', new mp.Vector3(-533.1306, -224.914, 38.64975), new mp.Vector3(-10, 0, 2), 50);
var school_checkpoint = null;
var vehicle_beans = null;
let genIndex;

mp.events.add({
    "ShowHouseMenu": (tab, houseDetails, houseVehicles, houseAccceses, owner) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/HouseMenu/index.html")
        }
        uiGlobal_Browsers.execute("app.ShowHouseMenu('" + tab + "','" + houseDetails + "', '" + houseVehicles + "', '" + houseAccceses + "','" + owner + "');");
        mp.gui.cursor.visible = !0

    },


    "startTheoreticalTest": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/dmvtest/index.html")
        }
        mp.gui.cursor.visible = !0
    },
    "showDMVResults": (result) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/dmvdriving/index.html")
        }
        uiGlobal_Browsers.execute("app.finishTest('" + result + "');");
        mp.gui.cursor.visible = !0
    },
    "finishDrivingTest": (result) => {
        mp.events.callRemote("createroad", result);
        mp.events.call('Destroy_Character_Menu');


    },
    "Give_player_key": (name, id, houseId) => {

        mp.events.callRemote("AddAccces", houseId, id, name);
    },

    "Remove_player_key": (id, houseId) => {
        mp.events.callRemote("RemoveAccess", houseId, id);

    },

    "ChangeBuilder": (id, houseId) => {
        mp.events.callRemote("ChangeBuildingAcccess", houseId, id);

    },

    "reloadUserList": (houseAccceses) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/HouseMenu/index.html")
        }
        uiGlobal_Browsers.execute("app.reloadUserList('" + houseAccceses + "');");
        mp.gui.cursor.visible = !0

    },
    "reloadHouseDetails": (houseDetails) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/HouseMenu/index.html")
        }
        uiGlobal_Browsers.execute("app.reloadHouseDetails('" + houseDetails + "');");
        mp.gui.cursor.visible = !0

    },

    "HouseGarage": (houseId, vehId, isParked) => {
        mp.events.callRemote("HouseGarage", houseId, vehId, isParked);
    },
    "Add_to_market": (price, houseId) => {
        mp.events.callRemote("AddToMarket", houseId, price);
    },
    "Remove_from_market": (houseId) => {
        mp.events.callRemote("RemoveFromMarket", houseId);
    },
    "ShowFactionOutfits": (outfits) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/ClothingUI/index.html")
        }
        uiGlobal_Browsers.execute("app.ShowFactionOutfits('" + outfits + "');");
        mp.gui.cursor.visible = !0

    },
    "FactionStartDressing": (outfit) => {
        mp.events.callRemote("StartFactionDress", outfit)
    },
    "ElectricalGame": (index) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/mini-games/amongus/index.html")
        }
        global.genIndex = index;
        mp.gui.cursor.visible = !0

    },
    "ElectricalGameFinish": () => {
        mp.events.callRemote("ElectricFixed", global.genIndex);

    },
    "menu_libary": (toggles) => {
        menu_libary = toggles
    },
    "GetStreetName": () => {
        const position = mp.players.local.position;
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
        zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
        streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        mp.events.callRemote("UpdateStreetName", streetName);
    },
    "earpierce_play_animation": () => {
        mp.events.callRemote("Radio_Play_Animation");
    },

    "CreateRaceCheckpoint": (position, direction) => {
        school_checkpoint = mp.checkpoints.new(0, position, 6.0, {
            direction: direction,
            color: [247, 221, 52, 150],
            visible: !0,
            dimension: 0
        });
        BlipHelper.createBlipExt("race_checkpoint", position, 81, 1.0, 0, !1);
        BlipHelper.createBlipExt("race_checkpoint_2", direction, 81, 0.5, 0, !1);
        BlipHelper.colorBlip("race_checkpoint", 81);
        BlipHelper.colorBlip("race_checkpoint_2", 81)
    },
    "DeleteRaceCheckpoint": () => {
        if (school_checkpoint != null) {
            school_checkpoint.destroy();
            school_checkpoint = null
        }
        BlipHelper.removeBlip("race_checkpoint");
        BlipHelper.removeBlip("race_checkpoint_2")
    },
    "FactionUndress": () => {
        mp.events.callRemote("FactionUndress");
    },
    "marker_createZ": (name, position, radius) => {
        MarkerHelper.createMarkerZ(name, position, radius)
    },
    "marker_create": (name, position, radius) => {
        MarkerHelper.createMarker(name, position, radius)
    },
    "get_positionZ": (position) => {
        const getGroundsZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0, false);
        mp.events.callRemote("GetGroundZ", getGroundsZ);
    },
    "delete_marker": (name) => {
        MarkerHelper.removeMarker(name)
    },
    "KEY_ARROW_UP": () => {
        if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
        mp.events.callRemote('keypress:ARROW_UP')
    },
    "blip_create": (name, position, color) => {
        BlipHelper.createBlip(name, position, color)
    },
    "blip_create_ext": (name, position, color, size, sprite = 0, range = !1, bname = null) => {
        BlipHelper.createBlipExt(name, position, color, size, sprite, range, bname);
        BlipHelper.colorBlip(name, color)
    },
    "blip_remove": (name) => {
        BlipHelper.removeBlip(name)
    },
    "blip_move": (name, position) => {
        BlipHelper.moveBlip(name, position)
    },
    "blip_color": (name, color) => {
        BlipHelper.colorBlip(name, color)
    },
    "blip_router_visible": (name, enabled) => {
        BlipHelper.SetRoute(name, enabled)
    },
    "gps_set_loc": (nearestX, nearestY) => {
        mp.game.ui.setNewWaypoint(nearestX, nearestY)
    },
    "show_radar": () => {
        mp.game.ui.displayRadar(!0)
    },
    "hide_radar": () => {
        mp.game.ui.displayRadar(!1)
    },
    "job_create_marker": (name, position) => {
        var jobName = name;
        var vector = position;
        JobHelper.createMarker(jobName, vector, 1)
    },
    "job_create_blipped_marker": (name, jPosition) => {
        var jobName = name;
        var vector = jPosition;
        JobHelper.createMarker(jobName, vector, 1);
        JobHelper.createBlip(jobName, vector, 1)
    },
    "create_house_blip": (name, hPosition) => {
        var houseName = name;
        var position = hPosition;
        var blip = mp.blips.new(40, position, {
            name: houseName,
            color: 2,
            shortRange: !0,
        });
        blips[houseName] = blip
    },
    "create_garage_blip": (name, hPosition) => {
        var houseName = name;
        var position = hPosition;
        var blip = mp.blips.new(50, position, {
            name: houseName,
            color: 31,
            shortRange: !0,
        });
        blips[houseName] = blip
    },
    "create_faction_house_blip": (name, hPosition) => {
        var houseName = name;
        var position = hPosition;
        var blip = mp.blips.new(40, position, {
            name: houseName,
            color: 31,
            shortRange: !0,
        })
    },
    "create_rent_blip": (name, hPosition) => {
        var houseName = name;
        var position = hPosition;
        var blip = mp.blips.new(40, position, {
            name: houseName,
            color: 28,
            shortRange: !0,
        });
        blips[houseName] = blip
    },
    "job_remove_marker": (name) => {
        var jobName = name;
        JobHelper.removeMarker(jobName);
        JobHelper.removeBlip(jobName)
    },
    "job_create_pickup": (jId, jPosition, jRadius) => {
        var id = jId;
        var position = jPosition;
        var radius = jRadius;
        JobHelper.createBlip(jId, jPosition, 0);
        JobHelper.createMarker(jId, jPosition, jRadius)
    },
    "job_create_pickup": () => {
        if (blips.length == 0 && markers.length == 0)
            return;
        for (var key in blips) {
            JobHelper.removeBlip(key)
        }
        for (var key in markers) {
            JobHelper.removeMarker(key)
        }
    },
    "job_remove_pickup": (jName) => {
        var name = jName;
        JobHelper.removeBlip(jName);
        JobHelper.removeMarker(jName)
    },
    "job_create_blip": (jName, jPosition, jColor) => {
        var name = jName;
        var position = jPosition;
        var color = jColor;
        JobHelper.createBlip(jName, jPosition, parseInt(jColor))
    },
    "job_remove_blip": (jName) => {
        var name = jName;
        JobHelper.removeBlip(jName)
    },
    "get_waypoint_pos": () => {
        var pos = getWaypointPos();
       // mp.players.local.position = new mp.Vector3(pos.z, pos.y, 9999);
       // pos.z = mp.game.gameplay.getGroundZFor3dCoord(pos.x, pos.y, 9999, 0, false);
       // mp.events.callRemote('OnPlayerCreateWaypoint', pos.x, pos.y, pos.z)
        mp.game.invoke("0xAD15F075A4DA0FDE", mp.players.local.handle,pos.x, pos.y, 0, mp.players.local.heading, false, true, true);

    },
    "cef_show_name_creater": () => {
        mp.events.call('destroyBrowser');
        mp.events.call('createBrowser', ['package://files/auth/dialog.html'])
    },
    "onSubmitGeneric": (string) => {
        onSubmitGeneric(string)
    },
    "reset_camera": () => {
        mp.game.cam.renderScriptCams(!1, !1, 0, !0, !1);
        if (newCam != null) newCam.setActive(!1)
    },
    "play_sound": (soundName, soundSetName) => {
        if (soundName === null || soundSetName === null) return;
        mp.game.audio.playSoundFrontend(-1, soundName, soundSetName, !0)
    },
    "createCustomCamera": (cameraOne, cameraTwo) => { },
    "DestroyCamera": () => {
        mp.game.cam.renderScriptCams(!1, !1, 0, !0, !1);
        newCam.setActive(!1)
    },
    "JailTime": (time) => {
        jail_time = time
    },
    "logged": () => {
        logged = 1;
        mp.players.local.setHelmet(!1);
        camerasManager.destroyCamera(selectCharacter);
        camerasManager.setActiveCamera(selectCharacter, !1);
        mp.game.cam.renderScriptCams(!1, !1, 0, !0, !1)
    },
    "showChat": () => {
        mp.gui.chat.activate(!0);
        mp.gui.chat.show(!0);
    },
    "hideChat": () => {
        mp.gui.chat.activate(!1);
        mp.gui.chat.show(!1);
    },
    "disableHealthRecharge": () => { },

    "SetPlayerWanted": (wanted) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.setwanted(" + wanted + ");")
        }
    },
    "update_money_display": (money, bank) => {
        currentMoney = money;
        currentBank = bank;
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.setportofel(" + currentMoney + ");");
            uiPlayer_Browsers.execute("app.setbanca(" + currentBank + ");");
        }
        mp.game.invoke('0x96DEC8D5430208B7', !1)
    },
    "update_credits": (credits) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.setcredite('" + credits + "');")
        }
    },
    "hud_notify": (id, tip, pozitie, mesaj, timp) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.notify(" + mp.game.joaat(id) + "," + tip + ", " + pozitie + ", '" + mesaj + "', " + timp + ");")
        }
    },
    "hud_stopnotify": (id) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.notifystop(" + mp.game.joaat(id) + ");")
        }
    },
    "hud_updatenotify": (id, tip, mesaj) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.notifyupdate(" + mp.game.joaat(id) + ", " + tip + ", '" + mesaj + "');")
        }
    },
    "update_hunger_display": (hunger, thirst) => {
        currentHunger = hunger;
        currentThirsty = thirst;
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.setHungerAndThirst(" + currentHunger + ", " + currentThirsty + ");")
        }
    },
    "update_health": (health) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.sethp(" + health + ");")
        }
    },
    "update_armor": (armor) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.setarmor(" + armor + ");")
        }
    },
    "update_drogs": (drog) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.setdrug(" + drog + ");")
        }
    },
    "show_player_hud": (ui_enable) => {
        if (ui_enable == true) {
            if (uiPlayer_Browsers == undefined) {
                uiPlayer_Browsers = mp.browsers.new("package://cef/GeneralHUD/index.html")
            }
            uiPlayer_Browsers.execute("app.setHungerAndThirst(" + currentHunger + ", " + currentThirsty + ");");
            uiPlayer_Browsers.execute("app.setportofel(" + currentMoney + ");");
            uiPlayer_Browsers.execute("app.setbanca(" + currentBank + ");");
        } else if (ui_enable == false) {
            if (uiPlayer_Browsers != undefined) {
                uiPlayer_Browsers.destroy();
                uiPlayer_Browsers = undefined;
            }
        }
    },
    "displaySubtitle": (message_text, time) => {
        mp.game.ui.setTextEntry2("STRING");
        mp.game.ui.addTextComponentItemString(message_text);
        mp.game.ui.drawSubtitleTimed(time, 1)
    },
    "DisplayCustomCamera": (position, target, fov = 60) => {
        newCam = mp.cameras.new('default', position, target, fov);
        //newCam.setCoord(position);
        newCam.pointAtCoord(target.x, target.y, target.z);
        newCam.setFov(fov);
        newCam.setActive(!0);
        mp.game.cam.renderScriptCams(!0, !1, 0, !0, !1)
    },
    "DestroyCustomCamera": () => {
        mp.game.cam.renderScriptCams(!1, !1, 0, !0, !1);
        newCam.setActive(!1)
    },
    "playAnimation": (dict, state, flag) => {
        mp.events.callRemote('PlayAnimationFromMenu', dict, state, flag)
    },
    "stopAnimation": () => {
        mp.events.callRemote('StopAnimationFromMenu')
    },
    "closeAnimationMenu": () => {
        mp.events.call('Destroy_Character_Menu');
        mp.events.callRemote('closeAnimationMenu')
    },
    "setAnimationShortcut": (e, category, t) => { },
    "Display_Animation": () => {
        if (global.cuffMe === true) return;
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/animation/animation.html")

        }
        mp.gui.cursor.visible = !0
    },
    "DisplayHouseMenu4P": (vehicle_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/HouseMenu/index.html")
        }
        uiGlobal_Browsers.execute("app.openMenuHouse('" + vehicle_list + "');");
        mp.gui.cursor.visible = !0
    },

    "InjuredSystem": () => {
        mp.game.graphics.startScreenEffect("DeathFailMPIn", 0, true);
        mp.game.cam.setCamEffect(1);

    },

    "InjuredSystem:Destroy": () => {
        mp.game.graphics.stopScreenEffect("DeathFailMPIn");
        mp.game.cam.setCamEffect(0);
    },
    "SelectedHouseP": (index) => {
        mp.events.callRemote("SelectedHouse", index)
    },
    "Display_Player_Fines": (fines_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/Amenzi/index.html")
        }
        uiGlobal_Browsers.execute("app.OpenFinesMenu('" + fines_list + "');");
        mp.gui.cursor.visible = !0
    },
    "Display_Vehicles_Menu": (type, vehicle_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/CarsMenu/index.html")
        }
        uiGlobal_Browsers.execute("app.OpenDealership('" + type + "','" + vehicle_list + "');");
        mp.gui.cursor.visible = !0
    },
    "Player_Vehicle_Release": (index, price) => {
        mp.events.callRemote("PayInsure", index, price)
    },
    "Make_Car_Insurance": (index, price) => {
        mp.events.callRemote("MakeCarInsurance", index, price)
    },
    "Car_Matriculation": (index, price) => {
        mp.events.callRemote("CarMatriculation", index, price)
    },
    "Car_Import": (index) => {
        mp.events.callRemote("ImportVehicle", index)
    },
    "ReleaseParkedVehicle": (index) => {
        mp.events.callRemote("ReleaseParkedVehicle", index)
    },

    "Display_Player_VehiclesP": (vehicle_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/MeniuMasiniPark/index.html")
        }
        uiGlobal_Browsers.execute("app.OpenDealership('" + vehicle_list + "');");
        mp.gui.cursor.visible = !0
    },
    "DisplayFactionMenu": (tab, factionDetails, factionData, factionDoors) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/InterfataFactiuni/index.html")
        }
        var blabla = JSON.parse(factionDoors);
        uiGlobal_Browsers.execute("app.showfactionmenu('" + tab + "', '" + factionDetails + "', '" + factionData + "', '" + factionDoors + "');");
        mp.gui.cursor.visible = !0
    },
    "SavePermissions": (rank, generalPermissions, vehiclePermissions, weaponPermissions, zonePermissions, outfitPermissions) => {
        mp.events.callRemote("SaveRankPermissions", rank, generalPermissions, vehiclePermissions, weaponPermissions, zonePermissions, outfitPermissions);
    },
    "SaveRanks": (rankModifications) => {
        mp.events.callRemote("SavePlayerRanks", rankModifications);
    },
    "KickMember": (sqlId) => {
        mp.events.callRemote("KickPlayer", sqlId);
    },
    "UnParkVehicleYaayP": (index) => {
        mp.events.callRemote("UnParkVehicleYaay", index)
    },
    "TrackUnit": (plate) => {
        mp.events.callRemote("TrackUnit", plate)
    },
    "UntrackUnit": (plate) => {
        mp.events.callRemote("UntrackUnit", plate)
    },
    "RefreshUnits": () => {
        mp.events.callRemote("RefreshUnits")
    },

    "openBankMenu": (pinstatus, nume_player, cash, cont, salariu, pin, debt) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/Bank/index.html")
        }
        uiGlobal_Browsers.execute("app.openbank('" + pinstatus + "', '" + nume_player + "', '" + cash + "', '" + cont + "', '" + salariu + "', '" + pin + "', '" + debt + "');");
        mp.gui.cursor.visible = !0
    },
    "openATMMenu": (nume_player, cash, pin, theme) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/ATM/index.html")
        }
        uiGlobal_Browsers.execute("app.startatm('" + nume_player + "', '" + cash + "', '" + pin + "', '" + theme + "');");
        mp.gui.cursor.visible = !0
    },
    "StartAtmAnimation": (reason) => {
        let atmTypes = ["prop_atm_01", "prop_atm_02", "prop_atm_03", "prop_fleeca_atm"];
        let pos = mp.players.local.position
        let atm;
        let atmpos;
        for (i = 0; i < atmTypes.length; i++) {
            atm = mp.game.object.getClosestObjectOfType(pos.x, pos.y, pos.z, 3, mp.game.gameplay.getHashKey(atmTypes[i]), true, true, true);
            atmpos = mp.game.invokeVector3("0x3FEF770D40960D5A", atm, false);
            if (atmpos.x != 0) break;
        }

        mp.players.local.taskTurnToFaceCoord(atmpos.x, atmpos.y, atmpos.z, 1000);
        //mp.players.local.taskGoStraightToCoord(atmpos.x, atmpos.y, atmpos.z, 10.0, -1, 0.0, 0.0)
        setTimeout(function () {
            if (reason === "job") {
                mp.events.callRemote("StartRepairJob");
            }
            else {

                mp.events.callRemote("StartATM");
            }

        }, 750)
    },
    "StopAtmAnimation": (type) => {
        mp.events.callRemote("StopATM");
    },
    "Extract_Money_From_ATMCS": (player_name, newpinc) => {
        mp.events.callRemote("Extract_Money_From_ATM", player_name, newpinc)
    },
    "SaveTheNewPINCS": (player_name, newpinc) => {
        mp.events.callRemote("SaveTheNewPIN", player_name, newpinc)
    },
    "ReziliereContractCS": (player_name) => {
        mp.events.callRemote("ReziliereContract", player_name)
    },
    "Extract_Money_From_BANKCS": (player_name, newpinc) => {
        mp.events.callRemote("Extract_Money_From_BANK", player_name, newpinc)
    },
    "Deposit_Money_TO_BANKCS": (player_name, newpinc) => {
        mp.events.callRemote("Deposit_Money_TO_BANK", player_name, newpinc)
    },
    "PayoutSalary": (player_name) => {
        mp.events.callRemote("GiveSalaryMoney", player_name)
    },
    "PayDebt": (player_name, value) => {
        mp.events.callRemote("PayDebt", player_name, value)
    },
    "Faction_Buy_Vehicle": (vehicle, price) => {
        mp.events.callRemote("BuyFactionVehicle", vehicle, price)
    },
    "Display_Whitelist_Screen": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/auth/whitelist.html")
        }
    },
    "Display_FilesMissing_Screen": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/auth/files_missing.html")
        }
    },
    "Display_DealerShip_Manage": (name, type, safe, profit, stock_number, sales_number, vehicles_stock, vehicles_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/vehicles/dealership.html")
        }
        uiGlobal_Browsers.execute("LoadBusinessManageMenu('" + name + "', '" + type + "', " + safe + ", " + profit + ", " + stock_number + "," + sales_number + ", '" + vehicles_stock + "',  '" + vehicles_list + "');");
        mp.gui.cursor.visible = !0
    },
    "Business_Change_Name": (new_name) => {
        mp.events.callRemote("Business_Change_Name", new_name)
    },
    "Business_Depositar_Fundos": (value) => {
        mp.events.callRemote("Business_Depositar_Fundos", value)
    },
    "Business_Retirar_Fundos": (value) => {
        mp.events.callRemote("Business_Retirar_Fundos", value)
    },
    "Business_Buy_Vehicle_Stock": (name, stock, price) => {
        mp.events.callRemote("vehicle_to_business", name, stock, price)
    },
    "Business_Save_Vehicle": (name, price, visibility) => {
        mp.events.callRemote("vehicle_save_business", name, price, visibility)
    },

    "GetGroundZ": () => {
        position = localPlayer.position;
        const GroundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0, false);
        mp.events.callRemote("UpdateGroundZ", GroundZ);
    },

    "Sell_Inventory_Item": (id, type, quanity, selltype) => {
        mp.events.callRemote("SellInventoryItem", id, type, quanity, selltype);
    },

    //Tattoo Shop by Atesh and Mates
    "PreviewTatt": (index) => {
        mp.events.callRemote("PreviewTatt", index)
    },
    "BuyTattoo": (index) => {
        mp.events.callRemote("Buy_Tatto", index)
    },
    "Tattoo_Menu_Destroy": () => {
        mp.events.callRemote("Tattoo_Menu_Destroy")
    },
    "Rotate_The_Charac": () => {
        mp.events.callRemote("Rotate_The_Charac")
    },
    "Display_Tattoo": (arr_shirts) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Businesses/TattooUI/index.html")
        }
        uiGlobal_Browsers.execute("app.startTheThing('" + arr_shirts + "');");
        mp.gui.cursor.visible = !0
    },
    //Tattoo Shop by Atesh and Mates
    "ShowJobInfo": (status, type) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/JobsUI/index.html")
        }
        uiGlobal_Browsers.execute("app.OpenJobMenu('" + status + "','" + type + "');");
        mp.gui.cursor.visible = !0
    },
    "BeginJob": (type) => {
        mp.events.callRemote("BeginJob", type);
    },
    "QuitJob": (type) => {
        mp.events.callRemote("quitjob");
    },
    //Quiz by Atesh
    "Display_Quiz": (stage) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Quiz/index.html")
        }
        else {
            
            uiGlobal_Browsers.destroy()
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Quiz/index.html")
           
        }
        uiGlobal_Browsers.execute("app.setStage('" + stage + "');");
    },
    "quizSetAsFailed": () => {
        mp.events.callRemote("QuizFailed")
    },
    "setNewStage": (stage, answers) => {
        mp.events.callRemote("RegisterNewStage", stage,answers)
    },


    "Display_Quiz_Fail": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Quiz/index.html")
        }
        else {

            uiGlobal_Browsers.destroy()
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Quiz/index.html")

        }
        uiGlobal_Browsers.execute("app.setWaitStage();");
    },

    "CheckCarSpeed": () => {
        if (mp.players.local.vehicle.isSirenOn() != true) {
            var speed = Math.round(localPlayer.vehicle.getSpeed() * 3.6, 0);
            mp.events.callRemote("RadarProcessing", speed);
        }
    },
    "updateRemoteId": (id) => {
        serverRemoteId = id;
    },

    "Display_MDC": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/MDC/index.html")
        }
        mp.gui.cursor.visible = !0
    },
    "mdc_setLogo": (logoId) => {
        if (uiGlobal_Browsers === undefined) {
            return
        }
        uiGlobal_Browsers.execute("app.setMdcLogo('" + logoId + "');")
    },
    "mdc_check_player": (name) => {
        mp.events.callRemote("mdc_check_player", name)
    },
    "mdc_print_suspect": (name) => {
        mp.events.callRemote("mdc_print_suspect", name)
    },
    "mdc_print_prison": (name) => {
        mp.events.callRemote("mdc_print_prison", name)
    },
    "mdc_processCharges": (chargeCodesToProcess, suspectId) => {
        mp.events.callRemote("mdc_processCharges", chargeCodesToProcess, suspectId)
    },
    "mdc_response_player": (data) => {
        if (uiGlobal_Browsers === undefined) {
            return
        }
        uiGlobal_Browsers.execute("app.CheckPlayer('" + data + "');")
    },
    "mdc_check_vehicle": (name) => {
        mp.events.callRemote("mdc_check_vehicle", name)
    },
    "mdc_response_vehicle": (data) => {
        if (uiGlobal_Browsers === undefined) {
            return
        }
        uiGlobal_Browsers.execute("app.CheckVehicle('" + data + "');")
    },
    "mdc_warrant_list": () => {
        mp.events.callRemote("mdc_warrant_list")
    },
    "mdc_response_warrants": (data) => {
        if (uiGlobal_Browsers === undefined) {
            return
        }
        uiGlobal_Browsers.execute("CheckWantedList('" + data + "');")
    },
    "mdc_911_list": () => {
        mp.events.callRemote("mdc_911_list")
    },
    "mdc_911_accept": (index) => {
        mp.events.callRemote("mdc_911_accept", index)
    },
    "mdc_911_refuse": (index) => {
        mp.events.callRemote("mdc_911_refuse", index)
    },
    "mdc_response_911list": (data) => {
        if (uiGlobal_Browsers === undefined) {
            return
        }
        uiGlobal_Browsers.execute("Check911List('" + data + "');")
    },
    "Display247StoreItems": (arr_player, storetype) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfaces/Businesses/StoreUI/index.html")
        }
        uiGlobal_Browsers.execute("app.open247('" + arr_player + "','" + storetype + "');");
        mp.gui.cursor.visible = !0
    },

    "BuyItemFrom247": (index, quantity) => {
        mp.events.callRemote("BuyItemFrom247SV", index, quantity)
    },
    "BuyFromFishingShop": (index, quantity) => {
        mp.events.callRemote("BuyFromFishingShop", index, quantity)
    },
    "BuyItemFromDrugsShop": (index, quantity) => {
        mp.events.callRemote("BuyDrugsSV", index, quantity)
    },
    "BuyWeaponFromStore": (index, quantity) => {
        mp.events.callRemote("BuyItemFromWeaponStore", index, quantity)
    },
    "checkRadios": () => {
        mp.events.callRemote("CheckRadios")
    },
    "OrderIlegalFromStore": (index, quantity) => {
        mp.events.callRemote("CreateIlegalWeaponOrder", index, quantity)
    },

    "CraftDrugs": (type, crafteditems, quantity) => {
        mp.events.callRemote("DrugsCraft", type, crafteditems, quantity)
    },
    "Display_LaboratoryMenu": (items) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/Crafting/index.html")
        }
        uiGlobal_Browsers.execute("app.open247('" + items + "');");
        mp.gui.cursor.visible = !0
    },
    "Change_Rotation_Clothes": (rotation) => {
        mp.events.callRemote("ChangePlayerRotationClothes", rotation)
    },
    "Display_Credit_Store": (arr_player, arr_store, vehicle_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/MenuVIP/index.html")
        }
        uiGlobal_Browsers.execute("app.Load_VIP_Data('" + arr_player + "', '" + arr_store + "', '" + vehicle_list + "');");
        mp.gui.cursor.visible = !0
    },
    "Buy_Item_From_Credit_Store": (index) => {
        mp.events.callRemote("BuyItemFromCreditStore", index)
    },
    "Display_Characters": (character_data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/LRandC/index.html")
        }
        //LRandC
        camerasManager.setActiveCamera(selectCharacter, !0);
        camerasManager.setActiveCameraWithInterp(selectCharacter, new mp.Vector3(-533.1306, -222.414, 38.14975), new mp.Vector3(-10, 0, 2), 8000, 0, 0);
        uiGlobal_Browsers.execute("app.IncarcaCaractere('" + character_data + "');");
        mp.gui.cursor.visible = !0
    },
    "Destroy_Character_Menu": () => {
        if (uiGlobal_Browsers != undefined) {
            uiGlobal_Browsers.destroy();
            uiGlobal_Browsers = undefined
        }
        mp.gui.cursor.visible = !1;
        mp.events.callRemote('Inventory_Close')
    },
    "SelectCharacter": (character_id) => {
        mp.events.callRemote('SelectCharacter', character_id)
    },
    "ClientPreviewCharacterID": (character_id) => {
        mp.events.callRemote('ClientPreviewCharacterID', character_id)
    },
    "CreateCharacter": () => {
        mp.events.callRemote('CreateCharacter')
    },
    "Show_Char_Creator": (character_data, face_features) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/LRandC/index.html")
        }
        uiGlobal_Browsers.execute("app.LoadNewCharacter('" + character_data + "', '" + face_features + "');");
        mp.gui.cursor.visible = !0;
        loadAnimDict("anim@heists@heist_corona@team_idles@male_b", function () {
            localPlayer.taskPlayAnim("anim@heists@heist_corona@team_idles@male_b", "idle", 8.0, 1, -1, 1, 0.0, !1, !1, !1)
        })

    },
    "Show_Char_Creator_2": (character_data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/LRandC/index.html")
        }
        uiGlobal_Browsers.execute("app.LoadFaceFeatures('" + character_data + "');");
        mp.gui.cursor.visible = !0
    },
    "Show_Char_Creator_3": (character_data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/LRandC/index.html")
        }
        uiGlobal_Browsers.execute("app.LoadClothing('" + character_data + "');");
        mp.gui.cursor.visible = !0
    },
    "ClientCharCreationBack": () => {
        mp.events.callRemote('ClientCharCreationBack')
    },
    "ClientCharCreationNext": (first_name, second_name) => {
        mp.events.callRemote('Display_Creator_part2', first_name, second_name)
    },
    "ClientCharCreation2Back": () => {
        mp.events.callRemote('Display_Creator_part1')
    },
    "ClientCharCreation2Next": () => {
        mp.events.callRemote('Display_Creator_part3')
    },
    "ClientCharCreation3Back": () => {
        mp.events.callRemote('ClientCharCreation3Back')
    },
    "ClientOnRangeChange": (id, val) => {
        mp.events.callRemote('ClientOnRangeChange', id, val)
    },
    "ClientSetFaceFeature": (id, val) => {
        mp.events.callRemote('ClientSetFaceFeature', id, val)
    },
    "ClientSetHeadOverlay": (id, val, col) => {
        mp.events.callRemote('SetHeadOverlay', id, val, col)
    },
    "ClientSetTraje": (id) => {
        mp.events.callRemote('ClientSetTraje', id)
    },
    "cameraPointTo": (id) => {
        mp.events.callRemote('cameraPointTo', id)
    },
    "ClientCharCreation3Next": (characterName) => {
        mp.events.callRemote('ClientCharCreation3Next', characterName)
    },
    "Display_Player_Help": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Help&Jobs/help.html")
        }
        mp.gui.cursor.visible = !0
    },
    "Display_Player_FAQ": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Help&Jobs/faq.html")
        }
        mp.gui.cursor.visible = !0
    },
    "showstats": (tab, playerstats, houseslist) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Stats/index.html")
        }
        uiGlobal_Browsers.execute("app.showstats('" + tab + "','" + playerstats + "','" + houseslist + "')");
        mp.gui.cursor.visible = !0
    },
    "Display_Player_Jobs": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Help&Jobs/jobs.html")
        }
        mp.gui.cursor.visible = !0
    },
    "ShowModal": (callback_id, title, text, bottom_confirm, bottom_cancel) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("app.deschidemodal('" + callback_id + "', '" + title + "', '" + text + "', '" + bottom_confirm + "', '" + bottom_cancel + "')");
            mp.gui.cursor.visible = !0
        }
    },
    "modalConfirm": (response_callback) => {
        mp.events.callRemote('modalConfirm', response_callback);
        mp.gui.cursor.visible = !1
    },
    "modalCancel": (response_callback) => {
        mp.events.callRemote('modalCancel', response_callback);
        mp.gui.cursor.visible = !1
    },
    "ShowPayDay": (arrjson) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/PayDAY/index.html")
        }
        uiGlobal_Browsers.execute("app.OpenPayDay('" + arrjson + "');");
    },
    "StartPickLock": () => {
        if (uiGlobal_Browsers != undefined) {
            uiGlobal_Browsers.destroy();
            uiGlobal_Browsers = undefined
        }
        uiGlobal_Browsers = mp.browsers.new("package://files/lockpicktest/index.html")

        mp.gui.cursor.visible = !0
    },
    "PicLockResult": (result) => {
        mp.events.callRemote("PickLockResult", result)
    },
    "StartFishingGame": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/fish-mini-game/index.html")
        }
        uiGlobal_Browsers.execute("FishingGame()");
        mp.gui.cursor.visible = !0
    },
    "FishingResult": (result) => {
        mp.events.callRemote("FishingGameResult", result)
    },

    "Display_Player_List": (player_list, online, max) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/ListaJucatori/index.html")
        }
        uiGlobal_Browsers.execute("app.IncarcaJucatori('" + player_list + "', " + online + ", " + max + ");");
        mp.gui.cursor.visible = !0
    },
    "Arata_Buletinul": (nume_caracter, birth, sex, sexpic, semnatura, vip) => {
        if (licenseCef === undefined) {
            licenseCef = mp.browsers.new("package://cef/ICard/index.html")
        }
        licenseCef.execute("app.showbuletin('" + nume_caracter + "','" + birth + "','" + sex + "','" + sexpic + "','" + semnatura + "','" + vip + "');");

    },
    "Destroy_License_Menu": () => {
        if (licenseCef != undefined) {
            licenseCef.destroy();
            licenseCef = undefined
        }
        mp.gui.cursor.visible = !1;

    },
    "Arata_Permisele": (nume_caracter, points1, hours1, points2, hours2, hours3, hours4, hours5, vipstatus, semnatura) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/ICard/index.html")
        }
        uiGlobal_Browsers.execute("app.showlicenses('" + nume_caracter + "','" + points1 + "','" + hours1 + "','" + points2 + "','" + hours2 + "','" + hours3 + "','" + hours4 + "','" + hours5 + "','" + vipstatus + "','" + semnatura + "');");
        mp.gui.cursor.visible = !0
    },
    "Display_Selling_Menu": (inv, priceList, sellType) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/SellItemMenu/index.html")
        }
        uiGlobal_Browsers.execute("app.LoadInventory('" + inv + "', '" + priceList + "'," + sellType + " );");
        mp.gui.cursor.visible = !0
    },
    "handle_seatbelt": (toggled) => {
        mp.game.invoke("SET_PED_CONFIG_FLAG", mp.players.local, 32, toggled)
    },
    "DisplayApplicationMenu": (factionId, title, factionQuestion) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://cef/Interfete/FactionApplication/index.html")
        }
        uiGlobal_Browsers.execute("app.DisplayApplicationForm(" + factionId + ", '" + title + "', '" + factionQuestion + "');");
        mp.gui.cursor.visible = !0
    },
    "SubmitApplicationForm": (factionid, answers) => {
        mp.events.callRemote("SaveApplication", factionid, answers)
    },
    "SetProgressBar": (value, name) => {
        if (uiProgressBar_Browsers === undefined) {
            uiProgressBar_Browsers = mp.browsers.new("package://files/progressbar/progressbar.html")
        }
        uiProgressBar_Browsers.execute("setStatus('" + value + "', '100', '" + name + "')")
    },
    "DestroyProgressBar": () => {
        if (uiProgressBar_Browsers != undefined) {
            uiProgressBar_Browsers.destroy();
            uiProgressBar_Browsers = undefined
        }
    },
    "uiGeneralInput": (callbackId, title, placeHolder, description, type) => {
        if (uiGeneralStart_Browsers === undefined) {
            uiGeneralStart_Browsers = mp.browsers.new("package://cef/Interfete/InputMenu/index.html")
        } else {
            uiGeneralStart_Browsers.destroy();
            uiGeneralStart_Browsers = undefined;
            uiGeneralStart_Browsers = mp.browsers.new("package://cef/Interfete/InputMenu/index.html")
        }
        uiGeneralStart_Browsers.execute("app.DisplayDialogFunction('" + callbackId + "', '" + title + "', '" + placeHolder + "', '" + description + "', '" + type + "')");
        mp.gui.cursor.visible = !0
    },
    "uiGeneralChoice": (title, options) => {
        if (uiGeneralStart_Browsers === undefined) {
            uiGeneralStart_Browsers = mp.browsers.new("package://cef/Interfete/SelectionMenu/index.html")
        } else {
            uiGeneralStart_Browsers.destroy();
            uiGeneralStart_Browsers = undefined;
            uiGeneralStart_Browsers = mp.browsers.new("package://cef/Interfete/SelectionMenu/index.html")
        }
        uiGeneralStart_Browsers.execute("app.DisplayDialogFunction('" + title + "', '" + options + "')");
        mp.gui.cursor.visible = !0
    },
    "death_screen_false": () => {
        mp.game.ui.displayHud(!0);
        mp.game.gameplay.setFadeOutAfterDeath(!1);
        mp.game.gameplay.disableAutomaticRespawn(!0)
    },
    "washvehicle": () => {
        if (mp.players.local.vehicle) {
            mp.players.local.vehicle.setDirtLevel(0.0)
        }
    },

    "Notify": (text) => {
        mp.game.graphics.notify(text)
    },
    "CreateParticleFXonPos": (dictName, effectName) => {
        let pos = localPlayer.position;
        let rot = new mp.Vector3(0, 0, 0);
        mp.game.streaming.requestNamedPtfxAsset(dictName);
        mp.game.graphics.setPtfxAssetNextCall(dictName);
        mp.game.graphics.startParticleFxLoopedAtCoord(effectName, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, 1.0, false, false, false, false);

    },
    "SyncTracking": (units) => {
        trackedUnits = JSON.parse(units);
        trackedUnits.forEach((unit) => {
            if (blips[unit.Name]) {


                BlipHelper.moveBlip(unit.Name, new mp.Vector3(unit.Position.x, unit.Position.y, unit.Position.z))
            }
            else {

                BlipHelper.createBlipExt(unit.Name, new mp.Vector3(unit.Position.x, unit.Position.y, unit.Position.z), 1, 1.0, 1, false, unit.Name)
            }
        })
    },
    "RemoveTracked": (unit) => {
        if (blips[unit]) BlipHelper.removeBlip(unit);

    }
});
mp.events.add('TestAttach', (obj, x, y, z, rx, ry, rz) => {
    obj.attachTo(localPlayer.handle, 60309, x, y, z, rx, ry, rz, false, false, false, false, 2, true);
});
mp.events.add('TestAttach1', (obj, x, y, z, rx, ry, rz) => {
    obj.attachTo(localPlayer.handle, 60309, x, y, z, rx, ry, rz, false, false, false, false, 2, true);
});
mp.events.add('client_input_response', (response, answer) => {
    if (uiGeneralStart_Browsers !== undefined) {
        uiGeneralStart_Browsers.destroy();
        uiGeneralStart_Browsers = undefined;
    }
    if ((typeof answer) === 'string') {
        mp.events.callRemote('uiInput_response', response, answer);
    }
    else {
        mp.events.callRemote('uiInput_confirmation', response, answer);
    }
    mp.gui.cursor.visible = !1
});



mp.events.add('client_input_destroy', () => {
    if (uiGeneralStart_Browsers !== undefined) {
        uiGeneralStart_Browsers.destroy();
        uiGeneralStart_Browsers = undefined;
    }

});
mp.events.add('client_input_choice', (input) => {
    if (uiGeneralStart_Browsers !== undefined) {
        uiGeneralStart_Browsers.destroy();
        uiGeneralStart_Browsers = undefined;
        mp.events.callRemote('uiInput_choice', input);
        mp.gui.cursor.visible = !1
    }

});
mp.events.add('TurnFaceToEntity', (entity) => {
    mp.players.local.taskTurnToFace(entity.handle, 1000);
});
let freezeMe = !1;
let freezeVehicle = !1;

mp.events.add("freeze", (bool) => {
    mp.players.local.freezePosition(bool);
});
mp.events.add("freezeEx", (bool) => {
    freezeMe = bool
});
mp.events.add("cuffed", (bool) => {
    mp.events.call("Destroy_Character_Menu");
    cuffMe = bool
});
mp.events.add("TurnFaceToCuffed", (X, Y, Z) => {
    mp.players.local.taskTurnToFaceCoord(X, Y, Z, 1000);
});
mp.events.add("freezeVehicle", (bool) => {
    freezeVehicle = bool
});
var displayMessage = null;
mp.events.add("displayMessage", (string) => {
    displayMessage = string
});
var bottomText = null;
var bottomTextTime = -1;
var bottomTextInterval = null;
mp.events.add("showBottomText", (message, time = 5000) => {
    bottomText = message;
    bottomTextTime = time;
    bottomTextInterval = setInterval(() => {
        if (bottomTextTime == 0 || bottomTextTime < 0) {
            clearInterval(bottomTextInterval);
            bottomTextInterval = null;
            return bottomTextTime = -1
        }
        bottomTextTime -= 1000
    }, 1000)
});
const drawText = (text, position, options) => {
    options = {
        ... {
            align: 1,
            font: 4,
            scale: 0.3,
            outline: !0,
            shadow: !0,
            color: [255, 255, 255, 255]
        }, ...options
    };
    const ui = mp.game.ui;
    const font = options.font;
    const scale = options.scale;
    const outline = options.outline;
    const shadow = options.shadow;
    const color = options.color;
    const wordWrap = options.wordWrap;
    const align = options.align;
    ui.setTextEntry("CELL_EMAIL_BCON");
    for (let i = 0; i < text.length; i += 99) {
        const subStringText = text.substr(i, Math.min(99, text.length - i));
        mp.game.ui.addTextComponentSubstringPlayerName(subStringText)
    }
    ui.setTextFont(font);
    ui.setTextScale(scale, scale);
    ui.setTextColour(color[0], color[1], color[2], color[3]);
    if (shadow) {
        mp.game.invoke(Natives.SET_TEXT_DROP_SHADOW);
        ui.setTextDropshadow(2, 0, 0, 0, 255)
    }
    if (outline) {
        mp.game.invoke("0x2513DFB0FB8400FE")
    }
    switch (align) {
        case 1:
            {
                ui.setTextCentre(!0);
                break
            }
        case 2:
            {
                ui.setTextRightJustify(!0);
                ui.setTextWrap(0.0, position[0] || 0);
                break
            }
    }
    if (wordWrap) {
        ui.setTextWrap(0.0, (position[0] || 0) + wordWrap)
    }
    ui.drawText(position[0] || 0, position[1] || 0)
}
let turf_name = "";
var iteration = 0;
var atmHashes = [-1126237515, -1364697528, 506770882, -870868698];
var ATMTrackedBlips = [];
var ATMTrackedBlipHashes = [];
var ATMTrackedPositions = [];

function calculateDist(vec1, vec2) {
    return Math.sqrt((vec1.X - vec2.X) * (vec1.X - vec2.X) + (vec1.Y - vec2.Y) * (vec1.Y - vec2.Y) + (vec1.Z - vec2.Z) * (vec1.Z - vec2.Z))
}

function doesVectorExist(list, vec) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === vec)
            return !0;
        if (vec.X < list[i].X + 0.25 && vec.X > list[i].X - 0.25) {
            if (vec.Y < list[i].Y + 0.25 && vec.Y > list[i].Y - 0.25) {
                if (vec.Z < list[i].Z + 0.25 && vec.Z > list[i].Z - 0.25)
                    return !0
            }
        }
    }
    return !1
}

function listContains(list, key) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === key)
            return !0
    }
    return !1
}
let isTaxiFare = !1;
let isCustomer = !1;
let currentToPay = 0;
let currentFare = 0;
mp.events.add("update_taxi_fare", (arg1, arg2, arg3, arg4) => {
    isTaxiFare = arg1;
    currentFare = arg2;
    currentToPay = arg3;
    isCustomer = arg4
});
let taxiFare = "Tarif";
let taxiFareInfo = "Tarif de inceput 10/s";
let dollar = "$";
let taxiCustomer = "Client";
let taxiCustomerInfo = "Plata";
let taxiCustomerAsk = "Aveti de platit";

const width = 1.03;
const height = 1.0065;
const border = 0.001;
var lasthealth = 100;
var color = [255, 255, 255, 255];
mp.nametags.enabled = !1;
mp.events.add("vehicleDistance", (amount) => {
    ui_distance = amount
});
const scalable = (dist, maxDist) => {
    return Math.max(0.1, 1 - (dist / maxDist))
}
const clamp = (min, max, value) => {
    return Math.min(Math.max(min, value), max)
};
var falando = !1;
var res = !1;

function DisableControl(...args) {
    if (args.length == 0) return !1;
    args[0].forEach((control) => {
        mp.game.controls.disableControlAction(0, control, args[1])
    })
}
let timeNow_2 = Date.now();
var isInSafeZone = !1;
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    if (targetEntity && targetEntity.type == "player") {
        mp.events.callRemote("DamageSystem_ShotPlayerAtHealth", targetEntity, targetEntity.getHealth())
    }
});
var entity = null;
var nearestObject = null;
var res_2 = mp.game.graphics.getScreenActiveResolution(1, 1);

function getLookingAtEntity() {

    let startPosition = localPlayer.getBoneCoords(12844, 0.5, 0, 0);
    let secondPoint = mp.game.graphics.screen2dToWorld3d([res_2.x / 2, res_2.y / 2, (2 | 4 | 8)]);
    if (secondPoint == undefined) return null;
    startPosition.z -= 0.3;
    const result = mp.raycasting.testPointToPoint(startPosition, secondPoint, localPlayer, (2 | 4 | 8 | 16));
    if (result) { if (typeof (result.entity) === 'number' && result.entity !== 0 && mp.game.entity.isAnObject(result.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(result.entity); } }
    if (typeof result !== 'undefined') {
        if (typeof result.entity.type === 'undefined') {
            return null
        }
        if (result.entity.type == 'object' && result.entity.getVariable('TYPE') == undefined) {
            return null
        }
        let entPos = result.entity.position;
        let lPos = localPlayer.position;
        if (mp.game.gameplay.getDistanceBetweenCoords(entPos.x, entPos.y, entPos.z, lPos.x, lPos.y, lPos.z, !0) > 4) return null;
        return result.entity
    }
    return null
}

function getNearestObjects() {
    var tempO = null;
    var objects = mp.objects.toArray();
    objects.forEach((object) => {
        var posL = localPlayer.position;
        var posO = object.position;
        var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, !0);
        if (object.getVariable('TYPE') != undefined && localPlayer.dimension === object.dimension && distance < 3) {
            if (tempO === null) tempO = object;
            else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, !0) < mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, !0))
                tempO = object
        }
    });
    nearestObject = tempO
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



let weShooting = 0;
let enteringLockedVehicle = false;
let startedEnteringVehicle = false;
let notHacked = false;
let tryingToEnter = false;

let collision = true;

let timer = 0;



mp.events.add('render', (nametags) => {
    mp.game.controls.disableControlAction(2, 12, !0);
    mp.game.controls.disableControlAction(2, 13, !0);
    mp.game.controls.disableControlAction(2, 14, !0);
    mp.game.controls.disableControlAction(2, 15, !0);
    mp.game.controls.disableControlAction(2, 16, !0);
    mp.game.controls.disableControlAction(2, 17, !0);
    mp.game.controls.disableControlAction(2, 37, !0);
    mp.game.controls.disableControlAction(2, 99, !0);
    mp.game.controls.disableControlAction(2, 100, !0);
    mp.game.controls.disableControlAction(2, 157, !0);
    mp.game.controls.disableControlAction(2, 158, !0);
    mp.game.controls.disableControlAction(2, 159, !0);
    mp.game.controls.disableControlAction(2, 160, !0);
    mp.game.controls.disableControlAction(2, 161, !0);
    mp.game.controls.disableControlAction(2, 162, !0);
    mp.game.controls.disableControlAction(2, 163, !0);
    mp.game.controls.disableControlAction(2, 164, !0);
    mp.game.controls.disableControlAction(2, 165, !0);
    mp.game.controls.disableControlAction(2, 261, !0);
    mp.game.controls.disableControlAction(2, 262, !0);
    mp.game.controls.disableControlAction(0, 36, !0);
    mp.game.invoke('0x9E4CFFF989258472');// cam idle off
    mp.game.invoke('0xF4F2C0D4EE209E20');


    mp.game.ui.setRadarZoom(1100);



    try {


        if (mp.players.local === null || mp.players.local === undefined)
            return;
        if (!mp.players.local.vehicle) {
            notHacked = false;
            tryingToEnter = false;
        }

        

        const vehHandle = mp.players.local.getVehicleIsTryingToEnter();
        
        if (vehHandle) {
            startedEnteringVehicle = true;
            const veh = mp.vehicles.atHandle(vehHandle);
            let vehStatus = veh.getDoorLockStatus();

            if (vehStatus == 2) {
                enteringLockedVehicle = true;
                tryingToEnter = true;
            }
            if (enteringLockedVehicle && vehStatus == 1) {
                mp.players.local.clearTasksImmediately();
                enteringLockedVehicle = false;
                startedEnteringVehicle = false;
            }
            
        }

        if (mp.players.local.vehicle && tryingToEnter) {

            mp.events.callRemote("announceAdminsInveh");
            notHacked = true;
            tryingToEnter = false;
        }

        else if (mp.players.local.vehicle && startedEnteringVehicle) {
            startedEnteringVehicle = false;
            notHacked = true;
        }
        else if (mp.players.local.vehicle && !notHacked) {
            mp.events.callRemote('announceAdminsInveh');
            notHacked = true;
        }
        

        if (!res) {
            resolution = mp.game.graphics.getScreenResolution(0, 0);
            if (resolution.x < 1920) {
                res_X = resolution.x;
                res_Y = resolution.y;
            }
            res = !0;
        }


        var player = mp.players.local;
        let playerIsInCover = mp.players.local.isInCover(false);
        if (mp.players.local.vehicle != null) {
            mp.players.local.vehicle.setInvincible(false);
        }

        if (!player.isShooting() && weShooting > 0) {
            weShooting = weShooting - 3;
        }



        if (player.isShooting() && player.isDoingDriveby()) {

                mp.game.cam.shakeGameplayCam('JOLT_SHAKE', 0.1);
            


           
        }




        if (player.isShooting() && !player.isDoingDriveby()) {
            let weapon = mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), localPlayer.handle);
            if (weapon === -2084633992) {
                weShooting = weShooting + 60;
            }
            else if (weapon === -1074790547) {
                weShooting = weShooting + 90;
            }
            else weShooting = weShooting + 80;
            if (weShooting < 100) {
                if (recoilRL > 0) {
                    recoilRL = -0.1;
                }
                else recoilRL = 0.1
            }
            if (weShooting > 200) {
                if (recoilRL > 0) {
                    recoilRL = -0.1;
                }
                else recoilRL = 0.1
            }

            if (weShooting > 300) {
                if (recoilRL > 0) {
                    recoilRL = -0.2;
                }
                else recoilRL = 0.2
            }

            if (weShooting > 400) {
                if (recoilRL > 0) {
                    recoilRL = -0.3;
                }
                else recoilRL = 0.3
            }

            if (weShooting > 500) {
                if (recoilRL > 0) {
                    recoilRL = -0.4;
                }
                else recoilRL = 0.4
            }


            if (weShooting > 600) {
                if (recoilRL > 0) {
                    recoilRL = -0.5;
                }
                else recoilRL = 0.5
            }

            if (recoils[weapon] != 0) {
                tv = 0;

                if (mp.game.invoke('0x8D4D46230B2C353A') != 4) {
                    if (tv <= parseFloat(recoils[weapon])) {
                        p = mp.game.invokeFloat('0x3A6867B4845BEDA2');
                        mp.game.cam.setGameplayCamRelativePitch(p + 0.5, 0.5)
                        mp.game.cam.setGameplayCamRelativeHeading(recoilRL);

                    }

                }
                else if (tv <= parseFloat(recoils[weapon])) {

                    p = mp.game.invokeFloat('0x3A6867B4845BEDA2')
                    if (parseFloat(recoils[weapon]) > 0.1) {
                        mp.game.cam.setGameplayCamRelativePitch(p + 0.6, 1.2)
                        tv = tv + 0.6
                    }
                    else {

                        mp.game.cam.setGameplayCamRelativePitch(p + 0.016, 0.333)
                        tv = tv + 0.1
                    }
                }
            }
        }
        if (player.hasVariable('nametag_visible')) {

            let nametagvisible = player.getVariable('nametag_visible');
            if (!player.hasVariable('adminspyon') || player.hasVariable('adminspyon') && player.getVariable('adminspyon') === false) {
                if (playerIsInCover && nametagvisible) {
                    mp.events.callRemote("DisplayNameTagOff");
                }
                else if (!playerIsInCover && !nametagvisible && !mp.keys.isDown(17)) {
                    mp.events.callRemote("DisplayNameTagOn");
                }
            }
        }
        if (chatopened) {
            mp.game.controls.disableControlAction(2, 199, !0);
        }
        if (mp.players.local === undefined || mp.players.local === null) {
            return;
        }
        const screenRes = mp.game.graphics.getScreenResolution(0, 0);
        if (lasthealth - player.getHealth() >= 5) {
            mp.events.callRemote("OnPlayerHealthChange", lasthealth - player.getHealth());
        }
        lasthealth = player.getHealth();
        if (chatopened && uiGlobal_Browsers != undefined && uiGeneralStart_Browsers != undefined && mp.gui.cursor.visible) {
            mp.game.controls.disableControlAction(2, 199, !0)
        }
        if (mp.gui.cursor.visible == !0 && !chatopened) {
            mp.game.controls.enableControlAction(2, 249, !0);
        }
        mp.game.player.setHealthRechargeMultiplier(0.0);
        mp.game.player.restoreStamina(100);
        if (logged != 0) {
            if (global.chatopened) {
                mp.game.controls.disableAllControlActions(2);
                mp.game.controls.enableControlAction(2, 1, !0);
                mp.game.controls.enableControlAction(2, 2, !0);
                mp.game.controls.enableControlAction(2, 3, !0);
                mp.game.controls.enableControlAction(2, 4, !0);
                mp.game.controls.enableControlAction(2, 5, !0);
                mp.game.controls.enableControlAction(2, 6, !0);
                mp.game.controls.enableControlAction(2, 249, !0);
                mp.game.controls.enableControlAction(2, 286, !0);
                mp.game.controls.enableControlAction(2, 287, !0);
                mp.game.controls.enableControlAction(2, 290, !0);
                mp.game.controls.enableControlAction(2, 291, !0);
                mp.game.controls.enableControlAction(2, 292, !0);
                mp.game.controls.enableControlAction(2, 293, !0);
                mp.game.controls.enableControlAction(2, 294, !0);
                mp.game.controls.enableControlAction(2, 295, !0);
                mp.game.controls.enableControlAction(2, 270, !0);
                mp.game.controls.enableControlAction(2, 271, !0);
                mp.game.controls.enableControlAction(2, 272, !0);
                mp.game.controls.enableControlAction(2, 273, !0);
                mp.game.controls.enableControlAction(2, 329, !0);
                mp.game.controls.enableControlAction(2, 330, !0);
            }
        }

        if (freezeMe) {
            mp.game.controls.disableAllControlActions(2);
            mp.game.controls.enableControlAction(2, 1, !0);
            mp.game.controls.enableControlAction(2, 2, !0);
            mp.game.controls.enableControlAction(2, 3, !0);
            mp.game.controls.enableControlAction(2, 4, !0);
            mp.game.controls.enableControlAction(2, 5, !0);
            mp.game.controls.enableControlAction(2, 6, !0);
            mp.game.controls.enableControlAction(2, 200, !0);
            mp.game.controls.enableControlAction(2, 249, !0);
            mp.game.controls.enableControlAction(2, 286, !0);
            mp.game.controls.enableControlAction(2, 287, !0);
            mp.game.controls.enableControlAction(2, 290, !0);
            mp.game.controls.enableControlAction(2, 291, !0);
            mp.game.controls.enableControlAction(2, 292, !0);
            mp.game.controls.enableControlAction(2, 293, !0);
            mp.game.controls.enableControlAction(2, 294, !0);
            mp.game.controls.enableControlAction(2, 295, !0);
            mp.game.controls.enableControlAction(2, 270, !0);
            mp.game.controls.enableControlAction(2, 271, !0);
            mp.game.controls.enableControlAction(2, 272, !0);
            mp.game.controls.enableControlAction(2, 273, !0);
            mp.game.controls.enableControlAction(2, 329, !0);
            mp.game.controls.enableControlAction(2, 330, !0);
            mp.game.controls.disableControlAction(2, 71, !0);
            mp.game.controls.disableControlAction(2, 72, !0);
        }
        if (global.cuffMe) {
            mp.game.controls.disableAllControlActions(2);
            mp.game.controls.enableControlAction(2, 1, !0);
            mp.game.controls.enableControlAction(2, 2, !0);
            mp.game.controls.enableControlAction(2, 3, !0);
            mp.game.controls.enableControlAction(2, 4, !0);
            mp.game.controls.enableControlAction(2, 5, !0);
            mp.game.controls.enableControlAction(2, 6, !0);
            mp.game.controls.enableControlAction(2, 30, !0);
            mp.game.controls.enableControlAction(2, 31, !0);
            mp.game.controls.enableControlAction(2, 32, !0);
            mp.game.controls.enableControlAction(2, 33, !0);
            mp.game.controls.enableControlAction(2, 34, !0);
            mp.game.controls.enableControlAction(2, 35, !0);
            mp.game.controls.enableControlAction(2, 200, !0);
            mp.game.controls.enableControlAction(2, 249, !0);
            mp.game.controls.enableControlAction(2, 286, !0);
            mp.game.controls.enableControlAction(2, 287, !0);
            mp.game.controls.enableControlAction(2, 290, !0);
            mp.game.controls.enableControlAction(2, 291, !0);
            mp.game.controls.enableControlAction(2, 292, !0);
            mp.game.controls.enableControlAction(2, 293, !0);
            mp.game.controls.enableControlAction(2, 294, !0);
            mp.game.controls.enableControlAction(2, 295, !0);
            mp.game.controls.enableControlAction(2, 270, !0);
            mp.game.controls.enableControlAction(2, 271, !0);
            mp.game.controls.enableControlAction(2, 272, !0);
            mp.game.controls.enableControlAction(2, 273, !0);
            mp.game.controls.enableControlAction(2, 329, !0);
            mp.game.controls.enableControlAction(2, 330, !0);
            mp.game.controls.disableControlAction(2, 71, !0);
            mp.game.controls.disableControlAction(2, 72, !0);
            mp.game.controls.disableControlAction(2, 58, !0);
        }
        if (!global.cuffMe && localPlayer.getVariable("PerformingAction") != "none") {
            mp.game.controls.disableAllControlActions(2);
            mp.game.controls.enableControlAction(2, 1, !0);
            mp.game.controls.enableControlAction(2, 2, !0);
            mp.game.controls.enableControlAction(2, 3, !0);
            mp.game.controls.enableControlAction(2, 4, !0);
            mp.game.controls.enableControlAction(2, 5, !0);
            mp.game.controls.enableControlAction(2, 6, !0);

            mp.game.controls.enableControlAction(2, 22, !0);
            mp.game.controls.enableControlAction(2, 30, !0);
            mp.game.controls.enableControlAction(2, 31, !0);
            mp.game.controls.enableControlAction(2, 32, !0);
            mp.game.controls.enableControlAction(2, 33, !0);
            mp.game.controls.enableControlAction(2, 34, !0);
            mp.game.controls.enableControlAction(2, 35, !0);
            mp.game.controls.enableControlAction(2, 200, !0);
            mp.game.controls.enableControlAction(2, 249, !0);
            mp.game.controls.enableControlAction(2, 286, !0);
            mp.game.controls.enableControlAction(2, 287, !0);
            mp.game.controls.enableControlAction(2, 290, !0);
            mp.game.controls.enableControlAction(2, 291, !0);
            mp.game.controls.enableControlAction(2, 292, !0);
            mp.game.controls.enableControlAction(2, 293, !0);
            mp.game.controls.enableControlAction(2, 294, !0);
            mp.game.controls.enableControlAction(2, 295, !0);
            mp.game.controls.enableControlAction(2, 270, !0);
            mp.game.controls.enableControlAction(2, 271, !0);
            mp.game.controls.enableControlAction(2, 272, !0);
            mp.game.controls.enableControlAction(2, 273, !0);
            mp.game.controls.enableControlAction(2, 329, !0);
            mp.game.controls.enableControlAction(2, 330, !0);

            mp.game.controls.disableControlAction(2, 58, !0);
            if (localPlayer.getVariable("PerformingAction") === "eating" || localPlayer.getVariable("PerformingAction") === "drinking" || localPlayer.getVariable("PerformingAction") === "smoking") {
                mp.game.controls.enableControlAction(2, 59, !0);
                mp.game.controls.enableControlAction(2, 71, !0);
                mp.game.controls.enableControlAction(2, 72, !0);
                mp.game.controls.enableControlAction(2, 75, !0);
                mp.game.controls.enableControlAction(2, 23, !0);
            }
            else {
                mp.game.controls.disableControlAction(2, 71, !0);
                mp.game.controls.disableControlAction(2, 72, !0);
            }
            if (localPlayer.getVariable("PerformingAction") !== "dragging") {
                mp.game.controls.enableControlAction(2, 21, !0);
            }
            else mp.game.controls.disableControlAction(2, 21, !0);
        }

        if (bottomTextTime != -1) {
            mp.game.ui.setTextFont(7);
            mp.game.ui.setTextEntry2("STRING");
            mp.game.ui.addTextComponentSubstringPlayerName(bottomText);
            mp.game.ui.drawSubtitleTimed(1, true);
        }
        if (logged) {
            var currentTimeInMilliseconds = new Date().getTime();

            if (currentTimeInMilliseconds - lastUpdateTickCount > updateTimeoutInMilliseconds) {
                lastUpdateTickCount = currentTimeInMilliseconds;
                updateValues();

            }
            if (uiPlayer_Browsers != undefined) {

                var screen = mp.game.graphics.getScreenActiveResolution(0, 0);



                var sfX = 1.0 / 20.0;
                var sfY = 1.0 / 20.0;
                var safeZone = mp.game.graphics.getSafeZoneSize();
                var aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
                var resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
                var scaleX = 1.0 / resolution.x;
                var scaleY = 1.0 / resolution.y;
                uiPlayer_Browsers.execute("safeZone2.update(" + screen.x + "," + screen.y + "," + safeZone + ")");
                uiPlayer_Browsers.execute("map.update(" + scaleX + "," + scaleY + "," + resolution.y + "," + resolution.x + "," + aspectRatio + "," + sfY + "," + sfX + "," + safeZone + ")");


                if (zoneName != null) {
                    zoneName = zoneName.replaceAll("'", "&apos;");
                    streetName = streetName.replaceAll("'", "&apos;");
                    crossingRoad = crossingRoad.replaceAll("'", "&apos;");
                    altKey = 'off';
                    if (mp.keys.isDown(18) === true) altKey = 'on';
                    uiPlayer_Browsers.execute(`app.setlocation('${text}','${zoneName}','${streetName}','${crossingRoad}', '${serverRemoteId}', '${altKey}');`)
                }
            }


            if (!localPlayer.isInAnyVehicle(!1) && !localPlayer.isDead()) {
                entity = getLookingAtEntity();
            } else {
                entity = null;
            }

            if (freezeVehicle) {
                mp.game.controls.disableControlAction(2, 71, !0);
                mp.game.controls.disableControlAction(2, 72, !0);
            }
            if (mp.game.invoke(getNative('IS_CUTSCENE_ACTIVE'))) {
                mp.game.invoke(getNative('STOP_CUTSCENE_IMMEDIATELY'));
            }
            if (mp.game.invoke(getNative('GET_RANDOM_EVENT_FLAG'))) {
                mp.game.invoke(getNative('SET_RANDOM_EVENT_FLAG'), !1);
            }
            if (mp.game.invoke(getNative('GET_MISSION_FLAG'))) {
                mp.game.invoke(getNative('SET_MISSION_FLAG'), !1);
            }
            mp.game.ui.hideHudComponentThisFrame(6);
            mp.game.ui.hideHudComponentThisFrame(7);
            mp.game.ui.hideHudComponentThisFrame(8);
            mp.game.ui.hideHudComponentThisFrame(9);




            if (mp.players.local.getVariable("Injured") > 0) {
                if (mp.players.local.getVariable("Injured") == 1) {
                    if (mp.players.local.getVariable("InjuredTime") > 0) {
                        mp.game.graphics.drawText(`~w~You will be send to the hospital in :~b~ ${mp.players.local.getVariable("InjuredTime").toString()} seconds! \n Reason: ${mp.players.local.getVariable("DeathReason")} - Injured Area: ${mp.players.local.getVariable("BoneInjured")}`, [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
                            font: 4,
                            color: [255, 255, 255, 220 - 20],
                            scale: [0.40, 0.40],
                            outline: true,
                            shadow: true,
                            centre: false
                        });
                    }
                }

                if (mp.players.local.getVariable("Injured") == 2) {
                    if (mp.players.local.getVariable("InjuredTime") > 0) {
                        mp.game.graphics.drawText("~w~You are in the hospital! You will be discharged from the hospital in :~b~ " + mp.players.local.getVariable("InjuredTime").toString() + " seconds!", [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
                            font: 4,
                            color: [255, 255, 255, 220 - 20],
                            scale: [0.5, 0.5],
                            outline: true,
                            shadow: true,
                            centre: false
                        });
                    }
                }
            }
            if (jail_time > 0) {
                mp.game.graphics.drawText("~w~You will be released in :~b~ " + jail_time.toString() + " seconds", [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
                    font: 4,
                    color: [255, 255, 255, 220 - 20],
                    scale: [0.5, 0.5],
                    outline: true,
                    shadow: true,
                    centre: false
                });
            }
            mp.game.graphics.drawText(mp.players.local.getVariable("SubTitle"), [(res_X / 2) / res_X, (res_Y - 120) / res_Y], {
                font: 0,
                color: [255, 255, 255, 210],
                scale: [0.42, 0.42],
                outline: !1,
                centre: !1
            });
            if (isTaxiFare) {
                drawText(taxiFare, [(res_X - 10) / res_X, 0.790 - 0.31], {
                    scale: 0.6,
                    color: [115, 186, 131, 255],
                    font: 4,
                    align: 2,
                    shadow: !1,
                    outline: !0
                });
                drawText(taxiFareInfo, [(res_X - 10) / res_X, 0.82 - 0.31], {
                    scale: 0.4,
                    color: [255, 255, 255, 255],
                    font: 4,
                    align: 2,
                    shadow: !1,
                    outline: !0
                });
                drawText(dollar + `${currentFare}`, [(res_X - 10) / res_X, 0.847 - 0.31], {
                    scale: 0.7,
                    color: [255, 255, 255, 255],
                    font: 4,
                    align: 2,
                    shadow: !1,
                    outline: !0
                });
                drawText(taxiCustomer, [(res_X - 10) / res_X, 0.880 - 0.31], {
                    scale: 0.6,
                    color: [115, 186, 131, 255],
                    font: 4,
                    align: 2,
                    shadow: !1,
                    outline: !0
                });
                if (isCustomer == !0) {
                    drawText(taxiCustomerAsk, [(res_X - 10) / res_X, 0.924 - 0.31], {
                        scale: 0.4,
                        color: [255, 255, 255, 255],
                        font: 4,
                        align: 2,
                        shadow: !1,
                        outline: !0
                    });
                } else {
                    drawText(taxiCustomerInfo, [(res_X - 10) / res_X, 0.924 - 0.31], {
                        scale: 0.4,
                        color: [255, 255, 255, 255],
                        font: 4,
                        align: 2,
                        shadow: !1,
                        outline: !0
                    });
                }
                drawText(dollar + `${currentToPay}`, [(res_X - 10) / res_X, 0.948 - 0.31], {
                    scale: 0.7,
                    color: [255, 255, 255, 255],
                    font: 4,
                    align: 2,
                    shadow: !1,
                    outline: !0
                });
            }
        }
    } catch (e) {
        mp.game.graphics.notify('Render:' + e.toString());
        mp.console.logFatal(`Render: ${e.message}`);

    }
});
const drawSprite = (dist, name, scale, heading, colour, x, y, layer) => {
    const resolution = mp.game.graphics.getScreenActiveResolution(0, 0),
        textureResolution = mp.game.graphics.getTextureResolution(dist, name),
        SCALE = [(scale[0] * textureResolution.x) / resolution.x, (scale[1] * textureResolution.y) / resolution.y]
    if (mp.game.graphics.hasStreamedTextureDictLoaded(dist) === 1) {
        if (typeof layer === 'number') {
            mp.game.graphics.set2dLayer(layer)
        }
        mp.game.graphics.drawSprite(dist, name, x, y, SCALE[0], SCALE[1], heading, colour[0], colour[1], colour[2], colour[3])
    } else {
        mp.game.graphics.requestStreamedTextureDict(dist, !0)
    }
}

function distanceBetweenVectors(vec1, vec2) {
    return Math.sqrt((vec1.X - vec2.X) * (vec1.X - vec2.X) + (vec1.Y - vec2.Y) * (vec1.Y - vec2.Y) + (vec1.Z - vec2.Z) * (vec1.Z - vec2.Z))
}
var CTRL = !1;
var onSubmitGeneric = function (string) {
    mp.events.call('destroyBrowser');
    mp.events.callRemote('new_character_name', string)
};

mp.events.add('Show_Cursor', () => {
    mp.gui.cursor.visible = !0;
    cursor_status = !0
});
var cursor_status = !1;
// keypress q
mp.keys.bind(0x71, !0, function () {
    if (logged === 0 || chatopened || menu_libary === !0 || new Date().getTime() - lastCheck < 1000) return;
    if (cursor_status == !1) {
        mp.gui.cursor.visible = !0;
        cursor_status = !0
    } else {
        cursor_status = !1;
        mp.gui.cursor.visible = !1
    }
});


// keypress f1
mp.keys.bind(0x72, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:F1')
});
// keypress f2
mp.keys.bind(0x73, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:F4')
});
// keypress f3
mp.keys.bind(0x74, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('KeyPress:F5');
    lastCheck = new Date().getTime()
});
// keypress f6
mp.keys.bind(0x75, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('KeyPress:F6');
    lastCheck = new Date().getTime()
});
// keypress f7
mp.keys.bind(0x76, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('KeyPress:F7', 1);
    lastCheck = new Date().getTime()
});


// keypress f8
mp.keys.bind(0x77, !1, (player) => {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('KeyPress:F8');
    lastCheck = new Date().getTime()
});

/*var time = mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1);
var screenName = "lsbr-rp-" + time.year + "-" + time.month + "-" + time.day + "-" + time.hour + "-" + time.minute + "-" + time.second + ".png";
mp.gui.takeScreenshot(screenName, 1, 100, 0);
mp.game.graphics.notify("~b~Screenshot taken: \n" + "~s~" + screenName + "\n" + "~g~C:\\RAGEMP\\screenshots")*/

// keypress y
mp.keys.bind(0x59, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:Y');
    lastCheck = new Date().getTime()
});
// keypress o
mp.keys.bind(0x4F, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:O');
    lastCheck = new Date().getTime()
});
// keypress u
mp.keys.bind(0x55, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:U');
    lastCheck = new Date().getTime()
});
// keypress i
mp.keys.bind(0x49, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:I');
    lastCheck = new Date().getTime()
});
// keypress x
mp.keys.bind(0x58, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100 || mp.players.local.isRagdoll()) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:X');
    lastCheck = new Date().getTime()
});
// keypress k
mp.keys.bind(0x4B, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:K');
    lastCheck = new Date().getTime()
});
// keypress e
mp.keys.bind(0x45, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:E');
    lastCheck = new Date().getTime()
});
// keypress m

// keypress l

// keypress insert
mp.keys.bind(0x2D, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:INSERT');
    lastCheck = new Date().getTime()
});
// keypress home
mp.keys.bind(0x24, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:HOME');
    lastCheck = new Date().getTime()
});


mp.events.add("StopVehicle", () => {
    if (localPlayer.vehicle) {
        localPlayer.vehicle.setHalt(1.5, 1, !1)
    }
});
mp.events.add("getPedOverlay", (cash) => {
    let featureData = [];
    for (let i = 0; i < 20; i++) mp.events.callRemote("Get_Feature_Data", i, mp.game.ped.getNumHeadOverlayValues(i));
});

function getWaypointPos() {
    let waypointBlip = mp.game.invoke("0x1BEDE233E6CD2A1F", 8);
    if (waypointBlip > 0) {
        var wayPointPos = mp.game.ui.getBlipInfoIdCoord(waypointBlip);
        return wayPointPos
    } else {
        return new mp.Vector3()
    }
}


let customBrowser = undefined;
let parameters = [];
mp.events.add('createBrowser', (arguments) => {
    if (customBrowser === undefined) {
        parameters = arguments.slice(1, arguments.length);
        customBrowser = mp.browsers.new(arguments[0])
    }
});
mp.events.add('browserDomReady', (browser) => {
    if (customBrowser === browser) {
        mp.gui.cursor.visible = !0;
        if (parameters.length > 0) {
            mp.events.call('executeFunction', parameters)
        }
    }
});
mp.events.add('executeFunction', (arguments) => {
    let input = '';
    for (let i = 1; i < arguments.length; i++) {
        if (input.length > 0) {
            input += ', \'' + arguments[i] + '\''
        } else {
            input = '\'' + arguments[i] + '\''
        }
    }
    customBrowser.execute(`${arguments[0]}(${input});`)
});
mp.events.add('destroyBrowser', () => {
    mp.gui.cursor.visible = !1;
    if (customBrowser != undefined) {
        customBrowser.destroy();
        customBrowser = undefined
    }
});
let policeMainDoors = undefined;
let policeBackDoors = undefined;
let policeCellDoors = undefined;
let motorsportMain = undefined;
let motorsportParking = undefined;
let supermarketDoors = undefined;
let clubhouseDoor = undefined;
let oficina_portao = undefined;
let oficina_porta = undefined;
mp.events.add('guiReady', () => {
    policeMainDoors = mp.colshapes.newSphere(468.535, -1014.098, 26.386, 5.0);
    policeBackDoors = mp.colshapes.newSphere(435.131, -981.9197, 30.689, 5.0);
    policeCellDoors = mp.colshapes.newSphere(461.7501, -998.361, 24.915, 5.0);
    motorsportMain = mp.colshapes.newSphere(-59.893, -1092.952, 26.8836, 5.0);
    motorsportParking = mp.colshapes.newSphere(-39.134, -1108.22, 26.72, 5.0);
    supermarketDoors = mp.colshapes.newSphere(-711.545, -915.54, 19.216, 5.0);
    clubhouseDoor = mp.colshapes.newSphere(981.7533, -102.7987, 74.8487, 5.0);
    oficina_portao = mp.colshapes.newSphere(484.5166, -1315.502, 29.20002, 10.0);
    oficina_porta = mp.colshapes.newSphere(482.911, -1312.584, 29.20103, 10.0)
});
mp.events.add('playerEnterColshape', (shape) => {
    switch (shape) {
        case policeMainDoors:
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_ph_door002'), 434.7479, -983.2151, 30.83926, !1, 0, !1);
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_ph_door01'), 434.7479, -980.6184, 30.83926, !1, 0, !1);
            break;
        case policeBackDoors:
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_rc_door2'), 469.9679, -1014.452, 26.53623, !1, 0, !1);
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_rc_door2'), 467.3716, -1014.452, 26.53623, !1, 0, !1);
            break;
        case policeCellDoors:
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_ph_cellgate'), 461.8065, -994.4086, 25.06443, !1, 0, !1);
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_ph_cellgate'), 461.8065, -997.6583, 25.06443, !1, 0, !1);
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_ph_cellgate'), 461.8065, -1001.302, 25.06443, !1, 0, !1);
            break;
        case motorsportMain:
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_csr_door_l'), -59.89302, -1092.952, 26.88362, !1, 0, !1);
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_csr_door_r'), -60.54582, -1094.749, 26.88872, !1, 0, !1);
            break;
        case supermarketDoors:
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_gasdoor'), -711.5449, -915.5397, 19.21559, !1, 0, !1);
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_gasdoor_r'), -711.5449, -915.5397, 19.2156, !1, 0, !1);
            break;
        case oficina_portao:
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('prop_com_gar_door_01'), 484.5166, -1315.502, 29.20002, !1, 0, !1);
            break;
        case oficina_porta:
            mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat('v_ilev_cs_door'), 482.911, -1312.584, 29.20103, !1, 0, !1);
            break
    }
});
mp.events.add('doorLock', (model, position, locked, handling) => {
    let modelNumber = Number(model);
    mp.game.object.setStateOfClosestDoorOfType(modelNumber, position.x, position.y, position.z, locked, 0, !1)
});
mp.events.add('explode', (position, explosionType, damageScale, isAudible, isInvisible, cameraShake) => {
    mp.game.fire.addExplosion(position.x, position.y, position.z, explosionType, damageScale, isAudible, isInvisible, cameraShake)
});
var loginCamera = camerasManager.createCamera('loginCamera', 'default', new mp.Vector3(1170.918, 101.9839, 143.5895), new mp.Vector3(-14, 0, 32), 50);
mp.events.add('accountLoginForm', () => {
    //mp.events.call('createBrowser', ['']);
    if (uiGlobal_Browsers === undefined) {
        uiGlobal_Browsers = mp.browsers.new("package://cef/LRandC/index.html")
    }

    if (uiGlobal_Browsers != undefined) {
        uiGlobal_Browsers.execute("app.OpenLogin()");
    }
    mp.game.graphics.startScreenEffect('SwitchSceneMichael', 5000, !1);
    mp.gui.chat.activate(!1);
    mp.gui.chat.safeMode = !1;
    mp.gui.chat.colors = !0;
    mp.gui.cursor.visible = !0;
    camerasManager.setActiveCamera(loginCamera, !0);
    camerasManager.setActiveCameraWithInterp(loginCamera, new mp.Vector3(724.5635, 1442.047, 479.6472), new mp.Vector3(-14, 0, 32), 30000, 0, 0);
    //mp.game.ui.displayRadar(!1);
    mp.game.gameplay.enableMpDlcMaps(!0);
    mp.game.player.disableVehicleRewards()
});
mp.events.add('loginUser', (login_name, login_password, isCheck) => {
    setTimeout(function () {
        mp.events.callRemote('loginUser', login_name, login_password)
    }, 100)
});
mp.events.add('registerUser', (register_username, register_password, register_email, refferal_code) => {
    setTimeout(function () {
        mp.events.callRemote('registerUser', register_username, register_password, register_email, refferal_code)
    }, 100)
});
mp.events.add('clearLoginWindow', () => {
    mp.players.local.freezePosition(!1);
    //mp.events.call('destroyBrowser');
    mp.game.graphics.stopScreenEffect('SwitchSceneMichael')
});
mp.events.add('displayLoginButton', () => {
    if (customBrowser != undefined) {
        customBrowser.execute("displayLoginButton();")
    }
});
mp.events.add('displayRegisterButton', () => {
    if (customBrowser != undefined) {
        customBrowser.execute("displayRegisterButton();")
    }
});
let spyCamera = mp.cameras.new('default', new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(0.0, 0.0, 0.0), 0);
findPlayerByIdOrNickname = function (playerName) {
    let foundPlayer = null;
    if (playerName == parseInt(playerName)) {
        foundPlayer = mp.players.at(playerName)
    }
    if (!foundPlayer) {
        mp.players.forEach((_player) => {
            if (_player.name === playerName) {
                foundPlayer = _player
            }
        })
    }
    return foundPlayer
}
mp.events.add({
    'adminSpyPlayer': (target, admin, targetposition) => {
        admin.position = targetposition;
        admin.setCanBeTargetted(false);
        admin.setProofs(true, true, true, true, true, true, true, true);
        setTimeout(function () {
            admin.attachTo(target.handle, -1, -1.5, -1.5, 2, 0, 0, 0, true, false, false, false, 0, false);
            admin.setCollision(false, false);
        }, 1000);

    },
    'adminStopSpy': () => {
        if (mp.players.local.hasVariable("flymode") && mp.players.local.getVariable("flymode") == true) {
            mp.players.local.detach(true, true);
            return;
        }
        mp.players.local.detach(true, true);
        mp.players.local.setCollision(true, true);
        mp.players.local.setCanBeTargetted(true);
        mp.players.local.setProofs(false, false, false, false, false, false, false, false);

        mp.players.local.position = mp.players.local.getVariable("BeforeSpecPosition");
        mp.events.callRemote("StopSpec");

    },
    'ataseazaobiect': (object) => {
        mp.attachmentMngr.addLocal(object);
    },
    'scoateobiect': (object) => {
        mp.attachmentMngr.removeLocal(object);
    },
    'playscenariobeach': (scenario) => {
        mp.players.local.taskStartScenarioInPlace(scenario, 0, false);
        mp.players.local.taskStartScenarioInPlace(scenario, 0, true);
    }
});



mp.events.add("PlaySoundFrontend", (audioName, audioLibrary) => {
    mp.game.audio.playSoundFrontend(-1, audioName, audioLibrary, !0)
});

function ringtone(clientID, stop = !1) {
    if (ringTone != null) clearInterval(ringTone);
    if (stop) return !1;
    ringToneCounter = 0;
    ringTone = setInterval(function () {
        ringToneCounter++;
        if (ringToneCounter > 30) ringToneCounter = 0
    }, 78)
}
mp.events.add({
    "playSoundFor": (player, sound, dict) => {
        let target = mp.players.atRemoteId(player);
        if (target) {
            mp.game.audio.playSoundFromEntity(-1, sound, target.handle, dict, !0, 0)
        }
    },
    "playSoundFrom": (position, sound, dict) => {
        mp.game.audio.playSoundFromCoord(-1, sound, position.x, position.y, position.z, dict, !1, 0, !1)
    },
    "playSpeechSoundFor": (playerID, speechName, speechVoice) => {
        let player = mp.players.atRemoteId(playerID);
        if (player) mp.game.playSpeech(player, speechName, speechVoice)
    },
    "playRingtone": (playerID) => {
        let target = mp.players.atRemoteId(playerID);
        if (target) {
            mp.game.audio.playPedRingtone('Remote_Ring', target.handle, !0)
        }
    },
    "playClientSound": (soundName, volume) => {
        if (uiPlayer_Browsers != undefined) {
            volume = Math.round(volume * 10) / 10;
            uiPlayer_Browsers.execute(`playAudio('${soundName}', '${volume}');`)
        }
    },

    "removeSound": () => {
        mp.game.audio.playSoundFromEntity(-1, "ERROR", mp.players.local.handle, "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET", !0, 0)
    },
    "typeWords": () => {
        mp.game.audio.playSoundFromEntity(-1, "EDIT", mp.players.local.handle, "HUD_DEATHMATCH_SOUNDSET", !0, 0)
    },
    "processFail": () => {
        mp.game.audio.playSoundFromEntity(-1, "Pin_Bad", mp.players.local.handle, "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS", !0, 0)
    },
    "processSuccess": () => {
        mp.game.audio.playSoundFromEntity(-1, "Pin_Good", mp.players.local.handle, "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS", !0, 0)
    },

});
let pointing = {
    active: !1,
    interval: null,
    lastSent: 0,
    start: async function () {
        if (!this.active && !cuffMe && mp.players.local.getVariable("Injured") === 0) {
            for (this.active = !0, mp.game.streaming.requestAnimDict("anim@mp_point"); !mp.game.streaming.hasAnimDictLoaded("anim@mp_point");) await mp.game.waitAsync(100);
            mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 0, 1, 1, 1), mp.players.local.setConfigFlag(36, !0), mp.players.local.taskMoveNetwork("task_mp_pointing", .5, !1, "anim@mp_point", 24), mp.game.streaming.removeAnimDict("anim@mp_point"), this.interval = setInterval(this.process.bind(this), 0)
        }
    },
    stop: function () {
        this.active && (clearInterval(this.interval), this.interval = null, this.active = !1, mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop"), !mp.game.invoke("0x84A2DD9AC37C35C1", mp.players.local.handle) && mp.game.invoke("0x176CECF6F920D707", mp.players.local.handle), !mp.players.local.isInAnyVehicle(!0) && mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 1, 1, 1, 1), mp.players.local.setConfigFlag(36, !1))
    },
    gameplayCam: mp.cameras.new("gameplay"),
    lastSync: 0,
    getRelativePitch: function () {
        let a = this.gameplayCam.getRot(2);
        return a.x - mp.players.local.getPitch()
    },
    process: function () {
        if (this.active) {
            mp.game.invoke("0x921ce12c489c4c41", mp.players.local.handle);
            let a = this.getRelativePitch(); - 70 > a ? a = -70 : 42 < a && (a = 42), a = (a + 70) / 112;
            let b = mp.game.cam.getGameplayCamRelativeHeading(),
                c = mp.game.system.cos(b),
                d = mp.game.system.sin(b); - 180 > b ? b = -180 : 180 < b && (b = 180), b = (b + 180) / 360;
            let e = mp.players.local.getOffsetFromGivenWorldCoords(-.2 * c - d * (.4 * b + .3), -.2 * d + c * (.4 * b + .3), .6),
                f = "undefined" != typeof mp.raycasting.testPointToPoint([e.x, e.y, e.z - .2], [e.x, e.y, e.z + .2], mp.players.local.handle, 7);
            mp.game.invoke("0xd5bb4025ae449a4e", mp.players.local.handle, "Pitch", a), mp.game.invoke("0xd5bb4025ae449a4e", mp.players.local.handle, "Heading", -1 * b + 1), mp.game.invoke("0xb0a6cfd2c69c1088", mp.players.local.handle, "isBlocked", f), mp.game.invoke("0xb0a6cfd2c69c1088", mp.players.local.handle, "isFirstPerson", 4 == mp.game.invoke("0xee778f8c7e1142e2", mp.game.invoke("0x19cafa3c87f7c2ff"))), 100 < Date.now() - this.lastSent && (this.lastSent = Date.now(), mp.events.callRemoteUnreliable("fpsync.update", a, b))
        }
    }
};


mp.events.add("fpsync.update", async (a, b, c) => {
    let d = getPlayerByRemoteId(parseInt(a));
    if (null != d && 0 !== d.handle && d != mp.players.local) {
        if (d.lastReceivedPointing = Date.now(), !d.pointingInterval) {
            for (d.pointingInterval = setInterval(function () {
                if (1e3 < Date.now() - d.lastReceivedPointing) {
                    if (clearInterval(d.pointingInterval), d.lastReceivedPointing = void 0, d.pointingInterval = void 0, !mp.players.exists(d) || 0 === d.handle) return;
                    mp.game.invoke("0xd01015c7316ae176", d.handle, "Stop"), d.isInAnyVehicle(!0) || mp.game.invoke("0x0725a4ccfded9a70", d.handle, 1, 1, 1, 1), d.setConfigFlag(36, !1), mp.game.invoke("0x84A2DD9AC37C35C1", d.handle) || mp.game.invoke("0x176CECF6F920D707", d.handle)
                }
            }.bind(d), 500), mp.game.streaming.requestAnimDict("anim@mp_point"); !mp.game.streaming.hasAnimDictLoaded("anim@mp_point");) await mp.game.waitAsync(100);
            mp.game.invoke("0x0725a4ccfded9a70", d.handle, 0, 1, 1, 1), d.setConfigFlag(36, !0), d.taskMoveNetwork("task_mp_pointing", .5, !1, "anim@mp_point", 24), mp.game.streaming.removeAnimDict("anim@mp_point")
        }
        mp.game.invoke("0xd5bb4025ae449a4e", d.handle, "Pitch", b), mp.game.invoke("0xd5bb4025ae449a4e", d.handle, "Heading", -1 * c + 1), mp.game.invoke("0xb0a6cfd2c69c1088", d.handle, "isBlocked", 0), mp.game.invoke("0xb0a6cfd2c69c1088", d.handle, "isFirstPerson", 0)
    }
});
// keypress b
mp.keys.bind(0x42, !0, () => {
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (!mp.gui.cursor.visible) {
        if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined) return;
        pointing.start()
    }
});
mp.keys.bind(0x42, !1, () => {
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    pointing.stop()
});

function getPlayerByRemoteId(remoteId) {
    let pla = mp.players.atRemoteId(remoteId);
    if (pla == undefined || pla == null) {
        return null
    }
    return pla
}

mp.events.add('moveSkyCamera', startSkyCamera);

function startSkyCamera() {
    while (mp.game.invoke("0xD9D2CFFF49FAB35F") == false) {
        mp.game.invoke("0xAAB3200ED59016BC", mp.players.local.handle, 0, 1);
    }
    mp.game.invoke("0xF36199225D6D8C86", 0.01)

    let cameraWaitS = setInterval(() => {
        if (mp.game.invoke("0x470555300D10B2A5") > 4) {
            finishCamera()
            clearInterval(cameraWaitS)
        }
    }, 10)



};

function finishCamera() {
    setTimeout(() => {
        mp.game.invoke("0xD8295AF639FD9CB8", mp.players.local.handle);

    }, 5000);
    let cameraWaitF = setInterval(() => {
        if (mp.game.invoke("0x470555300D10B2A5") === 12) {
            mp.events.callRemote("InitHud");
            clearInterval(cameraWaitF)
        }
    }, 10)

}



mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'player') {
        if (entity.hasVariable('animData') && entity.getVariable('animData') !== null) {
            const anim = entity.getVariable('animData');
            const animdata = anim.split("%");
            setTimeout(() => {
                if (entity.handle && entity.handle > 0) {
                    loadAnimDict(animdata[0], function () {
                        entity.taskPlayAnim(animdata[0], animdata[1], 1, 0, -1, parseInt(animdata[2]), 1, !1, !1, !1)
                    }
                    )
                }

            }, 1000)
        }
        else if (entity.getVariable('adminspyon') === true) {
            setTimeout(() => {
                if (entity.handle && entity.handle > 0) {
                    entity.setCollision(false, false);
                    entity.setCanBeTargetted(false);
                    entity.setProofs(true, true, true, true, true, true, true, true);
                }
            }, 1000)
        }
    }
});





mp.events.add('testerforanim', (entity) => {
    player = mp.players.local;
    player.setNoCollision(entity.handle, false);
    let playerlocation = entity.getForwardVector();
    let playerCoords = entity.position;
    mp.console.logInfo(`${playerlocation.z}`)
    mp.console.logInfo(`${playerCoords.z}`)
    let newPos = new mp.Vector3(playerlocation.x + playerCoords.x * 1.00, playerlocation.y + playerCoords.y * 1.00, mp.players.local.position.z);
    mp.console.logInfo(`${newPos.x}`)
    mp.events.callRemote('updateMPostion', newPos)
});

mp.events.add('testerforobj', (ids) => {
    id = mp.game.joaat(ids)
    fishingRod = mp.attachmentMngr.getObject(id)
    objpos = mp.game.invokeVector3("0x3FEF770D40960D5A", fishingRod, false);
    mp.events.callRemote('createobj', objpos);
});

mp.events.add('testerforanim1', (entity) => {
    player = mp.players.local;
    player.setNoCollision(entity.handle, false);
});


mp.events.addDataHandler('animData', (entity, value, oldValue) => {
    if (entity.type === 'player') {
        if (entity.handle !== 0) {
            if (value !== null) {
                const anim = entity.getVariable('animData');
                const animdata = anim.split("%");
                loadAnimDict(animdata[0], function () {
                    entity.taskPlayAnim(animdata[0], animdata[1], 1, 0, -1, parseInt(animdata[2]), 1, false, false, false);
                    entity.setDynamic(true);
                })
            }

            else {
                if (oldValue) {
                    if (entity.handle !== 0) {

                        const animdata = oldValue.split("%");
                        entity.stopAnimTask(animdata[0], animdata[1], parseInt(animdata[2]))
                    }
                }
            }
        }
    }
});

function loadAnimDict(a, b) {
    if (mp.game.streaming.hasAnimDictLoaded(a)) return void b();
    mp.game.streaming.requestAnimDict(a);
    let c = setInterval(function () {
        if (mp.game.streaming.hasAnimDictLoaded(a)) {
            b();
            clearInterval(c);
        }
    }, 100)
}

mp.events.addDataHandler('adminspyon', (entity, value, oldValue) => {
    if (entity.type === 'player') {
        if (entity.handle && entity.handle > 0) {
            if (entity != mp.players.local) {
                if (entity.getVariable('adminspyon') === true) {
                    setTimeout(() => {
                        if (entity.handle && entity.handle > 0) {
                            entity.setCollision(false, false);
                            entity.setCanBeTargetted(false);
                            entity.setProofs(true, true, true, true, true, true, true, true);
                        }
                    }, 1000)
                }
                else if (entity.getVariable('adminspyon') === false) {
                    entity.detach(true, true);
                    entity.setCollision(true, true);
                    if (!entity.hasVariable("flymode") || (entity.hasVariable("flymode") && entity.getVariable("flymode") == false)) {

                        entity.setCanBeTargetted(true);
                        entity.setProofs(false, false, false, false, false, false, false, false);
                    }

                }
            }
        }
    }
});

mp.events.add('InitAnimationAndAttachmentsOnJoin', () => {

    setTimeout(() => {
        InitAnimationOnJoin();


    }, 3000)

});

function InitAnimationOnJoin() {
    mp.players.forEach(_player => {
        let anim = _player.getVariable("animData");
        if (_player != mp.players.local) {
            if (anim && anim.length > 0) {
                const animdata = anim.split("%");
                if (!mp.game.streaming.hasAnimDictLoaded(animdata[0])) {
                    mp.game.streaming.requestAnimDict(animdata[0])
                }
                _player.clearTasksImmediately();
                _player.taskPlayAnim(animdata[0], animdata[1], 8.0, 1.0, -1, parseInt(animdata[2]), 1, !1, !1, !1);
            }
        }
    });
};

mp.events.add("GetGroundZForItem", (position) => {
    const groundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0, false);
    mp.events.callRemote("UpdateDropItemPosition", groundZ)
});

mp.events.add("consoleLog", (text) => {
    mp.console.logInfo(`Log: ${text}`);
});
mp.events.add("testshit", () => {
    localPlayer.stopAnimTask("oddjobs@assassinate@guard", "unarmed_earpiece_a", 48)
});
mp.events.add("testshitagain", (target) => {
    target.stopAnimTask("oddjobs@assassinate@guard", "unarmed_earpiece_a", 48)
});






function calcDist(v1, v2) {
    return mp.game.system.vdist(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z)
}
mp.game.controls.useDefaultVehicleEntering = !0;
mp.keys.bind(0x47, !1, () => {
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    if (chatopened) return;
    if (freezeMe) return;
    if (mp.players.local.isInAnyVehicle(false)) return;
    mp.events.callRemote('keypress:G')
})
mp.events.add("PlayerEnterPassengerSit", (veh) => {
    let playerPos = mp.players.local.position;
    let seat = -1;
    let vehicle = veh;
    let checkdistance = 6
    if (vehicle !== null) {
        if (vehicle.getNumberOfPassengers() == vehicle.getMaxNumberOfPassengers()) {
            return;
        }
        if (vehicle.getMaxNumberOfPassengers() == 1) {
            seat = 0;
            if (vehicle.isSeatFree(seat)) {
                seat = 0;

            }
        }

        else if (vehicle.getMaxNumberOfPassengers() == 3) {

            seat = 0;
            let distance = calcDist(playerPos, vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName('seat_pside_f')));

            if (vehicle.isSeatFree(1) && distance > calcDist(playerPos, vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName('seat_dside_r')))) {
                distance = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName('seat_dside_r'));
                seat = 1;
            }
            if (vehicle.isSeatFree(2) && distance > calcDist(playerPos, vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName('seat_pside_r')))) {
                seat = 2;
            }

        }
        else if (vehicle.getMaxNumberOfPassengers() > 3) {
            for (i = 0; i < (vehicle.getMaxNumberOfPassengers() + 1); i++) {
                if (vehicle.isSeatFree(i)) {
                    seat = i;
                    checkdistance = 8
                    break;
                }
            }
        }
        mp.players.local.taskEnterVehicle(vehicle.handle, 3000, seat, 2.0, 1, 0)

        let interval = setInterval(() => {
            if (calcDist(playerPos, vehicle.position) > checkdistance || vehicle.isSeatFree(2000)) {
                mp.players.local.clearTasksImmediately();
                clearInterval(interval);
            }
            if (mp.players.local.isInVehicle(vehicle.handle, false)) {
                clearInterval(interval);
            }
        }, 500)

    }
});

mp.events.add("playerTaskEnterAmbulance", (vehicle) => {
    if (vehicle.isSeatFree(1)) {
        mp.players.local.taskEnterVehicle(vehicle.handle, 3000, 1, 1.0, 0, 0)
    }
    else if (vehicle.isSeatFree(2)) {
        mp.players.local.taskEnterVehicle(vehicle.handle, 3000, 2, 1.0, 1, 0)
    }
    else return;
});




let recoilRL = 0.5


var recoils = {
    '-1076751822': '0.0',
    '453432689': '0.0',
    '1593441988': '0.0',
    '-1716589765': '0.0',
    '324215364': '0.2',
    '736523883': '0.1',
    '171789620': '0.1',
    '-1074790547': '0.3',
    '-2084633992': '0.2',
    '-1063057011': '0.2',
    '487013001': '0.4',
}


global.casinoKeys = undefined;

mp.events.add('casinoKeys', (act, ...data) => {
    switch (act) {
        case 'setChips':
            global.casinoKeys.execute(`casinoKeys.setChips('${data[0]}', '${data[1]}')`);
            break;
        case 'setBet':
            global.casinoKeys.execute(`casinoKeys.setBet('${data[0]}', '${data[1]}')`);
            break;
        case 'setTime':
            global.casinoKeys.execute(`casinoKeys.setTime('${data[0]}', '${data[1]}')`);
            break;
        case 'toggleStart':
            global.casinoKeys.execute(`casinoKeys.toggleStart(${data[0]})`);
            break;
        case 'show':
            global.casinoKeys = mp.browsers.new('package://cef/UI/CasinoKeys/index.html');
            global.casinoKeys.execute(`casinoKeys.show()`);
            break;
        case 'hide':
            global.casinoKeys.destroy();
            global.casinoKeys = undefined;
            global.casinoKeys.execute(`casinoKeys.hide()`);
            break;
    }
});

}