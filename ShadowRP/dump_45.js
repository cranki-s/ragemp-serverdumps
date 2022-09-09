{
﻿// HOUSE //
global.house = mp.browsers.new('http://package/browser/modules/HouseInfo/index.html');
// global.jobs = mp.browsers.new('http://package/browser/jobs.html');

mp.events.add('HouseMenu', (id, Owner, Type, Locked, Price, Garage, Roommates, housetype) => {
	if (global.menuCheck()) return;
    menuOpen2();
	house.execute(`hm.set('${id}','${Owner.replace('_',' ')}','${Type}','${Locked}','${Price}','${Garage}','${Roommates}','${housetype}')`);
	house.execute('hm.active=1');
house.execute(`hm.adress='${mp.game.ui.getStreetNameFromHashKey(mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0).streetName)}'`);
});

mp.events.add('HouseMenu1', (id, Owner, Type, Locked, Price, Garage, Roommates, housetype) => {
	if (global.menuCheck()) return;
    menuOpen2();
	house.execute(`hm2.set('${id}','${Owner.replace('_',' ')}','${Type}','${Locked}','${Price}','${Garage}','${Roommates}','${housetype}')`);
	house.execute('hm2.active=1');
house.execute(`hm2.adress='${mp.game.ui.getStreetNameFromHashKey(mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0).streetName)}'`);
});

mp.events.add('HouseMenuBuy', (id, Owner, Type, Locked, Price, Garage, Roommates, housetype) => {
	if (global.menuCheck()) return;
    menuOpen2();
	house.execute(`hmBuy.set('${id}','${Owner.replace('_',' ')}','${Type}','${Locked}','${Price}','${Garage}','${Roommates}','${housetype}')`);
	house.execute('hmBuy.active=1');
house.execute(`hmBuy.adress='${mp.game.ui.getStreetNameFromHashKey(mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0).streetName)}'`);
});

mp.events.add("GoHouseMenu", (id) => {
    mp.events.callRemote("GoHouseMenuS", id);
	house.execute('hm.active=0');
	global.menuClose2();
    mp.gui.cursor.visible = false;
});

mp.events.add("GoHouseMenu1", (id) => {
    mp.events.callRemote("GoHouseMenuS", id);
	house.execute('hm2.active=0');
	global.menuClose2();
    mp.gui.cursor.visible = false;
});

mp.events.add('CloseHouseMenu', () => {
	house.execute('hm.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});
mp.events.add('CloseHouseMenu1', () => {
	house.execute('hm2.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});
mp.events.add('CloseHouseMenuBuy', () => {
	house.execute('hmBuy.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});

mp.events.add("buyHouseMenu", (id) => {
    mp.events.callRemote("buyHouseMenuS", id);
	house.execute('hmBuy.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});

mp.events.add("WarnHouse", (id) => {
    mp.events.callRemote("WarnHouseS", id);
});
mp.events.add("CarHouse", (id) => {
    mp.events.callRemote("CarHouseS", id);
});
mp.events.add("LockedHouse", (id) => {
    mp.events.callRemote("LockedHouseS", id);
});


mp.events.add("SellHome", (id) => {
mp.events.callRemote("SellHomeS", id);
	house.execute('hm.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});

mp.events.add("Interior", (id) => {
    mp.events.callRemote("GoHouseInterS", id);
	house.execute('hmBuy.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});
mp.events.add("Garage", (id) => {
    mp.events.callRemote("GoGarageS", id);
	house.execute('hmExit.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});

mp.events.add("ExitHouseMenu", () => {
	if (global.menuCheck()) return;
    menuOpen2();
	house.execute('hmExit.active=1');
});

mp.events.add("exitHouse", () => {
	mp.events.callRemote("ExitHouseMenuE");
	house.execute('hmExit.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});

mp.events.add("CloseExitHouseMenu", () => {
	house.execute('hmExit.active=0');
    mp.gui.cursor.visible = false;
	global.menuClose2();
});



}