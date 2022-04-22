{
var customOutfitBrowser1 = undefined;
let currentArenaIdx = undefined;
let lastArenaHandler = undefined;

mp.events.add("togglecustomoutfitmenu1", (caseNumber) => {
    if (caseNumber == 0) {
        customOutfitBrowser1 = mp.browsers.new("package://cef/customoutfitmenu1/index.html");
    }
    if (caseNumber == 1) {
        if (customOutfitBrowser1) {
            customOutfitBrowser1.destroy();

            customOutfitBrowser1 = undefined;
            mp.gui.cursor.visible = false;
        }
    }
    if (caseNumber == 2) {
        if (!mainSceneryCamera) {
            if (customOutfitBrowser1) {
                currentFFAIdx = undefined;
                customOutfitBrowser1.active = false;
                customOutfitBrowser1.destroy();
        
                customOutfitBrowser1 = undefined;

     		    mp.gui.cursor.visible = false;
            }
        }
    }
});

mp.events.add("setArenaIdx", (arenaIdx) => {
    sharedVariables.setArenaSelectionActive = true;
    currentArenaIdx = arenaIdx;
});

mp.events.add("setArenaHandler", () => {
    setTimeout(() => {
        lastArenaHandler = currentArenaIdx;
    }, 500);
});

mp.events.add("detectArenaChange", () => {
    if (lastArenaHandler != undefined) {
        mp.events.callRemote("arenacount:S", `${lastArenaHandler}`, 1);
        lastArenaHandler = undefined;
    }
});

mp.events.add("enterArena", () => {
    mp.game.graphics.notify(`You have Joined ~r~Arena ~w~${currentArenaIdx}`);
    if (currentArenaIdx) {
        sharedVariables.setArenaSelectionActive = false;
        sharedVariables.teamName = `~HUD_COLOUR_RED~Arena: ~w~${currentArenaIdx}`;
        sharedVariables.drawUI = true;
        mp.events.callRemote("enterArena:S", currentArenaIdx);
        mp.events.call("detectTeamChange");
        mp.events.call("detectArenaChange");
    }
}); 
}