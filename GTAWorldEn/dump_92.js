{
//CEF//
var iconCEF = null;
mp.events.add('showIconPicker', () => {
	if (!mp.browsers.exists(iconCEF))
	{
		iconCEF = mp.browsers.new("package://gtalife/IconPicker/index.html");
		mp.gui.cursor.show(true, true);
		mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the picker.");
	}
});

mp.keys.bind(0x73, false, function () { CloseIconPicker(); }); // F4
mp.keys.bind(0x1B, false, function () { CloseIconPicker(); }); // ESC

mp.events.add('hideIconsPicker', () => {
	CloseIconPicker();
});

mp.events.add('iconPickerInput', (blip) => {
	if (iconCEF != null && mp.browsers.exists(iconCEF))
	{
		mp.events.callRemote('IconsPickerInput', blip);
		mp.events.call('hideIconsPicker');
	}
});

function CloseIconPicker()
{
	if (iconCEF != null && mp.browsers.exists(iconCEF))
	{
		iconCEF.destroy();
		iconCEF = null;
		mp.gui.cursor.show(false, false);
	}
}
}