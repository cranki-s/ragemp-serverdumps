{
let _SIZE = 0.2;
let _DENS = 10;
let _BURNOUT_SIZE = 1.5;
let _BIND_KEY = 70;
let _SMOKE_ON = true;
let bone_list = ["wheel_lr","wheel_rr"];
let bone_list2 = ["IK_Head","IK_Head"];
let base = "scr_recartheft";
let base2 = "core";

function RequestParticle(fxName) {
    mp.game.streaming.requestNamedPtfxAsset(fxName);
    while(!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) {
        mp.game.wait(1);
    }
}

function degrees_to_radians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}
function radians_to_degrees(radians){
  var pi = Math.PI;
  return radians * (180/pi);
}

function angle(veh) {
    if (veh) {
        let velocity = veh.getVelocity();
        let modV = Math.sqrt(velocity.x*velocity.x + velocity.y*velocity.y);
        let rz = veh.getHeading();
        const [sn,cs] = [-Math.sin(degrees_to_radians(rz)), Math.cos(degrees_to_radians(rz))]; 
        let speed = veh.getSpeed() * 3.6;
        if(speed < 5 || veh.gear == 0) return [0, modV];  
        let cosX = (sn*velocity.x + cs*velocity.y)/modV;
        if(cosX > 0.966 || cosX < 0) return [0, modV];
        return [radians_to_degrees(Math.acos(cosX))*0.5, modV];
    } else {
        return [0, 0];
    }
}
let drift_mode = false;
//render smoke
mp.events.add('render', () => {
    if(localplayer.vehicle) {
        if(localplayer.vehicle.getPedInSeat(-1) == localplayer.handle) {
			RequestParticle(base);
			RequestParticle(base2);	
        }
    }
});
mp.keys.bind(Keys.VK_LSHIFT, true, () => {
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) == localplayer.handle) {
			let vehicle = localplayer.vehicle;
			drift_mode = !drift_mode;
            mp.gui.execute(`HUD.drift=${drift_mode};`);
			mp.game.invoke('0x222FF6A823D122E2', vehicle.handle, drift_mode);
			mp.game.invoke('0x6DEE944E1EE90CFB', vehicle.handle, drift_mode);
		}
	}
})
}