{
﻿var spawnerWindow = null;
mp.events.add('SPAWNER::show', (vehicles, name) => {
	if (!mp.browsers.exists(spawnerWindow))
	{
		spawnerWindow = mp.browsers.new("package://gtalife/GarageSpawn/spawner.html");

		var data = JSON.stringify(vehicles);
		var vehjson = JSON.parse(data);
		spawnerWindow.execute(`vehicleData = ${vehjson};`);
		spawnerWindow.execute(`garageName = '${name}';`);
		spawnerWindow.execute(`InitializeTable();`);
		mp.gui.cursor.show(true, true);
		mp.gui.chat.show(false);
		mp.events.call('setCefActive', true);
	}
});

mp.events.add('SPAWNER::close', () => {
	//setTimeout(() => { 
		if(spawnerWindow != null && mp.browsers.exists(spawnerWindow)) 
		{
			spawnerWindow.destroy();
			spawnerWindow = null;
	
			mp.gui.cursor.show(false, false);
			mp.gui.chat.show(true);
			mp.events.call('setCefActive', false);
		}
	//}, 1000);
});

mp.events.add('SPAWNER::closeButton', () => {
    mp.events.call('SPAWNER::close');
});

mp.events.add('SPAWNER::takeVehicle', (id) => {
    mp.events.callRemote('SPAWNER::TakeVehicle', id);
});

}