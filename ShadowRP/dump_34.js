{
mp.events.add("openFractionVehicleSpawner", (json) => {
  if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('fraction') <= 0) return;
  global.fractioncarspawner = mp.browsers.new('http://package/browser/modules/Fractions/VehicleSpawner/index.html');
  global.fractioncarspawner.active = true;
  global.menuOpen();
  global.fractioncarspawner.execute(`fractioncarspawner.active=true`);
  global.fractioncarspawner.execute(`fractioncarspawner.vehicles=${json}`);
});

mp.events.add("closeFractionVehicleSpawner", () => {
  if(global.fractioncarspawner)
		{
			global.menuClose();
			global.fractioncarspawner.active = false;
			global.fractioncarspawner.destroy();
		}
});

mp.keys.bind(Keys.VK_ESCAPE, false, function () {
	if(global.fractioncarspawner)
		{
			global.menuClose();
			global.fractioncarspawner.active = false;
			global.fractioncarspawner.destroy();
		}
});

mp.events.add("carspawner:trigger", (number, type) => {
  mp.events.callRemote('callbackCarSpawner', number, type);
});

}