let isGameLoaded = !1,
  antiCheatDisableCounter = 0;
const langData = require("./lang.js"),
  i18n = require("./i18n.js");
i18n.init(langData.LANGPACK[langData.langCode]);
var __ = i18n.__;
mp.events.add("guiReady", function () {
  function createStorage(a, b) {
    let c = Object.getOwnPropertyNames(b);
    for (let d, e = 0; e < c.length; e++)
      (d = c[e]), null == a[d] ? (a[d] = b[d]) : createStorage(a[d], b[d]);
  }
  var _Mathpow = Math.pow,
    _Mathcos = Math.cos,
    _Mathsin = Math.sin;
  if (isGameLoaded) return;
  (global.serverName = ""),
    mp.game.gxt.set("PM_PAUSE_HDR", "GTA 5 RP"),
    mp.game.gxt.set(
      1382984457,
      "\u0420\u0430\u0434\u0438\u043E PLAY - GTA 5 RP"
    ),
    (global.isPlayerDeath = !1),
    (global.isPlayerInCapture = !1),
    (global.isPlayerInBizwar = !1),
    (global.isPlayerInArena = !1),
    (global.disableAllAction = !1),
    (global.enableCameraOnDisabled = !1),
    mp.events.add("render", function () {
      if (
        (mp.game.player.setLockonRangeOverride(1),
        mp.game.controls.disableControlAction(2, 243, !0),
        mp.game.ui.displayAmmoThisFrame(!1),
        mp.game.ui.displayAreaName(!1),
        mp.game.ui.hideHudComponentThisFrame(6),
        mp.game.ui.hideHudComponentThisFrame(7),
        mp.game.ui.hideHudComponentThisFrame(9),
        mp.game.ui.hideHudComponentThisFrame(13),
        mp.game.player.setHealthRechargeMultiplier(0),
        global.disableAllAction)
      ) {
        if (
          (mp.game.controls.disableAllControlActions(0),
          mp.game.controls.disableAllControlActions(1),
          mp.game.controls.disableAllControlActions(2),
          !global.enableCameraOnDisabled)
        )
          return;
        mp.game.controls.enableControlAction(2, 1, !0),
          mp.game.controls.enableControlAction(2, 2, !0),
          mp.game.controls.enableControlAction(2, 3, !0),
          mp.game.controls.enableControlAction(2, 4, !0),
          mp.game.controls.enableControlAction(2, 5, !0),
          mp.game.controls.enableControlAction(2, 6, !0),
          mp.game.controls.enableControlAction(2, 270, !0),
          mp.game.controls.enableControlAction(2, 271, !0),
          mp.game.controls.enableControlAction(2, 272, !0),
          mp.game.controls.enableControlAction(2, 273, !0);
      } else global.isSmartphoneOpen && (mp.game.controls.disableControlAction(0, 24, !0), mp.game.controls.disableControlAction(1, 24, !0), mp.game.controls.disableControlAction(0, 257, !0));
    }),
    mp.events.add("clientFunc_hideUI", function (a) {
      global.hideUI(a);
    }),
    (global.uiVisible = !0),
    (global.hideUI = function (a) {
      mp.gui.chat.show(!a),
        mp.game.ui.displayRadar(!a),
        global.mainBrowser.execute(`UI_showUI(${!a});`),
        global.hideHelpBox(a),
        (global.uiVisible = !a);
    }),
    (global.hideHelpBox = function (a) {
      return !1 == global.getGlobalStorage().settings.enableHelpBox
        ? void global.mainBrowser.execute(`mainHud.uiHelpPanelEnable = false;`)
        : void global.mainBrowser.execute(
            `mainHud.uiHelpPanelEnable = ${!a + ""};`
          );
    }),
    mp.events.add("clientFunc_setWaypoint", function (a, b) {
      const c = parseFloat(a) + Math.random(),
        d = parseFloat(b) + Math.random();
      isNaN(c) || isNaN(d) || mp.game.invoke("0xFE43368D2AA4F2FC", c, d);
    }),
    mp.events.add("clientFunc_freeze", function (a) {
      mp.players.local.freezePosition(a);
    }),
    (global.gameplayCamera = mp.cameras.new("gameplay"));
  var camera = null;
  (global.setCamera = function (a, b, c, d, e = 0) {
    null != camera && mp.cameras.exists(camera) && camera.destroy(),
      (camera = mp.cameras.new("default", a, b, c)),
      camera.pointAtCoord(d.x, d.y, d.z),
      camera.setActive(!0),
      mp.game.cam.renderScriptCams(!0, 0 < e, e, !0, !1);
  }),
    (global.setCameraRot = function (a, b, c, d = 0) {
      null != camera && mp.cameras.exists(camera) && camera.destroy(),
        (camera = mp.cameras.new("default", a, b, c)),
        camera.setActive(!0),
        mp.game.cam.renderScriptCams(!0, 0 < d, d, !0, !1);
    }),
    (global.setCameraToPlayer = function (a, b, c, d, e = 0, f = 80) {
      null != camera && mp.cameras.exists(camera) && camera.destroy();
      var g = (function (a, b, c) {
        return (
          (b *= 0.0174533),
          (a.y += c * _Mathsin(b)),
          (a.x += c * _Mathcos(b)),
          a
        );
      })(
        new mp.Vector3(
          mp.players.local.position.x + b.x,
          mp.players.local.position.y + b.y,
          mp.players.local.position.z + b.z
        ),
        mp.players.local.getRotation(2).z + 90 + d,
        a
      );
      (camera = mp.cameras.new("default", g, new mp.Vector3(0, 0, 0), f)),
        camera.pointAtCoord(
          mp.players.local.position.x + c.x,
          mp.players.local.position.y + c.y,
          mp.players.local.position.z + c.z
        ),
        camera.setActive(!0),
        mp.game.cam.renderScriptCams(!0, 0 < e, e, !0, !1);
    }),
    (global.setCameraToPos = function (a, b, c, d, e, f, g = 0, h = 80) {
      null != camera && mp.cameras.exists(camera) && camera.destroy();
      var i = (function (a, b, c) {
        return (
          (b *= 0.0174533),
          (a.y += c * _Mathsin(b)),
          (a.x += c * _Mathcos(b)),
          a
        );
      })(new mp.Vector3(a.x + d.x, a.y + d.y, a.z + d.z), b.z + 90 + f, c);
      (camera = mp.cameras.new("default", i, new mp.Vector3(0, 0, 0), h)),
        camera.pointAtCoord(a.x + e.x, a.y + e.y, a.z + e.z),
        camera.setActive(!0),
        mp.game.cam.renderScriptCams(!0, 0 < g, g, !0, !1);
    }),
    (global.resetCamera = function (a = 0) {
      null != camera && mp.cameras.exists(camera) && camera.destroy(),
        mp.game.cam.renderScriptCams(!1, 0 < a, a, !0, !1);
    });
  let lastNotifyKeyKey = "",
    lastNotifyKeyText = "";
  (global.notifyKeyHelpShow = function (a, b) {
    (lastNotifyKeyKey = a),
      (lastNotifyKeyText = b),
      global.rpc.triggerBrowser(
        global.mainBrowser,
        "client_browser_notifyHelp_show",
        { key: a, text: b }
      );
  }),
    (global.notifyKeyHelpHide = function (a = "", b = "") {
      ("" !== a &&
        "" !== b &&
        (a !== lastNotifyKeyKey || b !== lastNotifyKeyText)) ||
        global.rpc.triggerBrowser(
          global.mainBrowser,
          "client_browser_notifyHelp_hide"
        );
    }),
    (global.sendMessageToChat = function (a) {
      mp.gui.chat.push(a);
    });
  let discordStatusTimeout = null;
  (global.discordUpdate = (a, b) => {
    const c = `на gta5rp.com ${global.serverName}`;
    return a
      ? (null !== discordStatusTimeout &&
          (clearTimeout(discordStatusTimeout), (discordStatusTimeout = null)),
        mp.discord.update(a, c),
        void (
          b &&
          (discordStatusTimeout = setTimeout(() => {
            (discordStatusTimeout = null), global.discordUpdate();
          }, 1e3 * b))
        ))
      : void (
          null !== discordStatusTimeout ||
          mp.discord.update(
            "\u041F\u0440\u043E\u0432\u043E\u0434\u0438\u0442 \u0432\u0440\u0435\u043C\u044F",
            c
          )
        );
  }),
    mp.events.add("discordUpdate", (a, b) => {
      global.discordUpdate(a, b);
    });
  var antiFloodCahce = {};
  global.actionAntiFlood = function (a, b) {
    const c = new Date().getTime();
    return null == antiFloodCahce[a]
      ? ((antiFloodCahce[a] = c), !0)
      : !(antiFloodCahce[a] + b > c) && ((antiFloodCahce[a] = c), !0);
  };
  const tempEventMap = new Map();
  (global.createTempEvent = (a, b) => {
    const c = tempEventMap.get(a);
    c && mp.events.remove(a, c), mp.events.add(a, b), tempEventMap.set(a, b);
  }),
    (global.getEntityVariable = (a, b, c) =>
      a.hasVariable(b) ? a.getVariable(b) : c),
    (global.log = (a) => global.rpc.triggerServer("server_debug_log", a)),
    (global.isAuth = !1),
    (global.isChatOpen = !1);
  let cursorShowCounter = 0;
  global.rpc.on("client_cursor_status", function (a) {
    global.showCursor(a);
  }),
    (global.showCursor = function (a, b = !0) {
      a
        ? (mp.gui.cursor.show(b, !0), cursorShowCounter++)
        : ((cursorShowCounter = Math.max(cursorShowCounter - 1, 0)),
          0 == cursorShowCounter && mp.gui.cursor.show(!1, !1));
    });
  let disableChatAndKeysCounter = 0;
  (global.disableKeys = !1),
    (global.disableChatAndKeys = function (a) {
      a
        ? (disableChatAndKeysCounter++,
          mp.gui.chat.activate(!1),
          (global.disableKeys = !0),
          (global.disableAllAction = !0))
        : (disableChatAndKeysCounter--,
          0 >= disableChatAndKeysCounter &&
            ((disableChatAndKeysCounter = 0),
            mp.gui.chat.activate(!0),
            (global.disableKeys = !1),
            mp.players.local.freezePosition(!1),
            (global.disableAllAction = !1)));
    }),
    global.rpc.on("clientFunc_notifySuccess", (a) => {
      mp.events.call("clientFunc_notify", "success", a);
    }),
    global.rpc.on("clientFunc_notifyInfo", (a) => {
      mp.events.call("clientFunc_notify", "info", a);
    }),
    global.rpc.on("clientFunc_notifyError", (a) => {
      mp.events.call("clientFunc_notify", "error", a);
    }),
    mp.events.add("clientFunc_notify", (a, b) => {
      global.mainBrowser.execute(
        `UI_notify_send("${a}", "${escape(
          global.playerFriendsReplaceString(b)
        )}");`
      );
    }),
    (global.character = "");
  let defaulGlobalStorage = {
      auth: { login: "" },
      settings: {
        enableHelpBox: !0,
        enableQuestBox: !0,
        enableNametags: !0,
        enableTimerBox: !0,
        enableLocalName: !1,
        enableCenterInventory: !1,
        disableScreenEffect: !1,
        disableDocumentPhoto: !1,
        enableSpeedometer: !1,
        speedometerColor: [255, 153, 0, 1],
        speedometerBackgroundColor: [46, 65, 113, 1],
        maxVolume3dSound: 100,
      },
      chat: {
        height: 240,
        lineHeight: 24,
        fontSize: 16,
        shadow: !0,
        timestamp: !1,
      },
      reticle: { type: "", data: [] },
    },
    defaultCharacterStorage = {
      smartphone: {
        settings: { enableCursor: !1, enableHelpBox: !0, enableNametags: !0 },
        contacts: [],
        sms: [],
        music: [],
      },
    };
  let storage = mp.storage.data;
  storage.data &&
    ((storage.character = storage.data.character),
    (storage.global = storage.data.global),
    delete storage.data),
    (global.isFirstOpen = !1),
    storage.character == null &&
      ((storage.character = {}), (global.isFirstOpen = !0)),
    storage.global == null &&
      ((storage.global = {}), (global.isFirstOpen = !0)),
    createStorage(storage.global, defaulGlobalStorage),
    (mp.storage.data = storage),
    mp.storage.flush(),
    global.rpc.register("client_storage_select", function (a) {
      (global.character = a),
        mp.storage.data.character[global.character] == null &&
          ((global.isFirstOpen = !0),
          (mp.storage.data.character[global.character] = {})),
        createStorage(
          mp.storage.data.character[global.character],
          defaultCharacterStorage
        );
      const b = global.getGlobalStorage();
      global.rpc.trigger("__client_event_globalStorage_load", b),
        global.rpc.trigger(
          "__client_event_storage_load",
          mp.storage.data.character[global.character]
        ),
        global.hideHelpBox(!b.settings.enableHelpBox);
    }),
    global.rpc.register("client_storage_get", function () {
      return global.getStorage();
    }),
    global.rpc.register("client_storage_flush", function (a) {
      (mp.storage.data.character[global.character] = a), mp.storage.flush();
    }),
    global.rpc.register("client_global_storage_get", function () {
      return mp.storage.data.global;
    }),
    global.rpc.register("client_global_storage_flush", function (a) {
      global.flushGlobalStorage(a);
    }),
    (global.getStorage = function () {
      return null == mp.storage.data.character ||
        null == mp.storage.data.character[global.character]
        ? defaultCharacterStorage
        : mp.storage.data.character[global.character];
    }),
    (global.getGlobalStorage = function () {
      return mp.storage.data.global;
    }),
    (global.flushGlobalStorage = function (a) {
      (mp.storage.data.global = a),
        mp.storage.flush(),
        global.rpc.trigger("__client_event_globalStorage_load", a);
    });
  const factionEventData = new Map();
  (global.registerFactionEvent = ({ factionId: a, onEnter: b, onLeave: c }) => {
    let d = factionEventData.get(a);
    d || (d = { active: !1, eventList: [] }),
      d.eventList.push({ onEnter: b, onLeave: c }),
      factionEventData.set(a, d);
  }),
    mp.events.addDataHandler("factionId", (a, b) => {
      if (a === mp.players.local) {
        for (const a of factionEventData.values())
          a.active &&
            (a.eventList.forEach((a) => a.onLeave && a.onLeave()),
            (a.active = !1));
        const a = factionEventData.get(b);
        a &&
          (a.eventList.forEach((a) => a.onEnter && a.onEnter()),
          (a.active = !0));
      }
    }),
    (global.mainBrowser = null),
    (global.smartphoneBrowser = null),
    require("./Util/actionColshape.js"),
    require("./Util/3dsound.js"),
    require("./Util/format.js"),
    require("./Util/binder.js"),
    require("./Util/customInterior.js"),
    require("./Util/scaleform.js"),
    require("./Player/attachmentObject.js"),
    require("./Objects/ActionPickup/actionPickup.js"),
    require("./Objects/GangZone/gangzone.js"),
    require("./Objects/ClientBlip/clientBlip.js"),
    require("./Objects/ServerWorldObject/serverWorldObject.js"),
    require("./Objects/Doors/doords.js"),
    require("./Objects/Checkpoint/checkpoint.js"),
    require("./Objects/ActionObject/actionObject.js"),
    require("./Objects/Apartments/apartments.js"),
    require("./Objects/UsedObject/usedObject.js"),
    require("./Objects/Market/market.js"),
    require("./Objects/Gym/gym.js"),
    require("./Player/fingerpointing.js"),
    require("./Player/crouch.js"),
    require("./Player/crawl.js"),
    require("./Player/ChatAndUI/chatAndUI.js"),
    require("./Player/friends.js"),
    require("./Player/nametags.js"),
    require("./Player/playerBlip.js"),
    require("./Player/sync.js"),
    require("./Player/itemInHand.js"),
    require("./Player/targetMenu.js"),
    require("./Player/listMenu.js"),
    require("./Player/voiceChat.js"),
    require("./Player/weapons.js"),
    require("./Player/fly.js"),
    require("./Player/antiAFK.js"),
    require("./Player/playerSync.js"),
    require("./Player/vehicle.js"),
    require("./Player/main.js"),
    require("./Player/mapEditor.js"),
    require("./Smartphone2/clientSmartphone.js"),
    require("./RPBrowser/clientBrowser.js"),
    require("./PlayerDialog/index.js"),
    require("./Character/character.js"),
    require("./Menu/menu.js"),
    require("./Jobs/skinDiver.js"),
    require("./Jobs/fireman.js"),
    require("./Jobs/farm.js"),
    require("./Jobs/hunting.js"),
    require("./Fishing/fishing.js"),
    require("./Events/BizWar/bizwar.js"),
    require("./Events/HummerWar/hummerWar.js"),
    require("./Events/Prison/prison.js"),
    require("./AdminConsole/clientConsole.js"),
    require("./Player/newYear.js"),
    require("./Auth/clientAuth.js"),
    mp.players.local.freezePosition(!1);
  const familyQuestData = new Map();
  (global.registerFamilyQuest = ({
    code: a,
    onStart: b,
    onEnd: c,
    localObjects: d,
  }) => {
    familyQuestData.set(a, {
      isStart: !1,
      data: null,
      onStart: b,
      onEnd: c,
      localObjects: d == null ? [] : d,
      objects: [],
    });
  }),
    mp.events.add("client_playerData_setFamilyId", (a, b, c) => {
      if (-1 === a) {
        for (const a of familyQuestData.values())
          a.isStart &&
            (a.objects.forEach((a) => a.destroy()),
            (a.objects = []),
            (a.isStart = !1),
            a.onEnd());
        return;
      }
      c = JSON.parse(c);
      for (const d of c) {
        const a = familyQuestData.get(d[0]);
        a &&
          !a.isStart &&
          (a.objects.forEach((a) => a.destroy()),
          (a.objects = a.localObjects.map((a) =>
            mp.objects.new(
              mp.game.joaat(a[0]),
              new mp.Vector3(a[1], a[2], a[3]),
              { rotation: new mp.Vector3(a[4], a[5], a[6]) }
            )
          )),
          (a.isStart = !0),
          (a.data = d[1]),
          a.onStart(d[1]));
      }
    }),
    mp.events.add("client_pf_startQuest", (a, b) => {
      const c = familyQuestData.get(a);
      c &&
        !c.isStart &&
        (c.objects.forEach((a) => a.destroy()),
        (c.objects = c.localObjects.map((a) =>
          mp.objects.new(
            mp.game.joaat(a[0]),
            new mp.Vector3(a[1], a[2], a[3]),
            { rotation: new mp.Vector3(a[4], a[5], a[6]) }
          )
        )),
        (c.isStart = !0),
        (c.data = JSON.parse(b)),
        c.onStart(c.data));
    }),
    mp.events.add("client_pf_endQuest", (a) => {
      const b = familyQuestData.get(a);
      b &&
        b.isStart &&
        (b.objects.forEach((a) => a.destroy()),
        (b.objects = []),
        (b.isStart = !1),
        b.onEnd());
    }),
    require("./Jobs/govContracts.js"),
    require("./Jobs/crimeContracts.js"),
    require("./Jobs/neutralContract.js");
  let disableAllInterval = null,
    cursorTimeout = null;
  global.binder.register({
    action: "MAIN_CURSOR",
    desc: "\u041A\u0443\u0440\u0441\u043E\u0440",
    defaultKey: 113,
    func: () => {
      null !== cursorTimeout && clearTimeout(cursorTimeout),
        (cursorTimeout = setTimeout(() => {
          cursorTimeout = null;
          null !== disableAllInterval ||
            (mp.gui.cursor.visible
              ? ((cursorShowCounter = 0), mp.gui.cursor.show(!1, !1))
              : ((cursorShowCounter = 1), mp.gui.cursor.show(!0, !0)));
        }, 350));
    },
  }),
    mp.keys.bind(112, !0, function () {
      null === disableAllInterval
        ? (disableAllInterval = setInterval(() => {
            mp.game.controls.disableAllControlActions(0),
              mp.game.controls.disableAllControlActions(1),
              mp.game.controls.disableAllControlActions(2);
          }, 0))
        : (clearInterval(disableAllInterval), (disableAllInterval = null));
    }),
    global.binder.register({
      action: "HELPMENU_OPEN",
      desc: "\u041F\u043E\u043C\u043E\u0449\u044C",
      defaultKey: 121,
      func: () => {
        global.isAuth && rpc.triggerServer("server_player_mainMenuOpen", 3);
      },
    }),
    mp.keys.bind(220, !0, function () {
      mp.gui.cursor.visible ||
        global.isChatOpen ||
        global.disableKeys ||
        mp.events.callRemote("server_event_key_|");
    }),
    mp.events.add("__call_remote_event", function (a, ...b) {
      -1 ===
        [
          "server_character_save",
          "server_inventory_useItem",
          "server_inventory_changeDrawable",
          "server_vehicle_ejectPlayer",
          "server_playerAuth_getCharacterData",
          "server_playerAuth_selectCharacter",
          "server_casino_spinSlot",
          "server_casino_exitSlot",
          "server_casino_rollDice",
          "server_casino_exitDice",
          "server_casino_exitRoulette",
          "server_casino_seatPoker",
          "server_casino_betPoker",
          "server_casino_addChipPoker",
          "server_casino_fallPoker",
          "server_casino_exitPoker",
          "server_fishing_endGame",
          "server_fishingHalloween_endGame",
          "server_crimeContract_endRobECircuit",
          "server_govContract_endMakeClothes",
          "server_danceBattleEnd",
          "server_playerFamily_house_sellHouse",
          "server_playerFamily_house_toggleDoor",
          "server_playerFamily_office_sendRequest",
          "server_playerFamily_office_sellOffice",
          "server_playerFamily_selectPrefix",
          "server_playerFamily_selectNewName",
          "server_playerFamily_buyLimit",
          "server_playerFamily_deleteFamily",
          "server_captcha_result",
          "server_chat_scream",
          "server_chat_whisper",
          "server_chat_nonrp",
          "server_chat_rp_me",
          "server_chat_rp_do",
          "server_chat_rp_try",
          "server_chat_rp_todo",
          "server_chat_roll",
          "server_mp_exit",
          "server_faction_radio",
          "server_faction_radio_nrp",
          "server_faction_dep",
          "server_playerFamily_chat",
          "server_playerFamily_chatb",
          "server_faction_megafon",
          "server_smartphone_acceptCall",
          "server_smartphone_endCall",
          "server_radioRD_deleteVeh",
          "server_smartphone_taskClose",
          "server_smartphone_silentMode",
          "server_boombox_start",
          "server_boombox_stop",
          "server_apartmentsEntrance_enter",
          "server_mazeBankArena_open",
          "server_house_toggleDoor",
        ].indexOf(a) || mp.events.callRemote(a, ...b);
    }),
    global.rpc.on("client_setGlobalValue", function (a) {
      global[a[0]] = a[1];
    }),
    global.rpc.register("client_getGlobalValue", function (a) {
      return global[a];
    }),
    mp.game.gameplay.disableAutomaticRespawn(!0),
    mp.game.gameplay.ignoreNextRestart(!0),
    mp.game.gameplay.setFadeInAfterDeathArrest(!1),
    mp.game.gameplay.setFadeOutAfterDeath(!1),
    mp.game.gameplay.setFadeInAfterLoad(!1),
    mp.game.invoke("0xE6C0C80B8C867537", !0),
    mp.game.invoke("0x3BC861DF703E5097"),
    mp.game.audio.setStaticEmitterEnabled(
      "LOS_SANTOS_VANILLA_UNICORN_01_STAGE",
      !1
    ),
    mp.game.audio.setStaticEmitterEnabled(
      "LOS_SANTOS_VANILLA_UNICORN_02_MAIN_ROOM",
      !1
    ),
    mp.game.audio.setStaticEmitterEnabled(
      "LOS_SANTOS_VANILLA_UNICORN_03_BACK_ROOM",
      !1
    ),
    mp.game.audio.stopAlarm("PORT_OF_LS_HEIST_FORT_ZANCUDO_ALARMS", !0),
    mp.game.audio.stopAlarm("PRISON_ALARMS", !0),
    mp.events.add("serverWorldDataReady", () => {
      mp.api.data.onChange("clothesTestData", (data) => {
        eval(mp.api.server.strDecompress(data));
      });
      const data = mp.api.data.get("clothesTestData");
      data && eval(mp.api.server.strDecompress(data));
    }),
    (() => {
      let a = new mp.Vector3(0, 0, 0),
        b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = [],
        g = 0;
      setInterval(() => {
        var i = Math.abs;
        if (0 < global.adminLevel || !global.isAuth) return;
        const j = new Date().getTime(),
          k = mp.players.local,
          l = k.position,
          m = k.dimension,
          n = k.vehicle;
        if (m != b) return (c = j), (a = l), void (b = m);
        const o = Math.sqrt(_Mathpow(l.x - a.x, 2) + _Mathpow(l.y - a.y, 2));
        if (
          0 === m &&
          650 <= o &&
          1e4 < j - c &&
          2500 < j - d &&
          global.actionAntiFlood("s_ac_teleport", 25e3)
        )
          return void h(
            "s_ac_teleport",
            `${mp.api.location.getZoneName(
              a.x,
              a.y,
              a.z
            )} - ${mp.api.location.getZoneName(l.x, l.y, l.z)} - ${Math.round(
              o
            )}m`
          );
        if (
          0 === m &&
          (25 < o || 1 > i(a.z - l.z)) &&
          void 0 ===
            mp.raycasting.testPointToPoint(
              l,
              new mp.Vector3(l.x, l.y, l.z - 10),
              k.handle,
              17
            ) &&
          10 <
            i(
              l.z -
                mp.game.gameplay.getGroundZFor3dCoord(l.x, l.y, l.z + 3, 0, !1)
            ) &&
          void 0 ===
            mp.raycasting.testPointToPoint(
              new mp.Vector3(l.x + 1, l.y, l.z),
              new mp.Vector3(l.x + 1, l.y, l.z - 10),
              k.handle,
              17
            ) &&
          void 0 ===
            mp.raycasting.testPointToPoint(
              new mp.Vector3(l.x - 1, l.y, l.z),
              new mp.Vector3(l.x - 1, l.y, l.z - 10),
              k.handle,
              17
            ) &&
          void 0 ===
            mp.raycasting.testPointToPoint(
              new mp.Vector3(l.x, l.y + 1, l.z),
              new mp.Vector3(l.x, l.y + 1, l.z - 10),
              k.handle,
              17
            ) &&
          void 0 ===
            mp.raycasting.testPointToPoint(
              new mp.Vector3(l.x, l.y - 1, l.z),
              new mp.Vector3(l.x, l.y - 1, l.z - 10),
              k.handle,
              17
            )
        ) {
          if (
            !k.isSwimming() &&
            !k.isSwimmingUnderWater() &&
            !k.isClimbing() &&
            !(() =>
              null != n &&
              -1 !== [14, 15, 16, 17, 18, 19, 20].indexOf(n.getClass()))() &&
            !(() => {
              let a = !1;
              return (
                mp.vehicles.forEachInStreamRange((b) => {
                  a ||
                    (14 === b.getClass() &&
                      15 >
                        mp.dist(
                          l.x,
                          l.y,
                          l.z,
                          b.position.x,
                          b.position.y,
                          b.position.z
                        ) &&
                      (a = !0));
                }),
                a
              );
            })()
          ) {
            const a = k.getParachuteState();
            0 !== a && 1 !== a && 2 !== a && (e += 1);
          }
          if (15 < e && global.actionAntiFlood("s_ac_noclip", 1e4))
            return h("s_ac_noclip");
        } else e = 0;
        if (0 === m) {
          const a = k.getModel();
          if (
            a !== mp.game.joaat("mp_m_freemode_01") &&
            a !== mp.game.joaat("mp_f_freemode_01") &&
            global.actionAntiFlood("s_ac_modelchange", 6e5)
          )
            return h("s_ac_modelchange");
          if (n) f = [];
          else {
            const a = mp.vehicles.streamed.filter((a) => a.controller === k);
            f = f.filter(
              (a) =>
                mp.vehicles.exists(a) && 0 !== a.handle && a.controller === k
            );
            for (const b of a)
              if (-1 === f.indexOf(b))
                (b.__acLastCoords = b.getCoords(!0)),
                  (b.__acLastSpeed = b.getSpeed()),
                  (b.__acLastDist = 0),
                  f.push(b);
              else {
                const a = b.getCoords(!0),
                  c = b.getSpeed(),
                  d = mp.dist(
                    a.x,
                    a.y,
                    a.z,
                    b.__acLastCoords.x,
                    b.__acLastCoords.y,
                    b.__acLastCoords.z
                  ),
                  e = i(c - b.__acLastSpeed);
                110 < e
                  ? global.actionAntiFlood("s_ac_veh_gravity", 6e5) &&
                    mp.events.callRemote("s_ac_veh_gravity", b)
                  : 1 > c && 1 < d
                  ? 10 < ++g &&
                    global.actionAntiFlood("s_ac_veh_gravity", 6e5) &&
                    mp.events.callRemote("s_ac_veh_gravity", b)
                  : (g = 0),
                  (b.__acLastCoords = a),
                  (b.__acLastSpeed = c),
                  (b.__acLastDist = d);
              }
          }
        }
        (a = l), (b = m);
      }, 250),
        mp.events.add("playerSpawn", (a) => {
          a == mp.players.local && (d = new Date().getTime());
        });
      const h = (a, ...b) => {
        0 === antiCheatDisableCounter &&
          mp.events.callRemoteUnreliable(a, ...b);
      };
    })(),
    (isGameLoaded = !0);
}),
  mp.game1 && (mp.game.graphics.drawMarker = mp.game1.graphics.drawMarker),
  (mp.game.streaming.requestClipSet = (a) =>
    mp.game.invoke("0x3ACA4F727AC4606E", a));
