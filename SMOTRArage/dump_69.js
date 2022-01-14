{
var containersInStream = [];

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) !== "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.data) === "undefined") {
				if(shape.getVariable('col.type')) {
					let colType = shape.getVariable('col.type');
					if(colType == 'the_container') {
						let containerData = shape.getVariable('col.data');
						
						let container = mp.vehicles.new(mp.game.joaat("container"), new mp.Vector3(containerData.x, containerData.y, containerData.z), {
							color: [[containerData.color1[0],containerData.color1[1],containerData.color1[2]],[containerData.color1[0],containerData.color1[1],containerData.color1[2]]],
							heading: parseFloat(containerData.heading),
							dynamic: false,
							locked: true
						});
						container.isContainer = {"isContent":false,"pos":{"x":containerData.x,"y":containerData.y,"z":containerData.z},"heading":parseFloat(containerData.heading)};
						
						let marker = mp.markers.new(1, new mp.Vector3(containerData.check.x, containerData.check.y, containerData.check.z-1), 1.9,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 0, 0),
							color: [44, 123, 191, 140],
							visible: true,
							dimension: 0
						});
						
						setTimeout(() => {
							if(mp.vehicles.exists(container)) {
								if(container && container.handle != 0) {
									container.position = container.isContainer.pos;
									container.setHeading(parseFloat(containerData.heading));
									container.freezePosition(true);
									
									if(containerData.won) {
										let content = mp.vehicles.new(mp.game.joaat(containerData.content.vehicle), new mp.Vector3(containerData.x, containerData.y, containerData.z+0.3), {
											color: [[containerData.color1[0],containerData.color1[1],containerData.color1[2]],[containerData.color1[0],containerData.color1[1],containerData.color1[2]]],
											heading: parseFloat(containerData.heading),
											dynamic: false,
											locked: true
										});
										content.isContainer = {"isContent":true,"pos":{"x":containerData.x,"y":containerData.y,"z":containerData.z+0.5},"heading":parseFloat(containerData.heading)};
										
										for(var i in containersInStream) {
											let tempData = containersInStream[i];
											let posData = tempData.data;
											if (posData.x == containerData.x && posData.y == containerData.y && posData.z == containerData.z) containersInStream[i].content = content;
										}
										
										if(containerData.won.opened) {
											container.setDoorOpen(0, false, false);
											container.setDoorOpen(1, false, false);
										}else{
											container.setDoorShut(0, true);
											container.setDoorShut(1, true);
										}
									}else{
										container.setDoorShut(0, true);
										container.setDoorShut(1, true);
									}
								}
							}
						}, 2500);
						
						let checkpoint = mp.checkpoints.new(40, new mp.Vector3(containerData.check.x, containerData.check.y, containerData.check.z), 0.75,
						{
							color: [255, 255, 255, 0],
							visible: true,
							dimension: 0
						});
						checkpoint.conData = containerData;
						checkpoint.conContainer = container;
						
						let containerArray = {'data':containerData,'container':container,'content':false,'marker':marker,'checkpoint':checkpoint,'alpha':0};
						
						containersInStream.push(containerArray);
						return null;
					}
				}
			}
		}
	}
});

mp.events.addDataHandler("col.data", function (entity, value) {
	if(entity.type == 'colshape' && entity.handle != 0) {
		if(entity.getVariable("col.type") == "the_container") {
			for(var i in containersInStream) {
				let tempData = containersInStream[i];
				let posData = tempData.data;
				if (posData.x == value.x && posData.y == value.y && posData.z == value.z) {
					if(entity && tempData.container) {
						if(value.won) {
							if(value.won.opened) {
								if(mp.vehicles.exists(tempData.container)) {
									tempData.container.setDoorOpen(0, false, false);
									tempData.container.setDoorOpen(1, false, false);
								}
							}else{
								if(containersInStream[i].content) {
									if(mp.vehicles.exists(containersInStream[i].content)) containersInStream[i].content.destroy();
								}
								let content = mp.vehicles.new(mp.game.joaat(value.content.vehicle), new mp.Vector3(posData.x, posData.y, posData.z+0.3), {
									color: [[value.color1[0],value.color1[1],value.color1[2]],[value.color1[0],value.color1[1],value.color1[2]]],
									heading: parseFloat(value.heading),
									dynamic: false,
									locked: true
								});
								content.isContainer = {"isContent":true,"pos":{"x":value.x,"y":value.y,"z":value.z+0.5},"heading":parseFloat(value.heading)};
								containersInStream[i].content = content;
								
								if(mp.vehicles.exists(tempData.container)) {
									tempData.container.setDoorShut(0, true);
									tempData.container.setDoorShut(1, true);
								}
							}
						}else{
							if(mp.vehicles.exists(tempData.container)) {
								tempData.container.setDoorShut(0, true);
								tempData.container.setDoorShut(1, true);
							}
							if(containersInStream[i].content) {
								if(mp.vehicles.exists(containersInStream[i].content)) containersInStream[i].content.destroy();
							}
						}
					}
					if(containersInStream[i] || containersInStream[i] !== undefined) containersInStream[i].data = value;
					if(containersInStream[i].checkpoint !== undefined) {
						if(mp.checkpoints.exists(containersInStream[i].checkpoint)) containersInStream[i].checkpoint.conData = value;
					}
				}
			}
			if(containerPanel && hud_browser) {
				if(mp.checkpoints.exists(containerPanel) && typeof(localPlayer.getVariable("player.id")) !== "undefined") {
					if(typeof(containerPanel.conData) !== "undefined") {
						if(containerPanel.conData.x == value.x && containerPanel.conData.y == value.y && containerPanel.conData.z == value.z) {
							if(value.active) hud_browser.execute("toggleContainerPanel('"+localPlayer.getVariable("player.id")+"','"+JSON.stringify(value)+"');");
							else closeContainerPanel();
						}
					}
				}
			}
		}
	}
});

