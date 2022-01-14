{
var businessCreate_browser = null;
var businessMenu_browser = null;

var tempBusinessCreateData = {'name':'Бизнес','cost':500000,'income':15000};
var businessesInStream = {};
var myBusinessesBlips = [];

var tempBusinessData = null;

var sellToBusinessID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
var sellFromBusinessID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;

var businessActAction = false;

let businessMissionBlip = false, businessMissionCheckpoint = false, businessMissionMarker = false;
let missionCost = CryptoJS.AES.encrypt("0", krKey);

function startBusinessEvent(bizID, eventData) {
	if (businessMenu_browser) {
		businessMenu_browser.destroy();
		businessMenu_browser = null;
		mp.gui.cursor.visible = false;
		restoreBinds();
		
		if(businessMissionCheckpoint) {
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас уже есть активная задача.</span>");
		}else{
			if(bizID && eventData) {
				bizID = parseInt(bizID);
				if(bizID <= 0) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Не удалось получить задачу, попробуйте позже..</span>");
				eventData = str_replace_all(eventData, "~", "\"")
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+eventData+".</span>");
				eventData = JSON.parse(eventData);
				mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~коммерция", "~s~"+eventData.name+"~n~Задача взята, маршрут и иконка уже на радаре.", 5, false, true, 6500);
			
				if(mp.blips.exists(businessMissionBlip)) businessMissionBlip.destroy();
				businessMissionBlip = false;
				if(mp.checkpoints.exists(businessMissionCheckpoint)) businessMissionCheckpoint.destroy();
				businessMissionCheckpoint = false;
				if(mp.markers.exists(businessMissionMarker)) businessMissionMarker.destroy();
				businessMissionMarker = false;
				
				let myPos = localPlayer.position;
				let distToPoint = mp.game.gameplay.getDistanceBetweenCoords(parseFloat(myPos.x), parseFloat(myPos.y), parseFloat(myPos.z), parseFloat(eventData.pos.x), parseFloat(eventData.pos.y), parseFloat(eventData.pos.z), true);
				distToPoint = roundNumber(distToPoint/1000, 1);
				
				missionCost = roundNumber(3000 * distToPoint, 0);
				if(missionCost <= 0) missionCost = 2500;
				missionCost = CryptoJS.AES.encrypt(missionCost.toString(), krKey);
				
				businessMissionBlip = mp.blips.new(570, new mp.Vector3(parseFloat(eventData.pos.x), parseFloat(eventData.pos.y), parseFloat(eventData.pos.z)), {
					name: "Задача для Вашей коммерции",
					scale: 1.2,
					color: 6,
					shortRange: false,
					dimension: 0
				});
				businessMissionBlip.setRoute(true);
				businessMissionBlip.setRouteColour(6);
				
				businessMissionCheckpoint = mp.checkpoints.new(0, new mp.Vector3(parseFloat(eventData.pos.x), parseFloat(eventData.pos.y), parseFloat(eventData.pos.z)-1), 2.2,
				{
					color: [242, 75, 75, 0],
					visible: true,
					dimension: 0
				});
				businessMissionCheckpoint.businessMission = {"bizID":bizID,"data":eventData};
				
				businessMissionMarker = mp.markers.new(1, new mp.Vector3(parseFloat(eventData.pos.x), parseFloat(eventData.pos.y), parseFloat(eventData.pos.z-1.3)), 2.3,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [242, 75, 75, 200],
					visible: true,
					dimension: 0
				});
			}else{
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Не удалось получить задачу, попробуйте позже..</span>");
			}
		}
	}
}
mp.events.add("startBusinessEvent", startBusinessEvent);

mp.events.add("playerDeath", (player, reason, killer) => {
	if(player == localPlayer && businessMissionCheckpoint) {
		if(mp.blips.exists(businessMissionBlip)) businessMissionBlip.destroy();
		businessMissionBlip = false;
		if(mp.checkpoints.exists(businessMissionCheckpoint)) businessMissionCheckpoint.destroy();
		businessMissionCheckpoint = false;
		if(mp.markers.exists(businessMissionMarker)) businessMissionMarker.destroy();
		businessMissionMarker = false;
	}
});

