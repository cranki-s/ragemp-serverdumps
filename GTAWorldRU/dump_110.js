{
﻿var CEFINPUT = null;

mp.events.add('CEFInput::Show', (title, texttitle, input, maximum) => {

    mp.events.call('toggleHUDForPlayer', false);

    CEFINPUT = mp.browsers.new("package://gtalife/genericcef/CEFInput.html");
    CEFINPUT.execute(`Initialize("${title}", "${texttitle}", ${input}, ${maximum});`);
    mp.gui.cursor.show(true, true);
    mp.events.call('setCefActive', true);
});

mp.events.add('CEFInput::Input', (input) => {
    if (CEFINPUT != null && mp.browsers.exists(CEFINPUT))
	{
        CEFINPUT.destroy();
        CEFINPUT = null;

        mp.events.call('toggleHUDForPlayer', true);
        mp.events.call('setCefActive', false);
        mp.gui.cursor.show(false, false);
        mp.events.callRemote("CEFInput::Save", input);
    }
});
}