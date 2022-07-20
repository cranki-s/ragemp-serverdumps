{
    const mp = global.mp,
        gameplayCamera = mp.cameras.new("gameplay");
    var isPlayerFireman = !1;
    const streamedFireObjectList = new Set,
        MAX_RANGE = 100;
    class FireObject {
        constructor(a, b, c) {
            this.id = a, this.type = b, this.position = c.position, this.object = c, this.object.notifyStreaming = !0, this.object.__fireObject = this, this.fireFxId = -1, 0 !== this.object.handle && (this.object.setCollision(!1, !0), streamedFireObjectList.add(this), checkStreamerInterval())
        }
        getScale() {
            switch (this.type) {
                case 1:
                    return .7;
                case 2:
                    return 1.2;
            }
            return 1
        }
        getDamageDist() {
            switch (this.type) {
                case 1:
                    return 1.1;
                case 2:
                    return 1.8;
            }
            return 1
        }
        getTimeToRemove() {
            switch (this.type) {
                case 1:
                    return 900;
                case 2:
                    return 1700;
            }
            return 1
        }
    }
    var streamerInterval = null;
    const checkStreamerInterval = () => {
        null !== streamerInterval && (clearInterval(streamerInterval), streamerInterval = null);
        0 === streamedFireObjectList.size || (streamerInterval = setInterval(async () => {
            const a = mp.players.local,
                {
                    x: b,
                    y: c,
                    z: d
                } = a.position;
            let e = !1;
            for (const a of streamedFireObjectList) {
                if (!mp.objects.exists(a.object)) {
                    if (-1 !== a.fireFxId && (mp.game.graphics.removeParticleFx(a.fireFxId, !1), a.fireFxId = -1), streamedFireObjectList.delete(a), 0 === streamedFireObjectList.size) return void checkStreamerInterval();
                    continue
                }
                const f = mp.dist(b, c, d, a.position.x, a.position.y, a.position.z);
                if (-1 !== a.fireFxId) {
                    if (f > MAX_RANGE) mp.game.graphics.removeParticleFx(a.fireFxId, !1), a.fireFxId = -1;
                    else if (!isPlayerFireman && f < a.getDamageDist()) {
                        global.actionAntiFlood("server_fire_damage", 1100) || mp.events.callRemote("server_fire_damage");
                        const a = mp.game.fire.startScriptFire(b, c, d, 0, !1);
                        setTimeout(() => {
                            mp.game.fire.removeScriptFire(a)
                        }, 500)
                    }
                } else if (f < MAX_RANGE) {
                    if (!e && (e = !0, !mp.game.streaming.hasNamedPtfxAssetLoaded("core")))
                        for (mp.game.streaming.requestNamedPtfxAsset("core"); !mp.game.streaming.hasNamedPtfxAssetLoaded("core");) await mp.game.waitAsync(0);
                    mp.game.graphics.setPtfxAssetNextCall("core"), a.fireFxId = mp.game.graphics.startParticleFxLoopedAtCoord("fire_wrecked_plane_cockpit", a.position.x, a.position.y, a.position.z, 0, 0, 0, a.getScale(), !0, !0, !0, !1)
                }
            }
            e && mp.game.streaming.removeNamedPtfxAsset("core")
        }, 500))
    };
    mp.events.add("entityStreamIn", function (a) {
        a.__fireObject != null && (a.setCollision(!1, !0), streamedFireObjectList.add(a.__fireObject), checkStreamerInterval())
    }), mp.events.add("entityStreamOut", function (a) {
        a.__fireObject != null && (-1 !== a.__fireObject.fireFxId && (mp.game.graphics.removeParticleFx(a.__fireObject.fireFxId, !1), a.__fireObject.fireFxId = -1), streamedFireObjectList.delete(a.__fireObject), checkStreamerInterval())
    });
    let loadDataFirst = !1;
    setTimeout(() => {
        mp.objects.forEach(a => {
            const b = a.getVariable("ofo");
            if (b) {
                const c = b.split("_");
                new FireObject(parseInt(c[0]), parseInt(c[1]), a)
            }
        }), loadDataFirst = !0
    }, 5e3), mp.events.addDataHandler("ofo", (a, b) => {
        if (loadDataFirst) {
            const c = b.split("_");
            new FireObject(parseInt(c[0]), parseInt(c[1]), a)
        }
    });
    let firemanWorkFxId = -1,
        fireObjectStartRemove = null,
        fireObjectRemoveTime = 0,
        fireObjectRemoveLastTime = 0,
        firemanSyncLast = 0,
        fireextinguisherLastShootPos = new mp.Vector3(0, 0, 0),
        fireextinguisherLastShootTime = 0,
        lastIcoUpdate = -1,
        icoUpdateTimeout = null;
    const eventRenderFiremanWork = async () => {
        const a = mp.players.local,
            b = a.vehicle,
            c = getTime();
        if (b) return lastIcoUpdate + 500 < c && b.getVariable("firemanVeh") && (toggleIco(!0, `${b.getVariable("water")||0}`), lastIcoUpdate = c, icoUpdateTimeout && clearTimeout(icoUpdateTimeout), icoUpdateTimeout = setTimeout(() => {
            toggleIco(!1)
        }, 1e3)), void mp.game.controls.disableControlAction(0, 68, !0);
        let d = null,
            e = 0,
            f = null,
            g = null,
            h = 10,
            i = 0;
        const j = 101631238 === global.getPlayerCurrentWeaponData().weapon;
        if (j) {
            const {
                x: b,
                y: c,
                z: d
            } = a.position;
            mp.vehicles.forEachInStreamRange(a => {
                if (a.getVariable("firemanVeh")) {
                    const e = mp.dist(b, c, d, a.position.x, a.position.y, a.position.z);
                    e < h && (g = a, i = g.getVariable("water") || 0, h = e)
                }
            })
        }
        if (j && g && 0 < i && mp.game.player.isFreeAiming()) {
            if (mp.game.controls.disableControlAction(0, 24, !0), mp.game.controls.disableControlAction(1, 24, !0), mp.game.controls.disableControlAction(0, 257, !0), -1 === firemanWorkFxId) {
                if (mp.attachmentMngr.addClient(a, mp.game.joaat("prop_hose_nozzle")), !mp.game.streaming.hasNamedPtfxAssetLoaded("core"))
                    for (mp.game.streaming.requestNamedPtfxAsset("core"); !mp.game.streaming.hasNamedPtfxAssetLoaded("core");) await mp.game.waitAsync(0);
                mp.game.graphics.setPtfxAssetNextCall("core"), firemanWorkFxId = mp.game.graphics.startParticleFxLoopedOnPedBone("water_cannon_jet", a.handle, .12, .3, .03, 20, 190, -35, 6286, 1, !1, !1, !1), mp.game.streaming.removeNamedPtfxAsset("core")
            }
            const b = gameplayCamera.getCoord(),
                h = gameplayCamera.getDirection(),
                i = new mp.Vector3(20 * h.x + b.x, 20 * h.y + b.y, 20 * h.z + b.z),
                j = mp.raycasting.testPointToPoint(b, i, mp.players.local, 31),
                k = j && j.position ? j.position : new mp.Vector3(i.x, i.y, mp.game.gameplay.getGroundZFor3dCoord(i.x, i.y, i.z + 1, 0, !1));
            mp.game.graphics.drawMarker(28, k.x, k.y, k.z, 0, 0, 0, 0, 0, 0, .5, .5, .5, 255, 0, 0, 100, !1, !1, 2, !1, null, null, !1), d = k, e = 2, f = g, firemanSyncLast + 450 < c && (firemanSyncLast = c, mp.events.callRemote("server_fireman_sync"))
        } else {
            if (j)
                if (g) 0 < i ? mp.game.graphics.drawText("\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u043E\u0434\u0443 \u0434\u043B\u044F \u0442\u0443\u0448\u0435\u043D\u0438\u044F \u043F\u043E\u0436\u0430\u0440\u0430 ( \u041F\u041A\u041C )", [.5, .9], {
                    font: 4,
                    centre: !0,
                    color: [255, 255, 255, 255],
                    scale: [.4, .4],
                    outline: !1
                }) : mp.game.graphics.drawText("\u0412\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0437\u0430\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043C\u0430\u0448\u0438\u043D\u0443 \u0432\u043E\u0434\u043E\u0439", [.5, .9], {
                    font: 4,
                    centre: !0,
                    color: [255, 255, 255, 255],
                    scale: [.4, .4],
                    outline: !1
                });
                else {
                    let b = !1;
                    const {
                        x: c,
                        y: d,
                        z: e
                    } = a.position;
                    mp.vehicles.forEachInStreamRange(a => {
                        if (!b && a.getVariable("firemanVeh")) {
                            const f = mp.dist(c, d, e, a.position.x, a.position.y, a.position.z);
                            100 > f && (b = !0)
                        }
                    }), b || (mp.game.controls.disableControlAction(0, 24, !0), mp.game.controls.disableControlAction(1, 24, !0), mp.game.controls.disableControlAction(0, 257, !0), mp.game.graphics.drawText("\u0412\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043E\u043A\u043E\u043B\u043E \u043F\u043E\u0436\u0430\u0440\u043D\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u044B", [.5, .9], {
                        font: 4,
                        centre: !0,
                        color: [255, 255, 255, 255],
                        scale: [.4, .4],
                        outline: !1
                    }))
                } - 1 !== firemanWorkFxId && (mp.attachmentMngr.removeFor(a, mp.game.joaat("prop_hose_nozzle")), mp.game.graphics.removeParticleFx(firemanWorkFxId, !1), firemanWorkFxId = -1), fireextinguisherLastShootTime + 100 > c && (d = fireextinguisherLastShootPos, e = 1)
        }
        if (d) {
            let a = null,
                b = 1.5;
            for (const c of streamedFireObjectList) {
                const e = mp.dist(d.x, d.y, d.z, c.position.x, c.position.y, c.position.z);
                e < b && (a = c, b = e)
            }
            if (null == a) return;
            if (a !== fireObjectStartRemove) fireObjectStartRemove = a, fireObjectRemoveTime = 0, fireObjectRemoveLastTime = c;
            else if (fireObjectRemoveLastTime + 2500 > c) {
                fireObjectRemoveLastTime = c, fireObjectRemoveTime += e, fireObjectRemoveTime >= a.getTimeToRemove() && (fireObjectRemoveTime = 0, mp.events.callRemote("server_fire_remove", a.id, f), global.discordUpdate("\u0422\u0443\u0448\u0438\u0442 \u043F\u043E\u0436\u0430\u0440", 120));
                const b = mp.game.graphics.world3dToScreen2d(d.x, d.y, d.z);
                b && (mp.game.graphics.drawRect(b.x, b.y, .03 + .002, .006 + .002, 0, 0, 0, 200), mp.game.graphics.drawRect(b.x, b.y, .03, .006, 41, 66, 78, 255), mp.game.graphics.drawRect(b.x - .03 / 2 * (1 - fireObjectRemoveTime / a.getTimeToRemove()), b.y, .03 * (fireObjectRemoveTime / a.getTimeToRemove()), .006, 48, 108, 135, 200))
            } else fireObjectRemoveTime = 0, fireObjectRemoveLastTime = c
        }
    };
    let firemanFireextinguisherSyncLast = 0;
    const eventPlayerWeaponShotFiremanWork = a => {
        if (101631238 === mp.game.invoke("0x0A6DB4965674D243", mp.players.local.handle) && a) {
            const b = getTime();
            firemanFireextinguisherSyncLast + 450 < b && (firemanFireextinguisherSyncLast = b), fireextinguisherLastShootPos = a, fireextinguisherLastShootTime = b
        }
    };
    mp.events.add("client_fireman_startWork", () => {
        isPlayerFireman || (isPlayerFireman = !0, mp.events.add("render", eventRenderFiremanWork), mp.events.add("playerWeaponShot", eventPlayerWeaponShotFiremanWork), global.mainMenuItems.set("\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u044B\u0437\u043E\u0432\u043E\u0432", () => {
            mp.events.callRemote("server_fireman_checkList")
        }), global.mainMenuItems.set("\u0414\u043E\u0441\u0442\u0430\u0442\u044C \u043E\u0433\u043D\u0435\u0442\u0443\u0448\u0438\u0442\u0435\u043B\u044C", () => {
            mp.events.callRemote("server_fireman_takeFireextinguisher")
        }), global.mainMenuItems.set("\u0423\u0431\u0440\u0430\u0442\u044C \u043E\u0433\u043D\u0435\u0442\u0443\u0448\u0438\u0442\u0435\u043B\u044C", () => {
            mp.events.callRemote("server_fireman_dropFireextinguisher")
        }), mp.events.call("client_player_setJobId", 3))
    }), mp.events.add("client_fireman_endWork", () => {
        isPlayerFireman && (isPlayerFireman = !1, mp.events.remove("render", eventRenderFiremanWork), mp.events.remove("playerWeaponShot", eventPlayerWeaponShotFiremanWork), global.mainMenuItems.delete("\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u044B\u0437\u043E\u0432\u043E\u0432"), global.mainMenuItems.delete("\u0414\u043E\u0441\u0442\u0430\u0442\u044C \u043E\u0433\u043D\u0435\u0442\u0443\u0448\u0438\u0442\u0435\u043B\u044C"), global.mainMenuItems.delete("\u0423\u0431\u0440\u0430\u0442\u044C \u043E\u0433\u043D\u0435\u0442\u0443\u0448\u0438\u0442\u0435\u043B\u044C"), mp.events.call("client_player_setJobId", -1))
    }), mp.events.add("fireman.sync", async a => {
        const b = mp.players.atRemoteId(a);
        if (b && 0 !== b.handle && (b.firemanSyncLast = getTime(), !b.firemanSyncTimer)) {
            if (!mp.game.streaming.hasNamedPtfxAssetLoaded("core"))
                for (mp.game.streaming.requestNamedPtfxAsset("core"); !mp.game.streaming.hasNamedPtfxAssetLoaded("core");) await mp.game.waitAsync(0);
            if (!mp.players.exists(b) || 0 === b.handle) return void mp.game.streaming.removeNamedPtfxAsset("core");
            mp.game.graphics.setPtfxAssetNextCall("core");
            const a = mp.game.graphics.startParticleFxLoopedOnPedBone("water_cannon_jet", b.handle, .12, .3, .03, 20, 190, -35, 6286, 1, !1, !1, !1);
            b.firemanSyncTimer = setInterval(() => {
                if (!mp.players.exists(b) || 0 === b.handle || 1e3 < getTime() - b.firemanSyncLast) return mp.game.graphics.removeParticleFx(a, !1), clearInterval(b.firemanSyncTimer), void delete b.firemanSyncTimer
            }, 100), mp.game.streaming.removeNamedPtfxAsset("core")
        }
    });
    const toggleIco = (a, b) => {
            global.mainBrowser.call("cb:mainHud:statusIco:status", "firemanWater", a, b)
        },
        getTime = () => new Date().getTime();
    mp.attachmentMngr.register("prop_hose_nozzle", "prop_hose_nozzle", 28422, new mp.Vector3(.13, .3, -.03), new mp.Vector3(10, -80, 0));
}