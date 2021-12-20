{
mp.events.add("render", () => {
    if (mp.players.local.getVariable("PLAYER_IS_ADUTY") == false) return;
    mp.vehicles.forEachInStreamRange(
        (vehicle) => {
            let textpos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(vehicle.position.x, vehicle.position.y, vehicle.position.z));
            let vehtoplayer = mp.game.system.vdist(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, vehicle.position.x, vehicle.position.y, vehicle.position.z)

            if (textpos && (vehtoplayer / 2) < 10 && vehicle != mp.players.local.vehicle) {
                drawText(`Health: ${vehicle.getEngineHealth().toFixed(2)} - Distance: ${(vehtoplayer / 2).toFixed(2)}`, [textpos.x, textpos.y], { align: 1, font: 4, scale: 0.3, outline: true, shadow: true, color: [54, 137, 217, 255] });
            }
        }
    )

    mp.players.forEachInStreamRange(
        (player) => {
            let playerPos = player.position;
            let localPos = mp.players.local.position;
            let playertoplayer = mp.game.system.vdist(localPos.x, localPos.y, localPos.z, playerPos.x, playerPos.y, playerPos.z)
            if ((playertoplayer / 2) < 75 && player != mp.players.local) {
                mp.game.invoke("0x6B7256074AE34680", localPos.x, localPos.y, localPos.z, playerPos.x, playerPos.y, playerPos.z, 255, 255, 255, 255)

                let textpos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(playerPos.x, playerPos.y, playerPos.z));

                if (textpos) {
                    drawText(`${player.name} (${mp.player.local.getVariable("PLAYER_ACCOUNT_ID")})\n${player.getHealth()} ${player.getArmour()}`, [textpos.x, textpos.y], { align: 1, font: 4, scale: 0.3, outline: true, shadow: true, color: [255, 255, 255, 255] });
                }
            }
        }
    )
});

const drawText = (text, position, options) => {
    options = {... { align: 1, font: 4, scale: 0.3, outline: true, shadow: true, color: [255, 255, 255, 255] }, ...options };

    const ui = mp.game.ui;
    const font = options.font;
    const scale = options.scale;
    const outline = options.outline;
    const shadow = options.shadow;
    const color = options.color;
    const wordWrap = options.wordWrap;
    const align = options.align;
    ui.setTextEntry("CELL_EMAIL_BCON");
    for (let i = 0; i < text.length; i += 99) {
        const subStringText = text.substr(i, Math.min(99, text.length - i));
        mp.game.ui.addTextComponentSubstringPlayerName(subStringText);
    }

    ui.setTextFont(font);
    ui.setTextScale(scale, scale);
    ui.setTextColour(color[0], color[1], color[2], color[3]);

    if (shadow) {
        mp.game.invoke('0x1CA3E9EAC9D93E5E');
        ui.setTextDropshadow(2, 0, 0, 0, 255);
    }

    if (outline) {
        mp.game.invoke('0x2513DFB0FB8400FE');
    }

    switch (align) {
        case 1:
            {
                ui.setTextCentre(true);
                break;
            }
        case 2:
            {
                ui.setTextRightJustify(true);
                ui.setTextWrap(0.0, position[0] || 0);
                break;
            }
    }

    if (wordWrap) {
        ui.setTextWrap(0.0, (position[0] || 0) + wordWrap);
    }

    ui.drawText(position[0] || 0, position[1] || 0);
}

const controlsIds = {
    F7: 0x76,
    W: 32,
    S: 33,
    A: 34,
    D: 35,
    Space: 321,
    LCtrl: 326,
    LMB: 24,
    RMB: 25
};

global.fly = {
    flying: false,
    f: 2.0,
    w: 2.0,
    h: 2.0,
    point_distance: 1000,
};
global.gameplayCam = mp.cameras.new('gameplay');

let direction = null;
let coords = null;
let rotation = null;

function pointingAt(distance) {
    const farAway = new mp.Vector3((direction.x * distance) + (coords.x), (direction.y * distance) + (coords.y), (direction.z * distance) + (coords.z));

    const result = mp.raycasting.testPointToPoint(coords, farAway, [1, 16]);
    if (result === undefined) {
        return 'undefined';
    }
    return result;
}

mp.keys.bind(118, false, function() {

    const controls = mp.game.controls;
    const fly = global.fly;
    direction = global.gameplayCam.getDirection();
    coords = global.gameplayCam.getCoord();

    fly.flying = !fly.flying;

    const player = mp.players.local;

    if (mp.players.local.vehicle) {
        //mp.players.local.vehicle.setInvincible(fly.flying)
        mp.players.local.vehicle.freezePosition(fly.flying)
        mp.players.local.vehicle.setAlpha(fly.flying ? 200 : 255)
    } else {
        //player.setInvincible(fly.flying);
        player.freezePosition(fly.flying);
        player.setAlpha(fly.flying ? 200 : 255);
    }

    if (!fly.flying && !controls.isControlPressed(0, controlsIds.Space)) {
        const position = mp.players.local.position;
        position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);

        if (mp.players.local.vehicle) {
            mp.players.local.vehicle.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        } else {
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }
    }
});

mp.events.add('render', () => {
    if (fly.flying) {
        const controls = mp.game.controls;
        const fly = global.fly;
        direction = global.gameplayCam.getDirection();
        coords = global.gameplayCam.getCoord();
        rotation = global.gameplayCam.getRot(1);

        let updated = false;
        const position = mp.players.local.position;
        var speed;


        if (mp.players.local.vehicle) {
            mp.players.local.vehicle.setRotation(rotation.x, rotation.y, rotation.z, 1, true);
        } else {
            mp.players.local.setRotation(rotation.x, rotation.y, rotation.z, 1, true);
        }

        if (controls.isControlPressed(0, controlsIds.LMB)) {
            speed = 1.0
        } else if (controls.isControlPressed(0, controlsIds.RMB)) {
            speed = 0.02
        } else {
            speed = 0.2
        }

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
        if (updated) {
            if (mp.players.local.vehicle) {
                mp.players.local.vehicle.setCoordsNoOffset(position.x, position.y, position.z, true, true, true)
            } else {
                mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, true, true, true);
            }
        }
    }
});
}