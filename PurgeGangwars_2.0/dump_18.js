{
const colshapeArenaRevolver = mp.colshapes.newSphere(340.5008544921875, -2038.5167236328125, 21.58545684814453, 75, 2);
const colshapeArenaBrawl = mp.colshapes.newSphere(-284.4473571777344, -1638.0806884765625, 31.848812103271484, 48.75, 3);
const colshapeArenaSniper = mp.colshapes.newSphere(-399.5508728027344, -2760.231201171875, 6.141679286956787, 101, 4);
const colshapeArenaHeadshot = mp.colshapes.newSphere(340.5008544921875, -2038.5167236328125, 21.58545684814453, 75, 5);
const colshapeArenaChili = mp.colshapes.newSphere(-1109.04833984375, 4918.85400390625, 175.4012451171875, 93, 3);
const colshapeArenaBraddock = mp.colshapes.newSphere(2219.47290039062, 5599.00390625, -150.340003403, 93, 4);

var arenaRevolverTimer;
var arenaBrawlTimer; 
var arenaSniperTimer;
var arenaHeadshotTimer;
var arenaChiliTimer;
var arenaBraddockTimer;

function startTimerArenaRevolver(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You left the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaRevolverTimer = setTimeout(function(){
		mp.events.callRemote('killArenaRevolverPlayer');
	}, 5000);
}

function stopTimerArenaRevolver(){
	clearTimeout(arenaRevolverTimer);
}

function startTimerArenaHeadshot(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You left the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaHeadshotTimer = setTimeout(function(){
		mp.events.callRemote('killArenaHeadshotPlayer');
	}, 5000);
}

function stopTimerArenaHeadshot(){
	clearTimeout(arenaHeadshotTimer);
}

function startTimerArenaChili(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You left the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaChiliTimer = setTimeout(function(){
		mp.events.callRemote('killArenaChiliPlayer');
	}, 5000);
}

function stopTimerArenaChili(){
	clearTimeout(arenaChiliTimer);
}

function startTimerArenaBraddock(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You left the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaBraddockTimer = setTimeout(function(){
		mp.events.callRemote('killArenaBraddockPlayer');
	}, 5000);
}

function stopTimerArenaBraddock(){
	clearTimeout(arenaBraddockTimer);
}

function startTimerArenaBrawl(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You left the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaBrawlTimer = setTimeout(function(){
		mp.events.callRemote('killArenaBrawlPlayer');
	}, 5000);
}

function stopTimerArenaBrawl(){
	clearTimeout(arenaBrawlTimer);
}

function startTimerArenaSniper(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You left the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaSniperTimer = setTimeout(function(){
		mp.events.callRemote('killArenaSniperPlayer');
	}, 5000);
}

function stopTimerArenaSniper(){
	clearTimeout(arenaSniperTimer);
}

mp.events.add("playerEnterColshape", (shape) => {
	if (shape === colshapeArenaRevolver) {
		stopTimerArenaRevolver();
	}
	if (shape === colshapeArenaBrawl) {
		stopTimerArenaBrawl();
	}
	if (shape === colshapeArenaSniper) {
		stopTimerArenaSniper();
	}
	if (shape === colshapeArenaHeadshot) {
		stopTimerArenaHeadshot();
	}
	if (shape === colshapeArenaChili) {
		stopTimerArenaChili();
	}	
	if (shape === colshapeArenaBraddock) {
		stopTimerArenaBraddock();
	}		
});

mp.events.add("playerExitColshape", (shape) => {
	if (shape === colshapeArenaRevolver) {
		startTimerArenaRevolver();
	}
	if (shape === colshapeArenaBrawl) {
		startTimerArenaBrawl();
	}
	if (shape === colshapeArenaSniper) {
		startTimerArenaSniper();
	}
	if (shape === colshapeArenaHeadshot) {
		startTimerArenaHeadshot();
	}
	if (shape === colshapeArenaChili) {
		startTimerArenaChili();
	}	
	if (shape === colshapeArenaBraddock) {
		startTimerArenaBraddock();
	}
});
}