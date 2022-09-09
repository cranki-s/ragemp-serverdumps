{
/** 
 * This file contains the interface to set the position info.
 * Default compass system by ynhhoJ
 */
require("ui.js");
require('vehicleutil.js');

let player = mp.players.local,
    street, zone,
    show = false,
    minimap = getMinimapAnchor();

player.bigMap = false;

function syncAnchorAndResolution() {
    let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    let anchor = getMinimapAnchor();

    browserSet("hudVM", "minimapAnchor", anchor);
    browserSet("hudVM", "resolution", resolution);
}

// sync position of radar for the UI
syncAnchorAndResolution();
mp.setInterval(() => {
    syncAnchorAndResolution();
}, 2000);

// Position Info Update
mp.setInterval( () => {
    if (show) {
        street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0);
        let streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName)
        zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z));

        // force zone in cayo perico
        if (zone.indexOf("Yankton") !== -1) {
            zone = "Cayo Perico"
            streetName = ""
        }
        browserExecute("hudVM.zone='"+zone+"'");
        browserExecute("hudVM.street='"+streetName+"'");
    }
}, 2000)

var radarOn = true;
mp.events.add("ui:on_toggle_radar", (toggle) => {
    radarOn = toggle;
});

mp.events.add("render", () => {
    if(player.vehicle && !player.bigMap) {
        if(!show) {
            show = true
            browserExecute("hudVM.showLocation=true");
            let activeRes = mp.game.graphics.getScreenActiveResolution(0, 0);
            browserSet("hudVM", "x", Math.round(minimap.rightX*activeRes.x));
            browserSet("hudVM", "y", Math.round(minimap.topY*activeRes.y));
        }

        //  Compass render
        if(!radarOn) return;
        const pxDegree = compass.width / compass.fov;
        let playerHeadingDegrees = 0;
        if (compass.followGameplayCam) {
            const camRot = mp.cameras.new('gameplay').getRot(2);
            playerHeadingDegrees = 360.0 - ((camRot.z + 360.0) % 360.0);
        } else {
            playerHeadingDegrees = 360.0 - mp.players.local.getHeading();
        }
        let tickDegree = playerHeadingDegrees - compass.fov / 2;
        const tickDegreeRemainder = compass.ticksBetweenCardinals - (tickDegree % compass.ticksBetweenCardinals);
        let tickPosition = compass.position.x + tickDegreeRemainder * pxDegree;

        tickDegree += tickDegreeRemainder;
        mp.game.graphics.drawRect(bg.x, compass.position.y, bg.width, bg.height, bg.color.r, bg.color.g, bg.color.b, bg.color.a);
        while (tickPosition < compass.position.x + compass.width) {
            if ((tickDegree % 90.0) === 0) {
                // Draw cardinal
                mp.game.graphics.drawText(degreesToIntercardinalDirection(tickDegree), [tickPosition, compass.position.y - 0.012], {
                    font: 2,
                    color: compass.cardinal.textColour,
                    scale: [0.35, 0.35],
                    outline: true,
                });
            } else if ((tickDegree % 45.0) === 0 || compass.intercardinal.show) {
                // Draw intercardinal ticks
                if (compass.intercardinal.tickShow) {
                    mp.game.graphics.drawRect(
                        tickPosition, compass.position.y,
                        compass.intercardinal.tickSize.w, compass.intercardinal.tickSize.h,
                        compass.intercardinal.tickColour.r, compass.intercardinal.tickColour.g, compass.intercardinal.tickColour.b, compass.intercardinal.tickColour.a,
                    );
                }
            } else {
                mp.game.graphics.drawRect(tickPosition, compass.position.y, compass.tickSize.w, compass.tickSize.h, compass.tickColour.r, compass.tickColour.g, compass.tickColour.b, compass.tickColour.a);
            }
            // Advance to the next tick
            tickDegree += compass.ticksBetweenCardinals;
            tickPosition += pxDegree * compass.ticksBetweenCardinals;
        }
    } else if (show) {
        show = false
        browserExecute("hudVM.showLocation=false");
    }
})

