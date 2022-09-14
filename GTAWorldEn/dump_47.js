{
﻿/*function SetNoteImg(url)
{
	document.getElementById("noteIMG").src = url;
}*/

var imageCEF =  null;
mp.events.add('showCustomImage', (URL) => {
	if (!mp.browsers.exists(imageCEF))
	{
		mp.game.graphics.notify("Use ~b~F4~w~ to close the image.");
		imageCEF = mp.browsers.new("package://gtalife/CustomImages/CustomImage.html");
		imageCEF.execute(`document.getElementById("imageCustom").src = "${URL}"`);
	}
});

mp.events.add('hideCustomImage', () => {
	if (imageCEF != null && mp.browsers.exists(imageCEF))
	{
		imageCEF.destroy();
	}
});

mp.events.add('updateCustomImageURL', (URL) => {
	if (imageCEF != null && mp.browsers.exists(imageCEF))
	{
		imageCEF.execute(`document.getElementById("imageCustom").src = ${URL}`);
	}
});

mp.keys.bind(0x73, false, function () { // F4 Key
	if (imageCEF != null && mp.browsers.exists(imageCEF)) {
		imageCEF.destroy();
		imageCEF = null;
	}
});
}