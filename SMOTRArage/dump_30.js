{
// Close Police Doors (LSPD)

mp.game.object.doorControl(631614199, 461.8065, -994.4086, 25.06443, true, 0.0, 0.0, 0);
mp.game.object.doorControl(631614199, 461.8065, -997.6583, 25.06443, true, 0.0, 0.0, 0);
mp.game.object.doorControl(631614199, 461.8065, -1001.302, 25.06443, true, 0.0, 0.0, 0);

// Close Police Doors (LSPD) END

var fracPanel = false;
var afFracPanel = false;

function refreshFractions(newValue) {
	let tempFractions = mp.world.data.fractions;
	mp.players.forEachInStreamRange(
		(player, id) => {
			if(typeof(player.fRankName) !== "undefined") {
				if(typeof(player.getVariable("player.fraction")) !== "undefined") {
					let plFraction = player.getVariable("player.fraction");
					if(typeof(plFraction.id) !== "undefined") {
						let fracSettings = tempFractions[plFraction.id].settings;
						if(typeof(fracSettings[plFraction.rank.toString()]) !== "undefined") {
							if(typeof(fracSettings[plFraction.rank.toString()].name) !== "undefined") player.fRankName = fracSettings[plFraction.rank.toString()].name;
						}
					}
				}
			}
		}
	);
}

mp.events.add("worldDataChanged", (key, oldValue, newValue) => {
	if(key == "fractions") refreshFractions();
});

var fractionAction = false;

var afFracSpawn = false;
var confirmFractionLeave = 0;

mp.keys.bind(0x71, true, function() { // F2 Панель организации
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x71)) return false;
	
	if(hud_browser) {
		if(fracPanel) {
			if(!fractionAction) closeFracMenu();
		}else{
			if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
				if(localPlayer.getVariable("active.deal")) return notyAPI.error("У Вас есть активная сделка, панель [ <b>F2</b> ] недоступна.", 3000, true);
			}
			if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
				let playerBlocks = localPlayer.getVariable("player.blocks");
				if(typeof(playerBlocks.jail) !== "undefined") return notyAPI.error("Панель организации [ <b>F2</b> ] в тюрьме не доступна", 3000, true);
			}
			let myFraction = {};
			if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
				if(localPlayer.getVariable("player.fraction")) {
					myFraction = localPlayer.getVariable("player.fraction");
					if(typeof(myFraction.name) === "undefined") return notyAPI.error("Вы не состоите в организации, панель [ <b>F2</b> ] недоступна.", 3000, true);
				}
			}
			if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return notyAPI.error("Ваша организация не инициализирована, панель [ <b>F2</b> ] недоступна.", 3000, true);
			
			if(afFracPanel) return false;
			afFracPanel = true;
			setTimeout(function() { afFracPanel = false }, 1000);
			
			/*if(localPlayer.getVariable('player.vehs')) {
				var tempJSon = localPlayer.getVariable('player.vehs');
				
				for(var k in tempJSon.vehicles) {
					let vehHash = tempJSon.vehicles[k].hash;
					let vehName = vehHash;
					if(typeof(decVehStats[0][vehHash]) != "undefined") vehName = decVehStats[0][vehHash].name;
					tempJSon.vehicles[k].name = vehName;
				}
				
				if(localPlayer.getVariable('player.houses')) {
					hud_browser.execute("refreshVehPanel('"+JSON.stringify(tempJSon)+"', '"+JSON.stringify(localPlayer.getVariable('player.houses'))+"');");
				}else{
					hud_browser.execute("refreshVehPanel('"+JSON.stringify(tempJSon)+"');");
				}*/
				
				let fractionMembers = mp.world.data.fractions[myFraction.id].members;
				for (var k in fractionMembers) {
					fractionMembers[k.toString()]["online"] = false;
				}
				mp.players.forEach(
					(player, id) => {
						if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.fraction")) !== "undefined") {
							let playerFraction = player.getVariable("player.fraction");
							if(typeof(playerFraction.id) !== "undefined" && typeof(mp.world.data.fractions[myFraction.id].members) !== "undefined") {
								for (var k in fractionMembers) {
									if(k.toString() == player.getVariable("player.id").toString()) fractionMembers[k.toString()]["online"] = true;
								}
							}
						}
					}
				);
				
				//chatAPI.sysPush('toggleFractionPanel(\''+JSON.stringify(mp.world.data.fractions[myFraction.id])+'\');');
				hud_browser.execute('toggleFractionPanel(\''+JSON.stringify(mp.world.data.fractions[myFraction.id])+'\');');
				mp.gui.cursor.visible = true;
				fracPanel = true;
				
				allowBinds = [0x71];
				
				mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
			/*}else{
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Ваш транспорт не инициализирован, повторите ещё раз..</span>");
			}*/
		}
	}
});

function closeFracMenu() {
	if(fracPanel && hud_browser) {
		hud_browser.execute('toggleFractionPanel(false);');
		mp.gui.cursor.visible = false;
		fracPanel = false;
		restoreBinds();
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
	}
}
mp.events.add("closeFracMenu", closeFracMenu);

