{
let spectate = false,
    localplayer = mp.players.local,
    spectatecamera = null,
    spectatetarget = null,
    savedposition = null;

mp.events.add("client:admin:startspectate", (targetplayer) => {
    if (spectate == false) {
        if (targetplayer != null) {
            spectate = true;
            spectatetarget = targetplayer;
            localplayer.setAlpha(0);
            localplayer.freezePosition(true);
            mp.game.ui.displayRadar(false);
            savedposition = mp.players.local.position;
            //mp.players.local.setVariable("PLAYER_ADUTY_INVISIBLE", true)

            setTimeout(() => {
                let targetpos = targetplayer.position
                let targetforward = targetplayer.getForwardVector();
                spectatecamera = mp.cameras.new("spectatecam", new mp.Vector3(targetpos.x - targetforward.x * 2, targetpos.y - targetforward.y * 2, targetpos.z + 1), new mp.Vector3(0, 0, 0), 90);
                spectatecamera.pointAt(targetplayer.handle, 0, 0, 0, false);
                spectatecamera.setActive(true);
                mp.game.cam.renderScriptCams(true, false, 0, true, false);
            }, 100);
        }
    } else {
        spectate = false;
        localplayer.freezePosition(false);
        localplayer.resetAlpha();
        mp.game.cam.renderScriptCams(false, false, 0, true, true);
        spectatecamera.setActive(false);
        spectatecamera.destroy();
        mp.game.cam.destroyAllCams(true);
        spectatecamera = null;
        spectatetarget = null
        mp.game.ui.displayRadar(true);
        mp.players.local.position = savedposition;
        setTimeout(() => {
            savedposition = null;
        }, 100);
        //mp.players.local.setVariable("PLAYER_ADUTY_INVISIBLE", false)
    }
})

mp.events.add("render", () => {
    if (spectatecamera && spectatetarget != null) {
        let targetpos = spectatetarget.position
        let targetforward = spectatetarget.getForwardVector();
        mp.players.local.position = new mp.Vector3(targetpos.x, targetpos.y, targetpos.z - 50);
        spectatecamera.setCoord(targetpos.x - targetforward.x * 2, targetpos.y - targetforward.y * 2, targetpos.z + 1);
    }
})

mp.events.add('entityStreamIn', (entity) => {
    if (entity.getVariable('PLAYER_ADUTY_INVISIBLE') === true) {
        entity.setAlpha(0);
    } else {
        entity.resetAlpha();
    }
});
}