{
﻿const Use3d 		= true;
const UseAutoVolume = false;
const MaxRange 		= 18.0;
const VoiceVol 		= 1.0;
const VoiceChatKey 	= 0x58; // X

var DoubleClickReload 	= 0;
var VoiceReloadDelay 	= 0;

mp.keys.bind(VoiceChatKey, false, function() {
    mp.voiceChat.muted = true;
	mp.gui.execute(`HUD.mic=${true}`);
    mp.events.call("hudSetMicActive", false);
    localplayer.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});

mp.keys.bind(0x72, true, function() {
    mp.voiceChat.cleanupAndReload(true, true, true);
    g_voiceMgr.listeners.forEach((player) => {
        g_voiceMgr.remove(player, true);
    });
    mp.game.graphics.notify('~s~Голосовой чат ~b~ был перезапущен!');
});

var ListMutePlayers = [];

mp.events.add('updateMUTE', (mutetext) => {
	ListMutePlayers = mutetext.split(' ');
    mp.game.graphics.notify('Список замученых игроков ~g~обновлён~w~!');	
	mp.events.callRemote('setmutelist', JSON.stringify(ListMutePlayers));	
});

mp.events.add('updateVOICE', () => {
   mp.voiceChat.cleanupAndReload(true, true, true);
    g_voiceMgr.listeners.forEach((player) => {
        g_voiceMgr.remove(player, true);
    });

    mp.game.graphics.notify('~s~Голосовой чат ~b~ был перезапущен!');
});
mp.keys.bind(VoiceChatKey, true, function() {
    if (global.walkieTalkie == null)
		if (mp.gui.cursor.visible != false && ENABLE_VOICE_WITH_CURSOR == false) 
			return;
	if (localplayer.getVariable('voice.muted') == true || localplayer.getVariable('InDeath') == true) return;
    mp.voiceChat.muted = false;
    mp.gui.execute(`HUD.mic=${false}`);
    mp.events.call("hudSetMicActive", true);
    localplayer.playFacialAnim("mic_chatter", "mp_facial");
});
setInterval(function() {
	if (localplayer.getVariable("muteTime") > 0)
		mp.events.callRemote("reduceMuteTime");
}, 15000);
let g_voiceMgr =
{
	listeners: [],
	add: function(player)
	{
		this.listeners.push(player);	
		player.isListening = true;		
		mp.events.callRemote("add_voice_listener", player);		
		if(UseAutoVolume)
			player.voiceAutoVolume = true;
		else
			player.voiceVolume = VoiceVol;		
		if(Use3d)
			player.voice3d = true;
	},
	
	remove: function(player, notify)
	{
		let idx = this.listeners.indexOf(player);	
		if(idx !== -1) this.listeners.splice(idx, 1);			
		player.isListening = false;			
		if(notify)
			mp.events.callRemote("remove_voice_listener", player);
	}
};

mp.events.add("playerQuit", (player) => {
	if(player.isListening)
		g_voiceMgr.remove(player, false);
});

setInterval(() => {
	let localPos = localplayer.position;	
	mp.players.forEachInStreamRange(player =>
	{
		if(player != localplayer && (!PHONE.target || PHONE.target != player))
		{
			if(!player.isListening)
			{
				const playerPos = player.position;		
				let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
				
				if(dist <= MaxRange)
				{
					g_voiceMgr.add(player);
				}
			}
		}
	});
	
	g_voiceMgr.listeners.forEach((player) =>
	{
		if(player.handle !== 0)
		{
			const playerPos = player.position;		
			let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
			
			if(dist > MaxRange)
			{
				g_voiceMgr.remove(player, true);
			}
			else if(!UseAutoVolume)
			{
				player.voiceVolume = (1 - (dist / MaxRange)) * VoiceVol;
			}
		}
		else
		{
			g_voiceMgr.remove(player, true);
		}
	});
}, 500);


mp.game.streaming.requestAnimDict("mp_facial");
mp.game.streaming.requestAnimDict("facials@gen_male@variations@normal");

mp.events.add('playerStartTalking', (player) => {
    player.playFacialAnim("mic_chatter", "mp_facial");
});

mp.events.add('playerStopTalking', (player) => {
    player.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});




var PHONE = {
    target: null,
    status: false
};

mp.events.add('voice.phoneCall', (target) => {
    if (!PHONE.target) {
        PHONE.target = target;
        PHONE.status = true;
        mp.events.callRemote("add_voice_listener", target);
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
            if (dist > MaxRange) mp.events.callRemote("remove_voice_listener", PHONE.target);
            else g_voiceMgr.add(PHONE.target, false);
        } else mp.events.callRemote("remove_voice_listener", PHONE.target);
        PHONE.target = null;
        PHONE.status = false;
    }
});


}ꟙꥉǰ