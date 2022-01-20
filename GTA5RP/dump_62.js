{
  const localPlayer = mp.players.local;
  (() => {
    var c = Math.sqrt,
      d = Math.pow;
    new CustomScenarioAnimWithItem(
      "scenNeutralContractJunk",
      "scenNeutralContractJunkItem",
      "anim@heists@narcotics@trash",
      "idle",
      49
    ),
      mp.attachmentMngr.register(
        "scenNeutralContractJunkItem",
        "bkr_prop_fakeid_binbag_01",
        28422,
        new mp.Vector3(-0.08, 0.06, -0.55),
        new mp.Vector3(0, 0, 2)
      );
    let a = null,
      b = null,
      e = null,
      f = !1,
      g = null,
      h = null,
      i = null,
      j = -1;
    const k = [
        new mp.Vector3(-337.49, -2786.47, 4),
        new mp.Vector3(-528.3, -2888.13, 5),
        new mp.Vector3(-374.68, -2732.93, 5.04),
        new mp.Vector3(-318.65, -2728.54, 5),
        new mp.Vector3(628.8, -2992.58, 5.05),
        new mp.Vector3(785.36, -3188.76, 4.9),
        new mp.Vector3(996.89, -2540.46, 27.46),
        new mp.Vector3(1279.2, -2560.54, 42.64),
        new mp.Vector3(1071.03, -2387.63, 29.48),
        new mp.Vector3(948.49, -2365.34, 29.53),
        new mp.Vector3(873.46, -2419.55, 26.99),
        new mp.Vector3(811.66, -2228.49, 28.75),
        new mp.Vector3(842.43, -2252.65, 29.22),
        new mp.Vector3(887.43, -2201.98, 29.52),
        new mp.Vector3(856.11, -2197.28, 29.67),
        new mp.Vector3(167.26, -2225.73, 5.17),
        new mp.Vector3(97.57, -2222.96, 5.17),
        new mp.Vector3(102.83, -2182.52, 4.95),
        new mp.Vector3(-60.15, -2252.58, 6.81),
        new mp.Vector3(-161.2, -2217.41, 6.81),
        new mp.Vector3(-463.98, -2284.45, 6.61),
        new mp.Vector3(-701.11, -2446.88, 12.94),
        new mp.Vector3(-641.62, -2348.36, 12.94),
        new mp.Vector3(-1052.03, -2085.31, 12.35),
        new mp.Vector3(-820.54, -2094.73, 7.81),
        new mp.Vector3(-608.88, -1785.03, 22.64),
        new mp.Vector3(-1084.7, -1667.73, 3.7),
        new mp.Vector3(-1096.86, -1630.72, 3.4),
        new mp.Vector3(-1109.86, -1626.25, 3.49),
        new mp.Vector3(-1126.38, -1599.61, 3.38),
        new mp.Vector3(-1145.25, -1539.92, 3.37),
        new mp.Vector3(-1161.18, -1456.44, 3.33),
        new mp.Vector3(-1126.75, -1455.74, 3.94),
        new mp.Vector3(-1192.53, -1514.6, 3.37),
        new mp.Vector3(-1099.28, -1287.32, 4.46),
        new mp.Vector3(-1130.82, -1414.64, 4.15),
        new mp.Vector3(-1095.11, -1253.8, 4.33),
        new mp.Vector3(-1255.84, -864.59, 11.33),
        new mp.Vector3(-1284.49, -825.45, 16.11),
        new mp.Vector3(-1304.92, -799.18, 16.57),
        new mp.Vector3(-1815.13, -1231.67, 12.02),
        new mp.Vector3(-1305.54, -773.12, 18.7),
        new mp.Vector3(-1502.11, -889.29, 9.11),
        new mp.Vector3(-1478.15, -899.51, 9.02),
        new mp.Vector3(-1989.07, -489.34, 10.61),
        new mp.Vector3(-1461.24, -626.35, 29.76),
        new mp.Vector3(-1422.67, -661.65, 27.67),
        new mp.Vector3(-1452.3, -676.95, 25.47),
        new mp.Vector3(-1146.13, -1445.96, 3.65),
        new mp.Vector3(-1151.26, -1266.25, 5.85),
        new mp.Vector3(-1228.05, -1219.07, 5.99),
        new mp.Vector3(-1094.2, -1253.75, 4.35),
        new mp.Vector3(-1170.56, -1100.38, 1.42),
        new mp.Vector3(-1180.64, -1090.53, 1.27),
        new mp.Vector3(-1127.82, -943.65, 1.64),
        new mp.Vector3(-1367.51, -667.21, 25.68),
        new mp.Vector3(-1379.12, -639.43, 27.67),
        new mp.Vector3(-1792.67, -397.32, 43.99),
        new mp.Vector3(-1799.91, -407.2, 43.74),
        new mp.Vector3(-2034.26, -257.29, 22.39),
        new mp.Vector3(-347.49, -101.95, 44.66),
        new mp.Vector3(-360.45, -145.64, 37.25),
        new mp.Vector3(-965, -185.44, 36.8),
        new mp.Vector3(-1394.08, -444.4, 33.48),
        new mp.Vector3(-1503.99, -511.41, 31.81),
        new mp.Vector3(-1558.53, -478.39, 34.44),
        new mp.Vector3(-1565.46, -426.44, 36.91),
        new mp.Vector3(-1433.09, -395.24, 35.23),
        new mp.Vector3(-1440.43, -380.35, 37.04),
        new mp.Vector3(-1483.62, -335.3, 44.91),
        new mp.Vector3(-1499.22, -187.18, 49.4),
        new mp.Vector3(-310.51, 74.87, 65.18),
        new mp.Vector3(-261.05, 74.24, 64.95),
        new mp.Vector3(-548.14, 297.49, 82.02),
        new mp.Vector3(-619.48, 325.66, 81.26),
        new mp.Vector3(-622.32, 302.02, 81.24),
        new mp.Vector3(265.15, 276.03, 104.62),
        new mp.Vector3(373.47, 351.42, 101.8),
        new mp.Vector3(380.08, 251.36, 102.04),
        new mp.Vector3(320.38, -183.07, 56.43),
        new mp.Vector3(351.4, -195.47, 56.23),
        new mp.Vector3(316.08, -215.83, 53.09),
        new mp.Vector3(258.89, 377.59, 104.53),
        new mp.Vector3(220.87, 390.37, 105.75),
        new mp.Vector3(195.69, 335.82, 104.55),
        new mp.Vector3(175.34, 306.42, 104.37),
        new mp.Vector3(449.38, -574.66, 27.5),
        new mp.Vector3(475.64, -599.97, 27.5),
        new mp.Vector3(452.72, -917.19, 27.47),
        new mp.Vector3(-43.6, -1300, 28.07),
        new mp.Vector3(-77.33, -1383.53, 28.32),
        new mp.Vector3(94.52, -1437.87, 28.29),
        new mp.Vector3(83.74, -1292.33, 28.26),
        new mp.Vector3(120.99, -1326.93, 28.38),
        new mp.Vector3(164.52, -1286.51, 28.3),
        new mp.Vector3(144.28, -1262.78, 28.25),
        new mp.Vector3(146.26, -1289.06, 28.33),
        new mp.Vector3(732.22, -1333.75, 25.3),
        new mp.Vector3(739.76, -987.84, 23.59),
        new mp.Vector3(693.81, -970.51, 22.84),
        new mp.Vector3(870.29, -1140.69, 23.16),
        new mp.Vector3(1070.98, -2387.35, 29.47),
        new mp.Vector3(-27.32, -78.2, 56.25),
        new mp.Vector3(-591.82, 343, 84.12),
        new mp.Vector3(345.44, 353.58, 104.29),
        new mp.Vector3(2491.61, 1569.37, 31.72),
        new mp.Vector3(2542.52, 342.69, 107.46),
        new mp.Vector3(2570.78, 484.4, 107.68),
        new mp.Vector3(564.2, 2803.29, 41.16),
        new mp.Vector3(571.52, 2791.34, 41.09),
        new mp.Vector3(562.58, 2670.96, 41.12),
        new mp.Vector3(274.83, 2574.13, 44.18),
        new mp.Vector3(464.95, 3551.63, 32.24),
        new mp.Vector3(1386.33, 3601.58, 33.89),
        new mp.Vector3(1722.37, 3697.64, 33.47),
        new mp.Vector3(1558.34, 3803.93, 33.25),
        new mp.Vector3(1975.86, 3786.67, 31.18),
        new mp.Vector3(2042.82, 3198.48, 44.19),
        new mp.Vector3(2657.2, 3270.1, 54.24),
        new mp.Vector3(2540.37, 4674.12, 32.87),
        new mp.Vector3(2019.69, 4982.32, 40.21),
        new mp.Vector3(1771.94, 4587.63, 36.71),
        new mp.Vector3(1731.74, 4791.77, 40.83),
        new mp.Vector3(1686.57, 4972.26, 41.7),
        new mp.Vector3(1639.46, 4821.53, 40.97),
        new mp.Vector3(1636.7, 4875.83, 41.03),
        new mp.Vector3(2019.72, 4982.41, 40.21),
        new mp.Vector3(1462.1, 6540.23, 13.65),
        new mp.Vector3(146.9, 6389.93, 30.31),
        new mp.Vector3(144.96, 6388.92, 30.31),
        new mp.Vector3(106.2, 6369.66, 30.38),
        new mp.Vector3(85.42, 6360.11, 30.38),
        new mp.Vector3(-93.55, 6494.64, 30.49),
        new mp.Vector3(-95.37, 6496.8, 30.49),
        new mp.Vector3(-82.14, 6479.71, 30.49),
        new mp.Vector3(-190.66, 6430.6, 30.52),
        new mp.Vector3(-436.12, 6144.09, 30.48),
        new mp.Vector3(-384.58, 6041.63, 30.5),
        new mp.Vector3(-128.12, 6230.12, 30.34),
        new mp.Vector3(-268.93, 6173.65, 30.42),
        new mp.Vector3(-842.35, 5405.96, 33.62),
        new mp.Vector3(-3190.91, 1230.36, 9.05),
        new mp.Vector3(-3172.77, 1096.4, 19.84),
        new mp.Vector3(-2954.3, 445.35, 14.28),
        new mp.Vector3(-2949.34, 58.61, 10.61),
        new mp.Vector3(-2950.16, 420.91, 14.28),
        new mp.Vector3(-2954.08, 389.38, 14.02),
        new mp.Vector3(-3050.25, 175.32, 10.6),
      ],
      l = () => {
        mp.blips.exists(g) && g.destroy(),
          mp.markers.exists(h) && h.destroy(),
          i && (i.destroy(), (i = null)),
          mp.blips.exists(a) && a.destroy(),
          mp.markers.exists(b) && b.destroy(),
          e && (e.destroy(), (e = null));
      },
      m = () => {
        var g = Math.floor;
        if (
          (mp.blips.exists(a) && a.destroy(),
          mp.markers.exists(b) && b.destroy(),
          e && (e.destroy(), (e = null)),
          -1 === j)
        )
          j = g(Math.random() * k.length);
        else {
          const e = k[j],
            a = k
              .filter((a, b) => b !== j)
              .sort(
                (f, a) =>
                  c(d(e.x - a.x, 2) + d(e.y - a.y, 2)) -
                  c(d(e.x - f.x, 2) + d(e.y - f.y, 2))
              )
              .filter((a, b) => b < g(0.6 * k.length)),
            b = a[g(Math.random() * a.length)];
          j = k.findIndex((a) => a === b);
        }
        const h = k[j];
        (a = mp.blips.new(318, h, {
          color: 1,
          scale: 1.5,
          shortRange: !1,
          name: "?",
        })),
          (b = mp.markers.new(27, new mp.Vector3(h.x, h.y, h.z + 1), 4.5, {
            color: [255, 0, 0, 150],
            rotation: new mp.Vector3(0, 0, 0),
            bobUpAndDown: !0,
          })),
          (e = new global.ActionColshape(
            h,
            0,
            2,
            "\u0432\u0437\u044F\u0442\u044C \u043C\u0443\u0441\u043E\u0440",
            () => {
              !global.actionAntiFlood(
                "server_neutralContract_getDiverJunk",
                8e3
              ) ||
                f ||
                ((f = !0),
                mp.events.callRemote("server_neutralContract_getDiverJunk"));
            }
          ));
      };
    mp.events.add("client_neutralContractJunk_takeOk", () => {
      m(), (f = !1);
    }),
      mp.events.add("client_neutralContractJunk_takeError", () => {
        f = !1;
      });
    const n = () => {
      l(),
        (g = mp.blips.new(652, new mp.Vector3(-454.63, -1721.53, 17.7), {
          color: 11,
          shortRange: !1,
          name: "?",
        })),
        (h = mp.markers.new(27, new mp.Vector3(-454.63, -1721.53, 18.7), 4.5, {
          color: [255, 0, 0, 150],
          rotation: new mp.Vector3(0, 0, 0),
          bobUpAndDown: !0,
        })),
        (i = new global.TriggerColshape(
          new mp.Vector3(-454.63, -1721.53, 17.7),
          0,
          3,
          () => {
            localPlayer.vehicle &&
              localPlayer.vehicle.getPedInSeat(-1) == localPlayer.handle &&
              !(60 < 3.6 * localPlayer.vehicle.getSpeed()) &&
              global.actionAntiFlood(
                "server_neutralContract_putDiverJunk",
                5e3
              ) &&
              mp.events.callRemote("server_neutralContract_putDiverJunk");
          },
          () => {}
        )),
        m();
    };
    global.registerFamilyQuest({
      code: "DIVERJUNK",
      onStart: () => {
        n();
      },
      onEnd: () => {
        l();
      },
      localObjects: [],
    });
  })(),
    (() => {
      new CustomScenarioAnimWithItem(
        "scenNeutralContractMeat",
        "scenNeutralContractMeatItem",
        "anim@heists@box_carry@",
        "idle",
        49
      ),
        mp.attachmentMngr.register(
          "scenNeutralContractMeatItem",
          "prop_hat_box_05",
          28422,
          new mp.Vector3(0, -0.17, -0.19),
          new mp.Vector3(0, 0, 0)
        );
      const a = [
        new mp.Vector3(180.07, 6397.23, 30.35),
        new mp.Vector3(145.66, 6366.19, 30.53),
        new mp.Vector3(-55.13, 6271.76, 30.39),
        new mp.Vector3(-117.78, 6210.93, 30.2),
      ];
      let b = null,
        c = null,
        d = null,
        e = null,
        f = null,
        g = null;
      global.registerFamilyQuest({
        code: "MEATFACTORY",
        onStart: (h) => {
          mp.blips.exists(b) && b.destroy(),
            c && (c.destroy(), (c = null)),
            mp.markers.exists(d) && d.destroy(),
            mp.blips.exists(e) && e.destroy(),
            mp.markers.exists(f) && f.destroy(),
            g && (g.destroy(), (g = null));
          const i = a[h];
          (b = mp.blips.new(478, i, { color: 38, shortRange: !1, name: "?" })),
            (c = new global.ActionColshape(
              i,
              0,
              2,
              "\u0432\u0437\u044F\u0442\u044C \u044F\u0449\u0438\u043A",
              () => {
                global.actionAntiFlood(
                  "server_neutralContract_getMeatBox",
                  8e3
                ) && mp.events.callRemote("server_neutralContract_getMeatBox");
              }
            )),
            (d = mp.markers.new(27, new mp.Vector3(i.x, i.y, i.z + 1), 4.5, {
              color: [255, 0, 0, 150],
              rotation: new mp.Vector3(0, 0, 0),
              bobUpAndDown: !0,
            })),
            (e = mp.blips.new(652, new mp.Vector3(-415.64, -2175.94, 9.7), {
              color: 38,
              shortRange: !1,
              name: "?",
            })),
            (f = mp.markers.new(
              27,
              new mp.Vector3(-415.64, -2175.94, 9.7),
              4.5,
              {
                color: [255, 0, 0, 150],
                rotation: new mp.Vector3(0, 0, 0),
                bobUpAndDown: !0,
              }
            )),
            (g = new global.TriggerColshape(
              new mp.Vector3(-415.64, -2175.94, 9.32),
              0,
              3,
              () => {
                localPlayer.vehicle &&
                  localPlayer.vehicle.getPedInSeat(-1) == localPlayer.handle &&
                  !(60 < 3.6 * localPlayer.vehicle.getSpeed()) &&
                  global.actionAntiFlood(
                    "server_neutralContract_putMeatBox",
                    5e3
                  ) &&
                  mp.events.callRemote("server_neutralContract_putMeatBox");
              },
              () => {}
            ));
        },
        onEnd: () => {
          mp.blips.exists(b) && b.destroy(),
            c && (c.destroy(), (c = null)),
            mp.markers.exists(d) && d.destroy(),
            mp.blips.exists(e) && e.destroy(),
            mp.markers.exists(f) && f.destroy(),
            g && (g.destroy(), (g = null));
        },
        localObjects: [
          ["prop_boxpile_05a", 145.66, 6366.19, 30.53, 0, 0, 0],
          ["prop_boxpile_05a", -55.13, 6271.76, 30.39, 0, 0, 0],
          ["prop_boxpile_05a", -117.78, 6210.93, 30.2, 0, 0, 0],
        ],
      });
    })(),
    (() => {
      mp.objects.new(
        mp.game.joaat("prop_rub_binbag_03"),
        new mp.Vector3(299.36, 2897.28, 42.61),
        { alpha: 255, dimension: 0, rotation: new mp.Vector3(0, 0, 0) }
      ),
        mp.objects.new(
          mp.game.joaat("prop_rub_binbag_03"),
          new mp.Vector3(301.33, 2896.95, 42.61),
          { alpha: 255, dimension: 0, rotation: new mp.Vector3(0, 0, 0) }
        ),
        new global.ActionColshape(
          new mp.Vector3(287.17, 2843.53, 43.7),
          0,
          1,
          "\u0432\u0437\u044F\u0442\u044C \u0441\u0442\u0440\u043E\u0439\u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B",
          () => {
            global.actionAntiFlood("server_bnbContract_getMaterial", 8e3) &&
              mp.events.callRemote("server_bnbContract_getMaterial");
          }
        ),
        mp.markers.new(27, new mp.Vector3(-446.77, -990.12, 23.7), 4.5, {
          color: [255, 0, 0, 150],
          rotation: new mp.Vector3(0, 0, 0),
          bobUpAndDown: !0,
        }),
        new global.TriggerColshape(
          new mp.Vector3(-446.77, -990.12, 22.7),
          0,
          3,
          () => {
            localPlayer.vehicle &&
              localPlayer.vehicle.getPedInSeat(-1) == localPlayer.handle &&
              !(60 < 3.6 * localPlayer.vehicle.getSpeed()) &&
              global.actionAntiFlood("server_bnbContract_putMaterial", 5e3) &&
              mp.events.callRemote("server_bnbContract_putMaterial");
          },
          () => {}
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_01c"),
          new mp.Vector3(1838.16, 3670.71, 33.28),
          { rotation: new mp.Vector3(0, 0, 0), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_01c"),
          new mp.Vector3(1839.43, 3671.43, 33.28),
          { rotation: new mp.Vector3(0, 0, 0), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_01c"),
          new mp.Vector3(1840.7, 3672.16, 33.28),
          { rotation: new mp.Vector3(0, 0, 0), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_01c"),
          new mp.Vector3(1841.71, 3672.78, 33.28),
          { rotation: new mp.Vector3(0, 0, 0), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_01c"),
          new mp.Vector3(-501.4, -252.56, 34.68),
          { rotation: new mp.Vector3(0, 0, 0), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_01c"),
          new mp.Vector3(-499.61, -251.9, 34.7),
          { rotation: new mp.Vector3(0, 0, 0), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_01c"),
          new mp.Vector3(-497.93, -251.15, 34.71),
          { rotation: new mp.Vector3(0, 0, 0), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_01c"),
          new mp.Vector3(-496.23, -250.43, 34.73),
          { rotation: new mp.Vector3(0, 0, 0), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(173.21, 6403.1, 30.29),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(172.49, 6404.36, 30.22),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(171.68, 6405.82, 30.15),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(172.73, 6406.32, 30.14),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(173.78, 6406.89, 30.13),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(175.65, 6407.82, 30.13),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(176.95, 6408.44, 30.13),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(178.28, 6409.17, 30.13),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(179.49, 6409.46, 30.14),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(180.64, 6409.08, 30.14),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(182.04, 6408.6, 30.15),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(183.69, 6408, 30.17),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(184.86, 6407.67, 30.18),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(185.72, 6408.04, 30.17),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(186.26, 6407.01, 30.2),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(186.89, 6405.76, 30.24),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(187.45, 6404.64, 30.27),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(188.31, 6403.2, 30.3),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(189.01, 6401.75, 30.33),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(189.74, 6400.45, 30.36),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(191.28, 6397.82, 30.38),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(192.15, 6396.33, 30.38),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(192.93, 6394.79, 30.38),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(193.8, 6393.02, 30.38),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        ),
        mp.objects.new(
          mp.game.joaat("prop_bollard_02a"),
          new mp.Vector3(190.57, 6399.22, 30.38),
          { rotation: new mp.Vector3(0, 0, 27), dimension: 0 }
        );
    })(),
    (() => {
      let a = null,
        b = null;
      global.ServerPed.registerScript("POSTAL_WORK", (c) => {
        (c = JSON.parse(c)),
          mp.markers.exists(a) && a.destroy(),
          b && (b.destroy(), (b = null));
        const d = new mp.Vector3(
          parseFloat(c[0]),
          parseFloat(c[1]),
          parseFloat(c[2])
        );
        mp.events.call(
          "client_smartphone_gps_start",
          "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430",
          d.x,
          d.y,
          d.z
        ),
          (a = mp.markers.new(27, new mp.Vector3(d.x, d.y, d.z + 1), 5, {
            color: [255, 0, 0, 255],
            dimension: 0,
            visible: !0,
            bobUpAndDown: !1,
          }));
        let e = null;
        b = new global.TriggerColshape(
          d,
          0,
          5,
          () => {
            localPlayer.vehicle ||
              (null !== e && clearTimeout(e),
              (e = setTimeout(() => {
                e = null;
                5 <
                  mp.dist(
                    localPlayer.position.x,
                    localPlayer.position.y,
                    localPlayer.position.z,
                    d.x,
                    d.y,
                    d.z
                  ) ||
                  (mp.markers.exists(a) && a.destroy(),
                  b && (b.destroy(), (b = null)),
                  mp.events.callRemote("server_postal_work_end"));
              }, 2e3)));
          },
          () => {}
        );
      });
    })();
}
