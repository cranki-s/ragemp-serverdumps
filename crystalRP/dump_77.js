{
var RentCar = null;
mp.events.add('openRentCarMenu', () => {  
    if (global.menuCheck() || RentCar != null) return;
    menuOpen();
	RentCar = mp.browsers.new('package://cef/System/RentCar/index.html');
    RentCar.execute(`RentCar.open()`);
});
mp.events.add('RentTakeCar', (carName, color, price) => {
    if (RentCar == null) return;
    mp.events.call("CloseRentCar");
    mp.events.callRemote("RentTakeCar:Server", carName, color, price);
});
mp.events.add('CloseRentCar', () => {
    if (RentCar != null) 
    {
        RentCar.destroy();
        RentCar = null;
	    menuClose();
    }
});
}