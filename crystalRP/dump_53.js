{
var Crime = null;
mp.events.add('OpenCrimeMenu:Client', (playersUgon, playersCladMen) => {
	if (global.menuCheck() || Crime != null) return;
    menuOpen();
	Crime = mp.browsers.new('package://cef/System/crime/index.html');
	Crime.execute(`mainbox.open(${playersUgon}, ${playersCladMen});`);
});
mp.events.add('TakeUgon', () => {
	mp.events.call("CloseCrimeMenu");
	mp.events.callRemote("TakeUgon:Server");
});
mp.events.add('TakeBookMarks', () => {
	mp.events.call("CloseCrimeMenu");
	mp.events.callRemote("TakeBookmarks:Server");
});
mp.events.add('CloseCrimeMenu', () => {
	if (Crime == null)  return;
	Crime.destroy();
	Crime = null;
	menuClose();
});
}