{
let adminPanelState = false;

mp.keys.bind(0x77, false, function () {
	if(adminPanelState) global.adminPanel.execute("admlist.closepanel()");
	if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened || !localplayer.getVariable("IS_ADMIN")) return;
	else mp.events.callRemote('openAdminPanel');
    lastCheck = new Date().getTime();
});

mp.events.add("openAdminPanel", (json, json2) => {
  if (!loggedin || chatActive || editing || cuffed) return;
  global.adminPanel = mp.browsers.new('http://package/browser/modules/AdminPanel/index.html');
  global.adminPanel.active = true;
  global.menuOpen();
  adminPanelState = true;
  global.adminPanel.execute(`admlist.active=true`);
  global.adminPanel.execute(`admlist.cmdlist=${json}`);
  global.adminPanel.execute(`admlist.items=${json2}`);
});

mp.events.add("closeAdminPanel", () => {
  if(global.adminPanel)
		{
			global.menuClose();
			adminPanelState = false;
			global.adminPanel.active = false;
			global.adminPanel.destroy();
		}
});

mp.events.add("getPlayerInfo", (id) => {
  mp.events.callRemote('getPlayerInfoToAdminPanel', id);
});
mp.events.add("loadPlayerInfo", (json) => {
  global.adminPanel.execute(`admlist.player=${json}`);
});
}