{

let localplayer = mp.players.local;

mp.game.streaming.requestAnimDict("amb@world_human_bum_slumped@male@laying_on_right_side@base");

var trunk = {
    in: false,
    vehicle: null,

    set: function(vehicle, player) 
    {
        if (vehicle == undefined || player == undefined) return;

        if (player == localplayer)
        {
            this.in = true;
            this.vehicle = vehicle;
        }



        const size = mp.game.gameplay.getModelDimensions(vehicle.getModel());
		player.freezePosition(true);
		player.attachTo(vehicle.handle, -1, 0, -(size.max.y - size.min.y) / 2 + .4, 1.05, 0, 0, 0, false, false, false, false, 20, true);
		player.taskPlayAnim("amb@world_human_bum_slumped@male@laying_on_right_side@base", "base", 8.0, 1.0, -1, 1, 0.0, false, false, false);
    },

    reset: function(player)
    {
        if (player == localplayer)
        {
            this.in = false;
            this.vehicle = null;
        }

        player.freezePosition(false);
		player.detach(true, false);
        player.stopAnimTask("amb@world_human_bum_slumped@male@laying_on_right_side@base", "base", 3.0);

        player.position = mp.game.object.getObjectOffsetFromCoords(player.position.x, player.position.y, player.position.z, player.getHeading(), 0, -1, 0)
    }

}

mp.events.add("trunk.enter", (vehicle, player) => {
    trunk.set(vehicle, player);
});

mp.events.add("trunk.exit", (player) => {
    trunk.reset(player);
});

mp.events.add("entityStreamIn", function(entity) {
    try
    {
        if (entity.type === "vehicle" && entity.hasVariable("VEH::TRUNK") && entity.getVariable("VEH::TRUNK") != "NONE")
        {

            const data = entity.getVariable("VEH::TRUNK");

            setTimeout( () => {
                if (entity == undefined || !mp.vehicles.exists(entity.id) || entity.getVariable("VEH::TRUNK") != data) return;
                
                let player = mp.players.atRemoteId(Number(data));
                if (player == undefined) return;

                trunk.set(entity, player);
            }, 400);

        }
    }
    catch{ }
});

mp.keys.bind(Keys.VK_SPACE, false, function() {
	if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('trunk.exit');
    lastCheck = new Date().getTime();
});

mp.events.add("render", () => {

    if (trunk.in)
    {
        mp.game.controls.disableAllControlActions(2);
		mp.game.controls.enableControlAction(2, 30, true);
	    mp.game.controls.enableControlAction(2, 31, true);
		mp.game.controls.enableControlAction(2, 32, true);
		mp.game.controls.enableControlAction(2, 1, true);
	    mp.game.controls.enableControlAction(2, 2, true);
    }

});
}