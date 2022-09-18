{
﻿globalThis.browser.open();
globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: '/authentication/login' })})`);
var authconfig = JSON.stringify(mp.storage.data.auth)

let gender_player = localplayer.model == mp.game.joaat('mp_m_freemode_01');
mp.events.add('Authentication.Login.Submit', (data) => {
    data = JSON.parse(data)
    Nexus.callRemote('Server:Authentication.Login.Submit', data.login, data.password)
    updateGameTime = false;
    mp.game.time.setClockTime(10, 0, 0);
});
mp.events.add('ServerCallback:Authentication.Login.Submit', (sucsess,data,error) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.Login.Submit', ${sucsess}, ${data}, "${error}")`);
    if(sucsess) mp.events.call('client_playerAuth_startSelectCharatcer');
});
mp.events.add('Authentication.SelectSpawn.SelectedCharacter', (cardId) => {
    global.resetCamera(0);
    Nexus.callRemote('Server:Authentication.SelectSpawn.SelectedCharacter', cardId)
});
mp.events.add('ServerCallback:Authentication.SelectSpawn.SelectedCharacter', (sucsess, error) => {
    if (sucsess) {
        mp.events.call('client_playerAuth_showPlayer');
    }
    globalThis.browser.execute(`RPC.resolve('Authentication.SelectSpawn.SelectedCharacter', ${sucsess},"${error}")`);
});
mp.events.add('Authentication.SelectSpawn.GetAllowSpawnPoint', () => {
    Nexus.callRemote('Server:Authentication.SelectSpawn.GetAllowSpawnPoint');
});
mp.events.add('ServerCallback:Authentication.SelectSpawn.GetAllowSpawnPoint', (sucsess, spawnpoint) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.SelectSpawn.GetAllowSpawnPoint', ${sucsess}, ${spawnpoint})`);
});

mp.events.add('Authentication.SelectSpawn.SpawnPoint', (spawnId) => {
    Nexus.callRemote('Server:Authentication.SelectSpawn.SpawnPoint', spawnId);
});

mp.events.add('ServerCallback:Authentication.SelectSpawn.SpawnPoint', (spawnId) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.SelectSpawn.SpawnPoint',true, ${spawnId})`);
});
mp.events.add('Authentication.SelectSpawn.JoinTheGame', (spawnId) => {
    Nexus.callRemote('Server:Authentication.SelectSpawn.JoinTheGame', spawnId);
    updateGameTime = true;
});
mp.events.add('ServerCallback:Authentication.SelectSpawn.JoinTheGame', (spawnId) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.SelectSpawn.JoinTheGame',${spawnId})`);
    globalThis.browser.close();
})

mp.events.add('Authentication.Character.UnlockSlot', (cardId) => {
    Nexus.callRemote('donate', "buyslot", cardId);
})

mp.events.add('ServerCallback:Authentication.Character.UnlockSlot', (sucsess, error) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.Character.UnlockSlot',${sucsess},"${error}")`);
})
mp.events.add('Authentication.Character.Create', (cardId, data) => {
    // window.RPC.resolve('Authentication.Character.Create', true);
    data = JSON.parse(data);
    Nexus.callRemote('Server:Authentication.Character.Create', cardId, data.firstName, data.lastName);
});
mp.events.add('ServerCallback:Authentication.Character.Create', (sucsess, error) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.Character.Create',${sucsess},"${error}")`);
    if (sucsess == true) {
        globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: '/' })})`);
        globalThis.browser.close();
    }
})
mp.events.add('Authentication.Registration.Submit', (data) => {
    data = JSON.parse(data)
    Nexus.callRemote('Server:Authentication.Registration.Submit', data.login, data.password, data.email, data.promocode);
});
mp.events.add('ServerCallback:Authentication.Registration.Submit', (sucsess, obj, error) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.Registration.Submit',${sucsess},${obj},"${error}")`);
})
mp.events.add('ServerCallback:Authentication.Close', () => {
    globalThis.browser.close();
})

