{
    const mp = global.mp,
        localPlayer = mp.players.local; {
        const a = [{
            clubId: "BIKER_ANGELS",
            name: "Angels of Death",
            phoneNumber: "264357",
            fuelPosition: new mp.Vector3(2004.23, 3040.9, 46.21),
            questItemMarkerPosition: new mp.Vector3(1985.83, 3049, 46.22)
        }, {
            clubId: "BIKER_LOSTMC",
            name: "Lost MC",
            phoneNumber: "567862",
            fuelPosition: new mp.Vector3(979.41, -142.02, 73.23),
            questItemMarkerPosition: new mp.Vector3(985.8, -96.24, 73.85)
        }, {
            clubId: "BIKER_BANDIDOS",
            name: "Bandidos",
            phoneNumber: "226343",
            fuelPosition: new mp.Vector3(-2178.52, 4270.83, 48.07),
            questItemMarkerPosition: new mp.Vector3(-2181.52, 4298.2, 48.18)
        }];
        let b = null,
            c = [],
            d = [];
        for (const f of a) global.registerClubEvent({
            clubId: f.clubId,
            onEnter: () => {
                e(), b = f, d.forEach(a => a()), d = [], global.smartphoneBrowser.call("b:smartphone:addServerContact", f.phoneNumber, f.name);
                const a = new global.ActionColshape(f.fuelPosition, 0, 3, "\u0437\u0430\u043F\u0440\u0430\u0432\u0438\u0442\u044C\u0441\u044F", () => {
                    mp.events.callRemote("s:clubs:biker:fuel")
                });
                a.forVehicle = !0, a.onceMode = !0, a.isPlayerCanUse = () => {
                    const a = localPlayer.vehicle;
                    return a && -1 !== [8].indexOf(a.getClass())
                }, c.push(a), k = setInterval(l, 1e4)
            },
            onLeave: () => {
                e(), global.smartphoneBrowser.call("b:smartphone:removeServerContact", f.phoneNumber)
            }
        });
        const e = () => {
            b = null, c.forEach(a => a.destroy()), c = [], k && clearInterval(k), k = null, i = !1
        };
        mp.events.add("c:clubs:biker:taskVehicleCoords", () => {
            let a = null,
                b = 0;
            try {
                const {
                    x: c,
                    y: d,
                    z: e
                } = localPlayer.position, f = mp.game.pathfind.getClosestVehicleNodeWithHeading(c, d, e, 0, 3, 0), g = mp.game.pathfind.getClosestVehicleNodeWithHeading(c, d, e, 1, 3, 0), h = mp.dist(c, d, e, f.outPosition.x, f.outPosition.y, f.outPosition.z), i = mp.dist(c, d, e, g.outPosition.x, g.outPosition.y, g.outPosition.z), j = h < i ? f : g;
                a = mp.game.pathfind.getPointOnRoadSide(j.outPosition.x, j.outPosition.y, j.outPosition.z, 0), b = j.outHeading, 100 < mp.dist(c, d, e, a.x, a.y, a.z) && (a = null)
            } catch (a) {}
            return a ? void mp.events.callRemote("s:clubs:biker:tpMoto", a.x, a.y, a.z + 1, b) : mp.api.notify.error("\u0421\u044E\u0434\u0430 \u043D\u0435\u043B\u044C\u0437\u044F \u043F\u0440\u0438\u0433\u043D\u0430\u0442\u044C \u0431\u0430\u0439\u043A")
        }), mp.events.add("c:clubs:biker:vehTp", a => {
            let b = 100;
            const c = setInterval(async () => {
                if (0 > --b) return void clearInterval(c);
                const d = mp.vehicles.atRemoteId(a);
                if (!mp.vehicles.exists(d) || 0 === d.handle) return;
                clearInterval(c), d.setOnGroundProperly();
                const e = mp.blips.new(226, d.getCoords(!0), {
                    color: 3,
                    shortRange: !1
                });
                setTimeout(() => {
                    e.destroy()
                }, 1e4), mp.api.notify.success("\u041C\u043E\u0442\u043E\u0446\u0438\u043A\u043B \u0443\u0436\u0435 \u043D\u0435\u043F\u043E\u0434\u0430\u043B\u0435\u043A\u0443 \u0438 \u043E\u0442\u043C\u0435\u0447\u0435\u043D \u0443 \u0412\u0430\u0441 \u043D\u0430 \u043A\u0430\u0440\u0442\u0435");
                const f = d.getIsEngineRunning();
                (f || d.setEngineOn(!0, !0, !0), d.setLights(2), d.startHorn(1e3, 0, !0), await mp.game.waitAsync(350), mp.vehicles.exists(d) && 0 !== d.handle) && (d.setLights(1), await mp.game.waitAsync(350), mp.vehicles.exists(d) && 0 !== d.handle) && (d.setLights(2), await mp.game.waitAsync(750), mp.vehicles.exists(d) && 0 !== d.handle && (d.setLights(1), !f && d.setEngineOn(!1, !0, !0)))
            }, 100)
        });
        const f = mp.isTestServer ? 0 : 9,
            g = mp.isTestServer ? 10 : 10,
            h = 86;
        let i = !1,
            j = !1,
            k = null;
        const l = () => {
            const a = localPlayer.vehicle;
            if (!a || 8 !== a.getClass()) return void(i && (i = !1, mp.api.notify.info("\u0412\u044B \u043F\u043E\u043A\u0438\u043D\u0443\u043B\u0438 \u043C\u043E\u0442\u043E \u043F\u0440\u043E\u0431\u0435\u0433")));
            const b = localPlayer.getVariable("clubId"),
                {
                    x: c,
                    y: d,
                    z: e
                } = localPlayer.position;
            let k = 0;
            for (const a of mp.players.streamed) {
                if (a === localPlayer || a.getVariable("clubId") !== b) continue;
                const f = a.vehicle;
                if (!f || 8 !== f.getClass()) continue;
                const {
                    x: g,
                    y: h,
                    z: i
                } = a.getCoords(!0);
                100 < mp.dist(c, d, e, g, h, i) || k++
            }
            if (!!i) k < f && (i = !1, mp.api.notify.info("\u0412\u044B \u043F\u043E\u043A\u0438\u043D\u0443\u043B\u0438 \u043C\u043E\u0442\u043E \u043F\u0440\u043E\u0431\u0435\u0433"));
            else if (k >= f) {
                i = !0, j = !1;
                let b = mp.game.controls.isControlPressed(0, h),
                    c = b ? getMs() : -1,
                    d = -1;
                const e = () => {
                    if (!i) return void mp.events.remove("render", e);
                    const f = mp.game.controls.isControlPressed(0, h);
                    if (!b && f) b = !0, c = getMs();
                    else if (b && !f) {
                        const e = getMs();
                        b = !1, c + 1e3 < e && a.getSpeed() > 20 / 3.6 && d + 1e3 * g < e && (d = e, mp.events.callRemote("s:clubs:biker:motoMeeting"))
                    }
                };
                mp.events.add("render", e), mp.api.notify.info("\u0412\u044B \u0441\u0442\u0430\u043B\u0438 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u043C \u043C\u043E\u0442\u043E \u043F\u0440\u043E\u0431\u0435\u0433\u0430")
            }
        };
        mp.events.add("c:clubs:biker:motoMeetingTick", a => {
            j && a || (j = a, mp.api.notify.success(`+${1} репутации в клубе`), j && mp.api.notify.info("\u0412\u044B \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0438 \u0441\u0432\u043E\u044E \u0447\u0430\u0441\u0442\u044C \u0432 \u043F\u0440\u043E\u0431\u0435\u0433\u0435 \u0438 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E \u0437\u0430 \u0443\u0447\u0430\u0441\u0442\u0438\u0435"))
        }), mp.events.add("c:clubs:biker:motoMeetingTimeout", () => {
            j || (j = !0, mp.api.notify.info("\u0412\u044B \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0443\u0436\u0435 \u0443\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u043B\u0438 \u0432 \u043F\u0440\u043E\u0431\u0435\u0433\u0435 \u0438 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E"))
        }); {
            let a = null;
            global.registerPlayerQuest({
                code: "CLUB_BIKER_ALCO",
                onStart: () => {
                    b ? c() : d.push(() => {
                        c()
                    })
                },
                onChangePart: () => {},
                onEnd: () => {
                    e()
                }
            });
            const c = () => {
                    a = createMarker({
                        infoText: "\u043E\u0442\u0434\u0430\u0442\u044C \u0430\u043B\u043A\u043E\u0433\u043E\u043B\u044C",
                        position: b.questItemMarkerPosition,
                        dimension: 0,
                        on: () => {
                            mp.events.callRemote("s:clubs:biker:quest:alco")
                        }
                    })
                },
                e = () => {
                    a && a.destroy(), a = null
                }
        } {
            let a = null,
                c = null,
                e = null;
            global.registerPlayerQuest({
                code: "CLUB_BIKER_CLOTHES",
                onStart: a => {
                    b ? f(a) : d.push(() => {
                        f(a)
                    })
                },
                onChangePart: () => {
                    g(), f(null)
                },
                onEnd: () => {
                    g()
                }
            });
            const f = d => d ? (e = new global.TriggerColshape(d, 0, 4, () => {
                    mp.events.callRemote("s:clubs:biker:quest:clothes")
                }, () => {}), void(c = mp.blips.new(0, d, {
                    color: 1,
                    dimension: 0,
                    name: "?",
                    scale: 1,
                    drawDistance: 10,
                    shortRange: !1
                }))) : void(a = createMarker({
                    infoText: "\u043E\u0442\u0434\u0430\u0442\u044C \u043E\u0434\u0435\u0436\u0434\u0443",
                    position: b.questItemMarkerPosition,
                    dimension: 0,
                    on: () => {
                        mp.events.callRemote("s:clubs:biker:quest:clothesEnd")
                    }
                })),
                g = () => {
                    e && e.destroy(), c && c.destroy(), a && a.destroy(), e = null, a = null, c = null
                }
        } {
            let a = null,
                c = null,
                e = null;
            global.registerPlayerQuest({
                code: "CLUB_BIKER_LSC",
                onStart: a => {
                    b ? f(a) : d.push(() => {
                        f(a)
                    })
                },
                onChangePart: () => {
                    g(), f(null)
                },
                onEnd: () => {
                    g()
                }
            });
            const f = d => d ? (e = new global.TriggerColshape(d, 0, 4, () => {
                    mp.events.callRemote("s:clubs:biker:quest:lsc")
                }, () => {}), void(c = mp.blips.new(0, d, {
                    color: 1,
                    dimension: 0,
                    name: "?",
                    scale: 1,
                    drawDistance: 10,
                    shortRange: !1
                }))) : void(a = createMarker({
                    infoText: "\u043E\u0442\u0434\u0430\u0442\u044C \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438",
                    position: b.questItemMarkerPosition,
                    dimension: 0,
                    on: () => {
                        mp.events.callRemote("s:clubs:biker:quest:lscEnd")
                    }
                })),
                g = () => {
                    e && e.destroy(), c && c.destroy(), a && a.destroy(), e = null, a = null, c = null
                }
        } {
            const a = [{
                position: new mp.Vector3(-947.5, -2934.7, 12.95)
            }, {
                position: new mp.Vector3(-1172.55, -1794.95, 2.91)
            }, {
                position: new mp.Vector3(696.58, -1285.75, 24.99)
            }, {
                position: new mp.Vector3(812.82, -1585.91, 30.34)
            }, {
                position: new mp.Vector3(874.21, -1727.31, 29.07)
            }, {
                position: new mp.Vector3(1623.78, -1956.76, 102.64)
            }, {
                position: new mp.Vector3(849.12, 2420.07, 53.7)
            }, {
                position: new mp.Vector3(-1143.04, -1965.78, 12.16)
            }, {
                position: new mp.Vector3(-564.19, -2238.35, 5)
            }, {
                position: new mp.Vector3(-461.39, -2280.59, 7.52)
            }, {
                position: new mp.Vector3(-424.43, -2265.59, 6.61)
            }, {
                position: new mp.Vector3(251.04, -2932.57, 4.77)
            }, {
                position: new mp.Vector3(984.93, -1788.07, 30.37)
            }, {
                position: new mp.Vector3(985.43, -1782.22, 30.37)
            }, {
                position: new mp.Vector3(992.65, -1659.98, 28.55)
            }, {
                position: new mp.Vector3(1022.21, -1645.82, 30.38)
            }, {
                position: new mp.Vector3(1607.43, -2383.44, 90.77)
            }, {
                position: new mp.Vector3(1522.71, -2167.55, 76.72)
            }, {
                position: new mp.Vector3(1515.61, -2151.75, 76.45)
            }, {
                position: new mp.Vector3(1514, -2106.71, 75.56)
            }, {
                position: new mp.Vector3(1513.99, -2107.14, 75.54)
            }, {
                position: new mp.Vector3(1487.01, -1915.13, 70.43)
            }, {
                position: new mp.Vector3(1466.52, -1777.15, 69.02)
            }, {
                position: new mp.Vector3(1527.09, -1756.18, 77.64)
            }, {
                position: new mp.Vector3(1578.59, -1777.34, 87.22)
            }, {
                position: new mp.Vector3(1575.94, -1722.51, 87.15)
            }, {
                position: new mp.Vector3(1595.35, -1692.02, 87.08)
            }, {
                position: new mp.Vector3(-1628.86, -799.17, 9.2)
            }, {
                position: new mp.Vector3(244.55, 2596.27, 44.11)
            }, {
                position: new mp.Vector3(355.43, 2556.49, 42.52)
            }, {
                position: new mp.Vector3(2348.03, 2624.44, 45.67)
            }, {
                position: new mp.Vector3(2978.81, 3774.21, 53.68)
            }, {
                position: new mp.Vector3(1684.48, 3774.84, 33.78)
            }, {
                position: new mp.Vector3(1774.55, 3837.02, 33.31)
            }, {
                position: new mp.Vector3(1779.27, 3830.55, 33.15)
            }, {
                position: new mp.Vector3(-233.76, 6276.38, 30.68)
            }, {
                position: new mp.Vector3(-182.15, 6258.46, 30.49)
            }, {
                position: new mp.Vector3(82.21, 6351.71, 30.38)
            }, {
                position: new mp.Vector3(84.89, 6346.15, 30.38)
            }, {
                position: new mp.Vector3(-367.53, -2682.79, 9.17)
            }, {
                position: new mp.Vector3(-354.93, -2670.07, 9.17)
            }, {
                position: new mp.Vector3(-312.73, -2627.91, 9.17)
            }, {
                position: new mp.Vector3(-300.06, -2615.26, 9.17)
            }, {
                position: new mp.Vector3(-306.44, -2614.56, 9.17)
            }, {
                position: new mp.Vector3(-138.02, -2592.12, 9.15)
            }, {
                position: new mp.Vector3(-120.59, -2592.07, 9.16)
            }, {
                position: new mp.Vector3(-120.54, -2602.65, 9.17)
            }, {
                position: new mp.Vector3(-74.85, -2597.51, 9.15)
            }, {
                position: new mp.Vector3(-57.41, -2597.53, 9.15)
            }, {
                position: new mp.Vector3(-40.08, -2597.27, 9.16)
            }, {
                position: new mp.Vector3(83.44, -2595.04, 9.11)
            }, {
                position: new mp.Vector3(101.41, -2595.01, 9.16)
            }, {
                position: new mp.Vector3(970.38, -3289.06, 9.04)
            }, {
                position: new mp.Vector3(986.77, -3289.05, 9.04)
            }, {
                position: new mp.Vector3(1003.16, -3289.02, 9.04)
            }, {
                position: new mp.Vector3(1019.4, -3289.05, 9.04)
            }, {
                position: new mp.Vector3(1037.34, -3289.05, 9.04)
            }, {
                position: new mp.Vector3(1063.09, -3289.06, 9.04)
            }, {
                position: new mp.Vector3(1079.48, -3289.04, 9.12)
            }, {
                position: new mp.Vector3(1002.22, -2241.69, 33.75)
            }, {
                position: new mp.Vector3(1001, -2211.29, 33.8)
            }, {
                position: new mp.Vector3(1133.15, -2175.1, 34.06)
            }, {
                position: new mp.Vector3(1127.34, -2142.58, 34.15)
            }, {
                position: new mp.Vector3(1027.81, -1200.28, 28.7)
            }, {
                position: new mp.Vector3(995.86, -1159.1, 28.58)
            }, {
                position: new mp.Vector3(956.91, -1130.01, 28.05)
            }, {
                position: new mp.Vector3(904.32, -1110.51, 27.24)
            }, {
                position: new mp.Vector3(867.13, -1110.5, 26.51)
            }, {
                position: new mp.Vector3(656.98, -923.06, 25.15)
            }, {
                position: new mp.Vector3(533.23, -625.35, 28.1)
            }, {
                position: new mp.Vector3(552.75, -595.01, 28.08)
            }, {
                position: new mp.Vector3(560.81, -493.77, 28.1)
            }, {
                position: new mp.Vector3(2940.69, 4617.65, 51.97)
            }, {
                position: new mp.Vector3(-32.78, 6205.98, 34.52)
            }, {
                position: new mp.Vector3(-32.06, 6198.59, 34.7)
            }, {
                position: new mp.Vector3(-41.03, 6192.43, 34.62)
            }, {
                position: new mp.Vector3(1095.41, -3289.16, 9.1)
            }, {
                position: new mp.Vector3(1111.87, -3289.21, 9.1)
            }, {
                position: new mp.Vector3(531.24, -641.72, 28.08)
            }, {
                position: new mp.Vector3(550.86, -611.49, 28.06)
            }, {
                position: new mp.Vector3(1138.72, -2284.45, 33.6)
            }, {
                position: new mp.Vector3(1133.59, -2249.46, 34.07)
            }, {
                position: new mp.Vector3(1129.93, -2235.74, 34.01)
            }, {
                position: new mp.Vector3(14.67, 6243.21, 35.3)
            }];
            let c = null,
                e = null,
                f = null;
            global.registerPlayerQuest({
                code: "CLUB_BIKER_FUEL",
                onStart: a => {
                    b ? g(a) : d.push(() => {
                        g(a)
                    })
                },
                onChangePart: () => {
                    h(), g(null)
                },
                onEnd: () => {
                    h()
                }
            });
            const g = d => {
                    if (d) {
                        const b = a[parseInt(d) % a.length];
                        return c = createMarker({
                            infoText: "\u0437\u0430\u0431\u0440\u0430\u0442\u044C \u0431\u0435\u043D\u0437\u0438\u043D",
                            position: b.position,
                            dimension: 0,
                            on: () => {
                                mp.events.callRemote("s:clubs:biker:quest:fuel")
                            }
                        }), void(e = mp.blips.new(0, b.position, {
                            color: 1,
                            dimension: 0,
                            name: "?",
                            scale: 1,
                            drawDistance: 10,
                            shortRange: !1
                        }))
                    }
                    f = new global.TriggerColshape(b.fuelPosition, 0, 3, () => {
                        mp.events.callRemote("s:clubs:biker:quest:fuelEnd")
                    }, () => {}), e = mp.blips.new(0, b.fuelPosition, {
                        color: 1,
                        dimension: 0,
                        name: "?",
                        scale: 1,
                        drawDistance: 10,
                        shortRange: !1
                    })
                },
                h = () => {
                    f && f.destroy(), e && e.destroy(), c && c.destroy(), f = null, c = null, e = null
                }
        } {
            const a = [{
                position: new mp.Vector3(1570.19, -2692.31, 34.72)
            }, {
                position: new mp.Vector3(1417.29, -2698.17, 34.23)
            }, {
                position: new mp.Vector3(1332.56, -2681.25, 27.78)
            }, {
                position: new mp.Vector3(1793.4, -2368.21, 139.46)
            }, {
                position: new mp.Vector3(1919, -2325.19, 135.45)
            }, {
                position: new mp.Vector3(2228.04, -2222.33, 26.53)
            }, {
                position: new mp.Vector3(2087.02, -2115.26, 101.13)
            }, {
                position: new mp.Vector3(1864.88, -2197.45, 168.85)
            }, {
                position: new mp.Vector3(1890.46, -2077.18, 160.07)
            }, {
                position: new mp.Vector3(1879.71, -1858.57, 192.36)
            }, {
                position: new mp.Vector3(1889.64, -1757.16, 199.48)
            }, {
                position: new mp.Vector3(2025.99, -1584.12, 251.6)
            }, {
                position: new mp.Vector3(2091.3, -1652.54, 228.89)
            }, {
                position: new mp.Vector3(2305.51, -1758.12, 133.15)
            }, {
                position: new mp.Vector3(2208.06, -1541.45, 170.13)
            }, {
                position: new mp.Vector3(2063.72, -1507.14, 237.19)
            }, {
                position: new mp.Vector3(2176.21, -1066.18, 175.63)
            }, {
                position: new mp.Vector3(2388.42, -935.58, 151.13)
            }, {
                position: new mp.Vector3(1779.7, -248.52, 290.81)
            }, {
                position: new mp.Vector3(1614.5, 348.1, 257.43)
            }, {
                position: new mp.Vector3(1794.98, 781.8, 261.95)
            }, {
                position: new mp.Vector3(1890.1, 1002.88, 274.02)
            }, {
                position: new mp.Vector3(2153.16, 717.42, 265.92)
            }, {
                position: new mp.Vector3(2263.39, 410.36, 279.28)
            }, {
                position: new mp.Vector3(776.95, 1175.85, 344.96)
            }, {
                position: new mp.Vector3(763.58, 1185.92, 348.08)
            }, {
                position: new mp.Vector3(747.22, 1188.07, 346.97)
            }, {
                position: new mp.Vector3(711.27, 1198.08, 347.53)
            }, {
                position: new mp.Vector3(484.26, 1446.29, 349.9)
            }, {
                position: new mp.Vector3(-480.56, 1527.41, 390.13)
            }, {
                position: new mp.Vector3(-894.02, 1282.57, 299.76)
            }, {
                position: new mp.Vector3(-1205.79, 1194.17, 292.62)
            }, {
                position: new mp.Vector3(-2364.95, 1288.97, 331.67)
            }, {
                position: new mp.Vector3(-2502.75, 756.46, 301.22)
            }, {
                position: new mp.Vector3(-2420.89, 753.65, 284.98)
            }, {
                position: new mp.Vector3(-2595.79, 359.71, 209.17)
            }, {
                position: new mp.Vector3(-2814.61, 2005.56, 110.15)
            }, {
                position: new mp.Vector3(-920.2, 2370.24, 139.78)
            }, {
                position: new mp.Vector3(-382.21, 2272.51, 169.33)
            }, {
                position: new mp.Vector3(-269.06, 3387.53, 144.63)
            }, {
                position: new mp.Vector3(-355.11, 3324, 145.88)
            }, {
                position: new mp.Vector3(-941.19, 3403.31, 244.56)
            }, {
                position: new mp.Vector3(-971.26, 3818.74, 429.78)
            }, {
                position: new mp.Vector3(-1246.11, 3729.12, 453.37)
            }, {
                position: new mp.Vector3(-1984.9, 3805.64, 210.67)
            }, {
                position: new mp.Vector3(-1829.49, 3982.59, 271.97)
            }, {
                position: new mp.Vector3(-1335.11, 4606.34, 137.56)
            }, {
                position: new mp.Vector3(-1271.91, 4884.33, 182.33)
            }, {
                position: new mp.Vector3(-1135.85, 4661.53, 242.71)
            }, {
                position: new mp.Vector3(-922.23, 4581.94, 230.52)
            }, {
                position: new mp.Vector3(-952.92, 4843.05, 312.62)
            }, {
                position: new mp.Vector3(-880.02, 4660.18, 252.22)
            }, {
                position: new mp.Vector3(-395.5, 4708.02, 262.84)
            }, {
                position: new mp.Vector3(137.25, 5171.17, 552.2)
            }, {
                position: new mp.Vector3(149.59, 5217.74, 571.87)
            }, {
                position: new mp.Vector3(219.75, 5279.02, 621.91)
            }, {
                position: new mp.Vector3(192.78, 5297.97, 609.97)
            }, {
                position: new mp.Vector3(379.01, 5514, 725.51)
            }, {
                position: new mp.Vector3(501.83, 5630.86, 791.66)
            }, {
                position: new mp.Vector3(505.18, 5608.28, 796.33)
            }, {
                position: new mp.Vector3(816.96, 5723.3, 692.69)
            }, {
                position: new mp.Vector3(856.55, 5696.2, 683.05)
            }, {
                position: new mp.Vector3(1402.13, 5805.15, 462.54)
            }, {
                position: new mp.Vector3(1601.7, 5805.45, 414.49)
            }, {
                position: new mp.Vector3(1713.84, 5833.07, 374.25)
            }, {
                position: new mp.Vector3(2142.84, 5367.87, 165.17)
            }, {
                position: new mp.Vector3(58.11, 7217.96, 2.72)
            }, {
                position: new mp.Vector3(2065.67, 6451.86, 140.54)
            }, {
                position: new mp.Vector3(2155.35, 6437.28, 155.68)
            }, {
                position: new mp.Vector3(2157.41, 6371, 184.27)
            }, {
                position: new mp.Vector3(2191.29, 6311.1, 186.32)
            }, {
                position: new mp.Vector3(2310.57, 6169.29, 174.51)
            }, {
                position: new mp.Vector3(2378.83, 6179.33, 185.46)
            }, {
                position: new mp.Vector3(2494.02, 6190.22, 203.31)
            }, {
                position: new mp.Vector3(2877.03, 5911.04, 368.61)
            }, {
                position: new mp.Vector3(2927.5, 5761.29, 324.4)
            }, {
                position: new mp.Vector3(3005.38, 5776.13, 299.4)
            }, {
                position: new mp.Vector3(3099.42, 5541.77, 192.1)
            }, {
                position: new mp.Vector3(3055.76, 5530.02, 198.09)
            }, {
                position: new mp.Vector3(2914.58, 5487.41, 191.65)
            }, {
                position: new mp.Vector3(2940.02, 5216.38, 144.68)
            }, {
                position: new mp.Vector3(3075.36, 5207.08, 112.94)
            }, {
                position: new mp.Vector3(3183.43, 4776.72, 186.3)
            }, {
                position: new mp.Vector3(3416.72, 4409.4, 210.32)
            }, {
                position: new mp.Vector3(3449.22, 4189.42, 239.64)
            }, {
                position: new mp.Vector3(3476.16, 3404.26, 189.62)
            }, {
                position: new mp.Vector3(3551.4, 3466.01, 146.55)
            }, {
                position: new mp.Vector3(3478.63, 3344.19, 189.63)
            }, {
                position: new mp.Vector3(3755.27, 3094.05, 15.96)
            }, {
                position: new mp.Vector3(3292.97, 3144.19, 252.24)
            }, {
                position: new mp.Vector3(3214.68, 3085.28, 214.17)
            }, {
                position: new mp.Vector3(3021.96, 2563.05, 152.08)
            }, {
                position: new mp.Vector3(3007.89, 2485.6, 154.4)
            }, {
                position: new mp.Vector3(2904.15, 2377.47, 169.78)
            }, {
                position: new mp.Vector3(2882.58, 2287.55, 160.74)
            }, {
                position: new mp.Vector3(2822.75, 2067.58, 121.68)
            }, {
                position: new mp.Vector3(2984.11, 508.05, 30.46)
            }, {
                position: new mp.Vector3(2768.94, -434.17, 70.47)
            }, {
                position: new mp.Vector3(2395.77, -931.76, 151.19)
            }, {
                position: new mp.Vector3(4504.4, -4712.96, 13.29)
            }, {
                position: new mp.Vector3(5218.29, -5388.22, 65.73)
            }, {
                position: new mp.Vector3(5309.97, -5604.58, 63.39)
            }, {
                position: new mp.Vector3(5613.64, -5646.14, 8.53)
            }, {
                position: new mp.Vector3(5584.39, -5800.13, 11.17)
            }, {
                position: new mp.Vector3(5524.18, -5916.32, 12.92)
            }, {
                position: new mp.Vector3(5448.18, -5955.13, 14.72)
            }, {
                position: new mp.Vector3(4798.41, -6010.03, 18.04)
            }, {
                position: new mp.Vector3(4713.35, -5760.06, 19.29)
            }, {
                position: new mp.Vector3(4680.56, -5650.76, 17.62)
            }, {
                position: new mp.Vector3(4203.85, -4312.75, 5.22)
            }].map(a => ({
                position: a.position,
                obj: null,
                obj_base: null
            }));
            let c = null,
                e = null;
            global.registerPlayerQuest({
                code: "CLUB_BIKER_FLAG",
                onStart: a => {
                    b ? f(a) : d.push(() => {
                        f(a)
                    })
                },
                onChangePart: () => {},
                onEnd: () => {
                    g()
                }
            }), mp.events.add("c:clubs:biker:setFlag", (b, c) => {
                var d = Math.floor;
                const e = a[parseInt(b) % a.length];
                mp.objects.exists(e.obj) && e.obj.destroy(), mp.objects.exists(e.obj_base) && e.obj_base.destroy(), e.obj_base = mp.objects.new(mp.game.joaat("cls_prop_flagpole"), e.position, {
                    dimension: 0,
                    rotation: new mp.Vector3(0, 0, d(180 * Math.random()))
                }), e.obj = mp.objects.new(mp.game.joaat(c), new mp.Vector3(e.position.x, e.position.y, e.position.z + 2.73), {
                    dimension: 0,
                    rotation: new mp.Vector3(0, 0, d(180 * Math.random()))
                })
            });
            const f = b => {
                    const d = a[parseInt(b) % a.length];
                    c = createMarker({
                        infoText: "\u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u043B\u0430\u0433",
                        position: d.position,
                        dimension: 0,
                        on: () => {
                            mp.events.callRemote("s:clubs:biker:quest:flag", b)
                        }
                    }), e = mp.blips.new(0, d.position, {
                        color: 1,
                        dimension: 0,
                        name: "?",
                        scale: 1,
                        drawDistance: 10,
                        shortRange: !1
                    })
                },
                g = () => {
                    e && e.destroy(), c && c.destroy(), c = null, e = null
                }
        }
    }
    const createMarker = ({
            text: a,
            infoText: b,
            position: c,
            dimension: d,
            on: e
        }) => {
            const f = mp.markers.new(1, new mp.Vector3(c.x, c.y, c.z - .15), 1, {
                    direction: new mp.Vector3(0, 0, 0),
                    rotation: new mp.Vector3(0, 0, 0),
                    color: [237, 194, 21, 255],
                    visible: !0,
                    dimension: d
                }),
                g = new global.ActionColshape(c, d, 1, b, e),
                h = a ? mp.labels.new(a, new mp.Vector3(c.x, c.y, c.z + 1), {
                    dimension: d,
                    los: !0,
                    font: 0,
                    drawDistance: 10
                }) : null;
            return {
                destroy() {
                    f.destroy(), g.destroy(), h && h.destroy()
                }
            }
        },
        getMs = () => new Date().getTime();
}