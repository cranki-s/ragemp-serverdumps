{
mp.game.gxt.set("PM_PAUSE_HDR", "GTA.World");

var resolution = mp.game.graphics.getScreenResolution(0, 0);
var auto_walk = false;
var rob_timer = false;
var posX = 1920 * 0.75;
var posY = 1080 * 0.3;
var permanentObjectsList = [];
var permanentObjectsJSON = [];
var furnitureList = [];
var garbageList = [];
// CANINE
var canineList = [];
var canineGroup = null; // Relationship group Hash/Int

// ALPR / PD
var alprPos = new Array; // Stores the front left & right position of the vehicle in relation to its size. (Length/Width)
var alprStatus = false;
var ALPRWindow = null;
var alpr_modelName = null;
var alpr_plateName = null;
var alpr_ownerName = null;
var alpr_modelStatus = null;
var alpr_ownerStatus = null;
var alpr_insuranceStatus = null;
var alpr_hit = false;
var last_canine_id = 0; //to change to give in callback
var last_canine_player = null;

var alpr_hitEntity = null;
var Pi = 3.1415926535897931;
const sirenBlockedVehicleClasses = [8, 13, 14, 15, 16, 18, 19, 21];

var last_alpr_modelName = null;
var last_alpr_plateName = null;
var last_alpr_ownerName = null;

// SPECTATING
var spectateTarget = null;
var spectating = false;

const localPlayerEntity = mp.players.local;
var isLocalPlayerInvincible = false;
var canSendUpdateRequest = true;
const updateRequestRate = 100;

// VARIABLES for HOTWIRE & LOCKPICKING
var isHotwiring = false;
var isLockpicking = false;
var timeLeft = 0.0;
var successInPercent = 0.0;
// RESOLUTION
var resX = resolution.x;
var resY = resolution.y;
var updateTimeoutInMillisecondsForHotwire = 1000;

/* Progress bar vars */
var progressBrowser = null;
var type;
var duration;
var canBeInterrupted;
var logged = 0;
var print_hud = true;
var print_hud_ex = true;
/* CEF Handler */
var browser = null;
let cef = null;

/* Hotkeys */
var cef_opened = false;

/* NativeUI */
const NativeUI = require("gtalife/nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;

/* Mining */
var miningBrowser = null;

/* Login */
var loginWidth = 550;
var loginHeight = 425;
var charSelectMenu = null;

var email = "";
var password = "";
var logged = 0;

mp.players.local.setHelmet(false);
/* CEF */
function prepareToCef(blurred = null) {
    mp.gui.cursor.visible = true;
    mp.game.ui.displayRadar(false);
    mp.gui.chat.show(false);
    if (blurred) {
        mp.game.graphics.transitionToBlurred(blurred);
    }
}
exports.prepareToCef = prepareToCef;

function openCef(url) {
    if (cef) {
        cef.destroy();
        cef = null;
    }
    cef = mp.browsers.new(url);
}
exports.openCef = openCef;

function injectCef(execute) {
    if (!cef) {
        return console.log(`injectCef = ${cef}`);
    }
    cef.execute(execute);
}
exports.injectCef = injectCef;

var TABBED_OUT_TIME = 0
var TABBED = mp.system.isFocused

mp.events.add(
    {
        "set_hud_state": (state) => {
            mp.game.ui.displayHud(state);
        },
        "cInjectCef": (execute) => {
            console.log(execute);
            injectCef(execute);
        },

        "cCloseCef": () => {
            closeCef();
        },

        "onSubmit": (user, pass) => {
            onSubmit(user, pass);
        },

        "onSubmitPin": (pin) => {
            onSubmitPin(pin);
        },
        "onClickRegister": () => {
            onClickRegister();
        },
        "onSubmitRegister": (user, email, pass, pass2) => {
            onSubmitRegister(user, email, pass, pass2);
        },
        "onBackClickRegister": () => {
            onBackClickRegister();
        },
        "onBackToGameClick": () => {
            onBackToGameClick();
        },
        "closeCharacterCreator": () => {
            closeCharacterCreator();
        },
        "onSubmitCharacter": (firstname, lastname, jailChar) => {
            onSubmitCharacter(firstname, lastname, jailChar);
        },
        "onSubmitCreateFaction": (faction_name, faction_short_name) => {
            onSubmitCreateFaction(faction_name, faction_short_name);
        },
        "onSubmitInviteFaction": (string) => {
            onSubmitInviteFaction(string);
        },
        "onSubmitGeneric": (string) => {
            onSubmitGeneric(string);
        },
        "onSubmitPlate": (plate) => {
            onSubmitPlate(plate);
        },
        "onSubmitGiveMoney": (playername, money) => {
            onSubmitGiveMoney(playername, money);
        },
    });

var onSubmit = function (user, password) {
    if (cef != null) {
        cef.destroy();
        cef = null;
        browser = null;
    }

    email = user;

    mp.events.callRemote('account_prompt_send', user, password);
    mp.gui.chat.activate(false);
    mp.events.call('destroyBrowser');
};

var onSubmitPin = function (pin) {

    if (cef != null) {
        cef.destroy();
        cef = null;
        browser = null;
    }

    mp.events.callRemote('TwoFactor::SubmitPin', pin);
    mp.gui.chat.activate(false);
    mp.events.call('destroyBrowser');
};

var onSubmitRegister = function (user, email, pass, pass2) {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.events.callRemote('account_prompt_send_register', user, email, pass, pass2);
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(false);
};

var onClickRegister = function () {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.events.callRemote('init_account_prompt_register');
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(false);
};

var onBackClickRegister = function () {
    mp.events.call('createBrowser', ['package://gtalife/login/login.html']);
};

var onBackToGameClick = function () {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(true);
};

var closeCharacterCreator = function () {
    if (cef != null) {
        cef.destroy();
        browser = null;
    }
    mp.events.call('destroyBrowser');
    //mp.gui.chat.activate(true);
    mp.events.callRemote('account_prompt_back_to_char_list');
};

var onSubmitCharacter = function (firstname, lastname, jailChar) {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.events.callRemote('account_prompt_send_creation_character', firstname, lastname, jailChar);
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(false);
};



var onSubmitInviteFaction = function (string) {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.gui.chat.push("Invitation was successfully sent!");
    mp.events.callRemote('invite_faction_done', string);
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(true);
};

var onSubmitGeneric = function (string) {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.events.callRemote('check_info_submit', string);
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(false);
};

var onSubmitCreateFaction = function (faction_name, faction_short_name) {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.gui.chat.push("You have successfully created a faction!");
    mp.events.callRemote('create_faction_done', faction_name, faction_short_name);
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(true);
};

var onSubmitGiveMoney = function (playername, money) {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.gui.chat.push("The request to transfer funds was approved!");
    mp.events.callRemote('dialog_give_money', playername, money);
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(false);
};

var onSubmitPlate = function (plate) {
    if (cef != null) {
        cef.destroy();

        browser = null;
    }
    mp.events.callRemote('check_plate_submit', plate);
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(true);
};

/* Ragdoll */
var is_ragdoll = false;
var can_ragdoll = true;
var cancel = true;
var disabled = false;
var timer = mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1);

/* Garbage */

var markers = {};
var blips = {};
var propertyBlips = {};
class JobHelper {
    static createMarker(name, position, radius) {
        if (markers[name] != null) { return; }
        var marker = mp.markers.new(28, position, radius,
            {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [255, 0, 0, 100],
                visible: true,
                dimension: 0
            });
        markers[name] = marker;
        return marker;
    }
    static createMarkerEx(name, type, position, dimension, radius) {
        if (markers[name] != null) { return; }
        var marker = mp.markers.new(type, position, radius,
            {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [255, 0, 0, 100],
                visible: true,
                dimension: dimension
            });
        markers[name] = marker;
        return marker;
    }
    static removeMarker(name) {
        if (markers.length == 0 || markers[name] == null) { return; }
        markers[name].destroy(); // Needs testing, should replace deleteEntity
        markers[name] = null;
    }
    static createBlip(name, position, color) {
        if (blips[name] != null) { return blips[name]; }
        let blip = mp.blips.new(1, position,
            {
                name: name,
                color: color,
                shortRange: false,
            });
        blips[name] = blip;
        return blip;
    }
    static removeBlip(name) {
        if (blips.length == 0 || blips[name] === null || blips[name] === undefined) { return; }
        blips[name].destroy();
        blips[name] = null;
    }
}

class BlipHelper {
    static createBlip(name, position, color) {
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null;
        }

        var blip = mp.blips.new(1, position,
            {
                name: name,
                color: color,

                shortRange: false,
            });
        blips[name] = blip;
        return blip;
    }

    static createBlipExt(name, position, color, size) {
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null;
        }
        var blip = mp.blips.new(1, position,
            {
                name: name,
                color: color,
                scale: size,
                shortRange: false,
            });
        blips[name] = blip;
        return blip;
    }

    static removeBlip(name) {
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null;
        }
        //mp.game.ui.removeBlip(blips[name]);
        //blips[name] = null;
    }

    static moveBlip(name, position) {
        if (blips[name] == null) { return; }
        blips[name].setCoords(position);
    }

    static colorBlip(name, color) {
        if (blips[name] == null) {
            return;
        }
        blips[name].setColour(color);
    }

    static SetRoute(name, enabled) {
        if (blips[name] == null) {
            return;
        }
        blips[name].setRoute(enabled);
    }
}
var radar_Markers = {};
var jobmarker = null;
var enableDisplay = false;
var maximumGarbage = 0;
var currentGarbage = 0;
var isGarbageTrucking = false;
var res_X = resolution.x;
var res_Y = resolution.y;
var isGarbageJob = false;
var jobDebouce = false;
var garbagePickedUp = "Garbage Load";
var enableGarbageNerf = false;

/* VehicleSpecialActions */

var blockedClasses = [13, 14, 15, 16, 21]; // https://wiki.gt-mp.net/index.php?title=Vehicle_Classes

function isVehicleClassBlocked(vehicle) {
    return (blockedClasses.indexOf(mp.game.vehicle.getVehicleClassFromName(vehicle.getModel())) > -1);
}


/* Lockpicking */
const lockOuterPath = "package://gtalife/PicklockMinigame/keyhole1outer.png";
const lockInnerPath = "package://gtalife/PicklockMinigame/keyhole1inner.png";
const bobbyPinPath = "package://gtalife/PicklockMinigame/bobbypin.png";

const position = new Point(posX, posY);
const size = new Point(337, 337); // TODO was new Size

const bobbyPinSize = new Point(16, 528); //Same
const bobbyPinPosition = new Point(position.x + Math.floor(size.x / 2), position.y - (Math.floor(bobbyPinSize.y / 2) - Math.floor(size.x / 2)));

let lockRotation = 0;
let lockTurnSpeed = 1;
const lockMinDegrees = 0;
const lockMaxDegrees = 80;

let isMoveable = true;
let pinDegrees = 0;
let pinTurnSpeed = 1.25;
const pinMinDegrees = -90;
const pinMaxDegrees = 90;

let isPicking = false;
const defaultSolutionRange = 10;
let currentSolutionRange;
let solutionDegrees;
let difficultyMultiplier;

const defaultHalfPickedRangeOffset = 10;
let currentHalfPickedRangeOffset;

let lockpickBrokenPercent = 0;
const lockpickBrokenIncreaseRate = 3;

let showHelp = false;
const helpX = resolution.x / 2 + 50;
const helpScale = 0.3;

/* Speedometer */
//// Anything with resolution. seems to be breaking.
//var mapMarginLeft = resolution.x / 64;
//var mapMarginBottom = resolution.y / 60;
//var mapWidth = resolution.x / 7.11;
//var mapHeight = resolution.y / 5.71;
//var resX = mapMarginLeft + mapWidth + mapMarginLeft;

/* AnimHandler */
var ragdoll_debounce = true;
var falling_debounce = true;
var climb_debounce = true;
var dive_debounce = true;
var index_checker = false;
var indexed_seat = -3;
var enable_autowalker = false;


function calculateDist(vec1, vec2) {
    return Math.sqrt((vec1.X - vec2.X) * (vec1.X - vec2.X) + (vec1.Y - vec2.Y) * (vec1.Y - vec2.Y) + (vec1.Z - vec2.Z) * (vec1.Z - vec2.Z));
}

/* Walking Style */
var walkingStyle = -1;
var chatStyle = -1;

/* Suicide */

var pistolGroupHash = mp.game.gameplay.getHashKey("GROUP_PISTOL");

var animInProgress = false;
var animName = "";
var animTime = 1.0;
var shotFired = false;
var startTime = 0;

/* Rappel */

/* Rappel */

var rappelVehicles = [-1660661558, 353883353, 837858166]; // maverick, emergency maverick, annihilator
var rappelMinHeight = 15.0;
var rappelMaxHeight = 45.0;
const rappelmaxSpeed = 10.0;
const rappelmaxAngle = 15.0;

mp.events.add('rappel', function () {
    const vehicle = localPlayer.vehicle;
    if (!vehicle) {
        return;
    }

    if (!mp.game.invoke("0x4E417C547182C84D", vehicle.handle)) {
        mp.gui.chat.push("You cannot get off this vehicle.");
        return;
    }

    if (vehicle.getSpeed() > rappelmaxSpeed) {
        mp.gui.chat.push("Vehicle flies too fast to descend.");
        return;
    }

    if (vehicle.getPedInSeat(-1) === localPlayer.handle || vehicle.getPedInSeat(0) === localPlayer.handle) {
        mp.gui.chat.push("You cannot jump from your front seat.");
        return;
    }

    const taskStatus = localPlayer.getScriptTaskStatus(-275944640);
    if (taskStatus === 0 || taskStatus === 1) {
        mp.gui.chat.push("You are already coming down.");
        return;
    }

    const curHeight = vehicle.getHeightAboveGround();
    if (curHeight < rappelMinHeight || curHeight > rappelMaxHeight) {
        mp.gui.chat.push("The vehicle isn't high enough.");
        return;
    }
    if (curHeight > rappelMaxHeight) {
        mp.gui.chat.push("The vehicle is too high. You're at " + curHeight + " instead of " + rappelMaxHeight + " maximum.");
        return;
    }
    if (!vehicle.isUpright(rappelmaxAngle) || vehicle.isUpsidedown()) {
        mp.gui.chat.push("The vehicle must be stabilized for the descent.");
        return;
    }

    localPlayer.clearTasks();
    localPlayer.taskRappelFromHeli(10.0);
});

mp.events.add('exitPoliceElsVeh', function () {
    mp.game.controls.enableControlAction(27, 86, true);
    mp.game.controls.enableControlAction(27, 85, true); // enable Q
    mp.game.audio.setUserRadioControlEnabled(true);
});


/* Voice */
/* Not being used.
var browser2width = 250;
var browser2height = 250;
var browser2 = API.createCefBrowser(browser2width, browser2height, false); // Needs converted still.
*/

/* Blindfold */
var triggerBlindfold = false;

/* Speed Limiter */
var limitMenu = null;
var limitSpeedItem = null;
var limitToggleItem = null;
var opened_custom = true;

var limitMultiplier = 5;

var vehicleMaxSpeed = {};
var vehicleMaxSpeed2 = {};
var vehicleMaxSpeedEnabled = {};
var vehicleMaxSpeedEnabled2 = {};

var blockedModels = []; // people can't speed limit these vehicles (rhino and insurgent for example)
var blockedCategories = [8, 13, 14, 15, 16, 21]; // people can't speed limit vehicles that belong these categories - https://wiki.gt-mp.net/index.php?title=Vehicle_Classes

var IdleCameraDisableStatus = false;

function browserIsLoaded() {
    progressBrowser.call("startAnim", duration);
}

function animationIsFinished() {
    progressBrowser.destroy();
    progressBrowser = null;
    mp.events.callRemote('progressbar_finished', true);
}

/* Speed Limiter */

function IsModelBlocked(model) {
    // model check
    if (blockedModels.indexOf(model) > -1) return true;

    // category check
    if (blockedCategories.indexOf(mp.game.vehicle.getVehicleClassFromName(model)) > -1) return true;

    // wow not blocked
    return false;
}

function SetVehicleMaxSpeed(vehicle, limit) {
    if (vehicle == null || vehicle == undefined)
        return;
    vehicleMaxSpeed[vehicle.getModel()] = limit;
}

function SetVehicleMaxSpeed2(vehicle, limit) {
    if (vehicle == null || vehicle == undefined)
        return;
    vehicleMaxSpeed2[vehicle.getModel()] = limit;
}

function GetVehicleLimiterStatus(vehicle) {
    if (vehicle == null || vehicle == undefined)
        return;
    var model = vehicle.getModel();
    return (vehicleMaxSpeedEnabled[model] === null) ? false : vehicleMaxSpeedEnabled[model];
}

function SetVehicleLimiterStatus(vehicle, status) {
    if (vehicle == null || vehicle == undefined)
        return;
    var model = vehicle.getModel();
    mp.events.call('toggleCruiseEx', true);
    if (status) {
        // SET_ENTITY_MAX_SPEED
        vehicle.setMaxSpeed((vehicleMaxSpeed[model] === null) ? (mp.game.vehicle.getVehicleModelMaxSpeed(model) * 2.23693629) : (vehicleMaxSpeed[model] / 2.23693629));
    } else {
        // SET_ENTITY_MAX_SPEED
        vehicle.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(model) * 2.23693629);
    }

    vehicleMaxSpeedEnabled[model] = status;
}

function SetVehicleLimiterStatus2(vehicle, status) {
    if (vehicle == null || vehicle == undefined)
        return;
    var model = vehicle.getModel();
    if (status) {
        // SET_ENTITY_MAX_SPEED
        vehicle.setMaxSpeed((vehicleMaxSpeed2[model] === null) ? (mp.game.vehicle.getVehicleModelMaxSpeed(model) * 2.23693629) : (vehicleMaxSpeed2[model] / 2.23693629));
    } else {
        // SET_ENTITY_MAX_SPEED
        vehicle.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(model) * 2.23693629);
    }

    vehicleMaxSpeedEnabled2[model] = status;
}

/* Lockpicking */

function incrementLockpickBrokenProgress() {
    lockpickBrokenPercent += lockpickBrokenIncreaseRate;
    lockRotation -= 2;

    if (lockpickBrokenPercent >= 100) { // Lockpick broke.
        //mp.events.callRemote("PicklockResult", 2, API.getZoneNameLabel(API.getEntityPosition(mp.players.local)) + " - " + API.getStreetName(API.getEntityPosition(mp.players.local))); // Needs converted still.
        //mp.events.callRemote('PicklockResult', 2, mp.game.zone.getNameOfZone(mp.players.local.position) + ' - ' + mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position), 0, 0); // Rough conversion of above ^^.
        const position = mp.players.local.position;
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
        let zoneName2 = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
        let streetName2 = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        mp.events.callRemote('PicklockResult', 2, zoneName2, streetName2);
        isPicking = false;
    }
}

function initialize() {
    lockRotation = 0;
    pinDegrees = 0;
    isMoveable = true;
    lockpickBrokenPercent = 0;
    showHelp = false;
}


/* LSC */

function createPurchConfirmMenu() {
    menuConfirmation = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //menuConfirmation = new Menu("Purchase Confirmation", 0, 0, 6);
    //API.setMenuBannerSprite(menuConfirmation, "shopui_title_carmod", "shopui_title_carmod");

    let cancelMenuItem = new UIMenuItem("Cancel", "");
    let confirmationMenuItem = new UIMenuItem("Confirm purchase", "");
    menuConfirmation.AddItem(cancelMenuItem);
    menuConfirmation.AddItem(confirmationMenuItem);

    menuConfirmation.ItemSelect.on(purchaseMenuItemSelected);

    menuConfirmation.CurrentSelection = 0;
    menuConfirmation.Visible = false;

    return menuConfirmation;
}

function openConfrimationMenu() {
    //menuPoolforModding.CloseAllMenus();
    closeMenu();
    menuConfirmation.Visible = true;
}

//We are going to use this function to bind confirmation menu item from part menu to main menu.
function bindConfirmationItmToMain(menuItem) {
    //menuMain.BindMenuToItem(menuConfirmation, menuItem);
}

function purchaseMenuItemSelected(item, index) {
    if (item.Text == "Confirm purchase") {
        mp.events.callRemote('PurchaseModConfirmed', buyModIndex, isStock, isAdminMenu);
        menuConfirmation.Visible = false;
    }
    else if (item.Text == "Cancel") {
        mp.game.graphics.notify("~r~You've cancelled the purchase.");
        closeMenu();
        openMainMenuVehMod();
        //mp.events.callRemote("modMenuClosed");
        //API.showShard("~r~Cancelled", 3000); // Needs converted still.
    }
}

function closePrchOpenMain() {
    //menuPoolforModding.CloseAllMenus();//For some reason dosen't triger server event.
    //mp.events.callRemote("modMenuClosed");
    closeMenu();
    clearAllGlobals();
}

var isStock = true;

function createPlateMenu() {
    let tmpPartMenu = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(tmpPartMenu, "shopui_title_carmod", "shopui_title_carmod");

    let lstOptions = [];
    let menuListItem;
    let displayPrice = getDisplayPrice("Plate");

    lstOptions.push("Stock");

    for (let i = 1; i <= 5; i++) {
        lstOptions.push(i.toString());
    }

    menuListItem = new UIMenuListItem("Plate", displayPrice, new ItemsCollection(lstOptions), 0);
    tmpPartMenu.AddItem(menuListItem);
    tmpPartMenu.ListChange.on(function (item, index) {
        if (index == 0) {
            isStock = true;
        }
        else {
            isStock = false;
        }

        if (index == 5) {
            mp.events.callRemote('ChangeVehicleMod', mapModToIndex["Plate"], 6);
            //mp.events.callRemote('ChangeVehicleMod', mapModToIndex[item.Parent.Subtitle.Caption], 5);
        }
        else {
            mp.events.callRemote('ChangeVehicleMod', mapModToIndex["Plate"], index);
            //mp.events.callRemote('ChangeVehicleMod', mapModToIndex[item.Parent.Subtitle.Caption], index);
        }
    });

    let confrimationItem = new UIMenuItem("Purchase", displayPrice);
    tmpPartMenu.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);
    tmpPartMenu.ItemSelect.on((item) => {
        if (item.Text == "Purchase") {
            openConfrimationMenu();
            tmpPartMenu.Visible = false;
        }
    });

    return tmpPartMenu;
}


//This may need to be modified.
function createTintMenu() {
    let tmpPartMenu = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(tmpPartMenu, "shopui_title_carmod", "shopui_title_carmod");

    let lstOptions = [];
    let menuListItem;
    let displayPrice = getDisplayPrice("Windows Tint");

    lstOptions.push("Stock");

    for (let i = 1; i <= 4; i++) {
        lstOptions.push(i.toString());
    }

    menuListItem = new UIMenuListItem("Windows Tint", displayPrice, new ItemsCollection(lstOptions), 0);
    tmpPartMenu.AddItem(menuListItem);
    tmpPartMenu.ListChange.on(function (item, index) {
        if (index == 0) {
            isStock = true;
        }
        else {
            isStock = false;
        }

        if (index == 4) {
            mp.events.callRemote('ChangeVehicleMod', mapModToIndex["Windows Tint"], 5);
            //mp.events.callRemote('ChangeVehicleMod', mapModToIndex[item.Parent.Subtitle.Caption], 5);
        }
        else {
            mp.events.callRemote('ChangeVehicleMod', mapModToIndex["Windows Tint"], index);
            //mp.events.callRemote('ChangeVehicleMod', mapModToIndex[item.Parent.Subtitle.Caption], index);
        }
    });

    let confrimationItem = new UIMenuItem("Purchase", displayPrice);
    tmpPartMenu.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);
    tmpPartMenu.ItemSelect.on((item) => {
        if (item.Text == "Purchase") {
            openConfrimationMenu();
            tmpPartMenu.Visible = false;
        }
    });

    return tmpPartMenu;
}

/*
If you don't pass stockindex it will be treated as 0(-1 from GTA side),
otherwise it will be treated differently.
think about it as function overloads.
Note: intStockIndex its the index of the menuItemslist if it's 0 than the GTA Native index is -1
*/
function createPartMenu(strPartName, intVariants, intStockIndex, startIndex = 0) {
    let tmpPartMenu = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(tmpPartMenu, "shopui_title_carmod", "shopui_title_carmod");

    let lstOptions = [];
    let lstOptions2 = [];
    let menuListItem;
    let CurrentPart = getCurrentPart(mp.players.local.vehicle, strPartName);
    let intSelectedOption = startIndex;
    let displayPrice = getDisplayPrice(strPartName);
    let localPlayer = mp.players.local;
    if (localPlayer.vehicle == null) {
        return;
    }
    let vehClass = localPlayer.vehicle.getClass();
    //mp.gui.chat.push(`${strPartName}|Variants:${intVariants}|Current:${CurrentPart}`);

    // CurrentPart range [-1, ...]
    // we want:
    // for -1: stock = 0
    // for  0: 1st mod = 1
    // for  1: 2nd mod = 2
    CurrentPart++;

    if (strPartName == "Wheels") {
        lstOptions2.push("Sport");
        lstOptions2.push("Muscle");
        lstOptions2.push("Lowrider");
        lstOptions2.push("SUV");
        lstOptions2.push("Offroad");
        lstOptions2.push("Tuner");
        lstOptions2.push("Bike Wheels");
        lstOptions2.push("High End");
        lstOptions2.push("Benny's Original");
        lstOptions2.push("Benny's Bespoke");
        lstOptions2.push("Formula Wheels");
        lstOptions2.push("Street Wheels");

        menuListItem = new UIMenuListItem(strPartName + " type", displayPrice, new ItemsCollection(lstOptions2), intSelectedOption);
        tmpPartMenu.AddItem(menuListItem);
    }

    // Don't say installed for turbo and xenon lights (getMod doesn't work for them)
    let excludeInstalled = false;
    if (strPartName == "Turbo" || strPartName == "Xenon" || strPartName == "Wheels") excludeInstalled = true;

    for (let i = 0; i <= intVariants; i++) {


        if (i == 0) {
            if (CurrentPart == 0 && !excludeInstalled) lstOptions.push("Stock - Installed");
            else lstOptions.push("Stock");
        }
        else {
            if (CurrentPart != i || excludeInstalled) lstOptions.push(`${i}`);
            else lstOptions.push(`${i} - Installed`);
        }
    }
    if (strPartName == "Wheels")
        menuListItem = new UIMenuListItem(strPartName + " model", displayPrice, new ItemsCollection(lstOptions), 0);
    else
        menuListItem = new UIMenuListItem(strPartName + " model", displayPrice, new ItemsCollection(lstOptions), CurrentPart);

    tmpPartMenu.AddItem(menuListItem);
    tmpPartMenu.ListChange.on(function (item, index) {
        if (item.Text == "Wheels type") {
            localPlayer.vehicle.setWheelType(index);
            let vehicleModLimit = localPlayer.vehicle.getNumMods(23);
            tempModsMenu.Visible = false;
            WheelType = index;
            mp.events.callRemote('ChangeVehicleWheelType', index);
            let tmpPartMen = createPartMenu("Wheels", vehicleModLimit, 0, startIndex = index);
            tmpPartMen.Visible = false;
            tmpPartMen.Open();
            tempModsMenu = tmpPartMen;
        } else {
            var canContinue = true;
            if (item.Text == "Wheels model") {
                if (WheelType == 10) {
                    canContinue = false;
                    mp.gui.chat.push(`You cannot use this wheel type!`);
                }
                else if (vehClass == 8 && WheelType != 6) {
                    canContinue = false;
                    mp.gui.chat.push(`You cannot use this wheel type on a bike!`);
                }
                else if (vehClass != 8 && WheelType == 6) {
                    canContinue = false;
                    mp.gui.chat.push(`You can only use this wheel type on a bike!`);
                }
            }
            if (canContinue) {
                if (index == intStockIndex) {
                    isStock = true;
                }
                else {
                    isStock = false;
                }
                //if (item != null && item.Parent != null && item.Parent.Subtitle != null)
                mp.events.callRemote('ChangeVehicleMod', mapModToIndex[strPartName], (index - 1));
                //mp.events.callRemote('ChangeVehicleMod', mapModToIndex[item.Parent.Subtitle.Caption], (index - 1));
            }
        }
    });

    let confrimationItem = new UIMenuItem("Purchase", displayPrice);
    tmpPartMenu.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);
    tmpPartMenu.ItemSelect.on((item) => {
        if (item.Text == "Purchase") {
            openConfrimationMenu();
            tmpPartMenu.Visible = false;
        }
    });

    tmpPartMenu.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });

    return tmpPartMenu;
}