function openKitsPanel() {
	if(hud_browser) {
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				let myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracKits\', \'Набор-киты сейчас недоступны\');');
				
				if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracKits\', \'Управление рангами не инициализировано\');');
				if(typeof(mp.world.data.fractions[myFraction.id].settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracKits\', \'Управление рангами не инициализировано\');');
				
				let fractionData = mp.world.data.fractions[myFraction.id];
				let fracSettings = mp.world.data.fractions[myFraction.id].settings;
				
				if(fractionData.type === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracKits\', \'Управление рангами не инициализировано\');');
				
				if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
					if(fractionData.type == "crime") {
						if(typeof(fracSettings[myFraction.rank.toString()].assaultGangs) === "undefined" && typeof(fracSettings[myFraction.rank.toString()].weaponsGangs) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracKits\', \'Нет доступа\');');
					}else if(fractionData.type == "gov") {
						if(myFraction.name == "ПОЛИЦИЯ") {
							if(typeof(fracSettings[myFraction.rank.toString()].weaponsMVD) === "undefined" && typeof(fracSettings[myFraction.rank.toString()].weaponsDPS) === "undefined" && typeof(fracSettings[myFraction.rank.toString()].instrumentsMVDDPS) === "undefined" && typeof(fracSettings[myFraction.rank.toString()].weaponsMVDDPS) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracKits\', \'Нет доступа\');');
						}
					}
				}
				
				hud_browser.execute("toggleKitsPanel(true, \""+fractionData.type+"\", \""+myFraction.name+"\");");
			}
		}
	}
}
mp.events.add("openKitsPanel", openKitsPanel);

function selectKit(fromElement, theCost) {
	if(typeof(fromElement) !== "undefined" && typeof(theCost) !== "undefined") {
		if(hud_browser) {
			if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
				if(localPlayer.getVariable("player.fraction")) {
					let myFraction = localPlayer.getVariable("player.fraction");
					if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Набор-киты сейчас недоступны\');');

					if(inventoryPanel) return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Закройте инвентарь перед использованием\');');

					if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Кит-наборы не инициализированы\');');
					if(typeof(mp.world.data.fractions[myFraction.id].settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Кит-наборы не инициализированы\');');
					
					let fractionData = mp.world.data.fractions[myFraction.id];
					let fracSettings = mp.world.data.fractions[myFraction.id].settings;
					
					if(fractionData.type === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Управление рангами не инициализировано\');');
					
					if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
						if(fractionData.type == "crime") {
							if((fromElement == "fracPistol" || fromElement == "fracMicro" || fromElement == "fracHunter" || fromElement == "fracAssault") && typeof(fracSettings[myFraction.rank.toString()].assaultGangs) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Нет доступа\');');
							if((fromElement == "fracRevos" || fromElement == "fracPistols" || fromElement == "fracMicros" || fromElement == "fracHunters" || fromElement == "fracAssaults") && typeof(fracSettings[myFraction.rank.toString()].weaponsGangs) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Нет доступа\');');
						}else if(fractionData.type == "gov") {
							if(myFraction.name == "ПОЛИЦИЯ") {
								if((fromElement == "policePistol" || fromElement == "policeSMG" || fromElement == "policeAMLL") && typeof(fracSettings[myFraction.rank.toString()].weaponsPoliceTabel) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Нет доступа\');');
								if((fromElement == "policeNightstick" || fromElement == "policeStungun" || fromElement == "policeZhezl") && typeof(fracSettings[myFraction.rank.toString()].instrumentsMVDDPS) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Нет доступа\');');
								if((fromElement == "policeHunter" || fromElement == "policeAssault" || fromElement == "policeCarabine") && typeof(fracSettings[myFraction.rank.toString()].weaponsMVDDPS) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Нет доступа\');');
							}
						}
					}
					
					if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Кит временно недоступен\');');
					let fracData = mp.world.data.fractions[myFraction.id];
					if(typeof(fracData.balance) === "undefined") return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Кит временно недоступен\');');
					if(parseInt(fracData.balance) < parseInt(theCost)) return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Недостаточно денег на балансе\');');
					
					let buyItems = 3;
					
					let playerInv = localPlayer.getVariable("player.inv");
					let emptySlots = 0;
					for (let i = 1; i <= 30; i++) {
						if(typeof(playerInv[i.toString()]) === "undefined") emptySlots++;
					}
					
					if(emptySlots < buyItems) return hud_browser.execute('fractionPanelsError(\'#'+fromElement+'\', \'Недостаточно мест в инвентаре\');');
					
					inventorySaving = JSON.stringify(localPlayer.getVariable("player.inv"));
					mp.events.callRemote('selectKit', myFraction.id, fromElement, theCost);
					
					if(fromElement == "fracPistol") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с пистолетом", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					else if(fromElement == "fracMicro") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с пистолетом-автоматом", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					else if(fromElement == "fracHunter") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с дробовиком", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					else if(fromElement == "fracAssault") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с штурмовой винтовкой", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					else if(fromElement == "fracRevos") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с револьверами", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					else if(fromElement == "fracPistols") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с пистолетами", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					else if(fromElement == "fracMicros") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с пистолетами-автоматами", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					else if(fromElement == "fracHunters") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с дробовиками", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					else if(fromElement == "fracAssaults") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит со штурмовыми винтовками", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					
					if(fromElement == "policePistol") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с пистолетом", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					if(fromElement == "policeSMG") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с SMG", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					if(fromElement == "policeAMLL") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с пистолетными патронами", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					if(fromElement == "policeNightstick") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с дубинкой", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					if(fromElement == "policeStungun") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с тазером", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					if(fromElement == "policeZhezl") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с жезлом ДПС", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					if(fromElement == "policeHunter") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с дробовиком", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					if(fromElement == "policeAssault") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с штурмовой винтовкой", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					if(fromElement == "policeCarabine") mp.game.ui.messages.showMidsizedShard("~w~Вы использовали ~y~кит с карабином", "~s~~w~Списано ~r~"+theCost+" ~w~руб. с Вашей организации", 5, false, true, 8000);
					
					fractionAction = false;
					if(fracPanel) closeFracMenu();
					mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
				}
			}
		}
	}
}
mp.events.add("selectKit", selectKit);

