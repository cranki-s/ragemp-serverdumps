{
  const localPlayer = mp.players.local;
  mp.events.add("entityStreamIn", (a) => {
    if ("player" === a.type) {
      a.hasVariable("currentMood") &&
        setPlayerMood(a, a.getVariable("currentMood"));
      const b = a.getVariable("weaponAnim");
      if (
        (b &&
          mp.game.invoke("0x1055AC3A667F09D9", a.handle, mp.game.joaat(b) >> 0),
        a.hasVariable("cSen"))
      ) {
        const b = a.getVariable("cSen");
        if (null != b) {
          const c = customScenarioMap.get(b);
          c && c.onStartForNew(a);
        }
      }
      const c = a.getVariable("attachToPlayer");
      c &&
        setTimeout(() => {
          mp.players.exists(a) &&
            a.handle &&
            a.getVariable("attachToPlayer") &&
            attachPlayerToPlayerHandle(a, a.getVariable("attachToPlayer"));
        }, 1e3);
      const d = a.getVariable("weaponMods");
      d && global.playerWeaponApplyModsStream(a),
        a.getVariable(mp.serverDataKeys.isAdmin) &&
          mp.game.invoke("0x2B5AA717A181FB4C", a.handle, !1),
        a.setHelmet(!1);
    }
  }),
    mp.game.streaming.requestAnimDict("nm"),
    mp.game.streaming.requestAnimDict("missfinale_c2mcs_1"),
    mp.game.streaming.requestAnimDict("anim@arena@celeb@flat@paired@no_props@"),
    mp.game.streaming.requestAnimDict("anim@gangops@hostage@");
  let carryPlayer_player = null,
    carryPlayer_startHealth = null,
    carryPlayer_timer = null;
  (global.isAnyPedAttachedToLocalPlayer = !1),
    mp.events.addDataHandler("attachToPlayer", function (a, b) {
      0 === a.handle || attachPlayerToPlayerHandle(a, b);
    });
  const attachPlayerToPlayerHandle = async (a, b) => {
    if (null === b) {
      a.isAttached() && a.detach(!0, !0), a.clearTasksImmediately();
      const b = a.__attachToPlayer;
      return (
        mp.players.exists(b) && 0 !== b.handle && b.clearTasksImmediately(),
        delete a.__attachToPlayer,
        void (
          a === mp.players.local &&
          ((global.disableAllAction = !1), (global.enableCameraOnDisabled = !1))
        )
      );
    }
    const c = 1e4 <= b,
      d = [
        {
          fAnim: [
            "anim@arena@celeb@flat@paired@no_props@",
            "piggyback_c_player_b",
            8,
            -8,
            1e6,
            33,
            0,
          ],
          fAttach: [0, 0, -0.07, 0.45, 0, 0, 0],
          sAnim: [
            "anim@arena@celeb@flat@paired@no_props@",
            "piggyback_c_player_a",
            8,
            -8,
            1e6,
            49,
            0,
          ],
          canUseWeapon: !1,
        },
        {
          fAnim: ["nm", "firemans_carry", 1, 0, -1, 33, 0],
          fAttach: [0, 0.23, 0.18, 0.65, 0.5, 0.5, 15],
          sAnim: [
            "missfinale_c2mcs_1",
            "fin_c2_mcs_1_camman",
            8,
            -8,
            1e5,
            48,
            0,
          ],
          canUseWeapon: !1,
        },
        {
          fAnim: ["anim@gangops@hostage@", "victim_idle", 8, -8, 1e5, 49, 0],
          fAttach: [0, -0.24, 0.11, 0, 0.5, 0.5, 0],
          sAnim: ["anim@gangops@hostage@", "perp_idle", 8, -8, 1e5, 49, 0],
          canUseWeapon: !0,
        },
      ][Math.floor(b / 1e4)],
      e = mp.players.atRemoteId(b % 1e4);
    if (
      e &&
      0 !== e.handle &&
      d &&
      (a.freezePosition(!1),
      a.setCollision(!0, !1),
      a.setCoordsNoOffset(
        a.position.x + 2,
        a.position.y + 2,
        a.position.z + 2,
        !1,
        !1,
        !1
      ),
      await mp.game.waitAsync(15),
      mp.players.exists(e) &&
        0 !== e.handle &&
        mp.players.exists(a) &&
        0 !== a.handle &&
        a.getVariable("attachToPlayer") === b)
    ) {
      if (
        (e.clearTasksImmediately(),
        e.taskPlayAnim(
          d.sAnim[0],
          d.sAnim[1],
          d.sAnim[2],
          d.sAnim[3],
          d.sAnim[4],
          d.sAnim[5],
          d.sAnim[6],
          !1,
          !1,
          !1
        ),
        a.clearTasksImmediately(),
        a.taskPlayAnim(
          d.fAnim[0],
          d.fAnim[1],
          d.fAnim[2],
          d.fAnim[3],
          d.fAnim[4],
          d.fAnim[5],
          d.fAnim[6],
          !1,
          !1,
          !1
        ),
        a.attachTo(
          e.handle,
          d.fAttach[0],
          d.fAttach[1],
          d.fAttach[2],
          d.fAttach[3],
          d.fAttach[4],
          d.fAttach[5],
          d.fAttach[6],
          !1,
          !1,
          !1,
          !1,
          2,
          !0
        ),
        (a.__attachToPlayer = e),
        a === localPlayer)
      ) {
        (global.disableAllAction = !0),
          c || (global.enableCameraOnDisabled = !0);
        const a = () => {
          (mp.players.exists(e) &&
            0 !== e.handle &&
            localPlayer.getVariable("attachToPlayer") &&
            (c || !mp.game.controls.isDisabledControlPressed(0, 23))) ||
            (mp.events.callRemote("server_player_attachStop"),
            mp.events.remove("render", a));
        };
        mp.events.add("render", a);
      }
      if (e === localPlayer) {
        carryPlayer_timer && clearInterval(carryPlayer_timer);
        const b = () => {
            mp.game.controls.disableControlAction(0, 21, !0),
              mp.game.controls.disableControlAction(0, 22, !0),
              mp.game.controls.disableControlAction(0, 23, !0),
              mp.game.controls.disableControlAction(0, 24, !0),
              mp.game.controls.disableControlAction(0, 25, !0),
              mp.game.controls.disableControlAction(0, 58, !0),
              mp.game.controls.disableControlAction(0, 141, !0),
              mp.game.controls.disableControlAction(0, 257, !0),
              mp.game.controls.disableControlAction(0, 68, !0),
              mp.game.controls.disableControlAction(0, 69, !0),
              mp.game.controls.disableControlAction(0, 70, !0),
              mp.game.controls.disableControlAction(0, 91, !0),
              mp.game.controls.disableControlAction(0, 92, !0),
              mp.game.controls.isDisabledControlPressed(0, 23) ||
              mp.game.controls.isDisabledControlPressed(0, 58)
                ? c()
                : !localPlayer.isPlayingAnim(d.sAnim[0], d.sAnim[1], 3) &&
                  localPlayer.taskPlayAnim(
                    d.sAnim[0],
                    d.sAnim[1],
                    d.sAnim[2],
                    d.sAnim[3],
                    d.sAnim[4],
                    d.sAnim[5],
                    d.sAnim[6],
                    !1,
                    !1,
                    !1
                  );
          },
          c = () => {
            mp.events.remove("render", b),
              clearInterval(carryPlayer_timer),
              (carryPlayer_timer = null),
              mp.events.callRemote("server_player_attachStop"),
              localPlayer.clearTasksImmediately(),
              (global.isAnyPedAttachedToLocalPlayer = !1);
          };
        (carryPlayer_player = a),
          (carryPlayer_startHealth = localPlayer.getHealth()),
          (carryPlayer_timer = setInterval(() => {
            const a = localPlayer.getHealth();
            return !mp.players.exists(carryPlayer_player) ||
              0 === carryPlayer_player.handle ||
              !carryPlayer_player.getVariable("attachToPlayer") ||
              (a < carryPlayer_startHealth &&
                5 < carryPlayer_startHealth - a) ||
              null != localPlayer.vehicle ||
              global.isPlayerDeath ||
              localPlayer.isFalling() ||
              localPlayer.isJumping() ||
              localPlayer.isSwimming() ||
              (!d.canUseWeapon &&
                0 !== global.getPlayerCurrentWeaponData().weapon) ||
              localPlayer.getVariable("cuffed")
              ? void c()
              : void (carryPlayer_startHealth = a);
          }, 100)),
          mp.events.add("render", b),
          (global.isAnyPedAttachedToLocalPlayer = !0);
      }
    }
  };
  mp.events.addDataHandler("cSen", function (a, b) {
    if (0 !== a.handle) {
      if (a.__oldScen != null) {
        const b = customScenarioMap.get(a.__oldScen);
        b && b.onEnd(a), delete a.__oldScen;
      }
      if (null != b) {
        const c = customScenarioMap.get(b);
        c && c.onStart(a), (a.__oldScen = b);
      }
    }
  });
  const customScenarioMap = new Map();
  class CustomScenario {
    constructor(a) {
      (this.name = a), customScenarioMap.set(a, this);
    }
    isActive(a) {
      return a.getVariable("cSen") === this.name;
    }
    onStart(a) {}
    onStartForNew(a) {}
    onEnd(a) {}
  }
  class CustomScenarioAnim extends CustomScenario {
    constructor(a, b, c, d) {
      super(a), (this.dict = b), (this.aName = c), (this.flag = d);
    }
    onStart(a) {
      loadAnimDict(this.dict, () => {
        mp.players.exists(a) &&
          0 !== a.handle &&
          (a.clearTasksImmediately(),
          a.taskPlayAnim(
            this.dict,
            this.aName,
            1,
            0,
            -1,
            this.flag,
            1,
            !1,
            !1,
            !1
          ));
      });
    }
    onStartForNew(a) {
      this.onStart(a);
    }
    onEnd(a) {
      a.clearTasksImmediately();
    }
  }
  class CustomScenarioAnimWithItem extends CustomScenario {
    constructor(a, b, c, d, e) {
      super(a),
        (this.item = b),
        (this.dict = c),
        (this.aName = d),
        (this.flag = e);
    }
    onStart(a) {
      return this.dict
        ? void loadAnimDict(this.dict, () => {
            mp.players.exists(a) &&
              0 !== a.handle &&
              (Array.isArray(this.item)
                ? this.item.forEach((b) =>
                    mp.attachmentMngr.addClient(a, mp.game.joaat(b))
                  )
                : mp.attachmentMngr.addClient(a, mp.game.joaat(this.item)),
              a.clearTasksImmediately(),
              a.taskPlayAnim(
                this.dict,
                this.aName,
                1,
                0,
                -1,
                this.flag,
                1,
                !1,
                !1,
                !1
              ));
          })
        : void (Array.isArray(this.item)
            ? this.item.forEach((b) =>
                mp.attachmentMngr.addClient(a, mp.game.joaat(b))
              )
            : mp.attachmentMngr.addClient(a, mp.game.joaat(this.item)));
    }
    onStartForNew(a) {
      this.onStart(a);
    }
    onEnd(a) {
      Array.isArray(this.item)
        ? this.item.forEach((b) =>
            mp.attachmentMngr.removeFor(a, mp.game.joaat(b))
          )
        : mp.attachmentMngr.removeFor(a, mp.game.joaat(this.item)),
        a.clearTasksImmediately();
    }
  }
  (global.CustomScenario = CustomScenario),
    (global.CustomScenarioAnimWithItem = CustomScenarioAnimWithItem),
    new CustomScenarioAnimWithItem(
      "contractGovClothes",
      "contractGovClothes",
      "mp_missheist_countrybank@fetch_code",
      "fetch_code_loop_high",
      1
    ),
    new CustomScenarioAnimWithItem(
      "contractBNBTake",
      "contractBNBTakeItem",
      "anim@heists@box_carry@",
      "idle",
      49
    ),
    mp.attachmentMngr.register(
      "contractBNBTakeItem",
      "bkr_prop_fakeid_binbag_01",
      28422,
      new mp.Vector3(0, -0.1, -0.17),
      new mp.Vector3(0, 0, 2)
    ),
    new CustomScenarioAnimWithItem(
      "scenNewsCamera",
      "scenNewsCameraItem",
      "amb@world_human_mobile_film_shocking@female@base",
      "base",
      49
    ),
    mp.attachmentMngr.register(
      "scenNewsCameraItem",
      "prop_v_cam_01",
      28422,
      new mp.Vector3(-0.01, -0.25, 0.01),
      new mp.Vector3(0, 0, 101)
    ),
    new CustomScenarioAnimWithItem(
      "scenNewsPaper",
      ["scenNewsPaperItem1", "scenNewsPaperItem2"],
      "amb@medic@standing@timeofdeath@base",
      "base",
      49
    ),
    mp.attachmentMngr.register(
      "scenNewsPaperItem1",
      "prop_notepad_01",
      60309,
      new mp.Vector3(-0.02, -0, 0),
      new mp.Vector3(0, 0, 0)
    ),
    mp.attachmentMngr.register(
      "scenNewsPaperItem2",
      "bkr_prop_fakeid_penclipboard",
      28422,
      new mp.Vector3(0, -0.02, -0.01),
      new mp.Vector3(0, 0, 180)
    ),
    new CustomScenarioAnimWithItem(
      "scenNewsPhoto",
      "scenNewsPhotoItem",
      "anim@mp_player_intupperphotography",
      "idle_a",
      49
    ),
    mp.attachmentMngr.register(
      "scenNewsPhotoItem",
      "prop_pap_camera_01",
      28422,
      new mp.Vector3(0.15, 0.01, -0.04),
      new mp.Vector3(10, 50, 0)
    ),
    new CustomScenarioAnimWithItem(
      "scenNewsMicro",
      "scenNewsMicroItem",
      "amb@world_human_drinking@coffee@male@base",
      "base",
      49
    ),
    mp.attachmentMngr.register(
      "scenNewsMicroItem",
      "p_ing_microphonel_01",
      28422,
      new mp.Vector3(0, 0.04, 0.05),
      new mp.Vector3(0, 0, 2)
    ),
    new CustomScenarioAnimWithItem(
      "scenCasinoBarJob",
      "scenCasinoBarJobItem",
      "anim@amb@nightclub@mini@drinking@champagne_drinking@base@",
      "bottle_hold_idle",
      49
    ),
    mp.attachmentMngr.register(
      "scenCasinoBarJobItem",
      "prop_bottle_richard",
      28422,
      new mp.Vector3(0.02, 0, -0.22),
      new mp.Vector3(3, 0.1, 235)
    ),
    new CustomScenarioAnimWithItem(
      "scenHoohakPut",
      "scenHoohakItem",
      "amb@world_human_drinking@coffee@male@base",
      "base",
      49
    ),
    mp.attachmentMngr.register(
      "scenHoohakItem",
      "grp_hookah_1",
      28422,
      new mp.Vector3(0.02, 0.025, -0.3),
      new mp.Vector3(-2.5, 0, 100)
    ),
    new CustomScenarioAnimWithItem(
      "armyMaterilBox",
      "armyMaterilBoxItem",
      "anim@heists@box_carry@",
      "idle",
      49
    ),
    mp.attachmentMngr.register(
      "armyMaterilBoxItem",
      "prop_box_ammo03a",
      28422,
      new mp.Vector3(0, -0.17, -0.2),
      new mp.Vector3(45, 0, 0)
    ),
    new CustomScenarioAnimWithItem(
      "umbrella",
      "umbrellaItem",
      "amb@bagels@male@walking@",
      "static",
      49
    ),
    mp.attachmentMngr.register(
      "umbrellaItem",
      "p_amb_brolly_01",
      28422,
      new mp.Vector3(-0.02, 0.04, -0),
      new mp.Vector3(70, 150, 0)
    ),
    new CustomScenarioAnimWithItem(
      "guitar1",
      "guitar1Item",
      "amb@world_human_musician@guitar@male@base",
      "base",
      49
    ),
    mp.attachmentMngr.register(
      "guitar1Item",
      "prop_acc_guitar_01",
      60309,
      new mp.Vector3(0.04, -0.01, -0.055),
      new mp.Vector3(181, 175, 170)
    ),
    new CustomScenarioAnimWithItem(
      "guitar2",
      "guitar2Item",
      "anim@mp_player_intincarair_guitarbodhi@rps@",
      "idle_a",
      49
    ),
    mp.attachmentMngr.register(
      "guitar2Item",
      "prop_el_guitar_01",
      0,
      new mp.Vector3(-0.13, 0.27, 0.2),
      new mp.Vector3(200, -130, -7)
    ),
    new CustomScenarioAnimWithItem(
      "guitar3",
      "guitar3Item",
      "anim@mp_player_intincarair_guitarbodhi@rps@",
      "idle_a",
      49
    ),
    mp.attachmentMngr.register(
      "guitar3Item",
      "prop_el_guitar_02",
      0,
      new mp.Vector3(-0.13, 0.27, 0.2),
      new mp.Vector3(200, -130, -7)
    ),
    new CustomScenarioAnimWithItem(
      "guitar4",
      "guitar4Item",
      "anim@mp_player_intincarair_guitarbodhi@rps@",
      "idle_a",
      49
    ),
    mp.attachmentMngr.register(
      "guitar4Item",
      "prop_el_guitar_03",
      0,
      new mp.Vector3(-0.13, 0.27, 0.2),
      new mp.Vector3(200, -130, -7)
    ),
    new CustomScenarioAnimWithItem(
      "NY_GiftHandItem",
      "NY_GiftHandItemItem",
      "anim@heists@box_carry@",
      "idle",
      49
    ),
    mp.attachmentMngr.register(
      "NY_GiftHandItemItem",
      "dge_nag_present_003",
      28422,
      new mp.Vector3(0.01, 0, -0.18),
      new mp.Vector3(0, 0, 25)
    ),
    new CustomScenarioAnimWithItem(
      "snowManCreate",
      "snowManCreateItem",
      "missfinale_c2ig_11",
      "pushcar_offcliff_m",
      49
    ),
    mp.attachmentMngr.register(
      "snowManCreateItem",
      "dge_nag_snowman_001_hand",
      28422,
      new mp.Vector3(0.1, 0.27, -0.3),
      new mp.Vector3(0, 0, 0)
    ),
    new CustomScenarioAnimWithItem(
      "toiletWash",
      "toiletWashItem",
      "missfbi_s4mop",
      "clean_mop_back_player",
      49
    ),
    mp.attachmentMngr.register(
      "toiletWashItem",
      "v_res_tt_plunger",
      18905,
      new mp.Vector3(0.08, -0.1, 0.03),
      new mp.Vector3(255, 7, 0)
    ),
    new CustomScenarioAnimWithItem(
      "prisonFoodTray",
      "prisonFoodTrayItem",
      "anim@heists@box_carry@",
      "idle",
      49
    ),
    mp.attachmentMngr.register(
      "prisonFoodTrayItem",
      "prop_food_tray_03",
      28422,
      new mp.Vector3(0, -0.17, -0.2),
      new mp.Vector3(15, 0, 0)
    ),
    new CustomScenarioAnimWithItem(
      "houseRobItem1",
      "houseRobItem1Item",
      "anim@heists@box_carry@",
      "idle",
      49
    ),
    mp.attachmentMngr.register(
      "houseRobItem1Item",
      "imp_prop_bench_vice_01a",
      28422,
      new mp.Vector3(0.015, -0.05, -0.23),
      new mp.Vector3(0, -20, 90)
    ),
    new CustomScenarioAnimWithItem(
      "houseRobItem2",
      "houseRobItem2Item",
      "anim@heists@box_carry@",
      "idle",
      49
    ),
    mp.attachmentMngr.register(
      "houseRobItem2Item",
      "imp_prop_air_compressor_01a",
      28422,
      new mp.Vector3(0.015, -0.05, -0.3),
      new mp.Vector3(0, -10, 90)
    ),
    new CustomScenarioAnimWithItem(
      "houseRobItem3",
      "houseRobItem3Item",
      "anim@heists@box_carry@",
      "idle",
      49
    ),
    mp.attachmentMngr.register(
      "houseRobItem3Item",
      "prop_tool_box_01",
      28422,
      new mp.Vector3(0, -0.21, -0.07),
      new mp.Vector3(-40, 0, 0)
    ),
    new CustomScenarioAnimWithItem(
      "houseRobItem4",
      "houseRobItem4Item",
      "anim@heists@box_carry@",
      "idle",
      49
    ),
    mp.attachmentMngr.register(
      "houseRobItem4Item",
      "prop_tool_box_04",
      28422,
      new mp.Vector3(0, -0.08, -0.17),
      new mp.Vector3(15, 0, 0)
    ),
    new CustomScenarioAnimWithItem(
      "metaldetector",
      "metaldetectorItem",
      "mini@golfai",
      "wood_idle_a",
      49
    ),
    mp.attachmentMngr.register(
      "metaldetectorItem",
      "w_am_metaldetector",
      18905,
      new mp.Vector3(0.15, 0.1, 0),
      new mp.Vector3(270, 90, 80)
    ),
    new CustomScenarioAnim(
      "scenPoliceAnim1",
      "amb@code_human_police_investigate@idle_b",
      "idle_f",
      1
    ),
    new CustomScenarioAnim(
      "scenPoliceAnim2",
      "amb@code_human_police_investigate@idle_b",
      "idle_e",
      1
    ),
    new CustomScenarioAnim(
      "scenPoliceAnim3",
      "amb@world_human_cop_idles@female@base",
      "base",
      1
    ),
    new CustomScenarioAnim(
      "scenPoliceAnim4",
      "amb@world_human_cop_idles@male@idle_a",
      "idle_a",
      1
    ),
    new CustomScenarioAnim(
      "scenPoliceAnim5",
      "amb@world_human_cop_idles@male@idle_b",
      "idle_d",
      1
    ),
    new CustomScenarioAnim(
      "scenPoliceAnim6",
      "rcmpaparazzo_3big_1",
      "_action_guard_a",
      1
    );
  function playerActionAnim(a, b) {
    function c(a, b, c, d) {
      loadAnimDict(a, () => {
        if (!mp.players.exists(e) || 0 === e.handle) return;
        let f = 0;
        const g = new Date().getTime();
        e.taskPlayAnim(a, d[f], 1, 0, -1, 1, 1, !1, !1, !1);
        const h = setInterval(
          () => (
            f++,
            f >= d.length && (f = 0),
            !mp.players.exists(e) ||
            0 === e.handle ||
            global.getEntityVariable(e, "isDeath", !1)
              ? clearInterval(h)
              : g + b <= new Date().getTime()
              ? (e.clearTasksImmediately(), clearInterval(h))
              : void e.taskPlayAnim(a, d[f], 1, 0, -1, 1, 1, !1, !1, !1)
          ),
          c
        );
      });
    }
    var d = Math.floor;
    const e = mp.players.atRemoteId(a);
    if (null == e || 0 === e.handle) return;
    const f = (a, b, c, d, f) => {
        loadAnimDict(b, () => {
          mp.players.exists(e) &&
            0 !== e.handle &&
            (mp.attachmentMngr.addClient(e, mp.game.joaat(a)),
            e.taskPlayAnim(b, c, 1, 0, -1, d, 1, !1, !1, !1),
            setTimeout(() => {
              mp.players.exists(e) &&
                0 !== e.handle &&
                (mp.attachmentMngr.removeFor(e, mp.game.joaat(a)),
                e.clearTasksImmediately());
            }, f));
        });
      },
      g = (a, b, c, d, f) => {
        const g = customScenarioMap.get(e.getVariable("cSen"));
        g && g.onEnd(e),
          loadAnimDict(b, () => {
            mp.players.exists(e) &&
              0 !== e.handle &&
              (mp.attachmentMngr.addClient(e, mp.game.joaat(a)),
              e.taskPlayAnim(b, c, 1, 0, -1, d, 1, !1, !1, !1),
              setTimeout(() => {
                mp.players.exists(e) &&
                  0 !== e.handle &&
                  (mp.attachmentMngr.removeFor(e, mp.game.joaat(a)),
                  e.clearTasksImmediately(),
                  g && g.name === e.getVariable("cSen") && g.onStart(e));
              }, f));
          });
      },
      h = (b, c, d, f, g) => {
        loadAnimDict(c, () => {
          if (mp.players.exists(e) && 0 !== e.handle) {
            for (const a of b) mp.attachmentMngr.addClient(e, mp.game.joaat(a));
            e.taskPlayAnim(c, d, 1, 0, -1, f, 1, !1, !1, !1),
              setTimeout(() => {
                const c = mp.players.atRemoteId(a);
                if (mp.players.exists(c) && 0 !== c.handle) {
                  for (const a of b)
                    mp.attachmentMngr.removeFor(c, mp.game.joaat(a));
                  c.clearTasksImmediately();
                }
              }, g);
          }
        });
      },
      i = (b, c, d, f) => {
        loadAnimDict(b, () => {
          mp.players.exists(e) &&
            0 !== e.handle &&
            (e.taskPlayAnim(b, c, 1, 0, -1, d, 1, !1, !1, !1),
            setTimeout(() => {
              const b = mp.players.atRemoteId(a);
              mp.players.exists(b) &&
                0 !== b.handle &&
                b.clearTasksImmediately();
            }, f));
        });
      };
    switch (b) {
      case "itemChips":
        f(
          "useItemChips",
          "amb@code_human_wander_eating_donut@female@idle_a",
          "idle_c",
          49,
          6e3
        );
        break;
      case "itemBurger":
        f(
          "useItemBurger",
          "amb@code_human_wander_eating_donut@female@idle_a",
          "idle_b",
          49,
          6e3
        );
        break;
      case "itemHotdog":
        f(
          "useItemHotdog",
          "mp_player_inteat@burger",
          "mp_player_int_eat_burger",
          49,
          1e4
        );
        break;
      case "itemChoco":
        f(
          "useItemChoco",
          "amb@world_human_seat_wall_eating@male@both_hands@base",
          "idle_b",
          49,
          6e3
        );
        break;
      case "itemPizza":
        f(
          "useItemPizza",
          "amb@code_human_wander_eating_donut_fat@male@idle_a",
          "idle_a",
          49,
          6e3
        );
        break;
      case "itemCola":
        f(
          "useItemCola",
          "amb@world_human_drinking@coffee@female@idle_a",
          "idle_a",
          49,
          6e3
        );
        break;
      case "itemSig":
        f(
          "useItemSig",
          "amb@world_human_smoking_fat@male@male_b@idle_a",
          "idle_a",
          49,
          35e3
        );
        break;
      case "itemSigDrug":
        f(
          "useItemSigDrug",
          "amb@world_human_smoking_fat@male@male_b@idle_a",
          "idle_a",
          49,
          35e3
        );
        break;
      case "itemSigDrugFast":
        f(
          "useItemSigDrug",
          "amb@world_human_smoking_fat@male@male_b@idle_a",
          "idle_a",
          49,
          7e3
        );
        break;
      case "itemBeer":
        f(
          "useItemBeer",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          6e3
        );
        break;
      case "itemBandage":
        f("useItemBandage", "oddjobs@bailbond_hobotwitchy", "base", 49, 4e3);
        break;
      case "itemMedicBox":
        f(
          "useItemMedicBox",
          "anim@amb@office@boardroom@crew@female@var_b@base@",
          "idle_a",
          49,
          7e3
        );
        break;
      case "itemDrugs":
        i("mp_suicide", "pill_fp", 49, 2600);
        break;
      case "itemFoodDef":
        i("mp_player_inteat@burger", "mp_player_int_eat_burger_fp", 49, 6e3);
        break;
      case "itemFoodTrash":
        i("random@peyote@dog", "wakeup_loop", 1, 6e3);
        break;
      case "foodVegsSmoothie":
        f(
          "foodVegsSmoothie",
          "amb@world_human_drinking@coffee@female@idle_a",
          "idle_a",
          49,
          6e3
        );
        break;
      case "foodSmoothie":
        f(
          "foodSmoothie",
          "amb@world_human_drinking@coffee@female@idle_a",
          "idle_a",
          49,
          6e3
        );
        break;
      case "foodMilkShake":
        f(
          "foodMilkShake",
          "amb@world_human_drinking@coffee@female@idle_a",
          "idle_a",
          49,
          6e3
        );
        break;
      case "foodMilk":
        f(
          "foodMilk",
          "amb@world_human_drinking@coffee@female@idle_a",
          "idle_a",
          49,
          6e3
        );
        break;
      case "dance1":
        c("anim@amb@nightclub@dancers@crowddance_groups@", 12e4, 8e3, [
          "mi_dance_crowd_13_v2_female^1",
          "mi_dance_crowd_13_v2_female^2",
          "mi_dance_crowd_13_v2_female^3",
          "mi_dance_crowd_13_v2_female^4",
          "mi_dance_crowd_13_v2_female^5",
          "mi_dance_crowd_13_v2_female^6",
        ]);
        break;
      case "dance2":
        c(
          "anim@amb@nightclub@dancers@crowddance_groups_transitions@from_med_intensity",
          12e4,
          8e3,
          [
            "trans_dance_crowd_mi_to_hi_09_v1_female^1",
            "trans_dance_crowd_mi_to_hi_09_v1_female^2",
            "trans_dance_crowd_mi_to_hi_09_v1_female^3",
            "trans_dance_crowd_mi_to_hi_09_v1_female^4",
            "trans_dance_crowd_mi_to_hi_09_v1_female^5",
            "trans_dance_crowd_mi_to_hi_09_v1_female^6",
          ]
        );
        break;
      case "dance3":
        c("anim@amb@nightclub@mini@dance@dance_solo@female@var_a@", 12e4, 6e3, [
          "high_center_down",
          "med_center",
          "high_center",
          "med_left_down",
          "med_right_down",
          "high_center_up",
          "med_left_up",
          "med_right_up",
          "med_center_up",
        ]);
        break;
      case "dance4":
        c("anim@amb@nightclub@mini@dance@dance_solo@female@var_b@", 12e4, 1e4, [
          "high_center_down",
          "med_left_down",
          "med_center",
          "med_right_down",
          "high_center",
          "med_left_up",
          "med_right_up",
          "high_center_up",
        ]);
        break;
      case "dance5":
        c("anim@amb@nightclub@dancers@crowddance_facedj@", 12e4, 12e3, [
          "hi_dance_facedj_15_v2_male^1",
          "hi_dance_facedj_15_v2_male^2",
          "hi_dance_facedj_15_v2_male^3",
          "hi_dance_facedj_15_v2_male^4",
          "hi_dance_facedj_15_v2_male^5",
          "hi_dance_facedj_15_v2_male^6",
        ]);
        break;
      case "dance6":
        c("anim@amb@nightclub@dancers@crowddance_facedj@", 12e4, 8e3, [
          "hi_dance_facedj_17_v2_female^1",
          "hi_dance_facedj_17_v2_female^2",
          "hi_dance_facedj_17_v2_female^3",
          "hi_dance_facedj_17_v2_female^4",
          "hi_dance_facedj_17_v2_female^5",
          "hi_dance_facedj_17_v2_female^6",
        ]);
        break;
      case "dance7":
        c("anim@amb@nightclub@dancers@crowddance_groups@", 12e4, 8e3, [
          "hi_dance_crowd_09_v2_female^1",
          "hi_dance_crowd_09_v2_female^2",
          "hi_dance_crowd_09_v2_female^3",
          "hi_dance_crowd_09_v2_female^4",
          "hi_dance_crowd_09_v2_female^5",
          "hi_dance_crowd_09_v2_female^6",
        ]);
        break;
      case "dance8":
        c("anim@amb@casino@mini@dance@dance_solo@female@var_a@", 12e4, 1e4, [
          "high_center_down",
          "med_left_down",
          "med_center",
          "med_right_down",
          "high_center",
          "med_left_up",
          "med_right_up",
          "high_center_up",
        ]);
        break;
      case "dance9":
        c("anim@amb@casino@mini@dance@dance_solo@female@var_b@", 12e4, 8e3, [
          "high_center_down",
          "med_left_down",
          "med_center",
          "med_right_down",
          "high_center",
          "med_left_up",
          "med_right_up",
          "high_center_up",
        ]);
        break;
      case "dance10":
        c("timetable@tracy@ig_5@idle_a", 12e4, 8e3, [
          "idle_a",
          "idle_b",
          "idle_c",
        ]);
        break;
      case "casinoAlco":
        f(
          "casinoAcloItem",
          "amb@prop_human_seat_chair_drink@male@generic@idle_a",
          "idle_a",
          49,
          5e3
        );
        break;
      case "itemAlco":
        f(
          "useItemAlco",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemTequila":
        f(
          "useItemTequila",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemRum":
        f(
          "useItemRum",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemVodka":
        f(
          "useItemVodka",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemHooch":
        f(
          "useItemHooch",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemErofeich":
        f(
          "useItemErofeich",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemMead":
        f(
          "useItemMead",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemMartini":
        f(
          "useItemMartini",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemAsti":
        f(
          "useItemAsti",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemChinzaro":
        f(
          "useItemChinzaro",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemAmore":
        f(
          "useItemAmore",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemBarolo":
        f(
          "useItemBarolo",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemCognac":
        f(
          "useItemCognac",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemSake":
        f(
          "useItemSake",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemBrandy":
        f(
          "useItemBrandy",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemTonic":
        f(
          "useItemTonic",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemPinaColada":
        f(
          "useItemPinaColada",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemWhiskey":
        f(
          "useItemWhiskey",
          "amb@world_human_drinking@beer@male@idle_a",
          "idle_b",
          49,
          5500
        );
        break;
      case "itemAlcoChampangeTree": {
        e === mp.players.local &&
          setTimeout(() => {
            mp.events.call("client_playerEffect_alco_start", 300),
              mp.events.call("client_playerEffect_beerAlco", 2);
          }, 6e3),
          f(
            "useItemAlcoChampange",
            "amb@world_human_drinking@beer@male@idle_a",
            "idle_b",
            49,
            5500
          );
        break;
      }
      case "hookah": {
        const a = "core";
        mp.game.streaming.hasNamedPtfxAssetLoaded("core") ||
          mp.game.streaming.requestNamedPtfxAsset("core"),
          setTimeout(() => {
            if (
              0 !== e.handle &&
              mp.game.streaming.hasNamedPtfxAssetLoaded(a)
            ) {
              const { x: b, y: c, z: d } = e.getBoneCoords(20178, 0, 0, 0);
              mp.game.graphics.setPtfxAssetNextCall(a);
              const f = mp.game.graphics.startParticleFxLoopedAtCoord(
                "exp_grd_bzgas_smoke",
                b,
                c,
                d,
                0,
                0,
                0,
                1.5,
                !0,
                !0,
                !0,
                !1
              );
              setTimeout(() => {
                mp.game.graphics.removeParticleFx(f, !1);
              }, 4e3);
            }
          }, 4500),
          f(
            "hoohakUseItem",
            "amb@world_human_smoking@male@male_b@idle_a",
            "idle_a",
            1,
            5e3
          );
        break;
      }
      case "itemBong1":
      case "itemBong2": {
        const a = "core";
        mp.game.streaming.hasNamedPtfxAssetLoaded("core") ||
          mp.game.streaming.requestNamedPtfxAsset("core"),
          setTimeout(() => {
            if (0 !== e.handle) {
              if (mp.game.streaming.hasNamedPtfxAssetLoaded(a)) {
                const { x: b, y: c, z: d } = e.getBoneCoords(20178, 0, 0, 0);
                mp.game.graphics.setPtfxAssetNextCall(a);
                const f = mp.game.graphics.startParticleFxLoopedAtCoord(
                  "exp_grd_bzgas_smoke",
                  b,
                  c,
                  d,
                  0,
                  0,
                  0,
                  0.7,
                  !0,
                  !0,
                  !0,
                  !1
                );
                setTimeout(() => {
                  mp.game.graphics.removeParticleFx(f, !1);
                }, 4e3);
              }
              e === mp.players.local &&
                ("itemBong1" === b
                  ? mp.events.call("client_playerEffect_drugs_start", 1)
                  : (mp.events.call("client_playerEffect_drugs_start", 2),
                    mp.events.call("client_playerEffect_beerAlco", 3)));
            }
          }, 5500),
          h(
            ["bongItem1", "bongItem2"],
            "anim@safehouse@bong",
            "bong_stage2",
            1,
            7e3
          );
        break;
      }
      case "firework1":
      case "firework2":
      case "firework3":
      case "firework1Auto":
      case "firework2Auto":
      case "firework3Auto": {
        const { x: a, y: c, z: g } = e.position,
          h = (a) => d(Math.random() * a) * (0.5 < Math.random() ? 1 : -1),
          j = (b, e, f, i, j, k) => {
            setTimeout(() => {
              if (mp.game.streaming.hasNamedPtfxAssetLoaded(b)) {
                mp.game.graphics.setPtfxAssetNextCall(b);
                const f = mp.game.graphics.startParticleFxLoopedAtCoord(
                  e,
                  a + h(k),
                  c + h(k),
                  g + 55 + d(10 * Math.random()),
                  0,
                  0,
                  0,
                  j + Math.random() + Math.random(),
                  !0,
                  !0,
                  !0,
                  !1
                );
                setTimeout(() => {
                  mp.game.graphics.removeParticleFx(f, !1);
                }, i);
              }
            }, f);
          },
          k = 4e3;
        if ("firework1" === b || "firework1Auto" === b) {
          mp.game.streaming.hasNamedPtfxAssetLoaded("proj_indep_firework_v2") ||
            mp.game.streaming.requestNamedPtfxAsset("proj_indep_firework_v2");
          for (let a = 0; 15 > a; a++)
            (0 == a || 7 === a) &&
              global.actionAntiFlood("fireworkSound" + a, 3e4) &&
              setTimeout(() => {
                global.mainBrowser.execute(
                  `client_playMusic('https://files.gta5rp.com/sound/firework.mp3', 0.2);`
                );
              }, k + 7500 + 2e3 * a),
              j(
                "proj_indep_firework_v2",
                "scr_firework_indep_burst_rwb",
                k + 7500 + 2e3 * a,
                2e3,
                0.5,
                25
              ),
              j(
                "proj_indep_firework_v2",
                "scr_firework_indep_spiral_burst_rwb",
                k + 7900 + 2e3 * a,
                2e3,
                0.5,
                25
              ),
              j(
                "proj_indep_firework_v2",
                "scr_firework_indep_spiral_burst_rwb",
                k + 8e3 + 2e3 * a,
                2e3,
                0.5,
                25
              ),
              j(
                "proj_indep_firework_v2",
                "scr_firework_indep_spiral_burst_rwb",
                k + 8200 + 2e3 * a,
                2e3,
                0.5,
                25
              ),
              j(
                "proj_indep_firework_v2",
                "scr_firework_indep_ring_burst_rwb",
                k + 8400 + 2e3 * a,
                2e3,
                0.5,
                25
              ),
              j(
                "proj_indep_firework_v2",
                "scr_firework_indep_ring_burst_rwb",
                k + 8450 + 2e3 * a,
                2e3,
                0.5,
                25
              ),
              j(
                "proj_indep_firework_v2",
                "scr_xmas_firework_burst_fizzle",
                k + 8500 + 2e3 * a,
                2e3,
                0.5,
                25
              ),
              j(
                "proj_indep_firework_v2",
                "scr_firework_indep_repeat_burst_rwb",
                k + 8800 + 2e3 * a,
                2e3,
                0.5,
                25
              ),
              j(
                "proj_indep_firework_v2",
                "scr_firework_indep_repeat_burst_rwb",
                k + 9100 + 2e3 * a,
                2e3,
                0.5,
                25
              );
        } else if ("firework2" === b || "firework2Auto" === b) {
          mp.game.streaming.hasNamedPtfxAssetLoaded("scr_rcpaparazzo1") ||
            mp.game.streaming.requestNamedPtfxAsset("scr_rcpaparazzo1"),
            mp.game.streaming.hasNamedPtfxAssetLoaded("scr_indep_fireworks") ||
              mp.game.streaming.requestNamedPtfxAsset("scr_indep_fireworks");
          for (let a = 0; 15 > a; a++)
            (0 == a || 7 === a) &&
              global.actionAntiFlood("fireworkSound" + a, 3e4) &&
              setTimeout(() => {
                global.mainBrowser.execute(
                  `client_playMusic('https://files.gta5rp.com/sound/firework.mp3', 0.2);`
                );
              }, k + 7e3 + 2e3 * a),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_trailburst_spawn",
                k + 7e3 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_indep_fireworks",
                "scr_indep_firework_trailburst_spawn",
                k + 7e3 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "scr_indep_fireworks",
                "scr_indep_firework_burst_spawn",
                k + 7e3 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_burst_spawn",
                k + 7400 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_trailburst_spawn",
                k + 7400 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_burst_spawn",
                k + 7600 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_trailburst_spawn",
                k + 7600 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_burst_spawn",
                k + 7800 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_trailburst_spawn",
                k + 7800 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_burst_spawn",
                k + 8e3 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_trailburst_spawn",
                k + 8e3 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_trailburst_spawn",
                k + 7e3 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_burst_spawn",
                k + 7400 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_trailburst_spawn",
                k + 7400 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_burst_spawn",
                k + 7600 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_rcpaparazzo1",
                "scr_mich4_firework_trailburst_spawn",
                k + 7600 + 2e3 * a,
                2e3,
                1.5,
                20
              ),
              j(
                "scr_indep_fireworks",
                "scr_indep_firework_trailburst_spawn",
                k + 7800 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "scr_indep_fireworks",
                "scr_indep_firework_burst_spawn",
                k + 7800 + 2e3 * a,
                2e3,
                0.5,
                20
              );
        } else if ("firework3" === b || "firework3Auto" === b) {
          mp.game.streaming.hasNamedPtfxAssetLoaded("proj_xmas_firework") ||
            mp.game.streaming.requestNamedPtfxAsset("proj_xmas_firework");
          for (let a = 0; 15 > a; a++)
            (0 == a || 7 === a) &&
              global.actionAntiFlood("fireworkSound" + a, 3e4) &&
              setTimeout(() => {
                global.mainBrowser.execute(
                  `client_playMusic('https://files.gta5rp.com/sound/firework.mp3', 0.2);`
                );
              }, k + 7e3 + 2e3 * a),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_ring_burst_rgw",
                k + 7e3 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_burst_rgw",
                k + 7e3 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_burst_rgw",
                k + 7100 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_burst_rgw",
                k + 7300 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_burst_rgw",
                k + 7500 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_repeat_burst_rgw",
                k + 8500 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_repeat_burst_rgw",
                k + 8700 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_repeat_burst_rgw",
                k + 8900 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_spiral_burst_rgw",
                k + 10500 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_spiral_burst_rgw",
                k + 10700 + 2e3 * a,
                2e3,
                0.5,
                20
              ),
              j(
                "proj_xmas_firework",
                "scr_firework_xmas_spiral_burst_rgw",
                k + 10900 + 2e3 * a,
                2e3,
                0.5,
                20
              );
        }
        ("firework1" === b || "firework2" === b || "firework3" === b) &&
          f(
            "fireworkItem",
            "anim@mp_fireworks",
            "place_firework_1_rocket",
            1,
            3e3
          );
        break;
      }
      case "contractRobECircuit":
        f(
          "contractRobECircuit",
          "mp_missheist_countrybank@fetch_code",
          "fetch_code_loop_high",
          1,
          7e3
        );
        break;
      case "contractBNB":
        f(
          "contractBNB",
          "melee@small_wpn@streamed_core",
          "car_down_attack",
          1,
          7e3
        );
        break;
      case "shovel":
        g("shovelItem", "random@burial", "a_burial", 1, 1e4);
        break;
      default:
    }
  }
  mp.events.add("client_anim_playerAction", function (a, b) {
    playerActionAnim(a, b);
  }),
    mp.events.add("client_anim_playersAction", function (a) {
      const b = JSON.parse(a);
      for (const c of b) playerActionAnim(c[0], c[1]);
    }),
    mp.attachmentMngr.register(
      "useItemChips",
      "prop_food_bs_chips",
      28422,
      new mp.Vector3(-0.04, 0.02, -0.04),
      new mp.Vector3(15, 20, 10)
    ),
    mp.attachmentMngr.register(
      "useItemBurger",
      "prop_cs_burger_01",
      28422,
      new mp.Vector3(-0.01, -0.01, -0),
      new mp.Vector3(20, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemHotdog",
      "prop_cs_hotdog_01",
      60309,
      new mp.Vector3(0.05, 0.02, -0.01),
      new mp.Vector3(0, 0, 90)
    ),
    mp.attachmentMngr.register(
      "useItemChoco",
      "prop_candy_pqs",
      28422,
      new mp.Vector3(-0.01, -0.01, -0),
      new mp.Vector3(20, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemPizza",
      "v_res_tt_pizzaplate",
      28422,
      new mp.Vector3(-0.01, -0.01, -0),
      new mp.Vector3(20, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemCola",
      "prop_food_juice01",
      28422,
      new mp.Vector3(-0.02, 0, -0.03),
      new mp.Vector3(15, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemSig",
      "ng_proc_cigarette01a",
      28422,
      new mp.Vector3(0, 0, 0.01),
      new mp.Vector3(0, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemSigDrug",
      "p_amb_joint_01",
      28422,
      new mp.Vector3(0, 0, 0.01),
      new mp.Vector3(0, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemBeer",
      "prop_sh_beer_pissh_01",
      28422,
      new mp.Vector3(0.012, 0.028, -0.1),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemBandage",
      "prop_gaffer_arm_bind",
      36029,
      new mp.Vector3(-0.04, -0, -0.01),
      new mp.Vector3(160, 0, 90)
    ),
    mp.attachmentMngr.register(
      "useItemMedicBox",
      "prop_ld_health_pack",
      36029,
      new mp.Vector3(0.03, 0.01, 0.12),
      new mp.Vector3(180, -10, 90)
    ),
    mp.attachmentMngr.register(
      "useItemAlco",
      "prop_tequila_bottle",
      28422,
      new mp.Vector3(0.013, 0.01, -0.16),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemTequila",
      "prop_tequila_bottle",
      28422,
      new mp.Vector3(0.013, 0.01, -0.16),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemRum",
      "prop_rum_bottle",
      28422,
      new mp.Vector3(0.013, 0.01, -0.16),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemVodka",
      "prop_vodka_bottle",
      28422,
      new mp.Vector3(0.013, 0.01, -0.16),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemHooch",
      "prop_drug_bottle",
      28422,
      new mp.Vector3(0.013, 0.05, -0.25),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemErofeich",
      "p_cs_bottle_01",
      28422,
      new mp.Vector3(0.013, 0.01, 0),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemMead",
      "p_cs_bottle_01",
      28422,
      new mp.Vector3(0.013, 0.01, 0),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemMartini",
      "prop_cherenkov_03",
      28422,
      new mp.Vector3(0.013, 0.01, -0.25),
      new mp.Vector3(0, 0, 70)
    ),
    mp.attachmentMngr.register(
      "useItemAsti",
      "ba_prop_battle_champ_open_02",
      28422,
      new mp.Vector3(0.013, 0.01, -0.04),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemChinzaro",
      "prop_cherenkov_02",
      28422,
      new mp.Vector3(0.013, 0.01, -0.25),
      new mp.Vector3(0, 0, 70)
    ),
    mp.attachmentMngr.register(
      "useItemAmore",
      "prop_cherenkov_04",
      28422,
      new mp.Vector3(0.013, 0.01, -0.25),
      new mp.Vector3(0, 0, 70)
    ),
    mp.attachmentMngr.register(
      "useItemBarolo",
      "prop_champ_01b",
      28422,
      new mp.Vector3(0.013, 0.01, -0.16),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemCognac",
      "prop_bottle_cognac",
      28422,
      new mp.Vector3(0.013, 0.01, -0.16),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemSake",
      "prop_cherenkov_01",
      28422,
      new mp.Vector3(0.013, 0.01, -0.25),
      new mp.Vector3(0, 0, 70)
    ),
    mp.attachmentMngr.register(
      "useItemBrandy",
      "prop_bottle_brandy",
      28422,
      new mp.Vector3(0.013, 0.01, -0.16),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemTonic",
      "ba_prop_club_tonic_bottle",
      28422,
      new mp.Vector3(0.013, 0.01, -0.13),
      new mp.Vector3(0, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemWhiskey",
      "prop_bottle_richard",
      28422,
      new mp.Vector3(0.013, 0.01, -0.2),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemPinaColada",
      "prop_pinacolada",
      28422,
      new mp.Vector3(-0.01, -0.01, -0.19),
      new mp.Vector3(0, 0, 0)
    ),
    mp.attachmentMngr.register(
      "useItemAlcoChampange",
      "vw_prop_vw_champ_closed",
      28422,
      new mp.Vector3(0.013, 0.03, -0.05),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "foodVegsSmoothie",
      "prop_wheat_grass_glass",
      28422,
      new mp.Vector3(0.013, 0.03, -0.05),
      new mp.Vector3(5, 0, 0)
    ),
    mp.attachmentMngr.register(
      "foodSmoothie",
      "p_cs_shot_glass_2_s",
      28422,
      new mp.Vector3(-0.01, -0.005, 0.03),
      new mp.Vector3(15, 0, 0)
    ),
    mp.attachmentMngr.register(
      "foodMilkShake",
      "prop_drink_whtwine",
      28422,
      new mp.Vector3(-0.01, 0.045, -0.09),
      new mp.Vector3(15, 0, 0)
    ),
    mp.attachmentMngr.register(
      "foodMilk",
      "prop_cs_milk_01",
      28422,
      new mp.Vector3(-0.01, -0.005, -0.07),
      new mp.Vector3(5, 10, 300)
    ),
    mp.attachmentMngr.register(
      "bongItem1",
      "prop_bong_01",
      28422,
      new mp.Vector3(-0.13, -0.05, 0),
      new mp.Vector3(85, -25, 100)
    ),
    mp.attachmentMngr.register(
      "bongItem2",
      "lux_prop_lighter_luxe",
      60309,
      new mp.Vector3(0.11, -0.06, 0.12),
      new mp.Vector3(185, 130, 85)
    ),
    mp.attachmentMngr.register(
      "hoohakUseItem",
      "grp_hookah_1b",
      28422,
      new mp.Vector3(-0.02, -0.02, 0.01),
      new mp.Vector3(-120, 10, -70)
    ),
    mp.attachmentMngr.register(
      "fireworkItem",
      "ind_prop_firework_01",
      36029,
      new mp.Vector3(-0.05, -0, 0.02),
      new mp.Vector3(-120, 0, -30)
    ),
    mp.attachmentMngr.register(
      "shovelItem",
      "prop_tool_shovel2",
      28422,
      new mp.Vector3(0.05, -0.03, -0.9),
      new mp.Vector3(2.1, -4.2, 5)
    ),
    mp.attachmentMngr.register(
      "casinoAcloItem",
      "prop_drink_whisky",
      28422,
      new mp.Vector3(0, -0.01, -0.04),
      new mp.Vector3(0, 0, 2)
    ),
    mp.attachmentMngr.register(
      "contractRobECircuit",
      "prop_tool_spanner01",
      28422,
      new mp.Vector3(0.06, 0.02, -0.01),
      new mp.Vector3(-70, 0, 0)
    ),
    mp.attachmentMngr.register(
      "contractBNB",
      "prop_tool_pickaxe",
      28422,
      new mp.Vector3(0.05, -0.2, -0.1),
      new mp.Vector3(-70, 0, 2)
    ),
    mp.events.add("client_anim_handshake", async (a, b, c) => {
      var d = Math.PI,
        e = Math.atan2;
      const f = mp.players.atRemoteId(a),
        g = mp.players.atRemoteId(b);
      if (f && 0 !== f.handle && g && 0 !== g.handle) {
        if (!mp.game.streaming.hasAnimDictLoaded("mp_ped_interaction")) {
          mp.game.streaming.requestAnimDict("mp_ped_interaction");
          do await mp.game.waitAsync(50);
          while (!mp.game.streaming.hasAnimDictLoaded("mp_ped_interaction"));
        }
        if (!mp.game.streaming.hasAnimDictLoaded("ragdoll@human")) {
          mp.game.streaming.requestAnimDict("ragdoll@human");
          do await mp.game.waitAsync(50);
          while (!mp.game.streaming.hasAnimDictLoaded("ragdoll@human"));
        }
        mp.players.exists(f) &&
          0 !== f.handle &&
          mp.players.exists(g) &&
          0 !== g.handle &&
          (f.setHeading(
            (180 *
              e(g.position.y - f.position.y, g.position.x - f.position.x)) /
              d +
              270
          ),
          g.setHeading(
            (180 *
              e(f.position.y - g.position.y, f.position.x - g.position.x)) /
              d +
              270
          ),
          f.taskPlayAnim(
            "mp_ped_interaction",
            "handshake_guy_a",
            8,
            0,
            -1,
            39,
            0,
            !1,
            !1,
            !1
          ),
          g.taskPlayAnim(
            "mp_ped_interaction",
            "handshake_guy_a",
            8,
            0,
            -1,
            39,
            0,
            !1,
            !1,
            !1
          ),
          setTimeout(() => {
            mp.players.exists(f) && 0 !== f.handle && f.clearTasksImmediately(),
              mp.players.exists(g) &&
                0 !== g.handle &&
                (g.clearTasksImmediately(),
                1 === c &&
                  (g.taskPlayAnim(
                    "ragdoll@human",
                    "electrocute",
                    8,
                    0,
                    -1,
                    39,
                    0,
                    !1,
                    !1,
                    !1
                  ),
                  setTimeout(() => {
                    mp.players.exists(g) &&
                      0 !== g.handle &&
                      g.clearTasksImmediately();
                  }, 2700)));
          }, 4500));
      }
    }),
    mp.events.addDataHandler("currentMood", function (a, b) {
      0 !== a.handle && setPlayerMood(a, b);
    }),
    mp.events.addDataHandler("weaponAnim", function (a, b) {
      0 !== a.handle &&
        mp.game.invoke("0x1055AC3A667F09D9", a.handle, mp.game.joaat(b) >> 0);
    }),
    (global.playerSyncEnableFacialAnim = !0),
    mp.events.add("playerStartTalking", function (a) {
      global.playerSyncEnableFacialAnim &&
        0 !== a.handle &&
        a.playFacialAnim("mic_chatter", "mp_facial");
    }),
    mp.events.add("playerStopTalking", function (a) {
      global.playerSyncEnableFacialAnim &&
        0 !== a.handle &&
        a.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
    }),
    mp.game.streaming.requestAnimDict("mp_facial"),
    mp.game.streaming.requestAnimDict("facials@gen_male@variations@normal");
  var isParachuteJump = !1;
  setInterval(() => {
    const a = mp.players.local.getParachuteState();
    0 === a || 1 === a || 2 === a
      ? !isParachuteJump && (isParachuteJump = !0)
      : isParachuteJump &&
        (mp.events.callRemote("server_player_endJump", a),
        (isParachuteJump = !1));
  }, 100),
    mp.events.add("client_parachute_start", () => {
      mp.players.local.removeWeapon(mp.game.joaat("gadget_parachute")),
        mp.players.local.giveWeapon(mp.game.joaat("gadget_parachute"), 1, !0);
    }),
    mp.events.add("client_parachute_end", () => {
      mp.players.local.removeWeapon(mp.game.joaat("gadget_parachute"));
    });
  function setPlayerMood(a, b) {
    null == b
      ? a.clearFacialIdleAnimOverride()
      : mp.game.invoke("0xFFC24B988B938B38", a.handle, b, 0);
  }
  function loadAnimDict(a, b) {
    if (mp.game.streaming.hasAnimDictLoaded(a)) return void b();
    mp.game.streaming.requestAnimDict(a);
    let c = setInterval(function () {
      mp.game.streaming.hasAnimDictLoaded(a) && (clearInterval(c), b());
    }, 100);
  }
}
