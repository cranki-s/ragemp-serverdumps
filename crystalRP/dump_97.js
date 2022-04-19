{
let NumberMenu = null;
let Info;
mp.events.add('NumberMenu:OpenMenu', (item) => {
    Info = item;
    if (NumberMenu == null) {
        NumberMenu = mp.browsers.new('package://vehicle/VehicleNumberShop/FRONT/NumberMenu.html');
    }
    NumberMenu.execute(`numberChanger.load(${item})`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;    
});
mp.events.add('NumberMenu:Close', () => {
    if (NumberMenu != null) {
        NumberMenu.destroy();
        NumberMenu = null;
    }
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
});
mp.events.add('NumberMenu:ByNumber',(NumberArray)=>{
    mp.events.callRemote('NumberMenu:ByNumber',NumberArray);
});

mp.events.add('NumberMenu:ByNumberCallBack',(item)=>{
    NumberMenu.execute(`numberChanger.buyresolve(${item})`);
});

mp.events.add('NumberMenu:TakeNumber',()=>{
   mp.events.callRemote('NumberMenu:TakeNumber');
});
mp.events.add("changenum", (index,number) => {
    if(new Date().getTime() - global.lastCheck < 100) return; 
	global.lastCheck = new Date().getTime();
	mp.events.callRemote("changenum", index, number);
});
}