function fractionMoneyWithdraw(withdrawVal) {
	if(typeof(withdrawVal) !== "undefined") {
		if(withdrawVal) {
			withdrawVal = parseInt(withdrawVal);
			if(hud_browser) {
				if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
					if(localPlayer.getVariable("player.fraction")) {
						let myFraction = localPlayer.getVariable("player.fraction");
						if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionMoneyWithdraw\', \'Вывод сейчас недоступен\');');
						if(parseInt(myFraction.rank) != 9 && parseInt(myFraction.rank) != 10) return hud_browser.execute('fractionPanelsError(\'#fractionMoneyWithdraw\', \'Вывод доступен только основателям и их заместителям\');');
						
						if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionMoneyWithdraw\', \'Вывод временно недоступен\');');
						let fracData = mp.world.data.fractions[myFraction.id];
						if(typeof(fracData.balance) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionMoneyWithdraw\', \'Вывод временно недоступен\');');
						if(parseInt(fracData.balance) < withdrawVal) return hud_browser.execute('fractionPanelsError(\'#fractionMoneyWithdraw\', \'На балансе нет столько денег\');');
						if(withdrawVal < 10000) return hud_browser.execute('fractionPanelsError(\'#fractionMoneyWithdraw\', \'Не менее 10 000\');');
						
						fractionAction = true;
						mp.events.callRemote('fractionMoneyWithdraw', myFraction.id, withdrawVal);
					}
				}
			}
		}
	}
}
mp.events.add("fractionMoneyWithdraw", fractionMoneyWithdraw);

function successFractionMoneyWithdraw(fracName, fracColor, withdrawVal) {
	if(typeof(fracName) !== "undefined" && typeof(fracColor) !== "undefined" && typeof(withdrawVal) !== "undefined") {
		if(fractionAction) fractionAction = false;
		if(fracPanel) closeFracMenu();
		notyAPI.success("Списание средств <b>"+fracName+"</b>, вы списали<b>"+withdrawVal.replace(new RegExp(/(\d{1,3})(?=((\d{3})*)$)/g), ' $1')+"</b> руб.", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Списание средств ~y~"+fracName, "~s~~w~Списано с баланса~r~"+withdrawVal.replace(new RegExp(/(\d{1,3})(?=((\d{3})*)$)/g), ' $1')+" ~w~руб.", 5, false, true, 8000);
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
	}
}
mp.events.add("successFractionMoneyWithdraw", successFractionMoneyWithdraw);

function itsACaptTimeStarted() {
	mp.game.ui.messages.showMidsizedShard("~w~Захват территорий ~g~доступен", "~s~~w~Прямо сейчас Ваша организация может начать капт!", 5, false, true, 8000);
}
mp.events.add("itsACaptTimeStarted", itsACaptTimeStarted);

function errorFractionMoneyWithdraw(errReason) {
	if(typeof(errReason) !== "undefined") {
		if(fractionAction) fractionAction = false;
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
		return hud_browser.execute('fractionPanelsError(\'#fractionMoneyWithdraw\', \''+errReason+'\');');
	}
}
mp.events.add("errorFractionMoneyWithdraw", errorFractionMoneyWithdraw);

function refreshFractionInvitePlayers() {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return false;
				let tempPlayers = [];
				let myPos = localPlayer.position;
				let counter = 0;
				mp.players.forEachInStreamRange(
					(player, id) => {
						if(player != localPlayer) {
							let plPos = player.position;
							if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true) <= 10) {
								if(!player.vehicle && player.getVariable("player.id") && player.getVariable("player.nick")) {
									tempPlayers.push({"nick":player.getVariable("player.nick").toString(),"id":parseInt(player.getVariable("player.id"))});
									counter++;
								}
							}
						}
					}
				);
				if(counter > 0) hud_browser.execute('inviteFractionPlayersRefreshed(\''+JSON.stringify(tempPlayers)+'\');');
			}
		}
	}
}
mp.events.add("refreshFractionInvitePlayers", refreshFractionInvitePlayers);

