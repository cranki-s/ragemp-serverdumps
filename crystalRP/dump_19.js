{
var tabletorgs = null;
mp.keys.bind(0x4D, false, function() {
	if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true) return;
	if (global.menuCheck() || tabletorgs != null) return;
	tabletorgs = mp.browsers.new('package://cef/org.html');
	mp.events.callRemote("openonside");		
});

mp.keys.bind(0x46, false, function() {
	if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true || !intrunk) return;
	localplayer.detach(true, true);
	mp.events.callRemote("fpress");
});

mp.events.add('opentableorg', function (members, cars, data, access) {
	if (global.menuCheck()) return;
	tabletorgs.execute(`tabletorg.show(${members},${cars},${data},${access})`);
    menuOpen();
});

mp.events.add('tabletmembers', function (nick) {
	mp.events.callRemote("memberscall", nick);
});

mp.events.add('tabletcars', function (number, id) {
	mp.events.callRemote("carscall", number, id);
});

mp.events.add('tabletinputfff', function (texts) {
	mp.events.callRemote("maladoyinput", texts);
});

mp.events.add('sellorg', function () {
	mp.events.callRemote("callsell");
});

mp.events.add('closetabletorg', function () {
	if (tabletorgs == null) return;
    menuClose();
	tabletorgs.destroy();
	tabletorgs = null;
});

mp.keys.bind(Keys.VK_Q, false, function () {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuCheck()) return;
	mp.events.callRemote("bizinfo");
    lastCheck = new Date().getTime();
});

mp.events.add('client::setbizinfo', (json) =>{
	menuOpen();
	mp.players.local.clearTasks();
	menu.execute(`biz.open(${json})`);
});

mp.events.add('client::bizclose', () =>{
	menuClose();
});

mp.events.add('client::bizbuy', () =>{
	mp.events.callRemote('server::getbuy');
});

}