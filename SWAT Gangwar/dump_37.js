{
require('luckywheel/events');

// Init wheel object
const luckywheel = require('luckywheel/module');
luckywheel.init();

// IPL for casino
const ipl_list = [
    'vw_casino_main',
    'hei_dlc_windows_casino',
    'hei_dlc_casino_door',
    'hei_dlc_casino_aircon'
];

for (let i = 0; i < ipl_list.length; i++) {
    mp.game.streaming.requestIpl(ipl_list[i]);
}

// Podium
var hashName = "vw_prop_vw_casino_podium_01a";
var newPos = new mp.Vector3(1100, 220, -49.99);
//var podiumObject = mp.objects.new(mp.game.joaat(hashName), newPos);
//var podiumIntervall = undefined;

mp.events.add("entityStreamIn", (entity) => {
    if (entity == null || entity == undefined || entity.handle == null || entity.handle == 0 || entity.type != "vehicle" || entity.getVariable("IsCasinoVehicle") == undefined) return;
    const position = entity.getVariable("position");
    entity.setDirtLevel(0.0);
    entity.setBrakeLights(true);
    entity.setLights(2);
    entity.setFullbeam(true);
    entity.freezePosition(true);
    //let rot = 0;
    //podiumIntervall = setInterval(() => {
      //  rot += 0.25;
        //podiumObject.setRotation(0, 0, rot, 2, true);
    //}, 10);

   // entity.attachTo(podiumObject.handle, 0, 0, 0, 0.5, 0, 0, 0, true, false, true, false, 0, true);
});

mp.events.add('entityStreamOut', (entity) => {
    if (entity == null || entity == undefined || entity.handle == null || entity.handle == 0 || entity.type != "vehicle" || entity.getVariable("IsCasinoVehicle") == undefined) return;
    //clearInterval(podiumIntervall);
    //podiumIntervall = undefined;
    //entity.detach(true, false);
});
}