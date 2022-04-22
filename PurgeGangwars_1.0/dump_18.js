{
const colshapeArenaRevolver = mp.colshapes.newSphere(340.5008544921875, -2038.5167236328125, 21.58545684814453, 75, 2);
const colshapeArenaBrawl = mp.colshapes.newSphere(-284.4473571777344, -1638.0806884765625, 31.848812103271484, 48.75, 3);
const colshapeArenaSniper = mp.colshapes.newSphere(-399.5508728027344, -2760.231201171875, 6.141679286956787, 101, 4);
const colshapeArenaHeadshot = mp.colshapes.newSphere(340.5008544921875, -2038.5167236328125, 21.58545684814453, 75, 5);

var arenaRevolverTimer;
var arenaBrawlTimer;
var arenaSniperTimer;
var arenaHeadshotTimer;

function startTimerArenaRevolver(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You leaved the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaRevolverTimer = setTimeout(function(){
		mp.events.callRemote('killArenaRevolverPlayer');
	}, 5000);
}

function stopTimerArenaRevolver(){
	clearTimeout(arenaRevolverTimer);
}

function startTimerArenaHeadshot(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You leaved the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaHeadshotTimer = setTimeout(function(){
		mp.events.callRemote('killArenaHeadshotPlayer');
	}, 5000);
}

function stopTimerArenaHeadshot(){
	clearTimeout(arenaHeadshotTimer);
}

function startTimerArenaBrawl(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You leaved the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
	arenaBrawlTimer = setTimeout(function(){
		mp.events.callRemote('killArenaBrawlPlayer');
	}, 5000);
}

function stopTimerArenaBrawl(){
	clearTimeout(arenaBrawlTimer);
}

function startTimerArenaSniper(){
	const localPlayer = mp.players.local;
	mp.game.ui.messages.showMidsizedShard("You leaved the arena!", `Go back in the ~y~zone~s~, you have 5 seconds to return`, 6, false, false, 3000, false);
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
});
}