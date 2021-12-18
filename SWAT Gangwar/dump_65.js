{
let adminbrowser = null,
    lastInteract = 0;



mp.keys.bind(0x76, false, function() {
    if(mp.players.local.getVariable("IsCefOpen") != undefined && mp.players.local.getVariable("IsCefOpen") == true) return;
    if (lastInteract + 3000 > Date.now()) {
        if (!mp.players.local.vehicle) mp.gui.chat.push("Spamschutz! Warte 3 Sekunden.");
        lastInteract = Date.now();
        return;
    }
    lastInteract = Date.now();
    mp.events.callRemote("Server:Admin:openBrowser");
});

mp.events.add("Client:Admin:openBrowser", () => {
    if (adminbrowser == null) adminbrowser = mp.browsers.new("package://cef/admin/index.html");
    // Öffnen
    mp.gui.chat.activate(false);
    mp.gui.cursor.show(true, true);
    
    setTimeout(() => {
            mp.events.callRemote("Server:Admin:requestPlayer");
            mp.events.callRemote("Server:Admin:requestReportPlayers");
            mp.events.callRemote("Server:Utilities:setCefState", true);
        }, 500);
    });

mp.events.add("Client:Admin:destroy", () => closeAdmin());



function closeAdmin() {
    if (adminbrowser != null) {
        adminbrowser.destroy();
        adminbrowser = null;
        mp.gui.chat.activate(true);
    }
    mp.gui.cursor.show(false, false);
    mp.events.callRemote("Server:Utilities:setCefState", false);
}

mp.events.add("Client:Admin:TSKICK", (id) => { 
    mp.events.callRemote("Server:Admin:TSKICK",id);
    closeAdmin();
});

mp.events.add("Client:Admin:TPTO", (id) => { 
    mp.events.callRemote("Server:Admin:TPTO",id);
    closeAdmin();
});

mp.events.add("Client:Admin:GETHERE", (id) => { 
    mp.events.callRemote("Server:Admin:GETHERE",id);
    closeAdmin();
});

mp.events.add("Client:Admin:resetHwID", (accId) => {
    mp.events.callRemote("Server:Admin:resetHwId", accId);
});

mp.events.add("Client:Admin:rename", (accId, newName) => {
    mp.events.callRemote("Server:Admin:rename", accId, newName);
});

mp.events.add("Client:Admin:renamesc", (accId, newscName) => {
    mp.events.callRemote("Server:Admin:renamesc", accId, newscName);
});

mp.events.add("Client:Admin:RemoveReport", (reportId) => {
    mp.events.callRemote("Server:Admin:ReportRemove", reportId);
});

mp.events.add("Client:Admin:SetActiveAdmin", (reportId) => {
    mp.events.callRemote("Server:Admin:SetActiveAdmin", reportId);
});

mp.events.add("Client:Admin:PlayerSpectate", (reportId) => {
    mp.events.callRemote("Server:Admin:PlayerSpectate", reportId);
    closeAdmin();
});

mp.events.add("Client:Admin:resetalltickets", () => {
    mp.events.callRemote("Server:Admin:resetalltickets");
});

mp.events.add("Client:Admin:updatePlayers", (json) => {
    if (adminbrowser == null) return;
    adminbrowser.execute(`setPlayerInfo('${json}')`);
});

mp.events.add("Client:Admin:updateReportPlayers", (json) => {
    if (adminbrowser == null) return;
    adminbrowser.execute(`setPlayerReports('${json}')`);
});

}