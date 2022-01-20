{
  const localPlayer = mp.players.local;
  mp.gui.chat.show(!1),
    (global.mainBrowser = mp.browsers.new(
      "package://Player/ChatAndUI/index.html"
    )),
    global.mainBrowser.markAsChat(),
    global.rpc.register(
      "client_chat_canBeOpen",
      () => !mp.gui.cursor.visible && !global.disableKeys
    ),
    mp.events.add("clientFunc_chat_clear", () => {
      global.mainBrowser.execute(`chatAPI.clear();`);
    }),
    mp.events.add("clientFunc_killLog", (a, b, c, d, e) => {
      global.mainBrowser.execute(
        `UI_killLogSend('${a}', '${b}', '${c}', '${d}', '${e}');`
      );
    }),
    mp.events.add("clientFunc_rouletteNotify", (a, b, c, d) => {
      global.mainBrowser.execute(`
		mainHud.rouletteNotify('${escape(a)}', '${escape(b)}', '${escape(
        c
      )}', '${escape(d)}');
	`);
    }),
    (global.chatSetCustomEvent = (a) => {
      global.mainBrowser.call("chat:setCustomEvent", a);
    }),
    global.rpc.on("__client_event_globalStorage_load", (a) => {
      global.mainBrowser.execute(`
		UI_setChatSettings(${a.chat.height}, ${a.chat.lineHeight}, ${
        a.chat.fontSize
      }, ${a.chat.shadow}, ${a.chat.timestamp});

		mainHud.uiEnableQuestBox = ${!!a.settings.enableQuestBox};
		mainHud.uiEnableTimerBox = ${!!a.settings.enableTimerBox};
		mainHud.uiEnableLocalName = ${!!a.settings.enableLocalName};
	`);
    });
  const getMinimapAnchor = () => {
    var a = Math.abs;
    const b = mp.game.graphics.getSafeZoneSize(),
      c = mp.game.graphics.getScreenAspectRatio(!1),
      d = mp.game.graphics.getScreenActiveResolution(0, 0),
      e = 1 / d.x,
      f = 1 / d.y,
      g = {
        width: e * (d.x / (4 * c)),
        height: f * (d.y / 5.674),
        scaleX: e,
        scaleY: f,
        leftX: e * (d.x * ((1 / 20) * (10 * a(b - 1)))),
        bottomY: 1 - f * (d.y * ((1 / 20) * (10 * a(b - 1)))),
      };
    return (g.rightX = g.leftX + g.width), (g.topY = g.bottomY - g.height), g;
  };
  let currentLocation = "";
  setInterval(() => {
    const a = mp.players.local,
      { x: b, y: c, z: d } = a.position,
      e = mp.api.location.getZoneName(b, c, d),
      f = mp.api.location.getStreetName(b, c, d);
    currentLocation != e + f &&
      ((currentLocation = e + f),
      global.mainBrowser.execute(`
			mainHud.playerPositionZoneName = '${e}';
			mainHud.playerPositionStreenName = '${f}';
		`));
    const g = getMinimapAnchor();
    global.mainBrowser.execute(`
		UI_infoPanel_setMinimapData(${g.leftX}, ${g.rightX}, ${1 - g.topY}, ${
      1 - g.bottomY
    });

		mainHud.serverOnline = ${mp.players.length};
		mainHud.serverLocalId = ${mp.players.local.remoteId};
		mainHud.serverLocalName = '${mp.players.local.getVariable("characterName")}';
	`);
  }, 5e3);
  let date = "01.01",
    serverTimeHour = 0,
    serverTimeMin = 0,
    serverTimeSec = 0,
    specialTime = [-1, -1];
  (global.serverGameHour = 0),
    setInterval(() => {
      if ((serverTimeSec++, 60 <= serverTimeSec)) {
        if (
          ((serverTimeSec = 0),
          serverTimeMin++,
          60 <= serverTimeMin &&
            ((serverTimeMin = 0), serverTimeHour++, 24 <= serverTimeHour))
        ) {
          serverTimeHour = 0;
          const a = date.split(".");
          let b = parseInt(a[0]) + 1,
            c = parseInt(a[1]);
          32 <= b && ((b = 1), (c += 1), 13 <= c && (c = 1)),
            (date = `${10 > b ? "0" + b : b}.${10 > c ? "0" + c : c}`);
        }
        global.mainBrowser.execute(`
			mainHud.serverDate = '${date}';
			mainHud.serverHour = ${serverTimeHour};
			mainHud.serverMin = ${serverTimeMin};

			smartphoneAppVue.serverHour = ${serverTimeHour};
			smartphoneAppVue.serverMin = ${serverTimeMin};
		`);
      }
      -1 === specialTime[0] && -1 === specialTime[1]
        ? (mp.game.time.setClockTime(
            serverTimeHour,
            serverTimeMin,
            serverTimeSec
          ),
          (global.serverGameHour = serverTimeHour))
        : (mp.game.time.setClockTime(specialTime[0], specialTime[1], 0),
          (global.serverGameHour = specialTime[0]));
    }, 999),
    mp.events.add("client_ui_setTime", (a, b, c, d) => {
      (date = a),
        (serverTimeHour = parseInt(b)),
        (serverTimeMin = parseInt(c)),
        (serverTimeSec = parseInt(d));
    }),
    mp.events.add("client_world_setSpecialTime", (a, b) => {
      (specialTime[0] = parseInt(a)), (specialTime[1] = parseInt(b));
    }),
    global.rpc.register("client_chat_procedure", (a) => [
      global.playerFriendsReplaceString(a),
      serverTimeHour,
      serverTimeMin,
      serverTimeSec,
    ]),
    (global.getServerDateString = () => date),
    (global.getServerTime = () => [
      serverTimeHour,
      serverTimeMin,
      serverTimeSec,
    ]),
    (global.getServerDay = () => parseInt(date.split(".")[0]));
  let currentPlayerMoney = -1;
  mp.events.add("c:character:money", (a) => {
    -1 !== currentPlayerMoney &&
      (a > currentPlayerMoney
        ? global.mainBrowser.execute(
            `UI_notify_send("money+", "+ " + serverAPI.currencyFormatSpace(${
              a - currentPlayerMoney
            }) + "$");`
          )
        : global.mainBrowser.execute(
            `UI_notify_send("money-", "- " + serverAPI.currencyFormatSpace(${
              currentPlayerMoney - a
            }) + "$");`
          )),
      (currentPlayerMoney = a),
      global.mainBrowser.execute(`mainHud.playerCash = ${a};`);
  });
  const customReticleTypeList = new Set(),
    customReticleTypeMap = new Map();
  class CustomReticleType {
    constructor({
      type: a,
      name: b,
      params: c,
      checkData: d,
      getRenderByData: e,
    }) {
      (this.type = a),
        (this.name = b),
        (this.params = c),
        (this.checkData = d),
        (this.getRenderByData = e),
        customReticleTypeList.add(this),
        customReticleTypeMap.set(this.type, this);
    }
  }
  let reticleRenderAction = null,
    reticleTestRenderAction = null,
    reticleTestTimeout = null,
    reticleEnable = !1;
  const reticleRender = () => {
      if (reticleRenderAction && mp.game.invoke("0x68EDDA28A5976D07")) {
        if (!reticleEnable) {
          const a = mp.game.invoke("0x0A6DB4965674D243", localPlayer.handle);
          if (
            -1569615261 === a ||
            -1786099057 === a ||
            -1951375401 === a ||
            1317494643 === a ||
            419712736 === a ||
            1737195953 === a ||
            -2067956739 === a ||
            -1716189206 === a ||
            1141786504 === a ||
            -102973651 === a ||
            966099553 === a
          )
            return;
          reticleEnable = !0;
        }
        mp.game.ui.hideHudComponentThisFrame(14), reticleRenderAction();
      } else reticleEnable = !1;
    },
    reticleTestRender = () => {
      reticleTestRenderAction && reticleTestRenderAction();
    };
  global.rpc.on("__client_event_globalStorage_load", (a) => {
    const b = customReticleTypeMap.get(a.reticle.type);
    if (!b)
      return void (
        null !== reticleRenderAction &&
        ((reticleRenderAction = null),
        mp.events.remove("render", reticleRender))
      );
    const c = a.reticle.data;
    if (!b.checkData(c)) {
      const a = b.getRenderByData(c);
      if (null !== a && null === reticleRenderAction) {
        for (let a = 0; a < c.length; a++) b.params[a].value = c[a];
        (reticleRenderAction = a), mp.events.add("render", reticleRender);
      } else
        null === a && null !== reticleRenderAction
          ? ((reticleRenderAction = a),
            mp.events.remove("render", reticleRender))
          : null !== a &&
            null !== reticleRenderAction &&
            (reticleRenderAction = a);
    }
  }),
    mp.api.server.register("client_hud_reticle_getList", () =>
      mp.api.server.success(
        Array.from(customReticleTypeList).map((a) => ({
          type: a.type,
          name: a.name,
          params: a.params,
        }))
      )
    ),
    mp.api.server.register("client_hud_reticle_set", (a) => {
      const b = customReticleTypeMap.get(a[0]);
      if (!b) {
        const a = global.getGlobalStorage();
        return (
          (a.reticle.type = ""),
          (a.reticle.data = []),
          global.flushGlobalStorage(a),
          mp.api.server.success()
        );
      }
      const c = b.checkData(a[1]);
      if (c) return mp.api.server.error(c);
      const d = global.getGlobalStorage();
      return (
        (d.reticle.type = a[0]),
        (d.reticle.data = a[1]),
        global.flushGlobalStorage(d),
        mp.api.server.success()
      );
    }),
    mp.events.add("client_hud_reticle_set_test", (a) => {
      const b = JSON.parse(a),
        c = customReticleTypeMap.get(b[0]);
      if (c && !c.checkData(b[1])) {
        const a = c.getRenderByData(b[1]);
        null !== a && null === reticleTestRenderAction
          ? ((reticleTestRenderAction = a),
            mp.events.add("render", reticleTestRender))
          : null === a && null !== reticleTestRenderAction
          ? ((reticleTestRenderAction = a),
            mp.events.remove("render", reticleTestRender))
          : null !== a &&
            null !== reticleTestRenderAction &&
            (reticleTestRenderAction = a),
          null != reticleTestTimeout && clearTimeout(reticleTestTimeout),
          (reticleTestTimeout = setTimeout(() => {
            reticleTestRenderAction &&
              ((reticleTestRenderAction = null),
              mp.events.remove("render", reticleTestRender)),
              (reticleTestTimeout = null);
          }, 1e3));
      }
    }),
    new CustomReticleType({
      type: "point2",
      name: "\u0422\u043E\u0447\u043A\u0430",
      params: [
        {
          name: "\u0420\u0430\u0437\u043C\u0435\u0440",
          type: "progress",
          min: 1,
          max: 100,
          value: 10,
        },
        {
          name: "\u0426\u0432\u0435\u0442",
          type: "color",
          value: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
        },
        {
          name: "\u0426\u0432\u0435\u0442 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u043D\u0430 \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0430",
          type: "color",
          value: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
        },
      ],
      checkData: (a) => {
        const b = reticleParseInt(a[0]);
        return 1 > b || 100 < b
          ? "\u0420\u0430\u0437\u043C\u0435\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043E\u0442 1 \u0434\u043E 100"
          : "";
      },
      getRenderByData: (c) => {
        var d = Math.floor;
        const e = 1.8 * (reticleParseInt(c[0]) / 100) + 0.2,
          { r: f, g: h, b: g } = c[1].rgba,
          b = d(255 * c[1].rgba.a),
          { r: a, g: i, b: j } = c[2].rgba,
          k = d(255 * c[2].rgba.a);
        mp.game.graphics.hasStreamedTextureDictLoaded("timerbars") ||
          mp.game.graphics.requestStreamedTextureDict("timerbars", !0);
        const l = mp.game.graphics.getScreenActiveResolution(0, 0),
          m = mp.game.graphics.getTextureResolution(
            "timerbars",
            "circle_checkpoints"
          ),
          n = (e * m.x) / l.x,
          o = (e * m.y) / l.y;
        return () => {
          reticleIsTargettingAnything()
            ? reticleDrawSprite(
                "timerbars",
                "circle_checkpoints",
                0.5,
                0.5,
                n,
                o,
                0,
                a,
                i,
                j,
                k
              )
            : reticleDrawSprite(
                "timerbars",
                "circle_checkpoints",
                0.5,
                0.5,
                n,
                o,
                0,
                f,
                h,
                g,
                b
              );
        };
      },
    }),
    new CustomReticleType({
      type: "cross2",
      name: "\u041F\u0435\u0440\u0435\u043A\u0440\u0435\u0441\u0442\u0438\u0435",
      params: [
        {
          name: "\u0414\u043B\u0438\u043D\u0430",
          type: "progress",
          min: 1,
          max: 100,
          value: 10,
        },
        {
          name: "\u0428\u0438\u0440\u0438\u043D\u0430",
          type: "progress",
          min: 1,
          max: 100,
          value: 10,
        },
        {
          name: "\u0420\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
          type: "progress",
          min: 1,
          max: 100,
          value: 10,
        },
        {
          name: "\u0426\u0432\u0435\u0442",
          type: "color",
          value: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
        },
        {
          name: "\u0426\u0432\u0435\u0442 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u043D\u0430 \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0430",
          type: "color",
          value: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
        },
      ],
      checkData: () => "",
      getRenderByData: (c) => {
        var d = Math.floor;
        const e = 0.04 * (reticleParseInt(c[0]) / 100) + 0.001,
          f = 0.0175 * (reticleParseInt(c[1]) / 100) + 0.0015,
          h = 0.015 * (reticleParseInt(c[2]) / 100),
          { r: i, g: j, b: g } = c[3].rgba,
          b = d(255 * c[3].rgba.a),
          { r: a, g: k, b: l } = c[4].rgba,
          m = d(255 * c[4].rgba.a),
          n = mp.game.graphics.getScreenActiveResolution(0, 0),
          o = f / (n.x / n.y),
          p = e * (n.x / n.y),
          q = 0.5 - h - e / 2,
          r = 0.5,
          s = 0.5 + h + e / 2,
          t = 0.5,
          u = 0.5,
          v = 0.5 - h * (n.x / n.y) - p / 2,
          w = 0.5,
          x = 0.5 + h * (n.x / n.y) + p / 2;
        return () => {
          reticleIsTargettingAnything()
            ? (reticleDrawRect(q, r, e, f, a, k, l, m),
              reticleDrawRect(s, t, e, f, a, k, l, m),
              reticleDrawRect(u, v, o, p, a, k, l, m),
              reticleDrawRect(w, x, o, p, a, k, l, m))
            : (reticleDrawRect(q, r, e, f, i, j, g, b),
              reticleDrawRect(s, t, e, f, i, j, g, b),
              reticleDrawRect(u, v, o, p, i, j, g, b),
              reticleDrawRect(w, x, o, p, i, j, g, b));
        };
      },
    }),
    mp.game.graphics.requestStreamedTextureDict("helicopterhud", !0),
    new CustomReticleType({
      type: "4tr2",
      name: "\u0422\u0440\u0435\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A\u0438",
      params: [
        {
          name: "\u0420\u0430\u0437\u043C\u0435\u0440",
          type: "progress",
          min: 1,
          max: 100,
          value: 10,
        },
        {
          name: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442",
          type: "progress",
          min: 0,
          max: 90,
          value: 0,
        },
        {
          name: "\u0426\u0432\u0435\u0442",
          type: "color",
          value: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
        },
        {
          name: "\u0426\u0432\u0435\u0442 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u043D\u0430 \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0430",
          type: "color",
          value: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
        },
      ],
      checkData: () => "",
      getRenderByData: (c) => {
        var d = Math.floor;
        const e = 1 * (reticleParseInt(c[0]) / 100) + 0.1,
          f = reticleParseInt(c[1]),
          { r: h, g: i, b: g } = c[2].rgba,
          b = d(255 * c[2].rgba.a),
          { r: a, g: j, b: k } = c[3].rgba,
          l = d(255 * c[3].rgba.a),
          m = mp.game.graphics.getScreenActiveResolution(0, 0),
          n = mp.game.graphics.getTextureResolution(
            "helicopterhud",
            "hud_dest"
          ),
          o = (e * n.x) / m.x,
          p = (e * n.y) / m.y;
        return () => {
          reticleIsTargettingAnything()
            ? reticleDrawSprite(
                "helicopterhud",
                "hud_dest",
                0.5,
                0.5,
                o,
                p,
                f,
                a,
                j,
                k,
                l
              )
            : reticleDrawSprite(
                "helicopterhud",
                "hud_dest",
                0.5,
                0.5,
                o,
                p,
                f,
                h,
                i,
                g,
                b
              );
        };
      },
    });
  const reticleIsTargettingAnything = () => {
      const a = mp.game.player.getEntityIsFreeAimingAt();
      return a && "player" === a.type;
    },
    reticleDrawSprite = mp.game.graphics.drawSprite,
    reticleDrawRect = mp.game.graphics.drawRect,
    reticleParseInt = (a) => {
      const b = parseInt(a);
      return isNaN(b) ? 0 : b;
    };
  mp.events.add("client_bodycam_start", () => {
    const a = (a) => (10 > a ? "0" + a : a),
      b = `${date}.${new Date().getFullYear()} ${a(serverTimeHour)}:${a(
        serverTimeMin
      )}:${a(serverTimeSec)}`;
    global.mainBrowser.execute(`
		mainHud.bodyCamStart(${localPlayer.getVariable(
      "characterId"
    )}, '${localPlayer.getVariable("factionId")}', '${b}');
	`);
  }),
    mp.events.add("client_bodycam_stop", () => {
      global.mainBrowser.execute(`
		mainHud.bodyCamStop();
	`);
    }),
    (global.isConfirmMenuOpen = !1);
  let hasConfirm = !1;
  mp.events.add("client_playerConfirm_show", (a, b) => {
    (hasConfirm = !0),
      (global.isConfirmMenuOpen = !0),
      (a = global.playerFriendsReplaceString(a)),
      (b = global.playerFriendsReplaceString(b)),
      global.mainBrowser.execute(
        `showConfirmMenu('${escape(a)}', '${escape(b)}')`
      );
  }),
    mp.events.add("client_playerConfirm_hide", () => {
      (hasConfirm = !1),
        (global.isConfirmMenuOpen = !1),
        global.mainBrowser.execute(`hideConfirmMenu()`);
    }),
    mp.keys.bind(89, !0, () => {
      mp.gui.cursor.visible ||
        global.isChatOpen ||
        global.disableKeys ||
        !hasConfirm ||
        ((hasConfirm = !1),
        (global.isConfirmMenuOpen = !1),
        global.mainBrowser.execute(`hideConfirmMenu()`),
        mp.events.callRemote("server_playerConfirm_result", !0));
    }),
    mp.keys.bind(78, !0, () => {
      mp.gui.cursor.visible ||
        global.isChatOpen ||
        global.disableKeys ||
        !hasConfirm ||
        ((hasConfirm = !1),
        (global.isConfirmMenuOpen = !1),
        global.mainBrowser.execute(`hideConfirmMenu()`),
        mp.events.callRemote("server_playerConfirm_result", !1));
    }),
    mp.events.add("client_binder_updateData", () => {
      const a = global.binder.getList();
      let b = [];
      for (const c of a)
        b.push([
          c.actionCode,
          c.key,
          c.isShiftEnable,
          c.isCtrlEnable,
          c.isAltEnable,
        ]);
      global.mainBrowser.execute(
        `mainHud.setBinderData('${escape(JSON.stringify(b))}');`
      );
    }),
    mp.events.add("client_auth_selectCharacter_end", () => {
      mp.events.call("client_binder_updateData"),
        mp.gui.chat.push(`!{FFA500}${__("join.welcome_msg_1")}`),
        mp.gui.chat.push(`!{FFA500}${__("join.welcome_msg_2")}`),
        mp.gui.chat.push(`!{FFA500}${__("join.welcome_msg_3")}`),
        mp.gui.chat.push(`!{FFA500}${__("join.welcome_msg_4")}`);
    });
  let questDataMap = new Map();
  mp.events.add("client_quest_load", (a) => {
    global.mainBrowser.execute(`mainHud.questLoadList("${escape(a)}");`);
    for (const b of JSON.parse(a)) {
      const a = questDataMap.get(b[0]);
      a && a.onStart(b[b.length - 1]);
    }
  }),
    mp.events.add("client_quest_new", (a, b, c, d, e, f) => {
      global.mainBrowser.execute(
        `mainHud.questStart("${a}", "${escape(b)}", "${escape(
          c
        )}", ${d}, ${e});`
      );
      const g = questDataMap.get(a);
      g && g.onStart(JSON.parse(f));
    }),
    mp.events.add("client_quest_end", (a) => {
      global.mainBrowser.execute(`mainHud.questEnd("${a}");`);
      const b = questDataMap.get(a);
      b && b.onEnd();
    }),
    mp.events.add("client_quest_progress", (a, b) => {
      global.mainBrowser.execute(`mainHud.questProgress("${a}", ${b});`);
    }),
    mp.events.add("client_quest_desc", (a, b, c, d) => {
      global.mainBrowser.execute(
        `mainHud.questDesc("${a}", "${escape(b)}", ${c}, ${d});`
      );
      const e = questDataMap.get(a);
      e && e.onChangePart && e.onChangePart();
    }),
    (global.registerPlayerQuest = (a) => {
      questDataMap.set(a.code, a);
    }),
    mp.events.add("client_hudTimer_start", (a, b) => {
      global.mainBrowser.execute(`mainHud.timerStart("${a}", ${parseInt(b)});`);
    }),
    mp.events.add("client_hudTimer_stop", (a) => {
      global.mainBrowser.execute(`mainHud.timerEnd("${a}");`);
    });
}
