{
  const localPlayer = mp.players.local;
  global.mainMenuItems = new Map();
  let isMenuListOpen = !1,
    playerFamilyId = -1,
    playerFamilyHasPrint = !1;
  global.binder.register({
    action: "MENULIST_OPEN",
    desc: "\u041C\u0435\u043D\u044E",
    defaultKey: 77,
    func: () => {
      if (isMenuListOpen) return mainMenuListClose();
      if (
        mp.gui.cursor.visible ||
        global.isChatOpen ||
        global.disableKeys ||
        global.isPlayerDeath
      )
        return;
      const a = global.getEntityVariable(localPlayer, "factionType", -1),
        b = [];
      global.getEntityVariable(localPlayer, "isInPrison", !1)
        ? b.push([
            "\u041B\u0438\u0447\u043D\u043E\u0435 \u0434\u0435\u043B\u043E",
            function () {
              mainMenuListClose(),
                mp.events.callRemote("server_prison_myPrisonerDoc");
            },
          ])
        : 1 === a || 8 === a
        ? b.push([
            "\u041F\u043B\u0430\u043D\u0448\u0435\u0442",
            function () {
              mainMenuListClose();
              localPlayer.getVariable("cuffed") ||
                mp.events.call(
                  "client_menu_faction_police_dispatcherMenu_open"
                );
            },
          ])
        : 5 === a
        ? b.push([
            "\u041C\u0435\u043D\u044E \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430",
            function () {
              mainMenuListClose(),
                global.rpc.triggerServer("server_faction_newsOpenAdList", {});
            },
          ])
        : 7 === a
        ? b.push([
            "\u0412\u044B\u0437\u043E\u0432\u044B",
            function () {
              mainMenuListClose(),
                global.rpc.triggerServer(
                  "server_faction_ems_dispatcher_openMenu",
                  {}
                );
            },
          ])
        : 9 === a &&
          b.push([
            "\u041B\u0438\u0447\u043D\u044B\u0435 \u0434\u0435\u043B\u0430",
            function () {
              mainMenuListClose(),
                mp.events.callRemote("server_faction_prison_list");
            },
          ]);
      const c = localPlayer.vehicle;
      c &&
        (global.getEntityVariable(c, "isTaxiVeh", !1) &&
          localPlayer.handle == c.getPedInSeat(-1) &&
          b.push([
            "\u0422\u0430\u043A\u0441\u0438 \u041A\u041F\u041A",
            function () {
              mainMenuListClose(),
                global.rpc.trigger("client_menu_taxiMenu_list");
            },
          ]),
        global.getEntityVariable(c, "isMehanicVeh", !1) &&
          localPlayer.handle == c.getPedInSeat(-1) &&
          b.push([
            "\u041C\u0435\u0445\u0430\u043D\u0438\u043A \u041A\u041F\u041A",
            function () {
              mainMenuListClose(),
                global.rpc.trigger("client_menu_mehanicMenu_list");
            },
          ])),
        global.createMenuList({
          toPlayer: "auto",
          items: [
            [
              "\u041C\u0435\u043D\u044E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430",
              function () {
                mainMenuListClose(),
                  rpc.triggerServer("server_player_mainMenuOpen", 0);
              },
            ],
            ...(-1 == playerFamilyId
              ? []
              : [
                  [
                    "\u041C\u0435\u043D\u044E \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438",
                    function () {
                      mainMenuListClose(),
                        mp.events.callRemote("server_playerFamily_openMenu");
                    },
                  ],
                  [
                    "\u0412\u043E\u0439\u043D\u0430 \u0441\u0435\u043C\u0435\u0439",
                    function () {
                      mainMenuListClose(),
                        mp.events.callRemote("server_familyEnterprise_list");
                    },
                  ],
                  ...(playerFamilyHasPrint
                    ? [
                        [
                          "\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0439 \u043F\u0440\u0438\u043D\u0442",
                          () => {
                            mainMenuListClose(),
                              mp.events.callRemote("server_playerFamily_print");
                          },
                        ],
                      ]
                    : []),
                ]),
            ...(-1 == a
              ? []
              : [
                  [
                    "\u041C\u0435\u043D\u044E \u0444\u0440\u0430\u043A\u0446\u0438\u0438",
                    function () {
                      mainMenuListClose(),
                        mp.events.callRemote("server_faction_openMenu");
                    },
                  ],
                ]),
            ...Array.from(global.mainMenuItems.entries()).map((a) => [
              a[0],
              () => {
                mainMenuListClose(), a[1]();
              },
            ]),
            ...(0 === playerHouseList.size
              ? []
              : [
                  [
                    "\u041C\u0435\u043D\u044E \u0434\u043E\u043C\u0430",
                    function () {
                      mainMenuListClose(),
                        mp.events.callRemote("server_house_menu");
                    },
                  ],
                ]),
            [
              "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B",
              function () {
                mainMenuListClose(),
                  rpc.triggerServer("server_playerDoc_reqestTo", localPlayer);
              },
            ],
            ...b,
          ],
        }),
        mp.keys.bind(27, !0, mainMenuListClose),
        (isMenuListOpen = !0);
    },
  });
  const mainMenuListClose = () => {
    isMenuListOpen &&
      ((isMenuListOpen = !1),
      mp.keys.unbind(27, !0, mainMenuListClose),
      global.hideMenuList());
  };
  global.binder.register({
    action: "TOGGLE_UI_HUD",
    desc: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C\\\u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C HUD",
    defaultKey: -1,
    func: () => {
      global.hideUI(global.uiVisible);
    },
  }),
    mp.events.add("c:character:load", (a, b, c, d) => {
      global.mainBrowser.execute(`mainHud.minutesPlayed = ${a};`),
        mp.events.call("c:character:money", b),
        mp.events.call("client_character_skills_strength", c),
        mp.events.call("client_character_skills_shooting", d);
    }),
    (() => {
      let a = null;
      mp.events.add("client_playerData_setFamilyId", function (b, d) {
        (playerFamilyId = b),
          (playerFamilyHasPrint = d && -1 !== ("" + d).indexOf("CUSTOM_TATTO")),
          mp.blips.exists(a) && a.destroy(),
          c.forEach((a) => mp.objects.exists(a) && a.destroy()),
          (c = []),
          null !== j && (j.destroy(), (j = null)),
          o(null, null);
        -1 === playerFamilyId ||
          ((a = mp.blips.new(43, new mp.Vector3(-680.29, -1442.86, 5), {
            name: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0432\u0435\u0440\u0442\u043E\u043B\u0451\u0442\u043E\u0432",
            color: 5,
            shortRange: !0,
          })),
          mp.objects.forEach((a) => {
            if (a.dimension === 3005) {
              const b = a.getVariable("_cayoPericoWar");
              null != b && o(a, b);
            }
          }));
      });
      let b = !1,
        c = [],
        d = -1;
      const e = new mp.Vector3(5015.51, -5746.21, 15.48),
        f = new mp.Vector3(5009.77, -5748.01, 1),
        g = 125;
      let h = !1,
        i = null,
        j = null,
        k = null,
        l = null,
        m = null,
        n = new Set();
      mp.events.add("client_cayoPericoWar_startCapture", async (a) => {
        if (h) return;
        h = !0;
        let b = 0,
          c = localPlayer.getHealth();
        if (
          (null !== i && clearInterval(i),
          (i = setInterval(() => {
            const d = localPlayer.getHealth(),
              { x: f, y: g, z: j } = localPlayer.position;
            return global.isPlayerDeath ||
              10 < mp.game.system.vdist(f, g, j, e.x, e.y, e.z) ||
              0 !== localPlayer.dimension ||
              (c > d && 5 < c - d) ||
              b >= a
              ? ((h = !1),
                clearInterval(i),
                (i = null),
                localPlayer.clearTasksImmediately(),
                b >= a
                  ? mp.events.callRemote("server_cayoPericoWar_endCapture")
                  : mp.events.callRemote("server_cayoPericoWar_stopCapture"),
                global.hideUI(!1),
                global.disableChatAndKeys(!1),
                void global.mainBrowser.execute(`mainHud.progressStop();`))
              : void ((c = d),
                b++,
                global.mainBrowser.execute(
                  `mainHud.progressValue(${100 * (b / a)});`
                ));
          }, 1e3)),
          global.hideUI(!0),
          global.disableChatAndKeys(!0),
          global.mainBrowser.execute(
            `mainHud.progressStart('Захват', 0, 400);`
          ),
          localPlayer.setCoordsNoOffset(5015.51, -5746.21, 15.48, !1, !1, !1),
          localPlayer.setHeading(58.12),
          !mp.game.streaming.hasAnimDictLoaded("mp_bank_heist_1"))
        ) {
          mp.game.streaming.requestAnimDict("mp_bank_heist_1");
          do await mp.game.waitAsync(50);
          while (!mp.game.streaming.hasAnimDictLoaded("mp_bank_heist_1"));
        }
        localPlayer.taskPlayAnim(
          "mp_bank_heist_1",
          "hack_loop",
          8,
          1,
          -1,
          1,
          0,
          !1,
          !1,
          !1
        );
      }),
        mp.events.addDataHandler("_cayoPericoWar", (a, b) => {
          -1 === playerFamilyId || o(a, b);
        });
      const o = (a, i) => {
          const o = "" === i || null != i;
          if (((d = q()), o && !b)) {
            c.push(
              mp.objects.new(
                mp.game.joaat("hei_prop_hei_securitypanel"),
                new mp.Vector3(5015.047, -5745.915, 15.77),
                {
                  dimension: 0,
                  rotation: new mp.Vector3(0, 0, 58.12),
                  alpha: 255,
                }
              )
            ),
              c.push(
                mp.objects.new(
                  mp.game.joaat("hei_prop_hei_cs_keyboard"),
                  new mp.Vector3(5015.07, -5745.93, 15.5),
                  {
                    dimension: 0,
                    rotation: new mp.Vector3(0, 0, 58.12),
                    alpha: 255,
                  }
                )
              ),
              (j = new global.ActionColshape(
                e,
                0,
                0.8,
                "\u043D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u0445\u0432\u0430\u0442",
                () => {
                  -1 === playerFamilyId ||
                    h ||
                    (global.actionAntiFlood(
                      "server_cayoPericoWar_startCapture",
                      1e3
                    ) &&
                      mp.events.callRemote("server_cayoPericoWar_startCapture"),
                    global.notifyKeyHelpHide());
                }
              )),
              (k = mp.blips.new(775, e, {
                name: "\u0417\u0430\u0445\u0432\u0430\u0442 \u043E\u0441\u0442\u0440\u043E\u0432\u0430",
                color: 70,
                scale: 0.9,
                shortRange: !0,
              })),
              (l = mp.blips.new(9, new mp.Vector3(f.x, f.y, 1), {
                name: "",
                scale: 1,
                color: 1,
                alpha: 50,
                drawDistance: 100,
                shortRange: !0,
                rotation: 0,
                dimension: 0,
                radius: g,
              }));
            let b = !1,
              o = !0,
              r = i;
            null != m && clearInterval(m),
              (m = setInterval(() => {
                if (!isIslandLoaded || !p())
                  return (
                    n.forEach((a) =>
                      mp.events.call("client_playerBlip_destroy", a)
                    ),
                    n.clear(),
                    void (
                      b &&
                      (global.mainBrowser.execute(
                        `mainHud.captureTimerStop('CAYOPERICOFWAR');`
                      ),
                      (r = ""),
                      (b = !1))
                    )
                  );
                b || ((b = !0), o && (o = !1));
                const c = a.getVariable("_cayoPericoWar");
                if (null == c) return clearInterval(m), void (m = null);
                c !== r &&
                  ("" === c
                    ? global.mainBrowser.execute(
                        `mainHud.captureTimerStop('CAYOPERICOFWAR');`
                      )
                    : global.mainBrowser.execute(
                        `mainHud.captureTimerStart('CAYOPERICOFWAR', '${
                          c.split("$%$")[0] === playerFamilyId ? "" : "red"
                        }', '${c.split("$%$")[1]}', 'Cayo Perico', ${
                          300 - (q() - d)
                        });`
                      ),
                  (r = c)),
                  mp.players.forEachInStreamRange((a) => {
                    localPlayer === a ||
                      (a.getVariable("familyId") === playerFamilyId &&
                        !n.has(a.remoteId) &&
                        mp.game.system.vdist(
                          a.position.x,
                          a.position.y,
                          1,
                          f.x,
                          f.y,
                          1
                        ) < g &&
                        (n.add(a.remoteId),
                        mp.events.call(
                          "client_playerBlip_create",
                          a.remoteId,
                          0
                        )));
                  });
                for (const a of n) {
                  const b = mp.players.atRemoteId(a);
                  if (!mp.players.exists(b)) {
                    n.delete(a);
                    continue;
                  }
                  if (
                    0 === b.handle ||
                    mp.game.system.vdist(
                      b.position.x,
                      b.position.y,
                      1,
                      f.x,
                      f.y,
                      1
                    ) > g
                  ) {
                    mp.events.call("client_playerBlip_destroy", a), n.delete(a);
                    continue;
                  }
                }
              }, 500));
          } else
            !o &&
              b &&
              (null != m && clearInterval(m),
              (m = null),
              c.forEach((a) => mp.objects.exists(a) && a.destroy()),
              (c = []),
              null !== j && (j.destroy(), (j = null)),
              mp.blips.exists(k) && k.destroy(),
              mp.blips.exists(l) && l.destroy(),
              n.forEach((a) => mp.events.call("client_playerBlip_destroy", a)),
              n.clear(),
              global.mainBrowser.execute(
                `mainHud.captureTimerStop('CAYOPERICOFWAR');`
              ));
          b = o;
        },
        p = () =>
          mp.game.system.vdist(
            localPlayer.position.x,
            localPlayer.position.y,
            1,
            f.x,
            f.y,
            1
          ) < g,
        q = () => Math.floor(new Date().getTime() / 1e3);
    })(),
    mp.events.add("client_character_skills_strength", (a) => {
      var b = Math.round;
      mp.game.stats.statSetInt(
        mp.game.joaat("SP0_STRENGTH") << 0,
        b(20 * a),
        !0
      ),
        mp.game.stats.statSetInt(
          mp.game.joaat("SP0_STAMINA") << 0,
          b(20 * a),
          !0
        ),
        mp.game.stats.statSetInt(
          mp.game.joaat("SP0_LUNG_CAPACITY") << 0,
          b(20 * a),
          !0
        );
    }),
    mp.events.add("client_character_skills_shooting", (a) => {
      mp.game.stats.statSetInt(
        mp.game.joaat("SP0_SHOOTING_ABILITY") << 0,
        Math.round(10 * a),
        !0
      );
    });
  let weatherNow = "CLEAR",
    specialWeather = "";
  mp.events.add("serverWorldDataReady", () => {
    (weatherNow = mp.api.data.get("serverWeather") || "CLEAR"),
      mp.game.gameplay.setWeatherTypeNowPersist(weatherNow);
  }),
    mp.api.data.onChange("serverWeather", (a) => {
      "" == specialWeather && mp.game.gameplay.setWeatherTypeNowPersist(a),
        (weatherNow = a);
    }),
    mp.events.add("client_weather_setSpecialWeather", function (a) {
      (specialWeather = a),
        "" == specialWeather
          ? mp.game.gameplay.setWeatherTypeNowPersist(weatherNow)
          : mp.game.gameplay.setWeatherTypeNowPersist(specialWeather);
    }),
    mp.game.ui.setMinimapComponent(15, !0, -1),
    mp.events.add("client_map_loadIpl", function (a, b, c, d) {
      const e = mp.game.interior.getInteriorAtCoords(b, c, d);
      mp.game.streaming.requestIpl(a),
        0 != e && mp.game.interior.refreshInterior(e);
    }),
    mp.events.add("client_map_removeIpl", function (a) {
      mp.game.streaming.removeIpl(a);
    });
  let minimapCurrentState = 0;
  global.binder.register({
    action: "MINIMAP_TOGGLE_STATE",
    desc: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u043C\u0438\u043D\u0438\u043A\u0430\u0440\u0442\u044B",
    defaultKey: -1,
    func: () => {
      0 === minimapCurrentState
        ? (mp.game.ui.setRadarZoom(1e3), (minimapCurrentState = 1))
        : 1 === minimapCurrentState
        ? (mp.game.ui.setRadarZoom(200),
          mp.game.ui.setRadarBigmapEnabled(!0, !1),
          (minimapCurrentState = 2))
        : 2 == minimapCurrentState &&
          (mp.game.ui.setRadarBigmapEnabled(!1, !1), (minimapCurrentState = 0));
    },
  });
  function createGlobalEventColshape(a, b, c, d, e) {
    const f = mp.colshapes.newCircle(a, b, c, -1);
    f.__eventShape = [d, e];
  }
  mp.events.add("playerEnterColshape", function (a) {
    a.__eventShape != null && a.__eventShape[0]();
  }),
    mp.events.add("playerExitColshape", function (a) {
      a.__eventShape != null && a.__eventShape[1]();
    }),
    createGlobalEventColshape(
      -1114.88,
      306.84,
      200,
      () => {
        mp.game.streaming.requestIpl("bh1_47_joshhse_unburnt");
      },
      () => {
        mp.game.streaming.removeIpl("bh1_47_joshhse_unburnt");
      }
    ),
    createGlobalEventColshape(
      32.02,
      3737.35,
      200,
      () => {
        mp.game.streaming.requestIpl("methtrailer_grp1");
      },
      () => {
        mp.game.streaming.removeIpl("methtrailer_grp1");
      }
    ),
    createGlobalEventColshape(
      2495.55,
      3157.45,
      100,
      () => {
        mp.game.streaming.requestIpl("gr_case2_bunkerclosed");
      },
      () => {
        mp.game.streaming.removeIpl("gr_case2_bunkerclosed");
      }
    ),
    mp.game.streaming.requestIpl("ch1_02_closed"),
    mp.game.streaming.requestIpl("dt1_05_hc_remove");
  let officeIplList = [
    "ex_dt1_02_office_02b",
    "ex_dt1_11_office_02b",
    "ex_sm_13_office_02b",
    "ex_sm_15_office_02b",
  ];
  mp.game.streaming.requestIpl("ex_dt1_02_office_02b"),
    mp.game.streaming.requestIpl("ex_dt1_11_office_02b"),
    mp.game.streaming.requestIpl("ex_sm_13_office_02b"),
    mp.game.streaming.requestIpl("ex_sm_15_office_02b"),
    mp.events.add("client_map_office", (a, b, c, d) => {
      officeIplList.forEach((a) => mp.game.streaming.removeIpl(a)),
        (officeIplList = []),
        mp.game.streaming.requestIpl(a);
      const e = mp.game.interior.getInteriorAtCoords(b, c, d);
      0 !== e && mp.game.interior.refreshInterior(e),
        officeIplList.push(a),
        mp.api.player.transitionTeleport({
          x: b,
          y: c,
          z: d,
          heading: 0,
          fadeOutTime: 1e3,
          fadeInTime: 800,
          freeze: !0,
        }),
        global.discordUpdate(
          "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0432 \u043E\u0444\u0438\u0441\u0435",
          120
        );
    }),
    mp.events.add("client_map_office_exit", (a, b, c) => {
      mp.api.player.transitionTeleport({
        x: a,
        y: b,
        z: c,
        heading: 0,
        fadeOutTime: 1e3,
        fadeInTime: 500,
        freeze: !0,
      });
    });
  let gpsTrackerBlip = null,
    gpsTrackerTimeout = null,
    gpsTrackerTimeoutStream = null;
  const startGPSTracker = ({
    x: a,
    y: b,
    blipId: c,
    blipColor: d,
    blipScale: e,
    timeout: f,
    vehicleId: g,
  }) => {
    mp.blips.exists(gpsTrackerBlip) && gpsTrackerBlip.destroy(),
      (gpsTrackerBlip = mp.blips.new(c, new mp.Vector3(a, b, 0), {
        color: d,
        scale: e,
        shortRange: !1,
        dimension: -1,
      })),
      null !== gpsTrackerTimeout &&
        (clearTimeout(gpsTrackerTimeout), (gpsTrackerTimeout = null)),
      (gpsTrackerTimeout = setTimeout(() => {
        (gpsTrackerTimeout = null),
          null !== gpsTrackerTimeoutStream &&
            (clearTimeout(gpsTrackerTimeoutStream),
            (gpsTrackerTimeoutStream = null)),
          mp.blips.exists(gpsTrackerBlip) && gpsTrackerBlip.destroy();
      }, f)),
      null !== gpsTrackerTimeoutStream &&
        (clearTimeout(gpsTrackerTimeoutStream),
        (gpsTrackerTimeoutStream = null));
    const h = mp.vehicles.atRemoteId(g);
    h &&
      0 !== h.handle &&
      (gpsTrackerTimeoutStream = setTimeout(() => {
        gpsTrackerTimeoutStream = null;
        mp.vehicles.exists(h) &&
          0 !== h.handle &&
          startGPSTracker({
            x: h.position.x,
            y: h.position.y,
            blipId: c,
            blipColor: d,
            blipScale: e,
            timeout: f,
            vehicleId: g,
          });
      }, 150));
  };
  mp.events.add("client_map_gps_ems", (a, b, c) => {
    startGPSTracker({
      x: a,
      y: b,
      blipId: 153,
      blipColor: 2,
      blipScale: 1,
      timeout: 8e3,
      vehicleId: c,
    });
  }),
    mp.events.add("client_map_gps_taxi", (a, b, c) => {
      startGPSTracker({
        x: a,
        y: b,
        blipId: 198,
        blipColor: 2,
        blipScale: 1,
        timeout: 8e3,
        vehicleId: c,
      });
    }),
    mp.events.add("client_map_gps_meh", (a, b, c) => {
      startGPSTracker({
        x: a,
        y: b,
        blipId: 85,
        blipColor: 2,
        blipScale: 1,
        timeout: 8e3,
        vehicleId: c,
      });
    });
  let isIslandLoaded = !1,
    islandTimeoutLoad = null,
    islandTimeoutUnload = null;
  setTimeout(() => {
    mp.game.streaming.requestIpl("h4_islandx_terrain_01_slod"),
      mp.game.streaming.requestIpl("h4_islandx_terrain_02_slod"),
      mp.game.streaming.requestIpl("h4_islandx_terrain_03_lod"),
      mp.game.streaming.requestIpl("h4_islandx_terrain_04_slod"),
      mp.game.streaming.requestIpl("h4_islandx_terrain_05_slod"),
      mp.game.streaming.requestIpl("h4_islandx_terrain_06_slod"),
      mp.vehicles.new(
        mp.game.joaat("tug"),
        new mp.Vector3(1307.45, -3328.41, 1.39),
        { dimension: 0, engine: !1, locked: !0, heading: 0 }
      ),
      mp.blips.new(765, new mp.Vector3(1283.24, -3331.5, 5.9), {
        scale: 1.1,
        color: 49,
        shortRange: !0,
        name: "Cayo Perico",
      }),
      mp.blips.new(765, new mp.Vector3(4900.16, -5192.03, 2.44), {
        scale: 1.1,
        color: 49,
        shortRange: !0,
        name: "Cayo Perico",
      }),
      global.ServerPed &&
        global.ServerPed.registerScript("PED_CAYOPERICO_TELEPORT", (a) => {
          a
            ? mp.api.player.transitionTeleport({
                x: 4912.74,
                y: -5196.47,
                z: 2.47,
                heading: 138,
                fadeOutTime: 500,
                fadeInTime: 2e3,
                freeze: !0,
              })
            : mp.api.player.transitionTeleport({
                x: 1295.54,
                y: -3331.41,
                z: 5.9,
                heading: 93,
                fadeOutTime: 500,
                fadeInTime: 2e3,
                freeze: !0,
              });
        });
  }, 1e4),
    createGlobalEventColshape(
      4840.571,
      -5174.425,
      2374,
      () => {
        isIslandLoaded ||
          ((isIslandLoaded = !0),
          mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", isIslandLoaded),
          mp.game.invoke("0x5E1460624D194A38", isIslandLoaded),
          null != islandTimeoutUnload &&
            (clearTimeout(islandTimeoutUnload), (islandTimeoutUnload = null)),
          null != islandTimeoutLoad &&
            (clearTimeout(islandTimeoutLoad), (islandTimeoutLoad = null)),
          (islandTimeoutLoad = setTimeout(() => {
            mp.game.streaming.removeIpl("h4_islandx_sea_mines"),
              (islandTimeoutLoad = null);
          }, 2e3)),
          mp.events.call("client_weather_setSpecialWeather", "EXTRASUNNY"));
      },
      () => {
        isIslandLoaded &&
          ((isIslandLoaded = !1),
          mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", isIslandLoaded),
          mp.game.invoke("0x5E1460624D194A38", isIslandLoaded),
          null != islandTimeoutUnload &&
            (clearTimeout(islandTimeoutUnload), (islandTimeoutUnload = null)),
          null != islandTimeoutLoad &&
            (clearTimeout(islandTimeoutLoad), (islandTimeoutLoad = null)),
          (islandTimeoutUnload = setTimeout(() => {
            mp.game.streaming.requestIpl("h4_islandx_terrain_01_slod"),
              mp.game.streaming.requestIpl("h4_islandx_terrain_02_slod"),
              mp.game.streaming.requestIpl("h4_islandx_terrain_03_lod"),
              mp.game.streaming.requestIpl("h4_islandx_terrain_04_slod"),
              mp.game.streaming.requestIpl("h4_islandx_terrain_05_slod"),
              mp.game.streaming.requestIpl("h4_islandx_terrain_06_slod");
            const a = mp.game.interior.getInteriorAtCoords(
              4840.571,
              -5174.425,
              2
            );
            mp.game.interior.refreshInterior(a), (islandTimeoutUnload = null);
          }, 1550)),
          mp.events.call("client_weather_setSpecialWeather", ""));
      }
    ),
    mp.markers.new(27, new mp.Vector3(1283.24, -3331.5, 4.95), 9, {
      color: [255, 0, 0, 150],
      rotation: new mp.Vector3(0, 0, 0),
      bobUpAndDown: !0,
    }),
    new global.TriggerColshape(
      new mp.Vector3(1283.24, -3331.5, 4.9),
      0,
      8,
      () => {
        0 === localPlayer.dimension &&
          localPlayer.vehicle &&
          localPlayer.vehicle.getPedInSeat(-1) == localPlayer.handle &&
          !(60 < 3.6 * localPlayer.vehicle.getSpeed()) &&
          global.actionAntiFlood("server_cayoPerico_toIsland", 5e3) &&
          mp.events.callRemote("server_cayoPerico_toIsland");
      },
      () => {}
    ),
    mp.markers.new(27, new mp.Vector3(4900.16, -5192.03, 1.54), 9, {
      color: [255, 0, 0, 150],
      rotation: new mp.Vector3(0, 0, 0),
      bobUpAndDown: !0,
    }),
    new global.TriggerColshape(
      new mp.Vector3(4900.16, -5192.03, 1.44),
      0,
      8,
      () => {
        0 === localPlayer.dimension &&
          localPlayer.vehicle &&
          localPlayer.vehicle.getPedInSeat(-1) == localPlayer.handle &&
          !(60 < 3.6 * localPlayer.vehicle.getSpeed()) &&
          global.actionAntiFlood("server_cayoPerico_fromIsland", 5e3) &&
          mp.events.callRemote("server_cayoPerico_fromIsland");
      },
      () => {}
    ),
    mp.events.add("client_cayoPerico_teleport", (a) => {
      const b = [
        [
          [4899.87, -5211.17, 2.53, 300],
          [4906.32, -5221.31, 2.53, 311.47],
          [4909.08, -5224.7, 2.53, 311.57],
          [4911.64, -5228, 2.54, 311.37],
        ],
        [
          [1292.7, -3308.04, 5.92, 90],
          [1292.8, -3312.91, 5.92, 90],
          [1292.76, -3288.49, 5.92, 90],
          [1292.83, -3283.35, 5.92, 90],
          [1292.85, -3278.28, 5.92, 90],
        ],
      ][a ? 0 : 1][Math.floor(Math.random() * (a ? 4 : 5))];
      mp.api.player.transitionTeleportInVehicle({
        x: b[0],
        y: b[1],
        z: b[2],
        heading: b[3],
        onGround: !0,
        fadeOutTime: 500,
        fadeInTime: 2e3,
      });
    });
  const playerHouseList = new Map();
  mp.events.add("client_house_add", (a, b, c, d) => {
    const e = playerHouseList.get(a);
    e ||
      playerHouseList.set(a, {
        id: a,
        position: b,
        vehicleSpawnVector: d,
        dimension: c,
        blip: mp.blips.new(40, b, {
          shortRange: !1,
          scale: 1.1,
          color: 5,
          dimension: 0,
        }),
      });
  }),
    mp.events.add("client_house_remove", (a) => {
      const b = playerHouseList.get(a);
      b &&
        (mp.blips.exists(b.blip) && b.blip.destroy(),
        playerHouseList.delete(a));
    });
  const playerApartmentsList = new Map();
  mp.events.add("client_apartment_add", (a, b, c) => {
    const d = playerApartmentsList.get(a);
    d ||
      playerApartmentsList.set(a, {
        id: a,
        position: b,
        vehicleSpawnVector: c,
        blip: mp.blips.new(40, b, {
          shortRange: !1,
          scale: 1.1,
          color: 25,
          dimension: 0,
        }),
      });
  }),
    mp.events.add("client_apartment_remove", (a) => {
      const b = playerApartmentsList.get(a);
      b &&
        (mp.blips.exists(b.blip) && b.blip.destroy(),
        playerApartmentsList.delete(a));
    }),
    mp.keys.bind(76, !0, function () {
      if (!(mp.gui.cursor.visible || global.isChatOpen || global.disableKeys))
        for (const [a, b] of playerHouseList.entries())
          if (0 === localPlayer.dimension) {
            const { x: a, y: c, z: d } = b.position;
            if (
              3 >
              mp.game.system.vdist(
                a,
                c,
                d,
                localPlayer.position.x,
                localPlayer.position.y,
                localPlayer.position.z
              )
            )
              return void mp.events.callRemote("server_house_toggleDoor", b.id);
          } else if (localPlayer.dimension === b.dimension)
            return void mp.events.callRemote("server_house_toggleDoor", b.id);
    }),
    mp.keys.bind(69, !0, function () {
      if (
        !(
          mp.gui.cursor.visible ||
          global.isChatOpen ||
          global.disableKeys ||
          !localPlayer.vehicle ||
          0 !== localPlayer.dimension
        )
      ) {
        for (const [a, b] of playerHouseList.entries()) {
          const { x: a, y: c, z: d } = b.vehicleSpawnVector;
          if (
            4 >
            mp.game.system.vdist(
              a,
              c,
              d,
              localPlayer.position.x,
              localPlayer.position.y,
              localPlayer.position.z
            )
          )
            return void mp.events.callRemote(
              "server_house_vehHouseGarageEnter",
              b.id
            );
        }
        for (const [a, b] of playerApartmentsList.entries()) {
          const { x: a, y: c, z: d } = b.vehicleSpawnVector;
          if (
            5 >
            mp.game.system.vdist(
              a,
              c,
              d,
              localPlayer.position.x,
              localPlayer.position.y,
              localPlayer.position.z
            )
          )
            return void mp.events.callRemote(
              "server_house_vehApartmentGarageEnter",
              b.id
            );
        }
      }
    }),
    mp.events.add("client_house_tp", (a, b, c) => {
      mp.api.player.transitionTeleport({
        x: a,
        y: b,
        z: c,
        heading: 0,
        fadeOutTime: 1e3,
        fadeInTime: 500,
        freeze: !0,
      });
    });
  function loadAnimDict(a, b) {
    if (mp.game.streaming.hasAnimDictLoaded(a)) return void b();
    mp.game.streaming.requestAnimDict(a);
    let c = setInterval(function () {
      mp.game.streaming.hasAnimDictLoaded(a) && (clearInterval(c), b());
    }, 100);
  }
}
ཀྵﱱ̮;
