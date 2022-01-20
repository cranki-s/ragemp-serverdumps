{
  let pointing = {
    active: !1,
    interval: null,
    lastSent: 0,
    start: function () {
      if (!this.active) {
        for (
          this.active = !0, mp.game.streaming.requestAnimDict("anim@mp_point");
          !mp.game.streaming.hasAnimDictLoaded("anim@mp_point");

        )
          mp.game.wait(0);
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
          (this.interval = setInterval(this.process.bind(this), 0));
      }
    },
    stop: function () {
      this.active &&
        (clearInterval(this.interval),
        (this.interval = null),
        (this.active = !1),
        mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop"),
        !mp.game.invoke("0x84A2DD9AC37C35C1", mp.players.local.handle) &&
          mp.game.invoke("0x176CECF6F920D707", mp.players.local.handle),
        !mp.players.local.isInAnyVehicle(!0) &&
          mp.game.invoke(
            "0x0725a4ccfded9a70",
            mp.players.local.handle,
            1,
            1,
            1,
            1
          ),
        mp.players.local.setConfigFlag(36, !1));
    },
    gameplayCam: mp.cameras.new("gameplay"),
    lastSync: 0,
    getRelativePitch: function () {
      let a = this.gameplayCam.getRot(2);
      return a.x - mp.players.local.getPitch();
    },
    process: function () {
      if (this.active) {
        mp.game.invoke("0x921ce12c489c4c41", mp.players.local.handle);
        let a = this.getRelativePitch();
        -70 > a ? (a = -70) : 42 < a && (a = 42), (a = (a + 70) / 112);
        let b = mp.game.cam.getGameplayCamRelativeHeading(),
          c = mp.game.system.cos(b),
          d = mp.game.system.sin(b);
        -180 > b ? (b = -180) : 180 < b && (b = 180), (b = (b + 180) / 360);
        let e = mp.players.local.getOffsetFromGivenWorldCoords(
            -0.2 * c - d * (0.4 * b + 0.3),
            -0.2 * d + c * (0.4 * b + 0.3),
            0.6
          ),
          f =
            "undefined" !=
            typeof mp.raycasting.testPointToPoint(
              [e.x, e.y, e.z - 0.2],
              [e.x, e.y, e.z + 0.2],
              mp.players.local.handle,
              7
            );
        mp.game.invoke(
          "0xd5bb4025ae449a4e",
          mp.players.local.handle,
          "Pitch",
          a
        ),
          mp.game.invoke(
            "0xd5bb4025ae449a4e",
            mp.players.local.handle,
            "Heading",
            -1 * b + 1
          ),
          mp.game.invoke(
            "0xb0a6cfd2c69c1088",
            mp.players.local.handle,
            "isBlocked",
            f
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
          global.fingerPointingEnableOutSync &&
            100 < Date.now() - this.lastSent &&
            ((this.lastSent = Date.now()),
            mp.events.callRemoteUnreliable("fpsync.update", a, b));
      }
    },
  };
  (global.fingerPointingEnableOutSync = !0),
    (global.fingerPointingActive = !1),
    mp.events.add("fpsync.update", async (a, b, c) => {
      const d = mp.players.atRemoteId(parseInt(a));
      if (d && 0 !== d.handle && d != mp.players.local) {
        if (((d.lastReceivedPointing = Date.now()), !d.pointingInterval)) {
          (d.pointingInterval = setInterval(
            function () {
              if (1e3 < Date.now() - d.lastReceivedPointing) {
                if (
                  (clearInterval(d.pointingInterval),
                  (d.lastReceivedPointing = void 0),
                  (d.pointingInterval = void 0),
                  !mp.players.exists(d) || 0 === d.handle)
                )
                  return;
                mp.game.invoke("0xd01015c7316ae176", d.handle, "Stop"),
                  d.isInAnyVehicle(!0) ||
                    mp.game.invoke("0x0725a4ccfded9a70", d.handle, 1, 1, 1, 1),
                  d.setConfigFlag(36, !1),
                  mp.game.invoke("0x84A2DD9AC37C35C1", d.handle) ||
                    mp.game.invoke("0x176CECF6F920D707", d.handle);
              }
            }.bind(d),
            500
          )),
            mp.game.streaming.requestAnimDict("anim@mp_point");
          do await mp.game.waitAsync(1);
          while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point"));
          if (!mp.players.exists(d) || 0 === d.handle) return;
          mp.game.invoke("0x0725a4ccfded9a70", d.handle, 0, 1, 1, 1),
            d.setConfigFlag(36, !0),
            d.taskMoveNetwork("task_mp_pointing", 0.5, !1, "anim@mp_point", 24),
            mp.game.streaming.removeAnimDict("anim@mp_point");
        }
        mp.game.invoke("0xd5bb4025ae449a4e", d.handle, "Pitch", b),
          mp.game.invoke("0xd5bb4025ae449a4e", d.handle, "Heading", -1 * c + 1),
          mp.game.invoke("0xb0a6cfd2c69c1088", d.handle, "isBlocked", 0),
          mp.game.invoke("0xb0a6cfd2c69c1088", d.handle, "isFirstPerson", 0);
      }
    });
  let fingerInterval = null;
  const fingerBinder = global.binder.register({
    action: "FINGERPOINTER",
    desc: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0430\u043B\u044C\u0446\u0435\u043C",
    defaultKey: 78,
    func: () => {
      mp.gui.cursor.visible ||
        global.isChatOpen ||
        global.disableKeys ||
        global.isConfirmMenuOpen ||
        mp.players.local.getVariable("cuffed") ||
        0 != global.getPlayerCurrentWeaponData().weapon ||
        global.isPlayerDeath ||
        fingerInterval ||
        (pointing.start(),
        (global.fingerPointingActive = !0),
        (fingerInterval = setInterval(() => {
          mp.keys.isDown(fingerBinder.key) ||
            mp.keys.isDown(fingerBinder.key) ||
            ((global.fingerPointingActive = !1),
            pointing.stop(),
            clearInterval(fingerInterval),
            (fingerInterval = null));
        }, 150)));
    },
  });
}
