{
global.helpmenu = null;
global.helpMenuState = false;
mp.events.add('OpenHelpMenu', () => { // F10

    if (global.ListMenuOpen) { global.ListMenuOpen = false; global.menuOpened = false; }
    if (global.menuCheck() || localplayer.getVariable('seats') == true) return;
    if (localplayer.getVariable('seats') == true) return;
    if (global.helpmenu == null){ global.helpmenu = mp.browsers.new('http://package/systems/player/menuF10/FRONT/help.html');
    global.helpmenu.name = 'nexusbrowser';
}
    helpMenuState = !helpMenuState
    if (helpMenuState) {
        global.helpmenu.execute(`help.setKey(${JSON.stringify(global.cdnKey)})`);
        global.menuOpen();
        caseid = null;
        Nexus.callRemote('SendInfo', null);
        Nexus.callRemote('Quest.loadTitles');
        Nexus.callRemote('Report.loadData');
        Nexus.callRemote('Achievements.loadData');
        Nexus.callRemote('BattlePass.Open');
    } else {
        global.menuClose();
        helpmenu.destroy();
        helpmenu = null;
    }
    global.helpmenu.execute(`help.locale='${global.Language}'`);    
    global.helpmenu.active = false;
    mp.gui.cursor.visible = helpMenuState;
});
mp.events.add('OpenHelpMenu:ByTarget', () => { // F10

    if (global.ListMenuOpen) { global.ListMenuOpen = false; global.menuOpened = false; }
    if (global.menuCheck() || localplayer.getVariable('seats') == true) return;
    if (localplayer.getVariable('seats') == true) return;
    if (global.helpmenu == null){ global.helpmenu = mp.browsers.new('http://package/systems/player/menuF10/FRONT/help.html');
    global.helpmenu.name = 'nexusbrowser';
}
    helpMenuState = !helpMenuState
    if (helpMenuState) {
        global.menuOpen();
        caseid = null;        
        Nexus.callRemote('Quest.loadTitles');
        Nexus.callRemote('Report.loadData');
        Nexus.callRemote('Achievements.loadData');
        Nexus.callRemote('BattlePass.Open');
    } else {
        global.menuClose();
        helpmenu.destroy();
        helpmenu = null;
    }
    global.helpmenu.execute(`help.locale='${global.Language}'`);    
    global.helpmenu.active = false;
    mp.gui.cursor.visible = helpMenuState;
});




mp.events.add('HelpMenu.Debug.Restart', ()=>{
    mp.gui.chat.push(`Trying to restore F10`);
    try{
        Nexus.callRemote('Debug.MenuF10', JSON.stringify(global.helpmenu));
        global.helpmenu.destroy();  
    }catch{}
    global.helpmenu = null;
    helpMenuState = false;
    mp.gui.chat.push(`Success`);
    mp.events.call('notify', 2, 9, 'Debug: Menu F10 Restored', 6000);
})


mp.events.add('BattlePass.UpdateInfo', (dataJSON)=>{
    if(helpMenuState) global.helpmenu.execute(`help.battlepass=${dataJSON}`);  
})



mp.events.add('BattlePass:TakePrize', (lvl, itemType)=>{
    Nexus.callRemote('BattlePass.TakePrize', lvl, itemType);
})

mp.events.add('BattlePass:BuyLvl', (amount)=>{
    Nexus.callRemote('BattlePass.BuyLvl', amount);
})

mp.events.add('BattlePass:BuyPremium', ()=>{
    Nexus.callRemote('BattlePass.BuyPremium');
})


mp.events.add('BattlePass.UpdateOnline', (timeonline) => {
    var text = timeonline;
    if (text > 0) {
        var hours = Math.floor(text / 60);
        var mins = text % 60;
        text = "";
        if (hours > 0) {
            text = hours + global.GetText(" ч. ");
        }
        text += mins + global.GetText(" мин.")
    }
    if(helpMenuState) global.helpmenu.execute(`help.battlepass.timeExpAdd='${text}'`);  

});






//notify(1, 8, '124', 12000);

}