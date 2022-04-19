{
var RentCar = null;
mp.events.add('openRentCarMenu', (data) => {  
    if (global.menuCheck() || RentCar != null) return;
    menuOpen();
	RentCar = mp.browsers.new('package://cef/System/RentCar/index.html');
    RentCar.execute(`RentCar.open(${data})`);
});
mp.events.add('RentTakeCar', (carName, color) => {
    if (RentCar == null) return;
    mp.events.call("CloseRentCar");
    mp.events.callRemote("RentTakeCar:Server", carName, color);
});
mp.events.add('CloseRentCar', () => {
    if (RentCar != null)  {
        RentCar.destroy();
        RentCar = null;
	    menuClose();
    }
});
}