function itsAConAucStarted() {
	mp.game.ui.messages.showMidsizedShard("~w~Аукцион контейнеров ~g~начался", "~w~Прямо сейчас, в порту Лос-Сантоса начался аукцион!", 5, false, true, 8000);
}
mp.events.add("itsAConAucStarted", itsAConAucStarted);

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape) !== "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(typeof(shape.getVariable('col.type')) != "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'the_container') {
					let containerData = shape.getVariable('col.data');
					for(var i in containersInStream) {
						let tempData = containersInStream[i];
						let posData = tempData.data;
						if (posData.x == containerData.x && posData.y == containerData.y && posData.z == containerData.z) {
							if(tempData['container']) {
								if(mp.vehicles.exists(tempData['container'])) tempData['container'].destroy();
							}
							if(tempData['marker']) {
								if(mp.markers.exists(tempData['marker'])) tempData['marker'].destroy();
							}
							if(tempData['checkpoint']) {
								if(mp.checkpoints.exists(tempData['checkpoint'])) tempData['checkpoint'].destroy();
							}
							if(tempData['content']) {
								if(mp.vehicles.exists(tempData['content'])) tempData['content'].destroy();
							}
							if(containersInStream[i] || containersInStream[i] !== undefined) delete containersInStream[i];
						}
					}
					containersInStream = containersInStream.filter(function (el) { return el != null; });
					return null;
				}
			}
		}
	}
});

var containerPanel = false;
function closeContainerPanel() {
	if(containerPanel) {
		if(hud_browser) {
			hud_browser.execute('toggleContainerPanel();');
			mp.gui.cursor.visible = false;
		}
		containerPanel = false;
		restoreBinds();
		mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
	}
}
mp.events.add("closeContainerPanel", closeContainerPanel);

