{
﻿let BrowserUtil = require('./gtalife/globals/browser-windowed.js');
let customBrowser = undefined;
let cinemaBrowser = undefined;
let parameters = [];

mp.events.add('createBrowser', (arguments) => {
	try{
		if(customBrowser === undefined) {
			parameters = arguments.slice(1, arguments.length);
	
		if (IsWindowBrowser(arguments[0])){
				customBrowser = new BrowserUtil.BrowserWindowed(arguments[0]);
			}
			else
				customBrowser = mp.browsers.new(arguments[0]);
			if (typeof arguments[1] !== "undefined") {
				customBrowser.execute(`$("#jailChar").val('` + arguments[1] + `');`);
			}
			cef_opened = true
			mp.gui.cursor.show(true, true)
		}
		} catch(e){

		}
});

mp.events.add('createCinemaBrowser', (arguments) => {
	if(cinemaBrowser === undefined) {
		parameters = arguments.slice(1, arguments.length);
		
		cinemaBrowser = mp.browsers.new(arguments[0]);
	}
		cef_opened = true;
		mp.gui.cursor.show(true, true);
		mp.gui.chat.push("Created browser and showing cursor");
});

mp.events.add('browserDomReady', (browser) => {
	if(customBrowser === browser) {
		mp.gui.chat.activate(false);
		mp.gui.cursor.show(true, true)
		if(parameters.length > 0) {
			mp.events.call('executeFunction', parameters);
		}
	}
	
	else if(cinemaBrowser === browser) {
		mp.gui.cursor.visible = false;
		mp.gui.chat.activate(true);
		if(parameters.length > 0) {
			mp.events.call('executeCinemaFunction', parameters);
		}
	}
});

mp.events.add('executeFunction', (arguments) => {
	let input = '';
	
	for(let i = 1; i < arguments.length; i++) {
		if(input.length > 0) {
			input += ', \'' + arguments[i] + '\'';
		} else {
			input = '\'' + arguments[i] + '\'';
		}
	}
	
	customBrowser.execute(`${arguments[0]}(${input});`);
});

mp.events.add('executeCinemaFunction', (arguments) => {
	let input = '';
	
	for(let i = 1; i < arguments.length; i++) {
		if(input.length > 0) {
			input += ', \'' + arguments[i] + '\'';
		} else {
			input = '\'' + arguments[i] + '\'';
		}
	}
	
	cinemaBrowser.execute(`${arguments[0]}(${input});`);
});

mp.events.add('destroyBrowser', () => {
	mp.gui.cursor.show(false, false);
	mp.gui.chat.activate(true);
	if (customBrowser !== null && customBrowser !== undefined)
	{
	customBrowser.destroy();
	customBrowser = undefined;
	}
	else if (cinemaBrowser !== null && cinemaBrowser !== undefined)
	{
			cinemaBrowser.destroy();
		cinemaBrowser = undefined;
	}
cef_opened = false;
});
mp.events.add('destroyCinemaBrowser', () => {
	mp.gui.cursor.visible = false;
	mp.gui.chat.activate(true);
	cinemaBrowser.destroy();
	cinemaBrowser = undefined;
cef_opened = false;
});
}悁篞͟