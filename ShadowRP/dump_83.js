{
global.changeNumberCEF = null;

mp.events.add("changeNumber", (number, type, wallet) => {
    if(new Date().getTime() - global.lastCheck < 100) return; 
	global.lastCheck = new Date().getTime();

	mp.events.callRemote("changeNumber", `${number}`, type, wallet);
});

mp.events.add("openChangeNumber", () => {
    if (global.menuCheck()) return;

    if (global.changeNumberCEF == null)
    {
        global.changeNumberCEF = mp.browsers["new"]('package://browser/modules/NumberChanger/index.html');
        global.changeNumberCEF.active = true;
    }
    global.menuOpen();
});
mp.events.add("closeChangeNumber", () => {
    if(global.changeNumberCEF != null) {
		global.changeNumberCEF.destroy();
		global.changeNumberCEF = null;
	}
    global.menuClose();
});
mp.events.add("MinusMoneyForRandom", () => {
    mp.events.callRemote("MinusMoneyForRandom");
});

mp.events.add("VEHICLE::FREEZE", (vehicle, state) => {
    vehicle.freezePosition(state);
});
}