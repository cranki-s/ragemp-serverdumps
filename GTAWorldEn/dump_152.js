{
function CreateNamedRenderTargetForModel(name, model) {
	if (!mp.game.ui.isNamedRendertargetRegistered(name)) mp.game.ui.registerNamedRendertarget(name, false);
	if (mp.game.ui.isNamedRendertargetLinked(model)) mp.game.ui.linkNamedRendertarget(model);
	if (!mp.game.ui.isNamedRendertargetLinked(model)) mp.game.ui.linkNamedRendertarget(model);
	if (mp.game.ui.isNamedRendertargetRegistered(name)) handle = mp.game.ui.getNamedRendertargetRenderId(name);
	return handle;
}

channels = [
'PL_STD_CNT', 
'PL_STD_WZL',
'PL_LO_WZL',
'PL_SP_WORKOUT',
'PL_SP_PLSH1_INTRO',
'PL_LES1_FAME_OR_SHAME',
'PL_STD_WZL_FOS_EP2',
'PL_CINEMA_ACTION',
'PL_CINEMA_ARTHOUSE',
'PL_CINEMA_MULTIPLAYER',
'PL_WEB_HOWITZER',
'PL_WEB_RANGERS',
'PL_WEB_PRB2',
'PL_MP_WEAZEL',
'PL_CINEMA_ARTHOUSE'
];

tvs = [
2054093856,
1194029334,
777010715,
1434219911,
743076735,
-1211954574,
1036195894,
1065897083,
1393541839,
-698352776,
-1073182005,
-240931727,
170618079,
-1820646534,
-1223496606
];




mp.events.add("playerReady", player => {
	mp.game.ui.setHudComponentPosition(10, 0.75, 0.0);
});


let tvCheck = false;
mp.events.add('render', () => {
	if (mp.players.local.dimension !== 0) {
		for (let i = 0; i < tvs.length; i++) if (mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 1, tvs[i], false, false, false)) {
			mp.game.ui.setTextComponentFormat('THREESTRINGS');
			if (!mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 4, mp.game.joaat("prop_mk_mp_ring_01b"), false, false, false)) mp.game.ui.addTextComponentSubstringPlayerName('Press ~INPUT_CONTEXT~ to turn on the TV.');
			else {
				mp.game.ui.addTextComponentSubstringPlayerName('Press ~INPUT_CONTEXT~ to turn off the TV.');
				mp.game.ui.addTextComponentSubstringPlayerName('\nUse ~INPUT_FRONTEND_LEFT~ ~INPUT_FRONTEND_RIGHT~ to change the channel.');
				mp.game.ui.addTextComponentSubstringPlayerName('\nUse ~INPUT_FRONTEND_UP~ ~INPUT_FRONTEND_DOWN~ to change the volume.');
			};
			mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);				
		};
		
		if (mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 50, mp.game.joaat("prop_mk_mp_ring_01b"), false, false, false)) {
			if (tvCheck === false) {
				mp.events.callRemote('TV_STREAM_IN');
				tvCheck = true;
			};
		};
	};
});


mp.events.add("TV_ADD", (details) => {
	if (tvRender) return;
	details = JSON.parse(details);
	TV = mp.objects.atRemoteId(details.TV);
	if (!TV) return;
	TV.notifyStreaming = true;	
	TV.setCollision(false, true);
	tvId = details.TV;
	tvHash = details.tvHash;
	textRenderId = false;
	
	handle = CreateNamedRenderTargetForModel("tvscreen", details.tvHash);
	setTimeout(() => {
		mp.game.graphics.setTvChannel(2);
		mp.game.invoke("0x2201C576FACAEBE8", 2, details.channel, 0);
		mp.game.graphics.setTvAudioFrontend(false);
		mp.game.invoke("0x845BAD77CC770633", TV.handle);
	},50);
	
	tvRender = new mp.Event('render', () => {
		if (textRenderId === false) mp.game.ui.setTextRenderId(handle);
		mp.game.graphics.set2dLayer(4);
		mp.game.graphics.drawTvChannel(0.5, 0.5, 0.99, 0.99, 0.0, 255, 255, 255, 255);
		mp.game.ui.setTextRenderId(1);
	});
});


mp.events.add("TV_CHANNEL_CHANGE", (details) => {
	details = JSON.parse(details);
	mp.game.invoke("0x2201C576FACAEBE8", 2, details.channel, 0);
	date = new Date();
	mp.game.time.setClockTime(mp.game.invoke("0x25223CA6B4D20B7F"), (Math.floor(date.getUTCSeconds()/2) + date.getUTCMinutes() * 30) % 10, 0);
});


mp.events.add('TV_VOL_CHANGE', (volume) => {
	if (volume === false) mp.game.invoke("0x2982BF73F66E9DDC", -1.0);
	if (volume === true) mp.game.invoke("0x2982BF73F66E9DDC", 1.0);
});


mp.events.add("entityStreamOut", (entity) => {
		mp.game.graphics.setTvChannel(-1);
		mp.game.invoke("0x2982BF73F66E9DDC", 1.0);
		if (tvRender) {
			tvRender.destroy();
			tvRender = undefined;
		};
		tvCheck = false;
});


var currentIndex = 0;
function nextChannel() {
  currentIndex += 1;
  currentIndex = Math.min(currentIndex, channels.length - 1);
  if (currentIndex === 14) currentIndex = 0;
  return channels[currentIndex];
};

function prevChannel() {
  currentIndex -= 1;
  currentIndex = Math.max(currentIndex, 0);
  if (currentIndex === 0) currentIndex = 14;
  return channels[currentIndex];
};


