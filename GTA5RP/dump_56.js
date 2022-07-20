{
    const mp = global.mp;
    let prisonMobileCheckInterval = null;
    global.ServerPed.registerScript("PED_PRISON_MOBILE_GIVE", () => {
        let a = 0;
        null !== prisonMobileCheckInterval && (clearInterval(prisonMobileCheckInterval), prisonMobileCheckInterval = null), prisonMobileCheckInterval = setInterval(() => {
            ++a > 600 && (mp.events.callRemote("server_prison_ped_mobileTake"), clearInterval(prisonMobileCheckInterval), prisonMobileCheckInterval = null)
        }, 500)
    }), global.ServerPed.registerScript("PED_PRISON_MOBILE_TAKE", () => {
        null !== prisonMobileCheckInterval && (clearInterval(prisonMobileCheckInterval), prisonMobileCheckInterval = null)
    });
    const CAMERA_SCREEN_EFFECT = "TinyRacerIntroCam";
    let isStartCameraMode = !1,
        cameraModeIndex = 0,
        cameraModeList = [],
        camera = null,
        playerSavePosition = new mp.Vector3(0, 0, 0),
        isNametagsEnabled = !0;
    const startCameraMode = () => {
            isStartCameraMode || (global.disableChatAndKeys(!0), global.hideUI(!0), isNametagsEnabled = global.enableNameTags, isNametagsEnabled && (global.enableNameTags = !1), mp.events.add("render", cameraRenderEvent), mp.game.graphics.startScreenEffect(CAMERA_SCREEN_EFFECT, 99999, !0), isStartCameraMode = !0)
        },
        endCameraMode = () => {
            isStartCameraMode && (global.disableChatAndKeys(!1), global.hideUI(!1), isNametagsEnabled && (global.enableNameTags = !0), mp.events.remove("render", cameraRenderEvent), mp.game.graphics.stopScreenEffect(CAMERA_SCREEN_EFFECT), mp.cameras.exists(camera) && camera.destroy(), mp.game.cam.renderScriptCams(!1, !1, 0, !0, !1), isStartCameraMode = !1)
        },
        cameraRenderEvent = () => {
            if (!mp.cameras.exists(camera)) {
                const a = cameraModeList[cameraModeIndex];
                camera = mp.cameras.new("DEFAULT_SCRIPTED_CAMERA", a[0], new mp.Vector3(0, 0, 0), 60), camera.pointAtCoord(a[1].x, a[1].y, a[1].z), camera.setActive(!0), mp.game.cam.renderScriptCams(!0, !1, 0, !0, !1), playerSavePosition = new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z)
            }
            if (0 > mp.players.local.getVariable("rsd")) return endCameraMode();
            const {
                x: a,
                y: b,
                z: c
            } = mp.players.local.position;
            if (1.5 < mp.game.system.vdist(a, b, c, playerSavePosition.x, playerSavePosition.y, playerSavePosition.z)) return endCameraMode();
            if ((mp.keys.isDown(1) || mp.keys.isDown(2)) && global.actionAntiFlood("prisonCameraSwitch", 1e3)) {
                mp.keys.isDown(1) ? (cameraModeIndex++, cameraModeIndex >= cameraModeList.length && (cameraModeIndex = 0)) : (cameraModeIndex--, 0 > cameraModeIndex && (cameraModeIndex = cameraModeList.length - 1));
                const a = cameraModeList[cameraModeIndex];
                mp.cameras.exists(camera) && (camera.stopPointing(), camera.setCoord(a[0].x, a[0].y, a[0].z), camera.pointAtCoord(a[1].x, a[1].y, a[1].z), mp.game.audio.playSoundFrontend(-1, "SELECT", "HUD_FREEMODE_SOUNDSET", !0))
            } else if ((mp.game.controls.isDisabledControlJustReleased(0, 200) || mp.game.controls.isDisabledControlJustReleased(0, 202)) && global.actionAntiFlood("prisonCameraCancel", 500)) return void endCameraMode();
            mp.game.graphics.drawText(`CAM 0${cameraModeIndex+1}`, [.05, .05], {
                font: 4,
                centre: !0,
                color: [255, 255, 255, 255],
                scale: [.4, .4],
                outline: !1
            }), mp.game.graphics.drawText("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043C\u044B\u0448\u044C \u0447\u0442\u043E\u0431\u044B \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u044C \u043A\u0430\u043C\u0435\u0440\u044B\nESC - \u0432\u044B\u0439\u0442\u0438", [.5, .9], {
                font: 4,
                centre: !0,
                color: [255, 255, 255, 255],
                scale: [.4, .4],
                outline: !1
            })
        };
    class PrisonCameraList {
        constructor({
            startPosition: a,
            cameraList: b
        }) {
            this.startPosition = a, this.cameraList = b, new global.ActionColshape(this.startPosition, 0, 1, "\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432 \u043A\u0430\u043C\u0435\u0440\u044B", () => {
                cameraModeIndex = 0, cameraModeList = this.cameraList, startCameraMode(), global.notifyKeyHelpHide()
            })
        }
    }
    new PrisonCameraList({
        startPosition: new mp.Vector3(1690.8, 2457.59, 49.54),
        cameraList: [
            [new mp.Vector3(1671.55, 2441.56, 48.2), new mp.Vector3(1674.55, 2443.73, 47.6)],
            [new mp.Vector3(1718.76, 2439.48, 48.95), new mp.Vector3(1709.31, 2450.45, 44.1)],
            [new mp.Vector3(1713.76, 2480, 48.45), new mp.Vector3(1713.05, 2439.29, 28.35)],
            [new mp.Vector3(1688.71, 2455.93, 49.95), new mp.Vector3(1685.71, 2458.6, 48.35)],
            [new mp.Vector3(1710.21, 2441.72, 53.14), new mp.Vector3(1707.06, 2446, 50.54)]
        ]
    }), new PrisonCameraList({
        startPosition: new mp.Vector3(1712.92, 2708.04, 49.51),
        cameraList: [
            [new mp.Vector3(1732.19, 2723.99, 48.43), new mp.Vector3(1725.93, 2716.84, 45.58)],
            [new mp.Vector3(1684.24, 2726.25, 48.43), new mp.Vector3(1686.91, 2724.26, 46.83)],
            [new mp.Vector3(1689.52, 2685.62, 48.43), new mp.Vector3(1691.7, 2694.77, 43.33)],
            [new mp.Vector3(1714.93, 2710.06, 49.68), new mp.Vector3(1721.99, 2704.97, 45.83)],
            [new mp.Vector3(1693.19, 2723.84, 52.86), new mp.Vector3(1696.44, 2720.84, 51.01)]
        ]
    });
    const TURNER_END_POS = new mp.Vector3(1747.23, 2597.86, 44.68),
        TURNER_WORK_POSITION = [new mp.Vector3(1729.19, 2581.91, 44.68), new mp.Vector3(1728.9, 2586.53, 44.68), new mp.Vector3(1725.86, 2586.52, 44.68), new mp.Vector3(1725.79, 2582.07, 44.68), new mp.Vector3(1725.71, 2575.31, 44.68), new mp.Vector3(1729.49, 2575.1, 44.68), new mp.Vector3(1738.86, 2577.37, 44.68), new mp.Vector3(1738.81, 2581.92, 44.68), new mp.Vector3(1738.82, 2586.56, 44.68), new mp.Vector3(1741.88, 2586.5, 44.68), new mp.Vector3(1741.84, 2582.13, 44.68), new mp.Vector3(1741.85, 2577.53, 44.68)];
    let turnerIsStartWork = !1,
        turnerEndCheckpoint = null,
        turnerEndMarker = null,
        turnerEndBlip = null;
    TURNER_WORK_POSITION.forEach(a => {
        new global.ActionColshape(a, 0, 1, "\u043D\u0430\u0447\u0430\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0442\u043E\u043A\u0430\u0440\u0435\u043C", async () => {
            if (turnerIsStartWork || global.isPlayerDeath || global.handItemIsInHand("PRISON_TURNER_BOX")) return;
            if (!mp.players.local.getVariable("isInPrison")) return global.rpc.triggerClient("clientFunc_notifyError", "\u042D\u0442\u0430 \u0440\u0430\u0431\u043E\u0442\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0437\u0430\u043A\u043B\u044E\u0447\u0451\u043D\u043D\u044B\u0445");
            const a = "anim@amb@machinery@vertical_mill@";
            if (!mp.game.streaming.hasAnimDictLoaded("anim@amb@machinery@vertical_mill@"))
                for (mp.game.streaming.requestAnimDict(a); !mp.game.streaming.hasAnimDictLoaded(a);) await mp.game.waitAsync(0);
            mp.players.local.taskPlayAnim("anim@amb@machinery@vertical_mill@", "unload_ll_01_amy_skater_01", 8, 0, -1, 1, 0, !1, !1, !1), mp.game.streaming.removeAnimDict("anim@amb@machinery@vertical_mill@"), turnerIsStartWork = !0, global.showCursor(!0, !0), global.disableChatAndKeys(!0), global.menuBrowser.execute("startPrisonTurnerGame()")
        })
    }), mp.events.add("__client_prison_job_turner_end", a => {
        turnerIsStartWork && (turnerIsStartWork = !1, global.showCursor(!1, !1), global.disableChatAndKeys(!1), mp.players.local.clearTasksImmediately(), a ? mp.events.callRemote("server_prison_job_turner_end") : global.rpc.triggerClient("clientFunc_notifyInfo", "\u0423 \u0432\u0430\u0441 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437"))
    }), global.handItemEventOnSet("PRISON_TURNER_BOX", () => {
        global.rpc.triggerClient("clientFunc_notifyInfo", "\u041E\u0442\u043D\u0435\u0441\u0438\u0442\u0435 \u044F\u0449\u0438\u043A \u043D\u0430 \u0441\u043A\u043B\u0430\u0434"), turnerEndCheckpoint && turnerEndCheckpoint.destroy(), mp.markers.exists(turnerEndMarker) && turnerEndMarker.destroy(), mp.blips.exists(turnerEndBlip) && turnerEndBlip.destroy(), turnerEndCheckpoint = new global.TriggerColshape(TURNER_END_POS, 0, 2, () => {
            mp.events.callRemote("server_prison_job_turner_put")
        }, () => {}), turnerEndMarker = mp.markers.new(27, TURNER_END_POS.add(0, 0, .8), 5, {
            color: [255, 0, 0, 255],
            dimension: 0,
            rotation: new mp.Vector3(0, 0, 0),
            bobUpAndDown: !0
        }), turnerEndBlip = mp.blips.new(1, TURNER_END_POS, {
            name: "???",
            color: 1
        })
    }), global.handItemEventOnRemove("PRISON_TURNER_BOX", () => {
        turnerEndCheckpoint && turnerEndCheckpoint.destroy(), mp.markers.exists(turnerEndMarker) && turnerEndMarker.destroy(), mp.blips.exists(turnerEndBlip) && turnerEndBlip.destroy(), turnerEndCheckpoint = null
    });
    const SEAMSTRESS_END_POS = new mp.Vector3(1747.23, 2597.86, 44.68),
        SEAMSTRESS_WORK_POSITION = [new mp.Vector3(1725.22, 2566.62, 50.88), new mp.Vector3(1725.12, 2568.75, 50.88), new mp.Vector3(1721.58, 2571.31, 50.88), new mp.Vector3(1723.86, 2571.11, 50.88), new mp.Vector3(1726.03, 2571.4, 50.88), new mp.Vector3(1735.09, 2573.85, 50.88), new mp.Vector3(1735.28, 2575.9, 50.88), new mp.Vector3(1735.18, 2578.34, 50.88), new mp.Vector3(1735.23, 2580.71, 50.88), new mp.Vector3(1735.27, 2582.85, 50.88), new mp.Vector3(1735.18, 2585.07, 50.88), new mp.Vector3(1741.7, 2587.11, 50.88), new mp.Vector3(1744.24, 2587.16, 50.88), new mp.Vector3(1746.74, 2587.19, 50.88), new mp.Vector3(1741.24, 2583.98, 50.88), new mp.Vector3(1743.95, 2583.94, 50.88), new mp.Vector3(1747.05, 2583.95, 50.88), new mp.Vector3(1746.89, 2574.31, 50.88), new mp.Vector3(1744.37, 2574.23, 50.88), new mp.Vector3(1741.76, 2574.18, 50.88), new mp.Vector3(1741.74, 2571.1, 50.88), new mp.Vector3(1744.17, 2571.21, 50.88), new mp.Vector3(1746.71, 2571.05, 50.88), new mp.Vector3(1725.84, 2588.87, 50.88), new mp.Vector3(1723.96, 2588.97, 50.88), new mp.Vector3(1721.5, 2589.2, 50.88)];
    let seamstressIsStartWork = !1,
        seamstressEndCheckpoint = null,
        seamstressEndMarker = null,
        seamstressEndBlip = null;
    SEAMSTRESS_WORK_POSITION.forEach(a => {
        new global.ActionColshape(a, 0, 1, "\u043D\u0430\u0447\u0430\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C", async () => {
            if (seamstressIsStartWork || global.isPlayerDeath || global.handItemIsInHand("PRISON_SEAMSTRESS_JOB_BOX")) return;
            if (!mp.players.local.getVariable("isInPrison")) return global.rpc.triggerClient("clientFunc_notifyError", "\u042D\u0442\u0430 \u0440\u0430\u0431\u043E\u0442\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0437\u0430\u043A\u043B\u044E\u0447\u0451\u043D\u043D\u044B\u0445");
            const a = "anim@amb@machinery@vertical_mill@";
            if (!mp.game.streaming.hasAnimDictLoaded("anim@amb@machinery@vertical_mill@"))
                for (mp.game.streaming.requestAnimDict(a); !mp.game.streaming.hasAnimDictLoaded(a);) await mp.game.waitAsync(0);
            mp.players.local.taskPlayAnim("anim@amb@machinery@vertical_mill@", "unload_ll_01_amy_skater_01", 8, 0, -1, 1, 0, !1, !1, !1), mp.game.streaming.removeAnimDict("anim@amb@machinery@vertical_mill@"), seamstressIsStartWork = !0, global.showCursor(!0, !0), global.disableChatAndKeys(!0), global.menuBrowser.execute("startPrisonSeamstressGame()")
        })
    }), mp.events.add("__client_prison_job_seamstress_end", a => {
        seamstressIsStartWork && (seamstressIsStartWork = !1, global.showCursor(!1, !1), global.disableChatAndKeys(!1), mp.players.local.clearTasksImmediately(), a ? mp.events.callRemote("server_prison_job_seamstress_end") : global.rpc.triggerClient("clientFunc_notifyInfo", "\u0423 \u0432\u0430\u0441 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437"))
    }), mp.attachmentMngr.register("prisonJobSeamstressHandItem", "p_t_shirt_pile_s", 28422, new mp.Vector3(.2, 0, -.03), new mp.Vector3(0, 40, 270)), global.handItemEventOnSet("PRISON_SEAMSTRESS_JOB_BOX", () => {
        global.rpc.triggerClient("clientFunc_notifyInfo", "\u041E\u0442\u043D\u0435\u0441\u0438\u0442\u0435 \u043E\u0434\u0435\u0436\u0434\u0443 \u043D\u0430 \u0441\u043A\u043B\u0430\u0434"), seamstressEndCheckpoint && seamstressEndCheckpoint.destroy(), mp.markers.exists(seamstressEndMarker) && seamstressEndMarker.destroy(), mp.blips.exists(seamstressEndBlip) && seamstressEndBlip.destroy(), seamstressEndCheckpoint = new global.TriggerColshape(SEAMSTRESS_END_POS, 0, 2, () => {
            mp.events.callRemote("server_prison_job_seamstress_put")
        }, () => {}), seamstressEndMarker = mp.markers.new(27, SEAMSTRESS_END_POS.add(0, 0, .8), 5, {
            color: [255, 0, 0, 255],
            dimension: 0,
            rotation: new mp.Vector3(0, 0, 0),
            bobUpAndDown: !0
        }), seamstressEndBlip = mp.blips.new(1, SEAMSTRESS_END_POS, {
            name: "???",
            color: 1
        })
    }), global.handItemEventOnRemove("PRISON_SEAMSTRESS_JOB_BOX", () => {
        seamstressEndCheckpoint && seamstressEndCheckpoint.destroy(), mp.markers.exists(seamstressEndMarker) && seamstressEndMarker.destroy(), mp.blips.exists(seamstressEndBlip) && seamstressEndBlip.destroy(), seamstressEndCheckpoint = null
    });
    const TOILET_QUEST_POS = [
        [new mp.Vector3(1703.71, 2459.19, 44.8), 180],
        [new mp.Vector3(1705.2, 2459.22, 44.8), 180],
        [new mp.Vector3(1706.97, 2459.19, 44.8), 180],
        [new mp.Vector3(1708.42, 2459.18, 44.8), 180],
        [new mp.Vector3(1710.13, 2459.18, 44.8), 180],
        [new mp.Vector3(1703.58, 2457.18, 44.8), 0],
        [new mp.Vector3(1705.28, 2457.22, 44.8), 0],
        [new mp.Vector3(1706.94, 2457.19, 44.8), 0],
        [new mp.Vector3(1708.53, 2457.18, 44.8), 0],
        [new mp.Vector3(1710.09, 2457.2, 44.8), 0]
    ];
    let toilerQuestPickups = [],
        toilerQuestMarkers = [],
        toilerQuestBlips = [];
    const toilerQuestDestroyAllObject = () => {
        toilerQuestPickups.forEach(a => a.destroy()), toilerQuestPickups = [], toilerQuestMarkers.forEach(a => mp.markers.exists(a) && a.destroy()), toilerQuestMarkers = [], toilerQuestBlips.forEach(a => mp.blips.exists(a) && a.destroy()), toilerQuestBlips = []
    };
    global.registerPlayerQuest({
        code: "PRISON_TOILET_QUEST",
        onStart: () => {
            toilerQuestDestroyAllObject();
            const a = TOILET_QUEST_POS.length;
            let b = 0;
            TOILET_QUEST_POS.forEach(c => {
                const d = mp.blips.new(1, c[0], {
                        color: 1,
                        name: "???"
                    }),
                    e = mp.markers.new(27, c[0].add(new mp.Vector3(0, 0, .6)), .7, {
                        color: [255, 0, 0, 255],
                        bobUpAndDown: !0
                    }),
                    f = new global.ActionColshape(c[0], 0, .5, "\u043C\u044B\u0442\u044C", () => {
                        b++, f.destroy(), mp.blips.exists(d) && d.destroy(), mp.blips.exists(e) && e.destroy(), mp.players.local.setHeading(c[1]), global.disableChatAndKeys(!0), global.crouchSystemStart(), mp.events.callRemote("server_prison_toiletQuest_anim", b >= a), setTimeout(() => {
                            global.disableChatAndKeys(!1), global.crouchSystemEnd()
                        }, 1e4)
                    });
                toilerQuestPickups.push(f), toilerQuestMarkers.push(e), toilerQuestBlips.push(d)
            })
        },
        onEnd: () => {
            toilerQuestDestroyAllObject()
        }
    });
    let isPrisonAttackStarted = !1;
    (() => {
        mp.objects.new(mp.game.joaat("prop_elecbox_24b"), new mp.Vector3(1471.35, 2424.49, 48.17), {
            rotation: new mp.Vector3(0, 0, 0),
            dimension: 0
        }), mp.objects.new(mp.game.joaat("prop_elecbox_24b"), new mp.Vector3(1784.81, 2528.49, 44.57), {
            rotation: new mp.Vector3(0, 0, .71),
            dimension: 0
        });
        let a = "",
            b = null,
            c = null,
            d = null,
            e = null,
            f = null,
            g = !1,
            h = !1,
            i = null;
        const j = [
            [
                [1435.06, 2410.65],
                [1479.86, 2367.15],
                [1791.07, 2342.33],
                [1936.41, 2567.66],
                [1968.58, 2599.74],
                [1885.99, 2740.23],
                [1795.18, 2838.37],
                [1667.47, 2827.42],
                [1472.21, 2693.81],
                [1412.61, 2579.5],
                [1435.06, 2410.65]
            ]
        ];
        for (const d of ["F_GANG_BALLAS", "F_GANG_BLOODS", "F_GANG_GROVE", "F_GANG_MARABUNTA", "F_GANG_VAGOS", "F_YAKUZA", "F_RUSSIANMAFIA", "F_MEXICOMAFIA", "F_ITALYMAFIA", "F_ARMENIAMAFIA"]) global.registerFactionEvent({
            factionId: d,
            onEnter: () => {
                b && b.destroy(), b = new global.ActionColshape(new mp.Vector3(1473.41, 2426.01, 48.55), 0, 1, "\u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u044E\u0440\u044C\u043C\u044B", () => {
                    isPrisonAttackStarted || mp.events.callRemote("server_prison_startAttack")
                }), b.onceMode = !0, mp.markers.exists(c) && c.destroy(), c = mp.markers.new(1, new mp.Vector3(1473.41, 2426.01, 48.55 - .15), 1, {
                    direction: new mp.Vector3(0, 0, 0),
                    rotation: new mp.Vector3(0, 0, 0),
                    color: [237, 194, 21, 255],
                    visible: !0,
                    dimension: 0
                }), isPrisonAttackStarted && d === a && n()
            },
            onLeave: () => {
                b && b.destroy(), b = null, mp.markers.exists(c) && c.destroy(), isPrisonAttackStarted && d === a && o()
            }
        });
        global.registerFactionEvent({
            factionId: "F_PRISON",
            onEnter: () => {
                isPrisonAttackStarted && l()
            },
            onLeave: () => {
                isPrisonAttackStarted && m()
            }
        });
        const k = async (b, c, d) => {
            var e = Math.sqrt,
                f = Math.pow;
            if (c && !isPrisonAttackStarted) {
                isPrisonAttackStarted = !0, a = b;
                let c = -1;
                if (streamInterval = setInterval(async () => {
                        const {
                            x: a,
                            y: b,
                            z: d
                        } = mp.players.local.position;
                        c++;
                        const h = 321 > e(f(a - 1705.495, 2) + f(b - 2584.215, 2)) && mp.api.location.isPointInPolygon([a, b], j);
                        if (h && !g && (g = !0, mp.game.audio.startAlarm("PRISON_ALARMS", !0), mp.game.graphics.setLightsState(0, !0), mp.game.graphics.setLightsState(1, !0), mp.game.graphics.setLightsState(2, !0), mp.game.graphics.setLightsState(3, !0), mp.game.graphics.setLightsState(4, !0), mp.game.graphics.setLightsState(5, !0), mp.game.graphics.setLightsState(7, !0), mp.game.graphics.setLightsState(8, !0), mp.game.graphics.setLightsState(9, !0), mp.game.graphics.setLightsState(10, !0), mp.game.graphics.setLightsState(11, !0), mp.game.graphics.setLightsState(12, !0), mp.game.graphics.setLightsState(13, !0), mp.game.graphics.setLightsState(14, !0), mp.game.graphics.setLightsState(15, !0), mp.game.invoke("0xE2B187C0939B3D32", !1)), !h && g && (g = !1, mp.game.graphics.setLightsState(0, !1), mp.game.graphics.setLightsState(1, !1), mp.game.graphics.setLightsState(2, !1), mp.game.graphics.setLightsState(3, !1), mp.game.graphics.setLightsState(4, !1), mp.game.graphics.setLightsState(5, !1), mp.game.graphics.setLightsState(7, !1), mp.game.graphics.setLightsState(8, !1), mp.game.graphics.setLightsState(9, !1), mp.game.graphics.setLightsState(10, !1), mp.game.graphics.setLightsState(11, !1), mp.game.graphics.setLightsState(12, !1), mp.game.graphics.setLightsState(13, !1), mp.game.graphics.setLightsState(14, !1), mp.game.graphics.setLightsState(15, !1), mp.game.invoke("0xE2B187C0939B3D32", !0)), h) {
                            if (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) {
                                mp.game.streaming.requestNamedPtfxAsset("core");
                                do await mp.game.waitAsync(10); while (!mp.game.streaming.hasNamedPtfxAssetLoaded("core"))
                            }
                            mp.game.graphics.setPtfxAssetNextCall("core"), mp.game.graphics.startParticleFxNonLoopedAtCoord("sp_foundry_sparks", 1786.06, 2529.91, 46.42, 0, 270, 0, 1, !0, !0, !0), 0 == c % 15 && (mp.game.graphics.setPtfxAssetNextCall("core"), mp.game.graphics.startParticleFxNonLoopedAtCoord("ent_dst_elec_fire", 1472.64, 2425.92, 50.15, 0, 0, 0, 2, !0, !0, !0))
                        }
                    }, 1e3), mp.game.audio.startAlarm("PRISON_ALARMS", !0), "F_PRISON" === mp.players.local.getVariable("factionId") && l(), !d) return;
                const {
                    x: h,
                    y: i
                } = mp.players.local.position;
                321 > e(f(h - 1705.495, 2) + f(i - 2584.215, 2)) && ("F_PRISON" === mp.players.local.getVariable("factionId") && mp.gui.chat.push(`!{5999FF}[R] На тюрьму напали! Не допустите побега заключенных и отремонтируйте аварию как можно скорее.`), mp.game.audio.playSoundFrontend(-1, "Failure", "DLC_HEIST_HACKING_SNAKE_SOUNDS", !0)), mp.players.local.getVariable("factionId") === a && n()
            }!c && isPrisonAttackStarted && (isPrisonAttackStarted = !1, clearInterval(streamInterval), mp.game.audio.stopAlarm("PRISON_ALARMS", !0), g && (g = !1, mp.game.graphics.setLightsState(0, !1), mp.game.graphics.setLightsState(1, !1), mp.game.graphics.setLightsState(2, !1), mp.game.graphics.setLightsState(3, !1), mp.game.graphics.setLightsState(4, !1), mp.game.graphics.setLightsState(5, !1), mp.game.graphics.setLightsState(7, !1), mp.game.graphics.setLightsState(8, !1), mp.game.graphics.setLightsState(9, !1), mp.game.graphics.setLightsState(10, !1), mp.game.graphics.setLightsState(11, !1), mp.game.graphics.setLightsState(12, !1), mp.game.graphics.setLightsState(13, !1), mp.game.graphics.setLightsState(14, !1), mp.game.graphics.setLightsState(15, !1), mp.game.invoke("0xE2B187C0939B3D32", !0)), m(), mp.players.local.getVariable("factionId") === a && o(), a = b)
        }, l = () => {
            m(), d = new global.ActionColshape(new mp.Vector3(1786.87, 2529.94, 44.56), 0, 1, "\u0447\u0438\u043D\u0438\u0442\u044C \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u0442\u0432\u043E", () => {
                h || mp.events.callRemote("server_prison_defend_task")
            }), d.onceMode = !0, e = mp.markers.new(1, new mp.Vector3(1786.87, 2529.94, 44.56 - .15), 1, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [237, 194, 21, 255],
                visible: !0,
                dimension: 0
            }), f = mp.blips.new(402, new mp.Vector3(1786.87, 2529.94, 44.56), {
                color: 1,
                dimension: 0,
                shortRange: !1,
                scale: 1,
                name: "???"
            })
        }, m = () => {
            d && d.destroy(), d = null, mp.markers.exists(e) && e.destroy(), mp.blips.exists(f) && f.destroy()
        }, n = () => {
            global.targetMenuFactionCustomItems.push({
                key: "prisonSave",
                desc: "\u041E\u0441\u0432\u043E\u0431\u043E\u0434\u0438\u0442\u044C",
                ico: "free-prisoner.svg",
                event: "server_prison_crimeSave"
            })
        }, o = () => {
            global.targetMenuFactionCustomItems = global.targetMenuFactionCustomItems.filter(a => "prisonSave" !== a.key)
        };
        mp.events.add("client_prison_startDefend", async (a, b) => {
            if (h) return;
            h = !0;
            const c = mp.players.local;
            null !== i && clearInterval(i), i = setInterval(() => {
                const {
                    x: d,
                    y: e,
                    z: f
                } = c.position;
                return global.isPlayerDeath || 10 < mp.dist(d, e, f, 1786.87, 2529.94, 44.56) || 0 !== c.dimension || a >= b ? (h = !1, clearInterval(i), i = null, c.clearTasksImmediately(), a >= b ? mp.events.callRemote("server_prison_defend_end") : mp.events.callRemote("server_prison_defend_stop", a), global.hideUI(!1), global.disableChatAndKeys(!1), void global.mainBrowser.execute(`mainHud.progressStop();`)) : void(a++, global.mainBrowser.execute(`mainHud.progressValue(${100*(a/b)});`))
            }, 1e3), global.hideUI(!0), global.disableChatAndKeys(!0), global.mainBrowser.execute(`mainHud.progressStart('Починка электричества', ${100*(a/b)}, 400);`), c.setCoordsNoOffset(1786.58, 2529.91, 45.56, !1, !1, !1), c.setHeading(110.73)
        }), mp.api.data.onChange("prisonAttack", a => {
            k(a, !!a, !0)
        }), mp.events.add("serverWorldDataReady", () => {
            k(mp.api.data.get("prisonAttack"), !!mp.api.data.get("prisonAttack"), !1)
        })
    })(), new global.ActionColshape(new mp.Vector3(1820.43, 2604.76, 44.58), 0, 1, "\u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C \u0432 \u0438\u043D\u0442\u0435\u0440\u043A\u043E\u043C", () => {
        global.actionAntiFlood("server_prison_taskOpenDoor", 3e4) && mp.events.callRemote("server_prison_taskOpenDoor")
    }).onceMode = !0;
    let isLocalPlayerInPrison = !1,
        prisonTimer = null;
    mp.events.addDataHandler("isInPrison", (a, b) => {
        a === mp.players.local && (!isLocalPlayerInPrison && b ? (prisonTimer && clearInterval(prisonTimer), prisonTimer = setInterval(prisonTimerHandle, 5e3), isLocalPlayerInPrison = !0) : isLocalPlayerInPrison && !b && (clearInterval(prisonTimer), prisonTimer = null, isLocalPlayerInPrison = !1, global.discordUpdate()))
    });
    const prisonTimerHandle = () => {
        if (!isPrisonAttackStarted) {
            const {
                x: a,
                y: b,
                z: c
            } = mp.players.local.position;
            (!pointInPolygon([a, b], [
                [
                    [1812.14, 2620.27, 45.51],
                    [1809.72, 2564.21, 43.41],
                    [1809.27, 2536.84, 43.41],
                    [1813.28, 2502.33, 43.41],
                    [1815.96, 2488.87, 45.45],
                    [1810.3, 2473.24, 45.45],
                    [1763.9, 2425.24, 45.42],
                    [1749.43, 2418.3, 45.42],
                    [1668.07, 2406.14, 45.4],
                    [1652.29, 2408.1, 45.4],
                    [1557.16, 2467.88, 45.39],
                    [1549.49, 2482.54, 45.39],
                    [1545.15, 2576.14, 45.39],
                    [1546.39, 2591.58, 45.39],
                    [1574.3, 2667.63, 45.47],
                    [1583.22, 2680.35, 45.47],
                    [1647.64, 2742.92, 45.44],
                    [1661.47, 2749.74, 45.44],
                    [1762.58, 2753.77, 45.43],
                    [1776.95, 2748.29, 45.43],
                    [1831.13, 2704.5, 45.43],
                    [1836.58, 2688.86, 45.43],
                    [1816.17, 2629.93, 45.43],
                    [1812.14, 2620.27, 45.51]
                ]
            ]) || 55.4 < c) && global.actionAntiFlood("server_prison_leave", 1e4) && mp.events.callRemote("server_prison_leave")
        }
        global.discordUpdate("\u0421\u0438\u0434\u0438\u0442 \u0432 \u0442\u044E\u0440\u044C\u043C\u0435")
    };
    mp.events.add("client_prison_knifeDamage", async (a, b) => {
        var c = Math.PI,
            d = Math.atan2;
        const e = mp.players.atRemoteId(a),
            f = mp.players.atRemoteId(b);
        if (!mp.players.exists(e) || 0 === e.handle || !mp.players.exists(f) || 0 === f.handle) return;
        if (10 < mp.game.system.vdist(e.position.x, e.position.y, e.position.z, f.position.x, f.position.y, f.position.z)) return;
        f === mp.players.local && global.disableChatAndKeys(!0);
        const g = e.getHeading() - f.getHeading(),
            h = 90 <= g && 270 >= g ? "plyr_knife_front_takedown" : "plyr_knife_rear_takedown",
            i = 90 <= g && 270 >= g ? "victim_knife_front_takedown" : "victim_knife_rear_takedown";
        if (90 <= g && 270 >= g ? (f.setHeading(180 * d(e.position.y - f.position.y, e.position.x - f.position.x) / c + 270), e.setHeading(180 * d(f.position.y - e.position.y, f.position.x - e.position.x) / c + 270)) : (f.setHeading(180 * d(e.position.y - f.position.y, e.position.x - f.position.x) / c + 90), e.setHeading(180 * d(f.position.y - e.position.y, f.position.x - e.position.x) / c + 275)), !mp.game.streaming.hasAnimDictLoaded("melee@knife@streamed_core"))
            for (mp.game.streaming.requestAnimDict("melee@knife@streamed_core"); !mp.game.streaming.hasAnimDictLoaded("melee@knife@streamed_core");) await mp.game.waitAsync(0);
        mp.players.exists(e) && 0 !== e.handle && mp.players.exists(f) && 0 !== f.handle && (mp.attachmentMngr.addClient(e, mp.game.joaat("prisonKnifeDamage")), e.taskPlayAnim("melee@knife@streamed_core", h, 8, 0, -1, 1, 0, !1, !1, !1), f.taskPlayAnim("melee@knife@streamed_core", i, 8, 0, -1, 2, 0, !1, !1, !1), mp.game.streaming.removeAnimDict("melee@knife@streamed_core"), setTimeout(() => mp.players.exists(e) && 0 !== e.handle && mp.players.exists(f) && 0 !== f.handle || !mp.players.exists(e) || 0 === e.handle ? void(e.stopAnimTask("melee@knife@streamed_core", h, 3), setTimeout(() => {
            mp.players.exists(e) && 0 !== e.handle && e.clearTasksImmediately()
        }, 500), mp.attachmentMngr.removeFor(e, mp.game.joaat("prisonKnifeDamage"))) : (mp.attachmentMngr.removeFor(e, mp.game.joaat("prisonKnifeDamage")), void e.clearTasksImmediately()), 1600), setTimeout(() => {
            mp.players.exists(f) && 0 !== f.handle && (f.stopAnimTask("melee@knife@streamed_core", i, 3), setTimeout(() => {
                mp.players.exists(f) && 0 !== f.handle && f.clearTasksImmediately()
            }, 500), f === mp.players.local && (setTimeout(() => mp.events.callRemote("client_prison_knifeDamageTake"), 500), global.disableChatAndKeys(!1)))
        }, 9e3))
    }), mp.attachmentMngr.register("prisonKnifeDamage", "w_me_knife_01", 28422, new mp.Vector3(.04, -.02, 0), new mp.Vector3(270, 90, 90));
    const pointInPolygon = (a, b) => {
        let c = 0,
            d = 0,
            e = 0,
            g = 0,
            h = 0,
            j = 0,
            l = 0,
            m = 0,
            n = null,
            o = null;
        const p = a[0],
            q = a[1],
            r = b.length;
        for (c; c < r; c++) {
            d = 0;
            const f = b[c].length - 1,
                i = b[c];
            for (n = i[0], h = n[0] - p, j = n[1] - q, d; d < f; d++) {
                if (o = i[d + 1], m = o[1] - q, 0 > j && 0 > m || 0 < j && 0 < m) {
                    n = o, j = m, h = n[0] - p;
                    continue
                }
                if (l = o[0] - a[0], 0 < m && 0 >= j) {
                    if (g = h * m - l * j, 0 < g) ++e;
                    else if (0 === g) return 0;
                } else if (0 < j && 0 >= m) {
                    if (g = h * m - l * j, 0 > g) ++e;
                    else if (0 === g) return 0;
                } else if (0 === m && 0 > j) {
                    if (g = h * m - l * j, 0 === g) return 0;
                } else if (0 === j && 0 > m) {
                    if (g = h * m - l * j, 0 === g) return 0;
                } else if (0 === j && 0 === m) {
                    if (0 >= l && 0 <= h) return 0;
                    if (0 >= h && 0 <= l) return 0
                }
                n = o, j = m, h = l
            }
        }
        return 0 != e % 2
    };
}