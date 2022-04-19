{
var Musorka = null;
mp.events.add('OpenMusorkaMenu', () => {
	if (global.menuCheck() || Musorka != null) return;
    menuOpen();
	Musorka = mp.browsers.new('package://cef/jobs/Musorka/index.html');
	Musorka.execute('Musorka.active=true');
});
mp.events.add('CloseMusorkaMenu', () => {
	if (Musorka == null) return;
	Musorka.destroy();
	Musorka = null;
	menuClose();
});
mp.events.add('NextMusorkaMenus', () => {
	mp.events.call("CloseMusorkaMenu");
	mp.events.callRemote("NextMusorkaMenu");
});
}