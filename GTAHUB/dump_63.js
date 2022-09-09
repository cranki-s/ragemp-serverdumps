{
/** UI that lets you accept/reject a request. */
require("ui.js");

mp.rpc("whitelist:show", (stepsJSON, maxFails, maxSeconds) => {
    enableUI("whitelist", true, true, true);
    browserCall("whitelistVM", "enable", maxFails, maxSeconds, stepsJSON);
});

mp.rpc("whitelist:hide", () => {
    browserCall("whitelistVM", "disable");
    disableUI("whitelist");
});

mp.events.add("whitelist:on_finish", (fails) => {
    mp.events.callRemote("whitelist:on_finish", fails);
});

mp.events.add("whitelist:on_fail", (fails, secondsPassed) => {
    mp.events.callRemote("whitelist:on_fail", fails, secondsPassed);
});
}