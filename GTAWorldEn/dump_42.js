{
﻿var taxiCounter ﻿= null;
mp.events.add('showTaxiCounter', () => {
	if (!mp.browsers.exists(taxiCounter))
	{
		taxiCounter ﻿= mp.browsers.new﻿("package://gtalife/taxi/Taxi.html");
		mp.events.callRemote('UpdateFareCounter');
	}
});

mp.events.add('hideTaxiCounter', () => {
	if (taxiCounter != null && mp.browsers.exists(taxiCounter))
	{
		
		taxiCounter.destroy();
	}
});

mp.events.add('taxiStartCounter', () => {
    mp.events.callRemote('TaxiStartCounter');
});

mp.events.add('taxiStopCounter', () => {
    mp.events.callRemote('TaxiStopCounter');
});

mp.events.add('CounterStart', () => {
    //mp.gui.cursor.show(false, false);
});

mp.events.add('UpdateFarePrice', (price) => {
	if (taxiCounter != null && mp.browsers.exists(taxiCounter))
	{
		taxiCounter.execute(`$( '#fareprice').text( '$${price}');`);
	}
});

mp.events.add('UpdateFareCosts', (price2) => {
	if (taxiCounter != null && mp.browsers.exists(taxiCounter))
	{
		
		taxiCounter.execute(`$( '#farecosts').text( '$${price2} per 5 seconds');`);
	}
});

mp.events.add('GetFareSpeed', () => {
    let vehicle = mp.players.local.vehicle;
	let velocity = null;
	if(mp.vehicles.exists(vehicle))
	{
		velocity = vehicle.getVelocity();
	}else{
		velocity = new mp.Vector3(0, 0, 0);
	}
    
    mp.events.callRemote('CalculateFareCosts', velocity.x, velocity.y, velocity.z);
});
}˩