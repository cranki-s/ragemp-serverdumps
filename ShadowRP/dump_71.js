{
﻿var markers = [];

mp.events.add('createCheckpoint', function (uid, type, position, scale, dimension, r, g, b, dir) {
    if (typeof markers[uid] != "undefined") 
    {
        markers[uid].destroy();
        markers[uid] = undefined;
    }
    if (dir != undefined) {
        markers[uid] = mp.checkpoints.new(type, position, scale,
            {
                direction: dir,
                visible: true,
                dimension: dimension,
				color: [107,107,250,120],
            });
    }
    else {
        markers[uid] = mp.markers.new(type, position, scale,
            {
                visible: true,
                dimension: dimension,
				range : 2,
				color: [107,107,250,120],
            });
    }
});
var HijackingBlip = [];
mp.events.add('createHijackingBlip', function (id, position) {
    for (let i = 0; i < HijackingBlip.length; i++) { 
        if (HijackingBlip[i].id == id) {
            HijackingBlip[i].blip.destroy();
            HijackingBlip.splice(i, 1)
            break;
        }
    }
    let blip = mp.blips.new(623, position,{
        name: "Угон авто",
        scale: 0.7,
        color: 38,
        alpha: 255,
        drawDistance: 100,
        shortRange: false,
        rotation: 0,
        dimension: 0,
    });
    HijackingBlip.push({id: id, blip: blip})
}); 
mp.events.add('deleteHijackingBlip', function (id) {
    for (let i = 0; i < HijackingBlip.length; i++) {
        if (HijackingBlip[i] != undefined && HijackingBlip[i].id == id) {
            HijackingBlip[i].blip.destroy()
            HijackingBlip.splice(i, 1)
            break;
        }
    }
});
mp.events.add('deleteCheckpoint', function (uid) {
    if (typeof markers[uid] == "undefined") return;
    markers[uid].destroy();
    markers[uid] = undefined;
});

mp.events.add('createWaypoint', function (x, y) {
    mp.game.ui.setNewWaypoint(x, y);
});
var HijackingBlipHouse = null;
mp.events.add('createHijackingHouseBlip', function (position) {
    if (HijackingBlipHouse != null)
    HijackingBlipHouse.destroy();
    HijackingBlipHouse = mp.blips.new(375, position,
        {
            name: "Контракт на дом",
            scale: 1,
            color: 4,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 
mp.events.add('deleteHijackingHouseBlip', function () {
    if (HijackingBlipHouse != null)
        HijackingBlipHouse.destroy();
    HijackingBlipHouse = null;
});
var workBlip = null;
mp.events.add('createWorkBlip', function (position) {
    if (workBlip != null)
        workBlip.destroy();
    workBlip = mp.blips.new(0, position,
        {
            name: "Чекпоинт",
            scale: 1,
            color: 5,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 
var heistBlip = [];
mp.events.add('createHeistBizMark', function (position, id) {
    heistBlip[id] = mp.blips.new(0, position,
	{
		name: "Ограбление",
		scale: 1,
		color: 5,
		alpha: 255,
		drawDistance: 100,
		shortRange: false,
		rotation: 0,
		dimension: 0,
	});
}); 

mp.events.add('deleteHeistBizMark', function (id) {
	if (heistBlip[id] != null) {
		heistBlip[id].destroy();
		heistBlip[id] = null;
	}
});

mp.events.add('deleteWorkBlip', function () {
    if (workBlip != null)
        workBlip.destroy();
    workBlip = null;
});

var garageBlip = null;
mp.events.add('createGarageBlip', function (position) {
    if (garageBlip != null)
        garageBlip.destroy();
    garageBlip = mp.blips.new(357, position,
        {
            name: "Гараж",
            scale: 0.8,
            color: 45,
            alpha: 255,
            drawDistance: 100,
            shortRange: true,
            rotation: 0,
            dimension: 0,
        });
});
mp.events.add('deleteGarageBlip', function () {
    if (garageBlip != null)
        garageBlip.destroy();
    garageBlip = null;
});

mp.events.add('changeBlipColor', function (blip, color) {
    try {
        if (blip == null) return;
        blip.setColour(color);
    } catch (e) { } 
});
mp.events.add('changeBlipAlpha', function (blip, alpha) {
    try {
        if (blip == null) return;
        blip.setAlpha(alpha);
    } catch (e) { } 
});
}