{
var homeCreate_browser = null;
var homeMenu_browser = null;

var tempHouseCreateData = {'interior':1,'cost':1000000,'park':1};
var housesInStream = {};
var myHousesBlips = [];

var tempHouseData = null;
var markerNoReaktOnTeleport = false;

var sellToHouseID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
var sellFromHouseID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;

var houseActAction = false;

function homeCreate() {
	if(!homeCreate_browser) {
		allowBinds = [];
		homeCreate_browser = mp.browsers.new("package://CEF/createHouse/index.html");
		let myPos = localPlayer.position;
		homeCreate_browser.execute("installHomePos("+roundNumber(parseFloat(myPos.x), 4)+", "+roundNumber(parseFloat(myPos.y), 4)+", "+roundNumber(parseFloat(myPos.z), 4)+");");
		setTimeout(function() {
			allowBinds = [];
			homeCreate_browser.execute("tempHouseData("+tempHouseCreateData.interior+", "+tempHouseCreateData.cost+", "+tempHouseCreateData.park+");");
			mp.gui.cursor.visible = true;
		}, 100);
	}
}

/*
mp.keys.bind(0x49, true, function() { // I Key
	homeCreate();
});
*/

function createHouseDismiss() {
	if (homeCreate_browser) {
		homeCreate_browser.destroy();
		homeCreate_browser = null;
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("createHouseDismiss", createHouseDismiss);

function createHouseAccepted(data) {
	if (homeCreate_browser) {
		homeCreate_browser.destroy();
		homeCreate_browser = null;
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
	mp.events.callRemote('createHouse', data);
}
mp.events.add("createHouseAccepted", createHouseAccepted);

function createFlat(selectedIntID, flatParks, resCost) {
	if(homeMenu_browser) {
		if(typeof(selectedIntID) !== "undefined" && typeof(flatParks) !== "undefined" && typeof(resCost) !== "undefined") {
			if(!tempHouseData) return homeMenu_browser.execute("msg_error('Ошибка инициализации');unlockFlatCreate();");
			houseActAction = true;
			mp.events.callRemote('createFlat', JSON.stringify(tempHouseData), selectedIntID, flatParks, resCost);
		}
	}
}
mp.events.add("createFlat", createFlat);

function flatCreated(cost, park, flatData) {
	if (cost && park && flatData) {
		if(homeMenu_browser) {
			homeMenu_browser.destroy();
			homeMenu_browser = null;
			mp.gui.cursor.visible = false;
			markerNoReaktOnTeleport = false;
			restoreBinds();
		}
		cost = parseInt(cost);
		park = parseInt(park);
		if(localPlayer.getVariable('player.id')) {
			let costText = cost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~квартира создана", "~s~Преобретено за"+costText+" руб., добавлено "+park+" парк. мест", 5, false, true, 6500);
			flatData = JSON.parse(flatData);
			if(typeof(flatData.flat) !== "undefined") {
				if(typeof(flatData.flat.name) !== "undefined") {
					mp.game.ui.notifications.showWithPicture(flatData.flat.name, "Добро пожаловать", flatData.flat.desc, "CHAR_BRYONY", 1, false, 1, 2);
					mp.game.ui.notifications.showWithPicture("Успешная сделка", costText+" руб.", "В паркинге за Вами закреплено "+park+" мест", "CHAR_BRYONY", 1, false, 1, 2);
				}
			}
		}
		houseActAction = false;
	}
}
mp.events.add("flatCreated", flatCreated);

function flatCreateError(reason) {
	if (homeMenu_browser && reason) {
		if(localPlayer.getVariable('player.id')) {
			homeMenu_browser.execute("msg_error('"+reason+"');unlockFlatCreate();");
		}else{
			homeMenu_browser.destroy();
			homeMenu_browser = null;
			mp.gui.cursor.visible = false;
			markerNoReaktOnTeleport = false;
			restoreBinds();
		}
		houseActAction = false;
	}
}
mp.events.add("flatCreateError", flatCreateError);

function enterToHome() {
	if (homeMenu_browser) {
		if(hud_browser) hud_browser.execute("hiddenAction('Переносим персонажа из мира в интерьер..');");
		localPlayer.freezePosition(true);
		
		if(tempHouseData) {
			if(typeof(tempHouseData.interior) !== "undefined") {
				if(typeof(ints[parseInt(tempHouseData.interior)]) !== "undefined") {
					let interior = ints[parseInt(tempHouseData.interior)];
					if(typeof(interior.ipl) !== "undefined") mp.game.streaming.requestIpl(interior.ipl.toString());
					if(typeof(interior.x) !== "undefined" && typeof(interior.y) !== "undefined" && typeof(interior.z) !== "undefined") {
						interior.x = parseInt(interior.x);
						interior.y = parseInt(interior.y);
						interior.z = parseInt(interior.z);
						localPlayer.position = new mp.Vector3(interior.x, interior.y, interior.z);
					}
				}
			}
			
			if(typeof(tempHouseData.name) !== "undefined" && typeof(tempHouseData.pos.x) !== "undefined") {
				tempHouseData.pos = [tempHouseData.pos.x, tempHouseData.pos.y, tempHouseData.pos.z];
			}
			
			if(typeof(tempHouseData.flatID) !== "undefined") tempHouseData.id = tempHouseData.flatID;
			
			mp.events.call("sleepAntiCheat");
			mp.events.callRemote('enterToHome', JSON.stringify(tempHouseData));
		}
		
		setTimeout(() => { 
			if(hud_browser) hud_browser.execute("hiddenAction();");
			localPlayer.freezePosition(false);
		}, 5000);

		markerNoReaktOnTeleport = true;
		homeMenu_browser.destroy();
		homeMenu_browser = null;
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("enterToHome", enterToHome);

function enterToHomeGarage() {
	if (homeMenu_browser) {
		if(hud_browser) hud_browser.execute("hiddenAction('Переносим персонажа из мира в гараж..');");
		localPlayer.freezePosition(true);
		if(tempHouseData) {
			mp.events.call("sleepAntiCheat");
			
			if(typeof(tempHouseData.name) !== "undefined" && typeof(tempHouseData.pos.x) !== "undefined") {
				tempHouseData.pos = [tempHouseData.pos.x, tempHouseData.pos.y, tempHouseData.pos.z];
			}
			
			if(typeof(tempHouseData.flatID) !== "undefined") tempHouseData.id = tempHouseData.flatID;
			
			mp.events.callRemote('enterToGarage', JSON.stringify(tempHouseData));
		}
		
		setTimeout(() => { 
			if(hud_browser) hud_browser.execute("hiddenAction();");
			localPlayer.freezePosition(false);
		}, 3500);

		markerNoReaktOnTeleport = true;
		homeMenu_browser.destroy();
		homeMenu_browser = null;
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("enterToHomeGarage", enterToHomeGarage);

function setMyIPL(ipl) {
	if(ipl) mp.game.streaming.requestIpl(ipl.toString());
}
mp.events.add("setMyIPL", setMyIPL);

function buyHome() {
	if (homeMenu_browser) {
		if(tempHouseData && localPlayer.getVariable('player.id')) {
			if(typeof(localPlayer.getVariable("player.houses")) === "undefined") return homeMenu_browser.execute("msg_error('Ошибка базы данных, повторите позднее');");
			let housesData = localPlayer.getVariable("player.houses");
			if(typeof(housesData.count) === "undefined") return homeMenu_browser.execute("msg_error('У Вас уже есть 3 дома, продайте другие дома');");
			if(parseInt(housesData.count) >= 3) return homeMenu_browser.execute("msg_error('У Вас уже есть 3 дома, продайте другие дома');");
			markerNoReaktOnTeleport = true;
			
			if(houseActAction) return false;
			houseActAction = true;
			
			if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return homeMenu_browser.execute("msg_error('Ошибка базы данных, повторите позднее');");
			if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return homeMenu_browser.execute("msg_error('У Вас более 50 000 руб. не оплаченных штрафов');");
			
			mp.events.callRemote('buyHome', JSON.stringify(tempHouseData));
			exitHouseMenu();
		}else{
			homeMenu_browser.destroy();
			homeMenu_browser = null;
			mp.gui.cursor.visible = false;
			markerNoReaktOnTeleport = false;
			restoreBinds();
		}
	}
}
mp.events.add("buyHome", buyHome);

function sellHome(hID) {
	if (homeMenu_browser && typeof(hID) !== "undefined") {
		if(tempHouseData && localPlayer.getVariable('player.id')) {
			if(houseActAction) return false;
			markerNoReaktOnTeleport = true;
			houseActAction = true;
			mp.events.callRemote('sellHome', hID, JSON.stringify(tempHouseData));
			exitHouseMenu();
		}else{
			homeMenu_browser.destroy();
			homeMenu_browser = null;
			mp.gui.cursor.visible = false;
			markerNoReaktOnTeleport = false;
			restoreBinds();
		}
	}
}
mp.events.add("sellHome", sellHome);

function houseSold(cost, park) {
	if (cost && park) {
		cost = parseInt(cost);
		park = parseInt(park);
		if(localPlayer.getVariable('player.id')) {
			let sellCost = parseInt(cost) - (parseInt(cost) * 0.10);
			let costText = sellCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~жилое имущество", "~s~Продано за"+costText+" руб., убрано "+park+" парк. мест", 5, false, true, 6500);
		}
		houseActAction = false;
	}
}
mp.events.add("houseSold", houseSold);

function houseBought(cost, park) {
	if (cost && park) {
		cost = parseInt(cost);
		park = parseInt(park);
		if(localPlayer.getVariable('player.id')) {
			let costText = cost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~жилое имущество", "~s~Преобретено за"+costText+" руб., добавлено "+park+" парк. мест", 5, false, true, 6500);
		}
		houseActAction = false;
	}
}
mp.events.add("houseBought", houseBought);

function houseBuyError(reason) {
	if (homeMenu_browser && reason) {
		if(tempHouseData && localPlayer.getVariable('player.id')) {
			homeMenu_browser.execute("msg_error('"+reason+"');");
		}else{
			homeMenu_browser.destroy();
			homeMenu_browser = null;
			mp.gui.cursor.visible = false;
			markerNoReaktOnTeleport = false;
			restoreBinds();
		}
		houseActAction = false;
	}
}
mp.events.add("houseBuyError", houseBuyError);

function exitHouseMenu() {
	if (homeMenu_browser) {
		homeMenu_browser.destroy();
		homeMenu_browser = null;
		mp.gui.cursor.visible = false;
		markerNoReaktOnTeleport = false;
		restoreBinds();
	}
}
mp.events.add("exitHouseMenu", exitHouseMenu);

function getPlayersForSellHouse() {
	if (homeMenu_browser) {
		let tempPlayers = [];
		let myPos = localPlayer.position;
		let counter = 0;
		mp.players.forEachInStreamRange(
			(player, id) => {
				if(player != localPlayer) {
					let plPos = player.position;
					if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true) <= 5) {
						if(!player.vehicle && player.getVariable("player.id") && player.getVariable("player.nick")) {
							tempPlayers.push({"nick":player.getVariable("player.nick").toString(),"id":parseInt(player.getVariable("player.id"))});
							counter++;
						}
					}
				}
			}
		);
		if(counter > 0) homeMenu_browser.execute("initPlayersForSellHouse('"+JSON.stringify(tempPlayers)+"')");
	}
}
mp.events.add("getPlayersForSellHouse", getPlayersForSellHouse);

function startHouseDealTo(hid, nick, id, cost, parks) {
	if(nick && hid && id && cost && parks && homeMenu_browser) {
		sellToHouseID = parseInt(hid);
		sellToNick = nick.toString();
		sellToID = parseInt(id);
		sellToCost = parseInt(cost);
		sellToCost = Math.round(sellToCost);
		
		if(sellToID <= 0) return homeMenu_browser.execute("msg_error('Вы не выбрали игрока');");
		if(sellToCost <= 0) return homeMenu_browser.execute("msg_error('Вы не указали стоимость');");
		if(sellToCost > 100000000) return homeMenu_browser.execute("msg_error('Стоимость не может быть больше 100 000 000 руб.');");
		
		if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return homeMenu_browser.execute("msg_error('Ошибка базы данных, повторите позднее');");
		if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return homeMenu_browser.execute("msg_error('У Вас более 50 000 руб. не оплаченных штрафов');");
		
		houseActAction = true;
		exitHouseMenu();
		mp.events.callRemote('startHouseDealTo', sellToHouseID, sellToNick, sellToID, sellToCost, parks);
	}
}
mp.events.add("startHouseDealTo", startHouseDealTo);

function startHouseDeal(initiator, hid, nick, id, cost, parks) {
	if(nick && hid && id && cost) {
		hid = parseInt(hid);
		nick = nick.toString();
		id = parseInt(id);
		cost = parseInt(cost);
		cost = Math.round(cost);
		parks = parseInt(parks);
		
		if(initiator) {
			sellToHouseID = hid;
			sellToNick = nick;
			sellToID = id;
			sellToCost = cost;
		}else{
			sellFromHouseID = hid;
			sellFromNick = nick;
			sellFromID = id;
			sellFromCost = cost;
		}
		
		houseActAction = true;
		allowBinds = [];
		if(homeMenu_browser) exitHouseMenu();
		homeMenu_browser = mp.browsers.new("package://CEF/houseMenu/index.html");
		setTimeout(function() {
			if(homeMenu_browser) {
				homeMenu_browser.execute("initDealData('"+initiator.toString()+"', '"+hid.toString()+"', '"+nick.toString()+"', '"+id.toString()+"', '"+cost.toString()+"', '"+parks.toString()+"');");
				mp.gui.cursor.visible = true;
			}
		}, 100);
	}
}
mp.events.add("startHouseDeal", startHouseDeal);

function cancelHouseDeal(canceler, noSendToServer) {
	if(homeMenu_browser) {
		exitHouseMenu();
		
		if(canceler) {
			if(sellToHouseID) notyAPI.error("Вы отменили сделку с игроком <b>"+sellToNick+"</b>.", 3000, true);
			else if(sellFromHouseID) notyAPI.error("Вы отклонили сделку с игроком <b>"+sellFromNick+"</b>.", 3000, true);
			sellToHouseID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
			sellFromHouseID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;
		}else{
			if(sellToHouseID) notyAPI.error("<b>"+sellToNick+"</b> отклонил Ваше предложение", 3000, true);
			else if(sellFromHouseID) notyAPI.error("<b>"+sellFromNick+"</b> отменил предложение.", 3000, true);
			sellToHouseID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
			sellFromHouseID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;
		}
		
		if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
			let playerDeal = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
			if(playerDeal && !noSendToServer) mp.events.callRemote('cancelHouseDeal', playerDeal);
		}
		
		houseActAction = false;
	}
}
mp.events.add("cancelHouseDeal", cancelHouseDeal);

function acceptHouseDeal(noSendToServer) {
	if(homeMenu_browser) {
		if(!noSendToServer) {
			if(!localPlayer.getVariable("active.deal")) {
				mp.events.callRemote('cancelHouseDeal');
				homeMenu_browser.execute("msg_error('Игрок не в сети или далеко, сделка отменена');");
				
				sellToHouseID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
				sellFromHouseID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;
				
				return exitHouseMenu();
			}
			if(!localPlayer.getVariable("player.money")) return homeMenu_browser.execute("msg_error('Недостаточно средств для совершения сделки');");
			let myMoney = parseInt(localPlayer.getVariable("player.money"));
			let resCost = roundNumber(parseInt(sellFromCost) + (parseInt(sellFromCost) * 0.05), 0);
			if(myMoney < resCost) return homeMenu_browser.execute("msg_error('Недостаточно средств для совершения сделки');");
			if(typeof(localPlayer.getVariable("player.houses")) === "undefined") return homeMenu_browser.execute("msg_error('Не инициализировано личное имущество, перезайдите');");
			
			if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return homeMenu_browser.execute("msg_error('Ошибка базы данных, повторите позднее');");
			if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return homeMenu_browser.execute("msg_error('У Вас более 50 000 руб. не оплаченных штрафов');");
			
			let housesData = localPlayer.getVariable("player.houses");
			if(typeof(housesData.count) === "undefined") return homeMenu_browser.execute("msg_error('У Вас уже есть 3 дома, продайте другие дома');");
			if(parseInt(housesData.count) >= 3) return homeMenu_browser.execute("msg_error('У Вас уже есть 3 дома, продайте другие дома');");
			
			let findHouse = false;
			mp.colshapes.forEachInStreamRange(
				(shape, id) => {
					if(typeof(shape.getVariable("col.type")) !== "undefined") {
						if(shape.getVariable("col.type") == "house_render") {
							if(typeof(shape.getVariable("col.data")) !== "undefined") {
								let tempData = shape.getVariable("col.data");
								if(tempData.id.toString() == sellFromHouseID.toString()) findHouse = tempData;
							}
						}
					}
				}
			);
			
			if(!findHouse) {
				let findFlat = false;
				if(typeof(housesData.houses) !== "undefined") {
					if(Object.keys(housesData.houses).length > 0) {
						for (var k in housesData.houses) {
							let houseData = housesData.houses[k];
							if(typeof(houseData.id) !== "undefined" && typeof(houseData.params) !== "undefined") {
								if(typeof(houseData.params.flat) !== "undefined") findFlat = houseData;
							}
						}
					}
				}
				if(findFlat) return homeMenu_browser.execute("msg_error('У Вас же есть квартира в "+findFlat.params.flat.name+"');");
			}
			
			let myPos = localPlayer.position;
			
			if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
				let playerDeal = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
				if(playerDeal) {
					if(!playerDeal.position) return homeMenu_browser.execute("msg_error('Вы слишком далеко от места совершения сделки');");
					
					let plPos = playerDeal.position;
					if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true) > 5) return homeMenu_browser.execute("msg_error('Вы слишком далеко от места совершения сделки');");
					
					mp.events.callRemote('acceptHouseDeal', playerDeal, sellFromHouseID, sellFromNick, sellFromID, sellFromCost);
				}else{
					return homeMenu_browser.execute("msg_error('Вы слишком далеко от места совершения сделки');");
				}
			}
		}
		
		houseActAction = true;
		
		if(sellToHouseID) notyAPI.success("<b>"+sellToNick+"</b> принял Ваше предложение.", 3000, true);
		else if(sellFromHouseID) notyAPI.success("Вы приняли предложение от <b>"+sellFromNick+"</b>.", 3000, true);
		
		sellToHouseID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
		sellFromHouseID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;
		
		exitHouseMenu();
	}
}
mp.events.add("acceptHouseDeal", acceptHouseDeal);

function houseDealSuccess(initiator, park, cost) {
	if(park && cost) {
		if(initiator) {
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~жилое имущество", "~s~Вы продали жильё за"+cost.toString().replace(new RegExp(/(\d{1,3})(?=((\d{3})*)$)/g), ' $1')+" руб.", 5, false, true, 6500);
			exitHouseMenu();
		}else{
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~жилое имущество", "~s~Вы купили жильё за"+cost.toString().replace(new RegExp(/(\d{1,3})(?=((\d{3})*)$)/g), ' $1')+" руб.", 5, false, true, 6500);
		}
		houseActAction = false;
	}
}
mp.events.add("houseDealSuccess", houseDealSuccess);

function setNewKey(hID, newKey) {
	if(homeMenu_browser) {
		if(hID && newKey) {
			exitHouseMenu();
			houseActAction = true;
			mp.events.callRemote('setNewKey', hID, newKey);
		}else{
			return homeMenu_browser.execute("msg_error('Неизвестная ошибка');");
		}
	}
}
mp.events.add("setNewKey", setNewKey);

function setNewKeySuccess(newKey) {
	if(newKey) {
		houseActAction = false;
		mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~жилое имущество", "~s~Установлен новый ключ "+newKey+", запишите его.", 5, false, true, 6500);
	}
}
mp.events.add("setNewKeySuccess", setNewKeySuccess);

function houseBalanceUp(hID, summa) {
	if(homeMenu_browser) {
		if(hID && summa) {
			if(houseActAction) return false;
			hID = parseInt(hID);
			summa = parseInt(summa);
			let myMoney = parseInt(localPlayer.getVariable("player.money"));
			if(myMoney < summa) return homeMenu_browser.execute("msg_error('Недостаточно средств для пополнения баланса');");
			exitHouseMenu();
			houseActAction = true;
			mp.events.callRemote('houseBalanceUp', hID, summa);
		}else{
			return homeMenu_browser.execute("msg_error('Неизвестная ошибка');");
		}
	}
}
mp.events.add("houseBalanceUp", houseBalanceUp);

function houseBalanceDown(hID, summa) {
	if(homeMenu_browser) {
		if(hID && summa) {
			if(houseActAction) return false;
			hID = parseInt(hID);
			summa = parseInt(summa);
			exitHouseMenu();
			houseActAction = true;
			mp.events.callRemote('houseBalanceDown', hID, summa);
		}else{
			return homeMenu_browser.execute("msg_error('Неизвестная ошибка');");
		}
	}
}
mp.events.add("houseBalanceDown", houseBalanceDown);

function setHouseBalanceSuccess(newBalance) {
	if(newBalance) {
		houseActAction = false;
		mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~жилое имущество", "~s~Новый баланс жилья"+newBalance.toString().replace(new RegExp(/(\d{1,3})(?=((\d{3})*)$)/g), ' $1')+" руб.", 5, false, true, 6500);
	}
}
mp.events.add("setHouseBalanceSuccess", setHouseBalanceSuccess);

mp.events.add("playerEnterColshape", (shape) => {
	if(mp.colshapes.exists(shape)) {
		if(typeof(shape.getVariable("col.type")) !== "undefined") {
			let colType = shape.getVariable("col.type");
			if(colType == "house_render") {
				let houseData = shape.getVariable('col.data');
				if(typeof(houseData.name) === "undefined") {
					if(typeof(houseData.own) !== "undefined") {
						let markerColor = [46, 204, 113, 185];
						if(houseData.own > 0) markerColor = [225, 59, 59, 185];
						if(houseData.own == localPlayer.getVariable('player.id')) markerColor = [240, 203, 88, 185];
						let houseMarker = mp.markers.new(20, new mp.Vector3(parseFloat(houseData.pos[0]), parseFloat(houseData.pos[1]), parseFloat(houseData.pos[2])-0.2), 1.2,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 180, 0),
							color: markerColor,
							visible: true,
							dimension: 0
						});
						
						let houseCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(houseData.pos[0]), parseFloat(houseData.pos[1]), parseFloat(houseData.pos[2])-0.2), 0.5,
						{
							color: [255, 255, 255, 0],
							visible: true,
							dimension: localPlayer.dimension
						});
						houseCheck.houseData = houseData;
						
						/*
						houseMarker = mp.markers.new(28, new mp.Vector3(parseFloat(houseData.pos[0]), parseFloat(houseData.pos[1]), parseFloat(houseData.pos[2])), 50, // DEBUG
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 180, 0),
							color: [0, 0, 200, 50],
							visible: true,
							dimension: 0
						});
						*/
						
						let houseBlip = {};
						houseBlip.id = false;
						let houseName = "жилое имущество";
						let blipColor = 2;
						if(houseData.own > 0) {
							blipColor = 1;
							houseName = "жилое имущество";
						}
						if(houseData.own != localPlayer.getVariable('player.id')) {
							houseBlip = mp.blips.new(40, new mp.Vector3(parseFloat(houseData.pos[0]), parseFloat(houseData.pos[1]), parseFloat(houseData.pos[2])), {
								name: houseName,
								scale: 0.6,
								color: blipColor,
								shortRange: true,
								dimension: 0
							});
							if(blipColor != 2) houseBlip.setCategory(11);
						}
						
						housesInStream[houseData.id] = {'data': houseData,'marker': houseMarker.id.toString(),'check': houseCheck.id.toString(),'blip': houseBlip.id.toString(),'alpha': 0};
					}
				}else{
					let houseMarker = mp.markers.new(20, new mp.Vector3(parseFloat(houseData.pos.x), parseFloat(houseData.pos.y), parseFloat(houseData.pos.z)-0.2), 1.2,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 180, 0),
						color: [223, 138, 48, 185],
						visible: true,
						dimension: 0
					});
					
					let houseCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(houseData.pos.x), parseFloat(houseData.pos.y), parseFloat(houseData.pos.z)-0.2), 0.5,
					{
						color: [255, 255, 255, 0],
						visible: true,
						dimension: localPlayer.dimension
					});
					houseCheck.houseData = houseData;
					
					housesInStream[houseData.id] = {'data': houseData,'marker': houseMarker.id.toString(),'check': houseCheck.id.toString(),'alpha': 0};
				}
			}
		}
	}
});

