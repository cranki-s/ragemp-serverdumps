{
/**
 * Fire properties:
 * Everything is by index, from 0 (small fire) to 2 (big fire).
 * The particle, life and time to create "child" fires is calculated from its index.
 * The bigger it is, the more life and the less time it takes to generate "children".
 * The children of the fires can be one greater or one less than their level.
 */

//

const FIRE_PARTICLES = [
    "fire_wrecked_train",
    "fire_wrecked_plane_cockpit",
    "ent_ray_meth_fires"
]
const FIRE_HEALTHS = [25, 75, 150]
const MAX_CHILD_VERTICAL_DISTANCE = 3;

let fires = []
let lastFireHealth = 0;
let lastEventSend = 0;

let localCam;

/**
 * @param position
 * @param range
 * @returns {null|*} - Returns the near fire (in the range selected) of the given position, null if not exists fire in the area.
 */
function getNearFire(position, range) {
    for (let fire of fires) {
        if (mp.game.system.vdist(position.x, position.y, position.z, fire.pos.x, fire.pos.y, fire.pos.z) < range) {
            return fire
        }
    }
    return null
}

/**
 * @param id - particle id
 * @param particle - particle string
 * @param pos - vector3 to set position of fire
 * @returns {boolean} - true if can create the fire, else false
 */
function createFire(id, particle, pos) {
    if (!isFire(particle)) return false
    let health = FIRE_HEALTHS[getFireParticleIndex(particle)]

    let newFire = {
        id: id,
        type: particle,
        health: health,
        pos: pos
    }
    fires.push(newFire)
    return true
}

/**
 * @param particle - particle string
 * @returns {boolean} - True if the particle can be fire, else false
 */
function isFire(particle) {
    return FIRE_PARTICLES.includes(particle)
}

/**
 * @param fire - fire object
 * @returns {boolean} - True if the fire has been destroyed, else false.
 */
function destroyFire(fire, serverSide = false) {
    if (fire) {
        let indexFire = fires.indexOf(fire)
        fires.splice(indexFire, 1)
        if (serverSide) mp.events.callRemote("fire:destroy", fire.id)
        return true
    }
    return false
}

/**
 * @param fire - fire object
 * @param health - health to set
 * @returns {boolean} - returns true if the health has been changed, else false.
 */
function setFireHealth(fire, health) {
    if (fire) {
        fire.health = health
        if (fire.health <= 0) destroyFire(fire, true)
        else updateFireParticle(fire)
        return true
    }
    return false
}

function updateFireParticle(fire) {
    if (fire) {
        let lowerFireType = getFireParticleIndex(fire.type) - 1 // Get the fire before the current one
        if (lowerFireType > -1 && fire.health <= FIRE_HEALTHS[lowerFireType]) {
            if (Date.now() - lastEventSend < 1000) return;
            lastEventSend = Date.now();
            // If the life of the fire is less than that of its previous type, it means that its size must decrease.
            mp.events.callRemote("fire:change_type", fire.id, lowerFireType)
        }
        return true
    }
    return false
}

/**
 * @param particle - Particle string
 * @returns {number} - Returns the fire index of required particle string (if not exists returns -1)
 */
function getFireParticleIndex(particle) {
    return FIRE_PARTICLES.indexOf(particle)
}

/** Returns a random zone from the given, if cant get a new pos in 5 tries, return the initial pos */
function getSafeZ(pos) {
    let newZ;

    for (let x = 1; x <= 5; x++) {
        newZ = pos.z * x
        let finalZ = mp.game.gameplay.getGroundZFor3dCoord(pos.x, pos.y, newZ, 0, false)
        if (Math.abs(pos.z - finalZ) < MAX_CHILD_VERTICAL_DISTANCE) {
            pos.z = finalZ
            break;
        }
    }
    return pos
}

function getFireById(id) {
    return fires.find(it => it.id === id)
}

mp.events.add("render", () => {

    // check if is shooting "weapon_fireextinguisher"
    if (mp.players.local.weapon === 101631238 && mp.players.local.getConfigFlag(58, true)) {
        let forwardPos = mp.players.local.getForwardVector();
        let pos = mp.players.local.position
        let nearPos = new mp.Vector3(pos.x + forwardPos.x, pos.y + forwardPos.y, pos.z + forwardPos.z)
        let fireNear = getNearFire(nearPos, 2)
        if (fireNear != null && Date.now() - lastFireHealth > 25) {
            setFireHealth(fireNear, fireNear.health-0.2)
            lastFireHealth = Date.now()
        }
    }

    // check if the player is driving "firetruck"
    else if (mp.players.local.vehicle && mp.players.local.vehicle.model === 1938952078 && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) {
        let crosshairLong = 0.02;
        let crosshairShort = 0.002;
        mp.game.graphics.drawRect(0.5, 0.35, crosshairShort, crosshairLong*1.2, 255, 255, 255, 200)
        mp.game.graphics.drawRect(0.5, 0.35, crosshairLong, crosshairShort*1.2, 255, 255, 255, 200)

        if(mp.game.controls.isControlPressed(28, 70)) {
            if (!localCam) {
                let pos = mp.players.local.position;
                let camRot = mp.game.cam.getGameplayCamRot(2);
                localCam = mp.cameras.new('gameplay', pos, camRot, 40);
                let camPos = mp.game.graphics.screen2dToWorld3d(new mp.Vector3(600, 0, 0));
                let camDir = localCam.getDirection();
                const distance = 30

                let farAway = new mp.Vector3((camDir.x * distance) + (camPos.x), (camDir.y * distance) + (camPos.y), ((camDir.z * distance) + (camPos.z)))
                let raycast = mp.raycasting.testPointToPoint(camPos, farAway, [mp.players.local.handle, mp.players.local.vehicle.handle], 1)
                if (raycast && raycast.position) {
                    let fireNear = getNearFire(raycast.position, 5)

                    if (fireNear != null) {
                        setFireHealth(fireNear, fireNear.health-0.2)
                        lastFireHealth = Date.now()
                    }
                }
                localCam.destroy();
                localCam = null
            }
        }
    }

    if (mp.players.local.duty) {
        let position = mp.players.local.position;
        for (let fire of fires) {
            if (!mp.game.system.vdist(position.x, position.y, position.z, fire.pos.x, fire.pos.y, fire.pos.z) > 30) continue;
            mp.game.graphics.drawText(
                `fire (type=${fire.type},hp=${fire.health})`,
                [fire.pos.x, fire.pos.y, fire.pos.z],
                {
                    font: 0,
                    color: [255, 255, 255, 190],
                    scale: [0.35, 0.35],
                    outline: true,
                });
        }
    }
});

let blurredEffect = false;
mp.setInterval(() => {

    // only check near fire when has almost one fire streamed
    if (fires.length > 0) {
        let fireNear = getNearFire(mp.players.local.position, 2)
        if (fireNear) {
            if (!blurredEffect) blurredEffect = mp.game.graphics.transitionToBlurred(600);
            mp.events.callRemote("health:on_take_fire_damage", 2)
        } else if (blurredEffect) blurredEffect = !mp.game.graphics.transitionFromBlurred(1000);
    }
}, 1000)
}