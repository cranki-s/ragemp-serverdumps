{
mp.events.add("game_skillcheck:on_show", () => {
    mp.game.audio.playSoundFrontend(-1, "ROUND_ENDING_STINGER_CUSTOM", "CELEBRATION_SOUNDSET", true);
});

mp.events.add("game_skillcheck:on_finish", (success) => {
    if (success) mp.game.audio.playSoundFrontend(-1, "Hit_In", "PLAYER_SWITCH_CUSTOM_SOUNDSET", true);
    else mp.game.audio.playSoundFrontend(-1, "ERROR", "HUD_AMMO_SHOP_SOUNDSET", true);
});

function startSkillcheckGame(data) {
    try {
        data = JSON.parse(data);
        if (typeof data.timesToComplete === "number") {
            openGame("http://package/html/games/skillcheck/index.html", false);
            minigameSet("skillcheckVM", "timesToComplete", data.timesToComplete);
        }
    } catch(e) {
        mp.console.logWarning(`cannot start skillcheck: ${e}`);
    }
}
}