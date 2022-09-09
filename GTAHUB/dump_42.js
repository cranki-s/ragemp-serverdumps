{
/** Implements HUD notifications */

require("ui.js");

let notifications = {};

mp.rpc('notification:show', (key, notificationJson) => {
    if (!(key in notifications)) {
        mp.game.audio.playSoundFrontend(2, "INFO", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
        notifications[key] = true;
    }

    browserExecute("notificationsVM.notify(" + JSON.stringify(key) + "," + notificationJson + ");");
});

mp.rpc('notification:hide', (key) => {
    if (key in notifications) {
        delete notifications[key];
        browserExecute("notificationsVM.dismiss(" + JSON.stringify(key) + ");");
    }
});
}