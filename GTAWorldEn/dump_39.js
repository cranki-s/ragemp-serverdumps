{
﻿var buttons = [];
var keyPadObj = null;

// Constants
const defaultPosition = { X: 0.50, Y: 0.60 };
const defaultSize = { X: 0.3, Y: 0.498 };
const defaultXOffset = 0.0075;
const defaultYOffset = 0.008;
const defaultXStartValue = (defaultPosition.X - (defaultSize.X / 2) + defaultXOffset);
const defaultYStartValue = (defaultPosition.Y - (defaultSize.Y / 2) + defaultYOffset);
const textOffset = 0.033;

// Bind keys
// CTRL - Closes UI
mp.keys.bind(0x11, false, CTRLPush);

mp.events.add("startKeyPad", (title, subTitle, useAsterisk) => {
    CleanUp();
    keyPadObj = new Keypad(title, subTitle, defaultPosition, defaultSize, useAsterisk);
    //infoObj = new InformationBox(1, "Information", "heres info and so on", defaultPosition, defaultSize);

    CreateButtons();

    mp.gui.cursor.show(true, true);
    mp.game.graphics.notify("Use '~g~CTRL~w~' or '~g~right mouse button~w~' to close the UI.");
});

function CreateButtons() {
    for (i = 0; i < 3; i++) {
        for (k = 0; k < 3; k++) {
            var value = 0;
            if (k <= 0)
                value = i + 7;
            else if (k == 1)
                value = (i + k) + 3;
            else
                value = (i + k) - 1;

            var x = defaultXStartValue + (i * defaultXOffset) + ((i + 0.5) * (0.09));
            var y = defaultYStartValue + (k * defaultYOffset) + ((k + 0.5) * (0.09));
            var keyPad = new KeypadButton(value, new Vector2(x, y - textOffset),
                new Vector2(x, y),
                new Vector2(0.09, 0.09),
                value);
            buttons.push(keyPad);
        }
    }

    var x = 0.426875;
    var y = defaultYStartValue + (3 * defaultYOffset) + (3.5 * 0.09);
    var zeroButton = new KeypadButton(10, new Vector2(x, y - textOffset), new Vector2(x, y), new Vector2(0.13875, 0.09), "0");
    buttons.push(zeroButton);

    x += 0.13875 + defaultXOffset;
    var deleteButton = new KeypadButton(11, new Vector2(x, y - textOffset), new Vector2(x, y), new Vector2(0.13875, 0.09), "Delete");
    buttons.push(deleteButton);

    y = defaultYStartValue + (4 * defaultYOffset) + (4.5 * 0.09);
    var confirmButton = new KeypadButton(12, new Vector2(defaultPosition.X, y - textOffset), new Vector2(defaultPosition.X, y), new Vector2((0.13875 * 2) + defaultXOffset, 0.09), "Confirm");
    buttons.push(confirmButton);
}

class Keypad {
    constructor(title, subTitle, position, size, useAsterisk) {
        this.title = title;
        this.subTitle = subTitle;
        this.position = position;
        this.size = size;
        this.currentButton = null;
        this.textValue = "";
        this.textDisplayValue = "";
        this.useAsterisk = useAsterisk;
        this.maxTextLength = 10;
        this.titleTextSize = new Vector2(1.25, 1.25);
        this.subTitleTextSize = this.subTitle.length <= 37 ? new Vector2(0.8, 0.8) : new Vector2(0.5, 0.5);
        this.shouldDraw = true;

        this.titleBoxPosition = new Vector2(this.position.X, this.position.Y - (this.size.Y / 2) - (defaultYOffset * 2) - 0.175);
        this.inputBoxPosition = new Vector2(this.position.X, (this.position.Y - (this.size.Y / 2) - defaultYOffset - 0.05));

        this.textSize = this.useAsterisk ? new Vector2(2.5, 2.5) : new Vector2(1.0, 1.0);

        this.onUpdateEventHandler = mp.events.add('render', () => this.onUpdateHandler());
    }

    onUpdateHandler() {
        if (!this.shouldDraw) return;

        let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
        let cursorPos = mp.gui.cursor.position;
        let cursorScreenPos = new Vector2(cursorPos[0] / resolution.x, cursorPos[1] / resolution.y);
        var hover = false;

        if (buttons !== null) {
            for (i = 0; i < buttons.length; i++) {
                var x = buttons[i].boxPosition.X - (buttons[i].boxSize.X / 2);
                var y = buttons[i].boxPosition.Y - (buttons[i].boxSize.Y / 2);

                if ((cursorScreenPos.X >= x && cursorScreenPos.X <= (x + buttons[i].boxSize.X)) && (cursorScreenPos.Y >= y && cursorScreenPos.Y <= (y + buttons[i].boxSize.Y))) {
                    this.currentButton = buttons[i];
                    buttons[i].toggleHover(true);
                    hover = true;
                } else if (buttons[i].hover)
                    buttons[i].toggleHover(false);
            }
            if (hover !== true && this.currentButton !== null)
                this.currentButton = null;
        }

        // Title     
        mp.game.graphics.drawRect(this.titleBoxPosition.X, this.titleBoxPosition.Y, this.size.X, 0.15, 100, 100, 100, 125);
        mp.game.graphics.drawRect(this.titleBoxPosition.X, this.titleBoxPosition.Y, this.size.X - (defaultXOffset * 2), 0.15 - (defaultYOffset * 2), 0, 0, 0, 255);

        mp.game.graphics.drawText(
            this.title,
            [this.titleBoxPosition.X, this.titleBoxPosition.Y - (textOffset*2)], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [this.titleTextSize.X, this.titleTextSize.Y],
                outline: true,
                centre: true
            }
        );

        mp.game.graphics.drawText(
            this.subTitle,
            [this.titleBoxPosition.X, this.titleBoxPosition.Y], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [this.subTitleTextSize.X, this.subTitleTextSize.Y],
                outline: true,
                centre: true
            }
        );

        // Input     
        mp.game.graphics.drawRect(this.inputBoxPosition.X, this.inputBoxPosition.Y, this.size.X, 0.1, 100, 100, 100, 125);
        mp.game.graphics.drawRect(this.inputBoxPosition.X, this.inputBoxPosition.Y, this.size.X - (defaultXOffset * 2), 0.1 - (defaultYOffset*2), 0, 0, 0, 255);

        mp.game.graphics.drawText(
            this.textDisplayValue,
            [this.inputBoxPosition.X, this.useAsterisk ? this.inputBoxPosition.Y - (textOffset * 1.35) : this.inputBoxPosition.Y - textOffset], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [this.textSize.X, this.textSize.Y],
                outline: true,
                centre: true
            }
        );
        // End of Input

        // Main Background
        mp.game.graphics.drawRect(this.position.X, this.position.Y, this.size.X, this.size.Y, 100, 100, 100, 125); 
    }
}

