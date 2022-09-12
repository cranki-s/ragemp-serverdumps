{
const blockedClasses = [13, 14, 21]; // https://wiki.rage.mp/index.php?title=Vehicle_Classes

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "vehicle") {
        if (entity.hasVariable("IndicatorRight")) entity.setIndicatorLights(0, entity.getVariable("IndicatorRight"));
        if (entity.hasVariable("IndicatorLeft")) entity.setIndicatorLights(1, entity.getVariable("IndicatorLeft"));
    }
});

mp.events.addDataHandler("IndicatorRight", (entity, value) => {
    if (entity.type === "vehicle" && entity.handle > 0) entity.setIndicatorLights(0, (value == null) ? false : value);
});

mp.events.addDataHandler("IndicatorLeft", (entity, value) => {
    if (entity.type === "vehicle" && entity.handle > 0) entity.setIndicatorLights(1, (value == null) ? false : value);
});

// Numpad 4 - Toggle left indicator
mp.keys.bind(0x25, false, () => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote("toggleIndicator", 1);
});

// Numpad 6 - Toggle right indicator
mp.keys.bind(0x27, false, () => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote("toggleIndicator", 0);
});
}