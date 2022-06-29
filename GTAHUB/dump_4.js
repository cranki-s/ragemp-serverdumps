{
/** 
 * Abstraction to work with many UIs that use cursor or disable chat at the same time.
 */

let uis = [];
let lastUIHide = 0; // trick to not detect click as soon as the UI mode is closed
let browser = null; // browser that contains all UIs
let hudHidden = false;
let radarToggled = false;
let mouseOverUi = false;

/** Wrapper to trigger call remote directly from CEF */
mp.events.add("ui:wrapped_trigger", (topUI, sound, event, ...args) => {
    if (topUI != "" && topUI != getTopUI()) {
        return;
    }

    if (sound == "ok") {
        mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    } else if (sound == "cancel") {
        mp.game.audio.playSoundFrontend(2, "BACK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    }

    mp.events.callRemote(event, ...args);
});

/** Wrapper to trigger sounds from CEF */
mp.events.add("ui:sound", (sound) => {
    if (sound == "ok") {
        mp.game.audio.playSoundFrontend(2, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    } else if (sound == "cancel") {
        mp.game.audio.playSoundFrontend(2, "BACK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    } else if (sound == "navigate") {
        mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    } else if (sound == "swap") {
        mp.game.audio.playSoundFrontend(2, "Pin_Centred", "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS", true);
    }
});

mp.events.add("sound:cancel", () => {
    mp.game.audio.playSoundFrontend(2, "BACK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
});

/** Returns true if there's any UI active. */
function isAnyUIEnabled() {
    return uis.length !== 0;
}

/** Execute raw browser core. Prefer browserSet and browserCall. */
function browserExecute(code) {
    if (browser == null) {
        browser = mp.browsers.new("package://html/bundle.html");
        browser.active = true;
    }
    browser.execute(code);
}

/** Set the given variable on the browser. */
function browserSet(vm, variable, value) {
    let code = vm + "." + variable + "=" + JSON.stringify(value);
    browserExecute(code);
}

/** Call the given function on the browser. */
function browserCall(vm, func, ...args) {
    let code = vm + "." + func + "(" + args.map(a => JSON.stringify(a)).join(",") + ")";
    browserExecute(code);
}

/**
 * Used to show or hide the radar, keeping in mind that
 * HUD can be toggled on/off.
 */
function toggleRadar(toggle) {
    radarToggled = toggle;
    if (isHudToggled()) { // update the change visually if the hud is on
        mp.game.ui.displayRadar(toggle);
        browserSet("hudVM", "show", toggle);
        mp.events.call("ui:on_toggle_radar", toggle);
    }
}

/** Returns true if the radar is visible, false otherwise */
function isRadarToggled() {
    return radarToggled;
}

function getLastUIHide() { return lastUIHide; }

function toggleHud(toggle) {
    if (browser) {
        browser.active = toggle;
        // update radar
        let shouldToggleRadar = toggle && radarToggled;
        mp.game.ui.displayRadar(shouldToggleRadar);
        mp.events.call("ui:on_toggle_radar", shouldToggleRadar);
    }
}

function isHudToggled() {
    if (!browser) {
        return false;
    }
    return browser.active;
}

/** Enable UI mode for the given view, putting the UI at the top. */
function enableUI(ui, disableChat, disableRadar, enableCursor) {
    for (let i = 0; i < uis.length; i++) { // ignore if it's duplicate
        if (uis[i].ui === ui) return;
    }

    if (enableCursor) mp.gui.cursor.visible = true;
    if (disableChat) mp.events.call("chat:show", false);
    if (disableRadar) toggleRadar(false);

    uis.push({ ui: ui, disableChat: disableChat, disableRadar: disableRadar, enableCursor: enableCursor });
}

/** Returns true if the given UI is enabled. */
function isUIEnabled(ui) {
    for (let i = 0; i < uis.length; i++) {
        if (uis[i].ui === ui) return true;
    }
    return false;
}



/** Returns the latest UI that entered UI mode, or null if isn't in UI mode. */
function getTopUI() {
    if (uis.length === 0) return null;
    return uis[uis.length - 1].ui;
}

/** Exit UI mode for the given UI. */
function disableUI(ui) {
    let idx = -1;
    for (let i = 0; i < uis.length; i++) {
        if (uis[i].ui == ui) {
            idx = i;
            break;
        }
    }

    if (idx === -1) return;
    uis.splice(idx, 1);

    let anyHidingRadar = false;
    let anyHidingChat = false;
    let anyEnablingCursor = false;
    for (let i = 0; i < uis.length; i++) {
        if (uis[i].disableChat) {
            anyHidingChat = true;
        }
        if (uis[i].disableRadar) {
            anyHidingRadar = true;
        }
        if (uis[i].enableCursor) {
            anyEnablingCursor = true;
        }
    }
    
    if (!anyEnablingCursor) {
        mp.gui.cursor.visible = false;
        lastUIHide = new Date().getTime();
    }
    if (!anyHidingChat) mp.events.call("chat:show", true);
    if (!anyHidingRadar) toggleRadar(true);
}

function isMouseOverUi() {
    return mouseOverUi;
}


/** /browsereval command to perform eval() on the browser */
mp.events.add("playerCommand", (command) => {
    if (command.startsWith("browsereval")) {
        let argument = command.substr("browsereval".length + 1)
        browserExecute("doEval(" + argument + ")");
    }
});

mp.events.add("ui:on_eval_result", (resultJSON) => {
    mp.console.logInfo(resultJSON);
});

mp.events.add("ui:on_eval_exception", (resultJSON) => {
    mp.console.logWarning(resultJSON);
});

// disable shot when player has UI
let lastCursor = 0;
mp.events.add("render", () => {
    if (!mp.gui.cursor.visible && Date.now() - lastCursor < 500) {
        mp.game.controls.disableControlAction(0, 24, true); // fire
    }

    if (mp.gui.cursor.visible) {
        lastCursor = Date.now();
    }
});

mp.events.add("ui:mouse_over", (toggle) => {
    mouseOverUi = toggle;
});
}