{
var AZS = null;
mp.events.add('openAZS', (data) => {  
    if (global.menuCheck() || AZS != null) return;
    menuOpen();
	AZS = mp.browsers.new('package://cef/System/petrol/index.html');
    AZS.execute(`AZS.open(${data})`);
});
mp.events.add('BuyFuel', (type, countFuel, price) => {  
    if (AZS != null) 
        mp.events.callRemote("BuyFuel:Server", type, countFuel, price);
});
mp.events.add('BuyFullFuel', (price, price2, price3) => {  
    if (AZS != null) 
        mp.events.callRemote("BuyFullFuel:Server", price, price2, price3);
});
mp.events.add('BuyTools', (type) => {  
    if (AZS != null) 
        mp.events.callRemote("BuyTools:Server", type);
});
mp.events.add('CloseAZS', () => {
    if (AZS != null) {
        AZS.destroy();
        AZS = null;
	    menuClose();
    }
});
}