function openPartMenu(partname) {
    isStock = true;
    buyModIndex = mapModToIndex[partname];
}

function getCurrentPart(playersCar, strPartName) {
    let CurrentPart = null;
    try {
        CurrentPart = playersCar.getMod(parseInt(mapModToIndex[strPartName]));
        //CurrentPart = API.getVehicleMod(playersCar, parseInt(mapModToIndex[strPartName])); // Needs converted still.
        if (CurrentPart < 0) {
            CurrentPart = -1;
        }
    }
    catch (e) {
        CurrentPart = null;
    }
    finally {
        return CurrentPart;
    }
}

let neonRed = 0;
let neonGreen = 0;
let neonBlue = 0;

function createNeonMenu() {
    let menuNeon = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    let lstColorOptions = [];
    let menuListItem;
    for (var i = 0; i <= 51; i++) {
        lstColorOptions.push(i.toString());
    }
    let displayPrice = getDisplayPrice("Neons");

    menuListItem = new UIMenuListItem("Neon red", displayPrice, new ItemsCollection(lstColorOptions), 0);
    menuNeon.AddItem(menuListItem);

    menuListItem = new UIMenuListItem("Neon green", displayPrice, new ItemsCollection(lstColorOptions), 0);
    menuNeon.AddItem(menuListItem);

    menuListItem = new UIMenuListItem("Neon blue", displayPrice, new ItemsCollection(lstColorOptions), 0);
    menuNeon.AddItem(menuListItem);

    menuNeon.ListChange.on(neonColorChanged);

    let confrimationItem = new UIMenuItem("Purchase", displayPrice);
    menuNeon.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);

    //menuNeon.ItemSelect.on(confItemSelceted);
    menuNeon.ItemSelect.on((item, index) => {
        if (item.Text == "Purchase") {
            openConfrimationMenu();
            menuNeon.Visible = false;
        }
    });

    menuNeon.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });

    return menuNeon;
}

function neonColorChanged(item, index) {
    if (item.Text == "Neon red") {
        neonRed = item.Index * 5;
    }
    else if (item.Text == "Neon green") {
        neonGreen = item.Index * 5;
    }
    else if (item.Text == "Neon blue") {
        neonBlue = item.Index * 5;
    }

    mp.events.callRemote('ChangeVehicleNeonColor', neonRed, neonGreen, neonBlue);
}

function confItemSelceted(item, index) {
    if (item.Text == "Purchase") {
        openConfrimationMenu();
        menuNeon.Visible = false;
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var menuVehColor = null;
var hex_primary = null;
var hex_secondary = null;
function createColorMenu() {
    menuVehColor = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(menuVehColor, "shopui_title_carmod", "shopui_title_carmod");

    let lstColorOptions = [];
    let menuListItem;
    let colorPrice = getDisplayPrice("Vehicle Colors");
    let player = mp.players.local;
    let rgb_primary = player.vehicle.getCustomPrimaryColour(0, 0, 0);
    hex_primary = rgbToHex(rgb_primary.r, rgb_primary.g, rgb_primary.b);
    let rgb_secondary = player.vehicle.getCustomSecondaryColour(0, 0, 0);
    hex_secondary = rgbToHex(rgb_secondary.r, rgb_secondary.g, rgb_secondary.b);
    //mp.gui.chat.push(`Primary ${hex_primary} | Secondary:${hex_secondary}`);
    /*let currentPrimeryColor = player.vehicle.getColor(0);
    let currentSecondColor = player.vehicle.getColor(1);

    for (let i = 0; i < 158; i++) {
        lstColorOptions.push(i.toString());
    }

    menuListItem = new UIMenuListItem("Vehicle Color 1", colorPrice, new ItemsCollection(lstColorOptions), currentPrimeryColor);
    menuVehColor.AddItem(menuListItem);

    menuListItem = new UIMenuListItem("Vehicle Color 2", colorPrice, new ItemsCollection(lstColorOptions), currentSecondColor);
    menuVehColor.AddItem(menuListItem);

    menuVehColor.ListChange.on(colorChangeEvnet);
    */
    let menModItem2 = new UIMenuItem("~r~Vehicle Colors");
    menuVehColor.AddItem(menModItem2);

    menuListItem = new UIMenuItem("Primary Color", colorPrice);
    menuVehColor.AddItem(menuListItem);

    menuListItem = new UIMenuItem("Secondary Color", colorPrice);
    menuVehColor.AddItem(menuListItem);

    menuListItem = new UIMenuItem("Regular Colors", colorPrice);
    menuVehColor.AddItem(menuListItem);

    menuListItem = new UIMenuItem("Wheel Colors", colorPrice);
    menuVehColor.AddItem(menuListItem);

    let confrimationItem = new UIMenuItem("Purchase", colorPrice);
    menuVehColor.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);

    //menuVehColor.ItemSelect.on(purchaseSelected);

    menuVehColor.ItemSelect.on((item, index) => {
        if (item.Text == "Purchase") {
            openConfrimationMenu();
            if (menuVehColor != null)
                menuVehColor.Visible = false;
        } else if (item.Text == "Primary Color") {
            mp.events.call('RGBPicker::show', 0, hex_primary);
            menuVehColor.Visible = false;
        } else if (item.Text == "Secondary Color") {
            mp.events.call('RGBPicker::show', 1, hex_secondary);
            menuVehColor.Visible = false;
        } else if (item.Text == "Regular Colors") {
            menuVehColor.Visible = false;
            mp.events.callRemote('resetCustomColors');
            let colorMenu = createColorMenu_Old();
            colorMenu.Visible = false;
            colorMenu.Open();
        } else if (item.Text == "Wheel Colors") {
            menuVehColor.Visible = false;
            let WheelcolorMenu = createWheelColorMenu();
            WheelcolorMenu.Visible = false;
            WheelcolorMenu.Open();
        }
    });

    menuVehColor.CurrentSelection = 0;
    menuVehColor.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });

    return menuVehColor;
}

/*
mp.keys.bind(0x58, true, function () {
    if (logged == 0 || chatopened || cef_opened)
        return;

    mp.events.callRemote('vehicle_special_action');
});*/

function createColorMenu_Old() {
    menuVehColor = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(menuVehColor, "shopui_title_carmod", "shopui_title_carmod");

    let lstColorOptions = [];
    let menuListItem;
    let colorPrice = getDisplayPrice("Vehicle Colors");
    let player = mp.players.local;
    let currentPrimeryColor = 0; //player.vehicle.getColor(0, 0, 0);
    let currentSecondColor = 0; //player.vehicle.getColor(0, 0, 0);

    for (let i = 0; i < 158; i++) {
        lstColorOptions.push(i.toString());
    }

    menuListItem = new UIMenuListItem("Vehicle Color 1", colorPrice, new ItemsCollection(lstColorOptions), currentPrimeryColor);
    menuVehColor.AddItem(menuListItem);

    menuListItem = new UIMenuListItem("Vehicle Color 2", colorPrice, new ItemsCollection(lstColorOptions), currentSecondColor);
    menuVehColor.AddItem(menuListItem);

    menuVehColor.ListChange.on(colorChangeEvnet);

    let confrimationItem = new UIMenuItem("Purchase", colorPrice);
    menuVehColor.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);

    //menuVehColor.ItemSelect.on(purchaseSelected);

    menuVehColor.ItemSelect.on((item, index) => {
        if (item.Text == "Purchase") {
            buyModIndex = mapModToIndex["Vehicle ColorsEx"];
            openConfrimationMenu();
            if (menuVehColor != null)
                menuVehColor.Visible = false;
        }
    });

    menuVehColor.CurrentSelection = 0;
    menuVehColor.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });

    return menuVehColor;
}

function createWheelColorMenu() {
    menuVehColor = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(menuVehColor, "shopui_title_carmod", "shopui_title_carmod");

    let lstColorOptions = [];
    let menuListItem;
    let colorPrice = getDisplayPrice("Vehicle Colors");
    let player = mp.players.local;
    let currentPrimeryColor = player.vehicle.getColor(0);
    let currentSecondColor = player.vehicle.getColor(1);

    for (let i = 0; i < 158; i++) {
        lstColorOptions.push(i.toString());
    }

    menuListItem = new UIMenuListItem("Wheel Color", colorPrice, new ItemsCollection(lstColorOptions), currentPrimeryColor);
    menuVehColor.AddItem(menuListItem);

    menuVehColor.ListChange.on(wheelColorChangeEvent);

    let resetItem = new UIMenuItem("Reset Color");
    menuVehColor.AddItem(resetItem);

    let confrimationItem = new UIMenuItem("Purchase", colorPrice);
    menuVehColor.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);

    //menuVehColor.ItemSelect.on(purchaseSelected);

    menuVehColor.ItemSelect.on((item, index) => {
        if (item.Text == "Purchase") {
            buyModIndex = mapModToIndex["Wheel Colors"];
            openConfrimationMenu();
            if (menuVehColor != null)
                menuVehColor.Visible = false;
        } else if (item.Text == "Reset Color") {
            mp.events.callRemote('ChangeVehicleWheelColor', 255);
        }
    });

    menuVehColor.CurrentSelection = 0;
    menuVehColor.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });

    return menuVehColor;
}

mp.events.add('vehicleColorMenuShow', function (type, hex) {
    if (type == 0) hex_primary = hex;
    if (type == 1) hex_secondary = hex;
    menuVehColor.Visible = true;
});

function colorChangeEvnet(item, index) {
    let intColorSlot = 1;
    if (item.Text == "Vehicle Color 1") {
        intColorSlot = 1;
    }
    else if (item.Text == "Vehicle Color 2") {
        intColorSlot = 2;
    }

    mp.events.callRemote('ChangeVehicleColor', intColorSlot, item.Index);
}
function wheelColorChangeEvent(item, index) {
    mp.events.callRemote('ChangeVehicleWheelColor', item.Index);
}

function liveryChangeEvent(item, index) {
    mp.events.callRemote('ChangeVehicleLivery', item.Index);
}

function createLiveriesMenu() {
    let menuVehLiveries = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(menuVehColor, "shopui_title_carmod", "shopui_title_carmod");

    let lstLiveryOptions = [];
    let menuListItem;
    let player = mp.players.local;
    var Liveries = player.vehicle.getLiveryCount();
    let liveryPrice = getDisplayPrice("Livery");
    let currentLivery = player.vehicle.getLivery();

    for (let i = 0; i < Liveries; i++) {
        lstLiveryOptions.push(i.toString());
    }

    menuListItem = new UIMenuListItem("Vehicle Livery", liveryPrice, new ItemsCollection(lstLiveryOptions), currentLivery);
    menuVehLiveries.AddItem(menuListItem);

    menuVehLiveries.ListChange.on(liveryChangeEvent);

    let confrimationItem = new UIMenuItem("Purchase", liveryPrice);
    menuVehLiveries.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);

    menuVehLiveries.ItemSelect.on((item, index) => {
        if (item.Text == "Purchase") {
            openConfrimationMenu();
            menuVehLiveries.Visible = false;
        }
    });

    menuVehLiveries.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });

    return menuVehLiveries;
}

function createExtrasMenu() {
    let menuVehExtras = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");

    let menuListItem;
    let player = mp.players.local;
    let extraPrice = getDisplayPrice("Extras");

    let menModItem2 = new UIMenuItem("~r~Vehicle Extras");
    menuVehExtras.AddItem(menModItem2);

    for (i = 1; i <= 9; i++) {
        if (player.vehicle.doesExtraExist(i)) {
            //mp.gui.chat.push("[DEBUG] Extra "+i+" valid");
            //vehicle.isExtraTurnedOn(extraId); then ticked true
            if (player.vehicle.isExtraTurnedOn(i)) {
                menuListItem = new UIMenuCheckboxItem("Extra - " + i, true);
            } else menuListItem = new UIMenuCheckboxItem("Extra - " + i, false);
            menuVehExtras.AddItem(menuListItem);
        }//else mp.gui.chat.push("[DEBUG] Extra "+i+" invalid!!");
    }


    menuVehExtras.CheckboxChange.on(ExtrasChangeEvent);

    let confrimationItem = new UIMenuItem("Purchase", extraPrice);
    menuVehExtras.AddItem(confrimationItem);
    bindConfirmationItmToMain(confrimationItem);

    menuVehExtras.ItemSelect.on((item, index) => {
        if (item.Text == "Purchase") {
            openConfrimationMenu();
            menuVehExtras.Visible = false;
        }
    });

    menuVehExtras.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });

    return menuVehExtras;
}

function ExtrasChangeEvent(item, checked) {

    var extraFull = item.Text;
    var extra = extraFull.replace("Extra - ", "");
    //mp.gui.chat.push("[DEBUG] "+ item.Text +" ("+extra+") - "+checked+"");
    mp.events.callRemote('ChangeVehicleExtra', parseInt(extra), checked);
}

function purchaseSelected(item, index) {
    if (item.Text == "Purchase") {
        openConfrimationMenu();
        if (menuVehColor != null)
            menuVehColor.Visible = false;
    }
}

//Menu pool
//var menuPoolforModding;

//Maps
var mapModToIndex;
var mapModToPrice;

//Menus
var menuMain;
var menuMods = null;
var tempModsMenu = null;
var menuConfirmation;

var WheelType = 0;

//isAdminMenu
var isAdminMenu = false;

//Mod index for purchase procedure
var buyModIndex;

/*
    Assigning null to assist garbage collector clearing it to
    reduce the FPS drops that is caused by NativeUI menus(This is an assumption).
*/
function clearAllGlobals() {
    mapModToIndex = null;
    mapModToPrice = null;
    if (menuMain != null)
        menuMain.Visible = false;
    if (menuMods != null)
        menuMods.Visible = false;
    menuMain = null;
    menuMods = null;
}

function closeMenu() {
    if (menuMain != null)
        menuMain.Visible = false;
    if (menuMods != null)
        menuMods.Visible = false;
}


function openMainMenuVehMod() {
    //menuPoolforModding.RefreshIndex();
    if (menuMain == null)
        return;
    menuMain.Visible = true;
}

function createMainMenuVehMod() {
    //Create the main menu
    menuMain = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(menuMain, "shopui_title_carmod", "shopui_title_carmod");

    let mnItemVehMods = new UIMenuItem("Vehicle Mods", "");
    menuMods = createModsMenus();
    menuMods.Visible = false;
    addToMain(mnItemVehMods, menuMods);

    let mnItemVehColor = new UIMenuItem("Vehicle Color", "");
    let colorMenu = createColorMenu();
    colorMenu.Visible = false;
    addToMain(mnItemVehColor, colorMenu);

    let mnItemVehNeons = new UIMenuItem("Neons(Cars only)", "");
    let menuNeon = createNeonMenu();
    menuNeon.Visible = false;
    addToMain(mnItemVehNeons, menuNeon);

    let player = mp.players.local;
    var Liveries = player.vehicle.getLiveryCount();
    if (Liveries > 0) {
        let mnItemVehLiveries = new UIMenuItem("Vehicle Liveries", "");
        let menuLiveries = createLiveriesMenu();
        menuLiveries.Visible = false;
        addToMain(mnItemVehLiveries, menuLiveries);
    }

    var Extras = getVehicleExtras();
    if (Extras > 0) {
        let mnItemVehExtras = new UIMenuItem("Vehicle Extras", "");
        let menuExtras = createExtrasMenu();
        menuExtras.Visible = false;
        addToMain(mnItemVehExtras, menuExtras);
    }

    menuMain.CurrentSelection = 0;
    //menuPoolforModding.Add(menuMain);
    if (menuMain != null)
        menuMain.Visible = false;

    //Gets called when we select a category
    menuMain.ItemSelect.on(mainMenuItmSelect);

    menuMain.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });
}

function getVehicleExtras() {
    let player = mp.players.local;
    var i;
    var count = 0;
    for (i = 1; i <= 9; i++) {
        if (player.vehicle.doesExtraExist(i)) {
            //mp.gui.chat.push("[DEBUG] Extra "+i+" valid");
            count++;
        }//else mp.gui.chat.push("[DEBUG] Extra "+i+" invalid!!");
    }
    return count;
}

function addToMain(mnItem, menu) {
    if (menu == null || menuMain == null)
        return;
    menu.CurrentSelection = 0;
    //menuMain.BindMenuToItem(menu, mnItem);
    //menuPoolforModding.Add(menu);
    menuMain.AddItem(mnItem);
    menuMain.ItemSelect.on((item, index) => {
        if (item == mnItem) {
            menuMain.Visible = false;
            menu.Open();
        }
    });
}

function mainMenuItmSelect(item, index) {
    /*if (item.Text === "Vehicle Mods") {
        menuMods.Open();
        menuMain.Visible = false;
    }*/
    switch (item.Text) {
        case "Vehicle Color":
            openPartMenu("Vehicle Colors");
            break;
        case "Neons(Cars only)":
            openPartMenu("Neons");
            break;
        case "Vehicle Liveries":
            openPartMenu("Livery2");
            break;
        case "Vehicle Extras":
            openPartMenu("Extras");
            break;
    }
}

// 

function initModMap() {
    let mapModToIndex = {
        "Spoilers": 0,
        "Front Bumper": 1,
        "Rear Bumper": 2,
        "Side Skirt": 3,
        "Exhaust": 4,
        "Frame": 5,
        "Grille": 6,
        "Hood": 7,
        "Fender": 8,
        "Right Fender": 9,
        "Roof": 10,
        "Engine": 11,
        "Brakes": 12,
        "Transmission": 13,
        //"Horns": 14, 
        "Suspension": 15,
        //"Armor": 16,
        //"Turbo": 18, check code
        //"Xenon": 22, check code
        "Wheels": 23, //Font wheels for bikes
        //"Back Wheels": 24, //Bugged
        "Plate holders": 25,
        "Trim Design": 27,
        "Ornaments": 28,
        "Dial Design": 30,
        "Steering Wheel": 33,
        "Shift Lever": 34,
        "Plaques": 35,
        "Hydraulics": 38,
        "Livery": 48,
        "Livery2": 49,//FakeType for bugged livery functions
        "Plate": 62,
        //"Windows Tint": 69 check code
        "Vehicle Colors": 999, //
        "Vehicle ColorsEx": 9999, //
        "Wheel Colors": 9998, //
        "NeonInstallation": 1000,
        "Neons": 1001, // Not really listed as mod index in GTA.
        "Extras": 1002 // Not really listed as mod index in GTA.
    };

    return mapModToIndex;
}

function initModToPrice(serveArg) {
    let mapModToPrice = {};

    //Not the best soltuion here... but better than adding "if" inside a loop on the mod creation menu. This one will die after execution.
    let mapIndexToMod = {
        0: "Spoilers",
        1: "Front Bumper",
        2: "Rear Bumper",
        3: "Side Skirt",
        4: "Exhaust",
        5: "Frame",
        6: "Grille",
        7: "Hood",
        8: "Fender",
        9: "Right Fender",
        10: "Roof",
        11: "Engine",
        12: "Brakes",
        13: "Transmission",
        14: "Horns",
        15: "Suspension",
        16: "Armor",
        18: "Turbo",
        22: "Xenon",
        23: "Wheels",
        24: "Back Wheels",
        25: "Plate holders",
        27: "Trim Design",
        28: "Ornaments",
        30: "Dial Design",
        33: "Steering Wheel",
        34: "Shift Lever",
        35: "Plaques",
        38: "Hydraulics",
        48: "Livery",
        49: "Livery2",//FakeType for bugged livery functions
        62: "Plate",
        69: "Windows Tint",
        999: "Vehicle Colors",
        9999: "Vehicle ColorsEx",
        9998: "Wheel Colors",
        1000: "NeonInstallation",
        1001: "Neons",
        1002: "Extras"
    };

    let partIndex;
    let jsonPartPrice = JSON.parse(serveArg);
    for (let i = 0; i < jsonPartPrice.length; i++) {
        partIndex = jsonPartPrice[i].modSlot;
        mapModToPrice[mapIndexToMod[partIndex]] = jsonPartPrice[i].price;
    }

    return mapModToPrice;
}

function createModsMenus() {
    WheelType = 0;
    //Create the main mod selection menu
    let player = mp.players.local;

    let menuMods = new Menu("", "", new Point(posX, posY), "shopui_title_carmod", "shopui_title_carmod");
    //API.setMenuBannerSprite(menuMods, "shopui_title_carmod", "shopui_title_carmod");
    let vehicleModLimit = 0;
    //let menModItem;
    //let tmpPartMen;
    var carName = mp.game.vehicle.getDisplayNameFromVehicleModel(player.vehicle.model);
    let menModItem2 = new UIMenuItem("~r~Modifying " + carName, "");
    menuMods.AddItem(menModItem2);
    for (let key_ModName in mapModToIndex) {
        // GET_NUM_VEHICLE_MODS
        vehicleModLimit = player.vehicle.getNumMods(mapModToIndex[key_ModName]);
        //vehicleModLimit = mp.game.invoke("0x2E9AFFEE33324CC8", player.vehicle, mapModToIndex[key_ModName]);
        //vehicleModLimit = mp.game.invoke("0x2E9AFFEE33324CC8", 0, player.vehicle, mapModToIndex[key_ModName]);
        if (vehicleModLimit > 0) {
            let menModItem = new UIMenuItem(key_ModName, vehicleModLimit + " options available.");
            menuMods.AddItem(menModItem);

            //Handling the mod's part menu creations
            let tmpPartMen = createPartMenu(key_ModName, vehicleModLimit, 0);
            tmpPartMen.Visible = false;

            menuMods.ItemSelect.on((item, index) => {
                if (item == menModItem) {
                    tmpPartMen.Open();
                    tempModsMenu = tmpPartMen;
                    menuMods.Visible = false;
                }
            });
            //menuMods.BindMenuToItem(tmpPartMen, menModItem);
            //menuPoolforModding.Add(tmpPartMen);
        }
    }

    //Turbo
    mapModToIndex["Turbo"] = 18;
    let turbomenModItem = new UIMenuItem("Turbo", 1 + " option(s) available.");
    menuMods.AddItem(turbomenModItem);
    //menuMods.AddItem(menModItem);
    let turbotmpPartMen = createPartMenu("Turbo", 1, 0);
    turbotmpPartMen.Visible = false;
    menuMods.ItemSelect.on((item, index) => {
        if (item === turbomenModItem) {
            turbotmpPartMen.Open();
            menuMods.Visible = false;
        }
    });
    //menuMods.BindMenuToItem(tmpPartMen, menModItem);
    //menuPoolforModding.Add(tmpPartMen);

    //Xenon
    mapModToIndex["Xenon"] = 22;
    let xenonmenModItem = new UIMenuItem("Xenon", 1 + " option(s) available.");
    menuMods.AddItem(xenonmenModItem);
    //menuMods.AddItem(menModItem);
    let xenontmpPartMen = createPartMenu("Xenon", 1, 0);
    xenontmpPartMen.Visible = false;
    menuMods.ItemSelect.on((item, index) => {
        if (item === xenonmenModItem) {
            xenontmpPartMen.Open();
            menuMods.Visible = false;
        }
    });
    //menuMods.BindMenuToItem(tmpPartMen, menModItem);
    //menuPoolforModding.Add(tmpPartMen);

    //Window Tint - windows tints are 4 with stock and 1 extra special(ID number 4 probably for colored tints)
    mapModToIndex["Windows Tint"] = 69;
    let windowsmenModItem = new UIMenuItem("Windows Tint", 4 + " option(s) available.");
    menuMods.AddItem(windowsmenModItem);
    //menuMods.AddItem(menModItem);
    let windowstmpPartMen = createTintMenu();
    windowstmpPartMen.Visible = false;
    menuMods.ItemSelect.on((item, index) => {
        if (item == windowsmenModItem) {
            windowstmpPartMen.Open();
            menuMods.Visible = false;
        }
    });
    //menuMods.BindMenuToItem(tmpPartMen, menModItem);
    //menuPoolforModding.Add(tmpPartMen);

    mapModToIndex["Plate"] = 62;
    /*let platesmenModItem = new UIMenuItem("Plates", 5 + " option(s) available.");
        menuMods.AddItem(platesmenModItem);
    	
        let platestmpPartMen = createPlateMenu();
        platestmpPartMen.Visible = false;
        menuMods.ItemSelect.on((item, index) => {
            if (item == platesmenModItem) {
                platestmpPartMen.Open();
                menuMods.Visible = false;
            }
        });*/

    menuMods.ItemSelect.on((item, index) => {
        openPartMenu(item.Text);
    });

    menuMods.MenuClose.on(function (sender) {
        mp.events.callRemote('modMenuClosed');
    });


    return menuMods;
}

function getDisplayPrice(strPartName) {
    let displayPrice = "~r~Not available yet";

    //TODO: Add commas ","
    if (mapModToPrice[strPartName]) {
        displayPrice = "Total price: ~g~" + mapModToPrice[strPartName].toString() + "$";
    }

    return displayPrice;
}