const isRage11 = !0,
  rpc = require("./rage-rpc.min.js");
require("./Util/lz-string.js"), (global.rpc = rpc), (mp.api = {});
const registerApiFunc = (a, b) => {
  const c = a.split(".");
  let d = mp.api;
  for (let e = 0; e < c.length; e++)
    null == d[c[e]]
      ? e === c.length - 1
        ? ((d[c[e]] = b), rpc.register("api." + a, (a) => b(...a)))
        : ((d[c[e]] = {}), (d = d[c[e]]))
      : (d = d[c[e]]);
};
registerApiFunc("server.getAsync", async (a, b) => {
  try {
    const c = await global.rpc.callServer(a, b);
    if (c.error) throw c.errorText;
    else return c.data;
  } catch (a) {
    throw `${a}`;
  }
}),
  registerApiFunc("server.register", async (a, b) => {
    global.rpc.register(a, b);
  }),
  registerApiFunc("server.success", (a) => ({ error: !1, data: a })),
  registerApiFunc("server.error", (a) => ({ error: !0, errorText: "" + a })),
  registerApiFunc("server.getDollarsFromRubles", (a) => 100 * a),
  registerApiFunc("server.strDecompress", (a) =>
    global.lzString.decompressFromBase64(a)
  ),
  registerApiFunc("server.tick", () => mp.game1.time.serverTickCount),
  (mp.serverDataKeys = { isAdmin: "" });
