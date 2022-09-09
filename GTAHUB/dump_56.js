{
mp.rpc("player:set_admin_duty", (id, duty, showLabel) => {
    let staff = mp.players.atRemoteId(id)
    if (!staff) return

    staff.duty = duty
    staff.showLabel = showLabel
})

mp.events.add("render", () => {
    let p = mp.players.local

    // Draw info about players if admin is duty
    if (p.duty) {
        mp.players.forEachInStreamRange(p2 => {
            if (!mp.players.exists(p2) || !p2.handle) return;

            if (p !== p2) {
                let userInfo = getColor(p2)
                userInfo += `ID ${p2.remoteId} ${p2.name.replace("_", " ")} ${p2.getHealth()}HP`
                if(p2.weapon !== 2725352035) {
                    userInfo += ` ${p2.getAmmoInClip(p2.weapon)}WA`
                }
                if (p2.getSpeed() * 3.6 > 26) {
                    userInfo += ` ${(p2.getSpeed() * 3.6).toFixed(0)}KMH`
                }
                if(p2.vehicle) {
                    userInfo += ` ${p2.vehicle.getEngineHealth()}VH`
                }
                mp.game.graphics.drawText(
                    userInfo,
                    [p2.position.x, p2.position.y, p2.position.z],
                    {
                        font: 2,
                        color: [255, 255, 255, 190],
                        scale: [0.35, 0.35],
                        outline: true,
                    });
            }
        });
    }

    // Draw STAFF in admin heads
    mp.players.forEachInStreamRange(p2 => {
        if (!mp.players.exists(p2) || !p2.handle) return;

        if (p !== p2 && p2.duty && p2.showLabel) {
            if (mp.game.system.vdist2(p.position.x, p.position.y, p.position.z, p2.position.x, p2.position.y, p2.position.z) > 100) return;

            mp.game.graphics.drawText(
                "STAFF",
                [p2.position.x, p2.position.y, p2.position.z + 1.1],
                {
                    font: 0,
                    color: [255, 255, 255, 200],
                    scale: [0.3, 0.3],
                    outline: true,
                });
        }
    });
})

/** Colors:
 * Red: shooting
 * Orange: aiming
 * Yellow: weapon selected
 * Green: in combat
 * White: normal state
 */
function getColor(user) {
    if (user.getConfigFlag(58, true) && user.weapon !== 2725352035) {
        return `~r~`
    }
    else if(user.getConfigFlag(78, true)) {
        return `~o~`
    }
    else if(user.weapon !== 2725352035) {
        return `~y~`
    }
    else if(user.isInMeleeCombat() || user.isUsingActionMode()) {
        return `~g~`
    }
    else return `~w~`
}

function getGroundZ(pos) {
    return new Promise((resolve, reject) => {
        let newZ = 0;
        let interval = setInterval( async () => {
            newZ++
            pos.z = mp.game.gameplay.getGroundZFor3dCoord(pos.x, pos.y, newZ * 1000, 0, false)
            if (pos.z % 1 !== 0 || newZ >= 5) {
                pos.z += 2
                clearInterval(interval)
                resolve(pos)
            }
        }, 500)
    })
}

mp.events.add("playerCreateWaypoint", async (position) => {
    if (mp.players.local.duty) {
        mp.players.local.position = position;
        mp.players.local.freezePosition(true)
        let newPos = await getGroundZ(position)
        mp.players.local.freezePosition(false)
        mp.players.local.position = newPos;
    }
});
}