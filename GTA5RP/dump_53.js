{
  const localPlayer = mp.players.local,
    fishingPlaceListData = [
      {
        blipPosition: new mp.Vector3(-3424.56, 967.9, 7.35),
        difficult: 1,
        points: [
          [new mp.Vector3(-3428.34, 953.6, 7.35), 89, 1],
          [new mp.Vector3(-3428.45, 955.49, 7.35), 92, 1],
          [new mp.Vector3(-3428.37, 957.53, 7.35), 92, 1],
          [new mp.Vector3(-3428.36, 959.58, 7.35), 80, 1],
          [new mp.Vector3(-3428.45, 961.59, 7.35), 90, 1],
          [new mp.Vector3(-3428.35, 965.48, 7.35), 89, 1],
          [new mp.Vector3(-3428.36, 967.55, 7.35), 76, 1],
          [new mp.Vector3(-3428.42, 969.54, 7.35), 87, 1],
          [new mp.Vector3(-3428.41, 971.55, 7.35), 88, 1],
          [new mp.Vector3(-3428.44, 973.59, 7.35), 91, 1],
          [new mp.Vector3(-3428.42, 975.62, 7.35), 88, 1],
          [new mp.Vector3(-3428.36, 977.53, 7.35), 79, 1],
        ],
      },
      {
        blipPosition: new mp.Vector3(-1842.13, -1247.84, 7.62),
        difficult: 1,
        points: [
          [new mp.Vector3(-1864.52, -1236.68, 7.62), 50, 1],
          [new mp.Vector3(-1860.59, -1232.18, 7.62), 50, 1],
          [new mp.Vector3(-1862.44, -1239.72, 7.62), 140, 1],
          [new mp.Vector3(-1860.15, -1241.96, 7.62), 140, 1],
          [new mp.Vector3(-1855.43, -1246.19, 7.62), 140, 1],
          [new mp.Vector3(-1852.33, -1248.79, 7.62), 140, 1],
          [new mp.Vector3(-1849.9, -1250.84, 7.62), 140, 1],
          [new mp.Vector3(-1843.89, -1255.9, 7.62), 140, 1],
          [new mp.Vector3(-1839.98, -1259.05, 7.62), 140, 1],
          [new mp.Vector3(-1837.24, -1261.47, 7.62), 140, 1],
          [new mp.Vector3(-1833.38, -1264.69, 7.62), 140, 1],
          [new mp.Vector3(-1828.14, -1269.05, 7.62), 140, 1],
          [new mp.Vector3(-1824.03, -1267.79, 7.62), 232, 1],
        ],
      },
      {
        blipPosition: new mp.Vector3(2076.18, 4313.41, 29.98),
        difficult: 2,
        points: [
          [new mp.Vector3(2076.18, 4313.41, 29.98), -1, 100],
          [new mp.Vector3(1902.2, 4347.41, 30.68), -1, 100],
          [new mp.Vector3(2190.01, 4441.62, 30.6), -1, 100],
          [new mp.Vector3(2129.56, 4169.28, 29.45), -1, 100],
          [new mp.Vector3(1600.58, 4148.72, 29.93), -1, 100],
        ],
      },
      {
        blipPosition: new mp.Vector3(1289.12, 4039.84, 30.5),
        difficult: 2,
        points: [
          [new mp.Vector3(1289.12, 4039.84, 30.5), -1, 130],
          [new mp.Vector3(1036.04, 3882.41, 30.36), -1, 100],
          [new mp.Vector3(802.26, 3907.3, 30.3), -1, 100],
        ],
      },
      {
        blipPosition: new mp.Vector3(323.34, 3950.38, 29.46),
        difficult: 2,
        points: [
          [new mp.Vector3(323.34, 3950.38, 29.46), -1, 100],
          [new mp.Vector3(630.1, 3914.1, 30.34), -1, 100],
          [new mp.Vector3(67.07, 4075.46, 30.82), -1, 100],
          [new mp.Vector3(2129.56, 4169.28, 29.45), -1, 80],
          [new mp.Vector3(1600.58, 4148.72, 29.93), -1, 80],
        ],
      },
      {
        blipPosition: new mp.Vector3(1061.32, 7206.05, 0.1),
        difficult: 3,
        points: [[new mp.Vector3(1061.32, 7206.05, 0.1), -1, 350]],
      },
      {
        blipPosition: new mp.Vector3(3504.78, 2575.09, 9.71),
        difficult: 1,
        points: [
          [new mp.Vector3(3499.44, 2531.15, 5.31), 152, 2],
          [new mp.Vector3(3476.81, 2534.26, 7.88), 188, 2],
          [new mp.Vector3(3523.68, 2525.44, 5.16), 166, 2],
          [new mp.Vector3(3530.43, 2521.82, 4.84), 156, 2],
          [new mp.Vector3(3536.98, 2515.16, 4.55), 151, 2],
          [new mp.Vector3(3544.02, 2511.15, 4.54), 186, 2],
          [new mp.Vector3(3558.67, 2516.21, 5.08), 237, 2],
          [new mp.Vector3(3567.62, 2530.57, 2.32), 251, 2],
          [new mp.Vector3(3579.41, 2552.64, 2.43), 250, 2],
          [new mp.Vector3(3572.91, 2579.21, 2.55), 277, 2],
          [new mp.Vector3(3563.49, 2593.26, 7.21), 296, 2],
          [new mp.Vector3(3555.89, 2600.17, 8.75), 340, 2],
          [new mp.Vector3(3541.44, 2599.1, 5.3), 353, 2],
          [new mp.Vector3(3528.85, 2605.98, 8.69), 310, 2],
          [new mp.Vector3(3518.79, 2618.06, 10.03), 327, 2],
          [new mp.Vector3(3502.51, 2623.61, 11.42), 343, 2],
          [new mp.Vector3(3488.61, 2616.98, 11.27), 14, 2],
          [new mp.Vector3(3462.39, 2625.6, 14.77), 15, 2],
          [new mp.Vector3(3430.82, 2610.64, 8.78), 43, 2],
          [new mp.Vector3(3420.59, 2583.97, 11.49), 82, 2],
        ],
      },
      {
        blipPosition: new mp.Vector3(3918.13, 5295.08, 0.56),
        difficult: 3,
        points: [[new mp.Vector3(3918.13, 5295.08, 0.56), -1, 350]],
      },
      {
        blipPosition: [
          new mp.Vector3(4101.24, -5425.24, 0),
          new mp.Vector3(5680.85, -6196.54, 0),
          new mp.Vector3(4999.37, -3943.03, 0),
        ],
        difficult: 4,
        points: [[new mp.Vector3(4840.571, -5174.425, 0), -1, 1500]],
        check() {
          if (localPlayer.vehicle) return !1;
          const { x: a, y: b, z: c } = localPlayer.position,
            d = mp.game.gameplay.getGroundZFor3dCoord(a, b, c + 10, 0, !1);
          return !(0 < d) && -25 > d - c;
        },
      },
    ];
  let fishTriggerCounter = 0,
    fishPlaceIndexList = new Set(),
    fishCheckInterval = null,
    fishPlaceIndexCounter = 0;
  fishingPlaceListData.forEach((a) => {
    a.blipPosition &&
      (Array.isArray(a.blipPosition)
        ? a.blipPosition.forEach((a) => {
            mp.blips.new(68, a, {
              name: "\u0420\u044B\u0431\u0430\u043B\u043A\u0430",
              dimension: 0,
              drawDistance: 20,
              shortRange: !0,
              scale: 0.9,
              color: 30,
            });
          })
        : mp.blips.new(68, a.blipPosition, {
            name: "\u0420\u044B\u0431\u0430\u043B\u043A\u0430",
            dimension: 0,
            drawDistance: 20,
            shortRange: !0,
            scale: 0.9,
            color: 30,
          })),
      a.points.forEach((b) => {
        const c = fishPlaceIndexCounter;
        new global.TriggerColshape(
          b[0],
          0,
          b[2],
          () =>
            a.check
              ? (null != fishCheckInterval && clearInterval(fishCheckInterval),
                void (fishCheckInterval = setInterval(() => {
                  const b = a.check();
                  b && !fishPlaceIndexList.has(c)
                    ? (fishPlaceIndexList.add(c),
                      global.rpc.triggerBrowser(
                        global.mainBrowser,
                        "__infoPanel_toggleStatusIco",
                        ["fishing", !0]
                      ))
                    : !b &&
                      fishPlaceIndexList.has(c) &&
                      (fishPlaceIndexList.delete(c),
                      global.rpc.triggerBrowser(
                        global.mainBrowser,
                        "__infoPanel_toggleStatusIco",
                        ["fishing", !1]
                      ));
                }, 100)))
              : void (0 == fishTriggerCounter &&
                  global.rpc.triggerBrowser(
                    global.mainBrowser,
                    "__infoPanel_toggleStatusIco",
                    ["fishing", !0]
                  ),
                fishTriggerCounter++,
                fishPlaceIndexList.add(c)),
          () =>
            a.check
              ? (null != fishCheckInterval && clearInterval(fishCheckInterval),
                (fishCheckInterval = null),
                void (
                  fishPlaceIndexList.has(c) &&
                  (fishPlaceIndexList.delete(c),
                  global.rpc.triggerBrowser(
                    global.mainBrowser,
                    "__infoPanel_toggleStatusIco",
                    ["fishing", !1]
                  ))
                ))
              : void (
                  0 < fishTriggerCounter &&
                  (fishTriggerCounter--,
                  fishPlaceIndexList.delete(c),
                  0 == fishTriggerCounter &&
                    global.rpc.triggerBrowser(
                      global.mainBrowser,
                      "__infoPanel_toggleStatusIco",
                      ["fishing", !1]
                    ))
                )
        ),
          fishPlaceIndexCounter++;
      });
  }),
    mp.events.add("client_fishing", function (a, b) {
      const c = mp.players.atRemoteId(a);
      null == c ||
        0 === c.handle ||
        (1 == b
          ? (mp.attachmentMngr.addClient(c, mp.game.joaat("fishingRod")),
            c.taskPlayAnim(
              "amb@world_human_stand_fishing@base",
              "base",
              1,
              0,
              -1,
              1,
              1,
              !1,
              !1,
              !1
            ))
          : 2 == b
          ? c.taskPlayAnim(
              "amb@world_human_stand_fishing@idle_a",
              "idle_b",
              1,
              0,
              -1,
              1,
              1,
              !1,
              !1,
              !1
            )
          : 3 == b
          ? (mp.attachmentMngr.removeFor(c, mp.game.joaat("fishingRod")),
            c.clearTasksImmediately())
          : 0 == b &&
            mp.attachmentMngr.removeFor(c, mp.game.joaat("fishingRod")));
    }),
    mp.events.add("client_fishing_taskStart", async function (a, b) {
      return 0 == fishPlaceIndexList.size
        ? void mp.api.notify.error(
            "\u0422\u0443\u0442 \u043D\u0435\u043B\u044C\u0437\u044F \u0440\u044B\u0431\u0430\u0447\u0438\u0442\u044C"
          )
        : localPlayer.isSwimming() || localPlayer.isSwimmingUnderWater()
        ? void mp.api.notify.error(
            "\u041D\u0435\u043B\u044C\u0437\u044F \u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u0432 \u0432\u043E\u0434\u0435"
          )
        : void mp.events.callRemote(
            "server_fishing_start",
            [...fishPlaceIndexList][fishPlaceIndexList.size - 1],
            a,
            b
          );
    }),
    mp.events.add("client_fishing_startFishingGame", function (a, b) {
      mp.events.call("client_fishing", localPlayer.remoteId, 2),
        global.menuBrowser.execute(`startFishingGame(${a}, ${b});`),
        global.showCursor(!0),
        global.disableChatAndKeys(!0),
        global.discordUpdate("\u0420\u044B\u0431\u0430\u0447\u0438\u0442");
    }),
    mp.events.add("client_fishing_game_end", () => {
      mp.events.call("client_fishing", mp.players.local.remoteId, 3),
        global.showCursor(!1),
        global.disableChatAndKeys(!1),
        global.discordUpdate(),
        global.antiAFK_sendAction();
    }),
    mp.game.streaming.requestAnimDict("amb@world_human_stand_fishing@base"),
    mp.game.streaming.requestAnimDict("amb@world_human_stand_fishing@idle_a"),
    mp.attachmentMngr.register(
      "fishingRod",
      "prop_fishing_rod_02",
      60309,
      new mp.Vector3(0.01, -0.01, 0.03),
      new mp.Vector3(0.1, 0, 0)
    );
  const WORMS_POSITIONS = [
    new mp.Vector3(1910.83, 4745.17, 41.27),
    new mp.Vector3(1920.85, 4753.78, 41.58),
    new mp.Vector3(1932.79, 4763.01, 41.54),
    new mp.Vector3(1934.7, 4772.48, 41.77),
    new mp.Vector3(1924.41, 4763.43, 41.77),
    new mp.Vector3(1911.31, 4751.66, 41.48),
    new mp.Vector3(1899.91, 4753.07, 40.88),
    new mp.Vector3(1912.44, 4763.58, 41.86),
    new mp.Vector3(1925.76, 4775.6, 41.98),
    new mp.Vector3(1924.5, 4784.38, 42.47),
    new mp.Vector3(1912.71, 4774, 42.27),
    new mp.Vector3(1897.71, 4760.88, 41.45),
    new mp.Vector3(1881.87, 4779.75, 42.18),
    new mp.Vector3(1897.17, 4794.83, 43.52),
    new mp.Vector3(1893.61, 4807.54, 44.21),
    new mp.Vector3(1875.02, 4789.23, 42.76),
    new mp.Vector3(1855.69, 4800.55, 42.78),
    new mp.Vector3(1875.98, 4824.87, 44.39),
    new mp.Vector3(1848.36, 4808.65, 43.24),
  ];
  mp.events.add("client_fishing_worms", () => {
    const a = WORMS_POSITIONS.map((a) =>
      mp.blips.new(1, a, {
        color: 1,
        dimension: 0,
        shortRange: !1,
        name: "?",
        scale: 1,
      })
    );
    setTimeout(() => {
      a.forEach((a) => mp.blips.exists(a) && a.destroy());
    }, 25e3),
      mp.api.notify.info(
        "\u0422\u043E\u0447\u043A\u0438 \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u044B \u043D\u0430 \u043A\u0430\u0440\u0442\u0435 25 \u0441\u0435\u043A\u0443\u043D\u0434"
      );
  });
}
