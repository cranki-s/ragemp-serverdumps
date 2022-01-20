{
  let actionList = [],
    isMenuOpen = !1;
  (global.createMenuList = (a) => {
    if ("auto" === a.toPlayer) {
      const { x: b, y: c, z: d } = mp.players.local.position,
        e = mp.game.graphics.world3dToScreen2d(b, c, d);
      a.toPlayer =
        null == e ? [0.5, 0.5] : [e.x, Math.max(Math.min(e.y, 0.8), 0.4)];
    }
    (actionList = a.items.map((a) => a[1])),
      global.rpc.triggerBrowser(
        global.mainBrowser,
        "client_browser_listMenu_open",
        a
      ),
      isMenuOpen || (global.showCursor(!0, !0), (isMenuOpen = !0));
  }),
    (global.hideMenuList = () => {
      (actionList = []),
        global.rpc.triggerBrowser(
          global.mainBrowser,
          "client_browser_listMenu_hide"
        ),
        isMenuOpen && (global.showCursor(!1, !1), (isMenuOpen = !1));
    }),
    global.rpc.on("client_listMenu_click", function (a) {
      let b = actionList[a];
      b && b();
    });
}
