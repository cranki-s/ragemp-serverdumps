{
mp.rpc("dailyreward:show", (data) => {
    browserCall("dailyrewardVM", "showDailyReward", JSON.parse(data));
    enableUI("dailyreward", true, true, true);
});

mp.rpc("dailyreward:hide", () => {
    browserExecute("dailyrewardVM.show=false");
    disableUI("dailyreward");
});

mp.rpc("dailyreward:claim", () => {
    mp.events.callRemote("dailyreward:claim");
});

mp.events.add("dailyreward:buy_plus", () => {
    mp.events.callRemote("dailyreward:buy_plus");
});

mp.events.add("dailyreward:buy_level", () => {
    mp.events.callRemote("dailyreward:buy_level");
});

mp.events.add("dailyreward:claim_old_rewards", () => {
    mp.events.callRemote("dailyreward:claim_old_rewards");
});

mp.events.add("dailyreward:close", () => {
    mp.events.callRemote("dailyreward:close");
});

mp.events.add("dailyreward:on_hover", () => {
    mp.game.audio.playSoundFrontend(2, "CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE", true);
});
}