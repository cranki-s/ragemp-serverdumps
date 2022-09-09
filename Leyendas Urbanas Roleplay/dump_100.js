{
let render, render2 = false;
let testRender1 = false;
let mainDic, mainPart, mainX, mainY, mainZ, mainScale;
let testX, testY, testZ, testScale;

let coordsc = [
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_ring_burst_rgw', x: 920.9973, y: -113.1801, z: 130.0, scale: 0.8 }, // Derecha
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_ring_burst_rgw', x: 904.4, y: -70.64237, z: 130.0, scale: 0.8 }, // Derecha cerca
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_ring_burst_rgw', x: 901.1468, y: -34.80471, z: 130.0, scale: 0.8 }, // Centro
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_ring_burst_rgw', x: 867.6439, y: -47.68419, z: 130.0, scale: 0.8 }, // Izquierda cerca
    { dic: 'proj_xmas_firework', part: 'scr_firework_xmas_ring_burst_rgw', x: 818.9875, y: -44.90736, z: 130.0, scale: 0.8 }, // Izquierda
]

mp.events.add('particulas:casino', async () => {
    if (calcDist(new mp.Vector3(943.0662, 40.73969, 112.5528), mp.players.local.position) > 1000) return;

    mp.events.add('render', render_casino);

    for (let coord of coordsc) {
        mainDic = coord.dic;
        mainPart = coord.part;
        mainX = coord.x;
        mainY = coord.y;
        mainZ = coord.z;
        mainScale = coord.scale;

        render = true;

        await timeout(3000);

        render = false;

        await timeout(1000);
    }

    coordsc.reverse();

    for (let coord of coordsc) {
        mainDic = coord.dic;
        mainPart = coord.part;
        mainX = coord.x;
        mainY = coord.y;
        mainZ = coord.z;
        mainScale = coord.scale;

        render = true;

        await timeout(3000);

        render = false;

        await timeout(1500);
    }

    await timeout(1500);

    render2 = true;

    await timeout(10000);

    render2 = false;
    mp.events.remove('render', render_casino); 
});

function timeout(ms) {
    return new Promise(resolve => crearTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
    await timeout(3000);
    return fn(...args);
}

function render_casino() {
    if (render) {
        mp.game.streaming.requestNamedPtfxAsset(mainDic);
        mp.game.graphics.setPtfxAssetNextCall(mainDic);
        mp.game.graphics.startParticleFxNonLoopedAtCoord(mainPart, mainX, mainY, mainZ, 0.0, 0.0, 0.0, mainScale, false, false, false);
        mp.game.fire.addExplosion(player_local.position.x, player_local.position.y, player_local.position.z - 10, 38, 0, true, false, 0);
    }

    if (render2) {
        for (let coord of coordsc) {
            mp.game.streaming.requestNamedPtfxAsset(coord.dic);
            mp.game.graphics.setPtfxAssetNextCall(coord.dic);
            mp.game.graphics.startParticleFxNonLoopedAtCoord(coord.part, coord.x, coord.y, coord.z, 0.0, 0.0, 0.0, coord.scale, false, false, false);
            mp.game.fire.addExplosion(player_local.position.x, player_local.position.y, player_local.position.z - 10, 38, 0, true, false, 0);
        }
    }
}
}