{
global.rebind = mp.browsers["new"]('http://package/browser/modules/Inventory/board.html');
global.rebindBrowser = mp.browsers["new"]('http://package/cef/Rebinder/RebinderBrowser/index.html');
global.rebind.active = false;

global.keys = [
    76,
    73,
    85,
    77,
    88,
    54,
    66,
    75,
];

global.keyses = [
    {id: 48, key: "0"},
    {id: 49, key: "1"},
    {id: 50, key: "2"},
    {id: 51, key: "3"},
    {id: 52, key: "4"},
    {id: 53, key: "5"},
    {id: 54, key: "6"},
    {id: 55, key: "7"},
    {id: 56, key: "8"},
    {id: 57, key: "9"},

    {id: 65, key: "A"},
    {id: 66, key: "B"},
    {id: 67, key: "C"},
    {id: 68, key: "D"},
    {id: 69, key: "E"},
    {id: 70, key: "F"},
    {id: 71, key: "G"},
    {id: 72, key: "H"},
    {id: 73, key: "I"},
    {id: 74, key: "J"},
    {id: 75, key: "K"},

    {id: 76, key: "L"},
    {id: 77, key: "M"},
    {id: 78, key: "N"},
    {id: 79, key: "O"},

    {id: 80, key: "P"},
    {id: 81, key: "Q"},
    {id: 82, key: "R"},
    {id: 83, key: "S"},

    {id: 84, key: "T"},
    {id: 85, key: "U"},
    {id: 86, key: "V"},
    {id: 87, key: "W"},

    {id: 88, key: "X"},
    {id: 89, key: "Y"},
    {id: 90, key: "Z"},
    {id: 91, key: "S"},
    {id: 189, key: "-"},
    {id: 187, key: "="}
]

global.rebindBrowser.execute(`rebindBrowser.active=true`);
if(mp.storage.data.rebindkeys == undefined){
    mp.storage.data.rebindkeys = {
        OpenCarDoor: 76,
        OpenInventory: 73,
        OpenAnimMenu: 85,
        OpenPhone: 77,
        HandCuff: 88,
        CruiseControl: 54,
        StartEngineVehicle: 66,
        safetyBelt: 75
    };
}
setTimeout(() => {
    global.keys[0] = mp.storage.data.rebindkeys.OpenCarDoor
    global.keys[1] = mp.storage.data.rebindkeys.OpenInventory
    global.keys[2] = mp.storage.data.rebindkeys.OpenAnimMenu
    global.keys[3] = mp.storage.data.rebindkeys.OpenPhone
    global.keys[4] = mp.storage.data.rebindkeys.HandCuff
    global.keys[5] = mp.storage.data.rebindkeys.CruiseControl
    global.keys[6] = mp.storage.data.rebindkeys.StartEngineVehicle
    global.keys[7] = mp.storage.data.rebindkeys.safetyBelt
}, 1000);

setTimeout(() => {
	mp.events.call("getBinds")
}, 2000);
mp.events.add("REBINDERKEYS", () => {
});

mp.events.add('openRebinder', function () {
    global.rebind.active = true
	mp.events.call('openCrosshairMenu')
});

mp.events.add('getBinds', function () {
	mp.gui.execute(`HUD.addKeysInList('${keyses.find(v => v.id === global.keys[0]).key}','${keyses.find(v => v.id === global.keys[1]).key}','${keyses.find(v => v.id === global.keys[2]).key}','${keyses.find(v => v.id === global.keys[3]).key}','${keyses.find(v => v.id === global.keys[4]).key}', '${keyses.find(v => v.id === global.keys[5]).key}','${keyses.find(v => v.id === global.keys[6]).key}','${keyses.find(v => v.id === global.keys[7]).key}');`);
});

mp.events.add("closeRebindMenu", () => {
    global.menuClose();
    global.rebind.active = false
    global.rebind.execute(`rebind.active=false`);
});

mp.events.add("saveRebindKeys", (OpenInventory, OpenAnimMenu, OpenPhone, OpenCarDoor, CruiseControl, StartEngineVehicle, safetyBelt, HandCuff) => {
    global.keys[0] = OpenCarDoor
    global.keys[1] = OpenInventory
    global.keys[2] = OpenAnimMenu
    global.keys[3] = OpenPhone
    global.keys[4] = HandCuff
    global.keys[5] = CruiseControl
    global.keys[6] = StartEngineVehicle
    global.keys[7] = safetyBelt

    mp.storage.data.rebindkeys = {
        OpenCarDoor: OpenCarDoor,
        OpenInventory: OpenInventory,
        OpenAnimMenu: OpenAnimMenu,
        OpenPhone: OpenPhone,
        HandCuff: HandCuff,
        CruiseControl: CruiseControl,
        StartEngineVehicle: StartEngineVehicle,
        safetyBelt: safetyBelt
    };
    mp.events.call("getBinds")
    mp.events.call('notify', 0, 2, "Вы успешно изменили настройки клавиш.", 5000);
});

mp.events.add("CheckKeyses", (key) => {
    switch(key){
        case global.keys[0]:
            mp.events.call("openCarDoor")
        break;
        case global.keys[1]:
            mp.events.call("openInventory")
        break;
        case global.keys[2]:
            mp.events.call("openAnimMenu")
        break;
        case global.keys[3]:
            mp.events.call("openPhoneMenu")
        break;
        case global.keys[4]:
            mp.events.call("cuffPlayerKey")
        break;
        case global.keys[5]:
            mp.events.call("cruiseControlKey")
        break;
        case global.keys[6]:
            mp.events.call("startEngineCar")
        break;
        case global.keys[7]:
            mp.events.call("safetyBeltKey")
        break;
    }
});
}