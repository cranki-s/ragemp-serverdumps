{
let sellingmenu = null;
mp.events.add('openSellingMenu', (title,items) => {
    if (sellingmenu == null) {
        sellingmenu = mp.browsers.new('http://package/systems/player/SellingMenu/FRONT/sellingmenu.html');
        sellingmenu.name = 'nexusbrowser';
    }
    sellingmenu.execute(`sellingmenu.locale= '${global.Language}'`);
    sellingmenu.execute(`sellingmenu.TitleName= '${title}'`);
    sellingmenu.execute(`sellingmenu.armyClothes= ${items}`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;    
});
mp.events.add('CloseSellingMenu', () => {
    if (sellingmenu != null) {
        sellingmenu.destroy();
        sellingmenu = null;
    }
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
});
mp.events.add('selectSellingItem',(itemId)=>{
    mp.events.call('CloseSellingMenu');
    NexusEvent.callRemote('SellCarCallBack',itemId);    
});


}