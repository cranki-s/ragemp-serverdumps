{
const LocalPlayer = mp.players.local;
let aimingAtPed;

setInterval(() => {
    /* ADD SOME SANITY CHECKS, NO NEED TO RUN ALWAYS */
    const aimingAt = mp.game.player.getEntityIsFreeAimingAt();

    if (aimingAt == undefined && aimingAtPed != undefined) {
        mp.events.callRemote("SET_PED_AIMED_AT", aimingAtPed.remoteId, false);
        aimingAtPed = undefined;
        return;
    }

    if (aimingAt === undefined || typeof aimingAt !== "number") return;
    aimingAtPed = mp.peds.atHandle(aimingAt);
    if (!aimingAtPed) return;
    mp.events.callRemote("SET_PED_AIMED_AT", aimingAtPed.remoteId, true);
}, 1000);


mp.events.add("PLAY_ANIM_ON_PED", async (pedId, animDict, animName) => {
    const ped = mp.peds.at(pedId);
    if (!mp.peds.exists(ped)) return;
    if (!mp.game.streaming.hasAnimDictLoaded(animDict)) {

        mp.game.streaming.requestAnimDict(animDict);
        while (!mp.game.streaming.hasAnimDictLoaded(animDict)) await mp.game.waitAsync(15);
    }

    ped.taskPlayAnim(animDict, animName, 8.0, 1, -1, 1, 0.0, false, false, false);
})

mp.events.add("STOP_ANIM_ON_PED", (pedId) => {
    const ped = mp.peds.at(pedId);
    if (!mp.peds.exists(ped)) return;
    ped.clearTasks();
})
}