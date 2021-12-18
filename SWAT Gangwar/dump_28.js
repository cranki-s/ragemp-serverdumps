{
const compass = { cardinal: {}, intercardinal: {} };

// Configuration. Please be careful when editing. It does not check for errors.
compass.show = false;
compass.position = { x: 0.5, y: 0.08, centered: true };
compass.width = 0.25;
compass.fov = 180;
compass.followGameplayCam = true;

compass.ticksBetweenCardinals = 9.0;
compass.tickColour = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
};
compass.tickSize = { w: 0.001, h: 0.003 };

compass.cardinal.textSize = 0.25;
compass.cardinal.textOffset = 0.015;
compass.cardinal.textColour = [255, 255, 255, 185];

compass.cardinal.tickShow = true;
compass.cardinal.tickSize = { w: 0.001, h: 0.012 };
compass.cardinal.tickColour = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
};

compass.intercardinal.show = false;
compass.intercardinal.textShow = true;
compass.intercardinal.textSize = 0.01;
compass.intercardinal.textOffset = 0.015;
compass.intercardinal.textColour = [255, 255, 255, 185];

compass.intercardinal.tickShow = true;
compass.intercardinal.tickSize = { w: 0.001, h: 0.006 };
compass.intercardinal.tickColour = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
};

let bg = {};
bg.x = 0.125;
bg.width = 0.26;
bg.height = 0.025;
bg.color = {
    r: 0,
    g: 0,
    b: 0,
    a: 100,
};
// End of configuration

function degreesToIntercardinalDirection(dgr) {
    dgr %= 360.0;

    if ((dgr >= 0.0 && dgr < 22.5) || dgr >= 337.5) return 'N ';
    if (dgr >= 22.5 && dgr < 67.5) return 'NE ';
    if (dgr >= 67.5 && dgr < 112.5) return 'E ';
    if (dgr >= 157.5 && dgr < 202.5) return 'SE ';
    if (dgr >= 112.5 && dgr < 157.5) return 'S ';
    if ((dgr >= 202.5 && dgr < 247.5) || (dgr > -112.5 && dgr <= -65.7)) return 'SW ';
    if ((dgr >= 247.5 && dgr <= 292.5) || (dgr > -65.7 && dgr <= -22.5)) return 'W ';
    if ((dgr >= 292.5 && dgr < 337.5) || (dgr > -22.5 && dgr <= 0)) return 'NW ';
}
if (compass.position.centered) {
    compass.position.x = compass.position.x - compass.width / 2;
}
mp.events.add('render', () => {
    if (compass.show) {
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
        mp.game.graphics.drawRect(compass.position.x + bg.x, compass.position.y, bg.width, bg.height, bg.color.r, bg.color.g, bg.color.b, bg.color.a);
        while (tickPosition < compass.position.x + compass.width) {
            if ((tickDegree % 90.0) === 0) {
                // Draw cardinal
                if (compass.cardinal.tickShow) {
                    mp.game.graphics.drawRect(
                        tickPosition, compass.position.y,
                        compass.cardinal.tickSize.w, compass.cardinal.tickSize.h,
                        compass.cardinal.tickColour.r, compass.cardinal.tickColour.g, compass.cardinal.tickColour.b, compass.cardinal.tickColour.a,
                    );
                }
                mp.game.graphics.drawText(degreesToIntercardinalDirection(tickDegree), [tickPosition, compass.position.y + compass.cardinal.textOffset], {
                    font: 2,
                    color: compass.cardinal.textColour,
                    scale: compass.cardinal.textSize,
                    outline: true,
                });
            } else if ((tickDegree % 45.0) === 0 || compass.intercardinal.show) {
                // Draw intercardinal
                if (compass.intercardinal.tickShow) {
                    mp.game.graphics.drawRect(
                        tickPosition, compass.position.y,
                        compass.intercardinal.tickSize.w, compass.intercardinal.tickSize.h,
                        compass.intercardinal.tickColour.r, compass.intercardinal.tickColour.g, compass.intercardinal.tickColour.b, compass.intercardinal.tickColour.a,
                    );
                }

                if (compass.intercardinal.textShow) {
                    mp.game.graphics.drawText(degreesToIntercardinalDirection(tickDegree), [tickPosition, compass.position.y + compass.intercardinal.textOffset], {
                        font: 2,
                        color: compass.intercardinal.textColour,
                        scale: [0.3, 0.3],
                        outline: true,
                    });
                }
            } else {
                mp.game.graphics.drawRect(tickPosition, compass.position.y, compass.tickSize.w, compass.tickSize.h, compass.tickColour.r, compass.tickColour.g, compass.tickColour.b, compass.tickColour.a);
            }
            // Advance to the next tick
            tickDegree += compass.ticksBetweenCardinals;
            tickPosition += pxDegree * compass.ticksBetweenCardinals;
        }
    }
});

// Browser
let browser = null,
    lastInteract = 0;


function canInteract() {
    return lastInteract + 5000 < Date.now();
}

mp.keys.bind(0x48, true, function() {
    if (!canInteract || !compass.show) return;
    if (mp.gui.cursor.visible || mp.players.local.getVariable("IsCefOpen") == true) return;
    lastInteract = Date.now();
    mp.events.callRemote("Server:BattleRoyale:dropWeapon");
});

mp.events.add("Client:BattleRoyale:create", (playerCount) => {
    mp.players.local.setInvincible(true);
    compass.show = true;
    if (browser == null) browser = mp.browsers.new("package://cef/battleroyale/index.html");
    setTimeout(() => {
        browser.execute(`setPCount(${playerCount});`);
    }, 50);
});

mp.events.add("Client:BattleRoyale:updatePCount", (count) => {
    setTimeout(() => {
        if (browser != null)
            browser.execute(`setPCount(${count});`);
    }, 50);
});

mp.events.add("Client:BattleRoyale:updateVestCount", (count) => {
    setTimeout(() => {
        if (browser != null)
            browser.execute(`setVestCount(${count});`);
    }, 50);
});

mp.events.add("Client:BattleRoyale:updateMediKitCount", (count) => {
    setTimeout(() => {
        if (browser != null)
            browser.execute(`setMediKitCount(${count});`);
    }, 50);
});

mp.events.add("Client:BattleRoyale:sendNotification", (msg, duration) => {
    setTimeout(() => {
        if (browser != null)
            browser.execute(`showNotification('${msg}', ${duration});`);
    }, 50);
});

mp.events.add("Client:BattleRoyale:startCountdown", (seconds) => {
    if (browser != null)
        browser.execute(`startCountdown(${seconds});`);
});

mp.events.add("Client:BattleRoyale:destroyCEF", () => {
    compass.show = false;
    mp.players.local.setInvincible(false);
    if (browser != null)
        browser.destroy();
    browser = null;
});
}