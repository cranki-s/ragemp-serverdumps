{
  (() => {
    const a = [
        new mp.Vector3(2284.51, 1717.81, 68.04),
        new mp.Vector3(2134.38, 1940.06, 93.79),
        new mp.Vector3(2100.2, 2329.26, 94.28),
      ],
      b = [
        [
          [new mp.Vector3(2295.5, 1711.91, 68.04), 180],
          [new mp.Vector3(2302.24, 1720.09, 68.04), 270],
          [new mp.Vector3(2294.15, 1722.34, 68.04), 270],
          [new mp.Vector3(2286.31, 1718.2, 68.04), 270],
          [new mp.Vector3(2286.24, 1720.94, 68.04), 270],
          [new mp.Vector3(2275.59, 1720.15, 68.04), 270],
          [new mp.Vector3(2278.68, 1718.15, 68.04), 270],
          [new mp.Vector3(2281.13, 1716.56, 68.04), 0],
          [new mp.Vector3(2281.07, 1722.57, 68.04), 180],
        ],
        [
          [new mp.Vector3(2139.39, 1926.78, 93.82), 180],
          [new mp.Vector3(2139.49, 1924.41, 93.93), 0],
          [new mp.Vector3(2131.23, 1924.35, 93.93), 0],
          [new mp.Vector3(2131.09, 1927.1, 93.93), 180],
          [new mp.Vector3(2131.49, 1930.96, 93.93), 180],
          [new mp.Vector3(2140.18, 1931.02, 93.93), 180],
          [new mp.Vector3(2141.19, 1936.93, 93.77), 270],
          [new mp.Vector3(2136.75, 1934.76, 93.93), 270],
          [new mp.Vector3(2135.77, 1947.69, 93.82), 270],
          [new mp.Vector3(2137.71, 1950.17, 93.93), 180],
          [new mp.Vector3(2142.21, 1947.7, 93.84), 90],
        ],
        [
          [new mp.Vector3(2108.01, 2316.18, 94.28), 0],
          [new mp.Vector3(2108.8, 2318.93, 94.28), 0],
          [new mp.Vector3(2108.74, 2321.54, 94.28), 180],
          [new mp.Vector3(2106.87, 2323.19, 94.29), 0],
          [new mp.Vector3(2110.61, 2322.95, 94.28), 0],
          [new mp.Vector3(2112.49, 2324.87, 94.28), 90],
          [new mp.Vector3(2104.83, 2324.75, 94.29), 270],
          [new mp.Vector3(2092.51, 2317.35, 94.29), 0],
          [new mp.Vector3(2092.34, 2319.57, 94.28), 180],
          [new mp.Vector3(2094.06, 2319.94, 94.29), 0],
          [new mp.Vector3(2095.83, 2322.52, 94.29), 90],
          [new mp.Vector3(2089.24, 2322.41, 94.28), 270],
          [new mp.Vector3(2089.26, 2328.28, 94.29), 270],
          [new mp.Vector3(2095.69, 2328.15, 94.29), 90],
          [new mp.Vector3(2094.12, 2334.6, 94.29), 0],
          [new mp.Vector3(2090.39, 2334.73, 94.29), 0],
          [new mp.Vector3(2108.31, 2340.78, 94.28), 0],
        ],
      ];
    let c = null,
      d = [],
      e = null,
      f = !1,
      g = !1;
    global.registerFamilyQuest({
      code: "DANGEROUS_PATH",
      onStart: (g) => {
        mp.blips.exists(c) && c.destroy(),
          d.forEach((a) => a.destroy()),
          (d = []),
          mp.blips.exists(e) && e.destroy();
        const h = a[g];
        c = mp.blips.new(769, h, { color: 75, shortRange: !1, name: "?" });
        const i = b[g];
        (d = i.map(
          (a) =>
            new global.ActionColshape(
              a[0],
              0,
              2,
              "\u0443\u043A\u0440\u0430\u0441\u0442\u044C \u0441\u0445\u0435\u043C\u044B",
              () => {
                if (!f) {
                  if (
                    ((f = !0),
                    global.disableChatAndKeys(!0),
                    global.setCameraToPlayer(
                      1,
                      new mp.Vector3(0, 0, 1),
                      new mp.Vector3(0, 0, 0.4),
                      180,
                      1300
                    ),
                    global.menuBrowser.execute(
                      `startArrowDanceGame('__client_dangerousPathQuest_end')`
                    ),
                    mp.players.local.setHeading(a[1]),
                    !mp.game.streaming.hasAnimDictLoaded(
                      "mp_missheist_countrybank@fetch_code"
                    ))
                  )
                    for (
                      mp.game.streaming.requestAnimDict(
                        "mp_missheist_countrybank@fetch_code"
                      );
                      !mp.game.streaming.hasAnimDictLoaded(
                        "mp_missheist_countrybank@fetch_code"
                      );

                    )
                      mp.game.wait(0);
                  mp.players.local.taskPlayAnim(
                    "mp_missheist_countrybank@fetch_code",
                    "fetch_code_loop_high",
                    1,
                    0,
                    -1,
                    1,
                    1,
                    !1,
                    !1,
                    !1
                  );
                }
              }
            )
        )),
          (e = mp.blips.new(367, new mp.Vector3(2419.93, 4988.94, 46.06), {
            color: 25,
            shortRange: !1,
            name: "?",
            scale: 1.5,
          }));
      },
      onEnd: () => {
        mp.blips.exists(c) && c.destroy(),
          d.forEach((a) => a.destroy()),
          (d = []),
          mp.blips.exists(e) && e.destroy();
      },
      localObjects: [],
    }),
      mp.events.add("__client_dangerousPathQuest_end", (a) => {
        f &&
          ((f = !1),
          (g = a),
          global.disableChatAndKeys(!1),
          global.resetCamera(),
          mp.players.local.clearTasksImmediately(),
          a
            ? (mp.events.callRemote("server_crimeContract_endDangerousPath"),
              mp.api.notify.success(
                "\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u0435\u043C\u043E\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u0441\u0445\u0435\u043C\u044B, \u0441\u043A\u043E\u0440\u0435\u0435 \u043E\u0442\u0432\u0435\u0437\u0438\u0442\u0435 \u0438\u0445 \u043D\u0430 \u0447\u0435\u0440\u043D\u044B\u0439 \u0440\u044B\u043D\u043E\u043A"
              ))
            : mp.api.notify.error(
                "\u0423 \u0432\u0430\u0441 \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u0443\u043A\u0440\u0430\u0441\u0442\u044C \u0441\u0445\u0435\u043C\u044B"
              ));
      }),
      mp.events.add("__client_dangerousPathQuest_error", (a) =>
        0 === a
          ? ((g = !0),
            void mp.api.notify.error(
              "\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0432\u044B \u0443\u0436\u0435 \u0443\u043A\u0440\u0430\u043B\u0438 \u0441\u0445\u0435\u043C\u044B, \u0432\u0430\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u0441\u0432\u0435\u0442\u0438\u0442\u044C\u0441\u044F \u0432 \u044D\u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435"
            ))
          : 1 === a
          ? ((g = !1),
            void mp.api.notify.error(
              "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043C\u0435\u0441\u0442\u0430 \u0432 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u0435"
            ))
          : void 0
      );
  })(),
    (() => {
      const a = [
        [696.55, 169.57, 79.95, 158, 0],
        [694.89, 164.79, 79.75, 346, 1],
        [675.58, 164.49, 79.93, 346, 2],
        [681.55, 162.22, 79.93, 346, 3],
        [692.59, 146.92, 79.96, 346, 4],
        [671.97, 144.8, 79.75, 346, 5],
        [674.08, 150.71, 79.75, 157, 6],
        [684.93, 128.37, 79.75, 157, 7],
        [664.27, 125.8, 79.92, 157, 8],
        [666.19, 121.37, 79.92, 336, 9],
        [682.62, 122.15, 79.75, 336, 10],
        [680.21, 105.16, 79.91, 336, 11],
        [674.26, 107.22, 79.91, 336, 12],
        [678.43, 110.01, 79.91, 163, 13],
        [703.38, 106.53, 79.94, 335, 14],
        [707.61, 108.93, 79.94, 161, 15],
        [711.53, 128.49, 79.75, 161, 16],
        [701.66, 111.27, 79.94, 161, 17],
        [709.16, 122.52, 79.9, 337, 18],
      ];
      for (const b of a)
        new global.ActionColshape(
          new mp.Vector3(b[0], b[1], b[2]),
          0,
          2,
          "\u0434\u043E\u0441\u0442\u0430\u0442\u044C \u0441\u0445\u0435\u043C\u0443",
          () => {
            global.actionAntiFlood(
              "server_crimeContract_startRobECircuit",
              2e3
            ) &&
              (mp.players.local.setHeading(b[3]),
              mp.events.callRemote(
                "server_crimeContract_startRobECircuit",
                b[4]
              ));
          }
        );
    })(),
    (() => {
      let a = [],
        b = [];
      mp.events.add("client_robHosue_create", (c, d, e) => {
        (e = JSON.parse(e)),
          a.forEach((a) => mp.markers.exists(a) && a.destroy()),
          (a = []),
          b.forEach((a) => a.destroy()),
          (b = []);
        for (let f = 0; f < c; f++) {
          const [c, g, h] = e[f],
            i = mp.markers.new(27, new mp.Vector3(c, g, h + 0.6), 0.7, {
              color: [255, 0, 0, 255],
              bobUpAndDown: !0,
              dimension: d,
            }),
            j = new global.ActionColshape(
              new mp.Vector3(c, g, h),
              d,
              0.5,
              "\u0443\u043A\u0440\u0430\u0441\u0442\u044C",
              () => {
                j.destroy(),
                  mp.markers.exists(i) && i.destroy(),
                  mp.events.callRemote("server_robHosue_take");
              }
            );
          b.push(j), a.push(i);
        }
      });
    })(),
    (() => {
      var a = Math.round;
      let b = null,
        c = null,
        d = null,
        e = null;
      mp.events.add("client_vehicleTheft_point", (a, f, g, h) => {
        mp.blips.exists(c) && c.destroy(),
          mp.markers.exists(d) && d.destroy(),
          e && (e.destroy(), (e = null)),
          mp.blips.exists(b) && b.destroy(),
          mp.events.call("client_quest_end", "LOCAL_VEHICLE_THEFT");
        void 0 === a ||
          (a &&
            mp.events.call(
              "client_quest_new",
              "LOCAL_VEHICLE_THEFT",
              `Угон авто`,
              `Доставьте угнанный автомобиль на точку сдачи, отмеченную на карте флажком.`,
              0,
              1
            ),
          (c = mp.blips.new(315, new mp.Vector3(f, g, h), {
            color: a ? 6 : 38,
            shortRange: !1,
            dimension: 0,
          })),
          (d = mp.markers.new(27, new mp.Vector3(f, g, h + 1), 4.5, {
            color: [255, 0, 0, 150],
            rotation: new mp.Vector3(0, 0, 0),
            bobUpAndDown: !0,
          })),
          (e = new global.TriggerColshape(
            new mp.Vector3(f, g, h),
            0,
            3,
            () => {
              mp.players.local.vehicle &&
                mp.players.local.vehicle.getPedInSeat(-1) ==
                  mp.players.local.handle &&
                !(60 < 3.6 * mp.players.local.vehicle.getSpeed()) &&
                global.actionAntiFlood("server_vehicleTheft_end", 5e3) &&
                mp.events.callRemote("server_vehicleTheft_end");
            },
            () => {}
          )));
      }),
        mp.events.add("client_vehicleTheft_start", (c, d, e, f, g, h, i) => {
          mp.events.call(
            "client_quest_new",
            "LOCAL_VEHICLE_THEFT",
            `Угон авто`,
            `Поезжайте ${c} и забери оттуда ${d} ${e} цвета, номер ${f}.`,
            0,
            1
          ),
            mp.blips.exists(b) && b.destroy(),
            (b = mp.blips.new(9, new mp.Vector3(g, h, 1), {
              name: "",
              scale: 1,
              color: 37,
              alpha: 200,
              drawDistance: 100,
              shortRange: !0,
              rotation: 0,
              dimension: 0,
              radius: a(i),
            }));
        }),
        mp.events.add("client_vehicleTheft_crack", () => {});
      const f = (a) => {
        "vehicle" === a.type &&
          a.getVariable("vehTheftCrack") &&
          (a.__policeTheftVehTimer && clearInterval(a.__policeTheftVehTimer),
          (a.__policeTheftVehTimer = setInterval(
            () =>
              mp.vehicles.exists(a) && 0 !== a.handle
                ? void (mp.blips.exists(a.__policeTheftVehBlip)
                    ? 100 >
                      mp.game.system.vdist(
                        a.position.x,
                        a.position.y,
                        a.position.z,
                        mp.players.local.position.x,
                        mp.players.local.position.y,
                        mp.players.local.position.z
                      )
                      ? (a.__policeTheftVehBlip.setPosition(
                          a.position.x,
                          a.position.y,
                          a.position.z
                        ),
                        a.__policeTheftVehBlip.setAlpha(255))
                      : a.__policeTheftVehBlip.setAlpha(0)
                    : ((a.__policeTheftVehBlip = mp.blips.new(229, a.position, {
                        shortRange: !1,
                        color: 1,
                      })),
                      a.__policeTheftVehBlip.setAlpha(0)))
                : (mp.blips.exists(a.__policeTheftVehBlip) &&
                    (a.__policeTheftVehBlip.destroy(),
                    delete a.__policeTheftVehBlip),
                  clearInterval(a.__policeTheftVehTimer),
                  void delete a.__policeTheftVehTimer),
            25
          )));
      };
      for (const a of ["F_LSPD", "F_LSSD"])
        global.registerFactionEvent({
          factionId: a,
          onEnter: () => {
            mp.events.add("entityStreamIn", f);
          },
          onLeave: () => {
            mp.events.remove("entityStreamIn", f);
          },
        });
      mp.events.add("client_vehicleTheft_notify", (b, c, d, e, f, g) => {
        mp.events.call(
          "clientFunc_notify",
          "info",
          `Поступило сообщение об угоне автомобиля, координаты, ориентировка и прочая информация переданы в рацию.`
        ),
          mp.gui.chat.push(
            `!{5999FF}[R] ${c} ${d} цвета находится в угоне, последний раз видели по координатам !{FFFFFF}|v|${a(
              e
            )},${a(f)},${a(g)}|v|`
          ),
          mp.gui.chat.push(`!{5999FF}[R] Скупка производится где-то ${b}.`);
      });
    })(),
    (() => {
      var a = Math.round;
      const b = mp.players.local,
        c = 2,
        d = "anim@mp_player_intuppersurrender",
        e = "idle_a";
      let f = !1,
        g = null,
        h = 0,
        i = 0,
        j = 0,
        k = 100,
        l = 0,
        m = !1;
      global.ServerPed.registerControllerScript("SHOP_ROB_PED", {
        onStreamIn(a) {
          if (!f || a.__startCheck) return;
          const r = () => {
            if (
              null == a.entity.controller &&
              0 !== b.getDrawableVariation(1)
            ) {
              if (9 > global.getServerTime()[0]) return !1;
              const b = a.entity.getVariable("lastRobTime");
              if (b !== void 0)
                return (
                  b + 10800000 < mp.api.server.tick() &&
                  p(n()) &&
                  o(50).length >= c
                );
            }
            return !1;
          };
          let s = 0;
          (a.__startCheck = !0),
            (a.__interval = setInterval(() => {
              if (
                !mp.peds.exists(a.entity) ||
                0 === a.entity.handle ||
                (g !== a && a.entity.getVariable("robStart")) ||
                !f
              )
                return (
                  g === a && ((g = null), q("cef:factionCrimeRobShop:end")),
                  (a.__startCheck = !1),
                  clearInterval(a.__interval),
                  void (mp.blips.exists(a.__blip) && a.__blip.destroy())
                );
              const n = mp.game.player.getEntityIsFreeAimingAtRaw();
              if (g === a) {
                if (a.entity.controller !== b)
                  return void (
                    g === a && ((g = null), q("cef:factionCrimeRobShop:end"))
                  );
                if (m) a.entity.taskCombat(b.handle, 0, 16);
                else {
                  if (n === a.entity.handle)
                    (h += 0.05),
                      (l = mp.api.server.tick()),
                      q("cef:factionCrimeRobShop:per", h);
                  else if (l + 2e4 < mp.api.server.tick()) {
                    const c = a.entity.getCoords(!0),
                      d = b.position;
                    15 < mp.dist(c.x, c.y, c.z, d.x, d.y, d.z)
                      ? a.removeControllerStatus()
                      : (k = 9999);
                  }
                  let f = !1;
                  if (0 == ++s % 15) {
                    const d = a.entity.getVariable("defenderFaction"),
                      { x: e, y: g, z: h } = b.position;
                    let i = 0,
                      j = 0;
                    for (const a of mp.players.streamed) {
                      if (a === b) continue;
                      const c = a.getVariable("factionId");
                      if (!c) continue;
                      const { x: f, y: k, z: l } = a.position;
                      10 > mp.dist(e, g, h, f, k, l) &&
                        ("F_LSPD" === c || "F_LSSD" === c || (d && c === d)) &&
                        (c === d ? i++ : j++);
                    }
                    i > c
                      ? (mp.api.notify.info(
                          "\u041A\u0440\u044B\u0448\u0443\u044E\u0449\u0430\u044F \u043C\u0430\u0444\u0438\u044F \u043F\u0440\u0438\u0435\u0445\u0430\u043B\u0430 \u0437\u0430\u0449\u0438\u0449\u0430\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441, \u0443\u043D\u043E\u0441\u0438\u0442\u0435 \u043D\u043E\u0433\u0438!"
                        ),
                        (f = !0))
                      : j > c &&
                        (mp.api.notify.info(
                          "\u0421\u0438\u043B\u043E\u0432\u044B\u0435 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u044B \u043F\u0440\u0438\u0435\u0445\u0430\u043B\u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441, \u0443\u043D\u043E\u0441\u0438\u0442\u0435 \u043D\u043E\u0433\u0438!"
                        ),
                        (f = !0));
                  }
                  if (k > a.entity.getHealth() || h >= j)
                    return (
                      a.entity.setCanBeDamaged(!0),
                      a.entity.setCanRagdoll(!1),
                      a.entity.setCanRagdollFromPlayerImpact(!1),
                      a.entity.setProofs(!1, !0, !0, !0, !1, !0, !0, !0),
                      a.entity.setSuffersCriticalHits(!1),
                      a.entity.setCombatAbility(2),
                      a.entity.setCombatRange(2),
                      a.entity.setCombatMovement(3),
                      a.entity.setCombatAttributes(46, !0),
                      a.entity.setCombatAttributes(5, !0),
                      a.entity.setCombatAttributes(17, !1),
                      a.entity.setFleeAttributes(0, !0),
                      a.entity.setDiesInWater(!1),
                      a.entity.setCombatAttributes(16, !0),
                      a.entity.setConfigFlag(2, !0),
                      a.entity.setConfigFlag(188, !0),
                      a.entity.clearTasksImmediately(),
                      a.entity.giveWeapon(
                        mp.game.joaat("weapon_pumpshotgun_mk2"),
                        9999,
                        !0
                      ),
                      (m = !0),
                      void q("cef:factionCrimeRobShop:end")
                    );
                  if ((mp.keys.isDown(70) && mp.keys.isDown(70) && h >= i) || f)
                    return void (
                      global.actionAntiFlood("s:crime:robShop:end", 5e3) &&
                      mp.events.callRemote(
                        "s:crime:robShop:end",
                        a.entity.getVariable("robPedId"),
                        h / 100
                      )
                    );
                  const [g, o] =
                    50 < h ? ["random@robbery", "f_distressed_loop"] : [d, e];
                  mp.game.streaming.hasAnimDictLoaded(g)
                    ? !a.entity.isPlayingAnim(g, o, 3) &&
                      (a.entity.clearTasksImmediately(),
                      a.entity.taskPlayAnim(g, o, 8, -8, -1, 1, 0, !1, !1, !1))
                    : mp.game.streaming.requestAnimDict(g);
                }
              } else if (
                (n === a.entity.handle &&
                  r() &&
                  global.isPlayerHasNonMeleeWeapon() &&
                  global.actionAntiFlood("s:crime:robShop:start", 5e3) &&
                  mp.events.callRemote(
                    "s:crime:robShop:start",
                    a.entity.getVariable("robPedId")
                  ),
                0 == ++s % 15)
              ) {
                const b = r(),
                  c = mp.blips.exists(a.__blip);
                b && !c
                  ? (a.__blip = mp.blips.new(119, a.entity.position, {
                      name: "\u041E\u0433\u0440\u0430\u0431\u043B\u0435\u043D\u0438\u0435",
                      scale: 0.5,
                      color: 1,
                      dimension: 0,
                      shortRange: !1,
                    }))
                  : !b && c && a.__blip.destroy();
              }
            }, 150));
        },
        onStreamOut(a) {
          a.__startCheck &&
            (g === a && ((g = null), q("cef:factionCrimeRobShop:end")),
            (a.__startCheck = !1),
            clearInterval(a.__interval),
            mp.blips.exists(a.__blip) && a.__blip.destroy());
        },
        onChangeController(a, c) {
          var f = Math.floor;
          b === c
            ? ((g = a),
              (h = 0),
              (i = f(25 * Math.random()) + 10),
              (j = f(35 * Math.random()) + 65),
              (l = mp.api.server.tick()),
              (k = a.entity.getHealth()),
              (m = !1),
              q(
                "cef:factionCrimeRobShop:start",
                i,
                a.entity.getVariable("award")
              ),
              a.entity.setCanBeDamaged(!0),
              (a.deathNotifyEnable = !0))
            : null === c &&
              (a.entity.setBlockingOfNonTemporaryEvents(!0),
              a.entity.setAsMission(!0, !0),
              a.entity.setAlertness(0),
              a.entity.setCombatAttributes(17, !0),
              a.entity.setFleeAttributes(0, !1),
              a.entity.setCanBeDraggedOut(!1),
              a.entity.setCanBeDamaged(!1),
              a.entity.clearTasksImmediately(),
              mp.game.streaming.hasAnimDictLoaded(d) &&
                a.entity.taskPlayAnim(d, e, 8, -8, -1, 1, 0, !1, !1, !1));
        },
        onTick(a) {},
      });
      for (const a of [
        "F_GANG_BALLAS",
        "F_GANG_BLOODS",
        "F_GANG_GROVE",
        "F_GANG_MARABUNTA",
        "F_GANG_VAGOS",
      ])
        global.registerFactionEvent({
          factionId: a,
          onEnter: () => {
            f = !0;
          },
          onLeave: () => {
            f = !1;
          },
        });
      mp.events.add("c:factionCrimeRobShop:notifyMafia", (b, c, d, e) => {
        mp.gui.chat.push(
          `!{FF6347}Бандиты грабят ${b}, выезжайте на защиту! !{FFF}|v|${a(
            c
          )},${a(d)},${a(e)}|v|`
        ),
          (async () => {
            const a = mp.blips.new(0, new mp.Vector3(c, d, e), {
              radius: 30,
              dimension: 0,
              color: 1,
              alpha: 70,
            });
            await mp.game.waitAsync(600000), a.destroy();
          })();
      }),
        mp.events.add("c:factionCrimeRobShop:notifyPolice", (b, c, d, e) => {
          mp.gui.chat.push(
            `!{FF6347}Бандиты грабят ${b}, помешайте им! !{FFF}|v|${a(c)},${a(
              d
            )},${a(e)}|v|`
          ),
            (async () => {
              const a = mp.blips.new(0, new mp.Vector3(c, d, e), {
                radius: 30,
                dimension: 0,
                color: 1,
                alpha: 70,
              });
              await mp.game.waitAsync(600000), a.destroy();
            })();
        });
      const n = () => parseInt(b.getVariable("characterId")),
        o = (a = 0) => {
          const c = b.getVariable("factionId"),
            { x: d, y: e, z: f } = b.position;
          let g = [];
          for (const h of mp.players.streamed) {
            if (h === b || h.getVariable("factionId") !== c) continue;
            const { x: i, y: j, z: k } = h.position;
            mp.dist(d, e, f, i, j, k) < a &&
              0 !== h.getDrawableVariation(1) &&
              p(h.getVariable("characterId")) &&
              g.push(h);
          }
          return g;
        },
        p = (a) => {
          const b = mp.api.server.tick();
          for (const c of mp.peds.toArray()) {
            const d = c.getVariable("lastRobTime");
            if (void 0 === d) continue;
            const e = c.getVariable("lastRobCharacters");
            if (void 0 === e) continue;
            const f = e.split(" ").map((a) => parseInt(a));
            if (-1 !== f.indexOf(a) && d + 3600000 > b) return !1;
          }
          return !0;
        },
        q = (a, ...b) => global.menuBrowser.call(a, ...b);
    })(),
    (() => {
      const a = mp.players.local,
        b = [
          new mp.Vector3(476.93, -1022.11, 28.05),
          new mp.Vector3(1691.14, 2593.89, 45.56),
          new mp.Vector3(-447.06, 6000.4, 31.69),
        ];
      let c = null,
        d = -1;
      global.ServerPed.registerControllerScript("MAFIA_HOOKER", {
        onStreamIn(b) {
          if (
            (f || e) &&
            ((b.entity.__pedTargetAction = () => {
              b.entity.controller === a ||
                mp.events.callRemote("s:mafia:hooker:taskControll", b.id);
            }),
            f && b.entity.getVariable("hasController") && !b.__blip)
          ) {
            const a = mp.blips.new(384, b.entity.getCoords(!0), {
                color: 27,
                shortRange: !1,
                dimension: 0,
              }),
              c = setInterval(() => {
                if (!mp.peds.exists(b.entity) || 0 === b.entity.handle)
                  return clearInterval(c), a.destroy(), void (b.__blip = !1);
                const { x: d, y: e, z: f } = b.entity.getCoords(!0);
                a.setPosition(d, e, f);
              }, 85);
            b.__blip = !0;
          }
        },
        onStreamOut(a) {
          e && mp.blips.exists(c) && c.destroy();
        },
        onChangeController(b, d) {
          e && mp.blips.exists(c) && c.destroy(),
            d === a
              ? (e &&
                  ((c = mp.blips.new(0, b.entity.getVariable("point"), {
                    color: 1,
                    dimension: 0,
                    shortRange: !1,
                    name: "",
                  })),
                  c.setRoute(!0),
                  c.setRouteColour(1)),
                b.entity.setCanBeDamaged(!0),
                b.entity.setCanRagdoll(!0),
                b.entity.setCanRagdollFromPlayerImpact(!0),
                b.entity.setProofs(!1, !0, !0, !1, !1, !0, !0, !0),
                b.entity.setSuffersCriticalHits(!1),
                b.entity.setInvincible(!1),
                b.entity.clearTasksImmediately(),
                b.entity.setBlockingOfNonTemporaryEvents(!0),
                b.entity.setAsMission(!0, !0),
                (b.deathNotifyEnable = !0))
              : null == d &&
                (b.entity.setCanBeDamaged(!1),
                b.entity.setCanRagdoll(!1),
                b.entity.setCanRagdollFromPlayerImpact(!1),
                b.entity.setProofs(!0, !0, !0, !0, !0, !0, !0, !0),
                b.entity.setSuffersCriticalHits(!1),
                b.entity.setInvincible(!0),
                b.entity.setBlockingOfNonTemporaryEvents(!0),
                b.entity.setAsMission(!0, !0));
        },
        onTick(c) {
          const g = Date.now(),
            { x: h, y: i, z: j } = c.entity.getCoords(!0);
          if (e) {
            const a = c.entity.getVariable("point");
            if (10 > mp.dist(a.x, a.y, a.z, h, i, j))
              return void mp.events.callRemote("s:mafia:hooker:end", c.id);
          } else if (f)
            for (const a of b)
              if (10 > mp.dist(a.x, a.y, a.z, h, i, j))
                return void mp.events.callRemote("s:mafia:hooker:end", c.id);
          if (!a.vehicle) {
            if (c.entity.isInAnyVehicle(!0))
              return void (
                d + 5e3 < g && ((d = g), c.entity.taskLeaveAnyVehicle(0, 0))
              );
            c.entity.taskFollowToOffsetOf(a.handle, 0, 0, 0, 1, -1, 1, !0);
          } else if (
            d + 5e3 < g &&
            !c.entity.isInVehicle(a.vehicle.handle, !0)
          ) {
            d = g;
            for (let b = 0; b < a.vehicle.getMaxNumberOfPassengers(); b++)
              if (a.vehicle.isSeatFree(b))
                return void c.entity.taskEnterVehicle(
                  a.vehicle.handle,
                  5e3,
                  b,
                  1,
                  1,
                  0
                );
          }
        },
      });
      let e = !1,
        f = !1;
      for (const a of [
        "F_ARMENIAMAFIA",
        "F_ITALYMAFIA",
        "F_MEXICOMAFIA",
        "F_RUSSIANMAFIA",
        "F_YAKUZA",
      ])
        global.registerFactionEvent({
          factionId: a,
          onEnter: () => {
            e = !0;
          },
          onLeave: () => {
            e = !1;
          },
        });
      for (const a of ["F_LSPD", "F_LSSD", "F_FIB"])
        global.registerFactionEvent({
          factionId: a,
          onEnter: () => {
            f = !0;
          },
          onLeave: () => {
            f = !1;
          },
        });
    })(),
    (() => {
      mp.objects.new(
        mp.game.joaat("prop_elecbox_24b"),
        new mp.Vector3(-2251.89, 3482.68, 29.07),
        { rotation: new mp.Vector3(0, 0, -89.75), dimension: 0 }
      );
      let a = !1,
        b = null,
        c = null,
        d = null,
        e = null,
        f = null;
      for (const d of [
        "F_GANG_BALLAS",
        "F_GANG_BLOODS",
        "F_GANG_GROVE",
        "F_GANG_MARABUNTA",
        "F_GANG_VAGOS",
        "F_YAKUZA",
        "F_RUSSIANMAFIA",
        "F_MEXICOMAFIA",
        "F_ITALYMAFIA",
        "F_ARMENIAMAFIA",
      ])
        global.registerFactionEvent({
          factionId: d,
          onEnter: () => {
            b && b.destroy(),
              (b = new global.ActionColshape(
                new mp.Vector3(-2250.45, 3480.55, 29.44),
                0,
                1,
                "\u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0424\u043E\u0440\u0442\u0430 \u0417\u0430\u043D\u043A\u0443\u0434\u043E",
                () => {
                  a || mp.events.callRemote("server_fort_startAttack");
                }
              )),
              (b.onceMode = !0),
              mp.markers.exists(c) && c.destroy(),
              (c = mp.markers.new(
                1,
                new mp.Vector3(-2250.45, 3480.55, 29.44 - 0.15),
                1,
                {
                  direction: new mp.Vector3(0, 0, 0),
                  rotation: new mp.Vector3(0, 0, 0),
                  color: [237, 194, 21, 255],
                  visible: !0,
                  dimension: 0,
                }
              ));
          },
          onLeave: () => {
            b && b.destroy(), (b = null), mp.markers.exists(c) && c.destroy();
          },
        });
      global.registerFactionEvent({
        factionId: "F_LSARMY",
        onEnter: () => {
          a && n();
        },
        onLeave: () => {
          a &&
            (d && d.destroy(),
            (d = null),
            mp.markers.exists(e) && e.destroy(),
            mp.blips.exists(f) && f.destroy());
        },
      });
      let g = null,
        h = !1,
        i = !1,
        j = null;
      const k = [
          [
            [-2594.65, 2968.86],
            [-2475.14, 3573.37],
            [-3088.15, 3579.1],
            [-3198, 3251.03],
            [-2594.65, 2968.86],
          ],
        ],
        l = [
          [
            [-2594.65, 2968.86],
            [-2456.4, 2869.33],
            [-1814.42, 2675.32],
            [-1537.35, 2711.26],
            [-1448.33, 2796.19],
            [-1626.29, 3249.75],
            [-1957.72, 3439.87],
            [-2291.59, 3622.74],
            [-2457.66, 3677.07],
            [-2475.14, 3573.37],
            [-2594.65, 2968.86],
          ],
        ],
        m = async (b, c) => {
          var j = Math.sqrt,
            m = Math.pow;
          if (b && !a) {
            (a = !0),
              (g = setInterval(() => {
                const { x: a, y: b, z: c } = mp.players.local.position,
                  d =
                    900 > j(m(a - -2301.77, 2) + m(b - 3053.02, 2)) &&
                    ((26.03 <= c &&
                      mp.api.location.isPointInPolygon([a, b], k)) ||
                      mp.api.location.isPointInPolygon([a, b], l));
                return d && !h
                  ? ((h = !0),
                    mp.game.audio.startAlarm(
                      "PORT_OF_LS_HEIST_FORT_ZANCUDO_ALARMS",
                      !0
                    ),
                    mp.game.graphics.setLightsState(0, !0),
                    mp.game.graphics.setLightsState(1, !0),
                    mp.game.graphics.setLightsState(2, !0),
                    mp.game.graphics.setLightsState(3, !0),
                    mp.game.graphics.setLightsState(4, !0),
                    mp.game.graphics.setLightsState(5, !0),
                    mp.game.graphics.setLightsState(7, !0),
                    mp.game.graphics.setLightsState(8, !0),
                    mp.game.graphics.setLightsState(9, !0),
                    mp.game.graphics.setLightsState(10, !0),
                    mp.game.graphics.setLightsState(11, !0),
                    mp.game.graphics.setLightsState(12, !0),
                    mp.game.graphics.setLightsState(13, !0),
                    mp.game.graphics.setLightsState(14, !0),
                    mp.game.graphics.setLightsState(15, !0),
                    void mp.game.invoke("0xE2B187C0939B3D32", !1))
                  : !d && h
                  ? ((h = !1),
                    mp.game.graphics.setLightsState(0, !1),
                    mp.game.graphics.setLightsState(1, !1),
                    mp.game.graphics.setLightsState(2, !1),
                    mp.game.graphics.setLightsState(3, !1),
                    mp.game.graphics.setLightsState(4, !1),
                    mp.game.graphics.setLightsState(5, !1),
                    mp.game.graphics.setLightsState(7, !1),
                    mp.game.graphics.setLightsState(8, !1),
                    mp.game.graphics.setLightsState(9, !1),
                    mp.game.graphics.setLightsState(10, !1),
                    mp.game.graphics.setLightsState(11, !1),
                    mp.game.graphics.setLightsState(12, !1),
                    mp.game.graphics.setLightsState(13, !1),
                    mp.game.graphics.setLightsState(14, !1),
                    mp.game.graphics.setLightsState(15, !1),
                    void mp.game.invoke("0xE2B187C0939B3D32", !0))
                  : void 0;
              }, 1e3)),
              mp.game.audio.startAlarm(
                "PORT_OF_LS_HEIST_FORT_ZANCUDO_ALARMS",
                !0
              ),
              "F_LSARMY" === mp.players.local.getVariable("factionId") && n();
            let b = -1;
            const d = setInterval(async () => {
              if (!a) return void clearInterval(d);
              const { x: c, y: e, z: f } = mp.players.local.position;
              if ((b++, 25 > mp.dist(-2250.51, 3481.4, 30.81, c, e, f))) {
                if (0 != b % 15) return;
                if (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) {
                  mp.game.streaming.requestNamedPtfxAsset("core");
                  do await mp.game.waitAsync(10);
                  while (!mp.game.streaming.hasNamedPtfxAssetLoaded("core"));
                }
                mp.game.graphics.setPtfxAssetNextCall("core"),
                  mp.game.graphics.startParticleFxNonLoopedAtCoord(
                    "ent_dst_elec_fire",
                    -2250.51,
                    3481.4,
                    30.81,
                    0,
                    0,
                    0,
                    2,
                    !0,
                    !0,
                    !0
                  );
              } else if (25 > mp.dist(-2406.76, 3361.79, 33.75, c, e, f)) {
                if (!mp.game.streaming.hasNamedPtfxAssetLoaded("core")) {
                  mp.game.streaming.requestNamedPtfxAsset("core");
                  do await mp.game.waitAsync(10);
                  while (!mp.game.streaming.hasNamedPtfxAssetLoaded("core"));
                }
                mp.game.graphics.setPtfxAssetNextCall("core"),
                  mp.game.graphics.startParticleFxNonLoopedAtCoord(
                    "sp_foundry_sparks",
                    -2406.76,
                    3361.79,
                    33.75,
                    0,
                    270,
                    0,
                    1,
                    !0,
                    !0,
                    !0
                  );
              }
            }, 1e3);
            if (!c) return;
            const { x: e, y: f } = mp.players.local.position;
            900 > j(m(e - -2301.77, 2) + m(f - 3053.02, 2)) &&
              ("F_LSARMY" === mp.players.local.getVariable("factionId") &&
                mp.gui.chat.push(
                  `!{5999FF}[R] На форт напали! Отбивайтесь от нападающих и почините электричество, чтобы закрыть ворота.`
                ),
              mp.game.audio.playSoundFrontend(
                -1,
                "Failure",
                "DLC_HEIST_HACKING_SNAKE_SOUNDS",
                !0
              ));
          }
          !b &&
            a &&
            ((a = !1),
            clearInterval(g),
            h &&
              (mp.game.graphics.setLightsState(0, !1),
              mp.game.graphics.setLightsState(1, !1),
              mp.game.graphics.setLightsState(2, !1),
              mp.game.graphics.setLightsState(3, !1),
              mp.game.graphics.setLightsState(4, !1),
              mp.game.graphics.setLightsState(5, !1),
              mp.game.graphics.setLightsState(7, !1),
              mp.game.graphics.setLightsState(8, !1),
              mp.game.graphics.setLightsState(9, !1),
              mp.game.graphics.setLightsState(10, !1),
              mp.game.graphics.setLightsState(11, !1),
              mp.game.graphics.setLightsState(12, !1),
              mp.game.graphics.setLightsState(13, !1),
              mp.game.graphics.setLightsState(14, !1),
              mp.game.graphics.setLightsState(15, !1),
              mp.game.invoke("0xE2B187C0939B3D32", !0),
              (h = !1)),
            (i = !1),
            mp.game.audio.stopAlarm("PORT_OF_LS_HEIST_FORT_ZANCUDO_ALARMS", !0),
            d && d.destroy(),
            (d = null),
            mp.markers.exists(e) && e.destroy(),
            mp.blips.exists(f) && f.destroy());
        },
        n = () => {
          d && d.destroy(),
            (d = null),
            mp.markers.exists(e) && e.destroy(),
            mp.blips.exists(f) && f.destroy(),
            (d = new global.ActionColshape(
              new mp.Vector3(-2405.72, 3361.28, 31.83),
              0,
              1,
              "\u0447\u0438\u043D\u0438\u0442\u044C \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u0442\u0432\u043E",
              () => {
                i || mp.events.callRemote("server_fort_defend_task");
              }
            )),
            (d.onceMode = !0),
            (e = mp.markers.new(
              1,
              new mp.Vector3(-2405.72, 3361.28, 31.83 - 0.15),
              1,
              {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [237, 194, 21, 255],
                visible: !0,
                dimension: 0,
              }
            )),
            (f = mp.blips.new(402, new mp.Vector3(-2405.72, 3361.28, 31.83), {
              color: 1,
              dimension: 0,
              shortRange: !1,
              scale: 1,
              name: "???",
            }));
        };
      mp.events.add("client_fort_startDefend", async (a, b) => {
        if (i) return;
        i = !0;
        const c = mp.players.local;
        null !== j && clearInterval(j),
          (j = setInterval(() => {
            const { x: d, y: e, z: f } = c.position;
            return global.isPlayerDeath ||
              10 < mp.dist(d, e, f, -2405.72, 3361.28, 31.83) ||
              0 !== c.dimension ||
              a >= b
              ? ((i = !1),
                clearInterval(j),
                (j = null),
                c.clearTasksImmediately(),
                a >= b
                  ? mp.events.callRemote("server_fort_defend_end")
                  : mp.events.callRemote("server_fort_defend_stop", a),
                global.hideUI(!1),
                global.disableChatAndKeys(!1),
                void global.mainBrowser.execute(`mainHud.progressStop();`))
              : void (a++,
                global.mainBrowser.execute(
                  `mainHud.progressValue(${100 * (a / b)});`
                ));
          }, 1e3)),
          global.hideUI(!0),
          global.disableChatAndKeys(!0),
          global.mainBrowser.execute(
            `mainHud.progressStart('Починка электричества', ${
              100 * (a / b)
            }, 400);`
          ),
          c.setCoordsNoOffset(-2406.28, 3361.46, 32.83, !1, !1, !1),
          c.setHeading(63.91);
      }),
        new global.CustomScenarioAnimWithItem(
          "armyDefendRepair",
          ["armyDefendRepairItem1", "armyDefendRepairItem2"],
          "amb@world_human_welding@male@idle_a",
          "idle_a",
          1
        ),
        mp.attachmentMngr.register(
          "armyDefendRepairItem1",
          "prop_weld_torch",
          28422,
          new mp.Vector3(0, 0, 0),
          new mp.Vector3(0, 0, 0)
        ),
        mp.attachmentMngr.register(
          "armyDefendRepairItem2",
          "prop_welding_mask_01",
          31086,
          new mp.Vector3(0.12, 0.01, 0),
          new mp.Vector3(180, 90, 0)
        ),
        mp.api.data.onChange("fortAttack", (a) => {
          m(a, !0);
        }),
        mp.events.add("serverWorldDataReady", () => {
          m(mp.api.data.get("fortAttack"), !1);
        }),
        mp.objects.new(
          mp.game.joaat("prop_gatecom_02"),
          new mp.Vector3(-2319.29, 3399.13, 31.19),
          { rotation: new mp.Vector3(0, 0, 141.35), dimension: 0 }
        ),
        (new global.ActionColshape(
          new mp.Vector3(-1574.28, 2778.32, 16.15),
          0,
          1,
          "\u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C \u0432 \u0438\u043D\u0442\u0435\u0440\u043A\u043E\u043C",
          () => {
            global.actionAntiFlood("server_fort_taskOpenDoor", 3e4) &&
              mp.events.callRemote("server_fort_taskOpenDoor", 0);
          }
        ).onceMode = !0),
        mp.objects.new(
          mp.game.joaat("prop_gatecom_02"),
          new mp.Vector3(-1574.7, 2778.74, 17.46),
          { rotation: new mp.Vector3(0, 0, -48.92), dimension: 0 }
        ),
        (new global.ActionColshape(
          new mp.Vector3(-2319.71, 3399.35, 29.73),
          0,
          1,
          "\u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C \u0432 \u0438\u043D\u0442\u0435\u0440\u043A\u043E\u043C",
          () => {
            global.actionAntiFlood("server_fort_taskOpenDoor", 3e4) &&
              mp.events.callRemote("server_fort_taskOpenDoor", 1);
          }
        ).onceMode = !0);
    })();
}
