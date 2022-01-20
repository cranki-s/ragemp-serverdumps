{
  const localPlayer = mp.players.local,
    gameplayCam = mp.cameras.new("gameplay"),
    graphics = mp.game.graphics;
  let escort = !1,
    escortTo = null,
    escortInterval = null,
    taskEnterVeh = !1;
  const escortEvent = () => {
    mp.game.controls.disableAllControlActions(1),
      mp.game.controls.disableAllControlActions(2);
  };
  mp.events.add("client_playerSync_escortTo", function (a) {
    escort &&
      (escortInterval && clearInterval(escortInterval),
      mp.events.remove("render", escortEvent)),
      (escort = !0),
      (escortTo = a);
    let b = 0;
    (escortInterval = setInterval(() => {
      if (escortTo && mp.players.exists(escortTo)) {
        if (0 === escortTo.handle)
          return void (10 > ++b
            ? mp.events.callRemote("server_playerSync_escortTeleport")
            : (mp.events.callRemote("server_playerSync_escortOff"),
              mp.events.call("client_playerSync_escortOff")));
        if (
          0 > localPlayer.getVariable("rsd") ||
          0 > escortTo.getVariable("rsd") ||
          25 <
            mp.dist(
              localPlayer.position.x,
              localPlayer.position.y,
              localPlayer.position.z,
              escortTo.position.x,
              escortTo.position.y,
              escortTo.position.z
            )
        )
          return (
            mp.events.callRemote("server_playerSync_escortOff"),
            void mp.events.call("client_playerSync_escortOff")
          );
        (b = 0),
          1 <
            mp.dist(
              localPlayer.position.x,
              localPlayer.position.y,
              0,
              escortTo.position.x,
              escortTo.position.y,
              0
            ) &&
            localPlayer.taskGoStraightToCoord(
              escortTo.position.x,
              escortTo.position.y,
              escortTo.position.z,
              6.2,
              -1,
              escortTo.getHeading(),
              1
            );
      } else
        mp.events.callRemote("server_playerSync_escortOff"),
          mp.events.call("client_playerSync_escortOff");
    }, 1e3)),
      mp.events.add("render", escortEvent);
  }),
    mp.events.add("client_playerSync_escortOff", function () {
      escort &&
        ((escort = !1),
        (escortTo = null),
        clearInterval(escortInterval),
        (escortInterval = null),
        localPlayer.clearTasks(),
        mp.events.remove("render", escortEvent));
    });
  let isPlayerInCuff = !1;
  const playerCuffRenderEvent = () => {
    mp.game.controls.disableControlAction(0, 25, !0),
      mp.game.controls.disableControlAction(0, 141, !0);
  };
  mp.events.add("client_playerSync_cuffStatus", function (a) {
    return a && !isPlayerInCuff
      ? ((isPlayerInCuff = !0),
        void mp.events.add("render", playerCuffRenderEvent))
      : !a && isPlayerInCuff
      ? ((isPlayerInCuff = !1),
        void mp.events.remove("render", playerCuffRenderEvent))
      : void 0;
  });
  let isBagInHead = !1;
  const bagInHeadRenderEvent = () => {
    mp.game.cam.setFollowPedCamViewMode(4),
      mp.game.controls.disableControlAction(0, 0, !0),
      mp.game.controls.disableControlAction(1, 0, !0),
      mp.game.controls.disableControlAction(2, 0, !0);
  };
  mp.events.add("client_playerSync_headBag", function (a) {
    return a && !isBagInHead
      ? ((isBagInHead = !0),
        mp.game.ui.displayRadar(!1),
        mp.events.add("render", bagInHeadRenderEvent),
        void global.mainBrowser.execute(`UI_effect_bagInHead(true);`))
      : !a && isBagInHead
      ? ((isBagInHead = !1),
        mp.game.ui.displayRadar(!0),
        mp.events.remove("render", bagInHeadRenderEvent),
        void global.mainBrowser.execute(`UI_effect_bagInHead(false);`))
      : void 0;
  });
  let enbaleDrugsEffect = !1,
    drugsTimer = null,
    drugsTimerCounter = null,
    drugAddiction = 0,
    lastUseDrug = -1;
  mp.events.add("client_playerEffect_drugs_start", function (a) {
    lastUseDrug = new Date().getTime() / 1e3;
    const b = global.getGlobalStorage().settings.disableScreenEffect;
    (enbaleDrugsEffect = !0), null != drugsTimer && clearInterval(drugsTimer);
    let c = ["SuccessTrevor", "ChopVision", "DrugsMichaelAliensFight"][a];
    b || mp.game.graphics.startScreenEffect(c, 12e4, !1),
      toggleIco("drugs", !0),
      (drugsTimerCounter = 120),
      (drugsTimer = setInterval(() => {
        0.998 < Math.random() &&
          !b &&
          global.mainBrowser.execute(
            "UI_effect_drugs(); UI_effect_drugs(); UI_effect_drugs(); UI_effect_drugs(); UI_effect_drugs(); UI_effect_drugs(); UI_effect_drugs(); UI_effect_drugs(); UI_effect_drugs();"
          ),
          drugsTimerCounter--,
          0 >= drugsTimerCounter &&
            (toggleIco("drugs", !1),
            (enbaleDrugsEffect = !1),
            clearInterval(drugsTimer),
            (drugsTimer = null),
            !b && mp.game.graphics.stopScreenEffect(c));
      }, 1e3));
  }),
    setInterval(() => {
      Math.random() < drugAddiction / 100 &&
        0.7 < Math.random() &&
        lastUseDrug + 1200 < new Date().getTime() / 1e3 &&
        null === localPlayer.vehicle &&
        !localPlayer.isAttached() &&
        localPlayer.dimension < localPlayer.remoteId &&
        (mp.events.callRemote("server_player_requestDrugAnim"),
        (global.disableAnimList = !0),
        setTimeout(() => {
          global.disableAnimList = !1;
        }, 5e3));
    }, 1e3 * (75 + Math.round(10 * Math.random())));
  let enableAlcoEffect = !1,
    alcoTimer = null,
    alctoTimerCounter = 0;
  mp.events.add("client_playerEffect_alco_start", function (a) {
    if (enableAlcoEffect) return void (alctoTimerCounter += a);
    const b = global.getGlobalStorage().settings.disableScreenEffect;
    (enableAlcoEffect = !0),
      (alctoTimerCounter = a),
      toggleIco("alco", !0),
      b || mp.game.graphics.startScreenEffect("PPOrange", 1e3 * a, !1),
      alcoTimer && clearInterval(alcoTimer),
      (alcoTimer = setInterval(() => {
        alctoTimerCounter--,
          0 >= alctoTimerCounter &&
            ((enableAlcoEffect = !1),
            clearInterval(alcoTimer),
            (alcoTimer = null),
            toggleIco("alco", !1),
            !b && mp.game.graphics.stopScreenEffect("PPOrange"));
      }, 1e3));
  });
  let miniAlcoTimeout = null;
  mp.events.add("client_playerEffect_miniAlco", function (a) {
    miniAlcoTimeout && clearTimeout(miniAlcoTimeout),
      mp.game.graphics.stopScreenEffect("Rampage"),
      mp.game.graphics.stopScreenEffect("pennedIn"),
      mp.game.graphics.stopScreenEffect("BeastLaunch"),
      mp.game.graphics.setNoiseoveride(!1),
      mp.game.cam.stopGameplayCamShaking(!0),
      0 == a
        ? (mp.game.graphics.startScreenEffect("Rampage", 1e3, !1),
          mp.game.graphics.startScreenEffect("pennedIn", 1e3, !1),
          mp.game.cam.shakeGameplayCam("DRUNK_SHAKE", 1))
        : 1 == a &&
          (mp.game.graphics.startScreenEffect("Rampage", 1e3, !1),
          mp.game.graphics.startScreenEffect("pennedIn", 1e3, !1),
          mp.game.graphics.startScreenEffect("BeastLaunch", 1e3, !1),
          mp.game.graphics.setNoisinessoveride(0.25),
          mp.game.graphics.setNoiseoveride(!0),
          mp.game.cam.shakeGameplayCam("DRUNK_SHAKE", 4)),
      (miniAlcoTimeout = setTimeout(() => {
        mp.game.graphics.stopScreenEffect("Rampage"),
          mp.game.graphics.stopScreenEffect("pennedIn"),
          mp.game.graphics.stopScreenEffect("BeastLaunch"),
          mp.game.graphics.setNoiseoveride(!1),
          mp.game.cam.stopGameplayCamShaking(!0),
          (miniAlcoTimeout = null);
      }, 300000));
  });
  let beerAlcoTimeout = null;
  mp.events.add("client_playerEffect_beerAlco", function (a) {
    beerAlcoTimeout && clearTimeout(beerAlcoTimeout),
      mp.game.cam.stopGameplayCamShaking(!0),
      mp.game.cam.shakeGameplayCam("DRUNK_SHAKE", parseFloat(a)),
      (beerAlcoTimeout = setTimeout(() => {
        mp.game.cam.stopGameplayCamShaking(!0), (beerAlcoTimeout = null);
      }, 300000));
  }),
    mp.events.add("client_playerEffect_poison", (a) => {
      if ("fugue" === a) {
        mp.game.cam.shakeGameplayCam("FAMILY5_DRUG_TRIP_SHAKE", 1),
          mp.game.graphics.setTimecycleModifierStrength(1),
          mp.game.graphics.setTimecycleModifier("NG_filmic02");
        let a = 0;
        const b = setInterval(
          async () =>
            1e3 <= ++a || global.isPlayerDeath
              ? (mp.game.cam.stopGameplayCamShaking(!0),
                mp.game.invoke("0x0F07E7745A236711"),
                void clearInterval(b))
              : void (0 == a % 3 && localPlayer.applyDamageTo(1, !0),
                0 == a % 15 &&
                  (mp.game.cam.doScreenFadeOut(400),
                  await mp.game.waitAsync(300),
                  mp.game.cam.doScreenFadeIn(400)),
                0 == a % 20 &&
                  localPlayer.setToRagdoll(500, 1e3, 0, !1, !1, !1)),
          100
        );
      }
    });
  let healthLossInterval = null;
  mp.events.add("client_playerSync_setBlodyWounds", function (a) {
    toggleIco("blood", 0 != a);
  }),
    mp.events.add("c:player:stats", function (a, b, c) {
      toggleIco("mood", 25 > a),
        toggleIco("food", 25 > b),
        1 >= b
          ? (null !== healthLossInterval && clearInterval(healthLossInterval),
            (healthLossInterval = setInterval(() => {
              global.isPlayerDeath ||
                0 !== localPlayer.dimension ||
                (10 < localPlayer.getHealth() &&
                  localPlayer.applyDamageTo(1, !1));
            }, 5e3)))
          : null !== healthLossInterval &&
            (clearInterval(healthLossInterval), (healthLossInterval = null)),
        (drugAddiction = c);
    });
  const compass = { cardinal: {}, intercardinal: {} };
  (global.enableCompass = !1),
    (compass.position = { x: 0.5, y: 0.03, centered: !0 }),
    (compass.width = 0.25),
    (compass.fov = 180),
    (compass.ticksBetweenCardinals = 15),
    (compass.tickColour = { r: 255, g: 255, b: 255, a: 255 }),
    (compass.tickSize = { w: 0.001, h: 0.004 }),
    (compass.cardinal.textSize = 0.25),
    (compass.cardinal.textOffset = 0.015),
    (compass.cardinal.textColour = [255, 255, 255, 185]),
    (compass.cardinal.tickShow = !0),
    (compass.cardinal.tickSize = { w: 0.001, h: 0.016 }),
    (compass.cardinal.tickColour = { r: 255, g: 255, b: 255, a: 255 }),
    (compass.intercardinal.show = !1),
    (compass.intercardinal.textShow = !0),
    (compass.intercardinal.textSize = 0.01),
    (compass.intercardinal.textOffset = 0.015),
    (compass.intercardinal.textColour = [255, 255, 255, 185]),
    (compass.intercardinal.tickShow = !0),
    (compass.intercardinal.tickSize = { w: 0.001, h: 0.008 }),
    (compass.intercardinal.tickColour = { r: 255, g: 255, b: 255, a: 255 });
  function degreesToIntercardinalDirection(a) {
    return (
      (a %= 360),
      (0 <= a && 22.5 > a) || 337.5 <= a
        ? "N "
        : 22.5 <= a && 67.5 > a
        ? "NE "
        : 67.5 <= a && 112.5 > a
        ? "E "
        : 112.5 <= a && 157.5 > a
        ? "SE "
        : 157.5 <= a && 202.5 > a
        ? "S "
        : (202.5 <= a && 247.5 > a) || (-112.5 < a && -65.7 >= a)
        ? "SW "
        : (247.5 <= a && 292.5 >= a) || (-65.7 < a && -22.5 >= a)
        ? "W "
        : (292.5 <= a && 337.5 > a) || (-22.5 < a && 0 >= a)
        ? "NW "
        : void 0
    );
  }
  compass.position.centered && (compass.position.x -= compass.width / 2);
  const compassRenderEvent = () => {
      const a = compass.width / compass.fov,
        b = 360 - ((gameplayCam.getRot(2).z + 360) % 360);
      let c = b - compass.fov / 2;
      const d =
        compass.ticksBetweenCardinals - (c % compass.ticksBetweenCardinals);
      let e = compass.position.x + d * a;
      for (c += d; e < compass.position.x + compass.width; )
        0 == c % 90
          ? (graphics.drawRect(
              e,
              compass.position.y,
              compass.cardinal.tickSize.w,
              compass.cardinal.tickSize.h,
              compass.cardinal.tickColour.r,
              compass.cardinal.tickColour.g,
              compass.cardinal.tickColour.b,
              compass.cardinal.tickColour.a
            ),
            graphics.drawText(
              degreesToIntercardinalDirection(c),
              [e, compass.position.y + compass.cardinal.textOffset],
              {
                font: 2,
                color: compass.cardinal.textColour,
                scale: compass.cardinal.textSize,
                outline: !0,
              }
            ))
          : 0 == c % 45
          ? (graphics.drawRect(
              e,
              compass.position.y,
              compass.intercardinal.tickSize.w,
              compass.intercardinal.tickSize.h,
              compass.intercardinal.tickColour.r,
              compass.intercardinal.tickColour.g,
              compass.intercardinal.tickColour.b,
              compass.intercardinal.tickColour.a
            ),
            graphics.drawText(
              degreesToIntercardinalDirection(c),
              [e, compass.position.y + compass.intercardinal.textOffset],
              {
                font: 2,
                color: compass.intercardinal.textColour,
                scale: [0.3, 0.3],
                outline: !0,
              }
            ))
          : (graphics.drawRect(
              e,
              compass.position.y,
              compass.tickSize.w,
              compass.tickSize.h,
              compass.tickColour.r,
              compass.tickColour.g,
              compass.tickColour.b,
              compass.tickColour.a
            ),
            graphics.drawText(
              `${0 < c ? c % 360 : c + 360}`,
              [e, compass.position.y + compass.intercardinal.textOffset],
              {
                font: 4,
                color: compass.intercardinal.textColour,
                scale: [0.25, 0.25],
                outline: !1,
              }
            )),
          (c += compass.ticksBetweenCardinals),
          (e += a * compass.ticksBetweenCardinals);
      mp.game.graphics.drawRect(
        compass.position.x + compass.width / 2,
        compass.position.y - 0.01,
        0.0015,
        0.01,
        255,
        0,
        0,
        255
      );
    },
    compassBinder = global.binder.register({
      action: "COMPASS_TOGGLE",
      desc: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C\\\u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u043C\u043F\u0430\u0441",
      defaultKey: -1,
      func: () => {
        mp.events.remove("render", compassRenderEvent),
          (global.enableCompass = !global.enableCompass),
          global.enableCompass && mp.events.add("render", compassRenderEvent);
      },
    });
  mp.events.add("__client_compass_toggle", () => {
    compassBinder.trigger();
  }),
    (global.compass = compass),
    global.binder.register({
      action: "TOGGLE_WHISTLE",
      desc: "\u0421\u0432\u0438\u0441\u0442\u0435\u0442\u044C",
      defaultKey: -1,
      func: async () => {
        if (
          !(
            mp.gui.cursor.visible ||
            global.isChatOpen ||
            global.disableKeys ||
            global.isPlayerDeath ||
            global.isPlayerInCapture ||
            global.isPlayerInBizwar ||
            global.isPlayerInArena ||
            null !== localPlayer.vehicle ||
            localPlayer.getVariable("cuffed") ||
            localPlayer.isRagdoll() ||
            localPlayer.isFalling() ||
            localPlayer.isShooting() ||
            localPlayer.isAttached() ||
            !global.actionAntiFlood("whistleSystem_start", 3500)
          )
        ) {
          if (
            (mp.events.callRemote("server_player_whistle"),
            !mp.game.streaming.hasAnimDictLoaded("rcmnigel1c"))
          ) {
            mp.game.streaming.requestAnimDict("rcmnigel1c");
            do await mp.game.waitAsync(10);
            while (!mp.game.streaming.hasAnimDictLoaded("rcmnigel1c"));
          }
          localPlayer.taskPlayAnim(
            "rcmnigel1c",
            "hailing_whistle_waive_a",
            2.7,
            2.7,
            -1,
            49,
            0,
            !1,
            !1,
            !1
          ),
            mp.game.streaming.removeAnimDict("rcmnigel1c"),
            await mp.game.waitAsync(
              1e3 *
                mp.game.entity.getEntityAnimDuration(
                  "rcmnigel1c",
                  "hailing_whistle_waive_a"
                )
            ),
            mp.game.invoke("0x176CECF6F920D707", localPlayer.handle);
        }
      },
    }),
    mp.events.add("client_player_whistle", async (a) => {
      if (mp.players.exists(a) && 0 !== a.handle) {
        if (!mp.game.streaming.hasAnimDictLoaded("rcmnigel1c")) {
          mp.game.streaming.requestAnimDict("rcmnigel1c");
          do await mp.game.waitAsync(10);
          while (!mp.game.streaming.hasAnimDictLoaded("rcmnigel1c"));
        }
        if (!mp.players.exists(a) || 0 === a.handle)
          return mp.game.streaming.removeAnimDict("rcmnigel1c");
        a.taskPlayAnim(
          "rcmnigel1c",
          "hailing_whistle_waive_a",
          2.7,
          2.7,
          -1,
          49,
          0,
          !1,
          !1,
          !1
        ),
          mp.game.streaming.removeAnimDict("rcmnigel1c"),
          await mp.game.waitAsync(
            1e3 *
              mp.game.entity.getEntityAnimDuration(
                "rcmnigel1c",
                "hailing_whistle_waive_a"
              )
          ),
          mp.players.exists(a) &&
            0 !== a.handle &&
            mp.game.invoke("0x176CECF6F920D707", a.handle);
      }
    });
  function toggleIco(a, b) {
    global.rpc.triggerBrowser(
      global.mainBrowser,
      "__infoPanel_toggleStatusIco",
      [a, b]
    );
  }
  function getRandom(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
  }
}
