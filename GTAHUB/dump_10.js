{
// Implements calls that go directly to RAGE.

let lastVelocity = new mp.Vector3(0,0,0);
let lastPosition = new mp.Vector3(0,0,0);
let lastHeading = new mp.Vector3(0,0,0);
let lastSentUpdate = 0;

mp.setInterval(() => {
    let now = new Date().getTime();

    // get variables
    let vel = mp.players.local.getSpeedVector(false);
    let pos = mp.players.local.position;
    let heading = mp.players.local.getHeading();

    // compare to previous values
    let distToLastVel = mp.game.system.vdist(vel.x, vel.y, vel.z, lastVelocity.x, lastVelocity.y, lastVelocity.z);
    let distToLastPos = mp.game.system.vdist(pos.x, pos.y, pos.z, lastPosition.x, lastPosition.y, lastPosition.z);
    let distToLastHeading = Math.abs(heading - lastHeading);
    let anyVarChanged = distToLastVel > 0.1 || distToLastPos > 0.1 || distToLastHeading > 0.5;

    // send only when changes occur or some time passed
    if (anyVarChanged || (now - lastSentUpdate) > 700) {
        mp.events.callRemoteUnreliable("rageextension:update_vectors", pos, heading, vel);
        lastSentUpdate = now;

        // update previous variables
        lastVelocity = vel;
        lastPosition = pos;
        lastHeading = heading;
    }
}, 200);
}