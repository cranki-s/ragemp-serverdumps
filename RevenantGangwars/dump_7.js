{
let disableFire = undefined;

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player" && entity.getVariable("spawnProtection")) {
        entity.setInvincible(true);
    }
});

mp.events.addDataHandler("spawnProtection", (entity, value) => {
    if (entity.type === "player") entity.setInvincible(value === true);
});

mp.events.add('render', () => {
    if (disableFire) {
        mp.game.controls.disableControlAction(32, 25, true);
    }
});

mp.events.add("setDisableFire", () => {
    disableFire = true;
    setTimeout(() => {
        disableFire = false;
    }, 3000);
});
}