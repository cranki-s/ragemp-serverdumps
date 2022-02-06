{
let Sushi = null;
mp.events.add('OpenSushi', () => {
	if (global.menuCheck() || Sushi != null) return;
    menuOpen();
	Sushi = mp.browsers.new('package://cef/jobs/DeliverySushi/index.html');
	Sushi.execute('Sushi.active=true');
});
mp.events.add('CloseSushi', () => {
	if (Sushi != null) {
		Sushi.destroy();
		Sushi = null;
		menuClose();
	}
});
mp.events.add('StartSushi', () => {
	mp.events.callRemote("StartSushis");
	mp.events.call("CloseSushi");
});
mp.events.add('TakeSushi', () => {
	mp.events.callRemote("TakeSushis");
	mp.events.call("CloseSushi");
});
}