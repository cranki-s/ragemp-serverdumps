{
mp.events.add("nametagson", (player) => {
    mp.nametags.enabled = true;
});
  
mp.events.add("nametagsoff", (player) => {
    mp.nametags.enabled = false;
});

mp.events.add('freeze', (player) => {
    mp.players.local.freezePosition(true);
});
  
mp.events.add("unfreeze", (player) => {
    mp.players.local.freezePosition(false);
});

mp.events.add('invincibleon', () => {
    mp.game.player.setInvincible(true);
});

mp.events.add('invincibleoff', () => {
    mp.game.player.setInvincible(false);
});

const controlsIds =
{
	F5: 327,
	W: 32, //232
	S: 33, //31, 219, 233, 268, 269
	A: 34, //234
	D: 35, //30, 218, 235, 266, 267
	Space: 321,
	LCtrl: 326,
	Shift: 16
};
	
	global.fly = { flying: false, f: 2.0, w: 2.0, h: 2.0 };
	global.gameplayCam = mp.cameras.new("gameplay")
	
mp.events.add("render", () =>
{
	const player = mp.players.local;
	const aduty = player.getVariable("onduty") == 1;
	
	if(aduty){
		
		let controls = mp.game.controls;
		let fly = global.fly;
		const direction = global.gameplayCam.getDirection();
		controlModifier = mp.keys.isDown(controlsIds.LCtrl);
		shiftModifier = mp.keys.isDown(controlsIds.Shift);
		var fastMult = 1;
		var slowMult = 1;
		if (shiftModifier) {
			fastMult = 3;
		} else if (controlModifier) {
			slowMult = 0.5;
		}
		if(controls.isControlJustPressed(0, controlsIds.F5))
		{
			fly.flying = !fly.flying;
			
			const player = mp.players.local;
			
			player.setInvincible(fly.flying);
			player.freezePosition(fly.flying);
			
			if(!fly.flying
				&& !controls.isControlPressed(0, controlsIds.Space))
			{
				let position = mp.players.local.position;
				position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
				mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
			}
			
			mp.game.graphics.notify(fly.flying ? "Admin - NoClip: ~g~On" : "Admin - NoClip: ~r~Off");
		}
		else if(fly.flying)
		{
			let updated = false;
			let position = mp.players.local.position;

			
			if(controls.isControlPressed(0, controlsIds.W))
			{
				position.x += direction.x * fastMult * slowMult;;
				position.y += direction.y * fastMult * slowMult;;
				position.z += direction.z * fastMult * slowMult;;
				updated = true;
			}
			else if(controls.isControlPressed(0, controlsIds.S))
			{

				position.x -= direction.x * fastMult * slowMult;;
				position.y -= direction.y * fastMult * slowMult;;
				position.z -= direction.z * fastMult * slowMult;;
				updated = true;
			}
			else
			{
				fly.f = 2.0;
			}
			
			if(controls.isControlPressed(0, controlsIds.A))
			{				
				position.x += (-direction.y) * fastMult * slowMult;;
				position.y += direction.x * fastMult * slowMult;;
				updated = true;
			}
			else if(controls.isControlPressed(0, controlsIds.D))
			{
				if(fly.l < 8.0)
					fly.l *= 1.05;
			
				position.x -= (-direction.y) * fastMult * slowMult;;
				position.y -= direction.x * fastMult * slowMult;;
				updated = true;
			}
			else
			{
				fly.l = 2.0;
			}
			
			if(controls.isControlPressed(0, controlsIds.Space))
			{
				
				position.z += fastMult * slowMult;;
				updated = true;
			}
			else
			{
				fly.h = 2.0;
			}
			
			if(updated)
			{
				if(mp.players.local.vehicle == null){
					mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
				}else{
					mp.players.local.vehicle.heading = 0;
					mp.players.local.vehicle.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
				}
			}
		}
	}
});
}