let objectForSyncData = null;
registerApiFunc("data.get", (a) =>
  !objectForSyncData &&
  ((objectForSyncData = mp.objects.atRemoteId(0)), !objectForSyncData)
    ? null
    : objectForSyncData.getVariable(a)
),
  registerApiFunc("data.onChange", (a, b) => {
    mp.events.addDataHandler(a, (a, c, d) => {
      b(c, d);
    });
  }),
  mp.events.add("guiReady", () => {
    const a = setInterval(() => {
      if (mp.objects.atRemoteId(0)) {
        for (const b in (clearInterval(a), mp.serverDataKeys))
          mp.serverDataKeys[b] = mp.api.data.get("" + mp.game.joaat(b));
        mp.events.call("serverWorldDataReady");
      }
    }, 5);
  }),
  registerApiFunc("client.isNewMpVersion", () => isRage11),
  registerApiFunc("player.getPosition", () => mp.players.local.position),
  registerApiFunc("player.getWaypointPosition", () => {
    let a = mp.game.invoke("0x1DD1F58F493F1DA5"),
      b = mp.game.invoke("0x186E5D252FA50E7D"),
      c = mp.game.invoke("0x1BEDE233E6CD2A1F", b),
      d = mp.game.invoke("0x14F96AA50D6FBEA7", b);
    for (let b = c; 0 != mp.game.invoke("0xA6DB27D19ECBB7DA", b); b = d)
      if (4 == mp.game.invoke("0xBE9B0959FFD0779B", b) && !!a)
        return mp.game.ui.getBlipInfoIdCoord(b);
    return null;
  }),
  registerApiFunc("player.getOtherPlayerName", (a) => {
    const b = global.getEntityVariable(mp.players.local, "factionId", ""),
      c = global.getEntityVariable(mp.players.local, "familyId", "");
    return (global.isCharacterFriend(a.getVariable("characterId")) &&
      !a.getVariable("isPlayerInMask")) ||
      ("" !== b && a.getVariable("factionId") === b) ||
      ("" !== c && a.getVariable("familyId") === c) ||
      a.getVariable("isInPrison")
      ? a.getVariable("characterName")
      : a.getVariable("charName");
  }),
  registerApiFunc(
    "player.transitionTeleport",
    async ({
      x: a,
      y: b,
      z: c,
      heading: d,
      fadeOutTime: e,
      fadeInTime: f,
      freeze: g,
    }) => {
      antiCheatDisableCounter++;
      try {
        const h = mp.players.local;
        g && (h.clearTasksImmediately(), h.freezePosition(!0)),
          e && (mp.game.cam.doScreenFadeOut(e), await mp.game.waitAsync(e)),
          h.setCoordsNoOffset(a, b, c, !1, !1, !1),
          h.setHeading(d),
          f &&
            (mp.game.cam.doScreenFadeIn(f),
            await mp.game.waitAsync(Math.floor(0.5 * f))),
          g && h.freezePosition(!1);
      } catch (a) {}
      setTimeout(() => {
        antiCheatDisableCounter--;
      }, 500);
    }
  ),
  registerApiFunc(
    "player.transitionTeleportInVehicle",
    async ({
      x: a,
      y: b,
      z: c,
      heading: d,
      onGround: e,
      rotation: f,
      fadeOutTime: g,
      fadeInTime: h,
      freeze: i,
    }) => {
      antiCheatDisableCounter++;
      try {
        const j = mp.players.local,
          k = j.vehicle;
        k &&
          (i && k.freezePosition(!0),
          mp.game.cam.doScreenFadeOut(g),
          await mp.game.waitAsync(g),
          k.setCoordsNoOffset(a, b, c, !1, !1, !1),
          d && k.setHeading(d),
          f && k.setRotation(f.x, f.y, f.z, 2, !0),
          e && k.setOnGroundProperly(),
          mp.game.cam.doScreenFadeIn(h),
          await mp.game.waitAsync(h),
          i && k.freezePosition(!1));
      } catch (a) {}
      antiCheatDisableCounter--;
    }
  ),
  registerApiFunc("location.getZoneName", (a, b, c) => {
    const d = [
        "AIRP",
        "ALAMO",
        "ALTA",
        "ARMYB",
        "BANHAMC",
        "BANNING",
        "BEACH",
        "BHAMCA",
        "BRADP",
        "BRADT",
        "BURTON",
        "CALAFB",
        "CANNY",
        "CCREAK",
        "CHAMH",
        "CHIL",
        "CHU",
        "CMSW",
        "CYPRE",
        "DAVIS",
        "DELBE",
        "DELPE",
        "DELSOL",
        "DESRT",
        "DOWNT",
        "DTVINE",
        "EAST_V",
        "EBURO",
        "ELGORL",
        "ELYSIAN",
        "GALFISH",
        "GOLF",
        "GRAPES",
        "GREATC",
        "HARMO",
        "HAWICK",
        "HORS",
        "HUMLAB",
        "JAIL",
        "KOREAT",
        "LACT",
        "LAGO",
        "LDAM",
        "LEGSQU",
        "LMESA",
        "LOSPUER",
        "MIRR",
        "MORN",
        "MOVIE",
        "MTCHIL",
        "MTGORDO",
        "MTJOSE",
        "MURRI",
        "NCHU",
        "NOOSE",
        "OCEANA",
        "PALCOV",
        "PALETO",
        "PALFOR",
        "PALHIGH",
        "PALMPOW",
        "PBLUFF",
        "PBOX",
        "PROCOB",
        "RANCHO",
        "RGLEN",
        "RICHM",
        "ROCKF",
        "RTRAK",
        "SANAND",
        "SANCHIA",
        "SANDY",
        "SKID",
        "SLAB",
        "STAD",
        "STRAW",
        "TATAMO",
        "TERMINA",
        "TEXTI",
        "TONGVAH",
        "TONGVAV",
        "VCANA",
        "VESP",
        "VINE",
        "WINDF",
        "WVINE",
        "ZANCUDO",
        "ZP_ORT",
        "ZQ_UAR",
        "PROL",
      ],
      e = mp.game.zone.getNameOfZone(a, b, c);
    return d.includes(e)
      ? [
          "\u041C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0439 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442 \u041B\u043E\u0441 \u0421\u0430\u043D\u0442\u043E\u0441",
          "\u0410\u043B\u0430\u043C\u043E-\u0421\u0438",
          "\u0410\u043B\u044C\u0442\u0430",
          "\u0424\u043E\u0440\u0442 \u0417\u0430\u043D\u043A\u0443\u0434\u043E",
          "\u0411\u044D\u043D\u0445\u044D\u043C-\u041A\u0430\u043D\u044C\u043E\u043D-\u0434\u0440\u0430\u0439\u0432",
          "\u0411\u044D\u043D\u043D\u0438\u043D\u0433",
          "\u041F\u043B\u044F\u0436 \u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438",
          "\u041A\u0430\u043D\u044C\u043E\u043D \u0411\u044D\u043D\u0445\u044D\u043C",
          "\u041F\u0435\u0440\u0435\u0432\u0430\u043B \u0411\u0440\u044D\u0434\u0434\u043E\u043A\u0430",
          "\u0422\u0443\u043D\u043D\u0435\u043B\u044C \u0411\u0440\u044D\u0434\u0434\u043E\u043A\u0430",
          "\u0411\u0451\u0440\u0442\u043E\u043D",
          "\u041C\u043E\u0441\u0442 \u041A\u0430\u043B\u0430\u0444\u0438\u044F",
          "\u041A\u0430\u043D\u044C\u043E\u043D \u0420\u0430\u0442\u043E\u043D",
          "\u0411\u0443\u0445\u0442\u0430 \u041A\u044D\u0441\u0441\u0438\u0434\u0438",
          "\u0427\u0435\u043C\u0431\u0435\u0440\u043B\u0435\u043D-\u0425\u0438\u043B\u043B\u0437",
          "\u0412\u0430\u0439\u043D\u0432\u0443\u0434-\u0425\u0438\u043B\u043B\u0437",
          "\u0427\u0443\u043C\u0430\u0448",
          "\u0417\u0430\u043F\u043E\u0432\u0435\u0434\u043D\u0438\u043A \u0433\u043E\u0440\u044B \u0427\u0438\u043B\u0438\u0430\u0434",
          "\u0421\u0430\u0439\u043F\u0440\u0435\u0441\u0441-\u0424\u043B\u044D\u0442\u0441",
          "\u0414\u044D\u0432\u0438\u0441",
          "\u041F\u043B\u044F\u0436 \u0414\u0435\u043B\u044C-\u041F\u0435\u0440\u0440\u043E",
          "\u0414\u0435\u043B\u044C-\u041F\u0435\u0440\u0440\u043E",
          "\u041B\u0430-\u041F\u0443\u044D\u0440\u0442\u0430",
          "\u041F\u0443\u0441\u0442\u044B\u043D\u044F \u0413\u0440\u0430\u043D\u0434-\u0421\u0435\u043D\u043E\u0440\u0430",
          "\u0426\u0435\u043D\u0442\u0440",
          "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434",
          "\u0412\u043E\u0441\u0442\u043E\u0447\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434",
          "\u042D\u043B\u044C-\u0411\u0443\u0440\u0440\u043E-\u0425\u0430\u0439\u0442\u0441",
          "\u041C\u0430\u044F\u043A \u042D\u043B\u044C-\u0413\u043E\u0440\u0434\u043E",
          "\u042D\u043B\u0438\u0437\u0438\u0430\u043D-\u0410\u0439\u043B\u0435\u043D\u0434",
          "\u0413\u0430\u043B\u0438\u043B\u0438",
          "\u0413\u043E\u043B\u044C\u0444 \u043A\u043B\u0443\u0431",
          "\u0413\u0440\u0435\u0439\u043F\u0441\u0438\u0434",
          "\u0413\u0440\u0435\u0439\u0442-\u0427\u0430\u043F\u0430\u0440\u0440\u0430\u043B",
          "\u0425\u0430\u0440\u043C\u043E\u043D\u0438",
          "\u0425\u0430\u0432\u0438\u043A",
          "\u0412\u0430\u0439\u043D\u0432\u0443\u0434\u0441\u043A\u0430\u044F \u0433\u043E\u043D\u043E\u0447\u043D\u0430\u044F \u0442\u0440\u0430\u0441\u0441\u0430",
          "Humane Labs and Research",
          "\u0422\u044E\u0440\u044C\u043C\u0430 \u0411\u043E\u043B\u0438\u043D\u0433\u0431\u0440\u043E\u0443\u043A",
          "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0439 \u0421\u0435\u0443\u043B",
          "\u041B\u044D\u043D\u0434-\u044D\u043A\u0442-\u0440\u0435\u0437\u0435\u0440\u0432\u0443\u0430\u0440",
          "\u041B\u0430\u0433\u043E-\u0417\u0430\u043D\u043A\u0443\u0434\u043E",
          "\u041B\u044D\u043D\u0434-\u044D\u043A\u0442-\u0434\u044D\u043C",
          "\u041F\u043B\u043E\u0449\u0430\u0434\u044C \u041B\u0435\u0433\u0438\u043E\u043D\u0430",
          "\u041B\u0430-\u041C\u0435\u0441\u0430",
          "\u041B\u0430-\u041F\u0443\u044D\u0440\u0442\u0430",
          "\u041C\u0438\u0440\u0440\u043E\u0440-\u041F\u0430\u0440\u043A",
          "\u041C\u043E\u0440\u043D\u0438\u043D\u0433\u0432\u0443\u0434",
          "Richards Majestic",
          "\u0413\u043E\u0440\u0430 \u0427\u0438\u043B\u0438\u0430\u0434",
          "\u0413\u043E\u0440\u0430 \u0413\u043E\u0440\u0434\u043E",
          "\u0413\u043E\u0440\u0430 \u0414\u0436\u043E\u0441\u0430\u0439\u044F",
          "\u041C\u0443\u0440\u044C\u0435\u0442\u0430-\u0425\u0430\u0439\u0442\u0441",
          "\u0421\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0427\u0443\u043C\u0430\u0448",
          "N.O.O.S.E",
          "\u0422\u0438\u0445\u0438\u0439 \u043E\u043A\u0435\u0430\u043D",
          "\u0411\u0443\u0445\u0442\u0430 \u041F\u0430\u043B\u0435\u0442\u043E",
          "\u041F\u0430\u043B\u0435\u0442\u043E-\u0411\u044D\u0439",
          "\u041B\u0435\u0441 \u041F\u0430\u043B\u0435\u0442\u043E",
          "\u041D\u0430\u0433\u043E\u0440\u044C\u044F \u041F\u0430\u043B\u043E\u043C\u0438\u043D\u043E",
          "\u0422\u042D\u0421 \u041F\u0430\u043B\u043C\u0435\u0440-\u0422\u0435\u0439\u043B\u043E\u0440",
          "\u041F\u0430\u0441\u0438\u0444\u0438\u043A-\u0411\u043B\u0430\u0444\u0441",
          "\u041F\u0438\u043B\u0431\u043E\u043A\u0441-\u0425\u0438\u043B\u043B",
          "\u041F\u043B\u044F\u0436 \u041F\u0440\u043E\u043A\u043E\u043F\u0438\u043E",
          "\u041C\u0435\u043A\u0441\u0438\u043A\u0430\u043D\u0441\u043A\u043E\u0435 \u0440\u0430\u043D\u0447\u043E",
          "\u0420\u0438\u0447\u043C\u0430\u043D-\u0413\u043B\u0435\u043D",
          "\u0420\u0438\u0447\u043C\u0430\u043D",
          "\u0420\u043E\u043A\u0444\u043E\u0440\u0434-\u0425\u0438\u043B\u043B\u0437",
          "\u0422\u0440\u0430\u0441\u0441\u0430 \u0420\u0435\u0434\u0432\u0443\u0434-\u041B\u0430\u0439\u0442\u0441",
          "\u0421\u0430\u043D-\u0410\u043D\u0434\u0440\u0435\u0430\u0441",
          "\u0421\u0430\u043D-\u0428\u0430\u043D\u044C\u0441\u043A\u0438\u0439 \u0433\u043E\u0440\u043D\u044B\u0439 \u0445\u0440\u0435\u0431\u0435\u0442",
          "\u0421\u044D\u043D\u0434\u0438-\u0428\u043E\u0440\u0441",
          "\u041C\u0438\u0448\u043D-\u0420\u043E\u0443",
          "\u0421\u0442\u044D\u0431-\u0421\u0438\u0442\u0438",
          "\u0410\u0440\u0435\u043D\u0430 Maze Bank",
          "\u0421\u0442\u0440\u043E\u0431\u0435\u0440\u0440\u0438",
          "\u0422\u0430\u0442\u0430\u0432\u0438\u0430\u043C\u0441\u043A\u0438\u0435 \u0433\u043E\u0440\u044B",
          "\u0422\u0435\u0440\u043C\u0438\u043D\u0430\u043B",
          "\u0422\u0435\u043A\u0441\u0442\u0430\u0439\u043B-\u0421\u0438\u0442\u0438",
          "\u0422\u043E\u043D\u0433\u0432\u0430-\u0425\u0438\u043B\u043B\u0437",
          "\u0414\u043E\u043B\u0438\u043D\u0430 \u0422\u043E\u043D\u0433\u0432\u0430",
          "\u041A\u0430\u043D\u0430\u043B\u044B \u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438",
          "\u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438",
          "\u0412\u0430\u0439\u043D\u0432\u0443\u0434",
          "\u0412\u0435\u0442\u0440\u044F\u043D\u0430\u044F \u0444\u0435\u0440\u043C\u0430 RON Alternates",
          "\u0417\u0430\u043F\u0430\u0434\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434",
          "\u0420\u0435\u043A\u0430 \u0417\u0430\u043D\u043A\u0443\u0434\u043E",
          "\u041F\u043E\u0440\u0442 \u041B\u043E\u0441-\u0421\u0430\u043D\u0442\u043E\u0441\u0430",
          "\u0414\u0435\u0439\u0432\u0438\u0441-\u041A\u0432\u0430\u0440\u0446",
          "\u041E\u0441\u0442\u0440\u043E\u0432 \u041A\u0430\u0439\u043E-\u041F\u0435\u0440\u0438\u043A\u043E",
        ][d.indexOf(e)]
      : "";
  }),
  registerApiFunc("location.getStreetName", (a, b, c) => {
    const d = mp.game.pathfind.getStreetNameAtCoord(a, b, c, 0, 0);
    return 1945201252 === d.streetName
      ? "\u0427\u0430\u0441\u0442\u043D\u044B\u0435 \u0432\u043B\u0430\u0434\u0435\u043D\u0438\u044F"
      : mp.game.ui.getStreetNameFromHashKey(d.streetName);
  }),
  registerApiFunc("location.isPointInPolygon", (a, b) => {
    let c = 0,
      d = 0,
      e = 0,
      g = 0,
      h = 0,
      j = 0,
      l = 0,
      m = 0,
      n = null,
      o = null;
    const p = a[0],
      q = a[1],
      r = b.length;
    for (c; c < r; c++) {
      d = 0;
      const f = b[c].length - 1,
        i = b[c];
      for (n = i[0], h = n[0] - p, j = n[1] - q, d; d < f; d++) {
        if (
          ((o = i[d + 1]), (m = o[1] - q), (0 > j && 0 > m) || (0 < j && 0 < m))
        ) {
          (n = o), (j = m), (h = n[0] - p);
          continue;
        }
        if (((l = o[0] - a[0]), 0 < m && 0 >= j)) {
          if (((g = h * m - l * j), 0 < g)) ++e;
          else if (0 === g) return 0;
        } else if (0 < j && 0 >= m) {
          if (((g = h * m - l * j), 0 > g)) ++e;
          else if (0 === g) return 0;
        } else if (0 === m && 0 > j) {
          if (((g = h * m - l * j), 0 === g)) return 0;
        } else if (0 === j && 0 > m) {
          if (((g = h * m - l * j), 0 === g)) return 0;
        } else if (0 === j && 0 === m) {
          if (0 >= l && 0 <= h) return 0;
          if (0 >= h && 0 <= l) return 0;
        }
        (n = o), (j = m), (h = l);
      }
    }
    return 0 != e % 2;
  }),
  registerApiFunc("notify.success", (a) => {
    mp.events.call("clientFunc_notify", "success", a);
  }),
  registerApiFunc("notify.info", (a) => {
    mp.events.call("clientFunc_notify", "info", a);
  }),
  registerApiFunc("notify.error", (a) => {
    mp.events.call("clientFunc_notify", "error", a);
  }),
  (mp.dist = (a, b, c, d, e, f) => {
    var g = Math.pow;
    return Math.sqrt(g(a - d, 2) + g(b - e, 2) + g(c - f, 2));
  });
㭂ϸ;
