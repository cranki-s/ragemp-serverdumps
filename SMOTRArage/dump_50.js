{
﻿// credits to ragempdev
var flyAdmin = false;

const controlsIds = {
    F6: 0x75,
    W: 32, // 232
    S: 33, // 31, 219, 233, 268, 269
    A: 34, // 234
    D: 35, // 30, 218, 235, 266, 267
    Space: 321,
    LCtrl: 326,
    Shift: 21
};

var fly = {
    flying: false, f: 2.0, w: 2.0, h: 2.0, point_distance: 1000,
};
global.gameplayCam = mp.cameras.new('gameplay');

let direction = null;
let coords = null;

function pointingAt(distance) {
    const farAway = new mp.Vector3((direction.x * distance) + (coords.x), (direction.y * distance) + (coords.y), (direction.z * distance) + (coords.z));

    const result = mp.raycasting.testPointToPoint(coords, farAway, [1, 16]);
    if (result === undefined) {
        return 'undefined';
    }
    return result;
}

mp.keys.bind(controlsIds.F6, false, function () { // F6 key
    //if (!loggedin || localPlayer.getVariable('IS_ADMIN') !== true) return;
	if(!flyAdmin) return false;
	
    const controls = mp.game.controls;
    direction = global.gameplayCam.getDirection();
    coords = global.gameplayCam.getCoord();

    fly.flying = !fly.flying;

    const player = mp.players.local;

    player.setInvincible(fly.flying);
    player.freezePosition(fly.flying);
    player.setAlpha(fly.flying ? 0 : 255);

	if (!fly.flying && !controls.isControlPressed(0, controlsIds.Space)) {
		mp.events.call("sleepAntiCheat");
		const position = mp.players.local.position;
		position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
		mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
	}

	mp.game.graphics.notify(fly.flying ? 'Fly: ~g~Enabled' : 'Fly: ~r~Disabled');
});

mp.events.add('render', () => {
    if (fly.flying) {
        const controls = mp.game.controls;
        direction = global.gameplayCam.getDirection();
        coords = global.gameplayCam.getCoord();

        let updated = false;
        const position = mp.players.local.position;

        var speed = (controls.isControlPressed(0, controlsIds.Shift)) ? 0.5 : 0.025;

        if (controls.isControlPressed(0, controlsIds.W)) {
            if (fly.f < 8.0) { fly.f *= 1.025; }

            position.x += direction.x * fly.f * speed;
            position.y += direction.y * fly.f * speed;
            position.z += direction.z * fly.f * speed;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.S)) {
            if (fly.f < 8.0) { fly.f *= 1.025; }

            position.x -= direction.x * fly.f * speed;
            position.y -= direction.y * fly.f * speed;
            position.z -= direction.z * fly.f * speed;
            updated = true;
        } else {
            fly.f = 2.0;
        }

        if (controls.isControlPressed(0, controlsIds.A)) {
            if (fly.l < 8.0) { fly.l *= 1.025; }

            position.x += (-direction.y) * fly.l * speed;
            position.y += direction.x * fly.l * speed;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.D)) {
            if (fly.l < 8.0) { fly.l *= 1.05; }

            position.x -= (-direction.y) * fly.l * speed;
            position.y -= direction.x * fly.l * speed;
            updated = true;
        } else {
            fly.l = 2.0;
        }

        if (controls.isControlPressed(0, controlsIds.Space)) {
            if (fly.h < 8.0) { fly.h *= 1.025; }

            position.z += fly.h;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.LCtrl)) {
            if (fly.h < 8.0) { fly.h *= 1.05; }

            position.z -= fly.h;
            updated = true;
        } else {
            fly.h = 2.0;
        }

        if (updated) {
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }
    }
});

function differenceBetweenAnglesRadians(firstAngle, secondAngle) {
	let difference = secondAngle - firstAngle;
	if(difference > Math.PI) 
		difference = difference - Math.PI * 2;
	else if(difference < -Math.PI)
		difference = difference + Math.PI * 2;
	return difference
}

/*
mp.events.add('getCamCoords', (name) => {
    mp.events.callRemote('saveCamCoords', JSON.stringify(coords), JSON.stringify(pointingAt(fly.point_distance)), name);
});
*/
}