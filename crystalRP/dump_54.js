{
mp.events.add("openCreatorFamilyMenu", (json) => {
	try{
	if (!loggedin || chatActive || editing || cuffed) return;
	global.menuOpen();
	global.familyCreator = mp.browsers.new('package://cef/Family/FamilyCreator/index.html');
	global.familyCreator.active = true;
	global.familyCreator.execute(`familyCreator.active=true`);
	global.familyCreator.execute(`familyCreator.setinfo(${json})`);
	}
	catch{}
});

mp.events.add("closeFamilyCreatorMenu", () => {
	try{
		global.menuClose();
	if(global.familyCreator){
		global.familyCreator.active = false;
		global.familyCreator.destroy();
	}
	}
	catch{}
});

mp.events.add("createFamily", (name, maxpl, img) => {
	try {mp.events.callRemote("createnewfamily", name, maxpl, img); } catch{}
});

mp.events.add("loadlistfamilies", (sender, json) => {
	try{
	if(sender == "client") mp.events.callRemote("loadlistfamilies");
	if(sender == "server")
	{
		global.familyCreator.execute(`familyCreator.families=${json}`);
	}
	}
	catch{}
});
}