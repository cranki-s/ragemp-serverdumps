{
setTimeout(function () { 
    let cefins = [
        "U",
        "X",
        "L",
        "I",
        "B",
        "K",
        "Z",
        "N"
    ]
    let binderKeyses = {
        Anim: 0x55,
        Micro: 0x58,
        LockDoors: 0x4C,
        Inventory: 0x49,
        VehicleEngine: 0x42,
        VehicleBelt: 0x4B,
        TaskPlayer: 0x5A,
        Cuff: 0x4E
    }
    if (mp.storage.data.storageBinderKeyCef == undefined) {
        global.binderKeyCef = cefins
        mp.storage.data.storageBinderKeyCef = global.binderKeyCef;
        mp.storage.flush();
    }
    else {
        for (let indexcef in cefins)
            if (mp.storage.data.storageBinderKeyCef[indexcef] != undefined)
                global.binderKeyCef[indexcef] = mp.storage.data.storageBinderKeyCef[indexcef];
            else 
                global.binderKeyCef[indexcef] = cefins[indexcef];
    }
    if (mp.storage.data.storagebinderKeys == undefined) {
        global.binderKeys = binderKeyses;
        mp.storage.data.storagebinderKeys = global.binderKeys;
        mp.storage.flush();
    }
    else {
        for (let index in binderKeyses)
        if (mp.storage.data.storagebinderKeys[index] != undefined) 
            global.binderKeys[index] = mp.storage.data.storagebinderKeys[index];
        else 
            global.binderKeys[index] = binderKeyses[index];
    }
    mp.keys.bind(global.binderKeys.Anim, false, openMenuAnimation);
    mp.keys.bind(global.binderKeys.Micro, false, voiceChatOn);
    mp.keys.bind(global.binderKeys.Micro, true, voiceChatOff);
    mp.keys.bind(global.binderKeys.LockDoors, false, setLockDoors);
    mp.keys.bind(global.binderKeys.Inventory, false, OpenBoard);
    mp.keys.bind(global.binderKeys.VehicleEngine, false, setEngineStatus);
    mp.keys.bind(global.binderKeys.VehicleBelt, false, VehicleBelt);
    mp.keys.bind(global.binderKeys.TaskPlayer, false, TaskPlayer);
    mp.keys.bind(global.binderKeys.Cuff, false, CuffPlayer);
}, 5000)
  
global.binderKeyCef = [
    "U",
    "X",
    "L",
    "I",
    "B",
    "K",
    "Z",
    "N"
]
global.binderKeys = {
    Anim: 0x34,
    Micro: 0x34,
    LockDoors: 0x34,
    Inventory: 0x34,
    VehicleEngine: 0x34,
    VehicleBelt: 0x34,
    TaskPlayer: 0x34,
    Cuff: 0x34
}
mp.events.add("saveBinds", (anim, micro, lockdoors, inventory, vehicleEngine, vehicleBelt, taskplayer, cuff) => {
    if (anim != binderKeyCef[0]) {
        mp.keys.unbind(binderKeys.Anim, false, openMenuAnimation);
        binderKeys.Anim = global.Keys["VK_" + anim];
        mp.keys.bind(binderKeys.Anim, false, openMenuAnimation);
        binderKeyCef[0] = anim;
        mp.storage.data.storageBinderKeyCef[0] = binderKeyCef[0];
        mp.storage.data.storagebinderKeys.Anim = binderKeys.Anim;
    }
    else if (micro != binderKeyCef[1]) {
        mp.keys.unbind(binderKeys.Micro, false, voiceChatOn);
        mp.keys.unbind(binderKeys.Micro, true, voiceChatOff);
        binderKeys.Micro = global.Keys["VK_" + micro];
        mp.keys.bind(binderKeys.Micro, false, voiceChatOn);
        mp.keys.bind(binderKeys.Micro, true, voiceChatOff);
        binderKeyCef[1] = micro;
        mp.storage.data.storageBinderKeyCef[1] = binderKeyCef[1];
        mp.storage.data.storagebinderKeys.Micro = binderKeys.Micro;
    }
    else if (lockdoors != binderKeyCef[2]) {
        mp.keys.unbind(binderKeys.LockDoors, false, setLockDoors);
        binderKeys.LockDoors = global.Keys["VK_" + lockdoors];
        mp.keys.bind(binderKeys.LockDoors, false, setLockDoors);
        binderKeyCef[2] = lockdoors;
        mp.storage.data.storageBinderKeyCef[2] = binderKeyCef[2];
        mp.storage.data.storagebinderKeys.LockDoors = binderKeys.LockDoors;
    }
    else if (inventory != binderKeyCef[3]) {
        mp.keys.unbind(binderKeys.Inventory, false, OpenBoard);
        binderKeys.Inventory = global.Keys["VK_" + inventory];
        mp.keys.bind(binderKeys.Inventory, false, OpenBoard);
        binderKeyCef[3] = inventory;
        mp.storage.data.storageBinderKeyCef[3] = binderKeyCef[3];
        mp.storage.data.storagebinderKeys.Inventory = binderKeys.Inventory;
    }  
    else if (vehicleEngine != binderKeyCef[4]) {
        mp.keys.unbind(binderKeys.VehicleEngine, false, setEngineStatus);
        binderKeys.VehicleEngine = global.Keys["VK_" + vehicleEngine];
        mp.keys.bind(binderKeys.VehicleEngine, false, setEngineStatus);
        binderKeyCef[4] = vehicleEngine;
        mp.storage.data.storageBinderKeyCef[4] = binderKeyCef[4];
        mp.storage.data.storagebinderKeys.VehicleEngine = binderKeys.VehicleEngine;
    }
    else if (vehicleBelt != binderKeyCef[5]) {
        mp.keys.unbind(binderKeys.VehicleBelt, false, VehicleBelt);
        binderKeys.VehicleBelt = global.Keys["VK_" + vehicleBelt];
        mp.keys.bind(binderKeys.VehicleBelt, false, VehicleBelt);
        binderKeyCef[5] = vehicleBelt;
        mp.storage.data.storageBinderKeyCef[5] = binderKeyCef[5];
        mp.storage.data.storagebinderKeys.VehicleBelt = binderKeys.VehicleBelt;
    }
    else if (taskplayer != binderKeyCef[6]) {
        mp.keys.unbind(binderKeys.TaskPlayer, false, TaskPlayer);
        binderKeys.TaskPlayer = global.Keys["VK_" + taskplayer];
        mp.keys.bind(binderKeys.TaskPlayer, false, TaskPlayer);
        binderKeyCef[6] = taskplayer;
        mp.storage.data.storageBinderKeyCef[6] = binderKeyCef[6];
        mp.storage.data.storagebinderKeys.TaskPlayer = binderKeys.TaskPlayer;
    }
    else if (cuff != binderKeyCef[7]) {
        mp.keys.unbind(binderKeys.Cuff, false, CuffPlayer);
        binderKeys.Cuff = global.Keys["VK_" + cuff];
        mp.keys.bind(binderKeys.Cuff, false, CuffPlayer);
        binderKeyCef[7] = cuff;
        mp.storage.data.storageBinderKeyCef[7] = binderKeyCef[7];
        mp.storage.data.storagebinderKeys.Cuff = binderKeys.Cuff;
    }
    mp.storage.flush();
});
function CuffPlayer() {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || cuffed || localplayer.getVariable('InDeath') == true || global.menuOpened) return;
    global.lastCheck = new Date().getTime();
    mp.events.callRemote('playerPressCuffBut');
}
function TaskPlayer() {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened || localplayer.getVariable('InDeath')) return;
	mp.events.callRemote('playerPressFollowBut');
    lastCheck = new Date().getTime();
}
function VehicleBelt() {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || cuffed || localplayer.getVariable('InDeath') == true || global.menuOpened) return;
    mp.events.call("VehicleBelt");
}
function OpenBoard() {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || cuffed || localplayer.getVariable('InDeath') == true || localplayer.getVariable('attachToVehicleTrunk')) return;
    global.lastCheck = new Date().getTime();
    if (global.boardOpen)
        mp.events.call('board', 1);
    else
        mp.events.call('board', 0);
}
function voiceChatOff() {
    mp.events.call("VoiceChatOff");
}
function voiceChatOn() {
    mp.events.call("VoiceChatOn");
}
function openMenuAnimation() {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || cuffed || localplayer.getVariable('InDeath') == true) return;
    if (localplayer.isInAnyVehicle(true) || global.IsFalling || global.menuOpened) return;
    global.lastCheck = new Date().getTime();
    mp.events.call("openMenuAnimation");
}
function setLockDoors() {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    global.lastCheck = new Date().getTime();
    mp.events.callRemote('lockCarPressed');
}
function setEngineStatus() {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 400 || global.menuOpened) return;
    if (localplayer.isInAnyVehicle(false) && localplayer.vehicle.getSpeed() <= 3) {
        lastCheck = new Date().getTime();
        mp.events.callRemote('engineCarPressed');
    }
}

}