class KeypadButton {
    constructor(id, txtPosition, boxPosition, boxSize, text) {
        this.id = id;
        this.txtPosition = txtPosition;
        this.boxPosition = boxPosition;
        this.boxSize = boxSize;
        this.text = text;
        this.hover = false;
        this.shouldDraw = true;

        this.defaultTextColor = [255, 255, 255, 255];
        this.hoverTextColor = [0, 0, 0, 255];

        this.defaultBoxColor = { R: 0, G: 0, B: 0, A: 200 };
        this.hoverBoxColor = { R: 255, G: 255, B: 255, A: 200 };

        this.onUpdateEventHandler = mp.events.add('render', () => this.onUpdateHandler());
    }

    toggleHover(state) {
        this.hover = state;
    }

    onUpdateHandler() {
        if (!this.shouldDraw) return;
        // Button background
        if(this.hover)
            mp.game.graphics.drawRect(this.boxPosition.X, this.boxPosition.Y, this.boxSize.X, this.boxSize.Y, this.hoverBoxColor.R, this.hoverBoxColor.G, this.hoverBoxColor.B, this.hoverBoxColor.A); 
        else 
            mp.game.graphics.drawRect(this.boxPosition.X, this.boxPosition.Y, this.boxSize.X, this.boxSize.Y, this.defaultBoxColor.R, this.defaultBoxColor.G, this.defaultBoxColor.B, this.defaultBoxColor.A); 

        // Button text
        mp.game.graphics.drawText(
            this.text,
            [this.txtPosition.X, this.txtPosition.Y], {
                font: 4,
                color: this.hover ? this.hoverTextColor : this.defaultTextColor,
                scale: [1.0, 1.0],
                outline: this.hover ? true : false,
                centre: true
            }
        );
    }
}

