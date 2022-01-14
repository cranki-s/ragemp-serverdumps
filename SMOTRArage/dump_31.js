{
mp.game.streaming.requestAnimDict("missheist_jewel@hacking");
mp.game.streaming.requestAnimDict("amb@world_human_gardener_plant@female@idle_a");
mp.game.streaming.requestAnimDict("mini@safe_cracking");

var lootsInStream = [];
var lootElement = false;
var elementLooting = false;

var dropsInStream = {};
var putDrop = [];
var dropPutting = false;
var afInvPutting = false;

var afInventoryPanel = false;
var inventorySaving = false, invCEFUpdating = false, invCEFUpdatingVeh = false;
var inventoryPanel = false;
var slotInUse = "0", ammoInUse = "0", ammoInUseCount = CryptoJS.AES.encrypt("0", krKey);

mp.game.streaming.requestAnimDict("mp_weapon_drop");
mp.game.streaming.requestAnimDict("anim@heists@narcotics@trash");
mp.game.streaming.requestAnimDict("amb@world_human_bum_standing@twitchy@base");
mp.game.streaming.requestAnimDict("amb@world_human_bum_wash@male@high@idle_a");

mp.keys.bind(0x49, true, function() { // I Меню (Инвентарь)
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x49)) return false;
	
	if(hud_browser) {
		if(inventoryPanel) {
			makeCloseInventory();
		}else{
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+inventorySaving.toString()+".."+dealerPanel.toString()+".."+sellingInvSlot.toString()+"</span>");
			if(myVehSaving) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Транспорт Вашего персонажа сохраняется, попробуйте открыть инвентарь позже..</span>");
			
			if(typeof(localPlayer.getVariable("player.inv")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Ваш инвентарь не инициализирован, повторите ещё раз..</span>");
			if(typeof(localPlayer.getVariable("player.pers")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Ваш персонаж не инициализирован, повторите ещё раз..</span>");
			
			if(JSON.stringify(localPlayer.getVariable("player.inv")) == inventorySaving || JSON.stringify(localPlayer.getVariable("player.inv")) == invCEFUpdating) return false;
			
			if(!inventorySaving && !invCEFUpdating && !invCEFUpdatingVeh && !dealerPanel && !sellingInvSlot) {
				if(typeof(inCasino) !== "undefined") {
					if(inCasino) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * В казино инвентарь недоступен..</span>");
				}
				
				if(afInventoryPanel) return false;
				afInventoryPanel = true;
				setTimeout(function() { afInventoryPanel = false }, 1000);
				
				if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
					if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас есть активная сделка, инвентарь недоступен..</span>");
				}
				
				if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
					let playerBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(playerBlocks.jail) !== "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь в тюрьме не доступен..</span>");
				}
				
				if(fishingStartProcess) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь во время рыбалки недоступен..</span>");
				
				enablePedScreen();
				
				let persData = localPlayer.getVariable("player.pers");
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(localPlayer.getVariable("player.inv"))+"</span>");
				
				let vehInv = false;
				if(localPlayer.vehicle) {
					let theVeh = localPlayer.vehicle;
					if(typeof(theVeh.getVariable("veh.inv")) !== "undefined") vehInv = theVeh.getVariable("veh.inv");
					if(vehInv && typeof(theVeh.getVariable("veh.hash")) !== "undefined" && typeof(theVeh.getVariable("veh.id")) !== "undefined" && typeof(theVeh.getVariable("veh.own")) !== "undefined") {
						let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
						if(vehOwn.remoteId.toString() == localPlayer.remoteId.toString()) {
							let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
							decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
							
							let vehHash = theVeh.getVariable("veh.hash");
							
							let vehName = vehHash;
							if(typeof(decVehStats[0][vehHash]) !== "undefined") vehName = decVehStats[0][vehHash].name+" ("+theVeh.getVariable("veh.id")+")";
							
							let vehTrunk = 5;
							if(typeof(decVehStats[0][vehHash]) !== "undefined") vehTrunk = decVehStats[0][vehHash].inv;
							
							vehInv = JSON.stringify({"name":vehName,"id":theVeh.getVariable("veh.id"),"trunk":vehTrunk,"inv":JSON.parse(vehInv)});
						}
					}else{
						vehInv = false;
					}
				}
				
				hud_browser.execute('toggleInventoryPanel(\''+JSON.stringify(localPlayer.getVariable("player.inv"))+'\', \''+slotInUse+'\', \''+ammoInUse+'\', false, \''+persData.npGender+'\', \''+JSON.stringify(allStuff)+'\', \''+vehInv+'\');');
				mp.gui.cursor.visible = true;
				inventoryPanel = true;
				
				allowBinds = [0x49];
				
				mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
				
				hud_browser.execute('playSound("openInv", 0.15);');
			}
		}
	}
});

function makeCloseInventory() {
	if(inventoryPanel) {
		deletePedScreen();
		if(hud_browser) {
			hud_browser.execute('makeCloseInventory();');
			hud_browser.execute('playSound("closeInv", 0.15);');
		}
	}
}

mp.events.addDataHandler("veh.inv", function (entity, value, oldValue) {
	if(invCEFUpdatingVeh) {
		if(entity.type == 'vehicle') {
			if(typeof(entity.getVariable("veh.id")) !== "undefined") {
				let vehID = entity.getVariable("veh.id");
				if(invCEFUpdatingVeh == vehID) {
					//chatAPI.sysPush("<span style=\"color:#fff\"> * VehUpd: "+JSON.stringify(value)+"</span>");
					invCEFUpdatingVeh = false;
					if(hud_browser) hud_browser.execute('invCEFUpdatedVeh();');
				}
			}
		}
	}
});
	
var scubaDiving = false;
var fishingMode = false;
mp.events.addDataHandler("player.inv", function (entity, value, oldValue) {
	if(entity.type == 'player') {
		if(entity == localPlayer) {
			if(value) {
				if(typeof(oldValue) !== "undefined") {
					if(value != oldValue) {
						//chatAPI.sysPush("<span style=\"color:#fff\"> * SYNCED: "+JSON.stringify(localPlayer.getVariable("player.inv"))+"</span>");
						if(inventorySaving) {
							inventorySaving = false;
							if(fastUseSlotsTiming > 100) fastUseSlotsTiming = 100;
						}
						if(invCEFUpdating) {
							//chatAPI.sysPush("<span style=\"color:#fff\"> * PersUpd</span>");
							invCEFUpdating = false;
							if(hud_browser) hud_browser.execute('invCEFUpdated();');
						}
					}
				}
				if(typeof(value.instrument) !== "undefined") {
					if(value.instrument.hash == "aqualang") {
						localPlayer.setEnableScuba(true);
						localPlayer.setMaxTimeUnderwater(10000);
						scubaDiving = true;
					}else{
						localPlayer.setEnableScuba(false);
						localPlayer.setMaxTimeUnderwater(20);
						scubaDiving = false;
					}
					if(value.instrument.hash == "rod" || value.instrument.hash == "badrod" || value.instrument.hash == "spinning") {
						fishingMode = {"rod":value.instrument.hash};
					}else{
						fishingMode = false;
					}
				}else{
					localPlayer.setEnableScuba(false);
					localPlayer.setMaxTimeUnderwater(20);
					scubaDiving = false;
					
					fishingMode = false;
				}
			}
			if(dropPutting) {
				restoreBinds();
				dropPutting = false;
			}
			updateFastInv();
		}
	}
});

function invLoadPlayersForSell() {
	if(inventoryPanel && hud_browser) {
		let tempPlayers = [];
		let myPos = localPlayer.position;
		mp.players.forEachInStreamRange(
			(player, id) => {
				if(player != localPlayer) {
					let plPos = player.position;
					if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true) <= 5) {
						if(!player.vehicle && player.getVariable("player.id") && player.getVariable("player.nick")) {
							tempPlayers.push({"nick":player.getVariable("player.nick").toString(),"id":parseInt(player.getVariable("player.id"))});
						}
					}
				}
			}
		);
		hud_browser.execute("playersInventoryToSellLoaded('"+JSON.stringify(tempPlayers)+"');");
	}
}
mp.events.add("invLoadPlayersForSell", invLoadPlayersForSell);

var sellingInvSlot = false, sellingInvAmount = false, sellingInvCost = false;
var invBuyingSlotData = false;
function invSellDealStart(sellToNick, sellToID, sellValID, invSlotData, sellHealth, sellAmount, sellCost) {
	if(inventoryPanel && hud_browser && !dealerPanel) {
		if(inventorySaving) {
			allowBinds = [];
			return hud_browser.execute("invErrorNotify('#inv_sellSend', 'Инвентарь сохраняется, подождите..');");
		}
		
		sellCost = parseInt(sellCost).toString();
		
		invSlotData = JSON.parse(invSlotData);
		allowBinds = [];
		
		let isFinded = false;
		let myPos = localPlayer.position;
		mp.players.forEachInStreamRange(
			(player, id) => {
				if(player != localPlayer) {
					if(typeof(player.getVariable("player.id")) !== "undefined") {
						if(player.getVariable("player.id") == parseInt(sellToID)) {
							let plPos = player.position;
							if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true) <= 5) {
								isFinded = player;
								return false;
							}
						}
					}
				}
			}
		);
		
		if(isFinded) {
			if(invSlotData) {
				let tempName = "Ничего", tempDesc = "Нет описания", tempImg = "none", tempCost = false;
				if(typeof(invSlotData.sex) !== "undefined") {
					if(typeof(allStuff[invSlotData.sex]) !== "undefined") {
						let tempData = allStuff[invSlotData.sex];
						if(typeof(tempData[invSlotData.type]) !== "undefined") {
							tempData = tempData[invSlotData.type];
							if(typeof(tempData[invSlotData.hash]) !== "undefined") {
								tempData = tempData[invSlotData.hash];
								if(typeof(tempData.name) !== "undefined") tempName = tempData.name;
								if(typeof(tempData.desc) !== "undefined") tempDesc = tempData.desc;
								if(invSlotData.type == "mask") {
									tempImg = "mask";
								}else{
									if(invSlotData.sex == "male") {
										if(invSlotData.type == "head") tempImg = "headMale";
										else if(invSlotData.type == "glasses") tempImg = "glassesMale";
										else if(invSlotData.type == "tors") tempImg = "torsMale";
										else if(invSlotData.type == "watch") tempImg = "watchMale";
										else if(invSlotData.type == "bracelet") tempImg = "braceletMale";
										else if(invSlotData.type == "pants") tempImg = "pantsMale";
										else if(invSlotData.type == "shoes") tempImg = "shoesMale";
									}else{
										if(invSlotData.type == "head") tempImg = "headFemale";
										else if(invSlotData.type == "glasses") tempImg = "glassesFemale";
										else if(invSlotData.type == "tors") tempImg = "torsFemale";
										else if(invSlotData.type == "watch") tempImg = "watchFemale";
										else if(invSlotData.type == "bracelet") tempImg = "braceletFemale";
										else if(invSlotData.type == "pants") tempImg = "pantsFemale";
										else if(invSlotData.type == "shoes") tempImg = "shoesFemale";
									}
								}
							}
						}
					}
				}else{
					if(typeof(allStuff[invSlotData.type]) !== "undefined") {
						let tempData = allStuff[invSlotData.type];
						if(typeof(tempData[invSlotData.hash]) !== "undefined") {
							tempData = tempData[invSlotData.hash];
							if(typeof(tempData.name) !== "undefined") tempName = tempData.name;
							if(typeof(tempData.desc) !== "undefined") tempDesc = tempData.desc;
							//if(invSlotData.type == "weapon" && typeof(tempData.cost) !== "undefined") tempCost = tempData.cost;
							if(typeof(tempData.cost) !== "undefined") tempCost = tempData.cost;
							if(invSlotData.type == "mask") {
								tempImg = "mask";
							}else{
								tempImg = invSlotData.hash;
							}
						}
					}
				}
				
				if(parseInt(sellAmount) < 2) {
					if(tempCost && parseInt(sellCost) > tempCost+(tempCost * 2)) {
						allowBinds = [0x49];
						let maxCost = tempCost+(tempCost * 2);
						return hud_browser.execute("invErrorNotify('#inv_sellSend', 'Дорого, макс."+maxCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.');");
					}
				}else{
					if(tempCost && parseInt(sellCost) > (tempCost+(tempCost * 2))*sellAmount) {
						allowBinds = [0x49];
						let maxCost = (tempCost+(tempCost * 2))*sellAmount;
						return hud_browser.execute("invErrorNotify('#inv_sellSend', 'Дорого, макс."+maxCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.');");
					}
				}
				
				if(typeof(isFinded.getVariable("active.deal")) !== "undefined") {
					if(isFinded.getVariable("active.deal")) {
						allowBinds = [0x49];
						return hud_browser.execute("invErrorNotify('#inv_sellSend', 'У игрока есть активная сделка');");
					}
				}
				
				sellingInvSlot = sellValID;
				sellingInvAmount = sellAmount;
				
				hud_browser.execute("inventoryToSellWaiting('"+sellToNick+"', '"+sellToID+"', '"+sellValID+"', '"+tempName+"', '"+tempDesc+"' ,'"+tempImg+"', '"+sellHealth+"', '"+sellAmount+"', '"+sellCost+"');");
				mp.events.callRemote('inventoryToSell', isFinded, sellValID, tempName, tempDesc, tempImg, JSON.stringify(invSlotData), sellHealth, sellAmount, sellCost);
			}else{
				allowBinds = [0x49];
				return hud_browser.execute("invErrorNotify('#inv_sellSend', 'Ошибка инициализации слота');");
			}
		}else{
			allowBinds = [0x49];
			return hud_browser.execute("invErrorNotify('#inv_sellSend', 'Игрок оффлайн или слишком далеко');");
		}
	}
}
mp.events.add("invSellDealStart", invSellDealStart);

function cancelInventorySellTo() {
	if(inventoryPanel && !dealerPanel) {
		closeInventory();
		/*if(sellingInvSlot) sellingInvSlot = false;
		if(sellingInvAmount) sellingInvAmount = false;
		if(invBuyingSlotData) invBuyingSlotData = false;
		if(sellingInvCost) sellingInvCost = false;*/
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
				let dealPlayer = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
				if(dealPlayer) {
					if(typeof(dealPlayer.getVariable("player.id")) !== "undefined" && typeof(dealPlayer.getVariable("player.nick")) !== "undefined") {
						let dealID = dealPlayer.getVariable("player.id");
						let dealNick = dealPlayer.getVariable("player.nick");
						
						chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы отменили трейд для игрока <span style=\"color:#FFF\"><b>"+dealNick+"</b></span> (<span style=\"color:#FFF\"><b>"+dealID+"</b></span>).</span>");
						mp.events.callRemote('cancelInventorySellTo', dealPlayer);
					}else{
						mp.events.callRemote('cancelInventorySellTo', false);
					}
				}else{
					mp.events.callRemote('cancelInventorySellTo', false);
				}
			}else{
				mp.events.callRemote('cancelInventorySellTo', false);
			}
		}
	}
}
mp.events.add("cancelInventorySellTo", cancelInventorySellTo);

