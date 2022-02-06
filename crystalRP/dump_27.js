{
global.stats = mp.browsers.new('package://cef/tabletka.html');;

var bool = false;

var access = 0;

mp.keys.bind(Keys.VK_F5, false, function () {
	if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true) return;   
    if (!bool) {
		if (global.menuCheck() )return;
		mp.events.callRemote('getquests');	
		mp.events.callRemote('getaccess');	
		mp.events.callRemote('getlist');	
		mp.events.callRemote('getforbes');
		stats.execute(`tablet.active=true`);
		stats.execute(`tablet.nick='${mp.players.local.name}'`);
		bool = true; 
		mp.gui.cursor.show(true, true);
    }
	 else
	 {
		mp.gui.cursor.show(false, false);
		stats.execute(`tablet.active=false`);
		bool = false;
	 }
 })
 
 mp.events.add('client::closetablet', function () {
	mp.gui.cursor.show(false, false);
	stats.execute(`tablet.active=false`);
	bool = false;
});

mp.events.add('sendbiz', function (id) {
	mp.events.call('client::closetablet');
    mp.events.callRemote('sendbiz', id);
});
 
mp.events.add('setorders', function (data) {
    stats.execute(`tablet.setorders(${data})`);
});

mp.events.add('setquests', function (data) {
    stats.execute(`tablet.setquests(${data})`);
});

mp.events.add('setforbes', function (data, cars, bizlist) {
    stats.execute(`tablet.setforbes(${data}, ${cars}, ${bizlist})`);
});

mp.events.add('setaccess', function (data) {
    stats.execute(`tablet.setacceess(${data})`);
	access = data;
});

mp.events.add('buyLicensePlate', (index, number) => {
	mp.events.callRemote('changenum', index, number);
});

mp.events.add('sendinputs', function (id, mats) {
	mp.events.callRemote('addorder', id, mats);
	mp.gui.cursor.show(false, false);
    bool = false;
});

mp.events.add('sendowner', function (owner) {
	if (access == 2)
		mp.events.callRemote('takeorder', owner);
	else if (access == 3)
		mp.events.callRemote('removeorder');
	mp.gui.cursor.show(false, false);
    bool = false;
});

mp.events.add('sendcancel', function () {
	mp.events.callRemote('untake');
	mp.gui.cursor.show(false, false);
    bool = false;
});

mp.events.add('sendorder', function () {
	mp.events.callRemote('removeorder');
	mp.gui.cursor.show(false, false);
    bool = false;
});
 
mp.events.add('hidebool', function (toggle) {
    bool = toggle;
});

mp.events.add("exitbgg", () => {
	mp.gui.cursor.show(false, false);
    bool = false;
});
}