class InformationBox {
    constructor(id, title, text, position, size) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.position = new Vector2(position.X + (size.X / 2) + defaultXOffset + 0.1, defaultYStartValue + defaultYOffset + (1.5 * 0.09));
        this.size = new Vector2(0.2, (0.09 * 3) + (defaultYOffset * 2));
        this.titleTextSize = new Vector2(1.0, 1.0);
        this.subTitleTextSize = new Vector2(0.8, 0.8);
        this.textSize = new Vector2(1.0, 1.0);
        this.shouldDraw = true;

        this.onUpdateEventHandler = mp.events.add('render', () => this.onUpdateHandler());
    }

    onUpdateHandler() {
        if (!this.shouldDraw) return;

        // Title     
        //mp.game.graphics.drawRect(this.titleBoxPosition.X, this.titleBoxPosition.Y, this.size.X, 0.15, 100, 100, 100, 125);
        //mp.game.graphics.drawRect(this.titleBoxPosition.X, this.titleBoxPosition.Y, this.size.X - (defaultXOffset * 2), 0.15 - (defaultYOffset * 2), 0, 0, 0, 255);

        mp.game.graphics.drawText(
            this.title,
            [this.position.X, (this.position.Y - (this.size.Y / 2)) - textOffset], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [this.titleTextSize.X, this.titleTextSize.Y],
                outline: true,
                centre: true
            }
        );

        mp.game.graphics.drawText(
            this.subTitle,
            [this.position.X, this.position.Y - textOffset], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [this.subTitleTextSize.X, this.subTitleTextSize.Y],
                outline: true,
                centre: true
            }
        );

        // Input     
        //mp.game.graphics.drawRect(this.inputBoxPosition.X, this.inputBoxPosition.Y, this.size.X, 0.1, 100, 100, 100, 125);
        //mp.game.graphics.drawRect(this.inputBoxPosition.X, this.inputBoxPosition.Y, this.size.X - (defaultXOffset * 2), 0.1 - (defaultYOffset * 2), 0, 0, 0, 255);

        //mp.game.graphics.drawText(
        //    this.textDisplayValue,
        //    [this.inputBoxPosition.X, this.useAsterisk ? this.inputBoxPosition.Y - (textOffset * 1.35) : this.inputBoxPosition.Y - textOffset], {
        //        font: 4,
        //        color: [255, 255, 255, 255],
        //        scale: [this.textSize.X, this.textSize.Y],
        //        outline: true,
        //        centre: true
        //    }
        //);
        // End of Input

        // Main Background
        mp.game.graphics.drawRect(this.position.X, this.position.Y, this.size.X, this.size.Y, 185, 185, 185, 175);
    }
}

mp.events.add("click", (x, y, upOrDown, leftOrRight) => {
    if (keyPadObj == null)
        return;
    // Left mouse click down
    if (leftOrRight == "left" && upOrDown == "down") {
        if (keyPadObj.currentButton !== null && keyPadObj.text !== null)
        {
            mp.game.audio.playSoundFrontend(-1, "PIN_BUTTON", "ATM_SOUNDS", true);

            if (keyPadObj.currentButton.text === "Delete") {
                if (keyPadObj.textValue.length > 0) {
                    keyPadObj.textValue = keyPadObj.textValue.slice(0, keyPadObj.textValue.length - 1)
                    if (keyPadObj.textDisplayValue.length > 0)
                        keyPadObj.textDisplayValue = keyPadObj.textDisplayValue.slice(0, keyPadObj.textDisplayValue.length - 1)
                }
            }
            else if (keyPadObj.currentButton.text === "Confirm") {
                // Handle confirm logic here
                mp.events.callRemote("sendKeypadValue", keyPadObj.textValue);
                CleanUp();
            } else if (keyPadObj.textValue.length < keyPadObj.maxTextLength) {
                keyPadObj.textValue = keyPadObj.textValue.concat(keyPadObj.currentButton.text);
                keyPadObj.textDisplayValue = keyPadObj.useAsterisk ? keyPadObj.textDisplayValue.concat("*") : keyPadObj.textValue;
            }
        }
    } else if (leftOrRight === "right" && upOrDown === "down") {
        CleanUp();
        return;
    }
});

function CleanUp() {
    if (keyPadObj === null || buttons === null)
        return;

    keyPadObj.shouldDraw = false;
    keyPadObj = null;

    if (buttons.length > 0) {
        for (i = 0; i < buttons.length; i++) {
            buttons[i].shouldDraw = false;
            buttons[i] = null;
        }
        buttons = [];
    }

    mp.gui.cursor.show(false, false);
}

function CTRLPush() {
    CleanUp();
}

class Vector2 {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}

}