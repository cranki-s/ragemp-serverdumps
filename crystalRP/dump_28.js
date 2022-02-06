{
//global.house = mp.browsers.new('package://cef/menu.html');
//global.lic = mp.browsers.new('package://cef/menu.html');

mp.events.add('housemanage', function (id) {
    mp.events.callRemote('housecallback', id);
});

mp.events.add('openhouse', function (data, st) {
	if (global.menuCheck()) return;
    menuOpen();
    global.menu.execute(`housemenu.show(${data}, ${st})`);
});

mp.events.add('closehouse', function () {
    menuClose();
});

mp.events.add('licmenus', function (id) {
    mp.events.callRemote('liccallback', id);
});

mp.events.add('openlicmenu', function () {
	if (global.menuCheck()) return;
    menuOpen();
    global.menu.execute(`licmenu.show()`);
});

mp.events.add('closelic', function () {
    menuClose();
});



}