{
  const localPlayer = mp.players.local,
    gangZoneList = new Set(),
    gangZoneMap = new Map(),
    GANGZONE_STATUS = { NORMAL: 1, ATTACK: 2 };
  class GangZone {
    constructor(a, b, c, d, e, f) {
      (this.id = a),
        (this.color = b),
        (this.position = c),
        (this.rot = d),
        (this.range = e),
        (this.blip = mp.blips.new(5, this.position, {
          name: "",
          scale: 1,
          color: this.color,
          alpha: 70,
          drawDistance: 100,
          shortRange: !0,
          rotation: this.rot,
          dimension: -1,
          radius: this.range,
        })),
        (this.status = f),
        this.updateStatus(f),
        gangZoneMap.set(a, this),
        gangZoneList.add(this);
    }
    setBlipData(a, b, c, d, e) {
      (this.position = new mp.Vector3(a, b, c)),
        (this.rot = d),
        (this.range = e),
        mp.blips.exists(this.blip) && this.blip.destroy(),
        (this.blip = mp.blips.new(5, this.position, {
          name: "",
          scale: 1,
          color: this.color,
          alpha: 70,
          drawDistance: 100,
          shortRange: !0,
          rotation: this.rot,
          dimension: 0,
          radius: this.range,
        })),
        this.updateStatus(this.status);
    }
    updateStatus(a) {
      return (
        (this.status = a),
        a == GANGZONE_STATUS.NORMAL
          ? void this.blip.setFlashes(!1)
          : a == GANGZONE_STATUS.ATTACK
          ? void this.blip.setFlashes(!0)
          : void 0
      );
    }
    setColor(a) {
      (this.color = a), this.blip.setColour(this.color);
    }
    isNearGround() {
      return !0;
    }
    isInsideArea() {
      var a = Math.sin,
        b = Math.cos,
        c = Math.PI;
      let d = {
        x: localPlayer.position.x,
        y: localPlayer.position.y,
        z: localPlayer.position.z,
      };
      var e = Math.sqrt(
        1.2 * this.range * (1.2 * this.range) +
          ((1.2 * this.range) / 2) * ((1.2 * this.range) / 2)
      );
      let f = (this.rot + 45) * (c / 180),
        g = { x: this.position.x + e * b(f), y: this.position.y + e * a(f) };
      f = (this.rot + 135) * (c / 180);
      let h = { x: this.position.x + e * b(f), y: this.position.y + e * a(f) };
      f = (this.rot + 225) * (c / 180);
      let i = { x: this.position.x + e * b(f), y: this.position.y + e * a(f) };
      f = (this.rot + 315) * (c / 180);
      let j = { x: this.position.x + e * b(f), y: this.position.y + e * a(f) },
        k = [
          [g.x, g.y],
          [h.x, h.y],
          [i.x, i.y],
          [j.x, j.y],
        ];
      return this._inside([d.x, d.y], k);
    }
    destroy() {
      this.blip.destroy(),
        gangZoneMap.delete(this.id),
        gangZoneList.delete(this);
    }
    _inside(a, b) {
      let c = a[0],
        d = a[1],
        e = !1;
      for (let f = 0, g = b.length - 1; f < b.length; g = f++) {
        let a = b[f][0],
          h = b[f][1],
          i = b[g][0],
          j = b[g][1];
        h > d != j > d && c < ((i - a) * (d - h)) / (j - h) + a && (e = !e);
      }
      return e;
    }
  }
  mp.events.add("serverWorldDataReady", () => {
    setTimeout(() => {
      mp.markers.forEach((a) => {
        if (1488 === a.dimension) {
          const b = a.getVariable("_gz");
          if (b) {
            const a = JSON.parse(b);
            new GangZone(
              a[0],
              a[1],
              new mp.Vector3(
                parseFloat(a[2]),
                parseFloat(a[3]),
                parseFloat(a[4])
              ),
              parseFloat(a[5]),
              a[6],
              a[7]
            );
          }
        }
      }),
        mp.events.addDataHandler("_gz", (a, b) => {
          const c = JSON.parse(b),
            d = new mp.Vector3(
              parseFloat(c[2]),
              parseFloat(c[3]),
              parseFloat(c[4])
            ),
            e = parseFloat(c[5]),
            f = c[6],
            g = gangZoneMap.get(c[0]);
          return g
            ? void ((0.01 <
                mp.dist(
                  d.x,
                  d.y,
                  d.z,
                  g.position.x,
                  g.position.y,
                  g.position.z
                ) ||
                g.rot !== e ||
                g.range !== f) &&
                g.setBlipData(d.x, d.y, d.z, e, f),
              g.color !== c[1] && g.setColor(c[1]),
              g.status !== c[7] && g.updateStatus(c[7]))
            : void new GangZone(c[0], c[1], d, e, f, c[7]);
        }),
        mp.events.add("client_gangZone_status", (a, b) => {
          const c = gangZoneMap.get(a);
          c && c.updateStatus(b);
        });
    }, 3e3);
  }),
    mp.events.add("client_gangZone_destroy", (a) => {
      const b = gangZoneMap.get(a);
      b && b.destroy();
    });
  let captureStatBrowser = null,
    captureZone = null,
    captureBlip = 0,
    captureCheckInterval = null,
    captureIsTeleported = !1;
  mp.events.add("client_gangCapture_start", (a, b, c, d, e, f, g) => {
    if (
      ((global.compass.position.y = 0.07),
      mp.browsers.exists(captureStatBrowser) ||
        (captureStatBrowser = mp.browsers.new(
          "package://Objects/GangZone/ui.html"
        )),
      global.rpc.triggerBrowser(captureStatBrowser, "load_data", {
        status: !0,
        attacker: b,
        defender: c,
        time: d,
        attackerCount: e,
        defenderCount: f,
      }),
      global.discordUpdate(
        "\u0411\u044C\u0435\u0442\u0441\u044F \u0437\u0430 \u0440\u0430\u0439\u043E\u043D"
      ),
      (global.disableAnimList = !0),
      (global.disableTargetMenu = !0),
      (global.isPlayerInCapture = !0),
      (captureZone = gangZoneMap.get(a)),
      captureZone &&
        ((captureBlip = mp.game.ui.addBlipForRadius(
          captureZone.position.x,
          captureZone.position.y,
          1,
          1.4242136 * captureZone.range
        )),
        mp.game.invoke("0x45FF974EEE1C8734", captureBlip, 70),
        mp.game.invoke("0x03D7FB09E75D6B7E", captureBlip, 0)),
      null != captureCheckInterval &&
        (clearInterval(captureCheckInterval), (captureCheckInterval = null)),
      (captureIsTeleported = !1),
      (captureCheckInterval = setInterval(() => {
        captureIsTeleported
          ? 0 === localPlayer.dimension &&
            (mp.events.call("client_gangCapture_end"),
            mp.events.callRemote("server_gangCapture_leaveFromZone"))
          : (captureIsTeleported = 0 !== localPlayer.dimension),
          captureZone &&
            mp.game.system.vdist(
              localPlayer.position.x,
              localPlayer.position.y,
              1,
              captureZone.position.x,
              captureZone.position.y,
              1
            ) >
              1.4242136 * captureZone.range &&
            !global.isPlayerDeath &&
            mp.players.local.applyDamageTo(5, !0);
        const a = localPlayer.getVariable("factionId");
        mp.players.forEachInStreamRange((b) => {
          b !== localPlayer &&
            (b.getVariable("factionId") !== a ||
              b.getVariable(mp.serverDataKeys.isAdmin) ||
              mp.events.call("client_playerBlip_create", b.remoteId, 0));
        });
      }, 1e3)),
      0 < g)
    ) {
      global.setCameraToPlayer(
        1,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0),
        0,
        0,
        80
      ),
        global.resetCamera();
      const a = setInterval(() => {
        mp.game.controls.disableControlAction(0, 30, !0),
          mp.game.controls.disableControlAction(0, 31, !0),
          mp.game.controls.disableControlAction(0, 32, !0),
          mp.game.controls.disableControlAction(0, 33, !0),
          mp.game.controls.disableControlAction(0, 34, !0),
          mp.game.controls.disableControlAction(0, 35, !0),
          mp.game.controls.disableControlAction(0, 266, !0),
          mp.game.controls.disableControlAction(0, 267, !0),
          mp.game.controls.disableControlAction(0, 268, !0),
          mp.game.controls.disableControlAction(0, 269, !0),
          mp.game.controls.disableControlAction(0, 21, !0),
          mp.game.controls.disableControlAction(0, 22, !0),
          mp.game.controls.disableControlAction(0, 23, !0),
          mp.game.controls.disableControlAction(0, 24, !0),
          mp.game.controls.disableControlAction(0, 25, !0),
          mp.game.controls.disableControlAction(0, 141, !0),
          mp.game.controls.disableControlAction(0, 257, !0),
          mp.game.controls.disableControlAction(0, 68, !0),
          mp.game.controls.disableControlAction(0, 69, !0),
          mp.game.controls.disableControlAction(0, 70, !0),
          mp.game.controls.disableControlAction(0, 91, !0),
          mp.game.controls.disableControlAction(0, 92, !0);
      }, 0);
      setTimeout(() => {
        localPlayer.clearTasksImmediately(), clearInterval(a);
      }, 1e3 * g),
        global.mainBrowser.execute(`startGameCounterSec(${g})`);
    }
    mp.events.call("client_weather_setSpecialWeather", "EXTRASUNNY");
  }),
    mp.events.add("client_gangCapture_kill", (a, b, c, d, e, f, g, h) => {
      mp.browsers.exists(captureStatBrowser) &&
        global.rpc.triggerBrowser(captureStatBrowser, "update_data", {
          time: c,
          attackerCount: a,
          defenderCount: b,
        });
      null == d ||
        mp.events.call(
          "clientFunc_killLog",
          d,
          e.replace("_", " "),
          f,
          g.replace("_", " "),
          h
        );
    }),
    mp.events.add("client_gangCapture_end", () => {
      (global.compass.position.y = 0.03),
        mp.browsers.exists(captureStatBrowser) &&
          (captureStatBrowser.destroy(), (captureStatBrowser = null)),
        global.discordUpdate(),
        (global.disableAnimList = !1),
        (global.disableTargetMenu = !1),
        (global.isPlayerInCapture = !1),
        mp.game.invoke("0xA6DB27D19ECBB7DA", captureBlip) &&
          mp.game.ui.removeBlip(captureBlip),
        null != captureCheckInterval &&
          (clearInterval(captureCheckInterval), (captureCheckInterval = null)),
        mp.events.call("client_playerBlip_clear"),
        mp.events.call("client_weather_setSpecialWeather", "");
    });
  const GANG_FACTION_LIST = [
      "F_GANG_BALLAS",
      "F_GANG_BLOODS",
      "F_GANG_GROVE",
      "F_GANG_MARABUNTA",
      "F_GANG_VAGOS",
    ],
    GANG_FACTION_COLOR = {
      F_GANG_BALLAS: 61,
      F_GANG_BLOODS: 1,
      F_GANG_GROVE: 43,
      F_GANG_MARABUNTA: 42,
      F_GANG_VAGOS: 5,
    };
  let captureNotifyEnbale = !1,
    captureNotifyInterval = null,
    captureCheckGangZoneInterval = null;
  GANG_FACTION_LIST.forEach((a) => {
    global.registerFactionEvent({
      factionId: a,
      onEnter: () => {
        mp.markers.forEach((c) => {
          c.getVariable("gangCaptNotify" + a) &&
            b(c, c.getVariable("gangCaptNotify" + a));
        }),
          null != captureCheckGangZoneInterval &&
            clearInterval(captureCheckGangZoneInterval),
          (captureCheckGangZoneInterval = setInterval(() => {
            for (const b of gangZoneList)
              if (
                b.status === GANGZONE_STATUS.NORMAL &&
                b.color !== GANG_FACTION_COLOR[a] &&
                b.isInsideArea()
              )
                return void global.mainMenuItems.set(
                  "\u0417\u0430\u0431\u0438\u0442\u044C \u043A\u0430\u043F\u0442",
                  () => {
                    b.isInsideArea() &&
                      mp.events.call("client_faction_gang_captureMenu", b.id);
                  }
                );
            global.mainMenuItems.delete(
              "\u0417\u0430\u0431\u0438\u0442\u044C \u043A\u0430\u043F\u0442"
            );
          }, 2500));
      },
      onLeave: () => {
        null != captureCheckGangZoneInterval &&
          (clearInterval(captureCheckGangZoneInterval),
          (captureCheckGangZoneInterval = null)),
          global.mainMenuItems.delete(
            "\u0417\u0430\u0431\u0438\u0442\u044C \u043A\u0430\u043F\u0442"
          );
      },
    }),
      mp.events.addDataHandler("gangCaptNotify" + a, (c, d) => {
        localPlayer.getVariable("factionId") !== a || b(c, d);
      });
    const b = (a, b) => {
      global.mainBrowser.execute(`
            mainHud.gangCaptureNotify = \`${b}\`;
        `),
        (captureNotifyEnbale = !0),
        null != captureNotifyInterval && clearInterval(captureNotifyInterval),
        (captureNotifyInterval = setInterval(() => {
          if (!mp.markers.exists(a))
            return (
              global.mainBrowser.execute(`
                    mainHud.gangCaptureNotify = '';
                `),
              (captureNotifyEnbale = !1),
              void (
                null != captureNotifyInterval &&
                (clearInterval(captureNotifyInterval),
                (captureNotifyInterval = null))
              )
            );
        }, 500));
    };
  }),
    global.rpc.register("client_gangZone_findMy", () => {
      for (const a of gangZoneList) if (a.isInsideArea()) return a.id;
      return -1;
    });
}
