{
﻿// credits to ragempdev

const controlsIds = {
    F11: 0x7A,
    W: 32,
    S: 33,
    A: 34,
    D: 35, 
    Space: 321,
    LCtrl: 326,
    LMB: 24,
	RMB: 25,
		V: 0x56
};

global.fly = {
    flying: false, f: 2.0, w: 2.0, h: 2.0, point_distance: 1000,
};
global.gameplayCam = mp.cameras.new('gameplay');

let rot = 0;
mp.game.entity.createModelHideExcludingScriptObjects(1100.077,219.9723,-50.04865, 10.0, 2733879850, true);
let podium = mp.objects.new(2733879850, new mp.Vector3(1100.077,219.9723,-50.084865));
let carcasin = mp.objects.new(mp.game.joaat("imp_prop_covered_vehicle_01a"), new mp.Vector3(1100.077,219.9723,-49.87865));
carcasin.doNotChangeAlpha = true;
carcasin.freezePosition(true);
let rotatePodiumColshape = mp.colshapes.newSphere(1100.077,219.9723,-50.04865, 50.0);
mp.events.add("playerEnterColshape", (shape) => {

	if(shape == rotatePodiumColshape)
	{
		mp.events.add("render", rotate);
	}
});
mp.events.add("playerExitColshape", (shape) => {

	if(shape == rotatePodiumColshape)
	{
		mp.events.remove("render", rotate);
	}
});
function rotate()
{
	rot+=0.05;
	if(rot >= 360) rot = 0;
	podium.rotation = new mp.Vector3(0, 0, rot);
	carcasin.setHeading(rot);
}
let direction = null;
let coords = null;
var isLoaded = false;

function createGlobalEventColshape(a, b, c, d, e) {
    const f = mp.colshapes.newCircle(a, b, c, -1);
    f.__eventShape = [d, e]
}
mp.events.add("playerEnterColshape", function(a) {
    a.__eventShape != null && a.__eventShape[0]()
}), 
mp.events.add("playerExitColshape", function(a) {
    a.__eventShape != null && a.__eventShape[1]()
}), 
createGlobalEventColshape(-1114.88, 306.84, 200, () => {
    mp.game.streaming.requestIpl("bh1_47_joshhse_unburnt")
}, 
() => {
    mp.game.streaming.removeIpl("bh1_47_joshhse_unburnt")
}), 
createGlobalEventColshape(32.02, 3737.35, 200, () => {
    mp.game.streaming.requestIpl("methtrailer_grp1")
}, 
() => {
    mp.game.streaming.removeIpl("methtrailer_grp1")
});
mp.game.streaming.removeIpl("bkr_bi_hw1_13_int"), 
mp.game.streaming.requestIpl("ch1_02_closed"), 
mp.game.streaming.requestIpl("dt1_05_hc_remove");
let officeIplList = ["ex_dt1_02_office_02b", "ex_dt1_11_office_02b", "ex_sm_13_office_02b", "ex_sm_15_office_02b"];
mp.game.streaming.requestIpl("ex_dt1_02_office_02b"), 
mp.game.streaming.requestIpl("ex_dt1_11_office_02b"), 
mp.game.streaming.requestIpl("ex_sm_13_office_02b"), 
mp.game.streaming.requestIpl("ex_sm_15_office_02b"), 
mp.game.streaming.requestIpl("sf_fixeroffice_bh1_05"), 
mp.game.streaming.requestIpl("sf_fixeroffice_kt1_08");
let islandTimeoutUnload = null;
let isIslandLoaded = false;
let islandTimeoutLoad = null;
createGlobalEventColshape(4840.571, -5174.425, 2374, () => {
    isIslandLoaded || (isIslandLoaded = !0, mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", isIslandLoaded), 
    mp.game.invoke("0x5E1460624D194A38", isIslandLoaded), 
    null != islandTimeoutUnload && (clearTimeout(islandTimeoutUnload), islandTimeoutUnload = null), 
    null != islandTimeoutLoad && (clearTimeout(islandTimeoutLoad), islandTimeoutLoad = null), 
    islandTimeoutLoad = setTimeout(() => {
        mp.game.streaming.removeIpl("h4_islandx_sea_mines"), islandTimeoutLoad = null
    }, 2e3))
}, 
() => {
    isIslandLoaded && (isIslandLoaded = !1, mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", isIslandLoaded), 
    mp.game.invoke("0x5E1460624D194A38", isIslandLoaded), 
    null != islandTimeoutUnload && (clearTimeout(islandTimeoutUnload), 
    islandTimeoutUnload = null), null != islandTimeoutLoad && (clearTimeout(islandTimeoutLoad), islandTimeoutLoad = null), 
    islandTimeoutUnload = setTimeout(() => {
        mp.game.streaming.requestIpl("h4_islandx_terrain_03_lod"), 
        mp.game.streaming.requestIpl("h4_islandx_terrain_04_slod"), 
        mp.game.streaming.requestIpl("h4_islandx_terrain_05_slod");
        const a = mp.game.interior.getInteriorAtCoords(4840.571, -5174.425, 2);
        mp.game.interior.refreshInterior(a), islandTimeoutUnload = null
    }, 1550));
})
setTimeout(() => {
    mp.game.streaming.requestIpl("h4_islandx_terrain_03_lod"), 
    mp.game.streaming.requestIpl("h4_islandx_terrain_04_slod"), 
    mp.game.streaming.requestIpl("h4_islandx_terrain_05_slod")
}, 10000);
mp.events.add("playerQuit", a => {
    isIslandLoaded && a === mp.players.local && (mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", !1), mp.game.invoke("0x5E1460624D194A38", !1))
});
// mp.events.add("Island", (toggle) => {
//         if(isLoaded == false){
//             isLoaded = true;
//             mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", true);
// 			mp.game.invoke("0x5E1460624D194A38", true);
//         }else{
//             mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", false);
// 			mp.game.invoke("0x5E1460624D194A38", false);
//             isLoaded = false;
//         }
//     });
function pointingAt(distance) {
    const farAway = new mp.Vector3((direction.x * distance) + (coords.x), (direction.y * distance) + (coords.y), (direction.z * distance) + (coords.z));

    const result = mp.raycasting.testPointToPoint(coords, farAway, [1, 16]);
    if (result === undefined) {
        return 'undefined';
    }
    return result;
}

mp.events.add("AGM", (toggle) => {
	admingm = toggle;
	localplayer.setInvincible(toggle);
	mp.game.graphics.notify(toggle ? 'GM: ~g~Enabled' : 'GM: ~r~Disabled');
});


mp.events.add("Carroomagm", (toggle) => {
	admingm = toggle;
	localplayer.setInvincible(toggle);
});


mp.keys.bind(Keys.VK_F9, false, function () {
    if (!loggedin || localplayer.getVariable('IS_ADMIN') !== true || localplayer.getVariable('seats') == true) return;

    const controls = mp.game.controls;
    const fly = global.fly;
    direction = global.gameplayCam.getDirection();
    coords = global.gameplayCam.getCoord();

    fly.flying = !fly.flying;

    const player = mp.players.local;

    if(!admingm) player.setInvincible(fly.flying);
    player.freezePosition(fly.flying);
    player.setAlpha(fly.flying ? 0 : 255);

    if (!fly.flying && !controls.isControlPressed(0, controlsIds.Space)) {
        const position = mp.players.local.position;
        position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
        mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
    }

    NewEvent.callRemote('invisible', fly.flying);
    mp.game.graphics.notify(fly.flying ? 'Fly: ~g~Enabled' : 'Fly: ~r~Disabled');
});

mp.events.add('render', () => {
    if (fly.flying) {
        const controls = mp.game.controls;
        const fly = global.fly;
        direction = global.gameplayCam.getDirection();
        coords = global.gameplayCam.getCoord();

        let updated = false;
        const position = mp.players.local.position;
		var speed;
        if(controls.isControlPressed(0, controlsIds.LMB)) speed = 1.0
		else if(controls.isControlPressed(0, controlsIds.RMB)) speed = 0.02
		else speed = 0.2
		if (controls.isControlPressed(0, controlsIds.W)) {
            if (fly.f < 8.0) fly.f *= 1.025;
            position.x += direction.x * fly.f * speed;
            position.y += direction.y * fly.f * speed;
            position.z += direction.z * fly.f * speed;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.S)) {
            if (fly.f < 8.0) fly.f *= 1.025;
            position.x -= direction.x * fly.f * speed;
            position.y -= direction.y * fly.f * speed;
            position.z -= direction.z * fly.f * speed;
            updated = true;
        } else fly.f = 2.0;
        if (controls.isControlPressed(0, controlsIds.A)) {
            if (fly.l < 8.0) fly.l *= 1.025;
            position.x += (-direction.y) * fly.l * speed;
            position.y += direction.x * fly.l * speed;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.D)) {
            if (fly.l < 8.0) fly.l *= 1.05;
            position.x -= (-direction.y) * fly.l * speed;
            position.y -= direction.x * fly.l * speed;
            updated = true;
        } else fly.l = 2.0;
        if (controls.isControlPressed(0, controlsIds.Space)) {
            if (fly.h < 8.0) fly.h *= 1.025;
            position.z += fly.h * speed;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.LCtrl)) {
            if (fly.h < 8.0) fly.h *= 1.05;
            position.z -= fly.h * speed;
            updated = true;
        } else fly.h = 2.0;
        if (updated) mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
    }
});

mp.events.add('getCamCoords', (name) => {
    NewEvent.callRemote('saveCamCoords', JSON.stringify(coords), JSON.stringify(pointingAt(fly.point_distance)), name);
});

}