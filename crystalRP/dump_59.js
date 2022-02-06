{
var Lift = null;
mp.events.add('openLiftMenu', () => {  
    if (global.menuCheck() || Lift != null) return;
    menuOpen();
	Lift = mp.browsers.new('package://cef/System/lift/index.html');
    Lift.execute(`Lift.open()`);
});
mp.events.add('useLift', (id) => {
    if (Lift == null) return;
    mp.events.call("CloseLiftMenu");
    mp.events.callRemote("useLift:Server", id);
});
mp.events.add('CloseLiftMenu', () => {
    if (Lift != null) 
    {
        Lift.destroy();
        Lift = null;
	    menuClose();
    }
});
}