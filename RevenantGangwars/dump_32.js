{
let mainmenu = undefined;

mp.events.add("toggleMainMenu", (caseNumber) => {
    if (caseNumber == 1) {
        if(mainSceneryCamera) {
            mainSceneryCamera.setActive(false);
            mainSceneryCamera.destroy();
    
            mainSceneryCamera = undefined;

            mp.events.call("setSceneryCameraVar", false);
        }

        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.game.ui.displayRadar(true);
        mp.gui.cursor.visible = false;
        mp.gui.chat.show(true);

        mainmenu.active = false;
        mainmenu.destroy();

        mainmenu = undefined;
    }
    if (caseNumber == 2) {
        mainmenu.active = false;
        mainmenu.destroy();

        mainmenu = undefined;
    }
    if (caseNumber == 3) {
        mp.events.callRemote("countDisplay");
        mainmenu = mp.browsers.new("package://cef/mainmenu/index.html");
        mp.gui.cursor.visible = true;  
    }
    if (caseNumber == 4) {
        if (!mainSceneryCamera) {
            if (!mainmenu && !accountBrowser && !outfitBrowserVar && !customOutfitBrowser) {
                mainmenu = mp.browsers.new("package://cef/mainmenu/index.html");
                mp.gui.cursor.visible = true; 
                mp.events.callRemote("countDisplay");       
            } else if (mainmenu && (!accountBrowser && !outfitBrowserVar)) {
                mainmenu.active = false;
                mainmenu.destroy();
        
                mainmenu = undefined;

     		    mp.gui.cursor.visible = false;
            }
        }
    }
    if (caseNumber == 5) {
        if(mainSceneryCamera) {
            mainSceneryCamera.setActive(false);
            mainSceneryCamera.destroy();
    
            mainSceneryCamera = undefined;

   	        mp.events.call("setSceneryCameraVar", false);
            mp.events.call('stats:Open');
        }

        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.game.ui.displayRadar(true);
        mp.gui.cursor.visible = false;
        mp.gui.chat.show(true);
    }
});

mp.events.add("teamCountDisplayClient", (t1, t2, t3, t4, t5, t6, t7, t8) => {
    if (mainmenu) {
        mainmenu.execute(`updateTeamCount(${t1}, ${t2}, ${t3}, ${t4}, ${t5}, ${t6}, ${t7}, ${t8});`);
    }
});

mp.events.add("FFACountDisplayClient", (ffa1, ffa2, ffa3, ffa4, ffa5, ffa6) => {
    if (mainmenu) {
        mainmenu.execute(`updateffacount(${ffa1}, ${ffa2}, ${ffa3}, ${ffa4}, ${ffa5}, ${ffa6});`);
    }
});

mp.events.add("arenaCountDisplayClient", (arena1, arena2, arena3, arena4, arena5, arena6) => {
    if (mainmenu) {
        mainmenu.execute(`updatearenacount(${arena1}, ${arena2}, ${arena3}, ${arena4}, ${arena5}, ${arena6});`);
    }
});

mp.events.add("sendLeaderboardInfo:C", (leaderboardPlacement) => {
    if (mainmenu) {
        mainmenu.execute(`updateLeaderboardStatus(${JSON.stringify(leaderboardPlacement)});`);
    }
});
}