/* Alarms */

let alarms = [];

function addAlarm(id, alarmMarker, alarmBlip, alarmEffects) {
    alarms.push([id, alarmMarker, alarmBlip, alarmEffects]);
}

function removeAlarm(id) {
    for (let i = 0; i < alarms.length; i++) {
        if (alarms[i][0] == id) {

            // alarmEffects(timer)
            if (alarms[i][3] != null) {
                clearInterval(alarms[i][3]);
            }

            // alarmBlip
            if (alarms[i][2] != null) {
                alarms[i][2].destroy();
            }

            // alarmMarker
            if (alarms[i][1] != null) {
            }

            alarms.splice(i, 1);
            return;
        }
    }
}

function VehicleAlarmLoop(vehicleAttached) {
    vehicleAttached.startHorn(1000, mp.game.joaat("HELDDOWN"), false);
    vehicleAttached.setLights(2);
    setInterval(() => {
        VehicleAlarmSubLoop(vehicleAttached);
    }, 1000);
}

function VehicleAlarmSubLoop(vehicleAttached) {
    vehicleAttached.setLights(1);
}

function NormalAlarmLoop() {
    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    setInterval(() => {
        NormalAlarmSubLoop();
    }, 300);
}

function NormalAlarmSubLoop() {
    mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
}

function updateValues() {
    if (timer >= 0)
        timer -= 1;
    else {
        mp.events.callRemote('rob_timer_server', false);
        rob_timer = false;
    }
}

/* Gun control */
var mapMarginLeft = resolution.x / 99;
var mapMarginBottom = resolution.y / 35;
var mapHeight = resolution.y / 3.01;
var resXWeapon = mapMarginLeft;
var resYWeapon = resolution.y - mapHeight - mapMarginBottom;

var ignoreCurrentWeapon = true;
var safetyEnabled = true;
var firingMode = 0;
var burstShots = 0;
var firingModes = ["AUTO", "BURST", "SINGLE"];
var playerChoices = [];

var burstFireWeapons = [
    584646201, // AP Pistol
    324215364, // Micro SMG
    -619010992, // Machine Pistol
    736523883, // SMG
    -270015777, // Assault SMG
    171789620, // Combat PDW
    -1660422300, // MG
    2144741730, // Combat MG
    1627465347, // Gusenberg
    -1121678507, // Mini SMG
    2024373456, // SMG Mk2
    -608341376, // Combat MG Mk2
    -1074790547, // Assault Rifle
    -2084633992, // Carbine Rifle
    -1357824103, // Advanced Rifle
    -1063057011, // Special Carbine
    2132975508, // Bullpup Rifle
    1649403952, // Compact Rifle
    961495388, // Assault Rifle Mk2
    -86904375, // Carbine Rifle Mk2
    -1768145561, // Special Carbine Mk2
    -2066285827 // Bullpup Rifle Mk2
];

var singleFireDisabledWeapons = [
    -598887786, // Marksman Pistol
    -1045183535, // Revolver
    911657153, // Stun Gun
    1198879012, // Flare Gun
    -1746263880, // Double Action
    -879347409, // Revolver Mk2
    100416529, // Sniper Rifle
    205991906, // Heavy Sniper
    177293209, // Heavy Sniper Mk2
    487013001, // Pump Shotgun
    2017895192, // Sawnoff Shotgun
    -1654528753, // Bullpup Shotgun
    -1466123874, // Musket
    -275439685, // Double Barrel Shotgun
    1432025498, // Pump Shotgun Mk2
    -1312131151, // RPG
    1119849093, // Minigun
    2138347493, // Firework Launcher
    1834241177, // Railgun
    1672152130, // Homing Launcher
    125959754 // Compact Grenade Launcher
];

var ignoredWeaponTypes = [
    -1609580060, // Unarmed
    -728555052, // Melee
    -37788308, // FireExtinguisher
    431593103, // Parachute
    690389602, // Stungun
    1548507267, // Thrown
    1595662460, // PetrolCan
];

function isCurrentWeaponIgnored() {
    return ignoredWeaponTypes.indexOf(mp.game.invoke('0xC3287EE3050FB74C', 0, mp.players.local.weapon)) != -1;
}


var sk_markers = [];

mp.events.add('createCheckpoint', function (uid, type, position, scale, dimension, r, g, b, dir) {
    if (typeof sk_markers[uid] != "undefined") {
        sk_markers[uid].destroy();
        sk_markers[uid] = undefined;
    }
    if (dir != undefined) {
        sk_markers[uid] = mp.checkpoints.new(type, position, scale, {
            direction: dir,
            color: [r, g, b, 200],
            visible: true,
            dimension: dimension
        });
    } else {
        sk_markers[uid] = mp.markers.new(type, position, scale, {
            visible: true,
            dimension: dimension,
            color: [r, g, b, 255]
        });
    }
});

mp.events.add('deleteCheckpoint', function (uid) {
    if (typeof sk_markers[uid] == "undefined") return;
    sk_markers[uid].destroy();
    sk_markers[uid] = undefined;
});

mp.events.add('createWaypoint', function (x, y) {
    mp.game.ui.setNewWaypoint(x, y);
});

mp.events.add('removeWaypoint', function () {
    mp.game.ui.setNewWaypoint(mp.players.local.position.x, mp.players.local.position.y);
});

var workBlip = null;
mp.events.add('createWorkBlip', function (position) {
    if (workBlip != null) workBlip.destroy();
    workBlip = mp.blips.new(0, position, {
        name: "Ponto de Verificação",
        scale: 1,
        color: 49,
        alpha: 255,
        drawDistance: 100,
        shortRange: false,
        rotation: 0,
        dimension: 0
    });
});
mp.events.add('deleteWorkBlip', function () {
    if (workBlip != null) workBlip.destroy();
    workBlip = null;
});

var garageBlip = null;
mp.events.add('createGarageBlip', function (position) {
    if (garageBlip != null) garageBlip.destroy();
    garageBlip = mp.blips.new(473, position, {
        name: "Garagem",
        scale: 1,
        color: 45,
        alpha: 255,
        drawDistance: 100,
        shortRange: true,
        rotation: 0,
        dimension: 0
    });
});

mp.events.add('deleteGarageBlip', function () {
    if (garageBlip != null) garageBlip.destroy();
    garageBlip = null;
});

/* Taxi */
var TaxiDespawn;
var hasTaxiDespawnBlipSet;
function endRental() {
    if (hasTaxiDespawnBlipSet) {
        removeBlip();
    }
    mp.game.ui.setNewWaypoint(917.0233, -163.6854);
    /*
    var TaxiDespawn = mp.blips.new(1, 917.0233, -163.6854, 74.70861),
        {
        name: "Taxi",
        color: 5,
        shortRange: true,
        });*/
    mp.game.graphics.notify("[~y~Taxi Dispatch~w~]: Please return the vehicle to the ~y~taxi company~w~.");
    hasTaxiDespawnBlipSet = false;
}
function removeBlip() {
    if (hasTaxiDespawnBlipSet) {
        TaxiDespawn.destroy(); // Needs converted still.
        hasTaxiDespawnBlipSet = false;
    }
}

var lastWaypoint = -1;

/* Events */

async function setWalkingStyle(player, style) {
    if (!style) {
        player.resetMovementClipset(0.0);
    } else {
        if (!mp.game.streaming.hasClipSetLoaded(style)) {
            mp.game.streaming.requestClipSet(style);
            for (let i = 0; !mp.game.streaming.hasClipSetLoaded(style) && i < 1500; i++) await mp.game.waitAsync(0);
        }

        player.setMovementClipset(style, 0.0);
    }
}

var entityListToSync = [];
var toSync = false;
mp.events.add('entityStreamIn', (entity) => {
    try {
        if (entity == null) return
        if (typeof entity === "undefined") return
        if (entity.type !== "player") return;
        if (DebugValues)
            mp.gui.chat.push("[DEBUG] event_handler.js");

        setWalkingStyle(entity, entity.getVariable("WalkingStyle"));

        if (entity.hasVariable("anim_rotation")) {
            var rotation = entity.getVariable("anim_rotation");

            if (rotation != null)
                entity.setRotation(0.0, 0.0, rotation, 1, true);

        }


        if (entity !== mp.players.local) {
            /*toSync = true;
            entityListToSync.push(entity);*/
            mp.events.callRemote("ReplayAnim", entity);
        }
        
        if (DebugValues)
            mp.gui.chat.push("[DEBUG] event_handler.js - END");
    } catch (e) {

    }
});

/*
setInterval(function () {
    if (toSync) {
        entityListToSync = entityListToSync.filter((e) => mp.players.exists(e));
        mp.events.callRemote.apply(null, ['ReplayAnim', ...entityListToSync]);
        entityListToSync = [];
        toSync = false;
    }
}, 500);*/

mp.events.add("CreatePermanentObject", (model, x, y, z, rotx, roty, rotz, dim, dropped, collision, property) => {
    var object = mp.objects.new(model, new mp.Vector3(x, y, z), {
        rotation: new mp.Vector3(rotx, roty, rotz),
        dimension: dim
    });
    var newObject = { "model": model, "pX": x, "pY": y, "pZ": z, "rX": rotx, "rY": roty, "rZ": rotz, "dropped": dropped, "item": null, "dimension": dim, "collision": collision, "property": property };

    if (object !== null && mp.objects.exists(object)) {
        permanentObjectsList.push(object);
        newObject.item = object.id;

        if (collision) {
            object.setNoCollision(mp.players.local.handle, false);
        }
    }
    permanentObjectsJSON.push(newObject);
});

function ReturnObjectByID(id) {
    return permanentObjectsJSON.find(obj => obj.dropped == id);
}

function ReturnObjectByPropertyID(id) {
    return permanentObjectsJSON.find(obj => obj.property == id);
}


function ReturnObjectByObjHandle(Handle) {
    return permanentObjectsList.find(obj => obj.id == Handle);
}

mp.events.add("DestroyPermanentObject", (id) => {
    var PermObject = ReturnObjectByID(id);
    if (PermObject != undefined) {
        var Obj = PermObject.item;
        var MPObject = ReturnObjectByObjHandle(Obj);
        if (mp.objects.exists(MPObject)) {
            MPObject.destroy();
            var index = permanentObjectsList.indexOf(MPObject, 0);
            permanentObjectsList.splice(index, 1);
            var indexJSON = permanentObjectsJSON.indexOf(PermObject, 0);
            permanentObjectsJSON.splice(indexJSON, 1);
        }
    }
});

mp.events.add("DestroyPermanentPropertyObjects", (id) => {
    /*mp.gui.chat.push("DestroyPermanentPropertyObjects - PropID: " + id);
    mp.gui.chat.push("Current permanentObjectsJSON length: " + permanentObjectsJSON.length);
    mp.gui.chat.push("Current permanentObjectsList length: " + permanentObjectsList.length);*/
    permanentObjectsJSON.forEach(object => {
        if (object.property == id) {
            var MPObject = ReturnObjectByObjHandle(object.item);
            if (mp.objects.exists(MPObject)) {
                MPObject.destroy();
                var index = permanentObjectsList.indexOf(MPObject, 0);
                permanentObjectsList.splice(index, 1);
            }
        }
    });
    permanentObjectsJSON = permanentObjectsJSON.filter(function (val) { return val.property != id; });
    /*mp.gui.chat.push("New permanentObjectsJSON length: " + permanentObjectsJSON.length);
    mp.gui.chat.push("New permanentObjectsList length: " + permanentObjectsList.length);*/
});

mp.events.add("DestroyPermanentObjects", () => {
    permanentObjectsList.forEach(object => { if (mp.objects.exists(object)) object.destroy(); });
    permanentObjectsList = [];
});

mp.events.add("ReloadPermanentObjects", () => {
    mp.events.call('DestroyPermanentObjects');

    permanentObjectsJSON.forEach(obj => {
        var object = mp.objects.new(obj.model, new mp.Vector3(obj.pX, obj.pY, obj.pZ), {
            rotation: new mp.Vector3(obj.rX, obj.rY, obj.rZ),
            dimension: obj.dimension
        });
        if (object !== null && mp.objects.exists(object)) {
            obj.item = object.id;
            permanentObjectsList.push(object);
            if (obj.collision) {
                object.setNoCollision(mp.players.local.handle, false);
            }
        }

    });
});

mp.events.add("SetObjectCollision", (object, collision) => {
    if (object !== null && mp.objects.exists(object)) {
        if (collision) {
            object.setNoCollision(mp.players.local.handle, false);
        }
        else { object.setNoCollision(mp.players.local.handle, true); }
    }
});

mp.events.add("CreateObject", (model, x, y, z, rotx, roty, rotz, dim, collision) => {
    var object = mp.objects.new(model, new mp.Vector3(x, y, z), {
        rotation: new mp.Vector3(rotx, roty, rotz),
        dimension: dim
    });
    var newObject = { "object": object, "collision": collision };

    if (object !== null && mp.objects.exists(object)) {
        /*if(collision){
            object.setNoCollision(mp.players.local.handle, false);
        }*/
        furnitureList.push(newObject);
    }
    CreatedObjects = true;
});

mp.events.add("DestroyObjects", () => {
    furnitureList.forEach(furniture => { if (mp.objects.exists(furniture.object)) furniture.object.destroy(); });
    furnitureList = [];
    CreatedObjects = false;
});

mp.events.add("FindPandaObject", () => {
    furnitureList.forEach(furniture => { if (furniture.model == 315129459) mp.events.callRemote("server_receivepanda", furniture.position, furniture.dimension); });
});

var lastObjectsUpdate = 0;
var CreatedObjects = false;
mp.events.add('render', () => {
    if (mp.players.local.dimension != 0) {
        var TimeUpdate = new Date().getTime();
        if (TimeUpdate > lastObjectsUpdate + 5000 && CreatedObjects == true) {
            lastObjectsUpdate = TimeUpdate;
            furnitureList.forEach(furniture => {
                if (mp.objects.exists(furniture.object)) {
                    if (furniture.collision) {
                        furniture.object.setNoCollision(mp.players.local.handle, false);
                    }
                }
            });
            CreatedObjects = false;
        }
    }
});

mp.events.add("CreateTrash", (model, x, y, z, rotx, roty, rotz) => {
    var object = mp.objects.new(model, new mp.Vector3(x, y, z), {
        rotation: new mp.Vector3(rotx, roty, rotz),
        dimension: 0
    });
    if (object !== null && mp.objects.exists(object)) {
        garbageList.push(object);
    }
});

mp.events.add("DestroyTrash", () => {
    var object = garbageList.pop();
    if (mp.objects.exists(object))
        object.destroy();
});

mp.events.add("pop_all_tyres", (entity) => {
    entity.setTyreBurst(0, false, 1000);
    entity.setTyreBurst(1, false, 1000);
    entity.setTyreBurst(2, false, 1000);
    entity.setTyreBurst(3, false, 1000);
    entity.setTyreBurst(4, false, 1000);
    entity.setTyreBurst(5, false, 1000);
    entity.setTyreBurst(6, false, 1000);
    entity.setTyreBurst(7, false, 1000);
    entity.setTyreBurst(8, false, 1000);
    entity.setTyreBurst(9, false, 1000);
    entity.setTyreBurst(10, false, 1000);
});

mp.events.add("play_anim", (entity, animDictionary, animName, animFlag, rotation, position = null) => {
    mp.game.streaming.requestAnimDict(animDictionary);
    new Promise(() => {
        const timer = setInterval(() => {
            if (mp.game.streaming.hasAnimDictLoaded(animDictionary)) {
                clearInterval(timer);
                resolve(entity, animDictionary, animName, animFlag, rotation, position);
            }
        }, 100);
    });
});

mp.events.addDataHandler("PLAY::ANIM", (entity, data) => {
    if (entity.type == "player") {
        if (data != null || data != undefined) {
            mp.events.call("play_anim", entity, data.AnimDic, data.AnimName, data.AnimFlag, data.AnimRotation, data.AnimPosition);
        }
    }
});

function resolve(entity, animDictionary, animName, animFlag, rotation, position) {
    try {
        if (position != null) {
            entity.freezePosition(true);
            entity.position = position;
        }
        entity.setRotation(0.0, 0.0, rotation, 1, true);
        entity.taskPlayAnim(animDictionary, animName, 8.0, 0.0, -1, animFlag, 0.0, false, false, false);
    }
    catch (e) { }
}

mp.events.add('entityStreamOut', (entity) => {
    try {
        if (entity == null) return
        if (typeof entity === "undefined") return

        if (entity.type !== "player") return;
        if (DebugValues)
            mp.gui.chat.push("[DEBUG] events_handler out.js");
    } catch (e) {

    }
});

var updateTimeoutInMilliseconds = 500;
var updateTimeoutInMilliseconds2 = 1000;
var lastUpdateTickCount = 0;

let freezeMe = false;

mp.events.add("freeze", (bool) => {
    freezeMe = bool;
});

function getWaypointPos() {
    // GET_FIRST_BLIP_INFO_ID
    let waypointBlip = mp.game.invoke("0x1BEDE233E6CD2A1F", 8); // 8 is the ID for Waypoint blip.
    if (waypointBlip > 0) {
        // Calculate position
        var wayPointPos = mp.game.ui.getBlipInfoIdCoord(waypointBlip);
        return wayPointPos;
    } else {
        // Return empty positon
        return new mp.Vector3();
    }
}

mp.events.add("startairsoft", () => {
    printnametags = false;
    mp.events.callRemote('airsoftCallback', true);
});

mp.events.add("stopairsoft", () => {
    printnametags = true;
    mp.events.callRemote('airsoftCallback', false);
});

var maxDistance = 25 * 25;
const width = 1.03;
const height = 1.0065;
const border = 0.001;
var color = [255, 255, 255, 255];
mp.nametags.enabled = false;
var lasthealth = 100;
var printnametags = true;
var TypingLabelToggled = false;
var AmbienceSoundToggled = false;

mp.events.add("TypingLabelToggled", (status) => {
    TypingLabelToggled = status;
});


mp.events.add("AmbienceSoundToggled", (status) => {
    if (status)
        mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE")
    else
        mp.game.audio.stopAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE")
});

function hasLineOfSight(source, target) {
    // const locahead = source.getBoneCoords(31086, 0, 0, 0);
    // const othaHead = target.getBoneCoords(31086, 0, 0, 0);

    // mp.game.graphics.drawLine(
    //     locahead.x,
    //     locahead.y,
    //     locahead.z,
    //     othaHead.x,
    //     othaHead.y,
    //     othaHead.z,
    //     125, 74, 255, 255);

    //     mp.game.graphics.drawText(`unknown var ${x}`, [0.5, 0.5], {
    //         font: 4,
    //         color: [255, 255, 255, 255],
    //         scale: [0.4, 0.4],
    //         outline: true,
    //         centre: true
    //     });

    return source.hasClearLosTo(target.handle, 17);
}


