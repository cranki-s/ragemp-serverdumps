{
var localPlayer = mp.players.local;
mp.events.add("sc:check",(maxSpeed) => {
  mp.events.callRemote("sc:check",localPlayer.vehicle.getSpeed() * 3.6, maxSpeed);
});
}