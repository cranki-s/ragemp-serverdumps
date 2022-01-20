{
  class ClientDoor {
    constructor(a, b, c, d, e, f) {
      (this.hash = a),
        (this.x = b),
        (this.y = c),
        (this.z = d),
        (this.lock = f),
        (this.colshape = mp.colshapes.newCircle(b, c, 5, e)),
        (this.colshape.clientDoorColshape = this);
    }
    update() {
      mp.game.object.doorControl(
        this.hash,
        this.x,
        this.y,
        this.z,
        this.lock,
        0,
        0,
        0
      );
    }
  }
  mp.events.add("playerEnterColshape", (a) => {
    a.clientDoorColshape != null && a.clientDoorColshape.update();
  }),
    new ClientDoor(631614199, 461.8065, -994.4086, 25.06443, 0, !0),
    new ClientDoor(631614199, 461.8065, -997.6583, 25.06443, 0, !0),
    new ClientDoor(631614199, 461.8065, -1001.302, 25.06443, 0, !0),
    new ClientDoor(110411286, 232.6054, 214.1584, 106.4049, 0, !1),
    new ClientDoor(110411286, 231.5123, 216.5177, 106.4049, 0, !1),
    new ClientDoor(110411286, 260.6432, 203.2052, 106.4049, 0, !1),
    new ClientDoor(110411286, 258.2022, 204.1005, 106.4049, 0, !1),
    new ClientDoor(1956494919, 237.7704, 227.87, 106.426, 0, !1),
    new ClientDoor(1956494919, 236.5488, 228.3147, 110.4328, 0, !1),
    new ClientDoor(110411286, 259.9831, 215.2468, 106.4049, 0, !1),
    new ClientDoor(110411286, 259.0879, 212.8062, 106.4049, 0, !1),
    new ClientDoor(964838196, 260.8579, 210.4453, 110.4328, 0, !1),
    new ClientDoor(964838196, 262.5366, 215.0576, 110.4328, 0, !1),
    new ClientDoor(270330101, 723.116, -1088.831, 23.23201, 0, !1),
    new ClientDoor(-550347177, -356.0905, -134.7714, 40.01295, 0, !1),
    new ClientDoor(-550347177, -1145.898, -1991.144, 14.18357, 0, !1),
    new ClientDoor(-822900180, 1174.656, 2644.159, 40.50673, 0, !1),
    new ClientDoor(-822900180, 1182.307, 2644.166, 40.50784, 0, !1),
    new ClientDoor(1335311341, 1187.202, 2644.95, 38.55176, 0, !1),
    new ClientDoor(-822900180, 114.3135, 6623.233, 32.67305, 0, !1),
    new ClientDoor(-822900180, 108.8502, 6617.877, 32.67305, 0, !1),
    new ClientDoor(1335311341, 105.1518, 6614.655, 32.58521, 0, !1),
    new ClientDoor(-8873588, 18.572, -1115.495, 29.94694, 0, !1),
    new ClientDoor(97297972, 16.12787, -1114.606, 29.94694, 0, !1),
    new ClientDoor(452874391, 6.81789, -1098.209, 29.94685, 0, !1),
    new ClientDoor(-8873588, 810.5769, -2148.27, 29.76892, 0, !1),
    new ClientDoor(97297972, 813.1779, -2148.27, 29.76892, 0, !1),
    new ClientDoor(-8873588, 842.7685, -1024.539, 28.34478, 0, !1),
    new ClientDoor(97297972, 845.3694, -1024.539, 28.34478, 0, !1),
    new ClientDoor(-8873588, -662.6415, -944.3256, 21.97915, 0, !1),
    new ClientDoor(97297972, -665.2424, -944.3256, 21.97915, 0, !1),
    new ClientDoor(-8873588, 243.8379, -46.52324, 70.09098, 0, !1),
    new ClientDoor(97297972, 244.7275, -44.07911, 70.09098, 0, !1),
    new ClientDoor(-8873588, 1699.77, 3752.92, 33.71, 0, !1),
    new ClientDoor(-8873588, -3163.99, 1083.24, 19.85, 0, !1),
    new ClientDoor(-8873588, -324.61, 6076.71, 30.45, 0, !1),
    new ClientDoor(-8873588, -1112.47, 2691.13, 17.59, 0, !1),
    new ClientDoor(-8873588, 2568.81, 303.28, 107.73, 0, !1),
    new ClientDoor(-8873588, -1314.25, -391.19, 35.7, 0, !1),
    new ClientDoor(145369505, -822.4442, -188.3924, 37.81895, 0, !1),
    new ClientDoor(-1663512092, -823.2001, -187.0831, 37.81895, 0, !1),
    new ClientDoor(-1844444717, -29.86917, -148.1571, 57.22648, 0, !1),
    new ClientDoor(-1844444717, 1932.952, 3725.154, 32.9944, 0, !1),
    new ClientDoor(1417577297, -37.33113, -1108.873, 26.7198, 0, !1),
    new ClientDoor(2059227086, -39.13366, -1108.218, 26.7198, 0, !1),
    new ClientDoor(1417577297, -60.54582, -1094.749, 26.88872, 0, !1),
    new ClientDoor(2059227086, -59.89302, -1092.952, 26.88362, 0, !1),
    new ClientDoor(-2051651622, -33.80989, -1107.579, 26.57225, 0, !1),
    new ClientDoor(-2051651622, -31.72353, -1101.847, 26.57225, 0, !1),
    new ClientDoor(320433149, 434.7479, -983.2151, 30.83926, 0, !1),
    new ClientDoor(-1215222675, 434.7479, -980.6184, 30.83926, 0, !1),
    new ClientDoor(-2023754432, 469.9679, -1014.452, 26.53623, 0, !1),
    new ClientDoor(-2023754432, 467.3716, -1014.452, 26.53623, 0, !1),
    new ClientDoor(-1033001619, 463.4782, -1003.538, 25.00599, 0, !1),
    new ClientDoor(-1320876379, 446.5728, -980.0106, 30.8393, 0, !1),
    new ClientDoor(185711165, 450.1041, -984.0915, 30.8393, 0, !1),
    new ClientDoor(185711165, 450.1041, -981.4915, 30.8393, 0, !1),
    new ClientDoor(749848321, 453.0793, -983.1895, 30.83926, 0, !1),
    new ClientDoor(1557126584, 450.1041, -985.7384, 30.8393, 0, !1),
    new ClientDoor(-2023754432, 452.6248, -987.3626, 30.8393, 0, !1),
    new ClientDoor(749848321, 461.2865, -985.3206, 30.83926, 0, !1),
    new ClientDoor(-340230128, 464.3613, -984.678, 43.83443, 0, !1),
    new ClientDoor(185711165, 443.4078, -989.4454, 30.8393, 0, !1),
    new ClientDoor(185711165, 446.0079, -989.4454, 30.8393, 0, !1),
    new ClientDoor(-131296141, 443.0298, -991.941, 30.8393, 0, !1),
    new ClientDoor(-131296141, 443.0298, -994.5412, 30.8393, 0, !1),
    new ClientDoor(-1603817716, 488.8923, -1011.67, 27.14583, 0, !1),
    new ClientDoor(1881825907, 116.0046, -1294.692, 29.41947, 0, !1),
    new ClientDoor(741314661, 1844.998, 2597.482, 44.63626, 0, !1),
    new ClientDoor(741314661, 1818.543, 2597.482, 44.60749, 0, !1),
    new ClientDoor(741314661, 1806.939, 2616.975, 44.60093, 0, !1),
    new ClientDoor(-1212951353, -2973.535, 390.1414, 15.18735, 0, !1),
    new ClientDoor(1173348778, -2965.648, 386.7928, 15.18735, 0, !1),
    new ClientDoor(1173348778, -2961.749, 390.2573, 15.19322, 0, !1),
    new ClientDoor(-1212951353, -1490.411, -383.8453, 40.30745, 0, !1),
    new ClientDoor(1173348778, -1490.411, -1482.679, -380.153, 40.30745, 0, !1),
    new ClientDoor(1173348778, -1482.693, -374.9365, 40.31332, 0, !1),
    new ClientDoor(-1212951353, -1226.894, -903.1218, 12.47039, 0, !1),
    new ClientDoor(-1212951353, 1141.038, -980.3225, 46.55986, 0, !1),
    new ClientDoor(-1148826190, 82.38156, -1390.476, 29.52609, 0, !1),
    new ClientDoor(-1148826190, -711.52, -916.56, 18.22, 0, !1),
    new ClientDoor(-1148826190, -52.79, -1756.8, 28.44, 0, !1),
    new ClientDoor(-1148826190, 29.4, -1349.15, 28.5, 0, !1),
    new ClientDoor(1173348778, -1226.33, -902.93, 11.33, 0, !1),
    new ClientDoor(-1148826190, 376.86, 323.41, 102.57, 0, !1),
    new ClientDoor(-1148826190, -1821.86, 788.75, 137.17, 0, !1),
    new ClientDoor(-1148826190, 1160.34, -326.35, 68.21, 0, !1),
    new ClientDoor(1173348778, 1141.08, -981.08, 45.42, 0, !1),
    new ClientDoor(-1148826190, 2682.17, 3283.16, 54.24, 0, !1),
    new ClientDoor(-1148826190, 2559.25, 385.95, 107.62, 0, !1),
    new ClientDoor(-1148826190, -3038.89, 590.08, 6.92, 0, !1),
    new ClientDoor(-1148826190, -3240.08, 1005.04, 11.87, 0, !1),
    new ClientDoor(-1148826190, 543.58, 2672.5, 41.16, 0, !1),
    new ClientDoor(1173348778, 1166.39, 2703.75, 37.18, 0, !1),
    new ClientDoor(-1148826190, 1965.56, 3741.03, 31.34, 0, !1),
    new ClientDoor(-1148826190, 1698.64, 4928.7, 41.08, 0, !1),
    new ClientDoor(-1148826190, 1731.81, 6411.26, 34.04, 0, !1),
    new ClientDoor(1780022985, -1201.435, -776.8566, 17.99184, 0, !1),
    new ClientDoor(-1148826190, 82.38156, -1390.476, 29.52609, 0, !1),
    new ClientDoor(868499217, 82.38156, -1390.752, 29.52609, 0, !1),
    new ClientDoor(1780022985, -3167.75, 1055.536, 21.53288, 0, !1),
    new ClientDoor(1780022985, 617.2458, 2751.022, 42.75777, 0, !1),
    new ClientDoor(-1148826190, 418.26, -808.05, 28.39, 0, !1),
    new ClientDoor(-1148826190, 1198.55, 2703.17, 37.22, 0, !1),
    new ClientDoor(-1148826190, 1687.07, 4819.92, 41.06, 0, !1),
    new ClientDoor(-1148826190, -1.55, 6516.49, 30.87, 0, !1),
    new ClientDoor(-1148826190, -1095.32, 2706.51, 18.11, 0, !1),
    new ClientDoor(1780022985, 127.43, -211.23, 53.53, 0, !1),
    new ClientDoor(1780022985, 127.8201, -211.8274, 55.22751, 0, !1),
    new ClientDoor(-1922281023, -715.6154, -157.2561, 37.67493, 0, !1),
    new ClientDoor(-1922281023, -716.6755, -155.42, 37.67493, 0, !1),
    new ClientDoor(-1922281023, -1456.201, -233.3682, 50.05648, 0, !1),
    new ClientDoor(-1922281023, -1454.782, -231.7927, 50.05649, 0, !1),
    new ClientDoor(-1922281023, -156.439, -304.4294, 39.99308, 0, !1),
    new ClientDoor(-1922281023, -157.1293, -306.4341, 39.99308, 0, !1),
    new ClientDoor(-1148826190, -817.35, -1078.79, 10.33, 0, !1),
    new ClientDoor(-1033001619, 453.1, -982.49, 29.69, 0, !1),
    new ClientDoor(
      mp.game.joaat("v_ilev_ss_door7"),
      717.79,
      -975.72,
      23.91,
      0,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("v_ilev_ss_door8"),
      717.79,
      -975.72,
      23.91,
      0,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("v_ilev_gc_door01"),
      6.81789,
      -1098.209,
      29.94685,
      -1,
      !0
    ),
    new ClientDoor(
      mp.game.joaat("v_ilev_gc_door01"),
      827.5342,
      -2160.493,
      29.76884,
      -1,
      !0
    ),
    new ClientDoor(
      mp.game.joaat("h4_prop_h4_gate_l_03a"),
      4984.134,
      -5709.249,
      20.78103,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("h4_prop_h4_gate_r_03a"),
      4981.012,
      -5712.747,
      20.78103,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("h4_prop_h4_gate_r_03a"),
      4990.681,
      -5715.106,
      20.78103,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("h4_prop_h4_gate_l_03a"),
      4987.587,
      -5718.635,
      20.78103,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("h4_prop_h4_door_03a"),
      5085.588,
      -5733.124,
      15.9526,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("h4_prop_h4_door_03a"),
      5082.088,
      -5737.809,
      15.9526,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("h4_prop_h4_door_03a"),
      4960.498,
      -5785.047,
      21.10873,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("h4_prop_h4_door_03a"),
      4965.726,
      -5787.68,
      21.10873,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("prop_bh1_44_door_01r"),
      4.402985,
      37.3213,
      71.75453,
      0,
      !0
    ),
    new ClientDoor(
      mp.game.joaat("prop_lrggate_02"),
      -875.4845,
      18.12612,
      44.4434,
      0,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("prop_bh1_44_door_01r"),
      8.739929,
      81.30667,
      78.65253,
      0,
      !0
    ),
    new ClientDoor(
      mp.game.joaat("v_ilev_fb_doorshortl"),
      -1045.12,
      -232.004,
      39.43794,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("v_ilev_fb_doorshortr"),
      -1046.516,
      -229.3581,
      39.43794,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("v_ilev_fb_door01"),
      -1083.62,
      -260.4166,
      38.1867,
      -1,
      !1
    ),
    new ClientDoor(
      mp.game.joaat("v_ilev_fb_door02"),
      -1080.974,
      -259.0203,
      38.1867,
      -1,
      !1
    );
  let currentDoorShape = null;
  mp._events.add("playerEnterColshape", (a) => {
    if (mp.colshapes.exists(a) && a.getVariable("fDoorId")) {
      currentDoorShape = a;
      const b = a.getVariable("fDoorHash"),
        c = a.getVariable("fDoorPos");
      return (
        c.forEach((c, d) => {
          mp.game.object.doorControl(
            Array.isArray(b) ? parseInt(b[d]) : parseInt(b),
            parseFloat(c[0]),
            parseFloat(c[1]),
            parseFloat(c[2]),
            !!a.getVariable("fDoorLock"),
            0,
            0,
            0
          ),
            mp.game.object.doorControl(
              Array.isArray(b) ? parseInt(b[d]) : parseInt(b),
              parseFloat(c[0]),
              parseFloat(c[1]),
              parseFloat(c[2]),
              !!a.getVariable("fDoorLock"),
              0,
              0,
              0
            ),
            mp.game.object.doorControl(
              Array.isArray(b) ? parseInt(b[d]) : parseInt(b),
              parseFloat(c[0]),
              parseFloat(c[1]),
              parseFloat(c[2]),
              !!a.getVariable("fDoorLock"),
              0,
              0,
              0
            );
        }),
        !0
      );
    }
  }),
    mp.events.addDataHandler("fDoorLock", (a) => {
      if (currentDoorShape === a) {
        const b = a.getVariable("fDoorHash"),
          c = a.getVariable("fDoorPos");
        c.forEach((c, d) => {
          mp.game.object.doorControl(
            Array.isArray(b) ? parseInt(b[d]) : parseInt(b),
            parseFloat(c[0]),
            parseFloat(c[1]),
            parseFloat(c[2]),
            !!a.getVariable("fDoorLock"),
            0,
            0,
            0
          );
        });
      }
    }),
    mp.keys.bind(76, !0, function () {
      if (
        !(
          null == currentDoorShape ||
          0 !== mp.players.local.dimension ||
          mp.gui.cursor.visible ||
          global.isChatOpen ||
          global.disableKeys ||
          (-1 ===
            global.getEntityVariable(mp.players.local, "factionType", -1) &&
            !1 ===
              global.getEntityVariable(
                mp.players.local,
                mp.serverDataKeys.isAdmin,
                !1
              ))
        ) &&
        mp.colshapes.exists(currentDoorShape)
      ) {
        const a = currentDoorShape.getVariable("fDoorPos")[0],
          { x: b, y: c, z: d } = mp.players.local.position;
        if (
          5 >
            mp.game.system.vdist(
              b,
              c,
              d,
              parseFloat(a[0]),
              parseFloat(a[1]),
              parseFloat(a[2])
            ) &&
          global.actionAntiFlood("server_fDoor_toggle", 3e3)
        )
          return void (-1 !==
            [1, 2, 8].indexOf(
              global.getEntityVariable(mp.players.local, "factionType", -1)
            ) && 2227010557 === global.getPlayerCurrentWeaponData().weapon
            ? mp.events.callRemote(
                "server_fDoor_crack",
                currentDoorShape.getVariable("fDoorId")
              )
            : mp.events.callRemote(
                "server_fDoor_toggle",
                currentDoorShape.getVariable("fDoorId")
              ));
      }
    });
  const createTeleportDoor = (a, b) => {
    new global.ActionColshape(
      a,
      0,
      0.8,
      "\u0432\u043E\u0439\u0442\u0438",
      () => {
        mp.players.local.setCoordsNoOffset(b.x, b.y, b.z + 1, !1, !1, !1);
      }
    ),
      new global.ActionColshape(
        b,
        0,
        0.8,
        "\u0432\u044B\u0439\u0442\u0438",
        () => {
          mp.players.local.setCoordsNoOffset(a.x, a.y, a.z + 1, !1, !1, !1);
        }
      );
  };
  createTeleportDoor(
    new mp.Vector3(1321.3, -1649.69, 51.15),
    new mp.Vector3(1322.14, -1650.67, 51.27)
  ),
    createTeleportDoor(
      new mp.Vector3(321.01, 177.91, 102.54),
      new mp.Vector3(321.27, 179.12, 102.59)
    ),
    createTeleportDoor(
      new mp.Vector3(1859.77, 3748.89, 32.03),
      new mp.Vector3(1860.66, 3749.47, 32.05)
    ),
    createTeleportDoor(
      new mp.Vector3(-289.39, 6200.03, 30.47),
      new mp.Vector3(-289.96, 6199.25, 30.5)
    ),
    createTeleportDoor(
      new mp.Vector3(376.46, 323.17, 102.57),
      new mp.Vector3(376.93, 324.77, 102.57)
    ),
    createTeleportDoor(
      new mp.Vector3(-1065.16, -241.63, 43.02),
      new mp.Vector3(-1065.82, -240.61, 43.02)
    ),
    createTeleportDoor(
      new mp.Vector3(-1048.44, -238.42, 43.02),
      new mp.Vector3(-1046.79, -237.47, 43.02)
    ),
    createTeleportDoor(
      new mp.Vector3(-1043.63, -229.55, 38.01),
      new mp.Vector3(-1047.38, -231.56, 38.01)
    );
  const elevator = (a) => {
      for (const b of a) {
        if (!b[3]) continue;
        const c = new global.ActionColshape(
          b[1],
          0,
          0.8,
          "\u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u043B\u0438\u0444\u0442\u043E\u043C",
          () => {
            global.createMenuList({
              toPlayer: "auto",
              items: [
                ...a
                  .filter((a) => a !== b)
                  .map((a) => [
                    a[0],
                    () => {
                      global.hideMenuList();
                      const c = mp.players.local,
                        { x: d, y: e, z: f } = b[1];
                      3 <
                        mp.game.system.vdist(
                          d,
                          e,
                          f,
                          c.position.x,
                          c.position.y,
                          c.position.z
                        ) ||
                        mp.api.player.transitionTeleport({
                          x: a[1].x,
                          y: a[1].y,
                          z: a[1].z + 1.025,
                          heading: a[2],
                          fadeOutTime: 500,
                          fadeInTime: 1e3,
                        });
                    },
                  ]),
                [
                  "\u041E\u0442\u043C\u0435\u043D\u0430",
                  () => {
                    global.hideMenuList();
                  },
                ],
              ],
            });
          }
        );
        (c.onceMode = !0),
          mp.markers.new(1, b[1], 1, {
            direction: new mp.Vector3(0, 0, 0),
            rotation: new mp.Vector3(0, 0, 0),
            color: [237, 194, 21, 255],
            visible: !0,
            dimension: 0,
          });
      }
    },
    createTeleport = (a, b, c, d, e) => {
      mp.markers.new(1, a, 1, {
        direction: new mp.Vector3(0, 0, 0),
        rotation: new mp.Vector3(0, 0, 0),
        color: [237, 194, 21, 255],
        visible: !0,
        dimension: 0,
      }),
        mp.labels.new(b, new mp.Vector3(a.x, a.y, a.z + 1), {
          dimension: 0,
          los: !0,
          font: 0,
          drawDistance: 10,
        }),
        new global.ActionColshape(a, 0, 0.8, c, () => {
          mp.api.player.transitionTeleport({
            x: d.x,
            y: d.y,
            z: d.z,
            heading: e,
            fadeOutTime: 500,
            fadeInTime: 1e3,
          });
        });
    };
  elevator([
    [
      "\u0413\u0430\u0440\u0430\u0436",
      new mp.Vector3(133.28, -700.55, 32.11),
      158,
      !1,
    ],
    [
      "\u0425\u043E\u043B\u043B",
      new mp.Vector3(136.18, -761.83, 44.75),
      158,
      !0,
    ],
    [
      "\u041E\u0442\u0434\u0435\u043B \u0440\u0430\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0439",
      new mp.Vector3(150.08, -741.37, 54.58),
      335,
      !0,
    ],
    [
      "\u041E\u0444\u0438\u0441",
      new mp.Vector3(136.47, -736.21, 237.03),
      335,
      !0,
    ],
    [
      "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u044D\u0442\u0430\u0436",
      new mp.Vector3(123.08, -734.65, 257.15),
      70,
      !1,
    ],
  ]),
    elevator([
      [
        "\u0413\u0430\u0440\u0430\u0436",
        new mp.Vector3(133.28, -700.55, 32.11),
        158,
        !1,
      ],
      [
        "\u0425\u043E\u043B\u043B",
        new mp.Vector3(138.9, -762.79, 44.75),
        158,
        !0,
      ],
      [
        "\u041E\u0442\u0434\u0435\u043B \u0440\u0430\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0439",
        new mp.Vector3(146.59, -739.89, 54.58),
        335,
        !0,
      ],
      [
        "\u041E\u0444\u0438\u0441",
        new mp.Vector3(132.85, -734.85, 237.03),
        335,
        !0,
      ],
      [
        "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u044D\u0442\u0430\u0436",
        new mp.Vector3(123.08, -734.65, 257.15),
        70,
        !1,
      ],
    ]),
    elevator([
      [
        "\u0413\u0430\u0440\u0430\u0436",
        new mp.Vector3(133.28, -700.55, 32.11),
        158,
        !0,
      ],
      [
        "\u0425\u043E\u043B\u043B",
        new mp.Vector3(138.9, -762.79, 44.75),
        158,
        !1,
      ],
      [
        "\u041E\u0442\u0434\u0435\u043B \u0440\u0430\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0439",
        new mp.Vector3(146.59, -739.89, 54.58),
        335,
        !1,
      ],
      [
        "\u041E\u0444\u0438\u0441",
        new mp.Vector3(132.85, -734.85, 237.03),
        335,
        !1,
      ],
      [
        "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u044D\u0442\u0430\u0436",
        new mp.Vector3(123.08, -734.65, 257.15),
        70,
        !1,
      ],
    ]),
    elevator([
      [
        "\u0413\u0430\u0440\u0430\u0436",
        new mp.Vector3(133.28, -700.55, 32.11),
        158,
        !1,
      ],
      [
        "\u0425\u043E\u043B\u043B",
        new mp.Vector3(138.9, -762.79, 44.75),
        158,
        !1,
      ],
      [
        "\u041E\u0442\u0434\u0435\u043B \u0440\u0430\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0439",
        new mp.Vector3(146.59, -739.89, 54.58),
        335,
        !1,
      ],
      [
        "\u041E\u0444\u0438\u0441",
        new mp.Vector3(132.85, -734.85, 237.03),
        335,
        !1,
      ],
      [
        "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u044D\u0442\u0430\u0436",
        new mp.Vector3(123.08, -734.65, 257.15),
        70,
        !0,
      ],
    ]),
    createTeleport(
      new mp.Vector3(115.01, -741.93, 257.15),
      "\u0412\u044B\u0445\u043E\u0434 \u043D\u0430 \u043A\u0440\u044B\u0448\u0443",
      "\u043F\u043E\u0434\u043D\u044F\u0442\u044C\u0441\u044F",
      new mp.Vector3(141.23, -735.17, 262.85),
      157
    ),
    createTeleport(
      new mp.Vector3(141.23, -735.17, 261.85),
      "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u044D\u0442\u0430\u0436",
      "\u0441\u043F\u0443\u0441\u0442\u0438\u0442\u044C\u0441\u044F",
      new mp.Vector3(115.01, -741.93, 258.15),
      339
    ),
    elevator([
      [
        "1 \u044D\u0442\u0430\u0436",
        new mp.Vector3(360.17, -1397.13, 31.51),
        47,
        !0,
      ],
      [
        "3 \u044D\u0442\u0430\u0436",
        new mp.Vector3(360.24, -1397.1, 41.51),
        47,
        !0,
      ],
    ]),
    elevator([
      [
        "1 \u044D\u0442\u0430\u0436",
        new mp.Vector3(345.17, -1420.11, 31.51),
        47,
        !0,
      ],
      [
        "2 \u044D\u0442\u0430\u0436",
        new mp.Vector3(345.24, -1420.16, 36.91),
        47,
        !0,
      ],
      [
        "3 \u044D\u0442\u0430\u0436",
        new mp.Vector3(345.23, -1420.11, 41.51),
        47,
        !0,
      ],
      [
        "4 \u044D\u0442\u0430\u0436",
        new mp.Vector3(345.22, -1420.16, 46.76),
        47,
        !0,
      ],
    ]),
    elevator([
      [
        "1 \u044D\u0442\u0430\u0436",
        new mp.Vector3(342.92, -1422.72, 31.51),
        47,
        !0,
      ],
      [
        "2 \u044D\u0442\u0430\u0436",
        new mp.Vector3(343.03, -1422.85, 36.91),
        47,
        !0,
      ],
      [
        "3 \u044D\u0442\u0430\u0436",
        new mp.Vector3(343.05, -1422.8, 41.51),
        47,
        !0,
      ],
      [
        "4 \u044D\u0442\u0430\u0436",
        new mp.Vector3(343.03, -1422.83, 46.76),
        47,
        !0,
      ],
    ]),
    createTeleport(
      new mp.Vector3(-2360.97, 3249.23, 31.81),
      "\u041B\u0438\u0444\u0442",
      "\u043F\u043E\u0434\u043D\u044F\u0442\u044C\u0441\u044F",
      new mp.Vector3(-2360.85, 3249.35, 92.9),
      326
    ),
    createTeleport(
      new mp.Vector3(-2360.85, 3249.35, 91.9),
      "\u041B\u0438\u0444\u0442",
      "\u0441\u043F\u0443\u0441\u0442\u0438\u0442\u044C\u0441\u044F",
      new mp.Vector3(-2360.97, 3249.23, 32.81),
      328
    );
}
