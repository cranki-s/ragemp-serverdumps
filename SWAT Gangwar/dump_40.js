{
let island = JSON.parse(require('./island.js'));

class HeistIslandMP {
    isLoaded = false;
    isMapLoaded = false;
    player = false;

    constructor() {
        this.player = mp.players.local;

        mp.events.add({
            "render": () => {

                if ((this.player.position.x >= 4254.411 && this.player.position.x <= 5407.103) && (this.player.position.y >= -6808.993 && this.player.position.y <= -3564.13) && !this.isMapLoaded) {
                    this.isMapLoaded = true;
                    mp.game.invoke("0x5E1460624D194A38", this.isMapLoaded);
                } else if (!(this.player.position.x >= 4254.411 && this.player.position.x <= 5407.103) && !(this.player.position.y >= -6808.993 && this.player.position.y <= -3564.13) && this.isMapLoaded) {
                    this.isMapLoaded = false;
                    mp.game.invoke("0x5E1460624D194A38", this.isMapLoaded);
                }

                if (!this.isLoaded) {
                    this.isLoaded = true;
                    for (var i = 0; i < island.ipls.length; i++) {
                        mp.game.streaming.requestIpl(island.ipls[i]); // interior name(IPL)
                    }

                    const interior = mp.game.interior.getInteriorAtCoords(4840.571, -5174.425, 2.0);
                    mp.game.interior.refreshInterior(interior);
                }
            },
        });
    }

}

const update = new HeistIslandMP()

}