function sendFractionInvite(fsID, fsNick) {
	if(hud_browser && typeof(fsID) !== "undefined" && typeof(fsNick) !== "undefined") {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Приглашение недоступно\');');
				if(fsID == localPlayer.getVariable("player.id")) return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Вы не можете пригласить себя\');');
				
				if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'У Вас нет права приглашать участников\');');
				if(typeof(mp.world.data.fractions[myFraction.id].settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'У Вас нет права приглашать участников\');');
				
				let fractionData = mp.world.data.fractions[myFraction.id];
				let fracSettings = mp.world.data.fractions[myFraction.id].settings;
				
				if(fractionData.type === "undefined") return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Приглашения не инициализированы\');');
				
				if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
					if(fractionData.type == "crime") {
						if(typeof(fracSettings[myFraction.rank.toString()].inviteGangs) === "undefined") return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Нет доступа\');');
					}else if(fractionData.type == "gov") {
						if(myFraction.name == "ПОЛИЦИЯ") {
							if(typeof(fracSettings[myFraction.rank.toString()].invitePolice) === "undefined") return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Нет доступа\');');
						}
					}
				}
				
				let isOnline = false;
				mp.players.forEach(
					(player, id) => {
						if(player.getVariable("player.id") && player.getVariable("player.nick")) {
							if(player.getVariable("player.id").toString() == fsID.toString()) isOnline = player;
						}
					}
				);
				if(!isOnline) return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Игрок уже оффлайн\');');
				
				if(typeof(isOnline.getVariable("active.deal")) !== "undefined") {
					if(isOnline.getVariable("active.deal")) return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'У игрока есть активная сделка\');');
				}
				
				if(typeof(isOnline.getVariable("player.fraction")) !== "undefined") {
					if(isOnline.getVariable("player.fraction")) {
						let isOnlineFraction = isOnline.getVariable("player.fraction");
						if(typeof(isOnlineFraction.id) !== "undefined") return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Игрок уже состоит в организации\');');
					}
				}
				
				if(typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
					let fraction = mp.world.data.fractions[myFraction.id];
					if(typeof(fraction.members) !== "undefined") {
						if(Object.keys(fraction.members).length >= 50) return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Уже состоит 50 человек\');');
						
						fractionAction = true;
						allowBinds = [];
						
						hud_browser.execute('playerFractionInvited();');
						mp.events.callRemote('sendFractionInvite', myFraction.id, fsID, fsNick);
					}else{
						return hud_browser.execute('fractionPanelsError(\'#sendFractionInvite\', \'Ошибка инициализации\');');
					}
				}
			}
		}
	}
}
mp.events.add("sendFractionInvite", sendFractionInvite);

function cancelInviteFraction() {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) {
				if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
					let playerDeal = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
					if(playerDeal) {
						fractionAction = false;
						allowBinds = [0x71];
						mp.events.callRemote('cancelInviteFraction', playerDeal);
					}
				}
			}
		}
	}
}
mp.events.add("cancelInviteFraction", cancelInviteFraction);

function canceledInviteFraction(invNick, invID) {
	if(hud_browser && typeof(invNick) !== "undefined" && typeof(invID) !== "undefined") {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined") {
					fractionAction = false;
					if(fracPanel) closeFracMenu();
				}
			}
		}
	}
}
mp.events.add("canceledInviteFraction", canceledInviteFraction);

function disacceptInviteFraction() {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) {
				if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
					let playerDeal = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
					if(playerDeal) {
						if(fracPanel) closeFracMenu();
						mp.events.callRemote('disacceptInviteFraction', playerDeal);
					}
				}
			}
		}
	}
}
mp.events.add("disacceptInviteFraction", disacceptInviteFraction);

function disacceptedInviteFraction(invNick, invID) {
	if(hud_browser && typeof(invNick) !== "undefined" && typeof(invID) !== "undefined") {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) !== "undefined") {
					fractionAction = false;
					if(fracPanel) closeFracMenu();
				}
			}
		}
	}
}
mp.events.add("disacceptedInviteFraction", disacceptedInviteFraction);

function youAreInvitedToFraction(fName, fColor, invNick, invID) {
	if(hud_browser && typeof(fName) !== "undefined" && typeof(fColor) !== "undefined" && typeof(invNick) !== "undefined" && typeof(invID) !== "undefined") {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined") {
					fractionAction = true;
					fracPanel = true;
					allowBinds = [];
					hud_browser.execute('youAreInvitedToFraction(\''+fName+'\', \''+fColor+'\', \''+invNick+'\', \''+invID+'\');');
					mp.gui.cursor.visible = true;
				}
			}
		}
	}
}
mp.events.add("youAreInvitedToFraction", youAreInvitedToFraction);