function businessCreate() {
	if (!businessCreate_browser) {
		allowBinds = [];
		businessCreate_browser = mp.browsers.new("package://CEF/createBusiness/index.html");
		let myPos = localPlayer.position;
		businessCreate_browser.execute("installBusinessPos("+roundNumber(parseFloat(myPos.x), 4)+", "+roundNumber(parseFloat(myPos.y), 4)+", "+roundNumber(parseFloat(myPos.z), 4)+");");
		setTimeout(function() {
			allowBinds = [];
			businessCreate_browser.execute("tempBusinessData('"+tempBusinessCreateData.name+"', "+tempBusinessCreateData.cost+", "+tempBusinessCreateData.income+");");
			mp.gui.cursor.visible = true;
		}, 100);
	}
}

function createBusinessDismiss() {
	if (businessCreate_browser) {
		businessCreate_browser.destroy();
		businessCreate_browser = null;
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("createBusinessDismiss", createBusinessDismiss);

function createBusinessAccepted(data) {
	if (businessCreate_browser) {
		businessCreate_browser.destroy();
		businessCreate_browser = null;
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
	mp.events.callRemote('createBusiness', data);
}
mp.events.add("createBusinessAccepted", createBusinessAccepted);

function buyBusiness() {
	if (businessMenu_browser) {
		if(tempBusinessData && localPlayer.getVariable('player.id')) {
			if(typeof(localPlayer.getVariable("player.businesses")) === "undefined") return businessMenu_browser.execute("msg_error('Ошибка базы данных, повторите позднее');");
			let businessesData = localPlayer.getVariable("player.businesses");
			if(typeof(businessesData.count) === "undefined") return businessMenu_browser.execute("msg_error('У Вас уже есть 3 коммерции, продайте другие коммерции');");
			if(parseInt(businessesData.count) >= 3) return businessMenu_browser.execute("msg_error('У Вас уже есть 3 коммерции, продайте другие коммерции');");
			
			if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return businessMenu_browser.execute("msg_error('Ошибка базы данных, повторите позднее');");
			if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return businessMenu_browser.execute("msg_error('У Вас более 50 000 руб. не оплаченных штрафов');");
			
			if(businessActAction) return false;
			businessActAction = true;
			
			mp.events.callRemote('buyBusiness', JSON.stringify(tempBusinessData));
			exitBusinessMenu();
		}else{
			businessMenu_browser.destroy();
			businessMenu_browser = null;
			mp.gui.cursor.visible = false;
			restoreBinds();
		}
	}
}
mp.events.add("buyBusiness", buyBusiness);

function sellBusiness() {
	if (businessMenu_browser) {
		if(tempBusinessData && localPlayer.getVariable('player.id')) {
			if(businessActAction) return false;
			businessActAction = true;
			mp.events.callRemote('sellBusiness', JSON.stringify(tempBusinessData));
			exitBusinessMenu();
		}else{
			businessMenu_browser.destroy();
			businessMenu_browser = null;
			mp.gui.cursor.visible = false;
			restoreBinds();
		}
	}
}
mp.events.add("sellBusiness", sellBusiness);

function businessSold(cost) {
	if (cost) {
		cost = parseInt(cost);
		if(localPlayer.getVariable('player.id')) {
			let sellCost = parseInt(cost) - (parseInt(cost) * 0.10);
			let costText = sellCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~коммерция", "~s~Продана за"+costText+" руб.", 5, false, true, 6500);
			businessActAction = false;
		}
	}
}
mp.events.add("businessSold", businessSold);

function businessBought(cost) {
	if (cost) {
		cost = parseInt(cost);
		if(localPlayer.getVariable('player.id')) {
			let costText = cost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~коммерция", "~s~Преобретена за"+costText+" руб.", 5, false, true, 6500);
			businessActAction = false;
		}
	}
}
mp.events.add("businessBought", businessBought);

function businessBuyError(reason) {
	if (businessMenu_browser && reason) {
		if(tempBusinessData && localPlayer.getVariable('player.id')) {
			businessMenu_browser.execute("msg_error('"+reason+"');");
		}else{
			businessMenu_browser.destroy();
			businessMenu_browser = null;
			mp.gui.cursor.visible = false;
			restoreBinds();
		}
		businessActAction = false;
	}
}
mp.events.add("businessBuyError", businessBuyError);

function exitBusinessMenu() {
	if (businessMenu_browser) {
		businessMenu_browser.destroy();
		businessMenu_browser = null;
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("exitBusinessMenu", exitBusinessMenu);

function getPlayersForSellBusiness() {
	if (businessMenu_browser) {
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
		if(counter > 0) businessMenu_browser.execute("initPlayersForSellBusiness('"+JSON.stringify(tempPlayers)+"')");
	}
}
mp.events.add("getPlayersForSellBusiness", getPlayersForSellBusiness);

function startBusinessDealTo(bizid, nick, id, cost) {
	if(nick && bizid && id && cost && businessMenu_browser) {
		sellToBusinessID = parseInt(bizid);
		sellToNick = nick.toString();
		sellToID = parseInt(id);
		sellToCost = parseInt(cost);
		sellToCost = Math.round(sellToCost);
		
		if(sellToID <= 0) return businessMenu_browser.execute("msg_error('Вы не выбрали игрока');");
		if(sellToCost <= 0) return businessMenu_browser.execute("msg_error('Вы не указали стоимость');");
		if(sellToCost > 100000000) return businessMenu_browser.execute("msg_error('Стоимость не может быть больше 100 000 000 руб.');");
		
		if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return businessMenu_browser.execute("msg_error('Ошибка базы данных, повторите позднее');");
		if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return businessMenu_browser.execute("msg_error('У Вас более 50 000 руб. не оплаченных штрафов');");
		
		businessActAction = true;
		exitBusinessMenu();
		mp.events.callRemote('startBusinessDealTo', sellToBusinessID, sellToNick, sellToID, sellToCost);
	}
}
mp.events.add("startBusinessDealTo", startBusinessDealTo);

function startBusinessDeal(initiator, bizid, nick, id, cost) {
	if(nick && bizid && id && cost) {
		bizid = parseInt(bizid);
		nick = nick.toString();
		id = parseInt(id);
		cost = parseInt(cost);
		cost = Math.round(cost);
		
		if(initiator) {
			sellToBusinessID = bizid;
			sellToNick = nick;
			sellToID = id;
			sellToCost = cost;
		}else{
			sellFromBusinessID = bizid;
			sellFromNick = nick;
			sellFromID = id;
			sellFromCost = cost;
		}
		
		businessActAction = true;
		allowBinds = [];
		if(businessMenu_browser) exitBusinessMenu();
		businessMenu_browser = mp.browsers.new("package://CEF/businessMenu/index.html");
		setTimeout(function() {
			if(businessMenu_browser) {
				businessMenu_browser.execute("initDealData('"+initiator.toString()+"', '"+bizid.toString()+"', '"+nick.toString()+"', '"+id.toString()+"', '"+cost.toString()+"');");
				mp.gui.cursor.visible = true;
			}
		}, 100);
	}
}
mp.events.add("startBusinessDeal", startBusinessDeal);

function cancelBusinessDeal(canceler, noSendToServer) {
	if(businessMenu_browser) {
		exitBusinessMenu();
		if(canceler) {
			if(sellToBusinessID) chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы отменили сделку с игроком</span> <b><span style=\"color:#FFF\">"+sellToNick+"</span></b>");
			else if(sellFromBusinessID) chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы отклонили сделку с игроком</span> <b><span style=\"color:#FFF\">"+sellFromNick+"</span></b>");
			sellToBusinessID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
			sellFromBusinessID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;
		}else{
			if(sellToBusinessID) chatAPI.sysPush("<span style=\"color:#FF6146\"> * </span> <b><span style=\"color:#FFF\">"+sellToNick+"</span></b> <span style=\"color:#FF6146\">отклонил Ваше предложение</span>");
			else if(sellFromBusinessID) chatAPI.sysPush("<span style=\"color:#FF6146\"> * </span> <b><span style=\"color:#FFF\">"+sellFromNick+"</span></b> <span style=\"color:#FF6146\">отменил предложение</span>");
			sellToBusinessID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
			sellFromBusinessID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;
		}
		
		if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
			let playerDeal = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
			if(playerDeal && !noSendToServer) mp.events.callRemote('cancelBusinessDeal', playerDeal);
		}
		businessActAction = false;
	}
}
mp.events.add("cancelBusinessDeal", cancelBusinessDeal);

function acceptBusinessDeal(noSendToServer) {
	if(businessMenu_browser) {
		if(!noSendToServer) {
			if(!localPlayer.getVariable("active.deal")) {
				mp.events.callRemote('cancelBusinessDeal');
				businessMenu_browser.execute("msg_error('Игрок не в сети или далеко, сделка отменена');");
				
				sellToBusinessID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
				sellFromBusinessID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;
				
				return exitBusinessMenu();
			}
			if(!localPlayer.getVariable("player.money")) return businessMenu_browser.execute("msg_error('Недостаточно средств для совершения сделки');");
			let myMoney = parseInt(localPlayer.getVariable("player.money"));
			let resCost = roundNumber(parseInt(sellFromCost) + (parseInt(sellFromCost) * 0.05), 0);
			if(myMoney < resCost) return businessMenu_browser.execute("msg_error('Недостаточно средств для совершения сделки');");
			if(typeof(localPlayer.getVariable("player.businesses")) === "undefined") return businessMenu_browser.execute("msg_error('У Вас уже есть 3 коммерции, продайте другие коммерции');");
			
			if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return businessMenu_browser.execute("msg_error('Ошибка базы данных, повторите позднее');");
			if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return businessMenu_browser.execute("msg_error('У Вас более 50 000 руб. не оплаченных штрафов');");
			
			let businessesData = localPlayer.getVariable("player.businesses");
			if(typeof(businessesData.count) === "undefined") return businessMenu_browser.execute("msg_error('У Вас уже есть 3 коммерции, продайте другие коммерции');");
			if(parseInt(businessesData.count) >= 3) return businessMenu_browser.execute("msg_error('У Вас уже есть 3 коммерции, продайте другие коммерции');");
			
			let myPos = localPlayer.position;
			if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
				let playerDeal = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
				if(playerDeal) {
					if(!playerDeal.position) return homeMenu_browser.execute("msg_error('Вы слишком далеко от места совершения сделки');");
					
					let plPos = playerDeal.position;
					if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true) > 5) return homeMenu_browser.execute("msg_error('Вы слишком далеко от места совершения сделки');");
					
					mp.events.callRemote('acceptBusinessDeal', playerDeal, sellFromBusinessID, sellFromNick, sellFromID, sellFromCost);
				}else{
					return homeMenu_browser.execute("msg_error('Вы слишком далеко от места совершения сделки');");
				}
			}
		}
		
		businessActAction = true;
		exitBusinessMenu();
		
		if(sellToBusinessID) chatAPI.sysPush("<span style=\"color:#FF6146\"> * </span> <b><span style=\"color:#FFF\">"+sellToNick+"</span></b> <span style=\"color:#FF6146\">принял Ваше предложение</span>");
		else if(sellFromBusinessID) chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы приняли предложение от</span> <b><span style=\"color:#FFF\">"+sellFromNick+"</span></b>");
		
		sellToBusinessID = 0, sellToNick = false, sellToID = 0, sellToCost = 0;
		sellFromBusinessID = 0, sellFromNick = false, sellFromID = 0, sellFromCost = 0;
	}
}
mp.events.add("acceptBusinessDeal", acceptBusinessDeal);

