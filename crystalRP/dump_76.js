{
var apartments = null;
mp.events.add('client::sendapart', function (index) {
	apartments.execute(`aparts.hides()`);
	mp.events.callRemote("server::interact", index);
	menuClose();
});
mp.events.add('client::closeapart', function () {
	if (apartments == null) return;
	menuClose();
	apartments.destroy();
	apartments = null;
});
mp.events.add('client::openapart', function (data) {
	if (global.menuCheck() || apartments != null) return;
    menuOpen();
	apartments = mp.browsers.new('package://cef/apartments.html');
	apartments.execute(`aparts.show(${data})`);
});
}