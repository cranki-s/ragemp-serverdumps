{
/** Generic list menu with options to extend list items. Used for catalogos or selection of complex items. */
require("ui.js");
require("pools.js");

let menuShown = false;
let currentMenuID = -1;

let pools = [
    mp.players, mp.vehicles, mp.objects, mp.pickups, mp.blips,
    mp.checkpoints, mp.markers, mp.colshapes, mp.labels
];

mp.rpc("itemmenu:set", (id, menuJson, initialSelection) => {
	menuShown = true;
    enableUI("itemmenu", true, true, true);
    currentMenuID = id;
    if (isUIEnabled("menu")) browserSet("itemmenuVM", "blackscreen", true);
    browserCall("itemmenuVM", "doShow", JSON.parse(menuJson), initialSelection);
});

mp.rpc("itemmenu:hide", (id) => {
    if (menuShown && id == currentMenuID) {
        disableUI("itemmenu");
        browserCall("itemmenuVM", "doHide");
        menuShown = false;
        browserSet("itemmenuVM", "blackscreen", false);
    }
});

mp.rpc("itemmenu:set_item_details", (id, index, details) => {
    if (currentMenuID == id) {
        browserSet("itemmenuVM", "itemDetails", JSON.parse(details));
    }
});

// CEF
mp.events.add("itemmenu:on_select", (itemIndex) => {
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    mp.events.callRemote("itemmenu:on_select", currentMenuID, itemIndex);
});

mp.events.add("itemmenu:on_action", () => {
    mp.game.audio.playSoundFrontend(2, "SELECT", "HUD_LIQUOR_STORE_SOUNDSET", true);
    mp.events.callRemote("itemmenu:on_action", currentMenuID);
});

mp.events.add("itemmenu:on_secondary_action", () => {
    mp.game.audio.playSoundFrontend(2, "SELECT", "HUD_LIQUOR_STORE_SOUNDSET", true);
    mp.events.callRemote("itemmenu:on_secondary_action", currentMenuID);
});

mp.events.add("itemmenu:on_change_variation", (variationIdx, isNext) => {
    mp.game.audio.playSoundFrontend(2, "NAV_LEFT_RIGHT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    mp.events.callRemote("itemmenu:on_change_variation", currentMenuID, variationIdx, isNext);
});

mp.events.add("itemmenu:on_change_color1", (color) => {
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    mp.events.callRemote("itemmenu:on_change_color1", currentMenuID, color);
});

mp.events.add("itemmenu:on_change_color2", (color) => {
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    mp.events.callRemote("itemmenu:on_change_color2", currentMenuID, color);
});

mp.events.add("itemmenu:on_close", () => {
    mp.game.audio.playSoundFrontend(2, "BACK", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
    mp.events.callRemote("itemmenu:on_close", currentMenuID);
});
}