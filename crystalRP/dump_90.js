{
let roulette;
let caseid = -1;
let startRoulette = false;
mp.keys.bind(Keys.VK_F7, false, function () { // F7 key	
    if (roulette == null){
        if (!loggedin || global.chatActive || editing || global.menuOpened) return;
        mp.events.call("openRoulette");
        return;
    }
    if (startRoulette == false)
        mp.events.call('r:rouletteClose');
});
mp.events.add('openRoulette', () => {
    if (roulette == null) { 
        roulette = mp.browsers.new('package://cef/System/roulette/index.html');
        caseid = -1;
        mp.events.callRemote("r:SendCasePrize");
        global.menuOpen()
    };
})
mp.events.add('r:SendCasePrize', (prize,money) => {
    if (roulette != null) { 
        roulette.execute(`roulette.prizes=${prize}`);
        roulette.execute(`roulette.money=${money}`);
    };
})
mp.events.add('r:setcase', (c) => {   
    if (roulette != null) 
        roulette.execute(`roulette.setCase(${c})`)
});
mp.events.add('r:getCase', (c) => {
    caseid = + c;
    mp.events.callRemote('r:GetCase', c);
});
mp.events.add('r:getWinId', (type) => {
    mp.events.callRemote('r:getWinId', type);
});
mp.events.add('r:getprize', (type, id) => {
    startRoulette = false;
    if(type && id != null && id != undefined) 
        mp.events.callRemote('r:getPrize', type, id);
});
mp.events.add('r:getWinIdCallback', (e, type, caseindex) => {
    if (roulette != null && caseid == caseindex) {
        startRoulette = true;
        roulette.execute(`roulette.getWinIdCallback(${e},'${type}')`);
    }
});
mp.events.add('HelpMenu:SendNotify', (type, layout, msg, time)=>{
    if (roulette != null) 
        roulette.execute(`notify(${type},${layout},'${msg}',${time})`);
});
mp.events.add('r:rouletteClose', () => {
    if (roulette != null) {
        roulette.destroy();
        roulette = null;
    }
    mp.events.callRemote('r:Close');
    global.menuClose();
    mp.gui.cursor.visible = false;
})
}