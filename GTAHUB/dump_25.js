{
// Script by: https://rage.mp/forums/topic/995-updated-sirens-silencer/

let localPlayer = mp.players.local;

mp.keys.bind(0x51, true, () => {
    if (mp.gui.cursor.visible) return;
    if (localPlayer.vehicle && localPlayer.vehicle.getPedInSeat(-1) === localPlayer.handle && localPlayer.vehicle.getClass() === 18) {
        localPlayer.vehicle.getVariable('sirenSound') ? mp.game.graphics.notify(`Sonido de sirenas ~b~activado.`) : mp.game.graphics.notify(`Sonido de sirenas ~b~desactivado.`);
        mp.events.originalCallRemote('vehicles:sirens_sync', localPlayer.vehicle)
    }
});

mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'vehicle' && entity.getClass() === 18 && entity.hasVariable('sirenSound')) {
        entity.setSirenSound(entity.getVariable('sirenSound'))
    }
});

mp.events.addDataHandler("sirenSound", (entity, value) => {
    if (entity.type === "vehicle" && entity.handle) entity.setSirenSound(value);
});
}