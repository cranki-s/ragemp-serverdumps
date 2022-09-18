{
let adminPanelState = false;
global.adminPanel = mp.browsers.new('http://package/systems/adminSys/AdminPanel/FRONT/index.html');
global.adminPanel.active = false;
mp.keys.bind(0x77, false, function () {
	if(adminPanelState) global.adminPanel.execute("admlist.closepanel()");
	if (!loggedin || chatActive || editing  || global.menuOpened || !localplayer.getVariable("IS_ADMIN")) return;
	else Nexus.callRemote('openAdminPanel');
});

mp.events.add("openAdminPanel", (json, json2) => {
  if (!loggedin || chatActive || editing || cuffed) return;  
  if(global.adminPanel == null){
    global.adminPanel = mp.browsers.new('http://package/systems/adminSys/AdminPanel/FRONT/index.html');
  }
  global.adminPanel.active = true;  
  global.menuOpen();
  adminPanelState = true;
  global.adminPanel.execute(`admlist.locale = '${global.Language}'`);
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
      global.adminPanel = null;
		}
});

mp.events.add("getPlayerInfo", (id) => {
  Nexus.callRemote('getPlayerInfoToAdminPanel', id);
});
mp.events.add("loadPlayerInfo", (json) => {
  global.adminPanel.execute(`admlist.player=${json}`);
});
}