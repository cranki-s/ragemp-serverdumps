! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) n.d(r, i, function(t) {
                return e[t]
            }.bind(null, i));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
    "use strict";
    var r, i = this && this.__extends || (r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        }, function(e, t) {
            function n() {
                this.constructor = e
            }
            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }),
        o = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(i, o) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(s, a)
                }
                c((r = r.apply(e, t || [])).next())
            }))
        },
        s = this && this.__generator || function(e, t) {
            var n, r, i, o, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function a(o) {
                return function(a) {
                    return function(o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; s;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return s.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        s.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && s.label < i[1]) {
                                        s.label = i[1], i = o;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2], s.ops.push(o);
                                        break
                                    }
                                    i[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, a])
                }
            }
        },
        a = this && this.__spreadArrays || function() {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var r = Array(e),
                i = 0;
            for (t = 0; t < n; t++)
                for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++) r[i] = o[s];
            return r
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = n(1),
        l = function(e) {
            function t(t) {
                var n = e.call(this, t.slot, t.animation, function(e) {
                    switch (e.toLowerCase()) {
                        case "items":
                            e = "smoking";
                            break;
                        case "gestures":
                            e = "expressions"
                    }
                    return "assets/img/categories/" + e.toLowerCase() + ".svg"
                }(t.category)) || this;
                return n.favoriteAnimation = t, n
            }
            return i(t, e), t
        }(function() {
            function e(e, t, n) {
                this.id = e, this.text = t, this.icon = n
            }
            return e.prototype.setPosition = function(e, t) {
                this.x = e, this.y = t
            }, e
        }()),
        u = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return i(t, e), t.prototype.wheelItemFactory = function(e) {
                return new l(e)
            }, t
        }(function() {
            function e(e) {
                this.containerRadius = e, this.radius = e - 48, this.items = new Array
            }
            return e.prototype.getPositionForItem = function(e, t) {
                var n = Math.max(5, t),
                    r = 2 * Math.PI / n;
                return r *= e, r -= Math.PI / 2, [this.radius + this.radius * Math.cos(r), this.radius + this.radius * Math.sin(r)]
            }, e.prototype.positionItems = function() {
                for (var e = 0; e < this.items.length; e++) {
                    var t = this.getPositionForItem(e, this.items.length),
                        n = t[0],
                        r = t[1];
                    this.items[e].setPosition(n, r)
                }
            }, e.prototype.insertItems = function(e, t) {
                var n, r = this;
                return void 0 === t && (t = 0), (n = this.items).splice.apply(n, a([t, 0], e.map((function(e) {
                    return r.wheelItemFactory(e)
                })))), this.positionItems(), this.items.slice(t, e.length)
            }, e.prototype.addItems = function(e) {
                return this.insertItems(e, this.items.length)
            }, e.prototype.addItem = function(e) {
                return this.addItems(new Array(e))[0]
            }, e.prototype.replaceItem = function(e, t) {
                var n = this.items.indexOf(e),
                    r = this.items[n],
                    i = this.wheelItemFactory(t);
                return i.setPosition(r.x, r.y), this.items.splice(n, 1, i), [r, i]
            }, e
        }());
    new(function() {
        function e(e) {
            this.animationDataProvider = e
        }
        return e.prototype.handleItemHover = function(e) {
            $("#current-wheelitem-name").css("visibility", "visible"), $("#current-wheelitem-name").text(e.text)
        }, e.prototype.handleItemClicked = function(e) {
            var t = e;
            this.animationDataProvider.playAnimation(t.favoriteAnimation.animation)
        }, e.prototype.handleItemEdit = function(e) {
            var t = this,
                n = e;
            $("#apply-edit-button").unbind("click"), $("#cancel-edit-button").unbind("click"), this.animationDataProvider.notifyEditorVisibility(!0), $("#item-editor").show(), $("#item-editor").css("display", "flex"), $("#edit-text").val(n.favoriteAnimation.animation), $("#editor-current-animation-label").text(n.favoriteAnimation.animation), $("#edit-text").focus(), $("#editor-current-animation-label").val(n.favoriteAnimation.animation), $("#apply-edit-button").unbind("click"), $("#cancel-edit-button").unbind("click"), $("#edit-text").unbind("keypress"), $("#apply-edit-button").click((function() {
                t.handleEditApply(n)
            })), $("#cancel-edit-button").click((function() {
                t.handleEditCancel()
            })), $("#edit-text").keypress((function(e) {
                13 == (e.keyCode || e.which) && t.handleEditApply(n)
            })), this.animationDataProvider.OnEscape.on((function() {
                t.handleEditCancel()
            }))
        }, e.prototype.handleStopAnimation = function() {
            this.animationDataProvider.stopAnimation()
        }, e.prototype.createWheelItemContainerFromTemplate = function(e) {
            var t = this,
                n = $('<div data-id="' + e.id + '">');
            return n.loadTemplate($("#wheelitem-template"), e), n.css("position", "absolute"), n.css("left", e.x + "px"), n.css("top", e.y + "px"), n.css("width", "96px"), n.css("height", "96px"), n.mouseenter((function() {
                t.handleItemHover(e)
            })), n.find(".wheelitem-circle-container").click((function() {
                t.handleItemClicked(e)
            })), n.find(".wheelitem-edit-button").click((function() {
                t.handleItemEdit(e)
            })), n
        }, e.prototype.replaceExistingWheelItem = function(e, t) {
            var n = $("#wheel-container");
            $('div[data-id="' + e.id + '"]').remove(), this.createWheelItemContainerFromTemplate(t).appendTo(n)
        }, e.prototype.createWheel = function(e) {
            var t = this,
                n = $("#wheel-container"),
                r = e.length / 2 * 112,
                i = Math.max(r, n.height());
            n.css({
                left: ($(window).width() - i) / 2,
                top: ($(window).height() - i) / 2,
                width: i,
                height: i
            }), $(".current-wheelitem").css("top", i / 2 + "px"), $(".current-wheelitem").show(), $("#stop-anim-btn").click((function() {
                t.handleStopAnimation()
            }));
            var o = new u(n.width() / 2);
            return o.addItems(e).forEach((function(e) {
                t.createWheelItemContainerFromTemplate(e).appendTo(n)
            })), o
        }, e.prototype.setupWheel = function() {
            return o(this, void 0, void 0, (function() {
                var e;
                return s(this, (function(t) {
                    switch (t.label) {
                        case 0:
                            return [4, this.animationDataProvider.getFavoriteAnimations()];
                        case 1:
                            return e = (e = t.sent()).sort((function(e) {
                                return e.slot
                            })), this.wheel = this.createWheel(e), [2]
                    }
                }))
            }))
        }, e.prototype.handleEditApply = function(e) {
            var t = this,
                n = $("#edit-text").val();
            $("#loading-spinner").css("visibility", "visible"), this.animationDataProvider.updateFavoriteAnimation(e.favoriteAnimation.slot, n).then((function(n) {
                var r = t.wheel.replaceItem(e, n);
                t.replaceExistingWheelItem(r[0], r[1]), $("#editor-error-message").css("visibility", "hidden"), $("#edit-text").val(""), $("#item-editor").hide(), $("#loading-spinner").css("visibility", "hidden"), t.animationDataProvider.notifyEditorVisibility(!1)
            })).catch((function(e) {
                console.log(e), $("#editor-error-message").css("visibility", "visible"), $("#loading-spinner").css("visibility", "hidden")
            }))
        }, e.prototype.handleEditCancel = function() {
            $("#editor-error-message").css("visibility", "hidden"), $("#edit-text").val(""), $("#item-editor").hide(), this.animationDataProvider.notifyEditorVisibility(!1)
        }, e
    }())(new c.RageRpcAnimationDataProvider).setupWheel()
}, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(i, o) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(s, a)
                }
                c((r = r.apply(e, t || [])).next())
            }))
        },
        i = this && this.__generator || function(e, t) {
            var n, r, i, o, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function a(o) {
                return function(a) {
                    return function(o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; s;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return s.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        s.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && s.label < i[1]) {
                                        s.label = i[1], i = o;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2], s.ops.push(o);
                                        break
                                    }
                                    i[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, a])
                }
            }
        },
        o = this && this.__importStar || function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        },
        s = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = o(n(2)),
        c = s(n(3)),
        l = s(n(4)),
        u = s(n(5)),
        p = function() {
            function e() {
                var e = this;
                this.onEscape = new l.default, a.register("UpdateFavoriteAnimation_Success", (function(t) {
                    e.handleUpdateSuccess(t)
                })), a.register("UpdateFavoriteAnimation_Failed", (function(t) {
                    e.handleUpdateFailed(t)
                })), a.register("EscapeClicked", (function() {
                    e.onEscape.trigger()
                }))
            }
            return e.prototype.getFavoriteAnimations = function() {
                return r(this, void 0, void 0, (function() {
                    return i(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return [4, a.callClient("Animwheel_GetFavoriteAnimations")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.updateFavoriteAnimation = function(e, t) {
                return this.updatePromise = new c.default((function() {
                    a.callClient("Animwheel_UpdateFavoriteAnimation", {
                        slotIndex: e,
                        animationActionName: t
                    })
                })), this.updatePromise.underlyingPromise
            }, e.prototype.playAnimation = function(e) {
                a.callClient("Animwheel_PlayAnimation", e)
            }, e.prototype.stopAnimation = function() {
                a.callClient("Animwheel_StopAnimation")
            }, e.prototype.notifyEditorVisibility = function(e) {
                a.callClient("Animwheel_EditorVisibilityChanged", e)
            }, Object.defineProperty(e.prototype, "OnEscape", {
                get: function() {
                    return this.onEscape.expose()
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.handleUpdateSuccess = function(e) {
                this.updatePromise && this.updatePromise.resolve(e)
            }, e.prototype.handleUpdateFailed = function(e) {
                this.updatePromise && this.updatePromise.reject(new u.default(e))
            }, e
        }();
    t.RageRpcAnimationDataProvider = p
}, function(e, t, n) {
    "undefined" != typeof self && self, e.exports = function(e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }
        return n.m = e, n.c = t, n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }, n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var i in e) n.d(r, i, function(t) {
                    return e[t]
                }.bind(null, i));
            return r
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 1)
    }([function(e, t, n) {
        "use strict";
        var r;

        function i(e, t) {
            const n = "client" === s();
            if (e && "object" == typeof e && void 0 !== e.id) {
                const i = (t, r, i) => n ? e.type === t && r.at(e.id) === e : e instanceof i;
                switch (t) {
                    case r.Blip:
                        return i("blip", mp.blips, mp.Blip);
                    case r.Checkpoint:
                        return i("checkpoint", mp.checkpoints, mp.Checkpoint);
                    case r.Colshape:
                        return i("colshape", mp.colshapes, mp.Colshape);
                    case r.Label:
                        return i("textlabel", mp.labels, mp.TextLabel);
                    case r.Marker:
                        return i("marker", mp.markers, mp.Marker);
                    case r.Object:
                        return i("object", mp.objects, mp.Object);
                    case r.Pickup:
                        return i("pickup", mp.pickups, mp.Pickup);
                    case r.Player:
                        return i("player", mp.players, mp.Player);
                    case r.Vehicle:
                        return i("vehicle", mp.vehicles, mp.Vehicle)
                }
            }
            return !1
        }

        function o() {
            const e = 46656 * Math.random() | 0,
                t = 46656 * Math.random() | 0;
            return ("000" + e.toString(36)).slice(-3) + ("000" + t.toString(36)).slice(-3)
        }

        function s() {
            return mp.joaat ? "server" : mp.game && mp.game.joaat ? "client" : mp.trigger ? "cef" : void 0
        }

        function a(e) {
            const t = s();
            return JSON.stringify(e, (e, n) => {
                if ("client" === t || "server" === t && n && "object" == typeof n) {
                    let e;
                    if (i(n, r.Blip) ? e = r.Blip : i(n, r.Checkpoint) ? e = r.Checkpoint : i(n, r.Colshape) ? e = r.Colshape : i(n, r.Marker) ? e = r.Marker : i(n, r.Object) ? e = r.Object : i(n, r.Pickup) ? e = r.Pickup : i(n, r.Player) ? e = r.Player : i(n, r.Vehicle) && (e = r.Vehicle), e) return {
                        __t: e,
                        i: "number" == typeof n.remoteId ? n.remoteId : n.id
                    }
                }
                return n
            })
        }

        function c(e) {
            const t = s();
            return JSON.parse(e, (e, n) => {
                if (("client" === t || "server" === t) && n && "object" == typeof n && "string" == typeof n.__t && "number" == typeof n.i && 2 === Object.keys(n).length) {
                    const e = n.i;
                    let i;
                    switch (n.__t) {
                        case r.Blip:
                            i = mp.blips;
                            break;
                        case r.Checkpoint:
                            i = mp.checkpoints;
                            break;
                        case r.Colshape:
                            i = mp.colshapes;
                            break;
                        case r.Label:
                            i = mp.labels;
                            break;
                        case r.Marker:
                            i = mp.markers;
                            break;
                        case r.Object:
                            i = mp.objects;
                            break;
                        case r.Pickup:
                            i = mp.pickups;
                            break;
                        case r.Player:
                            i = mp.players;
                            break;
                        case r.Vehicle:
                            i = mp.vehicles
                    }
                    if (i) return i["client" === t ? "atRemoteId" : "at"](e)
                }
                return n
            })
        }

        function l(e) {
            return new Promise(t => setTimeout(() => t(e), 0))
        }

        function u(e) {
            return new Promise((t, n) => setTimeout(() => n(e), 0))
        }

        function p(e, t) {
            return "number" == typeof t ? Promise.race([new Promise((e, n) => {
                setTimeout(() => n("TIMEOUT"), t)
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
        n.d(t, "h", (function() {
                return o
            })), n.d(t, "a", (function() {
                return s
            })), n.d(t, "g", (function() {
                return a
            })), n.d(t, "c", (function() {
                return c
            })), n.d(t, "e", (function() {
                return l
            })), n.d(t, "d", (function() {
                return u
            })), n.d(t, "f", (function() {
                return p
            })), n.d(t, "b", (function() {
                return f
            })),
            function(e) {
                e.Blip = "b", e.Checkpoint = "cp", e.Colshape = "c", e.Label = "l", e.Marker = "m", e.Object = "o", e.Pickup = "p", e.Player = "pl", e.Vehicle = "v"
            }(r || (r = {}))
    }, function(e, t, n) {
        "use strict";
        n.r(t),
            function(e) {
                n.d(t, "register", (function() {
                    return m
                })), n.d(t, "unregister", (function() {
                    return g
                })), n.d(t, "call", (function() {
                    return v
                })), n.d(t, "callServer", (function() {
                    return w
                })), n.d(t, "callClient", (function() {
                    return _
                })), n.d(t, "callBrowsers", (function() {
                    return k
                })), n.d(t, "callBrowser", (function() {
                    return O
                })), n.d(t, "on", (function() {
                    return $
                })), n.d(t, "off", (function() {
                    return C
                })), n.d(t, "trigger", (function() {
                    return E
                })), n.d(t, "triggerClient", (function() {
                    return A
                })), n.d(t, "triggerServer", (function() {
                    return B
                })), n.d(t, "triggerBrowsers", (function() {
                    return S
                })), n.d(t, "triggerBrowser", (function() {
                    return R
                }));
                var r = n(0);
                const i = r.a();
                if (!i) throw "Unknown RAGE environment";
                const o = "PROCEDURE_NOT_FOUND",
                    s = "__rpc:id",
                    a = "__rpc:process",
                    c = "__rpc:browserRegister",
                    l = "__rpc:browserUnregister",
                    u = "__rpc:triggerEvent",
                    p = "__rpc:triggerEventBrowsers",
                    f = "cef" === i ? window : e;
                if (!f[a]) {
                    if (f.__rpcListeners = {}, f.__rpcPending = {}, f.__rpcEvListeners = {}, f[a] = (e, t) => {
                            "server" !== i && (t = e);
                            const n = r.c(t);
                            if (n.req) {
                                const t = {
                                    id: n.id,
                                    environment: n.fenv || n.env
                                };
                                "server" === i && (t.player = e);
                                const o = {
                                    ret: 1,
                                    id: n.id,
                                    env: i
                                };
                                let s;
                                switch (i) {
                                    case "server":
                                        s = e => t.player.call(a, [r.g(e)]);
                                        break;
                                    case "client":
                                        if ("server" === n.env) s = e => mp.events.callRemote(a, r.g(e));
                                        else if ("cef" === n.env) {
                                            const e = n.b && f.__rpcBrowsers[n.b];
                                            t.browser = e, s = t => e && r.b(e) && d(e, t, !0)
                                        }
                                        break;
                                    case "cef":
                                        s = e => mp.trigger(a, r.g(e))
                                }
                                if (s) {
                                    const e = h(n.name, n.args, t);
                                    n.noRet || e.then(e => s({...o, res: e
                                    })).catch(e => s({...o, err: e
                                    }))
                                }
                            } else if (n.ret) {
                                const t = f.__rpcPending[n.id];
                                if ("server" === i && t.player !== e) return;
                                t && (t.resolve(n.err ? r.d(n.err) : r.e(n.res)), delete f.__rpcPending[n.id])
                            }
                        }, "cef" !== i) {
                        if (mp.events.add(a, f[a]), "client" === i) {
                            m("__rpc:callServer", ([e, t, n], r) => y(e, t, {
                                fenv: r.environment,
                                noRet: n
                            })), m("__rpc:callBrowsers", ([e, t, n], r) => x(null, e, t, {
                                fenv: r.environment,
                                noRet: n
                            })), f.__rpcBrowsers = {};
                            const e = e => {
                                const t = r.h();
                                Object.keys(f.__rpcBrowsers).forEach(t => {
                                    const n = f.__rpcBrowsers[t];
                                    n && r.b(n) && n !== e || delete f.__rpcBrowsers[t]
                                }), f.__rpcBrowsers[t] = e, e.execute(`\n                    window.name = '${t}';\n                    if(typeof window['${s}'] === 'undefined'){\n                        window['${s}'] = Promise.resolve(window.name);\n                    }else{\n                        window['${s}:resolve'](window.name);\n                    }\n                `)
                            };
                            mp.browsers.forEach(e), mp.events.add("browserCreated", e), f.__rpcBrowserProcedures = {}, mp.events.add(c, e => {
                                const [t, n] = JSON.parse(e);
                                f.__rpcBrowserProcedures[n] = t
                            }), mp.events.add(l, e => {
                                const [t, n] = JSON.parse(e);
                                f.__rpcBrowserProcedures[n] === t && delete f.__rpcBrowserProcedures[n]
                            }), m(p, ([e, t], n) => {
                                Object.values(f.__rpcBrowsers).forEach(r => {
                                    P(r, u, [e, t], {
                                        fenv: n.environment,
                                        noRet: 1
                                    })
                                })
                            })
                        }
                    } else void 0 === f[s] && (f[s] = new Promise(e => {
                        window.name ? e(window.name) : f[s + ":resolve"] = e
                    }));
                    m(u, ([e, t], n) => j(e, t, n))
                }

                function d(e, t, n) {
                    const i = r.g(t);
                    e.execute(`var process = window["${a}"]; if(process){ process(${JSON.stringify(i)}); }else{ ${n?"":`
                        mp.trigger("${a}", '{"ret":1,"id":"${t.id}","err":"${o}","env":"cef"}');
                        `} }`)
                }

                function h(e, t, n) {
                    const i = f.__rpcListeners[e];
                    return i ? r.e(i(t, n)) : r.d(o)
                }

                function m(e, t) {
                    if (2 !== arguments.length) throw 'register expects 2 arguments: "name" and "cb"';
                    return "cef" === i && f[s].then(t => mp.trigger(c, JSON.stringify([t, e]))), f.__rpcListeners[e] = t, () => g(e)
                }

                function g(e) {
                    if (1 !== arguments.length) throw 'unregister expects 1 argument: "name"';
                    "cef" === i && f[s].then(t => mp.trigger(l, JSON.stringify([t, e]))), f.__rpcListeners[e] = void 0
                }

                function v(e, t, n = {}) {
                    return arguments.length < 1 || arguments.length > 3 ? r.d('call expects 1 to 3 arguments: "name", optional "args", and optional "options"') : r.f(h(e, t, {
                        environment: i
                    }), n.timeout)
                }

                function y(e, t, n = {}) {
                    switch (i) {
                        case "server":
                            return v(e, t);
                        case "client":
                            {
                                const o = r.h();
                                return new Promise(s => {
                                    n.noRet || (f.__rpcPending[o] = {
                                        resolve: s
                                    });
                                    const c = {
                                        req: 1,
                                        id: o,
                                        name: e,
                                        env: i,
                                        args: t,
                                        ...n
                                    };
                                    mp.events.callRemote(a, r.g(c))
                                })
                            }
                        case "cef":
                            return _("__rpc:callServer", [e, t, +n.noRet])
                    }
                }

                function w(e, t, n = {}) {
                    if (arguments.length < 1 || arguments.length > 3) return r.d('callServer expects 1 to 3 arguments: "name", optional "args", and optional "options"');
                    let i = {};
                    return n.noRet && (i.noRet = 1), r.f(y(e, t, i), n.timeout)
                }

                function b(e, t, n, o = {}) {
                    switch (i) {
                        case "client":
                            return v(t, n);
                        case "server":
                            {
                                const s = r.h();
                                return new Promise(c => {
                                    o.noRet || (f.__rpcPending[s] = {
                                        resolve: c,
                                        player: e
                                    });
                                    const l = {
                                        req: 1,
                                        id: s,
                                        name: t,
                                        env: i,
                                        args: n,
                                        ...o
                                    };
                                    e.call(a, [r.g(l)])
                                })
                            }
                        case "cef":
                            {
                                const e = r.h();
                                return f[s].then(s => new Promise(c => {
                                    o.noRet || (f.__rpcPending[e] = {
                                        resolve: c
                                    });
                                    const l = {
                                        b: s,
                                        req: 1,
                                        id: e,
                                        name: t,
                                        env: i,
                                        args: n,
                                        ...o
                                    };
                                    mp.trigger(a, r.g(l))
                                }))
                            }
                    }
                }

                function _(e, t, n, o = {}) {
                    switch (i) {
                        case "client":
                            if (o = n || {}, n = t, t = e, e = null, arguments.length < 1 || arguments.length > 3 || "string" != typeof t) return r.d('callClient from the client expects 1 to 3 arguments: "name", optional "args", and optional "options"');
                            break;
                        case "server":
                            if (arguments.length < 2 || arguments.length > 4 || "object" != typeof e) return r.d('callClient from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options"');
                            break;
                        case "cef":
                            if (o = n || {}, n = t, t = e, e = null, arguments.length < 1 || arguments.length > 3 || "string" != typeof t) return r.d('callClient from the browser expects 1 to 3 arguments: "name", optional "args", and optional "options"')
                    }
                    let s = {};
                    return o.noRet && (s.noRet = 1), r.f(b(e, t, n, s), o.timeout)
                }

                function P(e, t, n, o = {}) {
                    return new Promise(s => {
                        const a = r.h();
                        o.noRet || (f.__rpcPending[a] = {
                            resolve: s
                        }), d(e, {
                            req: 1,
                            id: a,
                            name: t,
                            env: i,
                            args: n,
                            ...o
                        }, !1)
                    })
                }

                function x(e, t, n, s = {}) {
                    switch (i) {
                        case "client":
                            const i = f.__rpcBrowserProcedures[t];
                            if (!i) return r.d(o);
                            const a = f.__rpcBrowsers[i];
                            return a && r.b(a) ? P(a, t, n, s) : r.d(o);
                        case "server":
                            return b(e, "__rpc:callBrowsers", [t, n, +s.noRet], s);
                        case "cef":
                            return b(null, "__rpc:callBrowsers", [t, n, +s.noRet], s)
                    }
                }

                function k(e, t, n, o = {}) {
                    let s, a = {};
                    switch (i) {
                        case "client":
                        case "cef":
                            if (o = n || {}, n = t, t = e, arguments.length < 1 || arguments.length > 3) return r.d('callBrowsers from the client or browser expects 1 to 3 arguments: "name", optional "args", and optional "options"');
                            o.noRet && (a.noRet = 1), s = x(null, t, n, a);
                            break;
                        case "server":
                            if (arguments.length < 2 || arguments.length > 4) return r.d('callBrowsers from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options"');
                            o.noRet && (a.noRet = 1), s = x(e, t, n, a)
                    }
                    if (s) return r.f(s, o.timeout)
                }

                function O(e, t, n, o = {}) {
                    if ("client" !== i) return r.d("callBrowser can only be used in the client environment");
                    if (arguments.length < 2 || arguments.length > 4) return r.d('callBrowser expects 2 to 4 arguments: "browser", "name", optional "args", and optional "options"');
                    let s = {};
                    return o.noRet && (s.noRet = 1), r.f(P(e, t, n, s), o.timeout)
                }

                function j(e, t, n) {
                    const r = f.__rpcEvListeners[e];
                    r && r.forEach(e => e(t, n))
                }

                function $(e, t) {
                    if (2 !== arguments.length) throw 'on expects 2 arguments: "name" and "cb"';
                    const n = f.__rpcEvListeners[e] || new Set;
                    return n.add(t), f.__rpcEvListeners[e] = n, () => C(e, t)
                }

                function C(e, t) {
                    if (2 !== arguments.length) throw 'off expects 2 arguments: "name" and "cb"';
                    const n = f.__rpcEvListeners[e];
                    n && n.delete(t)
                }

                function E(e, t) {
                    if (arguments.length < 1 || arguments.length > 2) throw 'trigger expects 1 or 2 arguments: "name", and optional "args"';
                    j(e, t, {
                        environment: i
                    })
                }

                function A(e, t, n) {
                    switch (i) {
                        case "client":
                            if (n = t, t = e, e = null, arguments.length < 1 || arguments.length > 2 || "string" != typeof t) throw 'triggerClient from the client expects 1 or 2 arguments: "name", and optional "args"';
                            break;
                        case "server":
                            if (arguments.length < 2 || arguments.length > 3 || "object" != typeof e) throw 'triggerClient from the server expects 2 or 3 arguments: "player", "name", and optional "args"';
                            break;
                        case "cef":
                            if (n = t, t = e, e = null, arguments.length < 1 || arguments.length > 2 || "string" != typeof t) throw 'triggerClient from the browser expects 1 or 2 arguments: "name", and optional "args"'
                    }
                    b(e, u, [t, n], {
                        noRet: 1
                    })
                }

                function B(e, t) {
                    if (arguments.length < 1 || arguments.length > 2) throw 'triggerServer expects 1 or 2 arguments: "name", and optional "args"';
                    y(u, [e, t], {
                        noRet: 1
                    })
                }

                function S(e, t, n) {
                    switch (i) {
                        case "client":
                        case "cef":
                            if (n = t, t = e, e = null, arguments.length < 1 || arguments.length > 2) throw 'triggerBrowsers from the client or browser expects 1 or 2 arguments: "name", and optional "args"';
                            break;
                        case "server":
                            if (arguments.length < 2 || arguments.length > 3) throw 'triggerBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args"'
                    }
                    b(e, p, [t, n], {
                        noRet: 1
                    })
                }

                function R(e, t, n) {
                    if ("client" !== i) throw "callBrowser can only be used in the client environment";
                    if (arguments.length < 2 || arguments.length > 4) throw 'callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args"';
                    P(e, u, [t, n], {
                        noRet: 1
                    })
                }
                t.default = {
                    register: m,
                    unregister: g,
                    call: v,
                    callServer: w,
                    callClient: _,
                    callBrowsers: k,
                    callBrowser: O,
                    on: $,
                    off: C,
                    trigger: E,
                    triggerServer: B,
                    triggerClient: A,
                    triggerBrowsers: S,
                    triggerBrowser: R
                }
            }.call(this, n(2))
    }, function(e, t) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || new Function("return this")()
        } catch (e) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    }])
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(e) {
        var t = this;
        this.underlyingPromise = new Promise((function(n, r) {
            t.reject = r, t.resolve = n, e()
        }))
    };
    t.default = r
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e() {
            this.handlers = []
        }
        return e.prototype.on = function(e) {
            this.handlers.push(e)
        }, e.prototype.off = function(e) {
            this.handlers = this.handlers.filter((function(t) {
                return t !== e
            }))
        }, e.prototype.trigger = function(e) {
            this.handlers.slice(0).forEach((function(t) {
                return t(e)
            }))
        }, e.prototype.expose = function() {
            return this
        }, e
    }();
    t.default = r
}, function(e, t, n) {
    "use strict";
    var r, i = this && this.__extends || (r = function(e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    }, function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return i(t, e), t
    }(Error);
    t.default = o
}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvYW5pbXdoZWVsLXVpLnRzIiwid2VicGFjazovLy8uL2pzL2FuaW1hdGlvbi1kYXRhLXByb3ZpZGVycy9yYWdlLXJwYy1hbmltYXRpb24tZGF0YS1wcm92aWRlci50cyIsIndlYnBhY2s6Ly8vQzovUHJvamVjdHMvcmFnZW1wLWFuaW13aGVlbC9ub2RlX21vZHVsZXMvcmFnZS1ycGMvZGlzdC9yYWdlLXJwYy5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvdXRpbHMvZGVmZXJyZWQtcHJvbWlzZS50cyIsIndlYnBhY2s6Ly8vLi9qcy91dGlscy9saXRlLWV2ZW50LnRzIiwid2VicGFjazovLy8uL2pzL2V4Y2VwdGlvbnMvaW52YWxpZC1hbmltYXRpb24tbmFtZS5leGNlcHRpb24udHMiXSwibmFtZXMiOlsiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJpIiwibCIsIm1vZHVsZXMiLCJjYWxsIiwibSIsImMiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJ2YWx1ZSIsInQiLCJtb2RlIiwiX19lc01vZHVsZSIsIm5zIiwiY3JlYXRlIiwia2V5IiwiYmluZCIsIm4iLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJmYXZvcml0ZUFuaW1hdGlvbiIsInNsb3QiLCJhbmltYXRpb24iLCJjYXRlZ29yeSIsInRvTG93ZXJDYXNlIiwiZ2V0SWNvbkZvckNhdGVnb3J5IiwiaWQiLCJ0ZXh0IiwiaWNvbiIsInNldFBvc2l0aW9uIiwieCIsInkiLCJ0aGlzIiwid2hlZWxJdGVtRmFjdG9yeSIsIml0ZW0iLCJBbmltYXRpb25XaGVlbEl0ZW0iLCJjb250YWluZXJSYWRpdXMiLCJyYWRpdXMiLCJpdGVtcyIsIkFycmF5IiwiZ2V0UG9zaXRpb25Gb3JJdGVtIiwiaXRlbUluZGV4IiwidG90YWxJdGVtQ291bnQiLCJpdGVtQ291bnQiLCJNYXRoIiwibWF4Iiwicm90YXRpb24iLCJQSSIsImNvcyIsInNpbiIsInBvc2l0aW9uSXRlbXMiLCJsZW5ndGgiLCJpbnNlcnRJdGVtcyIsImRhdGFJdGVtcyIsImluZGV4Iiwic3BsaWNlIiwibWFwIiwiZGF0YUl0ZW0iLCJzbGljZSIsImFkZEl0ZW1zIiwiYWRkSXRlbSIsInJlcGxhY2VJdGVtIiwiZXhpc3RpbmdJdGVtIiwibmV3RGF0YUl0ZW0iLCJvbGRXaGVlbEl0ZW1JbmRleCIsImluZGV4T2YiLCJvbGRXaGVlbEl0ZW0iLCJuZXdXaGVlbEl0ZW0iLCJhbmltYXRpb25EYXRhUHJvdmlkZXIiLCJoYW5kbGVJdGVtSG92ZXIiLCIkIiwiY3NzIiwiaGFuZGxlSXRlbUNsaWNrZWQiLCJhbmltV2hlZWxJdGVtIiwicGxheUFuaW1hdGlvbiIsImhhbmRsZUl0ZW1FZGl0IiwidW5iaW5kIiwibm90aWZ5RWRpdG9yVmlzaWJpbGl0eSIsInNob3ciLCJ2YWwiLCJmb2N1cyIsImNsaWNrIiwiaGFuZGxlRWRpdEFwcGx5IiwiaGFuZGxlRWRpdENhbmNlbCIsImtleXByZXNzIiwiZSIsImtleUNvZGUiLCJ3aGljaCIsIk9uRXNjYXBlIiwib24iLCJoYW5kbGVTdG9wQW5pbWF0aW9uIiwic3RvcEFuaW1hdGlvbiIsImNyZWF0ZVdoZWVsSXRlbUNvbnRhaW5lckZyb21UZW1wbGF0ZSIsIndoZWVsSXRlbSIsIndoZWVsSXRlbVRlbXBsYXRlQ29udGFpbmVyIiwibG9hZFRlbXBsYXRlIiwiaXRlbURpYW1ldGVyIiwibW91c2VlbnRlciIsImZpbmQiLCJyZXBsYWNlRXhpc3RpbmdXaGVlbEl0ZW0iLCJleGlzdGluZ1doZWVsSXRlbSIsIndoZWVsQ29udGFpbmVyIiwicmVtb3ZlIiwiYXBwZW5kVG8iLCJjcmVhdGVXaGVlbCIsImlkZWFsQ29udGFpbmVyRGlhbWV0ZXIiLCJjb250YWluZXJEaWFtZXRlciIsImhlaWdodCIsImxlZnQiLCJ3aW5kb3ciLCJ3aWR0aCIsInRvcCIsIndoZWVsIiwiQW5pbWF0aW9uV2hlZWwiLCJmb3JFYWNoIiwic2V0dXBXaGVlbCIsImdldEZhdm9yaXRlQW5pbWF0aW9ucyIsImZhdm9yaXRlQW5pbWF0aW9ucyIsInNvcnQiLCJuZXdBbmltYXRpb25BY3Rpb25OYW1lIiwidXBkYXRlRmF2b3JpdGVBbmltYXRpb24iLCJ0aGVuIiwibmV3QW5pbWF0aW9uU2xvdCIsInJlcGxhY2VtZW50IiwiaGlkZSIsImNhdGNoIiwicmVhc29uIiwiY29uc29sZSIsImxvZyIsIlJhZ2VScGNBbmltYXRpb25EYXRhUHJvdmlkZXIiLCJvbkVzY2FwZSIsInJwYyIsInJlZ2lzdGVyIiwiaGFuZGxlVXBkYXRlU3VjY2VzcyIsImFuaW1hdGlvbkFjdGlvbk5hbWUiLCJoYW5kbGVVcGRhdGVGYWlsZWQiLCJ0cmlnZ2VyIiwiY2FsbENsaWVudCIsInNsb3RJbmRleCIsInVwZGF0ZVByb21pc2UiLCJ1bmRlcmx5aW5nUHJvbWlzZSIsImlzVmlzaWJsZSIsImV4cG9zZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZWxmIiwiZGVmYXVsdCIsInR5cGUiLCJhdCIsIkJsaXAiLCJtcCIsImJsaXBzIiwiQ2hlY2twb2ludCIsImNoZWNrcG9pbnRzIiwiQ29sc2hhcGUiLCJjb2xzaGFwZXMiLCJMYWJlbCIsImxhYmVscyIsIlRleHRMYWJlbCIsIk1hcmtlciIsIm1hcmtlcnMiLCJvYmplY3RzIiwiUGlja3VwIiwicGlja3VwcyIsIlBsYXllciIsInBsYXllcnMiLCJWZWhpY2xlIiwidmVoaWNsZXMiLCJyYW5kb20iLCJ0b1N0cmluZyIsImpvYWF0IiwiZ2FtZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJfX3QiLCJyZW1vdGVJZCIsImEiLCJwYXJzZSIsImtleXMiLCJQcm9taXNlIiwic2V0VGltZW91dCIsInUiLCJyYWNlIiwiZiIsInVybCIsImgiLCJ3IiwidiIsIkIiLCJqIiwiTyIsIkMiLCJTIiwiRSIsIkwiLCJNIiwiX19ycGNMaXN0ZW5lcnMiLCJfX3JwY1BlbmRpbmciLCJfX3JwY0V2TGlzdGVuZXJzIiwicmVxIiwiZW52aXJvbm1lbnQiLCJmZW52IiwiZW52IiwicGxheWVyIiwicmV0IiwiZyIsImV2ZW50cyIsImNhbGxSZW1vdGUiLCJiIiwiX19ycGNCcm93c2VycyIsImJyb3dzZXIiLCJhcmdzIiwibm9SZXQiLCJyZXMiLCJlcnIiLCJhZGQiLCJfIiwiUCIsImV4ZWN1dGUiLCJicm93c2VycyIsIl9fcnBjQnJvd3NlclByb2NlZHVyZXMiLCJ2YWx1ZXMiLCJrIiwiUiIsImFyZ3VtZW50cyIsInRpbWVvdXQiLCJTZXQiLCJkZWxldGUiLCJ1bnJlZ2lzdGVyIiwiY2FsbFNlcnZlciIsImNhbGxCcm93c2VycyIsImNhbGxCcm93c2VyIiwib2ZmIiwidHJpZ2dlclNlcnZlciIsInRyaWdnZXJDbGllbnQiLCJ0cmlnZ2VyQnJvd3NlcnMiLCJ0cmlnZ2VyQnJvd3NlciIsIkZ1bmN0aW9uIiwiZXhlY3V0b3IiLCJoYW5kbGVycyIsImhhbmRsZXIiLCJwdXNoIiwiZmlsdGVyIiwiZGF0YSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiYUFDRSxJQUFJQSxFQUFtQixHQUd2QixTQUFTQyxFQUFvQkMsR0FHNUIsR0FBR0YsRUFBaUJFLEdBQ25CLE9BQU9GLEVBQWlCRSxHQUFVQyxRQUduQyxJQUFJQyxFQUFTSixFQUFpQkUsR0FBWSxDQUN6Q0csRUFBR0gsRUFDSEksR0FBRyxFQUNISCxRQUFTLElBVVYsT0FOQUksRUFBUUwsR0FBVU0sS0FBS0osRUFBT0QsUUFBU0MsRUFBUUEsRUFBT0QsUUFBU0YsR0FHL0RHLEVBQU9FLEdBQUksRUFHSkYsRUFBT0QsUUFLZkYsRUFBb0JRLEVBQUlGLEVBR3hCTixFQUFvQlMsRUFBSVYsRUFHeEJDLEVBQW9CVSxFQUFJLFNBQVNSLEVBQVNTLEVBQU1DLEdBQzNDWixFQUFvQmEsRUFBRVgsRUFBU1Ms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QW9DLEdBaUJoRCxPQWZXLFlBQUF0SixHQUFQLFNBQVV1SixHQUNOaE4sS0FBSytNLFNBQVNFLEtBQUtELElBR2hCLFlBQUFSLElBQVAsU0FBV1EsR0FDUGhOLEtBQUsrTSxTQUFXL00sS0FBSytNLFNBQVNHLFFBQU8sU0FBQXpELEdBQUssT0FBQUEsSUFBTXVELE1BRzdDLFlBQUF4RyxRQUFQLFNBQWUyRyxHQUNYbk4sS0FBSytNLFNBQVNyTCxNQUFNLEdBQUd3RCxTQUFRLFNBQUF1RSxHQUFLLE9BQUFBLEVBQUUwRCxPQUduQyxZQUFBckcsT0FBUCxXQUNJLE9BQU85RyxNQUVmLEVBbEJBLEcsMmFDTEEsK0IsK0NBQ0EsT0FEdUQsT0FDdkQsRUFEQSxDQUF1RG9OLE8iLCJmaWxlIjoiYW5pbXdoZWVsLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCB7IFJhZ2VScGNBbmltYXRpb25EYXRhUHJvdmlkZXIgfSBmcm9tICcuL2FuaW1hdGlvbi1kYXRhLXByb3ZpZGVycy9yYWdlLXJwYy1hbmltYXRpb24tZGF0YS1wcm92aWRlcic7XHJcbmltcG9ydCB7IElBbmltYXRpb25EYXRhUHJvdmlkZXIgfSBmcm9tICcuL2FuaW1hdGlvbi1kYXRhLXByb3ZpZGVycy9hbmltYXRpb24tZGF0YS1wcm92aWRlcic7XHJcbmltcG9ydCBBbmltd2hlZWxTbG90IGZyb20gJy4vbW9kZWxzL2FuaW13aGVlbC1zbG90LnR5cGUnO1xyXG5cclxuXHJcbi8qIENvbnN0cyAqL1xyXG5jb25zdCBtaW5pbXVtV2hlZWxJdGVtcyA9IDU7XHJcbmNvbnN0IGl0ZW1EaWFtZXRlciA9IDk2O1xyXG5cclxuLyogQ2xhc3NlcyAqL1xyXG5hYnN0cmFjdCBjbGFzcyBXaGVlbEl0ZW0ge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBhbnksIHB1YmxpYyB0ZXh0OiBzdHJpbmcsIHB1YmxpYyBpY29uOiBzdHJpbmcpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQW5pbWF0aW9uV2hlZWxJdGVtIGV4dGVuZHMgV2hlZWxJdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmYXZvcml0ZUFuaW1hdGlvbjogQW5pbXdoZWVsU2xvdCkge1xyXG4gICAgICAgIHN1cGVyKGZhdm9yaXRlQW5pbWF0aW9uLnNsb3QsIGZhdm9yaXRlQW5pbWF0aW9uLmFuaW1hdGlvbiwgZ2V0SWNvbkZvckNhdGVnb3J5KGZhdm9yaXRlQW5pbWF0aW9uLmNhdGVnb3J5KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEEgYmFzZSBjbGFzcyBmb3IgdGhlIGxvZ2ljIG9mIHdoZWVscywgcmVzcG9uc2libGUgZm9yIGRlY2lkaW5nIGNvb3JkaW5hdGVzIGZvciBlYWNoIGl0ZW1cclxuYWJzdHJhY3QgY2xhc3MgV2hlZWwge1xyXG4gICAgcHJpdmF0ZSBpdGVtczogV2hlZWxJdGVtW107XHJcbiAgICBwcml2YXRlIHJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyUmFkaXVzOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBUaGUgcmFkaXVzIG9mIHRoZSB3aGVlbCBpcyBzbWFsbGVyIHRoYW4gaXRzIGNvbnRhaW5lciBiZWNhdXNlIHdlIG5lZWQgdG8gbGVhdmUgc29tZSBzcGFjZSBmb3IgdGhlIGl0ZW1zXHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSBjb250YWluZXJSYWRpdXMgLSAoaXRlbURpYW1ldGVyIC8gMik7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgQXJyYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgcG9zaXRpb24gb24gdGhlIHdoZWVsIGZvciBhIHNwZWNpZmljIGl0ZW1cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25Gb3JJdGVtKGl0ZW1JbmRleDogbnVtYmVyLCB0b3RhbEl0ZW1Db3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbUNvdW50ID0gTWF0aC5tYXgobWluaW11bVdoZWVsSXRlbXMsIHRvdGFsSXRlbUNvdW50KTtcclxuXHJcbiAgICAgICAgbGV0IHJvdGF0aW9uID0gKE1hdGguUEkgKiAyKSAvIGl0ZW1Db3VudDtcclxuICAgICAgICByb3RhdGlvbiAqPSBpdGVtSW5kZXg7XHJcbiAgICAgICAgcm90YXRpb24gLT0gKE1hdGguUEkgLyAyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLnJhZGl1cyArIHRoaXMucmFkaXVzICogTWF0aC5jb3Mocm90YXRpb24pLCB0aGlzLnJhZGl1cyArIHRoaXMucmFkaXVzICogTWF0aC5zaW4ocm90YXRpb24pXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQb3NpdGlvbiBvbiBhbGwgaXRlbXMgb24gdGhlIHdoZWVsIGJhc2VkIG9uIHRoZWlyIGluZGV4XHJcbiAgICBwcml2YXRlIHBvc2l0aW9uSXRlbXMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IHRoaXMuZ2V0UG9zaXRpb25Gb3JJdGVtKGksIHRoaXMuaXRlbXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRQb3NpdGlvbih4LCB5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3Qgd2hlZWxJdGVtRmFjdG9yeShpdGVtKTogV2hlZWxJdGVtO1xyXG5cclxuICAgIGluc2VydEl0ZW1zKGRhdGFJdGVtczogYW55W10sIGluZGV4ID0gMCk6IFdoZWVsSXRlbVtdIHtcclxuICAgICAgICAvLyBBZGQgdGhlIGl0ZW1zIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhcclxuICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShcclxuICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBXaGVlbEl0ZW0gaW5zdGFuY2VzIGZvciBlYWNoIGRhdGEgaXRlbSBhbmQgaW5zZXJ0IHRoZW1cclxuICAgICAgICAgICAgLi4uZGF0YUl0ZW1zLm1hcChkYXRhSXRlbSA9PiB0aGlzLndoZWVsSXRlbUZhY3RvcnkoZGF0YUl0ZW0pKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIFJlcG9zaXRpb24gYWxsIGl0ZW1zIG9uIHRoZSB3aGVlbFxyXG4gICAgICAgIHRoaXMucG9zaXRpb25JdGVtcygpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIFdoZWVsSXRlbSBpbnN0YW5jZXMgY3JlYXRlZCBlYXJsaWVyXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuc2xpY2UoaW5kZXgsIGRhdGFJdGVtcy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW1zKGRhdGFJdGVtczogYW55W10pOiBXaGVlbEl0ZW1bXSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkcyBkYXRhIGl0ZW1zIHRvIHRoZSBcImVuZFwiIG9mIHRoZSB3aGVlbCAobGFzdCBpbmRleClcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSB3aGVlbCBpdGVtcyB0aGF0IHdlcmUgY3JlYXRlZCBmb3IgdGhlIHByb3ZpZGVkIGRhdGEgaXRlbXNcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRJdGVtcyhkYXRhSXRlbXMsIHRoaXMuaXRlbXMubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJdGVtKGRhdGFJdGVtOiBhbnkpOiBXaGVlbEl0ZW0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEl0ZW1zKG5ldyBBcnJheShkYXRhSXRlbSkpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcGxhY2VJdGVtKGV4aXN0aW5nSXRlbTogV2hlZWxJdGVtLCBuZXdEYXRhSXRlbTogYW55KTogW1doZWVsSXRlbSwgV2hlZWxJdGVtXSB7XHJcbiAgICAgICAgY29uc3Qgb2xkV2hlZWxJdGVtSW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YoZXhpc3RpbmdJdGVtKTtcclxuICAgICAgICBjb25zdCBvbGRXaGVlbEl0ZW0gPSB0aGlzLml0ZW1zW29sZFdoZWVsSXRlbUluZGV4XTtcclxuICAgICAgICBjb25zdCBuZXdXaGVlbEl0ZW0gPSB0aGlzLndoZWVsSXRlbUZhY3RvcnkobmV3RGF0YUl0ZW0pO1xyXG4gICAgICAgIG5ld1doZWVsSXRlbS5zZXRQb3NpdGlvbihvbGRXaGVlbEl0ZW0ueCwgb2xkV2hlZWxJdGVtLnkpO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShvbGRXaGVlbEl0ZW1JbmRleCwgMSwgbmV3V2hlZWxJdGVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtvbGRXaGVlbEl0ZW0sIG5ld1doZWVsSXRlbV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFuaW1hdGlvbldoZWVsIGV4dGVuZHMgV2hlZWwge1xyXG4gICAgd2hlZWxJdGVtRmFjdG9yeShpdGVtOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEFuaW1hdGlvbldoZWVsSXRlbShpdGVtIGFzIEFuaW13aGVlbFNsb3QpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb250cm9sbGVyIHtcclxuICAgIHdoZWVsOiBXaGVlbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuaW1hdGlvbkRhdGFQcm92aWRlcjogSUFuaW1hdGlvbkRhdGFQcm92aWRlcikge1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdoZW4gYSB3aGVlbCBpdGVtIGlzIGhvdmVyZWQsIGl0cyBuYW1lIGFwcGVhcnMgYXQgdGhlIGNlbnRlciBvZiB0aGUgd2hlZWxcclxuICAgIHByaXZhdGUgaGFuZGxlSXRlbUhvdmVyKGl0ZW06IFdoZWVsSXRlbSkge1xyXG4gICAgICAgICQoJyNjdXJyZW50LXdoZWVsaXRlbS1uYW1lJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAkKCcjY3VycmVudC13aGVlbGl0ZW0tbmFtZScpLnRleHQoaXRlbS50ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUl0ZW1DbGlja2VkKGl0ZW06IFdoZWVsSXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGFuaW1XaGVlbEl0ZW0gPSBpdGVtIGFzIEFuaW1hdGlvbldoZWVsSXRlbTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGFQcm92aWRlci5wbGF5QW5pbWF0aW9uKGFuaW1XaGVlbEl0ZW0uZmF2b3JpdGVBbmltYXRpb24uYW5pbWF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUl0ZW1FZGl0KGl0ZW06IFdoZWVsSXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGFuaW1XaGVlbEl0ZW0gPSBpdGVtIGFzIEFuaW1hdGlvbldoZWVsSXRlbTtcclxuXHJcbiAgICAgICAgJCgnI2FwcGx5LWVkaXQtYnV0dG9uJykudW5iaW5kKCdjbGljaycpO1xyXG4gICAgICAgICQoJyNjYW5jZWwtZWRpdC1idXR0b24nKS51bmJpbmQoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IE1vdmUgdG8gZWRpdG9yIGNvbXBvbmVudFxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YVByb3ZpZGVyLm5vdGlmeUVkaXRvclZpc2liaWxpdHkodHJ1ZSk7XHJcbiAgICAgICAgJCgnI2l0ZW0tZWRpdG9yJykuc2hvdygpO1xyXG4gICAgICAgICQoJyNpdGVtLWVkaXRvcicpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbiAgICAgICAgJCgnI2VkaXQtdGV4dCcpLnZhbChhbmltV2hlZWxJdGVtLmZhdm9yaXRlQW5pbWF0aW9uLmFuaW1hdGlvbik7XHJcbiAgICAgICAgJCgnI2VkaXRvci1jdXJyZW50LWFuaW1hdGlvbi1sYWJlbCcpLnRleHQoYW5pbVdoZWVsSXRlbS5mYXZvcml0ZUFuaW1hdGlvbi5hbmltYXRpb24pO1xyXG4gICAgICAgICQoJyNlZGl0LXRleHQnKS5mb2N1cygpO1xyXG4gICAgICAgICQoJyNlZGl0b3ItY3VycmVudC1hbmltYXRpb24tbGFiZWwnKS52YWwoYW5pbVdoZWVsSXRlbS5mYXZvcml0ZUFuaW1hdGlvbi5hbmltYXRpb24pO1xyXG5cclxuICAgICAgICAkKCcjYXBwbHktZWRpdC1idXR0b24nKS51bmJpbmQoJ2NsaWNrJyk7XHJcbiAgICAgICAgJCgnI2NhbmNlbC1lZGl0LWJ1dHRvbicpLnVuYmluZCgnY2xpY2snKTtcclxuICAgICAgICAkKCcjZWRpdC10ZXh0JykudW5iaW5kKCdrZXlwcmVzcycpO1xyXG5cclxuICAgICAgICAkKCcjYXBwbHktZWRpdC1idXR0b24nKS5jbGljaygoKSA9PiB7IHRoaXMuaGFuZGxlRWRpdEFwcGx5KGFuaW1XaGVlbEl0ZW0pOyB9KTtcclxuICAgICAgICAkKCcjY2FuY2VsLWVkaXQtYnV0dG9uJykuY2xpY2soKCkgPT4geyB0aGlzLmhhbmRsZUVkaXRDYW5jZWwoKTsgfSk7XHJcblxyXG4gICAgICAgIC8vIEFsbG93IGhpdHRpbmcgZW50ZXIgaW4gdGhlIHRleHRib3ggdG8gYXBwbHlcclxuICAgICAgICAkKCcjZWRpdC10ZXh0Jykua2V5cHJlc3MoZSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDEzKSB7IC8vIE9uIEVOVEVSXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVkaXRBcHBseShhbmltV2hlZWxJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGFQcm92aWRlci5PbkVzY2FwZS5vbigoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVkaXRDYW5jZWwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVN0b3BBbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhUHJvdmlkZXIuc3RvcEFuaW1hdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlV2hlZWxJdGVtQ29udGFpbmVyRnJvbVRlbXBsYXRlKHdoZWVsSXRlbTogV2hlZWxJdGVtKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgY29uc3Qgd2hlZWxJdGVtVGVtcGxhdGVDb250YWluZXIgPSAkKGA8ZGl2IGRhdGEtaWQ9XCIke3doZWVsSXRlbS5pZH1cIj5gKTtcclxuXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAgbG9hZFRlbXBsYXRlIGlzbid0IHJlY29nbml6ZWQsIGJ1dCBpdCdsbCBiZSBpbXBvcnRlZCBieSB0aGUgSFRNTCBmaWxlXHJcbiAgICAgICAgd2hlZWxJdGVtVGVtcGxhdGVDb250YWluZXIubG9hZFRlbXBsYXRlKCQoJyN3aGVlbGl0ZW0tdGVtcGxhdGUnKSwgd2hlZWxJdGVtKTtcclxuXHJcbiAgICAgICAgLy8gUG9zaXRpb24gdGhlIGl0ZW0gb24gdGhlIHdoZWVsXHJcbiAgICAgICAgd2hlZWxJdGVtVGVtcGxhdGVDb250YWluZXIuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xyXG4gICAgICAgIHdoZWVsSXRlbVRlbXBsYXRlQ29udGFpbmVyLmNzcygnbGVmdCcsIGAke3doZWVsSXRlbS54fXB4YCk7XHJcbiAgICAgICAgd2hlZWxJdGVtVGVtcGxhdGVDb250YWluZXIuY3NzKCd0b3AnLCBgJHt3aGVlbEl0ZW0ueX1weGApO1xyXG4gICAgICAgIHdoZWVsSXRlbVRlbXBsYXRlQ29udGFpbmVyLmNzcygnd2lkdGgnLCBgJHtpdGVtRGlhbWV0ZXJ9cHhgKTtcclxuICAgICAgICB3aGVlbEl0ZW1UZW1wbGF0ZUNvbnRhaW5lci5jc3MoJ2hlaWdodCcsIGAke2l0ZW1EaWFtZXRlcn1weGApO1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlciBldmVudHMgZm9yIGludGVyYWN0aW9uIHdpdGggdGhlIGl0ZW1cclxuICAgICAgICB3aGVlbEl0ZW1UZW1wbGF0ZUNvbnRhaW5lci5tb3VzZWVudGVyKCgpID0+IHsgdGhpcy5oYW5kbGVJdGVtSG92ZXIod2hlZWxJdGVtKSB9KTtcclxuICAgICAgICB3aGVlbEl0ZW1UZW1wbGF0ZUNvbnRhaW5lci5maW5kKCcud2hlZWxpdGVtLWNpcmNsZS1jb250YWluZXInKS5jbGljaygoKSA9PiB7IHRoaXMuaGFuZGxlSXRlbUNsaWNrZWQod2hlZWxJdGVtKSB9KTtcclxuICAgICAgICB3aGVlbEl0ZW1UZW1wbGF0ZUNvbnRhaW5lci5maW5kKCcud2hlZWxpdGVtLWVkaXQtYnV0dG9uJykuY2xpY2soKCkgPT4geyB0aGlzLmhhbmRsZUl0ZW1FZGl0KHdoZWVsSXRlbSkgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB3aGVlbEl0ZW1UZW1wbGF0ZUNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlcGxhY2VFeGlzdGluZ1doZWVsSXRlbShleGlzdGluZ1doZWVsSXRlbTogV2hlZWxJdGVtLCBuZXdXaGVlbEl0ZW06IFdoZWVsSXRlbSkge1xyXG4gICAgICAgIGNvbnN0IHdoZWVsQ29udGFpbmVyID0gJCgnI3doZWVsLWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZXhpc3RpbmcgaXRlbVxyXG4gICAgICAgICQoYGRpdltkYXRhLWlkPVwiJHtleGlzdGluZ1doZWVsSXRlbS5pZH1cIl1gKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBuZXcgb25lIGluIGl0cyBwbGFjZVxyXG4gICAgICAgIGNvbnN0IG5ld0NvbnRhaW5lciA9IHRoaXMuY3JlYXRlV2hlZWxJdGVtQ29udGFpbmVyRnJvbVRlbXBsYXRlKG5ld1doZWVsSXRlbSk7XHJcbiAgICAgICAgbmV3Q29udGFpbmVyLmFwcGVuZFRvKHdoZWVsQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVdoZWVsKGl0ZW1zOiBhbnlbXSk6IFdoZWVsIHtcclxuICAgICAgICBjb25zdCB3aGVlbENvbnRhaW5lciA9ICQoJyN3aGVlbC1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250YWluZXIncyBkaWFtZXRlclxyXG4gICAgICAgIGNvbnN0IGlkZWFsQ29udGFpbmVyRGlhbWV0ZXIgPSAoaXRlbXMubGVuZ3RoIC8gMikgKiAoaXRlbURpYW1ldGVyICsgMTYpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpYW1ldGVyID0gTWF0aC5tYXgoaWRlYWxDb250YWluZXJEaWFtZXRlciwgd2hlZWxDb250YWluZXIuaGVpZ2h0KCkpXHJcblxyXG4gICAgICAgIC8vIFBsYWNlIHRoZSB3aGVlbCBpbiB0aGUgY2VudGVyIG9mIHRoZSB3aW5kb3dcclxuICAgICAgICB3aGVlbENvbnRhaW5lci5jc3Moe1xyXG4gICAgICAgICAgICBsZWZ0OiAoJCh3aW5kb3cpLndpZHRoKCkgLSBjb250YWluZXJEaWFtZXRlcikgLyAyLFxyXG4gICAgICAgICAgICB0b3A6ICgkKHdpbmRvdykuaGVpZ2h0KCkgLSBjb250YWluZXJEaWFtZXRlcikgLyAyLFxyXG4gICAgICAgICAgICB3aWR0aDogY29udGFpbmVyRGlhbWV0ZXIsXHJcbiAgICAgICAgICAgIGhlaWdodDogY29udGFpbmVyRGlhbWV0ZXJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVmVydGljYWxseSBjZW50ZXIgdGhlIHRleHQgbGFiZWwgdGhhdCBkaXNwbGF5cyB0aGUgY3VycmVudCBpdGVtJ3MgdGV4dFxyXG4gICAgICAgICQoJy5jdXJyZW50LXdoZWVsaXRlbScpLmNzcygndG9wJywgYCR7Y29udGFpbmVyRGlhbWV0ZXIgLyAyfXB4YCk7XHJcbiAgICAgICAgJCgnLmN1cnJlbnQtd2hlZWxpdGVtJykuc2hvdygpO1xyXG4gICAgICAgICQoJyNzdG9wLWFuaW0tYnRuJykuY2xpY2soKCkgPT4geyB0aGlzLmhhbmRsZVN0b3BBbmltYXRpb24oKTsgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHdoZWVsID0gbmV3IEFuaW1hdGlvbldoZWVsKHdoZWVsQ29udGFpbmVyLndpZHRoKCkgLyAyKTtcclxuICAgICAgICB3aGVlbC5hZGRJdGVtcyhpdGVtcykuZm9yRWFjaCh3aGVlbEl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBESVYgZWxlbWVudCB0byBwcmVzZW50IHRoZSB3aGVlbCBpdGVtXHJcbiAgICAgICAgICAgIGNvbnN0IHdoZWVsSXRlbUNvbnRhaW5lciA9IHRoaXMuY3JlYXRlV2hlZWxJdGVtQ29udGFpbmVyRnJvbVRlbXBsYXRlKHdoZWVsSXRlbSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIGl0ZW0gdG8gdGhlIHBhZ2VcclxuICAgICAgICAgICAgd2hlZWxJdGVtQ29udGFpbmVyLmFwcGVuZFRvKHdoZWVsQ29udGFpbmVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHdoZWVsO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNldHVwV2hlZWwoKSB7XHJcbiAgICAgICAgLy8gQXNrIHRoZSBjbGllbnQgZm9yIHRoZSBmYXZvcml0ZSBhbmltYXRpb25zIGxpc3RcclxuICAgICAgICBsZXQgZmF2b3JpdGVBbmltYXRpb25zID0gYXdhaXQgdGhpcy5hbmltYXRpb25EYXRhUHJvdmlkZXIuZ2V0RmF2b3JpdGVBbmltYXRpb25zKCk7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgdGhlbSBieSB0aGUgc2xvdCBpbmRleFxyXG4gICAgICAgIGZhdm9yaXRlQW5pbWF0aW9ucyA9IGZhdm9yaXRlQW5pbWF0aW9ucy5zb3J0KGZhdm9yaXRlQW5pbWF0aW9uID0+IGZhdm9yaXRlQW5pbWF0aW9uLnNsb3QpO1xyXG5cclxuICAgICAgICB0aGlzLndoZWVsID0gdGhpcy5jcmVhdGVXaGVlbChmYXZvcml0ZUFuaW1hdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRWRpdEFwcGx5KGFuaW1XaGVlbEl0ZW06IEFuaW1hdGlvbldoZWVsSXRlbSkge1xyXG4gICAgICAgIGNvbnN0IG5ld0FuaW1hdGlvbkFjdGlvbk5hbWUgPSAkKCcjZWRpdC10ZXh0JykudmFsKCkgYXMgc3RyaW5nO1xyXG4gICAgICAgICQoJyNsb2FkaW5nLXNwaW5uZXInKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGFQcm92aWRlci51cGRhdGVGYXZvcml0ZUFuaW1hdGlvbihcclxuICAgICAgICAgICAgYW5pbVdoZWVsSXRlbS5mYXZvcml0ZUFuaW1hdGlvbi5zbG90LFxyXG4gICAgICAgICAgICBuZXdBbmltYXRpb25BY3Rpb25OYW1lXHJcbiAgICAgICAgKS50aGVuKG5ld0FuaW1hdGlvblNsb3QgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSB0aGlzLndoZWVsLnJlcGxhY2VJdGVtKGFuaW1XaGVlbEl0ZW0sIG5ld0FuaW1hdGlvblNsb3QpO1xyXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VFeGlzdGluZ1doZWVsSXRlbShyZXBsYWNlbWVudFswXSwgcmVwbGFjZW1lbnRbMV0pO1xyXG5cclxuICAgICAgICAgICAgJCgnI2VkaXRvci1lcnJvci1tZXNzYWdlJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcjZWRpdC10ZXh0JykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCcjaXRlbS1lZGl0b3InKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJyNsb2FkaW5nLXNwaW5uZXInKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YVByb3ZpZGVyLm5vdGlmeUVkaXRvclZpc2liaWxpdHkoZmFsc2UpO1xyXG4gICAgICAgIH0pLmNhdGNoKHJlYXNvbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbik7XHJcbiAgICAgICAgICAgICQoJyNlZGl0b3ItZXJyb3ItbWVzc2FnZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQoJyNsb2FkaW5nLXNwaW5uZXInKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFZGl0Q2FuY2VsKCkge1xyXG4gICAgICAgICQoJyNlZGl0b3ItZXJyb3ItbWVzc2FnZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCgnI2VkaXQtdGV4dCcpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgJCgnI2l0ZW0tZWRpdG9yJykuaGlkZSgpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YVByb3ZpZGVyLm5vdGlmeUVkaXRvclZpc2liaWxpdHkoZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIobmV3IFJhZ2VScGNBbmltYXRpb25EYXRhUHJvdmlkZXIoKSk7XHJcbmNvbnRyb2xsZXIuc2V0dXBXaGVlbCgpO1xyXG5cclxuZnVuY3Rpb24gZ2V0SWNvbkZvckNhdGVnb3J5KGNhdGVnb3J5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy8gQ29udmVydCBzb21lIGNhdGVnb3J5IG5hbWVzIHRvIG90aGVyc1xyXG4gICAgc3dpdGNoIChjYXRlZ29yeS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgLy8gaXRlbXMgY2F0ZWdvcnkgb25seSBmZWF0dXJlcyBzbW9raW5nXHJcbiAgICAgICAgY2FzZSBcIml0ZW1zXCI6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBcInNtb2tpbmdcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdlc3R1cmVzIGNhdGVnb3J5IGlzIGJhc2ljYWxseSB0aGUgc2FtZSBhcyBleHByZXNzaW9uc1xyXG4gICAgICAgIGNhc2UgXCJnZXN0dXJlc1wiOiB7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gXCJleHByZXNzaW9uc1wiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGBhc3NldHMvaW1nL2NhdGVnb3JpZXMvJHtjYXRlZ29yeS50b0xvd2VyQ2FzZSgpfS5zdmdgO1xyXG59XHJcbiIsImltcG9ydCBBbmltd2hlZWxTbG90IGZyb20gJy4uL21vZGVscy9hbmltd2hlZWwtc2xvdC50eXBlJztcclxuaW1wb3J0IHsgSUFuaW1hdGlvbkRhdGFQcm92aWRlciB9IGZyb20gJy4vYW5pbWF0aW9uLWRhdGEtcHJvdmlkZXInO1xyXG5pbXBvcnQgKiBhcyBycGMgZnJvbSBcInJhZ2UtcnBjXCI7XHJcbmltcG9ydCBEZWZlcnJlZFByb21pc2UgZnJvbSAnLi4vdXRpbHMvZGVmZXJyZWQtcHJvbWlzZSc7XHJcbmltcG9ydCBMaXRlRXZlbnQgZnJvbSAnLi4vdXRpbHMvbGl0ZS1ldmVudCc7XHJcbmltcG9ydCBJbnZhbGlkQW5pbWF0aW9uTmFtZUVycm9yIGZyb20gJy4uL2V4Y2VwdGlvbnMvaW52YWxpZC1hbmltYXRpb24tbmFtZS5leGNlcHRpb24nO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBSYWdlUnBjQW5pbWF0aW9uRGF0YVByb3ZpZGVyIGltcGxlbWVudHMgSUFuaW1hdGlvbkRhdGFQcm92aWRlciB7XHJcbiAgICB1cGRhdGVQcm9taXNlOiBEZWZlcnJlZFByb21pc2U8QW5pbXdoZWVsU2xvdD47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uRXNjYXBlID0gbmV3IExpdGVFdmVudDx2b2lkPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHJwYy5yZWdpc3RlcignVXBkYXRlRmF2b3JpdGVBbmltYXRpb25fU3VjY2VzcycsIHNsb3QgPT4geyB0aGlzLmhhbmRsZVVwZGF0ZVN1Y2Nlc3Moc2xvdCkgfSk7XHJcbiAgICAgICAgcnBjLnJlZ2lzdGVyKCdVcGRhdGVGYXZvcml0ZUFuaW1hdGlvbl9GYWlsZWQnLCBhbmltYXRpb25BY3Rpb25OYW1lID0+IHsgdGhpcy5oYW5kbGVVcGRhdGVGYWlsZWQoYW5pbWF0aW9uQWN0aW9uTmFtZSk7IH0pO1xyXG4gICAgICAgIHJwYy5yZWdpc3RlcignRXNjYXBlQ2xpY2tlZCcsICgpID0+IHsgdGhpcy5vbkVzY2FwZS50cmlnZ2VyKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldEZhdm9yaXRlQW5pbWF0aW9ucygpOiBQcm9taXNlPEFuaW13aGVlbFNsb3RbXT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBycGMuY2FsbENsaWVudDxBbmltd2hlZWxTbG90W10+KCdBbmltd2hlZWxfR2V0RmF2b3JpdGVBbmltYXRpb25zJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRmF2b3JpdGVBbmltYXRpb24oc2xvdEluZGV4OiBudW1iZXIsIGFuaW1hdGlvbkFjdGlvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8QW5pbXdoZWVsU2xvdD4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvbWlzZSA9IG5ldyBEZWZlcnJlZFByb21pc2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBycGMuY2FsbENsaWVudCgnQW5pbXdoZWVsX1VwZGF0ZUZhdm9yaXRlQW5pbWF0aW9uJywgeyBzbG90SW5kZXgsIGFuaW1hdGlvbkFjdGlvbk5hbWUgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVByb21pc2UudW5kZXJseWluZ1Byb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFuaW1hdGlvbihhbmltYXRpb25BY3Rpb25OYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBycGMuY2FsbENsaWVudCgnQW5pbXdoZWVsX1BsYXlBbmltYXRpb24nLCBhbmltYXRpb25BY3Rpb25OYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIHJwYy5jYWxsQ2xpZW50KCdBbmltd2hlZWxfU3RvcEFuaW1hdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vdGlmeUVkaXRvclZpc2liaWxpdHkoaXNWaXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgcnBjLmNhbGxDbGllbnQoJ0FuaW13aGVlbF9FZGl0b3JWaXNpYmlsaXR5Q2hhbmdlZCcsIGlzVmlzaWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBPbkVzY2FwZSgpIHsgcmV0dXJuIHRoaXMub25Fc2NhcGUuZXhwb3NlKCk7IH0gXHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVVcGRhdGVTdWNjZXNzKHNsb3Q6IEFuaW13aGVlbFNsb3QpIHtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGVQcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvbWlzZS5yZXNvbHZlKHNsb3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVVwZGF0ZUZhaWxlZChhbmltYXRpb25BY3Rpb25OYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlUHJvbWlzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb21pc2UucmVqZWN0KG5ldyBJbnZhbGlkQW5pbWF0aW9uTmFtZUVycm9yKGFuaW1hdGlvbkFjdGlvbk5hbWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiIWZ1bmN0aW9uKGUscil7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9cigpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10scik6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cz1yKCk6ZS5ycGM9cigpfShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsKGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciByPXt9O2Z1bmN0aW9uIG4odCl7aWYoclt0XSlyZXR1cm4gclt0XS5leHBvcnRzO3ZhciBvPXJbdF09e2k6dCxsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3RdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLG4pLG8ubD0hMCxvLmV4cG9ydHN9cmV0dXJuIG4ubT1lLG4uYz1yLG4uZD1mdW5jdGlvbihlLHIsdCl7bi5vKGUscil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHIse2VudW1lcmFibGU6ITAsZ2V0OnR9KX0sbi5yPWZ1bmN0aW9uKGUpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZTpcIk1vZHVsZVwifSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9LG4udD1mdW5jdGlvbihlLHIpe2lmKDEmciYmKGU9bihlKSksOCZyKXJldHVybiBlO2lmKDQmciYmXCJvYmplY3RcIj09dHlwZW9mIGUmJmUmJmUuX19lc01vZHVsZSlyZXR1cm4gZTt2YXIgdD1PYmplY3QuY3JlYXRlKG51bGwpO2lmKG4ucih0KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcImRlZmF1bHRcIix7ZW51bWVyYWJsZTohMCx2YWx1ZTplfSksMiZyJiZcInN0cmluZ1wiIT10eXBlb2YgZSlmb3IodmFyIG8gaW4gZSluLmQodCxvLGZ1bmN0aW9uKHIpe3JldHVybiBlW3JdfS5iaW5kKG51bGwsbykpO3JldHVybiB0fSxuLm49ZnVuY3Rpb24oZSl7dmFyIHI9ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIG4uZChyLFwiYVwiLHIpLHJ9LG4ubz1mdW5jdGlvbihlLHIpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxyKX0sbi5wPVwiXCIsbihuLnM9MSl9KFtmdW5jdGlvbihlLHIsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ7ZnVuY3Rpb24gbyhlLHIpe2NvbnN0IG49XCJjbGllbnRcIj09PXMoKTtpZihlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmdm9pZCAwIT09ZS5pZCl7Y29uc3Qgbz0ocix0LG8pPT5uP2UudHlwZT09PXImJnQuYXQoZS5pZCk9PT1lOmUgaW5zdGFuY2VvZiBvO3N3aXRjaChyKXtjYXNlIHQuQmxpcDpyZXR1cm4gbyhcImJsaXBcIixtcC5ibGlwcyxtcC5CbGlwKTtjYXNlIHQuQ2hlY2twb2ludDpyZXR1cm4gbyhcImNoZWNrcG9pbnRcIixtcC5jaGVja3BvaW50cyxtcC5DaGVja3BvaW50KTtjYXNlIHQuQ29sc2hhcGU6cmV0dXJuIG8oXCJjb2xzaGFwZVwiLG1wLmNvbHNoYXBlcyxtcC5Db2xzaGFwZSk7Y2FzZSB0LkxhYmVsOnJldHVybiBvKFwidGV4dGxhYmVsXCIsbXAubGFiZWxzLG1wLlRleHRMYWJlbCk7Y2FzZSB0Lk1hcmtlcjpyZXR1cm4gbyhcIm1hcmtlclwiLG1wLm1hcmtlcnMsbXAuTWFya2VyKTtjYXNlIHQuT2JqZWN0OnJldHVybiBvKFwib2JqZWN0XCIsbXAub2JqZWN0cyxtcC5PYmplY3QpO2Nhc2UgdC5QaWNrdXA6cmV0dXJuIG8oXCJwaWNrdXBcIixtcC5waWNrdXBzLG1wLlBpY2t1cCk7Y2FzZSB0LlBsYXllcjpyZXR1cm4gbyhcInBsYXllclwiLG1wLnBsYXllcnMsbXAuUGxheWVyKTtjYXNlIHQuVmVoaWNsZTpyZXR1cm4gbyhcInZlaGljbGVcIixtcC52ZWhpY2xlcyxtcC5WZWhpY2xlKX19cmV0dXJuITF9ZnVuY3Rpb24gYygpe2NvbnN0IGU9NDY2NTYqTWF0aC5yYW5kb20oKXwwLHI9NDY2NTYqTWF0aC5yYW5kb20oKXwwO3JldHVybihcIjAwMFwiK2UudG9TdHJpbmcoMzYpKS5zbGljZSgtMykrKFwiMDAwXCIrci50b1N0cmluZygzNikpLnNsaWNlKC0zKX1mdW5jdGlvbiBzKCl7cmV0dXJuIG1wLmpvYWF0P1wic2VydmVyXCI6bXAuZ2FtZSYmbXAuZ2FtZS5qb2FhdD9cImNsaWVudFwiOm1wLnRyaWdnZXI/XCJjZWZcIjp2b2lkIDB9ZnVuY3Rpb24gaShlKXtjb25zdCByPXMoKTtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSwoZSxuKT0+e2lmKFwiY2xpZW50XCI9PT1yfHxcInNlcnZlclwiPT09ciYmbiYmXCJvYmplY3RcIj09dHlwZW9mIG4pe2xldCBlO2lmKG8obix0LkJsaXApP2U9dC5CbGlwOm8obix0LkNoZWNrcG9pbnQpP2U9dC5DaGVja3BvaW50Om8obix0LkNvbHNoYXBlKT9lPXQuQ29sc2hhcGU6byhuLHQuTWFya2VyKT9lPXQuTWFya2VyOm8obix0Lk9iamVjdCk/ZT10Lk9iamVjdDpvKG4sdC5QaWNrdXApP2U9dC5QaWNrdXA6byhuLHQuUGxheWVyKT9lPXQuUGxheWVyOm8obix0LlZlaGljbGUpJiYoZT10LlZlaGljbGUpLGUpcmV0dXJue19fdDplLGk6XCJudW1iZXJcIj09dHlwZW9mIG4ucmVtb3RlSWQ/bi5yZW1vdGVJZDpuLmlkfX1yZXR1cm4gbn0pfWZ1bmN0aW9uIGEoZSl7Y29uc3Qgcj1zKCk7cmV0dXJuIEpTT04ucGFyc2UoZSwoZSxuKT0+e2lmKChcImNsaWVudFwiPT09cnx8XCJzZXJ2ZXJcIj09PXIpJiZuJiZcIm9iamVjdFwiPT10eXBlb2YgbiYmXCJzdHJpbmdcIj09dHlwZW9mIG4uX190JiZcIm51bWJlclwiPT10eXBlb2Ygbi5pJiYyPT09T2JqZWN0LmtleXMobikubGVuZ3RoKXtjb25zdCBlPW4uaTtsZXQgbztzd2l0Y2gobi5fX3Qpe2Nhc2UgdC5CbGlwOm89bXAuYmxpcHM7YnJlYWs7Y2FzZSB0LkNoZWNrcG9pbnQ6bz1tcC5jaGVja3BvaW50czticmVhaztjYXNlIHQuQ29sc2hhcGU6bz1tcC5jb2xzaGFwZXM7YnJlYWs7Y2FzZSB0LkxhYmVsOm89bXAubGFiZWxzO2JyZWFrO2Nhc2UgdC5NYXJrZXI6bz1tcC5tYXJrZXJzO2JyZWFrO2Nhc2UgdC5PYmplY3Q6bz1tcC5vYmplY3RzO2JyZWFrO2Nhc2UgdC5QaWNrdXA6bz1tcC5waWNrdXBzO2JyZWFrO2Nhc2UgdC5QbGF5ZXI6bz1tcC5wbGF5ZXJzO2JyZWFrO2Nhc2UgdC5WZWhpY2xlOm89bXAudmVoaWNsZXN9aWYobylyZXR1cm4gb1tcImNsaWVudFwiPT09cj9cImF0UmVtb3RlSWRcIjpcImF0XCJdKGUpfXJldHVybiBufSl9ZnVuY3Rpb24gbChlKXtyZXR1cm4gbmV3IFByb21pc2Uocj0+c2V0VGltZW91dCgoKT0+cihlKSwwKSl9ZnVuY3Rpb24gdShlKXtyZXR1cm4gbmV3IFByb21pc2UoKHIsbik9PnNldFRpbWVvdXQoKCk9Pm4oZSksMCkpfWZ1bmN0aW9uIHAoZSxyKXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2Ygcj9Qcm9taXNlLnJhY2UoW25ldyBQcm9taXNlKChlLG4pPT57c2V0VGltZW91dCgoKT0+bihcIlRJTUVPVVRcIikscil9KSxlXSk6ZX1mdW5jdGlvbiBmKGUpe3RyeXtlLnVybH1jYXRjaChlKXtyZXR1cm4hMX1yZXR1cm4hMH1uLmQocixcImhcIiwoZnVuY3Rpb24oKXtyZXR1cm4gY30pKSxuLmQocixcImFcIiwoZnVuY3Rpb24oKXtyZXR1cm4gc30pKSxuLmQocixcImdcIiwoZnVuY3Rpb24oKXtyZXR1cm4gaX0pKSxuLmQocixcImNcIiwoZnVuY3Rpb24oKXtyZXR1cm4gYX0pKSxuLmQocixcImVcIiwoZnVuY3Rpb24oKXtyZXR1cm4gbH0pKSxuLmQocixcImRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gdX0pKSxuLmQocixcImZcIiwoZnVuY3Rpb24oKXtyZXR1cm4gcH0pKSxuLmQocixcImJcIiwoZnVuY3Rpb24oKXtyZXR1cm4gZn0pKSxmdW5jdGlvbihlKXtlLkJsaXA9XCJiXCIsZS5DaGVja3BvaW50PVwiY3BcIixlLkNvbHNoYXBlPVwiY1wiLGUuTGFiZWw9XCJsXCIsZS5NYXJrZXI9XCJtXCIsZS5PYmplY3Q9XCJvXCIsZS5QaWNrdXA9XCJwXCIsZS5QbGF5ZXI9XCJwbFwiLGUuVmVoaWNsZT1cInZcIn0odHx8KHQ9e30pKX0sZnVuY3Rpb24oZSxyLG4pe1widXNlIHN0cmljdFwiO24ucihyKSxmdW5jdGlvbihlKXtuLmQocixcInJlZ2lzdGVyXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIGR9KSksbi5kKHIsXCJ1bnJlZ2lzdGVyXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIGh9KSksbi5kKHIsXCJjYWxsXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHd9KSksbi5kKHIsXCJjYWxsU2VydmVyXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHZ9KSksbi5kKHIsXCJjYWxsQ2xpZW50XCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHl9KSksbi5kKHIsXCJjYWxsQnJvd3NlcnNcIiwoZnVuY3Rpb24oKXtyZXR1cm4gQn0pKSxuLmQocixcImNhbGxCcm93c2VyXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHh9KSksbi5kKHIsXCJvblwiLChmdW5jdGlvbigpe3JldHVybiBqfSkpLG4uZChyLFwib2ZmXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIE99KSksbi5kKHIsXCJ0cmlnZ2VyXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIEN9KSksbi5kKHIsXCJ0cmlnZ2VyQ2xpZW50XCIsKGZ1bmN0aW9uKCl7cmV0dXJuIFN9KSksbi5kKHIsXCJ0cmlnZ2VyU2VydmVyXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIEV9KSksbi5kKHIsXCJ0cmlnZ2VyQnJvd3NlcnNcIiwoZnVuY3Rpb24oKXtyZXR1cm4gTH0pKSxuLmQocixcInRyaWdnZXJCcm93c2VyXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIE19KSk7dmFyIHQ9bigwKTtjb25zdCBvPXQuYSgpO2lmKCFvKXRocm93XCJVbmtub3duIFJBR0UgZW52aXJvbm1lbnRcIjtjb25zdCBjPVwiUFJPQ0VEVVJFX05PVF9GT1VORFwiLHM9XCJfX3JwYzppZFwiLGk9XCJfX3JwYzpwcm9jZXNzXCIsYT1cIl9fcnBjOmJyb3dzZXJSZWdpc3RlclwiLGw9XCJfX3JwYzpicm93c2VyVW5yZWdpc3RlclwiLHU9XCJfX3JwYzp0cmlnZ2VyRXZlbnRcIixwPVwiX19ycGM6dHJpZ2dlckV2ZW50QnJvd3NlcnNcIixmPVwiY2VmXCI9PT1vP3dpbmRvdzplO2lmKCFmW2ldKXtpZihmLl9fcnBjTGlzdGVuZXJzPXt9LGYuX19ycGNQZW5kaW5nPXt9LGYuX19ycGNFdkxpc3RlbmVycz17fSxmW2ldPShlLHIpPT57XCJzZXJ2ZXJcIiE9PW8mJihyPWUpO2NvbnN0IG49dC5jKHIpO2lmKG4ucmVxKXtjb25zdCByPXtpZDpuLmlkLGVudmlyb25tZW50Om4uZmVudnx8bi5lbnZ9O1wic2VydmVyXCI9PT1vJiYoci5wbGF5ZXI9ZSk7Y29uc3QgYz17cmV0OjEsaWQ6bi5pZCxlbnY6b307bGV0IHM7c3dpdGNoKG8pe2Nhc2VcInNlcnZlclwiOnM9ZT0+ci5wbGF5ZXIuY2FsbChpLFt0LmcoZSldKTticmVhaztjYXNlXCJjbGllbnRcIjppZihcInNlcnZlclwiPT09bi5lbnYpcz1lPT5tcC5ldmVudHMuY2FsbFJlbW90ZShpLHQuZyhlKSk7ZWxzZSBpZihcImNlZlwiPT09bi5lbnYpe2NvbnN0IGU9bi5iJiZmLl9fcnBjQnJvd3NlcnNbbi5iXTtyLmJyb3dzZXI9ZSxzPXI9PmUmJnQuYihlKSYmZyhlLHIsITApfWJyZWFrO2Nhc2VcImNlZlwiOnM9ZT0+bXAudHJpZ2dlcihpLHQuZyhlKSl9aWYocyl7Y29uc3QgZT1tKG4ubmFtZSxuLmFyZ3Mscik7bi5ub1JldHx8ZS50aGVuKGU9PnMoey4uLmMscmVzOmV9KSkuY2F0Y2goZT0+cyh7Li4uYyxlcnI6ZX0pKX19ZWxzZSBpZihuLnJldCl7Y29uc3Qgcj1mLl9fcnBjUGVuZGluZ1tuLmlkXTtpZihcInNlcnZlclwiPT09byYmci5wbGF5ZXIhPT1lKXJldHVybjtyJiYoci5yZXNvbHZlKG4uZXJyP3QuZChuLmVycik6dC5lKG4ucmVzKSksZGVsZXRlIGYuX19ycGNQZW5kaW5nW24uaWRdKX19LFwiY2VmXCIhPT1vKXtpZihtcC5ldmVudHMuYWRkKGksZltpXSksXCJjbGllbnRcIj09PW8pe2QoXCJfX3JwYzpjYWxsU2VydmVyXCIsKFtlLHIsbl0sdCk9Pl8oZSxyLHtmZW52OnQuZW52aXJvbm1lbnQsbm9SZXQ6bn0pKSxkKFwiX19ycGM6Y2FsbEJyb3dzZXJzXCIsKFtlLHIsbl0sdCk9PlAobnVsbCxlLHIse2ZlbnY6dC5lbnZpcm9ubWVudCxub1JldDpufSkpLGYuX19ycGNCcm93c2Vycz17fTtjb25zdCBlPWU9Pntjb25zdCByPXQuaCgpO09iamVjdC5rZXlzKGYuX19ycGNCcm93c2VycykuZm9yRWFjaChyPT57Y29uc3Qgbj1mLl9fcnBjQnJvd3NlcnNbcl07biYmdC5iKG4pJiZuIT09ZXx8ZGVsZXRlIGYuX19ycGNCcm93c2Vyc1tyXX0pLGYuX19ycGNCcm93c2Vyc1tyXT1lLGUuZXhlY3V0ZShgXFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubmFtZSA9ICcke3J9JztcXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiB3aW5kb3dbJyR7c30nXSA9PT0gJ3VuZGVmaW5lZCcpe1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1snJHtzfSddID0gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5uYW1lKTtcXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1snJHtzfTpyZXNvbHZlJ10od2luZG93Lm5hbWUpO1xcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICBgKX07bXAuYnJvd3NlcnMuZm9yRWFjaChlKSxtcC5ldmVudHMuYWRkKFwiYnJvd3NlckNyZWF0ZWRcIixlKSxmLl9fcnBjQnJvd3NlclByb2NlZHVyZXM9e30sbXAuZXZlbnRzLmFkZChhLGU9Pntjb25zdFtyLG5dPUpTT04ucGFyc2UoZSk7Zi5fX3JwY0Jyb3dzZXJQcm9jZWR1cmVzW25dPXJ9KSxtcC5ldmVudHMuYWRkKGwsZT0+e2NvbnN0W3Isbl09SlNPTi5wYXJzZShlKTtmLl9fcnBjQnJvd3NlclByb2NlZHVyZXNbbl09PT1yJiZkZWxldGUgZi5fX3JwY0Jyb3dzZXJQcm9jZWR1cmVzW25dfSksZChwLChbZSxyXSxuKT0+e09iamVjdC52YWx1ZXMoZi5fX3JwY0Jyb3dzZXJzKS5mb3JFYWNoKHQ9PntrKHQsdSxbZSxyXSx7ZmVudjpuLmVudmlyb25tZW50LG5vUmV0OjF9KX0pfSl9fWVsc2Ugdm9pZCAwPT09ZltzXSYmKGZbc109bmV3IFByb21pc2UoZT0+e3dpbmRvdy5uYW1lP2Uod2luZG93Lm5hbWUpOmZbcytcIjpyZXNvbHZlXCJdPWV9KSk7ZCh1LChbZSxyXSxuKT0+UihlLHIsbikpfWZ1bmN0aW9uIGcoZSxyLG4pe2NvbnN0IG89dC5nKHIpO2UuZXhlY3V0ZShgdmFyIHByb2Nlc3MgPSB3aW5kb3dbXCIke2l9XCJdOyBpZihwcm9jZXNzKXsgcHJvY2Vzcygke0pTT04uc3RyaW5naWZ5KG8pfSk7IH1lbHNleyAke24/XCJcIjpgbXAudHJpZ2dlcihcIiR7aX1cIiwgJ3tcInJldFwiOjEsXCJpZFwiOlwiJHtyLmlkfVwiLFwiZXJyXCI6XCIke2N9XCIsXCJlbnZcIjpcImNlZlwifScpO2B9IH1gKX1mdW5jdGlvbiBtKGUscixuKXtjb25zdCBvPWYuX19ycGNMaXN0ZW5lcnNbZV07cmV0dXJuIG8/dC5lKG8ocixuKSk6dC5kKGMpfWZ1bmN0aW9uIGQoZSxyKXtpZigyIT09YXJndW1lbnRzLmxlbmd0aCl0aHJvdydyZWdpc3RlciBleHBlY3RzIDIgYXJndW1lbnRzOiBcIm5hbWVcIiBhbmQgXCJjYlwiJztyZXR1cm5cImNlZlwiPT09byYmZltzXS50aGVuKHI9Pm1wLnRyaWdnZXIoYSxKU09OLnN0cmluZ2lmeShbcixlXSkpKSxmLl9fcnBjTGlzdGVuZXJzW2VdPXIsKCk9PmgoZSl9ZnVuY3Rpb24gaChlKXtpZigxIT09YXJndW1lbnRzLmxlbmd0aCl0aHJvdyd1bnJlZ2lzdGVyIGV4cGVjdHMgMSBhcmd1bWVudDogXCJuYW1lXCInO1wiY2VmXCI9PT1vJiZmW3NdLnRoZW4ocj0+bXAudHJpZ2dlcihsLEpTT04uc3RyaW5naWZ5KFtyLGVdKSkpLGYuX19ycGNMaXN0ZW5lcnNbZV09dm9pZCAwfWZ1bmN0aW9uIHcoZSxyLG49e30pe3JldHVybiBhcmd1bWVudHMubGVuZ3RoPDF8fGFyZ3VtZW50cy5sZW5ndGg+Mz90LmQoJ2NhbGwgZXhwZWN0cyAxIHRvIDMgYXJndW1lbnRzOiBcIm5hbWVcIiwgb3B0aW9uYWwgXCJhcmdzXCIsIGFuZCBvcHRpb25hbCBcIm9wdGlvbnNcIicpOnQuZihtKGUscix7ZW52aXJvbm1lbnQ6b30pLG4udGltZW91dCl9ZnVuY3Rpb24gXyhlLHIsbj17fSl7c3dpdGNoKG8pe2Nhc2VcInNlcnZlclwiOnJldHVybiB3KGUscik7Y2FzZVwiY2xpZW50XCI6e2NvbnN0IGM9dC5oKCk7cmV0dXJuIG5ldyBQcm9taXNlKHM9PntuLm5vUmV0fHwoZi5fX3JwY1BlbmRpbmdbY109e3Jlc29sdmU6c30pO2NvbnN0IGE9e3JlcToxLGlkOmMsbmFtZTplLGVudjpvLGFyZ3M6ciwuLi5ufTttcC5ldmVudHMuY2FsbFJlbW90ZShpLHQuZyhhKSl9KX1jYXNlXCJjZWZcIjpyZXR1cm4geShcIl9fcnBjOmNhbGxTZXJ2ZXJcIixbZSxyLCtuLm5vUmV0XSl9fWZ1bmN0aW9uIHYoZSxyLG49e30pe2lmKGFyZ3VtZW50cy5sZW5ndGg8MXx8YXJndW1lbnRzLmxlbmd0aD4zKXJldHVybiB0LmQoJ2NhbGxTZXJ2ZXIgZXhwZWN0cyAxIHRvIDMgYXJndW1lbnRzOiBcIm5hbWVcIiwgb3B0aW9uYWwgXCJhcmdzXCIsIGFuZCBvcHRpb25hbCBcIm9wdGlvbnNcIicpO2xldCBvPXt9O3JldHVybiBuLm5vUmV0JiYoby5ub1JldD0xKSx0LmYoXyhlLHIsbyksbi50aW1lb3V0KX1mdW5jdGlvbiBiKGUscixuLGM9e30pe3N3aXRjaChvKXtjYXNlXCJjbGllbnRcIjpyZXR1cm4gdyhyLG4pO2Nhc2VcInNlcnZlclwiOntjb25zdCBzPXQuaCgpO3JldHVybiBuZXcgUHJvbWlzZShhPT57Yy5ub1JldHx8KGYuX19ycGNQZW5kaW5nW3NdPXtyZXNvbHZlOmEscGxheWVyOmV9KTtjb25zdCBsPXtyZXE6MSxpZDpzLG5hbWU6cixlbnY6byxhcmdzOm4sLi4uY307ZS5jYWxsKGksW3QuZyhsKV0pfSl9Y2FzZVwiY2VmXCI6e2NvbnN0IGU9dC5oKCk7cmV0dXJuIGZbc10udGhlbihzPT5uZXcgUHJvbWlzZShhPT57Yy5ub1JldHx8KGYuX19ycGNQZW5kaW5nW2VdPXtyZXNvbHZlOmF9KTtjb25zdCBsPXtiOnMscmVxOjEsaWQ6ZSxuYW1lOnIsZW52Om8sYXJnczpuLC4uLmN9O21wLnRyaWdnZXIoaSx0LmcobCkpfSkpfX19ZnVuY3Rpb24geShlLHIsbixjPXt9KXtzd2l0Y2gobyl7Y2FzZVwiY2xpZW50XCI6aWYoYz1ufHx7fSxuPXIscj1lLGU9bnVsbCxhcmd1bWVudHMubGVuZ3RoPDF8fGFyZ3VtZW50cy5sZW5ndGg+M3x8XCJzdHJpbmdcIiE9dHlwZW9mIHIpcmV0dXJuIHQuZCgnY2FsbENsaWVudCBmcm9tIHRoZSBjbGllbnQgZXhwZWN0cyAxIHRvIDMgYXJndW1lbnRzOiBcIm5hbWVcIiwgb3B0aW9uYWwgXCJhcmdzXCIsIGFuZCBvcHRpb25hbCBcIm9wdGlvbnNcIicpO2JyZWFrO2Nhc2VcInNlcnZlclwiOmlmKGFyZ3VtZW50cy5sZW5ndGg8Mnx8YXJndW1lbnRzLmxlbmd0aD40fHxcIm9iamVjdFwiIT10eXBlb2YgZSlyZXR1cm4gdC5kKCdjYWxsQ2xpZW50IGZyb20gdGhlIHNlcnZlciBleHBlY3RzIDIgdG8gNCBhcmd1bWVudHM6IFwicGxheWVyXCIsIFwibmFtZVwiLCBvcHRpb25hbCBcImFyZ3NcIiwgYW5kIG9wdGlvbmFsIFwib3B0aW9uc1wiJyk7YnJlYWs7Y2FzZVwiY2VmXCI6aWYoYz1ufHx7fSxuPXIscj1lLGU9bnVsbCxhcmd1bWVudHMubGVuZ3RoPDF8fGFyZ3VtZW50cy5sZW5ndGg+M3x8XCJzdHJpbmdcIiE9dHlwZW9mIHIpcmV0dXJuIHQuZCgnY2FsbENsaWVudCBmcm9tIHRoZSBicm93c2VyIGV4cGVjdHMgMSB0byAzIGFyZ3VtZW50czogXCJuYW1lXCIsIG9wdGlvbmFsIFwiYXJnc1wiLCBhbmQgb3B0aW9uYWwgXCJvcHRpb25zXCInKX1sZXQgcz17fTtyZXR1cm4gYy5ub1JldCYmKHMubm9SZXQ9MSksdC5mKGIoZSxyLG4scyksYy50aW1lb3V0KX1mdW5jdGlvbiBrKGUscixuLGM9e30pe3JldHVybiBuZXcgUHJvbWlzZShzPT57Y29uc3QgaT10LmgoKTtjLm5vUmV0fHwoZi5fX3JwY1BlbmRpbmdbaV09e3Jlc29sdmU6c30pLGcoZSx7cmVxOjEsaWQ6aSxuYW1lOnIsZW52Om8sYXJnczpuLC4uLmN9LCExKX0pfWZ1bmN0aW9uIFAoZSxyLG4scz17fSl7c3dpdGNoKG8pe2Nhc2VcImNsaWVudFwiOmNvbnN0IG89Zi5fX3JwY0Jyb3dzZXJQcm9jZWR1cmVzW3JdO2lmKCFvKXJldHVybiB0LmQoYyk7Y29uc3QgaT1mLl9fcnBjQnJvd3NlcnNbb107cmV0dXJuIGkmJnQuYihpKT9rKGkscixuLHMpOnQuZChjKTtjYXNlXCJzZXJ2ZXJcIjpyZXR1cm4gYihlLFwiX19ycGM6Y2FsbEJyb3dzZXJzXCIsW3Isbiwrcy5ub1JldF0scyk7Y2FzZVwiY2VmXCI6cmV0dXJuIGIobnVsbCxcIl9fcnBjOmNhbGxCcm93c2Vyc1wiLFtyLG4sK3Mubm9SZXRdLHMpfX1mdW5jdGlvbiBCKGUscixuLGM9e30pe2xldCBzLGk9e307c3dpdGNoKG8pe2Nhc2VcImNsaWVudFwiOmNhc2VcImNlZlwiOmlmKGM9bnx8e30sbj1yLHI9ZSxhcmd1bWVudHMubGVuZ3RoPDF8fGFyZ3VtZW50cy5sZW5ndGg+MylyZXR1cm4gdC5kKCdjYWxsQnJvd3NlcnMgZnJvbSB0aGUgY2xpZW50IG9yIGJyb3dzZXIgZXhwZWN0cyAxIHRvIDMgYXJndW1lbnRzOiBcIm5hbWVcIiwgb3B0aW9uYWwgXCJhcmdzXCIsIGFuZCBvcHRpb25hbCBcIm9wdGlvbnNcIicpO2Mubm9SZXQmJihpLm5vUmV0PTEpLHM9UChudWxsLHIsbixpKTticmVhaztjYXNlXCJzZXJ2ZXJcIjppZihhcmd1bWVudHMubGVuZ3RoPDJ8fGFyZ3VtZW50cy5sZW5ndGg+NClyZXR1cm4gdC5kKCdjYWxsQnJvd3NlcnMgZnJvbSB0aGUgc2VydmVyIGV4cGVjdHMgMiB0byA0IGFyZ3VtZW50czogXCJwbGF5ZXJcIiwgXCJuYW1lXCIsIG9wdGlvbmFsIFwiYXJnc1wiLCBhbmQgb3B0aW9uYWwgXCJvcHRpb25zXCInKTtjLm5vUmV0JiYoaS5ub1JldD0xKSxzPVAoZSxyLG4saSl9aWYocylyZXR1cm4gdC5mKHMsYy50aW1lb3V0KX1mdW5jdGlvbiB4KGUscixuLGM9e30pe2lmKFwiY2xpZW50XCIhPT1vKXJldHVybiB0LmQoXCJjYWxsQnJvd3NlciBjYW4gb25seSBiZSB1c2VkIGluIHRoZSBjbGllbnQgZW52aXJvbm1lbnRcIik7aWYoYXJndW1lbnRzLmxlbmd0aDwyfHxhcmd1bWVudHMubGVuZ3RoPjQpcmV0dXJuIHQuZCgnY2FsbEJyb3dzZXIgZXhwZWN0cyAyIHRvIDQgYXJndW1lbnRzOiBcImJyb3dzZXJcIiwgXCJuYW1lXCIsIG9wdGlvbmFsIFwiYXJnc1wiLCBhbmQgb3B0aW9uYWwgXCJvcHRpb25zXCInKTtsZXQgcz17fTtyZXR1cm4gYy5ub1JldCYmKHMubm9SZXQ9MSksdC5mKGsoZSxyLG4scyksYy50aW1lb3V0KX1mdW5jdGlvbiBSKGUscixuKXtjb25zdCB0PWYuX19ycGNFdkxpc3RlbmVyc1tlXTt0JiZ0LmZvckVhY2goZT0+ZShyLG4pKX1mdW5jdGlvbiBqKGUscil7aWYoMiE9PWFyZ3VtZW50cy5sZW5ndGgpdGhyb3cnb24gZXhwZWN0cyAyIGFyZ3VtZW50czogXCJuYW1lXCIgYW5kIFwiY2JcIic7Y29uc3Qgbj1mLl9fcnBjRXZMaXN0ZW5lcnNbZV18fG5ldyBTZXQ7cmV0dXJuIG4uYWRkKHIpLGYuX19ycGNFdkxpc3RlbmVyc1tlXT1uLCgpPT5PKGUscil9ZnVuY3Rpb24gTyhlLHIpe2lmKDIhPT1hcmd1bWVudHMubGVuZ3RoKXRocm93J29mZiBleHBlY3RzIDIgYXJndW1lbnRzOiBcIm5hbWVcIiBhbmQgXCJjYlwiJztjb25zdCBuPWYuX19ycGNFdkxpc3RlbmVyc1tlXTtuJiZuLmRlbGV0ZShyKX1mdW5jdGlvbiBDKGUscil7aWYoYXJndW1lbnRzLmxlbmd0aDwxfHxhcmd1bWVudHMubGVuZ3RoPjIpdGhyb3cndHJpZ2dlciBleHBlY3RzIDEgb3IgMiBhcmd1bWVudHM6IFwibmFtZVwiLCBhbmQgb3B0aW9uYWwgXCJhcmdzXCInO1IoZSxyLHtlbnZpcm9ubWVudDpvfSl9ZnVuY3Rpb24gUyhlLHIsbil7c3dpdGNoKG8pe2Nhc2VcImNsaWVudFwiOmlmKG49cixyPWUsZT1udWxsLGFyZ3VtZW50cy5sZW5ndGg8MXx8YXJndW1lbnRzLmxlbmd0aD4yfHxcInN0cmluZ1wiIT10eXBlb2Ygcil0aHJvdyd0cmlnZ2VyQ2xpZW50IGZyb20gdGhlIGNsaWVudCBleHBlY3RzIDEgb3IgMiBhcmd1bWVudHM6IFwibmFtZVwiLCBhbmQgb3B0aW9uYWwgXCJhcmdzXCInO2JyZWFrO2Nhc2VcInNlcnZlclwiOmlmKGFyZ3VtZW50cy5sZW5ndGg8Mnx8YXJndW1lbnRzLmxlbmd0aD4zfHxcIm9iamVjdFwiIT10eXBlb2YgZSl0aHJvdyd0cmlnZ2VyQ2xpZW50IGZyb20gdGhlIHNlcnZlciBleHBlY3RzIDIgb3IgMyBhcmd1bWVudHM6IFwicGxheWVyXCIsIFwibmFtZVwiLCBhbmQgb3B0aW9uYWwgXCJhcmdzXCInO2JyZWFrO2Nhc2VcImNlZlwiOmlmKG49cixyPWUsZT1udWxsLGFyZ3VtZW50cy5sZW5ndGg8MXx8YXJndW1lbnRzLmxlbmd0aD4yfHxcInN0cmluZ1wiIT10eXBlb2Ygcil0aHJvdyd0cmlnZ2VyQ2xpZW50IGZyb20gdGhlIGJyb3dzZXIgZXhwZWN0cyAxIG9yIDIgYXJndW1lbnRzOiBcIm5hbWVcIiwgYW5kIG9wdGlvbmFsIFwiYXJnc1wiJ31iKGUsdSxbcixuXSx7bm9SZXQ6MX0pfWZ1bmN0aW9uIEUoZSxyKXtpZihhcmd1bWVudHMubGVuZ3RoPDF8fGFyZ3VtZW50cy5sZW5ndGg+Mil0aHJvdyd0cmlnZ2VyU2VydmVyIGV4cGVjdHMgMSBvciAyIGFyZ3VtZW50czogXCJuYW1lXCIsIGFuZCBvcHRpb25hbCBcImFyZ3NcIic7Xyh1LFtlLHJdLHtub1JldDoxfSl9ZnVuY3Rpb24gTChlLHIsbil7c3dpdGNoKG8pe2Nhc2VcImNsaWVudFwiOmNhc2VcImNlZlwiOmlmKG49cixyPWUsZT1udWxsLGFyZ3VtZW50cy5sZW5ndGg8MXx8YXJndW1lbnRzLmxlbmd0aD4yKXRocm93J3RyaWdnZXJCcm93c2VycyBmcm9tIHRoZSBjbGllbnQgb3IgYnJvd3NlciBleHBlY3RzIDEgb3IgMiBhcmd1bWVudHM6IFwibmFtZVwiLCBhbmQgb3B0aW9uYWwgXCJhcmdzXCInO2JyZWFrO2Nhc2VcInNlcnZlclwiOmlmKGFyZ3VtZW50cy5sZW5ndGg8Mnx8YXJndW1lbnRzLmxlbmd0aD4zKXRocm93J3RyaWdnZXJCcm93c2VycyBmcm9tIHRoZSBzZXJ2ZXIgZXhwZWN0cyAyIG9yIDMgYXJndW1lbnRzOiBcInBsYXllclwiLCBcIm5hbWVcIiwgYW5kIG9wdGlvbmFsIFwiYXJnc1wiJ31iKGUscCxbcixuXSx7bm9SZXQ6MX0pfWZ1bmN0aW9uIE0oZSxyLG4pe2lmKFwiY2xpZW50XCIhPT1vKXRocm93XCJjYWxsQnJvd3NlciBjYW4gb25seSBiZSB1c2VkIGluIHRoZSBjbGllbnQgZW52aXJvbm1lbnRcIjtpZihhcmd1bWVudHMubGVuZ3RoPDJ8fGFyZ3VtZW50cy5sZW5ndGg+NCl0aHJvdydjYWxsQnJvd3NlciBleHBlY3RzIDIgb3IgMyBhcmd1bWVudHM6IFwiYnJvd3NlclwiLCBcIm5hbWVcIiwgYW5kIG9wdGlvbmFsIFwiYXJnc1wiJztrKGUsdSxbcixuXSx7bm9SZXQ6MX0pfXIuZGVmYXVsdD17cmVnaXN0ZXI6ZCx1bnJlZ2lzdGVyOmgsY2FsbDp3LGNhbGxTZXJ2ZXI6dixjYWxsQ2xpZW50OnksY2FsbEJyb3dzZXJzOkIsY2FsbEJyb3dzZXI6eCxvbjpqLG9mZjpPLHRyaWdnZXI6Qyx0cmlnZ2VyU2VydmVyOkUsdHJpZ2dlckNsaWVudDpTLHRyaWdnZXJCcm93c2VyczpMLHRyaWdnZXJCcm93c2VyOk19fS5jYWxsKHRoaXMsbigyKSl9LGZ1bmN0aW9uKGUscil7dmFyIG47bj1mdW5jdGlvbigpe3JldHVybiB0aGlzfSgpO3RyeXtuPW58fG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCl9Y2F0Y2goZSl7XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyYmKG49d2luZG93KX1lLmV4cG9ydHM9bn1dKX0pKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEZWZlcnJlZFByb21pc2U8VD4ge1xyXG4gICAgdW5kZXJseWluZ1Byb21pc2U6IFByb21pc2U8VD47XHJcbiAgICByZWplY3Q7XHJcbiAgICByZXNvbHZlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XHJcbiAgICAgICAgdGhpcy51bmRlcmx5aW5nUHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3RcclxuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZVxyXG5cclxuICAgICAgICAgICAgZXhlY3V0b3IoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgSUxpdGVFdmVudDxUPiB7XHJcbiAgICBvbihoYW5kbGVyOiB7IChkYXRhPzogVCk6IHZvaWQgfSkgOiB2b2lkO1xyXG4gICAgb2ZmKGhhbmRsZXI6IHsgKGRhdGE/OiBUKTogdm9pZCB9KSA6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpdGVFdmVudDxUPiBpbXBsZW1lbnRzIElMaXRlRXZlbnQ8VD4ge1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVyczogeyAoZGF0YT86IFQpOiB2b2lkOyB9W10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgb24oaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvZmYoaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZmlsdGVyKGggPT4gaCAhPT0gaGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyaWdnZXIoZGF0YT86IFQpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXJzLnNsaWNlKDApLmZvckVhY2goaCA9PiBoKGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhwb3NlKCkgOiBJTGl0ZUV2ZW50PFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkQW5pbWF0aW9uTmFtZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=