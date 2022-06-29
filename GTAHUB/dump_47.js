{
/** 
 * This file contains the interface to interact with the joebill 
 * generic main menu, using an HTML view.
 */

require("ui.js");

let menuShown = false;
let lastTab = 0;

/** TAB to open/close menu */
mp.keys.bind(0x09, true, () => {
    handleTabPress();
});

/** Closes on esc too */
mp.keys.bind(0x1B, false, () => {
    if (menuShown) {
        handleTabPress();
    }
});

function canOpenTab() {
    return !(isAnyUIEnabled() && getTopUI() !== "menu" && getTopUI() !== "dailyreward");
}

function handleTabPress() {
    if (!canOpenTab()) return;

    let now = new Date().getTime();
    if (now - lastTab < 400) {
        return;
    }

    lastTab = now;
    if (!menuShown) {
        enableUI("menu", true, true, true);

        // effects
        mp.game.graphics.transitionToBlurred(200);
        mp.game.graphics.startScreenEffect("SwitchHUDIn", 200, false);
        mp.game.audio.playSoundFrontend(2, "FocusIn", "HintCamSounds", true);

        // browser
        menuShown = true;
        browserCall("menuVM", "toggle", true);
    } else {
        disableUI("menu");

        // effects
        mp.game.audio.playSoundFrontend(2, "FocusOut", "HintCamSounds", true);
        mp.game.graphics.stopScreenEffect("SwitchHUDIn");
        mp.game.graphics.startScreenEffect("SwitchHUDOut", 200, false);
        mp.game.graphics.transitionFromBlurred(200);

        // browser
        menuShown = false;
        browserCall("menuVM", "toggle", false);
    }
}

/* Methods to set the menu data */
mp.rpc("menu:set_menu_data", (data) => {
    browserExecute("menuVM.menu = " + data + ";");
});

mp.rpc("menu:select_tab", (tab) => {
    if (!menuShown) {
        handleTabPress();
    }
    browserExecute("menuVM.onSelectTab(" + tab + ")");
});

/* Methods to set the content */
mp.rpc("menu:set_tab_content", (contentType, contentData) => {
    browserExecute("menuVM.contentType='';");
    setTimeout(() => { // trigger animation
        browserExecute("menuVM.contentType=" + JSON.stringify(contentType));
    }, 1);

    if (contentType === "table") {
        browserExecute("menuVM.table = " + contentData + ";");
    } else if (contentType === "pricing") {
        browserExecute("menuVM.pricing = " + contentData + ";");
    } else if (contentType === "url") {
        browserExecute("menuVM.url = " + contentData + ";");
    }
});

/** Close CEF button */
mp.events.add("menu:on_close", () => {
    handleTabPress();
});

/* Methods to delegate to backend from CEF. May use a wrapper function for less boilerplate */
mp.events.add("menu:on_select_tab", (index) => {
    if (getTopUI() !== "menu") return;
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("menu:on_select_tab", index);
});

mp.events.add("menu:table:on_back", () => {
    if (getTopUI() !== "menu") return;
    mp.game.audio.playSoundFrontend(2, "BACK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    mp.events.callRemote("menu:table:on_back");
});

mp.events.add("menu:table:on_click_description", () => {
    if (getTopUI() !== "menu") return;
    mp.game.audio.playSoundFrontend(2, "BACK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    mp.events.callRemote("menu:table:on_click_description");
});

mp.events.add("menu:table:on_action", (actionIndex) => {
    if (getTopUI() !== "menu") return;
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("menu:table:on_action", actionIndex);
});

mp.events.add("menu:table:on_navigation", (navigationIndex) => {
    if (getTopUI() !== "menu") return;
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("menu:table:on_navigation", navigationIndex);
});

mp.events.add("menu:table:on_click_item", (itemIndex) => {
    if (getTopUI() !== "menu") return;
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("menu:table:on_click_item", itemIndex);
});

mp.events.add("menu:pricing:on_select_option", (index) => {
    if (getTopUI() !== "menu") return;
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("menu:pricing:on_select_option", index);
});

mp.events.add("menu:pricing:on_redeem_code", () => {
    if (getTopUI() !== "menu") return;
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("menu:pricing:on_redeem_code");
});


}