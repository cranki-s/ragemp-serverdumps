{
let StockEms = null
mp.events.add('OpenStock_EMS', () => {
    if (StockEms == null) {
        StockEms = mp.browsers.new("http://package/browser/modules/Fractions/EMS/Craft/index.html")
		global.menuOpen();
		StockEms.active = true;
    } else if (StockEms.active == false){
		global.menuOpen();
		StockEms.active = true
    }
});

mp.events.add('exitcraftems', () => {
    StockEms.active = false
    mp.gui.cursor.show(false, false)
	StockEms.execute('StockEms.style=0');
	StockEms = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('client::craftems', (id) => {
	mp.events.callRemote("SetStockBuyEms", id);
});

let StockGov = null
mp.events.add('OpenStock_GOV', () => {
    if (StockGov == null) {
        StockGov = mp.browsers.new("http://package/browser/modules/Fractions/GOV/Craft/index.html")
		global.menuOpen();
		StockGov.active = true;
    } else if (StockGov.active == false){
		global.menuOpen();
		StockGov.active = true
    }
});

mp.events.add('exitcraftgov', () => {
    StockGov.active = false
    mp.gui.cursor.show(false, false)
	StockGov.execute('StockGov.style=0');
	StockGov = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('client::craftgov', (id) => {
	mp.events.callRemote("TakeGovGunStock", id);
});
let StockLSPD = null
mp.events.add('OpenStock_LSPD', () => {
    if (StockLSPD == null) {
        StockLSPD = mp.browsers.new("http://package/browser/modules/Fractions/LSPD/Craft/index.html")
		global.menuOpen();
		StockLSPD.active = true;
    } else if (StockLSPD.active == false){
		global.menuOpen();
		StockLSPD.active = true
    }
});

mp.events.add('exitcraftlspd', () => {
    StockLSPD.active = false
    mp.gui.cursor.show(false, false)
	StockLSPD.execute('StockLSPD.style=0');
	StockLSPD = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('client::craftlspd', (id) => {
	mp.events.callRemote("TakeLSPDGunStock", id);
});

let StockFIB = null
mp.events.add('OpenStock_FIB', () => {
    if (StockFIB == null) {
        StockFIB = mp.browsers.new("http://package/browser/modules/Fractions/FIB/Craft/index.html")
		global.menuOpen();
		StockFIB.active = true;
    } else if (StockFIB.active == false){
		global.menuOpen();
		StockFIB.active = true
    }
});

mp.events.add('exitcraftfib', () => {
    StockFIB.active = false
    mp.gui.cursor.show(false, false)
	StockFIB.execute('StockFIB.style=0');
	StockFIB = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('client::craftfib', (id) => {
	mp.events.callRemote("FIBGunBuy", id);
});

let StockSANG = null
mp.events.add('OpenStock_SANG', () => {
    if (StockSANG == null) {
        StockSANG = mp.browsers.new("http://package/browser/modules/Fractions/SANG/Craft/index.html")
		global.menuOpen();
		StockSANG.active = true;
    } else if (StockSANG.active == false){
		global.menuOpen();
		StockSANG.active = true
    }
});

mp.events.add('exitcraftsang', () => {
    StockSANG.active = false
    mp.gui.cursor.show(false, false)
	StockSANG.execute('StockFIB.style=0');
	StockSANG = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('client::craftsang', (id) => {
	mp.events.callRemote("SANGGunBuy", id);
});

let StockLSSD = null
mp.events.add('OpenStock_LSSD', () => {
    if (StockLSSD == null) {
        StockLSSD = mp.browsers.new("http://package/browser/modules/Fractions/LSSD/Craft/index.html")
		global.menuOpen();
		StockLSSD.active = true;
    } else if (StockLSSD.active == false){
		global.menuOpen();
		StockLSSD.active = true
    }
});

mp.events.add('exitcraftlssd', () => {
    StockLSSD.active = false
    mp.gui.cursor.show(false, false)
	StockLSSD.execute('StockLSSD.style=0');
	StockLSSD = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('client::craftlssd', (id) => {
	mp.events.callRemote("TakeLSSDGunStock", id);
});


let StockGang = null
mp.events.add('OpenStock_GANG', () => {
    if (StockGang == null) {
        StockGang = mp.browsers.new("http://package/browser/modules/Fractions/GANG/Craft/index.html")
		global.menuOpen();
		StockGang.active = true;
    } else if (StockGang.active == false){
		global.menuOpen();
		StockGang.active = true
    }
});

mp.events.add('exitcraftgang', () => {
    StockGang.active = false
    mp.gui.cursor.show(false, false)
	StockGang.execute('StockGang.style=0');
	StockGang = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('client::craftGANG', (id) => {
	mp.events.callRemote("GangBuyGuns", id);
});


let StockMafia = null
mp.events.add('OpenStock_MAFIA', () => {
    if (StockMafia == null) {
        StockMafia = mp.browsers.new("http://package/browser/modules/Fractions/Mafia/Craft/index.html")
		global.menuOpen();
		StockMafia.active = true;
    } else if (StockMafia.active == false){
		global.menuOpen();
		StockMafia.active = true
    }
});

mp.events.add('exitcraftmafia', () => {
    StockMafia.active = false
    mp.gui.cursor.show(false, false)
	StockMafia.execute('StockMafia.style=0');
	StockMafia = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('client::craftMAFIA', (id) => {
	mp.events.callRemote("MafiaBuyGuns", id);
});
}