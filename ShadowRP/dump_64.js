{
﻿let phone;
var phoneWindow = null;
var phoneOppened = false;
mp.events.add('initPhone', () => {
    phone = mp.browsers.new('http://package/browser/phone.html');
});
// // //
mp.events.add('phoneShow', () => {
    phone.execute('show();');
    mp.gui.cursor.visible = true;
});
mp.events.add('phoneHide', () => {
    phone.execute('hide();');
    mp.gui.cursor.visible = false;
});
mp.events.add('phoneOpen', (data) => {
    global.phoneOpen = 1;
    var json = JSON.parse(data);
    // // //
    var id = json[0];
    var canHome = json[3];
    var canBack = json[2];
    var items = JSON.stringify(json[1]);
    // // //
    var exec = "open('" + id + "'," + canHome + "," + canBack + ",'"  + items + "');";
    //mp.gui.chat.push(exec);
    phone.execute(exec);
});
mp.events.add('phoneChange', (ind, data) => {
    var exec = "change(" + ind + ",'" + data + "');";
    //mp.gui.chat.push(exec);
    phone.execute(exec);
});
mp.events.add('phoneClose', () => {
    if(phone != null) phone.execute('reset();');
    global.phoneOpen = 0;
});
// // //
mp.events.add('phoneCallback', (itemid, event, data) => {
    mp.events.callRemote('Phone', 'callback', itemid, event, data);
    //mp.gui.chat.push("CallBack: "+itemid+":"+event+":"+data);
});
mp.events.add('phoneNavigation', (btn) => {
    mp.events.callRemote('Phone', 'navigation', btn);
    //mp.gui.chat.push("Navigation: " + btn);
});
// // //
/*mp.events.add("playerQuit", (player, exitType, reason) => {
    if (phone !== null) {
        if (player.name === localplayer.name) {
            phone.destroy();
            phone = null;
            phoneOppened = false;
            phoneWindow = null;
        }
    }
});*/
}