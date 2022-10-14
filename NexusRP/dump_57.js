{
let SearchMenu;

let items;

mp.events.add('Search:OpenMenu',(item,nameplayer,type)=>{
    if (!global.loggedin || global.chatActive || editing || global.menuCheck() || mp.game.ui.isPauseMenuActive() || cuffed || global.localplayer.getVariable('InDeath') == true || localplayer.getVariable('INVISIBLE') == true ) return;
    items = JSON.parse(item);
    if(SearchMenu == null){
    SearchMenu = mp.browsers.new('http://package/systems/GLOBAL/FRONT/controls.html');
    SearchMenu.name = 'nexusbrowser';
    SearchMenu.execute(`window.locale ='${global.Language}'`)
    SearchMenu.execute(`openInterface('search-protocol')`);
    SearchMenu.execute(`controls.openSearch(${JSON.stringify(items)},'${nameplayer}','${type}')`);
    }
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
});
mp.events.add('Search:GetOut',(itemID)=>{
    NewEvent.callRemote('Search:GetOut',itemID);    
});
mp.events.add('Search:CallBack',(status,newitem,nameplayer,type)=>{
    if(SearchMenu != null)
    {
        if (status) SearchMenu.execute(`controls.openSearch(${newitem},'${nameplayer}','${type}')`);
        else SearchMenu.execute(`controls.closeSearch()`);
    }
});
mp.events.add('Search:GetOutAll',()=>{
    NewEvent.callRemote('Search:GetOutAll')
});
mp.events.add('Search:DestroyBrowser',()=>{
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
    if(SearchMenu != null){
    SearchMenu.destroy();
    SearchMenu = null
    }
    items = null
})
}