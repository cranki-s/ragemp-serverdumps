{
let tablet = null;
mp.keys.bind(Keys.VK_F5, false, function () { // F5 key	
    if (tablet == null) {
        if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || cuffed || localplayer.getVariable('InDeath') == true || global.menuOpened) return;
        mp.events.callRemote("openTabletMenu");
        return;
    }
    mp.events.call('CloseTabletMenu');
});
mp.keys.bind(Keys.VK_ESCAPE, false, function() {
    if (tablet != null) {
        mp.game.ui.setPauseMenuActive(false);
        mp.events.call('CloseTabletMenu');
    }
});
mp.events.add('showHUDTablet', (show) => {
    global.showhud = show;
    mp.gui.execute(`HUD.show=${show};`);
    mp.events.call("showHUD", show)
});
mp.events.add("OpenTabletMenu", (data, achiev) => {
    if (tablet == null) {
        tablet = mp.browsers.new('package://cef/System/Tablet/index.html');   
        mp.gui.cursor.visible = true;
        tablet.execute(`Tablet.open(${data},${achiev},${global.showhud},'${global.binderKeyCef[0]}','${global.binderKeyCef[1]}','${global.binderKeyCef[2]}', '${global.binderKeyCef[3]}', '${global.binderKeyCef[4]}', '${global.binderKeyCef[5]}', '${global.binderKeyCef[6]}', '${global.binderKeyCef[7]}', '${global.binderKeyCef[8]}')`);
    }
});
mp.events.add("openCases", () => {
    if (tablet != null) {
        mp.events.call("CloseTabletMenu");
        mp.events.call("openRoulette");
    }
});
mp.events.add("openFractionPad", () => {
    if (tablet != null) {
        mp.events.call("CloseTabletMenu");
        mp.events.callRemote("openPad");
    }
})
mp.events.add("BuyCar", (car) => {
    mp.events.callRemote("BuyDonateCar", car)
    mp.events.call("CloseTabletMenu");
})
mp.events.add("ChangeName", (name) => {
    if (tablet != null) {
        mp.events.callRemote("changeName", name.toString())
        mp.events.call("CloseTabletMenu");
    }
})
mp.events.add("BuyVipStatus", (vipstatusname) => {
    if (tablet != null) {
        mp.events.callRemote("buyVipStatus", vipstatusname)
        mp.events.call("CloseTabletMenu");
    }
})
mp.events.add("BuySweets", (sweetcount) => {
    if (tablet != null) {
        mp.events.callRemote("buySweets", sweetcount);
        mp.events.call("CloseTabletMenu");
    }
})
mp.events.add("SendNavigator", (type) => {
    if (tablet != null) {
        mp.events.callRemote("sendNavigator", type);
        mp.events.call("CloseTabletMenu");
    }
})
mp.events.add("BuyCases", (casetype) => {
    if (tablet != null) {
        mp.events.callRemote("buyCases", casetype);
        mp.events.call("CloseTabletMenu");
    }
})
mp.events.add("TransferMoney", (coins, type) => {
    if (tablet != null) {
        mp.events.callRemote("transferMoney", coins, type);
        mp.events.call("CloseTabletMenu");
    }
})
mp.events.add("ChangePlayerSettings", (data) => {
    if (tablet != null)
    switch (data) {
        case "UnWarn":
            mp.events.callRemote("changePlayerSettings", "unWarn");
            break;
        case "ChangeAppearance":
            mp.events.callRemote("changePlayerSettings", "changeAppearance");
            break;
        case "PacketLicenses":
            mp.events.callRemote("changePlayerSettings", "packetLicenses");
            break;
    }
    mp.events.call("CloseTabletMenu");
})
mp.events.add("CloseTabletMenu", () => {
    if (tablet != null) {
        tablet.destroy()
        tablet = null;
        mp.gui.cursor.visible = false;
    }
});
}