let tvRender;
mp.keys.bind(0x45, true, function() {
	if (logged == 0 || chatopened  || cef_opened) return;
	if (mp.players.local.dimension !== 0) {
		for (let i = 0; i < tvs.length; i++) if (!tvRender && mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 1, tvs[i], false, false, false)) mp.events.callRemote('TV_ON', channels[(Math.random() * channels.length) | 0], tvs[i], mp.players.local.position);
		if (mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 1, mp.game.joaat("prop_mk_mp_ring_01b"), false, false, false)) mp.events.callRemote('TV_OFF', mp.objects.atRemoteId(tvId));
	};
});

mp.keys.bind(0x27, true, function() {
	if (logged == 0 || chatopened  || cef_opened) return;
	if (tvRender && mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 1, mp.game.joaat("prop_mk_mp_ring_01b"), false, false, false)) mp.events.callRemote('TV_CHANGE_CHANNEL', nextChannel(), tvHash, mp.objects.atRemoteId(tvId));
});

mp.keys.bind(0x25, true, function() {
	if (logged == 0 || chatopened  || cef_opened) return;
	if (tvRender && mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 1, mp.game.joaat("prop_mk_mp_ring_01b"), false, false, false)) mp.events.callRemote('TV_CHANGE_CHANNEL', prevChannel(), tvHash, mp.objects.atRemoteId(tvId));
});

mp.keys.bind(0x26, true, function() {
	if (logged == 0 || chatopened  || cef_opened) return;
	if (tvRender && mp.game.invoke("0x2170813D3DD8661B") === -1.0 && mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 1, mp.game.joaat("prop_mk_mp_ring_01b"), false, false, false)) mp.events.callRemote('TV_CHANGE_VOL', true);
});

mp.keys.bind(0x28, true, function() {
	if (logged == 0 || chatopened  || cef_opened) return;
	if (tvRender && mp.game.invoke("0x2170813D3DD8661B") === 1.0 && mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 1, mp.game.joaat("prop_mk_mp_ring_01b"), false, false, false)) mp.events.callRemote('TV_CHANGE_VOL', false);
});




/* -remote- */
tvRemotes = [
1881864012,
542291840,
2258885321,
4043086927
];


mp.game.invoke("0xFE02FFBED8CA9D99", "SAFEHOUSE_MICHAEL_SIT_SOFA", 0, -1);
mp.events.add("TV_REMOTE_ON_OFF", () => {
	mp.game.invoke("0x67C540AA08E4A6F5", -1, "MICHAEL_SOFA_TV_ON_MASTER", 0, 1);
	if (mp.players.local.dimension !== 0) {
		for (let i = 0; i < tvs.length; i++) if (!tvRender && mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 10, tvs[i], false, false, false)) mp.events.callRemote('TV_ON', channels[(Math.random() * channels.length) | 0], tvs[i], mp.objects.newWeak(mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 10, tvs[i], false, false, false)).getCoords(false));
		if (tvRender) mp.events.callRemote('TV_OFF', mp.objects.atRemoteId(tvId));
	};
});


mp.events.add("TV_REMOTE_FULL_SCREEN", () => {
	mp.game.invoke("0x67C540AA08E4A6F5", -1, "MICHAEL_SOFA_TV_ON_MASTER", 0, 1);
	if (tvRender && textRenderId === false) textRenderId = true;
	else textRenderId = false;
});


mp.events.add("TV_REMOTE_NEXT_CHANNEL", () => {
	mp.game.invoke("0x67C540AA08E4A6F5", -1, "MICHAEL_SOFA_TV_CHANGE_CHANNEL_MASTER", 0, 1);
	if (tvRender) mp.events.callRemote('TV_CHANGE_CHANNEL', nextChannel(), tvHash, mp.objects.atRemoteId(tvId));
});

mp.events.add("TV_REMOTE_PREV_CHANNEL", () => {
	mp.game.invoke("0x67C540AA08E4A6F5", -1, "MICHAEL_SOFA_TV_CHANGE_CHANNEL_MASTER", 0, 1);
	if (tvRender) mp.events.callRemote('TV_CHANGE_CHANNEL', prevChannel(), tvHash, mp.objects.atRemoteId(tvId));
});


mp.events.add("TV_REMOTE_VOL", () => {
	mp.game.invoke("0x67C540AA08E4A6F5", -1, "MICHAEL_SOFA_TV_CHANGE_CHANNEL_MASTER", 0, 1);
	if (tvRender && mp.game.invoke("0x2170813D3DD8661B") === -1.0) mp.events.callRemote('TV_CHANGE_VOL', true);
});

mp.events.add("TV_REMOTE_MUTE", () => {
	mp.game.invoke("0x67C540AA08E4A6F5", -1, "MICHAEL_SOFA_TV_CHANGE_CHANNEL_MASTER", 0, 1);
	if (tvRender && mp.game.invoke("0x2170813D3DD8661B") === 1.0) mp.events.callRemote('TV_CHANGE_VOL', false);
});


mp.events.add("playerCommand", (command) => {
	const args = command.split(/[ ]+/);
	const commandName = args[0];

	args.shift();
		
	if (commandName === "fixt") {
		if (mp.game.invoke("0x2170813D3DD8661B") === 1.0) mp.game.invoke("0x2982BF73F66E9DDC", -1.0);
		else if (mp.game.invoke("0x2170813D3DD8661B") === -1.0) mp.game.invoke("0x2982BF73F66E9DDC", 1.0);
	}
});

}