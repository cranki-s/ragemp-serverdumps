{
//Fingerpointing
let pointing =
{
    active: false,
    interval: null,
    lastSent: 0,
    start: function () {
        if (!this.active) {
            this.active = true;

            mp.game.streaming.requestAnimDict("anim@mp_point");

            while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
                mp.game.wait(0);
            }
            mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 0, 1, 1, 1);
            mp.players.local.setConfigFlag(36, true)
            mp.players.local.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
            mp.game.streaming.removeAnimDict("anim@mp_point");
            this.interval = setInterval(this.process.bind(this), 0);
        }
    },

    stop: function () {
        this.active &&
            (clearInterval(this.interval),
                (this.interval = null),
                (this.active = !1),
                mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop"),
                !mp.game.invoke("0x84A2DD9AC37C35C1", mp.players.local.handle) &&
                mp.game.invoke("0x176CECF6F920D707", mp.players.local.handle),
                !mp.players.local.isInAnyVehicle(!0) && mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 1, 1, 1, 1),
                mp.players.local.setConfigFlag(36, !1));
    },

    gameplayCam: mp.cameras.new("gameplay"),
    lastSync: 0,

    getRelativePitch: function () {
        let camRot = this.gameplayCam.getRot(2);

        return camRot.x - mp.players.local.getPitch();
    },

    process: function () {
        if (this.active) {
            mp.game.invoke("0x921ce12c489c4c41", mp.players.local.handle);

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

            let coords = mp.players.local.getOffsetFromGivenWorldCoords((cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6);
            let blocked = (typeof mp.raycasting.testPointToPoint([coords.x, coords.y, coords.z - 0.2], [coords.x, coords.y, coords.z + 0.2], mp.players.local.handle, 7) !== 'undefined');

            mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Pitch", camPitch)
            mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Heading", camHeading * -1.0 + 1.0)
            mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isBlocked", blocked)
            mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isFirstPerson", mp.game.invoke('0xee778f8c7e1142e2', mp.game.invoke('0x19cafa3c87f7c2ff')) == 4)

            if ((Date.now() - this.lastSent) > 100) {
                this.lastSent = Date.now();
                mp.events.originalCallRemote("fpsync.update", camPitch, camHeading);
            }
        }
    }
}

mp.events.add("fpsync.update", (id, camPitch, camHeading) => {
    let netPlayer = mp.players.atRemoteId(id);
    if (mp.players.exists(netPlayer) && netPlayer.handle) {
        netPlayer.lastReceivedPointing = Date.now();
        if (netPlayer.pointingInterval === undefined) {
            netPlayer.pointingInterval = setInterval((function () {
                if ((Date.now() - netPlayer.lastReceivedPointing) > 1000) {
                    clearInterval(netPlayer.pointingInterval);

                    netPlayer.lastReceivedPointing = undefined;
                    netPlayer.pointingInterval = undefined;

                    mp.game.invoke("0xd01015c7316ae176", netPlayer.handle, "Stop");


                    if (!netPlayer.isInAnyVehicle(true)) {
                        mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 1, 1, 1, 1);
                    }
                    netPlayer.setConfigFlag(36, false);

                }
            }).bind(netPlayer), 500);

            mp.game.streaming.requestAnimDict("anim@mp_point");

            while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
                mp.game.wait(0);
            }
            mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 0, 1, 1, 1);
            netPlayer.setConfigFlag(36, true)
            netPlayer.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
            mp.game.streaming.removeAnimDict("anim@mp_point");
        }

        mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Pitch", camPitch)
        mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Heading", camHeading * -1.0 + 1.0)
        mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isBlocked", 0);
        mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isFirstPerson", 0);
    }
});

mp.keys.bind(0x4C, true, () => {
    if (!mp.gui.cursor.visible) {
        pointing.start();
    }
});

mp.keys.bind(0x4C, false, () => {
    pointing.stop();
});
}