{
  const chrouchSystem = {
    active: !1,
    start: function () {
      this.active ||
        ((this.active = !0),
        (global.crouchActive = !0),
        mp.players.local.setMovementClipset("move_ped_crouched", 0.25),
        mp.players.local.setStrafeClipset("move_ped_crouched_strafing"));
    },
    stop: function () {
      this.active &&
        ((this.active = !1),
        (global.crouchActive = !1),
        mp.players.local.resetMovementClipset(0.25),
        mp.players.local.resetStrafeClipset());
    },
  };
  global.crouchActive = !1;
  let crouchEnableFromSystem = !1;
  (global.crouchSystemStart = () => {
    (crouchEnableFromSystem = !0),
      chrouchSystem.start(),
      (global.crouchEnable = !0);
  }),
    (global.crouchSystemEnd = () => {
      (crouchEnableFromSystem = !1),
        chrouchSystem.stop(),
        (global.crouchEnable = !1);
    });
  let crouchTimer = null;
  const crouchBinder = global.binder.register({
    action: "TOGGLE_CROUCH",
    desc: "\u041F\u0440\u0438\u0441\u0435\u0441\u0442\u044C ( \u0417\u0430\u0436\u0430\u0442\u044C )",
    defaultKey: -1,
    func: () => {
      mp.gui.cursor.visible ||
        global.isChatOpen ||
        global.disableKeys ||
        global.isPlayerDeath ||
        null !== mp.players.local.vehicle ||
        crouchEnableFromSystem ||
        crouchTimer ||
        (chrouchSystem.start(),
        (crouchTimer = setInterval(() => {
          mp.keys.isDown(crouchBinder.key) ||
            mp.keys.isDown(crouchBinder.key) ||
            (chrouchSystem.stop(),
            clearInterval(crouchTimer),
            (crouchTimer = null));
        }, 150)));
    },
  });
  mp.game.streaming.requestClipSet("move_ped_crouched"),
    mp.game.streaming.requestClipSet("move_ped_crouched_strafing");
}
