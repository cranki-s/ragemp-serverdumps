{
function createParachuteObj(entity, player) {
    let model = isNaN(entity) ? mp.game.joaat(entity) : parseInt(entity);
    let obj = mp.objects.new(model, player.position, {
      rotation: new mp.Vector3(0,0,0),
      dimension: 0
    });
    return obj;
}

/** 
 * Attach parachute object to player 
 * and delete it when player is very close to the ground  
 */
let giveParachuteObject = (player) => {
	let theParachute = createParachuteObj('p_parachute1_sp_dec', player);
	setTimeout(() => { theParachute.attachTo(player.handle, 57717, 0, 0, 3, 0, 0, 0, true, true, true, false, 0, true); }, 350);
    let groundChecker = setInterval(() => {
		if(player.handle != 0) {
			let z = mp.game.gameplay.getGroundZFor3dCoord(player.position.x, player.position.y, player.position.z, 0.0, false);
			if (player.position.z - z <= 3) {
				if(mp.objects.exists(theParachute)) theParachute.destroy();
				player.para = false;
				clearInterval(groundChecker);
			}else if(player.getParachuteState() < 0) {
				if(mp.objects.exists(theParachute)) theParachute.destroy();
				player.para = false;
				clearInterval(groundChecker);
			}
		}else{
			if(mp.objects.exists(theParachute)) theParachute.destroy();
			player.para = false;
			clearInterval(groundChecker);
		}
    }, 3000);
}

function parachuteProcessor(entity, stage) {
	if(typeof(entity) !== "undefined" && typeof(stage) !== "undefined") {
		if(mp.players.exists(entity)) {
			if(entity != localPlayer) {
				stage = parseInt(stage);
				if(stage == 0) {
					entity.taskParachute(true);
				}else if(stage > 0 && !entity.para) {
					entity.para = true;
					giveParachuteObject(entity);
				}
			}
		}
	}
}
}