function businessDealSuccess(initiator, cost) {
	if(cost) {
		if(initiator) mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~коммерция", "~s~Вы продали коммерцию за"+cost.toString().replace(new RegExp(/(\d{1,3})(?=((\d{3})*)$)/g), ' $1')+" руб.", 5, false, true, 6500);
		else mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~коммерция", "~s~Вы купили коммерцию за"+cost.toString().replace(new RegExp(/(\d{1,3})(?=((\d{3})*)$)/g), ' $1')+" руб.", 5, false, true, 6500);
		businessActAction = false;
	}
}
mp.events.add("businessDealSuccess", businessDealSuccess);

function businessBalanceDown(bizid, summa) {
	if(businessMenu_browser) {
		if(bizid && summa) {
			bizid = parseInt(bizid);
			summa = parseInt(summa);
			exitBusinessMenu();
			
			if(businessActAction) return false;
			businessActAction = true;
			
			mp.events.callRemote('businessBalanceDown', bizid, summa);
		}else{
			return businessMenu_browser.execute("msg_error('Неизвестная ошибка');");
		}
	}
}
mp.events.add("businessBalanceDown", businessBalanceDown);

function setBusinessBalanceSuccess(newBalance) {
	if(newBalance) {
		mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~коммерция", "~s~Новый баланс коммерции"+newBalance.toString().replace(new RegExp(/(\d{1,3})(?=((\d{3})*)$)/g), ' $1')+" руб.", 5, false, true, 6500);
		businessActAction = false;
	}
}
mp.events.add("setBusinessBalanceSuccess", setBusinessBalanceSuccess);

