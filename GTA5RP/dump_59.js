{
  let authBrowser = mp.browsers.new("package://Auth/auth.html");
  var readyLogin = !1;
  function getAutoLoginData() {
    return mp.storage.launchParams;
  }
  function decodeAutoLoginData() {
    try {
      const a = getAutoLoginData();
      if (10 > a.length) return !1;
      const b = JSON.parse(a);
      if (!b) return !1;
      if (!b.autoLogin) return !1;
      if (3 !== b.autoLogin.length) return !1;
      const c = Math.round(new Date().getTime() / 1e3);
      return !(b.autoLogin[0] + 600 < c) && b.autoLogin;
    } catch (a) {}
    return !1;
  }
  function getAutoLoginPassword() {
    const a = decodeAutoLoginData();
    return a ? getAutoLoginData() : "";
  }
  mp.events.add("browserDomReady", async (a) => {
    if (a === authBrowser)
      try {
        mp.players.local.setAlpha(0),
          global.hideUI(!0),
          global.setCamera(
            new mp.Vector3(-1724.85, -1078.44, 20.62),
            new mp.Vector3(0, 0, 0),
            60,
            new mp.Vector3(-1748.73, -1075.78, 17.73),
            0
          ),
          mp.events.callRemote("server_auth_taskGetServerData");
      } catch (a) {}
    else
      a === global.mainBrowser &&
        mp.browsers.exists(authBrowser) &&
        mp.gui.chat.show(!1);
  }),
    mp.events.add("client_auth_returnServerData", (a, b, c, d, e, f, g, h) => {
      readyLogin = !0;
      const i = decodeAutoLoginData();
      global.rpc.triggerBrowser(authBrowser, "menu_load", {
        login: i ? i[2] : global.getGlobalStorage().auth.login,
        enableServerPass: a,
        customLogo: c,
        serverId: d,
        serverName: b,
        autoLoginPassword: getAutoLoginPassword(),
        isAutoLoginEnabled: !!i,
        enableFakeQueue: !!mp.api.data.get("serverFakeQueue"),
      }),
        global.mainBrowser.execute(`
        mainHud.serverName = '${b}';
        mainHud.customLogo = '${c}';
    `),
        global.showCursor(!0, !0),
        (global.serverName = b),
        mp.events.call("client_ui_setTime", e, f, g, h),
        global.discordUpdate(
          "\u0412\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430"
        );
    }),
    mp.events.add("c:auth:serverPass", (a) => {
      mp.browsers.exists(authBrowser) &&
        authBrowser.execute(
          `vueApp.serverData.enableServerPass = Boolean(${!!a});`
        );
    }),
    setTimeout(() => {
      readyLogin ||
        (global.rpc.triggerBrowser(authBrowser, "menu_load", {
          login: global.getGlobalStorage().auth.login,
          enableServerPass: !1,
          customLogo: "",
          serverId: 1,
          serverName: "",
        }),
        global.showCursor(!0, !0));
    }, 2e4),
    mp.events.add("client_playerAuth_startSelectCharatcer", function () {
      mp.players.local.setCoordsNoOffset(-1702.35, -1090.2, 13.15, !1, !1, !1),
        mp.players.local.setHeading(49),
        mp.players.local.setAlpha(0),
        global.setCamera(
          new mp.Vector3(-1705.48, -1087.88, 14),
          new mp.Vector3(0, 0, 0),
          60,
          new mp.Vector3(-1702.35, -1090.2, 13.15),
          0
        );
    }),
    mp.events.add("client_playerAuth_showPlayer", function () {
      mp.players.local.setAlpha(255);
    }),
    mp.events.add("client_playerAuth_hidePlayer", function () {
      mp.players.local.setAlpha(0);
    }),
    mp.events.add("client_auth_selectCharacter_end", async function (a, b) {
      mp.players.local.setAlpha(255),
        await global.rpc.callClient("client_storage_select", a),
        authBrowser.destroy(),
        (authBrowser = null),
        b &&
          (global.resetCamera(0),
          setTimeout(() => {
            global.disableAllAction || global.hideUI(!1);
          }, 2e3)),
        global.showCursor(!1, !1),
        (global.isAuth = !0),
        global.discordUpdate();
    }),
    mp.events.add("client_auth_setQueueIndex", (a) => {
      authBrowser &&
        (0 === a
          ? authBrowser.execute(`
            vueApp.endQueue();
        `)
          : authBrowser.execute(`
            vueApp.queue = ${a};
        `));
    });
  const interval = setInterval(
    () =>
      global.isAuth
        ? void clearInterval(interval)
        : void (
            mp.game.ui.isPauseMenuActive() && mp.game.ui.setPauseMenuActive(!1)
          ),
    100
  );
}