function acceptInviteFraction() {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) {
				if(mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")))) {
					let playerDeal = mp.players.atRemoteId(parseInt(localPlayer.getVariable("active.deal")));
					if(playerDeal) {
						if(fracPanel) closeFracMenu();
						mp.events.callRemote('acceptInviteFraction', playerDeal);
					}
				}
			}else{
				return hud_browser.execute('fractionPanelsError(\'#acceptInviteFraction\', \'Пригласитель уже оффлайн\');');
			}
		}else{
			return hud_browser.execute('fractionPanelsError(\'#acceptInviteFraction\', \'Неизвестная ошибка\');');
		}
	}
}
mp.events.add("acceptInviteFraction", acceptInviteFraction);

function imAcceptedInviteFraction(fracName, inviterNick, inviterID) {
	if(typeof(fracName) !== "undefined" && typeof(inviterNick) !== "undefined" && typeof(inviterID) !== "undefined") {
		if(fractionAction) fractionAction = false;
		notyAPI.success("Вы вступили в <b>"+fracName+"</b>, пригласил <b>"+inviterNick+"</b> (<b>"+inviterID+"</b>).", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Вы вступили в ~y~"+fracName, "~s~Вас принял "+inviterNick+" ("+inviterID+")", 5, false, true, 8000);
	}
}
mp.events.add("imAcceptedInviteFraction", imAcceptedInviteFraction);

function acceptedInviteFraction(fracName, invitedNick, invitedID) {
	if(typeof(fracName) !== "undefined" && typeof(invitedNick) !== "undefined" && typeof(invitedID) !== "undefined") {
		if(fractionAction) fractionAction = false;
		if(fracPanel) closeFracMenu();
		chatAPI.warningPush(" * Новый участник в <span style=\"color:#FEBC00\"><b>"+fracName+"</b></span>, <span style=\"color:#FEBC00\"><b>"+invitedNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+invitedID+"</b></span>)");
		mp.game.ui.messages.showMidsizedShard("~w~Новый участник в ~y~"+fracName, "~s~Вы приняли "+invitedNick+" ("+invitedID+")", 5, false, true, 8000);
	}
}
mp.events.add("acceptedInviteFraction", acceptedInviteFraction);

function fractionUnInvite(fsID, fsNick, fsRank) {
	if(hud_browser && typeof(fsID) !== "undefined" && typeof(fsNick) !== "undefined" && typeof(fsRank) !== "undefined") {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionUnInvite\', \'Исключение недоступно\');');
				if(fsID == localPlayer.getVariable("player.id")) return hud_browser.execute('fractionPanelsError(\'#fractionUnInvite\', \'Вы не можете исключить себя\');');
				
				if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionUnInvite\', \'У Вас нет права исключения участников\');');
				if(typeof(mp.world.data.fractions[myFraction.id].settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionUnInvite\', \'У Вас нет права исключения участников\');');
				
				let fractionData = mp.world.data.fractions[myFraction.id];
				let fracSettings = mp.world.data.fractions[myFraction.id].settings;
				
				if(fractionData.type === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionUnInvite\', \'Управление исключениями не инициализировано\');');
				
				if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
					if(fractionData.type == "crime") {
						if(typeof(fracSettings[myFraction.rank.toString()].inviteGangs) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionUnInvite\', \'Нет доступа\');');
					}else if(fractionData.type == "gov") {
						if(myFraction.name == "ПОЛИЦИЯ") {
							if(typeof(fracSettings[myFraction.rank.toString()].invitePolice) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionUnInvite\', \'Нет доступа\');');
						}
					}
				}
				
				if(parseInt(fsRank) == 10) return hud_browser.execute('fractionPanelsError(\'#fractionUnInvite\', \'Вы не можете исключить основателя\');');
				if(typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
					fractionAction = true;
					mp.events.callRemote('fractionUnInvite', myFraction.id, fsID, fsNick, fsRank);
				}
			}
		}
	}
}
mp.events.add("fractionUnInvite", fractionUnInvite);

function fracAcceptionFailed(fracName, isAccepter, playerNick, playerID, reason) {
	if(typeof(fracName) !== "undefined" && typeof(isAccepter) !== "undefined" && typeof(playerNick) !== "undefined" && typeof(playerID) !== "undefined" && typeof(reason) !== "undefined") {
		if(fractionAction) fractionAction =	false;
		if(fracPanel) closeFracMenu();
		
		if(!isAccepter) notyAPI.error("Вы не смогли принять <b>"+playerNick+"</b> (<b>"+playerID+"</b>).", 3000, true);
		else notyAPI.error("Вы не смогли вступить в <b>"+fracName+"</b>.", 3000, true);
		notyAPI.warning(reason, 3000, false);
	}
}
mp.events.add("fracAcceptionFailed", fracAcceptionFailed);


