{
require("ui.js");

let currentPhoneState = {};

mp.rpc("phone:visible", (visible) => {
    if (!visible) {
        disableUI("phone");
        disableUI("phone-input");
        browserExecute("phoneVM.hidden = true;");
    } else {
        enableUI("phone", false, false, false);
        browserExecute("phoneVM.hidden = false;");
        mp.game.audio.playSoundFrontend(2, "Hang_Up", "Phone_SoundSet_Michael", true);
    }
});

mp.events.add("phone:on_close", (instantly) => {
    mp.game.audio.playSoundFrontend(2, "Click_Special", "WEB_NAVIGATION_SOUNDS_PHONE", true);
    mp.events.callRemote("phone:on_close");
});

/** Called by CEF when the phone enters an app that requires cursor */
mp.events.add("phone:on_inputmode_toggle", (toggle) => {
    if (toggle) {
        enableUI("phone-input", false, false, true);
    } else {
        disableUI("phone-input");
    }
});

mp.events.add("phone:on_submit", () => {
    mp.game.audio.playSoundFrontend(2, "Click_Fail", "WEB_NAVIGATION_SOUNDS_PHONE", true);
});

mp.events.add("phone:on_navigate", () => {
    mp.game.audio.playSoundFrontend(2, "CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE", true);
});

mp.events.add("phone:on_back", () => {
    mp.game.audio.playSoundFrontend(2, "Click_Special", "WEB_NAVIGATION_SOUNDS_PHONE", true);
});

// Events from the backend

mp.rpc("phone:ads", (adsJson) => {
    browserSet("phoneVM", "ads", JSON.parse(adsJson));
});

mp.rpc("phone:services", (servicesJson) => {
    browserSet("phoneVM", "services", JSON.parse(servicesJson));
});

mp.rpc("phone:ad_publish_info", (adPublishInfo) => {
    browserSet("phoneVM", "adPublishInfo", adPublishInfo);
});

mp.rpc("phone:ad_edit_info", (adEditInfo) => {
    browserSet("phoneVM", "adEditInfo", adEditInfo);
});


mp.rpc("phone:can_switch_to_alternative", (canSwitchToAlternative) => {
    browserSet("phoneVM", "canSwitchToAlternative", canSwitchToAlternative);
});

mp.rpc("phone:alternative_name", (alternativeName) => {
    browserSet("phoneVM", "alternativeName", alternativeName);
});

mp.rpc("phone:alternative_enabled", (alternativeEnabled) => {
    browserSet("phoneVM", "alternativeEnabled", alternativeEnabled);
});

mp.rpc("phone:data", (stateJson) => {
    currentPhoneState = JSON.parse(stateJson);
    browserExecute("phoneVM.phone = " + stateJson + ";");
    if (currentPhoneState.callState !== 0) {
        mp.events.call("phone:on_inputmode_toggle", false); // disable input cursor while on call
    }
});

let clearNotificationInterval = null;

mp.rpc("phone:notify_sms", (num, sms) => {
    browserCall("phoneVM", "notifySms", num, sms);
    if (clearNotificationInterval) {
        clearInterval(clearNotificationInterval);
    }
    clearNotificationInterval = setTimeout(() => {
        clearNotificationInterval = null;
        browserCall("phoneVM", "cancelNotification");
    }, 7500);
});

mp.rpc("phone:notify_ad", (adText) => {
    browserCall("phoneVM", "notifyAd", adText);
    if (clearNotificationInterval) {
        clearInterval(clearNotificationInterval);
    }
    clearNotificationInterval = setTimeout(() => {
        clearNotificationInterval = null;
        browserCall("phoneVM", "cancelNotification");
    }, 7500);
});

mp.rpc("phone:phones_on", (numberListJson) => {
    browserExecute("phoneVM.phonesOn = " + numberListJson + ";");
});

mp.rpc("phone:weather", (weather) => {
    browserSet("phoneVM", "weather", weather);
});

mp.rpc("phone:time", (time) => {
    browserSet("phoneVM", "time", time);
});

mp.rpc("phone:call_state", (callState) => {
    browserSet("phoneVM", "callState", callState);
});

mp.rpc("phone:call_num", (callNum) => {
    browserSet("phoneVM", "callNum", callNum);
});

// local events
mp.events.add("phone:on_open_location", (locationJson) => {
    let location = JSON.parse(locationJson);
    if (location.x && location.y && location.z) {
        mp.game.ui.setNewWaypoint(location.x, location.y);
        mp.events.call("phone:on_close");
    }
});

// Events targeted at the backend
mp.events.add("phone:on_message", (num, messageJSON) => {
    let locationToken = "\"{{mylocation}}\""
    if (messageJSON.indexOf(locationToken) != -1) {
        messageJSON = messageJSON.replace(locationToken, JSON.stringify(mp.players.local.position));
    }
    mp.events.callRemote("phone:on_message", num, messageJSON);
});

mp.events.add("phone:on_call", (num) => {
    mp.events.callRemote("phone:on_call", num);
});

mp.events.add("phone:on_publish_ad", (text, isHighlighted) => {
    mp.events.callRemote("phone:on_publish_ad", text, isHighlighted);
});

mp.events.add("phone:on_bump_ad", (adId) => {
    mp.events.callRemote("phone:on_bump_ad", adId);
});

mp.events.add("phone:on_delete_ad", (adId) => {
    mp.events.callRemote("phone:on_delete_ad", adId);
});

mp.events.add("phone:on_add_remove_contact", (num, name, added) => {
    mp.events.callRemote("phone:on_add_remove_contact", num, name, added);
});

mp.events.add("phone:on_call_accept_reject", (accepts) => {
    mp.events.callRemote("phone:on_call_accept_reject", accepts);
});

mp.events.add("phone:on_toggle_calls", () => {
    mp.events.callRemote("phone:on_toggle_calls");
});

mp.events.add("phone:on_toggle_messages", () => mp.events.callRemote("phone:on_toggle_messages"));

mp.events.add("phone:on_toggle_alternative", (toggle) => {
    mp.events.callRemote("phone:on_toggle_alternative", toggle);
});

mp.events.add("phone:on_select", (app) => {
    if (app === "cam") {
        if (mp.players.local.vehicle) {
            mp.events.call("hud:short_info", "No puedes usar eso aquí.", 3500)
            return
        }
        mp.events.call("phone:on_close");
        mp.events.call("item_camera:toggle", "PHONE")
        mp.events.call("player:toggle_newbie_help", true, "PHONE")
    }
})
}