{
const util = require("util");
let outfitBrowser = undefined;
let teamData = undefined;
let sceneryCameraVar = true;

mp.events.add("setSceneryCameraVar", (enable) => {
    sceneryCameraVar = enable;
});

mp.events.add("toggleOutfitBrowser:Saints", (enable) => {
    if (enable == true) {
        outfitBrowser = mp.browsers.new("package://cef/outfitsUI/saintsOutfits/index.html");
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

mp.events.add("loadTeam:Saints:Outfit1", () => {
    mp.events.callRemote("updateteam", 'TEAM_SAINTS'); 
    mp.events.callRemote("updateTeamOutfit:Saints1");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 1);
    mp.events.call("setOutfitBrowserVar", false);
    let team = "TEAM_SAINTS"

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Saints:Outfit2", () => {
    mp.events.callRemote("updateteam", 'TEAM_SAINTS'); 
    mp.events.callRemote("updateTeamOutfit:Saints2");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 1);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)

});
}