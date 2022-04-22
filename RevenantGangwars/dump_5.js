{
const ui = mp.game.ui;

exports.drawText = function(text, position, scale, font = 4, color = [255, 255, 255, 255], alignment = 0, outline = true) {
    ui.setTextEntry("CELL_EMAIL_BCON");
    for (let i = 0; i < text.length; i += 99) ui.addTextComponentSubstringPlayerName(text.substr(i, Math.min(99, text.length - i)));

    ui.setTextFont(font);
    ui.setTextScale(scale, scale);
    ui.setTextColour(color[0], color[1], color[2], color[3]);
    if (outline) mp.game.invoke("0x2513DFB0FB8400FE"); // SET_TEXT_OUTLINE

    switch (alignment) {
        case 1: {
            ui.setTextCentre(true);
            break;
        }

        case 2: {
            ui.setTextRightJustify(true);
            ui.setTextWrap(0, position[0]);
            break;
        }
    }

    ui.drawText(position[0], position[1]);
};

// credits to https://github.com/glitchdetector/fivem-minimap-anchor
exports.getMinimapAnchor = function() {
    let resolution = sharedDrawingVariables.resolution;
    let sfX = 1.0 / 20.0;
    let sfY = 1.0 / 20.0;
    let scaleX = 1.0 / resolution.x;
    let scaleY = 1.0 / resolution.y;

    let minimap = {
        width: scaleX * (resolution.x / (4 * sharedDrawingVariables.aspectRatio)),
        height: scaleY * (resolution.y / 5.674),
        scaleX: scaleX,
        scaleY: scaleY,
        leftX: scaleX * (resolution.x * (sfX * (Math.abs(sharedDrawingVariables.safeZoneSize - 1.0) * 10))),
        bottomY: 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(sharedDrawingVariables.safeZoneSize - 1.0) * 10))),
    };

    minimap.rightX = minimap.leftX + minimap.width;
    minimap.topY = minimap.bottomY - minimap.height;
    return minimap;
};

exports.loadTextureDict = function(textureDictName) {
    if (!mp.game.graphics.hasStreamedTextureDictLoaded(textureDictName)) {
        let start = Date.now();

        mp.game.graphics.requestStreamedTextureDict(textureDictName, true);
        while (!mp.game.graphics.hasStreamedTextureDictLoaded(textureDictName) && (Date.now() - start) < 500) mp.game.wait(0);
    }
};

exports.loadClipSet = function(clipSetName) {
    if (!mp.game.streaming.hasClipSetLoaded(clipSetName)) {
        let start = Date.now();

        mp.game.streaming.requestClipSet(clipSetName);
        while (!mp.game.streaming.hasClipSetLoaded(clipSetName) && (Date.now() - start) < 500) mp.game.wait(0);
    }
};

// credits to kemperrr
exports.getTextWidth = (text, font, scale) => {
    ui.setTextEntryForWidth("STRING");
    ui.addTextComponentSubstringPlayerName(text);
    ui.setTextFont(font);
    ui.setTextScale(scale * 1.25, scale);
    return ui.getTextScreenWidth(true);
};
}