mp.events.add("playerExitColshape", (shape) => {
	if(mp.colshapes.exists(shape)) {
		if(typeof(shape.getVariable("col.type")) !== "undefined") {
			let checkPointType = shape.getVariable("col.type");
			if(checkPointType == "house_render") {
				let houseData = shape.getVariable('col.data');
				if(typeof(houseData) !== "undefined") {
					if(typeof(housesInStream[houseData.id]) !== "undefined") {
						let tempData = housesInStream[houseData.id];
						let tempMarker = mp.markers.at(parseInt(tempData['marker']));
						if(mp.markers.exists(tempMarker)) tempMarker.destroy();
						let tempCheck = mp.checkpoints.at(parseInt(tempData['check']));
						if(mp.checkpoints.exists(tempCheck)) tempCheck.destroy();
						if(tempData['blip'] != "false") {
							let tempBlip = mp.blips.at(parseInt(tempData['blip']));
							if(mp.blips.exists(tempBlip)) tempBlip.destroy();
						}
						housesInStream[houseData.id] = undefined;
						housesInStream = JSON.parse(JSON.stringify(housesInStream));
					}
				}
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.houseData) !== "undefined") {
			if(localPlayer.getVariable('player.id') && hud_browser && !localPlayer.vehicle && !houseActAction && (typeof(localPlayer.getVariable("active.deal")) === "undefined" || !localPlayer.getVariable("active.deal"))) {
				if(!markerNoReaktOnTeleport) {
					if(typeof(localPlayer.getVariable('player.houses')) === "undefined") return false;
					if(allowBinds != stockBinds) return false;
					
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * IN Тип: "+checkpoint.getVariable('checkpoint.type')+"</span>");
					tempHouseData = checkpoint.houseData;
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * ID Дома: "+tempHouseData.id+"</span>");
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Владелец: "+tempHouseData.ownlog+" ("+tempHouseData.own+")</span>");
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Интерьер: "+tempHouseData.interior+"</span>");
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Стоимость дома: "+tempHouseData.cost.replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1')+"</span>");
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Парковочных мест: "+tempHouseData.park+"</span>");
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Ключ: "+tempHouseData.key+"</span>");
					
					markerNoReaktOnTeleport = true;
					
					if(typeof(tempHouseData.name) === "undefined") {
						if (!homeMenu_browser) {
							homeMenu_browser = mp.browsers.new("package://CEF/houseMenu/index.html");
							setTimeout(function() {
								if(homeMenu_browser) {
									homeMenu_browser.execute("initHomeData("+localPlayer.getVariable('player.id')+", "+tempHouseData.id+", "+tempHouseData.interior+", "+tempHouseData.balance+", "+tempHouseData.cost+", "+tempHouseData.park+", "+tempHouseData.own+", '"+tempHouseData.ownlog+"', "+tempHouseData.key+");");
									mp.gui.cursor.visible = true;
								}
							}, 100);
							allowBinds = [];
						}
					}else{
						if (!homeMenu_browser) {
							homeMenu_browser = mp.browsers.new("package://CEF/houseMenu/index.html");
							setTimeout(function() {
								if(homeMenu_browser) {
									let playerHOUSES = localPlayer.getVariable('player.houses');
									let findFlat = false;
									if(typeof(playerHOUSES.houses) !== "undefined") {
										if(Object.keys(playerHOUSES.houses).length > 0) {
											for (var k in playerHOUSES.houses) {
												let houseData = playerHOUSES.houses[k];
												if(typeof(houseData.id) !== "undefined" && typeof(houseData.params) !== "undefined") {
													if(typeof(houseData.params.flat) !== "undefined") findFlat = houseData;
												}
											}
										}
									}
									if(findFlat) {
										if(typeof(findFlat.interior) != "undefined") {
											tempHouseData["flatID"] = findFlat.id;
											tempHouseData["interior"] = findFlat.interior;
											tempHouseData["park"] = findFlat.park;
											tempHouseData["cost"] = findFlat.cost;
										}else{
											restoreBinds();
											return notyAPI.error("Ошибка инициализации квартиры.", 3000, true);
										}
									}
									homeMenu_browser.execute("initFlatHouse("+localPlayer.getVariable('player.id')+", '"+JSON.stringify(localPlayer.getVariable('player.houses'))+"', '"+JSON.stringify(tempHouseData)+"');");
									mp.gui.cursor.visible = true;
								}
							}, 200);
							allowBinds = [];
						}
					}
				}else{
					markerNoReaktOnTeleport = false;
				}
			}
		}
		if(typeof(checkpoint.getVariable("checkpoint.type")) !== "undefined") {
			let checkPointType = checkpoint.getVariable("checkpoint.type");
			if(checkPointType == "exitHouse") {
				if(localPlayer.getVariable('player.id') && localPlayer.getVariable('player.inHouse')) {
					if(!markerNoReaktOnTeleport) {
						let houseData = localPlayer.getVariable('player.inHouse')
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Выход из дома ID: "+houseData.id+"</span>");
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Выход на позицию X: "+houseData.pos[0]+"</span>");
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Выход на позицию Y: "+houseData.pos[1]+"</span>");
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Выход на позицию Z: "+houseData.pos[2]+"</span>");
						markerNoReaktOnTeleport = true;
						
						if(hud_browser) hud_browser.execute("hiddenAction('Переносим персонажа из интерьера в мир..');");
						localPlayer.freezePosition(true);
						setTimeout(() => { 
							if(hud_browser) hud_browser.execute("hiddenAction();");
							localPlayer.freezePosition(false);
						}, 5000);
						
						if(houseData) {
							mp.events.call("sleepAntiCheat");
							mp.events.callRemote('exitFromHome', JSON.stringify(houseData));
						}
					}
				}
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.houseData) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) cancelHouseDeal(true);
			tempHouseData = null;
			exitHouseMenu();
		}
		if(typeof(checkpoint.getVariable("checkpoint.type")) !== "undefined") {
			let checkPointType = checkpoint.getVariable("checkpoint.type");
			//chatAPI.notifyPush("checkPointType: "+checkPointType);
			if(checkPointType == 'exitHouse') {
				if(localPlayer.getVariable('player.id') && localPlayer.getVariable('player.inHouse')) {
					if(markerNoReaktOnTeleport) markerNoReaktOnTeleport = false;
				}
			}
		}
	}
});
}횡内ʁ