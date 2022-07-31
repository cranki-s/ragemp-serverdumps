(() => {
    var _0x25888b = Object.create, _0x4f60b9 = Object.defineProperty, _0x117ac7 = Object.getOwnPropertyDescriptor, _0xe54462 = Object.getOwnPropertyNames, _0x493a32 = Object.getPrototypeOf, _0x4efe81 = Object.prototype.hasOwnProperty, _0x5bdc4c = (_0x3037f0, _0x5867f0) => () => (_0x5867f0 || _0x3037f0((_0x5867f0 = { 'exports': {} }).exports, _0x5867f0), _0x5867f0.exports), _0x5ae645 = (_0x85e1d2, _0x23caf7, _0x4fd0b0, _0x7c26fe) => {
            if (_0x23caf7 && typeof _0x23caf7 == 'object' || typeof _0x23caf7 == 'function') {
                for (let _0x1c0183 of _0xe54462(_0x23caf7))
                    if (!_0x4efe81.call(_0x85e1d2, _0x1c0183) && _0x1c0183 !== _0x4fd0b0) {
                        _0x4f60b9(_0x85e1d2, _0x1c0183, {
                            'get': () => _0x23caf7[_0x1c0183],
                            'enumerable': !(_0x7c26fe = _0x117ac7(_0x23caf7, _0x1c0183)) || _0x7c26fe.enumerable
                        });
                    }
            }
            return _0x85e1d2;
        }, _0x2f7a3e = (_0xe6ecea, _0x282eac, _0x24c564) => (_0x24c564 = _0xe6ecea != null ? _0x25888b(_0x493a32(_0xe6ecea)) : {}, _0x5ae645(_0x282eac || !_0xe6ecea || !_0xe6ecea.__esModule ? _0x4f60b9(_0x24c564, 'default', {
            'value': _0xe6ecea,
            'enumerable': true
        }) : _0x24c564, _0xe6ecea)), _0x2686b7 = _0x5bdc4c(_0x379b05 => {
            'use strict';
            Object.defineProperty(_0x379b05, '__esModule', { 'value': true });
            var _0x1a8a85 = class {
                    constructor(_0x147ee3, _0x14aefe) {
                        this.optionName = _0x147ee3;
                        this.optionState = _0x14aefe;
                    }
                }, _0x55808f = class {
                    constructor(..._0x3f4a1e) {
                        this.gameplay = _0x3f4a1e;
                    }
                }, _0x344b29 = class {
                    constructor() {
                        mp.events.add('client:login:trylogin', (_0x369815, _0x25541a) => this.tryLogin(_0x369815, _0x25541a));
                        mp.events.add('client:login:tryRegister', (_0x5db2cf, _0x5eb06d, _0x10c9a2) => this.tryRegister(_0x5db2cf, _0x5eb06d, _0x10c9a2));
                        mp.events.add('triggerLoginNotification', (_0x4e4a5f, _0x2d24ce, _0x4cf48e, _0x138f07) => this.triggerLoginNotification(_0x4e4a5f, _0x2d24ce, _0x4cf48e, _0x138f07));
                        mp.events.add('client:login:destroyLogin', () => this.destroyLogin());
                        mp.events.add('Client:Login:CreateBrowser', () => this.showLogin());
                        mp.events.add('client:mainmenu:selectTeam', _0x5b5b9d => this.selectTeam(_0x5b5b9d));
                        mp.events.add('client:mainmenu:selectFFA', _0x2478ce => this.selectFFA(_0x2478ce));
                        mp.events.add('client:mainmenu:destroyMenu', () => this.destroyMenu());
                        mp.events.add('client:mainmenu:saveLogin', (_0x1aced5, _0x34f94b) => this.saveLogin(_0x1aced5, _0x34f94b));
                        mp.events.add('client:mainmenu:letLoginWait', _0xe35cd9 => this.setLoginAwait(_0xe35cd9));
                        mp.events.add('client:mainmenu:changeSettingsGameplay', (_0x12cc05, _0x1bab76) => this.changeSettingsGameplay(_0x12cc05, _0x1bab76));
                        mp.events.add('playerReady', () => this.playerReady());
                        this.browser = null;
                        this.lastInteraction = Date.now();
                        mp.events.add('Client:MainMenu:LoadMainMenu', _0x364f37 => this.loadMainMenu(_0x364f37));
                    }
                    changeSettingsGameplay(_0x1cc7a5, _0x1656db) {
                        if (mp.storage.data.settings != null) {
                            var _0xb3a408 = mp.storage.data.settings.gameplay;
                            if (_0xb3a408 == null)
                                return;
                            var _0x2190fc = _0xb3a408.find(_0xcca01 => _0xcca01.optionName.toLowerCase() == _0x1656db.toLowerCase());
                            if (_0x2190fc == null)
                                return;
                            _0x2190fc.optionState = _0x1cc7a5;
                            mp.storage.flush();
                        }
                    }
                    saveLogin(_0x2b942f, _0x5e4c13) {
                        mp.storage.data.username = _0x2b942f;
                        mp.storage.data.password = _0x5e4c13;
                        mp.storage.flush();
                    }
                    destroyMenu() {
                        if (this.browser) {
                            this.browser.destroy();
                            this.browser = null;
                            mp.gui.cursor.show(false, false);
                            mp.gui.chat.show(true);
                            mp.events.call('client:anticheat:pauseAntiCheat', false);
                        }
                    }
                    selectFFA(_0x3bd624) {
                        if (this.canInteract()) {
                            this.lastInteraction = Date.now();
                            mp.events.callRemote('Server:FFA:JoinFFAArena', _0x3bd624);
                        }
                    }
                    selectTeam(_0x2e79b3) {
                        if (this.canInteract()) {
                            this.lastInteraction = Date.now();
                            mp.events.callRemote('Server:MainMenu:SelectTeam', _0x2e79b3);
                        }
                    }
                    loadMainMenu(_0x528f9c) {
                        mp.events.call('Client:ClothingSelect:destroyBrowser');
                        if (this.browser) {
                            this.browser = mp.browsers.new('package://cef/mainmenu/index.html');
                        }
                        this.browser.execute('loadMainMenu(\'' + _0x528f9c + '\')');
                        mp.gui.chat.show(false);
                        setTimeout(() => {
                            mp.gui.cursor.show(true, true);
                        }, 50);
                        if (mp.storage.data.keys != null) {
                            this.browser.execute('loadBoundedKeys(\'' + JSON.stringify(mp.storage.data.keys) + '\')');
                        }
                        if (mp.storage.data.settings.gameplay != null) {
                            this.browser.execute('loadSettings(\'' + JSON.stringify(mp.storage.data.settings.gameplay) + '\')');
                        }
                    }
                    showLogin() {
                        if (this.browser == null) {
                            this.browser = mp.browsers.new('package://cef/mainmenu/index.html');
                            this.browser.execute('showLoginForm()');
                            if (mp.storage.data.username != null && mp.storage.data.password != null) {
                                this.browser.execute('setLoginInformation(\'' + mp.storage.data.username + '\', \'' + mp.storage.data.password + '\')');
                            }
                            mp.gui.chat.show(false);
                            setTimeout(() => {
                                mp.gui.cursor.show(true, true);
                            }, 50);
                        }
                    }
                    tryRegister(_0x8c3aa9, _0x238b24, _0x7ceb0c) {
                        if (_0x238b24 != _0x7ceb0c) {
                            this.triggerLoginNotification('REGISTER', 'Die eingegeben Passw\uFFFDrter stimmen nicht \uFFFDberein', 5000, 'error');
                            return;
                        }
                        if (this.canInteract()) {
                            mp.events.callRemote('Server:Login:TryRegister', _0x8c3aa9, _0x238b24, _0x7ceb0c);
                            this.lastInteraction = Date.now();
                        }
                    }
                    tryLogin(_0x5b25dc, _0x196543) {
                        if (this.canInteract()) {
                            mp.events.callRemote('Server:Login:TryLogin', _0x5b25dc, _0x196543);
                        }
                    }
                    destroyLogin() {
                        var _0x47de6a;
                        if ((_0x47de6a = this.browser) === null || _0x47de6a === void 0) {
                            _0x47de6a.execute('destroyLogin();');
                        }
                    }
                    playerReady() {
                        if (mp.storage.data.settings == null) {
                            mp.storage.data.settings = new _0x55808f(new _0x1a8a85('crosshair', true), new _0x1a8a85('hitmarker', true), new _0x1a8a85('hitsound', false));
                            mp.storage.flush();
                        }
                    }
                    triggerLoginNotification(_0x4af057, _0x34481d, _0x55859f, _0x5f1430) {
                        var _0x3935a0;
                        if ((_0x3935a0 = this.browser) === null || _0x3935a0 === void 0) {
                            _0x3935a0.execute('mainmenuNotify(\'' + _0x4af057 + '\', \'' + _0x34481d + '\', ' + _0x55859f + ', \'' + _0x5f1430 + '\');');
                        }
                    }
                    setLoginAwait(_0xaa9fec) {
                        var _0x3362e5;
                        if ((_0x3362e5 = this.browser) === null || _0x3362e5 === void 0) {
                            _0x3362e5.execute('setLoginAwait(' + _0xaa9fec + ')');
                        }
                    }
                    canInteract() {
                        return this.lastInteraction + 250 < Date.now();
                    }
                }, _0xe514de = new _0x344b29();
        }), _0x4f56f1 = _0x5bdc4c(_0x16bb1e => {
            'use strict';
            var _0x3b19fe = _0x16bb1e && _0x16bb1e.__awaiter || function (_0x560cc1, _0x5c03ca, _0x369ef7, _0x47011e) {
                    function _0x208130(_0x4938d8) {
                        return _0x4938d8 instanceof _0x369ef7 ? _0x4938d8 : new _0x369ef7(function (_0x46d412) {
                            _0x46d412(_0x4938d8);
                        });
                    }
                    return new (_0x369ef7 || (_0x369ef7 = Promise))(function (_0x165ad6, _0x4041ce) {
                        function _0x5d3358(_0x2d25ea) {
                            try {
                                _0x606d20(_0x47011e.next(_0x2d25ea));
                            } catch (_0x4c6e45) {
                                _0x4041ce(_0x4c6e45);
                            }
                        }
                        function _0x21f4b0(_0x3cacad) {
                            try {
                                _0x606d20(_0x47011e.throw(_0x3cacad));
                            } catch (_0x2a9a16) {
                                _0x4041ce(_0x2a9a16);
                            }
                        }
                        function _0x606d20(_0x25f5ff) {
                            _0x25f5ff.done ? _0x165ad6(_0x25f5ff.value) : _0x208130(_0x25f5ff.value).then(_0x5d3358, _0x21f4b0);
                        }
                        _0x606d20((_0x47011e = _0x47011e.apply(_0x560cc1, _0x5c03ca || [])).next());
                    });
                }, _0x3fcc0b = _0x16bb1e && _0x16bb1e.__asyncValues || function (_0x28499f) {
                    if (!Symbol.asyncIterator)
                        throw new TypeError('Symbol.asyncIterator is not defined.');
                    var _0x202859 = _0x28499f[Symbol.asyncIterator], _0x5233c2;
                    return _0x202859 ? _0x202859.call(_0x28499f) : (_0x28499f = typeof __values == 'function' ? __values(_0x28499f) : _0x28499f[Symbol.iterator](), _0x5233c2 = {}, _0x36a229('next'), _0x36a229('throw'), _0x36a229('return'), _0x5233c2[Symbol.asyncIterator] = function () {
                        return this;
                    }, _0x5233c2);
                    function _0x36a229(_0x2c9eae) {
                        _0x5233c2[_0x2c9eae] = _0x28499f[_0x2c9eae] && function (_0x23f72e) {
                            return new Promise(function (_0xb3f9d9, _0x1e36ce) {
                                _0x23f72e = _0x28499f[_0x2c9eae](_0x23f72e);
                                _0x33227c(_0xb3f9d9, _0x1e36ce, _0x23f72e.done, _0x23f72e.value);
                            });
                        };
                    }
                    function _0x33227c(_0x4c6010, _0x3c431c, _0x3d0d09, _0x3c5b51) {
                        Promise.resolve(_0x3c5b51).then(function (_0x12781f) {
                            _0x4c6010({
                                'value': _0x12781f,
                                'done': _0x3d0d09
                            });
                        }, _0x3c431c);
                    }
                }, _0x199343 = class {
                    constructor() {
                        mp.events.addDataHandler('PLAYER_WEAPON_COMPONENTS', (_0x500282, _0x1aeb7e, _0x2816cf) => this.playerWeaponComponents(_0x500282, _0x1aeb7e, _0x2816cf));
                    }
                    playerWeaponComponents(_0x1b2fbc, _0x2adea1, _0x4bad98) {
                        var _0x5cd6d1, _0x4da814;
                        return _0x3b19fe(this, void 0, void 0, function* () {
                            if (_0x1b2fbc.type == 'player') {
                                var _0x3df619 = _0x1b2fbc;
                                if (mp.players.exists(_0x3df619) && _0x2adea1 != null && _0x2adea1 != null && _0x2adea1 != '') {
                                    if (_0x2adea1 = JSON.parse(_0x2adea1), _0x3df619.weapon != _0x2adea1.weaponHash && _0x3df619 != mp.players.local) {
                                        if (!mp.players.exists(_0x3df619))
                                            return;
                                        mp.game1.invoke('0xADF692B254977C0C', _0x3df619.handle, _0x2adea1.weaponHash >> 0, true);
                                    }
                                    var _0x4fba3e = 0;
                                    for (; _0x3df619.weapon != _0x2adea1.weaponHash && !(!mp.system.isFocused || !mp.players.exists(_0x3df619) || (yield mp.game.waitAsync(1), _0x4fba3e++, _0x4fba3e >= 100)););
                                    try {
                                        for (var _0x1dc882 = _0x3fcc0b(_0x2adea1.components), _0x445956; _0x445956 = yield _0x1dc882.next(), !_0x445956.done;) {
                                            var _0x30e1b4 = _0x445956.value;
                                            if (_0x30e1b4 == null || _0x30e1b4 == null || !mp.players.exists(_0x3df619))
                                                return;
                                            if (mp.system.isFocused) {
                                                mp.game1.invoke('0xD966D51AA5B28BB9', _0x3df619.handle, _0x2adea1.weaponHash >> 0, _0x30e1b4.componentHash >> 0);
                                            }
                                        }
                                    } catch (_0x3e2904) {
                                        _0x5cd6d1 = { 'error': _0x3e2904 };
                                    } finally {
                                        try {
                                            if (_0x445956 && !_0x445956.done && (_0x4da814 = _0x1dc882.return)) {
                                                yield _0x4da814.call(_0x1dc882);
                                            }
                                        } finally {
                                            if (_0x5cd6d1)
                                                throw _0x5cd6d1.error;
                                        }
                                    }
                                    if (_0x2adea1.tintIndex != null && _0x2adea1.tintIndex != null) {
                                        if (!mp.players.exists(_0x3df619) || !mp.system.isFocused)
                                            return;
                                        mp.game1.invoke('0x50969B9B89ED5738', _0x3df619.handle, _0x2adea1.weaponHash >> 0, _0x2adea1.tintIndex >> 0);
                                    }
                                }
                            }
                        });
                    }
                }, _0x3d69ad = new _0x199343();
        }), _0x274e09 = _0x5bdc4c(_0x218bad => {
            'use strict';
            Object.defineProperty(_0x218bad, '__esModule', { 'value': true });
            var _0x2f06a8 = class {
                    constructor() {
                        this.allowedHealth = null;
                        mp.events.add('playerWeaponShot', (_0x4be614, _0x353008) => this.playerWeaponShot(_0x4be614, _0x353008));
                        mp.events.add('incomingDamage', (_0x60629b, _0x4e4f8b, _0x24dd15, _0x56f4a3, _0x13445a, _0x37c1b1) => this.incomingDamage(_0x60629b, _0x4e4f8b, _0x24dd15, _0x56f4a3, _0x13445a, _0x37c1b1));
                        mp.events.add('outgoingDamage', (_0x50518b, _0x10e745, _0x528c92, _0x449330, _0xd4a574, _0x56be75) => this.outgoingDamage(_0x50518b, _0x10e745, _0x528c92, _0x449330, _0xd4a574, _0x56be75));
                        mp.events.add('Client:HitSync:ApplyDamageToPlayer', (_0x356aaf, _0x31a733) => this.applyDamageToPlayer(_0x356aaf, _0x31a733));
                        mp.events.add('playerReady', () => this.playerReady());
                        mp.events.add('playerSpawn', () => this.playerSpawn());
                        mp.events.add('Client:AntiCheat:SetHealth', _0x13c68a => this.setHealth(_0x13c68a));
                        mp.events.add('Client:AntiCheat:SetArmour', _0x1389ec => this.setArmour(_0x1389ec));
                    }
                    checkCanHitOnShot(_0x592e77) {
                        return !(_0x592e77.getVariable('IS_IN_ANIMATION') || _0x592e77.vehicle);
                    }
                    isAllowedToHit(_0x24bdf8) {
                        return !(mp.players.local.vehicle && !_0x24bdf8.vehicle || _0x24bdf8.getVariable('IS_ADUTY') || _0x24bdf8.getVariable('DEAD') || mp.players.local.getVariable('PLAYER_CURRENT_TEAM') == _0x24bdf8.getVariable('PLAYER_CURRENT_TEAM') && mp.players.local.getVariable('PLAYER_CURRENT_TEAM') != '' && _0x24bdf8.getVariable('PLAYER_CURRENT_TEAM') != '' && _0x24bdf8.dimension == 0 && mp.players.local.dimension == 0);
                    }
                    playerWeaponShot(_0x5e69bc, _0x1e0e2e) {
                        if (_0x1e0e2e && _0x1e0e2e.type == 'player') {
                            var _0x22569f = _0x1e0e2e;
                            if (!this.checkCanHitOnShot(_0x22569f) || !this.isAllowedToHit(_0x22569f)) {
                                _0x22569f.setCanRagdoll(true);
                                return;
                            }
                            if (mp.players.exists(_0x22569f) && _0x22569f.getHealth() > 0) {
                                _0x22569f.setCanRagdoll(false);
                                mp.events.callRemote('Server:HitSync:ApplyHitTo', _0x22569f);
                                if (mp.storage.data.settings.gameplay[1].optionState != null && mp.storage.data.settings.gameplay[1].optionState == true) {
                                    mp.events.call('Client:Hud:PlayHitMarker');
                                }
                                if (mp.storage.data.settings.gameplay[2].optionState != null && mp.storage.data.settings.gameplay[2].optionState == true) {
                                    mp.events.call('Client:Hud:PlayerHitSound');
                                }
                            }
                        }
                    }
                    incomingDamage(_0x2512f6, _0x57ff81, _0xc0fd8b, _0x3677d8, _0x244def, _0x2d880b) {
                        if (_0xc0fd8b.type === 'player') {
                            mp.game.weapon.setCurrentDamageEventAmount(0);
                        }
                    }
                    outgoingDamage(_0x696295, _0x4bc100, _0x3752b7, _0x1aba23, _0x22692d, _0x28d278) {
                        if (_0x4bc100 && _0x4bc100.type == 'player') {
                            var _0x5cdb8e = _0x4bc100;
                            if (this.checkCanHitOnShot(_0x5cdb8e) || !this.isAllowedToHit(_0x5cdb8e)) {
                                _0x5cdb8e.setCanRagdoll(true);
                                return;
                            }
                            return mp.players.exists(_0x5cdb8e) && _0x5cdb8e.getHealth() > 0 && (_0x5cdb8e.setCanRagdoll(false), mp.events.callRemote('Server:HitSync:ApplyHitTo', _0x5cdb8e), mp.storage.data.settings.gameplay[1].optionState != null && mp.storage.data.settings.gameplay[1].optionState == true && mp.events.call('Client:Hud:PlayHitMarker'), mp.storage.data.settings.gameplay[2].optionState != null && mp.storage.data.settings.gameplay[2].optionState == true && mp.events.call('Client:Hud:PlayerHitSound')), true;
                        }
                    }
                    applyDamageToPlayer(_0x17bd61, _0x56cbf9) {
                        if (_0x17bd61 <= 0 || !mp.players.exists(_0x56cbf9))
                            return;
                        var _0x22f0ad = mp.game1.gameplay.getDistanceBetweenCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, _0x56cbf9.position.x, _0x56cbf9.position.y, _0x56cbf9.position.z, true);
                        if (_0x17bd61 = _0x17bd61 - _0x22f0ad / 25, _0x17bd61 <= 1)
                            return;
                        var _0x5001a4 = mp.players.local.getArmour();
                        mp.players.local.applyDamageTo(parseInt(_0x17bd61.toString()), true);
                        if (mp.players.local.getHealth() <= 0) {
                            mp.players.local.applyDamageTo(parseInt(_0x17bd61.toString()), true);
                        }
                        var _0x18b093 = mp.players.local.getArmour();
                        if (_0x5001a4 > 0 && _0x18b093 <= 0) {
                            mp.events.callRemote('Server:HitSync:RemoveOpticalVest');
                        }
                        if (this.allowedHealth != null && mp.players.local.getHealth() + mp.players.local.getArmour() >= this.allowedHealth) {
                            this.triggerHealKeyDetection();
                        }
                        this.allowedHealth = mp.players.local.getHealth() + mp.players.local.getArmour();
                        mp.events.call('Client:Keys:SetLastHit');
                    }
                    sanitize(_0x34323b) {
                        return _0x34323b < -90 ? _0x34323b + 450 : _0x34323b + 90;
                    }
                    playerReady() {
                        this.allowedHealth = mp.players.local.getHealth() + mp.players.local.getArmour();
                    }
                    playerSpawn() {
                        this.allowedHealth = mp.players.local.getHealth() + mp.players.local.getArmour();
                    }
                    setHealth(_0x2ea4a2) {
                        mp.players.local.setHealth(100 + _0x2ea4a2);
                        this.allowedHealth = mp.players.local.getHealth() + mp.players.local.getArmour();
                    }
                    setArmour(_0x373231) {
                        mp.players.local.setArmour(_0x373231);
                        this.allowedHealth = mp.players.local.getHealth() + mp.players.local.getArmour();
                    }
                    triggerHealKeyDetection() {
                        if (this.allowedHealth == null || mp.players.local.getHealth() + mp.players.local.getArmour() == 0)
                            return;
                        var _0x150afa = mp.players.local.getHealth() + mp.players.local.getArmour();
                        _0x150afa - this.allowedHealth == 0 ? mp.events.callRemote('Server:AntiCheat:triggerACGodmode') : mp.events.callRemote('Server:AntiCheat:triggerACHealKey', this.allowedHealth, _0x150afa);
                    }
                }, _0x438863 = new _0x2f06a8();
        });
    mp.gui.execute('window.location = \'package://cef/chat/index.html\'');
    var _0x5c3238 = class {
            constructor() {
                this.browser = null;
                this.clothinJson = null;
                this.camera = null;
                this.vestDrawable = 12;
                this.vestTexture = 1;
                mp.events.add('Client:ClothesSelect:loadClothingSelection', _0x43c2a7 => this.loadClothingSelection(_0x43c2a7));
                mp.events.add('Client:ClothesSelect:previewClothing', _0x5bfeb7 => this.previewClothing(_0x5bfeb7));
                mp.events.add('Client:ClothingSelect:selectOutfit', _0x24725d => this.selectOutfit(_0x24725d));
                mp.events.add('Client:ClothingSelect:destroyBrowser', () => this.destroyBrowser());
                mp.events.add('Client:ClothingSelect:PreviewVest', _0x457176 => this.previewVest(_0x457176));
            }
            previewVest(_0x260060) {
                switch (_0x260060) {
                case 0:
                    mp.players.local.setComponentVariation(9, 12, 1, 0);
                    this.vestDrawable = 12;
                    this.vestTexture = 1;
                    break;
                case 1:
                    mp.players.local.setComponentVariation(9, 15, 2, 0);
                    this.vestDrawable = 15;
                    this.vestTexture = 2;
                    break;
                case 2:
                    mp.players.local.setComponentVariation(9, 16, 2, 0);
                    this.vestDrawable = 16;
                    this.vestTexture = 2;
                    break;
                }
            }
            loadClothingSelection(_0x2b347a) {
                if (this.browser == null) {
                    this.clothinJson = JSON.parse(_0x2b347a);
                    if (this.clothinJson != null) {
                        this.browser = mp.browsers.new('package://cef/clothingselect/index.html');
                        this.browser.execute('loadOutfits(\'' + JSON.stringify(this.clothinJson) + '\')');
                        this.camera = mp.cameras.new('clothing', new mp.Vector3(-792.8255004882812, 331.82183837890625, 202.31378784179688), new mp.Vector3(0, 0, -87.35272216796875), 40);
                        this.camera.pointAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z);
                        this.camera.setActive(true);
                        mp.game.cam.renderScriptCams(true, false, 0, true, false);
                        mp.game.ui.displayRadar(false);
                        mp.gui.chat.show(false);
                        setTimeout(() => {
                            mp.gui.cursor.show(true, true);
                        }, 50);
                        this.previewClothing(JSON.parse(_0x2b347a)[0]._id);
                    }
                }
            }
            previewClothing(_0x4a932b) {
                var _0x3c2ce8;
                if (this.browser == null || _0x4a932b == '')
                    return;
                let _0x3a5704 = (_0x3c2ce8 = this.clothinJson) === null || _0x3c2ce8 === void 0 ? void 0 : _0x3c2ce8.find(_0x1fdcb1 => _0x1fdcb1._id == _0x4a932b);
                if (_0x3a5704 != null) {
                    mp.players.local.setComponentVariation(1, _0x3a5704.maskDrawable, _0x3a5704.maskTexture, 0);
                    mp.players.local.setComponentVariation(3, _0x3a5704.torsoDrawable, _0x3a5704.torsoTexture, 0);
                    mp.players.local.setComponentVariation(4, _0x3a5704.legsDrawable, _0x3a5704.legsTexture, 0);
                    mp.players.local.setComponentVariation(6, _0x3a5704.shoeDrawable, _0x3a5704.shoeTexture, 0);
                    mp.players.local.setComponentVariation(8, _0x3a5704.undershirtDrawable, _0x3a5704.undershirtTexture, 0);
                    mp.players.local.setComponentVariation(11, _0x3a5704.topDrawable, _0x3a5704.topTexture, 0);
                    mp.players.local.setPropIndex(0, _0x3a5704.hatDrawable, _0x3a5704.hatTexture, true);
                }
            }
            selectOutfit(_0x47f73c) {
                if (this.browser == null || _0x47f73c == '') {
                    mp.events.callRemote('server:clothing:saveClothing', _0x47f73c, this.vestDrawable, this.vestTexture);
                }
            }
            destroyBrowser() {
                if (this.camera != null) {
                    this.camera.setActive(false);
                    mp.game.cam.renderScriptCams(false, false, 0, false, false);
                    this.camera.destroy();
                    this.camera = null;
                }
                if (this.browser != null) {
                    this.browser.destroy();
                    this.browser = null;
                }
                mp.game.ui.displayRadar(true);
                mp.gui.chat.show(true);
                mp.gui.cursor.show(false, false);
            }
        }, _0x331da7 = new _0x5c3238(), _0x3b86c9 = class {
            constructor() {
                this.browser = null;
                mp.events.add('Client:ComponentShop:OpenComponentShop', _0x3be456 => this.createBrowser(_0x3be456));
                mp.events.add('Client:ComponentShop:DestroyComponentShop', () => this.destroyBrowser());
                mp.events.add('Client:ComponentShop:TryBuyComponent', (_0x37c599, _0x206bf7) => this.tryBuyComponent(_0x37c599, _0x206bf7));
                mp.keys.bind(27, false, () => this.destroyBrowser());
            }
            createBrowser(_0x5302d1) {
                if (this.browser == null) {
                    this.browser = mp.browsers.new('package://cef/componentshop/index.html');
                    if (this.browser != null) {
                        this.browser.execute('loadComponentShop(\'' + _0x5302d1 + '\')');
                        mp.gui.chat.show(false);
                        setTimeout(() => {
                            mp.gui.cursor.show(true, true);
                        }, 100);
                    }
                }
            }
            destroyBrowser() {
                if (this.browser != null) {
                    mp.gui.chat.show(true);
                    mp.gui.cursor.show(false, false);
                    this.browser.execute('destroyBrowser()');
                    setTimeout(() => {
                        var _0x1c55cf;
                        if ((_0x1c55cf = this.browser) === null || _0x1c55cf === void 0) {
                            _0x1c55cf.destroy();
                        }
                        this.browser = null;
                    }, 500);
                }
            }
            tryBuyComponent(_0x382543, _0x1dc052) {
                if (this.browser != null) {
                    mp.events.callRemote('Server:ComponentShop:BuyComponent', _0x382543, _0x1dc052);
                }
            }
        }, _0x3df833 = new _0x3b86c9(), _0x2cf9cc = class {
            constructor() {
                this.browser = null;
                mp.events.add('Client:Garage:OpenGarage', _0x141b2a => this.createBrowser(_0x141b2a));
                mp.events.add('Client:Garage:DestroyGarage', () => this.destroyBrowser());
                mp.events.add('Client:Garage:ParkOutVehicle', _0xd94958 => this.parkOutVehicle(_0xd94958));
                mp.keys.bind(27, false, () => this.destroyBrowser());
            }
            createBrowser(_0x3052da) {
                if (this.browser == null) {
                    this.browser = mp.browsers.new('package://cef/garage/index.html');
                    if (this.browser != null) {
                        this.browser.execute('loadVehicles(\'' + _0x3052da + '\')');
                        mp.gui.chat.show(false);
                        setTimeout(() => {
                            mp.gui.cursor.show(true, true);
                        }, 100);
                    }
                }
            }
            destroyBrowser() {
                if (this.browser != null) {
                    mp.gui.chat.show(true);
                    mp.gui.cursor.show(false, false);
                    this.browser.execute('destroyBrowser()');
                    setTimeout(() => {
                        var _0x3660c4;
                        if ((_0x3660c4 = this.browser) === null || _0x3660c4 === void 0) {
                            _0x3660c4.destroy();
                        }
                        this.browser = null;
                    }, 500);
                }
            }
            parkOutVehicle(_0x55bed8) {
                if (_0x55bed8 != '') {
                    mp.events.callRemote('Server:Garage:ParkOutVehicle', _0x55bed8);
                }
            }
        }, _0x2b8d55 = new _0x2cf9cc(), _0x2957b6 = class {
            constructor() {
                this.browser = null;
                mp.events.add('Client:Hud:CreateBrowser', (_0x2ce27b, _0x2d4d75, _0xdee061, _0x1f2935, _0x56f856, _0x42bf8e) => this.createBrowser(_0x2ce27b, _0x2d4d75, _0xdee061, _0x1f2935, _0x56f856, _0x42bf8e));
                mp.events.add('Client:Hud:DestroyBrowser', () => this.destroyBrowser());
                mp.events.add('Client:Hud:UpdateHud', (_0x4f0251, _0x304e6d, _0x1f5f9f, _0x57b70b, _0x156bbb, _0x163017) => this.updateHud(_0x4f0251, _0x304e6d, _0x1f5f9f, _0x57b70b, _0x156bbb, _0x163017));
                mp.events.add('Client:Hud:PlayHitMarker', () => this.playHitMarker());
                mp.events.add('Client:Hud:AddKillInfo', (_0x22f3cf, _0x13dc2b) => this.addKillInfo(_0x22f3cf, _0x13dc2b));
                mp.events.add('Client:Hud:ShowNotification', (_0x3f8461, _0x327b78, _0x46b521, _0x149d64, _0x2b5132) => this.showNotification(_0x3f8461, _0x327b78, _0x46b521, _0x149d64, _0x2b5132));
                mp.events.add('Client:Hud:ToggleProgressbar', (_0x143a67, _0x306a68, _0x3a3f99) => this.toggleProgressbar(_0x143a67, _0x306a68, _0x3a3f99));
                mp.events.add('Client:Hud:ShowLevelUpBadge', _0x6dae6f => this.showLevelUpBadge(_0x6dae6f));
                mp.events.add('Client:Hud:ShowWeaponLevelUp', (_0x4d3279, _0x363993) => this.showWeaponLvlUp(_0x4d3279, _0x363993));
                mp.events.add('Client:Hud:ShowMedal', (_0xdd5d86, _0x57c44f) => this.showMedal(_0xdd5d86, _0x57c44f));
                mp.events.add('Client:Hud:PlayerHitSound', () => this.playHitSound());
                mp.events.add('Client:Hud:ShowKillstreak', _0x578c21 => this.showKillstreak(_0x578c21));
                mp.events.add('Client:Hud:ShowRedzoneHud', (_0x5d9c0a, _0x4bb891) => this.showRedzoneHud(_0x5d9c0a, _0x4bb891));
                mp.events.add('Client:Hud:UpdateRedzoneHud', _0x5dac0f => this.updateRedzoneHud(_0x5dac0f));
                mp.events.add('Client:Hud:ShowDiscordSyncKey', _0x122cff => this.showDiscordSyncKey(_0x122cff));
                mp.keys.bind(27, false, () => this.hideDiscordSyncKey());
            }
            hideDiscordSyncKey() {
                if (this.browser != null) {
                    this.browser.execute('hideDiscordSyncInput()');
                    mp.gui.cursor.show(false, false);
                }
            }
            showDiscordSyncKey(_0xe11abf) {
                if (this.browser != null) {
                    this.browser.execute('loadDiscordSyncKey(\'' + _0xe11abf + '\')');
                    mp.gui.cursor.show(true, true);
                }
            }
            showRedzoneHud(_0x45919c, _0x1a133e) {
                var _0x110c07;
                if (this.browser == null || this.browser == null || !mp.browsers.exists(this.browser) || (_0x110c07 = this.browser) === null || _0x110c07 === void 0) {
                    _0x110c07.execute('showRedzoneHud(' + _0x45919c + ', \'' + _0x1a133e + '\')');
                }
            }
            updateRedzoneHud(_0x44ae28) {
                if (this.browser != null) {
                    this.browser.execute('updateRedzoneHud(\'' + _0x44ae28 + '\')');
                }
            }
            showMedal(_0x2befbc, _0x5e46e0) {
                if (this.browser != null) {
                    this.browser.execute('showRewardMedal(\'' + _0x2befbc + '\', \'' + _0x5e46e0 + '\')');
                }
            }
            showKillstreak(_0x36403c) {
                _0x36403c < 5 || _0x36403c % 5 || this.browser != null && this.browser.execute('showKillstreak(' + _0x36403c + ')');
            }
            showRewardMedal(_0x474194, _0x191474) {
                if (this.browser != null) {
                    this.browser.execute('showRewardMedal(' + _0x474194 + ', ' + _0x191474 + ')');
                }
            }
            playHitSound() {
                if (this.browser != null) {
                    this.browser.execute('playHitSound()');
                }
            }
            showLevelUpBadge(_0x2dae5b) {
                if (this.browser != null) {
                    this.browser.execute('showLevelUp(\'' + _0x2dae5b + '\')');
                }
            }
            showWeaponLvlUp(_0x315323, _0x5276d3) {
                if (this.browser != null) {
                    this.browser.execute('showWeaponToken(\'' + _0x315323 + '\', ' + _0x5276d3 + ')');
                }
            }
            createBrowser(_0x392c53, _0xecb12e, _0x321607, _0x3e5143, _0x5362ad, _0x38bd35) {
                if (this.browser == null) {
                    this.browser = mp.browsers.new('package://cef/hud/index.html');
                    setTimeout(() => {
                        var _0x374160;
                        if ((_0x374160 = this.browser) === null || _0x374160 === void 0) {
                            _0x374160.execute('updateHud(' + _0x392c53 + ', ' + _0xecb12e + ', ' + _0x321607 + ', ' + _0x3e5143 + ', ' + _0x5362ad + ', ' + _0x38bd35 + ')');
                        }
                    }, 1000);
                }
            }
            destroyBrowser() {
                if (this.browser != null) {
                    this.browser.destroy();
                }
            }
            toggleProgressbar(_0x424b3c, _0x4ea7f0, _0x277001) {
                if (!this.browser) {
                    this.browser.execute('toggleProgressBar(' + _0x424b3c + ', "' + _0x4ea7f0 + '", ' + _0x277001 + ')');
                }
            }
            updateHud(_0x43f131, _0x2be563, _0x4d3e05, _0x4eb844, _0x2fece1, _0x3d5d17) {
                if (this.browser != null) {
                    this.browser.execute('updateHud(' + _0x43f131 + ', ' + _0x2be563 + ', ' + _0x4d3e05 + ', ' + _0x4eb844 + ', ' + _0x2fece1 + ', ' + _0x3d5d17 + ')');
                }
            }
            playHitMarker() {
                if (this.browser != null) {
                    this.browser.execute('showHitMarker()');
                }
            }
            addKillInfo(_0x5764d8, _0x39523e) {
                if (this.browser != null) {
                    this.browser.execute('addKillToHud(' + _0x5764d8 + ', \'' + _0x39523e + '\')');
                }
            }
            showNotification(_0x48b051, _0x385a2a, _0x261c31, _0x3941a3, _0x545110) {
                if (this.browser != null) {
                    this.browser.execute('showNotification(\'' + _0x48b051 + '\', \'' + _0x385a2a + '\', \'' + _0x261c31 + '\', \'' + _0x3941a3 + '\', ' + _0x545110 + ')');
                    if (mp.system.isFocused) {
                        mp.system.notify({
                            'title': '' + _0x48b051,
                            'text': '' + _0x261c31,
                            'attribute': 'Index Gangwar',
                            'duration': 7500,
                            'silent': false
                        });
                    }
                }
            }
        }, _0x1d5cea = new _0x2957b6(), _0x50b49e = class {
            constructor() {
                this.browser = null;
                mp.events.add('Client:Inventory:OpenInventory', (_0x494149, _0x5b51af) => this.createBrowser(_0x494149, _0x5b51af));
                mp.events.add('Client:Inventory:DestroyInventory', () => this.destroyBrowser());
                mp.events.add('Client:Inventory:UseItem', _0x5c3197 => this.useItem(_0x5c3197));
                mp.events.add('Client:Inventory:DropItem', (_0x1f570b, _0x5c0887) => this.dropItem(_0x1f570b, _0x5c0887));
                mp.events.add('Client:Inventory:ChangeWeaponState', _0x13c911 => this.changeWeaponState(_0x13c911));
                mp.keys.bind(27, false, () => this.destroyBrowser());
            }
            createBrowser(_0x2d5f12, _0x161345) {
                if (this.browser == null) {
                    this.browser = mp.browsers.new('package://cef/inventory/index.html');
                    if (this.browser != null) {
                        this.browser.execute('loadInventory(\'' + _0x2d5f12 + '\', \'' + _0x161345 + '\')');
                        mp.gui.chat.show(false);
                        setTimeout(() => {
                            mp.gui.cursor.show(true, true);
                        }, 100);
                    }
                }
            }
            destroyBrowser() {
                if (this.browser != null) {
                    mp.gui.chat.show(true);
                    mp.gui.cursor.show(false, false);
                    this.browser.destroy();
                    this.browser = null;
                }
            }
            useItem(_0x12925b) {
                if (this.browser != null) {
                    mp.events.callRemote('Server:Inventory:UseItem', _0x12925b);
                    this.destroyBrowser();
                }
            }
            dropItem(_0x192cf0, _0x5760a0) {
                if (this.browser != null) {
                    mp.events.callRemote('Server:Inventory:RemoveItem', _0x192cf0, _0x5760a0);
                    this.destroyBrowser();
                }
            }
            changeWeaponState(_0x3b12d4) {
                if (this.browser != null) {
                    mp.events.callRemote('Server:Inventory:ChangeWeaponState', _0x3b12d4);
                }
            }
        }, _0x71bce5 = new _0x50b49e(), _0x5641c7 = class {
            constructor() {
                this.browser = mp.browsers.new('package://cef/killcam/index.html');
                mp.events.add('Client:KillCam:ShowKillCam', (_0x2895d4, _0x1ff6f2, _0x1a4b23, _0x4fb760) => this.showDeathCam(_0x2895d4, _0x1ff6f2, _0x1a4b23, _0x4fb760));
            }
            showDeathCam(_0x147074, _0x52f2ae, _0x53eda6, _0x523d8a) {
                if (this.browser != null) {
                    this.browser.execute('respawnTimer(\'' + _0x147074 + '\', \'' + _0x52f2ae + '\', \'' + _0x53eda6 + '\', \'' + _0x523d8a + '\')');
                }
            }
        }, _0x487007 = new _0x5641c7(), _0x4a08e8 = _0x2f7a3e(_0x2686b7()), _0xbcb9f3 = class {
            constructor() {
                mp.events.add('client:takeScreenshot', () => this.takeScreenshot());
                mp.keys.bind(46, false, () => this.keyCountOneUp());
                mp.events.add('Client:ScreenshotResponse', () => this.screenshotResponse());
                this.browser = null;
                this.keycount = 0;
                this.possibleInMenu = false;
                this.clickcount = 0;
                this.isInScreenshot = false;
            }
            takeScreenshot() {
                if (this.browser != null || this.isInScreenshot == true)
                    return;
                this.isInScreenshot = true;
                this.browser = mp.browsers.new('package://cef/screenshot/index.html');
                let _0x44bbf8 = mp.players.local.name;
                mp.gui.takeScreenshot(_0x44bbf8 + '.jpg', 0, 60, 0);
                let _0x568ba5 = 'http://screenshots/' + _0x44bbf8 + '.jpg';
                setTimeout(() => {
                    var _0x4a551e;
                    if ((_0x4a551e = this.browser) === null || _0x4a551e === void 0) {
                        _0x4a551e.execute('screenToBase64(\'' + _0x568ba5 + '\', \'' + _0x44bbf8 + '\');');
                    }
                }, 5000);
            }
            keyCountOneUp() {
                if (this.keycount !== 3) {
                    this.keycount++;
                    return;
                }
                this.possibleInMenu = true;
            }
            onClick(_0x592921, _0x3e970b, _0x214549, _0x2ea7f2, _0x318f08, _0x42fc58, _0x24cbe3, _0x8735c5) {
                if (!!this.possibleInMenu && _0x214549 === 'up') {
                    if (_0x103f6f.clickcount !== 1) {
                        _0x103f6f.clickcount++;
                        return;
                    }
                    mp.events.call('client:takeScreenshot');
                    _0x103f6f.clickcount = 0;
                    _0x103f6f.possibleInMenu = false;
                }
            }
            screenshotResponse() {
                var _0x1ce15b;
                if ((_0x1ce15b = this.browser) === null || _0x1ce15b === void 0) {
                    _0x1ce15b.destroy();
                }
                this.browser = null;
                this.isInScreenshot = false;
                setTimeout(() => {
                    this.takeScreenshot();
                }, (Math.floor(Math.random() * 20) + 10) * 60000);
            }
        }, _0x103f6f = new _0xbcb9f3(), _0x570993 = class {
            constructor() {
                this.browser = null;
                mp.events.add('Client:TintShop:OpenTintShop', _0x5f1982 => this.createBrowser(_0x5f1982));
                mp.events.add('Client:TintShop:DestroyTintShop', () => this.destroyBrowser());
                mp.events.add('Client:TintShop:TryBuyTint', (_0x5497ac, _0xc2f4f3) => this.tryBuyTint(_0x5497ac, _0xc2f4f3));
                mp.keys.bind(27, false, () => this.destroyBrowser());
            }
            createBrowser(_0x461884) {
                if (this.browser == null) {
                    this.browser = mp.browsers.new('package://cef/tintshop/index.html');
                    if (this.browser != null) {
                        this.browser.execute('loadTintShop(\'' + _0x461884 + '\')');
                        mp.gui.chat.show(false);
                        setTimeout(() => {
                            mp.gui.cursor.show(true, true);
                        }, 100);
                    }
                }
            }
            destroyBrowser() {
                if (this.browser != null) {
                    mp.gui.chat.show(true);
                    mp.gui.cursor.show(false, false);
                    this.browser.execute('destroyBrowser()');
                    setTimeout(() => {
                        var _0x174fcc;
                        if ((_0x174fcc = this.browser) === null || _0x174fcc === void 0) {
                            _0x174fcc.destroy();
                        }
                        this.browser = null;
                    }, 500);
                }
            }
            tryBuyTint(_0x2110d0, _0x3fef89) {
                if (this.browser != null) {
                    mp.events.callRemote('Server:TintShop:BuyTint', _0x2110d0, _0x3fef89);
                }
            }
        }, _0x3e4774 = new _0x570993(), _0x234b4e = class {
            constructor() {
                this.browser = null;
                this.weather = [
                    'EXTRASUNNY',
                    'CLEAR',
                    'CLOUDS',
                    'SMOG',
                    'FOGGY',
                    'OVERCAST',
                    'RAIN',
                    'THUNDER',
                    'CLEARING',
                    'NEUTRAL',
                    'SNOW',
                    'BLIZZARD',
                    'SNOWLIGHT',
                    'XMAS',
                    'HALLOWEEN'
                ];
                this.currentWeather = 'EXTRASUNNY';
                this.currentTime = 18;
                mp.events.add('Client:WeatherMenu:CreateMenu', () => this.createBrowser());
                mp.events.add('Client:WeatherMenu:DestroyMenu', () => this.destroyBrowser());
                mp.events.add('Client:WeatherMenu:SetWeather', _0x15dd51 => this.setWeather(_0x15dd51));
                mp.events.add('Client:WeatherMenu:SetTime', _0x15957c => this.setTime(_0x15957c));
                mp.events.add('render', () => this.render());
                mp.keys.bind(27, false, () => this.destroyBrowser());
            }
            createBrowser() {
                if (this.browser == null) {
                    this.browser = mp.browsers.new('package://cef/weathermenu/index.html');
                    if (this.browser != null) {
                        this.browser.execute('loadWeatherSettings(' + this.weather.indexOf(this.currentWeather) + ', ' + this.currentTime + ')');
                        mp.gui.chat.show(false);
                        setTimeout(() => {
                            mp.gui.cursor.show(true, true);
                        }, 100);
                    }
                }
            }
            destroyBrowser() {
                if (this.browser != null) {
                    mp.gui.chat.show(true);
                    mp.gui.cursor.show(false, false);
                    this.browser.execute('destroyBrowser()');
                    setTimeout(() => {
                        var _0x421e0c;
                        if ((_0x421e0c = this.browser) === null || _0x421e0c === void 0) {
                            _0x421e0c.destroy();
                        }
                        this.browser = null;
                    }, 500);
                }
            }
            setWeather(_0x29e2fc) {
                if (this.browser == null)
                    return;
                let _0x4c4470 = this.weather[_0x29e2fc];
                if (_0x4c4470 != null && _0x4c4470 != null) {
                    this.currentWeather = this.weather[_0x29e2fc];
                }
            }
            setTime(_0x42e425) {
                if (this.browser != null) {
                    this.currentTime = Math.floor(_0x42e425);
                }
            }
            render() {
                if (this.currentTime != null && this.currentWeather != null) {
                    mp.game.time.setClockTime(this.currentTime, 30, 30);
                    mp.game.gameplay.setOverrideWeather(this.currentWeather);
                }
            }
        }, _0x536188 = new _0x234b4e(), _0x4cb099 = class {
            constructor() {
                mp.events.add('render', () => this.render());
            }
            render() {
                if (mp.players.local.getVariable('IS_ADUTY') == true) {
                    mp.players.forEachInRange(mp.players.local.position, 200, _0x4be244 => {
                        this.drawNameTags(_0x4be244);
                    });
                }
            }
            drawNameTags(_0x26b398) {
                if (_0x26b398 != mp.players.local) {
                    let _0x30b940 = mp.game.graphics.world3dToScreen2d(_0x26b398.position);
                    if (_0x30b940 == null || _0x30b940 == null)
                        return;
                    this.drawText(_0x26b398.getVariable('ACCOUNT_NAME') + '\n~g~' + _0x26b398.getHealth() + '~w~ - ~b~' + _0x26b398.getArmour() + '~w~', [
                        _0x30b940.x,
                        _0x30b940.y
                    ], {
                        'align': 1,
                        'font': 4,
                        'scale': 0.3,
                        'outline': true,
                        'shadow': true,
                        'color': [
                            255,
                            255,
                            255,
                            255
                        ]
                    });
                }
            }
            drawText(_0x16a33c, _0xaaf880, _0x29cb6f) {
                _0x29cb6f = Object.assign({
                    'align': 1,
                    'font': 4,
                    'scale': 0.3,
                    'outline': true,
                    'shadow': true,
                    'color': [
                        255,
                        255,
                        255,
                        255
                    ]
                }, _0x29cb6f);
                let _0x5f0066 = mp.game.ui, _0x2664f4 = _0x29cb6f.font, _0x250b26 = _0x29cb6f.scale, _0x2dcfe0 = _0x29cb6f.outline, _0x305aa5 = _0x29cb6f.shadow, _0x1b35ea = _0x29cb6f.color, _0x4da785 = _0x29cb6f.wordWrap, _0x5698ac = _0x29cb6f.align;
                _0x5f0066.setTextEntry('CELL_EMAIL_BCON');
                for (let _0x19f661 = 0; _0x19f661 < _0x16a33c.length; _0x19f661 += 99) {
                    let _0x914119 = _0x16a33c.substr(_0x19f661, Math.min(99, _0x16a33c.length - _0x19f661));
                    mp.game.ui.addTextComponentSubstringPlayerName(_0x914119);
                }
                switch (_0x5f0066.setTextFont(_0x2664f4), _0x5f0066.setTextScale(_0x250b26, _0x250b26), _0x5f0066.setTextColour(_0x1b35ea[0], _0x1b35ea[1], _0x1b35ea[2], _0x1b35ea[3]), _0x305aa5 && (mp.game.invoke('0x1CA3E9EAC9D93E5E'), _0x5f0066.setTextDropshadow(2, 0, 0, 0, 255)), _0x2dcfe0 && mp.game.invoke('0x2513DFB0FB8400FE'), _0x5698ac) {
                case 1: {
                        _0x5f0066.setTextCentre(true);
                        break;
                    }
                case 2: {
                        _0x5f0066.setTextRightJustify(true);
                        _0x5f0066.setTextWrap(0, _0xaaf880[0] || 0);
                        break;
                    }
                }
                if (_0x4da785) {
                    _0x5f0066.setTextWrap(0, (_0xaaf880[0] || 0) + _0x4da785);
                }
                _0x5f0066.drawText(_0xaaf880[0] || 0, _0xaaf880[1] || 0);
            }
        }, _0x8bb825 = new _0x4cb099(), _0x5a9925 = class {
            constructor() {
                mp.events.add('client:death:triggerKillcam', () => this.showKillCam());
            }
            showKillCam() {
                setTimeout(() => {
                    mp.events.callRemote('server:kill:finishKillcam');
                }, 4000);
            }
        }, _0x424523 = new _0x5a9925(), _0x1c1c42 = class {
            constructor() {
                this.isShowingRockstarMessage = false;
                this.rockstarMessageMessage = '';
                mp.events.add('render', () => this.render());
                mp.events.add('playerReady', () => this.playerReady());
                mp.events.add('Client:Player:ShowRockstarMessage', _0x5cbbd6 => this.showRockstarMessage(_0x5cbbd6));
                setInterval(() => this.removeAFKCamera(), 20000);
                mp.events.add('entityStreamIn', _0x573b1e => this.streamIn(_0x573b1e));
            }
            streamIn(_0x9ab3c3) {
                if (_0x9ab3c3.type == 'player') {
                    let _0x5a3bed = _0x9ab3c3;
                    if (mp.players.exists(_0x5a3bed)) {
                        _0x5a3bed.getVariable('IS_ADUTY') == true ? _0x5a3bed.alpha = 0 : _0x5a3bed.alpha = 255;
                    }
                }
            }
            render() {
                mp.game.player.setHealthRechargeMultiplier(0);
                mp.game.ui.hideHudComponentThisFrame(7);
                mp.game.ui.hideHudComponentThisFrame(9);
                mp.game.ui.hideHudComponentThisFrame(20);
                if (mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 6)) {
                    mp.game.controls.disableControlAction(0, 140, true);
                    mp.game.controls.disableControlAction(0, 141, true);
                    mp.game.controls.disableControlAction(0, 142, true);
                }
                mp.game.controls.disableControlAction(2, 44, true);
                if (mp.players.local.isUsingActionMode()) {
                    mp.players.local.setUsingActionMode(false, -1, '-1');
                }
                mp.game.gameplay.setFadeOutAfterDeath(false);
                mp.game.invoke('0xDE2EF5DA284CC8DF');
                if (mp.players.local.dimension == 100) {
                    mp.game.invoke('0x5E6CC07646BBEAB8', mp.players.local, true);
                }
                if (this.isShowingRockstarMessage) {
                    mp.game.gxt.set('warning_error', '');
                    mp.game.gxt.set('warning_text', this.rockstarMessageMessage);
                    mp.game.ui.setWarningMessage('warning_error', 0, 'warning_text', false, -1, 'asdasd', '123123123', true);
                }
            }
            playerReady() {
                mp.discord.update('Index Gangwar', 'discord.gg/indexgw');
                mp.nametags.enabled = false;
                mp.players.local.setSuffersCriticalHits(false);
                mp.players.local.setConfigFlag(429, true);
                mp.players.local.setConfigFlag(241, true);
                mp.game.invoke('0xF314CF4F0211894E', 143, 82, 27, 247, 180);
                mp.game.invoke('0xF314CF4F0211894E', 116, 82, 27, 247, 180);
                mp.game.gxt.set('PM_PAUSE_HDR', 'GangwarServer');
                mp.game.stats.statSetInt(mp.game.joaat('SP0_STAMINA'), 100, false);
                mp.game.stats.statSetInt(mp.game.joaat('SP0_STRENGTH'), 100, false);
                mp.game.stats.statSetInt(mp.game.joaat('SP0_LUNG_CAPACITY'), 100, false);
                mp.game.stats.statSetInt(mp.game.joaat('SP0_WHEELIE_ABILITY'), 100, false);
                mp.game.stats.statSetInt(mp.game.joaat('SP0_FLYING_ABILITY'), 100, false);
                mp.game.stats.statSetInt(mp.game.joaat('SP0_SHOOTING_ABILITY'), 100, false);
                mp.game.stats.statSetInt(mp.game.joaat('SP0_STEALTH_ABILITY'), 100, false);
            }
            showRockstarMessage(_0x44844a) {
                mp.events.call('Client:Hud:DestroyBrowser');
                mp.gui.chat.show(false);
                this.rockstarMessageMessage = _0x44844a;
                this.isShowingRockstarMessage = true;
            }
            removeAFKCamera() {
                mp.game.invoke('0x9E4CFFF989258472');
                mp.game.invoke('0xF4F2C0D4EE209E20');
            }
        }, _0x483f2c = new _0x1c1c42(), _0xf9f15 = class {
            constructor(_0x4286d0, _0x4a7919) {
                this.keyCode = _0x4286d0;
                this.keyName = _0x4a7919;
            }
        }, _0x25f0a0 = class {
            constructor(_0x51e604, _0x590632, _0x2d9dd5, _0x2431dd, _0x51c01f, _0x301905) {
                this.interaction = _0x51e604;
                this.firstaidkit = _0x590632;
                this.vest = _0x2d9dd5;
                this.mainmenu = _0x2431dd;
                this.inventory = _0x51c01f;
                this.repairkit = _0x301905;
            }
        }, _0x2b61bc = class {
            constructor() {
                this.isInColshape = false;
                this.lastInteraction = Date.now();
                this.currentTimeout = null;
                this.lastHitted = Date.now();
                mp.events.add('playerEnterColshape', _0x3bc2da => this.playerEnterColshape(_0x3bc2da));
                mp.events.add('playerExitColshape', _0xf7dbe3 => this.playerExitColshape(_0xf7dbe3));
                mp.events.add('Client:Keys:SetLastHit', () => this.lastHitted = Date.now());
                mp.events.add('client:mainmenu:tryBindHotkey', (_0x2dcbf9, _0x4b9cb2, _0x405442, _0x3051e2) => this.tryBindHotkey(_0x2dcbf9, _0x4b9cb2, _0x405442, _0x3051e2));
                mp.events.add('playerReady', () => this.playerReady());
            }
            callInteraction() {
                if (!this.checkCanInteract() || mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible || mp.players.local.vehicle) {
                    this.currentTimeout != null ? (this.lastInteraction = Date.now(), mp.events.callRemote('Server:Keys:CancelAction'), clearTimeout(this.currentTimeout), this.currentTimeout = null) : this.isInColshape == true && (this.lastInteraction = Date.now(), mp.events.callRemote('Server:Keys:PressE'));
                }
            }
            useMedikit() {
                if (!this.checkCanInteract() || this.currentTimeout != null || mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible || mp.players.local.vehicle) {
                    this.lastInteraction = Date.now();
                    mp.events.callRemote('Server:Keys:UseMedikit');
                    this.currentTimeout = setTimeout(() => {
                        mp.events.callRemote('Server:Keys:CancelAction');
                        mp.events.call('Client:AntiCheat:SetHealth', 100);
                        this.currentTimeout = null;
                    }, 4000);
                }
            }
            useVest() {
                if (!this.checkCanInteract() || this.currentTimeout != null || mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible || mp.players.local.vehicle) {
                    this.lastInteraction = Date.now();
                    mp.events.callRemote('Server:Keys:UseVest');
                    this.currentTimeout = setTimeout(() => {
                        mp.events.callRemote('Server:Keys:CancelAction');
                        mp.events.call('Client:AntiCheat:SetArmour', 100);
                        this.currentTimeout = null;
                    }, 4000);
                }
            }
            useRepairKit() {
                if (!this.checkCanInteract() || this.currentTimeout != null || mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible || mp.players.local.vehicle)
                    return;
                this.lastInteraction = Date.now();
                let _0x5f5caf = mp.vehicles.getClosest(mp.players.local.position);
                if (mp.vehicles.exists(_0x5f5caf) && mp.game1.gameplay.getDistanceBetweenCoords(_0x5f5caf.position.x, _0x5f5caf.position.y, _0x5f5caf.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, true) <= 2.5) {
                    mp.events.callRemote('Server:Keys:UseRepairKit');
                    this.currentTimeout = setTimeout(() => {
                        mp.events.callRemote('Server:Keys:FinishVehicleRepair', _0x5f5caf);
                        this.currentTimeout = null;
                    }, 5000);
                }
            }
            requestInventoryItems() {
                if (!this.checkCanInteract() || this.currentTimeout != null || mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible) {
                    this.lastInteraction = Date.now();
                    mp.events.callRemote('Server:Inventory:RequestItems');
                }
            }
            openMainMenu() {
                if (!(mp.players.local.getHealth() <= 0 || mp.players.local.isTypingInTextChat || mp.gui.cursor.visible)) {
                    if (this.lastHitted + 5000 > Date.now()) {
                        mp.gui.chat.push('Du wurdest vor kurzem angeschossen, bitte warte kurz!');
                        return;
                    }
                    mp.events.callRemote('Server:MainMenu:OpenMainMenu');
                }
            }
            tryBindHotkey(_0x249572, _0x6cd7b6, _0x269c42, _0x5721c5) {
                switch (_0x269c42.toLocaleLowerCase()) {
                case 'interaktion':
                    mp.keys.unbind(_0x249572, true);
                    mp.keys.bind(_0x6cd7b6, true, () => this.callInteraction());
                    mp.storage.data.keys.interaction = new _0xf9f15(_0x6cd7b6, _0x5721c5);
                    mp.storage.flush();
                    break;
                case 'hauptmenu':
                    mp.keys.unbind(_0x249572, true);
                    mp.keys.bind(_0x6cd7b6, true, () => this.openMainMenu());
                    mp.storage.data.keys.mainmenu = new _0xf9f15(_0x6cd7b6, _0x5721c5);
                    mp.storage.flush();
                    break;
                case 'verbandskasten':
                    mp.keys.unbind(_0x249572, true);
                    mp.keys.bind(_0x6cd7b6, true, () => this.useMedikit());
                    mp.storage.data.keys.firstaidkit = new _0xf9f15(_0x6cd7b6, _0x5721c5);
                    mp.storage.flush();
                    break;
                case 'weste':
                    mp.keys.unbind(_0x249572, true);
                    mp.keys.bind(_0x6cd7b6, true, () => this.useVest());
                    mp.storage.data.keys.vest = new _0xf9f15(_0x6cd7b6, _0x5721c5);
                    mp.storage.flush();
                    break;
                case 'repairkit':
                    mp.keys.unbind(_0x249572, true);
                    mp.keys.bind(_0x6cd7b6, true, () => this.useRepairKit());
                    mp.storage.data.keys.repairkit = new _0xf9f15(_0x6cd7b6, _0x5721c5);
                    mp.storage.flush();
                    break;
                }
            }
            playerEnterColshape(_0x252ffa) {
                if (mp.colshapes.exists(_0x252ffa)) {
                    this.isInColshape = true;
                }
            }
            playerExitColshape(_0x631038) {
                if (mp.colshapes.exists(_0x631038)) {
                    this.isInColshape = false;
                }
            }
            playerReady() {
                if (mp.storage.data.keys == null) {
                    mp.storage.data.keys = new _0x25f0a0(new _0xf9f15(69, 'E'), new _0xf9f15(188, ','), new _0xf9f15(190, '.'), new _0xf9f15(113, 'F2'), new _0xf9f15(73, 'I'), new _0xf9f15(114, 'F3'));
                    mp.storage.flush();
                }
                mp.keys.bind(mp.storage.data.keys.interaction.keyCode, true, () => this.callInteraction());
                mp.keys.bind(mp.storage.data.keys.firstaidkit.keyCode, true, () => this.useMedikit());
                mp.keys.bind(mp.storage.data.keys.vest.keyCode, true, () => this.useVest());
                mp.keys.bind(mp.storage.data.keys.mainmenu.keyCode, true, () => this.openMainMenu());
                mp.keys.bind(mp.storage.data.keys.repairkit.keyCode, true, () => this.useRepairKit());
                mp.keys.bind(mp.storage.data.keys.inventory.keyCode, true, () => this.requestInventoryItems());
            }
            checkCanInteract() {
                return this.lastInteraction + 200 < Date.now();
            }
        }, _0x58adc3 = new _0x2b61bc(), _0x179eec = function (_0x315756) {
            var _0x3992a0 = Math.sqrt(_0x315756.x * _0x315756.x + _0x315756.y * _0x315756.y + _0x315756.z * _0x315756.z);
            return _0x315756.x = _0x315756.x / _0x3992a0, _0x315756.y = _0x315756.y / _0x3992a0, _0x315756.z = _0x315756.z / _0x3992a0, _0x315756;
        }, _0x340edb = function (_0x38b58b, _0x395a38) {
            var _0x203ad2 = new mp.Vector3(0, 0, 0);
            return _0x203ad2.x = _0x38b58b.y * _0x395a38.z - _0x38b58b.z * _0x395a38.y, _0x203ad2.y = _0x38b58b.z * _0x395a38.x - _0x38b58b.x * _0x395a38.z, _0x203ad2.z = _0x38b58b.x * _0x395a38.y - _0x38b58b.y * _0x395a38.x, _0x203ad2;
        }, _0x403386 = { 'F5': 116 }, _0xbe286f = {
            'Q': 69,
            'E': 81,
            'LCtrl': 17,
            'Shift': 16
        }, _0x5efcb0 = false, _0x1a3b25, _0x44df56 = false, _0x34a8d3 = false, _0x262fbe = mp.players.local;
    mp.keys.bind(_0x403386.F5, true, function () {
        if (_0x262fbe.getVariable('IS_ADUTY') == true) {
            _0x5efcb0 = !_0x5efcb0;
            mp.game.ui.displayRadar(!_0x5efcb0);
            _0x5efcb0 ? _0x29ab05() : _0xa23e98();
        }
    });
    function _0x29ab05() {
        var _0x2b2bd5 = new mp.Vector3(_0x262fbe.position.x, _0x262fbe.position.y, _0x262fbe.position.z), _0x2bd563 = mp.game.cam.getGameplayCamRot(2);
        _0x1a3b25 = mp.cameras.new('default', _0x2b2bd5, _0x2bd563, 45);
        _0x1a3b25.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        _0x262fbe.freezePosition(true);
        _0x262fbe.setInvincible(true);
        _0x262fbe.setVisible(false, false);
        _0x262fbe.setCollision(false, false);
    }
    function _0xa23e98() {
        if (_0x1a3b25) {
            _0x262fbe.position = _0x1a3b25.getCoord();
            _0x262fbe.setHeading(_0x1a3b25.getRot(2).z);
            _0x1a3b25.destroy(true);
            _0x1a3b25 = null;
        }
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        _0x262fbe.freezePosition(false);
        _0x262fbe.setInvincible(false);
        _0x262fbe.setVisible(true, false);
        _0x262fbe.setCollision(true, false);
    }
    mp.events.add('render', function () {
        if (!(!_0x1a3b25 || mp.gui.cursor.visible)) {
            var _0x4218ad = '5|7|10|9|1|8|4|3|6|2|0'.split('|'), _0x40ba15 = 0;
            while (!![]) {
                switch (_0x4218ad[_0x40ba15++]) {
                case '0':
                    if (mp.keys.isDown(_0xbe286f.E)) {
                        _0x1c6b07 = 0.5;
                    }
                    mp.players.local.position = new mp.Vector3(_0x3bcc6f.x + _0x44e20c.x + 1, _0x3bcc6f.y + _0x44e20c.y + 1, _0x3bcc6f.z + _0x44e20c.z + 1);
                    mp.players.local.heading = _0x16bd17.z;
                    _0x1a3b25.setCoord(_0x3bcc6f.x - _0x44e20c.x + _0x1438c2.x, _0x3bcc6f.y - _0x44e20c.y + _0x1438c2.y, _0x3bcc6f.z - _0x44e20c.z + _0x1438c2.z + _0x36ac6b - _0x1c6b07);
                    _0x1a3b25.setRot(_0x2bff53.x + _0x2caf60 * -5, 0, _0x2bff53.z + _0x186d4c * -5, 2);
                    continue;
                case '1':
                    _0x44e20c.x = _0x16bd17.x * _0x200a04 * _0x1ba594 * _0x2ebf38;
                    _0x44e20c.y = _0x16bd17.y * _0x200a04 * _0x1ba594 * _0x2ebf38;
                    _0x44e20c.z = _0x16bd17.z * _0x200a04 * _0x1ba594 * _0x2ebf38;
                    continue;
                case '2':
                    var _0x1c6b07 = 0;
                    continue;
                case '3':
                    var _0x36ac6b = 0;
                    continue;
                case '4':
                    _0x1438c2.x *= _0x49f024 * 0.5;
                    _0x1438c2.y *= _0x49f024 * 0.5;
                    _0x1438c2.z *= _0x49f024 * 0.5;
                    continue;
                case '5':
                    _0x34a8d3 = mp.keys.isDown(_0xbe286f.LCtrl);
                    _0x44df56 = mp.keys.isDown(_0xbe286f.Shift);
                    continue;
                case '6':
                    if (mp.keys.isDown(_0xbe286f.Q)) {
                        _0x36ac6b = 0.5;
                    }
                    continue;
                case '7':
                    var _0x2bff53 = _0x1a3b25.getRot(2), _0x1ba594 = 1, _0x2ebf38 = 1;
                    continue;
                case '8':
                    var _0x452a50 = new mp.Vector3(0, 0, 1), _0x1438c2 = _0x340edb(_0x179eec(_0x16bd17), _0x179eec(_0x452a50));
                    continue;
                case '9':
                    var _0x186d4c = mp.game.controls.getDisabledControlNormal(0, 220), _0x2caf60 = mp.game.controls.getDisabledControlNormal(0, 221), _0x49f024 = mp.game.controls.getDisabledControlNormal(0, 218), _0x200a04 = mp.game.controls.getDisabledControlNormal(0, 219), _0x3bcc6f = _0x1a3b25.getCoord(), _0x16bd17 = _0x1a3b25.getDirection(), _0x44e20c = new mp.Vector3(0, 0, 0);
                    continue;
                case '10':
                    _0x44df56 ? _0x1ba594 = 3 : _0x34a8d3 && (_0x2ebf38 = 0.5);
                    continue;
                }
                break;
            }
        }
    });
    var _0x591ed6 = class {
            constructor() {
                this.spectateTarget = null;
                this.oldPosition = null;
                this.spectateCam = null;
                mp.events.add('render', () => this.renderSpectateCam());
                mp.events.add('Client:Spectate:StartSpectate', _0x254e61 => this.startSpectating(_0x254e61));
                mp.events.add('Client:Spectate:StopSpectate', () => this.stopSpectating());
            }
            startSpectating(_0x5870fa) {
                if (!mp.players.exists(_0x5870fa)) {
                    this.oldPosition = mp.players.local.position;
                    this.spectateTarget = _0x5870fa;
                    this.spectateCam = mp.cameras.new('spectator', _0x5870fa.position, new mp.Vector3(0, 0, 0), 40);
                    this.spectateCam.pointAtPedBone(this.spectateTarget.handle, 39317, 0, 0, 0, true);
                    this.spectateCam.setActive(true);
                    mp.game.cam.renderScriptCams(true, false, 0, true, false);
                }
            }
            renderSpectateCam() {
                if (this.spectateCam != null) {
                    if (!mp.players.exists(this.spectateTarget) || this.spectateTarget == null)
                        return this.stopSpectating();
                    this.spectateCam.attachToPedBone(this.spectateTarget.handle, 39317, 0, -5, 1, true);
                    mp.players.local.position = new mp.Vector3(this.spectateTarget.position.x, this.spectateTarget.position.y, this.spectateTarget.position.z - 100);
                }
            }
            stopSpectating() {
                if (this.spectateCam != null) {
                    this.spectateCam.detach();
                    this.spectateCam.setActive(false);
                    this.spectateCam.destroy();
                    mp.game.cam.renderScriptCams(false, false, 0, true, false);
                    this.spectateCam = null;
                }
                this.spectateTarget = null;
                if (this.oldPosition != null) {
                    mp.players.local.position = this.oldPosition;
                    this.oldPosition = null;
                }
            }
        }, _0x266c49 = new _0x591ed6(), _0x142db6 = class {
            constructor() {
                this.blacklistedVehicleWeapons = [
                    3173288789,
                    584646201
                ];
                mp.events.add('render', () => this.render());
                mp.events.add('playerEnterVehicle', (_0x401d2b, _0x532591) => this.playerEnterVehicle(_0x401d2b, _0x532591));
                mp.events.add('playerLeaveVehicle', (_0x24c276, _0x427d56) => this.playerLeaveVehicle(_0x24c276, _0x427d56));
                mp.events.add('entityStreamIn', _0x197a15 => this.entityStreamIn(_0x197a15));
            }
            render() {
                if (mp.players.local.vehicle) {
                    mp.game.audio.setRadioToStationName('OFF');
                    mp.game.ui.hideHudComponentThisFrame(6);
                    mp.game.ui.hideHudComponentThisFrame(8);
                }
                if (mp.players.local.vehicle && this.blacklistedVehicleWeapons.includes(mp.players.local.weapon)) {
                    mp.game.invoke('0x5E6CC07646BBEAB8', mp.players.local, true);
                }
            }
            playerEnterVehicle(_0x15f149, _0x52832e) {
                _0x15f149.setEngineOn(true, true, false);
            }
            playerLeaveVehicle(_0x570a6e, _0x3b518c) {
            }
            entityStreamIn(_0x5785fb) {
                if (_0x5785fb.type == 'vehicle') {
                    var _0x3d8fa9 = _0x5785fb;
                    if (mp.vehicles.exists(_0x3d8fa9)) {
                        _0x3d8fa9.setTyresCanBurst(false);
                    }
                }
            }
        }, _0x19193c = new _0x142db6(), _0x568eb8 = _0x2f7a3e(_0x4f56f1()), _0x46b40e = _0x2f7a3e(_0x274e09()), _0x313a98 = class {
            constructor() {
                this.meeles = [
                    2460120199,
                    2508868239,
                    4192643659,
                    2227010557,
                    2725352035,
                    2343591895,
                    1141786504,
                    1317494643,
                    4191993645,
                    3638508604,
                    2578778090,
                    3713923289,
                    3756226112,
                    1737195953,
                    419712736,
                    3441901897,
                    2484171525,
                    940833800
                ];
                this.allowedWeapons = [];
                this.playerVisibilityFlags = 0;
                this.autoDriveFlags = 0;
                this.spawnedVehicleFlags = 0;
                this.noClipFlags = 0;
                this.oldPositon = mp.players.local.position;
                this.isAcPaused = true;
                mp.events.add('outgoingDamage', (_0x58f436, _0x3fa4ca, _0x39c889, _0x2cc4e5, _0x41b5a4, _0x150606) => this.outgoingDamage(_0x58f436, _0x3fa4ca, _0x39c889, _0x2cc4e5, _0x41b5a4, _0x150606));
                mp.events.add('client:anticheat:addWeaponToWhitelist', _0x1f979b => this.addWeaponToWhitelist(_0x1f979b));
                mp.events.add('client:anticheat:removeWeaponFromWhitelist', _0x3a475f => this.removeWeaponFromWhitelist(_0x3a475f));
                mp.events.add('client:anticheat:removeAllWeapons', () => this.removeAllWeapons());
                mp.events.add('client:anticheat:pauseAntiCheat', _0x3abb79 => this.setAcPause(_0x3abb79));
                setInterval(() => this.antiCheatTick(), 250);
            }
            outgoingDamage(_0x1226eb, _0x35d29d, _0x35f198, _0x4ee2e3, _0x505877, _0x5aa2ec) {
                if (this.meeles.includes(_0x4ee2e3) && _0x5aa2ec > 300)
                    return mp.events.callRemote('Server:AntiCheat:triggerAcHeavyFist', _0x5aa2ec), true;
            }
            addWeaponToWhitelist(_0x1a13f9) {
                this.allowedWeapons.push(_0x1a13f9);
            }
            removeWeaponFromWhitelist(_0x655024) {
                var _0x5ed3b1 = this.allowedWeapons.indexOf(_0x655024);
                if (_0x5ed3b1 !== -1) {
                    this.allowedWeapons.splice(_0x5ed3b1, 1);
                }
            }
            removeAllWeapons() {
                mp.game.invoke('0xF25DF915FA38C5F3', mp.players.local.handle, true);
                this.allowedWeapons = [];
            }
            checkCurrentWeapon() {
                if (mp.players.local.weapon == mp.game.joaat('weapon_unarmed'))
                    return;
                let _0x11d924 = mp.game1.invoke('0x0A6DB4965674D243', mp.players.local.handle);
                if (_0x11d924 == -1569615261)
                    return;
                if (this.allowedWeapons.includes(_0x11d924) == false) {
                    mp.events.callRemote('Server:AntiCheat:triggerWeaponAc', _0x11d924);
                }
            }
            checkPlayerVisibility() {
                if (mp.game.invoke('0x5A47B3B5E63E94C6', mp.players.local.handle) < 150 && mp.players.local.getVariable('PLAYER_IS_ADUTY') == false) {
                    this.playerVisibilityFlags++;
                    if (this.playerVisibilityFlags >= 3) {
                        mp.events.callRemote('Server:AntiCheat:Visibility', mp.game.invoke('0x5A47B3B5E63E94C6', mp.players.local.handle));
                    }
                }
            }
            checkAutoDrive() {
                if (mp.players.local.vehicle && mp.players.local.getIsTaskActive(169)) {
                    this.autoDriveFlags++;
                    if (this.autoDriveFlags >= 3) {
                        mp.events.callRemote('Server:AntiCheat:AutoDrive');
                    }
                }
            }
            checkCurrentVehicle() {
                if (mp.players.local.vehicle == null && mp.game.invoke('0x997ABD671D25CA0B', mp.players.local.handle, false) == true) {
                    this.spawnedVehicleFlags++;
                    if (this.spawnedVehicleFlags >= 3) {
                        mp.events.callRemote('Server:AntiCheat:ClientVehicle');
                    }
                }
            }
            antiCheatTick() {
                this.checkCurrentWeapon();
                this.checkPlayerVisibility();
                this.checkAutoDrive();
                this.checkCurrentVehicle();
            }
            setAcPause(_0x1aef97) {
                _0x1aef97 ? this.isAcPaused = true : (this.oldPositon = mp.players.local.position, this.isAcPaused = false);
            }
        }, _0x4e22f3 = new _0x313a98(), _0x4d3050 = class {
            constructor() {
                mp.events.add('Client:Peds:SpawnPeds', _0x51174e => this.spawnPeds(_0x51174e));
            }
            spawnPeds(_0x316440) {
                _0x316440 = JSON.parse(_0x316440);
                _0x316440.forEach(_0x8aa3aa => {
                    mp.peds.new(mp.game.joaat(_0x8aa3aa.pedModel), _0x8aa3aa.pedPosition, _0x8aa3aa.pedRotation, _0x8aa3aa.pedDimension);
                });
            }
        }, _0x5a5ac8 = new _0x4d3050(), _0x2235f8 = class {
            constructor() {
                this.zones = [];
                mp.events.add('Client:Zones:AddNewZone', (_0x504356, _0x5aba2f, _0x49441f, _0x211a7c) => this.createZone(_0x504356, _0x5aba2f, _0x49441f, _0x211a7c));
                mp.events.add('Client:Zones:DeleteZones', () => this.deleteZones());
                mp.events.add('playerQuit', _0xa5b5a7 => this.deleteZonesOffline(_0xa5b5a7));
            }
            createZone(_0x53aa66, _0x37f295, _0x17b10e, _0x432f11) {
                let _0x19a971 = mp.game1.ui.addBlipForRadius(_0x53aa66.x, _0x53aa66.y, _0x53aa66.z, _0x37f295);
                if (mp.game1.invoke('0xA6DB27D19ECBB7DA', _0x19a971)) {
                    mp.game1.invoke('0xDF735600A4696DAF', _0x19a971, 9);
                    mp.game1.invoke('0x45FF974EEE1C8734', _0x19a971, _0x17b10e);
                    mp.game1.invoke('0x03D7FB09E75D6B7E', _0x19a971, _0x432f11);
                    this.zones.push(_0x19a971);
                }
            }
            deleteZones() {
                for (let _0x2b2a12 of this.zones)
                    if (mp.game1.invoke('0xA6DB27D19ECBB7DA', _0x2b2a12)) {
                        mp.game.ui.removeBlip(_0x2b2a12);
                    }
            }
            deleteZonesOffline(_0x50feb4) {
                if (!!mp.players.exists(_0x50feb4) && _0x50feb4 == mp.players.local) {
                    for (let _0x40a53b of this.zones)
                        if (mp.game1.invoke('0xA6DB27D19ECBB7DA', _0x40a53b)) {
                            mp.game.ui.removeBlip(_0x40a53b);
                        }
                }
            }
        }, _0x45b5e4 = new _0x2235f8();
})();