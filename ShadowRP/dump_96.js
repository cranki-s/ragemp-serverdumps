{
﻿var cam = mp.cameras.new('default', new mp.Vector3(-1622.3545, -1098.4525, 27.562925), new mp.Vector3(0, 0, 0), 70);
cam.pointAtCoord(-1626.2261, -1099.9116, 27.897396);
localplayer.setAlpha(0);
cam.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);
var auth = mp.browsers["new"]('package://browser/modules/Login/index.html');
setTimeout(function () { 
    if (mp.storage.data.account)
    {
        auth.execute(`document.getElementById("entry-login-id").value = "${mp.storage.data.account.username}";`);
        auth.execute(`document.getElementById("entry-password-id").value = "${mp.storage.data.account.pass}";`);
        auth.execute(`document.getElementById("entry-savemy").checked = true;`);
    }
}, 3000);
var wrongpass = 3;

mp.events.add('client::authwrongpass', () => {
	if (wrongpass == 1) {
		mp.events.callRemote('server::kickplayerauth');
		return;
	}
	wrongpass--;
	auth.execute(`slots.countpass=${wrongpass}`);
});
mp.events.add("render", () => {
	if(!mp.gui.cursor.visible && camerastate) // ЛКМ
	{
		camerastate = false;
		setTimeout(function () { 
			checkCamInAirCharSelect();
		}, 500);
	}
});
function checkCamInAirCharSelect() {
	auth.execute(`slots.server=${serverid};`);
    auth.execute(`slots.login=${JSON.stringify(localplayer.name)};`);
	mp.gui.cursor.visible = true;
}
var lastButAuth = 0;
var lastButSlots = 0;

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
	
	var checks = true;
    if (checks) {
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

    //authData = JSON.parse(authData);

    //var nameorcode = authData['entry-login'];

    mp.events.callRemote('restorepass', state, authData)
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
        promo = regData['new-user__promo-code'],
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

    mp.events.callRemote('signup', username, pass1, email, promo);
});

mp.events.add('selectChar', function (slot) {
	if (auth != null) {
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
mp.events.add('client::destroyauth', function () {
    if (auth != null) {
        auth.destroy();
        auth = null;
    }
});
mp.events.add('spawn::auth', function (data) {
    if (new Date().getTime() - lastButSlots < 1000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
    }
    lastButSlots = new Date().getTime();
    mp.events.callRemote('spawn', data);
    mp.game.cam.doScreenFadeOut(800);

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

mp.events.add('buyNewSlot', function (data) {
    if (new Date().getTime() - lastButSlots < 1000) {
        mp.events.call('notify', 4, 9, "Слишком быстро", 3000);
        return;
    }
	lastButSlots = new Date().getTime();
	mp.events.callRemote('donate', 8, data);
});

mp.events.add('delCharSuccess', function (data) {
    auth.execute(`delchar(${data})`);
});

mp.events.add('unlockSlot', function (data) {
    auth.execute(`unlockSlot(${data})`);
});

mp.events.add('toslots', function (data) {
	mp.game.cam.doScreenFadeOut(800);
	mp.events.callRemote('selectchar', 1);
    auth.execute(`slots.restActive("") `);
	setTimeout(() => {
		mp.game.cam.doScreenFadeIn(800);
		auth.execute(`toslots('${data}')`);
		localplayer.position = new mp.Vector3(-94.905624, 6317.117, 31.590352);
		cam.destroy(true);
		cam = null;
		localplayer.setAlpha(255);
		cam = mp.cameras.new('default', new mp.Vector3(-94.8174, 6319.638, 31.770352), new mp.Vector3(0, 0, 0), 25);
		cam.pointAtCoord(-94.905624, 6317.117, 32.000352);
		cam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);
		localplayer.setRotation(0.0, 0.0, -39, 2, true);
	}, 2000);
});

mp.events.add('spawnShow', function (data) {
    if (data === false) {
    }
    else {
        if(auth != undefined || auth != null)
        auth.execute(`slots.set('${data}')`);
    }
});

mp.events.add('ready', function () {
	global.loggedin = true;
	localplayer.setAlpha(255);
    mp.events.call('hideTun');
    mp.game.player.setHealthRechargeMultiplier(0);
	cam.destroy(true);
	cam = null;
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
    global.menu = mp.browsers["new"]('package://browser/menu.html');
	setTimeout(() => {
		mp.game.cam.doScreenFadeIn(800);
		global.menuClose();
		mp.events.call('showHUD', true);
		localplayer.freezePosition(false);
        if (auth != null) {
            auth.destroy();
            auth = null;
        }
	}, 100);
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
}整怨啈⹄桳睯敨灬敭牴㵯笤瑳瑡獥潨桷汥絰⥠഻ऊ灭朮極攮數畣整怨啈⹄瑳瑡潩浮瑥潲␽楻絤⥠഻紊㬩਍਍灭欮祥⹳楢摮䬨祥⹳䭖䕟‬慦獬ⱥ映湵瑣潩⁮⤨笠਍椉⡦敭牴獯潴灰摥 ൻऊ洉⹰癥湥獴挮污剬浥瑯⡥䔢楸䵴瑥潲敓癲牥Ⱒ氠獡獴慴楴湯㬩਍紉਍⥽਻}퐸唯Ǡ