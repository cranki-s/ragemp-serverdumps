{
globalThis.lastInteract = 0;

let toggleMouse = false,
    chatOpened = false;


mp.events.add("changeChatState", (state) => {
    chatOpened = state;
});

globalThis.canInteract = function() {
    return globalThis.lastInteract + 3000 < Date.now()
}

function Key_Interaction() {
    if (chatOpened || mp.gui.cursor.visible || !globalThis.canInteract()) return;
    mp.events.callRemote("Press_E");
    globalThis.lastInteract = Date.now();
}

function Key_Verbandskasten() {
    if (chatOpened || mp.gui.cursor.visible) return;
    mp.events.callRemote("Press_Comma");
}

function Key_Schutzweste() {
    if (chatOpened || mp.gui.cursor.visible) return;
    mp.events.callRemote("Press_Dot");
}

mp.keys.bind(0x77, true, () => {
    toggleMouse = !toggleMouse;
    mp.gui.cursor.show(toggleMouse, toggleMouse);
});

mp.keys.bind(74, true, () => {
    if (!globalThis.canInteract()) return;
    globalThis.lastInteract = Date.now();
    mp.events.callRemote("Press_J");
});

mp.keys.bind(78, true, () => {
    if (!globalThis.canInteract()) return;
    globalThis.lastInteract = Date.now();
    mp.events.callRemote("Press_N");
});

function toggleMainMenu() {
    if (globalThis.browser == null) {
        if (mp.gui.cursor.visible) return;
        mp.events.callRemote("Server:MainMenu:open", true);
        mp.gui.chat.activate(false);
    } else {
        if (!globalThis.canMainMenuBrowserBeClosed) return;
        globalThis.closeMainMenu();
    }
}


rebindHotkeys();
// Hotkeys

mp.events.add("Client:Hotkey:setHotkey", (Target, newKey) => {
    for (var hotkey in mp.storage.data.hotkeyData) {
        if (mp.storage.data.hotkeyData[hotkey].Target == Target) {
            mp.storage.data.hotkeyData[hotkey].OldKey = mp.storage.data.hotkeyData[hotkey].Key;
            mp.storage.data.hotkeyData[hotkey].Key = newKey;
            break;
        }
    }

    mp.storage.flush();
    rebindHotkeys();
});


function rebindHotkeys() {
    if (mp.storage.data.hotkeyData != undefined) {
        for (hotkey in mp.storage.data.hotkeyData) {
            switch (mp.storage.data.hotkeyData[hotkey].Target) {
                case "Hauptmenü":
                    mp.keys.unbind(mp.storage.data.hotkeyData[hotkey].OldKey, true, toggleMainMenu);
                    mp.keys.bind(mp.storage.data.hotkeyData[hotkey].Key, true, toggleMainMenu);
                    break;
                case "Interaktion":
                    mp.keys.unbind(mp.storage.data.hotkeyData[hotkey].OldKey, true, Key_Interaction);
                    mp.keys.bind(mp.storage.data.hotkeyData[hotkey].Key, true, Key_Interaction);
                    break;
                case "Verbandskasten":
                    mp.keys.unbind(mp.storage.data.hotkeyData[hotkey].OldKey, true, Key_Verbandskasten);
                    mp.keys.bind(mp.storage.data.hotkeyData[hotkey].Key, true, Key_Verbandskasten);
                    break;
                case "Schutzweste":
                    mp.keys.unbind(mp.storage.data.hotkeyData[hotkey].OldKey, true, Key_Schutzweste);
                    mp.keys.bind(mp.storage.data.hotkeyData[hotkey].Key, true, Key_Schutzweste);
                    break;
            }
        }
    } else {
        // Set Default Hotkeys
        mp.storage.data.hotkeyData = [
            { "Target": "Hauptmenü", "Key": 113, "OldKey": 113 }, // F2
            { "Target": "Interaktion", "Key": 69, "OldKey": 69 }, // E
            { "Target": "Verbandskasten", "Key": 188, "OldKey": 188 }, // Comma
            { "Target": "Schutzweste", "Key": 190, "OldKey": 190 }, // Punkt
        ];

        mp.storage.flush();
        rebindHotkeys();
    }
}
}