function youAreKickedFromFraction(fracName, kickerNick, kickerID) {
	if(typeof(fracName) !== "undefined" && typeof(kickerNick) !== "undefined" && typeof(kickerID) !== "undefined") {
		if(fractionAction) fractionAction = false;
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
		if(fracPanel) closeFracMenu();
		notyAPI.success("Вы исключены из <b>"+fracName+"</b>, исключил <b>"+kickerNick+"</b> (<b>"+kickerID+"</b>)", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Исключение из ~y~"+fracName, "~s~Вас исключил "+kickerNick+" ("+kickerID+")", 5, false, true, 8000);
	}
}
mp.events.add("youAreKickedFromFraction", youAreKickedFromFraction);

function youAreKickFromFraction(fracName, kickNick, kickID) {
	if(typeof(fracName) !== "undefined" && typeof(kickNick) !== "undefined" && typeof(kickID) !== "undefined") {
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
		if(fracPanel) closeFracMenu();
		if(fractionAction) fractionAction = false;
		notyAPI.success("Вы исключили из <b>"+fracName+"</b>, игрока <b>"+kickNick+"</b> (<b>"+kickID+"</b>).", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Исключение из ~y~"+fracName, "~s~Вы исключили "+kickNick+" ("+kickID+")", 5, false, true, 8000);
	}
}
mp.events.add("youAreKickFromFraction", youAreKickFromFraction);

function fractionSetRank(fsID, fsNick, fsRank, newRank, newRankTitle) {
	if(hud_browser && typeof(fsID) !== "undefined" && typeof(fsNick) !== "undefined" && typeof(fsRank) !== "undefined" && typeof(newRank) !== "undefined" && typeof(newRankTitle) !== "undefined") {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionSetRank\', \'Изменение рангов недоступно\');');
				if(fsID == localPlayer.getVariable("player.id")) return hud_browser.execute('fractionPanelsError(\'#fractionSetRank\', \'Вы не можете изменить ранг себе\');');
				
				if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionSetRank\', \'У Вас нет права изменения рангов\');');
				if(typeof(mp.world.data.fractions[myFraction.id].settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionSetRank\', \'У Вас нет права изменения рангов\');');
				
				let fractionData = mp.world.data.fractions[myFraction.id];
				let fracSettings = mp.world.data.fractions[myFraction.id].settings;
				
				if(fractionData.type === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionSetRank\', \'Управление рангами не инициализировано\');');
				
				if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
					if(fractionData.type == "crime") {
						if(typeof(fracSettings[myFraction.rank.toString()].ranksGangs) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionSetRank\', \'Нет доступа\');');
					}else if(fractionData.type == "gov") {
						if(myFraction.name == "ПОЛИЦИЯ") {
							if(typeof(fracSettings[myFraction.rank.toString()].ranksPolice) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionSetRank\', \'Нет доступа\');');
						}
					}
				}
				
				if(parseInt(fsRank) == 10) return hud_browser.execute('fractionPanelsError(\'#fractionSetRank\', \'Вы не можете изменить ранг основателю\');');
				if(typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
					fractionAction = true;
					mp.events.callRemote('fractionSetRank', myFraction.id, fsID, fsNick, newRank, newRankTitle);
				}
			}
		}
	}
}
mp.events.add("fractionSetRank", fractionSetRank);

function youAreChangedRankFraction(fracName, changerNick, changerID, newRank, newRankTitle) {
	if(typeof(fracName) !== "undefined" && typeof(changerNick) !== "undefined" && typeof(changerID) !== "undefined" && typeof(newRank) !== "undefined" && typeof(newRankTitle) !== "undefined") {
		if(fractionAction) fractionAction = false;
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
		if(fracPanel) closeFracMenu();
		
		notyAPI.success("Ваш новый ранг в <b>"+fracName+"</b>: <b>"+newRankTitle+"</b> (<b>"+newRank+"</b>).", 3000, true);
		notyAPI.info("Изменил ранг <b>"+changerNick+"</b> (<b>"+changerID+"</b>).", 3000, false);
		
		mp.game.ui.messages.showMidsizedShard("~w~Новый ранг в ~y~"+fracName, "~s~Ранг изменён на "+newRankTitle+" ("+newRank+")~n~Изменил: "+changerNick+" ("+changerID+")", 5, false, true, 8000);
	}
}
mp.events.add("youAreChangedRankFraction", youAreChangedRankFraction);

function youAreChangeRankFraction(fracName, changeNick, changeID, newRank, newRankTitle) {
	if(typeof(fracName) !== "undefined" && typeof(changeNick) !== "undefined" && typeof(changeID) !== "undefined" && typeof(newRank) !== "undefined" && typeof(newRankTitle) !== "undefined") {
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
		if(fracPanel) closeFracMenu();
		if(fractionAction) fractionAction = false;
		notyAPI.success("Ранг для <b>"+changeNick+"</b> (<b>"+changeID+"</b>) изменён на <b>"+newRankTitle+"</b> (<b>"+newRank+"</b>).", 3000, true);
		
		mp.game.ui.messages.showMidsizedShard("~w~Новый ранг в ~y~"+fracName, "~s~Ранг изменён на "+newRankTitle+" ("+newRank+")~n~Для: "+changeNick+" ("+changeID+")", 5, false, true, 8000);
	}
}
mp.events.add("youAreChangeRankFraction", youAreChangeRankFraction);

