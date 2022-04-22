{
const util = require("util");
let outfitBrowser = undefined;
let teamData = undefined;
let sceneryCameraVar = true;

mp.events.add("setSceneryCameraVar", (enable) => {
    sceneryCameraVar = enable;
});

mp.events.add("toggleOutfitBrowser:Aztecas", (enable) => {
    if (enable == true) {
        outfitBrowser = mp.browsers.new("package://cef/outfitsUI/aztecasOutfits/index.html");
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

mp.events.add("loadTeam:Aztecas:Outfit1", () => {
    mp.events.callRemote("updateteam", 'TEAM_AZTECAS'); 
    mp.events.callRemote("updateTeamOutfit:Aztecas1");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 4);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Aztecas:Outfit2", () => {
    mp.events.callRemote("updateteam", 'TEAM_AZTECAS'); 
    mp.events.callRemote("updateTeamOutfit:Aztecas2");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 4);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Aztecas:Outfit3", () => {
    mp.events.callRemote("updateteam", 'TEAM_AZTECAS'); 
    mp.events.callRemote("updateTeamOutfit:Aztecas3");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 4);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});
}