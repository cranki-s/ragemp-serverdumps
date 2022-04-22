{
const util = require("util");
let outfitBrowser = undefined;
let teamData = undefined;
let sceneryCameraVar = true;

mp.events.add("setSceneryCameraVar", (enable) => {
    sceneryCameraVar = enable;
});

mp.events.add("toggleOutfitBrowser:Bloods", (enable) => {
    if (enable == true) {
        outfitBrowser = mp.browsers.new("package://cef/outfitsUI/bloodsOutfits/index.html");
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

mp.events.add("loadTeam:Bloods:Outfit1", () => {
    mp.events.callRemote("updateteam", 'TEAM_BLOODS'); 
    mp.events.callRemote("updateTeamOutfit:Bloods1");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 7);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Bloods:Outfit2", () => {
    mp.events.callRemote("updateteam", 'TEAM_BLOODS'); 
    mp.events.callRemote("updateTeamOutfit:Bloods2");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 7);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Bloods:Outfit3", () => {
    mp.events.callRemote("updateteam", 'TEAM_BLOODS'); 
    mp.events.callRemote("updateTeamOutfit:Bloods3");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 7);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});
}