{
    const mp = global.mp,
        localPlayer = mp.players.local,
        graphics = mp.game.graphics;
    graphics.requestStreamedTextureDict("mpleaderboard", !0);
    let _screenX = 0,
        _screenY = 0,
        _txtResMicroX = 0,
        _txtResMicroY = 0,
        _txtResMuteX = 0,
        _txtResMuteY = 0;
    setTimeout(() => {
        const a = graphics.getScreenResolution(0, 0);
        _screenX = a.x, _screenY = a.y;
        const b = graphics.getTextureResolution("mpleaderboard", "leaderboard_audio_3");
        _txtResMicroX = b.x * (1 / _screenX), _txtResMicroY = b.y * (1 / _screenY);
        const c = graphics.getTextureResolution("mpleaderboard", "leaderboard_audio_mute");
        _txtResMuteX = c.x * (1 / _screenX), _txtResMuteY = c.y * (1 / _screenY)
    }, 5000);
    const maxDistance = 300,
        width = .03,
        height = .006,
        border = .001;
    mp.nametags.enabled = !1, global.enableNameTags = !0, global.disableNameTagsBind = !1, global.binder.register({
        action: "NAMETAGS_TOGGLE",
        desc: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C\\\u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043D\u0438\u043A\u0438",
        defaultKey: -1,
        func: () => {
            global.disableNameTagsBind || (global.enableNameTags = !global.enableNameTags)
        }
    }), global.rpc.on("__client_event_globalStorage_load", a => {
        global.enableNameTags = a.settings.enableNametags
    }), setInterval(() => {
        const a = global.getEntityVariable(localPlayer, "factionId", ""),
            b = global.getEntityVariable(localPlayer, "familyId", "");
        mp.players.forEachInStreamRange(c => {
            c.__nametagCoord = null, c.__displayName = global.isCharacterFriend(c.getVariable("characterId")) && !c.getVariable("isPlayerInMask") || "" !== a && c.getVariable("factionId") === a || "" !== b && c.getVariable("familyId") === b || c.getVariable("isInPrison") ? `${c.getVariable("characterName")} (${c.remoteId})` : `${c.getVariable("charName")} (${c.remoteId})`, c.__displayIsAdmin = c.getVariable(mp.serverDataKeys.isAdmin), c.__displayIsVoiceDisable = c.getVariable("voiceDisable"), c.__disableNametag = 10 > c.getAlpha(), c.__voiceSprite = c.isVoiceActive ? .7 < c.voiceVolume ? "leaderboard_audio_3" : .4 < c.voiceVolume ? "leaderboard_audio_2" : "leaderboard_audio_1" : ""
        })
    }, 1500);
    const drawRect = graphics.drawRect.bind(graphics),
        drawText = graphics.drawText.bind(graphics),
        drawSprite = graphics.drawSprite.bind(graphics),
        setDrawOrigin = graphics.setDrawOrigin.bind(graphics),
        clearDrawOrigin = graphics.clearDrawOrigin.bind(graphics);
    mp.events.add("render", a => {
        if (!a || !global.enableNameTags) return;
        const b = mp.game.player.getEntityIsFreeAimingAtRaw();
        if (a.forEach(a => {
                var c = Math.max;
                let [d, e, f, g] = a;
                if (g <= maxDistance && !d.__disableNametag && void 0 !== d.__displayName) {
                    if (f -= c(g / maxDistance, .4) * (.005 * (_screenY / 1080)) - .05, drawText(d.__displayName, [e, f], {
                            font: 4,
                            color: [255, 255, 255, 255],
                            scale: [.4, .4],
                            outline: !0
                        }), d.__nametagCoord = [e, f], d.__displayIsAdmin && (d.__nametagCoord = [e, f - .02], drawText("\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0441\u0435\u0440\u0432\u0435\u0440\u0430", [e, f - .02], {
                            font: 4,
                            color: [255, 0, 0, 255],
                            scale: [.3, .3],
                            outline: !0
                        })), "" !== d.__voiceSprite) {
                        const a = 1 * c(.1, 1 - g / maxDistance);
                        drawSprite("mpleaderboard", d.__voiceSprite, e, f - .02, a * _txtResMicroX, a * _txtResMicroY, 0, 255, 255, 255, 255)
                    } else if (d.__displayIsVoiceDisable) {
                        const a = 1 * c(.1, 1 - g / maxDistance);
                        drawSprite("mpleaderboard", "leaderboard_audio_mute", e, f - .02, a * _txtResMuteX, a * _txtResMuteY, 0, 255, 0, 0, 255)
                    }
                    if (d.handle === b) {
                        f += .04;
                        const a = d.getHealth() / 100,
                            b = d.getArmour() / 100;
                        0 < b ? (drawRect(e, f, width + 2 * border, height + 2 * border, 0, 0, 0, 200), drawRect(e, f, width, height, 41, 66, 78, 255), drawRect(e - width / 2 * (1 - b), f, width * b, height, 48, 108, 135, 200), f -= .008, drawRect(e, f, width + 2 * border, height + 2 * border, 0, 0, 0, 200), drawRect(e, f, width, height, 150, 150, 150, 255), drawRect(e - width / 2 * (1 - a), f, width * a, height, 255, 255, 255, 200)) : (drawRect(e, f, width + 2 * border, height + 2 * border, 0, 0, 0, 200), drawRect(e, f, width, height, 150, 150, 150, 255), drawRect(e - width / 2 * (1 - a), f, width * a, height, 255, 255, 255, 200))
                    }
                }
            }), void 0 !== b) {
            const a = mp.players.atHandle(b);
            if (a) return void(a.__disableRagdollFromHit || a.isRagdoll() || (a.setCanRagdoll(!1), a.__disableRagdollFromHit = setTimeout(() => {
                delete a.__disableRagdollFromHit, mp.players.exists(a) && 0 !== a.handle && a.setCanRagdoll(!0)
            }, 500)));
            const c = mp.peds.atHandle(b);
            if (!c || !c.isDynamic) return;
            const {
                x: d,
                y: e,
                z: f
            } = localPlayer.position, {
                x: g,
                y: h,
                z: i
            } = c.getCoords(!0);
            if (25 > mp.dist(d, e, f, g, h, i)) {
                setDrawOrigin(g, h, i + 1, 0);
                const a = c.getHealth() / 100,
                    b = c.getArmour() / 100;
                0 < b ? (drawRect(0, 0, width + 2 * border, height + 2 * border, 0, 0, 0, 200), drawRect(0, 0, width, height, 41, 66, 78, 255), drawRect(0 - width / 2 * (1 - b), 0, width * b, height, 48, 108, 135, 200), drawRect(0, -.008, width + 2 * border, height + 2 * border, 0, 0, 0, 200), drawRect(0, -.008, width, height, 150, 150, 150, 255), drawRect(0 - width / 2 * (1 - a), -.008, width * a, height, 255, 255, 255, 200)) : (drawRect(0, 0, width + 2 * border, height + 2 * border, 0, 0, 0, 200), drawRect(0, 0, width, height, 150, 150, 150, 255), drawRect(0 - width / 2 * (1 - a), 0, width * a, height, 255, 255, 255, 200)), clearDrawOrigin()
            }
        }
    });
}