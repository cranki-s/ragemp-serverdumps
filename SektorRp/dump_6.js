{
class PlayerBehaviour {
    constructor() {
        this.active = true;
        this.flags, this.hits = 0;
        this.pos = mp.players.local.position;
        this.timer = null;
    }
    sleep(duration) {
        this.active = false;
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            this.active = true;
        }, duration * 1000);
    }
    secs() {
        return Math.round(Date.now() / 1000);
    }
    isRagdollOnHeight(height) {
        this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
        if (Math.abs(mp.players.local.position.z - this.range_to_btm) > Math.abs(height - this.range_to_btm)) {
            if (!this.isWalking()) {
                return false;
            } else if (this.active && this.range_to_btm > 0) {
                return true;
            }
            return false;
        }
    }
    isWalking() {
        if (mp.players.local.isFalling() || mp.players.local.isRagdoll()) return false;
        else if (!mp.players.local.vehicle) return true;
    }
    subtractVector(v1, v2) {
        return { "x": v1.x - v2.x, "y": v1.y - v2.y, "z": v1.z - v2.z }
    }
    VehicleFasterThan(max) {
        if (mp.players.local.vehicle) {
            if (!(parseInt(mp.players.local.vehicle.getClass() === 16))) {
                return mp.players.local.vehicle.getSpeed() * 3.6 > max;
            }
        }
        return false;
    }
    checkCarPos(maxHeight = 50) {
        if (mp.players.local.vehicle) {
            if (parseInt(mp.players.local.vehicle.getClass()) !== 15 && parseInt(mp.players.local.vehicle.getClass()) !== 16) {
                this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
                if (mp.players.local.position.z - this.range_to_btm > maxHeight + this.range_to_btm) {
                    return true;
                }
                return false;
            }
        }
    }
}
mp.events.add("playerJoin", () => {
    mp.events.call("client:respawning");
});
mp.events.add('client:respawning',
    () => {
        Behaviour.sleep(15);
    });
mp.events.add('sleepAH',
    (sekunden) => {
        Behaviour.sleep(sekunden);
    });
var Behaviour = new PlayerBehaviour();
var loop = Behaviour.secs();
mp.events.add('render', () => {
	if (loop < Behaviour.secs()) {
		if (Behaviour.active && mp.players.local.dimension === 0) {
            const Difference = Behaviour.subtractVector(Behaviour.pos, mp.players.local.position);
			if (Math.abs(Difference.x) > 30 || Math.abs(Difference.y) > 30) {
				if (Behaviour.isWalking()) {
                    mp.events.callRemote("server:CheatDetection", "Flyhack oder Teleport");
                }
			}
			if (mp.players.local.vehicle) {
				if (Behaviour.VehicleFasterThan(295)) {
                    mp.events.callRemote("server:CheatDetection", "Vehicle Speedhack");
                }
			}
        }
        Behaviour.pos = mp.players.local.position;
		loop = Behaviour.secs() + 3;
	}
});
}