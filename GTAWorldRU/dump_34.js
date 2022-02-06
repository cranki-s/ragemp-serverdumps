{
﻿var lightInterval = null;
var soundID = null;
const getSoundIDNative = "0x430386FE9BF80B45";
var lightPos = null;
var drawLight = false;

mp.events.add("startPropertyAlarm", (_lightPos) => {
    if (_lightPos !== null) {
        lightPos = _lightPos;
        lightInterval = setInterval(function () {
            drawLight = !drawLight;
        }, 180);
    }

    //mp.game.audio.requestAmbientAudioBank("DLC_CHRISTMAS2017/XM_FARM", true);
    mp.game.audio.requestAmbientAudioBank("ALARM_BELL_02", true);

    setTimeout(() => {
        if (soundID !== null && soundID > -1) {
            if (mp.game.audio.hasSoundFinished(soundID)) {
                mp.game.audio.stopSound(soundID);
                mp.game.audio.releaseSoundId(soundID);
                soundID = mp.game.invoke(getSoundIDNative);
                //mp.game.audio.playSoundFrontend(soundID, "alarm_loop", "dlc_xm_farm_sounds", true);
                mp.game.audio.playSoundFrontend(soundID, "Bell_02", "ALARMS_SOUNDSET", true);
            }
        }
        else {
            soundID = mp.game.invoke(getSoundIDNative);
            //mp.game.audio.playSoundFrontend(soundID, "alarm_loop", "dlc_xm_farm_sounds", true);
            mp.game.audio.playSoundFrontend(soundID, "Bell_02", "ALARMS_SOUNDSET", true);
        }
    }, 750);
});

mp.events.add("stopPropertyAlarm", () => {
    lightPos = null;

    if (soundID !== null && soundID > -1) {
        mp.game.audio.stopSound(soundID);
        mp.game.audio.releaseSoundId(soundID);
        mp.game.audio.releaseNamedScriptAudioBank("ALARM_BELL_02");
        soundID = null;
    }

    if (lightInterval !== null)
        clearTimeout(lightInterval);
    lightInterval = null;
});

mp.events.add('render', () => {                                                                              
    if (lightPos !== null && drawLight)
        mp.game.graphics.drawLightWithRangeAndShadow(lightPos.x, lightPos.y, lightPos.z + 0.85, 255, 0, 0, 1.0, 1450, 1);
});
}