mp.events.add('render', (nametags) => {
    if (isLocalPlayerInvincible) {

        let currentHP = localPlayerEntity.getHealth();

        if (currentHP < 100) {

            if (canSendUpdateRequest) {

                canSendUpdateRequest = false;

                mp.events.callRemote('ogmdt');

                setTimeout(function () {

                    canSendUpdateRequest = true;

                }, updateRequestRate);
            }
        }
    }

    if (!print_hud)
        return;

    var player = mp.players.local;
    if (mp.players.local === undefined || mp.players.local === null)
        return;

    if (hasScubaGear && !mp.players.local.isInWater()) {
        hasScubaGear = false;
        mp.players.local.setEnableScuba(false);
        mp.players.local.setDiesInWater(true);
        mp.events.callRemote("SCUBA::DisableForce");
    }
    else if (!hasScubaGear && mp.players.local.isInWater()) {
        hasScubaGear = false;
        mp.players.local.setEnableScuba(false);
        mp.players.local.setDiesInWater(true);
    }

    var inVeh = player.isInAnyVehicle(false);

    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);

    //nametags.forEach(nametag => {

    //    let [player, x, y, distance] = nametag;
    //    mp.game.graphics.drawText(player.name, [x, y], { font: 4 });
    //});

    if (lasthealth - player.getHealth() >= 5) {

        mp.events.callRemote("OnPlayerHealthChange", lasthealth - player.getHealth(), 0);
    }
    lasthealth = player.getHealth();

    const disabledByCommand = mp.players.local.hasVariable('NAMETAGS_ARE_HIDDEN') && mp.players.local.getVariable('NAMETAGS_ARE_HIDDEN');
    const isLocalPlayerAOD = mp.players.local.hasVariable('ON_DUTY_ADMIN') && mp.players.local.getVariable('ON_DUTY_ADMIN');

    if (printnametags && !disabledByCommand) {

        nametags.forEach(function (nametag) {

            let [player, x, y, distance] = nametag;
            var isVisible = true;

            if (player.getVariable('nametag_visible') != null)
                isVisible = player.getVariable('nametag_visible');

            if (isVisible) {

                //mp.gui.chat.push("Printing nametag " + nametag + " for player " + player.name);
                if (player.vehicle != undefined && player.vehicle.getClass() != 8 && player.vehicle.getClass() != 14 && player.vehicle.getClass() != 13) {
                    maxDistance = 25 * 4;
                }
                else {
                    maxDistance = 25 * 25;
                }

                if (distance <= maxDistance) {
                    let hasLOS;

                    if (isLocalPlayerAOD) hasLOS = true;
                    else hasLOS = hasLineOfSight(mp.players.local, player);

                    if (hasLOS) {

                        let scale = (distance / maxDistance);
                        if (scale < 0.6) scale = 0.6;

                        let scaleText = (maxDistance / distance) / 10;
                        if (scaleText < 0.2) scaleText = 0.2;
                        if (scaleText > 0.4) scaleText = 0.4;

                        var health = player.getHealth();
                        health = health < 100 ? 0 : ((health - 100) / 100);
                        var color2 = color;

                        if (player.getVariable('nametag_color') != null) {

                            var colorStorage = player.getVariable('nametag_color');
                            if (colorStorage == "red")
                                color2 = [255, 0, 0, 255];
                            else if (colorStorage == "white")
                                color2 = [255, 255, 255, 255];
                            else if (colorStorage == "green")
                                color2 = [31, 139, 76, 255];
                            else if (colorStorage == "orange")
                                color2 = [255, 150, 0, 255];
                            else if (colorStorage == "blue")
                                color2 = [39, 147, 205, 255];
                        }

                        if (player.hasVariable('PLAYER_IS_TABBED') && player.getVariable('PLAYER_IS_TABBED')) color2 = [142, 142, 142, 255];
                        var armour = player.getArmour() / 100;

                        y -= scale * (0.005 * (screenRes.y / 1080));
                        mp.game.graphics.drawText(player.name, [x, y + 0.03], {

                            font: 4,
                            color: color2,
                            scale: [0.4, 0.4],
                            outline: true,
                            centre: true
                        });

                        if (player.getVariable('death_message') != null && distance <= 150) {
                            mp.game.graphics.drawText(player.getVariable('death_message'), [x, y - 0.025], {
                                font: 0,
                                color: deathlabelColor,
                                scale: [scaleText, scaleText],
                                outline: true,
                                centre: true
                            });
                        }

                        if (labelEmotes.findIndex(labelObject => labelObject.player === player) != -1) {

                            let labelObject = labelEmotes.find(labelObject => labelObject.player === player);

                            if (labelObject != null && labelObject != undefined) {
                                if (Date.now() - labelObject.tick < 5000) {
                                    if (!labelObject.checkForFoot || !player.vehicle) {

                                        mp.game.graphics.drawText(labelObject.text, [x, y - 0.025], {

                                            font: 0,
                                            color: labelObject.color,
                                            scale: [0.4, 0.4],
                                            outline: true,
                                            centre: true
                                        });
                                    }
                                } else {
                                    let index = labelEmotes.findIndex(labelObject => labelObject.player === player)
                                    if (index > -1)
                                        labelEmotes.splice(index, 1)
                                }
                            }
                        }
                        if (!TypingLabelToggled) {
                            if (PeopleTyping.findIndex(labelObject => labelObject.player === player) != -1) {

                                let labelObject = PeopleTyping.find(labelObject => labelObject.player === player);

                                if (labelObject != null && labelObject != undefined) {

                                    mp.game.graphics.drawText("[...]", [x, y], {

                                        font: 0,
                                        color: [255, 128, 0, 255],
                                        scale: [0.4, 0.4],
                                        outline: true,
                                        centre: true
                                    });
                                }
                            }
                        }

                        //if (mp.game.player.isFreeAimingAtEntity(player.handle)) {

                        //    let y2 = y + 0.042;
                        //    mp.gui.chat.push("Aiming " + player.handle);

                        //    if (armour > 0) {

                        //        let x2 = x - width / 2 - border / 2;

                        //        mp.game.graphics.drawRect(x2, y2, width + border * 2, 0.0085, 0, 0, 0, 200);
                        //        mp.game.graphics.drawRect(x2, y2, width, height, 150, 150, 150, 255);
                        //        mp.game.graphics.drawRect(x2 - width / 2 * (1 - health), y2, width * health, height, 255, 255, 255, 200);

                        //        x2 = x + width / 2 + border / 2;

                        //        mp.game.graphics.drawRect(x2, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
                        //        mp.game.graphics.drawRect(x2, y2, width, height, 41, 66, 78, 255);
                        //        mp.game.graphics.drawRect(x2 - width / 2 * (1 - armour), y2, width * armour, height, 48, 108, 135, 200);
                        //    }
                        //    else {

                        //        mp.game.graphics.drawRect(x, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
                        //        mp.game.graphics.drawRect(x, y2, width, height, 150, 150, 150, 255);
                        //        mp.game.graphics.drawRect(x - width / 2 * (1 - health), y2, width * health, height, 255, 255, 255, 200);
                        //    }
                        //}
                    }
                }
            }
        });
    }

    if (freezeMe) {
        mp.game.controls.disableAllControlActions(0);
        mp.game.controls.enableControlAction(1, 1, true);
        mp.game.controls.enableControlAction(1, 2, true);
    }

    var player = mp.players.local;
    var inVeh = player.isInAnyVehicle(false);
    if (enableDisplay && isGarbageJob) {
        mp.game.graphics.drawText(garbagePickedUp, [((res_X / res_X) * 0.9), (res_Y / res_Y) * 0.8], {
            font: 4,
            color: [115, 186, 131, 200],
            scale: [0.9, 0.9],
            outline: true,
            centre: true
        });

        mp.game.graphics.drawText(`${currentGarbage} / ${maximumGarbage}`, [((res_X / res_X) * 0.9), (res_Y / res_Y) * 0.85], {
            font: 4,
            color: [255, 255, 255, 200],
            scale: [1, 1],
            outline: true,
            centre: true
        });
    }

    /* if (enableGarbageNerf && isGarbageJob) {
        var localplr = mp.players.local;
        var localveh = localplr.vehicle;
        if (localplr.isInAnyVehicle(false)) {
             if (localveh.getModel() == 1917016601 || localveh.getModel() == -1255698084)
                 mp.game.invoke("_SET_VEHICLE_ENGINE_TORQUE_MULTIPLIER", localveh, 0.5);
         }
     }*/

    if (auto_walk && enable_autowalker) {
        var pos = mp.game.invoke("GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS", 5, mp.players.local, 0.0, 0.5, 0.0);
        mp.game.invoke("TASK_GO_STRAIGHT_TO_COORD", mp.players.local, pos.X, pos.Y, pos.Z, 0.5, 0.5, 0.0, 0.0);
    }

    if (triggerBlindfold) {
        var width = resolution.x;
        var height = resolution.y;
        var x = parseInt((resolution.x / 2) - (width / 2));
        var y = parseInt((resolution.y / 2) - (height / 2));
        mp.game.graphics.drawRect(x, y, width, height, 0, 0, 0, 255);
    }

    // ALPR
    // Is the ALPR turned on?
    if (alprStatus) {
        if (alprPos !== null) {
            var veh = mp.players.local.vehicle;
            if (veh === null)
                return mp.events.call('ALPR::toggle', false, null, null);


            if (alpr_hit) {
                mp.events.call('ALPR::update', true, alpr_modelName, alpr_plateName, "", 0, 0, 0);
                return;
            }

            var currentTimeInMilliseconds = new Date().getTime();
            if (currentTimeInMilliseconds - lastUpdateTickCount > updateTimeoutInMilliseconds2) {
                lastUpdateTickCount = currentTimeInMilliseconds;

                let vehRot = veh.getHeading();
                var vehiclePos = veh.position;
                if (vehRot === null || vehRot === undefined || vehRot === null || vehRot === undefined || alprPos === undefined || alprPos === null)
                    return;

                var startPos = new Array;
                startPos[0] = Rotate(vehiclePos, vehRot, (-(alprPos[0] + 1.5) / 2), (alprPos[1] / 2));
                startPos[1] = Rotate(vehiclePos, vehRot, ((alprPos[0] + 1.5) / 2), (alprPos[1] / 2));
                var endPos = new Array;
                endPos[0] = GetCordsInfront(startPos[0], vehRot, 20);
                endPos[1] = GetCordsInfront(startPos[1], vehRot, 20);

                var ALPRRegion = [[startPos[0].x, startPos[0].y], [endPos[0].x, endPos[0].y],
                [endPos[1].x, endPos[1].y], [startPos[1].x, startPos[1].y],];

                var VehiclesInALPR = [];
                mp.vehicles.forEach(v => {

                    if (!v.doesExist()) return;
                    if (v.getClass() === 13
                        || v.getClass() === 14
                        || v.getClass() === 15
                        || v.getClass() === 16
                        || v.getClass() === 21)
                        return;

                    if (getDistanceBetweenCoords(mp.players.local.position, v.position) > 50.0) return;
                    var X = v.position.x; var Y = v.position.y;
                    if (inside([X, Y], ALPRRegion)) {
                        var Dist = getDistanceBetweenCoords(mp.players.local.position, v.position);
                        VehiclesInALPR.push({ "Vehicle": v, "Distance": Dist });
                    }
                });

                VehiclesInALPR.sort(function (a, b) {
                    return a.Distance - b.Distance;
                });

                if (VehiclesInALPR[0] != null) {
                    let vehicle = VehiclesInALPR[0].Vehicle;
                    if (vehicle === null) return;

                    if (vehicle.getType() !== 2)
                        return;

                    if (vehicle.getClass() === 13
                        || vehicle.getClass() === 14
                        || vehicle.getClass() === 15
                        || vehicle.getClass() === 16
                        || vehicle.getClass() === 21)
                        return;

                    if (mp.players.local.vehicle === vehicle) // exclude the car the client is driving from ALPR
                        return;

                    if (alpr_hitEntity === null || alpr_hitEntity !== vehicle) {
                        alpr_modelName = mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.getModel());
                        alpr_plateName = mp.game.invokeString("0x7CE1CCB9B293020E", vehicle.handle);

                        alpr_ownerName = null;
                        alpr_modelStatus = null;
                        alpr_ownerStatus = null;
                        alpr_insuranceStatus = null;

                        if (!alpr_hit) {
                            setTimeout(() => {
                                mp.events.callRemote("ALPR::Hit_Vehicle", vehicle);
                                alpr_hit = false;
                                mp.game.audio.playSoundFrontend(-1, "5_SEC_WARNING", "HUD_MINI_GAME_SOUNDSET", true);
                            }, 4000);
                            alpr_hit = true;
                        }
                        alpr_hitEntity = vehicle;
                        hit = true;
                    }
                }
            }
            if (alpr_modelName !== null && alpr_plateName !== null && alpr_hit == true) {
                mp.events.call('ALPR::update', true, alpr_modelName, alpr_plateName, "", 0, 0, 0);
            }
            if (alpr_hit == false && alpr_ownerName !== null && alpr_modelStatus !== null && alpr_ownerStatus !== null && alpr_insuranceStatus !== null) {
                mp.events.call('ALPR::update', false, alpr_modelName, alpr_plateName, alpr_ownerName, alpr_insuranceStatus, alpr_ownerStatus, alpr_modelStatus);
            }
        }
    }

    /*
    if (API.isWaypointSet()) {
        var waypoint = new mp.Vector3();
        waypoint = API.getWaypointPosition();
        var waypointX = waypoint.X;
        var waypointY = waypoint.Y;
        var waypointZ = waypoint.Z;
        if (waypointX != 0 && waypointY != 0 && waypointZ != 0 && lastWaypoint == -1) {
            lastWaypoint = 0
            mp.events.callRemote('update_waypoint', waypoint);
        } else if (waypointX == 0 && waypointY == 0 && waypointZ == 0 && lastWaypoint == 0) {
            lastWaypoint = -1
        }
    }*/ //TODO WAYPOINT GET ON RAGE?

    if (rob_timer === true) {
        var currentTimeInMilliseconds = new Date().getTime();
        if (currentTimeInMilliseconds - lastUpdateTickCount > updateTimeoutInMilliseconds) {
            lastUpdateTickCount = currentTimeInMilliseconds;
            updateValues();
        }

        mp.game.graphics.drawText("~y~Remaining time: ~g~" + `${timer}` + "s", [(res_X / 2) / res_X, (res_Y - 100) / res_Y], {
            font: 4,
            color: [255, 255, 255],
            scale: [1, 1],
            outline: true,
            centre: true
        });
    }

    if (animInProgress) {

        if (!shotFired && animName == "PISTOL") {
            if (mp.game.invoke("HAS_ANIM_EVENT_FIRED", 8, mp.players.local, mp.game.gameplay.getHashKey("Fire"))) {
                mp.events.callRemote('Suicide_Shoot');
                shotFired = true;
            }
        }

        if (mp.players.local.getAnimCurrentTime("MP_SUICIDE", animName) >= animTime) {
            animInProgress = false;
            mp.players.local.setHealth(-1);
            mp.events.callRemote('Suicide_Poison');
        }
    }

    /*if (!ignoreCurrentWeapon)
    {
        if (safetyEnabled)
        {
            mp.game.invoke("DISABLE_PLAYER_FIRING", mp.players.local, false);
            
            mp.game.graphics.drawText(firingModes[firingMode] + " (SAFETY ON)", [resXWeapon + 10, resYWeapon + 140], {
                font:4, 
                color:[114, 204, 114],
                scale: [0.5, 0.5],
                outline: true,
                centre: true
            });

            if (mp.game.controls.isControlJustPressed(0, 24)) mp.game.audio.playSoundFrontend(-1, "Faster_Click", "RESPAWN_ONLINE_SOUNDSET", true);
            return;
        }

        if (firingMode > 0)
        {
            switch (firingMode)
            {
                case 1:
                    {
                        if (mp.players.local.isShooting()) burstShots++;
                        if (burstShots > 0 && burstShots < 3) mp.game.invoke("_SET_CONTROL_NORMAL", 0, 24, 1.0);

                        if (burstShots == 3)
                        {
                            mp.game.invoke("DISABLE_PLAYER_FIRING", mp.players.local, false);
                            if (mp.game.controls.isControlJustReleased(0, 24)) burstShots = 0;
                        }

                        if (mp.players.local.isReloading()) burstShots = 0;
                        break;
                    }

                case 2:
                    {
                        if (mp.game.controls.isControlPressed(0, 24)) mp.game.invoke("DISABLE_PLAYER_FIRING", mp.players.local, false);
                        break;
                    }
            }
        }
        mp.game.graphics.drawText(firingModes[firingMode] + " (SAFETY OFF)", [resXWeapon + 10, resYWeapon + 140], {
            font:4, 
            color:[224, 50, 50],
            scale: [0.5, 0.5],
            outline: true,
            centre: true 
        });
    }*/
});

mp.events.add('request_ipl', (ipl) => {
    mp.game.streaming.requestIpl(ipl);
    mp.players.local.clearTasksImmediately();
});

mp.events.add('remove_ipl', (ipl) => {
    mp.game.streaming.removeIpl(ipl);
    mp.players.local.clearTasksImmediately();
});

mp.events.add("playerReady", (player) => {
    ignoreCurrentWeapon = isCurrentWeaponIgnored();
});

mp.events.add("attachEntityToEntityForVehicles", (entity1, entity2, boneName, posOffset, rotOffset) => {
    AttachEntityToEntityForVehicles(entity1, entity2, boneName, posOffset, rotOffset);
});

function AttachEntityToEntityForVehicles(entity1, entity2, boneName, posOffset, rotOffset) {
try {	
soundID = mp.game.invoke("0x430386FE9BF80B45");
	mp.game.audio.playSoundFrontend(soundID, "Bell_02", "ALARMS_SOUNDSET", true);
	if (entity1 !== null && entity2 !== null)
		entity1.attachTo(entity2.handle, entity2.getBoneIndexByName(boneName), posOffset.x, posOffset.y, posOffset.z, rotOffset.x, rotOffset.y, rotOffset.z, true, true, false, true, 0, true);
} catch (e) {}
}

mp.events.add("attachEntityToEntity", (entity1, entity2, boneIndex, posOffset, rotOffset) => {
try {    
if (entity1 !== null && entity2 !== null && entity1 !== undefined && entity2 !== undefined)
{

entity2.attachedModel = entity1;
        entity2.attachedPos = {x: posOffset.x, y: posOffset.y, z: posOffset.z};
        entity2.attachedRot = {x: rotOffset.x, y: rotOffset.y, z: rotOffset.z};
        entity1.attachedBone = boneIndex;
		AttachEntityToEntity(entity1, entity2, boneIndex, posOffset, rotOffset);
entity1.attachedObj = entity2;
entity1.notifyStreaming = true;
entity2.notifyStreaming = true;
        
	//mp.gui.chat.push("Attaching to pos " + posOffset.x + " " + posOffset.y + " " +  posOffset.z + " rotation " + rotOffset.x + " " + rotOffset.y + " " + rotOffset.z + " bone " + boneIndex);
}
    //entity1.attachTo(entity2.handle, entity2.getBoneIndex(boneIndex), posOffset.x, posOffset.y, posOffset.z, rotOffset.x, rotOffset.y, rotOffset.z, true, true, false, true, 0, true);
    //entity1.attachTo(entity2.handle, 0, 0,0,0,0,0,0, true, false, false, false, 0, false);
} catch (e) {}
});


function AttachEntityToEntity(entity1, entity2, boneIndex, posOffset, rotOffset) {
try {
if (entity1 != null && entity1 != undefined && entity2 != null && entity2 != undefined)
{
	entity1.attachTo(entity2.handle, entity2.getBoneIndex(boneIndex), posOffset.x, posOffset.y, posOffset.z, rotOffset.x, rotOffset.y, rotOffset.z, true, true, false, true, 0, true);
}
} catch (e) {}
}

mp.events.add('siren_toggle', (vehicle, toggle) => {
    //mp.gui.chat.push("Setting siren to " + toggle);
    //vehicle.setSirenSound(toggle);
});

mp.events.add('door_toggle', (object, x, y, z, locked, heading) => {
    mp.game.object.setStateOfClosestDoorOfType(object, x, y, z, locked, heading, false);
});

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    mp.events.callRemoteUnreliable("weapon_fired", targetEntity !== undefined);
});


hasScubaGear = false;

mp.events.add('SCUBA::Enable', () => {
    if (!mp.players.local.isInWater()) {
        mp.events.callRemoteUnreliable("SCUBA::Failed");
        return;
    }
    if (hasScubaGear) {
        hasScubaGear = false;
        mp.players.local.setEnableScuba(false);
        mp.players.local.setDiesInWater(true);
        mp.events.callRemoteUnreliable("SCUBA::Disable");
    } else {
        mp.players.local.setEnableScuba(true);
        mp.players.local.setDiesInWater(false);
        hasScubaGear = true;
        mp.events.callRemoteUnreliable("SCUBA::Success");
    }

});

// Take screenshot - Key: F8
mp.keys.bind(0x77, false, (player) => {
    var time = mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1);
    var screenName = "gta-world-" + time.year + "-" + time.month + "-" + time.day + "-" + time.hour + "-" + time.minute + "-" + time.second + ".png";
    mp.gui.takeScreenshot(screenName, 1, 100, 0);
    mp.game.graphics.notify("~b~Screenshot taken: \n" +
        "~s~" + screenName + "\n" +
        "~g~RageMP\\screenshots");
});
/*
// Take screenshot - Key: F9
mp.keys.bind(0x78, false, (player) => {
    if (!mp.game.recorder.isRecording()) {
        mp.game.recorder.start(1);
    } else {
        mp.game.recorder.stop();
    }
});*/

var cam = null;
var chatopened = false;
mp.players.local.chatOpen = false;
mp.keys.bind(0x54, true, (player) => { // If Chat was triggered
    if (!chatopened && !cef_opened) {
        chatopened = true;
        mp.players.local.chatOpen = true;
        //mp.events.callRemoteUnreliable("TriggerIsTypingProcess", true); 
    }
});

mp.keys.bind(0x0D, true, (player) => { // If Chat was stopped.
    if (chatopened) {
        chatopened = false;
        mp.players.local.chatOpen = false;
        //mp.events.callRemoteUnreliable("TriggerIsTypingProcess", false);
    }
});

mp.keys.bind(0x1B, true, (player) => {
    if (chatopened) {
        chatopened = false;
        mp.players.local.chatOpen = false;
        //mp.events.callRemoteUnreliable("TriggerIsTypingProcess", false);
    }
});

mp.keys.bind(0x43, true, (player) => {
    if (progressBrowser != null && canBeInterrupted == true && logged) {
        progressBrowser.destroy();
        progressBrowser = null;
        mp.events.callRemote('progressbar_finished', false);
    }
});


mp.keys.bind(0x2E, true, (player) => {
    if (mp.players.local !== null || mp.players.local !== undefined) {
        if (!chatopened) { // if he/she was driver and chat isn't active.
            if (mp.players.local.vehicle) {
                if (isDriver() === true) {
                    var model = mp.players.local.vehicle.getModel();
                    if (IsModelBlocked(model)) {
                        mp.game.graphics.notify("~r~Can't use Cruise Control on this vehicle!");
                        return;
                    }
                    mp.events.call('toggleCruise');
                }
            }
        }
    }
});

function isDriver() {
    if (mp.players.local.vehicle) return mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle;
}


mp.keys.bind(0x25, true, (player) => {
    if (!isPicking)
        return;
    if (!isMoveable) {
        return;
    }

    if (pinDegrees < pinMinDegrees) {
        pinDegrees = pinMinDegrees;
    }
    else if (pinDegrees > pinMinDegrees) {
        pinDegrees -= pinTurnSpeed;
    }
});

mp.keys.bind(0x27, true, (player) => {
    if (!isPicking)
        return;
    if (!isMoveable) {
        return;
    }

    if (pinDegrees > pinMaxDegrees) {
        pinDegrees = pinMinDegrees;
    }
    else if (pinDegrees < pinMaxDegrees) {
        pinDegrees += pinTurnSpeed;
    }
});

mp.keys.bind(0xD, true, (player) => {
    if (!isPicking)
        return;
    if (isMoveable) {
        isMoveable = false;
    }

    let solutionRangeDivided = currentSolutionRange / 2;

    if (pinDegrees <= solutionDegrees + solutionRangeDivided && pinDegrees >= solutionDegrees - solutionRangeDivided) { // Correct degrees found.
        if (lockRotation < lockMaxDegrees) {
            lockRotation += lockTurnSpeed;
        }
        else { // Picklocking successful.
            let streetObj = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
            var streetName = mp.game.ui.getStreetNameFromHashKey(streetObj.streetName);
            let zoneName2 = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
            mp.events.callRemote("PicklockResult", 1, zoneName2, streetName);
            isPicking = false;
        }
    }
    else if (pinDegrees <= solutionDegrees + solutionRangeDivided + currentHalfPickedRangeOffset && pinDegrees >= solutionDegrees - solutionRangeDivided - currentHalfPickedRangeOffset) { // Close to solution.
        if (lockRotation < lockMaxDegrees / 2) {
            lockRotation += lockTurnSpeed;
        }
        else {
            incrementLockpickBrokenProgress();
        }
    }
    else {
        if (lockRotation < lockMaxDegrees / 4) {
            lockRotation += lockTurnSpeed;
        }
        else {
            incrementLockpickBrokenProgress();
        }
    }
});

mp.keys.bind(0xD, false, (player) => {
    if (!isPicking)
        return;
});

let isLWaiting = false;
const L_Wait_Time = 500;

//Hotkeys Script
/* TODO:
- Make send to c#
*/
mp.keys.bind(HotkeySettings.actionKey, true, ActionKeyFunction);
mp.keys.bind(HotkeySettings.garageKey, true, GarageKeyFunction);
mp.keys.bind(HotkeySettings.lockKey, true, LockKeyFunction);
mp.keys.bind(HotkeySettings.inventoryKey, true, InventoryKeyFunction);
mp.keys.bind(HotkeySettings.sirenKey, true, SirenKeyFunction);
mp.keys.bind(HotkeySettings.leftIndicatorKey, true, LeftIndicatorKeyFunction);
mp.keys.bind(HotkeySettings.rightIndicatorKey, true, RightIndicatorKeyFunction);
mp.keys.bind(HotkeySettings.playerlistKey, true, PlayerlistKeyFunction);
mp.keys.bind(HotkeySettings.headlightsKey, true, HeadlightsKeyFunction);

mp.events.add('initializeHotkeys', (hotkeys) => {
    var str = JSON.stringify(hotkeys);
    var Hotkey = JSON.parse(JSON.parse(str));
	//mp.gui.chat.push("Debug Hotkeys: "+str);
	//mp.gui.chat.push("Debug Hotkeys: "+Hotkey);
    if(Hotkey == null || Hotkey.length == 0) return;
    
    if(Hotkey.actionKey != undefined){
        var old = HotkeySettings.actionKey;
        HotkeySettings.actionKey = Hotkey.actionKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.actionKey, ActionKeyFunction);
    }
    if(Hotkey.lockKey != undefined){
        var old = HotkeySettings.lockKey;
        HotkeySettings.lockKey = Hotkey.lockKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.lockKey, LockKeyFunction);
    }
    if(Hotkey.garageKey != undefined){
        var old = HotkeySettings.garageKey;
        HotkeySettings.garageKey = Hotkey.garageKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.garageKey, GarageKeyFunction);
    }
    if(Hotkey.inventoryKey != undefined){
        var old = HotkeySettings.inventoryKey;
        HotkeySettings.inventoryKey = Hotkey.inventoryKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.inventoryKey, InventoryKeyFunction);
    }
    if(Hotkey.sirenKey != undefined){
        var old = HotkeySettings.sirenKey;
        HotkeySettings.sirenKey = Hotkey.sirenKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.sirenKey, SirenKeyFunction);
    }
    if(Hotkey.sirenKey != undefined && Hotkey.sirenELSUpKey != undefined && Hotkey.sirenELSDownKey != undefined){
        HotkeySettings.sirenELSUpKey = Hotkey.sirenELSUpKey;
        HotkeySettings.sirenELSDownKey = Hotkey.sirenELSDownKey;
        mp.events.call("ELS::SetHotKeys", HotkeySettings.sirenELSUpKey, HotkeySettings.sirenELSDownKey, HotkeySettings.sirenKey);
    }
    if(Hotkey.leftIndicatorKey != undefined){
        var old = HotkeySettings.leftIndicatorKey;
        HotkeySettings.leftIndicatorKey = Hotkey.leftIndicatorKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.leftIndicatorKey, LeftIndicatorKeyFunction);
    }
    if(Hotkey.rightIndicatorKey != undefined){
        var old = HotkeySettings.rightIndicatorKey;
        HotkeySettings.rightIndicatorKey = Hotkey.rightIndicatorKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.rightIndicatorKey, RightIndicatorKeyFunction);
    }
    if(Hotkey.playerlistKey != undefined){
        var old = HotkeySettings.playerlistKey;
        HotkeySettings.playerlistKey = Hotkey.playerlistKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.playerlistKey, PlayerlistKeyFunction);
    }
    if(Hotkey.headlightsKey != undefined){
        var old = HotkeySettings.headlightsKey;
        HotkeySettings.headlightsKey = Hotkey.headlightsKey;
        mp.events.call("changeHotKeySetting", old, HotkeySettings.headlightsKey, HeadlightsKeyFunction);
    }
});

mp.events.add('changeHotKeySetting', (oldkey, newkey, func) => {
    mp.keys.unbind(oldkey, true, func);
    mp.keys.bind(newkey, true, func);
});

mp.events.add('saveHotkeys', (keys) => {
    var strSave = JSON.stringify(keys);
    var save = JSON.parse(JSON.parse(strSave));

    mp.events.call("initializeHotkeys",JSON.stringify(save));

    mp.events.callRemote("saveHotKeys",JSON.stringify(save));
});

function ActionKeyFunction(){
    if (logged == 0 || chatopened || cef_opened)
        return;
    mp.events.callRemoteUnreliable('on_foot_action_button');
}

function GarageKeyFunction(){
    if (logged == 0 || chatopened || cef_opened)
        return;
    isLWaiting = true;
    setTimeout(DisableLWait, L_Wait_Time);
    mp.events.callRemoteUnreliable('vehicle_garage_enter');
    mp.events.callRemote('k_pressed');
}

function LockKeyFunction(){
    if (logged == 0 || chatopened || cef_opened || isLWaiting == true)
        return;
    mp.events.callRemote('on_foot_lock_button');
    mp.events.callRemote('lock_vehicle');
    isLWaiting = true;
    setTimeout(DisableLWait, L_Wait_Time)
}

function InventoryKeyFunction(){
    if (logged == 0 || chatopened || cef_opened)
        return;
    if (logged == 1 && !chatopened && !cef_opened)
        mp.events.callRemote('menu_character_personnal');
}

function SirenKeyFunction(){
    if (logged == 0 || chatopened || cef_opened)
        return;

    let vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle) {
        /*if(vehicle.hasVariable("siren_lights")){
            if(vehicle.isSirenOn() != vehicle.getVariable("siren_lights")){
                mp.events.callRemote('UpdateSirenLights', vehicle.isSirenOn());
            }
        }else{
            mp.events.callRemote('UpdateSirenLights', vehicle.isSirenOn());
        }
        */
        if (sirenBlockedVehicleClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('toggleCustomSirenByKey');
    }
    mp.events.callRemote('checkCarWash')
}

function LeftIndicatorKeyFunction(){
    if (logged == 0 || chatopened || cef_opened)
        return;
    let vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedIndicatorClasses.indexOf(vehicle.getClass()) == -1) {
        mp.events.callRemote("toggleIndicator", 1);
    }
}

function RightIndicatorKeyFunction(){
    if (logged == 0 || chatopened || cef_opened)
        return;
    let vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedIndicatorClasses.indexOf(vehicle.getClass()) == -1) 
        mp.events.callRemote("toggleIndicator", 0);
}

function PlayerlistKeyFunction(){
    if (logged == 0 || chatopened  || cef_opened)
		return;
	mp.events.callRemote('playerlist_button');
}

function HeadlightsKeyFunction(){
    if(mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle && !mp.gui.cursor.visible)
        mp.events.callRemote('VehSync::Lights');
}

//

function DisableLWait() {
    isLWaiting = false;
}

mp.events.add('blind', function () {
    mp.game.cam.doScreenFadeOut(250);
});

mp.events.add('stopblind', function () {
    mp.game.cam.doScreenFadeIn(250);
});

mp.events.add('intoTrunk', function(victim, veh){
    const boneIndex = veh.getBoneIndexByName("boot");

    const pos = veh.position;
    const trunkPos = veh.getWorldPositionOfBone(veh.getBoneIndexByName("boot"));

    const offset = {
        'x': trunkPos.x - (pos.x + (1 * veh.getForwardVector().x)),
        'y': trunkPos.y - (pos.y + (1 * veh.getForwardVector().y)),
        'z': 0.5
    }

    // Set our defaults
    const xRot = 0;
    const yRot = 0;
    const zRot = 0;

    const p9 = true;
    const softPin = false;
    const collision = true;
    const isPed = true;

    const vertexInt = 0;
    const fixedRot = true;

    // Manipulate the player
    victim.attachTo(veh.handle, boneIndex,
        0, 0, 0,
        xRot, yRot, zRot,
        p9, softPin, collision, isPed,

        vertexInt, fixedRot
    );
    victim.freezePosition(true);
    victim.setCollision(false, false);
    victim.setInvincible(true);
});

mp.events.add('outOfTrunk', function (victim) {
    // Remove blindfold
    victim.freezePosition(false);
    victim.setCollision(true, true);
    victim.detach(true, false);
    victim.clearTasksImmediately();

    /*const pos = veh.position;
    const trunkPos = veh.getWorldPositionOfBone(veh.getBoneIndexByName("boot"));
    const dist = mp.game.system.vdist(trunkPos.x, trunkPos.y, trunkPos.z, pos.x, pos.y, pos.z);

   // victim.position = veh.getOffsetFromInWorldCoords(0, -dist - 1, 1);
   // victim.setHeading(veh.getHeading());*/
    victim.setInvincible(false);
});

mp.events.add('outOfDestroyedCar', function (victim) {
    // Remove blindfold
    victim.freezePosition(false);
    victim.setCollision(true, true);
    victim.detach(true, false);
    victim.setInvincible(false);
});

mp.gui.chat.show(false);
let chatbox = mp.browsers.new('package://gtalife/chat/index.html');

