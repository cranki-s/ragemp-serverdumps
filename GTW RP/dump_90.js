{
//CEF//
var blipCEF = null;
mp.events.add('showBlipsPicker', () => {
	if (!mp.browsers.exists(blipCEF))
	{
		blipCEF = mp.browsers.new("package://gtalife/BlipsPicker/index.html");
		mp.gui.cursor.show(true, true);
		mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the picker.");
	}
});

mp.keys.bind(0x73, false, function () { CloseBlipsPicker(); }); // F4
mp.keys.bind(0x1B, false, function () { CloseBlipsPicker(); }); // ESC

mp.events.add('hideBlipsPicker', () => {
	CloseBlipsPicker();
});

mp.events.add('blipsPickerInput', (blip) => {
	if (blipCEF != null && mp.browsers.exists(blipCEF))
	{
		mp.events.callRemote('BlipsPickerInput', blip);
		mp.events.call('hideBlipsPicker');
	}
});

function CloseBlipsPicker()
{
	if (blipCEF != null && mp.browsers.exists(blipCEF))
	{
		blipCEF.destroy();
		blipCEF = null;
		mp.gui.cursor.show(false, false);
	}
}
}