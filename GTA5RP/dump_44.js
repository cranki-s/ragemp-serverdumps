{
    const mp = global.mp,
        localPlayer = mp.players.local;
    global.isSmartphoneOpen = !1, global.smartphoneBrowser = global.mainBrowser, global.binder.register({
        action: "SMARTPHONE_OPEN",
        desc: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
        defaultKey: 38,
        func: () => {
            mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || global.isSmartphoneOpen || !global.actionAntiFlood("client_smartphone_taskOpen", 2e3) || mp.events.call("client_smartphone_taskOpen")
        }
    }), global.binder.register({
        action: "SMARTPHONE_CLOSE",
        desc: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
        defaultKey: 8,
        func: () => {
            global.isSmartphoneOpen && (global.actionAntiFlood("client_smartphone_taskOpen", 2e3), global.smartphoneBrowser.execute("___closeSmarphone()"))
        }
    }), mp.events.add("client_smartphone_taskOpen", () => {
        localPlayer.getVariable("cuffed") || global.isPlayerDeath || 0 !== global.getPlayerCurrentWeaponData().weapon || null !== global.itemInHand || mp.events.callRemote("server_smartphone_taskOpen")
    }), mp.events.add("client_smartphone_open", () => {
        global.smartphoneBrowser.execute("smartphoneAppVue.open()")
    }), mp.events.add("client_smartphone_close", () => {
        global.smartphoneBrowser.execute("smartphoneAppVue.close()")
    }), mp.events.add("__client_smartphone_finger", a => {
        mp.game.mobile.moveFinger(a)
    }), mp.events.addDataHandler("characterId", (a, b) => {
        a === localPlayer && global.smartphoneBrowser.execute(`myCharacterId = ${b};`)
    });
    let smartphoneScenarioList = [];
    class PhoneScenarioBase extends global.CustomScenario {
        constructor() {
            super("cphone_base")
        }
        async onStart(a) {
            if (a === localPlayer) return void(global.isSmartphoneOpen || (mp.game.mobile.createMobilePhone(0), mp.game.mobile.setMobilePhoneScale(0), mp.events.call("client_smartphone_open")));
            if (!mp.game.streaming.hasAnimDictLoaded("cellphone@str")) {
                mp.game.streaming.requestAnimDict("cellphone@str");
                do await mp.game.waitAsync(10); while (!mp.game.streaming.hasAnimDictLoaded("cellphone@str"))
            }
            mp.players.exists(a) && 0 !== a.handle && (mp.attachmentMngr.addClient(a, mp.game.joaat("playerSmartPhone")), a.taskPlayAnim("cellphone@str", "cellphone_text_press_a", 8, 0, -1, 49, 0, !1, !1, !1))
        }
        onStartForNew(a) {
            this.onStart(a)
        }
        onEnd(a) {
            return a === localPlayer ? void(isPlayerHasAnyPhoneScenario(localPlayer) || (mp.game.invoke("0x3BC861DF703E5097"), mp.events.call("client_smartphone_close"))) : void(mp.attachmentMngr.removeFor(a, mp.game.joaat("playerSmartPhone")), a.vehicle ? a.stopAnimTask("cellphone@str", "cellphone_text_press_a", 3) : a.clearTasksImmediately())
        }
    }
    smartphoneScenarioList.push(new PhoneScenarioBase);
    class PhoneScenarioCall extends global.CustomScenario {
        constructor() {
            super("cphone_call")
        }
        async onStart(a) {
            a.taskUseMobilePhone(1)
        }
        onStartForNew(a) {
            this.onStart(a)
        }
        onEnd(a) {
            a.taskUseMobilePhone(0)
        }
    }
    smartphoneScenarioList.push(new PhoneScenarioCall);
    const isPlayerHasAnyPhoneScenario = a => {
        const b = a.getVariable("cSen");
        return "cphone_base" === b || "cphone_call" === b
    };
    mp.events.add("client_smartphone_sync_anim", async (a, b) => {
        const c = mp.players.atRemoteId(a);
        if (mp.players.exists(c) && 0 !== c.handle && c !== localPlayer)
            if (0 === b) {
                for (const a of smartphoneScenarioList)
                    if (a.isActive(c)) {
                        a.onStart(c);
                        break
                    }
            } else if (1 === b) {
            if (!mp.game.streaming.hasAnimDictLoaded("cellphone@self")) {
                mp.game.streaming.requestAnimDict("cellphone@self");
                do await mp.game.waitAsync(10); while (!mp.game.streaming.hasAnimDictLoaded("cellphone@self"))
            }
            if (!mp.players.exists(c) || 0 === c.handle) return;
            c.taskPlayAnim("cellphone@self", "selfie", 4, 4, -1, 49, 0, !1, !1, !1)
        }
    }), global.smartphoneCallPlayerId = -1, mp.events.add("client_smartphone_callFrom", function (a, b) {
        global.smartphoneBrowser.execute(`smartphoneAppVue.openApp(phoneAppCall, { callFrom: "${a}", id: "${b}" });`)
    }), mp.events.add("client_smartphone_call_newStatus", function (a, b) {
        1 === a ? (global.smartphoneCallPlayerId = b, global.discordUpdate("\u0413\u043E\u0432\u043E\u0440\u0438\u0442 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443")) : (global.smartphoneCallPlayerId = -1, global.discordUpdate()), global.smartphoneBrowser.execute(`appPhoneCallStore.state.status = ${a};`)
    }), mp.events.add("client_smartphone_callErrorNotify", function (a) {
        global.smartphoneBrowser.execute(`
        appPhoneStore.commit('addNumberToHistory', ${a});
        UI_smartphoneNotify('app_phone_ico.png', 'Телефон', '${a} попытался вам позвонить');
    `)
    }), mp.events.add("client_smartphone_startCallTo", function (a) {
        global.smartphoneBrowser.execute(`smartphoneAppVue.openAppAndPhone(phoneApp, '${a}');`)
    }), mp.events.add("c:smartphone:sms", (a, b, c, d) => {
        global.smartphoneBrowser.call("b:smartphone:sms", a, b, c || "\u041D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", d || "\u0423 \u0432\u0430\u0441 \u043D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435")
    }), global.rpc.register("client_smartphone_sms_getPos", function (a) {
        if (0 == a) return localPlayer.position;
        const b = mp.game.invoke("0x1DD1F58F493F1DA5"),
            c = mp.game.invoke("0x186E5D252FA50E7D"),
            d = mp.game.invoke("0x1BEDE233E6CD2A1F", c);
        let e = mp.game.invoke("0x14F96AA50D6FBEA7", c);
        for (let c = d; 0 != mp.game.invoke("0xA6DB27D19ECBB7DA", c); c = e)
            if (4 == mp.game.invoke("0xBE9B0959FFD0779B", c) && !!b) return mp.game.ui.getBlipInfoIdCoord(c);
        return {
            x: 0,
            y: 0,
            z: 0
        }
    }), mp.events.add("client_smartphone_startSmsTo", function (a) {
        global.smartphoneBrowser.execute(`smartphoneAppVue.openAppAndPhone(phoneAppMessanger, '${a}');`)
    });
    let isGPSEnable = !1,
        gpsBlip = null,
        gpsInterval = null,
        gpsPos = new mp.Vector3(0, 0, 0);

    function setGPSToPoint(a, b, c, d) {
        isGPSEnable && disableGPS(), isGPSEnable = !0, gpsBlip = mp.blips.new(162, new mp.Vector3(b, c, d), {
            name: `GPS ( ${a} )`,
            color: 3,
            scale: 1.3,
            shortRange: !1
        }), gpsPos = new mp.Vector3(b, c, d), gpsInterval = setInterval(() => {
            const {
                x: a,
                y: b,
                z: c
            } = localPlayer.position;
            let d = mp.game.pathfind.calculateTravelDistanceBetweenPoints(gpsPos.x, gpsPos.y, gpsPos.z, a, b, c);
            return 1e4 <= d && (d = mp.dist(gpsPos.x, gpsPos.y, gpsPos.z, a, b, c)), 15 > d ? (disableGPS(), void global.smartphoneBrowser.execute(`
                UI_smartphoneNotify('app_gps_ico.svg', 'GPS', 'Вы закончили маршрут!');
            `)) : void global.smartphoneBrowser.execute(`
            gpsAppStore.state.gpsDist = ${d};
        `)
        }, 100), gpsBlip.setRoute(!0), gpsBlip.setRouteColour(3);
        const {
            x: e,
            y: f,
            z: g
        } = localPlayer.position, h = mp.game.pathfind.getStreetNameAtCoord(b, c, d, 0, 0), i = mp.game.ui.getStreetNameFromHashKey(h.streetName);
        let j = mp.game.pathfind.calculateTravelDistanceBetweenPoints(b, c, d, e, f, g);
        1e4 <= j && (j = mp.dist(b, c, d, e, f, g)), global.smartphoneBrowser.execute(`
        gpsAppStore.state.enable = true;
        gpsAppStore.state.gpsName = '${a}';
        gpsAppStore.state.gpsStreet = '${i}';
        gpsAppStore.state.gpsDist = ${Math.round(j)};
    `)
    }

    function disableGPS() {
        isGPSEnable = !1, null !== gpsInterval && (clearInterval(gpsInterval), gpsInterval = null), null != gpsBlip && mp.blips.exists(gpsBlip) && (gpsBlip.setRoute(!1), gpsBlip.destroy()), gpsBlip = null, global.smartphoneBrowser.execute(`gpsAppStore.state.enable = false;`)
    }
    mp.events.add("client_smartphone_gps_start", setGPSToPoint), mp.events.add("client_smartphone_gps_off", disableGPS);
    const raceAppStartRace = async (a, b, c, d) => {
        var e = Math.pow;
        let f = 1,
            g = null;
        const h = () => {
                if (global.isPlayerDeath || 0 !== localPlayer.dimension) return i(), void mp.events.callRemote("server_raceApp_endRace", a, !1);
                const {
                    x: b,
                    y: c,
                    z: h
                } = localPlayer.position, j = d[f];
                g || (g = mp.blips.new(f === d.length - 1 ? 38 : 270, new mp.Vector3(j[0], j[1], -10), {
                    shortRange: !1,
                    name: "",
                    color: 64,
                    dimension: 0
                }), g.setRoute(!0), g.setRouteColour(64)), mp.game.graphics.drawMarker(1, j[0], j[1], -10, 0, 0, 0, 0, 0, 0, 20, 20, 2500, 255, 255, 255, 125, !1, !1, 2, !1, null, null, !1), 12 > Math.sqrt(e(j[0] - b, 2) + e(j[1] - c, 2)) && (++f === d.length ? (mp.events.callRemote("server_raceApp_endRace", a, !0), i()) : (g.destroy(), g = null))
            },
            i = () => {
                mp.events.remove("render", h), g && g.destroy()
            };
        mp.events.add("render", h), global.setCameraToPlayer(1, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 0, 0, 80), global.resetCamera(), global.mainBrowser.execute("startGameCounterSec(5)");
        const j = () => {
            mp.game.invoke("0xA41BCD7213805AAC", !0)
        };
        mp.events.add("render", j);
        const k = localPlayer.vehicle;
        k && (k.setWheelsCanBreak(!1), k.setBurnout(!0));
        let l = [];
        for (const e of c) {
            if (e === localPlayer.remoteId) continue;
            const a = mp.players.atRemoteId(e);
            !a || 0 === a.handle || !a.vehicle || 0 === a.vehicle.handle || (a.vehicle.setBurnout(!0), a.vehicle.setWheelsCanBreak(!1), l.push(a.vehicle))
        }
        await mp.game.waitAsync(4900), mp.events.remove("render", j), mp.vehicles.exists(k) && 0 !== k.handle && (k.setWheelsCanBreak(!0), k.setBurnout(!1)), l.forEach(a => mp.vehicles.exists(a) && 0 !== a.handle && (a.setBurnout(!1) || a.setWheelsCanBreak(!0)))
    };
    mp.events.add("client_raceApp_startRace", a => {
        global.smartphoneBrowser.execute("smartphoneAppVue.taskClose()");
        const b = JSON.parse(a);
        raceAppStartRace(parseInt(b[0]), parseInt(b[1]), b[2], b[3].split("|").map(a => [parseFloat(a.split("%")[0]), parseFloat(a.split("%")[1])]))
    }), mp.events.add("clent_raceApp_cancel", () => {
        global.smartphoneBrowser.execute("smartphone_raceApp_sync_cancel()")
    }), mp.events.add("clent_raceApp_join", (a, b) => {
        global.smartphoneBrowser.execute(`smartphone_raceApp_sync_join(${a}, '${b}')`)
    }), mp.events.add("clent_raceApp_left", a => {
        global.smartphoneBrowser.execute(`smartphone_raceApp_sync_left(${a})`)
    }), mp.events.add("client_raceApp_checkPlayers", (a, b, c) => {
        var d = Math.pow;
        for (const e of JSON.parse(c)) {
            let c = !1;
            mp.players.forEachInStreamRange(f => {
                c || f.getVariable("characterId") === e && 50 > Math.sqrt(d(a - f.position.x, 2) + d(b - f.position.y, 2)) && (c = !0)
            }), c || mp.events.call("clent_raceApp_left", e)
        }
    });
    let raceAppBlips = [],
        raceAppBlipsTimeout = null;
    mp.events.add("client_raceApp_blips", a => {
        raceAppBlips.forEach(a => mp.blips.exists(a) && a.destroy()), raceAppBlips = [], null != raceAppBlipsTimeout && clearTimeout(raceAppBlipsTimeout), raceAppBlipsTimeout = null;
        for (const b of JSON.parse(a)) raceAppBlips.push(mp.blips.new(0 === b[2] ? 488 : 490, new mp.Vector3(b[0], b[1], 0), {
            color: 1,
            shortRange: !1,
            dimension: 0,
            scale: 1
        }));
        raceAppBlipsTimeout = setTimeout(() => {
            raceAppBlips.forEach(a => mp.blips.exists(a) && a.destroy()), raceAppBlips = [], raceAppBlipsTimeout = null
        }, 1500)
    }), mp.api.server.register("client_raceApp_checkStart", a => {
        var b = Math.pow;
        if (!localPlayer.vehicle) return mp.api.server.error("\u0412\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u0432 \u043C\u0430\u0448\u0438\u043D\u0435");
        const c = a => {
                let b = null;
                return mp.players.forEachInStreamRange(c => {
                    b || c.getVariable("characterId") === a && (b = c)
                }), b
            },
            d = a => {
                const b = mp.game.gameplay.getModelDimensions(a.getModel()),
                    {
                        x: c,
                        y: d,
                        z: e
                    } = a.position;
                return mp.game.object.getObjectOffsetFromCoords(c, d, e, a.getHeading(), 0, b.max.y, b.min.z + 0)
            },
            e = (a, c) => Math.sqrt(b(a.x - c.x, 2) + b(a.y - c.y, 2)),
            {
                x: f,
                y: g,
                z: h
            } = localPlayer.position,
            i = localPlayer.vehicle.getHeading(),
            j = d(localPlayer.vehicle);
        for (const b of a) {
            const a = c(b.id);
            if (!a || 50 < mp.game.system.vdist(f, g, 0, a.position.x, a.position.y, 0)) return mp.api.server.error(`${b.name} слишком далеко от вас`);
            if (null == a.vehicle) return mp.api.server.error(`${b.name} должен быть в машине`);
            if (!mp.game.pathfind.isPointOnRoad(a.vehicle.position.x, a.vehicle.position.y, a.vehicle.position.z, 0)) return mp.api.server.error(`${b.name} должен быть на дороге`);
            if (15 < Math.abs(i - a.vehicle.getHeading())) return mp.api.server.error(`${b.name} должен смотреть туда же, куда и вы`);
            const h = d(a.vehicle),
                k = e(j, h),
                l = mp.game.object.getObjectOffsetFromCoords(j.x, j.y, j.z, i + 180, k, 0, 0),
                m = mp.game.object.getObjectOffsetFromCoords(j.x, j.y, j.z, i + 0, k, 0, 0),
                n = e(l, h),
                o = e(m, h);
            if (.5 < n && .5 < o) return mp.api.server.error(`${b.name} должен стоять с вами на одной линии`)
        }
        return mp.api.server.success()
    });
    const vehicleNeonApp = {
        r: -1,
        g: -1,
        b: -1,
        lightColor: -1,
        timer: null
    };
    mp.events.add("clent_smartphone_neon_set", (a, c, d, e, f, g, b) => {
        d && (vehicleNeonApp.r = e, vehicleNeonApp.g = f, vehicleNeonApp.b = g, vehicleNeonApp.lightColor = b);
        const h = vehicleNeonApp.r !== e || vehicleNeonApp.g !== f || vehicleNeonApp.b !== g,
            i = vehicleNeonApp.lightColor !== b;
        null !== vehicleNeonApp.timer && (clearTimeout(vehicleNeonApp.timer), vehicleNeonApp.timer = null);
        const j = mp.vehicles.atRemoteId(c),
            {
                x: k,
                y: l,
                z: m
            } = localPlayer.position;
        j && 0 !== j.handle && !(25 < mp.dist(j.position.x, j.position.y, j.position.z, k, l, m)) && (j.getIsEngineRunning() || (j.setEngineOn(!0, !0, !0), j.setLights(0)), h && (j.setNeonLightEnabled(0, !0), j.setNeonLightEnabled(1, !0), j.setNeonLightEnabled(2, !0), j.setNeonLightEnabled(3, !0), j.setNeonLightsColour(e, f, g)), i && (255 === b ? j.toggleMod(22, !1) : (j.toggleMod(22, !0), mp.game.invoke("0xE41033B25D003A07", j.handle, b))), (h || i) && (vehicleNeonApp.timer = setTimeout(() => {
            vehicleNeonApp.timer = null, vehicleNeonApp.r = e, vehicleNeonApp.g = f, vehicleNeonApp.b = g, vehicleNeonApp.lightColor = b, h && i ? mp.events.callRemote("server_smartphone_neon_update", a, vehicleNeonApp.r, vehicleNeonApp.g, vehicleNeonApp.b, vehicleNeonApp.lightColor) : h ? mp.events.callRemote("server_smartphone_neon_update", a, vehicleNeonApp.r, vehicleNeonApp.g, vehicleNeonApp.b) : i && mp.events.callRemote("server_smartphone_neon_update", a, vehicleNeonApp.lightColor)
        }, 3e3)))
    }), mp.events.add("__client_smartphone_camera", (a, b, c) => {
        let d = !0,
            e = !1,
            f = !1,
            g = !1,
            h = localPlayer.getHealth(),
            i = 0,
            j = 1,
            k = 0,
            l = 0,
            m = 0,
            n = 0,
            o = !1,
            p = !1;
        const q = ["", "NG_filmic01", "NG_filmic02", "NG_filmic03", "NG_filmic04", "NG_filmic05", "NG_filmic06", "NG_filmic07", "NG_filmic08", "NG_filmic09", "NG_filmic10", "NG_filmic11", "NG_filmic12", "NG_filmic13", "NG_filmic14", "NG_filmic15", "NG_filmic16", "NG_filmic17", "NG_filmic18", "NG_filmic19", "NG_filmic20", "NG_filmic21", "NG_filmic22", "NG_filmic23", "NG_filmic24", "NG_filmic25"];
        let r = 0;
        const s = [{
            name: "\u041A\u0443\u043B\u0430\u043A \u043A \u0433\u0440\u0443\u0434\u0438",
            dict: "cellphone@self@franklin@",
            anim: "chest_bump"
        }, {
            name: "\u041C\u0438\u0440",
            dict: "cellphone@self@franklin@",
            anim: "peace"
        }, {
            name: "West Coast",
            dict: "cellphone@self@franklin@",
            anim: "west_coast"
        }, {
            name: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430 \u043A\u0430\u043C\u0435\u0440\u0443",
            dict: "cellphone@self@michael@",
            anim: "finger_point"
        }, {
            name: "\u041F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043B\u0438\u0446\u043E",
            dict: "cellphone@self@michael@",
            anim: "run_chin"
        }, {
            name: "\u0420\u0430\u0437\u043C\u044F\u0442\u044C \u0448\u0435\u044E",
            dict: "cellphone@self@michael@",
            anim: "stretch_neck"
        }, {
            name: "\u0410\u0433\u0440\u0435\u0441\u0441\u0438\u0432\u043D\u044B\u0439 \u0444\u0430\u043A",
            dict: "cellphone@self@trevor@",
            anim: "aggressive_finger"
        }, {
            name: "\u0413\u043E\u0440\u0434\u044B\u0439 \u0444\u0430\u043A",
            dict: "cellphone@self@trevor@",
            anim: "proud_finger"
        }, {
            name: "\u041F\u0435\u0440\u0435\u0440\u0435\u0437\u0430\u0442\u044C \u0433\u043B\u043E\u0442\u043A\u0443",
            dict: "cellphone@self@trevor@",
            anim: "throat_slit"
        }, {
            name: "\u0412\u043E\u0437\u0434\u0443\u0448\u043D\u044B\u0439 \u043F\u043E\u0446\u0435\u043B\u0443\u0439",
            dict: "anim@mp_player_intselfieblow_kiss"
        }, {
            name: "\u041E\u041A",
            dict: "anim@mp_player_intselfiedock"
        }, {
            name: "\u0423\u0440\u0430",
            dict: "anim@mp_player_intselfiejazz_hands"
        }, {
            name: "\u0424\u0430\u043A",
            dict: "anim@mp_player_intselfiethe_bird"
        }, {
            name: "\u0411\u043E\u043B\u044C\u0448\u043E\u0439 \u043F\u0430\u043B\u0435\u0446",
            dict: "anim@mp_player_intselfiethumbs_up"
        }, {
            name: "\u0414\u0435\u0440\u0433\u0430\u0442\u044C \u0440\u0443\u043A\u043E\u0439",
            dict: "anim@mp_player_intselfiewank"
        }];
        let t = 0,
            u = !1,
            v = "",
            w = "";
        const x = [{
            name: "\u041E\u0431\u044B\u0447\u043D\u0430\u044F",
            animName: null
        }, {
            name: "\u041F\u0440\u0438\u0446\u0435\u043B\u0438\u0432\u0430\u043D\u0438\u0435",
            animName: "mood_aiming_1"
        }, {
            name: "\u0417\u043B\u043E\u0439",
            animName: "mood_angry_1"
        }, {
            name: "\u041F\u044C\u044F\u043D\u044B\u0439",
            animName: "mood_drunk_1"
        }, {
            name: "\u0412\u0435\u0441\u0451\u043B\u044B\u0439",
            animName: "mood_happy_1"
        }, {
            name: "\u041F\u043E\u0441\u0442\u0440\u0430\u0434\u0430\u0432\u0448\u0438\u0439",
            animName: "mood_injured_1"
        }, {
            name: "\u0413\u043D\u0435\u0432",
            animName: "mood_stressed_1"
        }, {
            name: "\u041E\u0431\u0438\u0436\u0435\u043D\u043D\u044B\u0439",
            animName: "mood_sulk_1"
        }];
        let y = 0,
            z = 0;
        const A = (a, b, c) => Math.min(c, Math.max(b, a));
        let B = !0;
        const C = new global.Scaleform("instructional_buttons"),
            D = () => {
                C.callFunction("CLEAR_ALL"), C.callFunction("TOGGLE_MOUSE_BUTTONS", 0), C.callFunction("CREATE_CONTAINER"), C.callFunction("SET_CLEAR_SPACE", 200), C.callFunction("SET_DATA_SLOT", 0, "w_Enter", "\u0424\u043E\u0442\u043E"), C.callFunction("SET_DATA_SLOT", 1, mp.game.controls.getControlActionName(0, 200, !0), "\u0412\u044B\u0445\u043E\u0434"), e ? (C.callFunction("SET_DATA_SLOT", 2, mp.game.controls.getControlActionName(3, 172, !0), "\u0420\u0435\u0436\u0438\u043C"), C.callFunction("SET_DATA_SLOT", 3, `${mp.game.controls.getControlActionName(0,87,!0)}%${mp.game.controls.getControlActionName(0,88,!0)}`, `Фильтр (${r+1})`), C.callFunction("SET_DATA_SLOT", 4, mp.game.controls.getControlActionName(0, 61, !0), s[t].name), C.callFunction("SET_DATA_SLOT", 5, `${mp.game.controls.getControlActionName(0,89,!0)}%${mp.game.controls.getControlActionName(0,90,!0)}`, `Выбор действия`), C.callFunction("SET_DATA_SLOT", 6, `${mp.game.controls.getControlActionName(0,51,!0)}%${mp.game.controls.getControlActionName(0,52,!0)}`, `Эмоция`), C.callFunction("SET_DATA_SLOT", 7, mp.game.controls.getControlActionName(0, 0, !0), "\u0411\u043E\u043A\u0435"), C.callFunction("SET_DATA_SLOT", 8, mp.game.controls.getControlActionName(0, 69, !0), "\u0420\u0430\u043A\u0443\u0440\u0441"), C.callFunction("SET_DATA_SLOT", 9, mp.game.controls.getControlActionName(0, 68, !0), "\u041F\u0440\u043E\u0444\u0438\u043B\u044C")) : (C.callFunction("SET_DATA_SLOT", 2, mp.game.controls.getControlActionName(3, 172, !0), "\u0420\u0435\u0436\u0438\u043C"), C.callFunction("SET_DATA_SLOT", 3, `${mp.game.controls.getControlActionName(3,180,!0)}%${mp.game.controls.getControlActionName(3,181,!0)}`, "\u0417\u0443\u043C"), C.callFunction("SET_DATA_SLOT", 4, `${mp.game.controls.getControlActionName(0,87,!0)}%${mp.game.controls.getControlActionName(0,88,!0)}`, `Фильтр (${r+1})`)), C.callFunction("DRAW_INSTRUCTIONAL_BUTTONS", -1)
            },
            E = async () => {
                mp.game.controls.disableControlAction(0, 44, !0), mp.game.controls.disableControlAction(0, 156, !0), mp.game.controls.disableControlAction(0, 199, !0), mp.game.controls.disableControlAction(0, 200, !0), mp.game.controls.disableControlAction(2, 156, !0), mp.game.controls.disableControlAction(2, 199, !0), mp.game.controls.disableControlAction(2, 200, !0);
                const E = localPlayer.getHealth();
                if (E < h && 5 < h - E || null != localPlayer.vehicle || global.isPlayerDeath || !global.isSmartphoneOpen || localPlayer.isFalling() || localPlayer.isJumping() || localPlayer.isSwimming() || 0 !== global.getPlayerCurrentWeaponData().weapon || localPlayer.getVariable("cuffed") || mp.game.controls.isDisabledControlPressed(0, 200)) return void H();
                if (h = E, mp.keys.isDown(13) && mp.keys.isDown(13)) return void(o = !0);
                if (mp.keys.isDown(40) && mp.keys.isDown(40) && global.actionAntiFlood("__smartphoneScaleVisibleChange", 500) && (B = !B), mp.game.controls.isControlJustPressed(3, 172) && !f && (e = !e, f = !0, mp.game.cam.doScreenFadeOut(500), await mp.game.waitAsync(500), d && (mp.game.invoke("0x015C49A93E3E086E", e), await mp.game.waitAsync(350), D()), mp.game.cam.doScreenFadeIn(500), await mp.game.waitAsync(550), f = !1), e) {
                    const a = mp.game.controls.getDisabledControlNormal(0, 1) / 20,
                        b = -mp.game.controls.getDisabledControlNormal(0, 2) / 20;
                    if (mp.game.controls.isDisabledControlPressed(0, 69) ? (mp.game.controls.disableControlAction(0, 1, !0), mp.game.controls.disableControlAction(0, 2, !0), i = A(i + a, .01, .99), j = A(j + b, .01, 1.99), k = A(k + mp.game.controls.getDisabledControlNormal(0, 30) / 12, -.99, .99)) : mp.game.controls.isDisabledControlPressed(0, 68) && (mp.game.controls.disableControlAction(0, 1, !0), mp.game.controls.disableControlAction(0, 2, !0), l = A(l + a, -.99, .99), m = A(m + mp.game.controls.getDisabledControlNormal(0, 30) / 12, -.99, .99), n = A(n + b, -.99, .99)), mp.game.invoke("0x1b0b4aeed5b9b41c", i), mp.game.invoke("0x3117d84efa60f77b", j), mp.game.invoke("0x15e69e2802c24b8d", k), mp.game.invoke("0xd6ade981781fca09", l), mp.game.invoke("0xf1e22dc13f5eebad", m), mp.game.invoke("0x466da42c89865553", n), mp.game.controls.isControlJustPressed(3, 0) && (g = !g, mp.game.invoke("0xA2CCBE62CD4C91A4", mp.game.invoke("0x375A706A5C2FD084", g))), 0 == ++z % 15) {
                        const {
                            x: a,
                            y: b,
                            z: c
                        } = localPlayer.position, d = global.gameplayCamera.getCoord();
                        mp.players.forEachInStreamRange(e => {
                            e === localPlayer || 5 > mp.game.system.vdist(a, b, c, e.position.x, e.position.y, e.position.z) && mp.game.invoke("0x6FA46612594F7973", e.handle, d.x, d.y, d.z, 2500, 2048, 3)
                        })
                    }
                }
                if (mp.game.controls.isControlJustPressed(0, 87) || mp.game.controls.isControlJustPressed(0, 88)) {
                    const a = mp.game.controls.isControlJustPressed(0, 87) ? 1 : -1;
                    r += a, r >= q.length ? r = 0 : 0 > r && (r = q.length - 1), mp.game.graphics.setTimecycleModifierStrength(1), mp.game.graphics.setTimecycleModifier(q[r]), D()
                }
                if (mp.game.controls.isControlJustPressed(0, 89) || mp.game.controls.isControlJustPressed(0, 90)) {
                    const a = mp.game.controls.isControlJustPressed(0, 89) ? -1 : 1;
                    t += a, t >= s.length ? t = 0 : 0 > t && (t = s.length - 1), helpText = `Выбрана анимация - ${s[t].name}`, helpTime = 300, D()
                }
                if (mp.game.controls.isDisabledControlPressed(0, 51) || mp.game.controls.isDisabledControlPressed(0, 52)) {
                    const a = mp.game.controls.isDisabledControlPressed(0, 51) ? -1 : 1;
                    y += a, y >= x.length ? y = 0 : 0 > y && (y = x.length - 1), null == x[y].animName ? localPlayer.clearFacialIdleAnimOverride() : mp.game.invoke("0xFFC24B988B938B38", localPlayer.handle, x[y].animName, 0)
                }
                const F = mp.game.controls.isControlPressed(0, 61);
                if (F && !u) {
                    const a = s[t];
                    if (a) {
                        if (u = !0, !mp.game.streaming.hasAnimDictLoaded(a.dict)) {
                            mp.game.streaming.requestAnimDict(a.dict);
                            do await mp.game.waitAsync(10); while (!mp.game.streaming.hasAnimDictLoaded(a.dict))
                        }
                        if (!d) return;
                        a.anim ? (localPlayer.taskPlayAnim(a.dict, a.anim, 4, 4, -1, 128, -1, !1, !1, !1), v = a.dict, w = a.anim) : (localPlayer.taskPlayAnim(a.dict, "enter", 4, 4, -1, 128, -1, !1, !1, !1), await mp.game.waitAsync(1e3 * mp.game.entity.getEntityAnimDuration(a.dict, "enter")), d && localPlayer.taskPlayAnim(a.dict, "idle_a", 8, 4, -1, 129, -1, !1, !1, !1), v = a.dict, w = "")
                    }
                } else u && !F && (u = !1, v && !w ? (localPlayer.taskPlayAnim(v, "exit", 4, 4, -1, 128, -1, !1, !1, !1), await mp.game.waitAsync(1e3 * mp.game.entity.getEntityAnimDuration(v, "exit")), d && localPlayer.taskPlayAnim("", "", 4, 4, -1, 128, -1, !1, !1, !1)) : (localPlayer.stopAnimTask(v, w, 3), localPlayer.taskPlayAnim("", "", 4, 4, -1, 128, -1, !1, !1, !1)));
                if (o) {
                    const d = global.getServerDateString(),
                        e = global.getServerTime(),
                        f = a => 10 > a ? "0" + a : a;
                    return mp.gui.takeScreenshot(a ? "temp.png" : `${new Date().getFullYear()}_${d.replace(".","_")}_${f(e[0])}_${f(e[1])}_${f(e[2])}.png`, 1, b, c), mp.game.audio.playSoundFrontend(-1, "Camera_Shoot", "Phone_SoundSet_Michael", !0), mp.events.call("client_smartphone_camera_shoot"), p = !0, o = !1, void(a && (h = 999))
                }
                B && C.render2D()
            }, F = global.uiVisible, G = global.targetMenuRender, H = () => {
                d = !1, global.isSmartphoneOpen && global.smartphoneBrowser.execute(`smartphone_cameraApp_end(${a}, ${p});`), F && global.hideUI(!1), G && (global.targetMenuRender = !0), mp.game.mobile.cellCamActivate(!1, !1), localPlayer.setConfigFlag(242, !1), localPlayer.setConfigFlag(243, !1), localPlayer.setConfigFlag(244, !0), mp.game.invoke("0x0F07E7745A236711"), global.disableAnimList = !1, mp.events.callRemote("server_smartphone_sync_anim", 0), C.destroy(), mp.events.remove("render", E)
            };
        F && global.hideUI(!0), global.targetMenuRender = !1, D(), mp.game.mobile.cellCamActivate(!0, !0), mp.game.invoke("0x015C49A93E3E086E", e), mp.game.invoke("0xA2CCBE62CD4C91A4", mp.game.invoke("0x375A706A5C2FD084", g)), localPlayer.setConfigFlag(242, !0), localPlayer.setConfigFlag(243, !0), localPlayer.setConfigFlag(244, !1), global.disableAnimList = !0, mp.events.callRemote("server_smartphone_sync_anim", 1), mp.events.add("render", E)
    }), mp.events.add("client_smartphone_cursor", (a, b) => {
        global.showCursor(a, b)
    }), mp.events.add("client_httpServer_setData", function (a, b, c) {
        global.smartphoneBrowser.execute(`smartphone_setHttpServerData("${a}", ${b}, "${c}");`)
    }), mp.attachmentMngr.register("playerSmartPhone", "p_cs_cam_phone", 58867, new mp.Vector3(.05, .03, .01), new mp.Vector3(230, 130, 10));
}