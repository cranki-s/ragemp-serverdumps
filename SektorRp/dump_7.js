{
//let island = JSON.parse(require('./RageServer/island.js'));
mp.game.streaming.setStreaming(true);
class HeistIslandMP {
    isLoaded = false;
    isMapLoaded = false;
    player = false;

    islandBounds = [];

    isPointInPolygon(x, y, polygon) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            return mp.gui.chat.push('Invalid latitude or longitude. Numbers are expected');
        } else if (!polygon || !Array.isArray(polygon)) {
            return mp.gui.chat.push('Invalid polygon. Array with locations expected');
        } else if (polygon.length === 0) {
            return mp.gui.chat.push('Invalid polygon. Non-empty Array expected');
        }

        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i][0];
            const yi = polygon[i][1];
            const xj = polygon[j][0];
            const yj = polygon[j][1];

            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }

    constructor() {
        this.player = mp.players.local;
        this.islandBounds.push(new Array(3326.365, -4240.541));
        this.islandBounds.push(new Array(5072.705, -3550.056));
        this.islandBounds.push(new Array(6269.617, -6009.813));
        this.islandBounds.push(new Array(4297.188,  -6994.53));

        setInterval(async () => {
            if (!this.player) return;
            const isWithinIslandBounds = this.isPointInPolygon(this.player.position.x, this.player.position.y, this.islandBounds);
            if (isWithinIslandBounds && !this.isMapLoaded) {
                if (!this.isMapLoaded) {
                    this.isMapLoaded = true;
                    mp.game.invoke("0x5E1460624D194A38", this.isMapLoaded);
                    mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", this.isMapLoaded);
                }
            } else if (!isWithinIslandBounds && this.isMapLoaded) {
                //mp.gui.chat.push("Unload this shit");
                this.isMapLoaded = false;
                mp.game.invoke("0x5E1460624D194A38", this.isMapLoaded);
                mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", this.isMapLoaded);
            }

            //if (!this.isLoaded) {
            //    this.isLoaded = true;
            //    for (var i = 0; i < island.ipls.length; i++) {
            //        mp.game.streaming.requestIpl(island.ipls[i]); // interior name(IPL)
            //    }
            //    const interior = mp.game.interior.getInteriorAtCoords(4840.571, -5174.425, 2.0);
            //    mp.game.interior.refreshInterior(interior);
            //    //const interior = mp.game.interior.getInteriorAtCoords(4439.82300000, -4461.71700000, 4.69976800); //282625
            //    //mp.game.interior.enableInteriorProp(282625, "island_hanger_padlock_props");
            //    //mp.game.interior.refreshInterior(282625);
            //    //mp.game.streaming.setInteriorActive(282625, true);
            //    //mp.game.streaming.setStreaming(true);
            //    //const isInteriorReady = mp.game.interior.isInteriorReady(282625);
            //    //mp.gui.chat.push("isInteriorReady: " + isInteriorReady);
            //    //mp.game.interior.capInterior(282625, false);
            //    //mp.game.interior.disableInterior(282625, false);
            //    //mp.game.invoke("0x2CA429C029CCF247", 282625);
            //}
        }, 100);
    }

}

const update = new HeistIslandMP()

}