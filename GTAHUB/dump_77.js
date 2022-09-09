{
const carry = {
    targetSrc: -1,
    personInitCarrying: { //When a person bends down to pick up the injured
        animDict: "anim@heists@load_box",
		anim: "lift_box",
		flag: 2
    },
	personCarrying: { //When has a injured in shoulder
		animDict: "missfinale_c2mcs_1",
		anim: "fin_c2_mcs_1_camman",
		flag: 49
	},
	personCarried: { //Injured anim in shoulder
		animDict: "nm",
		anim: "firemans_carry",
		attachX: 0.25,
		attachY: 0.15,
		attachZ: 0.63,
		flag: 1
	}
}


/** Pre-load anims */
mp.game.streaming.requestAnimDict(carry.personInitCarrying.animDict);
mp.game.streaming.requestAnimDict(carry.personCarrying.animDict);
mp.game.streaming.requestAnimDict(carry.personCarried.animDict);


/** The playerId carry the targetId and start carry */
mp.rpc("player:carry_injured", (playerId, targetId, haveAnim) => {
    let player = mp.players.atRemoteId(playerId)
    let target = mp.players.atRemoteId(targetId)
    if (!mp.players.exists(player) || !mp.players.exists(target) || !player.handle || !target.handle) return;
    if(haveAnim) player.taskPlayAnim(carry.personInitCarrying.animDict, carry.personInitCarrying.anim, 4.0, 4.0, 2000, carry.personInitCarrying.flag, 0, false, false, false)
    setTimeout(() => {
        try{
            if (!mp.players.exists(player) || !mp.players.exists(target) || !player.handle || !target.handle) return;

            // only apply one animation, rage sync
            if (mp.players.local === player) player.taskPlayAnim(carry.personCarrying.animDict, carry.personCarrying.anim, 4.0, 4.0, -1, carry.personCarrying.flag, 1.0, false, false, false);
            if (mp.players.local === target) target.taskPlayAnim(carry.personCarried.animDict, carry.personCarried.anim, 4.0, 4.0, -1, carry.personCarried.flag, 1.0, false, false, false);
            target.attachTo(player.handle, 0, carry.personCarried.attachX, carry.personCarried.attachY, carry.personCarried.attachZ, 0.5, 0.5, 0, true, false, true, false, 0, true)
        } catch (e) {
            mp.console.logWarning(`cant execute event 'player:uncarry_injured' with error: ${e}`);
        }
    }, 1800);
})

/** The playerId detach targetId and stop carry */
mp.rpc("player:uncarry_injured", (playerId, targetId, haveAnim) => {
    let player = mp.players.atRemoteId(playerId);
    let target = mp.players.atRemoteId(targetId);
    if (!mp.players.exists(player) || !mp.players.exists(target) || !player.handle || !target.handle) return;
     if(haveAnim) player.taskPlayAnim(carry.personInitCarrying.animDict, carry.personInitCarrying.anim, 4.0, 4.0, 2000, carry.personInitCarrying.flag, 0, false, false, false)
     setTimeout(() => {
         try {
             if (!mp.players.exists(player) || !mp.players.exists(target) || !player.handle || !target.handle) return;
             target.clearTasks();
             player.clearTasks();
             target.detach(true, false)
         } catch(e) {
             mp.console.logWarning(`cant execute event 'player:uncarry_injured' with error: ${e}`);
         }
     }, 1700);
})

}