function fracLeave() {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracLeave\', \'Вы не можете покинуть организацию\');');
				if(parseInt(myFraction.rank) == 10) return hud_browser.execute('fractionPanelsError(\'#fracLeave\', \'Вы не можете покинуть свою организацию\');');
				if(typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
					if(confirmFractionLeave >= 3) {
						if(!fractionAction) mp.events.callRemote('fracLeave', myFraction.id);
						fractionAction = true;
					}else{
						confirmFractionLeave++;
						setTimeout(function() { confirmFractionLeave--; }, 5000);
						return hud_browser.execute('fractionPanelsError(\'#fracLeave\', \'Нажмите ещё '+(3-confirmFractionLeave)+' раз(а).\');');
					}
				}
			}
		}
	}
}
mp.events.add("fracLeave", fracLeave);

function fracRanks() {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracRanks\', \'Управление рангами не инициализировано\');');
				if(typeof(mp.world.data.fractions[myFraction.id].settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracRanks\', \'Управление рангами не инициализировано\');');
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracRanks\', \'Вы не можете редактировать ранги\');');
				
				let fracSettings = mp.world.data.fractions[myFraction.id].settings;
				let fracType = mp.world.data.fractions[myFraction.id].type;
				let fracName = mp.world.data.fractions[myFraction.id].name;
				
				if(fracType == "crime") {
					if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
						let sendData = {"rank":1,"settings":fracSettings,"fracData":{"name":fracName,"type":fracType,"rank":myFraction.rank}};
						if(typeof(fracSettings[myFraction.rank.toString()].ranksGangs) !== "undefined") return hud_browser.execute('toggleEditRanksPanel(\''+JSON.stringify(sendData)+'\');');
						else return hud_browser.execute('fractionPanelsError(\'#fracRanks\', \'Нет доступа\');');
					}else{
						return hud_browser.execute('fractionPanelsError(\'#fracRanks\', \'Нет доступа\');');
					}
				}else if(fracType == "gov") {
					if(fracName == "ПОЛИЦИЯ") {
						if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
							let sendData = {"rank":1,"settings":fracSettings,"fracData":{"name":fracName,"type":fracType,"rank":myFraction.rank}};
							if(typeof(fracSettings[myFraction.rank.toString()].ranksPolice) !== "undefined") return hud_browser.execute('toggleEditRanksPanel(\''+JSON.stringify(sendData)+'\');');
							else return hud_browser.execute('fractionPanelsError(\'#fracRanks\', \'Нет доступа\');');
						}else{
							return hud_browser.execute('fractionPanelsError(\'#fracRanks\', \'Нет доступа\');');
						}
					}
				}
			}
		}
	}
}
mp.events.add("fracRanks", fracRanks);

function youAreLeaveFromFraction(fracName) {
	if(typeof(fracName) !== "undefined") {
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
		if(fracPanel) closeFracMenu();
		if(fractionAction) fractionAction = false;
		notyAPI.success("Вы успешно покинули <b>"+fracName+"</b>.", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Прощай, ~y~"+fracName, "~s~Вы успешно покинули организацию.", 5, false, true, 8000);
	}
}
mp.events.add("youAreLeaveFromFraction", youAreLeaveFromFraction);

function fracSpawn() {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracSpawn\', \'Вы не можете установить спаун\');');
				if(parseInt(myFraction.rank) != 10) return hud_browser.execute('fractionPanelsError(\'#fracSpawn\', \'Только для основателя\');');
				
				let theDist = false;
				let theCost = false;
				
				let myPos = localPlayer.position;
				if(typeof(localPlayer.getVariable("player.houses")) !== "undefined") {
					let myHouses = localPlayer.getVariable("player.houses");
					for (var k in myHouses.houses) {
						let houseData = myHouses.houses[k];
						if(typeof(houseData.params.flat) === "undefined") {
							houseData.pos = explode(",", houseData.pos);
							if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, parseFloat(houseData.pos[0]), parseFloat(houseData.pos[1]), parseFloat(houseData.pos[2]), true) <= 50) {
								theDist = mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, parseFloat(houseData.pos[0]), parseFloat(houseData.pos[1]), parseFloat(houseData.pos[2]), true);
								theCost = parseInt(houseData.cost);
							}
						}
					}
				}else{
					return hud_browser.execute('fractionPanelsError(\'#fracSpawn\', \'Только возле собственного дома\');');
				}
				
				if(theDist && theCost) {
					if(theCost < 5000000) return hud_browser.execute('fractionPanelsError(\'#fracSpawn\', \'Только возле дома стоимостью от 5 000 000 руб.\');');
					if(afFracSpawn) return hud_browser.execute('fractionPanelsError(\'#fracSpawn\', \'Раз в 30 сек.\');');
					afFracSpawn = true
					setTimeout(function() { afFracSpawn = false }, 30000);
					if(typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
						if(!fractionAction) mp.events.callRemote('fracSpawn', myFraction.id, JSON.stringify(myPos));
						fractionAction = true;
					}
				}else{
					return hud_browser.execute('fractionPanelsError(\'#fracSpawn\', \'Только возле собственного дома\');');
				}
			}
		}
	}
}
mp.events.add("fracSpawn", fracSpawn);

