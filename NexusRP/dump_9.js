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
            name: global.GetText("Чекпоинт"),
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



var Truckerblip = null;
mp.events.add('CreateTruckerblip', function (position) {
    Truckerblip = mp.blips.new(0, position,
        {
            name: global.GetText("Дальнобойщик"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 

mp.events.add('deleteTruckerblip', function () {
    if (Truckerblip != null)
    Truckerblip.destroy();
});
var Truckerblip1 = null;
mp.events.add('CreateTruckerblip1', function (position) {
    Truckerblip1 = mp.blips.new(0, position,
        {
            name: global.GetText("Дальнобойщик"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 

mp.events.add('deleteTruckerblip1', function () {
    if (Truckerblip1 != null)
    Truckerblip1.destroy();
});
var Truckerblip2 = null;
mp.events.add('CreateTruckerblip2', function (position) {
    Truckerblip2 = mp.blips.new(0, position,
        {
            name: global.GetText("Дальнобойщик"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 

mp.events.add('deleteTruckerblip2', function () {
    if (Truckerblip2 != null)
    Truckerblip2.destroy();
});

var Truckerblip3 = null;
mp.events.add('CreateTruckerblip3', function (position) {
    Truckerblip3 = mp.blips.new(0, position,
        {
            name: global.GetText("Дальнобойщик"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 

mp.events.add('deleteTruckerblip3', function () {
    if (Truckerblip3 != null)
    Truckerblip3.destroy();
});



var Truckerblip4 = null;
mp.events.add('CreateTruckerblip4', function (position) {
    Truckerblip4 = mp.blips.new(0, position,
        {
            name: global.GetText("Гос заказы"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
}); 

mp.events.add('deleteTruckerblip4', function () {
    if (Truckerblip4 != null)
    Truckerblip4.destroy();
});
var garageBlip = null;
mp.events.add('createGarageBlip', function (position) {
    if (garageBlip != null)
        garageBlip.destroy();
    garageBlip = mp.blips.new(473, position,
        {
            name: global.GetText("Гараж"),
            scale: 1,
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