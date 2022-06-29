{
/** Implements player voice controlling and visual details */

mp.voiceChat.muted = true;

let voiceMuted = false;
let talkKeyDown = false;
let switchKeyDown = false;
let talkModes = [{icon:"low", name:"susurro", color:"c"},{icon:"shout",name:"gritar", color:"m"},{icon:"normal",name:"normal", color:"q"}];
let talkModeIndex = 0;
let voiceEnabled = false;
let voiceVolumeConfig = (mp.game.invoke("0xC488FF2356EA7791", 722) / 10); // GET_PROFILE_SETTING (Voice volume, return int 0 to 10)
let voiceVolumeMin = 0.8;

// events from the backend
mp.rpc("player:voice_range", (playerId, range) => {
    let p = mp.players.atRemoteId(playerId);
    if (!p) return;
    p.voiceRange = range;
});

mp.rpc("player:talk_modes", (modesJson) => {
    talkModes = JSON.parse(modesJson);
    if (talkModes.length === 0) {
        talkModeIndex = 0;
    } else {
        talkModeIndex = talkModeIndex % talkModes.length;
    }
});

mp.rpc("player:talk_mode", (modeJson) => {
    let mode = JSON.parse(modeJson);
    for (let i = 0; i < talkModes.length; i++) {
        if (talkModes[i].name === mode.name) {
            setTalkMode(i);
            return;
        }
    }
});

mp.rpc("player:set_voice_mode", (id, mode) => {
    let p = mp.players.atRemoteId(id);
    if (!p) return;
    p.voiceMode = mode;
});

mp.rpc("player:is_talking", (playerId, isTalking) => {
    let p = mp.players.atRemoteId(playerId);
    if (!p || p.handle === 0) return;
    p.isTalking = isTalking;
    if (isTalking) {
        p.playFacialAnim("mic_chatter", "mp_facial");
    } else {
        p.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
    }
});

mp.rpc("player:voice_muted", (muted) => {
    voiceMuted = muted;
});

function getListenerPosition() {
    // camera version: mp.playerCamera.getActiveCamera().getCoord()
    return mp.players.local.position;
}

/** This draws the mic on the head of people talking */
mp.events.add('render', () => {
    mp.game.ui.hideHudComponentThisFrame(7); // area name
    mp.game.ui.hideHudComponentThisFrame(9); // street name
    mp.game.ui.hideHudComponentThisFrame(6); // vehicle name
    mp.game.ui.hideHudComponentThisFrame(8); // vehicle class

    const localPos = getListenerPosition();

    // draw mic on head
    mp.players.forEachInStreamRange(player => {
        if(player.handle &&
            player.voiceRange > 0.1 &&
            player.voiceMode !== 'RADIO' &&
            player.isTalking
        ) {
            let pos = player.position;
            let distQuad = mp.game.system.vdist2(localPos.x, localPos.y, localPos.z, pos.x, pos.y, pos.z);
            let shouldHear = distQuad < (player.voiceRange * player.voiceRange);

            if (!shouldHear) return player.voiceVolume = 0;

            const headPos = player.getBoneCoords(12844, 0, 0, 0);
            const screenPos = mp.game.graphics.world3dToScreen2d(headPos.x, headPos.y, headPos.z + 0.4);
            if (screenPos) { // sometimes null, idk why
                let visible = mp.raycasting.testPointToPoint(localPos, pos, null, 17) === undefined;
                if (visible) { // check for line-of-sigh
                    mp.game.graphics.drawSprite(
                        "mpleaderboard", "leaderboard_audio_3",
                        screenPos.x, screenPos.y,
                        0.023, 0.023*1.5,
                        0, 255, 255, 255, 255
                    );
                }
            }
        }
    });

    // enable/disable local voice
    let keyDown = mp.game.controls.isControlPressed(0, 249); // INPUT_PUSH_TO_TALK
    switchKeyDown = mp.game.controls.isControlPressed(0, 19); // LEFT ALT
    if (keyDown !== talkKeyDown && !switchKeyDown) {
        talkKeyDown = keyDown;
        onTalkKey(keyDown);
    }

    // change mode voice local voice
    let pushToTalk = mp.game.controls.isControlJustPressed(0, 249); // INPUT_PUSH_TO_TALK
    if (switchKeyDown && pushToTalk && !mp.gui.cursor.visible) {
        switchTalkMode();
    }
});

// key detect - if they want to switch talk mode (fast press) or talk (holding)

function onTalkKey(toggle) {
    if (toggle) {
        setTimeout(() => {
            if (talkKeyDown) { // still pressing
                setVoiceEnabled(true);
            }
        }, 70);
    } else {
        if (voiceEnabled) { // actually speaking, stop
            setVoiceEnabled(false);
        } else {
            if (!mp.gui.cursor.visible) {
                switchTalkMode();
            }
        }
    }
}

function setTalkMode(index) {
    talkModeIndex = index;
    let mic = getMic(talkModes[talkModeIndex].icon)
    mp.events.call("hud:talk_mode", talkModes[talkModeIndex].icon, talkModes[talkModeIndex].name);
    mp.events.call("hud:short_info", `~${mic.color}~ ~${mic.icon}~ ${talkModes[talkModeIndex].name}`, 500)
    mp.events.callRemote("player:on_switch_talk_mode", talkModes[talkModeIndex].name);
}

function switchTalkMode() {
    if (talkModes.length === 0) return;
    setTalkMode((talkModeIndex+1) % talkModes.length);
}

mp.rpc("player_voice:toggle", () => {
    setVoiceEnabled(!voiceEnabled)
})

function setVoiceEnabled(enabled) {
    if (voiceEnabled === enabled) return;

    mp.voiceChat.muted = !enabled;
    mp.events.callRemote("player:on_toggle_voice", enabled);
    mp.events.call("hud:is_talking", enabled);
    voiceEnabled = enabled;
}

function getMic(icon) {
    switch (icon.toLowerCase()) {
        case "low": return {icon:"icon_microphone-alt", color: "c"}
        case "shout": return {icon:"icon_bullhorn", color:"c"}
        case "normal": return {icon:"icon_microphone", color:"c"}
        case "radio": return {icon:"icon_rss-square", color:"c"}
        default: return {icon:"icon_microphone", color:"c"}
    }
}

mp.game.graphics.requestStreamedTextureDict("mpleaderboard", true); // voice icon

mp.events.add("entityStreamIn", (entity) => {
    if (mp.players.exists(entity) && entity.handle && entity.type === "player") {
        // mute players as soon as they stream
        entity.voiceVolume = 0.0;
        entity.voiceAutoVolume = false;
    }
});

/** This timer updates the volume of players depending on the distance. */
mp.setInterval(() => {
    const localPos = getListenerPosition();

    mp.players.forEachInStreamRange(player => {
        if (mp.players.exists(player) && player.handle && player.voiceRange > 0.1) {

            // if using radio, voice volume is always 1
            if (player.voiceMode === "RADIO") {
                player.voiceVolume = Math.max(voiceVolumeMin, voiceVolumeConfig);
                player.voice3d = false;
            } else {
                const playerPos = player.position;
                let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
                let finalVolume = Math.max(voiceVolumeMin, voiceVolumeConfig) - (dist / player.voiceRange);
                if (finalVolume > 1) finalVolume = 1;
                if (finalVolume < 0) finalVolume = 0;
                player.voiceVolume = finalVolume;
                player.voice3d = true;
            }
        }
    });
}, 150);


mp.keys.bind(0x71, true, () => {
    mp.voiceChat.cleanupAndReload(true,true,true);
    mp.game.graphics.notify('Voz recargada');
});

// Update voice volume when player close pause menu
mp.keys.bind(0x1B, false, function() {
    setTimeout( () => {
        if (!mp.game.ui.isPauseMenuActive()) {
            voiceVolumeConfig = (mp.game.invoke("0xC488FF2356EA7791", 722) / 10);
        }
    }, 200)
});

// to reload voice: mp.voiceChat.cleanupAndReload(true,true,true);

}