chatbox.markAsChat();

let autogrammar = false
let ChatBoxDomReady = false


mp.events.add("Chatbox::GetAutoGrammar", (autogrammar) => {
    autogrammar = autogrammar
    if (ChatBoxDomReady) chatbox.execute(`setAutoGrammar(${String(autogrammar)})`);
});

mp.events.add("Chatbox::SetStaff", (toggle) => {
    if (ChatBoxDomReady) chatbox.execute(`setIsStaff(${toggle})`);
})

mp.events.add("browserDomReady", (browser) => {
    if (browser != chatbox) return
    chatbox.execute(`setAutoGrammar(${String(autogrammar)})`)
    ChatBoxDomReady = true
});

setInterval(() => {

    if (IdleCameraDisableStatus) {
        mp.game.invoke('0x9E4CFFF989258472');
        mp.game.invoke('0xF4F2C0D4EE209E20');
    }


    if (isPicking) {
        if (mp.keys.isUp(13)) {
            isMoveable = true;
            lockRotation = 0;
        }
        else if (mp.keys.isUp(17)) {
            //mp.events.callRemote("PicklockResult", 0, API.getZoneNameLabel(API.getEntityPosition(mp.players.local)) + " - " + mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
            //TODO DO IT DIFFERENT HERE
            isPicking = false;
        }
        else if (mp.keys.isUp(72)) {
            showHelp = !showHelp;
        }
    }
    if (mp.keys.isDown(71)) {
        if (logged == 1 && !chatopened && !cef_opened)
            trigger_check_locked = true;
    }
    else if (mp.keys.isDown(37)) {
        if (logged == 0 || chatopened || cef_opened)
            return;
        var localPlayer = mp.players.local;
        if (localPlayer.isInAnyVehicle(false) &&
            localPlayer.seat == -1 &&
            !isVehicleClassBlocked(localPlayer.vehicle))
            mp.events.callRemote('UpdateIndicator', ((e.KeyCode == Keys.Left) ? 1 : 0));
    }
    else if (mp.keys.isDown(115)) {
        if (logged == 0 || chatopened || cef_opened)
            return;
        if (!cef_opened) {
            if (auto_walk) {
                auto_walk = false;
                //mp.game.invoke("CLEAR_PED_TASKS", mp.players.local);
            } else {
                auto_walk = true;
            }
        }
    }
    else if (mp.keys.isDown(82)) {
        if (logged == 0 || chatopened || cef_opened)
            return;
        if (!mp.players.local.isInAnyVehicle(false)) {
            if (can_ragdoll) {
                if (!disabled) {
                    if (cancel) {
                        cancel = false;
                        timer = mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1);
                    }
                    if (mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1) - timer >= 1500) {
                        cancel = true;
                        is_ragdoll = !is_ragdoll;
                        disabled = true;
                    }
                }
            }
        }
    }
    else if (mp.keys.isUp(82)) {
        if (logged == 0 || chatopened || cef_opened)
            return;
        let player = mp.players.local;
        if (player === undefined || player === null)
            return;
        if (player.isInAnyVehicle(false) && player.seat === -1) {
            var veh = local_plr.vehicle;
            if (mp.game.invoke("GET_ENTITY_SPEED", 7, veh) * 2.236936 < 25) {
                mp.events.callRemote("trigger_convertible_roof", veh);
                storage_top_car = veh;
                trigger_top_check = true;
            }
        }
    }
}, 500);

mp.keys.bind(0x73, false, function () { // F4 Key
    if (cef != null) {
        cef.destroy();
        cef = null;
        browser = null;
    }

	mp.events.callRemote('cef_opened', false);
    mp.events.call('destroyBrowser');
    mp.gui.chat.activate(true);
});

class CanineUnit {
    constructor(id, ownerHandle, canineHandle, state, targetHandle, position, unitType) {
        this.id = id;
        this.ownerHandle = ownerHandle;
        this.canineHandle = canineHandle;
        this.state = state;
        this.targetHandle = targetHandle;
        this.posTimer = null;
        this.distTimer = null;
        this.position = position;
        this.unitType = unitType;
        this.animInfo = null;
        this.positionex_X = null;
        this.positionex_Y = null;
        this.positionex_Z = null;
    }

    init() {
        // Only call init() for the owner of the K-9
        this.posTimer = setInterval(() => {
            this.sendPositionLoop();
        }, 1000);

        this.distTimer = setInterval(() => {
            this.checkDistanceLoop();
        }, 2000);
    }

    sendPositionLoop() {
        if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
            var coord = this.canineHandle.getCoords(true);
            this.position = coord;
            if (coord != null)
                mp.events.callRemoteUnreliable('update_canine_position', this.ownerHandle, coord.x, coord.y, coord.z);
        }
    }

    checkDistanceLoop() {
        if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
            // Check if distance is more than streaming range.
            var coords = this.canineHandle.getCoords(true);
            var dist = mp.game.gameplay.getDistanceBetweenCoords(mp.players.local.position.x,
                mp.players.local.position.y,
                mp.players.local.position.z,
                coords.x,
                coords.y,
                coords.z, true);
            if (dist >= 350)
                mp.events.callRemote('force_delete_canine', this.ownerHandle);
        }
    }

    cleanUp() {
        // Clean up everything
        if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist())
            this.canineHandle.destroy()

        if (this.posTimer !== null && this.posTimer !== undefined)
            clearInterval(this.posTimer);

        if (this.distTimer !== null && this.distTimer !== undefined)
            clearInterval(this.distTimer);
    }

    async playAnim() {
        if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
            if (this.animInfo !== null && this.animInfo !== undefined) {
                mp.game.streaming.requestAnimDict(this.animInfo[0]);
                for (let i = 0; !mp.game.streaming.hasAnimDictLoaded(this.animInfo[0]) && i < 1500; i++) await mp.game.waitAsync(0);

                this.canineHandle.taskPlayAnim(this.animInfo[0], this.animInfo[1], 8.0, 0, -1, 1, 0.0, false, false, false);
            }
        }
    }

    setState() {
        switch (this.state) {
            case 0: // Idle
                if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                    this.canineHandle.clearTasksImmediately();
                }
                break;
            case 1: // Follow me
                if (this.ownerHandle !== null && this.ownerHandle !== undefined && mp.players.exists(this.ownerHandle)) {
                    if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                        this.canineHandle.clearTasksImmediately();
                        this.canineHandle.taskFollowToOffsetOf(this.ownerHandle.handle, 0, 0, 0, 5, -1, 10.0, true);
                    }
                }
                break;
            case 2: // Goto me
                if (this.ownerHandle !== null && this.ownerHandle !== undefined && mp.players.exists(this.ownerHandle)) {
                    if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                        this.canineHandle.clearTasksImmediately();
                        var pos = this.ownerHandle.position;
                        this.canineHandle.taskGoStraightToCoord(pos.x, pos.y, pos.z, 5, -1, 270, 1.0);
                    }
                }
                break;
            case 3: // Attack
                if (this.targetHandle !== null && this.targetHandle !== undefined && mp.players.exists(this.targetHandle)) {
                    if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                        this.canineHandle.clearTasksImmediately();
                        this.canineHandle.taskCombat(this.targetHandle.handle, 0, 16);
                    }
                }
                break;
            case 4: // Tackle
                if (this.targetHandle !== null && this.targetHandle !== undefined && mp.players.exists(this.targetHandle)) {
                    if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                        this.canineHandle.clearTasksImmediately();
                        this.canineHandle.taskCombat(this.targetHandle.handle, 0, 16);
                    }
                }
                break;
            case 5: // WanderTrack
                if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                    this.canineHandle.clearTasksImmediately();
                    this.canineHandle.taskWanderInArea(this.position.x, this.position.y, this.position.z, 50, 0, 0);
                    if (this.ownerHandle !== null && this.ownerHandle !== undefined && mp.players.exists(this.ownerHandle)) {
                        if (this.ownerHandle === mp.players.local) {
                            setTimeout(() => {
                                mp.events.callRemote('canine_wandertrack_completed');
                            }, 12000);
                        }
                    }
                }
                break;
            case 6: // Track
                if (this.targetHandle !== null && this.targetHandle !== undefined && mp.players.exists(this.targetHandle)) {
                    if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                        this.canineHandle.clearTasksImmediately();
                        var pos = this.targetHandle.position;
                        this.canineHandle.taskGoStraightToCoord(pos.x, pos.y, pos.z, 10.0, -1, 270, 1.0);
                    }
                }
                break;
            case 7: // Wander
                if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                    this.canineHandle.clearTasksImmediately();
                    this.canineHandle.taskWanderInArea(this.position.x, this.position.y, this.position.z, 50, 0, 0);
                }
                break;
            case 8: // GotoLocation
                if (this.canineHandle !== null && this.canineHandle !== undefined && this.canineHandle.doesExist()) {
                    this.canineHandle.clearTasksImmediately();
                    this.canineHandle.taskGoStraightToCoord(this.positionex_X, this.positionex_Y, this.positionex_Z, 10.0, -1, 270, 1.0);
                }
                break;
            default:
                break;
        }
    }
}

class HeadNotification {
    constructor(text) {
        // why on earth does this take arguments? damn ragemp
        this.resolution = mp.game.graphics.getScreenActiveResolution(0, 0);

        this.text = text;
        this.startDuration = duration;

        this.alpha = 255;
        this.offset = 0;

        this.onUpdateEventHandler = mp.events.add('render', () => this.onUpdateHandler());
    }

    onUpdateHandler() {
        if (this.alpha <= 0) {
            return;
        }

        mp.game.graphics.drawText(
            this.text,
            [0.5, 0.5 + this.offset], {
            font: 4,
            color: [255, 255, 255, this.alpha],
            scale: [0.5, 0.5],
            outline: true
        });

        this.offset -= 0.0005;
        this.alpha -= 1;
    }
}

