{
mp.events.add('deatheffecton', () => {
    mp.game.graphics.startScreenEffect("DeathFailMPIn", 0, true);
});
  
mp.events.add('deatheffectoff', () => {
    mp.game.graphics.stopScreenEffect("DeathFailMPIn");
});

mp.keys.bind(0x76, false, function() {
    const date = new Date();
    mp.gui.takeScreenshot("SCREENSHOT-"+date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds()+".png", 1, 100, 0);
    mp.game.graphics.notify("Screenshot created.");
});

mp.events.add("render", () => {
    if (mp.players.local.vehicle) {
        mp.game.audio.setRadioToStationName("OFF");
        mp.game.audio.setUserRadioControlEnabled(false);
    }
});

mp.events.add('render', () => {
    mp.game.controls.disableControlAction(32, 140, true);
    mp.game.controls.disableControlAction(32, 142, true);
    mp.game.controls.disableControlAction(0, 44, true);
});

mp.events.add("registerWeaponAttachments", (json) => {
    let data = JSON.parse(json);
    for (let weapon in data) mp.attachmentMngr.register(data[weapon].AttachName, data[weapon].AttachModel, data[weapon].AttachBone, data[weapon].AttachPosition, data[weapon].AttachRotation);
});

mp.events.add('render', () => {
    mp.game.player.restoreStamina(100);
});

let deathName = null;
let deathName1 = null;

mp.events.add("set:Killername", (death) => {
    deathName = death;
    setTimeout(() => {
        deathName = null;
    }, 5000);
});

mp.events.add("set:KillernameHS", (death) => {
    deathName1 = death;
    setTimeout(() => {
        deathName1 = null;
    }, 5000);
});


mp.events.add("render", (player) => {
    if (deathName != null) {
        mp.game.graphics.drawText(`You killed ${deathName} `, [0.5, 0.25], {
        font: 2,
        color: [255, 255, 255, 255],
        scale: [0.37, 0.37],
        outline: true
        });
    }
});

mp.events.add("render", (player) => {
    if (deathName1 != null) {
        mp.game.graphics.drawText(`You headshotted ${deathName1} `, [0.5, 0.25], {
        font: 2,
        color: [255, 255, 255, 255],
        scale: [0.37, 0.37],
        outline: true
        });
    }
});

let changeTime = false;
let timeHour = null;

mp.events.add('setTime:C', (hour) => {
    changeTime = true;
    timeHour = parseInt(hour);
});

mp.events.add('render', () => {
    if (changeTime) {
        mp.game.time.setClockTime(timeHour, 00, 0);
    }
});

var whitelistWeapons = {
    "1": 2508868239, //bat
    "2": 1141786504, //Golf Club
    "3": 2725352035, //Fist
    "4": 3756226112, //Switchblade
    "5": 1317494643, //Hammer
    "6": 2484171525, //Poolcuee
    "7": 419712736, //Wrench
    "8": 3713923289, //Machete
    "9": 2460120199, //Dagger
    "10": 4192643659, //Bottle
    "11": 2343591895, //Flashlight
    "12": 4191993645, //Hatchet
    "13": 3638508604, //Knuckle
    "14": 2578778090, //Knife
    "15": 3756226112, //Switchblade
    "16": 1737195953, //Nightstick
    "17": 3441901897, //Battle Axe
    "18": 940833800 //Stone Hatchet
};
mp.events.add('render', () => {
    if (Object.values(whitelistWeapons).includes(mp.players.local.weapon)) { mp.game.invoke('0x5C8B2F450EE4328E', mp.players.local.id, 1); } else { mp.game.invoke('0x5C8B2F450EE4328E', mp.players.local.id, 0); }
});
}