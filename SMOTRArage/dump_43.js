{
/*mp.markers.new(28, new mp.Vector3(1696.3568, 2569.8518, 59.8855), 170, // DEBUG
{
	direction: new mp.Vector3(0, 0, 0),
	rotation: new mp.Vector3(0, 180, 0),
	color: [0, 0, 200, 50],
	visible: true,
	dimension: 0
});*/

mp.game.object.doorControl(741314661, 1844.998, 2597.482, 44.63626, true, 0.0, 50.0, 0); // закрыть тюремную дверь №1
mp.game.object.doorControl(741314661, 1818.543, 2597.482, 44.60749, true, 0.0, 50.0, 0); // закрыть тюремную дверь №2
mp.game.object.doorControl(741314661, 1806.939, 2616.975, 44.60093, true, 0.0, 50.0, 0); // закрыть тюремную дверь №3

var jailZone = mp.colshapes.newSphere(1696.3568, 2569.8518, 59.8855, 170, 0);
var jailImInZone = false;
var jailBreakAttemptions = 0;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(shape == jailZone) jailImInZone = true;
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape) && jailImInZone) {
			if(shape == jailZone) {
				jailImInZone = false;
				if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
					let playerBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(playerBlocks.jail) !== "undefined") {
						jailBreakAttemptions++;
						if(jailBreakAttemptions >= 5) return mp.events.callRemote('banAct', localPlayer, 1, "banHours", "5 попыток побега из тюрьмы", "true", "false", "false");
						chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вас задержали во время побега из тюрьмы и добавили <span style=\"color:#fff\"><b>5 минут</b></span> к заключению.</span>");
						mp.events.call("sleepAntiCheat");
						return mp.events.callRemote('goToJail', 5, false);
					}
				}
			}
		}
	}
});
}