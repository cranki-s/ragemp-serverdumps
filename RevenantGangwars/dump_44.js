{
const util = require("util");
let outfitBrowser = undefined;
let teamData = undefined;
let sceneryCameraVar = true;

mp.events.add("setSceneryCameraVar", (enable) => {
    sceneryCameraVar = enable;
});

mp.events.add("toggleOutfitBrowser:Crips", (enable) => {
    if (enable == true) {
        outfitBrowser = mp.browsers.new("package://cef/outfitsUI/cripsOutfits/index.html");
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

mp.events.add("loadTeam:Crips:Outfit1", () => {
    mp.events.callRemote("updateteam", 'TEAM_CRIPS'); 
    mp.events.callRemote("updateTeamOutfit:Crips1");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 8);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Crips:Outfit2", () => {
    mp.events.callRemote("updateteam", 'TEAM_CRIPS'); 
    mp.events.callRemote("updateTeamOutfit:Crips2");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 8);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Crips:Outfit3", () => {
    mp.events.callRemote("updateteam", 'TEAM_CRIPS'); 
    mp.events.callRemote("updateTeamOutfit:Crips3");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 8);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});
}