function fractionEditRanks(settings) {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'Нет входящих данных\');');
		settings = JSON.parse(settings);
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'Вы не можете изменять настройки рангов\');');
				
				if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'Управление рангами не инициализировано\');');
				if(typeof(mp.world.data.fractions[myFraction.id].settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'Управление рангами не инициализировано\');');
				
				let fractionData = mp.world.data.fractions[myFraction.id];
				let fracSettings = mp.world.data.fractions[myFraction.id].settings;
				
				if(fractionData.type === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'Управление рангами не инициализировано\');');
				
				if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
					if(fractionData.type == "crime") {
						if(typeof(fracSettings[myFraction.rank.toString()].ranksGangs) !== "undefined") {
							if(typeof(settings["10"].ranksGangs) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'10 ранг всегда должен иметь доступ к рангам\');');
							fractionAction = true;
							return mp.events.callRemote('fractionEditRanks', myFraction.id, JSON.stringify(settings));
						}else{
							return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'Нет доступа\');');
						}
					}else if(fractionData.type == "gov") {
						if(myFraction.name == "ПОЛИЦИЯ") {
							if(typeof(fracSettings[myFraction.rank.toString()].ranksPolice) !== "undefined") {
								if(typeof(settings["10"].ranksPolice) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'10 ранг всегда должен иметь доступ к рангам\');');
								fractionAction = true;
								return mp.events.callRemote('fractionEditRanks', myFraction.id, JSON.stringify(settings));
							}else{
								return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'Нет доступа\');');
							}
						}
					}
				}
				
				return hud_browser.execute('fractionPanelsError(\'#fractionEditRanks\', \'Нет доступа\');');
			}
		}
	}
}
mp.events.add("fractionEditRanks", fractionEditRanks);

function youAreChangeRanksFraction(fracName) {
	if(typeof(fracName) !== "undefined") {
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
		if(fracPanel) closeFracMenu();
		if(fractionAction) fractionAction = false;
		notyAPI.success("Новые настройки рангов для <b>"+fracName+"</b> установлены.", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Обновление ~y~"+fracName, "~s~Вы установили новые настройки рангов.", 5, false, true, 8000);
	}
}
mp.events.add("youAreChangeRanksFraction", youAreChangeRanksFraction);

mp.events.addDataHandler("player.fraction", function (entity, value) {
	if(entity.type == 'player' && typeof(value) !== "undefined") {
		if(typeof(value.id) !== "undefined") {
			if(entity != localPlayer) {
				let entityInStream = false;
				mp.players.forEachInStreamRange(
					(player, id) => {
						if(player == entity) {
							entityInStream = true;
							return false;
						}
					}
				);
				if(entityInStream) {
					let plFraction = value;
					if(typeof(plFraction.id) !== "undefined") {
						let tempFractions = mp.world.data.fractions;
						let fracSettings = tempFractions[plFraction.id].settings;
						if(typeof(fracSettings[plFraction.rank.toString()]) !== "undefined") {
							if(typeof(fracSettings[plFraction.rank.toString()].name) !== "undefined") entity.fRankName = fracSettings[plFraction.rank.toString()].name;
						}
					}
					if(typeof(entity.getVariable("player.inv")) !== "undefined") {
						let playerInv = entity.getVariable("player.inv");
						if(typeof(playerInv.mask) === "undefined") {
							let pos = entity.position;
							
							let blipColor = 4;
							if(typeof(entity.getVariable("player.fraction")) !== "undefined") {
								let playerFraction = entity.getVariable("player.fraction");
								if(typeof(playerFraction.color) !== "undefined") blipColor = playerFraction.color;
							}
							
							let playerBlip = mp.blips.new(1, new mp.Vector3(pos.x, pos.y, pos.z),
							{
								name: "Какой-то игрок",
								scale: 0.7,
								color: blipColor,
								shortRange: true,
								dimension: 0
							});
							playerBlip.setCategory(7);
							playerBlip.playerHandle = entity.handle;
							
							playerBlipsInStream[entity.id.toString()] = {'blip':playerBlip};
						}else{
							if(typeof(playerBlipsInStream[entity.id.toString()]) !== "undefined") {
								if(typeof(playerBlipsInStream[entity.id.toString()].blip) !== "undefined") {
									let theBlip = playerBlipsInStream[entity.id.toString()].blip;
									if(theBlip) {
										if(mp.blips.exists(theBlip)) theBlip.destroy();
									}
									playerBlipsInStream[entity.id.toString()] = undefined;
									playerBlipsInStream = JSON.parse(JSON.stringify(playerBlipsInStream));
								}
							}
						}
					}
				}	
			}
		}else{
			if(entity != localPlayer) {
				if(typeof(entity.fRankName) !== "undefined") entity.fRankName = undefined;
			}
		}
	}
});

function youAreChangeSpawnFraction(fracName) {
	if(typeof(fracName) !== "undefined") {
		if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
		if(fracPanel) closeFracMenu();
		if(fractionAction) fractionAction = false;
		notyAPI.success("Новый спаун для <b>"+fracName+"</b> установлен.", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Обновление ~y~"+fracName, "~s~Вы установили новую спаун позицию.", 5, false, true, 8000);
	}
}
mp.events.add("youAreChangeSpawnFraction", youAreChangeSpawnFraction);
}