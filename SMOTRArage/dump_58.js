{
var mreosInStream = [];

function closeMreoBlank() {
	if(hud_browser) {
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
		hud_browser.execute("toggleNumBuyPanel();");
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("closeMreoBlank", closeMreoBlank);

function checkFreeNumber(numForCheck) {
	if(hud_browser && numForCheck && numForCheck.length == 8) {
		numForCheck = numForCheck.toString();
		mp.events.callRemote('checkFreeNumber', numForCheck);
	}
}
mp.events.add("checkFreeNumber", checkFreeNumber);

function checkFreeNumberResult(checkResult) {
	if(hud_browser && checkResult) {
		checkResult = checkResult.toString();
		if(checkResult == "free") hud_browser.execute("toggleNumBuyPanel('2', '{}');");
		else if(checkResult == "busy") hud_browser.execute("numBuyPanelError('Такой номер к сожалению занят');");
		else if(checkResult == "systemError") closeMreoBlank();
	}
}
mp.events.add("checkFreeNumberResult", checkFreeNumberResult);

function numberBuy(numForCheck, cost) {
	if(hud_browser && numForCheck && numForCheck.length == 8) {
		cost = parseInt(cost);
		let myMoney = parseInt(localPlayer.getVariable("player.money"));
		if(myMoney < cost) return hud_browser.execute("numBuyBlankError('Недостаточно средств для покупки');");
		
		if(!localPlayer.vehicle) return false;
		let theVeh = localPlayer.vehicle;
		if(vehSeat != -1) return false;
		
		if(localPlayer.getVariable('player.id') && localPlayer.getVariable('player.money') && theVeh.getVariable('veh.id') && theVeh.getVariable('veh.num') && theVeh.getVariable('veh.own') && theVeh.getVariable('veh.params')) {
			if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')))) {
				let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
				if(vehOwn.remoteId.toString() == localPlayer.remoteId.toString()) {
					if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')))) {
						let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
						if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) return hud_browser.execute("numBuyBlankError('Только личное ТС');");
					}else{
						return hud_browser.execute("numBuyBlankError('Только личное ТС');");
					}
					if(theVeh.getVariable('veh.num') == "theMoto") return hud_browser.execute("numBuyBlankError('На мото нельзя');");
					
					if(typeof(theVeh.getVariable('veh.params')) !== "undefined") {
						let vehParams = JSON.parse(theVeh.getVariable("veh.params"));
						if(typeof(vehParams.rent) !== "undefined") return hud_browser.execute("numBuyBlankError('Это арендованый транспорт');");
					}
					
					numForCheck = numForCheck.toString();
					mp.events.callRemote('numberBuy', numForCheck, cost);
				}
			}
		}
	}
}
mp.events.add("numberBuy", numberBuy);

function buyNumberResult(checkResult, num, cost) {
	if(hud_browser && checkResult) {
		checkResult = checkResult.toString();
		if(checkResult == "free") {
			closeMreoBlank();
			if(num && cost) {
				let costText = cost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
				mp.game.ui.messages.showMidsizedShard("~y~Номер ~w~приобретён", "~s~"+num+"~n~К оплате~g~~h~"+costText+" ~s~руб.", 5, false, true, 5000);
			}
		}else if(checkResult == "busy") {
			hud_browser.execute("numBuyBlankError('Этот номер успели перекупить, подберите другой..');");
		}else if(checkResult == "noMoney") {
			hud_browser.execute("numBuyBlankError('Недостаточно средств для покупки');");
		}else if(checkResult == "error") {
			hud_browser.execute("numBuyBlankError('Произошла ошибка базы данных, попробуйте позже..');");
		}
	}
}
mp.events.add("buyNumberResult", buyNumberResult);

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != 'undefined' && typeof(shape.data) == 'undefined') {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'mreo_render') {
					let mreoData = shape.getVariable('col.data');
					
					let mreoMarker = mp.markers.new(1, new mp.Vector3(mreoData[0], mreoData[1], mreoData[2]), 3.0,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [205, 101, 30, 200],
						visible: true,
						dimension: 0
					});
					
					let mreoCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(mreoData[0]), parseFloat(mreoData[1]), parseFloat(mreoData[2])+2.4), 2.2,
					{
						color: [255, 255, 255, 0],
						visible: true,
						dimension: localPlayer.dimension
					});
					mreoCheck.mreoData = mreoData;
					
					let mreoArray = {'marker': mreoMarker, 'check': mreoCheck, 'pos': [mreoData[0], mreoData[1], mreoData[2]], 'alpha': 0};
					mreosInStream.push(mreoArray);
					return null;
				}
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.mreoData) !== "undefined") {
			let mreoData = checkpoint.mreoData;
			if(localPlayer.vehicle && hud_browser) {
				let theVeh = localPlayer.vehicle;
				if(vehSeat != -1) return false;
				let vehClass = theVeh.getClass();
				if(localPlayer.getVariable('player.id') && localPlayer.getVariable('player.money') && theVeh.getVariable('veh.id') && theVeh.getVariable('veh.num') && theVeh.getVariable('veh.own')) {
					if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас более 50 000 руб. не оплаченных штрафов</span>");
					if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас более 50 000 руб. не оплаченных штрафов</span>");
					
					if(mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')))) {
						let vehOwn = mp.players.atRemoteId(parseInt(theVeh.getVariable('veh.own')));
						if(vehOwn.remoteId.toString() != localPlayer.remoteId.toString()) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Регистрационные действия разрешены только с личным транспортом.</span>");
					}else{
						return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Регистрационные действия разрешены только с личным транспортом.</span>");
					}
					
					if(theVeh.getVariable('veh.num') == "theMoto") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Регистрационные действия для мото-техники недоступны.</span>");
					if(vehClass.toString() == "15") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Регистрационные действия для вертолётов недоступны.</span>");
					
					if(typeof(theVeh.getVariable('veh.params')) !== "undefined") {
						let vehParams = JSON.parse(theVeh.getVariable("veh.params"));
						if(typeof(vehParams.rent) !== "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Рег. действия на арендованном транспорте запрещены.</span>");
					}
					
					allowBinds = [];
					hud_browser.execute('toggleNumBuyPanel(\'1\', \'{"vid":"'+theVeh.getVariable('veh.id')+'","number":"'+theVeh.getVariable('veh.num')+'","money":"'+localPlayer.getVariable('player.money')+'"}\');');
					mp.gui.cursor.visible = true;
					mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
					return false;
				}else{
					return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Регистрационные действия разрешены только с личным транспортом.</span>");
				}
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape) != 'undefined') {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'mreo_render') {
					let mreoData = shape.getVariable('col.data');
					for(var i in mreosInStream) {
						let tempData = mreosInStream[i];
						let posData = tempData['pos'];
						if (posData[0] == mreoData[0] && posData[1] == mreoData[1] && posData[2] == mreoData[2]) {
							if(tempData['marker']) {
								tempData['marker'].destroy();
								delete tempData['marker'];
							}
							if(tempData['check']) {
								tempData['check'].destroy();
								delete tempData['check'];
							}
							if(mreosInStream[i] || mreosInStream[i] !== undefined) delete mreosInStream[i];
						}
					}
					mreosInStream = mreosInStream.filter(function (el) { return el != null; });
					return false;
				}
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.mreoData) !== "undefined") {
			return closeMreoBlank();
		}
	}
});
}訹ヵ㿱訤繫뼹㿰霨පõ