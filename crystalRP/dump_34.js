{
﻿var infoped = null;
let ped = mp.peds.new(mp.game.joaat('ig_dom'), new mp.Vector3(-823.51855, -1340.5956, 5.1321126), 270.0,);
mp.events.add('openInfoMenu', () => {
	if (global.menuCheck() || infoped != null) return;
    menuOpen();
	infoped = mp.browsers.new('package://cef/infoped.html');
	infoped.execute('infoped.active=1');
	mp.events.call('toBlur', 200)
});

mp.events.add('CloseInfoMenu', () => {
	if (infoped == null) return;
	menuClose();
	infoped.destroy();
	infoped = null;
	mp.events.call('fromBlur', 200)
});

}