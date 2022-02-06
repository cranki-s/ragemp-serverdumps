{
﻿//CEF//
var blipCEF = null;
mp.events.add('showBlipsPicker', () => {
	if (!mp.browsers.exists(blipCEF))
	{
		blipCEF = mp.browsers.new("package://gtalife/BlipsPicker/index.html");
		mp.gui.cursor.show(true, true);
		mp.game.graphics.notify("Нажмите ~b~F4 ~w~чтобы закрыть.");
	}
});

mp.keys.bind(0x73, false, function () { // F4 Key
	if (blipCEF != null && mp.browsers.exists(blipCEF))
	{
		blipCEF.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('hideBlipsPicker', () => {
	if (blipCEF != null && mp.browsers.exists(blipCEF))
	{
		blipCEF.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('blipsPickerInput', (blip) => {
	if (blipCEF != null && mp.browsers.exists(blipCEF))
	{
		mp.events.callRemote('BlipsPickerInput', blip);
		mp.events.call('hideBlipsPicker');
	}
});

}