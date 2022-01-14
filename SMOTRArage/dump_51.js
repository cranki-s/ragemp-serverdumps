{
let afVoice = false;
var maxVoiceChatRange = 25.0;
var voiceChatEnabled = true;

mp.keys.bind(0x58, true, function() {
	if(voiceChatEnabled) {
		if(mp.voiceChat.muted && !localPlayer.isTypingInTextChat) {
			if(afVoice) return false;
			afVoice = true;
			setTimeout(function() { afVoice = false }, 500);
			
			if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
				let playerBlocks = localPlayer.getVariable("player.blocks");
				if(typeof(playerBlocks.mute) !== "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Вы не можете говорить в голосовой чат, у Вас заглушка.</span>");
			}
			
			mp.voiceChat.muted = false;
			//mp.voiceChat.setPreprocessingParam(10,1);
			if(hud_browser) hud_browser.execute('playSound("voice_on", 0.25);');
			
			localPlayer.playFacialAnim("mic_chatter", "mp_facial");
		}
	}
});

mp.keys.bind(0x58, false, function() {
	if(voiceChatEnabled) {
		if(!mp.voiceChat.muted) {
			afVoice = true;
			setTimeout(function() { afVoice = false }, 500);
			
			mp.voiceChat.muted = true;
			if(hud_browser) hud_browser.execute('playSound("voice_off", 0.25);');
			
			mp.events.callRemote("remove_mytalk");
			localPlayer.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
		}
	}
});

var voiceManager =
{
	listeners: [],
	
	add: function(player) {
		this.listeners.push(player);
		
		player.isListening = true;
		mp.events.callRemote("add_voice_listener", player);
		
		player.voiceVolume = 1.0;
		player.voice3d = true;
	},
	
	remove: function(player, notify) {
		let idx = this.listeners.indexOf(player);
		if(idx !== -1) {
			delete(this.listeners[idx]);
			this.listeners = this.listeners.filter(function (el) { return el != null; });
		}
			
		player.isListening = false;	
		if(notify) mp.events.callRemote("remove_voice_listener", player);
	}
};

function restartVoiceChat() {
	mp.players.forEachInStreamRange(player => {
		if(player != localPlayer) {
			if(player.isListening) voiceManager.remove(player, true);
		}
	});
	mp.voiceChat.cleanupAndReload(true, true, true);
}

function toggleVoiceChat(theState) {
	if(typeof(theState) !== "undefined") {
		voiceChatEnabled = theState;
		if(!voiceChatEnabled) {
			mp.players.forEachInStreamRange(player => {
				if(player != localPlayer && player.isListening) voiceManager.remove(player, true);
			});
		}
	}
}

mp.events.add("playerQuit", (player) => {
	if(player.isListening) voiceManager.remove(player, false);
});

mp.events.add("toggleTalker", (player, val) => {
	if(mp.players.exists(player)) {
		if(player.handle !== 0) {
			if(player.isListening) {
				if(!val) {
					player.voiceVolume = 0;
				}else{
					let playerPos = player.position;		
					let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
					if(dist > maxVoiceChatRange) voiceManager.remove(player, true);
					else player.voiceVolume = 1 - (dist / maxVoiceChatRange);
				}
			}
		}else{
			voiceManager.remove(player, true);
		}
	}else{
		voiceManager.remove(player, true);
	}
});

setInterval(() => {
	if(voiceChatEnabled) {
		let localPos = localPlayer.position;
		
		mp.players.forEachInStreamRange(player => {
			if(player != localPlayer) {
				if(!player.isListening) {
					const playerPos = player.position;		
					let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
					
					if(dist <= maxVoiceChatRange) voiceManager.add(player);
				}
			}
		});
		
		voiceManager.listeners.forEach((player) => {
			if(player.handle !== 0) {
				let playerPos = player.position;		
				let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
				
				if(dist > maxVoiceChatRange) voiceManager.remove(player, true);
				else if(player.voiceVolume) player.voiceVolume = 1 - (dist / maxVoiceChatRange);
			}else{
				voiceManager.remove(player, true);
			}
		});
	}
	if(typeof(chatVisualMessages) !== "undefined" && Object.keys(chatVisualMessages).length > 0) {
		for(let i in chatVisualMessages) {
			let lifeTime = chatVisualMessages[i].lifeTime;
			let curDate = Date.parse(new Date());
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+chatVisualMessages[i].clearMsg+"</span>");
			if((lifeTime - curDate) <= 0) delete chatVisualMessages[i];
		}
	}
	/*if(typeof(trasserLinks) !== "undefined" && Object.keys(trasserLinks).length > 0) {
		for(let i in trasserLinks) {
			let lifeTime = trasserLinks[i].lifeTime;
			let curDate = Date.parse(new Date());
			if((lifeTime - curDate) <= 0) delete trasserLinks[i];
		}
	}*/
}, 500);

/*
mp.events.add("playerStartTalking", (player) => {
	chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Кто-то начал пиздеть</span>");
	if(!player.isPlayerTalking) player.isPlayerTalking = true;
});

mp.events.add("playerStopTalking", (player) => {
	chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Кто-то закончил пиздеть</span>");
	if(player.isPlayerTalking) player.isPlayerTalking = false;
});
*/
}