mp.events.add('Authentication.Character.Select', (cardId) => {
    mp.events.call('client_playerAuth_hidePlayer');
    Nexus.callRemote('Server:Authentication.Character.Select', cardId)

});
mp.events.add('ServerCallback:Authentication.Character.Select', (sucsess, error) => {
    if (sucsess && error == 'none') {
        mp.events.call('characterGender', "Male");
    }
    globalThis.browser.execute(`RPC.resolve('Authentication.Character.Select',${sucsess},"${error}")`);
})
mp.events.add('Authentication.Login.GetSavedUser', () => {
    if (authconfig) {
        let authData = JSON.parse(authconfig);
        let auth = {
            login: authData['login'],
            password: authData['password']
        }
        globalThis.browser.execute(`RPC.resolve('Authentication.Login.GetSavedUser', true,${JSON.stringify(auth)})`);
    } else { globalThis.browser.execute(`RPC.resolve('Authentication.Login.GetSavedUser', false)`); }
});
mp.events.add('Authentication.Login.SaveUser', (AuthObject) => {
    mp.storage.data.auth = JSON.parse(AuthObject);
    mp.storage.flush();
});
mp.events.add('Authentication.Character.Logout', () => {
    mp.events.call('__client_spawnMenu_freeCamera', true, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z)
    Nexus.callRemote('Server:Authentication.Character.Logout')
});
mp.events.add('ServerCallback:Authentication.Character.Logout', (sucsess) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.Character.Logout', ${sucsess})`);
})
const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
mp.events.add('transfercity', async (eventname, status, data) => {
    let a = 0;
    for (mp.game.invoke("0xAAB3200ED59016BC", mp.players.local.handle, 0, 2); 5 !== mp.game.invoke("0x470555300D10B2A5") && 60 > a;) await mp.game.waitAsync(100), a++;
    mp.events.call(eventname, status, data);

});
let needIn;
let firstMove = !0;
var e = Math.pow;
mp.events.add("changecamPos", async (a, t, _, eventname, spawnId) => {
    if (500 < Math.sqrt(e(mp.players.local.position.x - a, 2) + e(mp.players.local.position.y - t, 2))) {
        firstMove || (mp.game.cam.doScreenFadeOut(300), await mp.game.waitAsync(300),
            mp.game.invoke("0x95C0A5BBDC189AA1"),
            mp.game.invoke("0xAAB3200ED59016BC", mp.players.local.handle, 513, 2),
            await mp.game.waitAsync(200),
            mp.game.cam.doScreenFadeIn(300),
            await mp.game.waitAsync(350)),
            mp.players.local.setCoordsNoOffset(a, t, _ + 1.1, !1, !1, !1),
            mp.players.local.freezePosition(!0),
            firstMove = !1,
            needIn = !1;
        let e = 0;
        for (mp.game.invoke("0xD4793DFF3AF2ABCD"), mp.game.invoke("0xD8295AF639FD9CB8", mp.players.local.handle);
            !mp.game.invoke("0xDFA80CB25D0A19B3") && 60 > e;) await mp.game.waitAsync(100), e++
    } else mp.players.local.setCoordsNoOffset(a, t, _ + 1.1, !1, !1, !1), mp.players.local.freezePosition(!0), needIn = !0;
    //global.menuBrowser.execute(`playerSpawnSelectMenu.vue.waitCamera = false;`)
    mp.events.call(eventname, spawnId);
})
// mp.events.add('Authentication.GetCountdown', () => {
//     Nexus.callRemote('Server:Authentication.GetCountdown');
// });
// mp.events.add('ServerCallBack:Authentication.GetCountdown', (sucsess) => {
//     let a = {
//         time: 'Tue Dec 12 2021 18:00:00',
//         title: 'Добро пожаловать!',
//         subtitle: 'Мы рады тебя видеть на нашем проекте. <br> В данный момент проект готовится к открытию. <br> Просим набраться терпения, ведь мы скоро откроемся!',
//         timerTitle: 'До открытия осталось:',
//       }
//     globalThis.browser.execute(`AppData.state.authentication.countdown = ${JSON.stringify(a)}`);
//     if(sucsess){
//         globalThis.browser.execute(`App.$router.push(${JSON.stringify({path:'/authentication/countdown'})})`);
//     }
// });
mp.events.add('Authentication.ChangeRoute', () => {    
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({path:'/authentication/login'})})`);
});
var cameras = null;
global.setCamera = function (a, b, c, d, f = 0) {
    null != cameras && mp.cameras.exists(cameras) && cameras.destroy(), 
    cameras = mp.cameras.new("default", a, b, c), 
    cameras.pointAtCoord(d.x, d.y, d.z), 
    cameras.setActive(!0), 
    mp.game.cam.renderScriptCams(!0, 0 < f, f, !0, !1)
}
global.resetCamera = function (a = 0) {
    null != cameras && mp.cameras.exists(cameras) && cameras.destroy(), mp.game.cam.renderScriptCams(!1, 0 < a, a, !0, !1)
};
var c = Math.cos,
d = Math.sin;
global.setCameraToPlayer = function(a, b, f, g, h = 0, i = 80) {
    null != cameras && mp.cameras.exists(cameras) && e.destroy();
    var j = function(a, b, e) {
        return b *= .0174533, a.y += e * d(b), a.x += e * c(b), a
    }(new mp.Vector3(mp.players.local.position.x + b.x, mp.players.local.position.y + b.y, mp.players.local.position.z + b.z), 
    mp.players.local.getRotation(2).z + 90 + g, a);
    cameras = mp.cameras.new("default", j, new mp.Vector3(0, 0, 0), i), 
    cameras.pointAtCoord(mp.players.local.position.x + f.x, mp.players.local.position.y + f.y, mp.players.local.position.z + f.z), 
    cameras.setActive(!0), mp.game.cam.renderScriptCams(!0, 0 < h, h, !0, !1)
}
mp.events.add("__client_spawnMenu_freeCamera", async (e, a, t, _) => {
    if (e) {
        let e = 0;
        if (needIn)
            for (mp.game.invoke("0xD8295AF639FD9CB8", mp.players.local.handle), mp.game.invoke("0xAD5FDF34B81BFE79"); mp.game.invoke("0xD9D2CFFF49FAB35F") && 60 > e;) await mp.game.waitAsync(100), e++;
        else
            for (mp.game.invoke("0xAD5FDF34B81BFE79"); mp.game.invoke("0xD9D2CFFF49FAB35F") && 60 > e;) await mp.game.waitAsync(100), e++;
        mp.players.local.freezePosition(!1), mp.game.invoke("0x95C0A5BBDC189AA1")
    } else mp.game.cam.doScreenFadeOut(1500), await mp.game.waitAsync(1550), mp.game.invoke("0x95C0A5BBDC189AA1"), await mp.game.waitAsync(500), mp.players.local.setCoordsNoOffset(a, t, _ + .5, !1, !1, !1), mp.players.local.freezePosition(!0), mp.game.cam.doScreenFadeIn(1900), await mp.game.waitAsync(1200), mp.players.local.freezePosition(!1);
    //global.hideUI(!1)
})
mp.events.add('Authentication.Character.Remove', (cardId) => {
    // window.RPC.resolve('Authentication.Character.Remove', true);
    Nexus.callRemote('Server:Authentication.Character.Remove', cardId)
});
mp.events.add('ServerCallback:Authentication.Character.Remove', (sucsess, error) => {
    globalThis.browser.execute(`RPC.resolve('Authentication.Character.Remove',${sucsess},"${error}")`);
    if (sucsess) mp.events.call('characterGender', "Male");
})
mp.events.add("client_playerAuth_startSelectCharatcer", function () {
    mp.players.local.setCoordsNoOffset(-2246.3, 266, 174.6, !1, !1, !1),
        mp.players.local.setHeading(-155.7), mp.players.local.setAlpha(0),
        global.setCamera(new mp.Vector3(-2244.9, 263.3, 174.6),
            new mp.Vector3(0, 0, 0), 60,
            new mp.Vector3(-2246.3, 266, 174.6), 0)
});
mp.events.add("client_playerAuth_showPlayer", function () {
    mp.players.local.setAlpha(255)
}),
    mp.events.add("client_playerAuth_hidePlayer", function () {
        mp.players.local.setAlpha(0)
    })











global.board = null;
global.cdnKey = null;
// auth.execute(`slots.server=${serverid};`);
// var ss = JSON.stringify(mp.storage.data.auth)
// auth.execute(`ss=${ss};`);
// auth.execute(`checkAuth(ss);`);
mp.gui.cursor.visible = true;

var lastButAuth = 0;
// events from browser

mp.events.add('CDN.Key.Send', (login, key) => {
    try {
        global.cdnKey = {
            login,
            key
        };
        if (global.board != null) {
            global.board.destroy();
            global.board = null;
        }
        global.board = mp.browsers.new('http://package/systems/player/inventory/FRONT/inventory.html');
        global.board.name = 'nexusbrowser';
        global.board.execute(`inventory.setKey(${JSON.stringify(global.cdnKey)})`);
        mp.players.local.browserPhone.execute(`phone.setKey(${JSON.stringify(global.cdnKey)})`);
    } catch { Nexus.callRemote('console', 'Произошла ошибка отправки ключей Auth.js 20') }
});

mp.events.add('ready', function () {
    global.loggedin = true;
    global.menuClose();
    mp.events.call('showHUD', true);
    mp.events.call('hideTun');
    mp.game.player.setHealthRechargeMultiplier(0);
});

}