{
//CEF//
var notamCEF = null;

mp.events.add('ClientEvent_ShowNotamMenu', (table, accessType) => {
	if (notamCEF == null && !mp.browsers.exists(notamCEF))
	{
		notamCEF = mp.browsers.new("package://gtalife/Notams/index.html");
		notamCEF.execute(`populateTable('${table}');`);	
		if (accessType == 2) {
			notamCEF.execute(`hideCreateNotam();`);		
		}
		mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the interface.");	
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('hideNotams', () => {
	CloseNotamSystem();
});

mp.events.add('sendNotamDeletionRequestToServer', (notam) => {
	mp.events.callRemote('Server_DeleteNotam', notam);
});

mp.events.add('sendNotamCreationRequestToServer', (notamText, notamImage, notamValidFrom, notamValidUntil) => {
	console.log("ntamcreate");
	mp.events.callRemote('Server_CreateNotam', notamText, notamImage, notamValidFrom, notamValidUntil);
});

mp.events.add('requestNotamImageFromServer', (notam) => {
	mp.events.callRemote('Server_RequestNotamImage', notam);
});

mp.events.add('showNotamImage', (image) => {
	console.log('execution show notam image');
	notamCEF.execute(`setNotamImageInModal('${image}');`);
});

function CloseNotamSystem(){
	if (notamCEF != null && mp.browsers.exists(notamCEF))
	{
		notamCEF.destroy();
		notamCEF = null;
		mp.gui.cursor.show(false, false);
	}
}

mp.keys.bind(0x73, false, function () { // F4 Key
	CloseNotamSystem();
});
mp.keys.bind(0x1B, false, function () { // ESC Key
	CloseNotamSystem();
});


}