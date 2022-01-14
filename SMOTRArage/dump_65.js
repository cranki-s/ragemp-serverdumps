{
/*mp.markers.new(28, new mp.Vector3(904.619,-174.7044,74.0757), 40, // DEBUG
{
	direction: new mp.Vector3(0, 0, 0),
	rotation: new mp.Vector3(0, 180, 0),
	color: [0, 0, 200, 200],
	visible: true,
	dimension: 0
});*/

let ekxZZ = mp.colshapes.newSphere(-422.6591,1088.2771,334.1582,140,0);
let taxiZZ = mp.colshapes.newSphere(904.619,-174.7044,74.0757,40,0);
let wineryZZ = mp.colshapes.newSphere(-1749.1824,2097.4878,186.5492,360,0);
let bolnicaZZ = mp.colshapes.newSphere(298.4762,-584.5555,43.2608,20,0);
let bolnicaSandyZZ = mp.colshapes.newSphere(1841.3016,3669.4404,33.68,20,0);
let bolnicaPaletoZZ = mp.colshapes.newSphere(-236.3448,6320.0024,31.8307,15,0);
let truckZZ = mp.colshapes.newSphere(-422.5246,-2787.9614,6.0004,150,0);
let containersZZ = mp.colshapes.newSphere(951.6116,-2920.707,5.2778,110,0);

var imInZZ = false;

var primarySpeedLimit = false;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(shape == ekxZZ || shape == bolnicaZZ || shape == bolnicaSandyZZ || shape == bolnicaPaletoZZ || shape == taxiZZ || shape == wineryZZ || shape == truckZZ || shape == containersZZ) {
				if(typeof(localPlayer.getVariable('player.fraction')) !== "undefined") {
					let myFraction = localPlayer.getVariable('player.fraction');
					if(typeof(myFraction.name) !== "undefined") {
						if(myFraction.name == "ПОЛИЦИЯ") return false;
					}
				}
				if(typeof(localPlayer.getVariable("player.passive")) !== "undefined") {
					imInZZ = true;
					let noActivate = false;
					if(localPlayer.vehicle) {
						let theVeh = localPlayer.vehicle;
						if(typeof(theVeh.getVariable("veh.theft")) !== "undefined" || typeof(theVeh.getVariable("veh.grabTruck")) !== "undefined") noActivate = true;
					}
					if(!localPlayer.getVariable("player.passive") && !noActivate) {
						mp.game.ui.messages.showMidsized("~g~Зелёная ~w~зона", "~s~Включаем пассивный режим, отключить можно в телефоне.");
						mp.events.callRemote('togglePassive', true);
					}
				}
			}
			if(shape == ekxZZ && !primarySpeedLimit) {
				imInZZ = "ekxZZ";
				primarySpeedLimit = 70;
				if(localPlayer.vehicle) mp.game.ui.notifications.showWithPicture("Твой бро", "Тут всего 70 км/ч", "К сожалению, тут максимальная скорость ограничена", "CHAR_JIMMY", 1, false, 1, 2);
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape) != "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(shape == ekxZZ || shape == bolnicaZZ || shape == bolnicaSandyZZ || shape == bolnicaPaletoZZ || shape == taxiZZ || shape == wineryZZ || shape == truckZZ || shape == containersZZ) imInZZ = false;
			if(shape == ekxZZ && primarySpeedLimit) primarySpeedLimit = false;
		}
	}
});
}즲Ā