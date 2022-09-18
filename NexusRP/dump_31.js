{
let bizinfo;
var bizinfoWindow = null;
var bizinfoOppened = false;
// // //
mp.events.add('bizinfoShow', (data) => {
    if (bizinfo == null) {
        bizinfo = mp.browsers.new('http://package/systems/business/info/FRONT/business.html');
        bizinfo.name = 'nexusbrowser'
    }

    bizinfo.execute(`business.locale='${global.Language}'`)
    bizinfo.execute(`business.showBusiness(${data})`)
    mp.gui.cursor.visible = true;
    global.menuOpen();

});

mp.events.add('Business:buyBusiness', () => {
    Nexus.callRemote('buybizz');
});

mp.events.add('Business:destroyBrowser', ()=>{
    if(bizinfo!=null){
        bizinfo.destroy();
        bizinfo = null;
    }
    global.menuClose();
    mp.gui.cursor.visible = false;
});

mp.events.add('Business:GopenInfo', ()=>{
    if (!global.loggedin || global.chatActive || editing || mp.game.ui.isPauseMenuActive() || cuffed || global.localplayer.getVariable('InDeath') == true || localplayer.getVariable('INVISIBLE') == true) return;
    Nexus.callRemote('Controls-Business:Openpad');
});
}