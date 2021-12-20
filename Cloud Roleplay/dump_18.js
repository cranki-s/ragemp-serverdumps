{
mp.events.add('client:callremote', (eventname, ...args) => {
    try {
        mp.events.callRemote(eventname, ...args);
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:LetPauseMenuSleep', () => {
    mp.game.invoke("0xECF128344E9FF9F1", true);
    setTimeout(() => {
        mp.game.invoke("0xECF128344E9FF9F1", false);
    }, 5000);
});

mp.events.add('client:setOnGround', () => {
    mp.players.local.setCoordsNoOffset(mp.players.local.position.x, mp.players.local.position.y, mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0.0, false) + 1, false, false, false);
});

mp.events.add("render", () => {
    mp.game.gameplay.setFadeOutAfterDeath(false);
});

mp.events.add('client:setHeading', (value) => {
    mp.players.local.setHeading(value);
});

mp.events.add("client:startDeathScreen", () => {
    mp.game.graphics.startScreenEffect("DeathFailMPIn", 3500, true)
})

mp.events.add("client:stopDeathScreen", () => {
    mp.game.graphics.stopScreenEffect("DeathFailMPIn")
})

var GetNearestPlayer = function() {
    return mp.players.getClosest([mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z], 1);
}
}