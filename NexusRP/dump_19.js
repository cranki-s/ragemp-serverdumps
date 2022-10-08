{
mp.events.add("playerJoin", () => {
	mp.events.call("client:respawning")
});

mp.events.add('client:weaponSwap', () => {
	Behaviour.resetWeapon()
})

mp.events.add('playerWeaponShot', () => {
	if (!loggedin || chatActive || new Date().getTime() - global.lastCheck < 1000 || mp.gui.cursor.visible || localplayer.getVariable('ingamearena') == true) return;
	if(Behaviour.checkWeaponhash()) {
		
		NexusEvent.callRemote("SendToAdmins", "Unallowed Weapon")
	}

});

mp.events.add('client:respawning', () => {
	if(Behaviour.active){
		 Behaviour.sleep(10)			 	 
	}
});

class PlayerBehaviour {
	constructor() {
		this.active = true
		this.flags, this.hits = 0
		this.reloadingWeapon = false
		this.pos = mp.players.local.position
		this.health = mp.players.local.getHealth();
		this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle);
		this.magazin = mp.game.weapon.getWeaponClipSize(this.weapon)
		this.firstshot = true
	}
	sleep(duration) {
		this.active = false
		setTimeout(() => {
			this.active = true
		}, duration*1000);
	}
	secs() {
		return Math.round(Date.now() / 1000)
	}
	isRagdollOnHeight(height) {
		this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
		if (Math.abs(mp.players.local.position.z - this.range_to_btm)>Math.abs(height-this.range_to_btm)) {
			if (!this.isWalking()) {
				return false;
			} else if(this.active && this.range_to_btm>0) {
				return true;
			}
			return false
		}
	} 
	isWalking() {
		if(mp.players.local.isFalling() || mp.players.local.isRagdoll()) return false
		else if(!mp.players.local.vehicle) return true
	}
	subtractVector(v1,v2) {
		return {"x": v1.x - v2.x,"y": v1.y - v2.y,"z": v1.z - v2.z}
	}
	VehicleFasterThan(max) {
		if(mp.players.local.vehicle) {
			if(!(parseInt(mp.players.local.vehicle.getClass() == 16))) {
				return mp.players.local.vehicle.getSpeed()*3.6 > ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) / 1.2).toFixed() + 70)
			}
		}
		return false
	}
	checkCarPos(maxHeight = 50) {
		if(mp.players.local.vehicle) {
			if(parseInt(mp.players.local.vehicle.getClass())!=15 && parseInt(mp.players.local.vehicle.getClass())!=16) {
				this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
				if(mp.players.local.position.z-this.range_to_btm > maxHeight+this.range_to_btm) {
					return true
				}
				return false
			}
		}
	}
	checkWeaponhash() {
		let h = this.weapon
		if(h == 1119849093 || h == -1312131151 || h == -1355376991 || h == 1198256469 || h == 1834241177 || h == -1238556825 || h == -1568386805) {
			return true
		}
		return false
	}
	resetWeapon() {
		this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle)
		this.magazin = mp.game.weapon.getWeaponClipSize(this.weapon)
		this.reloadingWeapon = false
	}
}

var Behaviour = new PlayerBehaviour()
var loop = Behaviour.secs()

mp.events.add("render", () => {
	if (!loggedin || localplayer.getVariable('IS_ADMIN') == true || localplayer.getVariable('ingamearena') == true) return;
	Behaviour.health = Number(mp.players.local.getHealth()) + Number(mp.players.local.getArmour())
	if(loop < Behaviour.secs())
	{	
		if (Behaviour.active) {
			let Difference = Behaviour.subtractVector(Behaviour.pos, mp.players.local.position)
			if (Math.abs(Difference.x) > 50 || Math.abs(Difference.y) > 50) {
				if(Behaviour.isWalking()) {
					if(!mp.players.local.hasVariable("attachToVehicleTrunk") && mp.players.local.dimension == 0)
					{
						NexusEvent.callRemote('SendToAdmins', 'полете/телепорте')
					}					
				}
			}
			if (mp.players.local.vehicle) {
				if(Behaviour.checkCarPos(100) && mp.players.local.vehicle.getClass() != 14) {
					
					NexusEvent.callRemote("SendToAdmins", "полете на машине")
				}
				if(Behaviour.VehicleFasterThan(450)) {
					
					NexusEvent.callRemote("SendToAdmins", "speedhack авто")
					NexusEvent.callRemote("kickclient");
					
				}
			}
		}
		Behaviour.pos = mp.players.local.position
		loop = Behaviour.secs() + 3;
	}
});

setInterval(() => {
	
	let hp = Behaviour.health
	setTimeout(() => {
		if(hp<Behaviour.health && Behaviour.active) {
		if(Behaviour.health > 100){
        NexusEvent.callRemote("SendToAdmins", "больше 100 хп")
		}
		}
	}, 400);
}, 500);
}