{
﻿const _0x21e7 = ['~n~~y~[LALT]~w~Навес:', 'gameplay', 'server.soccer.game.hit.ball', 'radToDeg', 'undefined', 'freezePosition', 'push', 'getRotation', 'vectors', 'waitAsync', 'min', 'graphics', 'requestAnimDict', 'soccer.field', 'placeOnGroundProperly', 'events', 'find', 'now', 'clearTasksImmediately', 'game', 'isDisabledControlJustPressed', 'registerZone', 'onPlayerEnterZone', 'handle', 'ForwardVectorFromRotation', 'setHasGravity', 'LeftVector', 'drawText', 'guard_beatup_kickidle_guard1', 'new', 'sin', 'server.soccer.game.sync.ball', 'destroy', 'getVelocity', 'local', 'setVelocity', 'registered', 'server.soccer.game.ball.register.goal', '~o~Футбол:~n~~y~[SPACE]~w~Сила:', 'stringify', 'add', 'callRemote', 'soccer.gate.1', 'rotation', 'onPlayerExitZone', 'players', 'controls', 'setRotation', 'zones', 'number', 'UpVector', 'Forward', 'parse', 'position', 'degToRad', 'findIndex', 'exists', 'render', 'eulerToQuaternion', 'ForwardVector', 'joaat', 'getDistanceBetweenCoords', 'soccer.gate.2', 'isPointInZone', 'max', 'server.soccer.game.ball.left.zone', 'Left', '~g~Yes', 'zoneName', 'disableControlAction', 'isControlJustPressed', 'getCoords', 'server.soccer.game.change.controller', 'object', 'collieded', 'streaming', 'RightVector', 'hasAnimDictLoaded', 'cos', 'length', 'objects', 'isArray'];
(function(_0x2cdfe1, _0x21e7e2) {
    const _0x140965 = function(_0x476418) {
        while (--_0x476418) {
            _0x2cdfe1['push'](_0x2cdfe1['shift']());
        }
    };
    _0x140965(++_0x21e7e2);
}(_0x21e7, 0x1ae));
const _0x1409 = function(_0x2cdfe1, _0x21e7e2) {
    _0x2cdfe1 = _0x2cdfe1 - 0x0;
    let _0x140965 = _0x21e7[_0x2cdfe1];
    return _0x140965;
};
const _0x1aebf2 = _0x1409;
'use strict';
mp[_0x1aebf2('0x1c')] = {}, mp[_0x1aebf2('0x1c')][_0x1aebf2('0x10')] = [], mp[_0x1aebf2('0x1c')]['isZoneRegistered'] = _0x476418 => {
    const _0x37cca8 = _0x1aebf2;
    return mp[_0x37cca8('0x1c')][_0x37cca8('0x10')][_0x37cca8('0x23')](_0x4edaa3 => _0x4edaa3[_0x37cca8('0x30')] == _0x476418) != -0x1;
}, mp[_0x1aebf2('0x1c')]['getZoneByName'] = _0x5a0991 => {
    const _0x49d2ae = _0x1aebf2;
    return mp[_0x49d2ae('0x1c')]['registered']['find'](_0x9db7e => _0x9db7e[_0x49d2ae('0x30')] == _0x5a0991);
}, mp[_0x1aebf2('0x1c')]['unRegisterZone'] = _0x3ea348 => {
    const _0x454373 = _0x1aebf2,
        _0x1b1b2c = mp[_0x454373('0x1c')]['registered'][_0x454373('0x23')](_0x6a7d09 => _0x6a7d09[_0x454373('0x30')] == _0x3ea348);
    if (_0x1b1b2c == -0x1) return;
    mp[_0x454373('0x1c')][_0x454373('0x10')]['splice'](_0x1b1b2c, 0x1);
}, mp[_0x1aebf2('0x1c')][_0x1aebf2('0x1')] = (_0x14aa07, _0xca42ec, _0x34cd2d) => {
    const _0x404dda = _0x1aebf2;
    if (mp[_0x404dda('0x1c')]['isZoneRegistered'](_0x34cd2d)) return;
    mp[_0x404dda('0x1c')]['registered'][_0x404dda('0x44')]({
        'vectors': _0x14aa07,
        'height': _0xca42ec,
        'collieded': ![],
        'zoneName': _0x34cd2d
    });
}, mp[_0x1aebf2('0x1c')]['isPointInZone'] = (_0x4a3b35, _0x352edb) => {
    const _0xdf4518 = _0x1aebf2,
        _0x424a4e = mp[_0xdf4518('0x1c')][_0xdf4518('0x10')][_0xdf4518('0x4e')](_0x526703 => _0x526703[_0xdf4518('0x30')] == _0x352edb);
    if (!_0x424a4e) return;
    return isPointInside(_0x4a3b35, _0x424a4e[_0xdf4518('0x46')]);
};
const isPointInside = (_0x5877ee, _0x60a6e2) => {
    const _0x1ecc32 = _0x1aebf2;
    if (Array[_0x1ecc32('0x3d')](_0x60a6e2) && (_0x60a6e2[0x0] && _0x60a6e2[0x0]['x'])) {
        let _0x3736c0 = ![],
            _0x3c31e4 = _0x60a6e2[0x0]['x'],
            _0x509d78 = _0x60a6e2[0x0]['x'],
            _0x530169 = _0x60a6e2[0x0]['y'],
            _0x218596 = _0x60a6e2[0x0]['y'];
        for (let _0x461517 = 0x1; _0x461517 < _0x60a6e2['length']; _0x461517++) {
            let _0x50ab99 = _0x60a6e2[_0x461517];
            _0x3c31e4 = Math[_0x1ecc32('0x48')](_0x50ab99['x'], _0x3c31e4), _0x509d78 = Math[_0x1ecc32('0x2c')](_0x50ab99['x'], _0x509d78), _0x530169 = Math[_0x1ecc32('0x48')](_0x50ab99['y'], _0x530169), _0x218596 = Math[_0x1ecc32('0x2c')](_0x50ab99['y'], _0x218596);
        }
        if (_0x5877ee['x'] < _0x3c31e4 || _0x5877ee['x'] > _0x509d78 || _0x5877ee['y'] < _0x530169 || _0x5877ee['y'] > _0x218596) return ![];
        for (let _0x4b4b15 = 0x0, _0x5247d8 = _0x60a6e2['length'] - 0x1; _0x4b4b15 < _0x60a6e2[_0x1ecc32('0x3b')]; _0x5247d8 = _0x4b4b15++) {
            _0x60a6e2[_0x4b4b15]['y'] > _0x5877ee['y'] != _0x60a6e2[_0x5247d8]['y'] > _0x5877ee['y'] && _0x5877ee['x'] < (_0x60a6e2[_0x5247d8]['x'] - _0x60a6e2[_0x4b4b15]['x']) * (_0x5877ee['y'] - _0x60a6e2[_0x4b4b15]['y']) / (_0x60a6e2[_0x5247d8]['y'] - _0x60a6e2[_0x4b4b15]['y']) + _0x60a6e2[_0x4b4b15]['x'] && (_0x3736c0 = !_0x3736c0);
        }
        return _0x3736c0;
    }
};
mp['events'][_0x1aebf2('0x14')](_0x1aebf2('0x25'), () => {
    const _0x358836 = _0x1aebf2;
    for (let _0x399c42 of mp[_0x358836('0x1c')]['registered']) {
        const _0x172092 = mp[_0x358836('0x19')][_0x358836('0xe')][_0x358836('0x21')],
            _0x2345cf = [];
        for (let _0x462acd in _0x399c42[_0x358836('0x46')]) {
            const _0xa45016 = _0x399c42['vectors'][_0x462acd];
            if (mp[_0x358836('0x19')][_0x358836('0xe')][_0x358836('0x21')]['z'] > _0xa45016['z'] && mp[_0x358836('0x19')][_0x358836('0xe')][_0x358836('0x21')]['z'] < _0xa45016['z'] + _0x399c42['height']) {
                _0x2345cf[_0x358836('0x44')](_0xa45016);
                continue;
            }
        }
        isPointInside(_0x172092, _0x2345cf) && mp[_0x358836('0x19')][_0x358836('0xe')]['dimension'] == 0x0 ? !_0x399c42[_0x358836('0x36')] && (mp['events'][_0x358836('0x15')](_0x358836('0x2'), _0x399c42[_0x358836('0x30')]), _0x399c42[_0x358836('0x36')] = !![]) : _0x399c42[_0x358836('0x36')] && (mp[_0x358836('0x4d')][_0x358836('0x15')](_0x358836('0x18'), _0x399c42['zoneName']), _0x399c42[_0x358836('0x36')] = ![]);
    }
});
const gate1 = [{
        'x': 803.32,
        'y': -245.66,
        'z': 65.11225463867187
    }, {
        'x': 806.0801391601562,
        'y': -246.5013427734375,
        'z': 65.00828887939453
    }, {
        'x': 803.1902465820312,
        'y': -253.49021911621094,
        'z': 64.96632720947265
    }, {
        'x': 800.3242553710938,
        'y': -251.51641174316407,
        'z': 65.1116519165039
    }],
    gate2 = [{
        'x': 739.45884765625,
        'y': -221.6790985107422,
        'z': 65.13441040039062
    }, {
        'x': 736.6654052734375,
        'y': -220.78797912597656,
        'z': 65.1344790649414
    }, {
        'x': 739.0966186523438,
        'y': -213.79615783691406,
        'z': 65.13444854736328
    }, {
        'x': 742.181884765625,
        'y': -214.9886749267578,
        'z': 65.13444854736328
    }],
    field = [{
        'x': 745.8106689453125,
        'y': -192.00218200683594,
        'z': 65.0483203125
    }, {
        'x': 772.7062377929688,
        'y': -204.66534423828125,
        'z': 65.21538116455078
    }, {
        'x': 782.7891235351562,
        'y': -209.8881378173828,
        'z': 65.21304656982421
    }, {
        'x': 793.8092041015625,
        'y': -214.75413513183594,
        'z': 65.20994140625
    }, {
        'x': 806.8981323242188,
        'y': -222.99755859375,
        'z': 65.2146792602539
    }, {
        'x': 814.7168579101562,
        'y': -228.26614379882812,
        'z': 65.20992614746093
    }, {
        'x': 824.138671875,
        'y': -233.87283325195312,
        'z': 65.118388671875
    }, {
        'x': 812.8098754882812,
        'y': -261.0392150878906,
        'z': 64.76794769287109
    }, {
        'x': 808.3945922851562,
        'y': -262.81317138671875,
        'z': 64.79189636230468
    }, {
        'x': 804.3789672851562,
        'y': -265.7671203613281,
        'z': 65.15991546630859
    }, {
        'x': 800.3907470703125,
        'y': -269.1235046386719,
        'z': 65.28449584960937
    }, {
        'x': 793.547607421875,
        'y': -273.130126953125,
        'z': 65.53155853271484
    }, {
        'x': 789.0399169921875,
        'y': -274.5185241699219,
        'z': 65.57670166015625
    }, {
        'x': 785.7619018554688,
        'y': -274.5060729980469,
        'z': 65.42690612792968
    }, {
        'x': 781.4942626953125,
        'y': -273.5528259277344,
        'z': 65.22207977294921
    }, {
        'x': 770.4845581054688,
        'y': -267.6854248046875,
        'z': 65.14342834472656
    }, {
        'x': 761.4974975585938,
        'y': -262.5043640136719,
        'z': 65.17062713623046
    }, {
        'x': 754.7633666992188,
        'y': -258.407958984375,
        'z': 65.17129852294921
    }, {
        'x': 727.9015502929688,
        'y': -244.62490844726562,
        'z': 65.19628479003906
    }, {
        'x': 715.6575317382812,
        'y': -239.48873901367188,
        'z': 65.20452453613281
    }, {
        'x': 719.4022216796875,
        'y': -232.99147033691406,
        'z': 65.39868499755859
    }, {
        'x': 725.4790649414062,
        'y': -224.32125854492188,
        'z': 66.08281280517578
    }, {
        'x': 729.7716064453125,
        'y': -216.61863708496094,
        'z': 66.6341357421875
    }, {
        'x': 733.8478393554688,
        'y': -208.49053955078125,
        'z': 67.24512817382812
    }, {
        'x': 737.671630859375,
        'y': -200.36904907226562,
        'z': 67.84658386230468
    }, {
        'x': 742.1373291015625,
        'y': -189.87368774414062,
        'z': 69.0421939086914
    }, {
        'x': 745.6549072265625,
        'y': -191.3390655517578,
        'z': 66.23480560302734
    }];
mp[_0x1aebf2('0x1c')][_0x1aebf2('0x1')](gate1, 0x3, _0x1aebf2('0x16')), mp[_0x1aebf2('0x1c')][_0x1aebf2('0x1')](gate2, 0x3, _0x1aebf2('0x2a')), mp[_0x1aebf2('0x1c')][_0x1aebf2('0x1')](field, 0x3, _0x1aebf2('0x4b'));
const waitAsync = async (_0x51b768 = 0xa) => new Promise(_0x241838 => setTimeout(() => _0x241838(), _0x51b768)), loadAnimationDictionary = async _0xe3993e => {
    const _0xf6b431 = _0x1aebf2;
    if (!mp[_0xf6b431('0x51')][_0xf6b431('0x37')][_0xf6b431('0x39')](_0xe3993e)) {
        mp[_0xf6b431('0x51')][_0xf6b431('0x37')][_0xf6b431('0x4a')](_0xe3993e);
        while (!mp[_0xf6b431('0x51')][_0xf6b431('0x37')][_0xf6b431('0x39')](_0xe3993e)) {
            await mp[_0xf6b431('0x51')][_0xf6b431('0x47')](0x0);
        }
    }
}, playAnimation = async (_0x36a42e, _0x435a84, _0x56be38 = -0x1) => {
    const _0x57e6f5 = _0x1aebf2;
    mp[_0x57e6f5('0x19')][_0x57e6f5('0xe')]['clearTasks'](), mp[_0x57e6f5('0x19')][_0x57e6f5('0xe')][_0x57e6f5('0x50')](), await loadAnimationDictionary(_0x36a42e), mp[_0x57e6f5('0x19')][_0x57e6f5('0xe')]['taskPlayAnim'](_0x36a42e, _0x435a84, 0x8, 0x1, -0x1, 0x1, 0x1, ![], ![], ![]), _0x56be38 > 0x0 && setTimeout(() => stopAnimation(), _0x56be38);
}, stopAnimation = () => {
    const _0x55dc9e = _0x1aebf2;
    mp[_0x55dc9e('0x19')][_0x55dc9e('0xe')]['clearTasks'](), mp[_0x55dc9e('0x19')][_0x55dc9e('0xe')][_0x55dc9e('0x50')]();
};
let isActive, isController, ball;
const setActiveStatus = _0x24235e => isActive = _0x24235e,
    isGameActive = () => isActive,
    setControllerStatus = _0x20dd58 => isController = _0x20dd58,
    isControllerStatus = () => isController,
    getBall = () => ball,
    createBall = async (_0x53691a, _0x9c7a03, _0xde81bd = 0x0) => {
        const _0x2a37a7 = _0x1aebf2;
        typeof ball != _0x2a37a7('0x42') && mp['objects'][_0x2a37a7('0x24')](ball) && ball[_0x2a37a7('0xc')]();
        ball = mp[_0x2a37a7('0x3c')][_0x2a37a7('0x9')](mp['game'][_0x2a37a7('0x28')]('p_ld_soc_ball_01'), _0x53691a, {
            'rotation': _0x9c7a03,
            'alpha': 0xff,
            'dimension': _0xde81bd
        });
        while (ball[_0x2a37a7('0x3')] <= 0x0) {
            await waitAsync(0x0);
        }
        ball['setRecordsCollisions'](!![]), ball['setCollision'](!![], !![]), ball[_0x2a37a7('0x5')](!![]), ball[_0x2a37a7('0x43')](![]), ball[_0x2a37a7('0x4c')]();
    }, updateBall = (_0x4fadcb, _0x574c2f, _0x5c1ad8) => {
        const _0x20753d = _0x1aebf2;
        if (typeof ball == _0x20753d('0x42') || !mp[_0x20753d('0x3c')][_0x20753d('0x24')](ball)) return createBall(_0x4fadcb, _0x574c2f);
        ball['setCoords'](_0x4fadcb['x'], _0x4fadcb['y'], _0x4fadcb['z'], !![], !![], !![], ![]), ball[_0x20753d('0x1b')](_0x574c2f['x'], _0x574c2f['y'], _0x574c2f['z'], 0x2, !![]), ball[_0x20753d('0xf')](_0x5c1ad8['x'], _0x5c1ad8['y'], _0x5c1ad8['z']);
    }, destroyBall = () => {
        const _0x4a6538 = _0x1aebf2;
        if (typeof ball == 'undefined' || !mp[_0x4a6538('0x3c')]['exists'](ball)) return;
        ball[_0x4a6538('0xc')](), ball = undefined;
    };
let lastControllerChange = 0x0,
    lastSyncTick = 0x0;
mp[_0x1aebf2('0x4d')][_0x1aebf2('0x14')]({
    'render': () => {
        const _0x3d0b4c = _0x1aebf2;
        if (isGameActive()) {
            const _0x2396fb = getBall();
            if (typeof _0x2396fb != _0x3d0b4c('0x42') && mp[_0x3d0b4c('0x3c')]['exists'](_0x2396fb)) {
                const _0x2fcdc5 = _0x2396fb[_0x3d0b4c('0x33')](!![]);
                typeof _0x2fcdc5 == _0x3d0b4c('0x35') && typeof _0x2fcdc5['x'] == _0x3d0b4c('0x1d') && (!isControllerStatus() ? mp[_0x3d0b4c('0x51')]['gameplay'][_0x3d0b4c('0x29')](_0x2fcdc5['x'], _0x2fcdc5['y'], _0x2fcdc5['z'], mp['players'][_0x3d0b4c('0xe')][_0x3d0b4c('0x21')]['x'], mp[_0x3d0b4c('0x19')][_0x3d0b4c('0xe')][_0x3d0b4c('0x21')]['y'], mp['players'][_0x3d0b4c('0xe')][_0x3d0b4c('0x21')]['z'], !![]) < 0x2 && (Date[_0x3d0b4c('0x4f')]() > lastControllerChange + 0x28 && (lastControllerChange = Date['now'](), mp[_0x3d0b4c('0x4d')][_0x3d0b4c('0x15')]('server.soccer.game.change.controller'))) : Date[_0x3d0b4c('0x4f')]() > lastSyncTick + 0x28 && (lastSyncTick = Date[_0x3d0b4c('0x4f')](), mp['events'][_0x3d0b4c('0x15')](_0x3d0b4c('0xb'), JSON[_0x3d0b4c('0x13')](_0x2fcdc5), JSON[_0x3d0b4c('0x13')](_0x2396fb[_0x3d0b4c('0x45')](0x2)), JSON[_0x3d0b4c('0x13')](_0x2396fb[_0x3d0b4c('0xd')]())), !mp[_0x3d0b4c('0x1c')][_0x3d0b4c('0x2b')](_0x2fcdc5, _0x3d0b4c('0x4b')) && mp[_0x3d0b4c('0x4d')][_0x3d0b4c('0x15')](_0x3d0b4c('0x2d')), mp[_0x3d0b4c('0x1c')][_0x3d0b4c('0x2b')](_0x2fcdc5, _0x3d0b4c('0x16')) && mp[_0x3d0b4c('0x4d')][_0x3d0b4c('0x15')](_0x3d0b4c('0x11'), 'gate1'), mp['zones'][_0x3d0b4c('0x2b')](_0x2fcdc5, 'soccer.gate.2') && mp[_0x3d0b4c('0x4d')][_0x3d0b4c('0x15')]('server.soccer.game.ball.register.goal', 'gate2')));
            }
        }
    }
});
class DirectionVector {
    constructor(_0x468a8d, _0x30c451) {
        const _0x1a9d87 = _0x1aebf2;
        this['position'] = _0x468a8d, this[_0x1a9d87('0x17')] = _0x30c451;
    } [_0x1aebf2('0x22')](_0xf3374f) {
        return _0xf3374f * Math['PI'] / 0xb4;
    } [_0x1aebf2('0x41')](_0x65952b) {
        return _0x65952b * 0xb4 / Math['PI'];
    } ['eulerToQuaternion']() {
        const _0x59ec36 = _0x1aebf2;
        let _0x1a3675 = this[_0x59ec36('0x22')](this[_0x59ec36('0x17')]['x']),
            _0x218c30 = this['degToRad'](this['rotation']['y']),
            _0x41991a = this[_0x59ec36('0x22')](this[_0x59ec36('0x17')]['z']);
        const _0x346a72 = Math[_0x59ec36('0xa')](_0x1a3675 / 0x2) * Math[_0x59ec36('0x3a')](_0x218c30 / 0x2) * Math['cos'](_0x41991a / 0x2) - Math[_0x59ec36('0x3a')](_0x1a3675 / 0x2) * Math[_0x59ec36('0xa')](_0x218c30 / 0x2) * Math[_0x59ec36('0xa')](_0x41991a / 0x2),
            _0x124639 = Math[_0x59ec36('0x3a')](_0x1a3675 / 0x2) * Math['sin'](_0x218c30 / 0x2) * Math[_0x59ec36('0x3a')](_0x41991a / 0x2) + Math[_0x59ec36('0xa')](_0x1a3675 / 0x2) * Math['cos'](_0x218c30 / 0x2) * Math['sin'](_0x41991a / 0x2),
            _0x5de62a = Math[_0x59ec36('0x3a')](_0x1a3675 / 0x2) * Math[_0x59ec36('0x3a')](_0x218c30 / 0x2) * Math[_0x59ec36('0xa')](_0x41991a / 0x2) - Math[_0x59ec36('0xa')](_0x1a3675 / 0x2) * Math[_0x59ec36('0xa')](_0x218c30 / 0x2) * Math[_0x59ec36('0x3a')](_0x41991a / 0x2),
            _0x39fcd5 = Math[_0x59ec36('0x3a')](_0x1a3675 / 0x2) * Math[_0x59ec36('0x3a')](_0x218c30 / 0x2) * Math[_0x59ec36('0x3a')](_0x41991a / 0x2) + Math[_0x59ec36('0xa')](_0x1a3675 / 0x2) * Math[_0x59ec36('0xa')](_0x218c30 / 0x2) * Math[_0x59ec36('0xa')](_0x41991a / 0x2);
        return {
            'x': _0x346a72,
            'y': _0x124639,
            'z': _0x5de62a,
            'w': _0x39fcd5
        };
    } [_0x1aebf2('0x4')](_0x58d728 = 0x1) {
        const _0x546a1b = _0x1aebf2,
            _0xf036bc = this['degToRad'](this['rotation']['z']),
            _0x3402e4 = this['degToRad'](this[_0x546a1b('0x17')]['x']),
            _0x2e0219 = Math['abs'](Math[_0x546a1b('0x3a')](_0x3402e4));
        return {
            'x': -Math[_0x546a1b('0xa')](_0xf036bc) * (_0x2e0219 * _0x58d728),
            'y': Math[_0x546a1b('0x3a')](_0xf036bc) * (_0x2e0219 * _0x58d728),
            'z': Math[_0x546a1b('0xa')](_0x3402e4)
        };
    } [_0x1aebf2('0x27')](_0x51c466 = 0x1) {
        const _0x441662 = _0x1aebf2,
            _0x57156c = this[_0x441662('0x26')](),
            _0x470337 = 0x2 * (_0x57156c['x'] * _0x57156c['y'] - _0x57156c['w'] * _0x57156c['z']),
            _0x57d949 = 0x1 - 0x2 * (_0x57156c['x'] * _0x57156c['x'] + _0x57156c['z'] * _0x57156c['z']),
            _0x7a006f = 0x2 * (_0x57156c['y'] * _0x57156c['z'] + _0x57156c['w'] * _0x57156c['x']);
        return {
            'x': _0x470337 * _0x51c466,
            'y': _0x57d949 * _0x51c466,
            'z': _0x7a006f * _0x51c466
        };
    } [_0x1aebf2('0x1f')](_0x3b6fcd) {
        const _0x3051d5 = _0x1aebf2,
            _0x14f64c = this[_0x3051d5('0x27')]();
        return {
            'x': this[_0x3051d5('0x21')]['x'] + _0x14f64c['x'] * _0x3b6fcd,
            'y': this[_0x3051d5('0x21')]['y'] + _0x14f64c['y'] * _0x3b6fcd,
            'z': this[_0x3051d5('0x21')]['z'] + _0x14f64c['z'] * _0x3b6fcd
        };
    } ['RearVector']() {
        const _0x1c619c = _0x1aebf2,
            _0x5d94e0 = this[_0x1c619c('0x26')](),
            _0x3c647d = 0x2 * (_0x5d94e0['x'] * _0x5d94e0['y'] - _0x5d94e0['w'] * _0x5d94e0['z']),
            _0x4ffdad = 0x1 - 0x2 * (_0x5d94e0['x'] * _0x5d94e0['x'] + _0x5d94e0['z'] * _0x5d94e0['z']),
            _0x96cd99 = 0x2 * (_0x5d94e0['y'] * _0x5d94e0['z'] + _0x5d94e0['w'] * _0x5d94e0['x']);
        return {
            'x': _0x3c647d,
            'y': _0x4ffdad,
            'z': _0x96cd99
        };
    } ['Rear'](_0x494ca0) {
        const _0x524bfe = _0x1aebf2,
            _0x417a50 = this[_0x524bfe('0x27')]();
        return {
            'x': this['position']['x'] + _0x417a50['x'] * -_0x494ca0,
            'y': this[_0x524bfe('0x21')]['y'] + _0x417a50['y'] * -_0x494ca0,
            'z': this[_0x524bfe('0x21')]['z'] + _0x417a50['z'] * -_0x494ca0
        };
    } [_0x1aebf2('0x38')]() {
        const _0x25bcd4 = this['eulerToQuaternion'](),
            _0x1821cb = 0x1 - 0x2 * (_0x25bcd4['y'] * _0x25bcd4['y'] + _0x25bcd4['z'] * _0x25bcd4['z']),
            _0x274f4a = 0x2 * (_0x25bcd4['x'] * _0x25bcd4['y'] + _0x25bcd4['w'] * _0x25bcd4['z']),
            _0x5eae74 = 0x2 * (_0x25bcd4['x'] * _0x25bcd4['z'] - _0x25bcd4['w'] * _0x25bcd4['y']);
        return {
            'x': _0x1821cb,
            'y': _0x274f4a,
            'z': _0x5eae74
        };
    } ['Right'](_0x4bb225) {
        const _0xb686ad = _0x1aebf2,
            _0x1fbe90 = this[_0xb686ad('0x38')]();
        return {
            'x': this[_0xb686ad('0x21')]['x'] + _0x1fbe90['x'] * _0x4bb225,
            'y': this[_0xb686ad('0x21')]['y'] + _0x1fbe90['y'] * _0x4bb225,
            'z': this['position']['z'] + _0x1fbe90['z'] * _0x4bb225
        };
    } [_0x1aebf2('0x6')](_0x2a6c17 = 0x1) {
        const _0x3c932d = _0x1aebf2,
            _0x26fcd1 = this[_0x3c932d('0x26')](),
            _0x139df6 = 0x1 - 0x2 * (_0x26fcd1['y'] * _0x26fcd1['y'] + _0x26fcd1['z'] * _0x26fcd1['z']),
            _0x6c89b5 = 0x2 * (_0x26fcd1['x'] * _0x26fcd1['y'] + _0x26fcd1['w'] * _0x26fcd1['z']),
            _0x204eb0 = 0x2 * (_0x26fcd1['x'] * _0x26fcd1['z'] - _0x26fcd1['w'] * _0x26fcd1['y']);
        return {
            'x': _0x139df6 * -_0x2a6c17,
            'y': _0x6c89b5 * -_0x2a6c17,
            'z': _0x204eb0 * -_0x2a6c17
        };
    } [_0x1aebf2('0x2e')](_0xbc23a4) {
        const _0x14e4b0 = _0x1aebf2,
            _0x353674 = this[_0x14e4b0('0x6')](_0xbc23a4);
        return {
            'x': this[_0x14e4b0('0x21')]['x'] + _0x353674['x'],
            'y': this[_0x14e4b0('0x21')]['y'] + _0x353674['y'],
            'z': this['position']['z'] + _0x353674['z']
        };
    } [_0x1aebf2('0x1e')]() {
        const _0x39ad13 = _0x1aebf2,
            _0x1bda95 = this[_0x39ad13('0x26')](),
            _0x526e16 = 0x2 * (_0x1bda95['x'] * _0x1bda95['z'] + _0x1bda95['w'] * _0x1bda95['y']),
            _0x143054 = 0x2 * (_0x1bda95['y'] * _0x1bda95['z'] - _0x1bda95['w'] * _0x1bda95['x']),
            _0x1e3453 = 0x1 - 0x2 * (_0x1bda95['x'] * _0x1bda95['x'] + _0x1bda95['y'] * _0x1bda95['y']);
        return {
            'x': _0x526e16,
            'y': _0x143054,
            'z': _0x1e3453
        };
    } ['Up'](_0x28b016) {
        const _0x16ac28 = _0x1aebf2,
            _0x42e9ad = this['UpVector']();
        return {
            'x': this[_0x16ac28('0x21')]['x'] + _0x42e9ad['x'] * _0x28b016,
            'y': this[_0x16ac28('0x21')]['y'] + _0x42e9ad['y'] * _0x28b016,
            'z': this[_0x16ac28('0x21')]['z'] + _0x42e9ad['z'] * _0x28b016
        };
    }
}
let powerState = 0x1,
    popup = ![];
mp[_0x1aebf2('0x4d')][_0x1aebf2('0x14')]({
    'render': () => {
        const _0x3306b9 = _0x1aebf2;
        if (isGameActive()) {
            const _0xdd3a68 = getBall();
            if (typeof _0xdd3a68 != _0x3306b9('0x42') && mp[_0x3306b9('0x3c')][_0x3306b9('0x24')](_0xdd3a68)) {
                const _0x82831b = _0xdd3a68[_0x3306b9('0x33')](!![]);
                if (typeof _0x82831b == 'object' && typeof _0x82831b['x'] == 'number') {
                    mp.game.graphics.drawText(`~o~Футбол:~n~ ~y~[ПРОБЕЛ] ~w~ Сила удара: ${powerState}`, [0.24, 0.8], { font: 0, color: [255, 255, 255, 255], scale: [0.3, 0.3], outline: true });
                    mp.game.graphics.drawText(`~y~[L.ALT] ~w~ Навес: ${popup ? '~g~Да' : '~r~Нет'}~n~~y~[L.CTRL] ~w~ Остановить мяч`, [0.24, 0.84], { font: 0, color: [255, 255, 255, 255], scale: [0.3, 0.3], outline: true });
                    if (mp[_0x3306b9('0x51')][_0x3306b9('0x1a')][_0x3306b9('0x0')](0x0, 0x18) && mp[_0x3306b9('0x51')][_0x3306b9('0x3f')][_0x3306b9('0x29')](_0x82831b['x'], _0x82831b['y'], _0x82831b['z'], mp[_0x3306b9('0x19')][_0x3306b9('0xe')]['position']['x'], mp[_0x3306b9('0x19')][_0x3306b9('0xe')][_0x3306b9('0x21')]['y'], mp[_0x3306b9('0x19')][_0x3306b9('0xe')][_0x3306b9('0x21')]['z'], !![]) < 0x2) {
                        let _0xbb17b3 = 0x3,
                            _0x29b692 = 0x0;
                        switch (powerState) {
                            case 0x1: {
                                _0xbb17b3 = 0x5;
                                if (popup) _0x29b692 = 0.1;
                                break;
                            }
                            case 0x2: {
                                _0xbb17b3 = 0x8;
                                if (popup) _0x29b692 = 0.15;
                                break;
                            }
                            case 0x3: {
                                _0xbb17b3 = 0xa;
                                if (popup) _0x29b692 = 0.2;
                                break;
                            }
                            case 0x4: {
                                _0xbb17b3 = 0xf;
                                if (popup) _0x29b692 = 0.2;
                                break;
                            }
                            case 0x5: {
                                _0xbb17b3 = 0x19;
                                if (popup) _0x29b692 = 0.4;
                                break;
                            }
                        }
                        const _0x2ec652 = new DirectionVector(_0x82831b, mp[_0x3306b9('0x19')][_0x3306b9('0xe')]['getRotation'](0x2)),
                            _0x2dfa7d = _0x2ec652[_0x3306b9('0x27')](_0xbb17b3);
                        mp[_0x3306b9('0x4d')][_0x3306b9('0x15')](_0x3306b9('0x34')), playAnimation('missheistdockssetup1ig_13@kick_idle', _0x3306b9('0x8'), 0x258), setTimeout(() => {
                            const _0x3f5969 = _0x3306b9;
                            _0xdd3a68['setVelocity'](_0x2dfa7d['x'], _0x2dfa7d['y'], popup ? _0x29b692 + _0xbb17b3 / 1.5 : 0x0), mp[_0x3f5969('0x4d')][_0x3f5969('0x15')](_0x3f5969('0x40'), JSON[_0x3f5969('0x13')](_0x82831b), JSON[_0x3f5969('0x13')]({
                                ..._0x2dfa7d,
                                'z': popup ? _0x29b692 + _0xbb17b3 / 1.5 : 0x0
                            }));
                        }, 0xc8);
                    }
                    mp[_0x3306b9('0x51')][_0x3306b9('0x1a')][_0x3306b9('0x31')](0x0, 0x3c, !![]), mp[_0x3306b9('0x51')][_0x3306b9('0x1a')][_0x3306b9('0x0')](0x0, 0x3c) && mp[_0x3306b9('0x51')]['gameplay']['getDistanceBetweenCoords'](_0x82831b['x'], _0x82831b['y'], _0x82831b['z'], mp[_0x3306b9('0x19')][_0x3306b9('0xe')][_0x3306b9('0x21')]['x'], mp['players'][_0x3306b9('0xe')][_0x3306b9('0x21')]['y'], mp[_0x3306b9('0x19')][_0x3306b9('0xe')]['position']['z'], !![]) < 0x2 && _0xdd3a68[_0x3306b9('0xf')](0x0, 0x0, 0x0), mp[_0x3306b9('0x51')][_0x3306b9('0x1a')]['disableControlAction'](0x0, 0x16, !![]), mp[_0x3306b9('0x51')][_0x3306b9('0x1a')][_0x3306b9('0x0')](0x0, 0x16) && (powerState++, powerState >= 0x6 && (powerState = 0x1)), mp[_0x3306b9('0x51')][_0x3306b9('0x1a')][_0x3306b9('0x32')](0x0, 0x13) && (popup = !![]), mp['game']['controls']['isControlJustReleased'](0x0, 0x13) && (popup = ![]);
                }
            }
        }
    }
});
const onSoccerGameChangeActiveStatus = _0x99c587 => {
        setActiveStatus(_0x99c587);
    },
    onSoccerGameChangeControllerStatus = _0x22ea2e => {
        setControllerStatus(_0x22ea2e);
    },
    onSocerGamCreateBall = (_0x57bf09, _0x26a043, _0x6868bb) => {
        createBall(_0x57bf09, _0x26a043, _0x6868bb);
    },
    onSocerGameBallUpdateData = (_0x4cb89e, _0x4bad4b, _0x1aa698) => {
        updateBall(_0x4cb89e, _0x4bad4b, _0x1aa698);
    };
mp[_0x1aebf2('0x4d')][_0x1aebf2('0x14')]({
    'client.soccer.game.change.active.status': _0x4692f3 => onSoccerGameChangeActiveStatus(_0x4692f3),
    'client.soccer.game.change.controller.status': _0x11916f => onSoccerGameChangeControllerStatus(_0x11916f),
    'client.on.soccer.game.create.ball': (_0x4834e1, _0x4ae9a3, _0x52bdda) => onSocerGamCreateBall(JSON['parse'](_0x4834e1), JSON[_0x1aebf2('0x20')](_0x4ae9a3), _0x52bdda),
    'client.on.soccer.game.destroy.ball': () => destroyBall(),
    'client.on.soccer.game.sync.ball': (_0x208da9, _0x17f120, _0x384f44) => onSocerGameBallUpdateData(JSON['parse'](_0x208da9), JSON[_0x1aebf2('0x20')](_0x17f120), JSON[_0x1aebf2('0x20')](_0x384f44))
});
}