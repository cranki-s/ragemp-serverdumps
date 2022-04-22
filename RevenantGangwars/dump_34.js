{
var customOutfitBrowser = undefined;
var currentFFAIdx = undefined;
let lastFFAHandler = undefined;

mp.events.add("togglecustomoutfitmenu", (caseNumber) => {
    if (caseNumber == 0) {
        customOutfitBrowser = mp.browsers.new("package://cef/customoutfitmenu/index.html");
    }
    if (caseNumber == 1) {
        if (customOutfitBrowser) {
            customOutfitBrowser.destroy();

            customOutfitBrowser = undefined;
            mp.gui.cursor.visible = false;
        }
    }
    if (caseNumber == 2) {
        if (!mainSceneryCamera) {
            if (customOutfitBrowser) {
                currentFFAIdx = undefined;
                customOutfitBrowser.active = false;
                customOutfitBrowser.destroy();
        
                customOutfitBrowser = undefined;

     		    mp.gui.cursor.visible = false;
            }
        }
    }
});

mp.events.add("setFFAidx", (ffaIdx) => {
    currentFFAIdx = ffaIdx;
    sharedVariables.setFFASelectionActive = true;
});

mp.events.add("setFFAHandler", () => {
    setTimeout(() => {
        lastFFAHandler = currentFFAIdx;
    }, 500);
});

mp.events.add("detectFFAChange", () => {
    if (lastFFAHandler != undefined) {
        mp.events.callRemote("ffacount:S", `${lastFFAHandler}`, 1);
        lastFFAHandler = undefined;
    }
});

mp.events.add("enterFFA", () => {
    mp.game.graphics.notify(`You have Joined ~r~FFA ~w~${currentFFAIdx}`);
    if (currentFFAIdx) {
        sharedVariables.setFFASelectionActive = false;
        sharedVariables.ffaHandler = false;
        sharedVariables.teamName = `~HUD_COLOUR_RED~FFA: ~w~${currentFFAIdx}`;
        sharedVariables.drawUI = true;
        mp.events.callRemote("enterFFA:S", currentFFAIdx);
        mp.events.call("detectTeamChange");
        mp.events.call("detectArenaChange");
    }
});
}