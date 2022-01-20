{
  var characterEditBrowser = null,
    defaultHair = [-1, -1, -1];
  mp.events.add("client_character_startEdit", async (a) => {
    if (
      ((a = JSON.parse(a)),
      global.hideUI(!0),
      global.showCursor(!0),
      mp.browsers.exists(characterEditBrowser) &&
        characterEditBrowser.destroy(),
      (defaultHair = a.defaultHair ? a.defaultHair : [-1, -1, -1]),
      (characterEditBrowser = mp.browsers.new(
        "package://Character/index.html"
      )),
      (global.disableAllAction = !0),
      mp.players.local.setCoordsNoOffset(
        a.position[0],
        a.position[1],
        a.position[2],
        !1,
        !1,
        !1
      ),
      mp.players.local.setHeading(a.position[3]),
      setTimeout(() => {
        global.setCameraToPos(
          new mp.Vector3(a.position[0], a.position[1], a.position[2]),
          new mp.Vector3(0, 0, a.position[3]),
          1.1,
          new mp.Vector3(0, 0, 0.65),
          new mp.Vector3(0, 0, 0.5),
          0,
          800,
          40
        );
      }, 300),
      mp.events.call("client_world_setSpecialTime", a.time[0], a.time[1]),
      !mp.game.streaming.hasAnimDictLoaded(
        "anim@mp_player_intcelebrationfemale@surrender"
      ))
    ) {
      mp.game.streaming.requestAnimDict(
        "anim@mp_player_intcelebrationfemale@surrender"
      );
      do await mp.game.waitAsync(10);
      while (
        !mp.game.streaming.hasAnimDictLoaded(
          "anim@mp_player_intcelebrationfemale@surrender"
        )
      );
    }
    mp.players.local.taskPlayAnim(
      "anim@mp_player_intcelebrationfemale@surrender",
      "surrender",
      1,
      1,
      -1,
      2,
      1,
      !1,
      !1,
      !1
    ),
      characterEditBrowser.execute(
        `mainVue.load('${escape(JSON.stringify(a))}');`
      ),
      -1 == defaultHair[0]
        ? (mp.players.local.clearAllProps(),
          mp.players.local.setComponentVariation(7, 0, 0, 2),
          mp.players.local.clearDecorations())
        : (mp.players.local.setComponentVariation(2, defaultHair[0], 0, 2),
          mp.players.local.setHairColor(defaultHair[1], defaultHair[2]));
  }),
    mp.events.add("client_character_endEdit", () => {
      global.disableAllAction = !1;
      try {
        mp.players.local.clearTasksImmediately(),
          setTimeout(() => {
            mp.players.local.clearTasksImmediately();
          }, 2e3);
      } catch (a) {}
      global.showCursor(!1),
        global.hideUI(!1),
        global.resetCamera(0),
        mp.events.call("client_world_setSpecialTime", -1, -1),
        mp.browsers.exists(characterEditBrowser) &&
          characterEditBrowser.destroy();
    }),
    global.rpc.on("__client_character_camera", (a) => {
      a
        ? global.setCameraToPlayer(
            2.9,
            new mp.Vector3(0, 0, 0.6),
            new mp.Vector3(0, 0, 0),
            0,
            0,
            40
          )
        : global.setCameraToPlayer(
            1.1,
            new mp.Vector3(0, 0, 0.65),
            new mp.Vector3(0, 0, 0.5),
            0,
            800,
            40
          );
    }),
    global.rpc.on("__client_character_rotate", (a) => {
      0 !== mp.players.local.handle &&
        mp.players.local.setHeading(mp.players.local.getHeading() + a);
    }),
    global.rpc.register(
      "__client_character_isPlayerLoad",
      () => 0 !== mp.players.local.handle
    ),
    global.rpc.register("__client_character_setSex", (a) => {
      const b = mp.players.local;
      a &&
        b.model !== mp.game.joaat("mp_m_freemode_01") &&
        (b.model = mp.game.joaat("mp_m_freemode_01")),
        a ||
          b.model === mp.game.joaat("mp_f_freemode_01") ||
          (b.model = mp.game.joaat("mp_f_freemode_01"));
      const c = setInterval(() => {
        if (0 !== mp.players.local.handle)
          return (
            mp.players.local.taskPlayAnim(
              "anim@mp_player_intcelebrationfemale@surrender",
              "surrender",
              1,
              1,
              -1,
              2,
              1,
              !1,
              !1,
              !1
            ),
            -1 != defaultHair[0] &&
              (mp.players.local.setComponentVariation(2, defaultHair[0], 0, 2),
              mp.players.local.setHairColor(defaultHair[1], defaultHair[2])),
            void clearInterval(c)
          );
      }, 1e3);
    }),
    global.rpc.register("__client_character_resetClothes", (a) => {
      a
        ? (mp.players.local.setComponentVariation(11, 91, 0, 2),
          mp.players.local.setComponentVariation(8, 15, 0, 2),
          mp.players.local.setComponentVariation(3, 15, 0, 2),
          mp.players.local.setComponentVariation(4, 21, 0, 2),
          mp.players.local.setComponentVariation(6, 34, 0, 2))
        : (mp.players.local.setComponentVariation(11, 15, 0, 2),
          mp.players.local.setComponentVariation(8, 2, 0, 2),
          mp.players.local.setComponentVariation(3, 15, 0, 2),
          mp.players.local.setComponentVariation(4, 15, 0, 2),
          mp.players.local.setComponentVariation(6, 35, 0, 2));
    }),
    global.rpc.register("__client_character_updateParents", (a) => {
      const b = a[0],
        c = a[1];
      mp.players.local.setHeadBlendData(b, c, 0, b, c, 0, a[2], a[3], 0, !0);
    }),
    global.rpc.register("__client_character_updateFace", (a) => {
      for (var b = 0; 20 > b; b++) mp.players.local.setFaceFeature(b, a[0][b]);
      mp.players.local.setEyeColor(a[1]);
    }),
    global.rpc.register("__client_character_updateSkin", (a) => {
      mp.players.local.setHeadOverlay(0, a[0], 100, 0, 0),
        mp.players.local.setHeadOverlay(3, a[3], 100, 0, 0),
        mp.players.local.setHeadOverlay(7, a[7], 100, 0, 0),
        mp.players.local.setHeadOverlay(9, a[9], 100, 0, 0);
    }),
    global.rpc.register("__client_character_updateHair", (a) => {
      mp.players.local.setComponentVariation(2, a[0], 0, 2),
        mp.players.local.setHairColor(a[1], 0),
        mp.players.local.setHeadOverlay(1, a[2], 100, 0, 0),
        mp.players.local.setHeadOverlay(2, a[3], 100, 0, 0),
        mp.players.local.setHeadOverlayColor(2, 1, a[4], 100),
        mp.players.local.setHeadOverlayColor(1, 1, a[1], 100),
        mp.players.local.setHeadOverlayColor(10, 1, a[1], 100),
        mp.players.local.setEyeColor(a[4]);
    }),
    global.rpc.register("__client_character_updateClothes", (a) => {
      const b = a[0],
        c = a[1];
      0 === b
        ? (mp.players.local.setComponentVariation(11, c[3][0], c[3][2], 2),
          mp.players.local.setComponentVariation(3, c[3][1], 0, 2))
        : 1 === b
        ? mp.players.local.setComponentVariation(4, c[3][0], c[3][1], 2)
        : 2 === b &&
          mp.players.local.setComponentVariation(6, c[3][0], c[3][1], 2);
    });
}
