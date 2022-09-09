{
/** Joebill implementation of per-player map icons. */

require('pools.js');

let playerBlips = new Array(3096);

mp.blips.atJoebillId = function(id) {
    return playerBlips[id];
}

function createSpecialBlipHandler(id, sprite, pos, name, color, scale, alpha) {
    if (playerBlips[id]) destroyBlip(id);
    let blipHandle = mp.game.ui.addBlipForRadius(pos.x, pos.y, pos.z, scale);
    playerBlips[id] = {
        model: sprite,
        id: id,
        special: true,
        handle: blipHandle,
    };
    setBlipAlpha(id, alpha);
    setBlipColor(id, color);
}

function setBlipAlpha(id, alpha) {
    if (!playerBlips[id]) return;
    if (!playerBlips[id].special) playerBlips[id].setAlpha(alpha);
    else mp.game.invoke("0x45FF974EEE1C8734", playerBlips[id].handle, alpha); // SET_BLIP_ALPHA
}

function setBlipColor(id, color) {
    if (!playerBlips[id]) return;
    if (!playerBlips[id].special) playerBlips[id].setColour(color);
    else mp.game.invoke("0x03D7FB09E75D6B7E", playerBlips[id].handle, color); // SET_BLIP_COLOUR
}

function setBlipPosition(id, position) {
    if (!playerBlips[id]) return;
    if (!playerBlips[id].special) playerBlips[id].setCoords(position);
    else mp.game.invoke("0xAE2AF67E9D9AF65D", playerBlips[id].handle, position); // SET_BLIP_COORDS
    playerBlips[id].position = position;
}

function destroyBlip(id) {
    if (!playerBlips[id]) return;
    if (playerBlips[id].special) mp.game.ui.removeBlip(playerBlips[id].handle);
    else playerBlips[id].destroy();
    if (playerBlips[id].customRoute) mp.game.invoke("0x3DDA37128DD1ACA8", false);
}

// Update attached blip positions interval
mp.setInterval(() => {
    for (let id = 0; id < playerBlips.length; id++) {
        if (playerBlips[id]) {
            if (playerBlips[id].attachedTo) {
                try {
                    playerBlips[id].attachedTo.handle; // throws if attachedTo is destroyed
                    setBlipPosition(id, playerBlips[id].attachedTo.getCoords(true));
                } catch (e) {
                    // attached entity got destroyed, detach.
                    mp.events.call("blip:detach", id);
                }
            }
        }
    }
}, 100);

mp.rpc("blip:create", (id, sprite, pos, name, color, scale, attachedData, alpha) => {
    if (sprite >= 1000) {
        createSpecialBlipHandler(id, sprite, pos, name, color, scale, alpha);
        return;
    }
    if (playerBlips[id]) destroyBlip(id);
    playerBlips[id] = mp.blips.new(sprite, pos,
    {
        name: name,
        scale: scale,
        color: color,
        alpha: alpha,
        shortRange: true,
        dimension: -1,
    });
    playerBlips[id].position = pos;
    if (attachedData != "{}") {
        let attached = JSON.parse(attachedData);
        mp.events.call("blip:attach", id, attached.type, attached.id, attached.bone, JSON.stringify(pos), JSON.stringify(new mp.Vector3(0,0,0)));
    }
});

mp.rpc("blip:short_range", (id, shortRange) => {
    if (playerBlips[id] && !playerBlips[id].special) {
        playerBlips[id].setAsShortRange(shortRange);
    }
});

mp.rpc("blip:flashing", (id, flashing) => {
    if (playerBlips[id] && !playerBlips[id].special) {
        playerBlips[id].setFlashes(flashing);
    }
});

mp.rpc("blip:alpha", (id, alpha) => {
    if (playerBlips[id]) {
        setBlipAlpha(id);
    }
});

mp.rpc("blip:destroy", (id) => {
    destroyBlip(id);
    playerBlips[id] = null;
});

mp.rpc("blip:name", (id, name) => {
    if (playerBlips[id] && !playerBlips[id].special) {
        mp.game.ui.beginTextCommandSetBlipName("STRING");
        mp.game.ui.addTextComponentSubstringPlayerName(name);
        playerBlips[id].endTextCommandSetName();
    }
});

mp.rpc("blip:position", (id, pos) => {
    if (playerBlips[id]) {
        setBlipPosition(id, pos);
    }
});

mp.rpc("blip:scale", (id, scale) => {
    if (playerBlips[id] && !playerBlips[id].special) playerBlips[id].setScale(scale);
});

mp.rpc("blip:color", (id, color) => {
    if (playerBlips[id]) setBlipColor(id, color);
});

mp.rpc("blip:route", (id, color, customPoints = null) => {
    if (playerBlips[id] && !playerBlips[id].special) {
        playerBlips[id].setRoute(true);
        playerBlips[id].setRouteColour(color);

        customPoints = !customPoints ? [] : JSON.parse(customPoints)
        if (customPoints.length > 0) {
            playerBlips[id].customRoute = true;
            mp.game.invoke("0x3D3D15AF7BCAAF83", 6, false, false); // START_GPS_MULTI_ROUTE
            for (let point of customPoints) {
                mp.game.invoke("0xA905192A6781C41B", point.x, point.y, point.z); // ADD_POINT_TO_GPS_MULTI_ROUTE
            }
            mp.game.invoke("0x3DDA37128DD1ACA8", true); // SET_GPS_MULTI_ROUTE_RENDER
        }
    }
});

mp.rpc("blip:cancel_route", (id) => {
    if (playerBlips[id] && !playerBlips[id].special) {
        mp.game.invoke("0x3DDA37128DD1ACA8", false); // SET_GPS_MULTI_ROUTE_RENDER
        playerBlips[id].setRoute(false);
    }
});

mp.rpc("blip:attach", (id, entityKind, entityId, bone, offsetJson, rotationJson) => {
    if (playerBlips[id]) {
        let otherEntity = getEntityForKindAndId(entityKind, entityId);
        if (otherEntity) {
            // offset is ignored because doesn't really change anything.
            playerBlips[id].attachedTo = otherEntity;
        }
    }
});

mp.rpc("blip:detach", (id) => {
    if (playerBlips[id]) {
        playerBlips[id].setCoords(playerBlips[id].position);
        delete playerBlips[id].attachedTo;
    }
});
}