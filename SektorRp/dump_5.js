{
﻿class EntityRotator {
    start() {
        this.entity = null;
        this.fixheading = 0;
        this.activate = true;
        this.setent(mp.players.local)
    }
    startent(ent) {
        this.entity = null;
        this.fixheading = 0;
        this.activate = true;
        this.setent(ent)
    }
    stop() {
        this.activate = false;
    }
    setent(ent) {
        this.entity = ent;
        this.heading = this.entity.getHeading();
    }
    onMouseMove(dX) {
        this.fixheading = dX;
        var ent = this.entity;
        let mf = this.heading + this.fixheading;
        if (mf > 360) mf -= 360;
        ent.setHeading(mf);
    }
    pause() {
        this.heading = this.entity.getHeading();
    }
}
const EntityRotatore = new EntityRotator();
let min = null
let currect = null;

mp.events.add("render", () => {
    if (!mp.gui.cursor.visible || !EntityRotatore.activate) {
        return;
    }
    const x = mp.game.controls.getDisabledControlNormal(2, 239) * 150;
    if (mp.game.controls.isDisabledControlPressed(2, 237)) {
        if (min === null) min = x;
        if (EntityRotatore.heading === x - min) return;
        if (x === min) return;
        EntityRotatore.onMouseMove(x - min);
    }
    else {
        min = null
        EntityRotatore.pause();
    }
});
exports = EntityRotatore;
}