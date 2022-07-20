{
const ScreenCoords = {
    // base coords
    baseX: 0.918,
    baseY: 0.984,

    // title (left text) coords
    titleOffsetX: 0.012,
    titleOffsetY: -0.009,

    // value (right text) coords
    valueOffsetX: 0.0785,
    valueOffsetY: -0.0165,

    // progress bar coords
    pbarOffsetX: 0.047,
    pbarOffsetY: 0.0015
};

const Sizes = {
    // bar dimensions
    timerBarWidth: 0.165,
    timerBarHeight: 0.035,
    timerBarMargin: 0.038,

    // progress bar dimensions
    pbarWidth: 0.0616,
    pbarHeight: 0.0105
};

const Natives = {
    SET_TEXT_DROP_SHADOW: "0x1CA3E9EAC9D93E5E",
    SET_TEXT_OUTLINE: "0x2513DFB0FB8400FE"
};

const HUDComponents = {
    VehicleName: 6,
    AreaName: 7,
    VehicleClass: 8,
    StreetName: 9
};

const activeTimerBars = [];

const drawText = (text, position, options) => {
    options = { ...{ align: 1, font: 4, scale: 0.3, outline: true, shadow: true, color: [255, 255, 255, 255] }, ...options };

    const ui = mp.game.ui;
    const font = options.font;
    const scale = options.scale;
    const outline = options.outline;
    const shadow = options.shadow;
    const color = options.color;
    const wordWrap = options.wordWrap;
    const align = options.align;

    ui.setTextEntry("CELL_EMAIL_BCON");
    for (let i = 0; i < text.length; i += 99)
    {
        const subStringText = text.substr(i, Math.min(99, text.length - i));
        mp.game.ui.addTextComponentSubstringPlayerName(subStringText);
    }

    ui.setTextFont(font);
    ui.setTextScale(scale, scale);
    ui.setTextColour(color[0], color[1], color[2], color[3]);

    if (shadow) {
        mp.game.invoke(Natives.SET_TEXT_DROP_SHADOW);
    }

    if (outline) {
        mp.game.invoke(Natives.SET_TEXT_OUTLINE);
    }

    switch (align) {
        case 1: {
            ui.setTextCentre(true);
            break;
        }
        case 2: {
            ui.setTextRightJustify(true);
            ui.setTextWrap(0.0, position[0] || 0);
            break;
        }
    }

    if (wordWrap) {
        ui.setTextWrap(0.0, (position[0] || 0) + wordWrap);
    }

    ui.drawText(position[0] || 0, position[1] || 0);
};

// timerbar class
class TimerBar {
    constructor(title, useProgressBar = false) {
        this.title = title;
        this.useProgressBar = useProgressBar;
        this.text = "";
        this._pbarValue = 0.0;
        this._textColor = [240, 240, 240, 255];
        this._pbarBgColor = [155, 155, 155, 255];
        this._pbarFgColor = [255, 255, 255, 255];
        this.usePlayerStyle = false;

        // load timerbars texture dict
        if (!mp.game.graphics.hasStreamedTextureDictLoaded("timerbars")) {
            mp.game.graphics.requestStreamedTextureDict("timerbars", true);
            while (!mp.game.graphics.hasStreamedTextureDictLoaded("timerbars")) mp.game.wait(0);
        }

        this._visible = true;
        activeTimerBars.push(this);
    }

    get progress() {
        return this._pbarValue;
    }

    set progress(value) {
        this._pbarValue = value <= 0.0 ? 0.0 : value >= 1.0 ? 1.0 : value;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        let idx = activeTimerBars.indexOf(this);
        if (value) {
            if (idx != -1) return;
            activeTimerBars.push(this);
        } else {
            if (idx == -1) return;
            activeTimerBars.splice(idx, 1);
        }

        this._visible = value;
    }

    get textColor() {
        return this._textColor;
    }

    set textColor(value) {
        if (Array.isArray(value)) {
            this._textColor = value;
        } else {
            let result = mp.game.ui.getHudColour(value, 0, 0, 0, 0);
            this._textColor = [result.r, result.g, result.b, result.a];
        }
    }

    get pbarBgColor() {
        return this._pbarBgColor;
    }

    set pbarBgColor(value) {
        if (Array.isArray(value)) {
            this._pbarBgColor = value;
        } else {
            let result = mp.game.ui.getHudColour(value, 0, 0, 0, 0);
            this._pbarBgColor = [result.r, result.g, result.b, result.a];
        }
    }

    get pbarFgColor() {
        return this._pbarFgColor;
    }

    set pbarFgColor(value) {
        if (Array.isArray(value)) {
            this._pbarFgColor = value;
        } else {
            let result = mp.game.ui.getHudColour(value, 0, 0, 0, 0);
            this._pbarFgColor = [result.r, result.g, result.b, result.a];
        }
    }
}

// draw timerbars
mp.events.add("render", () => {
    let safeZone = mp.game.graphics.getSafeZoneSize();
    let safeZoneX = (1.0 - safeZone) * 0.5;
    let safeZoneY = (1.0 - safeZone) * 0.5;
    let max = activeTimerBars.length;

    if (max > 0) {
        mp.game.ui.hideHudComponentThisFrame(HUDComponents.VehicleName);
        mp.game.ui.hideHudComponentThisFrame(HUDComponents.AreaName);
        mp.game.ui.hideHudComponentThisFrame(HUDComponents.VehicleClass);
        mp.game.ui.hideHudComponentThisFrame(HUDComponents.StreetName);
    }

    for (let i = 0; i < max; i++) {
        let drawY = (ScreenCoords.baseY - safeZoneY) - (i * Sizes.timerBarMargin);

        // draw bg
        mp.game.graphics.drawSprite("timerbars", "all_black_bg", ScreenCoords.baseX - safeZoneX, drawY, Sizes.timerBarWidth, Sizes.timerBarHeight, 0.0, 255, 255, 255, 160);

        // draw title
        drawText(activeTimerBars[i].title, [(ScreenCoords.baseX - safeZoneX) + ScreenCoords.titleOffsetX, drawY + ScreenCoords.titleOffsetY - (activeTimerBars[i].usePlayerStyle ? 0.00625 : 0.0)], {
            font: activeTimerBars[i].usePlayerStyle ? 4 : 0,
            color: activeTimerBars[i]._textColor,
            scale: activeTimerBars[i].usePlayerStyle ? 0.465 : 0.3,
            outline: false,
            align: 2,
            shadow: activeTimerBars[i].usePlayerStyle
        });

        if (activeTimerBars[i].useProgressBar) {
            let pbarX = (ScreenCoords.baseX - safeZoneX) + ScreenCoords.pbarOffsetX;
            let pbarY = drawY + ScreenCoords.pbarOffsetY;
            let width = Sizes.pbarWidth * activeTimerBars[i]._pbarValue;

            // draw background
            mp.game.graphics.drawRect(pbarX, pbarY, Sizes.pbarWidth, Sizes.pbarHeight, activeTimerBars[i]._pbarBgColor[0], activeTimerBars[i]._pbarBgColor[1], activeTimerBars[i]._pbarBgColor[2], activeTimerBars[i]._pbarBgColor[3]);

            // draw foreground
            mp.game.graphics.drawRect((pbarX - Sizes.pbarWidth / 2) + width / 2, pbarY, width, Sizes.pbarHeight, activeTimerBars[i]._pbarFgColor[0], activeTimerBars[i]._pbarFgColor[1], activeTimerBars[i]._pbarFgColor[2], activeTimerBars[i]._pbarFgColor[3]);
        } else {
            // draw text
            drawText(activeTimerBars[i].text, [(ScreenCoords.baseX - safeZoneX) + ScreenCoords.valueOffsetX, drawY + ScreenCoords.valueOffsetY], {
                font: 0,
                color: activeTimerBars[i]._textColor,
                scale: 0.425,
                outline: false,
                align: 2,
                shadow: false
            });
        }
    }
});

exports.TimerBar = TimerBar;
}