var conAucBidding = false;
mp.events.add("makeConBid", (bidMoney) => {
	if(containerPanel) {
		if(mp.checkpoints.exists(containerPanel)) {
			if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.money")) !== "undefined") {
				if(typeof(containerPanel.conData) !== "undefined" && typeof(containerPanel.conContainer) !== "undefined") {
					if(mp.vehicles.exists(containerPanel.conContainer)) {
						let theContainer = containerPanel.conContainer;
						if(containerPanel.conData.active) {
							if(typeof(bidMoney) !== "undefined") {
								let myMoney = localPlayer.getVariable("player.money");
								if(containerPanel.conData.won) {
									if(containerPanel.conData.won.id == localPlayer.getVariable("player.id")) {
										if(!containerPanel.conData.won.opened) {
											conAucBidding = true;
											mp.events.callRemote('openContainerAuc', JSON.stringify(containerPanel.conData));
											closeContainerPanel();
										}else{
											if(typeof(localPlayer.getVariable('player.vehs')) !== "undefined" && typeof(localPlayer.getVariable('player.houses')) !== "undefined") {
												let vehsData = localPlayer.getVariable('player.vehs');
												let housesData = localPlayer.getVariable('player.houses');
												
												let freeParks = 0;
												if(housesData && vehsData) freeParks = parseInt(housesData.parks) - parseInt(vehsData.count);
												
												if(freeParks <= 0) return hud_browser.execute('containerPanelError("У Вас недостаточно мест, заберите деньгами");');
												
												conAucBidding = true;
												mp.events.callRemote('getWonContainerAuc', JSON.stringify(containerPanel.conData));
												closeContainerPanel();
											}else{
												return hud_browser.execute('containerPanelError("У Вас недостаточно мест, заберите деньгами");');
											}
										}
									}else{
										return hud_browser.execute('containerPanelError("Вы не являетесь победителем");');
									}
								}else{
									if(!bidMoney) return hud_browser.execute('containerPanelError("Не указана сумма");');
									if(bidMoney == "") return hud_browser.execute('containerPanelError("Не указана сумма");');
									if(bidMoney == " ") return hud_browser.execute('containerPanelError("Не указана сумма");');
									
									bidMoney = parseInt(bidMoney);
									if(bidMoney <= 0) return hud_browser.execute('containerPanelError("Не указана сумма");');
									if(myMoney < bidMoney) return hud_browser.execute('containerPanelError("Недостаточно средств");');
									
									if(containerPanel.conData.bid.money == 0) {
										if(bidMoney < containerPanel.conData.start && hud_browser) return hud_browser.execute('containerPanelError("Сумма не может быть ниже минимальной");');
										else if(bidMoney > 99999999 && hud_browser) return hud_browser.execute('containerPanelError("Сумма не может быть больше 99 999 999");');
									}else{
										let minBidMoney = containerPanel.conData.bid.money + (containerPanel.conData.start * 0.01);
										if(bidMoney < minBidMoney && hud_browser) return hud_browser.execute('containerPanelError("Сумма не может быть ниже'+minBidMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+'");');
										else if(bidMoney > 99999999 && hud_browser) return hud_browser.execute('containerPanelError("Сумма не может быть больше 99 999 999");');
									}
									conAucBidding = true;
									mp.events.callRemote('makeContainerAucBid', JSON.stringify(containerPanel.conData), bidMoney.toString());
									closeContainerPanel();
								}
							}else{
								if(hud_browser) hud_browser.execute('containerPanelError("Вы не указали сумму");');
							}
						}else{
							if(hud_browser) hud_browser.execute('containerPanelError("Аукцион уже закрыт, попробуйте в другой раз");');
						}
					}else{
						if(hud_browser) hud_browser.execute('containerPanelError("Контейнер не инициализирован");');
					}
				}else{
					if(hud_browser) hud_browser.execute('containerPanelError("Контейнер не инициализирован");');
				}
			}else{
				if(hud_browser) hud_browser.execute('containerPanelError("Аккаунт не инициализирован");');
			}
		}
	}else{
		if(hud_browser) hud_browser.execute('containerPanelError("Неизвестная ошибка, попробуйте в другой раз");');
	}
});

mp.events.add("getConBidMoney", () => {
	if(containerPanel) {
		if(mp.checkpoints.exists(containerPanel)) {
			if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.money")) !== "undefined") {
				if(typeof(containerPanel.conData) !== "undefined" && typeof(containerPanel.conContainer) !== "undefined") {
					if(mp.vehicles.exists(containerPanel.conContainer)) {
						let theContainer = containerPanel.conContainer;
						if(containerPanel.conData.active) {
							let myMoney = localPlayer.getVariable("player.money");
							if(containerPanel.conData.won) {
								if(containerPanel.conData.won.id == localPlayer.getVariable("player.id")) {
									if(!containerPanel.conData.won.opened) {
										return hud_browser.execute('containerPanelError2("Контейнер закрыт");');
									}else{
										conAucBidding = true;
										mp.events.callRemote('getMoneyWonContainerAuc', JSON.stringify(containerPanel.conData));
										closeContainerPanel();
									}
								}else{
									return hud_browser.execute('containerPanelError2("Вы не являетесь победителем");');
								}
							}else{
								if(!hud_browser) return hud_browser.execute('containerPanelError2("Вы не являетесь победителям");');
							}
						}else{
							if(hud_browser) hud_browser.execute('containerPanelError2("Аукцион уже закрыт, попробуйте в другой раз");');
						}
					}else{
						if(hud_browser) hud_browser.execute('containerPanelError2("Контейнер не инициализирован");');
					}
				}else{
					if(hud_browser) hud_browser.execute('containerPanelError2("Контейнер не инициализирован");');
				}
			}else{
				if(hud_browser) hud_browser.execute('containerPanelError2("Аккаунт не инициализирован");');
			}
		}
	}else{
		if(hud_browser) hud_browser.execute('containerPanelError2("Неизвестная ошибка, попробуйте в другой раз");');
	}
});

