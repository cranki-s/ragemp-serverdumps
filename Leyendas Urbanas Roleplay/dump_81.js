{
/* --------------------------------------------------------------------------------
 * senalar.js
 *
 * Autor: etrex2k4
 *
 * Descripción: Uso de la tecla L para señalar un punto
 * -------------------------------------------------------------------------------- */

//Fingerpointing
var pointing =
{
    active: false,
    interval: null,
    lastSent: 0,
    start: async function () {
        if (!this.active) {
            this.active = true;

            mp.game.streaming.requestAnimDict("anim@mp_point");

            while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
                await mp.game.waitAsync(0);
            }

            mp.game.invoke("0x0725A4CCFDED9A70", player_local.handle, false, true, true, true);
            player_local.setConfigFlag(36, true);
            player_local.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
            mp.game.streaming.removeAnimDict("anim@mp_point");

            this.interval = setInterval(this.process.bind(this), 0);
        }
    },

    stop: function () {
        if (this.active) {
            clearInterval(this.interval);
            this.interval = null;

            this.active = false;

            mp.game.invoke("0xD01015C7316AE176", player_local.handle, "Stop");

            if (!player_local.isInAnyVehicle(true))
                mp.game.invoke("0x0725A4CCFDED9A70", player_local.handle, true, true, true, true);

            player_local.setConfigFlag(36, false);
            player_local.clearTasks();
        }
    },

    gameplayCam: mp.cameras.new("gameplay"),
    lastSync: 0,

    getRelativePitch: function () {
        let camRot = this.gameplayCam.getRot(2);

        return camRot.x - player_local.getPitch();
    },

    process: function () {
        if (this.active) {
            mp.game.invoke("0x921CE12C489C4C41", player_local.handle);

            let camPitch = this.getRelativePitch();

            if (camPitch < -70.0) {
                camPitch = -70.0;
            }
            else if (camPitch > 42.0) {
                camPitch = 42.0;
            }
            camPitch = (camPitch + 70.0) / 112.0;

            let camHeading = mp.game.cam.getGameplayCamRelativeHeading();

            let cosCamHeading = mp.game.system.cos(camHeading);
            let sinCamHeading = mp.game.system.sin(camHeading);

            if (camHeading < -180.0) {
                camHeading = -180.0;
            }
            else if (camHeading > 180.0) {
                camHeading = 180.0;
            }
            camHeading = (camHeading + 180.0) / 360.0;

            let coords = player_local.getOffsetFromGivenWorldCoords((cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6);
            let r = mp.raycasting.testPointToPoint([coords.x, coords.y, coords.z - 0.2], [coords.x, coords.y, coords.z + 0.2], player_local, 7);
            let blocked = (typeof r !== 'undefined');
            if (r) limpiarHandleRaycast(r.entity);
            mp.game.invoke('0xD5BB4025AE449A4E', player_local.handle, "Pitch", camPitch);
            mp.game.invoke('0xD5BB4025AE449A4E', player_local.handle, "Heading", camHeading * -1.0 + 1.0);
            mp.game.invoke('0xB0A6CFD2C69C1088', player_local.handle, "isBlocked", blocked);
            let primeraPersona = mp.game.invoke('0x8D4D46230B2C353A');
            mp.game.invoke('0xB0A6CFD2C69C1088', player_local.handle, "isFirstPerson", (primeraPersona == 4));

            if ((Date.now() - this.lastSent) > 100) {
                this.lastSent = Date.now();
                mp.events.callRemote("fpsync.update", camPitch, camHeading);
            }
        }
    }
}

mp.events.add("fpsync.update", async (id, camPitch, camHeading) => {
    let netPlayer = getPlayerByRemoteId(parseInt(id));
    if (netPlayer !== null) {
        if (netPlayer !== player_local) {
            netPlayer.lastReceivedPointing = Date.now();

            if (!netPlayer.pointingInterval) {
                netPlayer.pointingInterval = setInterval((function () {
                    if ((Date.now() - netPlayer.lastReceivedPointing) > 1000) {
                        clearInterval(netPlayer.pointingInterval);

                        netPlayer.lastReceivedPointing = undefined;
                        netPlayer.pointingInterval = undefined;

                        if (netPlayer.handle != null || netPlayer.handle != undefined) mp.game.invoke("0xD01015C7316AE176", netPlayer.handle, "Stop");


                        if (!netPlayer.isInAnyVehicle(true)) {
                            mp.game.invoke("0x0725A4CCFDED9A70", netPlayer.handle, true, true, true, true);
                        }
                        netPlayer.setConfigFlag(36, false);

                    }
                }).bind(netPlayer), 500);
                
                mp.game.streaming.requestAnimDict("anim@mp_point");

                while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
                    await mp.game.waitAsync(0);
                }

                mp.game.invoke("0x0725A4CCFDED9A70", netPlayer.handle, false, true, true, true);
                netPlayer.setConfigFlag(36, true)
                netPlayer.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
                mp.game.streaming.removeAnimDict("anim@mp_point");
            }

            mp.game.invoke('0xD5BB4025AE449A4E', netPlayer.handle, "Pitch", camPitch)
            mp.game.invoke('0xD5BB4025AE449A4E', netPlayer.handle, "Heading", camHeading * -1.0 + 1.0)
            mp.game.invoke('0xB0A6CFD2C69C1088', netPlayer.handle, "isBlocked", false);
            mp.game.invoke('0xB0A6CFD2C69C1088', netPlayer.handle, "isFirstPerson", false);
        }
    }
});

mp.keys.bind(0x4C, true, () => {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (navegador != null)
        return;
    if (cantidad_cefs > 0) return;
    if (arrastrado || arrastrando || enmaletero) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (estaMuerto) return;
    if (pesca_iniciada) return;

    if (!mp.gui.cursor.visible) {
        pointing.start();
    }
});

mp.keys.bind(0x4C, false, () => {
    if (!logueado)
        return;
    if (estaChatAbierto)
        return;
    if (cantidad_cefs > 0) return;
    if (arrastrado || arrastrando || enmaletero || estaMuerto) return;
    if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
    if (navegador != null)
        return;

    pointing.stop();
});


function getPlayerByRemoteId(remoteId) {
    let pla = mp.players.atRemoteId(remoteId);
    if (pla === undefined || pla === null) {
        return null;
    }
    return pla;
}
}