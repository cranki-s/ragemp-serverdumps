{
  !(function (e, r) {
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = r())
      : "function" == typeof define && define.amd
      ? define([], r)
      : "object" == typeof exports
      ? (exports = r())
      : (e.rpc = r());
  })("undefined" != typeof self ? self : this, function () {
    return (function (e) {
      var r = {};
      function t(n) {
        if (r[n]) return r[n].exports;
        var c = (r[n] = { i: n, l: !1, exports: {} });
        return e[n].call(c.exports, c, c.exports, t), (c.l = !0), c.exports;
      }
      return (
        (t.m = e),
        (t.c = r),
        (t.d = function (e, r, n) {
          t.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: n });
        }),
        (t.r = function (e) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (t.t = function (e, r) {
          if ((1 & r && (e = t(e)), 8 & r)) return e;
          if (4 & r && "object" == typeof e && e && e.__esModule) return e;
          var n = Object.create(null);
          if (
            (t.r(n),
            Object.defineProperty(n, "default", { enumerable: !0, value: e }),
            2 & r && "string" != typeof e)
          )
            for (var c in e)
              t.d(
                n,
                c,
                function (r) {
                  return e[r];
                }.bind(null, c)
              );
          return n;
        }),
        (t.n = function (e) {
          var r =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return t.d(r, "a", r), r;
        }),
        (t.o = function (e, r) {
          return Object.prototype.hasOwnProperty.call(e, r);
        }),
        (t.p = ""),
        t((t.s = 1))
      );
    })([
      function (e, r, t) {
        "use strict";
        var n;
        t.d(r, "i", function () {
          return o;
        }),
          t.d(r, "b", function () {
            return s;
          }),
          t.d(r, "h", function () {
            return i;
          }),
          t.d(r, "d", function () {
            return a;
          }),
          t.d(r, "f", function () {
            return l;
          }),
          t.d(r, "e", function () {
            return p;
          }),
          t.d(r, "g", function () {
            return u;
          }),
          t.d(r, "c", function () {
            return f;
          }),
          t.d(r, "a", function () {
            return _;
          }),
          (function (e) {
            (e.Blip = "b"),
              (e.Checkpoint = "cp"),
              (e.Colshape = "c"),
              (e.Label = "l"),
              (e.Marker = "m"),
              (e.Object = "o"),
              (e.Pickup = "p"),
              (e.Player = "pl"),
              (e.Vehicle = "v");
          })(n || (n = {}));
        function c(e, r) {
          try {
            const t = "client" === s();
            if (e && "object" == typeof e && void 0 !== e.id) {
              const c = (r, n, c) =>
                t ? e.type === r && n.at(e.id) === e : e instanceof c;
              switch (r) {
                case n.Blip:
                  return c("blip", mp.blips, mp.Blip);
                case n.Checkpoint:
                  return c("checkpoint", mp.checkpoints, mp.Checkpoint);
                case n.Colshape:
                  return c("colshape", mp.colshapes, mp.Colshape);
                case n.Label:
                  return c("textlabel", mp.labels, mp.TextLabel);
                case n.Marker:
                  return c("marker", mp.markers, mp.Marker);
                case n.Object:
                  return c("object", mp.objects, mp.Object);
                case n.Pickup:
                  return c("pickup", mp.pickups, mp.Pickup);
                case n.Player:
                  return c("player", mp.players, mp.Player);
                case n.Vehicle:
                  return c("vehicle", mp.vehicles, mp.Vehicle);
              }
            }
            return !1;
          } catch (e) {
            0;
          }
        }
        function o() {
          try {
            const e = (46656 * Math.random()) | 0,
              r = (46656 * Math.random()) | 0,
              t = ("000" + e.toString(36)).slice(-3);
            return t + ("000" + r.toString(36)).slice(-3);
          } catch (e) {
            0;
          }
        }
        function s() {
          try {
            if (mp.joaat) return "server";
            if (mp.game && mp.game.joaat) return "client";
            if (mp.trigger) return "cef";
          } catch (e) {
            0;
          }
        }
        function i(e) {
          try {
            const r = s();
            return JSON.stringify(e, (e, t) => {
              if (
                "client" === r ||
                ("server" === r && t && "object" == typeof t)
              ) {
                let e;
                if (
                  (c(t, n.Blip)
                    ? (e = n.Blip)
                    : c(t, n.Checkpoint)
                    ? (e = n.Checkpoint)
                    : c(t, n.Colshape)
                    ? (e = n.Colshape)
                    : c(t, n.Marker)
                    ? (e = n.Marker)
                    : c(t, n.Object)
                    ? (e = n.Object)
                    : c(t, n.Pickup)
                    ? (e = n.Pickup)
                    : c(t, n.Player)
                    ? (e = n.Player)
                    : c(t, n.Vehicle) && (e = n.Vehicle),
                  e)
                )
                  return {
                    __t: e,
                    i: "number" == typeof t.remoteId ? t.remoteId : t.id,
                  };
              }
              return t;
            });
          } catch (e) {
            0;
          }
        }
        function a(e) {
          try {
            const r = s();
            return JSON.parse(e, (e, t) => {
              if (
                ("client" === r || "server" === r) &&
                t &&
                "object" == typeof t &&
                "string" == typeof t.__t &&
                "number" == typeof t.i &&
                2 === Object.keys(t).length
              ) {
                const e = t.i;
                let c;
                switch (t.__t) {
                  case n.Blip:
                    c = mp.blips;
                    break;
                  case n.Checkpoint:
                    c = mp.checkpoints;
                    break;
                  case n.Colshape:
                    c = mp.colshapes;
                    break;
                  case n.Label:
                    c = mp.labels;
                    break;
                  case n.Marker:
                    c = mp.markers;
                    break;
                  case n.Object:
                    c = mp.objects;
                    break;
                  case n.Pickup:
                    c = mp.pickups;
                    break;
                  case n.Player:
                    c = mp.players;
                    break;
                  case n.Vehicle:
                    c = mp.vehicles;
                }
                if (c) return c["client" === r ? "atRemoteId" : "at"](e);
              }
              return t;
            });
          } catch (e) {
            0;
          }
        }
        function l(e) {
          try {
            return new Promise((r) => setTimeout(() => r(e), 0));
          } catch (e) {
            0;
          }
        }
        function p(e) {
          try {
            return new Promise((r, t) => setTimeout(() => t(e), 0));
          } catch (e) {
            0;
          }
        }
        function u(e, r) {
          try {
            return "number" == typeof r
              ? Promise.race([
                  new Promise((e, t) => {
                    setTimeout(() => t("TIMEOUT"), r);
                  }),
                  e,
                ])
              : e;
          } catch (e) {
            0;
          }
        }
        function f(e) {
          try {
            e.url;
          } catch (e) {
            return !1;
          }
          return !0;
        }
        function _(e, r) {
          try {
            const t = Math.ceil(e.length / r),
              n = new Array(t);
            let c = 0;
            for (let o = 0; o < t; o += 1) (n[o] = e.substr(c, r)), (c += r);
            return n;
          } catch (e) {
            0;
          }
        }
      },
      function (e, r, t) {
        "use strict";
        t.r(r),
          function (e) {
            t.d(r, "register", function () {
              return p;
            }),
              t.d(r, "unregister", function () {
                return u;
              }),
              t.d(r, "call", function () {
                return f;
              }),
              t.d(r, "callServer", function () {
                return g;
              }),
              t.d(r, "callClient", function () {
                return m;
              }),
              t.d(r, "callBrowsers", function () {
                return y;
              }),
              t.d(r, "callBrowser", function () {
                return v;
              }),
              t.d(r, "on", function () {
                return P;
              }),
              t.d(r, "off", function () {
                return k;
              }),
              t.d(r, "trigger", function () {
                return B;
              }),
              t.d(r, "triggerClient", function () {
                return R;
              }),
              t.d(r, "triggerServer", function () {
                return O;
              }),
              t.d(r, "triggerBrowsers", function () {
                return x;
              }),
              t.d(r, "triggerBrowser", function () {
                return j;
              });
            var n = t(0);
            const c = n.b();
            if (!c) throw "Unknown RAGE environment";
            const o = "__rpc:triggerEvent",
              s = "cef" === c ? window : e;
            if (!s["__rpc:processPartial"])
              try {
                (s.__rpcPartialData = {}),
                  (s["__rpc:processPartial"] = (e, r, t, n, o) => {
                    "server" !== c && ((o = n), (n = t), (t = r), (r = e)),
                      s.__rpcPartialData[r] ||
                        (s.__rpcPartialData[r] = new Array(n)),
                      (s.__rpcPartialData[r][t] = o),
                      s.__rpcPartialData[r].includes(void 0) ||
                        ("server" !== c
                          ? s["__rpc:process"](s.__rpcPartialData[r].join(""))
                          : s["__rpc:process"](
                              e,
                              s.__rpcPartialData[r].join("")
                            ),
                        delete s.__rpcPartialData[r]);
                  });
              } catch (e) {
                0;
              }
            if (!s["__rpc:process"])
              try {
                if (
                  ((s.__rpcListeners = {}),
                  (s.__rpcPending = {}),
                  (s.__rpcEvListeners = {}),
                  (s["__rpc:process"] = (e, r) => {
                    "server" !== c && (r = e);
                    const t = n.d(r);
                    if (t.req) {
                      const r = { id: t.id, environment: t.fenv || t.env };
                      "server" === c && (r.player = e);
                      const o = { ret: 1, id: t.id, env: c };
                      let l;
                      switch (c) {
                        case "server":
                          l = (e) => r.player.call("__rpc:process", [n.h(e)]);
                          break;
                        case "client":
                          if ("server" === t.env)
                            l = (e) =>
                              mp.events.callRemote("__rpc:process", n.h(e));
                          else if ("cef" === t.env) {
                            const e = t.b && s.__rpcBrowsers[t.b];
                            (r.browser = e),
                              (l = (r) => e && n.c(e) && i(e, r, !0));
                          }
                          break;
                        case "cef":
                          l = (e) => mp.trigger("__rpc:process", n.h(e));
                      }
                      if (l) {
                        const e = a(t.name, t.args, r);
                        t.noRet ||
                          e
                            .then((e) => l({ ...o, res: e }))
                            .catch((e) => l({ ...o, err: e || null }));
                      }
                    } else if (t.ret) {
                      const r = s.__rpcPending[t.id];
                      if ("server" === c && r.player !== e) return;
                      r &&
                        (r.resolve(
                          t.hasOwnProperty("err") ? n.e(t.err) : n.f(t.res)
                        ),
                        delete s.__rpcPending[t.id]);
                    }
                  }),
                  "cef" !== c)
                ) {
                  if (
                    (mp.events.add("__rpc:process", s["__rpc:process"]),
                    mp.events.add(
                      "__rpc:processPartial",
                      s["__rpc:processPartial"]
                    ),
                    "client" === c)
                  ) {
                    p("__rpc:callServer", ([e, r, t], n) =>
                      _(e, r, { fenv: n.environment, noRet: t })
                    ),
                      p("__rpc:callBrowsers", ([e, r, t], n) =>
                        w(null, e, r, { fenv: n.environment, noRet: t })
                      ),
                      (s.__rpcBrowsers = {});
                    const e = (e) => {
                      const r = n.i();
                      Object.keys(s.__rpcBrowsers).forEach((r) => {
                        const t = s.__rpcBrowsers[r];
                        (t && n.c(t) && t !== e) || delete s.__rpcBrowsers[r];
                      }),
                        (s.__rpcBrowsers[r] = e),
                        e.execute(
                          `\n                    window.name = '${r}';\n                    if(typeof window['__rpc:id'] === 'undefined'){\n                        window['__rpc:id'] = Promise.resolve(window.name);\n                    }else{\n                        window['__rpc:id:resolve'](window.name);\n                    }\n                `
                        );
                    };
                    mp.browsers.forEach(e),
                      mp.events.add("browserCreated", e),
                      (s.__rpcBrowserProcedures = {}),
                      mp.events.add("__rpc:browserRegister", (e) => {
                        const [r, t] = JSON.parse(e);
                        s.__rpcBrowserProcedures[t] = r;
                      }),
                      mp.events.add("__rpc:browserUnregister", (e) => {
                        const [r, t] = JSON.parse(e);
                        s.__rpcBrowserProcedures[t] === r &&
                          delete s.__rpcBrowserProcedures[t];
                      }),
                      p("__rpc:triggerEventBrowsers", ([e, r], t) => {
                        Object.keys(s.__rpcBrowsers).forEach((c) => {
                          const i = s.__rpcBrowsers[c];
                          i && n.c(i)
                            ? d(i, o, [e, r], { fenv: t.environment, noRet: 1 })
                            : delete s.__rpcBrowsers[c];
                        });
                      });
                  }
                } else
                  void 0 === s["__rpc:id"] &&
                    (s["__rpc:id"] = new Promise((e) => {
                      window.name
                        ? e(window.name)
                        : (s["__rpc:id:resolve"] = e);
                    }));
                p(o, ([e, r], t) => b(e, r, t));
              } catch (e) {
                0;
              }
            function i(e, r, t) {
              try {
                const c = n.h(r);
                e.execute(
                  `var process = window["__rpc:process"]; if(process){ process(${JSON.stringify(
                    c
                  )}); }else{ ${
                    t
                      ? ""
                      : `mp.trigger("__rpc:process", '{"ret":1,"id":"${r.id}","err":"PROCEDURE_NOT_FOUND","env":"cef"}');`
                  } }`
                );
              } catch (e) {
                0;
              }
            }
            function a(e, r, t) {
              try {
                const c = s.__rpcListeners[e];
                return c ? n.f(c(r, t)) : n.e(`PROCEDURE_NOT_FOUND (${e})`);
              } catch (e) {
                0;
              }
            }
            function l(e, r) {
              try {
                const t = {
                    client: (e, ...r) => mp.events.callRemote(e, ...r),
                    server: (e, ...t) => r.call(e, [...t]),
                  },
                  c = e.env,
                  o = n.h(e);
                if (o.length > 32e3) {
                  const r = n.a(o, 32e3);
                  r.forEach((n, o) => {
                    t[c]("__rpc:processPartial", e.id, o, r.length, n);
                  });
                } else t[c]("__rpc:process", o);
              } catch (e) {
                0;
              }
            }
            function p(e, r) {
              try {
                if (2 !== arguments.length)
                  throw 'register expects 2 arguments: "name" and "cb"';
                return (
                  "cef" === c &&
                    s["__rpc:id"].then((r) =>
                      mp.trigger(
                        "__rpc:browserRegister",
                        JSON.stringify([r, e])
                      )
                    ),
                  (s.__rpcListeners[e] = r),
                  () => u(e)
                );
              } catch (e) {
                0;
              }
            }
            function u(e) {
              try {
                if (1 !== arguments.length)
                  throw 'unregister expects 1 argument: "name"';
                "cef" === c &&
                  s["__rpc:id"].then((r) =>
                    mp.trigger(
                      "__rpc:browserUnregister",
                      JSON.stringify([r, e])
                    )
                  ),
                  (s.__rpcListeners[e] = void 0);
              } catch (e) {
                0;
              }
            }
            function f(e, r, t = {}) {
              try {
                return arguments.length < 1 || arguments.length > 3
                  ? n.e(
                      'call expects 1 to 3 arguments: "name", optional "args", and optional "options"'
                    )
                  : n.g(a(e, r, { environment: c }), t.timeout);
              } catch (e) {
                0;
              }
            }
            function _(e, r, t = {}) {
              try {
                switch (c) {
                  case "server":
                    return f(e, r);
                  case "client": {
                    const o = n.i();
                    return new Promise((n) => {
                      t.noRet || (s.__rpcPending[o] = { resolve: n });
                      l({ req: 1, id: o, name: e, env: c, args: r, ...t });
                    });
                  }
                  case "cef":
                    return m("__rpc:callServer", [e, r, +t.noRet]);
                }
              } catch (e) {
                0;
              }
            }
            function g(e, r, t = {}) {
              try {
                if (arguments.length < 1 || arguments.length > 3)
                  return n.e(
                    'callServer expects 1 to 3 arguments: "name", optional "args", and optional "options"'
                  );
                let c = {};
                return t.noRet && (c.noRet = 1), n.g(_(e, r, c), t.timeout);
              } catch (e) {
                0;
              }
            }
            function h(e, r, t, o = {}) {
              try {
                switch (c) {
                  case "client":
                    return f(r, t);
                  case "server": {
                    const i = n.i();
                    return new Promise((n) => {
                      o.noRet ||
                        (s.__rpcPending[i] = { resolve: n, player: e });
                      l({ req: 1, id: i, name: r, env: c, args: t, ...o }, e);
                    });
                  }
                  case "cef": {
                    const e = n.i();
                    return s["__rpc:id"].then(
                      (i) =>
                        new Promise((a) => {
                          o.noRet || (s.__rpcPending[e] = { resolve: a });
                          const l = {
                            b: i,
                            req: 1,
                            id: e,
                            name: r,
                            env: c,
                            args: t,
                            ...o,
                          };
                          mp.trigger("__rpc:process", n.h(l));
                        })
                    );
                  }
                }
              } catch (e) {
                0;
              }
            }
            function m(e, r, t, o = {}) {
              try {
                switch (c) {
                  case "client":
                    if (
                      ((o = t || {}),
                      (t = r),
                      (r = e),
                      (e = null),
                      arguments.length < 1 ||
                        arguments.length > 3 ||
                        "string" != typeof r)
                    )
                      return n.e(
                        'callClient from the client expects 1 to 3 arguments: "name", optional "args", and optional "options"'
                      );
                    break;
                  case "server":
                    if (
                      arguments.length < 2 ||
                      arguments.length > 4 ||
                      "object" != typeof e
                    )
                      return n.e(
                        'callClient from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options"'
                      );
                    break;
                  case "cef":
                    if (
                      ((o = t || {}),
                      (t = r),
                      (r = e),
                      (e = null),
                      arguments.length < 1 ||
                        arguments.length > 3 ||
                        "string" != typeof r)
                    )
                      return n.e(
                        'callClient from the browser expects 1 to 3 arguments: "name", optional "args", and optional "options"'
                      );
                }
                let s = {};
                return o.noRet && (s.noRet = 1), n.g(h(e, r, t, s), o.timeout);
              } catch (e) {
                0;
              }
            }
            function d(e, r, t, o = {}) {
              try {
                return new Promise((a) => {
                  const l = n.i();
                  o.noRet || (s.__rpcPending[l] = { resolve: a }),
                    i(e, { req: 1, id: l, name: r, env: c, args: t, ...o }, !1);
                });
              } catch (e) {
                0;
              }
            }
            function w(e, r, t, o = {}) {
              try {
                switch (c) {
                  case "client":
                    const c = s.__rpcBrowserProcedures[r];
                    if (!c) return n.e(`PROCEDURE_NOT_FOUND (${r})`);
                    const i = s.__rpcBrowsers[c];
                    return i && n.c(i)
                      ? d(i, r, t, o)
                      : n.e("PROCEDURE_NOT_FOUND");
                  case "server":
                    return h(e, "__rpc:callBrowsers", [r, t, +o.noRet], o);
                  case "cef":
                    return h(null, "__rpc:callBrowsers", [r, t, +o.noRet], o);
                }
              } catch (e) {
                0;
              }
            }
            function y(e, r, t, o = {}) {
              try {
                let s,
                  i = {};
                switch (c) {
                  case "client":
                  case "cef":
                    if (
                      ((o = t || {}),
                      (t = r),
                      (r = e),
                      arguments.length < 1 || arguments.length > 3)
                    )
                      return n.e(
                        'callBrowsers from the client or browser expects 1 to 3 arguments: "name", optional "args", and optional "options"'
                      );
                    o.noRet && (i.noRet = 1), (s = w(null, r, t, i));
                    break;
                  case "server":
                    if (arguments.length < 2 || arguments.length > 4)
                      return n.e(
                        'callBrowsers from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options"'
                      );
                    o.noRet && (i.noRet = 1), (s = w(e, r, t, i));
                }
                if (s) return n.g(s, o.timeout);
              } catch (e) {
                0;
              }
            }
            function v(e, r, t, o = {}) {
              try {
                if ("client" !== c)
                  return n.e(
                    "callBrowser can only be used in the client environment"
                  );
                if (arguments.length < 2 || arguments.length > 4)
                  return n.e(
                    'callBrowser expects 2 to 4 arguments: "browser", "name", optional "args", and optional "options"'
                  );
                let s = {};
                return o.noRet && (s.noRet = 1), n.g(d(e, r, t, s), o.timeout);
              } catch (e) {
                0;
              }
            }
            function b(e, r, t) {
              try {
                const n = s.__rpcEvListeners[e];
                n && n.forEach((e) => e(r, t));
              } catch (e) {
                0;
              }
            }
            function P(e, r) {
              try {
                if (2 !== arguments.length)
                  throw 'on expects 2 arguments: "name" and "cb"';
                const t = s.__rpcEvListeners[e] || new Set();
                return t.add(r), (s.__rpcEvListeners[e] = t), () => k(e, r);
              } catch (e) {
                0;
              }
            }
            function k(e, r) {
              try {
                if (2 !== arguments.length)
                  throw 'off expects 2 arguments: "name" and "cb"';
                const t = s.__rpcEvListeners[e];
                t && t.delete(r);
              } catch (e) {
                0;
              }
            }
            function B(e, r) {
              try {
                if (arguments.length < 1 || arguments.length > 2)
                  throw 'trigger expects 1 or 2 arguments: "name", and optional "args"';
                b(e, r, { environment: c });
              } catch (e) {
                0;
              }
            }
            function R(e, r, t) {
              try {
                switch (c) {
                  case "client":
                    if (
                      ((t = r),
                      (r = e),
                      (e = null),
                      arguments.length < 1 ||
                        arguments.length > 2 ||
                        "string" != typeof r)
                    )
                      throw 'triggerClient from the client expects 1 or 2 arguments: "name", and optional "args"';
                    break;
                  case "server":
                    if (
                      arguments.length < 2 ||
                      arguments.length > 3 ||
                      "object" != typeof e
                    )
                      throw 'triggerClient from the server expects 2 or 3 arguments: "player", "name", and optional "args"';
                    break;
                  case "cef":
                    if (
                      ((t = r),
                      (r = e),
                      (e = null),
                      arguments.length < 1 ||
                        arguments.length > 2 ||
                        "string" != typeof r)
                    )
                      throw 'triggerClient from the browser expects 1 or 2 arguments: "name", and optional "args"';
                }
                h(e, o, [r, t], { noRet: 1 });
              } catch (e) {
                0;
              }
            }
            function O(e, r) {
              try {
                if (arguments.length < 1 || arguments.length > 2)
                  throw 'triggerServer expects 1 or 2 arguments: "name", and optional "args"';
                _(o, [e, r], { noRet: 1 });
              } catch (e) {
                0;
              }
            }
            function x(e, r, t) {
              try {
                switch (c) {
                  case "client":
                  case "cef":
                    if (
                      ((t = r),
                      (r = e),
                      (e = null),
                      arguments.length < 1 || arguments.length > 2)
                    )
                      throw 'triggerBrowsers from the client or browser expects 1 or 2 arguments: "name", and optional "args"';
                    break;
                  case "server":
                    if (arguments.length < 2 || arguments.length > 3)
                      throw 'triggerBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args"';
                }
                h(e, "__rpc:triggerEventBrowsers", [r, t], { noRet: 1 });
              } catch (e) {
                0;
              }
            }
            function j(e, r, t) {
              try {
                if ("client" !== c)
                  throw "callBrowser can only be used in the client environment";
                if (arguments.length < 2 || arguments.length > 4)
                  throw 'callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args"';
                d(e, o, [r, t], { noRet: 1 });
              } catch (e) {
                0;
              }
            }
            r.default = {
              register: p,
              unregister: u,
              call: f,
              callServer: g,
              callClient: m,
              callBrowsers: y,
              callBrowser: v,
              on: P,
              off: k,
              trigger: B,
              triggerServer: O,
              triggerClient: R,
              triggerBrowsers: x,
              triggerBrowser: j,
            };
          }.call(this, t(2));
      },
      function (e, r) {
        var t;
        t = (function () {
          return this;
        })();
        try {
          t = t || new Function("return this")();
        } catch (e) {
          "object" == typeof window && (t = window);
        }
        e.exports = t;
      },
    ]);
  });
}
