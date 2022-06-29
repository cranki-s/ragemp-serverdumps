{
/**
 * Login/register UI implementation.
 */
require("ui.js");

mp.rpc("loginscreen:show", (screen, username, email) => {
    enableUI("login", false, true, true);
    browserCall("loginscreenVM", "toggle", true);
    browserExecute("loginscreenVM.screen=" + JSON.stringify(screen));
    browserExecute("loginscreenVM.username=" + JSON.stringify(username));
    browserExecute("loginscreenVM.email=" + JSON.stringify(email));
    browserExecute("loginscreenVM.error=''");
});

mp.rpc("loginscreen:error", (error) => {
    browserExecute("loginscreenVM.setError(" + JSON.stringify(error) + ")");
});

mp.rpc("loginscreen:hide", () => {
    browserCall("loginscreenVM", "toggle", false);
    browserExecute("loginscreenVM.screen=''");
    disableUI("login");
});

// callback dispatchers, from cef to local to remote
mp.events.add("loginscreen:on_login", (email, password) => {
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("loginscreen:on_login", email, password);
});
mp.events.add("loginscreen:on_register", (username, email, password) => {
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("loginscreen:on_register", username, email, password);
});
mp.events.add("loginscreen:on_recover_password", (email) => {
    mp.game.audio.playSoundFrontend(2, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    mp.events.callRemote("loginscreen:on_recover_password", email);
});
}