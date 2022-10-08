{
// Чтобы скрыть мини-игру надо сделать execute на fisherman.hide = true
// Начиная от 212 заканчивая 215 строкой снести код - это дебаг
// Чтобы запустить рыбок надо сделать execute на fisherman.gameStart()
// 4 и 5 строка с true поставить на false это тоже дебаг
let fishBrowser;
let fishShow = false;
let fishingcounter = 0;
global.FisherManStart = false;
setInterval(() => {
	if(fishingcounter > 0){
        fishingcounter--
	}
}, 20000);
mp.events.add('Fisherman:Handler', (action, result) => {
    if(!action){
        if(fishBrowser) fishBrowser.destroy();
        fishBrowser = null;
        mp.gui.execute(`HUD.fisherman.active=false`);
        mp.gui.execute(`HUD.fisherman.inDetectZone=false`);
        if (result) {
            NexusEvent.callRemote('Fisher.Win');
            fishingcounter++;
        }
        else NexusEvent.callRemote('Fisher.Lose');
        if(fishingcounter > 10){
            NexusEvent.callRemote("SendToAdmins", "Fishing Exploit")
        }
        mp.gui.cursor.visible = false;
        fishShow = false;
        global.FisherManStart = false;
    }
});

mp.events.add('Fisher.Start', ()=>{
    if(!fishBrowser){ fishBrowser = mp.browsers.new('http://package/systems/jobs/fisherman/FRONT/index.html');
    fishBrowser.name = 'nexusbrowser';
}
    fishBrowser.execute(`fisherman.locale= '${global.Language}'`);
    mp.gui.execute(`HUD.fisherman.inDetectZone=false`);
    mp.gui.execute(`HUD.fisherman.active=true`);
    global.afkSecondsCount = 0;
    global.FisherManStart = true;
});

mp.events.add('Fisher:GotFish', () =>{
    NexusEvent.callRemote('Fisher.GotFish');
    mp.gui.execute(`HUD.fisherman.active=false`);
    global.afkSecondsCount = 0;
    global.FisherManStart = false;
});

mp.keys.bind(Keys.VK_E, false, () =>{
    if(fishBrowser){
        if(!fishShow){
            fishShow = true;
            mp.gui.cursor.visible = true;
            fishBrowser.execute(`fisherman.hide=false`);
        }else{
            fishShow = false;
            mp.gui.cursor.visible = false;
            fishBrowser.execute(`fisherman.hide=true`);
        }
    }
});



mp.events.add('Fisher.UpdateHUD', (status) => {
    mp.gui.execute(`HUD.fisherman.inDetectZone=${status}`);
});
}