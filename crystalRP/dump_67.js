{
mp.keys.bind(0x77, false, function () {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened || !localplayer.getVariable("IS_ADMIN")) return;
    mp.events.callRemote('openAdminPanel');
    lastCheck = new Date().getTime();
});

mp.events.add("openAdminPanel", (json, json2) => {
  if (!loggedin || chatActive || editing || cuffed) return;
  global.adminPanel = mp.browsers.new('package://cef/admin.html');
  global.menuOpen();
  global.adminPanel.active = true;
  setTimeout(function() {
    global.adminPanel.execute(`admlist.active=true`);
    global.adminPanel.execute(`admlist.cmdlist=${json}`);
    global.adminPanel.execute(`admlist.items=${json2}`);
  }, 250);
});

mp.events.add("closeAdminPanel", () => {
  setTimeout(function() {
		global.menuClose();
		if(global.adminPanel)
		{
			global.adminPanel.active = false;
			global.adminPanel.destroy();
		}
	}, 100);
});

}