{
﻿var date;
const localPlayer = mp.players.local;

const pattern = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
var currentPatternIndex = 0;
var patternUpdateRunning = false;

var sirensToRender = [];
const sirenLightRefreshRate = 90; // in milliseconds
const sirenRenderDistance = 300;

var soundPlayer = null;
var soundCount = 0;
var isSoundPlaying = false;
var currentSirenVolume = 0;
const maxSoundDistance = 500;
const soundDistanceModifierUpdateTime = 100; // in milliseconds
const soundDivider = 20;
const maxSirenVolume = 1 / soundDivider;

var sirenLight = {

    red: { r: 255, g: 0, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    range: 0.1,
    shadow: 1,

    redIntensity: 20000.0,
    blueIntensity: 20000.0,
    ambientSideIntensity: 5.0,
    ambientFrontRearIntensity: 2.5,
    blueMultiplier: 2.0,

    dayHour: 4,
    nightHour: 18,

    dayRedIntensity: 20000.0,
    dayBlueIntensity: 20000.0,
    dayAmbientSideIntensity: 5.0,
    dayAmbientFrontRearIntensity: 2.5,

    nightRedIntensity: 1500.0,
    nightBlueIntensity: 1500.0,
    nightAmbientSideIntensity: 0.25,
    nightAmbientFrontRearIntensity: 0.1
};

mp.events.add('render', () => {

    if (!patternUpdateRunning) {

        patternUpdateRunning = true;
        setInterval(function () {

            if (currentPatternIndex + 4 <= pattern.length - 4)
                currentPatternIndex += 4;
            else
                currentPatternIndex = 0;

        }, sirenLightRefreshRate);

        ChangeLightIntensity();
        setInterval(ChangeLightIntensity, 1000 * 60 * 10); // every 10 minutes

        //soundPlayer = mp.browsers.new("package://gtalife/siren/index.html");
        //setInterval(ChangeVolume, soundDistanceModifierUpdateTime);
    }

    /*soundCount = sirensToRender.filter(veh => veh.sound == true).length;
    if (soundCount == 0 && isSoundPlaying == true) {

        isSoundPlaying = false;
        soundPlayer.execute(`StopSound()`);
    }*/

    let minOffset = 9999;
    sirensToRender.forEach(function (siren) {

        let veh = siren.entity;

        if (!mp.vehicles.exists(veh)) {

            RemoveElementFromArray(sirensToRender, veh);
            return;
        }

        if (siren.sound == true) {

            let offset = GetOffsetFromObject(veh);

            if (offset < minOffset)
                minOffset = offset;
        }

        if (veh.hasVariable("custom_siren_type")) {

            let sirenType = veh.getVariable("custom_siren_type");

            switch (sirenType) {

                case 1:
                    DrawSirenOne(veh);
                    break;
                default:
                    RemoveElementFromArray(sirensToRender, veh);
                    return;
            }
        }
        else {

            RemoveElementFromArray(sirensToRender, veh);
            return;
        }
    });

    if (sirensToRender.length > 0) {

        if (minOffset >= maxSoundDistance)
            currentSirenVolume = 0;
        else if (minOffset <= 5)
            currentSirenVolume = maxSirenVolume;
        else
            currentSirenVolume = CalculateAudioVolumeFromOffset(minOffset);
    }
    else
        currentSirenVolume = 0;

    /*if (soundCount > 0 && soundPlayer != null && isSoundPlaying == false && currentSirenVolume > 0) {

        isSoundPlaying = true;
        soundPlayer.execute(`StartSound(${currentSirenVolume})`);
    }*/
});

function DrawSirenOne(veh) {

    let offset = GetOffsetFromObject(veh);
    if (offset > sirenRenderDistance)
        return;

    // Main Lights (Car)
    let dashOneRed = veh.getOffsetFromInWorldCoords(-0.4, 0.875, 0.5875);
    let dashTwoRed = veh.getOffsetFromInWorldCoords(-0.2, 0.9, 0.59);
    let dashThreeBlue = veh.getOffsetFromInWorldCoords(0.2, 0.9, 0.59);
    let dashFourBlue = veh.getOffsetFromInWorldCoords(0.4, 0.875, 0.5875);

    let dashTopRed = veh.getOffsetFromInWorldCoords(-0.1, 0.4, 0.75);
    let dashTopBlue = veh.getOffsetFromInWorldCoords(0.1, 0.4, 0.75);

    let grilleOneRed = veh.getOffsetFromInWorldCoords(-0.225, 2.375, 0.1);
    let grilleTwoBlue = veh.getOffsetFromInWorldCoords(0.225, 2.375, 0.1);

    let rearOneRed = veh.getOffsetFromInWorldCoords(-0.4, -1.95, 0.6);
    let rearTwoRed = veh.getOffsetFromInWorldCoords(-0.2, -1.975, 0.6);
    let rearThreeBlue = veh.getOffsetFromInWorldCoords(0.2, -1.975, 0.6);
    let rearFourBlue = veh.getOffsetFromInWorldCoords(0.4, -1.95, 0.6);

    let rearTopRed = veh.getOffsetFromInWorldCoords(-0.1, -1.6, 0.75);
    let rearTopBlue = veh.getOffsetFromInWorldCoords(0.1, -1.6, 0.75);

    let tailOneRed = veh.getOffsetFromInWorldCoords(-0.25, -2.65, 0.275);
    let tailTwoBlue = veh.getOffsetFromInWorldCoords(0.25, -2.65, 0.275);

    // Ambient Lights (Outside)
    let ambientLeftOne = veh.getOffsetFromInWorldCoords(-2.5, 1, 0.5);
    let ambientRightOne = veh.getOffsetFromInWorldCoords(2.5, 1, 0.5);
    let ambientLeftTwo = veh.getOffsetFromInWorldCoords(-2.5, -2, 0.5);
    let ambientRightTwo = veh.getOffsetFromInWorldCoords(2.5, -2, 0.5);

    let ambientGrilleOne = veh.getOffsetFromInWorldCoords(-0.75, 4, 0.5);
    let ambientGrilleTwo = veh.getOffsetFromInWorldCoords(0.75, 4, 0.5);

    let ambientTailOne = veh.getOffsetFromInWorldCoords(-0.75, -4.25, 0.5);
    let ambientTailTwo = veh.getOffsetFromInWorldCoords(0.75, -4.25, 0.5);

    // Play Pattern
    let dashOneRedOn = pattern[currentPatternIndex];
    let dashTwoRedOn = pattern[currentPatternIndex + 1];
    let dashThreeBlueOn = pattern[currentPatternIndex + 2];
    let dashFourBlueOn = pattern[currentPatternIndex + 3];

    //veh.setLights(1);
    //veh.setBrakeLights(false);
    //veh.setIndicatorLights(1, false);
    //veh.setIndicatorLights(0, false);

    if (dashOneRedOn == 1) {

        // Main Lights (Inside Car)
        mp.game.graphics.drawLightWithRangeAndShadow(dashOneRed.x, dashOneRed.y, dashOneRed.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, sirenLight.range, sirenLight.redIntensity, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(rearFourBlue.x, rearFourBlue.y, rearFourBlue.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, sirenLight.range, sirenLight.blueIntensity * sirenLight.blueMultiplier, sirenLight.shadow);

        mp.game.graphics.drawLightWithRangeAndShadow(dashTopBlue.x, dashTopBlue.y, dashTopBlue.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, sirenLight.range, sirenLight.blueIntensity * sirenLight.blueMultiplier, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(grilleTwoBlue.x, grilleTwoBlue.y, grilleTwoBlue.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, sirenLight.range, sirenLight.blueIntensity * sirenLight.blueMultiplier, sirenLight.shadow);

        mp.game.graphics.drawLightWithRangeAndShadow(rearTopRed.x, rearTopRed.y, rearTopRed.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, sirenLight.range, sirenLight.redIntensity, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(tailOneRed.x, tailOneRed.y, tailOneRed.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, 0.075, sirenLight.redIntensity, sirenLight.shadow);

        // Ambient Lights (Outside Car)
        mp.game.graphics.drawLightWithRangeAndShadow(ambientLeftOne.x, ambientLeftOne.y, ambientLeftOne.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, 3, sirenLight.ambientSideIntensity, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(ambientRightTwo.x, ambientRightTwo.y, ambientRightTwo.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, 3, sirenLight.ambientSideIntensity * sirenLight.blueMultiplier, sirenLight.shadow);

        mp.game.graphics.drawLightWithRangeAndShadow(ambientGrilleTwo.x, ambientGrilleTwo.y, ambientGrilleTwo.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, 2, sirenLight.ambientFrontRearIntensity * sirenLight.blueMultiplier, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(ambientTailOne.x, ambientTailOne.y, ambientTailOne.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, 2, sirenLight.ambientFrontRearIntensity, sirenLight.shadow);

        //veh.setLights(2);
        //veh.setBrakeLights(true);
        //veh.setIndicatorLights(1, true);
        //veh.setIndicatorLights(0, true);
    }
    if (dashTwoRedOn == 1) {

        mp.game.graphics.drawLightWithRangeAndShadow(dashTwoRed.x, dashTwoRed.y, dashTwoRed.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, sirenLight.range, sirenLight.redIntensity, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(rearThreeBlue.x, rearThreeBlue.y, rearThreeBlue.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, sirenLight.range, sirenLight.blueIntensity * sirenLight.blueMultiplier, sirenLight.shadow);
    }
    if (dashThreeBlueOn == 1) {

        mp.game.graphics.drawLightWithRangeAndShadow(dashThreeBlue.x, dashThreeBlue.y, dashThreeBlue.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, sirenLight.range, sirenLight.blueIntensity * sirenLight.blueMultiplier, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(rearTwoRed.x, rearTwoRed.y, rearTwoRed.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, sirenLight.range, sirenLight.redIntensity, sirenLight.shadow);
    }
    if (dashFourBlueOn == 1) {

        // Main Lights (Inside Car)
        mp.game.graphics.drawLightWithRangeAndShadow(dashFourBlue.x, dashFourBlue.y, dashFourBlue.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, sirenLight.range, sirenLight.blueIntensity * sirenLight.blueMultiplier, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(rearOneRed.x, rearOneRed.y, rearOneRed.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, sirenLight.range, sirenLight.redIntensity, sirenLight.shadow);

        mp.game.graphics.drawLightWithRangeAndShadow(dashTopRed.x, dashTopRed.y, dashTopRed.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, sirenLight.range, sirenLight.redIntensity, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(grilleOneRed.x, grilleOneRed.y, grilleOneRed.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, sirenLight.range, sirenLight.redIntensity, sirenLight.shadow);

        mp.game.graphics.drawLightWithRangeAndShadow(rearTopBlue.x, rearTopBlue.y, rearTopBlue.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, sirenLight.range, sirenLight.blueIntensity * sirenLight.blueMultiplier, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(tailTwoBlue.x, tailTwoBlue.y, tailTwoBlue.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, 0.075, sirenLight.blueIntensity * sirenLight.blueMultiplier, sirenLight.shadow);

        // Ambient Lights (Outside Car)
        mp.game.graphics.drawLightWithRangeAndShadow(ambientRightOne.x, ambientRightOne.y, ambientRightOne.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, 3, sirenLight.ambientSideIntensity * sirenLight.blueMultiplier, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(ambientLeftTwo.x, ambientLeftTwo.y, ambientLeftTwo.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, 3, sirenLight.ambientSideIntensity, sirenLight.shadow);

        mp.game.graphics.drawLightWithRangeAndShadow(ambientGrilleOne.x, ambientGrilleOne.y, ambientGrilleOne.z, sirenLight.red.r, sirenLight.red.g, sirenLight.red.b, 2, sirenLight.ambientFrontRearIntensity, sirenLight.shadow);
        mp.game.graphics.drawLightWithRangeAndShadow(ambientTailTwo.x, ambientTailTwo.y, ambientTailTwo.z, sirenLight.blue.r, sirenLight.blue.g, sirenLight.blue.b, 2, sirenLight.ambientFrontRearIntensity * sirenLight.blueMultiplier, sirenLight.shadow);
    }
}

mp.events.add('entityStreamIn', (entity) => {
    try{
        if (entity == null) return 
        if (typeof entity === "undefined") return 

        if (entity.type === "vehicle") {
        

        if (entity.hasVariable("custom_siren") && entity.getVariable("custom_siren") == true && sirensToRender.findIndex(veh => veh.entity === entity) == -1) {
            if(DebugValues)
                mp.gui.chat.push("[DEBUG] siren.js");
            setTimeout(() => {
                AddElementToArray(sirensToRender, entity);}, 0);
            }
            if(DebugValues)
                mp.gui.chat.push("[DEBUG] siren.js- END");
        }
    } catch(e){

    }
});

mp.events.addDataHandler("custom_siren", (entity, value) => {

    if (entity.type === "vehicle") {

        if (value && sirensToRender.findIndex(veh => veh.entity === entity) == -1) {

            AddElementToArray(sirensToRender, entity);
        }
        else if (!value && sirensToRender.findIndex(veh => veh.entity === entity) > -1) {

            RemoveElementFromArray(sirensToRender, entity);
        }
    }
});

mp.events.addDataHandler("custom_siren_sound", (entity, value) => {

    if (entity.type === "vehicle") {

        if (sirensToRender.findIndex(veh => veh.entity === entity) > -1) {

            sirensToRender.find(veh => veh.entity === entity).sound = value;
        }
    }
});

mp.events.add('entityStreamOut', (entity) => {
    try{
        if (entity == null) return 
        if (typeof entity === "undefined") return 
        
        if (entity.type === "vehicle") {
            if(DebugValues)
                mp.gui.chat.push("[DEBUG] Siren out.js");

            if (sirensToRender.findIndex(veh => veh.entity === entity) > -1) {
    setTimeout(() => {
                RemoveElementFromArray(sirensToRender, entity);}, 0);
            }
        }
    } catch(e){

    }
});

function GetOffsetFromObject(object) {

    let playerPos = localPlayer.position;
    let objectPos = object.position;

    let xOffset = (playerPos.x - objectPos.x < 0) ? -(playerPos.x - objectPos.x) : (playerPos.x - objectPos.x);
    let yOffset = (playerPos.y - objectPos.y < 0) ? -(playerPos.y - objectPos.y) : (playerPos.y - objectPos.y);
    let zOffset = (playerPos.z - objectPos.z < 0) ? -(playerPos.z - objectPos.z) : (playerPos.z - objectPos.z);

    return (xOffset + yOffset + zOffset);
}

function ChangeVolume() {

    if (soundPlayer == null)
        return;

    soundPlayer.execute(`ChangeSirenSoundVolume(${currentSirenVolume})`);
}

function CalculateAudioVolumeFromOffset(offset) {

    let vol = (100 - (100 * offset / maxSoundDistance)) / 100;

    return parseFloat(vol / soundDivider).toFixed(3);
}

function AddElementToArray(array, element) {

    let hasSound = true;

    if (element.hasVariable("custom_siren_sound"))
        hasSound = element.getVariable("custom_siren_sound");

    let offset = GetOffsetFromObject(element);

    if (soundPlayer != null && offset < maxSoundDistance && isSoundPlaying == false && hasSound == true) {

        let vol = CalculateAudioVolumeFromOffset(offset);

        isSoundPlaying = true;
        soundPlayer.execute(`StartSound(${vol})`);
    }

    array.push({ entity: element, sound: hasSound });
}

function RemoveElementFromArray(array, element) {

    let index = array.findIndex(veh => veh.entity === element);

    if (index < 0)
        return;

    if (sirensToRender.length <= 1 && soundPlayer != null) {

        isSoundPlaying = false;
        soundPlayer.execute(`StopSound()`);
    }

    array.splice(index, 1);
}

function ChangeLightIntensity() {

    date = new Date();
    let currentHours = date.getUTCHours();

    if (currentHours >= sirenLight.dayHour && currentHours < sirenLight.nightHour) {

        sirenLight.redIntensity = sirenLight.dayRedIntensity;
        sirenLight.blueIntensity = sirenLight.dayBlueIntensity;

        sirenLight.ambientSideIntensity = sirenLight.dayAmbientSideIntensity;
        sirenLight.ambientFrontRearIntensity = sirenLight.dayAmbientFrontRearIntensity;
    }
    else {

        sirenLight.redIntensity = sirenLight.nightRedIntensity;
        sirenLight.blueIntensity = sirenLight.nightBlueIntensity;

        sirenLight.ambientSideIntensity = sirenLight.nightAmbientSideIntensity;
        sirenLight.ambientFrontRearIntensity = sirenLight.nightAmbientFrontRearIntensity;
    }
}

}ɴ