function canceledInventorySell(playerNick, playerID, isError) {
	if(typeof(playerNick) !== "undefined" && !dealerPanel) {
		if(inventoryPanel) {
			closeInventory();
			if(sellingInvSlot) sellingInvSlot = false;
			if(sellingInvAmount) sellingInvAmount = false;
			if(invBuyingSlotData) invBuyingSlotData = false;
			if(sellingInvCost) sellingInvCost = false;
			
			if(!isError) chatAPI.sysPush("<span style=\"color:#FF6146\"> * <span style=\"color:#FFF\"><b>"+playerNick+"</b></span> (<span style=\"color:#FFF\"><b>"+playerID+"</b></span>) отменил предложение трейда.</span>");
			else chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+isError+"</span>");
		}
	}
}
mp.events.add("canceledInventorySell", canceledInventorySell);

function cancelInventorySellFrom() {
	if(inventoryPanel) {
		closeInventory();
		/*if(sellingInvSlot) sellingInvSlot = false;
		if(sellingInvAmount) sellingInvAmount = false;
		if(invBuyingSlotData) invBuyingSlotData = false;
		if(sellingInvCost) sellingInvCost = false;*/
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
				let dealPlayer = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
				if(dealPlayer) {
					if(typeof(dealPlayer.getVariable("player.id")) !== "undefined" && typeof(dealPlayer.getVariable("player.nick")) !== "undefined") {
						let dealID = dealPlayer.getVariable("player.id");
						let dealNick = dealPlayer.getVariable("player.nick");
						chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы отменили предложение трейда <span style=\"color:#FFF\"><b>"+dealNick+"</b></span> (<span style=\"color:#FFF\"><b>"+dealID+"</b></span>).</span>");
						mp.events.callRemote('cancelInventorySellTo', dealPlayer);
					}else{
						mp.events.callRemote('cancelInventorySellTo', false);
					}
				}else{
					mp.events.callRemote('cancelInventorySellTo', false);
				}
			}else{
				mp.events.callRemote('cancelInventorySellTo', false);
			}
		}
	}
}
mp.events.add("cancelInventorySellFrom", cancelInventorySellFrom);

function resultCanceledInventorySell() {
	if(sellingInvSlot) sellingInvSlot = false;
	if(sellingInvAmount) sellingInvAmount = false;
	if(invBuyingSlotData) invBuyingSlotData = false;
	if(sellingInvCost) sellingInvCost = false;
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * ИНВЕНТАРЬ ТЕПЕРЬ ДОСТУПЕН.</span>");
}
mp.events.add("resultCanceledInventorySell", resultCanceledInventorySell);

function inventorySellAction(sellFromNick, sellFromID, sellValID, tempName, tempDesc, tempImg, invSlotData, sellHealth, sellAmount, sellCost) {
	if(typeof(sellFromNick) !== "undefined" && typeof(invSlotData) !== "undefined" && hud_browser && !dealerPanel) {
		sellingInvSlot = sellValID;
		sellingInvAmount = sellAmount;
		invBuyingSlotData = invSlotData;
		sellingInvCost = sellCost;
		if(inventoryPanel) closeInventory();
		allowBinds = [];
		mp.gui.cursor.visible = true;
		inventoryPanel = true;
		hud_browser.execute("inventoryFromSellAction('"+sellFromNick+"', '"+sellFromID+"', '"+sellValID+"', '"+tempName+"', '"+tempDesc+"' ,'"+tempImg+"', '"+sellHealth+"', '"+sellAmount+"', '"+sellCost+"');");
	}
}
mp.events.add("inventorySellAction", inventorySellAction);

function acceptInventorySell() {
	if(inventoryPanel && !dealerPanel) {
		allowBinds = [];
		
		if(!sellingInvSlot || !sellingInvAmount || !invBuyingSlotData || !sellingInvCost) return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Что-то пошло не так #1');");
		if(typeof(fishingMode.rod) !== "undefined") return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Нельзя во время рыбалки');");
		
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(typeof(localPlayer.getVariable("player.money")) === "undefined" || typeof(localPlayer.getVariable("player.inv")) === "undefined") return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Что-то пошло не так #4');");
			if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
				let dealPlayer = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
				if(dealPlayer) {
					if(typeof(dealPlayer.getVariable("player.id")) !== "undefined" && typeof(dealPlayer.getVariable("player.nick")) !== "undefined" && typeof(dealPlayer.getVariable("player.money")) !== "undefined") {
						let myMoney = parseInt(localPlayer.getVariable("player.money"));
						if(myMoney < parseInt(sellingInvCost)) return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Недостаточно средств');");
						if(sellingInvAmount <= 0) return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Что-то пошло не так #2');");
						if(!IsJsonString(invBuyingSlotData)) return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Что-то пошло не так #3');");
						
						if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
							let playerBlocks = localPlayer.getVariable("player.blocks");
							if(typeof(playerBlocks.jail) !== "undefined") return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Трейд в тюрьме не доступен');");
						}
						
						if(fishingStartProcess) return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Трейд во время рыбалки недоступен');");
						
						if(dealPlayer.handle == -1) return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Игрок слишком далеко');");
						if(mp.game.gameplay.getDistanceBetweenCoords(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, dealPlayer.position.x, dealPlayer.position.y, dealPlayer.position.z, true) > 5) return hud_browser.execute("invErrorNotify('#inv_sellAccept', 'Игрок слишком далеко');");
						
						let playerInv = localPlayer.getVariable("player.inv");
						let emptySlot = false;
						for (let i = 1; i <= 30; i++) {
							if(typeof(playerInv[i.toString()]) === "undefined") {
								emptySlot = i.toString();
								break;
							}
						}
						if(!emptySlot) return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Нет свободных мест в инвентаре');");
						
						let dealID = dealPlayer.getVariable("player.id");
						let dealNick = dealPlayer.getVariable("player.nick");
						chatAPI.notifyPush(" * Вы приняли предложение трейда <span style=\"color:#FFF\"><b>"+dealNick+"</b></span> (<span style=\"color:#FFF\"><b>"+dealID+"</b></span>).");
						
						mp.events.callRemote('acceptInventorySell', dealPlayer, sellingInvSlot, sellingInvAmount, invBuyingSlotData, sellingInvCost);
					}else{
						return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Игрок уже оффлайн');");
					}
				}else{
					return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Игрок уже оффлайн');");
				}
			}else{
				return hud_browser.execute("invErrorNotify('#inventory_sellAction', 'Игрок уже оффлайн');");
			}
		}
	}
}
mp.events.add("acceptInventorySell", acceptInventorySell);

