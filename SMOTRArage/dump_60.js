{
var numchsInStream = [];
var numchPanel = false;
var activeNumch = false;

function numchPanelClose() {
	if(hud_browser) {
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
		hud_browser.execute("toggleNumchPanel();");
		mp.gui.cursor.visible = false;
		numchPanel = false;
		restoreBinds();
	}
}
mp.events.add("numchPanelClose", numchPanelClose);

mp.events.add('numchGo', (numchFrom, numchTo) => {
	if(typeof(numchFrom) !== 'undefined' && typeof(numchTo) !== 'undefined') {
		if(activeNumch) return hud_browser.execute("errorNumch('Пожалуйста подождите..');");
		
		numchFrom = JSON.parse(numchFrom);
		numchFrom = numchFrom[0];
		numchTo = JSON.parse(numchTo);
		numchTo = numchTo[0];
		
		let myMoney = localPlayer.getVariable("player.money");
		if(myMoney < 500000) return hud_browser.execute("errorNumch('Недостаточно средств для переноса номерных знаков..');");
		
		if(hud_browser && numchFrom && numchTo) {
			if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
				if(localPlayer.getVariable("active.deal")) return hud_browser.execute("errorNumch('У Вас есть активная сделка, завершите её..');");
			}
			
			if(numchFrom.id == numchTo.id) return hud_browser.execute("errorNumch('Вы не выбрали транспорт для переноса');");
			if(numchFrom.type != numchTo.type) return hud_browser.execute("errorNumch('Типы транспортных средств не совпадают');");
			
			numchPanelClose();
			activeNumch = true;
			return mp.events.callRemote('numchGo', JSON.stringify(numchFrom), JSON.stringify(numchTo));
		}
	}else{
		if(hud_browser) return hud_browser.execute("errorNumch('Произошла неизвестная ошибка..');");
	}
});

mp.events.add('numchResult', (numchRes, numchReason) => {
	activeNumch = false;
	if(typeof(numchRes) !== 'undefined') {
		if(numchRes == "ok") {
			return mp.game.ui.messages.showMidsizedShard("~y~Вы успешно ~w~перенесли номера", "~s~Потрачено ~g~~h~500 000 ~s~руб.", 5, false, true, 8000);
		}else if(numchRes == "error") {
			if(numchReason) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+numchReason+"</span>");
			else if(numchReason) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Неизвестная ошибка во время переноса номеров..</span>");
		}
	}else{
		if(hud_browser) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Неизвестная ошибка во время переноса номеров..</span>");
	}
});

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != 'undefined' && typeof(shape.data) == 'undefined') {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'numch') {
					if(!localPlayer.vehicle && hud_browser && !activeNumch) {
						if(localPlayer.getVariable('player.id') && localPlayer.getVariable('player.money')) {
							if(typeof(localPlayer.getVariable('player.vehs')) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Перенос номеров для Вас недоступен, попробуйте позже..</span>");
							if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
								if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас есть активная сделка, завершите её..</span>");
							}
							
							if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас более 50 000 руб. не оплаченных штрафов</span>");
							if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас более 50 000 руб. не оплаченных штрафов</span>");
							
							if(vehPanel) closeVehMenu();

							var tempJSon = localPlayer.getVariable('player.vehs');
							
							for(var k in tempJSon.vehicles) {
								let vehHash = tempJSon.vehicles[k].hash;
								let vehName = vehHash;
								let vehType = "vehicle";
								
								let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
								decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
								
								if(typeof(decVehStats[0][vehHash]) != "undefined") {
									vehName = decVehStats[0][vehHash].name;
									vehType = decVehStats[0][vehHash].type;
								}
								tempJSon.vehicles[k].name = vehName;
								tempJSon.vehicles[k].type = vehType;
								
								let vehNumber = tempJSon.vehicles[k].number;
								if(vehNumber == "theMoto") tempJSon.vehicles[k] = null;
								
								if(tempJSon.vehicles[k]) {
									if(tempJSon.vehicles[k].hasOwnProperty("params") !== null) {
										if(typeof(tempJSon.vehicles[k].params) !== "undefined") {
											let vehParams = tempJSon.vehicles[k].params;
											if(typeof(vehParams.rent) !== "undefined") tempJSon.vehicles[k] = null;
										}else{
											tempJSon.vehicles[k] = null;
										}
									}else{
										tempJSon.vehicles[k] = null;
									}
								}else{
									tempJSon.vehicles[k] = null;
								}
							}
							tempJSon.vehicles = Object.entries(tempJSon.vehicles).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
							
							hud_browser.execute("toggleNumchPanel('"+JSON.stringify(tempJSon)+"');");
							mp.gui.cursor.visible = true;
							
							allowBinds = [];
							
							mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
							
							numchPanel = true;
							
							return false;
						}
					}
				}
				if(colType == 'numch_render') {
					let numchColData = shape.getVariable('col.data');
					
					let numchMarker = mp.markers.new(1, new mp.Vector3(numchColData[0], numchColData[1], numchColData[2]), 2.0,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [255, 255, 255, 200],
						visible: true,
						dimension: 0
					});
					
					let numchArray = {'marker': numchMarker, 'pos': [numchColData[0], numchColData[1], numchColData[2]], 'alpha': 0};
					numchsInStream.push(numchArray);
					return false;
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
				if(colType == 'numch' && numchPanel) return numchPanelClose();
				if(colType == 'numch_render') {
					let numchColData = shape.getVariable('col.data');
					for(var i in numchsInStream) {
						let tempData = numchsInStream[i];
						let posData = tempData['pos'];
						if (posData[0] == numchColData[0] && posData[1] == numchColData[1] && posData[2] == numchColData[2]) {
							if(tempData['marker']) {
								tempData['marker'].destroy();
								delete tempData['marker'];
							}
							if(numchsInStream[i] || numchsInStream[i] !== undefined) delete numchsInStream[i];
						}
					}
					numchsInStream = numchsInStream.filter(function (el) { return el != null; });
					return false;
				}
			}
		}
	}
});
}