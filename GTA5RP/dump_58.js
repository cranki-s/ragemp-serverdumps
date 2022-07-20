{
    const mp = global.mp,
        localPlayer = mp.players.local;
    global.startAdminAuth = !1, global.isAdmin = !1, global.adminLevel = 0, global.consoleBrowser = global.mainBrowser, global.isConsoleOpen = !1;
    let cameraInterval = null;
    const toggleConsole = () => {
        global.isAuth && (global.startAdminAuth || 0 !== global.adminLevel) && !global.isChatOpen && global.consoleBrowser.call("cb:console:toggle")
    };
    mp.keys.bind(192, !1, toggleConsole), global.setAdminLevel = a => {
        global.isAdmin = 0 < a, global.adminLevel = a, global.consoleBrowser.call("cb:console:setLevel", a), null !== cameraInterval && (clearInterval(cameraInterval), cameraInterval = null), global.isAdmin && (cameraInterval = setInterval(() => {
            mp.game.invoke(`0xF4F2C0D4EE209E20`)
        }, 1e4))
    }, global.debugCoordsFixed = 2, global.rpc.register("client_console_getMyCoords", function () {
        const a = localPlayer.vehicle;
        if (a) {
            const {
                x: b,
                y: c,
                z: d
            } = a.position;
            return {
                ground: `${b.toFixed(global.debugCoordsFixed)}, ${c.toFixed(global.debugCoordsFixed)}, ${d.toFixed(global.debugCoordsFixed)}`,
                standart: `${b.toFixed(global.debugCoordsFixed)}, ${c.toFixed(global.debugCoordsFixed)}, ${d.toFixed(global.debugCoordsFixed)}`,
                rot: a.getHeading().toFixed(2)
            }
        } else {
            const {
                x: a,
                y: b,
                z: c
            } = localPlayer.position;
            return {
                ground: `${a.toFixed(global.debugCoordsFixed)}, ${b.toFixed(global.debugCoordsFixed)}, ${(c-1).toFixed(global.debugCoordsFixed)}`,
                standart: `${a.toFixed(global.debugCoordsFixed)}, ${b.toFixed(global.debugCoordsFixed)}, ${c.toFixed(global.debugCoordsFixed)}`,
                rot: localPlayer.getHeading().toFixed(2),
                gameData: localPlayer.position
            }
        }
    }), mp.api.server.register("client_console_getMyName", () => mp.api.server.success(localPlayer.getVariable("characterName").replace(" ", "_"))), global.rpc.on("client_console_setClothes", function (a) {
        6 > global.adminLevel || (0 >= a.component ? localPlayer.setPropIndex(-1 * a.component, a.id, a.color, !0) : localPlayer.setComponentVariation(a.component, a.id, a.color, 2))
    }), mp.events.add("client_console_setLocalModel", a => {
        mp.players.local.model = mp.game.joaat(a)
    });
    let camera = null;
    global.rpc.register("client_console_setCameraToPlayer", function (a) {
        var b = localPlayer.position,
            c = {
                Angle: localPlayer.getRotation(2).z + (1 == a ? 90 : -90),
                Dist: 1,
                Height: .6
            },
            d = function (a, b, c) {
                return b *= .0174533, a.y += c * Math.sin(b), a.x += c * Math.cos(b), a
            }(new mp.Vector3(b.x, b.y, b.z + c.Height), c.Angle, c.Dist);
        return camera && camera.destroy(), camera = mp.cameras.new("default", d, new mp.Vector3(0, 0, 0), 80), camera.pointAtCoord(b.x, b.y, b.z), camera.setActive(!0), mp.game.cam.renderScriptCams(!0, !0, 500, !0, !1), {
            position: {
                x: parseFloat(d.x.toFixed(2)),
                y: parseFloat(d.y.toFixed(2)),
                z: parseFloat(d.z.toFixed(2))
            },
            point: {
                x: parseFloat(b.x.toFixed(2)),
                y: parseFloat(b.y.toFixed(2)),
                z: parseFloat(b.z.toFixed(2))
            }
        }
    }), global.rpc.on("client_console_setCamera", function (a) {
        camera && (camera.destroy(), camera = mp.cameras.new("default", new mp.Vector3(a.position.x, a.position.y, a.position.z), new mp.Vector3(a.rot.x, a.rot.y, a.rot.z), 60), camera.pointAtCoord(a.point.x, a.point.y, a.point.z), camera.setActive(!0), mp.game.cam.renderScriptCams(!0, !0, 300, !0, !1))
    }), global.rpc.on("client_console_resetCamera", function () {
        mp.game.cam.renderScriptCams(!1, !1, 0, !0, !1), camera && (camera.destroy(), camera = null)
    }), global.rpc.on("client_console_teleport", function (a) {
        global.isAdmin && localPlayer.setCoordsNoOffset(a.x, a.y, a.z, !1, !1, !1)
    }), mp.keys.bind(115, !1, function () {
        0 >= global.adminLevel || mp.events.callRemote("server_adminConsole_command", "fly")
    }), mp.keys.bind(116, !1, function () {
        if (!(0 >= global.adminLevel)) {
            const a = mp.api.player.getWaypointPosition();
            a && localPlayer.setCoordsNoOffset(a.x, a.y, a.z + 1, !1, !1, !1)
        }
    });
    let specPlayer = null;
    mp.events.add("client_admin_spec", a => {
        mp.events.remove("render", specRenderEvent); - 1 === a || (specPlayer = mp.players.atRemoteId(a), localPlayer.freezePosition(!0), mp.events.add("render", specRenderEvent))
    });
    const specRenderEvent = () => {
        if (!mp.players.exists(specPlayer)) return global.rpc.triggerClient("clientFunc_notifyError", "\u0427\u0435\u043B\u043E\u0432\u0435\u043A \u0432\u044B\u0448\u0435\u043B \u0438\u0437 \u0438\u0433\u0440\u044B"), mp.events.callRemote("server_admin_recon_off"), void mp.events.call("client_admin_spec", -1);
        if (0 === specPlayer.handle) return void(global.actionAntiFlood("server_admin_recon_reset", 1500) && mp.events.callRemote("server_admin_recon_reset", specPlayer.remoteId));
        const {
            x: a,
            y: b,
            z: c
        } = specPlayer.position;
        15e3 < a || 15e3 < b || 15e3 < c || 1 > a && 1 > b && 5 > c && -1 < a && -1 < b && -5 < c || (localPlayer.freezePosition(!0), localPlayer.setCoordsNoOffset(a, b, c - 3, !1, !1, !1), mp.game.invoke("0x8BBACBF51DA047A8", specPlayer.handle))
    };
    mp.events.add("client_console_startCreateObject", a => {
        toggleConsole(), mp.events.call("client_mapEditor_startAddObjectClient", "__client_console_endCreateObject", a)
    }), mp.events.add("__client_console_endCreateObject", (a, b, c, d, e, f) => void 0 === a ? toggleConsole() : void(global.consoleBrowser.execute(`console_setLastCreatedObjectCoords(${parseFloat(a.toFixed(2))}, ${parseFloat(b.toFixed(2))}, ${parseFloat(c.toFixed(2))}, ${parseFloat(d.toFixed(2))}, ${parseFloat(e.toFixed(2))}, ${parseFloat(f.toFixed(2))});`), toggleConsole())), global.rpc.register("client_console_actionObjectGetCoords", () => [mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z - 1, mp.players.local.getHeading()]), mp.events.add("client_console_actionObjectTest", (a, b, c, d, e, f) => {
        if (mp.players.local.freezePosition(!0), mp.players.local.setCollision(!0, !0), mp.players.local.setHeading(d), mp.players.local.setCoordsNoOffset(a, b, c, !1, !1, !1), "" !== e) {
            if (!mp.game.streaming.hasAnimDictLoaded(e))
                for (mp.game.streaming.requestAnimDict(e); !mp.game.streaming.hasAnimDictLoaded(e);) mp.game.wait(0);
            mp.players.local.taskPlayAnim(e, f, 1, 0, -1, 1, 1, !1, !1, !1)
        }
    }), mp.events.add("client_console_actionObjectReset", () => {
        mp.players.local.freezePosition(!1), mp.players.local.setCollision(!0, !1), mp.players.local.clearTasksImmediately()
    }), mp.events.add("c_admin_report", (a, b, c, d, e) => {
        let f = "";
        1 === d ? f = " !{03FC49}[\u041C\u0415\u0414\u0418\u0410] " : 2 == d && (f = " !{03FC49}[\u041B\u0418\u0414\u0415\u0420] "), global.consoleBrowser.execute(`console_reportNewMessage(${b}, '${escape(c)}', '${escape(e)}');`), mp.gui.chat.push(`!{EE2B4C}[Репорт ${a}]${f}!{C9BE3C}${c}[${b}]: !{FFFFFF}${e}`)
    }), mp.events.add("c_admin_report_a", (a, b, c, d) => {
        global.consoleBrowser.execute(`console_reportNewMessage(${a}, '${escape(c)}', '${escape(d)}');`), mp.gui.chat.push(`!{EE2B4C}[Ответ] !{C9BE3C}[A]${c} -> ${b}[${a}]: !{FFFFFF}${d}`)
    }), mp.events.add("c_admin_notify", (a, b) => {
        global.consoleBrowser.execute(`console_notify('${escape(a)}', '${escape(b)}');`)
    }), mp.events.add("c_admin_chat", a => {
        global.consoleBrowser.execute(`console_adminChat('${escape(a)}');`)
    }), mp.events.add("c_admin_log", a => {
        const b = global.getServerTime(),
            c = a => 10 > a ? "0" + a : a;
        global.consoleBrowser.execute(`console_adminLog('${escape(`[${c(b[0])}:${c(b[1])}:${c(b[2])}] ${a}`)}');`)
    }), mp.events.add("c_admin_clog", (a, b, c, d) => {
        mp.events.call("c_admin_log", `${b}[${a}] использует команду ${c} [${d}]`)
    }), mp.events.add("c_admin_klog", (a, b, c, d, e) => {
        const f = global.getServerTime(),
            g = a => 10 > a ? "0" + a : a;
        global.consoleBrowser.execute(`console_adminKillLog('${escape(`[${g(f[0])}:${g(f[1])}:${g(f[2])}] ${a}[${b}] убил ${c}[${d}] - ${{2460120199:"Antique Cavalry Dagger",2508868239:"Baseball Bat",4192643659:"Bottle",2227010557:"Crowbar",2725352035:"Fist",2343591895:"Flashlight",1141786504:"Golf Club",1317494643:"Hammer",4191993645:"Hatchet",3638508604:"Knuckle",2578778090:"Knife",3713923289:"Machete",3756226112:"Switchblade",1737195953:"Nightstick",419712736:"Pipe Wrench",3441901897:"Battle Axe",2484171525:"Pool Cue",940833800:"Stone Hatchet",453432689:"Pistol",3219281620:"Pistol MK2",1593441988:"Combat Pistol",584646201:"AP Pistol",911657153:"Stun Gun",2578377531:"Pistol .50",3218215474:"SNS Pistol",2285322324:"SNS Pistol MK2",3523564046:"Heavy Pistol",137902532:"Vintage Pistol",1198879012:"Flare Gun",3696079510:"Marksman Pistol",3249783761:"Heavy Revolver",3415619887:"Heavy Revolver MK2",2548703416:"Double Action",2939590305:"Up-n-Atomizer",324215364:"Micro SMG",736523883:"SMG",2024373456:"SMG MK2",4024951519:"Assault SMG",171789620:"Combat PDW",3675956304:"Machine Pistol",3173288789:"Mini SMG",1198256469:"Unholy Hellbringer",487013001:"Pump Shotgun",1432025498:"Pump Shotgun MK2",2017895192:"Sawed-Off Shotgun",3800352039:"Assault Shotgun",2640438543:"Bullpup Shotgun",2828843422:"Musket",984333226:"Heavy Shotgun",4019527611:"Double Barrel Shotgun",317205821:"Sweeper Shotgun",3220176749:"Assault Rifle",961495388:"Assault Rifle MK2",2210333304:"Carbine Rifle",4208062921:"Carbine Rifle MK2",2937143193:"Advanced Rifle",3231910285:"Special Carbine",2526821735:"Special Carbine MK2",2132975508:"Bullpup Rifle",2228681469:"Bullpup Rifle MK2",1649403952:"Compact Rifle",2634544996:"MG",2144741730:"Combat MG",3686625920:"Combat MG MK2",1627465347:"Gusenberg Sweeper",100416529:"Sniper Rifle",205991906:"Heavy Sniper",177293209:"Heavy Sniper MK2",3342088282:"Marksman Rifle",1785463520:"Marksman Rifle MK2",2982836145:"RPG",2726580491:"Grenade Launcher",1305664598:"Smoke Grenade Launcher",1119849093:"Minigun",2138347493:"Firework Launcher",1834241177:"Railgun",1672152130:"Homing Launcher",125959754:"Compact Grenade Launcher",3056410471:"Ray Minigun",2481070269:"Grenade",2694266206:"BZ Gas",4256991824:"Smoke Grenade",1233104067:"Flare",615608432:"Molotov",741814745:"Sticky Bomb",2874559379:"Proximity Mine",126349499:"Snowball",3125143736:"Pipe Bomb",600439132:"Baseball",883325847:"Jerry Can",101631238:"Fire Extinguisher",4222310262:"Parachute",2461879995:"Electric Fence",3425972830:"Hit by Water Cannon",133987706:"Rammed by Car",2741846334:"Run Over by Car",3452007600:"Fall",4194021054:"Animal",324506233:"Airstrike Rocket",2339582971:"Bleeding",2294779575:"Briefcase",28811031:"Briefcase 02",148160082:"Cougar",1223143800:"Barbed Wire",4284007675:"Drowning",1936677264:"Drowning In Vehicle",539292904:"Explosion",910830060:"Exhaustion",3750660587:"Fire",341774354:"Heli Crash",3204302209:"Vehicle Rocket",2282558706:"Vehicle Akula Barrage",431576697:"Vehicle Akula Minigun",2092838988:"Vehicle Akula Missile",476907586:"Vehicle Akula Turret Dual",3048454573:"Vehicle Akula Turret Single",328167896:"Vehicle APC Cannon",190244068:"Vehicle APC MG",1151689097:"Vehicle APC Missile",3293463361:"Vehicle Ardent MG",2556895291:"Vehicle Avenger Cannon",2756453005:"Vehicle Barrage Rear GL",1200179045:"Vehicle Barrage Rear MG",525623141:"Vehicle Barrage Rear Minigun",4148791700:"Vehicle Barrage Top MG",1000258817:"Vehicle Barrage Top Minigun",3628350041:"Vehicle Bombushka Cannon",741027160:"Vehicle Bombushka Dual MG",3959029566:"Vehicle Cannon Blazer",1817275304:"Vehicle Caracara MG",1338760315:"Vehicle Caracara Minigun",2722615358:"Vehicle Cherno Missile",3936892403:"Vehicle Comet MG",2600428406:"Vehicle Deluxo MG",3036244276:"Vehicle Deluxo Missile",1595421922:"Vehicle Dogfighter MG",3393648765:"Vehicle Dogfighter Missile",2700898573:"Vehicle Dune Grenade Launcher",3507816399:"Vehicle Dune MG",1416047217:"Vehicle Dune Minigun",1566990507:"Vehicle Enemy Laser",1987049393:"Vehicle Hacker Missile",2011877270:"Vehicle Hacker Missile Homing",1331922171:"Vehicle Halftrack Dual MG",1226518132:"Vehicle Halftrack Quad MG",855547631:"Vehicle Havok Minigun",785467445:"Vehicle Hunter Barrage",704686874:"Vehicle Hunter Cannon",1119518887:"Vehicle Hunter MG",153396725:"Vehicle Hunter Missile",2861067768:"Vehicle Insurgent Minigun",507170720:"Vehicle Khanjali Cannon",2206953837:"Vehicle Khanjali Cannon Heavy",394659298:"Vehicle Khanjali GL",711953949:"Vehicle Khanjali MG",3754621092:"Vehicle Menacer MG",3303022956:"Vehicle Microlight MG",3846072740:"Vehicle Mobileops Cannon",3857952303:"Vehicle Mogul Dual Nose",3123149825:"Vehicle Mogul Dual Turret",4128808778:"Vehicle Mogul Nose",3808236382:"Vehicle Mogul Turret",2220197671:"Vehicle Mule4 MG",1198717003:"Vehicle Mule4 Missile",3708963429:"Vehicle Mule4 Turret GL",2786772340:"Vehicle Nightshark MG",1097917585:"Vehicle Nose Turret Valkyrie",3643944669:"Vehicle Oppressor MG",2344076862:"Vehicle Oppressor Missile",3595383913:"Vehicle Oppressor2 Cannon",3796180438:"Vehicle Oppressor2 MG",1966766321:"Vehicle Oppressor2 Missile",3473446624:"Vehicle Plane Rocket",1186503822:"Vehicle Player Buzzard",3800181289:"Vehicle Player Lazer",1638077257:"Vehicle Player Savage",2456521956:"Vehicle Pounder2 Barrage",2467888918:"Vehicle Pounder2 GL",2263283790:"Vehicle Pounder2 Mini",162065050:"Vehicle Pounder2 Missile",3530961278:"Vehicle Radar",3177079402:"Vehicle Revolter MG",3878337474:"Vehicle Rogue Cannon",158495693:"Vehicle Rogue MG",1820910717:"Vehicle Rogue Missile",50118905:"Vehicle Ruiner Bullet",84788907:"Vehicle Ruiner Rocket",3946965070:"Vehicle Savestra MG",231629074:"Vehicle Scramjet MG",3169388763:"Vehicle Scramjet Missile",1371067624:"Vehicle Seabreeze MG",3450622333:"Vehicle Searchlight",4171469727:"Vehicle Space Rocket",3355244860:"Vehicle Speedo4 MG",3595964737:"Vehicle Speedo4 Turret MG",2667462330:"Vehicle Speedo4 Turret Mini",968648323:"Vehicle Strikeforce Barrage",955522731:"Vehicle Strikeforce Cannon",519052682:"Vehicle Strikeforce Missile",1176362416:"Vehicle Subcar MG",3565779982:"Vehicle Subcar Missile",3884172218:"Vehicle Subcar Torpedo",1744687076:"Vehicle Tampa Dual Minigun",3670375085:"Vehicle Tampa Fixed Minigun",2656583842:"Vehicle Tampa Missile",1015268368:"Vehicle Tampa Mortar",1945616459:"Vehicle Tank",3683206664:"Vehicle Technical Minigun",1697521053:"Vehicle Thruster MG",1177935125:"Vehicle Thruster Missile",2156678476:"Vehicle Trailer Dualaa",341154295:"Vehicle Trailer Missile",1192341548:"Vehicle Trailer Quad MG",2966510603:"Vehicle Tula Dual MG",1217122433:"Vehicle Tula MG",376489128:"Vehicle Tula Minigun",1100844565:"Vehicle Tula Nose MG",3041872152:"Vehicle Turret Boxville",1155224728:"Vehicle Turret Insurgent",729375873:"Vehicle Turret Limo",2144528907:"Vehicle Turret Technical",2756787765:"Vehicle Turret Valkyrie",4094131943:"Vehicle Vigilante MG",1347266149:"Vehicle Vigilante Missile",2275421702:"Vehicle Viseris MG",1150790720:"Vehicle Volatol Dual MG",1741783703:"Vehicle Water Cannon"}[e]}`)}');`)
    }), mp.events.add("c_admin_alog", (a, b, c, d) => {
        const e = global.getServerTime(),
            f = a => 10 > a ? "0" + a : a;
        1 === d && mp.gui.chat.push(`!{EE2B4C}[ВХОД]!{FFFFFF}${b}[${a}] SOCIAL: ${c}`), global.consoleBrowser.execute(`console_playerAuthLog('${escape(`[${f(e[0])}:${f(e[1])}:${f(e[2])}] ${b}[${a}] L: ${d} S: ${c}`)}');`)
    }), mp.events.add("c_admin_cheatl", (a, b, c, d, e) => {
        const f = global.getServerTime(),
            g = a => 10 > a ? "0" + a : a;
        global.consoleBrowser.call("console_antiCheatLog", `${g(f[0])}:${g(f[1])}:${g(f[2])}`, a, b, c, d, e)
    });
}