function playerAcceptedInventorySell(playerID, playerNick, invSlotData, theAmount, theCost) {
	closeInventory();
	if(sellingInvSlot) sellingInvSlot = false;
	if(sellingInvAmount) sellingInvAmount = false;
	if(invBuyingSlotData) invBuyingSlotData = false;
	if(sellingInvCost) sellingInvCost = false;
		
	if(typeof(playerID) !== "undefined" && typeof(playerNick) !== "undefined" && typeof(invSlotData) !== "undefined" && typeof(theAmount) !== "undefined" && typeof(theCost) !== "undefined" && !dealerPanel) {
		invSlotData = JSON.parse(invSlotData);
		
		let tempName = "Ничего", tempDesc = "Нет описания", tempImg = "none";
		if(typeof(invSlotData.sex) !== "undefined") {
			if(typeof(allStuff[invSlotData.sex]) !== "undefined") {
				let tempData = allStuff[invSlotData.sex];
				if(typeof(tempData[invSlotData.type]) !== "undefined") {
					tempData = tempData[invSlotData.type];
					if(typeof(tempData[invSlotData.hash]) !== "undefined") {
						tempData = tempData[invSlotData.hash];
						if(typeof(tempData.name) !== "undefined") tempName = tempData.name;
						if(typeof(tempData.desc) !== "undefined") tempDesc = tempData.desc;
					}
				}
			}
		}else{
			if(typeof(allStuff[invSlotData.type]) !== "undefined") {
				let tempData = allStuff[invSlotData.type];
				if(typeof(tempData[invSlotData.hash]) !== "undefined") {
					tempData = tempData[invSlotData.hash];
					if(typeof(tempData.name) !== "undefined") tempName = tempData.name;
					if(typeof(tempData.desc) !== "undefined") tempDesc = tempData.desc;
				}
			}
		}
		
		chatAPI.notifyPush(" * <span style=\"color:#FFF\"><b>"+playerNick+"</b></span> (<span style=\"color:#FFF\"><b>"+playerID+"</b></span>) купил у Вас <span style=\"color:#FFF\"><b>"+tempName+"</b></span> за"+theCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.");
		mp.game.ui.messages.showMidsizedShard("~y~Успешный ~w~трейд", "~s~Продано: "+tempName+"~n~Выручка~g~~h~"+theCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~s~руб.", 5, false, true, 5000);
	}
}
mp.events.add("playerAcceptedInventorySell", playerAcceptedInventorySell);

function imAcceptedInventorySell(playerID, playerNick, invSlotData, theAmount, theCost) {
	closeInventory();
	if(sellingInvSlot) sellingInvSlot = false;
	if(sellingInvAmount) sellingInvAmount = false;
	if(invBuyingSlotData) invBuyingSlotData = false;
	if(sellingInvCost) sellingInvCost = false;
		
	if(typeof(playerID) !== "undefined" && typeof(playerNick) !== "undefined" && typeof(invSlotData) !== "undefined" && typeof(theAmount) !== "undefined" && typeof(theCost) !== "undefined" && !dealerPanel) {
		invSlotData = JSON.parse(invSlotData);
		
		let tempName = "Ничего", tempDesc = "Нет описания", tempImg = "none";
		if(typeof(invSlotData.sex) !== "undefined") {
			if(typeof(allStuff[invSlotData.sex]) !== "undefined") {
				let tempData = allStuff[invSlotData.sex];
				if(typeof(tempData[invSlotData.type]) !== "undefined") {
					tempData = tempData[invSlotData.type];
					if(typeof(tempData[invSlotData.hash]) !== "undefined") {
						tempData = tempData[invSlotData.hash];
						if(typeof(tempData.name) !== "undefined") tempName = tempData.name;
						if(typeof(tempData.desc) !== "undefined") tempDesc = tempData.desc;
					}
				}
			}
		}else{
			if(typeof(allStuff[invSlotData.type]) !== "undefined") {
				let tempData = allStuff[invSlotData.type];
				if(typeof(tempData[invSlotData.hash]) !== "undefined") {
					tempData = tempData[invSlotData.hash];
					if(typeof(tempData.name) !== "undefined") tempName = tempData.name;
					if(typeof(tempData.desc) !== "undefined") tempDesc = tempData.desc;
				}
			}
		}
		
		chatAPI.notifyPush(" * Вы купили <span style=\"color:#FFF\"><b>"+tempName+"</b></span> у <span style=\"color:#FFF\"><b>"+playerNick+"</b></span> (<span style=\"color:#FFF\"><b>"+playerID+"</b></span>) за"+theCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.");
		mp.game.ui.messages.showMidsizedShard("~y~Успешный ~w~трейд", "~s~Куплено: "+tempName+"~n~Потрачено~g~~h~"+theCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~s~руб.", 5, false, true, 5000);
	}
}
mp.events.add("imAcceptedInventorySell", imAcceptedInventorySell);

function closeInventory(dataFromInv) {
	if(inventoryPanel) {
		if(typeof(dataFromInv) !== "undefined" && typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			if(dataFromInv != JSON.stringify(localPlayer.getVariable("player.inv"))) {
				inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
				mp.events.callRemote('invSetData', dataFromInv);
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+dataFromInv+"</span>");
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(localPlayer.getVariable("player.inv"))+"</span>");
			}
		}
		deletePedScreen();
		if(hud_browser) {
			hud_browser.execute('toggleInventoryPanel(false);');
			hud_browser.execute('playSound("closeInv", 0.15);');
		}
		mp.gui.cursor.visible = false;
		inventoryPanel = false;
		restoreBinds();
		
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
	}
}
mp.events.add("closeInventory", closeInventory);

function invUse(slot, data, isDead, fullInvData) {
	if(typeof(slot) !== "undefined" && typeof(data) !== "undefined" && typeof(fullInvData) !== "undefined" && typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
		data = JSON.parse(data);
		if(inventorySaving) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь сохраняется, попробуйте позже..</span>");
		if(dealerPanel) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Идёт сделка с барыгой, попробуй позже..</span>");
		
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас есть активная сделка, инвентарь недоступен..</span>");
		}
		
		//mp.game.ui.notifications.showWithPicture("Знакомый механик", slot, isDead.toString(), "CHAR_MECHANIC", 1, false, 1, 2);
		
		if(slotInUse != "0") {
			let myInv = localPlayer.getVariable("player.inv");
			if(typeof(myInv[slotInUse]) !== "undefined") {
				if(slot.toString() == slotInUse.toString()) {
					if(slot == "f1" || slot == "f2" || slot == "f3" || slot == "f4" || slot == "f5" || slot == "f6") fastUseSlotsTiming = 101;
					inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
					ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
					
					localPlayer.taskSwapWeapon(false);
					if(data.hash == "pistol") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "revolver") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "deagle") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "microsmg") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "smg") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "tec") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "pumpshotgun") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "sawn") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "dbshotgun") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "assaultrifle") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "carbine") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "compactrifle") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "sniper") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "nightstick") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "stungun") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					else if(data.hash == "fire") mp.events.callRemote('invHideWeapon', slot, ammoInUse, ammoInUseCount.toString(), isDead, fullInvData);
					
					slotInUse = "0", ammoInUse = "0", ammoInUseCount = CryptoJS.AES.encrypt("0", krKey);
					if(inventoryPanel) closeInventory();
				}else if(data.type == "health") {
					if(localPlayer.isDead()) return false;
					if(fastUseSlotsTiming > 0) return false;
					if(slot == "f1" || slot == "f2" || slot == "f3" || slot == "f4" || slot == "f5" || slot == "f6") fastUseSlotsTiming = 101;
					if(data.hash == "armykit" && mp.game.streaming.hasAnimDictLoaded("amb@world_human_bum_wash@male@high@idle_a")) localPlayer.taskPlayAnim("amb@world_human_bum_wash@male@high@idle_a", "idle_a", 8.0, 8.0, -1, 0, 0.0, false, false, false);
					else if(data.hash == "bandage" && mp.game.streaming.hasAnimDictLoaded("amb@world_human_bum_standing@twitchy@base")) localPlayer.taskPlayAnim("amb@world_human_bum_standing@twitchy@base", "base", 8.0, 8.0, -1, 0, 0.0, false, false, false);
					inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
					mp.events.callRemote('invUseHealth', slot, data.hash, fullInvData);
					if(inventoryPanel) closeInventory();
				}else if(data.type == "weapon") {
					if(typeof(inCasino) !== "undefined") {
						if(inCasino) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нельзя использовать оружие находясь в казино..</span>");
					}
					if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
						if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас есть активная сделка, инвентарь недоступен..</span>");
					}
					if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
						let playerBlocks = localPlayer.getVariable("player.blocks");
						if(typeof(playerBlocks.jail) !== "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь в тюрьме не доступен..</span>");
					}
					if(fishingStartProcess) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь во время рыбалки недоступен..</span>");
					if(localPlayer.isDead()) return false;
					if(fastUseSlotsTiming > 0) return false;
					
					if(data.health > 0) {
						if(slot == "f1" || slot == "f2" || slot == "f3" || slot == "f4" || slot == "f5" || slot == "f6") fastUseSlotsTiming = 101;
						ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
						
						let newAmmoInUse = false;
						if(data.hash == "pistol") newAmmoInUse = "amLL";
						else if(data.hash == "revolver") newAmmoInUse = "amLL";
						else if(data.hash == "deagle") newAmmoInUse = "amLL";
						else if(data.hash == "microsmg") newAmmoInUse = "amLL";
						else if(data.hash == "smg") newAmmoInUse = "amLL";
						else if(data.hash == "tec") newAmmoInUse = "amLL";
						else if(data.hash == "pumpshotgun") newAmmoInUse = "amSG";
						else if(data.hash == "sawn") newAmmoInUse = "amSG";
						else if(data.hash == "dbshotgun") newAmmoInUse = "amSG";
						else if(data.hash == "assaultrifle") newAmmoInUse = "amBL";
						else if(data.hash == "carbine") newAmmoInUse = "amBL";
						else if(data.hash == "compactrifle") newAmmoInUse = "amBL";
						else if(data.hash == "sniper") newAmmoInUse = "amBL";
						else if(data.hash == "nightstick") newAmmoInUse = "false";
						else if(data.hash == "stungun") newAmmoInUse = "false";
						else if(data.hash == "fire") newAmmoInUse = "false";
						
						let newAmmoInUseCount = 0;
						for(let theSlot in myInv) {
							if(myInv[theSlot].hash == newAmmoInUse) newAmmoInUseCount = newAmmoInUseCount + parseInt(myInv[theSlot].amount);
						}
						if(ammoInUse == newAmmoInUse) newAmmoInUseCount = ammoInUseCount;
						
						if(newAmmoInUse) {
							inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
							
							localPlayer.taskSwapWeapon(false);
							mp.events.callRemote('invSwitchWeapon', slotInUse, ammoInUse, ammoInUseCount.toString(), slot, newAmmoInUse, newAmmoInUseCount.toString());
							
							slotInUse = slot;
							ammoInUse = newAmmoInUse;

							ammoInUseCount = CryptoJS.AES.encrypt(newAmmoInUseCount.toString(), krKey);
						}
					}else{
						chatAPI.sysPush("<span style=\"color:#FF6146\"> * Предмет слишком изношен, использование невозможно..</span>");
					}
				}
			}
		}else{
			if(data.type == "weapon") {
				if(inventoryPanel) closeInventory();
				if(typeof(inCasino) !== "undefined") {
					if(inCasino) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нельзя использовать оружие находясь в казино..</span>");
				}
				if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
					if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас есть активная сделка, инвентарь недоступен..</span>");
				}
				if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
					let playerBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(playerBlocks.jail) !== "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь в тюрьме не доступен..</span>");
				}
				if(fishingStartProcess) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь во время рыбалки недоступен..</span>");
				if(localPlayer.isDead()) return false;
				if(fastUseSlotsTiming > 0) return false;
				if(data.health > 0) {
					if(slot == "f1" || slot == "f2" || slot == "f3" || slot == "f4" || slot == "f5" || slot == "f6") fastUseSlotsTiming = 101;
					slotInUse = slot;
					if(data.hash == "pistol") ammoInUse = "amLL";
					else if(data.hash == "revolver") ammoInUse = "amLL";
					else if(data.hash == "deagle") ammoInUse = "amLL";
					else if(data.hash == "microsmg") ammoInUse = "amLL";
					else if(data.hash == "smg") ammoInUse = "amLL";
					else if(data.hash == "tec") ammoInUse = "amLL";
					else if(data.hash == "pumpshotgun") ammoInUse = "amSG";
					else if(data.hash == "sawn") ammoInUse = "amSG";
					else if(data.hash == "dbshotgun") ammoInUse = "amSG";
					else if(data.hash == "assaultrifle") ammoInUse = "amBL";
					else if(data.hash == "carbine") ammoInUse = "amBL";
					else if(data.hash == "compactrifle") ammoInUse = "amBL";
					else if(data.hash == "sniper") ammoInUse = "amBL";
					else if(data.hash == "nightstick") ammoInUse = "false";
					else if(data.hash == "stungun") ammoInUse = "false";
					else if(data.hash == "fire") ammoInUse = "false";
					
					ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
					
					if(ammoInUse != "0") {
						let myInv = localPlayer.getVariable("player.inv");
						for(let theSlot in myInv) {
							if(myInv[theSlot].hash == ammoInUse) ammoInUseCount = ammoInUseCount + parseInt(myInv[theSlot].amount);
						}
						inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
						mp.events.callRemote('invGiveWeapon', data.hash, slotInUse, ammoInUse, ammoInUseCount.toString(), fullInvData);
					}
					
					ammoInUseCount = CryptoJS.AES.encrypt(ammoInUseCount.toString(), krKey);
				}else{
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * Предмет слишком изношен, использование невозможно..</span>");
				}
			}else if(data.type == "health") {
				if(data.health > 0) {
					if(localPlayer.isDead()) return false;
					if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
						if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас есть активная сделка, инвентарь недоступен..</span>");
					}
					if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
						let playerBlocks = localPlayer.getVariable("player.blocks");
						if(typeof(playerBlocks.jail) !== "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь в тюрьме не доступен..</span>");
					}
					if(fishingStartProcess) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь во время рыбалки недоступен..</span>");
					if(fastUseSlotsTiming > 0) return false;
					if(slot == "f1" || slot == "f2" || slot == "f3" || slot == "f4" || slot == "f5" || slot == "f6") fastUseSlotsTiming = 101;
					if(data.hash == "armykit" && mp.game.streaming.hasAnimDictLoaded("amb@world_human_bum_wash@male@high@idle_a")) localPlayer.taskPlayAnim("amb@world_human_bum_wash@male@high@idle_a", "idle_a", 8.0, 8.0, -1, 0, 0.0, false, false, false);
					else if(data.hash == "bandage" && mp.game.streaming.hasAnimDictLoaded("amb@world_human_bum_standing@twitchy@base")) localPlayer.taskPlayAnim("amb@world_human_bum_standing@twitchy@base", "base", 8.0, 8.0, -1, 0, 0.0, false, false, false);
					inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
					mp.events.callRemote('invUseHealth', slot, data.hash, fullInvData);
				}else{
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * Предмет слишком изношен, использование невозможно..</span>");
				}
				if(inventoryPanel) closeInventory();
			}
		}
	}
}
mp.events.add("invUse", invUse);

function updateFastInv() {
	if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
		let playerInv = localPlayer.getVariable("player.inv");
		let emptySlots = true;
		let f1 = {}, f2 = {}, f3 = {}, f4 = {}, f5 = {}, f6 = {};
		for (let i = 1; i <= 6; i++) {
			if(typeof(playerInv["f"+i]) !== "undefined") {
				if(i == 1) f1 = playerInv["f"+i];
				else if(i == 2) f2 = playerInv["f"+i];
				else if(i == 3) f3 = playerInv["f"+i];
				else if(i == 4) f4 = playerInv["f"+i];
				else if(i == 5) f5 = playerInv["f"+i];
				else if(i == 6) f6 = playerInv["f"+i];
				emptySlots = false;
			}
		}
		let sendData = {"f1":f1,"f2":f2,"f3":f3,"f4":f4,"f5":f5,"f6":f6,"slotInUse":slotInUse};
		if(hud_browser) hud_browser.execute("updateFastInv("+emptySlots+", '"+JSON.stringify(sendData)+"');");
	}
}

function invDrop(slot, data, dropAmount) {
	if(inventoryPanel && hud_browser && typeof(slot) !== "undefined" && typeof(data) !== "undefined" && typeof(dropAmount) !== "undefined" && typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
		if(inventoryPanel) closeInventory();
		if(localPlayer.vehicle || localPlayer.isDead()) {
			if(hud_browser) hud_browser.execute('invCEFUpdated();');
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Что-то пошло не так, попробуйте позже..</span>");
		}
		if(inventorySaving || invCEFUpdating || invCEFUpdatingVeh) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь сохраняется, попробуйте позже..</span>");
		if(typeof(localPlayer.getVariable('player.passive')) !== "undefined") {
			if(localPlayer.getVariable('player.passive')) {
				if(hud_browser) hud_browser.execute('invCEFUpdated();');
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нельзя выбросить предмет в пассивном режиме..</span>");
			}
		}
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас есть активная сделка, дроп недоступен..</span>");
		}
		if(dealerPanel) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Идёт сделка с барыгой, попробуй позже..</span>");
		if(typeof(fishingMode.rod) !== "undefined" || typeof(fishingMode.bait) !== "undefined") {
			if(hud_browser) hud_browser.execute('invCEFUpdated();');
			if(slot != "mask" && slot != "head" && slot != "glasses" && slot != "tors" && slot != "shirt" && slot != "watch" && slot != "bracelet" && slot != "pants" && slot != "shoes" && slot != "instrument") {
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Во время рыбалки нельзя выбросить предмет(ы)..</span>");
			}
		}
		
		let myInv = localPlayer.getVariable("player.inv");
		if(typeof(myInv[slot.toString()].amount) !== "undefined") {
			if(parseInt(dropAmount) > 0) {
				if(parseInt(dropAmount) > parseInt(myInv[slot.toString()].amount)) {
					if(hud_browser) hud_browser.execute('invCEFUpdated();');
					return chatAPI.sysPush("<span style=\"color:#FF6146\"> * В слоте нет такого количества..</span>");
				}
			}
		}else{
			if(hud_browser) hud_browser.execute('invCEFUpdated();');
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Что-то пошло не так, попробуйте позже..</span>");
		}
		
		invCEFUpdating = JSON.stringify(localPlayer.getVariable("player.inv"));
		inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
		if(mp.game.streaming.hasAnimDictLoaded("mp_weapon_drop")) localPlayer.taskPlayAnim("mp_weapon_drop", "drop_lh", 8.0, 8.0, -1, 0, 0.0, false, false, false);
		mp.events.callRemote('invDrop', slot, false, dropAmount);
	}
}
mp.events.add("invDrop", invDrop);

