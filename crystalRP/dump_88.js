{
﻿var cam = mp.cameras.new('default', new mp.Vector3(4519.5347, 1927.2899, 2698.155), new mp.Vector3(0, 0, 0), 70);
cam.pointAtCoord(4519.5347, 1927.2899, 0);
cam.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);

var respawn = mp.browsers["new"]('package://cef/respawn.html');
var auth = mp.browsers["new"]('package://cef/auth.html');
auth.execute(`slots.server=${serverid};`);
mp.gui.cursor.visible = true;

var lastButAuth = 0;
var lastButSlots = 0;

setTimeout(function () { 
    if (mp.storage.data.account)
    {
        auth.execute(`document.getElementById("entry-login-id").value = "${mp.storage.data.account.username}";`);
        auth.execute(`document.getElementById("entry-password-id").value = "${mp.storage.data.account.pass}";`);
        auth.execute(`document.getElementById("entry-savemy").checked = true;`);
    }
}, 150);

// events from cef
mp.events.add('signin', function (authData) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
    lastButAuth = new Date().getTime();

    authData = JSON.parse(authData);

    var username = authData['entry-login'],
        pass = authData['entry-password'];
        check = authData['entry-savemy'];

    if (check) {
        mp.storage.data.account = {
            username: username,
            pass: pass
        };
    } else delete mp.storage.data.account;

    mp.events.callRemote('signin', username, pass)
});

mp.events.add('restorepass', function (state, authData) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
    lastButAuth = new Date().getTime();
    authData = JSON.parse(authData);
    var nameorcode = authData['entry-login'];
    mp.events.callRemote('restorepass', state, nameorcode)
});

mp.events.add('signup', function (regData) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
    lastButAuth = new Date().getTime();

    regData = JSON.parse(regData);
    var username = regData['new-user__login'],
        email = regData['new-user__email'],
        pass1 = regData['new-user__pw'],
        pass2 = regData['new-user__pw-repeat'];

    if (checkLgin(username) || username.length > 50) {
        mp.events.call('notify', 1, 9, 'Логин не соответствует формату или слишком длинный!', 3000);
        return;
    }

    if (pass1 != pass2 || pass1.length < 3) {
        mp.events.call('notify', 1, 9, 'Ошибка при вводе пароля!', 3000);
        return;
    }

    mp.events.callRemote('signup', username, pass1, email);
});

mp.events.add('selectChar', function (slot) {
    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
    lastButSlots = new Date().getTime();
	if (auth != null) {
        auth.destroy();
        auth = null;
		mp.events.callRemote('selectchar', slot);
    }
});

mp.events.add('newChar', function (slot, name, lastname) {
    if (checkName(name) || !checkName2(name) || name.length > 25 || name.length <= 2) {
        mp.events.call('notify', 1, 9, 'Правильный формат имени: 3-25 символов и первая буква имени заглавная', 3000);
        return;
    }

    if (checkName(lastname) || !checkName2(lastname) || lastname.length > 25 || lastname.length <= 2) {
        mp.events.call('notify', 1, 9, 'Правильный формат фамилии: 3-25 символов и первая буква фамилии заглавная', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('newchar', slot, name, lastname);
});

mp.events.add('delChar', function (slot, name, lastname, pass) {
    if (checkName(name) || name.length > 25 || name.length <= 2) {
        mp.events.call('notify', 1, 9, 'Правильный формат имени: 3-25 символов и первая буква имени заглавная', 3000);
        return;
    }

    if (checkName(lastname) || lastname.length > 25 || lastname.length <= 2) {
        mp.events.call('notify', 1, 9, 'Правильный формат фамилии: 3-25 символов и первая буква фамилии заглавная', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('delchar', slot, name, lastname, pass);
});

mp.events.add('transferChar', function (slot, name, lastname, pass) {
    if (checkName(name)) {
        mp.events.call('notify', 1, 9, 'Имя не соответствует формату или слишком длинное!', 3000);
        return;
    }

    if (checkName(lastname)) {
        mp.events.call('notify', 1, 9, 'Фамилия не соответствует формату или слишком длинное!', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('transferchar', slot, name, lastname, pass);
});

mp.events.add('spawn', function (data) {
    if (new Date().getTime() - lastButSlots < 1000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
	if (respawn != null) {
        respawn.destroy();
        respawn = null;
		lastButSlots = new Date().getTime();
		mp.events.callRemote('spawn', data);
    }
});

mp.events.add('buyNewSlot', function (data) {
    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
	lastButSlots = new Date().getTime();
	mp.events.callRemote('donate', 8, data);
});

// events from server
mp.events.add('delCharSuccess', function (data) {
    auth.execute(`delchar(${data})`);
});

mp.events.add('unlockSlot', function (data) {
    auth.execute(`unlockSlot(${data})`);
});

mp.events.add('toslots', function (data) {
    auth.execute(`toslots('${data}')`);
});

mp.events.add('spawnShow', function (data) {
    if (data === false) {
        if (respawn != null) {
            respawn.destroy();
            respawn = null;
        }
    }
    else {
        if (respawn != null)
            respawn.execute(`set('${data}')`);
    }
    if (auth != null) {
        auth.destroy();
        auth = null;
    }
});

mp.events.add('ready', function () {
    global.loggedin = true;
    global.menuClose();
    mp.game.cam.renderScriptCams(false, true, 3000, true, true);

    mp.events.call('showHUD', true);
    mp.events.call('hideTun');
    mp.game.player.setHealthRechargeMultiplier(0);

    global.menu = mp.browsers["new"]('package://cef/menu.html');
    //global.helpmenu = mp.browsers["new"]('package://browser/help.html');

    if (respawn != null) {
        respawn.destroy();
        respawn = null;
    }

    if (auth != null) {
        auth.destroy();
        auth = null;
    }
});

function checkLgin(str) {
    return !(/^[a-zA-Z1-9]*$/g.test(str));
}

function checkName(str) {
    return !(/^[a-zA-Z]*$/g.test(str));
}

function checkName2(str) {
    let ascii = str.charCodeAt(0);
    if (ascii < 65 || ascii > 90) return false; // Если первый символ не заглавный, сразу отказ
    let bsymbs = 0; // Кол-во заглавных символов
    for (let i = 0; i != str.length; i++) {
        ascii = str.charCodeAt(i);
        if (ascii >= 65 && ascii <= 90) bsymbs++;
    }
    if (bsymbs > 2) return false; // Если больше 2х заглавных символов, то отказ. (На сервере по правилам разрешено иметь Фамилию, например McCry, то есть с приставками).
    return true; // string (имя или фамилия) соответствует
}

mp.events.add('authNotify', (type, layout, msg, time) => {
    if(auth != null) auth.execute(`notify(${type},${layout},'${msg}',${time})`);
	else mp.events.call('notify', type, layout, msg, time);
});
}