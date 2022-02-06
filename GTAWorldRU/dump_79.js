{
﻿var chatToggles = ["admin", "admintesters", "news", "faction", "testers", "pm", "radio", "departmental"];

mp.events.add('setStorageVariable', (varName, varValue, overwrite) => {
    let currentValue = mp.storage.data[varName];
    if (currentValue && !overwrite) return;
    
    mp.storage.data[varName] = varValue;
    mp.storage.flush();
});

mp.events.add('getStorageVariable', (varName) => {
	if (varName == "chat_toggles")
		chatToggles.forEach(c_toggle => mp.events.callRemote("getStorageVariableCallback", c_toggle, mp.storage.data[c_toggle]));
	else
	{
    	let currentValue = mp.storage.data[varName];
    	let returnValue = currentValue ? currentValue : "null";

    	mp.events.callRemote("getStorageVariableCallback", varName, returnValue);
	}
});

mp.events.add('deleteStorageVariable', (varName) => {
    let currentValue = mp.storage.data[varName];
    if (currentValue) mp.storage.data[varName] = "";
});

}