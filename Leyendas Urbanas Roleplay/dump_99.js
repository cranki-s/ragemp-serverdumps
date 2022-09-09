{
let doRender, doRender2 = false;

let coords = [
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_ring_burst_rgw', x: -562.4461, y: -230.4667, z: 70.0, scale: 0.8 }, // Delante izquierda
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_ring_burst_rgw', x: -515.3699, y: -200.4145, z: 70.0, scale: 0.8 }, // Delante derecha
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_repeat_burst_rgw', x: -537.6709, y: -184.6213, z: 70.0, scale: 0.8 }, // Atras izquierda
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_repeat_burst_rgw', x: -565.8632, y: -202.7744, z: 70.0, scale: 0.8 }, // Atras derecha
    { dic: 'proj_indep_firework_v2', part: 'scr_firework_indep_ring_burst_rwb', x: -550.5352, y: -193.2967, z: 100.0, scale: 2 }, // Central
]

mp.events.add("particulas:camapandas", () => {
    if (calcDist(new mp.Vector3(-519.2844, -248.8307, 36.27714), mp.players.local.position) > 500) return;

    for (let i = 0; i <= 16; i++) mp.game.graphics.setLightsState(i, true);

    mp.events.add('render', render_campanadas);

    mp.events.call("sound:play", "campanadas", false);

    let i = 1;

    crearTimeout(function () {
        let interval = setInterval(function () {
            doRender = true;
            crearTimeout(function () { doRender = false; }, 500);

            if (i == 13) {
                doRender = false;
                clearInterval(interval);
                mp.events.call("sound:cancel");
                mp.game.streaming.requestIpl("lurp_xmas_ny");
                doRender2 = true;
                crearTimeout(function () {
                    doRender2 = false;
                    mp.events.remove('render', render_campanadas); 
                    for (let i = 0; i <= 16; i++) mp.game.graphics.setLightsState(i, false);
                }, 6000);
                return;
            }

            i++;
        }, 3000);
    }, 13014);
});

function render_campanadas() {
    if (doRender) {
        for (let i = 0; i < 2; i++) {
            mp.game.streaming.requestNamedPtfxAsset(coords[i]['dic']);
            mp.game.graphics.setPtfxAssetNextCall(coords[i]['dic']);
            mp.game.graphics.startParticleFxNonLoopedAtCoord(coords[i]['part'], coords[i]['x'], coords[i]['y'], coords[i]['z'], 0.0, 0.0, 0.0, coords[i]['scale'], false, false, false);
            mp.game.fire.addExplosion(player_local.position.x, player_local.position.y, player_local.position.z - 10, 38, 0, true, false, 0);
        }
    }

    if (doRender2) {
        for (let coord of coords) {
            mp.game.streaming.requestNamedPtfxAsset(coord.dic);
            mp.game.graphics.setPtfxAssetNextCall(coord.dic);
            mp.game.graphics.startParticleFxNonLoopedAtCoord(coord.part, coord.x, coord.y, coord.z, 0.0, 0.0, 0.0, coord.scale, false, false, false);
            mp.game.fire.addExplosion(player_local.position.x, player_local.position.y, player_local.position.z - 10, 38, 0, true, false, 0);
        }
    }
}
}