mp.events.add("conAucFinalResult", (bidMoney, isError) => {
	if(typeof(bidMoney) !== "undefined" && typeof(isError) !== "undefined") {
		if(!isError) {
			mp.game.ui.messages.showMidsizedShard("~g~Победа ~w~в аукционе", "~w~Из наличного счёта списано~g~"+bidMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~w~руб.", 5, false, true, 5000);
			chatAPI.notifyPush("Вы победили в аукционе контейнеров, списано<span style=\"color:#FEBC00\"><b>"+bidMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
			chatAPI.notifyPush("ВНИМАНИЕ! У Вас есть не более <span style=\"color:#FEBC00\"><b>5</b></span> мин., что бы забрать свой приз!");
		}else{
			chatAPI.errorPush("<span style=\"color:#FF6146;\"> * Вы не смогли победить в аукционе, "+isError+".</span>");
		}
	}
});

mp.events.add("getWonContainerAucResult", (vehName) => {
	conAucBidding = false;
	if(typeof(vehName) !== "undefined") {
		mp.game.ui.messages.showMidsizedShard("~w~Вы забрали ~g~"+vehName, "~w~Проверьте панель личного транспорта, нажав кнопку ~g~F3", 5, false, true, 5000);
		chatAPI.notifyPush("Вы забрали из контейнера <span style=\"color:#FEBC00\"><b>"+vehName+"</b></span>");
	}
});

mp.events.add("getWonMoneyContainerAucResult", (wonMoney) => {
	conAucBidding = false;
	if(typeof(wonMoney) !== "undefined") {
		mp.game.ui.messages.showMidsizedShard("~w~Вы забрали ~g~деньги", "~w~Сумма выйгрыша~g~"+wonMoney.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~w~руб.", 5, false, true, 5000);
		chatAPI.notifyPush("Вы забрали из контейнера сумму, в размере<span style=\"color:#FEBC00\"><b>"+wonMoney.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
	}
});

mp.events.add("conAucBidResult", (bidMoney, isError) => {
	if(typeof(bidMoney) !== "undefined" && typeof(isError) !== "undefined") {
		conAucBidding = false;
		if(!isError) {
			mp.game.ui.messages.showMidsized("~g~Ставка сделана, ~w~ставок больше нет", "~w~Вы только что сделали ставку в размере~g~"+bidMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~w~руб.");
			chatAPI.notifyPush("Вы сделали ставку на аукционе контейнеров в размере<span style=\"color:#FEBC00\"><b>"+bidMoney.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+"</b></span> руб.");
		}else{
			chatAPI.errorPush("<span style=\"color:#FF6146;\"> * Ставка не прошла, "+isError+".</span>");
		}
	}
});

mp.events.add("conAucOpenResult", (isError) => {
	if(typeof(isError) !== "undefined") {
		conAucBidding = false;
		if(!isError) {
			mp.game.ui.messages.showMidsized("~g~Открываем ~w~контейнер", "~w~Вы только что открыли контейнер!");
			chatAPI.notifyPush("Вы стали победителем и открыли <span style=\"color:#FEBC00\"><b>контейнер</b></span>, ваш приз внутри!");
			chatAPI.notifyPush("Что бы забрать выйгрыш, встаньте на эту <span style=\"color:#FEBC00\"><b>метку</b></span> ещё раз!");
		}else{
			chatAPI.errorPush("<span style=\"color:#FF6146;\"> * Мы не смогли открыть контейнер, "+isError+".</span>");
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(!conAucBidding && !localPlayer.vehicle) {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.conData) !== "undefined" && typeof(checkpoint.conContainer) !== "undefined") {
				if(mp.vehicles.exists(checkpoint.conContainer)) {
					let theContainer = checkpoint.conContainer;
					if(checkpoint.conData.active) {
						if(checkpoint.conData.won) {
							if(checkpoint.conData.won.id == localPlayer.getVariable("player.id")) {
								if(!containerPanel && hud_browser) {
									if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
										hud_browser.execute("toggleContainerPanel('"+localPlayer.getVariable("player.id")+"','"+JSON.stringify(checkpoint.conData)+"');");
										mp.gui.cursor.visible = true;
										containerPanel = checkpoint;
										allowBinds = [];
										mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
									}else{
										chatAPI.errorPush("<span style=\"color:#FF6146;\"> * Ваш аккаунт не инициализирован..</span>");
									}
								}
							}else{
								chatAPI.errorPush("<span style=\"color:#FF6146;\"> * Вы не являетесь победителем..</span>");
							}
						}else{
							if(!containerPanel && hud_browser) {
								if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
									hud_browser.execute("toggleContainerPanel('"+localPlayer.getVariable("player.id")+"','"+JSON.stringify(checkpoint.conData)+"');");
									mp.gui.cursor.visible = true;
									containerPanel = checkpoint;
									allowBinds = [];
									mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
								}else{
									chatAPI.errorPush("<span style=\"color:#FF6146;\"> * Ваш аккаунт не инициализирован..</span>");
								}
							}
						}
					}else{
						chatAPI.errorPush("<span style=\"color:#FF6146;\"> * Аукцион сейчас закрыт, попробуйте позже..</span>");
					}
				}
			}
		}
	}
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.conData) !== "undefined" && typeof(checkpoint.conContainer) !== "undefined") closeContainerPanel();
	}
});
}ŏ