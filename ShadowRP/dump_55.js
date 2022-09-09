{
﻿let pad;
var padWindow = null;
var padOppened = false;
global.PadOpened = false;
mp.events.add('initpad', () => {
pad = null;
});
// // //

mp.keys.bind(Keys.VK_F2, false, function () { // E key
if (!global.loggedin || global.chatActive || editing || global.menuCheck() || cuffed || global.localplayer.getVariable('InDeath') == true) return;
mp.events.callRemote('padShow', '4');
});

mp.events.add('padShow', (data,type) => {
    if (pad == null) {
        pad = mp.browsers.new('http://package/browser/modules/Pad/pad.html');
    }

    var json = JSON.parse(data);
  //  mp.gui.chat.push(data);
    if(type=="2")
    {
        pad.execute(`pad.menuid='${type}'`);
        pad.execute(`pad.data.vlad='${json['vlad']}'`);
        pad.execute(`pad.data.biz_name='${json['biz_name']}'`);
        pad.execute(`pad.data.stock='${json['stock']}'`);
        pad.execute(`pad.data.max_stock='${json['max_stock']}'`);
        pad.execute(`pad.data.balance='${json['balance']}'`);
        pad.execute(`pad.data.arenda='${json['arenda']}'`);
        pad.execute(`pad.data.without_product='${json['without_product']}'`);
        pad.execute(`pad.data.mafia='${json['mafia']}'`);
        pad.execute(`pad.data.order='${json['order']}'`);
        pad.execute(`pad.data.sum_arenda='${json['sum_arenda']}'`);
        pad.execute(`pad.data.procent='${json['procent']}'`);
        pad.execute(`pad.data.price='${json['price']}'`);
        pad.execute(`pad.data.name='${json['name']}'`);
        pad.execute(`pad.data.type='${json['Type']}'`);
        pad.execute(`pad.data.buyMat='${json['BuyMat']}'`);
        pad.execute(`pad.submenuid=1`);
    }
    else if(type== "1")
    {

        pad.execute(`pad.data.man=JSON.parse('${json['man']}')`);
        pad.execute(`pad.data.vehc=JSON.parse('${json['vehc']}')`);
        pad.execute(`pad.data.balance='${json['sum']}'`);
        pad.execute(`pad.data.name='${json['name']}'`);
        pad.execute(`pad.menuid='${type}'`);
        
       // mp.gui.chat.push(json['range']);
        pad.execute(`pad.data.range=JSON.parse('${json['range']}')`);
    }
    else if(type== "3")
    {
 
        pad.execute(`pad.data.name='${json['name']}'`);
        pad.execute(`pad.data.vlad='${json['vlad']}'`);
        pad.execute(`pad.data.number='${json['number']}'`);
        pad.execute(`pad.data.class='${json['class']}'`);
        pad.execute(`pad.data.type='${json['type']}'`);
        pad.execute(`pad.data.roommates='${json['roommates']}'`);
        pad.execute(`pad.data.arenda='${json['arenda']}'`);
        pad.execute(`pad.data.shkaf='${json['shkaf']}'`);
        pad.execute(`pad.data.heal='${json['heal']}'`);
        pad.execute(`pad.data.craft='${json['craft']}'`);
        pad.execute(`pad.data.carplaces='${json['carplaces']}'`);
        pad.execute(`pad.data.garage1='${json['garage1']}'`);
        pad.execute(`pad.data.garage2='${json['garage2']}'`);
        pad.execute(`pad.menuid='${type}'`);
       // mp.gui.chat.push(json['range']);
    }
    else if(type== "4")
    {

        pad.execute(`pad.data.frac='${json['frac']}'`);
        pad.execute(`pad.data.biz='${json['biz']}'`);
        pad.execute(`pad.data.house='${json['house']}'`);
        pad.execute(`pad.menuid='${type}'`);
       // mp.gui.chat.push(json['range']);
    }
    pad.execute("pad.showPad();");
    mp.gui.cursor.visible = true;
    global.PadOpened = true;
    //global.menuOpened =true;


});
mp.events.add('closePad', () => {
    pad.execute('pad.hide();');
    global.menuOpened =false;
    global.PadOpened = false;
    mp.gui.cursor.visible = false;
});
mp.events.add('sendPad', (action,id) => {
   // mp.gui.chat.push(action +" - "+ id);
    mp.events.callRemote('actionPad',action,id);
});

mp.events.add('changePad', (type) => {
   // mp.gui.chat.push(action +" - "+ id);
    mp.events.callRemote('padShow',type);
});

mp.events.add('sendPadTwo', (action,id,str) => {
    mp.events.callRemote('actionPadBuy',action,id,str);
});


mp.events.add('padOpen', (data) => {
    if (pad == null) {
        pad = mp.browsers.new('http://package/browser/modules/Pad/pad.html');
    }
    var json = JSON.parse(data);
    // // //
    var id = json[0];
    var canHome = json[3];
    var canBack = json[2];
    console.log(json[1]);

    var items = JSON.stringify(json[1]);
    console.log(items);
    
    // // //
    var exec = "openPad('" + id + "'," + canHome + "," + canBack + ",'"  + items + "');";
    //mp.gui.chat.push(exec);
    pad.execute(exec);
});
mp.events.add('padChange', (ind, data) => {
    var exec = "change(" + ind + ",'" + data + "');";
    //mp.gui.chat.push(exec);
    pad.execute(exec);
});
mp.events.add('padClose', () => {
    if(pad != null) pad.execute('reset();');
});
// // //
mp.events.add('padCallback', (itemid, event, data) => {

    mp.events.callRemote('pad', 'callback', itemid, event, data);
    //mp.gui.chat.push(itemid+":"+event+":"+data);
});
mp.events.add('padNavigation', (btn) => {
    mp.events.callRemote('pad', 'navigation', btn);
});
// // //
/*mp.events.add("playerQuit", (player, exitType, reason) => {
    if (pad !== null) {
        if (player.name === localplayer.name) {
            pad.destroy();
            pad = null;
            padOppened = false;
            padWindow = null;
        }
    }
});*/
}