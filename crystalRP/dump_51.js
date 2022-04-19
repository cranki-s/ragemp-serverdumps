{
mp.keys.bind(Keys.VK_O, false, function () {
    if (!loggedin || chatActive || editing|| global.menuOpened || !localplayer.getVariable('IS_FAMILY')) return;
    mp.events.callRemote('openfamilymanager');
    lastCheck = new Date().getTime();
});

mp.events.add("openFamilyMenu", (json) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	global.menuOpen();
	global.familyManager = mp.browsers.new('package://cef/Family/FamilyManager/index.html');
	global.familyManager.active = true;
	global.familyManager.execute(`familyManager.active=true`);
	global.familyManager.execute(`familyManager.setinfo(${json})`);
});

mp.events.add("closeFamilyManagerMenu", () => {
	global.menuClose();
	if(global.familyManager){
		global.familyManager.active = false;
		global.familyManager.destroy();
	}
});

mp.events.add("loadfamilymemberstomenu", (json) => {
	try {
		if (json == "client")
		{	
			mp.events.callRemote('loadfamilymembers');
			return;
		}
		global.familyManager.execute(`familyManager.members=${json}`);
	}
	catch{}
});
mp.events.add("invitePlayerToFamily", (value) => {
	mp.events.callRemote('invitePlayerToFamily', value);
});
mp.events.add("changefamilyrank", (id, rank) => {
	mp.events.callRemote('changefamilyrank', id, rank);
});
mp.events.add("kickfamilymember", (id, reason) => {
	mp.events.callRemote('kickfamilymember', id, reason);
});
mp.events.add("fcGetmoney", () => {
	mp.events.callRemote('fcGetmoney');
});
mp.events.add("fcSetmoney", () => {
	mp.events.callRemote('fcSetmoney');
});
mp.events.add("fcBuyitem", (index) => {
	mp.events.callRemote('fcBuyitem', index);
});
mp.events.add("saveFamilySettings", (desc_1, desc_2, nums) => {
	mp.events.callRemote('saveFamilySettings', desc_1, desc_2, nums);
});
mp.events.add("saveChangesRanks", (allranks) => {
	mp.events.callRemote('saveChangesRanks', allranks);
});
mp.events.add("disbandFamily", (reason) => {
	mp.events.callRemote('disbandFamily', reason);
});
}