{
﻿const Use3d = true;
const UseAutoVolume = false;
const MaxRange = 10.0;

const enableMicrophone = () => {
    if (global.chatActive || !global.loggedin) return;

    if (localplayer.getVariable('voice.muted') == true) return;
    if (mp.voiceChat.muted) {
        mp.voiceChat.muted = false;
        mp.gui.execute(`HUD.mic=${true}`);
		localplayer.playFacialAnim("mic_chatter", "mp_facial");
    }
}

const disableMicrophone = () => {
    if (!global.loggedin) return;
    if (!mp.voiceChat.muted) {
        mp.voiceChat.muted = true;
        mp.gui.execute(`HUD.mic=${false}`);
		localplayer.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
    }
}

mp.keys.bind(global.Keys.VK_F3, false, function () {
    try {
        mp.voiceChat.cleanupAndReload(false, false, true);
    } catch { }

    try {
        mp.voiceChat.cleanupAndReload(true, true, true);
    } catch { }
    try {
        mp.voiceChat.cleanupAndReload(true, false, false);
    } catch { }
    mp.events.call('notify', 2, 9, global.GetText("Голосовой чат перезагружен"), 3000);
});
mp.keys.bind(Keys.VK_B, true, enableMicrophone);
mp.keys.bind(Keys.VK_B, false, disableMicrophone);

let g_voiceMgr =
    {
        listeners: [],

        add: function (player, notify) {
            if (this.listeners.indexOf(player) === -1) {
				if (notify) Nexus.callRemote("add_voice_listener", player);
				this.listeners.push(player);
				player.voice3d = true;
				player.voiceVolume = 0.0;
				player.isListening = true;
			}
        },

        remove: function (player, notify) {
            let idx = this.listeners.indexOf(player);
            if (idx !== -1) {
				if (notify) Nexus.callRemote("remove_voice_listener", player);
				this.listeners.splice(idx, 1);
				player.isListening = false;
			}
        }
    };

mp.events.add("playerQuit", (player) => {
    if (player.isListening) g_voiceMgr.remove(player, false);
});

var PHONE = {
    target: null,
    status: false
};
mp.events.add('voice.phoneCall', (target) => {
    if (!PHONE.target) {
        PHONE.target = target;
        PHONE.status = true;
        Nexus.callRemote("add_voice_listener", target);
        target.voiceVolume = 1.0;
        target.voice3d = false;
        g_voiceMgr.remove(target, false);
    }
});
mp.events.add("voice.phoneStop", () => {
    if (PHONE.target) {
        if (mp.players.exists(PHONE.target)) {
            let localPos = localplayer.position;
            const playerPos = PHONE.target.position;
            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
            if (dist > MaxRange) Nexus.callRemote("remove_voice_listener", PHONE.target);
            else g_voiceMgr.add(PHONE.target, false);
        } else Nexus.callRemote("remove_voice_listener", PHONE.target);
        PHONE.target = null;
        PHONE.status = false;
    }
});
mp.events.add('voice.mute', () => {
    disableMicrophone();
})
mp.events.add('playerStartTalking', (player) => {
    if (PHONE.target != player) player.voice3d = true;
	player.playFacialAnim("mic_chatter", "mp_facial");
    
});

mp.events.add('playerStopTalking', (player) => {
	player.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});
var localPos = global.localplayer.position;
var playerPos = global.localplayer.position;
setInterval(() => {
    localPos = global.localplayer.position;

    mp.players.forEachInStreamRange(player => {		
        if (player != global.localplayer) {			
            if (!player.isListening) {
                playerPos = player.position;
                if (mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z) <= MaxRange)
				{
					g_voiceMgr.add(player, true);
				}
            }
        }
    });

    g_voiceMgr.listeners.forEach((player) => {
        if (player.handle !== 0) {
            playerPos = player.position;
            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

            if (dist > MaxRange) g_voiceMgr.remove(player, true);
            else if (!UseAutoVolume) player.voiceVolume = 1 - (dist / MaxRange);
        }
        else g_voiceMgr.remove(player, true);
    });
}, 350);
}