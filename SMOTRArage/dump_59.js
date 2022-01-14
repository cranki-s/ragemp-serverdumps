{
var obmensInStream = [];
var obmenData = false;

function closeObmenPanel() {
	if(hud_browser) {
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
		hud_browser.execute("toggleObmenPanel();");
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("closeObmenPanel", closeObmenPanel);

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) != 'undefined' && typeof(shape.data) == 'undefined') {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'obmen') {
					if(!localPlayer.vehicle && hud_browser) {
						if(localPlayer.getVariable('player.id') && localPlayer.getVariable('player.money')) {
							if(typeof(localPlayer.getVariable('player.vehs')) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Обменник для Вас недоступен, попробуйте позже..</span>");
							if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
								if(localPlayer.getVariable("active.deal")) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас уже есть активная сделка..</span>");
							}
							
							if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас более 50 000 руб. не оплаченных штрафов</span>");
							if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас более 50 000 руб. не оплаченных штрафов</span>");
							
							allowBinds = [];
							obmenData = false;
							
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
							
							if(vehPanel) closeVehMenu();
							
							hud_browser.execute('toggleObmenPanelStuffCreation(\''+JSON.stringify(tempPlayers)+'\');');
							mp.gui.cursor.visible = true;
							mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
							return false;
						}
					}
				}
				if(colType == 'obmen_render') {
					let obmenColData = shape.getVariable('col.data');
					
					let obmenMarker = mp.markers.new(1, new mp.Vector3(obmenColData[0], obmenColData[1], obmenColData[2]), 2.0,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [91, 184, 232, 200],
						visible: true,
						dimension: 0
					});
					
					let obmenArray = {'marker': obmenMarker, 'pos': [obmenColData[0], obmenColData[1], obmenColData[2]], 'alpha': 0};
					obmensInStream.push(obmenArray);
					return null;
				}
			}
		}
	}
});

function closeAllObmenWindows() {
	if(hud_browser) hud_browser.execute('toggleObmenPanel();');
	mp.gui.cursor.visible = false;
	restoreBinds();
	mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
}

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape) != 'undefined') {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'obmen') {
					obmenData = false;
					return closeAllObmenWindows();
				}
				if(colType == 'obmen_render') {
					let obmenColData = shape.getVariable('col.data');
					for(var i in obmensInStream) {
						let tempData = obmensInStream[i];
						let posData = tempData['pos'];
						if (posData[0] == obmenColData[0] && posData[1] == obmenColData[1] && posData[2] == obmenColData[2]) {
							if(tempData['marker']) {
								tempData['marker'].destroy();
								delete tempData['marker'];
							}
							if(obmensInStream[i] || obmensInStream[i] !== undefined) delete obmensInStream[i];
						}
					}
					obmensInStream = obmensInStream.filter(function (el) { return el != null; });
					return false;
				}
			}
		}
	}
});

mp.events.add('refreshObmenPlayers', () => {
	if(hud_browser) {
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
		hud_browser.execute('toggleObmenPanelStuffCreation(\''+JSON.stringify(tempPlayers)+'\');');
	}
});

