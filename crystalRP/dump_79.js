{

global.intrunk = false;
var interval = null;
mp.events.add("vehicleattach", (player, vehicle) => {
	try
	{
		if (player == mp.players.local)
			global.intrunk = true;
		const c = mp.game.gameplay.getModelDimensions(vehicle.getModel());
		player.taskPlayAnim("amb@world_human_bum_slumped@male@laying_on_right_side@base", "base", 8.0, 1.0, -1, 9, 1.0, false, false, false);
		vehicle.setNoCollision(player.handle, true);
		player.attachTo(vehicle.handle, -1, 0, -(c.max.y - c.min.y) / 2 + .4, 1.05, 0, 0, 0, false, true, false, true, 20, true);
	}
	catch (e) {}
});

mp.events.add("unfr", () => {
	try 
	{
		mp.players.local.freezePosition(false);
	}
	catch (e) {}
});

mp.events.add("vehicledeattach", (player) => {
	try 
	{
		if (player == mp.players.local)
			global.intrunk = false;
		player.freezePosition(false);
		player.detach(true, true);
	}
	catch (e) {}
});

mp.game.streaming.requestAnimDict("amb@world_human_bum_slumped@male@laying_on_right_side@base");

mp.events.add("entityStreamIn", function(a) {
	if("player" === a.type && a.hasVariable("attachToVehicleTrunk")) {
		if (!a.hasVariable("attachToVehicleTrunk")) return;
		const b = a.getVariable("attachToVehicleTrunk");
		if(-1 == b) return;
		setTimeout(() => {
			if(mp.players.exists(a) && 0 !== a.handle && b == a.getVariable("attachToVehicleTrunk")) {
				const c = mp.vehicles.atRemoteId(b);
				if(c && 0 !== c.handle) {
					const b = mp.game.gameplay.getModelDimensions(c.getModel());
					a.attachTo(c.handle, -1, 0, -(b.max.y - b.min.y) / 2 + .4, 1.2, 0, 0, 0, false, false, false, false, 20, true)
					a.taskPlayAnim("amb@world_human_bum_slumped@male@laying_on_right_side@base", "base", 8.0, 1.0, -1, 9, 1.0, false, false, false);
				}
			}
		}, 400)
	}
	try 
	{
		if("vehicle" === a.type && a.hasVariable("freeze")) {
			setTimeout(() => {
				if (a != undefined && a.hasVariable("freeze"))
				{
					if (a.getVariable("freeze"))
						a.freezePosition(true);
					else
						a.freezePosition(false);
				}
			}, 400)
		}
	}
	catch (e) {}
});

mp.events.add("vehiclefreeze", (vehicle, bool) => {
	try 
	{
		setTimeout(() => {
			if (vehicle != undefined)
				vehicle.freezePosition(bool);
		}, 400)
	}
	catch (e) {}
	
});

const localPlayer = mp.players.local;

mp.keys.bind(0x48, true, function() {
	try
	{
		if (localPlayer.hasVariable("attachToVehicleTrunk"))
			mp.events.callRemote('deattachfromtrunk', false);
	}
	catch (e) {}
});

let x = -1;
let y = -1;
let z = 1000;

function CheckCoords() {
        if(mp.game.invoke('0x1DD1F58F493F1DA5')) {
            let blipIterator = mp.game.invoke('0x186E5D252FA50E7D');
            let totalBlipsFound = mp.game.invoke('0x9A3FF3DE163034E8');
            let FirstInfoId = mp.game.invoke('0x1BEDE233E6CD2A1F', blipIterator);
            let NextInfoId = mp.game.invoke('0x14F96AA50D6FBEA7', blipIterator);
            for (let i = FirstInfoId, blipCount = 0; blipCount != totalBlipsFound; blipCount++, i = NextInfoId) {
                if (mp.game.invoke('0x1FC877464A04FC4F', i) == 8) {
                    var coord = mp.game.ui.getBlipInfoIdCoord(i);
					x = coord.x;
					y = coord.y;
                    break;
                }
            }
        }
}

var activedrive = false;
mp.keys.bind(Keys.VK_U, true, function() {	
	if (localplayer.vehicle != undefined && localplayer.vehicle.getPedInSeat(-1) == localplayer.handle)
	{
		if (!activedrive)
		{
			var model = localplayer.vehicle.getModel();
			CheckCoords();
			if (model == mp.game.joaat('cyber') || model == mp.game.joaat('mvisiongt') || model == mp.game.joaat('exp100') || model == mp.game.joaat('taycan') || model == mp.game.joaat('teslaroad') || model == mp.game.joaat('teslapd') || model == mp.game.joaat('teslax') || model == mp.game.joaat('avtr'))
			{
				if (x == -1 || y == -1) return;
				activedrive = true;
				mp.game.graphics.notify('~g~Включаем автопилот!');
				localplayer.taskVehicleDriveToCoordLongrange(localplayer.vehicle.handle, x, y, z, 60, 786603, 30);
			}
		}
		else
		{
			activedrive = false;
			mp.game.graphics.notify('~r~Выключаем автопилот!');
			localplayer.clearTasks()
		}
		
	}
});
}