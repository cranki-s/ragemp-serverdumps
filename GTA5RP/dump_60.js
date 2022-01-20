{
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
                k = 0;
                const {
                    x: a,
                    y: e,
                    z: f
                } = b.position;
                if (!g) {
                    if (n.isActive(b)) return void(g = !0);
                    1.5 > mp.dist(a, e, f, c.x, c.y, c.z + 1) && global.actionAntiFlood("server_jobs_port_first", 2e3) && mp.events.callRemote("server_jobs_port_first")
                } else {
                    if (!n.isActive(b)) return m(), h = !1, void(g = !1);
                    !h && 1.5 > mp.dist(a, e, f, d.x, d.y, d.z + 1) && (h = !0, global.menuBrowser.execute("startPortGame()"))
                }
            }
            g ? mp.game.graphics.drawMarker(0, d.x, d.y, d.z + 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 255, 0, 0, 255, !1, !1, 2, !1, "", "", !1) : mp.game.graphics.drawMarker(0, c.x, c.y, c.z + 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 255, 0, 0, 255, !1, !1, 2, !1, "", "", !1)
        };
        mp.events.add("client_jobs_port_game", a => {
            a ? mp.api.notify.success(`+${f}$ за ящик`) : mp.api.notify.error("\u0412\u044B \u0443\u0440\u043E\u043D\u0438\u043B\u0438 \u044F\u0449\u0438\u043A, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435\u0441\u044C \u0437\u0430 \u043D\u043E\u0432\u044B\u043C"), mp.events.callRemote("server_jobs_port_second", a)
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
            const {
                x: b,
                y: c,
                z: d
            } = a.position;
            !g && 1.5 > mp.dist(b, c, d, e.x, e.y, e.z) && (a.taskPlayAnim("weapons@first_person@aim_rng@generic@projectile@thermal_charge@", "plant_floor", 8, -8, -1, 1, 0, !1, !1, !1), g = !0, global.menuBrowser.execute("startBuilderGame()")), mp.game.graphics.drawMarker(1, e.x, e.y, e.z, 0, 0, 0, 0, 0, 0, 2, 2, 15, 255, 0, 0, 120, !1, !1, 2, !1, "", "", !1)
        };
        mp.events.add("client_jobs_builder_game", b => {
            b && (mp.events.callRemote("server_jobs_builder_point", f), mp.api.notify.success("\u0412\u044B \u0441\u043F\u0440\u0430\u0432\u0438\u043B\u0438\u0441\u044C \u0441 \u0437\u0430\u0434\u0430\u043D\u0438\u0435\u043C. \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u043D\u043E\u0432\u043E\u0439 \u0442\u043E\u0447\u043A\u0435")), a.clearTasks(), j(), g = !1
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
            const {
                x: c,
                y: i,
                z: j
            } = a.position;
            if (!f) {
                if (m.isActive(a)) return l(), void(f = !0);
                b.forEach((b, d) => {
                    !g && 1.5 > mp.dist(c, i, j, b.x, b.y, b.z + 1) && global.actionAntiFlood("clientMineGameStart", 5e3) && (h = d, g = !0, a.taskPlayAnim("weapons@first_person@aim_rng@generic@projectile@thermal_charge@", "plant_floor", 8, -8, -1, 1, 0, !1, !1, !1), global.menuBrowser.execute("startMineGame()")), mp.game.graphics.drawMarker(0, b.x, b.y, b.z + 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 255, 0, 0, 255, !1, !1, 2, !1, "", "", !1)
                })
            } else {
                if (!m.isActive(a)) return a.taskPlayAnim("weapons@first_person@aim_rng@generic@projectile@thermal_charge@", "plant_floor", 8, -8, -1, 1, 0, !1, !1, !1), setTimeout(() => {
                    a.stopAnimTask("weapons@first_person@aim_rng@generic@projectile@thermal_charge@", "plant_floor", 3)
                }, 1500), void(f = !1);
                1.5 > mp.dist(c, i, j, d.x, d.y, d.z + 1) && global.actionAntiFlood("server_jobs_mine_put", 5e3) && mp.events.callRemote("server_jobs_mine_put", e), mp.game.graphics.drawMarker(0, d.x, d.y, d.z + 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 255, 0, 0, 255, !1, !1, 2, !1, "", "", !1)
            }
        };
        mp.events.add("client_jobs_mine_game", b => {
            global.actionAntiFlood("clientMineGameStart", 5e3), a.clearTasks(), g = !1, b && mp.events.callRemote("server_jobs_mine_take", h)
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
/*
leNametags: !0, enableTimerBox: !0, enableLocalName: !1, enableCenterInventory: !1, disableScreenEffect: !1, disableDocumentPhoto: !1, enableSpeedometer: !1, speedometerColor: [255, 153, 0, 1], speedometerBackgroundColor: [46, 65, 113, 1], maxVolume3dSound: 100
}, chat: {
    height: 240,
    lineHeight: 24,
    fontSize: 16,
    shadow: !0,
    timestamp: !1
}, reticle: {
    type: "",
    data: []
}

},
*/
defaultCharacterStorage = {
    smartphone: {
        settings: {
            enableCursor: !1,
            enableHelpBox: !0,
            enableNametags: !0
        },
        contacts: [],
        sms: [],
        music: []
    }
};
let storage = mp.storage.data;
storage.data && (storage.character = storage.data.character, storage.global = storage.data.global, delete storage.data), global.isFirstOpen = !1, storage.character == null && (storage.character = {}, global.isFirstOpen = !0), storage.global == null && (storage.global = {}, global.isFirstOpen = !0), createStorage(storage.global, defaulGlobalStorage), mp.storage.data = storage, mp.storage.flush(), global.rpc.register("client_storage_select", function(a) {
    global.character = a, mp.storage.data.character[global.character] == null && (global.isFirstOpen = !0, mp.storage.data.character[global.character] = {}), createStorage(mp.storage.data.character[global.character], defaultCharacterStorage);
    const b = global.getGlobalStorage();
    global.rpc.trigger("__client_event_globalStorage_load", b), global.rpc.trigger("__client_event_storage_load", mp.storage.data.character[global.character]), global.hideHelpBox(!b.settings.enableHelpBox)
}), global.rpc.register("client_storage_get", function() {
    return global.getStorage()
}), global.rpc.register("client_storage_flush", function(a) {
    mp.storage.data.character[global.character] = a, mp.storage.flush()
}), global.rpc.register("client_global_storage_get", function() {
    return mp.storage.data.global
}), global.rpc.register("client_global_storage_flush", function(a) {
    global.flushGlobalStorage(a)
}), global.getStorage = function() {
    return null == mp.storage.data.character || null == mp.storage.data.character[global.character] ? defaultCharacterStorage : mp.storage.data.character[global.character]
}, global.getGlobalStorage = function() {
    return mp.storage.data.global
}, global.flushGlobalStorage = function(a) {
    mp.storage.data.global = a, mp.storage.flush(), global.rpc.trigger("__client_event_globalStorage_load", a)
};
const factionEventData = new Map;
global.registerFactionEvent = ({
    factionId: a,
    onEnter: b,
    onLeave: c
}) => {
    let d = factionEventData.get(a);
    d || (d = {
        active: !1,
        eventList: []
    }), d.eventList.push({
        onEnter: b,
        onLeave: c
    }), factionEventData.set(a, d)
}, mp.events.addDataHandler("factionId", (a, b) => {
    if (a === mp.players.local) {
        for (const a of factionEventData.values()) a.active && (a.eventList.forEach(a => a.onLeave && a.onLeave()), a.active = !1);
        const a = factionEventData.get(b);
        a && (a.eventList.forEach(a => a.onEnter && a.onEnter()), a.active = !0)
    }
}), global.mainBrowser = null, global.smartphoneBrowser = null, require("./Util/actionColshape.js"), require("./Util/3dsound.js"), require("./Util/format.js"), require("./Util/binder.js"), require("./Util/customInterior.js"), require("./Util/scaleform.js"), require("./Player/attachmentObject.js"), require("./Objects/ActionPickup/actionPickup.js"), require("./Objects/GangZone/gangzone.js"), require("./Objects/ClientBlip/clientBlip.js"), require("./Objects/ServerWorldObject/serverWorldObject.js"), require("./Objects/Doors/doords.js"), require("./Objects/Checkpoint/checkpoint.js"), require("./Objects/ActionObject/actionObject.js"), require("./Objects/Apartments/apartments.js"), require("./Objects/UsedObject/usedObject.js"), require("./Objects/Market/market.js"), require("./Objects/Gym/gym.js"), require("./Player/fingerpointing.js"), require("./Player/crouch.js"), require("./Player/crawl.js"), require("./Player/ChatAndUI/chatAndUI.js"), require("./Player/friends.js"), require("./Player/nametags.js"), require("./Player/playerBlip.js"), require("./Player/sync.js"), require("./Player/itemInHand.js"), require("./Player/targetMenu.js"), require("./Player/listMenu.js"), require("./Player/voiceChat.js"), require("./Player/weapons.js"), require("./Player/fly.js"), require("./Player/antiAFK.js"), require("./Player/playerSync.js"), require("./Player/vehicle.js"), require("./Player/main.js"), require("./Player/mapEditor.js"), require("./Smartphone2/clientSmartphone.js"), require("./RPBrowser/clientBrowser.js"), require("./PlayerDialog/index.js"), require("./Character/character.js"), require("./Menu/menu.js"), require("./Jobs/skinDiver.js"), require("./Jobs/fireman.js"), require("./Jobs/farm.js"), require("./Jobs/hunting.js"), require("./Fishing/fishing.js"), require("./Events/BizWar/bizwar.js"), require("./Events/HummerWar/hummerWar.js"), require("./Events/Prison/prison.js"), require("./AdminConsole/clientConsole.js"), require("./Player/newYear.js"), require("./Auth/clientAuth.js"), mp.players.local.freezePosition(!1);
const familyQuestData = new Map;
global.registerFamilyQuest = ({
    code: a,
    onStart: b,
    onEnd: c,
    localObjects: d
}) => {
    familyQuestData.set(a, {
        isStart: !1,
        data: null,
        onStart: b,
        onEnd: c,
        localObjects: d == null ? [] : d,
        objects: []
    })
}, mp.events.add("client_playerData_setFamilyId", (a, b, c) => {
    if (-1 === a) {
        for (const a of familyQuestData.values()) a.isStart && (a.objects.forEach(a => a.destroy()), a.objects = [], a.isStart = !1, a.onEnd());
        return
    }
    c = JSON.parse(c);
    for (const d of c) {
        const a = familyQuestData.get(d[0]);
        a && !a.isStart && (a.objects.forEach(a => a.destroy()), a.objects = a.localObjects.map(a => mp.objects.new(mp.game.joaat(a[0]), new mp.Vector3(a[1], a[2], a[3]), {
            rotation: new mp.Vector3(a[4], a[5], a[6])
        })), a.isStart = !0, a.data = d[1], a.onStart(d[1]))
    }
}), mp.events.add("client_pf_startQuest", (a, b) => {
    const c = familyQuestData.get(a);
    c && !c.isStart && (c.objects.forEach(a => a.destroy()), c.objects = c.localObjects.map(a => mp.objects.new(mp.game.joaat(a[0]), new mp.Vector3(a[1], a[2], a[3]), {
        rotation: new mp.Vector3(a[4], a[5], a[6])
    })), c.isStart = !0, c.data = JSON.parse(b), c.onStart(c.data))
}), mp.events.add("client_pf_endQuest", a => {
    const b = familyQuestData.get(a);
    b && b.isStart && (b.objects.forEach(a => a.destroy()), b.objects = [], b.isStart = !1, b.onEnd())
}), require("./Jobs/govContracts.js"), require("./Jobs/crimeContracts.js"), require("./Jobs/neutralContract.js");
let disableAllInterval = null,
    cursorTimeout = null;
global.binder.register({
action: "MAIN_CURSOR",
desc: "\u041A\u0443\u0440\u0441\u043E\u0440",
defaultKey: 113,
func: () => {
    null !== cursorTimeout && clearTimeout(cursorTimeout), cursorTimeout = setTimeout(() => {
        cursorTimeout = null;
        null !== disableAllInterval || (mp.gui.cursor.visible ? (cursorShowCounter = 0, mp.gui.cursor.show(!1, !1)) : (cursorShowCounter = 1, mp.gui.cursor.show(!0, !0)))
    }, 350)
}
}), mp.keys.bind(112, !0, function() {
null === disableAllInterval ? disableAllInterval = setInterval(() => {
    mp.game.controls.disableAllControlActions(0), mp.game.controls.disableAllControlActions(1), mp.game.controls.disableAllControlActions(2)
}, 0) : (clearInterval(disableAllInterval), disableAllInterval = null)
}), global.binder.register({
action: "HELPMENU_OPEN",
desc: "\u041F\u043E\u043C\u043E\u0449\u044C",
defaultKey: 121,
func: () => {
    global.isAuth && rpc.triggerServer("server_player_mainMenuOpen", 3)
}
}), mp.keys.bind(220, !0, function() {
mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || mp.events.callRemote("server_event_key_|")
}), mp.events.add("__call_remote_event", function(a, ...b) {
-1 === ["server_character_save", "server_inventory_useItem", "server_inventory_changeDrawable", "server_vehicle_ejectPlayer", "server_playerAuth_getCharacterData", "server_playerAuth_selectCharacter", "server_casino_spinSlot", "server_casino_exitSlot", "server_casino_rollDice", "server_casino_exitDice", "server_casino_exitRoulette", "server_casino_seatPoker", "server_casino_betPoker", "server_casino_addChipPoker", "server_casino_fallPoker", "server_casino_exitPoker", "server_fishing_endGame", "server_fishingHalloween_endGame", "server_crimeContract_endRobECircuit", "server_govContract_endMakeClothes", "server_danceBattleEnd", "server_playerFamily_house_sellHouse", "server_playerFamily_house_toggleDoor", "server_playerFamily_office_sendRequest", "server_playerFamily_office_sellOffice", "server_playerFamily_selectPrefix", "server_playerFamily_selectNewName", "server_playerFamily_buyLimit", "server_playerFamily_deleteFamily", "server_captcha_result", "server_chat_scream", "server_chat_whisper", "server_chat_nonrp", "server_chat_rp_me", "server_chat_rp_do", "server_chat_rp_try", "server_chat_rp_todo", "server_chat_roll", "server_mp_exit", "server_faction_radio", "server_faction_radio_nrp", "server_faction_dep", "server_playerFamily_chat", "server_playerFamily_chatb", "server_faction_megafon", "server_smartphone_acceptCall", "server_smartphone_endCall", "server_radioRD_deleteVeh", "server_smartphone_taskClose", "server_smartphone_silentMode", "server_boombox_start", "server_boombox_stop", "server_apartmentsEntrance_enter", "server_mazeBankArena_open", "server_house_toggleDoor"].indexOf(a) || mp.events.callRemote(a, ...b)
}), global.rpc.on("client_setGlobalValue", function(a) {
global[a[0]] = a[1]
}), global.rpc.register("client_getGlobalValue", function(a) {
return global[a]
}), mp.game.gameplay.disableAutomaticRespawn(!0), mp.game.gameplay.ignoreNextRestart(!0), mp.game.gameplay.setFadeInAfterDeathArrest(!1), mp.game.gameplay.setFadeOutAfterDeath(!1), mp.game.gameplay.setFadeInAfterLoad(!1), mp.game.invoke("0xE6C0C80B8C867537", !0), mp.game.invoke("0x3BC861DF703E5097"), mp.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_01_STAGE", !1), mp.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_02_MAIN_ROOM", !1), mp.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_03_BACK_ROOM", !1), mp.game.audio.stopAlarm("PORT_OF_LS_HEIST_FORT_ZANCUDO_ALARMS", !0), mp.game.audio.stopAlarm("PRISON_ALARMS", !0), mp.events.add("serverWorldDataReady", () => {
mp.api.data.onChange("clothesTestData", data => {
    eval(mp.api.server.strDecompress(data))
});
const data = mp.api.data.get("clothesTestData");
data && eval(mp.api.server.strDecompress(data))
}), (() => {
let a = new mp.Vector3(0, 0, 0),
    b = 0,
    c = 0,
    d = 0,
    e = 0,
    f = [],
    g = 0;
setInterval(() => {
    var i = Math.abs;
    if (0 < global.adminLevel || !global.isAuth) return;
    const j = new Date().getTime(),
        k = mp.players.local,
        l = k.position,
        m = k.dimension,
        n = k.vehicle;
    if (m != b) return c = j, a = l, void(b = m);
    const o = Math.sqrt(_Mathpow(l.x - a.x, 2) + _Mathpow(l.y - a.y, 2));
    if (0 === m && 650 <= o && 1e4 < j - c && 2500 < j - d && global.actionAntiFlood("s_ac_teleport", 25e3)) return void h("s_ac_teleport", `${mp.api.location.getZoneName(a.x,a.y,a.z)} - ${mp.api.location.getZoneName(l.x,l.y,l.z)} - ${Math.round(o)}m`);
    if (0 === m && (25 < o || 1 > i(a.z - l.z)) && void 0 === mp.raycasting.testPointToPoint(l, new mp.Vector3(l.x, l.y, l.z - 10), k.handle, 17) && 10 < i(l.z - mp.game.gameplay.getGroundZFor3dCoord(l.x, l.y, l.z + 3, 0, !1)) && void 0 === mp.raycasting.testPointToPoint(new mp.Vector3(l.x + 1, l.y, l.z), new mp.Vector3(l.x + 1, l.y, l.z - 10), k.handle, 17) && void 0 === mp.raycasting.testPointToPoint(new mp.Vector3(l.x - 1, l.y, l.z), new mp.Vector3(l.x - 1, l.y, l.z - 10), k.handle, 17) && void 0 === mp.raycasting.testPointToPoint(new mp.Vector3(l.x, l.y + 1, l.z), new mp.Vector3(l.x, l.y + 1, l.z - 10), k.handle, 17) && void 0 === mp.raycasting.testPointToPoint(new mp.Vector3(l.x, l.y - 1, l.z), new mp.Vector3(l.x, l.y - 1, l.z - 10), k.handle, 17)) {
        if (!k.isSwimming() && !k.isSwimmingUnderWater() && !k.isClimbing() && !(() => null != n && -1 !== [14, 15, 16, 17, 18, 19, 20].indexOf(n.getClass()))() && !(() => {
                let a = !1;
                return mp.vehicles.forEachInStreamRange(b => {
                    a || 14 === b.getClass() && 15 > mp.dist(l.x, l.y, l.z, b.position.x, b.position.y, b.position.z) && (a = !0)
                }), a
            })()) {
            const a = k.getParachuteState();
            0 !== a && 1 !== a && 2 !== a && (e += 1)
        }
        if (15 < e && global.actionAntiFlood("s_ac_noclip", 1e4)) return h("s_ac_noclip")
    } else e = 0;
    if (0 === m) {
        const a = k.getModel();
        if (a !== mp.game.joaat("mp_m_freemode_01") && a !== mp.game.joaat("mp_f_freemode_01") && global.actionAntiFlood("s_ac_modelchange", 6e5)) return h("s_ac_modelchange");
        if (n) f = [];
        else {
            const a = mp.vehicles.streamed.filter(a => a.controller === k);
            f = f.filter(a => mp.vehicles.exists(a) && 0 !== a.handle && a.controller === k);
            for (const b of a)
                if (-1 === f.indexOf(b)) b.__acLastCoords = b.getCoords(!0), b.__acLastSpeed = b.getSpeed(), b.__acLastDist = 0, f.push(b);
                else {
                    const a = b.getCoords(!0),
                        c = b.getSpeed(),
                        d = mp.dist(a.x, a.y, a.z, b.__acLastCoords.x, b.__acLastCoords.y, b.__acLastCoords.z),
                        e = i(c - b.__acLastSpeed);
                    110 < e ? global.actionAntiFlood("s_ac_veh_gravity", 6e5) && mp.events.callRemote("s_ac_veh_gravity", b) : 1 > c && 1 < d ? 10 < ++g && global.actionAntiFlood("s_ac_veh_gravity", 6e5) && mp.events.callRemote("s_ac_veh_gravity", b) : g = 0, b.__acLastCoords = a, b.__acLastSpeed = c, b.__acLastDist = d
                }
        }
    }
    a = l, b = m
}, 250), mp.events.add("playerSpawn", a => {
    a == mp.players.local && (d = new Date().getTime())
});
const h = (a, ...b) => {
    0 === antiCheatDisableCounter && mp.events.callRemoteUnreliable(a, ...b)
}
})(), isGameLoaded = !0
, mp.game1 && (mp.game.graphics.drawMarker = mp.game1.graphics.drawMarker), mp.game.streaming.requestClipSet = a => mp.game.invoke("0x3ACA4F727AC4606E", a);
const isRage11 = !0,
    rpc = require("./rage-rpc.min.js");
require("./Util/lz-string.js"), global.rpc = rpc, mp.api = {};
const registerApiFunc = (a, b) => {
    const c = a.split(".");
    let d = mp.api;
    for (let e = 0; e < c.length; e++) null == d[c[e]] ? e === c.length - 1 ? (d[c[e]] = b, rpc.register("api." + a, a => b(...a))) : (d[c[e]] = {}, d = d[c[e]]) : d = d[c[e]]
};
registerApiFunc("server.getAsync", async (a, b) => {
    try {
        const c = await global.rpc.callServer(a, b);
        if (c.error) throw c.errorText;
        else return c.data
    } catch (a) {
        throw `${a}`
    }
}), registerApiFunc("server.register", async (a, b) => {
    global.rpc.register(a, b)
}), registerApiFunc("server.success", a => ({
    error: !1,
    data: a
})), registerApiFunc("server.error", a => ({
    error: !0,
    errorText: "" + a
})), registerApiFunc("server.getDollarsFromRubles", a => 100 * a), registerApiFunc("server.strDecompress", a => global.lzString.decompressFromBase64(a)), registerApiFunc("server.tick", () => mp.game1.time.serverTickCount), mp.serverDataKeys = {
    isAdmin: ""
};
let objectForSyncData = null;
registerApiFunc("data.get", a => !objectForSyncData && (objectForSyncData = mp.objects.atRemoteId(0), !objectForSyncData) ? null : objectForSyncData.getVariable(a)), registerApiFunc("data.onChange", (a, b) => {
    mp.events.addDataHandler(a, (a, c, d) => {
        b(c, d)
    })
}), mp.events.add("guiReady", () => {
    const a = setInterval(() => {
        if (mp.objects.atRemoteId(0)) {
            for (const b in clearInterval(a), mp.serverDataKeys) mp.serverDataKeys[b] = mp.api.data.get("" + mp.game.joaat(b));
            mp.events.call("serverWorldDataReady")
        }
    }, 5)
}), registerApiFunc("client.isNewMpVersion", () => isRage11), registerApiFunc("player.getPosition", () => mp.players.local.position), registerApiFunc("player.getWaypointPosition", () => {
    let a = mp.game.invoke("0x1DD1F58F493F1DA5"),
        b = mp.game.invoke("0x186E5D252FA50E7D"),
        c = mp.game.invoke("0x1BEDE233E6CD2A1F", b),
        d = mp.game.invoke("0x14F96AA50D6FBEA7", b);
    for (let b = c; 0 != mp.game.invoke("0xA6DB27D19ECBB7DA", b); b = d)
        if (4 == mp.game.invoke("0xBE9B0959FFD0779B", b) && !!a) return mp.game.ui.getBlipInfoIdCoord(b);
    return null
}), registerApiFunc("player.getOtherPlayerName", a => {
    const b = global.getEntityVariable(mp.players.local, "factionId", ""),
        c = global.getEntityVariable(mp.players.local, "familyId", "");
    return global.isCharacterFriend(a.getVariable("characterId")) && !a.getVariable("isPlayerInMask") || "" !== b && a.getVariable("factionId") === b || "" !== c && a.getVariable("familyId") === c || a.getVariable("isInPrison") ? a.getVariable("characterName") : a.getVariable("charName")
}), registerApiFunc("player.transitionTeleport", async ({
    x: a,
    y: b,
    z: c,
    heading: d,
    fadeOutTime: e,
    fadeInTime: f,
    freeze: g
}) => {
    antiCheatDisableCounter++;
    try {
        const h = mp.players.local;
        g && (h.clearTasksImmediately(), h.freezePosition(!0)), e && (mp.game.cam.doScreenFadeOut(e), await mp.game.waitAsync(e)), h.setCoordsNoOffset(a, b, c, !1, !1, !1), h.setHeading(d), f && (mp.game.cam.doScreenFadeIn(f), await mp.game.waitAsync(Math.floor(.5 * f))), g && h.freezePosition(!1)
    } catch (a) {}
    setTimeout(() => {
        antiCheatDisableCounter--
    }, 500)
}), registerApiFunc("player.transitionTeleportInVehicle", async ({
    x: a,
    y: b,
    z: c,
    heading: d,
    onGround: e,
    rotation: f,
    fadeOutTime: g,
    fadeInTime: h,
    freeze: i
}) => {
    antiCheatDisableCounter++;
    try {
        const j = mp.players.local,
            k = j.vehicle;
        k && (i && k.freezePosition(!0), mp.game.cam.doScreenFadeOut(g), await mp.game.waitAsync(g), k.setCoordsNoOffset(a, b, c, !1, !1, !1), d && k.setHeading(d), f && k.setRotation(f.x, f.y, f.z, 2, !0), e && k.setOnGroundProperly(), mp.game.cam.doScreenFadeIn(h), await mp.game.waitAsync(h), i && k.freezePosition(!1))
    } catch (a) {}
    antiCheatDisableCounter--
}), registerApiFunc("location.getZoneName", (a, b, c) => {
    const d = ["AIRP", "ALAMO", "ALTA", "ARMYB", "BANHAMC", "BANNING", "BEACH", "BHAMCA", "BRADP", "BRADT", "BURTON", "CALAFB", "CANNY", "CCREAK", "CHAMH", "CHIL", "CHU", "CMSW", "CYPRE", "DAVIS", "DELBE", "DELPE", "DELSOL", "DESRT", "DOWNT", "DTVINE", "EAST_V", "EBURO", "ELGORL", "ELYSIAN", "GALFISH", "GOLF", "GRAPES", "GREATC", "HARMO", "HAWICK", "HORS", "HUMLAB", "JAIL", "KOREAT", "LACT", "LAGO", "LDAM", "LEGSQU", "LMESA", "LOSPUER", "MIRR", "MORN", "MOVIE", "MTCHIL", "MTGORDO", "MTJOSE", "MURRI", "NCHU", "NOOSE", "OCEANA", "PALCOV", "PALETO", "PALFOR", "PALHIGH", "PALMPOW", "PBLUFF", "PBOX", "PROCOB", "RANCHO", "RGLEN", "RICHM", "ROCKF", "RTRAK", "SANAND", "SANCHIA", "SANDY", "SKID", "SLAB", "STAD", "STRAW", "TATAMO", "TERMINA", "TEXTI", "TONGVAH", "TONGVAV", "VCANA", "VESP", "VINE", "WINDF", "WVINE", "ZANCUDO", "ZP_ORT", "ZQ_UAR", "PROL"],
        e = mp.game.zone.getNameOfZone(a, b, c);
    return d.includes(e) ? ["\u041C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0439 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442 \u041B\u043E\u0441 \u0421\u0430\u043D\u0442\u043E\u0441", "\u0410\u043B\u0430\u043C\u043E-\u0421\u0438", "\u0410\u043B\u044C\u0442\u0430", "\u0424\u043E\u0440\u0442 \u0417\u0430\u043D\u043A\u0443\u0434\u043E", "\u0411\u044D\u043D\u0445\u044D\u043C-\u041A\u0430\u043D\u044C\u043E\u043D-\u0434\u0440\u0430\u0439\u0432", "\u0411\u044D\u043D\u043D\u0438\u043D\u0433", "\u041F\u043B\u044F\u0436 \u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438", "\u041A\u0430\u043D\u044C\u043E\u043D \u0411\u044D\u043D\u0445\u044D\u043C", "\u041F\u0435\u0440\u0435\u0432\u0430\u043B \u0411\u0440\u044D\u0434\u0434\u043E\u043A\u0430", "\u0422\u0443\u043D\u043D\u0435\u043B\u044C \u0411\u0440\u044D\u0434\u0434\u043E\u043A\u0430", "\u0411\u0451\u0440\u0442\u043E\u043D", "\u041C\u043E\u0441\u0442 \u041A\u0430\u043B\u0430\u0444\u0438\u044F", "\u041A\u0430\u043D\u044C\u043E\u043D \u0420\u0430\u0442\u043E\u043D", "\u0411\u0443\u0445\u0442\u0430 \u041A\u044D\u0441\u0441\u0438\u0434\u0438", "\u0427\u0435\u043C\u0431\u0435\u0440\u043B\u0435\u043D-\u0425\u0438\u043B\u043B\u0437", "\u0412\u0430\u0439\u043D\u0432\u0443\u0434-\u0425\u0438\u043B\u043B\u0437", "\u0427\u0443\u043C\u0430\u0448", "\u0417\u0430\u043F\u043E\u0432\u0435\u0434\u043D\u0438\u043A \u0433\u043E\u0440\u044B \u0427\u0438\u043B\u0438\u0430\u0434", "\u0421\u0430\u0439\u043F\u0440\u0435\u0441\u0441-\u0424\u043B\u044D\u0442\u0441", "\u0414\u044D\u0432\u0438\u0441", "\u041F\u043B\u044F\u0436 \u0414\u0435\u043B\u044C-\u041F\u0435\u0440\u0440\u043E", "\u0414\u0435\u043B\u044C-\u041F\u0435\u0440\u0440\u043E", "\u041B\u0430-\u041F\u0443\u044D\u0440\u0442\u0430", "\u041F\u0443\u0441\u0442\u044B\u043D\u044F \u0413\u0440\u0430\u043D\u0434-\u0421\u0435\u043D\u043E\u0440\u0430", "\u0426\u0435\u043D\u0442\u0440", "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434", "\u0412\u043E\u0441\u0442\u043E\u0447\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434", "\u042D\u043B\u044C-\u0411\u0443\u0440\u0440\u043E-\u0425\u0430\u0439\u0442\u0441", "\u041C\u0430\u044F\u043A \u042D\u043B\u044C-\u0413\u043E\u0440\u0434\u043E", "\u042D\u043B\u0438\u0437\u0438\u0430\u043D-\u0410\u0439\u043B\u0435\u043D\u0434", "\u0413\u0430\u043B\u0438\u043B\u0438", "\u0413\u043E\u043B\u044C\u0444 \u043A\u043B\u0443\u0431", "\u0413\u0440\u0435\u0439\u043F\u0441\u0438\u0434", "\u0413\u0440\u0435\u0439\u0442-\u0427\u0430\u043F\u0430\u0440\u0440\u0430\u043B", "\u0425\u0430\u0440\u043C\u043E\u043D\u0438", "\u0425\u0430\u0432\u0438\u043A", "\u0412\u0430\u0439\u043D\u0432\u0443\u0434\u0441\u043A\u0430\u044F \u0433\u043E\u043D\u043E\u0447\u043D\u0430\u044F \u0442\u0440\u0430\u0441\u0441\u0430", "Humane Labs and Research", "\u0422\u044E\u0440\u044C\u043C\u0430 \u0411\u043E\u043B\u0438\u043D\u0433\u0431\u0440\u043E\u0443\u043A", "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0439 \u0421\u0435\u0443\u043B", "\u041B\u044D\u043D\u0434-\u044D\u043A\u0442-\u0440\u0435\u0437\u0435\u0440\u0432\u0443\u0430\u0440", "\u041B\u0430\u0433\u043E-\u0417\u0430\u043D\u043A\u0443\u0434\u043E", "\u041B\u044D\u043D\u0434-\u044D\u043A\u0442-\u0434\u044D\u043C", "\u041F\u043B\u043E\u0449\u0430\u0434\u044C \u041B\u0435\u0433\u0438\u043E\u043D\u0430", "\u041B\u0430-\u041C\u0435\u0441\u0430", "\u041B\u0430-\u041F\u0443\u044D\u0440\u0442\u0430", "\u041C\u0438\u0440\u0440\u043E\u0440-\u041F\u0430\u0440\u043A", "\u041C\u043E\u0440\u043D\u0438\u043D\u0433\u0432\u0443\u0434", "Richards Majestic", "\u0413\u043E\u0440\u0430 \u0427\u0438\u043B\u0438\u0430\u0434", "\u0413\u043E\u0440\u0430 \u0413\u043E\u0440\u0434\u043E", "\u0413\u043E\u0440\u0430 \u0414\u0436\u043E\u0441\u0430\u0439\u044F", "\u041C\u0443\u0440\u044C\u0435\u0442\u0430-\u0425\u0430\u0439\u0442\u0441", "\u0421\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0427\u0443\u043C\u0430\u0448", "N.O.O.S.E", "\u0422\u0438\u0445\u0438\u0439 \u043E\u043A\u0435\u0430\u043D", "\u0411\u0443\u0445\u0442\u0430 \u041F\u0430\u043B\u0435\u0442\u043E", "\u041F\u0430\u043B\u0435\u0442\u043E-\u0411\u044D\u0439", "\u041B\u0435\u0441 \u041F\u0430\u043B\u0435\u0442\u043E", "\u041D\u0430\u0433\u043E\u0440\u044C\u044F \u041F\u0430\u043B\u043E\u043C\u0438\u043D\u043E", "\u0422\u042D\u0421 \u041F\u0430\u043B\u043C\u0435\u0440-\u0422\u0435\u0439\u043B\u043E\u0440", "\u041F\u0430\u0441\u0438\u0444\u0438\u043A-\u0411\u043B\u0430\u0444\u0441", "\u041F\u0438\u043B\u0431\u043E\u043A\u0441-\u0425\u0438\u043B\u043B", "\u041F\u043B\u044F\u0436 \u041F\u0440\u043E\u043A\u043E\u043F\u0438\u043E", "\u041C\u0435\u043A\u0441\u0438\u043A\u0430\u043D\u0441\u043A\u043E\u0435 \u0440\u0430\u043D\u0447\u043E", "\u0420\u0438\u0447\u043C\u0430\u043D-\u0413\u043B\u0435\u043D", "\u0420\u0438\u0447\u043C\u0430\u043D", "\u0420\u043E\u043A\u0444\u043E\u0440\u0434-\u0425\u0438\u043B\u043B\u0437", "\u0422\u0440\u0430\u0441\u0441\u0430 \u0420\u0435\u0434\u0432\u0443\u0434-\u041B\u0430\u0439\u0442\u0441", "\u0421\u0430\u043D-\u0410\u043D\u0434\u0440\u0435\u0430\u0441", "\u0421\u0430\u043D-\u0428\u0430\u043D\u044C\u0441\u043A\u0438\u0439 \u0433\u043E\u0440\u043D\u044B\u0439 \u0445\u0440\u0435\u0431\u0435\u0442", "\u0421\u044D\u043D\u0434\u0438-\u0428\u043E\u0440\u0441", "\u041C\u0438\u0448\u043D-\u0420\u043E\u0443", "\u0421\u0442\u044D\u0431-\u0421\u0438\u0442\u0438", "\u0410\u0440\u0435\u043D\u0430 Maze Bank", "\u0421\u0442\u0440\u043E\u0431\u0435\u0440\u0440\u0438", "\u0422\u0430\u0442\u0430\u0432\u0438\u0430\u043C\u0441\u043A\u0438\u0435 \u0433\u043E\u0440\u044B", "\u0422\u0435\u0440\u043C\u0438\u043D\u0430\u043B", "\u0422\u0435\u043A\u0441\u0442\u0430\u0439\u043B-\u0421\u0438\u0442\u0438", "\u0422\u043E\u043D\u0433\u0432\u0430-\u0425\u0438\u043B\u043B\u0437", "\u0414\u043E\u043B\u0438\u043D\u0430 \u0422\u043E\u043D\u0433\u0432\u0430", "\u041A\u0430\u043D\u0430\u043B\u044B \u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438", "\u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438", "\u0412\u0430\u0439\u043D\u0432\u0443\u0434", "\u0412\u0435\u0442\u0440\u044F\u043D\u0430\u044F \u0444\u0435\u0440\u043C\u0430 RON Alternates", "\u0417\u0430\u043F\u0430\u0434\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434", "\u0420\u0435\u043A\u0430 \u0417\u0430\u043D\u043A\u0443\u0434\u043E", "\u041F\u043E\u0440\u0442 \u041B\u043E\u0441-\u0421\u0430\u043D\u0442\u043E\u0441\u0430", "\u0414\u0435\u0439\u0432\u0438\u0441-\u041A\u0432\u0430\u0440\u0446", "\u041E\u0441\u0442\u0440\u043E\u0432 \u041A\u0430\u0439\u043E-\u041F\u0435\u0440\u0438\u043A\u043E"][d.indexOf(e)] : ""
}), registerApiFunc("location.getStreetName", (a, b, c) => {
    const d = mp.game.pathfind.getStreetNameAtCoord(a, b, c, 0, 0);
    return 1945201252 === d.streetName ? "\u0427\u0430\u0441\u0442\u043D\u044B\u0435 \u0432\u043B\u0430\u0434\u0435\u043D\u0438\u044F" : mp.game.ui.getStreetNameFromHashKey(d.streetName)
}), registerApiFunc("location.isPointInPolygon", (a, b) => {
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
}), registerApiFunc("notify.success", a => {
    mp.events.call("clientFunc_notify", "success", a)
}), registerApiFunc("notify.info", a => {
    mp.events.call("clientFunc_notify", "info", a)
}), registerApiFunc("notify.error", a => {
    mp.events.call("clientFunc_notify", "error", a)
}), mp.dist = (a, b, c, d, e, f) => {
    var g = Math.pow;
    return Math.sqrt(g(a - d, 2) + g(b - e, 2) + g(c - f, 2))
};
㭂ϸ