{
  const DEFAULT_VOICE_RANGE = 10,
    localPlayer = mp.players.local;
  function toggleVoiceChatMuted(a) {
    (mp.voiceChat.muted = a),
      global.mainBrowser.execute(
        `mainHud.voiceChatMicroStatus = ${
          mp.voiceChat.muted ? "false" : "true"
        };`
      ),
      a
        ? localPlayer.playFacialAnim(
            "mood_normal_1",
            "facials@gen_male@variations@normal"
          )
        : localPlayer.playFacialAnim("mic_chatter", "mp_facial");
  }
  let voieChatEnable = !1,
    radioChatEnable = !1;
  (global.fRadioVoiceChannelId = -1),
    (global.fRadioVoicePlayerList = new Set()),
    setInterval(() => {
      if (voieChatEnable)
        mp.keys.isDown(voiceChatBinder.key) ||
          ((voieChatEnable = !1), toggleVoiceChatMuted(!0));
      else if (mp.keys.isDown(voiceChatBinder.key)) {
        if (
          !global.isAuth ||
          global.isChatOpen ||
          global.isConsoleOpen ||
          global.disableKeys
        )
          return;
        (voieChatEnable = !0), toggleVoiceChatMuted(!1);
      }
      if (-1 != global.fRadioVoiceChannelId)
        if (radioChatEnable)
          mp.keys.isDown(radioChatBinder.key) ||
            ((radioChatEnable = !1),
            toggleVoiceChatMuted(!0),
            mp.events.callRemote("server_fRadio_stop"));
        else if (mp.keys.isDown(radioChatBinder.key)) {
          if (
            !global.isAuth ||
            global.isChatOpen ||
            global.isConsoleOpen ||
            global.disableKeys ||
            global.isPlayerDeath ||
            localPlayer.getVariable("cuffed")
          )
            return;
          (radioChatEnable = !0),
            toggleVoiceChatMuted(!1),
            mp.events.callRemote("server_fRadio_start"),
            global.mainBrowser.execute(
              `client_playMusic('https://files.gta5rp.com/sound/fradio_start.mp3', 0.5);`
            );
        }
    }, 110);
  const voiceChatBinder = global.binder.register({
      action: "VOICE_CHAT_TOGGLE",
      desc: "\u0413\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0439 \u0447\u0430\u0442",
      defaultKey: 66,
      func: () => {},
    }),
    radioChatBinder = global.binder.register({
      action: "RADIO_CHAT_TOGGLE",
      desc: "\u0413\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u0432 \u0440\u0430\u0446\u0438\u044E",
      defaultKey: -1,
      func: () => {},
    }),
    voiceChatService = {
      listeners: [],
      blockList: [],
      add: function (a) {
        this.listeners.push(a),
          (a.isListening = !0),
          (a.voiceVolume = 0),
          (a.voice3d = !0),
          mp.events.callRemote("server_voicechat_add_listener", a);
      },
      remove: function (a, b) {
        let c = this.listeners.indexOf(a);
        -1 !== c && this.listeners.splice(c, 1),
          (a.isListening = !1),
          b && mp.events.callRemote("server_voicechat_remove_listener", a);
      },
    };
  mp.events.add("client_voice_reload", function () {
    try {
      mp.voiceChat.cleanupAndReload(!0, !1, !1);
    } catch {}
    try {
      mp.voiceChat.cleanupAndReload(!1, !1, !0);
    } catch {}
    try {
      mp.voiceChat.cleanupAndReload(!0, !0, !0);
    } catch {}
    global.rpc.triggerClient(
      "clientFunc_notifySuccess",
      "\u0413\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0439 \u0447\u0430\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"
    );
  }),
    global.binder.register({
      action: "VOICE_CHAT_RELOAD",
      desc: "\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0433\u043E \u0447\u0430\u0442\u0430",
      defaultKey: 114,
      func: () => {
        mp.gui.cursor.visible ||
          global.isChatOpen ||
          mp.events.call("client_voice_reload");
      },
    }),
    mp.events.add("client_fRadio_enter", function (a) {
      const b = mp.players.atRemoteId(a);
      b && global.fRadioVoicePlayerList.add(b);
    }),
    mp.events.add("client_fRadio_exit", function (a) {
      const b = mp.players.atRemoteId(a);
      b && global.fRadioVoicePlayerList.delete(b);
    }),
    global.rpc.register("__client_voiceChat_getBlockList", () =>
      voiceChatService.blockList.join(" ")
    ),
    mp.events.add("__client_voiceChat_setBlockList", (a) => {
      voiceChatService.blockList = [];
      for (const b of (a + "").split(" ")) {
        const a = parseInt(b);
        if (isNaN(a)) continue;
        const c = mp.players.atRemoteId(a);
        c && ((c.voiceVolume = 0), voiceChatService.blockList.push(a));
      }
    }),
    mp.events.add("__client_voiceChat_blockList_add", (a) => {
      const b = mp.players.atRemoteId(a);
      b && ((b.voiceVolume = 0), voiceChatService.blockList.push(a));
    }),
    mp.events.add("__client_voiceChat_blockList_remove", (a) => {
      const b = voiceChatService.blockList.indexOf(a);
      -1 !== b && voiceChatService.blockList.splice(b, 1);
    }),
    mp.events.add("playerStartTalking", (a) => {
      const b = a.remoteId;
      if (-1 !== voiceChatService.blockList.indexOf(b))
        return void (a.voiceVolume = 0);
      if (global.fRadioVoicePlayerList.has(a))
        (a.voiceVolume = 0.8),
          (a.voice3d = !1),
          global.mainBrowser.execute(
            `mainHud.voiceAdd(${b}, '${global.getEntityVariable(
              a,
              "characterName",
              "\u0413\u0440\u0430\u0436\u0434\u0430\u043D\u0438\u043D"
            )}');`
          ),
          a.stopTalkingTimeout && clearInterval(a.stopTalkingTimeout),
          (a.stopTalkingTimeout = setInterval(() => {
            (mp.players.exists(a) && a.isVoiceActive) ||
              (global.mainBrowser.execute(`mainHud.voiceRemove(${b});`),
              clearInterval(a.stopTalkingTimeout),
              delete a.stopTalkingTimeout);
          }, 500));
      else if (global.smartphoneCallPlayerId === b)
        (a.voiceVolume = 0.8), (a.voice3d = !1);
      else {
        const b = VoiceRoom.getPlayerVoiceRoom(localPlayer),
          c =
            null !== b && b.conference
              ? () => {
                  const c = a.position;
                  if (
                    b === VoiceRoom.getPlayerVoiceRoom(localPlayer) &&
                    b === VoiceRoom.getPlayerVoiceRoom(a) &&
                    (!b.conferenceHasMicro ||
                      -1 !==
                        b.conferenceMicroPositions.findIndex(
                          (a) => 0.9 > mp.dist(a.x, a.y, a.z, c.x, c.y, c.z)
                        ))
                  )
                    return (a.voiceVolume = 0.9), void (a.voice3d = !0);
                  const d = global.getEntityVariable(
                      a,
                      "voiceRange",
                      DEFAULT_VOICE_RANGE
                    ),
                    { x: e, y: f, z: g } = localPlayer.position,
                    h = mp.dist(c.x, c.y, c.z, e, f, g);
                  h < d
                    ? ((a.voiceVolume =
                        1 - (h / d) * (d === DEFAULT_VOICE_RANGE ? 1 : 0.5)),
                      (a.voice3d = !0))
                    : (a.voiceVolume = 0);
                }
              : () => {
                  const b = global.getEntityVariable(
                      a,
                      "voiceRange",
                      DEFAULT_VOICE_RANGE
                    ),
                    { x: c, y: d, z: e } = localPlayer.position,
                    f = a.position,
                    g = mp.dist(f.x, f.y, f.z, c, d, e);
                  g < b
                    ? ((a.voiceVolume =
                        1 - (g / b) * (b === DEFAULT_VOICE_RANGE ? 1 : 0.5)),
                      (a.voice3d = !0))
                    : (a.voiceVolume = 0);
                };
        a.stopTalkingTimeout ? clearInterval(a.stopTalkingTimeout) : c(),
          (a.stopTalkingTimeout = setInterval(
            () =>
              mp.players.exists(a) && 0 !== a.handle && a.isVoiceActive
                ? void c()
                : (clearInterval(a.stopTalkingTimeout),
                  void delete a.stopTalkingTimeout),
            100
          ));
      }
    }),
    setInterval(() => {
      const { x: a, y: b, z: c } = localPlayer.position,
        d = global.getEntityVariable(
          localPlayer,
          "voiceRange",
          DEFAULT_VOICE_RANGE
        ),
        e = VoiceRoom.getPlayerVoiceRoom(localPlayer);
      null === e
        ? (mp.players.forEachInStreamRange((e) => {
            e == localPlayer ||
              e.isListening ||
              (mp.dist(e.position.x, e.position.y, e.position.z, a, b, c) <=
                d &&
                (localPlayer.vehicle || e.vehicle
                  ? !e.__voiceChatAddTimeout &&
                    (e.__voiceChatAddTimeout = setTimeout(() => {
                      delete e.__voiceChatAddTimeout;
                      !mp.players.exists(e) ||
                        0 === e.handle ||
                        e.isListening ||
                        (mp.dist(
                          e.position.x,
                          e.position.y,
                          e.position.z,
                          localPlayer.position.x,
                          localPlayer.position.y,
                          localPlayer.position.z
                        ) <= d &&
                          voiceChatService.add(e));
                    }, 800))
                  : (e.__voiceChatAddTimeout &&
                      (clearTimeout(e.__voiceChatAddTimeout),
                      delete e.__voiceChatAddTimeout),
                    voiceChatService.add(e))));
          }),
          voiceChatService.listeners.forEach((e) => {
            if (0 === e.handle) return voiceChatService.remove(e, !0);
            const f = e.position,
              g = mp.dist(f.x, f.y, f.z, a, b, c);
            g > d && voiceChatService.remove(e, !0);
          }))
        : (mp.players.forEachInStreamRange((f) => {
            if (!(f == localPlayer || f.isListening)) {
              const g = VoiceRoom.getPlayerVoiceRoom(f);
              return e.conference && e === g
                ? (f.__voiceChatAddTimeout &&
                    (clearTimeout(f.__voiceChatAddTimeout),
                    delete f.__voiceChatAddTimeout),
                  void voiceChatService.add(f))
                : void (
                    mp.dist(
                      f.position.x,
                      f.position.y,
                      f.position.z,
                      a,
                      b,
                      c
                    ) <= d &&
                    (!e.silent || e === g) &&
                    (f.__voiceChatAddTimeout &&
                      (clearTimeout(f.__voiceChatAddTimeout),
                      delete f.__voiceChatAddTimeout),
                    voiceChatService.add(f))
                  );
            }
          }),
          voiceChatService.listeners.forEach((f) => {
            if (0 === f.handle) return voiceChatService.remove(f, !0);
            const g = VoiceRoom.getPlayerVoiceRoom(f);
            if (e.conference && e === g) return;
            const h = f.position,
              i = mp.dist(h.x, h.y, h.z, a, b, c);
            (i > d || (e.silent && e !== g)) && voiceChatService.remove(f, !0);
          }));
    }, 350),
    mp.events.add("playerQuit", (a) => {
      a.isListening && voiceChatService.remove(a, !1),
        global.fRadioVoicePlayerList.has(a) &&
          global.fRadioVoicePlayerList.delete(a);
      const b = voiceChatService.blockList.indexOf(a.remoteId);
      -1 !== b && voiceChatService.blockList.splice(b, 1);
    });
  let voiceRoomList = [];
  class VoiceRoom {
    constructor({
      polygon: a,
      minZ: b,
      maxZ: c,
      silent: d,
      conference: e,
      conferenceMicroPositions: f,
    }) {
      (this.polygon = a),
        (this.minZ = b),
        (this.maxZ = c),
        (this.silent = d || !1),
        (this.conference = e || !1),
        (this.conferenceMicroPositions = f || []),
        (this.conferenceHasMicro = 0 < this.conferenceMicroPositions.length),
        voiceRoomList.push(this);
    }
    static getPlayerVoiceRoom(a) {
      const b = new Date().getTime();
      if (void 0 !== a.__voiceRoomTime && a.__voiceRoomTime + 1e3 > b)
        return a.__voiceRoom;
      let c = null;
      const { x: d, y: e, z: f } = a.position;
      for (const b of voiceRoomList)
        if (
          f >= b.minZ &&
          f <= b.maxZ &&
          VoiceRoom.pointInPolygon([d, e], b.polygon)
        ) {
          c = b;
          break;
        }
      return (a.__voiceRoom = c), (a.__voiceRoomTime = b), c;
    }
    static pointInPolygon(a, b) {
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
            ((o = i[d + 1]),
            (m = o[1] - q),
            (0 > j && 0 > m) || (0 < j && 0 < m))
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
    }
  }
  (() => {
    new VoiceRoom({
      polygon: [
        [
          [140.31, -746.25],
          [137.88, -752.85],
          [146.33, -755.93],
          [148.74, -749.31],
          [140.31, -746.25],
        ],
      ],
      minZ: 54.53,
      maxZ: 58.53,
      silent: !0,
    }),
      new VoiceRoom({
        polygon: [
          [
            [134.41, -759.54],
            [142.61, -736.56],
            [150.28, -740.03],
            [154.01, -744.14],
            [155.42, -748.41],
            [155.28, -753.59],
            [153.13, -759.66],
            [145.59, -756.98],
            [143.37, -763],
            [134.41, -759.54],
          ],
        ],
        minZ: 236.93,
        maxZ: 239.57,
        conference: !0,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [-1533.69, 144.22],
            [-1543.12, 134.45],
            [-1544.72, 135.47],
            [-1545.38, 134.69],
            [-1546.32, 134.71],
            [-1548.64, 137],
            [-1548.63, 137.85],
            [-1547.93, 138.64],
            [-1549.49, 140.17],
            [-1540.11, 150.26],
            [-1533.69, 144.22],
          ],
        ],
        minZ: 54.87,
        maxZ: 58.98,
        conference: !0,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [-1509.17, 121.59],
            [-1500.37, 131.14],
            [-1499.08, 129.93],
            [-1498.14, 130.84],
            [-1497.33, 130.74],
            [-1495.05, 128.57],
            [-1495.13, 127.89],
            [-1495.79, 126.82],
            [-1494.47, 125.53],
            [-1503.33, 116.06],
            [-1509.17, 121.59],
          ],
        ],
        minZ: 54.57,
        maxZ: 58.47,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [-1881.35, 2059.41],
            [-1879.95, 2063.44],
            [-1878.08, 2062.78],
            [-1877.49, 2064.4],
            [-1874.04, 2063.07],
            [-1876.29, 2057.78],
            [-1881.35, 2059.41],
          ],
        ],
        minZ: 144.55,
        maxZ: 148.19,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [-99.16, 1001.22],
            [-104.1, 1015.04],
            [-97.82, 1017.37],
            [-92.82, 1003.58],
            [-99.16, 1001.22],
          ],
        ],
        minZ: 234.75,
        maxZ: 240.33,
        conference: !0,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [-65.54, 986.72],
            [-60.56, 992.38],
            [-56.61, 981.36],
            [-62.86, 978.95],
            [-65.54, 986.72],
          ],
        ],
        minZ: 233.53,
        maxZ: 238.05,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [1401.27, 1166.14],
            [1408.04, 1166.12],
            [1408, 1158.6],
            [1401.24, 1158.17],
            [1401.27, 1166.14],
          ],
        ],
        minZ: 113.33,
        maxZ: 116.46,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [1390.41, 1158.42],
            [1390.47, 1166.15],
            [1396.74, 1166.08],
            [1396.82, 1162.34],
            [1397.85, 1162.31],
            [1397.82, 1158.55],
            [1390.41, 1158.42],
          ],
        ],
        minZ: 113.33,
        maxZ: 116.46,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [-1040.03, 298.74],
            [-1049.03, 295.7],
            [-1051.53, 303.25],
            [-1045.38, 305.35],
            [-1044.53, 302.98],
            [-1041.8, 303.9],
            [-1040.03, 298.74],
          ],
        ],
        minZ: 70.62,
        maxZ: 74.23,
        conference: !0,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [-530.05, -185.31],
            [-519.82, -179.16],
            [-506.33, -202.61],
            [-516.68, -208.56],
            [-530.05, -185.31],
          ],
        ],
        minZ: 36.17,
        maxZ: 42.97,
        conference: !0,
        silent: !0,
        conferenceMicroPositions: [
          new mp.Vector3(-524.34, -183.31, 37.71),
          new mp.Vector3(-521.31, -184.55, 37.32),
          new mp.Vector3(-522.42, -185.13, 37.33),
          new mp.Vector3(-523.57, -185.85, 37.32),
          new mp.Vector3(-524.73, -186.47, 37.32),
          new mp.Vector3(-519.96, -196.68, 36.7),
          new mp.Vector3(-518.91, -196.11, 36.73),
          new mp.Vector3(-515.95, -194.43, 36.75),
          new mp.Vector3(-514.95, -193.9, 36.73),
          new mp.Vector3(-516.22, -187.35, 36.74),
          new mp.Vector3(-518.58, -193.26, 37.22),
        ],
      }),
      new VoiceRoom({
        polygon: [
          [
            [-562.75, -241.75],
            [-552.61, -236.09],
            [-568.27, -209.09],
            [-578.1, -214.93],
            [-562.75, -241.75],
          ],
        ],
        minZ: 35.42,
        maxZ: 44.9,
        conference: !0,
        silent: !0,
        conferenceMicroPositions: [
          new mp.Vector3(-571.19, -215.68, 37.63),
          new mp.Vector3(-567.09, -216.16, 36.92),
          new mp.Vector3(-567.97, -216.75, 36.97),
          new mp.Vector3(-568.97, -217.23, 36.97),
          new mp.Vector3(-569.95, -217.92, 36.97),
          new mp.Vector3(-570.9, -218.41, 36.97),
          new mp.Vector3(-571.9, -218.97, 36.97),
          new mp.Vector3(-572.78, -219.54, 36.97),
          new mp.Vector3(-568.75, -219.95, 36.72),
        ],
      }),
      new VoiceRoom({
        polygon: [
          [
            [-550.12, -207.19],
            [-555.23, -198.34],
            [-545.08, -192.54],
            [-539.94, -201.31],
            [-550.12, -207.19],
          ],
        ],
        minZ: 46.55,
        maxZ: 50.83,
        silent: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [-440.35, 280.01],
            [-450.26, 281.28],
            [-455.14, 263.74],
            [-438.71, 262.52],
            [-438.3, 267.72],
            [-440.34, 268.05],
            [-440.35, 280.01],
          ],
        ],
        minZ: 83.44,
        maxZ: 87.69,
        conference: !0,
        silent: !0,
        conferenceMicroPositions: [new mp.Vector3(-445.21, 278.93, 85.29)],
      }),
      new VoiceRoom({
        polygon: [
          [
            [-439.67, 278.15],
            [-443.79, 282.81],
            [-458.4, 284.28],
            [-459.78, 268.24],
            [-454.14, 267.81],
            [-454.11, 263.68],
            [-440.99, 262.64],
            [-439.67, 278.15],
          ],
        ],
        minZ: 79.54,
        maxZ: 83.39,
        conference: !0,
        silent: !0,
        conferenceMicroPositions: [new mp.Vector3(-442.89, 279.55, 80.79)],
      }),
      new VoiceRoom({
        polygon: [
          [
            [381.36, -1414.6],
            [392.7, -1401.01],
            [401.23, -1407.93],
            [389.58, -1421.54],
            [381.36, -1414.6],
          ],
        ],
        minZ: 36.9,
        maxZ: 41.2,
        silent: !0,
        conference: !0,
      }),
      new VoiceRoom({
        polygon: [
          [
            [350.14, -1376.84],
            [355.72, -1370.2],
            [350.08, -1364.96],
            [348.92, -1364.38],
            [347.65, -1364.32],
            [346.35, -1364.79],
            [345.47, -1365.6],
            [344.74, -1366.41],
            [345.66, -1367.27],
            [342.9, -1370.65],
            [350.14, -1376.84],
          ],
        ],
        minZ: 41.45,
        maxZ: 46.63,
        silent: !0,
      });
  })();
  const MICRO_LIST = [
    {
      position: new mp.Vector3(683.98, 571.09, 130.46),
      objectHash: "v_ilev_fos_mic",
      objectPosition: new mp.Vector3(683.88, 570.82, 129.46),
      objectRotation: new mp.Vector3(0, 0, 345),
      microRange: 1,
      voiceRange: 50,
    },
    {
      position: new mp.Vector3(198.5, 1165.57, 227.01),
      objectHash: "v_ilev_fos_mic",
      objectPosition: new mp.Vector3(198.14, 1165.43, 226.01),
      objectRotation: new mp.Vector3(0, 0, 285),
      microRange: 1,
      voiceRange: 50,
    },
    {
      position: new mp.Vector3(307.07, 216.87, 109.75),
      microRange: 1,
      voiceRange: 26,
    },
    {
      position: new mp.Vector3(1.96, 215.98, 97.91),
      objectHash: "v_club_roc_micstd",
      objectPosition: new mp.Vector3(1.66, 215.38, 97.31),
      objectRotation: new mp.Vector3(0, 0, 40),
      microRange: 1,
      voiceRange: 22,
    },
    {
      position: new mp.Vector3(-1381.74, -615.03, 31.5),
      microRange: 1,
      voiceRange: 26,
    },
    {
      position: new mp.Vector3(115.67, -1281.45, 28.26),
      objectHash: "v_club_roc_micstd",
      objectPosition: new mp.Vector3(115.67, -1282.03, 27.67),
      objectRotation: new mp.Vector3(0, 0, 90),
      microRange: 1,
      voiceRange: 20,
    },
    {
      position: new mp.Vector3(4893.32, -4908.13, 3.36),
      objectHash: "v_ilev_fos_mic",
      objectPosition: new mp.Vector3(4893.28, -4908.75, 2.36),
      objectRotation: new mp.Vector3(0, 0, 0),
      microRange: 1,
      voiceRange: 50,
    },
  ];
  MICRO_LIST.forEach((a, b) => {
    a.objectHash &&
      a.objectPosition &&
      a.objectRotation &&
      mp.objects.new(mp.game.joaat(a.objectHash), a.objectPosition, {
        rotation: a.objectRotation,
      }),
      new global.TriggerColshape(
        a.position,
        0,
        a.microRange,
        () => {
          global.actionAntiFlood("server_voicechat_micro_use", 5e3) &&
            mp.events.callRemote("server_voicechat_micro_use", b),
            global.discordUpdate(
              "\u0423 \u043C\u0438\u043A\u0440\u043E\u0444\u043E\u043D\u0430"
            );
        },
        () => {
          global.actionAntiFlood("server_voicechat_micro_use", 5e3),
            mp.events.callRemote("server_voicechat_reloadRange"),
            global.discordUpdate();
        }
      );
  });
}
