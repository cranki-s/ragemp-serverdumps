{
const Use3d = true;
const UseAutoVolume = true;
var micCef;
setTimeout(function() {
	micCef = mp.browsers.new("package://micCef/mic.html");
}, 5000)

const MaxRange = 30.0;
const isVoiceKeyPressed = () => {
    if (mp.game.controls.isControlPressed(0, 249)) {
		mp.voiceChat.muted = false;
		if(micCef) micCef.execute(`setMicOn();`)
    }
    if (mp.game.controls.isControlReleased(0, 249)) {
		mp.voiceChat.muted = true;
		if(micCef) micCef.execute(`setMicOff();`)
    }
}


setInterval(() => {
    isVoiceKeyPressed();
}, 250);



let g_voiceMgr =
{
	listeners: [],
	
	add: function(player)
	{
		this.listeners.push(player);
		
		player.isListening = true;		
		mp.events.callRemote("add_voice_listener", player);
		
		if(UseAutoVolume)
		{
			player.voiceAutoVolume = true;
		}
		else
		{
			player.voiceVolume = 1.0;
		}
		
		if(Use3d)
		{
			player.voice3d = true;
		}
	},
	
	remove: function(player, notify)
	{
		let idx = this.listeners.indexOf(player);
			
		if(idx !== -1)
			this.listeners.splice(idx, 1);
			
		player.isListening = false;		
		
		if(notify)
		{
			mp.events.callRemote("remove_voice_listener", player);
		}
	}
};

mp.events.add("playerQuit", (player) =>
{
	if(player.isListening)
	{
		g_voiceMgr.remove(player, false);
	}
});

setInterval(() =>
{
	let localPlayer = mp.players.local;
	let localPos = localPlayer.position;
	
	mp.players.forEachInStreamRange(player =>
	{
		if(player != localPlayer)
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
				player.voiceVolume = 1 - (dist / MaxRange);
			}
		}
		else
		{
			g_voiceMgr.remove(player, true);
		}
	});
}, 500);
}