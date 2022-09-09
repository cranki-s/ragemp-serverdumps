{
/** 
 * This file contains an interface to spawn an arbitrary URL view to the player.
 */

require("ui.js");

// create/destroy URL data
mp.rpc("url:create", (title, urlData) => {
    browserSet("urlVM", "title", title);
    browserSet("urlVM", "url", JSON.parse(urlData));
    browserSet("urlVM", "show", true);
    enableUI("url", true, true, true);
});

mp.rpc("url:destroy", () => {
    if (isUIEnabled("url")) {
        browserSet("urlVM", "show", false);
        disableUI("url");
    }
});

/** Close CEF button */
mp.events.add("url:on_close", () => {
    if (getTopUI() != "url") return;
    mp.events.callRemote("url:on_close");
});



}