{
var atmBrowser = null;
var atmInStream = {};
var afBank = false;
var activeATMoperation = false;

function exitAtm() {
	if(atmBrowser) {
		restoreBinds();
		atmBrowser.destroy();
		atmBrowser = null;
		mp.gui.cursor.visible = false;
		localPlayer.freezePosition(false);
	}
}
mp.events.add("exitAtm", exitAtm);

function getPlayersForBankCEF() {
	if (atmBrowser) {
		mp.events.callRemote('getPlayersForBankCEF');
	}
}
mp.events.add("getPlayersForBankCEF", getPlayersForBankCEF);

function donateConvert(convertVal) {
	if(atmBrowser) {
		if(activeATMoperation) return atmBrowser.execute("msg_error('У Вас есть не завершённые операции, подождите..');");
		if(afBank) return atmBrowser.execute("msg_error('Слишком частые операции, подождите 5 секунд.');");
		if(typeof(convertVal) != "undefined") {
			convertVal = parseInt(convertVal);
			let playerDonate = parseInt(localPlayer.getVariable('player.donate'));
			let playerBank = parseInt(localPlayer.getVariable('player.bank'));
			if(playerDonate < convertVal) {
				return atmBrowser.execute("msg_error('Недостаточно донат едениц для конвертации');");
			}else{
				if(convertVal < 10) return atmBrowser.execute("msg_error('Конвертировать можно от <b>10</b> донат ед.');");
				if(convertVal > 99999) return atmBrowser.execute("msg_error('Конвертировать можно до <b>99 999</b> донат ед. за раз');");
				afBank = true;
				setTimeout(function() { afBank = false }, 5000);
				activeATMoperation = true;
				mp.events.callRemote('donateConvert', roundNumber(convertVal, 0));
			}
		}
	}
}
mp.events.add("donateConvert", donateConvert);

function donateConvertUpdated(minusDonate, plusBank, newDonate, newBank) {
	if(typeof(minusDonate) !== "undefined" && typeof(plusBank) !== "undefined" && typeof(newDonate) !== "undefined" && typeof(newBank) !== "undefined") {
		if(atmBrowser) mp.events.call("exitAtm");
		chatAPI.notifyPush(" * Вы конвертировали <span style=\"color:#FEBC00\"><b>"+minusDonate.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> донат ед. в <span style=\"color:#FEBC00\"><b>"+plusBank.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
		chatAPI.notifyPush(" * Донат-счёт: <span style=\"color:#FEBC00\"><b>"+newDonate.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> донат ед., банковский счёт: <span style=\"color:#FEBC00\"><b>"+newBank.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
		mp.game.ui.messages.showMidsizedShard("~w~Вы конвертировали ~y~донат ~w~еденицы", "~s~Вы получили"+plusBank.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.~n~На банковский счёт, с уважением банк Los-Santos.", 5, false, true, 8000);
	}
	activeATMoperation = false;
}
mp.events.add("donateConvertUpdated", donateConvertUpdated);

function depositBank(depositVal) {
	if(atmBrowser) {
		if(activeATMoperation) return atmBrowser.execute("msg_error('У Вас есть не завершённые операции, подождите..');");
		if(afBank) return atmBrowser.execute("msg_error('Слишком частые операции, подождите 5 секунд.');");
		if(typeof(depositVal) != "undefined") {
			depositVal = parseInt(depositVal);
			let playerMoney = parseInt(localPlayer.getVariable('player.money'));
			let playerBank = parseInt(localPlayer.getVariable('player.bank'));
			if(playerMoney < depositVal) {
				return atmBrowser.execute("msg_error('Недостаточно средств для пополнения');");
			}else{
				if(depositVal < 1000) return atmBrowser.execute("msg_error('Пополнить можно от <b>1 000</b> руб.');");
				if(depositVal > 100000000) return atmBrowser.execute("msg_error('Пополнить можно до <b>100 000 000</b> руб. за раз');");
				afBank = true;
				setTimeout(function() { afBank = false }, 5000);
				activeATMoperation = true;
				mp.events.callRemote('bankDeposit', roundNumber(depositVal, 0));
			}
		}
	}
}
mp.events.add("depositBank", depositBank);

function bankUpdated(newMoney, newBank) {
	if(atmBrowser && typeof(newMoney) !== "undefined" && typeof(newBank) !== "undefined") {
		atmBrowser.execute("bankUpdated('"+newMoney+"', '"+newBank+"');");
	}
	activeATMoperation = false;
}
mp.events.add("bankUpdated", bankUpdated);

function withdrawBank(withdrawVal) {
	if(atmBrowser) {
		if(activeATMoperation) return atmBrowser.execute("msg_error('У Вас есть не завершённые операции, подождите..');");
		if(afBank) return atmBrowser.execute("msg_error('Слишком частые операции, подождите 5 секунд.');");
		if(typeof(withdrawVal) != "undefined") {
			withdrawVal = parseInt(withdrawVal);
			let playerMoney = parseInt(localPlayer.getVariable('player.money'));
			let playerBank = parseInt(localPlayer.getVariable('player.bank'));
			if(playerBank < withdrawVal) {
				return atmBrowser.execute("msg_error('Недостаточно средств для снятия');");
			}else{
				if(withdrawVal < 1000) return atmBrowser.execute("msg_error('Снять можно от <b>1 000</b> руб.');");
				if(withdrawVal > 100000000) return atmBrowser.execute("msg_error('Снять можно до <b>100 000 000</b> руб. за раз');");
				afBank = true;
				setTimeout(function() { afBank = false }, 5000);
				activeATMoperation = true;
				mp.events.callRemote('bankWithdraw', roundNumber(withdrawVal, 0));
			}
		}
	}
}
mp.events.add("withdrawBank", withdrawBank);

function makeTicketsPay(ticketsVal) {
	if(atmBrowser) {
		if(activeATMoperation) return atmBrowser.execute("msg_error('У Вас есть не завершённые операции, подождите..');");
		if(afBank) return atmBrowser.execute("msg_error('Слишком частые операции, подождите 5 секунд.');");
		if(typeof(ticketsVal) !== "undefined") {
			if(!ticketsVal || ticketsVal == "0" || ticketsVal == "" || ticketsVal == " ") return atmBrowser.execute("msg_error('Вы не ввели сумму');");
			ticketsVal = parseInt(ticketsVal);
			let playerTickets = parseInt(localPlayer.getVariable('player.tickets'));
			let playerBank = parseInt(localPlayer.getVariable('player.bank'));
			if(playerBank < ticketsVal) {
				return atmBrowser.execute("msg_error('Недостаточно средств для оплаты');");
			}else{
				if(ticketsVal < 1000) return atmBrowser.execute("msg_error('Оплатить можно от <b>1 000</b> руб.');");
				if(ticketsVal > 9999999) return atmBrowser.execute("msg_error('Оплатить можно до <b>9 999 999</b> руб. за раз');");
				if(!playerTickets || playerTickets == 0) return atmBrowser.execute("msg_error('У Вас нет не оплаченных штрафов');");
				if(playerTickets < ticketsVal) return atmBrowser.execute("msg_error('У Вас нет столько штрафов');");
				afBank = true;
				setTimeout(function() { afBank = false }, 5000);
				activeATMoperation = true;
				mp.events.callRemote('makeTicketsPay', roundNumber(ticketsVal, 0));
			}
		}
	}
}
mp.events.add("makeTicketsPay", makeTicketsPay);

function makeTicketsPayed(ticketsVal) {
	if(atmBrowser) {
		if(typeof(ticketsVal) !== "undefined") {
			if(atmBrowser) mp.events.call("exitAtm");
			activeATMoperation = false;
			chatAPI.notifyPush(" * Вы оплатили штрафы на сумму <span style=\"color:#FEBC00\"><b>"+ticketsVal.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
			mp.game.ui.messages.showMidsizedShard("~y~Успешная ~w~оплата штрафов", "~s~Вы оплатили"+ticketsVal.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.~n~С банковского счёта, с уважением банк Los-Santos.", 5, false, true, 8000);
		}
	}
}
mp.events.add("makeTicketsPayed", makeTicketsPayed);

function getOnlinePlayers() {
	if(atmBrowser) {
		let onlinePlayers = {};
		onlinePlayers["players"] = [];
		mp.players.forEach(
			(player, id) => {
				if(player != localPlayer) {
					if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
						onlinePlayers.players.push({"id":player.getVariable('player.id'),"nick":player.getVariable('player.nick')});
					}
				}
			}
		);
		/*let i = 0;
		while (i < 50) {
			onlinePlayers.players.push({"id":999999,"nick":"Player"+i});
			i++;
		}*/
		atmBrowser.execute("gettedOnlinePlayers('"+JSON.stringify(onlinePlayers)+"');");
	}
}
mp.events.add("getOnlinePlayers", getOnlinePlayers);

function transferBank(transferID, transferVal) {
	if(atmBrowser) {
		if(activeATMoperation) return atmBrowser.execute("msg_error('У Вас есть не завершённые операции, подождите..');");
		if(afBank) return atmBrowser.execute("msg_error('Слишком частые операции, подождите 5 секунд.');");
		if(!localPlayer.getVariable("player.blocks")) return atmBrowser.execute("msg_error('Перевод денег сейчас недоступен..');");
		
		let blocksData = localPlayer.getVariable("player.blocks");
		if(typeof(blocksData.mins) === "undefined") return atmBrowser.execute("msg_error('Для активации переводов, необходимо иметь стаж: минимум 3 часа на сервере.');");
		if(parseInt(blocksData.mins) < 180) return atmBrowser.execute("msg_error('Для активации переводов, необходимо иметь стаж: минимум 3 часа на сервере.');");
		
		if(typeof(transferID) != "undefined" && typeof(transferVal) != "undefined") {
			transferID = parseInt(transferID);
			transferVal = parseInt(transferVal);
			let playerBank = parseInt(localPlayer.getVariable('player.bank'));
			if(playerBank < transferVal) {
				return atmBrowser.execute("msg_error('Недостаточно средств для перевода');");
			}else{
				if(transferVal < 1000) return atmBrowser.execute("msg_error('Перевести можно от <b>1 000</b> руб.');");
				if(transferVal > 100000000) return atmBrowser.execute("msg_error('Перевести можно до <b>100 000 000</b> руб. за раз');");
				
				if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return atmBrowser.execute("msg_error('У Вас более 50 000 руб. штрафов');");
				if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return atmBrowser.execute("msg_error('У Вас более 50 000 руб. штрафов');");
				
				let isFinded = false;
				mp.players.forEach(
					(player, id) => {
						if(typeof(player.getVariable("player.id")) !== "undefined") {
							if(parseInt(player.getVariable("player.id")) == transferID) isFinded = player;
						}
					}
				);
				
				if(!isFinded) return atmBrowser.execute("msg_error('Для этого игрока недоступен сейчас перевод');");
				
				afBank = true;
				setTimeout(function() { afBank = false }, 5000);
				activeATMoperation = true;
				mp.events.callRemote('bankTransfer', isFinded, roundNumber(transferVal, 0));
			}
		}
	}
}
mp.events.add("transferBank", transferBank);

function bankTransfered(toMe, actionPlayer, summa, isError) {
	if(actionPlayer && summa) {
		if(isError) {
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Перевод не удался, повторите попытку..</span>");
		}
		if(atmBrowser) mp.events.call("exitAtm");
		let nick = "Инкогнито"
		let id = 0;
		
		setTimeout(function() {
			let myBank = 0;
			if(typeof(localPlayer.getVariable("player.bank")) !== "undefined") myBank = localPlayer.getVariable("player.bank").toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
			mp.game.ui.notifications.showWithPicture("Менеджер SMOTRAbank", "Новый баланс", "~w~Состояние:~o~"+myBank+" ~w~руб.", "CHAR_BANK_BOL", 1, false, 1, 2);
		}, 3000);
		
		if(toMe) {
			if(typeof(actionPlayer.getVariable("player.id")) != "undefined") id = actionPlayer.getVariable("player.id");
			if(typeof(actionPlayer.getVariable("player.nick")) != "undefined") nick = actionPlayer.getVariable("player.nick");
			chatAPI.notifyPush(" * <span style=\"color:#FEBC00\"><b>"+nick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+id+"</b></span>) перевёл Вам<span style=\"color:#FEBC00\"><b>"+summa.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
			mp.game.ui.messages.showMidsizedShard("~y~Перевод от ~w~"+nick+" ~y~(~w~"+id+"~y~)", "~s~Вы получили"+summa.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.~n~Банковским переводом, с уважением банк Los-Santos.", 5, false, true, 8000);
		}else{
			if(typeof(actionPlayer.getVariable("player.id")) != "undefined") id = actionPlayer.getVariable("player.id");
			if(typeof(actionPlayer.getVariable("player.nick")) != "undefined") nick = actionPlayer.getVariable("player.nick");
			chatAPI.notifyPush(" * Вы перевели <span style=\"color:#FEBC00\"><b>"+summa.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб. <span style=\"color:#FEBC00\"><b>"+nick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+id+"</b></span>).");
			mp.game.ui.messages.showMidsizedShard("~y~Перевод для ~w~"+nick+" ~y~(~w~"+id+"~y~)", "~s~Вы отправили"+summa.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.~n~Банковским переводом, с уважением банк Los-Santos.", 5, false, true, 8000);
			activeATMoperation = false;
		}
	}
}
mp.events.add("bankTransfered", bankTransfered);

function bankOperationFailed() {
	if(atmBrowser) mp.events.call("exitAtm");
	activeATMoperation = false;
	return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Служба безопасности банка отменила транзакцию.</span>");
}
mp.events.add("bankOperationFailed", bankOperationFailed);

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.atmData) !== "undefined") {
			if(typeof(localPlayer.getVariable('player.id')) != "undefined" && !localPlayer.vehicle && hud_browser) {
				if(typeof(localPlayer.getVariable('player.money')) != "undefined" && typeof(localPlayer.getVariable('player.bank')) != "undefined" && typeof(localPlayer.getVariable('player.donate')) != "undefined" && typeof(localPlayer.getVariable('player.tickets')) != "undefined") {
					if (!atmBrowser) {
						if(activeATMoperation) return false;
						//return chatAPI.notifyPush(" * Донат баланс <span style=\"color:#FEBC00\"><b>"+localPlayer.getVariable('player.donate')+"</b></span>.");
						localPlayer.freezePosition(true);
						atmBrowser = mp.browsers.new("package://CEF/atm/index.html");
						setTimeout(function() {
							if(atmBrowser) {
								allowBinds = [];
								atmBrowser.execute("initATMData("+localPlayer.getVariable('player.id')+", '"+localPlayer.getVariable('player.nick')+"', "+localPlayer.getVariable('player.money')+", "+localPlayer.getVariable('player.bank')+", "+localPlayer.getVariable('player.donate')+", "+localPlayer.getVariable('player.tickets')+");");
								mp.gui.cursor.visible = true;
							}
						}, 100);
					}
				}
				return false;
			}
		}
		if(typeof(checkpoint.getVariable("checkpoint.type")) !== "undefined") {
			let checkPointType = checkpoint.getVariable("checkpoint.type");
			if(checkPointType == "atm_render") {
				let atmData = checkpoint.getVariable('checkpoint.data');
				
				let atmMarker = mp.markers.new(1, new mp.Vector3(parseFloat(atmData[0]), parseFloat(atmData[1]), parseFloat(atmData[2])), 1.4,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [146, 208, 170, 185],
					visible: true,
					dimension: 0
				});
				
				let atmCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(atmData[0]), parseFloat(atmData[1]), parseFloat(atmData[2])+1.2), 0.8,
				{
					color: [255, 255, 255, 0],
					visible: true,
					dimension: localPlayer.dimension
				});
				atmCheck.atmData = atmData;
				
				atmInStream[checkpoint.remoteId.toString()] = {'marker':atmMarker.id.toString(),'check':atmCheck.id.toString(),'pos':[parseFloat(atmData[0]),parseFloat(atmData[1]),parseFloat(atmData[2])],'alpha':0};
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.atmData) !== "undefined") {
			return mp.events.call("exitAtm");
		}
		if(typeof(checkpoint.getVariable("checkpoint.type")) !== "undefined") {
			let checkPointType = checkpoint.getVariable("checkpoint.type");
			if(checkPointType == "atm_render") {
				let atmData = checkpoint.getVariable('checkpoint.data');
				
				if(typeof(atmData) !== "undefined") {
					if(typeof(atmInStream[checkpoint.remoteId.toString()]) !== "undefined") {
						let tempData = atmInStream[checkpoint.remoteId.toString()];
						let tempMarker = mp.markers.at(parseInt(tempData['marker']));
						if(mp.markers.exists(tempMarker)) tempMarker.destroy();
						let tempCheck = mp.checkpoints.at(parseInt(tempData['check']));
						if(mp.markers.exists(tempCheck)) tempCheck.destroy();
						atmInStream[checkpoint.remoteId.toString()] = undefined;
						atmInStream = JSON.parse(JSON.stringify(atmInStream));
					}
				}
			}
		}
	}
});
}纐盺Ǚ