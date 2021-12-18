{
// Copyright © 2019 by CommanderDonkey
// Read README.md for using

let speedo = mp.browsers.new("package://speedometer/index.html");
let showed = false;
let player = mp.players.local;

mp.events.add('render', () =>
{
	if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle)
	{
		if(showed === false)
		{
			speedo.execute("showSpeedo();");
			showed = true;
		}

        let vel1 = player.vehicle.getSpeed() * 3.6;
        let vel = (vel1).toFixed(0);
		let gas = player.vehicle.getPetrolTankHealth();
		gas = gas < 0 ? 0: gas / 10;
		
		speedo.execute(`update(${vel}, ${gas});`);
	}
	else
	{
		if(showed)
		{
			speedo.execute("hideSpeedo();");
			showed = false;
		}
	}
});
}