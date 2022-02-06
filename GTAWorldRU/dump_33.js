{
﻿/* Settings */
const textureDictionary = "mpsafecracking";
const rotateSpeed = 1.75;
const getSoundIDNative = "0x430386FE9BF80B45";
const aspect = mp.game.graphics.getScreenAspectRatio(true);

/* Variables */
var isCracking = false;
var soundID = null;
var isMoving = false;
var directionToMove = 0;    /* 0: Clockwise | 1: Anticlockwise */
var directionMoving = -1;   /* 0: Closewise | 1: Anticlockwise | -1: Not moved yet */
var debug = false;

const textures = {
    DIAL:               "dial",
    DIAL_BACKGROUND:    "dial_bg",
    LOCK_OPEN:          "lock_open",
    LOCK_CLOSED:        "lock_closed"
};
const map = { X: 0.50, Y: 0.50, };
var currentX = map.X;
var currentY = map.Y;
var dialHeading = 0;
var currentPin = 0;
const sensitivity = 6.5;
const degreesPerIndex = (360 / 100);
var timeOutID = null;
let pinData = null;
const color = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 255,
};
const startPinPosition = [0.4, 0.3, 0.2, 0.1];

mp.events.add("startSafeCracking", async (_pinData) => {
    if (!mp.game.graphics.hasStreamedTextureDictLoaded(textureDictionary)) {
        mp.game.graphics.requestStreamedTextureDict(textureDictionary, true);
        for (let i = 0;  !mp.game.graphics.hasStreamedTextureDictLoaded(textureDictionary) && i < 1500; i++) await mp.game.waitAsync(0);
    }

    pinData = null;
    pinData = JSON.parse(_pinData);
    mp.game.audio.requestAmbientAudioBank("SAFE_CRACK", true);
    mp.players.local.freezePosition(true);
    isCracking = true;
});

mp.events.add('render', () => {
    if (!isCracking)
        return;

    isMoving = false;

    handleMovement();
    drawSprites();
    handleTurnSound();
    checkPinState();

    if (debug) {
        mp.game.graphics.drawText("Dial value: " + getDialValue().toFixed(0), [0.5, 0.005], {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.45, 0.45],
            outline: true,
        });

        mp.game.graphics.drawText("isMoving value: " + isMoving, [0.5, 0.025], {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.45, 0.45],
            outline: true,
        });

        mp.game.graphics.drawText("directionMoving value: " + directionMoving, [0.5, 0.045], {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.45, 0.45],
            outline: true,
        });

        mp.game.graphics.drawText("directionToMove value: " + directionToMove, [0.5, 0.065], {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.45, 0.45],
            outline: true,
        });

        mp.game.graphics.drawText("currentPin: " + currentPin + " | value: " + pinData.PinValues[currentPin], [0.5, 0.085], {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.45, 0.45],
            outline: true,
        });
    }
});

/* Pin state in 'render' */
function checkPinState() {
    if (pinData.PinValues.length > currentPin) {
        var distance = getDistance(pinData.PinValues[currentPin]);
        if (isCloseToPin(distance)) {
            currentX = mp.game.gameplay.getRandomFloatInRange(map.X - getShakeValue(distance), map.Y + getShakeValue(distance));
            currentY = mp.game.gameplay.getRandomFloatInRange(map.X - getShakeValue(distance), map.Y + getShakeValue(distance));

            if (distance <= 1) {
                if (timeOutID === null) {
                    timeOutID = setTimeout(() => {
                        unlockedPin(currentPin);
                    }, 1000);
                }
            }
        } else {
            currentX = map.X;
            currentY = map.Y;
        }
    }
}

/* Sound playing in 'render' */
function handleTurnSound() {
    if (isMoving) {
        if (soundID !== null && soundID > -1) {
            if (mp.game.audio.hasSoundFinished(soundID)) {
                mp.game.audio.stopSound(soundID);
                mp.game.audio.releaseSoundId(soundID);
                soundID = mp.game.invoke(getSoundIDNative);
                mp.game.audio.playSoundFrontend(soundID, "TUMBLER_TURN", "SAFE_CRACK_SOUNDSET", true);
            }
        }
        else {
            soundID = mp.game.invoke(getSoundIDNative);
            mp.game.audio.playSoundFrontend(soundID, "TUMBLER_TURN", "SAFE_CRACK_SOUNDSET", true);
        }
    } else {
        if (soundID !== null && soundID > -1) {
            mp.game.audio.stopSound(soundID);
            mp.game.audio.releaseSoundId(soundID);
            soundID = null;
        }
    } 
}

/* Sprite drawing in 'render' */
function drawSprites() {
    if (mp.game.graphics.hasStreamedTextureDictLoaded(textureDictionary)) {
        /* Dial background */
        mp.game.graphics.drawSprite(textureDictionary, textures.DIAL_BACKGROUND,
            currentX, currentY,                                 /* Position   */
            0.298, 0.5325,                                      /* Size X,Y   */
            0,                                                  /* Heading    */
            color.red, color.green, color.blue, color.alpha);   /* Color RGBA */

        /* Dial */
        mp.game.graphics.drawSprite(textureDictionary, textures.DIAL,
            currentX, currentY,                                 /* Position   */
            0.15, 0.27,                                         /* Size X,Y   */
            dialHeading,                                        /* Heading    */
            color.red, color.green, color.blue, color.alpha);   /* Color RGBA */

        /* Locks */
        for (let i = 0; i < pinData.PinStates.length; i++) {
            mp.game.graphics.drawSprite(textureDictionary, pinData.PinStates[i] ? textures.LOCK_OPEN : textures.LOCK_CLOSED,
                getXPositionForLock(pinData.PinStates.length, i), map.Y + 0.25,                 /* Position   */
                0.06, (0.3 * aspect) * 0.2,                                                     /* Size X,Y   */
                0,                                                                              /* Heading    */
                color.red, color.green, color.blue, color.alpha);                               /* Color RGBA */
        }
    }
}

