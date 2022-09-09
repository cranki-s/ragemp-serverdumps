{
﻿global.atm = mp.browsers.new('http://package/browser/modules/Banks/atm.html');
// ATM //
var atmIndex = 0;
mp.events.add('openatm', () => {
    if (global.menuCheck()) return;
    atm.execute('atm.active=1');
    menuOpen();
});
mp.events.add('closeatm', () => {
    menuClose();
    atm.execute('atm.reset();atm.active=0');
})
mp.events.add('setatm', (num, name, bal, sub) => {
    atm.execute(`atm.set('${num}','${name}','${bal}','${sub}')`);
})
mp.events.add('setbank', (bal) => {
    atm.execute(`atm.balance="${bal}"`);
})
mp.events.add('atmCB', (type, data) => {
    mp.events.callRemote('atmCB', type, data);
})
atmTcheck = 0;
mp.events.add('atmVal', (data) => {
    if (new Date().getTime() - atmTcheck < 1000) {
        mp.events.callRemote('atmDP');
    } else {
        mp.events.callRemote('atmVal', data);
        atmTcheck = new Date().getTime();
    }
})
mp.events.add('atmOpen', (data) => {
    atm.execute(`atm.open(${data})`);
})
mp.events.add('atmOpenBiz', (data1, data2) => {
    atm.execute(`atm.open([3, ${data1}, ${data2}])`);
})
mp.events.add('atm', (index, data) => {
    if (index == 4) {
        ATMTemp = data;
        atm.execute('atm.change(44)');
    }
    else if (index == 44) {
        mp.events.callRemote('atm', 4, data, ATMTemp);
        atm.execute('atm.reset()');
        return;
    }
    else if (index == 33) {
        mp.events.callRemote('atm', 3, data, ATMTemp);
    }
    else {
        mp.events.callRemote('atm', index, data);
        atm.execute('atm.reset()');
    }
})
let ATMTemp = "";
}