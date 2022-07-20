{
    const mp = global.mp,
        localPlayer = mp.players.local,
        DEFAULT_WEAPON_AMMO_CHECK_TIME = 250,
        DEFAULT_WEAPON_DAMAGE_EVENT = "spw";
    let CURRENT_WEAPON_DAMAGE_EVENT = DEFAULT_WEAPON_DAMAGE_EVENT;
    const WEAPON_UNARMED = mp.game.joaat("weapon_unarmed"),
        WEAPON_STUNGAN = mp.game.joaat("weapon_stungun"),
        WEAPON_FIREEXTINGUISHER = mp.game.joaat("weapon_fireextinguisher"),
        WEAPON_GRENADELAUNCHER_SMOKE = mp.game.joaat("weapon_grenadelauncher_smoke"),
        WEAPON_SNOWBALL = mp.game.joaat("weapon_snowball"),
        WEAPON_SHOOTGUN = [mp.game.joaat("weapon_bullpupshotgun"), mp.game.joaat("weapon_dbshotgun"), mp.game.joaat("weapon_pumpshotgun"), mp.game.joaat("weapon_pumpshotgun_mk2"), mp.game.joaat("weapon_assaultshotgun"), mp.game.joaat("weapon_heavyshotgun"), mp.game.joaat("weapon_musket"), mp.game.joaat("weapon_sawnoffshotgun")],
        WEAPON_MELEE = [mp.game.joaat("weapon_dagger"), mp.game.joaat("weapon_bat"), mp.game.joaat("weapon_bottle"), mp.game.joaat("weapon_crowbar"), mp.game.joaat("weapon_flashlight"), mp.game.joaat("weapon_golfclub"), mp.game.joaat("weapon_hammer"), mp.game.joaat("weapon_hatchet"), mp.game.joaat("weapon_knuckle"), mp.game.joaat("weapon_knife"), mp.game.joaat("weapon_machete"), mp.game.joaat("weapon_switchblade"), mp.game.joaat("weapon_nightstick"), mp.game.joaat("weapon_wrench"), mp.game.joaat("weapon_battleaxe"), mp.game.joaat("weapon_poolcue"), mp.game.joaat("weapon_stone_hatchet"), WEAPON_FIREEXTINGUISHER],
        WEAPON_PROJECTILE = [WEAPON_GRENADELAUNCHER_SMOKE, WEAPON_SNOWBALL],
        WEAPON_CANCEL_REMOVE_LIST = [WEAPON_SNOWBALL],
        WEAPON_BLOCK_LIST = [],
        WEAPON_HEVY_LIST = [mp.game.joaat("weapon_sawnoffshotgun"), mp.game.joaat("weapon_dbshotgun")];
    let currentWeapon = 0,
        currentAmmo = 0,
        infinityMod = !1,
        lastAmmo = 0,
        lastChangeWeaponTime = 0,
        lastSlot = -1,
        lastSaveSlot = -1,
        checkAmmoInterval = null,
        lastWeaponReload = 0,
        lastSetAmmo = 0,
        playerCuffStatus = !1,
        playerInGreenZone = 0,
        playerInGreenZoneNotify = 0,
        requestAmmo = !1,
        sendRequestAmmo = !1,
        sendRequestAmmoAuto = !1,
        freezeWeaponChange = !0,
        playerInStreamCount = 0,
        isPlayerCanUseHevyWeapon = !1;
    global.disableSelectWeapon = !1, global.getPlayerCurrentWeaponData = () => ({
        weapon: currentWeapon,
        ammo: currentAmmo
    }), global.isPlayerHasNonMeleeWeapon = () => 0 !== currentWeapon && -1 === WEAPON_MELEE.indexOf(currentWeapon), mp.events.add("client_playerWeapon_setWeapon", function (e, a, n) {
        if (currentWeapon = parseInt(e), currentAmmo = a, infinityMod = !!n, requestAmmo = 0 == a, sendRequestAmmo = !1, freezeWeaponChange = !1, isInfinityWeapon(currentWeapon) && (requestAmmo = !1, localPlayer.giveWeapon(currentWeapon, 99999, !0), localPlayer.setAmmoInClip(currentWeapon, 99999)), lastSetAmmo = new Date().getTime(), clearInterval(checkAmmoInterval), checkAmmoInterval = setInterval(checkAmmoHandler, DEFAULT_WEAPON_AMMO_CHECK_TIME), 0 !== currentWeapon) {
            const a = localPlayer.getVariable("weaponMods");
            a && applyModForLocalPlayer(parseWeaponModsFromStr(a), currentWeapon) && mp.events.callRemote("server_weapon_updateMods", e), mp.game1.weapon.unequipEmptyWeapons = !1
        }
    }), mp.events.add("client_playerWeapon_setAmmo", function (e) {
        currentAmmo = parseInt(e), requestAmmo = !1, sendRequestAmmo = !1, localPlayer.setAmmoInClip(currentWeapon, 0), localPlayer.giveWeapon(currentWeapon, currentAmmo, !0), lastSetAmmo = new Date().getTime(), mp.game1.weapon.unequipEmptyWeapons = !1
    }), mp.events.add("client_playerWeapon_setAmmoFail", () => {
        mp.api.notify.error("\u0423 \u0432\u0430\u0441 \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0438\u0441\u044C \u043F\u0430\u0442\u0440\u043E\u043D\u044B")
    }), mp.events.add("client_playerWeapon_changeError", () => {
        freezeWeaponChange = !1, lastSlot = lastSaveSlot
    }), mp.events.add("playerLeaveVehicle", () => {
        lastChangeWeaponTime = 0
    }), mp.events.add("c:character:skills:hevyWeaponOnVeh", e => {
        isPlayerCanUseHevyWeapon = !!e
    });
    const checkAmmoHandler = () => {
        if (0 !== localPlayer.handle) {
            if (0 === currentWeapon || freezeWeaponChange) return void global.mainBrowser.call(`cb:mainHud:setAmmo`, -1);
            const e = localPlayer.weapon;
            if (e === WEAPON_UNARMED || global.isSmartphoneOpen && !infinityMod) return freezeWeaponChange = !0, lastSlot = -1, removeWeaponFromHand(), void mp.events.callRemote("server_playerWeapon_resetWeapon", currentAmmo);
            if (!isPlayerCanUseHevyWeapon && !infinityMod && localPlayer.vehicle && -1 !== WEAPON_HEVY_LIST.indexOf(currentWeapon)) return freezeWeaponChange = !0, lastSlot = -1, removeWeaponFromHand(), void mp.events.callRemote("server_playerWeapon_resetWeapon", currentAmmo);
            if (!(localPlayer.isFalling() || localPlayer.isInAir() || localPlayer.isSwimming() || localPlayer.isSwimmingUnderWater() || localPlayer.isDead() || localPlayer.isClimbing() || localPlayer.isReloading() || localPlayer.isGettingUp() || localPlayer.isJumping() || localPlayer.isJumpingOutOfVehicle())) {
                if (lastAmmo = currentAmmo, currentAmmo = localPlayer.weaponAmmo, 0 == currentAmmo && !requestAmmo && !sendRequestAmmo && lastSetAmmo + 3200 < new Date().getTime() && null === sendShootTimeout) {
                    if (isInfinityWeapon(currentWeapon)) return localPlayer.giveWeapon(currentWeapon, 99999, !0), void localPlayer.setAmmoInClip(currentWeapon, 99999);
                    mp.events.callRemote("server_playerWeapon_resetAmmo", 0), requestAmmo = !0, sendRequestAmmoAuto = !0, lastWeaponReload = new Date().getTime()
                }
                global.mainBrowser.call(`cb:mainHud:setAmmo`, currentAmmo), playerInStreamCount = mp.players.streamed.length
            }
        }
    };
    checkAmmoInterval = setInterval(checkAmmoHandler, DEFAULT_WEAPON_AMMO_CHECK_TIME), global.binder.register({
        action: "WEAPON_RELOAD",
        desc: "\u041F\u0435\u0440\u0435\u0437\u0430\u0440\u044F\u0434\u043A\u0430 \u043E\u0440\u0443\u0436\u0438\u044F",
        defaultKey: 82,
        func: () => {
            !global.actionAntiFlood("fastAction", 350) || mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || localPlayer.isFalling() || localPlayer.isInAir() || localPlayer.isSwimming() || localPlayer.isSwimmingUnderWater() || localPlayer.isDead() || localPlayer.isClimbing() || localPlayer.isReloading() || localPlayer.isGettingUp() || localPlayer.isJumping() || localPlayer.isJumpingOutOfVehicle() || lastWeaponReload + 2500 > new Date().getTime() || (lastWeaponReload = new Date().getTime(), sendRequestAmmo = !0, sendRequestAmmoAuto = !1, mp.events.callRemote("server_playerWeapon_resetAmmo", currentAmmo))
        }
    });
    const selectWeapon = e => () => lastSlot === e || mp.gui.cursor.visible || global.isChatOpen || global.disableKeys || freezeWeaponChange || global.disableSelectWeapon || global.isSmartphoneOpen || playerCuffStatus || infinityMod || localPlayer.getIsTaskActive(167) || lastChangeWeaponTime + 1500 > new Date().getTime() ? void 0 : -1 !== e && null !== global.itemInHand ? void global.rpc.triggerClient("clientFunc_notifyError", "\u0423 \u0432\u0430\u0441 \u0437\u0430\u043D\u044F\u0442\u044B \u0440\u0443\u043A\u0438") : void(!global.actionAntiFlood("fastAction", 350) || (lastChangeWeaponTime = new Date().getTime(), freezeWeaponChange = !0, 0 <= e ? mp.events.callRemote("server_playerWeapon_selectWeapon", e, currentAmmo) : mp.events.callRemote("server_playerWeapon_resetWeapon", currentAmmo), lastSaveSlot = lastSlot, lastSlot = e, null !== sendShootTimeout && clearTimeout(sendShootTimeout), sendShootTimeout = null));
    global.binder.register({
        action: "WEAPON_SLOT_0",
        desc: "\u0414\u043E\u0441\u0442\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435 \u0438\u0437 1 \u0441\u043B\u043E\u0442\u0430",
        defaultKey: 49,
        func: selectWeapon(0)
    }), global.binder.register({
        action: "WEAPON_SLOT_1",
        desc: "\u0414\u043E\u0441\u0442\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435 \u0438\u0437 2 \u0441\u043B\u043E\u0442\u0430",
        defaultKey: 50,
        func: selectWeapon(1)
    }), global.binder.register({
        action: "WEAPON_SLOT_2",
        desc: "\u0414\u043E\u0441\u0442\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435 \u0438\u0437 3 \u0441\u043B\u043E\u0442\u0430",
        defaultKey: 51,
        func: selectWeapon(2)
    }), global.binder.register({
        action: "WEAPON_REMOVE",
        desc: "\u0423\u0431\u0440\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435",
        defaultKey: 52,
        func: selectWeapon(-1)
    }), mp.events.add("__client_playerWeapon_setWeaponSlot", e => {
        lastSlot = e
    }), mp.events.addDataHandler("cuffed", (e, a) => {
        e !== mp.players.local || (playerCuffStatus = a, a && 0 != currentWeapon && mp.events.callRemote("server_playerWeapon_resetWeapon", currentAmmo))
    });
    let sendShootTimeout = null,
        sendShootCount = 0,
        lastSpawnTime = -1;
    mp.events.add("incomingDamage", (e, a, n, o, t, r) => {
        if (n === localPlayer) {
            if (lastSpawnTime + 1500 > new Date().getTime()) return !0;
            if (WEAPON_UNARMED === o) {
                if (a instanceof mp.Player) {
                    const e = a.getVariable("rsd");
                    if (a.getVariable("newPlayer") || !isNaN(e) && 0 > e) return !0;
                    const n = localPlayer.position,
                        o = a.position;
                    if (2 < mp.dist(n.x, n.y, n.z, o.x, o.y, o.z)) return !0
                }
                return void mp.game.weapon.setCurrentDamageEventAmount(a instanceof mp.Ped && a.isDynamic && a.serverPed ? a.serverPed.weaponUnarmedDamage : 0 === playerInGreenZone ? 10 : 0)
            }
            if (-1 !== WEAPON_MELEE.indexOf(o)) {
                if (a instanceof mp.Player) {
                    const e = a.getVariable("rsd");
                    if (a.getVariable("newPlayer") || !isNaN(e) && 0 > e) return !0;
                    const n = localPlayer.position,
                        o = a.position;
                    if (3 < mp.dist(n.x, n.y, n.z, o.x, o.y, o.z)) return !0
                }
                return void mp.game.weapon.setCurrentDamageEventAmount(o === WEAPON_FIREEXTINGUISHER ? 0 : 0 === playerInGreenZone ? 15 : 0)
            }
            if (mp.game.weapon.setCurrentDamageEventAmount(0), mp.game.weapon.setCurrentDamageEventCritical(!1), a instanceof mp.Ped && a.isDynamic && a.serverPed) {
                if (-1 !== WEAPON_SHOOTGUN.indexOf(o) && !global.actionAntiFlood("shoot_sg", 50)) return !0;
                const {
                    x: e,
                    y: n,
                    z: r
                } = localPlayer.position, {
                    x: i,
                    y: d,
                    z: m
                } = a.getCoords(!0);
                mp.events.callRemoteUnreliable("server_ped_damage_in", a.serverPed.id, "" + o, t, mp.dist(i, d, m, e, n, r))
            }
            if (o === WEAPON_STUNGAN) {
                if (a instanceof mp.Player) {
                    const e = localPlayer.position,
                        n = a.position;
                    if (15 < mp.dist(e.x, e.y, e.z, n.x, n.y, n.z)) return !0
                }
                if (!global.actionAntiFlood("incomingDamage_stun", 1500)) return !0;
                if (2 > localPlayer.getHealth()) return localPlayer.setToRagdoll(4e3, 4e3, 0, !1, !1, !1), !0;
                global.mainBrowser.execute("for (let i = 0; i < 15; i++) UI_effect_drugs();")
            }
        } else if (n instanceof mp.Ped && n.isDynamic) mp.game.weapon.setCurrentDamageEventAmount(0), mp.game.weapon.setCurrentDamageEventCritical(!1);
        else if (n instanceof mp.Vehicle) {
            if (35 <= r && o === WEAPON_UNARMED) return !0;
            mp.game.weapon.setCurrentDamageEventAmount(Math.min(35, r))
        }
    }), mp.events.add("outgoingDamage", (e, a, n, o, t, r) => {
        if (e !== localPlayer) {
            if (a === localPlayer && e instanceof mp.Ped && e.isDynamic && e.serverPed)
                if (o === WEAPON_UNARMED) mp.game.weapon.setCurrentDamageEventAmount(e.serverPed.weaponUnarmedDamage);
                else if (-1 !== WEAPON_MELEE.indexOf(o)) mp.game.weapon.setCurrentDamageEventAmount(15);
            else {
                if (-1 !== WEAPON_SHOOTGUN.indexOf(o) && !global.actionAntiFlood("shoot_sg", 50)) return !0;
                const {
                    x: a,
                    y: n,
                    z: r
                } = localPlayer.position, {
                    x: i,
                    y: d,
                    z: m
                } = e.getCoords(!0);
                mp.events.callRemoteUnreliable("server_ped_damage_in", e.serverPed.id, "" + o, t, mp.dist(i, d, m, a, n, r))
            }
            return
        }
        if ("player" === a.type) {
            if (o === WEAPON_UNARMED) return void mp.game.weapon.setCurrentDamageEventAmount(10);
            if (-1 !== WEAPON_MELEE.indexOf(o)) return void mp.game.weapon.setCurrentDamageEventAmount(15);
            if (mp.game.weapon.setCurrentDamageEventAmount(0), mp.game.weapon.setCurrentDamageEventCritical(!1), o === currentWeapon) {
                if (-1 !== WEAPON_SHOOTGUN.indexOf(o) && !global.actionAntiFlood("shoot_sg", 50)) return !0;
                const e = a.getVariable("rsd");
                if (null == e) return !0;
                if (a.__isInGreenZone) {
                    const e = a.getCoords(!0),
                        n = a.dimension,
                        o = isCoordInGreenZone(e.x, e.y, e.z, n);
                    if (o) return;
                    delete a.__isInGreenZone
                } else if (!a.__isInGreenZoneCheck) {
                    const e = a.getCoords(!0),
                        n = a.dimension,
                        o = isCoordInGreenZone(e.x, e.y, e.z, n);
                    if (o) return void(a.__isInGreenZone = !0);
                    a.__isInGreenZoneCheck = !0, setTimeout(() => {
                        delete a.__isInGreenZoneCheck
                    }, 2500)
                }
                100 < playerInStreamCount ? (sendShootCount++, 3 <= sendShootCount ? (mp.events.callRemoteUnreliable(CURRENT_WEAPON_DAMAGE_EVENT, a, t, e, sendShootCount), null !== sendShootTimeout && clearTimeout(sendShootTimeout), sendShootTimeout = null, sendShootCount = 0) : (null !== sendShootTimeout && clearTimeout(sendShootTimeout), sendShootTimeout = setTimeout(() => {
                    mp.events.callRemoteUnreliable(CURRENT_WEAPON_DAMAGE_EVENT, a, t, e, sendShootCount), sendShootTimeout = null, sendShootCount = 0
                }, 199))) : (mp.events.callRemoteUnreliable(CURRENT_WEAPON_DAMAGE_EVENT, a, t, e), null !== sendShootTimeout && clearTimeout(sendShootTimeout), sendShootTimeout = null, sendShootCount = 0)
            }
            return
        }
        if (a instanceof mp.Ped && a.isDynamic && a.serverPed) {
            if (-1 !== WEAPON_SHOOTGUN.indexOf(o) && !global.actionAntiFlood("shoot_sg", 50)) return !0;
            mp.game.weapon.setCurrentDamageEventAmount(0), mp.game.weapon.setCurrentDamageEventCritical(!1);
            const {
                x: e,
                y: n,
                z: r
            } = localPlayer.position, {
                x: i,
                y: d,
                z: m
            } = a.getCoords(!0);
            return void mp.events.callRemoteUnreliable("server_ped_damage_out", a.serverPed.id, t, mp.dist(i, d, m, e, n, r))
        }
        if (!(35 <= r && "vehicle" === a.type && o === WEAPON_UNARMED)) return;
        mp.game.weapon.setCurrentDamageEventAmount(0);
        const i = a.getCoords(!0),
            d = Date.now(),
            m = setInterval(() => {
                if (Date.now() > d + 2500 || !mp.vehicles.exists(a) || 0 === a.handle) return void clearInterval(m);
                const e = mp.dist(i.x, i.y, i.z, a.position.x, a.position.y, a.position.z);
                2.5 <= e && (clearInterval(m), a.setCoords(i.x, i.y, i.z, !1, !1, !1, !1), mp.events.callRemote("s_ac_veh_damage"))
            }, 0)
    }), mp.events.add("playerSpawn", e => {
        e === localPlayer && (lastSpawnTime = new Date().getTime())
    }), mp.events.add("c:damageSystem:setEvent", e => {
        CURRENT_WEAPON_DAMAGE_EVENT = e
    }), mp.events.add("c:damageSystem:resetEvent", () => {
        CURRENT_WEAPON_DAMAGE_EVENT = DEFAULT_WEAPON_DAMAGE_EVENT
    }), mp.events.add("c:damageSystem:damage", e => {
        const a = mp.players.atRemoteId(65535 & e);
        if (!mp.players.exists(a) || 0 === a.handle) return;
        let n = 0;
        const o = new mp.Event("render", () => {
            if (!mp.players.exists(a) || 0 === a.handle || 1 < n) return void o.destroy();
            const {
                x: t,
                y: r,
                z: i
            } = a.getCoords(!0);
            mp.game.graphics.drawText(`-${65535&e>>16}`, [t, r, i + 1.1 + n], {
                font: 4,
                centre: !0,
                color: [255, 255, 255, .7 < n ? 255 * (3 * (.3 - (n - .7))) : 255],
                outline: !1,
                scale: [.4, .4]
            }), n += .015
        })
    });
    const resetDamageBlock = () => {
        localPlayer.setProofs(!1, !1, !1, !localPlayer.isInAir(), !1, !1, !1, !1), localPlayer.setConfigFlag(429, !0), localPlayer.setConfigFlag(241, !0), mp.game.player.resetStamina(), mp.game.player.setWeaponDamageModifier(-999999)
    };
    setInterval(resetDamageBlock, 2500), mp.events.add("explosion", () => !0), mp.events.add("projectile", (e, a) => {
        if (a === WEAPON_GRENADELAUNCHER_SMOKE) return !global.actionAntiFlood("projectileGrenadelauncher" + e.remoteId, 1e3);
        const n = e.getVariable("projectileWeaponData");
        if (!n) return !0;
        const o = n.split("_"),
            t = parseInt(o[0]),
            r = parseInt(o[1]);
        return t !== a || (e === localPlayer && (mp.events.callRemote("spwp", a + ""), lastSlot = -1, freezeWeaponChange = !1), !!(e.__projectileWeaponLast >= r) || void(e.__projectileWeaponLast = mp.api.server.tick()))
    }), mp.events.addDataHandler("projectileWeaponData", (e, a) => {
        e !== localPlayer || "" === a || (lastSaveSlot = lastSlot, lastSlot = "0_0" === a ? -1 : 3, freezeWeaponChange = !1)
    });
    let isWeaponShootingRecorderEnable = !1;
    mp.events.add("c:damageSystem:toggleWeaponShootingRecording", e => {
        if (isWeaponShootingRecorderEnable) return void(isWeaponShootingRecorderEnable = !1);
        isWeaponShootingRecorderEnable = !0;
        let a = 0,
            n = 0;
        const o = () => {
                a++, n = (5 < a ? 0 : 3) * 40
            },
            t = (e, n, o, t) => {
                e === localPlayer && t === currentWeapon && a--
            };
        mp.events.add("playerWeaponShot", o), mp.events.add("outgoingDamage", t);
        const r = setInterval(() => isWeaponShootingRecorderEnable ? void(0 < a && 0 >= --n && (mp.events.callRemoteUnreliable(e, a), a = 0)) : (clearInterval(r), mp.events.remove("playerWeaponShot", o), void mp.events.remove("outgoingDamage", t)), 25)
    });
    let weaponModList = [];
    const weaponModMap = new Map;
    mp.events.addDataHandler("weaponMods", (e, a) => {
        if (0 !== e.handle) {
            const n = e.weapon;
            if (n !== WEAPON_UNARMED) {
                const o = parseWeaponModsFromStr(a);
                if (e.__weaponMods)
                    for (const a of e.__weaponMods)
                        if (a[1] === n && -1 === o.findIndex(e => e[0] === a[0])) {
                            const n = weaponModMap.get(a[0]);
                            n && n.removeFromPlayer(e)
                        } e.__weaponMods = new Set, applyModForPlayer(e, o, e.weapon)
            }
        }
    }), mp.events.add("client_weapon_updateMods", (e, a) => {
        mp.players.exists(e) && 0 !== e.handle && setTimeout(() => {
            if (mp.players.exists(e) && 0 !== e.handle && (a = parseInt(a), e.weapon === a || e.weapon === a << 0)) {
                e.__weaponMods = new Set;
                const n = e.getVariable("weaponMods");
                n && applyModForPlayer(e, parseWeaponModsFromStr(n), a)
            }
        }, 1e3)
    });
    const applyModForLocalPlayer = (e, a) => {
            localPlayer.__weaponMods = new Set;
            let n = 0;
            for (const o of e) {
                const e = weaponModMap.get(o[0]);
                e && e.weapon === a && (e.onSet(localPlayer, o[1]), localPlayer.__weaponMods.add(o[0]), n++)
            }
            return 0 != n
        },
        applyModForPlayer = (e, a, n) => {
            for (const o of a) {
                const a = weaponModMap.get(o[0]);
                a && a.weapon === n && (a.onSet(e, o[1]), e.__weaponMods.add([o[0], n]))
            }
        };
    global.playerWeaponApplyModsStream = e => {
        setTimeout(() => {
            mp.players.exists(e) && 0 !== e.handle && e.weapon !== WEAPON_UNARMED && (e.__weaponMods = new Set, applyModForPlayer(e, parseWeaponModsFromStr(e.getVariable("weaponMods")), e.weapon))
        }, 1500)
    }, global.applyModToWeaponObject = (e, a, n) => {
        const o = weaponModMap.get(a);
        o && o.setToObject(e, n)
    }, global.removeModFromWeaponObject = (e, a) => {
        const n = weaponModMap.get(a);
        n && n.removeFromObject(e)
    };
    const createWeaponModComponentWithLivery = (e, a, n) => {
            const o = mp.game.joaat(a),
                t = n;
            weaponModList.push({
                mod: e,
                weapon: o,
                onSet: (e, a) => {
                    mp.game.weapon.giveComponentToPed(e.handle, o, t), mp.game.weapon.setPedLiveryColor(e.handle, o, t, parseInt(a))
                },
                removeFromPlayer: e => {
                    mp.game.weapon.hasPedGotComponent(e.handle, o, t) && mp.game.weapon.removeComponentFromPed(e.handle, o, t)
                },
                setToObject: async (e, a) => {
                    const n = mp.game.weapon.getComponentTypeModel(t);
                    !mp.game.streaming.hasModelLoaded(n) && (mp.game.streaming.requestModel(n), await mp.game.waitAsync(100), !mp.game.entity.doesExist(e)) || (mp.game.weapon.giveComponentToWeaponObject(e, t), mp.game.weapon.setObjectLiveryColor(e, t, parseInt(a)))
                },
                removeFromObject: e => {
                    mp.game.weapon.removeComponentFromWeaponObject(e, t)
                }
            }), weaponModMap.set(e, weaponModList[weaponModList.length - 1])
        },
        createWeaponModComponent2WithLivery = (e, a, n, o) => {
            const t = mp.game.joaat(a),
                r = n,
                i = o;
            weaponModList.push({
                mod: e,
                weapon: t,
                onSet: (e, a) => {
                    mp.game.weapon.giveComponentToPed(e.handle, t, r), mp.game.weapon.setPedLiveryColor(e.handle, t, r, parseInt(a)), mp.game.weapon.giveComponentToPed(e.handle, t, i), mp.game.weapon.setPedLiveryColor(e.handle, t, i, parseInt(a))
                },
                removeFromPlayer: e => {
                    mp.game.weapon.hasPedGotComponent(e.handle, t, r) && mp.game.weapon.removeComponentFromPed(e.handle, t, r), mp.game.weapon.hasPedGotComponent(e.handle, t, i) && mp.game.weapon.removeComponentFromPed(e.handle, t, i)
                },
                setToObject: async (e, a) => {
                    const n = mp.game.weapon.getComponentTypeModel(r),
                        o = mp.game.weapon.getComponentTypeModel(i);
                    (mp.game.streaming.hasModelLoaded(n) && mp.game.streaming.hasModelLoaded(o) || (mp.game.streaming.requestModel(n), mp.game.streaming.requestModel(o), await mp.game.waitAsync(100), !!mp.game.entity.doesExist(e))) && (mp.game.weapon.giveComponentToWeaponObject(e, r), mp.game.weapon.setObjectLiveryColor(e, r, parseInt(a)), mp.game.weapon.giveComponentToWeaponObject(e, i), mp.game.weapon.setObjectLiveryColor(e, i, parseInt(a)))
                },
                removeFromObject: e => {
                    mp.game.weapon.removeComponentFromWeaponObject(e, r), mp.game.weapon.removeComponentFromWeaponObject(e, i)
                }
            }), weaponModMap.set(e, weaponModList[weaponModList.length - 1])
        },
        createWeaponModComponent = (e, a, n) => {
            const o = mp.game.joaat(a),
                t = n;
            weaponModList.push({
                mod: e,
                weapon: o,
                onSet: e => {
                    mp.game.weapon.giveComponentToPed(e.handle, o, t)
                },
                removeFromPlayer: e => {
                    mp.game.weapon.hasPedGotComponent(e.handle, o, t) && mp.game.weapon.removeComponentFromPed(e.handle, o, t)
                },
                setToObject: async e => {
                    const a = mp.game.weapon.getComponentTypeModel(t);
                    !mp.game.streaming.hasModelLoaded(a) && (mp.game.streaming.requestModel(a), await mp.game.waitAsync(100), !mp.game.entity.doesExist(e)) || mp.game.weapon.giveComponentToWeaponObject(e, t)
                },
                removeFromObject: e => {
                    mp.game.weapon.removeComponentFromWeaponObject(e, t)
                }
            }), weaponModMap.set(e, weaponModList[weaponModList.length - 1])
        },
        createWeaponModComponent2 = (e, a, n, o) => {
            const t = mp.game.joaat(a),
                r = n,
                i = o;
            weaponModList.push({
                mod: e,
                weapon: t,
                onSet: e => {
                    mp.game.weapon.giveComponentToPed(e.handle, t, r), mp.game.weapon.giveComponentToPed(e.handle, t, i)
                },
                removeFromPlayer: e => {
                    mp.game.weapon.hasPedGotComponent(e.handle, t, r) && mp.game.weapon.removeComponentFromPed(e.handle, t, r), mp.game.weapon.hasPedGotComponent(e.handle, t, i) && mp.game.weapon.removeComponentFromPed(e.handle, t, i)
                },
                setToObject: async e => {
                    const a = mp.game.weapon.getComponentTypeModel(r),
                        n = mp.game.weapon.getComponentTypeModel(i);
                    (mp.game.streaming.hasModelLoaded(a) && mp.game.streaming.hasModelLoaded(n) || (mp.game.streaming.requestModel(a), mp.game.streaming.requestModel(n), await mp.game.waitAsync(100), !!mp.game.entity.doesExist(e))) && (mp.game.weapon.giveComponentToWeaponObject(e, r), mp.game.weapon.giveComponentToWeaponObject(e, i))
                },
                removeFromObject: e => {
                    mp.game.weapon.removeComponentFromWeaponObject(e, r), mp.game.weapon.removeComponentFromWeaponObject(e, i)
                }
            }), weaponModMap.set(e, weaponModList[weaponModList.length - 1])
        },
        createWeaponModTint = (e, a) => {
            const n = mp.game.joaat(a);
            weaponModList.push({
                mod: e,
                weapon: n,
                onSet: (e, a) => {
                    mp.game.weapon.setPedTintIndex(e.handle, n, parseInt(a))
                },
                removeFromPlayer: e => {
                    mp.game.weapon.setPedTintIndex(e.handle, n, 0)
                },
                setToObject: (e, a) => {
                    mp.game.weapon.setObjectTintIndex(e, parseInt(a))
                },
                removeFromObject: e => {
                    mp.game.weapon.setObjectTintIndex(e, 0)
                }
            }), weaponModMap.set(e, weaponModList[weaponModList.length - 1])
        },
        parseWeaponModsFromStr = e => e.split("%").map(e => e.split("|"));
    global.playerWeaponGetModsData = (e, a) => {
        const n = e.getVariable("weaponMods");
        if (!n) return [];
        let o = [];
        for (const t of parseWeaponModsFromStr(n)) {
            const e = weaponModMap.get(t[0]);
            e && e.weapon === a && o.push({
                mod: e,
                param: t[1]
            })
        }
        return o
    }, (() => {
        const e = mp.game.joaat;
        createWeaponModTint("SG_T", "weapon_stungun"), createWeaponModTint("PSTFLR_T", "weapon_flaregun"), createWeaponModTint("PST_T", "weapon_pistol"), createWeaponModComponent("PST_V_1", "weapon_pistol", e("COMPONENT_PISTOL_VARMOD_LUXE")), createWeaponModTint("PSTCOMB_T", "weapon_combatpistol"), createWeaponModComponent("PSTCOMB_V_1", "weapon_combatpistol", e("COMPONENT_COMBATPISTOL_VARMOD_LOWRIDER")), createWeaponModTint("PSTVINT_T", "weapon_vintagepistol"), createWeaponModTint("PSTHEAVY_T", "weapon_heavypistol"), createWeaponModComponent("PSTHEAVY_V_1", "weapon_heavypistol", e("COMPONENT_HEAVYPISTOL_VARMOD_LUXE")), createWeaponModTint("PSTMK2_T", "weapon_pistol_mk2"), createWeaponModComponent2WithLivery("PSTMK2_C_1", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO"), e("COMPONENT_PISTOL_MK2_CAMO_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_2", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_02"), e("COMPONENT_PISTOL_MK2_CAMO_02_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_3", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_03"), e("COMPONENT_PISTOL_MK2_CAMO_03_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_4", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_04"), e("COMPONENT_PISTOL_MK2_CAMO_04_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_5", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_05"), e("COMPONENT_PISTOL_MK2_CAMO_05_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_6", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_06"), e("COMPONENT_PISTOL_MK2_CAMO_06_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_7", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_07"), e("COMPONENT_PISTOL_MK2_CAMO_07_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_8", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_08"), e("COMPONENT_PISTOL_MK2_CAMO_08_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_9", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_09"), e("COMPONENT_PISTOL_MK2_CAMO_09_SLIDE")), createWeaponModComponent2WithLivery("PSTMK2_C_10", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_10"), e("COMPONENT_PISTOL_MK2_CAMO_10_SLIDE")), createWeaponModComponent2("PSTMK2_V_1", "weapon_pistol_mk2", e("COMPONENT_PISTOL_MK2_CAMO_IND_01"), e("COMPONENT_PISTOL_MK2_CAMO_IND_01_SLIDE")), createWeaponModTint("REV_T", "weapon_revolver"), createWeaponModComponent("REV_V_1", "weapon_revolver", e("COMPONENT_REVOLVER_VARMOD_GOON")), createWeaponModComponent("REV_V_2", "weapon_revolver", e("COMPONENT_REVOLVER_VARMOD_BOSS")), createWeaponModTint("MACHPST_T", "weapon_machinepistol"), createWeaponModTint("CPDW_T", "weapon_combatpdw"), createWeaponModTint("SMG_T", "weapon_smg"), createWeaponModComponent("SMG_V_1", "weapon_smg", e("COMPONENT_SMG_VARMOD_LUXE")), createWeaponModTint("MINISMG_T", "weapon_minismg"), createWeaponModTint("MICROSMG_T", "weapon_microsmg"), createWeaponModComponent("MICROSMG_V_1", "weapon_microsmg", e("COMPONENT_MICROSMG_VARMOD_LUXE")), createWeaponModTint("ASSMG_T", "weapon_assaultsmg"), createWeaponModComponent("ASSMG_V_1", "weapon_assaultsmg", e("COMPONENT_ASSAULTSMG_VARMOD_LOWRIDER")), createWeaponModTint("SMGMK2_T", "weapon_smg_mk2"), createWeaponModComponentWithLivery("SMGMK2_C_1", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO")), createWeaponModComponentWithLivery("SMGMK2_C_2", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_02")), createWeaponModComponentWithLivery("SMGMK2_C_3", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_03")), createWeaponModComponentWithLivery("SMGMK2_C_4", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_04")), createWeaponModComponentWithLivery("SMGMK2_C_5", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_05")), createWeaponModComponentWithLivery("SMGMK2_C_6", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_06")), createWeaponModComponentWithLivery("SMGMK2_C_7", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_07")), createWeaponModComponentWithLivery("SMGMK2_C_8", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_08")), createWeaponModComponentWithLivery("SMGMK2_C_9", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_09")), createWeaponModComponentWithLivery("SMGMK2_C_10", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_10")), createWeaponModComponent("SMGMK2_V_1", "weapon_smg_mk2", e("COMPONENT_SMG_MK2_CAMO_IND_01")), createWeaponModTint("SGBP_T", "weapon_bullpupshotgun"), createWeaponModTint("SGDB_T", "weapon_dbshotgun"), createWeaponModTint("SGPUMP_T", "weapon_pumpshotgun"), createWeaponModComponent("SGPUMP_V_1", "weapon_pumpshotgun", e("COMPONENT_PUMPSHOTGUN_VARMOD_LOWRIDER")), createWeaponModTint("SGAS_T", "weapon_assaultshotgun"), createWeaponModTint("SGHEAVY_T", "weapon_heavyshotgun"), createWeaponModTint("MUSKET_T", "weapon_musket"), createWeaponModTint("SGPUMP2_T", "weapon_pumpshotgun_mk2"), createWeaponModComponentWithLivery("SGPUMP2_C_1", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO")), createWeaponModComponentWithLivery("SGPUMP2_C_2", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_02")), createWeaponModComponentWithLivery("SGPUMP2_C_3", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_03")), createWeaponModComponentWithLivery("SGPUMP2_C_4", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_04")), createWeaponModComponentWithLivery("SGPUMP2_C_5", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_05")), createWeaponModComponentWithLivery("SGPUMP2_C_6", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_06")), createWeaponModComponentWithLivery("SGPUMP2_C_7", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_07")), createWeaponModComponentWithLivery("SGPUMP2_C_8", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_08")), createWeaponModComponentWithLivery("SGPUMP2_C_9", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_09")), createWeaponModComponentWithLivery("SGPUMP2_C_10", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_10")), createWeaponModComponent("SGPUMP2_V_1", "weapon_pumpshotgun_mk2", e("COMPONENT_PUMPSHOTGUN_MK2_CAMO_IND_01")), createWeaponModTint("SWNSG_T", "weapon_sawnoffshotgun"), createWeaponModComponent("SAWNOFF_V_1", "weapon_sawnoffshotgun", e("COMPONENT_SAWNOFFSHOTGUN_VARMOD_LUXE")), createWeaponModTint("AR_T", "weapon_assaultrifle"), createWeaponModComponent("AR_V_1", "weapon_assaultrifle", e("COMPONENT_ASSAULTRIFLE_VARMOD_LUXE")), createWeaponModTint("ARCOMP_T", "weapon_compactrifle"), createWeaponModTint("ARCARB_T", "weapon_carbinerifle"), createWeaponModComponent("ARCARB_V_1", "weapon_carbinerifle", e("COMPONENT_CARBINERIFLE_VARMOD_LUXE")), createWeaponModTint("ARSPEC_T", "weapon_specialcarbine"), createWeaponModComponent("ARSPEC_V_1", "weapon_specialcarbine", e("COMPONENT_SPECIALCARBINE_VARMOD_LOWRIDER")), createWeaponModTint("GUS_T", "weapon_gusenberg"), createWeaponModTint("KN_T", "weapon_knife"), createWeaponModComponent("KNUCKLE_V_1", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_PIMP")), createWeaponModComponent("KNUCKLE_V_2", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_BALLAS")), createWeaponModComponent("KNUCKLE_V_3", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_DOLLAR")), createWeaponModComponent("KNUCKLE_V_4", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_DIAMOND")), createWeaponModComponent("KNUCKLE_V_5", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_HATE")), createWeaponModComponent("KNUCKLE_V_6", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_LOVE")), createWeaponModComponent("KNUCKLE_V_7", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_PLAYER")), createWeaponModComponent("KNUCKLE_V_8", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_KING")), createWeaponModComponent("KNUCKLE_V_9", "weapon_knuckle", e("COMPONENT_KNUCKLE_VARMOD_VAGOS"))
    })();
    const greenZoneList = new Set,
        greenZoneHardList = new Set,
        isCoordInGreenZone = (e, a, n, o) => {
            for (const t of greenZoneHardList)
                if (t.dimension === o && mp.dist(e, a, 0, t.center.x, t.center.y, 0) < t.range && (!t.poly || mp.api.location.isPointInPolygon([e, a], t.poly)) && (!t.uId || !mp.api.data.get("greenZoneDisabled" + t.uId))) return !0;
            return !1
        };
    class GreenZone {
        constructor({
            uId: e,
            name: a,
            center: n,
            range: o,
            dimension: t,
            poly: r,
            isHard: i,
            onEnterEvent: d
        }) {
            this.uId = e, this.name = a, this.center = n, this.range = o, this.dimension = t, this.poly = r, this.isHard = i, this.onEnterEvent = d, this.isEnter = !1, this.isInRange = !1, this.checkInterval = null, new global.TriggerColshape(this.center, this.dimension, this.range, () => {
                this.isInRange || (this.poly ? this.checkInterval = setInterval(() => {
                    const e = !this.uId || !mp.api.data.get("greenZoneDisabled" + this.uId),
                        a = localPlayer.getCoords(!0),
                        n = mp.api.location.isPointInPolygon([a.x, a.y], this.poly);
                    !this.isEnter || n && e ? !this.isEnter && n && e && this.onEnter() : this.onExit()
                }, 250) : this.onEnter(), this.isInRange = !0)
            }, () => {
                this.isInRange && (this.isEnter && this.onExit(), null !== this.checkInterval && (clearInterval(this.checkInterval), this.checkInterval = null), this.isInRange = !1)
            }), greenZoneList.add(this), this.isHard && greenZoneHardList.add(this)
        }
        onEnter() {
            0 === playerInGreenZoneNotify && global.mainBrowser.execute(`mainHud.isPlayerInGreenZone = true;`), playerInGreenZoneNotify++, this.isHard && (0 === playerInGreenZone && global.mainBrowser.execute(`mainHud.isPlayerInGreenZoneHard = true;`), playerInGreenZone++), this.isEnter = !0, this.onEnterEvent && this.onEnterEvent()
        }
        onExit() {
            playerInGreenZoneNotify--, 0 === playerInGreenZoneNotify && global.mainBrowser.execute(`mainHud.isPlayerInGreenZone = false;`), this.isHard && (playerInGreenZone--, 0 === playerInGreenZone && global.mainBrowser.execute(`mainHud.isPlayerInGreenZoneHard = false;`)), this.isEnter = !1
        }
    }
    new GreenZone({
        uId: "LS_CITYHALL",
        name: "\u041C\u044D\u0440\u0438\u044F \u041B\u043E\u0441-\u0421\u0430\u043D\u0442\u043E\u0441",
        center: new mp.Vector3(-574.61, -167.97, 53.64),
        range: 200,
        dimension: 0,
        poly: [
            [
                [-550.23, -312.25, 35.13],
                [-690.38, -69.01, 37.71],
                [-675.09, -61.15, 38.31],
                [-661.96, -57.62, 39.15],
                [-642.83, -56.34, 40.79],
                [-620.31, -56.85, 41.92],
                [-608.94, -57.73, 42.07],
                [-586.91, -63.83, 41.86],
                [-559.7, -76.16, 42.1],
                [-553.24, -79.62, 41.82],
                [-540.88, -90.13, 40.45],
                [-520.6, -124.4, 38.91],
                [-514.78, -134.74, 38.9],
                [-478.6, -113.87, 38.93],
                [-402.83, -242.83, 36.26],
                [-450.24, -270.98, 35.93],
                [-497.73, -289.76, 35.57],
                [-528.91, -302.97, 35.54],
                [-519.95, -324.5, 34.88],
                [-538.58, -332.37, 35.19],
                [-550.23, -312.25, 35.13]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "OB_CITYHALL",
        name: "\u041C\u044D\u0440\u0438\u044F \u043E\u043A\u0440\u0443\u0433\u0430 \u0411\u043B\u044D\u0439\u043D",
        center: new mp.Vector3(-128.03, 6289.64, 45.35),
        range: 40,
        dimension: 0,
        poly: [
            [
                [-98.82, 6283.9, 31.31],
                [-129.45, 6252.6, 31.16],
                [-149.66, 6273.34, 34.05],
                [-145.08, 6278.01, 33.29],
                [-167.25, 6300.41, 33.04],
                [-141.13, 6325.93, 31.18],
                [-98.82, 6283.9, 31.31]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FIB",
        name: "\u041E\u0444\u0438\u0441 FIB",
        center: new mp.Vector3(138.16, -696.09, 75.44),
        range: 135,
        dimension: 0,
        poly: [
            [
                [176.23, -816.75, 31.17],
                [241.89, -622.62, 41.22],
                [110.03, -571.34, 31.64],
                [42.83, -767.8, 31.65],
                [176.23, -816.75, 31.17]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "WEAZELNEWS",
        name: "Weazel News",
        center: new mp.Vector3(-570.3, -889.19, 43.94),
        range: 100,
        dimension: 0,
        poly: [
            [
                [-633.11, -957.47, 21.5],
                [-544.04, -959.32, 23.5],
                [-512.59, -902.25, 26.7],
                [-505.47, -874.74, 29.24],
                [-505.12, -842.94, 30.47],
                [-632.45, -842.25, 25],
                [-633.11, -957.47, 21.5]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "LSPD",
        name: "LSPD",
        center: new mp.Vector3(449.58, -1061.17, 63.06),
        range: 150,
        dimension: 0,
        poly: [
            [
                [386.9, -941.84, 29.42],
                [386.18, -1108.01, 29.4],
                [386.23, -1125.8, 29.37],
                [407.87, -1125.03, 29.4],
                [407.9, -1170.18, 29.38],
                [493.58, -1170.93, 29.14],
                [495.72, -1156.16, 29.14],
                [494.89, -1122.96, 29.27],
                [507.21, -1120.93, 29.43],
                [507.97, -943.36, 26.99],
                [386.9, -941.84, 29.42]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "LSSD",
        name: "LSSD",
        center: new mp.Vector3(-447.14, 6009.34, 43.12),
        range: 100,
        dimension: 0,
        poly: [
            [
                [-361.85, 6018.82, 31.23],
                [-445.85, 5922.28, 32.57],
                [-527.84, 6003.7, 33.34],
                [-430.64, 6097, 31.66],
                [-361.85, 6018.82, 31.23]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "LS_EMS",
        name: "\u0411\u043E\u043B\u044C\u043D\u0438\u0446\u0430 \u041B\u043E\u0441-\u0421\u0430\u043D\u0442\u043E\u0441",
        center: new mp.Vector3(330.87, -1390.78, 88.23),
        range: 170,
        dimension: 0,
        poly: [
            [
                [322.97, -1506.13, 29.33],
                [233.41, -1430.53, 29.33],
                [169.76, -1391.73, 29.27],
                [210.38, -1333.81, 29.34],
                [230.98, -1317.9, 29.43],
                [247.71, -1313.98, 29.4],
                [301.87, -1314.96, 31.35],
                [324.42, -1325.62, 32.14],
                [337.88, -1329.33, 32.4],
                [386.74, -1270.85, 32.56],
                [477.49, -1347.01, 29.2],
                [444.28, -1387.38, 29.26],
                [461.04, -1403.35, 29.3],
                [446.99, -1428.54, 29.35],
                [421.45, -1448.4, 29.33],
                [322.97, -1506.13, 29.33]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SS_EMS",
        name: "\u0411\u043E\u043B\u044C\u043D\u0438\u0446\u0430 \u0421\u044D\u043D\u0434\u0438-\u0428\u043E\u0440\u0441",
        center: new mp.Vector3(1830.13, 3677.62, 45.68),
        range: 60,
        dimension: 0,
        poly: [
            [
                [1821.03, 3637.52, 34.3],
                [1790.78, 3688.44, 34.25],
                [1866.16, 3733.66, 33.13],
                [1895.75, 3680.7, 33.18],
                [1821.03, 3637.52, 34.3]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SASPA_PARKING",
        name: "\u0424\u0435\u0434\u0435\u0440\u0430\u043B\u044C\u043D\u0430\u044F \u0442\u044E\u0440\u044C\u043C\u0430",
        center: new mp.Vector3(1837.83, 2651.98, 59.12),
        range: 150,
        dimension: 0,
        poly: [
            [
                [1829.66, 2716.2, 45.68],
                [1879.02, 2750.5, 45.56],
                [1934.79, 2674.24, 45.34],
                [1951.69, 2609.27, 45.9],
                [1900.46, 2558.37, 45.54],
                [1889.35, 2522.76, 45.8],
                [1863.41, 2506.05, 45.9],
                [1820.57, 2506.67, 45.87],
                [1816.38, 2533.06, 45.61],
                [1818.9, 2613.75, 46.64],
                [1826.58, 2619.53, 46.8],
                [1823.15, 2625.52, 46.04],
                [1848.13, 2696.36, 45.48],
                [1851.84, 2699.05, 45.25],
                [1847.5, 2702.44, 44.61],
                [1846.33, 2701.75, 46.4],
                [1829.66, 2716.2, 45.68]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "MINE",
        name: "\u0428\u0430\u0445\u0442\u0430",
        center: new mp.Vector3(2935.96, 2795.65, 52.1),
        range: 100,
        dimension: 0,
        poly: [
            [
                [2889.62, 2813.16, 54.41],
                [2949, 2709.26, 54.6],
                [3041.68, 2747.3, 65.13],
                [2971.02, 2874.67, 58.26],
                [2889.62, 2813.16, 54.41]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONSTRUCTION",
        name: "\u0421\u0442\u0440\u043E\u0439\u043A\u0430",
        center: new mp.Vector3(75.53, -387.61, 71.12),
        range: 130,
        dimension: 0,
        poly: [
            [
                [177.44, -342.41, 44.05],
                [150.99, -406.4, 41.15],
                [135.39, -457.85, 42.2],
                [67.84, -466.92, 42],
                [17.89, -462.22, 42],
                [-23.29, -451.94, 40.46],
                [1.38, -372.83, 39.86],
                [34.94, -291.17, 47.75],
                [177.44, -342.41, 44.05]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "PORT",
        name: "\u041F\u043E\u0440\u0442",
        center: new mp.Vector3(-429.24, -2723.42, 15.53),
        range: 85,
        dimension: 0,
        poly: [
            [
                [-427.92, -2652.5, 6.4],
                [-364.62, -2715.08, 6.08],
                [-370.36, -2733.25, 6.14],
                [-376.55, -2743.75, 6.14],
                [-390.23, -2758.18, 6.1],
                [-448, -2758.57, 5.96],
                [-462.58, -2773.88, 5.96],
                [-506.09, -2731.06, 6.4],
                [-427.92, -2652.5, 6.4]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "TAXI1",
        name: "\u0422\u0430\u043A\u0441\u043E\u043F\u0430\u0440\u043A 1",
        center: new mp.Vector3(905.39, -160.22, 85.2),
        range: 45,
        dimension: 0,
        poly: [
            [
                [913.3, -200.7, 72.13],
                [875.39, -169.16, 78.27],
                [899.09, -129.15, 77.23],
                [941.31, -155.39, 74.53],
                [913.3, -200.7, 72.13]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "TAXI2",
        name: "\u0422\u0430\u043A\u0441\u043E\u043F\u0430\u0440\u043A 2",
        center: new mp.Vector3(-1541.4, -408.36, 47.98),
        range: 55,
        dimension: 0,
        poly: [
            [
                [-1515.53, -392.68, 40.91],
                [-1547.23, -431.67, 41.93],
                [-1567.88, -414.18, 42.99],
                [-1533.23, -376.09, 43.6],
                [-1515.53, -392.68, 40.91]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "COLLECTOR1",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 \u0438\u043D\u043A\u0430\u0441\u0441\u0430\u0442\u043E\u0440\u043E\u0432 1",
        center: new mp.Vector3(121.41, -1078.67, 43.7),
        range: 75,
        dimension: 0,
        poly: [
            [
                [98.36, -1040.97, 29.42],
                [177.84, -1068.52, 29.17],
                [173.34, -1089.82, 29.54],
                [115.19, -1090.89, 29.82],
                [82.42, -1077.45, 29.38],
                [98.36, -1040.97, 29.42]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "COLLECTOR2",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 \u0438\u043D\u043A\u0430\u0441\u0441\u0430\u0442\u043E\u0440\u043E\u0432 2",
        center: new mp.Vector3(-1194.83, -1486.89, 11.94),
        range: 65,
        dimension: 0,
        poly: [
            [
                [-1186.98, -1526.97, 4.43],
                [-1232.81, -1462.33, 4.3],
                [-1190.09, -1431.7, 4.47],
                [-1145.23, -1498.52, 4.41],
                [-1186.98, -1526.97, 4.43]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "TRUCKSTATION1",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 \u0434\u0430\u043B\u044C\u043D\u043E\u0431\u043E\u0439\u0449\u0438\u043A\u043E\u0432 1",
        center: new mp.Vector3(-804.68, -2678.44, 21.95),
        range: 85,
        dimension: 0,
        poly: [
            [
                [-824.09, -2606.86, 13.98],
                [-753.8, -2647.58, 13.93],
                [-801.94, -2738.03, 13.93],
                [-872.81, -2697.73, 13.98],
                [-864.25, -2677.12, 13.98],
                [-824.09, -2606.86, 13.98]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "TRUCKSTATION2",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 \u0434\u0430\u043B\u044C\u043D\u043E\u0431\u043E\u0439\u0449\u0438\u043A\u043E\u0432 2",
        center: new mp.Vector3(934.59, -3175.1, 31.98),
        range: 95,
        dimension: 0,
        poly: [
            [
                [875.83, -3230.77, 5.89],
                [875.4, -3106.47, 5.9],
                [971.64, -3106.1, 5.9],
                [973.04, -3230.72, 5.9],
                [875.83, -3230.77, 5.89]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "AUTOMECH1",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u043E\u0432 1",
        center: new mp.Vector3(-825.03, -761.82, 31.86),
        range: 65,
        dimension: 0,
        poly: [
            [
                [-859.26, -779.21, 20.58],
                [-859.01, -737.92, 24.36],
                [-799.51, -738.21, 24.79],
                [-799, -778.17, 22.12],
                [-859.26, -779.21, 20.58]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "AUTOMECH2",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u043E\u0432 2",
        center: new mp.Vector3(-26.4, 6449.37, 39.17),
        range: 45,
        dimension: 0,
        poly: [
            [
                [-48.67, 6441.54, 31.97],
                [-24.76, 6463.77, 32.21],
                [-5.02, 6455.95, 31.63],
                [-33.93, 6426.31, 32.62],
                [-48.67, 6441.54, 31.97]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "PARKFINE1",
        name: "\u0428\u0442\u0440\u0430\u0444\u0441\u0442\u043E\u044F\u043D\u043A\u0430 1",
        center: new mp.Vector3(497.27, -54.01, 99.49),
        range: 65,
        dimension: 0,
        poly: [
            [
                [445.03, -68.28, 73.38],
                [478.69, -10.04, 84.04],
                [528.94, -40.98, 76.88],
                [504.62, -90.38, 73.36],
                [445.03, -68.28, 73.38]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "PARKFINE2",
        name: "\u0428\u0442\u0440\u0430\u0444\u0441\u0442\u043E\u044F\u043D\u043A\u0430 2",
        center: new mp.Vector3(30.85, 6300.4, 61.55),
        range: 85,
        dimension: 0,
        poly: [
            [
                [-46.64, 6318.15, 31.33],
                [68.6, 6432.74, 31.31],
                [116.78, 6372.77, 32.35],
                [55.13, 6337.76, 32.23],
                [-32.41, 6283.89, 33.8],
                [-46.64, 6318.15, 31.33]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "PARKING1",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 1",
        center: new mp.Vector3(-1218.89, -660.54, 63.98),
        range: 85,
        dimension: 0,
        poly: [
            [
                [-1147.23, -697.71, 21.19],
                [-1191.98, -734.56, 20.63],
                [-1276.3, -630.22, 26.93],
                [-1232.12, -597.74, 27.24],
                [-1147.23, -697.71, 21.19]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "PARKING2",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 2",
        center: new mp.Vector3(-141.86, -2089.1, 57.39),
        range: 190,
        dimension: 0,
        poly: [
            [
                [-281.06, -2165.93, 11.97],
                [-269.26, -2138.72, 22.96],
                [-226.81, -2139.12, 23.62],
                [-178.2, -2117.23, 24.92],
                [-142.72, -2101.13, 25.65],
                [-151.28, -2077.82, 25.63],
                [-157.84, -2071.87, 25.95],
                [-162.52, -2060.3, 24.95],
                [-149.3, -1964.83, 23.01],
                [-129.04, -1963.9, 23.65],
                [-48.74, -1990.85, 19.09],
                [-17.17, -2086.95, 19.71],
                [-17.62, -2107.12, 17.87],
                [-29.8, -2117.78, 17.4],
                [-168.79, -2167.78, 17.49],
                [-269.69, -2180.16, 10.47],
                [-281.06, -2165.93, 11.97]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "PARKING3",
        name: "\u0421\u0442\u043E\u044F\u043D\u043A\u0430 3",
        center: new mp.Vector3(-583.14, -2148.26, 22.94),
        range: 150,
        dimension: 0,
        poly: [
            [
                [-611.07, -2266.35, 6.05],
                [-663.53, -2221.02, 6.34],
                [-699.21, -2216.61, 6],
                [-758.73, -2165.45, 6.16],
                [-697.82, -2093.23, 6.13],
                [-659.07, -2088.21, 6.13],
                [-632.8, -2070.25, 6.13],
                [-521.77, -2163.69, 7.49],
                [-611.07, -2266.35, 6.05]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "BLACKMARKET",
        name: "\u0427\u0435\u0440\u043D\u044B\u0439 \u0440\u044B\u043D\u043E\u043A",
        center: new mp.Vector3(2441.09, 4974.42, 59.54),
        range: 70,
        dimension: 0,
        poly: [
            [
                [2478.17, 4968.87, 45.18],
                [2443.75, 4935.21, 45.08],
                [2389.97, 4980.58, 44.77],
                [2444.95, 5044.71, 45.94],
                [2497.95, 4988.52, 44.56],
                [2478.17, 4968.87, 45.18]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "GANGROBZONE",
        name: "\u0412\u044B\u0434\u0430\u0447\u0430 \u043E\u0433\u0440\u0430\u0431\u043B\u0435\u043D\u0438\u0439",
        center: new mp.Vector3(1467.03, 6344.14, 47.6),
        range: 160,
        dimension: 0,
        poly: [
            [
                [1398.61, 6309.4, 35.58],
                [1412.79, 6490.62, 20.28],
                [1600.61, 6425.37, 25.81],
                [1555.78, 6288.13, 48.5],
                [1398.61, 6309.4, 35.58]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "QUADRO",
        name: "\u0410\u0440\u0435\u043D\u0434\u0430 \u043A\u0432\u0430\u0434\u0440\u043E\u0446\u0438\u043A\u043B\u043E\u0432",
        center: new mp.Vector3(-764.54, 5562.27, 42.15),
        range: 80,
        dimension: 0,
        poly: [
            [
                [-776.98, 5606.38, 34.13],
                [-734.61, 5605.77, 36.07],
                [-731.59, 5538.08, 34.58],
                [-769.7, 5514.69, 34.47],
                [-779.89, 5534.8, 34.19],
                [-783.56, 5559.43, 33.24],
                [-783.55, 5585, 33.08],
                [-776.98, 5606.38, 34.13]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLEGRAPESEED",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u0413\u0440\u0435\u0439\u043F\u0441\u0438\u0434",
        center: new mp.Vector3(1653.78, 4840, 51.11),
        range: 80,
        dimension: 0,
        poly: [
            [
                [1633.52, 4843.48, 43.55],
                [1655.98, 4846.33, 42.14],
                [1659.25, 4819.7, 42.01],
                [1637.19, 4817.2, 42.88],
                [1633.52, 4843.48, 43.55]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLEFARM",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u0424\u0435\u0440\u043C\u0430",
        center: new mp.Vector3(2585.41, 4684.04, 40.02),
        range: 60,
        dimension: 0,
        poly: [
            [
                [2599.85, 4666.8, 34.38],
                [2564.52, 4703.4, 33.94],
                [2570.01, 4709.61, 33.51],
                [2607.01, 4673.43, 33.48],
                [2599.85, 4666.8, 34.38]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLEDESERT",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u0413\u0440\u0430\u043D\u0434-\u0421\u0435\u043D\u043E\u0440\u0430",
        center: new mp.Vector3(469.74, 3546.61, 33.31),
        range: 60,
        dimension: 0,
        poly: [
            [
                [483.06, 3550.97, 33.33],
                [480.44, 3540, 33.33],
                [461.39, 3543.04, 32.96],
                [463.97, 3554.17, 33.31],
                [483.06, 3550.97, 33.33]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLESANSHAN",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u0421\u0430\u043D-\u0428\u0430\u043D\u044C\u0441\u043A\u0438\u0439 \u0445\u0440\u0435\u0431\u0435\u0442",
        center: new mp.Vector3(2974.54, 3483.56, 71.44),
        range: 60,
        dimension: 0,
        poly: [
            [
                [2989.84, 3480.68, 71.44],
                [2991.26, 3490.74, 71.38],
                [2976.24, 3493.68, 71.4],
                [2974.54, 3483.56, 71.44],
                [2989.84, 3480.68, 71.44]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLEWINDFARM",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u0412\u0435\u0442\u0440\u044F\u043D\u0430\u044F \u0444\u0435\u0440\u043C\u0430",
        center: new mp.Vector3(2543.53, 2587.49, 38.4),
        range: 50,
        dimension: 0,
        poly: [
            [
                [2543.33, 2599.44, 38.4],
                [2534.06, 2596.33, 38.4],
                [2537.31, 2581.04, 38.4],
                [2548.65, 2584, 38.4],
                [2543.33, 2599.44, 38.4]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLESENORA",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u0413\u0440\u0430\u043D\u0434-\u0421\u0435\u043D\u043E\u0440\u0430",
        center: new mp.Vector3(191.08, 2446.35, 59.51),
        range: 50,
        dimension: 0,
        poly: [
            [
                [209.75, 2444.38, 58.28],
                [210.29, 2452.71, 57.16],
                [191.44, 2454.39, 55.99],
                [191.08, 2446.35, 59.51],
                [209.75, 2444.38, 58.28]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLEELYSIAN",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u042D\u043B\u0438\u0437\u0438\u0430\u043D-\u0410\u0439\u043B\u0435\u043D\u0434",
        center: new mp.Vector3(-443.76, -2186.84, 10.11),
        range: 60,
        dimension: 0,
        poly: [
            [
                [-448.53, -2184.76, 10.49],
                [-458.57, -2185.5, 10.49],
                [-458.15, -2193.7, 10.49],
                [-434.9, -2192.37, 10.2],
                [-435.88, -2184.98, 10.62],
                [-448.53, -2184.76, 10.49]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLEELBURRO",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u042D\u043B\u044C-\u0411\u0443\u0440\u0440\u043E-\u0425\u0430\u0439\u0442\u0441",
        center: new mp.Vector3(1619.29, -2380.49, 93.06),
        range: 0,
        dimension: 0,
        poly: [
            [
                [1632.12, -2388.76, 95.8],
                [1643.64, -2380.81, 96.99],
                [1622.53, -2363.23, 93.69],
                [1610.77, -2373.28, 92.64],
                [1610.77, -2373.28, 92.64],
                [1632.12, -2388.76, 95.8]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "DIVING",
        name: "\u0414\u0430\u0439\u0432\u0438\u043D\u0433 \u0438 \u0432\u043E\u0434\u043E\u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435",
        center: new mp.Vector3(1971.48, 237.81, 211.73),
        range: 450,
        dimension: 0,
        poly: [
            [
                [1665.68, 37.21, 160.81],
                [1678.72, 51.31, 164.09],
                [1848.19, 139.16, 163.01],
                [1833.33, 256.53, 160.47],
                [1793.74, 442.58, 161.21],
                [1980.36, 684.8, 158.44],
                [2069.77, 443.39, 161.8],
                [2085.89, 274.6, 162.63],
                [2070.61, 69.98, 163.75],
                [1873.15, -81.43, 164.62],
                [1737.2, -81.9, 162.47],
                [1687.25, -63.1, 162.41],
                [1678.38, -51.1, 160.59],
                [1676.91, -22.51, 159.52],
                [1667.48, 1.84, 160.39],
                [1665.68, 37.21, 160.81]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SECRETSHOP",
        name: "Secret Shop",
        center: new mp.Vector3(1086.32, -776.44, 67.37),
        range: 70,
        dimension: 0,
        poly: [
            [
                [1062.76, -758.8, 57.7],
                [1064.12, -799.39, 58.09],
                [1102.16, -799.6, 58.74],
                [1101.7, -794.82, 58.49],
                [1115.17, -794.95, 58.8],
                [1114.25, -759.24, 57.65],
                [1062.76, -758.8, 57.7]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "BAGSHOP",
        name: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0441\u0443\u043C\u043E\u043A",
        center: new mp.Vector3(726.8, -955.36, 42.23),
        range: 70,
        dimension: 0,
        poly: [
            [
                [697.98, -996.96, 24.49],
                [696.11, -938.19, 24.69],
                [774, -938.58, 27.04],
                [772.19, -968.59, 26.25],
                [772.81, -988.81, 26.25],
                [726.4, -994.61, 25.36],
                [697.98, -996.96, 24.49]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTMEATEND",
        name: "\u0421\u0434\u0430\u0447\u0430 \u043C\u044F\u0441\u0430",
        center: new mp.Vector3(-419.43, -2187.38, 16.81),
        range: 60,
        dimension: 0,
        poly: [
            [
                [-399.22, -2160.49, 10.2],
                [-399.43, -2187.82, 9.96],
                [-420.15, -2188.26, 9.95],
                [-420.29, -2161.82, 10.32],
                [-399.22, -2160.49, 10.2]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTTRASHEND",
        name: "\u0421\u0434\u0430\u0447\u0430 \u043C\u0443\u0441\u043E\u0440\u0430",
        center: new mp.Vector3(-458.44, -1719.63, 20.16),
        range: 60,
        dimension: 0,
        poly: [
            [
                [-448.74, -1736.41, 18.12],
                [-470.21, -1742.12, 19.17],
                [-473.05, -1713.05, 19.01],
                [-456.14, -1688.8, 19.25],
                [-438.99, -1694.22, 19.37],
                [-443.93, -1724.75, 18.91],
                [-448.74, -1736.41, 18.12]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTLNSEND",
        name: "\u0421\u0434\u0430\u0447\u0430 \u0433\u0440\u0443\u0437\u0430",
        center: new mp.Vector3(-451.25, -989.72, 24.27),
        range: 60,
        dimension: 0,
        poly: [
            [
                [-468.48, -995.88, 24.27],
                [-472.5, -974.94, 23.92],
                [-435.31, -976.43, 26.61],
                [-432.82, -995.44, 27.31],
                [-468.48, -995.88, 24.27]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTLNSSTART",
        name: "\u041B\u043E\u043C\u0430\u0442\u044C \u043D\u0435 \u0441\u0442\u0440\u043E\u0438\u0442\u044C",
        center: new mp.Vector3(336.42, 2874.33, 78.01),
        range: 150,
        dimension: 0,
        poly: [
            [
                [261.22, 2800, 43.8],
                [248.29, 2892.2, 43.27],
                [321.98, 2924.06, 41.87],
                [390.34, 2932.82, 40.76],
                [415.66, 2905.4, 41.27],
                [402.48, 2867.1, 41.55],
                [369.93, 2829.46, 50.04],
                [261.22, 2800, 43.8]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "POST_PB",
        name: "\u041F\u043E\u0447\u0442\u0430 \u041F\u0430\u043B\u0435\u0442\u043E-\u0411\u044D\u0439",
        center: new mp.Vector3(-418.41, 6154.99, 41.8),
        range: 50,
        dimension: 0,
        poly: [
            [
                [-426.89, 6119.26, 32.3],
                [-450.86, 6143.32, 31.8],
                [-434.38, 6159.8, 31.9],
                [-437.51, 6162.8, 32.04],
                [-413.57, 6186.82, 31.53],
                [-389.72, 6163.16, 31.79],
                [-391.32, 6155.57, 32.18],
                [-426.89, 6119.26, 32.3]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "POST_LS",
        name: "\u041F\u043E\u0447\u0442\u0430 \u041B\u043E\u0441-\u0421\u0430\u043D\u0442\u043E\u0441",
        center: new mp.Vector3(98.9, 119.24, 124.11),
        range: 60,
        dimension: 0,
        poly: [
            [
                [50.55, 111.35, 83.18],
                [60.65, 135.88, 80.27],
                [47.23, 141.19, 81.64],
                [52.55, 156.08, 82.06],
                [58.16, 158.3, 80.53],
                [72.7, 160.56, 81.93],
                [89.2, 153.89, 80.78],
                [97.9, 145.85, 81.06],
                [92.63, 127.18, 80.72],
                [92.24, 110.11, 79.75],
                [89.47, 98.57, 80.84],
                [50.55, 111.35, 83.18]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTMEATSTART1",
        name: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043C\u044F\u0441\u0430 1",
        center: new mp.Vector3(178.11, 6390.05, 31.91),
        range: 40,
        dimension: 0,
        poly: [
            [
                [183.54, 6381.47, 31.96],
                [196.48, 6388.15, 31.49],
                [185.68, 6408.06, 31.17],
                [172.91, 6401.47, 31.36],
                [183.54, 6381.47, 31.96]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTMEATSTART2",
        name: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043C\u044F\u0441\u0430 2",
        center: new mp.Vector3(143.68, 6368.12, 31.72),
        range: 40,
        dimension: 0,
        poly: [
            [
                [136.63, 6386.51, 31.34],
                [124.72, 6379.78, 31.19],
                [140.33, 6350.56, 31.33],
                [152.38, 6357.2, 32.02],
                [136.63, 6386.51, 31.34]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTMEATSTART3",
        name: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043C\u044F\u0441\u0430 3",
        center: new mp.Vector3(-60.48, 6279.55, 32.83),
        range: 40,
        dimension: 0,
        poly: [
            [
                [-42.73, 6276.77, 31.37],
                [-51.48, 6287.14, 32.34],
                [-58.55, 6288.85, 32.06],
                [-64.82, 6287.87, 31.76],
                [-74.48, 6280.33, 31.5],
                [-62.31, 6264.9, 31.04],
                [-42.73, 6276.77, 31.37]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTMEATSTART4",
        name: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043C\u044F\u0441\u0430 4",
        center: new mp.Vector3(-126.07, 6215.01, 32.26),
        range: 40,
        dimension: 0,
        poly: [
            [
                [-97.84, 6223.31, 31.66],
                [-121.48, 6198.73, 31.41],
                [-143.57, 6219.16, 31.17],
                [-119.28, 6244.08, 31.21],
                [-97.84, 6223.31, 31.66]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "VELORENT",
        name: "\u0410\u0440\u0435\u043D\u0434\u0430 \u0432\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434\u043E\u0432 \u043D\u0430 \u043F\u043B\u044F\u0436\u0435",
        center: new mp.Vector3(-1266.48, -1479.2, 4.96),
        range: 40,
        dimension: 0,
        poly: [
            [
                [-1286.14, -1476.23, 4.34],
                [-1266.59, -1503.58, 5.01],
                [-1240.22, -1485.26, 4.27],
                [-1257.84, -1460.55, 4.25],
                [-1286.14, -1476.23, 4.34]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "AUTORENTLS",
        name: "\u0410\u0440\u0435\u043D\u0434\u0430 \u0430\u0432\u0442\u043E \u0412\u0430\u0439\u043D\u0432\u0443\u0434",
        center: new mp.Vector3(-516.36, 47.65, 57.13),
        range: 60,
        dimension: 0,
        poly: [
            [
                [-542.15, 72.74, 54.96],
                [-488.1, 70.25, 53.25],
                [-491.4, 32.03, 52.75],
                [-514.42, 33.74, 52.42],
                [-516.3, 25.22, 52.22],
                [-547.45, 27.13, 52.23],
                [-542.15, 72.74, 54.96]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "AMPHI1",
        name: "\u0410\u043C\u0444\u0438\u0442\u0435\u0430\u0442\u0440 1",
        center: new mp.Vector3(658.34, 585.13, 154.77),
        range: 180,
        dimension: 0,
        poly: [
            [
                [735.24, 447.78, 145.37],
                [734.59, 543.43, 127.07],
                [765.02, 627.96, 126.75],
                [735.62, 638.97, 130.87],
                [742.48, 660.27, 130.36],
                [650.4, 693.59, 130.36],
                [641.01, 667.94, 130.36],
                [597.2, 656.03, 130.36],
                [576.97, 600.88, 130.19],
                [650.46, 574.32, 130.18],
                [639.95, 454.68, 145.39],
                [565.4, 509.43, 145.39],
                [735.24, 447.78, 145.37]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "AMPHI2",
        name: "\u0410\u043C\u0444\u0438\u0442\u0435\u0430\u0442\u0440 2",
        center: new mp.Vector3(191.71, 1148.59, 241.75),
        range: 180,
        dimension: 0,
        poly: [
            [
                [160.79, 1091.57, 232.4],
                [201.56, 1115.88, 226.79],
                [263.54, 1131.14, 221.15],
                [252.14, 1166.57, 224.41],
                [237.15, 1264.73, 233.08],
                [157.71, 1245.32, 229.38],
                [175.84, 1198.24, 227.14],
                [131.49, 1213.78, 232.76],
                [125.59, 1189.65, 232.36],
                [125.79, 1155.87, 232.06],
                [134.93, 1124.5, 232.45],
                [160.79, 1091.57, 232.4]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "LS_CHAPEL",
        name: "\u0426\u0435\u0440\u043A\u043E\u0432\u044C \u041B\u043E\u0441-\u0421\u0430\u043D\u0442\u043E\u0441",
        center: new mp.Vector3(-783.28, 25.05, 68.27),
        range: 100,
        dimension: 0,
        poly: [
            [
                [191.71, 1148.59, 241.75],
                [-829.16, 3.87, 42.32],
                [-838.72, 20.44, 43.8],
                [-857.44, 69.42, 52.03],
                [-859.39, 81.46, 52.05],
                [-835.43, 85.66, 52.54],
                [-802.15, 95.94, 53.88],
                [-757.88, 102.42, 55.8],
                [-749.17, 102.35, 55.82],
                [-748.93, 65.05, 53.44],
                [-744.41, 38.52, 44.85],
                [-737.11, 16.3, 39.22],
                [-717.38, -22.84, 37.88],
                [191.71, 1148.59, 241.75]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "PB_CHAPEL",
        name: "\u0426\u0435\u0440\u043A\u043E\u0432\u044C \u041F\u0430\u043B\u0435\u0442\u043E-\u0411\u044D\u0439",
        center: new mp.Vector3(-312.89, 6154.8, 45.48),
        range: 80,
        dimension: 0,
        poly: [
            [
                [-332.26, 6198.64, 31.38],
                [-287.57, 6153.36, 32.79],
                [-323.63, 6115.65, 33.64],
                [-369.95, 6162.35, 31.4],
                [-332.26, 6198.64, 31.38]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "FISHSHOPRENTSS",
        name: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0440\u044B\u0431\u043E\u043B\u043E\u0432\u043D\u044B\u0445 \u0441\u043D\u0430\u0441\u0442\u0435\u0439",
        center: new mp.Vector3(1519.54, 3808.35, 55.27),
        range: 170,
        dimension: 0,
        poly: [
            [
                [1619.48, 3822.45, 34.93],
                [1569.94, 3781.47, 34.64],
                [1513.11, 3742.74, 34.4],
                [1467.17, 3719.04, 33.95],
                [1427.38, 3702.86, 33.85],
                [1396.47, 3778.66, 31.62],
                [1418.25, 3854.53, 31.94],
                [1473.83, 3928.46, 32.42],
                [1550.91, 3922.66, 31.78],
                [1662.7, 3866.53, 34.79],
                [1619.48, 3822.45, 34.93]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FARM1ORANGE1",
        name: "\u0424\u0435\u0440\u043C\u0430",
        center: new mp.Vector3(2361.58, 5009.26, 55.81),
        range: 120,
        dimension: 0,
        poly: [
            [
                [2406.45, 5001.1, 47.99],
                [2340.74, 4926.47, 42.01],
                [2257.17, 5006.22, 42.64],
                [2328.59, 5079.29, 45.59],
                [2406.45, 5001.1, 47.99]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "FARM2MAIN",
        name: "\u0424\u0435\u0440\u043C\u0430",
        center: new mp.Vector3(2271.16, 4882.53, 79),
        range: 150,
        dimension: 0,
        poly: [
            [
                [2379.34, 4896.18, 41.86],
                [2279.78, 4796.07, 38.35],
                [2231.5, 4810.07, 39.53],
                [2144.54, 4893.23, 39.98],
                [2261.18, 5010.36, 42.79],
                [2379.34, 4896.18, 41.86]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "FARM3ORANGE2",
        name: "\u0424\u0435\u0440\u043C\u0430",
        center: new mp.Vector3(2061.12, 4837.7, 64.98),
        range: 170,
        dimension: 0,
        poly: [
            [
                [2176.59, 4757.17, 41.08],
                [2195.4, 4859.95, 44.79],
                [2187.84, 4881.77, 42.49],
                [2137.07, 4934.85, 40.94],
                [1965.58, 4766.93, 41.74],
                [2039.57, 4674.97, 40.57],
                [2107.5, 4738.18, 41.11],
                [2134.77, 4757.85, 41.05],
                [2176.59, 4757.17, 41.08]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "FARM4FIELDS",
        name: "\u0424\u0435\u0440\u043C\u0430",
        center: new mp.Vector3(2192.73, 5138.38, 74.42),
        range: 240,
        dimension: 0,
        poly: [
            [
                [2180.67, 4909.39, 40.84],
                [1975.03, 5131.83, 43.1],
                [2040.13, 5185, 51.03],
                [2075.49, 5206.84, 55.4],
                [2144.43, 5219.79, 59.2],
                [2187.86, 5211.58, 61.14],
                [2270.83, 5176.03, 60.04],
                [2296.63, 5177.6, 59.83],
                [2375.99, 5102.1, 47.3],
                [2180.67, 4909.39, 40.84]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "FISHBUYER1",
        name: "\u0421\u043A\u0443\u043F\u0449\u0438\u043A \u0440\u044B\u0431\u044B 1",
        center: new mp.Vector3(1552.58, 2186.04, 94.46),
        range: 60,
        dimension: 0,
        poly: [
            [
                [1539.71, 2207.37, 78.32],
                [1539.97, 2150.57, 79.06],
                [1571.03, 2143.54, 79.8],
                [1573.26, 2207.13, 78.92],
                [1539.71, 2207.37, 78.32]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FISHBUYER2",
        name: "\u0421\u043A\u0443\u043F\u0449\u0438\u043A \u0440\u044B\u0431\u044B 2",
        center: new mp.Vector3(-271.66, 2210.25, 137.83),
        range: 70,
        dimension: 0,
        poly: [
            [
                [-229.67, 2199.67, 127.05],
                [-277.72, 2225.45, 130.2],
                [-289.3, 2200, 129.74],
                [-257.04, 2176.66, 131.01],
                [-229.67, 2199.67, 127.05]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CASINO",
        name: "\u041A\u0430\u0437\u0438\u043D\u043E",
        center: new mp.Vector3(1085.04, 66.73, 158.2),
        range: 330,
        dimension: 0,
        poly: [
            [
                [804.87, -48.11, 80.62],
                [842.6, -80.73, 80.64],
                [922.12, -131.33, 76.18],
                [989.25, -71.37, 81.42],
                [1024.57, -100.27, 82.88],
                [1073.18, -102.31, 84.56],
                [1092.87, -111.84, 82.27],
                [1277.91, 183.23, 84.37],
                [1317.25, 315.48, 85.3],
                [1217.28, 377.79, 85.75],
                [1144.69, 261.18, 81.99],
                [1116.29, 274.75, 81.22],
                [1062.22, 251.74, 80.99],
                [1025.1, 192.35, 80.99],
                [1009.88, 201.08, 80.92],
                [875.46, 39.2, 78.57],
                [826.54, -12.35, 80.66],
                [804.87, -48.11, 80.62]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "OFFICE_MBB",
        name: "Maze Bank Building",
        center: new mp.Vector3(-69.46, -829.04, 98.62),
        range: 130,
        dimension: 0,
        poly: [
            [
                [-46.31, -929.74, 29.2],
                [8.75, -780.92, 46.31],
                [-111.9, -729.99, 34.69],
                [-167.27, -884.44, 29.19],
                [-46.31, -929.74, 29.2]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "OFFICE_ARC",
        name: "Arcadius",
        center: new mp.Vector3(-155.66, -592.24, 81.98),
        range: 120,
        dimension: 0,
        poly: [
            [
                [-76.39, -542.66, 40.03],
                [-128.99, -693.45, 34.7],
                [-241.44, -652.81, 33.18],
                [-208.5, -562.45, 34.47],
                [-76.39, -542.66, 40.03]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "OFFICE_MBW",
        name: "Maze Bank West",
        center: new mp.Vector3(-1383.96, -476.62, 54.95),
        range: 90,
        dimension: 0,
        poly: [
            [
                [-1377.2, -545.47, 30.12],
                [-1444.9, -447, 35.4],
                [-1386.31, -410.79, 36.52],
                [-1319.53, -504.63, 33.08],
                [-1377.2, -545.47, 30.12]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "OFFICE_LOM",
        name: "Lom Bank",
        center: new mp.Vector3(-1578.96, -575.11, 58.63),
        range: 70,
        dimension: 0,
        poly: [
            [
                [-1637.62, -581.14, 33.69],
                [-1559.99, -519.32, 35.59],
                [-1522.61, -567.31, 33.32],
                [-1592.89, -618.26, 31.03],
                [-1637.62, -581.14, 33.69]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "OFFICE_RHBC",
        name: "Rockford Hills BC",
        center: new mp.Vector3(-1030.05, -415.75, 57.01),
        range: 70,
        dimension: 0,
        poly: [
            [
                [-1085.29, -401.14, 36.56],
                [-1010.43, -362.62, 37.77],
                [-973.76, -432.65, 37.73],
                [-1024.41, -459.15, 36.89],
                [-1035.76, -462.18, 36.78],
                [-1046.95, -460.31, 36.53],
                [-1057.21, -453.91, 36.47],
                [-1065.56, -441.13, 36.48],
                [-1085.29, -401.14, 36.56]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "OFFICE_TBBC",
        name: "Total Bankers BC",
        center: new mp.Vector3(-588.4, -712.77, 64.1),
        range: 80,
        dimension: 0,
        poly: [
            [
                [-554.31, -669.64, 33.17],
                [-552.99, -705.64, 33.13],
                [-547.26, -723.63, 32.93],
                [-541.02, -734.39, 32.68],
                [-522.71, -758.28, 31.96],
                [-627.35, -758.79, 26.16],
                [-626.53, -670.41, 31.63],
                [-554.31, -669.64, 33.17]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "STARTING_ZONE1",
        name: "\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u0430\u044F \u0437\u043E\u043D\u0430",
        center: new mp.Vector3(-191.84, -785.26, 45.74),
        range: 120,
        dimension: 0,
        poly: [
            [
                [-105.59, -732.35, 34.78],
                [-220.46, -691.94, 33.48],
                [-277.86, -846.24, 31.63],
                [-154.94, -889.33, 29.3],
                [-105.59, -732.35, 34.78]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "STARTING_ZONE2",
        name: "\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u0430\u044F \u0437\u043E\u043D\u0430",
        center: new mp.Vector3(-1009.53, -1502.74, 19.63),
        range: 80,
        dimension: 0,
        poly: [
            [
                [-1058.83, -1509.08, 5.16],
                [-995.06, -1463.82, 4.97],
                [-961.92, -1514.6, 5.19],
                [-1024.22, -1558.33, 5.16],
                [-1058.83, -1509.08, 5.16]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FISHINGPIERS1",
        name: "\u0420\u044B\u0431\u043E\u043B\u043E\u0432\u043D\u044B\u0439 \u043F\u0438\u0440\u0441",
        center: new mp.Vector3(-1793.28, -1179.44, 55.73),
        range: 100,
        dimension: 0,
        poly: [
            [
                [-1748.51, -1109.27, 13.21],
                [-1733.59, -1122.01, 13.33],
                [-1790.97, -1190.11, 13.22],
                [-1780.81, -1198.37, 13.02],
                [-1801.08, -1241.69, 8.86],
                [-1826.29, -1272.18, 8.62],
                [-1867.9, -1237.42, 8.63],
                [-1860.73, -1230.09, 8.34],
                [-1881.06, -1213.91, 12.47],
                [-1832.1, -1154.94, 12.36],
                [-1806.35, -1177.4, 12.61],
                [-1748.51, -1109.27, 13.21]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FISHINGPIERS2",
        name: "\u0420\u044B\u0431\u043E\u043B\u043E\u0432\u043D\u044B\u0439 \u043F\u0438\u0440\u0441",
        center: new mp.Vector3(-3334.67, 960.74, 38.58),
        range: 100,
        dimension: 0,
        poly: [
            [
                [-3233.08, 956.06, 14.23],
                [-3238.86, 954.52, 13.53],
                [-3240.72, 965.12, 13.22],
                [-3257.25, 963.79, 9.75],
                [-3261.21, 951.7, 11.15],
                [-3284, 951.61, 10.08],
                [-3284.11, 963.73, 9.11],
                [-3408.31, 951.39, 8.91],
                [-3428.91, 951, 9.47],
                [-3429.3, 984, 9.01],
                [-3407.98, 984.4, 10.63],
                [-3334.51, 971.55, 8.17],
                [-3284.57, 971.32, 8.66],
                [-3284.36, 984.24, 8.59],
                [-3260.83, 983.81, 9.04],
                [-3235.91, 982.92, 12.69],
                [-3233.08, 956.06, 14.23]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FISHINGPIERS3",
        name: "\u0417\u043E\u043D\u0430 \u0440\u044B\u0431\u0430\u043B\u043A\u0438",
        center: new mp.Vector3(3497.94, 2575.24, 31.19),
        range: 95,
        dimension: 0,
        poly: null,
        isHard: !0
    }), new GreenZone({
        uId: "PIERSDELPERRO",
        name: "\u041F\u0438\u0440\u0441 \u0414\u0435\u043B\u044C-\u041F\u0435\u0440\u0440\u043E",
        center: new mp.Vector3(-1621.49, -978.2, 60.97),
        range: 200,
        dimension: 0,
        poly: [
            [
                [-1750.79, -1112.24, 12.96],
                [-1671.48, -1017.93, 7.42],
                [-1689.07, -1001.14, 7.14],
                [-1673.17, -982.23, 7.34],
                [-1668.09, -963.66, 7.69],
                [-1706.64, -951.57, 7.71],
                [-1732.23, -911.83, 7.7],
                [-1733.53, -897.08, 7.7],
                [-1656.47, -808.67, 10.19],
                [-1561.85, -890.63, 20.18],
                [-1572.49, -904.12, 17.91],
                [-1562.11, -913.26, 18.75],
                [-1535.45, -949.07, 13.35],
                [-1532.01, -969.4, 12.96],
                [-1515.73, -982.79, 13.21],
                [-1675.78, -1173.83, 13.32],
                [-1750.79, -1112.24, 12.96]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "GYM1BEACH",
        name: "\u0421\u043F\u043E\u0440\u0442\u0437\u0430\u043B",
        center: new mp.Vector3(-1206.32, -1574.44, 9.17),
        range: 40,
        dimension: 0,
        poly: [
            [
                [-1237.34, -1561.93, 4.2],
                [-1204.38, -1538.9, 4.34],
                [-1175.27, -1580.62, 4.33],
                [-1208.43, -1603.92, 4.18],
                [-1237.34, -1561.93, 4.2]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "AUCTIONHOUSE",
        name: "\u0410\u0443\u043A\u0446\u0438\u043E\u043D",
        center: new mp.Vector3(-561.53, -600.3, 63.37),
        range: 100,
        dimension: 0,
        poly: [
            [
                [-502.36, -652.95, 33.1],
                [-626.95, -652.77, 31.71],
                [-627.08, -570.02, 35.05],
                [-501.86, -569.98, 35.54],
                [-502.36, -652.95, 33.1]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "DRIFTTRACKCASINO",
        name: "\u0414\u0440\u0438\u0444\u0442-\u0442\u0440\u0430\u0441\u0441\u0430",
        center: new mp.Vector3(-3e3, -3e3, 100),
        range: 275,
        dimension: 0,
        poly: null,
        isHard: !0
    }), new GreenZone({
        uId: "CARTING",
        name: "\u041A\u0430\u0440\u0442\u0438\u043D\u0433",
        center: new mp.Vector3(-3e3, -3e3, 100),
        range: 275,
        dimension: 7e3,
        poly: null,
        isHard: !0
    }), new GreenZone({
        uId: "NCLUB_RM",
        name: "Vanilla Unicorn",
        center: new mp.Vector3(137.19, -1296.39, 47.86),
        range: 90,
        dimension: 0,
        poly: [
            [
                [101.91, -1344.08, 29.36],
                [66.68, -1284.24, 29.34],
                [80.15, -1275.82, 29.02],
                [115.84, -1273.58, 29.2],
                [144.12, -1256.42, 29.21],
                [164.9, -1291.86, 29.33],
                [154.39, -1315.59, 29.2],
                [149.86, -1324.32, 29.22],
                [134.42, -1314.17, 29.83],
                [130.22, -1316.58, 29.56],
                [129.04, -1322.93, 29.02],
                [101.91, -1344.08, 29.36]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "NCLUB_LCN",
        name: "Bahama Mamas",
        center: new mp.Vector3(-1390.14, -600.91, 46.17),
        range: 60,
        dimension: 0,
        poly: [
            [
                [-1377.63, -566.32, 30.23],
                [-1346.61, -615.45, 29.19],
                [-1389.66, -642.9, 29.16],
                [-1424.87, -588.45, 30.64],
                [-1377.63, -566.32, 30.23]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "NCLUB_AM",
        name: "Split Sides West",
        center: new mp.Vector3(-432.56, 263.83, 105.49),
        range: 70,
        dimension: 0,
        poly: [
            [
                [-467.29, 250.11, 83.22],
                [-462.41, 306.38, 83.67],
                [-404.28, 301.48, 84.81],
                [-409.84, 242.56, 83.4],
                [-467.29, 250.11, 83.22]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "NCLUB_MM",
        name: "Galaxy",
        center: new mp.Vector3(-25.61, 222.75, 118.64),
        range: 70,
        dimension: 0,
        poly: [
            [
                [28.16, 249.97, 109.59],
                [2.1, 179.28, 99.88],
                [-63.48, 201.46, 102.82],
                [-63.9, 252.41, 103.13],
                [-32.89, 256.48, 106.77],
                [-14.92, 257.3, 108.36],
                [7.05, 255.09, 109.45],
                [28.16, 249.97, 109.59]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "NCLUB_YAK",
        name: "Orient",
        center: new mp.Vector3(300.3, 203.71, 139.6),
        range: 70,
        dimension: 0,
        poly: [
            [
                [343.69, 258.71, 114.51],
                [308.89, 164.11, 103.93],
                [269.61, 178.56, 104.7],
                [298.93, 257.62, 122.75],
                [343.69, 258.71, 114.51]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "NCLUB_CASINO",
        name: "\u041A\u043B\u0443\u0431 Diamond",
        center: new mp.Vector3(1564.17, 248.72, -46.01),
        range: 30,
        dimension: 0,
        poly: null,
        isHard: !1
    }), new GreenZone({
        uId: "BUSPARK1",
        name: "\u0410\u0432\u0442\u043E\u0431\u0443\u0441\u043D\u0430\u044F \u0441\u0442\u0430\u043D\u0446\u0438\u044F 1",
        center: new mp.Vector3(-800.68, -2391.37, 35.19),
        range: 115,
        dimension: 0,
        poly: [
            [
                [-728.1, -2392.24, 14.61],
                [-753.58, -2424.73, 14.62],
                [-782.02, -2474.44, 14.07],
                [-804.65, -2461.4, 14.69],
                [-842.7, -2365.5, 14.65],
                [-838.23, -2322.09, 15.55],
                [-821.17, -2330.89, 14.96],
                [-810.34, -2311.01, 13.15],
                [-728.1, -2392.24, 14.61]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "BUSPARK2",
        name: "\u0410\u0432\u0442\u043E\u0431\u0443\u0441\u043D\u0430\u044F \u0441\u0442\u0430\u043D\u0446\u0438\u044F 2",
        center: new mp.Vector3(-2170.47, -403.12, 26.26),
        range: 80,
        dimension: 0,
        poly: [
            [
                [-2117.11, -380.89, 12.88],
                [-2142.66, -424.39, 11.35],
                [-2178.91, -432.26, 11.35],
                [-2200.9, -420.72, 12.58],
                [-2193.71, -411.2, 13.77],
                [-2238.02, -381.25, 15.17],
                [-2236.26, -357.43, 14.48],
                [-2180.19, -362.16, 13.98],
                [-2146.11, -369.82, 13.21],
                [-2117.11, -380.89, 12.88]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "MARKET1",
        name: "\u0420\u044B\u043D\u043E\u043A \u043D\u0430 \u043F\u043B\u044F\u0436\u0435",
        center: new mp.Vector3(-1145.6, -1707.22, 14.83),
        range: 60,
        dimension: 0,
        poly: [
            [
                [-1134.26, -1653.72, 4.42],
                [-1093.56, -1711.67, 4.37],
                [-1169.72, -1765.3, 3.94],
                [-1208.11, -1709.87, 4.46],
                [-1134.26, -1653.72, 4.42]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "REALESTATE",
        name: "\u0420\u0438\u0435\u043B\u0442\u043E\u0440\u0441\u043A\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E",
        center: new mp.Vector3(-1031.49, -1392.04, 31.24),
        range: 100,
        dimension: 0,
        poly: [
            [
                [-1007.34, -1432.19, 5.06],
                [-1013.44, -1440.53, 5.06],
                [-1041.69, -1451.69, 5.06],
                [-1075.03, -1474.25, 5.03],
                [-1082.2, -1462.93, 5.12],
                [-1085.36, -1441.49, 5.07],
                [-1081.63, -1415.51, 5.06],
                [-1053.51, -1318.44, 5.51],
                [-1043.59, -1301.19, 5.85],
                [-1033.13, -1310.01, 6.3],
                [-1021.47, -1331.8, 7.55],
                [-1014.4, -1336.98, 7.75],
                [-998.3, -1364.7, 5.09],
                [-1006.39, -1367.98, 5.16],
                [-1016.18, -1407.16, 5.27],
                [-1007.34, -1432.19, 5.06]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "HANDLINGSHOP",
        name: "\u0410\u0432\u0442\u043E\u043C\u0430\u0441\u0442\u0435\u0440\u0441\u043A\u0430\u044F",
        center: new mp.Vector3(105.68, 6630.52, 51.82),
        range: 50,
        dimension: 0,
        poly: [
            [
                [93.2, 6622.08, 31.5],
                [116.29, 6598.83, 32.01],
                [142, 6620.79, 31.76],
                [117.18, 6646.16, 31.58],
                [93.2, 6622.08, 31.5]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "BOATSHOP",
        name: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u043B\u043E\u0434\u043E\u043A",
        center: new mp.Vector3(-809.43, -1360.92, 16.6),
        range: 50,
        dimension: 0,
        poly: [
            [
                [-767.46, -1355.99, 5.09],
                [-812.67, -1409.73, 5.39],
                [-849.59, -1310.61, 5.15],
                [-790.93, -1312.96, 5.05],
                [-767.46, -1355.99, 5.09]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "CLUB_LOSTMC",
        name: "\u041C\u043E\u0442\u043E\u043A\u043B\u0443\u0431 Lost",
        center: new mp.Vector3(973.47, -122.13, 86.3),
        range: 60,
        dimension: 0,
        poly: [
            [
                [986.35, -156.35, 74.99],
                [948.19, -133.14, 75.48],
                [936.68, -117.7, 75.77],
                [980.95, -75.83, 76.23],
                [1022.49, -120.43, 76.05],
                [986.35, -156.35, 74.99]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "CLUB_AODMC",
        name: "\u041C\u043E\u0442\u043E\u043A\u043B\u0443\u0431 Angels of Death",
        center: new mp.Vector3(1992.92, 3047.04, 62.04),
        range: 60,
        dimension: 0,
        poly: [
            [
                [1993.62, 3088.45, 46.99],
                [2024.47, 3069.58, 47.23],
                [1989.3, 3013.45, 49.33],
                [1959.05, 3032.02, 50.35],
                [1993.62, 3088.45, 46.99]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "CLUB_BANDIDOSMC",
        name: "\u041C\u043E\u0442\u043E\u043A\u043B\u0443\u0431 Bandidos",
        center: new mp.Vector3(-2195.26, 4252.83, 71.78),
        range: 80,
        dimension: 0,
        poly: [
            [
                [-2197.43, 4311.44, 48.98],
                [-2160.22, 4290.31, 50.54],
                [-2173.7, 4255.13, 49.23],
                [-2217.44, 4218.65, 47.69],
                [-2232.98, 4217.03, 47.33],
                [-2232.31, 4228.33, 46.67],
                [-2223.95, 4245.27, 46.68],
                [-2224.73, 4250.49, 45.73],
                [-2232.47, 4250.81, 45.66],
                [-2203.64, 4299.5, 48.36],
                [-2197.43, 4311.44, 48.98]
            ]
        ],
        isHard: !1
    }), new GreenZone({
        uId: "TK",
        name: "\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u044B\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441",
        center: new mp.Vector3(600.43, -436.68, 28.44),
        range: 35,
        dimension: 0,
        poly: [
            [
                [622.2, -407.99, 26.03],
                [586.43, -403.2, 25.74],
                [578.8, -466.76, 26.24],
                [614.85, -471.13, 25.89],
                [622.2, -407.99, 26.03]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "SMUGGLEOCEAN",
        name: "\u041A\u043E\u043D\u0442\u0440\u0430\u0431\u0430\u043D\u0434\u0430 - \u041F\u0430\u043B\u043E\u043C\u0438\u043D\u043E",
        center: new mp.Vector3,
        range: 30,
        dimension: 0,
        poly: [
            [
                [2788.22, -773.85, 8.33],
                [2829.69, -770.2, 4.55],
                [2830.56, -726.16, 3.02],
                [2790.34, -718.93, 9.56],
                [2788.22, -773.85, 8.33]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FIRESTATION1",
        name: "\u041F\u043E\u0436\u0430\u0440\u043D\u0430\u044F \u0441\u0442\u0430\u043D\u0446\u0438\u044F 1",
        center: new mp.Vector3(200.02, -1653.36, 46.15),
        range: 60,
        dimension: 0,
        poly: [
            [
                [240.04, -1650.47, 29.35],
                [220.15, -1673.69, 31.65],
                [205.43, -1685.45, 30.49],
                [169.42, -1659.81, 31],
                [204.52, -1616.88, 29.2],
                [240.04, -1650.47, 29.35]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FIRESTATION2",
        name: "\u041F\u043E\u0436\u0430\u0440\u043D\u0430\u044F \u0441\u0442\u0430\u043D\u0446\u0438\u044F 2",
        center: new mp.Vector3(1203.3, -1486.39, 50.45),
        range: 75,
        dimension: 0,
        poly: [
            [
                [1243.57, -1453.06, 34.94],
                [1242.32, -1506.65, 38.39],
                [1163.2, -1506.61, 34.69],
                [1162.75, -1447.83, 34.74],
                [1201.81, -1447.87, 35.07],
                [1222.73, -1453.06, 34.82],
                [1243.57, -1453.06, 34.94]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FIRESTATION3",
        name: "\u041F\u043E\u0436\u0430\u0440\u043D\u0430\u044F \u0441\u0442\u0430\u043D\u0446\u0438\u044F 3",
        center: new mp.Vector3(1687.48, 3600.2, 45.04),
        range: 60,
        dimension: 0,
        poly: [
            [
                [1688.07, 3572.46, 35.57],
                [1668.93, 3605.34, 37.63],
                [1704.73, 3628.09, 35.06],
                [1724.61, 3594.31, 35.25],
                [1688.07, 3572.46, 35.57]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FIRESTATION4",
        name: "\u041F\u043E\u0436\u0430\u0440\u043D\u0430\u044F \u0441\u0442\u0430\u043D\u0446\u0438\u044F 4",
        center: new mp.Vector3(-364.2, 6102.89, 42.28),
        range: 70,
        dimension: 0,
        poly: [
            [
                [-406.66, 6117.84, 31.35],
                [-366.56, 6157.13, 31.4],
                [-328.42, 6119.11, 32.98],
                [-373.65, 6073.79, 34.19],
                [-378.17, 6078.46, 33.77],
                [-392.96, 6103.99, 34.16],
                [-406.66, 6117.84, 31.35]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "DRIVERSCHOOL",
        name: "\u0410\u0432\u0442\u043E\u0448\u043A\u043E\u043B\u0430",
        center: new mp.Vector3(202.2, 381.5, 120.42),
        range: 75,
        dimension: 0,
        poly: [
            [
                [170.87, 371.78, 109.45],
                [194.7, 368.91, 107.45],
                [252.87, 349.32, 105.36],
                [261.61, 379.43, 105.91],
                [226.68, 391.18, 110.45],
                [166.3, 404.69, 114.17],
                [170.87, 371.78, 109.45]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "FURNSHOP",
        name: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u043C\u0435\u0431\u0435\u043B\u0438",
        center: new mp.Vector3(2770.51, 3416.01, 55.96),
        range: 130,
        dimension: 0,
        poly: [
            [
                [2770.51, 3416.01, 55.96],
                [2629.49, 3474.17, 55.13],
                [2661.7, 3559.32, 50.57],
                [2768.86, 3525.33, 54.3],
                [2813.74, 3508.82, 54.6],
                [2770.51, 3416.01, 55.96]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "HUNTEND",
        name: "\u0421\u043A\u0443\u043F\u0449\u0438\u043A \u0448\u043A\u0443\u0440",
        center: new mp.Vector3(2033.84, 3182.17, 45.4),
        range: 40,
        dimension: 0,
        poly: null,
        isHard: !0
    }), new GreenZone({
        uId: "CONTRACTLWMSTART",
        name: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u0441\u0442\u0430\u043D\u0446\u0438\u044F",
        center: new mp.Vector3(686.72, 131.39, 84.04),
        range: 90,
        dimension: 0,
        poly: [
            [
                [651.3, 87.28, 97.17],
                [686.63, 88.12, 97.71],
                [738.83, 97.1, 80.38],
                [752.07, 116.08, 78.41],
                [761.1, 131.03, 78.52],
                [763.86, 135.74, 79.35],
                [764.82, 145.32, 80.04],
                [763.21, 151.89, 80.82],
                [754.01, 165.5, 82.35],
                [735.82, 179.62, 84.67],
                [680.07, 202.58, 92.81],
                [639.55, 90.98, 98.26],
                [651.3, 87.28, 97.17]
            ]
        ],
        isHard: !0
    }), new GreenZone({
        uId: "MBA",
        name: "Maze Bank Arena",
        center: new mp.Vector3(-315.35, -1970.73, 73.1),
        range: 200,
        dimension: 0,
        poly: [
            [
                [-277.96, -2103.6, 27.76],
                [-247.22, -2111.19, 27.67],
                [-229.7, -2103.42, 28.43],
                [-213.69, -2092.03, 28.01],
                [-199.12, -2077.66, 28.03],
                [-181.73, -2052.8, 27.79],
                [-170.34, -2023.07, 27.81],
                [-168.38, -2015.14, 27.94],
                [-166.32, -1999.64, 27.83],
                [-166.11, -1980.12, 27.63],
                [-169.02, -1959.12, 27.73],
                [-174.89, -1939.63, 27.83],
                [-186.54, -1916.06, 28.52],
                [-194.54, -1920.59, 28.13],
                [-210.34, -1900.26, 28.27],
                [-268.89, -1850.25, 28.91],
                [-296.71, -1852.37, 26.46],
                [-318.32, -1848.57, 25.75],
                [-323.31, -1867.13, 30.08],
                [-352.93, -1863.21, 29.37],
                [-383.22, -1871.24, 28.77],
                [-410.48, -1890.88, 28.58],
                [-428.27, -1920.12, 28.83],
                [-432.69, -1957.54, 28.63],
                [-422.39, -1990.59, 28.81],
                [-414.71, -2002.21, 28.6],
                [-405.77, -2011.74, 30.12],
                [-352.71, -2056.44, 29.15],
                [-327.24, -2069.53, 28.63],
                [-284.62, -2072.08, 28.73],
                [-277.96, -2103.6, 27.76]
            ]
        ],
        isHard: !0,
        onEnterEvent: () => {
            global.smartphoneBrowser.execute(`
            UI_smartphoneNotify('app_mp_ico.png', 'MazeBank Arena', 'Откройте приложение в телефоне чтобы участвовать на арене');
        `)
        }
    }), new GreenZone({
        uId: "DEMORGAN",
        name: "\u0414\u0435\u043C\u043E\u0440\u0433\u0430\u043D",
        center: new mp.Vector3(1739.225, 2583.68, 45.67),
        range: 55,
        dimension: 9999,
        poly: null,
        isHard: !0
    });
    const _disableControlAction = mp.game.controls.disableControlAction;
    mp.events.add("render", () => {
        localPlayer.setStealthMovement(!1, "0"), _disableControlAction(0, 37, !0), _disableControlAction(0, 7, !0), _disableControlAction(0, 45, !0), _disableControlAction(0, 140, !0), _disableControlAction(0, 99, !0), _disableControlAction(0, 100, !0), _disableControlAction(0, 115, !0), _disableControlAction(0, 116, !0), _disableControlAction(0, 345, !0), _disableControlAction(0, 346, !0), _disableControlAction(0, 347, !0), (playerCuffStatus || global.isPlayerUseAnim) && (_disableControlAction(0, 21, !0), _disableControlAction(0, 22, !0), _disableControlAction(0, 23, !0), _disableControlAction(0, 24, !0), _disableControlAction(0, 91, !0), _disableControlAction(0, 92, !0), _disableControlAction(0, 142, !0), _disableControlAction(0, 257, !0)), 0 !== playerInGreenZone && 101631238 !== currentWeapon && 911657153 !== currentWeapon && (_disableControlAction(0, 24, !0), _disableControlAction(0, 141, !0), _disableControlAction(0, 257, !0), _disableControlAction(0, 68, !0), _disableControlAction(0, 69, !0), _disableControlAction(0, 70, !0), _disableControlAction(0, 92, !0)), 0 === currentWeapon || isMeleeWeapon(currentWeapon) || (_disableControlAction(0, 142, !0), 2343591895 === currentWeapon && _disableControlAction(0, 24, !0))
    });
    const getCurrentWeaponHash = () => mp.game.invoke("0x0A6DB4965674D243", localPlayer.handle),
        removeWeaponFromHand = () => mp.game.invoke("0xADF692B254977C0C", localPlayer.handle, -1569615261, !0),
        isInfinityWeapon = e => -1 !== [WEAPON_FIREEXTINGUISHER, WEAPON_GRENADELAUNCHER_SMOKE].indexOf(e),
        isMeleeWeapon = e => -1 !== WEAPON_MELEE.indexOf(e);
    mp.events.add("playerReady", () => {
        setTimeout(() => {
            try {
                mp.game.weapon.setEnableLocalOutgoingDamage(!0)
            } catch (e) {}
        }, 1e3);
        try {
            mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_rpg")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("WEAPON_STINGER")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("WEAPON_PASSENGER_ROCKET")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("WEAPON_AIRSTRIKE_ROCKET")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("WEAPON_VEHICLE_ROCKET")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_grenadelauncher")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_grenadelauncher_smoke")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_minigun")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_firework")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_railgun")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_hominglauncher")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_compactlauncher")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_rayminigun")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_raycarbine")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_raypistol")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_grenade")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_bzgas")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_molotov")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_stickybomb")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_proxmine")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_pipebomb")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_smokegrenade")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_flare")), mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_stone_hatchet"))
        } catch (e) {}
    }), mp.attachmentMngr.registerWeapon("w_sg_pumpshotgun", mp.game.joaat("weapon_pumpshotgun"), 24818, new mp.Vector3(-.1, -.15, .11), new mp.Vector3(-180, 0, 0)), mp.attachmentMngr.registerWeapon("w_sg_pumpshotgunmk2", mp.game.joaat("weapon_pumpshotgun_mk2"), 24818, new mp.Vector3(-.1, -.15, .11), new mp.Vector3(-180, 0, 0)), mp.attachmentMngr.registerWeapon("w_sg_heavyshotgun", mp.game.joaat("weapon_heavyshotgun"), 24818, new mp.Vector3(-.1, -.15, .11), new mp.Vector3(-180, 0, 0)), mp.attachmentMngr.registerWeapon("w_sg_assaultshotgun", mp.game.joaat("weapon_assaultshotgun"), 24818, new mp.Vector3(-.1, -.15, .11), new mp.Vector3(-180, 0, 0)), mp.attachmentMngr.registerWeapon("w_sg_sawnoff", mp.game.joaat("weapon_sawnoffshotgun"), 24818, new mp.Vector3(-.13, -.16, .11), new mp.Vector3(-180, 0, 0)), mp.attachmentMngr.registerWeapon("w_lr_grenadelauncher", mp.game.joaat("weapon_grenadelauncher_smoke"), 24818, new mp.Vector3(-.1, -.18, .11), new mp.Vector3(-180, 0, 0)), mp.attachmentMngr.registerWeapon("w_ar_assaultrifle", mp.game.joaat("weapon_assaultrifle"), 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)), mp.attachmentMngr.registerWeapon("w_ar_assaultrifle_smg", mp.game.joaat("weapon_compactrifle"), 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)), mp.attachmentMngr.registerWeapon("w_ar_carbinerifle", mp.game.joaat("weapon_carbinerifle"), 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)), mp.attachmentMngr.registerWeapon("w_sb_gusenberg", mp.game.joaat("weapon_gusenberg"), 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)), mp.attachmentMngr.registerWeapon("w_ar_advancedrifle", mp.game.joaat("weapon_advancedrifle"), 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5)), mp.attachmentMngr.registerWeapon("w_ar_specialcarbine", mp.game.joaat("weapon_specialcarbine"), 24818, new mp.Vector3(-.1, -.15, -.13), new mp.Vector3(0, 0, 3.5));
}