mp.events.add('obmenPanelStuffCreationClose', () => {
	if(hud_browser) {
		if(obmenData) {
			if(typeof(obmenData.obmenNick) != "undefined" && typeof(obmenData.obmenID) != "undefined" && typeof(obmenData.initiator) != "undefined") {
				let thePlayer = false;
				mp.players.forEach(
					(player) => {
						if(typeof(player.getVariable("player.id")) != "undefined") {
							if(player.getVariable("player.id") == obmenData.obmenID) thePlayer = player;
						}
					}
				);
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы отменили сеанс обмена с <span style=\"color:#fff;\">"+obmenData.obmenNick+"</span> (<span style=\"color:#fff;\">"+obmenData.obmenID+"</span>)</span>");
				if(thePlayer) mp.events.callRemote('cancelObmen', thePlayer, obmenData.initiator);
				else mp.events.callRemote('cancelObmen');
			}
		}else{
			mp.events.callRemote('cancelObmen');
		}
		if(vehPanel) closeVehMenu();
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('sendObmenOffer', (theNick, theID) => {
	if(hud_browser && theNick && theID) {
		theNick = theNick.toString();
		theID = parseInt(theID);
		let thePlayer = false;
		
		let myPos = localPlayer.position;
		mp.players.forEachInStreamRange(
			(player) => {
				if(player != localPlayer) {
					let plPos = player.position;
					if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true) <= 10) {
						if(typeof(player.getVariable("player.id")) != "undefined") {
							if(theID == player.getVariable("player.id")) thePlayer = player;
						}
					}
				}
			}
		);
		
		if(thePlayer) {
			if(thePlayer.getVariable("active.deal")) return hud_browser.execute('errorObmenPanelStuffCreation("У Игрока '+theNick+' есть активный обмен.");');
			obmenData = {"initiator":true,"com":0,"fromVehs":[],"fromStuff":[],"toStuff":[],"obmenNick":theNick,"obmenID":theID,"fromReady":false,"fromGo":false,"toReady":false,"toGo":false};
			hud_browser.execute('toggleObmenPanelStuffOffer(true,"'+theNick+'","'+theID+'");');
			mp.events.callRemote('offerObmen', thePlayer, obmenData.initiator);
		}else{
			hud_browser.execute('errorObmenPanelStuffCreation("Игрока '+theNick+' нет рядом.");');
		}
		
		if(vehPanel) closeVehMenu();
	}else{
		if(vehPanel) closeVehMenu();
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenOffered', (theNick, theID, isInitiator) => {
	if(typeof(theNick) != "undefined" && typeof(theID) != "undefined" && typeof(isInitiator) != "undefined") {
		obmenData = {"initiator":false,"com":0,"fromVehs":[],"fromStuff":[],"toStuff":[],"obmenNick":theNick,"obmenID":theID,"fromReady":false,"fromGo":false,"toReady":false,"toGo":false};
		if(hud_browser) hud_browser.execute('toggleObmenPanelStuffOffer(false,"'+theNick+'","'+theID+'");');
		mp.gui.cursor.visible = true;
		allowBinds = [];
		mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
	}
});

mp.events.add('obmenCanceled', (theNick, theID, isInitiator) => {
	if(typeof(theNick) != "undefined" && typeof(theID) != "undefined" && typeof(isInitiator) != "undefined") {
		if(obmenData && theNick && theID) chatAPI.sysPush("<span style=\"color:#FF6146\"> * <span style=\"color:#fff;\">"+theNick+"</span> (<span style=\"color:#fff;\">"+theID+"</span>) отменил сеанс обмена.</span>");
		if(hud_browser) hud_browser.execute('toggleObmenPanel();');
		obmenData = false;
		mp.gui.cursor.visible = false;
		restoreBinds();
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
	}
});

mp.events.add('acceptObmen', () => {
	if(hud_browser) {
		if(obmenData) {
			if(vehPanel) closeVehMenu();
			if(numchPanel) numchPanelClose();
			
			if(typeof(localPlayer.getVariable("player.tickets")) === "undefined") return hud_browser.execute('errorObmenPanelStuffOffer("У Вас более 50 000 руб. не оплаченных штрафов");');
			if(parseInt(localPlayer.getVariable("player.tickets")) > 50000) return hud_browser.execute('errorObmenPanelStuffOffer("У Вас более 50 000 руб. не оплаченных штрафов");');
			
			let thePlayer = false;
			
			let myPos = localPlayer.position;
			mp.players.forEach(
				(player) => {
					let plPos = player.position;
					if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, plPos.x, plPos.y, plPos.z, true) <= 10) {
						if(typeof(player.getVariable("player.id")) != "undefined") {
							if(player.getVariable("player.id") == obmenData.obmenID) thePlayer = player;
						}
					}
				}
			);
			
			let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
			decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
			
			if(thePlayer) {
				obmenData.fromVehs = [];
				var tempJSon = localPlayer.getVariable('player.vehs');
				for(var k in tempJSon.vehicles) {
					let vehID = tempJSon.vehicles[k].id;
					let vehHash = tempJSon.vehicles[k].hash;
					let vehName = vehHash;
					let vehType = "vehicle";
					let vehOwners = 1;
					if(typeof(tempJSon.vehicles[k].owners) != "undefined") vehOwners = tempJSon.vehicles[k].owners;
					
					if(typeof(decVehStats[0][vehHash]) != "undefined") {
						vehName = decVehStats[0][vehHash].name;
						vehType = decVehStats[0][vehHash].type;
					}
					tempJSon.vehicles[k].name = vehName;
					let vehNum = tempJSon.vehicles[k].number;
					
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
					
					if(tempJSon.vehicles[k]) obmenData.fromVehs.push({"id":parseInt(vehID),"hash":vehHash.toString(),"name":vehName.toString(),"vehtype":vehType.toString(),"num":vehNum.toString(),"owners":vehOwners.toString()});
				}
				
				chatAPI.notifyPush(" * Вы приняли предложение обмена от <span style=\"color:#FEBC00\"><b>"+obmenData.obmenNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+obmenData.obmenID+"</b></span>).");
				hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
				myVehSaving = true;
				mp.events.callRemote('acceptObmen', thePlayer, obmenData.initiator);
			}else{
				hud_browser.execute('errorObmenPanelStuffOffer("Игрока '+obmenData.obmenNick+' нет рядом.");');
			}
		}else{
			if(vehPanel) closeVehMenu();
			if(numchPanel) numchPanelClose();
			mp.events.callRemote('cancelObmen');
			obmenData = false;
			return closeAllObmenWindows();
		}
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenAccepted', (theNick, theID) => {
	if(hud_browser && theNick && theID && obmenData) {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		obmenData.fromVehs = [];
		var tempJSon = localPlayer.getVariable('player.vehs');
		
		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		for(var k in tempJSon.vehicles) {
			let vehID = tempJSon.vehicles[k].id;
			let vehHash = tempJSon.vehicles[k].hash;
			let vehName = vehHash;
			let vehType = "vehicle";
			let vehOwners = 1;
			if(typeof(tempJSon.vehicles[k].owners) != "undefined") vehOwners = tempJSon.vehicles[k].owners;
			
			if(typeof(decVehStats[0][vehHash]) != "undefined") {
				vehName = decVehStats[0][vehHash].name;
				vehType = decVehStats[0][vehHash].type;
			}
			tempJSon.vehicles[k].name = vehName;
			let vehNum = tempJSon.vehicles[k].number;
			
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
			
			if(tempJSon.vehicles[k]) obmenData.fromVehs.push({"id":parseInt(vehID),"hash":vehHash.toString(),"name":vehName.toString(),"vehtype":vehType.toString(),"num":vehNum.toString(),"owners":vehOwners.toString()});
		}
		
		myVehSaving = true;
		chatAPI.notifyPush(" * <span style=\"color:#FEBC00\"><b>"+obmenData.obmenNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+obmenData.obmenID+"</b></span>) принял Ваше предложение обмена.");
		hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenStuffAdd', (stuffData) => {
	if(hud_browser && obmenData && stuffData) {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		stuffData = JSON.parse(stuffData);
		
		let thePlayer = false;
		mp.players.forEach(
			(player) => {
				if(typeof(player.getVariable("player.id")) != "undefined") {
					if(player.getVariable("player.id") == obmenData.obmenID) thePlayer = player;
				}
			}
		);
		
		if(thePlayer) {
			if(stuffData.type == "veh" || stuffData.type == "num") {
				obmenData.fromStuff.push({"type":stuffData.type,"id":stuffData.id,"hash":stuffData.hash,"name":stuffData.name,"vehtype":stuffData.vehtype,"num":stuffData.num,"owners":stuffData.owners});
				if(stuffData.type == "veh") {
					let vehCost = 0;
					
					let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
					decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
					
					if(typeof(decVehStats[0][stuffData.hash]) != "undefined" && typeof(decVehStats[0][stuffData.hash].cost) != "undefined") obmenData.com += roundNumber(parseInt(decVehStats[0][stuffData.hash].cost)*0.01, 0);
				}else if(stuffData.type == "num") {
					obmenData.com += 1350000;
				}
			}else if(stuffData.type == "money") {
				obmenData.com = roundNumber(parseInt(obmenData.com) + (parseInt(stuffData.value) * 0.015), 0);
				obmenData.fromStuff.push({"type":stuffData.type,"value":stuffData.value});
			}
			
			if(obmenData.com <= 0) obmenData.com = 0;
			hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
			mp.events.callRemote('addObmenStuff', thePlayer, JSON.stringify(stuffData));
		}else{
			mp.events.callRemote('cancelObmen');
			obmenData = false;
			return closeAllObmenWindows();
		}
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenStuffAdded', (stuffData) => {
	if(hud_browser && obmenData && stuffData) {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		stuffData = JSON.parse(stuffData);

		if(stuffData.type == "veh" || stuffData.type == "num") {
			obmenData.toStuff.push({"type":stuffData.type,"id":stuffData.id,"hash":stuffData.hash,"name":stuffData.name,"vehtype":stuffData.vehtype,"num":stuffData.num,"owners":stuffData.owners});
			if(stuffData.type == "veh") {
				let vehCost = 0;
				
				let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
				decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
				
				if(typeof(decVehStats[0][stuffData.hash]) != "undefined" && typeof(decVehStats[0][stuffData.hash].cost) != "undefined") obmenData.com += roundNumber(parseInt(decVehStats[0][stuffData.hash].cost)*0.01, 0);
			}else if(stuffData.type == "num") {
				obmenData.com += 1350000;
			}
		}else if(stuffData.type == "money") {
			obmenData.toStuff.push({"type":stuffData.type,"value":stuffData.value});
			obmenData.com = roundNumber(parseInt(obmenData.com) + (parseInt(stuffData.value) * 0.015), 0);
			obmenData.com = roundNumber(obmenData.com, 0);
		}
		
		if(obmenData.com <= 0) obmenData.com = 0;
		hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenStuffDelete', (stuffData) => {
	if(hud_browser && obmenData && stuffData) {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		stuffData = JSON.parse(stuffData);
		
		let thePlayer = false;
		mp.players.forEach(
			(player) => {
				if(typeof(player.getVariable("player.id")) != "undefined") {
					if(player.getVariable("player.id") == obmenData.obmenID) thePlayer = player;
				}
			}
		);
		
		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
		
		if(thePlayer) {
			if(stuffData.type == "veh" || stuffData.type == "num") {
				for(var i in obmenData.fromStuff) {
					if(obmenData.fromStuff[i] || obmenData.fromStuff[i] !== undefined) {
						let tempData = obmenData.fromStuff[i];
						if(tempData.type == stuffData.type && tempData.id == stuffData.id) {
							if(stuffData.type == "veh") {
								let vehCost = 0;
								if(typeof(decVehStats[0][stuffData.hash]) != "undefined" && typeof(decVehStats[0][stuffData.hash].cost) != "undefined") obmenData.com -= roundNumber(parseInt(decVehStats[0][stuffData.hash].cost)*0.01, 0);
							}else if(stuffData.type == "num") {
								obmenData.com -= 1350000;
							}
							
							if(obmenData.com < 0) obmenData.com = 0;
							delete obmenData.fromStuff[i];
							break;
						}
					}
				}
				obmenData.fromStuff = obmenData.fromStuff.filter(function (el) { return el != null; });
			}else if(stuffData.type == "money") {
				for(var i in obmenData.fromStuff) {
					if(obmenData.fromStuff[i] || obmenData.fromStuff[i] !== undefined) {
						let tempData = obmenData.fromStuff[i];
						if(tempData.type == "money" && tempData.value == stuffData.value) {
							obmenData.com = roundNumber(parseInt(obmenData.com) - (parseInt(stuffData.value) * 0.015), 0);
							delete obmenData.fromStuff[i];
							break;
						}
					}
				}
				obmenData.fromStuff = obmenData.fromStuff.filter(function (el) { return el != null; });
			}
			
			if(obmenData.com <= 0) obmenData.com = 0;
			hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
			mp.events.callRemote('deleteObmenStuff', thePlayer, JSON.stringify(stuffData));
		}else{
			mp.events.callRemote('cancelObmen');
			obmenData = false;
			return closeAllObmenWindows();
		}
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenStuffDeleted', (stuffData) => {
	if(hud_browser && obmenData && stuffData) {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		stuffData = JSON.parse(stuffData);

		let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
		decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));

		if(stuffData.type == "veh" || stuffData.type == "num") {
			for(var i in obmenData.toStuff) {
				if(obmenData.toStuff[i] || obmenData.toStuff[i] !== undefined) {
					let tempData = obmenData.toStuff[i];
					if(tempData.type == stuffData.type && tempData.id == stuffData.id) {
						if(stuffData.type == "veh") {
							let vehCost = 0;
							
							if(typeof(decVehStats[0][stuffData.hash]) != "undefined" && typeof(decVehStats[0][stuffData.hash].cost) != "undefined") obmenData.com -= roundNumber(parseInt(decVehStats[0][stuffData.hash].cost)*0.01, 0);
						}else if(stuffData.type == "num") {
							obmenData.com -= 1350000;
						}
						if(obmenData.com < 0) obmenData.com = 0;
						delete obmenData.toStuff[i];
						break;
					}
				}
			}
			obmenData.toStuff = obmenData.toStuff.filter(function (el) { return el != null; });
		}else if(stuffData.type == "money") {
			for(var i in obmenData.toStuff) {
				if(obmenData.toStuff[i] || obmenData.toStuff[i] !== undefined) {
					let tempData = obmenData.toStuff[i];
					if(tempData.type == "money" && tempData.value == stuffData.value) {
						obmenData.com = roundNumber(parseInt(obmenData.com) - (parseInt(stuffData.value) * 0.015), 0);
						delete obmenData.toStuff[i];
						break;
					}
				}
			}
			obmenData.toStuff = obmenData.toStuff.filter(function (el) { return el != null; });
		}
		
		hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenReady', (theStatus) => {
	if(hud_browser && obmenData && typeof(theStatus) != "undefined") {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		let thePlayer = false;
		mp.players.forEach(
			(player) => {
				if(typeof(player.getVariable("player.id")) != "undefined") {
					if(player.getVariable("player.id") == obmenData.obmenID) thePlayer = player;
				}
			}
		);
		
		if(thePlayer) {
			obmenData.fromReady = theStatus;
			if(!theStatus) {
				obmenData.fromGo = false;
				obmenData.toGo = false;
			}
			hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
			mp.events.callRemote('obmenReady', thePlayer, theStatus);
		}else{
			mp.events.callRemote('cancelObmen');
			obmenData = false;
			return closeAllObmenWindows();
		}
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenReadyChanged', (theStatus) => {
	if(hud_browser && obmenData && typeof(theStatus) != "undefined") {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		obmenData.toReady = theStatus;
		if(!theStatus) {
			obmenData.fromGo = false;
			obmenData.toGo = false;
		}
		hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenGo', (theStatus) => {
	if(hud_browser && obmenData && typeof(theStatus) != "undefined") {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		let thePlayer = false;
		mp.players.forEach(
			(player) => {
				if(typeof(player.getVariable("player.id")) != "undefined") {
					if(player.getVariable("player.id") == obmenData.obmenID) thePlayer = player;
				}
			}
		);
		
		if(thePlayer) {
			obmenData.fromGo = theStatus;
			if(obmenData.fromGo && obmenData.toGo) {
				mp.events.callRemote('obmenGo', thePlayer, obmenData.fromGo, obmenData.toGo, JSON.stringify(obmenData));
				return closeAllObmenWindows();
			}else{
				hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
				mp.events.callRemote('obmenGo', thePlayer, obmenData.fromGo, obmenData.toGo, JSON.stringify(obmenData));
			}
		}else{
			mp.events.callRemote('cancelObmen');
			obmenData = false;
			return closeAllObmenWindows();
		}
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

mp.events.add('obmenGoChanged', (fromGoStatus, toGoStatus, resultat, theMoneyAdded, theMoneyRecived, theNumAdded, theNumRecived) => {
	if(hud_browser && obmenData && typeof(fromGoStatus) != "undefined" && typeof(toGoStatus) != "undefined" && typeof(resultat) != "undefined" && typeof(theMoneyAdded) != "undefined" && typeof(theMoneyRecived) != "undefined" && typeof(theNumAdded) != "undefined" && typeof(theNumRecived) != "undefined") {
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		obmenData.toGo = fromGoStatus;
		//chatAPI.notifyPush(fromGoStatus.toString()+" | "+toGoStatus.toString()+" | "+resultat.toString());
		if(fromGoStatus && toGoStatus) {
			if(hud_browser) hud_browser.execute('unsetSelVehData();');
			theMoneyAdded = parseInt(theMoneyAdded);
			theMoneyRecived = parseInt(theMoneyRecived);
			if(resultat) {
				if(resultat == "ok") {
					chatAPI.notifyPush(" * Вы успешно произвели обмен с <span style=\"color:#FEBC00\"><b>"+obmenData.obmenNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+obmenData.obmenID+"</b></span>).");
					if(obmenData.initiator) chatAPI.notifyPush(" * Комиссия оплачена в размере<span style=\"color:#FEBC00\"><b>"+obmenData.com.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
					
					if(theNumAdded) chatAPI.notifyPush(" * Вы получили номерной знак <span style=\"color:#FEBC00\"><b>"+theNumAdded+"</b></span> в ходе обмена.");
					if(theNumRecived) chatAPI.notifyPush(" * Вы отдали номерной знак <span style=\"color:#FEBC00\"><b>"+theNumRecived+"</b></span> в ходе обмена.");
				
					if(theMoneyRecived > 0) chatAPI.notifyPush(" * Отправлена доплата в размере<span style=\"color:#FEBC00\"><b>"+theMoneyRecived.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
					if(theMoneyAdded > 0) chatAPI.notifyPush(" * Получена доплата в размере<span style=\"color:#FEBC00\"><b>"+theMoneyAdded.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
					
					mp.game.ui.messages.showMidsizedShard("~y~Успешный обмен с ~w~"+obmenData.obmenNick+" ~y~(~w~"+obmenData.obmenID+"~y~)", "~s~Статистика сделки находится в чате.~n~Благодарим Вас за использование пункта обмена.", 5, false, true, 8000);
				}else if(resultat == "comMoney") {
					if(obmenData.initiator) chatAPI.sysPush("<span style=\"color:#FF6146\"> * У Вас не хватило средств на оплату сделки.</span>");
					else chatAPI.sysPush("<span style=\"color:#FF6146\"> * У <span style=\"color:#fff;\">"+obmenData.obmenNick+"</span> (<span style=\"color:#fff;\">"+obmenData.obmenID+"</span>) не хватило средств на сделку.</span>");
				}else if(resultat == "noFreeParks") {
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * У одного из Вас не хватает мест для совершения обмена.</span>");
				}else if(resultat == "more36Vehs") {
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * У одного из Вас будет больше 36 машин, а это лимит.</span>");
				}else if(resultat == "error") {
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * Во время обмена произошла неизвестная ошибка.</span>");
				}else if(resultat == "owners") {
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * Во время обмена произошла ошибка при сверке владельцев.</span>");
				}else if(resultat == "no_json") {
					chatAPI.sysPush("<span style=\"color:#FF6146\"> * Во время обмена произошла ошибка при проверке JSON.</span>");
				}
			}else{
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Во время обмена произошла неизвестная ошибка.</span>");
			}
			obmenData = false;
			return closeAllObmenWindows();
		}else{
			hud_browser.execute('toggleObmenPanel(\''+JSON.stringify(obmenData)+'\');');
		}
	}else{
		if(vehPanel) closeVehMenu();
		if(numchPanel) numchPanelClose();
		
		mp.events.callRemote('cancelObmen');
		obmenData = false;
		return closeAllObmenWindows();
	}
});

}