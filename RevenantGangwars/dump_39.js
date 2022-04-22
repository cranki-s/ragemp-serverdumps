{
const util = require("util");
let outfitBrowser = undefined;
let teamData = undefined;
let sceneryCameraVar = true;

mp.events.add("setSceneryCameraVar", (enable) => {
    sceneryCameraVar = enable;
});

mp.events.add("toggleOutfitBrowser:Marabunta", (enable) => {
    if (enable == true) {
        outfitBrowser = mp.browsers.new("package://cef/outfitsUI/marabuntaOutfits/index.html");
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

mp.events.add("loadTeam:Marabunta:Outfit1", () => {
    mp.events.callRemote("updateteam", 'TEAM_MARABUNTA'); 
    mp.events.callRemote("updateTeamOutfit:Marabunta1");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 3);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Marabunta:Outfit2", () => {
    mp.events.callRemote("updateteam", 'TEAM_MARABUNTA'); 
    mp.events.callRemote("updateTeamOutfit:Marabunta2");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 3);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});

mp.events.add("loadTeam:Marabunta:Outfit3", () => {
    mp.events.callRemote("updateteam", 'TEAM_MARABUNTA'); 
    mp.events.callRemote("updateTeamOutfit:Marabunta3");
    mp.events.callRemote("enterTeam");
    mp.events.call("setTeamVar", 3);
    mp.events.call("setOutfitBrowserVar", false);

    outfitBrowser.destroy();
    outfitBrowser = undefined;

    sharedVariables.drawUI = true;

    setTimeout(function() {
        mp.events.call("toggleMainMenu", 5);
    }, 400)
});
}