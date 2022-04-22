{
const util = require("util");
let outfitBrowser = undefined;
let teamData = undefined;
let sceneryCameraVar = true;

mp.events.add("setSceneryCameraVar", (enable) => {
    sceneryCameraVar = enable;
});

mp.events.add("toggleOutfitBrowser:losreyes", (enable) => {
    if (enable == true) {
        outfitBrowser = mp.browsers.new("package://cef/outfitsUI/losreyesOutfits/index.html");
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

mp.events.add("loadTeam:losreyes:Outfit1", () => {
    mp.events.callRemote("updateteam", 'TEAM_LOSREYES'); 
    mp.events.callRemote("updateTeamOutfit:losreyes1");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 6);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:losreyes:Outfit2", () => {
    mp.events.callRemote("updateteam", 'TEAM_LOSREYES'); 
    mp.events.callRemote("updateTeamOutfit:losreyes2");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 6);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:losreyes:Outfit3", () => {
    mp.events.callRemote("updateteam", 'TEAM_LOSREYES'); 
    mp.events.callRemote("updateTeamOutfit:losreyes3");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 6);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});
}