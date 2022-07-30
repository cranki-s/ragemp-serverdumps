{
mp.events.add("playerJoin", () => {
    mp.events.call("client:respawning")
});

mp.events.add("client:checkInvincible", () => {
    if (mp.players.local.dimension == 0) return
    if (!Behaviour.active) return
    var healthBefore = Behaviour.health
    mp.players.local.applyDamageTo(1, true);
    setTimeout(() => {
        if (healthBefore == Behaviour.health) {
            if (mp.players.local.getHealth() > 0) {
                mp.events.callRemote('server:CheatDetection', "Static Godmode")
            }
        } else {
            Behaviour.sleep(1)
            mp.players.local.setHealth(healthBefore + 100)
        }
    }, 500);
})

setInterval(() => {
    if (globalThis.isAduty) return;
    mp.events.call("client:checkInvincible")
}, 30000);

mp.events.add('client:respawning', () => {
    if (Behaviour.active) Behaviour.sleep(3)
})

class PlayerBehaviour {
    constructor() {
        this.active = true
        this.flags, this.hits = 0
        this.pos = mp.players.local.position
        this.health = Number(mp.players.local.getHealth()) + Number(mp.players.local.getArmour())
    }
    sleep(duration) {
        this.active = false
        setTimeout(() => {
            this.active = true
        }, duration * 1000);
    }
    secs() {
        return Math.round(Date.now() / 1000)
    }
    isRagdollOnHeight(height) {
        this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
        if (Math.abs(mp.players.local.position.z - this.range_to_btm) > Math.abs(height - this.range_to_btm)) {
            if (!this.isWalking()) {
                return false;
            } else if (this.active && this.range_to_btm > 0) {
                return true;
            }
            return false
        }
    }
    isWalking() {
        if (mp.players.local.isFalling() || mp.players.local.isRagdoll()) return false
        else if (!mp.players.local.vehicle) return true
    }
    subtractVector(v1, v2) {
        return { "x": v1.x - v2.x, "y": v1.y - v2.y, "z": v1.z - v2.z }
    }
    VehicleFasterThan(max) {
        if (mp.players.local.vehicle) {
            if (!(parseInt(mp.players.local.vehicle.getClass() == 16))) {
                return mp.players.local.vehicle.getSpeed() * 3.6 > max
            }
        }
        return false
    }
    checkCarPos(maxHeight = 50) {
        if (mp.players.local.vehicle) {
            if (parseInt(mp.players.local.vehicle.getClass()) != 15 && parseInt(mp.players.local.vehicle.getClass()) != 16) {
                this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
                if (mp.players.local.position.z - this.range_to_btm > maxHeight + this.range_to_btm) {
                    return true
                }
                return false
            }
        }
    }
}

var Behaviour = new PlayerBehaviour()
var loop = Behaviour.secs()

mp.events.add("render", () => {
    if (globalThis.isAduty) return;
    Behaviour.health = Number(mp.players.local.getHealth()) + Number(mp.players.local.getArmour())
    if (loop < Behaviour.secs()) {
        if (Behaviour.active) {
            let Difference = Behaviour.subtractVector(Behaviour.pos, mp.players.local.position)
            if (Math.abs(Difference.x) > 30 || Math.abs(Difference.y) > 30) {
                if (Behaviour.isWalking()) {
                    mp.events.callRemote("server:CheatDetection", "Flyhack/Teleport")
                }
            }
            if (mp.players.local.vehicle) {
                if (Behaviour.checkCarPos(25)) {
                    mp.events.callRemote("server:CheatDetection", "Vehicle Flyhack")
                }
                if (Behaviour.VehicleFasterThan(250)) {
                    mp.events.callRemote("server:CheatDetection", "Vehicle Speedhack")
                }
            }
        }
        Behaviour.pos = mp.players.local.position
        loop = Behaviour.secs() + 3;
    }
});

setInterval(() => {
    if (globalThis.isAduty) return;
    let hp = Behaviour.health
    setTimeout(() => {
        if (hp < Behaviour.health && Behaviour.active) {
            mp.events.callRemote("server:CheatDetection", "Healkey (unexpected HP added)")
        }
    }, 400);
}, 500);
}