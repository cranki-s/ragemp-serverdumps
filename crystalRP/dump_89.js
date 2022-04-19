{
let Pad = null;
mp.keys.bind(0x28, true, function () { 
    if (Pad != null) {
        mp.events.call("closePad")
        return;
    }
    if (!loggedin || chatActive || localplayer.getVariable("IS_SP_MODE") == true || editing || cuffed || global.menuOpened || localplayer.getVariable('InDeath') == true || global.IsFalling) return;
    mp.events.callRemote("openPad", false)
});
mp.keys.bind(Keys.VK_ESCAPE, false, function() {
    if (Pad != null)
        mp.game.ui.setPauseMenuActive(false);
});
mp.events.add("OpenPad", (businessesInfo, houseInfo, name, taxi) => {
    Pad = mp.browsers.new('package://cef/System/Tab/index.html');
    Pad.execute(`tabs.open(${businessesInfo}, ${houseInfo}, '${name}', ${taxi})`);
    mp.gui.cursor.visible = true;
});
mp.events.add("closePad", () => {
    if (Pad != null) {
        Pad.destroy()
        mp.gui.cursor.visible = false;
        Pad = null;
        mp.events.callRemote("offTablet");
    }
})
mp.events.add("changeStateRang", (rang, name, index) => {
    mp.events.callRemote("changeStateRang:Server", rang, name, index)
})
mp.events.add("Roomate", (action, name) => {
    mp.events.callRemote("Roomate:Server", action, name)
})
mp.events.add("sellHouse", (action, player, money) => {
    mp.events.callRemote("sellHouse:Server", action, player, money)
    mp.events.call("closePad")
})
mp.events.add("sellBiz", (action, player, money) => {
    mp.events.callRemote("sellBiz:Server", action, player, money)
    mp.events.call("closePad")
})
mp.events.add("changeFracPlayer", (name, action) => {
    mp.events.callRemote("changeFracPlayer:Server", name, action);
});
mp.events.add("changeFractionVehicle", (number, type) => {
    mp.events.callRemote("changeFractionVehicle:Server", number, type);
});
mp.events.add("MoneyFraction", (type, money) => {
    mp.events.callRemote("MoneyFraction:Server", type, money);
});
mp.events.add("setLockStatusHouse", (status) => {
    mp.events.callRemote("setLockStatusHouse:Server", status);
});
mp.events.add("takeCallTaxi", (index) => {
    mp.events.callRemote("takeCallTaxi:Server", index);
    mp.events.call("closePad")
})
mp.events.add("accpetNacenka", (nacenka) => {
    mp.events.callRemote("accpetNacenka:Server", nacenka);
})
mp.events.add("takeMoneyBusiness", (money) => {
    mp.events.callRemote("takeMoneyBusiness:Server", money);
})
// Update
mp.events.add("sendFractionInfo", (fraction, fraclist, range) => {
    if (Pad != null)
        Pad.execute(`tabs.sendFractionInfo(${fraction},${fraclist},${range})`);
})
mp.events.add("sendTaxiInfo", (taxi) => {
    if (Pad != null)
        Pad.execute(`tabs.taxi=${taxi}`);
});
mp.events.add("sendHouseInfo", (houseinfo) => {
    if (Pad != null)
        Pad.execute(`tabs.houseInfo=${houseinfo}`);
});
mp.events.add("sendBusinessInfo", (bizinfo) =>{
    if (Pad != null)
        Pad.execute(`tabs.businessesInfo=${bizinfo}`);
})
}