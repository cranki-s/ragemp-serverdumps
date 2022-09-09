{
let resyncTime = 0;

mp.rpc("player:toggle_spectate_mode", (id, targetId, position) => {
    let player = mp.players.atRemoteId(id)
    if (!player) return

    // if targetId is -1, disable spec.
    if (targetId === -1) {
        player.targetSpecId = null
        stopSpec(player)
    } else {
        let target = mp.players.atRemoteId(targetId)
        if (!mp.players.exists(target)) return

        if (position && position.x !== 0 && position.y !== 0 && position.z !== 0) {
            startSpec(player, targetId, position)
        } else mp.console.logWarning(`cant spectate ${targetId} because initial position is null or (0, 0, 0).`)
    }
})

mp.events.add("render", () => {
    if (mp.players.local.targetSpecId != null) {
        let targetSpec = mp.players.atRemoteId(mp.players.local.targetSpecId)
        if (mp.players.exists(targetSpec)) {
            if (targetSpec.handle !== 0) {
                mp.players.local.setCoords(
                    targetSpec.position.x,
                    targetSpec.position.y,
                    targetSpec.position.z,
                    false, true, true, true
                )
                mp.game.invoke("0x8BBACBF51DA047A8", targetSpec.handle) // SET_GAMEPLAY_CAM_FOLLOW_PED_THIS_UPDATE(Ped ped);
            }
        }
    }
})

function startSpec(player, targetId, position) {
    player.freezePosition(true);
    player.setVisible(false, false);
    player.setCollision(false, false);
    player.setCoords(
        position.x,
        position.y,
        position.z,
        false, true, true, true
    );
    player.targetSpecId = targetId
}

function stopSpec(player) {
    player.freezePosition(false);
    player.setInvincible(false);
    player.setVisible(true, true);
    player.setCollision(true, true);
}




}