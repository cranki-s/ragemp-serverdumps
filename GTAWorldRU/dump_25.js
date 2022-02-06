{
﻿  //Fingerpointing
    let pointing =
    {
        active: false,
        interval: null,
        lastSent: 0,
        start: async function () {
            if (!this.active) {
                this.active = true;

                mp.game.streaming.requestAnimDict("anim@mp_point");

                for (let i = 0;  !mp.game.streaming.hasAnimDictLoaded("anim@mp_point") && i < 1500; i++) {
                    await mp.game.waitAsync(0);
                }
                mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 0, 1, 1, 1);
                mp.players.local.setConfigFlag(36, true)
                mp.players.local.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
                mp.game.streaming.removeAnimDict("anim@mp_point");

                this.interval = setInterval(this.process.bind(this), 0);
            }
        },

        stop: async function () {
            if (this.active) {
                clearInterval(this.interval);
                this.interval = null;

                this.active = false;

                mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop");

                if (!mp.players.local.isInAnyVehicle(true)) {
                    mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 1, 1, 1, 1);
                }
                mp.players.local.setConfigFlag(36, false);
                mp.events.callRemote("StopAnimation");
            }
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
                    mp.events.callRemote("fpsync.update", camPitch, camHeading);
                }
            }
        }
    }

let bToPoint = false;
    mp.events.add("btopoint_set", (value) => {
        bToPoint = value;
});

    mp.events.add("fpsync.update", async (netPlayer, camPitch, camHeading) => {
    try {
        if (netPlayer != null) {
            if (netPlayer != mp.players.local) {
                netPlayer.lastReceivedPointing = Date.now();

                if (!netPlayer.pointingInterval) {
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

                    for (let i = 0;  !mp.game.streaming.hasAnimDictLoaded("anim@mp_point") && i < 1500; i++) {
                        await mp.game.waitAsync(0);
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
        }
    } catch (e)
    {}
});

mp.keys.bind(0x42, true, () => {
    if (!mp.gui.cursor.visible && (mp.players.local.model == mp.game.joaat('mp_m_freemode_01') || mp.players.local.model == mp.game.joaat('mp_f_freemode_01'))) {
        if (!bToPoint) {
            mp.gui.chat.push("Указание пальцем в настоящий момент отключено для Вашего персонажа, включите с помощью /enablepointing.");
        }
        else {
            pointing.start();
        }
    }
});

    mp.keys.bind(0x42, false, () => {
  if (mp.players.local.model == mp.game.joaat( 'mp_m_freemode_01' ) || mp.players.local.model == mp.game.joaat( 'mp_f_freemode_01' )) {
        pointing.stop();
}
    });

mp.events.add('render', () => {
    if (!pointing.active) return;

    // Disable quick swapping weapons, aiming, and attacking
    mp.game.controls.disableControlAction(1, 16, true); // INPUT_SELECT_NEXT_WEAPON
    mp.game.controls.disableControlAction(1, 17, true); // INPUT_SELECT_PREV_WEAPON

    mp.game.controls.disableControlAction(1, 24, true); // INPUT_ATTACK
    mp.game.controls.disableControlAction(1, 25, true); // INPUT_AIM

    mp.game.controls.disableControlAction(1, 140, true); // INPUT_MELEE_ATTACK_LIGHT
    mp.game.controls.disableControlAction(1, 141, true); // INPUT_MELEE_ATTACK_HEAVY
    mp.game.controls.disableControlAction(1, 142, true); // INPUT_MELEE_ATTACK_ALTERNATE

    mp.game.controls.disableControlAction(1, 257, true); // INPUT_ATTACK2
    mp.game.controls.disableControlAction(1, 263, true); // INPUT_MELEE_ATTACK1
    mp.game.controls.disableControlAction(1, 264, true); // INPUT_MELEE_ATTACK2
});

}뗘Ƭ