function createDropInWorld(colData, dropData) {
	if(typeof(colData) !== "undefined" && typeof(dropData) !== "undefined") {
		if(typeof(dropsInStream) !== "undefined") {
			if(typeof(dropsInStream[colData.colID.toString()]) === "undefined") {
				let dropObj = false;
				switch (dropData.type) {
					case "fish":
						colData.pos.z = colData.pos.z - 0.95;
						dropObj = mp.objects.new(mp.game.joaat("prop_bucket_02a"), colData.pos,
						{
							rotation: new mp.Vector3(0,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "mask":
						colData.pos.z = colData.pos.z - 0.95;
						dropObj = mp.objects.new(mp.game.joaat("prop_mask_test_01"), colData.pos,
						{
							rotation: new mp.Vector3(-90,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "bag":
						colData.pos.z = colData.pos.z - 0.95;
						dropObj = mp.objects.new(mp.game.joaat("p_michael_backpack_s"), colData.pos,
						{
							rotation: new mp.Vector3(-90,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "head":
						colData.pos.z = colData.pos.z - 0.85;
						dropObj = mp.objects.new(mp.game.joaat("prop_ld_hat_01"), colData.pos,
						{
							rotation: new mp.Vector3(0,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "glasses":
						colData.pos.z = colData.pos.z - 0.98;
						dropObj = mp.objects.new(mp.game.joaat("prop_cs_sol_glasses"), colData.pos,
						{
							rotation: new mp.Vector3(0,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "tors":
						colData.pos.z = colData.pos.z - 0.95;
						dropObj = mp.objects.new(mp.game.joaat("prop_ld_shirt_01"), colData.pos,
						{
							rotation: new mp.Vector3(0,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "watch":
						colData.pos.z = colData.pos.z - 0.98;
						dropObj = mp.objects.new(mp.game.joaat("p_watch_01"), colData.pos,
						{
							rotation: new mp.Vector3(0,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "bracelet":
						colData.pos.z = colData.pos.z - 0.95;
						dropObj = mp.objects.new(mp.game.joaat("v_res_mbathpot"), colData.pos,
						{
							rotation: new mp.Vector3(0,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "pants":
						colData.pos.z = colData.pos.z - 0.95;
						dropObj = mp.objects.new(mp.game.joaat("prop_cs_tshirt_ball_01"), colData.pos,
						{
							rotation: new mp.Vector3(0,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
					case "shoes":
						colData.pos.z = colData.pos.z - 0.95;
						dropObj = mp.objects.new(mp.game.joaat("prop_ld_shoe_01"), colData.pos,
						{
							rotation: new mp.Vector3(0,0,0),
							alpha: 255,
							dimension: localPlayer.dimension
						});
						break;
				}
				
				if(!dropObj) {
					switch (dropData.hash) {
						case "lockpicks":
							colData.pos.z = colData.pos.z - 1.0;
							dropObj = mp.objects.new(mp.game.joaat("p_car_keys_01"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "rod":
							colData.pos.z = colData.pos.z - 0.9;
							dropObj = mp.objects.new(mp.game.joaat("prop_fishing_rod_01"), colData.pos,
							{
								rotation: new mp.Vector3(90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "badrod":
							colData.pos.z = colData.pos.z - 0.9;
							dropObj = mp.objects.new(mp.game.joaat("prop_fishing_rod_01"), colData.pos,
							{
								rotation: new mp.Vector3(90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "spinning":
							colData.pos.z = colData.pos.z - 0.9;
							dropObj = mp.objects.new(mp.game.joaat("prop_fishing_rod_01"), colData.pos,
							{
								rotation: new mp.Vector3(90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "aqualang":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("p_s_scuba_tank_s"), colData.pos,
							{
								rotation: new mp.Vector3(40,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "armykit":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_ld_health_pack"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "bandage":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_stat_pack_01"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "amLL":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("gr_prop_gr_bulletscrate_01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "amBL":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("gr_prop_gr_crate_mag_01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "amSG":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("gr_prop_gr_crate_pistol_02a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "amRO":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("gr_prop_gr_missle_short"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "fire":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_fire_exting_1a"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "pistol":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_pi_pistol"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "revolver":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_pi_vintage_pistol"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "deagle":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_pi_pistol50"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "microsmg":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_sb_microsmg"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "smg":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_sb_smg"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "tec":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_sb_smg"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "pumpshotgun":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_sg_pumpshotgun"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "sawn":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_sg_sawnoff"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "dbshotgun":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_sg_sawnoff"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "assaultrifle":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_ar_assaultrifle"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "carbine":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_ar_carbinerifle"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "compactrifle":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_ar_assaultrifle"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "sniper":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("w_sr_sniperrifle"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "scrap":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_rub_litter_03"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "microchips":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("xm_prop_vancrate_01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "largeskin":
							colData.pos.z = colData.pos.z - 1.1;
							dropObj = mp.objects.new(mp.game.joaat("ex_office_swag_furcoats3"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "littleskin":
							colData.pos.z = colData.pos.z - 1.1;
							dropObj = mp.objects.new(mp.game.joaat("ex_office_swag_furcoats3"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "animalfat":
							colData.pos.z = colData.pos.z - 0.98;
							dropObj = mp.objects.new(mp.game.joaat("hei_prop_heist_drug_tub_01"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "animalmeat":
							colData.pos.z = colData.pos.z - 1.05;
							dropObj = mp.objects.new(mp.game.joaat("sm_prop_smug_crate_m_01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "animalbones":
							colData.pos.z = colData.pos.z - 1.05;
							dropObj = mp.objects.new(mp.game.joaat("v_res_smallplasticbox"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "gold":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_gold_bar"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "bloodworm":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_bar_beans"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "bread":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_bar_beans"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "insects":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_bar_beans"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "minifish":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_bar_beans"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "worms":
							colData.pos.z = colData.pos.z - 0.95;
							dropObj = mp.objects.new(mp.game.joaat("prop_bar_beans"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "stecoil":
							colData.pos.z = colData.pos.z - 1.0;
							dropObj = mp.objects.new(mp.game.joaat("ng_proc_oilcan01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "roweoil":
							colData.pos.z = colData.pos.z - 1.0;
							dropObj = mp.objects.new(mp.game.joaat("ng_proc_oilcan01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "shelloil":
							colData.pos.z = colData.pos.z - 1.0;
							dropObj = mp.objects.new(mp.game.joaat("ng_proc_oilcan01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "lukoiloil":
							colData.pos.z = colData.pos.z - 1.0;
							dropObj = mp.objects.new(mp.game.joaat("ng_proc_oilcan01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "stecgasprem":
							colData.pos.z = colData.pos.z - 1.06;
							dropObj = mp.objects.new(mp.game.joaat("ng_proc_ojbot_01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "stecgasplus":
							colData.pos.z = colData.pos.z - 1.06;
							dropObj = mp.objects.new(mp.game.joaat("ng_proc_ojbot_01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "stecgassga":
							colData.pos.z = colData.pos.z - 1.06;
							dropObj = mp.objects.new(mp.game.joaat("ng_proc_ojbot_01a"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "oilfilter":
							colData.pos.z = colData.pos.z - 1.06;
							dropObj = mp.objects.new(mp.game.joaat("prop_coolbox_01"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "airfilter":
							colData.pos.z = colData.pos.z - 1.06;
							dropObj = mp.objects.new(mp.game.joaat("prop_coolbox_01"), colData.pos,
							{
								rotation: new mp.Vector3(0,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "nightstick":
							colData.pos.z = colData.pos.z - 0.96;
							dropObj = mp.objects.new(mp.game.joaat("w_me_nightstick"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "stungun":
							colData.pos.z = colData.pos.z - 0.96;
							dropObj = mp.objects.new(mp.game.joaat("w_pi_stungun"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "zhezl":
							colData.pos.z = colData.pos.z - 0.96;
							dropObj = mp.objects.new(mp.game.joaat("w_at_sr_supp"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "hunterknife":
							colData.pos.z = colData.pos.z - 0.96;
							dropObj = mp.objects.new(mp.game.joaat("prop_ld_w_me_machette"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
						case "parachute":
							colData.pos.z = colData.pos.z - 0.96;
							dropObj = mp.objects.new(mp.game.joaat("hei_p_parachute_s_female"), colData.pos,
							{
								rotation: new mp.Vector3(-90,0,0),
								alpha: 255,
								dimension: localPlayer.dimension
							});
							break;
					}
				}
				
				let dropCheck = mp.checkpoints.new(40, new mp.Vector3(colData.pos.x, colData.pos.y, colData.pos.z+0.5), 1.2,
				{
					direction: new mp.Vector3(0, 0, 75),
					color: [255, 255, 255, 0],
					visible: true,
					dimension: localPlayer.dimension
				});
				dropCheck.colID = colData.colID;
				dropCheck.dropData = dropData;
				
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> "+mp.checkpoints.exists(dropCheck).toString()+"</span>");
				//mp.events.call("sleepAntiCheat");
				//localPlayer.position = dropCheck.position;
				
				let dropArray = {'object':dropObj.id.toString(),'check':dropCheck.id.toString(),'colPOS':colData.pos,'drop':dropData,'alpha':0};
				dropsInStream[colData.colID.toString()] = dropArray;
			}
		}
	}
}

/*
mp.events.addDataHandler("col.data", function (entity, value, oldValue) {
	if(entity.type == 'colshape' && entity.handle != 0) {
		if(typeof(entity.getVariable("col.type")) !== "undefined") {
			if(entity.getVariable("col.type") == "dropInv_render") {
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Опача: "+JSON.stringify(value)+"</span>");
				if(value && !oldValue) {
					let colData = entity.getVariable('col.data');
					let dropData = colData.drop;
					createDropInWorld(colData, dropData);
				}
			}
		}
	}
});
*/

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'lootInv_render') {
				if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
					let myBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(myBlocks.lootBlock) === "undefined") {
						let colData = shape.getVariable('col.data');
						let lootData = colData.loot;
						colData.pos.z = colData.pos.z - 0.95;
						let lootObj = false;
						lootObj = mp.objects.new(mp.game.joaat(colData.obj.hash), colData.pos,
						{
							rotation: colData.obj.rot,
							alpha: 255,
							dimension: 0
						});
						
						let lootCheck = mp.checkpoints.new(40, new mp.Vector3(colData.pos.x, colData.pos.y, colData.pos.z+0.5), 1.3,
						{
							color: [255, 255, 255, 0],
							visible: true,
							dimension: localPlayer.dimension
						});
						lootCheck.colID = colData.colID;
						lootCheck.thetype = colData.type;
						lootCheck.lootData = lootData;
						
						let lootArray = {'object':lootObj,'type':colData.type,'name':colData.obj.name,'check':lootCheck,'colID':colData.colID,'colPOS':colData.pos,'loot':lootData,'alpha':0};
						lootsInStream.push(lootArray);
					}
				}
			}
			if(colType == 'dropInv_render') {
				if(typeof(shape.getVariable('col.data')) !== "undefined") {
					let colData = shape.getVariable('col.data');
					let dropData = colData.drop;
					createDropInWorld(colData, dropData);
				}
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> 1</span>");
			if(typeof(checkpoint.colID) !== "undefined" && typeof(checkpoint.dropData) !== "undefined") {
				putDrop.push({"id":checkpoint.colID,"data":checkpoint.dropData});
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * TEST: "+JSON.stringify(putDrop)+"..</span>");
			}
			if(typeof(checkpoint.colID) !== "undefined" && typeof(checkpoint.lootData) !== "undefined") {
				lootElement = {"id":checkpoint.colID,"thetype":checkpoint.thetype,"data":checkpoint.lootData};
			}
		}
	}
});

function lootOpened(data) {
	if(data) {
		lootMakes++;
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * LOOT: "+data+"..</span>");
		let jsonData = JSON.parse(data);
		let isOpen = true, isNotOpenReason = false;
		if(typeof(jsonData) !== "undefined") {
			if(typeof(jsonData.thetype) !== "undefined") {
				if(jsonData.thetype == "xmas") {
					if(hud_browser) hud_browser.execute('playSound("xmas", 0.15);');
				}else if(jsonData.thetype == "animal") {
					if(typeof(jsonData.data) !== "undefined" && typeof(elementLooting.id) !== "undefined") {
						if(hud_browser) hud_browser.execute('playSound("lootAnimalFinal", 0.35);');
						jsonData.loot = [];
						// Формируем лут-контент
						
						let lootData = jsonData.data;
						
						if(lootData.quality == 0) {
							isOpen = false;
							isNotOpenReason = "Тушка этого с признаками болезни, продолжайте охоту..";
						}else{
							let tempPed = mp.peds.atRemoteId(parseInt(elementLooting.id));
							if(typeof(tempPed.getVariable("ped.data")) !== "undefined") {
								let tempPedData = tempPed.getVariable("ped.data");
								let deleter = 0;
								if(tempPedData.age == "adult") deleter = 2;
								else if(tempPedData.age == "old") deleter = 4;
								
								let resultLoot = JSON.parse(JSON.stringify(lootData.maxcomps));
								for (var prop in resultLoot) {
									let amount = resultLoot[prop];
									if(amount > 0 && deleter) {
										amount = roundNumber(amount / deleter, 0);
										if(amount <= 0) amount = 1;
									}
									jsonData.loot.push({"type":"component","hash":prop,"amount":amount,"health":100});
								}
							}else{
								isOpen = false;
							}
						}
					}else{
						isOpen = false;
						isNotOpenReason = "Тушка этого животного протухла, продолжайте охоту..";
					}
				}
			}
		}
		if(isOpen) mp.events.callRemote('lootOpened', JSON.stringify(jsonData));
		else chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+isNotOpenReason+"</span>");
		elementLooting = false;
		localPlayer.clearTasksImmediately();
		localPlayer.freezePosition(false);
		return restoreBinds();
	}
}

var dealerPanel = false;

mp.keys.bind(0x45, true, function() { // E Key (LOOT) DOWN
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x45)) return false;
	
	if(!localPlayer.vehicle && !localPlayer.isDead() && typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
		// Проверка на убитого животного перед ебалом
		let startPosition = localPlayer.position;
		let farAway = JSON.parse(JSON.stringify(startPosition));
		farAway.z = farAway.z + 2;
		let isPedShooted = mp.raycasting.testCapsule(startPosition, farAway, 2.0, null, 8);
		//if(typeof(isPedShooted.entity) === 'number' && isPedShooted.entity !== 0 && mp.game.entity.isAnObject(isPedShooted.entity)) { mp.game.shapetest.releaseScriptGuidFromEntity(isPedShooted.entity); }
		
		let pedShooted = false, pedData = false;
		if(isPedShooted) {
			if(typeof(isPedShooted.entity) !== "undefined") {
				let tempPedShooted = mp.peds.atHandle(isPedShooted.entity.handle);
				if(mp.peds.exists(tempPedShooted)) {
					if(tempPedShooted.isDead()) {
						if(typeof(tempPedShooted.getVariable("ped.type")) !== "undefined" && typeof(tempPedShooted.getVariable("ped.data")) !== "undefined") {
							let pedType = tempPedShooted.getVariable("ped.type");
							if(pedType == "animal") {
								pedShooted = tempPedShooted;
								pedData = tempPedShooted.getVariable("ped.data");
							}
						}
					}
				}
			}
		}
		
		if(pedShooted && pedData && pedShooted.remoteId) {
			if(typeof(localPlayer.getVariable('player.passive')) !== "undefined") {
				if(localPlayer.getVariable('player.passive')) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нельзя освежёвывать животных в пассивном режиме..</span>");
			}
			
			if(typeof(localPlayer.getVariable('player.inv')) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас не инициализирован инвентарь..</span>");
			
			let myInv = localPlayer.getVariable('player.inv');
			if(typeof(myInv.instrument) !== "undefined") {
				if(typeof(myInv.instrument.hash) !== "undefined") {
					if(myInv.instrument.hash != "hunterknife") {
						return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Для освежевания тушки требуется охотничий нож, купите в 24/7..</span>");
					}else{
						if(typeof(myInv.instrument.health) !== "undefined") {
							if(myInv.instrument.health <= 0) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Охотничий нож слишком изношен..</span>");
						}
					}
				}
			}else{
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Для освежевания тушки требуется охотничий нож, купите в 24/7..</span>");
			}
			
			localPlayer.taskPlayAnim("amb@world_human_gardener_plant@female@idle_a", "idle_a_female", 8.0, 1.0, -1, 1, 1.0, false, false, false);
			
			allowBinds = [0x45];
			elementLooting = {"id":pedShooted.remoteId,"thetype":"animal","data":pedData};
			return elementLooting.tick = 0;
			//return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Лутаем педоффку "+pedShooted.remoteId+"? :D</span>");
		}
				
		if(lootElement && !inventorySaving) {
			if(typeof(localPlayer.getVariable('player.passive')) !== "undefined") {
				if(localPlayer.getVariable('player.passive')) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нельзя лутать в пассивном режиме..</span>");
			}
			
			localPlayer.taskPlayAnim("missheist_jewel@hacking", "hack_loop", 8.0, 1.0, -1, 1, 1.0, false, false, false);
			
			allowBinds = [0x45];
			elementLooting = lootElement;
			return elementLooting.tick = 0;
		}
		
		let myPos = localPlayer.position;
		mp.peds.forEachInStreamRange(
			(ped, id) => {
				if(ped.isOnScreen() && typeof(ped.getVariable("ped.type")) !== "undefined") {
					let pedType = ped.getVariable("ped.type");
					if(pedType == "dealer") {
						let pedPos = ped.position;
						let distance = mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, pedPos.x, pedPos.y, pedPos.z, true);
						if(distance <= 1) {
							ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
							if(slotInUse != "0" || ammoInUseCount > 0) {
								ammoInUseCount = CryptoJS.AES.encrypt((ammoInUseCount).toString(), krKey);
								return chatAPI.sysPush("<span style=\"color:#FF6146\"> * С оружием к барыге нельзя, уберите оружие.</span>");
							}
							ammoInUseCount = CryptoJS.AES.encrypt((ammoInUseCount).toString(), krKey);
							
							if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
								if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас есть активная сделка, барыга недоступен..</span>");
							}
							
							if(typeof(localPlayer.getVariable('player.passive')) !== "undefined") {
								if(localPlayer.getVariable('player.passive')) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нельзя совершать сделку с барыгой в пассивном режиме..</span>");
							}
							
							let myInv = localPlayer.getVariable('player.inv');
							if(typeof(myInv.instrument) !== "undefined") {
								if(typeof(myInv.instrument.hash) !== "undefined") {
									return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нельзя совершать сделку с активным инструментом, уберите его..</span>");
								}
							}
							
							if(typeof(mp.world.data.lootCosts) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Барыга не хочет с Вами взаимодействовать..</span>");
							let playerInv = localPlayer.getVariable("player.inv");
							if(!allowBinds || !Array.isArray(allowBinds)) return false;
							if(!allowBinds.includes(0x72)) return false;
							if(inventorySaving) return false;
							
							if(hud_browser) {
								allowBinds = [];
								hud_browser.execute('toggleDealerPanel(\''+JSON.stringify(playerInv)+'\', \''+JSON.stringify(mp.world.data.lootCosts)+'\');');
								mp.gui.cursor.visible = true;
								dealerPanel = true;
							}
							
							return false;
						}
					}
				}
			}
		);
	}
});

mp.keys.bind(0x45, false, function() { // E Key (PUT or ACTION) UP
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x45)) return false;
	
	if(elementLooting) {
		elementLooting = false;
		localPlayer.clearTasksImmediately();
		localPlayer.freezePosition(false);
		return restoreBinds();
	}
	
	if(!localPlayer.vehicle && !localPlayer.isDead() && typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
		if(putDrop && !inventorySaving) {
			if(typeof(localPlayer.getVariable('player.passive')) !== "undefined") {
				if(localPlayer.getVariable('player.passive') && Object.keys(putDrop).length > 0) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нельзя подобрать предмет в пассивном режиме..</span>");
			}
			
			let playerInv = localPlayer.getVariable("player.inv");
			
			let emptySlot = false;
			for (let i = 1; i <= 30; i++) {
				if(typeof(playerInv[i.toString()]) === "undefined") {
					emptySlot = i.toString();
					break;
				}
			}
			
			if(emptySlot) {
				if(!inventorySaving && !dealerPanel && !afInvPutting && Object.keys(putDrop).length > 0) {
					let tempPutDrop = putDrop[Object.keys(putDrop).length-1];
					if(typeof(tempPutDrop.id) !== "undefined") {
						let puttingDrop = mp.colshapes.atRemoteId(tempPutDrop.id);
						if(puttingDrop) {
							if(mp.colshapes.exists(puttingDrop)) {
								allowBinds = [];
								dropPutting = true;
								
								afInvPutting = true;
								setTimeout(function() { afInvPutting = false }, 1500);
								
								inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
								mp.events.callRemote('invPut', tempPutDrop.id);
								
								delete putDrop[Object.keys(putDrop).length-1];
								putDrop = putDrop.filter(function (el) { return el != null; });
								
								return false;
							}
						}
					}
				}
			}else{
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нет свободных мест в инвентаре..</span>");
				return false;
			}
		}
		
		if(typeof(fishingMode.rod) !== "undefined" && typeof(fishingMode.bait) === "undefined" && !fishingStartProcess && typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			if(localPlayer.isInWater()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы не можете закинуть удочку вплавь..</span>");
			
			let playerInv = localPlayer.getVariable("player.inv");
			
			let emptySlot = false;
			for (let i = 1; i <= 30; i++) {
				if(typeof(playerInv[i.toString()]) === "undefined") {
					emptySlot = i.toString();
					break;
				}
			}
			
			if(!emptySlot) {
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Нет свободных мест в инвентаре..</span>");
			}else{
				if(mp.game.invoke("0x4805D2B1D8CF94A9", localPlayer.handle) != 0) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы должны находится в неподвижном состоянии..</span>");
				else return fishingStart();
			}
		}else if(typeof(fishingMode.rod) !== "undefined" && typeof(fishingMode.bait) !== "undefined") {
			if(!chatActive) {
				if(fishingMode.poklevka) {
					if(!fishingMode.putting) return poklevkaOk();
					else return false;
				}else{
					return fishingStop();
				}
			}
		}
		
		if(theftVeh) {
			if(mp.vehicles.exists(theftVeh)) {
				let myPos = localPlayer.position;
				let vehPos = theftVeh.position;
				let tempDist = mp.game.system.vdist2(myPos.x, myPos.y, myPos.z, vehPos.x, vehPos.y, vehPos.z);
				if(tempDist <= 4.2) {
					allowBinds = [0x46, 0x0D];
					if(hud_browser) hud_browser.execute('toggleTheftVeh(true);');
					localPlayer.taskPlayAnim(
						'mini@safe_cracking',
						'dial_turn_clock_normal',
						8.0,
						1000,
						-1,
						2,
						0,
						false,
						false,
						false
					);
				}else{
					mp.game.ui.messages.showMidsized("~w~Слишком ~r~далеко", "~w~Слишком далеко ~s~от ~r~замка~w~ транспорта.");
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * Слишком далеко от замка, попробуйте вскрыть ещё раз..</span>");
					theftVeh = false;
				}
			}else{
				theftVeh = false;
			}
		}
	}
	
	if(fastOpenSMS) return fastOpenSMSFunc();
});

function cancelVehTheft() {
	if(theftVeh) {
		theftVeh = false;
		if(hud_browser) hud_browser.execute('toggleTheftVeh(false);');
		localPlayer.clearTasks();
		restoreBinds();
	}
}

mp.keys.bind(0x46, true, function() {
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x46)) return false;
	
	if(theftVeh) cancelVehTheft();
});

mp.keys.bind(0x0D, true, function() {
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x0D)) return false;
	
	if(theftVeh) cancelVehTheft();
});

mp.events.add("dealerMakeDeal", (scrapCount, microchipsCount, goldCount, largeskinCount, littleskinCount, animalfatCount, animalmeatCount, animalbonesCount, amLLCount, amBLCount, amSGCount, deadfishCount, plotvaCount, krasnoperkaCount, ukleykaCount, peskarCount, karasCount, leshCount, zherekhCount, gusteraCount, golavlCount, sazanCount, forelCount, lososCount, tunecCount, scatCount, belugaCount, littlesharkCount) => {
	if(typeof(scrapCount) !== "undefined" && typeof(microchipsCount) !== "undefined" && typeof(goldCount) !== "undefined" && typeof(largeskinCount) !== "undefined" && typeof(littleskinCount) !== "undefined" && typeof(animalfatCount) !== "undefined" && typeof(animalmeatCount) !== "undefined" && typeof(animalbonesCount) !== "undefined" && typeof(amLLCount) !== "undefined" && typeof(amBLCount) !== "undefined" && typeof(amSGCount) !== "undefined" &&
		typeof(deadfishCount) !== "undefined" && typeof(plotvaCount) !== "undefined" && typeof(krasnoperkaCount) !== "undefined" && typeof(ukleykaCount) !== "undefined" && typeof(peskarCount) !== "undefined" && typeof(karasCount) !== "undefined" && typeof(leshCount) !== "undefined" && 
		typeof(zherekhCount) !== "undefined" && typeof(gusteraCount) !== "undefined" && typeof(golavlCount) !== "undefined" && typeof(sazanCount) !== "undefined" && typeof(forelCount) !== "undefined" && typeof(lososCount) !== "undefined" && 
		typeof(tunecCount) !== "undefined" && typeof(scatCount) !== "undefined" && typeof(belugaCount) !== "undefined" && typeof(littlesharkCount) !== "undefined") {
			if(inventorySaving) return false;
			inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
			mp.events.callRemote('dealerMakeDeal', scrapCount, microchipsCount, goldCount, largeskinCount, littleskinCount, animalfatCount, animalmeatCount, animalbonesCount, amLLCount, amBLCount, amSGCount, deadfishCount, plotvaCount, krasnoperkaCount, ukleykaCount, peskarCount, karasCount, leshCount, zherekhCount, gusteraCount, golavlCount, sazanCount, forelCount, lososCount, tunecCount, scatCount, belugaCount, littlesharkCount);
	}else{
		restoreBinds();
		if(hud_browser) {
			hud_browser.execute('toggleDealerPanel();');
			chatAPI.sysPush("<span style=\"color:#FF6146\"> * Барыга отказался от сделки, попробуйте ещё раз..</span>");
		}
		mp.gui.cursor.visible = false;
		dealerPanel = false;
	}
});

mp.events.add("dealerMakeDealResult", (resultat, reasonOrMoney) => {
	if(typeof(resultat) !== "undefined" && typeof(reasonOrMoney) !== "undefined") {
		restoreBinds();
		if(hud_browser) {
			hud_browser.execute('toggleDealerPanel();');
			if(!resultat) {
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+reasonOrMoney+"</span>");
				if(inventorySaving) inventorySaving = false;
			}else{
				mp.game.ui.messages.showMidsizedShard("~w~Сделка с барыгой ~g~состоялась", "~s~Вы получили"+reasonOrMoney.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.", 5, false, true, 8000);
				chatAPI.warningPush(" * Вы получили от барыги<span style=\"color:#FEBC00\"><b>"+reasonOrMoney.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
			}
		}
		mp.gui.cursor.visible = false;
		dealerPanel = false;
	}
});

mp.events.add("closeDealerPanel", () => {
	if(hud_browser) {
		restoreBinds();
		hud_browser.execute('toggleDealerPanel();');
		mp.gui.cursor.visible = false;
		dealerPanel = false;
	}
});

mp.events.add("invItemPutted", (result) => {
	if(typeof(result) !== "undefined") {
		if(result) {
			if(mp.game.streaming.hasAnimDictLoaded("anim@heists@narcotics@trash")) localPlayer.taskPlayAnim("anim@heists@narcotics@trash", "drop_front", 8.0, 8.0, -1, 0, 0.0, false, false, false);
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * RESULT "+result.toString()+"</span>");
			result = JSON.parse(result);
			if(typeof(result.hash) !== "undefined" && typeof(result.amount) !== "undefined") {
				let dropName = result.hash;
				if(typeof(result.sex) === "undefined") {
					if(typeof(allStuff[result.type][result.hash]) !== "undefined") {
						if(result.type == "ammo") {
							ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
							if(result.hash == ammoInUse && ammoInUseCount >= 0) ammoInUseCount = ammoInUseCount + parseInt(result.amount);
							ammoInUseCount = CryptoJS.AES.encrypt(ammoInUseCount.toString(), krKey);
						}
						let tempData = allStuff[result.type][result.hash];
						if(typeof(tempData.name) !== "undefined") dropName = tempData.name.toLowerCase();
						if(result.amount <= 1) chatAPI.sysPush("<span style=\"color:#47E23C\"> * Вы подняли <b><span style=\"color:#FFF\">"+dropName+"</span></b></span>");
						else chatAPI.sysPush("<span style=\"color:#47E23C\"> * Вы подняли <b><span style=\"color:#FFF\">"+dropName+"</span></b> в количестве <b><span style=\"color:#FFF\">"+result.amount+"</span></b> шт.</span>");
					}
				}else{
					if(typeof(allStuff[result.sex][result.type][result.hash]) !== "undefined") {
						let tempData = allStuff[result.sex][result.type][result.hash];
						if(typeof(tempData.name) !== "undefined") dropName = tempData.name.toLowerCase();
						if(result.sex == "male") chatAPI.sysPush("<span style=\"color:#47E23C\"> * Вы подняли мужскую одежду, <b><span style=\"color:#FFF\">"+dropName+"</span></b></span>");
						else chatAPI.sysPush("<span style=\"color:#47E23C\"> * Вы подняли женскую одежду, <b><span style=\"color:#FFF\">"+dropName+"</span></b></span>");
					}
				}
			}
		}else{
			if(dropPutting) {
				restoreBinds();
				dropPutting = false;
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.colID) !== "undefined" && typeof(checkpoint.dropData) !== "undefined") {
				for(var i in putDrop) {
					let tempData = putDrop[i];
					if (checkpoint.colID == tempData.id) {
						if(putDrop[i] || putDrop[i] !== undefined) delete putDrop[i];
					}
				}
				putDrop = putDrop.filter(function (el) { return el != null; });
			}
			if(typeof(checkpoint.colID) !== "undefined" && typeof(checkpoint.lootData) !== "undefined") {
				lootElement = false;
				if(elementLooting) {
					elementLooting = false;
					localPlayer.clearTasksImmediately();
					localPlayer.freezePosition(false);
					restoreBinds();
				}
			}
		}
	}
});

function fullRemoveLoots() {
	if(typeof(lootsInStream) != "undefined" && Object.keys(lootsInStream).length > 0) {
		for(var i in lootsInStream) {
			let tempData = lootsInStream[i];
			if(tempData['object']) {
				tempData['object'].destroy();
				delete tempData['object'];
			}
			if(tempData['check']) {
				tempData['check'].destroy();
				delete tempData['check'];
			}
			if(lootsInStream[i] || lootsInStream[i] !== undefined) delete lootsInStream[i];
		}
		lootsInStream = lootsInStream.filter(function (el) { return el != null; });
	}
}

mp.events.add('playerExitColshape', (shape) => {
	if(mp.colshapes.exists(shape)) {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'lootInv_render') {
				let colData = shape.getVariable('col.data');
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * OUT "+colData.colID+"</span>");
				for(var i in lootsInStream) {
					let tempData = lootsInStream[i];
					if (colData.colID == tempData.colID) {
						if(tempData['object']) {
							tempData['object'].destroy();
							delete tempData['object'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(lootsInStream[i] || lootsInStream[i] !== undefined) delete lootsInStream[i];
					}
				}
				lootsInStream = lootsInStream.filter(function (el) { return el != null; });
			}
			if(colType == 'dropInv_render') {
				let colData = shape.getVariable('col.data');
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * OUT "+colData.colID+"</span>");
				if(typeof(dropsInStream[colData.colID.toString()]) !== "undefined") {
					let tempData = dropsInStream[colData.colID.toString()];
					if(tempData['object']) {
						if(mp.objects.exists(mp.objects.at(parseInt(tempData['object'])))) mp.objects.at(parseInt(tempData['object'])).destroy();
					}
					if(tempData['check']) {
						if(mp.checkpoints.exists(mp.checkpoints.at(parseInt(tempData['check'])))) mp.checkpoints.at(parseInt(tempData['check'])).destroy();
					}
					dropsInStream[colData.colID.toString()] = undefined;
					dropsInStream = JSON.parse(JSON.stringify(dropsInStream));
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * RES "+JSON.stringify(dropsInStream)+"</span>");
				}
			}
		}
	}
});

function updInvPers(data, updatePers, vehData) {
	if(typeof(data) !== "undefined" && typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
		if(inventorySaving || invCEFUpdating || invCEFUpdatingVeh) {
			if(inventoryPanel) closeInventory();
			if(hud_browser) hud_browser.execute('invCEFUpdatedVeh();');
			if(hud_browser) hud_browser.execute('invCEFUpdated();');
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Инвентарь сохраняется, попробуйте позже..</span>");
		}
		if(myVehSaving) {
			if(inventoryPanel) closeInventory();
			if(hud_browser) hud_browser.execute('invCEFUpdatedVeh();');
			if(hud_browser) hud_browser.execute('invCEFUpdated();');
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Транспорт сохраняется, инвентарь недоступен, попробуйте позже..</span>");
		}
		
		if(localPlayer.getParachuteState() == 0 || !localPlayer.getParachuteState()) {
			let myInv = localPlayer.getVariable("player.inv");
			let tempData = JSON.parse(data);
			if(typeof(myInv.instrument) !== "undefined" && typeof(tempData.instrument) === "undefined") {
				if(typeof(myInv.instrument.hash) !== "undefined") {
					if(myInv.instrument.hash == "parachute") {
						if(inventoryPanel) closeInventory();
						if(hud_browser) hud_browser.execute('invCEFUpdatedVeh();');
						if(hud_browser) hud_browser.execute('invCEFUpdated();');
						return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы уже используете парашют, инвентарь недоступен, попробуйте позже..</span>");
					}
				}
			}
		}
		
		let theVeh = localPlayer.vehicle;
		if(vehData) {
			if(!theVeh) {
				if(inventoryPanel) closeInventory();
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Произошла ошибка синхронизации багажника транспорта..</span>");
			}
			if(typeof(theVeh.getVariable("veh.id")) === "undefined") {
				if(inventoryPanel) closeInventory();
				return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Произошла ошибка синхронизации багажника транспорта..</span>");
			}
			let JSONvehData = JSON.parse(vehData);
			if(theVeh.getVariable("veh.id") != JSONvehData.id) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Произошла ошибка синхронизации багажника транспорта..</span>");
			invCEFUpdatingVeh = JSONvehData.id;
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Сохраняем ИНВ тачки..</span>");
		}
		
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Сохраняем ПЕРСА..</span>");
		
		inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
		invCEFUpdating = JSON.stringify(localPlayer.getVariable("player.inv"));
		
		mp.events.callRemote('updInvPers', data, updatePers, false, theVeh, vehData);
	}
}
mp.events.add("updInvPers", updInvPers);

var damagedList = [];
function youDamage(targetEntity, isDeath, boneIndex, minusHP, position) {
	if(typeof(targetEntity) !== "undefined" && typeof(isDeath) !== "undefined" && typeof(minusHP) !== "undefined" && typeof(position) !== "undefined") {
		if(minusHP > 0) {
			if(hud_browser) {
				if(boneIndex == 20) hud_browser.execute('playSound("headshot", 0.15);');
				else hud_browser.execute('playSound("hit", 0.15);');
			}
			damagedList.push({"isDeath":isDeath,"boneIndex":boneIndex,"minusHP":minusHP,"position":position,"count":0});
			//if(isDeath) killCam(targetEntity);
		}
	}
}
mp.events.add("youDamage", youDamage);

var imGodeFuckingMode = false;
mp._events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
	let passiveChecker = true;
	if(typeof(localPlayer.getVariable('player.fraction')) !== "undefined") {
		let myFraction = localPlayer.getVariable('player.fraction');
		if(typeof(myFraction.name) !== "undefined") {
			if(myFraction.name == "ПОЛИЦИЯ") passiveChecker = false;
		}
	}
	if(targetEntity.vehicle) {
		let theVeh = targetEntity.vehicle;
		if(typeof(theVeh.getVariable("veh.theft")) !== "undefined" || typeof(theVeh.getVariable("veh.grabTruck")) !== "undefined") passiveChecker = false;
	}
	if(passiveChecker && typeof(localPlayer.getVariable('player.passive')) !== "undefined") {
		if(localPlayer.getVariable('player.passive')) return true;
	}
	if(imGodeFuckingMode) return true;
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+weapon+" "+damage+"</span>");
	if(targetEntity.type === 'player') {
		let passiveTargetChecker = true;

		if(typeof(localPlayer.getVariable('player.fraction')) !== "undefined") {
			let myFraction = localPlayer.getVariable('player.fraction');
			if(typeof(myFraction.name) !== "undefined") {
				if(myFraction.name == "ПОЛИЦИЯ") passiveTargetChecker = false;
			}
		}

		if(targetEntity.vehicle) {
			let theVeh = targetEntity.vehicle;
			if(typeof(theVeh.getVariable("veh.theft")) !== "undefined" || typeof(theVeh.getVariable("veh.grabTruck")) !== "undefined") passiveTargetChecker = false;
		}

		if(passiveTargetChecker && typeof(targetEntity.getVariable('player.passive')) !== "undefined") {
			if(targetEntity.getVariable('player.passive')) return true;
		}
		
		if(targetEntity.type == "player") {
			if(typeof(localPlayer.getVariable('player.fraction')) !== "undefined" && typeof(targetEntity.getVariable('player.fraction')) !== "undefined") {
				let myFraction = localPlayer.getVariable("player.fraction");
				let sourceFraction = targetEntity.getVariable("player.fraction");
				if(clanZones) {
					for (var i in clanZones) {
						let tempZone = clanZones[i];
						if(typeof(tempZone.war.id) !== "undefined") {
							if(tempZone.own.id == myFraction.id || tempZone.war.id == myFraction.id) {
								if(myFraction.id == sourceFraction.id) {
									return true;
									break;
								}
							}
						}
					}
				}
			}
		}
		
		let minusHP = 0;
		if(weapon.toString() == "2725352035") { // Кулаки
			if(damage > 50) antiCheatDetected('Читы, убийство одним ударом');
			else minusHP = damage;
		}else if(weapon.toString() == "1737195953") { // Дубинка ментовская
			minusHP = 20;
			if(boneIndex == 20) minusHP = 25; // Голова
			else if(boneIndex == 10) minusHP = 20; // Шея
			else if(boneIndex == 8) minusHP = 20; // Торс
			else if(boneIndex == 16) minusHP = 20; // Правая рука
			else if(boneIndex == 18) minusHP = 20; // Правый кулак
			else if(boneIndex == 12) minusHP = 20; // Левая рука
			else if(boneIndex == 14) minusHP = 20; // Левый кулак
			else if(boneIndex == 0) minusHP = 20; // Остальные части тела
			else if(boneIndex == 2) minusHP = 20; // Левая нога
			else if(boneIndex == 4) minusHP = 20; // Правая нога
			else if(boneIndex == 6) minusHP = 20; // ХЗ
		}else if(weapon.toString() == "453432689") { // Colt 911
			minusHP = 10;
			if(boneIndex == 20) minusHP = 25; // Голова
			else if(boneIndex == 10) minusHP = 15; // Шея
			else if(boneIndex == 8) minusHP = 10; // Торс
			else if(boneIndex == 16) minusHP = 10; // Правая рука
			else if(boneIndex == 18) minusHP = 10; // Правый кулак
			else if(boneIndex == 12) minusHP = 10; // Левая рука
			else if(boneIndex == 14) minusHP = 10; // Левый кулак
			else if(boneIndex == 0) minusHP = 10; // Остальные части тела
			else if(boneIndex == 2) minusHP = 10; // Левая нога
			else if(boneIndex == 4) minusHP = 10; // Правая нога
			else if(boneIndex == 6) minusHP = 10; // ХЗ
		}else if(weapon.toString() == "3249783761") { // Револьвер
			minusHP = 50;
			if(boneIndex == 20) minusHP = 65; // Голова
			else if(boneIndex == 10) minusHP = 50; // Шея
			else if(boneIndex == 8) minusHP = 50; // Торс
			else if(boneIndex == 16) minusHP = 50; // Правая рука
			else if(boneIndex == 18) minusHP = 50; // Правый кулак
			else if(boneIndex == 12) minusHP = 50; // Левая рука
			else if(boneIndex == 14) minusHP = 50; // Левый кулак
			else if(boneIndex == 0) minusHP = 50; // Остальные части тела
			else if(boneIndex == 2) minusHP = 50; // Левая нога
			else if(boneIndex == 4) minusHP = 50; // Правая нога
			else if(boneIndex == 6) minusHP = 50; // ХЗ
		}else if(weapon.toString() == "2578377531") { // Deagle not -1716589765
			minusHP = 25;
			if(boneIndex == 20) minusHP = 35; // Голова
			else if(boneIndex == 10) minusHP = 30; // Шея
			else if(boneIndex == 8) minusHP = 25; // Торс
			else if(boneIndex == 16) minusHP = 25; // Правая рука
			else if(boneIndex == 18) minusHP = 25; // Правый кулак
			else if(boneIndex == 12) minusHP = 25; // Левая рука
			else if(boneIndex == 14) minusHP = 25; // Левый кулак
			else if(boneIndex == 0) minusHP = 25; // Остальные части тела
			else if(boneIndex == 2) minusHP = 25; // Левая нога
			else if(boneIndex == 4) minusHP = 25; // Правая нога
			else if(boneIndex == 6) minusHP = 25; // ХЗ
		}else if(weapon.toString() == "487013001") { // Pump Shutgun
			minusHP = 3;
			if(boneIndex == 20) minusHP = 12; // Голова
			else if(boneIndex == 10) minusHP = 9; // Шея
			else if(boneIndex == 8) minusHP = 6; // Торс
			else if(boneIndex == 16) minusHP = 3; // Правая рука
			else if(boneIndex == 18) minusHP = 3; // Правый кулак
			else if(boneIndex == 12) minusHP = 3; // Левая рука
			else if(boneIndex == 14) minusHP = 3; // Левый кулак
			else if(boneIndex == 0) minusHP = 3; // Остальные части тела
			else if(boneIndex == 2) minusHP = 3; // Левая нога
			else if(boneIndex == 4) minusHP = 3; // Правая нога
			else if(boneIndex == 6) minusHP = 3; // ХЗ
		}else if(weapon.toString() == "2017895192") { // Sawn Off Shutgun
			minusHP = 3;
			if(boneIndex == 20) minusHP = 12; // Голова
			else if(boneIndex == 10) minusHP = 9; // Шея
			else if(boneIndex == 8) minusHP = 5; // Торс
			else if(boneIndex == 16) minusHP = 3; // Правая рука
			else if(boneIndex == 18) minusHP = 3; // Правый кулак
			else if(boneIndex == 12) minusHP = 3; // Левая рука
			else if(boneIndex == 14) minusHP = 3; // Левый кулак
			else if(boneIndex == 0) minusHP = 3; // Остальные части тела
			else if(boneIndex == 2) minusHP = 3; // Левая нога
			else if(boneIndex == 4) minusHP = 3; // Правая нога
			else if(boneIndex == 6) minusHP = 3; // ХЗ
		}else if(weapon.toString() == "4019527611") { // DB Shutgun not -275439685
			minusHP = 3;
			if(boneIndex == 20) minusHP = 12; // Голова
			else if(boneIndex == 10) minusHP = 9; // Шея
			else if(boneIndex == 8) minusHP = 5; // Торс
			else if(boneIndex == 16) minusHP = 3; // Правая рука
			else if(boneIndex == 18) minusHP = 3; // Правый кулак
			else if(boneIndex == 12) minusHP = 3; // Левая рука
			else if(boneIndex == 14) minusHP = 3; // Левый кулак
			else if(boneIndex == 0) minusHP = 3; // Остальные части тела
			else if(boneIndex == 2) minusHP = 3; // Левая нога
			else if(boneIndex == 4) minusHP = 3; // Правая нога
			else if(boneIndex == 6) minusHP = 3; // ХЗ
		}else if(weapon.toString() == "324215364") { // UZI
			minusHP = 10;
			if(boneIndex == 20) minusHP = 25; // Голова
			else if(boneIndex == 10) minusHP = 20; // Шея
			else if(boneIndex == 8) minusHP = 10; // Торс
			else if(boneIndex == 16) minusHP = 10; // Правая рука
			else if(boneIndex == 18) minusHP = 10; // Правый кулак
			else if(boneIndex == 12) minusHP = 10; // Левая рука
			else if(boneIndex == 14) minusHP = 10; // Левый кулак
			else if(boneIndex == 0) minusHP = 10; // Остальные части тела
			else if(boneIndex == 2) minusHP = 10; // Левая нога
			else if(boneIndex == 4) minusHP = 10; // Правая нога
			else if(boneIndex == 6) minusHP = 10; // ХЗ
		}else if(weapon.toString() == "3675956304") { // Tec 9 not -619010992
			minusHP = 10;
			if(boneIndex == 20) minusHP = 25; // Голова
			else if(boneIndex == 10) minusHP = 20; // Шея
			else if(boneIndex == 8) minusHP = 10; // Торс
			else if(boneIndex == 16) minusHP = 10; // Правая рука
			else if(boneIndex == 18) minusHP = 10; // Правый кулак
			else if(boneIndex == 12) minusHP = 10; // Левая рука
			else if(boneIndex == 14) minusHP = 10; // Левый кулак
			else if(boneIndex == 0) minusHP = 10; // Остальные части тела
			else if(boneIndex == 2) minusHP = 10; // Левая нога
			else if(boneIndex == 4) minusHP = 10; // Правая нога
			else if(boneIndex == 6) minusHP = 10; // ХЗ
		}else if(weapon.toString() == "736523883") { // SMG 45 Pistol
			minusHP = 12;
			if(boneIndex == 20) minusHP = 27; // Голова
			else if(boneIndex == 10) minusHP = 22; // Шея
			else if(boneIndex == 8) minusHP = 12; // Торс
			else if(boneIndex == 16) minusHP = 12; // Правая рука
			else if(boneIndex == 18) minusHP = 12; // Правый кулак
			else if(boneIndex == 12) minusHP = 12; // Левая рука
			else if(boneIndex == 14) minusHP = 12; // Левый кулак
			else if(boneIndex == 0) minusHP = 12; // Остальные части тела
			else if(boneIndex == 2) minusHP = 12; // Левая нога
			else if(boneIndex == 4) minusHP = 12; // Правая нога
			else if(boneIndex == 6) minusHP = 12; // ХЗ
		}else if(weapon.toString() == "3220176749") { // Штурм. винтовка not -1074790547
			minusHP = 15;
			if(boneIndex == 20) minusHP = 27; // Голова
			else if(boneIndex == 10) minusHP = 22; // Шея
			else if(boneIndex == 8) minusHP = 15; // Торс
			else if(boneIndex == 16) minusHP = 15; // Правая рука
			else if(boneIndex == 18) minusHP = 15; // Правый кулак
			else if(boneIndex == 12) minusHP = 15; // Левая рука
			else if(boneIndex == 14) minusHP = 15; // Левый кулак
			else if(boneIndex == 0) minusHP = 15; // Остальные части тела
			else if(boneIndex == 2) minusHP = 15; // Левая нога
			else if(boneIndex == 4) minusHP = 15; // Правая нога
			else if(boneIndex == 6) minusHP = 15; // ХЗ
		}else if(weapon.toString() == "2210333304") { // Afford. Carabine not -2084633992
			minusHP = 13;
			if(boneIndex == 20) minusHP = 28; // Голова
			else if(boneIndex == 10) minusHP = 23; // Шея
			else if(boneIndex == 8) minusHP = 13; // Торс
			else if(boneIndex == 16) minusHP = 13; // Правая рука
			else if(boneIndex == 18) minusHP = 13; // Правый кулак
			else if(boneIndex == 12) minusHP = 13; // Левая рука
			else if(boneIndex == 14) minusHP = 13; // Левый кулак
			else if(boneIndex == 0) minusHP = 13; // Остальные части тела
			else if(boneIndex == 2) minusHP = 13; // Левая нога
			else if(boneIndex == 4) minusHP = 13; // Правая нога
			else if(boneIndex == 6) minusHP = 13; // ХЗ
		}else if(weapon.toString() == "1649403952") { // АК-47 Компакт.
			minusHP = 11;
			if(boneIndex == 20) minusHP = 26; // Голова
			else if(boneIndex == 10) minusHP = 21; // Шея
			else if(boneIndex == 8) minusHP = 11; // Торс
			else if(boneIndex == 16) minusHP = 11; // Правая рука
			else if(boneIndex == 18) minusHP = 11; // Правый кулак
			else if(boneIndex == 12) minusHP = 11; // Левая рука
			else if(boneIndex == 14) minusHP = 11; // Левый кулак
			else if(boneIndex == 0) minusHP = 11; // Остальные части тела
			else if(boneIndex == 2) minusHP = 11; // Левая нога
			else if(boneIndex == 4) minusHP = 11; // Правая нога
			else if(boneIndex == 6) minusHP = 11; // ХЗ
		}else if(weapon.toString() == "100416529") { // Снайп. винтовка
			minusHP = 50;
			if(boneIndex == 20) minusHP = 100; // Голова
			else if(boneIndex == 10) minusHP = 80; // Шея
			else if(boneIndex == 8) minusHP = 50; // Торс
			else if(boneIndex == 16) minusHP = 50; // Правая рука
			else if(boneIndex == 18) minusHP = 50; // Правый кулак
			else if(boneIndex == 12) minusHP = 50; // Левая рука
			else if(boneIndex == 14) minusHP = 50; // Левый кулак
			else if(boneIndex == 0) minusHP = 50; // Остальные части тела
			else if(boneIndex == 2) minusHP = 50; // Левая нога
			else if(boneIndex == 4) minusHP = 50; // Правая нога
			else if(boneIndex == 6) minusHP = 50; // ХЗ
		}
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * WEAP: "+weapon.toString()+"</span>");
		
		if(targetEntity != localPlayer) {
			if(!targetEntity.isDead()) youDamage(targetEntity, false, boneIndex, minusHP, targetEntity.getWorldPositionOfBone(boneIndex));
			else youDamage(targetEntity, true, boneIndex, minusHP, targetEntity.getWorldPositionOfBone(boneIndex));
		}
    }
});

var rechargeTimer = false;
var godModeCheckerTimer = false;
var lastHPdata = false;
mp._events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+weapon+"</span>");
	if((sourceEntity || sourcePlayer) && targetEntity && weapon && damage) {
		if(targetEntity.type == "player" && targetEntity == localPlayer) {
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * sourceEntity: "+JSON.stringify(sourceEntity)+" | sourcePlayer: "+JSON.stringify(sourcePlayer)+" | targetEntity: "+JSON.stringify(targetEntity)+"</span>");
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * CUR: "+weapon+" | "+boneIndex+"</span>");
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+sourceEntity.type+"</span>");
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+sourcePlayer.type+"</span>");
			
			if(imGodeFuckingMode) return true;
			if(sourcePlayer.type == "player" || sourceEntity.type == "player") {
				if(!rechargeTimer) {
					rechargeTimer = setTimeout(function() { rechargeTimer = false; }, 10000);
				}else{
					clearTimeout(rechargeTimer);
					rechargeTimer = setTimeout(function() { rechargeTimer = false; }, 10000);
				}
				let myHP = localPlayer.getHealth()*2;
				if(localPlayer.getHealth() <= 100) myHP = 100 + localPlayer.getHealth();
				let minusHP = 0;
				
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * HEALTH: "+localPlayer.getHealth()+" | myHP: "+myHP+"</span>");
				
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * CUR: "+weapon+"</span>");
				
				//weapon = weapon.toString(2);
				//weapon = parseInt(weapon.substring(0, weapon.length - 8) + '0'.repeat(8), 2);
				
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * CUR: "+weapon+"</span>");
				if(weapon.toString() == "2725352035") { // Кулаки
					minusHP = damage;
					if(damage > 50) minusHP = 1;
				}else if(weapon.toString() == "1737195953") { // Дубинка ментовская
					minusHP = 20;
					if(boneIndex == 20) minusHP = 25; // Голова
					else if(boneIndex == 10) minusHP = 20; // Шея
					else if(boneIndex == 8) minusHP = 20; // Торс
					else if(boneIndex == 16) minusHP = 20; // Правая рука
					else if(boneIndex == 18) minusHP = 20; // Правый кулак
					else if(boneIndex == 12) minusHP = 20; // Левая рука
					else if(boneIndex == 14) minusHP = 20; // Левый кулак
					else if(boneIndex == 0) minusHP = 20; // Остальные части тела
					else if(boneIndex == 2) minusHP = 20; // Левая нога
					else if(boneIndex == 4) minusHP = 20; // Правая нога
					else if(boneIndex == 6) minusHP = 20; // ХЗ
				}else if(weapon.toString() == "453432689") { // Colt 911
					minusHP = 10;
					if(boneIndex == 20) minusHP = 25; // Голова
					else if(boneIndex == 10) minusHP = 15; // Шея
					else if(boneIndex == 8) minusHP = 10; // Торс
					else if(boneIndex == 16) minusHP = 10; // Правая рука
					else if(boneIndex == 18) minusHP = 10; // Правый кулак
					else if(boneIndex == 12) minusHP = 10; // Левая рука
					else if(boneIndex == 14) minusHP = 10; // Левый кулак
					else if(boneIndex == 0) minusHP = 10; // Остальные части тела
					else if(boneIndex == 2) minusHP = 10; // Левая нога
					else if(boneIndex == 4) minusHP = 10; // Правая нога
					else if(boneIndex == 6) minusHP = 10; // ХЗ
				}else if(weapon.toString() == "3249783761") { // Револьвер
					minusHP = 50;
					if(boneIndex == 20) minusHP = 65; // Голова
					else if(boneIndex == 10) minusHP = 50; // Шея
					else if(boneIndex == 8) minusHP = 50; // Торс
					else if(boneIndex == 16) minusHP = 50; // Правая рука
					else if(boneIndex == 18) minusHP = 50; // Правый кулак
					else if(boneIndex == 12) minusHP = 50; // Левая рука
					else if(boneIndex == 14) minusHP = 50; // Левый кулак
					else if(boneIndex == 0) minusHP = 50; // Остальные части тела
					else if(boneIndex == 2) minusHP = 50; // Левая нога
					else if(boneIndex == 4) minusHP = 50; // Правая нога
					else if(boneIndex == 6) minusHP = 50; // ХЗ
				}else if(weapon.toString() == "2578377531") { // Deagle not -1716589765
					minusHP = 25;
					if(boneIndex == 20) minusHP = 35; // Голова
					else if(boneIndex == 10) minusHP = 30; // Шея
					else if(boneIndex == 8) minusHP = 25; // Торс
					else if(boneIndex == 16) minusHP = 25; // Правая рука
					else if(boneIndex == 18) minusHP = 25; // Правый кулак
					else if(boneIndex == 12) minusHP = 25; // Левая рука
					else if(boneIndex == 14) minusHP = 25; // Левый кулак
					else if(boneIndex == 0) minusHP = 25; // Остальные части тела
					else if(boneIndex == 2) minusHP = 25; // Левая нога
					else if(boneIndex == 4) minusHP = 25; // Правая нога
					else if(boneIndex == 6) minusHP = 25; // ХЗ
				}else if(weapon.toString() == "487013001") { // Pump Shutgun
					minusHP = 3;
					if(boneIndex == 20) minusHP = 12; // Голова
					else if(boneIndex == 10) minusHP = 9; // Шея
					else if(boneIndex == 8) minusHP = 6; // Торс
					else if(boneIndex == 16) minusHP = 3; // Правая рука
					else if(boneIndex == 18) minusHP = 3; // Правый кулак
					else if(boneIndex == 12) minusHP = 3; // Левая рука
					else if(boneIndex == 14) minusHP = 3; // Левый кулак
					else if(boneIndex == 0) minusHP = 3; // Остальные части тела
					else if(boneIndex == 2) minusHP = 3; // Левая нога
					else if(boneIndex == 4) minusHP = 3; // Правая нога
					else if(boneIndex == 6) minusHP = 3; // ХЗ
				}else if(weapon.toString() == "2017895192") { // Sawn Off Shutgun
					minusHP = 3;
					if(boneIndex == 20) minusHP = 12; // Голова
					else if(boneIndex == 10) minusHP = 9; // Шея
					else if(boneIndex == 8) minusHP = 5; // Торс
					else if(boneIndex == 16) minusHP = 3; // Правая рука
					else if(boneIndex == 18) minusHP = 3; // Правый кулак
					else if(boneIndex == 12) minusHP = 3; // Левая рука
					else if(boneIndex == 14) minusHP = 3; // Левый кулак
					else if(boneIndex == 0) minusHP = 3; // Остальные части тела
					else if(boneIndex == 2) minusHP = 3; // Левая нога
					else if(boneIndex == 4) minusHP = 3; // Правая нога
					else if(boneIndex == 6) minusHP = 3; // ХЗ
				}else if(weapon.toString() == "4019527611") { // DB Shutgun not -275439685
					minusHP = 3;
					if(boneIndex == 20) minusHP = 12; // Голова
					else if(boneIndex == 10) minusHP = 9; // Шея
					else if(boneIndex == 8) minusHP = 5; // Торс
					else if(boneIndex == 16) minusHP = 3; // Правая рука
					else if(boneIndex == 18) minusHP = 3; // Правый кулак
					else if(boneIndex == 12) minusHP = 3; // Левая рука
					else if(boneIndex == 14) minusHP = 3; // Левый кулак
					else if(boneIndex == 0) minusHP = 3; // Остальные части тела
					else if(boneIndex == 2) minusHP = 3; // Левая нога
					else if(boneIndex == 4) minusHP = 3; // Правая нога
					else if(boneIndex == 6) minusHP = 3; // ХЗ
				}else if(weapon.toString() == "324215364") { // UZI
					minusHP = 10;
					if(boneIndex == 20) minusHP = 25; // Голова
					else if(boneIndex == 10) minusHP = 20; // Шея
					else if(boneIndex == 8) minusHP = 10; // Торс
					else if(boneIndex == 16) minusHP = 10; // Правая рука
					else if(boneIndex == 18) minusHP = 10; // Правый кулак
					else if(boneIndex == 12) minusHP = 10; // Левая рука
					else if(boneIndex == 14) minusHP = 10; // Левый кулак
					else if(boneIndex == 0) minusHP = 10; // Остальные части тела
					else if(boneIndex == 2) minusHP = 10; // Левая нога
					else if(boneIndex == 4) minusHP = 10; // Правая нога
					else if(boneIndex == 6) minusHP = 10; // ХЗ
				}else if(weapon.toString() == "3675956304") { // Tec 9 not -619010992
					minusHP = 10;
					if(boneIndex == 20) minusHP = 25; // Голова
					else if(boneIndex == 10) minusHP = 20; // Шея
					else if(boneIndex == 8) minusHP = 10; // Торс
					else if(boneIndex == 16) minusHP = 10; // Правая рука
					else if(boneIndex == 18) minusHP = 10; // Правый кулак
					else if(boneIndex == 12) minusHP = 10; // Левая рука
					else if(boneIndex == 14) minusHP = 10; // Левый кулак
					else if(boneIndex == 0) minusHP = 10; // Остальные части тела
					else if(boneIndex == 2) minusHP = 10; // Левая нога
					else if(boneIndex == 4) minusHP = 10; // Правая нога
					else if(boneIndex == 6) minusHP = 10; // ХЗ
				}else if(weapon.toString() == "736523883") { // SMG 45 Pistol
					minusHP = 12;
					if(boneIndex == 20) minusHP = 27; // Голова
					else if(boneIndex == 10) minusHP = 22; // Шея
					else if(boneIndex == 8) minusHP = 12; // Торс
					else if(boneIndex == 16) minusHP = 12; // Правая рука
					else if(boneIndex == 18) minusHP = 12; // Правый кулак
					else if(boneIndex == 12) minusHP = 12; // Левая рука
					else if(boneIndex == 14) minusHP = 12; // Левый кулак
					else if(boneIndex == 0) minusHP = 12; // Остальные части тела
					else if(boneIndex == 2) minusHP = 12; // Левая нога
					else if(boneIndex == 4) minusHP = 12; // Правая нога
					else if(boneIndex == 6) minusHP = 12; // ХЗ
				}else if(weapon.toString() == "3220176749") { // Штурм. винтовка not -1074790547
					minusHP = 15;
					if(boneIndex == 20) minusHP = 27; // Голова
					else if(boneIndex == 10) minusHP = 22; // Шея
					else if(boneIndex == 8) minusHP = 15; // Торс
					else if(boneIndex == 16) minusHP = 15; // Правая рука
					else if(boneIndex == 18) minusHP = 15; // Правый кулак
					else if(boneIndex == 12) minusHP = 15; // Левая рука
					else if(boneIndex == 14) minusHP = 15; // Левый кулак
					else if(boneIndex == 0) minusHP = 15; // Остальные части тела
					else if(boneIndex == 2) minusHP = 15; // Левая нога
					else if(boneIndex == 4) minusHP = 15; // Правая нога
					else if(boneIndex == 6) minusHP = 15; // ХЗ
				}else if(weapon.toString() == "2210333304") { // Afford. Carabine not -2084633992
					minusHP = 13;
					if(boneIndex == 20) minusHP = 28; // Голова
					else if(boneIndex == 10) minusHP = 23; // Шея
					else if(boneIndex == 8) minusHP = 13; // Торс
					else if(boneIndex == 16) minusHP = 13; // Правая рука
					else if(boneIndex == 18) minusHP = 13; // Правый кулак
					else if(boneIndex == 12) minusHP = 13; // Левая рука
					else if(boneIndex == 14) minusHP = 13; // Левый кулак
					else if(boneIndex == 0) minusHP = 13; // Остальные части тела
					else if(boneIndex == 2) minusHP = 13; // Левая нога
					else if(boneIndex == 4) minusHP = 13; // Правая нога
					else if(boneIndex == 6) minusHP = 13; // ХЗ
				}else if(weapon.toString() == "1649403952") { // АК-47 Компакт.
					minusHP = 11;
					if(boneIndex == 20) minusHP = 26; // Голова
					else if(boneIndex == 10) minusHP = 21; // Шея
					else if(boneIndex == 8) minusHP = 11; // Торс
					else if(boneIndex == 16) minusHP = 11; // Правая рука
					else if(boneIndex == 18) minusHP = 11; // Правый кулак
					else if(boneIndex == 12) minusHP = 11; // Левая рука
					else if(boneIndex == 14) minusHP = 11; // Левый кулак
					else if(boneIndex == 0) minusHP = 11; // Остальные части тела
					else if(boneIndex == 2) minusHP = 11; // Левая нога
					else if(boneIndex == 4) minusHP = 11; // Правая нога
					else if(boneIndex == 6) minusHP = 11; // ХЗ
				}else if(weapon.toString() == "100416529") { // Снайп. винтовка
					minusHP = 50;
					if(boneIndex == 20) minusHP = 100; // Голова
					else if(boneIndex == 10) minusHP = 80; // Шея
					else if(boneIndex == 8) minusHP = 50; // Торс
					else if(boneIndex == 16) minusHP = 50; // Правая рука
					else if(boneIndex == 18) minusHP = 50; // Правый кулак
					else if(boneIndex == 12) minusHP = 50; // Левая рука
					else if(boneIndex == 14) minusHP = 50; // Левый кулак
					else if(boneIndex == 0) minusHP = 50; // Остальные части тела
					else if(boneIndex == 2) minusHP = 50; // Левая нога
					else if(boneIndex == 4) minusHP = 50; // Правая нога
					else if(boneIndex == 6) minusHP = 50; // ХЗ
				}
				
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * CUR: "+myHP+" | "+weapon+" | "+boneIndex+" | "+minusHP+" ||| "+(myHP-minusHP)+"</span>");
				let newHP = myHP - minusHP;
				
				if(sourcePlayer.type == "player") {
					if(myHP > 100 && minusHP > 0) {
						if(!localPlayer.isDead()) {
							if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined" && typeof(sourcePlayer.getVariable("player.blocks")) !== "undefined") {
								if(fastUseSlotsTiming >= 0) fastUseSlotsTiming = 100;
								//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+newHP+"</span>");
								if(newHP <= 100) {
									localPlayer.setHealth(0);
									mp.events.callRemote('killStatMachine', sourceEntity, weapon.toString());
									isAlreadyDead = true;
									//killCam(sourceEntity);
								}else{
									//localPlayer.setHealth(newHP);
									mp.game.weapon.setCurrentDamageEventAmount(minusHP);
									/*lastHPdata = myHP;
									if(typeof(Behaviour) !== "undefined") {
										if(typeof(Behaviour.oldHP) !== "undefined") Behaviour.oldHP = newHP;
									}
									if(!godModeCheckerTimer) {
										godModeCheckerTimer = setTimeout(function() {
											if(lastHPdata) {
												let resultHP = localPlayer.getHealth()*2;
												if(localPlayer.getHealth() <= 100) resultHP = 100 + localPlayer.getHealth();
												//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Было: "+lastHPdata+" | Стало: "+resultHP+"</span>");
												if(lastHPdata <= resultHP) {
													imGodeFuckingMode = true;
													tryChatMessage("forall", "Я юзаю год-мод проверьте меня");
													mp.game.graphics.startScreenEffect("DrugsMichaelAliensFight", 0, true);
													mp.game.graphics.setBlackout(true);
													mp.game.graphics.setFarShadowsSuppressed(true);
													mp.game.graphics.setNightvision(true);
													mp.game.graphics.setNoisinessoveride(true);
													mp.events.call("sleepAntiCheat");
													localPlayer.position = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z+1500);
												}
												lastHPdata = false;
											}
										}, 80);
									}else{
										clearTimeout(godModeCheckerTimer);
										godModeCheckerTimer = setTimeout(function() { 
											if(lastHPdata) {
												let resultHP = localPlayer.getHealth()*2;
												if(localPlayer.getHealth() <= 100) resultHP = 100 + localPlayer.getHealth();
												//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Было: "+lastHPdata+" | Стало: "+resultHP+"</span>");
												if(lastHPdata <= resultHP) {
													imGodeFuckingMode = true;
													tryChatMessage("forall", "Я юзаю год-мод проверьте меня");
													mp.game.graphics.startScreenEffect("DrugsMichaelAliensFight", 0, true);
													mp.game.graphics.setBlackout(true);
													mp.game.graphics.setFarShadowsSuppressed(true);
													mp.game.graphics.setNightvision(true);
													mp.game.graphics.setNoisinessoveride(true);
													mp.events.call("sleepAntiCheat");
													localPlayer.position = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z+1500);
												}
												lastHPdata = false;
											}
										}, 80);
									}*/
								}
							}
						}
					}
				}else if(sourceEntity.type == "player") {
					if(myHP > 100 && minusHP > 0) {
						if(!localPlayer.isDead()) {
							if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined" && typeof(sourceEntity.getVariable("player.blocks")) !== "undefined") {
								if(fastUseSlotsTiming >= 0) fastUseSlotsTiming = 100;
								//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+newHP+"</span>");
								if(newHP <= 100) {
									localPlayer.setHealth(0);
									mp.events.callRemote('killStatMachine', sourceEntity, weapon.toString());
									isAlreadyDead = true;
									//killCam(sourceEntity);
								}else{
									//localPlayer.setHealth(newHP);
									mp.game.weapon.setCurrentDamageEventAmount(minusHP);
									/*lastHPdata = myHP;
									if(typeof(Behaviour) !== "undefined") {
										if(typeof(Behaviour.oldHP) !== "undefined") Behaviour.oldHP = newHP;
									}
									if(!godModeCheckerTimer) {
										godModeCheckerTimer = setTimeout(function() {
											if(lastHPdata) {
												let resultHP = localPlayer.getHealth()*2;
												if(localPlayer.getHealth() <= 100) resultHP = 100 + localPlayer.getHealth();
												//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Было: "+lastHPdata+" | Стало: "+resultHP+"</span>");
												if(lastHPdata <= resultHP) {
													imGodeFuckingMode = true;
													tryChatMessage("forall", "Я юзаю год-мод проверьте меня");
													mp.game.graphics.startScreenEffect("DrugsMichaelAliensFight", 0, true);
													mp.game.graphics.setBlackout(true);
													mp.game.graphics.setFarShadowsSuppressed(true);
													mp.game.graphics.setNightvision(true);
													mp.game.graphics.setNoisinessoveride(true);
													mp.events.call("sleepAntiCheat");
													localPlayer.position = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z+1500);
												}
												lastHPdata = false;
											}
										}, 80);
									}else{
										clearTimeout(godModeCheckerTimer);
										godModeCheckerTimer = setTimeout(function() { 
											if(lastHPdata) {
												let resultHP = localPlayer.getHealth()*2;
												if(localPlayer.getHealth() <= 100) resultHP = 100 + localPlayer.getHealth();
												//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Было: "+lastHPdata+" | Стало: "+resultHP+"</span>");
												if(lastHPdata <= resultHP) {
													imGodeFuckingMode = true;
													tryChatMessage("forall", "Я юзаю год-мод проверьте меня");
													mp.game.graphics.startScreenEffect("DrugsMichaelAliensFight", 0, true);
													mp.game.graphics.setBlackout(true);
													mp.game.graphics.setFarShadowsSuppressed(true);
													mp.game.graphics.setNightvision(true);
													mp.game.graphics.setNoisinessoveride(true);
													mp.events.call("sleepAntiCheat");
													localPlayer.position = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z+1500);
												}
												lastHPdata = false;
											}
										}, 80);
									}*/
									/*await mp.game.waitAsync(20);
									let curHP = localPlayer.getHealth()*2;
									if(localPlayer.getHealth() <= 100) curHP = 100 + localPlayer.getHealth();
									chatAPI.sysPush("<span style=\"color:#FF6146\"> * oldHP: "+myHP+" | "+curHP+"</span>");*/
								}
							}
						}
					}
				}
			}
		}
	}
});

mp.events.add("playerDeath", (player, reason, killer) => {
	if(player == localPlayer) {
		mp.events.call("sleepAntiCheat");
		if(slotInUse != "0" && typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			let antiDrop = false;
			if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
				let myFraction = localPlayer.getVariable("player.fraction");
				if(imInZone && typeof(clanZones) !== "undefined") {
					if(typeof(clanZones[imInZone]) !== "undefined") {
						let tempZone = clanZones[imInZone];
						if(typeof(tempZone.war.id) !== "undefined") {
							if(tempZone.own.id == myFraction.id || tempZone.war.id == myFraction.id) antiDrop = true;
						}
					}
				}
			}
			
			if(heistIsland) antiDrop = true;
			
			if(typeof(reason) !== "undefined") {
				if(reason.toString() == "2741846334") antiDrop = true;
			}
			
			let myInv = localPlayer.getVariable("player.inv");
			if(typeof(myInv[slotInUse.toString()]) !== "undefined") invUse(slotInUse, JSON.stringify(myInv[slotInUse.toString()]), !antiDrop, false);
		}
	}
});

let afSavingAmmoFlood = false;
var savingAmmoSyncTimer = false;
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
	let getWeapon = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle);
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * HASH: "+getWeapon.toString()+"</span>");
	if(getWeapon.toString() == "453432689" && vehAdmRemover) {
		let hitData = mp.raycasting.testCapsule(localPlayer.position, targetPosition, 0.2, localPlayer, 2);
		if(hitData) {
			if(typeof(hitData.entity) !== "undefined") {
				if(typeof(hitData.entity.remoteId) !== "undefined") {
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Entity: "+hitData.entity.remoteId+"</span>");
					if(mp.vehicles.atRemoteId(hitData.entity.remoteId)) {
						let theVeh = mp.vehicles.atRemoteId(hitData.entity.remoteId);
						if(typeof(theVeh.getVariable('veh.id')) !== "undefined" && typeof(theVeh.getVariable('veh.own')) !== "undefined" && typeof(theVeh.getVariable('veh.owners')) !== "undefined" && typeof(theVeh.getVariable('veh.hash')) !== "undefined" && typeof(theVeh.getVariable('veh.fuel')) !== "undefined") mp.events.callRemote('vehRemover', hitData.entity.remoteId.toString(), theVeh.getVariable('veh.id').toString());
					}
				}
			}
		}
	}
	if(getWeapon.toString() == "375527679" || getWeapon.toString() == "1752584910") return antiCheatDetected("Читы на RPG", true);
	/*let getAmmo = mp.game.invoke(`0x015A522136D7F951`, localPlayer.handle, getWeapon);
	chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+getAmmo+"</span>");
	if(getAmmo <= 1) localPlayer.taskSwapWeapon(false);*/
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Damage: "+targetEntity.toString()+"</span>");	
	//if (Behaviour.active) {
		if(!localPlayer.isDead() && !heistIsland) {
			if(ammoInUse != "0") {
				ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
				if(ammoInUseCount > 0) {
					if(fastUseSlotsTiming < 30) fastUseSlotsTiming = 30;
					/*if(targetEntity) {
						let shotFrom = localPlayer.getBoneCoords(64016, 0, 0, 0);
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * SHOT FROM: "+JSON.stringify(shotFrom)+" SHOT TO: "+JSON.stringify(targetPosition)+"</span>");
						mp.events.callRemoteUnreliable('trasserLink', JSON.stringify(shotFrom), JSON.stringify(targetPosition), targetEntity.remoteId.toString());
					}*/
					ammoInUseCount = CryptoJS.AES.encrypt((ammoInUseCount-1).toString(), krKey);
					
					if(!afSavingAmmoFlood) {
						afSavingAmmoFlood = true;
						setTimeout(function() { afSavingAmmoFlood = false }, 1000);
						if(!savingAmmoSyncTimer) {
							savingAmmoSyncTimer = setTimeout(function() {
								ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
								if(ammoInUseCount > 0) mp.events.callRemoteUnreliable("invSyncAmmo", ammoInUseCount);
								ammoInUseCount = CryptoJS.AES.encrypt((ammoInUseCount).toString(), krKey);
								afSavingAmmoFlood = false;
								savingAmmoSyncTimer = false;
							}, 2500);
						}else{
							clearTimeout(savingAmmoSyncTimer);
							savingAmmoSyncTimer = false;
						}
					}
				}else{
					if(ammoInUse != "false") return antiCheatDetected("Читы на патроны", true);
				}
			}else{
				return antiCheatDetected("Читы на оружее", true);
			}
		}
	//}
});

/*
var trasserLinks = {};
let trasserLinkIDs = 0;
mp.events.add('strasseredLink', (from, to, fromPlayerID, toPlayerID) => {
	if(from && to && fromPlayerID && toPlayerID) {
		if(fromPlayerID != localPlayer.remoteId.toString()) {
			trasserLinkIDs++;
			from = JSON.parse(from);
			to = JSON.parse(to);
			let content = {};
			content["from"] = from;
			content["to"] = to;
			content["lifeTime"] = parseInt(Date.parse(new Date()))+10000;
			trasserLinks["tr"+trasserLinkIDs.toString()] = content;
			if(trasserLinkIDs >= 1000) trasserLinkIDs = 0;
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * TRASSER: SHOT FROM: "+JSON.stringify(content.from)+" SHOT TO: "+JSON.stringify(content.to)+"</span>");
		}
	}
});
*/
}