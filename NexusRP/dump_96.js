{
let NumberMenu = null;
mp.events.add('NumberMenu:OpenMenu', (item) => {
    if (NumberMenu == null) {
        NumberMenu = mp.browsers.new('http://package/systems/vehicle/VehicleNumberShop/FRONT/NumberMenu.html');
        NumberMenu.name = 'nexusbrowser';
    }
    NumberMenu.execute(`vehicleNumberShop.locale='${global.Language}'`);
    NumberMenu.execute(`vehicleNumberShop.load(${item})`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;    
});

// //load  item: {priceList:[[0,123],[1,123],[2,123]],myNumber:"",myNumberType:""}
// //this.priceList = [[0,123],[1,123],[2,123]],
// this.myNumber = "",
// this.myNumberType = 0,
//  this.currentNumber = 0,{this.priceList=a.priceList,this.myNumber=a.myNumber,this.myNumberType=a.myNumberType,this.currentNumber=0
mp.events.add('NumberMenu:Close', () => {
    if (NumberMenu != null) {
        NumberMenu.destroy();
        NumberMenu = null;
    }
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
});

mp.events.add('NumberMenu:ByNumber',(NumberArray)=>{
    NexusEvent.callRemote('NumberMenu:ByNumber',NumberArray);
});

mp.events.add('NumberMenu:ByNumberCallBack',(item)=>{
    NumberMenu.execute(`vehicleNumberShop.buyresolve(${item})`);
});

mp.events.add('NumberMenu:TakeNumber',()=>{
   NexusEvent.callRemote('NumberMenu:TakeNumber');
});

}