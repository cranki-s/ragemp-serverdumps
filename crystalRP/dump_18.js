{
﻿const positions = [
// left side
{ 'position': { 'x': -200, 'y': -1450, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': -50, 'y': -1450, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 100, 'y': -1450, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 250, 'y': -1450, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 250, 'y': -1600, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 400, 'y': -1600, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 550, 'y': -1600, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 400, 'y': -1750, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 550, 'y': -1750, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 550, 'y': -1900, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': -200, 'y': -1600, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': -50, 'y': -1600, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 100, 'y': -1600, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': -200, 'y': -1750, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': -50, 'y': -1750, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 100, 'y': -1750, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 250, 'y': -1750, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 100, 'y': -1900, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 250, 'y': -1900, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 400, 'y': -1900, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 250, 'y': -2050, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 100, 'y': -2050, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 400, 'y': -2050, 'z': 30.18104 }, 'color': 10 },
{ 'position': { 'x': 550, 'y': -2050, 'z': 30.18104 }, 'color': 10 },

// right side
{ 'position': { 'x': 850, 'y': -2500, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -2500, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1150, 'y': -2500, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 850, 'y': -1450, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 850, 'y': -1600, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 850, 'y': -1750, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 850, 'y': -1900, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 850, 'y': -2050, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 850, 'y': -2200, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 850, 'y': -2350, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -2350, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1150, 'y': -2350, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1150, 'y': -2200, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1150, 'y': -2050, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1150, 'y': -1900, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1150, 'y': -1750, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1150, 'y': -1600, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -1450, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -1600, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -1750, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -1900, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -2050, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -2200, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1000, 'y': -2350, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1150, 'y': -1450, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1300, 'y': -1900, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1300, 'y': -2050, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1300, 'y': -2200, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1450, 'y': -2050, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1450, 'y': -1900, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1450, 'y': -2200, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1600, 'y': -1900, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1600, 'y': -2050, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1600, 'y': -2200, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1750, 'y': -1900, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1750, 'y': -2050, 'z': 28.17772 }, 'color': 10 },
{ 'position': { 'x': 1300, 'y': -1750, 'z': 28.17772 }, 'color': 10 },
]

var blips = [];
mp.events.add('loadCaptureBlips', function (json) {
    var colors = JSON.parse(json);
    for (var i = 0; i < colors.length; i++) {
        positions[i].color = colors[i];
    }
    positions.forEach(element => {
        const blip = mp.game.ui.addBlipForRadius(element.position.x, element.position.y, element.position.z, 75);
        mp.game.invoke(getNative("SET_BLIP_SPRITE"), blip, 5);
        mp.game.invoke(getNative("SET_BLIP_ALPHA"), blip, 105);
        mp.game.invoke(getNative("SET_BLIP_COLOUR"), blip, element.color);
        blips.push(blip);
    });
});

mp.events.add('setZoneColor', function (id, color) {
    if (blips.length == 0) return;
    mp.game.invoke(getNative("SET_BLIP_COLOUR"), blips[id], color);
});
mp.events.add('setZoneFlash', function (id, state, color) {
    if (blips.length == 1 || blips.length == 0) {
        if (state) {
            const blip = mp.game.ui.addBlipForRadius(positions[id].position.x, positions[id].position.y, positions[id].position.z, 75);
            mp.game.invoke(getNative("SET_BLIP_SPRITE"), blip, 5);
            mp.game.invoke(getNative("SET_BLIP_ALPHA"), blip, 105);
            mp.game.invoke(getNative("SET_BLIP_COLOUR"), blip, color);
            blips[id] = blip;
        }
        else {
            if (blips.length == 0) return;
            mp.game.invoke(getNative("SET_BLIP_ALPHA"), blips[id], 0);
        }
    }

    mp.game.invoke(getNative("SET_BLIP_FLASH_TIMER"), blips[id], 1000);
    mp.game.invoke(getNative("SET_BLIP_FLASHES"), blips[id], state);
});


var isCapture = false;
var captureAtt = 0;
var captureDef = 0;
var captureMin = 0;
var captureSec = 0;
var defID = 0;
var attID = 0;


mp.events.add('sendCaptureInformation', function (att, def, min, sec, defId, attId) {
    captureAtt = att;
    captureDef = def;
    captureMin = min;
    captureSec = sec;
	defID = defId;
	attID = attId;
});

mp.events.add('captureHud', function (argument) {
    isCapture = argument;
});

var zonestatus =
{
    active: false,
    capDef: 0,
    capAtt: 0,
    capMin: 0,
    capSec: 0,
}
const images = {
    1: "./images/families.png", 
    2: "./images/ballas.png", 
    3: "./images/vagos.png", 
    4: "./images/mara2.png", 
    5: "./images/bloods.png", 
    11: "./images/rus.png",
    12: "./images/mex.png",
    13: "./images/lcn.png"
};
mp.events.add('sendkillinfo', (object) => {
	wrapper.execute(`wrapper.addKills('${object}');`);
});
var wrapper = mp.browsers.new('package://cef/System/kill/index.html');
mp.events.add('render', () => {
	if (blips.length !== 0) {
		blips.forEach(blip => {
			mp.game.invoke(getNative("SET_BLIP_ROTATION"), blip, 0);
		})
	}
    if (isCapture) {
		wrapper.execute(`wrapper.active=true`); 
        if (zonestatus.active == false)
        {
            zonestatus.active = true;
            mp.gui.execute(`gangzone.show()`)
			mp.gui.execute(`gangzone.attImg='${images[attID]}'`);
			mp.gui.execute(`gangzone.defImg='${images[defID]}'`);
			zonestatus.capAtt = captureAtt;
			zonestatus.capDef = captureDef;
            zonestatus.capMin = captureMin;
            zonestatus.capSec = captureSec;
        }		
        mp.gui.execute(`gangzone.att=${captureDef}`);
        mp.gui.execute(`gangzone.def=${captureAtt}`);
        mp.gui.execute(`gangzone.min=${captureMin}`);
        mp.gui.execute(`gangzone.sec=${captureSec}`);
    }
    else
    {
		wrapper.execute(`wrapper.active=false`);
        if (zonestatus.active == true)
        {
            zonestatus.active = false;
            mp.gui.execute(`gangzone.hide()`);
        }
    }
});
}Õ