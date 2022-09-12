{
const ui = mp.game.ui;

// kill feed settings
const maxKillFeedItems = 5;
const killFeedItemRemoveTime = 30000;
const feedVisualUpdateInterval = 1000;

// coord and size settings
const drawX = 0.9975;
const drawY = 0.083;
const itemMargin = 0.04;
const itemHeight = 0.03;
const itemPadding = 0.005;

// font settings
const fontStyle = 0;
const fontScale = 0.30;

// used by the script
let lastSafeZone = mp.game.graphics.getSafeZoneSize();
let lastResolution = mp.game.graphics.getScreenActiveResolution(0, 0);
let finalDrawX = drawX - (1.0 - lastSafeZone) * 0.5;
let finalDrawY = drawY + (1.0 - lastSafeZone) * 0.5;
let killFeedItems = [];

// credits to kemperrr
const getTextWidth = (text, font, scale) => {
    ui.setTextEntryForWidth("STRING");
    ui.addTextComponentSubstringPlayerName(text);
    ui.setTextFont(font);
    ui.setTextScale(scale * 1.25, scale);
    return ui.getTextScreenWidth(true);
};

const drawText = (text, drawXY, font, color, scale, alignRight = false) => {
    ui.setTextEntry("STRING");
    ui.addTextComponentSubstringPlayerName(text);
    ui.setTextFont(font);
    ui.setTextScale(scale, scale);
    ui.setTextColour(color[0], color[1], color[2], color[3]);
    mp.game.invoke("0x2513DFB0FB8400FE"); // SET_TEXT_OUTLINE

    if (alignRight) {
        ui.setTextRightJustify(true);
        ui.setTextWrap(0, drawXY[0]);
    }

    ui.drawText(drawXY[0], drawXY[1]);
};

setInterval(() => {
    // detect safezone size change, recalculate draw coords
    let safeZone = mp.game.graphics.getSafeZoneSize();
    if (safeZone != lastSafeZone) {
        finalDrawX = drawX - (1.0 - safeZone) * 0.5;
        finalDrawY = drawY + (1.0 - safeZone) * 0.5;
        lastSafeZone = safeZone;
    }

    // detect screen resolution change, recalculate kill feed item width
    let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    if (resolution.x != lastResolution.x || resolution.y != lastResolution.y) {
        for (let i = 0, max = killFeedItems.length; i < max; i++) {
            killFeedItems[i].TextWidth = getTextWidth(killFeedItems[i].Text, fontStyle, fontScale);
        }

        lastResolution = resolution;
    }

    // remove expired kill feed items
    let now = Date.now();
    for (let i = killFeedItems.length - 1; i >= 0; i--) {
        if (now - killFeedItems[i].PushTime >= killFeedItemRemoveTime) killFeedItems.splice(i, 1);
    }
}, feedVisualUpdateInterval);

mp.events.add("pushToKillFeed", (message) => {
    if (killFeedItems.length >= maxKillFeedItems) killFeedItems.shift();

    killFeedItems.push({
        Text: message,
        TextWidth: getTextWidth(message, fontStyle, fontScale),
        PushTime: Date.now()
    });
});

mp.events.add("render", () => {
    for (let i = 0, max = killFeedItems.length; i < max; i++) {
        mp.game.graphics.drawRect(finalDrawX - (killFeedItems[i].TextWidth / 2), finalDrawY + (itemMargin * i), killFeedItems[i].TextWidth + itemPadding, itemHeight + itemPadding, 0, 0, 0, 150);
        drawText(killFeedItems[i].Text, [finalDrawX, finalDrawY + (itemMargin * i) - (itemHeight / 2)], fontStyle, [255, 255, 255, 255], fontScale, true);
    }
});
}