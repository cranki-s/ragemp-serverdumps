{
mp.events.add('setStorageVariable', (varName, varValue, overwrite) => {
    let currentValue = mp.storage.data[varName];
    if (currentValue && !overwrite) return;
    
    mp.storage.data[varName] = varValue;
    mp.storage.flush();
});

mp.events.add('getStorageVariable', (varName) => {
    let currentValue = mp.storage.data[varName];
    let returnValue = currentValue ? currentValue : "null";

    mp.events.callRemote("getStorageVariableCallback", varName, returnValue);
});

mp.events.add('deleteStorageVariable', (varName) => {
    let currentValue = mp.storage.data[varName];
    if (currentValue) mp.storage.data[varName] = "";
});

}