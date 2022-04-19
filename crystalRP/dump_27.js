{
// my english level good (koltr <3)
var gangarena = null;
global.match = false;
// < HOOK ON CLIENT >
// on player press hide button and this man in lobby 
mp.events.add('client::disconnectlobby', function () {
	mp.events.callRemote("server::disconnectlobby");
});
// on player press connect button
mp.events.add('client::getlobbylist', function () {
	mp.events.callRemote("server::getlobbylist");
});
// on player press connect lobby button
mp.events.add('client::connectlobby', function (index) {
	mp.events.callRemote('server::connectlobby', index);
});
// on player press connect lobby button
mp.events.add('client::kickplayer', function (nick) {
	mp.events.callRemote('server::kickplayer', nick);
});
// on player press create lobby button
mp.events.add('client::sendlobby', function (lobby) {
	mp.events.callRemote('server::sendlobby', lobby);
});
mp.events.add('client::startmatch', function () {
	mp.events.callRemote('server::startmatch');
});
mp.events.add('client::createlobby', function (listplayers, lobbyinfo) {
	gangarena.execute(`gangarena.createlobby(${listplayers},${lobbyinfo})`);
});
// on player press e on shape lobby
mp.events.add('client::openmenu', function () {
	if (global.menuCheck() || gangarena != null) return;
    menuOpen();
	gangarena = mp.browsers.new('package://cef/gangarena.html');
	gangarena.execute(`gangarena.show()`);
});
// for hooks (kick)
mp.events.add('client::closemenu', function () {
	if (gangarena == null) return;
	menuClose();
	gangarena.destroy();
	gangarena = null;
});
// for hooks (start)
mp.events.add('client::closemenuno', function () {
	menuClose();
	gangarena.execute(`gangarena.hidesno()`);
});
// on set hud
mp.events.add('client::sethud', function (active) {
	match = active;
	mp.players.local.freezePosition(true);
	setTimeout( () => { mp.players.local.freezePosition(false); }, 10000);
	gangarena.execute(`hudis.hud=${active}`);
});
mp.events.add('client::setkills', function (kills) {
	if (gangarena != null)
		gangarena.execute(`hudis.kills='${kills}'`);
});
mp.events.add('client::setdeaths', function (deaths) {
	if (gangarena != null)
		gangarena.execute(`hudis.deaths='${deaths}'`);
});
mp.events.add('client::settime', function (time) {
	if (gangarena != null)
		gangarena.execute(`hudis.time='${time}'`);
});
// on player connect to lobby
mp.events.add('client::refreshlobby', function (listplayers) {
	if (gangarena != null)
		gangarena.execute(`gangarena.refreshlobby(${listplayers})`);
});
// on player geting lobby
mp.events.add('client::setlobbylist', function (listlobby) {
	if (gangarena != null)
		gangarena.execute(`gangarena.setlobbylist(${listlobby})`);
});
// on player end round
mp.events.add('client::sendwinners', function (listwinners) {
	if (gangarena != null)
		gangarena.execute(`gangarena.sendwinners(${listwinners})`);
});
// on player connect lobby
mp.events.add('client::setlobby', function (listplayers, lobbyinfo) {
	if (gangarena != null)
		gangarena.execute(`gangarena.setlobby(${listplayers},${lobbyinfo})`);
});


}