{
  const localPlayer = mp.players.local;
  let bizWarStatBrowser = null,
    bizWarBlip = 0,
    bizWarCheckInterval = null,
    bizWarIsTeleported = !1;
  mp.events.add("client_bizWar_start", (a, b, c, d, e, f, g, h, i) => {
    if (
      ((global.compass.position.y = 0.07),
      mp.browsers.exists(bizWarStatBrowser) ||
        (bizWarStatBrowser = mp.browsers.new(
          "package://Events/BizWar/ui.html"
        )),
      global.rpc.triggerBrowser(bizWarStatBrowser, "load_data", {
        status: !0,
        attacker: d,
        defender: e,
        time: f,
        attackerCount: g,
        defenderCount: h,
      }),
      global.discordUpdate(
        "\u041A\u0440\u044B\u0448\u0443\u0435\u0442 \u0431\u0438\u0437\u043D\u0435\u0441"
      ),
      (global.disableAnimList = !0),
      (global.disableTargetMenu = !0),
      (global.isPlayerInCapture = !0),
      (bizWarBlip = mp.game.ui.addBlipForRadius(a, b, 1, c)),
      mp.game.invoke("0x45FF974EEE1C8734", bizWarBlip, 70),
      mp.game.invoke("0x03D7FB09E75D6B7E", bizWarBlip, 6),
      null != bizWarCheckInterval &&
        (clearInterval(bizWarCheckInterval), (bizWarCheckInterval = null)),
      (bizWarIsTeleported = !1),
      (bizWarCheckInterval = setInterval(() => {
        bizWarIsTeleported
          ? 0 === localPlayer.dimension &&
            (mp.events.call("client_bizWar_end"),
            mp.events.callRemote("server_bizWar_leaveFromZone"))
          : (bizWarIsTeleported = 0 !== localPlayer.dimension),
          mp.game.system.vdist(
            localPlayer.position.x,
            localPlayer.position.y,
            1,
            a,
            b,
            1
          ) > c &&
            !global.isPlayerDeath &&
            mp.players.local.applyDamageTo(5, !0);
        const d = localPlayer.getVariable("factionId");
        mp.players.forEachInStreamRange((a) => {
          a !== localPlayer &&
            (a.getVariable("factionId") !== d ||
              a.getVariable(mp.serverDataKeys.isAdmin) ||
              mp.events.call("client_playerBlip_create", a.remoteId, 0));
        });
      }, 1e3)),
      0 < i)
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
      }, 1e3 * i),
        global.mainBrowser.execute(`startGameCounterSec(${i})`);
    }
    mp.events.call("client_weather_setSpecialWeather", "EXTRASUNNY");
  }),
    mp.events.add("client_bizWar_kill", (a, b, c, d, e, f, g, h) => {
      mp.browsers.exists(bizWarStatBrowser) &&
        global.rpc.triggerBrowser(bizWarStatBrowser, "update_data", {
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
    mp.events.add("client_bizWar_end", () => {
      (global.compass.position.y = 0.03),
        mp.browsers.exists(bizWarStatBrowser) &&
          (bizWarStatBrowser.destroy(), (bizWarStatBrowser = null)),
        global.discordUpdate(),
        (global.disableAnimList = !1),
        (global.disableTargetMenu = !1),
        (global.isPlayerInCapture = !1),
        mp.game.invoke("0xA6DB27D19ECBB7DA", bizWarBlip) &&
          mp.game.ui.removeBlip(bizWarBlip),
        null != bizWarCheckInterval &&
          (clearInterval(bizWarCheckInterval), (bizWarCheckInterval = null)),
        mp.events.call("client_playerBlip_clear"),
        mp.events.call("client_weather_setSpecialWeather", "");
    });
  const MAFIA_FACTION_LIST = [
    "F_ARMENIAMAFIA",
    "F_ITALYMAFIA",
    "F_MEXICOMAFIA",
    "F_RUSSIANMAFIA",
    "F_YAKUZA",
  ];
  let captureNotifyEnbale = !1,
    captureNotifyInterval = null;
  MAFIA_FACTION_LIST.forEach((a) => {
    global.registerFactionEvent({
      factionId: a,
      onEnter: () => {
        mp.markers.forEach((c) => {
          c.getVariable("bizWarNotify" + a) &&
            b(c, c.getVariable("bizWarNotify" + a));
        });
      },
      onLeave: () => {},
    }),
      mp.events.addDataHandler("bizWarNotify" + a, (c, d) => {
        localPlayer.getVariable("factionId") !== a || b(c, d);
      });
    const b = (a, b) => {
      global.mainBrowser.execute(`
            mainHud.bizWarNotify = \`${b}\`;
        `),
        (captureNotifyEnbale = !0),
        null != captureNotifyInterval && clearInterval(captureNotifyInterval),
        (captureNotifyInterval = setInterval(() => {
          if (!mp.markers.exists(a))
            return (
              global.mainBrowser.execute(`
                    mainHud.bizWarNotify = '';
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
  });
}
