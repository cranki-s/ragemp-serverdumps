!(function (e) {
  var t = {};
  function a(i) {
    if (t[i]) return t[i].exports;
    var o = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(o.exports, o, o.exports, a), (o.l = !0), o.exports;
  }
  (a.m = e),
    (a.c = t),
    (a.d = function (e, t, i) {
      a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (a.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.t = function (e, t) {
      if ((1 & t && (e = a(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (a.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          a.d(
            i,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return i;
    }),
    (a.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return a.d(t, "a", t), t;
    }),
    (a.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (a.p = ""),
    a((a.s = 87));
})([
  ,
  ,
  function (e, t, a) {
    "use strict";
    a.r(t),
      a.d(t, "talkType", function () {
        return p;
      }),
      a.d(t, "stopTalkVoice", function () {
        return _;
      }),
      a.d(t, "stopTalkRadio", function () {
        return h;
      });
    let i = null,
      o = 1;
    const r = ["trucker", "cashCollector"];
    let l = !1,
      n = "default";
    const s = ["phone", "fishingStart"];
    let p = !1;
    function m(e) {
      switch (e) {
        case "default":
          return 1.35;
        case "whisper":
          return 0.675;
        case "shout":
          return 2.7;
        case "rupor":
          return 8.1;
        case "radio":
        default:
          return 1.35;
      }
    }
    function d(e) {
      switch (e) {
        case "default":
          return 5;
        case "whisper":
          return 2;
        case "shout":
          return 20;
        case "rupor":
          return 50;
        case "radio":
          return 5;
        default:
          return 10;
      }
    }
    function c(e) {
      const t = `storage.setMicType("${e}");`;
      misc.injectCef(t);
    }
    function _() {
      !0 !== mp.voiceChat.muted &&
        "radio" !== p &&
        ((mp.voiceChat.muted = !0),
        (p = !1),
        misc.setVoiceState(!1),
        mp.events.callRemote("sPlayerSetTalking", !1));
    }
    function u() {
      if (
        !mp.game.ui.isPauseMenuActive() &&
        !blocked.control &&
        !localplayer.getVariable("animation") &&
        (localplayer.getVariable("factionID") ||
          r.includes(localplayer.getVariable("job"))) &&
        !localplayer.getVariable("tied") &&
        !mp.gui.cursor.visible &&
        "none" === pageGlobal
      ) {
        if (localplayer.inPrison)
          return misc.notif(
            "Вы не можете пользоваться рацией в тюрьме",
            "error"
          );
        if (localplayer.getVariable("mute"))
          return misc.notif(
            `Голосовой и текстовый чат заблокированы на ${localplayer.getVariable(
              "mute"
            )} мин.`,
            "error"
          );
        if ("voice" !== p) {
          if (
            l ||
            (setTimeout(() => {
              l = !1;
            }, 2e3),
            (l = !0),
            0)
          )
            return misc.notif("Подождите пару секунд", "info");
          (mp.voiceChat.muted = !1),
            (p = "radio"),
            c("radio"),
            misc.setVoiceState(!0),
            mp.events.callRemote(
              "sPlayerTalkRadio",
              !0,
              mp.game.player.isFreeAiming()
            );
        }
      }
    }
    function h() {
      blocked.control ||
        ((localplayer.getVariable("factionID") ||
          r.includes(localplayer.getVariable("job"))) &&
          (localplayer.getVariable("tied") ||
            (!0 !== mp.voiceChat.muted &&
              "voice" !== p &&
              ((mp.voiceChat.muted = !0),
              (p = !1),
              c(n),
              misc.setVoiceState(!1),
              mp.events.callRemote(
                "sPlayerTalkRadio",
                !1,
                mp.game.player.isFreeAiming()
              )))));
    }
    mp.keys.bind(78, !0, function () {
      !(function () {
        if (
          !mp.game.ui.isPauseMenuActive() &&
          !blocked.showCursor &&
          ("none" === pageGlobal || s.includes(pageGlobal))
        )
          localplayer.getVariable("mute")
            ? misc.notif(
                `Голосовой и текстовый чат заблокированы на ${localplayer.getVariable(
                  "mute"
                )} мин.`,
                "error"
              )
            : !1 !== mp.voiceChat.muted &&
              "radio" !== p &&
              ((mp.voiceChat.muted = !1),
              (p = "voice"),
              misc.setVoiceState(!0),
              mp.events.callRemote("sPlayerSetTalking", !0));
      })();
    }),
      mp.keys.bind(78, !1, function () {
        _();
      }),
      mp.keys.bind(20, !0, function () {
        u();
      }),
      mp.keys.bind(20, !1, function () {
        h();
      });
    let y = {
      listeners: [],
      radioListeners: [],
      add: function (e, t) {
        this.listeners.push(e),
          (e.isListening = !0),
          mp.events.callRemote("add_voice_listener", e),
          (e.voiceVolume = t),
          (e.voice3d = !0);
      },
      remove: function (e, t) {
        let a = this.listeners.indexOf(e);
        -1 !== a && this.listeners.splice(a, 1),
          (e.isListening = !1),
          t && mp.events.callRemote("remove_voice_listener", e);
      },
      updateRadioVolume: function () {
        this.radioListeners.forEach((e) => {
          const t = mp.players.atRemoteId(e);
          t && (t.voiceVolume = o);
        });
      },
    };
    mp.events.add({
      playerQuit: (e) => {
        e.isListening && y.remove(e, !1);
      },
      cVoiceSetRadioFreq: (e, t = !1) => {
        "number" == typeof e && (e = parseFloat(e.toFixed(1))), (i = e);
        const a = `storage.setSelectRadioChannel('${JSON.stringify(e)}');`;
        misc.injectCef(a),
          t &&
            ((y.radioListeners = y.radioListeners.concat(t)),
            y.updateRadioVolume());
      },
      cVoicePlayRadioOn: () => {
        mp.game.audio.playSoundFrontend(1, "Start_Squelch", "CB_RADIO_SFX", !0);
      },
      cVoicePlayRadioOff: () => {
        mp.game.audio.playSoundFrontend(1, "End_Squelch", "CB_RADIO_SFX", !0);
      },
      cVoiceSetRadioListeners: (e) => {
        (y.radioListeners = y.radioListeners.concat(e)), y.updateRadioVolume();
      },
      cVoiceAddRadioListener: (e, t = !1, a = !1, i = !1) => {
        if ((y.radioListeners.push(e), y.updateRadioVolume(), t)) {
          "number" == typeof t && (t = parseFloat(t.toFixed(1)));
          const e = { freq: t, playerData: { name: i, guid: a } },
            o = `storage.addPlayerToChannel(${JSON.stringify(e)});`;
          misc.injectCef(o);
        }
      },
      cVoiceRemoveRadioListener: (e, t = !1, a = !1) => {
        const i = y.radioListeners.findIndex((t) => t === e);
        if (
          (-1 !== i && (y.radioListeners.splice(i, 1), y.updateRadioVolume()),
          t)
        ) {
          "number" == typeof t && (t = parseFloat(t.toFixed(1)));
          const e = `storage.removePlayerFromRadioChList(${JSON.stringify({
            freq: t,
            playerGuid: a,
          })});`;
          misc.injectCef(e);
        }
      },
      cVoiceRemoveRadioListenersList: (e) => {
        (y.radioListeners = y.radioListeners.filter((t) => !e.includes(t))),
          y.updateRadioVolume();
      },
      cVoiceChangeRadioVolume: () => {
        (o = 0.5 === o ? m("radio") : 0.5),
          y.updateRadioVolume(),
          misc.notif(`Громкость рации изменена на ${o}`);
      },
      cVoiceReload: () => {
        mp.voiceChat.cleanupAndReload(!0, !0, !0),
          misc.notif("Войсчат перезагружен!");
      },
      cVoiceRemoveListener: (e) => {
        e && y.remove(e, !1);
      },
      cVoiceChangeMicType: (e, t) => {
        e !== t &&
          (mp.events.callRemote("sPlayer-ChangeMicType", e, t), (n = t));
      },
      cVoiceRemoveListeners: (e) => {
        e.forEach((e) => {
          const t = mp.players.atRemoteId(e);
          t && y.remove(t, !1);
        });
      },
    }),
      setInterval(() => {
        let e = mp.players.local,
          t = e.position;
        const a = localplayer.getVariable("ADMIN");
        mp.players.forEachInStreamRange((i) => {
          if (i != e && !i.isListening) {
            const e = i.position;
            let o = mp.game.system.vdist(e.x, e.y, e.z, t.x, t.y, t.z);
            const r = i.getVariable("micType");
            let l = d(r);
            if ((a && (l *= 2), "radio" !== r && o <= l)) {
              const e = m(r) * (1 - o / l);
              y.add(i, e);
            }
          }
        }),
          y.listeners.forEach((e) => {
            if (mp.players.exists(e) && 0 !== e.handle) {
              const i = e.position;
              let o = mp.game.system.vdist(i.x, i.y, i.z, t.x, t.y, t.z);
              const r = e.getVariable("micType"),
                l = m(r);
              let n = d(r);
              a && (n *= 2),
                "radio" !== r &&
                  (o > n ? y.remove(e, !0) : (e.voiceVolume = l * (1 - o / n)));
            } else y.remove(e, !0);
          });
      }, 500);
  },
  function (e) {
    e.exports = {
      govCarSteal: 5e3,
      eliteCarSteal: 4e3,
      houseBreakIn: 4e3,
      capture: 8e3,
      stanleyBeer: 2e3,
      farm: 5e3,
      butcher: 5e3,
      electric: 1e4,
      guitar: 1e4,
      bus: 15e3,
      trucker: 1e4,
      stash: 1e4,
    };
  },
  function (e) {
    e.exports = { material: 15, product: 1.5, fuel: 1.5 };
  },
  ,
  function (e) {
    e.exports = {
      355: { x: 1525.48486328125, y: 2237.800537109375, z: 75.08098602294922 },
      356: {
        x: -270.14874267578125,
        y: 2194.381591796875,
        z: 129.79324340820312,
      },
      357: { x: 3696.390380859375, y: 4563.384765625, z: 25.175600051879883 },
    };
  },
  function (e, t) {
    const a = [
        {
          hash: 520341586,
          position: new mp.Vector3(
            -13.779294967651367,
            -1441.2066650390625,
            31.609304428100586
          ),
        },
        {
          hash: 520341586,
          position: new mp.Vector3(
            -13.901871681213379,
            -1441.207763671875,
            31.630046844482422
          ),
        },
        {
          hash: 520341586,
          position: new mp.Vector3(
            -13.852737426757812,
            -1440.789306640625,
            31.4039306640625
          ),
        },
        {
          hash: -1663022887,
          position: new mp.Vector3(
            151.28964233398438,
            -1008.3143920898438,
            -98.6419677734375
          ),
        },
      ],
      i = [
        {
          hash: 993120320,
          position: new mp.Vector3(
            -564.08251953125,
            276.4896240234375,
            83.37577819824219
          ),
        },
        {
          hash: -8873588,
          position: new mp.Vector3(
            -1314.2410888671875,
            -391.18353271484375,
            36.74699401855469
          ),
        },
        {
          hash: 97297972,
          position: new mp.Vector3(
            -1313.8489990234375,
            -389.2601623535156,
            36.910518646240234
          ),
        },
        {
          hash: -1152174184,
          position: new mp.Vector3(
            312.825927734375,
            -275.4586486816406,
            53.691078186035156
          ),
        },
        {
          hash: 73386408,
          position: new mp.Vector3(
            315.9474792480469,
            -276.35638427734375,
            54.16495132446289
          ),
        },
        {
          hash: -550347177,
          position: new mp.Vector3(-356.0905, -134.7714, 40.01295),
        },
        {
          hash: -822900180,
          position: new mp.Vector3(
            1183.4539794921875,
            2645.36376953125,
            40.39774703979492
          ),
        },
        {
          hash: -822900180,
          position: new mp.Vector3(
            1173.6146240234375,
            2645.650390625,
            40.384521484375
          ),
        },
        {
          hash: -822900180,
          position: new mp.Vector3(
            109.80499267578125,
            6618.66064453125,
            34.435951232910156
          ),
        },
        {
          hash: -822900180,
          position: new mp.Vector3(
            115.0943603515625,
            6623.8916015625,
            34.435970306396484
          ),
        },
        {
          hash: -353187150,
          position: new mp.Vector3(
            -111.4572525024414,
            6463.86181640625,
            32.12440490722656
          ),
        },
        {
          hash: -1666470363,
          position: new mp.Vector3(
            -110.58831787109375,
            6462.88330078125,
            31.727453231811523
          ),
        },
        {
          hash: -1148826190,
          position: new mp.Vector3(
            82.4142074584961,
            -1392.1756591796875,
            29.384014129638672
          ),
        },
        {
          hash: 868499217,
          position: new mp.Vector3(
            82.4142074584961,
            -1392.1756591796875,
            29.384014129638672
          ),
        },
        {
          hash: -1081024910,
          position: new mp.Vector3(
            3627.022705078125,
            3747.2646484375,
            28.74152183532715
          ),
        },
        {
          hash: -1081024910,
          position: new mp.Vector3(
            3621.065185546875,
            3751.42333984375,
            28.945493698120117
          ),
        },
        {
          hash: 270330101,
          position: new mp.Vector3(
            722.5379638671875,
            -1087.4029541015625,
            22.9383544921875
          ),
        },
        {
          hash: 993120320,
          position: new mp.Vector3(
            -562.2612915039062,
            293.63983154296875,
            87.95886993408203
          ),
        },
        {
          hash: -190780785,
          position: new mp.Vector3(
            484.9077453613281,
            -1315.261474609375,
            29.897281646728516
          ),
        },
        {
          hash: -550347177,
          position: new mp.Vector3(
            -1145.02783203125,
            -1991.69970703125,
            15.98688793182373
          ),
        },
      ],
      o = function () {
        a.forEach((e) => {
          mp.game.object.doorControl(
            e.hash,
            e.position.x,
            e.position.y,
            e.position.z,
            !0,
            0,
            0,
            0
          );
        });
      };
    o();
    const r = function () {
      i.forEach((e) => {
        mp.game.object.doorControl(
          e.hash,
          e.position.x,
          e.position.y,
          e.position.z,
          !1,
          0,
          0,
          0
        );
      });
    };
    e.exports.openDoors = r;
    i.forEach((e) => {
      mp.colshapes.newSphere(
        e.position.x,
        e.position.y,
        e.position.z,
        50
      ).openDoors = !0;
    }),
      r();
    const l = [
      {
        id: 1,
        position: new mp.Vector3(
          435.0143127441406,
          -981.9755859375,
          30.689334869384766
        ),
        data: [
          {
            hash: -1215222675,
            position: new mp.Vector3(434.7479, -980.6184, 30.83926),
          },
          {
            hash: 320433149,
            position: new mp.Vector3(434.7479, -983.2151, 30.83926),
          },
        ],
      },
      {
        id: 22,
        position: new mp.Vector3(
          -447.9777526855469,
          6018.875,
          31.90480613708496
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -447.9777526855469,
              6018.875,
              31.90480613708496
            ),
          },
        ],
      },
      {
        id: 23,
        position: new mp.Vector3(
          -443.6649475097656,
          6016.0361328125,
          31.716459274291992
        ),
        data: [
          {
            hash: -1501157055,
            position: new mp.Vector3(
              -444.36614990234375,
              6016.98388671875,
              32.50379943847656
            ),
          },
          {
            hash: -1501157055,
            position: new mp.Vector3(
              -442.7488098144531,
              6015.34521484375,
              32.35576248168945
            ),
          },
        ],
      },
      {
        id: 24,
        position: new mp.Vector3(
          -453.5041198730469,
          6013.38232421875,
          31.78266143798828
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -453.5041198730469,
              6013.38232421875,
              31.78266143798828
            ),
          },
        ],
      },
      {
        id: 25,
        position: new mp.Vector3(
          -451.7629699707031,
          6006.935546875,
          31.89324378967285
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -451.7629699707031,
              6006.935546875,
              31.89324378967285
            ),
          },
        ],
      },
      {
        id: 26,
        position: new mp.Vector3(
          -446.3959045410156,
          6001.4951171875,
          31.78078269958496
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -446.3959045410156,
              6001.4951171875,
              31.78078269958496
            ),
          },
        ],
      },
      {
        id: 27,
        position: new mp.Vector3(
          -443.75689697265625,
          6004.17236328125,
          31.817296981811523
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -443.75689697265625,
              6004.17236328125,
              31.817296981811523
            ),
          },
        ],
      },
      {
        id: 28,
        position: new mp.Vector3(
          -436.83819580078125,
          5992.41845703125,
          31.779741287231445
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -436.83819580078125,
              5992.41845703125,
              31.779741287231445
            ),
          },
        ],
      },
      {
        id: 29,
        position: new mp.Vector3(
          -431.23065185546875,
          5997.6572265625,
          31.86527442932129
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -431.23065185546875,
              5997.6572265625,
              31.86527442932129
            ),
          },
        ],
      },
      {
        id: 30,
        position: new mp.Vector3(
          -452.0352478027344,
          6017.2939453125,
          31.792348861694336
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -452.0352478027344,
              6017.2939453125,
              31.792348861694336
            ),
          },
        ],
      },
      {
        id: 31,
        position: new mp.Vector3(
          -444.05401611328125,
          6009.8427734375,
          31.953590393066406
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -444.05401611328125,
              6009.8427734375,
              31.953590393066406
            ),
          },
        ],
      },
      {
        id: 32,
        position: new mp.Vector3(
          -439.4515075683594,
          6005.3896484375,
          31.77786636352539
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -439.4515075683594,
              6005.3896484375,
              31.77786636352539
            ),
          },
        ],
      },
      {
        id: 33,
        position: new mp.Vector3(
          -442.55010986328125,
          6009.74462890625,
          36.10676193237305
        ),
        data: [
          {
            hash: -1320876379,
            position: new mp.Vector3(
              -442.55010986328125,
              6009.74462890625,
              36.10676193237305
            ),
          },
        ],
      },
      {
        id: 37,
        position: new mp.Vector3(
          -2342.8408203125,
          3266.484375,
          32.89669418334961
        ),
        data: [
          {
            hash: -1421582160,
            position: new mp.Vector3(
              -2343.342529296875,
              3265.61181640625,
              33.2033576965332
            ),
          },
          {
            hash: 1248599813,
            position: new mp.Vector3(
              -2342.335693359375,
              3267.3466796875,
              33.00590896606445
            ),
          },
        ],
      },
      {
        id: 39,
        position: new mp.Vector3(
          -2352.735107421875,
          3252.114013671875,
          32.92639923095703
        ),
        data: [
          {
            hash: -1207991715,
            position: new mp.Vector3(
              -2352.735107421875,
              3252.114013671875,
              32.92639923095703
            ),
          },
        ],
      },
      {
        id: 40,
        position: new mp.Vector3(
          106.00880432128906,
          -744.6386108398438,
          45.99869155883789
        ),
        data: [
          {
            hash: -1517873911,
            position: new mp.Vector3(
              106.36996459960938,
              -742.7603149414062,
              46.221744537353516
            ),
          },
          {
            hash: -90456267,
            position: new mp.Vector3(
              105.7670669555664,
              -746.5789794921875,
              46.2451057434082
            ),
          },
        ],
      },
      {
        id: 41,
        position: new mp.Vector3(
          126.7102279663086,
          -760.0933227539062,
          45.82698059082031
        ),
        data: [
          {
            hash: -2051651622,
            position: new mp.Vector3(
              126.7102279663086,
              -760.0933227539062,
              45.82698059082031
            ),
          },
        ],
      },
      {
        id: 42,
        position: new mp.Vector3(
          138.80752563476562,
          -767.8651123046875,
          242.15206909179688
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              138.80752563476562,
              -767.8651123046875,
              242.15206909179688
            ),
          },
        ],
      },
      {
        id: 43,
        position: new mp.Vector3(
          143.5433807373047,
          -759.7965698242188,
          242.15196228027344
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              143.5433807373047,
              -759.7965698242188,
              242.15196228027344
            ),
          },
        ],
      },
      {
        id: 44,
        position: new mp.Vector3(
          127.56617736816406,
          -763.7207641601562,
          242.15200805664062
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              127.56617736816406,
              -763.7207641601562,
              242.15200805664062
            ),
          },
        ],
      },
      {
        id: 45,
        position: new mp.Vector3(
          120.94905853271484,
          -756.742919921875,
          242.15213012695312
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              120.94905853271484,
              -756.742919921875,
              242.15213012695312
            ),
          },
        ],
      },
      {
        id: 46,
        position: new mp.Vector3(
          119.32878112792969,
          -733.9803466796875,
          242.1519775390625
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              119.32878112792969,
              -733.9803466796875,
              242.1519775390625
            ),
          },
        ],
      },
      {
        id: 47,
        position: new mp.Vector3(
          113.65233612060547,
          -738.6679077148438,
          242.15206909179688
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              113.65233612060547,
              -738.6679077148438,
              242.15206909179688
            ),
          },
        ],
      },
      {
        id: 48,
        position: new mp.Vector3(
          120.39527893066406,
          -763.4996948242188,
          242.152099609375
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              120.39527893066406,
              -763.4996948242188,
              242.152099609375
            ),
          },
        ],
      },
      {
        id: 49,
        position: new mp.Vector3(
          114.75968170166016,
          -758.2683715820312,
          242.1522979736328
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              114.75968170166016,
              -758.2683715820312,
              242.1522979736328
            ),
          },
        ],
      },
      {
        id: 50,
        position: new mp.Vector3(
          117.89409637451172,
          -735.8092041015625,
          258.2520751953125
        ),
        data: [
          {
            hash: -2051651622,
            position: new mp.Vector3(
              117.27532196044922,
              -735.5836791992188,
              258.6148681640625
            ),
          },
          {
            hash: -2051651622,
            position: new mp.Vector3(
              118.70002746582031,
              -736.101806640625,
              258.34246826171875
            ),
          },
        ],
      },
      {
        id: 51,
        position: new mp.Vector3(
          119.57914733886719,
          -750.2403564453125,
          258.23101806640625
        ),
        data: [
          {
            hash: -2051651622,
            position: new mp.Vector3(
              119.57914733886719,
              -750.2403564453125,
              258.23101806640625
            ),
          },
        ],
      },
      {
        id: 52,
        position: new mp.Vector3(
          139.99893188476562,
          -757.6725463867188,
          258.2475280761719
        ),
        data: [
          {
            hash: -2051651622,
            position: new mp.Vector3(
              139.99893188476562,
              -757.6725463867188,
              258.2475280761719
            ),
          },
        ],
      },
      {
        id: 53,
        position: new mp.Vector3(
          152.43853759765625,
          -748.3972778320312,
          258.2571105957031
        ),
        data: [
          {
            hash: -2051651622,
            position: new mp.Vector3(
              152.43853759765625,
              -748.3972778320312,
              258.2571105957031
            ),
          },
        ],
      },
      {
        id: 54,
        position: new mp.Vector3(
          131.99038696289062,
          -740.953369140625,
          258.2154541015625
        ),
        data: [
          {
            hash: -2051651622,
            position: new mp.Vector3(
              131.99038696289062,
              -740.953369140625,
              258.2154541015625
            ),
          },
        ],
      },
      {
        id: 55,
        position: new mp.Vector3(
          84.78569030761719,
          -1959.85498046875,
          21.28127098083496
        ),
        data: [
          {
            hash: 520341586,
            position: new mp.Vector3(
              84.78569030761719,
              -1959.85498046875,
              21.28127098083496
            ),
          },
        ],
      },
      {
        id: 56,
        position: new mp.Vector3(
          82.62135314941406,
          -1966.3619384765625,
          21.05970573425293
        ),
        data: [
          {
            hash: -1033001619,
            position: new mp.Vector3(
              82.62135314941406,
              -1966.3619384765625,
              21.05970573425293
            ),
          },
        ],
      },
      {
        id: 57,
        position: new mp.Vector3(
          75.60932922363281,
          -1969.4478759765625,
          21.228864669799805
        ),
        data: [
          {
            hash: -1892241949,
            position: new mp.Vector3(
              75.60932922363281,
              -1969.4478759765625,
              21.228864669799805
            ),
          },
        ],
      },
      {
        id: 58,
        position: new mp.Vector3(
          76.05323028564453,
          -1968.2701416015625,
          21.40958595275879
        ),
        data: [
          {
            hash: -610054759,
            position: new mp.Vector3(
              76.05323028564453,
              -1968.2701416015625,
              21.40958595275879
            ),
          },
        ],
      },
      {
        id: 59,
        position: new mp.Vector3(
          83.72343444824219,
          -1966.8797607421875,
          21.1080322265625
        ),
        data: [
          {
            hash: -1892241949,
            position: new mp.Vector3(
              83.72343444824219,
              -1966.8797607421875,
              21.1080322265625
            ),
          },
        ],
      },
      {
        id: 60,
        position: new mp.Vector3(
          -112.46720123291016,
          -1480.029296875,
          34.0631217956543
        ),
        data: [
          {
            hash: -1644341628,
            position: new mp.Vector3(
              -112.46720123291016,
              -1480.029296875,
              34.0631217956543
            ),
          },
        ],
      },
      {
        id: 61,
        position: new mp.Vector3(
          -107.94973754882812,
          -1485.75927734375,
          34.06718826293945
        ),
        data: [
          {
            hash: -610054759,
            position: new mp.Vector3(
              -107.94973754882812,
              -1485.75927734375,
              34.06718826293945
            ),
          },
        ],
      },
      {
        id: 62,
        position: new mp.Vector3(
          -114.57757568359375,
          -1489.8984375,
          34.026084899902344
        ),
        data: [
          {
            hash: -1033001619,
            position: new mp.Vector3(
              -114.57757568359375,
              -1489.8984375,
              34.026084899902344
            ),
          },
        ],
      },
      {
        id: 63,
        position: new mp.Vector3(
          336.5184631347656,
          -2010.8719482421875,
          22.548564910888672
        ),
        data: [
          {
            hash: -1099854646,
            position: new mp.Vector3(
              336.5184631347656,
              -2010.8719482421875,
              22.548564910888672
            ),
          },
        ],
      },
      {
        id: 64,
        position: new mp.Vector3(
          334.9129943847656,
          -2012.888427734375,
          22.603519439697266
        ),
        data: [
          {
            hash: -610054759,
            position: new mp.Vector3(
              334.9129943847656,
              -2012.888427734375,
              22.603519439697266
            ),
          },
        ],
      },
      {
        id: 65,
        position: new mp.Vector3(
          337.8428039550781,
          -2016.131103515625,
          22.59052085876465
        ),
        data: [
          {
            hash: -1033001619,
            position: new mp.Vector3(
              337.8428039550781,
              -2016.131103515625,
              22.59052085876465
            ),
          },
        ],
      },
      {
        id: 66,
        position: new mp.Vector3(
          336.7072448730469,
          -2021.4873046875,
          22.543296813964844
        ),
        data: [
          {
            hash: -1099854646,
            position: new mp.Vector3(
              336.7072448730469,
              -2021.4873046875,
              22.543296813964844
            ),
          },
        ],
      },
      {
        id: 67,
        position: new mp.Vector3(
          -135.35891723632812,
          972.5799560546875,
          235.8836669921875
        ),
        data: [
          {
            hash: 546378757,
            position: new mp.Vector3(
              -137.10916137695312,
              973.1934814453125,
              235.82199096679688
            ),
          },
          {
            hash: -1249591818,
            position: new mp.Vector3(
              -133.1954803466797,
              971.8186645507812,
              235.7858123779297
            ),
          },
        ],
      },
      {
        id: 68,
        position: new mp.Vector3(
          -112.80000305175781,
          986.7312622070312,
          236.09915161132812
        ),
        data: [
          {
            hash: -1881581701,
            position: new mp.Vector3(
              -112.80000305175781,
              986.7312622070312,
              236.09915161132812
            ),
          },
        ],
      },
      {
        id: 69,
        position: new mp.Vector3(
          -110.95895385742188,
          989.8605346679688,
          235.90994262695312
        ),
        data: [
          {
            hash: 9006550,
            position: new mp.Vector3(
              -110.95895385742188,
              989.8605346679688,
              235.90994262695312
            ),
          },
        ],
      },
      {
        id: 70,
        position: new mp.Vector3(
          -107.72740936279297,
          989.5263061523438,
          235.9019317626953
        ),
        data: [
          {
            hash: 9006550,
            position: new mp.Vector3(
              -107.72740936279297,
              989.5263061523438,
              235.9019317626953
            ),
          },
        ],
      },
      {
        id: 71,
        position: new mp.Vector3(
          -105.64081573486328,
          983.62109375,
          235.964111328125
        ),
        data: [
          {
            hash: 9006550,
            position: new mp.Vector3(
              -105.64081573486328,
              983.62109375,
              235.964111328125
            ),
          },
        ],
      },
      {
        id: 72,
        position: new mp.Vector3(
          -107.98265838623047,
          984.0883178710938,
          235.94285583496094
        ),
        data: [
          {
            hash: 9006550,
            position: new mp.Vector3(
              -107.98265838623047,
              984.0883178710938,
              235.94285583496094
            ),
          },
        ],
      },
      {
        id: 73,
        position: new mp.Vector3(
          1395.8721923828125,
          1141.793212890625,
          114.80254364013672
        ),
        data: [
          {
            hash: 1504256620,
            position: new mp.Vector3(
              1395.8729248046875,
              1142.6251220703125,
              114.93639373779297
            ),
          },
          {
            hash: 262671971,
            position: new mp.Vector3(
              1395.8709716796875,
              1140.909423828125,
              114.79459381103516
            ),
          },
        ],
      },
      {
        id: 74,
        position: new mp.Vector3(
          1390.5738525390625,
          1132.1578369140625,
          114.3340072631836
        ),
        data: [
          {
            hash: -1032171637,
            position: new mp.Vector3(
              1390.5794677734375,
              1131.7364501953125,
              114.33393859863281
            ),
          },
          {
            hash: -52575179,
            position: new mp.Vector3(
              1390.718994140625,
              1132.693359375,
              114.3336181640625
            ),
          },
        ],
      },
      {
        id: 75,
        position: new mp.Vector3(
          1400.4161376953125,
          1128.0213623046875,
          114.33448791503906
        ),
        data: [
          {
            hash: -1032171637,
            position: new mp.Vector3(
              1401.33203125,
              1128.296630859375,
              114.33438110351562
            ),
          },
          {
            hash: -52575179,
            position: new mp.Vector3(
              1399.660400390625,
              1128.3001708984375,
              114.3343734741211
            ),
          },
        ],
      },
      {
        id: 76,
        position: new mp.Vector3(
          1409.3612060546875,
          1147.322265625,
          114.33364868164062
        ),
        data: [
          {
            hash: -1032171637,
            position: new mp.Vector3(
              1409.3587646484375,
              1146.66943359375,
              114.33363342285156
            ),
          },
          {
            hash: -52575179,
            position: new mp.Vector3(
              1409.1734619140625,
              1148.123779296875,
              114.3336410522461
            ),
          },
        ],
      },
      {
        id: 77,
        position: new mp.Vector3(
          1390.38232421875,
          1162.2957763671875,
          114.33280944824219
        ),
        data: [
          {
            hash: -1032171637,
            position: new mp.Vector3(
              1390.53564453125,
              1161.8426513671875,
              114.36929321289062
            ),
          },
          {
            hash: -52575179,
            position: new mp.Vector3(
              1390.5567626953125,
              1162.8896484375,
              114.37091827392578
            ),
          },
        ],
      },
      {
        id: 78,
        position: new mp.Vector3(
          1408.6397705078125,
          1164.6602783203125,
          114.33418273925781
        ),
        data: [
          {
            hash: -1032171637,
            position: new mp.Vector3(
              1408.57958984375,
              1165.2850341796875,
              114.33418273925781
            ),
          },
          {
            hash: -52575179,
            position: new mp.Vector3(
              1408.45556640625,
              1164.2716064453125,
              114.33418273925781
            ),
          },
        ],
      },
      {
        id: 79,
        position: new mp.Vector3(
          1408.54541015625,
          1160.0238037109375,
          114.33405303955078
        ),
        data: [
          {
            hash: -1032171637,
            position: new mp.Vector3(
              1408.6297607421875,
              1160.6151123046875,
              114.33404541015625
            ),
          },
          {
            hash: -52575179,
            position: new mp.Vector3(
              1408.77490234375,
              1159.5697021484375,
              114.33417510986328
            ),
          },
        ],
      },
      {
        id: 80,
        position: new mp.Vector3(
          1397.11572265625,
          1163.5419921875,
          114.5058822631836
        ),
        data: [
          {
            hash: 736699661,
            position: new mp.Vector3(
              1397.11572265625,
              1163.5419921875,
              114.5058822631836
            ),
          },
        ],
      },
      {
        id: 81,
        position: new mp.Vector3(
          1400.9508056640625,
          1160.1456298828125,
          114.4361801147461
        ),
        data: [
          {
            hash: 736699661,
            position: new mp.Vector3(
              1400.9508056640625,
              1160.1456298828125,
              114.4361801147461
            ),
          },
        ],
      },
      {
        id: 82,
        position: new mp.Vector3(
          1398.007568359375,
          1157.4466552734375,
          114.45426177978516
        ),
        data: [
          {
            hash: 736699661,
            position: new mp.Vector3(
              1398.007568359375,
              1157.4466552734375,
              114.45426177978516
            ),
          },
        ],
      },
      {
        id: 83,
        position: new mp.Vector3(
          741.4423217773438,
          4171.52734375,
          41.384002685546875
        ),
        data: [
          {
            hash: 307471888,
            position: new mp.Vector3(
              741.4423217773438,
              4171.52734375,
              41.384002685546875
            ),
          },
        ],
      },
      {
        id: 84,
        position: new mp.Vector3(
          745.2177734375,
          4173.66943359375,
          41.3493766784668
        ),
        data: [
          {
            hash: -1033001619,
            position: new mp.Vector3(
              745.2177734375,
              4173.66943359375,
              41.3493766784668
            ),
          },
        ],
      },
      {
        id: 85,
        position: new mp.Vector3(
          747.8886108398438,
          4174.3037109375,
          41.44828414916992
        ),
        data: [
          {
            hash: -610054759,
            position: new mp.Vector3(
              747.8886108398438,
              4174.3037109375,
              41.44828414916992
            ),
          },
        ],
      },
      {
        id: 86,
        position: new mp.Vector3(
          747.8948974609375,
          4179.97509765625,
          41.44353103637695
        ),
        data: [
          {
            hash: -610054759,
            position: new mp.Vector3(
              747.8948974609375,
              4179.97509765625,
              41.44353103637695
            ),
          },
        ],
      },
      {
        id: 87,
        position: new mp.Vector3(
          750.2916259765625,
          4183.5380859375,
          41.3175048828125
        ),
        data: [
          {
            hash: 237608380,
            position: new mp.Vector3(
              750.2916259765625,
              4183.5380859375,
              41.3175048828125
            ),
          },
        ],
      },
      {
        id: 88,
        position: new mp.Vector3(
          982.0655517578125,
          -102.48029327392578,
          75.03099060058594
        ),
        data: [
          {
            hash: 190770132,
            position: new mp.Vector3(
              982.0655517578125,
              -102.48029327392578,
              75.03099060058594
            ),
          },
        ],
      },
      {
        id: 89,
        position: new mp.Vector3(
          984.7926635742188,
          -94.35023498535156,
          74.93407440185547
        ),
        data: [
          {
            hash: 747286790,
            position: new mp.Vector3(
              984.7926635742188,
              -94.35023498535156,
              74.93407440185547
            ),
          },
        ],
      },
      {
        id: 90,
        position: new mp.Vector3(
          980.8107299804688,
          -96.60323333740234,
          74.94790649414062
        ),
        data: [
          {
            hash: 747286790,
            position: new mp.Vector3(
              980.8107299804688,
              -96.60323333740234,
              74.94790649414062
            ),
          },
        ],
      },
      {
        id: 91,
        position: new mp.Vector3(
          1987.6085205078125,
          3053.444091796875,
          47.233158111572266
        ),
        data: [
          {
            hash: 479144380,
            position: new mp.Vector3(
              1987.6085205078125,
              3053.444091796875,
              47.233158111572266
            ),
          },
        ],
      },
      {
        id: 92,
        position: new mp.Vector3(
          304.01068115234375,
          -581.9037475585938,
          43.533180236816406
        ),
        data: [
          {
            hash: -1700911976,
            position: new mp.Vector3(
              304.9654846191406,
              -582.2512817382812,
              43.72080993652344
            ),
          },
          {
            hash: -434783486,
            position: new mp.Vector3(
              303.1187744140625,
              -581.580322265625,
              43.75771713256836
            ),
          },
        ],
      },
      {
        id: 93,
        position: new mp.Vector3(
          325.46795654296875,
          -589.7142333984375,
          43.442630767822266
        ),
        data: [
          {
            hash: -1700911976,
            position: new mp.Vector3(
              326.24249267578125,
              -589.9957885742188,
              43.663516998291016
            ),
          },
          {
            hash: -434783486,
            position: new mp.Vector3(
              324.52728271484375,
              -589.368896484375,
              43.785614013671875
            ),
          },
        ],
      },
      {
        id: 94,
        position: new mp.Vector3(
          327.6665344238281,
          -593.9646606445312,
          43.45995330810547
        ),
        data: [
          {
            hash: -434783486,
            position: new mp.Vector3(
              327.9562683105469,
              -593.1648559570312,
              43.779056549072266
            ),
          },
          {
            hash: -1700911976,
            position: new mp.Vector3(
              327.34149169921875,
              -594.8612670898438,
              43.79523468017578
            ),
          },
        ],
      },
      {
        id: 95,
        position: new mp.Vector3(
          308.108154296875,
          -597.334228515625,
          43.47755813598633
        ),
        data: [
          {
            hash: 854291622,
            position: new mp.Vector3(
              308.108154296875,
              -597.334228515625,
              43.47755813598633
            ),
          },
        ],
      },
      {
        id: 96,
        position: new mp.Vector3(
          303.53289794921875,
          -597.7232055664062,
          43.47248077392578
        ),
        data: [
          {
            hash: 854291622,
            position: new mp.Vector3(
              303.53289794921875,
              -597.7232055664062,
              43.47248077392578
            ),
          },
        ],
      },
      {
        id: 97,
        position: new mp.Vector3(
          313.2367858886719,
          -571.83203125,
          43.433265686035156
        ),
        data: [
          {
            hash: -1700911976,
            position: new mp.Vector3(
              314.1359558105469,
              -572.1563720703125,
              43.5759162902832
            ),
          },
          {
            hash: -434783486,
            position: new mp.Vector3(
              312.52593994140625,
              -571.5647583007812,
              43.66428756713867
            ),
          },
        ],
      },
      {
        id: 98,
        position: new mp.Vector3(
          319.03515625,
          -573.9424438476562,
          43.35803985595703
        ),
        data: [
          {
            hash: -434783486,
            position: new mp.Vector3(
              318.8638610839844,
              -573.892578125,
              43.37922286987305
            ),
          },
          {
            hash: -1700911976,
            position: new mp.Vector3(
              319.6007385253906,
              -574.1444702148438,
              43.3363151550293
            ),
          },
        ],
      },
      {
        id: 99,
        position: new mp.Vector3(
          324.45074462890625,
          -575.9007568359375,
          43.342384338378906
        ),
        data: [
          {
            hash: -434783486,
            position: new mp.Vector3(
              323.6614990234375,
              -575.6179809570312,
              43.300716400146484
            ),
          },
          {
            hash: -1700911976,
            position: new mp.Vector3(
              325.10791015625,
              -576.1451416015625,
              43.29294204711914
            ),
          },
        ],
      },
      {
        id: 100,
        position: new mp.Vector3(
          326.06488037109375,
          -579.2478637695312,
          43.32323455810547
        ),
        data: [
          {
            hash: -434783486,
            position: new mp.Vector3(
              326.4139099121094,
              -578.3118286132812,
              43.55448913574219
            ),
          },
          {
            hash: -1700911976,
            position: new mp.Vector3(
              325.79156494140625,
              -580.0101928710938,
              43.58913040161133
            ),
          },
        ],
      },
      {
        id: 101,
        position: new mp.Vector3(
          317.26318359375,
          -578.7369995117188,
          43.39347839355469
        ),
        data: [
          {
            hash: -434783486,
            position: new mp.Vector3(
              318.2359924316406,
              -579.1011352539062,
              43.81560134887695
            ),
          },
          {
            hash: -1700911976,
            position: new mp.Vector3(
              316.5484313964844,
              -578.4815063476562,
              43.575191497802734
            ),
          },
        ],
      },
      {
        id: 102,
        position: new mp.Vector3(
          348.8364562988281,
          -587.5443115234375,
          43.41879653930664
        ),
        data: [
          {
            hash: -1700911976,
            position: new mp.Vector3(
              348.56243896484375,
              -588.2884521484375,
              43.66001510620117
            ),
          },
          {
            hash: -434783486,
            position: new mp.Vector3(
              349.13128662109375,
              -586.7180786132812,
              43.703468322753906
            ),
          },
        ],
      },
      {
        id: 103,
        position: new mp.Vector3(
          -597.9672241210938,
          -929.9871826171875,
          23.869056701660156
        ),
        data: [
          {
            hash: -1215222675,
            position: new mp.Vector3(
              -598.0453491210938,
              -930.6346435546875,
              23.86904525756836
            ),
          },
          {
            hash: -1215222675,
            position: new mp.Vector3(
              -597.9861450195312,
              -929.0934448242188,
              23.869050979614258
            ),
          },
        ],
      },
      {
        id: 104,
        position: new mp.Vector3(
          -585.9329833984375,
          -931.6798095703125,
          23.82103729248047
        ),
        data: [
          {
            hash: -538477509,
            position: new mp.Vector3(
              -585.9329833984375,
              -931.6798095703125,
              23.82103729248047
            ),
          },
        ],
      },
      {
        id: 105,
        position: new mp.Vector3(
          -587.9960327148438,
          -922.4141235351562,
          23.867494583129883
        ),
        data: [
          {
            hash: -538477509,
            position: new mp.Vector3(
              -587.07177734375,
              -921.9605712890625,
              23.867517471313477
            ),
          },
          {
            hash: -538477509,
            position: new mp.Vector3(
              -588.592529296875,
              -921.857666015625,
              24.086217880249023
            ),
          },
        ],
      },
      {
        id: 106,
        position: new mp.Vector3(
          -594.1682739257812,
          -923.2108154296875,
          14.388360977172852
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              -594.4230346679688,
              -922.3654174804688,
              14.38831901550293
            ),
          },
          {
            hash: -1821777087,
            position: new mp.Vector3(
              -594.2105712890625,
              -923.7403564453125,
              14.388360977172852
            ),
          },
        ],
      },
      {
        id: 107,
        position: new mp.Vector3(
          -592.2450561523438,
          -918.4506225585938,
          14.388350486755371
        ),
        data: [
          {
            hash: -1821777087,
            position: new mp.Vector3(
              -591.5733032226562,
              -918.4353637695312,
              14.388349533081055
            ),
          },
          {
            hash: -1821777087,
            position: new mp.Vector3(
              -592.9072265625,
              -918.5261840820312,
              14.388361930847168
            ),
          },
        ],
      },
      {
        id: 111,
        position: new mp.Vector3(
          1406.58349609375,
          1128.2047119140625,
          114.51174926757812
        ),
        data: [
          {
            hash: 1504256620,
            position: new mp.Vector3(
              1406.58349609375,
              1128.2047119140625,
              114.51174926757812
            ),
          },
        ],
      },
      {
        id: 112,
        position: new mp.Vector3(
          186.35565185546875,
          -725.4203491210938,
          34.1436882019043
        ),
        data: [
          {
            hash: 1975282749,
            position: new mp.Vector3(
              184.92880249023438,
              -724.89892578125,
              36.89704895019531
            ),
          },
        ],
      },
      {
        id: 113,
        position: new mp.Vector3(
          -541.4270629882812,
          -187.74008178710938,
          38.3087043762207
        ),
        data: [
          {
            hash: 736699661,
            position: new mp.Vector3(
              -541.5798950195312,
              -187.49742126464844,
              38.587806701660156
            ),
          },
          {
            hash: 736699661,
            position: new mp.Vector3(
              -541.2750854492188,
              -187.98147583007812,
              38.75508499145508
            ),
          },
        ],
      },
      {
        id: 114,
        position: new mp.Vector3(
          -546.1137084960938,
          -183.17138671875,
          38.340606689453125
        ),
        data: [
          {
            hash: 736699661,
            position: new mp.Vector3(
              -546.1137084960938,
              -183.17138671875,
              38.340606689453125
            ),
          },
        ],
      },
      {
        id: 115,
        position: new mp.Vector3(
          -558.9110107421875,
          -202.88206481933594,
          38.35554504394531
        ),
        data: [
          {
            hash: 736699661,
            position: new mp.Vector3(
              -558.9110107421875,
              -202.88206481933594,
              38.35554504394531
            ),
          },
        ],
      },
      {
        id: 116,
        position: new mp.Vector3(
          -561.1751098632812,
          -198.94677734375,
          38.35630416870117
        ),
        data: [
          {
            hash: 736699661,
            position: new mp.Vector3(
              -560.8360595703125,
              -199.7477264404297,
              38.772544860839844
            ),
          },
          {
            hash: 736699661,
            position: new mp.Vector3(
              -561.5029296875,
              -198.58450317382812,
              38.426063537597656
            ),
          },
        ],
      },
      {
        id: 117,
        position: new mp.Vector3(
          -239.63217163085938,
          -1516.294189453125,
          33.84022521972656
        ),
        data: [
          {
            hash: 2049718375,
            position: new mp.Vector3(
              -239.63217163085938,
              -1516.294189453125,
              33.84022521972656
            ),
          },
          {
            hash: 216030657,
            position: new mp.Vector3(
              -239.7449493408203,
              -1516.2269287109375,
              33.84950256347656
            ),
          },
        ],
      },
      {
        id: 118,
        position: new mp.Vector3(
          -248.98605346679688,
          -1516.2332763671875,
          31.62818717956543
        ),
        data: [
          {
            hash: 1413743677,
            position: new mp.Vector3(
              -248.98605346679688,
              -1516.2332763671875,
              31.62818717956543
            ),
          },
        ],
      },
      {
        id: 119,
        position: new mp.Vector3(
          -251.67483520507812,
          -1529.9326171875,
          31.92293930053711
        ),
        data: [
          {
            hash: 1413187371,
            position: new mp.Vector3(
              -251.67483520507812,
              -1529.9326171875,
              31.92293930053711
            ),
          },
        ],
      },
      {
        id: 120,
        position: new mp.Vector3(
          441.1960754394531,
          -977.741943359375,
          30.756528854370117
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_door_04"),
            position: new mp.Vector3(440.5201, -977.6011, 30.82319),
          },
        ],
      },
      {
        id: 121,
        position: new mp.Vector3(
          441.3147277832031,
          -986.4171142578125,
          30.789939880371094
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_door_05"),
            position: new mp.Vector3(440.5201, -986.2335, 30.82319),
          },
        ],
      },
      {
        id: 122,
        position: new mp.Vector3(
          441.910888671875,
          -998.3399047851562,
          30.69180679321289
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_reception_entrancedoor"),
            position: new mp.Vector3(440.7392, -998.7462, 30.8153),
          },
          {
            hash: mp.game.joaat("gabz_mrpd_reception_entrancedoor"),
            position: new mp.Vector3(443.0618, -998.7462, 30.8153),
          },
        ],
      },
      {
        id: 123,
        position: new mp.Vector3(456.78857421875, -972.5029907226562, 30.81531),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_reception_entrancedoor"),
            position: new mp.Vector3(455.8862, -972.2543, 30.81531),
          },
          {
            hash: mp.game.joaat("gabz_mrpd_reception_entrancedoor"),
            position: new mp.Vector3(458.2087, -972.2543, 30.81531),
          },
        ],
      },
      {
        id: 124,
        position: new mp.Vector3(
          464.2438049316406,
          -975.2733154296875,
          26.356449127197266
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_room13_parkingdoor"),
            position: new mp.Vector3(464.1591, -974.6656, 26.3707),
          },
        ],
      },
      {
        id: 125,
        position: new mp.Vector3(
          464.0433349609375,
          -996.6879272460938,
          26.373889923095703
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_room13_parkingdoor"),
            position: new mp.Vector3(464.1566, -997.5093, 26.3707),
          },
        ],
      },
      {
        id: 126,
        position: new mp.Vector3(
          468.4014892578125,
          -1014.6380615234375,
          26.403837203979492
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_door_03"),
            position: new mp.Vector3(469.7743, -1014.406, 26.48382),
          },
          {
            hash: mp.game.joaat("gabz_mrpd_door_03"),
            position: new mp.Vector3(467.3686, -1014.406, 26.48382),
          },
        ],
      },
      {
        id: 127,
        position: new mp.Vector3(
          481.6732482910156,
          -1004.1083374023438,
          26.32303810119629
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_cells_door"),
            position: new mp.Vector3(481.0084, -1004.118, 26.48005),
          },
        ],
      },
      {
        id: 128,
        position: new mp.Vector3(
          485.0962219238281,
          -1007.5394897460938,
          26.27320671081543
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_cells_door"),
            position: new mp.Vector3(484.1764, -1007.734, 26.48005),
          },
        ],
      },
      {
        id: 129,
        position: new mp.Vector3(
          486.0464172363281,
          -1012.3546142578125,
          26.27320671081543
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_cells_door"),
            position: new mp.Vector3(486.9131, -1012.189, 26.48005),
          },
        ],
      },
      {
        id: 130,
        position: new mp.Vector3(
          483.220458984375,
          -1012.1373901367188,
          26.311010360717773
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_cells_door"),
            position: new mp.Vector3(483.9127, -1012.189, 26.48005),
          },
        ],
      },
      {
        id: 131,
        position: new mp.Vector3(
          480.1553039550781,
          -1012.1818237304688,
          26.323026657104492
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_cells_door"),
            position: new mp.Vector3(480.9128, -1012.189, 26.48005),
          },
        ],
      },
      {
        id: 132,
        position: new mp.Vector3(
          477.0704040527344,
          -1012.1563720703125,
          26.323020935058594
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_cells_door"),
            position: new mp.Vector3(477.9126, -1012.189, 26.48005),
          },
        ],
      },
      {
        id: 133,
        position: new mp.Vector3(
          476.5374450683594,
          -1008.3834228515625,
          26.306640625
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_cells_door"),
            position: new mp.Vector3(476.6157, -1008.875, 26.48005),
          },
        ],
      },
      {
        id: 134,
        position: new mp.Vector3(
          464.2780456542969,
          -983.7933349609375,
          43.77473831176758
        ),
        data: [
          {
            hash: mp.game.joaat("gabz_mrpd_door_03"),
            position: new mp.Vector3(464.3086, -984.5284, 43.77124),
          },
        ],
      },
    ];
    l.forEach(({ id: e, position: t }) => {
      mp.colshapes.newSphere(t.x, t.y, t.z, 10).loadDoors = e;
    }),
      mp.events.add({
        cDoorsLoadState: (e) => {
          o(),
            r(),
            e.forEach((e) => {
              const t = l.find((t) => t.id === e.id);
              t.position &&
                ((t.locked = e.locked),
                (t.label = mp.labels.new(
                  t.locked ? "~r~[ Закрыто ]" : "~g~[ Открыто ]",
                  t.position,
                  {
                    los: !1,
                    font: 0,
                    drawDistance: 3.5,
                    color: [255, 255, 255, 255],
                    dimension: 0,
                  }
                )),
                t.data.forEach((e) => {
                  mp.game.object.doorControl(
                    e.hash,
                    e.position.x,
                    e.position.y,
                    e.position.z,
                    t.locked,
                    0,
                    0,
                    0
                  );
                }));
            });
        },
        cDoorsChangeState: (e, t) => {
          const a = l.find((t) => t.id === e);
          (a.locked = t),
            a.label &&
              ((a.label.text = a.locked ? "~r~[ Закрыто ]" : "~g~[ Открыто ]"),
              a.data.forEach((e) => {
                mp.game.object.doorControl(
                  e.hash,
                  e.position.x,
                  e.position.y,
                  e.position.z,
                  a.locked,
                  0,
                  0,
                  0
                );
              }));
        },
        cDoorsUpdateState: (e, t) => {
          const a = l.find((t) => t.id === e);
          (a.locked = t),
            a.data.forEach((e) => {
              mp.game.object.doorControl(
                e.hash,
                e.position.x,
                e.position.y,
                e.position.z,
                a.locked,
                0,
                0,
                0
              );
            });
        },
      });
    t.tryToChangeDoorState = function () {
      if (
        !localplayer.getVariable("tied") &&
        !localplayer.getVariable("animation")
      )
        for (const e of l)
          if (misc.vdist(localplayer.position, e.position) < 1.5)
            return void mp.events.callRemote("sDoorsChangeState", e.id);
    };
  },
  function (e) {
    e.exports = {
      Спойлер: {
        "Short Lip Spoiler": 1.5,
        "Extended Lip Spoiler": 2,
        "Bold-On Ducktail": 2,
        "Drag Spoiler": 2.5,
        "Stock Car Spoiler": 2,
        "Mid Level Spoiler": 3,
        "Carbon Flap Spoiler": 3.5,
        "Low Spoiler": 2.5,
        "Low Carbon Spoiler": 3,
        "Classic RS Wing": 4.5,
        "Primary Color Spoiler": 4.5,
        "Secondary Color Spoiler": 4.5,
        "Carbon Spoiler": 4,
        "Classic Carbon RS Wing": 5,
        "Tuner Wing": 5.5,
        "High Level Spoiler": 6,
        "Carbon Wing Type II": 7.5,
        "Race Spoiler": 7.5,
        "Touring Spoiler": 7.5,
        "Extreme Downforce BGW": 7.5,
        "Muscle Killer Wing": 7.5,
        "Drift Wing": 8,
        "Competition Spoiler": 8,
        "GT Wing": 9,
        "Tarmac Attack Wing": 9,
        "Extreme Street Racer Wing": 9.5,
        "Extreme Time Attack Wing": 9.5,
        "Cruise Spoiler Primary Color": 5,
        "Cruise Spoiler Secondary Color": 5,
        "Cruise Spoiler Carbon": 5.5,
        "Street Spoiler Primary Color": 5,
        "Street Spoiler Secondary Color": 5,
        "Street Spoiler Carbon": 5.5,
        "Racing Spoiler": 9.5,
        "Remove Spoiler": 2,
        "OTT Spoiler": 8,
        default: 4,
      },
      "Передний бампер": {
        "Stickerbomb Splitter": 2,
        "Carbon Front Splitter": 2.5,
        "Painted Extended Splitter": 3,
        "Black Extended Splitter": 3,
        "Extended Front Diffuser": 4.5,
        "Splitter With Canards": 7,
        "Primary Color Splitter": 4,
        "Secondary Color Splitter": 4,
        "Carbon Splitter": 4.5,
        "Custom Front Splitter": 4,
        "Custom Splitter & Intercooler": 7,
        default: 4,
      },
      "Задний бампер ": {
        "Carbon Rear Diffuser": 4,
        "Street Diffuser": 2,
        "Race Diffuser": 2.5,
        "Carbon Track Diffuser": 2.5,
        "Carbon Race Diffuser": 3,
        "Painted Rear Bumper": 3,
        "Painted Bumper & Diffuser": 4,
        default: 4,
      },
      Пороги: {
        "Sideskirt Extensions": 1.5,
        "Secondary Skirt Extensions": 1.5,
        "Primary Skirts": 1.5,
        "Secondary Skirts": 1.5,
        "Carbon Skirts": 2,
        "Carbon Skirt Extensions": 2,
        "Drift Skirts": 2.5,
        "Secondary Drift Skirts": 2.5,
        "Street Skirt Primary Color": 2,
        "Street Skirt Secondary Color": 2,
        "Street Skirt Carbon": 2.5,
        default: 2,
      },
      Выхлоп: {
        "Chrome Tip Exhaust": 1.5,
        "Big Bore Exhaust": 1.5,
        "Race Exhaust": 1.5,
        "Oval Exhaust": 1.5,
        "Titanium Exhaust": 2,
        "Titanium Tuner Exhaust": 2.5,
        "Twin Chrome Tip Exhaust": 2,
        "Twin Titanium Exhaust": 2.5,
        "Twin Titanium Tuner Exhaust": 3,
        "Custom Shotgun Exhaust": 2.5,
        default: 2,
      },
      "Защитная арматура": {
        Первая: 1.5,
        Вторая: 2,
        Третья: 2.5,
        Четвертая: 3,
        Пятая: 3.5,
        Шестая: 4,
        Седьмая: 4.5,
        Восьмая: 5,
        Девятая: 5.5,
        Десятая: 6,
        default: 3,
      },
      "Решетка радиатора": { default: 2 },
      Капот: {
        "Stickerbomb Hood": 2,
        "Ducted Hood": 1.5,
        "Vented Hood": 2.5,
        "Double Vented Hood": 3,
        "Performance Hood": 3,
        "Raised Extreme Hood": 3.5,
        "Carbon Hood": 3.5,
        "Carbon Ducted Hood": 4,
        "Carbon Vented Hood": 5,
        "Carbon Double Vented Hood": 5.5,
        "Carbon Performance Hood": 5,
        "Carbon Scooped Hood": 5,
        "Carbon Raised Extreme Hood": 5.5,
        "Secondary Stripe Hood": 3,
        default: 4,
      },
      "Крылья и арки": {
        "Single Vent Front Fenders": 1.5,
        "Twin Vent Front Fenders": 2,
        "Wide Angular Rear Fenders": 2,
        "Primary Color Bolt-On Arches": 2.5,
        "Secondary Color Bolt-On Arches": 2.5,
        "Carbon Bolt-On Arches": 3.5,
        default: 2.5,
      },
      Крылья: { default: 3 },
      Крыша: {
        "Carbon Roof Spoiler": 2,
        "Vortex Generators": 1.5,
        "Carbon Vortex Generators": 1.5,
        "Carbon Roof": 3.5,
        "Carbon & Roof Spoiler": 4.5,
        "Carbon & Roof Generators": 4.5,
        Sunstrip: 3.5,
        "Rear Louvers": 3.5,
        "Carbon Roof & Louvers": 4.5,
        default: 3.5,
      },
      Двигатель: {
        "Двигатель №0": 4,
        "Двигатель №1": 9,
        "Двигатель №2": 15,
        "Двигатель №3": 20,
        "Двигатель №4": 27,
        "Двигатель №5": 30,
      },
      Тормоза: {
        "Тормоза №0": 2,
        "Тормоза №1": 4,
        "Тормоза №2": 9,
        "Тормоза №3": 16,
        "Тормоза №4": 20,
        "Тормоза №5": 24,
      },
      Трансмиссия: {
        "Трансмиссия №0": 3,
        "Трансмиссия №1": 6,
        "Трансмиссия №2": 12,
        "Трансмиссия №3": 17,
        "Трансмиссия №4": 22,
      },
      Гудок: { default: 5 },
      Подвеска: {
        "Подвеска №0": 3,
        "Подвеска №1": 6,
        "Подвеска №2": 12,
        "Подвеска №3": 18,
        "Подвеска №4": 22,
        "Подвеска №5": 24,
      },
      Турбо: {
        "Турбо №1": 6,
        "Турбо №2": 10,
        "Турбо №3": 14,
        "Турбо №4": 16,
        "Турбо №5": 19,
        "Турбо №6": 22,
      },
      "Серебряная тень": { default: 3 },
      Фары: { default: 3.5 },
      Диски: {
        Inferno: 4,
        "Deep Five": 4.5,
        "Lozspeed Mk.V": 5,
        "Diamond Cut": 5,
        Chrono: 4.5,
        "Feroci RR": 5,
        FiftyNine: 4.5,
        Mercie: 7,
        "Synthetic Z": 7,
        "Organic Type 0": 6,
        "Endo V.1": 6,
        "GT One": 7,
        "Duper 7": 7,
        Uzer: 9,
        GroundRide: 6,
        "S Racer": 7,
        Venum: 8,
        Cosmo: 8,
        "Dash VIP": 8,
        "Ice Kid": 10,
        "Ruff Weld": 10,
        "Wangan Master": 10,
        "Super Five": 10,
        "Endo v.2": 8,
        "Split Six": 8,
        default: 5,
      },
      Номера: { default: 3.5 },
      "Сетка бампера": { default: 4.5 },
      "Внутренняя отделка": { default: 4 },
      Раскрас: { default: 7 },
      "Приборная панель": { default: 7 },
      Спидометр: { default: 5 },
      "Внутренняя отделка двери": { default: 6 },
      Сидения: { default: 8 },
      Руль: { default: 4 },
      "Коробка передач": { default: 6 },
      Бляшка: { default: 5 },
      ICE: { default: 6 },
      Колонки: { default: 6 },
      Гидравлика: { default: 15 },
      "Блок двигателя": { default: 2 },
      "Воздушные фильтры": { default: 3 },
      "Трубка двигателя": { default: 3 },
      "Арка фар": { default: 3 },
      "Антенны капота": { default: 3 },
      "Внешняя отделка": { default: 5 },
      Бак: { default: 5 },
      Окна: { default: 5 },
      Наклейки: { default: 13 },
      Тонировка: {
        "Без тонировки": 3,
        "Тонировка №1": 6,
        "Тонировка №2": 9,
        "Тонировка №3": 11,
        "Тонировка №4": 13,
      },
      Ксенон: { "Стандартные фары": 3, "Ксеноновые фары": 6, default: 3 },
      "Неоновая подсветка": { default: 15 },
      Покраска: { default: 4 },
      Починка: { default: 500 },
      Турбонаддув: { "Без турбонаддува": 1, Турбонаддув: 10 },
    };
  },
  function (e, t) {
    t.assort = {
      hair: {
        0: [
          { title: "Налысо", key: 0, variation: 0, mat: 20 },
          { title: "Коротко с залысинами", key: 1, variation: 5, mat: 42 },
          { title: "Коротко", key: 1, variation: 1, mat: 30 },
          { title: "Ястреб", key: 2, variation: 0, mat: 49 },
          { title: "Хипстер", key: 3, variation: 0, mat: 75 },
          { title: "Челка набок", key: 4, variation: 0, mat: 55 },
          { title: "Коротко", key: 5, variation: 0, mat: 31 },
          { title: "Байкер", key: 6, variation: 0, mat: 90 },
          { title: "Хвост", key: 7, variation: 0, mat: 75 },
          { title: "Косички", key: 8, variation: 0, mat: 95 },
          { title: "Прилиза", key: 9, variation: 0, mat: 79 },
          { title: "Коротко", key: 10, variation: 0, mat: 44 },
          { title: "Шипы", key: 11, variation: 0, mat: 77 },
          { title: "Цезарь", key: 12, variation: 0, mat: 44 },
          { title: "Чоппи", key: 13, variation: 0, mat: 75 },
          { title: "Дреды", key: 14, variation: 0, mat: 160 },
          { title: "Длинные", key: 15, variation: 0, mat: 35 },
          { title: "Лохматые кудри", key: 16, variation: 0, mat: 50 },
          { title: "Серфингист", key: 17, variation: 0, mat: 85 },
          { title: "Набок", key: 18, variation: 0, mat: 90 },
          { title: "Зализа", key: 19, variation: 0, mat: 95 },
          { title: "Длинные", key: 20, variation: 0, mat: 98 },
          { title: "Юный хипстер", key: 21, variation: 0, mat: 102 },
          { title: "Волосы вверх", key: 22, variation: 0, mat: 103 },
          { title: "Класические косички", key: 24, variation: 0, mat: 95 },
          { title: "Косички-пальмы", key: 25, variation: 0, mat: 107 },
          { title: "Косички-молнии", key: 26, variation: 0, mat: 113 },
          {
            title: "Зачесанные наверх косички",
            key: 27,
            variation: 0,
            mat: 100,
          },
          { title: "Косички-пальмы", key: 28, variation: 0, mat: 106 },
          { title: "Косички-улитки", key: 29, variation: 0, mat: 106 },
          { title: "Полубок", key: 30, variation: 0, mat: 125 },
          { title: "Зачес назад", key: 31, variation: 0, mat: 120 },
          { title: "Выбрито по бокам", key: 32, variation: 0, mat: 125 },
          {
            title: "Выбрито по бокам, зачес влево",
            key: 33,
            variation: 0,
            mat: 130,
          },
          { title: "Ирокез", key: 34, variation: 0, mat: 135 },
          { title: "Неопрятные волосы", key: 35, variation: 0, mat: 90 },
          { title: "В разные стороны", key: 36, variation: 0, mat: 105 },
          { title: "Длинные волосы", key: 38, variation: 0, mat: 106 },
          { title: "Деревенщина", key: 39, variation: 0, mat: 45 },
          { title: "Афро", key: 40, variation: 0, mat: 140 },
          {
            title: "Зачес назад с залысинами",
            key: 41,
            variation: 0,
            mat: 110,
          },
          { title: "Опрятная", key: 42, variation: 0, mat: 121 },
          { title: "Хвостик", key: 43, variation: 0, mat: 107 },
          { title: "Только что проснулся", key: 44, variation: 0, mat: 80 },
          { title: "Дреды набок", key: 45, variation: 0, mat: 144 },
          {
            title: "Длинные волосы с косичкой",
            key: 46,
            variation: 0,
            mat: 134,
          },
          { title: "Маленькие дреды", key: 47, variation: 0, mat: 116 },
          {
            title: "Кучерявые, короткие волосы",
            key: 48,
            variation: 0,
            mat: 121,
          },
        ],
        1: [
          { title: "Лисая", key: 0, variation: 0, mat: 50 },
          { title: "Коротко", key: 1, variation: 0, mat: 48 },
          { title: "Слои", key: 2, variation: 0, mat: 42 },
          { title: "Две косички", key: 3, variation: 0, mat: 17 },
          { title: "Хвост", key: 4, variation: 0, mat: 28 },
          { title: "Набок", key: 5, variation: 0, mat: 30 },
          { title: "Афро косы", key: 6, variation: 0, mat: 100 },
          { title: "Клеопатра", key: 7, variation: 0, mat: 113 },
          { title: "Ястреб", key: 8, variation: 0, mat: 53 },
          { title: "Ракушка", key: 9, variation: 0, mat: 56 },
          { title: "Каре", key: 10, variation: 0, mat: 100 },
          { title: "Неопрятный пучок", key: 11, variation: 0, mat: 50 },
          { title: "Пикси", key: 12, variation: 0, mat: 38 },
          { title: "Подбритые виски", key: 13, variation: 0, mat: 100 },
          { title: "Высокий пучок", key: 14, variation: 0, mat: 111 },
          { title: "Короткие локоны", key: 15, variation: 0, mat: 46 },
          { title: "Волнистый боб", key: 16, variation: 0, mat: 95 },
          { title: "Пучок с челкой", key: 17, variation: 0, mat: 97 },
          { title: "Красотка", key: 18, variation: 0, mat: 57 },
          { title: "Тугой узел", key: 19, variation: 0, mat: 85 },
          { title: "Одуванчик", key: 20, variation: 0, mat: 119 },
          { title: "Флэппер боб", key: 21, variation: 0, mat: 98 },
          { title: "Взрыв", key: 22, variation: 0, mat: 146 },
          { title: "Сколотые косички", key: 25, variation: 0, mat: 142 },
          { title: "Кочиски-листья", key: 26, variation: 0, mat: 125 },
          { title: "Косички-зигзаги", key: 27, variation: 0, mat: 139 },
          { title: "Косички с челкой", key: 28, variation: 0, mat: 110 },
          { title: "Косички-волны", key: 29, variation: 0, mat: 150 },
          { title: "Косички-завитки", key: 30, variation: 0, mat: 132 },
          { title: "Хвост с укладкой", key: 31, variation: 0, mat: 124 },
          {
            title: "Растрепанный зачес назад",
            key: 32,
            variation: 0,
            mat: 110,
          },
          { title: "Ирокез", key: 33, variation: 0, mat: 139 },
          { title: "Ирокез уложенный набок", key: 34, variation: 0, mat: 144 },
          { title: "Шипастый ирокез", key: 35, variation: 0, mat: 200 },
          { title: "Бандана и косички", key: 36, variation: 0, mat: 122 },
          { title: "Стиляга со слоями", key: 37, variation: 0, mat: 189 },
          { title: "Челси", key: 38, variation: 0, mat: 192 },
          { title: "Пышный хвост", key: 39, variation: 0, mat: 132 },
          { title: "Растрепанный пучок", key: 40, variation: 0, mat: 180 },
          { title: "Хвост набок", key: 41, variation: 0, mat: 185 },
          {
            title: "Распущенные волосы с хвостом",
            key: 42,
            variation: 0,
            mat: 191,
          },
          { title: "Завитушки с косой", key: 43, variation: 0, mat: 179 },
          { title: "Длинная коса", key: 44, variation: 0, mat: 183 },
          { title: "Средние кучки", key: 45, variation: 0, mat: 184 },
          { title: "Большой пучок", key: 46, variation: 0, mat: 177 },
          { title: "Очень длинные волосы", key: 47, variation: 0, mat: 190 },
          {
            title: "Очень длинные волосы с косой",
            key: 48,
            variation: 0,
            mat: 192,
          },
          {
            title: "Длинные волосы пучками сбоку",
            key: 49,
            variation: 0,
            mat: 195,
          },
          {
            title: "Длинные волосы заплетены сзади",
            key: 50,
            variation: 0,
            mat: 191,
          },
          { title: "Конский хвост", key: 51, variation: 0, mat: 187 },
          {
            title: "Короткие завязанные волосы",
            key: 52,
            variation: 0,
            mat: 135,
          },
          { title: "Свободный пучок", key: 53, variation: 0, mat: 143 },
          { title: "Итальянка", key: 54, variation: 0, mat: 175 },
          { title: "Боб-каре", key: 55, variation: 0, mat: 155 },
          {
            title: "Длинные волосы с хвостом сзади",
            key: 56,
            variation: 0,
            mat: 186,
          },
          {
            title: "Длинные волосы с пучком сверху",
            key: 57,
            variation: 0,
            mat: 188,
          },
          {
            title: "Короткие волосы с косой спереди",
            key: 58,
            variation: 0,
            mat: 140,
          },
          {
            title: "Длинные зачесанные волосы",
            key: 59,
            variation: 0,
            mat: 188,
          },
          { title: "Длинные завитые волосы", key: 61, variation: 0, mat: 191 },
          {
            title: "Длинные завитые волосы налево",
            key: 62,
            variation: 0,
            mat: 192,
          },
          {
            title: "Длинные волосы с косой набок",
            key: 63,
            variation: 0,
            mat: 183,
          },
          { title: "Аврора", key: 64, variation: 0, mat: 180 },
          {
            title: "Длинные завитые волосы направо",
            key: 65,
            variation: 0,
            mat: 186,
          },
          { title: "Высокий хвост с челкой", key: 66, variation: 0, mat: 187 },
          {
            title: "Длинные завитые волосы с челкой",
            key: 67,
            variation: 0,
            mat: 189,
          },
          { title: "Два хвостика", key: 68, variation: 0, mat: 187 },
        ],
      },
      beard: {
        0: [
          { title: "Легкая щетина", key: 0, mat: 15 },
          { title: "Нет бороды", key: 1, mat: 10 },
          { title: "Бальбо", key: 2, mat: 43 },
          { title: "Круглая борода", key: 3, mat: 32 },
          { title: "Эспаньолка", key: 4, mat: 46 },
          { title: "Козлиная бородка", key: 5, mat: 50 },
          { title: "Островок", key: 6, mat: 35 },
          { title: "Тонкая бородка", key: 7, mat: 60 },
          { title: "Короткая бородка", key: 8, mat: 22 },
          { title: "Мушкетер", key: 9, mat: 100 },
          { title: "Усы", key: 10, mat: 30 },
          { title: "Подстриженая борода", key: 11, mat: 45 },
          { title: "Щетина", key: 12, mat: 19 },
          { title: "Круглая борода", key: 13, mat: 21 },
          { title: "Борода-подкова", key: 14, mat: 45 },
          { title: "Карандашные усы и баки", key: 15, mat: 99 },
          { title: "Борода-ремень", key: 16, mat: 49 },
          { title: "Бальбо и боки", key: 17, mat: 105 },
          { title: "Баки", key: 18, mat: 45 },
          { title: "Короткая бородка", key: 19, mat: 75 },
          { title: "Дали", key: 20, mat: 155 },
          { title: "Дали и бородка", key: 21, mat: 180 },
          { title: "Велосипедный руль", key: 22, mat: 200 },
          { title: "Островок с усами", key: 23, mat: 195 },
          { title: "Английские усы с пеньком", key: 24, mat: 190 },
          { title: "Голливудская борода", key: 25, mat: 188 },
          { title: "Фу Манчу", key: 26, mat: 144 },
          { title: "Островок с баками", key: 27, mat: 160 },
          { title: "Широкие баки", key: 28, mat: 133 },
          { title: "Ширма", key: 29, mat: 155 },
        ],
        1: [{ title: "Нет бороды", key: 1, mat: 1 }],
      },
      makeup: {
        0: [
          { title: "Убрать", key: 255, mat: 0 },
          { title: "Поцелуй мой топор", key: 17, mat: 500 },
          { title: "Пандочка", key: 18, mat: 1e3 },
          { title: "Летучая мышь", key: 19, mat: 750 },
          { title: "Алый череп", key: 20, mat: 575 },
          { title: "Рептилия", key: 21, mat: 1e3 },
          { title: "Вельд", key: 26, mat: 600 },
          { title: "Трайбл - линии ", key: 27, mat: 500 },
          { title: "Трайбл - завитки", key: 28, mat: 550 },
          { title: "Трайбл - оранжевый", key: 29, mat: 125 },
          { title: "Трайбл - красный", key: 30, mat: 200 },
          { title: "В коробке", key: 31, mat: 1500 },
          { title: "Клоун", key: 32, mat: 2e3 },
          { title: "Джокер", key: 44, mat: 1900 },
          { title: "Хеллоуин №1", key: 45, mat: 1900 },
          { title: "Хеллоуин №2", key: 46, mat: 1900 },
          { title: "Хеллоуин №3", key: 47, mat: 1900 },
          { title: "Хеллоуин №4", key: 48, mat: 1900 },
          { title: "Хеллоуин №5", key: 49, mat: 1900 },
          { title: "Хеллоуин №6", key: 51, mat: 1900 },
          { title: "Хеллоуин №7", key: 52, mat: 1900 },
          { title: "Хеллоуин №8", key: 53, mat: 1900 },
          { title: "Хеллоуин №9", key: 54, mat: 1900 },
          { title: "Хеллоуин №10", key: 55, mat: 1900 },
          { title: "Хеллоуин №11", key: 56, mat: 1900 },
          { title: "Хеллоуин №12", key: 57, mat: 1900 },
          { title: "Хеллоуин №13", key: 58, mat: 1900 },
          { title: "Хеллоуин №14", key: 59, mat: 1900 },
          { title: "Хеллоуин №15", key: 60, mat: 1900 },
          { title: "Хеллоуин №16", key: 61, mat: 1900 },
          { title: "Хеллоуин №17", key: 62, mat: 1900 },
          { title: "Хеллоуин №18", key: 63, mat: 1900 },
          { title: "Хеллоуин №19", key: 64, mat: 1900 },
          { title: "Хеллоуин №20", key: 65, mat: 1900 },
          { title: "Хеллоуин №21", key: 66, mat: 1900 },
          { title: "Хеллоуин №22", key: 67, mat: 1900 },
          { title: "Хеллоуин №23", key: 68, mat: 1900 },
          { title: "Хеллоуин №24", key: 69, mat: 1900 },
          { title: "Хеллоуин №25", key: 70, mat: 1900 },
          { title: "Хеллоуин №26", key: 71, mat: 1900 },
        ],
        1: [
          { title: "Убрать", key: 255, mat: 0 },
          { title: "Дымчато-черный", key: 0, mat: 22 },
          { title: "Бронзовый", key: 1, mat: 25 },
          { title: "Мягкий серый", key: 2, mat: 17 },
          { title: "Ретро-гламур", key: 3, mat: 61 },
          { title: "Естественный", key: 4, mat: 15 },
          { title: "Кошачьи глаза", key: 5, mat: 20 },
          { title: "Чикса", key: 6, mat: 87 },
          { title: "Вамп", key: 7, mat: 27 },
          { title: "Вайнвудский гламур", key: 8, mat: 48 },
          { title: "Баблгам", key: 9, mat: 200 },
          { title: "Мечта о море", key: 10, mat: 74 },
          { title: "Пин-ап", key: 11, mat: 93 },
          { title: "Лиловая страсть", key: 12, mat: 67 },
          { title: "Димчатые кошачьи глаза", key: 13, mat: 100 },
          { title: "Огненный рубин", key: 14, mat: 80 },
          { title: "Эстрадная принцесса", key: 15, mat: 54 },
          { title: "Тушь для глаз", key: 16, mat: 16 },
          { title: "Полосы под глазами", key: 23, mat: 75 },
          { title: "Маска №1", key: 27, mat: 1900 },
          { title: "Маска №2", key: 28, mat: 1900 },
          { title: "Грим мима", key: 31, mat: 1900 },
          { title: "Маска патриота", key: 34, mat: 1900 },
          { title: "Кровавые глаза", key: 35, mat: 150 },
          { title: "Хеви-метал", key: 36, mat: 99 },
          { title: "Тушь светлая", key: 37, mat: 33 },
          { title: "Тушь темная", key: 38, mat: 45 },
          { title: "Тушь светлая №2", key: 39, mat: 35 },
          { title: "Тушь темная №2", key: 40, mat: 50 },
          { title: "Цветная тушь", key: 41, mat: 34 },
          { title: "Печаль", key: 42, mat: 45 },
          { title: "Хеллоуин №1", key: 46, mat: 1900 },
          { title: "Хеллоуин №2", key: 47, mat: 1900 },
          { title: "Хеллоуин №3", key: 48, mat: 1900 },
          { title: "Хеллоуин №4", key: 49, mat: 1900 },
          { title: "Хеллоуин №5", key: 51, mat: 1900 },
          { title: "Хеллоуин №6", key: 52, mat: 1900 },
          { title: "Хеллоуин №7", key: 53, mat: 1900 },
          { title: "Хеллоуин №8", key: 54, mat: 1900 },
          { title: "Хеллоуин №9", key: 55, mat: 1900 },
          { title: "Хеллоуин №10", key: 56, mat: 1900 },
          { title: "Хеллоуин №11", key: 57, mat: 1900 },
          { title: "Хеллоуин №12", key: 58, mat: 1900 },
          { title: "Хеллоуин №13", key: 59, mat: 1900 },
          { title: "Хеллоуин №14", key: 60, mat: 1900 },
          { title: "Хеллоуин №15", key: 61, mat: 1900 },
          { title: "Хеллоуин №16", key: 62, mat: 1900 },
          { title: "Хеллоуин №17", key: 63, mat: 1900 },
          { title: "Хеллоуин №18", key: 64, mat: 1900 },
          { title: "Хеллоуин №19", key: 65, mat: 1900 },
          { title: "Хеллоуин №20", key: 66, mat: 1900 },
          { title: "Хеллоуин №21", key: 67, mat: 1900 },
          { title: "Хеллоуин №22", key: 68, mat: 1900 },
          { title: "Хеллоуин №23", key: 69, mat: 1900 },
          { title: "Хеллоуин №24", key: 70, mat: 1900 },
          { title: "Хеллоуин №25", key: 71, mat: 1900 },
          { title: "Хеллоуин №26", key: 72, mat: 1900 },
        ],
      },
      chest: {
        0: [
          { title: "Естественные", key: 0, mat: 100 },
          { title: "Полоска", key: 1, mat: 98 },
          { title: "Дерево", key: 2, mat: 105 },
          { title: "Волосатая", key: 3, mat: 110 },
          { title: "Заросшая", key: 4, mat: 111 },
          { title: "Обезьяна", key: 5, mat: 112 },
          { title: "Причесанная обезьяна", key: 6, mat: 111 },
          { title: "Бикини", key: 7, mat: 120 },
          { title: "Молния", key: 8, mat: 121 },
          { title: "Обратная молния", key: 9, mat: 119 },
          { title: "Сердечко", key: 10, mat: 115 },
          { title: "Усы", key: 11, mat: 125 },
          { title: "Смайлик", key: 12, mat: 123 },
          { title: "Череп", key: 13, mat: 115 },
          { title: "Тропинка", key: 14, mat: 110 },
          { title: "Тропинка и соски", key: 15, mat: 104 },
          { title: "Волосатые руки", key: 16, mat: 100 },
        ],
        1: [{ title: "Нет волос", key: 0, mat: 1 }],
      },
      eyebrows: {
        0: [
          { title: "Аккуратные", key: 0, mat: 45 },
          { title: "Модные", key: 1, mat: 55 },
          { title: "Клеопатра", key: 2, mat: 57 },
          { title: "Ирооничные", key: 3, mat: 56 },
          { title: "Женственные", key: 4, mat: 53 },
          { title: "Обольстительные", key: 5, mat: 56 },
          { title: "Нахмуренные", key: 6, mat: 51 },
          { title: "Чикса", key: 7, mat: 55 },
          { title: "Торжествующие", key: 8, mat: 52 },
          { title: "Беззаботные", key: 9, mat: 45 },
          { title: "Дугой", key: 10, mat: 47 },
          { title: "Мышка", key: 11, mat: 48 },
          { title: "Двойная высечка", key: 12, mat: 50 },
          { title: "Впалые", key: 13, mat: 49 },
          { title: "Нарисованные карандашом", key: 14, mat: 48 },
          { title: "Выщипанные", key: 15, mat: 52 },
          { title: "Прямые и тонкие", key: 16, mat: 54 },
          { title: "Естественные", key: 17, mat: 57 },
          { title: "Пышные", key: 18, mat: 52 },
          { title: "Неопрятные", key: 19, mat: 47 },
          { title: "Широкие", key: 20, mat: 48 },
          { title: "Обычные", key: 21, mat: 47 },
          { title: "Южноевпропейские", key: 22, mat: 60 },
          { title: "Ухоженные", key: 23, mat: 46 },
          { title: "Кустистые", key: 24, mat: 45 },
          { title: "Перышки", key: 25, mat: 55 },
          { title: "Колючие", key: 26, mat: 45 },
          { title: "Сросшиеся", key: 27, mat: 47 },
          { title: "Крылатые", key: 28, mat: 62 },
          { title: "Тройная высечка", key: 29, mat: 63 },
          { title: "Высечка дугой", key: 30, mat: 70 },
          { title: "Подрезанные", key: 31, mat: 55 },
          { title: "Сходящие на нет", key: 32, mat: 54 },
          { title: "Высечка", key: 33, mat: 73 },
        ],
        1: [
          { title: "Аккуратные", key: 0, mat: 45 },
          { title: "Модные", key: 1, mat: 55 },
          { title: "Клеопатра", key: 2, mat: 57 },
          { title: "Ирооничные", key: 3, mat: 56 },
          { title: "Женственные", key: 4, mat: 53 },
          { title: "Обольстительные", key: 5, mat: 56 },
          { title: "Нахмуренные", key: 6, mat: 51 },
          { title: "Чикса", key: 7, mat: 55 },
          { title: "Торжествующие", key: 8, mat: 52 },
          { title: "Беззаботные", key: 9, mat: 45 },
          { title: "Дугой", key: 10, mat: 47 },
          { title: "Мышка", key: 11, mat: 48 },
          { title: "Двойная высечка", key: 12, mat: 50 },
          { title: "Впалые", key: 13, mat: 49 },
          { title: "Нарисованные карандашом", key: 14, mat: 48 },
          { title: "Выщипанные", key: 15, mat: 52 },
          { title: "Прямые и тонкие", key: 16, mat: 54 },
          { title: "Естественные", key: 17, mat: 57 },
          { title: "Пышные", key: 18, mat: 52 },
          { title: "Неопрятные", key: 19, mat: 47 },
          { title: "Широкие", key: 20, mat: 48 },
          { title: "Обычные", key: 21, mat: 47 },
          { title: "Южноевпропейские", key: 22, mat: 60 },
          { title: "Ухоженные", key: 23, mat: 46 },
          { title: "Кустистые", key: 24, mat: 45 },
          { title: "Перышки", key: 25, mat: 55 },
          { title: "Колючие", key: 26, mat: 45 },
          { title: "Сросшиеся", key: 27, mat: 47 },
          { title: "Крылатые", key: 28, mat: 62 },
          { title: "Тройная высечка", key: 29, mat: 63 },
          { title: "Высечка дугой", key: 30, mat: 70 },
          { title: "Подрезанные", key: 31, mat: 55 },
          { title: "Сходящие на нет", key: 32, mat: 54 },
          { title: "Высечка", key: 33, mat: 73 },
        ],
      },
      eyecolor: [
        { title: "Зеленый", key: 0, mat: 575 },
        { title: "Изумрудный", key: 1, mat: 590 },
        { title: "Голубой", key: 2, mat: 545 },
        { title: "Синий", key: 3, mat: 530 },
        { title: "Светлый каштан", key: 4, mat: 515 },
        { title: "Темно-коричневый", key: 5, mat: 500 },
        { title: "Карий", key: 6, mat: 450 },
        { title: "Темно-серый", key: 7, mat: 470 },
        { title: "Светло-серый", key: 8, mat: 485 },
        { title: "Розовый", key: 9, mat: 895 },
        { title: "Желтый", key: 10, mat: 915 },
        { title: "Фиолетовый", key: 11, mat: 950 },
        { title: "Затемненение", key: 12, mat: 1100 },
        { title: "Оттенки серого", key: 13, mat: 1e3 },
        { title: "Текила-санрайз", key: 14, mat: 1270 },
        { title: "Атомик", key: 15, mat: 1300 },
        { title: "Искажение", key: 16, mat: 1130 },
        { title: "ЕКола", key: 17, mat: 1300 },
        { title: "Космический рейнджер", key: 18, mat: 1900 },
        { title: "Инь-ян", key: 19, mat: 1090 },
        { title: "Мишень", key: 20, mat: 1500 },
        { title: "Ящерица", key: 21, mat: 1180 },
        { title: "Дракон", key: 22, mat: 1195 },
        { title: "Инопланетянин", key: 23, mat: 1210 },
        { title: "Козел", key: 24, mat: 1225 },
        { title: "Смайлик", key: 25, mat: 1300 },
        { title: "Одержимый", key: 26, mat: 1750 },
        { title: "Демон", key: 27, mat: 1800 },
        { title: "Зараженный", key: 28, mat: 1315 },
        { title: "Пришелец", key: 29, mat: 1300 },
        { title: "Нежить", key: 30, mat: 2e3 },
        { title: "Зомби", key: 31, mat: 1650 },
      ],
    };
    t.primaryColors = [
      { title: "1", key: 0 },
      { title: "2", key: 1 },
      { title: "3", key: 2 },
      { title: "4", key: 3 },
      { title: "5", key: 4 },
      { title: "6", key: 5 },
      { title: "7", key: 6 },
      { title: "8", key: 7 },
      { title: "9", key: 8 },
      { title: "10", key: 9 },
      { title: "11", key: 10 },
      { title: "12", key: 11 },
      { title: "13", key: 12 },
      { title: "14", key: 13 },
      { title: "15", key: 14 },
      { title: "16", key: 15 },
      { title: "17", key: 16 },
      { title: "18", key: 17 },
      { title: "19", key: 18 },
      { title: "20", key: 19 },
      { title: "21", key: 20 },
      { title: "22", key: 21 },
      { title: "23", key: 22 },
      { title: "24", key: 23 },
      { title: "25", key: 24 },
      { title: "26", key: 25 },
      { title: "27", key: 26 },
      { title: "28", key: 27 },
      { title: "29", key: 28 },
      { title: "30", key: 29 },
      { title: "31", key: 30 },
      { title: "32", key: 31 },
      { title: "33", key: 32 },
      { title: "34", key: 33 },
      { title: "35", key: 34 },
      { title: "36", key: 35 },
      { title: "37", key: 36 },
      { title: "38", key: 37 },
      { title: "39", key: 38 },
      { title: "40", key: 39 },
      { title: "41", key: 40 },
      { title: "42", key: 41 },
      { title: "43", key: 42 },
      { title: "44", key: 43 },
      { title: "45", key: 44 },
      { title: "46", key: 45 },
      { title: "47", key: 46 },
      { title: "48", key: 47 },
      { title: "49", key: 48 },
      { title: "50", key: 49 },
      { title: "51", key: 50 },
      { title: "52", key: 51 },
      { title: "53", key: 52 },
      { title: "54", key: 53 },
      { title: "55", key: 54 },
      { title: "56", key: 55 },
      { title: "57", key: 56 },
      { title: "58", key: 57 },
      { title: "59", key: 58 },
      { title: "60", key: 59 },
      { title: "61", key: 60 },
      { title: "62", key: 61 },
      { title: "63", key: 62 },
      { title: "64", key: 63 },
    ];
    t.secondaryColors = [
      { title: "1", key: 0 },
      { title: "2", key: 1 },
      { title: "3", key: 2 },
      { title: "4", key: 3 },
      { title: "5", key: 4 },
      { title: "6", key: 5 },
      { title: "7", key: 6 },
      { title: "8", key: 7 },
      { title: "9", key: 8 },
      { title: "10", key: 9 },
      { title: "11", key: 10 },
      { title: "12", key: 11 },
      { title: "13", key: 12 },
      { title: "14", key: 13 },
      { title: "15", key: 14 },
      { title: "16", key: 15 },
      { title: "17", key: 16 },
      { title: "18", key: 17 },
      { title: "19", key: 18 },
      { title: "20", key: 19 },
      { title: "21", key: 20 },
      { title: "22", key: 21 },
      { title: "23", key: 22 },
      { title: "24", key: 23 },
      { title: "25", key: 24 },
      { title: "26", key: 25 },
      { title: "27", key: 26 },
      { title: "28", key: 27 },
      { title: "29", key: 28 },
      { title: "30", key: 29 },
      { title: "31", key: 30 },
      { title: "32", key: 31 },
      { title: "33", key: 32 },
      { title: "34", key: 33 },
      { title: "35", key: 34 },
      { title: "36", key: 35 },
      { title: "37", key: 36 },
      { title: "38", key: 37 },
      { title: "39", key: 38 },
      { title: "40", key: 39 },
      { title: "41", key: 40 },
      { title: "42", key: 41 },
      { title: "43", key: 42 },
      { title: "44", key: 43 },
      { title: "45", key: 44 },
      { title: "46", key: 45 },
      { title: "47", key: 46 },
      { title: "48", key: 47 },
      { title: "49", key: 48 },
      { title: "50", key: 49 },
      { title: "51", key: 50 },
      { title: "52", key: 51 },
      { title: "53", key: 52 },
      { title: "54", key: 53 },
      { title: "55", key: 54 },
      { title: "56", key: 55 },
      { title: "57", key: 56 },
      { title: "58", key: 57 },
      { title: "59", key: 58 },
      { title: "60", key: 59 },
      { title: "61", key: 60 },
      { title: "62", key: 61 },
      { title: "63", key: 62 },
      { title: "64", key: 63 },
    ];
  },
  function (e) {
    e.exports = {
      torso: [
        {
          title: "Ушлый",
          mat: 275,
          slots: [2],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_Stomach_000",
          femalehash: "",
          price: 3e3,
          id: 1,
        },
        {
          title: "Богач",
          mat: 225,
          slots: [1],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_Chest_000",
          femalehash: "",
          price: 1750,
          id: 2,
        },
        {
          title: "Доллары",
          mat: 225,
          slots: [0],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_Chest_001",
          femalehash: "",
          price: 1750,
          id: 3,
        },
        {
          title: "Стригу бабло",
          mat: 275,
          slots: [3, 4],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_Back_000",
          femalehash: "",
          price: 2e3,
          id: 4,
        },
        {
          title: "Высокие ставки",
          mat: 295,
          slots: [0, 1],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Chest_000",
          price: 1750,
          id: 5,
        },
        {
          title: "Делаем деньги",
          mat: 298,
          slots: [0, 1],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Chest_001",
          price: 2500,
          id: 6,
        },
        {
          title: "Разбитое сердце",
          mat: 230,
          slots: [1],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Chest_002",
          price: 1750,
          id: 7,
        },
        {
          title: "Роскошная жизнь",
          mat: 280,
          slots: [2],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Stom_000",
          price: 3e3,
          id: 8,
        },
        {
          title: "Индийские символы",
          mat: 248,
          slots: [8],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Stom_001",
          price: 2e3,
          id: 9,
        },
        {
          title: "Большие деньги",
          mat: 248,
          slots: [7],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Stom_002",
          price: 2e3,
          id: 10,
        },
        {
          title: "Уважуха",
          mat: 303,
          slots: [3, 4],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Back_000",
          price: 2e3,
          id: 11,
        },
        {
          title: "Золотой кинжал",
          mat: 300,
          slots: [3, 4],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Back_001",
          price: 2500,
          id: 12,
        },
        {
          title: "Карп (контур)",
          mat: 363,
          slots: [3, 4, 5, 6],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_005",
          femalehash: "MP_Xmas2_F_Tat_005",
          price: 6250,
          id: 13,
        },
        {
          title: "Карп (тень)",
          mat: 400,
          slots: [3, 4, 5, 6],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_006",
          femalehash: "MP_Xmas2_F_Tat_006",
          price: 6250,
          id: 14,
        },
        {
          title: "Смерть пришла",
          mat: 250,
          slots: [1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_009",
          femalehash: "MP_Xmas2_F_Tat_009",
          price: 1250,
          id: 15,
        },
        {
          title: "Рычащий тигр",
          mat: 250,
          slots: [5, 6],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_011",
          femalehash: "MP_Xmas2_F_Tat_011",
          price: 2250,
          id: 16,
        },
        {
          title: "Желтый дракон",
          mat: 275,
          slots: [7],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_013",
          femalehash: "MP_Xmas2_F_Tat_013",
          price: 2e3,
          id: 17,
        },
        {
          title: "Японский воин",
          mat: 288,
          slots: [5, 6],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_015",
          femalehash: "MP_Xmas2_F_Tat_015",
          price: 2100,
          id: 18,
        },
        {
          title: "Раскрытые губы (контур)",
          mat: 225,
          slots: [0],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_016",
          femalehash: "MP_Xmas2_F_Tat_016",
          price: 1750,
          id: 19,
        },
        {
          title: "Раскрытые губы (в цвете)",
          mat: 263,
          slots: [0],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_017",
          femalehash: "MP_Xmas2_F_Tat_017",
          price: 1750,
          id: 20,
        },
        {
          title: "Королевский кинжал (Контур)",
          mat: 280,
          slots: [0, 1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_018",
          femalehash: "MP_Xmas2_F_Tat_018",
          price: 2500,
          id: 21,
        },
        {
          title: "Королевский кинжал (Цвет)",
          mat: 300,
          slots: [0, 1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_019",
          femalehash: "MP_Xmas2_F_Tat_019",
          price: 2500,
          id: 22,
        },
        {
          title: "Палач",
          mat: 313,
          slots: [2, 8],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_028",
          femalehash: "MP_Xmas2_F_Tat_028",
          price: 2e3,
          id: 23,
        },
        {
          title: "Пуленепробиваемый",
          mat: 275,
          slots: [5, 6],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_000_M",
          femalehash: "MP_Gunrunning_Tattoo_000_F",
          price: 2e3,
          id: 24,
        },
        {
          title: "Перекрещенные стволы",
          mat: 238,
          slots: [3, 4],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_001_M",
          femalehash: "MP_Gunrunning_Tattoo_001_F",
          price: 2e3,
          id: 25,
        },
        {
          title: "Нож-Бабочка",
          mat: 255,
          slots: [5, 6],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_009_M",
          femalehash: "MP_Gunrunning_Tattoo_009_F",
          price: 2250,
          id: 26,
        },
        {
          title: "Деньги илюминанты",
          mat: 350,
          slots: [2],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_010_M",
          femalehash: "MP_Gunrunning_Tattoo_010_F",
          price: 3e3,
          id: 27,
        },
        {
          title: "Кинжалы с долларами",
          mat: 363,
          slots: [1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_012_M",
          femalehash: "MP_Gunrunning_Tattoo_012_F",
          price: 1750,
          id: 28,
        },
        {
          title: "Эмблема волка",
          mat: 383,
          slots: [5, 6],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_013_M",
          femalehash: "MP_Gunrunning_Tattoo_013_F",
          price: 2250,
          id: 29,
        },
        {
          title: "Удар в спину",
          mat: 398,
          slots: [5, 6],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_014_M",
          femalehash: "MP_Gunrunning_Tattoo_014_F",
          price: 2250,
          id: 30,
        },
        {
          title: "Опознавательные жетоны",
          mat: 250,
          slots: [0, 1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_017_M",
          femalehash: "MP_Gunrunning_Tattoo_017_F",
          price: 2500,
          id: 31,
        },
        {
          title: "Череп и пистолеты",
          mat: 263,
          slots: [3, 4],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_018_M",
          femalehash: "MP_Gunrunning_Tattoo_018_F",
          price: 2250,
          id: 32,
        },
        {
          title: "Пистолеты и крылья",
          mat: 330,
          slots: [5, 6],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_019_M",
          femalehash: "MP_Gunrunning_Tattoo_019_F",
          price: 2250,
          id: 33,
        },
        {
          title: "Корона и винтовки",
          mat: 328,
          slots: [0, 1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_020_M",
          femalehash: "MP_Gunrunning_Tattoo_020_F",
          price: 2500,
          id: 34,
        },
        {
          title: "Граната-Сердце",
          mat: 338,
          slots: [5],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_022_M",
          femalehash: "MP_Gunrunning_Tattoo_022_F",
          price: 1750,
          id: 35,
        },
        {
          title: "Цепочка с микро ПП",
          mat: 300,
          slots: [0, 1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_028_M",
          femalehash: "MP_Gunrunning_Tattoo_028_F",
          price: 2500,
          id: 36,
        },
        {
          title: "Череп войны",
          mat: 400,
          slots: [2],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_029_M",
          femalehash: "MP_Gunrunning_Tattoo_029_F",
          price: 3e3,
          id: 37,
        },
        {
          title: "Скрещенные стрелы",
          mat: 250,
          slots: [5, 6],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_000",
          femalehash: "FM_Hip_F_Tat_000",
          price: 2250,
          id: 38,
        },
        {
          title: "Химия",
          mat: 200,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_002",
          femalehash: "FM_Hip_F_Tat_002",
          price: 1750,
          id: 39,
        },
        {
          title: "Птичий цветок",
          mat: 213,
          slots: [7],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_006",
          femalehash: "FM_Hip_F_Tat_006",
          price: 200,
          id: 40,
        },
        {
          title: "Бесконечность",
          mat: 205,
          slots: [5, 6],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_011",
          femalehash: "FM_Hip_F_Tat_011",
          price: 2250,
          id: 41,
        },
        {
          title: "Оленьи рога",
          mat: 218,
          slots: [5, 6],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_012",
          femalehash: "FM_Hip_F_Tat_012",
          price: 2250,
          id: 42,
        },
        {
          title: "Бумбокс",
          mat: 238,
          slots: [0, 1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_013",
          femalehash: "FM_Hip_F_Tat_013",
          price: 2500,
          id: 43,
        },
        {
          title: "Пирамида",
          mat: 233,
          slots: [6],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_024",
          femalehash: "FM_Hip_F_Tat_024",
          price: 1750,
          id: 44,
        },
        {
          title: "Watch Your Step",
          mat: 250,
          slots: [5],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_025",
          femalehash: "FM_Hip_F_Tat_025",
          price: 1750,
          id: 45,
        },
        {
          title: "Умерший эмодзи",
          mat: 210,
          slots: [2, 8],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_029",
          femalehash: "FM_Hip_F_Tat_029",
          price: 3750,
          id: 46,
        },
        {
          title: "Плавник акулы",
          mat: 188,
          slots: [3, 4],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_030",
          femalehash: "FM_Hip_F_Tat_030",
          price: 2250,
          id: 47,
        },
        {
          title: "Скейтборд",
          mat: 205,
          slots: [5, 6],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_031",
          femalehash: "FM_Hip_F_Tat_031",
          price: 2250,
          id: 48,
        },
        {
          title: "Бумажный самолет",
          mat: 193,
          slots: [6],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_032",
          femalehash: "FM_Hip_F_Tat_032",
          price: 1750,
          id: 49,
        },
        {
          title: "Олень",
          mat: 223,
          slots: [0, 1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_033",
          femalehash: "FM_Hip_F_Tat_033",
          price: 2500,
          id: 50,
        },
        {
          title: "Нить любви",
          mat: 173,
          slots: [2, 8],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_035",
          femalehash: "FM_Hip_F_Tat_035",
          price: 3750,
          id: 51,
        },
        {
          title: "Зуб",
          mat: 218,
          slots: [3],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_041",
          femalehash: "FM_Hip_F_Tat_041",
          price: 2e3,
          id: 52,
        },
        {
          title: "Треугольники",
          mat: 223,
          slots: [5, 6],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_046",
          femalehash: "FM_Hip_F_Tat_046",
          price: 2250,
          id: 53,
        },
        {
          title: "Касета",
          mat: 233,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_047",
          femalehash: "FM_Hip_F_Tat_047",
          price: 1750,
          id: 54,
        },
        {
          title: "Шестеренки",
          mat: 338,
          slots: [5, 6],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_000_M",
          femalehash: "MP_MP_ImportExport_Tat_000_F",
          price: 2250,
          id: 55,
        },
        {
          title: "Силовая установка",
          mat: 350,
          slots: [5, 6],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_001_M",
          femalehash: "MP_MP_ImportExport_Tat_001_F",
          price: 2250,
          id: 56,
        },
        {
          title: "На волне смерти",
          mat: 413,
          slots: [5, 6],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_002_M",
          femalehash: "MP_MP_ImportExport_Tat_002_F",
          price: 2250,
          id: 57,
        },
        {
          title: "Адские змеи",
          mat: 388,
          slots: [5, 6],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_009_M",
          femalehash: "MP_MP_ImportExport_Tat_009_F",
          price: 2250,
          id: 58,
        },
        {
          title: "Садись за руль",
          mat: 388,
          slots: [5, 6],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_010_M",
          femalehash: "MP_MP_ImportExport_Tat_010_F",
          price: 2250,
          id: 59,
        },
        {
          title: "Не вякай",
          mat: 425,
          slots: [5, 6],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_011_M",
          femalehash: "MP_MP_ImportExport_Tat_011_F",
          price: 2250,
          id: 60,
        },
        {
          title: "Король воинов",
          mat: 280,
          slots: [0],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_001_M",
          femalehash: "MP_LR_Tat_001_F",
          price: 1750,
          id: 61,
        },
        {
          title: "Дева Мария",
          mat: 350,
          slots: [0, 1],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_002_M",
          femalehash: "MP_LR_Tat_002_F",
          price: 2500,
          id: 62,
        },
        {
          title: "Пистолет",
          mat: 250,
          slots: [7],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_004_M",
          femalehash: "MP_LR_Tat_004_F",
          price: 2e3,
          id: 63,
        },
        {
          title: "Амазонка",
          mat: 238,
          slots: [6],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_009_M",
          femalehash: "MP_LR_Tat_009_F",
          price: 1750,
          id: 64,
        },
        {
          title: "Злой ангел",
          mat: 450,
          slots: [3, 4, 5, 6],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_010_M",
          femalehash: "MP_LR_Tat_010_F",
          price: 6e3,
          id: 65,
        },
        {
          title: "Люблю азарт",
          mat: 305,
          slots: [1],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_013_M",
          femalehash: "MP_LR_Tat_013_F",
          price: 1750,
          id: 66,
        },
        {
          title: "Любовь слепа",
          mat: 438,
          slots: [3, 4, 5, 6],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_014_M",
          femalehash: "MP_LR_Tat_014_F",
          price: 1250,
          id: 67,
        },
        {
          title: "Грустный ангел",
          mat: 413,
          slots: [3, 4, 5, 6],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_021_M",
          femalehash: "MP_LR_Tat_021_F",
          price: 5500,
          id: 68,
        },
        {
          title: "Королевский захват",
          mat: 300,
          slots: [1],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_026_M",
          femalehash: "MP_LR_Tat_026_F",
          price: 1750,
          id: 69,
        },
        {
          title: "Турбулентность",
          mat: 275,
          slots: [1],
          dictionary: "mpairraces_overlays",
          malehash: "MP_Airraces_Tattoo_000_M",
          femalehash: "MP_Airraces_Tattoo_000_F",
          price: 1750,
          id: 70,
        },
        {
          title: "Череп пилота",
          mat: 338,
          slots: [5, 6],
          dictionary: "mpairraces_overlays",
          malehash: "MP_Airraces_Tattoo_001_M",
          femalehash: "MP_Airraces_Tattoo_001_F",
          price: 2250,
          id: 71,
        },
        {
          title: "Крылатая секс-бомба",
          mat: 335,
          slots: [5, 6],
          dictionary: "mpairraces_overlays",
          malehash: "MP_Airraces_Tattoo_002_M",
          femalehash: "MP_Airraces_Tattoo_002_F",
          price: 2250,
          id: 72,
        },
        {
          title: "Воздухоплавотель",
          mat: 373,
          slots: [3, 4, 5, 6],
          dictionary: "mpairraces_overlays",
          malehash: "MP_Airraces_Tattoo_004_M",
          femalehash: "MP_Airraces_Tattoo_004_F",
          price: 5e3,
          id: 73,
        },
        {
          title: "Красавица-парашютистка",
          mat: 383,
          slots: [5, 6],
          dictionary: "mpairraces_overlays",
          malehash: "MP_Airraces_Tattoo_005_M",
          femalehash: "MP_Airraces_Tattoo_005_F",
          price: 2250,
          id: 74,
        },
        {
          title: "Бомбы прочь",
          mat: 400,
          slots: [2],
          dictionary: "mpairraces_overlays",
          malehash: "MP_Airraces_Tattoo_006_M",
          femalehash: "MP_Airraces_Tattoo_006_F",
          price: 3e3,
          id: 75,
        },
        {
          title: "Орлиный взор",
          mat: 363,
          slots: [5, 6],
          dictionary: "mpairraces_overlays",
          malehash: "MP_Airraces_Tattoo_007_M",
          femalehash: "MP_Airraces_Tattoo_007_F",
          price: 2250,
          id: 76,
        },
        {
          title: "Байкер-демон",
          mat: 275,
          slots: [0],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_000_M",
          femalehash: "MP_MP_Biker_Tat_000_F",
          price: 1750,
          id: 77,
        },
        {
          title: "Два ствола",
          mat: 250,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_001_M",
          femalehash: "MP_MP_Biker_Tat_001_F",
          price: 2500,
          id: 78,
        },
        {
          title: "Новогодний череп байкера",
          mat: 225,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_003_M",
          femalehash: "MP_MP_Biker_Tat_003_F",
          price: 3e3,
          id: 79,
        },
        {
          title: "Сделано в Америке",
          mat: 275,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_005_M",
          femalehash: "MP_MP_Biker_Tat_005_F",
          price: 2500,
          id: 80,
        },
        {
          title: "Американский байкер",
          mat: 308,
          slots: [3, 4],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_006_M",
          femalehash: "MP_MP_Biker_Tat_006_F",
          price: 2e3,
          id: 81,
        },
        {
          title: "Ангельское колесо",
          mat: 315,
          slots: [5, 6],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_008_M",
          femalehash: "MP_MP_Biker_Tat_008_F",
          price: 2250,
          id: 82,
        },
        {
          title: "Череп быка",
          mat: 280,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_010_M",
          femalehash: "MP_MP_Biker_Tat_010_F",
          price: 3250,
          id: 83,
        },
        {
          title: "Гоняй или умри",
          mat: 388,
          slots: [5, 6],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_011_M",
          femalehash: "MP_MP_Biker_Tat_011_F",
          price: 2250,
          id: 84,
        },
        {
          title: "Череп демона",
          mat: 363,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_013_M",
          femalehash: "MP_MP_Biker_Tat_013_F",
          price: 3e3,
          id: 85,
        },
        {
          title: "Дракон",
          mat: 425,
          slots: [5, 6],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_017_M",
          femalehash: "MP_MP_Biker_Tat_017_F",
          price: 2250,
          id: 86,
        },
        {
          title: "Мотоцикл скелета",
          mat: 288,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_018_M",
          femalehash: "MP_MP_Biker_Tat_018_F",
          price: 1800,
          id: 87,
        },
        {
          title: "Жуткие когти",
          mat: 300,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_019_M",
          femalehash: "MP_MP_Biker_Tat_019_F",
          price: 2750,
          id: 88,
        },
        {
          title: "Смреть в пламени",
          mat: 388,
          slots: [5, 6],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_021_M",
          femalehash: "MP_MP_Biker_Tat_021_F",
          price: 2250,
          id: 89,
        },
        {
          title: "Клуб Western",
          mat: 355,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_023_M",
          femalehash: "MP_MP_Biker_Tat_023_F",
          price: 2750,
          id: 90,
        },
        {
          title: "Американская мечта",
          mat: 350,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_026_M",
          femalehash: "MP_MP_Biker_Tat_026_F",
          price: 2650,
          id: 91,
        },
        {
          title: "Костолом",
          mat: 213,
          slots: [0],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_029_M",
          femalehash: "MP_MP_Biker_Tat_029_F",
          price: 1650,
          id: 92,
        },
        {
          title: "Братья для жизни",
          mat: 288,
          slots: [5, 6],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_030_M",
          femalehash: "MP_MP_Biker_Tat_030_F",
          price: 2300,
          id: 93,
        },
        {
          title: "Смертный завтрак",
          mat: 308,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_031_M",
          femalehash: "MP_MP_Biker_Tat_031_F",
          price: 3e3,
          id: 94,
        },
        {
          title: "Орел Western",
          mat: 313,
          slots: [0],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_032_M",
          femalehash: "MP_MP_Biker_Tat_032_F",
          price: 1800,
          id: 95,
        },
        {
          title: "Байкерское братсво",
          mat: 325,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_034_M",
          femalehash: "MP_MP_Biker_Tat_034_F",
          price: 1850,
          id: 96,
        },
        {
          title: "Накаченный череп",
          mat: 338,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_039_M",
          femalehash: "MP_MP_Biker_Tat_039_F",
          price: 2850,
          id: 97,
        },
        {
          title: "No Regrets",
          mat: 313,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_041_M",
          femalehash: "MP_MP_Biker_Tat_041_F",
          price: 2500,
          id: 98,
        },
        {
          title: "Всегда в движении",
          mat: 288,
          slots: [3, 4],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_043_M",
          femalehash: "MP_MP_Biker_Tat_043_F",
          price: 2100,
          id: 99,
        },
        {
          title: "Unforgiven",
          mat: 313,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_050_M",
          femalehash: "MP_MP_Biker_Tat_050_F",
          price: 3e3,
          id: 100,
        },
        {
          title: 'Цепочка "олень"',
          mat: 300,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_052_M",
          femalehash: "MP_MP_Biker_Tat_052_F",
          price: 2500,
          id: 101,
        },
        {
          title: "Стервятник-Жнец",
          mat: 288,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_058_M",
          femalehash: "MP_MP_Biker_Tat_058_F",
          price: 1750,
          id: 102,
        },
        {
          title: "Faggio",
          mat: 295,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_059_M",
          femalehash: "MP_MP_Biker_Tat_059_F",
          price: 1750,
          id: 103,
        },
        {
          title: "Мы-Стиляги!",
          mat: 300,
          slots: [0],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_060_M",
          femalehash: "MP_MP_Biker_Tat_060_F",
          price: 1850,
          id: 104,
        },
        {
          title: 'Ганстеры "SA"',
          mat: 475,
          slots: [3, 4, 5, 6],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_000_M",
          femalehash: "MP_LR_Tat_000_F",
          price: 5500,
          id: 105,
        },
        {
          title: "Карты, Деньги, Скелет",
          mat: 463,
          slots: [3, 4, 5, 6],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_008_M",
          femalehash: "MP_LR_Tat_008_F",
          price: 5250,
          id: 106,
        },
        {
          title: 'Статуя "Свободы"',
          mat: 300,
          slots: [7],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_011_M",
          femalehash: "MP_LR_Tat_011_F",
          price: 2100,
          id: 107,
        },
        {
          title: "Королевский поцелуй",
          mat: 310,
          slots: [0],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_012_M",
          femalehash: "MP_LR_Tat_012_F",
          price: 1750,
          id: 108,
        },
        {
          title: "Сними маску",
          mat: 300,
          slots: [2],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_016_M",
          femalehash: "MP_LR_Tat_016_F",
          price: 3100,
          id: 109,
        },
        {
          title: "Смерть за спиной",
          mat: 288,
          slots: [1],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_019_M",
          femalehash: "MP_LR_Tat_019_F",
          price: 1750,
          id: 110,
        },
        {
          title: 'Ведьма без "Обложки"',
          mat: 463,
          slots: [3, 4, 5, 6],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_031_M",
          femalehash: "MP_LR_Tat_031_F",
          price: 5250,
          id: 111,
        },
        {
          title: "Король",
          mat: 438,
          slots: [3, 4, 5, 6],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_032_M",
          femalehash: "MP_LR_Tat_032_F",
          price: 5600,
          id: 112,
        },
        {
          title: "Воровской череп",
          mat: 400,
          slots: [2],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_003_M",
          femalehash: "MP_LUXE_TAT_003_F",
          price: 2750,
          id: 113,
        },
        {
          title: "Глаз грифона",
          mat: 358,
          slots: [1],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_007_M",
          femalehash: "MP_LUXE_TAT_007_F",
          price: 1850,
          id: 114,
        },
        {
          title: "Летающий глаз",
          mat: 310,
          slots: [1],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_008_M",
          femalehash: "MP_LUXE_TAT_008_F",
          price: 1800,
          id: 115,
        },
        {
          title: "Древняя королева",
          mat: 288,
          slots: [0, 1],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_014_M",
          femalehash: "MP_LUXE_TAT_014_F",
          price: 2600,
          id: 116,
        },
        {
          title: "Сестры-Курилщицы",
          mat: 263,
          slots: [0],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_015_M",
          femalehash: "MP_LUXE_TAT_015_F",
          price: 1750,
          id: 117,
        },
        {
          title: 'Око "Рыцаря"',
          mat: 363,
          slots: [3, 4, 5, 6],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_024_M",
          femalehash: "MP_LUXE_TAT_024_F",
          price: 6250,
          id: 118,
        },
        {
          title: "Волчий вой",
          mat: 250,
          slots: [0],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_002_M",
          femalehash: "MP_LUXE_TAT_002_F",
          price: 1750,
          id: 119,
        },
        {
          title: "Геометрия",
          mat: 500,
          slots: [0, 1, 2, 8],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_012_M",
          femalehash: "MP_LUXE_TAT_012_F",
          price: 7e3,
          id: 120,
        },
        {
          title: "Рай",
          mat: 413,
          slots: [3, 4, 5, 6],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_022_M",
          femalehash: "MP_LUXE_TAT_022_F",
          price: 6e3,
          id: 121,
        },
        {
          title: "Взмах смерти",
          mat: 275,
          slots: [0],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_025_M",
          femalehash: "MP_LUXE_TAT_025_F",
          price: 1750,
          id: 122,
        },
        {
          title: "Расвет кобры",
          mat: 275,
          slots: [1],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_027_M",
          femalehash: "MP_LUXE_TAT_027_F",
          price: 1800,
          id: 123,
        },
        {
          title: "Геометрическая спина",
          mat: 475,
          slots: [3, 4, 5, 6],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_029_M",
          femalehash: "MP_LUXE_TAT_029_F",
          price: 5500,
          id: 124,
        },
        {
          title: "Благословенны мертвецы",
          mat: 288,
          slots: [1],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_000_M",
          femalehash: "MP_Smuggler_Tattoo_000_F",
          price: 1e3,
          id: 125,
        },
        {
          title: "Смертная ложь",
          mat: 340,
          slots: [2],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_002_M",
          femalehash: "MP_Smuggler_Tattoo_002_F",
          price: 3e3,
          id: 126,
        },
        {
          title: "Ничего не возвращай",
          mat: 300,
          slots: [5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_003_M",
          femalehash: "MP_Smuggler_Tattoo_003_F",
          price: 2e3,
          id: 127,
        },
        {
          title: "Никогда не сдавайся",
          mat: 300,
          slots: [5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_006_M",
          femalehash: "MP_Smuggler_Tattoo_006_F",
          price: 2100,
          id: 128,
        },
        {
          title: "Бесчестный",
          mat: 313,
          slots: [0, 1],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_007_M",
          femalehash: "MP_Smuggler_Tattoo_007_F",
          price: 2500,
          id: 129,
        },
        {
          title: "Пиратский трехпалубный корабль",
          mat: 363,
          slots: [5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_009_M",
          femalehash: "MP_Smuggler_Tattoo_009_F",
          price: 2e3,
          id: 130,
        },
        {
          title: "Увидимся в аду!",
          mat: 338,
          slots: [2],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_010_M",
          femalehash: "MP_Smuggler_Tattoo_010_F",
          price: 3e3,
          id: 131,
        },
        {
          title: "Оторванные крылья",
          mat: 300,
          slots: [5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_013_M",
          femalehash: "MP_Smuggler_Tattoo_013_F",
          price: 2100,
          id: 132,
        },
        {
          title: "Череп пирата",
          mat: 318,
          slots: [2],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_015_M",
          femalehash: "MP_Smuggler_Tattoo_015_F",
          price: 3e3,
          id: 133,
        },
        {
          title: "Компас",
          mat: 313,
          slots: [5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_016_M",
          femalehash: "MP_Smuggler_Tattoo_016_F",
          price: 2e3,
          id: 134,
        },
        {
          title: "Большой корабль пиратов",
          mat: 498,
          slots: [3, 4, 5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_017_M",
          femalehash: "MP_Smuggler_Tattoo_017_F",
          price: 5500,
          id: 135,
        },
        {
          title: "Охранник сокровищ",
          mat: 508,
          slots: [3, 4, 5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_018_M",
          femalehash: "MP_Smuggler_Tattoo_018_F",
          price: 6e3,
          id: 136,
        },
        {
          title: "Потерявшийся в море",
          mat: 288,
          slots: [0],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_019_M",
          femalehash: "MP_Smuggler_Tattoo_019_F",
          price: 1750,
          id: 137,
        },
        {
          title: "Сказки мертвеца",
          mat: 313,
          slots: [0, 1],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_021_M",
          femalehash: "MP_Smuggler_Tattoo_021_F",
          price: 2e3,
          id: 138,
        },
        {
          title: "Карта сокровищ",
          mat: 238,
          slots: [5],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_022_M",
          femalehash: "MP_Smuggler_Tattoo_022_F",
          price: 1750,
          id: 139,
        },
        {
          title: "Капитан пиратов",
          mat: 488,
          slots: [3, 4, 5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_024_M",
          femalehash: "MP_Smuggler_Tattoo_024_F",
          price: 5500,
          id: 140,
        },
        {
          title: "Нападения кракена",
          mat: 500,
          slots: [3, 4, 5, 6],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_025_M",
          femalehash: "MP_Smuggler_Tattoo_025_F",
          price: 5500,
          id: 141,
        },
        {
          title: "Колеса смерти",
          mat: 308,
          slots: [0, 1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_011_M",
          femalehash: "MP_MP_Stunt_Tat_011_F",
          price: 2e3,
          id: 142,
        },
        {
          title: "Трюкач",
          mat: 338,
          slots: [7],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_012_M",
          femalehash: "MP_MP_Stunt_Tat_012_F",
          price: 2e3,
          id: 143,
        },
        {
          title: "Страшный кот",
          mat: 375,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_014_M",
          femalehash: "MP_MP_Stunt_Tat_014_F",
          price: 3100,
          id: 144,
        },
        {
          title: "Винтажный громила",
          mat: 330,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_018_M",
          femalehash: "MP_MP_Stunt_Tat_018_F",
          price: 1750,
          id: 145,
        },
        {
          title: "Сердце двигатель",
          mat: 328,
          slots: [1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_019_M",
          femalehash: "MP_MP_Stunt_Tat_019_F",
          price: 1750,
          id: 146,
        },
        {
          title: "Следы шин",
          mat: 438,
          slots: [3, 4, 5, 6],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_024_M",
          femalehash: "MP_MP_Stunt_Tat_024_F",
          price: 5e3,
          id: 147,
        },
        {
          title: "Неземные колеса",
          mat: 363,
          slots: [5, 6],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_026_M",
          femalehash: "MP_MP_Stunt_Tat_026_F",
          price: 2e3,
          id: 148,
        },
        {
          title: "Дорожный-свин",
          mat: 338,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_027_M",
          femalehash: "MP_MP_Stunt_Tat_027_F",
          price: 1750,
          id: 149,
        },
        {
          title: "Финиш",
          mat: 340,
          slots: [3, 4],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_029_M",
          femalehash: "MP_MP_Stunt_Tat_029_F",
          price: 2e3,
          id: 150,
        },
        {
          title: "Человеческая гибель",
          mat: 335,
          slots: [6],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_030_M",
          femalehash: "MP_MP_Stunt_Tat_030_F",
          price: 2100,
          id: 151,
        },
        {
          title: "Калавера дальнобоя ",
          mat: 325,
          slots: [1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_033_M",
          femalehash: "MP_MP_Stunt_Tat_033_F",
          price: 1750,
          id: 152,
        },
        {
          title: "Затертые следы шин",
          mat: 413,
          slots: [3, 4, 5, 6],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_034_M",
          femalehash: "MP_MP_Stunt_Tat_034_F",
          price: 1250,
          id: 153,
        },
        {
          title: "Зубастое авто",
          mat: 280,
          slots: [5],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_037_M",
          femalehash: "MP_MP_Stunt_Tat_037_F",
          price: 1750,
          id: 154,
        },
        {
          title: "Мартышка байкер",
          mat: 350,
          slots: [5, 6],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_040_M",
          femalehash: "MP_MP_Stunt_Tat_040_F",
          price: 2e3,
          id: 155,
        },
        {
          title: "Одно целое",
          mat: 363,
          slots: [5, 6],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_041_M",
          femalehash: "MP_MP_Stunt_Tat_041_F",
          price: 2e3,
          id: 156,
        },
        {
          title: "Череп барана",
          mat: 400,
          slots: [0, 1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_044_M",
          femalehash: "MP_MP_Stunt_Tat_044_F",
          price: 2e3,
          id: 157,
        },
        {
          title: "Рулетка",
          mat: 388,
          slots: [5, 6],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_046_M",
          femalehash: "MP_MP_Stunt_Tat_046_F",
          price: 2100,
          id: 158,
        },
        {
          title: "Сладкий конец",
          mat: 413,
          slots: [5, 6],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_048_M",
          femalehash: "MP_MP_Stunt_Tat_048_F",
          price: 2100,
          id: 159,
        },
        {
          title: "Блэк-Джек",
          mat: 300,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_003",
          femalehash: "FM_Tat_Award_F_003",
          price: 1800,
          id: 160,
        },
        {
          title: "Карманник",
          mat: 388,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_004",
          femalehash: "FM_Tat_Award_F_004",
          price: 3250,
          id: 161,
        },
        {
          title: "Уставший янгол",
          mat: 425,
          slots: [5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_005",
          femalehash: "FM_Tat_Award_F_005",
          price: 2100,
          id: 162,
        },
        {
          title: "Лос Сантос Кастомс",
          mat: 313,
          slots: [3, 4],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_008",
          femalehash: "FM_Tat_Award_F_008",
          price: 8400,
          id: 163,
        },
        {
          title: "Чистый свиток",
          mat: 308,
          slots: [1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_011",
          femalehash: "FM_Tat_Award_F_011",
          price: 1800,
          id: 164,
        },
        {
          title: "Разукрашенный свиток",
          mat: 325,
          slots: [1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_012",
          femalehash: "FM_Tat_Award_F_012",
          price: 1800,
          id: 165,
        },
        {
          title: "Семь смертных грехов",
          mat: 338,
          slots: [1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_013",
          femalehash: "FM_Tat_Award_F_013",
          price: 1800,
          id: 166,
        },
        {
          title: "Ещё не конец",
          mat: 288,
          slots: [3, 4],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_014",
          femalehash: "FM_Tat_Award_F_014",
          price: 2100,
          id: 167,
        },
        {
          title: "Зловещий клоун",
          mat: 338,
          slots: [5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_016",
          femalehash: "FM_Tat_Award_F_016",
          price: 2e3,
          id: 168,
        },
        {
          title: "Зловещий клоун с револьвером",
          mat: 363,
          slots: [5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_017",
          femalehash: "FM_Tat_Award_F_017",
          price: 2100,
          id: 169,
        },
        {
          title: "Зловещий клоун с револьверами",
          mat: 388,
          slots: [5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_018",
          femalehash: "FM_Tat_Award_F_018",
          price: 2e3,
          id: 170,
        },
        {
          title: "Денежный клоун с револьверами",
          mat: 413,
          slots: [5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_019",
          femalehash: "FM_Tat_Award_F_019",
          price: 2100,
          id: 171,
        },
        {
          title: "Вера",
          mat: 468,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_004",
          femalehash: "FM_Tat_F_004",
          price: 3100,
          id: 172,
        },
        {
          title: "Мертвый крест",
          mat: 438,
          slots: [3, 4, 5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_009",
          femalehash: "FM_Tat_F_009",
          price: 6e3,
          id: 173,
        },
        {
          title: "Огни ЛС",
          mat: 250,
          slots: [1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_010",
          femalehash: "FM_Tat_F_010",
          price: 1800,
          id: 174,
        },
        {
          title: "ЛС",
          mat: 225,
          slots: [5],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_011",
          femalehash: "FM_Tat_F_011",
          price: 2100,
          id: 175,
        },
        {
          title: "Город грехов",
          mat: 475,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_012",
          femalehash: "FM_Tat_F_012",
          price: 3e3,
          id: 176,
        },
        {
          title: "Единство",
          mat: 308,
          slots: [6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_013",
          femalehash: "FM_Tat_F_013",
          price: 2100,
          id: 177,
        },
        {
          title: "Спи спокойно",
          mat: 443,
          slots: [3, 4, 5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_016",
          femalehash: "FM_Tat_F_016",
          price: 5750,
          id: 178,
        },
        {
          title: "Смерть - плата за грех",
          mat: 463,
          slots: [3, 4, 5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_019",
          femalehash: "FM_Tat_F_019",
          price: 5500,
          id: 179,
        },
        {
          title: "Дракон",
          mat: 438,
          slots: [3, 4, 5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_020",
          femalehash: "FM_Tat_F_020",
          price: 5e3,
          id: 180,
        },
        {
          title: "Пылающий крест",
          mat: 350,
          slots: [0, 1, 2, 8],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_024",
          femalehash: "FM_Tat_F_024",
          price: 6750,
          id: 181,
        },
        {
          title: "ЛС (Жирный шрифт)",
          mat: 363,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_025",
          femalehash: "FM_Tat_F_025",
          price: 1800,
          id: 182,
        },
        {
          title: "Треугольник",
          mat: 250,
          slots: [2, 8],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_029",
          femalehash: "FM_Tat_F_029",
          price: 4100,
          id: 183,
        },
        {
          title: "Ворота в рай",
          mat: 288,
          slots: [5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_030",
          femalehash: "FM_Tat_F_030",
          price: 2100,
          id: 184,
        },
        {
          title: "Горящий клевер",
          mat: 325,
          slots: [1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_034",
          femalehash: "FM_Tat_F_034",
          price: 1700,
          id: 185,
        },
        {
          title: "Скрещенные револьверы",
          mat: 363,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_036",
          femalehash: "FM_Tat_F_036",
          price: 3e3,
          id: 186,
        },
        {
          title: "Каменный крест",
          mat: 403,
          slots: [0, 1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_044",
          femalehash: "FM_Tat_F_044",
          price: 2100,
          id: 187,
        },
        {
          title: "Зло",
          mat: 473,
          slots: [3, 4, 5, 6],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_045",
          femalehash: "FM_Tat_F_045",
          price: 5500,
          id: 188,
        },
      ],
      head: [
        {
          title: "Богатей",
          mat: 163,
          slots: [0],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_Neck_000",
          femalehash: "",
          price: 1750,
          id: 189,
        },
        {
          title: "Жирный знак доллара",
          mat: 125,
          slots: [1],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_Neck_001",
          femalehash: "",
          price: 1750,
          id: 190,
        },
        {
          title: "Знак доллара (Курсив)",
          mat: 150,
          slots: [2],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_Neck_002",
          femalehash: "",
          price: 1750,
          id: 191,
        },
        {
          title: "100$",
          mat: 188,
          slots: [3],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_Neck_003",
          femalehash: "",
          price: 1750,
          id: 192,
        },
        {
          title: "УДА",
          mat: 175,
          slots: [1],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Neck_000",
          price: 1750,
          id: 193,
        },
        {
          title: "Печень",
          mat: 183,
          slots: [2],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_Neck_001",
          price: 1750,
          id: 194,
        },
        {
          title: "Western (Стилизованная)",
          mat: 200,
          slots: [2],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_007",
          femalehash: "MP_Xmas2_F_Tat_007",
          price: 1750,
          id: 195,
        },
        {
          title: "Голова змеи (контур)",
          mat: 138,
          slots: [1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_024",
          femalehash: "MP_Xmas2_F_Tat_024",
          price: 1750,
          id: 196,
        },
        {
          title: "Голова змеи (цвет)",
          mat: 188,
          slots: [1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_025",
          femalehash: "MP_Xmas2_F_Tat_025",
          price: 1750,
          id: 197,
        },
        {
          title: "Красивая смерть",
          mat: 188,
          slots: [2],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_029",
          femalehash: "MP_Xmas2_F_Tat_029",
          price: 1750,
          id: 198,
        },
        {
          title: "Оружие к бою",
          mat: 113,
          slots: [1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_003_M",
          femalehash: "MP_Gunrunning_Tattoo_003_F",
          price: 1750,
          id: 199,
        },
        {
          title: "Глаз",
          mat: 113,
          slots: [2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_005",
          femalehash: "FM_Hip_F_Tat_005",
          price: 1750,
          id: 200,
        },
        {
          title: "Узор Fox",
          mat: 125,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_021",
          femalehash: "FM_Hip_F_Tat_021",
          price: 1750,
          id: 201,
        },
        {
          title: "Паук",
          mat: 150,
          slots: [5],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_009_M",
          femalehash: "MP_MP_Biker_Tat_009_F",
          price: 1750,
          id: 202,
        },
        {
          title: "FTW",
          mat: 163,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_038_M",
          femalehash: "MP_MP_Biker_Tat_038_F",
          price: 1750,
          id: 203,
        },
        {
          title: "Вестерн",
          mat: 143,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_051_M",
          femalehash: "MP_MP_Biker_Tat_051_F",
          price: 1750,
          id: 204,
        },
        {
          title: "Каракули сатаны",
          mat: 113,
          slots: [1],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_011_M",
          femalehash: "MP_Smuggler_Tattoo_011_F",
          price: 1750,
          id: 205,
        },
        {
          title: "Вор",
          mat: 138,
          slots: [2],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_012_M",
          femalehash: "MP_Smuggler_Tattoo_012_F",
          price: 1750,
          id: 206,
        },
        {
          title: "Череп Каскадер",
          mat: 200,
          slots: [1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_000_M",
          femalehash: "MP_MP_Stunt_Tat_000_F",
          price: 1750,
          id: 207,
        },
        {
          title: "Скорпион",
          mat: 150,
          slots: [5],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_004_M",
          femalehash: "MP_MP_Stunt_Tat_004_F",
          price: 200,
          id: 208,
        },
        {
          title: "Ядовитый паук",
          mat: 175,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_006_M",
          femalehash: "MP_MP_Stunt_Tat_006_F",
          price: 200,
          id: 209,
        },
        {
          title: "Колесо Летучая мышь",
          mat: 163,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_017_M",
          femalehash: "MP_MP_Stunt_Tat_017_F",
          price: 200,
          id: 210,
        },
        {
          title: "Огненый квадроцикл",
          mat: 188,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_042_M",
          femalehash: "MP_MP_Stunt_Tat_042_F",
          price: 1750,
          id: 211,
        },
      ],
      leftarm: [
        {
          title: "100$",
          mat: 175,
          slots: [1],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_LeftArm_000",
          femalehash: "",
          price: 1850,
          id: 212,
        },
        {
          title: "Массонский глаз ",
          mat: 225,
          slots: [1, -1],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_LeftArm_001",
          femalehash: "",
          price: 780,
          id: 213,
        },
        {
          title: "Любовь",
          mat: 363,
          slots: [1],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_LArm_000",
          price: 1800,
          id: 214,
        },
        {
          title: "Всадник - череп",
          mat: 288,
          slots: [1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_000",
          femalehash: "MP_Xmas2_F_Tat_000",
          price: 1850,
          id: 215,
        },
        {
          title: "Гремучая змея",
          mat: 288,
          slots: [1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_010",
          femalehash: "MP_Xmas2_F_Tat_010",
          price: 1800,
          id: 216,
        },
        {
          title: "Удачи!",
          mat: 300,
          slots: [2],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_012",
          femalehash: "MP_Xmas2_F_Tat_012",
          price: 1900,
          id: 217,
        },
        {
          title: "Время вставать (контур)",
          mat: 213,
          slots: [0],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_020",
          femalehash: "MP_Xmas2_F_Tat_020",
          price: 1300,
          id: 218,
        },
        {
          title: "Время вставать (в цвете)",
          mat: 250,
          slots: [0],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_021",
          femalehash: "MP_Xmas2_F_Tat_021",
          price: 1300,
          id: 219,
        },
        {
          title: "Пистолет",
          mat: 238,
          slots: [0],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_004_M",
          femalehash: "MP_Gunrunning_Tattoo_004_F",
          price: 1350,
          id: 220,
        },
        {
          title: "Патронтаж",
          mat: 300,
          slots: [2],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_008_M",
          femalehash: "MP_Gunrunning_Tattoo_008_F",
          price: 1780,
          id: 221,
        },
        {
          title: "Череп на шипе",
          mat: 748,
          slots: [1, 2],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_015_M",
          femalehash: "MP_Gunrunning_Tattoo_015_F",
          price: 3800,
          id: 222,
        },
        {
          title: "Грязные деньги ",
          mat: 300,
          slots: [2],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_016_M",
          femalehash: "MP_Gunrunning_Tattoo_016_F",
          price: 1800,
          id: 223,
        },
        {
          title: "Молящийся череп",
          mat: 373,
          slots: [1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_025_M",
          femalehash: "MP_Gunrunning_Tattoo_025_F",
          price: 1800,
          id: 224,
        },
        {
          title: "Змеиный револьвер",
          mat: 25,
          slots: [2],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_027_M",
          femalehash: "MP_Gunrunning_Tattoo_027_F",
          price: 1850,
          id: 225,
        },
        {
          title: "Бриллиант",
          mat: 248,
          slots: [1, -1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_003",
          femalehash: "FM_Hip_F_Tat_003",
          price: 1800,
          id: 226,
        },
        {
          title: "Чешуя",
          mat: 215,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_007",
          femalehash: "FM_Hip_F_Tat_007",
          price: 1300,
          id: 227,
        },
        {
          title: "Усы",
          mat: 163,
          slots: [2, -1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_015",
          femalehash: "FM_Hip_F_Tat_015",
          price: 1800,
          id: 228,
        },
        {
          title: "Молния",
          mat: 188,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_016",
          femalehash: "FM_Hip_F_Tat_016",
          price: 1800,
          id: 229,
        },
        {
          title: "Пицца",
          mat: 238,
          slots: [2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_026",
          femalehash: "FM_Hip_F_Tat_026",
          price: 1800,
          id: 230,
        },
        {
          title: "Закрытое сердце",
          mat: 213,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_027",
          femalehash: "FM_Hip_F_Tat_027",
          price: 2e3,
          id: 231,
        },
        {
          title: "Роза",
          mat: 233,
          slots: [1, -1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_028",
          femalehash: "FM_Hip_F_Tat_028",
          price: 2e3,
          id: 232,
        },
        {
          title: "Знак стоп",
          mat: 213,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_034",
          femalehash: "FM_Hip_F_Tat_034",
          price: 1250,
          id: 233,
        },
        {
          title: "Восход",
          mat: 193,
          slots: [2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_037",
          femalehash: "FM_Hip_F_Tat_037",
          price: 1850,
          id: 234,
        },
        {
          title: "Рукав",
          mat: 788,
          slots: [1, 2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_039",
          femalehash: "FM_Hip_F_Tat_039",
          price: 4500,
          id: 235,
        },
        {
          title: "Треугольники",
          mat: 198,
          slots: [2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_043",
          femalehash: "FM_Hip_F_Tat_043",
          price: 1850,
          id: 236,
        },
        {
          title: "Мир",
          mat: 178,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_048",
          femalehash: "FM_Hip_F_Tat_048",
          price: 1300,
          id: 237,
        },
        {
          title: "Рукав на поршнях",
          mat: 763,
          slots: [1, 2],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_004_M",
          femalehash: "MP_MP_ImportExport_Tat_004_F",
          price: 3800,
          id: 238,
        },
        {
          title: "Скарлетт",
          mat: 775,
          slots: [1, 2],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_008_M",
          femalehash: "MP_MP_ImportExport_Tat_008_F",
          price: 3750,
          id: 239,
        },
        {
          title: "Нет зла",
          mat: 388,
          slots: [1],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_005_M",
          femalehash: "MP_LR_Tat_005_F",
          price: 1780,
          id: 240,
        },
        {
          title: "Жизнь в Лос Сантосе",
          mat: 470,
          slots: [2],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_027_M",
          femalehash: "MP_LR_Tat_027_F",
          price: 1800,
          id: 241,
        },
        {
          title: "Городская печаль",
          mat: 720,
          slots: [1, 2],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_033_M",
          femalehash: "MP_LR_Tat_033_F",
          price: 3800,
          id: 242,
        },
        {
          title: "Смертоносное небо",
          mat: 738,
          slots: [1, 2],
          dictionary: "mpairraces_overlays",
          malehash: "MP_Airraces_Tattoo_003_M",
          femalehash: "MP_Airraces_Tattoo_003_F",
          price: 15700,
          id: 243,
        },
        {
          title: "Городской трюкач",
          mat: 333,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_012_M",
          femalehash: "MP_MP_Biker_Tat_012_F",
          price: 1850,
          id: 244,
        },
        {
          title: "Чар-древо",
          mat: 388,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_016_M",
          femalehash: "MP_MP_Biker_Tat_016_F",
          price: 2e3,
          id: 245,
        },
        {
          title: "Череп кусающий розу",
          mat: 498,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_020_M",
          femalehash: "MP_MP_Biker_Tat_020_F",
          price: 1800,
          id: 246,
        },
        {
          title: "Вечеринка скелетов",
          mat: 583,
          slots: [1, 2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_024_M",
          femalehash: "MP_MP_Biker_Tat_024_F",
          price: 3800,
          id: 247,
        },
        {
          title: "Большая удача",
          mat: 360,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_025_M",
          femalehash: "MP_MP_Biker_Tat_025_F",
          price: 1100,
          id: 248,
        },
        {
          title: "Цепь в кулаке",
          mat: 275,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_035_M",
          femalehash: "MP_MP_Biker_Tat_035_F",
          price: 1600,
          id: 249,
        },
        {
          title: "Едь жёстко, умри быстро",
          mat: 360,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_045_M",
          femalehash: "MP_MP_Biker_Tat_045_F",
          price: 1800,
          id: 250,
        },
        {
          title: "Рука двигатель",
          mat: 413,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_053_M",
          femalehash: "MP_MP_Biker_Tat_053_F",
          price: 1850,
          id: 251,
        },
        {
          title: "Скорпион",
          mat: 443,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_055_M",
          femalehash: "MP_MP_Biker_Tat_055_F",
          price: 1800,
          id: 252,
        },
        {
          title: "Дева Мария",
          mat: 463,
          slots: [2],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_006_M",
          femalehash: "MP_LR_Tat_006_F",
          price: 1800,
          id: 253,
        },
        {
          title: "Тусовка скелетов",
          mat: 750,
          slots: [1, 2],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_018_M",
          femalehash: "MP_LR_Tat_018_F",
          price: 3700,
          id: 254,
        },
        {
          title: "Печальный скелет",
          mat: 425,
          slots: [1],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_022_M",
          femalehash: "MP_LR_Tat_022_F",
          price: 1850,
          id: 255,
        },
        {
          title: "Иконка",
          mat: 375,
          slots: [2],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_020_M",
          femalehash: "MP_LUXE_TAT_020_F",
          price: 1800,
          id: 256,
        },
        {
          title: "Архангел и Мария",
          mat: 300,
          slots: [1],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_021_M",
          femalehash: "MP_LUXE_TAT_021_F",
          price: 1800,
          id: 257,
        },
        {
          title: "Кинжал проткнувший голову",
          mat: 350,
          slots: [1, -1],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_005_M",
          femalehash: "MP_LUXE_TAT_005_F",
          price: 1800,
          id: 258,
        },
        {
          title: "Египетская фреска",
          mat: 363,
          slots: [1],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_016_M",
          femalehash: "MP_LUXE_TAT_016_F",
          price: 1780,
          id: 259,
        },
        {
          title: "Печальная императрица",
          mat: 470,
          slots: [2],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_018_M",
          femalehash: "MP_LUXE_TAT_018_F",
          price: 1780,
          id: 260,
        },
        {
          title: "Череп питона",
          mat: 363,
          slots: [1],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_028_M",
          femalehash: "MP_LUXE_TAT_028_F",
          price: 1850,
          id: 261,
        },
        {
          title: "Рукав геометрия",
          mat: 623,
          slots: [1, 2],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_031_M",
          femalehash: "MP_LUXE_TAT_031_F",
          price: 3800,
          id: 262,
        },
        {
          title: "Честь",
          mat: 333,
          slots: [1],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_004_M",
          femalehash: "MP_Smuggler_Tattoo_004_F",
          price: 1800,
          id: 263,
        },
        {
          title: "Кракен",
          mat: 525,
          slots: [1],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_008_M",
          femalehash: "MP_Smuggler_Tattoo_008_F",
          price: 1850,
          id: 264,
        },
        {
          title: "Мертвая русалка",
          mat: 745,
          slots: [1, 2],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_014_M",
          femalehash: "MP_Smuggler_Tattoo_014_F",
          price: 3800,
          id: 265,
        },
        {
          title: "Удачливый череп",
          mat: 350,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_001_M",
          femalehash: "MP_MP_Stunt_Tat_001_F",
          price: 1750,
          id: 266,
        },
        {
          title: "Огромный кот",
          mat: 250,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_002_M",
          femalehash: "MP_MP_Stunt_Tat_002_F",
          price: 1250,
          id: 267,
        },
        {
          title: "Поездка под луной",
          mat: 358,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_008_M",
          femalehash: "MP_MP_Stunt_Tat_008_F",
          price: 1800,
          id: 268,
        },
        {
          title: "Гаражный мастер",
          mat: 443,
          slots: [1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_022_M",
          femalehash: "MP_MP_Stunt_Tat_022_F",
          price: 1800,
          id: 269,
        },
        {
          title: "Переукись азота",
          mat: 693,
          slots: [1, 2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_023_M",
          femalehash: "MP_MP_Stunt_Tat_023_F",
          price: 3750,
          id: 270,
        },
        {
          title: "Конец жизни байкера",
          mat: 388,
          slots: [1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_035_M",
          femalehash: "MP_MP_Stunt_Tat_035_F",
          price: 1800,
          id: 271,
        },
        {
          title: "БУМ!",
          mat: 363,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_039_M",
          femalehash: "MP_MP_Stunt_Tat_039_F",
          price: 1850,
          id: 272,
        },
        {
          title: "Двигатель",
          mat: 470,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_043_M",
          femalehash: "MP_MP_Stunt_Tat_043_F",
          price: 1800,
          id: 273,
        },
        {
          title: "Горящее сердце",
          mat: 360,
          slots: [1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_001",
          femalehash: "FM_Tat_Award_F_001",
          price: 1850,
          id: 274,
        },
        {
          title: "Блондика ",
          mat: 525,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_007",
          femalehash: "FM_Tat_Award_F_007",
          price: 1850,
          id: 275,
        },
        {
          title: "Брюнетка",
          mat: 525,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_015",
          femalehash: "FM_Tat_Award_F_015",
          price: 1850,
          id: 276,
        },
        {
          title: "Сухой лес",
          mat: 600,
          slots: [1, 2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_005",
          femalehash: "FM_Tat_F_005",
          price: 1780,
          id: 277,
        },
        {
          title: "Змеи",
          mat: 600,
          slots: [1, 2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_006",
          femalehash: "FM_Tat_F_006",
          price: 3800,
          id: 278,
        },
        {
          title: "Череп со знаками зодиака",
          mat: 403,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_015",
          femalehash: "FM_Tat_F_015",
          price: 1800,
          id: 279,
        },
        {
          title: "Леди М",
          mat: 638,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_031",
          femalehash: "FM_Tat_F_031",
          price: 1850,
          id: 280,
        },
        {
          title: "Капитан",
          mat: 350,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_041",
          femalehash: "FM_Tat_F_041",
          price: 1800,
          id: 281,
        },
      ],
      rightarm: [
        {
          title: "Череп с долларом",
          mat: 413,
          slots: [2],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_RightArm_000",
          femalehash: "",
          price: 1780,
          id: 282,
        },
        {
          title: "Зелень",
          mat: 438,
          slots: [1],
          dictionary: "mpbusiness_overlays",
          malehash: "MP_Buis_M_RightArm_001",
          femalehash: "",
          price: 1780,
          id: 283,
        },
        {
          title: "Любовь",
          mat: 363,
          slots: [1],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_RArm_000",
          price: 1800,
          id: 284,
        },
        {
          title: "Змея (контур)",
          mat: 575,
          slots: [2],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_003",
          femalehash: "MP_Xmas2_F_Tat_003",
          price: 1780,
          id: 285,
        },
        {
          title: "Змея (тень)",
          mat: 625,
          slots: [2],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_004",
          femalehash: "MP_Xmas2_F_Tat_004",
          price: 1850,
          id: 286,
        },
        {
          title: "Смерть бесчестна",
          mat: 500,
          slots: [1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_008",
          femalehash: "MP_Xmas2_F_Tat_008",
          price: 1800,
          id: 287,
        },
        {
          title: "Ты следующий",
          mat: 450,
          slots: [1, -1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_022",
          femalehash: "MP_Xmas2_F_Tat_022",
          price: 850,
          id: 288,
        },
        {
          title: "Ты следующий (в цвете)",
          mat: 500,
          slots: [1, -1],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_023",
          femalehash: "MP_Xmas2_F_Tat_023",
          price: 1800,
          id: 289,
        },
        {
          title: "Гребанная удача",
          mat: 333,
          slots: [0],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_026",
          femalehash: "MP_Xmas2_F_Tat_026",
          price: 1250,
          id: 290,
        },
        {
          title: "Гребанная удача (в цвете)",
          mat: 388,
          slots: [0],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_027",
          femalehash: "MP_Xmas2_F_Tat_027",
          price: 1250,
          id: 291,
        },
        {
          title: "Граната",
          mat: 325,
          slots: [0],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_002_M",
          femalehash: "MP_Gunrunning_Tattoo_002_F",
          price: 1250,
          id: 292,
        },
        {
          title: "Хорошего дня!",
          mat: 363,
          slots: [2],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_021_M",
          femalehash: "MP_Gunrunning_Tattoo_021_F",
          price: 1780,
          id: 293,
        },
        {
          title: "Спецназ",
          mat: 488,
          slots: [1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_024_M",
          femalehash: "MP_Gunrunning_Tattoo_024_F",
          price: 1850,
          id: 294,
        },
        {
          title: "Стрела",
          mat: 225,
          slots: [2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_001",
          femalehash: "FM_Hip_F_Tat_001",
          price: 1800,
          id: 295,
        },
        {
          title: "Кость",
          mat: 238,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_004",
          femalehash: "FM_Hip_F_Tat_004",
          price: 1800,
          id: 296,
        },
        {
          title: "Куб",
          mat: 275,
          slots: [2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_008",
          femalehash: "FM_Hip_F_Tat_008",
          price: 1800,
          id: 297,
        },
        {
          title: "Подкова",
          mat: 275,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_010",
          femalehash: "FM_Hip_F_Tat_010",
          price: 1250,
          id: 298,
        },
        {
          title: "Балончик",
          mat: 300,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_014",
          femalehash: "FM_Hip_F_Tat_014",
          price: 1800,
          id: 299,
        },
        {
          title: "Глаз",
          mat: 350,
          slots: [1, -1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_017",
          femalehash: "FM_Hip_F_Tat_017",
          price: 1850,
          id: 300,
        },
        {
          title: "Оригами",
          mat: 213,
          slots: [1, -1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_018",
          femalehash: "FM_Hip_F_Tat_018",
          price: 1800,
          id: 301,
        },
        {
          title: "Симметрический локоть",
          mat: 363,
          slots: [1, -1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_020",
          femalehash: "FM_Hip_F_Tat_020",
          price: 3800,
          id: 302,
        },
        {
          title: "Карандаш",
          mat: 53,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_022",
          femalehash: "FM_Hip_F_Tat_022",
          price: 1800,
          id: 303,
        },
        {
          title: "Щасливый",
          mat: 400,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_023",
          femalehash: "FM_Hip_F_Tat_023",
          price: 1300,
          id: 304,
        },
        {
          title: "Фигуры",
          mat: 300,
          slots: [2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_036",
          femalehash: "FM_Hip_F_Tat_036",
          price: 1800,
          id: 305,
        },
        {
          title: "Треугольники",
          mat: 325,
          slots: [2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_044",
          femalehash: "FM_Hip_F_Tat_044",
          price: 1800,
          id: 306,
        },
        {
          title: "Сетка",
          mat: 275,
          slots: [1],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_045",
          femalehash: "FM_Hip_F_Tat_045",
          price: 1850,
          id: 307,
        },
        {
          title: "Механический рукав",
          mat: 675,
          slots: [1, 2],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_003_M",
          femalehash: "MP_MP_ImportExport_Tat_003_F",
          price: 3800,
          id: 308,
        },
        {
          title: "Оточенный",
          mat: 700,
          slots: [1, 2],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_005_M",
          femalehash: "MP_MP_ImportExport_Tat_005_F",
          price: 3850,
          id: 309,
        },
        {
          title: "В огне",
          mat: 688,
          slots: [1, 2],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_006_M",
          femalehash: "MP_MP_ImportExport_Tat_006_F",
          price: 3800,
          id: 310,
        },
        {
          title: "Вечный путь",
          mat: 720,
          slots: [1, 2],
          dictionary: "mpimportexport_overlays",
          malehash: "MP_MP_ImportExport_Tat_007_M",
          femalehash: "MP_MP_ImportExport_Tat_007_F",
          price: 3800,
          id: 311,
        },
        {
          title: "Любимая",
          mat: 375,
          slots: [1],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_015_M",
          femalehash: "MP_LR_Tat_015_F",
          price: 1980,
          id: 312,
        },
        {
          title: "Крылья",
          mat: 388,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_007_M",
          femalehash: "MP_MP_Biker_Tat_007_F",
          price: 1800,
          id: 313,
        },
        {
          title: "Статуя свободы",
          mat: 550,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_014_M",
          femalehash: "MP_MP_Biker_Tat_014_F",
          price: 1850,
          id: 314,
        },
        {
          title: "Орел",
          mat: 325,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_033_M",
          femalehash: "MP_MP_Biker_Tat_033_F",
          price: 1980,
          id: 315,
        },
        {
          title: "Адский мотоцикл",
          mat: 470,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_042_M",
          femalehash: "MP_MP_Biker_Tat_042_F",
          price: 1850,
          id: 316,
        },
        {
          title: "Череп на цепи",
          mat: 325,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_046_M",
          femalehash: "MP_MP_Biker_Tat_046_F",
          price: 1800,
          id: 317,
        },
        {
          title: "Змеиный укус",
          mat: 650,
          slots: [1, 2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_047_M",
          femalehash: "MP_MP_Biker_Tat_047_F",
          price: 3800,
          id: 318,
        },
        {
          title: "Эти цвета не убегают",
          mat: 443,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_049_M",
          femalehash: "MP_MP_Biker_Tat_049_F",
          price: 1800,
          id: 319,
        },
        {
          title: "Мать",
          mat: 588,
          slots: [2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_054_M",
          femalehash: "MP_MP_Biker_Tat_054_F",
          price: 1850,
          id: 320,
        },
        {
          title: "Суккуб",
          mat: 300,
          slots: [1],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_003_M",
          femalehash: "MP_LR_Tat_003_F",
          price: 1780,
          id: 321,
        },
        {
          title: "Смертельный поцелуй",
          mat: 498,
          slots: [2],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_028_M",
          femalehash: "MP_LR_Tat_028_F",
          price: 1850,
          id: 322,
        },
        {
          title: "Черные слезы",
          mat: 438,
          slots: [1],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_035_M",
          femalehash: "MP_LR_Tat_035_F",
          price: 1850,
          id: 323,
        },
        {
          title: "Ворон",
          mat: 400,
          slots: [1],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_004_M",
          femalehash: "MP_LUXE_TAT_004_F",
          price: 1800,
          id: 324,
        },
        {
          title: "Игра на арфе",
          mat: 575,
          slots: [1, 2],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_013_M",
          femalehash: "MP_LUXE_TAT_013_F",
          price: 3800,
          id: 325,
        },
        {
          title: "Японская музыка",
          mat: 538,
          slots: [2],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_019_M",
          femalehash: "MP_LUXE_TAT_019_F",
          price: 1780,
          id: 326,
        },
        {
          title: "Симметрия нижний рукав",
          mat: 500,
          slots: [1],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_010_M",
          femalehash: "MP_LUXE_TAT_010_F",
          price: 1780,
          id: 327,
        },
        {
          title: "Небесное божество",
          mat: 538,
          slots: [2],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_017_M",
          femalehash: "MP_LUXE_TAT_017_F",
          price: 1750,
          id: 328,
        },
        {
          title: "Цветочный рисунок",
          mat: 500,
          slots: [2],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_026_M",
          femalehash: "MP_LUXE_TAT_026_F",
          price: 1800,
          id: 329,
        },
        {
          title: "Геометрия",
          mat: 663,
          slots: [1, 2],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_030_M",
          femalehash: "MP_LUXE_TAT_030_F",
          price: 3800,
          id: 330,
        },
        {
          title: "Мчись или сдохни",
          mat: 275,
          slots: [1],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_001_M",
          femalehash: "MP_Smuggler_Tattoo_001_F",
          price: 1800,
          id: 331,
        },
        {
          title: "Встреча",
          mat: 333,
          slots: [2],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_005_M",
          femalehash: "MP_Smuggler_Tattoo_005_F",
          price: 1980,
          id: 332,
        },
        {
          title: "Кракен (в цвете)",
          mat: 748,
          slots: [1, 2],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_023_M",
          femalehash: "MP_Smuggler_Tattoo_023_F",
          price: 3800,
          id: 333,
        },
        {
          title: "Механик",
          mat: 360,
          slots: [1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_003_M",
          femalehash: "MP_MP_Stunt_Tat_003_F",
          price: 1750,
          id: 334,
        },
        {
          title: "Токчисный скелет",
          mat: 398,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_009_M",
          femalehash: "MP_MP_Stunt_Tat_009_F",
          price: 1850,
          id: 335,
        },
        {
          title: "Гроб",
          mat: 435,
          slots: [2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_010_M",
          femalehash: "MP_MP_Stunt_Tat_010_F",
          price: 1780,
          id: 336,
        },
        {
          title: "Наездник на гробу",
          mat: 500,
          slots: [1, 2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_016_M",
          femalehash: "MP_MP_Stunt_Tat_016_F",
          price: 3800,
          id: 337,
        },
        {
          title: "Горящая покрышка",
          mat: 333,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_036_M",
          femalehash: "MP_MP_Stunt_Tat_036_F",
          price: 1250,
          id: 338,
        },
        {
          title: "Один жив",
          mat: 525,
          slots: [1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_038_M",
          femalehash: "MP_MP_Stunt_Tat_038_F",
          price: 1850,
          id: 339,
        },
        {
          title: "Соблазнительный механик",
          mat: 713,
          slots: [1, 2],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_049_M",
          femalehash: "MP_MP_Stunt_Tat_049_F",
          price: 3800,
          id: 340,
        },
        {
          title: "Смерть с косой",
          mat: 500,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_002",
          femalehash: "FM_Tat_Award_F_002",
          price: 1850,
          id: 341,
        },
        {
          title: "Едь или умри",
          mat: 388,
          slots: [1, -1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_010",
          femalehash: "FM_Tat_Award_F_010",
          price: 1800,
          id: 342,
        },
        {
          title: "Братство",
          mat: 583,
          slots: [1, 2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_000",
          femalehash: "FM_Tat_F_000",
          price: 3800,
          id: 343,
        },
        {
          title: "Китайский дракон",
          mat: 775,
          slots: [1, 2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_001",
          femalehash: "FM_Tat_F_001",
          price: 3800,
          id: 344,
        },
        {
          title: "Хитрий змей",
          mat: 555,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_003",
          femalehash: "FM_Tat_F_003",
          price: 1850,
          id: 345,
        },
        {
          title: "Половина рукава",
          mat: 583,
          slots: [1, 2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_014",
          femalehash: "FM_Tat_F_014",
          price: 3800,
          id: 346,
        },
        {
          title: "Скелет",
          mat: 638,
          slots: [1, 2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_018",
          femalehash: "FM_Tat_F_018",
          price: 4500,
          id: 347,
        },
        {
          title: "Дева Мария",
          mat: 575,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_027",
          femalehash: "FM_Tat_F_027",
          price: 1850,
          id: 348,
        },
        {
          title: "Русалка",
          mat: 555,
          slots: [1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_028",
          femalehash: "FM_Tat_F_028",
          price: 1850,
          id: 349,
        },
        {
          title: "Кинжал",
          mat: 435,
          slots: [1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_038",
          femalehash: "FM_Tat_F_038",
          price: 1800,
          id: 350,
        },
        {
          title: "Лев",
          mat: 468,
          slots: [2],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_047",
          femalehash: "FM_Tat_F_047",
          price: 1800,
          id: 351,
        },
      ],
      leftleg: [
        {
          title: "Номер 1",
          mat: 303,
          slots: [0],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_LLeg_000",
          price: 1850,
          id: 352,
        },
        {
          title: "Закрытый паук",
          mat: 300,
          slots: [0],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_001",
          femalehash: "MP_Xmas2_F_Tat_001",
          price: 1850,
          id: 353,
        },
        {
          title: "Закрытый паук(в цвете)",
          mat: 350,
          slots: [0],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_002",
          femalehash: "MP_Xmas2_F_Tat_002",
          price: 1850,
          id: 354,
        },
        {
          title: "Патриотический череп",
          mat: 250,
          slots: [0],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_005_M",
          femalehash: "MP_Gunrunning_Tattoo_005_F",
          price: 1850,
          id: 355,
        },
        {
          title: "Стилизованный тигр",
          mat: 225,
          slots: [1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_007_M",
          femalehash: "MP_Gunrunning_Tattoo_007_F",
          price: 1800,
          id: 356,
        },
        {
          title: "Череп в огне",
          mat: 613,
          slots: [0, 1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_011_M",
          femalehash: "MP_Gunrunning_Tattoo_011_F",
          price: 3500,
          id: 357,
        },
        {
          title: "Револьвер",
          mat: 325,
          slots: [0],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_023_M",
          femalehash: "MP_Gunrunning_Tattoo_023_F",
          price: 1850,
          id: 358,
        },
        {
          title: "Квадраты",
          mat: 238,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_009",
          femalehash: "FM_Hip_F_Tat_009",
          price: 1800,
          id: 359,
        },
        {
          title: "Талисманы",
          mat: 238,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_019",
          femalehash: "FM_Hip_F_Tat_019",
          price: 1850,
          id: 360,
        },
        {
          title: "Якорь",
          mat: 250,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_040",
          femalehash: "FM_Hip_F_Tat_040",
          price: 1800,
          id: 361,
        },
        {
          title: "Гремучая змея",
          mat: 423,
          slots: [0],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_007_M",
          femalehash: "MP_LR_Tat_007_F",
          price: 1850,
          id: 362,
        },
        {
          title: "Президенты",
          mat: 325,
          slots: [0, -1],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_020_M",
          femalehash: "MP_LR_Tat_020_F",
          price: 1800,
          id: 363,
        },
        {
          title: "Роза",
          mat: 258,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_002_M",
          femalehash: "MP_MP_Biker_Tat_002_F",
          price: 1850,
          id: 364,
        },
        {
          title: "Крест",
          mat: 275,
          slots: [0],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_015_M",
          femalehash: "MP_MP_Biker_Tat_015_F",
          price: 1800,
          id: 365,
        },
        {
          title: "Плохая удача",
          mat: 363,
          slots: [0],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_027_M",
          femalehash: "MP_MP_Biker_Tat_027_F",
          price: 1850,
          id: 366,
        },
        {
          title: "Огненный череп",
          mat: 463,
          slots: [0],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_036_M",
          femalehash: "MP_MP_Biker_Tat_036_F",
          price: 1850,
          id: 367,
        },
        {
          title: "Летчик",
          mat: 450,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_037_M",
          femalehash: "MP_MP_Biker_Tat_037_F",
          price: 1850,
          id: 368,
        },
        {
          title: "Едь спокойно",
          mat: 388,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_044_M",
          femalehash: "MP_MP_Biker_Tat_044_F",
          price: 1850,
          id: 369,
        },
        {
          title: "Костянной байкер",
          mat: 438,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_056_M",
          femalehash: "MP_MP_Biker_Tat_056_F",
          price: 1850,
          id: 370,
        },
        {
          title: "Проткнутый череп",
          mat: 425,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_057_M",
          femalehash: "MP_MP_Biker_Tat_057_F",
          price: 3500,
          id: 371,
        },
        {
          title: "Любовь до гроба",
          mat: 338,
          slots: [0],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_029_M",
          femalehash: "MP_LR_Tat_029_F",
          price: 1850,
          id: 372,
        },
        {
          title: "Змей",
          mat: 313,
          slots: [0],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_000_M",
          femalehash: "MP_LUXE_TAT_000_F",
          price: 1850,
          id: 373,
        },
        {
          title: "Крест из роз",
          mat: 360,
          slots: [0],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_011_M",
          femalehash: "MP_LUXE_TAT_011_F",
          price: 1850,
          id: 374,
        },
        {
          title: "Дьявольский клинок",
          mat: 375,
          slots: [0, -1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_007_M",
          femalehash: "MP_MP_Stunt_Tat_007_F",
          price: 1780,
          id: 375,
        },
        {
          title: "Трюкач",
          mat: 325,
          slots: [1, -1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_013_M",
          femalehash: "MP_MP_Stunt_Tat_013_F",
          price: 1800,
          id: 376,
        },
        {
          title: "Желтый змей",
          mat: 498,
          slots: [0, 1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_021_M",
          femalehash: "MP_MP_Stunt_Tat_021_F",
          price: 3500,
          id: 377,
        },
        {
          title: "Квадрогоблин",
          mat: 350,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_028_M",
          femalehash: "MP_MP_Stunt_Tat_028_F",
          price: 1800,
          id: 378,
        },
        {
          title: "Пилот",
          mat: 363,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_031_M",
          femalehash: "MP_MP_Stunt_Tat_031_F",
          price: 1850,
          id: 379,
        },
        {
          title: "Кинжал смерти",
          mat: 375,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_009",
          femalehash: "FM_Tat_Award_F_009",
          price: 1850,
          id: 380,
        },
        {
          title: "Плавящийся череп",
          mat: 350,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_002",
          femalehash: "FM_Tat_F_002",
          price: 1850,
          id: 381,
        },
        {
          title: "Дракон",
          mat: 450,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_008",
          femalehash: "FM_Tat_F_008",
          price: 1850,
          id: 382,
        },
        {
          title: "Змей искуситель",
          mat: 388,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_021",
          femalehash: "FM_Tat_F_021",
          price: 1850,
          id: 383,
        },
        {
          title: "Любовь",
          mat: 425,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_023",
          femalehash: "FM_Tat_F_023",
          price: 1850,
          id: 384,
        },
        {
          title: "Димячийся кинжал",
          mat: 400,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_026",
          femalehash: "FM_Tat_F_026",
          price: 1850,
          id: 385,
        },
        {
          title: "Вера",
          mat: 313,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_032",
          femalehash: "FM_Tat_F_032",
          price: 1850,
          id: 386,
        },
        {
          title: "Падающий дракон",
          mat: 425,
          slots: [0, 1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_033",
          femalehash: "FM_Tat_F_033",
          price: 3500,
          id: 387,
        },
        {
          title: "Китайский дракон",
          mat: 400,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_035",
          femalehash: "FM_Tat_F_035",
          price: 1800,
          id: 388,
        },
        {
          title: "Смерть",
          mat: 363,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_037",
          femalehash: "FM_Tat_F_037",
          price: 1850,
          id: 389,
        },
      ],
      rightleg: [
        {
          title: "Бриллиант",
          mat: 350,
          slots: [0],
          dictionary: "mpbusiness_overlays",
          malehash: "",
          femalehash: "MP_Buis_F_RLeg_000",
          price: 1800,
          id: 390,
        },
        {
          title: "Кинжал с орнаментом",
          mat: 388,
          slots: [0, -2],
          dictionary: "mpchristmas2_overlays",
          malehash: "MP_Xmas2_M_Tat_014",
          femalehash: "MP_Xmas2_F_Tat_014",
          price: 1750,
          id: 391,
        },
        {
          title: "Патриотический череп",
          mat: 275,
          slots: [0],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_006_M",
          femalehash: "MP_Gunrunning_Tattoo_006_F",
          price: 1800,
          id: 392,
        },
        {
          title: "Горящий череп",
          mat: 325,
          slots: [0],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_026_M",
          femalehash: "MP_Gunrunning_Tattoo_026_F",
          price: 1850,
          id: 393,
        },
        {
          title: "Азарт",
          mat: 388,
          slots: [1],
          dictionary: "mpgunrunning_overlays",
          malehash: "MP_Gunrunning_Tattoo_030_M",
          femalehash: "MP_Gunrunning_Tattoo_030_F",
          price: 16850,
          id: 394,
        },
        {
          title: "Червячок",
          mat: 250,
          slots: [0, -2],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_038",
          femalehash: "FM_Hip_F_Tat_038",
          price: 1800,
          id: 395,
        },
        {
          title: "Свеча зажигания",
          mat: 263,
          slots: [0],
          dictionary: "mphipster_overlays",
          malehash: "FM_Hip_M_Tat_042",
          femalehash: "FM_Hip_F_Tat_042",
          price: 1800,
          id: 396,
        },
        {
          title: "Сделай мне тату",
          mat: 350,
          slots: [0],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_017_M",
          femalehash: "MP_LR_Tat_017_F",
          price: 1800,
          id: 397,
        },
        {
          title: "Король",
          mat: 350,
          slots: [0],
          dictionary: "mplowrider_overlays",
          malehash: "MP_LR_Tat_023_M",
          femalehash: "MP_LR_Tat_023_F",
          price: 1850,
          id: 398,
        },
        {
          title: "Ярость дракона",
          mat: 513,
          slots: [0, 1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_004_M",
          femalehash: "MP_MP_Biker_Tat_004_F",
          price: 3500,
          id: 399,
        },
        {
          title: "Вестерн",
          mat: 250,
          slots: [0],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_022_M",
          femalehash: "MP_MP_Biker_Tat_022_F",
          price: 1800,
          id: 400,
        },
        {
          title: "Байк",
          mat: 353,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_028_M",
          femalehash: "MP_MP_Biker_Tat_028_F",
          price: 1800,
          id: 401,
        },
        {
          title: "Сделано в Америке",
          mat: 350,
          slots: [1],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_040_M",
          femalehash: "MP_MP_Biker_Tat_040_F",
          price: 1850,
          id: 402,
        },
        {
          title: "STFU",
          mat: 225,
          slots: [0, -2],
          dictionary: "mpbiker_overlays",
          malehash: "MP_MP_Biker_Tat_048_M",
          femalehash: "MP_MP_Biker_Tat_048_F",
          price: 1800,
          id: 403,
        },
        {
          title: "Скелет",
          mat: 288,
          slots: [0],
          dictionary: "mplowrider2_overlays",
          malehash: "MP_LR_Tat_030_M",
          femalehash: "MP_LR_Tat_030_F",
          price: 1850,
          id: 404,
        },
        {
          title: "Лос Муертос во всей красе",
          mat: 375,
          slots: [0],
          dictionary: "mpluxe_overlays",
          malehash: "MP_LUXE_TAT_001_M",
          femalehash: "MP_LUXE_TAT_001_F",
          price: 1850,
          id: 405,
        },
        {
          title: "Симметрия",
          mat: 363,
          slots: [0],
          dictionary: "mpluxe2_overlays",
          malehash: "MP_LUXE_TAT_023_M",
          femalehash: "MP_LUXE_TAT_023_F",
          price: 1750,
          id: 406,
        },
        {
          title: "Карта путешествия",
          mat: 498,
          slots: [0, 1],
          dictionary: "mpsmuggler_overlays",
          malehash: "MP_Smuggler_Tattoo_020_M",
          femalehash: "MP_Smuggler_Tattoo_020_F",
          price: 3500,
          id: 407,
        },
        {
          title: "Демоническая свеча",
          mat: 248,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_005_M",
          femalehash: "MP_MP_Stunt_Tat_005_F",
          price: 1850,
          id: 408,
        },
        {
          title: "Перчатка",
          mat: 263,
          slots: [1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_015_M",
          femalehash: "MP_MP_Stunt_Tat_015_F",
          price: 1850,
          id: 409,
        },
        {
          title: "Летающий поршень",
          mat: 360,
          slots: [0, -1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_020_M",
          femalehash: "MP_MP_Stunt_Tat_020_F",
          price: 1850,
          id: 410,
        },
        {
          title: "Металическое сердце",
          mat: 348,
          slots: [1, -1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_025_M",
          femalehash: "MP_MP_Stunt_Tat_025_F",
          price: 1800,
          id: 411,
        },
        {
          title: "Мышонок Былли",
          mat: 350,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_032_M",
          femalehash: "MP_MP_Stunt_Tat_032_F",
          price: 1750,
          id: 412,
        },
        {
          title: "Оторванная рука",
          mat: 470,
          slots: [0, 1],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_045_M",
          femalehash: "MP_MP_Stunt_Tat_045_F",
          price: 3500,
          id: 413,
        },
        {
          title: "Оторванный нож",
          mat: 275,
          slots: [0],
          dictionary: "mpstunt_overlays",
          malehash: "MP_MP_Stunt_Tat_047_M",
          femalehash: "MP_MP_Stunt_Tat_047_F",
          price: 1750,
          id: 414,
        },
        {
          title: "Кинжалом в глаз",
          mat: 298,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_Award_M_006",
          femalehash: "FM_Tat_Award_F_006",
          price: 1850,
          id: 415,
        },
        {
          title: "Вакханалия",
          mat: 373,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_007",
          femalehash: "FM_Tat_F_007",
          price: 1850,
          id: 416,
        },
        {
          title: "Трайбл",
          mat: 425,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_017",
          femalehash: "FM_Tat_F_017",
          price: 1800,
          id: 417,
        },
        {
          title: "Хитрий дракон",
          mat: 325,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_022",
          femalehash: "FM_Tat_F_022",
          price: 1850,
          id: 418,
        },
        {
          title: "Пробитый дед",
          mat: 348,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_039",
          femalehash: "FM_Tat_F_039",
          price: 1850,
          id: 419,
        },
        {
          title: "Зло",
          mat: 395,
          slots: [0, 1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_040",
          femalehash: "FM_Tat_F_040",
          price: 3400,
          id: 420,
        },
        {
          title: "Горящий скорпион",
          mat: 360,
          slots: [0, -1],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_042",
          femalehash: "FM_Tat_F_042",
          price: 1850,
          id: 421,
        },
        {
          title: "Мертвый",
          mat: 350,
          slots: [0],
          dictionary: "multiplayer_overlays",
          malehash: "FM_Tat_M_043",
          femalehash: "FM_Tat_F_043",
          price: 1850,
          id: 422,
        },
      ],
    };
  },
  function (e) {
    e.exports = [
      {
        id: 1,
        x: -765.43505859375,
        y: -1378.50927734375,
        z: 0.11805132031440735,
        rot: 230.82850646972656,
      },
      {
        id: 2,
        x: -770.9429931640625,
        y: -1385.6224365234375,
        z: 0.11997413635253906,
        rot: 229.69241333007812,
      },
      {
        id: 3,
        x: -776.8917236328125,
        y: -1392.4080810546875,
        z: 0.12292337417602539,
        rot: 229.5012969970703,
      },
      {
        id: 4,
        x: -782.7789916992188,
        y: -1399.1876220703125,
        z: 0.12527692317962646,
        rot: 229.9447784423828,
      },
      {
        id: 5,
        x: -788.4885864257812,
        y: -1406.153564453125,
        z: 0.14378803968429565,
        rot: 230.7755584716797,
      },
      {
        id: 6,
        x: -794.2947387695312,
        y: -1413.01318359375,
        z: 0.11867374181747437,
        rot: 229.68875122070312,
      },
      {
        id: 7,
        x: -831.2332153320312,
        y: -1408.2845458984375,
        z: 0.1240679919719696,
        rot: 110.32101440429688,
      },
      {
        id: 8,
        x: -834.0908203125,
        y: -1399.7357177734375,
        z: 0.12170791625976562,
        rot: 111.02288818359375,
      },
      {
        id: 9,
        x: -837.2759399414062,
        y: -1391.351318359375,
        z: 0.12331557273864746,
        rot: 109.70159912109375,
      },
      {
        id: 10,
        x: -839.9971923828125,
        y: -1382.7425537109375,
        z: 0.11983966827392578,
        rot: 111.0682373046875,
      },
      {
        id: 11,
        x: -843.827392578125,
        y: -1374.55419921875,
        z: 0.12721151113510132,
        rot: 109.14724731445312,
      },
      {
        id: 12,
        x: -847.2972412109375,
        y: -1364.6405029296875,
        z: 0.1126876175403595,
        rot: 111.83355712890625,
      },
      {
        id: 13,
        x: -851.41650390625,
        y: -1356.5362548828125,
        z: 0.11290448904037476,
        rot: 108.72259521484375,
      },
      {
        id: 14,
        x: -854.079833984375,
        y: -1347.9798583984375,
        z: 0.10870981216430664,
        rot: 109.34197998046875,
      },
      {
        id: 15,
        x: -856.2193603515625,
        y: -1339.1473388671875,
        z: 0.12402155995368958,
        rot: 110.7847900390625,
      },
      {
        id: 16,
        x: -859.3963623046875,
        y: -1330.762451171875,
        z: 0.1169840395450592,
        rot: 109.34716796875,
      },
    ];
  },
  function (e) {
    e.exports = {
      Weapon: [
        { title: "Пистолет", id: 57, materials: 60 },
        { title: "Мини СМГ", id: 59, materials: 150 },
        { title: "Винтажный пистолет", id: 24, materials: 120 },
        { title: "Штурмовая винтовка", id: 26, materials: 350 },
        { title: "Пистолет MK II", id: 46, materials: 130 },
        { title: "Автоматическая винтовка", id: 48, materials: 340 },
        { title: "Пистолет Tec-9", id: 50, materials: 170 },
        { title: "Укороченная винтовка", id: 52, materials: 290 },
        { title: "Тяжелый пистолет", id: 55, materials: 90 },
        { title: "Двуствольный обрез", id: 28, materials: 120 },
        { title: "Особый Карабин MK II", id: 63, materials: 420 },
        { title: "Пулемёт", id: 65, materials: 1e3 },
        { title: "Штурмовой ПП", id: 68, materials: 250 },
        { title: "Бейсбольная бита", id: 30, materials: 15 },
        { title: "Шокер", id: 29, materials: 150 },
        { title: "Пистолет .50", id: 93, materials: 80 },
        { title: "PDW", id: 94, materials: 200 },
        { title: "Помповый дробовик", id: 95, materials: 170 },
        { title: "Особый Карабин", id: 96, materials: 350 },
        { title: "Снайперская винтовка", id: 97, materials: 1500 },
      ],
      Ammo: [
        { title: "Коробка патронов 9mm", id: 79, materials: 12 },
        { title: "Коробка патронов 12 gauge", id: 80, materials: 15 },
        { title: "Коробка патронов 45acp", id: 81, materials: 12 },
        {
          title: "Коробка патронов .300 Winchester Magnum",
          id: 82,
          materials: 36,
        },
        { title: "Коробка патронов .357 magnum", id: 83, materials: 18 },
        { title: "Коробка патронов 5.56mm", id: 84, materials: 20 },
        { title: "Коробка патронов 7.62mm", id: 85, materials: 20 },
      ],
      Drug: [
        { title: "Марихуана", count: 0, id: 15 },
        { title: "Кокаин", count: 0, id: 20 },
      ],
      Other: [
        { title: "Ножовки", count: 0, id: 23 },
        { title: "Отмычки", count: 0, id: 19 },
        { title: "Мешки", count: 0, id: 21 },
        { title: "Стяжки", count: 0, id: 22 },
      ],
      Medecine: [{ title: "Аптечки", count: 0, id: 61 }],
      Equipment: [{ title: "Бронежелет", id: 8, materials: 200 }],
    };
  },
  function (e) {
    e.exports = {
      24: {
        name: "Винтажный пистолет",
        hash: "0x83839C4",
        hashNumber: 137902532,
        ammo: !1,
        AttachSlot: "RIGHT_THIGH",
        AttachModel: "w_pi_vintage_pistol",
        AttachBone: 51826,
        AttachPosition: "PistolAttachmentPos",
        AttachRotation: "PistolAttachmentRot",
        ammoId: 79,
      },
      25: {
        name: "Патроны для винтажного пистолета",
        hash: "0x83839C4",
        ammo: !0,
      },
      26: {
        name: "Штурмовая винтовка",
        hash: "0xBFEFFF6D",
        ammo: !1,
        hashNumber: 3220176749,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "W_AR_ASSAULTRIFLE",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 85,
      },
      27: {
        name: "Патроны для штурмовой винтовки",
        hash: "0xBFEFFF6D",
        ammo: !0,
      },
      28: {
        name: "Двуствольный обрез",
        hash: "0xEF951FBB",
        hashNumber: 4019527611,
        ammo: !1,
        AttachModel: "w_sg_doublebarrel",
        AttachBone: 24818,
        AttachSlot: "LEFT_BACK",
        AttachPosition: "ShotgunAttachmentPos",
        AttachRotation: "ShotgunAttachmentRot",
        ammoId: 80,
      },
      29: {
        name: "Шокер",
        hash: "0x3656C8C1",
        hashNumber: 911657153,
        ammo: !1,
        AttachSlot: "LEFT_THIGH",
        AttachModel: "w_pi_stungun",
        AttachBone: 58271,
        AttachPosition: "SMGAttachmentPos",
        AttachRotation: "SMGAttachmentRot",
      },
      30: {
        name: "Бейсбольная бита",
        hash: "0x958A4A8F",
        ammo: !1,
        AttachModel: "w_me_bat",
      },
      31: {
        name: "Фонарик",
        hash: "0x8BB05FD7",
        ammo: !1,
        AttachModel: "prop_scn_police_torch",
      },
      46: {
        name: "Пистолет MK II",
        hash: "0xBFE256D4",
        hashNumber: 3219281620,
        ammo: !1,
        AttachSlot: "RIGHT_THIGH",
        AttachModel: "w_pi_pistolmk2",
        AttachBone: 51826,
        AttachPosition: "PistolAttachmentPos",
        AttachRotation: "PistolAttachmentRot",
        ammoId: 79,
      },
      47: { name: "Патроны для пистолета MK II", hash: "0xBFE256D4", ammo: !0 },
      48: {
        name: "Автоматическая винтовка",
        hash: "0x83BF0278",
        hashNumber: 2210333304,
        ammo: !1,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "W_AR_CARBINERIFLE",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 84,
      },
      49: {
        name: "Патроны для автоматической винтовки",
        hash: "0x83BF0278",
        ammo: !0,
      },
      50: {
        name: "Пистолет Tec-9",
        hash: "0xDB1AA450",
        hashNumber: 3675956304,
        ammo: !1,
        AttachSlot: "RIGHT_THIGH",
        AttachModel: "w_sb_compactsmg",
        AttachBone: 51826,
        AttachPosition: "PistolAttachmentPos",
        AttachRotation: "PistolAttachmentRot",
        ammoId: 79,
      },
      51: { name: "Патроны для Tec-9", hash: "0xDB1AA450", ammo: !0 },
      52: {
        name: "Укороченная винтовка",
        hash: "0x624FE830",
        hashNumber: 1649403952,
        ammo: !1,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "w_ar_assaultrifle_smg",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 85,
      },
      53: {
        name: "Патроны для укороченной винтовки",
        hash: "0x624FE830",
        ammo: !0,
      },
      54: {
        name: "Патроны для двуствольного обреза",
        hash: "0xEF951FBB",
        ammo: !0,
      },
      55: {
        name: "Тяжелый пистолет",
        hash: "0xD205520E",
        hashNumber: 3523564046,
        ammo: !1,
        AttachSlot: "RIGHT_THIGH",
        AttachModel: "w_pi_heavypistol",
        AttachBone: 51826,
        AttachPosition: "PistolAttachmentPos",
        AttachRotation: "PistolAttachmentRot",
        ammoId: 79,
      },
      56: {
        name: "Патроны для тяжелого пистолета",
        hash: "0xD205520E",
        ammo: !0,
      },
      57: {
        name: "Пистолет",
        hash: "0x1B06D571",
        hashNumber: 453432689,
        ammo: !1,
        AttachSlot: "RIGHT_THIGH",
        AttachModel: "W_PI_PISTOL",
        AttachBone: 51826,
        AttachPosition: "PistolAttachmentPos",
        AttachRotation: "PistolAttachmentRot",
        ammoId: 81,
      },
      58: { name: "Патроны для пистолета", hash: "0x1B06D571", ammo: !0 },
      59: {
        name: "Мини СМГ",
        hash: "0x13532244",
        hashNumber: 324215364,
        ammo: !1,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "w_sb_microsmg",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 81,
      },
      60: { name: "Патроны для мини СМГ", hash: "0x13532244", ammo: !0 },
      63: {
        name: "Особый Карабин MK II",
        hash: "0x969C3D67",
        hashNumber: 2526821735,
        ammo: !1,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "w_ar_specialcarbinemk2",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 84,
      },
      64: {
        name: "Патроны для особого карабина МК II",
        hash: "0x969C3D67",
        ammo: !0,
      },
      65: {
        name: "Пулемёт",
        hash: "0x9D07F764",
        hashNumber: 2634544996,
        ammo: !1,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "w_mg_mg",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 79,
      },
      67: { name: "Патроны для пулемёта", hash: "0x9D07F764", ammo: !0 },
      68: {
        name: "Штурмовой ПП",
        hash: "0xEFE7E2DF",
        ammo: !1,
        hashNumber: 4024951519,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "w_sb_assaultsmg",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 79,
      },
      69: { name: "Патроны для штурмового ПП", hash: "0xEFE7E2DF", ammo: !0 },
      86: { name: "Кастет", hash: "0xD8DF3C3C", ammo: !1 },
      87: { name: "Боевой нож", hash: "0x99B507EA", ammo: !1 },
      88: { name: "Мачете", hash: "0xDD5DF8D9", ammo: !1 },
      89: {
        name: "Боевой пистолет",
        hash: "0x5EF9FEC4",
        hashNumber: 1593441988,
        ammo: !1,
        AttachSlot: "RIGHT_THIGH",
        AttachModel: "w_pi_combatpistol",
        AttachBone: 51826,
        AttachPosition: "PistolAttachmentPos",
        AttachRotation: "PistolAttachmentRot",
        ammoId: 81,
      },
      90: {
        name: "Маленький пистолет",
        hash: "0xBFD21232",
        hashNumber: 3218215474,
        ammo: !1,
        AttachSlot: "RIGHT_THIGH",
        AttachModel: "w_pi_sns_pistol",
        AttachBone: 51826,
        AttachPosition: "PistolAttachmentPos",
        AttachRotation: "PistolAttachmentRot",
        ammoId: 81,
      },
      91: {
        name: "Обрез",
        hash: "0x7846A318",
        hashNumber: 2017895192,
        ammo: !1,
        AttachModel: "w_sg_sawnoff",
        AttachBone: 24818,
        AttachSlot: "LEFT_BACK",
        AttachPosition: "ShotgunAttachmentPos",
        AttachRotation: "ShotgunAttachmentRot",
        ammoId: 80,
      },
      92: { name: "Швейцарский нож", hash: "0xDFE37640", ammo: !1 },
      93: {
        name: "Пистолет .50",
        hash: "0x99AEEB3B",
        hashNumber: 2578377531,
        ammo: !1,
        AttachSlot: "RIGHT_THIGH",
        AttachModel: "w_pi_pistol50",
        AttachBone: 51826,
        AttachPosition: "PistolAttachmentPos",
        AttachRotation: "PistolAttachmentRot",
        ammoId: 81,
      },
      94: {
        name: "PDW",
        hash: "0x0A3D4D34",
        hashNumber: 171789620,
        ammo: !1,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "w_sb_pdw",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 79,
      },
      95: {
        name: "Помповый дробовик",
        hash: "0x1D073A89",
        hashNumber: 487013001,
        ammo: !1,
        AttachModel: "w_sg_pumpshotgun",
        AttachBone: 24818,
        AttachSlot: "LEFT_BACK",
        AttachPosition: "ShotgunAttachmentPos",
        AttachRotation: "ShotgunAttachmentRot",
        ammoId: 80,
      },
      96: {
        name: "Особый Карабин",
        hash: "0xC0A3098D",
        hashNumber: 3231910285,
        ammo: !1,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "w_ar_specialcarbine",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 84,
      },
      97: {
        name: "Снайперская винтовка",
        hash: "0x05FC3C11",
        hashNumber: 100416529,
        ammo: !1,
        AttachSlot: "RIGHT_BACK",
        AttachModel: "w_sr_sniperrifle",
        AttachBone: 24818,
        AttachPosition: "RifleAttachmentPos",
        AttachRotation: "RifleAttachmentRot",
        ammoId: 82,
      },
    };
  },
  function (e) {
    e.exports = [
      {
        id: 1,
        x: 4519.41943359375,
        y: -4513.23193359375,
        z: 4.531599998474121,
      },
      { id: 2, x: 5098.0517578125, y: -4609.8095703125, z: 2.3821632862091064 },
      { id: 3, x: 4992.07666015625, y: -5192.0625, z: 2.5169060230255127 },
    ];
  },
  function (e) {
    e.exports = {
      0: {
        1: {
          0: 19,
          1: 20,
          2: 21,
          4: 22,
          5: 23,
          6: 24,
          8: 25,
          11: 26,
          12: 27,
          14: 28,
          15: 29,
        },
        2: {
          0: 30,
          1: 31,
          2: 32,
          4: 33,
          5: 34,
          6: 35,
          8: 36,
          11: 37,
          12: 38,
          14: 39,
          15: 40,
        },
        3: {
          0: 41,
          1: 42,
          2: 43,
          4: 44,
          5: 45,
          6: 46,
          8: 47,
          11: 48,
          12: 49,
          14: 50,
          15: 51,
        },
        4: {
          0: 52,
          1: 53,
          2: 54,
          4: 55,
          5: 56,
          6: 57,
          8: 58,
          11: 59,
          12: 60,
          14: 61,
          15: 62,
        },
        5: {
          0: 63,
          1: 64,
          2: 65,
          4: 66,
          5: 67,
          6: 68,
          8: 69,
          11: 70,
          12: 71,
          14: 72,
          15: 73,
        },
        6: {
          0: 74,
          1: 75,
          2: 76,
          4: 77,
          5: 78,
          6: 79,
          8: 80,
          11: 81,
          12: 82,
          14: 83,
          15: 84,
        },
        7: {
          0: 85,
          1: 86,
          2: 87,
          4: 88,
          5: 89,
          6: 90,
          8: 91,
          11: 92,
          12: 93,
          14: 94,
          15: 95,
        },
        8: {
          0: 99,
          1: 100,
          2: 101,
          4: 102,
          5: 103,
          6: 104,
          8: 105,
          11: 106,
          12: 107,
          14: 108,
          15: 109,
        },
        9: {
          0: 138,
          1: 139,
          2: 140,
          4: 141,
          5: 142,
          6: 143,
          8: 144,
          11: 145,
          12: 146,
          14: 147,
          15: 136,
        },
        10: {
          0: 151,
          1: 152,
          2: 153,
          4: 154,
          5: 155,
          6: 156,
          8: 157,
          11: 158,
          12: 159,
          14: 160,
          15: 137,
        },
        11: {
          0: 171,
          1: 172,
          2: 173,
          4: 174,
          5: 175,
          6: 176,
          8: 177,
          11: 178,
          12: 179,
          14: 180,
          15: 170,
        },
      },
      1: {
        1: {
          0: 20,
          1: 21,
          2: 22,
          3: 23,
          4: 24,
          5: 25,
          6: 26,
          7: 27,
          9: 28,
          11: 29,
          12: 30,
          14: 31,
          15: 32,
        },
        2: {
          0: 33,
          1: 34,
          2: 35,
          3: 36,
          4: 37,
          5: 38,
          6: 39,
          7: 40,
          9: 41,
          11: 42,
          12: 43,
          14: 44,
          15: 45,
        },
        3: {
          0: 46,
          1: 47,
          2: 48,
          3: 49,
          4: 50,
          5: 51,
          6: 52,
          7: 53,
          9: 54,
          11: 55,
          12: 56,
          14: 57,
          15: 58,
        },
        4: {
          0: 59,
          1: 60,
          2: 61,
          3: 62,
          4: 63,
          5: 64,
          6: 65,
          7: 66,
          9: 67,
          11: 68,
          12: 69,
          14: 70,
          15: 71,
        },
        5: {
          0: 72,
          1: 73,
          2: 74,
          3: 75,
          4: 76,
          5: 77,
          6: 78,
          7: 79,
          9: 80,
          11: 81,
          12: 82,
          14: 83,
          15: 84,
        },
        6: {
          0: 85,
          1: 86,
          2: 87,
          3: 88,
          4: 89,
          5: 90,
          6: 91,
          7: 92,
          9: 93,
          11: 94,
          12: 95,
          14: 96,
          15: 97,
        },
        7: {
          0: 96,
          1: 97,
          2: 98,
          3: 99,
          4: 100,
          5: 101,
          6: 102,
          7: 103,
          9: 104,
          11: 105,
          12: 106,
          14: 109,
          15: 110,
        },
        8: {
          0: 114,
          1: 115,
          2: 116,
          3: 117,
          4: 118,
          5: 119,
          6: 120,
          7: 121,
          9: 122,
          11: 123,
          12: 124,
          14: 125,
          15: 126,
        },
        9: {
          0: 171,
          1: 172,
          2: 173,
          3: 174,
          4: 175,
          5: 176,
          6: 177,
          7: 178,
          9: 179,
          11: 180,
          12: 181,
          14: 182,
          15: 169,
        },
        10: {
          0: 187,
          1: 188,
          2: 189,
          3: 190,
          4: 191,
          5: 192,
          6: 193,
          7: 194,
          9: 195,
          11: 196,
          12: 197,
          14: 198,
          15: 170,
        },
      },
    };
  },
  ,
  function (e) {
    e.exports = {
      33: {
        needs: { water: 60, alcohol: 0.06 },
        animation: "drink",
        bone: 64064,
        model: "prop_cs_beer_bot_01",
        isAttached: !0,
        attachPos: { x: 0, y: 0.05, z: 0 },
        attachRot: { x: 0, y: 20, z: 60 },
      },
      35: {
        needs: { water: 60 },
        animation: "drink",
        bone: 64064,
        model: "prop_ld_flow_bottle",
        isAttached: !0,
        attachPos: { x: 0, y: 0.05, z: 0 },
        attachRot: { x: 0, y: 20, z: 60 },
      },
      36: {
        needs: { food: 20 },
        animation: "eat2",
        bone: 26614,
        model: "prop_cs_crisps_01",
        isAttached: !0,
        attachPos: { x: 0.04, y: -0.1, z: -0.05 },
        attachRot: { x: 0, y: 0, z: 100 },
      },
      37: {
        needs: { food: 2 },
        animation: "eat",
        bone: 64064,
        model: "ng_proc_candy01a",
        isAttached: !0,
        attachPos: { x: 0.05, y: 0.04, z: 0 },
        attachRot: { x: 80, y: 0, z: 0 },
      },
      40: {
        needs: { food: 40 },
        animation: "eat",
        bone: 64064,
        model: "prop_pizza_box_01",
        isAttached: !1,
        attachPos: { x: 0, y: 0.05, z: 0 },
        attachRot: { x: 0, y: 20, z: 60 },
      },
      41: {
        needs: { water: 65 },
        animation: "drink",
        bone: 64064,
        model: "prop_ecola_can",
        isAttached: !0,
        attachPos: { x: 0, y: 0.05, z: 0.05 },
        attachRot: { x: -5, y: 20, z: 0 },
      },
      42: {
        needs: { food: 35 },
        animation: "eat",
        bone: 64064,
        model: "prop_cs_burger_01",
        isAttached: !0,
        attachPos: { x: 0.02, y: 0.05, z: 0 },
        attachRot: { x: 80, y: 0, z: 0 },
      },
      43: {
        needs: { food: 23 },
        animation: "eat",
        bone: 64064,
        model: "prop_food_bs_chips",
        isAttached: !0,
        attachPos: { x: 0.02, y: 0.02, z: -0.05 },
        attachRot: { x: -10, y: 0, z: 0 },
      },
      44: {
        needs: { water: 70 },
        animation: "drink",
        bone: 64064,
        model: "ng_proc_sodacan_01b",
        isAttached: !0,
        attachPos: { x: 0, y: 0.04, z: -0.04 },
        attachRot: { x: 0, y: 20, z: 60 },
      },
      45: {
        needs: { water: 60 },
        animation: "drink",
        bone: 64064,
        model: "prop_fib_coffee",
        isAttached: !0,
        attachPos: { x: 0, y: 0.06, z: 0.04 },
        attachRot: { x: 0, y: 20, z: 0 },
      },
      70: {
        needs: { water: -8, alcohol: 0.68 },
        animation: "drink",
        bone: 64064,
        model: "prop_cherenkov_01",
        isAttached: !0,
        attachPos: { x: -0.03, y: 0.05, z: -0.25 },
        attachRot: { x: -1, y: 10, z: 0 },
      },
      71: {
        needs: { water: -10, alcohol: 0.78 },
        animation: "drink",
        bone: 64064,
        model: "prop_bottle_richard",
        isAttached: !0,
        attachPos: { x: -0.03, y: 0.05, z: -0.25 },
        attachRot: { x: -5, y: 10, z: 0 },
      },
      72: {
        needs: { water: -12, alcohol: 0.85 },
        animation: "drink",
        bone: 64064,
        model: "prop_cs_whiskey_bottle",
        isAttached: !0,
        attachPos: { x: 0.01, y: 0.07, z: -0.03 },
        attachRot: { x: -10, y: 10, z: 0 },
      },
      73: {
        needs: { water: -6, alcohol: 0.45 },
        animation: "drink",
        bone: 64064,
        model: "prop_cava",
        isAttached: !0,
        attachPos: { x: -0.05, y: 0, z: -0.25 },
        attachRot: { x: -15, y: 10, z: 0 },
      },
      74: {
        needs: { water: -5, alcohol: 0.3 },
        animation: "drink",
        bone: 64064,
        model: "prop_bottle_macbeth",
        isAttached: !0,
        attachPos: { x: -0.05, y: 0, z: -0.3 },
        attachRot: { x: -10, y: 10, z: 0 },
      },
      75: {
        needs: { water: -6, alcohol: 0.4 },
        animation: "drink",
        bone: 64064,
        model: "prop_champ_01a",
        isAttached: !0,
        attachPos: { x: -0.02, y: -0.02, z: -0.25 },
        attachRot: { x: -15, y: 10, z: 0 },
      },
      76: {
        needs: { food: 40 },
        animation: "eat2",
        bone: 26614,
        model: "prop_bar_beans",
        isAttached: !0,
        attachPos: { x: 0, y: -0.06, z: 0.04 },
        attachRot: { x: 0, y: 80, z: 0 },
      },
      77: {
        needs: { food: 40, health: 5 },
        animation: "eat2",
        bone: 26614,
        model: "p_cs_bowl_01b_s",
        isAttached: !0,
        attachPos: { x: 0.04, y: -0.11, z: -0.02 },
        attachRot: { x: -40, y: 70, z: 0 },
      },
      78: {
        needs: { food: 50, health: 10 },
        animation: "eat",
        bone: 64064,
        model: "prop_cs_steak",
        isAttached: !0,
        attachPos: { x: 0, y: 0.05, z: 0 },
        attachRot: { x: 80, y: 0, z: 0 },
      },
      98: {
        needs: { food: 45 },
        animation: "eat",
        bone: 64064,
        model: "prop_taco_02",
        isAttached: !0,
        attachPos: { x: 0, y: 0.04, z: 0 },
        attachRot: { x: 80, y: 0, z: 0 },
      },
      99: {
        needs: { food: 35 },
        animation: "eat",
        bone: 64064,
        model: "prop_cs_hotdog_01",
        isAttached: !0,
        attachPos: { x: 0, y: 0.04, z: 0 },
        attachRot: { x: 80, y: 0, z: 0 },
      },
      100: {
        needs: { food: 23 },
        animation: "eat",
        bone: 64064,
        model: "prop_choc_pq",
        isAttached: !0,
        attachPos: { x: 0, y: 0.04, z: 0.04 },
        attachRot: { x: 0, y: 90, z: 80 },
      },
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (e, t) {
    mp.events.add({
      chatPush: (e) => {
        var t = JSON.parse(e),
          a = mp.players.atRemoteId(t.playerId);
        if (!a) return;
        mp.players.local.remoteId;
        let i = "Незнакомец";
        const o = a.getVariable("guid"),
          r = a.getVariable("ADMIN"),
          l = familiar.includes(o);
        (t.playerId === localplayer.remoteId || r || l) && (i = a.name);
        var n = {
          name: i,
          tag: t.tag,
          playerId: t.playerId,
          msg: t.msg,
          value: t.value,
        };
        chatbox.execute(`storage.pushChat(${JSON.stringify(n)});`);
      },
      chatAdminMsg: (e) => {
        chatbox.execute(`storage.pushChat(${e});`);
      },
      chatEnable: (e) => {},
      chatClear: (e) => {},
      setChatActive: (e) => {},
    });
  },
  function (e, t) {
    let a,
      i,
      o,
      r = !1;
    function l() {
      if (r)
        o.setMaxSpeed(10 * i),
          (r = !1),
          (o = !1),
          misc.notif("Круиз-контроль выключен", "error");
      else if (
        3.6 * mp.players.local.vehicle.getSpeed() >= 10 &&
        localplayer.vehicle.getIsEngineRunning()
      ) {
        if (localplayer.vehicle.getSpeedVector(!0).y < 0) return;
        (r = !0),
          (a = mp.players.local.vehicle.getSpeed()),
          (i = mp.game.vehicle.getVehicleModelMaxSpeed(
            localplayer.vehicle.model
          )),
          localplayer.vehicle.setMaxSpeed(a),
          (o = localplayer.vehicle),
          misc.notif(
            `Круиз-контроль включен скорость ${Math.ceil(3.6 * a)} км/ч`
          );
      }
    }
    mp.keys.bind(88, !0, function () {
      (function () {
        if (mp.players.local.vehicle)
          return (
            mp.players.local.vehicle.getPedInSeat(-1) ===
            mp.players.local.handle
          );
      })() && l();
    }),
      mp.events.add({
        render: () => {
          if (r) {
            if (!localplayer.vehicle) return l();
            if (mp.players.local.vehicle.hasCollidedWithAnything()) return l();
            if (
              mp.game.controls.isControlPressed(2, 76) ||
              mp.game.controls.isControlPressed(2, 72)
            )
              return l();
            mp.game.controls.setControlNormal(27, 71, 1);
          }
        },
        cCruiseControlOff: () => {
          r && l();
        },
      });
  },
  function (e, t) {
    mp.game.streaming.requestAnimDict("anim@mp_point");
    const a = {
      active: !1,
      interval: null,
      lastSent: 0,
      start: function () {
        this.active ||
          ((this.active = !0),
          mp.game.invoke(
            "0x0725a4ccfded9a70",
            mp.players.local.handle,
            0,
            1,
            1,
            1
          ),
          mp.players.local.setConfigFlag(36, !0),
          mp.players.local.taskMoveNetwork(
            "task_mp_pointing",
            0.5,
            !1,
            "anim@mp_point",
            24
          ),
          mp.game.streaming.removeAnimDict("anim@mp_point"),
          (this.interval = setInterval(this.process.bind(this), 0)));
      },
      stop: function () {
        this.active &&
          (clearInterval(this.interval),
          (this.interval = null),
          (this.active = !1),
          mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop"),
          mp.players.local.isInjured() || mp.players.local.clearTasks(),
          mp.players.local.isInAnyVehicle(!0) ||
            mp.game.invoke(
              "0x0725a4ccfded9a70",
              mp.players.local.handle,
              1,
              1,
              1,
              1
            ),
          mp.players.local.setConfigFlag(36, !1),
          mp.players.local.clearTasks());
      },
      gameplayCam: mp.cameras.new("gameplay"),
      lastSync: 0,
      getRelativePitch: function () {
        return this.gameplayCam.getRot(2).x - mp.players.local.getPitch();
      },
      process: function () {
        if (this.active) {
          mp.game.invoke("0x921ce12c489c4c41", mp.players.local.handle);
          let e = this.getRelativePitch();
          e < -70 ? (e = -70) : e > 42 && (e = 42), (e = (e + 70) / 112);
          let t = mp.game.cam.getGameplayCamRelativeHeading(),
            a = mp.game.system.cos(t),
            i = mp.game.system.sin(t);
          t < -180 ? (t = -180) : t > 180 && (t = 180), (t = (t + 180) / 360);
          let o = mp.players.local.getOffsetFromGivenWorldCoords(
              -0.2 * a - i * (0.4 * t + 0.3),
              -0.2 * i + a * (0.4 * t + 0.3),
              0.6
            ),
            r =
              void 0 !==
              mp.raycasting.testPointToPoint(
                new mp.Vector3(o.x, o.y, o.z - 0.2),
                new mp.Vector3(o.x, o.y, o.z + 0.2),
                mp.players.local.handle,
                7
              );
          mp.game.invoke(
            "0xd5bb4025ae449a4e",
            mp.players.local.handle,
            "Pitch",
            e
          ),
            mp.game.invoke(
              "0xd5bb4025ae449a4e",
              mp.players.local.handle,
              "Heading",
              -1 * t + 1
            ),
            mp.game.invoke(
              "0xb0a6cfd2c69c1088",
              mp.players.local.handle,
              "isBlocked",
              r
            ),
            mp.game.invoke(
              "0xb0a6cfd2c69c1088",
              mp.players.local.handle,
              "isFirstPerson",
              4 ==
                mp.game.invoke(
                  "0xee778f8c7e1142e2",
                  mp.game.invoke("0x19cafa3c87f7c2ff")
                )
            ),
            Date.now() - this.lastSent > 100 &&
              ((this.lastSent = Date.now()),
              mp.events.callRemote("fpsync.update", e, t));
        }
      },
    };
    mp.events.add("fpsync.update", async (e, t, a) => {
      let i = (function (e) {
        let t = mp.players.atRemoteId(e);
        if (void 0 == t || null == t) return null;
        return t;
      })(parseInt(e));
      if (null != i && i != mp.players.local) {
        if (((i.lastReceivedPointing = Date.now()), !i.pointingInterval)) {
          for (
            i.pointingInterval = setInterval(
              function () {
                Date.now() - i.lastReceivedPointing > 1e3 &&
                  (clearInterval(i.pointingInterval),
                  (i.lastReceivedPointing = void 0),
                  (i.pointingInterval = void 0),
                  mp.game.invoke("0xd01015c7316ae176", i.handle, "Stop"),
                  i.isInAnyVehicle(!0) ||
                    mp.game.invoke("0x0725a4ccfded9a70", i.handle, 1, 1, 1, 1),
                  i.setConfigFlag(36, !1));
              }.bind(i),
              500
            ),
              mp.game.streaming.requestAnimDict("anim@mp_point");
            !mp.game.streaming.hasAnimDictLoaded("anim@mp_point");

          )
            await misc.sleep();
          mp.game.invoke("0x0725a4ccfded9a70", i.handle, 0, 1, 1, 1),
            i.setConfigFlag(36, !0),
            i.taskMoveNetwork("task_mp_pointing", 0.5, !1, "anim@mp_point", 24),
            mp.game.streaming.removeAnimDict("anim@mp_point");
        }
        mp.game.invoke("0xd5bb4025ae449a4e", i.handle, "Pitch", t),
          mp.game.invoke("0xd5bb4025ae449a4e", i.handle, "Heading", -1 * a + 1),
          mp.game.invoke("0xb0a6cfd2c69c1088", i.handle, "isBlocked", 0),
          mp.game.invoke("0xb0a6cfd2c69c1088", i.handle, "isFirstPerson", 0);
      }
    }),
      mp.keys.bind(66, !0, () => {
        if (!mp.gui.cursor.visible) {
          if (localplayer.vehicle) return;
          if (localplayer.getVariable("animation")) return;
          a.start();
        }
      }),
      mp.keys.bind(66, !1, () => {
        localplayer.getVariable("animation") || a.stop();
      });
  },
  function (e, t) {
    e.exports = [
      "h4_mph4_terrain_01_grass_0",
      "h4_mph4_terrain_01_grass_1",
      "h4_mph4_terrain_02_grass_0",
      "h4_mph4_terrain_02_grass_1",
      "h4_mph4_terrain_02_grass_2",
      "h4_mph4_terrain_02_grass_3",
      "h4_mph4_terrain_04_grass_0",
      "h4_mph4_terrain_04_grass_1",
      "h4_mph4_terrain_05_grass_0",
      "h4_mph4_terrain_06_grass_0 ",
      "h4_islandx_terrain_01",
      "h4_islandx_terrain_01_lod",
      "h4_islandx_terrain_01_slod",
      "h4_islandx_terrain_02",
      "h4_islandx_terrain_02_lod",
      "h4_islandx_terrain_02_slod",
      "h4_islandx_terrain_03",
      "h4_islandx_terrain_03_lod",
      "h4_islandx_terrain_04",
      "h4_islandx_terrain_04_lod",
      "h4_islandx_terrain_04_slod",
      "h4_islandx_terrain_05",
      "h4_islandx_terrain_05_lod",
      "h4_islandx_terrain_05_slod",
      "h4_islandx_terrain_06",
      "h4_islandx_terrain_06_lod",
      "h4_islandx_terrain_06_slod",
      "h4_islandx_terrain_props_05_a",
      "h4_islandx_terrain_props_05_a_lod",
      "h4_islandx_terrain_props_05_b",
      "h4_islandx_terrain_props_05_b_lod",
      "h4_islandx_terrain_props_05_c",
      "h4_islandx_terrain_props_05_c_lod",
      "h4_islandx_terrain_props_05_d",
      "h4_islandx_terrain_props_05_d_lod",
      "h4_islandx_terrain_props_05_d_slod",
      "h4_islandx_terrain_props_05_e",
      "h4_islandx_terrain_props_05_e_lod",
      "h4_islandx_terrain_props_05_e_slod",
      "h4_islandx_terrain_props_05_f",
      "h4_islandx_terrain_props_05_f_lod",
      "h4_islandx_terrain_props_05_f_slod",
      "h4_islandx_terrain_props_06_a",
      "h4_islandx_terrain_props_06_a_lod",
      "h4_islandx_terrain_props_06_a_slod",
      "h4_islandx_terrain_props_06_b",
      "h4_islandx_terrain_props_06_b_lod",
      "h4_islandx_terrain_props_06_b_slod",
      "h4_islandx_terrain_props_06_c",
      "h4_islandx_terrain_props_06_c_lod",
      "h4_islandx_terrain_props_06_c_slod",
      "h4_mph4_terrain_01",
      "h4_mph4_terrain_01_long_0",
      "h4_mph4_terrain_02",
      "h4_mph4_terrain_03",
      "h4_mph4_terrain_04",
      "h4_mph4_terrain_05",
      "h4_mph4_terrain_06",
      "h4_mph4_terrain_06_strm_0",
      "h4_mph4_terrain_lod",
      "h4_mph4_terrain_occ_01",
      "h4_mph4_terrain_occ_02",
      "h4_mph4_terrain_occ_03",
      "h4_mph4_terrain_occ_04",
      "h4_mph4_terrain_occ_05",
      "h4_mph4_terrain_occ_06",
      "h4_mph4_terrain_occ_07",
      "h4_mph4_terrain_occ_08",
      "h4_mph4_terrain_occ_09",
      "h4_islandx",
      "h4_islandx_disc_strandedshark",
      "h4_islandx_disc_strandedshark_lod",
      "h4_islandx_disc_strandedwhale",
      "h4_islandx_disc_strandedwhale_lod",
      "h4_islandx_props",
      "h4_islandx_props_lod",
      "h4_islandx_sea_mines",
      "h4_mph4_island",
      "h4_mph4_island_long_0",
      "h4_mph4_island_strm_0",
      "h4_aa_guns_lod",
      "h4_beach",
      "h4_beach_bar_props",
      "h4_beach_lod",
      "h4_beach_party",
      "h4_beach_party_lod",
      "h4_beach_props",
      "h4_beach_props_lod",
      "h4_beach_props_party",
      "h4_beach_props_slod",
      "h4_beach_slod",
      "h4_islandairstrip",
      "h4_islandairstrip_doorsclosed",
      "h4_islandairstrip_doorsclosed_lod",
      "h4_islandairstrip_doorsopen",
      "h4_islandairstrip_doorsopen_lod",
      "h4_islandairstrip_hangar_props",
      "h4_islandairstrip_hangar_props_lod",
      "h4_islandairstrip_hangar_props_slod",
      "h4_islandairstrip_lod",
      "h4_islandairstrip_props",
      "h4_islandairstrip_propsb",
      "h4_islandairstrip_propsb_lod",
      "h4_islandairstrip_propsb_slod",
      "h4_islandairstrip_props_lod",
      "h4_islandairstrip_props_slod",
      "h4_islandairstrip_slod",
      "h4_islandxcanal_props",
      "h4_islandxcanal_props_lod",
      "h4_islandxcanal_props_slod",
      "h4_islandxdock",
      "h4_islandxdock_lod",
      "h4_islandxdock_props",
      "h4_islandxdock_props_2",
      "h4_islandxdock_props_2_lod",
      "h4_islandxdock_props_2_slod",
      "h4_islandxdock_props_lod",
      "h4_islandxdock_props_slod",
      "h4_islandxdock_slod",
      "h4_islandxdock_water_hatch",
      "h4_islandxtower",
      "h4_islandxtower_lod",
      "h4_islandxtower_slod",
      "h4_islandxtower_veg",
      "h4_islandxtower_veg_lod",
      "h4_islandxtower_veg_slod",
      "h4_islandx_barrack_hatch",
      "h4_islandx_barrack_props",
      "h4_islandx_barrack_props_lod",
      "h4_islandx_barrack_props_slod",
      "h4_islandx_checkpoint",
      "h4_islandx_checkpoint_lod",
      "h4_islandx_checkpoint_props",
      "h4_islandx_checkpoint_props_lod",
      "h4_islandx_checkpoint_props_slod",
      "h4_islandx_maindock",
      "h4_islandx_maindock_lod",
      "h4_islandx_maindock_props",
      "h4_islandx_maindock_props_2",
      "h4_islandx_maindock_props_2_lod",
      "h4_islandx_maindock_props_2_slod",
      "h4_islandx_maindock_props_lod",
      "h4_islandx_maindock_props_slod",
      "h4_islandx_maindock_slod",
      "h4_islandx_mansion",
      "h4_islandx_mansion_b",
      "h4_islandx_mansion_b_lod",
      "h4_islandx_mansion_b_side_fence",
      "h4_islandx_mansion_b_slod",
      "h4_islandx_mansion_entrance_fence",
      "h4_islandx_mansion_guardfence",
      "h4_islandx_mansion_lights",
      "h4_islandx_mansion_lockup_01",
      "h4_islandx_mansion_lockup_01_lod",
      "h4_islandx_mansion_lockup_02",
      "h4_islandx_mansion_lockup_02_lod",
      "h4_islandx_mansion_lockup_03",
      "h4_islandx_mansion_lockup_03_lod",
      "h4_islandx_mansion_lod",
      "h4_islandx_mansion_office",
      "h4_islandx_mansion_office_lod",
      "h4_islandx_mansion_props",
      "h4_islandx_mansion_props_lod",
      "h4_islandx_mansion_props_slod",
      "h4_islandx_mansion_slod",
      "h4_islandx_mansion_vault",
      "h4_islandx_mansion_vault_lod",
      "h4_island_padlock_props",
      "h4_mansion_gate_broken",
      "h4_mansion_gate_closed",
      "h4_mansion_remains_cage",
      "h4_mph4_airstrip",
      "h4_mph4_airstrip_interior_0_airstrip_hanger",
      "h4_mph4_beach",
      "h4_mph4_dock",
      "h4_mph4_island_lod",
      "h4_mph4_island_ne_placement",
      "h4_mph4_island_nw_placement",
      "h4_mph4_island_se_placement",
      "h4_mph4_island_sw_placement",
      "h4_mph4_mansion",
      "h4_mph4_mansion_b",
      "h4_mph4_mansion_b_strm_0",
      "h4_mph4_mansion_strm_0",
      "h4_mph4_wtowers",
      "h4_ne_ipl_00",
      "h4_ne_ipl_00_lod",
      "h4_ne_ipl_00_slod",
      "h4_ne_ipl_01",
      "h4_ne_ipl_01_lod",
      "h4_ne_ipl_01_slod",
      "h4_ne_ipl_02",
      "h4_ne_ipl_02_lod",
      "h4_ne_ipl_02_slod",
      "h4_ne_ipl_03",
      "h4_ne_ipl_03_lod",
      "h4_ne_ipl_03_slod",
      "h4_ne_ipl_04",
      "h4_ne_ipl_04_lod",
      "h4_ne_ipl_04_slod",
      "h4_ne_ipl_05",
      "h4_ne_ipl_05_lod",
      "h4_ne_ipl_05_slod",
      "h4_ne_ipl_06",
      "h4_ne_ipl_06_lod",
      "h4_ne_ipl_06_slod",
      "h4_ne_ipl_07",
      "h4_ne_ipl_07_lod",
      "h4_ne_ipl_07_slod",
      "h4_ne_ipl_08",
      "h4_ne_ipl_08_lod",
      "h4_ne_ipl_08_slod",
      "h4_ne_ipl_09",
      "h4_ne_ipl_09_lod",
      "h4_ne_ipl_09_slod",
      "h4_nw_ipl_00",
      "h4_nw_ipl_00_lod",
      "h4_nw_ipl_00_slod",
      "h4_nw_ipl_01",
      "h4_nw_ipl_01_lod",
      "h4_nw_ipl_01_slod",
      "h4_nw_ipl_02",
      "h4_nw_ipl_02_lod",
      "h4_nw_ipl_02_slod",
      "h4_nw_ipl_03",
      "h4_nw_ipl_03_lod",
      "h4_nw_ipl_03_slod",
      "h4_nw_ipl_04",
      "h4_nw_ipl_04_lod",
      "h4_nw_ipl_04_slod",
      "h4_nw_ipl_05",
      "h4_nw_ipl_05_lod",
      "h4_nw_ipl_05_slod",
      "h4_nw_ipl_06",
      "h4_nw_ipl_06_lod",
      "h4_nw_ipl_06_slod",
      "h4_nw_ipl_07",
      "h4_nw_ipl_07_lod",
      "h4_nw_ipl_07_slod",
      "h4_nw_ipl_08",
      "h4_nw_ipl_08_lod",
      "h4_nw_ipl_08_slod",
      "h4_nw_ipl_09",
      "h4_nw_ipl_09_lod",
      "h4_nw_ipl_09_slod",
      "h4_se_ipl_00",
      "h4_se_ipl_00_lod",
      "h4_se_ipl_00_slod",
      "h4_se_ipl_01",
      "h4_se_ipl_01_lod",
      "h4_se_ipl_01_slod",
      "h4_se_ipl_02",
      "h4_se_ipl_02_lod",
      "h4_se_ipl_02_slod",
      "h4_se_ipl_03",
      "h4_se_ipl_03_lod",
      "h4_se_ipl_03_slod",
      "h4_se_ipl_04",
      "h4_se_ipl_04_lod",
      "h4_se_ipl_04_slod",
      "h4_se_ipl_05",
      "h4_se_ipl_05_lod",
      "h4_se_ipl_05_slod",
      "h4_se_ipl_06",
      "h4_se_ipl_06_lod",
      "h4_se_ipl_06_slod",
      "h4_se_ipl_07",
      "h4_se_ipl_07_lod",
      "h4_se_ipl_07_slod",
      "h4_se_ipl_08",
      "h4_se_ipl_08_lod",
      "h4_se_ipl_08_slod",
      "h4_se_ipl_09",
      "h4_se_ipl_09_lod",
      "h4_se_ipl_09_slod",
      "h4_sw_ipl_00",
      "h4_sw_ipl_00_lod",
      "h4_sw_ipl_00_slod",
      "h4_sw_ipl_01",
      "h4_sw_ipl_01_lod",
      "h4_sw_ipl_01_slod",
      "h4_sw_ipl_02",
      "h4_sw_ipl_02_lod",
      "h4_sw_ipl_02_slod",
      "h4_sw_ipl_03",
      "h4_sw_ipl_03_lod",
      "h4_sw_ipl_03_slod",
      "h4_sw_ipl_04",
      "h4_sw_ipl_04_lod",
      "h4_sw_ipl_04_slod",
      "h4_sw_ipl_05",
      "h4_sw_ipl_05_lod",
      "h4_sw_ipl_05_slod",
      "h4_sw_ipl_06",
      "h4_sw_ipl_06_lod",
      "h4_sw_ipl_06_slod",
      "h4_sw_ipl_07",
      "h4_sw_ipl_07_lod",
      "h4_sw_ipl_07_slod",
      "h4_sw_ipl_08",
      "h4_sw_ipl_08_lod",
      "h4_sw_ipl_08_slod",
      "h4_sw_ipl_09",
      "h4_sw_ipl_09_lod",
      "h4_sw_ipl_09_slod",
      "h4_underwater_gate_closed",
      "h4_islandx_placement_01",
      "h4_islandx_placement_02",
      "h4_islandx_placement_03",
      "h4_islandx_placement_04",
      "h4_islandx_placement_05",
      "h4_islandx_placement_06",
      "h4_islandx_placement_07",
      "h4_islandx_placement_08",
      "h4_islandx_placement_09",
      "h4_islandx_placement_10",
      "h4_mph4_island_placement",
    ];
  },
  function (e, t, a) {
    const i = a(28);
    new (class {
      constructor() {
        (this.player = mp.players.local),
          (this.islandBounds = []),
          this.islandBounds.push(new Array(3326.365, -4240.541)),
          this.islandBounds.push(new Array(5072.705, -3550.056)),
          this.islandBounds.push(new Array(6269.617, -6009.813)),
          this.islandBounds.push(new Array(4297.188, -6994.53)),
          setInterval(async () => {
            if (!this.player) return;
            const e = misc.isPointInPolygon(
              this.player.position.x,
              this.player.position.y,
              this.islandBounds
            );
            if (
              (e && !this.isMapLoaded
                ? ((this.isMapLoaded = !0),
                  mp.game.invoke("0x5E1460624D194A38", this.isMapLoaded))
                : !e &&
                  this.isMapLoaded &&
                  ((this.isMapLoaded = !1),
                  mp.game.invoke("0x5E1460624D194A38", this.isMapLoaded)),
              !this.isLoaded)
            ) {
              this.isLoaded = !0;
              for (var t = 0; t < i.length; t++)
                mp.game.streaming.requestIpl(i[t]);
              const e = mp.game.interior.getInteriorAtCoords(
                4840.571,
                -5174.425,
                2
              );
              mp.game.interior.refreshInterior(e);
            }
          }, 500);
      }
    })();
  },
  function (e, t) {
    new (class {
      constructor() {
        (this.coords_shelves = {
          0: { x: 1724.9, y: 2580.5, z: 45 },
          1: { x: 1728.5, y: 2586.5, z: 45 },
          2: { x: 1725.5, y: 2583.4, z: 45 },
          3: { x: 1728.5, y: 2583.5, z: 45 },
          4: { x: 1738.2, y: 2590.4, z: 45 },
          5: { x: 1740.9, y: 2590.2, z: 45 },
          6: { x: 1745.6, y: 2592, z: 45 },
          7: { x: 1746.2, y: 2583.8, z: 45 },
          8: { x: 1743.2, y: 2583.6, z: 45 },
          9: { x: 1746.4, y: 2583.6, z: 45 },
        }),
          (this.coords_benches = {
            0: { x: 1741.2, y: 2565.7, z: 45 },
            1: { x: 1736.6, y: 2565.7, z: 45 },
            2: { x: 1732.2, y: 2565.7, z: 45 },
            3: { x: 1727.8, y: 2565.7, z: 45 },
            4: { x: 1725, y: 2568.2, z: 45 },
            5: { x: 1725, y: 2574.5, z: 45 },
          }),
          (this.coords_chestes = {
            0: { x: 1747.7, y: 2567.2, z: 45 },
            1: { x: 1745.7, y: 2567.2, z: 45 },
            2: { x: 1743.7, y: 2567.2, z: 45 },
          }),
          (this.pBCcl = 0),
          (this.cclNum = 0),
          (this.entities = []),
          this.createEvents(),
          (this.foodTimer = 30);
      }
      createEvents() {
        mp.events.add({
          playerEnterColshape: (e) => {
            if ("shelveShape" === e.name) {
              this.deleteEntitiesC_P("shelve"),
                mp.attachmentMngr.addLocal("getBox"),
                (this.pBCcl = 1),
                mp.events.callRemote("sPlayer-setAnimation", "boxCarry", !0);
              const e = Math.floor(6 * Math.random());
              this.createEntitiesC_P(
                this.coords_benches[e],
                "bench",
                1,
                "Место изготовления."
              ),
                misc.notif("Направляйтесь к месту изготовления.", "info");
            }
            "benchShape" === e.name &&
              (this.deleteEntitiesC_P("bench"),
              misc.notif("Время изготовления 15 сек.", "info"),
              mp.attachmentMngr.removeLocal("getBox"),
              mp.attachmentMngr.addLocal("pliers"),
              mp.events.callRemote("sPlayer-setAnimation", "bum_standing"),
              setTimeout(() => {
                mp.events.callRemote("sPlayer-setAnimation", "smoothCancel"),
                  mp.attachmentMngr.removeLocal("pliers"),
                  mp.attachmentMngr.addLocal("getBox"),
                  mp.events.callRemote("sPlayer-setAnimation", "boxCarry", !0);
                const e = Math.floor(3 * Math.random());
                this.createEntitiesC_P(this.coords_chestes[e], "chest", 1, "");
              }, 15e3)),
              "chestShape" === e.name &&
                (this.deleteEntitiesC_P("chest"),
                mp.events.callRemote("sPlayer-setAnimation", "loadBlock"),
                setTimeout(() => {
                  mp.events.callRemote("sPlayer-setAnimation", "smoothCancel"),
                    mp.attachmentMngr.removeLocal("getBox"),
                    1 === this.pBCcl &&
                      ((this.pBCcl = 0),
                      this.cclNum++,
                      mp.events.callRemote("sPrisonGetCclNum", this.cclNum),
                      mp.events.call("cPrisonCreateShelve"));
                }, 4e3));
          },
          cPrisonCclNum0: () => {
            (this.cclNum = 0),
              mp.events.callRemote("sPrisonGetCclNum", this.cclNum);
          },
          cPrisonCreateShelve: () => {
            const e = Math.floor(10 * Math.random());
            this.createEntitiesC_P(this.coords_shelves[e], "shelve", 1, "");
          },
          cPrisonDeleteClientEntities: () => {
            this.deleteEntitiesC_P("shelve"),
              this.deleteEntitiesC_P("bench"),
              this.deleteEntitiesC_P("chest"),
              this.deleteEntitiesC_P("employPr"),
              mp.events.callRemote("sPlayer-setAnimation", "smoothCancel"),
              mp.attachmentMngr.removeLocal("getBox"),
              mp.attachmentMngr.removeLocal("pliers"),
              mp.attachmentMngr.removeLocal("pistol_02a");
          },
          cPrisonTakeFood: () => {
            mp.events.callRemote("sPrisonEatFood", this.foodTimer),
              this.foodTimer >= 30 &&
                ((this.foodTimer = 0),
                (this.foodTimerInterval = setInterval(() => {
                  this.foodTimer++,
                    this.foodTimer >= 30 &&
                      clearInterval(this.foodTimerInterval);
                }, 6e4)));
          },
          cPrisonCrtEntJobBl: () => {
            let e = {
              name: "employPr",
              marker: null,
              shape: null,
              blip: mp.blips.new(1, new mp.Vector3(1731, 2573, 45.6), {
                name: "Тюремная работа",
                shortRange: !0,
                scale: 0.7,
                color: 46,
              }),
            };
            this.entities.push(e);
          },
          cPrisonDltEntJobBl: () => {
            this.deleteEntitiesC_P("employPr");
          },
        });
      }
      createEntitiesC_P(e, t, a, i) {
        let o = mp.markers.new(1, new mp.Vector3(e.x, e.y, e.z - 1), 1, {
            color: [0, 255, 0, 100],
            visible: !0,
          }),
          r = mp.colshapes.newSphere(e.x, e.y, e.z, 1);
        r.name = t + "Shape";
        let l = null;
        1 === a &&
          (l = mp.blips.new(1, new mp.Vector3(e.x, e.y, e.z), {
            name: i,
            shortRange: !1,
            scale: 0.7,
            color: 46,
          }));
        let n = { name: t, marker: o, shape: r, blip: l };
        this.entities.push(n);
      }
      deleteEntitiesC_P(e) {
        let t = null,
          a = -1;
        for (let i = 0; i <= this.entities.length - 1; i++)
          this.entities[i].name === e && ((t = this.entities[i]), (a = i));
        null !== t &&
          (null !== t.marker && t.marker.destroy(),
          null !== t.shape && t.shape.destroy(),
          null !== t.blip && t.blip.destroy(),
          this.entities.splice(a, 1));
      }
    })();
  },
  function (e, t) {
    new (class {
      constructor() {
        (this.coords_employ = {
          x: 992.07763671875,
          y: -2175.805908203125,
          z: 29.976865768432617,
        }),
          (this.coords_blip = {
            x: 936.325927734375,
            y: -2179.763916015625,
            z: 30.485671997070312,
          }),
          (this.coords_mincer = [
            { x: 975.18, y: -2119.6, z: 31.5 },
            { x: 994.3, y: -2162.7, z: 30.5 },
          ]),
          (this.coords_cowbeef = [
            { x: 993.9, y: -2128.3, z: 30 },
            { x: 994, y: -2126.4, z: 30 },
            { x: 995.7, y: -2120, z: 30 },
            { x: 995.6, y: -2116, z: 30 },
            { x: 1000.1, y: -2108.8, z: 30 },
            { x: 992.9, y: -2104.7, z: 30 },
            { x: 992.2, y: -2116.6, z: 30 },
            { x: 992.3, y: -2118.8, z: 30 },
            { x: 990.7, y: -2124.1, z: 30 },
            { x: 990.7, y: -2126.4, z: 30 },
          ]),
          (this.coords_boxes = [
            { x: 960.4, y: -2127.4, z: 31 },
            { x: 958.7, y: -2122.7, z: 31 },
            { x: 968.5, y: -2104.4, z: 31 },
            { x: 968.4, y: -2111.1, z: 31 },
          ]),
          (this.coords_cloth = {
            x: 990.0597534179688,
            y: -2175.379150390625,
            z: 30.025714874267578,
          }),
          (this.entities = []),
          (this.circleCount = 0),
          this.createEvents(),
          this.createClothShape(),
          this.createEntities(this.coords_employ, "employ", !1, !1, !1),
          mp.blips.new(
            78,
            new mp.Vector3(
              this.coords_blip.x,
              this.coords_blip.y,
              this.coords_blip.z
            ),
            { name: "Мясокомбинат", shortRange: !0, scale: 0.7, color: 46 }
          );
      }
      createEvents() {
        mp.events.add({
          cButcherStartWork: () => {
            (this.circleCount = 0), this.createCowbeef();
          },
          cButcherCutMeat: () => {
            mp.events.callRemote("sPlayer-setAnimation", "getKnife"),
              mp.attachmentMngr.addLocal("getKnife"),
              this.deleteEntities("cow"),
              setTimeout(() => {
                mp.events.callRemote("sPlayer-setAnimation", "smoothCancel"),
                  mp.attachmentMngr.removeLocal("getKnife"),
                  mp.attachmentMngr.addLocal("getBinBag");
                const e = misc.getRandomInt(0, this.coords_mincer.length - 1);
                this.createEntities(
                  this.coords_mincer[e],
                  "mincer",
                  "Место расположения мясорубки",
                  !1
                );
              }, 4e3);
          },
          cButcherLoadMeat: () => {
            mp.attachmentMngr.removeLocal("getBinBag"),
              mp.attachmentMngr.addLocal("getBinBag2"),
              mp.events.callRemote("sPlayer-setAnimation", "getWeedBlock"),
              this.deleteEntities("mincer"),
              setTimeout(() => {
                mp.events.callRemote("sPlayer-setAnimation", "smoothCancel"),
                  mp.attachmentMngr.removeLocal("getBinBag2"),
                  mp.attachmentMngr.addLocal("getBox"),
                  mp.events.callRemote("sPlayer-setAnimation", "boxCarry", !0);
                const e = misc.getRandomInt(0, this.coords_boxes.length - 1);
                this.createEntities(
                  this.coords_boxes[e],
                  "box",
                  "Место расположения ящиков.",
                  !1
                );
              }, 2e3);
          },
          cButcherPutBox: () => {
            mp.events.callRemote("sPlayer-setAnimation", "loadBlock"),
              this.deleteEntities("box"),
              setTimeout(() => {
                mp.events.callRemote("sPlayer-setAnimation", "smoothCancel"),
                  mp.attachmentMngr.removeLocal("getBox"),
                  this.circleCount++,
                  this.createCowbeef(),
                  mp.events.callRemote("sButcherEndCircle");
              }, 3e3);
          },
          cButcherEndWork: () => {
            this.deleteEntities("cow"),
              this.deleteEntities("mincer"),
              this.deleteEntities("box"),
              mp.attachmentMngr.removeLocal("getKnife"),
              mp.attachmentMngr.removeLocal("getBinBag"),
              mp.attachmentMngr.removeLocal("getBox"),
              mp.events.callRemote("sButcher-EndWork", this.circleCount),
              (this.circleCount = 0);
          },
        });
      }
      createCowbeef() {
        const e = misc.getRandomInt(0, this.coords_cowbeef.length - 1);
        this.createEntities(
          this.coords_cowbeef[e],
          "cow",
          "Место расположения туши коровы",
          !1
        );
      }
      createEntities(e, t, a, i, o = 1) {
        const r = mp.markers.new(1, new mp.Vector3(e.x, e.y, e.z - 1), 1, {
            color: [0, 255, 0, 100],
            visible: !0,
          }),
          l = mp.colshapes.newSphere(e.x, e.y, e.z, 1);
        l.butcher = t;
        let n = !1;
        a &&
          (n = mp.blips.new(o, new mp.Vector3(e.x, e.y, e.z), {
            name: a,
            shortRange: i,
            scale: 0.7,
            color: 46,
          }));
        const s = { name: t, marker: r, shape: l, blip: n };
        this.entities.push(s);
      }
      deleteEntities(e) {
        const t = this.entities.findIndex((t) => t.name === e);
        if (-1 !== t) {
          const { marker: e, shape: a, blip: i } = this.entities[t];
          e.destroy(), a.destroy(), i.destroy(), this.entities.splice(t, 1);
        }
      }
      createClothShape() {
        mp.markers.new(
          1,
          new mp.Vector3(
            this.coords_cloth.x,
            this.coords_cloth.y,
            this.coords_cloth.z - 1
          ),
          1,
          { color: [0, 255, 0, 100], visible: !0 }
        ),
          (mp.colshapes.newSphere(
            this.coords_cloth.x,
            this.coords_cloth.y,
            this.coords_cloth.z,
            1
          ).butcherClothes = !0);
      }
    })();
  },
  function (e, t) {},
  function (e) {
    e.exports = {
      219613597: [5, 9, 10],
      903794909: [10],
      2139203625: [42, 44, 45],
    };
  },
  function (e) {
    e.exports = {
      "Short Lip Spoiler": "Короткий спойлер",
      "Extended Lip Spoiler": "Широкий спойлер",
      "Bold-On Ducktail": "Утиный хвост",
      "Drag Spoiler": "Драг спойлер",
      "Stock Car Spoiler": "Серийный спойлер",
      "Mid Level Spoiler": "Спойлер среднего уровня",
      "Carbon Flap Spoiler": "Карбоновый откидной спойлер",
      "Low Spoiler": "Низкий спойлер",
      "Low Carbon Spoiler": "Низкий карбоновый спойлер",
      "Classic RS Wing": "Классическое RS крыло",
      "Primary Color Spoiler": "Основной цвет спойлера",
      "Secondary Color Spoiler": "Второстепенный цвет спойлера",
      "Carbon Spoiler": "Карбоновый спойлер",
      "Classic Carbon RS Wing": "Классическое карбоновое RS крыло",
      "Tuner Wing": "Настройка крыла",
      "High Level Spoiler": "Спойлер высшего уровня",
      "Carbon Wing Type II": "Карбоновое крыло 2 типа",
      "Race Spoiler": "Гоночный спойлер",
      "Touring Spoiler": "Туристический спойлер",
      "Extreme Downforce BGW": "Экстремальная прижимная сила BGW",
      "Muscle Killer Wing": "Крыло мускулистого убийцы",
      "Drift Wing": "Дрифт крыло",
      "Competition Spoiler": "Соревновательный спойлер",
      "GT Wing": "Крыло GT",
      "Tarmac Attack Wing": "Крыло тирана",
      "Extreme Street Racer Wing": "Крыло для экстремальных уличных гонок",
      "Extreme Time Attack Wing": "Крыло экстремальной атаки",
      "Cruise Spoiler Primary Color": "Основной цвет круизного спойлера",
      "Cruise Spoiler Secondary Color":
        "Второстепенный цвет круизного спойлера",
      "Cruise Spoiler Carbon": "Карбоновый круизный спойлер",
      "Street Spoiler Primary Color ": "Основной цвет уличного спойлера",
      "Street Spoiler Secondary Color": "Второстепенный цвет уличного спойлера",
      "Street Spoiler Carbon": "Карбоновый уличный спойлер",
      "Racing Spoiler": "Гоночный спойлер",
      "Remove Spoiler": "Демонтировать спойлер",
      "OTT Spoiler": "OTT спойлер",
      "Stickerbomb Splitter": "Стикербомб сплиттер",
      "Carbon Front Splitter": "Передний карбоновый сплиттер",
      "Painted Extended Splitter": "Окрашенный удлиненный сплиттер",
      "Black Extended Splitter": "Черный удлиненный сплиттер",
      "Extended Front Diffuser": "Удлиненный передний диффузор",
      "Splitter With Canards": "Сплиттер с уткой",
      "Primary Color Splitter": "Основной цвет сплиттера",
      "Secondary Color Splitter": "Второстепенный цвет сплиттера",
      "Carbon Splitter": "Карбоновый сплиттер",
      "Custom Front Splitter": "Кастомный передний сплиттер",
      "Custom Splitter & Intercooler": "Кастомный сплиттер и интеркулер",
      "Carbon Rear Diffuser": "Карбоновый задний диффузор",
      "Street Diffuser": "Уличный диффузор",
      "Race Diffuser": "Гоночный диффузор",
      "Carbon Track Diffuser": "Карбоновый трековый диффузор",
      "Carbon Race Diffuser": "Карбоновый гоночный диффузор",
      "Painted Rear Bumper": "Окрашенный задний бампер",
      "Painted Bumper & Diffuser": "Окрашенный бампер и диффузор",
      "Sideskirt Extensions": "Боковые широкие юбки",
      "Secondary Skirt Extensions": "Второстепенные широкие юбки",
      "Primary Skirts": "Основные юбки",
      "Secondary Skirts": "Второстепенные юбки",
      "Carbon Skirts": "Карбоновые юбки",
      "Carbon Skirt Extensions": "Карбоновые широкие юбки",
      "Drift Skirts": "Дрифт юбки",
    };
  },
  function (e) {
    e.exports = [
      "Спойлер",
      "Передний бампер",
      "Задний бампер ",
      "Пороги",
      "Выхлоп",
      "Защитная арматура",
      "Решетка радиатора",
      "Капот",
      "Крылья и арки",
      "Крылья",
      "Крыша",
      "Двигатель",
      "Тормоза",
      "Трансмиссия",
      "Гудок",
      "Подвеска",
      "",
      "",
      "Турбо",
      "",
      "Серебряная тень",
      "",
      "Фары",
      "Диски",
      "",
      "Номера",
      "Сетка бампера",
      "Внутренняя отделка",
      "Раскрас",
      "Приборная панель",
      "Спидометр",
      "Внутренняя отделка двери",
      "Сидения",
      "Руль",
      "Коробка передач",
      "Бляшка",
      "ICE",
      "Колонки",
      "Гидравлика",
      "Блок двигателя",
      "Воздушные фильтры",
      "Трубка двигателя",
      "Арка фар",
      "Антенны капота",
      "Внешняя отделка",
      "Бак",
      "Окна",
      "",
      "Наклейки",
    ];
  },
  function (e, t, a) {
    const i = a(35),
      o = a(8),
      r = a(34),
      l = a(33);
    mp.events.add({
      cCustomsGetVehMods: (e, t, a, n) => {
        const s = localplayer.vehicle,
          p = [];
        for (let e = 0; e < i.length; e++) {
          const t = s.getNumMods(e);
          if (t > 0 && i[e].length > 0) {
            if (l[s.model] && l[s.model].includes(e)) continue;
            const a = {
              title: i[e],
              modType: e,
              modTypes: [],
              selectedType: !1,
            };
            for (let o = -1; o < t; o++) {
              const t = `${i[e]} №${o + 1}`;
              a.modTypes.push({ itemName: t, modIndex: o });
            }
            (a.selectedType = s.getMod(e)), p.push(a);
          }
        }
        const m = {
            title: "Тонировка",
            modType: 100,
            modTypes: [
              { itemName: "Без тонировки", modIndex: 0 },
              { itemName: "Тонировка №1", modIndex: 5 },
              { itemName: "Тонировка №2", modIndex: 3 },
              { itemName: "Тонировка №3", modIndex: 2 },
              { itemName: "Тонировка №4", modIndex: 1 },
            ],
            selectedType: s.getWindowTint(),
          },
          d = {
            title: "Ксенон",
            modType: 22,
            modTypes: [
              { itemName: "Стандартные фары", modIndex: -1 },
              { itemName: "Ксеноновые фары", modIndex: 0 },
            ],
            selectedType: s.getMod(22),
          },
          c = {
            title: "Турбонаддув",
            modType: 18,
            modTypes: [
              { itemName: "Без турбонаддува", modIndex: -1 },
              { itemName: "Турбонаддув", modIndex: 0 },
            ],
            selectedType: a,
          };
        if ((p.push(m), p.push(d), 8 === s.getClass())) {
          p.find((e) => "Диски" === e.title).isMoto = !0;
        } else p.push(c);
        p.forEach((a) => {
          const i = o[a.title];
          a.modTypes.forEach((a) => {
            (a.price = misc.roundNum(
              i[a.itemName] ? (e / 100) * i[a.itemName] : (e / 100) * i.default
            )),
              (a.mats = misc.roundNum(a.price / 15)),
              (a.price += misc.roundNum(a.price * (t / 100))),
              r[a.itemName] && (a.itemName = r[a.itemName]);
          });
        });
        const _ = {
          paint: { price: misc.roundNum((e / 100) * o["Покраска"].default) },
          neon: {
            price: misc.roundNum((e / 100) * o["Неоновая подсветка"].default),
          },
          repair: { price: o["Починка"].default },
        };
        for (key in _)
          (_[key].mats = misc.roundNum(_[key].price / 15)),
            (_[key].price += misc.roundNum(_[key].price * (t / 100)));
        mp.events.call("cRenderChangeDisableKey", [200], !0),
          (n += `storage.setVehicleMods(${JSON.stringify(p)});`),
          (n += `storage.setVehicleAdditionalPrice(${JSON.stringify(_)});`),
          misc.injectCef(n),
          misc.openMenu("lscustoms", !1, !1);
      },
    });
  },
  function (e, t, a) {
    const i = a(9),
      o = a(4);
    mp.events.add({
      cBarberShopOpenMenu: (e, t, a) => {
        mp.events.call("cClothingShopCreateCam", e, "head");
        const r = 1885233650 === localplayer.model ? 0 : 1;
        let l = `storage.setBusinessId(${t});`;
        (l += `storage.setFirstObj(${JSON.stringify(
          (function (e, t) {
            const a = {};
            for (const r in i.assort)
              if ((a[r] || (a[r] = []), "eyecolor" === r))
                for (const e in i.assort[r]) {
                  const l = {
                    title: i.assort[r][e].title,
                    mat: i.assort[r][e].mat,
                    key: i.assort[r][e].key,
                    price:
                      o.material * i.assort[r][e].mat +
                      Math.ceil(o.material * i.assort[r][e].mat * (t / 100)),
                  };
                  a[r].push(l);
                }
              else
                for (const l in i.assort[r][e]) {
                  const n = {
                    title: i.assort[r][e][l].title,
                    mat: i.assort[r][e][l].mat,
                    key: i.assort[r][e][l].key,
                    price:
                      o.material * i.assort[r][e][l].mat +
                      Math.ceil(o.material * i.assort[r][e][l].mat * (t / 100)),
                  };
                  i.assort[r][e][l].variation &&
                    (n.variation = i.assort[r][e][l].variation),
                    a[r].push(n);
                }
            return a;
          })(r, a)
        )});`),
          (l += `storage.setArrayFirst(${JSON.stringify(i.primaryColors)});`),
          (l += `storage.setArraySecond(${JSON.stringify(
            i.secondaryColors
          )});`),
          misc.injectCef(l);
      },
      cBarberShopSwithCam: (e) => {
        if ("chest" === e) {
          const e = misc.cloneObj(targetPos);
          (e.z -= 0.3),
            misc.createCam(
              camD.x,
              camD.y,
              camD.z - 0.3,
              camD.rx,
              camD.ry,
              camD.rz,
              camD.viewangle,
              e
            );
        } else
          misc.createCam(
            camD.x,
            camD.y,
            camD.z,
            camD.rx,
            camD.ry,
            camD.rz,
            camD.viewangle,
            targetPos
          );
      },
      cBarberShopPreview: (e) => {
        const t = JSON.parse(e);
        if ("hair" === t.type) {
          let e = 0;
          t.select.variation && (e = t.select.variation),
            localplayer.setComponentVariation(2, t.select.key, e, 0),
            localplayer.setHairColor(t.color.first, t.color.second);
        }
        "beard" === t.type &&
          localplayer.setHeadOverlay(
            1,
            t.select.key,
            100,
            t.color.first,
            t.color.second
          ),
          "makeup" === t.type &&
            localplayer.setHeadOverlay(
              4,
              t.select.key,
              100,
              t.color.first,
              t.color.second
            ),
          "eyebrows" === t.type &&
            localplayer.setHeadOverlay(
              2,
              t.select.key,
              100,
              t.color.first,
              t.color.second
            ),
          "chest" === t.type &&
            localplayer.setHeadOverlay(
              10,
              t.select.key,
              100,
              t.color.first,
              t.color.second
            ),
          "eyecolor" === t.type && localplayer.setEyeColor(t.select.key);
      },
    });
  },
  function (e, t) {
    function a(e) {
      const t = { remove: [] },
        a = JSON.parse(localplayer.getVariable("TATTOOS")),
        i = 1885233650 === localplayer.model ? "malehash" : "femalehash";
      for (let o in cc.tattoos)
        for (let r in cc.tattoos[o]) {
          const l = cc.tattoos[o][r],
            n = l.id;
          if (l[i]) {
            const i = a.includes(n);
            let r = l.mat;
            const s = l.title,
              p = l.slots;
            i && (r = misc.roundNum(r / 2));
            const m = {
              id: n,
              title: s,
              price:
                cc.matsPrice.material * r +
                Math.ceil(cc.matsPrice.material * r * (e / 100)),
              haveTattoo: i,
              slots: p,
              placeType: o,
            };
            t[o] || (t[o] = []), t[o].push(m), i && t.remove.push(m);
          }
        }
      return t;
    }
    mp.events.add({
      cTattoSaloneOpenMenu: (e, t, i) => {
        mp.events.call("cClothingShopCreateCam", e);
        const o = a(i);
        let r = `storage.setBusinessId(${t});`;
        (r += `storage.setFirstObj(${JSON.stringify(o)});`),
          misc.injectCef(r),
          misc.openMenu("tattoSalone");
      },
      cTattoSalonePreview: (e) => {
        const t = JSON.parse(localplayer.getVariable("TATTOOS"));
        misc.setTattoo(localplayer, t);
        const a = misc.getTattoo(e);
        for (let e of t) {
          const t = misc.getTattoo(e);
          if (a.type === t.type)
            for (let e of t.slots)
              if (a.slots.includes(e))
                return misc.notif(
                  `Место занято татуировкой: ${t.title}`,
                  "error"
                );
        }
        localplayer.setDecoration(
          mp.game.joaat(a.dictionary),
          mp.game.joaat(a.malehash || a.femalehash)
        );
      },
      cTattoSaloneRotPlayer: (e) => {
        let t = localplayer.getHeading();
        "l" === e ? (t -= 3) : (t += 3), localplayer.setHeading(t);
      },
      cTattoSaloneUpdateCatalog: (e) => {
        const t = a(e),
          i = `storage.setFirstObj(${JSON.stringify(t)});`;
        misc.injectCef(i);
      },
    });
  },
  function (e, t, a) {
    const i = a(4);
    let o = [];
    const r = {};
    let l = "main",
      n = 0;
    const s = { backpack: -180, earrings: 30, watch: -85, bracelet: 85 };
    function p(e) {
      const t = misc.xyInFrontOfPos(e, e.rot, 1.7);
      r.main = { position: t, target: e, zOffset: 0 };
      const a = misc.xyInFrontOfPos(e, e.rot, 1);
      r.body = { position: a, target: e, zOffset: 0.5 };
      const i = misc.xyInFrontOfPos(e, e.rot, 1.2);
      r.backpack = { position: i, target: e, zOffset: 0.3 };
      const o = misc.xyInFrontOfPos(e, e.rot, 0.5);
      (r.head = { position: o, target: e, zOffset: 0.7 }),
        (r.pants = { position: a, target: e, zOffset: -0.4 }),
        (r.feet = {
          position: a,
          target: e,
          zOffset: -0.6,
          zOffsetTarget: -0.7,
        });
      const l = misc.xyInFrontOfPos(e, e.rot, 0.9);
      r.watch = { position: l, target: e, zOffset: 0 };
      const n = misc.xyInFrontOfPos(e, e.rot, 0.8);
      (r.accessories = { position: n, target: e, zOffset: 0.5 }),
        (r.gloves = { position: l, target: e, zOffset: -0.1 });
      const s = misc.xyInFrontOfPos(e, e.rot, 0.6);
      r.chest = { position: s, target: e, zOffset: 0.3 };
      const p = misc.xyInFrontOfPos(o, e.rot - 90, 0.1),
        m = misc.xyInFrontOfPos(e, e.rot - 90, 0.1);
      r.torso0 = { position: p, target: m, zOffset: 0.4 };
      const d = misc.xyInFrontOfPos(o, e.rot + 90, 0.1),
        c = misc.xyInFrontOfPos(e, e.rot + 90, 0.1);
      (r.torso1 = { position: d, target: c, zOffset: 0.4 }),
        (r.torso01 = { position: o, target: e, zOffset: 0.4 }),
        (r.torso2 = { position: o, target: e, zOffset: 0.2 });
      const _ = misc.xyInFrontOfPos(e, e.rot, -0.5);
      (r.torso34 = { position: _, target: e, zOffset: 0.1 }),
        (r.torso3456 = { position: _, target: e, zOffset: 0.3 }),
        (r.torso56 = { position: _, target: e, zOffset: 0.4 });
      const u = misc.xyInFrontOfPos(e, e.rot - 70, 0.5);
      r.torso7 = { position: u, target: e, zOffset: 0.2 };
      const h = misc.xyInFrontOfPos(e, e.rot + 70, 0.5);
      r.torso8 = { position: h, target: e, zOffset: 0.2 };
      const y = misc.xyInFrontOfPos(e, e.rot + 40, 0.5);
      r.torso28 = { position: y, target: e, zOffset: 0.2 };
      const b = misc.xyInFrontOfPos(_, e.rot - 90, -0.1),
        I = misc.xyInFrontOfPos(e, e.rot - 90, -0.1);
      r.torso5 = { position: b, target: I, zOffset: 0.5 };
      const x = misc.xyInFrontOfPos(_, e.rot + 90, -0.1),
        f = misc.xyInFrontOfPos(e, e.rot + 90, -0.1);
      (r.torso6 = { position: x, target: f, zOffset: 0.5 }),
        (r.torso3 = { position: b, target: I, zOffset: 0.1 }),
        (r.torso4 = { position: x, target: f, zOffset: 0.1 }),
        (r.torso0128 = { position: o, target: e, zOffset: 0.2 }),
        (r.head0 = { position: o, target: e, zOffset: 0.6 });
      const P = misc.xyInFrontOfPos(e, e.rot - 90, 0.4);
      r.head1 = { position: P, target: e, zOffset: 0.6 };
      const w = misc.xyInFrontOfPos(e, e.rot + 90, 0.4);
      r.head2 = { position: w, target: e, zOffset: 0.6 };
      const g = misc.xyInFrontOfPos(e, e.rot, -0.4);
      (r.head3 = { position: g, target: e, zOffset: 0.6 }),
        (r.head5 = { position: w, target: e, zOffset: 0.6 });
      const M = misc.xyInFrontOfPos(e, e.rot + 90, 0.2),
        N = misc.xyInFrontOfPos(e, e.rot - 130, 0.2),
        v = misc.xyInFrontOfPos(M, e.rot, 0.5);
      r.leftarm1 = { position: v, target: M, zOffset: 0 };
      const T = misc.xyInFrontOfPos(e, e.rot + 90, 0.3),
        k = misc.xyInFrontOfPos(T, e.rot, -0.4);
      r["leftarm1-1"] = { position: k, target: T, zOffset: 0.1 };
      const S = misc.xyInFrontOfPos(e, e.rot + 90, 0.6),
        F = misc.xyInFrontOfPos(e, e.rot + 90, 0.7);
      (r.leftarm2 = { position: S, target: e, zOffset: 0.3 }),
        (r["leftarm2-1"] = { position: v, target: M, zOffset: 0.3 });
      const C = misc.xyInFrontOfPos(e, e.rot + 65, 0.6);
      (r.leftarm0 = { position: C, target: e, zOffset: -0.1 }),
        (r.leftarm12 = { position: F, target: e, zOffset: 0.2 });
      const V = misc.xyInFrontOfPos(e, e.rot - 90, 0.2),
        z = misc.xyInFrontOfPos(V, e.rot, 0.5);
      r.rightarm1 = { position: z, target: V, zOffset: 0 };
      const A = misc.xyInFrontOfPos(e, e.rot - 90, 0.3),
        D = misc.xyInFrontOfPos(A, e.rot, -0.4);
      r["rightarm1-1"] = { position: D, target: A, zOffset: 0.1 };
      const R = misc.xyInFrontOfPos(e, e.rot - 90, 0.6),
        E = misc.xyInFrontOfPos(e, e.rot - 90, 0.7);
      (r.rightarm2 = { position: R, target: e, zOffset: 0.3 }),
        (r["rightarm2-1"] = { position: z, target: V, zOffset: 0.3 });
      const B = misc.xyInFrontOfPos(e, e.rot - 65, 0.6);
      (r.rightarm0 = { position: B, target: e, zOffset: -0.1 }),
        (r.rightarm12 = { position: E, target: e, zOffset: 0.2 });
      const L = misc.xyInFrontOfPos(M, e.rot, -0.5);
      (r.leftleg0 = { position: L, target: M, zOffset: -0.6 }),
        (r.leftleg1 = { position: v, target: M, zOffset: -0.4 });
      const O = misc.xyInFrontOfPos(e, e.rot + 90, 0.9);
      (r.leftleg01 = { position: O, target: e, zOffset: -0.5 }),
        (r["leftleg1-1"] = { position: O, target: e, zOffset: -0.5 }),
        (r["leftleg0-1"] = { position: v, target: M, zOffset: -0.6 });
      const H = misc.xyInFrontOfPos(N, e.rot, -0.6);
      r.rightleg0 = { position: H, target: N, zOffset: -0.6 };
      const j = misc.xyInFrontOfPos(N, e.rot, 0.5);
      r.rightleg1 = { position: j, target: N, zOffset: -0.4 };
      const G = misc.xyInFrontOfPos(e, e.rot - 90, 0.9);
      (r.rightleg01 = { position: G, target: e, zOffset: -0.5 }),
        (r["rightleg1-1"] = { position: G, target: e, zOffset: -0.5 }),
        (r["rightleg0-1"] = { position: j, target: N, zOffset: -0.7 }),
        (r["rightleg0-2"] = { position: R, target: e, zOffset: -0.6 });
    }
    function m(e) {
      const { position: t, target: a, zOffset: i, zOffsetTarget: o } = r[e];
      (r[e].camera = mp.cameras.new(
        e,
        new mp.Vector3(t.x, t.y, t.z + i),
        new mp.Vector3(0, 0, 0),
        70
      )),
        r[e].camera.pointAtCoord(a.x, a.y, a.z + (o || i)),
        r[e].camera.setActive(!0),
        mp.game.cam.renderScriptCams(!0, !1, 0, !1, !1);
    }
    const d = misc.throttle(function (e, t, a, i) {
      a
        ? localplayer.setHeading(n)
        : (function (e) {
            const t = s[e];
            t
              ? localplayer.setDesiredHeading(n + t)
              : localplayer.setDesiredHeading(n);
          })(e);
      let o = t
        ? (function (e) {
            switch (e) {
              case "main":
              case "remove":
                return "main";
              case "undershirt":
              case "jacket":
              case "torso":
                return "body";
              case "backpack":
                return "backpack";
              case "hats":
              case "glass":
              case "earrings":
              case "head":
                return "head";
              case "pants":
                return "pants";
              case "feet":
                return "feet";
              case "watch":
              case "bracelet":
                return "watch";
              case "accessories":
                return "accessories";
              case "gloves":
                return "gloves";
              case "chest":
                return "chest";
              default:
                return "main";
            }
          })(e)
        : e;
      if ((r[o] || (o = "main"), o === l)) return;
      m(o), r[o].camera.setActiveWithInterp(r[l].camera.handle, i, 0, 0);
      const p = r[l].camera;
      (r[l].camera = null), setTimeout(() => p.destroy(), i), (l = o);
    }, 550);
    mp.events.add({
      cClothingShopOpenMenu: (e, t, a, r, s) => {
        const d = misc.cloneObj(o[a]);
        for (const e in d)
          d[e].forEach((e) => {
            e.price =
              i.material * e.mats + Math.ceil((i.material * e.mats * s) / 100);
          });
        let c = `storage.setBusinessId(${t});`;
        (c += `storage.setFirstObj(${JSON.stringify(d)});`),
          "mask" !== a &&
            "jewelry" !== a &&
            ((c += `storage.setSecondObj(${JSON.stringify({ style: a })});`),
            (c += `storage.setJacketUnderTypes(${JSON.stringify(r)});`)),
          misc.injectCef(c),
          (n = e.rot),
          p(e),
          m((l = "mask" === a ? "head" : "main")),
          "mask" === a
            ? misc.openMenu("masksStore")
            : "jewelry" === a
            ? misc.openMenu("jewelry")
            : misc.openMenu("clothShop");
      },
      cClothingShopCreateCam: (e, t = "main") => {
        (n = e.rot), p(e), m(t), (l = t);
      },
      cClothingShopSetData: (e) => {
        o = e;
      },
      cClothingShopDestroyCameras: () => {
        !(function (e) {
          const t = r[e].camera;
          t.setActive(!1),
            mp.game.cam.renderScriptCams(!1, !0, 0, !0, !0),
            t.destroy();
        })(l);
      },
      cClothingShopSwitchCam: (e, t = !0, a = !1, i = 500) => {
        d(e, t, a, i);
      },
    });
  },
  function (e, t) {
    let a = { model: null, color: null, entity: null };
    const i = new mp.Vector3(-43.9, -1096.6, 26.1),
      o = new mp.Vector3(-704, -1337.1, 0.2);
    let r = "",
      l = [],
      n = [];
    mp.events.add({
      cVehShopOpenBuyerMenu: (e, t, a, i, o) => {
        const s = misc.cloneObj(l[t]);
        for (let e = 0, t = s.length; e < t; e++) {
          const t = s[e];
          (t.have = !1 === o || o.includes(t.model)),
            (t.price += Math.ceil((t.price * i) / 100));
        }
        s.sort((e, t) =>
          e.title.toLowerCase() < t.title.toLowerCase()
            ? -1
            : e.title.toLowerCase() > t.title.toLowerCase()
            ? 1
            : 0
        );
        let p = `storage.setBusinessId(${e});`;
        (p += `storage.setFirstObj(${JSON.stringify({
          styleShop: t,
          dim: a,
        })});`),
          (p += `storage.setArrayFirst(${JSON.stringify(s)});`),
          (p += `storage.setArraySecond(${JSON.stringify(n)});`),
          misc.injectCef(p),
          misc.openMenu("vehShop"),
          (r = t),
          "pegassi" === t
            ? misc.createCam(-714.6, -1343.2, 2, 0, 0, 306, 60)
            : misc.createCam(-50.8, -1101.3, 26.5, 0, 0, 306, 60);
      },
      cVehShopSpawn: (e, t) => {
        let l = JSON.parse(e);
        const n = "pegassi" === r ? o : i;
        a.entity
          ? ((a.entity.model = mp.game.joaat(l.model)),
            a.entity.setRotation(0, 0, 180, 2, !0),
            (a.entity.position = n),
            "pegassi" === r && misc.setAnchor(a.entity, !0))
          : ((a.entity = mp.vehicles.new(mp.game.joaat(l.model), n, {
              heading: 180,
              numberPlate: "CARROOM",
              alpha: 255,
              color: [
                [0, 0, 0],
                [0, 0, 0],
              ],
              locked: !1,
              engine: !1,
              dimension: t,
            })),
            (a.entity.spawned = !0),
            a.entity.setRotation(0, 0, 180, 2, !0),
            "pegassi" === r && misc.setAnchor(a.entity, !0));
        let s = {
            maxSpeed: mp.game.vehicle.getVehicleModelMaxSpeed(
              mp.game.joaat(l.model)
            ),
            braking: (
              (mp.game.vehicle.getVehicleModelMaxBraking(
                mp.game.joaat(l.model)
              ) /
                1.5) *
              100
            ).toFixed(2),
            acceleration: (
              100 *
              mp.game.vehicle.getVehicleModelAcceleration(
                mp.game.joaat(l.model)
              )
            ).toFixed(2),
            maxPassagersCar:
              mp.game.vehicle.getVehicleModelMaxNumberOfPassengers(
                mp.game.joaat(l.model)
              ),
            maxSpeedKm: (
              3.6 *
              mp.game.vehicle.getVehicleModelMaxSpeed(mp.game.joaat(l.model))
            ).toFixed(0),
          },
          p = `storage.setSecondObj(${JSON.stringify(s)});`;
        misc.injectCef(p);
      },
      cVehShopColor: (e) => {
        if (a.entity) {
          let t = JSON.parse(e);
          a.entity.setCustomPrimaryColour(t[0], t[1], t[2]),
            a.entity.setCustomSecondaryColour(t[0], t[1], t[2]);
        }
      },
      cVehShopTurn: (e) => {
        if (a.entity) {
          "pegassi" === r && misc.setAnchor(a.entity, !1);
          var t = a.entity.getHeading();
          "l" === e ? (t -= 3) : (t += 3),
            a.entity.setHeading(t),
            "pegassi" === r && misc.setAnchor(a.entity, !0);
        }
      },
      cVehShopExit: () => {
        mp.events.callRemote("sVehShopExit"),
          misc.destroyCam(),
          a.entity && (a.entity.destroy(), (a.entity = null));
      },
      cVehShopLoadData: (e, t) => {
        (l = e), (n = t);
      },
    });
  },
  function (e, t, a) {
    const i = a(3),
      o = {
        x: -1027.0980224609375,
        y: -2735.058349609375,
        z: 13.75664234161377,
      },
      r = { x: 2016.408447265625, y: 4987.33740234375, z: 42.09822082519531 },
      l = mp.blips.new(280, o, { name: "Лысый незнакомец", shortRange: !0 });
    let n = !1,
      s = !1;
    const p = mp.labels.new(
        "Лысый незнакомец",
        new mp.Vector3(o.x, o.y, o.z + 1),
        { drawDistance: 20, color: [255, 255, 255, 255], dimension: 0 }
      ),
      m = {
        firstStanley: {
          title: "Поговорить с лысым незнакомцем",
          icon: "question",
          description:
            "Похоже этому человеку что-то нужно от меня, поговорю-ка я с ним.",
          reward: [],
          steps: [
            { title: "Поговорить с лысым незнакомцем", complete: !1, show: !0 },
          ],
          main: !0,
        },
        stanleyBeer: {
          title: "Принеси Стенли бутылку пива",
          icon: "dollars",
          description: `Cтенли попросил принести ему бутылку пива и дал мне ${i.stanleyBeer}$. Он сказал что сдачу я могу потратить на что угодно, например купить себе покушать.`,
          reward: [],
          steps: [
            { title: "Купить бутылку пива", complete: !1, show: !0 },
            { title: "Принести пиво Stanley", complete: !1, show: !0 },
          ],
          main: !0,
        },
        farm: {
          title: "Поработать на ферме",
          icon: "dollars",
          description:
            "Cтенли зарекомендовал меня Бену, главному на ферме в Сенди-Шорс. Я могу поработать на него и заработать неплохих денег.",
          reward: [{ title: `${i.farm}$`, icon: "dollars" }],
          steps: [
            { title: "Поговорить с Беном", complete: !1, show: !0 },
            {
              title: "Принести на склад 5 полных корзин",
              complete: !1,
              show: !1,
            },
            { title: "Поговорить с Беном", complete: !1, show: !1 },
            { title: "Купить канистру", complete: !1, show: !1 },
            { title: "Заправить её дизелем", complete: !1, show: !1 },
            { title: "Поговорить с Беном", complete: !1, show: !1 },
          ],
          main: !0,
        },
        document: {
          title: "Получение нужных документов",
          icon: "dollars",
          description:
            "Поработав немного на Бена он посоветовал мне получить прописку в штате, для этого нужно смотаться в мэрию.",
          reward: [
            { title: "1000$", icon: "dollars" },
            { title: "Vip platinum", icon: "vip" },
          ],
          steps: [
            { title: "Поговорить с Джессикой в мэрии", complete: !1, show: !0 },
            { title: "Получить прописку в мэрии", complete: !1, show: !1 },
            { title: "Поговорить с Джессикой", complete: !1, show: !1 },
            { title: "Отправиться на мясокомбинат", complete: !1, show: !1 },
            {
              title: "Отнести на склад 5 коробок мяса",
              complete: !1,
              show: !1,
            },
            {
              title: "Вернуться в мэрию к Джессике за вознаграждением",
              complete: !1,
              show: !1,
            },
            { title: "Получить мед-карту в больнице", complete: !1, show: !1 },
            {
              title: "Получить права категории А в автошколе",
              complete: !1,
              show: !1,
            },
            { title: "Вернуться к Джессике", complete: !1, show: !1 },
          ],
          main: !0,
        },
        electric: {
          title: "Электрик",
          icon: "dollars",
          description:
            "Джессика отправила меня на работу электриком, так как там сейчас нехватка рабочих, починив 5 щитков я вернусь к ней и она выпишет мне премию с бюджета штата.",
          reward: [
            { title: `${i.electric}$`, icon: "dollars" },
            { title: "Авто", icon: "car" },
          ],
          steps: [
            { title: "Починить 5 счетчиков", complete: !1, show: !0 },
            { title: "Поговорить с Джессикой", complete: !1, show: !1 },
            { title: "Получить категорию В", complete: !1, show: !1 },
            { title: "Заселится в отель", complete: !1, show: !1 },
            { title: "Вернутся к Джессике за машиной", complete: !1, show: !1 },
          ],
          main: !0,
        },
        guitar: {
          title: "Гитара",
          icon: "dollars",
          description:
            "Джессика сказала что её отцу Бену нужна новая гитара. Я могу купить её в магазине электроники и привести ему.",
          reward: [],
          steps: [
            { title: "Купить гитару", complete: !1, show: !0 },
            {
              title: "Поговорить с Беном и отдать гитару",
              complete: !1,
              show: !1,
            },
          ],
          main: !0,
        },
        bus: {
          title: "Водитель автобуса",
          icon: "dollars",
          description:
            "Бен попросил съездить 3 маршрута на красном автобусе в качестве водителя, за это он хорошо меня отблагодарит.",
          reward: [{ title: `${i.bus}$`, icon: "dollars" }],
          steps: [
            {
              title: "Проехать 3 рейса на красном маршруте",
              complete: !1,
              show: !0,
            },
            { title: "Вернуться к Бену", complete: !1, show: !1 },
          ],
          main: !0,
        },
        trucker: {
          title: "Дальнобойщик",
          icon: "dollars",
          description:
            "Бен попросил меня устроится дальнобойщиком и отвести 10 рейсов с его склада на продуктовый завод.",
          reward: [{ title: `${i.trucker}$`, icon: "dollars" }],
          steps: [
            {
              title: "Сделать 10 рейсов с фермы на завод",
              complete: !1,
              show: !0,
            },
            { title: "Вернуться к Бену за наградой", complete: !1, show: !1 },
          ],
          main: !0,
        },
        beerForStanley: {
          title: "Бутылка пива для Стенли",
          icon: "question",
          description:
            "Бен попросил меня отвести Стенли бутылку пива, пора увидеть своего старого знакомого.",
          reward: [],
          steps: [{ title: "Передать пиво Stanley", complete: !1, show: !0 }],
          main: !0,
        },
        stash: {
          title: "Заначка",
          icon: "question",
          description: "",
          reward: [],
          steps: [
            { title: "Раздобыть лопату", complete: !1, show: !0 },
            { title: "Выкопать заначку", complete: !1, show: !1 },
          ],
          main: !0,
        },
        goldenFish: {
          title: "Поймать золотую рыбку",
          icon: "question",
          description:
            "Странный пожилой человек попросил меня принести золотую рыбку если я её поймаю, сказки какие-то.",
          reward: [],
          steps: [
            { title: "принести золотую рыбку Георгу", complete: !1, show: !0 },
          ],
        },
        govCarSteal: {
          title: "Угони автомобиль ??",
          icon: "car",
          description: "?? попросил угнать автомобиль ??? и привезти ему.",
          reward: [{ title: `${i.govCarSteal}$`, icon: "dollars" }],
          steps: [{ title: "Угнать авто для ??", complete: !1, show: !0 }],
        },
        eliteCarSteal: {
          title: "Угони автомобиль ??",
          icon: "car",
          description: "?? попросил угнать автомобиль ??? и привезти ему.",
          reward: [{ title: `${i.eliteCarSteal}$`, icon: "dollars" }],
          steps: [{ title: "Угнать авто для ??", complete: !1, show: !0 }],
        },
        houseBreakIn: {
          title: "Взломай шкаф дома №??",
          icon: "dollars",
          description: "?? попросил взломать шкаф дома №???.",
          reward: [{ title: `${i.houseBreakIn}$`, icon: "dollars" }],
          steps: [
            {
              title: "Проникнуть в дом и взломать шкаф",
              complete: !1,
              show: !0,
            },
            { title: "Вернуться к ??", complete: !1, show: !1 },
          ],
        },
        capture: {
          title: "Захват ",
          icon: "dollars",
          description: "?? попросил нашу организацию захватить ",
          reward: [{ title: `${i.capture}$`, icon: "dollars" }],
          steps: [
            { title: "Захватить ", complete: !1, show: !0 },
            { title: "Вернуться к ", complete: !1, show: !1 },
          ],
        },
        weapon: {
          title: "Доставка оружия",
          icon: "dollars",
          description:
            "?? попросил нашу организацию доставить ??? в количестве ???? шт.",
          reward: [{ title: "", icon: "dollars" }],
          steps: [
            { title: "Продать оружие", complete: !1, show: !0 },
            { title: "Вернуться за наградой", complete: !1, show: !1 },
          ],
        },
      };
    let d = [];
    mp.events.add({
      cQuestLoadData: (e) => {
        const t = JSON.parse(e),
          a = misc.cloneObj(m),
          i = [];
        for (let e in a) a[e].main && i.unshift(a[e]);
        (a.firstStanley.last = !0), t.goldenFish && i.unshift(a.goldenFish);
        for (let e in t)
          "goldenFish" !== e &&
            a[e] &&
            ((a[e].last = !0),
            !0 === t[e].end &&
              a[e].steps.forEach((e) => {
                (e.complete = !0), (e.show = !0);
              }));
        t.stanleyBeer &&
          (!1 === n &&
            (l.destroy(),
            (n = mp.blips.new(280, o, { name: "Stanley", shortRange: !0 })),
            (p.text = "Stanley")),
          (a.firstStanley.steps[0].complete = !0),
          !0 !== t.stanleyBeer.end &&
            (t.stanleyBeer.haveBeer
              ? (a.stanleyBeer.steps[0].complete = !0)
              : (a.stanleyBeer.steps[1].show = !1))),
          t.farm &&
            (!1 === s &&
              (s = mp.blips.new(280, r, { name: "Ben", shortRange: !0 })),
            !0 !== t.farm.end &&
              (!0 === t.farm.start &&
                ((a.farm.steps[0].complete = !0),
                (a.farm.steps[1].show = !0),
                (a.farm.steps[1].title += ` (${t.farm.count}/5)`),
                t.farm.count >= 5 &&
                  ((a.farm.steps[1].complete = !0),
                  (a.farm.steps[2].show = !0))),
              t.farm.fuelStart &&
                ((a.farm.steps[2].complete = !0),
                (a.farm.steps[3].show = !0),
                !0 === t.farm.haveJerrycan &&
                  ((a.farm.steps[3].complete = !0),
                  (a.farm.steps[4].show = !0),
                  !0 === t.farm.haveDiesel &&
                    ((a.farm.steps[4].complete = !0),
                    (a.farm.steps[5].show = !0)))))),
          t.document &&
            !0 !== t.document.end &&
            (!0 === t.document.talk &&
              ((a.document.steps[0].complete = !0),
              (a.document.steps[1].show = !0)),
            t.registration &&
              ((a.document.steps[0].complete = !0),
              (a.document.steps[1].show = !0),
              (a.document.steps[1].complete = !0),
              (a.document.steps[2].show = !0)),
            t.document.startButcher &&
              ((a.document.steps[2].complete = !0),
              (a.document.steps[3].show = !0),
              (t.document.jobButcher || 0 !== t.document.count) &&
                ((a.document.steps[3].complete = !0),
                (a.document.steps[4].show = !0),
                (a.document.steps[4].title += ` (${t.document.count}/5)`)),
              t.document.count >= 5 &&
                ((a.document.steps[4].complete = !0),
                (a.document.steps[5].show = !0))),
            t.document.butcherEnd &&
              ((a.document.steps[2].complete = !0),
              (a.document.steps[3].complete = !0),
              (a.document.steps[4].complete = !0),
              (a.document.steps[5].complete = !0),
              (a.document.steps[3].show = !0),
              (a.document.steps[4].show = !0),
              (a.document.steps[5].show = !0),
              (a.document.steps[6].show = !0),
              t.document.haveMedLicense &&
                ((a.document.steps[6].complete = !0),
                (a.document.steps[7].show = !0),
                t.document.haveDriverLicense &&
                  ((a.document.steps[7].complete = !0),
                  (a.document.steps[8].show = !0))))),
          t.electric &&
            !0 !== t.electric.end &&
            (t.electric.startElectric &&
              ((a.electric.steps[0].title += ` (${t.electric.count}/5)`),
              t.electric.count >= 5 &&
                ((a.electric.steps[0].complete = !0),
                (a.electric.steps[1].show = !0))),
            t.electric.endElectric &&
              ((a.electric.steps[1].complete = !0),
              (a.electric.steps[2].show = !0),
              t.electric.haveDriverLicense &&
                ((a.electric.steps[2].complete = !0),
                (a.electric.steps[3].show = !0),
                t.electric.canGetCar &&
                  ((a.electric.steps[3].complete = !0),
                  (a.electric.steps[4].show = !0))))),
          t.guitar &&
            !0 !== t.guitar.end &&
            t.guitar.haveGuitar &&
            ((a.guitar.steps[0].complete = !0), (a.guitar.steps[1].show = !0)),
          t.bus &&
            !0 !== t.bus.end &&
            ((a.bus.steps[0].title += ` (${t.bus.count}/3)`),
            t.bus.count >= 3 &&
              ((a.bus.steps[0].complete = !0), (a.bus.steps[1].show = !0))),
          t.trucker &&
            !0 !== t.trucker.end &&
            ((a.trucker.steps[0].title += ` (${t.trucker.count}/10)`),
            t.trucker.count >= 10 &&
              ((a.trucker.steps[0].complete = !0),
              (a.trucker.steps[1].show = !0))),
          t.stash &&
            !0 !== t.stash.end &&
            t.stash.haveShovel &&
            ((a.stash.steps[0].complete = !0), (a.stash.steps[1].show = !0)),
          t.crimeQuest &&
            !1 === t.crimeQuest.end &&
            ("govCarSteal" === t.crimeQuest.type
              ? ((a.govCarSteal.title = a.govCarSteal.title.replace(
                  "??",
                  t.crimeQuest.factionTitle
                )),
                (a.govCarSteal.description = a.govCarSteal.description.replace(
                  "??",
                  t.crimeQuest.pedName
                )),
                (a.govCarSteal.description = a.govCarSteal.description.replace(
                  "???",
                  t.crimeQuest.factionTitle
                )),
                (a.govCarSteal.steps[0].title =
                  a.govCarSteal.steps[0].title.replace(
                    "??",
                    t.crimeQuest.pedName
                  )),
                (a.govCarSteal.last = !0),
                i.unshift(a.govCarSteal))
              : "eliteCarSteal" === t.crimeQuest.type
              ? ((a.eliteCarSteal.title = a.eliteCarSteal.title.replace(
                  "??",
                  t.crimeQuest.carTitle
                )),
                (a.eliteCarSteal.description =
                  a.eliteCarSteal.description.replace(
                    "??",
                    t.crimeQuest.pedName
                  )),
                (a.eliteCarSteal.description =
                  a.eliteCarSteal.description.replace(
                    "???",
                    t.crimeQuest.carTitle
                  )),
                (a.eliteCarSteal.steps[0].title =
                  a.eliteCarSteal.steps[0].title.replace(
                    "??",
                    t.crimeQuest.pedName
                  )),
                (a.eliteCarSteal.last = !0),
                i.unshift(a.eliteCarSteal))
              : "houseBreakIn" === t.crimeQuest.type &&
                ((a.houseBreakIn.title = a.houseBreakIn.title.replace(
                  "??",
                  t.crimeQuest.houseGuid
                )),
                (a.houseBreakIn.description =
                  a.houseBreakIn.description.replace(
                    "??",
                    t.crimeQuest.pedName
                  )),
                (a.houseBreakIn.description =
                  a.houseBreakIn.description.replace(
                    "???",
                    t.crimeQuest.houseGuid
                  )),
                !0 === t.crimeQuest.hacked &&
                  ((a.houseBreakIn.steps[0].complete = !0),
                  (a.houseBreakIn.steps[1].show = !0),
                  (a.houseBreakIn.steps[1].title =
                    a.houseBreakIn.steps[1].title.replace(
                      "??",
                      t.crimeQuest.pedName
                    ))),
                (a.houseBreakIn.last = !0),
                i.unshift(a.houseBreakIn))),
          t.capture &&
            (i.unshift(a.capture),
            (a.capture.description = a.capture.description.replace(
              "??",
              t.capture.pedName
            )),
            (a.capture.steps[1].title += t.capture.pedName),
            "mafia" === t.capture.type
              ? ((a.capture.title += "бизнеса"),
                (a.capture.steps[0].title += "бизнес"),
                (a.capture.description += "бизнес"))
              : "band" === t.capture.type &&
                ((a.capture.title += "территории"),
                (a.capture.steps[0].title += "территорию"),
                (a.capture.description += "территорию")),
            !0 === t.capture.captured &&
              ((a.capture.steps[0].complete = !0),
              (a.capture.steps[1].show = !0))),
          t.weapon &&
            (i.unshift(a.weapon),
            (a.weapon.description = a.weapon.description.replace(
              "??",
              t.weapon.pedName
            )),
            (a.weapon.description = a.weapon.description.replace(
              "???",
              t.weapon.weaponTitle
            )),
            (a.weapon.description = a.weapon.description.replace(
              "????",
              t.weapon.totalCount
            )),
            (a.weapon.reward[0].title = t.weapon.totalSum + "$"),
            (a.weapon.steps[0].title += ` (${t.weapon.count}/${t.weapon.totalCount})`),
            t.weapon.count >= t.weapon.totalCount &&
              ((a.weapon.steps[0].complete = !0),
              (a.weapon.steps[1].show = !0))),
          i.forEach((e) => {
            e.steps = e.steps.filter((e) => !0 === e.show);
          }),
          misc.injectCef(`storage.setQuestData(${JSON.stringify(i)});`);
      },
      cQuestCreateStanleyStash: (e) => {
        const t = mp.blips.new(568, e, {
          name: "Заначка",
          shortRange: !1,
          scale: 1,
        });
        t.setRoute(!0);
        const a = mp.colshapes.newSphere(e.x, e.y, e.z, 3);
        (a.stanleyStash = !0), d.push(t, a);
      },
      cQuestDestroyStanleyStash: () => {
        d.forEach((e) => e.destroy());
      },
    });
  },
  function (e, t) {
    let a = [];
    mp.events.add({
      cFishingDestroyZones: () => {
        a.forEach((e) => e.destroy()), (a = []), (localplayer.useEcholot = !1);
        misc.injectCef("storage.setEcholotFish(false);");
      },
      cFishingCreateZones: (e) => {
        a.forEach((e) => e.destroy()), (a = []);
        for (let t = 0, i = e.length; t < i; t++) {
          const i = mp.blips.new(
            9,
            { x: e[t].x, y: e[t].y, z: 0 },
            { scale: 1, color: 18, alpha: 150, shortRange: !0, radius: 200 }
          );
          a.push(i);
        }
        localplayer.useEcholot = !0;
        misc.injectCef("storage.setEcholotFish(false);");
      },
      cFishingStart: (e, t) => {
        if (localplayer.vehicle)
          return misc.notif("Нельзя рыбачить сидя в транспорте", "error");
        if (localplayer.isSwimming())
          return misc.notif("Нельзя рыбачить находясь в воде", "error");
        let a = !0;
        if (104 === t) {
          if ("seaFishing" !== eKeyHandler.fnc)
            return misc.notif(
              "Ловля на спиннинг доступна только с лодки в местах скопления рыбы",
              "error"
            );
          a = !1;
        }
        mp.events.callRemote("sFishingStart", e, a);
      },
      cFishingRemoveEKeyHandler: () => {
        eKeyHandler && "seaFishing" === eKeyHandler.fnc && (eKeyHandler = {});
      },
    });
  },
  function (e, t, a) {
    const i = a(6);
    let o = [];
    mp.events.add({
      cCrimeCreateCarPoint: (e) => {
        const { x: t, y: a, z: r } = i[e],
          l = mp.markers.new(1, new mp.Vector3(t, a, r - 3), 5, {
            color: [211, 237, 211, 100],
          }),
          n = mp.colshapes.newSphere(t, a, r, 5);
        (n.blackMarketCar = !0), o.push(l, n);
      },
      cCrimeRemoveCarPoint: () => {
        o.forEach((e) => e.destroy()), (o = []);
      },
    });
  },
  function (e) {
    e.exports = {
      11: {
        male: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 1,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 42,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 2,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 43,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 3,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 53,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 4,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 53,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 5,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 55,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 6,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 122,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 7,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 336,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 8,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 336,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 9,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 336,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 10,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 337,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 11,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 337,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 12,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 337,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 13,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 272,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 14,
                title: "Куртка 14",
                isProp: 0,
                componentNumber: 11,
                drawable: 272,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 15,
                title: "Куртка 15",
                isProp: 0,
                componentNumber: 11,
                drawable: 272,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 16,
                title: "Куртка 16",
                isProp: 0,
                componentNumber: 11,
                drawable: 244,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 17,
                title: "Куртка 17",
                isProp: 0,
                componentNumber: 11,
                drawable: 244,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 18,
                title: "Куртка 18",
                isProp: 0,
                componentNumber: 11,
                drawable: 244,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 19,
                title: "Куртка 19",
                isProp: 0,
                componentNumber: 11,
                drawable: 241,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 20,
                title: "Куртка 20",
                isProp: 0,
                componentNumber: 11,
                drawable: 241,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 21,
                title: "Куртка 21",
                isProp: 0,
                componentNumber: 11,
                drawable: 216,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 22,
                title: "Куртка 22",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 23,
                title: "Куртка 23",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 24,
                title: "Куртка 24",
                isProp: 0,
                componentNumber: 11,
                drawable: 277,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 25,
                title: "Куртка 25",
                isProp: 0,
                componentNumber: 11,
                drawable: 277,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 26,
                title: "Куртка 26",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 27,
                title: "Куртка 27",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 28,
                title: "Куртка 28",
                isProp: 0,
                componentNumber: 11,
                drawable: 213,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 29,
                title: "Куртка 29",
                isProp: 0,
                componentNumber: 11,
                drawable: 213,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 30,
                title: "Куртка 30",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 31,
                title: "Куртка 31",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 32,
                title: "Куртка 32",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 33,
                title: "Куртка 33",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 34,
                title: "Куртка 34",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 35,
                title: "Куртка 35",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 36,
                title: "Куртка 36",
                isProp: 0,
                componentNumber: 11,
                drawable: 210,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 37,
                title: "Куртка 37",
                isProp: 0,
                componentNumber: 11,
                drawable: 210,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 38,
                title: "Куртка 38",
                isProp: 0,
                componentNumber: 11,
                drawable: 210,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 39,
                title: "Куртка 39",
                isProp: 0,
                componentNumber: 11,
                drawable: 210,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 40,
                title: "Куртка 40",
                isProp: 0,
                componentNumber: 11,
                drawable: 208,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 41,
                title: "Куртка 41",
                isProp: 0,
                componentNumber: 11,
                drawable: 207,
                textureId: 10,
                paletteId: 0,
              },
              {
                id: 42,
                title: "Куртка 42",
                isProp: 0,
                componentNumber: 11,
                drawable: 286,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 43,
                title: "Куртка 43",
                isProp: 0,
                componentNumber: 11,
                drawable: 139,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 44,
                title: "Куртка 44",
                isProp: 0,
                componentNumber: 11,
                drawable: 139,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 45,
                title: "Куртка 45",
                isProp: 0,
                componentNumber: 11,
                drawable: 95,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 46,
                title: "Куртка 46",
                isProp: 0,
                componentNumber: 11,
                drawable: 95,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 47,
                title: "Куртка 47",
                isProp: 0,
                componentNumber: 11,
                drawable: 320,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 48,
                title: "Куртка 48",
                isProp: 0,
                componentNumber: 11,
                drawable: 349,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 49,
                title: "Куртка 49",
                isProp: 0,
                componentNumber: 11,
                drawable: 349,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 50,
                title: "Куртка 50",
                isProp: 0,
                componentNumber: 11,
                drawable: 348,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 51,
                title: "Куртка 51",
                isProp: 0,
                componentNumber: 11,
                drawable: 348,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 52,
                title: "Куртка 52",
                isProp: 0,
                componentNumber: 11,
                drawable: 11,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 53,
                title: "Куртка 53",
                isProp: 0,
                componentNumber: 11,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 54,
                title: "Куртка 54",
                isProp: 0,
                componentNumber: 11,
                drawable: 13,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 55,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 11,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 56,
                title: "Маска 2",
                isProp: 0,
                componentNumber: 1,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 57,
                title: "Маска 3",
                isProp: 0,
                componentNumber: 1,
                drawable: 28,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 58,
                title: "Маска 4",
                isProp: 0,
                componentNumber: 1,
                drawable: 28,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 59,
                title: "Маска 5",
                isProp: 0,
                componentNumber: 1,
                drawable: 35,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 60,
                title: "Маска 6",
                isProp: 0,
                componentNumber: 1,
                drawable: 46,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 61,
                title: "Маска 7",
                isProp: 0,
                componentNumber: 1,
                drawable: 52,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 62,
                title: "Маска 8",
                isProp: 0,
                componentNumber: 1,
                drawable: 53,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 63,
                title: "Маска 9",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 64,
                title: "Маска 10",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 65,
                title: "Маска 11",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 66,
                title: "Маска 12",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 67,
                title: "Маска 13",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 68,
                title: "Маска 14",
                isProp: 0,
                componentNumber: 1,
                drawable: 121,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 69,
                title: "Маска 15",
                isProp: 0,
                componentNumber: 1,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 70,
                title: "Маска 16",
                isProp: 0,
                componentNumber: 1,
                drawable: 126,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Шапка",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 71,
                title: "Шапка 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 4,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 72,
                title: "Шапка 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 73,
                title: "Шапка 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 46,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 74,
                title: "Шапка 4",
                isProp: 1,
                componentNumber: 0,
                drawable: 107,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 75,
                title: "Шапка 5",
                isProp: 1,
                componentNumber: 0,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 76,
                title: "Шапка 6",
                isProp: 1,
                componentNumber: 0,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 77,
                title: "Шапка 7",
                isProp: 1,
                componentNumber: 0,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 78,
                title: "Шапка 8",
                isProp: 1,
                componentNumber: 0,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 79,
                title: "Шапка 9",
                isProp: 1,
                componentNumber: 0,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 80,
                title: "Шапка 10",
                isProp: 1,
                componentNumber: 0,
                drawable: 46,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 81,
                title: "Шапка 11",
                isProp: 1,
                componentNumber: 0,
                drawable: 47,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 82,
                title: "Шапка 12",
                isProp: 1,
                componentNumber: 0,
                drawable: 50,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 83,
                title: "Шапка 13",
                isProp: 1,
                componentNumber: 0,
                drawable: 117,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 84,
                title: "Шапка 14",
                isProp: 1,
                componentNumber: 0,
                drawable: 123,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 85,
                title: "Шапка 15",
                isProp: 1,
                componentNumber: 0,
                drawable: 123,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 86,
                title: "Шапка 16",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 87,
                title: "Шапка 17",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 88,
                title: "Шапка 18",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 15,
                paletteId: 0,
              },
              {
                id: 89,
                title: "Шапка 19",
                isProp: 1,
                componentNumber: 0,
                drawable: 125,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 90,
                title: "Шапка 20",
                isProp: 1,
                componentNumber: 0,
                drawable: 125,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 91,
                title: "Шапка 21",
                isProp: 1,
                componentNumber: 0,
                drawable: 125,
                textureId: 18,
                paletteId: 0,
              },
              {
                id: 92,
                title: "Шапка 22",
                isProp: 1,
                componentNumber: 0,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 93,
                title: "Шапка 23",
                isProp: 1,
                componentNumber: 0,
                drawable: 126,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 94,
                title: "Шапка 24",
                isProp: 1,
                componentNumber: 0,
                drawable: 126,
                textureId: 18,
                paletteId: 0,
              },
              {
                id: 95,
                title: "Шапка 25",
                isProp: 1,
                componentNumber: 0,
                drawable: 142,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 96,
                title: "Шапка 26",
                isProp: 1,
                componentNumber: 0,
                drawable: 142,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 97,
                title: "Шапка 27",
                isProp: 1,
                componentNumber: 0,
                drawable: 123,
                textureId: 15,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 98,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 2,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 99,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 2,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 100,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 2,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 101,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 2,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 102,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 3,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 103,
                title: "Футболка 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 104,
                title: "Футболка 7",
                isProp: 0,
                componentNumber: 8,
                drawable: 10,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 105,
                title: "Футболка 8",
                isProp: 0,
                componentNumber: 8,
                drawable: 16,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 106,
                title: "Футболка 9",
                isProp: 0,
                componentNumber: 8,
                drawable: 16,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 107,
                title: "Футболка 10",
                isProp: 0,
                componentNumber: 8,
                drawable: 37,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 108,
                title: "Футболка 11",
                isProp: 0,
                componentNumber: 8,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 109,
                title: "Футболка 12",
                isProp: 0,
                componentNumber: 8,
                drawable: 38,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 110,
                title: "Футболка 13",
                isProp: 0,
                componentNumber: 8,
                drawable: 39,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 111,
                title: "Футболка 14",
                isProp: 0,
                componentNumber: 8,
                drawable: 42,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 112,
                title: "Футболка 15",
                isProp: 0,
                componentNumber: 8,
                drawable: 55,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 113,
                title: "Футболка 16",
                isProp: 0,
                componentNumber: 8,
                drawable: 56,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 114,
                title: "Футболка 17",
                isProp: 0,
                componentNumber: 8,
                drawable: 56,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 115,
                title: "Футболка 18",
                isProp: 0,
                componentNumber: 8,
                drawable: 57,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 116,
                title: "Футболка 19",
                isProp: 0,
                componentNumber: 8,
                drawable: 58,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 117,
                title: "Футболка 20",
                isProp: 0,
                componentNumber: 8,
                drawable: 95,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 118,
                title: "Футболка 21",
                isProp: 0,
                componentNumber: 8,
                drawable: 95,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 119,
                title: "Футболка 22",
                isProp: 0,
                componentNumber: 8,
                drawable: 113,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 120,
                title: "Футболка 23",
                isProp: 0,
                componentNumber: 8,
                drawable: 113,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 121,
                title: "Футболка 24",
                isProp: 0,
                componentNumber: 8,
                drawable: 113,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 122,
                title: "Футболка 25",
                isProp: 0,
                componentNumber: 8,
                drawable: 113,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 123,
                title: "Футболка 26",
                isProp: 0,
                componentNumber: 8,
                drawable: 113,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 124,
                title: "Футболка 27",
                isProp: 0,
                componentNumber: 8,
                drawable: 113,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 125,
                title: "Футболка 28",
                isProp: 0,
                componentNumber: 8,
                drawable: 112,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 126,
                title: "Футболка 29",
                isProp: 0,
                componentNumber: 8,
                drawable: 129,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 127,
                title: "Футболка 30",
                isProp: 0,
                componentNumber: 8,
                drawable: 130,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 128,
                title: "Футболка 31",
                isProp: 0,
                componentNumber: 8,
                drawable: 146,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 129,
                title: "Футболка 32",
                isProp: 0,
                componentNumber: 8,
                drawable: 150,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 130,
                title: "Футболка 33",
                isProp: 0,
                componentNumber: 8,
                drawable: 150,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 131,
                title: "Футболка 34",
                isProp: 0,
                componentNumber: 8,
                drawable: 153,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 132,
                title: "Футболка 35",
                isProp: 0,
                componentNumber: 8,
                drawable: 155,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 133,
                title: "Футболка 36",
                isProp: 0,
                componentNumber: 8,
                drawable: 157,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 134,
                title: "Футболка 37",
                isProp: 0,
                componentNumber: 8,
                drawable: 158,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 135,
                title: "Футболка 38",
                isProp: 0,
                componentNumber: 8,
                drawable: 159,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 136,
                title: "Футболка 39",
                isProp: 0,
                componentNumber: 8,
                drawable: 160,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 137,
                title: "Футболка 40",
                isProp: 0,
                componentNumber: 8,
                drawable: 161,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 138,
                title: "Футболка 41",
                isProp: 0,
                componentNumber: 8,
                drawable: 162,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 139,
                title: "Футболка 42",
                isProp: 0,
                componentNumber: 8,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 140,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 141,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 33,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 142,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 86,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 143,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 86,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 144,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 121,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 145,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 122,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 146,
                title: "Штаны 7",
                isProp: 0,
                componentNumber: 4,
                drawable: 125,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 147,
                title: "Штаны 8",
                isProp: 0,
                componentNumber: 4,
                drawable: 125,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 148,
                title: "Штаны 9",
                isProp: 0,
                componentNumber: 4,
                drawable: 125,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 149,
                title: "Штаны 10",
                isProp: 0,
                componentNumber: 4,
                drawable: 125,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 150,
                title: "Штаны 11",
                isProp: 0,
                componentNumber: 4,
                drawable: 129,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 151,
                title: "Штаны 12",
                isProp: 0,
                componentNumber: 4,
                drawable: 129,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 152,
                title: "Штаны 13",
                isProp: 0,
                componentNumber: 4,
                drawable: 129,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 153,
                title: "Штаны 14",
                isProp: 0,
                componentNumber: 4,
                drawable: 130,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 154,
                title: "Штаны 15",
                isProp: 0,
                componentNumber: 4,
                drawable: 130,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 155,
                title: "Штаны 16",
                isProp: 0,
                componentNumber: 4,
                drawable: 130,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 156,
                title: "Штаны 17",
                isProp: 0,
                componentNumber: 4,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 157,
                title: "Штаны 18",
                isProp: 0,
                componentNumber: 4,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 158,
                title: "Штаны 19",
                isProp: 0,
                componentNumber: 4,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 159,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 160,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 161,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 162,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 163,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 61,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 164,
                title: "Обувь 6",
                isProp: 0,
                componentNumber: 6,
                drawable: 60,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Очки",
            clothType: "glass",
            clothTypeName: "glass",
            itemsList: [
              {
                id: 165,
                title: "Очки 1",
                isProp: 1,
                componentNumber: 1,
                drawable: 2,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 166,
                title: "Очки 2",
                isProp: 1,
                componentNumber: 1,
                drawable: 5,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 167,
                title: "Очки 3",
                isProp: 1,
                componentNumber: 1,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 168,
                title: "Очки 4",
                isProp: 1,
                componentNumber: 1,
                drawable: 15,
                textureId: 9,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 169,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 170,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 171,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 172,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 173,
                title: "Аксессуары 5",
                isProp: 0,
                componentNumber: 7,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 174,
                title: "Аксессуары 6",
                isProp: 0,
                componentNumber: 7,
                drawable: 23,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 175,
                title: "Аксессуары 7",
                isProp: 0,
                componentNumber: 7,
                drawable: 110,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 176,
                title: "Аксессуары 8",
                isProp: 0,
                componentNumber: 7,
                drawable: 125,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 177,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 178,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 179,
                title: "Разное 3",
                isProp: 0,
                componentNumber: 5,
                drawable: 39,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 180,
                title: "Разное 4",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 181,
                title: "Разное 5",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 182,
                title: "Разное 6",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 183,
                title: "Разное 7",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 184,
                title: "Разное 8",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 185,
                title: "Разное 9",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 186,
                title: "Разное 10",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 187,
                title: "Разное 11",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 188,
                title: "Разное 12",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 189,
                title: "Разное 13",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 190,
                title: "Разное 14",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 191,
                title: "Разное 15",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 192,
                title: "Разное 16",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 193,
                title: "Разное 17",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 194,
                title: "Разное 18",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 195,
                title: "Разное 19",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 5,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 196,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 197,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 198,
                title: "Руки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 199,
                title: "Руки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 11,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 200,
                title: "Руки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 17,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 201,
                title: "Руки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 17,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 202,
                title: "Руки 7",
                isProp: 0,
                componentNumber: 3,
                drawable: 19,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 203,
                title: "Руки 8",
                isProp: 0,
                componentNumber: 3,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 204,
                title: "Руки 9",
                isProp: 0,
                componentNumber: 3,
                drawable: 96,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 205,
                title: "Руки 10",
                isProp: 0,
                componentNumber: 3,
                drawable: 171,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 206,
                title: "Руки 11",
                isProp: 0,
                componentNumber: 3,
                drawable: 172,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 207,
                title: "Руки 12",
                isProp: 0,
                componentNumber: 3,
                drawable: 177,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 208,
                title: "Руки 13",
                isProp: 0,
                componentNumber: 3,
                drawable: 178,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Гарнитура",
            clothType: "garnitura",
            clothTypeName: "garnitura",
            itemsList: [
              {
                id: 209,
                title: "Гарнитура 1",
                isProp: 1,
                componentNumber: 2,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 210,
                title: "Гарнитура 2",
                isProp: 1,
                componentNumber: 2,
                drawable: 2,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Нашивки",
            clothType: "path",
            clothTypeName: "path",
            itemsList: [
              {
                id: 211,
                title: "Нашивки 1",
                isProp: 0,
                componentNumber: 10,
                drawable: 2,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 212,
                title: "Нашивки 2",
                isProp: 0,
                componentNumber: 10,
                drawable: 3,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 213,
                title: "Нашивки 3",
                isProp: 0,
                componentNumber: 10,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 214,
                title: "Нашивки 4",
                isProp: 0,
                componentNumber: 10,
                drawable: 15,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 215,
                title: "Нашивки 5",
                isProp: 0,
                componentNumber: 10,
                drawable: 15,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 216,
                title: "Нашивки 6",
                isProp: 0,
                componentNumber: 10,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 217,
                title: "Нашивки 7",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 218,
                title: "Нашивки 8",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 219,
                title: "Нашивки 9",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 220,
                title: "Нашивки 10",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 221,
                title: "Нашивки 11",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 222,
                title: "Нашивки 12",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 223,
                title: "Нашивки 13",
                isProp: 0,
                componentNumber: 10,
                drawable: 70,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 224,
                title: "Нашивки 14",
                isProp: 0,
                componentNumber: 10,
                drawable: 78,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 225,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 12,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 226,
                title: "Бронежилет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 227,
                title: "Бронежилет 3",
                isProp: 0,
                componentNumber: 9,
                drawable: 16,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 228,
                title: "Бронежилет 4",
                isProp: 0,
                componentNumber: 9,
                drawable: 18,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 229,
                title: "Бронежилет 5",
                isProp: 0,
                componentNumber: 9,
                drawable: 19,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 230,
                title: "Бронежилет 6",
                isProp: 0,
                componentNumber: 9,
                drawable: 17,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 231,
                title: "Бронежилет 7",
                isProp: 0,
                componentNumber: 9,
                drawable: 17,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 232,
                title: "Бронежилет 8",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 233,
                title: "Бронежилет 9",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 234,
                title: "Бронежилет 10",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 235,
                title: "Бронежилет 11",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 236,
                title: "Бронежилет 12",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 237,
                title: "Бронежилет 13",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 238,
                title: "Бронежилет 14",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 239,
                title: "Бронежилет 15",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 240,
                title: "Бронежилет 16",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 241,
                title: "Бронежилет 17",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 242,
                title: "Бронежилет 18",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 243,
                title: "Бронежилет 19",
                isProp: 0,
                componentNumber: 9,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
        female: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 244,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 245,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 43,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 246,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 43,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 247,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 43,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 248,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 48,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 249,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 10,
                paletteId: 0,
              },
              {
                id: 250,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 251,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 213,
                textureId: 10,
                paletteId: 0,
              },
              {
                id: 252,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 253,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 254,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 255,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 256,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 216,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 257,
                title: "Куртка 14",
                isProp: 0,
                componentNumber: 11,
                drawable: 216,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 258,
                title: "Куртка 15",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 259,
                title: "Куртка 16",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 260,
                title: "Куртка 17",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 261,
                title: "Куртка 18",
                isProp: 0,
                componentNumber: 11,
                drawable: 218,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 262,
                title: "Куртка 19",
                isProp: 0,
                componentNumber: 11,
                drawable: 218,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 263,
                title: "Куртка 20",
                isProp: 0,
                componentNumber: 11,
                drawable: 219,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 264,
                title: "Куртка 21",
                isProp: 0,
                componentNumber: 11,
                drawable: 219,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 265,
                title: "Куртка 22",
                isProp: 0,
                componentNumber: 11,
                drawable: 220,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 266,
                title: "Куртка 23",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 267,
                title: "Куртка 24",
                isProp: 0,
                componentNumber: 11,
                drawable: 296,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 268,
                title: "Куртка 25",
                isProp: 0,
                componentNumber: 11,
                drawable: 299,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 269,
                title: "Куртка 26",
                isProp: 0,
                componentNumber: 11,
                drawable: 304,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 270,
                title: "Куртка 27",
                isProp: 0,
                componentNumber: 11,
                drawable: 304,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 271,
                title: "Куртка 28",
                isProp: 0,
                componentNumber: 11,
                drawable: 327,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 272,
                title: "Куртка 29",
                isProp: 0,
                componentNumber: 11,
                drawable: 327,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 273,
                title: "Куртка 30",
                isProp: 0,
                componentNumber: 11,
                drawable: 328,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 274,
                title: "Куртка 31",
                isProp: 0,
                componentNumber: 11,
                drawable: 328,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 275,
                title: "Куртка 32",
                isProp: 0,
                componentNumber: 11,
                drawable: 332,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 276,
                title: "Куртка 33",
                isProp: 0,
                componentNumber: 11,
                drawable: 333,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 277,
                title: "Куртка 34",
                isProp: 0,
                componentNumber: 11,
                drawable: 329,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 278,
                title: "Куртка 35",
                isProp: 0,
                componentNumber: 11,
                drawable: 329,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 279,
                title: "Куртка 36",
                isProp: 0,
                componentNumber: 11,
                drawable: 330,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 280,
                title: "Куртка 37",
                isProp: 0,
                componentNumber: 11,
                drawable: 330,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 281,
                title: "Куртка 38",
                isProp: 0,
                componentNumber: 11,
                drawable: 330,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 282,
                title: "Куртка 39",
                isProp: 0,
                componentNumber: 11,
                drawable: 343,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 283,
                title: "Куртка 40",
                isProp: 0,
                componentNumber: 11,
                drawable: 351,
                textureId: 3,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 284,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 11,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 285,
                title: "Маска 2",
                isProp: 0,
                componentNumber: 1,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 286,
                title: "Маска 3",
                isProp: 0,
                componentNumber: 1,
                drawable: 28,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 287,
                title: "Маска 4",
                isProp: 0,
                componentNumber: 1,
                drawable: 28,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 288,
                title: "Маска 5",
                isProp: 0,
                componentNumber: 1,
                drawable: 35,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 289,
                title: "Маска 6",
                isProp: 0,
                componentNumber: 1,
                drawable: 46,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 290,
                title: "Маска 7",
                isProp: 0,
                componentNumber: 1,
                drawable: 52,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 291,
                title: "Маска 8",
                isProp: 0,
                componentNumber: 1,
                drawable: 53,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 292,
                title: "Маска 9",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 293,
                title: "Маска 10",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 294,
                title: "Маска 11",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 295,
                title: "Маска 12",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 296,
                title: "Маска 13",
                isProp: 0,
                componentNumber: 1,
                drawable: 90,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 297,
                title: "Маска 14",
                isProp: 0,
                componentNumber: 1,
                drawable: 121,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 298,
                title: "Маска 15",
                isProp: 0,
                componentNumber: 1,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 299,
                title: "Маска 16",
                isProp: 0,
                componentNumber: 1,
                drawable: 126,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Шапка",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 300,
                title: "Шапка 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 301,
                title: "Шапка 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 45,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 302,
                title: "Шапка 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 122,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 303,
                title: "Шапка 4",
                isProp: 1,
                componentNumber: 0,
                drawable: 122,
                textureId: 15,
                paletteId: 0,
              },
              {
                id: 304,
                title: "Шапка 5",
                isProp: 1,
                componentNumber: 0,
                drawable: 123,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 305,
                title: "Шапка 6",
                isProp: 1,
                componentNumber: 0,
                drawable: 123,
                textureId: 15,
                paletteId: 0,
              },
              {
                id: 306,
                title: "Шапка 7",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 307,
                title: "Шапка 8",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 308,
                title: "Шапка 9",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 18,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 309,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 310,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 2,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 311,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 3,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 312,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 313,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 314,
                title: "Футболка 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 315,
                title: "Футболка 7",
                isProp: 0,
                componentNumber: 8,
                drawable: 26,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 316,
                title: "Футболка 8",
                isProp: 0,
                componentNumber: 8,
                drawable: 26,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 317,
                title: "Футболка 9",
                isProp: 0,
                componentNumber: 8,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 318,
                title: "Футболка 10",
                isProp: 0,
                componentNumber: 8,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 319,
                title: "Футболка 11",
                isProp: 0,
                componentNumber: 8,
                drawable: 33,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 320,
                title: "Футболка 12",
                isProp: 0,
                componentNumber: 8,
                drawable: 33,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 321,
                title: "Футболка 13",
                isProp: 0,
                componentNumber: 8,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 322,
                title: "Футболка 14",
                isProp: 0,
                componentNumber: 8,
                drawable: 35,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 323,
                title: "Футболка 15",
                isProp: 0,
                componentNumber: 8,
                drawable: 37,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 324,
                title: "Футболка 16",
                isProp: 0,
                componentNumber: 8,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 325,
                title: "Футболка 17",
                isProp: 0,
                componentNumber: 8,
                drawable: 41,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 326,
                title: "Футболка 18",
                isProp: 0,
                componentNumber: 8,
                drawable: 41,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 327,
                title: "Футболка 19",
                isProp: 0,
                componentNumber: 8,
                drawable: 65,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 328,
                title: "Футболка 20",
                isProp: 0,
                componentNumber: 8,
                drawable: 69,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 329,
                title: "Футболка 21",
                isProp: 0,
                componentNumber: 8,
                drawable: 70,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 330,
                title: "Футболка 22",
                isProp: 0,
                componentNumber: 8,
                drawable: 79,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 331,
                title: "Футболка 23",
                isProp: 0,
                componentNumber: 8,
                drawable: 79,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 332,
                title: "Футболка 24",
                isProp: 0,
                componentNumber: 8,
                drawable: 79,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 333,
                title: "Футболка 25",
                isProp: 0,
                componentNumber: 8,
                drawable: 79,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 334,
                title: "Футболка 26",
                isProp: 0,
                componentNumber: 8,
                drawable: 79,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 335,
                title: "Футболка 27",
                isProp: 0,
                componentNumber: 8,
                drawable: 79,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 336,
                title: "Футболка 28",
                isProp: 0,
                componentNumber: 8,
                drawable: 100,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 337,
                title: "Футболка 29",
                isProp: 0,
                componentNumber: 8,
                drawable: 100,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 338,
                title: "Футболка 30",
                isProp: 0,
                componentNumber: 8,
                drawable: 152,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 339,
                title: "Футболка 31",
                isProp: 0,
                componentNumber: 8,
                drawable: 159,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 340,
                title: "Футболка 32",
                isProp: 0,
                componentNumber: 8,
                drawable: 160,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 341,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 342,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 23,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 343,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 344,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 345,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 37,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 346,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 41,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 347,
                title: "Штаны 7",
                isProp: 0,
                componentNumber: 4,
                drawable: 41,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 348,
                title: "Штаны 8",
                isProp: 0,
                componentNumber: 4,
                drawable: 45,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 349,
                title: "Штаны 9",
                isProp: 0,
                componentNumber: 4,
                drawable: 47,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 350,
                title: "Штаны 10",
                isProp: 0,
                componentNumber: 4,
                drawable: 52,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 351,
                title: "Штаны 11",
                isProp: 0,
                componentNumber: 4,
                drawable: 64,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 352,
                title: "Штаны 12",
                isProp: 0,
                componentNumber: 4,
                drawable: 89,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 353,
                title: "Штаны 13",
                isProp: 0,
                componentNumber: 4,
                drawable: 89,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 354,
                title: "Штаны 14",
                isProp: 0,
                componentNumber: 4,
                drawable: 131,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 355,
                title: "Штаны 15",
                isProp: 0,
                componentNumber: 4,
                drawable: 131,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 356,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 357,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 358,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 359,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 360,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 361,
                title: "Обувь 6",
                isProp: 0,
                componentNumber: 6,
                drawable: 36,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 362,
                title: "Обувь 7",
                isProp: 0,
                componentNumber: 6,
                drawable: 59,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 363,
                title: "Обувь 8",
                isProp: 0,
                componentNumber: 6,
                drawable: 63,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 364,
                title: "Обувь 9",
                isProp: 0,
                componentNumber: 6,
                drawable: 64,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 365,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 366,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 367,
                title: "Руки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 3,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 368,
                title: "Руки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 369,
                title: "Руки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 11,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 370,
                title: "Руки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 14,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 371,
                title: "Руки 7",
                isProp: 0,
                componentNumber: 3,
                drawable: 18,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 372,
                title: "Руки 8",
                isProp: 0,
                componentNumber: 3,
                drawable: 18,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 373,
                title: "Руки 9",
                isProp: 0,
                componentNumber: 3,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 374,
                title: "Руки 10",
                isProp: 0,
                componentNumber: 3,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 375,
                title: "Руки 11",
                isProp: 0,
                componentNumber: 3,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 376,
                title: "Руки 12",
                isProp: 0,
                componentNumber: 3,
                drawable: 23,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 377,
                title: "Руки 13",
                isProp: 0,
                componentNumber: 3,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 378,
                title: "Руки 14",
                isProp: 0,
                componentNumber: 3,
                drawable: 26,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 379,
                title: "Руки 15",
                isProp: 0,
                componentNumber: 3,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 380,
                title: "Руки 16",
                isProp: 0,
                componentNumber: 3,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 381,
                title: "Руки 17",
                isProp: 0,
                componentNumber: 3,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 382,
                title: "Руки 18",
                isProp: 0,
                componentNumber: 3,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 383,
                title: "Руки 19",
                isProp: 0,
                componentNumber: 3,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 384,
                title: "Руки 20",
                isProp: 0,
                componentNumber: 3,
                drawable: 33,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 385,
                title: "Руки 21",
                isProp: 0,
                componentNumber: 3,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 386,
                title: "Руки 22",
                isProp: 0,
                componentNumber: 3,
                drawable: 35,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 387,
                title: "Руки 23",
                isProp: 0,
                componentNumber: 3,
                drawable: 36,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 388,
                title: "Руки 24",
                isProp: 0,
                componentNumber: 3,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 389,
                title: "Руки 25",
                isProp: 0,
                componentNumber: 3,
                drawable: 39,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 390,
                title: "Руки 26",
                isProp: 0,
                componentNumber: 3,
                drawable: 40,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 391,
                title: "Руки 27",
                isProp: 0,
                componentNumber: 3,
                drawable: 41,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 392,
                title: "Руки 28",
                isProp: 0,
                componentNumber: 3,
                drawable: 42,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 393,
                title: "Руки 29",
                isProp: 0,
                componentNumber: 3,
                drawable: 44,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Очки",
            clothType: "glass",
            clothTypeName: "glass",
            itemsList: [
              {
                id: 394,
                title: "Очки 1",
                isProp: 1,
                componentNumber: 1,
                drawable: 9,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 395,
                title: "Очки 2",
                isProp: 1,
                componentNumber: 1,
                drawable: 11,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 396,
                title: "Очки 3",
                isProp: 1,
                componentNumber: 1,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 397,
                title: "Очки 4",
                isProp: 1,
                componentNumber: 1,
                drawable: 24,
                textureId: 9,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 398,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 399,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 400,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 401,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 402,
                title: "Аксессуары 5",
                isProp: 0,
                componentNumber: 7,
                drawable: 22,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 403,
                title: "Аксессуары 6",
                isProp: 0,
                componentNumber: 7,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 404,
                title: "Аксессуары 7",
                isProp: 0,
                componentNumber: 7,
                drawable: 81,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 405,
                title: "Аксессуары 8",
                isProp: 0,
                componentNumber: 7,
                drawable: 95,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 406,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 407,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 39,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 408,
                title: "Разное 3",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 409,
                title: "Разное 4",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 410,
                title: "Разное 5",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 411,
                title: "Разное 6",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 412,
                title: "Разное 7",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 413,
                title: "Разное 8",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 414,
                title: "Разное 9",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 415,
                title: "Разное 10",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 416,
                title: "Разное 11",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 417,
                title: "Разное 12",
                isProp: 0,
                componentNumber: 5,
                drawable: 52,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 418,
                title: "Разное 13",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 419,
                title: "Разное 14",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 420,
                title: "Разное 15",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 421,
                title: "Разное 16",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 422,
                title: "Разное 17",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 423,
                title: "Разное 18",
                isProp: 0,
                componentNumber: 5,
                drawable: 59,
                textureId: 5,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Гарнитура",
            clothType: "garnitura",
            clothTypeName: "garnitura",
            itemsList: [
              {
                id: 424,
                title: "Гарнитура 1",
                isProp: 1,
                componentNumber: 2,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 425,
                title: "Гарнитура 2",
                isProp: 1,
                componentNumber: 2,
                drawable: 2,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Нашивки",
            clothType: "path",
            clothTypeName: "path",
            itemsList: [
              {
                id: 426,
                title: "Нашивки 1",
                isProp: 0,
                componentNumber: 10,
                drawable: 2,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 427,
                title: "Нашивки 2",
                isProp: 0,
                componentNumber: 10,
                drawable: 3,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 428,
                title: "Нашивки 3",
                isProp: 0,
                componentNumber: 10,
                drawable: 14,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 429,
                title: "Нашивки 4",
                isProp: 0,
                componentNumber: 10,
                drawable: 14,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 430,
                title: "Нашивки 5",
                isProp: 0,
                componentNumber: 10,
                drawable: 79,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 431,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 432,
                title: "Бронежилет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 4,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 433,
                title: "Бронежилет 3",
                isProp: 0,
                componentNumber: 9,
                drawable: 11,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 434,
                title: "Бронежилет 4",
                isProp: 0,
                componentNumber: 9,
                drawable: 14,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 435,
                title: "Бронежилет 5",
                isProp: 0,
                componentNumber: 9,
                drawable: 15,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 436,
                title: "Бронежилет 6",
                isProp: 0,
                componentNumber: 9,
                drawable: 18,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 437,
                title: "Бронежилет 7",
                isProp: 0,
                componentNumber: 9,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 438,
                title: "Бронежилет 8",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 439,
                title: "Бронежилет 9",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 440,
                title: "Бронежилет 10",
                isProp: 0,
                componentNumber: 9,
                drawable: 22,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 441,
                title: "Бронежилет 11",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 442,
                title: "Бронежилет 12",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 443,
                title: "Бронежилет 13",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 444,
                title: "Бронежилет 14",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 445,
                title: "Бронежилет 15",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 446,
                title: "Бронежилет 16",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 447,
                title: "Бронежилет 17",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 448,
                title: "Бронежилет 18",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 449,
                title: "Бронежилет 19",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 450,
                title: "Бронежилет 20",
                isProp: 0,
                componentNumber: 9,
                drawable: 26,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 451,
                title: "Бронежилет 21",
                isProp: 0,
                componentNumber: 9,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
      },
      23: {
        male: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 452,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 187,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 453,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 187,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 454,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 187,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 455,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 315,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 456,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 457,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 458,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 459,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 460,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 219,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 461,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 462,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 463,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 220,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 464,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 219,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 465,
                title: "Куртка 14",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 466,
                title: "Куртка 15",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 467,
                title: "Куртка 16",
                isProp: 0,
                componentNumber: 11,
                drawable: 220,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 468,
                title: "Куртка 17",
                isProp: 0,
                componentNumber: 11,
                drawable: 208,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 469,
                title: "Куртка 18",
                isProp: 0,
                componentNumber: 11,
                drawable: 220,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 470,
                title: "Куртка 19",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 471,
                title: "Куртка 20",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 472,
                title: "Куртка 21",
                isProp: 0,
                componentNumber: 11,
                drawable: 318,
                textureId: 3,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 473,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 121,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 474,
                title: "Маска 2",
                isProp: 0,
                componentNumber: 1,
                drawable: 122,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 475,
                title: "Маска 3",
                isProp: 0,
                componentNumber: 1,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Шапка",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 476,
                title: "Шапка 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 113,
                textureId: 19,
                paletteId: 0,
              },
              {
                id: 477,
                title: "Шапка 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 113,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 478,
                title: "Шапка 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 106,
                textureId: 20,
                paletteId: 0,
              },
              {
                id: 479,
                title: "Шапка 4",
                isProp: 1,
                componentNumber: 0,
                drawable: 28,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 480,
                title: "Шапка 5",
                isProp: 1,
                componentNumber: 0,
                drawable: 28,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 481,
                title: "Шапка 6",
                isProp: 1,
                componentNumber: 0,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 482,
                title: "Шапка 7",
                isProp: 1,
                componentNumber: 0,
                drawable: 58,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 483,
                title: "Шапка 8",
                isProp: 1,
                componentNumber: 0,
                drawable: 47,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 484,
                title: "Шапка 9",
                isProp: 1,
                componentNumber: 0,
                drawable: 39,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 485,
                title: "Шапка 10",
                isProp: 1,
                componentNumber: 0,
                drawable: 106,
                textureId: 25,
                paletteId: 0,
              },
              {
                id: 486,
                title: "Шапка 11",
                isProp: 1,
                componentNumber: 0,
                drawable: 13,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 487,
                title: "Шапка 12",
                isProp: 1,
                componentNumber: 0,
                drawable: 39,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 488,
                title: "Шапка 13",
                isProp: 1,
                componentNumber: 0,
                drawable: 58,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 489,
                title: "Шапка 14",
                isProp: 1,
                componentNumber: 0,
                drawable: 39,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 490,
                title: "Шапка 15",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 491,
                title: "Шапка 16",
                isProp: 1,
                componentNumber: 0,
                drawable: 117,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 492,
                title: "Шапка 17",
                isProp: 1,
                componentNumber: 0,
                drawable: 25,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Ремни",
            clothType: "remni",
            clothTypeName: "remni",
            itemsList: [
              {
                id: 493,
                title: "Ремни 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 42,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 494,
                title: "Ремни 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 95,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 495,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 22,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 496,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 24,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 497,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 66,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 498,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 66,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 499,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 88,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 500,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 66,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 501,
                title: "Штаны 7",
                isProp: 0,
                componentNumber: 4,
                drawable: 88,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 502,
                title: "Штаны 8",
                isProp: 0,
                componentNumber: 4,
                drawable: 66,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 503,
                title: "Штаны 9",
                isProp: 0,
                componentNumber: 4,
                drawable: 88,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 504,
                title: "Штаны 10",
                isProp: 0,
                componentNumber: 4,
                drawable: 66,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 505,
                title: "Штаны 11",
                isProp: 0,
                componentNumber: 4,
                drawable: 86,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 506,
                title: "Штаны 12",
                isProp: 0,
                componentNumber: 4,
                drawable: 66,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 507,
                title: "Штаны 13",
                isProp: 0,
                componentNumber: 4,
                drawable: 28,
                textureId: 4,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 508,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 15,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 509,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 510,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 511,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 35,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 512,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 35,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 513,
                title: "Обувь 6",
                isProp: 0,
                componentNumber: 6,
                drawable: 56,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 514,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 515,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 516,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 110,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 517,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 38,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 518,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 73,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 519,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 520,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 77,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 521,
                title: "Руки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 172,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 522,
                title: "Руки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 180,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 523,
                title: "Руки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 524,
                title: "Руки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 16,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 525,
                title: "Руки 7",
                isProp: 0,
                componentNumber: 3,
                drawable: 162,
                textureId: 19,
                paletteId: 0,
              },
              {
                id: 526,
                title: "Руки 8",
                isProp: 0,
                componentNumber: 3,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 527,
                title: "Руки 9",
                isProp: 0,
                componentNumber: 3,
                drawable: 96,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 528,
                title: "Руки 10",
                isProp: 0,
                componentNumber: 3,
                drawable: 171,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 529,
                title: "Руки 11",
                isProp: 0,
                componentNumber: 3,
                drawable: 172,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 530,
                title: "Руки 12",
                isProp: 0,
                componentNumber: 3,
                drawable: 177,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 531,
                title: "Руки 13",
                isProp: 0,
                componentNumber: 3,
                drawable: 178,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Нашивки",
            clothType: "path",
            clothTypeName: "path",
            itemsList: [
              {
                id: 532,
                title: "Нашивки 1",
                isProp: 0,
                componentNumber: 10,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 533,
                title: "Нашивки 2",
                isProp: 0,
                componentNumber: 10,
                drawable: 42,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 534,
                title: "Нашивки 3",
                isProp: 0,
                componentNumber: 10,
                drawable: 59,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 535,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 15,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 536,
                title: "Бронежилет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 15,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 537,
                title: "Бронежилет 3",
                isProp: 0,
                componentNumber: 9,
                drawable: 18,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 538,
                title: "Бронежилет 4",
                isProp: 0,
                componentNumber: 9,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 539,
                title: "Бронежилет 5",
                isProp: 0,
                componentNumber: 9,
                drawable: 15,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 540,
                title: "Бронежилет 6",
                isProp: 0,
                componentNumber: 9,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 541,
                title: "Бронежилет 7",
                isProp: 0,
                componentNumber: 9,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 542,
                title: "Бронежилет 8",
                isProp: 0,
                componentNumber: 9,
                drawable: 15,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
        ],
        female: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 543,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 223,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 544,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 223,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 545,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 223,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 546,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 223,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 547,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 223,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 548,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 223,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 549,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 231,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 550,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 130,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 551,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 231,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 552,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 222,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 553,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 231,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 554,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 230,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 555,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 222,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 556,
                title: "Куртка 14",
                isProp: 0,
                componentNumber: 11,
                drawable: 231,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 557,
                title: "Куртка 15",
                isProp: 0,
                componentNumber: 11,
                drawable: 216,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 558,
                title: "Куртка 16",
                isProp: 0,
                componentNumber: 11,
                drawable: 230,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 559,
                title: "Куртка 17",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 560,
                title: "Куртка 18",
                isProp: 0,
                componentNumber: 11,
                drawable: 230,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 561,
                title: "Куртка 19",
                isProp: 0,
                componentNumber: 11,
                drawable: 329,
                textureId: 3,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 562,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Шапка",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 563,
                title: "Шапка 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 112,
                textureId: 19,
                paletteId: 0,
              },
              {
                id: 564,
                title: "Шапка 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 105,
                textureId: 20,
                paletteId: 0,
              },
              {
                id: 565,
                title: "Шапка 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 13,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 566,
                title: "Шапка 4",
                isProp: 1,
                componentNumber: 0,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 567,
                title: "Шапка 5",
                isProp: 1,
                componentNumber: 0,
                drawable: 58,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 568,
                title: "Шапка 6",
                isProp: 1,
                componentNumber: 0,
                drawable: 46,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 569,
                title: "Шапка 7",
                isProp: 1,
                componentNumber: 0,
                drawable: 28,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 570,
                title: "Шапка 8",
                isProp: 1,
                componentNumber: 0,
                drawable: 28,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 571,
                title: "Шапка 9",
                isProp: 1,
                componentNumber: 0,
                drawable: 38,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 572,
                title: "Шапка 10",
                isProp: 1,
                componentNumber: 0,
                drawable: 105,
                textureId: 25,
                paletteId: 0,
              },
              {
                id: 573,
                title: "Шапка 11",
                isProp: 1,
                componentNumber: 0,
                drawable: 123,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 574,
                title: "Шапка 12",
                isProp: 1,
                componentNumber: 0,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 575,
                title: "Шапка 13",
                isProp: 1,
                componentNumber: 0,
                drawable: 38,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 576,
                title: "Шапка 14",
                isProp: 1,
                componentNumber: 0,
                drawable: 53,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Ремни",
            clothType: "remni",
            clothTypeName: "remni",
            itemsList: [
              {
                id: 577,
                title: "Ремни 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 100,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 578,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 64,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 579,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 130,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 580,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 130,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 581,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 91,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 582,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 91,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 583,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 89,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 584,
                title: "Штаны 7",
                isProp: 0,
                componentNumber: 4,
                drawable: 91,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 585,
                title: "Штаны 8",
                isProp: 0,
                componentNumber: 4,
                drawable: 130,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 586,
                title: "Штаны 9",
                isProp: 0,
                componentNumber: 4,
                drawable: 130,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 587,
                title: "Штаны 10",
                isProp: 0,
                componentNumber: 4,
                drawable: 23,
                textureId: 5,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 588,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 589,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 590,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 36,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 591,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 36,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 592,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 86,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 593,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 3,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 594,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 18,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 595,
                title: "Руки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 17,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 596,
                title: "Руки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 182,
                textureId: 19,
                paletteId: 0,
              },
              {
                id: 597,
                title: "Руки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 14,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 598,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 599,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 600,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 22,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 601,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 73,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Нашивки",
            clothType: "path",
            clothTypeName: "path",
            itemsList: [
              {
                id: 602,
                title: "Нашивки 1",
                isProp: 0,
                componentNumber: 10,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 603,
                title: "Нашивки 2",
                isProp: 0,
                componentNumber: 10,
                drawable: 50,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 604,
                title: "Нашивки 3",
                isProp: 0,
                componentNumber: 10,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежелет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 605,
                title: "Бронежелет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 17,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 606,
                title: "Бронежелет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 17,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
        ],
      },
      24: {
        male: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 607,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 101,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 608,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 4,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 609,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 3,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 610,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 611,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 147,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 612,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 242,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 613,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 295,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 614,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 89,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 615,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 616,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 147,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 617,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 207,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 618,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 207,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 619,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 209,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 620,
                title: "Куртка 14",
                isProp: 0,
                componentNumber: 11,
                drawable: 209,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 621,
                title: "Куртка 15",
                isProp: 0,
                componentNumber: 11,
                drawable: 285,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 622,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 623,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 624,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 57,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 625,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 75,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 626,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 31,
                textureId: 7,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 627,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 628,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 28,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 629,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 630,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 24,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 631,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 65,
                textureId: 13,
                paletteId: 0,
              },
              {
                id: 632,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 65,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 633,
                title: "Штаны 7",
                isProp: 0,
                componentNumber: 4,
                drawable: 25,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 634,
                title: "Штаны 8",
                isProp: 0,
                componentNumber: 4,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 635,
                title: "Штаны 9",
                isProp: 0,
                componentNumber: 4,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 636,
                title: "Штаны 10",
                isProp: 0,
                componentNumber: 4,
                drawable: 42,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 637,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 638,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 127,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 639,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 640,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 28,
                textureId: 5,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 641,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 642,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 643,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 644,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 645,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 3,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 646,
                title: "Обувь 6",
                isProp: 0,
                componentNumber: 6,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 647,
                title: "Обувь 7",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 648,
                title: "Обувь 8",
                isProp: 0,
                componentNumber: 6,
                drawable: 36,
                textureId: 3,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 649,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 83,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 650,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 92,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 651,
                title: "Руки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 85,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 652,
                title: "Руки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 86,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 653,
                title: "Руки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 654,
                title: "Руки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 655,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 46,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 656,
                title: "Маска 2",
                isProp: 0,
                componentNumber: 1,
                drawable: 11,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 657,
                title: "Маска 3",
                isProp: 0,
                componentNumber: 1,
                drawable: 11,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 658,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 43,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 659,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 37,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Рация и бейдж",
            clothType: "other2",
            clothTypeName: "other2",
            itemsList: [
              {
                id: 660,
                title: "Рация и бейдж 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 661,
                title: "Рация и бейдж 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 4,
                paletteId: 0,
              },
            ],
          },
        ],
        female: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 662,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 92,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 663,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 67,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 664,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 61,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 665,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 57,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 666,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 667,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 286,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 668,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 331,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 669,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 250,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 670,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 58,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 671,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 39,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 672,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 77,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 673,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 331,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 674,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 675,
                title: "Куртка 14",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 676,
                title: "Куртка 15",
                isProp: 0,
                componentNumber: 11,
                drawable: 213,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 677,
                title: "Куртка 16",
                isProp: 0,
                componentNumber: 11,
                drawable: 213,
                textureId: 6,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 678,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 679,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 37,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 680,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 681,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 52,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 682,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 40,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 683,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 37,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 684,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 23,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 685,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 23,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 686,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 47,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 687,
                title: "Штаны 7",
                isProp: 0,
                componentNumber: 4,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 688,
                title: "Штаны 8",
                isProp: 0,
                componentNumber: 4,
                drawable: 36,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 689,
                title: "Штаны 9",
                isProp: 0,
                componentNumber: 4,
                drawable: 37,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 690,
                title: "Штаны 10",
                isProp: 0,
                componentNumber: 4,
                drawable: 67,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 691,
                title: "Штаны 11",
                isProp: 0,
                componentNumber: 4,
                drawable: 67,
                textureId: 13,
                paletteId: 0,
              },
              {
                id: 692,
                title: "Штаны 12",
                isProp: 0,
                componentNumber: 4,
                drawable: 127,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 693,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 694,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 127,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 695,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 97,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 696,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 96,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 697,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 86,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 698,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 101,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 699,
                title: "Руки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 14,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 700,
                title: "Руки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 105,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 701,
                title: "Руки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 702,
                title: "Руки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 98,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 703,
                title: "Руки 7",
                isProp: 0,
                componentNumber: 3,
                drawable: 109,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 704,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 705,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 706,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 3,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 707,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 1,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 708,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 1,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 709,
                title: "Обувь 6",
                isProp: 0,
                componentNumber: 6,
                drawable: 80,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 710,
                title: "Обувь 7",
                isProp: 0,
                componentNumber: 6,
                drawable: 19,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 711,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 11,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 712,
                title: "Маска 2",
                isProp: 0,
                componentNumber: 1,
                drawable: 11,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 713,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 46,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 714,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 37,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Рация на плечо",
            clothType: "radio",
            clothTypeName: "radio",
            itemsList: [
              {
                id: 715,
                title: "Рация на плечо 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 14,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
      },
      25: {
        male: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 716,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 717,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 12,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 718,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 719,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 210,
                textureId: 11,
                paletteId: 0,
              },
              {
                id: 720,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 210,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 721,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 11,
                paletteId: 0,
              },
              {
                id: 722,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 723,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 213,
                textureId: 11,
                paletteId: 0,
              },
              {
                id: 724,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 213,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 725,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 277,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 726,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 278,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 727,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 278,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 728,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 50,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 729,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 16,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 730,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 42,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 731,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 55,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 732,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 56,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 733,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 95,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 734,
                title: "Футболка 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 106,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 735,
                title: "Футболка 7",
                isProp: 0,
                componentNumber: 8,
                drawable: 112,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 736,
                title: "Футболка 8",
                isProp: 0,
                componentNumber: 8,
                drawable: 114,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 737,
                title: "Футболка 9",
                isProp: 0,
                componentNumber: 8,
                drawable: 122,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 738,
                title: "Футболка 10",
                isProp: 0,
                componentNumber: 8,
                drawable: 130,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 739,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 740,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 741,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 86,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 742,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 743,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 122,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 744,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 745,
                title: "Штаны 7",
                isProp: 0,
                componentNumber: 4,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 746,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 747,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 748,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 749,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 750,
                title: "Аксессуары 5",
                isProp: 0,
                componentNumber: 7,
                drawable: 110,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 751,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 752,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 753,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 61,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 754,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 9,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 755,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 58,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 756,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 757,
                title: "Разное 3",
                isProp: 0,
                componentNumber: 5,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Перчатки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 758,
                title: "Перчатки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 17,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 759,
                title: "Перчатки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 19,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 760,
                title: "Перчатки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 761,
                title: "Перчатки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 762,
                title: "Перчатки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 763,
                title: "Перчатки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 23,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 764,
                title: "Перчатки 7",
                isProp: 0,
                componentNumber: 3,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 765,
                title: "Перчатки 8",
                isProp: 0,
                componentNumber: 3,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 766,
                title: "Перчатки 9",
                isProp: 0,
                componentNumber: 3,
                drawable: 26,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 767,
                title: "Перчатки 10",
                isProp: 0,
                componentNumber: 3,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 768,
                title: "Перчатки 11",
                isProp: 0,
                componentNumber: 3,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 769,
                title: "Перчатки 12",
                isProp: 0,
                componentNumber: 3,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 770,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 12,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 771,
                title: "Бронежилет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 772,
                title: "Бронежилет 3",
                isProp: 0,
                componentNumber: 9,
                drawable: 16,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 773,
                title: "Бронежилет 4",
                isProp: 0,
                componentNumber: 9,
                drawable: 17,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 774,
                title: "Бронежилет 5",
                isProp: 0,
                componentNumber: 9,
                drawable: 17,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 775,
                title: "Бронежилет 6",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 776,
                title: "Бронежилет 7",
                isProp: 0,
                componentNumber: 9,
                drawable: 19,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 777,
                title: "Бронежилет 8",
                isProp: 0,
                componentNumber: 9,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 778,
                title: "Бронежилет 9",
                isProp: 0,
                componentNumber: 9,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 779,
                title: "Бронежилет 10",
                isProp: 0,
                componentNumber: 9,
                drawable: 53,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 780,
                title: "Бронежилет 11",
                isProp: 0,
                componentNumber: 9,
                drawable: 54,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 781,
                title: "Бронежилет 12",
                isProp: 0,
                componentNumber: 9,
                drawable: 55,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Нашивка",
            clothType: "path",
            clothTypeName: "path",
            itemsList: [
              {
                id: 782,
                title: "Нашивка 1",
                isProp: 0,
                componentNumber: 10,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Головной убор",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 783,
                title: "Головной убор 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 784,
                title: "Головной убор 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
        female: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 785,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 43,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 786,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 57,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 787,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 91,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 788,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 58,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 789,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 216,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 790,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 11,
                paletteId: 0,
              },
              {
                id: 791,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 792,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 11,
                paletteId: 0,
              },
              {
                id: 793,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 794,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 11,
                paletteId: 0,
              },
              {
                id: 795,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 796,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 262,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 797,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 296,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 798,
                title: "Куртка 14",
                isProp: 0,
                componentNumber: 11,
                drawable: 336,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 799,
                title: "Куртка 15",
                isProp: 0,
                componentNumber: 11,
                drawable: 336,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 800,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 801,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 802,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 803,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 33,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 804,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 805,
                title: "Футболка 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 806,
                title: "Футболка 7",
                isProp: 0,
                componentNumber: 8,
                drawable: 39,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 807,
                title: "Футболка 8",
                isProp: 0,
                componentNumber: 8,
                drawable: 67,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 808,
                title: "Футболка 9",
                isProp: 0,
                componentNumber: 8,
                drawable: 78,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 809,
                title: "Футболка 10",
                isProp: 0,
                componentNumber: 8,
                drawable: 80,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 810,
                title: "Футболка 11",
                isProp: 0,
                componentNumber: 8,
                drawable: 86,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 811,
                title: "Футболка 12",
                isProp: 0,
                componentNumber: 8,
                drawable: 100,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 812,
                title: "Футболка 13",
                isProp: 0,
                componentNumber: 8,
                drawable: 160,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 813,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 47,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 814,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 102,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 815,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 128,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 816,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 817,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 11,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 818,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 37,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 819,
                title: "Штаны 7",
                isProp: 0,
                componentNumber: 4,
                drawable: 51,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 820,
                title: "Штаны 8",
                isProp: 0,
                componentNumber: 4,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 821,
                title: "Штаны 9",
                isProp: 0,
                componentNumber: 4,
                drawable: 89,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 822,
                title: "Штаны 10",
                isProp: 0,
                componentNumber: 4,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 823,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 824,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 825,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 826,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 81,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 827,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 828,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 64,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 829,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 77,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 830,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 831,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 832,
                title: "Обувь 6",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 8,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 833,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 58,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 834,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 835,
                title: "Разное 3",
                isProp: 0,
                componentNumber: 5,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Перчатки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 836,
                title: "Перчатки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 18,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 837,
                title: "Перчатки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 838,
                title: "Перчатки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 839,
                title: "Перчатки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 840,
                title: "Перчатки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 23,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 841,
                title: "Перчатки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 842,
                title: "Перчатки 7",
                isProp: 0,
                componentNumber: 3,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 843,
                title: "Перчатки 8",
                isProp: 0,
                componentNumber: 3,
                drawable: 26,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 844,
                title: "Перчатки 9",
                isProp: 0,
                componentNumber: 3,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 845,
                title: "Перчатки 10",
                isProp: 0,
                componentNumber: 3,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 846,
                title: "Перчатки 11",
                isProp: 0,
                componentNumber: 3,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 847,
                title: "Перчатки 12",
                isProp: 0,
                componentNumber: 3,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 848,
                title: "Перчатки 13",
                isProp: 0,
                componentNumber: 3,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 849,
                title: "Перчатки 14",
                isProp: 0,
                componentNumber: 3,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 850,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 11,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 851,
                title: "Бронежилет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 14,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 852,
                title: "Бронежилет 3",
                isProp: 0,
                componentNumber: 9,
                drawable: 18,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 853,
                title: "Бронежилет 4",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 854,
                title: "Бронежилет 5",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 855,
                title: "Бронежилет 6",
                isProp: 0,
                componentNumber: 9,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 856,
                title: "Бронежилет 7",
                isProp: 0,
                componentNumber: 9,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 857,
                title: "Бронежилет 8",
                isProp: 0,
                componentNumber: 9,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 858,
                title: "Бронежилет 9",
                isProp: 0,
                componentNumber: 9,
                drawable: 53,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 859,
                title: "Бронежилет 10",
                isProp: 0,
                componentNumber: 9,
                drawable: 54,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 860,
                title: "Бронежилет 11",
                isProp: 0,
                componentNumber: 9,
                drawable: 55,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Нашивка",
            clothType: "path",
            clothTypeName: "path",
            itemsList: [
              {
                id: 861,
                title: "Нашивка 1",
                isProp: 0,
                componentNumber: 10,
                drawable: 12,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Головной убор",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 862,
                title: "Головной убор 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 863,
                title: "Головной убор 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
      },
      26: {
        male: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 864,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 276,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 865,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 275,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 866,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 867,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 322,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 868,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 275,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 869,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 275,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 870,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 291,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 871,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 291,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 872,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 873,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 15,
                paletteId: 0,
              },
              {
                id: 874,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 875,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 216,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 876,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 213,
                textureId: 9,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Перчатки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 877,
                title: "Перчатки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 17,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 878,
                title: "Перчатки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 17,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 879,
                title: "Перчатки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 80,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 880,
                title: "Перчатки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 881,
                title: "Перчатки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 882,
                title: "Перчатки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 23,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 883,
                title: "Перчатки 7",
                isProp: 0,
                componentNumber: 3,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 884,
                title: "Перчатки 8",
                isProp: 0,
                componentNumber: 3,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 885,
                title: "Перчатки 9",
                isProp: 0,
                componentNumber: 3,
                drawable: 26,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 886,
                title: "Перчатки 10",
                isProp: 0,
                componentNumber: 3,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 887,
                title: "Перчатки 11",
                isProp: 0,
                componentNumber: 3,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 888,
                title: "Перчатки 12",
                isProp: 0,
                componentNumber: 3,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 889,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 16,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 890,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 16,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 891,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 56,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 892,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 57,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 893,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 58,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 894,
                title: "Футболка 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 95,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 895,
                title: "Футболка 7",
                isProp: 0,
                componentNumber: 8,
                drawable: 153,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 896,
                title: "Футболка 8",
                isProp: 0,
                componentNumber: 8,
                drawable: 115,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 897,
                title: "Футболка 9",
                isProp: 0,
                componentNumber: 8,
                drawable: 115,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 898,
                title: "Футболка 10",
                isProp: 0,
                componentNumber: 8,
                drawable: 115,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 899,
                title: "Футболка 11",
                isProp: 0,
                componentNumber: 8,
                drawable: 115,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 900,
                title: "Футболка 12",
                isProp: 0,
                componentNumber: 8,
                drawable: 115,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 901,
                title: "Футболка 13",
                isProp: 0,
                componentNumber: 8,
                drawable: 115,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 902,
                title: "Футболка 14",
                isProp: 0,
                componentNumber: 8,
                drawable: 122,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 903,
                title: "Футболка 15",
                isProp: 0,
                componentNumber: 8,
                drawable: 154,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 904,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 86,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 905,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 122,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 906,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 123,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 907,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 49,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 908,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 909,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 910,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 911,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 38,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 912,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 913,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 914,
                title: "Разное 3",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 915,
                title: "Разное 4",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 916,
                title: "Разное 5",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 917,
                title: "Разное 6",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 918,
                title: "Разное 7",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 919,
                title: "Разное 8",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 920,
                title: "Разное 9",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 921,
                title: "Разное 10",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 922,
                title: "Разное 11",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 923,
                title: "Разное 12",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 924,
                title: "Разное 13",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 925,
                title: "Разное 14",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 926,
                title: "Разное 15",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 927,
                title: "Разное 16",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 928,
                title: "Разное 17",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 8,
                paletteId: 0,
              },
              {
                id: 929,
                title: "Разное 18",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 930,
                title: "Разное 19",
                isProp: 0,
                componentNumber: 5,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 931,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 932,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 63,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 933,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 38,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 934,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 23,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 935,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Нашивка",
            clothType: "path",
            clothTypeName: "path",
            itemsList: [
              {
                id: 936,
                title: "Нашивка 1",
                isProp: 0,
                componentNumber: 10,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 937,
                title: "Нашивка 2",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 938,
                title: "Нашивка 3",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 939,
                title: "Нашивка 4",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 940,
                title: "Нашивка 5",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 941,
                title: "Нашивка 6",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 942,
                title: "Нашивка 7",
                isProp: 0,
                componentNumber: 10,
                drawable: 44,
                textureId: 5,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 943,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 12,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 944,
                title: "Бронежилет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 945,
                title: "Бронежилет 3",
                isProp: 0,
                componentNumber: 9,
                drawable: 16,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 946,
                title: "Бронежилет 4",
                isProp: 0,
                componentNumber: 9,
                drawable: 17,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 947,
                title: "Бронежилет 5",
                isProp: 0,
                componentNumber: 9,
                drawable: 17,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 948,
                title: "Бронежилет 6",
                isProp: 0,
                componentNumber: 9,
                drawable: 18,
                textureId: 3,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Головной убор",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 949,
                title: "Головной убор 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 950,
                title: "Головной убор 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 951,
                title: "Головной убор 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 13,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 952,
                title: "Головной убор 4",
                isProp: 1,
                componentNumber: 0,
                drawable: 119,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 953,
                title: "Головной убор 5",
                isProp: 1,
                componentNumber: 0,
                drawable: 124,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 954,
                title: "Головной убор 6",
                isProp: 1,
                componentNumber: 0,
                drawable: 33,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 955,
                title: "Головной убор 7",
                isProp: 1,
                componentNumber: 0,
                drawable: 13,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
        ],
        female: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 956,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 957,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 958,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 959,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 214,
                textureId: 16,
                paletteId: 0,
              },
              {
                id: 960,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 961,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 962,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 963,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 215,
                textureId: 15,
                paletteId: 0,
              },
              {
                id: 964,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 216,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 965,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 966,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 967,
                title: "Куртка 12",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 968,
                title: "Куртка 13",
                isProp: 0,
                componentNumber: 11,
                drawable: 217,
                textureId: 16,
                paletteId: 0,
              },
              {
                id: 969,
                title: "Куртка 14",
                isProp: 0,
                componentNumber: 11,
                drawable: 220,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 970,
                title: "Куртка 15",
                isProp: 0,
                componentNumber: 11,
                drawable: 220,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 971,
                title: "Куртка 16",
                isProp: 0,
                componentNumber: 11,
                drawable: 221,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 972,
                title: "Куртка 17",
                isProp: 0,
                componentNumber: 11,
                drawable: 291,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 973,
                title: "Куртка 18",
                isProp: 0,
                componentNumber: 11,
                drawable: 144,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 974,
                title: "Куртка 19",
                isProp: 0,
                componentNumber: 11,
                drawable: 144,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 975,
                title: "Куртка 20",
                isProp: 0,
                componentNumber: 11,
                drawable: 144,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 976,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 977,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 978,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 33,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 979,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 980,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 35,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 981,
                title: "Футболка 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 81,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 982,
                title: "Футболка 7",
                isProp: 0,
                componentNumber: 8,
                drawable: 81,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 983,
                title: "Футболка 8",
                isProp: 0,
                componentNumber: 8,
                drawable: 81,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 984,
                title: "Футболка 9",
                isProp: 0,
                componentNumber: 8,
                drawable: 81,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 985,
                title: "Футболка 10",
                isProp: 0,
                componentNumber: 8,
                drawable: 81,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 986,
                title: "Футболка 11",
                isProp: 0,
                componentNumber: 8,
                drawable: 81,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 987,
                title: "Футболка 12",
                isProp: 0,
                componentNumber: 8,
                drawable: 100,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 988,
                title: "Футболка 13",
                isProp: 0,
                componentNumber: 8,
                drawable: 152,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 989,
                title: "Футболка 14",
                isProp: 0,
                componentNumber: 8,
                drawable: 160,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 990,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 89,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 991,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 992,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 993,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 81,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 994,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 995,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 996,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 997,
                title: "Разное 3",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 998,
                title: "Разное 4",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 999,
                title: "Разное 5",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1e3,
                title: "Разное 6",
                isProp: 0,
                componentNumber: 5,
                drawable: 60,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 1001,
                title: "Разное 7",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1002,
                title: "Разное 8",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1003,
                title: "Разное 9",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1004,
                title: "Разное 10",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 1005,
                title: "Разное 11",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1006,
                title: "Разное 12",
                isProp: 0,
                componentNumber: 5,
                drawable: 53,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 1007,
                title: "Разное 13",
                isProp: 0,
                componentNumber: 5,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 1008,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1009,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 64,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1010,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 77,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1011,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1012,
                title: "Обувь 5",
                isProp: 0,
                componentNumber: 6,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1013,
                title: "Обувь 6",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 8,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Перчатки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 1014,
                title: "Перчатки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 18,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1015,
                title: "Перчатки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 17,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1016,
                title: "Перчатки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1017,
                title: "Перчатки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1018,
                title: "Перчатки 5",
                isProp: 0,
                componentNumber: 3,
                drawable: 23,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1019,
                title: "Перчатки 6",
                isProp: 0,
                componentNumber: 3,
                drawable: 24,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1020,
                title: "Перчатки 7",
                isProp: 0,
                componentNumber: 3,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1021,
                title: "Перчатки 8",
                isProp: 0,
                componentNumber: 3,
                drawable: 26,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1022,
                title: "Перчатки 9",
                isProp: 0,
                componentNumber: 3,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1023,
                title: "Перчатки 10",
                isProp: 0,
                componentNumber: 3,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1024,
                title: "Перчатки 11",
                isProp: 0,
                componentNumber: 3,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1025,
                title: "Перчатки 12",
                isProp: 0,
                componentNumber: 3,
                drawable: 30,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1026,
                title: "Перчатки 13",
                isProp: 0,
                componentNumber: 3,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1027,
                title: "Перчатки 14",
                isProp: 0,
                componentNumber: 3,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Нашивка",
            clothType: "path",
            clothTypeName: "path",
            itemsList: [
              {
                id: 1028,
                title: "Нашивка 1",
                isProp: 0,
                componentNumber: 10,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1029,
                title: "Нашивка 2",
                isProp: 0,
                componentNumber: 10,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 1030,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 4,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1031,
                title: "Бронежилет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 4,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 1032,
                title: "Бронежилет 3",
                isProp: 0,
                componentNumber: 9,
                drawable: 11,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1033,
                title: "Бронежилет 4",
                isProp: 0,
                componentNumber: 9,
                drawable: 14,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1034,
                title: "Бронежилет 5",
                isProp: 0,
                componentNumber: 9,
                drawable: 15,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1035,
                title: "Бронежилет 6",
                isProp: 0,
                componentNumber: 9,
                drawable: 18,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1036,
                title: "Бронежилет 7",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1037,
                title: "Бронежилет 8",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 1038,
                title: "Бронежилет 9",
                isProp: 0,
                componentNumber: 9,
                drawable: 22,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 1039,
                title: "Бронежилет 10",
                isProp: 0,
                componentNumber: 9,
                drawable: 22,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1040,
                title: "Бронежилет 11",
                isProp: 0,
                componentNumber: 9,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1041,
                title: "Бронежилет 12",
                isProp: 0,
                componentNumber: 9,
                drawable: 30,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1042,
                title: "Бронежилет 13",
                isProp: 0,
                componentNumber: 9,
                drawable: 31,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
        ],
      },
      28: {
        male: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 1043,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 321,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1044,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 322,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1045,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 318,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 1046,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 10,
                paletteId: 0,
              },
              {
                id: 1047,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 336,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 1048,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1049,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1050,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1051,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1052,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1053,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 315,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Под одежду",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 1054,
                title: "Под одежду 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 150,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1055,
                title: "Под одежду 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1056,
                title: "Под одежду 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 154,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1057,
                title: "Под одежду 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 129,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1058,
                title: "Под одежду 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1059,
                title: "Под одежду 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 95,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1060,
                title: "Под одежду 7",
                isProp: 0,
                componentNumber: 8,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1061,
                title: "Под одежду 8",
                isProp: 0,
                componentNumber: 8,
                drawable: 112,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1062,
                title: "Под одежду 9",
                isProp: 0,
                componentNumber: 8,
                drawable: 114,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 1063,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1064,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1065,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1066,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 59,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 1067,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 45,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1068,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 1069,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 28,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1070,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1071,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 10,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1072,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 18,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1073,
                title: "Аксессуары 5",
                isProp: 0,
                componentNumber: 7,
                drawable: 115,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1074,
                title: "Аксессуары 6",
                isProp: 0,
                componentNumber: 7,
                drawable: 115,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1075,
                title: "Аксессуары 7",
                isProp: 0,
                componentNumber: 7,
                drawable: 38,
                textureId: 10,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 1076,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1077,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1078,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 1079,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 58,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 1080,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 172,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1081,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 1082,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 12,
                textureId: 4,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 1083,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 121,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1084,
                title: "Маска 2",
                isProp: 0,
                componentNumber: 1,
                drawable: 56,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Очки",
            clothType: "glass",
            clothTypeName: "glass",
            itemsList: [
              {
                id: 1085,
                title: "Очки 1",
                isProp: 1,
                componentNumber: 1,
                drawable: 1,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1086,
                title: "Очки 2",
                isProp: 1,
                componentNumber: 1,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Головной убор",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 1087,
                title: "Головной убор 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 1088,
                title: "Головной убор 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 1089,
                title: "Головной убор 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 142,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1090,
                title: "Головной убор 4",
                isProp: 1,
                componentNumber: 0,
                drawable: 147,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
        female: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 1091,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 351,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 1092,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1093,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 57,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1094,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 220,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1095,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 305,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1096,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 333,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1097,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 339,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1098,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1099,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 9,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1100,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 1101,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1102,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1103,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 70,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1104,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1105,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 33,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1106,
                title: "Футболка 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 35,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 1107,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 61,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 1108,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 41,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1109,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 47,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1110,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1111,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1112,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 1113,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1114,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 86,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1115,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 86,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1116,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 1117,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1118,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1119,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 1120,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 58,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1121,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 1122,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 111,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1123,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1124,
                title: "Руки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 3,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1125,
                title: "Руки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежелет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 1126,
                title: "Бронежелет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 11,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1127,
                title: "Бронежелет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 9,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 1128,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 56,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Головной убор",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 1129,
                title: "Головной убор 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 140,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1130,
                title: "Головной убор 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1131,
                title: "Головной убор 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 141,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
      },
      29: {
        male: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 1132,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 348,
                textureId: 12,
                paletteId: 0,
              },
              {
                id: 1133,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 99,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1134,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 103,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1135,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 295,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1136,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 208,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1137,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 206,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1138,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 279,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 1139,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 69,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1140,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 60,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1141,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 1142,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 48,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1143,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 52,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1144,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 49,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1145,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 24,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 1146,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 4,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 1147,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1148,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 1149,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 10,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1150,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 28,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бейдж",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 1151,
                title: "Бейдж 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 21,
                textureId: 5,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 1152,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 23,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1153,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1154,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
        ],
        female: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 1155,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 130,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1156,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 90,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1157,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 66,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1158,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 210,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1159,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 212,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1160,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 25,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 1161,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 39,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1162,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 38,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 1163,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 6,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1164,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 23,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1165,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1166,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бейдж",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 1167,
                title: "Бейдж 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 20,
                textureId: 5,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothTypeName: "feet",
            clothType: "feet",
            itemsList: [
              {
                id: 1168,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 37,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1169,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 19,
                textureId: 7,
                paletteId: 0,
              },
              {
                id: 1170,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1171,
                title: "Обувь 4",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 2,
                paletteId: 0,
              },
            ],
          },
        ],
      },
      30: {
        male: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 1043,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 321,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1044,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 322,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1045,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 318,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 1046,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 211,
                textureId: 10,
                paletteId: 0,
              },
              {
                id: 1047,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 336,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 1048,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1049,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 27,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1050,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1051,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1052,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1053,
                title: "Куртка 11",
                isProp: 0,
                componentNumber: 11,
                drawable: 315,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Под одежду",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 1054,
                title: "Под одежду 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 150,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1055,
                title: "Под одежду 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1056,
                title: "Под одежду 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 154,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1057,
                title: "Под одежду 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 129,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1058,
                title: "Под одежду 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 28,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1059,
                title: "Под одежду 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 95,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1060,
                title: "Под одежду 7",
                isProp: 0,
                componentNumber: 8,
                drawable: 31,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1061,
                title: "Под одежду 8",
                isProp: 0,
                componentNumber: 8,
                drawable: 112,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1062,
                title: "Под одежду 9",
                isProp: 0,
                componentNumber: 8,
                drawable: 114,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 1063,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1064,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 13,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1065,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1066,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 59,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 1067,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 45,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1068,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 126,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 1069,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 28,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1070,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1071,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 10,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1072,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 18,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1073,
                title: "Аксессуары 5",
                isProp: 0,
                componentNumber: 7,
                drawable: 115,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1074,
                title: "Аксессуары 6",
                isProp: 0,
                componentNumber: 7,
                drawable: 115,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1075,
                title: "Аксессуары 7",
                isProp: 0,
                componentNumber: 7,
                drawable: 38,
                textureId: 10,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 1076,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1077,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 10,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1078,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 21,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 1079,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 58,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 1080,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 172,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1081,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 4,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежилет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 1082,
                title: "Бронежилет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 12,
                textureId: 4,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 1083,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 121,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1084,
                title: "Маска 2",
                isProp: 0,
                componentNumber: 1,
                drawable: 56,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Очки",
            clothType: "glass",
            clothTypeName: "glass",
            itemsList: [
              {
                id: 1085,
                title: "Очки 1",
                isProp: 1,
                componentNumber: 1,
                drawable: 1,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1086,
                title: "Очки 2",
                isProp: 1,
                componentNumber: 1,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Головной убор",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 1087,
                title: "Головной убор 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 5,
                paletteId: 0,
              },
              {
                id: 1088,
                title: "Головной убор 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 6,
                paletteId: 0,
              },
              {
                id: 1089,
                title: "Головной убор 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 142,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1090,
                title: "Головной убор 4",
                isProp: 1,
                componentNumber: 0,
                drawable: 147,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
        female: [
          {
            type: "Куртка",
            clothType: "jacket",
            clothTypeName: "jacket",
            itemsList: [
              {
                id: 1091,
                title: "Куртка 1",
                isProp: 0,
                componentNumber: 11,
                drawable: 351,
                textureId: 3,
                paletteId: 0,
              },
              {
                id: 1092,
                title: "Куртка 2",
                isProp: 0,
                componentNumber: 11,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1093,
                title: "Куртка 3",
                isProp: 0,
                componentNumber: 11,
                drawable: 57,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1094,
                title: "Куртка 4",
                isProp: 0,
                componentNumber: 11,
                drawable: 220,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1095,
                title: "Куртка 5",
                isProp: 0,
                componentNumber: 11,
                drawable: 305,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1096,
                title: "Куртка 6",
                isProp: 0,
                componentNumber: 11,
                drawable: 333,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1097,
                title: "Куртка 7",
                isProp: 0,
                componentNumber: 11,
                drawable: 339,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1098,
                title: "Куртка 8",
                isProp: 0,
                componentNumber: 11,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1099,
                title: "Куртка 9",
                isProp: 0,
                componentNumber: 11,
                drawable: 9,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1100,
                title: "Куртка 10",
                isProp: 0,
                componentNumber: 11,
                drawable: 0,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Футболка",
            clothType: "undershirt",
            clothTypeName: "undershirt",
            itemsList: [
              {
                id: 1101,
                title: "Футболка 1",
                isProp: 0,
                componentNumber: 8,
                drawable: 8,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1102,
                title: "Футболка 2",
                isProp: 0,
                componentNumber: 8,
                drawable: 38,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1103,
                title: "Футболка 3",
                isProp: 0,
                componentNumber: 8,
                drawable: 70,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1104,
                title: "Футболка 4",
                isProp: 0,
                componentNumber: 8,
                drawable: 32,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1105,
                title: "Футболка 5",
                isProp: 0,
                componentNumber: 8,
                drawable: 33,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1106,
                title: "Футболка 6",
                isProp: 0,
                componentNumber: 8,
                drawable: 35,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Штаны",
            clothType: "pants",
            clothTypeName: "pants",
            itemsList: [
              {
                id: 1107,
                title: "Штаны 1",
                isProp: 0,
                componentNumber: 4,
                drawable: 61,
                textureId: 9,
                paletteId: 0,
              },
              {
                id: 1108,
                title: "Штаны 2",
                isProp: 0,
                componentNumber: 4,
                drawable: 41,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1109,
                title: "Штаны 3",
                isProp: 0,
                componentNumber: 4,
                drawable: 47,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1110,
                title: "Штаны 4",
                isProp: 0,
                componentNumber: 4,
                drawable: 6,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1111,
                title: "Штаны 5",
                isProp: 0,
                componentNumber: 4,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1112,
                title: "Штаны 6",
                isProp: 0,
                componentNumber: 4,
                drawable: 34,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Аксессуары",
            clothType: "jewelry",
            clothTypeName: "jewelry",
            itemsList: [
              {
                id: 1113,
                title: "Аксессуары 1",
                isProp: 0,
                componentNumber: 7,
                drawable: 1,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1114,
                title: "Аксессуары 2",
                isProp: 0,
                componentNumber: 7,
                drawable: 86,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1115,
                title: "Аксессуары 3",
                isProp: 0,
                componentNumber: 7,
                drawable: 86,
                textureId: 1,
                paletteId: 0,
              },
              {
                id: 1116,
                title: "Аксессуары 4",
                isProp: 0,
                componentNumber: 7,
                drawable: 22,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Обувь",
            clothType: "feet",
            clothTypeName: "feet",
            itemsList: [
              {
                id: 1117,
                title: "Обувь 1",
                isProp: 0,
                componentNumber: 6,
                drawable: 25,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1118,
                title: "Обувь 2",
                isProp: 0,
                componentNumber: 6,
                drawable: 42,
                textureId: 2,
                paletteId: 0,
              },
              {
                id: 1119,
                title: "Обувь 3",
                isProp: 0,
                componentNumber: 6,
                drawable: 29,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Разное",
            clothType: "other",
            clothTypeName: "other",
            itemsList: [
              {
                id: 1120,
                title: "Разное 1",
                isProp: 0,
                componentNumber: 5,
                drawable: 58,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1121,
                title: "Разное 2",
                isProp: 0,
                componentNumber: 5,
                drawable: 20,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Руки",
            clothType: "tors",
            clothTypeName: "tors",
            itemsList: [
              {
                id: 1122,
                title: "Руки 1",
                isProp: 0,
                componentNumber: 3,
                drawable: 111,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1123,
                title: "Руки 2",
                isProp: 0,
                componentNumber: 3,
                drawable: 7,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1124,
                title: "Руки 3",
                isProp: 0,
                componentNumber: 3,
                drawable: 3,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1125,
                title: "Руки 4",
                isProp: 0,
                componentNumber: 3,
                drawable: 9,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Бронежелет",
            clothType: "armour",
            clothTypeName: "armour",
            itemsList: [
              {
                id: 1126,
                title: "Бронежелет 1",
                isProp: 0,
                componentNumber: 9,
                drawable: 11,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1127,
                title: "Бронежелет 2",
                isProp: 0,
                componentNumber: 9,
                drawable: 9,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Маска",
            clothType: "mask",
            clothTypeName: "mask",
            itemsList: [
              {
                id: 1128,
                title: "Маска 1",
                isProp: 0,
                componentNumber: 1,
                drawable: 56,
                textureId: 1,
                paletteId: 0,
              },
            ],
          },
          {
            type: "Головной убор",
            clothType: "hats",
            clothTypeName: "hats",
            itemsList: [
              {
                id: 1129,
                title: "Головной убор 1",
                isProp: 1,
                componentNumber: 0,
                drawable: 140,
                textureId: 0,
                paletteId: 0,
              },
              {
                id: 1130,
                title: "Головной убор 2",
                isProp: 1,
                componentNumber: 0,
                drawable: 10,
                textureId: 4,
                paletteId: 0,
              },
              {
                id: 1131,
                title: "Головной убор 3",
                isProp: 1,
                componentNumber: 0,
                drawable: 141,
                textureId: 0,
                paletteId: 0,
              },
            ],
          },
        ],
      },
    };
  },
  function (e, t, a) {
    let i = [];
    const o = a(44);
    let r = [];
    const l = {
      male: {
        cloth: [
          { componentNumber: 11, drawable: 15 },
          { componentNumber: 10, drawable: 0 },
          { componentNumber: 9, drawable: 0 },
          { componentNumber: 8, drawable: 15 },
          { componentNumber: 7, drawable: 0 },
          { componentNumber: 6, drawable: 34 },
          { componentNumber: 5, drawable: 42 },
          { componentNumber: 4, drawable: 14 },
          { componentNumber: 3, drawable: 15 },
          { componentNumber: 1, drawable: 0 },
        ],
        prop: [
          { componentNumber: 2, drawable: -1 },
          { componentNumber: 1, drawable: 0 },
          { componentNumber: 0, drawable: 8 },
        ],
      },
      female: {
        cloth: [
          { componentNumber: 11, drawable: 15 },
          { componentNumber: 10, drawable: 0 },
          { componentNumber: 9, drawable: 0 },
          { componentNumber: 8, drawable: 14 },
          { componentNumber: 7, drawable: 0 },
          { componentNumber: 6, drawable: 35 },
          { componentNumber: 5, drawable: 42 },
          { componentNumber: 4, drawable: 14 },
          { componentNumber: 3, drawable: 15 },
          { componentNumber: 1, drawable: 0 },
        ],
        prop: [
          { componentNumber: 2, drawable: -1 },
          { componentNumber: 1, drawable: 12 },
          { componentNumber: 0, drawable: 120 },
        ],
      },
    };
    mp.events.add({
      cFactionCreateBlipCrime: (e) => {
        const { pos: t, blipID: a, blipTitle: o, factionId: r } = e,
          l = mp.blips.new(a, t, { name: o, shortRange: !0, scale: 0.7 });
        i.push(l),
          pedsData.forEach((e) => {
            if ("crime" === e.dialogType) {
              const t = mp.blips.new(303, e.coord, {
                name: "Черный рынок",
                shortRange: !0,
                scale: 0.7,
              });
              i.push(t);
            } else if (20 === r && "cocaine" === e.dialogType) {
              const t = mp.blips.new(514, e.coord, {
                name: "Gustavo",
                shortRange: !0,
                scale: 0.7,
              });
              i.push(t);
            }
          });
      },
      cFactionCreateStorage: (e, t, a) => {
        const o = mp.colshapes.newSphere(e.x, e.y, e.z, 0.5);
        o.factionStorage = !0;
        const r = mp.labels.new(
            `Склад фракции ${t}`,
            new mp.Vector3(e.x, e.y, e.z + 1),
            { drawDistance: 30 }
          ),
          l = mp.markers.new(1, new mp.Vector3(e.x, e.y, e.z - 1), 0.75);
        i.push(o, r, l);
      },
      cFactionCreateWardrobe: (e, t, a) => {
        const { x: o, y: l, z: n, rot: s } = JSON.parse(e),
          p = mp.markers.new(1, new mp.Vector3(o, l, n - 1), 1, {
            color: [0, 255, 0, 100],
          }),
          m = mp.colshapes.newSphere(o, l, n, 1);
        (m.wardrobe = !0), (m.position = { x: o, y: l, z: n, rot: s });
        const d = mp.labels.new("Рабочая форма", new mp.Vector3(o, l, n + 1), {
          drawDistance: 20,
          color: [0, 255, 0, 200],
        });
        if (
          (i.push(m, d, p),
          (r = t),
          misc.injectCef(
            `storage.setFactionUniformKits(${JSON.stringify(t)});`
          ),
          a)
        ) {
          a = JSON.parse(a);
          const e = mp.markers.new(1, new mp.Vector3(a.x, a.y, a.z - 1), 1, {
              color: [0, 255, 0, 100],
            }),
            t = mp.colshapes.newSphere(a.x, a.y, a.z, 1);
          (t.uniformConstructor = !0),
            (t.position = { x: a.x, y: a.y, z: a.z, rot: a.rot });
          const o = mp.labels.new(
            "Конструктор форм",
            new mp.Vector3(a.x, a.y, a.z + 1),
            { drawDistance: 20, color: [0, 255, 0, 200] }
          );
          i.push(t, o, e);
        }
      },
      cFactionRemoveEntities: () => {
        i.length && (i.forEach((e) => e.destroy()), (i = []));
      },
      cFactionOpenWardrobe: (e, t) => {
        e = JSON.parse(e);
        const a = i.find((e) => e.wardrobe),
          l = Object.assign({}, a.position, { dim: localplayer.remoteId + 1 });
        mp.events.callRemote("sPlayerTP", JSON.stringify(l));
        const n = r.filter((t) => e.includes(t.id)),
          s = 1885233650 === localplayer.model ? "male" : "female",
          p = localplayer.getVariable("factionID");
        let m = `storage.setFactionUniformKitsAvailable(${JSON.stringify(n)});`;
        (m += `storage.setFactionCurrentUniform(${t});`),
          (m += `storage.setFactionUniform(${JSON.stringify(o[p][s])});`),
          misc.injectCef(m),
          misc.openMenu("uniformSelect"),
          mp.events.call("cClothingShopCreateCam", a.position);
      },
      cFactionOpenConstructor: () => {
        const e = localplayer.getVariable("factionID");
        if (!e) return misc.notif("Вы не состоите во фракции", "error");
        const t = i.find((e) => e.uniformConstructor),
          a = Object.assign({}, t.position, { dim: localplayer.remoteId + 1 });
        mp.events.callRemote("sPlayerTP", JSON.stringify(a));
        const r = 1885233650 === localplayer.model ? "male" : "female";
        let l = `storage.setFactionUniform(${JSON.stringify(o[e][r])});`;
        misc.injectCef(l),
          misc.openMenu("uniformConstructor"),
          mp.events.call("cClothingShopCreateCam", t.position);
      },
      cFactionRemoveUniformCloth: (e) => {
        e = JSON.parse(e);
        const t = 1885233650 === localplayer.model ? "male" : "female",
          a = e.isProp ? "prop" : "cloth",
          i = l[t][a];
        if (!i)
          return misc.notif(
            `Произошла ошибка во время снятия предмета gender = ${t} type = ${a}`,
            "error"
          );
        const o = i.find((t) => t.componentNumber === e.componentNumber);
        if (!o)
          return misc.notif(
            `Произошла ошибка во время снятия предмета gender = ${t} type = ${a} componentNumber = ${e.componentNumber}`,
            "error"
          );
        if (
          (e.isProp
            ? mp.events.call(
                "cMiscSetProp",
                o.componentNumber,
                o.drawable,
                0,
                0
              )
            : mp.events.call(
                "cMiscSetClothes",
                o.componentNumber,
                o.drawable,
                0,
                0
              ),
          11 === e.componentNumber || 8 === e.componentNumber)
        ) {
          const e = 15;
          mp.events.call("cMiscSetClothes", 3, e, 0, 0);
        }
      },
      cFactionAddKit: (e) => {
        (e = JSON.parse(e)),
          r.push(e),
          misc.injectCef(
            `storage.setFactionUniformKits(${JSON.stringify(r)});`
          );
      },
      cFactionRenameKit: (e, t) => {
        const a = r.find((t) => t.id === e);
        a && (a.title = t),
          misc.injectCef(
            `storage.setFactionUniformKits(${JSON.stringify(r)});`
          );
      },
      cFactionRemoveKit: (e) => {
        const t = r.findIndex((t) => t.id === e);
        -1 !== t && r.splice(t, 1),
          misc.injectCef(
            `storage.setFactionUniformKits(${JSON.stringify(r)});`
          );
      },
      cFactionCalcCallsDist: (e) => {
        (e = JSON.parse(e)).forEach((e) => {
          e.distance = misc.roundNum(
            misc.vdist(localplayer.position, e.position)
          );
        }),
          misc.injectCef(`storage.setFactionCalls(${JSON.stringify(e)});`);
      },
      cFactionAddCall: (e) => {
        (e = JSON.parse(e)).distance = misc.roundNum(
          misc.vdist(localplayer.position, e.position)
        );
        let t = `storage.addFactionCall(${JSON.stringify(e)});`;
        (t += "storage.setSosCallSound(true);"),
          misc.injectCef(t),
          misc.notif("Поступил новый вызов!");
      },
    });
  },
  function (e, t) {
    let a = !1;
    mp.events.add({
      cArmyFillUpTanker: (e) => {
        if (!e) return misc.notif("Для заправки нужен бензовоз", "error");
        (a = !0), misc.notif("Заправка бензовоза начата");
        let t = "storage.setProgress(true);";
        (t += `storage.setProgressData(${JSON.stringify({
          type: "fillingArmyTanker",
          title: "Заправка бензовоза",
          intervalValue: 0.017,
        })});`),
          misc.injectCef(t);
      },
      cArmyFillUpCancel: () => {
        a &&
          (clearTimeout(void 0),
          (a = !1),
          misc.injectCef("storage.cancelFillingGas(true);"),
          misc.notif("Действие прервано", "error"));
      },
      cArmyTankerFilled: (e) => {
        (a = !1), e || mp.events.callRemote("sArmyTankerFilled");
      },
      cArmyStorageFilled: (e) => {
        (a = !1), e || mp.events.callRemote("sArmyPutFuelInStorage");
      },
      cArmyTryPutFuelInStorage: (e) => {
        if (!e) return misc.notif("Нужен заправленный бензовоз", "error");
        a = !0;
        let t = "storage.setProgress(true);";
        (t += `storage.setProgressData(${JSON.stringify({
          type: "fillingArmyStorage",
          title: "Выгрузка топлива",
          intervalValue: 0.017,
        })});`),
          misc.injectCef(t),
          misc.notif("Выгрузка топлива начата");
      },
    });
  },
  function (e, t) {
    const a = {
      x: -545.1875610351562,
      y: -202.01040649414062,
      z: 47.41495895385742,
    };
    let i = [];
    mp.events.add({
      cGovLoadLeader: () => {
        const e = mp.colshapes.newSphere(a.x, a.y, a.z, 1);
        (e.govTablet = !0), i.push(e);
        const t = mp.markers.new(1, new mp.Vector3(a.x, a.y, a.z - 1), 1, {
          color: [0, 255, 0, 100],
        });
        i.push(t);
        const o = mp.labels.new(
          "Планшет правительства",
          new mp.Vector3(a.x, a.y, a.z + 1),
          { drawDistance: 20, color: [0, 255, 0, 200] }
        );
        i.push(o);
        const r = mp.blips.new(1, a, {
          name: "Планшет правительства",
          color: 4,
          scale: 1,
          shortRange: !0,
        });
        i.push(r);
      },
      cGovDestroy: () => {
        i.forEach((e) => e.destroy()), (i = []), (eKeyHandler = {});
      },
    });
  },
  function (e, t) {
    const a = [
        { x: 472.5170593261719, y: -991.2590942382812, z: 26.273378372192383 },
        { x: -432.8088073730469, y: 5990.8271484375, z: 31.716482162475586 },
      ],
      i = 1765.0135498046875,
      o = 2567.91162109375,
      r = 45.56760025024414,
      l = 830.7355346679688,
      n = -1360.505615234375,
      s = 26.110679626464844,
      p = 870.9137573242188,
      m = -1350.2288818359375,
      d = 26.307708740234375;
    let c = [];
    [
      { x: 441.16363525390625, y: -981.9812622070312, z: 30.689559936523438 },
      { x: -446.0032043457031, y: 6016.138671875, z: 31.716480255126953 },
    ].forEach((e) => {
      (mp.colshapes.newSphere(e.x, e.y, e.z, 1).payFine = !0),
        mp.markers.new(1, new mp.Vector3(e.x, e.y, e.z - 1), 1, {
          color: [0, 255, 0, 100],
        }),
        mp.labels.new("Оплата штрафов", new mp.Vector3(e.x, e.y, e.z + 1), {
          drawDistance: 20,
          color: [0, 255, 0, 200],
        });
    }),
      mp.events.add({
        cPoliceInitEnities: () => {
          a.forEach((e) => {
            const t = mp.colshapes.newSphere(e.x, e.y, e.z, 1);
            t.copStorage = !0;
            const a = mp.markers.new(1, new mp.Vector3(e.x, e.y, e.z - 1), 1, {
                color: [0, 255, 0, 100],
              }),
              i = mp.labels.new(
                "Cклад вещдоков",
                new mp.Vector3(e.x, e.y, e.z + 1),
                { drawDistance: 20, color: [0, 255, 0, 200] }
              );
            c.push(t), c.push(a), c.push(i);
          });
          const e = mp.colshapes.newSphere(i, o, r, 1);
          e.prisonersList = !0;
          const t = mp.markers.new(1, new mp.Vector3(i, o, r - 1), 1, {
              color: [0, 255, 0, 100],
            }),
            _ = mp.labels.new(
              "Список заключенных",
              new mp.Vector3(i, o, r + 1),
              { drawDistance: 20, color: [0, 255, 0, 200] }
            );
          c.push(e), c.push(t), c.push(_);
          const u = mp.markers.new(1, new mp.Vector3(l, n, s - 3), 5, {
            color: [255, 255, 255, 100],
          });
          c.push(u);
          const h = mp.colshapes.newSphere(p, m, d, 5);
          h.destroyTruck = !0;
          const y = mp.markers.new(1, new mp.Vector3(p, m, d - 1), 5, {
            color: [255, 255, 255, 100],
          });
          c.push(h), c.push(y);
        },
        cPoliceDestroyEnities: () => {
          c.forEach((e) => e.destroy()), (c = []), (eKeyHandler = {});
        },
        cPoliceTrackNumber: (e, t) => {
          misc.clearNativeBlips(9),
            misc.createNativeBlip(e, t, 100, 9, 1),
            setTimeout(() => {
              misc.clearNativeBlips(9);
            }, 6e5);
        },
      });
  },
  function (e, t) {
    const a = {
        x: -114.29362487792969,
        y: -2373.76171875,
        z: 9.319199562072754,
      },
      i = { x: 3608.55419921875, y: 3742.387451171875, z: 28.690092086791992 },
      o = { x: 929.3555908203125, y: -2530.389404296875, z: 28.30265998840332 },
      r = { x: -2352.250732421875, y: 3220.640380859375, z: 33.05684280395508 },
      l = { x: 1670.42041015625, y: -1620.634765625, z: 112.49006652832031 },
      n = [
        {
          factionId: 11,
          coord: {
            x: 458.8349914550781,
            y: -1007.9417114257812,
            z: 28.266582489013672,
          },
        },
        {
          factionId: 23,
          coord: {
            x: -2431.684326171875,
            y: 3305.739501953125,
            z: 32.977813720703125,
          },
        },
        {
          factionId: 24,
          coord: {
            x: 340.53485107421875,
            y: -563.5487060546875,
            z: 28.743427276611328,
          },
        },
        {
          factionId: 25,
          coord: {
            x: 120.95563507080078,
            y: -748.4500732421875,
            z: 33.230045318603516,
          },
        },
        {
          factionId: 26,
          coord: {
            x: -442.5070495605469,
            y: 5996.07080078125,
            z: 31.490110397338867,
          },
        },
        {
          factionId: 28,
          coord: {
            x: -630.6815185546875,
            y: -99.1999282836914,
            z: 38.055049896240234,
          },
        },
      ];
    let s = [];
    function p() {
      n.forEach((e) => {
        const t = mp.colshapes.newSphere(e.coord.x, e.coord.y, e.coord.z, 1);
        (t.unloadFaction = e.factionId), s.push(t);
        const a = mp.markers.new(
          1,
          new mp.Vector3(e.coord.x, e.coord.y, e.coord.z - 1),
          1,
          { color: [0, 255, 0, 100] }
        );
        s.push(a);
        const i = mp.labels.new(
          "Разгрузка материалов/медикоментов",
          new mp.Vector3(e.coord.x, e.coord.y, e.coord.z + 1),
          { drawDistance: 20, color: [0, 255, 0, 200] }
        );
        s.push(i);
        const o = mp.blips.new(50, e.coord, {
          name: "Разгрузка материалов/медикоментов",
          scale: 0.8,
          shortRange: !0,
          color: 3,
        });
        s.push(o);
      });
    }
    mp.events.add({
      cDeliverInitArmy: () => {
        p();
        const e = mp.colshapes.newSphere(a.x, a.y, a.z, 1);
        (e.boxType = "materialBox"), s.push(e);
        const t = mp.markers.new(1, new mp.Vector3(a.x, a.y, a.z - 1), 1, {
          color: [0, 255, 0, 100],
        });
        s.push(t);
        const i = mp.labels.new(
          "Погрузка материалов",
          new mp.Vector3(a.x, a.y, a.z + 1),
          { drawDistance: 20, color: [0, 255, 0, 200] }
        );
        s.push(i);
        const n = mp.blips.new(478, a, {
          name: "Погрузка материалов",
          color: 4,
          scale: 1,
          shortRange: !0,
        });
        s.push(n);
        const m = mp.colshapes.newSphere(o.x, o.y, o.z, 1);
        (m.boxType = "productBox"), s.push(m);
        const d = mp.markers.new(1, new mp.Vector3(o.x, o.y, o.z - 1), 1, {
          color: [0, 255, 0, 100],
        });
        s.push(d);
        const c = mp.labels.new(
          "Погрузка продуктов",
          new mp.Vector3(o.x, o.y, o.z + 1),
          { drawDistance: 40, color: [0, 255, 0, 200] }
        );
        s.push(c);
        const _ = mp.blips.new(1, o, {
          name: "Погрузка продуктов",
          scale: 1,
          shortRange: !0,
        });
        s.push(_);
        const u = mp.colshapes.newSphere(r.x, r.y, r.z, 1);
        (u.productArmyPut = !0), s.push(u);
        const h = mp.markers.new(1, new mp.Vector3(r.x, r.y, r.z - 1), 1, {
          color: [0, 255, 0, 100],
        });
        s.push(h);
        const y = mp.labels.new(
          "Разгрузка продуктов",
          new mp.Vector3(r.x, r.y, r.z + 1),
          { drawDistance: 40, color: [0, 255, 0, 200] }
        );
        s.push(y);
        const b = mp.blips.new(1, r, {
          name: "Разгрузка продуктов",
          scale: 1,
          shortRange: !0,
        });
        s.push(b);
        const I = mp.blips.new(1, l, {
          name: "Погрузка топлива",
          scale: 1,
          shortRange: !0,
        });
        s.push(I);
        const x = mp.colshapes.newSphere(l.x, l.y, l.z, 5);
        (x.armyFuelTake = !0), s.push(x);
        const f = mp.markers.new(1, new mp.Vector3(l.x, l.y, l.z - 1), 5, {
          color: [0, 255, 0, 100],
        });
        s.push(f);
        const P = mp.labels.new(
          "Погрузка топлива",
          new mp.Vector3(l.x, l.y, l.z + 1),
          { drawDistance: 20, color: [0, 255, 0, 200] }
        );
        s.push(P);
      },
      cDeliverInitEms: () => {
        p();
        const e = mp.colshapes.newSphere(i.x, i.y, i.z, 1);
        (e.boxType = "medecineBox"), s.push(e);
        const t = mp.markers.new(1, new mp.Vector3(i.x, i.y, i.z - 1), 1, {
          color: [0, 255, 0, 100],
        });
        s.push(t);
        const a = mp.labels.new(
          "Погрузка медикаментов",
          new mp.Vector3(i.x, i.y, i.z + 1),
          { drawDistance: 20, color: [0, 255, 0, 200] }
        );
        s.push(a);
        const o = mp.blips.new(403, i, {
          name: "Погрузка медикаментов",
          color: 4,
          scale: 1,
          shortRange: !0,
        });
        s.push(o);
      },
      cDeliverDestroy: () => {
        s.forEach((e) => e.destroy()), (s = []), (eKeyHandler = {});
      },
    });
  },
  function (e, t) {
    const a = [
      {
        id: 1,
        position: {
          x: -523.9959106445312,
          y: 5311.0966796875,
          z: 88.19728088378906,
        },
        range: 50,
        rotation: 70,
      },
      {
        id: 2,
        position: {
          x: 532.6117553710938,
          y: -3201.18359375,
          z: 14.388376235961914,
        },
        range: 90,
        rotation: 0,
      },
      {
        id: 3,
        position: {
          x: 1028.4508056640625,
          y: 2342.603759765625,
          z: 49.4542350769043,
        },
        range: 140,
        rotation: 0,
      },
    ];
    let i = null,
      o = null,
      r = null,
      l = null,
      n = null,
      s = [],
      p = [];
    function m() {
      let e = r,
        t = o,
        a = l,
        i = {
          x: mp.players.local.position.x,
          y: mp.players.local.position.y,
          z: mp.players.local.position.z,
        },
        n = Math.sqrt(1.2 * e * (1.2 * e) + ((1.2 * e) / 2) * ((1.2 * e) / 2)),
        s = (t + 45) * (Math.PI / 180),
        p = { x: a.x + n * Math.cos(s), y: a.y + n * Math.sin(s) };
      s = (t + 135) * (Math.PI / 180);
      let m = { x: a.x + n * Math.cos(s), y: a.y + n * Math.sin(s) };
      s = (t + 225) * (Math.PI / 180);
      let d = { x: a.x + n * Math.cos(s), y: a.y + n * Math.sin(s) };
      s = (t + 315) * (Math.PI / 180);
      let c = { x: a.x + n * Math.cos(s), y: a.y + n * Math.sin(s) };
      return !!(function (e, t) {
        let a = e[0],
          i = e[1],
          o = !1;
        for (let e = 0, r = t.length - 1; e < t.length; r = e++) {
          let l = t[e][0],
            n = t[e][1],
            s = t[r][0],
            p = t[r][1];
          n > i != p > i && a < ((s - l) * (i - n)) / (p - n) + l && (o = !o);
        }
        return o;
      })(
        [i.x, i.y],
        [
          [p.x, p.y],
          [m.x, m.y],
          [d.x, d.y],
          [c.x, c.y],
        ]
      );
    }
    function d() {
      i && i.destroy(),
        (i = null),
        (o = null),
        (r = null),
        (l = null),
        clearInterval(n),
        (n = null);
    }
    function c(e, t) {
      let a = 0;
      return (a = "null" === e ? 0 : e === t ? 2 : 1);
    }
    function _(e) {
      const t = a.find((t) => t.id === e);
      (i = mp.blips.new(5, t.position, {
        scale: 1,
        color: 1,
        alpha: 200,
        shortRange: !0,
        radius: t.range,
      })),
        (o = t.rotation),
        (r = t.range),
        (l = t.position);
    }
    function u(e, t) {
      "prepare" === t
        ? _(e)
        : "end" === t || "conquered" === t || "neutral" === t
        ? d()
        : "attack" === t && (i || _(e), i.setFlashes(!0));
    }
    mp.events.add({
      render: () => {
        i && i.setRotation(o);
      },
      "cBizWar-init": (e, t, a, o) => {
        e.forEach((e) => {
          const a = mp.colshapes.newSphere(e.coord.x, e.coord.y, e.coord.z, 1);
          (a.bizWarId = e.id), s.push(a);
          const i = mp.markers.new(
            1,
            new mp.Vector3(e.coord.x, e.coord.y, e.coord.z - 1),
            1,
            { color: [0, 255, 0, 100] }
          );
          s.push(i);
          const o = mp.labels.new(
            e.title,
            new mp.Vector3(e.coord.x, e.coord.y, e.coord.z + 1),
            { drawDistance: 20, color: [0, 255, 0, 200] }
          );
          s.push(o);
          let r = c(e.owner, t);
          const l = mp.blips.new(108, e.coord, {
            name: "Захват бизнеса",
            scale: 0.7,
            shortRange: !0,
            color: r,
          });
          p.push({ id: e.id, blip: l }), s.push(l);
        }),
          a &&
            o &&
            ("attack" !== o || i ? u(a, o) : (u(a, "prepare"), u(a, "attack")));
      },
      "cBizWar-destroy": () => {
        s.forEach((e) => e.destroy()),
          i && d(),
          (s = []),
          (p = []),
          (eKeyHandler = {});
      },
      "cBizWar-updateZone": (e, t) => {
        u(e, t);
      },
      "cBizWar-checkPlayerZone": () => {
        m() &&
          (mp.events.callRemote("sBizWar-insideZone"),
          (n = setInterval(() => {
            m() ||
              (clearInterval(n),
              (n = null),
              mp.events.callRemote("sBizWar-leaveCapture"));
          }, 1e3)));
      },
      "cBizWar-updateBlip": (e, t, a) => {
        const i = p.find((t) => t.id === e);
        i && i.blip.setColour(c(t, a));
      },
    });
  },
  function (e, t) {
    const a = [
      { id: 0, x: -1157.191162109375, y: 4571.03564453125 },
      { id: 1, x: -599.7256469726562, y: 4559.23681640625 },
      { id: 2, x: 3283.3017578125, y: 5903.8798828125 },
      { id: 3, x: 3433.2275390625, y: 5496.72998046875 },
      { id: 4, x: 2275.734130859375, y: 2166.685546875 },
      { id: 5, x: -450.80633544921875, y: 1591.6915283203125 },
      { id: 6, x: 2782.934814453125, y: -575.827392578125 },
      { id: 7, x: 1760.6124267578125, y: -2604.258056640625 },
      { id: 8, x: 1040.279541015625, y: -3032.786376953125 },
    ];
    function i(e, t = 25) {
      const i = a.find((t) => t.id === e);
      misc.createNativeBlip(i.x, i.y, 25, 9, 1);
    }
    mp.events.add({
      "cContraband-Create": (e) => {
        misc.clearNativeBlips(9), i(e, 25);
      },
      "cContraband-RemoveZone": () => {
        misc.clearNativeBlips(9);
      },
      "cContraband-CreateArmyBlip": (e) => {
        misc.clearNativeBlips(9),
          i(e, 100),
          setTimeout(() => {
            misc.clearNativeBlips(9);
          }, 12e5);
      },
    });
  },
  function (e, t) {
    const a = [
        { x: 2218.621337890625, y: 5614.28369140625, z: 54.71222686767578 },
        { x: 5401.46826171875, y: -5171.87890625, z: 31.392414093017578 },
      ],
      i = [
        { x: 2195.997802734375, y: 5604.875, z: 53.51081848144531 },
        { x: 5404.95361328125, y: -5229.69677734375, z: 34.87718200683594 },
      ];
    let o = [],
      r = [];
    const l = [
        [
          [2209.42, 5580.54],
          [2209.61, 5575.31],
          [2239.5, 5572.95],
          [2240.18, 5578.86],
        ],
        [
          [5368.86, -5212.4],
          [5330.46, -5250.44],
          [5385.45, -5297.82],
          [5417.82, -5251.82],
        ],
      ],
      n = [
        {
          type: "main",
          coord: [
            [2200.55, 5608.03],
            [2193.6, 5608.89],
            [2189.57, 5593.78],
            [2196.51, 5592.1],
          ],
        },
        {
          type: "island",
          coord: [
            [5398.78, -5196.4],
            [5391.43, -5205.93],
            [5419, -5227.89],
            [5426.89, -5217.6],
          ],
        },
        {
          type: "island",
          coord: [
            [5402.34, -5216.61],
            [5395.03, -5226.91],
            [5410.84, -5238.9],
            [5418.64, -5228.79],
          ],
        },
      ];
    mp.events.add({
      "cDrugFarm-CreateFarms": () => {
        a.forEach((e) => {
          const t = mp.colshapes.newSphere(e.x, e.y, e.z, 1);
          t.farmStore = !0;
          const a = mp.blips.new(496, e, {
            name: "Ферма марихуаны",
            color: 52,
            scale: 1,
            shortRange: !0,
          });
          r.push(t, a);
        }),
          i.forEach((e) => {
            const t = mp.labels.new(
              "Место для просушивания марихуаны",
              new mp.Vector3(e.x, e.y, e.z + 1),
              { drawDistance: 20, color: [0, 255, 0, 200] }
            );
            r.push(t);
          });
      },
      "cDrugFarm-DestroyFarms": () => {
        for (const e of r) e.destroy();
        (r = []), (eKeyHandler = {});
      },
      "cDrugFarm-addBush": (e) => {
        o.push(e);
      },
      "cDrugFarm-prepareInteract": (e, t) => {
        let a = o.find((t) => t.id === e);
        a &&
          ((a.shape = mp.colshapes.newSphere(
            a.position.x,
            a.position.y,
            a.position.z,
            1
          )),
          (a.shape.bushId = a.id),
          (a.marker = mp.markers.new(
            1,
            new mp.Vector3(a.position.x, a.position.y, a.position.z - 1),
            1,
            { color: [0, 255, 0, 100] }
          )),
          (a.interact = t));
      },
      "cDrugFarm-interact": (e) => {
        let t = o.find((t) => t.id === e);
        t &&
          ("fertilize" === t.interact
            ? mp.events.callRemote("sDrugFarm-fertilize", e)
            : "collect" === t.interact
            ? mp.events.callRemote("sDrugFarm-collect", e)
            : "collectDryWeed" === t.interact &&
              mp.events.callRemote("sDrugFarm-collectDryWeed", e));
      },
      "cDrugFarm-destroyMarker": (e) => {
        let t = o.find((t) => t.id === e);
        t &&
          (t.marker.destroy(),
          t.shape.destroy(),
          (t.marker = null),
          (t.shape = null));
      },
      "cDrugFarm-Plant": (e) => {
        if (!localplayer.vehicle) {
          for (let t = 0, a = l.length; t < a; t++) {
            const a = l[t];
            if (
              misc.isPointInPolygon(
                localplayer.position.x,
                localplayer.position.y,
                a
              )
            )
              return mp.events.callRemote("sDrugFarm-Plant", e);
          }
          misc.notif("Здесь нельзя посадить марихуану", "error");
        }
      },
      "cDrugFarm-Dry": (e) => {
        if (!localplayer.vehicle) {
          for (let t = 0, a = n.length; t < a; t++) {
            const a = n[t];
            if (
              misc.isPointInPolygon(
                localplayer.position.x,
                localplayer.position.y,
                a.coord
              )
            )
              return mp.events.callRemote("sDrugFarm-Dry", e, a.type);
          }
          misc.notif("Здесь нельзя просушить марихуану", "error");
        }
      },
    });
  },
  function (e, t) {
    function a(e) {
      return i.find((t) => t.id === e);
    }
    let i = [],
      o = [];
    mp.events.add({
      render: () => {
        for (let e = 0, t = i.length; e < t; e++) i[e].render();
      },
      "cGangWar-CreateZones": (e) => {
        e.forEach((e) => {
          if (
            (i.push(
              new (class {
                constructor(e, t, a, i, o, r, l) {
                  this._setup(e, t, a, i, o, r, l);
                }
                _setup(e, t, a, i, o, r, l) {
                  (this.id = e),
                    (this.range = i),
                    (this.color = o),
                    (this.position = { x: t, y: a }),
                    (this.rotation = r),
                    (this.blip = null),
                    (this._colshape = null),
                    this._timerCheck,
                    this.loadArea(l);
                }
                loadArea(e) {
                  (this._colshape = mp.colshapes.newCircle(
                    this.position.x,
                    this.position.y,
                    1.5 * this.range
                  )),
                    (this._colshape.turfId = this.id),
                    (this.blip = mp.blips.new(5, this.position, {
                      scale: 1,
                      color: this.color,
                      alpha: 200,
                      shortRange: !0,
                      radius: this.range,
                    })),
                    o.push(this._colshape, this.blip),
                    "attack" === e
                      ? (this.blip.setFlashes(!0), this.blip.setColour(1))
                      : "prepare" === e && this.blip.setColour(1);
                }
                render() {
                  this.blip && this.blip.setRotation(this.rotation);
                }
                updateArea(e, t) {
                  "attack" == e
                    ? this.blip.setFlashes(!0)
                    : "normal" === e
                    ? this.blip.setFlashes(!1)
                    : "conquered" === e
                    ? (this.blip.setFlashes(!1), this.blip.setColour(t))
                    : "prepare" === e && this.blip.setColour(t);
                }
                check() {
                  this.isInsideArea() ||
                    (clearInterval(this._timerCheck),
                    mp.events.callRemote("sGangWar-leaveCapture"));
                }
                enter() {
                  this._timerCheck = setInterval(() => {
                    this.check();
                  }, 1e3);
                }
                isInsideArea() {
                  let e = {
                    x: mp.players.local.position.x,
                    y: mp.players.local.position.y,
                    z: mp.players.local.position.z,
                  };
                  var t = Math.sqrt(
                    1.2 * this.range * (1.2 * this.range) +
                      ((1.2 * this.range) / 2) * ((1.2 * this.range) / 2)
                  );
                  let a = (this.rotation + 45) * (Math.PI / 180),
                    i = {
                      x: this.position.x + t * Math.cos(a),
                      y: this.position.y + t * Math.sin(a),
                    };
                  a = (this.rotation + 135) * (Math.PI / 180);
                  let o = {
                    x: this.position.x + t * Math.cos(a),
                    y: this.position.y + t * Math.sin(a),
                  };
                  a = (this.rotation + 225) * (Math.PI / 180);
                  let r = {
                    x: this.position.x + t * Math.cos(a),
                    y: this.position.y + t * Math.sin(a),
                  };
                  a = (this.rotation + 315) * (Math.PI / 180);
                  let l = {
                    x: this.position.x + t * Math.cos(a),
                    y: this.position.y + t * Math.sin(a),
                  };
                  return !!(function (e, t) {
                    let a = e[0],
                      i = e[1],
                      o = !1;
                    for (let e = 0, r = t.length - 1; e < t.length; r = e++) {
                      let l = t[e][0],
                        n = t[e][1],
                        s = t[r][0],
                        p = t[r][1];
                      n > i != p > i &&
                        a < ((s - l) * (i - n)) / (p - n) + l &&
                        (o = !o);
                    }
                    return o;
                  })(
                    [e.x, e.y],
                    [
                      [i.x, i.y],
                      [o.x, o.y],
                      [r.x, r.y],
                      [l.x, l.y],
                    ]
                  );
                }
              })(
                e.id,
                e.blipData.x,
                e.blipData.y,
                e.blipData.range,
                e.zoneColor,
                e.blipData.rotation,
                e.state
              )
            ),
            !e.capturePosition)
          )
            return;
          const t = mp.colshapes.newSphere(
            e.capturePosition.x,
            e.capturePosition.y,
            e.capturePosition.z,
            1
          );
          (t.startCaptureId = e.id), o.push(t);
          const a = mp.markers.new(
            1,
            new mp.Vector3(
              e.capturePosition.x,
              e.capturePosition.y,
              e.capturePosition.z - 1
            ),
            1,
            { color: [0, 255, 0, 100] }
          );
          o.push(a);
          const r = mp.labels.new(
            `Захватить территорию №${e.id}`,
            new mp.Vector3(
              e.capturePosition.x,
              e.capturePosition.y,
              e.capturePosition.z + 1
            ),
            { drawDistance: 20, color: [0, 255, 0, 200] }
          );
          o.push(r);
          const l = mp.blips.new(119, e.capturePosition, {
            name: "Захват территории",
            color: 1,
            scale: 0.7,
            shortRange: !0,
          });
          o.push(l);
        });
      },
      "cGangWar-DestroyZones": () => {
        o.forEach((e) => e.destroy()), (o = []), (i = []), (eKeyHandler = {});
      },
      "cGangWar-UpdateZone": (e, t, i) => {
        const o = a(e);
        o && o.updateArea(t, i);
      },
      "cGangWar-checkPlayerInsideTurf": (e) => {
        const t = a(e);
        t.isInsideArea() &&
          (mp.events.callRemote("sGangWar-insideTurf"), t.enter());
      },
    });
  },
  function (e) {
    e.exports = [
      0, 1356, 2108, 2992, 4089, 4090, 4137, 4138, 4153, 4154, 4169, 4170, 4185,
      4186, 5232, 6286, 6442, 10706, 11174, 11816, 12844, 14201, 16335, 17188,
      17719, 18905, 19336, 20178, 20279, 20623, 20781, 21550, 22711, 23553,
      23639, 24806, 24816, 24817, 24818, 25260, 26610, 26611, 26612, 26613,
      26614, 27474, 28252, 28422, 29868, 31086, 35502, 35731, 36029, 36864,
      37119, 37193, 39317, 40269, 43536, 43810, 45509, 45750, 46078, 46240,
      47419, 47495, 49979, 51826, 52301, 56604, 57005, 57597, 57717, 58271,
      58331, 58866, 58867, 58868, 58869, 58870, 60309, 61007, 61163, 61839,
      63931, 64016, 64017, 64064, 64065, 64080, 64081, 64096, 64097, 64112,
      64113, 64729, 65068, 65245,
    ];
  },
  function (e, t, a) {
    const i = cc.weaponConfig,
      o = a(17),
      r = a(54),
      l = {
        PistolAttachmentPos: new mp.Vector3(0.02, 0.06, 0.1),
        PistolAttachmentRot: new mp.Vector3(-100, 0, 0),
        SMGAttachmentPos: new mp.Vector3(0.08, 0.03, -0.1),
        SMGAttachmentRot: new mp.Vector3(-80.77, 0, 0),
        ShotgunAttachmentPos: new mp.Vector3(-0.1, -0.15, 0.11),
        ShotgunAttachmentRot: new mp.Vector3(-180, 0, 0),
        RifleAttachmentPos: new mp.Vector3(-0.1, -0.15, -0.13),
        RifleAttachmentRot: new mp.Vector3(0, 0, 3.5),
      };
    (mp.attachmentMngr = {
      attachments: {},
      addFor: async function (e, t) {
        if (this.attachments.hasOwnProperty(t)) {
          if (
            (e.__attachmentObjects || (e.__attachmentObjects = {}),
            !e.__attachmentObjects.hasOwnProperty(t))
          ) {
            let a = this.attachments[t];
            if (!mp.game.streaming.hasModelLoaded(a.model))
              for (
                mp.game.streaming.requestModel(a.model);
                !mp.game.streaming.hasModelLoaded(a.model);

              )
                await misc.sleep();
            let i = mp.objects.new(a.model, e.position, {
              dimension: localplayer.dimension,
            });
            (i.__attMgrData = {
              targetEntity: e.handle,
              bone:
                "string" == typeof a.boneName
                  ? e.getBoneIndexByName(a.boneName)
                  : e.getBoneIndex(a.boneName),
              offset: a.offset,
              rotation: a.rotation,
            }),
              (i.notifyStreaming = !0),
              (e.__attachmentObjects[t] = i);
          }
        } else
          mp.game.graphics.notify(
            `Static Attachments Error: ~r~Unknown Attachment Used: ~w~${t}`
          ),
            console.error("attach ID:", t),
            console.error("attachments list", this.attachments);
      },
      removeFor: function (e, t) {
        if (
          (e.__attachmentObjects || (e.__attachmentObjects = {}),
          e.__attachmentObjects.hasOwnProperty(t))
        ) {
          let a = e.__attachmentObjects[t];
          delete e.__attachmentObjects[t], mp.objects.exists(a) && a.destroy();
        }
      },
      initFor: function (e) {
        for (let t of e.__attachments) mp.attachmentMngr.addFor(e, t);
      },
      shutdownFor: function (e) {
        for (let t in e.__attachmentObjects) mp.attachmentMngr.removeFor(e, t);
      },
      register: function (e, t, a, i, o) {
        "string" == typeof e && (e = mp.game.joaat(e)),
          "string" == typeof t && (t = mp.game.joaat(t)),
          this.attachments.hasOwnProperty(e)
            ? mp.game.graphics.notify(
                "Static Attachments Error: ~r~Duplicate Entry"
              )
            : mp.game.streaming.isModelInCdimage(t)
            ? (this.attachments[e] = {
                id: e,
                model: t,
                offset: i,
                rotation: o,
                boneName: a,
              })
            : mp.game.graphics.notify(
                `Static Attachments Error: ~r~Invalid Model (0x${t.toString(
                  16
                )})`
              );
      },
      unregister: function (e) {
        "string" == typeof e && (e = mp.game.joaat(e)),
          this.attachments.hasOwnProperty(e) && (this.attachments[e] = void 0);
      },
      addLocal: function (e) {
        "string" == typeof e && (e = mp.game.joaat(e)),
          mp.events.callRemote("staticAttachments.Add", e.toString(36));
      },
      removeLocal: function (e) {
        "string" == typeof e && (e = mp.game.joaat(e)),
          mp.events.callRemote("staticAttachments.Remove", e.toString(36));
      },
      getAttachments: function () {
        return Object.assign({}, this.attachments);
      },
    }),
      mp.events.add("entityStreamIn", (e) => {
        if (e.__attMgrData) {
          const {
            targetEntity: t,
            bone: a,
            offset: i,
            rotation: o,
          } = e.__attMgrData;
          e.attachTo(t, a, i.x, i.y, i.z, o.x, o.y, o.z, !1, !1, !1, !1, 2, !0);
        }
        e.__attachments && mp.attachmentMngr.initFor(e);
      }),
      mp.events.add("entityStreamOut", (e) => {
        e.__attachmentObjects && mp.attachmentMngr.shutdownFor(e);
      }),
      mp.events.add({
        cAttachmentTest: (e) => {
          const t = misc.getRandomInt(0, 999999999);
          mp.attachmentMngr.register(
            t,
            e.model,
            e.bone,
            { x: e.offX, y: e.offY, z: e.offZ },
            { x: e.rotX, y: e.rotY, z: e.rotZ }
          ),
            mp.attachmentMngr.addLocal(t);
        },
        cAttachmentTestStart: (e) => {
          if (localplayer.attachTest) return misc.notif("Тест уже включен");
          const t = misc.getRandomInt(0, 999999999);
          mp.attachmentMngr.register(
            t,
            e,
            r[0],
            { x: 0, y: 0, z: 0 },
            { x: 0, y: 0, z: 0 }
          ),
            mp.attachmentMngr.addLocal(t),
            (localplayer.attachTest = { model: e, index: 0, currentId: t });
        },
        cAttachmentTestEnd: (e) => {
          localplayer.attachTest &&
            mp.attachmentMngr.removeLocal(localplayer.attachTest.currentId),
            (localplayer.attachTest = !1);
        },
        cAttachmentTestChangeBone: (e) => {
          if (!localplayer.attachTest) return;
          let t = 0;
          e
            ? (t = localplayer.attachTest.index + 1) > r.length - 1 && (t = 0)
            : (t = localplayer.attachTest.index - 1) < 0 && (t = r.length - 1);
          const a = misc.getRandomInt(0, 999999999);
          mp.attachmentMngr.register(
            a,
            localplayer.attachTest.model,
            r[t],
            { x: 0, y: 0, z: 0 },
            { x: 0, y: 0, z: 0 }
          ),
            mp.attachmentMngr.addLocal(a),
            mp.attachmentMngr.removeLocal(localplayer.attachTest.currentId),
            (localplayer.attachTest.index = t),
            (localplayer.attachTest.currentId = a),
            misc.notif(`bone: ${r[t]} index: ${t}`);
        },
      }),
      mp.events.addDataHandler("attachmentsData", (e, t) => {
        let a = t.length > 0 ? t.split("|").map((e) => parseInt(e, 36)) : [];
        if (0 !== e.handle) {
          let t = e.__attachments;
          t || ((t = []), (e.__attachmentObjects = {}));
          for (let i of t)
            -1 === a.indexOf(i) && mp.attachmentMngr.removeFor(e, i);
          for (let i of a)
            -1 === t.indexOf(i) && mp.attachmentMngr.addFor(e, i);
        }
        e.__attachments = a;
      }),
      mp.players.forEach((e) => {
        let t = e.getVariable("attachmentsData");
        if (t && t.length > 0) {
          let a = t.split("|").map((e) => parseInt(e, 36));
          (e.__attachments = a), (e.__attachmentObjects = {});
        } else e.__attachmentObjects = {};
      });
    for (let e in i)
      i[e].AttachBone &&
        mp.attachmentMngr.register(
          parseInt(e),
          i[e].AttachModel,
          i[e].AttachBone,
          l[i[e].AttachPosition],
          l[i[e].AttachRotation]
        );
    for (let e in o)
      o[e].isAttached &&
        mp.attachmentMngr.register(
          parseInt(e),
          o[e].model,
          o[e].bone,
          new mp.Vector3(o[e].attachPos.x, o[e].attachPos.y, o[e].attachPos.z),
          new mp.Vector3(o[e].attachRot.x, o[e].attachRot.y, o[e].attachRot.z)
        );
    mp.attachmentMngr.register(
      "handcuffs",
      "p_cs_cuffs_02_s",
      18905,
      new mp.Vector3(0, 0, 0.05),
      new mp.Vector3(0, 80, 0)
    ),
      mp.attachmentMngr.register(
        "contrabandMatsBox",
        "prop_box_ammo04a",
        28422,
        new mp.Vector3(0, -0.2, -0.1),
        new mp.Vector3(-20, 0, 0)
      ),
      mp.attachmentMngr.register(
        "toolBox",
        "prop_box_ammo04a",
        28422,
        new mp.Vector3(0, -0.2, -0.1),
        new mp.Vector3(-20, 0, 0)
      ),
      mp.attachmentMngr.register(
        "drugBox",
        "prop_mp_drug_package",
        28422,
        new mp.Vector3(0, -0.05, -0.02),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "medecineBox",
        "v_serv_abox_04",
        28422,
        new mp.Vector3(0, 0, -0.19),
        new mp.Vector3(0, 0, 90)
      ),
      mp.attachmentMngr.register(
        "materialBox",
        "gr_prop_gr_crate_pistol_02a",
        28422,
        new mp.Vector3(0, -0.08, -0.17),
        new mp.Vector3(0, 0, 90)
      ),
      mp.attachmentMngr.register(
        "productBox",
        "hei_prop_heist_box",
        28422,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "docsGive",
        "bkr_prop_fakeid_singlepassport",
        4090,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 100)
      ),
      mp.attachmentMngr.register(
        "docsWatch",
        "bkr_prop_fakeid_openpassport",
        36029,
        new mp.Vector3(0.02, 0.05, 0.04),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "radioTalk",
        "prop_cs_walkie_talkie",
        4089,
        new mp.Vector3(0.07, 0, -0.02),
        new mp.Vector3(-90, 0, -20)
      ),
      mp.attachmentMngr.register(
        "openPhone",
        "prop_npc_phone_02",
        64016,
        new mp.Vector3(0.04, -0.04, 0),
        new mp.Vector3(120, 130, 350)
      ),
      mp.attachmentMngr.register(
        "drinkBottle",
        "prop_cs_beer_bot_01",
        64064,
        new mp.Vector3(0, 0.05, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "passportGive",
        "prop_casey_sec_id",
        4090,
        new mp.Vector3(0.05, -0.04, 0.01),
        new mp.Vector3(180, 0, 0)
      ),
      mp.attachmentMngr.register(
        "passportWatch",
        "prop_casey_sec_id",
        4090,
        new mp.Vector3(0.02, 0, -0.02),
        new mp.Vector3(-60, -140, 180)
      ),
      mp.attachmentMngr.register(
        "getKnife",
        "prop_knife",
        28422,
        new mp.Vector3(0.05, 0.1, 0),
        new mp.Vector3(10, 0, 0)
      ),
      mp.attachmentMngr.register(
        "getBinBag",
        "ng_proc_binbag_01a",
        28422,
        new mp.Vector3(0.4, -0.15, 0.02),
        new mp.Vector3(110, 60, 180)
      ),
      mp.attachmentMngr.register(
        "getBinBag2",
        "ng_proc_binbag_01a",
        28422,
        new mp.Vector3(0.15, -0.35, 0.1),
        new mp.Vector3(120, 40, 160)
      ),
      mp.attachmentMngr.register(
        "getBox",
        "v_serv_abox_02",
        28422,
        new mp.Vector3(0, -0.07, -0.04),
        new mp.Vector3(0, 180, 90)
      ),
      mp.attachmentMngr.register(
        "pliers",
        "prop_pliers_01",
        28422,
        new mp.Vector3(0.14, 0, -0.02),
        new mp.Vector3(120, 90, 0)
      ),
      mp.attachmentMngr.register(
        "farmShovel",
        "prop_cs_trowel",
        58867,
        new mp.Vector3(0, 0.05, -0.05),
        new mp.Vector3(-150, 0, 50)
      ),
      mp.attachmentMngr.register(
        "farmBasket",
        "prop_fruit_basket",
        57005,
        new mp.Vector3(0.28, -0.2, -0.03),
        new mp.Vector3(5, -90, -20)
      ),
      mp.attachmentMngr.register(
        "cigarette",
        "prop_cs_ciggy_01b",
        28422,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "tablet",
        "prop_cs_tablet",
        4186,
        new mp.Vector3(0.1, -0.03, 0),
        new mp.Vector3(0, -65, 0)
      ),
      mp.attachmentMngr.register(
        "smokeWeed",
        "p_cs_joint_01",
        4186,
        new mp.Vector3(0.02, -0.01, 0.01),
        new mp.Vector3(0, -100, 0)
      ),
      mp.attachmentMngr.register(
        "moneyCarry",
        "prop_money_bag_01",
        28422,
        new mp.Vector3(0.03, 0.02, -0.45),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "fishing",
        "prop_fishing_rod_01",
        60309,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "certificate",
        "p_ld_id_card_002",
        64016,
        new mp.Vector3(0.07, 0, -0.04),
        new mp.Vector3(0, 90, 30)
      ),
      mp.attachmentMngr.register(
        "shovel",
        "prop_ld_shovel",
        28422,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "pen",
        "bkr_prop_fakeid_pen_01a",
        64113,
        new mp.Vector3(-0.03, 0.07, 0.06),
        new mp.Vector3(40, 0, 30)
      ),
      mp.attachmentMngr.register(
        "notepad",
        "prop_notepad_01",
        26614,
        new mp.Vector3(0.07, 0, 0.07),
        new mp.Vector3(60, 0, 0)
      ),
      mp.attachmentMngr.register(
        "guitar",
        "prop_acc_guitar_01",
        60309,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "micro",
        "p_ing_microphonel_01",
        28422,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "signaling",
        "lr_prop_carkey_fob",
        64097,
        new mp.Vector3(0, 0.01, 0.02),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "camera",
        "prop_v_cam_01",
        28422,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "tester",
        "p_inhaler_01_s",
        60309,
        new mp.Vector3(0, 0, 0),
        new mp.Vector3(0, 0, 0)
      ),
      mp.attachmentMngr.register(
        "moneyGive",
        "p_banknote_onedollar_s",
        64096,
        new mp.Vector3(0.03, -0.01, 0.015),
        new mp.Vector3(0, 0, 20)
      );
  },
  function (e, t) {
    let a,
      i,
      o,
      r,
      l,
      n = [],
      s = !1;
    function p() {
      do {
        a = misc.getRandomInt(0, n.length - 1);
      } while (a === s);
      const e = n[a].position;
      ((i = mp.colshapes.newSphere(e.x, e.y, e.z, 1)).electric = !0),
        (o = mp.markers.new(1, new mp.Vector3(e.x, e.y, e.z - 1), 1, {
          color: [0, 255, 0, 100],
        })),
        (r = mp.blips.new(1, e, {
          name: "Электрощиток",
          color: 46,
          scale: 1,
          shortRange: !1,
        })).setRoute(!0),
        !1 === s
          ? misc.notif("Направляйтесь к электрощитку")
          : misc.notif("Направляйтесь к следующему электрощитку");
    }
    function m(e, t) {
      (s = !1), (a = !1), (i = !1), (l = t), (n = e);
    }
    mp.events.add({
      cElectricShapeEnter: () => {
        let e = 0;
        (e = s
          ? misc.vdist(n[s].position, localplayer.position)
          : misc.vdist(l, localplayer.position)),
          (eKeyHandler = { fnc: "sElectricStartFix", id: e }),
          misc.notif('Нажмите "Е" для починки', "info");
      },
      cElectricRecoverJob: (e, t) => {
        m(e, t), p();
      },
      cElectricRemoveCheckpoint: () => {
        i && i.destroy(),
          o && o.destroy(),
          r && r.destroy(),
          (i = !1),
          (o = !1),
          (r = !1),
          (s = a);
      },
      cElectricNextCheckpoint: (e, t) => {
        e && m(e, t), p();
      },
    });
  },
  function (e, t) {
    var a = null;
    let i = [],
      o = null;
    const r = {
      x: 813.4002075195312,
      y: -2929.8447265625,
      z: 5.90700626373291,
    };
    (loadType = !1), (startUnload = !1);
    const l = [6, 10],
      n = {
        material: [
          { x: 1179.96875, y: -3262.9296875, z: 5.6173882484436035 },
          { x: 1179.58642578125, y: -3272.40673828125, z: 5.642843246459961 },
          {
            x: 1179.9180908203125,
            y: -3288.423583984375,
            z: 5.618948459625244,
          },
          {
            x: 1179.7371826171875,
            y: -3298.110107421875,
            z: 5.631801128387451,
          },
          {
            x: 1233.814697265625,
            y: -3330.774658203125,
            z: 5.6998820304870605,
          },
          { x: 1218.997802734375, y: -3331.326904296875, z: 5.731251239776611 },
          { x: 1206.7396240234375, y: -3331.48095703125, z: 5.745276927947998 },
          { x: 1191.025634765625, y: -3331.53125, z: 5.610354423522949 },
        ],
        ferm: [
          { x: 2352.2509765625, y: 4878.09521484375, z: 41.83024597167969 },
        ],
        auto: [
          { x: 1216.3800048828125, y: -2996.43701171875, z: 5.865358352661133 },
        ],
        product: [
          [
            { x: 895.4853515625, y: -2483.349365234375, z: 28.469690322875977 },
            { x: 902.860595703125, y: -2484.3095703125, z: 28.469989776611328 },
            {
              x: 909.8058471679688,
              y: -2484.64501953125,
              z: 28.475502014160156,
            },
            { x: 917.7275390625, y: -2485.46923828125, z: 28.488035202026367 },
            {
              x: 925.0233764648438,
              y: -2486.158935546875,
              z: 28.487884521484375,
            },
          ],
          [
            {
              x: 826.0132446289062,
              y: -1916.570068359375,
              z: 29.322664260864258,
            },
            {
              x: 828.0748901367188,
              y: -1905.1497802734375,
              z: 29.178144454956055,
            },
          ],
          [
            { x: 953.6885986328125, y: -2111.779296875, z: 30.55158233642578 },
            {
              x: 954.2916870117188,
              y: -2105.77294921875,
              z: 30.60080337524414,
            },
          ],
        ],
        fuel: [
          {
            x: 1685.3248291015625,
            y: -1556.1072998046875,
            z: 112.63130950927734,
          },
        ],
        oil: [
          { x: 603.4930419921875, y: 2923.16943359375, z: 40.68975830078125 },
        ],
      },
      s = {
        ferm: [
          { x: 778.59521484375, y: -2522.149658203125, z: 20.11591339111328 },
          { x: 842.110595703125, y: -1951.0316162109375, z: 28.9736328125 },
        ],
        oil: [
          {
            x: 1712.6187744140625,
            y: -1637.990478515625,
            z: 112.48442840576172,
          },
        ],
      },
      p = {
        auto: {
          x: 1216.3800048828125,
          y: -2996.43701171875,
          z: 5.865358352661133,
        },
        material: { x: 1179.96875, y: -3262.9296875, z: 5.6173882484436035 },
        fuel: {
          x: 1670.42041015625,
          y: -1620.634765625,
          z: 112.49006652832031,
        },
        product: {
          x: 854.5863037109375,
          y: -2183.573974609375,
          z: 30.666711807250977,
        },
      },
      m = {
        ferm: 68.32,
        oil: 25.088,
        fuel: 25.272,
        material: 27.86,
        product: 27.86,
        auto: 129.6,
      };
    var d, c, _, u, h, y;
    function b() {
      o &&
        (o.colshape.destroy(),
        o.marker.destroy(),
        o.blip.destroy(),
        (o = null));
    }
    function I() {
      a &&
        (a.marker.destroy(),
        a.colshape.destroy(),
        a.blip.destroy(),
        (a = null));
    }
    function x(e) {
      switch (e) {
        case mp.game.joaat("mule3"):
          return 0.1;
        case mp.game.joaat("pounder2"):
          return 0.05;
        case mp.game.joaat("oiltanker2"):
          return 0.035;
        default:
          return 0.3;
      }
    }
    mp.events.add({
      cTruckerStartTracker: (e, t, a, i, r, p = !1) => {
        let y = {};
        if ("product" === e) {
          const t = n[e],
            a = t[misc.getRandomInt(0, t.length - 1)];
          y = a[misc.getRandomInt(0, a.length - 1)];
        } else {
          const t = n[e];
          y = t[misc.getRandomInt(0, t.length - 1)];
        }
        let I = m[e];
        l.includes(t) && (I /= 1.42);
        let x = !1;
        if (i) x = i;
        else {
          const t = s[e];
          x = t[misc.getRandomInt(0, t.length - 1)];
        }
        const f = misc.vdist(y, x);
        let P = 0;
        return (
          (P =
            "auto" === e
              ? Math.round((f / 1e3) * I)
              : Math.round((f / 1e3) * (a / 1e3) * I)),
          r && (P /= 2),
          p ||
            mp.events.callRemote("sTruckerSetOrderPay", P, JSON.stringify(x)),
          (d = "Погрузка"),
          (c = 479),
          (_ = y),
          (u = 46),
          (h = 3),
          (e = e),
          b(),
          ((o = {}).colshape = mp.colshapes.newSphere(_.x, _.y, _.z, h)),
          (o.colshape.truckerLoadPoint = e),
          (o.marker = mp.markers.new(1, new mp.Vector3(_.x, _.y, _.z - 1), h, {
            color: [0, 255, 0, 100],
            visible: !0,
          })),
          (o.blip = mp.blips.new(c, new mp.Vector3(_.x, _.y, _.z), {
            name: d,
            color: u,
            shortRange: !1,
          })),
          void o.blip.setRoute(!0)
        );
      },
      cTruckerGoToEndPoint: (e) => {
        var t = JSON.parse(e);
        ((a = {}).marker = mp.markers.new(
          1,
          new mp.Vector3(t.x, t.y, t.z - 1),
          5,
          { color: [0, 255, 0, 100], visible: !0 }
        )),
          (a.colshape = mp.colshapes.newSphere(t.x, t.y, t.z, 5)),
          (a.colshape.truckUnload = !0),
          (a.blip = mp.blips.new(85, new mp.Vector3(t.x, t.y, t.z), {
            name: "Точка разгрузки",
            scale: 1,
            color: 46,
            shortRange: !1,
          })),
          a.blip.setRoute(!0),
          b();
      },
      cTruckerDestroyLoadPoint: () => {
        b();
      },
      cTruckerClearEndPoint: () => {
        I();
      },
      cTruckerCancelUnload: () => {
        (eKeyHandler = {}),
          startUnload && misc.injectCef("storage.cancelFillingGas(true);");
      },
      cTruckerInitEntities: () => {
        !(function (e, t, a, o, r, l) {
          const n = mp.colshapes.newSphere(a.x, a.y, a.z, r);
          n.truckerAction = l;
          const s = mp.markers.new(1, new mp.Vector3(a.x, a.y, a.z - 1), r, {
              color: [0, 255, 0, 100],
              visible: !0,
            }),
            p = mp.blips.new(t, new mp.Vector3(a.x, a.y, a.z), {
              name: e,
              color: o,
              shortRange: !0,
            }),
            m = mp.labels.new(e, new mp.Vector3(a.x, a.y, a.z + 1), {
              drawDistance: 20,
              color: [0, 255, 0, 200],
            });
          i.push(n), i.push(s), i.push(p), i.push(m);
        })("Cдача арендованного авто", 1, r, 46, 10, "returnTruck");
      },
      cTruckerDestroyEntities: () => {
        I(), i.forEach((e) => e.destroy()), (i = []), (eKeyHandler = {});
      },
      calcDelivery: (e, t, a, i) => {
        let o = 40;
        "auto" === e && (o = 60);
        const r = p[e],
          l = misc.vdist(r, localplayer.position);
        let n = 0;
        n =
          "auto" === e
            ? Math.round((l / 1e3) * o)
            : Math.round((l / 1e3) * (t / 1e3) * o);
        const s = {
          matType: e,
          matCount: t,
          matSum: a,
          data: JSON.parse(i),
          deliveryPrice: n,
        };
        return misc.injectCef(
          `storage.setBusinesDelivery(${JSON.stringify(s)});`
        );
      },
      cTruckerStartLoad: (e) => {
        const t = localplayer.vehicle;
        if (!t) return;
        loadType = e;
        const a = {
          type: "loadTrucker",
          title: "Погрузка",
          intervalValue: x(t.model),
        };
        let i = "storage.setProgress(true);";
        (i += `storage.setProgressData(${JSON.stringify(a)});`),
          misc.injectCef(i);
      },
      cTruckerLoadEnd: () => {
        mp.events.callRemote("sTruckerLoadetPoint", loadType), (loadType = !1);
      },
      cTruckerStartUnload: () => {
        startUnload = !0;
        const e = localplayer.vehicle;
        if (!e) return;
        const t = {
          type: "unloadTrucker",
          title: "Разгрузка",
          intervalValue: x(e.model),
        };
        let a = "storage.setProgress(true);";
        (a += `storage.setProgressData(${JSON.stringify(t)});`),
          misc.injectCef(a),
          (eKeyHandler = {});
      },
    });
  },
  function (e, t) {
    const a = [
        { x: 2018.8704833984375, y: 4939.3515625, z: 41.08865737915039 },
        { x: 2022.3153076171875, y: 4935.86376953125, z: 41.05463790893555 },
        { x: 2025.7996826171875, y: 4932.34814453125, z: 41.059913635253906 },
        { x: 2029.7127685546875, y: 4928.54736328125, z: 41.0740966796875 },
        { x: 2032.9383544921875, y: 4925.36181640625, z: 41.07356643676758 },
        { x: 2036.556640625, y: 4921.70849609375, z: 41.07986831665039 },
        { x: 2041.7059326171875, y: 4916.6728515625, z: 41.07347869873047 },
        { x: 2045.96923828125, y: 4912.72314453125, z: 41.06884765625 },
        { x: 2049.048583984375, y: 4909.81396484375, z: 41.069923400878906 },
        { x: 2052.721435546875, y: 4906.23681640625, z: 41.07972717285156 },
        { x: 2056.74267578125, y: 4902.1845703125, z: 41.079139709472656 },
        { x: 2059.96923828125, y: 4898.787109375, z: 41.096988677978516 },
        { x: 2063.31591796875, y: 4895.3310546875, z: 41.10253143310547 },
        { x: 2068.14111328125, y: 4890.35400390625, z: 41.07802200317383 },
        { x: 2068.969482421875, y: 4892.39306640625, z: 41.07395553588867 },
        { x: 2066.394775390625, y: 4895.2802734375, z: 41.078651428222656 },
        { x: 2062.5361328125, y: 4899.3212890625, z: 41.08989715576172 },
        { x: 2058.782958984375, y: 4903.16455078125, z: 41.091060638427734 },
        { x: 2053.92236328125, y: 4908.0341796875, z: 41.066009521484375 },
        { x: 2050.3349609375, y: 4911.4921875, z: 41.05382537841797 },
        { x: 2043.091796875, y: 4918.5458984375, z: 41.049217224121094 },
        { x: 2038.796630859375, y: 4922.60205078125, z: 41.09665298461914 },
        { x: 2035.13671875, y: 4926.15087890625, z: 41.104488372802734 },
        { x: 2031.541015625, y: 4929.72607421875, z: 41.104610443115234 },
        { x: 2028.171875, y: 4933.1318359375, z: 41.09761428833008 },
        { x: 2024.69482421875, y: 4936.6162109375, z: 41.075801849365234 },
        { x: 2020.56396484375, y: 4940.75390625, z: 41.047447204589844 },
        { x: 2022.5997314453125, y: 4942.32568359375, z: 41.06831741333008 },
        { x: 2024.5653076171875, y: 4939.8779296875, z: 41.084564208984375 },
        { x: 2028.7528076171875, y: 4935.4892578125, z: 41.12343978881836 },
        { x: 2032.6536865234375, y: 4931.5244140625, z: 41.1152458190918 },
        { x: 2036.9346923828125, y: 4927.17333984375, z: 41.101470947265625 },
        { x: 2040.4884033203125, y: 4923.6181640625, z: 41.09263610839844 },
        { x: 2045.1915283203125, y: 4919.443359375, z: 41.02947998046875 },
        { x: 2048.8427734375, y: 4916.07275390625, z: 41.05848693847656 },
        { x: 2051.965087890625, y: 4913.0625, z: 41.07347869873047 },
        { x: 2056.5283203125, y: 4908.48681640625, z: 41.09797668457031 },
        { x: 2060.983154296875, y: 4903.9951171875, z: 41.10997009277344 },
        { x: 2065.3525390625, y: 4899.45654296875, z: 41.1007080078125 },
        { x: 2070.17724609375, y: 4894.47265625, z: 41.073177337646484 },
        { x: 2072.484619140625, y: 4895.28125, z: 41.106754302978516 },
        { x: 2068.703369140625, y: 4899.0859375, z: 41.07313919067383 },
        { x: 2064.185302734375, y: 4903.60791015625, z: 41.0776252746582 },
        { x: 2059.580322265625, y: 4908.31787109375, z: 41.0897102355957 },
        { x: 2055.74365234375, y: 4912.17138671875, z: 41.068687438964844 },
        { x: 2051.030029296875, y: 4916.90185546875, z: 41.10814666748047 },
        { x: 2046.2220458984375, y: 4921.64111328125, z: 41.13011169433594 },
        { x: 2042.2255859375, y: 4925.3447265625, z: 41.09363555908203 },
        { x: 2037.9566650390625, y: 4929.43994140625, z: 41.078433990478516 },
        { x: 2033.3409423828125, y: 4933.8193359375, z: 41.08412551879883 },
        { x: 2028.848876953125, y: 4938.34814453125, z: 41.08311462402344 },
        { x: 2024.48681640625, y: 4942.890625, z: 41.083702087402344 },
        { x: 2024.9580078125, y: 4945.271484375, z: 41.113773345947266 },
        { x: 2028.7493896484375, y: 4941.76953125, z: 41.117164611816406 },
        { x: 2032.8013916015625, y: 4937.8388671875, z: 41.13886260986328 },
        { x: 2037.013916015625, y: 4933.1044921875, z: 41.130638122558594 },
        { x: 2041.14453125, y: 4928.70947265625, z: 41.073726654052734 },
        { x: 2044.7286376953125, y: 4925.13232421875, z: 41.1108512878418 },
        { x: 2052.2255859375, y: 4918.33984375, z: 41.105587005615234 },
        { x: 2056.191162109375, y: 4914.470703125, z: 41.074424743652344 },
        { x: 2059.848876953125, y: 4910.81640625, z: 41.1036262512207 },
        { x: 2063.4990234375, y: 4907.13037109375, z: 41.116668701171875 },
        { x: 2067.462890625, y: 4902.97021484375, z: 41.12745666503906 },
        { x: 2070.9140625, y: 4899.28857421875, z: 41.128108978271484 },
        { x: 2075.02001953125, y: 4898.36572265625, z: 41.13561248779297 },
        { x: 2071.39208984375, y: 4902.09228515625, z: 41.09315490722656 },
        { x: 2067.75732421875, y: 4905.6484375, z: 41.11474609375 },
        { x: 2064.0400390625, y: 4909.43896484375, z: 41.11675262451172 },
        { x: 2059.507568359375, y: 4914.037109375, z: 41.10938262939453 },
        { x: 2055.858642578125, y: 4917.712890625, z: 41.10084915161133 },
        { x: 2048.10546875, y: 4925.22314453125, z: 41.10771179199219 },
        { x: 2044.2080078125, y: 4928.82958984375, z: 41.106075286865234 },
        { x: 2040.7886962890625, y: 4932.08642578125, z: 41.10742950439453 },
        { x: 2037.3687744140625, y: 4935.42041015625, z: 41.108009338378906 },
        { x: 2033.0716552734375, y: 4939.658203125, z: 41.124168395996094 },
        { x: 2029.8658447265625, y: 4942.8662109375, z: 41.12409591674805 },
        { x: 2026.224365234375, y: 4946.71533203125, z: 41.09549331665039 },
        { x: 2028.60546875, y: 4947.4169921875, z: 41.092750549316406 },
        { x: 2031.6800537109375, y: 4943.7119140625, z: 41.05792236328125 },
        { x: 2036.4818115234375, y: 4939.24658203125, z: 41.08306121826172 },
        { x: 2040.5537109375, y: 4935.3916015625, z: 41.12728500366211 },
        { x: 2044.7427978515625, y: 4931.08056640625, z: 41.118682861328125 },
        { x: 2048.453125, y: 4927.38525390625, z: 41.08328628540039 },
        { x: 2055.235107421875, y: 4920.806640625, z: 41.09303665161133 },
        { x: 2058.830078125, y: 4917.31494140625, z: 41.09141540527344 },
        { x: 2062.546142578125, y: 4913.6220703125, z: 41.0850944519043 },
        { x: 2066.50732421875, y: 4909.5009765625, z: 41.06462478637695 },
        { x: 2070.397705078125, y: 4905.6240234375, z: 41.05217742919922 },
        { x: 2073.455078125, y: 4902.5068359375, z: 41.053672790527344 },
        { x: 2076.801513671875, y: 4899.2939453125, z: 41.06669998168945 },
        { x: 2077.667724609375, y: 4901.4912109375, z: 41.11095428466797 },
        { x: 2073.938720703125, y: 4905.13671875, z: 41.04961395263672 },
        { x: 2070.528564453125, y: 4908.54833984375, z: 41.048885345458984 },
        { x: 2066.761962890625, y: 4912.482421875, z: 41.05785369873047 },
        { x: 2062.880126953125, y: 4916.52197265625, z: 41.07434844970703 },
        { x: 2058.8154296875, y: 4920.61865234375, z: 41.07754898071289 },
        { x: 2056.313720703125, y: 4923.20654296875, z: 41.1103401184082 },
        { x: 2052.11181640625, y: 4927.15966796875, z: 41.07523727416992 },
        { x: 2048.048828125, y: 4930.75048828125, z: 41.08815002441406 },
        { x: 2043.944580078125, y: 4934.82177734375, z: 41.095645904541016 },
        { x: 2039.9815673828125, y: 4938.658203125, z: 41.08016586303711 },
        { x: 2036.14794921875, y: 4942.55322265625, z: 41.064754486083984 },
        { x: 2033.0185546875, y: 4945.6806640625, z: 41.05839538574219 },
        { x: 2029.3826904296875, y: 4949.3564453125, z: 41.11317825317383 },
        { x: 2030.97265625, y: 4950.412109375, z: 41.11984634399414 },
        { x: 2034.9368896484375, y: 4946.6865234375, z: 41.113555908203125 },
        { x: 2039.448974609375, y: 4941.72607421875, z: 41.13129425048828 },
        { x: 2043.818603515625, y: 4937.3046875, z: 41.13058090209961 },
        { x: 2047.7034912109375, y: 4933.4775390625, z: 41.119869232177734 },
        { x: 2052.480712890625, y: 4929.00439453125, z: 41.09149169921875 },
        { x: 2057.670166015625, y: 4924.3056640625, z: 41.0960578918457 },
        { x: 2062.208984375, y: 4919.80810546875, z: 41.1065559387207 },
        { x: 2067.858642578125, y: 4914.02490234375, z: 41.10383987426758 },
        { x: 2071.802490234375, y: 4909.83642578125, z: 41.122371673583984 },
        { x: 2075.51611328125, y: 4906.11474609375, z: 41.0911750793457 },
        { x: 2079.195068359375, y: 4902.49072265625, z: 41.065879821777344 },
        { x: 2080.365478515625, y: 4904.8330078125, z: 41.09916305541992 },
        { x: 2076.69384765625, y: 4908.06005859375, z: 41.09743118286133 },
        { x: 2072.151611328125, y: 4912.49267578125, z: 41.10798645019531 },
        { x: 2068.045654296875, y: 4916.7822265625, z: 41.107547760009766 },
        { x: 2064.1552734375, y: 4920.79736328125, z: 41.11114501953125 },
        { x: 2059.34375, y: 4925.73193359375, z: 41.074256896972656 },
        { x: 2054.297607421875, y: 4930.5458984375, z: 41.081966400146484 },
        { x: 2049.654541015625, y: 4934.84375, z: 41.09743118286133 },
        { x: 2044.6373291015625, y: 4939.6123046875, z: 41.08930969238281 },
        { x: 2040.53759765625, y: 4943.62646484375, z: 41.11347198486328 },
        { x: 2035.53857421875, y: 4948.65283203125, z: 41.10438919067383 },
        { x: 2032.1761474609375, y: 4951.98193359375, z: 41.06703186035156 },
        { x: 2033.9044189453125, y: 4953.28173828125, z: 41.04896926879883 },
        { x: 2037.82958984375, y: 4949.10595703125, z: 41.070247650146484 },
        { x: 2042.2017822265625, y: 4944.74365234375, z: 41.10083770751953 },
        { x: 2045.94580078125, y: 4940.96484375, z: 41.089168548583984 },
        { x: 2050.04736328125, y: 4936.88916015625, z: 41.10684585571289 },
        { x: 2054.725830078125, y: 4932.47705078125, z: 41.05256652832031 },
        { x: 2060.470703125, y: 4927.0322265625, z: 41.037254333496094 },
        { x: 2064.39404296875, y: 4923.09033203125, z: 41.03131103515625 },
        { x: 2068.605224609375, y: 4918.8251953125, z: 41.04596710205078 },
        { x: 2072.485595703125, y: 4914.88427734375, z: 41.05775833129883 },
        { x: 2076.63916015625, y: 4910.6064453125, z: 41.061466217041016 },
        { x: 2080.55224609375, y: 4906.66357421875, z: 41.06532287597656 },
        { x: 2083.548828125, y: 4906.724609375, z: 41.081214904785156 },
        { x: 2080.110595703125, y: 4910.4443359375, z: 41.06742477416992 },
        { x: 2075.538330078125, y: 4915.01123046875, z: 41.06264114379883 },
        { x: 2071.67919921875, y: 4918.8974609375, z: 41.05968475341797 },
        { x: 2067.57275390625, y: 4923.0419921875, z: 41.06169509887695 },
        { x: 2063.41015625, y: 4927.27294921875, z: 41.07186508178711 },
        { x: 2057.55078125, y: 4933.0439453125, z: 41.05167007446289 },
        { x: 2053.80224609375, y: 4936.52734375, z: 41.08683395385742 },
        { x: 2050.1435546875, y: 4939.97705078125, z: 41.07072067260742 },
        { x: 2046.0682373046875, y: 4943.9443359375, z: 41.06420135498047 },
        { x: 2042.0428466796875, y: 4947.86474609375, z: 41.109214782714844 },
        { x: 2038.3798828125, y: 4951.4970703125, z: 41.046485900878906 },
        { x: 2035.450439453125, y: 4954.38818359375, z: 41.066070556640625 },
        { x: 2036.9862060546875, y: 4955.916015625, z: 41.108158111572266 },
        { x: 2040.7396240234375, y: 4952.0185546875, z: 41.08887481689453 },
        { x: 2044.6607666015625, y: 4947.84375, z: 41.099117279052734 },
        { x: 2048.93212890625, y: 4943.3369140625, z: 41.101810455322266 },
        { x: 2053.778076171875, y: 4938.59521484375, z: 41.10252380371094 },
        { x: 2058.657958984375, y: 4934.1455078125, z: 41.05507278442383 },
        { x: 2063.088623046875, y: 4930.09716796875, z: 41.07177734375 },
        { x: 2066.796630859375, y: 4926.46044921875, z: 41.091285705566406 },
        { x: 2070.851806640625, y: 4922.35400390625, z: 41.09091567993164 },
        { x: 2075.7392578125, y: 4917.30322265625, z: 41.09138870239258 },
        { x: 2079.7216796875, y: 4913.15625, z: 41.095245361328125 },
        { x: 2084.86279296875, y: 4908.0986328125, z: 41.05171203613281 },
        { x: 2086.10400390625, y: 4909.912109375, z: 41.121070861816406 },
        { x: 2082.297607421875, y: 4914.02685546875, z: 41.067291259765625 },
        { x: 2077.3154296875, y: 4919.06005859375, z: 41.05587387084961 },
        { x: 2072.651611328125, y: 4923.66650390625, z: 41.087547302246094 },
        { x: 2068.933837890625, y: 4927.3017578125, z: 41.10921096801758 },
        { x: 2065.677978515625, y: 4930.35009765625, z: 41.112545013427734 },
        { x: 2058.909912109375, y: 4937.119140625, z: 41.107059478759766 },
        { x: 2055.033935546875, y: 4940.8798828125, z: 41.10543441772461 },
        { x: 2050.2861328125, y: 4945.30859375, z: 41.110740661621094 },
        { x: 2045.754638671875, y: 4949.697265625, z: 41.08252716064453 },
        { x: 2041.81640625, y: 4953.625, z: 41.07704162597656 },
        { x: 2038.2896728515625, y: 4957.0947265625, z: 41.09878921508789 },
        { x: 2039.2586669921875, y: 4958.234375, z: 41.128292083740234 },
        { x: 2044.239990234375, y: 4953.7607421875, z: 41.10247039794922 },
        { x: 2050.237548828125, y: 4947.7578125, z: 41.08863067626953 },
        { x: 2054.307861328125, y: 4943.99658203125, z: 41.101043701171875 },
        { x: 2058.8056640625, y: 4939.64892578125, z: 41.09912872314453 },
        { x: 2066.2626953125, y: 4932.2314453125, z: 41.12887954711914 },
        { x: 2070.589111328125, y: 4928.08056640625, z: 41.11186981201172 },
        { x: 2075.304931640625, y: 4923.677734375, z: 41.10764694213867 },
        { x: 2079.53369140625, y: 4919.21826171875, z: 41.09530258178711 },
        { x: 2084.0244140625, y: 4914.615234375, z: 41.082916259765625 },
        { x: 2087.92333984375, y: 4910.833984375, z: 41.10740661621094 },
        { x: 2089.259765625, y: 4912.3076171875, z: 41.12430191040039 },
        { x: 2084.7763671875, y: 4916.9287109375, z: 41.0688591003418 },
        { x: 2080.049072265625, y: 4921.72998046875, z: 41.07051467895508 },
        { x: 2075.615966796875, y: 4926.23583984375, z: 41.097869873046875 },
        { x: 2071.585693359375, y: 4930.29638671875, z: 41.0987434387207 },
        { x: 2067.350830078125, y: 4934.56396484375, z: 41.083518981933594 },
        { x: 2063.021484375, y: 4938.77099609375, z: 41.145301818847656 },
        { x: 2057.931884765625, y: 4943.5185546875, z: 41.074432373046875 },
        { x: 2053.306884765625, y: 4947.9482421875, z: 41.063533782958984 },
        { x: 2049.415771484375, y: 4952.009765625, z: 41.06803512573242 },
        { x: 2044.3924560546875, y: 4957.13232421875, z: 41.107017517089844 },
        { x: 2040.689208984375, y: 4960.90380859375, z: 41.105098724365234 },
        { x: 2041.9383544921875, y: 4961.16796875, z: 41.04506301879883 },
        { x: 2049.027099609375, y: 4955.478515625, z: 41.10613250732422 },
        { x: 2053.604736328125, y: 4950.41748046875, z: 41.09716796875 },
        { x: 2057.90478515625, y: 4946.0908203125, z: 41.09698486328125 },
        { x: 2062.295166015625, y: 4941.79931640625, z: 41.09697341918945 },
        { x: 2069.070068359375, y: 4935.2294921875, z: 41.07895278930664 },
        { x: 2073.560546875, y: 4930.7138671875, z: 41.085304260253906 },
        { x: 2077.5947265625, y: 4926.47802734375, z: 41.074947357177734 },
        { x: 2081.90478515625, y: 4922.3251953125, z: 41.09186553955078 },
        { x: 2085.552490234375, y: 4918.7265625, z: 41.09882354736328 },
        { x: 2090.034423828125, y: 4914.29296875, z: 41.11079788208008 },
        { x: 2091.020263671875, y: 4916.08154296875, z: 41.035377502441406 },
        { x: 2087.125244140625, y: 4920.265625, z: 41.08639907836914 },
        { x: 2082.658203125, y: 4924.73876953125, z: 41.090599060058594 },
        { x: 2078.30224609375, y: 4929.1767578125, z: 41.08092498779297 },
        { x: 2074.6396484375, y: 4932.89990234375, z: 41.08129119873047 },
        { x: 2070.474853515625, y: 4937.0537109375, z: 41.10216522216797 },
        { x: 2065.695068359375, y: 4941.5263671875, z: 41.09429168701172 },
        { x: 2061.7451171875, y: 4945.154296875, z: 41.07244110107422 },
        { x: 2056.78759765625, y: 4949.9853515625, z: 41.08183670043945 },
        { x: 2053.180908203125, y: 4953.6318359375, z: 41.09102249145508 },
        { x: 2049.115478515625, y: 4957.82568359375, z: 41.10390853881836 },
        { x: 2044.365966796875, y: 4962.466796875, z: 41.107154846191406 },
        { x: 2045.106201171875, y: 4964.09326171875, z: 41.105873107910156 },
        { x: 2049.261474609375, y: 4960.373046875, z: 41.103912353515625 },
        { x: 2053.470703125, y: 4955.9306640625, z: 41.10484313964844 },
        { x: 2057.265380859375, y: 4952.0654296875, z: 41.07506561279297 },
        { x: 2061.326904296875, y: 4948.2099609375, z: 41.08628463745117 },
        { x: 2066.89599609375, y: 4942.9375, z: 41.093849182128906 },
        { x: 2071.85693359375, y: 4938.24072265625, z: 41.119564056396484 },
        { x: 2076.54638671875, y: 4933.61376953125, z: 41.10067367553711 },
        { x: 2080.837646484375, y: 4929.23388671875, z: 41.0896110534668 },
        { x: 2085.494384765625, y: 4924.3427734375, z: 41.080684661865234 },
        { x: 2089.934326171875, y: 4919.8447265625, z: 41.06767272949219 },
        { x: 2093.083984375, y: 4916.70166015625, z: 41.066898345947266 },
        { x: 2094.84130859375, y: 4917.69677734375, z: 41.083553314208984 },
        { x: 2091.275146484375, y: 4921.78662109375, z: 41.05244827270508 },
        { x: 2086.552490234375, y: 4926.30810546875, z: 41.05329895019531 },
        { x: 2082.52099609375, y: 4930.349609375, z: 41.04094314575195 },
        { x: 2078.36181640625, y: 4934.73046875, z: 41.067264556884766 },
        { x: 2073.495361328125, y: 4939.625, z: 41.07640075683594 },
        { x: 2067.640625, y: 4944.5791015625, z: 41.058990478515625 },
        { x: 2063.8994140625, y: 4948.73095703125, z: 41.06104278564453 },
        { x: 2059.74853515625, y: 4952.7822265625, z: 41.02479553222656 },
        { x: 2055.02392578125, y: 4957.53369140625, z: 41.03814697265625 },
        { x: 2051.0595703125, y: 4961.6650390625, z: 41.06102752685547 },
        { x: 2047.2269287109375, y: 4965.5478515625, z: 41.07431411743164 },
      ],
      i = [
        { x: 2147.02099609375, y: 5122.955078125, z: 47.286781311035156 },
        { x: 2089.11376953125, y: 5183.69384765625, z: 54.137332916259766 },
        { x: 2108.87548828125, y: 5195.3896484375, z: 55.838279724121094 },
        { x: 2161.25439453125, y: 5139.7607421875, z: 50.25286865234375 },
        { x: 2180.115478515625, y: 5154.59716796875, z: 53.96277618408203 },
        { x: 2132.308837890625, y: 5203.95751953125, z: 57.5640754699707 },
        { x: 2158.00390625, y: 5206.20556640625, z: 59.301265716552734 },
        { x: 2194.691650390625, y: 5167.123046875, z: 56.76081085205078 },
        { x: 2295.967041015625, y: 5163.12744140625, z: 56.922183990478516 },
        { x: 2343.509765625, y: 5115.0751953125, z: 48.094600677490234 },
        { x: 2314.094482421875, y: 5095.87646484375, z: 47.04683303833008 },
        { x: 2272.6884765625, y: 5137.36328125, z: 53.436073303222656 },
        { x: 2219.492919921875, y: 5131.24755859375, z: 54.779117584228516 },
        { x: 2287.837890625, y: 5061.68603515625, z: 45.82921600341797 },
        { x: 2269.209716796875, y: 5045.005859375, z: 44.1256103515625 },
        { x: 2201.244140625, y: 5113.98583984375, z: 50.63549041748047 },
        { x: 2183.3134765625, y: 5098.78857421875, z: 47.116424560546875 },
        { x: 2234.246337890625, y: 5034.77587890625, z: 44.55950927734375 },
      ],
      o = { x: 2030.28271484375, y: 4980.2880859375, z: 42.098270416259766 },
      r = { x: 2020.761962890625, y: 4966.359375, z: 41.37326431274414 },
      l = { x: 2028.7933349609375, y: 4978.2294921875, z: 41.09675979614258 },
      n = { x: 2019.436767578125, y: 4976.83447265625, z: 41.23955154418945 },
      s = { x: 2307.54345703125, y: 4888.03076171875, z: 41.80826187133789 },
      p = mp.players.local;
    let m,
      d,
      c,
      _,
      u = 0,
      h = 0,
      y = 0,
      b = !1;
    function I() {
      let e;
      "people" === c &&
        ((e = a[misc.getRandomInt(0, a.length - 1)]),
        (m = mp.checkpoints.new(47, new mp.Vector3(e.x, e.y, e.z - 0.9), 1, {
          color: [255, 255, 255, 255],
          visible: !0,
        })),
        mp.events.callRemote("sFarmCreateProp", JSON.stringify(e))),
        "tractor" === c &&
          ((e = i[y]),
          (m = mp.checkpoints.new(47, new mp.Vector3(e.x, e.y, e.z - 0.9), 5, {
            color: [255, 255, 255, 255],
            visible: !0,
          })),
          (d = mp.blips.new(1, e, {
            name: "Точка сбора урожая",
            scale: 1,
            color: 46,
            shortRange: !1,
          })).setRoute(!0));
    }
    (mp.colshapes.newSphere(o.x, o.y, o.z, 1).farmMenu = !0),
      mp.markers.new(1, new mp.Vector3(o.x, o.y, o.z - 1), 1, {
        color: [0, 255, 0, 100],
        visible: !0,
      }),
      mp.blips.new(473, o, {
        name: "Ферма",
        scale: 1,
        color: 46,
        shortRange: !0,
      }),
      (mp.colshapes.newSphere(r.x, r.y, r.z, 1).farmFood = !0),
      mp.markers.new(1, new mp.Vector3(r.x, r.y, r.z - 1), 1, {
        color: [0, 255, 0, 100],
        visible: !0,
      }),
      mp.labels.new("Бесплатный паёк", new mp.Vector3(r.x, r.y, r.z + 1), {
        drawDistance: 30,
      }),
      (mp.colshapes.newSphere(l.x, l.y, l.z, 1).farmClothes = !0),
      mp.markers.new(1, new mp.Vector3(l.x, l.y, l.z - 1), 1, {
        color: [0, 255, 0, 100],
        visible: !0,
      }),
      mp.labels.new("Рабочая одежда", new mp.Vector3(l.x, l.y, l.z + 1), {
        drawDistance: 30,
      }),
      (mp.colshapes.newSphere(s.x, s.y, s.z, 7).farmStoreTractor = !0),
      mp.markers.new(1, new mp.Vector3(s.x, s.y, s.z - 1), 7, {
        color: [0, 255, 0, 100],
        visible: !1,
      }),
      (mp.colshapes.newSphere(n.x, n.y, n.z, 5).farmStorePeople = !0),
      mp.markers.new(1, new mp.Vector3(n.x, n.y, n.z - 1), 5, {
        color: [0, 255, 0, 100],
        visible: !1,
      }),
      mp.events.add({
        playerEnterCheckpoint: (e) => {
          if (m === e) {
            if (!b)
              return void misc.notif(
                "Вы не можете работать на ферме не переодевшись в рабочую форму",
                "error"
              );
            if ("people" === c) {
              if (p.vehicle) return;
              m.destroy(),
                (m = null),
                mp.attachmentMngr.removeLocal("farmBasket"),
                mp.events.callRemote("sPlayer-setAnimation", "collectCrop"),
                mp.attachmentMngr.addLocal("farmShovel"),
                setTimeout(() => {
                  p.vehicle
                    ? mp.events.callRemote("sPlayer-Ban", "багоюз на ферме")
                    : (mp.events.callRemote("sFarmDestroyProp"),
                      mp.events.callRemote(
                        "sPlayer-setAnimation",
                        "smoothCancel"
                      ),
                      mp.attachmentMngr.removeLocal("farmShovel"),
                      mp.attachmentMngr.addLocal("farmBasket"),
                      5 === ++u
                        ? (mp.events.callRemote("sFarm-putCropInStore"),
                          misc.notif("Отнесите урожай на склад", "info"))
                        : (I(),
                          misc.notif(
                            "Направляйтесь к следующей точке",
                            "info"
                          )));
                }, 1e4);
            } else if (p.vehicle && "farm" === p.vehicle.getVariable("job")) {
              misc.notif("Сбор урожая начат, ожидайте 10 секунд", "info");
              const e = m.position;
              m.destroy(),
                d.destroy(),
                (d = null),
                (m = null),
                setTimeout(() => {
                  misc.vdist(e, p.position) > 10
                    ? (misc.notif(
                        "Урожай не собран, вы должны не двигаться во время сбора урожая",
                        "error"
                      ),
                      I())
                    : (++y === i.length
                        ? ((y = 0),
                          mp.events.callRemote("sFarm-putCropInStore"),
                          misc.notif("Отвезите урожай на склад", "info"))
                        : (I(),
                          misc.notif(
                            "Направляйтесь к следующей точке",
                            "info"
                          )),
                      mp.events.callRemote("sFarm-SyncTractorCheckpoint", y));
                }, 1e4);
            } else
              misc.notif(
                "Вы не можете собирать урожай без трактора и прицепа",
                "error"
              );
          }
        },
        "cFarm-takeFood": () => {
          mp.events.callRemote("sFarm-takeFood", h);
        },
        "cFarm-startWork": (e, t = 0) => {
          (c = e),
            (y = t),
            I(),
            (_ = setInterval(() => {
              h++;
            }, 6e4));
        },
        "cFarm-endWrok": () => {
          (u = 0),
            (y = 0),
            (c = null),
            m && m.destroy(),
            d && d.destroy(),
            clearInterval(_),
            (_ = null),
            (h = 0),
            (m = null),
            (d = null);
        },
        "cFarm-cropWasPutInStore": () => {
          (u = 0), I();
        },
        "cFarm-clearFoodTimer": () => {
          h = 0;
        },
        "cFarm-tryUnloadTractor": () => {
          mp.events.callRemote("sFarm-UnloadTractor");
        },
        "cFarm-setClothesState": (e) => {
          b = e;
        },
      });
  },
  function (e, t) {
    const a = {
        x: -1542.8837890625,
        y: -581.0105590820312,
        z: 25.94549560546875,
      },
      i = { x: -1581.353515625, y: -558.3233032226562, z: 34.953102111816406 },
      o = {
        x: -1536.9561767578125,
        y: -578.5701293945312,
        z: 25.70780372619629,
      };
    let r;
    (mp.colshapes.newSphere(a.x, a.y, a.z, 1).cashCollectorGear = !0),
      (markerCashCollectorGear = mp.markers.new(
        1,
        new mp.Vector3(a.x, a.y, a.z - 1),
        1,
        { color: [0, 255, 0, 100], visible: !0 }
      )),
      (labelCashCollectorGear = mp.labels.new(
        "Форма и рабочее оружие",
        new mp.Vector3(a.x, a.y, a.z + 1),
        { drawDistance: 30, color: [0, 255, 0, 100] }
      )),
      (mp.colshapes.newSphere(i.x, i.y, i.z, 1).cashCollectorWork = !0),
      (markerCashCollector = mp.markers.new(
        1,
        new mp.Vector3(i.x, i.y, i.z - 1),
        1,
        { color: [0, 255, 0, 100], visible: !0 }
      )),
      (mp.colshapes.newSphere(o.x, o.y, o.z, 1).putMoney = !0),
      mp.markers.new(1, new mp.Vector3(o.x, o.y, o.z - 1), 1, {
        color: [0, 255, 0, 100],
        visible: !0,
      }),
      mp.labels.new("Сдача денег", new mp.Vector3(o.x, o.y, o.z + 1), {
        drawDistance: 30,
        color: [0, 255, 0, 100],
      }),
      mp.events.add({
        playerEnterCheckpoint: (e) => {
          if (e === r) {
            if (localplayer.vehicle) return;
            r && (r.destroy(), (r = null)),
              mp.events.callRemote("sCashCollector-TakeCashFromAtm");
          }
        },
        "cCashCollector-ShowNextAtm": (e) => {
          r = mp.checkpoints.new(47, new mp.Vector3(e.x, e.y, e.z - 0.9), 1, {
            color: [255, 255, 255, 255],
            visible: !0,
          });
        },
        "cCashCollector-removeCheckpoint": () => {
          r && (r.destroy(), (r = null));
        },
        "cCashCollector-calcBackDoorDist": (e, t) => {
          const a = mp.vehicles.atRemoteId(e);
          if (!a)
            return misc.notif("Произошла ошибка, машина не найдена", "error");
          const i = (function (e) {
            const t = misc.getRotationZ(e) - 165;
            let a = e.position;
            return (
              (a.x =
                a.x -
                3.5 * Math.sin((t * Math.PI) / 180) +
                1 * Math.cos((t * Math.PI) / 180)),
              (a.y =
                a.y +
                3.5 * Math.cos((t * Math.PI) / 180) +
                1 * Math.sin((t * Math.PI) / 180)),
              a
            );
          })(a);
          if (misc.vdist(i, localplayer.position) > 1.5)
            return misc.notif("Подойдите ближе к машине.", "error");
          mp.events.callRemote(t);
        },
      });
  },
  function (e, t) {
    const a = { black: 40, red: 1, blue: 3, yellow: 5 },
      i = { x: 434.128, y: -645.737, z: 28.747 };
    let o,
      r,
      l,
      n,
      s,
      p = 0,
      m = !0,
      d = 0,
      c = 1;
    function _() {
      let e = p - 1;
      -1 === e && (e = o.busStopCoord.length - 1),
        r
          ? (r.destroy(),
            l.destroy(),
            (r = null),
            (l = null),
            misc.notif(
              "Остановка 10 секунд, после чего продолжайте движение.",
              "info"
            ),
            (m = !1),
            (n = 1e4))
          : ((n = 0),
            (c = a[o.routeName]),
            misc.notif(`Вы начали работу на маршруте ${o.routeName}.`, "info")),
        (s = setTimeout(() => {
          if (!m) {
            if (misc.vdist(o.busStopCoord[e], localplayer.position) > 20)
              return (
                (m = !0),
                misc.notif("Вы должны остановиться на 10 секунд.", "info"),
                (r = mp.checkpoints.new(
                  47,
                  new mp.Vector3(
                    o.busStopCoord[e].x,
                    o.busStopCoord[e].y,
                    o.busStopCoord[e].z - 1
                  ),
                  5,
                  { color: [255, 255, 255, 255], visible: !0 }
                )),
                (l = mp.blips.new(1, o.busStopCoord[e], {
                  name: "Следующая остановка",
                  scale: 1,
                  color: c,
                  shortRange: !1,
                })).setRoute(!0),
                l.setRouteColour(c),
                void l.setAlpha(255)
              );
            e === o.busStopCoord.length - 1 &&
              (mp.events.callRemote("sBus-EndRoute", d, o.routeName), (d = 0)),
              (d += misc.vdist(o.busStopCoord[e], o.busStopCoord[p])),
              mp.events.callRemote("sBus-SyncData", d, p);
          }
          (r = mp.checkpoints.new(
            47,
            new mp.Vector3(
              o.busStopCoord[p].x,
              o.busStopCoord[p].y,
              o.busStopCoord[p].z - 1
            ),
            5,
            { color: [255, 255, 255, 255], visible: !0 }
          )),
            (l = mp.blips.new(1, o.busStopCoord[p], {
              name: "Следующая остановка",
              scale: 1,
              color: c,
              shortRange: !1,
            })).setRoute(!0),
            l.setRouteColour(c),
            l.setAlpha(255),
            ++p === o.busStopCoord.length && (p = 0);
        }, n));
    }
    function u() {
      s && clearTimeout(s),
        r && r.destroy(),
        l && l.destroy(),
        (o = null),
        (r = null),
        (l = null),
        (p = 0),
        (m = !0),
        (n = null),
        (s = null),
        (d = 0),
        (c = 1);
    }
    (mp.colshapes.newSphere(i.x, i.y, i.z, 1).busStation = !0),
      (markerBusStation = mp.markers.new(
        1,
        new mp.Vector3(i.x, i.y, i.z - 1),
        1,
        { color: [0, 255, 0, 100], visible: !0 }
      )),
      (blipBusStation = mp.blips.new(513, new mp.Vector3(i.x, i.y, i.z), {
        name: "Автовокзал",
        scale: 1,
        color: 46,
        shortRange: !0,
      })),
      mp.events.add({
        playerEnterCheckpoint: (e) => {
          r === e &&
            localplayer.vehicle &&
            "bus" === localplayer.vehicle.getVariable("job") &&
            _();
        },
        "cBus-StartRoute": (e) => {
          u(), (o = e), _();
        },
        "cBus-StopRoute": () => {
          u();
        },
        "cBus-RecoverRoute": (e, t = 0, a = 0) => {
          (o = e), (d = t), (p = a), _();
        },
      });
  },
  function (e, t) {
    const a = mp.players.local;
    let i;
    const o = {
      x: 897.0011596679688,
      y: -177.34127807617188,
      z: 74.7002944946289,
    };
    (mp.colshapes.newSphere(o.x, o.y, o.z, 1).taxiPark = !0),
      mp.markers.new(1, new mp.Vector3(o.x, o.y, o.z - 1), 1, {
        color: [0, 255, 0, 100],
        visible: !0,
      }),
      mp.blips.new(198, new mp.Vector3(o.x, o.y, o.z), {
        name: "Таксопарк",
        color: 46,
        shortRange: !0,
      }),
      mp.events.add({
        "cTaxi-PushLastRide": (e) => {
          e = JSON.parse(e);
          const t = mp.game.pathfind.getStreetNameAtCoord(e.x, e.y, e.z, 0, 0),
            a = mp.game.ui.getStreetNameFromHashKey(t.streetName);
          misc.injectCef(`storage.setTaxiPushLastOrder(${JSON.stringify(a)});`);
        },
        "cTaxi-CheckPlayerLeave": (e) => {
          clearInterval(i),
            (i = setInterval(() => {
              misc.vdist(a.position, e) > 50 &&
                (mp.events.callRemote("sTaxi-PlayerLeavePositionOfCall"),
                clearInterval(i));
            }, 1e4));
        },
        "cTaxi-StopCheckPlayerLeave": () => {
          clearInterval(i);
        },
        "cTaxi-openTablet": (e) => {
          (e = JSON.parse(e)).forEach((e) => {
            e.distance = misc.roundNum(
              misc.vdist(localplayer.position, e.passengerCoord)
            );
          });
          const t = `storage.setTaxiOrders('${JSON.stringify(e)}');`;
          misc.injectCef(t), misc.openMenu("taxiTablet");
        },
      });
  },
  function (e, t) {
    const a = (e, t) => {
        t.forEach((t, a) => {
          t ? e.rollDownWindow(a) : e.rollUpWindow(a);
        });
      },
      i = (e, t) => {
        t ? e.setDoorOpen(5, !1, !1) : e.setDoorShut(5, !0);
      },
      o = (e, t) => {
        t ? e.setDoorOpen(4, !1, !1) : e.setDoorShut(4, !0);
      };
    mp.events.addDataHandler("trunk", (e, t) => {
      "vehicle" === e.type && i(e, t);
    }),
      mp.events.addDataHandler("hood", (e, t) => {
        "vehicle" === e.type && o(e, t);
      }),
      mp.events.addDataHandler("IndicatorRight", (e, t) => {
        "vehicle" === e.type && e.setIndicatorLights(0, null != t && t);
      }),
      mp.events.addDataHandler("IndicatorLeft", (e, t) => {
        "vehicle" === e.type && e.setIndicatorLights(1, null != t && t);
      }),
      mp.events.addDataHandler("tinting", (e, t) => {
        "vehicle" === e.type && e.setWindowTint(t);
      }),
      mp.events.addDataHandler("windows", (e, t) => {
        "vehicle" === e.type && a(e, t);
      }),
      mp.events.addDataHandler("anchor", (e, t) => {
        "vehicle" === e.type && misc.setAnchor(e, t);
      }),
      mp.events.add({
        entityStreamIn: (e) => {
          if ("vehicle" === e.type) {
            if (
              (e.hasVariable("IndicatorRight") &&
                e.setIndicatorLights(0, e.getVariable("IndicatorRight")),
              e.hasVariable("IndicatorLeft") &&
                e.setIndicatorLights(1, e.getVariable("IndicatorLeft")),
              e.hasVariable("tinting") &&
                e.setWindowTint(e.getVariable("tinting")),
              e.hasVariable("windows") && a(e, e.getVariable("windows")),
              8 === e.getClass())
            ) {
              e.setWheelType(6);
              const t = e.getVariable("motoWheel");
              t && (e.setMod(24, t), e.setMod(23, t));
            }
            i(e, e.getVariable("trunk")),
              o(e, e.getVariable("hood")),
              misc.setAnchor(e, e.getVariable("anchor"));
          }
        },
      });
  },
  function (e) {
    e.exports = [
      {
        title: "handcuffed",
        dict: "anim@move_m@prisoner_cuffed_rc",
        name: "aim_low_loop",
        speed: 1,
        flag: 49,
      },
      {
        title: "putInTrunk",
        dict: "anim@heists@ornate_bank@hostages@cashier_b@",
        name: "flinch_loop_underfire",
        speed: 10,
        flag: 33,
      },
      {
        title: "collectCrop",
        dict: "amb@world_human_gardener_plant@female@base",
        name: "base_female",
        speed: 1,
        flag: 33,
      },
      {
        title: "putCropInStore",
        dict: "mp_common",
        name: "givetake2_a",
        speed: 1,
        flag: 33,
        isCancel: !1,
      },
      {
        title: "putSmthOnFloor",
        dict: "anim@heists@money_grab@briefcase",
        name: "loop",
        speed: 1,
        flag: 33,
      },
      {
        title: "collectSmthOnFloor",
        dict: "anim@heists@money_grab@briefcase",
        name: "loop",
        speed: 1,
        flag: 33,
      },
      {
        title: "putInBag",
        dict: "anim@heists@ornate_bank@grab_cash_heels",
        name: "grab_suit",
        speed: 1,
        flag: 33,
      },
      {
        title: "atmInteract",
        dict: "amb@prop_human_atm@male@idle_a",
        name: "idle_c",
        speed: 1,
        flag: 33,
      },
      {
        title: "nearDeath",
        dict: "combat@death@from_writhe",
        name: "death_a",
        speed: 10,
        flag: 34,
      },
      {
        title: "reanimation",
        dict: "amb@medic@standing@tendtodead@idle_a",
        name: "idle_a",
        speed: 1,
        flag: 33,
      },
      {
        title: "smoothCancel",
        dict: "mp_common",
        name: "givetake2_a",
        speed: 1,
        flag: 32,
      },
      {
        title: "boxCarry",
        dict: "anim@heists@box_carry@",
        name: "idle",
        speed: 4,
        flag: 49,
      },
      {
        title: "openDoor",
        dict: "gestures@m@car@low@casual@ds",
        name: "gesture_me",
        speed: 1,
        flag: 49,
      },
      {
        title: "hideKey",
        dict: "amb@world_human_security_shine_torch@male@exit",
        name: "exit",
        speed: 1,
        flag: 49,
      },
      {
        title: "giveDocs",
        dict: "amb@world_human_security_shine_torch@male@enter",
        name: "enter",
        speed: 1,
        flag: 49,
      },
      {
        title: "putDocs",
        dict: "amb@world_human_security_shine_torch@male@exit",
        name: "exit",
        speed: 1,
        flag: 49,
      },
      {
        title: "watchDocs",
        dict: "abigail_mcs_2-1",
        name: "player_zero_dual-1",
        speed: 1,
        flag: 49,
      },
      {
        title: "talkRadio",
        dict: "random@arrests",
        name: "generic_radio_chatter",
        speed: 5,
        flag: 49,
      },
      {
        title: "drink",
        dict: "amb@world_human_drinking@coffee@male@idle_a",
        name: "idle_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "eat",
        dict: "amb@code_human_wander_eating_donut@male@idle_a",
        name: "idle_c",
        speed: 1,
        flag: 49,
      },
      {
        title: "eat2",
        dict: "mp_player_inteat@pnq",
        name: "loop",
        speed: 1,
        flag: 49,
      },
      {
        title: "electricJob",
        dict: "mp_common_heist",
        name: "use_terminal_loop",
        speed: 1,
        flag: 49,
      },
      {
        title: "atmEnterCard",
        dict: "amb@prop_human_atm@male@enter",
        name: "enter",
        speed: 1,
        flag: 33,
      },
      {
        title: "atmExitCard",
        dict: "amb@prop_human_atm@male@exit",
        name: "exit",
        speed: 1,
        flag: 49,
        isCancel: !1,
      },
      {
        title: "atmEnterCode",
        dict: "amb@prop_human_atm@male@idle_a",
        name: "idle_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "pickUpItem",
        dict: "random@domestic",
        name: "pickup_low",
        speed: 1,
        flag: 33,
      },
      {
        title: "openPhone",
        dict: "cellphone@",
        name: "cellphone_text_in",
        speed: 3,
        flag: 50,
      },
      {
        title: "openPhoneInCar",
        dict: "cellphone@in_car@ds",
        name: "cellphone_text_in",
        speed: 3,
        flag: 50,
      },
      {
        title: "closePhone",
        dict: "amb@world_human_stand_mobile@male@text@exit",
        name: "cellphone_text_out",
        speed: 2,
        flag: 50,
      },
      {
        title: "callPhone",
        dict: "amb@code_human_wander_mobile@male@base",
        name: "static",
        speed: 1,
        flag: 49,
      },
      {
        title: "dressingUp",
        dict: "ah_3a_ext-12",
        name: "player_zero_dual-12",
        speed: 1,
        flag: 49,
      },
      {
        title: "getKnife",
        dict: "anim@melee@machete@streamed_core@",
        name: "plyr_rear_takedown_b",
        speed: 1,
        flag: 33,
      },
      {
        title: "getWeedBlock",
        dict: "amb@prop_human_bbq@male@exit",
        name: "exit",
        speed: 1,
        flag: 49,
      },
      {
        title: "loadBlock",
        dict: "anim@heists@load_box",
        name: "load_box_2",
        speed: 1,
        flag: 49,
      },
      {
        title: "bum_standing",
        dict: "amb@world_human_bum_standing@twitchy@base",
        name: "base",
        speed: 1,
        flag: 49,
      },
      {
        title: "hacking",
        dict: "missheistfbisetup1",
        name: "hassle_intro_loop_f",
        speed: 1,
        flag: 33,
      },
      {
        title: "buyWeaponLicense",
        dict: "friends@laf@ig_5",
        name: "anotherhalf",
        speed: 1,
        flag: 33,
      },
      {
        title: "safeHacking",
        dict: "mp_missheist_countrybank@enter_code",
        name: "enter_code_loop",
        speed: 1,
        flag: 49,
      },
      {
        title: "EndSafeHacking",
        dict: "anim@heists@money_grab@briefcase",
        name: "loop",
        speed: 1,
        flag: 49,
      },
      {
        title: "AlcoDrugTesting",
        dict: "amb@world_human_security_shine_torch@male@base",
        name: "base",
        speed: 1,
        flag: 49,
      },
      {
        title: "dating",
        dict: "special_ped@baygor@monologue_5@monologue_5h",
        name: "do_you_want_to_be_happy_7",
        speed: 1,
        flag: 49,
      },
      {
        title: "handcuff",
        dict: "mp_arresting",
        name: "a_uncuff",
        speed: 1,
        flag: 49,
      },
      {
        title: "smoke",
        dict: "amb@world_human_smoking@male@male_a@idle_a",
        name: "idle_c",
        speed: 1,
        flag: 49,
      },
      {
        title: "tablet",
        dict: "move_m@clipboard",
        name: "idle",
        speed: 1,
        flag: 49,
      },
      {
        title: "handshake",
        dict: "mp_ped_interaction",
        name: "handshake_guy_a",
        speed: 1,
        flag: 33,
      },
      {
        title: "smokeWeed",
        dict: "missfbi3_party_c",
        name: "marijuana_loop_c_male1",
        speed: 1,
        flag: 49,
      },
      {
        title: "useMeth",
        dict: "move_m@drunk@slightlydrunk_idles@",
        name: "fidgit_01",
        speed: 1,
        flag: 33,
      },
      {
        title: "moneyCarry",
        dict: "amb@prop_human_bbq@male@enter",
        name: "enter",
        speed: 1,
        flag: 50,
      },
      {
        title: "animInt_ID_1",
        dict: "special_ped@mani@monologue_8@monologue_8b",
        name: "miranmemiranme_1",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_2",
        dict: "special_ped@mani@monologue_6@monologue_6d",
        name: "noshablosmishermanos_3",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_3",
        dict: "special_ped@jessie@trevor_1@trevor_1j",
        name: "dadwhatthefuck_9",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_4",
        dict: "special_ped@griff@trevor_1@trevor_1g",
        name: "convo_trevor_whatareyoudoing_6",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_5",
        dict: "special_ped@andy_moon@monologue_10@monologue_10e",
        name: "andy_ig_1_p10_madethemangrypraytoyour401k_4",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_6",
        dict: "gestures@miss@fra_0",
        name: "lamar_fkn0_cjae_01_g4",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_7",
        dict: "special_ped@mountain_dancer@monologue_4@monologue_4a",
        name: "mnt_dnc_verse",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_8",
        dict: "special_ped@mountain_dancer@monologue_3@monologue_3a",
        name: "mnt_dnc_buttwag",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_9",
        dict: "special_ped@mountain_dancer@monologue_2@monologue_2a",
        name: "mnt_dnc_angel",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_10",
        dict: "missfbi3_party_b",
        name: "talk_inside_loop_female",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_11",
        dict: "missfbi3_sniping",
        name: "dance_m_default",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_12",
        dict: "mp_safehouse",
        name: "lap_dance_girl",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_13",
        dict: "oddjobs@assassinate@multi@yachttarget@lapdance",
        name: "yacht_ld_f",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_14",
        dict: "amb@world_human_partying@female@partying_beer@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_15",
        dict: "amb@world_human_strip_watch_stand@male_a@idle_a",
        name: "idle_c",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_16",
        dict: "amb@world_human_strip_watch_stand@male_b@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_17",
        dict: "rcmfanatic3",
        name: "ef_3_rcm_loop_maryann",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_18",
        dict: "amb@world_human_push_ups@male@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_19",
        dict: "p_scaletest_s",
        name: "playerzerotest",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_20",
        dict: "misscarsteal1leadin",
        name: "devon_idle_02",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_21",
        dict: "amb@world_human_yoga@female@base",
        name: "base_b",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_22",
        dict: "amb@world_human_yoga@female@base",
        name: "base_c",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_23",
        dict: "amb@prop_human_muscle_chin_ups@male@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_24",
        dict: "amb@world_human_jog_standing@male@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_25",
        dict: "amb@world_human_muscle_flex@arms_at_side@idle_a",
        name: "idle_a",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_26",
        dict: "amb@world_human_sit_ups@male@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_27",
        dict: "anim@heists@fleeca_bank@hostages@ped_d@",
        name: "flinch_loop",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_28",
        dict: "busted",
        name: "idle_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_29",
        dict: "rcmtmom_2leadinout",
        name: "tmom_2_leadout_loop",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_30",
        dict: "rcmpaparazzo_4",
        name: "lift_hands_in_air_loop",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_31",
        dict: "random@burial",
        name: "a_burial",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_32",
        dict: "pro_mcs_7_concat-1",
        name: "u_f_m_promourn_01_dual-1",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_33",
        dict: "misscarsteal2peeing",
        name: "peeing_intro",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_34",
        dict: "anim@mp_player_intupperwave",
        name: "idle_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_35",
        dict: "anim@mp_player_intincarsalutestd@ds@",
        name: "idle_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_36",
        dict: "missexile1_cargoplaneleadinoutexile_1_int",
        name: "_leadout_michael",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_37",
        dict: "missfbi1ig_1_alt_1",
        name: "conversation1_peda",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_38",
        dict: "missheistdockssetup1ig_9@start_idle",
        name: "forklift_supervise_idlebase_supervisor",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_39",
        dict: "missmic1leadinoutmic_1_mcs_2",
        name: "_leadin_trevor",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_40",
        dict: "missmic4premiere",
        name: "interview_short_lazlow",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_41",
        dict: "move_crawl",
        name: "onfront_fwd",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_42",
        dict: "amb@code_human_cower_stand@male@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_43",
        dict: "amb@lo_res_idles@",
        name: "world_human_picnic_male_lo_res_base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_44",
        dict: "amb@lo_res_idles@",
        name: "lying_face_down_lo_res_base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_45",
        dict: "amb@lo_res_idles@",
        name: "lying_face_up_lo_res_base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_46",
        dict: "amb@world_human_musician@guitar@male@base",
        name: "base",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_47",
        dict: "amb@world_human_stupor@male@idle_a",
        name: "idle_b",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_48",
        dict: "anim@mp_player_intselfiedock",
        name: "idle_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_49",
        dict: "mp_player_int_upperfinger",
        name: "mp_player_int_finger_02_exit",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_50",
        dict: "rcmjosh1",
        name: "idle",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_51",
        dict: "missbigscore1",
        name: "idle_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_52",
        dict: "move_m@intimidation@cop@unarmed",
        name: "idle",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_53",
        dict: "amb@lo_res_idles@",
        name: "world_human_lean_male_foot_up_lo_res_base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_54",
        dict: "amb@world_human_leaning@male@wall@back@legs_crossed@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_55",
        dict: "amb@world_human_prostitute@cokehead@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_56",
        dict: "amb@world_human_superhero@male@space_pistol@base",
        name: "base",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_57",
        dict: "anim@heists@heist_corona@single_team",
        name: "single_team_loop_boss",
        speed: 1,
        flag: 49,
      },
      {
        title: "fishing",
        dict: "amb@world_human_stand_fishing@base",
        name: "base",
        speed: 1,
        flag: 49,
      },
      {
        title: "fishingCatch",
        dict: "amb@world_human_stand_fishing@idle_a",
        name: "idle_c",
        speed: 1,
        flag: 49,
      },
      {
        title: "showCert",
        dict: "mp_fbi_heist",
        name: "card_swipe",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_58",
        dict: "anim@amb@business@cfid@cfid_desk_no_work_bgen_chair_no_work@",
        name: "noddingoff_sleep_v1_lazyworkerfemale",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_59",
        dict: "gestures@f@standing@casual",
        name: "gesture_bye_soft",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_60",
        dict: "pro_mcs_7_concat-0",
        name: "cs_priest_dual-0",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_61",
        dict: "anim@mp_player_intcelebrationpaired@m_m_sarcastic",
        name: "sarcastic_left",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_62",
        dict: "anim@mp_player_intincarthumbs_upbodhi@ds@",
        name: "enter_fp",
        speed: 1,
        flag: 50,
      },
      {
        title: "animInt_ID_63",
        dict: "amb@world_human_cop_idles@female@idle_a",
        name: "idle_c",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_64",
        dict: "anim@heists@team_respawn@respawn_02",
        name: "heist_spawn_02_ped_d",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_65",
        dict: "amb@world_human_stand_fire@male@idle_a",
        name: "idle_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_66",
        dict: "anim@amb@business@coc@coc_packing@",
        name: "idle_v6_pressoperator",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_67",
        dict: "friends@",
        name: "pickupwait",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_68",
        dict: "move_p_m_two_idles@generic",
        name: "fidget_blow_snot",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_69",
        dict: "anim@mp_player_intcelebrationfemale@dj",
        name: "dj",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_70",
        dict: "misschinese2_crystalmazemcs1_ig",
        name: "dance_loop_tao",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_71",
        dict: "missfbi3_sniping",
        name: "dance_m_default",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_72",
        dict: "anim@mp_player_intcelebrationfemale@chicken_taunt",
        name: "chicken_taunt",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_73",
        dict: "timetable@tracy@ig_5@idle_a",
        name: "idle_c",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_74",
        dict: "anim@deathmatch_intros@unarmed",
        name: "intro_male_unarmed_a",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_75",
        dict: "amb@world_human_muscle_flex@arms_at_side@idle_a",
        name: "idle_c",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_76",
        dict: "amb@world_human_muscle_flex@arms_in_front@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_77",
        dict: "anim@deathmatch_intros@unarmed",
        name: "intro_male_unarmed_d",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_78",
        dict: "anim@deathmatch_intros@unarmed",
        name: "intro_male_unarmed_b",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_79",
        dict: "missfam5_yoga",
        name: "c1_pose",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_80",
        dict: "anim@miss@low@fin@vagos@",
        name: "idle_ped06",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_81",
        dict: "missfbi2@leadinoutfbi_2_mcs_1",
        name: "_leadin_loop_fbi",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_82",
        dict: "taxi_hail",
        name: "fp_hail_taxi",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_83",
        dict: "gestures@m@standing@casual",
        name: "gesture_i_will",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_84",
        dict: "random@car_thief@victimpoints_ig_3",
        name: "arms_waving",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_85",
        dict: "anim@mp_player_intcelebrationfemale@dock",
        name: "dock",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_86",
        dict: "anim@mp_player_intcelebrationfemale@thumb_on_ears",
        name: "thumb_on_ears",
        speed: 1,
        flag: 33,
      },
      {
        title: "animInt_ID_87",
        dict: "gestures@miss@fra_0",
        name: "lamar_fkn0_cjae_01_g4",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_88",
        dict: "missmic_4premiere",
        name: "movie_prem_02_f_a",
        speed: 1,
        flag: 49,
      },
      {
        title: "animInt_ID_89",
        dict: "missmic_4premiere",
        name: "movie_prem_02_f_b",
        speed: 1,
        flag: 33,
      },
      {
        title: "kiss",
        dict: "mp_ped_interaction",
        name: "kisses_guy_a",
        speed: 1,
        flag: 33,
      },
      {
        title: "sex1",
        dict: "rcmpaparazzo_2",
        name: "shag_action_a",
        speed: 1,
        flag: 33,
      },
      {
        title: "sex2",
        dict: "rcmpaparazzo_2",
        name: "shag_action_poppy",
        speed: 1,
        flag: 33,
      },
      {
        title: "turnOverVeh",
        dict: "anim@apt_trans@garage",
        name: "gar_open_1_right",
        speed: 1,
        flag: 33,
      },
      {
        title: "openVeh",
        dict: "anim@mp_player_intmenu@key_fob@",
        name: "fob_click",
        speed: 1,
        flag: 49,
      },
      {
        title: "takeCocaine",
        dict: "mp_missheist_ornatebank",
        name: "stand_cash_in_bag_loop",
        speed: 1,
        flag: 33,
      },
      {
        title: "takeDryWeed",
        dict: "amb@prop_human_movie_bulb@base",
        name: "base",
        speed: 1,
        flag: 33,
      },
      {
        title: "holdCamera",
        dict: "missmic4premiere",
        name: "interview_short_camman",
        speed: 1,
        flag: 33,
      },
      {
        title: "carRepair",
        dict: "mini@repair",
        name: "fixing_a_ped",
        speed: 1,
        flag: 33,
      },
    ];
  },
  function (e, t, a) {
    const i = a(63);
    let o;
    async function r(e, t) {
      if (!t) return;
      const a = i.find((e) => e.title === t);
      if (!a) return console.error(`Анимация ${t} не найдена в списке`);
      if (!mp.game.streaming.hasAnimDictLoaded(a.dict))
        for (
          mp.game.streaming.requestAnimDict(a.dict);
          !mp.game.streaming.hasAnimDictLoaded(a.dict);

        )
          await misc.sleep();
      mp.players.exists(e) &&
        (e.taskPlayAnim(
          a.dict.toString(),
          a.name.toString(),
          a.speed,
          a.speed,
          -1,
          a.flag,
          1,
          !1,
          !1,
          !1
        ),
        e.handle === localplayer.handle &&
          "smoothCancel" === t &&
          mp.events.callRemote("sPlayer-setAnimation", !1));
    }
    function l(e, t) {
      t
        ? mp.game.invoke("0xFFC24B988B938B38", e.handle, t, 0)
        : e.clearFacialIdleAnimOverride();
    }
    function n(e, t) {
      t
        ? (e.playFacialAnim("mic_chatter", "mp_facial"),
          e.talkingInteraval && clearInterval(e.talkingInteraval),
          (e.talkingInteraval = setInterval(() => {
            mp.players.exists(e)
              ? e.playFacialAnim("mic_chatter", "mp_facial")
              : (clearInterval(e.talkingInteraval), (e.talkingInteraval = !1));
          }, 5e3)))
        : (e.playFacialAnim(
            "mood_normal_1",
            "facials@gen_male@variations@normal"
          ),
          e.talkingInteraval &&
            (clearInterval(e.talkingInteraval), (e.talkingInteraval = !1)));
    }
    async function s(e, t) {
      if ((e.resetStrafeClipset(), t)) {
        if (!mp.game.streaming.hasClipSetLoaded(t))
          for (
            mp.game.streaming.requestClipSet(t);
            !mp.game.streaming.hasClipSetLoaded(t);

          )
            await misc.sleep();
        if (!mp.players.exists(e)) return;
        e.setMovementClipset(t, 0),
          "move_ped_crouched" === t &&
            e.setStrafeClipset("move_ped_crouched_strafing");
      } else e.resetMovementClipset(0);
    }
    function p(e, t) {
      t ? e.setAlpha(0) : e.setAlpha(255);
    }
    (async (e) => {
      for (
        mp.game.streaming.requestClipSet(e);
        !mp.game.streaming.hasClipSetLoaded(e);

      )
        await misc.sleep();
    })("move_ped_crouched_strafing"),
      mp.events.add("entityStreamIn", (e) => {
        if ("player" === e.type) {
          const t = e.getVariable("invisible");
          let a = e.getVariable("TATTOOS");
          a && misc.setTattoo(e, JSON.parse(a)), p(e, t);
          const i = e.getVariable("attachedToTrunk");
          if (i) {
            const t = mp.vehicles.atRemoteId(i.vehId);
            t &&
              e.attachTo(
                t.handle,
                t.getBoneIndexByName("bumper_r"),
                i.offX,
                i.offY,
                i.offZ,
                i.rotX,
                i.rotY,
                i.rotZ,
                !1,
                !1,
                !1,
                !1,
                2,
                !0
              );
          }
          const o = e.getVariable("animation");
          o && r(e, o),
            l(e, e.getVariable("emotion")),
            s(e, e.getVariable("walking")),
            n(e, e.getVariable("talking"));
        }
      }),
      mp.events.addDataHandler("attachedToTrunk", (e, t) => {
        if ("player" == e.type)
          if (t) {
            const a = mp.vehicles.atRemoteId(t.vehId);
            a &&
              e.attachTo(
                a.handle,
                a.getBoneIndexByName("bumper_r"),
                t.offX,
                t.offY,
                t.offZ,
                t.rotX,
                t.rotY,
                t.rotZ,
                !1,
                !1,
                !1,
                !1,
                2,
                !0
              );
          } else e.detach(!0, !1);
      }),
      mp.events.addDataHandler("animation", (e, t) => {
        if ("player" == e.type) {
          if (e.handle === localplayer.handle && t)
            if ("smoothCancel" === t) {
              if (o) {
                const t = JSON.parse(localplayer.getVariable("weapons"));
                for (const a in t)
                  if (t[a] >> 0 === o) {
                    natives.SET_CURRENT_PED_WEAPON(e.handle, o, !0), (o = !1);
                    break;
                  }
              }
            } else {
              const t = natives.GET_SELECTED_PED_WEAPON(localplayer.handle);
              -1569615261 !== t
                ? ((o = t),
                  natives.SET_CURRENT_PED_WEAPON(
                    e.handle,
                    mp.game.joaat("weapon_unarmed") >> 0,
                    !0
                  ))
                : (o = !1);
            }
          r(e, t);
        }
      }),
      mp.events.addDataHandler("TATTOOS", (e, t) => {
        if ("player" == e.type) {
          const a = JSON.parse(t);
          misc.setTattoo(e, a);
        }
      }),
      mp.events.addDataHandler("invisible", (e, t) => {
        "player" == e.type && p(e, t);
      }),
      mp.events.addDataHandler("emotion", (e, t) => {
        "player" === e.type && l(e, t);
      }),
      mp.events.addDataHandler("walking", (e, t) => {
        "player" === e.type && s(e, t);
      }),
      mp.events.addDataHandler("nearDeath", (e, t) => {
        "player" === e.type && mp.game.gameplay.setFadeOutAfterDeath(!1);
      }),
      mp.events.addDataHandler("talking", (e, t) => {
        "player" === e.type && n(e, t);
      }),
      mp.events.add({
        reloadTatoos: () => {
          const e = JSON.parse(localplayer.getVariable("TATTOOS"));
          misc.setTattoo(localplayer, e);
        },
      });
  },
  function (e, t, a) {
    a(64), a(62);
  },
  function (e, t) {
    const a = 327,
      i = 32,
      o = 33,
      r = 34,
      l = 35,
      n = 321,
      s = 326,
      p = 61;
    (global.fly = { flying: !1 }),
      (global.gameplayCam = mp.cameras.new("gameplay"));
    let m = null,
      d = null;
    mp.events.add("render", () => {
      const e = mp.game.controls,
        t = global.fly;
      if (
        ((m = global.gameplayCam.getDirection()),
        (d = global.gameplayCam.getCoord()),
        e.isControlJustPressed(0, a))
      ) {
        const a = mp.players.local;
        if (!a.getVariable("ADMIN")) return;
        if (
          (mp.events.call("cAntiCheatSleep"),
          (t.flying = !t.flying),
          a.freezePosition(t.flying),
          mp.events.callRemote("sPlayerInvisible", t.flying),
          !t.flying && !e.isControlPressed(0, n))
        ) {
          const e = mp.players.local.position;
          (e.z = mp.game.gameplay.getGroundZFor3dCoord(e.x, e.y, e.z, 0, !1)),
            mp.players.local.setCoordsNoOffset(e.x, e.y, e.z, !1, !1, !1);
        }
        mp.game.graphics.notify(
          t.flying ? "Fly: ~g~Enabled" : "Fly: ~r~Disabled"
        );
      } else if (t.flying) {
        let t = !1;
        const a = mp.players.local.position,
          d = e.isControlPressed(0, p) ? 3.5 : 0.4;
        e.isControlPressed(0, i)
          ? ((a.x += m.x * d), (a.y += m.y * d), (a.z += m.z * d), (t = !0))
          : e.isControlPressed(0, o) &&
            ((a.x -= m.x * d), (a.y -= m.y * d), (a.z -= m.z * d), (t = !0)),
          e.isControlPressed(0, r)
            ? ((a.x += -m.y * d), (a.y += m.x * d), (t = !0))
            : e.isControlPressed(0, l) &&
              ((a.x -= -m.y * d), (a.y -= m.x * d), (t = !0)),
          e.isControlPressed(0, n)
            ? ((a.z += d), (t = !0))
            : e.isControlPressed(0, s) && ((a.z -= d), (t = !0)),
          t && mp.players.local.setCoordsNoOffset(a.x, a.y, a.z, !1, !1, !1);
      }
    });
  },
  function (e, t) {
    let a = !1,
      i = !1;
    mp.events.add({
      cSpectateStart: (e, t, o) => {
        if (((i = t), t)) {
          mp.events.call("cAntiCheatSleep");
          const { x: t, y: i, z: r } = JSON.parse(o);
          (localplayer.position = { x: t, y: i, z: r - 10 }),
            localplayer.freezePosition(!0),
            setTimeout(() => {
              localplayer.freezePosition(!1),
                localplayer.attachTo(
                  e.handle,
                  12844,
                  0,
                  0,
                  -2,
                  0,
                  0,
                  0,
                  !1,
                  !1,
                  !1,
                  !1,
                  0,
                  !1
                ),
                (a = mp.cameras.new(
                  "spectate",
                  { x: t, y: i, z: r },
                  { x: 0, y: 0, z: 1.2 },
                  90
                )).attachTo(e.handle, 0, 2, 1, !1),
                a.setActive(!0),
                mp.game.cam.renderScriptCams(!0, !1, 0, !0, !1),
                a.setRot(0, 0, 160, 2);
            }, 1e3);
        } else
          localplayer.detach(!0, !1),
            a &&
              (a.setActive(!1),
              mp.game.cam.renderScriptCams(!1, !0, 0, !0, !0),
              a.destroy(),
              (a = !1));
      },
      cSpectateMoveCamera: (e) => {
        if (i && a) {
          const { x: t, y: i, z: o } = a.getRot(2);
          switch (e) {
            case "right":
              a.setRot(t, i, o - 10, 2);
              break;
            case "left":
              a.setRot(t, i, o + 10, 2);
              break;
            case "up":
              if (t >= 70) return;
              a.setRot(t + 10, i, o, 2);
              break;
            case "down":
              if (t <= -70) return;
              a.setRot(t - 10, i, o, 2);
          }
        }
      },
      cAdminNewReport: (e) => {
        let t = `storage.pushAdminTicket(${JSON.stringify(e)});`;
        (t += "storage.setReportSound(true);"),
          misc.injectCef(t),
          misc.notif("Открыт новый тикет");
      },
    });
  },
  function (e, t) {
    function a(e, t) {
      const a = { msg: e, type: t, date: new Date().toLocaleString() },
        i = `storage.pushAdminConsoleLog(${JSON.stringify(a)});`;
      misc.injectCef(i);
    }
    (console.info = function (...e) {
      a(e, "CLIENT_info");
    }),
      (console.log = function (...e) {
        a(e, "CLIENT_log");
      }),
      (console.warn = function (...e) {
        a(e, "CLIENT_warn");
      }),
      (console.error = function (...e) {
        a(e, "CLIENT_error");
      });
  },
  function (e, t) {
    const a = new (class {
      constructor() {
        mp.events.add("console.push", (e, t) => {
          if (-1 === ["log", "info", "warning", "error", "debug"].indexOf(e))
            return misc.injectCef(
              `consoleAPI(${JSON.stringify({
                type: "error",
                msg: "Тип лога не обнаружен!",
              })});`
            );
          const a = { type: e, msg: t };
          misc.injectCef(`consoleAPI(${JSON.stringify(a)});`);
        });
      }
    })();
    e.exports = a;
  },
  function (e, t) {
    const a = mp.players.local;
    mp.events.add({
      "cCharCreator-OpenMenu": () => {
        a.clearTasksImmediately(),
          (blocked.chat = !1),
          (blocked.cursor = !0),
          misc.createCam(402.6, -998.75, -98.7, 0, 0, 358, 45),
          mp.events.callRemote("sCharCreator-Start");
      },
      cCharCreatorEnd: () => {
        misc.openMenu("none"),
          misc.moveFromToAir("up"),
          misc.destroyCam(),
          (blocked.chat = !0),
          (blocked.cursor = !1),
          a.setDefaultComponentVariation();
      },
      "cCharCreator-UpdateFaceOptions": (e) => {
        const t = JSON.parse(e);
        for (let e = 0; e < t.length; e++) a.setFaceFeature(e, t[e]);
      },
      cCharCreatorCamFace: () => {
        misc.createCam(402.7, -998.35, -98.3, 0, 0, 358, 30);
      },
      cCharCreatorCamFull: () => {
        misc.createCam(402.6, -998.75, -98.8, 0, 0, 358, 45);
      },
      cCharCreatorRotPlayer: (e) => {
        var t = localplayer.getHeading();
        "l" === e ? (t -= 3) : (t += 3), localplayer.setHeading(t);
      },
    });
  },
  function (e, t, a) {
    const i = a(11);
    function o() {
      const e = mp.vehicles.toArray();
      e: for (let t = 0, a = i.length; t < a; t++) {
        for (let a = e.length - 1; a >= 0; a--) {
          const o = misc.vdist(i[t], e[a].position);
          if (o >= 150) e.splice(a, 1);
          else if (o <= 4) {
            i[t].free = !1;
            continue e;
          }
        }
        i[t].free = !0;
      }
      const t = `storage.setBoatPlaces(${JSON.stringify(i)});`;
      misc.injectCef(t);
    }
    !(function () {
      const e = -732.3775634765625,
        t = -1312.285400390625,
        a = 5.0003790855407715;
      mp.colshapes.newSphere(e, t, a, 1).harborShape = !0;
    })(),
      mp.events.add({
        cHarborOpenMenu: (e, t) => {
          o();
          let a = `storage.setPlayerHaveBoatPlace(${e});`;
          (a += `storage.setBoatTitle("${t}");`),
            misc.openMenu("fortisHarbor"),
            misc.injectCef(a);
        },
        cHarborEvacuate: (e) => {
          const t = i.find((t) => t.id === e),
            a = mp.vehicles.toArray();
          for (let e = a.length - 1; e >= 0; e--) {
            if (misc.vdist(t, a[e].position) <= 4)
              return misc.notif("Это место занято", "error"), void o();
          }
          mp.events.callRemote("sHarborSpawnBoat", e), misc.openMenu("none");
        },
      });
  },
  function (e, t, a) {
    const i = a(12),
      o = a(3),
      r = {
        name: "Jessica",
        text: "Мне недавно позвонил отец, у него гитара сломалась, он меня попросил чтобы я привезла, а у меня тоже времени нету. Купить её можно только в магазине электроники, можешь привезти её ему за меня? Вот деньги на покупку.",
        answers: [
          { text: "Я займусь этим.", action: "sQuestionGuitarStart" },
          { text: "Может быть позже.", action: "exit" },
        ],
      },
      l = {
        name: "Stanley",
        text: "Спасибо тебе большое. Не зря я в тебя поверил! Видел ведь что ты хороший человек. Вижу ты уже успел(а) осесть в нашем штате, но всё ещё впереди. Ты прошел только через малую часть того, с чем тебе предстоит столкнутся в будущем. Я уверен - ты найдешь свое место в этом штате, возможности в котором безграничны! Удачи тебе!",
        answers: [
          {
            text: "Спасибо и тебе того же!",
            action: "next",
            nextDialog: {
              name: "Stanley",
              text: "Раз уж такое дело пошло, есть у меня одна давняя заначка, которой я вряд ли уже воспользуюсь, но тебе думаю будет в самый раз. Для этого тебе необходимо будет купить лопату и поехать выкопать заначку, я тебе отправлю её координаты. Был рад знакомству, будет скучно - заезжай.",
              answers: [
                {
                  text: "Обязательно, спасибо тебе за всё.",
                  action: "sQuestStartStash",
                },
              ],
            },
          },
        ],
      },
      n = {
        main: [
          {
            name: "",
            questType: "govCarSteal",
            text: `Нужно чтобы ты взломал автомобиль ?? и привёз его ко мне. Для выполнения задания я дам тебе 3 отмычки, если понадобится ещё - покупай за свои деньги у байкеров. По завершению задания - приходи ко мне, я вознагражу тебя ${o.govCarSteal}$`,
            answers: [
              { text: "Я возьмусь за это.", action: "sCrimeQuestGovCarSteal" },
              { text: "В другой раз.", action: "exit" },
            ],
          },
          {
            name: "",
            questType: "eliteCarSteal",
            text: `Привези мне автомобиль ??. Я покажу тебе на GPS где он находится, тебе необходимо будет взломать его и пригнать сюда, но будь осторожен! Полиция сразу же узнает об угоне и будет тебя искать. Для выполнения задания я дам тебе 3 отмычки, если понадобится ещё - покупай за свои деньги у байкеров. По завершению задания - приходи ко мне, я вознагражу тебя ${o.eliteCarSteal}$`,
            answers: [
              {
                text: "Я возьмусь за это.",
                action: "sCrimeQuestEliteCarSteal",
              },
              { text: "В другой раз.", action: "exit" },
            ],
          },
          {
            name: "",
            questType: "houseBreakIn",
            text: `Мне необходимо напакостить кое-кому.. Если вкратце, взломай шкаф дома №??, можешь забрать всё что будет внутри, это неважно. Важен сам факт взлома. Для выполнения задания я дам тебе 3 отмычки, если понадобится ещё - покупай за свои деньги у байкеров. По завершению задания - приходи ко мне, я вознагражу тебя ${o.houseBreakIn}$`,
            answers: [
              { text: "Я возьмусь за это.", action: "sCrimeQuestHouseBreakIn" },
              { text: "В другой раз.", action: "exit" },
            ],
          },
          {
            name: "",
            questType: "capture",
            text: `Мне необходимо навести шороху в нашем штате для моих дел.. Короче, нужно чтобы ваша организация захватила ?? в ближайшие 24 часа. Я вам за это на общак закину ${o.capture}$`,
            answers: [
              { text: "Я возьмусь за это.", action: "sCrimeQuestCapture" },
              { text: "В другой раз.", action: "exit" },
            ],
          },
        ],
        island: [
          {
            name: "",
            questType: "weapon",
            text: "Мне нужны ?? в количестве ??? штук. На все про все у тебя будет 24 часа. Не успеешь - я стрясу с вашего общака штраф в размере награды. Если выполнишь - я дам тебе ????$ на общак организации.",
            answers: [
              { text: "Я возьмусь за это.", action: "sCrimeQuestWeapon" },
              { text: "В другой раз.", action: "exit" },
            ],
          },
        ],
      },
      s = {
        name: "",
        text: "Что конкретно?",
        answers: [
          {
            text: "Я пришел за наградой.",
            action: "next",
            nextDialog: {
              name: "",
              text: "Отлично, вот твои ??$. Приходи ещё, у меня всегда найдется работа",
              answers: [{ text: "Ок", action: "sCrimeQuestReward" }],
            },
          },
          { text: "Ничего, ошибся.", action: "exit" },
        ],
      },
      p = {
        name: "",
        text: "Приходи позже",
        answers: [{ text: "Хорошо.", action: "exit" }],
      },
      m = {
        meatFactory: {
          type: "meatFactory",
          name: "Oscar",
          text: "Ты почему еще без формы?! Быстро прошел в дверь позади меня и приступил за работу!!",
          answers: [
            { text: "Есть! Так точно! Разрешите выполнять?", action: "exit" },
          ],
        },
        goldenFish: {
          type: "goldenFish",
          name: "George",
          text: "Приветствую тебя, путник! Любишь рыбу ловить? Если поймаешь золотую рыбку - срочно неси мне! Я тебя за это очень хорошо отблагодарю.",
          answers: [
            {
              text: "Если поймаю, привезу тебе",
              action: "next",
              nextDialog: {
                type: "goldenFish",
                name: "George",
                text: "Спасибо! Я буду здесь тебя ждать.",
                answers: [{ text: "Хорошо, удачи", action: "exit" }],
              },
            },
            {
              text: "Я принёс тебе золотую рыбку",
              action: "sFishingGoldenFish",
            },
          ],
        },
        carDeliver: {
          type: "carDeliver",
          name: "Скупщик",
          text: "Здорова, с чем пожаловал?",
          answers: [
            {
              text: "Хочу продать тебе машину.",
              action: "next",
              nextDialog: {
                type: "sellPlayerVeh",
                name: "Скупщик",
                text: "Я могу предложить тебе ?? баксов за эту машину.",
                answers: [
                  { text: "Я согласен!", action: "sDialogSellRobCar" },
                  { text: "Понял, приеду в другой раз.", action: "exit" },
                ],
              },
            },
            {
              text: "Не найдется ли у тебя какой нибудь работы для меня?",
              action: "next",
              nextDialog: {
                type: "civilNotif",
                name: "Скупщик",
                text: "Для таких как ты у меня работы нет",
                answers: [{ text: "Выйти", action: "exit" }],
              },
            },
            {
              text: "Хочу сдать тебе инкасcаторскую машину",
              action: "next",
              nextDialog: {
                type: "civilNotif",
                name: "Скупщик",
                text: "Какая машина?, ты что во мне дурака увидел",
                answers: [{ text: "Выйти", action: "exit" }],
              },
            },
          ],
        },
        carDeliverCrime: {
          type: "carDeliverCrime",
          name: "Скупщик",
          text: "Здорова, с чем пожаловал?",
          answers: [
            {
              text: "Хочу продать тебе машину.",
              action: "next",
              nextDialog: {
                name: "Скупщик",
                type: "sellPlayerVeh",
                text: "Я могу предложить тебе ?? баксов за эту машину.",
                answers: [
                  { text: "Я согласен!", action: "sDialogSellRobCar" },
                  { text: "Понял, приеду в другой раз.", action: "exit" },
                ],
              },
            },
            {
              text: "Не найдется ли у тебя какой нибудь работы для меня?",
              action: "next",
              nextDialog: {
                name: "Скупщик",
                text: "Да есть одно задание, я дам тебе ключи от машины, пригони мне её.",
                answers: [
                  {
                    text: "Хорошо, я возьмусь за дело.",
                    action: "sCarDeliverStart",
                  },
                  { text: "Мне нужно подумать.", action: "exit" },
                ],
              },
            },
            {
              text: "Хочу сдать тебе инкасcаторскую машину",
              action: "next",
              nextDialog: {
                name: "Скупщик",
                text: "Какая машина?, ты что во мне дурака увидел",
                answers: [{ text: "Выйти", action: "exit" }],
              },
            },
          ],
        },
        stanleyQuestFirst: {
          name: "Stanley",
          text: "Здоровья тебе незнакомец, не выручишь дядьку?",
          answers: [
            {
              text: "Что нужно?",
              action: "next",
              nextDialog: {
                name: "Stanley",
                text: "Да вот я тут гидом подрабатываю, жду туристов, своих потенциальных клиентов. Жарковато сегодня, мне пивка захотелось, но уходить я отсюда не хочу, вдруг клиенты появятся. Сгоняешь мне за пивом? Я тебе деньги дам.",
                answers: [
                  {
                    text: "Где мне здесь пиво купить?",
                    action: "next",
                    nextDialog: {
                      name: "Stanley",
                      text: `Как где? Да в обычном продуктовом магазине 24/7<img src='img/dialog/Blip_52.png' alt=''>. У нас их в штате полно. Вот тебе ${o.stanleyBeer}$, заодно себе перекусить купишь, с дороги проголодался небось.`,
                      answers: [
                        {
                          text: "Хорошо, жди меня здесь, я пулей",
                          action: "next",
                          nextDialog: {
                            name: "Stanley",
                            text: "Погоди, ты хоть знаешь как добираться? Тут есть несколько вариантов для тебя. Можешь автобус дождаться, можешь такси вызвать с таксофона напротив меня, или же воспользуйся арендой мопедов, это там через дорогу Donald их выдает.",
                            answers: [
                              {
                                text: "Спасибо что обьяснил.",
                                action: "sQuestStartStanleyBeer",
                              },
                              {
                                text: "Мог и не объяснять, я сам в курсе.",
                                action: "sQuestStartStanleyBeer",
                              },
                            ],
                          },
                        },
                        { text: "Нет, я передумал.", action: "exit" },
                      ],
                    },
                  },
                  { text: "Нет, у меня своих дел по горло.", action: "exit" },
                ],
              },
            },
            { text: "Нет, у меня своих дел по горло.", action: "exit" },
          ],
        },
        stanleyQuestBeer: {
          name: "Stanley",
          text: "Ну что? Я уже заждался, где мое пиво?",
          answers: [
            {
              text: "Вот, я принёс бутылочку.",
              action: "next",
              callEvent: "sQuestRemoveBeer",
              nextDialog: {
                name: "Stanley",
                text: "Cпасибо тебе дружище, выручил, а то у меня уже горло пересохло. Ты там вообще как? Чё делать думаешь?",
                answers: [
                  {
                    text: "А есть предложение?",
                    action: "next",
                    nextDialog: {
                      name: "Stanley",
                      text: "У меня есть знакомый, Бен его зовут, он фермой заведует, между прочим продукты с этой фермы нам в магазины поставляют дальнобойщики и мы питаемся ими. Если там работа встанет, то нам придется одним мясом питаться с мясокомбината. Так вот, езжай на ферму к нему, скажи что ты от Стенли, у него передо мной незакрытый должок, он тебе сверх нормы денег даст.",
                      answers: [
                        {
                          text: "Спасибо, так и сделаю, только покажи мне где ферма находиться.",
                          action: "next",
                          nextDialog: {
                            name: "Stanley",
                            text: "Она находится в Сэнди-Шорс, район Грейпсид. Туда езжай, там сразу поймешь где именно ферма. Бен обычно у рабочего помещения обитает.",
                            answers: [
                              {
                                text: "Благодарю, я погнал.",
                                action: "sQuestStartFarmPoint",
                              },
                            ],
                          },
                        },
                        {
                          text: "Спасибо, я погнал на ферму.",
                          action: "sQuestStartFarm",
                        },
                      ],
                    },
                  },
                  {
                    text: "Да у меня свои дела в штате есть, я пошел.",
                    action: "exit",
                  },
                ],
              },
            },
            { text: "Нет, скоро принесу.", action: "exit" },
          ],
        },
        stanleyQuestNoQuest: {
          name: "Stanley",
          text: "Привет, у меня сейчас нет для тебя поручений, но в будущем возможно появятся.",
          answers: [{ text: "Привет, буду в курсе.", action: "exit" }],
        },
        benQuestFarmStart: {
          name: "Ben",
          text: "Ты кто? Опять с налоговой пришли? Всё у меня чисто, уже ведь это проходили.",
          answers: [
            {
              text: "Нет, я от Стенли, он сказал ты работу подкинешь.",
              action: "next",
              nextDialog: {
                name: "Ben",
                text: "А, точно! Он ведь со мной связывался, говорил что ты прийти можешь. У меня срочный заказ, нужно собрать и принести на склад 5 полных корзин. Я тебе доплачу за срочность, как принесешь - приходи ко мне. Кстати, пока ты будешь работать повар начнет готовить паек, если дождешься 30 минут - сможешь у Майкла поесть нахаляву.",
                answers: [
                  {
                    text: "Хорошо, сейчас всё будет. Только как мне начать работать?",
                    action: "next",
                    nextDialog: {
                      name: "Ben",
                      text: "Спереди этого здания стоит Габриель, у него устройся фермером. Там же найдешь шкафчики с рабочей одеждой, выбери себе по размеру.",
                      answers: [
                        { text: "Спасибо.", action: "sQuestFarmStarted" },
                      ],
                    },
                  },
                  {
                    text: "Отлично, сейчас выполню.",
                    action: "sQuestFarmStarted",
                  },
                ],
              },
            },
            { text: "Я позже подойду.", action: "exit" },
          ],
        },
        benQuestFarmEnd: {
          name: "Ben",
          text: "Ну что там? Выполнил моё поручение?",
          answers: [
            {
              text: "Да, всё готово.",
              action: "next",
              callEvent: "sQuestFarmEnd",
              nextDialog: {
                name: "Ben",
                text: `Отлично, вот тебе от меня ${o.farm}$. По-мимо этого у меня ещё есть небольшое поручение.`,
                answers: [
                  {
                    text: "Что за поручение?",
                    action: "next",
                    nextDialog: {
                      name: "Ben",
                      text: "У меня тут в генераторе закончился дизель, а у меня самого работы полно. Нужно чтобы ты съездил на заправку, которая тут неподалеку, купить в магазине у заправки канистру и у колонки наполнить в канистру 20 литров дизеля. Я дам тебе 1000$, сдачу себе оставишь.",
                      answers: [
                        {
                          text: "Я согласен, сейчас принесу.",
                          action: "sQuestStartFuelFarm",
                        },
                        { text: "Может позже возьмусь.", action: "exit" },
                      ],
                    },
                  },
                  { text: "Спасибо за деньги, я пошел.", action: "exit" },
                ],
              },
            },
            { text: "Нет, ещё нужно поработать.", action: "exit" },
          ],
        },
        benQuestFuelFarmStart: {
          name: "Ben",
          text: "У меня тут в генераторе закончился дизель, а у меня самого работы полно. Нужно чтобы ты съездил на заправку, которая тут неподалеку, купить в магазине у заправки канистру и у колонки наполнить в канистру 20 литров дизеля. Я дам тебе 1000$, сдачу себе оставишь.",
          answers: [
            {
              text: "Я согласен, сейчас принесу.",
              action: "sQuestStartFuelFarm",
            },
            { text: "Может позже возьмусь.", action: "exit" },
          ],
        },
        benQuestFuelFarmEnd: {
          name: "Ben",
          text: "Ну что принес мне канистру дизеля?",
          answers: [
            {
              text: "Да, вот держи.",
              action: "next",
              nextDialog: {
                name: "Ben",
                text: "Спасибо, очень выручил. Кстати, вот тебе совет по нашей дружбе. Езжай-ка в мерию, получи регистрацию в штате, она тебе ещё ой как понадобиться, у меня там дочь работает, Jessica зовут к ней и приходи.",
                answers: [
                  { text: "Так и сделаю.", action: "sQuestEndFuelFarm" },
                ],
              },
            },
            { text: "Ещё нет.", action: "exit" },
          ],
        },
        benQuestNoQuest: {
          name: "Ben",
          text: "Привет, снова поработать пришел?",
          answers: [
            { text: "Случайно проходил, зашел поздороваться.", action: "exit" },
          ],
        },
        jessicaQuestFromBen: {
          name: "Jessica",
          text: "Здравствуйте, чем могу Вам помочь?",
          answers: [
            {
              text: "Я от Вашего отца Бена.",
              action: "next",
              nextDialog: {
                name: "Jessica",
                text: "Ах, да, он предупреждал о Вас. Смотрите, вот около меня стоит Линда, получите у неё прописку и подходите ко мне, я подскажу чем заняться далее.",
                answers: [
                  {
                    text: "Так и сделаю.",
                    action: "sQuestDocumentTalkJessica",
                  },
                ],
              },
            },
            { text: "Ничем, обознался.", action: "exit" },
          ],
        },
        linda: {
          name: "Linda",
          text: "Здравствуйте, чем могу Вам помочь?",
          answers: [
            {
              text: "Я бы хотел получить регистрацию в штате.",
              action: "next",
              nextDialog: {
                name: "Linda",
                text: "Регистрация в штате будет стоить - 500$, Вы готовы оплатить эту сумму?",
                answers: [
                  { text: "Да, конечно.", action: "sGovGetRegistraton" },
                  { text: "Нет, не сейчас.", action: "exit" },
                ],
              },
            },
            {
              text: "Я бы хотел продать государству свое имущество.",
              action: "sGovOpenSellToGovMenu",
            },
            { text: "Извините, ничем.", action: "exit" },
          ],
        },
        lindaRegistration: {
          name: "Linda",
          text: "Вот Вам обновленный паспорт, теперь уже с печатью нашего штата. С данного момента Вы можете официально устроится на любую работу, даже в государственных структурах.",
          answers: [{ text: "Благодарю Вас.", action: "exit" }],
        },
        jessicaQuestDocument: {
          name: "Jessica",
          text: "Ну что, получили регистрацию в штате?",
          answers: [
            {
              text: "Да.",
              action: "next",
              nextDialog: {
                name: "Jessica",
                text: `Отлично, теперь Вам необходимо получить права категории А, для того чтобы пойти на работу электриком, но я могу предложить Вам перед этим немного поработать на мясокомбинате. Видите-ли у нас не так давно стартовала интересная инициатива, каждый человек после получения регистрации может сдать на мясокомбинате 5 ящиков мяса и получить за это ${o.butcher}$ сверх стандартной ставки.`,
                answers: [
                  {
                    text: "Хм, звучит интересно. Я бы поработал на мясокомбинате.",
                    action: "next",
                    nextDialog: {
                      name: "Jessica",
                      text: "Хорошо, отправляйтесь на мясокомбинат, тот который находится в промышленном районе Эль-Бурро-Хайтс, что на юго-востоке города. После того как сдадите 5 ящиков с мясом - возвращайтесь ко мне, я выдам вознаграждение.",
                      answers: [
                        {
                          text: "Так и сделаю.",
                          action: "sQuestButcherJobStart",
                        },
                        { text: "Я передумал.", action: "exit" },
                      ],
                    },
                  },
                  {
                    text: "У меня достаточно денег, я хочу сразу получить права.",
                    action: "next",
                    nextDialog: {
                      name: "Jessica",
                      text: "Хорошо, а мед-карта то у Вас есть?",
                      answers: [
                        {
                          text: "Да.",
                          action: "next",
                          nextDialog: {
                            name: "Jessica",
                            text: 'Отлично, тогда отправляйтесь в автошколу для получения прав категории "А", она находится в районе Ла-Пуэрта, что на юго-западе города. После этого возвращайтесь ко мне за небольшим подарком.',
                            answers: [
                              {
                                text: "Хорошо, спасибо.",
                                action: "sQuestSkipButcherToDrivingSchool",
                              },
                            ],
                          },
                        },
                        {
                          text: "Нет, а где мне её получить?",
                          action: "next",
                          nextDialog: {
                            name: "Jessica",
                            text: "Аа, ну тогда Вам ещё нужно в больницу съездить за мед-картой. Там на ресепшене стоит Сандра, она может Вам её оформить. После того как получите мед-карту, сразу отправляйтесь в автошколу,она находится в районе Ла-Пуэрта, что на юго-западе города.После этого возвращайтесь ко мне за небольшим подарком.",
                            answers: [
                              {
                                text: "Так и сделаю, спасибо.",
                                action: "sQuestSkipButcherToMedLic",
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            { text: "Еще нет.", action: "exit" },
          ],
        },
        jessicaQuestButcherEnd: {
          name: "Jessica",
          text: "Здравствуйте, ну что? Отнесли на склад 5 ящиков с мясом?",
          answers: [
            {
              text: "Да.",
              action: "next",
              nextDialog: {
                name: "Jessica",
                text: `Отлично, вот держите Ваши ${o.butcher}$! Теперь Вам нужно отправляться в больницу для получения мед-карты. Её может выдать Сандра, она стоит прямо на ресепшене. После того как получите мед-карту, сразу отправляйтесь в автошколу для получения прав категории "А", она находится в районе Ла-Пуэрта, что на юго-западе города.`,
                answers: [
                  {
                    text: "Спасибо, так и сделаю.",
                    action: "sQuestButcherJobEnd",
                  },
                ],
              },
            },
            { text: "Нет.", action: "exit" },
          ],
        },
        jessicaQuestDocumentEnd: {
          name: "Jessica",
          text: "Здравствуйте, как прогресс с получением прав?",
          answers: [
            {
              text: "Всё хорошо, получил права.",
              action: "next",
              callEvent: "sQuestDocumentEnd",
              nextDialog: {
                name: "Jessica",
                text: "Поздравляю, Вы заслужили бонус. Теперь когда у Вас есть всё необходимое для работы электриком я могу предложить Вам им поработать, там сейчас очень острая нехватка рабочих, за работу сверх нормы выплачивают хорошие чаевые. Почините 5 щитков и возвращайтесь ко мне, я подготовлю все документы необходимые для выдачи премии.",
                answers: [
                  {
                    text: "Звучит интересно, давайте попробуем.",
                    action: "next",
                    nextDialog: {
                      name: "Jessica",
                      text: "Хорошо, тогда после починки 5 щитков возвращайтесь ко мне, я буду ждать Вас здесь. Компания CNT в которую и требуются рабочие находится на востоке района Вайнвуд Хиллз. Устраивайтесь, на парковке берите в аренду рабочий мопед и начинайте работать.",
                      answers: [
                        {
                          text: "Отлично, спасибо.",
                          action: "sQuestElectricStart",
                        },
                      ],
                    },
                  },
                  {
                    text: "Мне это не интересно, может быть позже.",
                    action: "exit",
                  },
                ],
              },
            },
            { text: "Ещё не получил, вернусь позже.", action: "exit" },
          ],
        },
        jessicaQuestStartElectric: {
          name: "Jessica",
          text: "Теперь когда у Вас есть всё необходимое для работы электриком я могу предложить Вам им поработать, там сейчас очень острая нехватка рабочих, за работу сверх нормы выплачивают хорошие чаевые. Почините 5 щитков и возвращайтесь ко мне, я подготовлю все документы необходимые для выдачи премии.",
          answers: [
            {
              text: "Звучит интересно, давайте попробуем.",
              action: "next",
              nextDialog: {
                name: "Jessica",
                text: "Хорошо, тогда после починки 5 щитков возвращайтесь ко мне, я буду ждать Вас здесь. Компания CNT в которую и требуются рабочие находится на востоке района Вайнвуд Хиллз. Устраивайтесь, на парковке берите в аренду рабочий мопед и начинайте работать.",
                answers: [
                  { text: "Отлично, спасибо.", action: "sQuestElectricStart" },
                ],
              },
            },
            { text: "Мне это не интересно, может быть позже.", action: "exit" },
          ],
        },
        jessicaQuestElectricEndWork: {
          name: "Jessica",
          text: "И снова Вы, как прогресс?",
          answers: [
            {
              text: "Я справился с задачей, было нелегко.",
              action: "next",
              callEvent: "sQuestElectricWorkEnd",
              nextDialog: {
                name: "Jessica",
                text: "Отлично, вот Вам деньги в знак вознаграждения за хорошую работу.\n*Говорит шепотом* А ещё, у нас уже давно на парковке стоит старый автомобиль который всё никак не могут утилизировать, можете забрать его и делайте с ним что хотите, главное чтобы место у нас на парковке не занимал. Я надеюсь у Вас имеются права на категорию B, место жительства и свободное место для машины?",
                answers: [
                  {
                    text: "Кое-чего не хватает.",
                    action: "next",
                    nextDialog: {
                      name: "Jessica",
                      text: "Ну смотрите, где получать права на вождение Вы уже в курсе, а поселиться можете в любом отеле, либо купить себе дом. Как всё сделаете - возвращайтесь ко мне за ключами.",
                      answers: [{ text: "Хорошо, спасибо.", action: "exit" }],
                    },
                  },
                  {
                    text: "У меня всё есть.",
                    action: "next",
                    nextDialog: {
                      name: "Jessica",
                      text: "*Говорит шепотом* Отлично, вот держите ключи. Автомобиль можете забрать у нас на парковке, Вы его точно узнаете.",
                      answers: [
                        {
                          text: "Хорошо, спасибо.",
                          action: "next",
                          callEvent: "sQuestElectricEnd",
                          nextDialog: r,
                        },
                      ],
                    },
                  },
                  { text: "Я подумаю.", action: "exit" },
                ],
              },
            },
            { text: "Пока ещё работаю над этим.", action: "exit" },
          ],
        },
        jessicaQuestElectricCarGet: {
          name: "Jessica",
          text: "*Говорит шепотом* А ещё, у нас уже давно на парковке стоит старый автомобиль который всё никак не могут утилизировать, можете забрать его и делайте с ним что хотите, главное чтобы место у нас на парковке не занимал. Я надеюсь у Вас имеются права на категорию B, место жительства и свободное место для машины?",
          answers: [
            {
              text: "Кое-чего не хватает.",
              action: "next",
              nextDialog: {
                name: "Jessica",
                text: "Ну смотрите, где получать права на вождение Вы уже в курсе, а поселиться можете в любом отеле, либо купить себе дом. Как всё сделаете - возвращайтесь ко мне за ключами.",
                answers: [{ text: "Хорошо, спасибо.", action: "exit" }],
              },
            },
            {
              text: "У меня всё есть.",
              action: "next",
              nextDialog: {
                name: "Jessica",
                text: "*Говорит шепотом* Отлично, вот держите ключи. Автомобиль можете забрать у нас на парковке, Вы его точно узнаете.",
                answers: [
                  {
                    text: "Хорошо, спасибо.",
                    action: "next",
                    callEvent: "sQuestElectricEnd",
                    nextDialog: r,
                  },
                ],
              },
            },
            { text: "Я подумаю.", action: "exit" },
          ],
        },
        jessicaQuestGuitarStart: r,
        jessicaQuestNoQuest: {
          name: "Jessica",
          text: "Привет, у меня сейчас нет для тебя поручений, но в будущем возможно появятся.",
          answers: [{ text: "Привет, буду в курсе.", action: "exit" }],
        },
        benQuestGuitar: {
          name: "Ben",
          text: "Привет, снова поработать пришел?",
          answers: [
            {
              text: "Нет, я гитару тебе принес. Джессика просила.",
              action: "next",
              callEvent: "sQuestGuitarEnd",
              nextDialog: {
                name: "Ben",
                text: "Ох, спасибо. Как обычно у детей нет времени мне помочь. Кстати, раз уж ты такой хороший парень, у меня есть для тебя работа. Мои рабочие говорят что в последнее время тяжко стало добираться на ферму, мол штат водителей автобусов сократился. Не хочешь устроится водителем автобуса на красном маршруте и проехать 3 рейса? Я тебе за это 3.000$ подкину.",
                answers: [
                  {
                    text: "Отлично, деньги мне лишними не будут.",
                    action: "sQuestBusStart",
                  },
                  { text: "Я подумаю.", action: "exit" },
                ],
              },
            },
            { text: "Случайно проходил, зашел поздороваться.", action: "exit" },
          ],
        },
        benQuestBusStart: {
          name: "Ben",
          text: "Кстати, раз уж ты такой хороший парень, у меня есть для тебя работа. Мои рабочие говорят что в последнее время тяжко стало добираться на ферму, мол штат водителей автобусов сократился. Не хочешь устроится водителем автобуса на красном маршруте и проехать 3 рейса? Я тебе за это 3.000$ подкину.",
          answers: [
            {
              text: "Отлично, деньги мне лишними не будут.",
              action: "sQuestBusStart",
            },
            { text: "Я подумаю.", action: "exit" },
          ],
        },
        benQuestBus: {
          name: "Ben",
          text: "Как там новая работёнка",
          answers: [
            {
              text: "Я всё выполнил.",
              action: "next",
              callEvent: "sQuestBusEnd",
              nextDialog: {
                name: "Ben",
                text: "Выручил, а то без тебя бы тут всё сорняками поросло. Вот возьми деньги. Если интересно то у меня ещё работа есть, нужно 10 рейсов отвезти со склада по заводам, а то у меня амбары переполнены. Займешься этим? Я тебя хорошо отблагодарю за это.",
                answers: [
                  { text: "Я возьмусь за это.", action: "sQuestTruckerStart" },
                  { text: "Я подумаю.", action: "exit" },
                ],
              },
            },
            { text: "Пока ещё работаю над этим.", action: "exit" },
          ],
        },
        benQuestTruckerStart: {
          name: "Ben",
          text: "Если интересно то у меня ещё работа есть, нужно 10 рейсов отвезти со склада по заводам, а то у меня амбары переполнены. Займешься этим? Я тебя хорошо отблагодарю за это.",
          answers: [
            { text: "Я возьмусь за это.", action: "sQuestTruckerStart" },
            { text: "Я подумаю.", action: "exit" },
          ],
        },
        benQuestTrucker: {
          name: "Ben",
          text: "Ну что там? Есть прогресс?",
          answers: [
            {
              text: "Да, я как раз закончил.",
              action: "next",
              callEvent: "sQuestTruckerEnd",
              nextDialog: {
                name: "Ben",
                text: "Отлично, действительно Стенли не ошибся в тебе когда порекомендовал тебя мне. Не мог бы ты в знак благодарности отвезти ему от меня бутылку пива, он будет очень этому рад?",
                answers: [
                  {
                    text: "Конечно, какие могут быть вопросы.",
                    action: "sQuestBeerForStanleyStart",
                  },
                  { text: "Может быть в следующий раз.", action: "exit" },
                ],
              },
            },
            { text: "Пока в процессе.", action: "exit" },
          ],
        },
        benQuestStartStanleyBeer: {
          name: "Ben",
          text: "Стенли не ошибся в тебе когда порекомендовал тебя мне. Не мог бы ты в знак благодарности отвезти ему от меня бутылку пива, он будет очень этому рад",
          answers: [
            {
              text: "Конечно, какие могут быть вопросы.",
              action: "sQuestBeerForStanleyStart",
            },
            { text: "Может быть в следующий раз.", action: "exit" },
          ],
        },
        stanleyQuestBeerForStanley: {
          name: "Stanley",
          text: "Привет друг, какими судьбами?",
          answers: [
            {
              text: "Привет, Бени попросил передать тебе пивка, сказал ты будешь этому рад.",
              action: "next",
              callEvent: "sQuestBeerForStanleyEnd",
              nextDialog: l,
            },
            { text: "Привет, просто поздороваться зашел.", action: "exit" },
          ],
        },
        stanleyQuestStashStart: l,
        hospital: {
          name: "Sandra",
          text: "Здравствуйте, что Вы желаете?",
          answers: [
            {
              text: "Я бы хотел подлечиться.",
              action: "next",
              nextDialog: {
                name: "Sandra",
                text: "Отлично, курс лечения в нашей больнице стоит 250$. Вы готовы оплатить эту сумму?",
                answers: [
                  { text: "Да, вот возьмите.", action: "sHospital-heal" },
                  { text: "Нет, не сейчас.", action: "exit" },
                ],
              },
            },
            {
              text: "Я бы хотел получить мед-карту.",
              action: "next",
              nextDialog: {
                name: "Sandra",
                text: "Отлично, для получения мед-карты необходимо оплатить 1300$. Вы готовы оплатить эту сумму?",
                answers: [
                  {
                    text: "Да, вот возьмите.",
                    action: "sHospitalBuyMedicalCard",
                  },
                  { text: "Нет, не сейчас.", action: "exit" },
                ],
              },
            },
            {
              text: "Я бы хотел продлить мед-карту.",
              action: "next",
              nextDialog: {
                name: "Sandra",
                text: "Отлично, для продления мед-карты необходимо оплатить 1300$. Вы готовы оплатить эту сумму?",
                answers: [
                  {
                    text: "Да, вот возьмите.",
                    action: "sHospitalBuyMedicalCard",
                  },
                  { text: "Нет, не сейчас.", action: "exit" },
                ],
              },
            },
            { text: "Ничего.", action: "exit" },
          ],
        },
        faggioRentFree: {
          name: "rentName",
          text: "Здравствуй, ты за мопедом? Для тебя как для новоприбывшего в штат он бесплатный, но рассчитывай на то что аренда длиться ровно 1 час. . И... кхе-кхе... ты с помощью телефона можешь продлить аренду за 500 $ в час, ну или отказаться от нее. Также можешь его вернуть мне лично.",
          answers: [
            {
              text: "Да, мне мопед, пожалуйста.",
              action: "sVehicleGetFaggioFree",
            },
            { text: "Нет, мне он сейчас не нужен.", action: "exit" },
          ],
        },
        faggioRentPay: {
          name: "rentName",
          text: "Здравствуй, ты за мопедом? Аренда на 1 час стоит 500$. И... кхе-кхе... ты с помощью телефона можешь продлить аренду, ну или отказаться от нее. Также можешь его вернуть мне лично.",
          answers: [
            {
              text: "Да, мне мопед, пожалуйста.",
              action: "sVehicleGetFaggioPay",
            },
            { text: "Нет, мне он сейчас не нужен.", action: "exit" },
          ],
        },
        faggioRentNoRent: {
          name: "rentName",
          text: "О, привет, хочешь вернуть мне мопед? Только... кхе-кхе... деньги за неиспользованное время я не верну.",
          answers: [
            {
              text: "Я хочу вернуть тебе мопед",
              action: "sVehicleCloseRentToRenter",
            },
            { text: "Нет, я передумал.", action: "exit" },
          ],
        },
        newYearQuestStart: {
          name: "Режиссер",
          text: "Ей, нет времени объяснять, скажу вкратце. Мы снимаем фильм про Новый год, все дела.. И не успеваем в сроки! А это всё этот чёртов Джексонс, ух и кто же его одобрил на главную роль.. Короче, неважно, перейдём к делу. Мне нужен был кое-какой новогодний реквизит для кадра и я решил заказать его в интернете.. ЭТО. БЫЛА. БОЛЬШАЯ. ОШИБКА. Я случайно не указал адрес доставки и они сумки с реквизитом просто положили по всему штату! Выручи меня, найди реквизит и я очень хорошо отблагодарю тебя.",
          answers: [
            {
              text: "Звучит заманчиво, я в деле.",
              action: "sQuestNewYearStart",
            },
            { text: "Сейчас мне это не интересно.", action: "exit" },
          ],
        },
        newYearQuestEnd: {
          name: "Режиссер",
          text: "Ну что там, ты нашёл мой реквизит?",
          answers: [
            {
              text: "Да, и чтобы ты знал носить 100 сумок не так уж и легко!",
              action: "next",
              nextDialog: {
                name: "Режиссер",
                text: "Знал бы ты как я тебе благодарен! Вот возьми, это из реквизита. С новым годом тебя! Этот год был конечно паршивым, но ничего! Наверстаем в следующем! Всё, я что-то разговорился. Проваливай отсюда, у тебя что своих дел нет?",
                answers: [
                  {
                    text: "Можно было бы и вежливее, но спасибо! И тебя с новым годом.",
                    action: "sQuestNewYearEnd",
                  },
                ],
              },
            },
            { text: "Придержи коней, скоро всё будет.", action: "exit" },
          ],
        },
        newYearQuestNoQuest: {
          name: "Режиссер",
          text: "Я занят, не мешай мне.",
          answers: [{ text: "Как скажешь.", action: "exit" }],
        },
        crime: {
          name: "",
          text: "Здарова братан, чего тебе?",
          answers: [
            {
              text: "Хочу продать тебе товар.",
              action: "openPage",
              page: "blackMarket",
            },
            {
              text: "Хочу взять у тебя задание.",
              action: "next",
              nextDialog: {},
            },
            {
              text: "Хочу отмыть у тебя меченные деньги.",
              action: "next",
              nextDialog: {
                name: "",
                text: "Я заберу у тебя ??% от суммы и дам остальную сумму чистыми деньгами",
                answers: [
                  {
                    text: "Хорошо, вот тебе ??$ грязными.",
                    action: "next",
                    nextDialog: {
                      name: "",
                      text: "Хорошо, вот твои ??$.",
                      answers: [
                        {
                          text: "Благодарю.",
                          action: "sCrimeChangeDirtyMoney",
                        },
                      ],
                    },
                  },
                  { text: "Я передумал, удачи.", action: "exit" },
                ],
              },
            },
            { text: "Извини, я просто потерялся.", action: "exit" },
          ],
        },
        cocaine: {
          name: "Gustavo",
          text: "Хола! Тебе чего?",
          answers: [
            {
              text: "Хочу у тебя взять порошок.",
              action: "next",
              nextDialog: {
                name: "Gustavo",
                text: "У меня есть ?? грамм порошка, я тебе могу их отдать по 150$ за грамм. Всего с тебя ???$. Если берешь - через 5 минут всё будет готово.",
                answers: [
                  { text: "Я возьму у тебя всё.", action: "sCrimeGetCocaine" },
                  { text: "Заеду в следующий раз.", action: "exit" },
                ],
              },
            },
            { text: "Я позже заскочу.", action: "exit" },
          ],
        },
        cocaineComeLater: {
          name: "Gustavo",
          text: "Хола! Тебе чего?",
          answers: [
            {
              text: "Хочу у тебя взять порошок.",
              action: "next",
              nextDialog: {
                name: "Gustavo",
                text: "Приезжай завтра, сегодняшнюю партию я уже продал.",
                answers: [{ text: "Ладно, завтра заеду.", action: "exit" }],
              },
            },
            { text: "Я позже заскочу.", action: "exit" },
          ],
        },
      };
    mp.events.add({
      cDialogOpen: (e) => {
        const t = misc.cloneObj(m[e.dialogType]);
        t.id = e.id;
        let a = "",
          r = {};
        if ((e.pedName && (t.name = e.pedName), "goldenFish" === e.dialogType))
          !1 === e.haveFish && (t.answers[1].inactive = !0);
        else if (
          "carDeliver" === e.dialogType ||
          "carDeliverCrime" === e.dialogType
        )
          e.sellPlayerVeh
            ? (t.answers[0].nextDialog.text =
                t.answers[0].nextDialog.text.replace(
                  "??",
                  e.sellPlayerVehPrice
                ))
            : (t.answers[0].inactive = !0),
            "carDeliverCrime" === e.dialogType &&
              e.sellCashCollectorCar &&
              ((t.answers[2].nextDialog.text = "Отлично, держи бабло."),
              (t.answers[2].nextDialog.answers[0].action = "sDialogRobCar")),
            e.carDeliverQuest &&
              ((t.answers[1].nextDialog.text = "Ты уже работаешь на меня"),
              (t.answers[1].nextDialog.answers = [
                { text: "Ах да, забыл", action: "exit" },
              ]),
              t.answers.push({
                text: "Я выполнил твое задание, хотел бы получить за это вознаграждение",
                action: "next",
                nextDialog: {
                  name: "Скупщик",
                  text: "Какое вознаграждение?, ты что во мне дурака увидел.",
                  answers: [{ text: "Выйти", action: "exit" }],
                },
              }),
              e.carDeliverHaveCar &&
                ((t.answers[3].nextDialog.text = "Отлично, держи бабло."),
                (t.answers[3].nextDialog.answers[0].action =
                  "sCarDeliverEnd")));
        else if ("stanleyQuestFirst" === e.dialogType)
          misc.notif("Помогите Stanley чтобы начать стартовый квест");
        else if ("stanleyQuestBeer" === e.dialogType)
          !1 === e.haveBeer && (t.answers[0].inactive = !0);
        else if ("benQuestFarmStart" === e.dialogType)
          !1 === e.canStartFarmQuest && (t.answers[0].inactive = !0);
        else if ("benQuestFarmEnd" === e.dialogType)
          !1 === e.canEndQuest && (t.answers[0].inactive = !0);
        else if ("benQuestFuelFarmEnd" === e.dialogType)
          !1 === e.haveFuel && (t.answers[0].inactive = !0);
        else if ("linda" === e.dialogType)
          !0 === e.registration && (t.answers[0].inactive = !0);
        else if ("jessicaQuestFromBen" === e.dialogType)
          !1 === e.fromBen && (t.answers[0].inactive = !0);
        else if ("jessicaQuestDocument" === e.dialogType)
          !1 === e.registration && (t.answers[0].inactive = !0);
        else if ("jessicaQuestButcherEnd" === e.dialogType)
          !1 === e.haveDoneJob && (t.answers[0].inactive = !0);
        else if ("jessicaQuestDocumentEnd" === e.dialogType)
          !1 === e.haveLicense && (t.answers[0].inactive = !0);
        else if ("jessicaQuestElectricEndWork" === e.dialogType)
          !1 === e.endWork && (t.answers[0].inactive = !0),
            !1 === e.canGetCar &&
              (t.answers[0].nextDialog.answers[1].inactive = !0);
        else if ("jessicaQuestElectricCarGet" === e.dialogType)
          !1 === e.canGetCar && (t.answers[1].inactive = !0);
        else if ("benQuestGuitar" === e.dialogType)
          !1 === e.haveGuitar && (t.answers[0].inactive = !0);
        else if ("benQuestBus" === e.dialogType)
          !1 === e.canEndQuest && (t.answers[0].inactive = !0);
        else if ("benQuestTrucker" === e.dialogType)
          !1 === e.canEndQuest && (t.answers[0].inactive = !0);
        else if ("stanleyQuestBeerForStanley" === e.dialogType)
          !1 === e.haveBeer && (t.answers[0].inactive = !0);
        else if ("hospital" === e.dialogType)
          e.haveMedLicense
            ? (t.answers[1].inactive = !0)
            : (t.answers[2].inactive = !0);
        else if ("newYearQuestEnd" === e.dialogType)
          !1 === e.canEndQuest && (t.answers[0].inactive = !0);
        else if ("crime" === e.dialogType)
          if (!0 === e.blockAll)
            (t.answers[0].inactive = !0),
              (t.answers[1].inactive = !0),
              (t.answers[2].inactive = !0);
          else {
            const l = 354 === t.id ? "island" : "main";
            if (
              ((a += `storage.setBlackMarketType('${l}');`),
              (a += `storage.setBlackMarketMargin(${e.marketMargin});`),
              (a += `storage.setAllFactionItems(${JSON.stringify(i)});`),
              0 === e.dirtyMoney)
            )
              t.answers[2].inactive = !0;
            else {
              const a = "island" === l ? 20 : 30,
                i = misc.roundNum(e.dirtyMoney - (e.dirtyMoney / 100) * a);
              (r.dirtyMoneyPercent = a),
                (t.answers[2].nextDialog.name = e.pedName),
                (t.answers[2].nextDialog.text =
                  t.answers[2].nextDialog.text.replace("??", a)),
                (t.answers[2].nextDialog.answers[0].text =
                  t.answers[2].nextDialog.answers[0].text.replace(
                    "??",
                    e.dirtyMoney
                  )),
                (t.answers[2].nextDialog.answers[0].nextDialog.name =
                  e.pedName),
                (t.answers[2].nextDialog.answers[0].nextDialog.text =
                  t.answers[2].nextDialog.answers[0].nextDialog.text.replace(
                    "??",
                    i
                  ));
            }
            if (e.questStarted)
              e.wrongPed
                ? (t.answers[1].inactive = !0)
                : ((t.answers[1].text = "Я по-поводу своего задания"),
                  (t.answers[1].nextDialog = misc.cloneObj(s)),
                  (t.answers[1].nextDialog.name = e.pedName),
                  !1 === e.canEndQuest
                    ? (t.answers[1].nextDialog.answers[0].inactive = !0)
                    : ((t.answers[1].nextDialog.answers[0].nextDialog.name =
                        e.pedName),
                      "govCarSteal" === e.quest
                        ? (t.answers[1].nextDialog.answers[0].nextDialog.text =
                            t.answers[1].nextDialog.answers[0].nextDialog.text.replace(
                              "??",
                              o.govCarSteal
                            ))
                        : "eliteCarSteal" === e.quest
                        ? (t.answers[1].nextDialog.answers[0].nextDialog.text =
                            t.answers[1].nextDialog.answers[0].nextDialog.text.replace(
                              "??",
                              o.eliteCarSteal
                            ))
                        : "houseBreakIn" === e.quest
                        ? (t.answers[1].nextDialog.answers[0].nextDialog.text =
                            t.answers[1].nextDialog.answers[0].nextDialog.text.replace(
                              "??",
                              o.houseBreakIn
                            ))
                        : "factionCaptureQuest" === e.quest
                        ? (t.answers[1].nextDialog.answers[0].nextDialog.text = `Отлично, ${o.capture}$ будут начислены на общак орагнизации`)
                        : "factionWeaponQuest" === e.quest &&
                          (t.answers[1].nextDialog.answers[0].nextDialog.text = `Отлично, ${e.totalSum}$ будут начислены на общак орагнизации`)));
            else if (!0 === e.canStartLater)
              (t.answers[1].nextDialog = misc.cloneObj(p)),
                (t.answers[1].nextDialog.name = e.pedName);
            else {
              let a = misc.cloneObj(n[l]);
              e.removeCaptureQuest &&
                (a = a.filter((e) => "capture" !== e.questType)),
                e.haveWeaponQuest &&
                  "island" === l &&
                  (t.answers[1].inactive = !0);
              const i = a[misc.getRandomInt(0, a.length - 1)];
              if (
                ((i.name = e.pedName),
                (t.answers[1].callEvent = "sCrimeSetEndQuestTime"),
                (t.answers[1].nextDialog = i),
                "govCarSteal" === i.questType)
              )
                (i.text = i.text.replace("??", e.randomFaction.title)),
                  Object.assign(r, {
                    factionId: e.randomFaction.id,
                    factionTitle: e.randomFaction.title,
                    pedName: e.pedName,
                  });
              else if ("eliteCarSteal" === i.questType)
                (i.text = i.text.replace("??", e.randomCar.title)),
                  Object.assign(r, {
                    carModel: e.randomCar.model,
                    carTitle: e.randomCar.title,
                    pedName: e.pedName,
                  });
              else if ("houseBreakIn" === i.questType)
                (i.text = i.text.replace("??", e.randomHouse)),
                  Object.assign(r, {
                    houseGuid: e.randomHouse,
                    pedName: e.pedName,
                  });
              else if ("capture" === i.questType) {
                const t =
                  "mafia" === e.factionType
                    ? "вражеский бизнес"
                    : "вражескую территорию";
                (i.text = i.text.replace("??", t)),
                  Object.assign(r, { pedName: e.pedName });
              } else if ("weapon" === i.questType) {
                const t = misc.getRandomInt(10, 30),
                  a = 300 * t;
                (i.text = i.text.replace("??", e.randomWeapon.title)),
                  (i.text = i.text.replace("???", t)),
                  (i.text = i.text.replace("????", a)),
                  Object.assign(r, {
                    weaponTitle: e.randomWeapon.title,
                    weaponId: e.randomWeapon.id,
                    totalSum: a,
                    totalCount: t,
                    pedName: e.pedName,
                  });
              }
            }
          }
        else
          "cocaine" === e.dialogType &&
            ((t.answers[0].nextDialog.text =
              t.answers[0].nextDialog.text.replace("??", e.cocaine)),
            (t.answers[0].nextDialog.text =
              t.answers[0].nextDialog.text.replace("???", 150 * e.cocaine)));
        (a += `storage.setDialogData(${JSON.stringify(t)});`),
          (a += `storage.setDialogPedId(${e.id});`),
          (a += `storage.setDialogServerData(${JSON.stringify(r)});`),
          misc.injectCef(a),
          "npcDialog" !== pageGlobal && misc.openMenu("npcDialog");
        const l = pedsData.find((t) => t.guid === e.id),
          d = misc.xyInFrontOfPos(l.coord, l.coord.rot, 1);
        misc.createCam(
          d.x,
          d.y,
          d.z + 0.5,
          l.coord.x,
          l.coord.y,
          l.coord.z,
          70,
          Object.assign({}, l.coord, { z: l.coord.z + 0.5 })
        );
      },
    });
  },
  function (e, t, a) {
    const i = a(15),
      o = [
        {
          slot: 0,
          charPos: {
            x: 492.93267822265625,
            y: 1439.063720703125,
            z: 351.7317199707031,
            rot: 320,
          },
        },
        {
          slot: 1,
          charPos: {
            x: 489.0407409667969,
            y: 1441.99658203125,
            z: 351.5791320800781,
            rot: 320,
          },
        },
        {
          slot: 2,
          charPos: {
            x: 486.2560729980469,
            y: 1443.9949951171875,
            z: 351.2361145019531,
            rot: 320,
          },
        },
      ],
      r = [0, 0, 1, 0, 0, 0, -1, -1, 1, -1, 1, 0, 1, -1, -1, -1, -1, -1, 0, 0],
      l = [113, 117, 118, 119],
      n = [];
    for (const e of o) {
      const t = misc.xyInFrontOfPos(e.charPos, e.charPos.rot, 5);
      e.camera = mp.cameras.new(
        "charCam" + e.slot,
        new mp.Vector3(t.x, t.y, t.z),
        new mp.Vector3(0, 0, 140),
        30
      );
    }
    mp.events.add({
      cCharsSelectInit: (e) => {
        misc.moveFromToAir("down"),
          o[0].camera.setActive(!0),
          mp.game.cam.renderScriptCams(!0, !1, 0, !1, !1),
          ((e) => {
            mp.peds.forEach((e) => {
              e.destroy();
            });
            for (let t = 0; t < e.length; t++) {
              const a = e[t],
                s = o[t].charPos,
                p = mp.peds.new(
                  mp.game.joaat(
                    a.gender ? "mp_f_freemode_01" : "mp_m_freemode_01"
                  ),
                  s,
                  s.rot,
                  localplayer.dimension
                );
              p.setHeadBlendData(
                a.skindata[0],
                a.skindata[1],
                0,
                a.skindata[0],
                a.skindata[1],
                0,
                0,
                0,
                0,
                !1
              ),
                a.facedata.forEach((e, t) => p.setFaceFeature(t, e)),
                p.setComponentVariation(2, a.overdata.hair, 0, 0),
                p.setHairColor(a.overdata.hairColor, a.overdata.hairColorS),
                p.setHeadOverlay(2, a.overdata.eyebrows, 1),
                p.setHeadOverlayColor(
                  2,
                  1,
                  a.overdata.eyebrowsColor,
                  a.overdata.eyebrowsColor
                ),
                p.setHeadOverlay(9, a.overdata.freckles, 1),
                p.setHeadOverlayColor(
                  9,
                  0,
                  a.overdata.frecklesColor,
                  a.overdata.frecklesColor
                ),
                p.setHeadOverlay(8, a.overdata.pomade, 1),
                p.setHeadOverlayColor(
                  8,
                  2,
                  a.overdata.pomadeColor,
                  a.overdata.pomadeColor
                ),
                p.setHeadOverlay(5, a.overdata.blush, 1),
                p.setHeadOverlayColor(
                  5,
                  2,
                  a.overdata.blushColor,
                  a.overdata.blushColor
                ),
                p.setHeadOverlay(4, a.overdata.shadows, 1),
                p.setHeadOverlayColor(4, 0, 1, 1),
                p.setHeadOverlay(1, a.overdata.beard, 1),
                p.setHeadOverlayColor(
                  1,
                  1,
                  a.overdata.beardColor,
                  a.overdata.beardColor
                ),
                p.setHeadOverlay(10, a.overdata.chest, 1),
                p.setHeadOverlayColor(
                  10,
                  1,
                  a.overdata.chestColor,
                  a.overdata.chestColor
                ),
                p.setComponentVariation(11, 15, 0, 0),
                p.setComponentVariation(4, 14, 0, 0),
                p.setComponentVariation(3, 15, 0, 0),
                p.setComponentVariation(9, 0, 0, 0),
                p.setComponentVariation(1, 0, 0, 0),
                p.setComponentVariation(10, 0, 0, 0),
                p.setPropIndex(2, -1, 0, !0);
              let m = 15;
              a.gender
                ? (p.setPropIndex(0, 120, 0, !0),
                  p.setPropIndex(1, 12, 0, !0),
                  p.setComponentVariation(6, 35, 0, 0),
                  p.setComponentVariation(8, 14, 0, 0),
                  p.setComponentVariation(4, 15, 0, 0))
                : (p.setPropIndex(0, 8, 0, !0),
                  p.setPropIndex(1, 0, 0, !0),
                  p.setComponentVariation(6, 34, 0, 0),
                  p.setComponentVariation(8, 15, 0, 0)),
                a.clothes.sort((e, t) => (e.type > t.type ? 1 : -1));
              for (const e of a.clothes)
                switch (e.typeStr) {
                  case "hats":
                    p.setPropIndex(0, e.style, e.color, !0);
                    break;
                  case "mask":
                    p.setComponentVariation(1, e.style, e.color, 0),
                      r.forEach((e, t) => p.setFaceFeature(t, e)),
                      l.includes(e.style) &&
                        p.setComponentVariation(2, 0, 0, 0);
                    break;
                  case "glass":
                    p.setPropIndex(1, e.style, e.color, !0);
                    break;
                  case "pants":
                  case "backpack":
                    p.setComponentVariation(e.type, e.style, e.color, 0);
                    break;
                  case "undershirt":
                    const t = a.clothes.find((e) => "jacket" === e.typeStr);
                    t
                      ? (p.setComponentVariation(8, e.style, e.color, 0),
                        p.setComponentVariation(3, t.underType, 0, 0),
                        (m = t.underType))
                      : (p.setComponentVariation(11, e.jacketStyle, e.color, 0),
                        p.setComponentVariation(3, e.underTypeJacket, 0, 0),
                        (m = e.underTypeJacket));
                    break;
                  case "jacket":
                    p.setComponentVariation(11, e.style, e.color, 0);
                    const i = a.clothes.find((e) => "undershirt" === e.typeStr);
                    if (i && e.underStyles.includes(i.style))
                      p.setComponentVariation(3, e.underType, 0, 0),
                        (m = e.underType);
                    else {
                      p.setComponentVariation(3, e.torsJacket, 0, 0),
                        (m = e.torsJacket);
                      let t = a.gender ? 14 : 15;
                      p.setComponentVariation(8, t, 0, 0);
                    }
                    break;
                  case "feet":
                    p.setComponentVariation(e.type, e.style, e.color, 0);
                    break;
                  case "armor":
                    p.setComponentVariation(e.type, 2, e.color, 0);
                    break;
                  case "earrings":
                    p.setPropIndex(2, e.style, 0, !0);
                    break;
                  case "watch":
                    p.setPropIndex(6, e.style, 0, !0);
                    break;
                  case "bracelet":
                    p.setPropIndex(7, e.style, 0, !0);
                    break;
                  case "accessories":
                    p.setComponentVariation(7, e.style, 0, 0);
                }
              const d = a.clothes.find((e) => "gloves" === e.typeStr);
              if (d) {
                const e = d.style,
                  t = i[a.gender][e][m];
                p.setComponentVariation(3, t, 0, 0);
              }
              misc.setTattoo(p, a.tattos), (p.guid = a.id), n.push(p);
            }
          })(e);
      },
      cCharsSelectRemoveCam: () => {
        for (const e of o)
          e.camera.setActive(!1),
            mp.game.cam.renderScriptCams(!1, !0, 0, !0, !0),
            e.camera.destroy(),
            (e.camera = null);
      },
      cCharSelectChangeCam: (e, t) => {
        const a = o[e].camera;
        o[t].camera.setActiveWithInterp(a.handle, 500, 0, 0);
      },
      cCharsSelectDeleteChar: (e, t) => {
        const a = e.findIndex((e) => e.id === t);
        let i = n.find((e) => e.guid === t);
        i.destroy(), (i = null), e.splice(a, 1);
        const o = `storage.CharactersList('${JSON.stringify(e)}');`;
        misc.injectCef(o);
      },
    });
  },
  function (e, t) {
    const a = ["A", "B"],
      i = ["C", "C+E", "D"];
    let o = 0,
      r = null,
      l = null;
    const n = [
        { x: -752.43603515625, y: -1289.6318359375, z: 4.256492614746094 },
        { x: -658.6962280273438, y: -1316.8826904296875, z: 9.846830368041992 },
        { x: -684.7770385742188, y: -1550.85009765625, z: 14.766404151916504 },
        { x: -739.633056640625, y: -1872.059814453125, z: 26.337051391601562 },
        { x: -692.3392333984375, y: -2009.6748046875, z: 25.032869338989258 },
        {
          x: -400.2740783691406,
          y: -1851.7545166015625,
          z: 20.125967025756836,
        },
        { x: -174.8764190673828, y: -1779.0113525390625, z: 29.11831283569336 },
        {
          x: -136.91587829589844,
          y: -1549.2518310546875,
          z: 33.55540466308594,
        },
        {
          x: -199.37506103515625,
          y: -1439.142333984375,
          z: 30.588001251220703,
        },
        { x: -94.37066650390625, y: -1330.0521240234375, z: 28.51837158203125 },
        { x: -98.74442291259766, y: -1164.50732421875, z: 25.0942440032959 },
        {
          x: -245.58851623535156,
          y: -1131.4102783203125,
          z: 22.215282440185547,
        },
        {
          x: -201.25460815429688,
          y: -915.9017333984375,
          z: 28.598243713378906,
        },
        { x: -268.4615783691406, y: -853.13037109375, z: 30.813770294189453 },
        { x: -227.3516082763672, y: -700.5025634765625, z: 32.779937744140625 },
        { x: -331.9571533203125, y: -655.6387329101562, z: 31.68107032775879 },
        { x: -525.2368774414062, y: -655.8743286132812, z: 32.5467529296875 },
        { x: -508.3523254394531, y: -812.7781372070312, z: 29.649654388427734 },
        { x: -614.2809448242188, y: -814.0533447265625, z: 24.715761184692383 },
        { x: -634.2455444335938, y: -681.65869140625, z: 30.617706298828125 },
        { x: -723.3286743164062, y: -652.3728637695312, z: 29.53507423400879 },
        { x: -746.6829223632812, y: -808.0507202148438, z: 22.4793643951416 },
        { x: -748.5791015625, y: -1280.7763671875, z: 4.969758033752441 },
      ],
      s = [
        { x: -648.3243408203125, y: -1292.96142578125, z: 9.92483139038086 },
        { x: -537.8931884765625, y: -1139.61474609375, z: 19.611787796020508 },
        { x: -496.9892272949219, y: -862.04833984375, z: 29.500408172607422 },
        { x: -545.4464721679688, y: -681.1715087890625, z: 32.55123519897461 },
        { x: -842.1629638671875, y: -653.1483154296875, z: 27.138504028320312 },
        { x: -1066.1112060546875, y: -742.638916015625, z: 18.52637481689453 },
        { x: -1264.60205078125, y: -897.1483154296875, z: 10.574514389038086 },
        { x: -1739.2445068359375, y: -487.49835205078125, z: 38.8337287902832 },
        {
          x: -1706.060302734375,
          y: -388.00726318359375,
          z: 46.276161193847656,
        },
        { x: -2176.5771484375, y: -321.7386779785156, z: 12.261957168579102 },
        { x: -3021.30029296875, y: 189.21115112304688, z: 15.236903190612793 },
        { x: -3141.946533203125, y: 986.8939208984375, z: 15.74524211883545 },
        { x: -2979.599365234375, y: 1497.95654296875, z: 27.173330307006836 },
        { x: -2948.748046875, y: 2105.58203125, z: 40.546348571777344 },
        { x: -2667.164306640625, y: 2280.850830078125, z: 20.98094940185547 },
        { x: -2362.828125, y: 2249.413330078125, z: 32.14671325683594 },
        { x: -2026.5828857421875, y: 2333.71240234375, z: 33.786521911621094 },
        { x: -1785.4744873046875, y: 2408.50830078125, z: 30.223907470703125 },
        { x: -1653.3988037109375, y: 2375.201171875, z: 36.76078796386719 },
        { x: -1503.7203369140625, y: 2073.593017578125, z: 59.17545700073242 },
        { x: -1484.3912353515625, y: 1770.58056640625, z: 86.68104553222656 },
        { x: -1552.85791015625, y: 1407.9896240234375, z: 124.14199829101562 },
        {
          x: -1623.6529541015625,
          y: 1114.6160888671875,
          z: 150.90695190429688,
        },
        { x: -1684.58642578125, y: 913.3035888671875, z: 148.94000244140625 },
        { x: -1957.6566162109375, y: 613.0894775390625, z: 120.08423614501953 },
        { x: -1815.7119140625, y: 98.17464447021484, z: 72.93150329589844 },
        { x: -1584.19091796875, y: -165.51141357421875, z: 54.80523681640625 },
        { x: -1403.5040283203125, y: -373.9287109375, z: 36.34516906738281 },
        { x: -1239.0269775390625, y: -585.8052368164062, z: 26.56812858581543 },
        {
          x: -1010.8873291015625,
          y: -810.4295654296875,
          z: 15.500486373901367,
        },
        { x: -781.1945190429688, y: -1096.5968017578125, z: 9.922565460205078 },
        { x: -751.2618408203125, y: -1281.2962646484375, z: 4.484767436981201 },
      ];
    let p = null;
    (global.playerExamMaxSpeed = !1), (global.failCounter = 0);
    let m,
      d = 0;
    [
      { x: -808.8064575195312, y: -1349.0579833984375, z: 5.182065963745117 },
      { x: -807.7025146484375, y: -1347.4989013671875, z: 5.182070255279541 },
      { x: -806.5067749023438, y: -1346.139892578125, z: 5.1820783615112305 },
    ].forEach((e) => {
      (mp.colshapes.newSphere(e.x, e.y, e.z, 1).drivingSchoolTest = !0),
        mp.markers.new(1, new mp.Vector3(e.x, e.y, e.z - 1), 1, {
          color: [0, 255, 0, 100],
        }),
        mp.labels.new("Теоретический тест", new mp.Vector3(e.x, e.y, e.z + 1), {
          drawDistance: 20,
          color: [0, 255, 0, 200],
        });
    }),
      mp.blips.new(
        545,
        { x: -808.8064575195312, y: -1349.0579833984375, z: 5.182065963745117 },
        { name: "Автошкола", scale: 1, shortRange: !0, color: 3 }
      );
    const c = (e, t) => {
        (p = misc.cloneObj(e)).push(t), (o = 0), _();
      },
      _ = () => {
        0 != o && (r.destroy(), l.destroy()),
          ((r = mp.checkpoints.new(
            47,
            new mp.Vector3(p[o].x, p[o].y, p[o].z - 1),
            5,
            {
              color: [255, 255, 255, 255],
              visible: !0,
              dimension: localplayer.dimension,
            }
          )).drivingExam = !0),
          (l = mp.blips.new(1, p[o], {
            name: "Следующая точка маршрута",
            scale: 1,
            shortRange: !1,
            dimension: localplayer.dimension,
          })).setRoute(!0),
          "second" === m &&
            (10 === o
              ? ((d = 90), (playerExamMaxSpeed = 90))
              : 24 === o && ((d = 60), (playerExamMaxSpeed = 60))),
          o++;
      },
      u = (e) => {
        misc.setVehicleGenerator(!1),
          setTimeout(() => {
            const { x: e, y: t, z: a } = localplayer.position;
            mp.game.gameplay.clearAreaOfVehicles(
              e,
              t,
              a,
              1e4,
              !1,
              !1,
              !1,
              !1,
              !1
            );
          }, 1e3),
          (playerExamMaxSpeed = !1),
          r && (r.destroy(), (r = !1)),
          l && (l.destroy(), (l = !1)),
          e && mp.events.callRemote("sDrivingSchoolPassExam");
      };
    mp.events.add({
      cDrivignSchoolChangeExamState: (e, t, o) => {
        e
          ? (a.includes(t)
              ? ((m = "first"), c(n, o))
              : i.includes(t) && ((m = "second"), c(s, o)),
            (playerExamMaxSpeed = 60),
            (d = 60),
            misc.setVehicleGenerator(!0),
            (failCounter = 0),
            misc.notif(
              "Экзамен начат. Двигайтесь по маршруту не нарушая скоростной режим"
            ))
          : (playerExamMaxSpeed = !1);
      },
      cDrivignSchoolSpeedFail: () => {
        failCounter > 5
          ? (u(!1), mp.events.callRemote("sDrivingSchoolExamFail"))
          : (misc.notif("Нарушение скоростного режима.", "error"),
            setTimeout(() => {
              r && (playerExamMaxSpeed = d);
            }, 5e3));
      },
      cDrivignSchoolDamageFail: () => {
        failCounter > 5
          ? (u(!1), mp.events.callRemote("sDrivingSchoolDamageFail"))
          : (misc.notif("Авто получило урон.", "error"),
            setTimeout(() => {
              r && (playerExamMaxSpeed = d);
            }, 5e3));
      },
      cDrivignSchoolEndExam: () => {
        u(!1);
      },
      playerEnterCheckpoint: (e) => {
        if (e.drivingExam) {
          const e = localplayer.vehicle;
          if (
            !e ||
            !e.getVariable("examVehicle") ||
            e.getPedInSeat(-1) !== localplayer.handle
          )
            return misc.notif(
              "Экзамен можно сдать только на транспорте автошколы",
              "error"
            );
          o === p.length ? u(!0) : _();
        }
      },
    });
  },
  function (e, t, a) {
    const i = [8, 13, 14, 15, 16, 21],
      o = a(14);
    (localplayer.seatbelt = !1),
      (function () {
        const e = -1005.8112182617188,
          t = -1397.6260986328125,
          a = 1.5953915119171143;
        (mp.colshapes.newSphere(e, t, a, 1).rentBoatMenu = !0),
          mp.blips.new(471, new mp.Vector3(e, t, 0), {
            name: "Аренда лодок",
            shortRange: !0,
          }),
          o.forEach((e) => {
            (mp.colshapes.newSphere(e.x, e.y, e.z, 1).rentCarMenu = e.id),
              mp.blips.new(749, new mp.Vector3(e.x, e.y, 0), {
                name: "Аренда транспорта",
                shortRange: !0,
              });
          });
      })(),
      mp.events.add({
        cToggleSeatbelt: () => {
          localplayer.vehicle &&
            ((localplayer.seatbelt = !localplayer.seatbelt),
            misc.notif(
              localplayer.seatbelt
                ? "Вы пристегнулись"
                : "Вы сняли ремень безопасности",
              "error"
            ),
            misc.injectCef(`storage.setSeatbelt(${!localplayer.seatbelt});`),
            localplayer.setConfigFlag(32, !localplayer.seatbelt));
        },
        playerLeaveVehicle: () => {
          const e = localplayer.vehicle;
          localplayer.seatbelt &&
            ((localplayer.seatbelt = !localplayer.seatbelt),
            misc.notif(
              localplayer.seatbelt
                ? "Вы пристегнулись"
                : "Вы сняли ремень безопасности",
              "error"
            ),
            misc.injectCef(`storage.setSeatbelt(${!localplayer.seatbelt});`),
            localplayer.setConfigFlag(32, !localplayer.seatbelt)),
            e &&
              e.getPedInSeat(-1) == localplayer.handle &&
              mp.events.callRemote(
                "sVehicleSaveKm",
                e.remoteId,
                vehicleCalcData.km
              );
        },
        cVehiclePlaySound: (e) => {
          e
            ? misc.injectCef("storage.setVehOpenSound(true);")
            : misc.injectCef("storage.setVehCloseSound(true);");
        },
        cVehicleOpenRentCarMenu: (e) => {
          misc.injectCef(`storage.setCarRentId(${e});`),
            misc.openMenu("carRent");
        },
      }),
      mp.events.addProc({
        cVehicleCanTurnOver: (e) => {
          const t = mp.vehicles.atRemoteId(e);
          let a = "notFound";
          return (
            t &&
              (a = i.includes(t.getClass())
                ? "cantTurnOver"
                : t.isUpsidedown()
                ? "upsideDown"
                : "notUpsideDown"),
            a
          );
        },
        cVehicleGetBoneCoord: (e, t) => {
          const a = mp.vehicles.atRemoteId(e);
          let i = !1;
          if (a) {
            const e = a.getBoneIndexByName(t);
            if (-1 !== e) {
              const t = a.getWorldPositionOfBone(e);
              -1 !== t && (i = t);
            }
          }
          return i;
        },
        cVehicleGetClass: (e) => {
          const t = mp.vehicles.atRemoteId(e);
          let a = !1;
          return t && (a = t.getClass()), a;
        },
      });
  },
  function (e, t) {
    let a,
      i = !1,
      o = !1;
    function r(e) {
      if (localplayer.getVariable("ADMIN"))
        return (
          (localplayer.water = 100),
          (localplayer.food = 100),
          void (localplayer.alcohol = 0)
        );
      localplayer.water <= 20 &&
        localplayer.water > 10 &&
        misc.notif("Ваш персонаж хочет пить", "info"),
        localplayer.water > 100 && (localplayer.water = 100),
        localplayer.water <= 10 &&
          misc.notif(
            "Вы сильно хотите пить и начинаете терять здоровье",
            "error"
          ),
        localplayer.food > 100 && (localplayer.food = 100),
        localplayer.food <= 20 &&
          localplayer.food > 10 &&
          misc.notif("Ваш персонаж проголодался", "info"),
        localplayer.food <= 10 &&
          misc.notif(
            "Вы сильно хотите есть и начинаете терять здоровье",
            "error"
          ),
        (localplayer.food <= 10 || localplayer.water <= 10) &&
          mp.events.callRemote("sPlayerChangeHp", -6),
        (localplayer.food <= 0 || localplayer.water <= 0) &&
          mp.events.callRemote("sPlayerChangeHp", -100),
        localplayer.alcohol <= 0 && (localplayer.alcohol = 0),
        localplayer.alcohol >= 1 &&
          (i ||
            ((i = !0),
            mp.events.callRemote("sPlayerSetDefaultMood", "mood_drunk_1"),
            mp.events.callRemote(
              "sPlayerSetWalkingStyle",
              "move_m@drunk@verydrunk"
            ),
            mp.events.call("cMisc-setScreenEffect", "BikerFilter"))),
        localplayer.alcohol < 1 &&
          i &&
          ((i = !1),
          mp.events.callRemote("sPlayerSetDefaultMood", !1),
          mp.events.callRemote("sPlayerSetWalkingStyle", !1),
          mp.events.call("cMisc-setScreenEffect", !1)),
        localplayer.alcohol > 5 &&
          (mp.events.callRemote("sPlayerChangeHp", -100),
          (localplayer.alcohol = 0)),
        misc.injectCef(
          `storage.setNeeds(${JSON.stringify({
            food: misc.roundNum(localplayer.food),
            water: misc.roundNum(localplayer.water),
          })});`
        ),
        (misc.roundNum(localplayer.food) % 10 == 0 ||
          misc.roundNum(localplayer.water) % 10 == 0 ||
          (misc.roundNum(localplayer.alcohol, 1) % 0.5 == 0 &&
            localplayer.alcohol > 0)) &&
          mp.events.callRemote(
            "sPlayerUpdateNeeds",
            localplayer.food,
            localplayer.water,
            localplayer.alcohol
          );
    }
    function l(e, t, a) {
      (localplayer.food = e),
        (localplayer.water = t),
        (localplayer.alcohol = a),
        r(),
        clearInterval(localplayer.stateInterval),
        (localplayer.stateInterval = setInterval(() => {
          o ||
            ((localplayer.water -= 0.75),
            (localplayer.food -= 0.6),
            (localplayer.alcohol -= 0.035),
            r());
        }, 6e4));
    }
    (global.pedsData = []),
      (localplayer.notifState = !0),
      (localplayer.houseBlip = !1),
      mp.events.add({
        cPlayerInitState: (e, t, a) => {
          l(e, t, a);
        },
        cPlayerAddNeeds: (e) => {
          if (!o) {
            for (let t in e)
              (localplayer[t] += e[t]),
                "health" === t && mp.events.callRemote("sPlayerChangeHp", e[t]);
            r(),
              mp.events.callRemote(
                "sPlayerUpdateNeeds",
                localplayer.food,
                localplayer.water,
                localplayer.alcohol
              );
          }
        },
        cPlayerCheckDocsShowDistance: (e, t) => {
          const i = mp.players.atRemoteId(e);
          a = setInterval(() => {
            misc.vdist(i.position, localplayer.position) > 3 &&
              (misc.openMenu("none"),
              misc.notif(
                "Человек который показывает вам документы слишком далеко от вас",
                "error"
              ),
              "factionDoc" === t &&
                mp.events.callRemote("sFactionStopWatchDocs", e),
              "passport" === t &&
                mp.events.callRemote("sPlayerStopWatchPassport", e),
              clearInterval(a));
          }, 3e3);
        },
        cPlayerStopWatchDocs: (e, t) => {
          clearInterval(a),
            "factionDoc" === t &&
              mp.events.callRemote("sFactionStopWatchDocs", e),
            "passport" === t &&
              mp.events.callRemote("sPlayerStopWatchPassport", e);
        },
        cPlayerClosePhone: () => {
          mp.events.callRemote("sPlayer-setAnimation", "smoothCancel", !0),
            mp.attachmentMngr.removeLocal("openPhone"),
            mp.events.call("cRenderChangeDisableKey", [200], !1);
        },
        cPlayerChangeGodMod: () => {
          (o = !o),
            localplayer.setInvincible(o),
            o
              ? misc.notif("Godmod включен")
              : misc.notif("Godmod выключен", "error");
        },
        cPlayerSavePhoneImg: (e) => {
          (mp.storage.data.phoneBgIndex = e), mp.storage.flush();
        },
        cPlayerCreatePed: (e) => {
          e.forEach((e) => {
            const t = e.coord,
              a = mp.peds.new(
                mp.game.joaat(e.modelName),
                new mp.Vector3(t.x, t.y, t.z),
                t.rot,
                t.dim
              );
            try {
              (a.animDict = e.animDict),
                (a.animName = e.animName),
                (a.coord = t),
                (a.turfId = e.turfId),
                (a.guid = e.id),
                (a.dialogType = e.dialogType);
            } catch (e) {
              alert(
                `Send this message to forum for developers\n\nError: ${e.name};\nMesssage: ${e.message};\nStack: ${e.stack}`
              );
            }
            misc.playPedAnim(a), pedsData.push(a);
          });
        },
        cPlayerChangePedModel: (e, t) => {
          if (0 === pedsData.length) return;
          const a = pedsData.find((t) => t.turfId === e);
          a.destroy(), (pedsData = pedsData.filter((t) => t.turfId !== e));
          const i = mp.peds.new(
            mp.game.joaat(t),
            new mp.Vector3(a.coord.x, a.coord.y, a.coord.z),
            a.coord.rot,
            a.coord.dim
          );
          (i.animDict = a.animDict),
            (i.animName = a.animName),
            (i.coord = a.coord),
            (i.turfId = a.turfId),
            misc.playPedAnim(i),
            pedsData.push(i);
        },
        cPlayerChangeAppearance: () => {
          (blocked.chat = !1),
            (blocked.cursor = !0),
            misc.createCam(402.6, -998.75, -98.7, 0, 0, 358, 45),
            misc.injectCef("storage.setChangeAppearance(true);"),
            misc.openMenu("charsCreate");
        },
        cPlayerChangeAppearanceEnd: (e) => {
          misc.injectCef("storage.setChangeAppearance(false);"),
            misc.openMenu("none"),
            misc.destroyCam(),
            (blocked.chat = !0),
            (blocked.cursor = !1),
            mp.events.callRemote("sPlayerSaveAppearance", e);
        },
        cPlayerUnequipWeapon: (e) => {
          let t = 0;
          const a = JSON.parse(localplayer.getVariable("weapons"));
          a &&
            a[e] &&
            (t = natives.GET_AMMO_IN_PED_WEAPON(localplayer.handle, a[e] >> 0)),
            mp.events.callRemote("sInventoryUnEquip", e, t);
        },
        cPlayerLoadAmmo: (e, t, a, i) => {
          let o = 0;
          const r = JSON.parse(localplayer.getVariable("weapons"));
          r &&
            r[e] &&
            (o = natives.GET_AMMO_IN_PED_WEAPON(localplayer.handle, r[e] >> 0));
          const l = {
            weaponType: e,
            guid: t,
            itemId: a,
            itemCount: i,
            playerAmmo: o,
          };
          mp.events.callRemote("sInventoryLoadAmmo", JSON.stringify(l));
        },
        cPlayerChangeAdNotifState: (e) => {
          localplayer.notifState = e;
        },
        cPlayerNewAd: (e, t) => {
          const a = `storage.pushNewAd(${e})`;
          misc.injectCef(a),
            localplayer.notifState &&
              mp.game.ui.notifications.showWithPicture(
                "Weazel News",
                "",
                t,
                "CHAR_LIFEINVADER"
              );
        },
        cPlayerSetShowLastQuest: (e) => {
          misc.injectCef(`storage.setShowLastQuest(${e});`),
            (mp.storage.data.showLastQuest = e),
            mp.storage.flush();
        },
        cPlayerSetPrisonState: (e) => {
          localplayer.inPrison = e;
        },
        cPlayerSetPhone: (e) => {
          localplayer.havePhone = e;
        },
        cPlayerSaveCallSoundVolume: (e) => {
          (mp.storage.data.callSoundVolume = misc.roundNum(e, 1)),
            mp.storage.flush();
        },
        cPlayerSaveSmsSoundVolume: (e) => {
          (mp.storage.data.smsSoundVolume = misc.roundNum(e, 1)),
            mp.storage.flush();
        },
      });
  },
  function (e, t, a) {
    const { openDoors: i } = a(7);
    mp.events.add("playerEnterColshape", function (e) {
      var t = e.getVariable("houseStorage");
      if (t)
        return (
          (eKeyHandler = { fnc: "sHouseStorage", id: t }),
          misc.notif(
            "Откройте инвентарь для взаимодействия с хранилищем",
            "info"
          )
        );
      var a = e.getVariable("truckerAction");
      if (a) {
        if ("recruit" === a) var o = "sTruckerRecruit";
        else o = "sTruckerLoadetPoint";
        if (o)
          return (
            (eKeyHandler = { fnc: o, id: a }),
            misc.notif('Нажмите "Е" для открытия меню', "info")
          );
      }
      if (
        e.truckerAction &&
        "trucker" === localplayer.getVariable("job") &&
        "returnTruck" === e.truckerAction &&
        localplayer.vehicle
      )
        return (
          (eKeyHandler = { fnc: "sTruckerEndRent" }),
          misc.notif('Нажмите "Е" чтобы вернуть арендованное авто', "info")
        );
      if (
        e.truckerLoadPoint &&
        "trucker" === localplayer.getVariable("job") &&
        localplayer.vehicle &&
        "trucker" === localplayer.vehicle.getVariable("job")
      )
        return (
          (eKeyHandler = { fnc: "cTruckerStartLoad", id: e.truckerLoadPoint }),
          misc.notif('Нажмите "Е" для загрузки', "info")
        );
      var r = e.getVariable("businessControlId");
      if (r)
        return (
          (eKeyHandler = { fnc: "sBusinesControl", id: r }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var l = e.getVariable("clothingShopId");
      if (l)
        return (
          (eKeyHandler = { fnc: "sClothShopBuyer", id: l }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var n = e.getVariable("vehicleShopId");
      if (n)
        return (
          (eKeyHandler = { fnc: "sVehShopBuyer", id: n }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var s = e.getVariable("gasStationId");
      if (s)
        return (
          (eKeyHandler = { fnc: "sGasShopBuyer", id: s }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var p = e.getVariable("gasStationFillingId");
      if (p)
        return (
          (eKeyHandler = { fnc: "sGasFillingBuyer", id: p }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var m = e.getVariable("storeId");
      if (m)
        return (
          (eKeyHandler = { fnc: "sStoreOpenMenu", id: m }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var d = e.getVariable("tattoSalonId");
      if (d)
        return (
          (eKeyHandler = { fnc: "sTattoSaloneMenu", id: d }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var c = e.getVariable("barberShopId");
      if (c)
        return (
          (eKeyHandler = { fnc: "sTattoSaloneMenu", id: c }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var _ = e.getVariable("houseId");
      if (_)
        return (
          (eKeyHandler = { fnc: "openHouseMenu", id: _ }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      var u = e.getVariable("houseIdExit");
      if (u)
        return (
          (eKeyHandler = { fnc: "sHouseExit", id: u }),
          misc.notif('Нажмите "Е" для выхода из дома', "info")
        );
      var h = e.getVariable("houseIdGarage");
      if (h)
        return (
          (eKeyHandler = { fnc: "parkingHouseCar", id: h }),
          void mp.events.callRemote("sHouseParkingNotif", h)
        );
      var y = e.getVariable("houseIdGaragePlayerExit");
      if (y)
        return (
          (eKeyHandler = { fnc: "exitHouseParking", id: y }),
          misc.notif('Нажмите "Е" для выхода', "info")
        );
      const b = e.getVariable("hospitalShape");
      if (b) {
        if ("exit" === b) return void mp.events.callRemote("sHospital-exit");
        if ("heal" === b)
          return (
            misc.notif('Нажмите "Е" чтобы пройти курс лечения за 100$', "info"),
            void (eKeyHandler = { fnc: "sHospital-heal" })
          );
        if ("dropper" === b)
          return (
            misc.notif('Нажмите "Е" чтобы использовать капельницу', "info"),
            void (eKeyHandler = { fnc: "sHospital-dropper" })
          );
        if ("license" === b)
          return (
            misc.notif('Нажмите "Е" чтобы получить мед лицензию', "info"),
            void (eKeyHandler = { fnc: "sHospitalBuyMedicalCard" })
          );
      }
      if (e.startCaptureId)
        return (
          misc.notif('Нажмите "Е" для взаимодействия', "info"),
          void (eKeyHandler = {
            fnc: "sGangWar-openMenu",
            id: e.startCaptureId,
          })
        );
      if (e.farmStore)
        return (
          misc.notif(
            'Нажмите "Е" чтобы купить ингредиенты для выращивания марихуаны',
            "info"
          ),
          void (eKeyHandler = { fnc: "openMenu", id: "drugFarm" })
        );
      if (Number.isInteger(e.bushId) && !localplayer.vehicle)
        return (
          misc.notif('Нажмите "Е" для взаимодействия', "info"),
          void (eKeyHandler = { fnc: "cDrugFarm-interact", id: e.bushId })
        );
      if (e.factionStorage)
        return (
          (eKeyHandler = { fnc: "sFactionOpenStorage" }),
          void misc.notif("Нажмите Е чтобы открыть склад", "info")
        );
      if (e.bizWarId)
        return (
          (eKeyHandler = { fnc: "sBizWar-interact", id: e.bizWarId }),
          void misc.notif("Нажмите Е для взаимодействия", "info")
        );
      if (e.boxType)
        return (
          (eKeyHandler = { fnc: "sFactionTakeBox", id: e.boxType }),
          void misc.notif("Нажмите Е для взаимодействия", "info")
        );
      if (e.sosShape)
        return (
          mp.events.call("cMisc-RemoveClientBlip"),
          mp.events.call("cMisc-DestroySosColshape"),
          mp.events.callRemote("sFactionSosArrived"),
          void misc.notif("Вы прибыли на вызов", "info")
        );
      if (e.payFine)
        return (
          (eKeyHandler = { fnc: "openMenu", id: "finesPayMenu" }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      if (
        (e.loadDoors && mp.events.callRemote("sDoorsUpdateState", e.loadDoors),
        e.prisonersList)
      )
        return (
          (eKeyHandler = { fnc: "sPoliceOpenPrisonersList" }),
          void misc.notif("Нажмите Е для взаимодействия", "info")
        );
      const I = e.getVariable("fibLift");
      if (I)
        return (
          (eKeyHandler = { fnc: "sPoliceFibLiftTp", id: I }),
          void misc.notif("Нажмите Е чтобы перейти на другой этаж", "info")
        );
      if (e.vehTrack)
        return mp.events.call("cMisc-RemoveClientBlip"), void e.destroy();
      if (e.getVariable("electricJobStart"))
        return (
          (eKeyHandler = { fnc: "openMenu", id: "electricJob" }),
          void misc.notif("Нажмите Е для взаимодействия", "info")
        );
      if (e.electric) return void mp.events.call("cElectricShapeEnter");
      if (e.govTablet)
        return (
          (eKeyHandler = { fnc: "sGovOpenTablet" }),
          void misc.notif("Нажмите Е для взаимодействия", "info")
        );
      if (e.getVariable("bank"))
        return (
          (eKeyHandler = { fnc: "sPlayerOpenBankMenu" }),
          void misc.notif("Нажмите Е для взаимодействия", "info")
        );
      if (e.destroyShape)
        return (
          mp.events.call("cMisc-RemoveClientBlip"),
          void (
            "taxi" === localplayer.getVariable("job") &&
            mp.events.callRemote("sTaxiDriverArrived")
          )
        );
      if (e.drivingSchoolTest)
        return (
          (eKeyHandler = { fnc: "openMenu", id: "drivingSchool" }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      if (e.getVariable("taxiCall"))
        return (
          (eKeyHandler = { fnc: "cTaxi-NewOrder" }),
          misc.notif('Нажмите "Е" чтобы вызвать такси', "info")
        );
      const x = e.getVariable("hotelMenu");
      if (x)
        return (
          (eKeyHandler = { fnc: "sHotelOpenMenu", id: x }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      const f = e.getVariable("hotelIdExit");
      if (f)
        return (
          (eKeyHandler = { fnc: "sHotelRoomExit", id: f }),
          misc.notif('Нажмите "Е" для выхода', "info")
        );
      if (e.getVariable("armyCanteen"))
        return (
          (eKeyHandler = { fnc: "sArmyCanteen" }),
          misc.notif('Нажмите "Е" для взаимодействия', "info")
        );
      if (e.armyFuelTake)
        return (
          (eKeyHandler = { fnc: "sArmyFillUpTanker" }),
          misc.notif('Нажмите "Е" для заправки бензовоза', "info")
        );
      if (e.getVariable("armyFuelStorage"))
        return (
          (eKeyHandler = { fnc: "sArmyTryPutFuelInStorage" }),
          misc.notif('Нажмите "Е" чтобы заполнить хранилище топлива', "info")
        );
      if (e.getVariable("armyGasStation"))
        return (
          (eKeyHandler = { fnc: "sArmyFillUpCar" }),
          misc.notif('Нажмите "Е" чтобы заправиться', "info")
        );
      if (e.copStorage)
        return (
          (eKeyHandler = { fnc: "sPoliceStorageOpen" }),
          misc.notif('Нажмите "Е" для взаимодействия', "info")
        );
      const P = e.getVariable("carCustomsEnter");
      if (P)
        return (
          (eKeyHandler = { fnc: "sCustomsEnter", id: P }),
          misc.notif('Нажмите "Е" чтобы заехать', "info")
        );
      if (e.butcher)
        return void ("employ" === e.butcher
          ? ((eKeyHandler = { fnc: "openMenu", id: "butcherMenu" }),
            misc.notif(
              'Нажмите "E" для открытия меню устойства на работу (увольнения с работы).',
              "info"
            ))
          : "cow" === e.butcher
          ? ((eKeyHandler = { fnc: "cButcherCutMeat" }),
            misc.notif('Нажмите "E" чтобы срезать мясо.', "info"))
          : "mincer" === e.butcher
          ? ((eKeyHandler = { fnc: "cButcherLoadMeat" }),
            misc.notif('Нажмите "E" чтобы загрузить мясо.', "info"))
          : "box" === e.butcher &&
            ((eKeyHandler = { fnc: "cButcherPutBox" }),
            misc.notif('Нажмите "E" чтобы поставить коробку.', "info")));
      if (e.getVariable("employPrShapeFrId"))
        return (
          (eKeyHandler = { fnc: "openMenu", id: "prisonMenu" }),
          misc.notif(
            'Нажмите "E" для открытия меню устойства на работу (увольнения с работы).',
            "info"
          )
        );
      if (e.getVariable("prisonFoodShapeFrId"))
        return (
          (eKeyHandler = { fnc: "cPrisonTakeFood" }),
          misc.notif('Нажмите "E" чтобы взять еду', "info")
        );
      if (e.getVariable("evacuateMenu"))
        return (
          (eKeyHandler = { fnc: "openMenu", id: "transportEvacuation" }),
          misc.notif('Нажмите "Е" чтобы открыть меню', "info")
        );
      const w = e.getVariable("safeId");
      if (w) {
        if (!localplayer.getVariable("factionID")) return;
        return (
          (eKeyHandler = { fnc: "sSafeEnter", id: w }),
          misc.notif('Нажмите "E" для начала взлома сейфа.', "info")
        );
      }
      if (e.productArmyPut)
        return (
          (eKeyHandler = { fnc: "sArmyProductPut" }),
          misc.notif('Нажмите "E" для взаимодействия.', "info")
        );
      if (e.getVariable("heliGasStation"))
        return localplayer.vehicle && 15 === localplayer.vehicle.getClass()
          ? ((eKeyHandler = { fnc: "sGasStationFillUpGovHeli", id: !1 }),
            misc.notif('Нажмите "E" для заправки.', "info"))
          : misc.notif(
              "Заправка предназначена только для вертолетов гос организаций",
              "error"
            );
      if (e.getVariable("armyHeliGasStation"))
        return localplayer.vehicle && 15 === localplayer.vehicle.getClass()
          ? ((eKeyHandler = { fnc: "sGasStationFillUpGovHeli", id: !0 }),
            misc.notif('Нажмите "E" для заправки.', "info"))
          : misc.notif("Заправка предназначена только для вертолетов", "error");
      if (e.unloadFaction)
        return (
          (eKeyHandler = { fnc: "sFactionPutCargo", id: e.unloadFaction }),
          misc.notif('Нажмите "E" для разгрузки.', "info")
        );
      if (e.getVariable("musicStandEnter")) {
        eKeyHandler = { fnc: "sMusicStandE" };
        const t = e.getVariable("idColshape");
        return (
          mp.events.callRemote("sMusicStandEnterColshape", t),
          misc.notif('Нажмите "E", чтобы стать диджеем.', "info")
        );
      }
      if (
        e.getVariable("tractorFillUp") &&
        "farm" === localplayer.getVariable("job") &&
        localplayer.vehicle &&
        "farm" === localplayer.vehicle.getVariable("job")
      )
        return (
          (eKeyHandler = { fnc: "sFarmFillUpTractor" }),
          misc.notif('Нажмите "E", чтобы заправить трактор.', "info")
        );
      const g = e.getVariable("teleport");
      if (g) {
        const [e, t] = g.split("|");
        return (
          (eKeyHandler = { fnc: "sTeleportationTP", id: e }),
          misc.notif(t, "info")
        );
      }
      if (e.getVariable("employTShapeFrId"))
        return (
          (eKeyHandler = { fnc: "openMenu", id: "tacoJobMenu" }),
          misc.notif(
            'Нажмите "E" для открытия меню устойства на работу (увольнения с работы).',
            "info"
          )
        );
      if (e.buyTaco) return void mp.events.callRemote("sTacoBuyProducts");
      if (e.returnTaco) return void mp.events.callRemote("sTacoReturnProducts");
      if (!0 === e.getVariable("sellTaco")) {
        const t = e.getVariable("sellerGuid");
        return void mp.events.callRemote("sTacoSellProducts", t);
      }
      if ((e.openDoors && i(), e.wardrobe))
        return (
          (eKeyHandler = { fnc: "sFactionOpenWardrobe" }),
          misc.notif('Нажмите "E" для выбора рабочей формы', "info")
        );
      if (e.uniformConstructor)
        return (
          (eKeyHandler = { fnc: "cFactionOpenConstructor" }),
          misc.notif('Нажмите "E" для создания форм', "info")
        );
      if (
        e.truckUnload &&
        localplayer.vehicle &&
        "trucker" === localplayer.getVariable("job")
      )
        return (
          (eKeyHandler = { fnc: "cTruckerStartUnload" }),
          misc.notif('Нажмите "Е" для разгрузки', "info")
        );
      const M = e.getVariable("dialog");
      if (M && !localplayer.vehicle) {
        if (358 === M && 20 !== localplayer.getVariable("factionID")) return;
        return (
          (eKeyHandler = { fnc: "sDialogOpen", id: M }),
          misc.notif('Нажмите "E" для открытия диалога.', "info")
        );
      }
      const N = e.getVariable("fishShop");
      if (N)
        return (
          (eKeyHandler = { fnc: "sFishingOpenShop", id: N }),
          misc.notif('Нажмите "E" чтобы продать рыбу.', "info")
        );
      if (e.busStation)
        return (
          (eKeyHandler = { fnc: "openMenu", id: "busMenu" }),
          misc.notif('Нажмите "Е" чтобы открыть меню', "info")
        );
      if (e.butcherClothes)
        return (
          (eKeyHandler = { fnc: "sButcher-DressUp" }),
          misc.notif('Нажмите "Е" для смены одежды', "info")
        );
      if (e.cashCollectorGear)
        return (
          (eKeyHandler = { fnc: "sCashCollector-DressUp" }),
          misc.notif('Нажмите "Е" для смены одежды', "info")
        );
      if (e.cashCollectorWork)
        return (
          (eKeyHandler = { fnc: "openMenu", id: "inkassMenu" }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      if (e.putMoney)
        return void mp.events.callRemote("sCashCollector-PutMoney");
      if (e.farmMenu)
        return (
          (eKeyHandler = { fnc: "openMenu", id: "farmMenu" }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      if (e.farmFood)
        return (
          (eKeyHandler = { fnc: "cFarm-takeFood" }),
          misc.notif('Нажмите "Е" для получение еды', "info")
        );
      if (e.farmClothes)
        return (
          (eKeyHandler = { fnc: "sFarm-DressUp" }),
          misc.notif('Нажмите "Е" для смены одежды', "info")
        );
      if (e.farmStoreTractor)
        return void mp.events.callRemote("sFarm-PutCropTractor");
      if (e.farmStorePeople)
        return void mp.events.callRemote("sFarm-PutCropPeople");
      if (e.taxiPark)
        return (
          (eKeyHandler = { fnc: "openMenu", id: "taxiMenu" }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      if (e.rentBoatMenu)
        return (
          (eKeyHandler = { fnc: "openMenu", id: "boatRent" }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      if (e.rentCarMenu)
        return (
          (eKeyHandler = { fnc: "cVehicleOpenRentCarMenu", id: e.rentCarMenu }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      if (e.harborShape)
        return (
          (eKeyHandler = { fnc: "sHarborOpenMenu" }),
          misc.notif('Нажмите "Е" для открытия меню', "info")
        );
      const v = e.getVariable("seaFishing");
      if (v) {
        if ("big" === v)
          localplayer.useEcholot &&
            misc.notif(
              "Теперь руководствуясь эхолоту найдите место где можно ловить рыбу",
              "info"
            );
        else if ("small" === v) {
          eKeyHandler = { fnc: "seaFishing" };
          let e = "storage.setEcholotFish(true);";
          (e += "storage.setEcholotSound(true);"), misc.injectCef(e);
        }
      } else {
        if (e.destroyTruck && localplayer.vehicle)
          return (
            (eKeyHandler = { fnc: "sPoliceDestroyDeliverTruck" }),
            misc.notif(
              'Нажмите "Е" чтобы поставить авто на штрафстоянку',
              "info"
            )
          );
        if (e.getVariable("penaltyVehicleMenu"))
          return (
            (eKeyHandler = { fnc: "sVehicleOpenPenaltyMenu" }),
            misc.notif('Нажмите "Е" для открытия меню', "info")
          );
        if (e.stanleyStash) {
          const e = mp.game.gameplay.getGroundZFor3dCoord(
            localplayer.position.x,
            localplayer.position.y,
            localplayer.position.z,
            0,
            !1
          );
          return (
            (eKeyHandler = { fnc: "sQuestDigStanleyStash", id: e }),
            misc.notif('Нажмите "Е" чтобы выкопать заначку', "info")
          );
        }
        if (!e.blackMarketCar || !localplayer.vehicle)
          return e.getVariable("voting")
            ? ((eKeyHandler = { fnc: "sGovOpenVoteMenu" }),
              misc.notif('Нажмите "Е" для взаимодействия', "info"))
            : void 0;
        mp.events.callRemote("sCrimeNotifCarEnterShape");
      }
    }),
      mp.events.add("playerExitColshape", function (e) {
        if (((eKeyHandler = {}), !e)) return;
        const t = e.getVariable("houseStorage");
        if (e.startCaptureId || t)
          return void mp.events.callRemote("sPlayerDialogDecline");
        if (e.prisonersList)
          return void mp.events.callRemote("sPoliceClosePrisonersList");
        if (e.getVariable("musicStandEnter")) {
          const t = e.getVariable("idColshape");
          return void mp.events.callRemote("sMusicStandExitColshape", t);
        }
        if (e.getVariable("musicStandExit"))
          return void mp.events.callRemote("sMusicStandExitColshape", 1e3);
        if (e.armyFuelTake) return void mp.events.call("cArmyFillUpCancel");
        if (e.getVariable("armyFuelStorage"))
          return void mp.events.call("cArmyFillUpCancel");
        const a = e.getVariable("gasStationFillingId"),
          i = e.getVariable("armyGasStation"),
          o = e.getVariable("heliGasStation"),
          r = e.getVariable("tractorFillUp");
        if (a || i || o || r) misc.injectCef("storage.cancelFillingGas(true);");
        else if (e.truckerLoadPoint)
          misc.injectCef("storage.cancelFillingGas(true);");
        else if (e.getVariable("businessControlId"))
          mp.events.callRemote("sPlayerDeclineConfirmation");
        else if (e.truckUnload) mp.events.call("cTruckerCancelUnload");
        else if (e.getVariable("freeFaggio"))
          mp.events.callRemote("sPlayerDeclineConfirmation");
        else if ("small" !== e.getVariable("seaFishing"));
        else {
          const e = "storage.setEcholotFish(false);";
          misc.injectCef(e);
        }
      });
  },
  function (e, t) {
    mp.nametags.enabled = !1;
    let a = 400;
    global.familiar = [];
    const i = mp.game.graphics;
    i.requestStreamedTextureDict("mpleaderboard", !0),
      (global.showNametags = !0);
    let o = !0;
    mp.events.add({
      cNameTagFamiliarAdd: (e) => {
        familiar.includes(e) || familiar.push(e);
      },
      cNameTagToggleAdminInfo: () => {
        (o = !o)
          ? misc.notif("Отображение админской информации включено")
          : misc.notif("Отображение админской информации выключено", "error");
      },
      cNameTagSetFamiliar: (e) => {
        familiar = e;
      },
    }),
      mp.events.add("render", (e) => {
        if (!showNametags) return;
        const t = localplayer.getVariable("ADMIN");
        a = t ? 2e4 : 400;
        const r = i.getScreenResolution(0, 0);
        e.forEach((e) => {
          var l = "",
            n = {
              0: "Игрок",
              1: "Helper",
              2: "Мл. администратор",
              3: "Администратор",
              4: "Ст.администратор",
              5: "Зам. гл. администратора",
              6: "Гл. администратор",
              7: "Команда проекта",
              8: "Следящий за проектом",
              9: "Руководитель проекта",
              10: "Основатель проекта",
              8191: "Главный Carpacker",
              8192: "Главный разработчик",
            };
          let [s, p, m, d] = e;
          if (d <= a) {
            if (!t && 0 != s.getVariable("invisible")) return;
            const e = s.getBoneCoords(12844, 0.5, 0, 0),
              c = s.getVariable("guid");
            let _ = familiar.includes(c);
            const u = s.getVariable("ADMIN");
            let h = !1;
            u && (h = s.getVariable("adminWhiteName"));
            const y = localplayer.getVariable("factionID");
            y && y === s.getVariable("factionID") && (_ = !0);
            let b = "Незнакомец";
            if (
              (_ && (b = s.name),
              s.getDrawableVariation(1) && (b = "Незнакомец в маске"),
              (!u && !t) || h || (b = s.name),
              (l = `${b} [${s.remoteId}]\n~HUD_COLOUR_GREYLIGHT~#${String(
                c
              ).padStart(6, "0")}`),
              u && !t && !h)
            ) {
              const e = s.getVariable("adminData");
              if (e) {
                const [t, a, i] = e.split("|");
                l = `${n[u || 0]}\nParvenu Roleplay\n№ ${t}`;
              }
            }
            let I = u && !h ? [255, 216, 0, 255] : [255, 255, 255, 255];
            if (t && o) {
              const e = s.getVariable("adminData");
              if (e) {
                const [t, a, i] = e.split("|");
                l =
                  `GUID: ${c} userID:${t} facID:${a} rank:${i}\n${n[u || 0]}` +
                  "\n" +
                  l;
              }
            }
            i.drawText(l, [e.x, e.y, e.z], {
              font: 4,
              color: I,
              scale: [0.35, 0.35],
              outline: !0,
            });
            const x = s.getVariable("mute"),
              f = s.getVariable("nearDeath");
            if (s.isVoiceActive || x || f) {
              const e = 1 * Math.max(0.1, 1 - d / a),
                t = i.getTextureResolution(
                  "mpleaderboard",
                  "leaderboard_audio_3"
                ),
                o = [(e * t.x) / r.x, (e * t.y) / r.y];
              s.isVoiceActive &&
                i.drawSprite(
                  "mpleaderboard",
                  "leaderboard_audio_3",
                  p,
                  m - 0.02,
                  o[0],
                  o[1],
                  0,
                  255,
                  255,
                  255,
                  255
                ),
                x &&
                  i.drawSprite(
                    "mpleaderboard",
                    "leaderboard_audio_mute",
                    p,
                    m,
                    o[0],
                    o[1],
                    0,
                    255,
                    0,
                    0,
                    255
                  ),
                f &&
                  i.drawSprite(
                    "mpleaderboard",
                    "leaderboard_deaths_icon",
                    p,
                    m - 0.02,
                    o[0],
                    o[1],
                    0,
                    255,
                    255,
                    255,
                    255
                  );
            }
            if (mp.game.player.isFreeAimingAtEntity(s.handle)) {
              let e = m + 0.042,
                t = s.getHealth();
              t = t <= 100 ? t / 100 : (t - 100) / 100;
              let a = s.getArmour() / 100;
              a > 0
                ? (i.drawRect(p, e, 0.032, 0.007, 0, 0, 0, 200),
                  i.drawRect(p, e, 0.03, 0.005, 150, 150, 150, 255),
                  i.drawRect(
                    p - 0.015 * (1 - t),
                    e,
                    0.03 * t,
                    0.005,
                    255,
                    255,
                    255,
                    200
                  ),
                  (m -= 0.007),
                  (e -= 0.007),
                  i.drawRect(p, e, 0.032, 0.007, 0, 0, 0, 200),
                  i.drawRect(p, e, 0.03, 0.005, 41, 66, 78, 255),
                  i.drawRect(
                    p - 0.015 * (1 - a),
                    e,
                    0.03 * a,
                    0.005,
                    48,
                    108,
                    135,
                    200
                  ))
                : (i.drawRect(p, e, 0.032, 0.007, 0, 0, 0, 200),
                  i.drawRect(p, e, 0.03, 0.005, 150, 150, 150, 255),
                  i.drawRect(
                    p - 0.015 * (1 - t),
                    e,
                    0.03 * t,
                    0.005,
                    255,
                    255,
                    255,
                    200
                  ));
            }
          }
        });
      });
  },
  function (e, t) {
    new (class {
      constructor() {
        mp.events.add({
          cLoginPlayerReady: () => {
            if (
              (misc.prepareToCef(),
              misc.openCef("http://package/index.html"),
              mp.storage.data.authToken)
            ) {
              var e = {
                login: mp.storage.data.authToken.login,
                key: mp.storage.data.authToken.key,
              };
              misc.injectCef(`storage.setAuthData(${JSON.stringify(e)});`);
            }
            mp.storage.data.phoneBgIndex
              ? misc.injectCef(
                  `storage.setBgIndex(${mp.storage.data.phoneBgIndex});`
                )
              : misc.injectCef("storage.setBgIndex(0);"),
              void 0 !== mp.storage.data.showLastQuest
                ? misc.injectCef(
                    `storage.setShowLastQuest(${!!mp.storage.data
                      .showLastQuest});`
                  )
                : misc.injectCef("storage.setShowLastQuest(true);"),
              void 0 !== mp.storage.data.callSoundVolume
                ? (mp.storage.data.callSoundVolume > 1 &&
                    (mp.storage.data.callSoundVolume = 1),
                  mp.storage.data.callSoundVolume < 0 &&
                    (mp.storage.data.callSoundVolume = 0),
                  misc.injectCef(
                    `storage.setCallSoundVolume(${misc.roundNum(
                      mp.storage.data.callSoundVolume,
                      1
                    )});`
                  ))
                : misc.injectCef("storage.setCallSoundVolume(1);"),
              void 0 !== mp.storage.data.smsSoundVolume
                ? (mp.storage.data.smsSoundVolume > 1 &&
                    (mp.storage.data.smsSoundVolume = 1),
                  mp.storage.data.smsSoundVolume < 0 &&
                    (mp.storage.data.smsSoundVolume = 0),
                  misc.injectCef(
                    `storage.setSmsSoundVolume(${misc.roundNum(
                      mp.storage.data.smsSoundVolume,
                      1
                    )});`
                  ))
                : misc.injectCef("storage.setSmsSoundVolume(1);"),
              cef.execute("cef.$router.push('/');"),
              misc.openMenu("login");
          },
          cSavedAuthKey: (e) => {
            var t = JSON.parse(e);
            (mp.storage.data.authToken = {}),
              t.login && (mp.storage.data.authToken.login = t.login),
              (mp.storage.data.authToken.key = t.key),
              mp.storage.flush();
          },
        });
      }
    })();
  },
  function (e, t) {
    mp.events.add(
      "cNotifText",
      (e, t = !1, a = -1, i = -1, o = [77, 77, 77, 200]) => {
        a > -1 && mp.game.invoke("0x39BBF623FC803EAC", a),
          i > -1 && mp.game.invoke("0x92F0DA1E27DB96DC", i),
          t && mp.game.ui.setNotificationFlashColor(o[0], o[1], o[2], o[3]),
          mp.game.gxt.set("BNOTIF_LONG_TEXT_ENTRY", `~a~${e}`),
          mp.game.ui.setNotificationTextEntry("BNOTIF_LONG_TEXT_ENTRY"),
          mp.game.ui.addTextComponentSubstringPlayerName(""),
          mp.game.ui.drawNotification(t, !0);
      }
    ),
      mp.events.add(
        "cNotifAdd",
        async (
          e,
          t,
          a,
          i,
          o = 0,
          r = !1,
          l = -1,
          n = -1,
          s = [77, 77, 77, 200]
        ) => {
          if (!mp.game.graphics.hasStreamedTextureDictLoaded(i))
            for (
              mp.game.graphics.requestStreamedTextureDict(i, !0);
              !mp.game.graphics.hasStreamedTextureDictLoaded(i);

            )
              await misc.sleep();
          l > -1 && mp.game.invoke("0x39BBF623FC803EAC", l),
            n > -1 && mp.game.invoke("0x92F0DA1E27DB96DC", n),
            r && mp.game.ui.setNotificationFlashColor(s[0], s[1], s[2], s[3]),
            mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
          for (let e = 0, t = a.length; e < t; e += 50)
            mp.game.ui.addTextComponentSubstringPlayerName(
              a.substr(e, Math.min(50, a.length - e))
            );
          mp.game.ui.setNotificationMessage(i, i, r, o, e, t),
            mp.game.ui.drawNotification(!1, !0);
        }
      ),
      (mp.game.ui.notifications = {
        show: (e, t = !1, a = -1, i = -1, o = [77, 77, 77, 200]) =>
          mp.events.call("cNotifText", e, t, a, i, o),
        showWithPicture: (
          e,
          t,
          a,
          i,
          o = 0,
          r = !1,
          l = -1,
          n = -1,
          s = [77, 77, 77, 200]
        ) => mp.events.call("cNotifAdd", e, t, a, i, o, r, l, n, s),
      });
  },
  function (e, t, a) {
    "use strict";
    const i = a(7);
    global.eKeyHandler = {};
    const o = [13, 14, 15, 16, 21];
    let r = !1;
    const l = [11, 25, 26],
      n = [
        "sClothShopBuyer",
        "sVehShopBuyer",
        "sGasShopBuyer",
        "sGasFillingBuyer",
        "sStoreOpenMenu",
        "sTattoSaloneMenu",
        "sTattoSaloneMenu",
        "openHouseMenu",
        "sHouseExit",
        "parkingHouseCar",
        "exitHouseParking",
        "sBizWar-interact",
        "sFactionOpenStorage",
        "sGangWar-openMenu",
        "sBizWar-interact",
        "sOpenBankATM",
        "sFactionTakeBox",
        "sBusinesControl",
        "sTruckerRecruit",
        "sTruckerLoadetPoint",
        "sTruckerEndRent",
        "sPoliceOpenPrisonersList",
        "sPoliceFibLiftTp",
        "sHospital-heal",
        "sGovOpenTablet",
        "sPlayerOpenBankMenu",
        "sHotelOpenMenu",
        "sHotelRoomExit",
        "sArmyCanteen",
        "sArmyFillUpTanker",
        "sArmyTryPutFuelInStorage",
        "sArmyFillUpCar",
        "sHospital-dropper",
        "sHospitalBuyMedicalCard",
        "sPoliceStorageOpen",
        "sCustomsEnter",
        "sArmyProductPut",
        "sGasStationFillUpGovHeli",
        "sFactionPutCargo",
        "sMusicStandE",
        "sFarmFillUpTractor",
        "sSafeEnter",
        "sTeleportationTP",
        "sElectricStartFix",
        "sFactionOpenWardrobe",
        "sFactionOpenConstructor",
        "sDialogOpen",
        "sFishingOpenShop",
        "sButcher-DressUp",
        "sCashCollector-DressUp",
        "sFarm-DressUp",
        "sHarborOpenMenu",
        "sCarDeliverEnd",
        "sPoliceDestroyDeliverTruck",
        "sVehicleOpenPenaltyMenu",
        "sQuestDigStanleyStash",
        "sGovOpenVoteMenu",
      ],
      s = [
        "cDrugFarm-interact",
        "cTaxi-NewOrder",
        "cPrisonTakeFood",
        "cTruckerStartLoad",
        "cTruckerStartUnload",
        "cFarm-takeFood",
        "cButcherCutMeat",
        "cButcherLoadMeat",
        "cButcherPutBox",
        "cVehicleOpenRentCarMenu",
        "cFactionOpenConstructor",
      ],
      p = [
        "sElectricStartFix",
        "sSafeEnter",
        "cTruckerStartLoad",
        "cButcherCutMeat",
        "cButcherLoadMeat",
        "cButcherPutBox",
        "cDrugFarm-interact",
      ];
    mp.keys.bind(107, !1, function () {
      mp.gui.cursor.visible;
    }),
      mp.keys.bind(96, !1, function () {
        mp.gui.cursor.visible;
      }),
      mp.keys.bind(66, !1, function () {
        mp.gui.cursor.visible ||
          ("none" === pageGlobal &&
            (blocked.control ||
              (mp.events.callRemote("sKeys-B"),
              localplayer.vehicle &&
                localplayer.vehicle.getPedInSeat(-1) == localplayer.handle &&
                mp.events.call("cCruiseControlOff"))));
      }),
      mp.keys.bind(74, !1, function () {
        mp.gui.cursor.visible ||
          ("none" === pageGlobal &&
            (blocked.control ||
              (localplayer.vehicle && mp.events.call("cToggleSeatbelt"))));
      }),
      mp.keys.bind(76, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sKeys-L");
      }),
      mp.keys.bind(82, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sPlayerReloadAmmo");
      }),
      mp.keys.bind(97, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sKeys-Num1");
      }),
      mp.keys.bind(99, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sKeys-Num3");
      }),
      mp.keys.bind(103, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sKeys-Num7");
      }),
      mp.keys.bind(105, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sKeys-Num9");
      }),
      mp.keys.bind(113, !1, function () {
        if (
          !mp.gui.cursor.visible &&
          "none" === pageGlobal &&
          !blocked.control &&
          !localplayer.getVariable("animation")
        )
          return localplayer.inPrison
            ? misc.notif(
                "Вы не можете взаимодействовать с планшетом в тюрьме",
                "error"
              )
            : void mp.events.callRemote("sFactionOpenTablet");
      }),
      mp.keys.bind(114, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sKeys-F3");
      }),
      mp.keys.bind(115, !1, function () {
        mp.gui.cursor.visible || mp.events.callRemote("sKeys-F4");
      }),
      mp.keys.bind(78, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sKeys-N");
      }),
      mp.keys.bind(88, !1, function () {
        if (
          !mp.gui.cursor.visible &&
          !blocked.control &&
          0 !== localplayer.getVariable("factionID") &&
          entity &&
          "player" === entity.type
        ) {
          if (localplayer.getVariable("animation")) return;
          const e = entity.getVariable("tied");
          !1 === e
            ? mp.events.callRemote(
                "sAction-Command",
                "mnp_cop_cuff",
                entity,
                !1,
                !1
              )
            : "cuffs" === e &&
              mp.events.callRemote(
                "sAction-Command",
                "mnp_cop_uncuff",
                entity,
                !1,
                !1
              );
        }
      }),
      mp.keys.bind(90, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          (0 !== localplayer.getVariable("factionID") &&
            entity &&
            "player" === entity.type &&
            (!1 === entity.getVariable("follow")
              ? mp.events.callRemote(
                  "sAction-Command",
                  "mnp_startLead",
                  entity,
                  !1,
                  !1
                )
              : mp.events.callRemote(
                  "sAction-Command",
                  "mnp_stopLead",
                  entity,
                  !1,
                  !1
                )));
      }),
      mp.keys.bind(72, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          (misc.isDriver() &&
            l.includes(localplayer.getVariable("factionID")) &&
            mp.events.callRemote("sPoliceOpenOnboardComp"));
      }),
      mp.keys.bind(9, !0, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          (misc.injectCef(
            `storage.setActionEnity(${JSON.stringify({
              id: 0,
              type: "none",
            })});`
          ),
          misc.openMenu("interactionMenu"),
          localplayer.getVariable("animation") &&
            mp.events.callRemote("sPlayerCancelSelfAnim"));
      }),
      mp.keys.bind(17, !0, function () {
        if (mp.gui.cursor.visible) return;
        if (blocked.control) return;
        if (localplayer.vehicle) return;
        if (localplayer.alcohol >= 1)
          return misc.notif("Сейчас нельзя это сделать", "error");
        localplayer.getVariable("walking")
          ? mp.events.callRemote("sPlayerSetWalkingStyle", !1)
          : mp.events.callRemote("sPlayerSetWalkingStyle", "move_ped_crouched");
      }),
      mp.keys.bind(69, !0, function () {
        if (
          !mp.gui.cursor.visible &&
          !blocked.control &&
          !localplayer.getVariable("nearDeath")
        ) {
          if (
            0 != entity &&
            ("vehicle" === entity.type || "player" === entity.type)
          ) {
            var e = { id: entity.id, type: entity.type };
            return (
              misc.injectCef(`storage.setActionEnity(${JSON.stringify(e)});`),
              misc.openMenu("interactionMenu")
            );
          }
          if (!1 !== nearestObject && !localplayer.getVariable("animation")) {
            var t = nearestObject.getVariable("TYPE");
            if (t && "item" === t) {
              let e = nearestObject.getVariable("pickup");
              if (r) return;
              const t = localplayer.getVariable("tied");
              if ("cuffs" === t)
                return misc.notif(
                  "Вы не можете поднять предмет в наручниках",
                  "error"
                );
              if ("tie" === t)
                return misc.notif(
                  "Вы не можете поднять предмет со связанными руками",
                  "error"
                );
              if (!1 === e)
                return (
                  (r = !0),
                  mp.events.callRemote("sPlayer-setAnimation", "pickUpItem"),
                  mp.events.callRemote("sInventoryPickUpItem", nearestObject),
                  void setTimeout(() => {
                    mp.events.callRemote(
                      "sPlayer-setAnimation",
                      "smoothCancel"
                    ),
                      (r = !1);
                  }, 1500)
                );
              if (nearestObject.getVariable("contrabandBox"))
                return void mp.events.callRemote(
                  "sContraband-takeBox",
                  nearestObject
                );
              const a = nearestObject.getVariable("cartelCocaine");
              if (a) return void mp.events.callRemote("sCrimePickUpCocaine", a);
            }
          }
          if (
            (misc.isDriver() && mp.events.callRemote("sHouseExitGarage"),
            "cashCollector" === localplayer.getVariable("job") &&
              mp.events.callRemote("sCashCollector-InteractVeh"),
            eKeyHandler.fnc)
          ) {
            if ("openMenu" === eKeyHandler.fnc)
              return void misc.openMenu(eKeyHandler.id);
            n.indexOf(eKeyHandler.fnc) > -1
              ? mp.events.callRemote(eKeyHandler.fnc, eKeyHandler.id)
              : s.indexOf(eKeyHandler.fnc) > -1 &&
                mp.events.call(eKeyHandler.fnc, eKeyHandler.id),
              p.indexOf(eKeyHandler.fnc) > -1 && (eKeyHandler = {});
          }
          i.tryToChangeDoorState();
        }
      }),
      mp.keys.bind(192, !1, function () {
        blocked.showCursor ||
          (activeMenu && blocked.cursor) ||
          (mp.gui.cursor.visible
            ? (blocked.cursor = !1)
            : (blocked.cursor = !0));
      }),
      mp.keys.bind(120, !1, function () {
        localplayer.getVariable("ADMIN") && misc.openMenu("showConsole");
      }),
      mp.keys.bind(80, !1, function () {
        if (
          !localplayer.getVariable("nearDeath") &&
          !(
            mp.keys.isDown(78) ||
            mp.gui.cursor.visible ||
            "none" !== pageGlobal ||
            localplayer.getVariable("animation") ||
            blocked.control
          )
        ) {
          if (!localplayer.havePhone)
            return misc.notif("Нет телефона", "error");
          {
            if (localplayer.getVariable("nearDeath"))
              return misc.notif(
                "Сейчас вы не можете взаимодействовать с телефоном",
                "error"
              );
            const e = localplayer.getVariable("tied");
            if ("cuffs" === e)
              return misc.notif(
                "Вы не можете взаимодействовать с телефоном в наручниках",
                "error"
              );
            if ("tie" === e)
              return misc.notif(
                "Вы не можете взаимодействовать с телефоном со связанными руками",
                "error"
              );
            if (localplayer.inPrison)
              return misc.notif(
                "Вы не можете взаимодействовать с телефоном в тюрьме",
                "error"
              );
            mp.events.callRemote("sPlayer-setAnimation", "openPhone", !0),
              mp.attachmentMngr.addLocal("openPhone"),
              misc.openMenu("phone", !1, !1),
              (blocked.cursor = !0),
              mp.events.call("cRenderChangeDisableKey", [200], !0);
          }
        }
      }),
      mp.keys.bind(77, !1, function () {
        mp.gui.cursor.visible ||
          blocked.control ||
          mp.events.callRemote("sPlayerOpenMainMenu");
      }),
      mp.keys.bind(73, !1, function () {
        if (mp.gui.cursor.visible) return;
        if ("none" !== pageGlobal) return;
        if (blocked.control) return;
        if (activeMenu && "playerInventory" !== pageGlobal) return;
        if (localplayer.getVariable("nearDeath"))
          return misc.notif(
            "Сейчас вы не можете взаимодействовать с инвентарем",
            "error"
          );
        const e = localplayer.getVariable("tied");
        if ("cuffs" === e)
          return misc.notif(
            "Вы не можете взаимодействовать с инвентарем в наручниках",
            "error"
          );
        if ("tie" === e)
          return misc.notif(
            "Вы не можете взаимодействовать с инвентарем со связанными руками",
            "error"
          );
        if (localplayer.getVariable("isInvSearched"))
          return misc.notif(
            "Вы не можете взаимодействовать с инвентарем во время обыска",
            "error"
          );
        if (localplayer.inPrison)
          return misc.notif(
            "Вы не можете взаимодействовать с инвентарем в тюрьме",
            "error"
          );
        if ((misc.countAmmo(), "sHouseStorage" === eKeyHandler.fnc))
          mp.events.callRemote("sInventoryOpen", "house", eKeyHandler.id);
        else if ("vehicle" === entity.type) {
          if (!entity.getVariable("trunk"))
            return misc.notif("Багажник закрыт", "error");
          mp.events.callRemote("sInventoryOpen", "vehicle", entity.remoteId);
        } else misc.openMenu("playerInventory");
        localplayer.getVariable("animation") &&
          mp.events.callRemote("sPlayerCancelSelfAnim");
      }),
      mp.keys.bind(71, !1, () => {
        if (
          !mp.gui.cursor.visible &&
          !(
            blocked.control ||
            localplayer.getVariable("attachedToTrunk") ||
            localplayer.getVariable("nearDeath") ||
            localplayer.getVariable("tied") ||
            null !== mp.players.local.vehicle
          )
        ) {
          let e = mp.players.local.position,
            t = misc.getNearVehicle(e);
          if (t) {
            let e = mp.game.vehicle.getVehicleModelMaxNumberOfPassengers(
              t.model
            );
            for (let a = 0; a <= e - 2; a++)
              if (t.isSeatFree(a))
                return void mp.players.local.taskEnterVehicle(
                  t.handle,
                  -1,
                  a,
                  2,
                  1,
                  0
                );
          }
        }
      }),
      mp.keys.bind(100, !1, () => {
        if (blocked.control) return;
        let e = mp.players.local.vehicle;
        e &&
          e.getPedInSeat(-1) == mp.players.local.handle &&
          -1 == o.indexOf(e.getClass()) &&
          mp.events.callRemote("toggleIndicator", 1);
      }),
      mp.keys.bind(102, !1, () => {
        if (blocked.control) return;
        let e = mp.players.local.vehicle;
        e &&
          e.getPedInSeat(-1) == mp.players.local.handle &&
          -1 == o.indexOf(e.getClass()) &&
          mp.events.callRemote("toggleIndicator", 0);
      }),
      mp.keys.bind(101, !1, () => {
        if (blocked.control) return;
        let e = mp.players.local.vehicle;
        e &&
          e.getPedInSeat(-1) == mp.players.local.handle &&
          -1 == o.indexOf(e.getClass()) &&
          mp.events.callRemote("toggleIndicator", 2);
      }),
      mp.keys.bind(49, !1, () => {
        misc.changeWeapon("stungun");
      }),
      mp.keys.bind(50, !1, () => {
        misc.changeWeapon("pistol");
      }),
      mp.keys.bind(51, !1, () => {
        misc.changeWeapon("rifle");
      }),
      mp.keys.bind(52, !1, () => {
        misc.changeWeapon("shotgun");
      }),
      mp.keys.bind(53, !1, () => {
        misc.changeWeapon("melee");
      }),
      mp.keys.bind(32, !0, () => {
        if (mp.gui.cursor.visible) return;
        if (blocked.control) return;
        const e = localplayer.vehicle;
        e &&
          14 === e.getClass() &&
          e.getPedInSeat(-1) === localplayer.handle &&
          e.getSpeed() <= 5 &&
          mp.events.callRemote("sVehicleChangeAnchorState");
      }),
      mp.keys.bind(118, !0, () => {
        mp.events.call("cVoiceReload");
      }),
      mp.keys.bind(123, !0, () => {
        localplayer.getVariable("ADMIN") &&
          misc.injectCef("storage.toggleAdminConsole()");
      }),
      mp.keys.bind(109, !0, () => {
        if (localplayer.getVariable("ADMIN")) {
          if (mp.game.invoke("0x1DD1F58F493F1DA5")) {
            let e = mp.game.invoke("0x186E5D252FA50E7D"),
              t = mp.game.invoke("0x1BEDE233E6CD2A1F", e),
              a = mp.game.invoke("0x14F96AA50D6FBEA7", e);
            for (let e = t; 0 != mp.game.invoke("0xA6DB27D19ECBB7DA", e); e = a)
              if (4 == mp.game.invoke("0xBE9B0959FFD0779B", e)) {
                let t = mp.game.ui.getBlipInfoIdCoord(e);
                mp.events.callRemote("sPlayerTpAdmin", t);
              }
          }
          mp.events.call("cAttachmentTestChangeBone", !1);
        }
      }),
      mp.keys.bind(107, !0, () => {
        localplayer.getVariable("ADMIN") &&
          mp.events.call("cAttachmentTestChangeBone", !0);
      });
  },
  function (e, t) {
    (global.zoneNamesShort = [
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
    ]),
      (global.zoneNames = [
        "Междунаро́дный аэропо́рт Лос-Са́нтос",
        "Аламо-Си",
        "Альта",
        "Форт-Занкудо",
        "Бэнхэм-Каньон-драйв",
        "Бэннинг",
        "Веспуччи-Бич",
        "Каньон Бэнхэм",
        "Перевал Брэддока",
        "Тунель Брэддока",
        "Бёртон",
        "Мост Калафия",
        "Каньон Ратон",
        "Кэссиди-Крик",
        "Чемберлен-Хиллз",
        "Вайнвуд-Хиллз",
        "Чумаш",
        "Заповедник горы Чилиад",
        "Сайпресс-Флэтс",
        "Дэвис",
        "Дель-Перро-Бич",
        "Дель-Перро",
        "Ла-Пуэрта",
        "Пустыня Гранд-Сенора",
        "Даунтаун",
        "Вайнвуд-Даунтаун",
        "Восточный Вайнвуд",
        "Эль-Бурро-Хайтс",
        "Маяк Эль-Гордо",
        "Элизиан-Айленд",
        "Обсерватория Галилео",
        "Гольф-клуб",
        "Грейпсид",
        "Грейт-Чапаррал",
        "Хармони",
        "Хавик",
        "Вайнвудская гоночная трасса",
        "Хьюман-Лабс",
        "Тюрьма Болингброук",
        "Маленький Сеул",
        "Лэнд-экт-резервуар",
        "Лаго-Занкудо",
        "Плотина Ленд-Экт",
        "Легион-сквер",
        "Плотина Ленд-Экт",
        "Ла-Пуэрта",
        "Миррор-Парк",
        "Морнингвуд",
        "Ричард Маджестик",
        "Гора Чилиад",
        "Гора Гордо",
        "Гора Джосайя",
        "Мурьета-Хайтс",
        "Северный Чумаш",
        "N.O.O.S.E",
        "Тихий океан",
        "Бухта Палето",
        "Палето-Бэй",
        "Лес Палето",
        "Наго́рья Паломи́но",
        "Электростанция Палмер-Тейлор",
        "Пасифик-Блафс",
        "Пилбокс-Хилл",
        "Прокопио-Бич",
        "Ранчо",
        "Ричман-Глен",
        "Ричман",
        "Рокфорд-Хиллз",
        "Редвуд трек",
        "Сан-Андреас",
        "Сан-Шаньский горный хребет",
        "Сэнди-Шорс",
        "Мишн-Роу",
        "Стэб-Сити",
        "Мейз банк арена",
        "Строберри-плаза",
        "Татавиамские горы",
        "Терминал",
        "Текстайл-Сити",
        "Тонгва-Хиллз",
        "Тонгва-Вэлли",
        "Каналы Веспуччи",
        "Веспуччи",
        "Вайнвуд",
        "Ветряная ферма",
        "Западный Вайнвуд",
        "Занкудо-ривер",
        "Порт в Южном Лос-Сантосе",
        "Дейвис-Кварц",
      ]);
  },
  function (e, t) {
    mp.events.add("cAntiCheatSleep", () => {
      a.sleep(6);
    });
    var a = new (class {
        constructor() {
          (this.active = !0),
            (this.pos = mp.players.local.position),
            (this.health =
              Number(mp.players.local.getHealth()) +
              Number(mp.players.local.getArmour())),
            (this.sleepTimeout = !1);
        }
        sleep(e) {
          clearTimeout(this.sleepTimeout),
            (this.active = !1),
            (this.sleepTimeout = setTimeout(() => {
              (this.active = !0), (this.sleepTimeout = !1);
            }, 1e3 * e));
        }
        secs() {
          return Math.round(Date.now() / 1e3);
        }
        isWalking() {
          return (
            !localplayer.isFalling() &&
            !localplayer.isRagdoll() &&
            -1 === localplayer.getParachuteState() &&
            (!mp.players.local.vehicle || void 0)
          );
        }
        subtractVector(e, t) {
          return { x: e.x - t.x, y: e.y - t.y, z: e.z - t.z };
        }
        VehicleFasterThan(e) {
          return (
            !(
              !mp.players.local.vehicle ||
              parseInt(16 == mp.players.local.vehicle.getClass())
            ) &&
            localplayer.vehicle.getSpeed() >
              mp.game.vehicle.getVehicleModelMaxSpeed(
                localplayer.vehicle.model
              ) +
                100
          );
        }
        checkCarPos(e = 50) {
          if (mp.players.local.vehicle) {
            if (mp.players.local.position.z < 0) return !1;
            if (
              14 !== parseInt(mp.players.local.vehicle.getClass()) &&
              15 !== parseInt(mp.players.local.vehicle.getClass()) &&
              16 !== parseInt(mp.players.local.vehicle.getClass())
            )
              return (
                (this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(
                  mp.players.local.position.x,
                  mp.players.local.position.y,
                  mp.players.local.position.z,
                  parseFloat(0),
                  !1
                )),
                mp.players.local.position.z - this.range_to_btm >
                  e + this.range_to_btm
              );
          }
        }
      })(),
      i = a.secs();
    mp.events.add("render", () => {
      if (
        !localplayer.getVariable("ADMIN") &&
        localplayer.getVariable("guid") &&
        ((a.health =
          Number(mp.players.local.getHealth()) +
          Number(mp.players.local.getArmour())),
        i < a.secs())
      ) {
        if (a.active) {
          let e = a.subtractVector(a.pos, mp.players.local.position);
          (Math.abs(e.x) > 30 || Math.abs(e.y) > 30) &&
            (!a.isWalking() ||
              fly.flying ||
              localplayer.getVariable("attachedToTrunk") ||
              mp.events.callRemote("sAntiCheatDetect", "флай/телепорт")),
            mp.players.local.vehicle &&
              (a.checkCarPos(25) &&
                mp.events.callRemote("sAntiCheatDetect", "флай в авто"),
              a.VehicleFasterThan(250) &&
                mp.events.callRemote("sAntiCheatDetect", "спидхак в авто"),
              (Math.abs(e.x) > 250 || Math.abs(e.y) > 250) &&
                16 !== localplayer.vehicle.getClass() &&
                15 !== localplayer.vehicle.getClass() &&
                mp.events.callRemote("sAntiCheatDetect", "телепорт в авто"));
        }
        (a.pos = mp.players.local.position), (i = a.secs() + 3);
      }
    });
    const o = misc.debounce(
      () => mp.events.callRemote("sAntiCheatDetect", "Добавление хп"),
      3e3
    );
    setInterval(() => {
      if (!localplayer.getVariable("ADMIN")) return;
      let e = a.health;
      setTimeout(() => {
        e < a.health && a.active && o();
      }, 400);
    }, 500),
      setInterval(() => {
        !(function () {
          const e = mp.vehicles.toArray();
          for (const t of e)
            mp.vehicles.forEachInStreamRange((e) => {
              void 0 !== e.getVariable("door") ||
                e.spawned ||
                setTimeout(() => {
                  void 0 !== e.getVariable("door") ||
                    e.spawned ||
                    (mp.events.callRemote(
                      "sAntiCheatVehDetected",
                      JSON.stringify(e.position),
                      e.remoteId
                    ),
                    e.destroy());
                }, 1e4);
            });
        })();
      }, 3e4);
  },
  function (e, t, a) {
    "use strict";
    a.r(t);
    var i = a(2);
    (global.entity = !1), (global.nearestObject = !1);
    let o = "",
      r = "",
      l = !1;
    global.vehicleCalcData = !1;
    let n = !1;
    const s = ["prop_atm_03", "prop_fleeca_atm", "prop_atm_01", "prop_atm_02"];
    let p = !1,
      m = !1,
      d = [
        37, 12, 13, 14, 15, 16, 17, 36, 99, 100, 115, 116, 157, 158, 159, 160,
        161, 162, 163, 164, 165, 199, 261, 262, 243,
      ],
      c = mp.game.graphics.getScreenActiveResolution(1, 1),
      _ = !1;
    const u = [
      { type: "x", value: 2 },
      { type: "x", value: -2 },
      { type: "y", value: 2 },
      { type: "y", value: -2 },
      { type: "z", value: 2 },
      { type: "z", value: -2 },
    ];
    mp.events.add({
      cRenderStartCheckArmour: () => {
        m = !0;
      },
      cRenderChangeDisableKey: (e, t) => {
        "string" == typeof e && (e = JSON.parse(e)),
          (d = t ? d.concat(e) : d.filter((t) => !e.includes(t)));
      },
    }),
      setInterval(() => {
        !(function () {
          let e = mp.game.pathfind.getStreetNameAtCoord(
              localplayer.position.x,
              localplayer.position.y,
              localplayer.position.z,
              0,
              0
            ),
            t = mp.game.ui.getStreetNameFromHashKey(e.streetName);
          o != t &&
            ((o = t),
            misc.injectCef(`storage.setAdress(${JSON.stringify(t)});`));
        })(),
          (function () {
            let e = mp.game.zone.getNameOfZone(
              localplayer.position.x,
              localplayer.position.y,
              localplayer.position.z
            );
            if (zoneNamesShort.includes(e)) {
              let t = zoneNamesShort.indexOf(e);
              if (r != t && t > -1) {
                r = t;
                let e = zoneNames[t];
                misc.injectCef(`storage.setDistrict(${JSON.stringify(e)});`);
              }
            }
          })(),
          1 === localplayer.getParachuteState() &&
            mp.events.callRemote("sInventoryRemoveParachute");
      }, 1e3),
      mp.events.add("render", () => {
        if (
          (localplayer.blackScreen &&
            mp.game.controls.disableControlAction(0, 200, !0),
          (!1 === mp.system.isFocused || mp.game.ui.isPauseMenuActive()) &&
            i.talkType &&
            ("voice" === i.talkType
              ? i.stopTalkVoice()
              : "radio" === i.talkType && i.stopTalkRadio()),
          mp.game.ui.hideHudComponentThisFrame(1),
          mp.game.ui.hideHudComponentThisFrame(2),
          mp.game.ui.hideHudComponentThisFrame(3),
          mp.game.ui.hideHudComponentThisFrame(4),
          mp.game.ui.hideHudComponentThisFrame(5),
          mp.game.ui.hideHudComponentThisFrame(6),
          mp.game.ui.hideHudComponentThisFrame(7),
          mp.game.ui.hideHudComponentThisFrame(8),
          mp.game.ui.hideHudComponentThisFrame(9),
          mp.game.ui.hideHudComponentThisFrame(13),
          mp.game.ui.hideHudComponentThisFrame(20),
          m &&
            0 != p &&
            (0 === localplayer.getArmour() && p > 0
              ? mp.events.callRemote("sPlayer-removeArmour")
              : localplayer.getArmour() < p &&
                mp.events.callRemote("sPlayer-updateArmour")),
          (p = localplayer.getArmour()),
          localplayer.getVariable("nearDeath") &&
            mp.game.controls.disableAllControlActions(1),
          localplayer.vehicle)
        ) {
          var e = localplayer.vehicle;
          if (e)
            if (
              (localplayer.isUpsidedown() &&
                (mp.game.controls.disableControlAction(0, 59, !0),
                mp.game.controls.disableControlAction(0, 60, !0),
                mp.game.controls.disableControlAction(0, 61, !0)),
              e.getPedInSeat(-1) === localplayer.handle)
            ) {
              if (!1 === vehicleCalcData) {
                var t = e.getVariable("fuel"),
                  a = e.getVariable("fuelRate"),
                  o = +e.getVariable("km"),
                  r = e.getVariable("fuelTank");
                (l = e),
                  (vehicleCalcData = {
                    engine: !1,
                    door: !1,
                    speed: 0,
                    rpm: 0,
                    gear: 0,
                    fuel: t,
                    fuelRate: a,
                    fuelRateCalc: 0,
                    fuelSum: 0,
                    km: o,
                    fuelTank: r,
                  }),
                  (n = !0),
                  (function () {
                    const e = setInterval(() => {
                      if (!n)
                        return (
                          misc.injectCef(
                            `storage.setVehSpeedData(${JSON.stringify({})});`
                          ),
                          clearInterval(e)
                        );
                      if (localplayer.vehicle) {
                        var t = 1;
                        vehicleCalcData.gear < 3 && (t = 0.4),
                          vehicleCalcData.gear > 2 &&
                            vehicleCalcData.gear < 4 &&
                            (t = 0.5),
                          4 === vehicleCalcData.gear && (t = 0.7),
                          5 === vehicleCalcData.gear && (t = 1.2),
                          vehicleCalcData.gear > 5 && (t = 1.8),
                          vehicleCalcData.engine &&
                            ((vehicleCalcData.fuelRateCalc = (
                              10 *
                              vehicleCalcData.rpm *
                              (0.15 * vehicleCalcData.fuelRate) *
                              t
                            ).toFixed(3)),
                            (vehicleCalcData.fuelSum =
                              vehicleCalcData.fuelSum +
                              vehicleCalcData.fuelRateCalc / 6e4)),
                          vehicleCalcData.fuelSum > 1 &&
                            (mp.events.callRemote(
                              "sVehicle-SetFuel",
                              l,
                              vehicleCalcData.fuelSum
                            ),
                            (vehicleCalcData.fuelSum = 0)),
                          (vehicleCalcData.door = l.getVariable("door")),
                          (vehicleCalcData.fuel = l.getVariable("fuel")),
                          misc.injectCef(
                            `storage.setVehSpeedData(${JSON.stringify(
                              vehicleCalcData
                            )});`
                          );
                      }
                    }, 100);
                    let t = setInterval(() => {
                      if (!localplayer.vehicle) return clearInterval(t);
                      const e = (3.6 * localplayer.vehicle.getSpeed()).toFixed(
                        0
                      );
                      e && (vehicleCalcData.km += e / 3600);
                    }, 1e3);
                  })();
              }
              var h = Math.ceil(3.6 * e.getSpeed());
              (vehicleCalcData.engine = e.getIsEngineRunning()),
                (vehicleCalcData.speed = h),
                (vehicleCalcData.rpm = e.rpm.toFixed(4)),
                (vehicleCalcData.gear = e.gear),
                playerExamMaxSpeed &&
                  (e.getLastMaterialHitBy() &&
                    ((playerExamMaxSpeed = !1),
                    failCounter++,
                    mp.events.call("cDrivignSchoolDamageFail")),
                  playerExamMaxSpeed &&
                    playerExamMaxSpeed < h &&
                    ((playerExamMaxSpeed = !1),
                    failCounter++,
                    mp.events.call("cDrivignSchoolSpeedFail")));
            } else mp.game.controls.disableControlAction(0, 85, !0);
        } else
          n &&
            ((n = !1),
            misc.injectCef(`storage.setVehSpeedData(${JSON.stringify({})});`)),
            (vehicleCalcData = !1);
        !(function (e, t) {
          const a = localplayer.position;
          for (let i = 0, o = e.length; i < o; i++) {
            e[i];
            const o = mp.game.object.getClosestObjectOfType(
              a.x,
              a.y,
              a.z,
              t,
              mp.game.joaat(e[i]),
              !1,
              !1,
              !1
            );
            if ("number" == typeof o && o > 0) return !0;
          }
          return !1;
        })(s, 1)
          ? "sOpenBankATM" === eKeyHandler.fnc && (eKeyHandler = {})
          : eKeyHandler.fnc ||
            localplayer.vehicle ||
            ((eKeyHandler = { fnc: "sOpenBankATM", id: 0 }),
            misc.notif("Нажмите Е чтобы открыть банкомат", "info")),
          mp.gui.chat.show(blocked.chat),
          (mp.gui.cursor.visible = blocked.cursor);
        for (let e = 0, t = d.length; e < t; e++)
          mp.game.controls.disableControlAction(0, d[e], !0);
        if (
          (mp.game.player.setHealthRechargeMultiplier(0),
          (mp.game.controls.useDefaultVehicleEntering = !1),
          localplayer.isSprinting() && mp.game.player.restoreStamina(100),
          localplayer.isDead()
            ? ((entity = !1), (nearestObject = !1))
            : ((entity = (function () {
                const e = localplayer.position,
                  t = mp.game.graphics.screen2dToWorld3d([
                    c.x / 2,
                    c.y / 2,
                    14,
                  ]);
                if (void 0 === t) return !1;
                e.z += 0.7;
                for (let a = 0, i = u.length; a < i; a++) {
                  const i = u[a];
                  t[i.type] += i.value;
                  const o = mp.raycasting.testPointToPoint(
                    e,
                    t,
                    localplayer,
                    30
                  );
                  if (void 0 !== o) {
                    if (void 0 === o.entity.type) continue;
                    if ("object" === o.entity.type) continue;
                    if (misc.vdist(o.entity.position, localplayer.position) > 4)
                      continue;
                    return o.entity;
                  }
                }
                return !1;
              })()),
              (nearestObject = (function () {
                let e = !1,
                  t = !1;
                return (
                  localplayer.vehicle
                    ? mp.players.forEachInStreamRange((a) => {
                        const i = misc.vdist(localplayer.position, a.position);
                        localplayer.id !== a.id &&
                          localplayer.dimension === a.dimension &&
                          i < 2 &&
                          (!1 === e
                            ? ((e = a), (t = i))
                            : i < t && ((e = a), (t = i)));
                      })
                    : mp.objects.forEachInStreamRange((a) => {
                        const i = misc.vdist(localplayer.position, a.position);
                        void 0 !== a.getVariable("TYPE") &&
                          localplayer.dimension === a.dimension &&
                          i < 2 &&
                          (!1 === e
                            ? ((e = a), (t = i))
                            : i < t && ((e = a), (t = i)));
                      }),
                  e
                );
              })())),
          !1 !== nearestObject &&
            !1 === entity &&
            mp.game.graphics.drawText(
              "E",
              [
                nearestObject.position.x,
                nearestObject.position.y,
                nearestObject.position.z,
              ],
              {
                font: 0,
                color: [255, 255, 255, 185],
                scale: [0.4, 0.4],
                outline: !0,
              }
            ),
          mp.game.player.isFreeAiming() && !1 !== entity)
        ) {
          const e = mp.game.player.isFreeAimingAtEntity(entity.handle);
          "player" === entity.type &&
            e &&
            _ != entity &&
            (_ &&
              (mp.events.callRemote("sPlayer-changeInTargetState", _, !1),
              (_ = !1)),
            mp.events.callRemote("sPlayer-changeInTargetState", entity, !0),
            (_ = entity));
        } else
          _ &&
            (mp.events.callRemote("sPlayer-changeInTargetState", _, !1),
            (_ = !1));
        if (!1 !== entity) {
          const e = entity.getVariable("invisible");
          let t = "E";
          "vehicle" === entity.type &&
            localplayer.getVariable("ADMIN") &&
            (t += ` (ID: ${entity.remoteId})`),
            e ||
              mp.game.graphics.drawText(
                t,
                [entity.position.x, entity.position.y, entity.position.z],
                {
                  font: 0,
                  color: [255, 255, 255, 185],
                  scale: [0.4, 0.4],
                  outline: !0,
                }
              );
        }
      });
  },
  function (e, t) {
    (global.cef = null),
      (global.activeMenu = !1),
      (global.pageGlobal = "none"),
      (global.blocked = {
        chat: !1,
        hud: !1,
        control: !1,
        cursor: !1,
        showCursor: !1,
      });
    let a = null;
    const i = mp.players.local;
    let o = null,
      r = null,
      l = null,
      n = null,
      s = null,
      p = !1,
      m = !1,
      d = !1;
    const c = [
      22, 23, 24, 25, 30, 31, 32, 33, 34, 37, 63, 64, 71, 72, 86, 133, 134, 140,
      141, 142, 143, 263, 264, 257,
    ];
    let _ = !1;
    mp.game.gameplay.setFadeOutAfterDeath(!1),
      (mp.game.vehicle.defaultEngineBehaviour = !1),
      mp.players.local.setConfigFlag(429, !0),
      (t.prettify = function (e) {
        return e.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1 ");
      });
    function u(e = null) {
      (mp.gui.cursor.visible = !0),
        mp.gui.chat.show(!1),
        e && mp.game.graphics.transitionToBlurred(e);
    }
    function h(e) {
      cef && cef.execute(e);
    }
    function y(e) {
      cef && cef.destroy(), (cef = mp.browsers.new(e));
    }
    function b() {
      P("none");
    }
    function I() {
      a &&
        (a.setActive(!1),
        mp.game.cam.renderScriptCams(!1, !0, 0, !0, !0),
        a.destroy(),
        (a = null));
    }
    let x;
    function f(e, t = 1) {
      "up" === e
        ? ((blocked.chat = !1),
          (x = "false"),
          natives.SWITCH_OUT_PLAYER(i.handle, 0, parseInt(t)))
        : "down" === e &&
          ("false" == x &&
            (function e() {
              natives.IS_PLAYER_SWITCH_IN_PROGRESS()
                ? setTimeout(() => {
                    e();
                  }, 400)
                : ("none" === pageGlobal && (blocked.chat = !0), (x = "true"));
            })(),
          natives.SWITCH_IN_PLAYER(i.handle));
    }
    function P(e, t = !0, a = !0) {
      if (e) {
        if (e === pageGlobal) {
          if (
            [
              "charsList",
              "login",
              "recovery",
              "registration",
              "charsCreate",
              "charSpawn",
            ].indexOf(pageGlobal) > -1
          )
            return;
          e = "none";
        }
        h(`storage.setPage('${e}');`),
          (pageGlobal = e),
          "none" === e && ((global.activeMenu = !1), (t = !0), (a = !1));
      }
      -1 ===
      [
        "none",
        "showConsole",
        "testMenu",
        "interactionMenu",
        "phone",
        "fishingStart",
      ].indexOf(e)
        ? h("storage.setHud(false);")
        : h("storage.setHud(true);"),
        t
          ? ((activeMenu = a),
            a
              ? ((blocked.chat = !1),
                (blocked.hud = !1),
                (blocked.control = !1),
                (blocked.cursor = !0))
              : ((blocked.chat = !0),
                (blocked.hud = !0),
                (blocked.control = !1),
                (blocked.cursor = !1)))
          : activeMenu
          ? ((activeMenu = !1),
            (blocked.chat = !0),
            (blocked.hud = !0),
            (blocked.control = !0),
            (blocked.cursor = !1))
          : ((activeMenu = a),
            (blocked.chat = !1),
            (blocked.hud = !0),
            (blocked.control = !0),
            (blocked.cursor = !1)),
        p && (blocked.chat = !1),
        m && (blocked.hud = !1),
        mp.game.ui.displayRadar(blocked.hud);
    }
    function w(e, t) {
      return e && t
        ? mp.game.system.vdist(e.x, e.y, e.z, t.x, t.y, t.z)
        : misc.notif("error in vdist", "error");
    }
    function g(e, t = "success") {
      const a = JSON.stringify({ text: e, theme: t });
      misc.injectCef(`storage.addNotification(${a});`);
    }
    function w(e, t) {
      return e && t
        ? mp.game.system.vdist(e.x, e.y, e.z, t.x, t.y, t.z)
        : Number.MAX_VALUE;
    }
    function M(e, t = 10) {
      var a,
        i = 99999;
      return (
        mp.vehicles.forEachInStreamRange((o) => {
          if ("vehicle" === o.type) {
            var r = misc.vdist(e, o.position);
            if (r < t) {
              var l = misc.vdist(e, misc.getVehicleBonePosition(o, "bonnet")),
                n = misc.vdist(e, misc.getVehicleBonePosition(o, "boot")),
                s = Math.min(r, l, n);
              s < i && ((a = o), (i = s));
            }
          }
        }),
        a && (a.minDist = i),
        a
      );
    }
    function N(e, t, a, i, o) {
      mp.game.object.doorControl(e, t, a, i, o, 0, 0, 0);
    }
    function v(e) {
      l && mp.game.graphics.stopScreenEffect(l),
        e && (mp.game.graphics.startScreenEffect(e, 0, !0), (l = e));
    }
    function T(e) {
      for (let t in cc.tattoos)
        for (let a in cc.tattoos[t])
          if (cc.tattoos[t][a].id === e)
            return Object.assign({}, cc.tattoos[t][a], { type: t });
      return !1;
    }
    function k(e) {
      natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT(!0);
      let t = natives.GET_FIRST_BLIP_INFO_ID(e);
      for (; natives.DOES_BLIP_EXIST(t); )
        natives.SET_BLIP_SPRITE(t, 2), (t = natives.GET_NEXT_BLIP_INFO_ID(e));
    }
    function S(e) {
      for (let t in cc.weaponConfig)
        if (cc.weaponConfig[t].hash === e) return t;
      return !1;
    }
    function F(e = 10) {
      return new Promise((t) => setTimeout(t, e));
    }
    function C(e, t) {
      let a = !1;
      return function () {
        a ||
          (e.apply(this, arguments),
          (a = !0),
          setTimeout(() => {
            a = !1;
          }, t));
      };
    }
    (t.roundNum = (e, t = 0) => parseFloat(e.toFixed(t))),
      (t.prepareToCef = u),
      (t.injectCef = h),
      (t.openCef = y),
      (t.closeCef = b),
      (t.createCam = function (e, t, i, o, r, l, n, s = null) {
        a && a.destroy(),
          (a = mp.cameras.new(
            "Cam",
            { x: e, y: t, z: i },
            { x: o, y: r, z: l },
            n
          )),
          null != s && a.pointAtCoord(s.x, s.y, s.z),
          a.setActive(!0),
          mp.game.cam.renderScriptCams(!0, !0, 2e25, !1, !1);
      }),
      (t.destroyCam = I),
      (t.moveFromToAir = f),
      (t.getPlayerGUID = function (e) {
        return (
          mp.players.forEach((t) => {
            if (t.guid === e) return t;
          }),
          !1
        );
      }),
      (t.openMenu = P),
      (t.vdist = w),
      (t.notif = g),
      (t.getVehicleBonePosition = function (e, t) {
        if (!e || !t) return null;
        var a = e.position,
          i = e.getWorldPositionOfBone(e.getBoneIndexByName(t)),
          o = w(a, i);
        return o > 10 ? null : e.getOffsetFromInWorldCoords(0, -o - 1, 0);
      }),
      (t.getRandomInt = function (e = 0, t = 100) {
        return Math.floor(Math.random() * (t - e + 1)) + e;
      }),
      (t.getNearVehicle = M),
      (t.cloneObj = function (e) {
        return JSON.parse(JSON.stringify(e));
      }),
      (t.doorControl = N),
      (t.getTattoo = T),
      (t.setTattoo = function (e, t) {
        e.clearDecorations(),
          t.forEach((t) => {
            const a = T(t),
              i = 1885233650 === e.model ? a.malehash : a.femalehash;
            mp.game.invoke(
              "0x5F5D1665E352A839",
              e.handle,
              mp.game.joaat(a.dictionary) >> 0,
              mp.game.joaat(i) >> 0
            );
          });
      }),
      (t.changeWeapon = function (e) {
        if (mp.gui.cursor.visible) return;
        if (blocked.control) return;
        if (localplayer.vehicle) return;
        if (localplayer.getVariable("animation")) return;
        let t = localplayer.getVariable("weapons");
        if (t) {
          const a = (t = JSON.parse(t))[e] >> 0;
          if (a)
            if (a === natives.GET_SELECTED_PED_WEAPON(localplayer.handle))
              natives.SET_CURRENT_PED_WEAPON(
                localplayer.handle,
                mp.game.joaat("weapon_unarmed") >> 0,
                !1
              );
            else {
              const e = localplayer.getVariable("tied");
              if ("cuffs" === e)
                return misc.notif(
                  "Вы не можете достать оружие в наручниках",
                  "error"
                );
              if ("tie" === e)
                return misc.notif(
                  "Вы не можете достать оружие со связанными руками",
                  "error"
                );
              natives.SET_CURRENT_PED_WEAPON(localplayer.handle, a, !1);
            }
        }
      }),
      setInterval(() => {
        if (
          localplayer.vehicle &&
          localplayer.vehicle.getPedInSeat(-1) &&
          localplayer.vehicle.getPedInSeat(-1) !== localplayer.handle
        ) {
          const e = mp.players.atHandle(localplayer.vehicle.getPedInSeat(-1));
          if (!e) return;
          let t = e.getVariable("driverCheckpoint");
          if (natives.IS_WAYPOINT_ACTIVE()) {
            const a = (function () {
              if (mp.game.invoke("0x1DD1F58F493F1DA5")) {
                let e = mp.game.invoke("0x186E5D252FA50E7D"),
                  t = mp.game.invoke("0x1BEDE233E6CD2A1F", e),
                  a = mp.game.invoke("0x14F96AA50D6FBEA7", e);
                for (
                  let e = t;
                  0 != mp.game.invoke("0xA6DB27D19ECBB7DA", e);
                  e = a
                )
                  if (4 == mp.game.invoke("0xBE9B0959FFD0779B", e))
                    return mp.game.ui.getBlipInfoIdCoord(e);
              }
            })();
            if (!a) return;
            if (t) {
              const { x: e, y: i } = JSON.parse(t);
              if (e === a.x && i === a.y) return;
            }
            if ("taxi" === e.getVariable("job")) {
              let t = e.getVariable("taxiBusy");
              t
                ? (t = JSON.parse(t)).passGuid ===
                    localplayer.getVariable("guid") &&
                  t.posX !== a.x &&
                  t.posY !== a.y &&
                  mp.events.callRemote(
                    "sTaxi-ChangeOrderCoord",
                    e.remoteId,
                    JSON.stringify(a)
                  )
                : mp.events.callRemote(
                    "sTaxi-NewOrderFromRoad",
                    e.remoteId,
                    JSON.stringify(a)
                  );
            } else
              mp.events.callRemote(
                "sPlayerCreateDriverCheckpoint",
                e.remoteId,
                a.x,
                a.y
              );
          } else if (t) {
            const { id: a } = JSON.parse(t);
            a === localplayer.remoteId &&
              mp.events.callRemote("sPlayerRemoveDriverCheckpoint", e.remoteId);
          }
        }
      }, 1e3),
      (t.clearNativeBlips = k),
      k(5),
      k(9),
      (t.createNativeBlip = function (e, t, a = 25, i = 9, o = 1) {
        const r = mp.game.ui.addBlipForRadius(e, t, 1, a);
        natives.SET_BLIP_SPRITE(r, i),
          natives.SET_BLIP_ALPHA(r, 150),
          natives.SET_BLIP_COLOUR(r, o);
      }),
      (t.setVehicleGenerator = function (e) {
        e
          ? (mp.game.streaming.setVehiclePopulationBudget(3),
            mp.game.vehicle.setAllLowPriorityVehicleGeneratorsActive(!0))
          : (mp.game.streaming.setVehiclePopulationBudget(0),
            mp.game.vehicle.setAllLowPriorityVehicleGeneratorsActive(!1));
      }),
      (t.setVoiceState = function (e) {
        h(`storage.setVoiceState(${e});`);
      }),
      (t.playPedAnim = async function (e) {
        if (mp.game.streaming.doesAnimDictExist(e.animDict)) {
          for (
            mp.game.streaming.requestAnimDict(e.animDict);
            !mp.game.streaming.hasAnimDictLoaded(e.animDict);

          )
            await F();
          console.error(
            `[Client: cMisc.js] On playPedAnim: dict:${e.animDict}; name:${e.animName}`
          ),
            e.taskPlayAnim(
              e.animDict,
              e.animName.toString(),
              1,
              1,
              -1,
              1,
              1,
              !1,
              !1,
              !1
            );
        }
      }),
      (t.isDriver = function () {
        return (
          !!localplayer.vehicle &&
          localplayer.vehicle.getPedInSeat(-1) === localplayer.handle
        );
      }),
      (t.countAmmo = function () {
        const e = JSON.parse(localplayer.getVariable("weapons")),
          t = {};
        for (const a in e)
          t[S(e[a])] = natives.GET_AMMO_IN_PED_WEAPON(
            localplayer.handle,
            e[a] >> 0
          );
        h(`storage.setPlayerAmmo(${JSON.stringify(t)});`);
      }),
      (t.sleep = F),
      (t.getRotationZ = function (e) {
        if (!e) return misc.notif("Произошла ошибка в getRotationZ", "error");
        const t = e.getRotation(2).z;
        return t > 0 ? t : 360 - Math.abs(t);
      }),
      (t.setAnchor = function (e, t) {
        mp.game.invoke("0x75DBEC174AEEAD10", e.handle, !!t),
          mp.game.invoke("0xE3EBAAE484798530", e.handle, !!t);
      }),
      (t.xyInFrontOfPos = function (e, t, a) {
        return (
          (e = Object.assign({}, e)),
          (t *= Math.PI / 180),
          (e.x += a * Math.sin(-t)),
          (e.y += a * Math.cos(-t)),
          e
        );
      }),
      (t.isPointInPolygon = function (e, t, a) {
        let i = !1;
        for (let o = 0, r = a.length - 1; o < a.length; r = o++) {
          const l = a[o][0],
            n = a[o][1],
            s = a[r][0],
            p = a[r][1];
          n > t != p > t && e < ((s - l) * (t - n)) / (p - n) + l && (i = !i);
        }
        return i;
      }),
      (t.throttle = function (e, t) {
        let a,
          i,
          o = !1;
        return function r() {
          if (o) return (a = arguments), void (i = this);
          e.apply(this, arguments),
            (o = !0),
            setTimeout(function () {
              (o = !1), a && (r.apply(i, a), (a = i = null));
            }, t);
        };
      }),
      (t.debounce = C);
    const V = C(
      () => mp.events.callRemote("sAntiCheatDetect", "Оружие взятое из чита"),
      3e3
    );
    var z;
    mp.events.addDataHandler("driverCheckpoint", (e, t) => {
      if (
        "player" === e.type &&
        e.handle === localplayer.handle &&
        (d && (d.destroy(), (d = !1)), t)
      ) {
        const e = JSON.parse(t);
        (z = e),
          (d = mp.blips.new(1, new mp.Vector3(z.x, z.y, 0), {
            name: "Точка пассажира",
            shortRange: !1,
            scale: 1,
          })),
          "cashCollector" !== localplayer.getVariable("job") && d.setRoute(!0);
      }
    }),
      mp.events.add("moveSkyCamera", f),
      mp.events.add({
        cInjectCef: (e) => {
          h(e);
        },
        cShowCursor: (e) => {
          blocked.cursor = e;
        },
        cBlockControl: (e) => {
          (blocked.control = e),
            mp.events.call("cRenderChangeDisableKey", c, e),
            h(`storage.setChatActive(${e});`);
        },
        cShowChat: (e) => {
          blocked.chat = e;
        },
        cSetPage: (e, t = !0, a = !0) => {
          P(e, t, a);
        },
        cCloseCef: () => b(),
        cDestroyCam: () => I(),
        cOpenMenu: () => P(!0, !0),
        cCloseCefAndDestroyCam: () => {
          b(), I();
        },
        cChangeHeading: (e) => i.setHeading(e),
        "cMisc-CreateChooseWindow": (e, t, a, i) => {
          u(500), y("http://package/RP/Browsers/Misc/chooseWindow.html"), h(t);
        },
        "cMisc-CallServerEvent": (e, ...t) => mp.events.callRemote(e, ...t),
        cActionCommand: (e, t) => {
          mp.events.callRemote("sAction-Command", e, entity, t);
        },
        "cMisc-CallServerEvenWithTimeout": (e, t) => {
          setTimeout(() => {
            mp.events.callRemote(e);
          }, t);
        },
        "cMisc-CreateClientBlip": (e, t = !0) => {
          o && (o.destroy(), (o = !1)),
            o || (o = mp.blips.new(e.sprite, e.position, e)).setRoute(!0),
            r && (r.destroy(), (r = !1)),
            t &&
              ((r = mp.colshapes.newSphere(
                e.position.x,
                e.position.y,
                e.position.z,
                10
              )).destroyShape = !0);
        },
        "cMisc-RemoveClientBlip": () => {
          o && (o.destroy(), (o = null)), r && (r.destroy(), (r = null));
        },
        "cMisc-setFollow": (e, t) => {
          e
            ? t &&
              mp.players.exists(t) &&
              i.taskFollowToOffsetOf(t.handle, 0, 0, 0, 1, -1, 1, !0)
            : localplayer.clearTasks();
        },
        "cMisc-PutPlayerInFreeSeat": (e, t) => {
          let a = !1;
          for (var i = t.getMaxNumberOfPassengers() - 1; i >= 0; i--)
            if (t.isSeatFree(i)) {
              a = i;
              break;
            }
          mp.events.callRemote("sVehicle-PutPlayerInVehicle", t, a, e);
        },
        "cMisc-attachToCar": (e) => {
          let t = M(localplayer.position);
          localplayer.attachedToVeh && localplayer.detach(!0, !1),
            localplayer.attachTo(
              t.handle,
              t.getBoneIndexByName("bumper_r"),
              e.offX,
              e.offY,
              e.offZ,
              e.rotX,
              e.rotY,
              e.rotZ,
              !1,
              !1,
              !1,
              !1,
              2,
              !0
            ),
            (localplayer.attachedToVeh = t.handle);
        },
        "cMisc-detachFromCar": (e) => {
          localplayer.attachedToVeh && localplayer.detach(!0, !1);
        },
        "cMisc-setScreenEffect": (e) => {
          v(e);
        },
        playerWeaponShot: (e, t) => {
          let a = natives.GET_SELECTED_PED_WEAPON(localplayer.handle);
          if (-1569615261 === a) return;
          if (911657153 === a) return;
          if ("cashCollector" !== localplayer.getVariable("job")) {
            let e = natives.GET_AMMO_IN_PED_WEAPON(localplayer.handle, a);
            (e % 5 != 0 && 1 !== e) ||
              mp.events.callRemote("sPlayer-updateAmmo", e);
          }
          const i = JSON.parse(localplayer.getVariable("weapons"));
          for (const e in i) if (i[e] >> 0 === a) return;
          V();
        },
        "cMisc-CreateSosColshape": (e) => {
          mp.colshapes.exists(n) && mp.colshapes.at(n).destroy();
          const t = mp.colshapes.newSphere(e.x, e.y, e.z, 10);
          (t.sosShape = !0), (n = t.id);
        },
        "cMisc-DestroySosColshape": (e) => {
          mp.colshapes.exists(n) && mp.colshapes.at(n).destroy(), (n = !1);
        },
        cMiscDoorControl: (e, t, a, i, o) => {
          N(e, t, a, i, o);
        },
        cMiscCreateVehTrackColshape: (e) => {
          mp.colshapes.exists(s) && mp.colshapes.at(s).destroy();
          const t = mp.colshapes.newSphere(e.x, e.y, e.z, 10);
          (t.vehTrack = !0), (s = t.id);
        },
        cMiscSetDeathState: () => {
          v("DeathFailMPIn");
        },
        cMiscCancelDeathState: () => {
          v(!1);
        },
        cMiscSetChatMessageShow: (e) => {
          (p = !e), h(`storage.setChatMessageShow(${e});`);
        },
        cMiscSetShowNametags: (e) => {
          (showNametags = e), h(`storage.setShowNametags(${e});`);
        },
        cMiscSetClothes: (e, t, a, i) => {
          localplayer.setComponentVariation(e, t, a, i);
        },
        cMiscSetProp: (e, t, a) => {
          localplayer.setPropIndex(e, t, a, !0);
        },
        cMiscFreezePosition: (e) => {
          localplayer.freezePosition(e);
        },
        cMiscSetOnGroundProperly: () => {
          localplayer.vehicle && localplayer.vehicle.setOnGroundProperly();
        },
        cMiscSwitchCamDown: (e) => {
          natives.SWITCH_IN_PLAYER(i.handle);
          const t = setInterval(() => {
            natives.IS_PLAYER_SWITCH_IN_PROGRESS() ||
              (localplayer.freezePosition(!1), clearInterval(t));
          }, 200);
        },
        cMiscInjectAndShowPage: (e, t) => {
          h(e), P(t);
        },
        cMiscUpdatePlayersNumber: (e) => {
          if ((h(`storage.setPlayersNumber(${e}); `), !i.loggedIn)) return;
          const t = {
            id: i.guid,
            name: i.name,
            gender: i.gender,
            dateOfBirth: i.bithday,
            factionTitle: i.factionID ? i.factionCore.title : "",
            rank: i.factionID ? i.rank.rank : "",
            rankTitle: i.factionID ? i.rank.title : "",
            level: i.level,
            exp: i.exp,
            job: i.job.title,
          };
          i.setProperty();
          let a = `storage.setMainData(${JSON.stringify(t)});`;
          i.call("cInjectCef", [a]),
            mp.discord.update("Parvenu Role Play", "  ");
        },
        cMiscCountAmmo: () => {
          misc.countAmmo();
        },
        cMiscSetWeatherNow: (e) => {
          mp.game.gameplay.setWeatherTypeNowPersist(e);
        },
        cMiscDropPlayerWeapon: () => {
          const { x: e, y: t, z: a } = localplayer.position,
            i = mp.game.gameplay.getGroundZFor3dCoord(e, t, a, 0, !1);
          mp.events.callRemote("sPlayerDropPlayerWeapon", i);
        },
        cMiscNotif: (e, t = "success") => {
          g(e, t);
        },
        cMiscBlockedShowCursor: (e) => {
          blocked.showCursor = e;
        },
        cMiscSetBlackScreen: (e, t) => {
          (localplayer.blackScreen = e),
            e
              ? (mp.game.cam.doScreenFadeOut(0),
                h(`storage.setBlackScreen("${t}");`))
              : (mp.game.cam.doScreenFadeIn(0),
                h("storage.setBlackScreen(false);"));
        },
        cMiscSetShowMiniMap: (e) => {
          (blocked.hud = e), (m = !e);
        },
        cMiscLoadClothMenu: () => {
          _
            ? misc.notif("Меню одежды уже загружено", "info")
            : (misc.notif("Меню одежды доступно"),
              require("ClothesMenu"),
              (_ = !0));
        },
      });
  },
  function (e, t) {
    e.exports = {
      SET_BLIP_SPRITE: (e, t) => mp.game.invoke("0xDF735600A4696DAF", e, t),
      SET_BLIP_ALPHA: (e, t) => mp.game.invoke("0x45FF974EEE1C8734", e, t),
      SET_BLIP_COLOUR: (e, t) => mp.game.invoke("0x03D7FB09E75D6B7E", e, t),
      SET_BLIP_ROTATION: (e, t) => mp.game.invoke("0xF87683CDF73C3F6E", e, t),
      SET_BLIP_FLASHES: (e, t) => mp.game.invoke("0xB14552383D39CE3E", e, t),
      SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT: (e) =>
        mp.game.invoke("0xB98236CAAECEF897", e),
      GET_FIRST_BLIP_INFO_ID: (e) => mp.game.invoke("0x1BEDE233E6CD2A1F", e),
      GET_NEXT_BLIP_INFO_ID: (e) => mp.game.invoke("0x14F96AA50D6FBEA7", e),
      DOES_BLIP_EXIST: (e) => mp.game.invoke("0xA6DB27D19ECBB7DA", e),
      GET_SELECTED_PED_WEAPON: (e) => mp.game.invoke("0x0A6DB4965674D243", e),
      GET_AMMO_IN_PED_WEAPON: (e, t) =>
        mp.game.invoke("0x015A522136D7F951", e, t),
      SWITCH_OUT_PLAYER: (e, t, a) =>
        mp.game.invoke("0xAAB3200ED59016BC", e, t, a),
      SWITCH_IN_PLAYER: (e) => mp.game.invoke("0xD8295AF639FD9CB8", e),
      IS_PLAYER_SWITCH_IN_PROGRESS: () => mp.game.invoke("0xD9D2CFFF49FAB35F"),
      SET_PED_HEAD_OVERLAY: (e, t, a, i) =>
        mp.game.invoke("0x48F44967FA05CC1E"),
      SET_CURRENT_PED_WEAPON: (e, t, a) =>
        mp.game.invoke("0xADF692B254977C0C", e, t, a),
      IS_WAYPOINT_ACTIVE: () => mp.game.invoke("0x1DD1F58F493F1DA5"),
    };
  },
  function (e, t, a) {
    (global.localplayer = mp.players.local),
      (global.natives = a(86)),
      (global.misc = a(85));
    let i = mp.game.interior.getInteriorAtCoords(1100, 220, -50);
    mp.game.streaming.requestIpl("vw_casino_main"),
      mp.game.interior.refreshInterior(i),
      (global.cc = { tattoos: a(10), weaponConfig: a(13), matsPrice: a(4) }),
      a(84),
      a(83),
      a(82),
      a(81),
      a(2),
      a(80),
      a(79),
      a(78),
      a(77),
      a(7),
      a(76),
      a(75),
      a(74),
      a(73),
      a(72),
      a(71),
      a(70),
      a(69),
      a(68),
      a(67),
      a(66),
      a(65),
      a(61),
      a(60),
      a(59),
      a(58),
      a(57),
      a(56),
      a(55),
      a(53),
      a(52),
      a(51),
      a(50),
      a(49),
      a(48),
      a(47),
      a(46),
      a(45),
      a(43),
      a(42),
      a(41),
      a(40),
      a(39),
      a(38),
      a(37),
      a(36),
      a(32),
      a(31),
      a(30),
      a(29),
      a(27),
      a(26),
      mp.gui.chat.show(!1),
      (global.chatbox = mp.browsers.new("http://package/index.html")),
      chatbox.execute("cef.$router.push('/chat');"),
      chatbox.markAsChat(),
      a(25),
      mp.game.player.setWeaponDamageModifier(0.01);
  },
]);