/* Movement in 'render' */
function handleMovement() {
    /* 'A' */
    if (mp.game.controls.isControlPressed(0, 34)) {
        dialHeading -= rotateSpeed;
        isMoving = true;
        directionMoving = 0;

        if (timeOutID !== null && timeOutID > 0) {
            if (directionToMove !== directionMoving) {
                resetSafeCracking();
                return;
            }
        }

        if (dialHeading < 0)
            dialHeading = 359;
    }
    /* 'D' */
    else if (mp.game.controls.isControlPressed(0, 35)) {
        dialHeading += rotateSpeed;
        isMoving = true;
        directionMoving = 1;

        if (timeOutID !== null && timeOutID > 0) {
            if (directionToMove !== directionMoving) {
                resetSafeCracking();
                return;
            }
        }

        if (dialHeading > 359)
            dialHeading = 0;
    } 
}

function unlockedPin() {
    if (getDistance(pinData.PinValues[currentPin]) > 1) {
        cleanUpTimer();
        return;
    }

    if (directionToMove !== directionMoving) {
        // Reset safe cracking system as the player moved the wrong direction during the unlocking
        resetSafeCracking();
        return;
    }
    
    pinData.PinStates[currentPin] = true;
    currentPin++;
    switchDirection();
    mp.game.audio.playSoundFrontend(0, "TUMBLER_PIN_FALL", "SAFE_CRACK_SOUNDSET", true);
    if (currentPin >= pinData.PinValues.length) {
        setTimeout(function () {
            mp.game.audio.playSoundFrontend(0, "TUMBLER_PIN_FALL_FINAL", "SAFE_CRACK_SOUNDSET", true);
            mp.events.callRemote("safeCrackingResult", true);
            clearSafeCracking();
        }, 1000);
    }
    cleanUpTimer();
}

function cleanUpTimer() {
    if (timeOutID !== null)
        clearTimeout(timeOutID);
    timeOutID = null;
}

function isCloseToPin(distance) {
    return distance <= sensitivity;
}

function getDistance(pin) {
    return Math.abs(getDialValue() - pin);
}

function getDialValue() {
    var value = 0;
    value = Math.abs((dialHeading / degreesPerIndex) - 100);
    if (value >= 100)
        value = 0;
    return value;
}

function getShakeValue(distance) {
    if (sensitivity >= distance && distance > sensitivity - (sensitivity / 4))
        return 0.001;
    else if (sensitivity - (sensitivity / 4) >= distance && distance > sensitivity - (sensitivity / 3))
        return 0.0015;
    else if (sensitivity - (sensitivity / 3) >= distance && distance > sensitivity - (sensitivity / 1.5))
        return 0.0016;
    else if (sensitivity - (sensitivity / 1.5) >= distance && distance >= 0)
        return 0.0018;
}

function getXPositionForLock(pinAmount, index) {
    switch (pinAmount) {
        case 3:
            return startPinPosition[0] + (index / 10);
        case 5:
            return startPinPosition[1] + (index / 10);
        case 7:
            return startPinPosition[2] + (index / 10);
        case 9:
            return startPinPosition[3] + (index / 10);
        default:
            return 0.5;
    }
}

function switchDirection() {
    directionToMove = directionToMove > 0 ? 0 : 1; 
}

function resetSafeCracking() {
    if (mp.game.graphics.hasStreamedTextureDictLoaded(textureDictionary)) {
        mp.game.graphics.setStreamedTextureDictAsNoLongerNeeded(textureDictionary);
    }

    mp.gui.chat.push("You messed up unlocking this pin, and the safe has been reset!");
    mp.game.audio.playSoundFrontend(0, "TUMBLER_RESET", "SAFE_CRACK_SOUNDSET", true);
    cleanUpTimer();
    currentX = map.X;
    currentY = map.Y;
    dialHeading = 0;
    currentPin = 0;
    directionToMove = 0;
    directionMoving = -1;
    for (let i = 0; i < pinData.PinStates.length; i++) {
        pinData.PinStates[i] = false;
    }
}

function clearSafeCracking() {
    if (mp.game.graphics.hasStreamedTextureDictLoaded(textureDictionary)) {
        mp.game.graphics.setStreamedTextureDictAsNoLongerNeeded(textureDictionary);
    }

    mp.game.audio.releaseNamedScriptAudioBank("SAFE_CRACK");
    mp.players.local.freezePosition(false);
    isCracking = false;
    cleanUpTimer();
    currentX = map.X;
    currentY = map.Y;
    dialHeading = 0;
    pinData = null;
    currentPin = 0;
    directionToMove = 0;
    directionMoving = -1;
}

mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    if (leftOrRight === "right" && upOrDown === "down") {
        CloseUI();
        return;
    }
});

function CloseUI() {
    if (!isCracking)
        return;

    clearSafeCracking();
    mp.events.callRemote('safeCrackingResult', false);
}

}