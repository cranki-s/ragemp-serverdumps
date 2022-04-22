{
const util = require("util");
let outfitBrowser = undefined;
let teamData = undefined;
let sceneryCameraVar = true;

mp.events.add("setSceneryCameraVar", (enable) => {
    sceneryCameraVar = enable;
});

mp.events.add("toggleOutfitBrowser:Taliban", (enable) => {
    if (enable == true) {
        outfitBrowser = mp.browsers.new("package://cef/outfitsUI/talibanOutfits/index.html");
    }
    if (enable == false) {
        if (outfitBrowser && !sceneryCameraVar) {
            outfitBrowser.destroy();
            outfitBrowser = undefined;
            
            mp.events.call("setOutfitBrowserVar", false);

            mp.gui.cursor.visible = false;
        }
    }
});

mp.events.add("loadTeam:Taliban:Outfit1", () => {
    mp.events.callRemote("updateteam", 'TEAM_TALIBAN'); 
    mp.events.callRemote("updateTeamOutfit:Taliban1");
    mp.events.call("setTeamVar", 5);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Taliban:Outfit2", () => {
    mp.events.callRemote("updateteam", 'TEAM_TALIBAN'); 
    mp.events.callRemote("updateTeamOutfit:Taliban2");
    mp.events.call("setTeamVar", 5);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)

});
}