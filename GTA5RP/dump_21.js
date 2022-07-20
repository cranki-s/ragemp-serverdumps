{
    const mp = global.mp,
        usedObjectMap = new Map,
        usedObjectTypeMap = new Map;
    class UsedObjectType {
        constructor({
            typeId: a,
            infoText: b,
            range: c,
            triggerOffset: d,
            disableCollision: e,
            onUse: f,
            onEnter: g,
            onExit: h
        }) {
            this.typeId = a, this.infoText = b, this.range = c, this.disableCollision = e !== void 0 && e, this.triggerOffset = d === void 0 ? new mp.Vector3(0, 0, 0) : d, this.onUse = f, this.onEnter = g, this.onExit = h, usedObjectTypeMap.set(this.typeId, this)
        }
    }
    const currentUsedObjectList = new Set;
    class UsedObject {
        constructor(a) {
            this.entity = a;
            const b = a.getVariable("_uo").split("_");
            this.remoteId = parseInt(b[0]);
            const c = usedObjectTypeMap.get(b[1]);
            c && (this.type = c, this.type.disableCollision && (this.entity.__disableCollision = !0, this.entity.notifyStreaming = !0, 0 !== this.entity.handle && this.entity.setCollision(!1, !0)), this.enter = !1, this.triggerColshape = new global.TriggerColshape(new mp.Vector3(this.entity.position.x + this.type.triggerOffset.x, this.entity.position.y + this.type.triggerOffset.y, this.entity.position.z + this.type.triggerOffset.z), this.entity.dimension, this.type.range, () => {
                this.enter = !0, this.type.onEnter && this.type.onEnter(this), currentUsedObjectList.add(this), checkCurrent()
            }, () => {
                this.enter = !1, this.type.onExit && this.type.onExit(this), currentUsedObjectList.delete(this), checkCurrent()
            }), this.isDestroyed = !1, usedObjectMap.set(this.remoteId, this))
        }
        destroy() {
            this.isDestroyed = !0, this.enter && (this.enter = !1, this.type.onExit && this.type.onExit(this)), this.triggerColshape.destroy(), currentUsedObjectList.has(this) && (currentUsedObjectList.delete(this), checkCurrent()), usedObjectMap.delete(this.remoteId)
        }
    }
    let isStartCheck = !1,
        checkInterval = null,
        currentUsedObject = null;

    function checkCurrent() {
        isStartCheck ? 0 === currentUsedObjectList.size && (null !== checkInterval && (clearInterval(checkInterval), checkInterval = null), null !== currentUsedObject && global.notifyKeyHelpHide(), isStartCheck = !1, currentUsedObject = null) : 0 !== currentUsedObjectList.size && (checkInterval = setInterval(() => {
            let a = null,
                b = 6;
            const c = global.gameplayCamera.getCoord(),
                d = global.gameplayCamera.getDirection(),
                e = new mp.Vector3(100 * d.x + c.x, 100 * d.y + c.y, 100 * d.z + c.z),
                f = mp.raycasting.testPointToPoint(c, e, mp.players.local, 17);
            if (f) {
                if (f.entity != null)
                    for (const b of currentUsedObjectList)
                        if (mp.objects.exists(b.entity) && b.entity === f.entity) {
                            a = b;
                            break
                        } if (!a && null != f.position)
                    for (const c of currentUsedObjectList) {
                        if (!mp.objects.exists(c.entity)) continue;
                        const d = mp.game.system.vdist(c.entity.position.x, c.entity.position.y, c.entity.position.z, f.position.x, f.position.y, f.position.z);
                        d < b && (a = c, b = d)
                    }
            }
            if (null === currentUsedObject) null !== a && (currentUsedObject = a, currentUsedObject.type.infoText && global.notifyKeyHelpShow("E", currentUsedObject.type.infoText));
            else if (null !== a) {
                if (a === currentUsedObject) return;
                currentUsedObject = a, currentUsedObject.type.infoText && global.notifyKeyHelpShow("E", currentUsedObject.type.infoText)
            } else currentUsedObject.type.infoText && global.notifyKeyHelpHide(), currentUsedObject = null
        }, 100), isStartCheck = !0)
    }
    mp.keys.bind(69, !0, function () {
        null === currentUsedObject || !mp.objects.exists(currentUsedObject.entity) || mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || global.isPlayerDeath || !global.actionAntiFlood("usedObject", 500) || currentUsedObject.type.onUse(currentUsedObject)
    });
    let loadDataFirst = !1;
    setTimeout(() => {
        mp.objects.forEach(a => {
            const b = a.getVariable("_uo");
            b && new UsedObject(a)
        }), loadDataFirst = !0
    }, 5e3), mp.events.add("client_uo_destroy", a => {
        const b = usedObjectMap.get(parseInt(a));
        b && b.destroy()
    }), mp.events.addDataHandler("_uo", a => {
        loadDataFirst && new UsedObject(a)
    }), new UsedObjectType({
        typeId: "HOOKAH",
        infoText: "\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u043B\u044C\u044F\u043D",
        range: 1.8,
        disableCollision: !0,
        onUse: a => {
            let b = [];
            a.entity.model === mp.game.joaat("grp_hookah_1") ? b.push(["\u0417\u0430\u0431\u0438\u0442\u044C", () => a.isDestroyed ? global.hideMenuList() : void global.createMenuList({
                toPlayer: getPosForMenuListByObject(a.entity),
                items: [
                    ["\u0422\u0430\u0431\u0430\u043A", () => {
                        global.hideMenuList(), a.isDestroyed || mp.events.callRemote("server_hoohak_fuel", a.remoteId, 0)
                    }],
                    ["\u0422\u0440\u0430\u0432\u0430", () => {
                        global.hideMenuList(), a.isDestroyed || mp.events.callRemote("server_hoohak_fuel", a.remoteId, 1)
                    }],
                    ["\u041A\u0440\u0435\u043F\u043A\u0438\u0439 \u0430\u043B\u043A\u043E\u0433\u043E\u043B\u044C", () => {
                        global.hideMenuList(), a.isDestroyed || mp.events.callRemote("server_hoohak_fuel", a.remoteId, 2)
                    }],
                    ["\u041E\u0442\u043C\u0435\u043D\u0430", () => {
                        global.hideMenuList()
                    }]
                ]
            })]) : b.push(["\u041A\u0443\u0440\u0438\u0442\u044C", () => {
                global.hideMenuList();
                a.isDestroyed || mp.events.callRemote("server_hoohak_use", a.remoteId)
            }]), global.createMenuList({
                toPlayer: getPosForMenuListByObject(a.entity),
                items: [...b, ["\u0417\u0430\u0431\u0440\u0430\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_hoohak_take", a.remoteId)
                    }],
                    ["\u041E\u0442\u043C\u0435\u043D\u0430", () => {
                        global.hideMenuList()
                    }]
                ]
            })
        }
    }), new UsedObjectType({
        typeId: "MANGAL",
        infoText: "\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0433\u0440\u0438\u043B\u044C",
        range: 1.5,
        disableCollision: !1,
        onUse: a => {
            !0 === a.entity.getVariable("s") ? global.createMenuList({
                toPlayer: getPosForMenuListByObject(a.entity),
                items: [
                    ["\u0412\u0437\u044F\u0442\u044C \u0435\u0434\u0443", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_mangal_endCook", a.remoteId)
                    }],
                    ["\u0417\u0430\u0431\u0440\u0430\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_mangal_take", a.remoteId)
                    }],
                    ["\u041E\u0442\u043C\u0435\u043D\u0430", () => {
                        global.hideMenuList()
                    }]
                ]
            }) : global.createMenuList({
                toPlayer: getPosForMenuListByObject(a.entity),
                items: [
                    ["\u0413\u043E\u0442\u043E\u0432\u0438\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_mangal_cook", a.remoteId)
                    }],
                    ["\u0417\u0430\u0431\u0440\u0430\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_mangal_take", a.remoteId)
                    }],
                    ["\u041E\u0442\u043C\u0435\u043D\u0430", () => {
                        global.hideMenuList()
                    }]
                ]
            })
        }
    }), new UsedObjectType({
        typeId: "BOOMBOX",
        infoText: "\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0431\u0443\u043C\u0431\u043E\u043A\u0441",
        range: 1.8,
        disableCollision: !0,
        onUse: a => {
            global.createMenuList({
                toPlayer: getPosForMenuListByObject(a.entity),
                items: [
                    ["\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.call("__client_boombox_open", a.remoteId)
                    }],
                    ["\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_boombox_stop", a.remoteId)
                    }],
                    ["\u0417\u0430\u0431\u0440\u0430\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_boombox_take", a.remoteId)
                    }],
                    ["\u041E\u0442\u043C\u0435\u043D\u0430", () => {
                        global.hideMenuList()
                    }]
                ]
            })
        }
    }), new UsedObjectType({
        typeId: "CAMPINGTENT",
        infoText: "",
        range: 5,
        triggerOffset: new mp.Vector3(0, 0, .5),
        disableCollision: !1,
        onEnter: a => {
            global.mainMenuItems.set("\u0423\u0431\u0440\u0430\u0442\u044C \u043F\u0430\u043B\u0430\u0442\u043A\u0443", () => {
                a.isDestroyed || mp.events.callRemote("server_campingTent_take", a.remoteId)
            })
        },
        onExit: () => {
            global.mainMenuItems.delete("\u0423\u0431\u0440\u0430\u0442\u044C \u043F\u0430\u043B\u0430\u0442\u043A\u0443")
        },
        onUse: () => {}
    }), new UsedObjectType({
        typeId: "NYNEONTREE",
        infoText: "\u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C",
        range: 1.8,
        triggerOffset: new mp.Vector3(0, 0, .6),
        disableCollision: !1,
        onUse: a => {
            global.createMenuList({
                toPlayer: getPosForMenuListByObject(a.entity),
                items: [
                    ["\u0417\u0430\u0431\u0440\u0430\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_nyNeonTree_take", a.remoteId)
                    }],
                    ["\u041E\u0442\u043C\u0435\u043D\u0430", () => {
                        global.hideMenuList()
                    }]
                ]
            })
        }
    }), new UsedObjectType({
        typeId: "NYCHAMPANGETREE",
        infoText: "\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C",
        range: 1.8,
        triggerOffset: new mp.Vector3(0, 0, .6),
        disableCollision: !1,
        onUse: a => {
            global.createMenuList({
                toPlayer: getPosForMenuListByObject(a.entity),
                items: [
                    ["\u0412\u044B\u043F\u0438\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_nyChampangeTree_use", a.remoteId)
                    }],
                    ["\u0423\u0431\u0440\u0430\u0442\u044C", () => {
                        global.hideMenuList();
                        a.isDestroyed || mp.events.callRemote("server_nyChampangeTree_take", a.remoteId)
                    }],
                    ["\u041E\u0442\u043C\u0435\u043D\u0430", () => {
                        global.hideMenuList()
                    }]
                ]
            })
        }
    });

    function getPosForMenuListByObject(a) {
        const b = mp.game.graphics.world3dToScreen2d(a.position.x, a.position.y, a.position.z);
        return null == b ? [0, 0] : [b.x, Math.max(Math.min(b.y, .8), .4)]
    }
}