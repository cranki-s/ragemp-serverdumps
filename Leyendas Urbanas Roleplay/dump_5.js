{
!(function (t) {
    var e = {};
    function s(i) {
        if (e[i]) return e[i].exports;
        var n = (e[i] = { i: i, l: !1, exports: {} });
        return t[i].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
    }
    (s.m = t),
        (s.c = e),
        (s.d = function (t, e, i) {
            s.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
        }),
        (s.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (s.t = function (t, e) {
            if ((1 & e && (t = s(t)), 8 & e)) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if ((s.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                for (var n in t)
                    s.d(
                        i,
                        n,
                        function (e) {
                            return t[e];
                        }.bind(null, n)
                    );
            return i;
        }),
        (s.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return s.d(e, "a", e), e;
        }),
        (s.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (s.p = ""),
        s((s.s = 0));
})([
    function (t, e, s) {
        "use strict";
        var i;
        s.r(e),
            (function (t) {
                (t[(t.None = 0)] = "None"),
                    (t[(t.BronzeMedal = 1)] = "BronzeMedal"),
                    (t[(t.GoldMedal = 2)] = "GoldMedal"),
                    (t[(t.SilverMedal = 3)] = "SilverMedal"),
                    (t[(t.Alert = 4)] = "Alert"),
                    (t[(t.Crown = 5)] = "Crown"),
                    (t[(t.Ammo = 6)] = "Ammo"),
                    (t[(t.Armour = 7)] = "Armour"),
                    (t[(t.Barber = 8)] = "Barber"),
                    (t[(t.Clothes = 9)] = "Clothes"),
                    (t[(t.Franklin = 10)] = "Franklin"),
                    (t[(t.Bike = 11)] = "Bike"),
                    (t[(t.Car = 12)] = "Car"),
                    (t[(t.Gun = 13)] = "Gun"),
                    (t[(t.Heart = 14)] = "Heart"),
                    (t[(t.Makeup = 15)] = "Makeup"),
                    (t[(t.Mask = 16)] = "Mask"),
                    (t[(t.Michael = 17)] = "Michael"),
                    (t[(t.Star = 18)] = "Star"),
                    (t[(t.Tatoo = 19)] = "Tatoo"),
                    (t[(t.Trevor = 20)] = "Trevor"),
                    (t[(t.Lock = 21)] = "Lock"),
                    (t[(t.Tick = 22)] = "Tick");
            })(i || (i = {}));
        var n,
            h = i;
        !(function (t) {
            (t[(t.ChaletLondon = 0)] = "ChaletLondon"), (t[(t.HouseScript = 1)] = "HouseScript"), (t[(t.Monospace = 2)] = "Monospace"), (t[(t.CharletComprimeColonge = 4)] = "CharletComprimeColonge"), (t[(t.Pricedown = 7)] = "Pricedown");
        })(n || (n = {}));
        var o = n;
        class r {
            constructor(t, e, s, i = 255) {
                (this.R = t), (this.G = e), (this.B = s), (this.A = i);
            }
        }
        (r.Naranja = new r(255, 121, 0, 255)), (r.Verde = new r(0, 214, 103, 255)), (r.Rojo = new r(229, 57, 53, 255)), (r.Negro = new r(5, 3, 12, 255)), (r.Empty = new r(0, 0, 0, 100)), (r.Transparent = new r(0, 0, 0, 0)), (r.Black = new r(0, 0, 0, 255)), (r.White = new r(255, 255, 255, 255)), (r.WhiteSmoke = new r(245, 245, 245, 255));
        let res = mp.game.graphics.getScreenActiveResolution(0, 0),
            asrt = (res.x / res.y) / (16 / 9),
            l = { width: res.x, height: res.y, ar: asrt };
        class c {
            constructor(t, e, s, i, n = 0, h = new r(255, 255, 255)) {
                (this.TextureDict = t), (this.TextureName = e), (this.pos = s), (this.size = i), (this.heading = n), (this.color = h), (this.visible = !0);
            }
            LoadTextureDictionary() {
                for (mp.game.graphics.requestStreamedTextureDict(this._textureDict, !0); !this.IsTextureDictionaryLoaded; ) mp.game.wait(0);
            }
            set TextureDict(t) {
                (this._textureDict = t), this.IsTextureDictionaryLoaded || this.LoadTextureDictionary();
            }
            get TextureDict() {
                return this._textureDict;
            }
            get IsTextureDictionaryLoaded() {
                return mp.game.graphics.hasStreamedTextureDictLoaded(this._textureDict);
            }
            Draw(t, e, s, i, n, h, o) {
                (t = t || this.TextureDict),
                    (e = e || this.TextureName),
                    (s = s || this.pos),
                    (i = i || this.size),
                    (n = n || this.heading),
                    (h = h || this.color),
                    (o = o || !0) && (mp.game.graphics.hasStreamedTextureDictLoaded(t) || mp.game.graphics.requestStreamedTextureDict(t, !0));
                const r = 1080 * (l.width / (l.height * l.ar)),
                    a = this.size.Width / r,
                    c = this.size.Height / 1080,
                    u = this.pos.X / r + 0.5 * a,
                    d = this.pos.Y / 1080 + 0.5 * c;
                mp.game.graphics.drawSprite(t, e, u, d, a, c, n, h.R, h.G, h.B, h.A);
            }
        }
        class u {
            constructor() {
                this.handlers = [];
            }
            on(t) {
                this.handlers.push(t);
            }
            off(t) {
                this.handlers = this.handlers.filter((e) => e !== t);
            }
            emit(...t) {
                this.handlers.slice(0).forEach((e) => e(...t));
            }
            expose() {
                return this;
            }
        }
        class d {
            constructor(t, e) {
                (this.X = 0), (this.Y = 0), (this.X = t), (this.Y = e);
            }
            static Parse(t) {
                if ("object" == typeof t) {
                    if (t.length) return new d(t[0], t[1]);
                    if (t.X && t.Y) return new d(t.X, t.Y);
                } else if ("string" == typeof t && -1 !== t.indexOf(",")) {
                    const e = t.split(",");
                    return new d(parseFloat(e[0]), parseFloat(e[1]));
                }
                return new d(0, 0);
            }
        }
        class m {
            constructor(t = 0, e = 0) {
                (this.Width = t), (this.Height = e);
            }
        }
        class g {
            constructor() {
                this.enabled = !0;
            }
        }
        class f extends g {
            constructor(t, e, s) {
                super(), (this.enabled = !0), (this.pos = t), (this.size = e), (this.color = s);
            }
            Draw(t, e, s) {
                t || (t = new m(0, 0)), e || s || ((t = new d(this.pos.X + t.Width, this.pos.Y + t.Height)), (e = this.size), (s = this.color));
                const i = e.Width / 1280,
                    n = e.Height / 720,
                    h = t.X / 1280 + 0.5 * i,
                    o = t.Y / 720 + 0.5 * n;
                mp.game.graphics.drawRect(h, o, i, n, s.R, s.G, s.B, s.A);
            }
        }
        class _ extends f {
            constructor(t, e, s) {
                super(t, e, s);
            }
            Draw(t, e, s) {
                t || (t = new m()), !t || e || s || ((t = new d(this.pos.X + t.Width, this.pos.Y + t.Height)), (e = this.size), (s = this.color));
                const i = 1080 * (l.width / (l.height * l.ar)),
                    n = e.Width / i,
                    h = e.Height / 1080,
                    o = t.X / i + 0.5 * n,
                    r = t.Y / 1080 + 0.5 * h;
                mp.game.graphics.drawRect(o, r, n, h, s.R, s.G, s.B, s.A);
            }
        }
        class I extends g {
            constructor(t, e, s, i, n, h) {
                super(), (this.caption = t), (this.pos = e), (this.scale = s), (this.color = i || new r(255, 255, 255, 255)), (this.font = n || 0), (this.centered = h || !1);
            }
            Draw(t, e, s, i, n, h) {
                !t || e || s || i || n || h || ((e = new d(this.pos.X + t.Width, this.pos.Y + t.Height)), (s = this.scale), (i = this.color), (n = this.font), (h = this.centered));
                const o = e.X / 1280,
                    r = e.Y / 720;
                mp.game.ui.setTextFont(parseInt(n)), mp.game.ui.setTextScale(s, s), mp.game.ui.setTextColour(i.R, i.G, i.B, i.A), mp.game.ui.setTextCentre(h), mp.game.ui.setTextEntry("STRING"), w.AddLongString(t), mp.game.ui.drawText(o, r);
            }
        }
        var p;
        (exports = I),
            (function (t) {
                (t[(t.Left = 0)] = "Left"), (t[(t.Centered = 1)] = "Centered"), (t[(t.Right = 2)] = "Right");
            })(p || (p = {}));
        class w extends I {
            constructor(t, e, s, i, n, h) {
                super(t, e, s, i || new r(255, 255, 255), n || 0, !1), (this.TextAlignment = p.Left), h && (this.TextAlignment = h);
            }
            Draw(t, e, s, i, n, h, o, r, a) {
                let c = t,
                    u = h,
                    g = h;
                t || (t = new m(0, 0)),
                    t &&
                        !e &&
                        ((g = this.TextAlignment),
                        (c = this.caption),
                        (e = new d(this.pos.X + t.Width, this.pos.Y + t.Height)),
                        (s = this.scale),
                        (i = this.color),
                        (n = this.font),
                        1 == u || 0 == u ? (u = this.centered) : ((u = void 0), (o = this.DropShadow), (r = this.Outline), (a = this.WordWrap)));
                const f = 1080 * (l.width / (l.height * l.ar)),
                    _ = this.pos.X / f,
                    I = this.pos.Y / 1080;
                if ((mp.game.ui.setTextFont(parseInt(n)), mp.game.ui.setTextScale(1, s), mp.game.ui.setTextColour(i.R, i.G, i.B, i.A), void 0 !== u)) mp.game.ui.setTextCentre(u);
                else {
                    switch ((o && mp.game.ui.setTextDropshadow(2, 0, 0, 0, 0), r && console.warn("not working!"), g)) {
                        case p.Centered:
                            mp.game.ui.setTextCentre(!0);
                            break;
                        case p.Right:
                            mp.game.ui.setTextRightJustify(!0), mp.game.ui.setTextWrap(0, _);
                    }
                    if (a) {
                        const t = (this.pos.X + a.Width) / f;
                        mp.game.ui.setTextWrap(_, t);
                    }
                }
                if (c.length > 99) {
                    mp.game.ui.setTextEntry("jamyfafi"), w.AddLongString(c), mp.game.ui.drawText(_, I);
                }
                else {
                    mp.game.ui.setTextEntry("STRING"), w.AddLongString(c), mp.game.ui.drawText(_, I);
                }
            }
            static AddLongString(t) {
                for (let e = 0, tm = t.length; e < tm; e += 95) {
                    const s = t.substr(e, Math.min(95, tm - e));
                    mp.game.ui.addTextComponentSubstringPlayerName(s);
                }
            }
        }
        function x() {
            var t,
                e = "";
            for (t = 0; t < 32; t += 1)
                switch (t) {
                    case 8:
                    case 20:
                        (e += "-"), (e += ((16 * Math.random()) | 0).toString(16));
                        break;
                    case 12:
                        (e += "-"), (e += "4");
                        break;
                    case 16:
                        (e += "-"), (e += ((4 * Math.random()) | 8).toString(16));
                        break;
                    default:
                        e += ((16 * Math.random()) | 0).toString(16);
                }
            return e;
        }
        class S {
            constructor(t, e = "") {
                let color1 = S.DefaultBackColor;
                let color2 = S.DefaultHighlightedBackColor;
                let color3 = S.DefaultForeColor;
                let color4 = S.DefaultHighlightedForeColor;

                if (t === "Cerrar" || t === "Cerrar menú" || t === "Cancelar") {
                    color2 = r.Rojo;
                    color3 = r.Rojo;
                    color4 = r.Black;
                } else if (t === "Volver") {
                    color2 = r.Naranja;
                    color3 = r.Naranja;
                    color4 = r.Black;
                }

                (this.Id = x()),
                    (this.BackColor = color1),
                    (this.HighlightedBackColor = color2),
                    (this.ForeColor = color3),
                    (this.HighlightedForeColor = color4),
                    (this.RightLabel = ""),
                    (this.LeftBadge = h.None),
                    (this.RightBadge = h.None),
                    (this.Enabled = !0),
                    (this._rectangle = new _(new d(0, 0), new m(431, 38), new r(150, 0, 0, 0))),
                    (this._text = new w(t, new d(8, 0), 0.33, r.WhiteSmoke, o.ChaletLondon, p.Left)),
                    (this.Description = e),
                    (this._selectedSprite = new c("commonmenu", "gradient_nav", new d(0, 0), new m(431, 38))),
                    (this._badgeLeft = new c("commonmenu", "", new d(0, 0), new m(40, 40))),
                    (this._badgeRight = new c("commonmenu", "", new d(0, 0), new m(40, 40))),
                    (this._labelText = new w("", new d(0, 0), 0.35, r.White, 0, p.Right));
            }
            get Text() {
                return this._text.caption;
            }
            set Text(t) {
                this._text.caption = t;
            }
            SetVerticalPosition(t) {
                (this._rectangle.pos = new d(this.Offset.X, t + 144 + this.Offset.Y)),
                    (this._selectedSprite.pos = new d(0 + this.Offset.X, t + 144 + this.Offset.Y)),
                    (this._text.pos = new d(8 + this.Offset.X, t + 147 + this.Offset.Y)),
                    (this._badgeLeft.pos = new d(0 + this.Offset.X, t + 142 + this.Offset.Y)),
                    (this._badgeRight.pos = new d(385 + this.Offset.X, t + 142 + this.Offset.Y)),
                    (this._labelText.pos = new d(420 + this.Offset.X, t + 148 + this.Offset.Y));
            }
            addEvent(t, ...e) {
                this._event = { event: t, args: e };
            }
            fireEvent() {
                this._event && mp.events.call(this._event.event, this, ...this._event.args);
            }
            Draw() {
                (this._rectangle.size = new m(431 + this.Parent.WidthOffset, 38)),
                    (this._selectedSprite.size = new m(431 + this.Parent.WidthOffset, 38)),
                    this.Hovered && !this.Selected && ((this._rectangle.color = new r(255, 255, 255, 20)), this._rectangle.Draw()),
                    (this._selectedSprite.color = this.Selected ? this.HighlightedBackColor : this.BackColor),
                    this._selectedSprite.Draw(),
                    (this._text.color = this.Enabled ? (this.Selected ? this.HighlightedForeColor : this.ForeColor) : new r(163, 159, 148)),
                    this.LeftBadge != h.None
                        ? ((this._text.pos = new d(35 + this.Offset.X, this._text.pos.Y)),
                          (this._badgeLeft.TextureDict = this.BadgeToSpriteLib(this.LeftBadge)),
                          (this._badgeLeft.TextureName = this.BadgeToSpriteName(this.LeftBadge, this.Selected)),
                          (this._badgeLeft.color = this.IsBagdeWhiteSprite(this.LeftBadge) ? (this.Enabled ? (this.Selected ? this.HighlightedForeColor : this.ForeColor) : new r(163, 159, 148)) : r.White),
                          this._badgeLeft.Draw())
                        : (this._text.pos = new d(8 + this.Offset.X, this._text.pos.Y)),
                    this.RightBadge != h.None &&
                        ((this._badgeRight.pos = new d(385 + this.Offset.X + this.Parent.WidthOffset, this._badgeRight.pos.Y)),
                        (this._badgeRight.TextureDict = this.BadgeToSpriteLib(this.RightBadge)),
                        (this._badgeRight.TextureName = this.BadgeToSpriteName(this.RightBadge, this.Selected)),
                        (this._badgeRight.color = this.IsBagdeWhiteSprite(this.RightBadge) ? (this.Enabled ? (this.Selected ? this.HighlightedForeColor : this.ForeColor) : new r(163, 159, 148)) : r.White),
                        this._badgeRight.Draw()),
                    this.RightLabel &&
                        "" !== this.RightLabel &&
                        ((this._labelText.pos = new d(420 + this.Offset.X + this.Parent.WidthOffset, this._labelText.pos.Y)),
                        (this._labelText.caption = this.RightLabel),
                        (this._labelText.color = this._text.color = this.Enabled ? (this.Selected ? this.HighlightedForeColor : this.ForeColor) : new r(163, 159, 148)),
                        this._labelText.Draw()),
                    this._text.Draw();
            }
            SetLeftBadge(t) {
                this.LeftBadge = t;
            }
            SetRightBadge(t) {
                this.RightBadge = t;
            }
            SetRightLabel(t) {
                this.RightLabel = t;
            }
            BadgeToSpriteLib(t) {
                return "commonmenu";
            }
            BadgeToSpriteName(t, e) {
                switch (t) {
                    case h.None:
                        return "";
                    case h.BronzeMedal:
                        return "mp_medal_bronze";
                    case h.GoldMedal:
                        return "mp_medal_gold";
                    case h.SilverMedal:
                        return "medal_silver";
                    case h.Alert:
                        return "mp_alerttriangle";
                    case h.Crown:
                        return "mp_hostcrown";
                    case h.Ammo:
                        return e ? "shop_ammo_icon_b" : "shop_ammo_icon_a";
                    case h.Armour:
                        return e ? "shop_armour_icon_b" : "shop_armour_icon_a";
                    case h.Barber:
                        return e ? "shop_barber_icon_b" : "shop_barber_icon_a";
                    case h.Clothes:
                        return e ? "shop_clothing_icon_b" : "shop_clothing_icon_a";
                    case h.Franklin:
                        return e ? "shop_franklin_icon_b" : "shop_franklin_icon_a";
                    case h.Bike:
                        return e ? "shop_garage_bike_icon_b" : "shop_garage_bike_icon_a";
                    case h.Car:
                        return e ? "shop_garage_icon_b" : "shop_garage_icon_a";
                    case h.Gun:
                        return e ? "shop_gunclub_icon_b" : "shop_gunclub_icon_a";
                    case h.Heart:
                        return e ? "shop_health_icon_b" : "shop_health_icon_a";
                    case h.Lock:
                        return "shop_lock";
                    case h.Makeup:
                        return e ? "shop_makeup_icon_b" : "shop_makeup_icon_a";
                    case h.Mask:
                        return e ? "shop_mask_icon_b" : "shop_mask_icon_a";
                    case h.Michael:
                        return e ? "shop_michael_icon_b" : "shop_michael_icon_a";
                    case h.Star:
                        return "shop_new_star";
                    case h.Tatoo:
                        return e ? "shop_tattoos_icon_b" : "shop_tattoos_icon_";
                    case h.Tick:
                        return "shop_tick_icon";
                    case h.Trevor:
                        return e ? "shop_trevor_icon_b" : "shop_trevor_icon_a";
                    default:
                        return "";
                }
            }
            IsBagdeWhiteSprite(t) {
                switch (t) {
                    case h.Lock:
                    case h.Tick:
                    case h.Crown:
                        return !0;
                    default:
                        return !1;
                }
            }
            BadgeToColor(t, e) {
                switch (t) {
                    case h.Lock:
                    case h.Tick:
                    case h.Crown:
                        return e ? new r(255, 0, 0, 0) : new r(255, 255, 255, 255);
                    default:
                        return new r(255, 255, 255, 255);
                }
            }
        }
        (S.DefaultBackColor = r.Empty), (S.DefaultHighlightedBackColor = r.White), (S.DefaultForeColor = r.WhiteSmoke), (S.DefaultHighlightedForeColor = r.Black);
        class M extends S {
            constructor(t, e = !1, s = "") {
                super(t, s), (this.OnCheckedChanged = new u()), (this.Checked = !1);
                (this._checkedSprite = new c("commonmenu", "shop_box_blank", new d(410, 95), new m(50, 50))), (this.Checked = e);
            }
            get CheckedChanged() {
                return this.OnCheckedChanged.expose();
            }
            SetVerticalPosition(t) {
                super.SetVerticalPosition(t), (this._checkedSprite.pos = new d(380 + this.Offset.X + this.Parent.WidthOffset, t + 138 + this.Offset.Y));
            }
            Draw() {
                super.Draw(), (this._checkedSprite.pos = this._checkedSprite.pos = new d(380 + this.Offset.X + this.Parent.WidthOffset, this._checkedSprite.pos.Y));
                const t = this.HighlightedForeColor == S.DefaultHighlightedForeColor;
                this.Selected && t ? (this._checkedSprite.TextureName = this.Checked ? "shop_box_tickb" : "shop_box_blankb") : (this._checkedSprite.TextureName = this.Checked ? "shop_box_tick" : "shop_box_blank"),
                    (this._checkedSprite.color = this.Enabled ? (this.Selected && !t ? this.HighlightedForeColor : this.ForeColor) : new r(163, 159, 148)),
                    this._checkedSprite.Draw();
            }
            SetRightBadge(t) {
                return this;
            }
            SetRightLabel(t) {
                return this;
            }
        }
        class C {
            constructor(t = "", e = null) {
                (this.Id = x()), (this.DisplayText = t), (this.Data = e);
            }
        }
        class O {
            constructor(t) {
                if (0 === t.length) throw new Error("ItemsCollection cannot be empty");
                this.items = t;
            }
            length() {
                return this.items.length;
            }
            getListItems() {
                const t = [];
                for (const e of this.items) e instanceof C ? t.push(e) : "string" == typeof e && t.push(new C(e.toString()));
                return t;
            }
        }
        class D {
            static MeasureStringWidthNoConvert(t) {
                return mp.game.ui.setTextEntryForWidth("STRING"), w.AddLongString(t), mp.game.ui.setTextFont(0), mp.game.ui.setTextScale(0.35, 0.35), mp.game.ui.getTextScreenWidth(!1);
            }
            static MeasureString(t) {
                const e = 1080 * (l.width / (l.height * l.ar));
                return this.MeasureStringWidthNoConvert(t) * e;
            }
        }
        class R extends S {
            constructor(t, e = "", s = new O([]), i = 0) {
                super(t, e), (this.currOffset = 0), (this.collection = []), (this.ScrollingEnabled = !0), (this.HoldTimeBeforeScroll = 200), (this.OnListChanged = new u()), (this._index = 0);
                (this.Collection = s.getListItems()),
                    (this.Index = i),
                    (this._arrowLeft = new c("commonmenu", "arrowleft", new d(110, 105), new m(30, 30))),
                    (this._arrowRight = new c("commonmenu", "arrowright", new d(280, 105), new m(30, 30))),
                    (this._itemText = new w("", new d(290, 104), 0.35, r.White, o.ChaletLondon, p.Right));
            }
            get Collection() {
                return this.collection;
            }
            set Collection(t) {
                if (!t) throw new Error("The collection can't be null");
                this.collection = t;
            }
            set SelectedItem(t) {
                const e = this.Collection.findIndex((e) => e.Id === t.Id);
                this.Index = e > 0 ? e : 0;
            }
            get SelectedItem() {
                return this.Collection.length > 0 ? this.Collection[this.Index] : null;
            }
            get SelectedValue() {
                return null == this.SelectedItem ? null : null == this.SelectedItem.Data ? this.SelectedItem.DisplayText : this.SelectedItem.Data;
            }
            get ListChanged() {
                return this.OnListChanged.expose();
            }
            get Index() {
                return null == this.Collection ? -1 : null != this.Collection && 0 == this.Collection.length ? -1 : this._index % this.Collection.length;
            }
            set Index(t) {
                if (null == this.Collection) return;
                if (null != this.Collection && 0 == this.Collection.length) return;
                this._index = 1e5 - (1e5 % this.Collection.length) + t;
                const e = this.Collection.length >= this.Index ? this.Collection[this.Index].DisplayText : " ";
                this.currOffset = D.MeasureString(e);
            }
            setCollection(t) {
                this.Collection = t.getListItems();
            }
            setCollectionItem(t, e, s = !0) {
                if (t > this.Collection.length) throw new Error("Index out of bounds");
                "string" == typeof e && (e = new C(e)), this.Collection.splice(t, 1, e), s && (this.Index = 0);
            }
            SetVerticalPosition(t) {
                (this._arrowLeft.pos = new d(300 + this.Offset.X + this.Parent.WidthOffset, 147 + t + this.Offset.Y)),
                    (this._arrowRight.pos = new d(400 + this.Offset.X + this.Parent.WidthOffset, 147 + t + this.Offset.Y)),
                    (this._itemText.pos = new d(300 + this.Offset.X + this.Parent.WidthOffset, t + 147 + this.Offset.Y)),
                    super.SetVerticalPosition(t);
            }
            SetRightLabel(t) {
                return this;
            }
            SetRightBadge(t) {
                return this;
            }
            Draw() {
                super.Draw();
                const t = this.Collection.length >= this.Index ? this.Collection[this.Index].DisplayText : " ",
                    e = this.currOffset;
                (this._itemText.color = this.Enabled ? (this.Selected ? this.HighlightedForeColor : this.ForeColor) : new r(163, 159, 148)),
                    (this._itemText.caption = t),
                    (this._arrowLeft.color = this.Enabled ? (this.Selected ? this.HighlightedForeColor : this.ForeColor) : new r(163, 159, 148)),
                    (this._arrowRight.color = this.Enabled ? (this.Selected ? this.HighlightedForeColor : this.ForeColor) : new r(163, 159, 148)),
                    (this._arrowLeft.pos = new d(375 - e + this.Offset.X + this.Parent.WidthOffset, this._arrowLeft.pos.Y)),
                    this.Selected
                        ? (this._arrowLeft.Draw(), this._arrowRight.Draw(), (this._itemText.pos = new d(405 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y)))
                        : (this._itemText.pos = new d(420 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y)),
                    this._itemText.Draw();
            }
        }
        class b extends S {
            get Index() {
                return this._index % this._items.length;
            }
            set Index(t) {
                this._index = 1e8 - (1e8 % this._items.length) + t;
            }
            constructor(t, e, s, i = "", n = !1) {
                super(t, i);
                (this._items = e),
                    (this._arrowLeft = new c("commonmenutu", "arrowleft", new d(0, 105), new m(15, 15))),
                    (this._arrowRight = new c("commonmenutu", "arrowright", new d(0, 105), new m(15, 15))),
                    (this._rectangleBackground = new _(new d(0, 0), new m(150, 9), new r(4, 32, 57, 255))),
                    (this._rectangleSlider = new _(new d(0, 0), new m(75, 9), new r(57, 116, 200, 255))),
                    (this._rectangleDivider = new _(new d(0, 0), new m(2.5, 20), n ? r.WhiteSmoke : r.Transparent)),
                    (this.Index = s);
            }
            SetVerticalPosition(t) {
                (this._rectangleBackground.pos = new d(250 + this.Offset.X + this.Parent.WidthOffset, t + 158.5 + this.Offset.Y)),
                    (this._rectangleSlider.pos = new d(250 + this.Offset.X + this.Parent.WidthOffset, t + 158.5 + this.Offset.Y)),
                    (this._rectangleDivider.pos = new d(323.5 + this.Offset.X + this.Parent.WidthOffset, t + 153 + this.Offset.Y)),
                    (this._arrowLeft.pos = new d(235 + this.Offset.X + this.Parent.WidthOffset, 155.5 + t + this.Offset.Y)),
                    (this._arrowRight.pos = new d(400 + this.Offset.X + this.Parent.WidthOffset, 155.5 + t + this.Offset.Y)),
                    super.SetVerticalPosition(t);
            }
            IndexToItem(t) {
                return this._items[t];
            }
            Draw() {
                super.Draw(),
                    (this._arrowLeft.color = this.Enabled ? (this.Selected ? r.Black : r.WhiteSmoke) : new r(163, 159, 148)),
                    (this._arrowRight.color = this.Enabled ? (this.Selected ? r.Black : r.WhiteSmoke) : new r(163, 159, 148));
                let t = ((this._rectangleBackground.size.Width - this._rectangleSlider.size.Width) / (this._items.length - 1)) * this.Index;
                (this._rectangleSlider.pos = new d(250 + this.Offset.X + t + +this.Parent.WidthOffset, this._rectangleSlider.pos.Y)),
                    this.Selected && (this._arrowLeft.Draw(), this._arrowRight.Draw()),
                    this._rectangleBackground.Draw(),
                    this._rectangleSlider.Draw(),
                    this._rectangleDivider.Draw();
            }
            SetRightBadge(t) {}
            SetRightLabel(t) {}
        }
        class T extends f {
            constructor(t, e, s) {
                super(t, e, s), (this.Items = []);
            }
            addItem(t) {
                this.Items.push(t);
            }
            Draw(t) {
                if (!this.enabled) return;
                t = t || new m();
                const e = 1080 * (l.width / (l.height * l.ar)),
                    s = this.size.Width / e,
                    i = this.size.Height / 1080,
                    n = (this.pos.X + t.Width) / e + 0.5 * s,
                    h = (this.pos.Y + t.Height) / 1080 + 0.5 * i;
                for (var o of (mp.game.graphics.drawRect(n, h, s, i, this.color.R, this.color.G, this.color.B, this.color.A), this.Items)) o.Draw(new m(this.pos.X + t.Width, this.pos.Y + t.Height));
            }
        }
        class v {
            static PlaySound(t, e) {
                mp.game.audio.playSound(-1, t, e, !1, 0, !0);
            }
        }
        s.d(e, "default", function () {
            return L;
        });
        class L {
            constructor(t, e, s, a, j, i, n, ultimoMenuBack = false) {
                let errorMsg = null;
                if (typeof t !== "string") {
                    errorMsg = { string: "El título introducido no es un 'string'", stop: true };
                }
                else if (typeof e !== "string") {
                    errorMsg = { string: "La descripción introducida no es un 'string'", stop: true };
                }
                else if (typeof s !== "object") {
                    errorMsg = { string: "La posición introducida no es un 'Point'", stop: true };
                }
                else if (typeof a !== "object") {
                    errorMsg = { string: "El color1 introducido no es un 'Color'", stop: true };
                }
                else if (typeof j !== "object") {
                    errorMsg = { string: "El color2 introducido no es un 'Color'", stop: true };
                }
                else if (typeof n !== "string") {
                    errorMsg = { string: "El sprite introducido no es un 'string'", stop: true };
                }
                else if (typeof i !== "string") {
                    errorMsg = { string: "La librería introducida no es un 'string'", stop: true };
                }
                else {
                    let count = 0;
                    if (!mp.game.graphics.hasStreamedTextureDictLoaded(i)) {
                        mp.game.graphics.requestStreamedTextureDict(i, true);
                        while (!mp.game.graphics.hasStreamedTextureDictLoaded(i)) {
                            count++;
                            if (count >= 500) {
                                errorMsg = { string: "No se ha podido cargar la libreria, usando por defecto.", stop: false };

                                // Si las que no ha podido cargar son nuestras texturas de lurpprop, entonces le establecemos por defecto las normales de nativeui
                                if (i == "texturas_menus" || n == "textura_menu") {
                                    defaultLib = "commonmenu";
                                    defaultSpr = "interaction_bgd";
                                }

                                i = "commonmenu";
                                n = "interaction_bgd";
                                break;
                            }
                            mp.game.wait(0);
                        }
                    }
                }

                if (errorMsg != null) {
                    mp.gui.chat.push("!{red}[ERROR NATIVEUI]: !{white}" + errorMsg.string);
                    logError("NATIVEUI: " + errorMsg.string);
                    if (errorMsg.stop == true) {
                        return new L("~r~Menú genérico", "~r~Error al crear el menú", new d(50, 50), r.Black, r.White, "commonmenu", "interaction_bgd");
                    }
                }

                res = mp.game.graphics.getScreenActiveResolution(0, 0);
                asrt = (res.x / res.y) / (16 / 9);
                l = { width: res.x, height: res.y, ar: asrt };

                mp.gui.cursor.visible = false;
                mp.gui.chat.show(false);
                menuAbierto = true;
                bloquearTeclas(true);

                (this.Id = x()),
                    (this.ultimoMenuBack = ultimoMenuBack),
                    (this.counterPretext = ""),
                    (this.counterOverride = void 0),
                    (this.lastUpDownNavigation = 0),
                    (this.lastLeftRightNavigation = 0),
                    (this._activeItem = 1e3),
                    (this.extraOffset = 0),
                    (this.WidthOffset = 0),
                    (this.Visible = !0),
                    (this.MouseControlsEnabled = !1),
                    (this._justOpened = !0),
                    (this.safezoneOffset = new d(0, 0)),
                    (this.MaxItemsOnScreen = 9),
                    (this._maxItem = this.MaxItemsOnScreen),
                    (this.AUDIO_LIBRARY = "HUD_FRONTEND_DEFAULT_SOUNDSET"),
                    (this.AUDIO_UPDOWN = "NAV_UP_DOWN"),
                    (this.AUDIO_LEFTRIGHT = "NAV_LEFT_RIGHT"),
                    (this.AUDIO_SELECT = "SELECT"),
                    (this.AUDIO_BACK = "BACK"),
                    (this.AUDIO_ERROR = "ERROR"),
                    (this.MenuItems = []),
                    (this.IndexChange = new u()),
                    (this.ListChange = new u()),
                    (this.SliderChange = new u()),
                    (this.SliderSelect = new u()),
                    (this.CheckboxChange = new u()),
                    (this.ItemSelect = new u()),
                    (this.MenuClose = new u()),
                    (this.MenuChange = new u()),
                    (this.MouseEdgeEnabled = !0),
                    s instanceof d || (s = d.Parse(s)),
                    (this.title = t),
                    (this.subtitle = e),
                    (this.subtitleColor = a || r.Negro),
                    (this.subtitleLettersColor = j || r.White),
                    (this.spriteLibrary = i || "texturas_menus"), // "commonmenu" - diccionario por defecto
                    (this.spriteName = n || "textura_menu"), // "interaction_bgd" - textura por defecto
                    (this.offset = new d(s.X, s.Y)),
                    (this.Children = new Map()),
                    (this._mainMenu = new T(new d(0, 0), new m(700, 500), new r(0, 0, 0, 0))),
                    (this._logo = new c(this.spriteLibrary, this.spriteName, new d(0 + this.offset.X, 0 + this.offset.Y), new m(431, 107))),
                    this._mainMenu.addItem((this._title = new w(this.title, new d(215 + this.offset.X, 20 + this.offset.Y), 1.15, new r(255, 255, 255), 6, p.Centered))), // 1 = fuente del titulo
                    "" !== this.subtitle &&
                        (this._mainMenu.addItem(new _(new d(0 + this.offset.X, 107 + this.offset.Y), new m(431, 37), this.subtitleColor)),
                        this._mainMenu.addItem((this._subtitle = new w(this.subtitle, new d(8 + this.offset.X, 110 + this.offset.Y), 0.35, this.subtitleLettersColor, 0, p.Left))),
                        this.subtitle.startsWith("~") && (this.counterPretext = this.subtitle.substr(0, 3)),
                        (this._counterText = new w("", new d(425 + this.offset.X, 110 + this.offset.Y), 0.35, new r(255, 255, 255), 0, p.Right)),
                        (this.extraOffset += 37)),
                    (this._upAndDownSprite = new c("commonmenu", "shop_arrows_upanddown", new d(190 + this.offset.X, 147 + 37 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new m(50, 50))),
                    (this._extraRectangleUp = new _(new d(0 + this.offset.X, 144 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new m(431, 18), new r(0, 0, 0, 200))),
                    (this._extraRectangleDown = new _(new d(0 + this.offset.X, 162 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new m(431, 18), new r(0, 0, 0, 200))),
                    (this._descriptionBar = new _(new d(this.offset.X, 123), new m(431, 4), r.Black)),
                    (this._descriptionRectangle = new c("commonmenu", "gradient_bgd", new d(this.offset.X, 127), new m(431, 30))),
                    (this._descriptionText = new w("Description", new d(this.offset.X + 5, 125), 0.35, new r(255, 255, 255, 255), o.ChaletLondon, p.Left)),
                    (this._background = new c("commonmenu", "gradient_bgd", new d(this.offset.X, 144 + this.offset.Y - 37 + this.extraOffset), new m(290, 25))),
                    (this.renderActivo = this.render.bind(this)),
                    mp.events.add("render", this.renderActivo);
            }
            get CurrentSelection() {
                return this._activeItem % this.MenuItems.length;
            }
            set CurrentSelection(t) {
                (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1),
                    (this._activeItem = 1e3 - (1e3 % this.MenuItems.length) + t),
                    this.CurrentSelection > this._maxItem
                        ? ((this._maxItem = this.CurrentSelection), (this._minItem = this.CurrentSelection - this.MaxItemsOnScreen))
                        : this.CurrentSelection < this._minItem && ((this._maxItem = this.MaxItemsOnScreen + this.CurrentSelection), (this._minItem = this.CurrentSelection));
            }
            RecalculateDescriptionPosition() {
                (this._descriptionBar.pos = new d(this.offset.X, 112 + this.extraOffset + this.offset.Y)),
                    (this._descriptionRectangle.pos = new d(this.offset.X, 112 + this.extraOffset + this.offset.Y)),
                    (this._descriptionText.pos = new d(this.offset.X + 8, 118 + this.extraOffset + this.offset.Y)),
                    (this._descriptionBar.size = new m(431 + this.WidthOffset, 4)),
                    (this._descriptionRectangle.size = new m(431 + this.WidthOffset, 30));
                let t = this.MenuItems.length;
                t > this.MaxItemsOnScreen + 1 && (t = this.MaxItemsOnScreen + 2),
                    (this._descriptionBar.pos = new d(this.offset.X, 38 * t + this._descriptionBar.pos.Y)),
                    (this._descriptionRectangle.pos = new d(this.offset.X, 38 * t + this._descriptionRectangle.pos.Y)),
                    (this._descriptionText.pos = new d(this.offset.X + 8, 38 * t + this._descriptionText.pos.Y));
            }
            SetMenuWidthOffset(t) {
                if (
                    ((this.WidthOffset = t),
                    null != this._logo && (this._logo.size = new m(431 + this.WidthOffset, 107)),
                    (this._mainMenu.Items[0].pos = new d((this.WidthOffset + this.offset.X + 431) / 2, 20 + this.offset.Y)),
                    this._counterText && (this._counterText.pos = new d(425 + this.offset.X + t, 110 + this.offset.Y)),
                    this._mainMenu.Items.length >= 2)
                ) {
                    this._mainMenu.Items[1].size = new m(431 + this.WidthOffset, 37);
                }
            }
            AddItem(t) {
                this._justOpened && (this._justOpened = !1),
                    (t.Offset = this.offset),
                    (t.Parent = this),
                    t.SetVerticalPosition(25 * this.MenuItems.length - 37 + this.extraOffset),
                    this.MenuItems.push(t),
                    (t.Description = this.FormatDescription(t.Description)),
                    this.RefreshIndex(),
                    this.RecalculateDescriptionPosition();
            }
            RefreshIndex() {
                if (0 == this.MenuItems.length) return (this._activeItem = 1e3), (this._maxItem = this.MaxItemsOnScreen), void (this._minItem = 0);
                for (let t = 0; t < this.MenuItems.length; t++) this.MenuItems[t].Selected = !1;
                (this._activeItem = 1e3 - (1e3 % this.MenuItems.length)), (this._maxItem = this.MaxItemsOnScreen), (this._minItem = 0);
            }
            Clear() {
                (this.MenuItems = []), this.RecalculateDescriptionPosition();
            }
            Open() {
                v.PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY), (this.Visible = !0), (this._justOpened = !0);
                mp.gui.cursor.visible = false;
                mp.gui.chat.show(false);
                menuAbierto = true;
                bloquearTeclas(true);
                mp.events.add("render", this.renderActivo);
            }
            Close(otroMenu = false) {
                v.PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY), (this.Visible = !1), this.MenuClose.emit();
                mp.events.remove("render", this.renderActivo);

                bloquearTeclas(otroMenu);
                menuAbierto = otroMenu;
                mp.gui.chat.show(!otroMenu);
            }
            setVisible(bool, otroMenu = false) {
                if (typeof bool === "boolean" && bool != this.Visible) {
                    if (bool == false) {
                        this.Visible = !1;
                        mp.events.remove("render", this.renderActivo);
                        bloquearTeclas(otroMenu);
                        menuAbierto = otroMenu;
                        mp.gui.chat.show(!otroMenu);
                    }
                    else {
                        this.Visible = !0;
                        bloquearTeclas(otroMenu);
                        menuAbierto = otroMenu;
                        mp.gui.chat.show(!otroMenu);
                        mp.events.add("render", this.renderActivo);
                    }
                }
            }
            GoLeft() {
                if (this.MenuItems[this.CurrentSelection] instanceof R || this.MenuItems[this.CurrentSelection] instanceof b)
                    if (this.MenuItems[this.CurrentSelection] instanceof R) {
                        const t = this.MenuItems[this.CurrentSelection];
                        if (0 == t.Collection.length) return;
                        t.Index--, v.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.ListChange.emit(t, t.Index);
                    } else if (this.MenuItems[this.CurrentSelection] instanceof b) {
                        const t = this.MenuItems[this.CurrentSelection];
                        (t.Index = t.Index - 1), v.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.SliderChange.emit(t, t.Index, t.IndexToItem(t.Index));
                    }
            }
            GoRight() {
                if (this.MenuItems[this.CurrentSelection] instanceof R || this.MenuItems[this.CurrentSelection] instanceof b)
                    if (this.MenuItems[this.CurrentSelection] instanceof R) {
                        const t = this.MenuItems[this.CurrentSelection];
                        if (0 == t.Collection.length) return;
                        t.Index++, v.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.ListChange.emit(t, t.Index);
                    } else if (this.MenuItems[this.CurrentSelection] instanceof b) {
                        const t = this.MenuItems[this.CurrentSelection];
                        t.Index++, v.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.SliderChange.emit(t, t.Index, t.IndexToItem(t.Index));
                    }
            }
            SelectItem() {
                if (!this.MenuItems[this.CurrentSelection].Enabled) return void v.PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
                const t = this.MenuItems[this.CurrentSelection];
                if (this.MenuItems[this.CurrentSelection] instanceof M) (t.Checked = !t.Checked), v.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.CheckboxChange.emit(t, t.Checked);
                else if ((v.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.ItemSelect.emit(t, this.CurrentSelection), this.Children.has(t.Id))) {
                    const e = this.Children.get(t.Id);
                    (this.Visible = !1), (e.Visible = !0), (e._justOpened = !0), this.MenuChange.emit(e, !0);
                }
                t.fireEvent();
            }
            getMousePosition(t = !1) {
                const e = l.width,
                    s = l.height,
                    i = mp.gui.cursor.position;
                let [n, h] = [i[0], i[1]];
                return t && ([n, h] = [i[0] / e, i[1] / s]), [n, h];
            }
            GetScreenResolutionMantainRatio() {
                const t = l.width,
                    e = l.height;
                return new m(1080 * (t / (e * l.ar)), 1080);
            }
            IsMouseInBounds(t, e) {
                this.GetScreenResolutionMantainRatio();
                const [s, i] = this.getMousePosition();
                return s >= t.X && s <= t.X + e.Width && i > t.Y && i < t.Y + e.Height;
            }
            IsMouseInListItemArrows(t, e, s) {
                mp.game.invoke("0x54CE8AC98E120CAB", "jamyfafi"), mp.game.ui.addTextComponentSubstringPlayerName(t.Text);
                var i = this.GetScreenResolutionMantainRatio();
                var n = 1080 * (i.Width / (i.Height * l.ar));
                const h = 5 + mp.game.invokeFloat("0x85F061DA64ED2F67", false) * n * 0.35 + 10,
                    o = 431 - h;
                return this.IsMouseInBounds(e, new m(h, 38)) ? 1 : this.IsMouseInBounds(new d(e.X + h, e.Y), new m(o, 38)) ? 2 : 0;
            }
            ProcessMouse() {
                if (!this.Visible || this._justOpened || 0 == this.MenuItems.length || !this.MouseControlsEnabled) return void this.MenuItems.filter((t) => t.Hovered).forEach((t) => (t.Hovered = !1));
                mp.gui.cursor.visible || (mp.gui.cursor.visible = !0);
                let t = this.MenuItems.length - 1,
                    e = 0;
                this.MenuItems.length > this.MaxItemsOnScreen + 1 && (t = this._maxItem),
                    this.IsMouseInBounds(new d(0, 0), new m(30, 1080)) && this.MouseEdgeEnabled
                        ? (mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() + 5), mp.game.ui.setCursorSprite(6))
                        : this.IsMouseInBounds(new d(this.GetScreenResolutionMantainRatio().Width - 30, 0), new m(30, 1080)) && this.MouseEdgeEnabled
                        ? (mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() - 5), mp.game.ui.setCursorSprite(7))
                        : this.MouseEdgeEnabled && mp.game.ui.setCursorSprite(1);
                for (let i = this._minItem; i <= t; i++) {
                    let t = this.offset.X,
                        n = this.offset.Y + 144 - 37 + this.extraOffset + 38 * e,
                        h = 431 + this.WidthOffset;
                    const o = 38,
                        r = this.MenuItems[i];
                    if (this.IsMouseInBounds(new d(t, n), new m(h, o))) {
                        if (((r.Hovered = !0), mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24)))
                            if (r.Selected && r.Enabled)
                                if (this.MenuItems[i] instanceof R && this.IsMouseInListItemArrows(this.MenuItems[i], new d(t, n), 0) > 0) {
                                    switch (this.IsMouseInListItemArrows(this.MenuItems[i], new d(t, n), 0)) {
                                        case 1:
                                            v.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY), this.MenuItems[i].fireEvent(), this.ItemSelect.emit(this.MenuItems[i], i);
                                            break;
                                        case 2:
                                            var s = this.MenuItems[i];
                                            (null == s.Collection ? s.Items.Count : s.Collection.Count) > 0 && (s.Index++, v.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY), this.ListChange.emit(s, s.Index));
                                    }
                                } else this.SelectItem();
                            else
                                r.Selected
                                    ? !r.Enabled && r.Selected && v.PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY)
                                    : ((this.CurrentSelection = i), v.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY), this.IndexChange.emit(this.CurrentSelection), this.SelectItem());
                    } else r.Hovered = !1;
                    e++;
                }
                const i = 144 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset + this.safezoneOffset.Y,
                    n = this.safezoneOffset.X + this.offset.X;
                this.MenuItems.length <= this.MaxItemsOnScreen + 1 ||
                    (this.IsMouseInBounds(new d(n, i), new m(431 + this.WidthOffset, 18))
                        ? ((this._extraRectangleUp.color = new r(30, 30, 30, 255)),
                          (mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24)) && (this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoUpOverflow() : this.GoUp()))
                        : (this._extraRectangleUp.color = new r(0, 0, 0, 200)),
                    this.IsMouseInBounds(new d(n, i + 18), new m(431 + this.WidthOffset, 18))
                        ? ((this._extraRectangleDown.color = new r(30, 30, 30, 255)),
                          (mp.game.controls.isControlJustPressed(0, 24) || mp.game.controls.isDisabledControlJustPressed(0, 24)) && (this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoDownOverflow() : this.GoDown()))
                        : (this._extraRectangleDown.color = new r(0, 0, 0, 200)));
            }
            ProcessControl() {
                this.Visible &&
                    (this._justOpened
                        ? (this._justOpened = !1)
                        : (mp.game.controls.isControlJustReleased(0, 177) && this.GoBack(),
                          0 != this.MenuItems.length &&
                              (mp.game.controls.isControlPressed(0, 172) && this.lastUpDownNavigation + 120 < Date.now()
                                  ? ((this.lastUpDownNavigation = Date.now()), this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoUpOverflow() : this.GoUp())
                                  : mp.game.controls.isControlJustReleased(0, 172)
                                  ? (this.lastUpDownNavigation = 0)
                                  : mp.game.controls.isControlPressed(0, 173) && this.lastUpDownNavigation + 120 < Date.now()
                                  ? ((this.lastUpDownNavigation = Date.now()), this.MenuItems.length > this.MaxItemsOnScreen + 1 ? this.GoDownOverflow() : this.GoDown())
                                  : mp.game.controls.isControlJustReleased(0, 173)
                                  ? (this.lastUpDownNavigation = 0)
                                  : mp.game.controls.isControlPressed(0, 174) && this.lastLeftRightNavigation + 100 < Date.now()
                                  ? ((this.lastLeftRightNavigation = Date.now()), this.GoLeft())
                                  : mp.game.controls.isControlJustReleased(0, 174)
                                  ? (this.lastLeftRightNavigation = 0)
                                  : mp.game.controls.isControlPressed(0, 175) && this.lastLeftRightNavigation + 100 < Date.now()
                                  ? ((this.lastLeftRightNavigation = Date.now()), this.GoRight())
                                  : mp.game.controls.isControlJustReleased(0, 175)
                                  ? (this.lastLeftRightNavigation = 0)
                                  : mp.game.controls.isControlJustPressed(0, 201) && this.SelectItem())));
            }
            FormatDescription(t) {
                //t.length > 99 && (t = t.slice(0, 99)); //El corte a 99 chars se realizaba por usar .setTextEntry("STRING"), ahora con .setTextEntry("jamyfafi") el limite es mucho mayor
                const e = 480 + this.WidthOffset; // Define el ancho "aprovechable" de la caja de la descripcion
                let s = 0,
                    i = "";
                const n = t.split(" ");
                for (const t of n) {
                    const n = D.MeasureString(t);
                    (s += n) > e ? ((i += "\n" + t + " "), (s = n + D.MeasureString(" "))) : ((i += t + " "), (s += D.MeasureString(" ")));
                }
                return i;
            }
            GoUpOverflow() {
                this.MenuItems.length <= this.MaxItemsOnScreen + 1 ||
                    (this._activeItem % this.MenuItems.length <= this._minItem
                        ? this._activeItem % this.MenuItems.length == 0
                            ? ((this._minItem = this.MenuItems.length - this.MaxItemsOnScreen - 1),
                              (this._maxItem = this.MenuItems.length - 1),
                              (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1),
                              (this._activeItem = 1e3 - (1e3 % this.MenuItems.length)),
                              (this._activeItem += this.MenuItems.length - 1),
                              (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0))
                            : (this._minItem--, this._maxItem--, (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1), this._activeItem--, (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0))
                        : ((this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1), this._activeItem--, (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0)),
                    v.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY),
                    this.IndexChange.emit(this.CurrentSelection));
            }
            GoUp() {
                this.MenuItems.length > this.MaxItemsOnScreen + 1 ||
                    ((this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1),
                    this._activeItem--,
                    (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0),
                    v.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY),
                    this.IndexChange.emit(this.CurrentSelection));
            }
            GoDownOverflow() {
                this.MenuItems.length <= this.MaxItemsOnScreen + 1 ||
                    (this._activeItem % this.MenuItems.length >= this._maxItem
                        ? this._activeItem % this.MenuItems.length == this.MenuItems.length - 1
                            ? ((this._minItem = 0),
                              (this._maxItem = this.MaxItemsOnScreen),
                              (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1),
                              (this._activeItem = 1e3 - (1e3 % this.MenuItems.length)),
                              (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0))
                            : (this._minItem++, this._maxItem++, (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1), this._activeItem++, (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0))
                        : ((this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1), this._activeItem++, (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0)),
                    v.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY),
                    this.IndexChange.emit(this.CurrentSelection));
            }
            GoDown() {
                this.MenuItems.length > this.MaxItemsOnScreen + 1 ||
                    ((this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !1),
                    this._activeItem++,
                    (this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0),
                    v.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY),
                    this.IndexChange.emit(this.CurrentSelection));
            }
            GoBack() {
                v.PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY),
                    (this.Visible = !1),
                    null != this.ParentMenu && ((this.ParentMenu.Visible = !0), (this.ParentMenu._justOpened = !0), this.MenuChange.emit(this.ParentMenu, !1)),
                    this.MenuClose.emit();
                mp.events.remove("render", this.renderActivo);

                bloquearTeclas(this.ultimoMenuBack);
                menuAbierto = this.ultimoMenuBack;
                mp.gui.chat.show(!this.ultimoMenuBack);
            }
            BindMenuToItem(t, e) {
                (t.ParentMenu = this), (t.ParentItem = e), this.Children.set(e.Id, t);
            }
            ReleaseMenuFromItem(t) {
                if (!this.Children.has(t.Id)) return !1;
                const e = this.Children.get(t.Id);
                return (e.ParentItem = null), (e.ParentMenu = null), this.Children.delete(t.Id), !0;
            }
            render() {
                if (this.Visible) {
                    if (
                        (this._justOpened &&
                            (null == this._logo || this._logo.IsTextureDictionaryLoaded || this._logo.LoadTextureDictionary(),
                                this._background.IsTextureDictionaryLoaded || this._background.LoadTextureDictionary(),
                                this._descriptionRectangle.IsTextureDictionaryLoaded || this._descriptionRectangle.LoadTextureDictionary(),
                                this._upAndDownSprite.IsTextureDictionaryLoaded || this._upAndDownSprite.LoadTextureDictionary()),
                            this._mainMenu.Draw(),
                            this.ProcessMouse(),
                            this.ProcessControl(),
                            (this._background.size = this.MenuItems.length > this.MaxItemsOnScreen + 1 ? new m(431 + this.WidthOffset, 38 * (this.MaxItemsOnScreen + 1)) : new m(431 + this.WidthOffset, 38 * this.MenuItems.length)),
                            this._background.Draw(),
                            this.MenuItems.length > 0 && ((this.MenuItems[this._activeItem % this.MenuItems.length].Selected = !0), "" !== this.MenuItems[this._activeItem % this.MenuItems.length].Description.trim()))
                    ) {
                        this.RecalculateDescriptionPosition();
                        let t = this.MenuItems[this._activeItem % this.MenuItems.length].Description;
                        this._descriptionText.caption = t;
                        const e = this._descriptionText.caption.split("\n").length;
                        (this._descriptionRectangle.size = new m(431 + this.WidthOffset, 25 * e + 15)), this._descriptionBar.Draw(), this._descriptionRectangle.Draw(), this._descriptionText.Draw();
                    }
                    if (this.MenuItems.length <= this.MaxItemsOnScreen + 1) {
                        let t = 0;
                        for (const e of this.MenuItems) e.SetVerticalPosition(38 * t - 37 + this.extraOffset), e.Draw(), t++;
                        this._counterText && this.counterOverride && ((this._counterText.caption = this.counterPretext + this.counterOverride), this._counterText.Draw());
                    } else {
                        let e = 0;
                        for (let s = this._minItem; s <= this._maxItem; s++) {
                            var t = this.MenuItems[s];
                            t.SetVerticalPosition(38 * e - 37 + this.extraOffset), t.Draw(), e++;
                        }
                        if (
                            ((this._extraRectangleUp.size = new m(431 + this.WidthOffset, 18)),
                                (this._extraRectangleDown.size = new m(431 + this.WidthOffset, 18)),
                                (this._upAndDownSprite.pos = new d(190 + this.offset.X + this.WidthOffset / 2, 147 + 37 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset)),
                                this._extraRectangleUp.Draw(),
                                this._extraRectangleDown.Draw(),
                                this._upAndDownSprite.Draw(),
                                this._counterText)
                        ) {
                            if (this.counterOverride) this._counterText.caption = this.counterPretext + this.counterOverride;
                            else {
                                const t = this.CurrentSelection + 1 + " / " + this.MenuItems.length;
                                this._counterText.caption = this.counterPretext + t;
                            }
                            this._counterText.Draw();
                        }
                    }
                    this._logo.Draw();
                }
            }
        }
        (exports.Menu = L),
            (exports.UIMenuItem = S),
            (exports.UIMenuListItem = R),
            (exports.UIMenuCheckboxItem = M),
            (exports.UIMenuSliderItem = b),
            (exports.BadgeStyle = h),
            (exports.Point = d),
            (exports.Size = m),
            (exports.Color = r),
            (exports.Font = o),
            (exports.ItemsCollection = O),
            (exports.ListItem = C);
    },
]);

}