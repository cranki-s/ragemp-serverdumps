{
﻿function SetNoteImg(url)
{
	document.getElementById("noteIMG").src = url;
}

var noteCEF ﻿= null;
mp.events.add('showNote', (URL) => {
	if (!mp.browsers.exists(noteCEF))
	{
		mp.game.graphics.notify("Используйте ~b~F4 ~w~чтобы закрыть");
		noteCEF ﻿= mp.browsers.new﻿("package://gtalife/Notes/Notes.html");
		noteCEF.execute(`document.getElementById("noteIMG").src = "${URL}"`);
	}
});

mp.events.add('hideNote', () => {
	if (noteCEF != null && mp.browsers.exists(noteCEF))
	{
		noteCEF.destroy();
	}
});

mp.events.add('updateNoteURL', (URL) => {
	if (noteCEF != null && mp.browsers.exists(noteCEF))
	{
		noteCEF.execute(`document.getElementById("noteIMG").src = ${URL}`);
	}
});

mp.keys.bind(0x73, false, function () { // F4 Key
            if (noteCEF != null && mp.browsers.exists(noteCEF)) {
                noteCEF.destroy();
                noteCEF = null;
            }
});

}䏡턐ɹ