mp.events.add("playerEnterColshape", (shape) => {
	if(mp.colshapes.exists(shape)) {
		if(typeof(shape.getVariable("col.type")) !== "undefined") {
			let colType = shape.getVariable("col.type");
			if(colType == "business_render") {
				if(typeof(shape.getVariable('col.data')) !== "undefined") {
					let businessData = shape.getVariable('col.data');
					if(typeof(businessData.own) !== "undefined") {
						let markerColor = [46, 204, 113, 185];
						if(businessData.own > 0) markerColor = [225, 59, 59, 185];
						if(businessData.own == localPlayer.getVariable('player.id')) markerColor = [240, 203, 88, 185];
						let businessMarker = mp.markers.new(20, new mp.Vector3(parseFloat(businessData.pos[0]), parseFloat(businessData.pos[1]), parseFloat(businessData.pos[2])-0.2), 1.2,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 180, 0),
							color: markerColor,
							visible: true,
							dimension: 0
						});
						
						let businessCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(businessData.pos[0]), parseFloat(businessData.pos[1]), parseFloat(businessData.pos[2])-0.2), 0.5,
						{
							color: [255, 255, 255, 0],
							visible: true,
							dimension: localPlayer.dimension
						});
						businessCheck.businessData = businessData;
						
						let businessBlip = {};
						businessBlip.id = false;
						let businessName = "коммерция";
						let blipColor = 2;
						if(businessData.own > 0) {
							businessName = "коммерция";
							blipColor = 1;
						}
						if(businessData.own != localPlayer.getVariable('player.id')) {
							businessBlip = mp.blips.new(374, new mp.Vector3(parseFloat(businessData.pos[0]), parseFloat(businessData.pos[1]), parseFloat(businessData.pos[2])), {
								name: businessName,
								scale: 0.8,
								color: blipColor,
								shortRange: true,
								dimension: 0
							});
							if(blipColor != 2)  businessBlip.setCategory(11);
						}
						blipColor = null;
						
						businessesInStream[businessData.id] = {'data': businessData,'marker': businessMarker.id.toString(),'check': businessCheck.id.toString(),'blip': businessBlip.id.toString(),'alpha': 0};
					}
				}
			}
		}
	}
});

