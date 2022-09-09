{
mp.peds.new(0xEF154C47, new mp.Vector3(2416.5898, 4994.111, 46.329695), 135.5896, 0); //PED

mp.events.add("orangeOpenMenu", (json) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	global.menuOpen();
	global.menuOrange = mp.browsers.new('package://browser/modules/Jobs/Orange/index.html');
	global.menuOrange.active = true;
	global.menuOrange.execute(`init()`);
});

let openmenuworkorange = false;
mp.events.add("OpenWorkMenuOrange", (lvl, pay1, pay2, workid, work1, work2) => {
	if (!loggedin || chatActive || editing || cuffed ) return;
	global.menuOpen();
	openmenuworkorange = true;
	global.menuWorkOrange = mp.browsers.new('package://browser/modules/Jobs/Orange/jobsmenu/index.html');
	global.menuWorkOrange.active = true;
	global.menuWorkOrange.execute(`JobMenuOrange.workid='${workid}'`);
	global.menuWorkOrange.execute(`JobMenuOrange.workstate2='${work1}'`);
	global.menuWorkOrange.execute(`JobMenuOrange.workstate3='${work2}'`);
	global.menuWorkOrange.execute(`JobMenuOrange.lvl='${lvl}'`);
	global.menuWorkOrange.execute(`JobMenuOrange.jobpayment='${pay1}'`);
	global.menuWorkOrange.execute(`JobMenuOrange.jobpayment2='${pay2}'`);
	global.menuWorkOrange.execute(`JobMenuOrange.active=1`);
});

mp.events.add("closeOpenMenu", (count) => {
	global.menuClose();
	global.menuOrange.active = false;
	global.menuOrange.destroy();
	mp.events.callRemote("orangeStopWork", count);
});

mp.events.add("ChangeWorkStateOrange", (act) => {
	global.menuClose();
	openmenuworkorange = false;
	global.menuWorkOrange.execute('JobMenuOrange.active=0');
	mp.events.callRemote("ChangeWorkStateOrange", act);
});
mp.events.add("client::startOrangeWork", (act) => {
	openmenuworkorange = false;
	global.menuClose();
	global.menuWorkOrange.execute('JobMenuOrange.active=0');
	mp.events.callRemote("server::startOrangeWork", act);
});

mp.keys.bind(Keys.VK_ESCAPE, false, function () {
	if (openmenuworkorange == true) {
		global.menuClose();
		global.menuWorkOrange.execute('JobMenuOrange.active=0');
		openmenuworkorange = false;
		// global.menuWorkOrange.destroy();
	}
});
}