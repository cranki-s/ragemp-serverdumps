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
                color: [r, g, b, 200],
                visible: true,
                dimension: dimension
            });
    }
    else {
        markers[uid] = mp.markers.new(type, position, scale,
            {
                visible: true,
                dimension: dimension,
                color: [r, g, b, 255]
            });
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

var workBlip = null;
mp.events.add('createWorkBlip', function (position) {
    if (workBlip != null)
        workBlip.destroy();
    workBlip = mp.blips.new(0, position,
        {
            name: "Чекпоинт",
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 
mp.events.add('deleteWorkBlip', function () {
    if (workBlip != null)
        workBlip.destroy();
    workBlip = null;
});

var MusorkaBlip = null;
mp.events.add('createMusorkaBlip', function (position) {
    if (MusorkaBlip != null)
    MusorkaBlip.destroy();
        MusorkaBlip = mp.blips.new(318, position,
        {
            name: "Мусор",
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 
var SushiBlip = null;
mp.events.add('createSushiBlip', function (position) {
    if (SushiBlip != null)
    SushiBlip.destroy();
    SushiBlip = mp.blips.new(162, position,
        {
            name: "Заказ",
            scale: 1.3,
            color: 3,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 
mp.events.add('deleteSushiBlip', function () {
    if (SushiBlip != null)
    SushiBlip.destroy();
    SushiBlip = null;
});
mp.events.add('deleteWaypoint', function () {
    mp.game.invoke('0xA7E4E2D361C2627F');
});

mp.events.add('deleteMusorkaBlip', function () {
    if (MusorkaBlip != null)
    MusorkaBlip.destroy();
    MusorkaBlip = null;
});

var garageBlip = null;
mp.events.add('createGarageBlip', function (position) {
    if (garageBlip != null)
        garageBlip.destroy();
    garageBlip = mp.blips.new(473, position,
        {
            name: "Гараж",
            scale: 0.7,
            color: 67,
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

var sproute = null;

mp.events.add('createRoute', function (x, y)
{
    sproute = mp.blips.new(478, new mp.Vector3(x, y), { alpha: 255, name: "Точка разгрузки", scale: 1, color: 1 });
    sproute.setRoute(true);
    sproute.setRouteColour(5);
});

mp.events.add('removeRoute', function(){
    sproute.destroy();
});

var houseBlip = null;
mp.events.add('createHouseBlip', function (position) {
    if (houseBlip != null)
        houseBlip.destroy();
    houseBlip = mp.blips.new(357, position,
        {
            name: "Дом",
            scale: 0.7,
            color: 67,
            alpha: 255,
            drawDistance: 100,
            shortRange: true,
            rotation: 0,
            dimension: 0,
        });
});

mp.events.add('deleteHouseBlip', function () {
    if (houseBlip != null)
        houseBlip.destroy();
    houseBlip = null;
});

var Bookmarks = null;
mp.events.add('createBookmarksBlip', function (position) {
    if (Bookmarks != null)
    Bookmarks.destroy();
    Bookmarks = mp.blips.new(1, position,
        {
            name: "Место для закладки",
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 
mp.events.add('deleteBookmarksBlip', function () {
    if (Bookmarks != null)
    Bookmarks.destroy();
    Bookmarks = null;
});

var HijackingBlip = null;
mp.events.add('createHijackingBlip', function (position) {
    if (HijackingBlip != null)
        HijackingBlip.destroy();
    HijackingBlip = mp.blips.new(623, position,
        {
            name: "Угон авто",
            scale: 0.7,
            color: 38,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 
mp.events.add('deleteHijackingBlip', function () {
    if (HijackingBlip != null)
        HijackingBlip.destroy();
    HijackingBlip = null;
});

var HijBlip = null;
mp.events.add('BlipsHijacking', function (state, pos) {
	if (state) {
	   const blip = mp.game.ui.addBlipForRadius(pos.x, pos.y, pos.z, 240);
	   mp.game.invoke(getNative("SET_BLIP_SPRITE"), blip, 4);
	   mp.game.invoke(getNative("SET_BLIP_ALPHA"), blip, 255);
	   mp.game.invoke(getNative("SET_BLIP_COLOUR"), blip, 47);
	   HijBlip = blip;
	}
	else {
		mp.game.invoke(getNative("SET_BLIP_ALPHA"), HijBlip, 0);
	}
});	
}