mp.events.add(
    {
        "createNewHeadNotificationAdvanced": (notificationText) => {
            new HeadNotification(notificationText);
        },

        "start_progressbar": (pType, pDuration, pCanBeInterrupted) => { // Converting needs finished.
            type = pType;
            duration = pDuration;
            canBeInterrupted = pCanBeInterrupted;
            // progressBrowser = API.createCefBrowser(250, 250);
            const leftPos = (resolution.y / 2) - (250 / 2);
            const topPos = 4 * (resolution.x / 5) - (250 / 2);
            let progressBrowser = mp.browsers.new("package://gtalife/library/ProgressBarTemplate.html");
            //API.setCefBrowserPosition(progressBrowser, leftPos, topPos);
            mp.gui.cursor.show(false, false);
            mp.gui.chat.activate(true);
        },

        "setWaypoint": (x, y) => { // Converting needs finished.
            mp.game.ui.setNewWaypoint(x, y);
        },


        "removeWaypoint": () => {
            /*if (API.isWaypointSet()) {
                API.removeWaypoint();
            }*/
        },

        "endTaxiRental": () => {
            endRental();
        },

        "remove_taxidespawn_blip": () => {
            removeBlip();
        },

        "resurrect": () => {
            mp.players.local.resurrect();
            mp.players.local.health = 100;
        },

        "blip_create": (name, position, color) => {
            BlipHelper.createBlip(name, position, color);
        },

        "blip_color": (name, color) => {
            BlipHelper.colorBlip(name, color);
        },

        "blip_create_ext": (name, position, color, size) => {
            BlipHelper.createBlipExt(name, position, color, size);
        },

        "blip_remove": (name) => {
            BlipHelper.removeBlip(name);
        },

        "blip_move": (name, position) => {
            BlipHelper.moveBlip(name, position);
        },

        "blip_color": (name, color) => {
            BlipHelper.colorBlip(name, color);
        },

        "blip_router_visible": (name, enabled) => {
            BlipHelper.SetRoute(name, enabled);
        },

        "gps_set_loc": (nearestX, nearestY) => {
            mp.game.ui.setNewWaypoint(nearestX, nearestY);
        },

        "login_camera_location": () => {
            cam = mp.cameras.new('default', new mp.Vector3(-436.0717, 1039.26, 372.1287), new mp.Vector3(3.063985, 0.0, -170.8151), 60);
            cam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
        },

        "reset_camera": () => {
            if(cam != null) {
                cam.setActive(false);
                cam.destroy();
                cam = null;
            }
            mp.game.cam.renderScriptCams(false, false, 0, true, false);
        },

        "logged": () => {
            logged = 1;
            //mp.game.graphics.transitionToBlurred(0);
            mp.game.ui.displayRadar(true);
        },

        "browser_created": () => {
            cef_opened = true;
        },

        "browser_destroyed": () => {
            cef_opened = false;
        },

        "get_weapons": () => {
            const localPlayer = mp.players.local;
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
                        weapons[weapon] = { ammo: localPlayer.getAmmoWeapon(weapon) };
                    }
                });
                mp.events.callRemote('send_weaponlist', weapons);
            };
        },
        "account_set_remember_username": (username) => {
            if (typeof mp.storage.data !== 'undefined') {
                mp.storage.data.rememberuser = username;
            }
        },
        "clear_task_all": () => {
            mp.players.local.clearTasksImmediately();
            mp.events.callRemote('clear_task_remote');
        },
        "clear_task": (player) => {
            try {
                if (player != undefined)
                    player.clearTasksImmediately();
            } catch (e) { }
        },
        "TwoFactor::ShowTwoFactorPinEnterPage": () => {
            mp.events.call('createBrowser', ['package://gtalife/login/twofactor.html']);
        },
        "queue_moved_back": () => {
            mp.events.call('destroyBrowser');
        },
        "account_prompt_login": () => {
            mp.game.invoke("0x0F07E7745A236711")
            mp.events.call('createBrowser', ['package://gtalife/login/login.html']);

            if (typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.rememberuser !== 'undefined' && mp.storage.data.rememberuser) {
                mp.events.call('executeFunction', ["setUsername", mp.storage.data.rememberuser]);
            }
            else {
                mp.events.call('executeFunction', ["uncheckRememberMe"]);
            }

            mp.discord.update("GTAW Roleplay", "gta.world");
            //mp.game.graphics.transitionToBlurred(500);
            mp.game.ui.displayRadar(false);
            mp.game.gameplay.enableMpDlcMaps(true);
            mp.game.player.disableVehicleRewards();
            mp.game.player.setHealthRechargeMultiplier(0.0);
            mp.game.streaming.requestIpl("ex_dt1_02_office_02b");//-141.1987, -620.913, 168.8205
            mp.game.streaming.requestIpl("ex_dt1_11_office_01c");//-75.47446, -827.2621, 243.386
            mp.game.streaming.requestIpl("ex_sm_13_office_03c");//-1579.693, -564.8981, 108.5229
            mp.game.streaming.requestIpl("ex_sm_15_office_03b");//-1392.528, -480.475, 72.04206
            mp.game.streaming.requestIpl("apa_v_mp_h_01_a");
            mp.game.streaming.requestIpl("coronertrash");//275.446, -1361.11, 24.5378
            mp.game.streaming.requestIpl("Coroner_Int_On");
            mp.game.streaming.requestIpl("farm");//2469.03, 4955.278, 45.11892
            mp.game.streaming.requestIpl("farm_props");
            mp.game.streaming.requestIpl("farmint");
            mp.game.streaming.removeIpl("farmint_cap");
            mp.game.streaming.removeIpl("CS1_02_cf_offmission");
            mp.game.streaming.requestIpl("cargoship");
            mp.game.streaming.removeIpl("facelobbyfake");
            mp.game.streaming.requestIpl("facelobby");
            mp.game.streaming.removeIpl("fakeint");
            mp.game.streaming.requestIpl("shutter_open");
            mp.game.streaming.requestIpl("shr_int");
            mp.game.streaming.removeIpl("v_carshowroom");
            mp.game.streaming.requestIpl("refit_unload");
            mp.game.streaming.requestIpl("SP1_10_real_interior");
            mp.game.streaming.requestIpl("FINBANK");//2.6968, -667.0166, 16.13061
            mp.game.streaming.requestIpl("redCarpet");//300.5927, 300.5927, 104.3776
            mp.game.streaming.requestIpl("SUNK_SHIP_FIRE");
            mp.game.streaming.removeIpl("sheriff_cap");
            mp.game.streaming.removeIpl("SP1_10_fake_interior");
            mp.game.streaming.removeIpl("CS1_16_Sheriff_Cap");
            mp.game.streaming.requestIpl("hei_dt1_19_interior_0_heist_police_dlc_milo_")
        },

        "account_prompt_register": () => {
            mp.events.call('createBrowser', ['package://gtalife/login/register.html']);
            //mp.game.graphics.notify("Type ~r~/login [username] [password]~w~ to login to the server.");
        },

        "voice_start": (url) => {
            mp.events.call('createBrowser', [url]);
        },

        "voice_stop": () => {
            if (cef != null) {
                cef.destroy();
                cef = null;
                browser = null;
            }
        },

        "account_prompt_creation": (typeChar) => {
            mp.events.call('createBrowser', ['package://gtalife/login/character_creation.html', typeChar]);
        },

        "account_charlist": (characterNum, secondNum) => { // these parameters needs done by nervous.
            var characterNum = characterNum;
            var isLeadAdmin = characterNum + 1;
            var maxChar = 3;
            var charSelectMenu = new Menu("SELECT CHARACTER", "Choose a Character", new Point(posX, posY));

            charSelectMenu.Clear();

            for (var i = 0; i < characterNum; i++) {
                var charname = args[i + 1];
                var charItem = new UIMenuItem(charname,
                    "You should select which of your characters you wish to use here.");
                charSelectMenu.AddItem(charItem);
            }
            var charItemCreate = new UIMenuItem("Create new character", "Maximum of " + maxChar + " characters");
            if (characterNum < maxChar)
                charSelectMenu.AddItem(charItemCreate);
            charSelectMenu.Visible = true;
            mp.game.graphics.notify("~r~Please select your character.");
            charSelectMenu.ItemSelect.on((item) => {
                if (item.Text == "Create new character")
                    mp.events.callRemote('create_character_request');
                else {
                    mp.events.callRemote('account_selected', item.Text, email);
                    mp.game.graphics.notify('You have selected chracter: ~b~' + item.Text + '~w~.');
                }
                charSelectMenu.Visible = false;
            });
        },

        "debug_set_email": (email) => {
            email = email;
        },

        "send_player_dialogbox": () => {
            mp.events.call('createBrowser', ['package://gtalife/login/dialog_player.html']);
            mp.gui.cursor.show(true, false);
            mp.gui.chat.activate(false);
        },

        "refresh_browser": () => {
            if (cef != null) {
                cef.destroy();

                browser = null;
            }
        },

        "destroy_cef": () => {
            if (cef != null) {
                cef.destroy();
                cef = null;
                browser = null;
            }
            mp.events.callRemote('cef_opened', false);
            mp.events.call('destroyBrowser');
            mp.gui.chat.activate(true);
        },


        "send_create_faction": () => {
            mp.events.call('createBrowser', ['package://gtalife/login/dialog_create_faction.html']);
            mp.gui.cursor.show(true, false);
            mp.gui.chat.activate(false);
        },

        "send_player_givemoney": () => {
            mp.events.call('createBrowser', ['package://gtalife/login/dialog_givemoney.html']);
            mp.gui.cursor.show(true, false);
            mp.gui.chat.activate(false);
        },

        "send_check_plate": () => {
            mp.events.call('createBrowser', ['package://gtalife/login/dialog_plate.html']);
            mp.gui.cursor.show(true, false);
            mp.gui.chat.activate(false);
        },

        "send_invite_faction": () => {
            mp.events.call('createBrowser', ['package://gtalife/login/dialog_invite_faction.html']);
            mp.gui.cursor.show(true, false);
            mp.gui.chat.activate(false);
        },

        "markonmap": (x, y) => {
            mp.game.ui.setNewWaypoint(x, y);
        },

        "sounds_PD": (sound) => {
            //API.startMusic("Files/Clientside/sounds/" + sound, false);
        },

        "client_open_mdc": () => {
            mp.events.callRemote('open_menu_mdc');
        },

        "is_mask_valid": () => {
            if (mp.players.local.isComponentVariationValid(1, 57, 0)) {
                mp.events.callRemote('mask_valid_result', true);
            } else {
                mp.events.callRemote('mask_valid_result', false);
            }
        },

        "is_mask_valid_name_only": () => {
            if (mp.players.local.isComponentVariationValid(1, 57, 0)) {
                mp.events.callRemote('mask_valid_result_name_only', true);
            } else {
                mp.events.callRemote('mask_valid_result_name_only', false);
            }
        },

        "cef_opened_client": (input) => {
            cef_opened = input;
        },

        "SuicideAnimReporter": (aProgress, aName, aTime) => {
            animInProgress = aProgress;
            animName = aName;
            animTime = aTime;
            shotFired = false;
            startTime = mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1);
        },

        "start_shake": (shakeAmount) => {
            mp.game.cam.shakeGameplayCam("HAND_SHAKE", shakeAmount);
        },

        "set_drunken": (drunkAmount) => {
            //API.setPlayerIsDrunk(mp.players.local, drunkAmount); // Needs converted still.
        },

        "stop_shake": () => {
            mp.game.cam.stopGameplayCamShaking(true);
        },

        "set_ped_component_variation": (player, componentId, drawableId, textureId, paletteId) => {
            player.setComponentVariation(componentId, drawableId, textureId, paletteId);
        },

        "play_screen_effect": (effectName, duration, looped) => {
            mp.game.graphics.startScreenEffect(effectName, duration, looped);
        },

        "stop_screen_effect": (effectName) => {
            mp.game.graphics.stopScreenEffect(effectName);
        },

        "show_cef": (url) => {
            mp.events.call('createBrowser', [url]);
            mp.game.graphics.notify("Use ~b~F4~w~ to close the interface.");
            mp.events.callRemote("cef_opened", true);
            mp.gui.cursor.show(true, true);
            mp.gui.chat.activate(false);
        },

        "show_cef_fullscreen": (url) => {
            mp.events.call('createBrowser', [url]);
            mp.game.graphics.notify("Use ~b~F4~w~ to close the interface.");
            mp.events.callRemote("cef_opened", true);
            mp.gui.cursor.show(true, false);
            mp.gui.chat.activate(false);
        },

        "show_badge": (url) => {
            mp.events.call('createBrowser', [url]);
            mp.game.graphics.notify("Use ~b~F4~w~ to close the badge.");
            mp.events.callRemote("cef_opened", true);
            mp.gui.cursor.show(false, false);
            mp.gui.chat.activate(true);
        },

        "show_cef_radio": (url) => {
            mp.events.call('createCinemaBrowser', [url]);
            mp.game.audio.setRadioToStationName("OFF");
            mp.game.audio.setUserRadioControlEnabled(true);
            //mp.game.graphics.notify("Use ~b~F4~w~ to close XMR interface.");
            //mp.events.callRemote("cef_opened", true);
            //mp.gui.cursor.show(false, false);
            //mp.gui.chat.activate(true);
        },

        "show_cef_cinema": (url) => {
            mp.events.call('createCinemaBrowser', [url]);
            mp.game.graphics.notify("Use ~b~F4~w~ to close the interface.");
            mp.events.callRemote("cef_opened", true);
            mp.gui.cursor.show(false, false);
            mp.gui.chat.activate(true);
        },

        "mute": (admin) => {
            mp.gui.chat.activate(false);
            mp.game.graphics.notify("You have been muted by " + admin);
        },

        "SetPlayerWalkingStyle": (player, animSet) => {
            if (player.isAPlayer())
                setWalkingStyle(player, animSet);
        },

        "ResetPlayerWalkingStyle": (player) => {
            if (player.isAPlayer())
                player.resetMovementClipset(0.0);
        },

        "SetPlayerMood": (player, animName) => {
            mp.game.invoke("0xFFC24B988B938B38", player.handle, mood, 0);
        },



        "ResetPlayerMood": (player) => {
            player.clearFacialIdleAnimOverride();
        },

        "unmute": (admin) => {
            mp.gui.chat.activate(true);
            mp.game.graphics.notify("You have been unmuted by " + admin)
        },

        "get_vehicle_street": () => {
            const position = mp.players.local.position;
            let streetObj = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
            var streetName = mp.game.ui.getStreetNameFromHashKey(streetObj.streetName);
            mp.events.callRemote("return_vehicle_street", streetName);
        },

        "display_animation_menu": () => {
            var anim_menu = new Menu("Animations", "Animations", new Point(posX, posY));
            anim_menu.AddItem(new UIMenuItem("Sitting", "Sitting animations"));
            anim_menu.AddItem(new UIMenuItem("Laying", "Laying animations"));
            anim_menu.AddItem(new UIMenuItem("Standing", "Standing animations"));
            anim_menu.AddItem(new UIMenuItem("Eat / Drink", "Eat and drink animations"));
            anim_menu.AddItem(new UIMenuItem("Working", "Working animations"));
            anim_menu.AddItem(new UIMenuItem("Expressions", "Expressive animations"));
            anim_menu.AddItem(new UIMenuItem("Phone", "Phone animations"));
            anim_menu.AddItem(new UIMenuItem("Ground", "Ground animations"));
            anim_menu.AddItem(new UIMenuItem("Leaning", "Leaning animations"));
            anim_menu.AddItem(new UIMenuItem("Surrender", "Surrender animations"));
            anim_menu.AddItem(new UIMenuItem("Social", "Social animations"));
            anim_menu.AddItem(new UIMenuItem("Adult", "Adult animations"));
            anim_menu.AddItem(new UIMenuItem("Items", "Animations with items required"));
            anim_menu.AddItem(new UIMenuItem("Gestures", "Gestures animations"));
            anim_menu.AddItem(new UIMenuItem("Fighting", "Fighting animations"));
            anim_menu.AddItem(new UIMenuItem("~y~Stop", "Stop playing animation."));
            anim_menu.AddItem(new UIMenuItem("~r~Exit", "Close menu."));

            anim_menu.ItemSelect.on((item) => {
                if (item.Text === "~r~Exit") {
                    anim_menu.Visible = false;
                    anim_menu.Close();
                }
                else if (item.Text === "~y~Stop") {
                    mp.events.callRemote('play_anim', 'stop');
                    ragdoll_debounce = false;
                    falling_debounce = false;
                }
                else {
                    var anim_sub_menu = new Menu("", "", new Point(posX, posY));
                    anim_menu.Visible = false;
                    anim_sub_menu.Clear();
                    if (item.Text === "Sitting") {
                        anim_sub_menu.AddItem(new UIMenuItem("sit", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit6", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit7", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit8", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit9", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sit10", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("elbowsit", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("elbowsit2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitground", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitground2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sidesit", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sidesit2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitbeer", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitbeerdrunk", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("lazy", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("stairssit", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("desksitreading", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("deskwork", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("desksit1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("desksit2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("toiletsit", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("weepingsit", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair13", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair25", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair27", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair30", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair4", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair5", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair6", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair3", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair7", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair42", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair8", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair9", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair10", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair11", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair12", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair14", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair15", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair16", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair17", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair18", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair19", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair20", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair21", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair22", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitonbed1", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair23", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair24", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair26", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair28", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair29", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair31", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair32", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair33", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair34", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair35", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair36", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair37", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair38", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair39", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair40", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("sitchair41", "Animation")); // Sit.
                        anim_sub_menu.AddItem(new UIMenuItem("chillsit1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("chillsit2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("chillsit3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("chillsit4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("playdrums1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("resthanddriverlow", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("resthanddriverhigh", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("resthandpassenger", "Animation"));
                    }
                    else if (item.Text === "Items") {
                        anim_sub_menu.AddItem(new UIMenuItem("smoke1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("smoke2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("smoke3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("smoke3.5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("smoke4", "Animation"));
                    }
                    else if (item.Text === "Laying") {
                        anim_sub_menu.AddItem(new UIMenuItem("liedown1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("liedown2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("liedown3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("liedown4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("liedown5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("layleft", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("layright", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("laydead", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hitfall1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hitfall2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("laycouch", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sunbatheback", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sunbathefront", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sunbatheback2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sunbathefront2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("getup", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("seizure", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("knockedout1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("knockedout2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("proneaim", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("pickupbody", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("grounddigging", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("legscrossedground", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sleepread", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sleep1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sleep2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("throwuptoilet", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitgroundvidoegame", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("meditate", "Animation"));
                    }
                    else if (item.Text === "Standing") {
                        anim_sub_menu.AddItem(new UIMenuItem("bumsign1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bumsign2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bumsign3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bumcart", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bumcart1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bumcart2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("camera1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("camera2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("camera3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("camera4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("binoculars1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("binoculars2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("aim1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("aim2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("aim3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("aim4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("clean", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("clean2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("clipboard1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("clipboard2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("crossarms1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("crossarms2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("thinking", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("idle1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("idle2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("stretch", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("stretch2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("arrogantstance", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shystance", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("friskstance", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("standbar", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("johnwayne", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("handonhip", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fightingwords", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("jazzercise", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shower", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("ravedance", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sassystand", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sassyblowkiss", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("crossedhands1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("crossedhands2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalecrossedarms1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalecrossedarms2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femaleholdarm1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("malecrossedarms1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalepose1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("warminghands", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalestanding1", "Animation")); // Standing.
                        anim_sub_menu.AddItem(new UIMenuItem("femalestanding2", "Animation")); // Standing.
                        anim_sub_menu.AddItem(new UIMenuItem("femalestanding3", "Animation")); // Standing.
                        anim_sub_menu.AddItem(new UIMenuItem("idle55", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("idle56", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("idle57", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("idle58", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("idle59", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("idle60", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("doorknock", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cough", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("61", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("62", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("63", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("64", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("65", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("66", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuListItem("crossedarms", "Animation"));
                    }
                    else if (item.Text === "Eat / Drink") {
                        anim_sub_menu.AddItem(new UIMenuItem("walkdrink", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("walkdrink2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("walkeat1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("walkeat2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("walkeat3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("coffee1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("coffee2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("ciderhold", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("tequilahold", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("emptyglasshold", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("wineglasshold", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("beerhold", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("champagnehold", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shot", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leanwine", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leandrink", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leanbrownbag", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydancedrinking", "Animation"));
                    }
                    else if (item.Text === "Expressions") {
                        anim_sub_menu.AddItem(new UIMenuItem("finger", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fuck", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fuckyou", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("crackhands", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("claphands", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shagging", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("airguitar", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("synth", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("kiss", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bro", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("chicken", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("chin", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("dj", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("dock", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("facepalm", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fingerkiss", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("freakout", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("jazzhands", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("knuckle", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("nose", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("no", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("peace", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("photo", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("rock", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("salute", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("salute2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shush", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("slowclap", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("surrender", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("thumbs", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("taunt", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("vsign", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("wank", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("wave", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("loco", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("ok", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("thumbsup", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("ontheground", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("fight1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight6", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight7", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight8", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight9", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight10", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fight11", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("gabagool1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("gabagool2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("finger3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("finger4", "Animation"));
                    }
                    else if (item.Text === "Working") {
                        anim_sub_menu.AddItem(new UIMenuItem("jackhammer", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hammer", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("mechanic", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("mechanic1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("mechanic2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("mechanic3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("mechanic4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("jerrycan", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("trafficleft1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("trafficleft2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("trafficleft3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("trafficleft4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("standingkeyboard", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("enginemechanic1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("enginemechanic2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("copwalk1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("copwalk2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("copwalk3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("copwalk4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("medicalbag", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("gurney", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cprstart", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cprbreath", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cpr", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cprfail", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bartenderpour", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cleanwall", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("pcase", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bcase", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("camera1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("camera2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("camera3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("camera4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("clipboard1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("clipboard2", "Animation"));
                        //anim_sub_menu.AddItem(new UIMenuItem("pelicanbriefcase", "Animation"));
                        //anim_sub_menu.AddItem(new UIMenuItem("brownbriefcase", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("malehandsonhips", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("interview", "Animation"));
                    }
                    else if (item.Text === "Phone") {
                        anim_sub_menu.AddItem(new UIMenuItem("phone1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("phone2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("phone3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("phone4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("phone5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("takepic", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("texting", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("phoneconvo", "Animation"));
                    }
                    else if (item.Text === "Ground") {
                        anim_sub_menu.AddItem(new UIMenuItem("crouch", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("prone", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fix1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fix2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("checkbody1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("checkbody2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("checkbody", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("getup", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cover", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("seizure", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("knockedout1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("knockedout2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("proneaim", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("pickupbody", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("grounddigging", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("legscrossedground", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sleepread", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sleep1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sleep2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hitfall1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hitfall2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("throwuptoilet", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitgroundvideogame", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("meditate", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("walkcrouched1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sitground4", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("groundhurt1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("bodyonground1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("bodyonground2", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("handsup5", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("femalehostage1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("femalehostage2", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("dontshoot2", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("dontshoot3", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("onground1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("crouched1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("takingcover3", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("crying1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("takingcover4", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("hostage1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("handsup6", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("layingonground1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("crouched2", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("sitground5", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("sitground6", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("dead1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("layingonground2", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("dead2", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("massageonground1", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("walkcrouched1", "Animation")); // Ground.
                    }
                    else if (item.Text === "Leaning") {
                        anim_sub_menu.AddItem(new UIMenuItem("lean", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leanfoot", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leancar", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leanrail", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leanrailsmoking", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sidelean", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sidelean1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sidelean2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sidelean3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("sidelean4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bartenderlean", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leancounter", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leancounterwave", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leancounternazi", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("leancounteridle", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("legscrossedlean1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("legscrossedlean2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("handraillean", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("counterleanbar", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("counterleanbar1", "Animation")); // CounterLean.
                        anim_sub_menu.AddItem(new UIMenuItem("counterleanbar2", "Animation")); // CounterLean.
                        anim_sub_menu.AddItem(new UIMenuItem("femaleleaning1", "Animation")); // Leaning.
                    }
                    else if (item.Text === "Surrender") {
                        anim_sub_menu.AddItem(new UIMenuItem("handsup", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("handsup2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("handsup4", "Animation")); // HandsUp.
                        anim_sub_menu.AddItem(new UIMenuItem("handsup5", "Animation")); // Ground.
                        anim_sub_menu.AddItem(new UIMenuItem("halt", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("handsupknees", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("handsupknees2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cowerhide", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cowerlook1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cowerlook2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cowerlook3", "Animation"));
                    }
                    else if (item.Text === "Social") {
                        anim_sub_menu.AddItem(new UIMenuItem("point", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("pushups", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("crunches", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("chinups", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("guitar", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("drums", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("yoga1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("yoga2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("barman1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("barman2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("barman3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shot1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shot2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shot3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("chinups", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fishing", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("garbage", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("garbagethrow", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cheering", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("excited", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("breakin1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("locksafe", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("timid", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("slutty1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("slutty2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("slutty3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("slutty4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("slutty5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("slutty6", "Animation")); // FemaleSlutty.
                        anim_sub_menu.AddItem(new UIMenuItem("femalepose2", "Animation")); // FemalePose.
                        anim_sub_menu.AddItem(new UIMenuItem("slutty7", "Animation")); // FemaleSlutty.
                        anim_sub_menu.AddItem(new UIMenuItem("slutty8", "Animation")); // FemaleSlutty.
                        anim_sub_menu.AddItem(new UIMenuItem("slutty9", "Animation")); // FemaleSlutty.
                        anim_sub_menu.AddItem(new UIMenuItem("femaleattitude", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalestance1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalestance2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalestance3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalestance4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalestance5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("toughguy1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("toughguy2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("purse", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shoppingbag", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("exhausted", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("pee", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hippy", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("holdingback", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("wassup", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("tense", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("letsfight", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("creeperledge", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("upset", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("ledgetaking", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("arguingleave", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("arguing", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("talkinggestures1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("talkinggestures2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("talkinggestures3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("talkinggestures4", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("talkinggestures5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("worried", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hangover", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("toodrunk", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("needtopee", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("antsy", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("antsyknocking", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("antsyknocking1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("beltgrab", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hangout", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("guitar1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("guitar2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("guitar3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("publicshit", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("scared1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("scared2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("scared3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("paying1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalecheer1", "Animation")); // FemaleCheering.
                        anim_sub_menu.AddItem(new UIMenuItem("femalecheer2", "Animation")); // FemaleCheering.
                        anim_sub_menu.AddItem(new UIMenuItem("femalecheer3", "Animation")); // FemaleCheering.
                        anim_sub_menu.AddItem(new UIMenuItem("femalecheer4", "Animation")); // FemaleCheering.
                        anim_sub_menu.AddItem(new UIMenuItem("malecheer1", "Animation")); // MaleCheering.
                        anim_sub_menu.AddItem(new UIMenuItem("malecheer2", "Animation")); // MaleCheering.
                        anim_sub_menu.AddItem(new UIMenuItem("malecheer3", "Animation")); // MaleCheering.
                        anim_sub_menu.AddItem(new UIMenuItem("malecheer4", "Animation")); // MaleCheering.
                        anim_sub_menu.AddItem(new UIMenuItem("pushups1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("scared1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("scared2", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("scared3", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("crossedhands1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("femalecrossedarms1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("femalecrossedarms2", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("femaleholdarm1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("malecrossedarms1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("femaledance1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("femaledance2", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("femaledance3", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("pointingup1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("lookingup1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("crying2", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("handwave1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("handwave2", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("handwave3", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("scared4", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("scared5", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("armswave1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("crying3", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("cower1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("girlflirting1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("meditation1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("crossedhands3", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("startrace1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("malepose1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("crying4", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("crying5", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("whistle1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("praying1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("yoga1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("clean3", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("tired1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("dancing5", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("dancing4", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("dancing6", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("dancing7", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("dancing8", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("thinking2", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("autostop1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("warming1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("femalestance7", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("femalewalk1", "Animation")); // Social.
                        anim_sub_menu.AddItem(new UIMenuItem("partydance1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance2", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance3", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance4", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance5", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance6", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance7", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance8", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance9", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance10", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance11", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance12", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance13", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance14", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance15", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance16", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance17", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("cripwalk", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance18", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance19", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance20", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance21", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance22", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("twerk2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance23", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance24", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance25", "Animation"));	
                        anim_sub_menu.AddItem(new UIMenuItem("partydance26", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance27", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance28", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance29", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance30", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance31", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance32", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance33", "Animation")); 
                        anim_sub_menu.AddItem(new UIMenuItem("partydance34", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance35", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance36", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance37", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance38", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance39", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance40", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance41", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance42", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance43", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance44", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance45", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance46", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("partydance47", "Animation"));
                    }
                    else if (item.Text === "Adult") {
                        anim_sub_menu.AddItem(new UIMenuItem("fuckyou", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("blowjob", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("fucking", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bendover", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("poledance1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("poledance2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("poledance3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("lapdance", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("dance", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("twerk", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("bracingpump", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("kamasutra", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("thrust", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("thrust", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("femalefuck1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("malefuck1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("massage1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("massage2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("stripperidle1", "Animation")); // StripperIdle.
                        anim_sub_menu.AddItem(new UIMenuItem("stripperidle2", "Animation")); // StripperIdle.
                        anim_sub_menu.AddItem(new UIMenuItem("stripperidle3", "Animation")); // StripperIdle.
                        anim_sub_menu.AddItem(new UIMenuItem("stripperidle4", "Animation")); // StripperIdle.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance1", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance2", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance3", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripperidle5", "Animation")); // StripperIdle.
                        anim_sub_menu.AddItem(new UIMenuItem("stripperidle6", "Animation")); // StripperIdle.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance4", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance5", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance6", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance7", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance8", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance9", "Animation")); // StripDance.
                        anim_sub_menu.AddItem(new UIMenuItem("stripdance10", "Animation")); // StripDance.
                    }
                    else if (item.Text === "Items") {
                        anim_sub_menu.AddItem(new UIMenuItem("smoke1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("smoke2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("smoke3", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("smoke3.5", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("smoke4", "Animation"));
                    }
                    else if (item.Text === "Fighting") {
                        anim_sub_menu.AddItem(new UIMenuItem("hitfall1", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("hitfall2", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("lowkick", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("meleehitground", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("middlekick", "Animation"));
                    }
                    else if (item.Text === "Gestures") {
                        anim_sub_menu.AddItem(new UIMenuItem("bringiton", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("damn", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shakehead", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("easynow", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("headnod", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("shrug", "Animation"));
                        anim_sub_menu.AddItem(new UIMenuItem("why", "Animation"));
                    }
                    anim_sub_menu.AddItem(new UIMenuItem("~y~Stop", "Animation"));
                    anim_sub_menu.AddItem(new UIMenuItem("~r~Exit", "Animation"));
                    anim_sub_menu.RefreshIndex();
                    anim_sub_menu.MenuClose.on(function (player) {
                        anim_menu.Visible = true;
                        anim_menu.RefreshIndex();
                    });
                    anim_sub_menu.Visible = true;
                    anim_sub_menu.ItemSelect.on((item) => {
                        if (item.Text === "~r~Exit") {
                            anim_sub_menu.Visible = false;
                            anim_menu.RefreshIndex();
                            anim_menu.Visible = true;
                        }
                        else if (item.Text === "~y~Stop") {
                            mp.events.callRemote('play_anim', 'stop');
                            ragdoll_debounce = false; //Manage debouncers
                            falling_debounce = false;
                        }
                        else {
                            mp.events.callRemote('play_anim', item.Text); // Play Animation
                            ragdoll_debounce = true; //Manage debouncers
                            falling_debounce = true;
                        }
                    });
                }
            });
        },

        "get_waypoint_pos": () => {
            var pos = getWaypointPos();
            mp.events.callRemote('got_waypoint_pos', pos.x, pos.y);
        },

        "handle_seatbelt": (fasten, unfasten) => {
        },

        "fetch_nearby_atms": (bool, amount) => {
            var pos = mp.players.local.position;
            var ATM1 = mp.game.invoke("GET_CLOSEST_OBJECT_OF_TYPE", 9, pos.X, pos.Y, pos.Z, 4.0, -1126237515, false, false, false);
            var ATM2 = mp.game.invoke("GET_CLOSEST_OBJECT_OF_TYPE", 9, pos.X, pos.Y, pos.Z, 4.0, -1364697528, false, false, false);
            var ATM3 = mp.game.invoke("GET_CLOSEST_OBJECT_OF_TYPE", 9, pos.X, pos.Y, pos.Z, 4.0, 506770882, false, false, false);
            var ATM4 = mp.game.invoke("GET_CLOSEST_OBJECT_OF_TYPE", 9, pos.X, pos.Y, pos.Z, 4.0, -870868698, false, false, false);

            var closest_ATM = null;
            var closest_dist = 100.0;

            if (!ATM1.IsNull) { // Needs converted still.
                var dist = calculateDist(pos, ATM1.position);
                if (dist < closest_dist) {
                    closest_ATM = ATM1;
                    closest_dist = dist;
                }
            }

            if (!ATM2.IsNull) {
                var dist = calculateDist(pos, ATM2.position);
                if (dist < closest_dist) {
                    closest_ATM = ATM2;
                    closest_dist = dist;
                }
            }

            if (!ATM3.IsNull) {
                var dist = calculateDist(pos, ATM3.position);
                if (dist < closest_dist) {
                    closest_ATM = ATM3;
                    closest_dist = dist;
                }
            }

            if (!ATM4.IsNull) {
                var dist = calculateDist(pos, ATM4.position);
                if (dist < closest_dist) {
                    closest_ATM = ATM4;
                    closest_dist = dist;
                }
            }

            if (closest_ATM !== null) {
                if (closest_dist < 2.0) {
                    if (bool === true) {
                        mp.events.callRemote('ped_is_near_atm_withdraw', amount);
                    } else {
                        mp.events.callRemote('ped_is_near_atm_check');
                    }
                }
            }
        },

        "set_debouncers_on": () => {
            ragdoll_debounce = true;
            falling_debounce = true;
            climb_debounce = true;
            dive_debounce = true;
        },

        "set_debouncers_off": () => {
            ragdoll_debounce = false;
            falling_debounce = false;
            climb_debounce = false;
            dive_debounce = false;
        },

        "TRYING_TO_ENTER_CAR_DRIVER": (seatIndex) => {
            indexed_seat = seatIndex;
            index_checker = true;
        },

        "onPlayerDamaged_ShakeStart": (amount) => {
            if (amount >= 4)
                mp.game.graphics.startScreenEffect("ChopVision", 45000, false);
            mp.game.cam.shakeGameplayCam("HAND_SHAKE", amount);
        },

        "onPlayerDamaged_ShakeStop": () => {
            mp.game.cam.stopGameplayCamShaking(true);
        },

        /*
        "play_sound" : (sound) => {
            //API.startAudio("Files/Clientside/sounds/" + sound);
        },
        */

        "set_walkingstyle": (style) => {
            //API.setEntityData("WalkingStyle", style);
        },

        "set_waypoint": (enterX, enterY) => {
            mp.game.ui.setNewWaypoint(enterY, enterY);
        },

        "ragdoll_fall": () => {
            //API.setPedToRagdoll(-1, 1);
            mp.players.local.setToRagdoll(5000, 5000000, 0, false, false, false);
        },

        "robbery_start": (time) => {
            timer = time;
            rob_timer = true;
        },

        "robbery_stop": () => {
            mp.events.callRemote('rob_timer_server', false);
            rob_timer = false;
            timer = 0;
        },

        "death_screen_false": () => {
            mp.game.ui.displayHud(true);
            mp.game.gameplay.setFadeOutAfterDeath(false);
            mp.game.gameplay.disableAutomaticRespawn(true);
        },

        "ragdoll_off": () => {
            //mp.players.local.resetRagdollTimer();
        },

        "screen_cocaine": () => {
            mp.game.graphics.startScreenEffect("DrugsDrivingOut", 180000, false);
            //API.setPlayerIsDrunk(mp.players.local, true);
            mp.game.cam.shakeGameplayCam("DRUNK_SHAKE", 4);
        },

        "screen_cocaine_off": () => {
            //API.setPlayerIsDrunk(mp.players.local, false);
            mp.game.cam.stopGameplayCamShaking(true);
        },

        "screen_steroid": () => {
            mp.game.graphics.startScreenEffect("DrugsMichaelAliensFight", 60000, false);
        },

        "screen_weed": () => {
            mp.game.graphics.startScreenEffect("ChopVision", 60000, false);
        },

        /*
        "play_sound" : (sound) => {
            //API.startAudio("Files/Clientside/sounds/" + sound);
        },
        */
        "mailman_create_marker": (name, position) => {
                var l_MarkerName = name;
                var l_MarkerPos = position;
                JobHelper.createMarker(l_MarkerName, l_MarkerPos, 1);
            },

            "mailman_create_blip": (name, position) => {
                var l_BlipName = name;
                var l_BlipPos = position;
                JobHelper.createBlip(l_BlipName, l_BlipPos, 0);
            },

            "mailman_delete_marker": (name) => {
                var l_MarkerName = name;
                JobHelper.removeMarker(l_MarkerName);
            },

            "mailman_delete_blip": (name) => {
                var l_BlipName = name;
                JobHelper.removeBlip(l_BlipName);
            },
        "job_create_marker": (name, position) => {
            var jobName = name;
            var vector = position;
            JobHelper.createMarker(jobName, vector, 1);
        },

        "job_create_blipped_marker": (name, jPosition) => {
            var jobName = name;
            var vector = jPosition;
            JobHelper.createMarker(jobName, vector, 1);
            JobHelper.createBlip(jobName, vector, 1);
        },
        "clear_property_blips": () => {

            for (const [key, value] of Object.entries(propertyBlips)) {
                if (mp.blips.exists(value)) {
                    value.destroy();
                }
            }
            propertyBlips = {};
        },

        "create_house_blip": (name, hPosition, dim, id) => {

            if (name === null || hPosition === null)
                return;

            var houseName = name;
            var position = hPosition;
            var blip = mp.blips.new(40, position,
            {
                name: houseName,
                color: 2,
                scale: 0.9,
                shortRange: true,
                dimension: dim,
            });
            propertyBlips[houseName + id] = blip;
        },
        "create_rent_blip": (name, hPosition, dim, id) => {

            if (name === null || hPosition === null)
                return;

            var houseName = name;
            var position = hPosition;
            var blip = mp.blips.new(40, position,
            {
                name: houseName,
                color: 28,
                scale: 0.9,
                shortRange: true,
                dimension: dim,
            });
            propertyBlips[houseName + id] = blip;
        },
        "create_garage_blip": (name, hPosition, dim, id) => {

            if (name === null || hPosition === null)
                return;

            var houseName = name;
            var position = hPosition;
            var blip = mp.blips.new(50, position,
                {
                    name: houseName,
                    color: 31,
                    scale: 0.7,
                    shortRange: true,
                    dimension: dim,
                });
            propertyBlips[houseName + id] = blip;
        },
        "create_faction_house_blip": (name, hPosition, dim, id) => {
            var houseName = name;
            var position = hPosition;
            var blip = mp.blips.new(40, position,
                {
                    name: houseName,
                    color: 31,
                    shortRange: true,
                    dimension: dim,
                });
            propertyBlips[houseName + id] = blip;
        },

        "update_animal_death": (handle) => {
            if (handle == null || handle.length == 0)
                return;
            mp.game.invoke("APPLY_DAMAGE_TO_PED", 0, handle, 110, true);
        },

        "update_animal_position": (handle) => {
            mp.events.callRemote('update_animal_position', handle, handle.position);
        },

        "toggle_animal_invincible": (bool) => {
            entity.setInvincible(bool);
        },

        "set_weather": (weather) => {
            mp.game.gameplay.setOverrideWeather(weather);
        },

        "set_time": (hour, minute = 0, second = 0) => {
            mp.game.time.setClockTime(hour, minute, second);
        },
        "get_vehicle_class": (vehicle) => {
            var player = mp.players.local;
            var veh;
            if (vehicle == null) {
                if (player.vehicle != null)
                    veh = player.vehicle;
            } else {
                veh = vehicle;
            }
            if (veh != null) {
                let vehClass = veh.getClass();
                mp.events.callRemote('set_vehicle_class', veh, vehClass);
            }

        },
        "send_desktop_notif": (title, message, attributes, duration) => {
            mp.system.notify({
                title: title,
                text: message,
                attribute: attributes,
                duration: duration,
                silent: true
            });
        },
        // Called for everyone
        "create_canine": async (id, owner, unitType, pos, target) => {
            if (id === null || owner === null || unitType === null || pos === null)
                return;

            var dist = mp.game.gameplay.getDistanceBetweenCoords(mp.players.local.position.x,
                mp.players.local.position.y,
                mp.players.local.position.z,
                pos.x,
                pos.y,
                pos.z,
                true);

            let unit = null;

            if (dist > 250) return;

            unit = mp.peds.new(mp.game.joaat(unitType), pos, 270.0, owner.dimension);

            for (let i = 0; unit.handle == 0 && i < 1500; i++) await mp.game.waitAsync(50);

            unit.freezePosition(false);
            unit.setRelationshipGroupHash(canineGroup);
            unit.setCanBeDamaged(true);
            unit.setInvincible(false);
            unit.setCanRagdoll(true);
            unit.setOnlyDamagedByPlayer(true);
            unit.setCanRagdollFromPlayerImpact(true);
            unit.setSweat(100);
            unit.setRagdollOnCollision(true);

            // Set all abilities and attributes needed for 'taskCombat' to work.
            unit.setCombatAbility(100);
            unit.setCombatRange(1);
            unit.setCombatMovement(3);
            unit.setCombatAttributes(46, true);
            unit.setCombatAttributes(5, true);
            unit.setFleeAttributes(0.0, false);

            var canineUnit = new CanineUnit(id, owner, unit, 0, target, pos, unitType);
            canineList.push(canineUnit);

            if (mp.players.local === unit.player)
                canineUnit.init();
        },

        "delete_canine": (id) => {
            var unit = null;
            unit = canineList.find(x => x.id === id)
            if (!(unit !== null && unit !== undefined)) return;

            unit.cleanUp();
            var index = canineList.indexOf(unit);
            if (index < 0) return;

            canineList.splice(index, 1);
        },

        "create_canine_relationship_group": () => {
            canineGroup = mp.game.ped.addRelationshipGroup("CanineGroup", mp.game.joaat("CanineGroup"));
            mp.game.ped.setRelationshipBetweenGroups(5, canineGroup, mp.players.local.getRelationshipGroupHash());
            mp.game.ped.setRelationshipBetweenGroups(5, mp.players.local.getRelationshipGroupHash(), canineGroup);
        },

        "update_canine_position": async (id, x, y, z) => {
            const tempUnit = canineList.find(x => x.id === id)
            if (tempUnit !== null && tempUnit !== undefined) {
                // Save pos to variable
                tempUnit.position = new mp.Vector3(x, y, z);

                // Check if new position is within our streaming range
                if (tempUnit.position !== null && tempUnit.position !== undefined) {
                    var dist = mp.game.gameplay.getDistanceBetweenCoords(
                        mp.players.local.position.x,
                        mp.players.local.position.y,
                        mp.players.local.position.z,
                        tempUnit.position.x,
                        tempUnit.position.y,
                        tempUnit.position.z,
                        true);

                    if (dist <= 250) {
                        if (tempUnit.canineHandle === null || tempUnit.canineHandle === undefined) {
                            let unit = mp.peds.new(mp.game.joaat(tempUnit.unitType), tempUnit.position, 270.0, 0);

                            if (unit != null && unit != undefined) {
                                for (let i = 0; unit.handle == 0 && i < 1500; i++) await mp.game.waitAsync(50);

                                unit.freezePosition(false);
                                unit.setRelationshipGroupHash(canineGroup);
                                unit.setCanBeDamaged(true);
                                unit.setInvincible(false);
                                unit.setCanRagdoll(true);
                                unit.setOnlyDamagedByPlayer(true);
                                unit.setCanRagdollFromPlayerImpact(true);
                                unit.setSweat(100);
                                unit.setRagdollOnCollision(true);

                                // Set all abilities and attributes needed for 'taskCombat' to work.
                                unit.setCombatAbility(100);
                                unit.setCombatRange(1);
                                unit.setCombatMovement(3);
                                unit.setCombatAttributes(46, true);
                                unit.setCombatAttributes(5, true);
                                unit.setFleeAttributes(0.0, false);

                                tempUnit.canineHandle = unit;
                                tempUnit.setState();
                                tempUnit.playAnim();
                            }
                        }
                    }
                    // Else if distance is greater than 350, we should delete the entity just before reaching the 500 mark,
                    // or we'll lose control of it. Delete to avoid desync!
                    else {
                        if (tempUnit.canineHandle !== null && tempUnit.canineHandle !== undefined && tempUnit.canineHandle.doesExist()) {
                            tempUnit.canineHandle.destroy();
                            tempUnit.canineHandle = null;
                        }
                    }
                }
            }
        },

        "update_canine_state": (id, state, target) => {
            const tempUnit = canineList.find(x => x.id === id)
            if (tempUnit !== null && tempUnit !== undefined) {
                tempUnit.state = state;
                if (target !== null && target !== undefined)
                    tempUnit.targetHandle = target;
                tempUnit.animInfo = null;
                tempUnit.setState();
            }
        },
        "update_canine_state_ex": (id, state, pos_x, pos_y, pos_z) => {
            const tempUnit = canineList.find(x => x.id === id)
            if (tempUnit !== null && tempUnit !== undefined) {
                tempUnit.state = state;
                if (pos_x !== null) {
                    tempUnit.positionex_X = pos_x;
                    tempUnit.positionex_Y = pos_y;
                    tempUnit.positionex_Z = pos_z;
                }

                tempUnit.animInfo = null;
                tempUnit.setState();
            }
        },

        "play_canine_anim": async (id, animDict, animName, loop) => {
            const tempUnit = canineList.find(x => x.id === id)
            if (tempUnit !== null && tempUnit !== undefined) {
                if (loop) {
                    // If the anim is set to loop, we'll need to store it,
                    // so players who streamin will also see the anim playing.
                    tempUnit.animInfo = [];
                    tempUnit.animInfo[0] = animDict;
                    tempUnit.animInfo[1] = animName;
                    tempUnit.playAnim();
                }
                // Otherwise just play the anim once for those in range.
                else {
                    if (tempUnit.canineHandle !== null && tempUnit.canineHandle !== undefined && tempUnit.canineHandle.doesExist()) {
                        mp.game.streaming.requestAnimDict(animDict);
                        for (let i = 0; !mp.game.streaming.hasAnimDictLoaded(animDict) && i < 1500; i++) await mp.game.waitAsync(0);

                        tempUnit.canineHandle.taskPlayAnim(animDict, animName, 8.0, 0, -1, 0, 0.0, false, false, false);
                    }
                }
            }
        },

        "get_model_dimensions": (entity) => {
            if (entity === null)
                return;

            var dimensions = mp.game.gameplay.getModelDimensions(entity.model);
            if (dimensions !== null) {
                var min = dimensions.min;
                var max = dimensions.max;
                mp.events.callRemote("send_model_dimensions", min.x, min.y, min.z, max.x, max.y, max.z, entity);
            }
        },
        "ALPR::size": (size) => {
            if (mp.browsers.exists(ALPRWindow)) {
                ALPRWindow.execute('SetALPRSize(' + size + ');');
            }

            if (typeof mp.storage.data !== 'undefined') {
                mp.storage.data.alprsize = size;
            }
        },
        "ALPR::toggle": (toggle, offset1, offset2) => {
            if (toggle === null)
                return;

            if (!mp.browsers.exists(ALPRWindow) && toggle) {
                ALPRWindow = mp.browsers.new("package://gtalife/ALPR/ALPR.html");
                alprStatus = true;
                if (offset1 === null || offset2 === null)
                    return;
                alprPos = new Array;
                alprPos[0] = offset1;
                alprPos[1] = offset2;
                if (typeof mp.storage.data !== 'undefined' && typeof mp.storage.data.alprsize !== 'undefined' && mp.storage.data.alprsize) {
                    ALPRWindow.execute('SetALPRSize(' + mp.storage.data.alprsize + ');');
                }
            }
            else if (ALPRWindow != null && mp.browsers.exists(ALPRWindow) && !toggle) {
                ALPRWindow.destroy();
                ALPRWindow = null;
                alprStatus = false;

                alprPos = null;
                alpr_modelName = null;
                alpr_plateName = null;
                alpr_ownerName = null;
                alpr_modelStatus = null;
                alpr_ownerStatus = null;
                alpr_insuranceStatus = null;
                alpr_hitEntity = null;
            }
        },
        "ALPR::update": (searching, name, plate, owner, insurance, license, stolen) => {
            if (last_alpr_modelName == name && last_alpr_ownerName == owner && last_alpr_plateName == plate) return;

            if (ALPRWindow != null && mp.browsers.exists(ALPRWindow)) {
                last_alpr_modelName = name;
                last_alpr_ownerName = owner;
                last_alpr_plateName = plate;
                ALPRWindow.execute('InitializeALPR(' + searching + ', "' + name + '", "' + plate + '", "' + owner + '", ' + insurance + ', ' + license + ', ' + stolen + ');');
            }
        },

        "ALPR::SendData": (owner, vehStatus, ownerStatus, insuranceStatus) => {
            if (owner === null || vehStatus === null || ownerStatus === null)
                return;
            alpr_ownerName = owner;
            alpr_modelStatus = vehStatus;
            alpr_ownerStatus = ownerStatus;
            alpr_insuranceStatus = insuranceStatus;
        },

        "play_sound": (soundName, soundSetName) => {
            if (soundName === null || soundSetName === null)
                return;

            mp.game.audio.playSoundFrontend(-1, soundName, soundSetName, true);
        },

        "getClosestObjectOfType": (jsonObj) => {
            if (jsonObj === null)
                return;

            let playerPos = mp.players.local.position;
            var obj = null;

            let objects = JSON.parse(jsonObj);
            if (objects == null)
                return;

            for (let i = 0; i < objects.length; i++) {
                obj = mp.game.object.getClosestObjectOfType(playerPos.x, playerPos.y, playerPos.z, objects[i].Radius, mp.game.joaat(objects[i].ModelName), true, true, true);
                if (obj !== null && obj > 0) {
                    mp.events.callRemote("getClosestObjectOfType_result", true, objects[i].CallbackID, objects[i].ModelName);
                    return;
                }
            }

            mp.events.callRemote("getClosestObjectOfType_result", false);
        },

        "write_chatlog": (message) => {
            //return;
            //mp.storage.data = {chat :  mp.storage.data.chat + "\\n" + message};
            //mp.storage.flush();
        },


        "create_InformationMarker": (name, type, position, dimension) => {
            var jobName = name;
            var vector = position;
            JobHelper.createMarkerEx(jobName, type, vector, dimension, 1);
        },

        "remove_InformationMarker": (name) => {
            var jobName = name;
            JobHelper.removeMarker(jobName);
        },

        "job_remove_marker": (name) => {
            var jobName = name;
            JobHelper.removeMarker(jobName);
            JobHelper.removeBlip(jobName);
        },

        "job_create_pickup": (jId, jPosition, jRadius) => {
            var id = jId;
            var position = jPosition;
            var radius = jRadius;
            JobHelper.createBlip(jId, jPosition, 0);
            JobHelper.createMarker(jId, jPosition, jRadius);
        },

        "job_create_pickup": () => {
            if (blips.length == 0 && markers.length == 0)
                return;
            for (var key in blips) {
                JobHelper.removeBlip(key);
            }
            for (var key in markers) {
                JobHelper.removeMarker(key);
            }
        },

        "SetRadioStationToOff": () => {
            let veh = mp.players.local.vehicle;
            if (veh === undefined || veh == null || !veh.doesExist()) {
                return;
            }
            mp.game.audio.setRadioToStationName("OFF");
            mp.game.audio.setUserRadioControlEnabled(true);
        },

        "job_remove_pickup": (jName) => {
            var name = jName;
            JobHelper.removeBlip(jName);
            JobHelper.removeMarker(jName);
        },

        "job_create_blip": (jName, jPosition, jColor) => {
            var name = jName;
            var position = jPosition;
            var color = jColor;
            JobHelper.createBlip(jName, jPosition, parseInt(jColor));
        },

        "job_remove_blip": (jName) => {
            var name = jName;
            JobHelper.removeBlip(jName);
        },

        "update_garbage_trucking": (trucking, amount, max) => {
            isGarbageTrucking = trucking;
            currentGarbage = amount;
            maximumGarbage = max;
        },

        "set_gps_garbage": (posX, posY) => {
            //API.removeWaypoint();
            mp.game.ui.setNewWaypoint(posX, posY);
        },

        "set_job_status": (isCollecter) => {
            isGarbageJob = isCollecter;
            jobDebouce = true;
        },

        "set_garbage_gui_on": (max, current) => {
            enableDisplay = true;
            maximumGarbage = max;
            currentGarbage = current;
        },

        "set_garbage_gui_off": () => {
            enableDisplay = false;
            maximumGarbage = 0;
            currentGarbage = 0;
        },

        "create_marker_job": (mPosition) => {
            JobHelper.createMarker("final_garbage", mPosition, 2.0);
        },

        "remove_marker_job": () => {
            JobHelper.removeMarker("final_garbage");
        },

        "enable_garbage_nerf": () => {
            enableGarbageNerf = true;
        },

        "disable_garbage_nerf": () => {
            enableGarbageNerf = false;
        },

        "GroundAndRoadDetection": (pPosition) => {
            let playerPosition = pPosition;
            mp.events.callRemote("GroundAndIsRoad", 0.0, true);
        },

        "mining_Copper_start": () => {
            mp.events.call('createBrowser', ['package://gtalife/mining/copper_info.html']);
            mp.gui.cursor.show(false, false);
            mp.gui.chat.activate(true);
        },

        "mining_Silver_start": () => {
            mp.events.call('createBrowser', ['package://gtalife/mining/silver_info.html']);
            mp.gui.cursor.show(false, false);
            mp.gui.chat.activate(true);
        },

        "mining_Diamond_start": () => {
            mp.events.call('createBrowser', ['package://gtalife/mining/diamond_info.html']);
            mp.gui.cursor.show(false, false);
            mp.gui.chat.activate(true);
        },

        "mining_stop": () => {
            if (miningBrowser !== null) {
                miningcef.destroy();

                miningBrowser = null;
            }
        },

        "speed_limiter": () => {
            if (mp.players.local.isInAnyVehicle(false) && mp.players.local.seat == -1) {
                var model = mp.players.local.vehicle.getModel();

                if (mp.players.local.isInAnyVehicle(false) && mp.players.local.seat == -1) {
                    var model = mp.players.local.vehicle.getModel();
                    if (IsModelBlocked(model)) {
                        mp.game.graphics.notify("~r~Can't use Speed Limiter on this vehicle!");
                        return;
                    }

                    if (limitMenu == null || limitMenu == null) {
                        // first time
                        limitMenu = new Menu("Speed Limiter", "Model: ~b~" + mp.game.vehicle.getDisplayNameFromVehicleModel(model), 0, 0, 6);

                        var limits = [];
                        limits.push("No Limit");
                        for (var i = limitMultiplier; i <= 120; i += limitMultiplier) limits.push(i.toString());

                        limitSpeedItem = new UIMenuListItem("Limit", "Adjusts the speed limit.", new ItemsCollection(limits), 0);
                        limitMenu.AddItem(limitSpeedItem);

                        limitToggleItem = new UIMenuCheckboxItem("Active", "Toggles the speed limit.", (vehicleMaxSpeedEnabled[model] !== null) ? vehicleMaxSpeedEnabled[model] : false);
                        limitMenu.AddItem(limitToggleItem);

                        limitSpeedItem.ListChange.on(function (sender, new_index) {
                            var vehicle = mp.players.local.vehicle;

                            SetVehicleMaxSpeed(vehicle, (new_index == 0) ? (mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) * 2.23693629) : parseInt(limitSpeedItem.IndexToItem(new_index)));
                            SetVehicleLimiterStatus(vehicle, GetVehicleLimiterStatus(vehicle));
                        });

                        limitToggleItem.CheckboxEvent.connect(function (sender, is_checked) {
                            SetVehicleLimiterStatus(mp.players.local.vehicle, is_checked);
                        });

                        limitMenu.RefreshIndex();
                        limitMenu.Visible = true;
                    } else {
                        // update the menu
                        limitMenu.RefreshIndex();
                        limitMenu.Visible = !limitMenu.Visible;

                        if (limitMenu.Visible) {
                            //API.setMenuSubtitle(limitMenu, "Model: ~b~" + API.getVehicleDisplayName(model));

                            var index = 0;
                            if (vehicleMaxSpeed[model] !== null) {
                                for (var i = limitMultiplier; i <= 120; i += limitMultiplier) {
                                    if (i == vehicleMaxSpeed[model]) {
                                        index = (i / limitMultiplier);
                                        return;
                                    }
                                }
                            }

                            limitSpeedItem.Index = index;
                            limitToggleItem.Checked = GetVehicleLimiterStatus(mp.players.local.vehicle);
                        }
                    }
                }
            }
        },

        "speed_limiter_forced": (args) => {
            return; //TO FIX
            var vehicle = mp.players.local.vehicle;
            var speed = parseInt(args);
            SetVehicleMaxSpeed2(vehicle, speed);
            SetVehicleLimiterStatus2(vehicle, true);
        },

        "speed_limiter_command": (args) => {
            var vehicle = mp.players.local.vehicle;
            var speed = parseInt(args);
            var model = mp.players.local.vehicle.getModel();
            if (IsModelBlocked(model)) {
                mp.game.graphics.notify("~r~Can't use Speed Limiter on this vehicle!");
                return;
            }
            if (isNaN(speed)) {
                if (args == "off") {
                    SetVehicleLimiterStatus(vehicle, false)
                    mp.game.graphics.notify("~w~Speedlimiter turned ~r~OFF~w~.");
                }
            } else {
                SetVehicleMaxSpeed(vehicle, speed);
                SetVehicleLimiterStatus(vehicle, true)
                mp.game.graphics.notify("~w~Speedlimiter turned ~g~ON~w~ at speed ~b~" + speed + " ~w~MPH.");
            }
        },
        "start_engine": (veh) => {
            var vehHandle = veh;
            if (vehHandle != null) {
                vehHandle.setEngineOn(true, true, true);
                vehHandle.setLights(1); // normal lights
                //vehHandle.setUndriveable(false); Shouldn't actually be necessary
            }
        },

        "stop_engine": (veh) => {
            var vehHandle = veh;
            if (vehHandle != null) {
                vehHandle.setEngineOn(false, true, true);
                vehHandle.setLights(1); // no lights
                //vehHandle.setUndriveable(true); Shouldn't actually be necessary
            }
        },

        "stop_progressbar": () => {
            if (progressBrowser == null)
                return;
            progressBrowser.destroy();

            progressBrowser = null;
            mp.events.callRemote('progressbar_finished', false);
        },

        "toggleCustomGodMode": (isEnabled) => {

            isLocalPlayerInvincible = isEnabled;
            canSendUpdateRequest = true;

            let loca = mp.players.local;
            loca.setInvincible(isEnabled);
            loca.setCanRagdoll(!isEnabled);
        },

        "startSpectating": (target) => {

            spectateTarget = target;
            spectating = true;
        },

        "stopSpectating": () => {

            spectateTarget = null;
            spectating = false;
        },

        "set_frozen": (freeze) => {
            if (mp.players.local !== undefined && mp.players.local !== null)
                mp.players.local.freezePosition(freeze);
        },

        "set_entity_frozen": (entity, freeze) => {
            if (entity !== undefined && entity !== null)
                entity.freezePosition(freeze);
        },

        "set_tutorial_camera": (tStage) => {
            var stage = tStage;
            var newCam;
            switch (stage) {
                case 1:
                    mp.gui.chat.activate(true);
                    newCam = mp.cameras.new('default', new mp.Vector3(236.3034, -58.02307, 292.483), new mp.Vector3(), 90);
                    //newCam.pointAtCoord(new mp.Vector3(118.1804, -495.8049, 196.8651));
                    newCam.setActive(true);
                    mp.game.cam.renderScriptCams(true, false, 0, true, false);

                case 2:
                    newCam = mp.cameras.new('default', new mp.Vector3(422.4252, -978.3939, 30.71778), new mp.Vector3(), 90);
                    //newCam.pointAtCoord(new mp.Vector3(433.3564, -982.3729, 30.70988));
                    newCam.setActive(true);
                    mp.game.cam.renderScriptCams(true, false, 0, true, false);
                    break;

                case 3:
                    newCam = mp.cameras.new('default', new mp.Vector3(762.3749, -3020.84, 5.833936), new mp.Vector3(), 90);
                    //newCam.pointAtCoord(new mp.Vector3(773.1696, -3001.652, 5.896242));
                    newCam.setActive(true);
                    mp.game.cam.renderScriptCams(true, false, 0, true, false);
                    break;

                case 4:
                    newCam = mp.cameras.new('default', new mp.Vector3(412.7418, -824.6332, 29.330), new mp.Vector3(), 90);
                    //newCam.pointAtCoord(new mp.Vector3(418.3139, -813.3318, 29.28425));
                    newCam.setActive(true);
                    mp.game.cam.renderScriptCams(true, false, 0, true, false);
                    break;

                case 6:
                    newCam = mp.cameras.new('default', new mp.Vector3(-76.99612, -1126.04, 25.71036), new mp.Vector3(), 90);
                    //newCam.pointAtCoord(new mp.Vector3(-55.54131, -1107.326, 26.43596));
                    newCam.setActive(true);
                    mp.game.cam.renderScriptCams(true, false, 0, true, false);
                    break;
            }
        },

        "kill_camera": () => {
            //API.setActiveCamera(null);
            mp.game.cam.renderScriptCams(false, false, 0, true, false);
            //mp.game.cam.destroyAllCams(true); // Needs testing.
        },

        "active_snow": () => {
            //API.setSnowEnabled(true, true, true); // Not implemented
        },

        "disable_snow": () => {
            //API.setSnowEnabled(false, false, false); // Not implemented
        },

        "blindfold": () => {
            triggerBlindfold = !triggerBlindfold;
        },

        "VehicleModdingCalled": (price, bool) => {
            mapModToIndex = initModMap();
            mapModToPrice = initModToPrice(price);
            isAdminMenu = bool;
            //var main_menu = new Menu("", 0, 0, 6);
            //menuPoolforModding = API.getMenuPool();

            menuConfirmation = createPurchConfirmMenu();
            //menuPoolforModding.Add(menuConfirmation);
            //main_menu.addSubMenu(menuConfirmation, "");
            createMainMenuVehMod();
            openMainMenuVehMod();
        },

        "driving_school_create_marker": (name, position) => {
            var l_MarkerName = name;
            var l_MarkerPos = position;
            JobHelper.createMarker(l_MarkerName, l_MarkerPos, 1);
        },

        "driving_school_create_blip": (name, position) => {
            var l_BlipName = name;
            var l_BlipPos = position;
            JobHelper.createBlip(l_BlipName, l_BlipPos, 0);
        },

        "driving_school_create_waypoint": (posX, posY) => {
            //API.removeWaypoint();
            mp.game.ui.setNewWaypoint(posX, posY);
        },

        "driving_school_delete_marker": (name) => {
            var l_MarkerName = name;
            JobHelper.removeMarker(l_MarkerName);
        },

        "driving_school_delete_blip": (name) => {
            var l_BlipName = name;
            JobHelper.removeBlip(l_BlipName);
        },

        "driving_school_complete": () => {
            mp.game.graphics.notify("You completed the driving school! You received your drivers license.");
            mp.events.callRemote('driving_school_complete', true);
        },

        "SuccessOnInstall": () => {
            mp.game.graphics.notify("~g~Installed");
            closePrchOpenMain();
        },

        "radar_create_marker": (position, size) => {
            let player = mp.players.local;
            if (player !== null) {
                radar_Markers[player] = mp.markers.new(1, position, size,
                    {
                        direction: new mp.Vector3(0, 0, 0),
                        rotation: new mp.Vector3(0, 0, 0),
                        color: [255, 0, 0, 100],
                        visible: true,
                        dimension: 0
                    });
            }
        },

        "update_menu_position": (x, y) => {
            posX = resolution.x * x;
            posY = resolution.y * y;
        },

        "radar_remove_marker": () => {
            let player = mp.players.local;
            if (player !== null) {
                radar_Markers[player].destroy();
                radar_Markers[player] = null;
            }
        },

        "client_get_speed": () => {
            var player = mp.players.local;
            var veh = player.vehicle;

            if (veh !== null) {
                speed = veh.getSpeed() * 3.6;
                mp.events.callRemote('server_send_speed', speed);
            }
        },

        "VehiclePicklock": (difficulty, solution) => {

            difficultyMultiplier = difficulty;
            initialize();

            solutionDegrees = solution;

            currentSolutionRange = defaultSolutionRange * difficultyMultiplier / 2;

            // Making sure the solution is not too close to the edges.
            if (solutionDegrees < pinMinDegrees + currentSolutionRange) {
                solutionDegrees = pinMinDegrees + currentSolutionRange;
            }
            else if (solutionDegrees > pinMaxDegrees - currentSolutionRange) {
                solutionDegrees = pinMaxDegrees - currentSolutionRange;
            }

            currentHalfPickedRangeOffset = difficultyMultiplier * defaultHalfPickedRangeOffset;

            isPicking = true;
        },

        "StartAlarm": (vId, vPosition, vMarker, vBlip, vAttached) => {
            /*
            let id = vId;
            let position = vPosition;
            let showMarker = vMarker;
            let showBlip = vBlip
            let vehicleAttached = vAttached;

            let alarmMarker = null;
            let alarmBlip = null;
            let alarmEffects = null;

            if (showMarker) {
                alarmMarker = mp.markers.new(2, new mp.Vector3(position.X, position.Y, position.Z + 3), new mp.Vector3(1, 1, 1),
                    {
                        direction: new mp.Vector3(),
                        rotation: new mp.Vector3(180, 0, 0),
                        color: [255, 30, 0, 180],
                        visible: true,
                        dimension: 0
                    });

                if (vehicleAttached != null) {
                    //AttachEntityToEntityForVehicles(alarmMarker, vehicleAttached, "SKEL_ROOT", new mp.Vector3(0, 0, 3), new mp.Vector3(180, 0, 0));
                }
            }

            if (showBlip) {
                alarmBlip = mp.blips.new(459, position,
                    {
                        name: "Alarm",
                        scale: 1,
                        color: 1,
                        alpha: 255,
                        shortRange: false,
                        dimension: 0,
                    });
                alarmBlip.setFlashes(true);

                if (vehicleAttached != null && alarmBlip != null) {
                    //AttachEntityToEntityForVehicles(alarmBlip, vehicleAttached, "SKEL_ROOT", new mp.Vector3(), new mp.Vector3());
                }
            }

            if (vehicleAttached == null) {
                alarmEffects = setInterval(() => {
                    NormalAlarmLoop();
                }, 800);
            } else {
                alarmEffects = setInterval(() => {
                    VehicleAlarmLoop(vehicleAttached);
                }, 2000);
            }

            addAlarm(id, alarmMarker, alarmBlip, alarmEffects);
            */
        },

        "StopAlarm": (aId) => {
            let id = aId;
            removeAlarm(id);
        },

        "Hotwire-Old": (time, percent) => {
            isHotwiring = true;
            timeLeft = time;
            successInPercent = percent * 100.0;
        },

        "StopHotwire-Old": () => {
            isHotwiring = false;
            timeLeft = 0.0;
            successInPercent = 0.0;
        },

        "Lockpick-OLD": (time, percent) => {
            isLockpicking = true;
            timeLeft = time;
            successInPercent = percent * 100.0;
        },

        "StopLockpick-OLD": () => {
            isLockpicking = false;
            timeLeft = 0.0;
            successInPercent = 0.0;
        },

        "dev_tp_forward": (range) => {
            let forwardX = mp.players.local.position.x + mp.players.local.getForwardX() * range;
            let forwardY = mp.players.local.position.y + mp.players.local.getForwardY() * range;
            mp.players.local.position = new mp.Vector3(forwardX, forwardY, mp.players.local.position.y + 0.5);
        },
        "SetIdleCameraEnableStatus": (status) => {
            IdleCameraDisableStatus = status;
        },
        "DoGreet": (target1ID, target2ID, type) => {
            const target1 = mp.players.atRemoteId(target1ID);
            const targer2 = mp.players.atRemoteId(target2ID);

            if (target1 === undefined || target1 == null || typeof target1.doesExist === 'undefined' || !target1.doesExist()) return;
            if (targer2 === undefined || targer2 == null || typeof targer2.doesExist === 'undefined' || !targer2.doesExist()) return;

            const p1p = target1.position;
            const p2p = targer2.position;

            const p1p2Vector = new mp.Vector3(p2p.x - p1p.x, p2p.y - p1p.y, p2p.z - p1p.z);
            const p1p2VecMag = Math.sqrt(p1p2Vector.x * p1p2Vector.x + p1p2Vector.y * p1p2Vector.y + p1p2Vector.z * p1p2Vector.z);

            const CosTheta1 = p1p2Vector.x / p1p2VecMag;
            const CosTheta2 = p1p2Vector.y / p1p2VecMag;
            const CosTheta3 = p1p2Vector.z / p1p2VecMag;

            const theta1 = Math.acos(CosTheta1) * (180.0 / Math.PI);
            const theta2 = Math.acos(CosTheta2) * (180.0 / Math.PI);
            const theta3 = Math.acos(CosTheta3) * (180.0 / Math.PI);

            let toSet = theta2;

            target1.setHeading(toSet);
            targer2.setHeading((toSet + 180) % 360);


            if (mp.players.local.remoteId == target1.remoteId) {
                mp.events.callRemote("DoGreetingResponse", target2ID, type);
            }

            // line = [p1p.x, p1p.y, p1p.z, p2p.x, p2p.y, p2p.z];
        },
    });

// let line = null;
// mp.events.add('render', () =>
// {
//     if(line != null)
//     {
//         mp.game.graphics.drawLine(line[0], line[1], line[2], line[3], line[4], line[5], 255, 255, 0, 255);
//     }
// });

mp.events.add("playerChat", (player, message) => {
    //mp.events.call('Send_ToChat',[player,message]);
});

const localPlayer = mp.players.local;
var signal1, signal2, signalx;

// 0x71 is the CTRL key code
var bigmap = [];

bigmap.status = 0;
bigmap.timer = null;

mp.game.ui.setRadarZoom(0.0);
mp.game.ui.setRadarBigmapEnabled(false, false);

mp.events.add("render", () => {

    mp.game.controls.disableControlAction(0, 48, true);
    if(mp.game.controls.isDisabledControlJustPressed(0, 48) && !chatopened && !cef_opened) {
        if(bigmap.status === 0) {
            if(bigmap.timer != null) 
            {   
                clearTimeout(bigmap.timer);
                bigmap.timer = null;
            }

            mp.game.ui.setRadarBigmapEnabled(true, false);
            bigmap.status = 1;
            mp.events.call("toggle_bigmap", true);

            bigmap.timer = setTimeout(() => {
                mp.game.ui.setRadarBigmapEnabled(false, false);
                bigmap.status = 0;
                bigmap.timer = null;
                mp.events.call("toggle_bigmap", false);
            }, 10000);

        } else {

            if(bigmap.timer != null) 
            {
                clearTimeout(bigmap.timer);
                bigmap.timer = null;
            }

            mp.game.ui.setRadarBigmapEnabled(false, false);
            bigmap.status = 0;

            mp.events.call("toggle_bigmap", false);
        }
    }
});

/*mp.keys.bind(0x5A, true, function () {
    if (logged == 0 || chatopened || cef_opened)
        return;
    mp.game.ui.setRadarZoom(1000);
});*/

// mp.keys.bind(0x50, true, function () {
//     if (logged == 0 || chatopened || cef_opened)
//         return;

//     mp.game.ui.activateFrontendMenu(mp.game.gameplay.getHashKey('FE_MENU_VERSION_MP_PAUSE'), true, -1);
// });

/*mp.keys.bind(0x5A, false, function () {
    if (logged == 0 || chatopened || cef_opened)
        return;
    setTimeout(() => {
        mp.game.ui.setRadarZoom(0);
    }, 3000);

});*/

mp.keys.bind(0x76, true, function () {

    toggleHUD(!print_hud);
    mp.events.call('ToggleHUD', !print_hud);
});

mp.events.add('toggleHUDForPlayer', (toggle) => {

    toggleHUD(toggle);
});

function toggleHUD(toggle) {

    if (toggle) {

        mp.game.ui.displayRadar(true);
        mp.gui.chat.show(true);
        print_hud = true;
        mp.events.call('MarkersAndLabels::Show');
    }
    else {

        mp.game.ui.displayRadar(false);
        print_hud = false;
        mp.gui.chat.show(false);
        mp.events.callRemote('MarkersAndLabels::Toggle', false);
    }

}

mp.events.add('toggleHUDExForPlayer', (toggle) => {

    toggleHUD_ex(toggle);
});

function toggleHUD_ex(toggle) {

    if (toggle) {

        mp.game.ui.displayRadar(true);
        //print_hud = true;
        print_hud_ex = true;
    }
    else {

        mp.game.ui.displayRadar(false);
        print_hud_ex = false;
    }
}

var hiddenMarkers = [];
var hiddenTextLabels = [];

mp.events.add('Labels::Hide', (label) => {
    label.oldText = label.text;
    label.text = "";
    hiddenTextLabels.push(label);
});

mp.events.add('Markers::Hide', (marker) => {
    marker.visible = false;
    hiddenMarkers.push(marker);
});

mp.events.add('MarkersAndLabels::Show', () => {
    try {
        hiddenMarkers.forEach(marker => {
            if(marker != null && marker != undefined && mp.markers.exists(marker))
                marker.visible = true; 
        });
        hiddenTextLabels.forEach(label => { 
            if(label != null && label != undefined && mp.labels.exists(label))
                label.text = label.oldText; 
        });
        hiddenMarkers = [];
        hiddenTextLabels = [];
    }   
    catch (e) {
        
    }
});

const blockedIndicatorClasses = [13, 14, 15, 16, 21]; // https://wiki.rage.mp/index.php?title=Vehicle_Classes

mp.events.addDataHandler("CarSign", (entity, text) => {
    //
});

mp.events.addDataHandler("anim_rotation", (entity, value) => {
    //
});

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

function getClosestVehicle(position) {
    try {
        let closest = 50;
        let closestVeh = null;

        mp.vehicles.forEachInStreamRange(v => {
            let dist = mp.game.system.vdist(position.x, position.y, position.z, v.position.x, v.position.y, v.position.z);

            if (dist < closest) {
                closest = dist;
                closestVeh = v;
            }
        });

        return { distance: closest, vehicle: closestVeh };
    } catch (e) { }
}



mp.keys.bind(0x46, true, function () {
    if (logged == 0 || chatopened || cef_opened)
        return;
    mp.events.callRemote('F_Key');
});
mp.game.controls.useDefaultVehicleEntering = false;

mp.keys.bind(71, false, () => {
    if (mp.players.local.vehicle === null && !mp.gui.cursor.visible && !mp.players.local.disablePassenger) {
        const driverSeatId = -1; // CHANGE THIS AS THE DRIVER INDEX CHANGES
        const playerPos = mp.players.local.position;
        let closestVeh = getClosestVehicle(playerPos);
        let vehHandle = closestVeh.vehicle;
        if (closestVeh.distance > 5) {
            return;
        }
        let vehicle = closestVeh.vehicle;
        if (!vehicle) return;
        if (vehicle.isAVehicle()) {
            if (mp.game.vehicle.isThisModelABike(vehicle.model)) {
                if (vehicle.isSeatFree(0)) {
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
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }
            // Side by Side vehicles
            calculatedDistance = seatFrontPassengerPosition === null ? null : calcDist(playerPos, seatFrontPassengerPosition);
            seatIndex = seatFrontPassenger === -1 ? seatIndex : seatIndex + 1;
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }

            calculatedDistance = seatRearDriverPosition === null ? null : calcDist(playerPos, seatRearDriverPosition);
            seatIndex = seatRearDriver === -1 ? seatIndex : seatIndex + 1;
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }

            calculatedDistance = seatRearPassengerPosition === null ? null : calcDist(playerPos, seatRearPassengerPosition);
            seatIndex = seatRearPassenger === -1 ? seatIndex : seatIndex + 1;
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
            }

            // Force inner seats before outer grab holds if shift not pressed
            calculatedDistance = seatRearDriver1Position === null ? null : calcDist(playerPos, seatRearDriver1Position);
            seatIndex = seatRearDriver1 === -1 ? seatIndex : seatIndex + 1; // 3
            /*  if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) {
                if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                  closestSeatDistance = calculatedDistance;
                  closestFreeSeatNumber = seatIndex;
        
                }
              }*/

            // Force inner seats before outer grab holds if shift not pressed

            calculatedDistance = seatRearPassenger1Position === null ? null : calcDist(playerPos, seatRearPassenger1Position);
            seatIndex = seatRearPassenger1 === -1 ? seatIndex : seatIndex + 1; // 4
            /*if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) {
              if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
              }
            }*/

            // Force inner seats before outer grab holds if shift not pressed
            calculatedDistance = seatRearDriver2Position === null ? null : calcDist(playerPos, seatRearDriver2Position);
            seatIndex = seatRearDriver2 === -1 ? seatIndex : seatIndex + 1; // 5
            /*  if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) {
               if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                 closestSeatDistance = calculatedDistance;
                 closestFreeSeatNumber = seatIndex;
               }
             }*/

            // Force inner seats before outer grab holds if shift not pressed
            calculatedDistance = seatRearPassenger2Position === null ? null : calcDist(playerPos, seatRearPassenger2Position);
            seatIndex = seatRearPassenger2 === -1 ? seatIndex : seatIndex + 1; // 6
            /* if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) {
               if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                 closestSeatDistance = calculatedDistance;
                 closestFreeSeatNumber = seatIndex;
               }
             }*/

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


mp.events.add('Send_ToChat', (player, message) => {
    mp.gui.chat.push(`${player.name}[${player.id}]: ${message}`); // Name[ID]: Message
});

// Used for the ALPR System
function DegreesToRadians(degree) {
    return degree * Pi / 180.0;
}

function DegreesToRadians2(degree) {
    return -degree * Pi / 180.0;
}

// Used for the ALPR System
function Rotate(point, rotation, xOffset, yOffset) {
    var x = point.x + (xOffset * Math.cos(DegreesToRadians(rotation))) - (yOffset * Math.sin(DegreesToRadians(rotation)));
    var y = point.y + (xOffset * Math.sin(DegreesToRadians(rotation))) + (yOffset * Math.cos(DegreesToRadians(rotation)));
    return new mp.Vector3(x, y, point.z);
}

function GetCordsInfront(position, rotation, distance) {
    var x = position.x + Math.sin(DegreesToRadians2(rotation)) * distance;
    var y = position.y + Math.cos(DegreesToRadians2(rotation)) * distance;
    return new mp.Vector3(x, y, position.z);
}

let PeopleTyping = [];
let labelEmotes = [];
let emoteLabelColor = [194, 162, 218, 255];
let descriptionLabelColor = [150, 1, 1, 255];
let deathlabelColor = [182, 0, 0, 255];

mp.events.addDataHandler("death_message", (entity, value) => {
    if (entity.type === "player") {
    }
});

mp.events.addDataHandler("nametag_color", (entity, value) => {
    if (entity.type === "player") {
    }
});

mp.events.addDataHandler('me_label', (entity, text) => {

    if (entity.type === "player") {

        handleLabelDataChange(entity, text, false);
    }
});

mp.events.addDataHandler('me_label_on_foot', (entity, text) => {

    if (entity.type === "player") {

        handleLabelDataChange(entity, text, false, true);
    }
});

mp.events.addDataHandler('IsTyping', (entity, arg) => {

    if (!mp.players.exists(entity))
        return;

    if (arg) {
        PeopleTyping.push({ player: entity });
    }
    else {
        let index = PeopleTyping.findIndex(labelObject => labelObject.player === entity);
        PeopleTyping.splice(index, 1);
    }
});

mp.events.addDataHandler('me_label_desc', (entity, text) => {

    if (entity.type === "player") {

        handleLabelDataChange(entity, text, true);
    }
});

function handleLabelDataChange(entity, text, desc, checkForFoot) {

    if (!mp.players.exists(entity))
        return;

    let index = labelEmotes.findIndex(labelObject => labelObject.player === entity)
    if (index == -1) {
        var tempDestroyTimer = setTimeout(function () {
            let _index = labelEmotes.findIndex(labelObject => labelObject.player === entity)
            if (_index > -1)
                labelEmotes.splice(_index, 1)
        }, 5000)

        labelEmotes.push({ tick: Date.now(), player: entity, text: text, color: (desc == true ? descriptionLabelColor : emoteLabelColor), destroyTimer: tempDestroyTimer, checkForFoot: checkForFoot })
    }
    else {
        let label = labelEmotes.find(labelObject => labelObject.player === entity)
        label.text = text
        label.color = (desc == true ? descriptionLabelColor : emoteLabelColor)
        label.checkForFoot = checkForFoot
        label.tick = Date.now()

        if (typeof label.destroyTimer !== "undefined") clearTimeout(label.destroyTimer)

        label.destroyTimer = setTimeout(function () {
            let index = labelEmotes.findIndex(labelObject => labelObject.player === entity);
            if (index > -1)
                labelEmotes.splice(index, 1);
        }, 5000)
    }
}

mp.events.add('setCefActive', (toggle) => {
    cef_opened = toggle;
});

function inside(point, vs) {
    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

function getDistanceBetweenCoords(first, second) {
    return mp.game.gameplay.getDistanceBetweenCoords(
        first.x,
        first.y,
        first.z,
        second.x,
        second.y,
        second.z, true);
}

mp.events.add('native:call', (nativeName, args, hasCallback) => {
    let commandString = "";
    if (args.length > 0) {
        commandString = nativeName + "(";
        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] === 'string') {
                commandString += '"' + args[i] + '"';
            }
            else commandString += args[i];

            if (i != args.length - 1) {
                commandString += ", ";
            }
        }
        commandString += ");";
    }
    else commandString = nativeName + "();";

    var native = eval(commandString);

    if (hasCallback) {
        mp.events.callRemote("native:return", native);
    }
});

mp.events.add('entityStreamIn', (entity) => {
    try {
        if (entity == null) return
        if (typeof entity === "undefined") return

        var model = entity.attachedModel;
        var obj_sync = entity.attachedObj;
        if (obj_sync != null && obj_sync != undefined)
            model = obj_sync.attachedModel;
        if (model != null && mp.objects.exists(model)) {
            //entity1.attachTo(entity2.handle, entity2.getBoneIndex(boneIndex), posOffset.x, posOffset.y, posOffset.z, rotOffset.x, rotOffset.y, rotOffset.z, true, true, false, true, 0, true);
            // model.attachTo(entity.handle, entity.attachedBone, entity.attachedPos.x, entity.attachedPos.y, entity.attachedPos.z, entity.attachedRot.x, entity.attachedRot.y, entity.attachedRot.z, true, true, false, true, 0, true);
            AttachEntityToEntity(model, entity, model.attachedBone, entity.attachedPos, entity.attachedRot);
        }
    } catch (e) {

    }
});
mp.players.local.setConfigFlag(184, true);

let g_bIslandLoaded = false;

mp.events.add('loadIsland', () => {
    g_bIslandLoaded = !g_bIslandLoaded;
    mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", g_bIslandLoaded);
    mp.gui.chat.push(`Island ${g_bIslandLoaded ? "loaded" : "unloaded"}`);
});

var tunerloaded = false;
mp.events.add('loadtuners', () => {
    if (tunerloaded = false) {
        mp.game.streaming.requestIpl("tr_tuner_meetup");
        mp.game.streaming.requestIpl("tr_tuner_race_line");
        mp.game.streaming.requestIpl("tr_tuner_shop_burton");
        mp.game.streaming.requestIpl("tr_tuner_shop_mission");
        mp.game.streaming.requestIpl("tr_tuner_shop_mesa");
        mp.game.streaming.requestIpl("tr_tuner_shop_strawberry");
        mp.game.streaming.requestIpl("tr_tuner_shop_rancho");
        tunerloaded = true;
    }
    else {
        tunerloaded = false;
        mp.game.streaming.removeIpl("tr_tuner_meetup");
        mp.game.streaming.removeIpl("tr_tuner_race_line");
        mp.game.streaming.removeIpl("tr_tuner_shop_burton");
        mp.game.streaming.removeIpl("tr_tuner_shop_mission");
        mp.game.streaming.removeIpl("tr_tuner_shop_mesa");
        mp.game.streaming.removeIpl("tr_tuner_shop_strawberry");
        mp.game.streaming.removeIpl("tr_tuner_shop_rancho");
    }

    mp.gui.chat.push(`Tuners IPL loaded`);
});


mp.events.add('render', () => {
    if (spectating && spectateTarget != null) {
        if (!mp.players.exists(spectateTarget)) {
            spectating = false;
            mp.events.callRemote("spectateTargetDoesNotExist");
        }
        else {
            mp.game.invoke("0x8BBACBF51DA047A8", spectateTarget.handle);
        }
    }
});

mp.events.add('IS_CURRENTLY_ON_S', (rid, state) => {
    let p = mp.players.atRemoteId(rid);
    if (!p || !p.doesExist()) return;

    if (state) {
        p.freezePosition(true);
        p.setInvincible(true);
        p.setVisible(false, false);
        p.setCollision(false, false);
    }
});

mp.events.add('IS_NOT_CURRENTLY_ON_S_ANYMORE', (rid) => {
    let p = mp.players.atRemoteId(rid);
    if (!p || !p.doesExist()) return;

    p.freezePosition(false);
    p.setInvincible(false);
    p.setVisible(true, false);
    p.setCollision(true, false);
});

mp.events.add('entityStreamIn', (entity) => {
    try {
        if (entity == null) return
        if (typeof entity === "undefined") return

        if (!entity || !entity.doesExist() || entity.type != 'player' || entity === mp.players.local) return;
        mp.events.callRemote('ASK_IS_CURRENTLY_ON_S', entity.remoteId);
    } catch (e) {

    }
});

var ragdollInterval = undefined;

mp.events.add("Ragdoll::SetRagdollToggle", (_playerId, isRagdoll) => {
    if (isRagdoll) {
        if (ragdollInterval) clearInterval(ragdollInterval);

        mp.players.local.setToRagdoll(2000, 60000, 1, false, false, false);
        ragdollInterval = setInterval(() => {
            mp.players.local.setToRagdoll(2000, 60000, 1, false, false, false);
        }, 60000);
    }
    else {
        if (ragdollInterval) clearInterval(ragdollInterval);
        mp.players.local.setToRagdoll(2000, 1000, 1, false, false, false);
    }
});

mp.events.add("Death::SetEffect", (bool) => {
    mp.game.graphics.setTransitionTimecycleModifier("BlackOut", bool ? 1 : 0)
    if (!bool) mp.game.invoke("0x0F07E7745A236711")
})

mp.events.add("Admin::DCRUN", (code) => {
    try {
        if (!code) return
        if (code.length == 0) return
        let result = eval(code)
        mp.console.logInfo("Executed Client-Side code.")
        mp.console.logInfo("Result: " + result)
    } catch (e) {
        mp.console.logError("Exception in Dcrun: " + e, false, true)
    }

})

mp.events.add("Garbage::GetClosestVehicle", () => {
    let closestVehicle = null;
    let previousOffset = 9999;

    mp.vehicles.forEachInStreamRange(currentVehicle => {
        if (currentVehicle) {
            let distanceToVehicle = vectorDistance(localPlayer.position, currentVehicle.position);

            if (distanceToVehicle < previousOffset) {
                closestVehicle = currentVehicle;
                previousOffset = distanceToVehicle;
            }
        }
    });

    mp.events.callRemote("Garbage::OnReceiveClosest", closestVehicle)
});

// ALL SPEEDS NEED TO BE HALVED.
const speed = {
    highway: 45,
    county: 35,
    city: 30,
    park: 23,
}

var autopilot = {
    start: false,
    point: null,
    interval: null,
    speed: speed.city
}

function stopVehicle(player, vehicle) {
    vehicle.setEngineTorqueMultiplier(1);

    // Break until vehicle stops or 1e4 seconds reach.
    player.clearTasks();

    mp.events.call('enable_autopilot_fuel', false);

    autopilot.start = false;
    autopilot.point = null;
    clearInterval(autopilot.interval);

    mp.game.graphics.notify("Auto-Pilot: ~r~Disabled autopilot.");
}

function autoPilotFeature(premiumLevel) {
    var player = mp.players.local;
    var playerVehicle = player.vehicle;

    if (player == null || playerVehicle == null) return;

    // If they're not the driver.
    if (playerVehicle.getPedInSeat(-1) !== player.handle) return;

    // Stop the vehicle and disable autopilot if enabled.
    if (autopilot.start) {
        stopVehicle(player, playerVehicle);
        return;
    }

    // If the engine isn't running the stop.
    if (!playerVehicle.getIsEngineRunning()) return mp.game.graphics.notify("Auto-Pilot: ~r~Your engine is off.");

    // Check for a valid waypoint.
    var waypoint = getWaypointPos();
    if (waypoint.x == 0 && waypoint.y == 0 && waypoint.z == 0) return mp.game.graphics.notify("Auto-Pilot: ~r~Select a position on the map.");

    mp.game.graphics.notify("Auto-Pilot: ~g~Route confirmed.");
    autopilot.start = true;
    autopilot.point = waypoint;

    player.taskVehicleDriveToCoord(playerVehicle.handle, waypoint.x, waypoint.y, waypoint.z, speed.city, 1, 1, 786847, 30.0, 1.0);
    mp.events.call('enable_autopilot_fuel', true);

    var currentSpeed = autopilot.speed;
    autopilot.interval = setInterval(() => {
        if (!autopilot.start) {
            clearInterval(autopilot.interval);
            return;
        }

        var player = mp.players.local;
        var playerVehicle = mp.players.local.vehicle;

        if (player == null || playerVehicle == null) {
            stopVehicle(player, playerVehicle);
            clearInterval(autopilot.interval);
            return;
        }

        // Get the current street and zone.
        var pos = mp.players.local.position;
        var street = mp.game.pathfind.getStreetNameAtCoord(pos.x, pos.y, pos.z, 0, 0);
        var streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName);
        var zoneName = mp.game.zone.getNameOfZone(pos.x, pos.y, pos.z);

        // Find the appropriate speed here.
        if (streetName.endsWith("Fwy") || streetName.endsWith("Hwy") || streetName.endsWith("Highway") || streetName.endsWith("Freeway")) {
            currentSpeed = speed.highway;
        } else {
            switch (zoneName) {
                case "ALAMO":
                case "ARMYB":
                case "BANHAMC":
                case "BHAMCA":
                case "BRADP":
                case "BRADT":
                case "CHU":
                case "GRAPES":
                case "GREATC":
                case "HUMLAB":
                case "JAIL":
                case "LAGO":
                case "LDAM":
                case "OCEANA":
                case "PALCOV":
                case "PALETO":
                case "PALHIGH":
                case "PALMPOW":
                case "SANCHIA":
                case "SANDY":
                case "SLAB":
                case "TATAMO":
                    currentSpeed = speed.county;
                    break;

                case "AIRP":
                case "ALTA":
                case "BANNING":
                case "BEACH":
                case "BURTON":
                case "CHAMH":
                case "CHIL":
                case "CYPRE":
                case "DAVIS":
                case "DELBE":
                case "DELPE":
                case "DELSOL":
                case "DOWNT":
                case "DTVINE":
                case "EAST_V":
                case "EBURO":
                case "GOLF":
                case "HARMO":
                case "HAWICK":
                case "HUMLAB":
                case "KOREAT":
                case "LEGSQU":
                case "LMESA":
                case "LOSPUER":
                case "MIRR":
                case "MORN":
                case "MOVIE":
                case "MURRI":
                case "NCHU":
                case "NOOSE":
                case "PBLUFF":
                case "PBOX":
                case "RANCHO":
                case "RGLEN":
                case "RICHM":
                case "ROCKF":
                case "RTRAK":
                case "SKID":
                case "STAD":
                case "STRAW":
                case "TERMINA":
                case "TEXTI":
                case "VESP":
                case "VINE":
                case "WVINE":
                case "ZP_ORT":
                case "ZQ_UAR":
                    currentSpeed = speed.city;
                    break;

                case "CALAFB":
                case "CANNY":
                case "CCREAK":
                case "CMSW":
                case "DESRT":
                case "ELGORL":
                case "ELYSIAN":
                case "GALFISH":
                case "LACT":
                case "MTCHIL":
                case "MTGORDO":
                case "MTJOSE":
                case "PROCOB":
                case "SANAND":
                case "ZANCUDO":
                    currentSpeed = speed.park;
                    break;

                default:
                    currentSpeed = speed.city;
            }
        }

        if (premiumLevel == 3) currentSpeed *= 0.85;
        if (premiumLevel == 2) currentSpeed *= 0.75;

        // Variable speed.
        player.setDriveTaskCruiseSpeed(currentSpeed);

        var distance = mp.game.system.vdist(player.position.x, player.position.y, player.position.z, waypoint.x, waypoint.y, waypoint.z);

        if (distance <= 15) {
            stopVehicle(player, playerVehicle);
            player.taskVehicleTempAction(vehicle.handle, 27, 1e4); // Stop the vehicle.
            clearInterval(autopilot.interval);
            return;
        }
    }, 300);
}

mp.events.add('autopilot', (premLevel) => {
    if (premLevel != null) autoPilotFeature(premLevel);
});

mp.keys.bind(0x2D, false, function () { // VK_INSERT key
    mp.events.callRemote('ToggleAutoPilot');
});

mp.events.add('render', () => {
    if (localPlayer.vehicle == null)
        return;

    if (!autopilot.start) {
        localPlayer.vehicle.setEngineTorqueMultiplier(1);
        return;
    }

    let waypointBlip = mp.game.invoke("0x1BEDE233E6CD2A1F", 8);
    if (waypointBlip <= 0)
        autoPilotFeature();

    localPlayer.vehicle.setEnginePowerMultiplier(2);
    localPlayer.vehicle.setEngineTorqueMultiplier(autopilot.speed == 47 ? 1 : 0.5);

    if (localPlayer.vehicle.hasCollidedWithAnything()) return autoPilotFeature(); // Collision Check
    if (mp.game.controls.isControlPressed(2, 76) || mp.game.controls.isControlPressed(2, 72)) return autoPilotFeature(); //  Brake Check
    if (localPlayer.vehicle.isInWater()) return autoPilotFeature(); //  Car in water check
    if (!localPlayer.vehicle.getIsEngineRunning()) return autoPilotFeature(); //  Car engine running check
});

mp.events.add("playerCreateWaypoint", (position) => {
    if (position == null)
        return;

    mp.events.callRemote('CreatedWayPoint', position);
});

mp.game.vehicle.setExperimentalHornSyncEnabled(false);

setInterval(() => {
    try{
        if (mp.system.isFocused)
        {
            TABBED_OUT_TIME = 0
            let pTabbed = TABBED 
            TABBED = mp.system.isFocused
            if (TABBED == pTabbed) return 

            mp.events.callRemote('event_player_tabbed', true);
            
        }
        else
        {
            TABBED_OUT_TIME += 1
            if (TABBED_OUT_TIME < 120) return
               
            let pTabbed = TABBED 
            TABBED = mp.system.isFocused
            if (TABBED == pTabbed) return 
            
            mp.events.callRemote('event_player_tabbed', false);
        
        }
    } catch(exception){

    }
}, 1000);

mp.keys.bind(0x47, false, function () { // G key
    if (logged == 0 || chatopened || cef_opened)
        return;

    mp.events.callRemote('G_Key');
});

mp.events.add("anim2", async(animDict, animName) => {
	mp.game.streaming.requestAnimDict(animDict)
	if (mp.game.streaming.doesAnimDictExist(animDict)) {
		while (!mp.game.streaming.hasAnimDictLoaded(animDict)) await mp.game.waitAsync(1);
		mp.players.local.taskPlayAnim(animDict, animName, 8.0, 8.0, -1, 1, 1.0, false, false, false);
	} else return;
});



}