{
﻿let phone;
var phoneWindow = null;
var phoneOppened = false;
mp.events.add('initPhone', () => {
    phone = mp.browsers.new('package://cef/phone.html');
});
const player = mp.players.local;
mp.events.add('phoneShow', () => {
	try
	{
		if (phone == null)
			phone = mp.browsers.new('package://cef/phone.html');
		phone.execute('show();');
		mp.gui.cursor.visible = true;
	}
	catch(e) {}
});
mp.events.add('phoneHide', () => {
	if (phone != null)
	{
    	phone.destroy();
		phone = null;
    	mp.gui.cursor.visible = false;	
	}
});
mp.events.add('phoneOpen', (data) => {
	try{
		var json = JSON.parse(data);
		var id = json[0];
		var canHome = json[3];
		var canBack = json[2];
		var items = JSON.stringify(json[1]);
		var exec = "open('" + id + "'," + canHome + "," + canBack + ",'"  + items + "');";	
		phone.execute(exec);
	}
	catch(e) {}
	
});
mp.events.add('phoneChange', (ind, data) => {
	if (phone != null){
    	var exec = "change(" + ind + ",'" + data + "');";
    	phone.execute(exec);
	}
});
mp.events.add('phoneClose', () => {
    if (phone != null) 
	{
		phone.destroy();
		phone = null;
		mp.game.invoke('0x3BC861DF703E5097', mp.players.local.handle, true);
	}
});
mp.events.add('phoneChangeBg', (img) => {
	if (phone != null){
		phone.execute(`changebackground("${img}");`);
	}
});
mp.events.add('phoneCallback', (itemid, event, data) => {
	if (phone != null){
    	mp.events.callRemote('Phone', 'callback', itemid, event, data);
	}
});
mp.events.add('phoneNavigation', (btn) => {
	if (phone != null){
    	mp.events.callRemote('Phone', 'navigation', btn);
	}
});
}МϢ