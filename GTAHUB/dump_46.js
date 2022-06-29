{
/** Implement an UI to edit many cfg keys at the same time, clientside. */
require("ui.js");

mp.rpc("cfgeditor:init", (content) => {
    enableUI("cfgeditor", true, true, true);
    browserSet("cfgeditorVM", "content", content);
    browserCall("cfgeditorVM", "doShow");
});

mp.rpc("cfgeditor:destroy", () => {
    browserCall("cfgeditorVM", "doHide");
    disableUI("cfgeditor");
});

mp.rpc("cfgeditor:on_saved", (saved, newContent) => {
    mp.events.callRemote("cfgeditor:on_saved", saved, saved ? newContent : "");
});
}