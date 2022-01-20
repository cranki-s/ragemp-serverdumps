{
  let crawlTimer = null,
    lastCrawlUse = -1;
  const crawlBinder = global.binder.register({
      action: "TOGGLE_CRAWL",
      desc: "\u041F\u043E\u043B\u0437\u0442\u0438 ( \u0417\u0430\u0436\u0430\u0442\u044C )",
      defaultKey: -1,
      func: () => {
        if (
          mp.gui.cursor.visible ||
          global.isChatOpen ||
          global.disableKeys ||
          global.isPlayerDeath ||
          global.disableAnimList ||
          global.isAnyPedAttachedToLocalPlayer ||
          null !== mp.players.local.vehicle ||
          mp.players.local.getVariable("cuffed") ||
          mp.players.local.isSwimming() ||
          mp.players.local.isSwimmingUnderWater() ||
          mp.players.local.isReloading() ||
          lastCrawlUse + 1e3 > new Date().getTime() ||
          crawlTimer
        )
          return;
        let a, b;
        (crawlTimer = setInterval(() => {
          const c =
            mp.players.local.getVariable("cuffed") ||
            global.isPlayerDeath ||
            mp.players.local.isSwimming() ||
            mp.players.local.isSwimmingUnderWater() ||
            global.disableAnimList;
          if (
            (lastCrawlUse + 1e3 < new Date().getTime() &&
              !mp.keys.isDown(crawlBinder.key) &&
              !mp.keys.isDown(crawlBinder.key)) ||
            !isPlayerCanCrawl() ||
            c
          )
            return (
              mp.players.local.clearTasks(),
              clearInterval(crawlTimer),
              (crawlTimer = null),
              void (lastCrawlUse = new Date().getTime())
            );
          const d = "move_crawl",
            e = mp.players.local.getRotation(2);
          if (
            (mp.game.controls.disableControlAction(0, 32, !0),
            mp.game.controls.disableControlAction(0, 33, !0),
            mp.game.controls.disableControlAction(0, 34, !0),
            mp.game.controls.disableControlAction(0, 35, !0),
            mp.game.controls.isDisabledControlPressed(0, 34) &&
              mp.players.local.setRotation(e.x, e.y, e.z + 0.2, 2, !0),
            mp.game.controls.isDisabledControlPressed(0, 35) &&
              mp.players.local.setRotation(e.x, e.y, e.z - 0.2, 2, !0),
            mp.game.controls.isDisabledControlPressed(0, 32))
          ) {
            if ("onfront_fwd" === a || b) return;
            a = "onfront_fwd";
            const c = mp.game.entity.getEntityAnimDuration("move_crawl", a);
            mp.game.streaming.requestAnimDict(d),
              mp.players.local.taskPlayAnim(d, a, 8, 1e3, -1, 2, 0, !1, !1, !1),
              (b = setTimeout(() => {
                (a = void 0), (b = void 0);
              }, 1e3 * (c - 0.1)));
          }
          if (mp.game.controls.isDisabledControlPressed(0, 33)) {
            if ("onfront_fwd" === a || b) return;
            a = "onfront_bwd";
            const c = mp.game.entity.getEntityAnimDuration("move_crawl", a);
            mp.game.streaming.requestAnimDict(d),
              mp.players.local.taskPlayAnim(d, a, 8, 1e3, -1, 2, 0, !1, !1, !1),
              (b = setTimeout(() => {
                (a = void 0), (b = void 0);
              }, 1e3 * (c - 0.1)));
          }
        }, 0)),
          mp.game.streaming.requestAnimDict("move_crawlprone2crawlfront"),
          mp.players.local.taskPlayAnim(
            "move_crawlprone2crawlfront",
            "front",
            2,
            1e3,
            -1,
            2,
            0,
            !1,
            !1,
            !1
          ),
          (lastCrawlUse = new Date().getTime());
      },
    }),
    isPlayerCanCrawl = () =>
      !global.isPlayerDeath &&
      !global.isAnyPedAttachedToLocalPlayer &&
      null === mp.players.local.vehicle &&
      !global.disableKeys;
}
