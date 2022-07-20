{
    const mp = global.mp;
    (() => {
        const a = [new mp.Vector3(1864.92, 2705.94, 44.91), new mp.Vector3(1860.26, 2714.02, 44.93), new mp.Vector3(1863.08, 2728.62, 44.82), new mp.Vector3(1872.39, 2732.68, 44.81), new mp.Vector3(1884.85, 2724.24, 44.83)];
        let b = null,
            c = [],
            d = [],
            e = null,
            f = null,
            g = null;
        global.registerFamilyQuest({
            code: "MOTIVATED_VOLUNTEERING",
            onStart: () => {
                mp.blips.exists(b) && b.destroy(), c.forEach(a => a.destroy()), c = [], d.forEach(a => mp.markers.exists(a) && a.destroy()), d = [], e && (e.destroy(), e = null), mp.markers.exists(f) && f.destroy(), mp.blips.exists(g) && g.destroy(), b = mp.blips.new(764, new mp.Vector3(1874.32, 2715.55, 55.82), {
                    color: 3,
                    shortRange: !1,
                    name: "?"
                }), c = a.map(a => new global.ActionColshape(a, 0, 2, "\u0432\u0437\u044F\u0442\u044C \u044F\u0449\u0438\u043A", () => {
                    global.actionAntiFlood("server_govContract_takeMotivatedVolunteering", 5e3) && mp.events.callRemote("server_govContract_takeMotivatedVolunteering")
                })), d = a.map(a => mp.markers.new(1, new mp.Vector3(a.x, a.y, a.z), 2, {
                    color: [237, 194, 21, 255],
                    rotation: new mp.Vector3(0, 0, 0),
                    bobUpAndDown: !0
                })), e = new global.TriggerColshape(new mp.Vector3(752.41, -968.97, 23.89), 0, 3, () => {
                    const a = mp.players.local;
                    a.vehicle && a.vehicle.getPedInSeat(-1) == a.handle && !(60 < 3.6 * a.vehicle.getSpeed()) && global.actionAntiFlood("server_govContract_endMotivatedVolunteering", 5e3) && mp.events.callRemote("server_govContract_endMotivatedVolunteering")
                }, () => {}), f = mp.markers.new(27, new mp.Vector3(752.41, -968.97, 23.89), 2, {
                    color: [255, 0, 0, 150],
                    rotation: new mp.Vector3(0, 0, 0),
                    bobUpAndDown: !0
                }), g = mp.blips.new(367, new mp.Vector3(752.41, -968.97, 23.89), {
                    color: 25,
                    shortRange: !1,
                    name: "?",
                    scale: 1.5
                })
            },
            onEnd: () => {
                mp.blips.exists(b) && b.destroy(), c.forEach(a => a.destroy()), c = [], d.forEach(a => mp.markers.exists(a) && a.destroy()), d = [], e && (e.destroy(), e = null), mp.markers.exists(f) && f.destroy(), mp.blips.exists(g) && g.destroy()
            },
            localObjects: []
        })
    })(), (() => {
        var a = !1;
        const b = [
            [714.79, -967.89, 29.4, 88],
            [714.92, -970.23, 29.4, 88],
            [715.02, -972.58, 29.4, 88],
            [711.46, -969.76, 29.4, 88],
            [716.63, -959.94, 29.4, 167],
            [719.29, -959.87, 29.4, 167],
            [714.28, -959.99, 29.4, 167],
            [716.57, -962.26, 29.4, 167],
            [719.15, -962.4, 29.4, 167],
            [713.77, -974.07, 29.4, 167],
            [712.06, -974.02, 29.4, 167]
        ];
        for (const c of b) new global.ActionColshape(new mp.Vector3(c[0], c[1], c[2]), 0, 2, "\u043D\u0430\u0447\u0430\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C", () => {
            !global.actionAntiFlood("server_govContract_startMakeClothes", 2e3) || a || (mp.players.local.setHeading(c[3]), mp.events.callRemote("server_govContract_startMakeClothes"))
        });
        mp.events.add("client_contract_startMakeClothes", () => {
            a = !0
        }), mp.events.add("client_contract_endMakeClothes", () => {
            a = !1
        })
    })(), (() => {
        var a = Math.floor;
        const b = mp.players.local;
        let c = new mp.Vector3(-429.77, -2742.4, 5),
            d = new mp.Vector3(-476.8, -2734.42, 5),
            e = mp.blips.new(356, new mp.Vector3(-458.29, -2750.87, 6), {
                name: "\u041F\u043E\u0440\u0442",
                color: 4,
                shortRange: !0
            }),
            f = 0,
            g = !1,
            h = !1,
            i = null,
            j = !1;
        mp.events.add("client_jobs_port_start", a => {
            j || (f = a, g = !1, h = !1, m(), mp.blips.exists(i) && i.destroy(), i = mp.blips.new(0, new mp.Vector3(-458.29, -2750.87, 6), {
                color: 1,
                scale: 1,
                shortRange: !1,
                name: "???"
            }), mp.blips.exists(e) && e.destroy(), e = mp.blips.new(356, new mp.Vector3(-458.29, -2750.87, 6), {
                name: "\u041F\u043E\u0440\u0442",
                color: 4,
                shortRange: !0
            }), mp.events.add("render", l), j = !0)
        }), mp.events.add("client_jobs_port_end", () => {
            j && (mp.events.remove("render", l), mp.blips.exists(i) && i.destroy(), j = !1)
        });
        let k = 0;
        const l = () => {
            if (10 < ++k) {
                if (k = 0, b.vehicle) return;
                const {
                    x: a,
                    y: e,
                    z: f
                } = b.position;
                if (!g) {
                    if (n.isActive(b)) return void(g = !0);
                    1.5 > mp.dist(a, e, f, c.x, c.y, c.z + 1) && global.actionAntiFlood("server_jobs_port_first", 2e3) && mp.events.callRemote(mp.clientEvCrypt("server_jobs_port_first"))
                } else {
                    if (!n.isActive(b)) return m(), h = !1, void(g = !1);
                    !h && 1.5 > mp.dist(a, e, f, d.x, d.y, d.z + 1) && (h = !0, global.menuBrowser.execute(`startPortGame('${mp.clientEvCrypt("client_jobs_port_game")}')`))
                }
            }
            g ? mp.game.graphics.drawMarker(0, d.x, d.y, d.z + 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 255, 0, 0, 255, !1, !1, 2, !1, null, null, !1) : mp.game.graphics.drawMarker(0, c.x, c.y, c.z + 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 255, 0, 0, 255, !1, !1, 2, !1, null, null, !1)
        };
        mp.events.add(mp.clientEvCrypt("client_jobs_port_game"), a => {
            a ? mp.api.notify.success(`+${f}$ за ящик`) : mp.api.notify.error("\u0412\u044B \u0443\u0440\u043E\u043D\u0438\u043B\u0438 \u044F\u0449\u0438\u043A, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435\u0441\u044C \u0437\u0430 \u043D\u043E\u0432\u044B\u043C"), mp.events.callRemote(mp.clientEvCrypt("server_jobs_port_second"), a)
        });
        const m = () => {
                c = [new mp.Vector3(-426.47, -2741.7, 5), new mp.Vector3(-427.98, -2740.03, 5), new mp.Vector3(-429.22, -2741.17, 5), new mp.Vector3(-430.39, -2742.29, 5), new mp.Vector3(-433.09, -2740.26, 5), new mp.Vector3(-436.67, -2741.82, 5)][a(6 * Math.random())], d = [new mp.Vector3(-459.05, -2717.81, 5), new mp.Vector3(-461.31, -2718.66, 5), new mp.Vector3(-462.82, -2716.1, 5), new mp.Vector3(-464.65, -2714.72, 5), new mp.Vector3(-466.27, -2714.29, 5)][a(5 * Math.random())]
            },
            n = new global.CustomScenarioAnimWithItem("portJobScen", "portJobScenItem", "anim@heists@box_carry@", "idle", 49);
        mp.attachmentMngr.register("portJobScenItem", "prop_cardbordbox_02a", 28422, new mp.Vector3(0, -.18, -.18), new mp.Vector3(0, 0, 0))
    })(), (() => {
        const a = mp.players.local,
            b = [new mp.Vector3(32.86, -445.57, 44.76), new mp.Vector3(21.83, -407.92, 44.76), new mp.Vector3(32.95, -375.04, 44.76), new mp.Vector3(57.46, -377.23, 44.76), new mp.Vector3(45.93, -410.72, 44.76)];
        mp.blips.new(566, new mp.Vector3(142.58, -368.52, 43.49), {
            name: "\u0421\u0442\u0440\u043E\u0439\u043A\u0430",
            color: 4,
            shortRange: !0
        });
        let c = null,
            d = 0,
            e = new mp.Vector3(0, 0, 0),
            f = -1,
            g = !1,
            h = !1;
        mp.events.add("client_jobs_bulder_start", a => {
            h || (d = a, g = !1, mp.blips.exists(c) && c.destroy(), c = mp.blips.new(0, new mp.Vector3(41.58, -412.85, 44.6), {
                color: 1,
                shortRange: !1,
                name: "???"
            }), j(), mp.game.streaming.requestAnimDict("weapons@first_person@aim_rng@generic@projectile@thermal_charge@"), mp.events.add("render", i), h = !0)
        }), mp.events.add("client_jobs_bulder_end", () => {
            h && (mp.blips.exists(c) && c.destroy(), mp.events.remove("render", i), h = !1)
        });
        const i = () => {
            if (!a.vehicle) {
                const {
                    x: b,
                    y: c,
                    z: d
                } = a.position;
                !g && 1.5 > mp.dist(b, c, d, e.x, e.y, e.z) && (a.taskPlayAnim("weapons@first_person@aim_rng@generic@projectile@thermal_charge@", "plant_floor", 8, -8, -1, 1, 0, !1, !1, !1), g = !0, global.menuBrowser.execute(`startBuilderGame('${mp.clientEvCrypt("client_jobs_builder_game")}')`)), mp.game.graphics.drawMarker(1, e.x, e.y, e.z, 0, 0, 0, 0, 0, 0, 2, 2, 15, 255, 0, 0, 120, !1, !1, 2, !1, null, null, !1)
            }
        };
        mp.events.add(mp.clientEvCrypt("client_jobs_builder_game"), b => {
            b && (mp.events.callRemote(mp.clientEvCrypt("server_jobs_builder_point"), f), mp.api.notify.success("\u0412\u044B \u0441\u043F\u0440\u0430\u0432\u0438\u043B\u0438\u0441\u044C \u0441 \u0437\u0430\u0434\u0430\u043D\u0438\u0435\u043C. \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u043D\u043E\u0432\u043E\u0439 \u0442\u043E\u0447\u043A\u0435")), a.clearTasks(), j(), g = !1
        });
        const j = () => {
            for (;;) {
                const a = Math.floor(Math.random() * b.length);
                if (a !== f) return f = a, void(e = b[a])
            }
        }
    })(), (() => {
        const a = mp.players.local;
        mp.blips.new(527, new mp.Vector3(2945.27, 2781.26, 38.55), {
            name: "\u0428\u0430\u0445\u0442\u0430",
            color: 4,
            shortRange: !0
        });
        const b = [new mp.Vector3(2983.28, 2793.94, 43.02), new mp.Vector3(2990.11, 2779.9, 42.44), new mp.Vector3(2996.61, 2755.75, 41.98)],
            c = [new mp.Vector3(2963.83, 2821.29, 42.74), new mp.Vector3(2962.28, 2822.17, 42.84), new mp.Vector3(2959.7, 2821.68, 42.14), new mp.Vector3(2958.76, 2818.36, 42)];
        let d = new mp.Vector3(0, 0, 0),
            e = -1,
            f = !1,
            g = !1,
            h = -1,
            i = !1,
            j = [];
        mp.events.add("client_jobs_mine_start", () => {
            i || (j.forEach(a => mp.blips.exists(a) && a.destroy()), j = b.map(a => mp.blips.new(0, a, {
                color: 1,
                shortRange: !1,
                name: "???"
            })), mp.game.streaming.requestAnimDict("weapons@first_person@aim_rng@generic@projectile@thermal_charge@"), f = !1, g = !1, l(), mp.events.add("render", k), i = !0)
        }), mp.events.add("client_jobs_mine_end", () => {
            i && (j.forEach(a => mp.blips.exists(a) && a.destroy()), j = [], mp.events.remove("render", k), i = !1)
        });
        const k = () => {
            if (a.vehicle) return;
            const {
                x: c,
                y: i,
                z: j
            } = a.position;
            if (!f) {
                if (m.isActive(a)) return l(), void(f = !0);
                b.forEach((b, d) => {
                    !g && 1.5 > mp.dist(c, i, j, b.x, b.y, b.z + 1) && global.actionAntiFlood("clientMineGameStart", 5e3) && (h = d, g = !0, a.taskPlayAnim("weapons@first_person@aim_rng@generic@projectile@thermal_charge@", "plant_floor", 8, -8, -1, 1, 0, !1, !1, !1), global.menuBrowser.execute(`startMineGame('${mp.clientEvCrypt("client_jobs_mine_game")}')`)), mp.game.graphics.drawMarker(0, b.x, b.y, b.z + 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 255, 0, 0, 255, !1, !1, 2, !1, null, null, !1)
                })
            } else {
                if (!m.isActive(a)) return a.taskPlayAnim("weapons@first_person@aim_rng@generic@projectile@thermal_charge@", "plant_floor", 8, -8, -1, 1, 0, !1, !1, !1), setTimeout(() => {
                    a.stopAnimTask("weapons@first_person@aim_rng@generic@projectile@thermal_charge@", "plant_floor", 3)
                }, 1500), void(f = !1);
                1.5 > mp.dist(c, i, j, d.x, d.y, d.z + 1) && global.actionAntiFlood("server_jobs_mine_put", 5e3) && mp.events.callRemote(mp.clientEvCrypt("server_jobs_mine_put"), e), mp.game.graphics.drawMarker(0, d.x, d.y, d.z + 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 255, 0, 0, 255, !1, !1, 2, !1, null, null, !1)
            }
        };
        mp.events.add(mp.clientEvCrypt("client_jobs_mine_game"), b => {
            global.actionAntiFlood("clientMineGameStart", 5e3), a.clearTasks(), g = !1, b && mp.events.callRemote(mp.clientEvCrypt("server_jobs_mine_take"), h)
        });
        const l = () => {
                for (;;) {
                    const a = Math.floor(Math.random() * c.length);
                    if (a !== e) return d = c[a], void(e = a)
                }
            },
            m = new global.CustomScenarioAnimWithItem("mineJobScen", "mineJobScenItem", "anim@heists@box_carry@", "idle", 49);
        mp.attachmentMngr.register("mineJobScenItem", "prop_rock_5_d", 28422, new mp.Vector3(0, -.18, -.25), new mp.Vector3(0, 0, 0))
    })(), (() => {
        mp.events.add("playerCreateWaypoint", a => {
            const b = mp.players.local.vehicle;
            b && b.getVariable("isTaxiVeh") && mp.events.callRemote("playerCreateWaypointServer", JSON.stringify(a))
        })
    })();
}