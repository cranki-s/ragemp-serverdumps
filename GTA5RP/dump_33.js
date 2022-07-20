{
    const mp = global.mp,
        player = mp.players.local;
    let playerJobId = -1,
        playerFamilyId = -1,
        playerFamilyFuncs = [];
    global.disableTargetMenu = !1, global.disableFastActionWithTargetMenu = !0, global.targetMenuOpen = !1, global.targetMenuRender = !0, global.targetVehicle = null, global.targetPlayer = null, global.targetItem = null, global.targetMenuFactionCustomItems = [];
    const dropObjectList = new Set,
        binderTargetPlayer = global.binder.register({
            action: "TARGET_PLAYER",
            desc: "\u0412\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u0438\u0433\u0440\u043E\u043A\u043E\u043C",
            defaultKey: 71,
            func: async () => {
                if (global.targetMenuOpen) return void global.rpc.triggerBrowser(global.mainBrowser, "client_browser_targetMenu_hide");
                if (!(mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || null == global.targetPlayer && !player.vehicle || global.isPlayerDeath || player.getVariable("cuffed") || global.disableTargetMenu)) {
                    if (player.vehicle) {
                        let a = [];
                        for (let b = -1; 24 > b; b++) {
                            const c = mp.players.atHandle(player.vehicle.getPedInSeat(b));
                            mp.players.exists(c) && c.vehicle === player.vehicle && c !== player && !a.find(a => a.entity === player) && a.push({
                                seat: b,
                                remoteId: c.remoteId,
                                characterName: mp.api.player.getOtherPlayerName(c),
                                entity: c
                            })
                        }
                        return 0 === a.length ? void 0 : (global.rpc.triggerBrowser(global.mainBrowser, "client_browser_targetMenu_show", {
                            type: "playersInVeh",
                            isDriver: player.vehicle.getPedInSeat(-1) === player.handle && player.vehicle.model !== mp.game.joaat("taxi"),
                            players: a
                        }), void global.showCursor(!0, !1))
                    }
                    return global.targetPlayer.__pedTargetAction ? void global.targetPlayer.__pedTargetAction() : null != global.itemInHand && global.itemInHand.useFlag & global.itemInHand_FLAG.PLAYER ? void((await global.rpc.callServer("server_playerHandItem_useOnPlayer", global.targetPlayer)) && mp.events.call("client_itemInHand_remove")) : void(global.rpc.triggerBrowser(global.mainBrowser, "client_browser_targetMenu_show", {
                        type: "player",
                        entity: global.targetPlayer,
                        targetCharacterId: global.getEntityVariable(global.targetPlayer, "characterId", -1),
                        playerFaction: global.getEntityVariable(player, "factionId", ""),
                        playerFactionType: global.getEntityVariable(player, "factionType", -1),
                        playerFactionCustomItems: global.targetMenuFactionCustomItems,
                        jobId: playerJobId,
                        familyId: playerFamilyId,
                        familyFuncs: playerFamilyFuncs,
                        itemInHand: global.itemInHand,
                        isPlayerInPrison: global.getEntityVariable(player, "isInPrison", !1),
                        isTargetDeath: 0 > global.getEntityVariable(global.targetPlayer, "rsd", !1),
                        isTargetInCuff: global.getEntityVariable(global.targetPlayer, "cuffed", !1)
                    }), global.showCursor(!0))
                }
            }
        }),
        binderTargetVeh = global.binder.register({
            action: "TARGET_VEH",
            desc: "\u0412\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u043C\u0430\u0448\u0438\u043D\u043E\u0439",
            defaultKey: 71,
            func: async () => global.targetMenuOpen ? void global.rpc.triggerBrowser(global.mainBrowser, "client_browser_targetMenu_hide") : mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || player.vehicle || null == global.targetVehicle || global.isPlayerDeath || player.getVariable("cuffed") || global.disableTargetMenu ? void 0 : null != global.itemInHand && global.itemInHand.useFlag & global.itemInHand_FLAG.VEHICLE ? void((await global.rpc.callServer("server_playerHandItem_useOnVehicle", global.targetVehicle)) && mp.events.call("client_itemInHand_remove")) : global.targetVehicle.getModel() !== mp.game.joaat("boattrailer") || global.targetVehicle.__boatInTrailerVeh ? void(global.rpc.triggerBrowser(global.mainBrowser, "client_browser_targetMenu_show", {
                type: "vehicle",
                entity: global.targetVehicle,
                door: 2 === global.targetVehicle.getDoorLockStatus(),
                trunk: global.getEntityVariable(global.targetVehicle, "trunkStatus", !1),
                hood: global.getEntityVariable(global.targetVehicle, "hoodStatus", !1),
                maxSeatCount: global.targetVehicle.getMaxNumberOfPassengers() + 1,
                playerFaction: global.getEntityVariable(player, "factionId", ""),
                playerFactionType: global.getEntityVariable(player, "factionType", -1),
                jobId: playerJobId,
                familyId: playerFamilyId,
                familyFuncs: playerFamilyFuncs,
                itemInHand: global.itemInHand,
                isBoatTrailer: !!global.targetVehicle.__boatInTrailerVeh && "" !== global.getEntityVariable(global.targetVehicle, "boatInTrailer", ""),
                isPlayerInWater: player.isInWater(),
                dimension: player.dimension,
                isTheftForPlayer: global.getEntityVariable(global.targetVehicle, "vehTheft", -1) === global.getEntityVariable(player, "characterId", 0)
            }), global.showCursor(!0)) : global.actionAntiFlood("server_vehicle_boatTrailerPut", 2e3) && global.rpc.triggerServer("server_vehicle_boatTrailerPut", global.targetVehicle)
        });
    global.binder.register({
        action: "TARGET_FAST1",
        desc: "\u0411\u044B\u0441\u0442\u0440\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 1",
        defaultKey: 88,
        func: () => {
            if (!(mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || global.disableTargetMenu && global.disableFastActionWithTargetMenu) && !(null == global.targetPlayer || player.vehicle) && !(global.isPlayerDeath || global.getEntityVariable(player, "cuffed", !1))) {
                const a = global.getEntityVariable(player, "factionType", -1);
                return 1 == a || 8 == a ? void rpc.triggerServer("server_faction_police_cuff", global.targetPlayer) : 4 == a ? void rpc.triggerServer("server_faction_mafia_cuff", global.targetPlayer) : 3 == a ? void rpc.triggerServer("server_faction_gang_cuff", global.targetPlayer) : 6 == a ? void rpc.triggerServer("server_faction_cityHall_cuff", global.targetPlayer) : 2 == a ? void rpc.triggerServer("server_faction_army_cuff", global.targetPlayer) : 9 == a ? void rpc.triggerServer("server_faction_prison_cuff", global.targetPlayer) : -1 === playerFamilyFuncs.indexOf("ABDUCT") ? void 0 : void rpc.triggerServer("server_family_cuff", global.targetPlayer)
            }
        }
    }), global.binder.register({
        action: "TARGET_FAST2",
        desc: "\u0411\u044B\u0441\u0442\u0440\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 2",
        defaultKey: 90,
        func: () => {
            if (!(mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || global.disableTargetMenu && global.disableFastActionWithTargetMenu) && !(null == global.targetPlayer || player.vehicle) && !(global.isPlayerDeath || player.getVariable("cuffed"))) {
                const a = global.getEntityVariable(player, "factionType", -1);
                return 1 == a || 8 == a ? void rpc.triggerServer("server_faction_police_escort", global.targetPlayer) : 4 == a ? void rpc.triggerServer("server_faction_mafia_escort", global.targetPlayer) : 3 == a ? void rpc.triggerServer("server_faction_gang_escort", global.targetPlayer) : 6 == a ? void rpc.triggerServer("server_faction_cityHall_escort", global.targetPlayer) : 2 == a ? void rpc.triggerServer("server_faction_army_escort", global.targetPlayer) : 9 == a ? void rpc.triggerServer("server_faction_prison_escort", global.targetPlayer) : -1 === playerFamilyFuncs.indexOf("ABDUCT") ? void 0 : void rpc.triggerServer("server_family_escort", global.targetPlayer)
            }
        }
    });
    let lastRaycastingResult, renderCounter = 0;
    mp.events.add("render", () => {
        if (global.targetMenuOpen || null != player.vehicle || global.isPlayerDeath) return global.targetVehicle = null, global.targetPlayer = null, void(global.targetItem = null);
        if (0 == ++renderCounter % 3) {
            renderCounter = 0;
            let a = player.getBoneCoords(12844, .5, 0, 0);
            const b = mp.game.graphics.getScreenActiveResolution(1, 1),
                c = mp.game.graphics.screen2dToWorld3d([b.x / 2, b.y / 2, 14]);
            if (null == c) return global.targetVehicle = null, global.targetPlayer = null, void(global.targetItem = null);
            a.z -= .3, lastRaycastingResult = mp.raycasting.testPointToPoint(a, c, player, 14)
        }
        if (!lastRaycastingResult || !lastRaycastingResult.entity) return global.targetVehicle = null, global.targetPlayer = null, global.targetItem = null, void checkObjectList();
        renderCounter = 2;
        const a = lastRaycastingResult.entity;
        if (a.__pedTargetAction) {
            const {
                x: b,
                y: c,
                z: d
            } = a.getCoords(!0);
            global.targetMenuRender && mp.game.graphics.drawText(binderTargetPlayer.keyName, [b, c, d], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [.4, .4],
                outline: !0
            }), global.targetPlayer = a, global.targetVehicle = null, global.targetItem = null
        } else if ("player" === a.type) {
            const {
                x: b,
                y: c,
                z: d
            } = a.position;
            if (4 < mp.dist(player.position.x, player.position.y, player.position.z, b, c, d) || 10 >= a.getAlpha()) return global.targetVehicle = null, global.targetPlayer = null, void(global.targetItem = null);
            global.targetMenuRender && mp.game.graphics.drawText(binderTargetPlayer.keyName, [b, c, d], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [.4, .4],
                outline: !0
            }), global.targetPlayer = a, global.targetVehicle = null, global.targetItem = null
        } else if ("vehicle" === a.type) {
            const {
                x: b,
                y: c,
                z: d
            } = a.position;
            if (4 < mp.dist(player.position.x, player.position.y, player.position.z, b, c, d)) return global.targetVehicle = null, global.targetPlayer = null, void(global.targetItem = null);
            global.targetMenuRender && mp.game.graphics.drawText(binderTargetVeh.keyName, [b, c, d], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [.4, .4],
                outline: !0
            }), global.targetVehicle = a, global.targetPlayer = null, global.targetItem = null
        } else global.targetVehicle = null, global.targetPlayer = null, global.targetItem = null, checkObjectList()
    });

    function checkObjectList() {
        const {
            x: a,
            y: b,
            z: c
        } = player.position;
        let d = 2,
            e = null;
        for (const f of dropObjectList) {
            if (!mp.objects.exists(f)) {
                dropObjectList.delete(f);
                continue
            }
            if (0 === f.handle || player.dimension !== f.dimension) continue;
            const g = mp.dist(f.position.x, f.position.y, f.position.z, a, b, c);
            g < d && (e = f, d = g)
        }
        if (null != e) {
            const a = e.getVariable("objectItem").split("%");
            mp.game.graphics.drawText(`${a[1]} ( ${a[2]} )\n~g~E`, [e.position.x, e.position.y, e.position.z], {
                color: [255, 255, 255, 255],
                scale: [.35, .35],
                outline: !0
            }), global.targetItem = a
        }
    }
    mp.events.add("entityStreamIn", function (a) {
        a.__disableCollision != null && (a.setCollision(!1, !0), a.__objectItem != null && dropObjectList.add(a))
    }), mp.events.add("entityStreamOut", function (a) {
        a.__objectItem != null && dropObjectList.delete(a)
    }), mp.events.add("serverWorldDataReady", () => {
        setTimeout(() => {
            mp.objects.forEach(a => {
                a.getVariable("objectItem") && (a.__disableCollision = !0, a.__objectItem = !0, a.notifyStreaming = !0)
            }), mp.events.addDataHandler("objectItem", function (a) {
                a.__disableCollision = !0, a.__objectItem = !0, a.notifyStreaming = !0, 0 !== a.handle && (a.setCollision(!1, !0), dropObjectList.add(a))
            })
        }, 500)
    }), mp.keys.bind(69, !0, async function () {
        if (!(null == global.targetItem || mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || global.isPlayerDeath || player.vehicle)) {
            if ("1" == global.targetItem[2]) {
                const a = await global.rpc.callServer("server_inventoryWorldItem_take", [parseInt(global.targetItem[0]), 1]);
                return void(a.error && global.rpc.triggerClient("clientFunc_notifyError", a.errorText))
            }
            global.rpc.triggerClient("client_menu_playerTakeItemMenu_open", global.targetItem)
        }
    }), mp.events.add("playerQuit", function (a) {
        global.targetPlayer == a && (global.targetPlayer = null)
    }), mp.events.add("client_player_setJobId", function (a) {
        playerJobId = a
    }), mp.events.add("client_playerData_setFamilyId", function (a, b) {
        playerFamilyId = a, playerFamilyFuncs = b ? JSON.parse(b) : []
    }), global.rpc.register("__client_job_mehanic_getNearestVehicle", function () {
        const {
            x: a,
            y: b,
            z: c
        } = player.position;
        let d = null,
            e = 10;
        return mp.vehicles.forEachInStreamRange(f => {
            const g = mp.dist(f.position.x, f.position.y, f.position.z, a, b, c);
            g < e && !f.hasVariable("isMehanicVeh") && (d = f, e = g)
        }), d
    }), global.rpc.register("__client_job_mehanic_checkVehicle", function (a) {
        return a.getVariable("mfcCharId") === mp.players.local.getVariable("characterId")
    }), global.rpc.on("__client_vehicle_ejectPlayerFromVeh", a => {
        if (!mp.vehicles.exists(a)) return;
        const {
            x: b,
            y: c,
            z: d
        } = mp.players.local.position;
        if (!(10 < mp.dist(b, c, d, a.position.x, a.position.y, a.position.z))) {
            let e = [];
            for (let b = 0; 4 > b; b++) {
                const c = mp.players.atHandle(a.getPedInSeat(b));
                mp.players.exists(c) && c.vehicle == a && e.push(c.remoteId)
            }
            if (0 != e.length) {
                const f = mp.game.graphics.world3dToScreen2d(a.position.x, a.position.y, a.position.z);
                global.createMenuList({
                    toPlayer: null == f ? [.5, .5] : [f.x, Math.max(Math.min(f.y, .8), .4)],
                    items: [...e.map(e => [`Выкинуть [${e}]`, () => {
                        if (global.hideMenuList(), mp.vehicles.exists(a) && !(10 < mp.dist(b, c, d, a.position.x, a.position.y, a.position.z))) {
                            const b = mp.players.atRemoteId(e);
                            b && b.vehicle == a && mp.events.callRemote("server_vehicle_ejectPlayerFromVeh", a, b)
                        }
                    }]), ["\u041E\u0442\u043C\u0435\u043D\u0430", () => {
                        global.hideMenuList()
                    }]]
                })
            }
        }
    });
}