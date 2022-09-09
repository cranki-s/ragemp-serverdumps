{
    (() => {
        var __webpack_require__ = {};
        __webpack_require__.g = function () {
            if (typeof globalThis == "object") return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if (typeof window == "object") return window;
            }
        }();
        var __webpack_exports__ = {};
        mp.events.add("loader", (serverName, serverMode, serverLocale) => {
            __webpack_require__.g.serverMode = serverMode, __webpack_require__.g.serverName = serverName, __webpack_require__.g.serverLocale = serverLocale, eval("require")("./roleplay/node/index.js");
        }), mp.events.add("browserDomReady", async e => {
            ui.browser.instance === e && (gm.loaded = true, await rpc.callBrowser(e, "loader:complete", { serverMode: gm.serverMode, serverName: gm.serverName, locale: gm.locale, rageVersion: gm.rageVersion }), gm.events.callRemote("loader:complete", mp.players.local.name), gm.events.call("loader:complete", mp.players.local.name));
        }), mp.events.add("loader:unloadScheduler", e => {
            e ? gm.unloadTime = new Date(+e) : gm.unloadTime = e;
        });
    })();
}
