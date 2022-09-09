{
mp.peds.new(0x65978363, new mp.Vector3(2195.9517, 5594.8716, 53.800000), 1.415625, 0); //Meo
mp.peds.new(0x94562DD7, new mp.Vector3(2222.3643, 5612.7930, 54.665000), 106.62787); 

mp.events.add("DrugOpenMenu2", (json) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	global.menuOpen();
	global.menuOrange = mp.browsers.new('http://package/browser/modules/Jobs/Drugs/index.html');
	global.menuOrange.active = true;
	global.menuOrange.execute(`init()`);
});

mp.events.add("closeOpenMenu2", (count) => {
	global.menuClose();
	global.menuOrange.active = false;
	global.menuOrange.destroy();
	mp.events.callRemote("DrugStopWork", count);
});
}