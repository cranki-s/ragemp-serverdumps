{
let GBrowser = null;

mp.events.add("openGarageBrowser", () => {
    GBrowser = mp.browsers.new("package://cef/garage/index.html");
    mp.gui.cursor.show(true, true);
});

mp.events.add("closeGarageBrowser", () => {
    GBrowser.destroy();
    mp.gui.cursor.show(false, false);
});

//Trigger//

mp.events.add("cbrowser:close", () => {
    mp.events.callRemote('closeGarageBrowser');
    GBrowser.destroy();
    mp.gui.cursor.show(false, false);
});
  
mp.events.add("schafter", () => {
	mp.events.callRemote('spawnVehicleByTeam', "kuruma");
	GBrowser.destroy();
	mp.gui.cursor.show(false, false);
});

mp.events.add("revolter", () => {
	mp.events.callRemote('spawnVehicleByTeam', "bf400");
	GBrowser.destroy();
	mp.gui.cursor.show(false, false);
});

mp.events.add("bati", () => {
	mp.events.callRemote('spawnVehicleByTeam', "kamacho");
	GBrowser.destroy();
	mp.gui.cursor.show(false, false);
});

mp.events.add("bf400", () => {
	mp.events.callRemote('spawnVehicleByTeam', "neon");
	GBrowser.destroy();
	mp.gui.cursor.show(false, false);
});

mp.events.add("comet", () => {
	mp.events.callRemote('spawnVehicleByTeam', "novak");
	GBrowser.destroy();
	mp.gui.cursor.show(false, false);
});

mp.events.add("entity", () => {
	mp.events.callRemote('spawnVehicleByTeam', "jugular");
	GBrowser.destroy();
	mp.gui.cursor.show(false, false);
});

mp.events.add("jester", () => {
	mp.events.callRemote('spawnVehicleByTeam', "pariah");
	GBrowser.destroy();
	mp.gui.cursor.show(false, false);
});

mp.events.add("donator", () => {
	mp.events.callRemote('spawnVehicleByTeam', "laferrari");
	GBrowser.destroy();
	mp.gui.cursor.show(false, false);
});
}