mp.events.add("playerExitColshape", (shape) => {
	if(mp.colshapes.exists(shape)) {
		if(typeof(shape.getVariable("col.type")) !== "undefined") {
			let checkPointType = shape.getVariable("col.type");
			if(checkPointType == "business_render") {
				let businessData = shape.getVariable('col.data');
				
				if(typeof(businessData) !== "undefined") {
					if(typeof(businessesInStream[businessData.id]) !== "undefined") {
						let tempData = businessesInStream[businessData.id];
						let tempMarker = mp.markers.at(parseInt(tempData['marker']));
						if(mp.markers.exists(tempMarker)) tempMarker.destroy();
						let tempCheck = mp.checkpoints.at(parseInt(tempData['check']));
						if(mp.checkpoints.exists(tempCheck)) tempCheck.destroy();
						if(tempData['blip'] != "false") {
							let tempBlip = mp.blips.at(parseInt(tempData['blip']));
							if(mp.blips.exists(tempBlip)) tempBlip.destroy();
						}
						businessesInStream[businessData.id] = undefined;
						businessesInStream = JSON.parse(JSON.stringify(businessesInStream));
					}
				}
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.businessData) !== "undefined") {
			if(localPlayer.getVariable('player.id') && hud_browser && !localPlayer.vehicle && !businessActAction && (typeof(localPlayer.getVariable("active.deal")) === "undefined" || !localPlayer.getVariable("active.deal"))) {
				tempBusinessData = checkpoint.businessData;
				
				if (!businessMenu_browser) {
					businessMenu_browser = mp.browsers.new("package://CEF/businessMenu/index.html");
					setTimeout(function() {
						if(businessMenu_browser) {
							businessMenu_browser.execute("initBusinessData("+localPlayer.getVariable('player.id')+", "+tempBusinessData.id+", '"+tempBusinessData.name+"', "+tempBusinessData.balance+", "+tempBusinessData.cost+", "+tempBusinessData.own+", '"+tempBusinessData.ownlog+"', '"+tempBusinessData.income+"', '"+JSON.stringify(tempBusinessData.events)+"');");
							mp.gui.cursor.visible = true;
						}
					}, 100);
					allowBinds = [];
				}
			}
		}
		if(mp.checkpoints.exists(businessMissionCheckpoint)) {
			if(checkpoint == businessMissionCheckpoint) {
				if(typeof(businessMissionCheckpoint.businessMission) !== "undefined") {
					if(businessMissionCheckpoint) {
						missionCost = parseInt((CryptoJS.AES.decrypt(missionCost, krKey)).toString(CryptoJS.enc.Utf8));
						
						mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~коммерция", "~w~"+businessMissionCheckpoint.businessMission.data.name+"~n~~g~Задача выполнена~w~, поздравляем! Вы получили~g~"+missionCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~w~руб.", 5, false, true, 6500);
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+businessMissionCheckpoint.businessMission.bizID+": "+businessMissionCheckpoint.businessMission.data.name+"</span>");
						
						mp.events.callRemote('businessMissionComplete', businessMissionCheckpoint.businessMission.bizID, businessMissionCheckpoint.businessMission.data.name, missionCost.toString());
						
						if(mp.blips.exists(businessMissionBlip)) businessMissionBlip.destroy();
						businessMissionBlip = false;
						if(mp.checkpoints.exists(businessMissionCheckpoint)) businessMissionCheckpoint.destroy();
						businessMissionCheckpoint = false;
						if(mp.markers.exists(businessMissionMarker)) businessMissionMarker.destroy();
						businessMissionMarker = false;
					}
				}
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.businessData) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) cancelBusinessDeal(true);
			tempBusinessData = null;
			exitBusinessMenu();
		}
	}
});
}ٚ眓̦