// big map with Z Key
mp.keys.bind(0x5A, true, function () {
    if (mp.gui.cursor.visible) return;

    toggleBigMap();
});


//Compass

const compass = { cardinal: {}, intercardinal: {} };

// Configuration. Please be careful when editing. It does not check for errors.
compass.position = { x: minimap.leftX, y: minimap.topY-0.015-0.015, centered: false };
compass.width = minimap.rightX-minimap.leftX;
compass.fov = 180;
compass.followGameplayCam = true;

compass.ticksBetweenCardinals = 9.0;
compass.tickColour = {
    r: 255, g: 255, b: 255, a: 255,
};
compass.tickSize = { w: 0.001, h: 0.003 };

compass.cardinal.textColour = [255, 255, 255, 185];

compass.cardinal.tickShow = true;
compass.cardinal.tickSize = { w: 0.001, h: 0.012 };
compass.cardinal.tickColour = {
    r: 255, g: 255, b: 255, a: 255,
};

compass.intercardinal.show = false;

compass.intercardinal.tickShow = true;
compass.intercardinal.tickSize = { w: 0.001, h: 0.006 };
compass.intercardinal.tickColour = {
    r: 255, g: 255, b: 255, a: 255,
};

let bg = {};
bg.width = compass.width;
bg.x = minimap.rightX-(bg.width/2);
bg.height = 0.025;
bg.color = {
    r: 9, g: 9, b: 19, a: 64,
};
// End of configuration

function degreesToIntercardinalDirection(dgr) {
    dgr %= 360.0;

    if ((dgr >= 0.0 && dgr < 22.5) || dgr >= 337.5) return 'N ';
    if (dgr >= 22.5 && dgr < 67.5) return ' ';
    if (dgr >= 67.5 && dgr < 112.5) return 'E ';
    if (dgr >= 157.5 && dgr < 202.5) return 'S ';
    if (dgr >= 112.5 && dgr < 157.5) return ' ';
    if ((dgr >= 202.5 && dgr < 247.5) || (dgr > -112.5 && dgr <= -65.7)) return ' ';
    if ((dgr >= 247.5 && dgr <= 292.5) || (dgr > -65.7 && dgr <= -22.5)) return 'O ';
    if ((dgr >= 292.5 && dgr < 337.5) || (dgr > -22.5 && dgr <= 0)) return ' ';
}



// https://github.com/glitchdetector/fivem-minimap-anchor
function getMinimapAnchor() {
    let sfX = 1.0 / 20.0;
    let sfY = 1.0 / 20.0;
    let safeZone = mp.game.graphics.getSafeZoneSize();
    let aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
    let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    let scaleX = 1.0 / resolution.x;
    let scaleY = 1.0 / resolution.y;

    let minimap = {
        width: scaleX * (resolution.x / (4 * aspectRatio)),
        height: scaleY * (resolution.y / 5.674),
        scaleX: scaleX,
        scaleY: scaleY,
        leftX: scaleX * (resolution.x * (sfX * (Math.abs(safeZone - 1.0) * 10))),
        bottomY: 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(safeZone - 1.0) * 10))),
    };

    minimap.rightX = minimap.leftX + minimap.width;
    minimap.topY = minimap.bottomY - minimap.height;
    return minimap;
}

mp.getMinimapAnchor = getMinimapAnchor;

function toggleBigMap() {
    if (player.vehicle && isTowTruck(player.vehicle.model) || player.vehicle && isTruck(player.vehicle.model)) return;

    player.bigMap = !player.bigMap;
    mp.game.ui.setRadarBigmapEnabled(player.bigMap, false);

    // disable zone name and money in CEF if enable big map
    if (player.bigMap) {
        browserExecute("hudVM.showMapUi=false"); // disable health, needs and money

        if (show) {
            show = false;
            browserExecute("hudVM.showLocation=false");
        }
    } else {
        // only toggle needs and money because location is activated in render
        browserExecute("hudVM.showMapUi=true");
    }
}
}