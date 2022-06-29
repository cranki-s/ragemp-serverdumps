{
/** Implements input bindings for GTA. */
require("ui.js");

let inputList = {
    INTERACT: {key: 0x45, name: "E"},
    INTERACT_SECONDARY: {key: 0x52, name: "R"},
    USE_HAND_ITEM: {key: 0, name: "Click"}, // detected separately
    DROP_OR_TAKE_ITEM: {key: 0x42, name: "B"},
    START_ENGINE: {key: 0x10, triggerOnRelease: true, name: "Shift↑"},
    LOCK_UNLOCK_PROPERTY: {key: 0x58, name: "X"},
    HOUSE_MENU: {key: 0x58, name: "X"},
    VEHICLE_MENU: {key: 0x11, triggerOnRelease: true, name: "Ctrl"},
    ENTER_EXIT_ONFOOT: {key: 0x45, name: "E"},
    ENTER_EXIT_ONVEHICLE: {key: 0x45, name: "E"},
    CRAWLING: {key: 0x57, name: "W"},
    OPEN_PHONE: {key: 0x26, name: "↑"},
    TOGGLE_PHONE_CAMERA: {key: 0x45, name: "E"},
    TAKE_SCREENSHOT: {key: 0x74, name: "F5"},
    LOAD_WEAPON: {key: 0x52, name: "R"},
    PUZZLE_UP: {key: 0x26, name: "⇧"},
    PUZZLE_DOWN: {key: 0x28, name: "⇩"},
    PUZZLE_RIGHT: {key: 0x27, name: "⇨"},
    PUZZLE_LEFT: {key: 0x25, name: "⇦"},
    ANIMATION_MENU: {key: 0x4D, name: "M"},
    ANIMATION_STOP: {key: 0x12, triggerOnRelease: true, name: "Alt"},
    TOGGLE_NOCLIP: {key: 0x72, name: "F3"},

    // anim shortcuts
    ANIMATION_1: {key: 0, name: "Alt + 1"},
    ANIMATION_2: {key: 0, name: "Alt + 2"},
    ANIMATION_3: {key: 0, name: "Alt + 3"},
    ANIMATION_4: {key: 0, name: "Alt + 4"},
    ANIMATION_5: {key: 0, name: "Alt + 5"},
    ANIMATION_6: {key: 0, name: "Alt + 6"},
    ANIMATION_7: {key: 0, name: "Alt + 7"},
    ANIMATION_8: {key: 0, name: "Alt + 8"},
    ANIMATION_9: {key: 0, name: "Alt + 9"},
    ANIMATION_POINT: {key: 0, name: "L"},

    // Local input, just for the notification
    MENU: {key: 0, name: "Tab"},
    TALK: {key: 0, name: "N"},
    CHAT: {key: 0, name: "T"},
    TOGGLE_HELP: {key: 0, name: "F4"},
    TOGGLE_HUD: {key: 0, name: "F7"},
    ENTER_VEHICLE_PASSENGER: {key: 0, name: "G"},
    OPEN_INVENTORY: {key: 0, name: "I"},

    // object edition input
    EDITION_SAVE: {key: 0, name: "⏎ Enter"},
    EDITION_CANCEL: {key: 0, name: "⌫ Borrar"},
    EDITION_GROUND: {key: 0, name: "G"},
    EDITION_ROTATE_RIGHT: {key: 0, name: "Q"},
    EDITION_ROTATE_LEFT: {key: 0, name: "E"},
    EDITION_HEIGHT: {key: 0, name: "Alt"},
    EDITION_ACCELERATE: {key: 0, name: "Shift↑"},
};

let keysDown = {};
let clickDown = false;
let keyDownTime = {};
let controlsShown = false;

function sendInputPress(input, pressed) {
    mp.events.callRemote('player:on_input', input, pressed);
}

for (inputType in inputList) {
    let keyCode = inputList[inputType].key;
    let constInputType = inputType;
    let triggerOnRelease = inputList[inputType].triggerOnRelease || false;

    if (keyCode !== 0) {
        mp.keys.bind(keyCode, true, function() {
            if (!mp.gui.cursor.visible && !mp.game.ui.isPauseMenuActive() && !(constInputType in keysDown)) {
                keysDown[constInputType] = true;
                if (triggerOnRelease) { // in this case will trigger if releases the key quickly
                    keyDownTime[constInputType] = new Date().getTime();
                } else {
                    sendInputPress(constInputType, true);
                }
            }
        });
        mp.keys.bind(keyCode, false, function() {
            if (constInputType in keysDown) {
                if (triggerOnRelease) {
                    let timeDown = new Date().getTime() - (keyDownTime[constInputType] || 0);
                    if (timeDown < 400) {
                        sendInputPress(constInputType, true);
                        sendInputPress(constInputType, false);
                    }
                } else {
                    sendInputPress(constInputType, false);
                }
                delete keysDown[constInputType];
            }
        });
    }
}

mp.events.add("click", (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    if (leftOrRight === "left") {
        let pressed = upOrDown === "down";
        if (!pressed && clickDown) {
            sendInputPress("USE_HAND_ITEM", false);
            clickDown = false;
        } else {
            if (!mp.gui.cursor.visible && !mp.game.ui.isPauseMenuActive()) {
                if (new Date().getTime() - getLastUIHide() > 500) {
                    sendInputPress("USE_HAND_ITEM", true);
                    clickDown = true;
                }
            }
        }
    }
});


// Code to toggle the newbie help notification

mp.rpc("player:toggle_newbie_help", (toggle, type) => {
    if (toggle) {
        controlsShown = true;
        showHelpNotification(type);
    } else {
        controlsShown = false;
        hideHelpNotification();
    }
});

function makeControlsNotification(controls) {
    let result = [];
    for (c of controls) {
        result.push({t: "stack",
            e1: {t: "big_txt", msg: c.input, "color": "#cccccc", "align": 2},
            e2: {t: "big_txt", msg: c.name,  "color": "#cccccc", "align": 0}
        });
    }
    return result;
}

function showHelpNotification(type) {
    type = type.toString().toUpperCase();
    let controls = []

    switch(type) {
        case "NEWBIE": {
            controls = [
                {input: "~input_MENU~", name: "Ver menu"},
                {input: "~input_TALK~", name: "Hablar"},
                {input: "~input_CHAT~", name: "Chat"},
                {input: "~input_ANIMATION_MENU~", name: "Animaciones"},
                {input: "~input_OPEN_PHONE~", name: "Celular"},
                {input: "~input_OPEN_INVENTORY~", name: "Inventario"},
                {input: "~input_ANIMATION_POINT~", name: "Señalar"},
                {input: "~input_LOCK_UNLOCK_PROPERTY~", name: "Abrir/cerrar vehículo"},
            ];
            if (mp.players && mp.players.local.vehicle) {
                let isDriver = mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle;
                if (isDriver) {
                    controls.push({input: "~input_START_ENGINE~", name: "Motor"});
                }
                controls.push({input: "~input_VEHICLE_MENU~", name: "Opciones del vehículo"});
            } else { // on foot
                controls.push({input: "~input_ENTER_VEHICLE_PASSENGER~", name: "Vehículo (pasajero)"});
            }
            break;
        }
        case "PHONE": {
            controls = [
                {input: "~input_TOGGLE_PHONE_CAMERA~", name: "Cambiar modo de cámara"},
                {input: "~input_PUZZLE_LEFT~", name: "Disminuir filtro"},
                {input: "~input_PUZZLE_RIGHT~", name: "Aumentar filtro"},
                {input: "~input_TAKE_SCREENSHOT~", name: "Tomar foto"},
                {input: "~input_W~~input_A~~input_S~~input_D~", name: "Mover selfie-cam"},
                {input: "~input_TOGGLE_HUD~", name: "Ocultar/mostrar hud"},
            ];
            break;
        }
    }

    controls.push({input: "~input_TOGGLE_HELP~", name: "Ocultar/mostrar esto"});

    let notif = makeControlsNotification(controls);
    mp.events.call("notification:show", "controlsHint", JSON.stringify(notif));
}

function hideHelpNotification() {
    mp.events.call("notification:hide", "controlsHint");
}

mp.keys.bind(0x73/*F4*/, true, function() {
    if (!mp.gui.cursor.visible) {
        if (!controlsShown) {
            controlsShown = true;
            showHelpNotification("NEWBIE");
        } else {
            hideHelpNotification();
            controlsShown = false;
        }
    }
});

// Animation shortcuts

const animationShortcutKeys = {
    // key numbers
    ANIMATION_1: 0x31,
    ANIMATION_2: 0x32,
    ANIMATION_3: 0x33,
    ANIMATION_4: 0x34,
    ANIMATION_5: 0x35,
    ANIMATION_6: 0x36,
    ANIMATION_7: 0x37,
    ANIMATION_8: 0x38,
    ANIMATION_9: 0x39
};

let animKey = 0x12; // Alt (will be this+number)

for (shortcut in animationShortcutKeys) {
    let keyCode = animationShortcutKeys[shortcut];
    let shortcutConst = shortcut;
    mp.keys.bind(keyCode, true, () => {
        if (!mp.gui.cursor.visible && !mp.game.ui.isPauseMenuActive()) {
            if (!mp.players.local.vehicle && mp.keys.isDown(animKey)) {
                sendInputPress(shortcutConst, true);
                sendInputPress(shortcutConst, false);
                keyDownTime["ANIMATION_STOP"] = 0; // hack to "invalidate" the stop anim button (because is triggerOnRelease)
            }
        }
    });
}
}