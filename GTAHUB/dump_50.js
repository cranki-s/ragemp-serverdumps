{
require("ui.js");

// listen for numpad and keyboard numbers
const numberKeys = {
    0: [0x30, 0x60],
    1: [0x31, 0x61],
    2: [0x32, 0x62],
    3: [0x33, 0x63],
    4: [0x34, 0x64],
    5: [0x35, 0x65],
    6: [0x36, 0x66],
    7: [0x37, 0x67],
    8: [0x38, 0x68],
};
for (let num in numberKeys) {
    let keyCodes = numberKeys[num];
    for (let i = 0; i < keyCodes.length; i++) {
        bindKeyToNumber(num, keyCodes[i]);
    }
}

let animShortcutKey = 0x12; // if pressing this, object should not be selected.
let hasItems = false;

let previewPed;
let playerClothes = {};
let playerProps = {};

// remove ped and frontend UI if the server restarts when player has inventory opened
mp.game.invoke("0x5E62BE5DC58E9E06"); // CLEAR_PED_IN_PAUSE_MENU
mp.game.ui.setFrontendActive(false);
previewPed = null;

function bindKeyToNumber(number, keyCode) {
    mp.keys.bind(keyCode, true, function() {
        if (!mp.gui.cursor.visible && !mp.keys.isDown(animShortcutKey)) {
            onNumberPress(number);
        }
    });
}

function onNumberPress(num) {
    let resultNum = parseInt(num);
    if (resultNum == 0) resultNum = 12;
    resultNum = resultNum - 1;
    mp.events.callRemote("hotbar:on_select_index", resultNum);
}

let talkingModeIcons = {
    "normal": "fa-microphone",
    "low": "fa-microphone-alt",
    "shout": "fa-bullhorn",
    "radio": "fa-rss-square"
};

let hideShortInfoInterval = null;
let hideLongInfoInterval = null;
let lastPlayerinvPress = 0;

mp.events.add("ui:on_toggle_radar", (toggle) => {
    browserSet("hudVM", "showMapUi", toggle);
});

mp.rpc("hud:health", (health) => {
    browserCall("hudVM", "setHealth", health);
})

mp.rpc("hud:armour", (armour) => {
    mp.players.local.setArmour(Math.round(armour*100));
    browserCall("hudVM", "setArmour", Math.round(armour*100));
});

mp.rpc("hud:food", (value) => {
    browserCall("hudVM", "setFood", value);
});

mp.rpc("hud:water", (value) => {
    browserCall("hudVM", "setWater", value);
})

mp.rpc("hud:money", (amount) => {
    browserCall("hudVM", "setWallet", amount);
});

mp.rpc("hud:bank", (amount) => {
    browserCall("hudVM", "setBank", amount);
});

mp.rpc("hud:listening", (name) => {
    browserExecute("hudVM.listeningName = " + JSON.stringify(name));
});

mp.rpc("hud:is_talking", (is_talking) => {
    browserExecute("hudVM.talking = " + is_talking);
});

mp.rpc("hud:short_info", (info, time) => {
    browserSet("hudVM", "shortMessage", info);
    if (hideShortInfoInterval) {
        clearInterval(hideShortInfoInterval);
    }
    hideShortInfoInterval = setTimeout(() => {
        browserSet("hudVM", "shortMessage", "");
        hideShortInfoInterval = null;
    }, time);
});

mp.rpc("hud:long_info", (info, time) => {
    browserSet("hudVM", "longMessage", info);
    if (hideLongInfoInterval) {
        clearInterval(hideLongInfoInterval);
    }
    hideLongInfoInterval = setTimeout(() => {
        browserSet("hudVM", "longMessage", "");
        hideLongInfoInterval = null;
    }, time);
});

mp.rpc("hud:talk_mode", (icon, name) => {
    // show the talking name for a few seconds
    let faIcon = talkingModeIcons[icon] || "microphone";
    browserCall("hudVM", "setTalkMode", faIcon, name);
});

mp.rpc("hotbar:toggle", (toggle) => {
    browserSet("hudVM", "show", toggle);
});

mp.rpc("hotbar:set_items", (items) => {
    let itemsParsed = JSON.parse(items);
    if (itemsParsed.items.length > 8) {
        itemsParsed.items = itemsParsed.items.slice(0, 8);
    }

    hasItems = true;
    browserSet("hudVM", "inv", itemsParsed);
    browserCall("playerinvVM", "resetDrag");
    browserSet("playerinvVM", "pocket", JSON.parse(items));
});

mp.rpc("hotbar:set_equipment", (items) => {
    browserCall("playerinvVM", "resetDrag");
    browserSet("playerinvVM", "equipment", JSON.parse(items));
});

mp.rpc("hotbar:set_index", (index) => {
    browserExecute("hudVM.inv.selectedIndex = " + index + ";");
});

mp.keys.bind(0x49, true, () => { // 'i' key
    if ((isAnyUIEnabled() && getTopUI() !== "playerinv") || mp.gui.cursor.visible || !hasItems) return;
    let now = new Date().getTime();
    if (now - lastPlayerinvPress < 400) {
        return;
    }
    lastPlayerinvPress = now;

    toggleInventory(!isUIEnabled("playerinv"));
});

/** Closes on esc */
mp.keys.bind(0x1B, false, () => {
    let now = new Date().getTime();
    if (now - lastPlayerinvPress < 400) {
        return;
    }

    if (isUIEnabled("playerinv")) {
        toggleInventory(false);
    }
});

async function toggleInventory(toggle) {
    togglePedScreen(toggle);
}

async function togglePedScreen(toggle) {
    if (toggle) {
        updatePlayerDrawables();
        mp.game.ui.setFrontendActive(true);
        mp.game.ui.activateFrontendMenu(mp.game.joaat("FE_MENU_VERSION_CORONA_INVITE_CREWS"), false, -1);
        await waitFrontend();

        let pos = mp.players.local.position;
        previewPed = mp.players.local.clone(mp.players.local.getHeading(), false, true);
        mp.game.invoke("0x06843DA7060A026B", previewPed, pos.x, pos.y, pos.z - 15, false, false, false, true);
        mp.game.invoke("0x428CA6DBD1094446", previewPed, true);

        setTimeout(() => mp.game.invoke("0xAC0BFBDC3BE00E14", previewPed, 0), 100); // GIVE_PED_TO_PAUSE_MENU with 100ms delay
        mp.game.invoke("0xECF128344E9FF9F1", false); // SET_PAUSE_MENU_PED_SLEEP_STATE
        mp.game.invoke("0x3CA6050692BC61B0", false); // SET_PAUSE_MENU_PED_LIGHTING
        mp.game.invoke("0x98215325A695E78A", false); // MOUSE


        setTimeout(() => {
            mp.game.invoke("0xECF128344E9FF9F1", true); // SET_PAUSE_MENU_PED_SLEEP_STATE
            mp.game.invoke("0x3CA6050692BC61B0", true); // SET_PAUSE_MENU_PED_LIGHTING
        }, 1000);
        toggleHud(true);

        // enable playerinv html
        enableUI("playerinv", true, true, true);

        // effects
        mp.game.graphics.transitionToBlurred(200);
        mp.game.graphics.startScreenEffect("SwitchHUDIn", 200, false);
        mp.game.audio.playSoundFrontend(2, "FocusIn", "HintCamSounds", true);

        let gender = mp.players.local.model === mp.game.joaat('mp_f_freemode_01') ? 'f' : 'm';
        browserSet("playerinvVM", "gender", gender);
        browserCall("playerinvVM", "toggle", true);
    } else {
        mp.game.invoke("0x5E62BE5DC58E9E06"); // CLEAR_PED_IN_PAUSE_MENU
        mp.game.ui.setFrontendActive(false);
        previewPed = null;

        // disable playerinv html
        disableUI("playerinv");

        // effects
        mp.game.audio.playSoundFrontend(2, "FocusOut", "HintCamSounds", true);
        mp.game.graphics.stopScreenEffect("SwitchHUDIn");
        mp.game.graphics.startScreenEffect("SwitchHUDOut", 200, false);
        mp.game.graphics.transitionFromBlurred(200);

        browserCall("playerinvVM", "resetDrag");
        browserCall("playerinvVM", "toggle", false);
    }
}

function updatePedScreen() {
    updatePlayerDrawables();

    mp.game.invoke("0x5E62BE5DC58E9E06"); // CLEAR_PED_IN_PAUSE_MENU

    previewPed = mp.players.local.clone(mp.players.local.getHeading(), false, true);
    let pos = mp.players.local.position;
    mp.game.invoke("0x06843DA7060A026B", previewPed, pos.x, pos.y, pos.z - 15, false, false, false, true);
    mp.game.invoke("0x428CA6DBD1094446", previewPed, true);

    setTimeout(() => mp.game.invoke("0xAC0BFBDC3BE00E14", previewPed, 0), 100); // GIVE_PED_TO_PAUSE_MENU with 100ms delay
}

function updatePlayerDrawables() {
    for (let x = 0; x < 11; x++) {
        playerClothes[x] = mp.players.local.getDrawableVariation(x);
        playerProps[x] = mp.players.local.getPropIndex(x);
    }
}

mp.setInterval(() => {
    if (previewPed) {
        for (let x = 0; x < 11; x++) {
            if (mp.players.local.getDrawableVariation(x) !== playerClothes[x]) {
                updatePedScreen();
            } else if (mp.players.local.getPropIndex(x) !== playerProps[x]) {
                updatePedScreen();
            }
        }
    }
}, 250)

mp.events.add("playerinv:on_close", () => {
    toggleInventory(false);
});

mp.events.add('playerinv:on_swap', (inventoryId1, itemIndex1, inventoryId2, itemIndex2) => {
    mp.events.callRemote("inventory:on_swap", inventoryId1, itemIndex1, inventoryId2, itemIndex2);
});

mp.events.add('playerinv:on_drop', (inventoryId, itemIndex) => {
    mp.events.callRemote("inventory:on_drop", inventoryId, itemIndex);
});

async function waitFrontend() {

    const isReady = resolve => {
        if(mp.game.invoke("0x3BAB9A4E4F2FF5C7")) resolve();
        else setTimeout(_ => isReady(resolve), 100);
    }

    return new Promise(isReady);
}
}