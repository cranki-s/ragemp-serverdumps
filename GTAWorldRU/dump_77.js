{
﻿! function(e) {
    var r = {};

    function t(n) {
        if (r[n]) return r[n].exports;
        var o = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    t.m = e, t.c = r, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: n
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, r) {
        if (1 & r && (e = t(e)), 8 & r) return e;
        if (4 & r && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (t.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & r && "string" != typeof e)
            for (var o in e) t.d(n, o, function(r) {
                return e[r]
            }.bind(null, o));
        return n
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }, t.p = "", t(t.s = 0)
}([function(e, r, t) {
    "use strict";
    var n = this && this.__importStar || function(e) {
            if (e && e.__esModule) return e;
            var r = {};
            if (null != e)
                for (var t in e) Object.hasOwnProperty.call(e, t) && (r[t] = e[t]);
            return r.default = e, r
        },
        o = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var i = n(t(1)),
        s = o(t(2)),
        c = o(t(3)),
        a = t(4),
        l = !1,
        u = !1,
        p = new Array,
        f = new c.default("package://" + a.CLIENT_PACKAGE_ROOT_PATH + "/cef/animwheel.html");

    function d() {
        f.hide(), mp.events.call("setCefActive", !1), u = !1
    }

    function openWheel() {
        u || l && !f.isVisible || (f.isVisible ? d() : mp.gui.cursor.visible || (f.show(), mp.events.call("setCefActive", !0)))
    }

    function m(e) {
        p = e
    }
    mp.keys.bind(a.TOGGLE_ANIMWHEEL_KEY, !1, (function() {
        if (logged) openWheel();
    })), mp.keys.bind(a.CLOSE_EDITOR_KEY, !1, (function() {
       logged && f.isVisible && i.callBrowser(f.browser, "EscapeClicked")
    })), mp.events.add("SetFavoriteAnimations", (function(e) {
        m(e)
    })), mp.events.add('showAnimWheel', (function() {
        if (logged) openWheel();
    })), mp.events.add("SetFavoriteAnimations_JSON", (function(e) {
        m(JSON.parse(e))
    })), mp.events.add("UpdateFavoriteAnimation_Failed", (function(e) {
        i.callBrowser(f.browser, "UpdateFavoriteAnimation_Failed", e)
    })), mp.events.add("UpdateFavoriteAnimation_Success", (function(e, r, t) {
        var n = p.find((function(r) {
            return r.slot == e
        }));
        n.animation = r, n.category = t, i.callBrowser(f.browser, "UpdateFavoriteAnimation_Success", new s.default(e, r, t))
    })), i.register("Animwheel_GetFavoriteAnimations", (function() {
        return p
    })), i.register("Animwheel_PlayAnimation", (function(e) {
        d(), mp.events.callRemote("PlayAnimation", e)
    })), i.register("Animwheel_StopAnimation", (function() {
        d(), mp.events.callRemote("StopAnimation")
    })), i.register("Animwheel_UpdateFavoriteAnimation", (function(e) {
        mp.events.callRemote("UpdateFavoriteAnimation", e.slotIndex, e.animationActionName)
    })), i.register("Animwheel_EditorVisibilityChanged", (function(e) {
        u = e
    })), mp.events.add("setCefActive", (function(e) {
        l = e
    }))
}, function(e, r, t) {
    "undefined" != typeof self && self, e.exports = function(e) {
        var r = {};

        function t(n) {
            if (r[n]) return r[n].exports;
            var o = r[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }
        return t.m = e, t.c = r, t.d = function(e, r, n) {
            t.o(e, r) || Object.defineProperty(e, r, {
                enumerable: !0,
                get: n
            })
        }, t.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, t.t = function(e, r) {
            if (1 & r && (e = t(e)), 8 & r) return e;
            if (4 & r && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (t.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & r && "string" != typeof e)
                for (var o in e) t.d(n, o, function(r) {
                    return e[r]
                }.bind(null, o));
            return n
        }, t.n = function(e) {
            var r = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(r, "a", r), r
        }, t.o = function(e, r) {
            return Object.prototype.hasOwnProperty.call(e, r)
        }, t.p = "", t(t.s = 1)
    }([function(e, r, t) {
        "use strict";
        var n;

        function o(e, r) {
            const t = "client" === s();
            if (e && "object" == typeof e && void 0 !== e.id) {
                const o = (r, n, o) => t ? e.type === r && n.at(e.id) === e : e instanceof o;
                switch (r) {
                    case n.Blip:
                        return o("blip", mp.blips, mp.Blip);
                    case n.Checkpoint:
                        return o("checkpoint", mp.checkpoints, mp.Checkpoint);
                    case n.Colshape:
                        return o("colshape", mp.colshapes, mp.Colshape);
                    case n.Label:
                        return o("textlabel", mp.labels, mp.TextLabel);
                    case n.Marker:
                        return o("marker", mp.markers, mp.Marker);
                    case n.Object:
                        return o("object", mp.objects, mp.Object);
                    case n.Pickup:
                        return o("pickup", mp.pickups, mp.Pickup);
                    case n.Player:
                        return o("player", mp.players, mp.Player);
                    case n.Vehicle:
                        return o("vehicle", mp.vehicles, mp.Vehicle)
                }
            }
            return !1
        }

        function i() {
            const e = 46656 * Math.random() | 0,
                r = 46656 * Math.random() | 0;
            return ("000" + e.toString(36)).slice(-3) + ("000" + r.toString(36)).slice(-3)
        }

        function s() {
            return mp.joaat ? "server" : mp.game && mp.game.joaat ? "client" : mp.trigger ? "cef" : void 0
        }

        function c(e) {
            const r = s();
            return JSON.stringify(e, (e, t) => {
                if ("client" === r || "server" === r && t && "object" == typeof t) {
                    let e;
                    if (o(t, n.Blip) ? e = n.Blip : o(t, n.Checkpoint) ? e = n.Checkpoint : o(t, n.Colshape) ? e = n.Colshape : o(t, n.Marker) ? e = n.Marker : o(t, n.Object) ? e = n.Object : o(t, n.Pickup) ? e = n.Pickup : o(t, n.Player) ? e = n.Player : o(t, n.Vehicle) && (e = n.Vehicle), e) return {
                        __t: e,
                        i: "number" == typeof t.remoteId ? t.remoteId : t.id
                    }
                }
                return t
            })
        }

        function a(e) {
            const r = s();
            return JSON.parse(e, (e, t) => {
                if (("client" === r || "server" === r) && t && "object" == typeof t && "string" == typeof t.__t && "number" == typeof t.i && 2 === Object.keys(t).length) {
                    const e = t.i;
                    let o;
                    switch (t.__t) {
                        case n.Blip:
                            o = mp.blips;
                            break;
                        case n.Checkpoint:
                            o = mp.checkpoints;
                            break;
                        case n.Colshape:
                            o = mp.colshapes;
                            break;
                        case n.Label:
                            o = mp.labels;
                            break;
                        case n.Marker:
                            o = mp.markers;
                            break;
                        case n.Object:
                            o = mp.objects;
                            break;
                        case n.Pickup:
                            o = mp.pickups;
                            break;
                        case n.Player:
                            o = mp.players;
                            break;
                        case n.Vehicle:
                            o = mp.vehicles
                    }
                    if (o) return o["client" === r ? "atRemoteId" : "at"](e)
                }
                return t
            })
        }

        function l(e) {
            return new Promise(r => setTimeout(() => r(e), 0))
        }

        function u(e) {
            return new Promise((r, t) => setTimeout(() => t(e), 0))
        }

        function p(e, r) {
            return "number" == typeof r ? Promise.race([new Promise((e, t) => {
                setTimeout(() => t("TIMEOUT"), r)
            }), e]) : e
        }

        function f(e) {
            try {
                e.url
            } catch (e) {
                return !1
            }
            return !0
        }
        t.d(r, "h", (function() {
                return i
            })), t.d(r, "a", (function() {
                return s
            })), t.d(r, "g", (function() {
                return c
            })), t.d(r, "c", (function() {
                return a
            })), t.d(r, "e", (function() {
                return l
            })), t.d(r, "d", (function() {
                return u
            })), t.d(r, "f", (function() {
                return p
            })), t.d(r, "b", (function() {
                return f
            })),
            function(e) {
                e.Blip = "b", e.Checkpoint = "cp", e.Colshape = "c", e.Label = "l", e.Marker = "m", e.Object = "o", e.Pickup = "p", e.Player = "pl", e.Vehicle = "v"
            }(n || (n = {}))
    }, function(e, r, t) {
        "use strict";
        t.r(r),
            function(e) {
                t.d(r, "register", (function() {
                    return g
                })), t.d(r, "unregister", (function() {
                    return h
                })), t.d(r, "call", (function() {
                    return _
                })), t.d(r, "callServer", (function() {
                    return w
                })), t.d(r, "callClient", (function() {
                    return y
                })), t.d(r, "callBrowsers", (function() {
                    return k
                })), t.d(r, "callBrowser", (function() {
                    return B
                })), t.d(r, "on", (function() {
                    return j
                })), t.d(r, "off", (function() {
                    return x
                })), t.d(r, "trigger", (function() {
                    return S
                })), t.d(r, "triggerClient", (function() {
                    return C
                })), t.d(r, "triggerServer", (function() {
                    return E
                })), t.d(r, "triggerBrowsers", (function() {
                    return A
                })), t.d(r, "triggerBrowser", (function() {
                    return M
                }));
                var n = t(0);
                const o = n.a();
                if (!o) throw "Unknown RAGE environment";
                const i = "PROCEDURE_NOT_FOUND",
                    s = "__rpc:id",
                    c = "__rpc:process",
                    a = "__rpc:browserRegister",
                    l = "__rpc:browserUnregister",
                    u = "__rpc:triggerEvent",
                    p = "__rpc:triggerEventBrowsers",
                    f = "cef" === o ? window : e;
                if (!f[c]) {
                    if (f.__rpcListeners = {}, f.__rpcPending = {}, f.__rpcEvListeners = {}, f[c] = (e, r) => {
                            "server" !== o && (r = e);
                            const t = n.c(r);
                            if (t.req) {
                                const r = {
                                    id: t.id,
                                    environment: t.fenv || t.env
                                };
                                "server" === o && (r.player = e);
                                const i = {
                                    ret: 1,
                                    id: t.id,
                                    env: o
                                };
                                let s;
                                switch (o) {
                                    case "server":
                                        s = e => r.player.call(c, [n.g(e)]);
                                        break;
                                    case "client":
                                        if ("server" === t.env) s = e => mp.events.callRemote(c, n.g(e));
                                        else if ("cef" === t.env) {
                                            const e = t.b && f.__rpcBrowsers[t.b];
                                            r.browser = e, s = r => e && n.b(e) && d(e, r, !0)
                                        }
                                        break;
                                    case "cef":
                                        s = e => mp.trigger(c, n.g(e))
                                }
                                if (s) {
                                    const e = m(t.name, t.args, r);
                                    t.noRet || e.then(e => s({
                                        ...i,
                                        res: e
                                    })).catch(e => s({
                                        ...i,
                                        err: e
                                    }))
                                }
                            } else if (t.ret) {
                                const r = f.__rpcPending[t.id];
                                if ("server" === o && r.player !== e) return;
                                r && (r.resolve(t.err ? n.d(t.err) : n.e(t.res)), delete f.__rpcPending[t.id])
                            }
                        }, "cef" !== o) {
                        if (mp.events.add(c, f[c]), "client" === o) {
                            g("__rpc:callServer", ([e, r, t], n) => v(e, r, {
                                fenv: n.environment,
                                noRet: t
                            })), g("__rpc:callBrowsers", ([e, r, t], n) => O(null, e, r, {
                                fenv: n.environment,
                                noRet: t
                            })), f.__rpcBrowsers = {};
                            const e = e => {
                                const r = n.h();
                                Object.keys(f.__rpcBrowsers).forEach(r => {
                                    const t = f.__rpcBrowsers[r];
                                    t && n.b(t) && t !== e || delete f.__rpcBrowsers[r]
                                }), f.__rpcBrowsers[r] = e, e.execute(`\n                    window.name = '${r}';\n                    if(typeof window['${s}'] === 'undefined'){\n                        window['${s}'] = Promise.resolve(window.name);\n                    }else{\n                        window['${s}:resolve'](window.name);\n                    }\n                `)
                            };
                            mp.browsers.forEach(e), mp.events.add("browserCreated", e), f.__rpcBrowserProcedures = {}, mp.events.add(a, e => {
                                const [r, t] = JSON.parse(e);
                                f.__rpcBrowserProcedures[t] = r
                            }), mp.events.add(l, e => {
                                const [r, t] = JSON.parse(e);
                                f.__rpcBrowserProcedures[t] === r && delete f.__rpcBrowserProcedures[t]
                            }), g(p, ([e, r], t) => {
                                Object.values(f.__rpcBrowsers).forEach(n => {
                                    P(n, u, [e, r], {
                                        fenv: t.environment,
                                        noRet: 1
                                    })
                                })
                            })
                        }
                    } else void 0 === f[s] && (f[s] = new Promise(e => {
                        window.name ? e(window.name) : f[s + ":resolve"] = e
                    }));
                    g(u, ([e, r], t) => R(e, r, t))
                }

                function d(e, r, t) {
                    const o = n.g(r);
                    e.execute(`var process = window["${c}"]; if(process){ process(${JSON.stringify(o)}); }else{ ${t?"":`
                        mp.trigger("${c}", '{"ret":1,"id":"${r.id}","err":"${i}","env":"cef"}');
                        `} }`)
                }

                function m(e, r, t) {
                    const o = f.__rpcListeners[e];
                    return o ? n.e(o(r, t)) : n.d(i)
                }

                function g(e, r) {
                    if (2 !== arguments.length) throw 'register expects 2 arguments: "name" and "cb"';
                    return "cef" === o && f[s].then(r => mp.trigger(a, JSON.stringify([r, e]))), f.__rpcListeners[e] = r, () => h(e)
                }

                function h(e) {
                    if (1 !== arguments.length) throw 'unregister expects 1 argument: "name"';
                    "cef" === o && f[s].then(r => mp.trigger(l, JSON.stringify([r, e]))), f.__rpcListeners[e] = void 0
                }

                function _(e, r, t = {}) {
                    return arguments.length < 1 || arguments.length > 3 ? n.d('call expects 1 to 3 arguments: "name", optional "args", and optional "options"') : n.f(m(e, r, {
                        environment: o
                    }), t.timeout)
                }

                function v(e, r, t = {}) {
                    switch (o) {
                        case "server":
                            return _(e, r);
                        case "client": {
                            const i = n.h();
                            return new Promise(s => {
                                t.noRet || (f.__rpcPending[i] = {
                                    resolve: s
                                });
                                const a = {
                                    req: 1,
                                    id: i,
                                    name: e,
                                    env: o,
                                    args: r,
                                    ...t
                                };
                                mp.events.callRemote(c, n.g(a))
                            })
                        }
                        case "cef":
                            return y("__rpc:callServer", [e, r, +t.noRet])
                    }
                }

                function w(e, r, t = {}) {
                    if (arguments.length < 1 || arguments.length > 3) return n.d('callServer expects 1 to 3 arguments: "name", optional "args", and optional "options"');
                    let o = {};
                    return t.noRet && (o.noRet = 1), n.f(v(e, r, o), t.timeout)
                }

                function b(e, r, t, i = {}) {
                    switch (o) {
                        case "client":
                            return _(r, t);
                        case "server": {
                            const s = n.h();
                            return new Promise(a => {
                                i.noRet || (f.__rpcPending[s] = {
                                    resolve: a,
                                    player: e
                                });
                                const l = {
                                    req: 1,
                                    id: s,
                                    name: r,
                                    env: o,
                                    args: t,
                                    ...i
                                };
                                e.call(c, [n.g(l)])
                            })
                        }
                        case "cef": {
                            const e = n.h();
                            return f[s].then(s => new Promise(a => {
                                i.noRet || (f.__rpcPending[e] = {
                                    resolve: a
                                });
                                const l = {
                                    b: s,
                                    req: 1,
                                    id: e,
                                    name: r,
                                    env: o,
                                    args: t,
                                    ...i
                                };
                                mp.trigger(c, n.g(l))
                            }))
                        }
                    }
                }

                function y(e, r, t, i = {}) {
                    switch (o) {
                        case "client":
                            if (i = t || {}, t = r, r = e, e = null, arguments.length < 1 || arguments.length > 3 || "string" != typeof r) return n.d('callClient from the client expects 1 to 3 arguments: "name", optional "args", and optional "options"');
                            break;
                        case "server":
                            if (arguments.length < 2 || arguments.length > 4 || "object" != typeof e) return n.d('callClient from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options"');
                            break;
                        case "cef":
                            if (i = t || {}, t = r, r = e, e = null, arguments.length < 1 || arguments.length > 3 || "string" != typeof r) return n.d('callClient from the browser expects 1 to 3 arguments: "name", optional "args", and optional "options"')
                    }
                    let s = {};
                    return i.noRet && (s.noRet = 1), n.f(b(e, r, t, s), i.timeout)
                }

                function P(e, r, t, i = {}) {
                    return new Promise(s => {
                        const c = n.h();
                        i.noRet || (f.__rpcPending[c] = {
                            resolve: s
                        }), d(e, {
                            req: 1,
                            id: c,
                            name: r,
                            env: o,
                            args: t,
                            ...i
                        }, !1)
                    })
                }

                function O(e, r, t, s = {}) {
                    switch (o) {
                        case "client":
                            const o = f.__rpcBrowserProcedures[r];
                            if (!o) return n.d(i);
                            const c = f.__rpcBrowsers[o];
                            return c && n.b(c) ? P(c, r, t, s) : n.d(i);
                        case "server":
                            return b(e, "__rpc:callBrowsers", [r, t, +s.noRet], s);
                        case "cef":
                            return b(null, "__rpc:callBrowsers", [r, t, +s.noRet], s)
                    }
                }

                function k(e, r, t, i = {}) {
                    let s, c = {};
                    switch (o) {
                        case "client":
                        case "cef":
                            if (i = t || {}, t = r, r = e, arguments.length < 1 || arguments.length > 3) return n.d('callBrowsers from the client or browser expects 1 to 3 arguments: "name", optional "args", and optional "options"');
                            i.noRet && (c.noRet = 1), s = O(null, r, t, c);
                            break;
                        case "server":
                            if (arguments.length < 2 || arguments.length > 4) return n.d('callBrowsers from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options"');
                            i.noRet && (c.noRet = 1), s = O(e, r, t, c)
                    }
                    if (s) return n.f(s, i.timeout)
                }

                function B(e, r, t, i = {}) {
                    if ("client" !== o) return n.d("callBrowser can only be used in the client environment");
                    if (arguments.length < 2 || arguments.length > 4) return n.d('callBrowser expects 2 to 4 arguments: "browser", "name", optional "args", and optional "options"');
                    let s = {};
                    return i.noRet && (s.noRet = 1), n.f(P(e, r, t, s), i.timeout)
                }

                function R(e, r, t) {
                    const n = f.__rpcEvListeners[e];
                    n && n.forEach(e => e(r, t))
                }

                function j(e, r) {
                    if (2 !== arguments.length) throw 'on expects 2 arguments: "name" and "cb"';
                    const t = f.__rpcEvListeners[e] || new Set;
                    return t.add(r), f.__rpcEvListeners[e] = t, () => x(e, r)
                }

                function x(e, r) {
                    if (2 !== arguments.length) throw 'off expects 2 arguments: "name" and "cb"';
                    const t = f.__rpcEvListeners[e];
                    t && t.delete(r)
                }

                function S(e, r) {
                    if (arguments.length < 1 || arguments.length > 2) throw 'trigger expects 1 or 2 arguments: "name", and optional "args"';
                    R(e, r, {
                        environment: o
                    })
                }

                function C(e, r, t) {
                    switch (o) {
                        case "client":
                            if (t = r, r = e, e = null, arguments.length < 1 || arguments.length > 2 || "string" != typeof r) throw 'triggerClient from the client expects 1 or 2 arguments: "name", and optional "args"';
                            break;
                        case "server":
                            if (arguments.length < 2 || arguments.length > 3 || "object" != typeof e) throw 'triggerClient from the server expects 2 or 3 arguments: "player", "name", and optional "args"';
                            break;
                        case "cef":
                            if (t = r, r = e, e = null, arguments.length < 1 || arguments.length > 2 || "string" != typeof r) throw 'triggerClient from the browser expects 1 or 2 arguments: "name", and optional "args"'
                    }
                    b(e, u, [r, t], {
                        noRet: 1
                    })
                }

                function E(e, r) {
                    if (arguments.length < 1 || arguments.length > 2) throw 'triggerServer expects 1 or 2 arguments: "name", and optional "args"';
                    v(u, [e, r], {
                        noRet: 1
                    })
                }

                function A(e, r, t) {
                    switch (o) {
                        case "client":
                        case "cef":
                            if (t = r, r = e, e = null, arguments.length < 1 || arguments.length > 2) throw 'triggerBrowsers from the client or browser expects 1 or 2 arguments: "name", and optional "args"';
                            break;
                        case "server":
                            if (arguments.length < 2 || arguments.length > 3) throw 'triggerBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args"'
                    }
                    b(e, p, [r, t], {
                        noRet: 1
                    })
                }

                function M(e, r, t) {
                    if ("client" !== o) throw "callBrowser can only be used in the client environment";
                    if (arguments.length < 2 || arguments.length > 4) throw 'callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args"';
                    P(e, u, [r, t], {
                        noRet: 1
                    })
                }
                r.default = {
                    register: g,
                    unregister: h,
                    call: _,
                    callServer: w,
                    callClient: y,
                    callBrowsers: k,
                    callBrowser: B,
                    on: j,
                    off: x,
                    trigger: S,
                    triggerServer: E,
                    triggerClient: C,
                    triggerBrowsers: A,
                    triggerBrowser: M
                }
            }.call(this, t(2))
    }, function(e, r) {
        var t;
        t = function() {
            return this
        }();
        try {
            t = t || new Function("return this")()
        } catch (e) {
            "object" == typeof window && (t = window)
        }
        e.exports = t
    }])
}, function(e, r, t) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = function(e, r, t) {
        this.slot = e, this.animation = r, this.category = t
    };
    r.default = n
}, function(e, r, t) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = function() {
        function e(e, r) {
            var t = this;
            void 0 === r && (r = !0), this._isVisible = !1, mp.events.add("guiReady", (function() {
                t.browser || (t.browser = mp.browsers.new(e), t.hide())
            }))
        }
        return e.prototype.hide = function() {
            this.browser && (this.browser.execute("$('body').hide()"), mp.gui.cursor.show(!1, !1), mp.game.ui.displayRadar(!0), mp.gui.chat.activate(!0), this._isVisible = !1)
        }, e.prototype.show = function() {
            this.browser && (this.browser.reload(!1), this.browser.execute("$('body').show()"), mp.gui.cursor.show(!0, !0), mp.game.ui.displayRadar(!1), mp.gui.chat.activate(!1), this._isVisible = !0)
        }, Object.defineProperty(e.prototype, "isVisible", {
            get: function() {
                return this._isVisible
            },
            enumerable: !0,
            configurable: !0
        }), e
    }();
    r.default = n
}, function(e, r, t) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), r.TOGGLE_ANIMWHEEL_KEY = 85, r.CLOSE_EDITOR_KEY = 27, r.CLIENT_PACKAGE_ROOT_PATH = "gtalife/animwheel"
}]);

}