{
let wheel = mp.objects.new(mp.game.joaat('vw_prop_vw_luckywheel_02a'), new mp.Vector3(1111.05, 229.81, -49.15), { dimension: 10 });
wheel.setHeading(-30);

mp.events.add({
    "casino.luckywheel.roll": (playerId, index) => {
        wheel.setRotation(0.0, 0.0, 0.0, 1, true);
        let player = mp.players.atRemoteId(playerId);
        let pos = new mp.Vector3(1109.55, 228.88, -49.64);
        let dict = getAnimDict(player);
        mp.game.streaming.requestAnimDict(dict);
        player.taskGoStraightToCoord(pos.x, pos.y, pos.z, 1.0, -1, 312.2, 0.0);

        setTimeout(() => {
            if (player === mp.players.local) disablePlayerMoving(true);
			player.freezePosition(true);
			player.heading = 320.2;
            player.taskPlayAnim(dict, 'enter_right_to_baseidle', 8.0, -8.0, -1, 0, 0, false, false, false);
            let ready = false;
            while (!ready) {
                if (!isEntityPlayingAnim(player, dict, 'enter_right_to_baseidle')) {
                    ready = true;
                }
            }
            player.taskPlayAnim(dict, 'enter_to_armraisedidle', 8.0, -8.0, -1, 0, 0, false, false, false);
            ready = false;
            while (!ready) {
                if (!isEntityPlayingAnim(player, dict, 'enter_to_armraisedidle')) {
                    ready = true;
                }
            }
            player.taskPlayAnim(dict, 'armraisedidle_to_spinningidle_high', 8.0, -8.0, -1, 0, 0, false, false, false);
            
            let y = 0;
            let count = 60 + index;
            let val = 1;
            let rollTimer = setInterval(() => {
				if (player != null)
					player.heading = 320.2;
                if (count > 0) {
                    if (count < 8) val = 4;
                    else if (count < 30) val = 2;
                    y += 18 / val;
                    count -= 1 / val;
                    wheel.setRotation(0.0, y, 0.0, 1, true);
                } else {
				   clearInterval(rollTimer);
                    player.freezePosition(false);
                    if (player === mp.players.local) {
                        disablePlayerMoving(false);
                        mp.events.callRemote('casino.luckywheel.roll.finish');
                    }
                }
            }, 50);
        }, 2000);
    },
});

function isEntityPlayingAnim(entity, dict, name, p = 3) {
        return mp.game.invoke('0x1F0B79228E461EC9', entity, dict, name, p);
}

function disablePlayerMoving(disable) {
        playerMovingDisabled = disable;
}

function getAnimDict(player) {
    return mp.game.joaat("mp_m_freemode_01") == player.model ?
        'anim_casino_a@amb@casino@games@lucky7wheel@male' : 'anim_casino_a@amb@casino@games@lucky7wheel@female';
}



}