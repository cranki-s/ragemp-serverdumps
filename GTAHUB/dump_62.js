{
const player = mp.players.local;
let isTyping = false;
let distanceToDraw = 12.25
const TYPINGTEXTS = [".", "..", "..."]

require("ui.js");


mp.keys.bind(0x54, true, () => { // T down

    // Toggle head chat player
    setTimeout( () => {
        if (isUIEnabled("chat") && !isTyping) {
            isTyping = true;
            mp.events.originalCallRemote('ui_headchat:toggle', true);
        }
    }, 500)
});

mp.events.add("chat:on_cancel", () => {
    isTyping = false;
    mp.events.originalCallRemote('ui_headchat:toggle', false);
});

mp.events.add("render", () => {

    // check nearby players to draw head chat label
    mp.players.forEachInStreamRange(playerNearby => {
        if (playerNearby !== player && mp.players.exists(playerNearby) && playerNearby.handle) {
            if (isInRangeOfPoint(distanceToDraw, playerNearby.position)) {
                // if player is typing
                if (playerNearby.getVariable('typing')) {
                    // create text effect in head: . -> .. -> ...
                    let point = TYPINGTEXTS[Math.round(Date.now() / 1000) % 3]

                    mp.game.graphics.drawText(point, [playerNearby.position.x,playerNearby.position.y, playerNearby.position.z + 1.0], {
                        font: 7,
                        color: [255, 255, 255, 200],
                        scale: [0.5, 0.5],
                        outline: true
                    });
                }
            }
        }
    });
});

function isInRangeOfPoint(distance, targetPosition) {
    return (mp.game.system.vdist2(player.position.x, player.position.y, player.position.z, targetPosition.x, targetPosition.y, targetPosition.z) <= distance)
}

}