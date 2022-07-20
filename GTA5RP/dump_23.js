{
    const mp = global.mp,
        localPlayer = mp.players.local,
        createChinUpsTraining = ({
            uId: a,
            position: b,
            heading: c
        }) => {
            mp.events.add("client_gym_playerStart", async (d, e) => {
                if (d !== a) return;
                const f = mp.players.atRemoteId(e);
                mp.players.exists(f) && 0 !== f.handle && (await Promise.all([loadAnimDictAsync("amb@prop_human_muscle_chin_ups@male@enter"), loadAnimDictAsync("amb@prop_human_muscle_chin_ups@male@exit"), loadAnimDictAsync("amb@prop_human_muscle_chin_ups@male@idle_a"), loadAnimDictAsync("amb@prop_human_muscle_chin_ups@male@base")]), mp.players.exists(f) && 0 !== f.handle) && (f.setCoordsNoOffset(b.x, b.y, b.z, !1, !1, !1), f.setHeading(c), f.clearTasksImmediately(), f.taskPlayAnim("amb@prop_human_muscle_chin_ups@male@enter", "enter", 8, -8, 1600, 0, 0, !1, !1, !1), await mp.game.waitAsync(1625), mp.players.exists(f) && 0 !== f.handle && (f === mp.players.local ? (gymGameTick = async a => {
                    f.taskPlayAnim("amb@prop_human_muscle_chin_ups@male@base", "base", 8, -8, 3e3, 0, 0, !1, !1, !1), await mp.game.waitAsync(3e3), !a && global.disableAllAction && f.taskPlayAnim("amb@prop_human_muscle_chin_ups@male@idle_a", "idle_a", 8, -8, -1, 1, 0, !1, !1, !1)
                }, gymGameTickTime = 3150, startGymGame(), f.taskPlayAnim("amb@prop_human_muscle_chin_ups@male@idle_a", "idle_a", 8, -8, -1, 1, 0, !1, !1, !1)) : f.taskPlayAnim("amb@prop_human_muscle_chin_ups@male@base", "base", 1, 0, -1, 1, 0, !1, !1, !1)))
            }), mp.events.add("client_gym_playerEnd", async (b, c) => {
                if (b === a) {
                    const a = mp.players.atRemoteId(c);
                    mp.players.exists(a) && 0 !== a.handle && (a.taskPlayAnim("amb@prop_human_muscle_chin_ups@male@exit", "exit", 8, -8, 3700, 0, 0, !1, !1, !1), a === localPlayer && updateTimeout())
                }
            }), new global.ActionColshape(b, 0, .65, "\u043F\u043E\u0434\u0442\u044F\u0433\u0438\u0432\u0430\u0442\u044C\u0441\u044F", () => {
                isGymGameStarted || !tryStartTraining() || (global.actionAntiFlood("server_gym_taskStart", 2500) && mp.events.callRemote("server_gym_taskStart", a), global.notifyKeyHelpHide())
            })
        },
        createSeatMuscleBench = ({
            uId: a,
            position: b,
            heading: c
        }) => {
            mp.events.add("client_gym_playerStart", async (d, e, f) => {
                if (d !== a) return;
                const g = mp.players.atRemoteId(e);
                mp.players.exists(g) && 0 !== g.handle && (await Promise.all([loadAnimDictAsync("amb@prop_human_seat_muscle_bench_press@base"), loadAnimDictAsync("amb@prop_human_seat_muscle_bench_press@idle_a")]), mp.players.exists(g) && 0 !== g.handle && (g.clearTasksImmediately(), g.freezePosition(!0), g.setCollision(!1, !0), g.setCoordsNoOffset(b.x, b.y, b.z, !1, !1, !1), g.setHeading(c), g === mp.players.local ? (gymGameTick = async a => {
                    g.taskPlayAnim("amb@prop_human_seat_muscle_bench_press@idle_a", "idle_a", 8, -8, 2300, 0, 0, !1, !1, !1), await mp.game.waitAsync(2300), !a && global.disableAllAction && g.taskPlayAnim("amb@prop_human_seat_muscle_bench_press@base", "base", 8, -8, -1, 1, 0, !1, !1, !1)
                }, gymGameTickTime = 2450, startGymGame(), g.taskPlayAnim("amb@prop_human_seat_muscle_bench_press@base", "base", 8, -8, -1, 1, 0, !1, !1, !1)) : g.taskPlayAnim("amb@prop_human_seat_muscle_bench_press@idle_a", "idle_a", 1, 0, -1, 1, 0, !1, !1, !1), g.__gymAttachedItem = mp.game.joaat("seatMuscleBenchLevel" + f), mp.attachmentMngr.addClient(g, g.__gymAttachedItem)))
            }), mp.events.add("client_gym_playerEnd", async (b, c) => {
                if (b === a) {
                    const a = mp.players.atRemoteId(c);
                    mp.players.exists(a) && 0 !== a.handle && (a.__gymAttachedItem && (mp.attachmentMngr.removeFor(a, a.__gymAttachedItem), delete a.__gymAttachedItem), a.setCollision(!0, !1), a.freezePosition(!1), a.clearTasksImmediately(), a === localPlayer && updateTimeout())
                }
            }), new global.ActionColshape(b, 0, 1, "\u0436\u0430\u0442\u044C \u0448\u0442\u0430\u043D\u0433\u0443 \u043E\u0442 \u0433\u0440\u0443\u0434\u0438", () => {
                isGymGameStarted || !tryStartTraining() || (global.actionAntiFlood("server_gym_taskStart", 2500) && mp.events.callRemote("server_gym_taskStart", a), global.notifyKeyHelpHide())
            })
        };
    mp.attachmentMngr.register("seatMuscleBenchLevel0", "prop_barbell_20kg", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("seatMuscleBenchLevel1", "prop_barbell_40kg", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("seatMuscleBenchLevel2", "prop_barbell_60kg", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("seatMuscleBenchLevel3", "prop_barbell_80kg", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("seatMuscleBenchLevel4", "prop_barbell_100kg", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("seatMuscleBenchLevel5", "prop_barbell_100kg", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
    const createMuscleFreeWeights = ({
        uId: a,
        position: b,
        heading: c
    }) => {
        mp.events.add("client_gym_playerStart", async (d, e, f) => {
            if (d !== a) return;
            const g = mp.players.atRemoteId(e);
            mp.players.exists(g) && 0 !== g.handle && (await Promise.all([loadAnimDictAsync("amb@world_human_muscle_free_weights@male@barbell@idle_a"), loadAnimDictAsync("amb@world_human_muscle_free_weights@male@barbell@base")]), mp.players.exists(g) && 0 !== g.handle && (g.clearTasksImmediately(), g.freezePosition(!0), g.setCoordsNoOffset(b.x, b.y, b.z, !1, !1, !1), g.setHeading(c), g === mp.players.local ? (gymGameTick = async a => {
                g.taskPlayAnim("amb@world_human_muscle_free_weights@male@barbell@base", "base", 8, -8, 4500, 0, 0, !1, !1, !1), await mp.game.waitAsync(4500), !a && global.disableAllAction && g.taskPlayAnim("amb@world_human_muscle_free_weights@male@barbell@idle_a", "idle_a", 8, -8, -1, 1, 0, !1, !1, !1)
            }, gymGameTickTime = 4650, startGymGame(), g.taskPlayAnim("amb@world_human_muscle_free_weights@male@barbell@idle_a", "idle_a", 8, -8, -1, 1, 0, !1, !1, !1)) : g.taskPlayAnim("amb@world_human_muscle_free_weights@male@barbell@base", "base", 1, 0, -1, 1, 0, !1, !1, !1), g.__gymAttachedItem = mp.game.joaat("muscleFreeWeightsLevel" + f), mp.attachmentMngr.addClient(g, g.__gymAttachedItem)))
        }), mp.events.add("client_gym_playerEnd", async (b, c) => {
            if (b === a) {
                const a = mp.players.atRemoteId(c);
                mp.players.exists(a) && 0 !== a.handle && (a.__gymAttachedItem && (mp.attachmentMngr.removeFor(a, a.__gymAttachedItem), delete a.__gymAttachedItem), a.freezePosition(!1), a.clearTasksImmediately(), a === localPlayer && updateTimeout())
            }
        }), new global.ActionColshape(b, 0, .65, "\u043F\u043E\u0434\u043D\u0438\u043C\u0430\u0442\u044C \u0448\u0442\u0430\u043D\u0433\u0443 \u0441\u0442\u043E\u044F", () => {
            isGymGameStarted || !tryStartTraining() || (global.actionAntiFlood("server_gym_taskStart", 2500) && mp.events.callRemote("server_gym_taskStart", a), global.notifyKeyHelpHide())
        })
    };
    mp.attachmentMngr.register("muscleFreeWeightsLevel0", "prop_barbell_10kg", 28422, new mp.Vector3(0, 0, -.04), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("muscleFreeWeightsLevel1", "prop_barbell_20kg", 28422, new mp.Vector3(0, 0, -.04), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("muscleFreeWeightsLevel2", "prop_barbell_30kg", 28422, new mp.Vector3(0, 0, -.04), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("muscleFreeWeightsLevel3", "prop_barbell_40kg", 28422, new mp.Vector3(0, 0, -.04), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("muscleFreeWeightsLevel4", "prop_barbell_50kg", 28422, new mp.Vector3(0, 0, -.04), new mp.Vector3(0, 0, 0)), mp.attachmentMngr.register("muscleFreeWeightsLevel5", "prop_barbell_50kg", 28422, new mp.Vector3(0, 0, -.04), new mp.Vector3(0, 0, 0));
    const createMuscleFreeWeightsHand = ({
        uId: a,
        position: b
    }) => {
        mp.events.add("client_gym_playerStart", async (b, c, d) => {
            if (b !== a) return;
            const e = mp.players.atRemoteId(c);
            mp.players.exists(e) && 0 !== e.handle && (await Promise.all([loadAnimDictAsync("amb@world_human_muscle_free_weights@male@barbell@idle_a"), loadAnimDictAsync("amb@world_human_muscle_free_weights@male@barbell@base")]), mp.players.exists(e) && 0 !== e.handle && (e.clearTasksImmediately(), e === mp.players.local ? (gymGameTick = async a => {
                e.taskPlayAnim("amb@world_human_muscle_free_weights@male@barbell@base", "base", 8, -8, 4500, 0, 0, !1, !1, !1), await mp.game.waitAsync(4500), !a && global.disableAllAction && e.taskPlayAnim("amb@world_human_muscle_free_weights@male@barbell@idle_a", "idle_a", 8, -8, -1, 1, 0, !1, !1, !1)
            }, gymGameTickTime = 4650, startGymGame(), e.taskPlayAnim("amb@world_human_muscle_free_weights@male@barbell@idle_a", "idle_a", 8, -8, -1, 1, 0, !1, !1, !1)) : e.taskPlayAnim("amb@world_human_muscle_free_weights@male@barbell@base", "base", 1, 0, -1, 1, 0, !1, !1, !1), 4 <= d ? (e.__gymAttachedItem1 = mp.game.joaat("muscleFreeWeightsHand3_1"), mp.attachmentMngr.addClient(e, e.__gymAttachedItem1), e.__gymAttachedItem2 = mp.game.joaat("muscleFreeWeightsHand3_2"), mp.attachmentMngr.addClient(e, e.__gymAttachedItem2)) : 2 <= d ? (e.__gymAttachedItem1 = mp.game.joaat("muscleFreeWeightsHand2_1"), mp.attachmentMngr.addClient(e, e.__gymAttachedItem1), e.__gymAttachedItem2 = mp.game.joaat("muscleFreeWeightsHand2_2"), mp.attachmentMngr.addClient(e, e.__gymAttachedItem2)) : (e.__gymAttachedItem1 = mp.game.joaat("muscleFreeWeightsHand1_1"), mp.attachmentMngr.addClient(e, e.__gymAttachedItem1), e.__gymAttachedItem2 = mp.game.joaat("muscleFreeWeightsHand1_2"), mp.attachmentMngr.addClient(e, e.__gymAttachedItem2))))
        }), mp.events.add("client_gym_playerEnd", async (b, c) => {
            if (b === a) {
                const a = mp.players.atRemoteId(c);
                mp.players.exists(a) && 0 !== a.handle && (a.__gymAttachedItem1 && (mp.attachmentMngr.removeFor(a, a.__gymAttachedItem1), delete a.__gymAttachedItem1), a.__gymAttachedItem2 && (mp.attachmentMngr.removeFor(a, a.__gymAttachedItem2), delete a.__gymAttachedItem2), a.clearTasksImmediately(), a === localPlayer && updateTimeout())
            }
        }), new global.ActionColshape(b, 0, 1.2, "\u043F\u043E\u0434\u043D\u0438\u043C\u0430\u0442\u044C \u0433\u0430\u043D\u0442\u0435\u043B\u0438 \u0441\u0442\u043E\u044F", () => {
            isGymGameStarted || !tryStartTraining() || (global.actionAntiFlood("server_gym_taskStart", 2500) && mp.events.callRemote("server_gym_taskStart", a), global.notifyKeyHelpHide())
        })
    };
    mp.attachmentMngr.register("muscleFreeWeightsHand1_1", "prop_freeweight_01", 4185, new mp.Vector3(.025, -.03, 0), new mp.Vector3(0, 90, 0)), mp.attachmentMngr.register("muscleFreeWeightsHand1_2", "prop_freeweight_01", 64113, new mp.Vector3(.025, .01, 0), new mp.Vector3(0, 90, 0)), mp.attachmentMngr.register("muscleFreeWeightsHand2_1", "prop_freeweight_02", 4185, new mp.Vector3(.025, -.03, 0), new mp.Vector3(0, 90, 0)), mp.attachmentMngr.register("muscleFreeWeightsHand2_2", "prop_freeweight_02", 64113, new mp.Vector3(.025, .01, 0), new mp.Vector3(0, 90, 0)), mp.attachmentMngr.register("muscleFreeWeightsHand3_1", "prop_barbell_01", 4185, new mp.Vector3(.025, -.03, 0), new mp.Vector3(0, 90, 0)), mp.attachmentMngr.register("muscleFreeWeightsHand3_2", "prop_barbell_01", 64113, new mp.Vector3(.025, .01, 0), new mp.Vector3(0, 90, 0));
    const createSeatMuscleBenchHand = ({
        uId: a,
        position: b,
        heading: c
    }) => {
        mp.events.add("client_gym_playerStart", async (d, e, f) => {
            if (d !== a) return;
            const g = mp.players.atRemoteId(e);
            mp.players.exists(g) && 0 !== g.handle && (await Promise.all([loadAnimDictAsync("amb@prop_human_seat_muscle_bench_press@base"), loadAnimDictAsync("amb@prop_human_seat_muscle_bench_press@idle_a")]), mp.players.exists(g) && 0 !== g.handle && (g.clearTasksImmediately(), g.freezePosition(!0), g.setCollision(!1, !0), g.setCoordsNoOffset(b.x, b.y, b.z, !1, !1, !1), g.setHeading(c), g === mp.players.local ? (gymGameTick = async a => {
                g.taskPlayAnim("amb@prop_human_seat_muscle_bench_press@idle_a", "idle_a", 8, -8, 2300, 0, 0, !1, !1, !1), await mp.game.waitAsync(2300), !a && global.disableAllAction && g.taskPlayAnim("amb@prop_human_seat_muscle_bench_press@base", "base", 8, -8, -1, 1, 0, !1, !1, !1)
            }, gymGameTickTime = 2450, startGymGame(), g.taskPlayAnim("amb@prop_human_seat_muscle_bench_press@base", "base", 8, -8, -1, 1, 0, !1, !1, !1)) : g.taskPlayAnim("amb@prop_human_seat_muscle_bench_press@idle_a", "idle_a", 1, 0, -1, 1, 0, !1, !1, !1), 4 <= f ? (g.__gymAttachedItem1 = mp.game.joaat("muscleFreeWeightsHand3_1"), mp.attachmentMngr.addClient(g, g.__gymAttachedItem1), g.__gymAttachedItem2 = mp.game.joaat("muscleFreeWeightsHand3_2"), mp.attachmentMngr.addClient(g, g.__gymAttachedItem2)) : 2 <= f ? (g.__gymAttachedItem1 = mp.game.joaat("muscleFreeWeightsHand2_1"), mp.attachmentMngr.addClient(g, g.__gymAttachedItem1), g.__gymAttachedItem2 = mp.game.joaat("muscleFreeWeightsHand2_2"), mp.attachmentMngr.addClient(g, g.__gymAttachedItem2)) : (g.__gymAttachedItem1 = mp.game.joaat("muscleFreeWeightsHand1_1"), mp.attachmentMngr.addClient(g, g.__gymAttachedItem1), g.__gymAttachedItem2 = mp.game.joaat("muscleFreeWeightsHand1_2"), mp.attachmentMngr.addClient(g, g.__gymAttachedItem2))))
        }), mp.events.add("client_gym_playerEnd", async (b, c) => {
            if (b === a) {
                const a = mp.players.atRemoteId(c);
                mp.players.exists(a) && 0 !== a.handle && (a.__gymAttachedItem1 && (mp.attachmentMngr.removeFor(a, a.__gymAttachedItem1), delete a.__gymAttachedItem1), a.__gymAttachedItem2 && (mp.attachmentMngr.removeFor(a, a.__gymAttachedItem2), delete a.__gymAttachedItem2), a.setCollision(!0, !1), a.freezePosition(!1), a.clearTasksImmediately(), a === localPlayer && updateTimeout())
            }
        }), new global.ActionColshape(b, 0, 1, "\u0436\u0430\u0442\u044C \u0433\u0430\u043D\u0442\u0435\u043B\u0438 \u043E\u0442 \u0433\u0440\u0443\u0434\u0438", () => {
            isGymGameStarted || !tryStartTraining() || (global.actionAntiFlood("server_gym_taskStart", 2500) && mp.events.callRemote("server_gym_taskStart", a), global.notifyKeyHelpHide())
        })
    };
    let lastTrainingTime = 0;
    const tryStartTraining = () => {
            const a = new Date().getTime() / 1e3;
            return !(lastTrainingTime + 30 > a) || (mp.api.notify.error("\u0412\u044B \u0435\u0449\u0435 \u043D\u0435 \u043E\u0442\u0434\u043E\u0445\u043D\u0443\u043B\u0438"), !1)
        },
        updateTimeout = () => {
            lastTrainingTime = new Date().getTime() / 1e3
        };
    let isGymGameStarted = !1,
        gymGameTick = () => {},
        gymGameTickTime = 0;
    const startGymGame = async () => {
        if (isGymGameStarted) return;
        isGymGameStarted = !0, global.disableAllAction = !0, global.enableCameraOnDisabled = !0;
        const a = localPlayer.getHealth(),
            {
                x: b,
                y: c,
                z: d
            } = localPlayer.position;
        let e = 25,
            f = !1,
            g = 0;
        const h = a => {
            0 === a ? a = -5 : 1 === a ? a = 5 : 2 == a && (a = 10), 0 < a ? (e += a, gymGameTick(100 <= e || 0 >= e), setTimeout(() => {
                f || (f = 100 <= e || 0 >= e, !f && i())
            }, gymGameTickTime)) : (e += a, f = 100 <= e || 0 >= e, g++, !f && setTimeout(() => {
                f || i()
            }, 1e3))
        };
        mp.events.add("__client_gym_tick", h);
        const i = () => {
                var a = Math.floor;
                global.menuBrowser.execute(`startGymGame(${.8+Math.random()}, ${a(100*Math.random())+350}, ${[.25,.35,.45,.55][a(4*Math.random())]}, '__client_gym_tick')`)
            },
            j = setInterval(() => {
                if (f || a - 5 > localPlayer.getHealth() || 15 < mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, b, c, d)) return f = !0, isGymGameStarted = !1, global.disableAllAction = !1, global.enableCameraOnDisabled = !1, a - 5 > localPlayer.getHealth() ? mp.api.notify.error("\u041D\u0435\u043B\u044C\u0437\u044F \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u043F\u0440\u0438 \u0441\u0438\u043B\u044C\u043D\u043E\u043C \u0433\u043E\u043B\u043E\u0434\u0435 \u0438\u043B\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0443\u0440\u043E\u043D\u0430") : 100 <= e ? mp.api.notify.success("\u041E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434, \u0412\u044B \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435 \u043F\u0440\u0438\u043B\u0438\u0432 \u0441\u0438\u043B") : mp.api.notify.error("\u041D\u0435\u0443\u0434\u0430\u0447\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434, \u043E\u0442\u0434\u043E\u0445\u043D\u0438\u0442\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437"), mp.events.callRemote("server_gym_end", 100 <= e, g), mp.events.remove("__client_gym_tick", h), void clearInterval(j)
            }, 100);
        i(), global.antiAFK_sendAction()
    };
    createChinUpsTraining({
        uId: "BG_CHINUPS_1",
        position: new mp.Vector3(-1204.73, -1564.33, 4.61),
        heading: 35
    }), createChinUpsTraining({
        uId: "BG_CHINUPS_2",
        position: new mp.Vector3(-1200.03, -1571.16, 4.6115),
        heading: 214
    }), createChinUpsTraining({
        uId: "BG_CHINUPS_3",
        position: new mp.Vector3(-1198.7, -1579.24, 4.61),
        heading: 35
    }), createChinUpsTraining({
        uId: "BG_CHINUPS_4",
        position: new mp.Vector3(-1196.9, -1577.98, 4.61),
        heading: 35
    }), createChinUpsTraining({
        uId: "BG_CHINUPS_5",
        position: new mp.Vector3(-1195.2, -1572.45, 4.62),
        heading: 305
    }), createChinUpsTraining({
        uId: "BG_CHINUPS_6",
        position: new mp.Vector3(-1196.47, -1570.64, 4.62),
        heading: 305
    }), createChinUpsTraining({
        uId: "BG_CHINUPS_7",
        position: new mp.Vector3(-1207.79, -1564.45, 4.61),
        heading: 125
    }), createChinUpsTraining({
        uId: "BG_CHINUPS_8",
        position: new mp.Vector3(-1209.04, -1562.65, 4.61),
        heading: 125
    }), createChinUpsTraining({
        uId: "BG_CHINUPS_9",
        position: new mp.Vector3(-1201.35, -1559.65, 4.62),
        heading: 125
    }), createSeatMuscleBench({
        uId: "BG_SEATMUSCLEBENCH_1",
        position: new mp.Vector3(-1197.94, -1568.24, 4.12),
        heading: 305
    }), createSeatMuscleBench({
        uId: "BG_SEATMUSCLEBENCH_2",
        position: new mp.Vector3(-1200.79, -1562.24, 4.12),
        heading: 125
    }), createSeatMuscleBench({
        uId: "BG_SEATMUSCLEBENCH_3",
        position: new mp.Vector3(-1207.05, -1560.94, 4.12),
        heading: 215
    }), createSeatMuscleBench({
        uId: "BG_SEATMUSCLEBENCH_4",
        position: new mp.Vector3(-1201.16, -1575.21, 4.12),
        heading: 215
    }), createSeatMuscleBench({
        uId: "BG_SEATMUSCLEBENCH_5",
        position: new mp.Vector3(-1207.27, -1567.65, 4.12),
        heading: 305
    }), createSeatMuscleBench({
        uId: "BG_SEATMUSCLEBENCH_6",
        position: new mp.Vector3(-1203.51, -1558.66, 4.12),
        heading: 125
    }), createSeatMuscleBench({
        uId: "BG_SEATMUSCLEBENCH_7",
        position: new mp.Vector3(-1206.9, -1557.7, 4.12),
        heading: 95
    }), createMuscleFreeWeights({
        uId: "BG_MUSCLEFREEWEIGHTS_1",
        position: new mp.Vector3(-1199.21, -1574.38, 4.61),
        heading: 215
    }), createMuscleFreeWeights({
        uId: "BG_MUSCLEFREEWEIGHTS_2",
        position: new mp.Vector3(-1197.1, -1572.84, 4.61),
        heading: 215
    }), createMuscleFreeWeights({
        uId: "BG_MUSCLEFREEWEIGHTS_3",
        position: new mp.Vector3(-1202.64, -1565.52, 4.61),
        heading: 35
    }), createMuscleFreeWeights({
        uId: "BG_MUSCLEFREEWEIGHTS_4",
        position: new mp.Vector3(-1209.85, -1561.37, 4.61),
        heading: 80
    }), createMuscleFreeWeightsHand({
        uId: "BG_MUSCLEFREEWEIGHTS_HAND_1",
        position: new mp.Vector3(-1209.53, -1558.81, 4.61)
    }), createMuscleFreeWeightsHand({
        uId: "BG_MUSCLEFREEWEIGHTS_HAND_2",
        position: new mp.Vector3(-1198.05, -1565.04, 4.61)
    }), createMuscleFreeWeightsHand({
        uId: "BG_MUSCLEFREEWEIGHTS_HAND_3",
        position: new mp.Vector3(-1202.79, -1573.27, 4.61)
    }), createSeatMuscleBenchHand({
        uId: "BG_SEATMUSCLEBENCH_HAND_1",
        position: new mp.Vector3(-1201.35, -1566.4, 4.12),
        heading: 35
    }), createSeatMuscleBenchHand({
        uId: "BG_SEATMUSCLEBENCH_HAND_2",
        position: new mp.Vector3(-1203.35, -1567.85, 4.12),
        heading: 35
    }), createSeatMuscleBenchHand({
        uId: "BG_SEATMUSCLEBENCH_HAND_3",
        position: new mp.Vector3(-1205.92, -1569.25, 4.12),
        heading: 305
    }), createSeatMuscleBenchHand({
        uId: "BG_SEATMUSCLEBENCH_HAND_4",
        position: new mp.Vector3(-1205.06, -1563.89, 4.12),
        heading: 215
    }), createChinUpsTraining({
        uId: "ARMY_CHINUPS_1",
        position: new mp.Vector3(-1970.8, 3330.27, 32.96),
        heading: 240
    }), createChinUpsTraining({
        uId: "ARMY_CHINUPS_2",
        position: new mp.Vector3(-1967.5, 3336.25, 32.96),
        heading: 240
    }), createChinUpsTraining({
        uId: "ARMY_CHINUPS_3",
        position: new mp.Vector3(-1964.2, 3341.66, 32.96),
        heading: 240
    }), createSeatMuscleBench({
        uId: "ARMY_SEATMUSCLEBENCH_1",
        position: new mp.Vector3(-2441.58, 3284.44, 32.55),
        heading: 60
    }), createSeatMuscleBench({
        uId: "ARMY_SEATMUSCLEBENCH_2",
        position: new mp.Vector3(-2440.35, 3286.94, 32.55),
        heading: 60
    }), createMuscleFreeWeights({
        uId: "ARMY_MUSCLEFREEWEIGHTS_1",
        position: new mp.Vector3(-2447.07, 3285.45, 32.99),
        heading: 60
    }), createMuscleFreeWeights({
        uId: "ARMY_MUSCLEFREEWEIGHTS_2",
        position: new mp.Vector3(-2445.8, 3287.59, 32.98),
        heading: 60
    }), createMuscleFreeWeights({
        uId: "ARMY_MUSCLEFREEWEIGHTS_3",
        position: new mp.Vector3(-2444.6, 3289.93, 32.98),
        heading: 60
    }), createMuscleFreeWeightsHand({
        uId: "ARMY_MUSCLEFREEWEIGHTS_HAND_1",
        position: new mp.Vector3(-2443.31, 3281.53, 32.98)
    }), createChinUpsTraining({
        uId: "PRISON_CHINUPS_1",
        position: new mp.Vector3(1643.39, 2527.75, 45.56),
        heading: 50
    }), createChinUpsTraining({
        uId: "PRISON_CHINUPS_2",
        position: new mp.Vector3(1649.16, 2529.57, 45.56),
        heading: 50
    }), createSeatMuscleBench({
        uId: "PRISON_SEATMUSCLEBENCH_1",
        position: new mp.Vector3(1640.52, 2522.35, 45.06),
        heading: 230
    }), createSeatMuscleBench({
        uId: "PRISON_SEATMUSCLEBENCH_2",
        position: new mp.Vector3(1635.75, 2526.75, 45.06),
        heading: 230
    }), createSeatMuscleBench({
        uId: "PRISON_SEATMUSCLEBENCH_3",
        position: new mp.Vector3(1638.15, 2529.75, 45.06),
        heading: 230
    }), createSeatMuscleBench({
        uId: "PRISON_SEATMUSCLEBENCH_4",
        position: new mp.Vector3(1640.75, 2532.75, 45.06),
        heading: 230
    }), createSeatMuscleBench({
        uId: "PRISON_SEATMUSCLEBENCH_5",
        position: new mp.Vector3(1643.05, 2535.35, 45.06),
        heading: 230
    }), createMuscleFreeWeightsHand({
        uId: "PRSION_MUSCLEFREEWEIGHTS_HAND_1",
        position: new mp.Vector3(1646.75, 2536.32, 45.56)
    }), createMuscleFreeWeightsHand({
        uId: "PRISON_MUSCLEFREEWEIGHTS_HAND_2",
        position: new mp.Vector3(1643.98, 2523.17, 45.56)
    });
    const loadAnimDictAsync = async a => {
        if (!mp.game.streaming.hasAnimDictLoaded(a)) {
            mp.game.streaming.requestAnimDict(a);
            do await mp.game.waitAsync(50); while (!mp.game.streaming.hasAnimDictLoaded(a))
        }
    };
}