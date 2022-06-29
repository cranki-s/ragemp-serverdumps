{
const flipDict = "anim@mp_player_intcelebrationmale@wave",
    flipAnim = "wave"

mp.game.streaming.requestAnimDict(flipDict);


/** Flip coin start, spawn at tempPos and then is attached to the bone 0 and offset.
 * So, the coin have two possibles outcomes, heads or tails.
 * toRZ control the face of the coin (180 ° change sides), then there is a 50% chance that I touched you one side or the other.
 */

mp.rpc("player:flip_coin", (playerId, face, model) => {
    let player = mp.players.atRemoteId(playerId);
    if (!mp.players.exists(player) || !player.handle) return;

    if (playerId === mp.players.local.remoteId) {
        mp.game.audio.playSound(-1,
            "Bus_Schedule_Pickup",
            "DLC_PRISON_BREAK_HEIST_SOUNDS",
            true, 0, true);

        if (!player.vehicle) {
            player.taskPlayAnim(flipDict,
                flipAnim,
                4.0, 4.0, 700, 4, 0,
                false, false, false)
        }
    }

    /** Variables */
    let x = 0.18, y = 0.42, z = 0.28;
    let toX = 0.05, toY = 0.07, toZ = 0.98;
    let rZ = 0;
    let toRX = 85, toRZ = face ? 1800 : 1980;
    let interval;
    let tempPos = player.position;

    /** Spawn under the ground */
    tempPos.z -= 15;
    let coin = mp.objects.new(model,
        tempPos,
        {
            rotation: {x: -85, y: 0, z: 180},
            dimension: player.dimension
        });

    setTimeout(() => {
        try {
            coin.attachTo(player.handle,
                0,
                0.13, 0.38, 0.19,
                -90, 0, 0,
                true, false, false, false, 0, true)

            /** Move the coin */
            interval = setInterval(() => {
                try {
                    if (!mp.objects.exists(coin) || !mp.players.exists(player) || !coin.handle || !player.handle) return stopFlip(coin, interval);

                    if (z < toZ) z += 0.02
                    if (y > toY) y -= 0.01
                    if (x > toX) x -= 0.01
                    if (toRX > 0) toRX -= 1
                    rZ += 9

                    coin.attachTo(player.handle,
                        0,
                        x, y, z,
                        toRX, 0, rZ,
                        true, false, false, false, 0, true)

                    /** The face of the coin is at 0° and the cross at 180°, so it is ensured that when you finish turning it is showing one side. */
                    if (rZ == toRZ) {
                        clearInterval(interval)
                        setTimeout(() => {
                            try {
                                coin.destroy()
                            } catch (e) {
                                stopFlip(coin, interval);
                            }
                        }, 4000);
                    }
                }
                catch (e) {
                    stopFlip(coin, interval);
                }

            }, 25);
        } catch (e) {
            stopFlip(coin, interval);
        }

    }, 500);
});

function stopFlip(obj, interval) {
    if (mp.objects.exists(obj)) obj.destroy();
    clearInterval(interval);
}
}