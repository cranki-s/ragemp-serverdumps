{

class HeistIslandMP {
    isLoaded = false;
    isMapLoaded = false;
    player = false;

    islandBounds = [];

    isPointInPolygon(x, y, polygon) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            return mp.gui.chat.push('Invalid latitude or longitude. Numbers are expected')
        } else if (!polygon || !Array.isArray(polygon)) {
            return mp.gui.chat.push('Invalid polygon. Array with locations expected')
        } else if (polygon.length === 0) {
            return mp.gui.chat.push('Invalid polygon. Non-empty Array expected')
        }

        let inside = false
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i][0];
            const yi = polygon[i][1]
            const xj = polygon[j][0];
            const yj = polygon[j][1]

            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
            if (intersect) inside = !inside
        }

        return inside
    };

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
                this.isMapLoaded = true;
                mp.game.invoke("0x5E1460624D194A38", this.isMapLoaded);
				
				const interior = mp.game.interior.getInteriorAtCoords(4840.571, -5174.425, 2.0);
                mp.game.interior.refreshInterior(interior);
				
            } else if (!isWithinIslandBounds && this.isMapLoaded) {
                this.isMapLoaded = false;
                mp.game.invoke("0x5E1460624D194A38", this.isMapLoaded);
            }
			

        }, 500);
    }

}

const update = new HeistIslandMP()

}