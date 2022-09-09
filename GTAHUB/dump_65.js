{
// Show roulette and set items
mp.rpc("ui_roulette:show", (title, description, options, winnerIndex) => {
    enableUI("roulette", false, false, true);
    browserCall("rouletteVM", "showRoulette", title, description, JSON.parse(options), winnerIndex);
});

mp.events.add("ui_roulette:hide", () => {
    disableUI("roulette");
    mp.events.callRemote("ui_roulette:hide")
});

mp.events.add("ui_roulette:on_start", () => {
    mp.events.callRemote("ui_roulette:on_start")
});

mp.events.add("ui_roulette:on_finish", () => {
    mp.events.callRemote("ui_roulette:on_finish")
});
}