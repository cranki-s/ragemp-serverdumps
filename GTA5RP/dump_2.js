{
    function a(b, c) {
        let d = Object.getOwnPropertyNames(c);
        for (let e, f = 0; f < d.length; f++) e = d[f], null == b[e] ? b[e] = c[e] : a(b[e], c[e])
    }
    const b = global.mp,
        c = require("./lang.js"),
        d = require("./i18n.js");
    d.init(c.LANGPACK[c.langCode]);
    var __ = d.__;
    const e = require("./rage-rpc.min.js");
    global.rpc = e;
    const f = b.events.callRemote,
        g = b.events.callRemoteUnreliable;
    Object.defineProperty(b.events, "callRemote", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: f
    }), Object.defineProperty(b.events, "callRemoteUnreliable", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: g
    });
    try {
        Object.defineProperty(global, "mp", {
            enumerable: !1,
            configurable: !0,
            writable: !0,
            value: b
        })
    } catch (a) {
        throw ""
    }
    let h = 0;
    b.events.add("guiReady", () => {
        b.game.gxt.set("PM_PAUSE_HDR", "GTA 5 RP"), b.game.gxt.set(1382984457, "\u0420\u0430\u0434\u0438\u043E PLAY - GTA 5 RP"), b.game.gameplay.disableAutomaticRespawn(!0), b.game.gameplay.ignoreNextRestart(!0), b.game.gameplay.setFadeInAfterDeathArrest(!1), b.game.gameplay.setFadeOutAfterDeath(!1), b.game.gameplay.setFadeInAfterLoad(!1), b.game.invoke("0xE6C0C80B8C867537", !0), b.game.invoke("0x3BC861DF703E5097"), b.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_01_STAGE", !1), b.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_02_MAIN_ROOM", !1), b.game.audio.setStaticEmitterEnabled("LOS_SANTOS_VANILLA_UNICORN_03_BACK_ROOM", !1), b.game.audio.stopAlarm("PORT_OF_LS_HEIST_FORT_ZANCUDO_ALARMS", !0), b.game.audio.stopAlarm("PRISON_ALARMS", !0)
    }), require("./Util/lz-string.js");
    b.clientEvCrypt = a => {
        let b = "",
            d = "ZGZKpZ6XsX9rRTBFcbV9SvpdrSX9QkFj";
        for (; d.length < a.length;) d += d;
        for (let c = 0; c < a.length; c++) {
            const e = a[c].charCodeAt(0),
                f = d[c].charCodeAt(0),
                g = (e ^ f).toString("16");
            b += g
        }
        return b
    }, b.isTestServer = !1, b.streamDist = 200, b.dummyEntityTypeTrain = 1e3;
    try {
        require("./randomData.js")
    } catch (a) {}
    b.api = {};
    const i = (a, c) => {
            const d = a.split(".");
            let e = b.api;
            for (let b = 0; b < d.length; b++) null == e[d[b]] ? b === d.length - 1 ? e[d[b]] = c : (e[d[b]] = {}, e = e[d[b]]) : e = e[d[b]]
        },
        j = (a, c) => {
            const d = a.split(".");
            let f = b.api;
            for (let b = 0; b < d.length; b++) null == f[d[b]] ? b === d.length - 1 ? (f[d[b]] = c, e.register("api." + a, a => c(...a))) : (f[d[b]] = {}, f = f[d[b]]) : f = f[d[b]]
        };
    i("server.getAsync", async (a, b) => {
        try {
            const c = await global.rpc.callServer(a, b);
            if (c.error) throw c.errorText;
            else return c.data
        } catch (a) {
            throw `${a}`
        }
    }), i("server.register", async (a, b) => {
        global.rpc.register(a, b)
    }), i("server.success", a => ({
        error: !1,
        data: a
    })), i("server.error", a => ({
        error: !0,
        errorText: "" + a
    })), i("server.getDollarsFromRubles", a => 100 * a), i("server.currencyFormatSpace", a => a.toString().split("").reverse().reduce(function (a, b, c) {
        return "-" == b ? a : b + (c && !(c % 3) ? " " : "") + a
    }, "")), i("server.strDecompress", a => global.lzString.decompressFromBase64(a)), i("server.tick", () => b.game1.time.serverTickCount), b.api.DirectionVector = class {
        constructor(a, b) {
            this.position = a, this.rotation = b
        }
        degToRad(a) {
            return a * Math.PI / 180
        }
        radToDeg(a) {
            return 180 * a / Math.PI
        }
        eulerToQuaternion() {
            var a = Math.cos,
                b = Math.sin;
            let c = this.degToRad(this.rotation.x),
                d = this.degToRad(this.rotation.y),
                e = this.degToRad(this.rotation.z);
            const f = b(c / 2) * a(d / 2) * a(e / 2) - a(c / 2) * b(d / 2) * b(e / 2),
                g = a(c / 2) * b(d / 2) * a(e / 2) + b(c / 2) * a(d / 2) * b(e / 2),
                h = a(c / 2) * a(d / 2) * b(e / 2) - b(c / 2) * b(d / 2) * a(e / 2),
                i = a(c / 2) * a(d / 2) * a(e / 2) + b(c / 2) * b(d / 2) * b(e / 2);
            return {
                x: f,
                y: g,
                z: h,
                w: i
            }
        }
        ForwardVectorFromRotation(a = 1) {
            var b = Math.cos,
                c = Math.sin;
            const d = this.degToRad(this.rotation.z),
                e = this.degToRad(this.rotation.x),
                f = Math.abs(b(e));
            return {
                x: -c(d) * (f * a),
                y: b(d) * (f * a),
                z: c(e)
            }
        }
        ForwardVector(a = 1) {
            const b = this.eulerToQuaternion(),
                c = 2 * (b.x * b.y - b.w * b.z),
                d = 1 - 2 * (b.x * b.x + b.z * b.z),
                e = 2 * (b.y * b.z + b.w * b.x);
            return {
                x: c * a,
                y: d * a,
                z: e * a
            }
        }
        Forward(a) {
            const b = this.ForwardVector();
            return {
                x: this.position.x + b.x * a,
                y: this.position.y + b.y * a,
                z: this.position.z + b.z * a
            }
        }
        RearVector() {
            const a = this.eulerToQuaternion(),
                b = 2 * (a.x * a.y - a.w * a.z),
                c = 1 - 2 * (a.x * a.x + a.z * a.z),
                d = 2 * (a.y * a.z + a.w * a.x);
            return {
                x: b,
                y: c,
                z: d
            }
        }
        Rear(a) {
            const b = this.ForwardVector();
            return {
                x: this.position.x + b.x * -a,
                y: this.position.y + b.y * -a,
                z: this.position.z + b.z * -a
            }
        }
        RightVector() {
            const a = this.eulerToQuaternion(),
                b = 1 - 2 * (a.y * a.y + a.z * a.z),
                c = 2 * (a.x * a.y + a.w * a.z),
                d = 2 * (a.x * a.z - a.w * a.y);
            return {
                x: b,
                y: c,
                z: d
            }
        }
        Right(a) {
            const b = this.RightVector();
            return {
                x: this.position.x + b.x * a,
                y: this.position.y + b.y * a,
                z: this.position.z + b.z * a
            }
        }
        LeftVector(a = 1) {
            const b = this.eulerToQuaternion(),
                c = 1 - 2 * (b.y * b.y + b.z * b.z),
                d = 2 * (b.x * b.y + b.w * b.z),
                e = 2 * (b.x * b.z - b.w * b.y);
            return {
                x: c * -a,
                y: d * -a,
                z: e * -a
            }
        }
        Left(a) {
            const b = this.LeftVector(a);
            return {
                x: this.position.x + b.x,
                y: this.position.y + b.y,
                z: this.position.z + b.z
            }
        }
        UpVector() {
            const a = this.eulerToQuaternion(),
                b = 2 * (a.x * a.z + a.w * a.y),
                c = 2 * (a.y * a.z - a.w * a.x),
                d = 1 - 2 * (a.x * a.x + a.y * a.y);
            return {
                x: b,
                y: c,
                z: d
            }
        }
        Up(a) {
            const b = this.UpVector();
            return {
                x: this.position.x + b.x * a,
                y: this.position.y + b.y * a,
                z: this.position.z + b.z * a
            }
        }
    }, b.serverDataKeys = {
        isAdmin: ""
    };
    let k = null,
        l = null;
    i("data.get", a => !k && (k = b.objects.atRemoteId(0), !k) ? null : k.getVariable(a)), i("data.getStatic", a => !l && (l = b.objects.atRemoteId(1), !l) ? null : l.getVariable(a)), i("data.onChange", (a, c) => {
        b.events.addDataHandler(a, (a, b, d) => {
            c(b, d)
        })
    }), b.events.add("guiReady", () => {
        const a = setInterval(() => {
            if (b.objects.atRemoteId(0) && b.objects.atRemoteId(1)) {
                for (const c in clearInterval(a), b.serverDataKeys) b.serverDataKeys[c] = b.api.data.getStatic("" + b.game.joaat(c));
                b.events.call("serverWorldDataReady")
            }
        }, 5)
    }), i("client.isNewMpVersion", () => !0), j("player.getPosition", () => b.players.local.position), j("player.getWaypointPosition", () => {
        let a = b.game.invoke("0x1DD1F58F493F1DA5"),
            c = b.game.invoke("0x186E5D252FA50E7D"),
            d = b.game.invoke("0x1BEDE233E6CD2A1F", c),
            e = b.game.invoke("0x14F96AA50D6FBEA7", c);
        for (let c = d; 0 != b.game.invoke("0xA6DB27D19ECBB7DA", c); c = e)
            if (4 == b.game.invoke("0xBE9B0959FFD0779B", c) && !!a) return b.game.ui.getBlipInfoIdCoord(c);
        return null
    }), i("player.getOtherPlayerName", a => {
        const c = global.getEntityVariable(b.players.local, "factionId", ""),
            d = global.getEntityVariable(b.players.local, "familyId", "");
        return global.isCharacterFriend(a.getVariable("characterId")) && !a.getVariable("isPlayerInMask") || "" !== c && a.getVariable("factionId") === c || "" !== d && a.getVariable("familyId") === d || a.getVariable("isInPrison") ? a.getVariable("characterName") : a.getVariable("charName")
    }), i("player.transitionTeleport", async ({
        x: a,
        y: c,
        z: d,
        heading: e,
        fadeOutTime: f,
        fadeInTimeWait: g,
        fadeInTime: i,
        freeze: j
    }) => {
        h++;
        try {
            const h = b.players.local;
            j && (h.clearTasksImmediately(), h.freezePosition(!0)), f && (b.game.cam.doScreenFadeOut(f), await b.game.waitAsync(f)), h.setCoordsNoOffset(a, c, d, !1, !1, !1), h.setHeading(e), g && (await b.game.waitAsync(g)), i && (b.game.cam.doScreenFadeIn(i), await b.game.waitAsync(Math.floor(.5 * i))), j && h.freezePosition(!1)
        } catch (a) {}
        setTimeout(() => {
            h--
        }, 500)
    }), i("player.transitionTeleportInVehicle", async ({
        x: a,
        y: c,
        z: d,
        heading: e,
        onGround: f,
        rotation: g,
        fadeOutTime: i,
        fadeInTimeWait: j,
        fadeInTime: k,
        freeze: l
    }) => {
        h++;
        try {
            const h = b.players.local,
                m = h.vehicle;
            m && (l && m.freezePosition(!0), b.game.cam.doScreenFadeOut(i), await b.game.waitAsync(i), m.setCoordsNoOffset(a, c, d, !1, !1, !1), e && m.setHeading(e), g && m.setRotation(g.x, g.y, g.z, 2, !0), f && m.setOnGroundProperly(), j && (await b.game.waitAsync(j)), b.game.cam.doScreenFadeIn(k), await b.game.waitAsync(k), l && m.freezePosition(!1))
        } catch (a) {}
        h--
    }), j("location.getZoneName", (a, c, d) => {
        const e = ["AIRP", "ALAMO", "ALTA", "ARMYB", "BANHAMC", "BANNING", "BEACH", "BHAMCA", "BRADP", "BRADT", "BURTON", "CALAFB", "CANNY", "CCREAK", "CHAMH", "CHIL", "CHU", "CMSW", "CYPRE", "DAVIS", "DELBE", "DELPE", "DELSOL", "DESRT", "DOWNT", "DTVINE", "EAST_V", "EBURO", "ELGORL", "ELYSIAN", "GALFISH", "GOLF", "GRAPES", "GREATC", "HARMO", "HAWICK", "HORS", "HUMLAB", "JAIL", "KOREAT", "LACT", "LAGO", "LDAM", "LEGSQU", "LMESA", "LOSPUER", "MIRR", "MORN", "MOVIE", "MTCHIL", "MTGORDO", "MTJOSE", "MURRI", "NCHU", "NOOSE", "OCEANA", "PALCOV", "PALETO", "PALFOR", "PALHIGH", "PALMPOW", "PBLUFF", "PBOX", "PROCOB", "RANCHO", "RGLEN", "RICHM", "ROCKF", "RTRAK", "SANAND", "SANCHIA", "SANDY", "SKID", "SLAB", "STAD", "STRAW", "TATAMO", "TERMINA", "TEXTI", "TONGVAH", "TONGVAV", "VCANA", "VESP", "VINE", "WINDF", "WVINE", "ZANCUDO", "ZP_ORT", "ZQ_UAR", "PROL"],
            f = b.game.zone.getNameOfZone(a, c, d);
        return e.includes(f) ? ["\u041C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0439 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442 \u041B\u043E\u0441 \u0421\u0430\u043D\u0442\u043E\u0441", "\u0410\u043B\u0430\u043C\u043E-\u0421\u0438", "\u0410\u043B\u044C\u0442\u0430", "\u0424\u043E\u0440\u0442 \u0417\u0430\u043D\u043A\u0443\u0434\u043E", "\u0411\u044D\u043D\u0445\u044D\u043C-\u041A\u0430\u043D\u044C\u043E\u043D-\u0434\u0440\u0430\u0439\u0432", "\u0411\u044D\u043D\u043D\u0438\u043D\u0433", "\u041F\u043B\u044F\u0436 \u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438", "\u041A\u0430\u043D\u044C\u043E\u043D \u0411\u044D\u043D\u0445\u044D\u043C", "\u041F\u0435\u0440\u0435\u0432\u0430\u043B \u0411\u0440\u044D\u0434\u0434\u043E\u043A\u0430", "\u0422\u0443\u043D\u043D\u0435\u043B\u044C \u0411\u0440\u044D\u0434\u0434\u043E\u043A\u0430", "\u0411\u0451\u0440\u0442\u043E\u043D", "\u041C\u043E\u0441\u0442 \u041A\u0430\u043B\u0430\u0444\u0438\u044F", "\u041A\u0430\u043D\u044C\u043E\u043D \u0420\u0430\u0442\u043E\u043D", "\u0411\u0443\u0445\u0442\u0430 \u041A\u044D\u0441\u0441\u0438\u0434\u0438", "\u0427\u0435\u043C\u0431\u0435\u0440\u043B\u0435\u043D-\u0425\u0438\u043B\u043B\u0437", "\u0412\u0430\u0439\u043D\u0432\u0443\u0434-\u0425\u0438\u043B\u043B\u0437", "\u0427\u0443\u043C\u0430\u0448", "\u0417\u0430\u043F\u043E\u0432\u0435\u0434\u043D\u0438\u043A \u0433\u043E\u0440\u044B \u0427\u0438\u043B\u0438\u0430\u0434", "\u0421\u0430\u0439\u043F\u0440\u0435\u0441\u0441-\u0424\u043B\u044D\u0442\u0441", "\u0414\u044D\u0432\u0438\u0441", "\u041F\u043B\u044F\u0436 \u0414\u0435\u043B\u044C-\u041F\u0435\u0440\u0440\u043E", "\u0414\u0435\u043B\u044C-\u041F\u0435\u0440\u0440\u043E", "\u041B\u0430-\u041F\u0443\u044D\u0440\u0442\u0430", "\u041F\u0443\u0441\u0442\u044B\u043D\u044F \u0413\u0440\u0430\u043D\u0434-\u0421\u0435\u043D\u043E\u0440\u0430", "\u0426\u0435\u043D\u0442\u0440", "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434", "\u0412\u043E\u0441\u0442\u043E\u0447\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434", "\u042D\u043B\u044C-\u0411\u0443\u0440\u0440\u043E-\u0425\u0430\u0439\u0442\u0441", "\u041C\u0430\u044F\u043A \u042D\u043B\u044C-\u0413\u043E\u0440\u0434\u043E", "\u042D\u043B\u0438\u0437\u0438\u0430\u043D-\u0410\u0439\u043B\u0435\u043D\u0434", "\u0413\u0430\u043B\u0438\u043B\u0438", "\u0413\u043E\u043B\u044C\u0444 \u043A\u043B\u0443\u0431", "\u0413\u0440\u0435\u0439\u043F\u0441\u0438\u0434", "\u0413\u0440\u0435\u0439\u0442-\u0427\u0430\u043F\u0430\u0440\u0440\u0430\u043B", "\u0425\u0430\u0440\u043C\u043E\u043D\u0438", "\u0425\u0430\u0432\u0438\u043A", "\u0412\u0430\u0439\u043D\u0432\u0443\u0434\u0441\u043A\u0430\u044F \u0433\u043E\u043D\u043E\u0447\u043D\u0430\u044F \u0442\u0440\u0430\u0441\u0441\u0430", "Humane Labs and Research", "\u0422\u044E\u0440\u044C\u043C\u0430 \u0411\u043E\u043B\u0438\u043D\u0433\u0431\u0440\u043E\u0443\u043A", "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0439 \u0421\u0435\u0443\u043B", "\u041B\u044D\u043D\u0434-\u044D\u043A\u0442-\u0440\u0435\u0437\u0435\u0440\u0432\u0443\u0430\u0440", "\u041B\u0430\u0433\u043E-\u0417\u0430\u043D\u043A\u0443\u0434\u043E", "\u041B\u044D\u043D\u0434-\u044D\u043A\u0442-\u0434\u044D\u043C", "\u041F\u043B\u043E\u0449\u0430\u0434\u044C \u041B\u0435\u0433\u0438\u043E\u043D\u0430", "\u041B\u0430-\u041C\u0435\u0441\u0430", "\u041B\u0430-\u041F\u0443\u044D\u0440\u0442\u0430", "\u041C\u0438\u0440\u0440\u043E\u0440-\u041F\u0430\u0440\u043A", "\u041C\u043E\u0440\u043D\u0438\u043D\u0433\u0432\u0443\u0434", "Richards Majestic", "\u0413\u043E\u0440\u0430 \u0427\u0438\u043B\u0438\u0430\u0434", "\u0413\u043E\u0440\u0430 \u0413\u043E\u0440\u0434\u043E", "\u0413\u043E\u0440\u0430 \u0414\u0436\u043E\u0441\u0430\u0439\u044F", "\u041C\u0443\u0440\u044C\u0435\u0442\u0430-\u0425\u0430\u0439\u0442\u0441", "\u0421\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0427\u0443\u043C\u0430\u0448", "N.O.O.S.E", "\u0422\u0438\u0445\u0438\u0439 \u043E\u043A\u0435\u0430\u043D", "\u0411\u0443\u0445\u0442\u0430 \u041F\u0430\u043B\u0435\u0442\u043E", "\u041F\u0430\u043B\u0435\u0442\u043E-\u0411\u044D\u0439", "\u041B\u0435\u0441 \u041F\u0430\u043B\u0435\u0442\u043E", "\u041D\u0430\u0433\u043E\u0440\u044C\u044F \u041F\u0430\u043B\u043E\u043C\u0438\u043D\u043E", "\u0422\u042D\u0421 \u041F\u0430\u043B\u043C\u0435\u0440-\u0422\u0435\u0439\u043B\u043E\u0440", "\u041F\u0430\u0441\u0438\u0444\u0438\u043A-\u0411\u043B\u0430\u0444\u0441", "\u041F\u0438\u043B\u0431\u043E\u043A\u0441-\u0425\u0438\u043B\u043B", "\u041F\u043B\u044F\u0436 \u041F\u0440\u043E\u043A\u043E\u043F\u0438\u043E", "\u041C\u0435\u043A\u0441\u0438\u043A\u0430\u043D\u0441\u043A\u043E\u0435 \u0440\u0430\u043D\u0447\u043E", "\u0420\u0438\u0447\u043C\u0430\u043D-\u0413\u043B\u0435\u043D", "\u0420\u0438\u0447\u043C\u0430\u043D", "\u0420\u043E\u043A\u0444\u043E\u0440\u0434-\u0425\u0438\u043B\u043B\u0437", "\u0422\u0440\u0430\u0441\u0441\u0430 \u0420\u0435\u0434\u0432\u0443\u0434-\u041B\u0430\u0439\u0442\u0441", "\u0421\u0430\u043D-\u0410\u043D\u0434\u0440\u0435\u0430\u0441", "\u0421\u0430\u043D-\u0428\u0430\u043D\u044C\u0441\u043A\u0438\u0439 \u0433\u043E\u0440\u043D\u044B\u0439 \u0445\u0440\u0435\u0431\u0435\u0442", "\u0421\u044D\u043D\u0434\u0438-\u0428\u043E\u0440\u0441", "\u041C\u0438\u0448\u043D-\u0420\u043E\u0443", "\u0421\u0442\u044D\u0431-\u0421\u0438\u0442\u0438", "\u0410\u0440\u0435\u043D\u0430 Maze Bank", "\u0421\u0442\u0440\u043E\u0431\u0435\u0440\u0440\u0438", "\u0422\u0430\u0442\u0430\u0432\u0438\u0430\u043C\u0441\u043A\u0438\u0435 \u0433\u043E\u0440\u044B", "\u0422\u0435\u0440\u043C\u0438\u043D\u0430\u043B", "\u0422\u0435\u043A\u0441\u0442\u0430\u0439\u043B-\u0421\u0438\u0442\u0438", "\u0422\u043E\u043D\u0433\u0432\u0430-\u0425\u0438\u043B\u043B\u0437", "\u0414\u043E\u043B\u0438\u043D\u0430 \u0422\u043E\u043D\u0433\u0432\u0430", "\u041A\u0430\u043D\u0430\u043B\u044B \u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438", "\u0412\u0435\u0441\u043F\u0443\u0447\u0447\u0438", "\u0412\u0430\u0439\u043D\u0432\u0443\u0434", "\u0412\u0435\u0442\u0440\u044F\u043D\u0430\u044F \u0444\u0435\u0440\u043C\u0430 RON Alternates", "\u0417\u0430\u043F\u0430\u0434\u043D\u044B\u0439 \u0412\u0430\u0439\u043D\u0432\u0443\u0434", "\u0420\u0435\u043A\u0430 \u0417\u0430\u043D\u043A\u0443\u0434\u043E", "\u041F\u043E\u0440\u0442 \u041B\u043E\u0441-\u0421\u0430\u043D\u0442\u043E\u0441\u0430", "\u0414\u0435\u0439\u0432\u0438\u0441-\u041A\u0432\u0430\u0440\u0446", "\u041E\u0441\u0442\u0440\u043E\u0432 \u041A\u0430\u0439\u043E-\u041F\u0435\u0440\u0438\u043A\u043E"][e.indexOf(f)] : ""
    }), j("location.getStreetName", (a, c, d) => {
        const e = b.game.pathfind.getStreetNameAtCoord(a, c, d, 0, 0);
        return 1945201252 === e.streetName ? "\u0427\u0430\u0441\u0442\u043D\u044B\u0435 \u0432\u043B\u0430\u0434\u0435\u043D\u0438\u044F" : b.game.ui.getStreetNameFromHashKey(e.streetName)
    }), i("location.isPointInPolygon", (a, b) => {
        let c = 0,
            d = 0,
            e = 0,
            g = 0,
            h = 0,
            j = 0,
            l = 0,
            m = 0,
            n = null,
            o = null;
        const p = a[0],
            q = a[1],
            r = b.length;
        for (c; c < r; c++) {
            d = 0;
            const f = b[c].length - 1,
                i = b[c];
            for (n = i[0], h = n[0] - p, j = n[1] - q, d; d < f; d++) {
                if (o = i[d + 1], m = o[1] - q, 0 > j && 0 > m || 0 < j && 0 < m) {
                    n = o, j = m, h = n[0] - p;
                    continue
                }
                if (l = o[0] - a[0], 0 < m && 0 >= j) {
                    if (g = h * m - l * j, 0 < g) ++e;
                    else if (0 === g) return 0;
                } else if (0 < j && 0 >= m) {
                    if (g = h * m - l * j, 0 > g) ++e;
                    else if (0 === g) return 0;
                } else if (0 === m && 0 > j) {
                    if (g = h * m - l * j, 0 === g) return 0;
                } else if (0 === j && 0 > m) {
                    if (g = h * m - l * j, 0 === g) return 0;
                } else if (0 === j && 0 === m) {
                    if (0 >= l && 0 <= h) return 0;
                    if (0 >= h && 0 <= l) return 0
                }
                n = o, j = m, h = l
            }
        }
        return 0 != e % 2
    }), i("notify.send", (a, c) => {
        b.events.call("clientFunc_notify", a, c)
    }), i("notify.success", a => {
        b.events.call("clientFunc_notify", "success", a)
    }), i("notify.info", a => {
        b.events.call("clientFunc_notify", "info", a)
    }), i("notify.error", a => {
        b.events.call("clientFunc_notify", "error", a)
    }), b.dist = (a, b, c, d, e, f) => {
        var g = Math.pow;
        return Math.sqrt(g(a - d, 2) + g(b - e, 2) + g(c - f, 2))
    }, global.serverName = "", global.isPlayerDeath = !1, global.isPlayerInCapture = !1, global.isPlayerInBizwar = !1, global.isPlayerInArena = !1, global.disableAllAction = !1, global.enableCameraOnDisabled = !1, b.console.enabled = !1, b.events.add("render", function () {
        if (b.game.player.setLockonRangeOverride(1), b.game.controls.disableControlAction(2, 243, !0), b.game.ui.displayAmmoThisFrame(!1), b.game.ui.displayAreaName(!1), b.game.ui.hideHudComponentThisFrame(6), b.game.ui.hideHudComponentThisFrame(7), b.game.ui.hideHudComponentThisFrame(9), b.game.ui.hideHudComponentThisFrame(13), b.game.player.setHealthRechargeMultiplier(0), global.disableAllAction) {
            if (b.game.controls.disableAllControlActions(0), b.game.controls.disableAllControlActions(1), b.game.controls.disableAllControlActions(2), !global.enableCameraOnDisabled) return;
            b.game.controls.enableControlAction(2, 1, !0), b.game.controls.enableControlAction(2, 2, !0), b.game.controls.enableControlAction(2, 3, !0), b.game.controls.enableControlAction(2, 4, !0), b.game.controls.enableControlAction(2, 5, !0), b.game.controls.enableControlAction(2, 6, !0), b.game.controls.enableControlAction(2, 270, !0), b.game.controls.enableControlAction(2, 271, !0), b.game.controls.enableControlAction(2, 272, !0), b.game.controls.enableControlAction(2, 273, !0)
        } else global.isSmartphoneOpen && (b.game.controls.disableControlAction(0, 24, !0), b.game.controls.disableControlAction(1, 24, !0), b.game.controls.disableControlAction(0, 257, !0))
    }), b.events.add("clientFunc_hideUI", function (a) {
        global.hideUI(a)
    }), global.uiVisible = !0, global.hideUI = function (a) {
        b.gui.chat.show(!a), b.game.ui.displayRadar(!a), global.mainBrowser.execute(`UI_showUI(${!a});`), global.hideHelpBox(a), global.uiVisible = !a
    }, global.hideHelpBox = function (a) {
        return !1 == global.getGlobalStorage().settings.enableHelpBox ? void global.mainBrowser.execute(`mainHud.uiHelpPanelEnable = false;`) : void global.mainBrowser.execute(`mainHud.uiHelpPanelEnable = ${!a+""};`)
    }, b.events.add("clientFunc_setWaypoint", function (a, c) {
        const d = parseFloat(a) + Math.random(),
            e = parseFloat(c) + Math.random();
        isNaN(d) || isNaN(e) || b.game.invoke("0xFE43368D2AA4F2FC", d, e)
    }), b.events.add("clientFunc_freeze", function (a) {
        b.players.local.freezePosition(a)
    }), global.gameplayCamera = b.cameras.new("gameplay");
    let m = null;
    global.setCamera = function (a, c, d, e, f = 0) {
        null != m && b.cameras.exists(m) && m.destroy(), m = b.cameras.new("default", a, c, d), m.pointAtCoord(e.x, e.y, e.z), m.setActive(!0), b.game.cam.renderScriptCams(!0, 0 < f, f, !0, !1)
    }, global.setCameraRot = function (a, c, d, e = 0) {
        null != m && b.cameras.exists(m) && m.destroy(), m = b.cameras.new("default", a, c, d), m.setActive(!0), b.game.cam.renderScriptCams(!0, 0 < e, e, !0, !1)
    }, global.setCameraToPlayer = function (a, c, d, e, f = 0, g = 80) {
        null != m && b.cameras.exists(m) && m.destroy();
        var h = function (a, b, c) {
            return b *= .0174533, a.y += c * Math.sin(b), a.x += c * Math.cos(b), a
        }(new b.Vector3(b.players.local.position.x + c.x, b.players.local.position.y + c.y, b.players.local.position.z + c.z), b.players.local.getRotation(2).z + 90 + e, a);
        m = b.cameras.new("default", h, new b.Vector3(0, 0, 0), g), m.pointAtCoord(b.players.local.position.x + d.x, b.players.local.position.y + d.y, b.players.local.position.z + d.z), m.setActive(!0), b.game.cam.renderScriptCams(!0, 0 < f, f, !0, !1)
    }, global.setCameraToPos = function (a, c, d, e, f, g, h = 0, i = 80) {
        null != m && b.cameras.exists(m) && m.destroy();
        var j = function (a, b, c) {
            return b *= .0174533, a.y += c * Math.sin(b), a.x += c * Math.cos(b), a
        }(new b.Vector3(a.x + e.x, a.y + e.y, a.z + e.z), c.z + 90 + g, d);
        m = b.cameras.new("default", j, new b.Vector3(0, 0, 0), i), m.pointAtCoord(a.x + f.x, a.y + f.y, a.z + f.z), m.setActive(!0), b.game.cam.renderScriptCams(!0, 0 < h, h, !0, !1)
    }, global.resetCamera = function (a = 0) {
        null != m && b.cameras.exists(m) && m.destroy(), b.game.cam.renderScriptCams(!1, 0 < a, a, !0, !1)
    };
    let n = "",
        o = "";
    global.notifyKeyHelpShow = function (a, b) {
        n = a, o = b, global.rpc.triggerBrowser(global.mainBrowser, "client_browser_notifyHelp_show", {
            key: a,
            text: b
        })
    }, global.notifyKeyHelpHide = function (a = "", b = "") {
        "" !== a && "" !== b && (a !== n || b !== o) || global.rpc.triggerBrowser(global.mainBrowser, "client_browser_notifyHelp_hide")
    }, global.sendMessageToChat = function (a) {
        b.gui.chat.push(a)
    };
    let p = null;
    global.discordUpdate = (a, c) => {
        const d = `на gta5rp.com ${global.serverName}`;
        return a ? (null !== p && (clearTimeout(p), p = null), b.discord.update(a, d), void(c && (p = setTimeout(() => {
            p = null, global.discordUpdate()
        }, 1e3 * c)))) : void(null !== p || b.discord.update("\u041F\u0440\u043E\u0432\u043E\u0434\u0438\u0442 \u0432\u0440\u0435\u043C\u044F", d))
    }, b.events.add("discordUpdate", (a, b) => {
        global.discordUpdate(a, b)
    });
    let q = {};
    global.actionAntiFlood = function (a, b) {
        const c = new Date().getTime();
        return null == q[a] ? (q[a] = c, !0) : !(q[a] + b > c) && (q[a] = c, !0)
    };
    const r = new Map;
    global.createTempEvent = (a, c) => {
        const d = r.get(a);
        d && b.events.remove(a, d), b.events.add(a, c), r.set(a, c)
    }, global.getEntityVariable = (a, b, c) => a.hasVariable(b) ? a.getVariable(b) : c, global.log = a => global.rpc.triggerServer("server_debug_log", a), global.isAuth = !1, global.isChatOpen = !1;
    let s = 0;
    global.rpc.on("client_cursor_status", function (a) {
        global.showCursor(a)
    }), global.showCursor = function (a, c = !0) {
        a ? (b.gui.cursor.show(c, !0), s++) : (s = Math.max(s - 1, 0), 0 == s && b.gui.cursor.show(!1, !1))
    };
    let t = 0;
    global.disableKeys = !1, global.disableChatAndKeys = function (a) {
        a ? (t++, b.gui.chat.activate(!1), global.disableKeys = !0, global.disableAllAction = !0) : (t--, 0 >= t && (t = 0, b.gui.chat.activate(!0), global.disableKeys = !1, b.players.local.freezePosition(!1), global.disableAllAction = !1))
    }, global.isNotifyEnable = !0, global.rpc.on("clientFunc_notifySuccess", a => {
        b.events.call("clientFunc_notify", "success", a)
    }), global.rpc.on("clientFunc_notifyInfo", a => {
        b.events.call("clientFunc_notify", "info", a)
    }), global.rpc.on("clientFunc_notifyError", a => {
        b.events.call("clientFunc_notify", "error", a)
    }), b.events.add("clientFunc_notify", (a, b) => {
        global.isNotifyEnable && global.mainBrowser.execute(`UI_notify_send("${a}", "${escape(global.playerFriendsReplaceString(b))}");`)
    }), global.character = "";
    let u = {
        smartphone: {
            settings: {
                enableCursor: !1,
                enableHelpBox: !0,
                enableNametags: !0
            },
            contacts: [],
            sms: [],
            music: []
        }
    };
    let v = b.storage.data;
    v.data && (v.character = v.data.character, v.global = v.data.global, delete v.data), global.isFirstOpen = !1, v.character == null && (v.character = {}, global.isFirstOpen = !0), v.global == null && (v.global = {}, global.isFirstOpen = !0), a(v.global, {
        auth: {
            login: ""
        },
        settings: {
            enableHelpBox: !0,
            enableQuestBox: !0,
            enableNametags: !0,
            enableTimerBox: !0,
            enableLocalName: !1,
            enableCenterInventory: !1,
            disableScreenEffect: !1,
            disableDocumentPhoto: !1,
            enableSpeedometer: !1,
            speedometerColor: [255, 153, 0, 1],
            speedometerBackgroundColor: [46, 65, 113, 1],
            maxVolume3dSound: 100
        },
        chat: {
            height: 240,
            lineHeight: 24,
            fontSize: 16,
            shadow: !0,
            timestamp: !1,
            showOnPlayer: !1
        },
        reticle: {
            type: "",
            data: []
        }
    }), b.storage.data = v, b.storage.flush(), global.rpc.register("client_storage_select", function (c) {
        global.character = c, b.storage.data.character[global.character] == null && (global.isFirstOpen = !0, b.storage.data.character[global.character] = {}), a(b.storage.data.character[global.character], u);
        const d = global.getGlobalStorage();
        global.rpc.trigger("__client_event_globalStorage_load", d), global.rpc.trigger("__client_event_storage_load", b.storage.data.character[global.character]), global.hideHelpBox(!d.settings.enableHelpBox)
    }), global.rpc.register("client_storage_get", function () {
        return global.getStorage()
    }), global.rpc.register("client_storage_flush", function (a) {
        b.storage.data.character[global.character] = a, b.storage.flush()
    }), global.rpc.register("client_global_storage_get", function () {
        return b.storage.data.global
    }), global.rpc.register("client_global_storage_flush", function (a) {
        global.flushGlobalStorage(a)
    }), global.getStorage = function () {
        return null == b.storage.data.character || null == b.storage.data.character[global.character] ? u : b.storage.data.character[global.character]
    }, global.getGlobalStorage = function () {
        return b.storage.data.global
    }, global.flushGlobalStorage = function (a) {
        b.storage.data.global = a, b.storage.flush(), global.rpc.trigger("__client_event_globalStorage_load", a)
    };
    const w = new Map;
    global.registerFactionEvent = ({
        factionId: a,
        onEnter: b,
        onLeave: c
    }) => {
        let d = w.get(a);
        d || (d = {
            active: !1,
            eventList: []
        }), d.eventList.push({
            onEnter: b,
            onLeave: c
        }), w.set(a, d)
    }, b.events.addDataHandler("factionId", (a, c) => {
        if (a === b.players.local) {
            for (const a of w.values()) a.active && (a.eventList.forEach(a => a.onLeave && a.onLeave()), a.active = !1);
            const a = w.get(c);
            a && (a.eventList.forEach(a => a.onEnter && a.onEnter()), a.active = !0)
        }
    });
    const x = new Map;
    global.registerClubEvent = ({
        clubId: a,
        onEnter: b,
        onLeave: c
    }) => {
        let d = w.get(a);
        d || (d = {
            active: !1,
            eventList: []
        }), d.eventList.push({
            onEnter: b,
            onLeave: c
        }), x.set(a, d)
    }, b.events.addDataHandler("clubId", (a, c) => {
        if (a === b.players.local) {
            for (const a of x.values()) a.active && (a.eventList.forEach(a => a.onLeave && a.onLeave()), a.active = !1);
            const a = x.get(c);
            a && (a.eventList.forEach(a => a.onEnter && a.onEnter()), a.active = !0)
        }
    }), global.mainBrowser = null, global.smartphoneBrowser = null, require("./Util/actionColshape.js"), require("./Util/3dsound.js"), require("./Util/binder.js"), require("./Util/customInterior.js"), require("./Util/scaleform.js"), require("./Player/attachmentObject.js"), require("./Objects/ActionPickup/actionPickup.js"), require("./Objects/GangZone/gangzone.js"), require("./Objects/ClientBlip/clientBlip.js"), require("./Objects/ServerWorldObject/serverWorldObject.js"), require("./Objects/Doors/doords.js"), require("./Objects/Checkpoint/checkpoint.js"), require("./Objects/ActionObject/actionObject.js"), require("./Objects/Apartments/apartments.js"), require("./Objects/UsedObject/usedObject.js"), require("./Objects/Market/market.js"), require("./Objects/Gym/gym.js"), require("./Player/fingerpointing.js"), require("./Player/crouch.js"), require("./Player/crawl.js"), require("./Player/ChatAndUI/chatAndUI.js"), require("./Player/friends.js"), require("./Player/nametags.js"), require("./Player/playerBlip.js"), require("./Player/sync.js"), require("./Player/itemInHand.js"), require("./Player/targetMenu.js"), require("./Player/listMenu.js"), require("./Player/voiceChat.js"), require("./Player/weapons.js"), require("./Player/fly.js"), require("./Player/antiAFK.js"), require("./Player/playerSync.js"), require("./Player/vehicle.js"), require("./Player/clubs.js"), require("./Player/main.js"), require("./Player/mapEditor.js"), require("./Smartphone2/clientSmartphone.js"), require("./RPBrowser/clientBrowser.js"), require("./PlayerDialog/index.js"), require("./Character/character.js"), require("./Menu/menu.js"), require("./Jobs/skinDiver.js"), require("./Jobs/fireman.js"), require("./Jobs/farm.js"), require("./Jobs/hunting.js"), require("./Fishing/fishing.js"), require("./Events/BizWar/bizwar.js"), require("./Events/HummerWar/hummerWar.js"), require("./Events/Prison/prison.js"), require("./Objects/Train/train.js"), require("./AdminConsole/clientConsole.js"), require("./Auth/clientAuth.js"), b.players.local.freezePosition(!1);
    const y = new Map;
    global.registerFamilyQuest = ({
        code: a,
        onStart: b,
        onEnd: c,
        localObjects: d
    }) => {
        y.set(a, {
            isStart: !1,
            data: null,
            onStart: b,
            onEnd: c,
            localObjects: d == null ? [] : d,
            objects: []
        })
    }, b.events.add("client_playerData_setFamilyId", (a, c, d) => {
        if (-1 === a) {
            for (const a of y.values()) a.isStart && (a.objects.forEach(a => a.destroy()), a.objects = [], a.isStart = !1, a.onEnd());
            return
        }
        d = JSON.parse(d);
        for (const e of d) {
            const a = y.get(e[0]);
            a && !a.isStart && (a.objects.forEach(a => a.destroy()), a.objects = a.localObjects.map(a => b.objects.new(b.game.joaat(a[0]), new b.Vector3(a[1], a[2], a[3]), {
                rotation: new b.Vector3(a[4], a[5], a[6])
            })), a.isStart = !0, a.data = e[1], a.onStart(e[1]))
        }
    }), b.events.add("client_pf_startQuest", (a, c) => {
        const d = y.get(a);
        d && !d.isStart && (d.objects.forEach(a => a.destroy()), d.objects = d.localObjects.map(a => b.objects.new(b.game.joaat(a[0]), new b.Vector3(a[1], a[2], a[3]), {
            rotation: new b.Vector3(a[4], a[5], a[6])
        })), d.isStart = !0, d.data = JSON.parse(c), d.onStart(d.data))
    }), b.events.add("client_pf_endQuest", a => {
        const b = y.get(a);
        b && b.isStart && (b.objects.forEach(a => a.destroy()), b.objects = [], b.isStart = !1, b.onEnd())
    }), require("./Jobs/govContracts.js"), require("./Jobs/crimeContracts.js"), require("./Jobs/neutralContract.js");
    let z = null,
        A = null;
    global.binder.register({
        action: "MAIN_CURSOR",
        desc: "\u041A\u0443\u0440\u0441\u043E\u0440",
        defaultKey: 113,
        func: () => {
            null !== A && clearTimeout(A), A = setTimeout(() => {
                A = null;
                null !== z || b.gui.isMainMenuActive || (b.gui.cursor.visible ? (s = 0, b.gui.cursor.show(!1, !1)) : (s = 1, b.gui.cursor.show(!0, !0)))
            }, 350)
        }
    }), b.keys.bind(112, !0, function () {
        null === z ? z = setInterval(() => {
            b.game.controls.disableAllControlActions(0), b.game.controls.disableAllControlActions(1), b.game.controls.disableAllControlActions(2)
        }, 0) : (clearInterval(z), z = null)
    }), global.binder.register({
        action: "HELPMENU_OPEN",
        desc: "\u041F\u043E\u043C\u043E\u0449\u044C",
        defaultKey: 121,
        func: () => {
            !global.isAuth || global.isChatOpen || e.triggerServer("server_player_mainMenuOpen", 3)
        }
    }), b.keys.bind(220, !0, function () {
        b.gui.cursor.visible || global.isChatOpen || global.disableKeys || b.events.callRemote("server_event_key_|")
    }), b.events.add("__call_remote_event", function (a, ...c) {
        -1 === ["server_character_save", "server_inventory_useItem", "server_inventory_changeDrawable", "server_vehicle_ejectPlayer", "server_playerAuth_getCharacterData", "server_playerAuth_selectCharacter", "server_casino_spinSlot", "server_casino_exitSlot", "server_casino_rollDice", "server_casino_exitDice", "server_casino_exitRoulette", "server_casino_seatPoker", "server_casino_betPoker", "server_casino_addChipPoker", "server_casino_fallPoker", "server_casino_exitPoker", "server_fishing_endGame", "server_fishingHalloween_endGame", "server_crimeContract_endRobECircuit", "server_govContract_endMakeClothes", "server_danceBattleEnd", "server_playerFamily_house_sellHouse", "server_playerFamily_house_toggleDoor", "server_playerFamily_office_sendRequest", "server_playerFamily_office_sellOffice", "server_playerFamily_selectPrefix", "server_playerFamily_selectNewName", "server_playerFamily_buyLimit", "server_playerFamily_deleteFamily", "server_captcha_result", "server_chat_scream", "server_chat_whisper", "server_chat_nonrp", "server_chat_rp_me", "server_chat_rp_do", "server_chat_rp_try", "server_chat_rp_todo", "server_chat_roll", "server_mp_exit", "server_faction_radio", "server_faction_radio_nrp", "server_faction_dep", "server_playerFamily_chat", "server_playerFamily_chatb", "server_faction_megafon", "server_smartphone_acceptCall", "server_smartphone_endCall", "server_radioRD_deleteVeh", "server_smartphone_taskClose", "server_smartphone_silentMode", "server_boombox_start", "server_boombox_stop", "server_apartmentsEntrance_enter", "server_mazeBankArena_open", "server_house_toggleDoor"].indexOf(a) || b.events.callRemote(a, ...c)
    }), global.rpc.on("client_setGlobalValue", function (a) {
        "isAdmin" === a[0] || "adminLevel" === a[0] || (global[a[0]] = a[1])
    }), global.rpc.register("client_getGlobalValue", function (a) {
        return global[a]
    }), (() => {
        var a = Math.pow,
            c = Math.abs;
        let d = new b.Vector3(0, 0, 0),
            e = 0,
            i = 0,
            j = 0,
            k = 0,
            l = [],
            m = 0,
            n = 0;
        setInterval(() => {
            if (n++, b.events.callRemote !== f || b.events.callRemoteUnreliable !== g) {
                try {
                    Object.defineProperty(b.events, "callRemote", {
                        enumerable: !1,
                        configurable: !0,
                        writable: !0,
                        value: f
                    }), Object.defineProperty(b.events, "callRemoteUnreliable", {
                        enumerable: !1,
                        configurable: !0,
                        writable: !0,
                        value: g
                    })
                } catch (a) {}
                b.events.callRemote("s:ac:exec")
            }
            const h = new Date().getTime(),
                q = b.players.local;
            if (q.isAdmin) return;
            const r = q.position,
                s = q.dimension,
                t = q.vehicle;
            if (s != e) return i = h, d = r, void(e = s);
            const u = Math.sqrt(a(r.x - d.x, 2) + a(r.y - d.y, 2));
            if (0 === s && 650 <= u && 1e4 < h - i && 2500 < h - j && global.actionAntiFlood("s_ac_teleport", 25e3)) return void o("s_ac_teleport", `${b.api.location.getZoneName(d.x,d.y,d.z)} - ${b.api.location.getZoneName(r.x,r.y,r.z)} - ${Math.round(u)}m`);
            if (0 === s && (25 < u || 1 > c(d.z - r.z)) && void 0 === b.raycasting.testPointToPoint(r, new b.Vector3(r.x, r.y, r.z - 10), q.handle, 17) && 10 < c(r.z - b.game.gameplay.getGroundZFor3dCoord(r.x, r.y, r.z + 3, 0, !1)) && void 0 === b.raycasting.testPointToPoint(new b.Vector3(r.x + 1, r.y, r.z), new b.Vector3(r.x + 1, r.y, r.z - 10), q.handle, 17) && void 0 === b.raycasting.testPointToPoint(new b.Vector3(r.x - 1, r.y, r.z), new b.Vector3(r.x - 1, r.y, r.z - 10), q.handle, 17) && void 0 === b.raycasting.testPointToPoint(new b.Vector3(r.x, r.y + 1, r.z), new b.Vector3(r.x, r.y + 1, r.z - 10), q.handle, 17) && void 0 === b.raycasting.testPointToPoint(new b.Vector3(r.x, r.y - 1, r.z), new b.Vector3(r.x, r.y - 1, r.z - 10), q.handle, 17)) {
                if (!q.isSwimming() && !q.isSwimmingUnderWater() && !q.isClimbing() && !(() => null != t && -1 !== [14, 15, 16, 17, 18, 19, 20].indexOf(t.getClass()))() && !p(r)) {
                    const a = q.getParachuteState();
                    0 !== a && 1 !== a && 2 !== a && (k += 1)
                }
                if (15 < k && global.actionAntiFlood("s_ac_noclip", 2e4)) return o("s_ac_noclip")
            } else k = 0;
            if (0 === s) {
                const a = q.getModel();
                if (a !== b.game.joaat("mp_m_freemode_01") && a !== b.game.joaat("mp_f_freemode_01") && global.actionAntiFlood("s_ac_modelchange", 6e5)) return o("s_ac_modelchange");
                if (t) l = [];
                else {
                    const a = b.vehicles.streamed.filter(a => a.controller === q);
                    l = l.filter(a => b.vehicles.exists(a) && 0 !== a.handle && a.controller === q);
                    for (const d of a)
                        if (-1 === l.indexOf(d)) d.__acLastCoords = d.getCoords(!0), d.__acLastSpeed = d.getSpeed(), d.__acLastDist = 0, l.push(d);
                        else {
                            const a = d.getCoords(!0),
                                e = d.getSpeed(),
                                f = b.dist(a.x, a.y, a.z, d.__acLastCoords.x, d.__acLastCoords.y, d.__acLastCoords.z),
                                g = c(e - d.__acLastSpeed);
                            110 < g ? global.actionAntiFlood("s_ac_veh_gravity", 6e5) && b.events.callRemote("s_ac_veh_gravity", d) : 1 > e && 1 < f ? 10 < ++m && global.actionAntiFlood("s_ac_veh_gravity", 6e5) && b.events.callRemote("s_ac_veh_gravity", d) : m = 0, d.__acLastCoords = a, d.__acLastSpeed = e, d.__acLastDist = f
                        }
                }
                if (0 == n % 40 && !q.getVariable("newPlayer") && !q.isRagdoll()) {
                    const a = b.players.streamed.filter(a => a.getVariable("newPlayer") && null === a.vehicle);
                    for (const c of a) {
                        const a = c.position;
                        !(a.z < r.z - 1) || !(15 > b.dist(r.x, r.y, r.z - 4, a.x, a.y, a.z - 4)) || void 0 !== b.raycasting.testPointToPoint(a, new b.Vector3(a.x, a.y, a.z - 10), c.handle, 17) || void 0 !== b.raycasting.testPointToPoint(new b.Vector3(a.x + 1, a.y, a.z), new b.Vector3(a.x + 1, a.y, a.z - 10), c.handle, 17) || void 0 !== b.raycasting.testPointToPoint(new b.Vector3(a.x - 1, a.y, a.z), new b.Vector3(a.x - 1, a.y, a.z - 10), c.handle, 17) || void 0 !== b.raycasting.testPointToPoint(new b.Vector3(a.x, a.y + 1, a.z), new b.Vector3(a.x, a.y + 1, a.z - 10), c.handle, 17) || void 0 !== b.raycasting.testPointToPoint(new b.Vector3(a.x, a.y - 1, a.z), new b.Vector3(a.x, a.y - 1, a.z - 10), c.handle, 17) || c.isSwimming() || c.isSwimmingUnderWater() || p(a) || c.__acNoclipTrigger || (c.__acNoclipTrigger = !0, b.events.callRemote("s_ac_noclip_t", c))
                    }
                }
            }
            d = r, e = s
        }, 250), b.events.add("playerSpawn", a => {
            a == b.players.local && (j = new Date().getTime())
        });
        const o = (a, ...c) => {
                0 === h && b.events.callRemoteUnreliable(a, ...c)
            },
            p = a => {
                for (const c of b.vehicles.streamed)
                    if (14 === c.getClass() && 15 > b.dist(a.x, a.y, a.z, c.position.x, c.position.y, c.position.z)) return !0;
                return !1
            }
    })();
    const B = {
        ...b
    };
    B.events = {
        ...b.events
    }, B._events = {
        ...b._events
    }, B.events.call = void 0, B.events.callRemote = void 0, B.events.callRemoteUnreliable = void 0, B._events.call = void 0, B._events.callRemote = void 0, B._events.callRemoteUnreliable = void 0, B.api = void 0, B.clientEvCrypt = void 0, B.game = void 0, B.game1 = void 0, B.game2 = void 0, Object.defineProperty(global, "mp", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: B
    })
}