{
  const localPlayer = mp.players.local;
  let currentWeapon = 0,
    currentWeaponUnsigned = 0,
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
    requestAmmo = !1,
    sendRequestAmmo = !1,
    freezeWeaponChange = !0,
    playerInStreamCount = 0;
  (global.getPlayerCurrentWeaponData = () => ({
    weapon: currentWeapon,
    ammo: currentAmmo,
  })),
    (global.isPlayerHasNonMeleeWeapon = () =>
      0 !== currentWeapon && -1 === WEAPON_MELEE.indexOf(currentWeapon)),
    mp.events.add("client_playerWeapon_setWeapon", function (a, b, c) {
      if (
        ((currentWeapon = parseInt(a)),
        (currentWeaponUnsigned = (currentWeapon << 0).toString()),
        (currentWeaponUnsigned = currentWeaponUnsigned.substring(
          0,
          currentWeaponUnsigned.length - 3
        )),
        (currentAmmo = b),
        (infinityMod = !!c),
        (requestAmmo = 0 == b),
        (sendRequestAmmo = !1),
        (freezeWeaponChange = !1),
        isInfinityWeapon(currentWeapon) &&
          ((requestAmmo = !1),
          (freezeWeaponChange = !1),
          localPlayer.giveWeapon(currentWeapon, 99999, !0),
          localPlayer.setAmmoInClip(currentWeapon, 99999)),
        (lastSetAmmo = new Date().getTime()),
        clearInterval(checkAmmoInterval),
        (checkAmmoInterval = setInterval(checkAmmoHandler, 350)),
        0 !== currentWeapon)
      ) {
        const b = localPlayer.getVariable("weaponMods");
        b &&
          applyModForLocalPlayer(parseWeaponModsFromStr(b), currentWeapon) &&
          mp.events.callRemote("server_weapon_updateMods", a);
      }
    }),
    mp.events.add("client_playerWeapon_setAmmo", function (a) {
      (currentAmmo = parseInt(a)),
        (requestAmmo = !1),
        (sendRequestAmmo = !1),
        localPlayer.setAmmoInClip(currentWeapon, 0),
        localPlayer.giveWeapon(currentWeapon, currentAmmo, !0),
        (lastSetAmmo = new Date().getTime());
    }),
    mp.events.add("client_playerWeapon_changeError", () => {
      (freezeWeaponChange = !1), (lastSlot = lastSaveSlot);
    }),
    mp.events.add("playerLeaveVehicle", () => {
      lastChangeWeaponTime = 0;
    });
  const checkAmmoHandler = () => {
    if (0 !== localPlayer.handle)
      if (0 !== currentWeapon && !freezeWeaponChange) {
        const a = getCurrentWeaponHash(),
          b = a.toString();
        if (
          b.substring(0, b.length - 3) != currentWeaponUnsigned &&
          -1569615261 != a
        )
          return -1 === WEAPON_CANCEL_REMOVE_LIST.indexOf(localPlayer.weapon)
            ? ((lastSlot = -1),
              removeWeaponFromHand(),
              void mp.events.callRemote(
                "server_playerWeapon_resetWeapon",
                currentAmmo
              ))
            : void 0;
        if (localPlayer.vehicle && !infinityMod) {
          const b = mp.game.weapon.getWeapontypeGroup(a);
          if (localPlayer.vehicle.getPedInSeat(-1) == localPlayer.handle) {
            if (
              (416676503 != b && 3337201093 != b) ||
              3249783761 == currentWeapon
            )
              return (
                (lastSlot = -1),
                removeWeaponFromHand(),
                void mp.events.callRemote(
                  "server_playerWeapon_resetWeapon",
                  currentAmmo
                )
              );
          } else if (416676503 != b && 3337201093 != b)
            return (
              (lastSlot = -1),
              removeWeaponFromHand(),
              void mp.events.callRemote(
                "server_playerWeapon_resetWeapon",
                currentAmmo
              )
            );
        }
        if (global.isSmartphoneOpen && !infinityMod)
          return (
            (lastSlot = -1),
            removeWeaponFromHand(),
            void mp.events.callRemote(
              "server_playerWeapon_resetWeapon",
              currentAmmo
            )
          );
        if (
          localPlayer.isFalling() ||
          localPlayer.isInAir() ||
          localPlayer.isSwimming() ||
          localPlayer.isSwimmingUnderWater() ||
          localPlayer.isDead() ||
          localPlayer.isClimbing() ||
          localPlayer.isReloading() ||
          localPlayer.isGettingUp() ||
          localPlayer.isJumping() ||
          localPlayer.isJumpingOutOfVehicle()
        )
          return;
        if (
          ((lastAmmo = currentAmmo),
          (currentAmmo = localPlayer.weaponAmmo),
          0 == currentAmmo &&
            !requestAmmo &&
            lastSetAmmo + 3200 < new Date().getTime() &&
            null === sendShootTimeout)
        ) {
          if (isInfinityWeapon(currentWeapon))
            return (
              localPlayer.giveWeapon(currentWeapon, 99999, !0),
              void localPlayer.setAmmoInClip(currentWeapon, 99999)
            );
          mp.events.callRemote("server_playerWeapon_resetAmmo", 0, !0),
            (requestAmmo = !0),
            (lastWeaponReload = new Date().getTime());
        }
        global.mainBrowser.execute(`mainHud.playerAmmo = ${currentAmmo};`),
          (playerInStreamCount = mp.players.streamed.length);
      } else global.mainBrowser.execute(`mainHud.playerAmmo = -1;`);
  };
  (checkAmmoInterval = setInterval(checkAmmoHandler, 350)),
    global.binder.register({
      action: "WEAPON_RELOAD",
      desc: "\u041F\u0435\u0440\u0435\u0437\u0430\u0440\u044F\u0434\u043A\u0430 \u043E\u0440\u0443\u0436\u0438\u044F",
      defaultKey: 82,
      func: () => {
        !global.actionAntiFlood("fastAction", 350) ||
          mp.gui.cursor.visible ||
          global.isChatOpen ||
          global.disableKeys ||
          localPlayer.isFalling() ||
          localPlayer.isInAir() ||
          localPlayer.isSwimming() ||
          localPlayer.isSwimmingUnderWater() ||
          localPlayer.isDead() ||
          localPlayer.isClimbing() ||
          localPlayer.isReloading() ||
          localPlayer.isGettingUp() ||
          localPlayer.isJumping() ||
          localPlayer.isJumpingOutOfVehicle() ||
          lastWeaponReload + 2500 > new Date().getTime() ||
          ((lastWeaponReload = new Date().getTime()),
          (sendRequestAmmo = !0),
          mp.events.callRemote(
            "server_playerWeapon_resetAmmo",
            currentAmmo,
            !1
          ));
      },
    });
  function selectWeapon(a) {
    return () =>
      lastSlot === a ||
      mp.gui.cursor.visible ||
      global.isChatOpen ||
      global.disableKeys ||
      freezeWeaponChange ||
      global.isSmartphoneOpen ||
      playerCuffStatus ||
      infinityMod ||
      localPlayer.getIsTaskActive(167) ||
      lastChangeWeaponTime + 1500 > new Date().getTime()
        ? void 0
        : -1 !== a && null !== global.itemInHand
        ? void global.rpc.triggerClient(
            "clientFunc_notifyError",
            "\u0423 \u0432\u0430\u0441 \u0437\u0430\u043D\u044F\u0442\u044B \u0440\u0443\u043A\u0438"
          )
        : void (
            !global.actionAntiFlood("fastAction", 350) ||
            ((lastChangeWeaponTime = new Date().getTime()),
            (freezeWeaponChange = !0),
            0 <= a
              ? mp.events.callRemoteUnreliable(
                  "server_playerWeapon_selectWeapon",
                  a,
                  currentAmmo
                )
              : mp.events.callRemoteUnreliable(
                  "server_playerWeapon_resetWeapon",
                  currentAmmo
                ),
            (lastSaveSlot = lastSlot),
            (lastSlot = a),
            null !== sendShootTimeout && clearTimeout(sendShootTimeout),
            (sendShootTimeout = null))
          );
  }
  global.binder.register({
    action: "WEAPON_SLOT_0",
    desc: "\u0414\u043E\u0441\u0442\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435 \u0438\u0437 1 \u0441\u043B\u043E\u0442\u0430",
    defaultKey: 49,
    func: selectWeapon(0),
  }),
    global.binder.register({
      action: "WEAPON_SLOT_1",
      desc: "\u0414\u043E\u0441\u0442\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435 \u0438\u0437 2 \u0441\u043B\u043E\u0442\u0430",
      defaultKey: 50,
      func: selectWeapon(1),
    }),
    global.binder.register({
      action: "WEAPON_SLOT_2",
      desc: "\u0414\u043E\u0441\u0442\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435 \u0438\u0437 3 \u0441\u043B\u043E\u0442\u0430",
      defaultKey: 51,
      func: selectWeapon(2),
    }),
    global.binder.register({
      action: "WEAPON_REMOVE",
      desc: "\u0423\u0431\u0440\u0430\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u0435",
      defaultKey: 52,
      func: selectWeapon(-1),
    }),
    mp.events.add("__client_playerWeapon_setWeaponSlot", (a) => {
      lastSlot = a;
    }),
    mp.events.add("client_playerSync_cuffStatus", function (a) {
      (playerCuffStatus = a),
        a &&
          0 != currentWeapon &&
          mp.events.callRemote("server_playerWeapon_resetWeapon", currentAmmo);
    });
  let sendShootTimeout = null,
    sendShootCount = 0,
    lastSpawnTime = -1;
  const WEAPON_UNARMED = mp.game.joaat("weapon_unarmed"),
    WEAPON_STUNGAN = mp.game.joaat("weapon_stungun"),
    WEAPON_FIREEXTINGUISHER = mp.game.joaat("weapon_fireextinguisher"),
    WEAPON_GRENADELAUNCHER_SMOKE = mp.game.joaat(
      "weapon_grenadelauncher_smoke"
    ),
    WEAPON_SNOWBALL = mp.game.joaat("weapon_snowball"),
    WEAPON_SHOOTGUN = [
      mp.game.joaat("weapon_bullpupshotgun"),
      mp.game.joaat("weapon_dbshotgun"),
      mp.game.joaat("weapon_pumpshotgun"),
      mp.game.joaat("weapon_pumpshotgun_mk2"),
      mp.game.joaat("weapon_assaultshotgun"),
      mp.game.joaat("weapon_heavyshotgun"),
      mp.game.joaat("weapon_musket"),
    ],
    WEAPON_MELEE = [
      mp.game.joaat("weapon_dagger"),
      mp.game.joaat("weapon_bat"),
      mp.game.joaat("weapon_bottle"),
      mp.game.joaat("weapon_crowbar"),
      mp.game.joaat("weapon_flashlight"),
      mp.game.joaat("weapon_golfclub"),
      mp.game.joaat("weapon_hammer"),
      mp.game.joaat("weapon_hatchet"),
      mp.game.joaat("weapon_knuckle"),
      mp.game.joaat("weapon_knife"),
      mp.game.joaat("weapon_machete"),
      mp.game.joaat("weapon_switchblade"),
      mp.game.joaat("weapon_nightstick"),
      mp.game.joaat("weapon_wrench"),
      mp.game.joaat("weapon_battleaxe"),
      mp.game.joaat("weapon_poolcue"),
      mp.game.joaat("weapon_stone_hatchet"),
      WEAPON_FIREEXTINGUISHER,
    ],
    WEAPON_PROJECTILE = [WEAPON_GRENADELAUNCHER_SMOKE, WEAPON_SNOWBALL],
    WEAPON_CANCEL_REMOVE_LIST = [WEAPON_SNOWBALL],
    WEAPON_BLOCK_LIST = [];
  mp.events.add("incomingDamage", (a, b, c, d, e) => {
    if (c === localPlayer) {
      if (lastSpawnTime + 1500 > new Date().getTime()) return !0;
      if (WEAPON_UNARMED === d)
        return void mp.game.weapon.setCurrentDamageEventAmount(
          b instanceof mp.Ped && b.isDynamic && b.serverPed
            ? b.serverPed.weaponUnarmedDamage
            : 0 === playerInGreenZone
            ? 10
            : 0
        );
      if (-1 !== WEAPON_MELEE.indexOf(d))
        return void mp.game.weapon.setCurrentDamageEventAmount(
          d === WEAPON_FIREEXTINGUISHER ? 0 : 0 === playerInGreenZone ? 15 : 0
        );
      if (
        (mp.game.weapon.setCurrentDamageEventAmount(0),
        mp.game.weapon.setCurrentDamageEventCritical(!1),
        b instanceof mp.Ped && b.isDynamic && b.serverPed)
      ) {
        if (
          -1 !== WEAPON_SHOOTGUN.indexOf(d) &&
          !global.actionAntiFlood("shoot_sg", 50)
        )
          return !0;
        const { x: a, y: c, z: f } = localPlayer.position,
          { x: g, y: h, z: i } = b.getCoords(!0);
        mp.events.callRemoteUnreliable(
          "server_ped_damage_in",
          b.serverPed.id,
          "" + d,
          e,
          mp.dist(g, h, i, a, c, f)
        );
      }
      if (d === WEAPON_STUNGAN) {
        if (!global.actionAntiFlood("incomingDamage_stun", 1500)) return !0;
        if (2 > localPlayer.getHealth())
          return localPlayer.setToRagdoll(4e3, 4e3, 0, !1, !1, !1), !0;
        global.mainBrowser.execute(
          "for (let i = 0; i < 15; i++) UI_effect_drugs();"
        );
      }
    } else
      c instanceof mp.Ped &&
        c.isDynamic &&
        (mp.game.weapon.setCurrentDamageEventAmount(0),
        mp.game.weapon.setCurrentDamageEventCritical(!1));
  }),
    mp.events.add("outgoingDamage", (a, b, c, d, e, f) => {
      if (a !== localPlayer) {
        if (
          b === localPlayer &&
          a instanceof mp.Ped &&
          a.isDynamic &&
          a.serverPed
        )
          if (d === WEAPON_UNARMED)
            mp.game.weapon.setCurrentDamageEventAmount(
              a.serverPed.weaponUnarmedDamage
            );
          else if (-1 !== WEAPON_MELEE.indexOf(d))
            mp.game.weapon.setCurrentDamageEventAmount(15);
          else {
            if (
              -1 !== WEAPON_SHOOTGUN.indexOf(d) &&
              !global.actionAntiFlood("shoot_sg", 50)
            )
              return !0;
            const { x: b, y: c, z: f } = localPlayer.position,
              { x: g, y: h, z: i } = a.getCoords(!0);
            mp.events.callRemoteUnreliable(
              "server_ped_damage_in",
              a.serverPed.id,
              "" + d,
              e,
              mp.dist(g, h, i, b, c, f)
            );
          }
        return;
      }
      if ("player" === b.type) {
        if (d === WEAPON_UNARMED)
          return void mp.game.weapon.setCurrentDamageEventAmount(10);
        if (-1 !== WEAPON_MELEE.indexOf(d))
          return void mp.game.weapon.setCurrentDamageEventAmount(15);
        if (
          (mp.game.weapon.setCurrentDamageEventAmount(0),
          mp.game.weapon.setCurrentDamageEventCritical(!1),
          d === currentWeapon)
        ) {
          if (
            -1 !== WEAPON_SHOOTGUN.indexOf(d) &&
            !global.actionAntiFlood("shoot_sg", 50)
          )
            return !0;
          const a = b.getVariable("rsd");
          if (null == a) return !0;
          const c =
            20 === e
              ? 0
              : 19 === e ||
                10 === e ||
                9 === e ||
                8 === e ||
                7 === e ||
                0 === e ||
                15 === e ||
                11 === e
              ? 1
              : 2;
          100 < playerInStreamCount
            ? (sendShootCount++,
              3 <= sendShootCount
                ? (mp.events.callRemoteUnreliable(
                    "spw",
                    b,
                    c,
                    a,
                    sendShootCount
                  ),
                  null !== sendShootTimeout && clearTimeout(sendShootTimeout),
                  (sendShootTimeout = null),
                  (sendShootCount = 0))
                : (null !== sendShootTimeout && clearTimeout(sendShootTimeout),
                  (sendShootTimeout = setTimeout(() => {
                    mp.events.callRemoteUnreliable(
                      "spw",
                      b,
                      c,
                      a,
                      sendShootCount
                    ),
                      (sendShootTimeout = null),
                      (sendShootCount = 0);
                  }, 199))))
            : (mp.events.callRemoteUnreliable("spw", b, c, a),
              null !== sendShootTimeout && clearTimeout(sendShootTimeout),
              (sendShootTimeout = null),
              (sendShootCount = 0));
        }
        return;
      }
      if (b instanceof mp.Ped && b.isDynamic && b.serverPed) {
        if (
          -1 !== WEAPON_SHOOTGUN.indexOf(d) &&
          !global.actionAntiFlood("shoot_sg", 50)
        )
          return !0;
        mp.game.weapon.setCurrentDamageEventAmount(0),
          mp.game.weapon.setCurrentDamageEventCritical(!1);
        const { x: a, y: c, z: f } = localPlayer.position,
          { x: g, y: h, z: i } = b.getCoords(!0);
        return void mp.events.callRemoteUnreliable(
          "server_ped_damage_out",
          b.serverPed.id,
          e,
          mp.dist(g, h, i, a, c, f)
        );
      }
      if (!(150 <= f && "vehicle" === b.type && d === WEAPON_UNARMED)) return;
      mp.game.weapon.setCurrentDamageEventAmount(0);
      const g = b.getCoords(!0),
        h = Date.now(),
        i = setInterval(() => {
          if (Date.now() > h + 5e3 || 0 >= b.handle || !mp.vehicles.exists(b))
            return void clearInterval(i);
          const a = mp.dist(
            g.x,
            g.y,
            g.z,
            b.position.x,
            b.position.y,
            b.position.z
          );
          2.5 <= a &&
            (clearInterval(i),
            b.setCoords(g.x, g.y, g.z, !1, !1, !1, !1),
            mp.events.callRemote("s_ac_veh_damage"));
        }, 0);
    }),
    mp.events.add("playerSpawn", (a) => {
      a === localPlayer && (lastSpawnTime = new Date().getTime());
    });
  const resetDamageBlock = () => {
    localPlayer.setProofs(
      !1,
      !1,
      !1,
      !(localPlayer.isInAir() || localPlayer.isFalling()),
      !1,
      !1,
      !1,
      !1
    ),
      mp.game.player.resetStamina(),
      localPlayer.setConfigFlag(429, !0),
      localPlayer.setConfigFlag(241, !0),
      mp.game.player.setWeaponDamageModifier(-999999);
  };
  setInterval(resetDamageBlock, 2500),
    mp.events.add("explosion", () => !0),
    mp.events.add("projectile", (a, b) => -1 === WEAPON_PROJECTILE.indexOf(b));
  let weaponModList = [];
  const weaponModMap = new Map();
  mp.events.addDataHandler("weaponMods", (a, b) => {
    if (0 !== a.handle) {
      const c = a.weapon;
      if (c !== WEAPON_UNARMED) {
        const d = parseWeaponModsFromStr(b);
        if (a.__weaponMods)
          for (const b of a.__weaponMods)
            if (b[1] === c && -1 === d.findIndex((a) => a[0] === b[0])) {
              const c = weaponModMap.get(b[0]);
              c && c.removeFromPlayer(a);
            }
        (a.__weaponMods = new Set()), applyModForPlayer(a, d, a.weapon);
      }
    }
  }),
    mp.events.add("client_weapon_updateMods", (a, b) => {
      mp.players.exists(a) &&
        0 !== a.handle &&
        setTimeout(() => {
          if (
            mp.players.exists(a) &&
            0 !== a.handle &&
            ((b = parseInt(b)), a.weapon === b || a.weapon === b << 0)
          ) {
            a.__weaponMods = new Set();
            const c = a.getVariable("weaponMods");
            c && applyModForPlayer(a, parseWeaponModsFromStr(c), b);
          }
        }, 1e3);
    });
  const applyModForLocalPlayer = (a, b) => {
      localPlayer.__weaponMods = new Set();
      let c = 0;
      for (const d of a) {
        const a = weaponModMap.get(d[0]);
        a &&
          a.weapon === b &&
          (a.onSet(localPlayer, d[1]), localPlayer.__weaponMods.add(d[0]), c++);
      }
      return 0 != c;
    },
    applyModForPlayer = (a, b, c) => {
      for (const d of b) {
        const b = weaponModMap.get(d[0]);
        b &&
          b.weapon === c &&
          (b.onSet(a, d[1]), a.__weaponMods.add([d[0], c]));
      }
    };
  (global.playerWeaponApplyModsStream = (a) => {
    setTimeout(() => {
      mp.players.exists(a) &&
        0 !== a.handle &&
        a.weapon !== WEAPON_UNARMED &&
        ((a.__weaponMods = new Set()),
        applyModForPlayer(
          a,
          parseWeaponModsFromStr(a.getVariable("weaponMods")),
          a.weapon
        ));
    }, 1500);
  }),
    (global.applyModToWeaponObject = (a, b, c) => {
      const d = weaponModMap.get(b);
      d && d.setToObject(a, c);
    }),
    (global.removeModFromWeaponObject = (a, b) => {
      const c = weaponModMap.get(b);
      c && c.removeFromObject(a);
    });
  const createWeaponModComponentWithLivery = (a, b, c) => {
      const d = mp.game.joaat(b),
        e = c;
      weaponModList.push({
        mod: a,
        weapon: d,
        onSet: (a, b) => {
          mp.game.weapon.giveComponentToPed(a.handle, d, e),
            mp.game.weapon.setPedLiveryColor(a.handle, d, e, parseInt(b));
        },
        removeFromPlayer: (a) => {
          mp.game.weapon.hasPedGotComponent(a.handle, d, e) &&
            mp.game.weapon.removeComponentFromPed(a.handle, d, e);
        },
        setToObject: async (a, b) => {
          const c = mp.game.weapon.getComponentTypeModel(e);
          (!mp.game.streaming.hasModelLoaded(c) &&
            (mp.game.streaming.requestModel(c),
            await mp.game.waitAsync(100),
            !mp.game.entity.doesExist(a))) ||
            (mp.game.weapon.giveComponentToWeaponObject(a, e),
            mp.game.weapon.setObjectLiveryColor(a, e, parseInt(b)));
        },
        removeFromObject: (a) => {
          mp.game.weapon.removeComponentFromWeaponObject(a, e);
        },
      }),
        weaponModMap.set(a, weaponModList[weaponModList.length - 1]);
    },
    createWeaponModComponent2WithLivery = (a, b, c, d) => {
      const e = mp.game.joaat(b),
        f = c,
        g = d;
      weaponModList.push({
        mod: a,
        weapon: e,
        onSet: (a, b) => {
          mp.game.weapon.giveComponentToPed(a.handle, e, f),
            mp.game.weapon.setPedLiveryColor(a.handle, e, f, parseInt(b)),
            mp.game.weapon.giveComponentToPed(a.handle, e, g),
            mp.game.weapon.setPedLiveryColor(a.handle, e, g, parseInt(b));
        },
        removeFromPlayer: (a) => {
          mp.game.weapon.hasPedGotComponent(a.handle, e, f) &&
            mp.game.weapon.removeComponentFromPed(a.handle, e, f),
            mp.game.weapon.hasPedGotComponent(a.handle, e, g) &&
              mp.game.weapon.removeComponentFromPed(a.handle, e, g);
        },
        setToObject: async (a, b) => {
          const c = mp.game.weapon.getComponentTypeModel(f),
            d = mp.game.weapon.getComponentTypeModel(g);
          ((mp.game.streaming.hasModelLoaded(c) &&
            mp.game.streaming.hasModelLoaded(d)) ||
            (mp.game.streaming.requestModel(c),
            mp.game.streaming.requestModel(d),
            await mp.game.waitAsync(100),
            !!mp.game.entity.doesExist(a))) &&
            (mp.game.weapon.giveComponentToWeaponObject(a, f),
            mp.game.weapon.setObjectLiveryColor(a, f, parseInt(b)),
            mp.game.weapon.giveComponentToWeaponObject(a, g),
            mp.game.weapon.setObjectLiveryColor(a, g, parseInt(b)));
        },
        removeFromObject: (a) => {
          mp.game.weapon.removeComponentFromWeaponObject(a, f),
            mp.game.weapon.removeComponentFromWeaponObject(a, g);
        },
      }),
        weaponModMap.set(a, weaponModList[weaponModList.length - 1]);
    },
    createWeaponModComponent = (a, b, c) => {
      const d = mp.game.joaat(b),
        e = c;
      weaponModList.push({
        mod: a,
        weapon: d,
        onSet: (a) => {
          mp.game.weapon.giveComponentToPed(a.handle, d, e);
        },
        removeFromPlayer: (a) => {
          mp.game.weapon.hasPedGotComponent(a.handle, d, e) &&
            mp.game.weapon.removeComponentFromPed(a.handle, d, e);
        },
        setToObject: async (a) => {
          const b = mp.game.weapon.getComponentTypeModel(e);
          (!mp.game.streaming.hasModelLoaded(b) &&
            (mp.game.streaming.requestModel(b),
            await mp.game.waitAsync(100),
            !mp.game.entity.doesExist(a))) ||
            mp.game.weapon.giveComponentToWeaponObject(a, e);
        },
        removeFromObject: (a) => {
          mp.game.weapon.removeComponentFromWeaponObject(a, e);
        },
      }),
        weaponModMap.set(a, weaponModList[weaponModList.length - 1]);
    },
    createWeaponModComponent2 = (a, b, c, d) => {
      const e = mp.game.joaat(b),
        f = c,
        g = d;
      weaponModList.push({
        mod: a,
        weapon: e,
        onSet: (a) => {
          mp.game.weapon.giveComponentToPed(a.handle, e, f),
            mp.game.weapon.giveComponentToPed(a.handle, e, g);
        },
        removeFromPlayer: (a) => {
          mp.game.weapon.hasPedGotComponent(a.handle, e, f) &&
            mp.game.weapon.removeComponentFromPed(a.handle, e, f),
            mp.game.weapon.hasPedGotComponent(a.handle, e, g) &&
              mp.game.weapon.removeComponentFromPed(a.handle, e, g);
        },
        setToObject: async (a) => {
          const b = mp.game.weapon.getComponentTypeModel(f),
            c = mp.game.weapon.getComponentTypeModel(g);
          ((mp.game.streaming.hasModelLoaded(b) &&
            mp.game.streaming.hasModelLoaded(c)) ||
            (mp.game.streaming.requestModel(b),
            mp.game.streaming.requestModel(c),
            await mp.game.waitAsync(100),
            !!mp.game.entity.doesExist(a))) &&
            (mp.game.weapon.giveComponentToWeaponObject(a, f),
            mp.game.weapon.giveComponentToWeaponObject(a, g));
        },
        removeFromObject: (a) => {
          mp.game.weapon.removeComponentFromWeaponObject(a, f),
            mp.game.weapon.removeComponentFromWeaponObject(a, g);
        },
      }),
        weaponModMap.set(a, weaponModList[weaponModList.length - 1]);
    },
    createWeaponModTint = (a, b) => {
      const c = mp.game.joaat(b);
      weaponModList.push({
        mod: a,
        weapon: c,
        onSet: (a, b) => {
          mp.game.weapon.setPedTintIndex(a.handle, c, parseInt(b));
        },
        removeFromPlayer: (a) => {
          mp.game.weapon.setPedTintIndex(a.handle, c, 0);
        },
        setToObject: (a, b) => {
          mp.game.weapon.setObjectTintIndex(a, parseInt(b));
        },
        removeFromObject: (a) => {
          mp.game.weapon.setObjectTintIndex(a, 0);
        },
      }),
        weaponModMap.set(a, weaponModList[weaponModList.length - 1]);
    },
    parseWeaponModsFromStr = (a) => a.split("%").map((a) => a.split("|"));
  (global.playerWeaponGetModsData = (a, b) => {
    const c = a.getVariable("weaponMods");
    if (!c) return [];
    let d = [];
    for (const e of parseWeaponModsFromStr(c)) {
      const a = weaponModMap.get(e[0]);
      a && a.weapon === b && d.push({ mod: a, param: e[1] });
    }
    return d;
  }),
    (() => {
      const a = mp.game.joaat;
      createWeaponModTint("SG_T", "weapon_stungun"),
        createWeaponModTint("PSTFLR_T", "weapon_flaregun"),
        createWeaponModTint("PST_T", "weapon_pistol"),
        createWeaponModComponent(
          "PST_V_1",
          "weapon_pistol",
          a("COMPONENT_PISTOL_VARMOD_LUXE")
        ),
        createWeaponModTint("PSTCOMB_T", "weapon_combatpistol"),
        createWeaponModComponent(
          "PSTCOMB_V_1",
          "weapon_combatpistol",
          a("COMPONENT_COMBATPISTOL_VARMOD_LOWRIDER")
        ),
        createWeaponModTint("PSTVINT_T", "weapon_vintagepistol"),
        createWeaponModTint("PSTHEAVY_T", "weapon_heavypistol"),
        createWeaponModComponent(
          "PSTHEAVY_V_1",
          "weapon_heavypistol",
          a("COMPONENT_HEAVYPISTOL_VARMOD_LUXE")
        ),
        createWeaponModTint("PSTMK2_T", "weapon_pistol_mk2"),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_1",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO"),
          a("COMPONENT_PISTOL_MK2_CAMO_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_2",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_02"),
          a("COMPONENT_PISTOL_MK2_CAMO_02_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_3",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_03"),
          a("COMPONENT_PISTOL_MK2_CAMO_03_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_4",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_04"),
          a("COMPONENT_PISTOL_MK2_CAMO_04_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_5",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_05"),
          a("COMPONENT_PISTOL_MK2_CAMO_05_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_6",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_06"),
          a("COMPONENT_PISTOL_MK2_CAMO_06_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_7",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_07"),
          a("COMPONENT_PISTOL_MK2_CAMO_07_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_8",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_08"),
          a("COMPONENT_PISTOL_MK2_CAMO_08_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_9",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_09"),
          a("COMPONENT_PISTOL_MK2_CAMO_09_SLIDE")
        ),
        createWeaponModComponent2WithLivery(
          "PSTMK2_C_10",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_10"),
          a("COMPONENT_PISTOL_MK2_CAMO_10_SLIDE")
        ),
        createWeaponModComponent2(
          "PSTMK2_V_1",
          "weapon_pistol_mk2",
          a("COMPONENT_PISTOL_MK2_CAMO_IND_01"),
          a("COMPONENT_PISTOL_MK2_CAMO_IND_01_SLIDE")
        ),
        createWeaponModTint("REV_T", "weapon_revolver"),
        createWeaponModComponent(
          "REV_V_1",
          "weapon_revolver",
          a("COMPONENT_REVOLVER_VARMOD_GOON")
        ),
        createWeaponModComponent(
          "REV_V_2",
          "weapon_revolver",
          a("COMPONENT_REVOLVER_VARMOD_BOSS")
        ),
        createWeaponModTint("MACHPST_T", "weapon_machinepistol"),
        createWeaponModTint("CPDW_T", "weapon_combatpdw"),
        createWeaponModTint("SMG_T", "weapon_smg"),
        createWeaponModComponent(
          "SMG_V_1",
          "weapon_smg",
          a("COMPONENT_SMG_VARMOD_LUXE")
        ),
        createWeaponModTint("MINISMG_T", "weapon_minismg"),
        createWeaponModTint("MICROSMG_T", "weapon_microsmg"),
        createWeaponModComponent(
          "MICROSMG_V_1",
          "weapon_microsmg",
          a("COMPONENT_MICROSMG_VARMOD_LUXE")
        ),
        createWeaponModTint("ASSMG_T", "weapon_assaultsmg"),
        createWeaponModComponent(
          "ASSMG_V_1",
          "weapon_assaultsmg",
          a("COMPONENT_ASSAULTSMG_VARMOD_LOWRIDER")
        ),
        createWeaponModTint("SMGMK2_T", "weapon_smg_mk2"),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_1",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_2",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_02")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_3",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_03")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_4",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_04")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_5",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_05")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_6",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_06")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_7",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_07")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_8",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_08")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_9",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_09")
        ),
        createWeaponModComponentWithLivery(
          "SMGMK2_C_10",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_10")
        ),
        createWeaponModComponent(
          "SMGMK2_V_1",
          "weapon_smg_mk2",
          a("COMPONENT_SMG_MK2_CAMO_IND_01")
        ),
        createWeaponModTint("SGBP_T", "weapon_bullpupshotgun"),
        createWeaponModTint("SGDB_T", "weapon_dbshotgun"),
        createWeaponModTint("SGPUMP_T", "weapon_pumpshotgun"),
        createWeaponModComponent(
          "SGPUMP_V_1",
          "weapon_pumpshotgun",
          a("COMPONENT_PUMPSHOTGUN_VARMOD_LOWRIDER")
        ),
        createWeaponModTint("SGAS_T", "weapon_assaultshotgun"),
        createWeaponModTint("SGHEAVY_T", "weapon_heavyshotgun"),
        createWeaponModTint("MUSKET_T", "weapon_musket"),
        createWeaponModTint("SGPUMP2_T", "weapon_pumpshotgun_mk2"),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_1",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_2",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_02")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_3",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_03")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_4",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_04")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_5",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_05")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_6",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_06")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_7",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_07")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_8",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_08")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_9",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_09")
        ),
        createWeaponModComponentWithLivery(
          "SGPUMP2_C_10",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_10")
        ),
        createWeaponModComponent(
          "SGPUMP2_V_1",
          "weapon_pumpshotgun_mk2",
          a("COMPONENT_PUMPSHOTGUN_MK2_CAMO_IND_01")
        ),
        createWeaponModTint("AR_T", "weapon_assaultrifle"),
        createWeaponModComponent(
          "AR_V_1",
          "weapon_assaultrifle",
          a("COMPONENT_ASSAULTRIFLE_VARMOD_LUXE")
        ),
        createWeaponModTint("ARCOMP_T", "weapon_compactrifle"),
        createWeaponModTint("ARCARB_T", "weapon_carbinerifle"),
        createWeaponModComponent(
          "ARCARB_V_1",
          "weapon_carbinerifle",
          a("COMPONENT_CARBINERIFLE_VARMOD_LUXE")
        ),
        createWeaponModTint("ARSPEC_T", "weapon_specialcarbine"),
        createWeaponModComponent(
          "ARSPEC_V_1",
          "weapon_specialcarbine",
          a("COMPONENT_SPECIALCARBINE_VARMOD_LOWRIDER")
        ),
        createWeaponModTint("GUS_T", "weapon_gusenberg"),
        createWeaponModTint("KN_T", "weapon_knife");
    })(),
    createGreenZone(349.71, -1424.39, 85, 0),
    createGreenZone(67.19, -414.11, 120, 0),
    createGreenZone(-452.35, -2737.23, 55, 0),
    createGreenZone(2974.22, 2793.53, 90, 0),
    createGreenZone(230.63, 371.36, 15, 0),
    createGreenZone(683.15, 568.11, 80, 0),
    createGreenZone(601.95, -441.51, 45, 0),
    createGreenZone(1834, 3681, 55, 0),
    createGreenZone(-1028, -1385, 50, 0),
    createGreenZone(-1152.52, -1700.37, 50, 0),
    createGreenZone(714.91, -964.18, 20, 0),
    createGreenZone(-1846.92, -1251.14, 50, 0),
    createGreenZone(-3418.89, 967.74, 80, 0),
    createGreenZone(3503.74, 2574.8, 80, 0),
    createGreenZone(-269.25, 2214.67, 80, 0),
    createGreenZone(1561.43, 2181.27, 80, 0),
    createGreenZone(-206.27, -786.57, 35, 0),
    createGreenZone(-814.49, -2673, 50, 0),
    createGreenZone(913.8, -3170.87, 60, 0),
    createGreenZone(141.48, -1074.43, 40, 0),
    createGreenZone(-1191.05, -1486.55, 40, 0),
    createGreenZone(905.6, -174.74, 30, 0),
    createGreenZone(-1546.1, -410.73, 30, 0),
    createGreenZone(-794.05, -2387.65, 30, 0),
    createGreenZone(-2169.94, -401.84, 30, 0),
    createGreenZone(950, 30, 70, 0),
    createGreenZone(2744.62, 3473.64, 45, 0),
    createGreenZone(-1202.93, -1567.435, 14, 0),
    createGreenZone(-3e3, -3e3, 275, 7e3),
    createGreenZone(-3e3, -3e3, 275, 0),
    createGreenZone(-567.68, -599.82, 30, 0),
    createGreenZone(-543.58, -598.89, 30, 0),
    createGreenZone(-260, -2022, 75, 0, () => {
      global.smartphoneBrowser.execute(`
        UI_smartphoneNotify('app_mp_ico.png', 'MazeBank Arena', 'Откройте приложение в телефоне чтобы участвовать на арене');
    `);
    });
  function createGreenZone(a, b, c, d, e) {
    const f = mp.colshapes.newCircle(a, b, c, d);
    (f.greenZone = !0), (f.greenZoneOnPlayerEnter = e);
  }
  mp.events.add("playerEnterColshape", function (a) {
    a.greenZone != null &&
      (0 === playerInGreenZone &&
        (global.mainBrowser.execute(`mainHud.isPlayerInGreenZone = true;`),
        a.greenZoneOnPlayerEnter && a.greenZoneOnPlayerEnter()),
      playerInGreenZone++);
  }),
    mp.events.add("playerExitColshape", function (a) {
      a.greenZone != null &&
        (playerInGreenZone--,
        0 === playerInGreenZone &&
          global.mainBrowser.execute(`mainHud.isPlayerInGreenZone = false;`));
    });
  const _disableControlAction = mp.game.controls.disableControlAction;
  mp.events.add("render", () => {
    localPlayer.setStealthMovement(!1, "0"),
      _disableControlAction(0, 37, !0),
      _disableControlAction(0, 7, !0),
      _disableControlAction(0, 45, !0),
      _disableControlAction(0, 140, !0),
      _disableControlAction(0, 99, !0),
      _disableControlAction(0, 100, !0),
      _disableControlAction(0, 115, !0),
      _disableControlAction(0, 116, !0),
      _disableControlAction(0, 345, !0),
      _disableControlAction(0, 346, !0),
      _disableControlAction(0, 347, !0),
      (playerCuffStatus || global.isPlayerUseAnim) &&
        (_disableControlAction(0, 21, !0),
        _disableControlAction(0, 22, !0),
        _disableControlAction(0, 23, !0),
        _disableControlAction(0, 24, !0),
        _disableControlAction(0, 91, !0),
        _disableControlAction(0, 92, !0),
        _disableControlAction(0, 142, !0),
        _disableControlAction(0, 257, !0)),
      0 !== playerInGreenZone &&
        101631238 !== currentWeapon &&
        911657153 !== currentWeapon &&
        (_disableControlAction(0, 24, !0),
        _disableControlAction(0, 141, !0),
        _disableControlAction(0, 257, !0),
        _disableControlAction(0, 68, !0),
        _disableControlAction(0, 91, !0),
        _disableControlAction(0, 92, !0)),
      0 === currentWeapon ||
        isMeleeWeapon(currentWeapon) ||
        (_disableControlAction(0, 142, !0),
        2343591895 === currentWeapon && _disableControlAction(0, 24, !0));
  });
  const getWeaponAmmo = (a) =>
      mp.game.invoke("0x015A522136D7F951", localPlayer.handle, a),
    getCurrentWeaponHash = () =>
      mp.game.invoke("0x0A6DB4965674D243", localPlayer.handle),
    removeWeaponFromHand = () =>
      mp.game.invoke("0xADF692B254977C0C", localPlayer.handle, -1569615261, !0),
    isInfinityWeapon = (a) =>
      -1 !== [WEAPON_FIREEXTINGUISHER, WEAPON_GRENADELAUNCHER_SMOKE].indexOf(a),
    isMeleeWeapon = (a) => -1 !== WEAPON_MELEE.indexOf(a);
  mp.events.add("playerReady", () => {
    setTimeout(() => {
      try {
        mp.game.weapon.setEnableLocalOutgoingDamage(!0);
      } catch (a) {}
    }, 1e3);
    try {
      mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_rpg")),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("WEAPON_STINGER")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("WEAPON_PASSENGER_ROCKET")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("WEAPON_AIRSTRIKE_ROCKET")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("WEAPON_VEHICLE_ROCKET")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_grenadelauncher")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_grenadelauncher_smoke")
        ),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_minigun")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_firework")
        ),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_railgun")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_hominglauncher")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_compactlauncher")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_rayminigun")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_raycarbine")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_raypistol")
        ),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_grenade")),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_bzgas")),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_molotov")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_stickybomb")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_proxmine")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_pipebomb")
        ),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_smokegrenade")
        ),
        mp.game.weapon.addWeaponModelBlacklist(mp.game.joaat("weapon_flare")),
        mp.game.weapon.addWeaponModelBlacklist(
          mp.game.joaat("weapon_stone_hatchet")
        );
    } catch (a) {}
  }),
    mp.attachmentMngr.registerWeapon(
      "w_sg_pumpshotgun",
      mp.game.joaat("weapon_pumpshotgun"),
      24818,
      new mp.Vector3(-0.1, -0.15, 0.11),
      new mp.Vector3(-180, 0, 0)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_sg_pumpshotgunmk2",
      mp.game.joaat("weapon_pumpshotgun_mk2"),
      24818,
      new mp.Vector3(-0.1, -0.15, 0.11),
      new mp.Vector3(-180, 0, 0)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_sg_heavyshotgun",
      mp.game.joaat("weapon_heavyshotgun"),
      24818,
      new mp.Vector3(-0.1, -0.15, 0.11),
      new mp.Vector3(-180, 0, 0)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_sg_assaultshotgun",
      mp.game.joaat("weapon_assaultshotgun"),
      24818,
      new mp.Vector3(-0.1, -0.15, 0.11),
      new mp.Vector3(-180, 0, 0)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_lr_grenadelauncher",
      mp.game.joaat("weapon_grenadelauncher_smoke"),
      24818,
      new mp.Vector3(-0.1, -0.18, 0.11),
      new mp.Vector3(-180, 0, 0)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_ar_assaultrifle",
      mp.game.joaat("weapon_assaultrifle"),
      24818,
      new mp.Vector3(-0.1, -0.15, -0.13),
      new mp.Vector3(0, 0, 3.5)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_ar_assaultrifle_smg",
      mp.game.joaat("weapon_compactrifle"),
      24818,
      new mp.Vector3(-0.1, -0.15, -0.13),
      new mp.Vector3(0, 0, 3.5)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_ar_carbinerifle",
      mp.game.joaat("weapon_carbinerifle"),
      24818,
      new mp.Vector3(-0.1, -0.15, -0.13),
      new mp.Vector3(0, 0, 3.5)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_sb_gusenberg",
      mp.game.joaat("weapon_gusenberg"),
      24818,
      new mp.Vector3(-0.1, -0.15, -0.13),
      new mp.Vector3(0, 0, 3.5)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_ar_advancedrifle",
      mp.game.joaat("weapon_advancedrifle"),
      24818,
      new mp.Vector3(-0.1, -0.15, -0.13),
      new mp.Vector3(0, 0, 3.5)
    ),
    mp.attachmentMngr.registerWeapon(
      "w_ar_specialcarbine",
      mp.game.joaat("weapon_specialcarbine"),
      24818,
      new mp.Vector3(-0.1, -0.15, -0.13),
      new mp.Vector3(0, 0, 3.5)
    );
}
훑ﴬƐ;
