{
  const localPlayer = mp.players.local;
  let mainBlip = mp.blips.new(781, new mp.Vector3(-421.45, 1138.49, 325.85), {
      color: 25,
      dimension: 0,
      shortRange: !1,
      scale: 1,
    }),
    pedBlips = [];
  new global.TriggerColshape(
    new mp.Vector3(-421.45, 1138.49, 325.85),
    0,
    60,
    () => {
      mp.blips.exists(mainBlip) && mainBlip.destroy(),
        pedBlips.forEach((a) => mp.blips.exists(a) && a.destroy()),
        (pedBlips = []),
        pedBlips.push(
          mp.blips.new(304, new mp.Vector3(-432.4, 1111.72, 327.68), {
            color: 5,
            dimension: 0,
            shortRange: !1,
            scale: 0.8,
          })
        ),
        pedBlips.push(
          mp.blips.new(304, new mp.Vector3(-429.24, 1110.15, 327.68), {
            color: 5,
            dimension: 0,
            shortRange: !1,
            scale: 0.8,
          })
        ),
        pedBlips.push(
          mp.blips.new(304, new mp.Vector3(-425.19, 1109.86, 327.68), {
            color: 5,
            dimension: 0,
            shortRange: !1,
            scale: 0.8,
          })
        ),
        pedBlips.push(
          mp.blips.new(304, new mp.Vector3(-467.93, 1127.31, 325.87), {
            color: 5,
            dimension: 0,
            shortRange: !1,
            scale: 0.8,
          })
        ),
        pedBlips.push(
          mp.blips.new(304, new mp.Vector3(-397.87, 1102.21, 325.85), {
            color: 5,
            dimension: 0,
            shortRange: !1,
            scale: 0.8,
          })
        );
    },
    () => {
      mp.blips.exists(mainBlip) && mainBlip.destroy(),
        (mainBlip = mp.blips.new(
          781,
          new mp.Vector3(-421.45, 1138.49, 325.85),
          { color: 25, dimension: 0, shortRange: !1, scale: 1 }
        )),
        pedBlips.forEach((a) => mp.blips.exists(a) && a.destroy()),
        (pedBlips = []);
    }
  ),
    (mp.colshapes.newCircle(-421.45, 1138.49, 60, 0).greenZone = !0),
    (mp.colshapes.newCircle(1464.35, 1500.15, 40, 2).greenZone = !0),
    (mp.colshapes.newCircle(2530.575, 4819.92, 100, 0).greenZone = !0),
    (() => {
      const a = new mp.Vector3(-446.68, 1105.03, 332.53),
        b = new mp.Vector3(-448.59, 1106.59, 332.53),
        c = mp.game.joaat("frogger"),
        d = 25,
        e = mp.game.joaat("dge_nag_present_004"),
        f = new mp.Vector3(0, 1.7, -0.7),
        g = 10,
        h = 10,
        i = new mp.Vector3(-427.36, 1116.3, 326.78),
        j = new mp.Vector3(10, 10, 10),
        k = [
          {
            position: new mp.Vector3(-161.24, 905.28, 241.2),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-777.8, 655.41, 150.07),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-1111.74, 747, 167.6),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-1221.48, 448.81, 96.44),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-823.87, 411.6, 101.88),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-473.79, 343.05, 114.24),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-215.39, 485.96, 131.85),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(123.96, 559.1, 187.33),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(309.49, 545.48, 159.13),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-199.05, 395.46, 115.79),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-495.94, 536.32, 123.13),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-707.12, 701.39, 169.03),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-1329.48, 596.31, 138.01),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-1551.04, 419.06, 113.1),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-1915.13, 296, 95.23),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-707.12, 701.39, 169.03),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-1886.35, 641.62, 133.78),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-1296.96, 661.11, 153.14),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-1024.05, 674.06, 164.57),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-654.6, 796.57, 205.48),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
          {
            position: new mp.Vector3(-334.62, 616.7, 175.96),
            marker: 1,
            markerRotation: new mp.Vector3(0, 0, 0),
            markerScale: j,
            end: !1,
          },
        ];
      mp.events.add("c:ny:quest:heli:start", async () => {
        global.disableChatAndKeys(!0),
          (global.enableCameraOnDisabled = !0),
          mp.api.player.transitionTeleport({
            x: a.x,
            y: a.y,
            z: a.z,
            heading: 0,
            fadeOutTime: 500,
            fadeInTime: 2e3,
            freeze: !1,
          });
        const j = mp.vehicles.new(c, b, {
            heading: 165,
            color: [
              [255, 255, 255],
              [255, 255, 255],
            ],
            dimension: -1,
            engine: !0,
            locked: !1,
          }),
          l = Date.now();
        let m = !1,
          n = !0,
          o = !1,
          p = 0;
        k.forEach((a) => {
          a.end = !1;
        });
        let q = 0;
        const r = new mp.Event("render", () => {
          const a = Date.now();
          if (l + 700 > a) return;
          if (n)
            return mp.vehicles.exists(j)
              ? 0 === j.handle
                ? void 0
                : void (localPlayer.vehicle === j
                    ? (j.setVelocity(0, 0, 30), (n = !1))
                    : (j.setEngineOn(!0, !0, !0),
                      j.setDoorsLocked(1),
                      localPlayer.taskEnterVehicle(
                        j.handle,
                        2e3,
                        -1,
                        2,
                        16,
                        0
                      )))
              : t(!1);
          if (
            0 === localPlayer.dimension ||
            !mp.vehicles.exists(j) ||
            0 === j.handle ||
            localPlayer.vehicle !== j ||
            l + 600000 < a
          )
            return void t(m);
          mp.game.graphics.drawText(
            `Нажмите ПРОБЕЛ чтобы сбросить подарок`,
            [0.5, 0.9],
            {
              font: 4,
              centre: !0,
              color: [255, 255, 255, 255],
              scale: [0.4, 0.4],
              outline: !1,
            }
          );
          const c = k[q],
            i = k[q - 1],
            r = mp.dist(
              j.position.x,
              j.position.y,
              j.position.z,
              c.position.x,
              c.position.y,
              c.position.z + 40
            );
          if ((2.5 > r && ++q >= k.length && (q = 0), !m)) {
            if (k.filter((a) => a.end).length >= h)
              return (
                (m = !0),
                setTimeout(() => {
                  t(!0);
                }, 3e3),
                void localPlayer.taskVehicleDriveToCoord(
                  j.handle,
                  b.x,
                  b.y,
                  b.z,
                  d,
                  1,
                  1,
                  2883621,
                  1,
                  1
                )
              );
            const l = mp.keys.isDown(32) && mp.keys.isDown(32);
            if (o || !l) o && !l && (o = !1);
            else if (((o = !0), p + 1e3 < a)) {
              p = a;
              const b = mp.objects.new(
                e,
                new mp.Vector3(
                  j.position.x + f.x,
                  j.position.y + f.y,
                  j.position.z + f.z
                ),
                { dimension: -1 }
              );
              let d = !1;
              const l = new mp.Event("render", () => {
                if (!mp.objects.exists(b) || (0 === b.handle && d))
                  return mp.objects.exists(b) && b.destroy(), void l.destroy();
                if (0 !== b.handle) {
                  d ||
                    (b.setRecordsCollisions(!0),
                    b.setCollision(!0, !0),
                    b.setHasGravity(!0),
                    b.freezePosition(!1),
                    b.setVelocity(0, 0, -1),
                    mp.game.entity.setLodDist(b.handle, 250),
                    (d = !0));
                  const a = b.getCoords(!0);
                  if (
                    mp.dist(
                      a.x,
                      a.y,
                      a.z,
                      c.position.x,
                      c.position.y,
                      c.position.z
                    ) < g
                  ) {
                    b.destroy(), l.destroy(), (c.end = !0);
                    const a = h - k.filter((a) => a.end).length;
                    0 < a
                      ? mp.api.notify.success(
                          `Точно в цель! Еще ${a} подарков и садимся`
                        )
                      : mp.api.notify.success(`Дело сделано! Возвращаемся...`);
                  } else if (
                    i &&
                    mp.dist(
                      a.x,
                      a.y,
                      a.z,
                      i.position.x,
                      i.position.y,
                      i.position.z
                    ) < g
                  ) {
                    b.destroy(), l.destroy(), (i.end = !0);
                    const a = h - k.filter((a) => a.end).length;
                    0 < a
                      ? mp.api.notify.success(
                          `Точно в цель! Еще ${a} подарков и садимся`
                        )
                      : mp.api.notify.success(`Дело сделано! Возвращаемся...`);
                  }
                }
              });
              setTimeout(() => {
                d = !0;
              }, 25e3);
            }
            localPlayer.taskHeliMission(
              j.handle,
              0,
              0,
              c.position.x,
              c.position.y,
              c.position.z + 40,
              4,
              d,
              -1,
              -1,
              0,
              10,
              5,
              1024
            ),
              c.end ||
                mp.game.graphics.drawMarker(
                  c.marker,
                  c.position.x,
                  c.position.y,
                  c.position.z,
                  0,
                  0,
                  0,
                  c.markerRotation.x,
                  c.markerRotation.y,
                  c.markerRotation.z,
                  c.markerScale.x,
                  c.markerScale.y,
                  c.markerScale.z,
                  255,
                  0,
                  0,
                  255,
                  !1,
                  !1,
                  2,
                  !1,
                  "",
                  "",
                  !1
                ),
              i &&
                !i.end &&
                mp.game.graphics.drawMarker(
                  i.marker,
                  i.position.x,
                  i.position.y,
                  i.position.z,
                  0,
                  0,
                  0,
                  i.markerRotation.x,
                  i.markerRotation.y,
                  i.markerRotation.z,
                  i.markerScale.x,
                  i.markerScale.y,
                  i.markerScale.z,
                  255,
                  0,
                  0,
                  255,
                  !1,
                  !1,
                  2,
                  !1,
                  "",
                  "",
                  !1
                );
          }
        });
        let s = !1;
        const t = (a) => {
          s ||
            ((s = !0),
            global.disableChatAndKeys(!1),
            (global.enableCameraOnDisabled = !1),
            r.destroy(),
            mp.game.cam.doScreenFadeOut(500),
            setTimeout(() => {
              mp.vehicles.exists(j) && j.destroy(),
                mp.api.player.transitionTeleport({
                  x: i.x,
                  y: i.y,
                  z: i.z,
                  heading: 343.44,
                  fadeOutTime: 0,
                  fadeInTime: 1e3,
                  freeze: !0,
                });
            }, 550),
            mp.events.callRemote("s:ny:quest:heli:end", a));
        };
      });
    })(),
    (() => {
      const a = new mp.Vector3(1500, 1500, -50),
        b = [
          { hash: mp.game.joaat("dge_nag_present_001"), isGood: !0 },
          { hash: mp.game.joaat("dge_nag_present_002"), isGood: !0 },
          { hash: mp.game.joaat("dge_nag_present_003"), isGood: !0 },
          { hash: mp.game.joaat("dge_nag_present_004"), isGood: !0 },
          { hash: mp.game.joaat("dge_nag_present_005"), isGood: !0 },
          { hash: mp.game.joaat("prop_detergent_01b"), isGood: !1 },
          { hash: mp.game.joaat("prop_ld_jerrycan_01"), isGood: !1 },
          { hash: mp.game.joaat("prop_ashtray_01"), isGood: !1 },
          { hash: mp.game.joaat("prop_blox_spray"), isGood: !1 },
          { hash: mp.game.joaat("prop_old_boot"), isGood: !1 },
          { hash: mp.game.joaat("prop_oiltub_03"), isGood: !1 },
          { hash: mp.game.joaat("prop_oiltub_04"), isGood: !1 },
          { hash: mp.game.joaat("prop_oiltub_05"), isGood: !1 },
          { hash: mp.game.joaat("prop_paints_can01"), isGood: !1 },
          { hash: mp.game.joaat("prop_paints_can02"), isGood: !1 },
          { hash: mp.game.joaat("prop_paints_can03"), isGood: !1 },
          { hash: mp.game.joaat("prop_paints_can04"), isGood: !1 },
        ],
        c = 1500,
        d = 0.0015,
        e = [
          {
            index: 0,
            position: new mp.Vector3(1512, 1502, -52.87),
            offset: new mp.Vector3(-1, 0, 0),
            len: 17,
            objects: [],
            lastObjectCreateTick: 0,
            lastSendRequestTick: 0,
            lastTick: 0,
          },
          {
            index: 1,
            position: new mp.Vector3(1495, 1509.3, -52.87),
            offset: new mp.Vector3(1, 0, 0),
            len: 17,
            objects: [],
            lastObjectCreateTick: 0,
            lastSendRequestTick: 0,
            lastTick: 0,
          },
          {
            index: 2,
            position: new mp.Vector3(1495, 1498, -52.87),
            offset: new mp.Vector3(1, 0, 0),
            len: 17,
            objects: [],
            lastObjectCreateTick: 0,
            lastSendRequestTick: 0,
            lastTick: 0,
          },
          {
            index: 3,
            position: new mp.Vector3(1512, 1490.7, -52.87),
            offset: new mp.Vector3(-1, 0, 0),
            len: 17,
            objects: [],
            lastObjectCreateTick: 0,
            lastSendRequestTick: 0,
            lastTick: 0,
          },
          {
            index: 4,
            position: new mp.Vector3(1521.5, 1508, -52.87),
            offset: new mp.Vector3(0, -1, 0),
            len: 17,
            objects: [],
            lastObjectCreateTick: 0,
            lastSendRequestTick: 0,
            lastTick: 0,
          },
          {
            index: 5,
            position: new mp.Vector3(1524.3, 1491, -52.87),
            offset: new mp.Vector3(0, 1, 0),
            len: 17,
            objects: [],
            lastObjectCreateTick: 0,
            lastSendRequestTick: 0,
            lastTick: 0,
          },
          {
            index: 6,
            position: new mp.Vector3(1531.7, 1508, -52.87),
            offset: new mp.Vector3(0, -1, 0),
            len: 17,
            objects: [],
            lastObjectCreateTick: 0,
            lastSendRequestTick: 0,
            lastTick: 0,
          },
        ],
        f = 20;
      let g = !1,
        h = !1,
        i = 0,
        j = 0;
      mp.events.add("c:ny:quest:sort:start", () => {
        (g = !0),
          (i = 0),
          (j = 0),
          mp.api.player.transitionTeleport({
            x: 1468.7,
            y: 1499.98,
            z: -51.7,
            heading: 0,
            fadeOutTime: 500,
            fadeInTime: 2e3,
            freeze: !1,
          }),
          mp.events.call(
            "client_quest_new",
            "NY22_SORT",
            "\u0421\u043F\u0430\u0441\u0435\u043D\u0438\u0435 \u0444\u0430\u0431\u0440\u0438\u043A\u0438 \u0421\u0430\u043D\u0442\u044B",
            "\u0423\u0431\u0435\u0440\u0438\u0442\u0435 \u0441 \u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440\u043E\u0432 \u0432\u0441\u044E \u043F\u043E\u043F\u0430\u0432\u0448\u0443\u044E \u0442\u0443\u0434\u0430 \u0431\u044B\u0442\u043E\u0432\u0443\u044E \u0445\u0438\u043C\u0438\u044E, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B \u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043F\u0430\u043B\u044C\u0446\u0435\u043C \u0438 \u043D\u0435 \u0437\u0430\u0434\u0435\u0432\u0430\u044F \u043F\u043E\u0434\u0430\u0440\u043A\u0438.",
            f,
            0
          );
      }),
        new global.TriggerColshape(
          a,
          2,
          40,
          () => {
            if (!(10 < Math.abs(localPlayer.position.z - a.z))) {
              const a = mp.api.server.tick();
              for (const b of e) b.lastTick = a;
              mp.events.add("render", k), (h = !0);
            }
          },
          () => {
            h &&
              (mp.events.remove("render", k),
              (h = !1),
              mp.events.call("client_quest_end", "NY22_SORT"));
          }
        );
      const k = () => {
        const a = mp.api.server.tick(),
          b = global.fingerPointingActive,
          h = b ? localPlayer.getBoneCoords(4170, 0.03, 0, 0) : null;
        for (const k of e) {
          g &&
            k.lastObjectCreateTick + c < a &&
            k.lastSendRequestTick + c < a &&
            ((k.lastSendRequestTick = a),
            mp.events.callRemote("s:ny:quest:sort:taskNewObject", k.index)),
            (k.objects = k.objects.filter((a) => mp.objects.exists(a)));
          const e = a - k.lastTick;
          k.lastTick = a;
          for (const a of k.objects) {
            if (!mp.objects.exists(a) || 0 === a.handle) continue;
            const c = a.getCoords(!0),
              l = new mp.Vector3(
                c.x + k.offset.x * d * e,
                c.y + k.offset.y * d * e,
                c.z + k.offset.z * d * e
              );
            if (
              mp.dist(k.position.x, k.position.y, k.position.z, l.x, l.y, l.z) >
              k.len
            ) {
              a.destroy();
              continue;
            }
            if (
              (a.setCoords(l.x, l.y, l.z, !0, !0, !0, !1),
              g && b && 0.6 > mp.dist(h.x, h.y, 0, l.x, l.y, 0))
            ) {
              mp.events.callRemote("s:ny:quest:sort:destroy", k.index, a.__id),
                a.__isGood ? j++ : i++,
                mp.events.call("client_quest_progress", "NY22_SORT", i),
                i >= f
                  ? (mp.events.callRemote("s:ny:quest:sort:end", !0),
                    (g = !1),
                    mp.api.player.transitionTeleport({
                      x: -427.36,
                      y: 1116.3,
                      z: 326.78,
                      heading: 0,
                      fadeOutTime: 500,
                      fadeInTime: 2e3,
                      freeze: !1,
                    }))
                  : j >= 10 &&
                    (mp.events.callRemote("s:ny:quest:sort:end", !1),
                    (g = !1),
                    mp.api.player.transitionTeleport({
                      x: -427.36,
                      y: 1116.3,
                      z: 326.78,
                      heading: 0,
                      fadeOutTime: 500,
                      fadeInTime: 2e3,
                      freeze: !1,
                    })),
                a.destroy();
              continue;
            }
          }
        }
      };
      mp.events.add("c:ny:quest:sort:objNew", (a, c, d) => {
        if (!h) return;
        const f = b[c];
        if (!f) return;
        const g = e[a];
        if (!g) return;
        g.lastObjectCreateTick = mp.api.server.tick();
        const i = mp.game.gameplay.getModelDimensions(f.hash),
          j = mp.objects.new(
            f.hash,
            g.position.add(new mp.Vector3(0, 0, -i.min.z)),
            {
              dimension: -1,
              rotation: new mp.Vector3(0, 0, 360 * Math.random()),
            }
          );
        (j.__id = d), (j.__isGood = f.isGood), g.objects.push(j);
      }),
        mp.events.add("c:ny:quest:sort:objDestroy", (a, b) => {
          if (h) {
            const c = e[a];
            if (c) {
              const a = c.objects.find((a) => a.__id === b);
              mp.objects.exists(a) && a.destroy();
            }
          }
        });
    })(),
    (() => {
      const a = new mp.Vector3(2523.885, 4826.075, 35.955),
        b = [
          { position: new mp.Vector3(2530.06, 4840.6, 35.51), heading: 194.53 },
          {
            position: new mp.Vector3(2538.86, 4837.73, 35.06),
            heading: 243.31,
          },
          {
            position: new mp.Vector3(2546.19, 4830.05, 34.42),
            heading: 242.66,
          },
          {
            position: new mp.Vector3(2552.34, 4823.09, 34.04),
            heading: 184.96,
          },
          {
            position: new mp.Vector3(2561.98, 4815.19, 33.68),
            heading: 142.72,
          },
          { position: new mp.Vector3(2574.55, 4804.04, 33.21), heading: 338.4 },
          { position: new mp.Vector3(2563.16, 4786.1, 32.83), heading: 146.53 },
          { position: new mp.Vector3(2557.15, 4783.98, 32.8), heading: 64.39 },
          { position: new mp.Vector3(2539.85, 4781.38, 33.94), heading: 16.7 },
          {
            position: new mp.Vector3(2545.41, 4792.21, 33.23),
            heading: 324.25,
          },
          {
            position: new mp.Vector3(2536.83, 4789.66, 33.76),
            heading: 112.77,
          },
          {
            position: new mp.Vector3(2539.06, 4800.73, 33.43),
            heading: 340.63,
          },
          {
            position: new mp.Vector3(2531.96, 4796.09, 33.82),
            heading: 131.74,
          },
          { position: new mp.Vector3(2520.95, 4800.65, 34.22), heading: 69.27 },
          {
            position: new mp.Vector3(2527.09, 4807.34, 33.84),
            heading: 310.37,
          },
          { position: new mp.Vector3(2527.33, 4812.04, 33.82), heading: 330.4 },
          {
            position: new mp.Vector3(2535.85, 4815.83, 33.96),
            heading: 297.14,
          },
          {
            position: new mp.Vector3(2537.58, 4824.77, 34.19),
            heading: 342.56,
          },
          { position: new mp.Vector3(2528.13, 4826.23, 34.42), heading: 84.62 },
          { position: new mp.Vector3(2522.14, 4819.25, 34.1), heading: 134.16 },
          {
            position: new mp.Vector3(2516.19, 4808.11, 34.23),
            heading: 153.97,
          },
          { position: new mp.Vector3(2504.8, 4812.73, 34.84), heading: 67.56 },
          { position: new mp.Vector3(2509.89, 4823.86, 34.7), heading: 331.48 },
          { position: new mp.Vector3(2536.25, 4787.34, 33.84), heading: 202.1 },
          { position: new mp.Vector3(2543.45, 4806.4, 33.55), heading: 305.41 },
        ],
        c = [
          { position: new mp.Vector3(2487.52, 4828.91, 35.2), heading: 358.7 },
          { position: new mp.Vector3(2479.03, 4831.39, 35.36), heading: 20.51 },
          { position: new mp.Vector3(2471.67, 4835.3, 35.64), heading: 49.81 },
          { position: new mp.Vector3(2466.45, 4844.23, 36.48), heading: 0.9 },
          { position: new mp.Vector3(2469.31, 4853.19, 37.11), heading: 6.21 },
          {
            position: new mp.Vector3(2478.46, 4860.48, 37.45),
            heading: 312.06,
          },
          { position: new mp.Vector3(2484.54, 4866.75, 37.93), heading: 355.6 },
          {
            position: new mp.Vector3(2490.34, 4874.19, 38.79),
            heading: 318.17,
          },
          { position: new mp.Vector3(2498.7, 4874.34, 38.6), heading: 256.08 },
          {
            position: new mp.Vector3(2507.24, 4869.64, 38.32),
            heading: 238.34,
          },
          {
            position: new mp.Vector3(2515.45, 4863.38, 38.21),
            heading: 230.94,
          },
          {
            position: new mp.Vector3(2513.37, 4856.31, 37.27),
            heading: 165.49,
          },
          { position: new mp.Vector3(2505.96, 4847.68, 36.31), heading: 77.07 },
          { position: new mp.Vector3(2499.88, 4840.54, 35.79), heading: 11.4 },
          { position: new mp.Vector3(2491.33, 4838.47, 35.51), heading: 89.92 },
          { position: new mp.Vector3(2481.14, 4838.5, 35.48), heading: 13.22 },
          { position: new mp.Vector3(2470.34, 4847.17, 36.53), heading: 30.29 },
          {
            position: new mp.Vector3(2477.46, 4850.69, 36.38),
            heading: 275.98,
          },
          {
            position: new mp.Vector3(2485.57, 4857.26, 36.77),
            heading: 309.86,
          },
          { position: new mp.Vector3(2497.23, 4858.81, 36.83), heading: 266.3 },
          {
            position: new mp.Vector3(2495.12, 4847.79, 35.99),
            heading: 160.71,
          },
          {
            position: new mp.Vector3(2497.69, 4861.49, 37.04),
            heading: 337.29,
          },
          { position: new mp.Vector3(2504.47, 4861.58, 37.11), heading: 282.5 },
          {
            position: new mp.Vector3(2497.34, 4854.36, 36.47),
            heading: 116.66,
          },
          { position: new mp.Vector3(2474.5, 4859.58, 37.47), heading: 66.35 },
          { position: new mp.Vector3(2464.75, 4838.63, 36.16), heading: 120.8 },
        ],
        d = mp.game.joaat("a_c_deer"),
        e = [
          [
            [2500.14, 4834.5],
            [2491.3, 4825.3],
            [2487.46, 4827.12],
            [2481.57, 4828.1],
            [2473.96, 4827.31],
            [2455.61, 4843.5],
            [2495.9, 4885.12],
            [2523.35, 4859.61],
            [2500.14, 4834.5],
          ],
        ];
      global.ServerPed.registerControllerScript("NY_QUEST_DEER", {
        onStreamIn(a) {
          a.entity.setBlockingOfNonTemporaryEvents(!0),
            a.entity.setAsMission(!0, !0);
        },
        onStreamOut(a) {},
        onChangeController(a, b) {
          localPlayer === b &&
            (a.entity.setCanBeDamaged(!1),
            a.entity.setCanRagdoll(!1),
            a.entity.setCanRagdollFromPlayerImpact(!1),
            a.entity.setProofs(!0, !0, !0, !0, !0, !0, !0, !0),
            a.entity.setSuffersCriticalHits(!1),
            a.entity.setInvincible(!0),
            a.entity.setBlockingOfNonTemporaryEvents(!0),
            a.entity.setAsMission(!0, !0),
            (a.playerId = -1),
            (a.lastUpdate = -1),
            (a.lastNearestPlayer = -1),
            (a.lastNearestPlayerTime = -1),
            (a.deathNotifyEnable = !1));
        },
        onTick(b) {
          const { x: f, y: g, z: h } = b.entity.getCoords(!0);
          if (
            -1 !== b.playerId &&
            mp.api.location.isPointInPolygon([f, g], e)
          ) {
            let a = 0;
            for (const e of c) {
              let c = !1;
              for (const a of mp.peds.streamed)
                if (a !== b.entity && a.getModel() === d) {
                  const { x: b, y: d, z: f } = a.getCoords(!0);
                  if (
                    3 >
                    mp.dist(b, d, f, e.position.x, e.position.y, e.position.z)
                  ) {
                    c = !0;
                    break;
                  }
                }
              if (c) {
                a++;
                continue;
              }
              1 > mp.dist(f, g, h, e.position.x, e.position.y, e.position.z)
                ? (mp.events.callRemote(
                    "s:ny:quest:animal:end",
                    b.id,
                    b.playerId,
                    a
                  ),
                  (b.playerId = -1))
                : b.lastUpdate + 5500 < Date.now() &&
                  ((b.lastUpdate = Date.now()),
                  b.entity.taskGoStraightToCoord(
                    e.position.x,
                    e.position.y,
                    e.position.z,
                    2,
                    9999,
                    0,
                    1
                  ));
            }
            return;
          }
          let i = null,
            j = 3;
          if (
            (mp.players.forEachInStreamRange((a) => {
              const { x: b, y: c, z: d } = a.position,
                e = mp.dist(f, g, h, b, c, d);
              e < j && ((j = e), (i = a));
            }),
            !i ||
              i.vehicle ||
              (i.remoteId !== b.lastNearestPlayer &&
                b.lastNearestPlayerTime + 1e4 > Date.now()))
          )
            return void b.entity.clearTasks();
          const { x: k, y: l, z: m } = i.position;
          return mp.dist(k, l, m, a.x, a.y, a.z) > 66
            ? void b.entity.clearTasks()
            : void (b.entity.taskFollowToOffsetOf(
                i.handle,
                0,
                0,
                0,
                0.5,
                -1,
                0.25,
                !0
              ),
              (b.lastNearestPlayer = i.remoteId),
              (b.lastNearestPlayerTime = Date.now()),
              mp.api.location.isPointInPolygon([f, g], e) &&
                (b.playerId = i.remoteId));
        },
      });
      let f = null;
      global.registerPlayerQuest({
        code: "NY22_ANIMAL_DAY",
        onStart: () => {
          mp.blips.exists(f) && f.destroy(),
            (f = mp.blips.new(467, new mp.Vector3(2539.29, 4813.71, 33.81), {
              color: 1,
              shortRange: !1,
              name: "?",
              dimension: 0,
            }));
        },
        onChangePart: () => {},
        onEnd: () => {
          mp.blips.exists(f) && f.destroy();
        },
      });
    })(),
    (() => {
      const a = new mp.Vector3(896.13, -3170.72, -98.12),
        b = new mp.Vector3(-463.85, 1130.44, 325.86);
      let c = !1,
        d = 0,
        e = 0,
        f = !1;
      mp.events.add("c:ny:quest:shooting:start", () => {
        if (c) return;
        mp.game.interior.enableInteriorProp(258561, "gun_range_lights"),
          mp.game.interior.enableInteriorProp(258561, "gun_wall_blocker"),
          mp.game.interior.refreshInterior(258561);
        const g = mp.players.local;
        (c = !0),
          (d = 20),
          (e = 0),
          (f = !1),
          mp.api.player.transitionTeleport({
            x: a.x,
            y: a.y,
            z: a.z,
            heading: 350,
            fadeOutTime: 500,
            fadeInTime: 2e3,
            freeze: !0,
          });
        const h = [
          {
            left: new mp.Vector3(893.75, -3161.4, -98.12),
            center: new mp.Vector3(897.7, -3162.12, -98.12),
            right: new mp.Vector3(901.59, -3162.8, -98.12),
            speed: 0.025,
          },
          {
            left: new mp.Vector3(894.18, -3158.84, -98.12),
            center: new mp.Vector3(897.83, -3159.57, -98.12),
            right: new mp.Vector3(902.08, -3160.31, -98.12),
            speed: 0.02,
          },
          {
            left: new mp.Vector3(895.02, -3153.83, -98.12),
            center: new mp.Vector3(899.08, -3154.55, -98.12),
            right: new mp.Vector3(902.89, -3155.24, -98.12),
            speed: 0.01,
          },
        ];
        let i = 0,
          j = mp.objects.new(
            mp.game.joaat("dge_nag_snowman_005"),
            h[i].center,
            { rotation: new mp.Vector3(0, 0, 350), dimension: -1 }
          ),
          k = 0.5 < Math.random();
        const l = () => {
          d--;
        };
        mp.events.add("playerWeaponShot", l);
        const m = Date.now(),
          n = setInterval(() => {
            if (!(m + 1550 > Date.now())) {
              const { x: a, y: b, z: c } = localPlayer.position;
              1.5 < mp.game.system.vdist(a, b, c, 896.13, -3170.72, -98.12) &&
                mp.players.local.setCoordsNoOffset(
                  896.13,
                  -3170.72,
                  -98.12,
                  !1,
                  !1,
                  !1
                ),
                mp.objects.exists(j) &&
                  0 !== j.handle &&
                  (k
                    ? ((j.position = new mp.Vector3(
                        j.position.x - h[i].speed,
                        j.position.y,
                        j.position.z
                      )),
                      j.position.x <= h[i].left.x && (k = !1))
                    : ((j.position = new mp.Vector3(
                        j.position.x + h[i].speed,
                        j.position.y,
                        j.position.z
                      )),
                      j.position.x >= h[i].right.x && (k = !0)));
            }
          }, 0),
          o = () => {
            if (
              !(m + 1550 > Date.now()) &&
              ((!(0 >= d) && g.dimension === g.remoteId + 1 && c) ||
                f ||
                ((f = !0),
                setTimeout(() => {
                  mp.events.remove("render", o),
                    mp.events.remove("playerWeaponShot", l),
                    clearInterval(n),
                    mp.objects.exists(j) && j.destroy(),
                    mp.api.player.transitionTeleport({
                      x: b.x,
                      y: b.y,
                      z: b.z,
                      heading: 343.44,
                      fadeOutTime: 500,
                      fadeInTime: 1e3,
                      freeze: !1,
                    }),
                    (c = !1),
                    mp.events.callRemote("s:ny:quest:shooting:end", 15 <= e);
                }, 1500)),
              mp.game.controls.disableControlAction(0, 21, !0),
              mp.game.controls.disableControlAction(0, 22, !0),
              mp.game.graphics.drawText(
                `СНЕЖКОВ: ${d} | ОЧКОВ: ${e}`,
                [0.5, 0.9],
                {
                  font: 4,
                  centre: !0,
                  color: [255, 255, 255, 255],
                  scale: [0.4, 0.4],
                  outline: !1,
                }
              ),
              mp.objects.exists(j) &&
                0 !== j.handle &&
                j.hasBeenDamagedByAnyPed())
            ) {
              const { x: a, y: b, z: c } = localPlayer.position;
              2 > mp.game.system.vdist(a, b, c, 896.13, -3170.72, -98.12) &&
                e++,
                i++,
                i >= h.length && (i = 0),
                mp.objects.exists(j) && j.destroy(),
                (j = mp.objects.new(
                  mp.game.joaat("dge_nag_snowman_005"),
                  h[i].center,
                  { rotation: new mp.Vector3(0, 0, 350), dimension: -1 }
                )),
                (k = 0.5 < Math.random());
            }
          };
        mp.events.add("render", o);
      });
    })(),
    (() => {
      var b = Math.floor;
      mp.events.add("c:ny:quest:music:data", (a, c, d) => {
        global.mainBrowser.execute(
          `client_playMusic('https://files.gta5rp.com/FS/Music/${a}', 0.5);`
        ),
          global.mainMenuItems.set(
            "\u0423\u0433\u0430\u0434\u0430\u0442\u044C \u043C\u0435\u043B\u043E\u0434\u0438\u044E",
            () => {
              global.createMenuList({
                toPlayer: "auto",
                items: k(d.split("%1%")).map((a) => [
                  a,
                  () => {
                    global.hideMenuList(),
                      global.mainMenuItems.delete(
                        "\u0423\u0433\u0430\u0434\u0430\u0442\u044C \u043C\u0435\u043B\u043E\u0434\u0438\u044E"
                      ),
                      mp.events.callRemote("s:ny:quest:music:ans", a);
                  },
                ]),
              });
            }
          ),
          mp.api.notify.info(
            "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 M \u0434\u043B\u044F \u043E\u0442\u0432\u0435\u0442\u0430"
          ),
          f(
            "\u0412\u0440\u0435\u043C\u044F \u043D\u0430 \u043E\u0442\u0432\u0435\u0442",
            5 + b(c / 1e3)
          );
      });
      let a = !1,
        c = "",
        d = 0,
        e = -1;
      const f = (b, f) => {
          (c = b),
            (d = f),
            (e = i()),
            a || mp.events.add("render", h),
            (a = !0);
        },
        g = () => {
          a && mp.events.remove("render", h), (a = !1);
        },
        h = () => {
          const a = d - (i() - e);
          return 0 >= a
            ? void g()
            : void (mp.game.graphics.drawText(
                c,
                [0.5, 0.04 + (global.enableCompass ? 0.05 : 0)],
                {
                  font: 4,
                  centre: !0,
                  color: [255, 255, 255, 255],
                  scale: [0.6, 0.6],
                  outline: !1,
                }
              ),
              mp.game.graphics.drawText(
                `${j(b(a / 60))}:${j(a % 60)}`,
                [0.5, 0.075 + (global.enableCompass ? 0.05 : 0)],
                {
                  font: 4,
                  centre: !0,
                  color: [255, 255, 255, 255],
                  scale: [0.6, 0.6],
                  outline: !1,
                }
              ));
        },
        i = () => b(new Date().getTime() / 1e3),
        j = (a) => (10 > a ? "0" + a : a),
        k = (c) => {
          for (let a = c.length - 1; 0 < a; a--) {
            const d = b(Math.random() * (a + 1));
            [c[a], c[d]] = [c[d], c[a]];
          }
          return c;
        };
    })();
  const WEAPON_SNOWBALL = mp.game.joaat("weapon_snowball");
  global.binder.register({
    action: "NY_GET_SNOWBALL",
    desc: "\u0421\u043B\u0435\u043F\u0438\u0442\u044C \u0441\u043D\u0435\u0436\u043E\u043A",
    defaultKey: -1,
    func: async () => {
      if (
        !(
          mp.gui.cursor.visible ||
          global.isChatOpen ||
          global.disableKeys ||
          global.isSmartphoneOpen ||
          localPlayer.vehicle ||
          localPlayer.getVariable("cuffed") ||
          localPlayer.getIsTaskActive(167)
        )
      ) {
        if (0 !== global.getPlayerCurrentWeaponData().weapon)
          return mp.api.notify.error(
            "\u0423 \u0432\u0430\u0441 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043E\u0440\u0443\u0436\u0438\u044F \u0432 \u0440\u0443\u043A\u0430\u0445"
          );
        const { x: a, y: b, z: c } = localPlayer.position;
        if (mp.game.pathfind.isPointOnRoad(a, b, c, 0))
          return mp.api.notify.error(
            "\u0418\u0433\u0440\u0430\u0442\u044C \u043D\u0430 \u043F\u0440\u043E\u0435\u0437\u0436\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 \u043E\u043F\u0430\u0441\u043D\u043E!"
          );
        if (!mp.game.interior.areCoordsCollidingWithExterior(a, b, c))
          return mp.api.notify.error(
            "\u0422\u0443\u0442 \u043D\u0435\u0442 \u0441\u043D\u0435\u0433\u0430"
          );
        if (
          localPlayer.weapon !== WEAPON_SNOWBALL &&
          localPlayer.weapon << 0 !== WEAPON_SNOWBALL &&
          global.actionAntiFlood("s:ny:snowball:get", 2e3)
        ) {
          if (
            (localPlayer.giveWeapon(WEAPON_SNOWBALL, 1, !1),
            mp.events.callRemote("s:ny:snowball:get"),
            !mp.game.streaming.hasAnimDictLoaded("anim@mp_snowball"))
          ) {
            mp.game.streaming.requestAnimDict("anim@mp_snowball");
            do await mp.game.waitAsync(10);
            while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_snowball"));
          }
          localPlayer.taskPlayAnim(
            "anim@mp_snowball",
            "pickup_snowball",
            8,
            -8,
            -1,
            0,
            0,
            !1,
            !1,
            !1
          ),
            await mp.game.waitAsync(500),
            mp.game.weapon.setCurrentPed(
              localPlayer.handle,
              WEAPON_SNOWBALL,
              !0
            );
        }
      }
    },
  });
}
腨Ͼ;
